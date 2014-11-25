

/**
 * HSV配列 を RGB配列 へ変換します
 *
 *  h         hue値        ※ 0～360の数値
 *  s         saturation値 ※ 0～255 の数値
 *  v         value値      ※ 0～255 の数値
    a       透明度     0 ～ 1.0
 * 戻り値      rgba(r, g, b, a) 形式の文字列 //
 */
function HSV2RGBA(h, s, v, a) {
    var r, g, b; // 0..255

    while (h < 0) {
        h += 360;
    }

    h = h % 360;

    // 特別な場合 saturation = 0
    if (s == 0) {
        // → RGB は V に等しい
        v = Math.round(v);
        return "rgba(" + v + "," + v + "," + v + "," + a + ")";
    }

    s = s / 255;

    var i = Math.floor(h / 60) % 6,
        f = (h / 60) - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s)

    switch (i) {
        case 0:
            r = v; g = t; b = p; break;
        case 1:
            r = q; g = v; b = p; break;
        case 2:
            r = p; g = v; b = t; break;
        case 3:
            r = p; g = q; b = v; break;
        case 4:
            r = t; g = p; b = v; break;
        case 5:
            r = v; g = p; b = q; break;
    }

    return "rgba(" +Math.round(r) +"," +Math.round(g) +"," +Math.round(b) +"," +a +")";
}



/**
 * HSV配列 を RGB配列 へ変換します
 *
 * @param   {Number}  h         hue値        ※ 0～360の数値
 * @param   {Number}  s         saturation値 ※ 0～255 の数値
 * @param   {Number}  v         value値      ※ 0～255 の数値
 * @return  {Object}  {r, g, b} ※ r/g/b は 0～255 の数値
 */
function HSVtoRGB(h, s, v) {
    var r, g, b; // 0..255

    while (h < 0) {
        h += 360;
    }

    h = h % 360;

    // 特別な場合 saturation = 0
    if (s == 0) {
        // → RGB は V に等しい
        v = Math.round(v);
        return { 'r': v, 'g': v, 'b': v };
    }

    s = s / 255;

    var i = Math.floor(h / 60) % 6,
        f = (h / 60) - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s)

    switch (i) {
        case 0:
            r = v; g = t; b = p; break;
        case 1:
            r = q; g = v; b = p; break;
        case 2:
            r = p; g = v; b = t; break;
        case 3:
            r = p; g = q; b = v; break;
        case 4:
            r = t; g = p; b = v; break;
        case 5:
            r = v; g = p; b = q; break;
    }

    return { 'r': Math.round(r), 'g': Math.round(g), 'b': Math.round(b) };
}