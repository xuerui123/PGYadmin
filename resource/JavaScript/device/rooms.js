var context = new Vue({
    el: '#VueBox',
    data: {
        identity: '未登录',
        showBG: false,
        roomsObj: {},
        roomName: '',
        brandList: [],
        dname: '',
        brand: '',
        codeList: [],
        remoid: '',
        lampName: '',
        devlist: [],
        SmartPlugName: ''
    },
    mounted: function () {
        let identity = sessionStorage.getItem('pr');
        this.roomsObj = JSON.parse(sessionStorage.getItem('rooms'))
        if (identity == 'admin') {
            this.identity = '管理员'
        } else {
            this.identity = identity
        }
        this.loadDevList();
    },
    methods: {

        loadDevList: function () {
            let data = {
                sn: this.roomsObj.sn,
                token: sessionStorage.getItem('token'),
                roomname: this.roomsObj.rooms.name
            };
            mutual('/Manage/room/elelist', data, function (res) {
                console.log(res)
                if (res.ack == 1) {
                    context.devlist = res.data.list
                } else {
                    swal('提示', res.msg, 'error')
                }
            }, function (error) {
                console.log(error)
            })
        },
        devName: function (e) {
            console.log(e.target.value)
            context.dname = e.target.value;
            context.brandList = [];
            context.codeList = [];

            if (context.dname == '灯光' || context.dname == '窗帘' || context.dname == '智能插座') {
                $('.brand').css('display', 'none')
                $('.devcode').css('display', 'none')
                if (context.dname == '灯光') {
                    $('.lamp').css('display', 'block')
                    $('.SmartPlug').css('display', 'none')
                } else if (context.dname == '智能插座') {
                    $('.SmartPlug').css('display', 'block')
                    $('.lamp').css('display', 'none')
                } else if (context.dname == '窗帘') {
                    $('.SmartPlug').css('display', 'none')
                    $('.lamp').css('display', 'none')
                }
            } else {
                $('.brand').css('display', 'block');
                $('.devcode').css('display', 'block');
                $('.SmartPlug').css('display', 'none');
                $('.lamp').css('display', 'none');
                let data = {
                    token: sessionStorage.getItem('token'),
                    devtype: context.dname
                }
                mutual('/Manage/device/getbrand', data, function (res) {
                    console.log(res);
                    context.brandList = res.data.brand;
                }, function (error) {
                    console.log(error)
                })
            }

        },
        devBrand: function (e) {
            context.brand = e.target.value;

            let data = {
                token: sessionStorage.getItem('token'),
                devtype: context.dname,
                brand: context.brand
            }
            mutual('/Manage/device/getdevcode', data, function (res) {
                console.log(res);
                context.codeList = res.data.devcode;
            }, function (error) {
                console.log(error)
            })
        },
        getRemoid: function (e) {
            context.remoid = e.target.value
        },
        lamp: function (e) {
            context.lampName = e.target.value
        },
        SmartPlug: function (e) {
            context.SmartPlugName = e.target.value;
            console.log(e.target.value)
        },
        addDev: function () {
            let obj = {}
            if (context.dname == '电视') {
                obj = {
                    dch: '01',
                    dloca: this.roomsObj.rooms.name,
                    dname: context.dname,
                    dbra: context.brand,
                    remoid: context.remoid,
                    online: "1",
                    dlogo: 'TV.svg',
                    dsys: '2126',
                    dpanel: 'TV',
                    act: 'add',
                    token: sessionStorage.getItem('token'),
                    sn: this.roomsObj.sn,


                }
            } else if (context.dname == '空调') {
                obj = {
                    dch: '01',
                    dloca: this.roomsObj.rooms.name,
                    dname: context.dname,
                    dbra: context.brand,
                    remoid: context.remoid,
                    online: "1",
                    dlogo: 'AirConditioning.svg',
                    dsys: '2126',
                    dpanel: 'AirConditioning',
                    act: 'add',
                    token: sessionStorage.getItem('token'),
                    sn: this.roomsObj.sn
                }
            } else if (context.dname == '机顶盒') {
                obj = {
                    dch: '01',
                    dloca: this.roomsObj.rooms.name,
                    dname: context.dname,
                    dbra: context.brand,
                    remoid: context.remoid,
                    online: "1",
                    dlogo: 'STB.svg',
                    dsys: '2126',
                    dpanel: 'STB',
                    act: 'add',
                    token: sessionStorage.getItem('token'),
                    sn: this.roomsObj.sn
                }
            } else if (context.dname == '网络盒子') {
                obj = {
                    dch: '01',
                    dloca: this.roomsObj.rooms.name,
                    dname: context.dname,
                    dbra: context.brand,
                    remoid: context.remoid,
                    online: "1",
                    dlogo: 'NetworkBox.svg',
                    dsys: '2126',
                    dpanel: 'NetworkBox',
                    act: 'add',
                    token: sessionStorage.getItem('token'),
                    sn: this.roomsObj.sn
                }
            } else if (context.dname == '投影仪') {
                obj = {
                    dch: '01',
                    dloca: this.roomsObj.rooms.name,
                    dname: context.dname,
                    dbra: context.brand,
                    remoid: context.remoid,
                    online: "1",
                    dlogo: 'Projector.svg',
                    dsys: '2126',
                    dpanel: 'Projector',
                    act: 'add',
                    token: sessionStorage.getItem('token'),
                    sn: this.roomsObj.sn
                }
            } else if (context.dname == '窗帘') {
                obj = {
                    dch: 12,
                    dname: context.dname,
                    dloca: this.roomsObj.rooms.name,
                    dlogo: 'Curtain.svg',
                    dcap: "",
                    dsys: "1123",
                    dpanel: "Curtain",
                    act: 'add',
                    token: sessionStorage.getItem('token'),
                    sn: this.roomsObj.sn
                }
            } else if (context.dname == '灯光') {
                obj = {
                    dch: 11,
                    dname: context.lampName,
                    dloca: this.roomsObj.rooms.name,
                    dlogo: 'Lamp.svg',
                    dcap: "",
                    dsys: "1121",
                    dpanel: "Lamp",
                    act: 'add',
                    token: sessionStorage.getItem('token'),
                    sn: this.roomsObj.sn
                }
            } else if (context.dname == '智能插座') {
                obj = {
                    dch: 11,
                    dname: context.SmartPlugName,
                    dloca: this.roomsObj.rooms.name,
                    dlogo: 'SmartPlug1.svg',
                    dsys: "1126",
                    dpanel: "SmartPlug1",
                    act: 'add',
                    token: sessionStorage.getItem('token'),
                    sn: this.roomsObj.sn
                }
            } else if (context.dname == '风扇') {
                obj = {
                    dch: '01',
                    dloca: this.roomsObj.rooms.name,
                    dname: context.dname,
                    dbra: context.brand,
                    remoid: context.remoid,
                    online: "1",
                    dlogo: 'Fan.svg',
                    dsys: '2126',
                    dpanel: 'Fan1',
                    act: 'add',
                    token: sessionStorage.getItem('token'),
                    sn: this.roomsObj.sn
                }
            } else if (context.dname == '加湿器') {
                obj = {
                    dch: "01",
                    dloca: this.roomsObj.rooms.name,
                    dname: context.dname,
                    dbra: context.brand,
                    remoid: context.remoid,
                    dlogo: 'Humidifier.svg',
                    dcap: "",
                    dsys: "2126",
                    dpanel: "Humidifier",
                    act: 'add',
                    token: sessionStorage.getItem('token'),
                    sn: this.roomsObj.sn
                }
            } else if (context.dname == '空气净化器') {
                obj = {
                    dch: '01',
                    dloca: this.roomsObj.rooms.name,
                    dname: context.dname,
                    dbra: context.brand,
                    remoid: context.remoid,
                    online: "1",
                    dlogo: 'AirPurifier.svg',
                    dsys: '2126',
                    dpanel: 'AirPurifier',
                    act: 'add',
                    token: sessionStorage.getItem('token'),
                    sn: this.roomsObj.sn
                }
            } else if (context.dname == '扫地机器人') {
                obj = {
                    dch: "01",
                    dloca: this.roomsObj.rooms.name,
                    dname: context.dname,
                    dbra: context.brand,
                    remoid: context.remoid,
                    dlogo: 'SweepingRobot.svg',
                    dcap: "",
                    dsys: "2136",
                    dpanel: "SweepingRobot",
                    act: 'add',
                    token: sessionStorage.getItem('token'),
                    sn: this.roomsObj.sn
                }
            } else if (context.dname == '功放') {
                obj = {
                    dch: "01",
                    dloca: this.roomsObj.rooms.name,
                    dname: context.dname,
                    dbra: context.brand,
                    remoid: context.remoid,
                    dlogo: 'PowerAmplifier.svg',
                    dcap: "",
                    dsys: "2126",
                    dpanel: "PowerAmplifier",
                    act: 'add',
                    token: sessionStorage.getItem('token'),
                    sn: this.roomsObj.sn
                }
            } else if (context.dname == '热水器') {
                obj = {
                    dch: '01',
                    dloca: this.roomsObj.rooms.name,
                    dname: context.dname,
                    dbra: context.brand,
                    remoid: context.remoid,
                    online: "1",
                    dlogo: 'WaterHeater.svg',
                    dsys: '2126',
                    dpanel: 'WaterHeater',
                    act: 'add',
                    token: sessionStorage.getItem('token'),
                    sn: this.roomsObj.sn
                }
            }
            console.log(obj)
            mutual('/Manage/device/ele', obj, function (res) {
                console.log(res)
                if (res.ack == 1) {
                    swal('提示', '添加成功', 'success');
                    setTimeout(function () {
                        context.loadDevList();
                    },1000)
                } else {
                    swal('提示', res.msg, 'error')
                }
            }, function (error) {
                console.log(error)
            })
        },
        delDev: function (id) {
            let data = {
                act: 'del',
                sn:this.roomsObj.sn,
                yid:id,
                token:sessionStorage.getItem('token')
            };
            swal({
                    title: "提示",
                    text: "确认删除该电器？",
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
                        mutual('/Manage/device/ele', data, function (res) {
                            if(res.ack==1){
                                swal('提示', '已删除', 'success')
                                setTimeout(function () {
                                    context.loadDevList();
                                },1000)

                            }else{
                                swal('提示', res.msg, 'error')
                            }

                        }, function (error) {
                            console.log(error)
                        })
                    } else {
                        swal('提示', '已取消删除', 'success')
                    }
                }
            );

        },
        updateSys: function (sn,e) {
            console.log($($(e.target).parent().siblings()[3]).find('select').val())
            let safemode = ''
            if($($(e.target).parent().siblings()[3]).find('select').val()=='有人'){
                safemode = 1
            }else if($($(e.target).parent().siblings()[3]).find('select').val()=='空闲'){
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