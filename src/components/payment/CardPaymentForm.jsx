import { useEffect, useRef, useState } from "react";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import "../../assets/carPayment.css";
import RoomView from "./RoomView.jsx"
import axios from "axios";
import ApiService from "../../service/ApiService.jsx";

async function loadPayMarket() {
  const publicKey = "TEST-8914ea61-79f9-404a-ab01-4cceed1d27c0";
  await loadMercadoPago();
  return new window.MercadoPago(publicKey);
}
function removeFieldErrorMessages(input, validationErrorMessages) {
  /*Array.from(validationErrorMessages.children).forEach(child => {
        const shouldRemoveChild = child.id.includes(input.id);
        if (shouldRemoveChild) {
            validationErrorMessages.removeChild(child);
        }
    });*/
}

function addFieldErrorMessages(input, validationErrorMessages, error) {
  /*if (error) {
        input.classList.add('validation-error');
        error.forEach((e, index) => {
            const p = document.createElement('p');
            p.id = `${input.id}-${index}`;
            p.innerText = e.message;
            validationErrorMessages.appendChild(p);
        });
    } else {
        input.classList.remove('validation-error');
    }*/
}

function enableOrDisablePayButton(validationErrorMessages, payButton) {
  /*if (validationErrorMessages.children.length > 0) {
        payButton.setAttribute('disabled', true);
    } else {
        payButton.removeAttribute('disabled');
    }*/
}

function CardPaymentForm() {
  const formRef = useRef(null);
  const validationErrorMessagesRef = useRef(null);
  const [payButtonDisabled, setPayButtonDisabled] = useState(true);
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null,
    style: [],
  });
  const payButton = document.getElementById("form-checkout__submit");
  const validationErrorMessages = document.getElementById(
    "validation-error-messages"
  );
  const reservation = {
    checkInDate: "2024-12-07",
    checkOutDate: "2024-12-10", 
    numOfAdults: 2,
    numOfChildren: 1,
    totalNumOfGuest: 3,
    user: {
      id: 13,
    },
    room: {
      id: 19,
    },
  };

  useEffect(() => {
    const load = async () => {
      const mercadopago = await loadPayMarket();
      const formConfig = {
        id: "form-checkout",
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Holder name",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "E-mail",
        },
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Card number",
          style: { fontSize: "1rem" },
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/YYYY",
          style: { fontSize: "1rem" },
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Security code",
          style: { fontSize: "1rem" },
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Installments",
        },
        identificationType: { id: "form-checkout__identificationType" },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Identification number",
        },
        issuer: { id: "form-checkout__issuer", placeholder: "Issuer" },
      };
      const cardForm = mercadopago.cardForm({
        amount: document.getElementById("amount")?.value || "10", // Or pass dynamic data
        iframe: true,
        form: formConfig,
        callbacks: {
          onFormMounted: (error) => {
            if (error) console.warn("Form Mounted handling error: ", error);
            else console.log("Form mounted");
          },
          onSubmit: async (event) => {
            event.preventDefault();
            console.log("entring");
            setFormStatus({
              loading: true,
              success: false,
              error: null,
              style: ["block"],
            });
            console.log("getCardFormData ", cardForm.getCardFormData());

            const {
              paymentMethodId,
              issuerId,
              cardholderEmail: email,
              amount,
              token,
              installments,
              identificationNumber,
              identificationType,
            } = cardForm.getCardFormData();

            const buildedBody = {
              token,
              issuerId,
              paymentMethodId,
              transactionAmount: Number(amount),
              installments: Number(installments),
              description: "PAYMENT",
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
              additionalInfo: { item: reservation },
            };
            console.log("buildedBody ", buildedBody);

            try {
              // const response = await ApiService.processPayment(buildedBody);
              // console.log("response ", response);
              fetch("http://localhost:4040/bookings/makeReservation", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqY2FyaHVhdmlsY2FAZHRyYW5zZm9ybWEuY29tIiwiaWF0IjoxNzMzNTEyNDk1LCJleHAiOjE3MzM1MjI1NzV9.iz_s2r-lBgOrnPXexAcUi9s1L1cnKyhSV14RC0ebUZc",
                },
                body: JSON.stringify(buildedBody),
              })
                .then((response) => response.json())
                .then((response) => {
                  console.log("response ", response);
                  if (!response.hasOwnProperty("error_message")) {
                    setFormStatus({
                      loading: false,
                      success: true,
                      error: null,
                    });
                  } else {
                    setFormStatus({
                      loading: false,
                      success: false,
                      error: response.error_message,
                    });
                  }
                });
            } catch (error) {
              alert("Unexpected error\n" + JSON.stringify(error));

              console.warn("error fetching", error);
              setFormStatus({
                loading: false,
                success: false,
                error: "Unexpected error occurred.",
              });
            }
          },
          onFetching: (resource) => {
            console.log("Fetching resource: ", resource);
            setPayButtonDisabled(true);
            return () => setPayButtonDisabled(false);
          },
          onCardTokenReceived: (errorData, token) => {
            console.log("onCardTokenReceived ", token);
            console.log("onCardTokenReceived errorData ", errorData);

            /*if (errorData && errorData.error.fieldErrors.length !== 0) {
                            errorData.error.fieldErrors.forEach(errorMessage => {
                                alert(errorMessage);
                            });
                        }*/

            return token;
          },
          onValidityChange: (error, field) => {
            console.log("field ", field);
            const input = document.getElementById(formConfig[field]?.id);
            removeFieldErrorMessages(input, validationErrorMessages);
            addFieldErrorMessages(input, validationErrorMessages, error);
            enableOrDisablePayButton(validationErrorMessages, payButton);
          },
        },
      });
      console.log("after ", cardForm.getCardFormData());
    };
    load();

    return () => {
      // Cleanup logic if necessary
    };
  }, []);

  return (
    <div>
     <div class="flex flex-col lg:flex-row gap-8 bg-gray-50 p-6 rounded-lg shadow-md max-w-5xl mx-auto">
  
     <RoomView />

    <form id="form-checkout" class="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Buyer Details</h3>
      
      <div class="mb-4">
        <label for="form-checkout__cardholderEmail" class="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="form-checkout__cardholderEmail"
          name="cardholderEmail"
          type="email"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter your email"
          required
        />
      </div>
  
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label for="form-checkout__identificationType" class="block text-sm font-medium text-gray-700">
            ID Type
          </label>
          <select
            id="form-checkout__identificationType"
            name="identificationType"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          ></select>
        </div>
        <div>
          <label for="form-checkout__identificationNumber" class="block text-sm font-medium text-gray-700">
            ID Number
          </label>
          <input
            id="form-checkout__identificationNumber"
            name="docNumber"
            type="text"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your ID number"
            required
          />
        </div>
      </div>
  
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Card Details</h3>
  
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="col-span-2">
          <label for="form-checkout__cardholderName" class="block text-sm font-medium text-gray-700">
            Cardholder Name
          </label>
          <input
            id="form-checkout__cardholderName"
            name="cardholderName"
            type="text"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Name as on card"
            required
          />
        </div>
        <div>
          <label for="form-checkout__expirationDate" class="block text-sm font-medium text-gray-700">
            Expiration Date
          </label>
          <div
            id="form-checkout__expirationDate"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm h-[42px]"
          ></div>
        </div>
        <div>
          <label for="form-checkout__securityCode" class="block text-sm font-medium text-gray-700">
            Security Code
          </label>
          <div
            id="form-checkout__securityCode"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm h-[42px]"
          ></div>
        </div>
        <div class="col-span-2">
          <label for="form-checkout__cardNumber" class="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <div
            id="form-checkout__cardNumber"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm sm:text-sm h-[42px]"
          ></div>
        </div>
      </div>
  
      <div id="issuerInput" class="hidden mb-4">
        <label for="form-checkout__issuer" class="block text-sm font-medium text-gray-700">
          Issuer
        </label>
        <select
          id="form-checkout__issuer"
          name="issuer"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        ></select>
      </div>
      <div class="mb-4">
        <label for="form-checkout__installments" class="block text-sm font-medium text-gray-700">
          Installments
        </label>
        <select
          id="form-checkout__installments"
          name="installments"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        ></select>
      </div>
  
      <div id="validation-error-messages" class="text-red-500 text-sm mb-4"></div>
      <button
        type="submit"
        id="form-checkout__submit"
        class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        Pay
      </button>
      <p id="loading-message" class="text-sm text-gray-500 mt-2 hidden">
        Loading, please wait...
      </p>
      <a id="go-back" href="#" class="block mt-4 text-sm text-blue-600 hover:underline">
        Go back to Shopping Cart
      </a>
    </form>

  </div>

      <div ref={validationErrorMessagesRef}></div>
      {formStatus.error && <div className="error">{formStatus.error}</div>}
      {formStatus.success && <div className="success">Payment Successful!</div>}
    </div>
  );
}

export default CardPaymentForm;
