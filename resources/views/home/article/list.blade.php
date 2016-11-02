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
<script type="text/javascript" src="/dist/files/js/js_two.js"></script>
  <script type="text/javascript">
  <!--//--><![CDATA[//><!--
  var _paq = _paq || [];(function(){var u=(("https:" == document.location.protocol) ? "" : "http://analytics.ninghao.net/");_paq.push(["setSiteId", "1"]);_paq.push(["setTrackerUrl", u+"piwik.php"]);_paq.push(["setDoNotTrack", 1]);_paq.push(["trackPageView"]);_paq.push(["setIgnoreClasses", ["no-tracking","colorbox"]]);_paq.push(["enableLinkTracking"]);var d=document,g=d.createElement("script"),s=d.getElementsByTagName("script")[0];g.type="text/javascript";g.defer=true;g.async=true;g.src=u+"piwik.js";s.parentNode.insertBefore(g,s);})();
  //--><!]]>
  </script>
  <script type="text/javascript" src="/dist/files/js/js_three.js"></script>
  <script type="text/javascript" src="/dist/files/js/js_four.js"></script>

<!--[if lt IE 9]>
  <script src="http://ninghao.net/sites/all/themes/ninghao/js/html5.js"></script>
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

<div id="mainbody">
  <div class="container">
    <div class="row">
      <div class="span12">
        <div class="maincontent" align="center">

            <ul class="thumbnails overlay basic">
            @foreach($article_list as $article)
                      <li class="span4 mix recommend unfinished" data-created="" data-updated="1469324048" data-weight="">
            <div class="thumbnail">
              <div class="content">
              <a href="/article/info/{{$article->article_id}}"><img typeof="foaf:Image" src="{{$article->img}}" width="673" height="300" alt="{{$article->title}}"/>  <div class="header">
                <h3 class="title">{{$article->title}}</h3>
                <p class="alias">{{$article->title}}</p>
              </div>
              </a>
              </div>
              <div class="meta">
                <span>{{date("Y-m-d",strtotime($article->created_at))}}</span>
                <span class="pull-right">{{$article->author}}</span>
              </div>
            </div>
            </li>
            @endforeach
            </ul>
                  <div class="pull-center" style="clear:both;align-content:center">
                      <td colspan="8" align="center">
                          <?php echo $article_list->render(); ?>
                      </td>
                  </div>



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
            }, 1000);
        }

        //  Don't let them visit the url, we'll scroll you there
        return true;
    });
</script>
</body>
</html>
