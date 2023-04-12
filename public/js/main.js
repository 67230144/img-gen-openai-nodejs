const form = document.getElementById("generate");
const picture = document.getElementById("picture");
const inputBox = document.getElementById("prompt");
const messageBox = document.querySelector(".msg");
const spinner = document.querySelector(".spinner");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  messageBox.textContent = "";
  picture.src = "";

  const prompt = inputBox.value;
  if (!prompt) {
    messageBox.textContent = "Please type something 😉";
    return;
  }

  sendRequest(prompt);
});

const sendRequest = async function (prompt) {
  try {
    spinner.classList.add("show");

    const response = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) throw new Error("Could not be generated 😟");

    const data = await response.json();
    const { url } = data;

    picture.src = url;

    spinner.classList.remove("show");
  } catch (error) {
    messageBox.textContent = error;
    spinner.classList.remove("show");
  }
};
