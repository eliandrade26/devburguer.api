import * as Yup from 'yup';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';

class ProductController {
    async store(request, response) {
        const product = await Product.create({
            name,
            price,
            category_id,
            path,
            offer,
        });

        return response.status(201).json(product);
    }

    async update(request, response) {
        const schema = Yup.object({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number,
            offer: Yup.boolean(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }
        const { admin: isAdmin } = await User.findByPk(request.userId); //procura o Id do usuario
        if (!isAdmin) {
            return response.status(401).json();
        }

        const { id } = request.params;
        const { filename: path } = request.file;
        const findProduct = await Product.findByPk(id);

        if (!findProduct){
            return response
            .status(400)
            .json({error:'Make sure your product ID is correct'});
        }

        let path;
        if (request.file){
            path = request.file.filname;
        }

        
        const { name, price, category_id, offer } = request.body;

         await Product update({
            name,
            price,
            category_id,
            path,
            offer,
        },{
            where:{
                id,
            },
        });

        return response.status(201).json(product);
    }

    async index() {
        const products = Product.findAll({
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'], //chamando os atributos da category
                },
            ],
        });

        return response.json(products);
    }
}
export default new ProductController();