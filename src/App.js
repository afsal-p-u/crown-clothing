import { Route, Routes  } from 'react-router-dom'

import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component'

const Shop = () =>{
  return(
    <h3>iam the owner of this shop</h3>
  )
}

const  App = () => {
  
  return (
    <Routes>

      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>

    </Routes> 
  );
}

export default App;
