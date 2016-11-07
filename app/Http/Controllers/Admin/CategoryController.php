<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;
use Cache;
use Input;

/*
*   该控制器是分类管理
*/
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //定义缓存的名字
        $cacheName='Admin_Category_'.Input::get('page');
        $cacheData=Cache::get($cacheName);
        if($cacheData){
            $category_list=$cacheData;
        }else{
            $category_list=DB::table('rqbin_category')->select('cat_id','cat_name','cat_desc','parent_id','category','is_show')->paginate(8);
            //将查询结果加入缓存
            Cache::tags('Admin_Category','Category')->add($cacheName, $category_list, 720);
        }
        return view('admin.category.index',compact("category_list"));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.category.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //插入分类
        DB::table('rqbin_category')->insert(
            [
                'cat_name' => $request->cat_name,
                'cat_desc' => $request->cat_desc,
                'sort_order' => $request->sort,
                'is_show' => $request->isshow,
                'category' => $request->section,
                'parent_id' => $request->parent?$request->parent:0,
            ]
        );
        Cache::tags('Category')->flush();
        return view("admin.category.create")->with('mes','添加成功！');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //定义缓存的名字
        $cacheName='Admin_Category_parent_'.$id;
        $cacheData=Cache::get($cacheName);
        if($cacheData){
            $datas=$cacheData;
        }else{
        //查出分类
            $datas=DB::table('rqbin_category')->select('cat_id','cat_name','parent_id')->where('parent_id',0)->where('category',$id)->get();
            //将查询结果加入缓存
            Cache::tags('Category')->add($cacheName, $datas, 720);
        }
        return $datas;
    }

    /*
    *   查出三级分类
    */
    public function cate($id)
    {
        //定义缓存的名字
        $cacheName='Admin_Category_cat_'.$id;
        $cacheData=Cache::get($cacheName);
        if($cacheData){
            $datas=$cacheData;
        }else{
        //插入分类
            $datas=DB::table('rqbin_category')->select('cat_id','cat_name')->where('parent_id',$id)->get();
            //将查询结果加入缓存
            Cache::tags('Category')->add($cacheName, $datas, 720);
        }
        return $datas;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //定义缓存的名字
        $cacheName='Admin_Category_cat_first_'.$id;
        $cacheData=Cache::get($cacheName);
        if($cacheData){
            $datas=$cacheData;
        }else{
            $datas=DB::table('rqbin_category')->where('cat_id',$id)->first();
            //将查询结果加入缓存
            Cache::tags('Category')->add($cacheName, $datas, 720);
        }
        return json_encode($datas);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //进行更新
        $result=DB::table('rqbin_category')->where('cat_id',$id)->update(
            [
                'cat_name'      =>  $request->catname,
                'cat_desc'      =>  $request->description,
                'sort_order'    =>  $request->sort,
                'parent_id'     =>  $request->parent,
                'is_show'       =>  $request->ishow,
            ]
        );
        //判断是否更新成功
        if($result){
            Cache::tags('Category')->flush();
            return response()->json(['serverTime'=>time(),'ServerNo'=>0,'ResultData'=>['Message'=>'分类修改成功']]);
        }else{
            return response()->json(['serverTime'=>time(),'ServerNo'=>8,'ResultData'=>['Message'=>'分类修改失败']]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result=DB::table('rqbin_category')->where('cat_id',$id)->delete();
        //判断是否更新成功
        if($result){
            Cache::tags('Category')->flush();
            return '分类删除成功';
        }else{
            return '分类删除失败';
        }
    }
}
