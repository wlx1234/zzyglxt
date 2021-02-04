(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,modalUtil) {

            const editor = objectUtil.wangEditorUtil();

            $("#cancelbtn").unbind().on('click',function () {
                var url = "/data/dataLeader";
                orange.redirect(url);
            });
            $("#btn_save").unbind().on('click',function () {
                var leaderEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/datado/leader/insertLeader";
                    operateMessage = "新增领导讲话成功";
                    leaderEntity = {
                        itemcode: stringUtil.getUUID(),
                        dataTitle : $("#dataTitle").val(),
                        dataSource : $("#dataSource").val(),
                        releaseOrNot : "y",
                        dataStatus : "0",
                        dataContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/datado/leader/updateLeader";
                    leaderEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        dataTitle : $("#dataTitle").val(),
                        dataSource : $("#dataSource").val(),
                        dataContent : editor.txt.html()
                    }
                    operateMessage = "更新领导讲话成功";
                }

                fileUtil.handleFile(isUpdate(), leaderEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,leaderEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        var submitConfirmModal = {
                            modalBodyID :"myTopicSubmitTip",
                            modalTitle : "提示",
                            modalClass : "modal-lg",
                            cancelButtonStyle: "display:none",
                            modalConfirmFun:function (){
                                var url = "/data/dataLeader";
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


            $("#submitbtn").unbind().on('click',function () {
                var mySubmitToCZ = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提交",
                    modalClass: "modal-lg",
                    modalConfirmFun:function (){
                        var leaderEntity;
                        var addUpdateUrl;
                        var operateMessage;
                        if(!isUpdate()){
                            addUpdateUrl = "/datado/leader/insertLeader";
                            operateMessage = "新增领导讲话成功";
                            leaderEntity = {
                                itemcode: stringUtil.getUUID(),
                                dataTitle : $("#dataTitle").val(),
                                dataSource : $("#dataSource").val(),
                                releaseOrNot : "y",
                                dataStatus : "1",
                                dataContent : editor.txt.html()
                            };
                        }else{
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            addUpdateUrl = "/datado/leader/updateLeader";
                            leaderEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                dataTitle : $("#dataTitle").val(),
                                dataSource : $("#dataSource").val(),
                                dataContent : editor.txt.html()
                            }
                            operateMessage = "更新领导讲话成功";
                        }

                        fileUtil.handleFile(isUpdate(), leaderEntity.itemcode, $("#upload_file")[0].files[0]);

                        ajaxUtil.myAjax(null,addUpdateUrl,leaderEntity,function (data) {
                            if(ajaxUtil.success(data)){
                                var submitConfirmModal = {
                                    modalBodyID :"myTopicSubmitTip",
                                    modalTitle : "提示",
                                    modalClass : "modal-lg",
                                    cancelButtonStyle: "display:none",
                                    modalConfirmFun:function (){
                                        var url = "/data/dataLeader";
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
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#dataTitle").val(tempdata.dataTitle);
                    $("#dataSource").val(tempdata.dataSource);
                    editor.txt.html(tempdata.dataContent);
                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
            /*
           上传文件
           */
            document.getElementById('upload_file').onchange=function(){
                var len=this.files.length;
                $("#addFile").empty("p");
                for (var i = 0; i < len; i++) {
                    var name = this.files[i].name;
                    var j=i+1;
                    $("#addFile").append('<p>附件'+j+'：&nbsp;'+ name +'&nbsp;</p>');
                };
                if(len>0){
                    $("#clsfile").css("display","block")
                }
            }
            document.getElementById('clsfile').onclick = function() {
                $("#upload_file").val("");
                $("#clsfile").css("display","none");
                $("#addFile").empty("p");
            }

        })
})();
