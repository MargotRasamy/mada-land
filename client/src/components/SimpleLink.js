import { NavLink } from "react-router-dom";

const SimpleLink = ({color, text, toPath, wrapperClass}) => {
    return (
        <NavLink to={toPath} className={'simple-link ' + 'simple-link-' +color + ' ' + wrapperClass}>
           { text }
        </NavLink>
    )
} 
export default SimpleLink;