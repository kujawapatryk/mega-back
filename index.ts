import express, {json, Request, Response} from "express";
import cors from "cors";
import "express-async-errors";
import {handleError} from "./utilits/errors";
import rateLimit from "express-rate-limit";


const app =express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5*60 *1000,
    max: 100,
}))

// app.get('/', async (req:Request, res:Response)=>{
//     throw new Error('Daaamn!');
//     }
// )
app.use(handleError);

app.listen(3001,'0.0.0.0', () =>{
    console.log('Listening on http://localhost:3001');
});