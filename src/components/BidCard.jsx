import { useEffect, useState } from "react";

export default function BidCard({
  onNewBid,
  onLotBid,
  currency,
  setCurrency,
  formatMoney,
  user,
  onRequireLogin,
}) {
  const [bid, setBid] = useState("2.49");
  const [message, setMessage] = useState("");

  // Base value USD mein rahega
  const [currentBid, setCurrentBid] = useState(2.48);
  const [bidCount, setBidCount] = useState(37);

  const [timeLeft, setTimeLeft] = useState(
    4 * 60 * 60 + 18 * 60 + 32
  );

  const rates = {
    USD: 1,
    INR: 83,
    EUR: 0.92,
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 0) {
          clearInterval(timer);
          return 0;
        }

        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function displayedBid() {
    const value = Number(bid || 0);
    return value * rates[currency];
  }

  function handleCurrencyChange(event) {
    const newCurrency = event.target.value;

    const oldRate = rates[currency];
    const newRate = rates[newCurrency];

    const currentValue = Number(bid || 0);

    // Current amount ko same real value rakhte hue
    // new currency mein convert karo.
    const usdValue = currentValue / oldRate;
    const convertedValue = usdValue * newRate;

    setBid(convertedValue.toFixed(2));
    setCurrency(newCurrency);
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!user) {
  setMessage("");
  
  if (onRequireLogin) {
    onRequireLogin();
  }

  return;
}

    const valueInSelectedCurrency = Number(bid);

    if (!valueInSelectedCurrency) {
      setMessage("ENTER A BID AMOUNT");
      return;
    }

    // Selected currency se USD/base value
    const valueInUSD =
      valueInSelectedCurrency / rates[currency];

    if (valueInUSD <= currentBid) {
      setMessage(
        `BID MUST BE HIGHER THAN ${formatMoney(
          currentBid
        )}`
      );
      return;
    }

    setCurrentBid(valueInUSD);
    setBidCount((count) => count + 1);

    setMessage(
      `BID OF ${formatMoney(valueInUSD)} SUBMITTED`
    );

    if (onNewBid) {
      onNewBid({
        amount: valueInUSD,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });
    }

    if (onLotBid) {
      onLotBid(valueInUSD);
    }

    setBid("");
  }

  function decreaseBid() {
    const current = Number(bid || 0);
    const step = currency === "INR" ? 1 : 0.01;

    const next = Math.max(
      (currentBid * rates[currency]) + step,
      current - step
    );

    setBid(next.toFixed(2));
    setMessage("");
  }

  function increaseBid() {
    const current = Number(
      bid || currentBid * rates[currency]
    );

    const step = currency === "INR" ? 1 : 0.01;

    setBid((current + step).toFixed(2));
    setMessage("");
  }

  return (
    <article className="bid-card" id="market">
      <div className="card-top">
        <div>
          <span className="label">ACTIVE LOT</span>
          <h3>LOT_004281</h3>
        </div>

        <span className="live-badge">
          <span />
          LIVE
        </span>
      </div>

      <div className="asset-display">
        <div className="serial-number">004281</div>

        <div className="serial-label">
          SERIALIZED ASSET
        </div>
      </div>

      <div className="bid-stats">
        <div>
          <span>CURRENT BID</span>
          <strong>
            {formatMoney(currentBid)}
          </strong>
        </div>

        <div>
          <span>BIDS</span>
          <strong>{bidCount}</strong>
        </div>

        <div>
          <span>ENDS IN</span>
          <strong
            className={
              timeLeft < 60 ? "ending-soon" : ""
            }
          >
            {formatTime(timeLeft)}
          </strong>
        </div>
      </div>

      <form
        className="bid-form"
        onSubmit={handleSubmit}
      >
        <div className="bid-label-row">
          <label htmlFor="bid">
            YOUR BID
          </label>

          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="bid-currency"
          >
            <option value="USD">$ USD</option>
            <option value="INR">₹ INR</option>
            <option value="EUR">€ EUR</option>
          </select>
        </div>

        <div className="input-row">
          <button
            type="button"
            className="bid-adjust"
            onClick={decreaseBid}
          >
            −
          </button>

          <input
            id="bid"
            type="number"
            step={currency === "INR" ? "1" : "0.01"}
            value={bid}
            onChange={(event) => {
              setBid(event.target.value);
              setMessage("");
            }}
            placeholder="0.00"
          />

          <button
            type="button"
            className="bid-adjust"
            onClick={increaseBid}
          >
            +
          </button>

          <span>
            {currency}
          </span>
        </div>

        <button type="submit">
          {user
            ? "PLACE BID"
            : "LOGIN TO PLACE BID"}
        </button>

        {message && (
          <div className="bid-message">
            {message}
          </div>
        )}
      </form>
    </article>
  );
}