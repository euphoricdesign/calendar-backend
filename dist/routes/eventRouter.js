"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventControllers_1 = require("../controllers/eventControllers");
const express_validator_1 = require("express-validator");
const isDate_1 = __importDefault(require("../helpers/isDate"));
const validateFields_1 = __importDefault(require("../middlewares/validateFields"));
const validateJwt_1 = __importDefault(require("../middlewares/validateJwt"));
const eventRouter = (0, express_1.Router)();
// Todas tienes que pasar por la validación del JWT
eventRouter.use(validateJwt_1.default);
eventRouter.get('/', eventControllers_1.getAllEvents);
eventRouter.post('/', [
    (0, express_validator_1.body)('title')
        .notEmpty().withMessage('El titulo es obligatorio'),
    (0, express_validator_1.body)('start')
        .custom(isDate_1.default).withMessage('La fecha de inicio es obligatoria'),
    (0, express_validator_1.body)('end')
        .custom(isDate_1.default).withMessage('La fecha de fin es obligatoria'),
    validateFields_1.default
], eventControllers_1.createNewEvent);
eventRouter.put('/:id', [
    (0, express_validator_1.body)('title')
        .notEmpty().withMessage('El titulo es obligatorio'),
    (0, express_validator_1.body)('start')
        .custom(isDate_1.default).withMessage('La fecha de inicio es obligatoria'),
    (0, express_validator_1.body)('end')
        .custom(isDate_1.default).withMessage('La fecha de fin es obligatoria'),
    validateFields_1.default
], eventControllers_1.updateEvent);
eventRouter.delete('/:id', eventControllers_1.deleteEvent);
exports.default = eventRouter;
