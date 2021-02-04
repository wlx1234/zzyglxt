(function () {
    require(['jquery', 'ajaxUtil', 'bootstrapTableUtil', 'objectUtil', 'alertUtil', 'modalUtil', 'selectUtil', 'stringUtil', 'dictUtil','datetimepicker'],
        function (jquery, ajaxUtil, bootstrapTableUtil, objectUtil, alertUtil, modalUtil, selectUtil, stringUtil, dictUtil,datetimepicker) {


            var getUrl = "/industrialdevelop";

            var opUrl = "/industrialdevelop/Off";

            var pathUrl = "/industrialdevelop/timerecord";

            var addUrl = pathUrl + "_add";

            var aParam = {};

            $("#search").unbind().on("click", function () {
                var param = {};
                $('#table').bootstrapTable("destroy");
                bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            });

            $("#btn_addTask").unbind().on('click', function () {

                var myViewTimeModalData ={
                    modalBodyID : "myTimeModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                    modalTitle : "设置填报时间",
                    modalClass : "modal-lg",
                    confirmButtonClass : "btn-danger",
                    modalConfirmFun:function () {
                        //var year=new Date();
                        var isSuccess = false;
                        var year = new Date();
                        var startTime = $("#startTime").val();
                        var endTime = $("#endTime").val();


                        var submitStatus = {
                            "year": year.getFullYear(),
                            "startTime": startTime,
                            "endTime": endTime,
                        };

                        var isSuccess = false;
                        ajaxUtil.myAjax(null,opUrl,submitStatus,function (data) {
                            if(startTime!=""&&endTime!=""){
                                var start=new Date(startTime.replace("-","/").replace("-","/"));
                                var end=new Date(endTime.replace("-","/").replace("-","/"));
                                if(end>start){
                                    if(ajaxUtil.success(data)) {
                                    alertUtil.info("设置时间成功");
                                    isSuccess = true;
                                    refreshTable();
                                }
                            }else {
                                    alertUtil.info("结束时间不能小于开始时间");
                                }
                            }else{
                                alertUtil.info("时间栏不能为空");
                            }
                        },false,true,"POST");
                        return isSuccess;
                   }
                }
                var myTravelModal = modalUtil.init(myViewTimeModalData);
                myTravelModal.show();


                var date= new Date();
                $("#startTime").datetimepicker({
                    format: 'yyyy-mm-dd hh:00:00',//显示格式
                    startDate: date ,
                    startView:2,
                    minView:1,
                    maxView :3,
                    language: 'cn',
                    autoclose: 1,//选择后自动关闭
                    clearBtn:true,//清除按钮
                    showMeridian:true,
                });
                $("#endTime").datetimepicker({
                    format: 'yyyy-mm-dd hh:00:00',//显示格式
                    startDate: date ,
                    startView:2,
                    minView:1,
                    maxView :3,
                    language: 'cn',
                    autoclose: 1,//选择后自动关闭
                    clearBtn:true,//清除按钮
                    showMeridian:true,
                }).on('changeDate',function(ev){
                    var starttime=$("#startTime").val();
                    var endtime=$("#endTime").val();
                    if(starttime!=""&&endtime!=""){
                        if (starttime==endtime){
                            $("#endTime").val('');
                            alert("开始时间大于结束时间！");

                            return;
                        }
                    }

                    $("#startTime").datetimepicker('setEndDate',endtime);
                    $("#endTime").datetimepicker('hide');
                });
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);

            var p3 = dictUtil.getDictByCode(dictUtil.DICT_LIST.timeStatus);
            $("#chargePersonSearch").selectUtil(p3);

            var pl2 = [];
            for(var i = -1 ; i <= 1; i++){
                pl2.push({id:generateSearchYear(i),text:generateSearchYear(i)})
            }
            pl2.push({id:"00",text:"全部年份"})
            $("#taskNameSearch1").selectUtil(pl2);

            var aCol = [
                {field: 'year', title: '年份',width:'200px'},
                {field: 'startTime', title: '开启时间'},
                {field: 'endTime', title: '结束时间'},
                {field: 'isimp', title: '状态',formatter:function (row) {
                        return p3[row].text;
                    }},
                {field: 'creater', title: '操作人'},
                {field: 'itemcreateat', title: '操作时间'}
            ];


            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, aParam, aCol);


            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            }

            function generateSearchYear(num){
                return new Date().getFullYear()+num;
            }

                $("#btnSearch").unbind().on('click',function() {
                var newArry = [];
                var searchIsImpl=document.getElementById("taskNameSearch2").value;
                var searchYear = document.getElementById("taskNameSearch1").value;
                var allTableData = JSON.parse(localStorage.getItem("2"));
                for (var i in allTableData) {
                    var textYear = allTableData[i]["year"];
                    var textIsimpl= allTableData[i]["isimp"] ;
                    var isStatusSlot=false;           // 默认状态为true
                    var isYearSlot=false;           // 默认状态为true
                    if(searchIsImpl==textIsimpl||searchIsImpl=='99'){
                        isStatusSlot=true;
                    }
                    if(searchYear == textYear||searchYear=='00'){
                        isYearSlot=true;
                    }
                    if(isYearSlot &&isStatusSlot){
                        newArry.push(allTableData[i]);
                    }
                }
                var newArr=new Set(newArry)
                newArry=Array.from(newArr)
                $("#table").bootstrapTable("load", newArry);
            })

            $("#startTime").bind("input propertychange",function(event){
                var data = $("#startTime").val();
                data=data.substring(0,4);
                $("#year").val(data);
            });

        })
})();
