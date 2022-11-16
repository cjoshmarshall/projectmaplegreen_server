import { db } from "../db"

export const getTrees = (req: any, res: any) => {

    // const q = "SELECT u._id,`firstname`,`lastname`,`age`,`gender`,`birthdate`,`email`,t._id AS tree_id,`userId`,`scientificname`,`localname`,`growth`,`planteddate`,`treehealth`,`entrydate`,`week` FROM users u JOIN trees t ON u._id=t.userId"
    const q = "SELECT * FROM trees"
    db.query(q, (err: Error, data: any) => {
        if (err) return res.status(404).json("Something went wrong")
        else return res.status(200).json(data)
    })
}

export const getUserTrees = (req: any, res: any) => {

    const q = "SELECT u._id,`email`,`admin`,`userId`,t._id,`scientificname`,`localname`,`growth`,`planteddate`,`treehealth`,`entrydate`,`week`,`image1`,`image2`,`image3` FROM users u JOIN trees t ON u._id=t.userId WHERE u._id=?"
    db.query(q, [req.params.id], (err: Error, data: any) => {
        if (err) return res.status(404).json("Something went wrong")
        else return res.status(200).json(data)
    })

}

export const postTrees = (req: any, res: any) => {

    const q = "SELECT * FROM users WHERE _id=?"
    const userId = req.body._id
    db.query(q, [userId], (err: Error, data: any) => {
        if (err) return res.status(404).json("Something went wrong")

        for (let i = 0; i < req.body.data.length; i++) {
            const { email, ...other } = req.body.data[i]
            const newData = Object.assign({}, { ...other, userId: userId })
            const values = Object.values(newData)

            const q = "SELECT * FROM trees WHERE _id=?"
            db.query(q, [req.body.data[i]._id], (err: Error, data: any) => {
                if (err) return res.status(404).json("Something went wrong")
                const q = "REPLACE INTO trees (`_id`,`scientificname`,`localname`,`growth`,`planteddate`,`treehealth`,`entrydate`,`week`,`image1`,`image2`,`image3`,`userId`)  VALUES (?)"
                db.query(q, [values], (err: Error, data: any) => {
                    if (err) return res.status(404).json("Something went wrong")
                })
            })
        }
        return res.status(200).json(data)
    })
}

export const postTree = (req: any, res: any) => {

    const q = "INSERT INTO trees (`userId`,`scientificname`,`localname`,`growth`,`planteddate`,`treehealth`,`entrydate`,`week`,`image1`,`image2`,`image3`)  VALUES (?)"
    const values = [
        req.body.userId,
        req.body.scientificname,
        req.body.localname,
        req.body.growth,
        req.body.planteddate,
        req.body.treehealth,
        req.body.entrydate,
        req.body.week,
        req.body.image1,
        req.body.image2,
        req.body.image3
    ]
    db.query(q, [values], (err: Error, data: any) => {
        if (err) return res.status(404).json("Something went wrong")
        else return res.status(200).json(data)
    })


}

export const putTree = (req: any, res: any) => {
    res.json('tree cont.')
}

export const deleteTree = (req: any, res: any) => {

    const q = "DELETE FROM trees WHERE userId=?"
    db.query(q, [req.body.userId], (err: Error, data: any) => {
        if (err) return res.status(404).json("Something went wrong")
        else return res.json(data)
    })
}