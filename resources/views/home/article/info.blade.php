@include('inc.home.head')
<!-- 导航栏 -->
@include('inc.home.nav')

    <div class="container">

      <div class="blog-header">
        <h1 class="blog-title">{{$article?$article[0]->title:"没有该篇文章了"}}</h1>
        <p class="lead blog-description">{{$article?$article[0]->subheading:""}}</p>
      </div>

      <div class="row">

        <div class="col-sm-8 blog-main">

          <div class="blog-post">
            {!! $article?$article[0]->content:"" !!}
          </div><!-- /.blog-post -->

          <nav>
            <ul class="pager">
              <input type="hidden" id="articleCat" value="{{$article?$article[0]->article_id:"1"}}/{{$article?$article[0]->cat_id:"22"}}">
              <li style="float:left"><a href="/article/pre/{{$article?$article[0]->article_id:"1"}}/{{$article?$article[0]->cat_id:"22"}}" id="prelink">←<span id="preArticle"></span></a></li>
              <li style="float:right"><a href="/article/next/{{$article?$article[0]->article_id:"1"}}/{{$article?$article[0]->cat_id:"22"}}" id="nextlink"><span id="nextArticle"></span>→</a></li>
            </ul>
          </nav>

        </div><!-- /.blog-main -->

        <div class="col-sm-3 col-sm-offset-1 blog-sidebar">
          <div class="sidebar-module sidebar-module-inset">
            <h4>About</h4>
            <p>Hello, I focus on Web Application Security and Web Application design！Welcome to the discussion of learning！</p>
          </div>
          <div class="sidebar-module">
            <h4>Tags</h4>
            <ol class="list-unstyled">
              <li><a href="#">Laravel</a></li>
              <li><a href="#">XSS</a></li>
              <li><a href="#">Mysql优化</a></li>
              <li><a href="#">SQL注入</a></li>
              <li><a href="#">负载均衡</a></li>
              <li><a href="#">JaveScript核心</a></li>
              <li><a href="#">网络钓鱼</a></li>
              <li><a href="#">社会工程学</a></li>
              <li><a href="#">闲聊</a></li>
            </ol>
          </div>
          <div class="sidebar-module">
            <h4>Elsewhere</h4>
            <ol class="list-unstyled">
              <li><a href="#">GitHub</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
            </ol>
          </div>
        </div><!-- /.blog-sidebar -->

      </div><!-- /.row -->

    </div><!-- /.container -->

@include('inc.home.foot')

<script type="text/javascript" src="/home/article/articleinfo.js"></script>
</body>
</html>
