CalculateAverage = function (data) {
    let gemiddelde = 0;
    for (const tijdstip in data) {
        gemiddelde += data[tijdstip].aantal;
    }

    return gemiddelde / data.length;
};

ColorCode = function (aantal) {
    if (aantal > 50) return "rgb(204,0,0)";
    else if (aantal > 40) return "rgb(204,102,0)";
    else if (aantal > 30) return "rgb(204,204,0)";
    else if (aantal > 20) return "rgb(102,204,0)";
    else if (aantal > 10) return "rgb(0,0,204)";
    else if (aantal > 5) return "rgb(0,102,102)";
    else return "rgb(0,0,0";
};

DateFromObjectId = function (objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000).toLocaleString();
};