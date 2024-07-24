"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../config/data-source"));
const Credential_1 = require("../entities/Credential");
const CredentialRepository = data_source_1.default.getRepository(Credential_1.Credential);
exports.default = CredentialRepository;
