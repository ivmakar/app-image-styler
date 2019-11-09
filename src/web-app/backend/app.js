const tus = require('tus-node-server');
const express = require('express');
const fs = require('fs');
const http = require('http');
const EVENTS = tus.EVENTS;

const app = express();
const exec = require('child_process').exec;

const tusServer = new tus.Server();

tusServer.datastore = new tus.FileStore({
  path: '/files'
});

tusServer.on(EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
  console.log(`Upload complete for file ${event.file.id}`);
});

app.head('*', (req, res) => {
  tusServer.handle(req, res);
});
app.options('*', (req, res) => {
  tusServer.handle(req, res);
});
app.patch('*', (req, res) => {
  tusServer.handle(req, res);
});
app.post('*', (req, res) => {
  tusServer.handle(req, res);
});

app.get('/files/:fileId', (req, res) => {
  const inFile = "./files/" + req.params.fileId;
  const outFile = "./files/ready/" + req.params.fileId + ".jpg";
  console.log(inFile);

  // Check if file specified by the filePath exists 
  fs.exists(inFile, function(exists){
      if (exists) {  
        let model = " --model /www/styler/models/" + req.query.model + "/" + req.query.model + ".model";
        let styleImage = " --style-image /www/styler/models/" + req.query.model + "/" + req.query.model + "/"  + req.query.img;
        
        const width = req.query.w;
        const height = req.query.h;
        
        exec("python3 /www/styler/predict.py"
          + model
          + styleImage
          + " --cuda 0"
          + " --out-image " + outFile
          + " --image " + inFile
          + " --w " + width + " --h " + height,
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
                res.writeHead(400, {"Content-Type": "text/plain"});
                res.end("ERROR File does not exist");
            } else {
              res.writeHead(200, {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": "attachment"
              });
              fs.createReadStream(outFile).pipe(res);
            }
        });

      } else {  
        res.writeHead(400, {"Content-Type": "text/plain"});
        res.end("ERROR File does not exist");
      }
    });
});
const server = http.createServer(app);

const host = '0.0.0.0';
const port = 1080;
server.listen({ host, port }, () => {
    console.log(`tus server listening at http://${host}:${port}`);
});
