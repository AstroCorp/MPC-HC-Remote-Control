export const ruleOfThree = (a: number, b: number, c: number) => {
    return ((b * c) / a);
}

export const msToTime = (ms: number) => {
    let seconds = ms / 1000;
    let minutes = parseInt((seconds / 60).toString(), 10);

    seconds = Math.round(seconds % 60);
    const secondsString = seconds < 10 ? '0' + seconds : seconds.toString();

    let hours = parseInt((minutes / 60).toString(), 10);
    const hoursString = hours < 10 ? '0' + hours : hours.toString();

    minutes = minutes % 60;
    const minutesString = minutes < 10 ? '0' + minutes : minutes.toString();

    return hoursString + ':' + minutesString + ':' + secondsString;
}

export const msToPercent = (duration: number, ms: number) => {
    return ruleOfThree(duration, 100, ms);
}

export const getVariables = (html: string) => {
    const reg = /\<p id="(\w+)"\>(.*)\<\/p\>/ig;
    const fields: { [key: string]: string } = {};

    let result;

    while ((result = reg.exec(html)) !== null) {
        fields[result[1]] = result[2];
    }

    return {
        version: fields["version"],
        file: fields["file"],
        filePath: fields["filepath"],
        fileDir: fields["filedir"],
        size: fields["size"],
        state: parseInt(fields["state"]),
        stateString: fields["statestring"],
        position: parseFloat(fields["position"]),
        positionString: fields["positionstring"],
        duration: parseFloat(fields["duration"]),
        durationString: fields["durationstring"],
        volumeLevel: parseFloat(fields["volumelevel"]),
        muted: fields["muted"] !== "0",
    }
}
