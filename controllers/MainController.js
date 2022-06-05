const dayjs = require('dayjs');
const res = require('express/lib/response');
const {
    getDocs,
    collection,
    query,
    where,
    doc,
    updateDoc,
    addDoc,
    getDoc
} = require('firebase/firestore');
const db = require('../config/db/firebase');
class MainController {
    async index(req, res, next) {
        res.render('main', {
            title: 'Main',
            sensors: [],
            leds: []
        })

        // const querySnapshotSensor = await getDocs(collection(db.database, "sensors"))
        // const resultSensors = []
        // querySnapshotSensor.forEach((doc) => {
        //     resultSensors.push({
        //         docid: doc.id,
        //         data: doc.data()
        //     })
        // });

        // const querySnapshotLed = await getDocs(collection(db.database, "controls"))
        // const resultControls = []
        // querySnapshotLed.forEach((doc) => {
        //     resultControls.push({
        //         docid: doc.id,
        //         data: doc.data()
        //     })
        // });

        // return res.json({
        //     resultSensors,
        //     resultControls
        // })
    }

    async getSensors(req, res, next) {
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

    async getLed(req, res, next) {
        const docRef = doc(db.database, "controls", "led")
        const ledDoc = await getDoc(docRef)
        return res.json(ledDoc.data());
    }

    async getPump(req, res, next) {
        const docRef = doc(db.database, "controls", "pump")
        const ledDoc = await getDoc(docRef)
        return res.json(ledDoc.data());
    }

    async getServo(req, res, next) {
        const docRef = doc(db.database, "controls", "servo")
        const ledDoc = await getDoc(docRef)
        return res.json(ledDoc.data());
    }

    async changeLedStatus(req, res, next) {
        const docRef = doc(db.database, "controls", "led")
        const ledDoc = await getDoc(docRef)
        const currentStatus = ledDoc.data().status
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
            const docRef = doc(db.database, "sensors", docItem.id)
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