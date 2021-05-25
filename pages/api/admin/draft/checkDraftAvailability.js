import { db } from "../../../../config/config"

export default async (req, res) => {
    const {draftId} = req.body;

    return new Promise((resolve, reject) => {
        db.collection("drafts")
            .doc(draftId)
            .get()
            .then((doc) => {
                if (!doc.exists) {
                    console.log("Draft Not Found, ID -", draftId);
                    res.json({ draftPresent: false});
                    res.statusCode = 200;
                    res.end();
                    resolve();
                }

                else {
                    res.json({ draftPresent: true });
                    res.statusCode = 200;
                    res.end();
                    resolve();
                }

            })
            .catch((err) => {
                // console.log("Something went wrong" + err);
                // res.json({  error: err });
                // res.status(400).end();
                // reject();
            });
    });
}