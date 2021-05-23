import { db, storage } from "../../../config/config";
import { bucket } from "../../../config/firebaseAdmin";
global.XMLHttpRequest = require("xhr2");

export default (req, res) => {
    const { _uid, userUID } = req.body;
    const clearDataQuery = db.collection('drafts').doc(_uid);
    const ref = storage.ref(_uid);

    let errors = [];
    function deleteFile(pathToFile, fileName) {
        const ref = storage.ref(pathToFile);
        const childRef = ref.child(fileName);
        childRef.delete();
    }

    function deleteFolderContents(path) {
        const ref = storage.ref(path);
        ref.listAll()
            .then(dir => {
                dir.items.forEach(fileRef => {
                    deleteFile(ref.fullPath, fileRef.name);
                });
                dir.prefixes.forEach(folderRef => {
                    deleteFolderContents(folderRef.fullPath);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }


    switch (req.method) {
        case "POST":
            return new Promise((resolve, reject) => {
                
                deleteFolderContents(_uid);
                clearDataQuery.delete().then(() => {
                    res.statusCode = 200;
                    res.end(JSON.stringify({
                        success: true,
                        result: res,
                    }));
                    resolve();                
                }).catch((err) => {
                    errors.push("Something went wrong" + err);
                    res.json({ errors: errors });
                    res.status(405).end();
                    return resolve();
                });
            });
    }
}