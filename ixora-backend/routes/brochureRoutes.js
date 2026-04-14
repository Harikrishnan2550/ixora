import express from "express"

import upload from "../middleware/upload.js"

import {

uploadBrochure,
getBrochures,
deleteBrochure

} from "../controllers/brochureController.js"

const router = express.Router()

router.post(

"/upload",

upload.single("file"),

uploadBrochure

)

router.get("/",getBrochures)

router.delete("/:id",deleteBrochure)

export default router