'use strict';

function $(selector,ranger=document){
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
        //添加事件
        // window.onload=function(){
            // selector();
        // }
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

//如何实现兼容
function getStyle(boj,attr){
	if(window.getComputedStyle){
		return getComputedStyle(obj,null)[attr];
	}else{
		alert(2);
		return obj.currentStyle[attr];
	}
}


////////////////////////////////////////////////////////////////////////////
//						JS   属性内容
////////////////////////////////////////////////////////////////////////////
$(function(){
	// head 左边栏 
	let headleft=$('.headleft')[0];
	let headleftul=$('ul',headleft)[0];
	for(let i=0;i<10;i++){
		let headleftulli=$('li',headleftul)[i];
		let headleftullia=$('a',headleftulli)[0];
		headleftulli.onmouseover=function(){
			headleftullia.style.color='#fff';
		}
		headleftulli.onmouseout=function(){
			headleftullia.style.color='#B0B0B0';
		}
	}
	
	//banner上的导航下拉  
	let navproduct=document.querySelector('.nav .product');
	let navproductulliej=document.querySelector('.nav .product>ul>li .erji');
	navproduct.onmouseover=function(){
		navproductulliej.style.display="block";
	}
	navproduct.onmouseout=function(){
		navproductulliej.style.display="none";
	}
	

	let gou=document.getElementsByName('gou');
	for(let i=0;i<gou.length;i++){
		let gou1=gou[i].getElementsByTagName('a')[0];
		gou[i].onmouseenter=function(){
			gou1.style.color="#fff";
			gou[i].style.background="#ff6700";
		}
		gou[i].onmouseleave=function(){
			gou1.style.color="#ff6700";
			gou[i].style.background="#fff";
		}
	}
	

	//banner左侧的导航右拉
	let lei=$('.lei')[0];
	let leiul=$('ul',lei)[0];
	
	for(let i=0;i<9;i++){
		let leiulli=$('li',leiul)[i];
		let leiullierji=$('erji',leiulli)[0];
		leiulli.onmouseover=function(){
//			leiullierji.style.width='328px';
		}
		leiulli.onmouseout=function(){
//			leiullierji.style.width='0';
		}
	}


	//banner
	let box=$('.box')[0];
	let boxa=$('a',box);
	let wheel=$('.wheel')[0];
	let dot=$('.dot',wheel)[0];
	let dotul=$('ul',dot)[0];
	let dotulli=$('li',dotul);  //轮播点
	let t;
	let index=0;

	wheel.onmouseover=function(){
		clearInterval(t);
	}
	wheel.onmouseout=function(){
		t = setInterval(move,2000);
	}

	//z左右箭头
	let left1gun = $('.left1gun')[0];
	let right1gun = $('.right1gun')[0];
	left1gun.onmouseover=function(){
		clearInterval(t);
		left1gun.style.backgroundPosition='0px 0px';
		moveleft();
	}
	left1gun.onmouseout=function(){
		left1gun.style.backgroundPosition='-86px 0px';
//		moveleft();
	}
	right1gun.onmouseover=function(){
		clearInterval(t);
		right1gun.style.backgroundPosition='-42px 0px';
		moveright();
	}
	right1gun.onmouseout=function(){
		right1gun.style.backgroundPosition='-125px 0px';
//		moveright();
	}
	function moveleft(){
		left1gun.onclick=function(){
			index--;
			if(index<0){
				index=boxa.length-1;
			}
			for(let i=0;i<boxa.length;i++){
				boxa[i].style.display='none';
				dotulli[i].className='';
			}
			boxa[index].style.display='block';
			dotulli[index].className='hot';
		}
	}
	function moveright(){
		right1gun.onclick=function(){
			index++;
			if(index==boxa.length){
				index=0;
			}
			for(let i=0;i<boxa.length;i++){
				boxa[i].style.display='none';
				dotulli[i].className='';
			}
			boxa[index].style.display='block';
			dotulli[index].className='hot';
		}
	}
	
	
	//鼠标点轮播点效果  手动
	for(let i=0;i<boxa.length;i++){
		dotulli[i].onclick=function(){
			for(let j=0;j<boxa.length;j++){
				boxa[j].style.display='none';
				dotulli[j].className='';
			}
			boxa[i].style.display='block';
			dotulli[i].className='hot';
			index = i;
		}
	}
	
	//自动
	t = setInterval(move,2000);
	function move(){
		index++;
		if(index==boxa.length){
			index=0;
		}
		for(let i=0;i<boxa.length;i++){
			boxa[i].style.display='none';
			dotulli[i].className='';
		}
		boxa[index].style.display='block';
		dotulli[index].className='hot';
	}

    let icon=document.querySelector('iconfont yijiu t');

	//明星单品
	let zuo=document.querySelectorAll('.mingxing .zuoyou a');
	let danpin=document.querySelector('.danpin');
	let danpinnew=document.querySelector('.danpinnew');
	// console.log(zuo[1]);
	zuo[1].onmouseover=function(){
		zuo[1].style.color='#F87300';
	}
	zuo[1].onmouseout=function(){
		zuo[1].style.color='#E0E0E0';
	}
	zuo[1].onclick=function(){
		danpin.style.left='-1226px';
		danpinnew.style.left='0px';
		zuo[0].style.color='#B0B0B1';
		zuo[1].style.color='#E0E0E0';
	}

	zuo[0].onmouseover=function(){
		zuo[0].style.color='#F87300';
	}
	zuo[0].onmouseout=function(){
		zuo[0].style.color='#E0E0E0';
	}
	zuo[0].onclick=function(){
		danpin.style.left='0px';
		danpinnew.style.left='1226px';
		zuo[1].style.color='#B0B0B1';
		zuo[0].style.color='#E0E0E0';
	}

	

	//智能硬件
	let zgengduoc=document.querySelector('.neirong .yingjian .yingjiantitle .gengduo .circle');
	let zgengduoa=document.querySelector('.neirong .yingjian .yingjiantitle .gengduo a');
	zgengduoc.onmouseover=function(){
		zgengduoc.style.background='#FF6700';
		zgengduoa.style.color='#FF6700';
	}
	zgengduoc.onmouseout=function(){
		zgengduoc.style.background='#B0B0B0';
		zgengduoa.style.color='#424242';
	}
	zgengduoa.onmouseover=function(){
		zgengduoc.style.background='#FF6700';
		zgengduoa.style.color='#FF6700';
	}
	zgengduoa.onmouseout=function(){
		zgengduoc.style.background='#B0B0B0';
		zgengduoa.style.color='#424242';
	}







	//搭配
	let dagengduoc=document.querySelectorAll('.neirong .dapei .dapeititle .gengduo a');
	let youbian=document.querySelectorAll('.neirong .dapei .youbian');
	duoxuan(dagengduoc,youbian);
	//调用JS封装
	// 小米 搭配栏 多选，字体和内容 选中+显示
		

	//配件
	let peijiangengduoc=document.querySelectorAll('.neirong .peijian .dapeititle .gengduo a');
	let peiyoubian=document.querySelectorAll('.neirong .peijian .youbian');
	duoxuan(peijiangengduoc,peiyoubian)


	//周边
	let zhoubiangengduoc=document.querySelectorAll('.neirong .zhoubian .dapeititle .gengduo a');
	let zhouyoubian1=document.querySelectorAll('.neirong .zhoubian .youbian');
	duoxuan(zhoubiangengduoc,zhouyoubian1)


	// 为你推荐
	let btnzuo=document.querySelectorAll('.weinituijian .you .box');
	let tuizuo=document.querySelector('.tuijian:nth-child(1)');
	let tuiyou=document.querySelector('.tuijian:nth-child(2)');
	btnzuo[0].onmouseover=function(){
		btnzuo[0].style.color='#f40';
	}
	btnzuo[1].onmouseover=function(){
		btnzuo[1].style.color='#f40';
	}
	btnzuo[0].onclick=function(){
		tuizuo.style.left='0';
		tuiyou.style.left='1226px';
		btnzuo[0].style.color='#E0E0E0';
		btnzuo[1].style.color='#B0B1BB';
	}
	btnzuo[1].onclick=function(){
		tuizuo.style.left='-1226px';
		tuiyou.style.left='0';
		btnzuo[1].style.color='#E0E0E0';
		btnzuo[0].style.color='#B0B1BB';
	}


	//视频
	let shipina=document.querySelector('.shipin .gengduo a');
	let shipinc=document.querySelector('.shipin .gengduo .circle');
	shipina.onmouseover=function(){
		shipina.style.color='#F87300';
		shipinc.style.background='#F87300';
	}
	shipina.onmouseout=function(){
		shipina.style.color='#424242';
		shipinc.style.background='#B0B0B0';
	}
	shipinc.onmouseover=function(){
		shipina.style.color='#F87300';
		shipinc.style.background='#F87300';
	}
	shipinc.onmouseout=function(){
		shipina.style.color='#424242';
		shipinc.style.background='#B0B0B0';
	}






	//内容
	let th1=document.querySelectorAll('.thingproduct .thing1-1');
	//1组图
	let rep=th1[0].querySelectorAll('.repingproduct1');
	let zyi=th1[0].querySelector('.left');
	let yyi=th1[0].querySelector('.right');
	let t20=rep[0].querySelectorAll('.thing2-1');
	let imgwidth=parseInt(getComputedStyle(t20[0],null).width);
	let t21dot=document.querySelectorAll('.thingproduct .repingproduct1 .dot ul li');
// lunbo(轮播对象，轮播对象的宽度，轮播点，左箭头，右箭头)
	lunbo(t20,imgwidth,t21dot,zyi,yyi);

	//2组图
	let rep2=th1[1].querySelectorAll('.repingproduct1');
	let zyi2=th1[1].querySelector('.left');
	let yyi2=th1[1].querySelector('.right');
	let t21=rep2[0].querySelectorAll('.thing2-1');
	let t22dot=th1[1].querySelectorAll('.dot ul li');
	lunbo(t21,imgwidth,t22dot,zyi2,yyi2);

	//3组图
	let rep3=th1[2].querySelectorAll('.repingproduct1');
	let zyi3=th1[2].querySelector('.left');
	let yyi3=th1[2].querySelector('.right');
	let t23=rep3[0].querySelectorAll('.thing2-1');
	let t23dot=th1[2].querySelectorAll('.dot ul li');
	lunbo(t23,imgwidth,t23dot,zyi3,yyi3);

	//4组图
	let rep4=th1[3].querySelectorAll('.repingproduct1');
	let zyi4=th1[3].querySelector('.left');
	let yyi4=th1[3].querySelector('.right');
	let t24=rep4[0].querySelectorAll('.thing2-1');
	let t24dot=th1[3].querySelectorAll('.dot ul li');
	lunbo(t24,imgwidth,t24dot,zyi4,yyi4);


/*
	轮播图
	1.状态初始化   先 for 循环给几个子图，按宽度排序
	2.添加点击事件  点击左右箭头轮换图片
	3.写移动函数
		定义当前    下一张图
		让下一张图做准备   宽度到位
		写动画  让宽度移动
*/
// 小米 内容区域的是个轮播图
// lunbo(轮播对象，轮播对象的宽度，轮播点，左箭头，右箭头)
function lunbo(obj,widths,dots,leftpoint,rightpoint){
	let current=0,next=0;
	for(let i=0;i<obj.length;i++){
		if(i==0){
			continue;
		}
		obj[i].style.left=widths+'px';
	}
		dots[next].style.background='#EDE9E8';
		dots[next].className='hot1-1';
	rightpoint.onclick=function(){
		mvoeright();
	}
	leftpoint.onclick=function(){
		moveleft();
	}
	function mvoeright(){
		next++;
		if(next==obj.length){
			next=0;
		}
		dots[current].className='';
		dots[current].style.background='#878382';
		dots[next].style.background='#EDE9E8';
		dots[next].className='hot1-1';
		obj[next].style.left=widths+'px';
		animate(obj[next],{left:0})
		animate(obj[current],{left:-widths})
		current=next;
	}
	function moveleft(){
		next--;
		if(next<0){
			next=obj.length-1;
		}
		obj[next].style.left=-widths+'px';
		dots[current].style.background='#878382';
		dots[next].style.background='#EDE9E8';
		dots[current].className='';
		dots[next].className='hot1-1';
		animate(obj[next],{left:0})
		animate(obj[current],{left:widths})
		current=next;
	}
}











})