import Card from '../components/card';
import { SidebarLayout } from '../components/catalyst-ui-kit/sidebar-layout';
import NavbarComponent from '../components/layout/navbar';
import SidebarComponent from '../components/layout/sidebar';
import Section from '../components/section';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import MoviesPage from '../pages/movies';
import TvPage from '../pages/tv';
import PostsPage from '../pages/posts';
import SignIn from '../pages/signin';
import Details from '../pages/details';
import FavoritePage from '../pages/favorite';
import SignUp from '../pages/signup';
import NotFound from '../pages/notFound';

export function App() {
  return (
    <Router>
      <SidebarLayout
        navbar={<NavbarComponent />}
        sidebar={<SidebarComponent />}
      >
        <Routes>
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tv" element={<TvPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SidebarLayout>
    </Router>
  );
}

export default App;
