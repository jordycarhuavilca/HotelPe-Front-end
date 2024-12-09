import { useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, email, password, phoneNumber } = formData;
    if (!name || !email || !password || !phoneNumber) {
      return false;
    }
    return true;
  };

  const showError = (message) => {
    toast.error(message, {
      className: "bg-red-500 text-white p-4",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showError("Porfavor rellene todos los campos");
      return;
    }
    setIsLoading(true);
    try {
      // Llamada a la API para registrar el usuario
      const response = await ApiService.registerUser(formData);

      // Check if the response is successful
      if (response.statusCode === 200) {
        // Eliminar los datos del formulario
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneNumber: "",
        });
        setTimeout(() => {
          navigate("/login-authentication");
        }, 3000);
      }
    } catch {
      showError("El correo ya esta en uso");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="auth-container w-96 h-[90vh] mx-auto flex flex-col justify-center max-w-7xl">
      <h2 className="text-black text-4xl text-center font-bold">Registrate</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-10">
        <div>
          <label className="text-black block font-medium text-1xl mb-1">
            Nombre:
          </label>
          <input
            className="w-[100%] bg-[#F2F2F2] p-2 rounded"
            placeholder="Nombre"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="text-black block font-medium text-1xl mb-1">
            Correo:
          </label>
          <input
            className="w-[100%] bg-[#F2F2F2] p-2 rounded"
            placeholder="usuario@gmail.com"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="text-black block font-medium text-1xl mb-1">
            Numero Celular:
          </label>
          <input
            className="w-[100%] bg-[#F2F2F2] p-2 rounded"
            placeholder="999999999"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="text-black block font-medium text-1xl mb-1">
            Contraseña:
          </label>
          <input
            className="w-[100%] bg-[#F2F2F2] p-2 rounded"
            placeholder="*********"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className={`w-full px-2 py-2 rounded-md text-white ${isLoading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-500"}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Regístrate"}
        </button>
      </form>
      <p className="text-center mt-5">
        Ya tienes una cuenta?{" "}
        <a className="text-blue-500 hover:text-blue-600" href="/login">
          Inicia Sesión
        </a>
      </p>
    </div>
  );
}

export default RegisterPage;
