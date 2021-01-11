import firebase from "firebase";

export default(req,res) =>{
    const db = firebase.firestore();
    console.log(req.body); // The request body
    console.log(req.query); // The url query string
    console.log(req.method);
    
    const {body,method} = req;
    const {blocks, blogTitle, coverImageUploaded, uploadedAt} = body;

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
    };

    switch (method) {
        case "POST":
            db.collection("blogs")
                .add(newBlog)
                .then((doc) => {
                    res.statusCode = 200;
                    res.end({ doc: "all good" });
                })
                .catch((err) => {
                    errors.push("Something went wrong" + err);
                    res.json(errors);
                    res.status(405).end();
                    return resolve();
                });
            break;
    
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};  

export const config = {
    api: {
        // disable nextjs's body parser while deployed
        // (as body parsing is handled by `https.onRequest()`),
        // but enable it for local development using `next dev`
        bodyParser: false,
    }
};