var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var gameUI=(function(_super){
		function gameUI(){
			
		    this.sence=null;
		    this.ball=null;
		    this.arrow=null;
		    this.Obstacles=null;
		    this.score=null;
		    this.BtnLeft=null;
		    this.BtnRight=null;
		    this.squares=null;

			gameUI.__super.call(this);
		}

		CLASS$(gameUI,'ui.test.gameUI',_super);
		var __proto__=gameUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(gameUI.uiView);

		}

		gameUI.uiView={"type":"View","props":{"width":750,"height":1206},"child":[{"type":"Box","props":{"y":0,"x":0,"width":750,"var":"sence","name":"sence","height":1206},"child":[{"type":"Image","props":{"skin":"main/bg.jpg"}},{"type":"Image","props":{"y":800,"x":210,"var":"ball","skin":"main/ball.png","pivotY":26,"pivotX":26,"name":"ball"}},{"type":"Box","props":{"y":1080,"x":375,"width":360,"var":"arrow","rotation":0,"pivotY":10,"pivotX":180,"name":"arrow","height":20},"child":[{"type":"Image","props":{"y":-38,"x":-36,"skin":"main/arrow.png"}}]},{"type":"Box","props":{"y":0,"x":0,"width":750,"var":"Obstacles","name":"Obstacles","height":1206},"child":[{"type":"Box","props":{"y":100,"x":200,"width":280,"rotation":-30,"pivotY":13,"pivotX":140,"height":26},"child":[{"type":"Image","props":{"y":-2,"x":-9,"skin":"main/obstacle.png"}}]},{"type":"Box","props":{"y":100,"x":550,"width":280,"rotation":30,"pivotY":13,"pivotX":140,"height":26},"child":[{"type":"Image","props":{"y":-2,"x":-9,"skin":"main/obstacle.png"}}]},{"type":"Box","props":{"y":410,"x":710,"width":280,"rotation":80,"pivotY":13,"pivotX":140,"height":26},"child":[{"type":"Image","props":{"y":-2,"x":-9,"skin":"main/obstacle.png"}}]},{"type":"Box","props":{"y":410,"x":37,"width":280,"rotation":-80,"pivotY":13,"pivotX":140,"height":26},"child":[{"type":"Image","props":{"y":-2,"x":-9,"skin":"main/obstacle.png"}}]},{"type":"Box","props":{"y":870,"x":675,"width":280,"rotation":-60,"pivotY":13,"pivotX":140,"height":26},"child":[{"type":"Image","props":{"y":-2,"x":-9,"skin":"main/obstacle.png"}}]},{"type":"Box","props":{"y":870,"x":80,"width":280,"rotation":60,"pivotY":13,"pivotX":140,"height":26},"child":[{"type":"Image","props":{"y":-2,"x":-9,"skin":"main/obstacle.png"}}]}]},{"type":"Text","props":{"y":12,"x":17,"width":192,"var":"score","text":"得分：0","name":"score","height":43,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","bold":false,"align":"left"}}]},{"type":"Sprite","props":{"y":940,"x":0,"width":375,"var":"BtnLeft","height":265}},{"type":"Sprite","props":{"y":940,"x":375,"width":375,"var":"BtnRight","height":265}},{"type":"Box","props":{"y":0,"x":0,"width":750,"var":"squares","name":"squares","height":1206},"child":[{"type":"Image","props":{"y":425,"x":365,"skin":"main/3.jpg","rotation":45,"pivotY":25,"pivotX":25,"name":"green"}},{"type":"Image","props":{"y":425,"x":270,"skin":"main/1.jpg","rotation":-30,"pivotY":25,"pivotX":25,"name":"red"}},{"type":"Image","props":{"y":425,"x":460,"skin":"main/2.jpg","rotation":30,"pivotY":25,"pivotX":25,"name":"purple"}},{"type":"Image","props":{"y":515,"x":270,"skin":"main/3.jpg","rotation":45,"pivotY":25,"pivotX":25,"name":"green"}},{"type":"Image","props":{"y":515,"x":365,"skin":"main/1.jpg","pivotY":25,"pivotX":25,"name":"red"}},{"type":"Image","props":{"y":515,"x":460,"skin":"main/2.jpg","rotation":45,"pivotY":25,"pivotX":25,"name":"purple"}},{"type":"Image","props":{"y":605,"x":460,"skin":"main/3.jpg","rotation":-30,"pivotY":25,"pivotX":25,"name":"green"}},{"type":"Image","props":{"y":605,"x":270,"skin":"main/1.jpg","rotation":30,"pivotY":25,"pivotX":25,"name":"red"}},{"type":"Image","props":{"y":605,"x":365,"skin":"main/2.jpg","rotation":45,"pivotY":25,"pivotX":25,"name":"purple"}},{"type":"Image","props":{"y":1100,"x":650,"skin":"main/2.jpg","rotation":45,"pivotY":25,"pivotX":25,"name":"purple"}},{"type":"Image","props":{"y":1100,"x":100,"skin":"main/2.jpg","rotation":45,"pivotY":25,"pivotX":25,"name":"purple"}},{"type":"Image","props":{"y":820,"x":370,"skin":"main/3.jpg","rotation":0,"pivotY":25,"pivotX":25,"name":"green"}},{"type":"Image","props":{"y":240,"x":370,"skin":"main/2.jpg","rotation":0,"pivotY":25,"pivotX":25,"name":"purple"}}]}]};
		return gameUI;
	})(View);
var GameEndUI=(function(_super){
		function GameEndUI(){
			
		    this.FinalScore=null;
		    this.againBtn=null;

			GameEndUI.__super.call(this);
		}

		CLASS$(GameEndUI,'ui.test.GameEndUI',_super);
		var __proto__=GameEndUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameEndUI.uiView);

		}

		GameEndUI.uiView={"type":"Dialog","props":{"y":0,"x":0,"width":450,"visible":true,"popupCenter":true,"height":400,"alpha":1},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"main/coffee.jpg"}},{"type":"Text","props":{"y":70,"x":0,"width":450,"text":"游戏结束!","height":63,"fontSize":40,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Text","props":{"y":150,"x":0,"width":450,"var":"FinalScore","text":"得分：0","name":"FinalScore","height":59,"fontSize":35,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Sprite","props":{"y":260,"x":126,"width":200,"var":"againBtn","name":"againBtn","height":65},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"main/orange.png"}},{"type":"Text","props":{"y":11,"x":-3,"width":200,"text":"再玩一次","height":46,"fontSize":30,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}}]}]};
		return GameEndUI;
	})(Dialog);