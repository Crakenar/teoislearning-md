import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
} from '../helpers/error.js'
import makeHttpError from "../helpers/http-error.js";
import makeAuthentication from "./authentication.js";

export default function makeAuthenticationEndpointHandler({authentication}) {
    return async function handle(httpRequest){
        switch (httpRequest.method) {
            case 'POST':
                return postAuthentication(httpRequest);

            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                })
        }
    }




    async function postAuthentication (httpRequest) {
        let authInfo = httpRequest.body
        if (!authInfo) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad request. No POST body.'
            })
        }

        if (typeof httpRequest.body === 'string') {
            try {
                authInfo = JSON.parse(authInfo)
            } catch {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: 'Bad request. POST body must be valid JSON.'
                })
            }
        }

        try {
            const auth = makeAuthentication(authInfo)
            const result = await authentication.findByUsername(auth);
            console.log('result', result)
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
}