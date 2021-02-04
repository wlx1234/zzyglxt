(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','uploadImg','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,uploadImg,modalUtil) {

            const editor = objectUtil.wangEditorUtil();

            uploadImg.init();

            /*下拉框值*/
            $("#dataLocation").selectUtil(dictUtil.getDictByCode(dictUtil.DICT_LIST.dataLocation));

            $("#cancelbtn").unbind().on('click',function () {
                var url = "/data/dataNewsRotations";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var newsRotationsEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/datado/newsInf/insertNewsInf";
                    operateMessage = "新增新闻轮播图成功";
                    newsRotationsEntity = {
                        itemcode: stringUtil.getUUID(),
                        dataTitle : $("#dataTitle").val(),
                        dataSource : $("#dataSource").val(),
                        dataAuthor : $("#dataAuthor").val(),
                        dataContent : editor.txt.html(),
                        releaseOrNot : "y",
                        dataStatus : "0",
                        dataLocation : $("#dataLocation").val(),
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/datado/newsInf/updateNewsInf";
                    newsRotationsEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        dataTitle : $("#dataTitle").val(),
                        dataSource : $("#dataSource").val(),
                        dataAuthor : $("#dataAuthor").val(),
                        dataContent : editor.txt.html(),
                        dataLocation : $("#dataLocation").val(),
                    }
                    operateMessage = "更新新闻轮播图成功";
                }

                fileUtil.handleFile(isUpdate(), newsRotationsEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,newsRotationsEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            var submitConfirmModal = {
                                modalBodyID :"myTopicSubmitTip",
                                modalTitle : "提示",
                                modalClass : "modal-lg",
                                cancelButtonStyle: "display:none",
                                modalConfirmFun:function (){
                                    var url = "/data/dataNewsRotations";
                                    orange.redirect(url);
                                    return true;
                                }
                            }
                            var submitConfirm = modalUtil.init(submitConfirmModal);
                            submitConfirm.show();

                        }else{
                            alertUtil.error(data.msg);
                        }
                    }else {
                        alertUtil.error(data.msg);
                    }
                },false,true);
                return false;
            });

            $("#submitbtn").unbind().on('click',function () {
                var mySubmitToCZ = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提交",
                    modalClass: "modal-lg",
                    modalConfirmFun: function () {
                        var newsRotationsEntity;
                        var addUpdateUrl;
                        var operateMessage;
                        if(!isUpdate()){
                            addUpdateUrl = "/datado/newsInf/insertNewsInf";
                            operateMessage = "新增新闻轮播图成功";
                            newsRotationsEntity = {
                                itemcode: stringUtil.getUUID(),
                                dataTitle : $("#dataTitle").val(),
                                dataSource : $("#dataSource").val(),
                                dataAuthor : $("#dataAuthor").val(),
                                dataContent : editor.txt.html(),
                                releaseOrNot : "y",
                                dataStatus : "1",
                                dataLocation : $("#dataLocation").val(),
                            };
                        }else{
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            addUpdateUrl = "/datado/newsInf/updateNewsInf";
                            newsRotationsEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                dataTitle : $("#dataTitle").val(),
                                dataSource : $("#dataSource").val(),
                                dataAuthor : $("#dataAuthor").val(),
                                dataStatus : "1",
                                dataContent : editor.txt.html(),
                                dataLocation : $("#dataLocation").val(),
                            }
                            operateMessage = "更新并提交新闻轮播图成功";
                        }

                        fileUtil.handleFile(isUpdate(), newsRotationsEntity.itemcode, uploadImg.getFiles()[0]);

                        ajaxUtil.myAjax(null,addUpdateUrl,newsRotationsEntity,function (data) {
                            if(ajaxUtil.success(data)){
                                if(data.code == ajaxUtil.successCode) {
                                    var submitConfirmModal = {
                                        modalBodyID :"myTopicSubmitTip",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            var url = "/data/dataNewsRotations";
                                            orange.redirect(url);
                                            return true;
                                        }
                                    }
                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                    submitConfirm.show();

                                }else{
                                    alertUtil.error(data.msg);
                                }
                            }else {
                                alertUtil.error(data.msg);
                            }
                        },false,true);
                        return true;
                    }
                }
                var x = modalUtil.init(mySubmitToCZ);
                x.show();
                return false;
            });

            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#dataTitle").val(tempdata.dataTitle);
                    $("#dataSource").val(tempdata.dataSource);
                    $("#dataAuthor").val(tempdata.dataAuthor);
                    $("#dataLocation").val(tempdata.dataLocation);
                    editor.txt.html(tempdata.dataContent);
                    var img = tempdata.filePath;
                    uploadImg.setImgSrc(img);
                    //$("#dataLocation option[value="+tempdata.dataLocation+"] ").attr("selected",true);
                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

        })
})();



