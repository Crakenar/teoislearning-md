import makeHttpError from "../helpers/http-error.js";
import mdQuery from "./mdQuery.js";
import makeAuthentication from "../authentification/authentication.js";
import {InvalidPropertyError, RequiredParameterError, UniqueConstraintError} from "../helpers/error.js";
import makeMD from "./mdApp.js";

export default function makeMdAppEndpointHandler({ md }) {
    return async function handle(httpRequest){
        switch (httpRequest.method) {
            case 'GET':
                return getMdFiles(httpRequest);
            case 'POST':
                return updateOrcreateMdFile(httpRequest);
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

    async function updateOrcreateMdFile(httpRequest){
        let mdInfo = httpRequest.body;
        if (!mdInfo){
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad Request. No POST body'
            })
        }
        if (typeof httpRequest.body === 'string') {
            try {
                mdInfo = JSON.parse(mdInfo)
            } catch {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: 'Bad request. POST body must be valid JSON.'
                })
            }
        }
        try {
            const mdObj = makeMD(mdInfo)
            const result = await md.updateCreateMD(mdObj);
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                data: result ? result : {}
            }
        } catch (e) {
            if (e instanceof InvalidPropertyError ||
                e instanceof RequiredParameterError) {
                return makeHttpError({
                    errorMessage: e.message,
                    statusCode:
                        e instanceof UniqueConstraintError
                            ? 409
                            : 400
                })
            } else {
                return makeHttpError({
                    errorMessage: e.message,
                    statusCode:
                        e instanceof UniqueConstraintError
                            ? 409
                            : 500
                })
            }
        }
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