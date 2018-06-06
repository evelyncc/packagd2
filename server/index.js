const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const {
  handleUPSRequest,
  handleUSPSRequest,
  handleTrackingRequest,
  handleAddTracking,
} = require('./handlers/requestHandlers');

const app = express();
const port = 5001;

app.listen(port, () => console.log(`App live on http://localhost:${port}`));

app.use('/', express.static(path.resolve(__dirname, '../client/dist')));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

app.get('/ups', handleUPSRequest);
app.get('/usps', handleUSPSRequest);
app.get('/tracking', handleTrackingRequest);
app.post('/add', handleAddTracking);
