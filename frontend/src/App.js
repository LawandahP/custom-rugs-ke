import { Container } from 'react-bootstrap'

import { HashRouter as Router, Route } from 'react-router-dom' //react routing package




import Header from './components/Header'
import Footer from './components/Footer'
import ShopScreen from './screens/ShopScreen'

import HomeScreen from './screens/HomeScreen'

import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderDetailsScreen from './screens/OrderDetailsScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'
import OrderListScreen from './screens/OrderListScreen'



function App() {
  return (
    <Router>
    
      <Header />

      <main>
        <Container>
          {/* use route and pass component */}
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />

          <Route path='/shop' component={ShopScreen} exact/>
          <Route path='/' component={HomeScreen} exact/>
          
          <Route path='/cart/:id?' component={CartScreen} />

          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/products' component={ProductListScreen} />

          <Route path='/edit-product/:id' component={ProductEditScreen} />
          <Route path='/create-product' component={ProductCreateScreen} />

          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />

          <Route path='/order-details/:id' component={OrderDetailsScreen} />
          <Route path='/orders' component={OrderListScreen} />

          <Route path='/users' component={UserListScreen} />
          <Route path='/user/edit/:id' component={UserEditScreen} />
        </Container>
      </main>

      <Footer />

    </Router>
  );
}

export default App;
