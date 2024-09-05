
        var rootUrl = '/service';


        //list
		var temp= $(".feedback_comment1");
		
		for(var a=0;a<temp.length;a++){
			var idl=$(document).find(temp[a]).data("fb-id");
			listFB(idl);
		}
		
        // initialize and setup facebook js sdk
        window.fbAsyncInit = function() {
            FB.init({
              appId      : '2131118177211869',
              cookie     : true,
              xfbml      : true,
              version    : 'v3.2'
            });
            FB.getLoginStatus(function(response) {          
                var retrievedObject = localStorage.getItem('infoId');
                //console.log('retrievedObject: ', JSON.parse(retrievedObject));      
                var parseObject =  JSON.parse(retrievedObject);  
                                
                if(retrievedObject != null){
                    $(".fullName").text(parseObject.name);
                    $(".username").val(parseObject.name);
                    $(".email").val(parseObject.email);
                    $(".avatar").val(parseObject.avatar);
                    $(".userAvatar").attr("src",parseObject.avatar);
                    $(".lgout").css('display','inline-block');
                    $(".userAvatar").css('display','inline-block');
                }
                
                if (response.status === 'connected') {  
                    $("#status").text("We are connected.");                                         
                } 
                else if (response.status === 'not_authorized') {                  
                        $("#status").text("We are not logged in.");                 
                } else {                    
                    $("#status").text("You are not logged into Facebook.");             
                }
            });
        };
        
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        
        // login with facebook with extra permissions
        function login(ids,parentId,comment,idCm) {
            FB.login(function(response) {
                if (response.status === 'connected') {                  
                    $("#status").text("We are connected.");
                    
                    // USER INFO
                    FB.getLoginStatus(function(response) {
                        if (response.status === 'connected') {
                            FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,email,picture'}, function(response) {
                                var userId = response.id;
                                var email = response.email;
                                var firstName = response.first_name;
                                var lastName = response.last_name;
                                var name = response.name;
                                var avatar = response.picture.data.url;
                                var scUnitMapId = $("#site_id").html();
                                
                                $(".avatar").val(avatar);
                                $(".username").val(name);
                                $(".email").val(email);
                                $(".fullName").text(name);
                                $(".userAvatar").attr("src",avatar);
                                $(".userAvatar").css('display','inline-block');
                                $(".lgout").css('display','inline-block');
                                $(".fullName").css('display','inline-block');
                                var infoId = {'userId':userId,'name':name,'email':email,'username':userId,
                                'firstName':firstName,'lastName':lastName,'avatar':avatar,'scUnitMapId':scUnitMapId};                                   
                                //put from storage
                                localStorage.setItem('infoId',JSON.stringify(infoId));
                                // LOGIN
                                loginFB(userId,email,firstName,lastName,name,avatar,scUnitMapId,ids,parentId,comment,idCm);   
                            }); 
                        
                        }   
                    });
                    
                } else if (response.status === 'not_authorized') {
                    $("#status").text("We are not logged in.");
                } else {
                    $("#status").text("You are not logged into Facebook.");
                    $('#blocker_'+ids).css('display','flex');    			
                }
            }, {scope: 'email'});
        }
        function getInfoPopup(ids,parentId,comment,idCm){
			var name_p=$('.name-popup-'+ids).val();
			var email_p=$('.email-popup-'+ids).val();
			var scUnitMapId = $('#site_id').html();
			var infoId= {'name':name_p,'email':email_p,'scUnitMapId':scUnitMapId};
			var avatar ='/file/common/image/avatar_silkhouse.gif';
			localStorage.setItem('infoId',JSON.stringify(infoId));
			insertFeedback(scUnitMapId,name_p,email_p,avatar,ids,parentId,comment,idCm);
			$(".fullName").text(name_p);
			$(".userAvatar").attr("src",avatar);
			$('.blocker').css('display','none');
			$(".userAvatar").css('display','inline-block');
			$(".lgout").css('display','inline-block');
			$(".fullName").css('display','inline-block');
        }
        function closePopup(){
            $('.blocker').css('display','none');
        }
        // á»¦Y QUYá»€N THĂ€NH CĂ”NG Sáº¼ Gá»ŒI HĂ€M NĂ€Y
        function loginFB(userId,email,firstName,lastName,name,avatar,scUnitMapId,ids,parentId,comment,idCm) { 
            $.ajax({                  
              url : rootUrl+ "/service/member/login",            
              jsonp : "jsonCallback",
              dataType : 'jsonp',
              data : {
                userId : userId,
                name : name,
                email : email,
                username : userId,
                firstName : firstName,
                lastName : lastName,
                avatar : avatar,
                scUnitMapId : scUnitMapId        
              },
              success : function(object) {              
                if (object.response) {
                            
                    $(".lgout").css('display','inline-block');
                    $(".userAvatar").css('display','inline-block');
                    insertFeedback(scUnitMapId,name,email,avatar,ids,parentId,comment,idCm);     
                }else{
                              
                    //loginResult = false;
                }
              },
              error : function(object) {  
                                
                console.log("Log In Error: " + JSON.stringify(response));
              }
            });
        }
		
        function insertFeedback(scUnitMapId,name,email,avatar,ids,parentId,comment,idCm){
            $.ajax({
                url: rootUrl+'/api/feedback/insert',
                jsonp:"jsonCallback",
                dataType: 'jsonp',
                data: {
					scUnitMapId : scUnitMapId,
                    objectType:$("#fb_type_"+ids).val(),
					parentId:parentId,
					articleId:$("#fb_id_"+ids).val(),
					title:$('#fb_title_'+ids).val(),
					url:$('#fb_url_'+ids).val(),
					username : name,
					email : email,
					content:$('#contentFB_'+ids+'_'+comment).val(),	
					avatar : avatar,					
				},
                success : function(object) {
                    if(object.resultCode == '0000') {
						var strHtml ='';
                        if(parentId == 0){
							strHtml += '<div class="comment-meta cmt-review">';
									strHtml += 
										'<div style="margin:0;">'+
												'<img  src="'+avatar+'" alt="" width="30" height="30">'+
												'<p class="comment-user">' + name + '</p>'+
												'<br/><p>' + $('#contentFB_'+ids+'_'+comment).val() + '</p>'+
										'</div>';
								strHtml += '</div>';
								$("#comment_review_"+ids).html(strHtml);
								$('#comment-form-'+ids).css('display','none');
							$("#message_info_"+ids).html('<div class="" style="padding: 6px 15px;display: flex;float: left;color: #797B3C;font-style: italic;margin: -5px 0 5px 0;">'+object.resultMsg+'</div>');
						}else{
							strHtml += '<div class="comment-meta cmt-review">';
									strHtml += 
										'<div class="" style="margin:0;padding-left:20px">'+
												'<img  src="'+avatar+'" alt="" width="30" height="30">'+
												'<p class="comment-user">' + name + '</p>'+
												'<br/><p>' + $('#contentFB_'+ids+'_'+comment).val() + '</p>'+
										'</div>';
								strHtml += '</div>';
								$("#comment_review_"+idCm).html(strHtml);
								$('#comment-form-'+parentId).css('display','none');
							$("#message_info_"+idCm).html('<div class="" style="padding: 6px 15px;display: flex;float: left;color: #797B3C;font-style: italic;margin: -5px 0 5px 0;">'+object.resultMsg+'</div>');
							
						}
                    } else {
                        $(".message_info").html('<div class="" style="padding: 6px 15px;display: flex;float: left;color: #797B3C;font-style: italic;margin: -5px 0 5px 0;">'+object.resultMsg+'</div>');
                    }
                },
                error: function () {
                    
                }
            });
        }
		function listFB(idl){
			$.ajax({
				url:  rootUrl+'/api/feedback/list',
				jsonp:"jsonCallback",
				dataType: 'jsonp',
				data: {
					scUnitMapId: $("#site_id").html(),
					articleId: idl
				},
				success : function(object) {
					var obj = object.response;
					var strHtml = '';
					var size_ul = obj.length;
					var parentIdrp = idl; 
					var like="like";
					strHtml += '<h3 class="">Ý kiến bạn đọc</h3><section class="comment-list">';
					for (var i = 0; i < obj.length ; i++) {
						if(obj[i].parentId == 0){
							strHtml += 
							'<ul class="comments" data-id="'+obj[i].id+'"><li class="comment-meta">'+
								'<img  src="'+obj[i].avatar+'" alt="" width="30" height="30">'+
								'<p class="comment-user">' + obj[i].username + '</p>'+
								'<time class="comment-date"><i class="fa fa-clock-o"></i> ' + prettyDateFeedback(obj[i].createDate) + '</time>'+
								'<br/><p>' + obj[i].content + '</p>'+
							'';
							strHtml+='<p class="comment-actions"><a class="btnReply" href="javascript:void(0);" onclick="replyFB(\''+idl+'\',\''+obj[i].id+'\',\''+i+'\',\''+obj[i].id+'\');">Trả lời</a>';
							strHtml+='<span class="separator">•</span>';
							strHtml+='<a class="btnLike" id="btnLike_'+obj[i].id+'" href="javascript:void(0);" onclick="setlikeFB(\''+obj[i].id+'\',\''+like+'\');">';
							strHtml+='<strong class="btlike" id="total_'+obj[i].id+'"></strong> Thích</a>';
							getlikeFB(obj[i].id);
							strHtml+='<div class="reply_cmt_'+obj[i].id+'"></div></li></ul>';
						
							for(var j=0;j< obj.length;j++){
								if(obj[i].id == obj[j].parentId){
									strHtml += 
										'<ul class="comments" style="padding-left:20px;"><li class="comment-meta" id="'+obj[j].id+'">'+
											'<img  src="'+obj[j].avatar+'" alt="" width="30" height="30">'+
											'<p class="comment-user">' + obj[j].username + '</p>'+
											'<time class="comment-date"><i class="fa fa-clock-o"></i> ' + prettyDateFeedback(obj[j].createDate) + '</time>'+
											'<br/><p>' + obj[j].content + '</p>';
										strHtml+='<p class="comment-actions"><a class="btnReply" href="javascript:void(0);" onclick="replyFB(\''+idl+'\',\''+obj[j].id+'\',\''+j+'\',\''+obj[i].id+'\');">Trả lời</a>';
										strHtml+='<span class="separator">•</span>';
										strHtml+='<a class="btnLike" id="btnLike_'+obj[j].id+'" href="javascript:void(0);" onclick="setlikeFB(\''+obj[j].id+'\',\''+like+'\');">';
										strHtml+='<strong class="btlike" id="total_'+obj[j].id+'"></strong> Thích</a>';
										getlikeFB(obj[j].id);
										strHtml+='<div class="reply_cmt_'+obj[j].id+'"></div></li></ul>';
								}
							}
						}
						
					}
					strHtml += '</section>';
					var x=5;
					if(size_ul < 5){$("#btnMore_"+idl).hide()};
					
					$("#btnMore_"+idl).click(function () {
						x= (x+5 <= size_ul) ? x+5 : size_ul;
						$('#feedback-list-'+idl+' .comments:lt('+x+')').show();
						if(size_ul == x){$("#btnMore_"+idl).hide()};
					});
					if(size_ul > 0) {	
						$("#feedback-list-"+idl).append(strHtml);
						$('#feedback-list-'+idl+' .comments:lt('+x+')').show();
						
					}
					
					
				},
				error: function () {
					console.log("error list feedback");
				}
			});

		}
        //Gá»¬I BĂŒNH LUáº¬N
		
            function sendFB(ids,parentId,comment,idCm){
                if(localStorage.getItem('infoId') == null){
                    login(ids,parentId,comment,idCm);
                }
                else{
                    var retrievedObject = localStorage.getItem('infoId');      
                    var parseObject =  JSON.parse(retrievedObject);
					 insertFeedback(parseObject.scUnitMapId,parseObject.name,parseObject.email,parseObject.avatar,ids,parentId,comment,idCm);
                }
            };
        
        // TRÆ¯á»C KHI NHáº¤N NĂT LOGIN PHáº¢I Gá»ŒI HĂ€M NĂ€Y
        function checkLogin(){
            $.ajax({                   
              url : rootUrl+"/service/member/checklogin",            
              jsonp : "jsonCallback",
              dataType : 'jsonp',
              data : {                  
              },
              success : function(object) {              
                if (object.response) {
                    
                    return true;
                }else{
                    
                    return false;
                }
              },
              error : function(object) {  
                 
                console.log("Log In Error: " + JSON.stringify(response));
                return false;
              }
            });
        }
        // ÑNG XU?T
        function logout(){
            
            localStorage.removeItem('infoId');
            $('.userAvatar').css('display','none');
            $('.fullName').css('display','none');
            $('.lgout').css('display','none');
            
        }

        
        
    var prettyDateFeedback = function(dateString) {
        // old date string: 2012-10-24 15:47:04.694
        // new date string (ISO 8601): 2012-10-23T16:22:21+07:00
        if (typeof dateString == 'undefined') {
            return '';
        }
        dateString1 = dateString.replace(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2}).\d{0,4}/gim, '$1T$2+07:00');
        var date = new Date(dateString1);
        if (isNaN(date)) {
            try {
                var dateArray = /(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})([+\-])(\d{2}):(\d{2})/.exec(dateString1);

                if (dateArray[1]) {
                    date = dateArray[1].split(/\D/);

                    for (var i = 0, L = date.length; i < L; i++) {
                        date[i]= parseInt(date[i], 10) || 0;
                    }

                    date[1] -= 1;
                    date = new Date(Date.UTC.apply(Date, date));

                    if(!date.getDate()) {
                        date = NaN;
                    }
                    else if (dateArray[3]) {
                        var tz = (parseInt(dateArray[3], 10) * 60);
                        if (dateArray[4]) tz += parseInt(dateArray[4], 10);
                        if (dateArray[2] == '+') tz *= -1;
                        if (tz) date.setUTCMinutes(date.getUTCMinutes()+ tz);
                    }
                }
            }
            catch (e) {
                date = NaN;
            }
        }
        if (isNaN(date)) {
            return ''; //dateString incorrect
        }
        var now = new Date();
        var diff = (now.getTime() - date.getTime()) / 1000;
        var day_diff = Math.floor(diff / 86400);
        if (isNaN(day_diff) || day_diff < 0 || day_diff >= 1) {
            return 'hh:mm dd/MM/yyyy'
                .replace(/hh/, ("0" + date.getHours()).slice(-2))
                .replace(/mm/, ("0" + date.getMinutes()).slice(-2))
                .replace(/dd/, ("0" + date.getDate()).slice(-2))
                .replace(/MM/, ("0" + (date.getMonth() + 1)).slice(-2))
                .replace(/yyyy/, date.getFullYear())
            ;
        }
        return day_diff == 0 && (
            diff < 60 && 'Vừa gửi' ||
            diff < 120 && '1 phút trước' ||
            diff < 3600 && Math.floor( diff / 60 ) + ' phút trước' ||
            diff < 7200 && '1 giờ trước' ||
            diff < 86400 && Math.floor( diff / 3600 ) + ' giờ trước') ||
            day_diff == 1 && 'Hôm qua' ||
            day_diff < 7 && day_diff + ' ngày trước' ||
            day_diff < 31 && Math.ceil( day_diff / 7 ) + ' tuần trước';

    }
	
	function replyFB(id_article,parentIdrp,idcmt,idParent){
		var str ='';
		str +=' <div class="comment-form" id="comment-form-'+idParent+'" style="padding-left:20px;">'+
					'<div class="comment-editor">'+
						'<textarea class="comment-input" name="content" id="contentFB_'+id_article+'_'+idcmt+'" placeholder="Bạn nghĩ gì về tin này?"></textarea>'+
						
					'</div>'+
					'<button  class="btnSubmit" onclick="sendFB(\''+id_article+'\',\''+idParent+'\',\''+idcmt+'\',\''+parentIdrp+'\');">Trả lời</button>'+ 
					'<button  class="btnClose" onclick="closeForm(\''+idParent+'\');">Đóng</button>'+ 
				'</div>'+
        '<div class="comment_review" id="comment_review_'+parentIdrp+'"></div>'+
        '<div class="message_info" id="message_info_'+parentIdrp+'"></div>';
		$('.reply_cmt_'+parentIdrp).html(str);
	}
	function closeForm(id){
			$("#comment-form-"+id).remove();
	}	
	$(document).ready(function(){
		if(localStorage.getItem('idlike') ==null){
			var b =[];
			localStorage.setItem("idlike",JSON.stringify(b));
		}
		
	});
	
	function setlikeFB(id,action){
		$.ajax({
			url:  rootUrl+'/api/statslike/update',
			jsonp:"jsonCallback",
			dataType: 'jsonp',
			data: {
				scUnitMapId: $("#site_id").html(),
				objectId: id,
				objectType:'ARTICLE',
				action: action
			},
			success : function(object) {              
                if(object.resultCode == 0000){
					if(action == "dislike"){
						$("#btnLike_"+id).attr("onclick", "setlikeFB('"+ id +"', 'like')"); 
						$("#btnLike_"+id).css('font-weight','unset');
										
						var count= parseInt($('#total_'+id).text())-1;
						$('#total_'+id).text(count);
						//localStorage
						var a= [];
						a = JSON.parse(localStorage.getItem('idlike'));
						for( var i = 0; i < a.length; i++){ 
						   if ( a[i] === id) {
							 a.splice(i, 1); 
						   }
						}
						localStorage.setItem("idlike",JSON.stringify(a));
					}
					else if(action == "like"){
						$("#btnLike_"+id).attr("onclick", "setlikeFB('"+ id +"', 'dislike')"); 
						$("#btnLike_"+id).css('font-weight','bold');	
						var parseId = $('#total_'+id).text();
						if(parseId){
							var count= parseInt(parseId)+1;
							$('#total_'+id).text(count);
						}else{
							$('#total_'+id).text(1);
						}
						//localStorage
						var a= [];
						a = JSON.parse(localStorage.getItem('idlike'));
							 a.push(id);
						localStorage.setItem("idlike",JSON.stringify(a));
					}
				}
				else{
					return false;
				}
		    },
			  error : function(object) {  
				console.log("Log In Error: " + JSON.stringify(response));
				return false;
			}
		});
	}	
	function getlikeFB(id){
		$.ajax({
			url:  rootUrl+'/api/statslike/total',
			jsonp:"jsonCallback",
			dataType: 'jsonp',
			data: {
				scUnitMapId: $("#site_id").html(),
				objectId: id
			},
			success : function(object) {   
						
                if(object.resultCode == 0000){
					var obj =object.response;
					if(obj !=null){
						for(var i=0;i<obj.length;i++){
							$('#total_'+id).text(obj[i].total);
						}
					}
				}
				else{
					return false;
				}
		    },
			  error : function(object) {  
				console.log("Log In Error: " + JSON.stringify(response));
				return false;
			}
		});
	}
$(document).ready(function(){
	setTimeout(function(){
		if(localStorage.getItem('idlike') !=null){
			var item = JSON.parse(localStorage.getItem("idlike"));
			for(var i =0; i<item.length;i++){
				$("#btnLike_"+item[i]).css('font-weight','bold');
				$("#btnLike_"+item[i]).attr("onclick", "setlikeFB('"+ item[i] +"', 'dislike')"); 
			}
		}
	},1000);
});