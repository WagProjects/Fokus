const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')

focoBt.addEventListener('click', () => {
    alterarContexto('foco')
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
})

function alterarContexto(contexto){
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