import {MongoClient} from 'mongodb'

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body

        const client = await MongoClient.connect('mongodb+srv://new-user-testapp:528703N@cluster0.220tj.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db()

        const meetupsCollection = db.collection('meetups')

        const result = await meetupsCollection.insertOne({data})

        console.log(result)

        client.close()

        res.status(201).json({message: 'Meetup inserted'})
    }
}

export default handler