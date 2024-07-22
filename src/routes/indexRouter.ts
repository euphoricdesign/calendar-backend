import { Router } from 'express'
import userRouter from './userRouter'
import eventRouter from './eventRouter'


const router = Router()


// Montando sub-router
router.use('/auth', userRouter)
router.use('/events', eventRouter)


export default router