import { createHashRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '~/layouts/main';
import Countries from '~/pages/countries';
import Country from '~/pages/country';
import Error from '~/pages/error';

export const router = createHashRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        {
          path: '',
          element: <Countries />,
        },
        {
          path: 'country/:id',
          element: <Country />,
        },
      ],
    },
  ],
  {
    // basename: basePath,
  },
);

export function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
