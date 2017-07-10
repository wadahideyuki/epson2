// JavaScript Document
$(function() {
/*============================
ページ内共通
============================*/
//画像のオーバー
	$("img.ovr").mouseover(function(){
			$(this).attr("src",$(this).attr("src").replace(/^(.+)(\.[a-z]+)$/, "$1_on$2"));
	}).mouseout(function(){
			$(this).attr("src",$(this).attr("src").replace(/^(.+)_on(\.[a-z]+)$/, "$1$2"));
	});

//画面幅の取得
var winW;
function getWinW(){
	winW = $(window).width();
	//console.log(winW);
}

/*============================
個別
============================*/
//ラインナップのPCとSPの切替
/*
$(window).bind("resize", function(){
	getWinW();
	return false;
});
*/

/*-- カテゴリーとメイン画像の自動切り替え --*/
//切替
var cnt = 0;
var cnt2 = 6;//画像の数-1
function mainChange(){
	if(cnt < cnt2){
		$("main .categoryBox li a").removeClass("on");
		$("main .categoryBox li").eq(cnt+1).children().addClass("on");

		//メイン画像
		$("main .visualBox li").eq(cnt).fadeOut(500);
		$("main .visualBox li").eq(cnt+1).fadeIn(500);
	
		//ラインナップ
		$("main .lineupBox ul").removeClass();
		$("main .lineupBox ul").addClass("activeCate" + (cnt+2));

		cnt ++;
	}else{
		cnt = 0;

		//カテゴリー
		$("main .categoryBox li a").removeClass("on");
		$("main .categoryBox li").eq(0).children().addClass("on");

		//メイン画像
		$("main .visualBox li").fadeOut(500);
		$("main .visualBox li").eq(0).fadeIn(500);
	
		//ラインナップ
		$("main .lineupBox ul").removeClass();
		$("main .lineupBox ul").addClass("activeCate1");
	}

	//おすすめのコンテンツ
	if(cnt > 0){
		$(".recoZone").show();
		$(".recoZone .ttl1 span, .recoZone .bnArea a").removeClass("show");
		$(".recoZone .ttl1 span.reco" + (cnt+1) + ", .recoZone .bnArea a.reco" + (cnt+1)).addClass("show");
	}else{
		$(".recoZone").hide();
	}
}//mainChange() End

//自動切替
function startSlide(){
	timerId = setInterval(function(){	
		mainChange();
	}, 3000);
}//startSlide()end
startSlide();


//カテゴリーボタン
$("main .categoryBox li a").click(function(){
	//自動切り替えの停止
	clearInterval(timerId);

	var No = $(this).parent().attr("class").replace("cateNo", "");

	//カテゴリー
	$("main .categoryBox li a").removeClass("on");
	$(this).addClass("on");
	
	//メイン画像
	$("main .visualBox li").fadeOut();
	$("main .visualBox li.visNo" + No).fadeIn();
	
	//ラインナップ
	$("main .lineupBox ul").removeClass();
	$("main .lineupBox ul").addClass("activeCate" + No);
	
	//おすすめのコンテンツ
	if(No > 1){
		$(".recoZone").show();
		$(".recoZone .ttl1 span, .recoZone .bnArea a").removeClass("show");
		$(".recoZone .ttl1 span.reco" + No + ", .recoZone .bnArea a.reco" + No).addClass("show");
	}else{
		$(".recoZone").hide();
	}
	return false;
});
/*-- /カテゴリーとメイン画像の自動切り替え --*/


//ラインナップのオーバー
$(".lineupOvr").mouseover(function(){
		$(this).find("img").attr("src",$(this).find("img").attr("src").replace(/^(.+)(\.[a-z]+)$/, "$1_on$2"));
}).mouseout(function(){
		$(this).find("img").attr("src",$(this).find("img").attr("src").replace(/^(.+)_on(\.[a-z]+)$/, "$1$2"));
});


//pickupのタブの切替
$(".pickupZone .tabs li a").click(function(){
	var kind = $(this).parent().attr("class").replace("tab", "");
	$(".pickupZone .tabs li a").removeClass("show");
	$(this).addClass("show");

	$(".pickupZone .conts ul").removeClass();
	$(".pickupZone .conts ul").addClass("pickup" + kind);
	
	return false;
});

//spのpickupのbtnMore
$(".pickupZone .btnMore a").click(function(){
	$(".pickupZone .conts").addClass("andMore");
	return false;
});



});//Fnc End