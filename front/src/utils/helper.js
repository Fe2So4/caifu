export default function obj2Params (obj) {
    let arr = [];
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            let value = encodeURIComponent(obj[i])
            if (value == null || value == 'null') {

            } else {
                if (encodeURIComponent(i) == 'currentPage') {
                    value=1;
                }
                arr.push(encodeURIComponent(i) + "=" + value);
            }
        }
    }
    return arr.join("&");
}