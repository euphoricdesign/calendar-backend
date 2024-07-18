import { Router } from 'express'
import authRouter from './authRouter'
import eventRouter from './eventRouter'


const router = Router()


// Montando sub-router
router.use('/auth', authRouter)
router.use('/events', eventRouter)


export default router