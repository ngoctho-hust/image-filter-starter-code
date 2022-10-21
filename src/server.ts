import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, getAllLocalFiles} from './util/util';
import fs from "fs";

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req: Request, res: Response) => {
    return res.status(200).send("OK")
  } );
  
  app.get( "/filteredimage", async ( req: Request, res: Response ) => {
    let image_url: string =  req.query.image_url;
    filterImageFromURL(image_url).then((result) => {
      return res.status(200).sendFile(result, err => {
        let files: string[] = getAllLocalFiles();
        deleteLocalFiles(files);
      });
    }).catch((err) => {
      return res.status(400).send("Invalid image!");
    })
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();