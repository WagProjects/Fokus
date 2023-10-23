const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
musica.loop = true
const audioPlay = new Audio('./sons/play.wav')
const audioPause = new Audio('./sons/pause.mp3')
const audioFim = new Audio('./sons/beep.mp3')
const temporizador = document.querySelector('#timer')


let tempoDecorridoEmSegundos = 1500
let tempoEscolhido = tempoDecorridoEmSegundos
let intervaloId = null
const comecarBt = document.querySelector('#start-pause')


musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
})

function alterarContexto(contexto){
    mostrarTemporizador()
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    switch(contexto){
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `

            focoBt.classList.add('active')
            curtoBt.classList.remove('active')
            longoBt.classList.remove('active')

            break;
        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada? <br> 
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `

            focoBt.classList.remove('active')
            curtoBt.classList.add('active')
            longoBt.classList.remove('active')

            break;
        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar à superficie. <br>
                <strong class="app__title-strong">Faça uma pausa longa</strong>
            `

            focoBt.classList.remove('active')
            curtoBt.classList.remove('active')
            longoBt.classList.add('active')

            break;
    }
}

function alterarTexto(texto1, texto2){
     `
    ${texto1}<strong class="app__title-strong">${texto2}</strong>
    `
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        audioFim.play()
        alert('Tempo finalizado!')
        zerar()
        comecarBt.innerHTML = `
            <img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
            <span>Começar</span>
        `
        tempoDecorridoEmSegundos = tempoEscolhido
        return
    }
    tempoDecorridoEmSegundos --
    mostrarTemporizador()
}

comecarBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar(){
    if(intervaloId){
        comecarBt.innerHTML = `
            <img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
            <span>Tocar</span>
        `
        zerar()
        audioPause.play()
        return
    }else{
        audioPlay.play()
        comecarBt.innerHTML = `
            <img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt="">
            <span>Pausar</span>
        `
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTemporizador(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    temporizador.innerHTML = `${tempoFormatado}`
}

mostrarTemporizador()