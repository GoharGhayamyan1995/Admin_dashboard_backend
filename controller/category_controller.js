const db = require('../models');
const Category = db.Category;

const getCategory = async (req, res) => {
    try {
      const category = await Category.findAll();
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  const createCategory = (req, res) => {
    const category = {
      name: req.body.name,
     };
   Category.create(category)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the category."
        });
      });
  };
  
  const getCategoryById = async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: 'category not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
    
  function updateCategory(req,res){
    const {id}=req.params
    const {name} = req.body
    Category.update({name:name}, {where:{id:id}}).then((category)=>{
        res.status(201).json(category)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}

  const deleteCategory = async (req, res) => {
    try {
      const rowsDeleted = await Category.destroy({ where: { id: req.params.id } });
      if (rowsDeleted) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ error});
      }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
    };
    module.exports={getCategory, createCategory, getCategoryById, deleteCategory,updateCategory}