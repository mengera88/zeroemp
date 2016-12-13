export function getScrollTop() {
    let de = document.documentElement,
        body = document.body;
    let st = 0;
    if (window.pageYOffset) {
        st = window.pageYOffset;
    } else if (de && de.scrollTop) {
        st = de.scrollTop;
    } else if (body.scrollTop) {
        st = body.scrollTop;
    }
    return st;
}