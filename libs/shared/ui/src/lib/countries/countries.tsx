import './countries.module.css';
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;

/*
export interface CountriesProps {}

export function Countries(props: CountriesProps) {
  return (
    <div>
      <h1>Welcome to Countries!</h1>
    </div>
  );
}

export default Countries;

*/

export function Countries() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const countries = data.countries.slice(0, 4);

  return (
    /* class="flex space-x-4" */
    <div >
      {countries.map((country) => (
        /* class="flex-1" */
        <div key={country.code} >
          <h3>{country.name}</h3>
          <p>
            {country.code} - {country.emoji}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Countries;
