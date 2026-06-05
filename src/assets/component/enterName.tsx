import { type FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import "../styles/enterName.css";

type PeopleItem = { name: string };
type EnterNameProps = { people: Array<PeopleItem | PeopleItem[]> };

export default function EnterName({ people }: EnterNameProps) {
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const Navigate = useNavigate();

  const flattenedPeople = useMemo(() => {
    const list = [];
    for (let index = 0; index < people.length; index++) {
      const element = people[index];
      if (Array.isArray(element)) {
        for (let subIndex = 0; subIndex < element.length; subIndex++) {
          list.push({ name: element[subIndex].name, groupIndex: index });
        }
      } else {
        list.push({ name: element.name, groupIndex: index });
      }
    }
    return list;
  }, [people]);

  const suggestions = useMemo(() => {
    const query = value.trim().toLowerCase();
    if (!query) return [];
    return flattenedPeople
      .filter((person) => person.name.toLowerCase().includes(query))
      .slice(0, 6);
  }, [flattenedPeople, value]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = value.trim().toLowerCase();
    if (!query) {
      alert("Please enter a name.");
      return;
    }

    let foundIndex = null;

    for (let index = 0; index < people.length; index++) {
      const element = people[index];
      if (Array.isArray(element)) {
        for (let subIndex = 0; subIndex < element.length; subIndex++) {
          if (
            String(element[subIndex].name).toLowerCase() === query
          ) {
            foundIndex = index;
            break;
          }
        }
      } else {
        if (String(element.name).toLowerCase() === query) {
          foundIndex = index;
          break;
        }
      }
      if (foundIndex !== null) break;
    }

    if (foundIndex !== null) {
      const target = people[foundIndex];
      const targetName = Array.isArray(target) ? target[0]?.name ?? "" : target.name;
      Navigate(`/rsvp/${targetName}`, {
        state: { personIndex: foundIndex },
      });
    } else {
      alert("Person not found");
    }
  }

  function selectSuggestion(name: string) {
    setValue(name);
    setShowSuggestions(false);
  }

  return (
    <div className="nameContainer">
      <form onSubmit={handleSubmit}>
        <label>
          <p className="whoComing">
            ENTER THE NAME OF THE PERSON WHO WILL ATTEND THE WEDDING:
          </p>
          <br />
          <div className="inputWrapper">
            <input
              className="elegant-input"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setShowSuggestions(Boolean(e.target.value.trim()));
              }}
              onFocus={() => setShowSuggestions(Boolean(value.trim()))}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
              placeholder="e.g. Ismael, Ciana, etc."
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestion-dropdown">
                {suggestions.map((person) => (
                  <li
                    key={`${person.groupIndex}-${person.name}`}
                    className="suggestion-item"
                    onMouseDown={() => selectSuggestion(person.name)}
                  >
                    {person.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>
        <button type="submit" className="elegant-button">
          Find RSVP
        </button>
      </form>
    </div>
  );
}
