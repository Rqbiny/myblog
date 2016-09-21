<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Redirect;
use Request;
use Hash;
use Auth;
use Session;
use DB;
use Illuminate\Pagination\Paginator;

class IndexController extends Controller
{
     /*
     *  后台首页
     */
     public function index()
     {
        return view('admin.index');
     }

    /*
    *   验证登陆
    */
    public function checklogin(Request $request)
    {
        $data=$request::all();
        //判断验证码是否正确
        if ($data['captchapic'] == Session::get('adminmilkcaptcha')) {
            //判断用户名密码是否正确
            if (Auth::attempt(['username' => $data['username'], 'password' => $data['password']])) {
                return Redirect::intended('/');
            } else {
                return Redirect::back()->withInput()->with('loginmes','账号或密码错误!');
            }
        }else{
            return Redirect::back()->withInput()->with('admincaptcha','请填写正确的验证码!');
        }
    }

    /*
    *   登出
    */
    public function logout()
    {
        //清除登录状态
        Auth::logout();
        return Redirect::intended('/');
    }
}
