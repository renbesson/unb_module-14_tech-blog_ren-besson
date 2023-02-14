const isLogged = async (event) => {
  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      const resJson = await response.json();
      alert(`${response.statusText} ${resJson.errors[0].message}`);
    }
  }
};

isLogged();
