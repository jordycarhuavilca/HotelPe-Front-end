import { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function LoginAuthenticationPage() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

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
    if (!code) {
      showError("Por favor, ingrese el código de verificación");
      return;
    }
    setIsLoading(true);
    try {
      const response = await ApiService.authetication({ code });
      if (response.statusCode === 200 || response.success) {
        showSuccess("Código verificado exitosamente");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        showError("Código incorrecto, inténtelo nuevamente");
      }
    } catch {
      showError("Error en la verificación del código. Inténtelo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container w-11/12 min-h-[90vh] mx-auto grid grid-cols-2 max-w-7xl">
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-black text-4xl text-center font-bold">
          Verificación de Código
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Se le envio un código a tu correo al que te registraste <br />
          Tienes {timeLeft} segundos para ingresar el código
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-10 w-full px-28">
          <div className="w-full">
            <label className="text-black block font-medium text-1xl mb-1">
              Código de Verificación:
            </label>
            <input
              className="w-[100%] bg-[#F2F2F2] p-2 rounded"
              placeholder="Ingrese su código"
              type="text"
              name="code"
              value={code}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            className={`w-full px-2 py-2 rounded-md text-white ${
              isLoading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-500"
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Verificando..." : "Verificar"}
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <img className="w-3/4"
          src="https://static.vecteezy.com/system/resources/previews/030/772/986/original/verified-email-on-envelope-3d-icon-png.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default LoginAuthenticationPage;
