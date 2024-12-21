import axios from "axios";

export default class ApiService {
  static BASE_URL = "http://localhost:4040";

  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  // AUTHENTICATION 🗝️

  // Register new user 👨‍💻
  static async registerUser(registration) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registration
    );
    return response.data;
  }

  static async authetication(data) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/verifyRegistration`,
      data
    );
    return response.data;
  }

  // Login user 👨‍💻
  static async loginUser(loginDetails) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/login`,
      loginDetails
    );
    return response.data;
  }

  // USERS 👨‍💻

  // Get all users 👨‍💻
  static async getAllUsers() {
    const response = await axios.get(`${this.BASE_URL}/users/all`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getUserProfile() {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-logged-in-profile-info`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  // Get user by id 👨‍💻
  static async getUser(userId) {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-by-id/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /* This is the  to get user bookings by the user id */
  static async getUserBookings(userId) {
    const response = await axios.get(
      `${this.BASE_URL}/users/get-user-bookings/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /* This is to delete a user */
  static async deleteUser(userId) {
    const response = await axios.delete(
      `${this.BASE_URL}/users/delete/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /**ROOM */
  /* This  adds a new room room to the database */
  static async addRoom(formData) {
    const result = await axios.post(`${this.BASE_URL}/rooms/add`, formData, {
      headers: {
        ...this.getHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  }

  /* This  gets all availavle rooms */
  static async getAllAvailableRooms() {
    const result = await axios.get(
      `${this.BASE_URL}/rooms/all-available-rooms`
    );
    return result.data;
  }

  /* This  gets all availavle by dates rooms from the database with a given date and a room type */
  static async getAvailableRoomsByDateAndType(
    checkInDate,
    checkOutDate,
    roomType
  ) {
    const result = await axios.get(
      `${this.BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
    );
    return result.data;
  }

  /* This  gets all room types from thee database */
  static async getRoomTypes() {
    const response = await axios.get(`${this.BASE_URL}/rooms/types`);
    return response.data;
  }
  /* This  gets all rooms from the database */
  static async getAllRooms() {
    const result = await axios.get(`${this.BASE_URL}/rooms/all`);
    return result.data;
  }
  /* This funcction gets a room by the id */
  static async getRoomById(roomId) {
    const result = await axios.get(
      `${this.BASE_URL}/rooms/room-by-id/${roomId}`
    );
    return result.data;
  }

  /* This  deletes a room by the Id */
  static async deleteRoom(roomId) {
    const result = await axios.delete(
      `${this.BASE_URL}/rooms/delete/${roomId}`,
      {
        headers: this.getHeader(),
      }
    );
    return result.data;
  }

  /* This updates a room */
  static async updateRoom(roomId, formData) {
    const result = await axios.put(
      `${this.BASE_URL}/rooms/update/${roomId}`,
      formData,
      {
        headers: {
          ...this.getHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result.data;
  }

  /**BOOKING */
  /* This  saves a new booking to the databse */
  static async bookRoom(roomId, userId, booking) {
    console.log("USER ID IS: " + userId);

    const response = await axios.post(
      `${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`,
      booking,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }
  
  static async generateYapeToken(otp, phoneNumber, requestId) {
    const response = await axios.post(
      `https://api.mercadopago.com/platforms/pci/yape/v1/payment?public_key=TEST-8914ea61-79f9-404a-ab01-4cceed1d27c0`,
      {
        otp,
        phoneNumber,
        requestId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
        },
      }
    );
    return response;
  }

  static async processPaymentWithYape(body) {
    const {
      token,
      transactionAmount,
      description,
      installments,
      paymentMethodId,
      payer,
    } = body;


    console.log();

    const newBody = {
      token,
      transactionAmount,
      description,
      installments,
      paymentMethodId,
      payer,
    };
    console.log("newBody ", newBody);

    const response = await axios.post(
      `${this.BASE_URL}/bookings/makeReservationWithYape`,
      newBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJqY2FyaHVhdmlsY2FAZHRyYW5zZm9ybWEuY29tIiwiaWF0IjoxNzMzNjkxNzI0LCJleHAiOjE3MzM3MDE4MDR9.CztMErfG143E_N_tIbbY4wddVwMse9DEsMC_axZRgDXTMNmFsqmHGi67ip64croqmn_BKR82wcuvw6TG3c9eSKMCg5dMQbaZIQUEJkEXtaDPhg1s2FPERcSph6Z5c7wlZzrWTiog36_R-5IZiEBYEV7Fd2FbUru6g684ubyRNwCqalP77d2s8lut57H69mMDKttZ4_SGX-cGYTXLfAIKer7-mwqGRxrdYyvtd-h7QZRKlTfC3o6kjo7RhoBa4K0Ee3FcH2mdswFE1kMKwRzLMdweGNN5r3kAoD0hKz8U4_oVh1wfckt0-8A38Upp3HsMPct7yoTdOpKhnP-lgupEWw",
        },
      }
    );
    return response;
  }

  static async processPayment(body) {
    console.log("processPayment ", body);
    const response = await axios.post(
      `${this.BASE_URL}/process_payment`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJqY2FyaHVhdmlsY2FAZHRyYW5zZm9ybWEuY29tIiwiaWF0IjoxNzMzNTQyNzU5LCJleHAiOjE3MzM1NTI4Mzl9.2QwREoJHVP0_dTbbkEb-69INS2GG-YmtKQnlhDGME1osA4lA6atbu0hXqADbUwsQDNppnrWbWDCkNjEXldGg041Z5uv7ezYQza21dk8eyp9TJOQaK3rH5nezzS2B8lttD0jYtacBrfgNX8mnI6R5uJoiV0KZPloQkK2xsWM4WIIlS8MDfsS7KgjpBpW5sQ2FuufovKM8FiRU0woHlPIADlIM396r7nmQvmqQ11e8BbHBEJK56agPEnVtjYZmFDAtQRYFupr_5NpHehlMTgxa40CAtQ8T5w1nYshbyXhFESsswY640z4N2ggQuBdvhPzitKm45JHny5iH_FCAWfUuzA",
        },
      }
    );
    return response;
  }

  /* This  gets alll bokings from the database */
  static async getAllBookings() {
    const result = await axios.get(`${this.BASE_URL}/bookings/all`, {
      headers: this.getHeader(),
    });
    return result.data;
  }

  /* This  get booking by the cnfirmation code */
  static async getBookingByConfirmationCode(bookingCode) {
    const result = await axios.get(
      `${this.BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`
    );
    return result.data;
  }

  /* This is the  to cancel user booking */
  static async cancelBooking(bookingId) {
    const result = await axios.delete(
      `${this.BASE_URL}/bookings/cancel/${bookingId}`,
      {
        headers: this.getHeader(),
      }
    );
    return result.data;
  }

  /**AUTHENTICATION CHECKER */
  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }
}
