<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

/*
*   前台文章模块的路由
*/
class ArticleController extends Controller
{
    /*
    *   文章分类列表查看界面
    */
    public function articleCat($id)
    {
        return view('home.article.list');
    }

    /*
    *   ajax文章列表查看
    */
    public function ajaxArticleCat($id)
    {
        $article_list=DB::table('rqbin_article')->select('article_id','title','subheading','img','author','created_at')->where('parent_id',$id)->orderBy('article_id','DESC')->paginate(12)->toArray();
        return $article_list['data'];
    }

    /*
    *   文章列表查看
    */
    public function articleList($id)
    {
        //只提供一个界面所有交互都通过AJAX
        return view('home.article.list');
    }

    /*
    *   ajax文章列表查看
    */
    public function ajaxArticleList($id)
    {
        $article_list=DB::table('rqbin_article')->select('article_id','title','subheading','img','author','created_at')->where('cat_id',$id)->orderBy('article_id','DESC')->paginate(12)->toArray();
        return $article_list['data'];
    }

    /*
    *   文章内容查看
    */
    public function articleInfo($id)
    {
        $article=DB::table('rqbin_article')->select('title','content','subheading','article_id','cat_id')->where('article_id',$id)->get();
        return view('home.article.info',compact("article"));
    }

    /*
    *   文章下一篇(当ajax失败时使用的方法)
    */
    public function nextArticle($id,$cat_id)
    {
        $article=DB::table('rqbin_article')->select('title','content','subheading','article_id','cat_id')->where('cat_id',$cat_id)->where('article_id','>',$id)->limit(1)->get();
        return view('home.article.info',compact("article"));
    }

    /*
    *   文章上一篇(当ajax失败时使用的方法)
    */
    public function preArticle($id,$cat_id)
    {
        $article=DB::table('rqbin_article')->select('title','content','subheading','article_id','cat_id')->where('cat_id',$cat_id)->where('article_id','<',$id)->orderBy('article_id','DESC')->limit(1)->get();
        return view('home.article.info',compact("article"));
    }

    /*
    *   文章ajax查询上下文章标题与ID
    */
    public function ajaxArticle($id,$cat_id)
    {
        //定义一个数组装结果
        $article=[];
        $preArticle=DB::table('rqbin_article')->select('title','article_id')->where('cat_id',$cat_id)->where('article_id','<',$id)->orderBy('article_id','DESC')->limit(1)->get();
        $nextArticle=DB::table('rqbin_article')->select('title','article_id')->where('cat_id',$cat_id)->where('article_id','>',$id)->limit(1)->get();
        //判断是否有前一篇
        if($preArticle){
            $article['preArticle']=$preArticle[0];
        }
        //判断是否有后一篇
        if($nextArticle){
            $article['nextArticle']=$nextArticle[0];
        }
        return $article;
    }
}
