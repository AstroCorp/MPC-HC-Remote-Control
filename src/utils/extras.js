export const ruleOfThree = (a, b, c) => {
    return ((b * c) / a);
}

export const msToTime = (ms) => {
    let seconds = ms / 1000;
    let minutes = parseInt(seconds / 60, 10);

    seconds = Math.round(seconds % 60);

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    let hours = parseInt(minutes / 60, 10);

    if (hours < 10) {
        hours = '0' + hours;
    }

    minutes = minutes % 60;

    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    
    return hours + ':' + minutes + ':' + seconds;
}

export const msToPercent = (duration, ms) => {
    console.log(ruleOfThree(duration, 100, ms))
    return ruleOfThree(duration, 100, ms);
}
