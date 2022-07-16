import express from "express";
import cors from "cors"

import authenticationEndpointHandler from "./authentification/index.js";
import md_AppEndpointHandler from "./md_app/index.js";

import adaptRequest from "./helpers/adapt-request.js";

const app = express();
const  corsOptions = {
    origin: ['http://localhost:3000', 'https://teoislearning-md-front.herokuapp.com/'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());


app.all('/api/authentication', authenticationController);
app.all('/api/md', mdController)

function authenticationController(req, res) {
    const httpRequest = adaptRequest(req);
    authenticationEndpointHandler(httpRequest)
        .then(({headers, statusCode, data}) => {
            //Here data = status if found in db or not etc atm i do not need data from user
            res
                .set(headers)
                .status(statusCode)
                .sendStatus(data)
        }).catch((e) => {
            console.log(e.message)
            res.status(500).end()
    })
}

function mdController(req, res) {
    const httpRequest = adaptRequest(req);
    md_AppEndpointHandler(httpRequest)
        .then(({headers, statusCode, data}) => {
            res
                .set(headers)
                .status(statusCode)
                .send(data)
        }).catch((e) => {
        console.log(e.message)
        res.status(500).end()
    })
}

app.listen(process.env.PORT || 5001, () => {
    console.log('listening on 5001')
})