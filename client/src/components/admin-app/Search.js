import '../../styles/apps/admin-app/search.scss';
import { Form, InputGroup } from 'react-bootstrap';

const Search = ({handleChange, placeholder}) => {

  return (
    <div className="search-bar">
      <InputGroup className="search-bar--input-group mb-3">
        <Form.Control className="item search-form" aria-label="Text input with dropdown button" onChange={(e) => handleChange(e)}
        placeholder={placeholder} />
        {/* <Button onClick={handleSubmitResearch}
          variant="secondary"
          className="item"
          id="segmented-button-dropdown-2">Search
        </Button> */}
      </InputGroup>
    </div>
  );
}

export default Search;