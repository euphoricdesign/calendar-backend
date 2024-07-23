import { Router } from "express";
import { createNewEvent, deleteEvent, getAllEvents, updateEvent } from "../controllers/eventControllers";

const eventRouter = Router()

// eventRouter.use(validateJWT)

eventRouter.get('/', getAllEvents)
eventRouter.post('/', createNewEvent)
eventRouter.put('/:id', updateEvent)
eventRouter.delete('/:id', deleteEvent)

export default eventRouter
