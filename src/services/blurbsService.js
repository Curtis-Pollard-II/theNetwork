import { AppState } from "../AppState";
import { Blurb } from "../models/Blurb";
import { logger } from "../utils/Logger";
import { bcwSandbox } from "./AxiosService.js";

class BlurbsService {
    async getBlurbs(){
        const res = await bcwSandbox.get('api/ads')
        AppState.blurbs = res.data.map(b=> new Blurb(b))
        logger.log(res.data)
    }

}

export const blurbsService = new BlurbsService()