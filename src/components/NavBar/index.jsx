import './NavBar.css'; 
export default function Navbar(props) {
    return(
        <nav class="navbar">
            <div className="container-fluid">
                <a class="navbar-brand" href="#">
                    <img className="img mx-3" src="/src/assets/logo.png" alt="logo" />
                    Idea Generator
                </a>
                <div className="navbar-children">
                    {props.children}
                </div>
            </div>
        </nav>
    )
}