// Import Showdown
import showdown from 'showdown';

// FileMaker Ready Wrapper
//https://github.com/stephancasas/onfmready.js
const OnFMReady = (function () {
    class OnFMReady {
        static runFunction(callback, ...args) {
            let interval = setInterval(() => {
                if (typeof FileMaker === 'object') {
                    clearInterval(interval);
                    callback.call(this, ...args);
                }
            }, 100);
        }

        static runScript(name, parameter) {
            this.runFunction(() => {
                FileMaker.PerformScript(name, parameter);
            });
        }

        static run(...args) {
            if (typeof args[0] === 'string') {
                this.runScript(args[0], args[1]);
            } else {
                this.runFunction(...args);
            }
        }
    }
    return OnFMReady;
})(this);

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
    
    // Use OnFMReady to safely execute the FileMaker script
    OnFMReady.run('MarkdownToHtmlCallback', html);
  }
}

