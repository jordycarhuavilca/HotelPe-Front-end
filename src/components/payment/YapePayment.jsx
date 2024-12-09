import { useState } from "react";
import { loadMercadoPago } from "@mercadopago/sdk-js";
import ApiService from "../../service/ApiService";

// async function getPayMarket() {
//   await loadMercadoPago();
//   return new window.MercadoPago("TEST-8914ea61-79f9-404a-ab01-4cceed1d27c0");
// }

// async function handleYape(phoneNumber, otp) {
//   const mp = await getPayMarket();

//   const yapeOptions = {
//     otp,
//     phoneNumber,
//   };
//   const yape = mp.yape(yapeOptions);
//   const yapeToken = await yape.create();
//   return yapeToken;
// }

function YapePayment() {
  async function handleYape(e) {
    e.preventDefault();
    await loadMercadoPago();
    const mp = new window.MercadoPago(
      "TEST-8914ea61-79f9-404a-ab01-4cceed1d27c0"
    );
    const otp = document.getElementById("form-checkout__payerOTP").value;
    const phoneNumber = document.getElementById(
      "form-checkout__payerPhone"
    ).value;
    const yapeOptions = {
      otp,
      phoneNumber,
    };
    const yape = mp.yape(yapeOptions);
    const yapeToken = await yape.create();
    console.log("yape ", yapeToken);

    const body = {
      token: yapeToken.id,
      transactionAmount: 2000,
      description: "Video game",
      installments: 1,
      paymentMethodId: "yape",
      payer: {
        email: "test_user_12345@gmail.com",
      },
    };
    const response = await ApiService.processPaymentWithYape(body);
    console.log("yape ", response);
  }
  //   const [clientInfo, setClientInfo] = useState({
  //     payerPhone: "",
  //     payerOTP: "",
  //   });
  //   async function sendPay(e) {
  //     e.preventDefault();
  //     const yapeToken = await handleYape(clientInfo);
  //     console.log("yapeToken ", yapeToken);
  //   }

  // return (
  //     <div>
  //         <form id="form-checkout">
  //             <div>
  //                 <label htmlFor="payerPhone">Phone Number</label>
  //                 <input onInput={
  //                     (e) => setClientInfo({...clientInfo, payerPhone: e.target.value})
  //                 } id="form-checkout__payerPhone" name="payerPhone" type="text"/>
  //             </div>
  //             <div>
  //                 <label htmlFor="payerOTP">OTP</label>
  //                 <input onInput={
  //                     (e) => setClientInfo({...clientInfo, payerOTP: e.target.value})
  //                 } id="form-checkout__payerOTP" name="payerOTP" type="text"/>
  //             </div>
  //             <div>
  //                 <button onClick={sendPay}>Create YAPE</button>
  //             </div>
  //         </form>

  //     </div>
  // )
  return (
    <form id="form-checkout">
      <div>
        <label htmlFor="payerPhone">Phone Number</label>
        <input id="form-checkout__payerPhone" name="payerPhone" type="text" />
      </div>
      <div>
        <label htmlFor="payerOTP">OTP</label>
        <input id="form-checkout__payerOTP" name="payerOTP" type="text" />
      </div>
      <div>
        <button onClick={handleYape}>Create YAPE</button>
      </div>
    </form>
  );
}

export default YapePayment;
