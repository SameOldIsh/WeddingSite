import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/admin.css"

export default function AdminPage() {
  const Navigate = useNavigate();

  const [rsvpPeople, setRsvpPeople] = useState(() => {
    try {
      const raw = localStorage.getItem("myapp:rsvpPeople");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  function rsvpExists() {
    console.log(rsvpPeople);

    if (!rsvpPeople || rsvpPeople.length === 0) return null;

    return rsvpPeople.map((entry, i) => {
      if (Array.isArray(entry)) {
        return (
          <div className="groupPeople" key={`group-${i}`}>
            {entry.map((person, j) => (
              <ul key={person?.id ?? `${i}-${j}`}>
                <li>Name: {person?.name}</li>
                <li>Song: {person?.music}</li>
                <li>RSVP: {String(person?.rsvp)}</li>
              </ul>
            ))}
          </div>
        );
      }

      return (
        <ul key={entry?.id ?? i}>
          <li>Name: {entry?.name}</li>
          <li>Song: {entry?.music}</li>
          <li>RSVP: {String(entry?.rsvp)}</li>
        </ul>
      );
    });
  }
  function blowup() {
    localStorage.setItem("myapp:rsvpPeople", JSON.stringify([]));
    Navigate(`/admin`);
  }

  return (
    <div className="adminChart">
      <h2>RSVP List</h2>

      {rsvpExists()}

            <button onClick={blowup}>BlowUp</button>

    </div>
  );
}
