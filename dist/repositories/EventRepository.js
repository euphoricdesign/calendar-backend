"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../config/data-source"));
const Event_1 = require("../entities/Event");
const EventRepository = data_source_1.default.getRepository(Event_1.Event);
exports.default = EventRepository;
