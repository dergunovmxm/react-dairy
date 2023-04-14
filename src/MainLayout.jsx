import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components';

function MainLayout() {
  return (
    <>
      <header className="header">
        <Header />
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
