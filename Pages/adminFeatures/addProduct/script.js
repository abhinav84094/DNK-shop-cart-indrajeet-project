const form = document.getElementById("product-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch("http://localhost:3002/addProduct", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Server responded with status ${response.status}`);
    }

    const result = await response.json();
    console.log("Server response:", result);
    alert("Product submitted successfully!");
    window.location.href = "/DNK-shop-cart-indrajeet-project/Pages/everything/index.html";
    // window.location.href = "../../home.html";

  } catch (err) {
    console.error("Error submitting product:", err);
    alert("Something went wrong: " + err.message);
  }
});
