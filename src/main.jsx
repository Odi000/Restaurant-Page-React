import { StrictMode, useRef, createContext } from 'react'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './Components/Homepage';
import Careers from './Components/Careers';
import useMenu from './Components/useMenu';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage></HomePage>
  },
  {
    path: 'careers',
    element: <Careers></Careers>,
  }
])

export const Meals = createContext({ meals: [], error: null, loading: true });

function MealsWrapper({ children }) {
  const { data: meals, error: errorMeals, loading: loadingMeals } = useMenu('/dishes.json');
  const ourMenuRef = useRef(null)

  return (
    <Meals value={{ meals, errorMeals, loadingMeals, ourMenuRef}}>
      {children}
    </Meals>
  )
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MealsWrapper>
      <RouterProvider router={router} />
    </MealsWrapper>
  </StrictMode>
)
