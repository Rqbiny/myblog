/**
 * Created by redscarf on 2016/9/18.
 */
$(function (){

	//当一级分类板块改变，查出它下层的父级分类
    $('#section').change(function(){
        //清除数据
        $("#parent").empty();
        $("#parent").append("<option>请选择</option>");
        var opt;
        var cateid=$('#section').val();
        //使用ajax获取父分类
        $.get("/category/"+cateid,{},function(data,status){
            //判断是否有数据
            if(data.length > 0){
                for(var i=0;i<data.length;i++){
                    opt +="<option  value="+data[i].cat_id+">"+data[i].cat_name+"</option>";
                }
                $("#parent").append(opt);
            }
        });
    });

	//当二级分类板块改变，查出它下层的父级分类
    $('#parent').change(function(){
        //清除数据
        $("#category").empty();
        $("#category").append("<option>请选择</option>");
        var opt;
        var cateid=$('#parent').val();
        //使用ajax获取父分类
        $.get("/category/cate/"+cateid,{},function(data,status){
            //判断是否有数据
            if(data.length > 0){
                for(var i=0;i<data.length;i++){
                    opt +="<option  value="+data[i].cat_id+">"+data[i].cat_name+"</option>";
                }
                $("#category").append(opt);
            }
        });
    });

	//获取markdown预览
	$('#preview').click(function(){
		//获取标题
		var title=$('#title').val();
		//获取markdown的内容
		var content=$('#content').val();
		console.log($('#viewcontent'));
		$.post("/article/preview",{content:content},function(data,status){
			$('#viewtitle').text(title);
			$('#viewcontent').html(data);
		});
	});

	//为表单，绑定jquery插件，来应用js验证功能
    $('#myform').validate({
    		//绑定submit回调
    		submitHandler:function(){
    			//执行ajax提交
    			$("#myform").ajaxSubmit({
                type: 'post',
                success: function (data) {
                    if(data.ServerNo == 0){
                        alert(data.ResultData.Message);
                        location.reload();
                    }else{
                        alert(data.ResultData.Message);
                    }
                },
            })
            //阻止浏览器默认动作
            return false;
    		},
    		//编写验证规则，在真正执行ajax提交前验证
    		rules:{
    			parent:"required",
				section:"required",
				category:"required",
    			title:"required",
    			content:"required",
    		},
    		messages:{
				parent:"分类得选一个吧？",
				section:"二级分类得选一个吧？",
				category:"三级分类得选一个吧?",
    			title:'标题得写吧？',
    			content:'写点东西吧',
    		}
    });

    /*上传图片*/
    $('#detail').diyUpload({
        url:'/releaseimg',
        success:function( data ) {
            console.info( data.message );
            var len=$("#img").find("li").length;
            var lis='<li> <input type="hidden" name="pic[]" value="'+data.url+'"> </li>';
            $("#img").append(lis);
        },
        error:function( err ) {
            console.info( err );
        }
    });
});
