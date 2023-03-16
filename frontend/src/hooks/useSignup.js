import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [message, setMessage] = useState(null);

  const signup = async (
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    phone
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        password_confirm: confirmPassword,
        name: { first: firstName, last: lastName },
        phone,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      setMessage(null);
    }

    if (response.ok) {
      setIsLoading(false);
      setError(null);
      setMessage(json.message);
    }
  };

  return { signup, isLoading, error, message };
};
