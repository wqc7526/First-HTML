

$(function(){
	//搜索切换
	(function(){
		var aLi = $('#menu li');
		var oText =$('.form').find('.text');
		var arrText =[
		'例如：荷棠鱼坊烤鱼 或 樱花日本料理',
		'例如：釜山料理',
		'例如：鱼子酱',
		'例如：桂花糕',
		'例如：刺身',
		'例如：意大利面'
		]
		
		var iNow =0;
		oText.val(arrText[iNow]);			
		
		aLi.each(function(index){
			$(this).click(function(){
				//console.log(index);
				aLi.attr('class','gradient');
				$(this).attr('class','active');
				iNow = index;
				oText.val(arrText[iNow]);					
			});
		});
		
		oText.focus(function(){
			
			if($(this).val()==arrText[iNow]){
				$(this).val('');
			}
		});
		oText.blur(function(){
			
			if($(this).val()==''){
				$(this).val(arrText[iNow]);
			}
		});
	})();	
	
	//update文字
	(function(){
		var oUpData = $('#update')
		var oUl = oUpData.find('ul');	
		var iH=0;
		//console.log(iH);
		var arrData =[
			{'name':'萱萱','time':5,'title':'光华顺变','url':'http://www.badiu.com'},
			{'name':'矮矮','time':7,'title':'光华2','url':'http://www.badiu.com'},
			{'name':'naghe','time':8,'title':'光华3','url':'http://www.badiu.com'}
		]
		
		var str='';
		var oBtnUp =$('#updateUpBtn');
		var oBtnDown =$('#updateDownBtn');
		var iNow =0;
		var timer=null;
		for(var i=0;i<arrData.length;i++){
			str +='<li><a href="'+ arrData[i].url +'"><strong>'+arrData[i].name+'</strong> <span>'+ arrData[i].time +'分钟前</span>写了一篇新文章：'+ arrData[i].title +'</a></li>';
		}
		oUl.html(str);
		
		iH = oUl.find('li').height();
		
		oBtnUp.click(function(){
			doMove(-1);
			
		});
		oBtnDown.click(function(){
			doMove(1);
			
		});
		
		oUpData.hover(function(){
			clearInterval(timer);
		},function(){
			autoPlay();
		})
		
		function autoPlay(){
			timer=setInterval(function(){
				doMove(-1);
			},1500)
		}
		autoPlay();
		
		function doMove(num){
			iNow += num;
			if(Math.abs(iNow)>arrData.length-1){
				iNow=0;
			}if(iNow >0) {
				iNow = -(arrData.length-1);
			}
			oUl.stop().animate({'top':iH*iNow},1000);
		}
	})();
	
	//opitions选项卡
	(function(){
		fnTab($('.tabNav1'),$('.tabCon1'));
		fnTab($('.tabNav2'),$('.tabCon2'));
						
		function fnTab(oNav,aCon){
			var aElem =oNav.children();
			aCon.hide().eq(0).show();
			
			aElem.each(function(index){
				$(this).click(function(){
					aElem.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					
					aElem.find('a').attr('class','triangle_down_gray');
					$(this).find('a').attr('class','triangle_down');
					
					aCon.hide().eq(index).show();
				});
			});
		}
	})();
	
	//3项选项卡
	(function(){
		Tab($('.tabNav3'),$('.tabCon3'));
		Tab($('.tabNav4'),$('.tabCon4'));
		function Tab(oNav,oCon){
			var aElem = oNav.children();
			var aCon = oCon.children();
			var arr =['老北京一尊黄牛','牛肚','北京烤鸭'];
			
			aElem.each(function(index){
				$(this).click(function(){
					aElem.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					
					aElem.find('a').attr('class','triangle_down_gray');
					$(this).find('a').attr('class','triangle_down');
					
					aCon.find('a').text(arr[index]);
				});
			});
		};
	})();
	//自动播放的焦点图
	(function(){
		var oRecommend = $('#fade');
		var aUlLi = oRecommend.find('ul li');
		var aOlLi = oRecommend.find('ol li');
		var oP =oRecommend.find('p');
		var arr = ['爸爸去哪儿~','人像摄影','美丽大方'];
		var iNow=0;
		var timer=null;
		fnFade();
		
		aOlLi.click(function(){
			iNow = $(this).index();
			fnFade();
		});
		
		oRecommend.hover(function(){
			clearInterval(timer);
		},function(){
			autoPlay();
		})
		
		autoPlay();
		function autoPlay(){
			timer = setInterval(function(){
				iNow++;
				iNow %=arr.length;
				fnFade();
			},1500)
		}
		
		function fnFade(){
			aUlLi.each(function(i){
				if(i!=iNow){
					aUlLi.eq(i).fadeOut().css('z-index',1);
					aOlLi.eq(i).attr('class','');
				}else{
					aUlLi.eq(i).fadeIn().css('z-index',2);
					aOlLi.eq(i).attr('class','active');
				}
				oP.text(arr[iNow]);
			})
		}

	})();
	
	//日历提示
	(function(){
		var aSpan = $('.calender h3 span');
		var aImg = $('.calender img');
		var oPrompt =$('.today_info');
		var oImg = oPrompt.find('img');
		var oStrong = oPrompt.find('strong');
		var oP = oPrompt.find('p');
		
		aImg.hover(function(){
			var iTop = $(this).parent().position().top -30;
			var iLeft = $(this).parent().position().left +40;
			var num = $(this).parent().index()%aSpan.length
			
			oPrompt.show().css({'left':iLeft,'top':iTop,'zIndex':3});
			oP.text($(this).attr('info'));
			oImg.attr('src',$(this).attr('src'));
			oStrong.text(aSpan.eq(num).html());
		},function(){
			oPrompt.hide();
		});
		
	})();
	
	//bbs显示
	(function(){
		var oLi =$('.bbs ol li');
		oLi.mouseover(function(){
			oLi.removeClass('active').eq($(this).index()).addClass('active');
		});
	})();
	
	//HOT鼠标提示
	(function(){
		var arr =[
		'',
		'1',
		'用户名：足球宝贝',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		];
		var oHotLi = $('.hot_area li')
		oHotLi.hover(function(){
			
			if($(this).index()==0)return;
			$('.hot_area li p').remove();
			$(this).append('<p style="width:'+ ($(this).width()-12) +'px;height:'+ ($(this).height()-12) +'px;">'+ arr[$(this).index()] +'</p>');

		},function(){
			$('.hot_area li p').remove();
		});
	})();
	
	//切换城市
	(function(){
		var aA = $('.city a');
		aA.click(function(){
			aA.removeClass('active');
			$(this).addClass('active');
		})
	})();
});