# datecascade

---

日期级联组件,提供两级日期级联、以及星座功能特性(此组件扣至新浪微博)
![日期级联图](http://ww2.sinaimg.cn/mw690/abede2a8gw1eel2t7mj82j20no06hdg0.jpg)

---

## 最佳实践

###默认使用

````html
<select name="city" id="year1" ></select>
<select name="city" id="month1" ></select>
<select name="city" id="day1" ></select>
<span id="constellationDom1"></span>
````

```javascript
seajs.use('datecascade', function(datecascade) {
	new datecascade({
		yearDom:'year1',
		monthDom:'month1',
		dayDom:'day1',
		constellationId:'constellationDom1'
	});
});
```

###日期信息有默认值

````html
<select name="city" id="year2" defValue="1989"></select>
<select name="city" id="month2" defValue="3"></select>
<select name="city" id="day2" defValue="12"></select>
<span id="constellationDom2"></span>
````

```javascript
seajs.use('datecascade', function(datecascade) {
	new datecascade({
		yearDom:'year2',
		monthDom:'month2',
		dayDom:'day2',
		constellationId:'constellationDom2'
	});
});
```
