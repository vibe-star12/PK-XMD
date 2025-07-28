const { cmd } = require('../command');
const moment = require('moment-timezone');

cmd({
  pattern: "menu",
  desc: "Display full bot command list",
  category: "system",
  filename: __filename,
}, async (Void, m, text, { prefix }) => {
  const runtime = () => {
    let sec = process.uptime();
    let hrs = Math.floor(sec / 3600);
    let mins = Math.floor((sec % 3600) / 60);
    let secs = Math.floor(sec % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const date = moment.tz("Africa/Nairobi").format("DD/MM/YYYY");
  const time = moment.tz("Africa/Nairobi").format("HH:mm:ss");
  const uptime = runtime();

  const botName = "PK-XMD";
  const ownerName = "PKDRILLER";

  const menutext = `
╭───〘 *${botName} MENU* 〙───
│ 🤖 *Bot Name:* ${botName}
│ 👑 *Owner:* ${ownerName}
│ 📅 *Date:* ${date}
│ ⏰ *Time:* ${time}
│ ⚡ *Uptime:* ${uptime}
╰────────────────────

🧠 *AI COMMANDS*
★ . *ai*
★ . *gpt*
★ . *deepseek*
★ . *openai*

🎵 *DOWNLOADER*
★ . *play*
★ . *yt*
★ . *mediafire*
★ . *tiktok*
★ . *fb*
★ . *apk*

🎧 *CONVERTERS*
★ . *photo*
★ . *mp3*
★ . *mp4*
★ . *voice*
★ . *sticker*
★ . *attp*

🧩 *UTILITIES*
★ . *ping*
★ . *menu*
★ . *calc*
★ . *weather*
★ . *qrcode*

🧑‍💼 *OWNER COMMANDS*
★ . *setpp*
★ . *block*
★ . *unblock*
★ . *broadcast*
★ . *restart*

👥 *GROUP TOOLS*
★ . *tagall*
★ . *hidetag*
★ . *promote*
★ . *demote*
★ . *antilink*

🌌 *ANIME ZONE*
★ . *anime*
★ . *waifu*
★ . *neko*
★ . *cosplay*

🤣 *FUN ZONE*
★ . *truth*
★ . *dare*
★ . *fact*
★ . *quote*
★ . *joke*

💬 *AUTOMATION*
★ . *autoreply*
★ . *autovoice*
★ . *autoreact*
★ . *autostatus*

🎭 *REACT & STYLE*
★ . *react*
★ . *emojimix*
★ . *style*

🛠️ *LOGO MAKER*
★ . *logo*
★ . *3dtext*
★ . *marvel*
★ . *neon*

🎙️ *VOICE FX*
★ . *bass*
★ . *robot*
★ . *deep*
★ . *slow*

📥 *STORAGE & TOOLS*
★ . *addnote*
★ . *getnote*
★ . *delnote*
★ . *listnote*

📦 *SYSTEM*
★ . *alive*
★ . *owner*
★ . *script*
★ . *support*
`.trim();

  // Fake verification contact
  const fakeContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "PKDRILLER ✅",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PKDRILLER\nORG:PK-XMD;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`
      }
    }
  };

  const context = {
    isForwarded: true,
    forwardingScore: 999,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363288304618280@newsletter",
      newsletterName: "PK-XMD Official Channel",
      serverMessageId: 100
    },
    externalAdReply: {
      title: "PK-XMD WhatsApp Bot",
      body: `By PKDRILLER • ${date}`,
      mediaType: 1,
      renderLargerThumbnail: false,
      showAdAttribution: false,
      sourceUrl: "https://github.com/mejjar00254/PK-XMD"
    }
  };

  // Send menu without thumbnail
  await Void.sendMessage(m.chat, {
    image: { url: "https://files.catbox.moe/fgiecg.jpg" },
    caption: menutext,
    contextInfo: context,
  }, { quoted: fakeContact });
});
  
