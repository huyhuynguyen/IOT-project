const dayjs = require('dayjs');
const {
    getDocs,
    collection,
    addDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    doc,
    getDoc,
} = require('firebase/firestore');
const db = require('../config/db/firebase');


class LogController {
    async index(req, res, next) {
        const limitItem = process.env.LIMIT || 6
        let page = +req.query.page || 1
        if (page < 1)
            page = 1
        const logRef = collection(db.database, "logs")
        let q = query(logRef, orderBy("date", "desc"), limit(limitItem));
        // if (req.query.last) {
        //     const docRef = doc(db.database, "logs", req.query.last)
        //     const docRefSnapshot = await getDoc(docRef)
        //     q = query(logRef, orderBy("date", "desc"), startAfter(docRefSnapshot), limit(limitItem));
        // } else {
        //     q = query(logRef, orderBy("date", "desc"), limit(limitItem));
        // }


        const documentSnapshots = await getDocs(q);
        const result = []
        documentSnapshots.forEach((doc) => {
            result.push({
                docid: doc.id,
                data: doc.data()
            })
        });
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

        res.render('log', {
            title: 'Logs',
            logs: result,
        })
    }

    async create(req, res, next) {
        let deviceId = 0
        const q = query(collection(db.database, "devices"), where("name", "==", req.body.deviceName))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deviceId = doc.data()["id"]
        });
        const now = dayjs().add(7, 'h')
        try {
            const logRef = await addDoc(collection(db.database, "logs"), {
                ...req.body,
                date: now.toISOString(),
                deviceId
            })
            return res.json({
                id: logRef.id
            })
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
}

module.exports = new LogController()