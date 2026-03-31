const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processClasses(content) {
  // Regex to match className="<classes>" or className={<classes>} (where classes are strings)
  return content.replace(/className=(["`])([^"`]*?)\1/g, (match, quote, classes) => {
    let classList = classes.split(/\s+/);
    let newClassList = classList.filter(c => {
      // Remove all responsive text size classes
      if (/^(xs|sm|md|lg|xl|2xl):text-(xs|sm|base|md|lg|xl|\d+xl|\[\d+px\])$/.test(c)) return false;
      return true;
    }).map(c => {
      // For remaining text size classes, map them 
      if (/^text-(4xl|5xl|6xl|7xl|8xl|9xl|\[(?:36|40|48|60|72).*px\])$/.test(c)) return 'text-4xl'; // 36px
      if (/^text-(2xl|3xl|\[(?:24|26|28|30).*px\])$/.test(c)) return 'text-2xl'; // 24px
      if (/^text-(xs|sm|base|md|lg|xl|\[10px\]|\[12px\]|\[14px\]|\[16px\]|\[18px\]|\[20px\])$/.test(c)) return 'text-sm'; // 14px
      return c;
    });
    
    // De-duplicate if multiple text classes mapped to same thing
    let finalClasses = [...new Set(newClassList)].join(' ');
    return `className=${quote}${finalClasses}${quote}`;
  });
}

walkDir('src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = processClasses(content);
    if (content !== updated) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
