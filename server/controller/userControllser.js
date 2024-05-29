import User from "../models/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body); // req is use for getting  the data which is coming from the frontend 

    if (!userData) {
      return res.status(400).json({ msg: "user data not found " });
    }

    const savedUser = await userData.save();
    res.status(200).json({msg:"user successfully created!!"});
    // console.log(savedUser); 
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


// getting the all user 
export const getAll=async(req,res)=>{
    try {
        const allUser=await User.find();
        if(!allUser){
            res.status(401).json({msg:"user data  not found!!"});
        }
        res.status(200).json(allUser);// res is use for send the data from backend  to the frontend 
    } catch (error) {
        res.status(500).json({error:error})
    }
}

// getting single user 
export const getUser=async(req,res)=>{
    try {
        //jb bhi hume ek data ko handle karna hai to req.params ke through hi data milega 
        const id=req.params.id;
        const userExist=await User.findById(id);
        if(!userExist){
            res.status(404).json({msg:"user data not found!!"});
        }
        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({error:error})
    }
}

// update data 
export const update=async(req,res)=>{
    try {
        const id=req.params.id;
        const userExist=await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg:"user data is not found !!"});
        }
        const updatedData=await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({msg:"updated successfully !!!"});


    } catch (error) {
        res.status(500).json({error:error})
    }
}


export const deleteUser=async(req,res)=>{
    try {
        const id =req.params.id;
        const deletedData= await User.findById(id);
        if(!deletedData){
            res.status(404).json({msg:"user data not found !!"});
        }
        const afterDelete= await User.findByIdAndDelete(id);
        // console.log(afterDelete);
        res.status(200).json({msg:"delete successfully !!"});
    } catch (error) {
        res.status(500).json({error:error})
    }
}