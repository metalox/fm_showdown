// Import Showdown
import showdown from 'showdown';

// Set global options before creating converter
showdown.setOption('noHeaderId', true);

// Initialize Showdown converter    
const converter = new showdown.Converter();

// Get references to DOM elements
const outputDiv = document.getElementById('output');
const getBtn = document.getElementById('get-button');
const saveBtn = document.getElementById('save-button');

// Variable to store the converted HTML
let currentHtml = '';

function fmGetScript() {
  if (typeof FileMaker !== 'undefined') {
    FileMaker.PerformScriptWithOption("MarkdownToHtmlJSPreview", "", 0);
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
if (getBtn) {
  getBtn.onclick = function () {
    fmGetScript();
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
window.markdownToHtmlPreview = function (text) {
  if (text) {
    convertText(text);
  }
}

// Function that converts markdown to HTML, displays it, and saves to FileMaker
window.markdownToHtmlAndSave = function (text) {
  if (text) {
    // Convert and display the markdown
    convertText(text);
    // Save the HTML to FileMaker
    fmSaveHtml();
  }
}

// Initial display
outputDiv.innerHTML = "Loading...";

