$(document).ready(function() {
	function DivButton(row, colum, color){
		this.row = row;
		this.colum = colum;
		this.color = color;
		this.getClass = function(){
			var btnClass = this.row*10+this.colum;
			btnClass = '.'+btnClass;
			return btnClass;
		};
	};
	
	var rows = 10;
	var colums = 10;
	var divButtonList = new Array(rows*colums);
	var colorsList = ["red", "blue", "yellow", "green"];
	
	var initDivButtons = function(){
		for(var i=0; i<rows; i++){
			for(var j=0; j<colums; j++){
				var number = Math.random()*3;
				var random = Math.round(number);
				var button = new DivButton();
				button.row = i;
				button.colum = j;
				button.color = colorsList[random];
				divButtonList[i*10+j] = button;
			}
		}
	};
	
	var initColors = function(){
		for(var i=0; i<rows; i++){	
			$('body').append("<div>");
			for(var j=0; j<colums; j++){
				var index = i*10+j;
				$('body').append("<div id='"+divButtonList[index].color+"' class='"+index+"'></div>");
			}
			$('body').append("</div>");
		}
	};
	
	var swap = function(btn1, btn2){
		
		
	}
	
	var doRemove = function(btn1, btn2){
		swap(btn1, btn2);
	}
	
	initDivButtons();
	initColors();
	var selectedDiv = null;
	var selectedDiv2 = null;
	var situation = 0;
	
	$('div').click(function(){
		if(situation === 0){
			situation = $(this).attr('class');
			$(this).css({border: "2px solid black"});
			selectedDiv = divButtonList[situation];
		}else{
			if(situation === $(this).attr('class')){
				$(this).css({border: "0px solid black"});
				situation = 0;
				selectedDiv = null;
			}else{
				selectedDiv2 = divButtonList[$(this).attr('class')];
				var distance = Math.abs(selectedDiv2.row*10+selectedDiv2.colum-selectedDiv.row*10-selectedDiv.colum);
				if(distance===1 || distance===10){
					alert(selectedDiv.getClass());
					doRemove(selectedDiv.getClass(), selectedDiv2.getClass());
					selectedDiv = null;
					selectedDiv2 = null;
					situation = 0;
				}
			}
		}
	});
	
	/*$('div').mouseenter(function() {
		$(this).css({border: "2px solid black"})
		
	});
	
	$('div').mouseleave(function() {
		$(this).css({border: "0px solid black"})
	});*/
});