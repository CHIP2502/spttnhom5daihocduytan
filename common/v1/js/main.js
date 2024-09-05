(function() {
	$('.lazy').Lazy();
});
var player_height = $(".media-box").height() + $("#listChannelPlayer").height();
//$(".same_height").css("max-height",player_height);
//$("#lich_phat_song").css("max-height",player_height-200);
if($(window).width() < 769){
		$( ".news_top_1" ).insertAfter( $( ".tinnoibat .container > .row" ) );
		$(".news_top_1").show();
}
if(jQuery('.scrollbar-inner').length > 0) {
	    jQuery('.scrollbar-inner').scrollbar({
        "showArrows": true,
        "scrollx": "false",
        "scrolly": "advanced"
    });
}

$.each( $(".submenu"), function( key, value ) {
    if($(value).find('li').length == 0) $(value).remove();
  });
$.each( $(".menubar"), function( key, value ) {
    if($(value).find('li').length == 0) $(value).remove();
  });
if(jQuery('.submenu').length > 0 && $(window).width() >= 768) {
	//jQuery('.submenu').addClass('scrollbar-inner');
    //jQuery('.submenu').scrollbar();

	$(document).ready(function(){

	$.each( $(".cate_title_1 .submenu"), function( key, value ) {
		var obj = $(this);

		 var nav_width = obj.width()-40;
		 var item_count = obj.find('li').length;
		 var item_width = 0;
		$.each( obj.find('li'), function( key, value ) {
			item_width += $(this).width()+10;
		})

			 if ((item_width) > nav_width ){
			 obj.append('<li class="last"><div class="dropdown"></li>');
			 obj.find('.last .dropdown').append('<a class="dropdown-toggle" href="#" id="dropdownMenuButton'+key+'" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-bars"></i></a>');
			  obj.find('.last .dropdown').append('  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton'+key+'"></ul>');
			}
	  
			var item_count_width = 0;
			 for(var i = 0; i < item_count; i++) {
				item_count_width += $(obj.find('li')[i]).width()+10;
				 if (nav_width<item_count_width){
					 var obj1 = $(obj.find('li')[i]).clone();
					 $(obj.find('li')[i]).hide();
					obj.find('.dropdown-menu').append(obj1);

				}
			}
						  obj.css('overflow', 'unset')

	  });
	  $(".cate_F8E14A1971D63CBEE05382FC0367EED4").css('max-width', 'unset')
	  });
	
}

if($(window).width() < 768 ){
	
	jQuery('.cate_title_1 .submenu').addClass('dropdown-menu');
	jQuery('.cate_title_1 .submenu').attr('aria-labelledby','dropdown-menu');
	$( '<a class="dropdown-toggle" href="#" id="" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-chevron-down"></i></a>' ).insertBefore( ".cate_title_1  .submenu" );
}
if( $('.menubar').length > 0){

	jQuery('.cate_title_1 .menubar').addClass('dropdown-menu');
	jQuery('.cate_title_1 .menubar').attr('aria-labelledby','dropdown-menu');
	$( '<a class="dropdown-toggle" href="#" id="" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-bars"></i></a>' ).insertBefore( ".cate_title_1  .menubar" );
}
jQuery.fn.exists = function () {
	return this.length > 0;
};

$.each( $("#main-menu ul"), function( key, value ) {
    if($(value).find('li').length == 0) $(value).remove();
  });

  $("." + $("#cate_id").html()).addClass('active');
	var navString = $("." + $("#cate_id").html() + '>a').clone();
	$("#nav_menu").html('<div class="cate_title_1"><span class="bg01"><a href="'+navString.attr('href')+'" class="title color1">'+navString.text()+'</a></span><div class="clear"></div></div>');

  $.each( $("#main-menu >li"), function( key, value ) {
    if(key == 0) $(value).addClass('first')
  });

	if($('#main-menu').length > 0) {
		  $('#main-menu').smartmenus({
			subMenusSubOffsetX: 1,
			subMenusSubOffsetY: -8
		  });
	}


if($(".cate_child").length > 0 || $(".cate_child_multimedia").length > 0  || $(".box_detail_child").length > 0) {
	$.each( $(".cate_nav .submenu li"), function( key, value ) {
		var cateId = $(value).attr('class');
		var cateTitle = $(value).find('a').text();
		var cateUrl = $(value).find('a').attr('href');
			var strItem2 = '<div class="row30 multi_'+cateId+'">'+
				'<div class="cate_title_3"><a class="title color1" href="'+cateUrl+'">'+cateTitle+'</a></div>'+
					'<div class="row"><div class="first col-6"></div>'+
					'<div class="col-6"><div class="row second"></div></div></div>'+
					'<div class="row third"></div>';
			strItem2 +='</div>';
			$( ".cate_child_multimedia" ).append( strItem2 );
		loadCateChild(cateId,cateTitle,cateUrl, key);

	});
}

function loadCateChild(cateId,cateTitle,cateUrl, index) {
	  $.ajax({
		url:  '/service/api/article/list',
		jsonp:"jsonCallback",
		dataType: 'jsonp',
		data: {
			scUnitMapId: $("#site_id").html(),
			saArticleCateId: cateId,
			first: 0,
			pageSize: 8
		},
		success : function(object) {

			var strHtml = '';
			var strHtml1 = '';
			var strHtml2 = '';
			var strHtml3 = '';
			var strHtml4 = '';

			var strDetail11 = '';
			var strDetail12 = '';
			var strDetail21 = '';
			var strDetail22 = '';
			var obj = object.response;
				for (var i = 0; i < obj.length ; i++) {
					var avatar = "/file/common/v1/images/logo.png";
					if(obj[i].avatar != "") {
						avatar = '/file' + obj[i].avatar+ '?width=900&height=-&type=resize';
					}
					if(i == 0) {
						strHtml += '<a class="title2 '+obj[i].objectType+'" href="'+obj[i].pageUrl+'">'+obj[i].title+'</a>';
						strHtml += '<a class="avatar row5" href="'+obj[i].pageUrl+'">';
							strHtml += '<img src="'+avatar+'">';
						strHtml += '</a>';
						strHtml += '<div class="des">'+obj[i].lead+'</div>';
						strHtml += '<div class="date row10 color2">'+prettyDate(obj[i].publishDate)+'</div>';

						strHtml2 += '<div class="row20"><a class="avatar row5" href="'+obj[i].pageUrl+'">';
							strHtml2 += '<img src="'+avatar+'">';
						strHtml2 += '</a>';
						strHtml2 += '<a class="title2 '+obj[i].objectType+'" href="'+obj[i].pageUrl+'">'+obj[i].title+'</a></div>';
						
						strDetail11 +=
					'<div class="col-3">'+
						'<a href="' + obj[i].pageUrl + '" class="avatar ' + obj[i].objectType + ' row5"><img src="'+avatar+'?width=500&height=-&type=resize"></a>'+
					'</div>'+
					'<div class="col-6">'+
						'<div class="row10"><a href="' + obj[i].pageUrl  + '" class="title3 row5">' + obj[i].title + '</a></div>'+
						'<div class="des row10">' + obj[i].lead + '</div>'+
						'<div class="date color2">' + prettyDate(obj[i].publishDate) + '</div>'+
					'</div>';
				strDetail21 +=
					'<div class="item">'+
						'<a href="' +  obj[i].pageUrl + '" class="avatar ' + obj[i].objectType + ' row5"><img src="'+avatar+'?width=600&height=-&type=resize" alt="' + obj[i].title + '"></a>'+
						'<a href="' + obj[i].pageUrl  + '" class="title3 row5">' + obj[i].title + '</a>'+
					'</div>';

					}
					if( i< 4&& i > 0) {
						strHtml1 +=
							'<div class="item">'+
								'<div class="fleft40">'+
									'<a class="avatar row5" href="'+obj[i].pageUrl+'">'+
										  '<img src="'+avatar+'">'+
									 '</a>'+
								'</div>'+
								  '<div class="fright60">'+
									'<a href="'+obj[i].pageUrl+'" class="title2 row5">'+obj[i].title+'</a>'+

								'</div>'+
								 '<div class="clear"></div>'+
							'</div>';
					strDetail22 +=
							'<div class="item">'+
								'<a href="' +obj[i].pageUrl + '" class="title1">' + obj[i].title + '</a>'+
							'</div>';
					}
					if( i< 5&& i > 0) {

					strDetail12 +=
					'<div class="col-3">'+
						 '<a class="avatar row5' + obj[i].objectType + '" href="' +obj[i].pageUrl + '">'+
							'<img  src="'+avatar+'?width=500&height=-&type=resize"   alt="' + obj[i].title + '"/>'+
						 '</a>'+
						 '<a href="' + obj[i].pageUrl + '" class="title2">' + obj[i].title + '</a>'+
					'</div>';
					}
					if(i < 4) {
						strHtml3 += '<div class="col-6 row10">';
						strHtml3 += '<a class="avatar row5" href="'+obj[i].pageUrl+'">';
							strHtml3 += '<img src="'+avatar+'">';
						strHtml3 += '</a>';
						strHtml3 += '<a class="title '+obj[i].objectType+'" href="'+obj[i].pageUrl+'">'+obj[i].title+'</a>';
						strHtml3 += '</div>';

						strHtml4 += '<div class="col-3 row10">';
						strHtml4 += '<a class="avatar row5" href="'+obj[i].pageUrl+'">';
							strHtml4 += '<img src="'+avatar+'">';
						strHtml4 += '</a>';
						strHtml4 += '<a class="title '+obj[i].objectType+'" href="'+obj[i].pageUrl+'">'+obj[i].title+'</a>';
						strHtml4 += '</div>';
					}
			}

			var strItem = '<div class="row30">'+
				'<div class="cate_title_3"><a class="title color1" href="'+cateUrl+'">'+cateTitle+'</a></div><div class="row">'+
					'<div class="col-6">'+strHtml+'</div>'+
					'<div class="col-6 bd01"><div class="list-bd">'+strHtml1+'</div></div>';
			strItem +='</div></div>';


			var strItem3 = 
			'<div class="thoisu boxchild_detail1 row30">'+
				'<div class="cate_title_1 row10">'+
					'<a class="title fleft" href="'+cateUrl+'">'+cateTitle+'</a>'+
					'<div class="clear"></div>'+
				'</div>'+
				'<div class="row">'+
					strDetail11+
				'</div>'+
				'<div class="row">'+
					strDetail12+
				'</div>'+
			'</div>';

			var strItem4 = 

				'<div class="col-md-4">'+
					'<div class="thoisu row30">'+
						'<div class="cate_title_1 row20">'+
							'<a class="title fleft" href="'+cateUrl+'">'+cateTitle+'</a>'+
							'<div class="clear"></div>'+
						'</div>'+
						'<div class="list-bd">'+
							strDetail21+ strDetail22 + 

						'</div>'+
					'</div>'+
				'</div>';
			if(index == 0) {
				$( ".box_detail_child" ).append( strItem3 );
				$( ".multi_" + cateId + " .first" ).html( strHtml2 );
			$( ".multi_" + cateId + " .second" ).html( strHtml3 );
			} else {
				$( ".box_detail_child" ).append( strItem4 );
				$( ".multi_" + cateId + " .third" ).html( strHtml4 );
			}
			$( ".cate_child" ).append( strItem );

			//$(".des").trimLine(4);
		},
		error: function () {
		  console.log("fail");
		}
	  });
}

function loadCateLDT() {
	  $.ajax({
		url:  '/service/api/article/list',
		jsonp:"jsonCallback",
		dataType: 'jsonp',
		data: {
			scUnitMapId: $("#site_id").html(),
			saArticleCateId: 'e7837c0286273ce60186277deddc01ca',
			first: 0,
			pageSize: 10
		},
		success : function(object) {

			var strHtml = '';

			var obj = object.response;
				for (var i = 0; i < obj.length ; i++) {
					var avatar = "/file/common/v1/images/logo.png";
					if(obj[i].avatar != "") {
						avatar = '/file' + obj[i].avatar+ '?width=900&height=-&type=resize';
					}
				
						strHtml += '<div class="col-6 row15">';
						strHtml += '<a class="avatar row5" href="'+obj[i].pageUrl+'">';
							strHtml += '<img src="'+avatar+'">';
						strHtml += '</a>';
						strHtml += '<a class="title '+obj[i].objectType+'" href="'+obj[i].pageUrl+'">'+obj[i].title+'</a>';
						strHtml += '</div>';

			}

			$("#box_ldt").append( strHtml );

		},
		error: function () {
		  console.log("fail");
		}
	  });
}

if($("#box_ldt").length > 0) {
loadCateLDT();
}
try
{
	var now1 = new Date().format({
		format: 'DAY, DD/MM/YYYY, HH:MI'
	});
	$(".now").html(now1);
}
catch (e)
{
}




if($('.slider_news_top').length >0){
		var swiper = new Swiper('.slider_news_top', {
			slidesPerView: 1,
			spaceBetween: 20,
			slidesPerGroup: 1,
			preloadImages: false,
			lazyLoading: true,
		    lazy: {
				loadPrevNext: true,
		    },
        autoplay: {
          delay: 5000,
          disableOnInteraction: true,
        },
			loop: true,
			loopFillGroupWithBlank: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		on: {
			init: function () {
				var topp = parseInt($(".slider_news_top .avatar").css('padding-top'));
				$(".slider_news_top .swiper-pagination").css('top',topp +'px');
			},
		  }
		});
}

if($('.slider_video').length >0){
		if($(".mobile_home").length > 0) {

			var swiper = new Swiper('.slider_video', {
				slidesPerView: 2,
				spaceBetween: 10,
				slidesPerGroup: 1,
				preloadImages: false,
				lazyLoading: true,
				lazy: {
					loadPrevNext: true,
				},
			autoplay: {
			  delay: 5000,
			  disableOnInteraction: true,
			},
				loop: true,
				loopFillGroupWithBlank: true,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
			});
		} else {
			$(".swiper-scrollbar").remove();
			var swiper = new Swiper('.slider_video', {
				slidesPerView: 1,
				spaceBetween: 20,
				slidesPerGroup: 1,
				preloadImages: false,
				lazyLoading: true,
				lazy: {
					loadPrevNext: true,
				},
			autoplay: {
			  delay: 10000,
			  disableOnInteraction: true,
			},
				loop: true,
				loopFillGroupWithBlank: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			on: {
				init: function () {
					var topp = parseInt($(".slider_video .avatar").css('padding-top'));
					//$(".slider_video .swiper-pagination").css('top',topp +'px');
				},
			  }
			});
		}

}

if($('.slider_chuyende').length >0){
		var swiper = new Swiper('.slider_chuyende', {
			slidesPerView: 2,
			spaceBetween: 10,
			slidesPerGroup: 1,
			preloadImages: false,
			lazyLoading: true,
		    lazy: {
				loadPrevNext: true,
		    },
        autoplay: {
          delay: 10000,
          disableOnInteraction: true,
        },
			loop: false,
			loopFillGroupWithBlank: true,

			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        },
		on: {
			init: function () {

			},
		  }
		});
}

var swiper = new Swiper('.swiper-1', {
	slidesPerView: 1,
	spaceBetween: 10,
	slidesPerGroup: 1,
	preloadImages: false,
	lazyLoading: true,
	lazy: {
		loadPrevNext: true,
	},
	loop: false,
	loopFillGroupWithBlank: true,

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

on: {
	init: function () {
		var topp = parseInt($(".swiper-1 .avatar").css('padding-top')) - 20;
		$(".swiper-1 .swiper-pagination").css('top',topp +'px');
		$(".swiper-1 .swiper-button-prev").css('top',topp/2 +10 +'px');
		$(".swiper-1 .swiper-button-next").css('top',topp/2 +10+'px');
	},
  }
});



$(window).scroll(function() {
	if ($(window).scrollTop() >= 200) $(".scrolltop-button").fadeIn();
	else $(".scrolltop-button").fadeOut()
});
$('.scrolltop-button').click(function(){
	 $('html, body').animate({scrollTop : 0},800);
});

//getWeather(1586896);//ha giang
function getWeather(id) {
    $.ajax({
        url: "/service/api/crawler/weather?id="+id+"&jsonCallback=renderWeather",
	dataType: 'jsonp',
        success: function (data) {
			$("#weather_box").fadeIn();
			renderWeather(data);
        }, data: {
        }
    });
}

function renderWeather(obj) {
	var obj = obj.response.list;
	for (var i =0; i < obj.length; i++) {

		var o = obj[i];
		var name = o.name;
		var temp = String(o.main.temp).split(".")[0];
		var temperature = '<span class="temperature">'+ temp + '<sup>o</sup>C</span>';
		var info = o.weather[0].description+'<br/>';
		var winds = 'Sức gió: <b>'+String(o.wind.speed)+' m/s</b>';
		var feels_like = 'Nhiệt độ: <span><b>'+ temp + '<sup>o</sup>C </b></span>';
		var humidity = 'Độ ẩm: <span><b>'+ String(o.main.humidity).split(".")[0] +'%</b></span>';
		var pressure = 'Áp suất: <span><b>'+ String(o.main.pressure).split(".")[0] +' hPa</b></span>';
		var icon = '<img src="https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/'+o.weather[0].icon+'.png">';
			$('.weather_VN .desc').html(temperature);
			$('.weather_VN .temp').html(icon);        
			$('.weather_VN .info').html(info);		  
			$('.weather_VN .wind').html(winds); 
			$('.weather_VN .feels_like').html(feels_like);      
			$('.weather_VN .humidity').html(humidity);
			$('.weather_VN .pressure').html(pressure);
			
	}
}

//mostread

if($("#mostread").length > 0) {
	var saArticleCateId = $("#cate_id").html();
	var day = 5;
	if($("#parent_id").html() != 0) {
		saArticleCateId = $("#parent_id").html();
	}
	if(saArticleCateId == "F8E14A06210A3CA5E05382FC0367FB69" || saArticleCateId == "F1CD6431D0EF2ACAE053047A900A2EE2") {
		saArticleCateId = "";
	}
	if(saArticleCateId == "F8E14A7BBB323CDBE05382FC03677C07" || $("#parent_id").html() == "F8E14A7BBB323CDBE05382FC03677C07") {
		saArticleCateId = "F8E14A7BBB323CDBE05382FC03677C07";
		day = 60;
	}
	  $.ajax({
		url: '/service/api/article/getTopView',
		jsonp:"jsonCallback",
		dataType: 'jsonp',
		data: {
			scUnitMapId: 'e7837c02876411cd0187645a2551379f',
			day: day,
			saArticleCateId: saArticleCateId,

		},
		success : function(object) {

			var strHtml = '';
			var obj = object.response;
			if(obj.length > 0) {
				for (var i = 0; i < obj.length ; i++) {
					if(i < 5) { 
					var avatar = obj[i].avatar ? '/file' +obj[i].avatar: "/common/v1/images/logo_share.jpg";

					strHtml += 
					'<div class="item row10">' +
						'<a class="title" href="'+obj[i].pageUrl+'"><span class="num_most"><span>'+(i+1)+'.</span></span><span class="title_most">'+obj[i].title+'</span><div class="clear"></div></a>'+
						'<div class="clear"></div>'+
					"</div>";
					}
				}
			}

			if(strHtml !='') {
				$("#mostread").html(strHtml );
				//$(".container-fluid .mostread_box .item .title").trimLine(2);

				/*if( $('.sticky-content').length > 0) {
						$('.sticky-content').StickyDL({
						paddingTop : 170,
						heightRefElement: '.main-content-end-padding',
						optionalBottomFix: 40
					})
				}*/
			}
		},
		error: function () {
		  
		}
	  });
}


if($(".dropdown-menu-video").length > 0) {
	var objClass = ".dropdown-menu-video" + " ." + $("#cate_id").html();
	var objActive = $(objClass);
	objActive.addClass('active');
	var navTitle = objActive.html();
	var navhref = objActive.attr('href');
	if(navTitle) 	$(".subCateNav").html('<a href="'+navhref+'">'+navTitle+'</a>');
}

$(".viewDetailMobile ").click(function(){
	$('.scroll-lich-phat-song').toggle(500);
})

function getGold() {
	  $.ajax({
		url: 'https://vnexpress.net/microservice/thirdparty',
		jsonp:"callback",
		dataType: 'jsonp',
		data: {
		},
		success : function(object) {
		},
		error: function () {
		  
		}
	  });
}

function thirdpartyCallback(obj) {
	$("#giavang_detail").append('<div class="row"></div>');
	var data = obj.gia_vang;
	var html = '<div class="col-md-6"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td><strong>Giá vàng</strong></td><td>Mua</td><td>Bán</td></tr>';
	$.each(data, function(index, value) {

		if (typeof value.sell == "undefined" || value.sell == null || value.sell == "null" || value.sell ==
			0) value.sell = "";
		if (typeof value.buy == "undefined" || value.buy == null || value.buy == "null" || value.buy == 0) value.buy = ""; 
		html +=
		'<tr>'
			+'<td>'+value.name+'</td>'                                    
			+'<td>'+value.buy+'</td>'
			+'<td>'+value.sell+'</td>'
		+'</tr>';
	});
	html += "</tbody></table></div>";
	if (html) {
		$("#giavang_detail .row").append(html).hide().fadeIn();
	}

	var ngoaite = obj.chung_khoan_hnx;
	var html1 = '<div class="col-md-6"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td><strong>Ngoại tệ</strong></td><td>Mua</td><td>Bán</td></tr>';
		html1 +=
		'<tr>'
			+'<td>USD</td>'                                    
			+'<td>'+ngoaite.USD.buy+'</td>'
			+'<td>'+ngoaite.USD.sell+'</td>'
		+'</tr>';
		html1 +=
		'<tr>'
			+'<td>CNY</td>'                                    
			+'<td>'+ngoaite.CNY.buy+'</td>'
			+'<td>'+ngoaite.CNY.sell+'</td>'
		+'</tr>';
		html1 +=
		'<tr>'
			+'<td>CNY</td>'                                    
			+'<td>'+ngoaite.EUR.buy+'</td>'
			+'<td>'+ngoaite.EUR.sell+'</td>'
		+'</tr>';
		html1 +=
		'<tr>'
			+'<td>JPY</td>'                                    
			+'<td>'+ngoaite.JPY.buy+'</td>'
			+'<td>'+ngoaite.JPY.sell+'</td>'
		+'</tr>';
	html += "</tbody></table></div>";
$("#giavang_detail .row").append(html1);
}

if($("#giavang_detail").length > 0) {
	getGold();
}

$('body').on('click', '.common-info center', function() {

	return false;
});

$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 111) {
        $('#main-nav').addClass('fixed');
    } else {
        $('#main-nav').removeClass('fixed');
    }
});




 $(".btn-sharefb").off("click").click(function() {
                var n = window.location.href;
                window.open("http://facebook.com/sharer/sharer.php?u=" + encodeURIComponent(n), "", "left=50%,top=50%,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0")
            }), $(".btn-shareTwitter").off("click").click(function() {
                var n = $('meta[name="twitter:url"]').attr("content"),
                    t = $('meta[name="twitter:title"]').attr("content"),
                    i = "https://twitter.com/intent/tweet?original_referer=" + encodeURIComponent(n) + "&ref_src=twsrc%5Etfw&text=" + t + "&tw_p=tweetbutton&url=" + encodeURIComponent(n);
                window.open(i, "", "left=50%,top=50%,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0")
            })

if ($(".abs-action").length > 0 && $(".feedback_comment1").length > 0){
	try
	{
	e = $(".abs-action").offset().top, h = $("#main-nav").offset().top, $(window).scroll(function() {
		var n = $(window).scrollTop(),
			t = $(".feedback_comment1 ").offset().top - 350;
		n > h && n < t ? $(".abs-action").css("top", n - e + 150) : n <= e && $(".abs-action").css("top", 20)
	})
	}
	catch (e)
	{
	}

}


setTimeout(function(){$("#main-nav").css('overflow', 'unset') }, 2000);



if( $(".video_layout").length > 0) {
	var cateId = $("#cate_id").html();
	$("#video-cate-other").addClass("row");
	strVideo = 
		'<div class="row20 thoisu">'+
			'<div class="cate_title_1 row10"><a class="title fleft" href="#">Video mới nhất</a><div class="clear"></div></div>'+
			'<div class="row"><div class="viewmore-video"><button data-start="0" data-id="'+$("#cate_id").html()+'" type="button" class="video_'+$("#cate_id").html()+' btn btn-light"></button></div></div>'+
		'</div>';
	$("#video-cate-other").append(strVideo);
	loadDataVideo($("#cate_id").html(), 0, $(".video_"+$("#cate_id").html()));

	renderCateVideo();
}
function renderCateVideo() {
	var str = "";
	var stt = 0;
	$.each( $(".cate_nav .submenu a"), function( key, value ) {
		var cateId = $(this).parent().attr('class');
		var cateTitle =$(this).html();
		var cateUrl =$(this).attr('href');
		if(cateId != $("#cate_id").html()) {
			console.log(stt)
			if(stt < 2) {
				str = 
					'<div class="row20 thoisu">'+
						'<div class="cate_title_1 row10">'+
							'<a class="title" href="'+cateUrl+'">'+cateTitle+'</a>'+
							'<a class="viewmore_cate fright" href="'+cateUrl+'">Xem thêm ></a><div class="clear"></div>'+
						'</div>'+
						'<div class="row"><div class=""><button data-start="0" data-id="'+cateId+'" type="button" class="video_'+cateId+' btn btn-light"></button></div></div>'+
					'</div>';
				$("#video-cate-other").append(str);
				loadDataVideo(cateId, 0, $(".video_"+cateId), 1);
			} else {
			str = 
				'<div class="col-6"><div class="row20 thoisu">'+
					'<div class="cate_title_1 row10">'+
						'<a class="title" href="'+cateUrl+'">'+cateTitle+'</a>'+
						'<a class="viewmore_cate fright" href="'+cateUrl+'">Xem thêm ></a><div class="clear"></div>'+
					'</div>'+
					'<div class="row"><div class=""><button data-start="0" data-id="'+cateId+'" type="button" class="video_'+cateId+' btn btn-light"></button></div></div>'+
				'</div></div>';
				$("#video-cate-other").append(str);
				loadDataVideo(cateId, 0, $(".video_"+cateId), 2);
			}

			stt++;
		}

	});
}

$('body').on('click', '.viewmore-video button', function() {
	event.preventDefault(); // To prevent following the link (optional)
	$(this).addClass('disabled');
	var startItem = 0;
	var self = $(this);
	loadDataVideo($(this).attr('data-id'), $(this).attr('data-start'), self);
});

function loadDataVideo(cateId, start, self , type) {

	  $.ajax({
		url:  '/service/api/article/list',
		jsonp:"jsonCallback",
		dataType: 'jsonp',
		data: {
			scUnitMapId: $("#site_id").html(),
			saArticleCateId: cateId,
			first: start,
			pageSize: 8
		},
		success : function(object) {
				(self).attr('data-start', parseInt(start)+8);
				(self).removeClass('disabled');
			var strHtml = '';
			var strHtml1 = '';
			var strHtml2 = '';
			var strHtml3 = '';
			var obj = object.response;
				for (var i = 0; i < obj.length ; i++) {
					
				if(cateId == $("#cate_id").html()) {

						strHtml += '<div class="swiper-slide">';
							strHtml += '<a class="avatar row10" href="'+obj[i].pageUrl+'">';
								strHtml += '<img src="/file' + obj[i].avatar+ '?width=400&height=-&type=resize"><i class="fa fa-play-circle" aria-hidden="true"></i>';
							strHtml += '</a>';
							strHtml += '<a class="title1 '+obj[i].objectType+'" href="'+obj[i].pageUrl+'">'+obj[i].title+'</a>';
							strHtml += '<a href="'+obj[i].pageUrl+'" class="btn btn-status" tabindex="0" style="display: none"><i class="fas fa-headphones-alt"></i>Nghe</a>';
						strHtml += '</div>';


				} else if(type== 1) {
					if(i == 0) {
						strHtml1 += '<div class="row10">';
							strHtml1 += '<a class="avatar row10" href="'+obj[i].pageUrl+'">';
								strHtml1 += '<img src="/file' + obj[i].avatar+ '?width=400&height=-&type=resize"><i class="fa fa-play-circle" aria-hidden="true"></i>';
							strHtml1 += '</a>';
							strHtml1 += '<a class="title1 '+obj[i].objectType+'" href="'+obj[i].pageUrl+'">'+obj[i].title+'</a>';
						strHtml1 += '</div>';
					} else if(i < 5) {
						strHtml2 += '<div class="col-6 row10">';
							strHtml2 += '<a class="avatar row10" href="'+obj[i].pageUrl+'">';
								strHtml2 += '<img src="/file' + obj[i].avatar+ '?width=400&height=-&type=resize"><i class="fa fa-play-circle" aria-hidden="true"></i>';
							strHtml2 += '</a>';
							strHtml2 += '<a class="title1 '+obj[i].objectType+'" href="'+obj[i].pageUrl+'">'+obj[i].title+'</a>';
						strHtml2 += '</div>';
					}
				} else if(type== 2) {
					if(i == 0) {
						strHtml1 += '<div class="row10 col-12">';
							strHtml1 += '<a class="avatar row10" href="'+obj[i].pageUrl+'">';
								strHtml1 += '<img src="/file' + obj[i].avatar+ '?width=400&height=-&type=resize"><i class="fa fa-play-circle" aria-hidden="true"></i>';
							strHtml1 += '</a>';
							strHtml1 += '<a class="title1 '+obj[i].objectType+'" href="'+obj[i].pageUrl+'">'+obj[i].title+'</a>';
						strHtml1 += '</div>';
					} else if(i < 3) {
						strHtml2 += '<div class="col-6 row10">';
							strHtml2 += '<a class="avatar row10" href="'+obj[i].pageUrl+'">';
								strHtml2 += '<img src="/file' + obj[i].avatar+ '?width=400&height=-&type=resize"><i class="fa fa-play-circle" aria-hidden="true"></i>';
							strHtml2 += '</a>';
							strHtml2 += '<a class="title1 '+obj[i].objectType+'" href="'+obj[i].pageUrl+'">'+obj[i].title+'</a>';
						strHtml2 += '</div>';
					}
				}


			}

			if(cateId != $("#cate_id").html())  {
				 if(type== 1) {
					strHtml3 = 
					  '<div class="col-6">'+
							strHtml1+
						'</div>'+
					  '<div class="col-6">'+
						  '<div class="row">'+
								strHtml2+
							'</div>'+
						'</div>';
					$( strHtml3 ).insertBefore( (self).parent() );
				 }
				  if(type== 2) {
				strHtml3 = 
						strHtml1+
					  '<div class="row">'+
							strHtml2+
						'</div>';
				$( strHtml3 ).insertBefore( (self).parent() );
				 }
			} else {
				strHtml = 
				'<div class="swiper slider_video_cate">'+
				  '<div class="swiper-wrapper">'+
						strHtml+
					'</div>'+
				  '<div class="swiper-button-next"></div>'+
				  '<div class="swiper-button-prev"></div>'+
				'</div>';
				$( strHtml ).insertBefore( (self).parent() );

					var swiper = new Swiper('.slider_video_cate', {
						slidesPerView: 3,
						spaceBetween: 20,
						slidesPerGroup: 1,
						preloadImages: false,
						lazyLoading: true,
						lazy: {
							loadPrevNext: true,
						},
					autoplay: {
					  delay: 5000,
					  disableOnInteraction: true,
					},
						loop: true,
						loopFillGroupWithBlank: true,
						pagination: {
							el: '.swiper-pagination',
							clickable: true,
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},
					on: {
						init: function () {
							var topp = parseInt($(".slider_video_cate .avatar").css('padding-top')) - 20;
							$(".slider_video_cate .swiper-pagination").css('top',topp +'px');
							$(".slider_video_cate .swiper-button-prev").css('top',topp/2 +10 +'px');
							$(".slider_video_cate .swiper-button-next").css('top',topp/2 +10+'px');
						},
					  }
					});
			}
		},
		error: function () {
		  console.log("fail");
		}
	  });
}


try
{
$(".news_focus  .col-7 .des").trimLine(2);
$(".trimline2").trimLine(3);
$(".trimline3").trimLine(3);
$(".trimline4").trimLine(4);
}
catch (e)
{
}


if($(".slider_infographic").length > 0) {
	var swiper = new Swiper('.slider_infographic', {
		slidesPerView: "auto",
		spaceBetween: 20,
		slidesPerGroup: 1,
		preloadImages: false,
		lazyLoading: true,
		lazy: {
			loadPrevNext: true,
		},
	autoplay: {
	  delay: 50000,
	  disableOnInteraction: true,
	},
		loop: true,
		loopFillGroupWithBlank: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	on: {
		init: function () {
			var topp = parseInt($(".slider_video_cate .avatar").css('padding-top')) - 20;
			$(".slider_video_cate .swiper-pagination").css('top',topp +'px');
			$(".slider_video_cate .swiper-button-prev").css('top',topp/2 +10 +'px');
			$(".slider_video_cate .swiper-button-next").css('top',topp/2 +10+'px');
		},
	  }
	});

}

//render topic
var rootUrl = '/service'
function getTopicDetail(topicId,start) {
	$(".search_by_date").hide();
		  $.ajax({
		url: rootUrl + '/api/topic/article/list',
		jsonp:"jsonCallback",
		dataType: 'jsonp',
		data: {
			scUnitMapId: $("#site_id").html(),
			saTopicId: topicId,
			first: start,
			pageSize: 60
		},
		success : function(object) {

			var strHtml = '';
			var obj = object.response;
			if(obj.length > 0) {
				//$(".nav-inside").append('<ul class="submenu01"><li><a class="active" href="#">'+topicTitle+'</a></li></ul><div class="clear row15"></div>');
				$(".cate_title_1 .nav_F1CD642FF60A2AC6E053047A900AC9B3 .title").html(obj[0].topicTitle);
				$(".cate_title_1 .nav_F1CD642FF60A2AC6E053047A900AC9B3").show();
				for (var i = 0; i < obj.length ; i++) {
						renderTopic(i,obj[i].pageUrl, obj[i].title,"/file"+obj[i].avatar, "",topicId, start, prettyDate(obj[i].publis_date));

				}

			}
		},
		error: function () {
		  
		}
	  });
}

function getTopic(a, start) {
	$(".search_by_date").hide();
	  $.ajax({
		url: rootUrl + '/api/topic/list',
		jsonp:"jsonCallback",
		dataType: 'jsonp',
		data: {
			scUnitMapId: $("#site_id").html(),
			first: start,
			pageSize: 8
		},
		success : function(object) {

			var strHtml = '';
			var strHtml1 = '';
			var strHtmlMobile = '';
			var obj = object.response;
			if(obj.length > 0) {
				for (var i = 0; i < obj.length ; i++) {
					var avatar = obj[i].urlImage!="" ? "/file/topicAvatar/"+obj[i].urlImage + '?width=500&height=-&type=resize' : "/file/common/image/no-image.png";
					if(i <5) { 
					strHtml += 
					'<div class="col"><article class="story">'+
						'<figure class="story__thumb">'+
							'<a href="/su-kien/?topicId=' + obj[i].id + '&title='+obj[i].title+'" title="'+obj[i].title+'"> '+
								'<img src="/file/topicAvatar/'+obj[i].urlImage+'">'+
							'</a>'+
						'</figure>'+
						'<h3 class="story__heading"> <a href="/su-kien/?topicId=' + obj[i].id + '&title='+obj[i].title+'" title="'+obj[i].title+'"> '+obj[i].title+' </a> </h3>'+
						'<div class="des">'+obj[i].lead+' </div>'+
					'</article></div>';
					}
					if(i <8) { 

					strHtml1 += 
					'<div class="item">'+
						'<div class="fleft30">'+
							'<a href="/su-kien/?topicId=' + obj[i].id + '&title='+obj[i].title+'" class="avatar67"><img src="'+avatar+'" class="lazyload" ></a>'+
						'</div>'+
						'<div class="fleft70">'+
							'<a href="/su-kien/?topicId=' + obj[i].id + '&title='+obj[i].title+'" class="title1  ">'+obj[i].title+'</a>'+
						'</div>'+
						'<div class="clear"></div>'+
					'</div>';
					strHtmlMobile += 
					'<div class="swiper-slide"><article class="story">'+
						'<figure class="story__thumb">'+
							'<a href="/su-kien/?topicId=' + obj[i].id + '&title='+obj[i].title+'" title="'+obj[i].title+'"> '+
								'<img src="/file/topicAvatar/'+obj[i].urlImage+'">'+
							'</a>'+
						'</figure>'+
						'<h3 class="story__heading"> <a href="/su-kien/?topicId=' + obj[i].id + '&title='+obj[i].title+'" title="'+obj[i].title+'"> '+obj[i].title+' </a> </h3>'+
						'<div class="des">'+obj[i].lead+' </div>'+
					'</article></div>';
					}
					//cate 
					if ($("#cate_id").html() == 'e7837c02816d130b01817c06417e3709' && (topicId == null || topicId == "")) {
						renderTopic(i,"/su-kien/?topicId="+obj[i].id + "&title="+obj[i].title, obj[i].title, avatar, obj[i].description,'', start, prettyDate(obj[i].publis_date));
					}

					
				}
			} else {
				$(".event_loadmore").hide();
			}
			if($(".mobile_home").length > 0) {
				if(a) $(a).append(' <div class="swiper slider_event"><div class="swiper-wrapper">' +strHtmlMobile + '</div><div class="swiper-scrollbar"></div></div>');
			} else {
				if(a) $(a).append(strHtml);
			}

			$("#topic_box_article").html(strHtml1);
		var slider_event = new Swiper('.slider_event', {
			slidesPerView: 2,
			spaceBetween: 10,
			slidesPerGroup: 1,
			preloadImages: false,
			lazyLoading: true,
		    lazy: {
				loadPrevNext: true,
		    },
        autoplay: {
          delay: 5000,
          disableOnInteraction: true,
        },
			loop: true,
			loopFillGroupWithBlank: true,

			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        },
		on: {
			init: function () {

			},
		  }
		});
			//box list su kien dau tien 
			if($("#theo_dong_su_kien_box24h").length > 0) {
				getTopicDetailBox(obj[0].id);
			}


		},
		error: function () {
		  
		}
	  });
}


//loadmore topic
$('body').on('click', '.event_loadmore', function() {
	var start = parseInt($(this).attr('data-start'));
    getTopic("#topic_box",start );
	$(this).attr('data-start', start + 14);
});
$('body').on('click', '.event_loadmore_detail', function() {
	var start = parseInt($(this).attr('data-start'));
	getTopicDetail(topicId, start);
	$(this).attr('data-start', start + 14);
});

//render topic
function getTopicDetailBox(topicId) {
		  $.ajax({
		url: rootUrl + '/api/topic/article/list',
		jsonp:"jsonCallback",
		dataType: 'jsonp',
		data: {
			scUnitMapId: $("#site_id").html(),
			saTopicId: topicId,
			first: 0,
			pageSize: 200
		},
		success : function(object) {

			var strHtml1 = '';
			var strHtml2 = '';
			var obj = object.response;
			if(obj.length > 0) {
				for (var i = 0; i < obj.length ; i++) {
					//console.log(obj)
					var avatar = obj[i].avatar!="" ? "/file/"+obj[i].avatar + '?width=500&height=-&type=resize' : "/file/common/image/no-image.png";
					if(i == 0) {
						strHtml1 += 
								'<div class="row">'+
									'<a href="' + obj[i].pageUrl + '" class="avatar row5"><img class="lazy" src="'+avatar+'"></a>'+
								'</div>'+
								'<div class="row10"><a class="title02 " href="' + obj[i].pageUrl + '" title="'+obj[i].title+'">'+obj[i].title+'</a></div>';
						
					}else if(i < 3) {
						strHtml2 += 
							'<div class="col-xs-6">'+
								'<a href="' + obj[i].pageUrl + '" class="avatar row5"><img class="lazy" src="'+avatar+'"></a>'+
								'<div class="row10"><a class="" href="' + obj[i].pageUrl + '" title="">'+obj[i].title+' <i class="fa fa-video icon_type" aria-hidden="true"></i></a></div>'+
							'</div>';
						

					}
				}
				$("#theo_dong_su_kien_box24h .item_top").html(strHtml1);
				$("#theo_dong_su_kien_box24h .item_second").html(strHtml2);

			}
		},
		error: function () {
		  
		}
	  });
}

function renderTopic(i, url, title, avatar,des,topicId, start, date) {

			var strHtml1 = '';
			var strHtml2 = '';
			var strHtml3 = '';
			var strM = '';

		if( i==0 && start == 0) {

			strHtml1 +=
			'<div class="row">'+
				'<div class="col-6"><a href="'+url+'" class="avatar row5"><img src="'+avatar+'"></a></div>'+
				'<div class="col-6">'+
					'<a href="'+url+'" class="title4">'+title+'</a>'+
				'</div>'+
			'</div>';

			$(".event_1").html(strHtml1);
			$(".mobile_cate ").append(strHtml1);
		}   else {
			strHtml3 = 

				'<div class="item row15"><div class="row">'+
					'<div class="col-4">'+
						'<a class="avatar row5" href="'+url+'">'+
							'<img src="'+avatar+'">'+
						'</a>'+
					'</div>'+
					'<div class="col-8">'+
						'<a class="title3" href="'+url+'">'+title+'</a>'+
						'<div class="des" >'+des+'</div>'+
					'</div>'+
				'</div></div>';


			$("#cate-content .listnews ").append(strHtml3);
		}
		$("#pagination-container").hide();

		//in mobile 

		strM = 
				'<div class="row20">'+
					'<a class="avatar row5" href="'+url+'">'+
						'<img src="'+avatar+'">'+
					'</a>'+
					'<div class="date" >'+date+'</div>'+

					'<a class="title2" href="'+url+'">'+title+'</a>'+
				'</div>';

				$(".list_mobile").append(strM);

}

var topicId = getUrlParam('topicId');
var topicTitle = "";
//console.log($("#cate_id").html() == 'e7837c02816d130b01817c06417e3709' )
if($("#topic_box").length > 0 || $("#topic_box_article").length > 0 || $("#theo_dong_su_kien_box24h").length > 0 || ($("#cate_id").html() == 'e7837c02816d130b01817c06417e3709' && (topicId == null || topicId == ""))) {
	getTopic("#topic_box",0 );
	$("#topic_box_article #loadmore").html('<button type="button" class="btn btn-warning event_loadmore" styleclass="col-md-6" data-start="14">Xem thêm</button>');
	$("#topic_box #loadmore").html('<button type="button" class="btn btn-warning event_loadmore" styleclass="col-md-6" data-start="14">Xem thêm</button>');
}

if(topicId != null && topicId != ""){
	getTopicDetail(topicId, 0);
	//$(".cate_title_1 .title").html(topicTitle);
	$("#loadmore").html('<button type="button" class="btn btn-warning event_loadmore_detail" styleclass="col-md-6" data-start="14">Xem thêm</button>');
}


	function PrintElem()
		{
			var mywindow = window.open('', 'PRINT', 'height=600,width=800');

			mywindow.document.write('<html><head><style>img{max-width: 100%;}</style><title>' + $("h1.head_title").html() + '</title>');
			mywindow.document.write('</head><body >');
			   mywindow.document.write('<button id="print" onclick="window.print();" >Print</button>');
			mywindow.document.write('<h1>' + $("h1.head_title").html() + '</h1>');
			mywindow.document.write($(".td-post-content").html());
			mywindow.document.write('<p>Bản quyền thuộc về Báo Thái Nguyên.</p><button id="print" onclick="window.print();" >Print</button>');
			mywindow.document.write('</body></html>');

			mywindow.document.close(); // necessary for IE >= 10
			mywindow.focus(); // necessary for IE >= 10*/

			//mywindow.print();
			//mywindow.close();

			return true;
		}


	//box doc nhieu
/*$(window).scroll(function() {
	if($(".mostread_box ").length > 0 && $("#article_id").html() != "") {
		if($(window).scrollTop() > $(".wrap_scroll").offset().top && $(window).scrollTop() <  $(".footer ").offset().top-$(".mostread_box ").height()- 100) {
			$(".mostread_box ").addClass("fixtop1");
			$(".mostread_box ").css('top', $(window).scrollTop()-100)
		} else {
			$(".mostread_box ").removeClass("fixtop1");
			$(".mostread_box ").css('top', 0)
		}
	}
});*/




$(".icon-feedback").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(".feedback_comment1").offset().top
    }, 500);
});

if($("#article_id").html() != "") {
	$(".content-detail img").wrap( "<div class='new'></div>" );
$.each( $(".content-detail table.image"), function( key, value ) {
	var img = $(this).find('img');
	var des = $(this).find('.desc').html();
	//img.wrap( '<a class="example-image-link" href="'+img.attr('src')+'" data-lightbox="slide-1" data-title="'+des+'"></a>' );
});
	/*head.load(
		"/common/plugin/lightbox/js/lightbox.js", 
		"/common/plugin/lightbox/css/lightbox.css", 
		function() {
    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true
    })
		});*/
}

$(".main-menu-btn").click(function() {
    $("body").toggleClass( "showmenu" )
});

$( "#content .new" ).next().css( "font-weight", "bold" );

if($("#article_id").html() != "") {
	$("body").addClass('detail_layout');
}

$.each( $("td.desc"), function( key, value ) {
	if($(this).html() == "&nbsp;") {
		$(this).hide();
	}
});


//tinh maxheiht newstop
if($(".sameheight").length > 0) {
	jQuery('.sameheightscroll').addClass('scrollbar-inner');
    jQuery('.sameheightscroll').scrollbar();
	 var maxheight = $(".colmaxheight").height();
	$(".sameheight").css('max-height', maxheight);
	$(".sameheight1").css('height', maxheight-32);

}

$('.mobile_icon').click(function(){
	 var togggm = Cookies.get('mobile');
	 if(togggm == 1) {
		 Cookies.set('mobile', 0);
	 } else {
		 Cookies.set('mobile', 1);
	 }
	 window.location.reload();
});

		$('.content-detail img').each(function(index){
			if($(this).attr('src').indexOf('/dataimages') == 0) {
			$(this).attr('src', $(this).attr('src').replace('/dataimages', '/file/e7837c02876411cd0187645a2551379f/dataimages'))

			}
		})

$( "td.desc" ).each(function( index ) {

	if($(this).html() == '&nbsp;') $(this).hide();
});
$( "p" ).each(function( index ) {
	//if($(this).html() == '&nbsp;') $(this).hide();
});


$(".social").append('<li><a class="gg-news" href="https://news.google.com/publications/CAAqBwgKMNWL0QswlKfoAw?hl=vi&gl=VN&ceid=VN:vi" target="_blank"><span>Báo thể thao trên</span><img src="https://baodongnai.com.vn/common/v1/images/gg_new.svg" alt="Google News" style="width: 100px"></a></li>')

$( "td.desc" ).each(function( index ) {
	if($(this).html() == '&nbsp;') $(this).hide();
});

$(".content-detail .related").prepend( "<h3>Tin liên quan</h3>" );

//add quangcao
	$(document).ready(function() {
	    $('.td-post-content p').each(function() {
	        if ($(this).text().trim() === '')
	            $(this).remove()
	    });
	    if ($("#article_id").html() != "") {
			$( '<div data-type="_mgwidget" data-widget-id="1632591"></div> ').insertAfter( ".header_tool" );
			$( '<div data-type="_mgwidget" data-widget-id="1632589"></div>').insertAfter( ".box_tag" );

			var objP = $(".td-post-content").children("p");
	            var pos = checkTypeElement(4);
	            $('<div data-type="_mgwidget" data-widget-id="1632590"></div>').insertBefore($(objP[pos]));

				(function(w,q){w[q]=w[q]||[];w[q].push(["_mgc.load"])})(window,"_mgq");
	    }
	});

	function checkTypeElement(p) {
	    var objAlll = $(".td-post-content").children();
	    var objP = $(".td-post-content").children("p");
	    var prObj = $(objP[p]);
	    var e_prev_p = prObj.prev().is("p");
	    if (prObj.children('strong').length > 0) {
	        e_prev_p = !1
	    }
	    if (!e_prev_p) {
	        p++
	    }
	    return p
	}

//show poll
$.each( $(".poll_box") , function( key, value ) {
	showPoll($(this).attr('data-poll'), this);
});

if($(".poll_box").length > 0) {
	var strResult = 

						'<div id="pollModal" class="modal fade" role="dialog">'+
						  '<div class="modal-dialog modal-lg">'+
							'<div class="modal-content">'+
								'<div class="modal-header">'+
									'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
									'<h4 class="modal-title">Kết quả</h4>'+
								'</div>'+
								'<div class="modal-body">'+
									'<table style="width: 100%">'+
										'<tr>'+
											'<td colspan="4" class="th"><h3 class="poll_result_description row10"><strong>POLL_DESCRIPTION</strong></h3></td>'+
										'</tr>'+
										'<tbody id="poll_result_items">'+
										'</tbody>'+

									'</table>'+
								'</div>'+
								'<div class="modal-footer">'+
									'<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>'+
								'</div>'+
							'</div>'+
						  '</div>'+
						'</div>';
	$("body").append(strResult);
}

function showPoll(id, self, showResult) {
	$.ajax({
		url: rootUrl +'/api/pollTable/getInfor',
		jsonp:"jsonCallback",
		dataType: 'jsonp',
		data: {
			unitWorkingId: $("#site_id").html(),
			saPollTableId: id
		},
		success : function(object) {
			var obj = object.response.listItem;
			var pollInfo = object.response.pollInfor;
			var strHtml = '';
			var strResult = '';
			var total = 0;

			for (var i =0; i< obj.length ;i++ ) {
				if(obj[i].total && obj[i].total > 0) {
					total += obj[i].total; 
				}
			}

			strHtml +=
					'<div class="box-right-1  row15">'+
						'<div class="box-title" style="display: none"><span class="title">Thăm dò ý kiến</span></div>'+
						'<div class="box-content">'+
							'<div class="article-poll" class="poll">'+

									'<div class="box-explore" style="padding-top: 10px;">'+
										'<form class="poll_form" data-poll="'+id+'">'+
											'<div class="title-ex">'+pollInfo.title+'</div>'+
											'<div class="poll_show_items">';
									for (var i =0; i< obj.length ;i++ ) {
										if(pollInfo.type == 'SINGLE') {
											strHtml += '<div class="radio"><label><input type="radio" name="optradio" value="'+obj[i].id+'">'+obj[i].title+'</label></div>';
										}
										if(pollInfo.type == 'MULTIPLE') {
											strHtml += '<div class="checkbox"><label><input type="checkbox" name="optradio" value="'+obj[i].id+'">'+obj[i].title+'</label></div>';
										}
									}
				strHtml +=
											'</div>'+
											'<div class="cmd">'+
												'<input class="cmdbieuquyet btn btn-default btn-xs" type="submit" name="submit" value="Bình chọn"/> '+
												'<button onclick="showPollResult(\''+pollInfo.id+'\')" type="button" class="cmdketqua btn btn-default btn-xs '+pollInfo.id+'_ketqua" data-pollId="'+pollInfo.id+'">Xem kết quả >></button>'+
											'</div>'+
											'<div class="alert alert-danger row15" role="alert" style="display: none; margin-top: 10px;">'+
											  '<strong>Thông báo!</strong> <span class="msg"></span>'+
											'</div>'+
										'</form>'+
									'</div>'+

							'</div>'+
						'</div>'+
					'</div>';
					strHtml += '<table class="poll_result" style="display: none;">';
					for (var i =0; i< obj.length ;i++ ) {
						var rowNum = 0;
						var rowPercent = 0;
						if(obj[i].total && total > 0) {
							rowPercent = ((obj[i].total)*100/total).toFixed(2);
							rowNum = obj[i].total;
						}
						strHtml += 
						'<tr><td style="width: 1%;white-space:nowrap;"><strong>'+obj[i].title+'</strong></td>'+
						'<td>'+
							'<div class="progress" style="margin:0 10px;">'+
								'<div class="progress-bar" role="progressbar" aria-valuenow="'+rowPercent+'" aria-valuemin="0" aria-valuemax="100" style="width:'+rowPercent+'%">'+rowPercent+'%</div>'+
							'</div>'+
						'</td>'+
						'<td style="width: 1%;white-space:nowrap;"><strong>'+rowNum+' phiếu</strong></td></tr>';
					}
					strHtml += '<tr><td colspan="4" class="tf" id="poll_result_total"><strong>Tổng cộng: '+total+' phiếu</strong></td></tr>';
					strHtml += '</table>';


				$(self).show();
				$(self).html(strHtml);

				if(showResult) {
					showPollResult(id);
				}

				$('.'+pollInfo.id).find('form').submit(function( event ) {
					var self = $('.'+$(this).attr('data-poll'))[0];

					//da binh chon
					if(getCookie('poll-'+$(self).attr('data-poll'))) {
						$('.msg').html('Bạn chỉ được bình chọn 1 lần.');
						$(self).find(".alert-danger").fadeTo(4000, 500).slideUp(500, function(){
							$(self).find(".alert-danger").slideUp(500);

						});
						return false;
					}
					var itemArray = [];
					var itemString = '';
					$(self).find("input:checked").each(function() {
						itemArray.push($(this).val());
					});
					itemString = itemArray.join(',');
					if(itemString == '') {

						$(self).find(".alert-danger").fadeTo(5000, 500).slideUp(500, function(){
							$(self).find(".alert-danger").slideUp(500);
						});
					} else {
						$.ajax({
							url: rootUrl +'/api/pollTable/submitPoll',
							jsonp:"jsonCallback",
							dataType: 'jsonp',
							data: {
								saPollTableId: $(self).attr('data-poll'),
								saPollTableItemId: itemString
							},
							success : function(object) {

								if(object.response) {
									setCookie('poll-'+$(self).attr('data-poll'), 'true');

									showPoll($(self).attr('data-poll'), self, true);
								} else {
									$(self).find(".alert-danger").fadeTo(5000, 500).slideUp(500, function(){
										$(self).find(".alert-danger").slideUp(500);
										$(self).find('.msg').html(object.erorr)
									});
								}
								
							}
						});
					}

				  event.preventDefault();
				});

		},
		error: function () {}
	});
}

function showPollResult(id) {
	$('#pollModal').modal('show');
	$('#pollModal #poll_result_items').html($('.'+id).find('.poll_result tr').clone());
	$("#pollModal .poll_result_description").html($('.'+id).find('.title-ex').html());
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
