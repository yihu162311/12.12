// 数组forEach方法补丁
Array.prototype.forEach = [].forEach || function(callback){
	var a = 0,
		len = this.length;
	while(a < len){
		callback(this[a], a++, this);
	}
};
// 数组map方法补丁
Array.prototype.map = [].map || function(callback){
	var a = 0,
		len = this.length,
		result = [];
	while(a < len){
		result.push(callback(this[a], a++, this));
	}
	return result;
};
// 数组filter方法补丁
Array.prototype.filter = [].filter || function(callback){
	var a = -1,
		len = this.length,
		result = [];
	while(++a < len){
		callback(this[a], a, this) && result.push(this[a]);
	}
	return result;
};

/*封装banner方法*/
function createBanner(option){
	var container = document.getElementById("banner"),
		fragment = document.createDocumentFragment(),
		images = option.map(function(item){
			return fragment.appendChild(createImage(item));
		}),
		len = data.length,
		a = 0,
		timer = createTimer();
	/*创建一个container容器*/
	function createImage(option){
		var img = document.createElement("a");
		img.title = option.title;
		img.style.backgroundImage = "url(" + option.bg + ")";
		return img;
	};
	
	/*创建按钮*/
	function createButton(className){
		var i = document.createElement("i");
		i.className ="icon " + className;
		i.onclick = function(){
			clearInterval(timer);
			timer = createTimer();
			var _a = a;
			if(className === "left"){
				a = a <= 0 ? len - 1 : a - 1 ;
			}else{
				a = a >= len - 1 ? 0 : a + 1 ;
			}
			images[_a].className = null;
			images[a].className = "current";
		};
		return i;
	}
	/*设置定时器*/
	function createTimer(){
		return setInterval(function(){
			var _a = a;
			a = a >= len - 1 ? 0 : a + 1 ;
			images[_a].className = "";
			images[a].className = "current";
		},5000);
	}
	
	images[a].className = "current";
	
	fragment.appendChild(createButton("left"));
	fragment.appendChild(createButton("right"));
//	console.dir(fragment);
	container.appendChild(fragment);
	
};

var data = [
	{
		title : "banner1",
		bg : "./img/ban1.png",
		bgc : "#475168",
	},
	{
		title : "banner2",
		bg : "./img/ban2.png",
		bgc : "./img/ban2_bg.jpg"
	},
	{
		title : "banner3",
		bg : "./img/ban3.png",
		bgc : "./img/ban3_bg.jpg"
	}
];
createBanner(data);