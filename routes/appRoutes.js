import express from "express"
import { clockController, alarmController, worldClockController, timerController, stopwatchController } from "../controllers/appControllers.js"

const router = express.Router()

router.get('/', clockController)
router.get('/alarm', alarmController)
router.get('/world-clock', worldClockController)
router.get('/timer', timerController)
router.get('/stopwatch', stopwatchController)

export default router