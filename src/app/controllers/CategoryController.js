import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User';

class CategoryController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            
        });
        
        try {
            schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
            return response.status(400).json({ error: err.errors });
    }

const {admin:isAdmin} = await User.findByPk (request.userId); //procura o Id do usuario
if(!isAdmin){
    return response.status(401).json();
}   

    const { name } = request.body;

    const categoriesExists = await Category.findOne({
        where:{
            name,
          },
    });
    if (categoriesExists){
        return response.status(400).json({error:'Category already exists'});
    }

    const category = await Category.create({
        name,
    
    });

    return response.status(201).json(category);
    }

    async index(){
        const categories = Category.findAll();

        return response.json(category);
    }
}
export default new CategoryController();