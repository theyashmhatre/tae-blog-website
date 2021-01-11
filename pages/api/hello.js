// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  console.log(req.body) // The request body
  console.log(req.query) // The url query string
  console.log(req.method)
  res.statusCode = 200;
  res.json({ list: "blogData" });
}
