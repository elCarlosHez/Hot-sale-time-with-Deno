import { Cron } from "https://deno.land/x/cron/cron.ts";

export class TelegramBot {
  url: string;
  token: string;
  cronJob: Cron;

  constructor(token: string, url?: string) {
    this.token = token;
    this.url = url || 'https://api.telegram.org/bot';
    this.cronJob = new Cron();
    this.cronJob.start();
  }

  async getUpdate() {
    let response = await fetch(`${this.url}${this.token}/getUpdates`);
    let data = await response.json();
    return data;
  }

  async sendHotSaleTime(chat_id: string | undefined) {
    let randomStart = [];

    setInterval(async () => {
      let diffDays = this.getDaysForHotSale();

      const response = await fetch(`${this.url}${this.token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chat_id,
          text: `Faltan ${diffDays} días para el hot sale * - *`
        })
      });
    }, 1000 * 60 * 60 * 24);
  }

  getDaysForHotSale() {
    const oneDay = 24 * 60 * 60 * 1000;
    let todayDate = new Date();
    let hotSaleDate = new Date('05/22/20');
    return Math.round(Math.abs((todayDate.valueOf() - hotSaleDate.valueOf()) / oneDay));
  }
}