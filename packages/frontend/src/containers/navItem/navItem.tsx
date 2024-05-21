import { Link } from 'react-router-dom';
import './navItem.css'
interface props {
    name:string,
    route:string,
}

export default function NavItem(props:props){
    return (
        <Link to={props.route} className='navItem'>
            {props.name}
        </Link>
    )
}