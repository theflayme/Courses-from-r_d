import routerProvider from '@/router';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <>
        <RouterProvider router={routerProvider} />
    </>
  )
}

export default App
