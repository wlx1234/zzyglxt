(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            //后台请求地址
            var url = "/industrialdevelop/talrec";
            
            var getUrl = url + "/" + sessionStorage.getItem("orgCode");
            //页面请求地址
            var pathUrl = "/industrialdevelop/recruit";
            //新增页面地址
            var addUrl = pathUrl+"_add";
            var aParam = {

            };

            //操作
            function operation(value, row, index){
                if (dictUtil.getCode(dictUtil.DICT_LIST.showStatus,row.status) === '1'){
                    return [
                        '<a class="unshelve" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >下架</a>'
                    ].join('')
                } else {
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >编辑</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }
            }

            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect(addUrl);
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteRecruit",
                        modalTitle : "删除招聘信息",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var projectEntity = {
                                itemid: row.itemid,
                                itemcode: row.itemcode
                            };
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,url,projectEntity,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("删除项目成功");
                                    isSuccess = true;
                                    refreshTable();
                                }
                            },false,"123","delete");
                            return isSuccess;
                        }

                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                },
                'click .unshelve' : function(e, value, row, index) {
                    var param = {
                        itemid: row.itemid,
                        itemcode: row.itemcode,
                        status: '2'
                    }
                    ajaxUtil.myAjax(null, url, param,function (data) {
                        if (ajaxUtil.success(data)){
                            refreshTable();
                        }
                    },true,true,"put")
                },
            };


            $("#search").unbind().on("click",function () {
                var param = {

                };
                $('#table').bootstrapTable("destroy");
                bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            });
            


            $("#btn_addTask").unbind().on('click',function () {
                localStorage.removeItem("rowData");
                orange.redirect(addUrl);
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);

            function statusFormatter(value,row,index){
                return dictUtil.getName(dictUtil.DICT_LIST.showStatus,value)
            }


            var aCol = [
                {field: 'recruitmentTitle', title: '招聘标题'},
                {field: 'recruitmentPosition', title: '招聘职位'},
                {field: 'recruitmentCount', title: '招聘数量'},
                {field: 'status', title: '信息状态',formatter:statusFormatter},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table",getUrl,aParam, aCol, "status");

        })
})();
