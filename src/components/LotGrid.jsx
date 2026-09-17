import { useEffect, useMemo, useState } from "react";
import LotModal from "./LotModal";

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function LotGrid({
  lots,
  setLots,
  currency,
  formatMoney,
  user,
  onRequireLogin,
}) {
  const [selectedLot, setSelectedLot] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [sort, setSort] = useState("NEWEST");

  const filteredLots = useMemo(() => {
    let result = lots.filter((lot) => {
      const matchesSearch =
        lot.id.toLowerCase().includes(search.toLowerCase()) ||
        lot.serial.includes(search) ||
        (lot.name || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const isEnding = lot.seconds < 60;

      const matchesFilter =
        filter === "ALL" ||
        (filter === "LIVE" && lot.seconds >= 60) ||
        (filter === "ENDING" && isEnding);

      return matchesSearch && matchesFilter;
    });

    if (sort === "BID_HIGH") {
      result.sort(
        (a, b) => Number(b.bid) - Number(a.bid)
      );
    }

    if (sort === "BID_LOW") {
      result.sort(
        (a, b) => Number(a.bid) - Number(b.bid)
      );
    }

    if (sort === "TIME_LOW") {
      result.sort((a, b) => a.seconds - b.seconds);
    }

    return result;
  }, [lots, search, filter, sort]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLots((currentLots) =>
        currentLots.map((lot) => ({
          ...lot,
          seconds: Math.max(lot.seconds - 1, 0),
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [setLots]);

  return (
    <>
      <section className="lots-section" id="lots">
        <div className="lots-heading">
          <div>
            <span className="eyebrow">
              MARKET INVENTORY
            </span>

            <h2>Active Lots</h2>
          </div>

          <div className="market-controls">
            <div className="search-box">
              <span>⌕</span>

              <input
                type="text"
                placeholder="SEARCH LOTS..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <div className="control-group">
              <select
                value={filter}
                onChange={(event) =>
                  setFilter(event.target.value)
                }
              >
                <option value="ALL">ALL LOTS</option>
                <option value="LIVE">LIVE</option>
                <option value="ENDING">ENDING</option>
              </select>

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
              >
                <option value="NEWEST">NEWEST</option>
                <option value="BID_HIGH">
                  HIGH BID
                </option>
                <option value="BID_LOW">
                  LOW BID
                </option>
                <option value="TIME_LOW">
                  ENDING SOON
                </option>
              </select>
            </div>
          </div>

          <span className="lot-count">
            {filteredLots.length
              .toString()
              .padStart(2, "0")}{" "}
            SHOWING
          </span>
        </div>

        <div className="lot-grid">
          {filteredLots.map((lot) => {
            const isEnding = lot.seconds < 60;

            return (
              <article
                className="lot-card"
                key={lot.id}
                onClick={() => setSelectedLot(lot)}
              >
                <div className="lot-card-top">
                  <span className="lot-id">
                    {lot.id}
                  </span>

                  <span
                    className={`lot-status ${
                      isEnding ? "ending" : ""
                    }`}
                  >
                    <span />
                    {isEnding ? "ENDING" : lot.status}
                  </span>
                </div>

                <div className="lot-card-name">
                  {lot.name || "Digital Asset"}
                </div>

                <div className="lot-visual">
  {lot.image ? (
    <img
      src={lot.image}
      alt={lot.name || lot.id}
    />
  ) : (
    <span>{lot.serial}</span>
  )}
</div>
                <div className="lot-details">
                  <div>
                    <span>CURRENT BID</span>
                    <strong>
                      {formatMoney(lot.bid)}
                    </strong>
                  </div>

                  <div>
                    <span>BIDS</span>
                    <strong>{lot.bids}</strong>
                  </div>

                  <div>
                    <span>TIME LEFT</span>
                    <strong
                      className={
                        isEnding ? "ending-soon" : ""
                      }
                    >
                      {formatTime(lot.seconds)}
                    </strong>
                  </div>
                </div>

                <button
                  className="view-lot"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedLot(lot);
                  }}
                >
                  VIEW LOT
                  <span>→</span>
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <LotModal
  lot={selectedLot}
  currency={currency}
  formatMoney={formatMoney}
  setLots={setLots}
  user={user}
  onRequireLogin={onRequireLogin}
  onClose={() => setSelectedLot(null)}
/>
    </>
  );
}