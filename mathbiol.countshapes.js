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
			this.segmentationStats(divCountShapes.id); // action
			this.alignCanvas();
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
			var H='';
			// First line, file name and close button
			H+='<button style="color:red" onclick="this.parentElement.parentElement.removeChild(this.parentElement);imagejs.modules.'+id+'.alignCanvas()">[x]</button>';
			H+=' File :<span class="countShapesFile" style="color:blue"></span>';
			H+=' .<br>';
			// Second line, Segmentation Statistics
			H+='<button style="color:green" onclick="imagejs.modules.'+id+'.segmentationStats(\''+divCountShapes.id+'\')">Segmentation</button>';
			H+=' Density <span style="color:blue" class="countShapesDensity"> ... </span>';
			H+=' Intensity <span style="color:blue" class="countShapesIntensity"> ... </span>';
			H+=' .<br>';
			//H+='<table>';
			//H+='<tr><td>File:</td><td class="countShapesFile" style="color:blue">...</td><td>Density:</td><td class="countShapesDensity" style="color:blue">...</td></tr>';
			//H+='</table>';
			//H+='<tr><td>Circularity:</td><td class="countShapesCircularity">...</td></tr>';
			//H+='<tr><td>Intensity:</td><td class="countShapesIntensity">...</td></tr>';
			//H+='<tr><td>Density:</td><td class="countShapesDensity" style="color:blue">...</td></tr>';
			//H+='<table>';
			//H+='<tr><td><button onclick="imagejs.modules.'+id+'.featuresTable(\''+divCountShapes.id+'\')">Features</button> Number:</td><td class="countShapesFeatures" style="color:blue">...</td></tr>';
			//H+='</table>';
			H+='<button onclick="imagejs.modules.'+id+'.featuresStats(\''+divCountShapes.id+'\')" style="color:green">Features</button> Number: <span class="countShapesFeatures" style="color:blue">...</span>'
			divCountShapes.innerHTML = H;
			menu.appendChild(divCountShapes);
			return divCountShapes;
		},
		segmentationStats:function(divId){
			console.log(divId);
			$('#'+divId+' .countShapesFile').html(imagejs.data.fname);
			imagejs.data.size=jmat.size(imagejs.data.seg);
			imagejs.data.n=jmat.prod(imagejs.data.size);
			imagejs.data.density = jmat.sum(jmat.sum(imagejs.data.seg))/imagejs.data.n;
			var d = imagejs.data.density*100+'';if(d.length>6){d=d.slice(0,6)};
			$('#'+divId+' .countShapesDensity').html(d + ' %');
			//imagejs.data.IrgbTotal=imagejs.data.dt0.map(function(x){
			//	return x.map(function(y){return y}).reduce(function(a,b){
			//		return [a[0]+b[0],a[1]+b[1],a[2]+b[2]]
			//		})
			//	}).reduce(function(a,b){
			//	return [a[0]+b[0],a[1]+b[1],a[2]+b[2]]
			//});
			//imagejs.data.IrgbTotal.map(function(x){return x/imagejs.data.n});
			imagejs.data.IrgbSeg=imagejs.data.dt0.map(function(x,i){
				return x.map(function(y,j){
						if (imagejs.data.seg[i][j]>0){return y}
						else {return [0,0,0]}
					}).reduce(function(a,b){
					return [a[0]+b[0],a[1]+b[1],a[2]+b[2]]
					})
				}).reduce(function(a,b){
				return [a[0]+b[0],a[1]+b[1],a[2]+b[2]]
			});
			imagejs.data.IrgbNonSeg=imagejs.data.dt0.map(function(x,i){
				return x.map(function(y,j){
						if (imagejs.data.seg[i][j]>0){return [0,0,0]}
						else {return y}
					}).reduce(function(a,b){
					return [a[0]+b[0],a[1]+b[1],a[2]+b[2]]
					})
				}).reduce(function(a,b){
				return [a[0]+b[0],a[1]+b[1],a[2]+b[2]]
			});
			imagejs.data.IrgbSeg=imagejs.data.IrgbSeg.map(function(x){return x/(imagejs.data.n*imagejs.data.density)});
			imagejs.data.IrgbNonSeg=imagejs.data.IrgbNonSeg.map(function(x){return x/(imagejs.data.n*(1-imagejs.data.density))});
			$('#'+divId+' .countShapesIntensity').html('RGB = ['+jmat.shorten(imagejs.data.IrgbSeg,5)+'], vs background: ['+jmat.shorten(jmat.innerfun(imagejs.data.IrgbSeg,imagejs.data.IrgbNonSeg,function(a,b){return a/b}),5)+']');
			//imagejs.modules[id][divId].features = jmat.extractSegs(jmat.clone(jmat.edges(imagejs.data.seg)));
			//$('#'+divId+' .countShapesFeatures').html(imagejs.modules[id][divId].features.length);
		},
		featuresStats:function(divId){
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



