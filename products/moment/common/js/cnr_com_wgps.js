// JavaScript Document
$(function() {
//headerのラインアップボタン
$(".headNav.isNo1").hover(
	function(){
		$(".pcLineupMenu").show();
		$(this).addClass("on");
	},
	function(){
		$(".pcLineupMenu").hide();
		$(this).removeClass("on");
	}
);

//SPメニューの開閉
$(".spMenuBtn a").click(function(){
	if($(this).parent().hasClass("on")){
		$(this).parent().removeClass("on");
		$(".spMenu .in").animate({left:-650});
	}else{
		$(this).parent().addClass("on");
		$(".spMenu .in").animate({left:0});
	}
	return false;
});
//SPメニューのラインアップの開閉
$(".spMenuList1 .accordBtn a").click(function(){
	if($(this).parent().hasClass("on")){
		$(this).parent().removeClass("on");
		$(".spMenuList1 .accordion").slideUp();
	}else{
		$(this).parent().addClass("on");
		$(".spMenuList1 .accordion").slideDown();
	}
	return false;
});

//facebookのシェアボタンのリンクを書き換える
var thisPage = window.location.href;
console.log(thisPage);
$(".shareZone .shareBox .shareFace a").attr("href", "http://www.facebook.com/share.php?u=" + thisPage);

});//Fnc End