<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use Input;
use Cache;

class IndexController extends Controller
{
    /*
    *   主页
    */
    public function index()
    {
        return view('home.index');
    }

    /*
    *   ajax分页查询
    */
    public function ajaxindex()
    {
        //定义缓存的名字
        $cacheName='Home_ajax_index_'.Input::get('page');
        $cacheData=Cache::get($cacheName);
        if($cacheData){
            $article_new=$cacheData;
        }else{
            $article_new=DB::table('rqbin_article')->select('article_id','title','subheading','img','author','created_at')->orderBy('article_id','DESC')->paginate(12)->toArray();
            //将查询结果加入缓存
            Cache::tags('articleIndex','article')->add($cacheName, $article_new, 720);
        }
        return $article_new['data'];
    }

    /*
    *   主页热门文章
    */
    public function articleHot()
    {
        return view('home.index');
    }

    /*
    *   主页热门文章
    */
    public function ajaxArticleHot()
    {
        //定义缓存的名字
        $cacheName='Home_ajax_ArticleHot_'.Input::get('page');
        $cacheData=Cache::get($cacheName);
        if($cacheData){
            $article_list=$cacheData;
        }else{
            $article_list=DB::table('rqbin_article')->select('article_id','title','subheading','img','author','created_at')->orderBy('recommend','DESC')->paginate(12)->toArray();
            //将查询结果加入缓存
            Cache::tags('articleHot','article')->add($cacheName, $article_list, 720);
        }
        return $article_list['data'];
    }

    /*
    *   主页一级分类文章界面
    */
    public function articleSection($id)
    {
        return view('home.index');
    }

    /*
    *   主页一级分类文章
    */
    public function ajaxArticleSection($id)
    {
        //定义缓存的名字
        $cacheName='Home_ajax_ArticleSection_'.$id.'_'.Input::get('page');
        $cacheData=Cache::get($cacheName);
        if($cacheData){
            $article_list=$cacheData;
        }else{
            $article_list=DB::table('rqbin_article')->select('article_id','title','subheading','img','author','created_at')->where('section_id',$id)->orderBy('article_id','DESC')->paginate(12)->toArray();
            //将查询结果加入缓存
            Cache::tags('articleSection'.$id,'article')->add($cacheName, $article_list, 720);
        }
        return $article_list['data'];
    }
}
