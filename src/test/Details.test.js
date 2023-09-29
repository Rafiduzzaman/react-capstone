import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Details from '../components/Details';
import store from '../redux/store';

const render = (component) => rtlRender(
  <Provider store={store}>
    <MemoryRouter>
      {component}
    </MemoryRouter>
  </Provider>,
);

describe('Details', () => {
  it('render Details Components', () => {
    render(<Details />);
    expect(Details).toMatchSnapshot();
  });
});
