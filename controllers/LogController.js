const dayjs = require('dayjs');
const {
    getDocs,
    collection,
    addDoc,
    query,
    where,
    orderBy,
    limit,
    doc,
    getDoc,
    updateDoc,
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

        const documentSnapshots = await getDocs(q);
        const result = []
        documentSnapshots.forEach((doc) => {
            result.push({
                docid: doc.id,
                data: doc.data()
            })
        });

        const lastLogData = result[result.length - 1].data;
        const lastLogDate = lastLogData.date
        let date = new Date(lastLogDate);
        const now = dayjs().add(7, 'h')
        const docRef = doc(db.database, "devices", "esp")

        if (now.hour() - dayjs(date).hour() > 5) {
            // update esp8266 status
            await updateDoc(docRef, {
                active: false,
                lastAccess: now.toISOString()
            })
        } else {
            if (!(await getDoc(docRef)).data().active) {
                await updateDoc(docRef, {
                    active: true,
                    lastAccess: now.toISOString()
                })
            }
        }

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