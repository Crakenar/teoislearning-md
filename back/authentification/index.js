import initDB from '../db/index.js'
import authenticationQuery from "./authenticationQuery.js";
import makeAuthenticationEndpointHandler from "./authentication-endpoint.js";

const database = initDB();
const authentication = authenticationQuery({database});
const authenticationEndpointHandler = makeAuthenticationEndpointHandler({authentication})
export default authenticationEndpointHandler