import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const { user, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const logout = (ev) => {
        ev.preventDefault();
    };

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/list">List</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a href="#" onClick={logout} className="btn-logout">
                            Sair
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
