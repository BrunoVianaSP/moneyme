module.exports = {
    getDayName,
    getMonthName,
    getDateName,
    getDateDigitalName
};

function getDateName(date) {
    console.log({date});
    var year = date.getFullYear();
    var month = getMonthName(date.getMonth());
    var day = date.getDay();
    const result =  year + " " + month +  " " + day +  " - " + getDayName(day);
    return result;
}

function getDateDigitalName(date) {
    console.log({date});
    const monthFix = 1 + date.getMonth(); 
    var month = monthFix < 10 ? "0" + monthFix : monthFix;
    var day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
    const result =  date.getFullYear() + "-" + month +  "-" + day;
    return result;
}

function getDayName(date) {
    return getDayName(date.getDay());
}
function getDayName(day) {
    switch (day) {
        case 0:
            return "sunday";
        case 1:
            return "monday";
        case 2:
            return "tuesday";
        case 3:
            return "wednesday";
        case 4:
            return "thursday";
        case 5:
            return "friday";
        case 6:
            return "saturday";
        default:
            return "unknow"
    }
}


function getMonthName(date) {
    return getMonthName(date.getMonth());
}

function getMonthName(month) {
    switch (month) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return "unknow"
    }
}