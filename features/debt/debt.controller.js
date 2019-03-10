const express = require('express');
const router = express.Router();
const debtService = require('./debt.service');
 
// routes
router.post('/', create);
router.post('/:id', _delete);
router.get('/', all);
router.get('/day', day);
router.get('/daily', daily);
router.get('/month', month);
router.get('/monthly', monthly);
router.get('/year', year);

function create(req, res, next) {
    console.log("email: " + req.query.email);
    debtService.create(req.body, req.query.email)
        .then(() => res.json({"status" : 201}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    console.log("id: " + req.query.id);
    debtService._delete(req.query.id)
        .then(() => res.json({"status" : 201}))
        .catch(err => next(err));
}

function all(req, res, next) {
    console.log("email: " + req.query.email);
    debtService.all(req.query.email)
        .then(result => res.json({"status" : 200, "body" : result}))
        .catch(err => next(err));
}

function day(req, res, next) {
    debtService.day(parseInt(req.query.year), parseInt(req.query.month), parseInt(req.query.day))
        .then(result => res.json({"status" : 200, "body" : result}))
        .catch(err => next(err));
}

function daily(req, res, next) {
    debtService.daily(parseInt(req.query.year), parseInt(req.query.month))
        .then(result => res.json({"status" : 200, "body" : result}))
        .catch(err => next(err));
}

function month(req, res, next) {
    debtService.month(parseInt(req.query.year), parseInt(req.query.month)) 
        .then(result => res.json({"status" : 200, "body" : result}))
        .catch(err => next(err));
}

function monthly(req, res, next) {
    debtService.monthly(parseInt(req.query.year))
        .then(result => res.json({"status" : 200, "body" : result}))
        .catch(err => next(err));
}

function year(req, res, next) {
    debtService.year(parseInt(req.query.year)) 
        .then(result => res.json({"status" : 200, "body" : result}))
        .catch(err => next(err));
}



module.exports = router;