import  {db} from "../../../../config/config";

export default async (req,res) =>{
    
    let id = req.query.id;
    let blogData = {};
    // const increment = firebase.firestore.FieldValue.increment(1);
    // let singleBlog = db.collection("blogs").doc(id);
    // console.log(singleBlog,"gug");

    await db.doc(`/blogs/${id}`)
        .get()
        .then((doc)=> {
            if (!doc.exists){
                return res.status(404).json({ error: 'Blog not found' });
            }
            
            blogData = doc.data();
            return res.status(200).json(blogData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
};