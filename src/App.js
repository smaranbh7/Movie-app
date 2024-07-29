import styled from 'styled-components'
import MovieComponent from './components/MovieComponent';
import { useState } from 'react';
import axios from 'axios';
import MovieInfoComponent from './components/MovieInfoComponent';
export const API_KEY = '4b02e2bc';

function App() {
const [searchQuery, setSearchQuery ] = useState();
const[timeoutId, setTimeoutId]= useState();
const [movieList, setMovieList]=useState();
const[selectedMovie, setSelectedMovie]=useState();

const fetchData= async(searchString) => {
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY }`);
    setMovieList(response.data.Search)
}

const onTextChange =(event) =>{
  setSelectedMovie("")
  clearTimeout(timeoutId);  // Cancels previous API Calls
  setSearchQuery(event.target.value);
  const timeout = setTimeout(() => fetchData(event.target.value), 500);

  setTimeoutId(timeout);
}


  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="movie/movie-icon.svg" />
           Movie App
          </AppName>
          <SearchBox>
              <SearchIcon src='movie/search-icon.svg' />
              <SearchInput 
              placeholder='Search Movie' 
              value={searchQuery}
              onChange={onTextChange}/>
          </SearchBox>
      </Header>
      {selectedMovie &&(
         <MovieInfoComponent
          selectedMovie={selectedMovie } 
          setSelectedMovie={setSelectedMovie}/>
          )}
         <MovieListContainer>
        {
          movieList?.length
          ? movieList.map((movie, index)=>(
          <MovieComponent key={index} 
          movie={movie} 
          setSelectedMovie={setSelectedMovie}
          />
          ))
          : <Placeholder src="/movie-icon.svg" />
        }
        
      </MovieListContainer>
    </Container>

  );
}

export default App;




/*Styled Components */
const Container = styled.div`
  display:flex;
  flex-direction: column;
`
const Header = styled.div`
display:flex;
flex-direction: row;
justify-content: space-between;
background-color: black;
color:white;
align-items: center;
padding : 10px;
font-size: 25px;
font-weight: bold;
box-shadow: 0 3px 6px 0 #555;
`;

const AppName= styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const MovieImage=styled.img`
width: 48px;
height: 48px;
margin: 15px;

`;

const SearchBox=styled.div`
display: flex;
flex-direction: row;
padding: 10px 10px;
background-color: white;
border-radius: 6px;
margin-left: 20px;
width: 50%;
background-color: white;
align-items: center;
`;
const SearchIcon =styled.img`
width: 32px;
height: 32px;
`;

const SearchInput=styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px; 
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;
