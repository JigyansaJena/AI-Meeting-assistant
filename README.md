# 🎙️ AI Meeting Assistant

An AI-powered meeting assistant that automatically transcribes audio recordings and generates structured summaries with action items — built with Node.js, Groq Whisper, and Llama AI.

## ✨ Features

- 🎙️ **Audio Transcription** — Upload any meeting recording (MP3, MP4, WAV, M4A)
- 📋 **Smart Summarization** — Auto-generates meeting title, key points, and decisions
- ✅ **Action Items** — Extracts tasks with owner and deadline from conversation
- 👥 **Attendee Detection** — Identifies meeting participants automatically
- 📧 **Clean UI** — Drag & drop interface with real-time progress tracking
- 💰 **100% Free** — Built on Groq's free tier (no API costs)

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + Express |
| File Upload | Multer |
| Transcription | Groq Whisper Large V3 |
| Summarization | Groq Llama / GPT-OSS-20B |
| Frontend | HTML + CSS + Vanilla JS |
| Deployment | Render (backend) + Vercel (frontend) |

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

```bash
# Clone the repo
git clone https://github.com/JigyansaJena/AI-Meeting-assistant.git
cd AI-Meeting-assistant

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your GROQ_API_KEY to .env

# Start the server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=3000
```

## 📖 Usage

1. Open `http://localhost:3000` in your browser
2. Drag & drop or choose an audio file (MP3, WAV, M4A — max 25MB)
3. Click **"Generate Summary"**
4. Get instant:
   - Meeting title and summary
   - List of attendees
   - Key discussion points
   - Action items with owners and deadlines
   - Full transcript

## 📁 Project Structure

```
ai-meeting-assistant/
├── backend/
│   ├── index.js              # Express server
│   ├── routes/
│   │   └── process.js        # Upload + processing route
│   └── utils/
│       ├── transcribe.js     # Groq Whisper transcription
│       ├── summarize.js      # Groq Llama summarization
│       └── email.js          # Email delivery
├── frontend/
│   ├── index.html            # Main UI
│   ├── style.css             # Styling
│   └── app.js                # Frontend logic
├── .env.example
└── package.json
```

## 🔌 API Reference

### POST `/api/process`

Upload and process a meeting audio file.

**Request:** `multipart/form-data`
| Field | Type | Description |
|---|---|---|
| audio | File | Audio file (MP3/WAV/M4A/MP4, max 25MB) |

**Response:**
```json
{
  "success": true,
  "transcript": "Full meeting transcript...",
  "summary": {
    "title": "Meeting Title",
    "date": "2026-10-19",
    "duration": "30 minutes",
    "attendees": ["John", "Sarah"],
    "key_points": ["Point 1", "Point 2"],
    "decisions": ["Decision 1"],
    "action_items": [
      {
        "task": "Complete homepage design",
        "owner": "John",
        "deadline": "Friday"
      }
    ],
    "summary": "Brief meeting overview..."
  }
}
```

## 💡 How It Works

```
Audio File → Groq Whisper → Transcript → Groq Llama → Structured Summary → UI Display
```

1. User uploads audio file via drag & drop
2. Multer saves file temporarily to `/backend/uploads/`
3. Groq Whisper Large V3 transcribes the audio to text
4. Groq GPT-OSS-20B analyzes transcript and extracts structured data
5. Temp file is deleted, results are returned to frontend
6. Frontend renders summary, action items, and transcript

## 🌐 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on [render.com](https://render.com)
3. Connect GitHub repo
4. Add environment variables
5. Deploy!

### Frontend (Vercel)
1. Import project on [vercel.com](https://vercel.com)
2. Set root directory to `frontend/`
3. Deploy!

## 📊 Free Tier Limits (Groq)

| Service | Free Limit |
|---|---|
| Whisper Transcription | 7,200 seconds/day |
| LLM (Summarization) | 14,400 requests/day |

More than enough for personal and student use!

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📄 License

MIT License — feel free to use for personal and commercial projects.

---

Built with ❤️ by [Jigyansa Jena](https://github.com/JigyansaJena)
