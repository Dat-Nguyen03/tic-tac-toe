import confetti from "canvas-confetti";
import Swal from "sweetalert2";
export const fireConfetti = () => {
  // time to fire the confetti!
  const end = Date.now() + 3 * 1000;

  // go Buckeyes!
  const colors = ["#16a085", "#f39c12", "#8e44ad"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

export const fireAlert = (message, title) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "success",
    timer: 2000,
    // confirmButtonText: "Okay",
  });
};
