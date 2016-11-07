/**
 * Created by redscarf on 2016/9/18.
 */
$(function (){
    //判断当前的url
    var ajaxurl=window.location.pathname;
    //判断是否是根目录
    if(ajaxurl == '/'){
        ajaxurl='/index';
    }
    //不让他再没有加载完的情况下多次请求
    var state=true;
    //当页面加载的时候就ajax加载第一页
    $(document).ready(function(){
        //不让他再没有加载完的情况下多次请求
        state=false;
        loadMore();
    });

    $(window).scroll(function(){
        // 当滚动到最底部以上100像素时， 加载新内容
        if ($(document).height() - $(this).scrollTop() - $(this).height() < 300 && state){
            //不让他再没有加载完的情况下多次请求
            state=false;
            loadMore();

        }
    });

    function loadMore()
    {
        var lis="";
        var pagelenght=$('.pagelenght').length;
        if(pagelenght % 12 == 0){
            var page = Number(pagelenght/12)+1;
            $.ajax({
                   url : '/ajax'+ajaxurl+'?page='+page,
               type:'GET',
               success : function(data)
               {
                   //console.log(data);
                   for(var i=0;i<data.length;i++){
                       lis+='<li class="span4 mix recommend unfinished pagelenght" data-created="" data-weight="" style="display: inline-block;"><div class="thumbnail"><div class="content"><a href="/article/info/'+data[i].article_id+'"><img typeof="foaf:Image" src="'+data[i].img+'" width="673" height="300" alt="'+data[i].title+'"/>  <div class="header"><h3 class="title">'+data[i].title+'</h3><p class="alias">'+data[i].subheading+'</p></div></a></div><div class="meta"><span>'+data[i].created_at+'</span><span class="pull-right">'+data[i].author+'</span></div></div></li>';
                   }
                   //console.log(data);
                   $("#mainUl").append(lis);
                   //不让他再没有加载完的情况下多次请求
                   state=true;
                   console.log($(".pagelenght").length);
               }
           });
        }

    }
});
