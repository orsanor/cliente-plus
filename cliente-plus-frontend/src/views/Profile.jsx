import { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

const textFieldStyle = {
    "& .MuiInputLabel-outlined": {
        backgroundColor: "white",
        paddingX: "4px",
    },
};

export default function Profile() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        axiosClient
            .get("/user")
            .then(({ data }) => {
                setFormData((prevState) => ({
                    ...prevState,
                    name: data.name || "",
                    email: data.email || "",
                }));
            })
            .catch((error) => {
                console.error("Erro ao carregar dados do usuário:", error);
            });
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
            if (formData.password || formData.password_confirmation) {
                if (formData.password !== formData.password_confirmation) {
                    toast.error("As senhas não correspondem!");
                    return;
                }
            }

            const dataForm = Object.fromEntries(
                Object.entries(formData).filter(([_, value]) => value !== "")
            );

            delete dataForm.confirmarSenha;

            const response = await axiosClient.put("/user/profile", dataForm);

            if (response.data) {
                toast.success("Perfil atualizado com sucesso!");
            }
        } catch (error) {
            toast.error(
                "Erro ao atualizar perfil: " +
                    (error.response?.data?.message ||
                        error.message ||
                        "Erro desconhecido")
            );
        }
    };

    const handleDelete = async () => {
        if (
            window.confirm(
                "Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita."
            )
        ) {
            try {
                await axiosClient.delete("/user/profile");
                toast.success("Conta deletada com sucesso!");
                window.location.href = "/logout";
            } catch (error) {
                toast.error("Erro ao deletar conta: " + error.message);
            }
        }
    };

    return (
        <div className="profile-form">
            <div className="form">
                <h2 className="title">Editar Perfil</h2>

                <form onSubmit={handleUpdate}>
                    <div className="input-group">
                        <TextField
                            fullWidth
                            label="Nome"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            sx={textFieldStyle}
                        />
                    </div>

                    <div className="input-group">
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            sx={textFieldStyle}
                        />
                    </div>

                    <div className="input-group">
                        <TextField
                            fullWidth
                            label="Nova Senha"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            sx={textFieldStyle}
                        />
                    </div>

                    <div className="input-group">
                        <TextField
                            fullWidth
                            label="Confirmar Nova Senha"
                            name="password_confirmation"
                            type="password"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            sx={textFieldStyle}
                        />
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn btn-sm">
                            Atualizar Informações
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            className="btn btn-delete"
                        >
                            Deletar Conta
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
