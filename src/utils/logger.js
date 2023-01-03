import fs from "fs";
import path from "path";

var logger;
var lastLogFile;

/**
 * Formats the current time
 *
 * @returns {string} Time
 */
const getDate = () => {
    const date = new Date();
    let hourData = date.getHours();
    let minData = date.getMinutes();
    let secData = date.getSeconds();

    let hour = (hourData < 10 ? "0" : "") + hourData;
    let min = (minData < 10 ? "0" : "") + minData;
    let sec = (secData < 10 ? "0" : "") + secData;

    return "[" + hour + ":" + min + ":" + sec + "]";
};

/**
 * Creates daily log files
 */
// const createLog = () => {
//     // CHECK LOG FOLDER
//     try {
//         fs.mkdirSync(path.join("logs"))
//     } catch (e) { /* IGNORE */ }

//     const date = new Date();
//     let dayData = date.getDay();
//     let monthData = date.getMonth();
//     let yearData = date.getFullYear();

//     let logFile = `${dayData}-${monthData}-${yearData}.log.txt`

//     // CHECK IF LOG EXISTS
//     if (logFile === lastLogFile) {
//         return;
//     }

//     // IF LOGGER EXISTS - CLOSE
//     if (logger) {
//         logger.end();
//     }
//     // CREATE LOGGER
//     logger = fs.createWriteStream(path.join("logs", logFile), {
//         flags: 'a+'
//     });
// };

export default {
    error: function (input) {
        // CHECK LOGGER
        // createLog();

        let str = "\x1b[41m\x1b[30m x \x1b[0m\x1b[31m [ERROR]" + getDate() + " - " + input + "\x1b[0m";
        console.log(str);
        // logger.write(`${str}\n`);
    },

    warn: function (input) {
        // CHECK LOGGER
        // createLog();

        let str = "\x1b[43m\x1b[30m ! \x1b[0m\x1b[33m [WARN] " + getDate() + " - " + input + "\x1b[0m";
        console.log(str);
        // logger.write(`${str}\n`);
    },

    info: function (input) {
        // CHECK LOGGER
        // createLog();

        let str = "\x1b[44m\x1b[30m i \x1b[0m\x1b[36m [INFO] " + getDate() + " - " + input + "\x1b[0m";
        console.log(str);
        // logger.write(`${str}\n`);
    },

    done: function (input) {
        // CHECK LOGGER
        // createLog();

        let str = "\x1b[42m\x1b[30m ✓ \x1b[0m\x1b[32m [DONE] " + getDate() + " - " + input + "\x1b[0m";
        console.log(str);
        // logger.write(`${str}\n`);
    }
};