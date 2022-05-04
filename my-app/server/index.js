const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.post('/client', (req, res) => {
  console.log(req.body);
  res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3000',
  'Access-Control-Allow-Methods', 'POST')
  res.send('hello from post')
})

app.get('/', (req, res) => {
  res.send('hello from server');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
