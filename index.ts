import express, {json, Request, Response} from "express";
import cors from "cors";
import "express-async-errors";
import {handleError} from "./utilits/errors";
import rateLimit from "express-rate-limit";
import {adRouter} from "./routers/ad.router";


const app =express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5*60 *1000,
    max: 100,
}))

app.use('/ad',adRouter)
app.use(handleError);

app.listen(3001,'0.0.0.0', () =>{
    console.log('Listening on http://localhost:3001');
});