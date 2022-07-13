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
        const mdInfo = httpRequest.pathParams || {}
        console.log('mdInfo', mdInfo)
        let result = null;
        switch (mdInfo) {
            case mdInfo.title:
                result = await md.findByTitle(mdInfo.title)
                sendHeader(result)
                break;
            default :
                result = await md.getAllMDFiles();
                console.log(result)
                return sendHeader(result)

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