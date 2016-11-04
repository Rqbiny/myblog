<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>文章发布</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="/admin/bootstrap/css/bootstrap.min.css">

    <!-- Theme style -->
    <link rel="stylesheet" href="/admin/dist/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
             folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="/admin/dist/css/skins/_all-skins.min.css">
    <link rel="stylesheet" href="/admin/css/diyUpload.css">
    <link rel="stylesheet" href="/admin/css/webuploader.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style>
        *{margin: 0;padding: 0;}
        .add,.minus,.addsup,.minusup{margin-top:4px;}
        /*************************
	      * 自定义validate插件的验证错误时的样式
	   ************************/
	   #myform label.error
        {
            color:Red;
            font-size:13px;
            margin-left:5px;
            padding-left:16px;
        }
        .modal-content h1{
            text-align: center;
        }
        .modal-content p{
            width:100%;
            margin: 0px;
            padding: 0px;
        }

        .modal-content .viewtitle{
            margin: auto;
            padding: 1px;
        }

        .modal-content .gal{
            margin: auto;
            padding: 30px;
        }
        .release{
            text-align: center;
            align-content: center;
            margin-bottom: 30px;
        }
    </style>
    @include('UEditor::head')
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
    @include('inc.admin.mainHead')
            <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        @include('inc.admin.sidebar')
                <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>文章发布</h1>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-body">
                            <?php
                                if(isset($mes)){
                                    echo "<div class='alert alert-info' role='alert'>$mes</div>";
                                };
                            ?>
                            <form action="/article" class="form-horizontal" method="post" id="myform">
                                <input type="hidden" name="author" value="{{Auth::user()['username']}}">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">文章分类</label>
                                    <div class="col-sm-10">
                                        <div class="row">
                                            <div class="col-xs-3">
                                                <select class="mainselect form-control" name="section" id="section" required>
                                                    <option value="">请选择</option>
                                                    <option value="1">运维</option>
                                                    <option value="2">开发</option>
                                                    <option value="3">安全</option>
                                                    <option value="4">产品</option>
                                                    <option value="5">创业</option>
                                                </select>
                                            </div>
                                            <div class="col-xs-3">
                                                <select class="midselect form-control" name="parent" id="parent" required>
                                                    <option value="">请选择</option>
                                                </select>
                                            </div>
                                            <div class="col-xs-3">
                                                <select class="midselect form-control" name="category" id="category" required>
                                                    <option value="">请选择</option>
                                                </select>
                                            </div>
                                        </div><!--end row-->
                                    </div><!--end col-sm-10-->
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" for="name">标题</label>
                                    <div class="col-sm-3">
                                        <input type="text" name="title" class="form-control" id="title" placeholder="标题15字以内" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" for="name">副标题</label>
                                    <div class="col-sm-3">
                                        <input type="text" name="subheading" class="form-control" id="subheading" placeholder="副标题20字以内" required>
                                    </div>
                                </div>
                                <ul class="form-group hidden" id="img">
                                </ul>
                                <div class="gal form-group">
                                    <label class="col-sm-2 control-label" for="name">封面</label>
                                    <div class="col-sm-3">
                                        <div id="detailbox">
                                            <div id="detail"></div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" for="name">标签</label>
                                    <div class="col-sm-6">
                                        <input type="text" name="tags" class="form-control" placeholder="文章的标签 多个标签以空格隔开" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" for="name">内容</label>

                                    <div class="col-sm-10" id="container">
                                        <div class="col-sm-3">
                                            MarkDown:
                                            <input type="radio" id="makedownedit" name="savetype" value="1" checked="checked">
                                        </div>
                                        <div class="col-sm-3">
                                            HTML:
                                            <input type="radio" id="htmledit" name="savetype" value="2">
                                        </div>
                                        <div style="padding-left:0" class="col-sm-10" id="editer">
                                            <textarea class="form-control" name="content" id="content" rows="10" required></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" for="name"></label>
                                    <div class="col-sm-3">
                                        <button id="preview" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myView"><span class="glyphicon glyphicon-eye-open"></span> Preview</button>
                                    </div>
                                </div>
                                <div class="release">
                                        <button type="submit" class="btn btn-success" id="add"><span class="glyphicon glyphicon-send"></span> 发布</button>
                                </div>
                            </form>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </section>
        <!-- /.content -->
    </div>

    <!-- markdown预览 -->
	<div class="modal fade" id="myView" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">MarkDown预览</h4>
                </div>
                <div class="viewtitle">
                    <h1 id="viewtitle"></h1>
                </div>
                <hr>
                <div class="gal form-group">
                    <p id="viewcontent">
                    </p>
                </div>
			</div>
		</div>
	</div>
    <!-- /.content-wrapper -->
    <input type="hidden" id="activeFlag" value="treearticle">
    @include('inc.admin.footer')
</div>
<!-- ./wrapper -->
<!-- Bootstrap 3.3.5 -->
<script src="/admin/bootstrap/js/bootstrap.min.js"></script>
<!-- AdminLTE App -->
<script src="/admin/dist/js/app.min.js"></script>
{{--引入jquery插件验证表单--}}
<script src="/admin/plugins/form/jquery.validate.min.js"></script>
{{--引入jquery插件ajax提交表单--}}
<script src="/admin/js/jquery.form.js"></script>
<script src="/admin/js/webuploader.html5only.min.js"></script>
<script src="/admin/js/diyUpload.js"></script>
<script src="/admin/js/articlecreate.js"></script>
</body>
</html>
