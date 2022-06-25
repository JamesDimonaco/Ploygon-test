

import clientPromise from "../../middleware/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async (req:NextApiRequest, res: NextApiResponse) => {
    
    const width = req.body.size1;
    const length = req.body.size2;
    const id = req.body.id;
    
    const client = await clientPromise;
    const db = client.db("Weaver");

    if (req.method === 'POST'){
        console.log("POST");
        

        db.collection("Rectangle").insertOne({width,length }, (err, result) => {
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
        db.collection("Rectangle").deleteOne({"_id": new ObjectId(id)}, (err, result) => {
            
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
        console.log(width, length, id);
        
        db.collection("Rectangle").updateOne({"_id": new ObjectId(id)}, {$set: {width, length}}, (err, result) => {
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
        db.collection("Rectangle").find().toArray((err, result) => {
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
    }else {
        res.status(404);
        res.end();
    }
}

