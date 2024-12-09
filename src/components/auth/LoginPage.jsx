import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { Toaster, toast } from "sonner";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || "/home";

  const showError = (message) => {
    toast.error(message, {
      className: "bg-red-500 text-white p-4",
    });
  };

  const showSuccess = (message) => {
    toast.success(message, {
      className: "bg-green-500 text-white p-4",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showError("Completa todo los datos");
      return;
    }
    setIsLoading(true);
    try {
      const response = await ApiService.loginUser({ email, password });
      if (response.statusCode === 200) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        navigate(from, { replace: true });
      }
      showSuccess("Sesión iniciada exitosamente");
    } catch {
      showError("Error al iniciar sesión. Inténtelo nuevamente.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="w-96 h-[90vh] mx-auto flex flex-col justify-center max-w-7xl">
      <h2 className="text-black text-4xl text-center font-bold">
        Inicar Sesión
      </h2>
      <form className="flex flex-col gap-8 mt-10" onSubmit={handleSubmit}>
        <div className="">
          <label className="text-black block font-medium text-1xl mb-1">
            Correo:
          </label>
          <input
            className="w-[100%] bg-[#F2F2F2] p-2 rounded"
            placeholder="usuario@gmail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="">
          <label className="text-black block font-medium text-1xl mb-1">
            Contraseña:
          </label>
          <input
            className="w-[100%] bg-[#F2F2F2] p-2 rounded"
            placeholder="*********"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className={`w-full px-2 py-2 rounded-md text-white ${isLoading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-500"}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}
        </button>
      </form>

      <p className="text-center mt-8">
        No tienes una cuenta?
        <a className="text-blue-500 ml-2" href="/register">
          Registrate
        </a>
      </p>
      <Toaster visibleToasts={4} />
    </div>
  );
}

export default LoginPage;
