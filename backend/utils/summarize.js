const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function summarizeMeeting(transcript) {
  try {
    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'system',
          content: `You are an expert meeting summarizer.
          Always respond with ONLY VALID JSON, no extra text.`
        },
        {
          role: 'user',
          content: `Analyze this meeting transcript and return a JSON object with exactly this structure: 
          {
          {
  "title": "Meeting title based on discussion",
  "date": "Today's date",
  "duration": "Estimated duration",
  "attendees": ["name1", "name2"],
  "key_points": [
    "Important point 1",
    "Important point 2"
  ],
  "decisions": [
    "Decision made 1",
    "Decision made 2"
  ],
  "action_items": [
    {
      "task": "What needs to be done",
      "owner": "Who is responsible",
      "deadline": "When (if mentioned)"
    }
  ],
  "summary": "2-3 sentence overview of the meeting"
}
  Transcript:
${transcript}`
        }
      ],
      temperature: 0.3,
      max_tokens: 1500
    });

    const content = response.choices[0].message.content;
    const parsed = JSON.parse(content);
    console.log('summary generated!');
    return parsed;
  } catch (error) {
    console.error('Summary error: ', error.message);
    throw new Error('Summary generation failed: '+ error.message);
  }
}

module.exports = {summarizeMeeting};