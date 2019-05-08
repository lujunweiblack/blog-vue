export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};


export function paramJsonToStr(paramJson) {
    return "?" + Object.keys(paramJson).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(paramJson[key]);
    }).join("&");
};

export function formatterDate(row, column, cellValue) {
    if (!cellValue) {
        return "未上线";
    }
    var date = new Date(cellValue);
    return formatDate(date, "yyyy-MM-dd hh:mm");
}

export function formatterArticleType(row, column, cellValue) {
    if (cellValue == 1) {
        return "技术文章";
    } else if (cellValue == 2) {
        return "生活日常";
    }
}
export function tableRowClassName({ row }) {
    if (row.articleState === 1) {
        return "success-row";
    } else if (row.articleState === 0) {
        //  return "default-row";
    } else if (row.articleState === 2) {
        return "error-row";
    }
    return "";
}