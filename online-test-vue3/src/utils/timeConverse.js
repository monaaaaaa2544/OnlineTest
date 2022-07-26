class TimeConverse {
    constructor() {}

    // 时间戳转换为日期格式
    static timestampToDate(timestamp) {
        if(timestamp!==0){
            let date = new Date(timestamp);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + ' ';
            let h = (date.getHours()<10? '0'+(date.getHours()):date.getHours()) + ':';
            let m = (date.getMinutes()<10? '0'+(date.getMinutes()):date.getMinutes()) + ':';
            let s = (date.getSeconds()<10? '0'+(date.getSeconds()):date.getSeconds());
            return Y+M+D+h+m+s;
        }else{
            return null
        }
    }

    //2016-08-15T16:00:00.000Z格式转换为 hh:mm:ss
    static utcToLocal(time) {
        time=new Date(time).getTime()
        time=TimeConverse.timestampToDate(time)
        return time;
    }
}

module.exports = TimeConverse;
