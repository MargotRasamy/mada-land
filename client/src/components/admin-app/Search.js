import '../../styles/apps/admin-app/search.scss';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useContext, useState } from 'react';

const Search = ({setMovies}) => {
  const [searchInput, setSearchInput] = useState('');

  
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  }

  const handleSubmitResearch = (e) => {

  }

  return (
    <div className="search-bar">
      <InputGroup className="search-bar--input-group mb-3">
        <Form.Control className="item search-form" aria-label="Text input with dropdown button" onChange={(e) => handleSearchInput(e)}
        placeholder="Search for a city..." />
        <Button onClick={handleSubmitResearch}
          variant="secondary"
          className="item"
          id="segmented-button-dropdown-2">Search
        </Button>
      </InputGroup>
          

    </div>
  );
}

export default Search;