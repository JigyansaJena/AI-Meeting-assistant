const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileInput');
const fileSelected = document.getElementById('fileSelected');
const fileName = document.getElementById('fileName');
const processBtn = document.getElementById('processBtn');
const loading = document.getElementById('loading');
const loadingText = document.getElementById('loadingText');
const progressFill = document.getElementById('progressFill');
const results = document.getElementById('results');

let selectedFile = null;

// Drag & Drop
uploadBox.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadBox.classList.add('dragover');
});

uploadBox.addEventListener('dragleave', () => {
  uploadBox.classList.remove('dragover');
});

uploadBox.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadBox.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file) handleFileSelect(file);
});

uploadBox.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
  if (e.target.files[0]) handleFileSelect(e.target.files[0]);
});

function handleFileSelect(file) {
  selectedFile = file;
  fileName.textContent = '🎵 ' + file.name;
  fileSelected.style.display = 'flex';
  results.style.display = 'none';
}

// Process Button
processBtn.addEventListener('click', async () => {
  if (!selectedFile) return;

  // Show loading
  fileSelected.style.display = 'none';
  loading.style.display = 'block';
  results.style.display = 'none';

  // Animate progress
  let progress = 0;
  const messages = [
    '🎙️ Transcribing audio...',
    '🤖 Analyzing meeting...',
    '📋 Generating summary...',
    '✅ Almost done...'
  ];
  let msgIdx = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 90) progress = 90;
    progressFill.style.width = progress + '%';

    if (progress > 25 && msgIdx === 0) { loadingText.textContent = messages[1]; msgIdx = 1; }
    if (progress > 55 && msgIdx === 1) { loadingText.textContent = messages[2]; msgIdx = 2; }
    if (progress > 80 && msgIdx === 2) { loadingText.textContent = messages[3]; msgIdx = 3; }
  }, 800);

  try {
    // Send to backend
    const formData = new FormData();
    formData.append('audio', selectedFile);

    const response = await fetch('/api/process', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    clearInterval(interval);
    progressFill.style.width = '100%';

    if (!data.success) throw new Error(data.error);

    setTimeout(() => {
      loading.style.display = 'none';
      displayResults(data);
    }, 500);

  } catch (error) {
    clearInterval(interval);
    loading.style.display = 'none';
    fileSelected.style.display = 'flex';
    alert('Error: ' + error.message);
  }
});

function displayResults(data) {
  const s = data.summary;

  // Fill in data
  document.getElementById('meetingTitle').textContent = s.title || 'Meeting Summary';
  document.getElementById('meetingDate').textContent = '📅 ' + (s.date || 'Today');
  document.getElementById('meetingDuration').textContent = '⏱️ ' + (s.duration || 'N/A');
  document.getElementById('meetingSummary').textContent = s.summary || '';

  // Attendees
  const attendeesList = document.getElementById('attendeesList');
  attendeesList.innerHTML = (s.attendees || [])
    .map(a => `<span class="attendee-chip">👤 ${a}</span>`)
    .join('');

  // Key Points
  const keyPointsList = document.getElementById('keyPointsList');
  keyPointsList.innerHTML = (s.key_points || [])
    .map(p => `<li>${p}</li>`)
    .join('');

  // Action Items
  const actionItemsList = document.getElementById('actionItemsList');
  actionItemsList.innerHTML = (s.action_items || [])
    .map(item => `
      <div class="action-item">
        <span class="action-task">☐ ${item.task}</span>
        <span class="action-owner">👤 ${item.owner || 'TBD'}</span>
        <span class="action-deadline">📅 ${item.deadline || 'TBD'}</span>
      </div>
    `).join('');

  // Transcript
  document.getElementById('transcriptText').textContent = data.transcript;

  // Show results
  results.style.display = 'block';
  results.scrollIntoView({ behavior: 'smooth' });
}

// Copy transcript
document.getElementById('copyBtn').addEventListener('click', () => {
  const text = document.getElementById('transcriptText').textContent;
  navigator.clipboard.writeText(text);
  document.getElementById('copyBtn').textContent = '✅ Copied!';
  setTimeout(() => {
    document.getElementById('copyBtn').textContent = '📋 Copy';
  }, 2000);
});

// New Meeting
document.getElementById('newBtn').addEventListener('click', () => {
  selectedFile = null;
  fileInput.value = '';
  fileSelected.style.display = 'none';
  results.style.display = 'none';
  uploadBox.style.display = 'block';
  progressFill.style.width = '0%';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});