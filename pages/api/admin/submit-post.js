import firebase from "firebase";

export default(req,res) =>{
    const db = firebase.firestore();
    console.log(req.body) // The request body
    console.log(req.query) // The url query string
    console.log(req.method)
    
    const {blocks, blogTitle, coverImageUploaded, uploadedAt} = req.body;

    let errors = [];

    if(blogTitle.length < 10) errors.push("Blog Title must be atleast 10 characters long");

    if (!coverImageUploaded) errors.push("Please upload a cover image");

    if (errors.length !== 0) return res.status(400).json({errors : errors});

    const newBlog = {
        blocks: blocks,
        uploadedAt : uploadedAt,
        likes: 0,
        views: 0,
        postedBy : "Yash Mhatre"
    }

    db.collection("blogs")
        .add(newBlog)
        .then((doc)=>{
            res.status(200).json({ doc: "all good" });
        })
        .catch((err)=>{
            errors.push("Something went wrong" + err);
            res.status(500).json({errors: errors});
        });
    
}