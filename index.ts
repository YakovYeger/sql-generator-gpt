import express, {Application, Request, Response} from 'express'
import cors from 'cors'
import { OpenAIApi, Configuration } from 'openai'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT: number = 6969

const app: Application = express()

app.use(cors())
app.use(express.json())

const API_KEY: string = process.env.API_KEY!
const config = new Configuration({apiKey: API_KEY})
const openAiApi = new OpenAIApi(config)

app.post("/completions",async (req: Request, res: Response) => {
    try {
        const completion = await openAiApi.createChatCompletion({
            model: 'gpt-4',
            messages: [{role: "user", content: `Create an SQL query to ${req.body.message}`}]
        })
        res.send(completion.data.choices[0].message)
    } catch (error) {
        console.error(error)
        res.status(500).send('Scheisse our server is kaput')
    } 
})

app.listen(PORT, ()=> console.log('Server is up at port: ' + PORT))