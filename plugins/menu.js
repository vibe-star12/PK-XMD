const { cmd } = require('../command');
const config = require('../config');
const fs = require('fs');
const os = require('os');
const moment = require('moment-timezone');

cmd({
  pattern: "menu",
  desc: "Display full bot command list",
  category: "main",
  filename: __filename,
  react: "📜"
}, async (m, text, { conn, commands }) => {
  try {
    const prefix = ".*";
    const time = moment().tz("Africa/Nairobi").format("HH:mm:ss");
    const date = moment().tz("Africa/Nairobi").format("DD/MM/YYYY");
    const uptime = process.uptime();
    const totalCommands = Object.keys(commands).length;

    const upHours = Math.floor(uptime / 3600);
    const upMinutes = Math.floor((uptime % 3600) / 60);
    const upSeconds = Math.floor(uptime % 60);
    const formattedUptime = `${upHours}h ${upMinutes}m ${upSeconds}s`;

    let menuList = "";
    for (const name in commands) {
      menuList += `★ ${prefix}${name}\n`;
    }

    const menuText = `╭─❒ 「 *PK-XMD MENU* 」
│ 🧠 *Uptime:* ${formattedUptime}
│ 📆 *Date:* ${date}
│ ⏰ *Time:* ${time}
│ 🔢 *Commands:* ${totalCommands}
╰───────────────◆\n\n${menuList}`;

    // Fake verified contact with blue tick
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:PK-XMD
ORG:WhatsApp Verified Bot;
TEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000
X-ANDROID-CUSTOM:vnd.android.cursor.item/vnd.whatsapp.profile;
END:VCARD`;

    const quotedContact = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "PK-XMD",
          vcard: vcard,
          jpegThumbnail: fs.readFileSync('./media/verified.jpg'), // fake blue tick image
          thumbnail: fs.readFileSync('./media/verified.jpg')
        }
      }
    };

    await conn.sendMessage(m.chat, {
      image: { url: "https://files.catbox.moe/glt48n.jpg" }, // fake image link ya menu
      caption: menuText,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "🎧 PK-XMD Bot Menu",
          body: "Powered by Pkdriller",
          mediaType: 2,
          thumbnail: fs.readFileSync('./media/verified.jpg'),
          mediaUrl: "https://youtu.be/dQw4w9WgXcQ", // fake music/audio link
          sourceUrl: "https://whatsapp.com/channel/0029VaLhC5K6WpXfF7tqLA1T" // your channel
        },
        forwardedNewsletterMessageInfo: {
          newsletterJid: "254700000000@newsletter",
          newsletterName: "PK-XMD News",
          serverMessageId: 100
        }
      }
    }, { quoted: quotedContact });

    // Fake PTT (voice note)
    await conn.sendMessage(m.chat, {
      audio: { url: "https://files.catbox.moe/glt48n.jpg" },
      mimetype: "audio/mp4",
      ptt: true,
      contextInfo: {
        forwardingScore: 1000,
        isForwarded: true
      }
    });

  } catch (e) {
    console.log(e);
    return m.reply("⚠️ Error showing menu.");
  }
});
        
