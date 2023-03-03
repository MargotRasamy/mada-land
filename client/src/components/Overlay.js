import PopUp from "./PopUp";

const Overlay = () => {
    return (
        <div className="overlay">
            <PopUp title="Transaction réussie !" content="Succès de la transaction" />
        </div>
    );
}

export default Overlay;