import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <div id='header'>
        <h1>layout</h1>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}
