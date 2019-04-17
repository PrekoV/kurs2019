const api = (method, url, body) => {

    let options = {
        method: method,
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    return fetch(`http://http:/localhost:8080/${url}`, options)
}

export default api