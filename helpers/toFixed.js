"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFixed = void 0;
exports.toFixed = (value) => {
    let res = "";
    const stringNumber = value.toString().split(".");
    res = stringNumber[0];
    if (stringNumber.length < 2) {
        return Number.parseInt(res);
    }
    res += "." + stringNumber[1].slice(0, 2);
    return Number.parseFloat(res);
};
