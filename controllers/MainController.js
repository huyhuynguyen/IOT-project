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
        const sensorRef = collection(db.database, 'sensors')
        const q = query(sensorRef, where("id", '==', +req.params.id))
        const documentSnapshots = await getDocs(q)
        var sensorName = ''
        let docRef = ''
        documentSnapshots.forEach((docItem) => {
            docRef = doc(db.database, "sensors", docItem.id)
            sensorName = docItem.data().name
        });
        await updateDoc(docRef, {
            value: req.body.value
        })

        // create log
        const now = dayjs().add(7, 'h')
        const logRef = await addDoc(collection(db.database, "logs"), {
            date: now.toISOString(),
            deviceId: req.body.deviceId,
            deviceName: req.body.deviceName,
            ipAddress: req.body.ipAddress,
            sensor: sensorName,
            value: req.body.value
        })
        
        return res.json('Success')
    }
}

module.exports = new MainController()