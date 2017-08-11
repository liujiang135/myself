




//  ========== 
//  = JS = 
//  ========== 
'use strict'

//窗口加载完后执行一段程序

//alert(1);/*弹出框*/

window.onload = function(){ /*定义函数*/
	var designWidth = 375; /*定义设计尺寸*/
	
	function fontsize(){
		var CW = document.documentElement.clientWidth;     
		/*  CW变量 设备尺寸 文档的宽 */
		/*console.log(CW);   输出文档的宽度*/
		var size = CW/designWidth*100+"px";
		document.querySelector("html").style.fontSize = size; 
		/* 设置html的 font-size */
		
		console.log(size);/*打印*/
	}
	
	fontsize();/* 运行此函数 */
	window.onresize = fontsize; /* 监测窗口尺寸是否发生改变 */
}
