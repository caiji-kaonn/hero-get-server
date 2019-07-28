// 自己封装一个form表单收集数据的函数
function serialize(formSelector) {
    let arr = [];
    let form = document.querySelector(formSelector)
    let eles = form.querySelector('[name]');
    eles.forEach(e => {
        if (e.type === 'radio' && e.checked) {
            let key = e.name;
            let value = e.value;
            arr.push(key + '=' + value)
        }
        if (e.type !== 'radio') {
            let key = e.name;
            let value = e.value;
            arr.push(key + '=' + value);
        }
    });
    return arr.join('&');
}

// 点击新增的时候把数据收集；
let btn = document.querySelector('#sub');
btn.onclick = function () {
    let data = serialize('#form');
    let xhr = new XMLHttpRequest();
    xhr.open('get', '');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res = JSON.parse(xhr.responseText);
            if (res.code === 200) {
                alert(res.msg);
            }
        }
    }
}