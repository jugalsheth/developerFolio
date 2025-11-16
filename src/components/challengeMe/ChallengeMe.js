import React, {useState, useContext} from "react";
import "./ChallengeMe.scss";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function ChallengeMe() {
  const {isDark} = useContext(StyleContext);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const challenges = [
    {
      id: 1,
      question:
        "Design a real-time order processing system for an e-commerce platform handling 10K orders/day",
      options: [
        {
          id: "a",
          text: "Batch processing every hour with SQL queries",
          feedback:
            "Batching works for low-volume but won't achieve real-time freshness for 10K orders/day"
        },
        {
          id: "b",
          text: "Kafka + Spark Streaming + Snowflake with medallion architecture",
          feedback:
            "✓ Correct! This is exactly what I built. Kafka ingests events, Spark processes in micro-batches, and Snowflake stores in Bronze/Silver/Gold layers for analytics",
          isCorrect: true
        },
        {
          id: "c",
          text: "Direct writes to data warehouse from application",
          feedback:
            "Direct writes create tight coupling and won't scale with high throughput"
        }
      ]
    },
    {
      id: 2,
      question:
        "You need to support 200+ users querying a Snowflake warehouse. How do you optimize costs?",
      options: [
        {
          id: "a",
          text: "Give everyone access to X-Large warehouse",
          feedback: "Over-provisioning warehouses leads to unnecessary costs"
        },
        {
          id: "b",
          text: "Create aggregated views + clustering keys + query result caching + separate warehouses by workload",
          feedback:
            "✓ Exactly my approach! Pre-aggregate common queries, use clustering for large tables, enable result caching, and separate analytical vs operational workloads",
          isCorrect: true
        },
        {
          id: "c",
          text: "Restrict user access to reduce queries",
          feedback: "Limiting access defeats the purpose of democratizing data"
        }
      ]
    },
    {
      id: 3,
      question:
        "How would you ensure data quality in a multi-source ETL pipeline?",
      options: [
        {
          id: "a",
          text: "Manual spot checks once a week",
          feedback: "Manual checks don't scale and miss issues in real-time"
        },
        {
          id: "b",
          text: "Automated dbt tests + Great Expectations + schema validation + SLA monitoring with alerts",
          feedback:
            "✓ This is the way! Automate schema checks, uniqueness tests, freshness SLAs, and alerting for anomalies. Prevention > detection",
          isCorrect: true
        },
        {
          id: "c",
          text: "Trust the source systems",
          feedback:
            "Source systems change unexpectedly. Always validate at ingestion"
        }
      ]
    }
  ];

  const openModal = challengeId => {
    setActiveModal(challengeId);
    setSelectedAnswer(null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (challengeId, optionId) => {
    setSelectedAnswer({challengeId, optionId});
  };

  const getSelectedOption = challengeId => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!selectedAnswer || selectedAnswer.challengeId !== challengeId) {
      return null;
    }
    return challenge.options.find(o => o.id === selectedAnswer.optionId);
  };

  const activeChallenge = challenges.find(c => c.id === activeModal);

  return (
    <div className="challenge-me-container">
      <Fade bottom duration={1000} distance="20px">
        <h2
          className={isDark ? "dark-mode challenge-title" : "challenge-title"}
        >
          Challenge Me
        </h2>
        <p
          className={
            isDark
              ? "dark-mode challenge-subtitle subTitle"
              : "challenge-subtitle subTitle"
          }
        >
          Test my system design thinking with real-world scenarios
        </p>
      </Fade>

      {/* Compact Preview Cards */}
      <div className="challenge-preview-grid">
        {challenges.map((challenge, index) => (
          <Fade
            key={challenge.id}
            bottom
            duration={1000}
            distance="20px"
            delay={index * 100}
          >
            <div
              className={
                isDark
                  ? "challenge-preview-card dark-mode"
                  : "challenge-preview-card"
              }
              onClick={() => openModal(challenge.id)}
            >
              <div className="preview-number">#{challenge.id}</div>
              <h3
                className={
                  isDark ? "dark-mode preview-question" : "preview-question"
                }
              >
                {challenge.question}
              </h3>
              <button
                className={isDark ? "preview-btn dark-mode" : "preview-btn"}
              >
                Take Challenge →
              </button>
            </div>
          </Fade>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {activeModal && activeChallenge && (
        <div
          className={
            isDark
              ? "challenge-modal-overlay dark-mode"
              : "challenge-modal-overlay"
          }
        >
          <div
            className={isDark ? "challenge-modal dark-mode" : "challenge-modal"}
          >
            <button className="modal-close-btn" onClick={closeModal}>
              ×
            </button>

            <div className="modal-content">
              <div className="modal-header">
                <h3
                  className={
                    isDark ? "dark-mode modal-question" : "modal-question"
                  }
                >
                  Scenario {activeChallenge.id}: {activeChallenge.question}
                </h3>
              </div>

              <div className="options-container">
                {activeChallenge.options.map(option => (
                  <button
                    key={option.id}
                    className={`option-btn ${
                      selectedAnswer?.challengeId === activeChallenge.id &&
                      selectedAnswer?.optionId === option.id
                        ? option.isCorrect
                          ? "correct"
                          : "incorrect"
                        : ""
                    } ${isDark ? "dark-mode" : ""}`}
                    onClick={() =>
                      handleAnswerSelect(activeChallenge.id, option.id)
                    }
                    disabled={
                      selectedAnswer?.challengeId === activeChallenge.id
                    }
                  >
                    <span className="option-label">
                      {option.id.toUpperCase()}
                    </span>
                    <span className="option-text">{option.text}</span>
                  </button>
                ))}
              </div>

              {getSelectedOption(activeChallenge.id) && (
                <div
                  className={`feedback ${
                    getSelectedOption(activeChallenge.id).isCorrect
                      ? "correct"
                      : "incorrect"
                  } ${isDark ? "dark-mode" : ""}`}
                >
                  <p>{getSelectedOption(activeChallenge.id).feedback}</p>
                </div>
              )}

              {selectedAnswer?.challengeId === activeChallenge.id && (
                <div className="modal-actions">
                  <button
                    className={isDark ? "reset-btn dark-mode" : "reset-btn"}
                    onClick={() => setSelectedAnswer(null)}
                  >
                    Try Again
                  </button>
                  <button
                    className={
                      isDark
                        ? "next-challenge-btn dark-mode"
                        : "next-challenge-btn"
                    }
                    onClick={() => {
                      const nextId =
                        (activeChallenge.id % challenges.length) + 1;
                      setActiveModal(nextId);
                      setSelectedAnswer(null);
                    }}
                  >
                    Next Challenge →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
