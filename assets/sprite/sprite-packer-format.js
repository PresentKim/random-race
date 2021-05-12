/**
 * Scripts for SpriteSheet Packer
 * @url https://github.com/amakaseev/sprite-sheet-packer
 *
 * @param {string} dataFilePath
 * @param {any} _
 * @param {{frame: {}, sourceColorRect:{}, sourceSize:{}}} spriteFrames
 */
function exportSpriteSheet(dataFilePath, _, spriteFrames) {
    var frames = {};
    for (var key in spriteFrames) {
        if (!spriteFrames.hasOwnProperty(key))
            continue;

        //Remove file extension and directory path
        var spriteName = key.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, '');
        if (spriteName.startsWith("_"))
            continue;

        //Put sprite data
        var frame = {};
        frame.sw = spriteFrames[key].frame.width; //source width
        frame.sh = spriteFrames[key].frame.height; //source height
        frame.sx = spriteFrames[key].frame.x; //source x
        frame.sy = spriteFrames[key].frame.y; //source y

        frame.tx = spriteFrames[key].sourceColorRect.x; //trimmed x
        frame.ty = spriteFrames[key].sourceColorRect.y; //trimmed y

        frame.ow = spriteFrames[key].sourceSize.width; //origin width
        frame.oh = spriteFrames[key].sourceSize.height; //origin height

        frame.px = frame.ow / 2; //pivot x (center)
        frame.py = frame.oh / 2; //pivot y (center)

        frames[spriteName] = frame;
    }

    return {
        data: JSON.stringify(frames, null, 0),
        format: "json"
    };
}