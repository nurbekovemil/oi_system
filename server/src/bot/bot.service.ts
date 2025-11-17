import { Injectable } from '@nestjs/common';
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class BotService {
  private readonly botAdmin: any;
  private readonly botChannel: any;

  constructor() {
    this.botAdmin = new TelegramBot(process.env.TG_BOT_ADMIN_KEY, {
      polling: false,
    });
    this.botChannel = new TelegramBot(process.env.TG_BOT_CHANNEL_KEY, {
      polling: false,
    });
    this.botAdmin.onText(/\/start/, (msg) => {
      const userId = msg.from.id;
      const firstName = msg.from.first_name || '';
      let message = `${userId}`
      const tg_bot_admin_ids = process.env.TG_BOT_ADMIN_IDS.split(',').map(Number);
      tg_bot_admin_ids.forEach(admin_id => {
        this.botAdmin.sendMessage(admin_id, message, {
          parse_mode: 'HTML',
        });
      });
      // Тут можно сохранить userId в БД, если нужно
    });
  }

  // async sendNoticeForAdmin(reportData) {
  //   const tg_bot_admin_id = process.env.TG_BOT_ADMIN_ID;
  //   const { company, type } = reportData;
  //   const message = `<b>Новый документ</b>\n\n${company?.name}\n${type.title}`;
  //   this.botAdmin.sendMessage(tg_bot_admin_id, message, {
  //     parse_mode: 'HTML',
  //   });
  // }
  
  async sendNoticeForAdmin(reportData) {
    const { company, type } = reportData;
    const message = `<b>Новый документ</b>\n\n${company?.name}\n${type.title}`;
    const tg_bot_admin_ids = process.env.TG_BOT_ADMIN_IDS.split(',').map(Number);
    tg_bot_admin_ids.forEach(admin_id => {
      this.botAdmin.sendMessage(admin_id, message, {
        parse_mode: 'HTML',
      });
    });
  }

  async sendNoticeForKseNewsChannel(reportData) {
    const tg_bot_channel_id = process.env.TG_BOT_CHANNEL_ID;
    const client_host = process.env.CLIENT_HOST;

    const { company, type, typeId, id } = reportData;
    const url = `${client_host}/report/${typeId}/${type.tempId}/${id}`;

    const message = `${company?.name} : ${type.title}\n\n<a href="${url}">Источник: Кыргызская Фондовая Биржа</a>`;
    this.botChannel.sendMessage(tg_bot_channel_id, message, {
      parse_mode: 'HTML',
    });
  }
}
