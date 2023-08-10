import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { getHeroesByName } from "../helpers/getHerosByName";
import { HeroCard } from "../components/HeroCard";

export const SearchPage = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const query = location.search.slice(3);

    const { searchText, onInputChange } = useForm({
        searchText: query
    });


    const heroes = getHeroesByName(query);

    const showSearch = query.length === 0;
    const showError = query.length > 0 && heroes.length === 0;

    const onSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`?q=${searchText}`);
    }

    return (
        <>
            <h1>Search</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Searching</h4>

                    <form aria-label="form"
                        onSubmit={onSearchSubmit}>
                        <input type="text"
                            placeholder="Search a hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onInput={onInputChange} />

                        <button className="btn btn-outline-primary mt-1">
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    <div className="alert alert-primary animate__animated animate_fadeIn"
                        style={{display: showSearch ? '' : 'none'}}>
                        Search a Hero
                    </div>

                    <div aria-label="no-hero-label"
                        className="alert alert-danger animate__animated animate_fadeIn"
                    style={{display: showError ? '' : 'none'}}>
                        No hero with <b>{query}</b>
                    </div>

                    {
                        heroes.map(hero => (
                            <HeroCard key={hero.id} {...hero} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}
