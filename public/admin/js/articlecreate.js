/**
 * redscarf
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

    //当选中markdown编辑器
    $("input:radio[name='savetype']").change(function(){
        var ue="";
        if($(this).val() == 1){
            UE.delEditor('editer');
            $('#editer').remove();
            $('#container').append('<div style="padding-left:0" class="col-sm-10" id="editer"><textarea class="form-control" name="content" id="content" rows="10" required></textarea></div>');
            $("#preview").removeAttr('disabled');
        }else if($(this).val() == 2) {
            $('#editer textarea').remove();
            UE.getEditor('editer');
            $("#preview").prop('disabled','true');
        }
    });

	//获取markdown预览
	$('#preview').click(function(){
		//获取标题
		var title=$('#title').val();
		//获取markdown的内容
		var content=$('#content').val();
		//console.log($('#viewcontent'));
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
            });
            //阻止浏览器默认动作
            return false;
    		},
    		//编写验证规则，在真正执行ajax提交前验证
    		rules:{
    			parent:{
                    required:true
                },
				section:{
                     required:true
                 },
				category:{
                    required:true
                },
    			title:{
                    required:true,
                    rangelength:[3,20]
                },
                subheading:{
                    required:true,
                    rangelength:[3,20]
                },
    			content:{
                    required:true
                },
                tags:{
                    required:true
                },
    		},
    		messages:{
				parent:{
                     required:"分类得选一个吧？",
                },
				section:{
                    required:"二级分类得选一个吧？",
                },
				category:{
                    required:"三级分类得选一个吧?",
                },
    			title:{
                    required:'标题得写吧?',
                    rangelength: "标题长度应该为三到二十个字"
                },
                subheading:{
                    required:"写个副标题吧",
                    rangelength: "副标题长度应该为三到二十个字"
                },
    			content:{
                    required:'写点东西吧',
                },
                tags:{
                    required:'加个标签吧',
                },
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
