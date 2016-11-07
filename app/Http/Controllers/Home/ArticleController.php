<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use Input;
use Cache;

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
        //定义缓存的名字
        $cacheName='Home_ajax_ArticleCat_'.$id.'_'.Input::get('page');
        $cacheData=Cache::get($cacheName);
        if($cacheData){
            $article_list=$cacheData;
        }else{
            $article_list=DB::table('rqbin_article')->select('article_id','title','subheading','img','author','created_at')->where('parent_id',$id)->orderBy('article_id','DESC')->paginate(12)->toArray();
            //将查询结果加入缓存
            Cache::tags('articleCat'.$id,'article')->add($cacheName, $article_list, 720);
        }
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
        //定义缓存的名字
        $cacheName='Home_ajax_ArticleList_'.$id.'_'.Input::get('page');
        $cacheData=Cache::get($cacheName);
        if($cacheData){
            $article_list=$cacheData;
        }else{
            $article_list=DB::table('rqbin_article')->select('article_id','title','subheading','img','author','created_at')->where('cat_id',$id)->orderBy('article_id','DESC')->paginate(12)->toArray();
            //将查询结果加入缓存
            Cache::tags('articleList'.$id,'article')->add($cacheName, $article_list, 720);
        }
        return $article_list['data'];
    }

    /*
    *   文章内容查看
    */
    public function articleInfo($id)
    {
        //定义缓存的名字
        $cacheName='Home_articleInfo_'.$id;
        $cacheData=Cache::get($cacheName);
        if($cacheData){
            $article=$cacheData;
        }else{
            $article=DB::table('rqbin_article')->select('title','content','subheading','article_id','cat_id')->where('article_id',$id)->get();
            //将查询结果加入缓存
            Cache::tags('article')->add($cacheName, $article, 10080);
        }
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
        //定义缓存的名字
        $cacheName='Home_ajax_Article_'.$id.'_'.$cat_id;
        $cacheData=Cache::get($cacheName);
        if($cacheData){
            $article=$cacheData;
        }else{
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
            //将查询结果加入缓存
            Cache::tags('preNextArticle'.$cat_id,'article')->add($cacheName, $article, 10080);
        }
        return $article;
    }
}
