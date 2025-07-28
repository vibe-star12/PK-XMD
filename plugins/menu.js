const { cmd } = require('../command');
const moment = require('moment-timezone');
const fs = require('fs');
const config = require('../config');

cmd({
  pattern: "menu",
  desc: "Show all bot commands",
  category: "main",
  filename: __filename
}, async (m, text, { conn, prefix, commands }) => {
  const time = moment.tz('Africa/Nairobi').format('HH:mm:ss');
  const date = moment.tz('Africa/Nairobi').format('dddd, MMMM Do YYYY');
  const uptime = process.uptime();
  const hrs = Math.floor(uptime / 3600);
  const mins = Math.floor((uptime % 3600) / 60);
  const secs = Math.floor(uptime % 60);

  const totalCmds = Object.values(commands).filter(cmd => cmd.pattern).length;
  const commandList = Object.values(commands)
    .filter(cmd => cmd.pattern)
    .map(cmd => `★ .*${cmd.pattern}`)
    .join('\n');

  const menu = `*✨ PK-XMD BOT MENU*

📅 Date: ${date}
🕒 Time: ${time}
⏱️ Uptime: ${hrs}h ${mins}m ${secs}s
📌 Prefix: *.*
📋 Total Commands: ${totalCmds}

┌──⭓ *COMMANDS*
${commandList}
└───────────────⭓

*Powered by Pkdriller 🔥*`;

  const quotedContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "WhatsApp",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:WhatsApp Verified Contact\nORG:Meta Verified\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
        jpegThumbnail: fs.readFileSync('./media/verified.jpg')
      }
    }
  };

  const contextInfo = {
    forwardingScore: 999,
    isForwarded: true,
    externalAdReply: {
      title: "PK-XMD WhatsApp Bot",
      body: "Follow for more updates",
      mediaType: 2,
      mediaUrl: "",
      sourceUrl: "https://wa.me/254700000000", // Optional
      showAdAttribution: true,
      renderLargerThumbnail: false
    },
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363XXXXX@newsletter",
      newsletterName: "PK-XMD Updates",
      serverMessageId: 1
    }
  };

  await conn.sendMessage(m.chat, {
    image: fs.readFileSync('https://files.catbox.moe/0acptc.mp3'),
    caption: menu,
    contextInfo
  }, { quoted: quotedContact });

  await conn.sendMessage(m.chat, {
    audio: { url: 'https://files.catbox.moe/rasczj.mp3' },
    mimetype: 'audio/mp4',
    ptt: true,
    contextInfo
  }, { quoted: quotedContact });
});
