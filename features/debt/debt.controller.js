const express = require('express');
const router = express.Router();
const debtService = require('./debt.service');
 
// routes
router.post('/', newDebt);

function newDebt(req, res, next) {
    debtService.newDebt(req.body)
        .then(() => res.json({"status" : 201}))
        .catch(err => next(err));
}


module.exports = router;