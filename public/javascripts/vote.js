$(document).ready(function($) {

	var voteFn = {
		userStr: function(objs) {
			var str = '';
			for(var i=0; i<objs.length; i++) {
				str += '<li>'        
	                + '<div class="head">'
	                + '<a href="/vote/detail/' + objs[i].id + '">'
	                + '<img src="' + objs[i].head_icon + '" alt="">'
	                + '</a>'
	                + '</div>'
	                + '<div class="up">'
	                + '<div class="vote">'
	                + '<span>' + objs[i].vote + '票</span>'
	                + '</div>'
	                + '<div class="btn" id=' + objs[i].id + '>'
	                + '投TA一票'
	                + '</div>'
	                + '</div>'
	                + '<div class="descr">'
	                + '<a href="/vote/detail/' + objs[i].id + '">'
	                + '<div>'
	                + '<span>' + objs[i].username + '</span>'
	                + '<span>|</span>'
	                + '<span>编号#' + objs[i].id + '</span>'
	                + '</div>'
	                + '<p>' + objs[i].descrption + '</p>'
	                + '</a>'
	                + '</div>'
	               	+ '</li>';
			}
			return str;
		},
	}

	$.ajax({
		url: '/vote/index/data?limit=10&offset=0',
		type: 'GET',
		success: function(data) {
			data = JSON.parse(data);
			console.log(data)
			if(data.errno === 0) {
				var userData = data.data.objects;
				var userHtml = voteFn.userStr(userData);
				$('.coming').html(userHtml);
			}else {
				alert(data.msg)
			}
		}
	})


	var limit = 10;
	var offset = 10

	loadMore({       
		callback: function(load){
	        $.ajax({
	            url: '/vote/index/data?limit=' + limit + '&offset=' + offset,
	            type: 'GET',
	            success: function(data) {
	                data = JSON.parse(data);
	                var total = data.data.total;
	                if(offset < total) {
	                	var userData = data.data.objects;
						var userHtml = voteFn.userStr(userData);
	                	setTimeout(function(){
							$('.coming').append(userHtml); //每次插完数据后执行复位
	                	    load.reset();  //复位  
	                	}, 1000)
	                } else {
	                	//不需要加载
	                	load.complete();  //完成
	                	setTimeout(function(){
	                	    load.reset(); 
	                	}, 1000)
	                }
                    offset += limit;
	            }
	        })
	    }
	});

});