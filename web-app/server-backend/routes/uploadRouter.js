

const writeFile = (req, res) => {
  // Determine file to serve
  let filename = req.url;
  if (filename == '/') {
      filename = '/index.html';
  }
  if (!filename.startsWith('/dist/')) {
      filename = '/demos/browser' + filename;
  }
  filename = path.join(process.cwd(), '/node_modules/tus-js-client', filename);
  fs.readFile(filename, 'binary', (err, file) => {
      if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.write(err);
          res.end();
          return;
      }

      // Update demo URL to point to our local server
      file = file.replace('https://master.tus.io/files/', `http://${host}:${port}/files/`)

      res.writeHead(200);
      res.write(file);
      res.end();
  });
};