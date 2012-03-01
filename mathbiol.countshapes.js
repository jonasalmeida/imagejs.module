// ImageJS module to count shapes
console.log('shapecount library loaded');
// write module as a function call to avoid messing global scope

(function(){
	
	
	var id='countshapes'; // name of the modules attribute where module-specific stuff will be stored
	imagejs.modules[id]={ // this way all that pertains to the inner workings of this module stays in this branch
		start:function(){
			
		},
		end:function(){
			
		}
		
	}
	
	// Assemble CountShapes menu
	var ShapesMenu={
		Start:function(){
			imagejs.msg('Counting started ...');
			imagejs.modules[id].start();
			cvTop.style.left=cvBase.offsetLeft;cvTop.style.top=cvBase.offsetTop; // make sure the two canvas are aligned
		},
		End:function(){
			imagejs.msg('... counting ended.');
			imagejs.modules[id].end();
		}
	}
	jmat.gId('menu').appendChild(imagejs.menu(ShapesMenu,'CountShapes')); //assemble menu
	
})()



