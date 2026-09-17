import { useState } from "react";

export default function AdminPanel({ lots, activities, onClose }) {
  const [addLotOpen, setAddLotOpen] = useState(false);

  const [lotId, setLotId] = useState("");
  const [serial, setSerial] = useState("");
  const [bid, setBid] = useState("");
  const [status, setStatus] = useState("LIVE");

  function createLot() {
    if (!lotId || !serial || !bid) {
      alert("PLEASE COMPLETE ALL FIELDS");
      return;
    }

    const newLot = {
      id: lotId.toUpperCase(),
      serial,
      image: document.getElementById("lot-image")?.value || "",
      bid: Number(bid).toFixed(3),
      bids: 0,
      seconds: 24 * 3600,
      status,
    };

    const savedLots = JSON.parse(
      localStorage.getItem("bidFortressLots") || "[]"
    );

    localStorage.setItem(
      "bidFortressLots",
      JSON.stringify([...savedLots, newLot])
    );

    setLotId("");
    setSerial("");
    setBid("");
    setStatus("LIVE");
    setAddLotOpen(false);

    window.location.reload();
  }

  return (
    <div className="dashboard-backdrop" onClick={onClose}>
      <section
        className="user-dashboard admin-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="dashboard-close" onClick={onClose}>
          ×
        </button>

        <div className="dashboard-header">
          <div>
            <span className="eyebrow">CONTROL CENTER</span>
            <h2>Admin Console</h2>
            <span className="dashboard-role">
              ADMINISTRATOR ACCESS
            </span>
          </div>

          <span className="dashboard-live">
            <span />
            SYSTEM ONLINE
          </span>
        </div>

        <div className="dashboard-stats">
          <div>
            <span>TOTAL LOTS</span>
            <strong>{lots.length}</strong>
          </div>

          <div>
            <span>LIVE ACTIVITY</span>
            <strong>{activities.length}</strong>
          </div>

          <div>
            <span>SYSTEM</span>
            <strong>ONLINE</strong>
          </div>
        </div>

        <div className="admin-actions">
          <button
            type="button"
            className="admin-add-button"
            onClick={() => setAddLotOpen(true)}
          >
            <span>+</span>
            ADD NEW LOT
          </button>
        </div>

        {addLotOpen && (
          <div className="admin-form">
            <div className="dashboard-section-title">
              <span className="eyebrow">NEW ASSET</span>
              <span>CREATE LOT</span>
            </div>

            <div className="admin-form-grid">
              <input
                placeholder="LOT ID"
                value={lotId}
                onChange={(e) => setLotId(e.target.value)}
              />

              <input
                placeholder="SERIAL NUMBER"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
              />

              <input
                placeholder="STARTING BID"
                type="number"
                value={bid}
                onChange={(e) => setBid(e.target.value)}
              />
              <input
  type="text"
  placeholder="IMAGE URL"
  id="lot-image"
/>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="LIVE">LIVE</option>
                <option value="ENDING">ENDING</option>
              </select>
            </div>

            <div className="admin-form-actions">
              <button
                type="button"
                onClick={() => setAddLotOpen(false)}
              >
                CANCEL
              </button>

              <button
                type="button"
                onClick={createLot}
              >
                CREATE LOT
              </button>
            </div>
          </div>
        )}

        <div className="dashboard-section">
          <div className="dashboard-section-title">
            <span className="eyebrow">MARKET</span>
            <span>LOT INVENTORY</span>
          </div>

          <div className="dashboard-activity">
            {lots.map((lot) => (
              <div
                className="dashboard-activity-row"
                key={lot.id}
              >
                <div>
                  <strong>{lot.id}</strong>
                  <span>
                    {lot.status} · {lot.bids} BIDS
                  </span>
                </div>

                <div className="admin-lot-actions">
  <strong>${lot.bid}</strong>

  <button
    type="button"
    onClick={() => {
      const newBid = prompt(
        `New bid for ${lot.id}:`,
        lot.bid
      );

      if (!newBid) return;

      const updatedLots = lots.map((item) =>
        item.id === lot.id
          ? {
              ...item,
              bid: Number(newBid).toFixed(3),
            }
          : item
      );

      localStorage.setItem(
        "bidFortressLots",
        JSON.stringify(updatedLots)
      );

      window.location.reload();
    }}
  >
    EDIT
  </button>

  <button
    type="button"
    onClick={() => {
      if (!confirm(`Delete ${lot.id}?`)) return;

      const updatedLots = lots.filter(
        (item) => item.id !== lot.id
      );

      localStorage.setItem(
        "bidFortressLots",
        JSON.stringify(updatedLots)
      );

      window.location.reload();
    }}
  >
    DELETE
  </button>
</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}