
document.addEventListener("DOMContentLoaded", () => {
  const valueDisplay = document.querySelector(".value");
  const formulaDisplay = document.querySelector(".formula");
  const buttons = document.querySelectorAll(".buttons button");
  const backBtn = document.querySelector(".top-controls button:last-child");
  const resetBtn = document.querySelector(".top-controls button:first-child");

  let currentInput = "";
  let formula = "";

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.innerText;

      if (text === "C") {
        currentInput = "";
        formula = "";
        updateDisplay();
        return;
      }

      if (text === "=") {
        try {
          const result = eval(
            formula.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-")
          );
          currentInput = result.toString();
          formula = currentInput;
        } catch {
          currentInput = "Error";
          formula = "";
        }
        updateDisplay();
        return;
      }

      if (text === "±") {
        if (!currentInput) return;
        currentInput = (parseFloat(currentInput) * -1).toString();
        formula = currentInput;
        updateDisplay();
        return;
      }

      currentInput += text;
      formula += text;
      updateDisplay();
    });
  });

  backBtn.addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    formula = formula.slice(0, -1);
    updateDisplay();
  });

  resetBtn.addEventListener("click", () => {
    currentInput = "";
    formula = "";
    updateDisplay();
  });

  function updateDisplay() {
    valueDisplay.innerText = currentInput || "0";
    formulaDisplay.innerText = formula;
  }

});

