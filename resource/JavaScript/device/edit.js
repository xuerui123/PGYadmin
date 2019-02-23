var context = new Vue({
    el: '#VueBox',
    data: {
        identity: '未登录',
        urlObj: {},
        show: 'device',
        list: [],
        showBG: false,
        editBOX: ''
    },
    mounted: function () {
        let identity = sessionStorage.getItem('pr');
        this.urlObj = new UrlSearch();
        if (identity == 'admin') {
            this.identity = '管理员'
        } else {
            this.identity = identity
        }
        this.listsys()

    },
    methods: {
        showBox: function (str) {
            this.show = str;
        },
        listsys: function () {
            let data = {
                token: sessionStorage.getItem('token'),
                uid: this.urlObj.id
            }
            mutual('/Manage/device/listsys', data, function (res) {
                console.log(res)
                context.list = res.data.list;
            }, function (error) {
                console.log(error)
            })
        },
        editSN: function (sn) {
            console.log(sn)
            this.showBG = true;
            this.editBOX = 'sn';
            setTimeout(function () {
                $('.editSn input').val(sn)
            }, 1)
        },
        editOEM: function (oem) {
            console.log(oem)
            this.showBG = true;
            this.editBOX = 'oem';
            setTimeout(function () {
                $('.editOem textarea').val(oem)
            }, 1)

        },
        subSN: function () {

        },
        subOEM: function (str) {
            let data = {
                sn: str,
                oem: $('.editOem').val(),
                token: sessionStorage.getItem('token')
            };
            mutual('/Manage/device/setoem', data, function (res) {
                console.log(res)
                swal('提示', '修改成功', 'success');
                context.cleanBg()
            }, function (error) {
                console.log(error)
            })
        },
        cleanBg: function () {
            this.showBG = false;
        },
        setoem: function () {
            let data = {
                uid: this.urlObj.id,
                token: sessionStorage.getItem('token'),
                oem: $('.oem textarea').val()
            }
            mutual('/Manage/device/setoem', data, function (res) {
                console.log(res)
                swal('提示', '修改成功', 'success');
            }, function (error) {
                console.log(error)
            })
        },

        delSN: function (sn) {
            let data = {
                token: sessionStorage.getItem('token'),
                sn: sn
            }
            swal({
                    title: "提示",
                    text: "确认删除该设备？",
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
                        mutual('/Manage/device/delsys', data, function (res) {
                            swal('提示', '已删除', 'success')
                            context.listsys()
                        }, function (error) {
                            console.log(error)
                        })
                    } else {
                        swal('提示', '已取消删除', 'success')
                    }
                });


        },

        setroom: function (id, e) {

            let data = {
                sn: id,
                token: sessionStorage.getItem('token'),
                roomname: $(e.target).parent().prev().find('input').val()
            }
            if (data.roomname == '') {
                swal('提示', '房间号不可为空', 'error')

            } else {
                mutual('/Manage/room/setroom', data, function (res) {
                    console.log(res)
                    swal('提示', '修改成功', 'success')

                }, function (error) {
                    console.log(error)
                })
            }
        }
    },

});