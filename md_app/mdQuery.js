export default function mdQuery({database}) {
    return {
        findById,
        findByTitle,
        getAllMDFiles,
        getMdFilesByLang,
        getMdFilesByType
    }

    async function findByTitle(title){
        const db = await database;
        return new Promise((resolve, reject) => {
            db.query(`select * from md_files where title = ?`, [title], (err, results) => {
               if (err) return reject(results);
               if (results) return resolve(results)
            });
        })
    }

    async function findById(id){
        const db = await database;
        return new Promise((resolve, reject) => {
            db.query(`select * from md_files where id = ?`, [id], (err, results) => {
                if (err) return reject(results);
                if (results) return resolve(results)
            });
        })
    }

    async function getAllMDFiles(){
        const db = await database;
        return new Promise((resolve, reject) => {
            db.query(`select * from md_files`, (err, results) => {
                if (err) return reject(results);
                if (results) return resolve(results)
            });
        })
    }

    async function getMdFilesByLang(language) {
        const db = await database;
        return new Promise((resolve, reject) => {
            db.query(`select * from md_files where language = ?`,[language], (err, results) => {
                if (err) return reject(results);
                if (results) return resolve(results)
            });
        })
    }
    async function getMdFilesByType (type) {
        const db = await database;
        return new Promise((resolve, reject) => {
            db.query(`select * from md_files where typeMD = ?`,[type], (err, results) => {
                if (err) return reject(results);
                if (results) return resolve(results)
            });
        })
    }
}