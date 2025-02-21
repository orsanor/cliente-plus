import { Link } from "react-router-dom";

export default function Login() {
    const save = (ev) => {
        ev.preventDefailt();
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={save}>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Senha" />
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
