import Card from '../components/card';
import { SidebarLayout } from '../components/catalyst-ui-kit/sidebar-layout';
import NavbarComponent from '../components/layout/navbar';
import SidebarComponent from '../components/layout/sidebar';
import Section from '../components/section';

const movies = [
  {
    imageUrl:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg',
    title: 'Arcane',
    year: '2024',
    rating: '7.5',
  },
  {
    imageUrl:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/peNC0eyc3TQJa6x4TdKcBPNP4t0.jpg',
    title: 'The Matrix Resurrections',
    year: '2021',
    rating: '7.5',
  },
  {
    imageUrl:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/AgBNLcHFEXCRFZuKv0H8RWMxNAJ.jpg',
    title: 'Don’t Look Up',
    year: '2021',
    rating: '7.5',
  },
  {
    imageUrl:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg',
    title: 'Spider Man: No Way Home',
    year: '2021',
    rating: '7.5',
  },
  {
    imageUrl:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg',
    title: 'Arcane',
    year: '2024',
    rating: '7.5',
  },
  {
    imageUrl:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/peNC0eyc3TQJa6x4TdKcBPNP4t0.jpg',
    title: 'The Matrix Resurrections',
    year: '2021',
    rating: '7.5',
  },
  {
    imageUrl:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/AgBNLcHFEXCRFZuKv0H8RWMxNAJ.jpg',
    title: 'Don’t Look Up',
    year: '2021',
    rating: '7.5',
  },
  {
    imageUrl:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/5bFK5d3mVTAvBCXi5NPWH0tYjKl.jpg',
    title: 'Spider Man: No Way Home',
    year: '2021',
    rating: '7.5',
  },
];

export function App() {
  return (
    <div>
      <SidebarLayout
        navbar={<NavbarComponent />}
        sidebar={<SidebarComponent />}
      >
        <Section movies={movies} header="Popular Movies" />
        <Section movies={movies} header="Popular TV Shows" />
        <Section movies={movies} header="Popular Posts" />
        {/* <Card
          title="arcane"
          year="2024"
          imageUrl="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg"
          rating="7.5"
        /> */}
      </SidebarLayout>
    </div>
  );
}

export default App;
