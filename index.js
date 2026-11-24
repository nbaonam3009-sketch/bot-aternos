const mineflayer = require('mineflayer');
const express = require('express');

// === SỬA 4 DÒNG NÀY CHO ĐÚNG SERVER CỦA BẠN ===
const SERVER_IP = 'NBaoNam309125.aternos.me'; // Thay bằng IP server của bạn (giữ nguyên dấu nháy đơn)
const SERVER_PORT = 46233;                // Thay bằng Port của bạn (chỉ ghi số, không có dấu nháy)
const BOT_NAME = 'hathuong';            // Tên nhân vật bot sẽ hiện trong game
const MC_VERSION = '26.3';              // Thay bằng phiên bản Minecraft của server bạn
// =============================================

const app = express();
app.get('/', (req, res) => res.send('Bot dang hoat dong!'));
app.listen(process.env.PORT || 3000, () => console.log('Web da san sang'));

function createBot() {
  const bot = mineflayer.createBot({
    host: SERVER_IP,
    port: SERVER_PORT,
    username: BOT_NAME,
    version: MC_VERSION
  });

  bot.on('spawn', () => {
    console.log('THANH CONG: Bot da vao server!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Mat ket noi, dang thu vao lai sau 10 giay...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Loi ket noi:', err.message));
}

createBot();
