const { cmd } = require('../command');
const config = require('../config');
const moment = require('moment-timezone');
const axios = require('axios');

cmd({
  pattern: "menu",
  desc: "Show all bot commands in organized format",
  category: "system",
  filename: __filename,
  react: "📦"
}, async (m, _, { prefix, commands, uptime, botName }) => {
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

    let text = `┏━〔 *${botName} Commands List* 〕━⬣
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

    const audioUrl = 'https://files.catbox.moe/rasczj.mp3';
    const res = await axios.get(audioUrl, { responseType: 'arraybuffer' });

    await m.client.sendMessage(m.from, {
      audio: res.data,
      mimetype: 'audio/mp4',
      ptt: true,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: 'PK-XMD Bot',
          body: 'Follow PK-XMD Official Channel',
          mediaType: 2,
          thumbnailUrl: 'https://files.catbox.moe/fgiecg.jpg',
          mediaUrl: 'https://whatsapp.com/channel/0029Vad7YNyJuyA77CtIPX0x',
          sourceUrl: 'https://github.com/pkphotographer1911/PK-XMD'
        },
        forwardedNewsletterMessageInfo: {
          newsletterName: "PK-XMD Official",
          newsletterJid: "120363288304618280@newsletter"
        }
      }
    }, { quoted });

  } catch (e) {
    console.error(e);
    await m.reply("❌ Error displaying commands list.");
  }
});
