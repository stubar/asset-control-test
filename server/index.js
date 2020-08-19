const express    = require('express');        // call express
const app        = express();                 // define our app using express
const path = require('path');
const getFromLine = require('./get-from-line')
const mockService = require('./mock-service')
const execSync = require('child_process').execSync;
const fs = require('fs')

app.use(express.static(path.join(__dirname, 'build')));

const port = process.env.PORT || 8080;        // set our port

const logLocation = './log-file/events.log'

mockService('./log-file/events.log')
app.get('/get-logs', function(req, res) {
  if(fs.existsSync(logLocation)){
    const fromLine = parseInt(req.query.fromLine) || 0
    const pageSize = parseInt(req.query.pageSize) || 10

    getFromLine(fromLine, logLocation,pageSize)
      .then(lines => res.json(lines))
      .catch((e) => {
        console.log(e)
        res.status(503).send('Service Not Ready.')
      })
  } else {
    res.status(503).send('Service Not Ready')
  }

});
app.get('/status', function(req, res) {
  if(fs.existsSync(logLocation)){
    const size = parseInt(execSync(`wc -l < ${logLocation}`).toString().trim())
    res.json({size})
  } else {
    res.status(503).send('Service Not Ready')
  }

});
app.listen(port);
console.log('node server started on port ' + port);
