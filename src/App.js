import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import bg from '../src/assets/bg1.jpg';

import './App.css';


function App() {
  const secondLink = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9b52e4b6-1d4e-4a16-8859-0147b1f4ec81/bg2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210127T215156Z&X-Amz-Expires=86400&X-Amz-Signature=3cbc993ce95b698a99d1833c2372e4f48e5569755f08e54dfd1b31bb304c2fec&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22bg2.jpg%22';
  return (
    <>
      <Header 
        title={'This is title'}
        descr={'This is Description!'}
        />
      <Layout 
        id={'1'}
        title={'Title 1'} 
        descr={'Discr 1'}
        urlBg={bg} 
        />
        <Layout 
        id={'2'}
        title={'Title 2'} 
        descr={'Discr 2'}
        colorBg='#ff02' 
        />
        <Layout 
        id={'2'}
        title={'Title 3'} 
        descr={'Discr 3'}
        urlBg={secondLink} 
        />
        <Footer/>
    </>
  );
}

export default App;
