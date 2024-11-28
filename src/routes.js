// const { Router} = require('express')

import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from '../app/middlewares/auth';
import CategoryController from './app/controllers/CategoryController';
import OrderController from './app/controllers/OrderController';


const routes = new Router();

const upload = multer (multerConfig);

routes.post('/users', UserController.store); //deixando como store metodos get e post ja são adicionados
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.post('/products',ProductController.store);
routes.get('/products', authMiddleware,ProductController.index);

routes.post('/categories',CategoryController.store);
routes.get('/categories', authMiddleware,CategoryController.index);

routes.post('/orders',OrderController.store);
export default routes;