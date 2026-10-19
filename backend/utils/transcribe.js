const Groq = require('groq-sdk');
const fs = require('fs');
const { Models } = require('groq-sdk/resources.js');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function transcribeAudio(filePath) {
  try {
    const audioFile = fs.createReadStream(filePath);

    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-large-v3',
      language: 'en',
      response_format: 'text'
    });

    console.log('Transcription done!');
    return transcription;
  } catch (error) {
    console.error('Transcription error: ', error.message);
    throw new Error('Audio transcription failed: '+ error.message);
  }
}

module.exports = {transcribeAudio};