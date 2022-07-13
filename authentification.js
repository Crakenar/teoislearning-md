import express from "express";
import cors from "cors"

import authenticationEndpointHandler from "./authentification/index.js";
import adaptRequest from "./helpers/adapt-request.js";

const app = express();
app.use(cors());
app.use(express.json());


app.all('/api/authentication', authenticationController);

function authenticationController(req, res) {
    const httpRequest = adaptRequest(req);
    authenticationEndpointHandler(httpRequest)
        .then(({headers, statusCode, data}) => {
            console.log(data)
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

// app.post('/api/login',  (req, res) => {
//     db.query(`select * from user where name = ?`,[req.body.username], async (err, result) => {
//         if (err) return res.sendStatus(404)
//
//         if (result != null){
//             if(!result[0]) return res.sendStatus(404)
//             if (await bcrypt.compare(req.body.password, result[0].password)){
//                 return res.sendStatus(200)
//             }else {
//                 return res.sendStatus(404)
//             }
//         }
//     })
// })


app.listen(5001, () => {
    console.log('listening on 5001')
})