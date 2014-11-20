//创建一个具有指定原型的对象
var derive = Object.create ? Object.create : function() { 
	'use strict';
	var T = function() {}; 
	return function(obj) { 
		T.prototype = obj; 
		return new T;
	}
}();
/**
 * 组合下拉框
 */
(function(){
	'use strict';
	var Util = Util || {};
	//组合下拉框
    var _comboBox = {
        init: function (options, elem) {
            var self = this, empty = {};
            self.options = $.extend({}, $.fn.comboBox.options, options);
            self.textInput = $(elem);
            self.valueInput = self.options.valueInputId ? $('#' + self.options.valueInputId) : self.textInput.next('input');
            self.defaultVal = self.valueInput.val() || self.options.defaultVal || '';
            self.control = self.textInput.parent().parent();
            
            //emptyText
            if(self.options.emptyText){
            	empty[self.options.valueKey] = '';
            	empty[self.options.nameKey] = self.options.emptyText;
            }

            //这里是self.options.istree，原来是 !self.options.istree
            if (typeof (self.options.data) == 'string' && self.options.istree ) {
                $.ajax({
                    url: self.options.data,
                    type: 'post',
                    dataType: 'text',
                    success: function (data) {
                    	//data = typeof( data ) == 'object' ? data : eval( '(' + data + ')' );
                    	self.data = data;
                    	if(self.options.emptyText && self.data) self.data.unshift(empty);
                    	self.render();
                    },
                    error: function(){
                    	// TODO
                    	self.options.ajaxError();
					}
            	});
            } else {
            	if(Object.prototype.toString.call(self.options.data) === '[object Array]')
            		self.data = self.options.data.concat();
            	else
            		return;
            	if(self.options.emptyText && self.data) self.data.unshift(empty);
            	self.render();
            }
        },
		render: function(){
			var self = this;
			var time = new Date().getTime();
			var controlR = self.control.find('.f-r');
			var html = [
 			    '<div class="combobox_ctn" id="comboBox"' + time + '>',
 			    '    <div class="combobox_inner">',
 			    '        <ul>' + self.traverse() + '</ul>',
 			    '    </div>',
 			    '    <i class="clear" title="清除"></i>',
 			    '</div>'].join('');
 			    
 			//二次渲染的时候清除之前
			$('#comboBox' + self.textInput.data('time')).remove(); 
			self.textInput.data('time', time).attr('readonly', true);
			
			//添加箭头
			self.control.find('i.arrow').remove();
			self.arrow = $('<i class="arrow"></i>')
				.appendTo(controlR.length ? controlR : self.control);
			
			//添加到页面
			self.box = $(html).appendTo('body');
			
			if(self.options.istree) {
				self.box.find('ul').addClass('tree').tree({
					data: self.data,
					
					//这里是self.options.data，原来是self.data
					getChildData: self.options.data,
					paramKey: [self.options.valueKey],
					paramName: [self.options.valueKey],
					showName: self.options.nameKey,
					changeFloderIcon: self.options.changeFloderIcon,
					callback: function(){
						//打开第一个父节点
						this.find('span.tree-hit').eq(0).click();
					},
					onSelect: function(){
						self.options.onSelect.call(this);
						self.setData();
					},
					error: function(){
						Util.warn('数据加载失败！');
					}
				});
			}
			
			//还要将树性下拉框排除在外
			if(!self.options.multiple && !self.options.istree) self.box.find('i.clear').remove();
			
			self.position();
			self.addEvents();
			
			if(self.defaultVal){
				self.loadDefaultVal();
			}else if(self.options.loadFirstVal || self.options.emptyText){
				self.loadFirstVal();
			}
			
			self.options.callback();
		},
		traverse: function(){
			var self = this, itemStr = '';
			if(self.options.istree) return '';
			for(var i = 0; i < self.data.length; i++){
				var _item = self.data[i], _li = [];
				itemStr += '<li title="' + _item[self.options.nameKey] + '"';
				
				for (var key in _item) {
                	if(_item.hasOwnProperty(key)) 
                		_li.push(' data-' + key + '=' + (_item[key] + '').replace('\n','') + '"');
                }
				
				itemStr += _li.join('');
				itemStr += '><a href="javascript:;">' + self.data[i][self.options.nameKey] + '</a></li>';
			}
			return itemStr;
		},
		position: function(){
			var self = this, wh = $(window).height(), bh = document.body.scrollHeight;
			var width, height, top, left, itop;
			var total = self.box.find('li').length;
			var domHeight = wh > bh ? wh : bh;
			var boxHeight = (total > self.options.maxLength ? self.options.maxLength : total) * 22 + 18;
			var offset = self.textInput.offset();
			
			width = self.control.outerWidth();
			height = self.textInput.outerHeight();
			top = offset.top + height;
			left = offset.left;
			itop = 0 - (height + 18)/2;
			
			if(top + boxHeight > domHeight){
				top = offset.top - boxHeight;
				itop = boxHeight + (height - 18)/2;
			}
			
			self.box.css({
				left: left,
				top: top,
				width: self.options.width || width - 2
			}).find('i.clear').css({
				top: itop
			});
		},
		addEvents: function(){
			var self = this;
			self.textInput.unbind();
			
			if(!self.options.disable){
				self.textInput
					.focus(function(){
						self.openBox();
					})
					.click(function(e){
						e.stopPropagation();
					});
				
				self.arrow.click(function(e){
					e.stopPropagation();
					if(self.control.hasClass('active')){
						self.closeBox();
					}else{
						self.openBox();
					}
				});
			}
			
			if(!self.options.istree){
				self.box.find('ul').on('click', 'li', function(e){
					e.stopPropagation();
					var $li = $(this);
					if($li.hasClass('selected')){
						if(self.options.multiple){
							$li.removeClass('selected');
						}
						self.closeBox();
					}else{
						$li.addClass('selected');
						if(!self.options.multiple || self.options.istree){
							self.box.find('li.selected').not($li).removeClass('selected');
							self.closeBox();
						}
						self.options.onSelect.call($li, self.textInput);
					}
					
					self.setData();
				});
			}
			
			self.box.find('i.clear').click(function(){
				self.box.find('.selected').removeClass('selected');
				self.textInput.val('');
    			self.valueInput.val('');
				self.options.clearSelect && self.options.clearSelect();
			});

			$('html').bind('click', function() {
				self.closeBox();
			});
			
			$(self.textInput).resize(function(){
				self.position();
			});
		},
		loadDefaultVal: function(){
			var self = this;
			var vals = self.defaultVal.split(',');
			self.box.find('li').each(function(){
				var thisVal = $(this).data(self.options.valueKey.toLowerCase());
				for(var i = 0; i < vals.length; i++){
					if(thisVal == vals[i]){
						$(this).click();
						break;
					}
				}
			});
		},
		loadFirstVal: function(){
			var self = this;
			self.box.find('li').first().click();
		},
		setData: function(){
			var self = this, text = [], val = [];
			self.box.find('.selected').each(function(){
				text.push($(this).data(self.options.nameKey.toLowerCase()));
				val.push($(this).data(self.options.valueKey.toLowerCase()));
			});
			self.textInput.val(text.join(','));
			self.valueInput.val(val.join(','));
		},
		openBox: function(){
			var self = this;
			$('.combobox_ctn, .suggest_box_ctn').not(self.box).hide();
			self.position();
			self.box.show();
			self.control.addClass('active');
		},
		closeBox: function(){
			var self = this;
			self.box.hide();
			self.control.removeClass('active');
		}
    };
	
	$.fn.comboBox = function (options) {
        return this.each(function () {
            derive(_comboBox).init(options, this);
        });
    };
	
    $.fn.comboBox.options = {
    	maxLength: 8,
    	istree: false,
    	nameKey : 'text',
		valueKey : 'value',
		multiple : false,
    	loadFirstVal: false,
		onSelect: function(){},
		cancelSelect: function(){},
		callback: function(){}
    };
    
})(jQuery);