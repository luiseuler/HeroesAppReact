import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";

export const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const query = location.search.slice(2);

    const { searchText, onInputChange } = useForm({
        searchText: ''
    });


    const onSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`?=${searchText}`);
    }

    return (
        <>
            <h1>Search</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Searching</h4>

                    <form onSubmit={onSearchSubmit}>
                        <input type="text"
                            placeholder="Search a hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off" 
                            value={searchText}
                            onInput={onInputChange}/>

                        <button className="btn btn-outline-primary mt-1">
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    <div className="alert alert-primary">Search a Hero</div>

                    <div className="alert alert-danger">No hero with <b>{query}</b></div>
                </div>
            </div>
        </>
    );
}
