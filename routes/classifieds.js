
'use strict';

const express = require('express');

const router = express.Router();

router.get("/classifieds", (res, req, next) => {
  knex("classifieds")
  .then(results => {
    if (results.length === 0){
      return res.send(404);
    }
    return res.status(200).send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get("/classifieds/:id", (res, req, next) => {
  knex("classifieds")
  .where("id", req.params.id)
  .first()
  .then((classifieds) => {
    if (!classifieds) {
      return next ();
    }
    return res.status(200).send(classifieds);
  })
  .catch((err) => {
    next(err);
  });
});

router.post("/classifieds", (req, res, send){
  knex("classifieds")
  .insert({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    item_image: req.body.item_image
  }, "*")
  .then((classifieds) => {
    return res.status(200).send(classifieds[0]);
  })
  .catch((err) => {
    next(err);
  });
});

router.patch("/classifieds", (req, res, send){
  knex(classifieds)
  .where("id", req.params.id)
  .first()
  .then((classifieds) => {
    if (!classifieds){
      return next();
    }
    return knex("classifieds")
    .update ({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      item_image: req.body.item_image
    }, "*")
    .where("id", req.params.id)
  })
  .then((classifieds) => {
    res.status(200).send(classifieds[0]);
  })
  .catch((err) => {
    next(err);
  });
});

router.delete("/classifieds/:id", (req, res, send) {
  let classifieds;
  knex("classifieds")
  .where("id", req.params.id)
  first()
  .then((row) => {
    if (!row) => {
      return next();
    }
    classifieds = row;
    return knex ("classifieds")
    .del()
    .where("id", req.params.id)
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
