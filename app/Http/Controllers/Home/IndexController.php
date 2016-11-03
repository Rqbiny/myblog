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
        $article_new=DB::table('rqbin_article')->select('article_id','title','subheading','img','author','created_at')->orderBy('article_id','DESC')->paginate(12);
        return view('home.index',compact("article_new"));
    }

    /*
    *   ajax分页查询
    */
    public function ajaxindex()
    {
        $article_new=DB::table('rqbin_article')->select('article_id','title','subheading','img','author','created_at')->orderBy('article_id','DESC')->paginate(12)->toArray();
        return $article_new['data'];
    }
}
