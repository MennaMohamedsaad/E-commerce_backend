
import express from "express";
import * as NC from "./note.controller.js";
import { auth } from "../../middleware/auth.js";


const router =express.Router();

router.get('/',NC.getNote);
router.post('/',auth(),NC.addNote);
router.patch('/:id',auth(),NC.updateNote);
router.delete('/:id',auth(),NC.deleteNote);
router.get('/user',auth(),NC.getUserNote);

export default router;