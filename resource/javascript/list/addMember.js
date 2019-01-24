

function addUser() {
    let data = {
        account : $('.account').val(),
        name : $('.name').val(),
        appid : $('.appid').val(),
        appselect : $('.appselect').val(),
        phone : $('.phone').val(),
        email : $('.email').val(),
        num : $('.num').val(),
        pr : $('.pr').val(),
        superior : $('.superior').val(),
        place : $('.place').val(),
        token:sessionStorage.getItem('token'),
        password:'123456',
        remarks : $('.remarks').val()
    }
    if(data.account==''){
        layer.confirm('请填写账号')
    }else if(data.name==''){
        layer.confirm('请填写公司名')
    }else if(data.appid==''){
        layer.confirm('请填写appid')
    }else if(data.appselect==''){
        layer.confirm('请填写appselect')
    }else if(data.phone==''){
        layer.confirm('请填写电话号')
    }else if(data.email==''){
        layer.confirm('请填写邮箱号')
    }else if(data.num==''){
        layer.confirm('请填写用户编号')
    }else if(data.pr==''){
        layer.confirm('请填写用户身份')
    }else{
        mutual('/Manage/Index/addUser',data,function (res) {
            console.log(res)
            layer.confirm('updateUser', {btn: ['确定']}, function (index) {
                layer_close()
            },)
        },function (error) {
            console.log(error)
        })
    }
}