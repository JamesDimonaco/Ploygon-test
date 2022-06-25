

import clientPromise from "../../middleware/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async (req:NextApiRequest, res: NextApiResponse) => {
    
    const hight = req.body.size1;
    const base = req.body.size2;
    const id = req.body.id;
    
    const client = await clientPromise;
    const db = client.db("Weaver");

    if (req.method === 'POST'){
        console.log(hight, base, id);
        

        db.collection("Triangle").insertOne({hight,base }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({error: err});
                res.end();
            } else {
                res.status(200);
                res.json({result});
                res.end();
            }
        })

    } else if (req.method === "DELETE") {        
        db.collection("Triangle").deleteOne({"_id": new ObjectId(id)}, (err, result) => {
            
            if (err) {
                console.log(err);
                res.status(500);
                res.json({error: err});
                res.end();
            } else {
                res.status(200);
                res.json({result});
                res.end();
            }
        })
    } else if (req.method === "PUT"){
        
        db.collection("Triangle").updateOne({"_id": new ObjectId(id)}, {$set: {hight, base}}, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.json({error: err});
                res.end();
            } else {
                res.status(200);
                res.json({result});
                res.end();
            }
        })
    } else if (req.method === "GET"){
        db.collection("Triangle").find({}).toArray((err, result) => {
                
                if (err) {
                    console.log(err);
                    res.status(500);
                    res.json({error: err});
                    res.end();
                } else {
                    res.status(200);
                    res.json({result});
                    res.end();
                }
            }
        )
    } else {
        res.status(404);
        res.end();
    }
}

