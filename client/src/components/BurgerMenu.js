const BurgerMenu = ({onClickAction}) => {
    return (
        <button type="button" onClick={onClickAction} className="burger-menu" href="#">&#9776;</button>
    )
}

export default BurgerMenu;