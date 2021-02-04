(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg,modalUtil) {
            const editor = objectUtil.wangEditorUtil();

            uploadImg.init();

            $("#cancel").unbind().on('click',function () {
                var url = "/chineseCultural/facility/intangibleCulturalHeritage";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var inCuHeEntity;
                var addUpdateUrl;
                if(!isUpdate()){
                    addUpdateUrl = "/cul/fac/inCuHe/addInCuHe";
                    inCuHeEntity = {
                        itemcode: stringUtil.getUUID(),
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '0',
                        chineseCulturalContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/cul/fac/inCuHe/updInCuHe";
                    inCuHeEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '0',
                        chineseCulturalContent : editor.txt.html()
                    }
                }

                fileUtil.handleFile(isUpdate(), inCuHeEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,inCuHeEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        var submitConfirmModal = {
                            modalBodyID :"myTopicSubmitTip",
                            modalTitle : "提示",
                            modalClass : "modal-lg",
                            cancelButtonStyle: "display:none",
                            modalConfirmFun:function (){
                                var url = "/chineseCultural/facility/intangibleCulturalHeritage";
                                orange.redirect(url);
                                return true;
                            }
                        }
                        var submitConfirm = modalUtil.init(submitConfirmModal);
                        submitConfirm.show();

                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
            return false;
            });

            $("#btn_insert").unbind().on('click',function () {
                var mySubmitToCZ = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提交",
                    modalClass: "modal-lg",
                    modalConfirmFun:function (){
                        var inCuHeEntity;
                        var addUpdateUrl;
                        if(!isUpdate()){
                            addUpdateUrl = "/cul/fac/inCuHe/addInCuHe";
                            inCuHeEntity = {
                                itemcode: stringUtil.getUUID(),
                                chineseCulturalName : $("#chineseCulturalName").val(),
                                chineseCulturalSource : $("#chineseCulturalSource").val(),
                                chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                                chineseCulturalStatus : '1',
                                chineseCulturalContent : editor.txt.html()
                            };
                        }else{
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            addUpdateUrl = "/cul/fac/inCuHe/updInCuHe";
                            inCuHeEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                chineseCulturalName : $("#chineseCulturalName").val(),
                                chineseCulturalSource : $("#chineseCulturalSource").val(),
                                chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                                chineseCulturalStatus : '1',
                                chineseCulturalContent : editor.txt.html()
                            }
                        }

                        fileUtil.handleFile(isUpdate(), inCuHeEntity.itemcode, uploadImg.getFiles()[0]);

                        ajaxUtil.myAjax(null,addUpdateUrl,inCuHeEntity,function (data) {
                            if(ajaxUtil.success(data)){
                                var submitConfirmModal = {
                                    modalBodyID :"myTopicSubmitTip",
                                    modalTitle : "提示",
                                    modalClass : "modal-lg",
                                    cancelButtonStyle: "display:none",
                                    modalConfirmFun:function (){
                                        var url = "/chineseCultural/facility/intangibleCulturalHeritage";
                                        orange.redirect(url);
                                        return true;
                                    }
                                }
                                var submitConfirm = modalUtil.init(submitConfirmModal);
                                submitConfirm.show();

                            }else {
                                alertUtil.alert(data.msg);
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
                    $(".titleCSS").text("修改非物质文化遗产信息");
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#chineseCulturalName").val(tempdata.chineseCulturalName);
                    $("#chineseCulturalSource").val(tempdata.chineseCulturalSource);
                    $("#chineseCulturalAuthor").val(tempdata.chineseCulturalAuthor);
                    editor.txt.html(tempdata.chineseCulturalContent);
                    var img = tempdata.filePath;
                    uploadImg.setImgSrc(img);
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();
