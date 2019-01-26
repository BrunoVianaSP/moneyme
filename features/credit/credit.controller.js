const express = require('express');
const router = express.Router();
const creditService = require('./credit.service');
 
// routes
router.post('/', create);
router.get('/', getAll);
router.put('/', update);
router.delete('/:id', _delete);

function create(req, res, next) {
    creditService.create(req.body)
        .then(() => res.status(201).json({"status" : 201}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    creditService.getAll()
        .then(summary => res.json({"status" : 200, "body" : summary}))
        .catch(err => next(err));
}

function update(req, res, next) {
    creditService.update(req.body)
        .then(() => res.json({"status" : 200}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    creditService._delete(req.params.id)
        .then(() => res.json({"status" : 200}))
        .catch(err => next(err));
}




module.exports = router;