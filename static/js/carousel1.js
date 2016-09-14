function Carousel(){
	
	//this.imgWrapper   = $('.imgList');
	this.preImgList   = $('.dropify-render img');
	//this.imgList      = this.getCarouselImgList();

	//this.setImgInitialOpacity();

}
Carousel.prototype.start = function(){
	if(!this.imgList.length || this.imgList.length == 1){
		return;
	}
	var index = 0;
	var imgTransform = function(){
		var last = index;
		if (index == this.imgList.length-1){
			index = 0;
		}else{
			index++;
		}
			
		this.fadeOut(this.imgList[last]);
		this.fadeIn(this.imgList[index]); 

	}.bind(this);

	var intervalId = setInterval(imgTransform, 3000);
	
	this.imgWrapper.on('mouseover', function(){
		clearInterval(intervalId);
	})

	this.imgWrapper.on('mouseout', function(){
		intervalId = setInterval(imgTransform, 3000);
	})
}

Carousel.prototype.setImgInitialOpacity = function(){
	for (var i=0; i<this.imgList.length; i++){
		if (i != 0){
			this.setOpacity(this.imgList[i], 0);
		}
	}
}
Carousel.prototype.getCarouselImgList = function(){
	this.imgWrapper = $('.imgList');
	for (var i=0; i<this.preImgList.length; i++){
		var src = this.preImgList[i].src;
		var element = '<img src="' + src + '" alt="favorite picture" id="img_' + i + '" />';
		this.imgWrapper.append(element);
	}
	if(this.preImgList.length){
		this.imgListReady = true;
	}
	//return $('.imgList img');	
}




Carousel.prototype.fadeIn = function(elem){
	this.setOpacity(elem, 0)
	var _this = this;
	for(var i=1; i<=20; i++){
		(function(i){
			setTimeout(function(){
			_this.setOpacity(elem, 5*i)}, i*25)
		})(i)
	}
}

Carousel.prototype.fadeOut = function(elem){
	var _this = this;
	for(var i=1; i<=20; i++){
		(function(i){
			setTimeout(function(){
			_this.setOpacity(elem, 100 - 5*i)}, i*25)
		})(i)
	}
}

Carousel.prototype.setOpacity = function(elem, level){
	if(elem.filters){
		elem.style.filter = "alpha(opacity=" + level + '")';
	}else{
		elem.style.opacity = level/100;
	}
}

export{Carousel};
