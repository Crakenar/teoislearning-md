// convert into standard objects, representation of a standard http request

export default function adaptRequest(req = {}) {
    return Object.freeze({
        path: req.path,
        method: req.method,
        pathParams: req.params,
        queryParams: req.query,
        body: req.body
    })
}