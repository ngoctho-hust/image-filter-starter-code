import express from 'express';
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

  app.get( "/", async ( req, res ) => {
    res.send("OK")
  } );
  
  app.get( "/filteredimage", async ( req, res ) => {
    let image_url =  req.query.image_url;
    filterImageFromURL(image_url).then((result) => {
      res.sendFile(result, err => {
        let files = getAllLocalFiles();
        deleteLocalFiles(files);
      });
    }).catch((err) => {
      res.status(400).send("Invalid image!");
    })
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();