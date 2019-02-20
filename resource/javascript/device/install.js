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
        }else{
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
        add: function (id) {
            window.location.href = '/device/installAdd?id=' + id;
        },
        edit: function (id) {
            window.location.href = '/device/edit?id=' + id;
        }
    },

});