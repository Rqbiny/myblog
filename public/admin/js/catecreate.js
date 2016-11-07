/**
 * redscarf
 */
$(function(){

    //当所属板块改变，查出它下层的父级分类
    $('#section').change(function(){
        //清除数据
        $("#parent").empty();
        $("#parent").append("<option>无</option>");
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


});
