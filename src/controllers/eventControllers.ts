import { Request, Response } from "express"
import { createNewEventService, deleteEventService, getAllEventsService, updateEventService } from "../services/eventServices"


export const getAllEvents = async (req: Request, res: Response) => {
    const events = await getAllEventsService()
    res.status(200).json({
        ok: true,
        events
    })

}

export const createNewEvent = async (req: Request, res: Response) => {
    const {title, notes, start, end, userId } = req.body

    try {
        const event = await createNewEventService({title, notes, start, end, userId })

        res.status(201).json({
            ok: true,
            event
        })
    } catch (error) {
        const typedError = error as { statusCode?: number, message: string }; // Aserción de tipo
    
        res.status(400).json({
            ok: false,
            error: typedError.message // Enviar el mensaje del error en la respuesta
        });
    }
}

export const updateEvent = async (req: Request, res: Response) => {
    const eventId = parseInt(req.params.id, 10)
    const eventUpdates = req.body

    try {
        const updatedEvent = await updateEventService(eventId, eventUpdates)
    
        res.status(200).json({
            ok: true,
            updatedEvent
        })
    } catch (error) {
        const typedError = error as { statusCode?: number, message: string };
        
        res.status(typedError.statusCode || 400).json({
            ok: false,
            error: typedError.message
        });
    }

}

export const deleteEvent = async (req: Request, res: Response) => {

    const eventId = parseInt(req.params.id, 10)

    console.log(eventId)

    try {
        const deletedEventMessage = await deleteEventService(eventId)
    
        res.status(200).json({
            ok: true,
            deletedEventMessage
        })
    } catch (error) {
        const typedError = error as { statusCode?: number, message: string };
        
        res.status(typedError.statusCode || 400).json({
            ok: false,
            error: typedError.message
        });
    }

}