window.onload =function(){
			var oBody = document.getElementsByTagName('body')[0]; 
			var oV =document.getElementById('v1');
			var oControl = document.getElementById('control');
			var aInput =oControl.getElementsByTagName('input');
			var timer =null;
			var oProgress = document.getElementById('progress');
			var oProgress_col = document.getElementById('progress_col');
			var oVolumn = document.getElementById('volumn');
			var oVolumn_col = document.getElementById('volumn_col');
			var disX =0;
			var disY =0;
			nowTime();
			aInput[0].onclick =function(){
				if(oV.paused){
					oV.play();
					this.className = 'btn1stop';
					timer=setInterval(nowTime,1000)
				}else{
					oV.pause();
					this.className = 'btn1';
					clearInterval(timer);
				}
			}
			
			aInput[2].value = changeTime(oV.duration);
			
			aInput[3].onclick =function(){
				oVolumn.style.display ='block';
			}
			
		/*	aInput[4].onclick =function(){
				if(parseInt(oV.style.width)>318){
					oV.style.width = 318 +'px';
					oV.style.height = 256+'px';
				}else{
					oV.style.height = document.documentElement.clientHeight +'px';
					oV.style.width = document.documentElement.clientWidth+'px';
				}
			}*/
			
			function nowTime(){
				aInput[1].value = changeTime(oV.currentTime);			
				
				var scale = oV.currentTime/oV.duration;
				
				oProgress_col.style.left =  (oProgress.offsetWidth-oProgress_col.offsetWidth)*scale+'px';
			}
			
			function changeTime(time){
				iNum = parseInt(time);
				
				//var iH =toZero(Math.floor(iNum/3600));
				var iM =toZero(Math.floor((iNum%3600)/60));
				var iS =toZero(Math.floor(iNum%60));
				
				//return iH +':'+ iM +':'+ iS;
				return  iM +':'+ iS;
			}
			
			function toZero(num){
				if(num<10){
					return '0'+num;
				}else{
					return num;
				}
			}
			
			oProgress_col.onmousedown =function(){
				var ev=ev||event;
				disX =ev.clientX - this.offsetLeft;
				document.onmousemove =function(){
					var ev =ev||event;
					L = ev.clientX -disX;
					if(L<0){
						L=0;
					}else if(L>oProgress.offsetWidth-oProgress_col.offsetWidth){
						L=oProgress.offsetWidth-oProgress_col.offsetWidth;
					}
					oProgress_col.style.left = L+'px';
					
					var scale =L/(oProgress.offsetWidth-oProgress_col.offsetWidth);
					oV.currentTime =scale * oV.duration;
				}
				document.onmouseup =function(){
					document.onmousemove =document.onmouseup =null;
				}
			}
			oVolumn_col.onmousedown =function(){
				var ev=ev||event;
				disY =ev.clientY - this.offsetTop;
				document.onmousemove =function(){
					var ev =ev||event;

					T = ev.clientY -disY;
					if(T<0){
						T=0;
					}else if(T>oVolumn.offsetHeight-oVolumn_col.offsetHeight){
						T=oVolumn.offsetHeight-oVolumn_col.offsetHeight;
					}
					oVolumn_col.style.top = T+'px';
					
					var scale = T /(oVolumn.offsetHeight-oVolumn_col.offsetHeight);

					oV.volume = 1-scale;
					oVolumn.style.display = 'block';
				}
				document.onmouseup =function(){
					document.onmousemove =document.onmouseup =null;
				}
			}
			oV.onmouseout =function(){
				oVolumn.style.display = 'none';
			}
			
		}