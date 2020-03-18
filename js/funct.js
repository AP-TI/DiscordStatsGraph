CalculateAverage = function (d) {
    let avg = 0;
    for (const t in d) {
        avg += d[t].aantal;
    }

    return avg / d.length;
};

CalculateMax = function (d) {
    let max = 0;
    for (const t in d) {
        let temp = d[t].aantal;
        if (temp > max) max = temp;
    }

    return max;
};

ColorCode = function (cnt) {
    if (cnt > 50) return "rgb(204,0,0)";
    else if (cnt > 40) return "rgb(204,102,0)";
    else if (cnt > 30) return "rgb(204,204,0)";
    else if (cnt > 20) return "rgb(102,204,0)";
    else if (cnt > 10) return "rgb(0,0,204)";
    else if (cnt > 5) return "rgb(0,102,102)";
    else return "rgb(0,0,0";
    // let r = Math.floor(255 / cnt * Math.random() * 10);
    // let g = Math.floor(255 / cnt * Math.random() * 10);
    // let b = Math.floor(255 / cnt * Math.random() * 10);
    // return "rgb(" + r + ", " + g + ", " + b + ") ";
};

DateFromObjectId = function (oID) {
    return new Date(parseInt(oID.substring(0, 8), 16) * 1000);
};