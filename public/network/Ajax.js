import BACKEND_URL from './const';

export default class Ajax {
    static _fetch(url, request = {}, timeout = 5000) {
        return Promise.race([
            fetch(url, request),
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error('timeout'))}, timeout);
            })
        ])
    };

    static doGet(apiURL) {
        const url = BACKEND_URL.SERVER + apiURL;
        return this._fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw res;
                }

                return res;
            });
    };

    static doPost(apiURL, data) {
        const url = BACKEND_URL.SERVER + apiURL;
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        };

        return this._fetch(url, request)
            .then((res) => {
                console.log("_fetch then", res)
                if (!res.ok) {
                    throw res;
                }

                return res;
            })
    }
}