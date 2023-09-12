import initDB from '../db/index.js';
import mdQuery from "./mdQuery.js";
import makeMdAppEndpointHandler from "./mdApp-endoint.js";

const database = initDB();
const md = mdQuery({database});
const md_AppEndpointHandler = makeMdAppEndpointHandler({md})
export default md_AppEndpointHandler