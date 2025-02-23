import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    });
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setFormData((prevState) => ({
                ...prevState,
                name: user.name || "",
                email: user.email || "",
                senha: "",
                confirmarSenha: "",
            }));
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put("users", formData);
            setMensagem("Perfil atualizado com sucesso!");
        } catch (error) {
            setMensagem("Erro ao atualizar perfil: " + error.message);
        }
    };

    const handleDelete = async () => {
        if (
            window.confirm(
                "Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita."
            )
        ) {
            try {
                await axios.delete("/api/usuarios");
                setMensagem("Conta deletada com sucesso!");
            } catch (error) {
                setMensagem("Erro ao deletar conta: " + error.message);
            }
        }
    };

    return (
        <div className="profile-form">
            <div className="form">
                <h2 className="title">Editar Perfil</h2>
                {mensagem && <div className="alert">{mensagem}</div>}

                <form onSubmit={handleUpdate}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            name="senha"
                            placeholder="Nova Senha"
                            value={formData.senha}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            name="confirmarSenha"
                            placeholder="Confirmar Nova Senha"
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn btn-sm">
                            Atualizar Informações
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            className="btn btn-sm btn-delete"
                        >
                            Deletar Conta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
