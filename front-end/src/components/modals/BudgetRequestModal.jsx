import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import "../../layout/modal.css";

export function BudgetRequestModal({ isOpen, onClose, position }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://primefocus.onrender.com/api/budget/send-budget",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar");
      }

      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          date: "",
          message: "",
        });
      }, 2500);
    } catch (err) {
      alert("Erro ao enviar solicitação.");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal */}
          <div className="modal-wrapper">
            <motion.div
              className="modal-container"
              // style={{
              //   position: "absolute",
              //   top: position.y,
              //   left: position.x,
              //   transform: "translate(-50%, 0)",
              // }}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="modal-close-button"
                aria-label="Fechar"
              >
                <X className="icon-close" strokeWidth={1.5} />
              </button>

              <div className="modal-content">
                {!isSubmitted ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h2 className="modal-title">Solicitar Orçamento</h2>
                      <p className="modal-subtitle">
                        Preencha os dados abaixo e retornarei em breve com uma
                        proposta personalizada.
                      </p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="modal-form">
                      {/* Name */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="modal-input"
                          placeholder="Seu nome"
                        />
                      </motion.div>

                      {/* Email & Phone */}
                      <div className="modal-grid">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="modal-input"
                            placeholder="seu@email.com"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                        >
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="modal-input"
                            placeholder="(11) 99999-9999"
                          />
                        </motion.div>
                      </div>

                      {/* Event Type & Date */}
                      <div className="modal-grid">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <select
                            id="eventType"
                            name="eventType"
                            required
                            value={formData.eventType}
                            onChange={handleChange}
                            className="modal-input"
                          >
                            <option value="">Selecione...</option>
                            <option value="casamento">Casamento</option>
                            <option value="ensaio">Ensaio Autoral</option>
                            <option value="evento">Evento Corporativo</option>
                            <option value="comercial">
                              Fotografia Comercial
                            </option>
                            <option value="outro">Outro</option>
                          </select>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 }}
                        >
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="modal-input"
                          />
                        </motion.div>
                      </div>

                      {/* Message */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="modal-textarea"
                          placeholder="Conte-me mais sobre o que você imagina..."
                        />
                      </motion.div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        whileHover={{
                          y: -2,
                          boxShadow: "0 12px 40px rgba(97, 66, 56, 0.2)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="modal-submit-button"
                      >
                        <Send className="icon-send" strokeWidth={1.5} />
                        Enviar Solicitação
                      </motion.button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="modal-submitted"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="modal-success-icon"
                    >
                      <motion.div
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                      >
                        <svg
                          className="icon-check"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                    </motion.div>

                    <h3 className="modal-success-title">
                      Solicitação Enviada!
                    </h3>
                    <p className="modal-success-text">
                      Obrigado pelo contato. Retornarei em breve com uma
                      proposta personalizada.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
