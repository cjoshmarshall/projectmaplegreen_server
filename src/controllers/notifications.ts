import { db } from "../db"


export const getNotifications = (req: any, res: any) => {
    const q = "SELECT * FROM notifications"
    db.query(q, (err: Error, data: any) => {
        if (err) return res.json(err)
        else return res.json(data)
    })
}

export const postNotifications = (req: any, res: any) => {
    const q = "INSERT INTO notifications (`userId`) VALUES (?)"
    const values = req.body.userId
    db.query(q, [values], (err: Error, data: any) => {
        if (err) return res.json(err)
        else return res.json(data)
    })
}

export const deleteNotifications = (req: any, res: any) => {
    const q = "TRUNCATE TABLE notifications"
    db.query(q, (err: Error, data: any) => {
        if (err) return res.json(err)
        else return res.json('Data Erased Successfully')
    })
}