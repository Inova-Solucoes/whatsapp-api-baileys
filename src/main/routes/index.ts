import multer from 'multer';
import { Router } from "express";
import miscRoute from "./misc.route";
import groupRoute from "./group.route";
import messageRoute from "./message.route";
import instanceRoute from "./instance.route";
import {BaileysComposer} from "../compose/baileys/bailyes.composer";
const router = Router();
const controller = BaileysComposer.create();

router.use(instanceRoute);
router.use(messageRoute);
router.use('/api/whatsapp/group', groupRoute);
router.use('/api/whatsapp/misc', miscRoute );

export { router, controller };