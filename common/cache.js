module.exports = function (fn, maxage) {
    var cache = {};
    this.get = function (name, data) {
        var x = cache[name];
        var now = new Date().getTime();
        if (!x || x.deadline < now) {
            var value = fn(name, data);
            x = {
                deadline: now + maxage,
                value: value
            };
            cache[name] = x;
        }
        x.deadline = now + maxage;
        return x.value;
    };
};