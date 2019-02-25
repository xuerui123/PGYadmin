let context = new Vue({
    el: '#VueBox',
    data: {
        identity: '未登录',
        userObj: {},

    },
    mounted: function () {
        let identity = sessionStorage.getItem('pr');
        this.userObj = JSON.parse(sessionStorage.getItem('userObj'))
        if (this.userObj) {
            $('.account').val(this.userObj.account);
            $('.name').val(this.userObj.name);
            $('.phone').val(this.userObj.phone);
            $('.email').val(this.userObj.email);
            $('.identity').val(this.userObj.pr);

            $('.superior').val(this.userObj.superior);
            $('.place').val(this.userObj.place);
            $('.remarks').val(this.userObj.remarks)
            this.getAppdata()
        }
        if (identity == 'admin') {
            this.identity = '管理员'
        }else{
            this.identity = identity
        }

    },
    methods: {
        getAppdata: function () {
            let data = {
                token: sessionStorage.getItem('token'),
                account: this.userObj.account
            }
            mutual('/Manage/Index/getAppdata', data, function (res) {
                console.log(res)
                $('.platname').val(res.data.platname)
                $('.infrared').val(res.data.limit);
            }, function (error) {
                console.log(error)
            })
        },
        add: function () {
            let data = {
                account: $('.account').val(),
                password: '123456',
                name: $('.name').val(),
                phone: $('.phone').val(),
                email: $('.email').val(),
                pr: $('.identity').val(),
                superior: $('.superior').val(),
                limit: $('.infrared').val(),
                place: $('.place').val(),
                platname: $('.platname').val(),
                token: sessionStorage.getItem('token'),
                remarks: $('.remarks').val()
            }
            if (data.account == '') {
                swal('提示', '请填写账号', 'error')
            } else if (data.name == '') {
                swal('提示', '请填写公司名', 'error')
            } else if (data.phone == '') {
                swal('提示', '请填写电话号', 'error')
            } else if (data.email == '') {
                swal('提示', '请填写邮箱号', 'error')
            } else if (data.pr == '') {
                swal('提示', '请选择用户身份', 'error')
            } else if (data.pr == '') {
                swal('提示', '请天蝎产品名称', 'error')
            } else {
                if (this.userObj) {
                    mutual('/Manage/Index/updateUser', data, function (res) {
                        console.log(res)
                        if(res.ack==1){
                            swal('提示','appid：'+ res.data.appid + ' , ' + 'appkey：' + res.data.appkey,'success')
                        }else{
                            swal('提示',res.data.msg,'error')
                        }
                    }, function (error) {
                        console.log(error)
                    })
                } else {
                    mutual('/Manage/Index/addUser', data, function (res) {
                        console.log(res)
                        if(res.ack==1){
                            swal('提示','appid：'+ res.data.appid + ' , ' + 'appkey：' + res.data.appkey,'success')
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
