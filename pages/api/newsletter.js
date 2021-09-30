import { MongoClient } from 'mongodb';

async function connectingDatabase(){
    const client = await MongoClient.connect('mongodb+srv://firstEvent:OHOGBaZ3y495A403@cluster0.d2hsy.mongodb.net/firstEvent?retryWrites=true&w=majority');
    return client;
}
async function insertingData(client , data){
    const db = client.db();
    await db.collection('emails').insertOne(data);
}
async function handler(req,res){
   if(req.method === 'POST'){
        const email = req.body.email;
       console.log(email);
       let client ;
       try{
       client = await connectingDatabase();
       res.status(200).json({message : "Connecting to DataBase Successful !"});

       }catch(error){
           res.status(500).json({message : "Connecting to DataBase Failed !"});
           return;
       }
       try{
       insertingData(client ,  {email : email});
       res.status(200).json({message : "Inserting to DataBase Successful !"});
       client.close();
       }catch(error){
           res.status(500).json({message : "Inserting Document Failed !"});
           return;
       }
       res.status(201).json({message:"Successful"})
   }
}
export default handler;