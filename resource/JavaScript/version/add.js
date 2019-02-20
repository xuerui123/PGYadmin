var context = new Vue({
    el: '#VueBox',
    data: {
        identity: '未登录',
        versionObj: {},
    },

    mounted: function () {
        let identity = sessionStorage.getItem('pr');
        this.versionObj = JSON.parse(sessionStorage.getItem('versionObj'));

        if (this.versionObj) {
            $('.channel').val(this.versionObj.channel);
            $('.apkName').val(this.versionObj.apk_full_name);
            $('.apkUrl').val(this.versionObj.apk_url);
            $('.apkMd5').val(this.versionObj.apk_md5);
            $('.version').val(this.versionObj.version_name);
            $('.versionCode').val(this.versionObj.version_code);
            $('.mcuUrl').val(this.versionObj.mcu_url);
            $('.mcuMd5').val(this.versionObj.mcu_md5);
            $('.mcuCode').val(this.versionObj.mcu_code);
        }
        if (identity == 'admin') {
            this.identity = '管理员'
        }else{
            this.identity = identity
        }

    },
    methods: {
        save: function () {
            let data = {
                token: sessionStorage.getItem('token'),
                sys: 2,
                apk_name: $('.channel').val(),
                apk_full_name: $('.apkName').val(),
                apk_url: $('.apkUrl').val(),
                apk_md5: $('.apkMd5').val(),
                version_name: $('.versions').val(),
                version_code: $('.versionCode').val(),
                mcu_url: $('.mcuUrl').val(),
                mcu_md5: $('.mcuMd5').val(),
                mcu_code: $('.mcuCode').val(),
            }
            if (data.apk_name == '') {
                swal('提示','请输入渠道名','error')
            } else if (data.apk_full_name == '') {
                swal('提示','请输入apk名称','error')
            } else if (data.apk_url == '') {
                swal('提示','请输入下载地址','error')
            } else if (data.apk_md5 == '') {
                swal('提示','请输入md5','error')
            } else if (data.version_name == '') {
                swal('提示','请输入版本号','error')
            } else if (data.version_code == '') {
                swal('提示','请输入版本code','error')
            } else if (data.mcu_url == '') {
                swal('提示','请输入muc下载地址','error')
            } else if (data.mcu_md5 == '') {
                swal('提示','请输入muc md5','error')
            } else if (data.mcu_code == '') {
                swal('提示','请输入muc code','error')
            } else {
                if (this.versionObj) {
                    data.id = this.versionObj.id;
                    mutual('/Manage/edition/update', data, function (res) {
                        console.log(res)
                        if (res.ack == 1) {
                            swal('提示','修改完成','success')
                        }else{
                            swal('提示',res.msg,'error')
                        }
                    }, function (error) {
                        console.log(error)
                    })
                } else {
                    mutual('/Manage/edition/add', data, function (res) {
                        console.log(res)
                        if (res.ack == 1) {
                            swal('提示','修改完成','success')
                        }else{
                            swal('提示',res.msg,'error')
                        }
                    }, function (error) {
                        console.log(error)
                    })
                }

            }

        }
    },

});