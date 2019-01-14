const express = require('express');
const router = express.Router();
const debtService = require('./debt.service');
 
// routes
router.post('/', newDebt);
router.get('/', getAll);
router.get('/daily', getSummaryDaily);
router.get('/monthly', getSummaryMonthly);
router.get('/month', getSummaryByMonth);

function newDebt(req, res, next) {
    debtService.newDebt(req.body)
        .then(() => res.json({"status" : 201}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    debtService.getAllDebts()
        .then(summary => res.json({"status" : 200, "body" : summary}))
        .catch(err => next(err));
}

function getSummaryDaily(req, res, next) {
    debtService.getAllDebtsDaily()
        .then(summary => res.json({"status" : 200, "body" : summary}))
        .catch(err => next(err));
}

function getSummaryMonthly(req, res, next) {
    debtService.getAllDebtsMonthly()
        .then(summary => res.json({"status" : 200, "body" : summary}))
        .catch(err => next(err));
}

function getSummaryByMonth(req, res, next) {
    debtService.getAllDebtsByMonth(req.query.month, req.query.year)
        .then(summary => res.json({"status" : 200, "body" : summary}))
        .catch(err => next(err));
}



module.exports = router;