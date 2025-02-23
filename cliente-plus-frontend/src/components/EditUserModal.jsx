import { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import PropTypes from "prop-types";

export default function EditUserModal({ open, onClose, user, onSave }) {
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
            });
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
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

EditUserModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
    }),
    onSave: PropTypes.func.isRequired,
};
