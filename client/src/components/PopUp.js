const PopUp = (props) => {
    const { title, content } = props;
    return (
        <div className="popup">
            <p className="title">{ title }</p>
            <p className="content">{ content }</p>
            <a href="#" alt="hello" className="closePopup">&#10005;</a>
        </div>
    );
}

export default PopUp;