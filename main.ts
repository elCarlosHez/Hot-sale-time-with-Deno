import { serve } from "https://deno.land/std@0.50.0/http/server.ts";
import { TelegramBot } from "./telegram_bot.ts";
import "https://deno.land/x/dotenv/load.ts";

const PORT = Deno.env.get('APP_PORT') || 8080;
const SERVER_URL = Deno.env.get('APP_URL') || '0.0.0.0';
const s = serve(`${SERVER_URL}:${PORT}`);
const body = new TextEncoder().encode("Hello, Deno\n");

console.log(`Server started on port ${PORT}`);

let t = new TelegramBot(
  Deno.env.get('TELEGRAM_BOT_TOKEN') || 'fail',
  Deno.env.get('TELEGRAM_BOT_API'),
);

console.log(`Telegram Bot Assistence created`);

t.sendHotSaleTime(Deno.env.get('TELEGRAM_CHAT_ID'));

console.log(`Telegram Bot CronJob created`);

for await (const req of s) {
  req.respond({ body });
}

