const errorHandler=(error,req,res,next)=>{
    let errStatus= error.status || 500;
    let errMessage= error.message || "something went wrong";

    res.status(errStatus).send({message: errMessage});


};

export default errorHandler;