/**
 * Created by feng on 2017/7/28.
 */
$(function() {
    var init = new Init();

    //页面端DOM初始化
    init.Dom.department("cj_department"); //部门信息
    init.Dom.table(); //初始化表格
    init.loadwnd = $('body').gmLoading({});
    init.Dom.time();
    $('#timeStart').val(new Date().Format("yyyy-MM-dd"));
    $('#timeEnd').val(new Date().Format("yyyy-MM-dd"));
    $("#table").bootstrapTable('hideColumn', "userName");

    //页面端事件初始化
    $('#selectSJFW').change(function() {
        if($(this).val() == "3") {
            $('.time-area').removeClass('hidden');
            init.Dom.time();
        } else {
            $('.time-area').addClass('hidden');
        }
    }); //统计时间选择
    $('#pagePrev').on('click', init.Tools.pagePrev);
    $('#pageNext').on('click', init.Tools.pageNext);
    $("#btnSearch").on('click',function(){//查询按钮
        init.onSearch();
    });
});
function Init() {
    var that = this;

    //初始化查询参数
    that.params = {};
    that.infoArray = [];
    that.page = 0;
    that.pageCount = -1;
    that.pageSize = 20;
    that.total = null;

    that.$table = $('.table');
    that.loadwnd = null;
};
Init.prototype = {
    constructor: init,
    Dom: {
        time: function () {

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
        },
        table: function (data) {

            //先销毁表格
            $('#table').bootstrapTable('destroy');
            $('#table').bootstrapTable({
                data: data,
                pageSize: 999,
                pagination: false,
                height: '600px'
            });
        },
        department: function (department) {

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
    },
    getForms: function (ele, name) {
        this[name] = $(ele).val();
        return this[name];
    },
    timeDealer: function (time) {
        var now = new Date();
        var end = null;
        var timeS;
        var timeE;
        this.beginTime = '';
        this.endTime = '';
        switch (time) {
            case '1' :
                end = new Date(now.getTime()- 6 * 24 * 3600 * 1000);
                    break;

                case '2' :
                    end = new Date();
                    end.setMonth(now.getMonth() - 1);
                    end.setDate(now.getDate() + 1);
                    break;

                case '3' :
                    timeS = $('#timeStart').val() + ' 00:00:00';
                    timeE = $('#timeEnd').val() + ' 23:59:59';
                    break;
            };

            if (typeof timeS !== 'undefined' && typeof timeE !== 'undefined') {
                this.beginTime = getTimeByDateStr(timeS);
                this.endTime = getTimeByDateStr(timeE);
            } else {
                now.setHours('23');
                now.setMinutes('59');
                now.setSeconds('59');
                now.setMilliseconds('0');
                end.setHours('0');
                end.setMinutes('0');
                end.setSeconds('0');
                end.setMilliseconds('0');
                this.beginTime = Math.floor(end.getTime());
                this.endTime = Math.floor(now.getTime());
            };
        },
        tableSwitch: function() {
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
        },
        pagePrev: function () {

            if(this.page == 0) {
                return;
            }

            if(this.page == 1) {
                $('#pagePrev').attr('disabled', true);
            }
            this.page -= 1;
            $("#page").text(parseInt(this.page + 1));
            this.Dom.Table(this.infoArray[this.page]);
            this.Tools.tableSwitch();
            $('#pageNext').attr('disabled', false);
            $("#btnModify").attr('disabled', true);
            return;
        },
        pageNext: function () {
            // 达到最大页数
            if(this.pageCount != -1 && this.page >= this.pageCount) {
                $('#pageNext').attr('disabled', true);
                return;
            }

            // 如果当前页未满条数，不处理
            if(this.infoArray[this.page].length < this.pageSize) {
                $('#pageNext').attr('disabled', true);
                return;
            }
            this.page++;
            $("#page").text(parseInt(this.page + 1));
            $("#btnModify").attr('disabled', true);

            // 如果当前页满数据条数，并且下一页未加载过数据，则请求下一页数据
            if(!this.infoArray[this.page]) {
                this.params.page = this.page;

                this.search();

                $('#pagePrev').attr('disabled', false);
                return;
            }

            // 如果下一页加载过数据
            if(this.infoArray[this.page]) {
                this.Dom.Table(this.infoArray[this.page]);
                this.tableSwitch();
                $('#pagePrev').attr('disabled', false);

                if(this.pageCount != -1 && this.page >= this.pageCount) {
                    $('#pageNext').attr('disabled', true);
                }
                return;
            }
        },
    pagination: function (total) {

        if(total == 0) {
            $("#prevPagination").text(0);
            $("#afterPagination").html('<span id="page"></span>');
        }

        if(total) {
            var p = (Math.floor(total / 20) + ((total % 20) ? 1 : 0));
            $("#prevPagination").text(total);
            $("#afterPagination").html('<span id="page">' + parseInt(this.page + 1) + '</span>/' + p);
        }
    },
    onSearch: function () {

        //自带参数
        this.infoArray = [];
        this.page = 0;
        this.pageCount = -1;
        this.orgId = $("#cj_department").data('selOrg').id; //部门
        this.timeDealer(this.getForms('#selectSJFW', 'time'));
        this.params = {
            "orgId": this.orgId,
            'type': parseInt(this.getForms('#selectTJLB','tjlb')),
            "beginTime": this.beginTime,
            "endTime": this.endTime,
            "page": this.page,
            "pageSize": this.pageSize
        };
        $('#pagePrev').attr('disabled', true);
        $('#pageNext').attr('disabled', true);
        search();
    },
    search: function () {
        that.loadwnd.show();
        Gm.Ajax.post('/gmvcsomm/resource/mgr/statisticsMange/onlinelist.action', that.params, success, fail, complete)
    }
};

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

function success(ret) {
    if(ret.headers.ret != 0) {
        alert("查询失败");
        return;
    }
    if(ret.headers.ret == 0) {
        var body = ret.body;
        if(!body) {
            that.initTable([]);
        }
        if(body) {
            that.infoArray.push(body.person);
            var person = body.person;
            that.total = body.total;
            //var  onlineD = "在线天数";
            that.Dom.table(person);
            that.tableSwitch();
            that.Dom.pagination(that.total);

            //超过最大页数，展示下一页按钮
            if(person.length>= that.pageSize) {
                var p = (Math.floor(that.total / 20) + ((that.total % 20) ? 1 : 0));
                if(that.page + 1 < p) {
                    $('#pageNext').attr('disabled', false);
                }else{
                    $('#pageNext').attr('disabled', true);
                }
            } else { //没有超过的或者刚好等于的都禁用按钮
                that.pageCount = that.params.page;
                $('#pageNext').attr('disabled', true);

            }
        }
    }
};
function fail(evt) {
    if (evt.status === 200 || evt.statusText === 'OK') {
        alert('登陆超时, 请重新登陆');
        window.top.document.location.reload();
        return;
    } else {
        alert("查询信息失败");
        window.top.document.location.reload();
        return;
    };
};
function complete() {
    that.loadwnd.hide();
};
