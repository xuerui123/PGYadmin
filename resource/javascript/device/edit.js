let uid = window.location.search.split('=')[1]
console.log(uid)
var context = new Vue({
    el: '#content',
    data: {
        list: []
    },
    methods: {
        listuser: function () {
            let data = {
                token: sessionStorage.getItem('token'),
                uid:uid
            }
            let arr = []
            mutual('/Manage/device/listsys', data, function (res) {
                console.log(res)
                context.list = res.data.list;
            }, function (error) {
                console.log(error)
            })
        },
        setoem:function () {
            let data = {
                uid:uid,
                token:sessionStorage.getItem('token'),
                oem:$('.textarea').val()
            }
            mutual('/Manage/device/setoem', data, function (res) {
                console.log(res)
            }, function (error) {
                console.log(error)
            })
        },
        eidtOEM:function (sn) {
            layer_show('配置oem', 'oem?sn='+sn, 400, 400);
        },
        delSN:function (sn) {
            let data = {
                token:sessionStorage.getItem('token'),
                sn:sn
            }
            layer.confirm('确认删除改设备', function (index) {

                mutual('/Manage/device/delsys',data,function (res) {
                    console.log(res)
                    layer.msg('已删除!', {icon: 1, time: 1000});
                    context.listuser()
                },function (error) {
                    console.log(error)
                })
            },)

        },
        editSN:function (sn) {
            layer_show('编辑SN', 'sn?sn='+sn, 300, 300);
        },
        setroom:function (id,e) {

            let data = {
                sn:id,
                token:sessionStorage.getItem('token'),
                roomname: $(e.target).parent().prev().find('input').val()
            }
            if(data.roomname==''){
                layer.msg('房间号不可为空!', {icon: 1, time: 1000});
            }else{
                mutual('/Manage/room/setroom',data,function (res) {
                    console.log(res)
                    layer.msg('更新成功!', {icon: 1, time: 1000});
                    context.listuser()
                },function (error) {
                    console.log(error)
                })
            }
        }
    },
    computed: {}
});

context.listuser()

$(function () {
    $('.skin-minimal input').iCheck({
        checkboxClass: 'icheckbox-blue',
        radioClass: 'iradio-blue',
        increaseArea: '20%'
    });
    $("#tab-system").Huitab({
        index: 0
    });
});

function editSN() {
    layer_show()
}