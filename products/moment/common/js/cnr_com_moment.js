// JavaScript Document

var Moment = function () {
	"use strict";
	var self = this,
		$window = $(window);
	
	self.Agent = function () {
		var self = this;
		var ua = navigator.userAgent;
		
		self.msie = 9999;
		var ua2 = window.navigator.userAgent.toLowerCase();
		var isIE = (ua2.indexOf('msie') >= 0 || ua2.indexOf('trident') >= 0);
		if (isIE) {
			var array = /(msie|rv:?)\s?([\d\.]+)/.exec(ua2);
			self.msie = (array) ? array[2] : '';
		}
		console.log(self.msie);

		if (ua.indexOf("iPhone") != -1) self.sp = true;
		if (ua.indexOf("iPad") != -1) self.sp = true;
		if (ua.indexOf("iPod") != -1) self.sp = true;
		if (ua.indexOf("Android") != -1) self.sp = true;
	};
	self.Mq = function ($tgt) {
		var self = this;
		self.status = "pc";
		var dmy = $("<span>").css({position: "absolute", top: "-99999px"}).addClass("forsp").attr("id", "checkSp");
		$("body").append(dmy);
		if ($tgt == undefined) {
			$tgt = $(".mq").not("footer .bottomlogo img");
		}
		self.first = {pc:true,sp:true};
		
		self.check = function () {
			if ($(dmy).css("display") == "none") {
				self.view = "pc";
			} else {
				self.view = "sp";
			}
			if (self.status != self.view) {
				self.status = self.view;
				if (self.view == "sp") {
					if (self.first.sp) {
						$tgt.css({visibility: "hidden"});
					}
					$tgt.each(function () {
						var src = ($(this).attr("src")).replace("_pc.", "_sp.");
						$(this).attr("src", src);
						var $tgt = $(this);
						if (self.first.sp) {
							$("<img>").one("load", function () {
								$tgt.css({visibility: "visible"});
							}).attr("src", src);
						}
					});
					if (self.first.sp) {
						self.first.sp = false;
					}
				} else {
					if (self.first.pc) {
						$tgt.css({visibility: "hidden"});
					}
					$tgt.each(function () {
						var src = ($(this).attr("src")).replace("_sp.", "_pc.");
						$(this).attr("src", src);
						var $tgt = $(this);
						var ct = 1;
						if (self.first.pc) {
							$("<img>").one("load", function () {
								$tgt.css({visibility: "visible"});
							}).attr("src", src);
						}
					});
					if (self.first.pc) {
						self.first.pc = false;
					}
				}
			} else {
				$tgt.css({visibility: "visible"});
			}
		};
				
		self.check();
		
		$window.bind("resize", function () {
			self.check();
		});
	};
}

$(function () {
	"use strict";
	var $window = $(window);
	var scb = 0;
	var loaded = false;
	
	//footer
	new (new Moment()).Mq($("footer .bottomlogo img"));
	
	//#bottom_totop
	function totop() {
		var $tgt = ($("#ctsFootProdNav").length > 0) ? $("#ctsFootProdNav") : $("footer");
		if (loaded) {
			if (scb > $tgt.offset().top || $window.scrollTop()<162) {
				if (!$("#bottom_totop").hasClass("stop")) {
					$("#bottom_totop").addClass("stop")
				}
			} else if (scb <= $tgt.offset().top || $window.scrollTop()>162) {
				if ($("#bottom_totop").hasClass("stop")) {
					$("#bottom_totop").removeClass("stop")
				}
			}
		}
	}
	
	$window.bind("load", function () {
		loaded = true;
	}).bind("scroll resize", function () {
		scb = $window.scrollTop() + $window.height();
		totop();
	});
	
	//sns
	var agent = new (new Moment()).Agent();
	if (agent.sp != true) {
		$("#ctsSns a, a.popup").bind("click", function () {
			var left = (screen.width/2)-(600/2);
			var top = (screen.height/2)-(400/2);
			var newWin = window.open(this.href,"WindowName","width=600,height=400,resizable=yes,scrollbars=yes,top=" + top + ",left=" + left);
			newWin.focus();
			return false;
		});
	}
	
	//anchor
	$("#bottom_totop a, .anchor").click(function(){
		if(!$(this).hasClass("forpc") && !$(this).parent().parent().hasClass("location")){
			try {
				var href= $(this).attr("href");
				var target = $(href == "#" || href == "" ? 'html' : href);
				var position = Math.max(0,target.offset().top);
				var speed = 800+Math.abs($(window).scrollTop()-position)/3
				if($("#checkSp").css("display") != "none")speed = 500+Math.abs($(window).scrollTop()-position)/4
				$("html, body").stop().animate({scrollTop:position}, speed, $.bez([0.45, 0.01, 0.227, 1]));
				return false;
			} catch(e) {			
			}
		}
	})
	
	
	//menu
	$("header .menu, header .close").click(function(){
		$("header").toggleClass("open");
	})
})