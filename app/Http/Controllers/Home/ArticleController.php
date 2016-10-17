<?php

namespace App\Http\Controllers\Home;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

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
        return view('home.article.list');
    }

    /*
    *   文章内容查看
    */
    public function articleInfo($id)
    {
        return view('home.article.info');
    }
}
