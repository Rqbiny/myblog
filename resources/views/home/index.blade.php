@include('inc.home.head')
<!-- 轮播图CSS -->
<link href="/dist/css/style.css" rel="stylesheet">
<link type="text/css" rel="stylesheet" href="/dist/files/css/css_all.css" media="all" />
<link type="text/css" rel="stylesheet" href="/dist/files/css/css_print.css" media="print" />
<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
<script src="/dist/assets/js/ie-emulation-modes-warning.js"></script>
<!-- 主页面 -->
<script type="text/javascript" src="/dist/files/js/js_one.js"></script>
<!-- <script type="text/javascript" src="/dist/files/js/js_two.js"></script> -->
  <!-- <script type="text/javascript" src="/dist/files/js/js_three.js"></script> -->
  <script type="text/javascript" src="/dist/files/js/js_four.js"></script>
  <script type="text/javascript">
  <!--//--><![CDATA[//><!--
  //--><!]]>
  </script>
<!--[if lt IE 9]>
<![endif]-->
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/files/asset/apple-touch-icon/144x144.png">
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/files/asset/apple-touch-icon/114x114.png">
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="/files/asset/apple-touch-icon/72x72.png">
<link rel="apple-touch-icon-precomposed" href="/files/asset/apple-touch-icon/57x57.png">
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
  <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

<!-- 导航栏 -->
@include('inc.home.nav')

<!-- 简易轮播图 -->
<div class="banner">
    <ul style="margin-left:0px">
        <li style="background-image: url('/images/01.jpg');">
            <div class="inner">
                <a href="#download"><h1>The jQuery slider that just slides.</h1></a>
                <p>就是这个不到3kb的插件！没有奇特的特效或无用的标签。</p>
            </div>
        </li>

        <li style="background-image: url('/images/02.jpg');">
            <div class="inner">
                <h1>Fluid, flexible, fantastically minimal.</h1>
                <p>Use any HTML in your slides, extend with CSS. You have full control.</p>
            </div>
        </li>

        <li style="background-image: url('/images/03.jpg');">
            <div class="inner">
                <h1>开源</h1>
                <p>Unslider的所有源码都托管在GitHub上。</p>
            </div>
        </li>

        <li style="background-image: url('/images/02.jpg');">
            <div class="inner">
                <h1>Uh, that’s about it.</h1>
                <p>I just wanted to show you another slide.</p>
            </div>
        </li>
    </ul>
</div>

<div id="mainbody">
  <div class="container">
    <div class="row">
      <div class="span12">
        <div class="maincontent" align="center">
            <section class="tag-menu four clearfix">
                <ul class="menu nav">
                    <li class="first leaf"><a href="/" title="">最新文章</a></li>
                    <li class="leaf"><a href="/article/hot" title="">热门文章</a></li>
                    <li class="collapsed"><a href="/article/section/3" title="">安全相关</a></li>
                    <li class="last collapsed"><a href="#" title="">神兵利器</a></li>
                </ul>
            </section>

        <ul class="thumbnails overlay basic" id="mainUl">

        </ul>


                </div>
              </div>
            </div>
          </div>
        </div>
<!-- js代码 -->

@include('inc.home.foot')
<script type="text/javascript" src="/dist/unslider/js/unslider-min.js"></script>
<script type="text/javascript" src="/dist/unslider/js/jquery.event.move.js"></script>
<script type="text/javascript" src="/dist/unslider/js/jQuery.event.swipe.js"></script>
<script type="text/javascript" src="/home/waterfall.js"></script>
<script>
    if(window.chrome) {
        $('.banner li').css('background-size', '100% 100%');
    }

    $('.banner').unslider({
        arrows: true,
        fluid: true,
        dots: true
    });

    //  Find any element starting with a # in the URL
    //  And listen to any click events it fires
    $('a[href^="#"]').click(function() {
        //  Find the target element
        var target = $($(this).attr('href'));
        //  And get its position
        var pos = target.offset(); // fallback to scrolling to top || {left: 0, top: 0};

        //  jQuery will return false if there's no element
        //  and your code will throw errors if it tries to do .offset().left;
        if(pos) {
            //  Scroll the page
            $('html, body').animate({
                scrollTop: pos.top,
                scrollLeft: pos.left
            }, normal);
        }

        //  Don't let them visit the url, we'll scroll you there
        return true;
    });
</script>
</body>
</html>
