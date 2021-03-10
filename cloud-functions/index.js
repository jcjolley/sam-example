const {Firestore} = require('@google-cloud/firestore');

const PROJECT_ID = 'sam-example-307101'

// Create a new client
const firestore = new Firestore({
    projectId: PROJECT_ID,
    timestampsInSnapshots: true
});


// async function quickstart() {
//     // Obtain a document reference.
//     const document = firestore.doc('posts/intro-to-firestore');
//
//     // Enter new data into the document.
//     await document.set({
//         title: 'Welcome to Firestore',
//         body: 'Hello World',
//     });
//     console.log('Entered new data into the document');
//
//     // Update an existing document.
//     await document.update({
//         body: 'My first Firestore app',
//     });
//     console.log('Updated an existing document');
//
//     // Read the document.
//     const doc = await document.get();
//     console.log('Read the document');
//
//     // Delete the document.
//     await document.delete();
//     console.log('Deleted the document');
// }

const generateId = (length) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const writeScores = async () => {
    const id = generateId(8)
    const score = Math.floor(Math.random() * 1000)
    const newScoreObject = {id, score}
    await firestore.doc(`/scores/${id}`).set(newScoreObject)
    return newScoreObject
}

const readScores = async () => {
    // Request the scores collection from firestore
    const scoreDocuments = await firestore.collection("/scores")
        // sort them by score
        .orderBy('score')
        // and execute the request
        .get();

    //for each document in the scores collection, get the underlying data and return an array of data
    return scoreDocuments.docs.map(d => d.data())
}

const queryScores = async () => {
    // Request the scores collection from firestore
    const scoreDocuments = await firestore.collection("/scores")
        //filter to only scores above 500
        .where('score', '>', 500)
        // sort them by score
        .orderBy('score')
        // and execute the request
        .get();

    //for each document in the scores collection, get the underlying data and return an array of data
    return scoreDocuments.docs.map(d => d.data())
}

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.readFirestore = async (req, res) => {
    const scores = await readScores();
    res.send(scores);
};

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.writeFirestore = async (req, res) => {
    const newScoreObject = await writeScores()
    res.send(`Wrote ${JSON.stringify(newScoreObject)}`)
}

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.queryFirestore = async (req, res) => {
    const scores = await queryScores()
    res.send(scores)
}
