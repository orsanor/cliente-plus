import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Box,
} from "@mui/material";

export default function Forms() {
    const [searchParams] = useSearchParams();
    const [formType, setFormType] = useState(
        searchParams.get("type") || "user"
    );
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone_number: "",
        cep: "",
        address: "",
    });

    const fetchAddressByCep = async (cep) => {
        if (cep.length === 8) {
            try {
                const response = await fetch(
                    `https://viacep.com.br/ws/${cep}/json/`
                );
                const data = await response.json();

                if (!data.erro) {
                    setFormData((prev) => ({
                        ...prev,
                        address: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`,
                    }));
                } else {
                    toast.error("CEP não encontrado");
                }
            } catch (error) {
                toast.error("Erro ao buscar CEP");
            }
        }
    };

    useEffect(() => {
        const type = searchParams.get("type");
        if (type) {
            setFormType(type);
        }
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "cep") {
            // Remove caracteres não numéricos
            const numericValue = value.replace(/\D/g, "");
            setFormData((prev) => ({
                ...prev,
                [name]: numericValue,
            }));

            if (numericValue.length === 8) {
                fetchAddressByCep(numericValue);
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = formType === "user" ? "/users" : "/clients";

        const loadingToast = toast.loading("Cadastrando...");

        try {
            await axiosClient.post(endpoint, formData);
            toast.update(loadingToast, {
                render: `${
                    formType === "user" ? "Usuário" : "Cliente"
                } cadastrado com sucesso!`,
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
        } catch (error) {
            toast.update(loadingToast, {
                render:
                    error.response?.status === 422
                        ? "Verifique os dados informados"
                        : "Erro ao cadastrar!",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });

            if (error.response && error.response.status === 422) {
                const errors = error.response.data.errors;
                Object.keys(errors).forEach((key) => {
                    toast.error(errors[key][0]);
                });
            }
        }
    };

    return (
        <div className="card animated fadeInDown">
            <ToastContainer position="top-right" />
            <Box sx={{ maxWidth: 500, margin: "0 auto", padding: 2 }}>
                <h2 style={{ marginBottom: "20px" }}>
                    {formType === "user"
                        ? "Cadastro de Usuário"
                        : "Cadastro de Cliente"}
                </h2>

                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel>Tipo de Cadastro</InputLabel>
                    <Select
                        value={formType}
                        onChange={(e) => setFormType(e.target.value)}
                        label="Tipo de Cadastro"
                    >
                        <MenuItem value="user">Usuário</MenuItem>
                        <MenuItem value="client">Cliente</MenuItem>
                    </Select>
                </FormControl>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Nome"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />

                    {formType === "user" ? (
                        <>
                            <TextField
                                fullWidth
                                label="Senha"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Confirmar Senha"
                                name="password_confirmation"
                                type="password"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                        </>
                    ) : (
                        <>
                            <TextField
                                fullWidth
                                label="Telefone"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="CEP"
                                name="cep"
                                value={formData.cep}
                                onChange={handleChange}
                                margin="normal"
                                required
                                inputProps={{ maxLength: 8 }}
                                placeholder="Digite apenas números"
                            />
                            <TextField
                                fullWidth
                                label="Endereço"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                margin="normal"
                                required
                                disabled={formData.cep.length === 8}
                            />
                        </>
                    )}

                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            Cadastrar
                        </Button>
                    </Box>
                </form>
            </Box>
        </div>
    );
}
