import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/enterName.css";

export default function EnterName({ people }) {
  const [value, setValue] = useState("");
  const [personFoundNumber, setPersonFoundNumber] = useState<number | null>(
    null,
  );
  const Navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // compute match locally to avoid relying on async state updates
    let foundIndex = null;

    for (let index = 0; index < people.length; index++) {
      const element = people[index];
      if (Array.isArray(element)) {
        for (let subIndex = 0; subIndex < element.length; subIndex++) {
          if (
            String(element[subIndex].name).toLowerCase() ===
            value.trim().toLowerCase()
          ) {
            foundIndex = index;
            break;
          }
        }
      } else {
        if (String(element.name).toLowerCase() === value.trim().toLowerCase()) {
          foundIndex = index;
          break;
        }
      }
      if (foundIndex !== null) break;
    }

    setPersonFoundNumber(foundIndex);

    if (foundIndex !== null) {
      console.log(people[foundIndex]);
      Navigate(`/rsvp/${people[foundIndex].name}`, {
        state: { personIndex: foundIndex },
      });
    } else {
      alert("Person not found");
    }
  }

  return (
    <div
     className="nameContainer"
    >
      <form
        onSubmit={handleSubmit}
        
      >
        <label>
          <p className="whoComing" >
            ENTER THE NAME OF THE PERSON WHO WILL ATTEND THE WEDDING:
          </p>
          <br />
          <input
            className="elegant-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.q. Ismael, Ciana, etc."
          />
        </label>
        <button type="submit" className="elegant-button">
          Find RSVP
        </button>
      </form>
    </div>
  );
}
