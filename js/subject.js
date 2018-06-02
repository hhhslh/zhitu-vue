function getQuery(){
            var str = (location.search.length > 0 ? location.search.substring(1) : ''),
            args = {},
            items = str.length ? str.split("&") : [],
            item = null,
            name = null,
            value = null;
            for (i=0; i < items.length; i++){
                item = items[i].split("=");
                name = decodeURIComponent(item[0]);
                value = decodeURIComponent(item[1]);
                if (name.length) {
                    args[name] = value;
                }
            }
            return args;
        }
var tab = new Vue({
                el:"#app",
                data: {
                	condition:null,
                    list:[],
                    grade: '年级',
                    isShowGrade:false,
                    searchGrade:null,
                    subject: getQuery().subject ? getQuery().subject : '学科',
                    isShowSubject:false,
                    searchSubject:null,
                    teacherType: '教师类型',
                    isShowType:false,
                    searchType:null,
                    isShowAllSelect: false,
                },
                mounted: function(){
                    this.searchSubject = this.getQuery().id;
                    var data = {
                            'subject': this.searchSubject,
                            'offset': 0,
                            'limit': 20,
                           }
                	this.getList(data); 
                },
                methods: {
                    getQuery:function(){
                        var str = (location.search.length > 0 ? location.search.substring(1) : ''),
                        args = {},
                        items = str.length ? str.split("&") : [],
                        item = null,
                        name = null,
                        value = null;
                        for (i=0; i < items.length; i++){
                            item = items[i].split("=");
                            name = decodeURIComponent(item[0]);
                            value = decodeURIComponent(item[1]);
                            if (name.length) {
                                args[name] = value;
                            }
                        }
                        return args;
                    },
                    getList:function(dataObj){
                    	var that = this;
                    	$.ajax({
                    		'url': 'http://api.zhituteam.com/api/teacher/lists',
                    		'type': "get",
                    		'dataType': 'json',
                    		'data': dataObj,
                    		success:function(res){
                    			that.list = res.data.teacher;
                                if(that.condition==null){
                                    res.data.condition.grade.forEach(function(item){
                                        item.isSelected = false;
                                    })
                                    res.data.condition.subject.forEach(function(item){
                                        item.isSelected = false;
                                    })
                                    res.data.condition.type.forEach(function(item){
                                        item.isSelected = false;
                                    })
                                    that.condition = res.data.condition;
                                    that.condition.subject.forEach(function(k){
                                        if(that.searchSubject == k.id){
                                            that.subject = k.label;
                                            k.isSelected = true;
                                            that.isShowAllSelect = false;
                                            that.isShowSubject = true;
                                        }
                                    })
                                }
                            }
                    	})
                    },
                    clickGrade: function(){
                        this.isShowAllSelect = true,
                        this.isShowGrade = true;
                        this.isShowSubject = false;
                        this.isShowType = false;
                    },
                    clickSubject: function(){
                        this.isShowAllSelect = true,
                        this.isShowGrade = false;
                        this.isShowSubject = true;
                        this.isShowType = false;
                    },
                    clickType: function(){
                        this.isShowAllSelect = true,
                        this.isShowGrade = false;
                        this.isShowSubject = false;
                        this.isShowType = true;
                    },
                    clickItem: function(item){
                    //重置数据的选中状态
                        this.condition.grade.forEach(function(t){
                            t.isSelected = false;
                        })
                        this.condition.subject.forEach(function(t){
                            t.isSelected = false;
                        })
                        this.condition.type.forEach(function(t){
                            t.isSelected = false;
                        })
                        item.isSelected = true;
                        this.isShowAllSelect = false;
                         if(this.isShowSubject){
                            this.subject = item.label;
                            this.searchSubject = item.id;
                        }
                        if(this.isShowGrade){
                            this.grade = item.label;
                            this.searchGrade = item.id;
                        }
                        if(this.isShowType){
                            this.teacherType = item.label;
                            this.searchType = item.id;
                        }
                        var data = {
                            'grade': this.searchGrade,
                            'type': this.searchType,
                            'subject': this.searchSubject,
                            'offset': 0,
                            'limit': 20,
                        }
                        this.getList(data);
                    }
                }
            })