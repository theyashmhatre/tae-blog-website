import { db } from "../../../config/config"

export default (req, res) => {

    const { blogId, blogUID, blocks, blogTitle, blogDescription, coverImageUploaded, uploadedAt, userUID, postedBy } = req.body;

    let errors = [];

    if (blogTitle.length < 10) errors.push("Blog Title must be atleast 10 characters long");

    if (!blogDescription) errors.push("Description must be 10 to 250 characters long");

    if (!coverImageUploaded) errors.push("Please upload a cover image");

    if (errors.length !== 0) return res.status(400).json({ errors: errors });

    const newBlog = {
        blogId: blogId,
        blocks: blocks,
        uploadedAt: uploadedAt,
        likes: 0,
        views: 0,
        postedBy: postedBy,
        userUID: userUID,
    };

    switch (req.method) {
        case "POST":
            return new Promise((resolve, reject) => {
                db.collection("drafts")
                    .doc(blogUID).set(newBlog)
                    .then(() => {
                        res.statusCode = 201;
                        res.end(JSON.stringify({
                            success: true,
                        }));
                        resolve();
                    })
                    .catch((err) => {
                        errors.push("Something went wrong" + err);
                        res.json({ errors: errors });
                        res.status(405).end();
                        return resolve();
                    });
            });
    }
};

