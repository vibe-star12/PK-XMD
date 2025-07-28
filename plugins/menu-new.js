const { cmd } = require('../command');
const config = require('../config');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const moment = require('moment-timezone');

cmd({
  pattern: "menu",
  desc: "Show all bot commands",
  category: "system",
  filename: __filename,
}, async (Void, m) => {

  const time = moment.tz('Africa/Nairobi').format('HH:mm:ss');
  const date = moment.tz('Africa/Nairobi').format('DD/MM/YYYY');

  const runtime = () => {
    let sec = process.uptime();
    let hrs = Math.floor(sec / 3600);
    let mins = Math.floor((sec % 3600) / 60);
    let secs = Math.floor(sec % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  };

  // Auto-fetch all commands
  const pluginPath = path.join(__dirname, '../');
  const files = fs.readdirSync(pluginPath).filter(file => file.endsWith('.js'));
  let commands = [];

  for (const file of files) {
    const fullPath = path.join(pluginPath, file);
    try {
      const data = require(fullPath);
      if (Array.isArray(data)) {
        for (const cmdObj of data) {
          if (cmdObj.pattern) commands.push(`★ .*${cmdObj.pattern}*`);
        }
      } else if (data.pattern) {
        commands.push(`★ .*${data.pattern}*`);
      }
    } catch (e) {
      console.error(`Error in ${file}:`, e.message);
    }
  }

  commands = [...new Set(commands)].sort();

  const caption = `
╭─────[ *PK-XMD MENU* ]─────╮
│ 👤 *Owner:* PKDRILLER
│ 📅 *Date:* ${date}
│ ⏰ *Time:* ${time}
│ ⚡ *Uptime:* ${runtime()}
│ 🧩 *Total Commands:* ${commands.length}
╰─────────────────────────╯

${commands.join('\n')}
`;

  // Download PTT voice from URL
  const pttPath = path.join(__dirname, '../temp/menu-voice.mp3');
  const audioUrl = "https://files.catbox.moe/rasczj.mp3";
  const res = await axios.get(audioUrl, { responseType: 'arraybuffer' });
  fs.writeFileSync(pttPath, Buffer.from(res.data, 'utf-8'));

  // Send menu image with caption
  await Void.sendMessage(m.chat, {
    image: { url: config.MENU_IMAGE || 'https://telegra.ph/file/c053d6fa7f29262bd60b6.jpg' },
    caption,
    contextInfo: {
      externalAdReply: {
        title: "PK-XMD Bot",
        body: "WhatsApp Bot by PKDRILLER",
        thumbnailUrl: config.THUMB_IMAGE || 'https://files.catbox.moe/fgiecg.jpg',
        mediaType: 1,
        mediaUrl: "",
        sourceUrl: "https://wa.me/254701234567"
      },
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363025566112154@newsletter",
        newsletterName: "PK-XMD UPDATES"
      },
      mentionedJid: [m.sender]
    },
    quoted: {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "WhatsApp",
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:WhatsApp Verified\nORG:Meta\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
        }
      }
    }
  });

  // Send music (PTT)
  await Void.sendMessage(m.chat, {
    audio: fs.readFileSync(pttPath),
    mimetype: 'audio/mp4',
    ptt: true,
    contextInfo: {
      externalAdReply: {
        title: "Now Playing...",
        body: "Background Menu Theme",
        thumbnailUrl: config.THUMB_IMAGE || '.https://files.catbox.moe/fgiecg.jpg★ .*command name*',
        mediaType: 2,
        sourceUrl: "https://wa.me/254701234567"
      },
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363025566112154@newsletter",
        newsletterName: "PK-XMD UPDATES"
      }
    }
  });

});
      
