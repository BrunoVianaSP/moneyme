module.exports = {
    debtSummary,
    creditSummary,
    incomeSummary,
    creditSummary
};

function debtSummary(debts) {
    var total = 0;
    var paid = 0;
    var unpaid = 0;
    debts.forEach(function (debt) {
        if (debt.status === "P") {
            paid += debt.price;
        }
        else if (debt.status === "NP") {
            unpaid += debt.price;
        }
        total += debt.price;
    });
    const summary = {
        list: debts,
        total: total,
        paid: paid,
        unpaid: unpaid,
        items: debts.length
    };
    return summary;
}

function creditSummary(credits) {
    return credits;
}

function incomeSummary(list) {
    return list;
}

function creditSummary(list) {
    return list;
}







