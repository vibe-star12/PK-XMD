const { cmd } = require('../command');

cmd({
  pattern: "repo",
  desc: "Show bot repository and deploy info",
  category: "system",
  react: "📦",
  filename: __filename
}, async (conn, m, { from }) => {

  const text = `
╭───❖ 「 *PK-XMD GitHub Repo* 」 ❖───⬣
│🔹 *Name:* PK-XMD
│🔸 *Owner:* mejjar00254
│📦 *Repo:* PK-XMD
│🌐 *URL:* https://github.com/mejjar00254/PK-XMD
│🧑‍💻 *Maintainer:* Pkdriller
╰──────────────────────────────⬣

📘 *Description:*
PK-XMD is a Multi-functional WhatsApp Bot using Baileys library with powerful features and auto-deploy support.

🚀 *Deploy This Bot On:*
┌────────────────────┐
│ 🌐 Render.com
│ 🛠️ Railway.app
│ ☁️ Heroku.com
└────────────────────┘

📍 Simply fork or clone the repo, edit config file, and deploy using your preferred platform.

🔗 *GitHub:* https://github.com/mejjar00254/PK-XMD
⚡ *Powered by:* Pkdriller
`;

  const vcard = {
    displayName: "PK-XMD Bot",
    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:PK-XMD Bot\nORG:PK-XMD Official;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254700000000\nX-USER-TYPE:BOT\nEND:VCARD`
  };

  await conn.sendMessage(from, {
    text,
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: "PK-XMD GitHub Repo",
        body: "Deploy easily on Render | Railway | Heroku",
        thumbnailUrl: "https://files.catbox.moe/fgiecg.jpg",
        sourceUrl: "https://github.com/mejjar00254/PK-XMD",
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      },
      forwardedNewsletterMessageInfo: {
        newsletterName: "PK-XMD Updates",
        newsletterJid: "120363288304618280@newsletter"
      },
      quotedMessage: {
        contactMessage: {
          displayName: "PK-XMD",
          vcard: vcard.vcard
        }
      }
    }
  }, { quoted: m });
});
      
