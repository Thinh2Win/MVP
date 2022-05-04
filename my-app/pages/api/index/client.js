// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {createClient} from '../../../server/db.js'

export default function handler(req, res) {
if (req.method === 'POST') {
    createClient(req.body.client)
      .then(data => {
        res.status(201).send(data);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
}
