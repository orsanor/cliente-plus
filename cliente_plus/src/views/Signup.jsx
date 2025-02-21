import { Link } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

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
                console.log("Resposta do servidor:", data);
                setUser(data.user);
                setToken(data.token);
            })
            // .catch((err) => {
            //     const response = err.response;
            //     console.error("Erro na requisição:", err);
            //     if (response && response.status === 422) {
            //         setErrors(response.data.errors);
            //     }
            // });
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
                    <button className="btn">Registrar</button>
                    <p className="message">
                        Já tem uma conta? <Link to="/login">Logar</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
