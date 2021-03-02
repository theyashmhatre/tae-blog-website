import {db} from "../../../../../config/config";

export default async (req, res) => {

    const { blogId } = req.body;

    switch (req.method) {
        case "POST":
            return new Promise((resolve, reject) => {
                db.collection(`comments`)
                    .orderBy("commentedAt", "asc")
                    .onSnapshot(snapshot => {
                        const commentList = snapshot.docs
                            .filter(doc => doc.data().blogId === blogId)
                            .map(doc => {
                                return { id: doc.id, ...doc.data() };
                            });

                        res.statusCode = 201;
                        res.end(JSON.stringify({
                            success: true,
                            commentList: commentList,
                        }));
                        resolve();
                    });
            });

    }
}