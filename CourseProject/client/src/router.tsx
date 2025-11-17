import { createBrowserRouter } from 'react-router-dom';
import Header from './layouts/Header';
import IndexPage from '@/pages/Index';

const routerProvider = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
    ],
  },
]);

export default routerProvider;
