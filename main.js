import { Product } from './model/Product.js';
import { Category } from './model/Category.js';
import { sequelize } from './sequelize_connection.js';
import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

await sequelize.sync();


app.delete('/api/category/:id', async (req, res) => {
    
    const id = parseInt(req.params.id);
    const yes = await Category.findOne({ where: {
        id,
    }});
    if(!yes)
    {
        res.status(404);
        res.send("NOT FOUND").end();
        return;
    }
    else{
        await Category.destroy({
            where: {
              id: id,
            }
          });
    }
    res.send(yes).end();
})

app.get('/api/category', async (req, res) => {
    const categories = await Category.findAll();
    res.send(categories).end();
});

app.post('/api/category', async (req, res) => {
    if(!req.body.name )
    {   res.send("WRITE NAME");
        res.status(401).end();
        return;
    }
    const categories = await Category.create({ name: req.body.name });
    res.send(categories).end();
});

app.put('/api/category/:id',async (req, res) => {
    const { name } = req.body;
    const id = parseInt(req.params.id);
    if(!name)
    {   res.send("WRITE NAME");
        res.status(401).end();
        return;
    }
   await Category.update({ name }, {
        where: {
            id,
        },
    });
    res.send(id).end();
});

app.post('/api/product', async (req, res) => {
    if(!req.body.name || !req.body.price || !req.body.description || !req.body.categoryId)
    {   res.send("YOU FORGOT NAME OR PRICE OR DESCRIPTION");
        res.status(401).end();
        return;
    }
    const product = await Product.create({ 
        name: req.body.name,
        price: parseFloat(req.body.price),
        description: req.body.description,
        CategoryId: req.body.categoryId,
    });
    res.send(product).end();
});

app.get('/api/product', async (req, res) => {
    res.status(200);
    res.send(await Product.findAll()).end();
})

app.get('/api/product/category/:categoryId', async (req, res) => {
    const id = parseInt(req.params.categoryId);
  const products =  await Product.findAll({
        where: {
            CategoryId : id,
        },
    })
    
    res.status(200);
    
    res.send(products).end();
})


app.get('/api/product/:id', async (req, res) => {
    const id = parseInt(req.params.id);
  const products =  await Product.findOne({
        where: {
            id : id,
        },
    })
    
    res.status(200);
    
    res.send(products).end();
})


app.put('/api/product/:id', async (req , res) => {
    const id = parseInt(req.params.id);
    const values = {};
    if(req.body.name)
    {
        values.name = req.body.name;
    }
    if(req.body.price)
    {
        values.price = parseFloat(req.body.price);
    }

    if(req.body.description)
    {
        values.description = req.body.description;
    }

    if(req.body.categoryId)
    {
        values.CategoryId = req.body.categoryId;
    }

    await Product.update(values, {
        where: {
            id: id,
        },
    });
    res.send(req.params.id).end();
})

app.delete('/api/product/:id', async (req, res) => {
    
    const id = parseInt(req.params.id);
    const yes = await Product.findOne({ where: {
        id,
    }});
    if(!yes)
    {
        res.status(404);
        res.send("NOT FOUND").end();
        return;
    }
    else{
        await Product.destroy({
            where: {
              id: id,
            }
          });
    }
    res.send(yes).end();
})


app.listen(port, () => console.log('listenning on ' + port));
