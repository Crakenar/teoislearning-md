import {response} from "express";

export default function mdQuery({database}) {
    return {
        findById,
        findByTitle,
        getAllMDFiles,
        getMdFilesByLang,
        getMdFilesByType,
        updateCreateMD
    }


    // GET METHODS
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

    //POST METHODS
    async function updateCreateMD(md){
        const db = await database;
        const {id, title, descriptionMD, language, typeMD, date_work, company, duration, imgPath} = md;
        if (id){
           //update
           await findById(md.id).then((res) => {
                if (res){
                    const sql = `update md_files set title = ?, descriptionMD = ?,
                                language = ? , typeMD = ?, date_work = ?, company = ?,
                                duration = ?, imgPath = ?
                                where id = ?`
                    const values = [title, descriptionMD, language, typeMD, date_work, company, duration, imgPath, id]
                    return new Promise((resolve, reject) => {
                        db.query(sql,values, (err, results) => {
                            if (err) return reject(results);
                            if (results) return resolve(results)
                        });
                    })
                };
            });
        }else {
            // insert
            const sql = `insert into md_files (title, descriptionMD, language, typeMD, date_work, company, duration, imgPath) values ?`
            const values = [[title, descriptionMD, language, typeMD, date_work, company, duration, imgPath]]
            return new Promise((resolve, reject) => {
                db.query(sql,[values], (err, results) => {
                    if (err) return reject(results);
                    if (results){
                        return resolve(results)
                    }
                });
            })
        }
    }
}