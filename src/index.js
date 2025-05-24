// Import Showdown
import showdown from 'showdown';

// Set global options before creating converter
showdown.setOption('noHeaderId', true);
showdown.setOption('strikethrough', true);
showdown.setOption('tasklists', true);
showdown.setOption('parseImgDimension', true);
showdown.setOption('tables', true);
showdown.setOption('backslashEscapesHTMLTags', true);

// Initialize Showdown converter    
const converter = new showdown.Converter();

// Main function that converts markdown to HTML and sends to FileMaker
window.markdownToHtml = function (text) {
  if (text) {
    // Convert markdown to HTML
    const html = converter.makeHtml(text);
    
    // Send the HTML to FileMaker
    if (typeof FileMaker !== 'undefined' && html && html.trim() !== '') {
      FileMaker.PerformScriptWithOption("MarkdownToHtmlCallback", html, 0);
    } else {
      console.error('FileMaker object is not available or no HTML content to save');
    }
  }
}

