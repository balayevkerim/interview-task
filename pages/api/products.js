export default async function handler(req, res) {
  const result =  await fetch(`https://dummyjson.com/products?skip=${req.query.skip}`)
  .then(res => res.json())

  res.status(200).json(result.products);
}