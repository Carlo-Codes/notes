import { Link } from 'react-router-dom';

interface props {
    name:string,
    route:string,
}

export default function NavItem(props:props){
    return (
        <Link to={props.route}>
            {props.name}
        </Link>
    )
}