(function () {
    //---------------------------------------Skeleton----------------------------------------
    //window size
    function Wndw() {
        return wndw = {
            h: window.innerHeight,
            w: window.innerWidth
        }
    }
    //btn-container resize;
    function BtnCon() {
        if (wndw.w >= wndw.h) {
            document.querySelector('.btn-container').style = `width: ${wndw.h*0.7}px; height: ${wndw.h*0.7}px`
            wndw.w / 40 > 30 ? aa = 30 : aa = wndw.w / 40
            document.querySelector('body').style = `font-size: ${aa}px;`
        } else {
            document.querySelector('.btn-container').style = `width: ${wndw.w*0.7}px; height: ${wndw.w*0.7}px`
            wndw.h / 40 > 30 ? aa = 30 : aa = wndw.h / 40
            document.querySelector('body').style = `font-size: ${aa}px;`
        }
        let aaa = parseInt(document.querySelector('body').style.fontSize.slice(0, 2))
        document.querySelector('.win .main').style = `display: grid; grid-template-columns:${aaa+10}px ${document.querySelector('.win .main p').offsetWidth}px; grid-gap: 5px`
    };
    //call immediately
    var wndw = Wndw();
    BtnCon();
    //call on window resize
    window.addEventListener('resize', function () {
        wndw = Wndw();
        BtnCon();
    })
    //add style immediately
    document.querySelector('.mode').style.display = 'grid';
    //-----------------------------------Brain---------------------------------------------
    let btns = document.querySelectorAll('.btn-container .btn')
    let mode;
    var player;
    var player1 = [];
    var player2 = [];
    let ani = 'animate__animated';
    let empty = [];
    let pl1;
    let pl2;
    let audio = document.querySelectorAll('.audio audio')
    //mode
    function Mode() {
        if (mode === 'AI') {
            empSpots();
            pl1 = `You've won`
            pl2 = `AI's won`
            document.querySelector('.p1').innerHTML = `You: <span>0</span>points`
            document.querySelector('.p2').innerHTML = `The AI: <span>0</span>points`
            evL()
        } else {
            pl1 = `Player1 wins`
            pl2 = `Player2 wins`
            document.querySelector('.p1').innerHTML = `Player1: <span>0</span>points`
            document.querySelector('.p2').innerHTML = `Player2: <span>0</span>points`
            evL()
        }
        document.querySelector('.point').style.display = 'block';
    }
    //event listeners add
    function evL() {
        btns.forEach(function (el) {
            el.addEventListener('click', function () {
                if (el.childNodes[0].classList.length == 0) {
                    audio[2].play()
                    player = !player;
                    if (player) {
                        el.childNodes[0].classList.add('sp1', ani, randsty())
                        if (mode === 'AI') empSpots()
                        player1.push(parseInt(el.classList[1].slice(-1)))
                        finact(player1, '.p1')
                        if (mode === 'AI') nxt(player1, player2)
                    } else {
                        el.childNodes[0].classList.add('sp2', ani, randsty())
                        if (mode === 'AI') empSpots()
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

            function PP(a, b) {
                for (var i = 0; i < a.length; i++) {
                    b.push(a[i])
                }
            }
            //be winner
            function beW() {
                PP(a2, p2)
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
            //prevent from winning
            function beS() {
                PP(a1, p1)
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
                } else if (a2.length === 1) {
                    if (a1.includes(0) && a1.includes(8) || a1.includes(0) && a1.includes(7) || a1.includes(1) && a1.includes(6)) {
                        btns[3].click();
                    } else if (a1.includes(2) && a1.includes(6) || a1.includes(1) && a1.includes(8) || a1.includes(2) && a1.includes(7)) {
                        btns[5].click();
                    } else if (a1.includes(0) && a1.includes(5) || a1.includes(3) && a1.includes(2)) {
                        btns[1].click();
                    } else if (a1.includes(3) && a1.includes(8) || a1.includes(5) && a1.includes(6)) {
                        btns[7].click();
                    } else if (!empty.includes(0) || a1.includes(1) || a1.includes(3) || a1.includes(5) || a1.includes(7)) {
                        btns[2].click();
                    } else {
                        btns[empty[Math.floor(Math.random() * empty.length)]].click();
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
        player = !player
        audio[3].play()
        //end text
        if (b === '.p1') {
            document.querySelector('.win p').textContent = pl1
            document.querySelector('.win .sty').classList.add('sp1')
        } else {
            document.querySelector('.win p').textContent = pl2
            document.querySelector('.win .sty').classList.add('sp2')
        }
        aniVis()
    }
    //action on draw
    function drawact() {
        document.querySelector('.win p').textContent = `Draw`
        document.querySelector('.win .sty').classList.add('sp3')
        audio[1].play()
        player = player
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
    //restart and try-again commn
    function ResTry() {
        btns.forEach(function (el) {
            if (el.childNodes[0].classList[0] === 'sp1' || el.childNodes[0].classList[0] === 'sp2') {
                el.childNodes[0].removeAttribute('class')
            }
        })
        document.querySelector('.win').style = 'visibility: hidden'
        document.querySelector('.win .sty').classList[1] === 'sp1' ? document.querySelector('.win .sty').classList.remove('sp1') : document.querySelector('.win .sty').classList[1] === 'sp2' ? document.querySelector('.win .sty').classList.remove('sp2') : document.querySelector('.win .sty').classList[1] === 'sp3' ? document.querySelector('.win .sty').classList.remove('sp3') : stop
        document.querySelector('.res').style.display = 'none'
        document.querySelector('.win').classList.remove(ani, "animate__backInUp");
        document.querySelector('.btn-container').classList.remove(ani, 'animate__tada')
        document.querySelector('.res').classList.remove(ani, "animate__bounceInLeft")
        player1 = []
        player2 = []
    }
    //button event listeners
    function btnEV() {
        //try again
        document.querySelector('.res .btn1').addEventListener('click', function () {
            audio[0].play()
            ResTry()
            if (player == true && mode === 'AI') {
                empSpots();
                nxt(player1, player2)
            }
        })
        //restart
        document.querySelector('.res .btn2').addEventListener('click', function () {
            audio[0].play()
            ResTry()
            document.querySelector('.mode').style.display = 'grid';
            document.querySelector('.point').style.display = 'none';
            mode = undefined;
            player = undefined;
            empty = [];
            pl1 = undefined;
            pl2 = undefined;
        })
        document.querySelector('.twoP').addEventListener('click', function () {
            document.querySelector('.mode').style.display = 'none';
            mode = 'two'
            audio[0].play()
            Mode()
        })
        document.querySelector('.AI').addEventListener('click', function () {
            document.querySelector('.mode').style.display = 'none';
            mode = 'AI'
            audio[0].play()
            Mode()
        })
    }
    //call immediately
    btnEV()
})()
/*function possM() {
    for (var i = 0; i < empty.length; i++) {
        for (var j = 0; j < empty.length; j++) {
            for (var k = 0; k < empty.length; k++) {
                if (winrule([empty[i], empty[j], empty[k]])) {
                    let possMoves = [empty[i], empty[j], empty[k]]
                    console.log(possMoves)
                }
            }
        }
    }
}
possM()*/