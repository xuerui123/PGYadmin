let versionMsg = JSON.parse(sessionStorage.getItem('versionMsg'));
console.log(versionMsg);

var context = new Vue({
    el: '#content',
    data: {
        list: []
    },
    methods: {
        save: function () {

            let data = {
                id:versionMsg.id,
                token: sessionStorage.getItem('token'),
                sys: versionMsg.sys,
                channel: $('.channel').val(),
                apkName: $('.apkName').val(),
                apkUrl: $('.apkUrl').val(),
                apkMd5: $('.apkMd5').val(),
                version: $('.version').val(),
                versionCode: $('.versionCode').val(),
                mcuUrl: $('.mcuUrl').val(),
                mcuMd5: $('.mcuMd5').val(),
                mcuCode: $('.mcuCode').val(),
            }
            if (data.channel == '') {
                layer.confirm('请输入渠道名', {btn: ['确定']}, function (index) {
                })
            } else if (data.apkName == '') {
                layer.confirm('请输入渠道名apk名称', {btn: ['确定']}, function (index) {
                })
            } else if (data.apkUrl == '') {
                layer.confirm('请输入下载地址', {btn: ['确定']}, function (index) {
                })
            } else if (data.apkMd5 == '') {
                layer.confirm('请输入md5', {btn: ['确定']}, function (index) {
                })
            } else if (data.version == '') {
                layer.confirm('请输入版本号', {btn: ['确定']}, function (index) {
                })
            } else if (data.versionCode == '') {
                layer.confirm('请输入版本code', {btn: ['确定']}, function (index) {
                })
            } else if (data.mcuUrl == '') {
                layer.confirm('请输入muc下载地址', {btn: ['确定']}, function (index) {
                })
            } else if (data.mcuMd5 == '') {
                layer.confirm('请输入muc md5', {btn: ['确定']}, function (index) {
                })
            } else if (data.mcuCode == '') {
                layer.confirm('请输入muc code', {btn: ['确定']}, function (index) {
                })
            } else {
                mutual('/Manage/edition/update', data, function (res) {
                    console.log(res)
                    if (res.ack == 1) {
                        layer.confirm('修改成功', {btn: ['确定']}, function (index) {
                            layer_close()
                        },)
                    }
                }, function (error) {
                    console.log(error)
                })
            }
        }
    },

});
$(function () {
    $('.channel').val(versionMsg.channel);
    $('.apkName').val(versionMsg.apkname);
    $('.apkUrl').val(versionMsg.apkurl);
    $('.apkMd5').val(versionMsg.apkmd5);
    $('.version').val(versionMsg.version) ;
    $('.versionCode').val(versionMsg.versioncode);
    $('.mcuUrl').val(versionMsg.mcuurl);
    $('.mcuMd5').val(versionMsg.mcumd5);
    $('.mcuCode').val(versionMsg.mcucode);
})