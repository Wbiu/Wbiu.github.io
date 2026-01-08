document.getElementById("btn").addEventListener("click", () => {
  alert("It works!");
});

async function initWebGPU() {
  if (!("gpu" in navigator)) {
    console.log("WebGPU not supported");
    return;
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    console.log("No GPU adapter available");
    return;
  }

  const device = await adapter.requestDevice();
  console.log("WebGPU ready:", !!device);
}

initWebGPU();
