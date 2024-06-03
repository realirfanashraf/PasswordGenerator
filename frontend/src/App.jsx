import { useState } from "react";
import "./App.css";
import { BsClipboardPlus } from "react-icons/bs";
import { BsClipboardCheck } from "react-icons/bs";
import Checkbox from "./Components/Checkbox";
import usePasswordGenerator from "./custom-hooks/usePasswordGenerator";

function App() {
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [passwordLength, setPasswordLength] = useState(6);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = async () => {
    const copiedText = await navigator.clipboard.readText();
    if(password.length && copiedText !== password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
    }
  };

  const { password, errorMessage, geneatePassword } = usePasswordGenerator();

  return (
    <section>
      <div className="container">
        <h1 className="header">Password Generator</h1>
        <div className="result">
          <input
            type="text"
            id="result"
            value={password}
            placeholder="Click on the Generate Password"
            readOnly
          />
          <div className={`clipboard ${copied ? "active" : ""}`}>
            {copied ? (
              <BsClipboardCheck />
            ) : (
              <BsClipboardPlus onClick={handleCopy} />
            )}
          </div>
        </div>
        <div className="checkboxes">
          {checkboxData.map((checkbox, index) => {
            return (
              <Checkbox
                key={index}
                title={checkbox.title}
                onChange={() => handleCheckboxChange(index)}
                state={checkbox.state}
              />
            );
          })}
        </div>
        <div className="password-length">
          <h3>Password Length</h3>
          <div className="slider">
            <p className="rangeValue">{passwordLength}</p>
            <div className="range">
              <input
                type="range"
                min={6}
                max={20}
                value={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
              />
            </div>
          </div>
        </div>

        {errorMessage && <div className="errorMessage">{errorMessage}</div>}

        <button
          className="button"
          onClick={() => {
            setCopied(false);
            geneatePassword(checkboxData, passwordLength);
          }}
        >
          Generate Password
        </button>
      </div>
    </section>
  );
}

export default App;
