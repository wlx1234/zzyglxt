(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


        var url = "/datado/newsInf/selectAllNewsRot";

        var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);

        var webLocation = dictUtil.getDictByCode(dictUtil.DICT_LIST.dataLocation);

        //角色加载工具
        url = selectUtil.getRoleTable(sessionStorage.getItem("rolename"),url,"dataStatus",webStatus);

        var addUrl = "/data/add/addNewsRotations";
        var aParam = {

        };

        //操作
        function operation(value, row, index){
            return selectUtil.getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.dataStatus,webStatus);
        }


            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect(addUrl);
                },

                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteNewsRotations",
                        modalTitle : "删除新闻轮播图",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"/datado/newsInf/deleteByPrimaryKey/"+row.itemid+"/"+row.itemcode,null,function (data) {
                                if(ajaxUtil.success(data)){
                                    ajaxUtil.myAjax(null,"/file/delete?dataCode="+row.itemcode,null,function (data) {
                                        if(!ajaxUtil.success(data)){
                                            return alertUtil.error("图片删除失败");
                                        }
                                    },false,"","get");
                                    var submitConfirmModal = {
                                        modalBodyID :"myTopicSubmitTip",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            return true;
                                        }
                                    }
                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                    submitConfirm.show();
                                    isSuccess = true;
                                    refreshTable();
                                }
                            },false,true,"delete");
                            return isSuccess;
                        }
                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                },

                'click .pass' : function (e, value, row, index) {
                    var myPassNewsRotationsModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            //判断是否在前面加0
                            function getNow(s) {
                                return s < 10 ? '0' + s: s;
                            }
                            var myDate = new Date();
                            var year=myDate.getFullYear();        //获取当前年
                            var month=myDate.getMonth()+1;   //获取当前月
                            var date=myDate.getDate();            //获取当前日
                            var h=myDate.getHours();              //获取当前小时数(0-23)
                            var m=myDate.getMinutes();          //获取当前分钟数(0-59)
                            var s=myDate.getSeconds();
                            var now=year+'-'+getNow(month)+"-"+getNow(date)+" "+getNow(h)+':'+getNow(m)+":"+getNow(s);
                            var submitStatus = {
                                "dataStatus": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus),
                                "dataDelayedRelease": now
                            };
                            ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID :"myTopicSubmitTip",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            modalConfirmFun:function (){
                                                return true;
                                            }
                                        }
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false);
                            return isSuccess;
                        }

                    };
                    var myPassModal = modalUtil.init(myPassNewsRotationsModalData);
                    myPassModal.show();
                },

                'click .fail' : function (e, value, row, index) {
                    var myFailNewsRotationsModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "dataStatus": ""
                            };
                            if(sessionStorage.getItem("rolename") == "文化宣传处长" || sessionStorage.getItem("rolename") == "政务资源处长"){
                                submitStatus.dataStatus = webStatus[3].id;
                            }else{
                                submitStatus.dataStatus = webStatus[4].id;
                            }
                            ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID :"myTopicSubmitTip",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            modalConfirmFun:function (){
                                                return true;
                                            }
                                        }
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false);
                            return isSuccess;
                        }

                    };
                    var myFailModal = modalUtil.init(myFailNewsRotationsModalData);
                    myFailModal.show();
                },

                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfNewsRotationsModalData ={
                        modalBodyID :"myUnderShelfModal",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "dataStatus": webStatus[6].id
                            };
                            ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID :"myTopicSubmitTip",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            modalConfirmFun:function (){
                                                return true;
                                            }
                                        }
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false);
                            return isSuccess;
                        }

                    };
                    var myUnderShelfModal = modalUtil.init(myUnderShelfNewsRotationsModalData);
                    myUnderShelfModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    var myViewNewsRotationsModalData ={
                        modalBodyID : "myViewDataModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myNewsRotationsModal = modalUtil.init(myViewNewsRotationsModalData);
                    $("#dataTitle").val(row.dataTitle);
                    $("#dataSource").val(row.dataSource);
                    $("#dataAuthor").val(row.dataAuthor);
                    $("#dataContent").html(row.dataContent);
                    $("#creater").val(row.creater);
                    $("#itemCreateAt").val(row.itemcreateat);
                    $("#dataStatus").val(webStatus[row.dataStatus].text);
                    $("#dataFileType").val(webLocation[row.dataLocation].text);
                    $("#newsImg").attr("src",row.filePath);
                    $('#newsImgSpan').html("新闻图片：");
                    $('#dataTitleSpan').html("新闻标题：");
                    $('#dataFileTypeSpan').html("所属位置：");

                    myNewsRotationsModal.show();
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitNewsRotationsModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "dataStatus": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID :"myTopicSubmitTip",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            modalConfirmFun:function (){
                                                return true;
                                            }
                                        }
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }

                                }
                            },false);
                            return isSuccess;
                        }

                    };
                    var mySubmitModal = modalUtil.init(mySubmitNewsRotationsModalData);
                    mySubmitModal.show();
                },

                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitNewsRotationsModalData ={
                        modalBodyID :"myNoSubmitModal",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "dataStatus": webStatus[0].id
                            };
                            ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID :"myTopicSubmitTip",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            modalConfirmFun:function (){
                                                return true;
                                            }
                                        }
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }

                                }
                            },false);
                            return isSuccess;
                        }
                    };
                    var mySubmitModal = modalUtil.init(myNoSubmitNewsRotationsModalData);
                    mySubmitModal.show();
                },

            };


        $("#btn_addTask").unbind().on('click',function () {
            localStorage.removeItem("rowData");
            orange.redirect(addUrl);
        });

        $("#chargePersonSearch").selectUtil(selectUtil.inSearchStatus());

        var aCol = [
            {field: 'dataTitle', title: '新闻标题'},
            {field: 'filePath', title: '新闻图片', formatter:function (value, row, index) {
                if(value == "已经损坏了"){
                    return '<p>'+value+'</p>';
                }else{
                    return '<img  src='+value+' width="100" height="100" class="img-rounded" >';
                }
            }},
            {field: 'dataLocation', title: '所属位置', formatter: function (value) {
                    return '</p>'+webLocation[value].text+'</p>'
                }},
            {field: 'itemcreateat', title: '创建时间'},
            {field: 'dataStatus', title: '展示状态', formatter: function (value) {
                    return '</p>'+webStatus[value].text+'</p>'
                }},
            {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
        ];

        var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

        function refreshTable() {
            var param = {};
            myTable.free();
            myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
        }

        var allPosition = document.getElementById("allPosition").children;
        for(var i=1;i<allPosition.length;i++){
            allPosition[i].onclick=function () {
                var addstr=document.getElementById("chargePersonSearch").value; //搜索里的
                for(var j=1;j<allPosition.length;j++){
                    allPosition[j].classList.remove("addC");
                }
                this.classList.add("addC");
                var newArry = [];
                var allTableData = JSON.parse(localStorage.getItem("2"));
                var str=this.innerHTML;
                if (str=='位置一'){
                    str=0;
                }else if (str=='位置二'){
                    str=1;
                }else if (str=='位置三'){
                    str=2;
                }else if (str=='位置四'){
                    str=3;
                }else if (str=='位置五'){
                    str=4;
                }
                if (str=='全部'){
                    for (var i in allTableData) {
                        var status= allTableData[i]["dataStatus"] //表格里的
                        if(status == "0") status =0;
                        else if(status == "1" || status == "2") status = 1;
                        else if(status == "3" || status == "4") status = 2;
                        else if(status == "5") status = 3;
                        else if (status == "6") status = 4;
                        if (addstr== status || addstr ==99 ) {
                            newArry.push(allTableData[i]);
                        }
                    }
                    $("#table").bootstrapTable("load", newArry);
                }else {
                    for (var i in allTableData) {
                        var thisPosition = allTableData[i][aCol[2].field];
                        var status= allTableData[i]["dataStatus"] //表格里的
                        if(status == "0") status =0;
                        else if(status == "1" || status == "2") status = 1;
                        else if(status == "3" || status == "4") status = 2;
                        else if(status == "5") status = 3;
                        else if (status == "6") status = 4;
                    if (thisPosition == str && (addstr== status || addstr ==99 )) {
                            newArry.push(allTableData[i]);
                        }
                    }
                    $("#table").bootstrapTable("load", newArry);
                }
            }
        }

    })
})();
