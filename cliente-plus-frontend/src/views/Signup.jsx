import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState(null);
    const { setUser } = useStateContext();
    const navigate = useNavigate();

    const handleChange = (ev) => {
        setFormData({
            ...formData,
            [ev.target.name]: ev.target.value,
        });
    };

    const save = (ev) => {
        ev.preventDefault();
        axiosClient
            .post("/signup", formData)
            .then(({ data }) => {
                setUser(data.user);
                toast.success("Conta criada com sucesso!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={save}>
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirmar Senha"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {errors && (
                        <div className="error-messages">
                            {Object.keys(errors).map((key) => (
                                <p key={key} className="error">
                                    {errors[key][0]}
                                </p>
                            ))}
                        </div>
                    )}
                    <Button variant="contained" color="primary" type="submit">
                        Registrar
                    </Button>
                    <p className="message">
                        Já tem uma conta? <Link to="/login">Logar</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
