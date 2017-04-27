$(function () {
    var bgcolor = ['orange', 'skyblue', 'pink', 'purple']
    var $boxs = $('.box');
    var $gps_li = $('.gps li');
    var _index = 0;
    var flag = true;
    var oldindex = 0;
    var timer = null;

    //加载首页开场动画出现
    $boxs.eq(_index).addClass('current');
    $('section').eq(0).css({'background': bgcolor[_index]});
//////////////////////////////gps监听点击
    for (var i = 0; i < $gps_li.length; i++) {
        $gps_li.eq(i).on('click', function () {
            clearInterval(li_timer);
            _index = $(this).index();
            if (_index != 3) {
                $boxs.eq(3).addClass('currentback');
            } else {
                $boxs.eq(3).removeClass('currentback')
            }
            if (flag) {
                flag = false;
                $boxs.eq(oldindex).removeClass('current');
                //初始化
                li_index = 0;
                aLis.eq(li_index).addClass('cur').siblings().removeClass('cur');

                //gps跟着改变
                $gps_li.eq(_index).addClass('cur').siblings().removeClass('cur');

                //延时执行
                timer = setTimeout(function () {
                    scrollChange();
                    flag = true
                }, 2000)
            }
            oldindex = _index;
        })
    }
//////////////////////////////////////////监听滑轮滚动
    $(window).mousewheel(function (e, d) {
        if (flag) {
            flag = false;
            clearInterval(li_timer);
            $boxs.eq(_index).removeClass('current');
            li_index = 0;
            aLis.eq(li_index).addClass('cur').siblings().removeClass('cur');

            if (d) {
                _index -= d;
            }
            if (_index != 3) {
                $boxs.eq(3).addClass('currentback');
            }


            if (_index > 3) {//向下
                _index = 0;
            }
            if (_index < 0) {//向上
                _index = 3;
            }
            $gps_li.eq(_index).addClass('cur').siblings().removeClass('cur');
            setTimeout(function () {
                scrollChange();
                flag = true;
                clearTimeout(timer);
            }, 1500)
        }
    });


    function scrollChange() {

        //第四页动画
        if (_index == 3) {
            $('.inner_box_4').show(100);
            $boxs.eq(3).removeClass('currentback');
            setTimeout(function () {
                autoRun();
            }, 2000)
        }else{
            $('.inner_box_4').hide(1500);
        }
        $('section').eq(0).css({'background': bgcolor[_index]});
        $boxs.eq(_index).addClass('current').siblings().removeClass('current');
        // $gps_li.eq(_index).addClass('cur').siblings().removeClass('cur');
    }
////////////////////////////*inner_box_4*/
    var li_index = 0;
    var li_timer = null;
    var aLis = $('.inner_list');
    //鼠标移入
    for (var i = 0; i < aLis.length; i++) {
        aLis.eq(i).on('mouseenter', function () {
            li_index = $(this).index();
            aLis.eq(li_index).addClass('cur').siblings().removeClass('cur');
        });
    }
    //鼠标移出
    $('.inner_box_4 ul').on('mouseout', function () {
        autoRun();
    });
    //鼠标移入
    $('.inner_box_4 ul').on('mouseover', function () {
        clearInterval(li_timer);
    });

///////自动播放
    function autoRun() {
        li_timer = setInterval(function () {
            li_index++;
            li_index = li_index % 5;
            aLis.eq(li_index).addClass('cur').siblings().removeClass('cur')
        }, 2800)
    }
});


