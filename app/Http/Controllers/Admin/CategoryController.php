<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use DB;

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
        return view('admin.category.index');
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
        //查出分类
        $datas=DB::table('rqbin_category')->select('cat_id','cat_name')->where('parent_id',0)->where('category',$id)->get();
        return $datas;
    }

    /*
    *   查出三级分类
    */
    public function cate($id)
    {
        //插入分类
        $datas=DB::table('rqbin_category')->select('cat_id','cat_name')->where('parent_id',$id)->get();
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
