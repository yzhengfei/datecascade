define("b5m/datecascade/1.0.0/datecascade",[],function(b,c,d){function e(a){this.init(a)}var f={E:function(a){return"string"==typeof a?document.getElementById(a):a},addEvent:function(a,b,c){var d=f.E(a);return null==d?1:(b=b||"click","function"==(typeof c).toLowerCase()?(d.attachEvent?d.attachEvent("on"+b,c):d.addEventListener?d.addEventListener(b,c,!1):d["on"+b]=c,0):void 0)}};!function(b){b.init=function(a){var b=new Date,c=b.getFullYear(),d=b.getMonth(),e=b.getDay();this.yearDom=f.E(a.yearDom),this.monthDom=f.E(a.monthDom),this.dayDom=f.E(a.dayDom),this.constellationId=a.constellationId,this.constellationHiddenInputDomId=a.constellationHiddenInputDomId,this.birthDayHiddenInputDomId=a.birthDayHiddenInputDomId,this.curYear=c,this.curMonth=d,this.curDay=e,this.yearDom&&(c=this.yearDom.getAttribute("defValue")||"0"),this.monthDom&&(d=this.monthDom.getAttribute("defValue")||"0"),this.dayDom&&(e=this.dayDom.getAttribute("defValue")||"0"),this.yearCode=a.yearCode||c,this.monthCode=a.monthCode||d,this.dayCode=a.dayCode||e,this.onSelected=a.onSelected||function(){},this.loadYear(),this.loadMonth(),this.loadDay(),this.bindEvent("year"),this.bindEvent("month"),this.bindEvent("day")},b.onChange=function(a){var b={year:"month",month:"day"},c=this,d=b[a]+"Code";return function(){c[a+"Code"]=c[a+"Dom"].value,"day"!==a&&(c[d]=1e3,"year"===a&&c.loadMonth(),c.dayDom&&c.loadDay()),c.changeConstellation(),c.onSelected({yearCode:c.yearDom?c.yearCode:"",monthCode:c.monthDom?c.monthCode:"",dayCode:c.dayDom?c.dayCode:""})}},b.bindEvent=function(b){this[b+"Dom"]&&(this[b+"handler"]&&a.removeEvent(this[b+"Dom"],"change",this[b+"handler"]),this[b+"handler"]=this.onChange(b),f.addEvent(this[b+"Dom"],"change",this[b+"handler"]))},b.loadYear=function(){if(this.yearDom){var a=this.yearDom.options;if(a.length<=1){a[0]=new Option(" ",0);for(var b=this.curYear;b>=this.curYear-100;b--)a[a.length]=new Option(b,b)}for(var b=0;b<a.length;b++)if(a[b].value==this.yearCode){this.yearDom.value=this.yearCode;break}}},b.loadMonth=function(){if(this.monthDom){for(var a=this.monthDom.options;a.length;)this.monthDom.remove(0);if(a[0]=new Option(" ",0),0==this.yearCode)return this.monthCode=this.monthDom.value,void 0;for(var b=1;12>=b;b++)a[a.length]=new Option(b,b);for(var b=0;b<a.length;b++)if(a[b].value==this.monthCode){this.monthDom.value=this.monthCode;break}this.monthCode=this.monthDom.value}},b.loadDay=function(){if(this.dayDom){for(var a=this.dayDom.options;a.length;)this.dayDom.remove(0);if(a[0]=new Option(" ",0),0==this.monthCode)return;for(var b=1;b<=this.getDay(this.yearCode,this.monthCode);b++)a[a.length]=new Option(b,b);for(var b=0;b<a.length;b++)if(a[b].value==this.dayCode){this.dayDom.value=this.dayCode;break}this.dayCode=this.dayDom.value,this.changeConstellation()}},b.getDay=function(a,b){var c=31,d=parseInt(a),e=parseInt(b);switch(e){case 1:case 3:case 5:case 7:case 8:case 10:case 12:c=31;break;case 4:case 6:case 9:case 11:c=30;break;case 2:c=0==d%4&&0!=d%100||0==d%400?29:28}return c},b.getAstro=function(a,b){var c="魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯",d=parseInt(a),e=parseInt(b);if(0===d||0===e)return"";var f=[20,19,21,21,21,22,23,23,23,23,22,22];return c.substr(2*d-(e<f[d-1]?2:0),2)},b.changeConstellation=function(){var a=this.getAstro(this.monthCode,this.dayCode);if(this.constellationId){var b=f.E(this.constellationId);null!=b&&(b.innerHTML=a)}if(this.constellationHiddenInputDomId){var b=f.E(this.constellationHiddenInputDomId);null!=b&&(b.value=a)}if(""!=a&&this.birthDayHiddenInputDomId){var b=f.E(this.birthDayHiddenInputDomId);null!=b&&(b.value=this.yearCode+"-"+this.monthCode+"-"+this.dayCode)}}}(e.prototype),d.exports=e});