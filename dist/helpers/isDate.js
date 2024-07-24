"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const isDate = (value, rest) => {
    if (!value)
        return false;
    console.log(value);
    const date = (0, moment_1.default)(value);
    if (date.isValid())
        return true;
    return false;
};
exports.default = isDate;
