import './App.css';
import Banner from './components/Banner/Banner';
import Navbar from './components/Navbar/Navbar';
import Row from './components/Row/Row';
import requests from './requests';

function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <Navbar />
      {/* Banner */}
      <Banner />
      {/* Content */}
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
      <Row title="Actions Movies" fetchUrl={requests.fetchActionMovies}/>
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}/>
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>
    </div>
  );
}

export default App;
