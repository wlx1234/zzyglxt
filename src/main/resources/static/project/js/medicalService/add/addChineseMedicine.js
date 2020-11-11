(function () {
    require(['jquery','wangEditor','ajaxUtil','alertUtil','stringUtil','dictUtil'],
        function (jquery,wangEditor,ajaxUtil,alertUtil,stringUtil,dictUtil) {
            const editor = new wangEditor('#div1')
            // 或者 const editor = new E( document.getElementById('div1') )
            //菜单配置
            editor.config.menus = [
                'head',
                'bold',
                'fontSize',
                'fontName',
                'italic',
                'underline',
                'strikeThrough',
                'indent',
                'lineHeight',
                'foreColor',
                'backColor',
                'link',
                'list',
                'justify',
                'image',
                'table',
                'splitLine',
                'undo',
                'redo',

            ]
            //取消粘贴后的样式
            editor.config.pasteFilterStyle = false
            //不粘贴图片
            editor.config.pasteIgnoreImg = true
            //隐藏上传网络图片
            editor.config.showLinkImg = false
            editor.config.uploadImgShowBase64 = true
            editor.create()
            editor.txt.html('')

            $("#div1").on("input propertychange", function() {
                var textNUm=editor.txt.text()
                if(textNUm.length>=100000){
                    str=textNUm.substring(0,10000)+"";  //使用字符串截取，获取前30个字符，多余的字符使用“......”代替
                    editor.txt.html(str);
                    alert("字数不能超过10000");                  //将替换的值赋值给当前对象
                }
            });
            const editor2 = new wangEditor('#div2')
            // 或者 const editor = new E( document.getElementById('div1') )
            //菜单配置
            editor2.config.menus = [
                'head',
                'bold',
                'fontSize',
                'fontName',
                'italic',
                'underline',
                'strikeThrough',
                'indent',
                'lineHeight',
                'foreColor',
                'backColor',
                'link',
                'list',
                'justify',
                'image',
                'table',
                'splitLine',
                'undo',
                'redo',

            ]
            //取消粘贴后的样式
            editor2.config.pasteFilterStyle = false
            //不粘贴图片
            editor2.config.pasteIgnoreImg = true
            //隐藏上传网络图片
            editor2.config.showLinkImg = false
            editor2.config.uploadImgShowBase64 = true
            editor2.create()
            editor2.txt.html('')

            $("#div2").on("input propertychange", function() {
                var textNUm=editor2.txt.text()
                if(textNUm.length>=100000){
                    str=textNUm.substring(0,10000)+"";  //使用字符串截取，获取前30个字符，多余的字符使用“......”代替
                    editor2.txt.html(str);
                    alert("字数不能超过10000");                  //将替换的值赋值给当前对象
                }
            });

            var specialtys = {}
            function specialtySelect(){
                ajaxUtil.myAjax(null,"/medicalService/specialty/selectByHospCode?hospCode=" + $("#hospitalName").val(),null,function (data) {
                    if(ajaxUtil.success(data)){
                        specialtys = data.data
                        var html = "";
                        $.each(specialtys,function (i,it) {
                            html = html + '<option value="'+it.itemcode+'">'+it.specialtyName+'</option>';
                        });
                        $("#specialtyName").html("");
                        $("#specialtyName").append(html);
                    }
                },false,true,"get");
            }
            $("#hospitalName").change(specialtySelect)
            $("#specialtyName").unbind().on('click',function () {
                if (JSON.stringify(specialtys) === '{}'){
                    specialtySelect()
                }
            })

            $("#cancel").unbind().on('click',function () {
                $("#main_body").html("");
                var url = "/medicalService/chineseMedicine";
                orange.loadPage({url: url, target: 'main_body', selector: '#fir_body', success: function(data){
                        if(data == null||data == ""){
                            return alertUtil.error( url+'加载失败');
                        }
                        $("#main_body").html(data);
                    }})
            });

            $("#btn_insert").unbind().on('click',function () {
                var hosp;
                $.each(hosps,function (i,it) {
                    if (it.itemcode == $("#hospitalName").val()){
                        hosp = it;
                    }
                });
                var specialty;
                $.each(specialtys,function (i,it) {
                    if (it.itemcode == $("#specialtyName").val()){
                        specialty = it;
                    }
                });
                var hospEntity = {
                    itemcode: stringUtil.getUUID(),
                    chineseMedicineName : $("#chineseMedicineName").val(),
                    chineseMedicineTitle : $("#chineseMedicineTitle").val(),
                    chineseMedicineType : $("#chineseMedicineType").val(),
                    hospCode : hosp.itemcode,
                    hospitalName : hosp.hospitalName,
                    deptCode : specialty.itemcode,
                    specialtyName : specialty.specialtyName,
                    visitTime : $("#visitTime").val(),
                    phone : $("#phone").val(),
                    mainVisit : $("#mainVisit").val(),
                    expertIntroduce : editor.txt.html(),
                    medicineRecords : editor2.txt.html()
                };

                var formData = new FormData();
                formData.append("dataCode",hospEntity.itemcode);
                formData.append("file",$("#upload_file")[0].files[0]);
                formData.append("itemcode",stringUtil.getUUID());
                formData.append("uploader","admin");
                formData.append("uploaderCode","qweqwqwewasdasd");
                $.ajax({
                    url:"/file/upload",
                    type:'POST',
                    data: formData,
                    processData: false,   // jQuery不要去处理发送的数据
                    contentType: false,   // jQuery不要去设置Content-Type请求头
                    success:function(data){
                        alertUtil.success(data.msg);
                    },
                    error: function(data){
                        alertUtil.error(data.msg)
                    }
                });

                ajaxUtil.myAjax(null,"/medicalService/chineseMedicine/add",hospEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info("新增名老中医成功");
                        var url = "/medicalService/chineseMedicine";
                        orange.loadPage({url: url, target: 'main_body', selector: '#fir_body', success: function(data){
                                if(data == null||data == ""){
                                    return alertUtil.error( url+'加载失败');
                                }
                                $("#main_body").html(data);
                            }})
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });


            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.expertType);
            $("#chineseMedicineType").selectUtil(pl);
            var hosps = {}
            (function init() {
                ajaxUtil.myAjax(null,"/medicalService/hosp/selectAll",null,function (data) {
                    if(ajaxUtil.success(data)){
                        hosps = data.data
                        var html = "";
                        $.each(hosps,function (i,it) {
                            html = html + '<option value="'+it.itemcode+'">'+it.hospitalName+'</option>';
                        });
                        $("#hospitalName").html("");
                        $("#hospitalName").append(html);
                    }
                },false,true,"get");
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#chineseMedicineName").val(tempdata.chineseMedicineName);
                    $("#chineseMedicineTitle").val(tempdata.chineseMedicineTitle);
                    $("#chineseMedicineType").val(tempdata.chineseMedicineType);
                    $("#hospitalName").val(tempdata.hospitalName);
                    $("#specialtyName").val(tempdata.specialtyName);
                    $("#visitTime").val(tempdata.visitTime);
                    $("#phone").val(tempdata.phone);
                    $("#mainVisit").val(tempdata.mainVisit);
                    $(".w-e-text").html(tempdata.expertIntroduce);
                    $(".w-e-text").html(tempdata.medicineRecords);
                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        });
})();