// ImageJS module to count shapes
console.log('shapecount library loaded');
// write module as a function call to avoid messing global scope

(function(){
	
	var ShapesMenu={
		Start:function(){
			msg.innerHTML='Counting started ...';
			cvTop.style.left=cvBase.offsetLeft;cvTop.style.top=cvBase.offsetTop; // make sure the two canvas are aligned
		},
		End:function(){
			console.log('... counting ended.');
		}
	}
	jmat.gId('menu').appendChild(imagejs.menu(ShapesMenu,'CountShapes')); //assemble meny
	
})()



