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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEventService = exports.updateEventService = exports.createNewEventService = exports.getAllEventsService = void 0;
const EventRepository_1 = __importDefault(require("../repositories/EventRepository"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const userService_1 = require("./userService");
const getAllEventsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const eventList = EventRepository_1.default.find({
        relations: {
            user: true
        }
    });
    return eventList;
});
exports.getAllEventsService = getAllEventsService;
const createNewEventService = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, notes, start, end, userId } = event;
    const user = yield UserRepository_1.default.findOneBy({ id: userId });
    if (!user)
        throw new userService_1.CustomError("ID invalido. No se encontro un usuario", 400);
    const createdEvent = EventRepository_1.default.create({
        title,
        notes,
        start,
        end,
        user
    });
    yield EventRepository_1.default.save(createdEvent);
    return createdEvent;
});
exports.createNewEventService = createNewEventService;
const updateEventService = (eventId, eventUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEvent = yield EventRepository_1.default.findOneBy({ id: eventId });
    if (!existingEvent)
        throw new userService_1.CustomError("Evento no encontrado", 404);
    yield EventRepository_1.default.update(eventId, eventUpdate);
    const updatedEvent = yield EventRepository_1.default.findOneBy({ id: eventId });
    if (!updatedEvent) {
        throw new userService_1.CustomError("Error al obtener el evento actualizado", 500);
    }
    return updatedEvent;
});
exports.updateEventService = updateEventService;
const deleteEventService = (eventId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEvent = yield EventRepository_1.default.findOneBy({ id: eventId });
    console.log(existingEvent);
    if (!existingEvent)
        throw new userService_1.CustomError("Evento no encontrado", 404);
    yield EventRepository_1.default.delete(eventId);
    return { message: "Evento eliminado exitosamente" };
});
exports.deleteEventService = deleteEventService;
