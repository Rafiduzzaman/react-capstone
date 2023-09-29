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

  let content;

  if (loading) {
    content = <p className="home-loading">Loading...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else {
    content = (
      <>
        <input
          className="search-bar-wrapper"
          type="text"
          placeholder="Search by breed name..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <ul className="table">
          {filteredBreeds.map((breed) => (
            <Link className="table-row" key={breed.id} to={`/Details/${breed.id}`}>
              <li className="table-cell">
                <img className="arrow" alt="arrow" src={arrow} />
                <div className="left-wing">
                  <h2 className="breed-name">
                    {breed.name}
                  </h2>
                  <p className="feature">
                    Origin:
                    {' '}
                    {breed.origin}
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </>
    );
  }

  return (
    <div className="home-container">
      <div className="header">
        <img className="header-img" src={cat} alt="Header" />
      </div>
      {content}
    </div>
  );
};

export default Home;
