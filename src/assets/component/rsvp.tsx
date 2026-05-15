import { useLocation } from "react-router";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router";
import "../styles/rsvp.css";

export default function Rsvp({ people, setPeople }) {
  const location = useLocation();
  const { personIndex } = location.state || {};
  const Navigate = useNavigate();

  const [rsvpPeople, setRsvpPeople] = useState(() => {
    try {
      const raw = localStorage.getItem("myapp:rsvpPeople");
      return raw ? JSON.parse(raw) : "";
    } catch {
      return "";
    }
  });

  if (
    personIndex === undefined ||
    personIndex === null ||
    personIndex < 0 ||
    personIndex >= people.length
  ) {
    return (
      <div>
        <h2>RSVP Page</h2>
        <p>Person not found</p>
      </div>
    );
  }

  const target = people[personIndex];

  function updateRsvp(indexInGroup, value) {
    let newPeople;
    try {
      newPeople = structuredClone
        ? structuredClone(people)
        : JSON.parse(JSON.stringify(people));
    } catch {
      newPeople = JSON.parse(JSON.stringify(people));
    }

    if (Array.isArray(newPeople[personIndex])) {
      newPeople[personIndex][indexInGroup].rsvp = value;
    } else {
      newPeople[personIndex].rsvp = value;
    }
    console.log(newPeople);

    setPeople(newPeople);
  }

  function updateSong(e, indexInGroup = null) {
    const value = e?.target?.value ?? "";
console.log(value);
console.log(e);


    let newPeople;
    try {
      newPeople = structuredClone
        ? structuredClone(people)
        : JSON.parse(JSON.stringify(people));
    } catch {
      newPeople = JSON.parse(JSON.stringify(people));
    }
console.log(newPeople);
console.log(personIndex);

    if (Array.isArray(newPeople[personIndex])) {
      console.log("HERE");
      console.log(indexInGroup);
      
      if (indexInGroup !== null) {
        newPeople[personIndex][indexInGroup].music = value;
      }
    } else {
      newPeople[personIndex].music = value;
    }

    console.log(newPeople);

    setPeople(newPeople);
  }

  function submitRsvp() {
    let newRsvpPeople;
    try {
      newRsvpPeople = structuredClone
        ? structuredClone(rsvpPeople)
        : JSON.parse(JSON.stringify(rsvpPeople));
    } catch {
      newRsvpPeople = JSON.parse(JSON.stringify(rsvpPeople));
    }
    newRsvpPeople.push(people[personIndex]);

    console.log(newRsvpPeople);
    setRsvpPeople(newRsvpPeople);

    localStorage.setItem("myapp:rsvpPeople", JSON.stringify(newRsvpPeople));

    Navigate(`/`);
  }

  // Navigate(`/rsvp/${people[foundIndex].name}`, { state: { personIndex: foundIndex } });

  return (
    <div className="rsvpContainer">
      <div className="rsvp-root">
        <ul className="rsvp-ul">
          {Array.isArray(target) ? (
            target.map((person, idx) => (
              <div
                className="rsvp-card"
                style={{ marginBottom: 24 }}
                key={person.id ?? idx}
              >
                <li
                  className="rsvp-person"
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <div className="rsvp-person-name">{person.name}</div>

                  <div className="rsvp-person-actions">
                    <div className="rsvp-controls">
                      <button
                        className="clear-gold"
                        onClick={() => updateRsvp(idx, true)}
                        aria-label={`${person.name} will attend`}
                      >
                        WILL ATTEND
                      </button>

                      <button
                        className="clear-gold"
                        onClick={() => updateRsvp(idx, false)}
                        aria-label={`${person.name} will not attend`}
                      >
                        WILL NOT ATTEND
                      </button>
                    </div>
                  </div>
                </li>
                {person.rsvp && (
                  <div
                    className="rsvp-music-input"
                    id={`example-collapse-text-${person.id}`}
                  >
                    <Form>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          controlId={`formGridMusic-${person.id}`}
                        >
                          <div className="songText">
                            <Form.Label>
                              What song will get you on the dance floor?
                            </Form.Label>
                          </div>
                          <Form.Control
                            className="elegant-input"
                            type="text"
                            placeholder="e.g. Work Song - Hozier"
                            onChange={(e) => updateSong(e, idx)}
                          />
                        </Form.Group>
                      </Row>
                    </Form>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="rsvp-card" style={{ marginBottom: 24 }}>
              <li
                className="rsvp-person"
                key={target.id ?? "single"}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <div className="rsvp-person-name">{target.name}</div>

                <div className="rsvp-person-actions">
                  <div className="rsvp-controls">
                    <button
                      className="clear-gold"
                      onClick={() => updateRsvp(null, true)}
                    >
                      WILL ATTEND
                    </button>
                    <button
                      className="clear-gold"
                      onClick={() => updateRsvp(null, false)}
                    >
                      WILL NOT ATTEND
                    </button>
                  </div>
                </div>
              </li>
              {people[personIndex].rsvp && (
                <div id={`example-collapse-text-${target.id}`}>
                  <Form>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        controlId={`formGridMusic-${target.id}`}
                      >
                        <Form.Label className="songText">
                          What song will get you on the dance floor?
                        </Form.Label>
                        <Form.Control
                          className="elegant-input"
                          type="text"
                          placeholder="e.g. Work Song - Hozier"
                          onChange={(e) => updateSong(e)}
                        />
                      </Form.Group>
                    </Row>
                  </Form>
                </div>
              )}
            </div>
          )}
        </ul>

        <br />
      </div>
      <button className="elegant-button" onClick={submitRsvp}>
        submit
      </button>
    </div>
  );
}
