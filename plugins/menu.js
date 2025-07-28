const { cmd } = require('../command');
const fs = require('fs');
const moment = require('moment-timezone');
const os = require('os');

cmd({
  pattern: "menu",
  desc: "Show full bot command list",
  category: "main",
  filename: __filename,
  react: "📃"
}, async (m, text, { conn, prefix, commands }) => {
  try {
    const time = moment().tz("Africa/Nairobi").format("HH:mm:ss");
    const date = moment().tz("Africa/Nairobi").format("DD/MM/YYYY");
    const uptime = Math.floor(process.uptime());
    const up = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s`;

    const total = Object.keys(commands).length;
    const listed = Object.keys(commands).filter(v => !v.startsWith('$')).map(v => `★ .*${v}`).join('\n');

    const menuText = `╭──〔 *🌐 PK-XMD MENU* 〕──╮
│ 🕒 *Time:* ${time}
│ 📆 *Date:* ${date}
│ ⚙️ *Uptime:* ${up}
│ 💠 *Prefix:* *.*
│ 🧩 *Total:* ${total} Commands
╰────◇◆◇────╯

${listed}

╭─〔 *📢 DEPLOY PK-XMD BOT* 〕─╮
│ 🔗 *Image:* https://example.com/menu.jpg
│ 🎵 *Music:* https://example.com/menu.mp3
│ 💬 *Channel:* wa.me/254700000000
╰────────────────────╯

🤖 *Powered by Pkdriller*
`;

    const fakeVcard = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "PKDRILLER",
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PKDRILLER\nORG:PK-XMD Official;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000 000\nEND:VCARD`,
          jpegThumbnail: null
        }
      }
    };

    await conn.sendMessage(m.chat, {
      image: { url: "https://files.catbox.moe/glt48n.jpg" },
      caption: menuText,
      contextInfo: {
        quotedMessage: fakeVcard.message,
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "PK-XMD WhatsApp Bot",
          body: "All Commands Listed | Powered by Pkdriller",
          mediaUrl: "https://whatsapp.com/channel/fakepkxmd",
          sourceUrl: "https://whatsapp.com/channel/fakepkxmd",
          mediaType: 2,
          showAdAttribution: true,
          renderLargerThumbnail: true,
          thumbnailUrl: "https://example.com/menu.jpg"
        },
        forwardedNewsletterMessageInfo: {
          newsletterName: "PK-XMD Updates",
          newsletterJid: "120363191191191191@newsletter"
        },
        audio: {
          url: "https://files.catbox.moe/rasczj.mp3" // Fake music link
        }
      }
    }, { quoted: fakeVcard });

  } catch (e) {
    await m.reply(`❌ Error in menu:\n\n${e}`);
  }
});
