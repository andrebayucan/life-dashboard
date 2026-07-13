import { Link, Outlet } from 'react-router'
import './Layout.css'

const Layout = () => {
    return (
        <div className="whole-page">
            <header className="page-header">
                <h1 className="bold-text italic-text">
                    <Link to="/">🌿 Life Dashboard</Link>
                </h1>
                <nav className="nav-bar">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </nav>
            </header>
            <Outlet />
        </div>
    )
}

export default Layout