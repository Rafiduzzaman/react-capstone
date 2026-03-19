import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchKatBreeds } from '../redux/homeReducer/HomeSlice';
import '../styles/Home.css';
import arrow from '../assets/arrowRight.svg';
import cat from '../assets/cat.jpg';

const Home = () => {
  const breedList = useSelector((state) => state.AllKats.breedList);
  const loading = useSelector((state) => state.AllKats.loading);
  const error = useSelector((state) => state.AllKats.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchKatBreeds());
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBreeds = breedList.filter((breed) => breed.name
    .toLowerCase().includes(searchQuery.toLowerCase()));

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchSuggestions = normalizedQuery
    ? breedList
      .filter((breed) => breed.name.toLowerCase().includes(normalizedQuery))
      .slice(0, 5)
    : [];

  let content;

  if (loading) {
    content = <p className="load">Loading...</p>;
  } else if (error) {
    content = <p className="load">{error}</p>;
  } else {
    content = (
      <>
        <section className="search-area">
          <label htmlFor="breed-search" className="search-label">
            Find Your Feline Match
            <input
              id="breed-search"
              className="search-bar-wrapper"
              type="text"
              placeholder="Search by breed..."
              list="breed-suggestions"
              autoComplete="off"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <datalist id="breed-suggestions">
              {searchSuggestions.map((breed) => (
                <option key={breed.id} value={breed.name}>{breed.name}</option>
              ))}
            </datalist>
          </label>
        </section>
        <ul className="table">
          {filteredBreeds.map((breed, index) => {
            const row = Math.floor(index / 4);
            const column = index % 4;
            const isDark = (row + column) % 2 === 1;

            return (
              <li className={`table-cell ${isDark ? 'dark' : ''}`} key={breed.id}>
                <Link className="table-row" to={`/Details/${breed.id}`} aria-label={`View ${breed.name} breed details`}>
                  <img className="arrow" alt="arrow" src={arrow} />
                  <div className="card-content">
                    <h2 className="breed-name">{breed.name}</h2>
                    <p className="feature">
                      Origin:
                      {breed.origin}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        {filteredBreeds.length === 0 && (
          <p className="empty-state">No breeds found. Try another keyword.</p>
        )}

      </>
    );
  }

  return (
    <div className="home-container">
      <div className="header">
        <img className="header-img" src={cat} alt="Header" />
        <div className="hero-copy">
          <p className="hero-tag">Whisker World</p>
          <h1 className="headline">Cat Breeds, Curated for Curious Cat Lovers</h1>
          <p className="hero-subtitle">
            Explore global feline personalities through a rich visual gallery and deep breed facts.
          </p>
        </div>
      </div>
      {content}
    </div>
  );
};

export default Home;
