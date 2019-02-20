function mutual(url, data,  successCallback, errorCallback) {
    $.ajax({
        url: 'http://wx.xq.cspugoing.com'+url,
        type: 'post',
        data: JSON.stringify(data),
        success: function (response) {
            if(response.msg=='未登录'){
                window.location.href='/'
            }else{
                successCallback(response)
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            errorCallback(XMLHttpRequest, textStatus, errorThrown)

        }
    })
}
function UrlSearch() {
    var name, value;
    var str = window.location.href;//取得整个地址栏
    var num = str.indexOf("?");
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    var arr = str.split("&"); //各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
        }
    }
};