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
    *   文章列表查看
    */
    public function articleList($id)
    {
        $article_list=DB::table('rqbin_article')->select('article_id','title','img','author','created_at')->where('cat_id',$id)->orderBy('article_id','DESC')->paginate(9);
        return view('home.article.list',compact("article_list"));
    }

    /*
    *   文章内容查看
    */
    public function articleInfo($id)
    {
        $article=DB::table('rqbin_article')->select('title','content','article_id')->where('article_id',$id)->get();
        // var_dump($article);
        return view('home.article.info',compact("article"));
    }
}
