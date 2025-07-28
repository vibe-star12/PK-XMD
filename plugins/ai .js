const { cmd } = require('../command');
const axios = require('axios');
const moment = require('moment-timezone');

// Nairobi time helper
const getTimeNow = () => moment().tz("Africa/Nairobi").format("HH:mm:ss");

const getContextInfo = (title, url, thumb) => ({
  externalAdReply: {
    showAdAttribution: true,
    title: title,
    body: "PK-XMD | Multi-Device WhatsApp Bot",
    thumbnailUrl: thumb || "https://telegra.ph/file/3050269176219cc6e3b8d.jpg",
    sourceUrl: url || "https://github.com/pkphotographer1911/PK-XMD"
  },
  forwardingScore: 999,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: '120363288304618280@newsletter',
    newsletterName: 'PK-XMD Updates'
  }
});

const customReplies = (q) => {
  const lower = q.toLowerCase();
  const today = moment().tz("Africa/Nairobi");
  if (lower.includes("pk-xmd")) return "🔥 PK-XMD is a Multi-Device WhatsApp Bot made by *PKDRILLER*.";
  if (lower.includes("pkdriller")) return "👑 PKDRILLER is the official creator of the *PK-XMD* WhatsApp bot.";
  if (lower.includes("channel")) return "📢 Official channel: https://whatsapp.com/channel/0029Vad7YNyJuyA77CtIPX0x";
  if (lower.includes("repo") || lower.includes("github")) return "🔗 GitHub repo: https://github.com/pkphotogrqpher1911/PK-XMD";
  if (lower.includes("date") || lower.includes("today")) return `📅 Today is ${today.format("dddd, MMMM Do YYYY")}`;
  if (lower.includes("day")) return `📆 Today is *${today.format("dddd")}*`;
  if (lower.includes("time") || lower.includes("clock")) return `⏰ Time in Nairobi: *${getTimeNow()}*`;
  return null;
};

// 1. .64 Command
cmd({
  pattern: "ai",
  alias: ["bot", "dj", "gpt", "gpt4", "bing"],
  desc: "Chat with an AI model",
  category: "ai",
  react: "🤖",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("Please provide a message for the AI.\nExample: `.ai Hello`");

    const fixed = customReplies(q);
    if (fixed) return conn.sendMessage(m.chat, { text: fixed, contextInfo: getContextInfo("AI Response") });

    const res = await axios.get(`https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`);
    if (!res.data || !res.data.message) return reply("AI failed to respond.");

    const time = getTimeNow();
    return conn.sendMessage(m.chat, {
      text: `🤖 *AI Response:*\n\n${res.data.message}\n\n⏰ *Time:* ${time}`,
      contextInfo: getContextInfo("AI Response")
    });

  } catch (e) {
    console.error("AI Error:", e);
    reply("❌ Error occurred.");
  }
});

// 2. .openai Command
cmd({
  pattern: "openai",
  alias: ["chatgpt", "gpt3", "open-gpt"],
  desc: "Chat with OpenAI",
  category: "ai",
  react: "🧠",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("Please provide a message for OpenAI.\nExample: `.openai Hello`");

    const fixed = customReplies(q);
    if (fixed) return conn.sendMessage(m.chat, { text: fixed, contextInfo: getContextInfo("OpenAI Response") });

    const res = await axios.get(`https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`);
    if (!res.data || !res.data.result) return reply("OpenAI failed to respond.");

    const time = getTimeNow();
    return conn.sendMessage(m.chat, {
      text: `🧠 *OpenAI Response:*\n\n${res.data.result}\n\n⏰ *Time:* ${time}`,
      contextInfo: getContextInfo("OpenAI Response")
    });

  } catch (e) {
    console.error("OpenAI Error:", e);
    reply("❌ Error occurred.");
  }
});

// 3. .deepseek Command
cmd({
  pattern: "deepseek",
  alias: ["deep", "seekai"],
  desc: "Chat with DeepSeek AI",
  category: "ai",
  react: "🧠",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("Please provide a message for DeepSeek AI.\nExample: `.deepseek Hello`");

    const fixed = customReplies(q);
    if (fixed) return conn.sendMessage(m.chat, { text: fixed, contextInfo: getContextInfo("DeepSeek Response") });

    const res = await axios.get(`https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`);
    if (!res.data || !res.data.answer) return reply("DeepSeek failed to respond.");

    const time = getTimeNow();
    return conn.sendMessage(m.chat, {
      text: `🧠 *DeepSeek AI Response:*\n\n${res.data.answer}\n\n⏰ *Time:* ${time}`,
      contextInfo: getContextInfo("DeepSeek Response")
    });

  } catch (e) {
    console.error("DeepSeek Error:", e);
    reply("❌ Error occurred.");
  }
});
      
