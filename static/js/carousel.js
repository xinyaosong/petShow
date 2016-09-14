const carousel = function(){
	const TIME = 2000;
	function setImgInitialOpacity(_this){
		for (var i=0; i<_this.imgList.length; i++){
			if (i != 0){
				setOpacity(_this.imgList[i], 0);
			}
		}
	}

	function fadeIn(elem){
		setOpacity(elem, 0)
		for(var i=1; i<=20; i++){
			(function(i){
				setTimeout(function(){
				setOpacity(elem, 5*i)}, i*25)
			})(i)
		}
	}

	function fadeOut(elem){
		
		for(var i=1; i<=20; i++){
			(function(i){
				setTimeout(function(){
				setOpacity(elem, 100 - 5*i)}, i*25)
			})(i)
		}
	}

	function setOpacity(elem, level){
		if(elem.filters){
			elem.style.filter = "alpha(opacity=" + level + '")';
		}else{
			elem.style.opacity = level/100;
		}
	}

	function handleMark(last_index, cur_index){
		var marks = $('#imgMark li');
		$(marks.get(last_index)).removeClass('on');
		$(marks.get(cur_index)).addClass('on');
	}

	return {
		start: function(){
			var _this = this;
			this.imgWrapper   = $('.imgListWrapper');
			this.imgList      = $('.imgListWrapper img');
			this.index 		  = 0;

			if(!this.imgList.length || this.imgList.length == 1){
				return;
			}

			setImgInitialOpacity(_this); //set all imgs opacity=0 except the first one

			// carousel
			var imgTransform = function(){
				var last = this.index;
				if (this.index == this.imgList.length-1){
					this.index = 0;
				}else{
					this.index = this.index+1;
				}

				this.fade(last, this.index);
				handleMark(last, this.index)

			}.bind(this);

			var intervalId = setInterval(imgTransform, TIME);
			
			//bind the mouseover and mouseout event on the img
			this.imgList.on('mouseover', function(){
				clearInterval(intervalId);
			})
			this.imgList.on('mouseout', function(){
				intervalId = setInterval(imgTransform, TIME);
			})

			//bind the mouseover and mouseout event on the img mark(li)
			$('#imgMark').on( {
				'mouseover': function(){ clearInterval(intervalId);},
				'mouseout': function(){ intervalId = setInterval(imgTransform, TIME);}
			},'li')


		},

		fade: function(last_index,cur_index){
			if (last_index == cur_index) return 
			fadeOut( this.imgList[last_index] );
			fadeIn( this.imgList[cur_index] );	
		},

		markClick: function(cur_index){
			const last_index = this.index;
			this.fade(last_index, cur_index);
			this.index = cur_index;
			handleMark(last_index, cur_index);
		}
	}
}()

export{carousel};
