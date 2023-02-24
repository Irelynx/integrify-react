import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '~/layouts/main';
import Countries from '~/pages/countries';
import Country from '~/pages/country';
import Error from '~/pages/error';
import { basepath } from '~/settings';

export const router = createBrowserRouter(
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
    basename: basepath,
  },
);

export function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
