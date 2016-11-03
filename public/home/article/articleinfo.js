/**
 * Created by redscarf on 2016/9/18.
 */
$(function (){
    //得到ID
    var articleCat=$('#articleCat').val();
    $.get('/article/ajaxarticle/'+articleCat,function(data,status){
        //判断是否有前一篇
        if(data['preArticle']){
            $('#prelink').attr('href','/article/info/'+data['preArticle'].article_id);
            $('#preArticle').text("("+data['preArticle'].title+")←");
        }else{
            $('#prelink').attr('href','#');
            $('#preArticle').text("没有上一篇了←");
        }
        //判断是否有后一篇
        if(data['nextArticle']){
            $('#nextlink').attr('href','/article/info/'+data['nextArticle'].article_id);
            $('#nextArticle').text("→("+data['nextArticle'].title+")");
        }else{
            $('#nextlink').attr('href','#');
            $('#nextArticle').text("→没有下一篇了");
        }
    });
});
