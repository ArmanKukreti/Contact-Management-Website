import express from "express";
import { createContact, deleteContact, editContact, getContacts } from "../controllers/contact.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router()

router.post('/create', protectRoute, createContact)
router.get('/', protectRoute, getContacts)
router.put('/edit/:id', protectRoute, editContact)
router.delete('/:id', protectRoute, deleteContact)

export default router