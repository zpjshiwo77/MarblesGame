var iUI,iDialog;
var ball = {},arrow = {};
var AnimionTimer = true;
var obstacles = [];
var squares = {};
var scoreBox,score = 0;

//test
//页面初始化
function pageInit(){
	layaInit();
} 
pageInit();

//laya场景初始化
function layaInit(){
	Laya.MiniAdpter.init();
	Laya.init(750, 1206,Laya.WebGL);
	Laya.stage.scaleMode = "noborder";
	Laya.stage.alignH = "center";
	Laya.stage.alignV = "center";
	Laya.loader.load("res/atlas/main.atlas",laya.utils.Handler.create(this, loadComplate), null);
}

//资源加载完毕
function loadComplate(){
	UIinit();
	eventInit();
	Laya.stage.addChild(iUI);
	ArrowRotating();
	ballSpeedCount();
}//end func

//事件初始化
function eventInit(){
	iUI.BtnLeft.on("mousedown",this,rotateArrow,["left"]);
	iUI.BtnRight.on("mousedown",this,rotateArrow,["right"]);
	iDialog.againBtn.on("mousedown",this,resetGame);
}

//ui初始化
function UIinit(){
	iUI = new gameUI();
	iDialog = new GameEndUI();
	console.log(iDialog);
	console.log(iUI)
	ball.ui = iUI.ball;
	ball.quality = 10;					//球的质量
	// ball.ui.x = 360;
	ball.Xspeed = 0;					//球水平方向的速度
	ball.Yspeed = 0;					//球垂直方向的速度
	ball.Xforce = 0;					//球水平方向的受力状况
	ball.Yforce = 0;					//球垂直方向的受力状况
	arrow.ui = iUI.arrow;
	arrow.elasticity = 0.5;				//控制物的弹力系数  建议值 0 - 1  1时无动能损失
	arrow.speed = 0;
	arrow.rotationLimit = 25;
	// arrow.ui.rotation = -30;
	scoreBox = iUI.score;
	initObstacles();
}//end func

//初始化障碍物
function initObstacles(){
	for (var i = 0; i < iUI.Obstacles._childs.length; i++) {
		var item = {};
		item.ui = iUI.Obstacles._childs[i];
		item.elasticity = 0.7;
		item.score = 30;
		obstacles.push(item);	
	}

	addSquares();
}//end func

//加入方块
function addSquares(){
	for (var i = 0; i < iUI.squares._childs.length; i++) {
		var item = {};
		item.ui = iUI.squares._childs[i];
		if(item.ui.name == "red"){
			item.elasticity = 0.7;
			item.score = 40;
			item.hitTimes = 1;
		}
		else if(item.ui.name == "green"){
			item.elasticity = 0.8;
			item.score = 50;
			item.hitTimes = 2;
		}
		else if(item.ui.name == "purple"){
			item.elasticity = 0.9;
			item.score = 60;
			item.hitTimes = 3;
		}
		item.id = "ball"+i;
		item.ui.visible = true;
		squares["ball"+i] = item;
	}
}//end func

//重置游戏
function resetGame(){
	score = 0;
	renderScore();
	ball.ui.x = 210;
	ball.ui.y = 800;
	ball.Xspeed = 0;
	ball.Yspeed = 0;
	AnimionTimer = true;
	ballSpeedCount();
	iDialog.close();
	addSquares();
}//end func

//旋转控制物
function rotateArrow(dir){
	if(arrow.speed == 1 || arrow.speed == -1 || arrow.speed == 0){
		if(dir == "left") arrow.speed = -3;
		else arrow.speed = 3;
	}
}//end func

//控制物的旋转
function ArrowRotating(){
	if(arrow.ui.rotation > arrow.rotationLimit){
		arrow.speed = -1;
	}
	else if(arrow.ui.rotation < -arrow.rotationLimit){
		arrow.speed = 1;
	}

	if(arrow.ui.rotation == 0 && (arrow.speed == 1 || arrow.speed == -1)){
		arrow.speed = 0;
	}
	else{
		arrow.ui.rotation += arrow.speed;
	}
	requestAnimationFrame(function(){
		ArrowRotating();
	});
}//end func

//渲染分数
function renderScore(){
	scoreBox.text = "得分："+score;
	iDialog.FinalScore.text = "得分："+score;
}//end func

//球速度的计算
function ballSpeedCount(){
	HorizontalSpeedBall();
	VerticalSpeedBall();
	ballAllHitTest();
	requestAnimationFrame(function(){
		if(AnimionTimer) ballSpeedCount();
	});
}//end func

//水平速度计算
function HorizontalSpeedBall(){
	var Force = ball.Xforce;
	ball.Xspeed = imath.FloatPointAdd(ball.Xspeed, imath.Acceleration(Force,0.0167));
	ball.ui.x += ball.Xspeed
	ball.Xforce = 0;
}//end func

//垂直速度计算
function VerticalSpeedBall(){
	var Force = imath.FloatPointAdd(ball.Yforce, imath.gravity);
	ball.Yspeed = imath.FloatPointAdd(ball.Yspeed, imath.Acceleration(Force,0.0167));
	ball.ui.y += ball.Yspeed
	ball.Yforce = 0;
}//end func

//球的越界检测
function ballOutTest(){
	var bool = false;
	if(ball.ui.x > 776 || ball.ui.x < -26 || ball.ui.y > 1235 || ball.ui.y < -26) bool = true;
	return bool;
}//end func

//球的全部碰撞检测计算
function ballAllHitTest(){
	var OutTest = ballOutTest();
	if(!OutTest){
		ballThingHitTest(arrow,true);
		for (var i = 0; i < obstacles.length; i++) {
			ballThingHitTest(obstacles[i],false);
		}
		for (var i in squares) {
			if(squares[i] != null) ballThingHitTest(squares[i],false);
		}
	}
	else{
		AnimionTimer = false;
		iDialog.show();
	}
}//end func

//球与物体的碰撞检测
function ballThingHitTest(thing,extForce){
	var res = imath.ballHitTest(thing.ui, ball.ui);
	if(res.hit) {
		AnimionTimer = false;
		CountForce(thing,res,extForce);
		ball.Yspeed = 0;
		ball.Xspeed = 0;
		addScore(thing);
		reduceHitTimes(thing);
		
		requestAnimationFrame(function(){
			AnimionTimer = true;
			ballSpeedCount();
		});
	}
}//end func

//增加分数
function addScore(thing){
	if(thing.hasOwnProperty("score")){
		score += thing.score;
		renderScore();
	}
}//end func

//减少碰撞次数
function reduceHitTimes(thing){
	if(thing.hasOwnProperty("hitTimes")){
		thing.hitTimes--;
		if(thing.hitTimes == 0){
			thing.ui.visible = false;
			squares[thing.id] = null;
		}
	}
}//end func

//计算力
function CountForce(ele,res,ext){
	var counterforce = Counterforce(ele, res);
	var extForce = {x:0,y:0}; //外力

	if(ext) extForce = CounterExtForce(res);
	ball.Xforce = counterforce.Xforce + extForce.x;
	ball.Yforce = counterforce.Yforce + extForce.y;
}//end func

//计算外力
function CounterExtForce(res){
	var force = {
		x:0,
		y:0
	};

	if(arrow.speed > 2 || arrow.speed < -2){
		var deg = imath.convertAngle(arrow.ui.rotation);
		var iforce = arrow.speed * 5000 * (ball.ui.x - arrow.ui.x) / (arrow.ui.width / 2);	//力

		if(res.surface == 0){
			iforce = iforce < 0 ? iforce : 0;
			iforce -= 1500;
			force.x = -iforce * Math.sin(deg);
			force.y = iforce * Math.cos(deg);
		}
		else if(res.surface == 2){
			iforce = -iforce;
			iforce = iforce > 0 ? iforce : 0;
			iforce += 1500;
			force.x = -iforce * Math.sin(deg);
			force.y = iforce * Math.cos(deg);
		}
	}
	// console.log(force)
	return force;
}//end func

//反作用力
function Counterforce(ele, res){
	var force = {
		Xforce:0,
		Yforce:0
	};

	var rotateDir = ele.ui.rotation > 0 ? 1 : -1;											//旋转方向
	var rotation = Math.abs(ele.ui.rotation); 												//不带方向的旋转角度
	var deg = imath.convertAngle(rotation);													//不带方向的旋转弧度
	var sinDeg = Math.sin(deg);																//正弦
	var cosDeg = Math.cos(deg);																//余弦
	var XdirF = ball.Xspeed * ball.quality * ele.elasticity / 0.0167;						//X方向所产生的反作用力
	var YdirF = ball.Yspeed * ball.quality * ele.elasticity / 0.0167 - imath.gravity;		//Y方向所产生的反作用力
	var XdpsF = {																			//X方向的实际反作用力（坐标系为物体旋转后的坐标系）
		force: 0,																			//力
		xdir: 0,																			//x方向
		ydir: 0,																			//y方向
	};
	var YdpsF = {																			//Y方向的实际反作用力（坐标系为物体旋转后的坐标系）
		force: 0,
		xdir: 0,
		ydir: 0
	};													
	
	if(rotateDir == 1 && (res.surface == 0 || res.surface == 2)){
		XdpsF.force = XdirF * sinDeg;
		XdpsF.xdir = -1 * sinDeg;
		XdpsF.ydir = 1 * cosDeg;
		YdpsF.force = YdirF * cosDeg;
		YdpsF.xdir = 1 * sinDeg;
		YdpsF.ydir = -1 * cosDeg;
	}
	else if(rotateDir == 1 && (res.surface == 1 || res.surface == 3)){
		XdpsF.force = XdirF * cosDeg;
		XdpsF.xdir = 1 * cosDeg;
		XdpsF.ydir = 1 * sinDeg;
		YdpsF.force = YdirF * sinDeg;
		YdpsF.xdir = -1 * cosDeg;
		YdpsF.ydir = -1 * sinDeg;
	}
	else if(rotateDir == -1 && (res.surface == 0 || res.surface == 2)){
		XdpsF.force = XdirF * sinDeg;
		XdpsF.xdir = -1 * sinDeg;
		XdpsF.ydir = -1 * cosDeg;
		YdpsF.force = YdirF * cosDeg;
		YdpsF.xdir = -1 * sinDeg;
		YdpsF.ydir = -1 * cosDeg;
	}
	else if(rotateDir == -1 && (res.surface == 1 || res.surface == 3)){
		XdpsF.force = XdirF * cosDeg;
		XdpsF.xdir = -1 * cosDeg;
		XdpsF.ydir = 1 * sinDeg;
		YdpsF.force = YdirF * sinDeg;
		YdpsF.xdir = 1 * cosDeg;
		YdpsF.ydir = -1 * sinDeg;
	}

	force.Xforce = imath.FloatPointAdd(XdpsF.xdir * XdpsF.force, YdpsF.xdir * YdpsF.force);
	force.Yforce = imath.FloatPointAdd(XdpsF.ydir * XdpsF.force,  YdpsF.ydir * YdpsF.force);

	return force;
}//end func
