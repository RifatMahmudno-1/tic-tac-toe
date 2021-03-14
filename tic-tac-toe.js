(function () {
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
    //-----------------------------------------------------------------
    let btns = document.querySelectorAll('.btn-container .btn')
    var player;
    var player1 = [];
    var player2 = [];
    let ani = 'animate__animated'

    btns.forEach(function (el) {
        el.addEventListener('click', function () {
            if (el.childNodes[0].classList.length == 0) {
                player = !player;
                if (player) {
                    el.childNodes[0].classList.add('sp1', ani, randsty())
                    player1.push(parseInt(el.classList[1]))
                    winner(player1, '.p1')
                } else {
                    el.childNodes[0].classList.add('sp2', ani, randsty())
                    player2.push(parseInt(el.classList[1]))
                    winner(player2, '.p2')
                }
            }
        })
    })

    function winner(a, b) {
        if (a.includes(0) && a.includes(1) && a.includes(2) ||
            a.includes(3) && a.includes(4) && a.includes(5) ||
            a.includes(6) && a.includes(7) && a.includes(8) ||
            a.includes(0) && a.includes(4) && a.includes(8) ||
            a.includes(6) && a.includes(4) && a.includes(2) ||
            a.includes(0) && a.includes(3) && a.includes(6) ||
            a.includes(1) && a.includes(4) && a.includes(7) ||
            a.includes(2) && a.includes(5) && a.includes(8)) {
            document.querySelector(`${b} span`).textContent = parseInt(document.querySelector(`${b} span`).textContent) + 1
            player = !player
            //end text
            if (b === '.p1') {
                document.querySelector('.win p').textContent = `Player1 wins`
                document.querySelector('.win .sty').classList.add('sp1')
            } else {
                document.querySelector('.win p').textContent = `Player2 wins`
                document.querySelector('.win .sty').classList.add('sp2')
            }
            aniVis()
        } else if (player1.length + player2.length == 9) {
            //end text
            document.querySelector('.win p').textContent = `Draw`
            player = player
            gtc = 0;
            BtnCon();
            aniVis()
        }
    }

    function aniVis() {
        //add a buch of animation
        document.querySelector('.win').classList.add(ani, "animate__backInUp");
        document.querySelector('.btn-container').classList.add(ani, 'animate__tada')
        document.querySelector('.res').classList.add(ani, "animate__bounceInLeft")
        //visible
        document.querySelector('.win').style = 'visibility: visible'
        document.querySelector('.res').style.display = 'grid'
    }

    function randsty() {
        var cla = ["animate__flip", "animate__flipInX", "animate__flipInY"]
        var rand = Math.floor(Math.random() * cla.length)
        return cla[rand]
    }
    document.querySelector('.res .btn1').addEventListener('click', function () {
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
    document.querySelector('.res .btn2').addEventListener('click', function () {
        window.location.reload();
    })
})()