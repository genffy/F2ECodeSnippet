// mouse direction
// pageX, pageY is mouseenter or mouseleave
function mouseDirection(eleP, pageX, pageY){
	var dir = '',
		diff = 0, 
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
	var wrap = document.querySelectorAll('#ad_list'),
		adWrapList = wrap[0].querySelectorAll('.ad-item'),
		adList = wrap[0].querySelectorAll('.ad');
	adList.forEach(function(element) {
		(function(el){
			var cur = 0,
				elePosition = el.getBoundingClientRect();
			el.onmouseenter = function(e){
				var dir = mouseDirection(elePosition, e.pageX, e.pageY);
				dealClassName(el, dir);
				console.log('enter', dir);
			};
		})(element);
	});
	adWrapList.forEach(function(element){
		(function(el){
			var cur = 0,
				elePosition = el.getBoundingClientRect();
			el.onmouseleave = function(e){
				var dir = mouseDirection(elePosition, e.pageX, e.pageY);
				dealClassName(el, dir);
				console.log('leave', dir);
			};
		})(element);
	});
}