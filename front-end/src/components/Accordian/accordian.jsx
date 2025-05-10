import { useState } from "react";
import data from "./data";
import { useTheme } from "../../context/ThemeContext";

export default function Accordian() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selected, setSelected] = useState(null);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  return (
    <div className="d-flex justify-content-center my-4">
      <div
        className={`accordion ${isDark ? "bg-dark text-light" : ""}`}
        id="faqAccordion"
        style={{ width: "800px", border: "none" }}
      >
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div
              className="accordion-item"
              key={dataItem.id}
              style={{
                border: "none",
                boxShadow: "none",
              }}
            >
              <h2 className="accordion-header" id={`faq-title-${dataItem.id}`}>
                <button
                  className={`accordion-button d-flex align-items-center position-relative ${isDark ? "bg-secondary text-light" : ""} ${
                    selected === dataItem.id ? "" : "collapsed"
                  }`}
                  type="button"
                  onClick={() => handleSingleSelection(dataItem.id)}
                  aria-expanded={selected === dataItem.id}
                  aria-controls={`faq-content-${dataItem.id}`}
                  style={{
                    outline: "none",
                    border: selected === dataItem.id ? "2px solid #21996a" : "none",
                    boxShadow: "none",
                    paddingRight: "48px",
                  }}
                >
                  <span>{dataItem.question}</span>
                  {/* Override Bootstrap's default caret with a green one */}
                  <span
                    style={{
                      position: "absolute",
                      right: "24px",
                      pointerEvents: "none",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        transform: selected === dataItem.id ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    >
                      <path
                        d="M1.5 6l6 6 6-6"
                        stroke="#21996a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                </button>
              </h2>
              <div
                id={`faq-content-${dataItem.id}`}
                className={`accordion-collapse collapse${selected === dataItem.id ? " show" : ""}`}
                aria-labelledby={`faq-title-${dataItem.id}`}
                data-bs-parent="#faqAccordion"
              >
                <div className={`accordion-body ${isDark ? "bg-dark text-light" : ""}`}>
                  {dataItem.answer}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
}