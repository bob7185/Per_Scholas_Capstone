import { Outlet, Navigate } from "react-router-dom";
import  {useUser} from '../context/Context'

//
export default function PrivateRoute(){
    const {user} = useUser();
    return user ? <Outlet/> : <Navigate to='/signin' />
}