

class FirebaseService{
    constructor(dbRef, addDoc, getDocs){
        this.dbRef = dbRef;
        this.addDoc = addDoc;
        this.getDocs = getDocs;
    }

   async addScoreToDb(name,scores){

     const docRef = await this.addDoc(this.dbRef, {
            name:name,
            score:scores}).then(docRef => {
                console.log("Document has been added successfully");
            })
            .catch(error => {
                console.log(error);
            })
    }

   async getHighScoreTable(){
    let scoresTemp = [];
        try {
            const docsSnap = await this.getDocs(this.dbRef);
            docsSnap.forEach(doc => {
                scoresTemp.push(doc.data());
            })
            scoresTemp.sort(function(x, y) {
                if (x.score < y.score) {
                  return -1;
                }
                if (x.score > y.score) {
                  return 1;
                }
                return 0;
              });
        } catch (error) {
            console.log(error);
        }
        scoresTemp =  scoresTemp.slice(-5);
        console.log(scoresTemp.length);
       return scoresTemp;
    }
}