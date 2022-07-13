import bcrypt from "bcryptjs";

export default function authenticationQuery({database}) {
    //ADD methods you will use
    return{
        findByUsername
    }

    async function findByUsername({username, password}){
        const db = database;
        try {
           db.query(`select * from user where name = ?`,[username], async (err, results) => {
               if (err) return null;
               console.log(results[0])
               return await checkPassword(results[0], password)
           });
        } catch (e) {
            console.log(e.message)
        }
    }

    async function checkPassword(result, password) {
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