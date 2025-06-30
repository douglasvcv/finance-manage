
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import YAML from "yamljs"
import path from "path";
import {merge} from "lodash"
import fs from "fs"


export function setupSwagger(app:Express){
    const baseDoc = YAML.load(path.join(__dirname, "../docs/base.yaml"))

    const pathsFolder = path.join(__dirname, "../docs/paths")
    const pathFiles = fs.readdirSync(pathsFolder).filter(file=> file.endsWith(".yaml"))

    const allPaths = pathFiles.reduce((acc, file)=>{
        const doc = YAML.load(path.join(pathsFolder, file))
        return merge(acc, doc)
    }, {})

    const fullDoc = {
        ...baseDoc,
        paths:{
            ...allPaths,
        }
    }
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(fullDoc))
}