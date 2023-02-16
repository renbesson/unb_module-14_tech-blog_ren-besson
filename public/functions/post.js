////////////////////////////////////////////////////////////////////////////////////////
// Add new comment
////////////////////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////
// Update comment
////////////////////////////////////////////////////////////////////////////////////////
const changeCommentHandler = async (event) => {
  event.preventDefault();

  const text = document.getElementById("editedComment").value.trim();

  if (text) {
    const response = await fetch(`/api/comment/${id}`, {
      method: "PUT",
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

document.getElementById("newCommentBtn").addEventListener("click", changeCommentHandler);

////////////////////////////////////////////////////////////////////////////////////////
// Delete comment
////////////////////////////////////////////////////////////////////////////////////////
const deleteCommentHandler = async (event) => {
  const id = event.target.attributes[1].value;
  console.log(id);

  if (id) {
    const response = await fetch(`/api/comment/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      const myJson = await response.json();
      alert(`${response.statusText}\n${myJson.message}`);
    }
  }
};

const buttons = document.querySelectorAll("#deleteBtn");

for (const button of buttons) {
  button.addEventListener("click", deleteCommentHandler);
}
