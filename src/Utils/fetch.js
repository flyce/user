import config from '../Config/env';

export function get(url, headers) {
    const result = fetch(config.url + url, {
        headers: headers
    }).then(function (response) {
        return response.json();
    });
    return result;
}

export function post(url, json, header) {
    console.log(header);
    let headers;
    if (header !== undefined) {
        headers = {
                'auth': header.token,
                '_id': header._id,
                'Content-Type': 'application/json'
        }
    } else {
        headers = {
            'Content-Type': 'application/json'
        }
    }
    const result = fetch(config.url + url, {
        method: 'POST',
        headers,
        body: JSON.stringify(json)
    }).then(function (response) {
        return response.json();
    });

    return result;
}