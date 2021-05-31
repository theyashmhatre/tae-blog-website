const request = require("request");

export default async (req, res) => {
    const { email_address } = req.body;

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    if (!validateEmail(email_address)){
        return res.status(400).send({'msg': 'Invalid Email'});
    }

    var data = {
        members: [
            {
                email_address: email_address,
                status: "subscribed",
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    let options = {
        url: "https://us17.api.mailchimp.com/3.0/lists/" + process.env.UNIQUELISTID,
        method: "POST",
        headers: {
            "Authorization": "AnyString " + process.env.MAILCHIMPAPIKEY,
        },
        body: jsonData,
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
            return res.status(400).json({error: error});
        }
        else {
            console.log(response.statusCode);
            return res.status(201).json({msg: 'Successfully Subscribed!'});
        }
    });
}