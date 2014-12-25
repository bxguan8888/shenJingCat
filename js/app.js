//看下人家是如何解决从另一个js中引用另一个js资源的

var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);   //refresh the stage every 1/30 second

var gameView = new createjs.Container();
gameView.x=30;
gameView.y=30;
stage.addChild(gameView);


var circleArr = [[],[],[],[],[],[],[],[],[]];
var currentCat;
var MOVE_NONE = -1, MOVE_LEFT =0, MOVE_UP_LEFT=1, MOVE_UP_RIGHT=2, MOVE_RIGHT=3, MOVE_DOWN_LEFT=4, MOVE_DOWN_RIGHT=5;


function getMoveDir(){
	//left
	var can =true;
	var distanceMap=[];    //总结下 看看人家hashtable用的多简洁！
	for(var x= currentCat.indexX; x>=0;x--){
		if(circleArr[x][currentCat.indexY].getCircleType() === Circle.TYPE_SELECTED){
			can = false;
			distanceMap[MOVE_LEFT]=currentCat.indexX-x;
			break; 
		}
	}
	if(can){
		return MOVE_LEFT;
	}

	//up left
	can=true;
	var x = currentCat.indexX, y=currentCat.indexY;
	while(true){
		if(circleArr[x][y].getCircleType()===Circle.TYPE_SELECTED){
			can=false;
			distanceMap[MOVE_UP_LEFT]=currentCat.indexY-y;
			break;
		}
		if(y%2==0){
			x--;
		}
		y--;
		if(y<0 || x< 0){
			break; 
		}
	}
	if(can){
		return MOVE_UP_LEFT;
	}


	//up right
	can=true;
	x = currentCat.indexX, y=currentCat.indexY;
	while(true){
		if(circleArr[x][y].getCircleType()===Circle.TYPE_SELECTED){
			can=false;
			distanceMap[MOVE_UP_RIGHT]=currentCat.indexY-y;
			break;
		}
		if(y%2){
			x++;
		}
		y--;
		if(y<0 || x> 8){
			break; 
		}
	}
	if(can){
		return MOVE_UP_RIGHT;
	}


	//right
	for(var x= currentCat.indexX; x<9;x++){
		if(circleArr[x][currentCat.indexY].getCircleType() === Circle.TYPE_SELECTED){
			can = false;
			distanceMap[MOVE_RIGHT]=x-currentCat.indexX;
			break; 
		}
	}
	if(can){
		return MOVE_RIGHT;
	}


	//down right
	can=true;
	x = currentCat.indexX, y=currentCat.indexY;
	while(true){
		if(circleArr[x][y].getCircleType()===Circle.TYPE_SELECTED){
			can=false;
			distanceMap[MOVE_DOWN_RIGHT]=y-currentCat.indexY;
			break;
		}
		if(y%2){
			x++;
		}
		y++;
		if(y>8 || x> 8){
			break; 
		}
	}
	if(can){
		return MOVE_DOWN_RIGHT;
	}


	//down left
	can=true;
	x = currentCat.indexX, y=currentCat.indexY;
	while(true){
		if(circleArr[x][y].getCircleType()===Circle.TYPE_SELECTED){
			can=false;
			distanceMap[MOVE_DOWN_LEFT]=y-currentCat.indexY;
			break;
		}
		if(y%2==0){
			x--;
		}
		y++;
		if(y>8 || x<0){
			break; 
		}
	}
	if(can){
		return MOVE_DOWN_LEFT;
	}
	var maxDist=-1, maxDir=-1; 
	for(var dir=0; dir<distanceMap.length-1;dir++){
		if(distanceMap[dir]>maxDist){
			maxDir=dir;
			maxDist=distanceMap[dir];
		}
	}
	if(maxDist>1){
		return maxDir;
	}else{
		return MOVE_NONE;
	}
}

function circleClick(event){
	if(event.target.getCircleType()!=Circle.TYPE_CAT){
		event.target.setCircleType(Circle.TYPE_SELECTED);
		
	}else{
		return;
	}
	if(currentCat.indexX==0 || currentCat.indexX==8 || currentCat.indexY==0 || currentCat.indexY==8  ){
		alert("game over!");
		return;
	}


	var dir=getMoveDir();
	var x= currentCat.indexX, y=currentCat.indexY;
	switch(dir){
		case 0: //left
			circleArr[currentCat.indexX-1][currentCat.indexY].setCircleType(Circle.TYPE_CAT);
			currentCat.setCircleType(Circle.TYPE_UNSELECTED);
			currentCat=circleArr[currentCat.indexX-1][currentCat.indexY];
			break;
		case 1: //up left
			x=y%2?x:(x-1);
			circleArr[x][y-1].setCircleType(Circle.TYPE_CAT);
			currentCat.setCircleType(Circle.TYPE_UNSELECTED);
			currentCat=circleArr[x][y-1];
			break;
		case 2: //up right
			x=y%2?(x+1):x;
			circleArr[x][y-1].setCircleType(Circle.TYPE_CAT);
			currentCat.setCircleType(Circle.TYPE_UNSELECTED);
			currentCat=circleArr[x][y-1];
			break;
		case 3: //right
			circleArr[currentCat.indexX+1][currentCat.indexY].setCircleType(Circle.TYPE_CAT);
			currentCat.setCircleType(Circle.TYPE_UNSELECTED);
			currentCat=circleArr[currentCat.indexX+1][currentCat.indexY];
			break;
		case 4: //down left
			x=y%2?x:(x-1);
			circleArr[x][y+1].setCircleType(Circle.TYPE_CAT);
			currentCat.setCircleType(Circle.TYPE_UNSELECTED);
			currentCat=circleArr[x][y+1];
			break;
		case 5: //down right
			x=y%2?(x+1):x;
			circleArr[x][y+1].setCircleType(Circle.TYPE_CAT);
			currentCat.setCircleType(Circle.TYPE_UNSELECTED);
			currentCat=circleArr[x][y+1];
			break;
		default:
			alert("you win!");
			return;
	}



	// var leftCircle=	circleArr[currentCat.indexX-1][currentCat.indexY];
	// var rightCircle=	circleArr[currentCat.indexX+1][currentCat.indexY];
	// var leftTopCircle=	circleArr[currentCat.indexX-1][currentCat.indexY-1];
	// var rightTopCircle=	circleArr[currentCat.indexX][currentCat.indexY-1];
	// var leftBottomCircle=	circleArr[currentCat.indexX-1][currentCat.indexY+1];
	// var rightBottomCircle=	circleArr[currentCat.indexX][currentCat.indexY+1];

	// if(leftCircle.getCircleType() ==1){
	// 	leftCircle.setCircleType(3);
	// 	currentCat.setCircleType(1);
	// 	currentCat=leftCircle;
	// }else if(rightCircle.getCircleType() ==1){
	// 	rightCircle.setCircleType(3);
	// 	currentCat.setCircleType(1);
	// 	currentCat=rightCircle;
	// }else if(leftTopCircle.getCircleType() ==1){
	// 	leftTopCircle.setCircleType(3);
	// 	currentCat.setCircleType(1);
	// 	currentCat=leftTopCircle;
	// }else if(rightTopCircle.getCircleType() ==1){
	// 	rightTopCircle.setCircleType(3);
	// 	currentCat.setCircleType(1);
	// 	currentCat=rightTopCircle;
	// }else if(leftBottomCircle.getCircleType() ==1){
	// 	leftBottomCircle.setCircleType(3);
	// 	currentCat.setCircleType(1);
	// 	currentCat=leftBottomCircle;
	// }else if(rightBottomCircle.getCircleType() ==1){
	// 	rightBottomCircle.setCircleType(3);
	// 	currentCat.setCircleType(1);
	// 	currentCat=rightBottomCircle;
	// }else{
	// 	alert("game over!");
	// }
}

function addCircles(){
	for(var indexY=0;indexY<9;indexY++){
		for(var indexX=0;indexX<9;indexX++){
			var c = new Circle();
			gameView.addChild(c);
			circleArr[indexX][indexY]=c;
		
			c.indexX=indexX;
			c.indexY=indexY;
			c.x=indexY%2?indexX*55+25 : indexX*55;
			c.y=indexY*55;

			if(indexY==4 && indexX==4){
				c.setCircleType(3);
				currentCat=c;
			}else if(Math.random()<0.1){
				c.setCircleType(Circle.TYPE_SELECTED);
			}
			c.addEventListener("click",circleClick);   //1. 查下event 是一个什么struct  2. 向下若纯用JS应该如何操作？
				
			
		}
	}
}
addCircles();