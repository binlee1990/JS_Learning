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
		this.getColor = function(){
			if(this.color === "red"){
				return "#FF0000";
			}else if(this.color === "green"){
				return "#008800";
			}else if(this.color === "blue"){
				return "#0000FF";
			}else if(this.color === "yellow"){
				return "#E2BE22";
			}
		};
		this.setColor = function(color) {
			if(color === "#FF0000"){
				this.color = "red";
			}else if(color === "#008800"){
				this.color = "green";
			}else if(color === "#0000FF"){
				this.color = "blue";
			}else if(color === "#E2BE22"){
				this.color = "yellow";
			}
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
	
	var doRemove = function(btn1, btn2){
		swap(btn1, btn2);
		var canRemove = removeButtons();
	}
	
	var removeButtons = function(){
	
	}
	
	var swap = function(btn1, btn2){
		var btnColor1 = btn1.getColor();
		var btnColor2 = btn2.getColor();
		divButtonList[btn1.row*10+btn1.colum].setColor(btnColor2);
		$(btn1.getClass()).css("background", btnColor2);
		
		divButtonList[btn2.row*10+btn2.colum].setColor(btnColor1);
		$(btn2.getClass()).css("background", btnColor1);
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
				var distance = selectedDiv2.row*10+selectedDiv2.colum-selectedDiv.row*10-selectedDiv.colum;
				if(distance===1 || distance===10 || distance===-1 || distance===-10){
					doRemove(selectedDiv, selectedDiv2);
					var btnClass1 = selectedDiv.getClass();
					$(btnClass1).css({border: "0px solid black"});
					selectedDiv = null;
					selectedDiv2 = null;
					situation = 0;
				}else {
					var btnClass1 = selectedDiv.getClass();
					$(btnClass1).css({border: "0px solid black"});
					situation = $(this).attr('class');
					$(this).css({border: "2px solid black"});
					selectedDiv = divButtonList[situation];
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