export const rgbStringToHex = (rgbString) => {
    // Extract the RGB/RGBA values from the string
    const rgbRegex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+)\s*)?\)/;
    const match = rgbString.match(rgbRegex);

    if (!match) {
        throw new Error('Invalid RGB/RGBA string format. Expected format: rgb(r, g, b) or rgba(r, g, b, a)');
    }

    // Parse the RGB values
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);

    // Parse alpha value if present (defaults to 1 if not)
    const a = match[4] !== undefined ? parseFloat(match[4]) : 1;

    // Convert RGB to hex and pad with zeros if needed
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');

    // If alpha is 1 (or not specified), return standard hex code
    if (a === 1) {
        return `#${hexR}${hexG}${hexB}`;
    }

    // Convert alpha to hex (0-255) and pad with zeros
    const alphaInt = Math.round(a * 255);
    const hexA = alphaInt.toString(16).padStart(2, '0');

    // Return the combined hex code with alpha
    return `#${hexR}${hexG}${hexB}${hexA}`;
};