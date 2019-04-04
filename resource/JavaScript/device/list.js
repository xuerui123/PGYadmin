var context = new Vue({
    el: '#VueBox',
    data: {
        identity: '未登录',
        list: []
    },
    mounted: function () {
        let identity = sessionStorage.getItem('pr');
        sessionStorage.removeItem('rooms')
        if (identity == 'admin') {
            this.identity = '管理员'
        } else {
            this.identity = identity
        }
        this.loadList();
    },
    methods: {
        loadList: function () {
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
        lookRooms: function (obj) {
            sessionStorage.setItem('rooms', JSON.stringify(obj))
            window.location.href = '/device/rooms'
        },
        update: function (sn,e) {
            console.log($($(e.target).parent().siblings()[4]).find('select').val())
            let safemode = ''
            if($($(e.target).parent().siblings()[4]).find('select').val()=='有人'){
                safemode = 1
            }else if($($(e.target).parent().siblings()[4]).find('select').val()=='空闲'){
                safemode = 0
            }
            let data = {
                token:sessionStorage.getItem('token'),
                sn:sn,
                status:safemode
            }
            mutual('/Manage/room/setroomstatus', data, function (res) {
                console.log(res)
                if(res.ack==1){
                    swal('提示','更新成功','success')
                }
            }, function (error) {
                console.log(error)
            })
        },
        send: function (sn, e) {

            let text = $(e.target).parent().prev().find('input').val()
            let data = {
                sn: sn,
                token: sessionStorage.getItem('token'),
                msg: text
            }
            mutual('/Manage/device/textsend', data, function (res) {
                console.log(res)
                if(res.ack==1){
                    swal('提示','消息发送成功','success')
                    $(e.target).parent().prev().find('input').val('')
                }
            }, function (error) {
                console.log(error)
            })
        }
    },

});