import { getHeroesByPublisher } from "../helpers";
import { HeroCard } from "./HeroCard";

export const HeroList = ({ publisher }) => {
    const heroes = getHeroesByPublisher(publisher);

    return (
        <diiv className="row row-cols-1 row-cols-md-3 g-3">
            {
                heroes.map(hero => (<HeroCard key={hero.superhero} {...hero} />))
            }
        </diiv>
    );
}
