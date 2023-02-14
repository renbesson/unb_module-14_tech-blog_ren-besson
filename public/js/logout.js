const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    const resJson = await response.json();
    alert(`${response.statusText} ${resJson.errors[0].message}`);
  }
};

document.querySelector("#logout").addEventListener("click", logout);
