import { ClassEvent } from "../util/ClassEvent";

export class MicrofoneController extends ClassEvent{

    constructor(audioEl){

        super(); // chama o construtor da classe mãe

        this._mimeType = 'audio/webm';//padrão OpenSource do Google

        this._available = false;

        this._audioEl = audioEl;
        
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {         

            this._available = true;

            this._stream = stream;
            
            //let audio = new Audio();
            //audio.srcObject = stream;            
            //audio.play();
            //this.trigger('play', audio);

            this.trigger('ready', this._stream);

        }).catch(err => {
            console.error(err);
        });
    }

    isAvailable(){
        return this._available;
    }

    startRecorder(){

        if(this.isAvailable()){

            this._mediaRecorder = new MediaRecorder(this._stream, {
                mimeType: this._mimeType
            });

            this._recordedChunks = [];//guarda os pedaços da gravação

            this._mediaRecorder.addEventListener('dataavailable', e => {
                //verifica se há alguma coisa gravada
                if(e.data.size > 0) this._recordedChunks.push(e.data);// vai fazendo push dos peços da gravação

            });

            this._mediaRecorder.addEventListener('stop', e => {
                
                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType
                });
                
                let filename = `rec${Date.now()}.webm`;

                let audioContext = new AudioContext();                

                //console.log('file', file);

                //aqui muito legal
                let reader = new FileReader();// prepara para ler o arquivo

                reader.onload = e => {

                    audioContext.decodeAudioData(reader.result).then(decode => {
                        
                        let file = new File([blob], filename, {
                            type: this._mimeType,
                            lastModified: Date.now()
                        });

                        this.trigger('recorded', file, decode);

                    });

                    

                    //console.log('file', file);
                    //let audio = new Audio(reader.result);
                    //audio.play();
                }

                reader.readAsArrayBuffer(blob);

                //reader.readAsDataURL(file);
                //até aqui muito legal
            });

            this._mediaRecorder.start();//aqui começa a gravação
            this.startTimer();//começa a contar o tempo da gravação

        }

    }

    stopRecorder(){

        if(this.isAvailable()){
            
            this._mediaRecorder.stop();
            this.stop();
            this.stopTimer();

        }

    }

    stop(){

        this._stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    startTimer(){
        let start = Date.now();

        this._recorMicrophoneInterval = setInterval(()=>{

            //this.el.recordMicrophoneTimer.innerHTML = Format.toTime((Date.now() - start));

            this.trigger('recordtimer', Date.now() - start);

        }, 100);
    }

    stopTimer(){
        clearInterval(this._recorMicrophoneInterval);
    }

}