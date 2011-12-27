// Main Menu functions
// This is also a good template for writing imagejs modules.
// The main thing is to keep your code within a function call and not generate global variables.
// use instead imagejs.modules[yourModule] to store parameters and functions.

imagejs.msg('morphomarkers v0.1 loaded'); // to notify via console and div#msg

(function(){
	var menu={
		Start:function(){imagejs.msg('Morphomarker acquisition started')},
		End:function(){imagejs.msg('Morphomarker acquisition ended')}
	}
	var name= 'Morphomarkers v0.1';
	jmat.gId('menu').appendChild(imagejs.menu(menu,name)); 
})()