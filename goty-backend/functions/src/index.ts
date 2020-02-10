import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as express from 'express';
import * as cors from 'cors';

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://angularcourse-section22.firebaseio.com'
  });

const dataBase = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.json({
     mensaje: 'Hello from Firebase functions!!!'
    });
});

export const getGoty = functions.https.onRequest(async (request, response) => {
    const gotyReference = dataBase.collection('goty');
    
    const docsSnap = await gotyReference.get();

    const result = docsSnap.docs.map(x => x.data());

    response.json(result);
   });

// Express
const app = express();
app.use(cors({ origin: true }));

app.get('/goty', async (req, resp) => {
    const gotyReference = dataBase.collection('goty');
    const docsSnap = await gotyReference.get();
    const result = docsSnap.docs.map(x => x.data());

    resp.json(result);
});

app.post('/goty/:id', async (req, resp) => {
    const gameId = req.params.id;
    const gameRef = dataBase.collection('goty').doc( gameId );
    const gameSnap = await gameRef.get();

    if (!gameSnap.exists) {
        const badRequest = 400;
        resp.status(badRequest).json({
            ok: false,
            status: badRequest,
            message: 'Badrequest',
            error: {
                message: 'No existe jeugo con ID: ' + gameId,
            },
        });
    }
    else {
        const gameBeforeChange = gameSnap.data() || { votos: 0 };
        await gameRef.update({
            votos: gameBeforeChange.votos + 1,
        });

        resp.json({
            ok: true,
            status: 200,
            message: `Gracias por tu voto a ${ gameBeforeChange.name }`,
            votos: gameBeforeChange.votos + 1,
            url: gameBeforeChange.url,
        });
    }
});

export const api = functions.https.onRequest(app);