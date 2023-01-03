/**
 * Mock Text in a funny way
 * @param {string} input text to mock
 * @returns {string} mocked text
 */
export default (input) => {
    let str = "";
    for(let i = 0; i < input.length; i++) {
        let char = input.charAt(i);
        str += transform(char);
    }
    return str;
}

const transform = (char) => {
    if (char === "ß" || char === "ẞ") return char;
    return Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
}