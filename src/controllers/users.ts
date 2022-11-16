import { db } from "../db"

export const getUsers = (req: any, res: any) => {
    const q = "SELECT * FROM users u JOIN address a where u._id=a.userId"
    db.query(q, (err: Error, data: any) => {
        if (err) return res.json(err)
        else return res.json(data)
    })
}

export const getUser = (req: any, res: any) => {
    const q = "SELECT * FROM users where email=?"
    db.query(q, [req.body.email], (err: Error, data: any) => {
        if (err) return res.json(err)
        else return res.json(data)
    })
}

export const putUser = (req: any, res: any) => {
    const q = "SELECT * FROM users where email=?"
    db.query(q, [req.body.email], (err: Error, data: any) => {
        if (err) return res.json(err)
        else return res.json(data)
    })
}

export const deleteUser = (req: any, res: any) => {
    const q = "DELETE FROM users where _id=?"
    db.query(q, [req.params.id], (err: Error, data: any) => {
        if (err) return res.json(err)
        else return res.json(data)
    })
}