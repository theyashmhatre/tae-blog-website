import { db } from "../../../../../config/config";

export default async (req, res) => {
    const {name, email, content, blogId, commentedAt} = req.body;

    const newComment = {
        name, email, content, blogId, commentedAt
    };

    let errors = [];

    if (!name || !email || !content) errors.push("Please enter all the required fields and retry");

    if (errors.length !== 0) return res.status(400).json({ errors: errors });

    switch (req.method) {
        case "POST":
            return new Promise((resolve, reject) => {
                db.collection(`comments`)
                    .add(newComment)
                    .then(() => {
                        res.statusCode = 201;
                        res.end(JSON.stringify({
                            success: true,
                            id: doc.id,
                        }));
                        resolve();
                    })
                    .catch(err => {
                        res.json({ errors: errors });
                        res.status(405).end();
                        return resolve();
                    });
            });
    }
}