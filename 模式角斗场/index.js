/**
 * Created by feng on 2017/7/28.
 */
var $table = $('.table');
var loadwnd = null;
$(function() {
    getDepartment("cj_department"); //部门信息

    initTable(); //初始化表格
    $("#table").bootstrapTable('hideColumn', "userName");

    loadwnd = $('body').gmLoading({});

    //统计时间选择
    $('#selectSJFW').change(function() {
        if($(this).val() == "3") {
            $('.time-area').removeClass('hidden');
            initTime();
        } else {
            $('.time-area').addClass('hidden');
        }
    });

    $('#timeStart').val(new Date().Format("yyyy-MM-dd"));
    $('#timeEnd').val(new Date().Format("yyyy-MM-dd"));

    initTime();

    $('#pagePrev').on('click', pagePrev);
    $('#pageNext').on('click', pageNext);

    //统计类别选择
    /*$('#selectTJLB').change(function(){
     $(".table-container").addClass("table-hidden");
     $($(".table-container")[$(this).val()]).removeClass("table-hidden");
     });*/

    $("#btnSearch").on('click',function(){//查询按钮
        onSearch();
    })
});

//获取部门信息
function getDepartment(department) {
    //	部门信息 异步加载

    $('#' + department).gmOrgSelector({
        'chkStyle': '',
        'chkboxType': {
            "Y": "ps",
            "N": "ps"
        },
        'children': 'children',
        'showPolice': false,
        'name': 'displayName'
    });
}

function initTime() {
    //时间范围
    $(".form_datetime").datetimepicker({
        format: "yyyy-mm-dd", // hh:ii:ss
        language: "zh-CN",
        autoclose: true,
        todayBtn: 'linked',
        todayHighlight: true,
        pickerPosition: 'bottom-left',
        minView: 'month'
    });
}

//初始化表格
function initTable(data) {
    //先销毁表格
    $('#table').bootstrapTable('destroy');

    $('#table').bootstrapTable({
        data: data,
        pageSize: 999,
        pagination: false,
        height: '600px'
    });
}

/**
 *处理表格排序从1开始
 * */
function runningFormatter(value, row, index) {
    return page * pageSize + index + 1;
}

/**
 *处理表格
 * */
function onlineTimeFormatter(value, row, index) {
    return  forTime(value);
}

function avergeTimeFormatter(value, row, index) {
    return  forTime(value);
}

/**

 *处理秒数 变成时分秒
 * */
function forTime(s){
    var s = parseInt(s);

    var hour = Math.floor(s/3600);//时
    if(hour<10){
        hour = "0"+hour;
    }

    var min = Math.floor(s/60)%60;//分
    if(min<10){
        min = "0"+min;
    }

    var sec = s%60;//秒
    if(sec<10){
        sec = "0"+sec;
    }

    time = hour+":"+min+":"+sec;
    return time;

}

//查询
var params = {};
var infoArray = [];
var page = 0;
var pageCount = -1;
var pageSize = 20;

function onSearch(){
    params = {};
    infoArray = [];
    page = 0;
    pageCount = -1;

    var cj_department = $("#cj_department").data('selOrg'); //部门
    var orgId = cj_department.id;

    if(cj_department == null) {
        alert("请选择部门！");
        return;
    }

    var selectTJLB = $("#selectTJLB").val();

    //统计时间
    var beginTime = null;
    var endTime = null;
    switch($('#selectSJFW').val()) {
        case "1":
            var now = new Date();
            now.setHours('23');
            now.setMinutes('59');
            now.setSeconds('59');
            now.setMilliseconds('0');
            var end = new Date(now.getTime()- 6 * 24 * 3600 * 1000);
            end.setHours('0');
            end.setMinutes('0');
            end.setSeconds('0');
            end.setMilliseconds('0');
            beginTime = Math.floor(end.getTime());
            endTime = Math.floor(now.getTime());
            break;
        case "2":
            var now = new Date();
            now.setHours('23');
            now.setMinutes('59');
            now.setSeconds('59');
            now.setMilliseconds('0');
            var end = new Date();
            end.setMonth(now.getMonth() - 1);
            end.setDate(now.getDate() + 1);
            end.setHours('0');
            end.setMinutes('0');
            end.setSeconds('0');
            end.setMilliseconds('0');
            beginTime = Math.floor(end.getTime());
            endTime = Math.floor(now.getTime());
            break;
        case "3":
            var timeS = $('#timeStart').val() + ' 00:00:00';
            var timeE = $('#timeEnd').val() + ' 23:59:59';
            beginTime = getTimeByDateStr(timeS);
            endTime = getTimeByDateStr(timeE);
            break;
    }

    //判断时间选择次序
    if(beginTime>endTime){
        alert("开始时间不能大于结束时间");
        return;
    }

    params = {
        "orgId": orgId,
        'type': parseInt(selectTJLB),
        "beginTime": beginTime,
        "endTime": endTime,
        "page": page,
        "pageSize": pageSize
    }

    $('#pagePrev').attr('disabled', true);
    $('#pageNext').attr('disabled', true);

    search();
}

var total = null;
function search(){
    loadwnd.show();

    $.ajax({
        url: '/gmvcsomm/resource/mgr/statisticsMange/onlinelist.action',
        type: "post",
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(params),
        cache: false,
        error: function(evt) {
            if (evt.status === 200 || evt.statusText === 'OK') {
                alert('登陆超时, 请重新登陆');
                window.top.document.location.reload();
                return;
            } else {
                alert("查询信息失败");
                window.top.document.location.reload();
                return;
            };
        },

        success: function(ret) {
            if(ret.headers.ret != 0) {
                alert("查询失败");
                return;
            }
            if(ret.headers.ret == 0) {
                var body = ret.body;
                if(!body) {
                    initTable([]);
                }
                if(body) {
                    infoArray.push(body.person);
                    var person = body.person;
                    total = body.total;
                    //var  onlineD = "在线天数";
                    initTable(person);

                    tableSwitch();

                    initpagination(total);

                    //超过最大页数，展示下一页按钮
                    if(person.length>= pageSize) {
                        var p = (Math.floor(total / 20) + ((total % 20) ? 1 : 0));
                        if(page + 1 < p) {
                            $('#pageNext').attr('disabled', false);
                        }else{
                            $('#pageNext').attr('disabled', true);
                        }
                    } else { //没有超过的或者刚好等于的都禁用按钮
                        pageCount = params.page;
                        $('#pageNext').attr('disabled', true);

                    }
                }
            }
        },

        complete: function() {
            loadwnd.hide();
        }
    });
}

//表格切换
function tableSwitch(){
    if($("#selectTJLB").val() ==1){
        $("#table").bootstrapTable('hideColumn', "userName");
        $("#table").bootstrapTable('showColumn', "dsjNum");
        //$($($('.th-inner'))[3]).text("dsldk");

    }else{
        $("#table").bootstrapTable('hideColumn', "dsjNum");
        $("#table").bootstrapTable('showColumn', "userName");
        $('.th-inner').eq(3).text("在线天数（天）");
        $('.th-inner').eq(4).text("在线率（在线天数/查询天数*100%）");
        $('.th-inner').eq(5).text("在线总时长（时:分:秒）");
        $('.th-inner').eq(6).text("平均每天在线时长（在线总时长/在线天数 ）");
    }
}

//初始化分页
function initpagination(total) {
    if(total == 0) {
        $("#prevPagination").text(0);
        $("#afterPagination").html('<span id="page"></span>');
    }
    if(total) {
        var p = (Math.floor(total / 20) + ((total % 20) ? 1 : 0));
        $("#prevPagination").text(total);
        $("#afterPagination").html('<span id="page">' + parseInt(page + 1) + '</span>/' + p);
    }
}

function pagePrev() {
    if(page == 0) {
        return;
    }

    if(page == 1) {
        $('#pagePrev').attr('disabled', true);
    }

    page -= 1;
    $("#page").text(parseInt(page + 1));
    initTable(infoArray[page]);

    tableSwitch();

    $('#pageNext').attr('disabled', false);
    $("#btnModify").attr('disabled', true);
    return;
}

function pageNext() {
    // 达到最大页数
    if(pageCount != -1 && page >= pageCount) {
        $('#pageNext').attr('disabled', true);
        return;
    }

    // 如果当前页未满条数，不处理
    if(infoArray[page].length < pageSize) {
        $('#pageNext').attr('disabled', true);
        return;
    }

    page++;
    $("#page").text(parseInt(page + 1));
    $("#btnModify").attr('disabled', true);

    // 如果当前页满数据条数，并且下一页未加载过数据，则请求下一页数据
    if(!infoArray[page]) {
        params.page = page;

        search();

        $('#pagePrev').attr('disabled', false);
        return;
    }

    // 如果下一页加载过数据
    if(infoArray[page]) {
        initTable(infoArray[page]);

        tableSwitch();

        $('#pagePrev').attr('disabled', false);

        if(pageCount != -1 && page >= pageCount) {
            $('#pageNext').attr('disabled', true);
        }

        return;
    }
}