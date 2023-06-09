const fs=require('fs')
const db = require('../models');
const Product= db.Product;

async function getProduct(req, res) {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}


async function createProduct(req, res) {
  const { name, price,image, categoryId } = req.body;
  try {
  
    const product = await Product.create({ name, price,image,categoryId });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

  async function getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.json(product);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  function updateProduct(req, res){
    const{id}=req.params
    const {name, price, image,categoryId}=req.body
    Product.update({name:name, price:price, image:image,categoryId:categoryId}, {where:{id:id}}).then((product)=>{
        res.status(201).json(product)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}
    
  async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        await product.destroy();
        res.json({ message: 'Product deleted' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  }

    module.exports={getProduct, createProduct, getProductById, deleteProduct,updateProduct}

  