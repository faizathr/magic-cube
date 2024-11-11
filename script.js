const toggleButton = document.getElementById("toggle-button");

toggleButton.addEventListener("click", () => {
  if (toggleButton.classList.contains("start")) {
    toggleButton.classList.remove("start");
    toggleButton.classList.add("stop");
    toggleButton.textContent = "Stop";
  } else {
    toggleButton.classList.remove("stop");
    toggleButton.classList.add("start");
    toggleButton.textContent = "Start";
  }
});
