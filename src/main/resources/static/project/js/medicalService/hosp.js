(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            var url = "/medicalService/hosp/selectAll";
            var addUrl = "/medicalService/add/addHosp"
            var aParam = {
            };

            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            /*对url加工*/
            url = selectUtil.getRoleTable(sessionStorage.getItem("rolename"),url,"hospitalStatus",webStatus);

            //操作
            function operation(value, row, index){
                return selectUtil.getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.hospitalStatus,webStatus)
            }

            function handlePro(pro){
                if (pro == "河北省" ||
                    pro == null ||
                    pro == undefined ||
                    pro.toLowerCase() == "null") {
                    pro = ""
                }
                return pro;
            }

            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect(addUrl);
                },

                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteHospital",
                        modalTitle : "删除医院",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var hospKey = {
                                itemid : row.itemid,
                                itemcode : row.itemcode
                            };
                            ajaxUtil.myAjax(null,"/medicalService/hosp/delete",hospKey,function (data) {
                                if(ajaxUtil.success(data)){
                                    ajaxUtil.myAjax(null,"/file/delete?dataCode="+row.itemcode,null,function (data) {
                                        if(!ajaxUtil.success(data)){
                                            return alertUtil.error("文件删除失败");
                                        }
                                    },false,"","get");
                                    var submitConfirmModal = {
                                        modalBodyID: "myTopicSubmitTip",
                                        modalTitle: "提示",
                                        modalClass: "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        confirmButtonClass: "btn-danger",
                                        modalConfirmFun: function () {
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
                    var myPassTravelModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "status": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"/medicalService/hosp/updateStatus",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
                                        if(sessionStorage.getItem("rolename") == "文化宣传处长"){
                                            var submitConfirmModal = {
                                                modalBodyID: "myTopicSubmitTip",
                                                modalTitle: "提示",
                                                modalClass: "modal-lg",
                                                cancelButtonStyle: "display:none",
                                                confirmButtonClass: "btn-danger",
                                                modalConfirmFun: function () {
                                                    return true;
                                                }
                                            }
                                            var submitConfirm = modalUtil.init(submitConfirmModal);
                                            submitConfirm.show();
                                        }else{
                                            var submitConfirmModal = {
                                                modalBodyID: "myTopicSubmitTip",
                                                modalTitle: "提示",
                                                modalClass: "modal-lg",
                                                cancelButtonStyle: "display:none",
                                                confirmButtonClass: "btn-danger",
                                                modalConfirmFun: function () {
                                                    return true;
                                                }
                                            }
                                            var submitConfirm = modalUtil.init(submitConfirmModal);
                                            submitConfirm.show();
                                        }
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
                    var myPassModal = modalUtil.init(myPassTravelModalData);
                    myPassModal.show();
                },

                'click .fail' : function (e, value, row, index) {
                    var myFailTravelModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "status": ""
                            };
                            if(sessionStorage.getItem("rolename") == "文化宣传处长" || sessionStorage.getItem("rolename") == "政务资源处长"){
                                submitStatus.status = webStatus[3].id;
                            }else{
                                submitStatus.status = webStatus[4].id;
                            }
                            ajaxUtil.myAjax(null,"/medicalService/hosp/updateStatus",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID: "myTopicSubmitTip",
                                            modalTitle: "提示",
                                            modalClass: "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            confirmButtonClass: "btn-danger",
                                            modalConfirmFun: function () {
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
                    var myFailModal = modalUtil.init(myFailTravelModalData);
                    myFailModal.show();
                },

                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfTravelModalData ={
                        modalBodyID :"myUnderShelfModal",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "status": webStatus[6].id
                            };
                            ajaxUtil.myAjax(null,"/medicalService/hosp/updateStatus",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID: "myTopicSubmitTip",
                                            modalTitle: "提示",
                                            modalClass: "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            confirmButtonClass: "btn-danger",
                                            modalConfirmFun: function () {
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
                    var myUnderShelfModal = modalUtil.init(myUnderShelfTravelModalData);
                    myUnderShelfModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    var myViewTravelModalData ={
                        modalBodyID : "myViewHospModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myTravelModal = modalUtil.init(myViewTravelModalData);
                    $("#hospitalImg").attr("src",row.filePath)
                    $("#hospitalName").val(row.hospitalName);
                    $("#hospitalLevel").val(row.hospitalLevel);
                    $("#hospitalBriefIntroduce").val(row.hospitalBriefIntroduce);
                    $("#hospitalKeySpecialty").val(row.hospitalKeySpecialty);
                    $("#hospitalTelephone").val(row.hospitalTelephone);
                    $("#hospitalAddress").val(handlePro(row.hospitalAddressPro) + row.hospitalAddressCity + row.hospitalAddressCountry + row.hospitalAddress);
                    $("#hospitalLink").val(row.hospitalLink);
                    $("#hospitalIntroduce").html(row.hospitalIntroduce)
                    $("#hospitalStatus").val(webStatus[row.hospitalStatus].text);
                    $("#creater").val(row.creater);
                    $("#itemCreateAt").val(row.itemcreateat);
                    myTravelModal.show();
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitTravelModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "status": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"/medicalService/hosp/updateStatus",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID: "myTopicSubmitTip",
                                            modalTitle: "提示",
                                            modalClass: "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            confirmButtonClass: "btn-danger",
                                            modalConfirmFun: function () {
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
                    var mySubmitModal = modalUtil.init(mySubmitTravelModalData);
                    mySubmitModal.show();
                },

                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitTravelModalData ={
                        modalBodyID :"myNoSubmitModal",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "status": webStatus[0].id
                            };
                            ajaxUtil.myAjax(null,"/medicalService/hosp/updateStatus",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID: "myTopicSubmitTip",
                                            modalTitle: "提示",
                                            modalClass: "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            confirmButtonClass: "btn-danger",
                                            modalConfirmFun: function () {
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
                    var mySubmitModal = modalUtil.init(myNoSubmitTravelModalData);
                    mySubmitModal.show();
                },
            };

            /*新增医院*/
            $("#btn_addTask").unbind().on('click',function () {
                localStorage.removeItem("rowData");
                orange.redirect(addUrl)
            });


            $("#chargePersonSearch").selectUtil(selectUtil.inSearchStatus());

            var aCol = [
                {field: 'hospitalName', title: '医院名称'},
                {field: 'filePath', title: '图片',width:'200px',formatter:function (value, row, index) {
                        if(value == "已经损坏了"){
                            return value;
                        }else{
                            return '<img  src='+value+' width="100" height="100" class="img-rounded" >';
                        }
                    }},
                {field: 'hospitalAddress', title: '地址',formatter:function (value, row, index) {
                        return handlePro(row.hospitalAddressPro) + row.hospitalAddressCity + row.hospitalAddressCountry + value
                    }},
                {field: 'hospitalTelephone', title: '联系电话', width:'200px'},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            bootstrapTableUtil.globalSearch2("table",url,aParam, aCol,"hospitalStatus");

        })
})();
