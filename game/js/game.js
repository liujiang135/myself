/*
* @Author: Administrator
* @Date:   2017-05-10 18:24:38
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-02 18:17:20
*/

'use strict';

/*
属性
	a--z
	个数
	速度
	score
	声明
	事件

方法
	产生
	掉
	消除
	next
	重新开始
 */

/*1.属性
	a--z
	个数
原型对象
开始  运行  传入要动的个数
创建这几个元素


获取5个元素
	让数组循环执行5次

获取单个元素
	获取随机下表
	获取随机值
	创建元素
	给这个元素定位   zuo  top
	定义元素的样式
	把随机取得的值给了元素，
	把元素给添加进浏览器中
	放到一个数组中

下降：
	给元素个高度
	让下降
	高度移动*/
	// 利用时间函数


function Game(){
	// this.chararr=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'];
	this.chararr=[];
    for(let i=0;i<26;i++){
        let ele1=String.fromCharCode(Math.floor(Math.random()*26)+65);
        this.chararr.push(ele1);
    }
    // this.speed1=prompt('请输入速度（1-10）','');

	this.speed=2;
	this.charlength=5;
	this.cw=window.innerWidth;
	this.ch=window.innerHeight;
	this.currentele=[];  //存放当前页面中的元素
	this.currentpos=[];
	this.oldpos=[];
	this.sm=10;  //生命
	this.score=0;  //得分
	this.gq=1;  //关卡
	this.max=10; //得分

	this.span1=document.querySelector('h1 span');
    this.span2=document.querySelector('h2 span');
    this.span3=document.querySelector('h3 span');
    // this.maxscore=document.querySelector('h4 span');
    // this.maxlength=document.querySelector('h5 span');
    this.stop1=document.querySelector('.stop');
    this.continu=document.querySelector('.continu');
    this.span1.innerText=this.score;
    // this.span2.innerText=this.sm;
    this.span3.innerText=this.gq;
    // this.maxscore.innerText=this.max;
    // this.maxlength.innerText=this.charlength;

    this.sm2=document.querySelector('.sm2');
    this.sm3=document.querySelector('.sm3');
    this.sm3.style.width='85px';
    this.pao = document.querySelector('.pao');
    this.begin1 = document.querySelector('.begin');
}

Game.prototype={
	start:function(){
		this.key();
		this.stop(this.stop1);
		this.continue1(this.continu);
		this.begin();
	},
	begin:function(){
		let self = this;
		this.begin1.onclick = function(){
			self.drop();
			self.getElements(self.charlength);
			self.begin1.style.display = 'none';
		}
		/*document.body.onkeydown=function(e){
			if(e.keyCode == 13){
				alert(1)
				self.drop();
				self.getElements(self.charlength);
				self.begin1.style.display = 'none';
			}
		}*/
	},
	key:function(){  //按键输入
		document.body.onkeydown=function(e){
			let code=String.fromCharCode(e.keyCode); //按键值  转换成字符串
			for(let i=0;i<this.currentele.length;i++){
				let self = this;
				if(code == this.currentele[i].innerText){
					let top12 = this.currentele[i].offsetTop+this.speed;
					let left12 = this.currentele[i].offsetLeft;
					this.pao.style.display = 'block';
					let dangqian = this.currentele[i];
					let pao1 = this.pao;
					setTimeout(function(){    //炮弹往伞兵上打
						pao1.style.left =left12+31+'px';
						pao1.style.top =top12+80+'px';
						self.pao.style.transition ='all 0.5s ease';
					},0)
					setTimeout(function(){     //伞兵继续往下落10,被击中后消失
						dangqian.style.transition ='all 0.5s linear';
						dangqian.style.top = dangqian.offsetTop+10+'px';
					},0);
					setTimeout(function(){     //炮弹大掉伞兵后一起消失
						document.body.removeChild(dangqian);
						// self.pao.style.display = 'none';
					},600);
                    this.currentele.splice(i,1);
                    this.currentpos.splice(i,1);
                    // 得分  +     给了    分数
					this.score++;
                    this.span1.innerText=this.score;
                    if(this.score>=this.max){
                    	clearInterval(this.t);
                    	this.next();
					}
				}
				setTimeout(function(){
						self.pao.style.top ='444px';
						self.pao.style.left ='233px';
						self.pao.style.display = 'block';
						self.pao.style.transition ='all 0s ease';
				},500)

			}
			if(this.currentele.length < this.charlength){
				this.getChar();
			}
		}.bind(this);  //绑定this  把外边的this传到函数当中
	},
	getElements:function(length){
		for(let i=0;i<length;i++){
			this.getChar();
		}
	},
	checkrepeat:function(text){   //消除数字重复
		let a=this.currentele.some(function(value,index,obj){
			return value.innerText==text;
		})
		return a;
	},
    checkPosition:function(lefts){
        return this.currentpos.some(function(value){
            return value+80>lefts&&lefts+80>value;
        })
    },
	checkposition:function(lefts){  //消除位置重复
         return this.currentpos.some(function(value){
				return (lefts+80) > value && (lefts-80)<value ;
		})
	},
	getChar:function(){
		let num = Math.floor(Math.random()*this.chararr.length);
        while(this.checkrepeat(this.chararr[num])){
            num = Math.floor(Math.random()*this.chararr.length);
        }
		let ele=document.createElement('div');
		let tops=Math.random()*100,
			lefts=Math.random()*(this.cw-400)+200;
		while(this.checkposition(lefts)){
            lefts=Math.random()*(this.cw-400)+200;
		}
        this.currentpos.push(lefts);
		ele.style.cssText=`
			width: 80px;
			height: 100px;
			background-image: url('img/yun.png');
			// background-image: url('img/yezi.png');
           background-size:80px 100px;
			text-align: center;
			line-height:50px;
			font-size:26px;
			color:yellow;
			// color:#000;
			font-weight:bold;
			position:absolute;
			left:${lefts}px;
			top:${tops}px;
			`;
		ele.innerText=this.chararr[num];
		document.body.appendChild(ele);
		this.currentele.push(ele);
	},
	drop:function(){
		let self=this;
		self.t=setInterval(function(){
			for(let i=0;i<self.currentele.length;i++){
				let tops=self.currentele[i].offsetTop+self.speed;
                self.currentele[i].style.top=tops+'px';
                
				if(tops>=(self.ch-100)){
					document.body.removeChild(self.currentele[i]);
					self.currentele.splice(i,1);
					self.currentpos.splice(i,1);
                    // 生命 +   给了 生命
                    self.sm--;
					// self.span2.innerText=self.sm;
                    self.sm3.style.width=self.sm2.offsetWidth*(self.sm/10)+'px';
					if(self.sm<=0){
						clearInterval(self.t);
						self.flag=window.confirm('您失败了，要重来一次吗？');
						if(self.flag){
                            self.restart();
						}else{
                            window.open('error错误弹框.html','_blank','width=500,height=500,left=200,top=200');
						}
					}
				}
				if(self.currentele.length<self.charlength){
					self.getChar();
				}
			}
		},100)
	},
	stop:function(stop1){
		let self = this;
		stop1.onclick=function(){
			clearInterval(self.t);
		}.bind(this)
	},
    continue1:function(go){
    	let self = this;
		go.onclick=function(){
			self.drop();
		}.bind(this);
	},
    restart:function(){
        clearInterval(this.t);
        for(let i=0;i<this.currentele.length;i++){
        	document.body.removeChild(this.currentele[i]);
		}
        this.speed=2;
        this.score=0;
        this.sm=10;
        this.gq=1;
        this.currentele=[];
        this.currentpos=[];
        this.span1.innerText=this.score;
        // this.span2.innerText=this.sm;
        this.span3.innerText=this.gq;
        this.max=10;
        this.charlength=5;
        // this.maxscore.innerText=this.max;
        // this.maxlength.innerText=this.charlength;
        this.sm3.style.width='85px';
        this.start();
        this.begin1.style.display = 'block';
        this.begin();
		// 初始状态
		/*
		*
		* 停止   
		* 元素删除  数据  for循环清空数组
		* 					重新建数组，创生命、分数、得分
		* 生命 分数
		* start
		*
		* */
	},
	next:function(){
        window.open('pass.html','_blank','width=300,height=50,left=500,top=100');
		/*if(!confirm('恭喜通关，是否进入下一关？')){
			close();
		}*/
        
    	clearInterval(this.t);
    	for(let i=0;i<this.currentele.length;i++){
    		document.body.removeChild(this.currentele[i]);
		}
        this.speed=this.speed+0.5;
        this.score=0;
        this.gq++;
        this.max++;
        this.charlength++;
        this.currentele=[];
        this.currentpos=[];
        this.span1.innerText=this.score;
        // this.span2.innerText=this.sm;
        this.span3.innerText=this.gq;
        // this.maxscore.innerText=this.max;
        // this.maxlength.innerText=this.charlength;
        this.drop();
        this.getElements(self.charlength);
        this.start();
	}
}


