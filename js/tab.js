;(function($){
	
	var Tab = function(tab){
		var _this_ = this;
		this.tab = tab;
		this.config ={
						"triggerType":"mouseover", //用来定义鼠标的触发类型
						"effect":"default",       //用来定义内容切换效果，直接或淡入淡出
						"invoke":2,               //用来定义展示第几个tab
						"auto":5000               //用来定义是否自动切换，时间用来表示间隔
					}
		
		if(this.getConfig()){
			$.extend(this.config, this.getConfig());
		}
		
		
		//console.log(this.getConfig())
		
		this.tabItems     = this.tab.find($('ul.tab_title li'));
		this.contentItems = this.tab.find($('div.tab-context div.context'));
		var config       = this.config;
		
		if(config.triggerType === "click"){
			//debugger;
			this.tabItems.bind(config.triggerType, function(){
				_this_.invoke($(this))
			});
		}else if(config.triggerType === "mouseover" || config.triggerType != "click"){
			this.tabItems.mouseover(function(){
				var self = $(this);
				this.timer = window.setTimeout(function(){
					_this_.invoke(self)
				},300);
				
			}).mouseout(function(){
				window.clearTimeout(this.timer)
			})
		}
		//自动切换
		if(config.auto){
			this.timer = null;
			this.loop = 0;
			
			this.autoPlay();
			console.log(_this_.loop)
		}
		this.tab.hover(function(){
				window.clearInterval(_this_.timer);
			},function(){
				
				_this_.autoPlay()
//				debugger;
			})
	}
	
	Tab.prototype ={
		
		//事件驱动
		invoke : function(activeTab){
			var _this_ = this;
			var index  = activeTab.index();
			activeTab.addClass('active').siblings().removeClass('active');
			var effect = this.config.effect;
			
			//alert(effect);
			if(effect === "default" || effect !='fade'){
				this.contentItems.eq(index).addClass("active").siblings().removeClass('active')
			}else if(effect ==='fade'){
				this.contentItems.eq(index).fadeIn().siblings().fadeOut();
			}
			
			if(this.config.auto){
				this.loop = index;
			}
		},
		//   自动切换 
		autoPlay : function(){
			var _this_ = this;
			var tabItems = this.tabItems;
			var tabLenght = tabItems.size();
			var config = this.config;
			this.timer = window.setInterval(function(){
				_this_.loop ++;
//				debugger;
				if(_this_.loop >= tabLenght){
					_this_.loop = 0
				}
//				console.log(_this_.loop)
//			debugger;
				tabItems.eq(_this_.loop).trigger(config.triggerType)
				
			}, config.auto)
			
		},
		//获取配置参数
		getConfig : function(){
			//获取tab节点上的config
			var config = this.tab.attr("data-config");
			if(config && config != ""){
				return $.parseJSON(config)
			}else{
				return null
			}
		}
		
		
	};
	
	window.Tab = Tab;
	
	
	
})(jQuery)
