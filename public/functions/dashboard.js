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
      alert(`${response.statusText}\n${JSON.stringify(myJson.message)}`);
    }
  }
};

document.getElementById("newPostBtn").addEventListener("click", newPostHandler);

const deletePostHandler = async (event) => {
  const id = event.target.attributes[1].value;

  if (id) {
    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      const myJson = await response.json();
      alert(`${response.statusText}\n${myJson.message}`);
    }
  }
};

const buttons = document.querySelectorAll("#deleteBtn");

for (const button of buttons) {
  button.addEventListener("click", deletePostHandler);
}
