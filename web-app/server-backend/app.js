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
        // Content-type is very interesting part that guarantee that
        // Web browser will handle response in an appropriate manner.
        
        
      exec("python3 /home/ivan/university/sct/my-sandbox/styler/research/multi_style/demo.py"
      + " --model /home/ivan/university/sct/my-sandbox/sctSt/pilars_model/pilars.model"
      + " --style-image /home/ivan/university/sct/my-sandbox/sctSt/pilars_model/pilars.jpg"
      + " --cuda 0"
      + " --out-image " + outFile
      + " --image " + inFile
      + " --w 300 --h 300",
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

const host = '127.0.0.1';
const port = 1080;
server.listen({ host, port }, () => {
    console.log(`tus server listening at http://${host}:${port}`);
});
