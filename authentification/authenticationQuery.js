import bcrypt from "bcryptjs";

export default function authenticationQuery({database}) {
    //ADD methods you will use
    return{
        checkAuth
    }

    async function findByUsername(username){
        const db = await database;
        try {
           db.query(`select * from user where name = ?`,[username], (err, results) => {
               if (err) return null;
               console.log(results[0])
               if (results) return results[0]
           });
        } catch (e) {
            console.log(e.message)
        }
    }

    async function checkAuth({username, password}) {
        const result = await findByUsername(username);
        console.log(result)
        if(!result) return 404
        if (await bcrypt.compare(password, result.password)){
            console.log('good to auth')
            return 200
        }else {
            console.log('yikes ur wrong i lied')
            return 404
        }
    }
}