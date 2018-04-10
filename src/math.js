var importantMath = function(){
    var _self = this;

    _self.ballQuality = 10;							//球的质量
    _self.gravity = 9.8 * _self.ballQuality;		//重力

    //加速度的计算
    _self.Acceleration = function(F,t){
        return F / _self.ballQuality * t;
    }//end func

    //浮点数的加法
    _self.FloatPointAdd = function(a,b,bit){
        var digit = bit || 10000;
        return (Math.floor(a * digit) + Math.floor(b * digit)) / digit;
    }//end func

	//角度转换
	_self.convertAngle = function(deg){
		return Math.PI / 180 * deg;
	}//end func

    //碰撞检测
	_self.ballHitTest = function(source, ball){
		var res = {
			x:0,
			y:0,
			hit:false,
			surface:0
		};
		if(source && ball){
			var rotation = - _self.convertAngle(source.rotation);
			var sourceX = source.x - source.width/2;
			var sourceY = source.y - source.height/2;
			var trfBall = {
				x: Math.cos(rotation) * (ball.x - source.x) - Math.sin(rotation) * (ball.y - source.y) + source.x,
				y: Math.sin(rotation) * (ball.x - source.x) + Math.cos(rotation) * (ball.y - source.y) + source.y
			};
			
			if (trfBall.x < sourceX){
				res.x = sourceX;
				res.surface = 3;
			}
			else if (trfBall.x > sourceX + source.width){
				res.x = sourceX + source.width;
				res.surface = 1;
			}
			else {
				res.x = trfBall.x;
			}

			if (trfBall.y < sourceY) {
                res.y = sourceY;
            } else if (trfBall.y > sourceY + source.height) {
                res.y = sourceY + source.height;
				res.surface = 2;
            } else {
                res.y = trfBall.y;
            }

			var distance = _self.PointDistance(trfBall.x,trfBall.y,res.x,res.y);
			if(distance < ball.width / 2) {
				res.hit = true;
				CorrectHitPoint(source,ball,res,rotation)
			}
		}//end if
		return res;
	}//end func

	//修正碰撞点
	function CorrectHitPoint(source,ball,res,rotation){
		var trfball = {		//旋转后的球位置修正
			x: res.x,
			y: res.y
		};
		if(res.surface == 0) trfball.y = res.y - ball.width / 2;
		if(res.surface == 1) trfball.x = res.x + ball.width / 2;
		if(res.surface == 2) trfball.y = res.y + ball.width / 2;
		if(res.surface == 3) trfball.x = res.x - ball.width / 2;

		ball.x = Math.cos(-rotation) * (trfball.x - source.x) - Math.sin(-rotation) * (trfball.y - source.y) + source.x;
		ball.y = Math.sin(-rotation) * (trfball.x - source.x) + Math.cos(-rotation) * (trfball.y - source.y) + source.y;
	}//end func

	//两点间距离
	_self.PointDistance = function(x1,y1,x2,y2){
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	}//end func
}

var imath = new importantMath();