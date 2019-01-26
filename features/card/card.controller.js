const express = require('express');
const router = express.Router();
const cardService = require('./card.service');
 
// routes
router.post('/', create);
router.get('/', getAll);
router.put('/', update);
router.delete('/{id}', _delete);

function create(req, res, next) {
    cardService.create(req.body)
        .then(() => res.json({"status" : 201}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    cardService.getAll()
        .then(summary => res.json({"status" : 200, "body" : summary}))
        .catch(err => next(err));
}

function update(req, res, next) {
    cardService.update(req.body)
        .then(() => res.json({"status" : 200}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    cardService._delete(req.body)
        .then(() => res.json({"status" : 200}))
        .catch(err => next(err));
}




module.exports = router;