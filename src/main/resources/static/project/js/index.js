(function() {
    require(['jquery','urlUtil','stringUtil','alertUtil','ajaxUtil'],
        function (jquery,urlUtil,stringUtil,alertUtil,ajaxUtil) {


        var currentUrlHash = window.location.hash.replace("#","");
        var menu_list = [
            {
                menu_name : "文创产品",
                menu_url: "",
                id:"1",
                level:"1",
                pid:""
            },
            {
                menu_name : "＞电视电影",
                menu_url: "/project/projectList",
                id:"1-1",
                level:"2",
                pid:"1"
            },
            {
                menu_name : "＞动漫游戏",
                menu_url: "/task/taskDownList",
                id:"1-2",
                level:"2",
                pid:"1"
            },{
                menu_name : "＞漫画典故",
                menu_url: "/task/taskDownList",
                id:"1-3",
                level:"2",
                pid:"1"
            },
            {
                menu_name : "文化科普",
                menu_url: "",
                id:"2",
                level:"1",
                pid:""
            },
            {
                menu_name : "文化资源",
                menu_url: "",
                id:"3",
                level:"1",
                pid:""
            },

            {
                menu_name : "＞中医医史",
                menu_url: "/project/projectList",
                id:"3-1",
                level:"2",
                pid:"3"
            },
            {
                menu_name : "＞中医流派",
                menu_url: "/project/projectList",
                id:"3-2",
                level:"2",
                pid:"3"
            },
            {
                menu_name : "＞历代名家",
                menu_url: "/project/projectList",
                id:"3-3",
                level:"2",
                pid:"3"
            },
            {
                menu_name : "＞文化古迹",
                menu_url: "/project/projectList",
                id:"3-4",
                level:"2",
                pid:"3"
            },
            {
                menu_name : "＞非物质文化遗产",
                menu_url: "/project/projectList",
                id:"3-5",
                level:"2",
                pid:"3"
            },
            {
                menu_name : "＞文化场馆",
                menu_url: "/project/projectList",
                id:"3-6",
                level:"2",
                pid:"3"
            },
            {
                menu_name : "健康旅游",
                menu_url: "",
                id:"4",
                level:"1",
                pid:""
            },
            {
                menu_name : "中药常识",
                menu_url: "",
                id:"5",
                level:"1",
                pid:""
            },{
                menu_name : "治未病理念",
                menu_url: "",
                id:"6",
                level:"1",
                pid:""
            },

            {
                menu_name : "＞科普知识",
                menu_url: "/knowledgeDb/problemSolution",
                id:"6-1",
                level:"2",
                pid:"6"
            },
            {
                menu_name : "＞节气养生",
                menu_url: "/knowledgeDb/problemAnswerPlan",
                id:"6-2",
                level:"2",
                pid:"6"
            },
            {
                menu_name : "＞国医话健康",
                menu_url: "/knowledgeDb/dataSelect",
                id:"6-3",
                level:"2",
                pid:"6"
            },
            {
                menu_name : "名老中医",
                menu_url: "/knowledgeDb/dataBack",
                id:"7",
                level:"1",
                pid:""
            },
            {
                menu_name : "历史名方",
                menu_url: "/knowledgeDb/dataBack",
                id:"8",
                level:"1",
                pid:""
            },
            {
                menu_name : "中医药名院",
                menu_url: "/knowledgeDb/dataBack",
                id:"9",
                level:"1",
                pid:""
            },
            {
                menu_name : "中医药名科",
                menu_url: "/knowledgeDb/dataBack",
                id:"10",
                level:"1",
                pid:""
            },
            {
                menu_name : "中医药名校",
                menu_url: "/knowledgeDb/dataBack",
                id:"11",
                level:"1",
                pid:""
            },
            {
                menu_name : "中医药名企",
                menu_url: "/knowledgeDb/dataBack",
                id:"12",
                level:"1",
                pid:""
            },
        ];









        function getHTML_dropdown_menu_item(astr,aurl,show_active) {
            var str = "<a class=\"dropdown-item  "+  (show_active ? "active" : "")  +" \" url=\"" + aurl +"\">" + astr + "</a>\n" ;
            return str;
        }


        function getHTML_dropdown_menu(itemStr) {
            var str = "<div class=\"dropdown-menu left-menu-dropdown-menu\">\n" +
                itemStr +
                "</div>";
            return str;
        }


        function getHTML(header,dropdownStr,show_active){
            var uuid = stringUtil.getUUID();
            var str = "<div class=\"card\">\n" +
                "                    <div class=\"\" id=\"headingOne\">\n" +
                "                        <button class=\"collapse-btn btn btn-link btn-block text-left\" type=\"button\" data-toggle=\"collapse\" data-target=\"#"+uuid+"\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\n" +
                "                            <h4>"+ header +"</h4>\n" +
                "                        </button>\n" +
                "                    </div>\n" +
                "\n" +
                "                    <div id=\"" + uuid + "\" class=\"collapse " + (show_active ? "show" : "")   + " \" aria-labelledby=\"headingOne\" data-parent=\"#accordionExample\">\n" +
                        dropdownStr +
                "                    </div>\n" +
                "                </div>";
            return str;
        }



        function getMenuStr(menuList){
            if(stringUtil.isBlank(menuList)){
                return "";
            };
            var topMenu = [];
            $.each(menuList,function (i,item) {
                if(item.level == 1){
                    topMenu.push(item);
                }
            });

            var htmlStr = "";
            $.each(topMenu,function (i,tm_item) {
                var dropdowStr = "";
                var show = false;
                $.each(menuList,function (j,item) {
                    var active =false;
                    if(item.pid == tm_item.id){
                        if(!stringUtil.isBlank(currentUrlHash) && currentUrlHash == item.menu_url){
                            active = true;
                            show = true;
                        }
                        dropdowStr = dropdowStr + getHTML_dropdown_menu_item(item.menu_name,item.menu_url,active);
                    }
                });
                dropdowStr = getHTML_dropdown_menu(dropdowStr);
                htmlStr = htmlStr + getHTML(tm_item.menu_name,dropdowStr,show);
            });

            return htmlStr;
        }


        $("#left_menu").html(getMenuStr(menu_list));


        $(".collapse-btn").unbind().on("click",function () {
            $(".collapse").removeClass("show");
            $($(this).attr("data-target")).addClass("show");
        });


        $(".dropdown-item").unbind().on("click",function () {
            $(".dropdown-item").removeClass("active");
            $(this).addClass("active");
            loadPage($(this).attr("url"));
        });


        function loadPage(url){
            orange.loadPage({url: url, target: 'main_body', selector: '#fir_body', success: function(data){
                    if(typeof data == "string"){
                        console.log(url + "加载")
                    } else {
                        alertUtil.error( url+'加载失败');
                    }
                }})
        }


        $("#logout").on("click",function () {
            ajaxUtil.myAjax(null,"/api/user/userLogout",null,function (data) {
                if(ajaxUtil.success(data)){
                    orange.stop();
                    window.location.href = "/userLogin";
                }else{
                    alertUtil.alert(data.msg);
                }
            },false)
        });

        if(!stringUtil.isBlank(currentUrlHash)){
            loadPage(currentUrlHash);
        }

    })
})();