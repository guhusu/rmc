var RMC={
		_SW:0,//視窗寬度
		_SH:0,//視窗高度
		_PAGENUM:0,//頁的數量
		_NOWID:'',//現在使用的ID
		_BACKID:'',//上一次使用的ID
		_PAGEHISTORY:[],//記錄頁
		_CORDOVA_STATUS:false,//cordova status
		_PAGE_EVENT:{'hidebefore':{},'hider':{},'showbefore':{},'show':{}},//事件 
		//初始化
		create:function(c){
			RMC._SW=$(window).width();
			RMC._SH=$(window).height();//alert(RMC._SW+' -- '+RMC._SH);
			var HP=false;//header position
			var FP=false;//footer position
			var CH=RMC._SH;
			var i=0;
			$('.page').each(function(){
				var chf=false;
				++i;
				$(this).css({'width':RMC._SW+'px','height':RMC._SH+'px','display':'none'});
				if(i==1) RMC._NOWID=this.id;
				var content=$(this).find('.content');
				var header=$(this).find('.header');
				var footer=$(this).find('.footer');
				HP=header.attr('data-position');
				if(HP){
					//$(this).find('.header').css('position','fixed');
					header.css('position','fixed');
					HP=header.outerHeight(true);
					CH -=HP;
					content.css('margin-top',HP+'px');
					chf=true;
				}
				FP=footer.attr('data-position');
				if(FP){
					FP=footer.outerHeight(true);
					CH -=FP;
					content.css('margin-bottom',FP+'px');
					FP=RMC._SH-FP;
					footer.css({'position':'fixed','left':'0px','top':FP+'px'});
				}
				if(content){
					if(chf){
						content.css({'height':CH+'px','overflow':'auto'});
					}
				}
				RMC._PAGENUM++;
			});//alert(RMC._NOWID);
			$('#'+RMC._NOWID).css({'display':''});
			//$('#vv').css('display','');
			RMC.runCordova();//if(c!=undefined) RMC.runCordova();
		},
		//換頁
		changePage:function(id,type){RMC.changepage(id,type);},
		changepage:function(id,type){
			if(document.getElementById(id)){
				if(type==undefined){//alert(RMC._NOWID);
					RMC._BACKID=RMC._NOWID;
					$('#'+id).css({left:RMC._SW+'px','z-index':2,'display':''}).animate({left:'0px'},1000);
					$('#'+RMC._NOWID).animate({left:'-'+RMC._SW+'px','z-index':1},1000,function(){
						$(this).css('display','none');
					});
				}else{//alert(id);
					//返回
					$('#'+id).css({left:'-'+RMC._SW+'px','z-index':2,'display':''}).animate({left:'0px'},500);
					$('#'+RMC._NOWID).animate({left:RMC._SW+'px','z-index':1},500,function(){
						$(this).css('display','none');
					});
				}
				RMC._NOWID=id;
			}
		},
		//上一頁
		backPage:function(){RMC.backpage();},
		backpage:function(){
			if(RMC._BACKID!=''){
				$('#'+RMC._BACKID).css({left:'-'+RMC._SW+'px','z-index':2,'display':''}).animate({left:'0px'},500);
				$('#'+RMC._NOWID).animate({left:RMC._SW+'px','z-index':1},500,function(){
					$(this).css('display','none');
				});
				var id=RMC._BACKID;
				RMC._BACKID=RMC._NOWID;
				RMC._NOWID=id;
			}
		},
		//載入page
		loadpage:function(url,id){
			
		},
		//swipe event
		swipe:function(name,type,fn){
			if(type=='left'){alert('left');
				$('#'+name).on('swipeleft',function(e){
					alert('left');
				});
				//$('#'+name).swipe();
				/*if(document.getElementById(name)){
					$('#'+name).css({left:'-'+RMC._SW+'px','z-index':2,'display':''}).animate({left:'0px'},500);
					$('#'+RMC._NOWID).animate({left:RMC._SW+'px','z-index':1},500,function(){
						$(this).css('display','none');
					});
					RMC._BACKID=RMC._NOWID;
					RMC._NOWID=name;
				}*/
			}else{
				$('#'+name).on('swiperight',function(e){
					alert('right');
				});
			}
		},
		runCordova:function(){
			document.addEventListener("deviceready", RMC.deviceReady, false);
		},
		deviceReady:function(){
			this._CORDOVA_STATUS=true;
		}
};
//cordova 參數
$(document).ready(function(){
	RMC.create();
	//document.addEventListener("deviceready",deviceReady,false);
	//
});
