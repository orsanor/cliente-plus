import { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditClientModal({ open, onClose, client, onSave }) {
    const [formData, setFormData] = useState({
        name: client?.name || "",
        email: client?.email || "",
        phone_number: client?.phone_number || "",
        cep: client?.cep || "",
        address: client?.address || "",
    });

    useEffect(() => {
        if (client) {
            setFormData({
                name: client.name || "",
                email: client.email || "",
                phone_number: client.phone_number || "",
                cep: client.cep || "",
                address: client.address || "",
            });
        }
    }, [client]);

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
                    toast.success("Endereço encontrado!");
                } else {
                    toast.error("CEP não encontrado");
                }
            } catch (e) {
                console.error(e + "Erro ao buscar CEP");
                toast.error("Erro ao buscar CEP");
            }
        }
    };

    const handleChange = (name, value) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Salvando alterações...");

        try {
            onSave(formData);
            toast.update(loadingToast, {
                render: "Cliente atualizado com sucesso!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
        } catch (e) {
            toast.update(loadingToast, {
                render: e + "Erro ao atualizar cliente",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <ToastContainer position="top-right" />
                <h2>Editar Usuário</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Nome"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Telefone"
                        value={formData.phone_number}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                phone_number: e.target.value,
                            })
                        }
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="CEP"
                        value={formData.cep}
                        onChange={(e) => handleChange("cep", e.target.value)}
                        margin="normal"
                        inputProps={{ maxLength: 8 }}
                        placeholder="Digite apenas números"
                    />
                    <TextField
                        fullWidth
                        label="Endereço"
                        value={formData.address}
                        onChange={(e) =>
                            handleChange("address", e.target.value)
                        }
                        margin="normal"
                        disabled={formData.cep.length === 8}
                    />
                    <Box
                        sx={{
                            mt: 2,
                            display: "flex",
                            gap: 2,
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button variant="outlined" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button variant="contained" type="submit">
                            Salvar
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}

EditClientModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    client: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        phone_number: PropTypes.string,
        cep: PropTypes.string,
        address: PropTypes.string,
    }),
    onSave: PropTypes.func.isRequired,
};
