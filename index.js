require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const downloadVideo = require('./tiktok-downloader')

const token = process.env.TELEGRAM_BOT_TOKEN
const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/start$/, (msg) => {
  const chatId = msg.chat.id
  const chatUser = msg.chat.first_name
  const message = `Добро пожаловать, ${chatUser}!\n\nВы можете скинуть мне ссылку на TikTok откуда нужно выгрузить видео — через пару секунд этот видос будет у вас!\n\nНа данный момент, я поддерживаю только видео из TikTok!`
  bot.sendMessage(chatId, message)
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  const message = msg.text

  if (message !== '/start') {
    if (message.match('https:\/\/[a-zA-Z]+.tiktok.com\/')) {
      downloadVideo(message).then((videoLink) => bot.sendVideo(chatId, videoLink, { caption: 'Рад был помочь! Ваш, @GetTTVideoBot' }))
    } else {
      bot.sendMessage(chatId, '⛔️ Вы прислали ссылку, которая не поддерживается ботом!')
    }
  }
})
