import { useEffect, useRef, useState } from "react";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import "../../assets/carPayment.css";
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
      <form id="form-checkout">
        <h3 className="title">Buyer Details</h3>
        <div className="row">
          <div className="form-group col">
            <input
              id="form-checkout__cardholderEmail"
              name="cardholderEmail"
              type="email"
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-5">
            <select
              id="form-checkout__identificationType"
              name="identificationType"
              className="form-control"
            ></select>
          </div>
          <div className="form-group col-sm-7">
            <input
              id="form-checkout__identificationNumber"
              name="docNumber"
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <br />
        <h3 className="title">Card Details</h3>
        <div className="row">
          <div className="form-group col-sm-8">
            <input
              id="form-checkout__cardholderName"
              name="cardholderName"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-sm-4">
            <div className="input-group expiration-date">
              <div
                id="form-checkout__expirationDate"
                className="form-control h-40"
              ></div>
            </div>
          </div>
          <div className="form-group col-sm-8">
            <div
              id="form-checkout__cardNumber"
              className="form-control h-40"
            ></div>
          </div>
          <div className="form-group col-sm-4">
            <div
              id="form-checkout__securityCode"
              className="form-control h-40"
            ></div>
          </div>
          <div id="issuerInput" className="form-group col-sm-12 hidden">
            <select
              id="form-checkout__issuer"
              name="issuer"
              className="form-control"
            ></select>
          </div>
          <div className="form-group col-sm-12">
            <select
              id="form-checkout__installments"
              name="installments"
              type="text"
              className="form-control"
            ></select>
          </div>
          <div className="form-group col-sm-12">
            <input type="hidden" id="amount" value="10" />
            <input type="hidden" id="description" value={"price"} />
            <div id="validation-error-messages"></div>
            <br />
            <button
              type="submit"
              id="form-checkout__submit"
              disabled={payButtonDisabled || formStatus.loading}
            >
              {formStatus.loading ? "Processing..." : "Pay"}
            </button>
            <br />
            <p id="loading-message">Loading, please wait...</p>
            <br />
            <a id="go-back">Go back to Shopping Cart</a>
          </div>
        </div>
      </form>

      <div ref={validationErrorMessagesRef}></div>
      {formStatus.error && <div className="error">{formStatus.error}</div>}
      {formStatus.success && <div className="success">Payment Successful!</div>}
    </div>
  );
}

export default CardPaymentForm;
