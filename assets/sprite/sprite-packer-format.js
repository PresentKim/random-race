/**
 * Scripts for SpriteSheet Packer
 * @url https://github.com/amakaseev/sprite-sheet-packer
 *
 * @param {string} dataFilePath
 * @param {any} _
 * @param {{frame: {}, sourceColorRect:{}, sourceSize:{}}} spriteFrames
 */
function exportSpriteSheet(dataFilePath, _, spriteFrames) {
    var sheets = {};
    for (var key in spriteFrames) {
        if (!spriteFrames.hasOwnProperty(key))
            continue;

        //Remove file extension and directory path
        var matches = key.match(/[a-z0-9\-_]+[\\\/]([^_][a-z0-9\-_]+)[\\\/]([^_][a-z0-9\-_]+)$/i);
        if (!matches)
            continue;

        var sheetName = matches[1];
        var spriteName = matches[2];

        //Put sprite data
        var frames = sheets[sheetName] || {};
        frames[spriteName] = {
            sw: spriteFrames[key].frame.width, //source width
            sh: spriteFrames[key].frame.height, //source height
            sx: spriteFrames[key].frame.x, //source x
            sy: spriteFrames[key].frame.y, //source y

            tx: spriteFrames[key].sourceColorRect.x, //trimmed x
            ty: spriteFrames[key].sourceColorRect.y, //trimmed y

            ow: spriteFrames[key].sourceSize.width, //origin width
            oh: spriteFrames[key].sourceSize.height //origin height
        };
        sheets[sheetName] = frames;
    }

    return {
        data: JSON.stringify(sheets, null, '\t'),
        format: "json"
    };
}