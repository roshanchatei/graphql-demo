import './App.css';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './routes';
import {gql, useQuery} from "@apollo/client";

function App() {

    const GET_LOCATIONS = gql`
        query TaxDetails{
          defaultTaxDetails: taxDetails(taxType: "DEFAULT") {
            ... on DefaultTaxDetail {
              merchant_id
              tax
              tax_name
              tax_type
              provinces {
                province_id
                rate
                state_code
                state
                tax_name
                tax_type
                tax_value
              }
              country_code
              country_id
              country_name
            }
          }
          overrideTaxDetail: taxDetails(taxType: "OVERRIDE"){
            ... on OverrideTaxDetail {
              merchant_id
              tax_type
              collection_id
              provinces {
                rate
                state_code
                state
              }
              country_code
              country_name
              collection {
                collection_id
                admin_graphql_api_id
                body_html
                handle
                sort_order
                published_scope
                title
                product_count
                image {
                  alt
                  src
                  width
                  height
                }
                collection_type
              }
            }
          }
        }
    `;

    const PROFILE = gql`
        query Profile {
          profile {
            shop_name
            domains {
              main_domain
              shopify_domain
              __typename
            }
            credentials {
              access_token
              client_secret
              storefront_access_token
              __typename
            }
            user {
              email
              full_name
              __typename
            }
            __typename
          }
        }
    `

    const { loading, error, data } = useQuery(PROFILE);

    console.log('data', data)

    return (
        <>
            <MemoryRouter>
                <Navigation />
            </MemoryRouter>
        </>
    );
}

export default App;
