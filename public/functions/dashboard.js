const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.getElementById("newTitle").value.trim();
  const text = document.getElementById("newPost").value.trim();

  if (title && text) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ title, text }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      const myJson = await response.json();
      alert(`${response.statusText}\n${myJson.errors[0].message}`);
    }
  }
};

document.getElementById("newPostBtn").addEventListener("click", newPostHandler);
