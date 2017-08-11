/**
 * Created by Administrator on 2017/5/14.
 */

'use strict';

$(function(){

    let banner=document.querySelectorAll('.banner .bannerpic img');
    let lunbodot=document.querySelectorAll('.lunbo .lun a');
    let banner1=document.querySelector('.banner');
    let index=0;
    let t;


    // banner 图轮播
    banner1.onmouseenter=function(){
        clearInterval(t);
    }
    banner1.onmouseleave=function(){
        t=setInterval(move,2000);
    }

    // banner 图自动轮播
    t=setInterval(move,2000);
    function move(){
        index++;
        if(index==banner.length){
            index=0;
        }
        for(let i=0;i<banner.length;i++){
            banner[i].style.display='none';
            lunbodot[i].style.cssText=`
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.3);
                float: left;
                margin-right: 16px;`
        }
        banner[index].style.display='block';
        lunbodot[index].style.cssText=`
            width: 18px;
            height: 18px;
            background: #fff;
            border: 2px solid #A3A3A3;`
    }

    // banner手动轮播
    for(let i=0;i<banner.length;i++){
        lunbodot[i].onmouseenter=function(){
            for(let j=0;j<banner.length;j++){
                banner[j].style.display='none';
                lunbodot[j].style.cssText=`
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(0, 0, 0, 0.3);
                float: left;
                margin-right: 16px;`
            }
            banner[i].style.display='block';
            lunbodot[i].style.cssText=`
            width: 18px;
            height: 18px;
            background: #fff;
            border: 2px solid #A3A3A3;`;
            index=i;
        }
    }

    //直播间
    let maotou=document.getElementsByClassName('maotou2');
    let zhibojian=document.getElementsByClassName('zhibojian');
    zhibojian[0].onmouseover=function(){
        maotou[0].style.width=`80px`;
        maotou[0].style.height=`67px`
    }
    zhibojian[0].onmouseout=function(){
        maotou[0].style.width=`70px`;
        maotou[0].style.height=`57px`
    }

    //侧边栏的
    window.onscroll=function(){
        let tops=document.body.scrollTop;
        let ce=document.querySelector('.ce');
        let floors=document.querySelectorAll('.floor');
        let celi=document.querySelectorAll('.ce li');
        let nav=document.querySelector('.nav');
        let wh=window.innerHeight;
        let arr=[];
        let n=0;

        for(let i=0;i<celi.length;i++){
            celi[i].onclick=function(){
                // flag3=false;
                delete arr[0];
                animate(document.body,{scrollTop:arr[i+1]-100});
                n=i;
            }
        }
        // console.log(wh);
        floors.forEach(function(value,index){
            arr.push(value.offsetTop);
        })
        if(tops>=550){
            nav.style.transform='translateY(50px)';
            ce.style.transform='translateX(38px)';
        }else{
            nav.style.transform='translateY(-50px)';
            ce.style.transform='translateX(-38px)';
        }
        delete arr[0];
        arr.forEach(function(value,index){
            if((wh-500)+tops>(value+100)){
                for(let i=0;i<celi.length;i++){
                    celi[i].style.background='#626262';
                }
                switch(index){
                    case 1: celi[index].style.background='#EA5F8D';break;
                    case 2: celi[index].style.background='#0AA6E8';break;
                    case 3: celi[index].style.background='#64C333';break;
                    case 4: celi[index].style.background='#F15453';break;
                    case 5: celi[index].style.background='#19C8A9';break;
                    case 6: celi[index].style.background='#F7A945';break;
                    case 7: celi[index].style.background='#DD2727';break;
                }
            }
        })
    }

















})
