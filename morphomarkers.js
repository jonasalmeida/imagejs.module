// Main Menu functions
// This is also a good template for writing imagejs modules.
// The main thing is to keep your code within a function call and not generate global variables.
// use instead imagejs.modules[yourModule] to store parameters and functions.

(function(){
	imagejs.msg('morphomarkers v0.1 loaded.'); // to notify via console and div#msg
	// code module
	// production url 'http://morphomarkers.imagejs.googlecode.com/git/morphomarkers.js';
	// development url 'http://localhost:8888/imagejs/morphomarkers/morphomarkers.js'
	var id='morphomarkers';
	imagejs.modules[id]={
		dist:function(dt,px){ //distance between image data and a pixel
			if(px.length==2){px=dt[px[0]][px[1]]} // in case the pixel coordinates rather than the pixel is being submitted as px
			//console.log(px);
			return jmat.imMap(dt,function(xy){
				// Euclidean distance 
				// notice px pixel value is passed to the function through the closure's scope
				return Math.pow(jmat.sum(xy.slice(0,3).map(function(xyi,i){return Math.pow((xyi-px[i]),2)})),1/2);
			})	
		},
		start:function(){
			cvTop.style.cursor='crosshair';
			cvTop.style.left=cvBase.offsetLeft;cvTop.style.top=cvBase.offsetTop; // make sure they're aligned
			var cvTopOnClick=function(evt){
				//imagejs.msg('Morphomarker acquisition ...');
				var x = evt.clientX-evt.target.offsetLeft;
				var y = evt.clientY-evt.target.offsetTop;
				//console.log(x,y);
				imagejs.msg('('+x+','+y+')');
				//if (jmat.max(imagejs.data.dt0[y][x].slice(0,3))>150){var C=[0,0,1]};else{var C=[1,1,0]} // use background
				var ctx=cvTop.getContext('2d');
				ctx.clearRect(0,0,this.width,this.height);
				var d = imagejs.modules[id].dist(imagejs.data.dt0,[y,x]);
				var thr = jmat.max(jmat.max(d))/5; // arbitrary startign threshold
				var bw = jmat.im2bw(d,thr); // threshold should be recoded to allow for a function
				var bw = jmat.arrayfun(bw,function(x){return 1-x}); // get the reciprocal
				jmat.imagesc(cvTop,bw); // display it
				var C=[1,1,0]; // always use yellow
				jmat.plot(cvTop,x,y,'+',{Color:C,MarkerSize:30});
				jmat.plot(cvTop,x,y,'o',{Color:C,MarkerSize:30});
				msg.innerHTML='<span style="color:blue">processing done.</span>'
			}
			jmat.gId('cvTop').onclick=function(evt){ // click on top for things hapenning in cvBase
				msg.innerHTML='<span style="color:red">processing, please wait ...</span>';
				var x = evt.clientX-evt.target.offsetLeft;
				var y = evt.clientY-evt.target.offsetTop;
				var C=[1,1,0]; // always use yellow
				jmat.plot(cvTop,x,y,'+',{Color:C,MarkerSize:30});
				jmat.plot(cvTop,x,y,'o',{Color:C,MarkerSize:30});
				//cvTopOnClick(evt);
				setTimeout(cvTopOnClick, 20, evt);				
			}
		},
		end:function(){
			//jmat.gId('cvBase').onclick=null;
			cvTop.style.cursor='default';
			cvTop.onclick=null
			}
	}
	
	// create menu to operate module
	var menu={
		Start:function(){
			imagejs.msg('Morphomarker acquisition active');
			imagejs.modules[id].start();
		},
		End:function(){
			imagejs.msg('Morphomarker acquisition ended');
			imagejs.modules[id].end();
		}
	}
	var name= 'Morphomarkers v0.1';
	jmat.gId('menu').appendChild(imagejs.menu(menu,name)); 
	
	
})()