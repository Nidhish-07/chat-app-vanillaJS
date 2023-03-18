import express from "express"
import path,{dirname} from "path"
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const app=express();

app.use(express.json())
const publicDir=path.join(__dirname,"./public")

app.use(express.static(publicDir))





app.listen(8080,()=>{
    console.log(`Server is up and running at http://localhost:8080`);
})