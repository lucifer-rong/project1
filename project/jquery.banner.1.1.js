;(function($){
    "use strict";

 

    $.fn.banner = function(options){
        var {list,items,left,right,autoPlay,delayTime,moveTime,index} = options;

        list = list===false ? false : true;
        autoPlay = autoPlay===false ? false : true;
        delayTime = delayTime || 3000;
        moveTime = moveTime || 800;
        index = index || 0;



        let move = function (direct){
            items.eq(iPrev).css({
                left:0
            }).stop().animate({
                left:items.eq(0).width() * direct
            },moveTime).end().eq(index).css({
                left:-items.eq(0).width() * direct
            }).stop().animate({
                left:0
            },moveTime)

            if(list){
                $(".list").children().eq(iPrev).css({background:""}).end().eq(index).css({background:"red"});
            }

        }


        let iPrev = items.length-1;

        function rightEvent(){
            // B2-2.计算索引
            if(index == items.length-1){
                index = 0;
                iPrev = items.length-1
            }else{
                index++;
                iPrev = index-1;
            }

            move(-1)
        }
        function leftEvent(){

            if(index == 0){
                index = items.length-1;
                iPrev = 0
            }else{
                index--;
                iPrev = index + 1;
            }

            move(1)
        }
        
        if(left != undefined && left.length>0 && right != undefined && right.length>0){

            console.log("有左右按钮")

            left.click(leftEvent);
            right.click(rightEvent);
        }

        if(list){

            console.log("有list按钮")

            var str = "";
            for(var i=0;i<items.length;i++){
                str += `<li></li>`
            }
            this.append($("<ul class='list'>").html(str));

            $(".list").css({
                width:"100%",
                height:30,
                background:"rgba(200,200,200,0.5)",
                position:"absolute",
                left:0,bottom:0,
                margin:0,listStyle:"none",padding:0,
                display:"flex",
                cursor:"pointer"
            }).children().css({
                flex:1,
                borderLeft:"solid 1px #9c9c9c",
                borderRight:"solid 1px #9c9c9c",
                lineHeight:"30px",
                textAlign:"center"
            }).eq(index).css({
                background:"red"
            })


            let move = function(direct,iPrev,iNow){
                items.eq(iPrev).css({
                    left:0
                }).stop().animate({
                    left:-items.eq(0).width() * direct
                },moveTime).end().eq(iNow).css({
                    left:items.eq(0).width() * direct
                }).stop().animate({
                    left:0
                },moveTime)
            }


            $(".list").children("li").click(function(){

                if($(this).index() > index){
                    // console.log("left",index,$(this).index())

                    move(1,index,$(this).index())
                }
                if($(this).index() < index){
                    // console.log("right",index,$(this).index())

                    move(-1,index,$(this).index())
                }
                
                $(".list").children("li").eq(index).css({background:""}).end().eq($(this).index()).css({background:"red"})


                index = $(this).index();
            })
        }


        if(autoPlay){
            let timer;
            timer = setInterval(() => {
                // right.trigger("click")
                rightEvent()
            }, delayTime);


            this.hover(function(){
                clearInterval(timer);
            },function(){
                timer = setInterval(() => {
                    // right.trigger("click")
                    rightEvent()
                }, delayTime);
            })
        }
    }
})(jQuery);