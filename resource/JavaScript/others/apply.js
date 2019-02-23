var context = new Vue({
    el: '#VueBox',
    data: {
        identity: '未登录',
        page:1,
        list:[]
    },
    mounted: function () {
        let identity = sessionStorage.getItem('pr');
        if (identity == 'admin') {
            this.identity = '管理员'
        } else {
            this.identity = identity
        }
        this.loadList();

    },
    methods: {
        loadList:function () {
            let data = {
                token:sessionStorage.getItem('token'),
                p:this.page
            };
            mutual('/Manage/index/apply',data,function (res) {
                console.log(res)
                context.list = res.data.list
            },function () {
                
            })
        }
    }
});