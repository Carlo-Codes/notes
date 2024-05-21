import { ReactNode } from "react"
import "./navBar.css"

type IProps = {
    children?: ReactNode
}

export default function Navbar({children}:IProps):ReactNode{
    return (
        <div className="navBar">
            {children}
        </div>
    )
}