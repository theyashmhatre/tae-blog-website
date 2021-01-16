//base file for the building of the blocks. This file is passed on to the components using BlockContext Provider
import react from "react"
import uniqid from "uniqid"

const data = {
    content: {
        body: [
            {
                _uid: uniqid("blog",""),
                component: "header",
                headline: "Blog Title",
                value: '',
                tags: '',
                coverImageUploaded: false,
                coverImageUrl: '',
                blogDescription: '',
            }
        ]
    }
};

export default data;