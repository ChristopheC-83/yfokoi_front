import ButtonForm from "@/components/elements/ButtonForm";
import InputField from "@/components/elements/InputField";
import useRegister from "@/hooks/users/useRegister";
import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { register, error } = useRegister();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const success = await register(name, email, password, passwordConfirmation);

    if (success) {
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    }
  }

  return (
    <form onSubmit={handleRegister} className="w-full max-w-96 mx-auto p-4">
      <InputField
        label="Pseudo"
        id="name"
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        label="Email"
        id="email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="Mot de Passe"
        id="password"
        value={password}
        type="password"
  autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        label="Confirmation du Mot de Passe"
        id="passwordConfirmation"
        value={passwordConfirmation}
        type="password"
  autoComplete="new-password"
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />

      <ButtonForm>Créer mon compte</ButtonForm>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
