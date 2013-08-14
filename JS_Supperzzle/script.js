$(document).ready(function() {
	var rows = 10;
	var colums = 10;
	var divButtonList = new Array(rows*colums);
	var colorsList = ["red", "blue", "yellow", "green", "purple", "black", "gray"];
	var allCanRemove = false;

	function DivButton(row, colum, color){
		this.row = row;
		this.colum = colum;
		this.color = color;
		this.canRemove = false;
		this.getClass = function(){
			var btnClass = this.row*colums+this.colum;
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
			}else{
				return this.color;
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
			}else{
				this.color = color;
			}
		};
	};
	
	var initDivButtons = function(){
		for(var i=0; i<rows; i++){
			for(var j=0; j<colums; j++){
				var number = Math.random()*(colorsList.length-1);
				var random = Math.round(number);
				var button = new DivButton();
				button.row = i;
				button.colum = j;
				button.color = colorsList[random];
				divButtonList[i*colums+j] = button;
			}
		}
	};
	
	var initColors = function(){
		for(var i=0; i<rows; i++){	
			$('body').append("<div>");
			for(var j=0; j<colums; j++){
				var index = i*colums+j;
				$('body').append("<div id='"+divButtonList[index].color+"' class='"+index+"'></div>");
			}
			$('body').append("</div>");
		}
	};
	
	var checkCanRemove = function(){
		for(var i=0; i<rows; i++){
			for(var j=0; j<colums; j++){
				var index = i*colums+j;
				var btn = divButtonList[index];
				if(index < (rows-2)*colums){
					var downLimit = (rows-1)*colums+j;
					var color = btn.color;
					var count = 1;
					for(var n=index; n+=colums; n<downLimit){
						var downBtn = divButtonList[n];
						color = divButtonList[n-colums].color;
						var downColor = downBtn.color;
						if(color === downColor){
							count++;
						}else{
							if(count >= 3){
								var rIndex = index;
								while(rIndex < n){
									divButtonList[rIndex].canRemove = true;
									rIndex+=colums;
								}
								allCanRemove = true;
							}
							break;
						}
					}
				}
				/*if(j < colums-2){
					var rightLimit = (i+1)*colums;
					var color = btn.color;
					var count = 1;
					for(var n=index+1; n++; n<rightLimit){
						var rightBtn = divButtonList[n];
						color = divButtonList[n-1].color;
						var rightColor = rightBtn.color;
						if(color === rightColor){
							count++;
						}else{
							if(count >= 3){
								for(var m=n-1; m--; m>=index){
									divButtonList[m].canRemove = true;
								}
								allCanRemove = true;
							}
							break;
						}
					}
				}*/
			}
		}
	}
	
	var doRemove = function(btn1, btn2){
		swap(btn1, btn2);
		checkCanRemove();
		alert(allCanRemove);
		if(allCanRemove===false){
			swap(btn1, btn2);
		}
		removeAll();
		//alert(divButtonList.length);
		/*for(var i=0; i<divButtonList.length; i++){
			var btn = divButtonList[i];
			var color = btn.color;
			alert(color);
		}*/
	}
	
	var removeAll = function() {
		for(var i=0; i<divButtonList.length; i++){
			if(divButtonList[i].canRemove === true){
				$(divButtonList[i].getClass()).fadeOut("slow");
				$(divButtonList[i].getClass()).fadeIn("slow");
			}
		}
	}
	
	var swap = function(btn1, btn2){
		var btnColor1 = btn1.getColor();
		var btnColor2 = btn2.getColor();
		$(btn1.getClass()).fadeOut("slow");
		divButtonList[btn1.row*colums+btn1.colum].setColor(btnColor2);
		$(btn1.getClass()).css("background", btnColor2);
		$(btn1.getClass()).fadeIn("slow");
		
		$(btn2.getClass()).fadeOut("slow");
		divButtonList[btn2.row*colums+btn2.colum].setColor(btnColor1);
		$(btn2.getClass()).css("background", btnColor1);
		$(btn2.getClass()).fadeIn("slow");
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
				var distance = selectedDiv2.row*colums+selectedDiv2.colum-selectedDiv.row*colums-selectedDiv.colum;
				var absDistance = Math.abs(distance);
				if(absDistance===1 || absDistance===colums){
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
});