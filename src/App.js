import React, { useState, useEffect } from "react";

const AppActionButton = ({ label, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} style={{ margin: "5px", padding: "5px 15px" }}>
    {label}
  </button>
);

const AppCalculationHistory = ({ history, onRestore }) => (
  <ul style={{ listStyle: "none", padding: 0 }}>
    {history.map((item, index) => (
      <li key={index} style={{ borderBottom: "1px solid #ccc", padding: "5px" }}>
        {index + 1}. {item.a} {item.op} {item.b} = <strong>{item.result}</strong>
        <button onClick={() => onRestore(index)} style={{ marginLeft: "10px" }}>Przywróć</button>
      </li>
    ))}
  </ul>
);

const AppHeader = ({ setSize }) => (
  <div style={{ borderBottom: "2px solid black", paddingBottom: "10px", marginBottom: "10px" }}>
    <h3>Autor: Przemysław Matera</h3>
    <div>
      <button onClick={() => setSize(12)} style={{ fontSize: "12px", margin: "2px", padding: "5px" }}>A</button>
      <button onClick={() => setSize(16)} style={{ fontSize: "16px", margin: "2px", padding: "5px" }}>A</button>
      <button onClick={() => setSize(24)} style={{ fontSize: "24px", margin: "2px", padding: "5px" }}>A</button>
    </div>
  </div>
);

const AppCalculator = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [res, setRes] = useState("");
  const [msg, setMsg] = useState("");
  const [hist, setHist] = useState([]);

  useEffect(() => {
    if (a === "" || b === "") return setMsg("");
    const nA = Number(a), nB = Number(b);
    setMsg(nA === nB ? "A równe B" : nA > nB ? "A większe od B" : "A mniejsze od B");
  }, [a, b]);

  const calc = (op) => {
    const nA = Number(a), nB = Number(b);
    if (op === "/" && nB === 0) return alert("Dzielenie przez 0!"); 

    let result = op === "+" ? nA + nB : op === "-" ? nA - nB : op === "*" ? nA * nB : nA / nB;
    setRes(result);
    setHist([...hist, { a, b, op, result }]); 
  };

  const restore = (i) => {
    setA(hist[i].a); setB(hist[i].b); setRes(hist[i].result);
    setHist(hist.slice(0, i + 1));
  };

  const isEmpty = a === "" || b === "";

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        A: <input type="number" value={a} onChange={(e) => setA(e.target.value)} />
        B: <input type="number" value={b} onChange={(e) => setB(e.target.value)} />
      </div>

      <div>
        {["+", "-", "*", "/"].map((op) => (
          <AppActionButton key={op} label={op} onClick={() => calc(op)} disabled={isEmpty} />
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        Wynik: <input readOnly value={res} /> <br />
        Info: <input readOnly value={msg} style={{ width: "300px" }} />
      </div>

      <AppCalculationHistory history={hist} onRestore={restore} />
    </div>
  );
};

export default function App() {
  const [size, setSize] = useState(16);
  return (
    <div style={{ fontSize: size, padding: "20px", fontFamily: "Arial" }}>
      <AppHeader setSize={setSize} />
      <AppCalculator />
    </div>
  );
}