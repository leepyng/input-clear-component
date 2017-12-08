;(function(){
	
	window.onload=function(){
		var body= document.getElementsByTagName("body");

		if(!body[0]){return}//判断页面是否html不完整，没有body元素
		//给body添加事件委托，监听input的点击事件
		body[0].addEventListener('click',function(e){
		
			var target=e.target||e.srcElement;
			var targetName=target.nodeName.toLowerCase()
			if(target&&targetName=='input'&&target.nextSibling&&target.nextSibling.className!='clear-text-btn'){
				//只处理text和password类型
				if(target.type=="text"||target.type=="password"){
					//插入清除元素的
					insertAfter(target,function(btn){
						initClearTextBtn(btn);//设置清除input value的按钮样式
					})
				}

			}
			target.addEventListener('blur',function(e){
				if(!e.target.value&&e.target.nextSibling&&target.nextSibling&&e.target.nextSibling.className=='clear-text-btn'){
					clearCloseTag(e.target)
				}
			});	
			target.addEventListener('keyup',function(e){
				
				if(target.nextSibling.className!='clear-text-btn'){
					//插入清除元素的
					insertAfter(target,function(btn){
						initClearTextBtn(btn);//设置清除input value的按钮样式
					})
				}				
				if(e.target.value){
					e.target.nextSibling.style.display="block";
				}else{
					e.target.nextSibling.style.display="none";
				}
				
			});

		
		})


	}
	//设置清除input value的按钮样式
	function initClearTextBtn(font){

		var brother=font.previousSibling;
		resetInputBoxStyle(brother,true);
		var style="display:none;color:#727e88;position:absolute;cursor:pointer;font-size:"+(brother.style.fontSize||'13px')+";left:"+(brother.offsetLeft+brother.offsetWidth-(brother.style.fontSize?brother.style.fontSize.replace('px',''):13))+"px;top:"+brother.offsetTop+"px;line-height:"+brother.offsetHeight+"px;";   
		font.style.cssText=style;
		if(brother.value){font.style.display='block'}

	}
	//重新设置输入框的大小
	function resetInputBoxStyle(brother,isAdd){

		if(isAdd){
			
			var fontsize=window.getComputedStyle(brother, null).getPropertyValue('font-size').replace('px','')
			var paddingRight=(window.getComputedStyle(brother, null).getPropertyValue('padding-right').replace('px',''));
			var width=Number((window.getComputedStyle(brother, null).getPropertyValue('width').replace('px','')).split(' ')[0]);
			brother.style.paddingRight=fontsize+'px';
			brother.style.width=(width-(fontsize-paddingRight))+'px';

		}else{

			brother.style='';

		}

		

	}
	//清空input的value
	function clearInputValue(target){
		// console.log(target);
		var target=target;
		if(!target)return;
		target.value='';
	}
	//清除关闭元素
	function clearCloseTag(target){
		if(target.nextSibling&&target.nextSibling.nodeName.toLowerCase()=='font'){
			
			var _parentElement = target.nextSibling.parentNode;
	        if(_parentElement){
	            _parentElement.removeChild(target.nextSibling);  
	        }
		}
		resetInputBoxStyle(target,false);
	}

	//构造向指定元素后面插入新的元素
	function insertAfter(targetElement,callback ){  
		var newElement = document.createElement("font");
		newElement.innerHTML='x';
		newElement.className="clear-text-btn";
		var parent = targetElement.parentNode; 
		if( parent.lastChild == targetElement ){  
			parent.appendChild( newElement, targetElement ); 
		}else{ 
			parent.insertBefore( newElement, targetElement.nextSibling ); 
		}; 
		var target=newElement.previousSibling;
		newElement.addEventListener('click',function(e){
			if (e && e.stopPropagation) {
	            //取消事件冒泡预防占击事件重叠
	            e.stopPropagation();
	        }else {
	            //IE取消事件冒泡的方法 
	            window.event.cancelBubble = true;
	            return false;
	        }
	        clearInputValue(target);
	        clearCloseTag(target);
	        target.focus();
		})
		callback(newElement)

	}
})()