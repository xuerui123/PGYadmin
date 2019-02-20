var context = new Vue({
    el: '#VueBox',
    data: {
        identity:'未登录',
        act:'',
        pwd:''
    },
    methods: {
        login:function () {
            let data = {
                account:this.act,
                pwd:this.pwd
            }
            mutual('/Manage/Index/login',data,function (res) {
                console.log(res)
                if(res.ack==1){
                    sessionStorage.setItem('token',res.data.token);
                    sessionStorage.setItem('pr',res.data.pr);
                    window.location.href='user/list'
                }else{
                    swal('提示',res.msg,'error')
                }
            },function (error) {
                console.log(error)

            })
        }
    },

});