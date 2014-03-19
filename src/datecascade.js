define(function(require, exports, module) {

  var Util = {
			E:function(id){
				return typeof id == "string" ? document.getElementById(id) : id;
			},
		    addEvent:function(id, events, fn) {
		        var dom = Util.E(id);
		        if (dom == null)
		            return 1;
		        events = events || "click";
		        if ((typeof fn).toLowerCase() == "function") {
		            dom.attachEvent ? dom.attachEvent("on" + events, fn) : dom.addEventListener ? dom.addEventListener(events, fn, !1) : dom["on" + events] = fn;
		            return 0;
		        }
		    }
	};
	
	function DateCascade(opt){
		this.init(opt);
	}
	(function(DateCascade){
		DateCascade.init = function(opt){
			
			var curDate = new Date(),year = curDate.getFullYear(), month = curDate.getMonth(), day = curDate.getDay();
            this.yearDom = Util.E(opt.yearDom);
            this.monthDom = Util.E(opt.monthDom);
            this.dayDom = Util.E(opt.dayDom);
            this.constellationId = opt.constellationId;
            this.constellationHiddenInputDomId=opt.constellationHiddenInputDomId;
            this.birthDayHiddenInputDomId=opt.birthDayHiddenInputDomId;
            
            this.curYear = year;
            this.curMonth = month;
            this.curDay = day;
            
            this.yearDom && (year = this.yearDom.getAttribute("defValue") || "0");
            this.monthDom && (month = this.monthDom.getAttribute("defValue") || "0");
            this.dayDom && (day = this.dayDom.getAttribute("defValue") || "0");
            
            this.yearCode = opt.yearCode || year;
            this.monthCode = opt.monthCode || month;
            this.dayCode = opt.dayCode || day;
            
            this.onSelected = opt.onSelected || function() {
            };
            
            this.loadYear();
            this.loadMonth();
            this.loadDay();
            
            this.bindEvent("year");
            this.bindEvent("month");
            this.bindEvent("day");
            
		};
		DateCascade.onChange = function(domName){
			var ref = {year:'month', month:'day'}, self = this, refCode = ref[domName] + "Code";
			return function(){
				self[domName + "Code"] = self[domName + "Dom"].value;
				if(domName !== "day") {
					self[refCode] = 1e3;
					domName === "year" && self.loadMonth();
                    self.dayDom && self.loadDay();
                }
				self.changeConstellation();
				self.onSelected({
					yearCode: self.yearDom ? self.yearCode : "",
					monthCode: self.monthDom ? self.monthCode : "",
					dayCode: self.dayDom ? self.dayCode : ""
				});
			};
		};
		DateCascade.bindEvent = function(domName) {
            if (!!this[domName + "Dom"]) {
                this[domName + "handler"] && a.removeEvent(this[domName + "Dom"], "change", this[domName + "handler"]);
                this[domName + "handler"] = this.onChange(domName);
                Util.addEvent(this[domName + "Dom"], "change", this[domName + "handler"]);
            }
        };
		DateCascade.loadYear = function(){
			if(!!this.yearDom){
				var options = this.yearDom.options;
				if(options.length <= 1){
					options[0] = new Option(" ", 0);
					for(var i=this.curYear; i>=this.curYear-100; i--)
						options[options.length] = new Option(i, i);
				}
				for(var i=0; i< options.length; i++){
					if(options[i].value == this.yearCode){
						this.yearDom.value = this.yearCode;
						break;
					}
				}
			}
		};
		DateCascade.loadMonth = function(){
			if(!!this.monthDom){
				var options = this.monthDom.options;
				
				//移除所有月选项
				while(options.length)
                    this.monthDom.remove(0);
				
				options[0] = new Option(" ", 0);
				if(this.yearCode == 0){
					this.monthCode = this.monthDom.value;
					return;
				}
				
				for(var i=1; i<=12; i++)
					options[options.length] = new Option(i, i);
				
				//选择默认选项
				for(var i=0; i< options.length; i++){
					if(options[i].value == this.monthCode){
						this.monthDom.value = this.monthCode;
						break;
					}
				}
				
				this.monthCode = this.monthDom.value;
			}
		};
		DateCascade.loadDay = function(){
			if(!!this.dayDom){
				var options = this.dayDom.options;
				
				//移除所有天选项
				while(options.length)
					this.dayDom.remove(0);
				
				options[0] = new Option(" ", 0);
				if(this.monthCode == 0)
					return;
				
				for(var i=1; i<=this.getDay(this.yearCode, this.monthCode); i++)
					options[options.length] = new Option(i, i);
				
				//选择默认选项
				for(var i=0; i< options.length; i++){
					if(options[i].value == this.dayCode){
						this.dayDom.value = this.dayCode;
						break;
					}
				}
				
				this.dayCode = this.dayDom.value;
				this.changeConstellation();
			}
		};
		DateCascade.getDay = function(varYear, varMonth){
			
			var lngDay = 31;
	        var Year=parseInt(varYear);
	        var Month=parseInt(varMonth);
	        
	        switch(Month){
	            case 1:
	            case 3:
	            case 5:
	            case 7:
	            case 8:
	            case 10:
	            case 12:
	                lngDay=31;
	                break;
	            case 4:
	            case 6:
	            case 9:
	            case 11:
	                lngDay=30;
	            break;
	            case 2:
	                if((Year%4==0&&Year%100!=0)||(Year%400==0)){
	                    lngDay=29;
	                }else{
	                    lngDay=28;
	                }
	                break;
	        }
	        return lngDay;
		};
		DateCascade.getAstro = function(varMonth,varDay){    
		    var s="魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯", month = parseInt(varMonth), day = parseInt(varDay);
		    if(month === 0 || day === 0)
		    	return "";
		    var arr=[20,19,21,21,21,22,23,23,23,23,22,22];
		    return s.substr(month*2-(day<arr[month-1]?2:0),2);
		};
		DateCascade.changeConstellation = function(){
			var constellationHtml = this.getAstro(this.monthCode,this.dayCode);
			if(this.constellationId){				
				var dom = Util.E(this.constellationId);
				if(null!= dom)
					dom.innerHTML = constellationHtml;
			}
			if(this.constellationHiddenInputDomId){
				var dom = Util.E(this.constellationHiddenInputDomId);
				if(null!= dom)
					dom.value=constellationHtml;
			}
			if(constellationHtml!=''){
				if(this.birthDayHiddenInputDomId){
					var dom = Util.E(this.birthDayHiddenInputDomId);
					if(null!= dom)
						dom.value=this.yearCode+"-"+this.monthCode+"-"+this.dayCode;
				}
			}
		};
	})(DateCascade.prototype);
    
    module.exports = DateCascade;

});
