const canvas = document.getElementById("gradientCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradientOffset = 0; // Animation offset
let speed = 2;

function drawGradient() {
  const width = canvas.width;
  const height = canvas.height;

  // Create gradient
  const gradient = ctx.createLinearGradient(
    0,
    gradientOffset,
    width,
    height + gradientOffset
  );
  
  gradient.addColorStop(0, "#fddde6"); // Light Pink
  gradient.addColorStop(0.5, "#cfe7f7"); // Soft Sky Blue
  gradient.addColorStop(1, "#e0e4f7"); // Light Lavender

  // Fill the canvas with gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function animate() {
  gradientOffset += speed;
  if (gradientOffset >= canvas.height) speed = -2;
  if (gradientOffset <= 0) speed = 2;

  drawGradient();
  requestAnimationFrame(animate);
}

animate();

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
