//(function () {
var wndw
var gtc = document.querySelector('.win').offsetHeight
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
    } else {
        document.querySelector('.btn-container').style = `width: ${wndw.w*0.7}px; height: ${wndw.w*0.7}px`
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
//-----------------------------------------------------------------
let color = ['chartreuse', 'aqua']
let btns = document.querySelectorAll('.btn-container .btn span')
var player;
var player1 = [];
var player2 = [];
var all = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var st1 = `clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); background: ${color[0]};`;
var st2 = `clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%); background: ${color[1]};`;

function main() {
    btns.forEach(function (el) {
        var runned = false;
        el.addEventListener('click', function () {
            if (runned == false) {
                player = !player;
                if (player) {
                    el.style = st1;
                    player1.push(parseInt(el.classList.value))
                    winner(player1, 'Player1', st1, '.p1')
                    el.classList.add('animate__animated', randsty())
                } else if (!player) {
                    el.style = st2
                    player2.push(parseInt(el.classList.value))
                    winner(player2, 'Player2', st2, '.p2')
                    el.classList.add('animate__animated', randsty())
                }
            }
            runned = true;
        })
    })
}
main();

function winner(a, b, c, d) {
    if (a.includes(0) && a.includes(1) && a.includes(2) ||
        a.includes(3) && a.includes(4) && a.includes(5) ||
        a.includes(6) && a.includes(7) && a.includes(8) ||
        a.includes(0) && a.includes(4) && a.includes(8) ||
        a.includes(6) && a.includes(4) && a.includes(2) ||
        a.includes(0) && a.includes(3) && a.includes(6) ||
        a.includes(1) && a.includes(4) && a.includes(7) ||
        a.includes(2) && a.includes(5) && a.includes(8)) {
        var aa = parseInt(document.querySelector(`.point ${d} span`).textContent)
        document.querySelector(`.point ${d} span`).textContent = `${aa+1}`
        document.querySelector('.res').style.display = 'grid'
        document.querySelector('.res').classList.add('animate__animated', "animate__bounceInLeft")
        document.querySelector('.win').style = 'visibility: visible'
        document.querySelector('.win p').textContent = `${b} wins`
        document.querySelector('.win .sty').style = c;
        document.querySelector('.win').classList.add('animate__animated', "animate__backInUp");
        document.querySelector('.btn-container').classList.add('animate__animated', 'animate__tada')
    } else if (player1.length + player2.length == 9) {
        gtc = '0'
        BtnCon();
        document.querySelector('.res').style.display = 'grid'
        document.querySelector('.res').classList.add('animate__animated', "animate__bounceInLeft")
        document.querySelector('.win').style = 'visibility: visible'
        document.querySelector('.win p').textContent = `Draw`
        document.querySelector('.win').classList.add('animate__animated', "animate__backInUp");
        document.querySelector('.btn-container').classList.add('animate__animated', 'animate__tada')
    }
}

function randsty() {
    var cla = ["animate__flip", "animate__flipInX", "animate__flipInY"]
    var rand = Math.floor(Math.random() * cla.length)
    return cla[rand]
}
document.querySelector('.res button').addEventListener('click', function () {
    document.querySelector('.res').style.display = 'none'
    document.querySelector('.win').style = 'visibility: hidden'
    player1 = [];
    player2 = [];
    main();
    BtnCon();
    document.querySelector('.res').classList.remove('animate__animated', "animate__bounceInLeft")
    document.querySelector('.win').classList.remove('animate__animated', "animate__backInUp");
    document.querySelector('.btn-container').classList.remove('animate__animated', 'animate__tada')
    for (var i = 0; i < btns.length; i++) {
        btns[i].removeAttribute('style')
        btns[i].removeAttribute('class')
        btns[i].setAttribute('class', `${i}`)
    }
})
//})()