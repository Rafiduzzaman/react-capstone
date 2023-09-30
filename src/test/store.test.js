import store from '../redux/store';

describe('Redux Store Configuration', () => {
  it('should initialize with the correct initial state', () => {
    const initialState = {
      AllKats: {
        breedList: [],
        loading: false,
        error: null,
      },
      CatBreeds: {
        breedData: [],
        loading: false,
        error: null,
      },
    };

    const currentState = store.getState();

    expect(currentState).toEqual(initialState);
  });
});
