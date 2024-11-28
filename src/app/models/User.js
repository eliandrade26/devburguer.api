import Sequelize, {Model} from 'sequelize'; // importando a sequelize e a model
import UserController from '../controllers/UserController';
import { password } from '../../config/database';

export class User extends Model { // User esta herdando os metodos de Model
    static init(sequelize) { //static permite acessar as habilidades da classe pai
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password:Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                admin: Sequelize.BOOLEAN,
            },
            { 
                sequelize,
            },

        );
        this.addHook('beforeSave', async (user)=>{
if (user.password){
    user.password_hash = await bcrypt.hash(user.password, 10);
    }
 });

        return this;
    }

    async checkPassword(password){
     return bcrypt.compare(password, this.password_hash)
    }
}






export default User;