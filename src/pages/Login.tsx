import ButtonForm from "@/components/elements/ButtonForm";
import InputField from "@/components/elements/InputField";
import useLogin from "@/hooks/users/useLogin";
import { useState } from "react";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useLogin();


  
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    login(name, password);
  }

  return (
    <form onSubmit={handleLogin} className="w-full max-w-96 mx-auto p-4">
      <InputField
        label="Pseudo"
        id="name"
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        label="Mot de Passe"
        id="password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <ButtonForm>Se Connecter</ButtonForm>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
