export const getVariables = (html) => {
    const reg = /\<p id="(\w+)"\>(.*)\<\/p\>/ig;
    const fields = {};

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