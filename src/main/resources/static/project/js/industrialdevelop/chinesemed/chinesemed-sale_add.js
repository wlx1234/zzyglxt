
(function () {
    require(['jquery','ajaxUtil','stringUtil','uploadImg','objectUtil',"distpicker","urlUtil","fileUtil","modalUtil",'alertUtil'],
        function ($,ajaxUtil,stringUtil,uploadImg, objectUtil,distpicker,urlUtil,fileUtil,modalUtil,alertUtil) {
            var url = "/industrialdevelop/chi-med";

            var pathUrl = "/industrialdevelop/chinesemed/chinesemed-sale_add";

            var orgType = 'sale'

            var itemcode = stringUtil.getUUID();

            var type = isUpdate() ? "put":"post";

            uploadImg.init();

            const editor = objectUtil.wangEditorUtil();


            $("#cancelBtn").click(function () {
                orange.redirect(pathUrl)
            });

            function generateParam(){
                var param = {};
                param.name = $("#name").val();
                param.salesCategory = $("#salesCategory").val();
                param.sellingDrugs = $("#sellingDrugs").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.addressPro = $("#addressPro").val()
                param.addressCity = $("#addressCity").val()
                param.addressCountry = $("#addressCountry").val()
                param.address = $("#address").val()
                param.intruduce = $(".w-e-text").html();
                param.orgCode = sessionStorage.getItem("orgCode");
                param.type = orgType
                param.itemcode = itemcode;
                return param;
            }

            function checkParam(param) {
                if (stringUtil.isBlank(param.name)){
                    alertUtil.error("企业名称不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.salesCategory)){
                    alertUtil.error("销售种类不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.sellingDrugs)){
                    alertUtil.error("销售药品不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.contacts)){
                    alertUtil.error("联系人不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.phone)){
                    alertUtil.error("联系方式不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.addressPro)){
                    alertUtil.error("省份不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.addressCity)){
                    alertUtil.error("地市不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.addressCountry)){
                    alertUtil.error("县/区不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.address)){
                    alertUtil.error("详细地址不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.intruduce)){
                    alertUtil.error("简介不能为空")
                    return false
                }
                return true
            }

            $("#saveBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "0";

                if (uploadImg.isUpdate()){
                    fileUtil.handleFile(isUpdate(), param.itemcode, uploadImg.getFiles()[0]);
                }

                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect(pathUrl);
                    }else {
                        alert(data.msg);
                    }
                },true,"123",type);
                return false;
            });

            $("#submitBtn").unbind('click').on('click',function () {
                var submitModalData = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提示",
                    modalClass: "modal-lg",
                    modalConfirmFun: function () {
                        var param = generateParam();
                        param.status = "1";
                        if (!checkParam(param)){
                            return
                        }
                        if (uploadImg.isUpdate()){
                            fileUtil.handleFile(isUpdate(), param.itemcode, uploadImg.getFiles()[0]);
                        }
                        ajaxUtil.myAjax(null,url,param,function (data) {
                            if(ajaxUtil.success(data)){
                                orange.redirect(pathUrl)
                            }else {
                                alert(data.msg)
                            }
                        },true,"123",type);

                        submitModal.hide()
                        var submitConfirmModal = {
                            modalBodyID: "myTopicSubmitTip",
                            modalTitle: "提示",
                            modalClass: "modal-lg",
                            cancelButtonStyle: "display:none",
                            confirmButtonClass: "btn-danger",
                            modalConfirmFun: function () {
                                submitConfirm.hide()
                                return true;
                            }
                        }
                        var submitConfirm = modalUtil.init(submitConfirmModal)
                        submitConfirm.show()

                    }
                }
                var submitModal = modalUtil.init(submitModalData)
                submitModal.show()

                return false;
            });

            var init = function () {
                if (isUpdate()){
                    var needData;
                    ajaxUtil.myAjax(null,url + "/getByOrgCode",null,function (data) {
                        if(ajaxUtil.success(data)){
                            needData = data.data;
                        }
                    },false,true,"get");
                    $("#name").val(needData.name);
                    $("#salesCategory").val(needData.salesCategory);
                    $("#sellingDrugs").val(needData.sellingDrugs);
                    $("#contacts").val(needData.contacts);
                    $("#distpicker").distpicker({
                        province: needData.addressPro,
                        city: needData.addressCity,
                        district: needData.addressCountry
                    });
                    $("#address").val(needData.address);
                    $("#phone").val(needData.phone);
                    editor.txt.html(needData.intruduce);
                    itemcode = needData.itemcode
                    uploadImg.setImgSrc(needData.filePath)
                }else {
                    $("#distpicker").distpicker();
                }
                $("input").attr("required","required")
                init = function () {

                }
            };
            init();


            function isUpdate() {
                return (urlUtil.getFullUrl().indexOf("/main#") != -1 || urlUtil.getFullUrl().indexOf("/main?") != -1)
            }
    })
})();



