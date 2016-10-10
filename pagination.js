(function($){

	var defaults = {
		total : 0,
		nowPage : 1,
		count : 10,
		callback : null
	};

	var boxOutwidth = 33,
		boxEllipsisWidth = 25;

	var checkoutOption = function(o){
		o.total = parseInt(o.total);
		o.nowPage = parseInt(o.nowPage);
		o.count = parseInt(o.count);
		o.pageNum =  Math.ceil(o.total/o.count);

		if( !o.total || !o.nowPage || !o.count ){
			console.warn("分页组件配置有误");
			return false;
		}
		return o;
	};


	$.fn.pagination = function(options){
		var o = $.extend({},defaults,options);

		o = checkoutOption(o);
		if(!o){return;}
		
		var bind = function($dom,callback){
			
			// 绑定点击前一页
			$dom.find('.p_box-prev').click(function(){
				o.nowPage --;
				render($dom,callback);
				if(callback){
					callback(o.nowPage);
				}
			});
			// 绑定点击后一页
			$dom.find('.p_box-next').click(function(){
				o.nowPage ++;
				render($dom,callback);
				if(callback){
					callback(o.nowPage);
				}
			});
			// 绑定输入页面跳转
			$dom.find('.p_box-goto').click(function(){
				var page = parseInt($(this).parent().find('.goto_page').val());
				if(page > o.pageNum || page < 1 || page === o.nowPage){return;}
				o.nowPage = page;
				render($dom,callback);
				if(callback){
					callback(o.nowPage);
				}
			});
			//绑定按钮页面跳转
			$dom.find('.p_box-page').click(function(){
				var page = parseInt($(this).text());
				o.nowPage = page;
				render($dom,callback);
				if(callback){
					callback(o.nowPage);
				}
			});

			// 输入页数控制
			$dom.find('.goto_page').keyup(function(e){
				var value = $(this).val().replace(/[^\d]/g,'');
				if(value === ""){

				}else if(value < 1 || value > o.pageNum){
					value = o.nowPage;
				}else if(value > o.pageNum){
					value = o.nowPage;
				}
				$(this).val(value);
				if(e.keyCode === 13){
					$dom.find('.p_box-goto').click();
				}
			});
		};

		var render = function($dom,callback){

			var width = 80+boxOutwidth+boxOutwidth;
			var dom = '';
			var i;

			// 头部
			dom += '<div class="paginationbox">';
			if(o.nowPage == 1){
				dom += '<div class="p_box"><</div>';
			}else{
				dom += '<div class="p_box p_box-prev"><</div>';
			}
			// 中间
			if(o.pageNum <= 5){
				for(i=1;i<=o.pageNum;i++){
					if(i === o.nowPage){
						dom += '<div class="p_box p_box-active">'+ i +'</div>';
					}else {
						dom += '<div class="p_box p_box-page">'+ i +'</div>';
					}
					width += boxOutwidth;
				}
			
			}else if(o.nowPage <=3){
				for(i=1;i<=o.nowPage+1;i++){
					if(o.nowPage === i){
						dom += '<div class="p_box p_box-active">'+ i +'</div>';
					}else {
						dom += '<div class="p_box p_box-page">'+ i +'</div>';
					}
					width += boxOutwidth;
				}
				dom += '<div class="p_box-ellipsis">...</div>'+
						'<div class="p_box p_box-page">'+ o.pageNum +'</div>';
				width += boxOutwidth + boxEllipsisWidth;

			}else if(o.nowPage+3 > o.pageNum ){
				dom += '<div class="p_box p_box-page">1</div>'+
					'<div class="p_box-ellipsis">...</div>';
				width += boxOutwidth + boxEllipsisWidth;
				for(i=o.nowPage-1;i<=o.pageNum;i++){
					if(o.nowPage === i){
						dom += '<div class="p_box p_box-active">'+ i +'</div>';
					}else {
						dom += '<div class="p_box p_box-page">'+ i +'</div>';
					}
					width += boxOutwidth;
				}
			}else {
				dom += '<div class="p_box p_box-page">1</div>'+
					'<div class="p_box-ellipsis">...</div>';
				dom += 	'<div class="p_box p_box-page">'+ (o.nowPage-1) +'</div>'+
						'<div class="p_box p_box-active">'+ o.nowPage +'</div>'+
						'<div class="p_box p_box-page">'+ (o.nowPage+1) +'</div>';
				dom += '<div class="p_box-ellipsis">...</div>'+
						'<div class="p_box p_box-page">'+ o.pageNum +'</div>';
				width += boxEllipsisWidth*2 + boxOutwidth*5;
			}

			//  尾部
			if(o.nowPage === o.pageNum){
				dom += '<div class="p_box">></div>';
			}else {
				dom += '<div class="p_box p_box-next">></div>';
			}

			dom += '<div class="p_box-input"> \
				<input type="text" class="goto_page" value="'+o.nowPage+'">\
				</div>\
				<div class="p_box-goto">GO</div>\
				</div>';

			$dom.css('width',width);
			$dom.html(dom);
			bind($dom,callback);
		};
		render($(this),o.callback);

		return this;
	};

})(jQuery);