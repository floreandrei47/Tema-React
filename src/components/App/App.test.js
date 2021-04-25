import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const store = configureStore();
describe('App', () => {
it('renders without crashing', () => {
   shallow(<App store={store}/>);
});

it('to contain something',()=>{
  const app =<App store={store}/>;
  expect.anything(app);
});

});
