const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../config');

const ppUrls = [
  'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
  'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
  'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
];

const GroupEvents = async (conn, update) => {
  try {
    const isGroup = isJidGroup(update.id);
    if (!isGroup) return;

    const metadata = await conn.groupMetadata(update.id);
    const participants = update.participants;
    const desc = metadata.desc || "No Description";
    const groupMembersCount = metadata.participants.length;

    let ppUrl;
    try {
      ppUrl = await conn.profilePictureUrl(update.id, 'image');
    } catch {
      ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
    }

    for (const num of participants) {
      const userName = num.split("@")[0];
      const timestamp = new Date().toLocaleString();

      const contextInfo = {
        mentionedJid: [num],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterName: "PK-XMD Group Logs",
          newsletterJid: "120363288304618280@newsletter"
        }
      };

      if (update.action === "add" && config.WELCOME === "true") {
        const WelcomeText = `╭─〔 🤖 *PK-XMD Bot* 〕\n` +
          `├👋 Welcome @${userName} to *${metadata.subject}* 🎉\n` +
          `├👤 You are member *#${groupMembersCount}*\n` +
          `├⏰ Joined: ${timestamp}\n` +
          `╰📜 *Group Description:*\n${desc}\n\n` +
          `🚀 *Powered by ${config.BOT_NAME}*`;

        await conn.sendMessage(update.id, {
          image: { url: ppUrl },
          caption: WelcomeText,
          contextInfo
        });

      } else if (update.action === "remove" && config.GOODBYE === "true") {
        const GoodbyeText = `╭─〔 🤖 *PK-XMD Bot* 〕\n` +
          `├😢 Goodbye @${userName}\n` +
          `├⏰ Left: ${timestamp}\n` +
          `├👥 Members left: *${groupMembersCount}*\n` +
          `╰🥀 We’ll miss you!\n\n` +
          `🚀 *Powered by ${config.BOT_NAME}*`;

        await conn.sendMessage(update.id, {
          image: { url: ppUrl },
          caption: GoodbyeText,
          contextInfo
        });

      } else if (update.action === "demote" && config.ADMIN_EVENTS === "true") {
        const demoter = update.author.split("@")[0];

        await conn.sendMessage(update.id, {
          text: `╭─〔 ⚠️ *Admin Update* 〕\n` +
                `├⬇️ @${demoter} demoted @${userName}\n` +
                `├⏰ ${timestamp}\n` +
                `╰👥 Group: *${metadata.subject}*\n\n🚀 *PK-XMD*`,
          mentions: [update.author, num],
          contextInfo
        });

      } else if (update.action === "promote" && config.ADMIN_EVENTS === "true") {
        const promoter = update.author.split("@")[0];

        await conn.sendMessage(update.id, {
          text: `╭─〔 🎉 *Admin Update* 〕\n` +
                `├🔼 @${promoter} promoted @${userName}\n` +
                `├⏰ ${timestamp}\n` +
                `╰👥 Group: *${metadata.subject}*\n\n🚀 *PK-XMD*`,
          mentions: [update.author, num],
          contextInfo
        });
      }
    }

  } catch (err) {
    console.error('Group event error:', err);
  }
};

module.exports = GroupEvents;
        
