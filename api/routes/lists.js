const router=require("express").Router();
const List=require("../models/List");
const { findByIdAndDelete } = require("../models/Movie");
const verify=require("../verifyToken");

//CREATE
router.post("/",verify,async(req,res)=>{
    if(req.user.isAdmin){
        const newList= new List(req.body);
        try{
            const savedList= await newList.save();
            res.status(201).json(savedList);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("you are not allowed")
    }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET
router.get("/",verify,async(req,res)=>{
   
        const typeQuery= req.query.type;
        const genreQuery=req.query.genre;
        let list=[];
        try{
            if(typeQuery){
                if(genreQuery){
                    list = await List.aggregate([
                        {$match:{type: typeQuery,genre: genreQuery} },
                        {$sample: {size:10} },
                    ]);
                }else{
                    list =await List.aggregate([
                        {$match: {type: typeQuery} },
                        {$sample: {size:10} },
                        
                    ]);
                }
            }else{
                list = await List.aggregate([{$sample:{size:10}}]);
            }
            res.status(200).json(list);
        }catch(err){
            res.status(580).json(err);
        }
})



module.exports=router; 