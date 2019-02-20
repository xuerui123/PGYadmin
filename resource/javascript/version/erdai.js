var context = new Vue({
    el: '#VueBox',
    data: {
        identity:'未登录',
        list:[]
    },
    mounted:function () {
        let identity = sessionStorage.getItem('pr');
        sessionStorage.removeItem('versionObj')
        if(identity == 'admin'){
            this.identity = '管理员'
        }else{
            this.identity = identity
        }
        this.loadList();
    },
    methods: {
        loadList:function () {
            let data = {
                token:sessionStorage.getItem('token')
            }
            mutual('/Manage/edition/getlist', data, function (res) {
                console.log(res)
                context.list = res.data.list
            }, function (error) {
                console.log(error)
            })
        },
        editV:function (obj) {
            sessionStorage.setItem('versionObj',JSON.stringify(obj))
            window.location.href='/version/add'
        },
        delV:function (id) {
            swal({
                    title: "提示",
                    text: "确认删除该版本？",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm){
                    if (isConfirm) {
                        let data = {
                            token:sessionStorage.getItem('token'),
                            sys:2,
                            id:id
                        };
                        mutual('/Manage/edition/del', data, function (res) {
                            console.log(res)
                            context.loadList();
                            swal('提示','已成功删除','success')
                        }, function (error) {
                            console.log(error)
                        })
                    } else {
                        swal('提示','已取消删除','success')
                    }
                });
        }
    }

});