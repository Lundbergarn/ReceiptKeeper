const express = require('express');
const Kvitto = require('../models/Kvitto');
const auth = require('../middleware/auth')
const async = require('async')
const router = new express.Router();
const fs = require('fs');


router.get('/kvitton', auth, async (req, res) => {
  try {
    const kvitton = await Kvitto.find({ owner: req.id })
    if (!kvitton) {
      return res.status(404).send({ message: 'No receipts found' });
    }
    res.status(200).send(kvitton);

  } catch (err) {
    res.status(500).send(err, { message: 'Bad request' })
  }
});


router.post('/kvitton', auth, async (req, res) => {

  if (req.body.image.length > 1000 && req.body.title.length > 1) {
    const { title, image } = req.body;

    const task = new Kvitto({
      title: title,
      image: image,
      owner: req.user._id
    });

    try {
      await task.save()
      res.status(201).send(task)
    } catch (err) {
      res.status(400).send(err)
    }
  } else {
    res.status(400).send({ error: ' Add a image and a title' });
  }
});

module.exports = router;