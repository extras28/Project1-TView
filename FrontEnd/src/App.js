import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './components/Layout/DefaultLayout';
import HomeScreen from './pages/Home';
import { publicRoutes } from './routes';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
              {publicRoutes.map((route, index) => {
                let Layout = DefaultLayout;
    
                if(route.layout){
                  Layout = route.layout;
                }
    
                const Page = route.component
    
                return (
                  <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page/>
                    </Layout>
                  }/>
    
                )
              })}
          </Routes>
      </div>
    </Router>
  );
}

export default App;
