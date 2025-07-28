const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const os = require('os');
const moment = require('moment-timezone');
const config = require('../config');

cmd({
  pattern: "menu",
  desc: "Display full command menu",
  category: "main",
  filename: __filename,
  react: "📜"
}, async (m, match, conn) => {
  try {
    const commands = Object.values(global.plugins).map((plugin) => plugin.pattern).filter(Boolean);
    const prefix = '.*';
    const totalCommands = commands.length;
    const time = moment().tz('Africa/Nairobi').format('HH:mm:ss');
    const date = moment().tz('Africa/Nairobi').format('dddd, MMMM Do YYYY');
    const uptime = process.uptime();
    const uptimeString = new Date(uptime * 1000).toISOString().substr(11, 8);

    const commandList = commands.map(cmd => `★ ${prefix}${cmd}`).join('\n');

    const menuMessage = `╭───〔 *📜 PK-XMD BOT MENU* 〕───⭓
│
│ *🕒 Time:* ${time}
│ *📅 Date:* ${date}
│ *📶 Uptime:* ${uptimeString}
│ *🧩 Prefix:* ${prefix}
│ *📚 Total Commands:* ${totalCommands}
│
╰──────────────⭓

${commandList}

🔗 *Deploy PK-XMD on:*
https://github.com/pkdriller/PK-XMD
`;

    const fakeContact = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        remoteJid: 'status@broadcast'
      },
      message: {
        contactMessage: {
          displayName: "WhatsApp",
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:WhatsApp\nORG:WhatsApp\nTEL;waid=254700000000:+254 700 000000\nitem1.X-ABLabel:Verified Business\nEND:VCARD`,
          jpegThumbnail: Buffer.from([])
        }
      }
    };

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/glt48n.jpg' }, // fake menu image
      caption: menuMessage,
      contextInfo: {
        quotedMessage: fakeContact.message,
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: "PK-XMD OFFICIAL",
          newsletterJid: "120363025223777409@newsletter"
        },
        externalAdReply: {
          title: "PK-XMD MENU",
          body: "Powered by Pkdriller",
          thumbnailUrl: "https://telegra.ph/file/95bbf2011d350aa31d76e.jpg",
          sourceUrl: "https://github.com/pkdriller/PK-XMD",
          mediaType: 2,
          renderLargerThumbnail: false,
          mediaUrl: "https://files.catbox.moe/rasczj.mp3" // fake audio link
        }
      }
    }, { quoted: fakeContact });

  } catch (err) {
    console.error(err);
    await m.reply("❌ Failed to load menu. Try again later.");
  }
});
        
