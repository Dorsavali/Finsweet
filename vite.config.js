import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'

function getHtmlEntryFiles(srcDir) {
 const entry = {};

 function traverseDir(currentDir) {
   const files = fs.readdirSync(currentDir);

   files.forEach((file) => {
  const filePath = path.join(currentDir, file);
  const isDirectory = fs.statSync(filePath).isDirectory();

  if (isDirectory) {
    // If it's a directory, recursively traverse it
    traverseDir(filePath);
  } else if (path.extname(file) === '.html') {
    // If it's an HTML file, add it to the entry object
    const name = path.relative(srcDir, filePath).replace(/\..*$/, '');
    entry[name] = filePath;
  }
   });
 }

    if (srcDir == 'src') {
        entry['index'] = path.resolve(__dirname, 'index.html');
    }

 traverseDir(srcDir);

 return entry;
}


export default defineConfig({
 build: {
  rollupOptions: {
   input: getHtmlEntryFiles('src')
  },
  outDir: 'dist',
 },
 optimizeDeps: {
  entries: 'src/**/*{.html,.css,.js}'
 }
})
