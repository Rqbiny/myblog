/**
 * redscarf
 */
$(function (){

    //当点击编辑的时候执行
	$(".edit").click(function() {

        var o=$(this);
        var tr = o.parents('tr');
        var id = tr.children(':eq(0)').text();
        $("#updateform").attr("action", "/article/" + id);
        $("#title").val(tr.children(':eq(1)').text());
        $("#subheading").val(tr.children(':eq(2)').text());
        UE.getEditor('editer').setContent(tr.children(':eq(5)').text());
    });

	//为表单，绑定jquery插件，来应用js验证功能
    $('#updateform').validate({
    		//绑定submit回调
    		submitHandler:function(){
    			//执行ajax提交
    			$("#updateform").ajaxSubmit({
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
    			title:{
                    required:true,
                    rangelength:[3,20]
                },
                subheading:{
                    required:true,
                    rangelength:[3,20]
                }
    		},
    		messages:{
    			title:{
                    required:'标题得写吧?',
                    rangelength: "标题长度应该为三到二十个字"
                },
                subheading:{
                    required:"写个副标题吧",
                    rangelength: "副标题长度应该为三到二十个字"
                }
    		}
    });

    //删除文章
    $(".del").click(function(){
        if(confirm("确定要删除该商品，删除该商品会把相关的货品也一并删除？")){
            var id=$(this).attr('data-id');
            $.ajax({
                   url: "/article/"+id,
                   type: 'DELETE',
                   success: function(result) {
                       alert(result);
                       location.reload();
                   }
            });
        }
    });

    /*上传图片*/
    $('#detail').diyUpload({
        url:'/imgupload',
        success:function( data ) {
            //console.info( data.message );
            var len=$("#img").find("li").length;
            var lis='<li> <input type="hidden" name="img" value="'+data.url+'"> </li>';
            $("#img").append(lis);
        },
        error:function( err ) {
            //console.info( err );
        }
    });
});
