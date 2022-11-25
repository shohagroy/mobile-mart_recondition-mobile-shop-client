import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { AuthContex } from "../../../../GobalAuthProvaider/GobalAuthProvaider";

const ChekoutFrom = ({ booking }) => {
  const { user } = useContext(AuthContex);
  const { price, patientName, email, _id } = booking;
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`http://localhost:5000/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [booking]);

  const handleSubmit = async (event) => {
    setCardError("");
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setLoading(false);
      setCardError(error.message);
    } else {
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email: email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        patientName,
        price,
        email,
        transactionId: paymentIntent.id,
        bookingId: _id,
      };

      fetch(`http://localhost:5000/payments?email=${user.email}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setLoading(false);
            swal({
              title: "Successfull!",
              text: `Transaction Id: ${paymentIntent.id} `,
              icon: "success",
              button: "Ok!",
            });
            navigate("../transactions");
          }
        });
    }
  };

  return (
    <form
      className="my-4 p-10 w-full border-primary bg-white h-[200px]  border-2 rounded-xl"
      onSubmit={handleSubmit}
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className={`btn btn-sm w-full mt-8 bg-red-600 text-white ${
          loading && "loading"
        }`}
        type="submit"
        disabled={!stripe}
      >
        {loading ? "Loading..." : `Pay $${price}`}
      </button>
      <p className="text-center mt-6 text-red-600 font-bold">{cardError}</p>
    </form>
  );
};

export default ChekoutFrom;
