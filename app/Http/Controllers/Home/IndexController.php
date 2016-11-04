<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

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
        $article_new=DB::table('rqbin_article')->select('article_id','title','subheading','img','author','created_at')->orderBy('article_id','DESC')->paginate(12)->toArray();
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
        $article_list=DB::table('rqbin_article')->select('article_id','title','subheading','img','author','created_at')->orderBy('recommend','DESC')->paginate(12)->toArray();
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
        $article_list=DB::table('rqbin_article')->select('article_id','title','subheading','img','author','created_at')->where('section_id',$id)->orderBy('article_id','DESC')->paginate(12)->toArray();
        return $article_list['data'];
    }
}
