import firebase from 'firebase'


class Fire{
    constructor(){
          this.init()
          this.checkAuth()
    }


    init = () => {
        if (!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyC3MsRGMGPvPEWkxr73-t5wqOFekEDZ4I0",
                authDomain: "chatapp-4c3e2.firebaseapp.com",
                projectId: "chatapp-4c3e2",
                storageBucket: "chatapp-4c3e2.appspot.com",
                messagingSenderId: "785740254458",
                appId: "1:785740254458:web:8b77acd3cb5e8785740d43",
                measurementId: "G-8F4SSMKWY5"
            });
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user =>{
            if (!user){
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                Text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };
            
            this.db.push(message);
        });
    };

    parse = message => {
        const {user, text, timestamp} = message.val()
        const {key: _id} = message;
        const createAT = new Date(timestamp);

        return{
            _id,
            createAT,
            text,
            user
        };
    };

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
    };

    off(){
        this.db.off();
    }

    get db(){
        return firebase.database().ref("messages");
    }

    get udi(){
        return(firebase.auth().currentUser || {}).uid
    }
}

export default new Fire();