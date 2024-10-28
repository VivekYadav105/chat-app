import { Navigate } from "react-router-dom"

export default function ProtectedRoute(props){
    if(!props.protectType) return <Navigate to={'/Auth'} replace/>
    return props.children
}