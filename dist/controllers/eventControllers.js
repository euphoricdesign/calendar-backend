"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createNewEvent = exports.getAllEvents = void 0;
const eventServices_1 = require("../services/eventServices");
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield (0, eventServices_1.getAllEventsService)();
    res.status(200).json({
        ok: true,
        events
    });
});
exports.getAllEvents = getAllEvents;
const createNewEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, notes, start, end, userId } = req.body;
    try {
        const event = yield (0, eventServices_1.createNewEventService)({ title, notes, start, end, userId });
        res.status(201).json({
            ok: true,
            event
        });
    }
    catch (error) {
        const typedError = error; // Aserción de tipo
        res.status(400).json({
            ok: false,
            error: typedError.message // Enviar el mensaje del error en la respuesta
        });
    }
});
exports.createNewEvent = createNewEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = parseInt(req.params.id, 10);
    const eventUpdates = req.body;
    try {
        const updatedEvent = yield (0, eventServices_1.updateEventService)(eventId, eventUpdates);
        res.status(200).json({
            ok: true,
            updatedEvent
        });
    }
    catch (error) {
        const typedError = error;
        res.status(typedError.statusCode || 400).json({
            ok: false,
            error: typedError.message
        });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = parseInt(req.params.id, 10);
    console.log(eventId);
    try {
        const deletedEventMessage = yield (0, eventServices_1.deleteEventService)(eventId);
        res.status(200).json({
            ok: true,
            deletedEventMessage
        });
    }
    catch (error) {
        const typedError = error;
        res.status(typedError.statusCode || 400).json({
            ok: false,
            error: typedError.message
        });
    }
});
exports.deleteEvent = deleteEvent;
