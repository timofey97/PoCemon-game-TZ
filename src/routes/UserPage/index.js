
import Layout from '../../components/Layout';

import bg from '../../assets/bg1.jpg';
import { selectEmail } from '../../store/user';
import { useSelector } from 'react-redux';

function UserPage() {
    const userEmail = useSelector(selectEmail); 


  return (
    <>
        
        <Layout 
            id='rules'
            title='UserPage'
            urlBg={bg} 
          >
              You Email is - {userEmail} <br />
              That's all we have on you

        </Layout>
        
    </>
  );
}

export default UserPage;


