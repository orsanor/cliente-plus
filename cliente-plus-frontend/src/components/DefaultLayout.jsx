import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { toast } from "react-toastify";

export default function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    useEffect(() => {
        axiosClient
            .get("/user")
            .then(({ data }) => {
                console.log(data);
                setUser(data);
            })
            .catch((err) => {
                console.error("Erro ao carregar dados do usuário:", err);
                setUser(null);
                setToken(null);
            });
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            toast.warning("Usuário deslogado", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setUser({});
            setToken(null);
        });
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
                        <button
                            href="#"
                            onClick={logout}
                            className="btn btn-logout"
                        >
                            Sair
                        </button>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
