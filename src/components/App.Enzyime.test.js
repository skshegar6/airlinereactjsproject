/*import { shallow } from 'enzyme';
import { Route } from 'react-router';
import Routes from './Routes.jsx';
import NurseAuthorization from './NurseAuthorization.jsx';
*/
import LandingPage from './flightCheckApp/checkInDashboard.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import App from './App.jsx';

test('invalid path should redirect to 404', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/random' ]}>
        <App/>
      </MemoryRouter>
    );
    expect(wrapper.find(LandingPage)).toHaveLength(0);
    expect(wrapper.find(NotFoundPage)).toHaveLength(1);
  });