"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../config/data-source"));
const User_1 = require("../entities/User");
const UserRepository = data_source_1.default.getRepository(User_1.User);
exports.default = UserRepository;
