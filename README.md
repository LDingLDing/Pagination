# Pagination
Pagination 是一款基于 jQuery 的翻页插件，兼容所有浏览器，翻页回调。样式定制自行修改css即可，大小调整慎重详见下面说明。
插件提供联动、自动居中的展示形式。

# 兼容性&模块化支持
  
        |           |            |          |         
--------| --------- | ---------- | -------- | --------
IE6+ OK	| Chrome OK	| Firefox OK |	Opera ?	| Safari OK

#使用方法

1、引入文件
```
  <link rel="stylesheet" href="pagination.css">
  <script src="http://s.thsi.cn/js/jquery-1.8.3.min.js"></script>
  <script src="pagination.js"></script>
```
2、HTML
```
<div id="container"></div>
```
3、Javascript
```
$('#container').pagination({
	total : 100,
	count : 10,
	nowPage : 1,
	callback : function(page){
		alert('calback: ' + page);
	}
});
```

#自定义样式说明

颜色样式自行更改，宽高如需更改，请保证css中对于box-*的width与js中boxOutwidth和boxEllipsisWidth保持一致，用于计算Dom宽。

比如： 

现在css中.p_box的width为25 ， margin左右各3 ， 1px 宽 ， 共33px 。js中boxOutwidth变量即为33。 

.p_box-ellipsis 的宽为25， 无margin border 。 js中boxEllipsisWidth变量即为25。

#配置

属性/方法	| 类型	    | 默认值	| 说明
-------- | ---      | ----- | ----
total    | Numver   |	0	    | 数据总条数
nowPage	 | Number	  | 1	    | 当前展示页码
count	   | Numver	  | 10    |	每页展示条数
callback | function	| null  |	触发翻页后的回调，回调参数为页码 {callback:function(page){//do...}}
