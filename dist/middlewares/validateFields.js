"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const userService_1 = require("../services/userService");
const validateFields = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        next(new userService_1.CustomError('Error de validación', 400, errors.array()));
    }
    else {
        next();
    }
};
exports.default = validateFields;
