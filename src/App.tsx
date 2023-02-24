// import reactLogo from './assets/react.svg';
import './App.css';
import { AppContextDOM } from './contexts/app';
import Router from './router';

export default function App() {
  return (
    <>
      <AppContextDOM>
        <Router />
      </AppContextDOM>
    </>
  );
}
