function mutual(url, data,  successCallback, errorCallback) {
    console.log(JSON.stringify(data))
    $.ajax({
        url: 'http://wx.xq.cspugoing.com'+url,
        type: 'post',
        data: JSON.stringify(data),
        success: function (response) {
            successCallback(response)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            errorCallback(XMLHttpRequest, textStatus, errorThrown)

        }
    })
}