////////////////////////////////////////////////////////////////////////////////////////
// Update post
////////////////////////////////////////////////////////////////////////////////////////
const updatePostHandler = async (event) => {
  event.preventDefault();

  const title = document.getElementById("updatedTitle").value.trim();
  const text = document.getElementById("updatedText").value.trim();

  if (title && text) {
    const response = await fetch(`/api/post/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({ title, text, post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      const myJson = await response.json();
      alert(`${response.statusText}`);
    }
  }
};

document.getElementById("updatePostBtn").addEventListener("click", updatePostHandler);
