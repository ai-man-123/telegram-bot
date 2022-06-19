require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const downloadVideo = require('./tiktok-downloader')

const token = process.env.TELEGRAM_BOT_TOKEN
const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start$/, (msg) => {
  const chatId = msg.chat.id
  const chatUser = msg.chat.first_name
  const message = `selamat datang, yang kuban ii aja ye:v, ${chatUser}!\n\nAnda boleh menghantar saya pautan ke TikTok dari tempat anda ingin memuat naik video - dalam beberapa saat anda akan mendapat video ini!\n\nPada masa ini, saya hanya menyokong video daripada TikTok!(ᴀᴡɪꜱʜ``
  bot.sendMessage(chatId, message)
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  const message = msg.text

  if (message !== '/start') {
    if (message.match('https:\/\/[a-zA-Z]+.tiktok.com\/')) {
      downloadVideo(message).then((videoLink) => bot.sendVideo(chatId, videoLink, { caption: 'by Aiman, @Aimanx2_bot' }))
    } else {
      bot.sendMessage(chatId, '⛔️ Anda menghantar pautan yang tidak disokong atau yang salah oleh bot!')
    }
  }
})
