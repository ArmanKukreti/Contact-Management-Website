import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../lib/utils/generateTokenAndSetCookie.js"

export const register = async(req, res) => {
    try {
        const {firstName, lastName, email, phoneNumber, company, jobTitle, password, confirmPassword} = req.body

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^\d{10}$/
 
        if(!firstName || !lastName || !email || !phoneNumber || !company || !jobTitle || !password) {
            return res.status(422).json({message: "Please fill all the fields"})
        }

        if(!emailRegex.test(email)) {
            return res.status(422).json({error: "Invalid Email format"})
        }

        if(!phoneRegex.test(phoneNumber)) {
            return res.status(422).json({error: "Invalid Phone Number"})
        }

        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({email:newEmail})

        if(emailExists) {
            return res.status(422).json({error: "Email already exists"})
        }

        if(password.trim().length < 6) {
            return res.status(422).json({ error: "Password must be at least 6 characters long" });
        }

        if(password != confirmPassword) {
            return res.status(422).json({ error: "Password do not match" });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            firstName,
            lastName,
            email: newEmail,
            phoneNumber,
            company,
            jobTitle,
            password: hashedPassword
        })

        res.status(201).json(`New user ${newUser.email} registered successfully`)
        
    } catch (error) {
        console.log("Error in register controller", error.message)
        res.status(500).json({error: "Internal server error. Registration failed. Please try again later."})
    }
}

export const login = async(req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(422).json({message: "Please fill all the fields"})
        }

        const newEmail = email.toLowerCase()
        const user = await User.findOne({email: newEmail})

        const isPasswordCorrect = await bcrypt.compare(password, user.password); 

        if(!user || !isPasswordCorrect) {
            return res.status(422).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        user.password = null

        res.status(200).json(user)

    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({error: "Invalid credentials. Login failed. Please try again."})
    }
}