const newCommentHandler = async (event) => {
  event.preventDefault();

  const newComment = document.getElementById("newComment").value.trim();

  if (newComment) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({ newComment }),
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

document.getElementById("newCommentBtn").addEventListener("click", newCommentHandler);
