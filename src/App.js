import {useState} from 'react';
import GamePage from './routes/GamePage';
import HomePage from './routes/HomePage';

const App = () => {
  const [page, setPage] = useState('home');

  const handleChangePage = () => {
    setPage(page === 'home' ? 'game' : 'home')
  };

  switch (page) {
    case 'home':
      return <HomePage
                onChangePageClick = {handleChangePage}
                />
    case 'game':
      return <GamePage 
              onChangePageClick = {handleChangePage}
              />
    default:
      return <HomePage
      onChangePageClick = {handleChangePage}
            />
  }
};

export default App;