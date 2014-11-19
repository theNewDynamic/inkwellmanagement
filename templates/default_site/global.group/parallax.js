window.onload=function(){if(typeof jQuery==="undefined"){alert("ERROR: parallax.js requires jQuery.")}else{var a=function(){parallax.width=window.innerWidth;parallax.height=window.innerHeight};a();$(window).resize(function(){a()})}};var parallaxPage=function(a,b){return{key:a,page:b,right:function(a){return this.transition({left:parallax.width,top:0},{left:-parallax.width,top:0},a)},left:function(a){return this.transition({left:-parallax.width,top:0},{left:parallax.width,top:0},a)},top:function(a){return this.transition({left:0,top:-parallax.height},{left:0,top:parallax.height},a)},bottom:function(a){return this.transition({left:0,top:parallax.height},{left:0,top:-parallax.height},a)},transition:function(a,b,c){if(!parallax.sliding){parallax.sliding=true;var d=this;if(parallax.current!==this){this.hide(a);if(typeof parallax.preload==="function"){parallax.preload()}if(typeof this.preload==="function"){this.preload()}this.slide({left:0,top:0},function(){d.makeCurrent();if(typeof c==="function"){c()}});if(typeof parallax.current!=="undefined"){parallax.current.slide(b,function(){parallax.sliding=false})}parallax.slideBackground(a)}}return this},slide:function(a,b){this.page.css("display","block");this.page.stop().animate(a,parallax.speed,parallax.easing,function(){if(typeof b==="function"){b()}})},hide:function(a){a=a||{left:parallax.width,top:0};this.page.css("display","none");this.page.css(a);return this},show:function(a){a=a||{left:0,top:0};if(typeof parallax.current!=="undefined"){parallax.current.hide()}this.makeCurrent();this.page.css("display","block");this.page.css(a);return this},makeCurrent:function(){if(this===parallax.current){return false}else{if(typeof parallax.current!=="undefined"){parallax.current.hide();parallax.last=parallax.current}if(parallax.updateUrl===true){this.updateUrl()}if(typeof parallax.onload=="function"){parallax.onload()}if(typeof this.onload==="function"){this.onload()}parallax.current=this}return true},updateUrl:function(){var a=document.URL;a=a.lastIndexOf("#")===-1?a:a.substring(0,a.lastIndexOf("#"));window.location.href=a+"#"+this.key},ackbar:function(){alert(this.key+" thinks it's a trap!");return this}}};var parallax={speed:800,easing:"swing",sliding:false,unusableNames:["last","current","background","onload","updateUrl","preload"],scaling:.15,add:function(a,b){var c=true;if(typeof a==="object"){try{b=a;a=a.attr("id")}catch(d){c=false;alert("ERROR:Page object lacks an id")}}else if(typeof a!=="string"){c=false;alert("ERROR:undefined key")}if(typeof b!=="object"){c=false;alert("ERROR:undefined page")}if(c){validKeyName=true;for(propName in this){if(propName===a){validKeyName=false}}if($.inArray(a,this.unusableNames)!==-1){validKeyName=false}if(validKeyName){this[a]=parallaxPage(a,b);this[a].hide();this[a].page.css("position","absolute")}else{alert("ERROR:'"+a+"' cannot be used as a page identifier")}}return this},fromUrl:function(){var a=document.URL.lastIndexOf("#");if(a!==-1){pageName=document.URL.substring(a+1,document.URL.length);if(parallax.hasOwnProperty(pageName)){return parallax[pageName]}}},slideBackground:function(a){if(typeof this.background!=="undefined"&&typeof a!=="undefined"){$(this.background).animate({"background-position-x":"+="+ -a.left*parallax.scaling+"px","background-position-y":"+="+ -a.top*parallax.scaling+"px"},parallax.speed,parallax.easing)}}}