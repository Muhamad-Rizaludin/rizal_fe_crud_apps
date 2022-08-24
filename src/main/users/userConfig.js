import Login from './login';
import Register from './Register';
import EditUser from './EditUser';
import AddUser from './AddUser';
const UsersRouter = [
    {
        path: '/login',
        component: Login,
        withOutHeader: true,
    },
    {
        path: '/register',
        component: Register,
        withOutHeader: true,
    },
    {
        path: '/user/add',
        component: AddUser,
        withOutHeader: true,
    },
    {
        path: '/user/:id',
        component: EditUser,
        withOutHeader: true,
    }
    
    
]

export default UsersRouter;