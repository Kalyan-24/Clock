import express from "express"
import path from "path"
import appRouter from "./routes/appRoutes.js"

const app = express()

const PORT = process.env.PORT || 5500

app.use(express.static(path.join(path.resolve(), 'public')))
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.use(appRouter)

app.listen(PORT, () => {
    console.log(`Connect at port ${PORT}`)
})

