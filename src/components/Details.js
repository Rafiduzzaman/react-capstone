import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Nav from './Nav';
import { fetchBreed } from '../redux/detailReducer/detailSlice';
import '../styles/Detail.css';

const Details = () => {
  const breedData = useSelector((state) => state.CatBreeds.breedData);
  const loading = useSelector((state) => state.CatBreeds.loading);
  const error = useSelector((state) => state.CatBreeds.error);
  const dispatch = useDispatch();
  const { breedId } = useParams();

  useEffect(() => {
    dispatch(fetchBreed(breedId));
  }, [dispatch, breedId]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  } if (error) {
    return (
      <p>
        Error fetching:
        { error }
      </p>
    );
  } return (
    <div className="container">
      <Nav />
      {breedData.length > 0 && (
      <>
        <h1 className="detail-header">
          Breed:
          {' '}
          {breedData[0].name}
        </h1>
        <div className="grid-container">
          <p className="BreedDets">
            Lifespan:
            {' '}
            {breedData[0].lifeSpan}
            {' '}
            years
          </p>
          <p className="BreedDets">
            Adaptability:
            {' '}
            {breedData[0].adaptability}
            {' '}
            / 5
          </p>
          <p className="BreedDets">
            AffectionLevel:
            {' '}
            {breedData[0].affectionLevel}
            {' '}
            / 5
          </p>
          <p className="BreedDets">
            EnergyLevel:
            {' '}
            {breedData[0].energyLevel}
            {' '}
            / 5
          </p>
          <p className="BreedDets">
            HealthIssues:
            {' '}
            {breedData[0].healthIssues}
            {' '}
            / 5
          </p>
          <p className="BreedDets">
            Intelligence:
            {' '}
            {breedData[0].intelligence}
            {' '}
            / 5
          </p>
        </div>
      </>
      )}
      <ul className="img-container">
        {breedData.map((item) => (
          <li className="image-box" key={item.id}>
            <img className="cat-img" src={item.url} alt="A Cat" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
