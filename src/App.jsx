import React, { useState, useCallback } from 'react';

// const NUMBERS = [9, 10, 11, 12];

// function generateProblem() {
//   const a = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
//   const b = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
//   return { a, b, answer: a * b };
// }

// const PROBLEMS = [
//   { a: 11, b: 11, answer: 121 },
//   { a: 11, b: 12, answer: 132 },
//   { a: 12, b: 11, answer: 132 },
//   { a: 12, b: 12, answer: 144 },
//   { a: 9,  b: 12, answer: 108 },
//   { a: 12,  b: 9, answer: 108 },
// ];

// function generateProblem() {
//   return PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)];
// }

const PROBLEMS = [
  { a: 11, b: 11, answer: 121 },
  { a: 11, b: 12, answer: 132 },
  { a: 12, b: 11, answer: 132 },
  { a: 12, b: 12, answer: 144 },
  { a: 9,  b: 12, answer: 108 },
];

let lastProblem = null;

function generateProblem() {
  let newProblem;
  do {
    newProblem = PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)];
  } while (
    lastProblem && 
    newProblem.a === lastProblem.a && 
    newProblem.b === lastProblem.b
  );
  lastProblem = newProblem;
  return newProblem;
}

export default function MultiplicationApp() {
  const [problem, setProblem] = useState(() => generateProblem());
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect' | null

  const handleKey = useCallback((key) => {
    if (feedback) return; // lock input while feedback is showing

    if (key === 'Clear') {
      setInput('');
      return;
    }

    if (key === 'Enter') {
      if (input === '') return;
      const userAnswer = parseInt(input, 10);
      const isCorrect = userAnswer === problem.answer;
      setFeedback(isCorrect ? 'correct' : 'incorrect');

      // Briefly show the mark, then advance to the next problem
      setTimeout(() => {
        setProblem(generateProblem());
        setInput('');
        setFeedback(null);
      }, 800);
      return;
    }

    // Digit pressed — cap length so the answer doesn't overflow the display
    if (input.length < 4) {
      setInput(input + key);
    }
  }, [feedback, input, problem.answer]);

  const displayAnswer = input || '?';

  const keys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'Clear', '0', 'Enter',
  ];

  return (
    <div style={styles.outer}>
      <div style={styles.phone}>
        {/* Problem display */}
        <div style={styles.display}>
          <div style={styles.problem}>
            <div style={styles.row}>{problem.a}</div>
            <div style={styles.row}>× {problem.b}</div>
            <div style={styles.divider} />
            <div style={styles.row}>
              {feedback === 'correct' && <span style={styles.check}>✓</span>}
              {feedback === 'incorrect' && <span style={styles.cross}>✗</span>}
              {!feedback && <span>{displayAnswer}</span>}
            </div>
          </div>
        </div>

        {/* Keypad */}
        <div style={styles.keypad}>
          {keys.map((key) => {
            let style = styles.key;
            if (key === 'Enter') style = { ...style, ...styles.enterKey };
            if (key === 'Clear') style = { ...style, ...styles.clearKey };
            return (
              <button
                key={key}
                style={style}
                onClick={() => handleKey(key)}
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  outer: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f5e9', // light pale green
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: 'border-box',
  },
  phone: {
    width: '100%',
    maxWidth: '390px',        // iPhone 13/14 width
    height: '844px',          // iPhone 13/14 height
    maxHeight: '95vh',
    backgroundColor: '#e8f5e9',
    borderRadius: '40px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    padding: '60px 24px 24px',
    boxSizing: 'border-box',
  },
  display: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  problem: {
    fontSize: '64px',
    fontWeight: '300',
    color: '#000',
    textAlign: 'right',
    fontFamily: '"SF Mono", Menlo, Consolas, monospace',
    lineHeight: '1.25',
    minWidth: '220px',
  },
  row: {
    padding: '4px 0',
    whiteSpace: 'nowrap',
  },
  divider: {
    height: '3px',
    backgroundColor: '#000',
    margin: '10px 0',
  },
  keypad: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
  },
  key: {
    height: '72px',
    fontSize: '30px',
    fontWeight: '400',
    backgroundColor: '#ffffff',
    color: '#000000',
    border: 'none',
    borderRadius: '36px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    WebkitTapHighlightColor: 'transparent',
  },
  enterKey: {
    backgroundColor: '#ffb74d', // light orange
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: '600',
  },
  clearKey: {
    backgroundColor: '#555555', // dark grey
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: '600',
  },
  check: {
    color: '#4caf50',
    fontSize: '72px',
    fontWeight: '700',
  },
  cross: {
    color: '#f44336',
    fontSize: '72px',
    fontWeight: '700',
  },
};

