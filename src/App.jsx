import { useEffect, useState } from "react";

import Toast from "./components/Toast";
import Header from "./components/Header";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import BidCard from "./components/BidCard";
import ActivityPanel from "./components/ActivityPanel";
import LotGrid from "./components/LotGrid";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import LoginModal from "./components/LoginModal";
import AdminPanel from "./components/AdminPanel";

const currencies = {
  USD: {
    symbol: "$",
    rate: 1,
  },
  INR: {
    symbol: "₹",
    rate: 83,
  },
  EUR: {
    symbol: "€",
    rate: 0.92,
  },
};

const initialLots = [
  {
    id: "LOT_004281",
    serial: "004281",
    image: "/images/lot-004281.jpg",
    bid: "2.480",
    bids: 37,
    seconds: 4 * 3600 + 18 * 60 + 32,
    status: "LIVE",
  },
  {
    id: "LOT_004280",
    serial: "004280",
    image: "/images/lot-004280.jpg",
    bid: "1.920",
    bids: 24,
    seconds: 2 * 3600 + 42 * 60 + 18,
    status: "LIVE",
  },
  {
    id: "LOT_004279",
    serial: "004279",
    image: "/images/lot-004279.jpg",
    bid: "4.125",
    bids: 51,
    seconds: 1 * 3600 + 17 * 60 + 44,
    status: "LIVE",
  },
  {
  id: "LOT_004278",
  serial: "004278",
  image: "/images/lot-004278.jpg",
  bid: "0.875",
  bids: 18,
  seconds: 38 * 60 + 21,
  status: "ENDING",
},
  {
    id: "LOT_004277",
    serial: "004277",
    image: "/images/lot-004277.jpg",
    bid: "3.640",
    bids: 42,
    seconds: 6 * 3600 + 12 * 60 + 9,
    status: "LIVE",
  },
  {
    id: "LOT_004276",
    serial: "004276",
    image: "/images/lot-004276.jpg",
    bid: "1.250",
    bids: 29,
    seconds: 8 * 3600 + 45 * 60 + 17,
    status: "LIVE",
  },
];

export default function App() {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [toast, setToast] = useState("");

  const [currency, setCurrency] = useState("USD");

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("bfUser");
    return saved ? JSON.parse(saved) : null;
  });

  function convertPrice(value) {
    return Number(value) * currencies[currency].rate;
  }

  function formatMoney(value) {
    return `${currencies[currency].symbol}${convertPrice(
      value
    ).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  const [lots, setLots] = useState(() => {
    const saved = localStorage.getItem("bidFortressLots");
    return saved ? JSON.parse(saved) : initialLots;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem(
      "bidFortressActivities"
    );

    return saved
      ? JSON.parse(saved)
      : [
          {
            bidder: "0x7A...91F2",
            amount: "$2.48",
            time: "2 min ago",
          },
          {
            bidder: "0xB3...44AC",
            amount: "$2.35",
            time: "5 min ago",
          },
          {
            bidder: "0x12...8DE1",
            amount: "$2.20",
            time: "8 min ago",
          },
          {
            bidder: "0xF8...32C7",
            amount: "$2.05",
            time: "12 min ago",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem(
      "bidFortressLots",
      JSON.stringify(lots)
    );
  }, [lots]);

  useEffect(() => {
    localStorage.setItem(
      "bidFortressActivities",
      JSON.stringify(activities)
    );
  }, [activities]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast]);

  function handleLogin(loginData) {
    setUser(loginData);

    localStorage.setItem(
      "bfUser",
      JSON.stringify(loginData)
    );

    setLoginOpen(false);
  }

  function handleNewBid(newBid) {
    setToast(
      `BID OF ${formatMoney(newBid.amount)} SUBMITTED SUCCESSFULLY`
    );

    const newActivity = {
      bidder: "YOU",
      amount: formatMoney(newBid.amount),
      time: "just now",
    };

    setActivities((current) => [
      newActivity,
      ...current,
    ]);
  }

  function handleLotBid(amount) {
    setLots((currentLots) =>
      currentLots.map((lot) =>
        lot.id === "LOT_004281"
          ? {
              ...lot,
              bid: amount.toFixed(3),
              bids: lot.bids + 1,
            }
          : lot
      )
    );
  }

  return (
    <div className="app">
      <Header
  user={user}
  onLogin={handleLogin}
  onLogout={() => {
    setUser(null);
    localStorage.removeItem("bfUser");
  }}
  onOpenDashboard={() => {
    if (user?.role === "ADMIN") {
      setAdminOpen(true);
    } else {
      setDashboardOpen(true);
    }
  }}
/>

      <div className="currency-switcher">
        <span>CURRENCY</span>

        <select
          value={currency}
          onChange={(event) =>
            setCurrency(event.target.value)
          }
        >
          <option value="USD">$ USD</option>
          <option value="INR">₹ INR</option>
          <option value="EUR">€ EUR</option>
        </select>
      </div>

      <main>
        <Hero />

        <StatsBar />

        <section className="exchange-section">
          <div className="section-heading">
            <span className="eyebrow">
              LIVE EXCHANGE
            </span>

            <h2>Serialization Market</h2>

            <p>
              Monitor active serialization lots and
              submit bids through the exchange
              interface.
            </p>
          </div>

          <div className="dashboard">
            <BidCard
              onNewBid={handleNewBid}
              onLotBid={handleLotBid}
              currency={currency}
              setCurrency={setCurrency}
              formatMoney={formatMoney}
              user={user}
              onRequireLogin={() =>
                setLoginOpen(true)
              }
            />

            <ActivityPanel
              activities={activities}
            />
          </div>

          <LotGrid
  lots={lots}
  setLots={setLots}
  currency={currency}
  formatMoney={formatMoney}
  user={user}
  onRequireLogin={() => setLoginOpen(true)}
/>
        </section>
      </main>

      <Footer />

      <Toast
        message={toast}
        onClose={() => setToast("")}
      />

      {dashboardOpen && (
        <Dashboard
  walletAddress="0x7A3F...91F2"
  activities={activities}
  user={user}
  onClose={() => setDashboardOpen(false)}
  onDisconnect={() => {
    localStorage.removeItem("bfConnected");
    localStorage.removeItem("bfWalletAddress");
    window.location.reload();
  }}
/>
      )}

      {adminOpen && user?.role === "ADMIN" && (
  <AdminPanel
    lots={lots}
    activities={activities}
    onClose={() => setAdminOpen(false)}
  />
)}

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}