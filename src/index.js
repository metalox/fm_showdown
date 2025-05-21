// Import Showdown
import showdown from 'showdown';

// Initialize Showdown converter
const converter = new showdown.Converter();

// Get references to DOM elements
const outputDiv = document.getElementById('output');
const refreshBtn = document.getElementById('refresh-button');
const saveBtn = document.getElementById('save-button');

// Variable to store the converted HTML
let currentHtml = '';

function fmRefreshScript() {
  if (typeof FileMaker !== 'undefined') {
    FileMaker.PerformScriptWithOption("LoadWidget", "", 0);
  } else {
    console.error('FileMaker object is not available');
  }
}

function fmSaveHtml() {
  if (typeof FileMaker !== 'undefined' && currentHtml && currentHtml.trim() !== '') {
    FileMaker.PerformScriptWithOption("saveHTMLFromMarkdown", currentHtml, 0);
  } else {
    console.error('FileMaker object is not available or no HTML content to save');
  }
}

// Button click handlers
if (refreshBtn) {
  refreshBtn.onclick = function () {
    fmRefreshScript();
  };
} else {
  console.error('Refresh button not found');
}

if (saveBtn) {
  saveBtn.onclick = function () {
    fmSaveHtml();
  };
} else {
  console.error('Save button not found');
}

// Function to display text in the output div
function convertText(text) {
  // Convert markdown to HTML using Showdown
  currentHtml = converter.makeHtml(text);
  outputDiv.innerHTML = currentHtml;
  
  // Update save button class based on content
  if (saveBtn) {
    if (currentHtml && currentHtml.trim() !== '') {
      saveBtn.classList.add('success');
    } else {
      saveBtn.classList.remove('success');
    }
  }
}

// Function that can be called from FileMaker
window.markdownToHtml = function (text) {
  if (text) {
    convertText(text);
  }
}

// Initial display
outputDiv.innerHTML = "Loading...";

