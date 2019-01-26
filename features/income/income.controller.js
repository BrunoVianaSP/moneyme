const express = require('express');
const router = express.Router();
const incomeService = require('./income.service');
 
// routes
router.post('/', create);
router.get('/', getAll);
router.put('/', update);
router.delete('/:id', _delete);

function create(req, res, next) {
    incomeService.create(req.body)
        .then(() => res.status(201).json({"status" : 201}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    incomeService.getAll()
        .then(summary => res.json({"status" : 200, "body" : summary}))
        .catch(err => next(err));
}

function update(req, res, next) {
    incomeService.update(req.body)
        .then(() => res.json({"status" : 200}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    incomeService._delete(req.params.id)
        .then(() => res.json({"status" : 200}))
        .catch(err => next(err));
}




module.exports = router;