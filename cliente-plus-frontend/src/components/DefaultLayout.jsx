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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div className="content">
                <header>
                    <div className="header-left">
                        <Link to="/list" className="logo-link">
                            <h2>Cliente + </h2>
                        </Link>
                        <nav>
                            <Link to="/list">Listagem</Link>
                            <Link to="/users/new">Cadastro</Link>
                        </nav>
                    </div>
                    <div className="user-menu">
                        <span className="user-name">
                            {user.name}
                            <span className="material-icons">expand_more</span>
                        </span>
                        <div className="dropdown-menu">
                            <Link to="/profile">Meu Perfil</Link>
                            <button onClick={logout} className="btn-logout">
                                Sair
                            </button>
                        </div>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
