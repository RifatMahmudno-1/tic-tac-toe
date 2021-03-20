function Mode() {
    if (mode === 'AI') {
        evL()
    } else {
        evL()
    }
}
let btns = document.querySelectorAll('.btn-container .btn')
let mode;
var player;
var player1 = [];
var player2 = [];
let ani = 'animate__animated';
let empty = [];
empSpots();
//event listeners add
function evL() {
    btns.forEach(function (el) {
        el.addEventListener('click', function () {
            if (el.childNodes[0].classList.length == 0) {
                player = !player;
                if (player) {
                    el.childNodes[0].classList.add('sp1', ani, randsty())
                    empSpots()
                    player1.push(parseInt(el.classList[1].slice(-1)))
                    finact(player1, '.p1')
                    if (mode === 'AI') nxt(player1, player2)
                } else {
                    el.childNodes[0].classList.add('sp2', ani, randsty())
                    empSpots()
                    player2.push(parseInt(el.classList[1].slice(-1)))
                    finact(player2, '.p2')
                }
            }
        })
    })
}
//empty spots
function empSpots() {
    empty = [];
    for (var i = 0; i <= 8; i++) {
        if (btns[i].childNodes[0].classList[0] !== 'sp1' && btns[i].childNodes[0].classList[0] !== 'sp2') {
            empty.push(parseInt(btns[i].classList[1].slice(-1)))
        }
    }
}
//next
function nxt(a1, a2) {
    if (winrule(a1) == false && winrule(a2) == false) {
        let p2 = [];
        let bbb;
        let p1 = [];
        let aaa;

        function beW() {
            for (var i = 0; i < a2.length; i++) {
                p2.push(a2[i])
            }
            for (var i = 0; i < empty.length; i++) {
                p2.push(empty[i])
                bbb = winrule(p2)
                if (bbb) {
                    btns[empty[i]].click();
                    break
                } else {
                    p2.pop()
                }
            }
            if (!bbb) beS()
        }

        beW()

        function beS() {
            for (var i = 0; i < a1.length; i++) {
                p1.push(a1[i])
            }
            for (var i = 0; i < empty.length; i++) {
                p1.push(empty[i])
                aaa = winrule(p1)
                if (aaa) {
                    btns[empty[i]].click();
                    break
                } else {
                    p1.pop()
                }
            }
            if (a2.length === 0) {
                if (empty.includes(4)) {
                    btns[4].click();
                } else if (empty.includes(0)) {
                    btns[0].click();
                }
            } else if (aaa == false && empty !== undefined) {
                btns[empty[Math.floor(Math.random() * empty.length)]].click();
            }
        }
    }
}
//final action
function finact(a, b) {
    if (winrule(a)) {
        winact(b)
    } else if (player1.length + player2.length == 9) {
        drawact()
    }
}
//animation and visibility
function aniVis() {
    //add a buch of animation
    document.querySelector('.win').classList.add(ani, "animate__backInUp");
    document.querySelector('.btn-container').classList.add(ani, 'animate__tada')
    document.querySelector('.res').classList.add(ani, "animate__bounceInLeft")
    //visible
    document.querySelector('.win').style = 'visibility: visible'
    document.querySelector('.res').style.display = 'grid'
}
//random style
function randsty() {
    var cla = ["animate__flip", "animate__flipInX", "animate__flipInY"]
    var rand = Math.floor(Math.random() * cla.length)
    return cla[rand]
}
//action on win
function winact(b) {
    document.querySelector(`${b} span`).textContent = parseInt(document.querySelector(`${b} span`).textContent) + 1
    if (mode !== 'AI') {
        player = !player
    } else {
        player = undefined
    }
    //end text
    if (b === '.p1') {
        document.querySelector('.win p').textContent = `Player1 wins`
        document.querySelector('.win .sty').classList.add('sp1')
    } else {
        document.querySelector('.win p').textContent = `Player2 wins`
        document.querySelector('.win .sty').classList.add('sp2')
    }
    aniVis()
}
//action on draw
function drawact() {
    document.querySelector('.win p').textContent = `Draw`
    if (mode !== 'AI') {
        player = player
    } else {
        player = undefined
    }
    gtc = 0;
    BtnCon();
    aniVis()
}
//has any player won??
function winrule(a) {
    if (a.includes(0) && a.includes(1) && a.includes(2) ||
        a.includes(3) && a.includes(4) && a.includes(5) ||
        a.includes(6) && a.includes(7) && a.includes(8) ||
        a.includes(0) && a.includes(4) && a.includes(8) ||
        a.includes(6) && a.includes(4) && a.includes(2) ||
        a.includes(0) && a.includes(3) && a.includes(6) ||
        a.includes(1) && a.includes(4) && a.includes(7) ||
        a.includes(2) && a.includes(5) && a.includes(8)) {
        return true;
    } else {
        return false
    }
}
//restart
function TryAgain() {
    document.querySelector('.res .btn1').addEventListener('click', function (e) {
        btns.forEach(function (el) {
            if (el.childNodes[0].classList[0] === 'sp1' || el.childNodes[0].classList[0] === 'sp2') {
                el.childNodes[0].removeAttribute('class')
            }
        })
        document.querySelector('.win').style = 'visibility: hidden'
        document.querySelector('.win .sty').classList[1] === 'sp1' ? document.querySelector('.win .sty').classList.remove('sp1') : document.querySelector('.win .sty').classList[1] === 'sp2' ? document.querySelector('.win .sty').classList.remove('sp2') : stop
        document.querySelector('.res').style.display = 'none'
        //remove animations
        document.querySelector('.win').classList.remove(ani, "animate__backInUp");
        document.querySelector('.btn-container').classList.remove(ani, 'animate__tada')
        document.querySelector('.res').classList.remove(ani, "animate__bounceInLeft")
        player1 = []
        player2 = []
        gtc = gtcb
        BtnCon();
    })
}

function btnEV() {
    TryAgain();
    document.querySelector('.res .btn2').addEventListener('click', function () {
        window.location.reload();
    })
    document.querySelector('.twoP').addEventListener('click', function () {
        document.querySelector('.mode').style.display = 'none';
        mode = 'two'
        Mode()
    })
    document.querySelector('.AI').addEventListener('click', function () {
        document.querySelector('.mode').style.display = 'none';
        mode = 'AI'
        Mode()
    })
}
btnEV()