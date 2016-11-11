<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Markdown;
use Input;
use DB;
use Cache;

/*
*   该控制器是文章管理
*/
class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //定义缓存的名字
        $cacheName='Admin_ArticleList_'.Input::get('page');
        $cacheData=Cache::get($cacheName);
        if($cacheData){
            $article_list=$cacheData;
        }else{
            $article_list=DB::table('rqbin_article')->select('article_id','title','subheading','content','author','created_at')->orderBy('article_id','DESC')->paginate(8);
            //将查询结果加入缓存
            Cache::tags('Admin_ArticleList','article')->add($cacheName, $article_list, 720);
        }
        return view('admin.article.index',compact("article_list"));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.article.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data=$request->all();
        //将文章内容转成makedown格式
        if($request->savetype == 1){
            $content=Markdown::parse($request->content);
        }elseif($request->savetype == 2){
            $content=$request->editorValue;
        }
        //将标签转码以便搜索
        $tags_match="";
        $tags_arr=explode(' ',strtolower($request->tags));
        if(!empty($tags_arr)){
            foreach ($tags_arr as $tag_arr) {
                $tags_match.=bin2hex($tag_arr)." ";
            }
        }
        DB::beginTransaction();
        //将发布内容插入数据库并获得该填数据的ID
        $article_id=DB::table('rqbin_article')->insertGetId(
            [
                'title'      =>  $request->title,
                'subheading' =>  $request->subheading,
                'content'    =>  $content,
                'tags'       =>  $request->tags,
                'tags_match' =>  $tags_match,
                'created_at' =>  date('Y-m-d H:i:s',time()),
                'author'     =>  $request->author,
                'section_id' =>  $request->section,
                'parent_id'  =>  $request->parent,
                'cat_id'     =>  $request->category,
                'img'        =>  $request->img,
            ]
        );

        //判断上一个数据表是否插入成功
        if($article_id){
            //深度搜索的中文分词字符串
            $article_match="";
            //对商品描述进行中文分词
            $seg=new \App\Segment\lib\Segment();
            $arr_key=$request->title.$request->subheading.$content;
            //$arr_key=str_replace(['(','（','）',')','；','“','”','，',',','、','"','。'],'',$arr_key);
            $res = $seg->get_keyword($arr_key);
            $res_arr=explode(' ',$res);
            foreach ($res_arr as $res_arrs) {
                //为索引表准备数据
                $article_match.=bin2hex($res_arrs)." ";
            }
            //分词搜索的插入
            DB::table('rqbin_search')->insert(
                [
                    'article_id'    => $article_id,
                    'article_match' => $article_match,
                ]
            );
        }else{
            //假如失败就回滚
            DB::rollback();
            return response()->json(['serverTime'=>time(),'ServerNo'=>8,'ResultData'=>['Message'=>'请重新发布文章']]);
        }
        //提交事务
        DB::commit();
        Cache::tags('articleSection'.$request->section, 'articleIndex','articleCat'.$request->category,'articleList'.$request->parent,'preNextArticle'.$request->category,'Admin_ArticleList')->flush();
        return response()->json(['serverTime'=>time(),'ServerNo'=>0,'ResultData'=>['Message'=>'文章发布成功']]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //判断内容是否是空
        if(!$request->editorValue){
            return response()->json(['serverTime'=>time(),'ServerNo'=>8,'ResultData'=>['Message'=>'文章修改失败,内容不能为空']]);
        }
        //进行更新
        $result=DB::table('rqbin_article')->where('article_id',$id)->update(
            [
                'title'      =>  $request->title,
                'subheading' =>  $request->subheading,
                'content'    =>  $request->editorValue,
            ]
        );
        //判断是否更新成功
        if($result){
            Cache::forget('Home_articleInfo_'.$id);
            return response()->json(['serverTime'=>time(),'ServerNo'=>0,'ResultData'=>['Message'=>'文章修改成功']]);
        }else{
            return response()->json(['serverTime'=>time(),'ServerNo'=>8,'ResultData'=>['Message'=>'文章修改失败']]);
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
        $result=DB::table('rqbin_article')->where('article_id',$id)->delete();
        DB::table('rqbin_search')->where('article_id',$id)->delete();
        //判断是否更新成功
        if($result){
            Cache::tags('Admin_ArticleList')->flush();
            Cache::forget('Home_articleInfo_'.$id);
            return '文章删除成功';
        }else{
            return '文章删除失败';
        }
    }

    /*
    *   MarkDown预览
    */
    public function preview() {
        return Markdown::parse(Input::get('content'));
    }
}
