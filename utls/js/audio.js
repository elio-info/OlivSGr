class audioJuego {
    static ficheroAudio
    static musica
    constructor(ruta_ficheroAudio) {
        this.ficheroAudio= document.createElement('audio')
        this.ficheroAudio.src=ruta_ficheroAudio
    }
    sonarAudio() {
        this.ficheroAudio.play()
    }

    sonarJuego(){
        this.musica= setInterval(
            this.ficheroAudio.play(),
            3000 //3s
        )
    }

    callarJuego=()=>{ clearInterval(this.musica)}
    
}

