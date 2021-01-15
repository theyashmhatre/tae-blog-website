import { db } from "../../../../config/config";

export default async (req, res) => {
    let blogsList = [];
    await db.collection("blogs")
        .orderBy("uploadedAt", "desc")
        .get()
        .then((data) => {
            data.forEach((doc) => {
                blogsList.push({
                    blogId: doc.id,
                    blocks: doc.data().blocks,
                    likes: doc.data().likes,
                    postedBy: doc.data().postedBy,
                    uploadedAt: doc.data().uploadedAt,
                    views: doc.data().views
                });
            });
            return res.json(blogsList);
        })
        .catch((err) => {
            console.error("Err", err);
        });
}