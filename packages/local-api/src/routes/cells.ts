import express from "express";
import fs from "fs/promises";
import path from "path";
export const createCellsRouter = (filename: string, dir: string) => {

interface Cell {
    id: string;
    content: string;
    type: "text" | "code";
}


const router = express.Router();
router.use(express.json());


const fullpath = path.join(dir, filename);
router.get("/cells", async (req, res) => {
try{
    // read the file
    const result = await fs.readFile(fullpath, { encoding: "utf-8" });
    // parse the list of cells out of it
    if(result) {
    res.send(JSON.parse(result));
    } else {
    res.send([]);
    }


   } catch (err: any) {

if(err.code === "ENOENT") {
    // add code to create a file and add default cells
    await fs.writeFile(fullpath, "[]", "utf-8");
    res.send([]);
   } else {
    throw err;
    }
    }

   
   // if read throws an error (file does not exist) 
    // inspect the error code, see if it says that the file does not exist 
    //Parse a list of cells out of it 
    // send a list of cells back to the browser
//   res.send("Hi there");
});

router.post("/cells", async (req, res) => {


    // take the list of cells from the request object
    // serialize them
    const { cells }: {cells: Cell[]} = req.body;
    // write the cells into the file
    await fs.writeFile(fullpath, JSON.stringify(cells), "utf-8"); // write the cells into the file utf-8 is the plain text type
    res.send({ status: "ok" });

});

return router;
};