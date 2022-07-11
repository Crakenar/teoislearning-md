require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

let refreshTokens = [];

const posts = [
    {
        username: 'john',
        title: 'post 1'
    },
    {
        username: 'teo',
        title: 'post teo'
    }
]

app.get('/api', (req, res) => {
    res.json({
        message: 'welcome to the api'
    });
})


app.post('/api/posts',authenticateToken, (req, res) => {
    // res.json(posts.filter(post => post.username === req.user.name));
    res.json(posts);
})

app.post('/api/token', (req, res) => {
    const refreshTOken = req.body.token;
    console.log('token', refreshTOken)
    console.log('refreshTokens', refreshTokens)
    if (!refreshTOken) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshTOken)) return res.sendStatus(403)
    jwt.verify(refreshTOken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name : user.name});
        res.json({
            accessToken: accessToken
        })
    });
});

app.post('/api/login', (req,res) => {
    //mock user
    const username = req.body.username;
    const user = {name : username}
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({
        accessToken: accessToken,
        refreshToken: refreshToken
    });
});

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
});
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKENS_SECRET, (err, user) =>{
       if (err) {return res.sendStatus(403)}

       req.user = user;
       req.verified = true;
       next();
    });
}

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKENS_SECRET, {expiresIn: '30s' });
}

app.listen(5000, () => console.log('serveur started on 5000'))
