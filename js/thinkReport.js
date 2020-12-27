$(function(){
    //综合排名
    var comprScore = [{
        name: '综合排名',
        value: 0
    }]
    $("#comprSc").text("0");
    barChart($("#comprBarChart"), comprScore, false);

    //测评报告页面效果
    $('.letter-btn').click(function(){
        $("html").removeClass("unScroll");
        $('.letter-top').attr('src','thinkReport/on1.gif');
        setTimeout(function(){
            $('.examInfo').addClass('slideUp');
            $('.letter').addClass('slideDown');
            $('.content').addClass('show');
        }, 1300)
        setTimeout(function(){
            $('.letter').addClass('slideDown-hid');
        },1500)

    })
    $('.backCover').click(function(){
        $('.letter').removeClass('slideDown-hid');
        setTimeout(function(){
            $("html").addClass("unScroll");
            $('.letter-top').attr('src','thinkReport/on1.png');
            $('.content').removeClass('show');
            $('.examInfo').removeClass('slideUp');
            $('.letter').removeClass('slideDown slideDown-hid');
        },100)


    })

    //选项卡
    // tabSwiper();
    tabScroll();

    $('.slide1').click(function(){
        tabShow(".core")
    })
    $('.slide2').click(function(){
        tabShow(".coreBar")
    })

    $('.slide3').click(function(){
        tabShow(".test")
    })
    $('.slide4').click(function(){
        tabShow(".diff")
    })
    $('.slide5').click(function(){
        tabShow(".compEva")
    })
    $('.modal-close').click(function(){
        $("html").removeClass("unScroll");
        $('.modal').fadeOut();
    })

})
//条形图表
function barChart(dom, data, isShowName){
    dom.html("");
    var barInitHeight = 0.7,
        barAddHeight = 0.20,
        barCount = 10;

    var dataLen = data.length;
    for(var q = 0; q < dataLen; q ++){
        var item = $("<div class='charBox'>");
        //显示bar名字
        if(isShowName){
            var showName = $("<div class='barChart-name'>");
            showName.text(data[q].name);
            item.append(showName);
        }
        var barChart = $("<div class='barChart'>");

        for(var i = 0; i < barCount; i ++){
            var index = i + 1;
            var height = Number(barAddHeight * i) + barInitHeight;
            var newBar = $('<div class="bar bar' + index +'"></div>');
            newBar.css({
                "height":height + "rem",
            })
            barChart.append(newBar);
        }
        var num = parseInt(data[q].value / 10);
        if(data[q].value % 10 > 0) {
            num ++;
        }
        for(var j = 0; j < num; j ++){
            barChart.children(".bar"+(j+1)).addClass("barBgColor");
        }
        var eq;
        if(num == 0) {
            eq = 0;
        }else {
            eq = num-1;
        }
        var tipImg = $("<img class='tipImg' src='thinkReport/hg.png'>");
        tipImg.css({
            "display": "block",
            // "margin-top":0 - 5 - barWidth

        });
        barChart.children().eq(eq).css("position","relative").append(tipImg);
        var showText = $("<div class='showText'>");
        showText.html("<p>在已参与测试的同学中，你击败了 " +  data[q].value + "% 的同学</p>");


        item.append(barChart);
        item.append(showText);
        dom.append(item);

    }

}

function tabShow(tab){
    $("html").addClass("unScroll");
    $('.modal').fadeIn();
    $(tab).show().siblings().hide();
}
//卡片滑动
function tabSwiper(){
    var swiperBox = document.querySelector(".swiper-box");
    var oldY;
    var swiperBoxHeight = parseFloat($('.swiper-box').css("height"));
    // *0.21
    // console.log(swiperBoxHeight);
    swiperBox.addEventListener("touchstart",(e)=>{
        // e.preventDefault();
        //初始y
        oldY = e.targetTouches[0].pageY;


    })


    swiperBox.addEventListener("touchmove",(e)=>{
        // e.preventDefault();
        var long = e.targetTouches[0].pageY - oldY;
        oldY = e.targetTouches[0].pageY;
        var nowTop = parseFloat($(".swiper-box").css("marginTop"))
        var critical = swiperBoxHeight * (-0.21);
        // if((nowTop > swiperBoxHeight * (-0.05) &&  long > 15) || (nowTop > swiperBoxHeight * (-0.01) &&  long > 6)) {
        //     return
        // }

        if((nowTop >= -300 && nowTop <= 0 && nowTop > critical) || (nowTop <= 0 && long > 0) || (nowTop > 0 && long < 0)){
            $(".swiper-box").css("marginTop", nowTop + long + "px");
            var slideArr = getSranslate(long);
            var slideLen = slideArr.length;
            for(var j = 0; j < slideLen; j ++){
                //过快滑动产生的卡片顺序错乱问题
                if(j == 1){
                    // && slideArr[1].translateZ > slideArr[0].translateZ
                    //     console.log(slideArr[1].translateZ, slideArr[0].translateZ)
                    // break;
                }
                $("." + slideArr[j].name).css("transform", slideArr[j].translate)
            }
        }

    })

    function getSranslate(long){
        var slideArr = [];
        for(var i = 0; i < 5; i ++){
            var index = i+1;
            var transformStr = $(".slide" + index).css("transform");
            var transformArr = transformStr.substring(8).split(",")
            //transformArr.length == 6 表示 transform: translate3d(0,0,0);
            var translateY,
                translateZ;
            if(transformArr.length == 6){
                translateY = 0;
                translateZ = 0;

            }else{
                translateZ = Number(transformArr[14]);
                translateY = Number(transformArr[13]);
            }


            //    if(index == 1){
            //     var translate = "translate3d(0,0," + (translateZ + long * (0.5-index/10) * 5) + "px)" ;
            //    }else {
            //     var translate = "translate3d(0,0,0px)" ;
            //    }

            if(index == 1){
                // * (0.5-index/10) * (-.5)
                var translate = "translate3d(0," + (translateY + long * (-0.5)) +"px," + (translateZ + long * (0.5-index/10) * 2) + "px)" ;

            }else if(index == 2) {
                var translate = "translate3d(0," + (translateY + long * (0.5-index/10) * (-0.2)) +"px," + (translateZ + long * (0.5-index/10) * 2) + "px)" ;
            }else if(index == 3){
                var translate = "translate3d(0," + (translateY + long * (0.5-index/10) * (0.8)) +"px," + (translateZ + long * (0.5-index/10) * 2) + "px)" ;
            }else if(index == 4){
                var translate = "translate3d(0," + (translateY + long * (0.5-index/10) * (1)) +"px," + (translateZ + long * (0.5-index/10) * 2) + "px)" ;
            }else {
                var translate = "translate3d(0,0" + (translateZ + long * (0.5-index/10) * 5) + "px)" ;
            }
            var slideObj = {};
            slideObj.name = "slide" + index;
            slideObj.translateZ = translateZ;
            slideObj.translate = translate;
            slideArr.push(slideObj);

        }

        return slideArr;

    }

}
//用滚动代替卡片滑动
function tabScroll(){
    var imgHeight = parseFloat($(".slide1 img").css("height"));
    var htmlFontSize = parseFloat($("html").css("fontSize"));
    var imgOffset = imgHeight + htmlFontSize * (-10.6666);
    $(".swiper-box").scroll(function(e){
        var scrollTop = $(this).scrollTop();
        // console.log(scrollTop)

        for(var i = 0; i < 5; i ++){
            var index = i + 1;
            var transformStr = $(".slide" + index).css("transform");
            var transformArr = transformStr.substring(8).split(",");
            var translateZ;
            if(transformArr.length == 6){
                translateZ = 0;

            }else{
                translateZ = Number(transformArr[14]);
            }

            // console.log(translateZ);
            switch (index) {
                case 1:
                    $(".slide1").css("transform",  "translate3d(0," + (scrollTop)*0.1 +"px," + (-scrollTop)*1.8 + "px)");
                    break;
                case 2:
                    $(".slide2").css("transform", "translate3d(0," + 0 +"px," + (-scrollTop)*1 + "px)");
                    break;
                case 3:
                    $(".slide3").css("transform",  "translate3d(0," + 0 +"px," + (-scrollTop)*0.7 + "px)");
                    break;
                case 4:
                    $(".slide4").css("transform",  "translate3d(0," + 0 +"px," + (-scrollTop)*0.3 + "px)");
                    break;
                case 5:
                    $(".slide4").css("transform",  "translate3d(0," + 0 +"px," + (-scrollTop)*0.2 + "px)");
                    break;
            }

        }


        // if(scrollTop >= imgOffset){
            // $(this).scrollTop(imgOffset)
        // }

    })
}










