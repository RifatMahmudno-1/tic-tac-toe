var wndw
var gtc = document.querySelector('.win').offsetHeight
var gtcb = document.querySelector('.win').offsetHeight //backup of gtc
//window size
function Wndw() {
    wndw = {
        h: window.innerHeight,
        w: window.innerWidth
    }
    return wndw
}
//btn-container resize;
function BtnCon() {
    if (wndw.w >= wndw.h) {
        document.querySelector('.btn-container').style = `width: ${wndw.h*0.7}px; height: ${wndw.h*0.7}px`
        wndw.w / 40 > 3 ? aa = 30 : aa = wndw.w / 40
        document.querySelector('body').style = `font-size: ${aa}px;`
    } else {
        document.querySelector('.btn-container').style = `width: ${wndw.w*0.7}px; height: ${wndw.w*0.7}px`
        wndw.h / 40 > 3 ? aa = 30 : aa = wndw.h / 40
        document.querySelector('body').style = `font-size: ${aa}px;`
    }
    document.querySelector('.win .main').style = `display: grid; grid-template-columns:${gtc}px ${document.querySelector('.win .main p').offsetWidth}px; grid-gap: 5px`
};

//call immediately
Wndw();
BtnCon();
//call on window resize
window.addEventListener('resize', function () {
    Wndw();
    BtnCon();
})
document.querySelector('.mode').style.display = 'grid'