import React, { useEffect, useState } from 'react';
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBreed(breedId));
  }, [dispatch, breedId]);

  useEffect(() => {
    setActiveImageIndex(0);
    setIsPreviewOpen(false);
  }, [breedId, breedData.length]);

  const showNextImage = () => {
    if (breedData.length === 0) return;
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % breedData.length);
  };

  const showPreviousImage = () => {
    if (breedData.length === 0) return;
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + breedData.length) % breedData.length);
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  } if (error) {
    return (
      <p className="loading">
        Error fetching:
        { error }
      </p>
    );
  } return (
    <div className="container">
      <Nav />
      {breedData.length > 0 && (
      <>
        <section className="detail-hero">
          <h1 className="detail-header">
            {breedData[0].name}
          </h1>
          <p className="detail-subtitle">A closer look at temperament, vitality, and personality.</p>
        </section>
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
        {breedData.map((item, index) => (
          <li className="image-box" key={item.id}>
            <button
              type="button"
              className={`thumb-btn ${isPreviewOpen && index === activeImageIndex ? 'active' : ''}`}
              onClick={() => {
                setActiveImageIndex(index);
                setIsPreviewOpen(true);
              }}
              aria-label={`Preview image ${index + 1}`}
            >
              <img className="cat-img" src={item.url} alt={`${item.name} thumbnail ${index + 1}`} />
            </button>
          </li>
        ))}
      </ul>
      {isPreviewOpen && (
      <section
        className="preview-modal"
        aria-label="Cat image popup preview"
        onClick={() => setIsPreviewOpen(false)}
      >
        <div className="preview-dialog" onClick={(event) => event.stopPropagation()}>
          <button
            type="button"
            className="modal-close"
            onClick={() => setIsPreviewOpen(false)}
            aria-label="Close image preview"
          >
            &times;
          </button>
          <section className="preview-panel" aria-label="Cat image preview carousel">
            <button type="button" className="carousel-btn" onClick={showPreviousImage} aria-label="Show previous image">
              &#8592;
            </button>
            <img
              className="preview-img"
              src={breedData[activeImageIndex].url}
              alt={`${breedData[0].name} preview ${activeImageIndex + 1}`}
            />
            <button type="button" className="carousel-btn" onClick={showNextImage} aria-label="Show next image">
              &#8594;
            </button>
          </section>
          <p className="preview-count">
            Image
            {' '}
            {activeImageIndex + 1}
            {' '}
            of
            {' '}
            {breedData.length}
          </p>
        </div>
      </section>
      )}
    </div>
  );
};

export default Details;
