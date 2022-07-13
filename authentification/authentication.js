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
        validateNoWeirdCar('username', username)
        return { username, password }
    }

    function validateUsername(label, username){
        if (username.length < 2){
            throw new InvalidPropertyError(
                `A authentication's ${label} must be at least 2 characters long.`
            )
        }
    }

    function validateNoWeirdCar(label, champ){
         const regex = /^[A-Za-z0-9]*$/;
         if (!regex.test(champ)){
             throw new InvalidPropertyError(
                 `A authentication's ${label} must not have weird characters.`
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