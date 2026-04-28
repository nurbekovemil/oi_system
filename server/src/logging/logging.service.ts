import { Injectable, Logger } from '@nestjs/common';
import { appendFile, mkdir } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class LoggingService {
  private readonly logger = new Logger(LoggingService.name);
  private readonly logsDir = join(process.cwd(), 'logs');
  private readonly appLogPath = join(this.logsDir, 'app.log');
  private readonly errorLogPath = join(this.logsDir, 'error.log');
  private logsDirReady = false;

  async log(message: string, context = 'Application'): Promise<void> {
    this.logger.log(message, context);
    await this.writeLog(this.appLogPath, 'LOG', message, context);
  }

  async warn(message: string, context = 'Application'): Promise<void> {
    this.logger.warn(message, context);
    await this.writeLog(this.appLogPath, 'WARN', message, context);
  }

  async error(
    message: string,
    trace?: string,
    context = 'Application',
  ): Promise<void> {
    this.logger.error(message, trace, context);
    await this.writeLog(this.appLogPath, 'ERROR', message, context, trace);
    await this.writeLog(this.errorLogPath, 'ERROR', message, context, trace);
  }

  private async ensureLogsDir(): Promise<void> {
    if (this.logsDirReady) {
      return;
    }

    await mkdir(this.logsDir, { recursive: true });
    this.logsDirReady = true;
  }

  private async writeLog(
    filePath: string,
    level: 'LOG' | 'WARN' | 'ERROR',
    message: string,
    context: string,
    trace?: string,
  ): Promise<void> {
    try {
      await this.ensureLogsDir();
      const timestamp = new Date().toISOString();
      const tracePart = trace ? `\n${trace}` : '';
      const logLine = `[${timestamp}] [${level}] [${context}] ${message}${tracePart}\n`;
      await appendFile(filePath, logLine, 'utf8');
    } catch (writeError) {
      const fallbackMessage =
        writeError instanceof Error ? writeError.message : 'Unknown write error';
      this.logger.warn(`Failed to write file log: ${fallbackMessage}`);
    }
  }
}
