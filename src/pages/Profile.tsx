import { useAuthStore } from "@/Context/useAuthStore";
import useDeleteAccount from "@/services/useDeleteAccount";
import {  useNavigate } from "react-router-dom";





export default function Profile() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { deleteAccount, error } = useDeleteAccount();

  if (!user) {
    navigate("/login");
    return null; 
  }

   function askValidateDeleteAccount() {
    const confirmDelete = window.confirm("Es-tu sûr de vouloir supprimer ton compte ?");
    if (confirmDelete) {
      deleteAccount(); 
    }
  }
  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <h1 className="text-2xl mb-5 underline-offset-4 underline text-amber-200">Mon Profil</h1>
      <p className="my-2">Mon Pseudo : {user.name}</p>
      <p className="my-2">Mon email : {user.email}</p>
      <button className="btn bg-red-500 px-3 py-2 rounded-lg text-white hover:bg-red-800 duration-300 cursor-pointer " onClick={askValidateDeleteAccount}>Supprimer le compte</button>
      
      {error && <p style={{ color: "red" }}>{error}</p>}

    </div>
  );
}
