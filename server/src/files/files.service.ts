import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file) {
    try {
      console.log(file);
      const fileExtension = file.originalname.split('.')[1];
      const name = uuid.v4() + `.${fileExtension}`;
      const filePath = path.resolve(__dirname, '..', 'static');
      const mimetype = file.mimetype;
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, name), file.buffer);
      return { name, mimetype };
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи файла!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async removeFile({ name }: { name: string }) {
    console.log('fileName: ', name);
    const filePath = path.resolve(__dirname, '..', `static/${name}`);
    fs.unlink(filePath, (err) => {
      if (err) {
        return `Error deleting file: ${err}`;
      } else {
        return `File ${filePath} has been successfully deleted.`;
      }
    });
  }
}
