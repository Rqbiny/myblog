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
        Route::any('/checklogin','admin\indexController@checklogin');
        //加中间件的路由组
        Route::group(['middleware' => 'LoginAuthen'], function () {
                //首页路由
            Route::get('/','admin\indexController@index');
        });
    });


//前台路由
Route::group(['domain' => 'www.rqbin.net'], function () {
    //主页路由
    Route::get('/','Home\indexController@index');
});

//验证码类,需要传入数字
Route::get('/captcha/{num}', 'CaptchaController@captcha');
