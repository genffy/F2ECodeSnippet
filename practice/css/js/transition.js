// mouse direction
// pageX, pageY is mouseenter or mouseleave
function mouseDirection(eleP, pageX, pageY, diff){
	var dir = '',
		diff = diff || 0, 
		P = {
			top: eleP.top + diff,
			right: eleP.right - diff,
			bottom: eleP.bottom - diff,
			left: eleP.left + diff
		}
	if(pageY > eleP.top && pageY < eleP.bottom){
		if(pageX < P.left){
			dir = 'left';
		}
		if(pageX > P.right){
			dir = 'right';
		}
	}
	if(pageX > eleP.left && pageX < eleP.right){
		if(pageY < P.top){
			dir = 'top';
		}
		if(pageY > P.bottom){
			dir = 'bottom';
		}
	}
	return dir;
}

// 每次移除 除掉 ad 之外的class
function dealClassName(element, toAdd){
	if(toAdd){
		var el = element.querySelectorAll(".ad")[0], className = el.className;
		el.className = className.replace(/[^ad]/g, '') + ' ' + toAdd;	
	}
}
window.onload = function(event){
	var wrap = document.getElementById('ad_list'),
		adWrapList = wrap.getElementsByClassName('ad-item'),
		adList = wrap.getElementsByClassName('ad');
	// 提前判断是否进入
	Array.from(adList).forEach(function(element) {
		var cur = 0,
			elePosition = element.getBoundingClientRect();
		element.onmouseenter = function(e){
			var dir = mouseDirection(elePosition, e.pageX, e.pageY);
			dealClassName(element, dir);
		};
	});
	// 提前预测是否移出
	Array.from(adWrapList).forEach(function(element){
		var cur = 0,
			elePosition = element.getBoundingClientRect();
		// element.onmouseleave = function(e){
		// 	var dir = mouseDirection(elePosition, e.pageX, e.pageY);
		// 	dealClassName(element, dir);
		// };
		element.onmousemove = function(e){
			var dir = mouseDirection(elePosition, e.pageX, e.pageY, 10);
			if(dir){
				dealClassName(element, dir);
			}
		};
	});
}