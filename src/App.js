import {useState} from 'react';
import GamePage from './routes/GamePage';
import HomePage from './routes/HomePage';
import MenuHeader from './components/MenuHeader';
import MainMenu from './data/main-menu';

const App = () => {

    const [page, setPage] = useState('home');
    const handleChangePage = (page) => setPage(page);
    const onChangeMenu = (item) => {
        setPage(item.route);
        document.location.href = '#' + (item.href ?? '');
    }

  let pageContent;

  switch (page) {
    case 'home':
    document.title = 'Home | Pokemon Game';  
    pageContent = <HomePage onChangePageClick = {handleChangePage}/>
    break;
    case 'game':
        document.title = 'Home | Pokemon Game';
       pageContent = <GamePage onChangePageClick = {handleChangePage}/>;
              break;
    default:
      document.title = 'Page Not Found | Pokemon Game';
            pageContent = <h1>Page not found</h1>;
            break;
  }

  return <>
        <MenuHeader menu={MainMenu} onSelectMenu={onChangeMenu}/>
        {pageContent}
   </>
};

export default App;