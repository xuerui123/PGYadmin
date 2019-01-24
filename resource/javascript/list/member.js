var context = new Vue({
    el: '#content',
    data: {
        list: []
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
        editMember:function (title,url,w,h,item) {
            sessionStorage.setItem('userObj',JSON.stringify(item));
            layer_show(title, url, w, h);
        },
        forbiddenUser:function (account) {
            let data = {
                token: sessionStorage.getItem('token'),
                account:account
            }
            layer.confirm('确认禁用该用户吗？', function (index) {
                mutual('/Manage/Index/forbiddenUser', data, function (res) {
                    layer.msg('已禁用!', {icon: 1, time: 1000});
                    context.listuser();
                }, function (error) {
                    console.log(error)
                })
            });
        },
        changePassword:function (account) {
            let data = {
                token: sessionStorage.getItem('token'),
                account:account
            }
            layer.confirm('确认重置该用户吗？', function (index) {
                mutual('/Manage/Index/resetUserPwd', data, function (res) {
                    layer.msg('已重置!', {icon: 1, time: 1000});
                    context.listuser();
                }, function (error) {
                    console.log(error)
                })
            });
        },
        delMember:function (account) {
            let data = {
                token: sessionStorage.getItem('token'),
                account:account
            }
            layer.confirm('确认要删除吗？', function (index) {
                mutual('/Manage/Index/delUser', data, function (res) {
                    layer.msg('已删除!', {icon: 1, time: 1000});
                    context.listuser();
                }, function (error) {
                    console.log(error)
                })
            });

        }
    },
    computed: {}
});

context.listuser();


/*用户-添加*/
function member_add(title, url, w, h) {
    layer_show(title, url, w, h);
}

/*用户-查看*/
function member_show(title, url, id, w, h) {
    layer_show(title, url, w, h);
}

/*用户-停用*/
function member_stop(obj, id) {
    layer.confirm('确认要停用吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: '',
            dataType: 'json',
            success: function (data) {
                $(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="member_start(this,id)" href="javascript:;" title="启用"><i class="Hui-iconfont">&#xe6e1;</i></a>');
                $(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已停用</span>');
                $(obj).remove();
                layer.msg('已停用!', {icon: 5, time: 1000});
            },
            error: function (data) {
                console.log(data.msg);
            },
        });
    });
}

/*用户-启用*/
function member_start(obj, id) {
    layer.confirm('确认要启用吗？', function (index) {
        $.ajax({
            type: 'POST',
            url: '',
            dataType: 'json',
            success: function (data) {
                $(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="member_stop(this,id)" href="javascript:;" title="停用"><i class="Hui-iconfont">&#xe631;</i></a>');
                $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已启用</span>');
                $(obj).remove();
                layer.msg('已启用!', {icon: 6, time: 1000});
            },
            error: function (data) {
                console.log(data.msg);
            },
        });
    });
}

/*用户-编辑*/
function member_edit(title, url, id, w, h) {
    layer_show(title, url, w, h);
}

/*密码-修改*/
function change_password(title, url, id, w, h) {
    layer_show(title, url, w, h);
}

/*用户-删除*/
function member_del(obj, id) {
    layer.confirm('确认要删除吗？', function (index) {
        mutual()
    });
}