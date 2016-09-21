<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>添加文章分类</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="/admin/bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="/admin/dist/dfonts/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="/admin/dist/dfonts/ionicons.min.css">
    <!-- DataTables -->
    <link rel="stylesheet" href="/admin/plugins/datatables/dataTables.bootstrap.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="/admin/dist/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
             folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="/admin/dist/css/skins/_all-skins.min.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
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
            <h1>添加文章分类</h1>
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
                            <form role="form" class="form-horizontal" action="/category" method="POST">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label" for="etype">所属板块</label>
                                    <div class="col-sm-5">
                                        <select name="section" class="form-control" id="section" required>
                                            <option>无</option>
                                            <option value="1">运维</option>
                                            <option value="2">开发</option>
                                            <option value="3">安全</option>
                                            <option value="4">产品</option>
                                            <option value="5">创业</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">分类名称</label>
                                    <div class="col-sm-5">
                                        <input type="text" name="cat_name" class="form-control" required />
                                    </div>
                                </div><!--end form-group-->
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">排名</label>
                                    <div class="col-sm-5">
                                        <input type="text" name="sort" class="form-control" placeholder="阿拉伯数字，小的在前" />
                                    </div>
                                </div><!--end form-group-->
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">分类描述</label>
                                    <div class="col-sm-5">
                                        <textarea name="cat_desc" class="form-control"  rows="3"></textarea>
                                    </div>
                                </div><!--end form-group-->
                                <div class="form-group">
                                    <label for="parent" class="col-sm-2 control-label">父级分类</label>
                                    <div class="col-sm-5">
                                        <select class="form-control" name="parent" id="parent">
                                            <option>无</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="parent" class="col-sm-2 control-label">是否显示</label>
                                    <div class="col-sm-5">
                                        <label class="radio-inline">
                                            <input type="radio" name="isshow" value="1" checked>显示
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="isshow" value="0">不显示
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-5">
                                        <button type="submit" class="btn btn-info">添加</button>
                                    </div>
                                </div><!--end form-group text-center-->
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
    <input type="hidden" id="activeFlag" value="treecate">
    <!-- /.content-wrapper -->
    @include('inc.admin.footer')
</div>
<!-- ./wrapper -->
<!-- Bootstrap 3.3.5 -->
<script src="/admin/bootstrap/js/bootstrap.min.js"></script>
<!-- FastClick -->
<script src="/admin/plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="/admin/dist/js/app.min.js"></script>
<script src="/admin/js/catecreate.js"></script>
</body>
</html>
