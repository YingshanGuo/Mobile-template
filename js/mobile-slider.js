function MobileSlide(arg_obj) {
    /*
    参数:
    el是jQuery选择器

    返回值:
    matrix.m41是x值 number
    matrix.m42是y值 number
    */
    function getTransform(el) {
        var style = window.getComputedStyle($(el).get(0));
        var matrix = new WebKitCSSMatrix(style.webkitTransform);
        return matrix;
    }

    function slideAnimate(x, y) {
        if (Math.abs(x) >= y) {
            $(".Slide").css("-webkit-transform", "translate3d(0,0,0)");
        } else {
            $(".Slide").css("-webkit-transform", "translate3d(" + x + "px,0,0)");
        }
    }

    function getSlideTimer(timeNum) {
        if (typeof (timeNum) == "undefined") {
            timeNum = 3000;
        }
        var slideTimer = setInterval(function () {
            var x = getTransform(".Slide").m41;
            x = x - ImgWidth;
            slideAnimate(x, endPosition);

        }, timeNum);
        return slideTimer;
    }


    function touchDragMe($element) {
        var gundongX = 0;
        var gundongY = 0;
        var d = document;
        var g = 'getElementById';
        var moveEle = $element;
        var stx = sty = etx = ety = curX = curY = 0;

        moveEle.on("touchstart", function (event) { //touchstart
            $element.removeClass(transitionName);
            clearInterval(slideTimer);
            var event = event.originalEvent;
            gundongX = 0;
            gundongY = 0;


            // 元素当前位置
            etx = parseInt(getT3d(moveEle, "x"));
            ety = parseInt(getT3d(moveEle, "y"));

            // 手指位置
            stx = event.touches[0].pageX;
            sty = event.touches[0].pageY;
        });

        moveEle.on("touchmove", function (event) {
            var event = event.originalEvent;
            // 防止拖动页面
            event.preventDefault();

            // 手指位置 减去 元素当前位置 就是 要移动的距离
            gundongX = event.touches[0].pageX - stx;
            gundongY = event.touches[0].pageY - sty;

            // 目标位置 就是 要移动的距离 加上 元素当前位置
            curX = gundongX + etx;
            curY = gundongY + ety;

            // 自由移动
            // moveEle.style.webkitTransform = 'translate3d(' + (curX) + 'px, ' + (curY) + 'px,0px)';
            // 只能移动Y轴方向
            // var realMoveEle = moveEle[0];
            moveEle[0].style.webkitTransform = 'translate3d(' + (curX) + 'px, ' + 0 + 'px,0px)';


        });
        moveEle.on("touchend", function (event) {
            // 手指接触屏幕的位置
            var oriX = etx;
            var oriY = ety;

            // 手指离开屏幕的位置
            etx = curX;
            ety = curY;

            var slidePosition = 0;
            for (var i = 0; i < ImgWidth_arr_length - 1; i++) {
                if (Math.abs(etx) > ImgWidth_arr[i]) {

                    if (oriX > etx) {
                        // 左滑
                        slidePosition = -ImgWidth_arr[i + 1];
                    } else {
                        // 右滑
                        slidePosition = -ImgWidth_arr[i];
                    }
                }

            }
            $element.addClass(transitionName);
            slideAnimate(slidePosition, endPosition);
            slideTimer = getSlideTimer(timerNum);
        });

        function getT3d(elem, ename) {
            var elem = elem[0];
            var str1 = elem.style.webkitTransform;
            if (str1 == "") return "0";
            str1 = str1.replace("translate3d(", "");
            str1 = str1.replace(")", "");
            var carr = str1.split(",");

            if (ename == "x") return carr[0];
            else if (ename == "y") return carr[1];
            else if (ename == "z") return carr[2];
            else return "";
        }
    }


    var transitionName = arg_obj["SlideTransition"] || "SlideTransition";
    var $SlideWrapper = arg_obj["SlideWrapper"] || $(".SlideWrapper");
    var $Slide = arg_obj["Slide"] || $(".Slide");
    var $Slide_img = arg_obj["Slide_img"] || $(".Slide_img");
    var timerNum = arg_obj["timerNum"] || 3000;

    $Slide_img.width($SlideWrapper.width());
    $Slide_img.height($SlideWrapper.height());

    var ImgWidth_arr_length = $Slide_img.length;
    var ImgWidth = $Slide_img.width();


    $Slide.width(ImgWidth * ImgWidth_arr_length);

    var SlideWidth = $Slide.width();
    // 轮播图终止位置
    var endPosition = SlideWidth - ImgWidth;

    var ImgWidth_arr = [];
    for (var i = 0; i < ImgWidth_arr_length; i++) {
        ImgWidth_arr.push(i * ImgWidth);
    }
    // console.log(ImgWidth_arr);

    var slideTimer = getSlideTimer(timerNum);

    touchDragMe($Slide, slideTimer);

    return slideTimer;
}
MobileSlide({
    "SlideTransition": "SlideTransition",
    "SlideWrapper": $(".SlideWrapper"),
    "Slide": $(".Slide"),
    "Slide_img": $(".Slide_img"),
    "timerNum": 3000
});