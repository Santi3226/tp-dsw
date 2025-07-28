import { Outlet } from 'react-router';

function MainLayout() {
  
  return (
    <div className="main-layout">
      <header className="main-header">
        <h1>Main Layout Header</h1>
      </header>
      
      <main className="main-content">
        <p>This is the main content area.</p>
      </main>

      <footer className="main-footer">
        <p>Main Layout Footer</p>
        <Outlet />
      </footer>
    </div>
  )
}

export default MainLayout;