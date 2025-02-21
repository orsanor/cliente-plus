import { Link } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        telefone: "",
        cep: "",
        endereco: "",
        senha: "",
        confirmarSenha: ""
    });

    const handleChange = (ev) => {
        setFormData({
            ...formData,
            [ev.target.name]: ev.target.value
        });
    };

    const save = (ev) => {
        ev.preventDefault();
        console.log("Dados enviados:", formData);
        // Adicionar lógica de envio
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={save}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            name="nome" 
                            placeholder="Nome" 
                            value={formData.nome} 
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
                            type="tel" 
                            name="telefone" 
                            placeholder="Telefone" 
                            value={formData.telefone} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="text" 
                            name="cep" 
                            placeholder="CEP" 
                            value={formData.cep} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="text" 
                            name="endereco" 
                            placeholder="Endereço" 
                            value={formData.endereco} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            name="senha" 
                            placeholder="Senha" 
                            value={formData.senha} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            name="confirmarSenha" 
                            placeholder="Confirmar Senha" 
                            value={formData.confirmarSenha} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button className="btn">Registrar</button>
                    <p className="message">
                        Já tem uma conta? <Link to="/login">Logar</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
