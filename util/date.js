const getTodaysDate = function () {
    const now = Date.now();
    let date = new Date(now);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

module.exports = {
    getTodaysDate,
}