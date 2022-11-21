import { f } from "pdfjs-dist";

export class ClassEvent{

    constructor(){

        this._events = {};

    }

    on(eventName, fn){

        if(!this._events[eventName]) this._events[eventName] = new Array();

        this._events[eventName].push(fn);

    }

    trigger(){

        let args = [...arguments];
        let eventName = args.shift();//remove o primeiro elemento do arrray

        if(this._events[eventName] instanceof Array){

            this._events[eventName].forEach(fn => {
                fn.apply(null, args);
            });

        }

    }

}