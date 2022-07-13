import makeHttpError from "../helpers/http-error.js";
import mdQuery from "./mdQuery.js";

export default function makeMdAppEndpointHandler({ md }) {
    return async function handle(httpRequest){
        switch (httpRequest.method) {
            case 'GET':
                return getMdFiles(httpRequest);

            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed`
                })
        }
    }


    async function getMdFiles(httpRequest) {
        const {id, title, language, typeMD} = httpRequest.queryParams || {}
        console.log(httpRequest.queryParams)
        let result = null;
        if (id){
            result = await md.findById(id)
            return sendHeader(result)
        }
        if (title){
            //title is unique
            result = await md.findByTitle(title)
            return sendHeader(result)
        }
        if (language){
            result = await md.getMdFilesByLang(language)
            return sendHeader(result)
        }
        if (typeMD){
            result = await md.getMdFilesByType(typeMD);
            return sendHeader(result)
        }
        result = await md.getAllMDFiles();
        return sendHeader(result)

    }
    function sendHeader(result) {
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: result ? result : {}
        }
    }
}