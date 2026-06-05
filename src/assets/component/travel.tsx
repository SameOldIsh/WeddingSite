const hotels = [
  {
    name: "Hilton Philadelphia City Avenue",
    address: "4200 City Ave, Philadelphia, PA 19131",
    url: "https://www.hilton.com/en/hotels/phlphhf-hilton-philadelphia-city-avenue/",
  },
  {
    name: "Courtyard by Marriott Philadelphia City Avenue",
    address: "4100 Presidential Blvd, Philadelphia, PA 19131",
    url: "https://www.marriott.com/en-us/hotels/phlav-courtyard-philadelphia-city-avenue/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0",
  },
  {
    name: "Residence Inn by Marriott Philadelphia Bala Cynwyd",
    address: "615 Righters Ferry Rd, Bala Cynwyd, PA 19004",
    url: "https://www.marriott.com/en-us/hotels/phlrb-residence-inn-philadelphia-bala-cynwyd/overview/?scid=f2ae0541-1279-4f24-b197-a979c79310b0",
  },
];

import "../styles/enterName.css";

export default function Travel() {
  return (
    <div style={{ padding: "0px 20px 20px 20px", maxWidth: "760px", margin: "0 auto" }}>
      {/* <h2 style={{ marginBottom: "16px" }}>Travel Information</h2> */}
      <p className="whoComing" style={{ marginBottom: "24px", lineHeight: 1.6, fontSize: ".9rem" }}>
        The following list of hotels are recommended based on their proximity to the venue (5-10 minute drive).
      </p>
      <div style={{ display: "grid", gap: "16px" }}>
        {hotels.map((hotel) => (
          <div
            key={hotel.url}
            style={{
              border: "1px solid #e6e9ef",
              borderRadius: "14px",
              padding: "18px",
              background: "#f7f5f5E6",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: "0 0 8px", fontSize: "1.1rem" }}>
              {hotel.name}
            </h3>
            <p style={{ margin: "0 0 12px", color: "#4f5568" }}>
              {hotel.address}
            </p>
            <a
              href={hotel.url}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#1691a8",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Visit hotel website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}