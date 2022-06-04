const dayjs = require('dayjs');
const res = require('express/lib/response');
const {
    getDocs,
    collection,
    query,
    where,
    doc,
    updateDoc,
    addDoc
} = require('firebase/firestore');
const db = require('../config/db/firebase');
class MainController {
    async index(req, res, next) {
        const querySnapshotSensor = await getDocs(collection(db.database, "sensors"))
        const resultSensors = []
        querySnapshotSensor.forEach((doc) => {
            resultSensors.push({
                docid: doc.id,
                data: doc.data()
            })
        });

        const querySnapshotLed = await getDocs(collection(db.database, "leds"))
        const resultLeds = []
        querySnapshotLed.forEach((doc) => {
            resultLeds.push({
                docid: doc.id,
                data: doc.data()
            })
        });

        return res.json({
            resultSensors,
            resultLeds
        })
    }

    async getSensorsFunc() {
        const querySnapshot = await getDocs(collection(db.database, "sensors"))
        const result = []
        querySnapshot.forEach((doc) => {
            result.push({
                docid: doc.id,
                data: doc.data()
            })
        });
        return res.json(result);
    }

    async getLeds() {
        const querySnapshot = await getDocs(collection(db.database, "leds"))
        const result = []
        querySnapshot.forEach((doc) => {
            result.push({
                docid: doc.id,
                data: doc.data()
            })
        });
        return res.json(result);
    }

    async changeLedStatus(req, res, next) {
        const ledId = +req.body.ledId
        const sensorRef = collection(db.database, 'leds')
        const q = query(sensorRef, where("id", '==', ledId))
        const documentSnapshots = await getDocs(q)
        let currentStatus = false
        let docRef = ''
        documentSnapshots.forEach((docItem) => {
            docRef = doc(db.database, "leds", docItem.id)
            currentStatus = docItem.data().status
        });
        await updateDoc(docRef, {
            status: !currentStatus
        })

        return res.json('Success')
    }

    async updateSensors(req, res, next) {
        const dataBody = req.body
        const listKeys = Object.keys(dataBody)

        const sensorRef = collection(db.database, 'sensors')
        const documentSnapshots = await getDocs(sensorRef)
        documentSnapshots.forEach(async (docItem) => {
            docRef = doc(db.database, "sensors", docItem.id)
            const now = dayjs().add(7, 'h')
            if (listKeys.includes(docItem.id)) {
                await updateDoc(docRef, {
                    value: dataBody[docItem.id].value
                })

                // create log
                await addDoc(collection(db.database, "logs"), {
                    date: now.toISOString(),
                    deviceId: 1,
                    deviceName: dataBody[docItem.id].deviceName,
                    ipAddress: dataBody[docItem.id].ipAddress,
                    sensor: dataBody[docItem.id].sensor,
                    value: dataBody[docItem.id].value
                })
            }
        });
        
        return res.json('Success')
    }
}

module.exports = new MainController()