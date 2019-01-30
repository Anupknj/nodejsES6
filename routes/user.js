import express from 'express';
import userControllers from '../controllers/user';
import auth from '../middlewares/auth';
const router= express.Router();

router.post('/createUser',userControllers.createUser);
router.get('/getUser/:id',userControllers.getOneUser);
router.get('/getUsers',userControllers.getAllUser);
router.put('/editUser/:id',userControllers.updateUser);
router.delete('/deleteUser/:id',userControllers.deleteUser);
router.get('/getToken/:id',userControllers.getToken);



export default router;










// import express from 'express';
// import auth from '../middlewares/auth';
// import { createUser,getAllUser,getOneUser,updateUser,deleteUser,getToken } from '../controllers/user';
// const router = express.Router();
// const app =express();



// function userRoutes(){
//     app.post('/createUser',createUser);
//     app.get('/getUsers',auth.ensureToken,getAllUser);
//     app.get('/getUser/:id',getOneUser);
//     app.put('/updateUser/:id',updateUser);
//     app.delete('/deleteUser/:id',deleteUser);
//     app.get('/getToken/:id',getToken);
// }

// export default { userRoutes }