import { Router } from "express";
import { createNewEvent, deleteEvent, getAllEvents, updateEvent } from "../controllers/eventControllers";
import { body } from "express-validator";
import isDate from "../helpers/isDate";
import validateFields from "../middlewares/validateFields";
import validateJwt from "../middlewares/validateJwt";

const eventRouter = Router()

// Todas tienes que pasar por la validación del JWT
eventRouter.use( validateJwt );

eventRouter.get('/', getAllEvents)
eventRouter.post('/', [
    body('title')
    .notEmpty().withMessage('El titulo es obligatorio'),
    body('start')
    .custom(isDate).withMessage('La fecha de inicio es obligatoria'),
    body('end')
    .custom(isDate).withMessage('La fecha de fin es obligatoria'),
    validateFields
], createNewEvent)
eventRouter.put('/:id',[
    body('title')
    .notEmpty().withMessage('El titulo es obligatorio'),
    body('start')
    .custom(isDate).withMessage('La fecha de inicio es obligatoria'),
    body('end')
    .custom(isDate).withMessage('La fecha de fin es obligatoria'),
    validateFields
], updateEvent)
eventRouter.delete('/:id', deleteEvent)

export default eventRouter
