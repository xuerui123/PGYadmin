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
                hdid:1,
                p:this.page
            };
            mutual('/Api/pay/paylist',data,function (res) {
                console.log(res)
                let list = res.data.list;
                for(let i=0;i<list.length;i++){
                    list[i].name=list[i].loginfo.split('/')[0]
                    list[i].adress=list[i].loginfo.split('/')[1]
                }
                context.list = list;
                console.log(context.list)
            },function () {

            })
        }
    }
});