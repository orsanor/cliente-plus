import { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { TextField, Select, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function List() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewType, setViewType] = useState("users");

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewType]);

    const getData = () => {
        setLoading(true);
        const endpoint = viewType === "users" ? "/users" : "/clients";
        axiosClient
            .get(endpoint)
            .then(({ data }) => {
                const responseData = Array.isArray(data.data)
                    ? data.data
                    : data;
                setData(responseData || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erro ao carregar dados:", err);
                setData([]);
                setLoading(false);
            });
    };

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderTable = () => {
        if (viewType === "users") {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Data de Criação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading}
                        {!loading &&
                            filteredData.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString("pt-BR", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>
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
            );
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CEP</th>
                        <th>Endereço</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {loading}
                    {!loading &&
                        filteredData.map((client) => (
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.cep}</td>
                                <td>{client.address}</td>
                                <td>{client.city}</td>
                                <td>{client.state}</td>
                                <td>
                                    <Link
                                        to={`/clients/${client.id}`}
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
        );
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
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <Select
                            value={viewType}
                            onChange={(e) => setViewType(e.target.value)}
                            style={{ minWidth: "110px" }}
                        >
                            <MenuItem value="users">Usuários</MenuItem>
                            <MenuItem value="clients">Clientes</MenuItem>
                        </Select>
                        <TextField
                            placeholder="Pesquisar por nome..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <Link to={`/${viewType}/new`} className="btn-add">
                        Novo {viewType === "users" ? "Usuário" : "Cliente"} +
                    </Link>
                </div>
                <div className="card animated fadeIndown">{renderTable()}</div>
            </div>
        </div>
    );
}
