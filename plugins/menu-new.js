const { cmd } = require('../command');
const config = require('../config');
const moment = require('moment-timezone');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

cmd({
  pattern: "menu",
  desc: "Show all bot commands",
  category: "system",
  filename: __filename,
  react: "💙"
}, async (m, _, { prefix, commands, sendFile, uptime, botName, botFooter }) => {
  try {
    const categories = {};
    const total = Object.keys(commands).length;

    for (const key in commands) {
      const cmd = commands[key];
      if (!cmd.category) continue;
      if (!categories[cmd.category]) categories[cmd.category] = [];
      categories[cmd.category].push(`★ *.${cmd.pattern}*`);
    }

    const time = moment().tz('Africa/Nairobi').format('HH:mm:ss');
    const date = moment().tz('Africa/Nairobi').format('DD/MM/YYYY');

    let text = `┏━〔 *${botName} Commands Menu* 〕━⬣
┃ ✦ *Prefix:* ${prefix}
┃ ✦ *Time:* ${time}
┃ ✦ *Date:* ${date}
┃ ✦ *Uptime:* ${uptime}
┃ ✦ *Total Commands:* ${total}
┗━━━━━━━━━━━━⬣\n\n`;

    for (const cat in categories) {
      text += `┌──「 *${cat}* 」
${categories[cat].join('\n')}
└───────────────⭓\n\n`;
    }

    const quoted = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "WhatsApp Verified Contact",
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:WhatsApp Verified\nORG:Meta\nTEL;type=CELL;waid=254700000000:+254 700 000000\nX-ANDROID-CUSTOM:vcard\nEND:VCARD`
        }
      }
    };

    // Download music if not already saved
    const audioPath = path.join(__dirname, '../media/menu.mp3');
    if (!fs.existsSync(audioPath)) {
      const res = await axios.get('https://files.catbox.moe/rasczj.mp3', { responseType: 'stream' });
      await new Promise((resolve, reject) => {
        const stream = res.data.pipe(fs.createWriteStream(audioPath));
        stream.on('finish', resolve);
        stream.on('error', reject);
      });
    }

    await sendFile(m.from, audioPath, '', text.trim(), m, {
      quoted,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: "PK-XMD Official",
          newsletterJid: "120363288304618280@newsletter"
        }
      }
    });
  } catch (e) {
    console.error(e);
    await m.reply("❌ Failed to display menu.");
  }
});
          
