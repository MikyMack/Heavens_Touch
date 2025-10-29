const axios = require("axios");
const he = require("he");
const Verse = require("../models/Verse");

async function fetchDailyVerse() {
  try {
    const res = await axios.get(
      "https://www.biblegateway.com/votd/get/?format=json&version=NIV"
    );

    const verseData = {
      text: he.decode(res.data.votd.text),        
      reference: he.decode(res.data.votd.display_ref),
      date: new Date().toLocaleDateString("en-IN")
    };

    const exists = await Verse.findOne({ date: verseData.date });
    if (!exists) {
      await Verse.create(verseData);
    } else {
      console.log("ℹ️ Today's verse already exists");
    }
  } catch (err) {
    console.error("❌ Error fetching Bible verse:", err.message);
  }
}

// ✅ Run once on startup
fetchDailyVerse();

const now = new Date();
const msUntilMidnightIST =
  new Date().setHours(24, 1, 0, 0) - new Date().getTime();

setTimeout(() => {
  fetchDailyVerse();
  setInterval(fetchDailyVerse, 24 * 60 * 60 * 1000);
}, msUntilMidnightIST);

module.exports = { fetchDailyVerse };
