/**
 * ✨ EDIT THIS FILE to customize the birthday greeting! ✨
 *
 * This is the ONLY file you need to modify.
    {
      type: "surprise",
      title: "A little surprise",
      items: [
        { photo: "./img/irene.jpg", music: "./music/hbd.mpeg", label: "Surprise 1" },
        { photo: "./img/irene.jpg", music: "./music/hbd.mpeg", label: "Surprise 2" },
        { photo: "./img/irene.jpg", music: "./music/hbd.mpeg", label: "Surprise 3" },
      ],
    },
 * No need to touch HTML, CSS, or any other JavaScript files.
 *
 * AVAILABLE SECTION TYPES:
 *   "greeting"      → Opening greeting with recipient's name
 *   "announcement"  → Birthday announcement text
 *   "chatbox"       → Chat message with typing animation
 *   "ideas"         → Sequential text reveals, one by one
 *   "quote"         → Styled quote card with optional author
 *   "countdown"     → Animated 3-2-1 countdown
 *   "stars"         → Twinkling stars background
 *   "fireworks"     → Colorful firework sparks burst
 *   "balloons"      → Floating balloon animation
 *   "profile"       → Profile photo with birthday wish
 *   "confetti"      → Confetti burst animation
 *   "closing"       → Closing message with replay button
 *
 * HOW TO USE:
 *   REMOVE a section  → Delete its object from the sections array
 *   DUPLICATE          → Copy-paste any section object
 *   REORDER            → Move the section object up/down in the array
 *   EDIT TEXT          → Change the string values
 */

const CONFIG = {
  // ── Recipient Info ────────────────────────────────────────────
  name: "Daliya",
  photo: "./img/daliyaaa.jpeg",       // Place your photo in the img/ folder
  music: "./music/Amelia Island.mp3",      // Place your music in the music/ folder

  // ── Theme Colors ──────────────────────────────────────────────
  // A toggle button lets the viewer switch between dark & light mode.
  colors: {
    primary: "#f472b6",           // Main accent color (rose pink)
    accent: "#60a5fa",            // Secondary accent color (sky blue)
    dark: {
      background: "#0f182a",      // Slate 900
      text: "#f1f5f9",            // Slate 100
    },
    light: {
      background: "#fafaf9",      // Stone 50
      text: "#1e293b",            // Slate 800
    },
  },

  // ── Default Color Mode ────────────────────────────────────────
  // Options: "dark" or "light"
  defaultMode: "dark",

  // ── Custom Labels ──────────────────────────────────────────────
  // Use these values to override button text throughout the experience.
  labels: {
    surprise: {
      open: "Open",
      soundOn: "🔊 Sound On",
      soundOff: "🔇 Sound Off",
      downloadSong: "Download song",
      backToMain: "Back to main",
      continue: "Continue",
    },
    chatbox: {
      send: "Send",
    },
  },

  // ── Sections ──────────────────────────────────────────────────
  // Add, remove, duplicate, or reorder as you wish!
  sections: [
    {
      type: "greeting",
      title: "Hi",
      subtitle: "Made this for you with lots of love <span>:)</span>",
    },
    {
      type: "countdown",
      from: 5,                    // Countdown from this number
      goText: "It is a special day!!",              // Text shown after countdown ends
    },
    {
      type: "announcement",
      text: "It's your 20th birthday!!",
      dateText: "June 1st",
      dateStart: 2006,
      dateEnd: 2026,
    },
    {
      type: "chatbox",
      message:
        "Happy birthday to youu Daluuuu!! Wishing you a wonderful year ahead filled with joy, love, and endless happiness!",
      buttonText: "Send",
    },
    {
      type: "ideas",
      lines: [
        "That's what I was going to do.",
        "But then I stopped.",
        "I realised, I wanted to do something <strong>special</strong>.",
        "Because,",
        "You are Special <span>:)</span>",
      ],
      bigLetters: "SO",
    },

    {
      type: "surprise",
      title: "Surprise",
      items: [
        { photo: "./img/D.jpeg", music: "./music/1.mp4", },
      ],
    },
    {
      type: "stars",
      count: 40,
    },
    {
      type: "balloons",
      count: 25,
    },
    {
      type: "profile",
     wishTitle: "Happy Birthday Dr.Daliya",

      wishText: "I Love You 3000 times!!",
    },
    {
      type: "fireworks",
      count: 24,
    },
    {
      type: "confetti",
      count: 9,
    },
    
    {
      type: "closing",
      text: "Let me know if you liked it",
     
    },
  ],
};
