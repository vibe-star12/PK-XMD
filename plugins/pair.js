const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Get pairing code for PK-XMD bot",
    category: "download",
    use: ".pair 254700123456",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, args, q, senderNumber, reply }) => {
    try {
        const phoneNumber = q ? q.trim().replace(/[^0-9]/g, '') : senderNumber.replace(/[^0-9]/g, '');

        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await reply("❌ Please provide a valid phone number without `+`\nExample: `.pair 254700123456`");
        }

        const res = await axios.get(`https://pk-v33i.onrender.com/code?number=${encodeURIComponent(phoneNumber)}`);
        if (!res.data || !res.data.code) {
            return await reply("❌ Failed to retrieve pairing code. Please try again later.");
        }

        const pairingCode = res.data.code;

        const captionText = `
╭─〔 *PK-XMD PAIRING SUCCESSFUL* 〕
│
├─ *📱 Number:* ${phoneNumber}
├─ *🔗 Pairing Code:* ${pairingCode}
│
╰─ *🚀 Powered by Pkdriller*
`.trim();

        // Send with button
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/9pxerh.jpg` },
            caption: captionText,
            footer: 'Tap below to copy the pairing code 🔽',
            buttons: [
                {
                    buttonId: `.copy ${pairingCode}`,
                    buttonText: { displayText: '📋 Copy Code' },
                    type: 1
                }
            ],
            headerType: 4,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "PK-XMD BOT PAIRING",
                    body: "Deploy your own PK-XMD clone today!",
                    mediaType: 1,
                    thumbnailUrl: `https://files.catbox.moe/9pxerh.jpg`,
                    sourceUrl: "https://github.com/nexustech1911/PK-XMD"
                },
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: 'PK-XMD UPDATES',
                    serverMessageId: 119
                }
            }
        }, {
            quoted: {
                key: {
                    fromMe: false,
                    participant: "0@s.whatsapp.net",
                    remoteJid: "status@broadcast"
                },
                message: {
                    contactMessage: {
                        displayName: "PK-XMD VERIFIED",
                        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:BOT;PK-XMD;;;\nFN:PK-XMD\nitem1.TEL;waid=254700000000:+254 700 000000\nitem1.X-ABLabel:Bot\nEND:VCARD`
                    }
                }
            }
        });

    } catch (error) {
        console.error("❌ Pair command error:", error);
        await reply("❌ Error retrieving pairing code. Try again later.");
    }
});
                    
