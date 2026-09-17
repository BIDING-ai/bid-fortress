import { useState } from "react";

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
}

export default function LotModal({
  lot,
  currency,
  formatMoney,
  setLots,
  onClose,
}) {
  const [bid, setBid] = useState("");

  if (!lot) return null;

  function handleBid() {
  if (!user) {
    if (onRequireLogin) {
      onRequireLogin();
    }
    return;
  }

  if (!bid) return;

  const current = Number(lot.bid);
  const newBid = Number(bid);

  if (newBid <= current) {
    alert(`Bid must be higher than ${formatMoney(current)}`);
    return;
  }

  setLots((currentLots) =>
    currentLots.map((item) =>
      item.id === lot.id
        ? {
            ...item,
            bid: newBid.toFixed(3),
            bids: item.bids + 1,
          }
        : item
    )
  );

  alert(`Bid of ${formatMoney(newBid)} submitted for ${lot.id}`);

  setBid("");
  onClose();
}

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="lot-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          <div>
            <span className="eyebrow">AUCTION LOT</span>
            <h2>{lot.name || "Digital Asset"}</h2>
            <span className="lot-modal-id">{lot.id}</span>
          </div>

          <span className="lot-status">
            <span />
            {lot.status}
          </span>
        </div>

        <div className="modal-serial">
          <span className="serial-small">SERIALIZED ASSET</span>
          <strong>{lot.serial}</strong>
        </div>

        {lot.image && (
  <div className="modal-image">
    <img
      src={lot.image}
      alt={lot.name || lot.id}
    />
  </div>
)}

        <div className="modal-grid">
          <div className="modal-stat">
            <span>CURRENT BID</span>
            <strong>{formatMoney(lot.bid)}</strong>
          </div>

          <div className="modal-stat">
            <span>TOTAL BIDS</span>
            <strong>{lot.bids}</strong>
          </div>

          <div className="modal-stat">
            <span>TIME REMAINING</span>
            <strong>{formatTime(lot.seconds)}</strong>
          </div>
        </div>

        <div className="modal-section">
          <span className="eyebrow">ASSET INFORMATION</span>

          <div className="metadata">
            <div>
              <span>FORMAT</span>
              <strong>Serialized Object</strong>
            </div>

            <div>
              <span>NETWORK</span>
              <strong>Ethereum</strong>
            </div>

            <div>
              <span>VERIFICATION</span>
              <strong>Verified</strong>
            </div>

            <div>
              <span>CURRENCY</span>
              <strong>{currency}</strong>
            </div>
          </div>
        </div>

        <div className="modal-bid-area">
          <span className="eyebrow">PLACE BID ON {lot.id}</span>

          <div className="modal-bid-row">
            <input
              type="number"
              step="0.01"
              value={bid}
              onChange={(event) => setBid(event.target.value)}
              placeholder={`Higher than ${lot.bid}`}
            />

            <button
              className="modal-bid-button"
              onClick={handleBid}
            >
              BID
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}