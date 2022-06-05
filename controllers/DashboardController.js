const db = require('../config/db/firebase');
const { getDocs, collection, updateDoc, doc } = require('firebase/firestore');
const dayjs = require('dayjs');
class DashboardController {
    async index(req, res, next) {
        return res.render('index', {
            title: 'Dashboard'
        })
    }

    async indexApi(req, res, next) {
        const querySnapshot = await getDocs(collection(db.database, "devices"))
        const result = []
        querySnapshot.forEach((doc) => {
            result.push({
                docid: doc.id,
                data: doc.data(),
                date: dayjs(doc.data().lastAccess).subtract(7, 'h')
            })
        });

        return res.json(result)
    }

    async update(req, res, next) {
        const docId = req.params.id
        const docRef = doc(db.database, "devices", docId)
        await updateDoc(docRef, {
            ...req.body,
        })
        return res.json('Success')
    }
}

module.exports = new DashboardController()