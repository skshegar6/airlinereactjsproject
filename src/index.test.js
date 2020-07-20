import React from 'react';
import renderer from 'react-test-renderer';
import App from './components/App.jsx';

it('matches the snapshot', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});