import AppDataSource from "../config/data-source";
import { Event } from "../entities/Event";

const EventRepository = AppDataSource.getRepository(Event)

export default EventRepository