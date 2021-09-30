import { MongoClient } from "mongodb";

async function connectToDataBase(){
    const client = await MongoClient.connect('mongodb+srv://firstEvent:OHOGBaZ3y495A403@cluster0.d2hsy.mongodb.net/eventComments?retryWrites=true&w=majority');
    return client;
}
async function insertingData(client , data){
    const db = client.db();
    await db.collection('events').insertOne(data);
    client.close();
}

async function handler(req,res){
    const eventId = req.query.eventId;
    if(req.method === 'POST'){
        const name = req.body.name;
        const email = req.body.email;
        const text = req.body.text;
        if(name.trim()==='' || text.trim()==='' || !email.includes('@'))
        {
            res.status(422).json({message:"BAD INPUT"});
            return;
        }
        const newComment = {
            email,
            name,
            text,
            eventId : eventId, 
        };
        let client ;
        try{
             client = await connectToDataBase();
        }catch(error){
            res.status(500).json({message: "Connection to DataBase Failed !"});
            return ;
        }
        try{
            insertingData(client , {comment : newComment})
        }catch(error){
            res.status(500).json({message:"Inserting Document Failed !"});
        }
    res.status(201).json({message :text  , comment : newComment});
}
if(req.method === 'GET'){
    const client = await connectToDataBase();
    const db = await client.db();
    const document = await db.collection('events').find().sort({__id : -1}).toArray();
    res.status(200).json({comments : document});
}
}
export default handler;