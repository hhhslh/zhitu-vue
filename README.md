# zhitu-vue
#### 知途家教页面，使用了vue.js，ajax、json前后端数据交互。
* 首页
* 教师详情 （教师信息）
* 学科详情（筛选教师、年级、科目）
##### 1、首页（知途家教--vue.html）
首页使用了swiper插件实现轮播，从首页跳转到教师详情，学科详情。
##### 2、教师详情（教师详情.html）
展示了教师的相关信息
##### 3、学科详情（subject.html）
* 用js获取地址栏参数,获取学科id和学科name
```
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
```
* 使用vue.js进行筛选，筛选学科，年级，教师类型
