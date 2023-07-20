import '../Styles/Navbar.css';

function Navbar() {
    return (
        <div className="Navbar-container">
            <div>
                <a href='home'>Home</a>
            </div>
            <div id='Navbar-right-side'>
                <a href='login'>Login</a>
                <a href='order'>Order</a>
                <a href='about'>About</a>
            </div>

        </div>
    )
}

export default Navbar;