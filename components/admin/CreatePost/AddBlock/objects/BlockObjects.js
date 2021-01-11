import uniqid from "uniqid"

let BlockObject = {
    h1: {
        _uid: '',
        component: "h1",
        headline: "Heading",
        value: '',
        timestamp: null
    },
    para: {
        _uid: '',
        component: "para",
        headline: "Paragraph",
        value: '',
        timestamp: null
    },
    image: {
        _uid: '',
        component: "image",
        headline: "Image",
        url: '',
        imageDesc: "",
        imageUploaded: false,
        timestamp: null
    },
    header: {
        _uid: "head-ml32sckwe",
        component: "title",
        headline: "Blog Title",
        value: '',
        tags: '',
        coverImageUploaded: false,
        coverImageUrl: '',
        set: false,
    },
    separator: {
        _uid: '',
        component: "separator",
        timestamp: null
    },
    quote: {
        _uid:'',
        component: "quote",
        value: '',
        timestamp: null
    },
    video: {
        _uid: '',
        component:"video",
        url: '',
        videoDesc: '',
        videoUploaded: false,
        timestamp: null
    }
}

export default BlockObject;