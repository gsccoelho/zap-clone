

export class Firebase {

    constructor(){

        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyBs6dVNinN8MQBOv8RLi9eOwX7wZFRCU1M",
            authDomain: "whatsapp-clone-e6332.firebaseapp.com",
            projectId: "whatsapp-clone-e6332",
            storageBucket: "whatsapp-clone-e6332.appspot.com",
            messagingSenderId: "585742443031",
            appId: "1:585742443031:web:477307cbce06283b96b252"
        };

        // Initialize Firebase
        //firebase.initializeApp(firebaseConfig);
        this.init(firebaseConfig);
    }

    init(firebaseConfig){
        if(!window._initializedFirebase){
            firebase.initializeApp(firebaseConfig);
            
            //firebase.firestore().settings({ timestampsInSnapshots: true });
            window._initializedFirebase = true;
        }
    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();//retorna os arquivos de upload 

    }

    initAuth(){
        return new Promise((success,failed)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(result => {
                    
                    //let token = result.credencial.accessToken;
                    let user = result.user;
                    
                    success({
                        user//, 
                        //token
                    });
                })
                .catch(err => {
                    failed(err);
                })

        })
    }

}
