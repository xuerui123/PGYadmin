var context = new Vue({
    el: '#VueBox',
    data: {
        identity:'未登录',
        urlObj:''
    },
    mounted:function () {
        let identity = sessionStorage.getItem('pr');
        this.urlObj=new UrlSearch;
        if(identity == 'admin'){
            this.identity = '管理员'
        }else{
            this.identity = identity
        }
    },
    methods: {
        save:function () {
            let str = $('textarea').val().toString();
            console.log(str.split(','))
            str = str.replace(/\r\n/g, ",")
            str = str.replace(/\n/g, ",");
            str = str.replace(/\s/g, ",");
            let data = {
                arr: str.split(','),
                uid:this.urlObj.id,
                token: sessionStorage.getItem('token'),
            };
            for(let i=0;i<data.arr.length;i++){
                if(data.arr[i]=='' ||data.arr[i]==' '){
                    data.arr.splice(i,1)
                }
            }
            if(data.arr[0]==''){
                data.arr.splice(0,1)
            }
            if(data.arr.length==0){
                swal('提示','最少添加一个sn','error')
            }else{
                mutual('/Manage/device/addsys', data, function (res) {
                    console.log(res)
                    if(res.ack==1){
                        swal('提示','添加成功','success')
                        $('textarea').val('')
                    }else{
                        swal('提示',res.msg,'error')
                    }
                }, function (error) {
                    console.log(error)
                })
            }


        },
        back:function () {
            window.history.back()
        }
    },

});