import { Outlet, Navigate } from "react-router-dom";
import  {useUser} from '../context/Context'

// Wrapper to protect the routes for unauthorized access
export default function PrivateRoute(){
    const {user} = useUser();
    return user ? <Outlet/> : <Navigate to='/signin' />
}