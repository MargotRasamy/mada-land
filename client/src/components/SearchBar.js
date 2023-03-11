import '../styles/search-bar.scss';
import { Button, Form, InputGroup } from 'react-bootstrap';
// import CreateMovieModal from '../movies/CreateMovieModal';
import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import cities from '../data/cities.json';

const SearchBar = ({setMovies}) => {
  const openModal = () =>{ 
    setModalShow(true);
  }
  
  const typeOfMovies = ['SF','CRIME','DRAMA','ADVENTURE','THRILLER','HORROR','ROMANCE', 'FANTASY', 'ANIME', 'COMEDY', 'ACTION', 'DOCUMENTARY'];
  const [searchInput, setSearchInput] = useState('');
  const [categorySelected, setCategorySelected] = useState('');
  const navigateTo = useNavigate();

  const createMovieRedirection = () => {
    state.userData.isConnected ? openModal() : navigateTo('/authenticate')
  }
  
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  }

  const handleCategoryChange = (e) => {
    setCategorySelected(e.target.value);
  }

  const isCategorySelected = () => {
    return typeOfMovies.includes(categorySelected);
  }

  const handleSubmitResearch = async () => {
    setMovies([]);
  }

  const getCityName = (_cityID) => {
    return cities[_cityID].name;
  }

  const allCities = () => {
    return cities["mg"];
  }

  const { state } = useContext(GlobalContext);

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="search-bar">
      <InputGroup className="search-bar--input-group mb-3">
        <Form.Control className="item search-form" aria-label="Text input with dropdown button" onChange={(e) => handleSearchInput(e)}
        placeholder="Search for a city..." />
        <Form.Select className='item' aria-label="Default select" onChange={(e) => handleCategoryChange(e)}>
          <option>All cities</option>
          { allCities().map((city,index) => {
            return <option key={index} value={city.id}>{city.name}</option>
          })}
        </Form.Select>
        <Button onClick={handleSubmitResearch}
          variant="secondary"
          className="item"
          id="segmented-button-dropdown-2">Search
        </Button>
        <Button className="item" variant="outline-secondary" onClick={createMovieRedirection}>Create movies</Button>
        {/* <CreateMovieModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        /> */}
      </InputGroup>
          

    </div>
  );
}

export default SearchBar;