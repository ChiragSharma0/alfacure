import React from "react";
import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  // Placeholder WhatsApp number + message
  const phoneNumber = "7600034020"; // Placeholder number
  const message = encodeURIComponent("Hello! I'm interested in Alfacure medical services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      aria-label="Contact us on WhatsApp"
    >
      <div className="whatsapp-ripple"></div>
      <svg
        viewBox="0 0 24 24"
        className="whatsapp-svg"
        fill="currentColor"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.453L0 24zm6.59-4.846c1.6.95 3.573 1.453 5.4 1.454 5.24 0 9.502-4.268 9.505-9.51.002-2.546-.988-4.941-2.79-6.745a9.43 9.43 0 0 0-6.713-2.793c-5.244 0-9.51 4.268-9.513 9.513-.001 2.01.524 3.971 1.52 5.71L2.73 21.23l4.917-1.291zm10.29-6.52c-.27-.135-1.605-.792-1.853-.882-.249-.09-.43-.135-.61.135-.18.27-.696.882-.853 1.062-.158.18-.315.2-.585.065-.27-.135-1.14-.42-2.17-1.34-1.03-.92-1.72-2.05-1.92-2.39-.2-.34-.02-.52.15-.655.15-.125.3-.34.45-.51.15-.17.2-.29.3-.48.1-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.6-.47l-.51-.01c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.27s.97 2.63 1.11 2.82c.14.19 1.9 2.9 4.6 4.07.64.28 1.14.45 1.53.57.64.2 1.23.18 1.69.11.51-.07 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.1-.26-.18-.53-.315z" />
      </svg>
    </a>
  );
}
