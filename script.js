// Your script here.
// Create a new SpeechSynthesisUtterance instance
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const textArea = document.querySelector('[name="text"]');

// Function to populate voices in the dropdown
function populateVoices() {
  voices = window.speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Function to set voice from dropdown
function setVoice() {
  const selectedVoice = voices.find(voice => voice.name === this.value);
  msg.voice = selectedVoice;
  restart();
}

// Function to handle rate and pitch changes
function setOption() {
  msg[this.name] = this.value;
  restart();
}

// Function to start speaking
function speak() {
  if (!textArea.value.trim()) {
    alert("Please enter some text to speak.");
    return;
  }
  msg.text = textArea.value;
  window.speechSynthesis.speak(msg);
}

// Function to stop speaking
function stop() {
  window.speechSynthesis.cancel();
}

// Function to restart speech with updated settings
function restart() {
  stop();
  speak();
}

// Event listeners
window.speechSynthesis.onvoiceschanged = populateVoices;
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);
