import homeReducer, { fetchKatBreeds } from '../redux/homeReducer/HomeSlice';

describe('testing homeReducer', () => {
  it('should set isLoading to false and contents to the fetched data when fetchContinents.fulfilled is called', () => {
    const state = {
      breedList: [],
      loading: true,
      error: null,
    };
    const data = [{ id: '1', name: 'Abysinian', origin: 'Abysinia' }];
    const action = { type: fetchKatBreeds.fulfilled.type, payload: data };
    const expectedState = {
      breedList: data,
      loading: false,
      error: null,
    };
    expect(homeReducer(state, action)).toEqual(expectedState);
  });
});
