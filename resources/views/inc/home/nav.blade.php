<!-- 固定导航栏 -->
<nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">My Blog</a>
    </div>

    <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav">
         <li style="padding-left:40px; padding-right:40px;"><a href="/">首页</a></li>
          <li class="dropdown" style="padding-left:40px; padding-right:40px;">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">运维 <span class="caret"></span></a>
            <ul class="dropdown-menu">
                <!--  遍历数组  -->
            @foreach ($cat_result[1] as $cat)
                @foreach ($cat as $catinfo)
                    @foreach ($catinfo as $key => $cat_parent)
                        @if(!is_array($cat_parent))
                        <!-- <li role="separator" class="divider"></li> -->
                        <li><a href="/article/list/{{$key}}">{{$cat_parent}}</a></li>
                        @else
                            @foreach ($cat_parent as $keys => $cat_son)
                            <li class="dropdown-header"><a href="/article/list/{{$keys}}">{{$cat_son}}</a></li>
                            @endforeach
                        @endif
                    @endforeach
               @endforeach
            @endforeach
            </ul>
          </li>
          <li class="dropdown" style="padding-left:40px; padding-right:40px;">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">开发 <span class="caret"></span></a>
            <ul class="dropdown-menu">
                <!--  遍历数组  -->
            @foreach ($cat_result[2] as $cat)
                @foreach ($cat as $catinfo)
                    @foreach ($catinfo as $key => $cat_parent)
                        @if(!is_array($cat_parent))
                        <!-- <li role="separator" class="divider"></li> -->
                        <li><a href="/article/list/{{$key}}">{{$cat_parent}}</a></li>
                        @else
                            @foreach ($cat_parent as $keys => $cat_son)
                            <li class="dropdown-header"><a href="/article/list/{{$keys}}">{{$cat_son}}</a></li>
                            @endforeach
                        @endif
                    @endforeach
               @endforeach
            @endforeach
            </ul>
          </li>
        <li class="dropdown" style="padding-left:40px; padding-right:40px;">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">安全 <span class="caret"></span></a>
          <ul class="dropdown-menu">
              <!--  遍历数组  -->
          @foreach ($cat_result[3] as $cat)
              @foreach ($cat as $catinfo)
                  @foreach ($catinfo as $key => $cat_parent)
                      @if(!is_array($cat_parent))
                      <!-- <li role="separator" class="divider"></li> -->
                      <li><a href="/article/list/{{$key}}">{{$cat_parent}}</a></li>
                      @else
                          @foreach ($cat_parent as $keys => $cat_son)
                          <li class="dropdown-header"><a href="/article/list/{{$keys}}">{{$cat_son}}</a></li>
                          @endforeach
                      @endif
                  @endforeach
             @endforeach
          @endforeach
          </ul>
          <li style="padding-left:40px; padding-right:40px;"><a href="#">关于</a></li>
        </li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</nav>
