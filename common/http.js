const request = require('request');

class Http {
    constructor(host) {
        this.host = host;
    }

    post(path, data) {
        let host = this.host;
        return new Promise(function (res, rej) {
            request.post(`${host}/${path}`, function (e, r, b) {
                if (e) {
                    rej(e);
                } else if (r.statusCode == 200) {
                    b = JSON.parse(b);
                    if (b.success) {
                        res(b.result);
                    } else {
                        rej(new Error(b.result.message));
                    }
                } else {
                    rej(new Error('系统异常'));
                }
            }).form(data);
        });
    }
}

module.exports = Http;
