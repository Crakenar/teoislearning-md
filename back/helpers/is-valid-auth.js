export default function isValidAuth({username, password}) {
    return username.length > 2 && password.length > 2;
}