import { isAuthenticated } from "../auth/auth";

const { API } = require("../backend");

export const tinyUrl = data => {
    return fetch(`${API}/tinyurl/create`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + isAuthenticated().token
        },
        body: JSON.stringify(data)
    })
        .then(response => (response.json()))
        .catch(err => ({ error: "Please Check Your Internet Conenction" }));
}

export const fetchUrl = data => {
    return fetch(`${API}/tinyurl/${data}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + isAuthenticated().token
        },
    })
        .then(response => (response.json()))
        .catch(err => ({ error: "Please Check Your Internet Conenction" }));
}