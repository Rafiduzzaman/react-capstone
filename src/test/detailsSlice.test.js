import detailReducer, { fetchBreed } from '../redux/detailReducer/detailSlice';

describe('testing detailReducer', () => {
  it('should set Loading to false and breedData to the fetched data when fetchBreed.fulfilled is called', () => {
    const initialState = {
      breedData: [],
      loading: true,
      error: null,
    };
    const data = [
      {
        id: 'id',
        url: 'https://katAPI.url',
        breeds: [
          {
            name: 'Bengal',
            life_span: '12-15 years',
            adaptability: 3,
            affection_level: 5,
            energy_level: 4,
            health_issues: 2,
            intelligence: 4,
          },
        ],
      },
    ];
    const action = { type: fetchBreed.fulfilled.type, payload: data };
    const expectedState = {
      breedData: [
        {
          id: 'id',
          url: 'https://katAPI.url',
          name: 'Bengal',
          lifeSpan: '12-15 years',
          adaptability: 3,
          affectionLevel: 5,
          energyLevel: 4,
          healthIssues: 2,
          intelligence: 4,
        },
      ],
      loading: false,
      error: null,
    };
    const nextState = detailReducer(initialState, action);
    expect(nextState).toEqual(expectedState);
  });
});
