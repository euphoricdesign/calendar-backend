import EventRepository from "../repositories/EventRepository"
import UserRepository from "../repositories/UserRepository"
import { CustomError } from "./userService"


export const getAllEventsService = async () => {
    const eventList = EventRepository.find({
        relations: {
            user: true
        }
    })

    return eventList
}

export const createNewEventService = async (event: any) => {
    const { title, notes, start, end, userId } = event

    const user = await UserRepository.findOneBy({ id: userId })

    if (!user) throw new CustomError("ID invalido. No se encontro un usuario", 400)
        
    const createdEvent = EventRepository.create({
        title,
        notes,
        start,
        end,
        user
    })

    await EventRepository.save(createdEvent)
    return createdEvent
}

export const updateEventService = async (eventId: any, eventUpdate: any) => {
    const existingEvent  = await EventRepository.findOneBy({ id: eventId })

    if (!existingEvent ) throw new CustomError("Evento no encontrado", 404)

    await EventRepository.update(eventId, eventUpdate);

    const updatedEvent = await EventRepository.findOneBy({ id: eventId });
    
    if (!updatedEvent) {
        throw new CustomError("Error al obtener el evento actualizado", 500);
    }

    return updatedEvent
}

export const deleteEventService = async (eventId: any) => {
    const existingEvent  = await EventRepository.findOneBy({ id: eventId })

    console.log(existingEvent)
    
    if (!existingEvent ) throw new CustomError("Evento no encontrado", 404)

    await EventRepository.delete(eventId) 

    return { message: "Evento eliminado exitosamente" }
}