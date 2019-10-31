const express = require('express');
const bodyParser = require('body-parser');

// const Promos = require('../models/promotions');

const downloadRouter = express.Router();

downloadRouter.use(bodyParser.json());


downloadRouter.route('/:fileId')
.all((req,res,next) => {
  const filePath =  "./files/" + req.params.fileId;
  console.log(filePath);

  // Check if file specified by the filePath exists 
  fs.exists(filePath, function(exists){
      if (exists) {     
        // Content-type is very interesting part that guarantee that
        // Web browser will handle response in an appropriate manner.
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": "attachment; filename=" + req.params.fileId
        });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(400, {"Content-Type": "text/plain"});
        res.end("ERROR File does not exist");
      }
    });
});

// const download = () => {

// }

module.exports = downloadRouter;