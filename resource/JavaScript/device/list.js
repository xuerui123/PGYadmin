var context = new Vue({
    el: '#VueBox',
    data: {
        identity:'未登录',
        list:[]
    },
    mounted:function () {
        let identity = sessionStorage.getItem('pr');
        sessionStorage.removeItem('rooms')
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
                token: sessionStorage.getItem('token')
            };
            mutual('/Manage/device/listsys', data, function (res) {
                console.log(res)
                context.list = res.data.list;
            }, function (error) {
                console.log(error)
            })
        },
        lookRooms:function (obj) {
            sessionStorage.setItem('rooms',JSON.stringify(obj))
            window.location.href = '/device/rooms'
        }
    },

});