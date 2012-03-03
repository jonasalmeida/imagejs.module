// ImageJS module to count shapes
console.log('shapecount library loaded');
// write module as a function call to avoid messing global scope

(function(){
	
	
	var id='countshapes'; // name of the modules attribute where module-specific stuff will be stored
	imagejs.modules[id]={ // this way all that pertains to the inner workings of this module stays in this branch
		New:function(){
			var divCountShapes=this.createCountDiv();
			imagejs.modules[id].currentDivId=divCountShapes.id;// current count div
			imagejs.modules[id][divCountShapes.id]={}; // save count results here
			this.fillDiv(divCountShapes.id); // action
			
			
		},
		end:function(){
			
		},
		alignCanvas:function(){
			if($('#cvTop').length>0){
				cvTop.style.left=cvBase.offsetLeft;cvTop.style.top=cvBase.offsetTop // make sure the two canvas are aligned
			}
		},
		createCountDiv:function(){
			var divCountShapes=$('<div>')[0];
			divCountShapes.id=jmat.uid('divCountShapes');
			//divCountShapes.style.width=200;
			$(divCountShapes).addClass("ui-widget-content");
			var H='<button style="color:red" onclick="this.parentElement.parentElement.removeChild(this.parentElement);imagejs.modules.'+id+'.alignCanvas()">[x]</button>';
			H+=' | <button style="color:green" onclick="imagejs.modules.'+id+'.fillDiv(\''+divCountShapes.id+'\')">[>]</button>'
			H+='<table>';
			H+='<tr><td>File:</td><td class="countShapesFile" style="color:blue">...</td><td>Density:</td><td class="countShapesDensity" style="color:blue">...</td></tr>';
			H+='</table>';
			//H+='<tr><td>Circularity:</td><td class="countShapesCircularity">...</td></tr>';
			//H+='<tr><td>Intensity:</td><td class="countShapesIntensity">...</td></tr>';
			//H+='<tr><td>Density:</td><td class="countShapesDensity" style="color:blue">...</td></tr>';
			H+='<table>';
			H+='<tr><td><button onclick="imagejs.modules.'+id+'.featuresTable(\''+divCountShapes.id+'\')">Features</button> number:</td><td class="countShapesFeatures" style="color:blue">...</td></tr>';
			H+='</table>';
			divCountShapes.innerHTML = H;
			menu.appendChild(divCountShapes);
			return divCountShapes;
		},
		fillDiv:function(divId){
			console.log(divId);
			$('#'+divId+' .countShapesFile').html(imagejs.data.fname);
			imagejs.data.density = jmat.sum(jmat.sum(imagejs.data.seg))/jmat.prod(jmat.size(imagejs.data.seg));
			var d = imagejs.data.density*100+'';if(d.length>6){d=d.slice(0,6)};
			$('#'+divId+' .countShapesDensity').html(d + ' %');
			//imagejs.modules[id][divId].features = jmat.extractSegs(jmat.clone(jmat.edges(imagejs.data.seg)));
			//$('#'+divId+' .countShapesFeatures').html(imagejs.modules[id][divId].features.length);
		},
		featuresTable:function(divId){
			imagejs.data.segs = jmat.extractSegs(jmat.clone(imagejs.data.seg));
			$('#'+divId+' .countShapesFeatures').html(imagejs.data.segs.length);
			
		}
		
	}
	
	// Assemble CountShapes menu
	var ShapesMenu={
		New:function(){
			//imagejs.msg('Counting started ...');
			console.log('Counting started ...');
			imagejs.modules[id].New();
			imagejs.modules[id].alignCanvas(); 
		},
		End:function(){
			imagejs.msg('');
			console.log('... counting ended.');
			imagejs.modules[id].end();
			imagejs.modules[id].alignCanvas();
		}
	}
	jmat.gId('menu').appendChild(imagejs.menu(ShapesMenu,'CountShapes')); //assemble menu
	
	//Miscelaneous
	$('#menu').onchange=function(){this.alignCanvas()};
	$('#msg').onchange=function(){this.alignCanvas()};
	
})()



