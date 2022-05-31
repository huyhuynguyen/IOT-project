const {
    query,
    collection,
    getDocs,
    where,
    orderBy,
    limit
} = require('firebase/firestore');
const db = require('../config/db/firebase');

class ChartController {
    async index(req, res, next) {
        const chartLimit = process.env.CHART_ITEM
        const logRef = collection(db.database, "logs")

        const querySnapshot = await getDocs(collection(db.database, "sensors"))
        const arrayQuery = []
        let q = ''
        querySnapshot.forEach(async (docItem) => {
            q = query(logRef, where('sensor', '==', docItem.data().name), orderBy("date", "desc"), limit(chartLimit))
            arrayQuery.push(q)
        });

        const arrayResult = []
        for (let index = 0; index < arrayQuery.length; index++) {
            const q = arrayQuery[index];
            const documentSnapshots = await getDocs(q)
            const arrObj = []
            documentSnapshots.forEach((docItem) => {
                arrObj.push(docItem.data())
            });
            arrayResult.push(arrObj)
        }

        return res.json(arrayResult)
    }
}

module.exports = new ChartController()