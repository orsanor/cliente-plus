import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { toast } from "react-toastify";

export default function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

    const handleChange = (ev) => {
        setUserData({
            ...userData,
            [ev.target.name]: ev.target.value,
        });
    };

    const save = (ev) => {
        ev.preventDefault();
        axiosClient
            .post("/login", userData)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                toast.success("Login realizado com sucesso!", {
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
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    {errors && (
                        <div className="error-messages">
                            {Object.keys(errors).map((key) => (
                                <p key={key} className="error">
                                    {errors[key][0]}
                                </p>
                            ))}
                        </div>
                    )}
                    <button className="btn">Logar</button>
                    <p className="message">
                        Não tem uma conta?{" "}
                        <Link to="/signup">Crie uma conta</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
