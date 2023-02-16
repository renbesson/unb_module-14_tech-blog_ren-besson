const newCommentHandler = async (event) => {
  event.preventDefault();

  const text = document.getElementById("newComment").value.trim();

  if (text) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ text, post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      const myJson = await response.json();
      alert(`${response.statusText}`);
    }
  }
};

document.getElementById("newCommentBtn").addEventListener("click", newCommentHandler);
