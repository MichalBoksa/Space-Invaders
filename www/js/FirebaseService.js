

class FirebaseService{
    constructor(dbRef, addDoc, getDocs){
        this.dbRef = dbRef;
        this.addDoc = addDoc;
        this.getDocs = getDocs;
    }

   async addScoreToDb(name,scores){
    console.log("Asdfff");
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
    console.log("Asdfff");
        try {
            const highScoreTable = [];
            const docsSnap = await getDocs(this.dbRef);
            docsSnap.forEach(doc => {
                highScoreTable.push(doc.data());
            })
        } catch (error) {
            console.log(error);
        }
    }
}