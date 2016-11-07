<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use DB;
use Cache;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //定义缓存的名字
        $cacheName='Home_index_category';
        $cacheData=Cache::get($cacheName);
        if($cacheData){
            $cat_result=$cacheData;
        }else{
            $data=DB::table('rqbin_category')->select('cat_id','cat_name','parent_id','category')->where('is_show',1)->get();
            $cat_list=NULL;
            $cat_arr=NULL;
            $cat_result=NULL;
            //将数据库查出来的数据进行分类
            foreach ($data as $data_arr) {
                $cat_list[$data_arr->category][]=['cat_id'=>$data_arr->cat_id,'cat_name'=>$data_arr->cat_name,'parent_id'=>$data_arr->parent_id];
            }
            //将分类数组遍历组合
            foreach ($cat_list as $key => $cat_list_arr) {
                foreach ($cat_list_arr as $cat_list_result) {
                    //如果是二级分类则装入一级分类数组
                    if($cat_list_result['parent_id'] != 0){
                        $cat_arr[$cat_list_result['parent_id']][][]=[$cat_list_result['cat_id']=>$cat_list_result['cat_name']];
                    }else{
                        //如果是一级分类直接装入数组
                        $cat_arr[$cat_list_result['cat_id']][]=[$cat_list_result['cat_id']=>$cat_list_result['cat_name']];
                    }
                }
                $cat_result[$key]=$cat_arr;
                $cat_arr=NULL;
            }
            // print_r($cat_result);
            // exit;
            //将查询结果加入缓存
            Cache::tags('Category','Index')->add($cacheName, $cat_result, 1000);
        }
        return view()->share('cat_result', $cat_result);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
