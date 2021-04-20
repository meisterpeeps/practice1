import React, { useState } from "react";
// import constate from "constate";
import ReactDOM from 'react-dom';
import './styles/autosuggest.scss';
import axios, { AxiosResponse } from 'axios'
import AutoSuggest from "react-autosuggest"
import { PageContainer, SearchContainer, SearchTypes, LocationLabel, SearchRadio, NameLabel } from './styles/index'

interface SuggestionResponse extends AxiosResponse {
  data: ISuggestion[]
}
interface ISuggestion {
  id: number,
  name: string,
  street: string,
  city: string,
  state: string
}

type SearchType = 'location' | 'name'

const App = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([])
  const [searchType, setSearchType] = useState<SearchType>('location')

  const getSuggestions = async (value: string): Promise<ISuggestion[]> => {
    console.log('Search Value', value)
    console.log('Search Type', searchType)
    const response: SuggestionResponse = await axios.get('/suggestions', { params: { value, searchType: searchType.toLowerCase() } })
    console.log('Response', response)
    return response.data
  }

  const inputProps: AutoSuggest.InputProps<ISuggestion> = {
    placeholder: searchType === 'name' ? 'Enter Property Name' : 'Enter Property City or State',
    value: searchValue,
    onChange: (_, { newValue }) => {
      setSearchValue(newValue);
    }
  };

  const handleSearchType = (e: React.FormEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value as SearchType
    setSearchType(value)
  }

  return (
    <PageContainer>
      <SearchContainer>
        <AutoSuggest
          suggestions={suggestions}
          onSuggestionsClearRequested={() => setSuggestions([])}
          onSuggestionsFetchRequested={({ value }) => {
            setSearchValue(value);
            getSuggestions(value).then((suggestions) => {
              setSuggestions(suggestions);
            })
          }}
          onSuggestionSelected={(_, { suggestionValue }) =>
            console.log("Selected: " + suggestionValue)
          }
          getSuggestionValue={suggestion => suggestion.city}
          renderSuggestion={suggestion => <span>{searchType === 'name' ? suggestion.name : (`${suggestion.city}, ${suggestion.state}`)}</span>}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
        />
        <SearchTypes>
          <SearchRadio type="radio" value="location" id="Location"
            onChange={handleSearchType} name="searchType" defaultChecked />
          <LocationLabel htmlFor="Location">Location</LocationLabel>

          <SearchRadio type="radio" value="name" id="Name"
            onChange={handleSearchType} name="searchType" />
          <NameLabel htmlFor="Name">Name</NameLabel>
        </SearchTypes>
        </SearchContainer>
    </PageContainer>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));