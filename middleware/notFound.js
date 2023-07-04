const notFound = (req,res,next) => {
    try {
        throw new Error (`Not found-${req.path}`)
    } catch (error) {
        next(error);
        
    }}
    export default notFound;