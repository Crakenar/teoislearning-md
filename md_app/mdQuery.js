export default function mdQuery({database}) {
    return {
        findById,
        findByTitle,
        getAllMDFiles,
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
      // TODO document why this async function 'findById' is empty
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

    async function getMdFilesByType () {
        /* TODO document why this async function 'getMdFilesByType' is empty */
    }
}