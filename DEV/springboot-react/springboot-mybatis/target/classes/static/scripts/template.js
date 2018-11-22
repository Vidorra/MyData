$(function () {
    var myGrid;
    var myLayout = new dhtmlXLayoutObject({
        parent: document.body,
        pattern: "2E",
        offsets: {          // optional, offsets for fullscreen init
            top: 2,     // you can specify all four sides
            right: 2,     // or only the side where you want to have an offset
            bottom: 2,
            left: 2
        },
        cells: [
            {
                id: "a",        // id of the cell you want to configure
                header: false,      // hide header on init
                height: 50,        // cell init height
                fix_size: [null, true] // fix cell's size, [width,height]
            },
            {
                id: "b",        // id of the cell you want to configure
                header: false     // hide header on init
            }
        ]
    });
    myLayout.cells("a").setHeight(50);
    myLayout.cells("a").attachObject("headForm");

    myLayout.setSeparatorSize(0, 0);


    // 初始化GRID
    myGrid = myLayout.cells("b").attachGrid();
    myGrid.setImagePath("../../controls/dhtmlx-5.0/skins/web/imgs/dhxgrid_web/");
    myGrid.setStyle("text-align:center;background-color:#f4f4f4;color:#000;font-weight:bold;border-bottom:4px solid #1E90FF;", "height:40px;");
    myGrid.setHeader("序号,房间号,入住时间,退房时间,平台名称,金额,税费,交易方式,备注");
    myGrid.setInitWidthsP("4,7,12,12,10,12,12,12,*");//设置列宽（按百分比）
    myGrid.setColAlign("center,center,center,center,center,center,center,center,center");//设置各列的对齐方式
    myGrid.setColTypes("ro,ro,ro,ro,ro,ro,ro,ro,ro");//设置各列的数据类型
    myGrid.enableResizing("false,true,true,true,true,false,false,false,false");
    myGrid.enableAlterCss("GridRowColorEven", "GridRowColorUnEven");//设置行的交替样式
    myGrid.setColumnIds("'',c_rid,d_checkdin,d_checkout,platename,n_total,D_SYYWCBJSJ,platename,comments");
    myGrid.init();

    myGrid.setAwaitedRowHeight(40);

    myGrid.enableSmartRendering(true, 20);

    myGrid.attachEvent("onXLS", function () {
        myLayout.progressOn();
    });
    myGrid.attachEvent("onXLE", function () {
        myLayout.progressOff();
    });

    myGrid.attachFooter(
        ["<div><span>往下滚动自动加载，总共<span id='foot_zbs'>0</span>笔。</span></div>", "#cspan", "#cspan", "#cspan", "#cspan", "#cspan", "#cspan", "#cspan", "#cspan"],
        ["text-align:left;vertical-align: middle;font-family:consolas;font-style:normal;"]
    );

    // angular
    var app = angular.module("homeApp", []);
    app.controller("homeController", ["$scope", "$timeout", function (scope, timeout) {
        $.post("../query",
            function (data, status) {
                // alert("Data: " + data + "\nStatus: " + status);

                var jsonData = {
                    rows:[
                        // { id:3, data: ["The Rainmaker", "John Grisham", "-200"]}
                    ]
                };

                var keyarr = ("c_rid,d_checkdin,d_checkout,platename,n_total,D_SYYWCBJSJ,platename,comments").split(",");

                for(var i = 0;i<data.length-1;i++){
                    var temp = [];
                    temp[0] = i+1;
                    keyarr.forEach(function (key) {
                        temp.push(data[i][key]);
                    });
                    jsonData.rows.push({id:i+1,data:temp})
                }
                myGrid.parse(jsonData,"json");
            });
    }]);

    //启动angular
    angular.bootstrap(document.body, ["homeApp"]);
});
