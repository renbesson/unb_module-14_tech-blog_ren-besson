const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    if (name && email && password) {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        const myJson = await response.json();
        alert(`${response.statusText}\n${myJson.errors[0].message}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("signupButton").addEventListener("click", signupFormHandler);
