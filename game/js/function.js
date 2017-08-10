/*
* @Author: Administrator
* @Date:   2017-04-28 11:46:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-10 10:31:38
*/

'use strict';
/*
	$('.list')
	$('#list')
	$('div')
	$(function(){
	})
*/


//获取标签
//    去空   判断类型   判断字符串	判断 . #    获得 字符串
function $(selector,ranger = document){
    let type=typeof selector;
    if(type == 'string'){
        //元素的获取
        let select = selector.trim();
        let first = select.charAt(0);
        if(first=='.'){
            return ranger.getElementsByClassName(select.substring(1));
        }else if(first=='#'){
            return document.getElementById(select.substring(1));
        }else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(select)){     // 正则//    ^开头   $结尾
            return ranger.getElementsByTagName(select);
        }else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(select)){     // 正则//    ^开头   $结尾
            return document.createElement(select.slice(1,-1));
        }
    }else if(typeof selector=='function'){
        /*//添加事件
        window.onload=function(){
            selector();
        }*/
        addEvent(window,'load',selector);
    }
    function addEvent(obj,type,fn){
        obj.addEventListener(type,fn,false);
    }
}


/*html(obj,contant)	 设置或获取某一个元素的内容	
obj  指定的对象		
contant	设置的内容 ，没有--》表示获取内容	有--》  设置内容*/
function html(obj,content){  	
//content  没传 就是undefined  就是false
	if(content){
		// 》设置
		return obj.innerHTML=content;
	}else{
		// 获取
		return obj.innerHTML;
	}
}


//获取属性   如何实现兼容
function getStyle(obj,attr){
	if(window.getComputedStyle){
		return getComputedStyle(obj,null)[attr];
	}else{
		alert(2);
		return obj.currentStyle[attr];
	}
}


/*getChild()   获取指定元素的子元素节点
1. 所有子节点
2. 筛选
*/
function getChilds(obj){
	let childs=obj.childNodes;
	let arr=[];
	childs.forEach(function(value){
		if(value.nodeType==1){
			arr.push(value);
		}
	})
	return arr;
}


/*
	getFirst
*/
function getFirst(obj){
	let arr=getChilds(obj);
	return arr[0];
	// return obj.firstChild;
}

/*
	getLast
*/
function getLast(obj){
	let arr1=getChilds(obj)
	return arr1[arr1.length-1];
	// return obj.lastChild;
}

function getNum(obj,num){
	let childs=getChilds(obj);
	return childs[num];
}

/*
	getNext
	！ 判断是不是最后一个
	1.下一个兄弟节点 a
	2. 不是a  继续循环判断下一个兄弟节点
*/
function getNext(obj){
	let a=obj.nextSibling;
	if(a===null){
		return false;
	}
	while(a.nodeType!=1){
		a=a.nextSibling;
		if(a===null){
			return false;
		}
	}
	return a;
}


// obj(父元素).在box之前插入ele
function insertbe(obj,ele,box){
	obj.insertBefore(ele,box);  	
}


//给obj的第一个子元素前插入ele
//把一个元素插入到另一个元素的前面
/*let box=document.querySelector('.box');
let p1=document.querySelector('.dot');
infirst(box.p1)*/
function pretend(obj,ele){
	let first=obj.firstElementChild;
	obj.insertBefore(ele,first);
}

// 把一个元素插入到另一个元素的后面
// 给 obj 后面插入 ele
// 给 box 后面插入 p1
/*let box=document.querySelector('.box');
let p1=document.querySelector('.dot');
infirst(box,p1)*/
function insertAfter(obj,ele){
	let next=obj.nextElementSibling;
	let parent=obj.parentNode;
	parent.insertBefore(ele,next);
}


//给（父元素）obj中第pos位置插入ele元素
function charu(obj,ele,pos = 0){
    if(pos==0){
        let first=obj.firstElementChild;
        obj.insertBefore(ele,first);
    }
    if(pos>=obj.children.length-1){
        obj.appendChild(ele);
    }
    let next=obj.children[pos].nextElementSibling;
    obj.insertBefore(ele,next);   
}




	
// 拖拽物体移动
// let box=document.querySelector(".box");
// drag(box);
	function drag(obj){
		obj.onmousedown=function(e){
		//  e 相当于鼠标的点
			let ox=e.offsetX;
			let oy=e.offsetY;
			obj.onmousemove=function(e){
				let cx=e.clientX;
				let cy=e.clientY;
				box.style.left=cx-ox+'px';
				box.style.top=cy-oy+'px';
			}
		}
		obj.onmouseup=function(){
			obj.onmousemove=null;
			obj.onmouseup=null;
		}
	}


	//鼠标滚轮事件    操作的元素，向上滚动事件，向下滚动事件
	/*let box=$('.box')[0];
	mouseWheel(box,function(){
	   box.style.background='green';
	},function(){
	   box.style.background='blue';
	})*/
	function mouseWheel(obj,upfn,downfn){
		obj.addEventListener('mousewheel',fn,false);
		function fn(e){
            e.preventDefault();
			let dir=e.wheelDelta;
			if(dir==120 || dir == 150 || dir == 180){
				upfn.call(obj);
			}else if(dir==-120 || dir == -150 || dir == -180){
				downfn.apply(obj);
			}
		}
	}





// 小米 搭配栏 多选，字体和内容 选中+显示
//搭配
/*let dagengduoc=document.querySelectorAll('.neirong .dapei .dapeititle .gengduo a');
let youbian=document.querySelectorAll('.neirong .dapei .youbian');
duoxuan(dagengduoc,youbian);*/
function duoxuan(obj,ele){
	for(let i=0;i<obj.length;i++){
		obj[i].onmouseover=function(){
			for(let j=0;j<ele.length;j++){
				obj[j].style.color='#424242';
				obj[j].style.borderBottom='3px solid #F5F5F5';
				ele[j].style.display='none';
			}
			obj[i].style.color='#FF6700';
			obj[i].style.borderBottom='3px solid #FF6700';
			ele[i].style.display='block';
		}
		obj[i].onmouseout=function(){
			for(let j=0;j<ele.length;j++){
				obj[j].style.color='#424242';
				obj[j].style.borderBottom='3px solid #F5F5F5';
				ele[j].style.display='none';
			}
			obj[i].style.color='#FF6700';
			obj[i].style.borderBottom='3px solid #FF6700';
			ele[i].style.display='block';
		}
	}
}



/*let time=new Date();
time.setMinutes(time.getMinutes()+10);
document.cookie='name=liujiang';
document.cookie='age=18';
document.cookie='sex=nan;expires='+time.toUTCString();*/


//设置 cookie
// setcookie('skill','shenme',20);
function setcookie(key,value,time){
    if(time){
        let expires=new Date();
        expires.setMinutes(expires.getMinutes()+10);
        document.cookie=`${key}=${value};expires=${expires.toUTCString()}`;
    }else{
        document.cookie=`${key}=${value}`;
    }
}

// 获取 cookie值
// getCookie('expires');
function getCookie(key){
    let arr3=[];
    let cookie=document.cookie;
    let arr=cookie.split('; ');  // ["skill=javascript", " name=liujiang", " age=18", " sex=nan"]
    for(let i=0;i<arr.length;i++){
        let arr1=[];
        arr1=arr[i].split('=');
        if(key == arr1[0]){
            return arr1[1];
        }
    }
    return false;
}

// 获取时间
// let timeall=audio.duration;
// ctime.innerText=format(current);
function format(time){
    let min=Math.floor(time/60)<10 ? '0'+Math.floor(time/60) : Math.floor(time/60);
    let s=Math.floor(time%60)<10 ? '0'+Math.floor(time%60) : Math.floor(time%60);
    return `${min}:${s}`;
}

//画圆 显示百分比  进度
// let ctx = document.querySelector('canvas').getContext('2d'); //绘 2D 图
// circle(0,75)
function circle(n,num){
    let t;
    ctx.font = 'bold 30px 宋体';
    ctx.lineWidth = 10;         //线宽
//    ctx.lineCap='round';        // round 圆形线帽  端点
    ctx.strokeStyle = '#0085D0';
    ctx.setLineDash([4,2]);    //设置虚线，参数为数组，第一个值为实现宽度，第二个值为空白的宽度
    ctx.lineDashOffset = 10;    //虚线起始偏移量
    ctx.shadowColor = 'red';    //阴影颜色
    ctx.shadowBlur = 5;         //阴影的模糊级数
    t = setInterval(keyform,60);
    function keyform(){
        n++;
        if(n == num){
            clearInterval(t);
//            cancelAnimationFrame(t);
        }else{
//            t = requestAnimationFrame(keyform);
        }
        ctx.clearRect(0,0,300,300);  //清空画布
        ctx.beginPath();
        let anglue = (n * 360 / 100-90) * Math.PI / 180; // 从0开始
        ctx.arc(150,150,100,-Math.PI/2,anglue,false);
//            （圆心 x 坐标,Y坐标，半径，起始角-以弧度计，结束角-以弧度计，true逆时针/false顺时针）
        ctx.stroke();
        ctx.fillText(`${n}%`,130,160);//填充文本
    }
}


//鼠标点击画多边形
// duobianxing(5);  //5边形
function duobianxing(n){
    let langel=(360/n);              //角度转为弧度
    canvas.onmousedown=function(e){
        let ox=e.offsetX,oy=e.offsetY;    //圆心 x ，y
        canvas.onmousemove=function(e){
            let mx=e.offsetX,my=e.offsetY;   //移动到
            let radius=Math.sqrt((mx-ox)*(mx-ox)+(my-oy)*(my-oy));
            ctx.clearRect(0,0,600,500);
            ctx.beginPath();
            ctx.moveTo(ox+radius,oy);
            for(let i=0;i<n;i++){
                let hudu=(Math.PI/180)*langel*i;
                ctx.lineTo(ox+radius*Math.cos(hudu),oy+radius*Math.sin(hudu));
            }
            ctx.closePath();
            ctx.stroke();
        };
        canvas.onmouseup=function(){
            canvas.onmousemove=null;
        }
    }
}


//	正则  去空 去掉字符串的空格 :

String.prototype.trims = function(type = 'l'){
    let reg;
    if(type == 'l'){        // left
        reg = /^\s+/ ;
    }else if(type == 'r'){  // right
        reg = /\s+$/ ;
    }else if(type == 'a'){  // all
        reg = /^\s+ | \s+$/g ;
    }
    return this.replace(reg,'');
};
/*var str = '   abcdef   ';
let result = str.trims('a');  //去掉所有
console.log(result);*/

