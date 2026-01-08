document.getElementById("btn").addEventListener("click", () => {
  alert("It works!");
});

if (!("gpu" in navigator)) {
  document.body.innerHTML = "WebGPU not supported here — try Chrome/Edge or enable it in your browser.";
} else {
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter?.requestDevice();
  console.log("WebGPU ready:", !!device);
}
