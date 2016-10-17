<?php


/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

//后台路由
Route::group(['domain' => 'admin.rqbin.net'], function () {
        //验证码类,需要传入数字
        Route::get('/captcha/{num}', 'CaptchaController@captcha');
        //登录检查
        Route::any('/checklogin','Admin\IndexController@checklogin');
        //加中间件的路由组
        Route::group(['middleware' => 'LoginAuthen'], function () {
            //首页路由
            Route::get('/','Admin\IndexController@index');
            //后台登出
            Route::get('/logout','Admin\indexController@logout');

            /*
            *   后台分类模块
            */
            //后台分类查出三级分类
            Route::get('/category/cate/{num}','Admin\CategoryController@cate');
            //后台分类模块
            Route::resource('/category','Admin\CategoryController');

            /*
            *   后台文章模块
            */
            //后台文章MarkDown预览
            Route::post('/article/preview','Admin\ArticleController@preview');
            //后台文章模块
            Route::resource('/article','Admin\ArticleController');

        });
    });


//前台路由
Route::group(['domain' => 'www.rqbin.net'], function () {
    //主页路由
    Route::get('/','Home\IndexController@index');

    /*
    *   前台文章模块
    */
    //前台文章列表
    Route::get('/article/list/{num}','Home\ArticleController@articleList');
    //前台文章内容
    Route::get('/article/info/{num}','Home\ArticleController@articleInfo');

});

//验证码类,需要传入数字
Route::get('/captcha/{num}', 'CaptchaController@captcha');
