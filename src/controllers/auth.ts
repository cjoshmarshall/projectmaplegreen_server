import { db } from "../db"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = (req: any, res: any) => {
    // check existing user
    const q = "SELECT * FROM users WHERE email=?"
    db.query(q, [req.body.email], (err: Error, data: any) => {
        if (data.length) return res.status(409).json("User Already Exists")
        else if (err) return res.json(err)

        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        //insert user
        const q = "INSERT INTO users (`email`,`password`,`firstname`,`lastname`,`age`,`gender`,`birthdate`,`timestamp`,`admin`) VALUES (?)";
        const values = [
            req.body.email,
            hash,
            req.body.firstname,
            req.body.lastname,
            req.body.age,
            req.body.gender,
            req.body.birthdate,
            req.body.timestamp,
            req.body.admin
        ]

        db.query(q, [values], (err: Error, data: any) => {
            if (err) return res.json(err)

            // insert address
            const email = "SELECT * FROM users WHERE email=?"
            db.query(email, [req.body.email], (err: Error, data: any) => {

                const q = "INSERT INTO address (`userId`,`address1`,`address2`,`state`,`city`,`area`,`pincode`,`aadhar`) VALUES (?)";
                const address = [
                    data[0]._id,
                    req.body.address.address1,
                    req.body.address.address2,
                    req.body.address.state,
                    req.body.address.city,
                    req.body.address.area,
                    req.body.address.pincode,
                    req.body.address.aadhar
                ]

                db.query(q, [address], (err: Error, data: any) => {
                    if (err) return res.json(err)
                })
            })
            return res.status(200).json(data)
        })
    })
}

export const login = (req: any, res: any) => {
    // check existing user
    const q = "SELECT * FROM users WHERE email=?"

    db.query(q, [req.body.email], (err: Error, data: any) => {
        if (data.length === 0) return res.status(404).json("User not found")
        else if (err) return res.json(err)

        // check password
        const isPassword = bcrypt.compareSync(req.body.password, data[0].password)
        if (!isPassword) return res.status(400).json("Password is wrong")

        let users = data[0]

        const email = "SELECT * FROM address WHERE userId=?"
        db.query(email, [data[0]._id], (err: Error, data: any) => {
            let user = { ...users, address: data[0] }
            if (err) return res.send(err)

            const token = jwt.sign({ id: user._id }, 'jwtsecretkey')
            const { password, ...other } = user
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'None'
            }).status(200).json({ _id: other._id, email: other.email, firstname: other.firstname, admin: other.admin, token: token })
        })
    })
}