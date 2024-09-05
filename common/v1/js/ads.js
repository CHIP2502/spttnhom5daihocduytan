function loadAds() {
	$.getJSON( "/adman/data.json?v="+ Math.random(), function( obj ) {
		var strAds = '';
		for (var i = 0; i < obj.length ; i++) {
			var item = obj[i].item;

			//if(($("#article_id").html() !="" && obj[i].object_id_article.indexOf($("#article_id").html()) >= 0) || obj[i].object_id_cate.indexOf($("#cate_id").html()) >= 0 ) {
				if(obj[i].block_mode == 'preroll') {
					buildPreroll(item);
				} 
				if(obj[i].block_mode == 'box') { 
					//ad image
					var hasItem = false;
					strAds = '<div class="carousel slide" data-ride="carousel" data-interval="'+obj[i].show_interval+'" data-bs-ride="carousel"><div class="carousel-inner">';
					for (var j= 0 ; j <item.length; j++) {

						if(item[j].type == 1) {
							if(j==0) {
								strAds += '<div class="carousel-item active"><a href="'+item[j].link_url+'" onclick="adClick(\''+item[j].id+'\', \''+item[j].link_url+'\')" target="_blank"><img src="/file/adman/'+item[j].banner_url+'?width='+item[j].width+'&height=-&type=resize"></a></div>';
							} else {
								strAds += '<div class="carousel-item"><a href="'+item[j].link_url+'" onclick="adClick(\''+item[j].id+'\', \''+item[j].link_url+'\')" target="_blank"><img src="/file/adman/'+item[j].banner_url+'?width='+item[j].width+'&height=-&type=resize"></a></div>';
							}
						} 
						if(item[j].type == 4) {
							
							if(j==0) {
								strAds += '<div class="carousel-item active"><iframe src="'+item[j].banner_content+'" border="0" height="'+item[j].height+'" width="100%"></iframe></div>';
							} else {
								strAds += '<div class="carousel-item"><iframe src="'+item[j].banner_content+'" border="0" height="'+item[j].height+'" width="100%"></iframe></div>';
							}

						}

						hasItem = true; 
					}
					strAds += '</div></div>';

					if(hasItem) {
						$("."+obj[i].id).html(strAds);
						$("."+obj[i].id).show();
					}

				}
				if(obj[i].block_mode == 'oneline') { 
					//ad image
					var hasItem = false;
					strAds = '<div class="row">';
					var styleClass="col";
					for (var j= 0 ; j <item.length; j++) {
						
						if(item[j].type == 1) {
							strAds += '<div class="'+styleClass+'"><a href="'+item[j].link_url+'" onclick="adClick(\''+item[j].id+'\', \''+item[j].link_url+'\')" target="_blank"><img src="/file/adman/'+item[j].banner_url+'?width='+item[j].width+'&height=-&type=resize"></a></div>';
						} 
						if(item[j].type == 4) {
							strAds += '<div class="'+styleClass+'"><iframe src="'+item[j].banner_content+'" border="0" height="'+item[j].height+'" width="100%"></iframe></div>';
						}

						hasItem = true; 
					}
					strAds += '</div>';

					if(hasItem) {
						$("."+obj[i].id).html(strAds);
						$("."+obj[i].id).show();
					}

				}
				if(obj[i].block_mode == 'topbottom') { 
					//ad image
					var hasItem = false;
					strAds = '<div class="">';

					for (var j= 0 ; j <item.length; j++) {
						
						if(item[j].type == 1) {
							strAds += '<div class="row10"><a href="'+item[j].link_url+'" onclick="adClick(\''+item[j].id+'\', \''+item[j].link_url+'\')" target="_blank"><img src="/file/adman/'+item[j].banner_url+'?width='+item[j].width+'&height=-&type=resize"></a></div>';
						} 
						if(item[j].type == 4) {
							strAds += '<div class="row10"><iframe src="'+item[j].banner_content+'" border="0" height="'+item[j].height+'" width="100%"></iframe></div>';
						}

						hasItem = true; 
					}
					strAds += '</div>';
					
					if(hasItem) {
						$("."+obj[i].id).html(strAds);
						$("."+obj[i].id).show();
					}
					//if($("#cate_id").html() == 'F8E14A06210A3CA5E05382FC0367FB69') {
						if(obj[i].title == 'floating-left') {
							$('<div id="box_ad_floating_left" class="floating-left"> <div id="ad_floating_left" class="ad-right row10" name="vsad_border" style="position: relative; top: 0">'+strAds+'</div></div>').insertBefore( ".header_tool" );
							JSFX_KeepInView("box_ad_floating_left");
						}
						if(obj[i].title == 'floating-right') {
							$('<div id="box_ad_floating_right" class="floating-right"> <div id="ad_floating_right" class="ad-right row10" name="vsad_border" style="position: relative; top: 0">'+strAds+'</div></div>').insertBefore( ".header_tool" );
							JSFX_KeepInView("box_ad_floating_right");
						}
					//}

				}
			//}



		}

		if($(".carousel1").length > 0) $(".carousel1").carousel();
		//if($("video").length > 0) setup_player();
		if($(".scroll_banner").length > 0) {
			head.load(
				"/file/common/plugin/js/jquery.sticky.js", 
				function() {
				$(".scroll_banner").sticky({ topSpacing: 0, parentElement: '.right-col.col-md-3' });
				});
		}
	 });
}

function buildPreroll(obj) {
	for (var i =0; i < obj.length; i++) {
		if(obj[i].start_time =='00:00:00') {
			var v = 
			{
				roll: "preRoll",
				vastTag: obj[i].banner_url
			}
			vast.push(v);

		} else {
			var v = 
			{
				roll: "midRoll",
				vastTag:  obj[i].banner_url,
				timer:  + parseInt(obj[i].start_time.split(':')[2])
			}
			vast.push(v);
		}
	}
}

function adClick(itemId, referer) {
	$.ajax({
		url: rootUrl +'/api/statistic/adv/statcollector',
		jsonp:"jsonCallback",
		dataType: 'jsonp',
		data: {
			scUnitMapId: $("#site_id").html(),
			itemId: itemId,
			referer: referer
		},
		success : function(object) {
		}
	});
}
//load qc
 loadAds();

 /* Keep In View (c) JavaScript-FX. (www.javascript-fx.com)          */
function JSFX_KeepInView(id){
	var getPageY=function(el){return(el==null)?0:el.offsetTop+getPageY(el.offsetParent);};
	var getScrollTop=function(){return document.body.scrollTop||document.documentElement.scrollTop};
	var el=document.getElementById(id);if(el==null)return;
	if(el.style.position=="absolute"){el.startPageTop=-el.offsetTop;el.currentX=el.offsetLeft;el.currentY=el.offsetTop;}
	else{el.startPageTop=getPageY(el);el.currentX=el.currentY=0;};
	el.floatInView=function(){
		
		var targetY=(getScrollTop()>this.startPageTop)?getScrollTop()-this.startPageTop:0;
		this.currentY+=(targetY-this.currentY)/4;

		if(this.currentY == 0) {
				this.style.top=this.currentY+"px";
		} else {
				this.style.top=this.currentY+100+"px";
		}
		
		};
	setInterval('document.getElementById("'+id+'").floatInView()',40);
};