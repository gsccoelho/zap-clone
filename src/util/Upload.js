import { Firebase } from "./Firebase";

export class Upload {

    static send(file, from){

        
        return new Promise((s,f) => {
            //console.log('aqui');
            //var blob = new Blob();
            let uploadTask = Firebase.hd().ref(from).child(Date.now() + '_' + file.name).put(file);
            //console.log('uploadTask', uploadTask);
             uploadTask.on('state_changed', e => {                 
                 
                console.info('upload', e);
                //console.log('uploadTask',uploadTask.snapshot);
                 
             },err =>{                 
                 
                f(err);
                 
             }, () => {
                 
                s(uploadTask.snapshot);
                 
             });
             
         });
        

    }


}