function login() {
    let account = $('.account').val();
    let pwd = $('.pwd').val();
    console.log(account,pwd);
    let data = {
        account:account,
        pwd:pwd
    }
    mutual('/Manage/Index/login',data,function (res) {
        console.log(res)
        if(res.ack==1){
            sessionStorage.setItem('token',res.data.token);
            sessionStorage.setItem('pr',res.data.pr);
            window.location.href='index'
        }else{

        }
    },function (error) {
        console.log(error)
    })
}