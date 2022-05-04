import {saveDrink, getDrink} from '../../../server/db.js'

export default function handler(req, res) {
if (req.method === 'GET') {
  getDrink(req.query.client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(404).send(err);
    })
}

if (req.method === 'POST') {
  saveDrink(req.body.client, req.body.lastDrink)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
  }
}
