import { NavLink } from "react-router-dom"

const BackLink = ({link}) => {
    return (
        <div className='back-link'>
            <NavLink className='link' to={link}>&larr; Back to {link}</NavLink>
        </div>
    )
}

export default BackLink;