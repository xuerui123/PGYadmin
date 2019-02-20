var context = new Vue({
    el: '#VueBox',
    data: {
        identity: '未登录',
        list: []
    },
    mounted: function () {
        let identity = sessionStorage.getItem('pr');
        sessionStorage.removeItem('userObj')
        if (identity == 'admin') {
            this.identity = '管理员'
        } else {
            this.identity = identity
        }
        this.listuser();
    },
    methods: {
        listuser: function () {
            let data = {
                token: sessionStorage.getItem('token')
            }
            mutual('/Manage/Index/listUser', data, function (res) {
                console.log(res)
                context.list = res.data.list;
            }, function (error) {
                console.log(error)
            })
        },
        forbiddenUser: function (account) {
            let data = {
                token: sessionStorage.getItem('token'),
                account: account
            }
            swal({
                    title: "提示",
                    text: "确认禁用该用户吗？",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        mutual('/Manage/Index/forbiddenUser', data, function (res) {
                            swal('提示', '已禁用', 'success')
                            context.listuser();
                        }, function (error) {
                            console.log(error)
                        })
                    } else {
                        swal('提示', '已取消', 'success')
                    }
                })
        },
        del:function (account) {
            let data = {
                token: sessionStorage.getItem('token'),
                account: account
            }
            swal({
                    title: "提示",
                    text: "确认删除该用户吗？",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        mutual('/Manage/Index/delUser', data, function (res) {
                            swal('提示', '已删除', 'success')
                            context.listuser();
                        }, function (error) {
                            console.log(error)
                        })
                    } else {
                        swal('提示', '已取消', 'success')
                    }
                })
        },
        edit: function (item) {
            sessionStorage.setItem('userObj', JSON.stringify(item));
            window.location.href = '/user/add'
        }
    },

});