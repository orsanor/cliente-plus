import { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function List() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                // Verifica se data.data existe (paginação do Laravel)
                const userData = Array.isArray(data.data) ? data.data : data;
                setUsers(userData || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erro ao carregar usuários:", err);
                setUsers([]);
                setLoading(false);
            });
    };

    return (
        <div>
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <h1>Usuários</h1>
                    <Link to="/users/new" className="btn-add">
                        Novo Cliente
                    </Link>
                </div>
                <div className="card animated fadeIndown">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Data de Criação</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        Carregando...
                                    </td>
                                </tr>
                            )}
                            {!loading &&
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.created_at}</td>
                                        <td>
                                            <Link
                                                to={`/users/${user.id}`}
                                                className="btn-edit btn-sm"
                                            >
                                                Editar
                                            </Link>
                                            &nbsp;
                                            <button className="btn btn-delete btn-sm">
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
