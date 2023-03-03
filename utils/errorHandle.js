module.exports = (res,error)=>{
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        return res
            .status(error.response.status)
            .json({ error: error.response.data });
    } else {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}
