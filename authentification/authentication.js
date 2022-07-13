import {InvalidPropertyError} from "../helpers/error.js";
import requiredParam from "../helpers/required-param.js";

export default function makeAuthentication (
        authentication = requiredParam('authentication'),
    ){
     {
         const validAuthentication = validate(authentication);
         return Object.freeze(validAuthentication)
    }

    function validate ({
           username = requiredParam('username'),
           password = requiredParam('password'),
       } = {}) {
        validateUsername('username', username)
        validatePassword('password', password)
        return { username, password }
    }

    function validateUsername(label, username){
        if (username.length < 2){
            throw new InvalidPropertyError(
                `A authentication's ${label} must be at least 2 characters long.`
            )
        }
    }

    function validatePassword(label, password){
        if (password.length < 2){
            throw new InvalidPropertyError(
                `A authentication's ${label} must be at least 2 characters long.`
            )
        }
    }
}