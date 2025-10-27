import {Router} from "express";
import * as city from "../controllers/cityController.js";
import upload from "../middleware/upload.js";


const cityRouter = Router();

cityRouter
    .get("/", city.getAllCities)
    // Feld "images" mit max. 3 Dateien
    .post("/", upload.array("images", 3), city.createCity)


export default cityRouter;

