/**
 * redscarf
 */
$(function(){
    $(".edit").click(function(){
        var id=parseInt($(this).attr("data-id"));
        $("#myform").attr("action","/category/"+id);
        $.getJSON("/category/"+id+"/edit",function(data,status){
            $("#catname").val(data.cat_name);
            $("#description").val(data.cat_desc);
            $("#sort").val(data.sort_order);
            switch (data.is_show){
                case 0:
                    document.getElementById("show0").checked=true;
                    break;
                case 1:
                    document.getElementById("show1").checked=true;
                    break;
            }
        })
    });

    $(".edit").click(function(){
        $("#par").empty();
        var defaultopt="<option value='0'>无</option>";
        $("#par").append(defaultopt);
        var opt;
        var category=$(this).attr("data-category");
        var pid=$(this).attr("data-pid");
        $.get("/category/"+category,{},function(data,status){
            for(var i=0;i<data.length;i++){
                opt="<option class='opt' value="+data[i].cat_id+">"+data[i].cat_name+"</option>";
                console.log(opt);
                $("#par").append(opt);
            }
            //判断是否是二级分类
            if(pid != 0){
                $(".opt[value='" + category + "']").attr("id","cur");
                document.getElementById("cur").selected=true;
            }

        });
    });

    //点击查看子分类
    $(".view").click(function(){
        $("#soncate").empty();
        var id=$(this).attr("data-id");
        var dt;
        //获得子分类
        var url="/category/cate/"+id;
        $.get(url,function(data,status){
            for(var i=0;i<data.length;i++){
                dt="<dt class='son' data-id="+data[i].cat_id+">"+data[i].cat_name+"</dt>";
                $("#soncate").append(dt);
            }
        })
    });

    //为表单，绑定jquery插件，来应用js验证功能
    $('#myform').validate({
    		//绑定submit回调
    		submitHandler:function(){
    			//执行ajax提交
    			$("#myform").ajaxSubmit({
                type: 'put',
                success: function (data) {
                    if(data.ServerNo == 0){
                        alert(data.ResultData.Message);
                        location.reload();
                    }else{
                        alert(data.ResultData.Message);
                    }
                },
            });
            //阻止浏览器默认动作
            return false;
    		},
    		//编写验证规则，在真正执行ajax提交前验证
            rules:{
    			catname:{
                    required:true
                },
				sort:{
                     required:true
                 },
				description:{
                    required:true
                }
    		},
    		messages:{
				catname:{
                     required:"分类名不能为空",
                },
				sort:{
                    required:"分类排序不能为空",
                },
				description:{
                    required:"分类描述不能为空",
                },
    		}
    });

    $(".del").click(function(){
        if(confirm('确定要删除该分类吗？')){
            var id=$(this).attr("data-id");
            $.ajax({
                url: "/category/"+id,
                type: 'DELETE',
                success: function(result) {
                    // Do something with the result
                    alert(result);
                    location.reload();
                }
            })
        }
    });
});
