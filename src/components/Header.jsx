import { useState } from "react";
import WalletModal from "./WalletModal";
import LoginModal from "./LoginModal";

export default function Header({
  onOpenDashboard,
  user,
  onLogin,
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const [connected, setConnected] = useState(() => {
    return localStorage.getItem("bfConnected") === "true";
  });

  const [walletAddress, setWalletAddress] = useState(() => {
    return localStorage.getItem("bfWalletAddress") || "";
  });

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogin(loginData) {
    if (onLogin) {
      onLogin(loginData);
    }

    setLoginOpen(false);
  }

  function handleConnect(wallet) {
    const address =
      wallet === "MetaMask"
        ? "0x7A3F...91F2"
        : "0xB81C...44AC";

    setConnected(true);
    setWalletAddress(address);

    localStorage.setItem("bfConnected", "true");
    localStorage.setItem("bfWalletAddress", address);

    setWalletOpen(false);
  }

  function handleDisconnect() {
    setConnected(false);
    setWalletAddress("");

    localStorage.removeItem("bfConnected");
    localStorage.removeItem("bfWalletAddress");

    setWalletOpen(false);
  }

  function handleWalletClick() {
    closeMenu();

    if (connected) {
      onOpenDashboard();
    } else {
      setWalletOpen(true);
    }
  }

  function handleLogout() {
    if (onLogout) {
      onLogout();
    }

    closeMenu();
  }

  return (
    <>
      <header className="site-header">
        <a href="#" className="brand" onClick={closeMenu}>
          <span className="brand-mark">BF</span>

          <span className="brand-name">
            BID<span>//</span>FORTRESS
          </span>
        </a>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href="#market" onClick={closeMenu}>
            MARKET
          </a>

          <a href="#activity" onClick={closeMenu}>
            ACTIVITY
          </a>

          <a href="#about" onClick={closeMenu}>
            ABOUT
          </a>

          {user ? (
            <div className="account-area">
              <span className="account-name">
                {user.role} / {user.username}
              </span>

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="login-button"
              onClick={() => {
                closeMenu();
                setLoginOpen(true);
              }}
            >
              LOGIN
            </button>
          )}

          <button
            type="button"
            className={`connect-button ${
              connected ? "connected" : ""
            }`}
            onClick={handleWalletClick}
          >
            {connected ? walletAddress : "CONNECT"}
          </button>
        </nav>

        <button
          type="button"
          className={`menu-button ${
            menuOpen ? "active" : ""
          }`}
          onClick={() =>
            setMenuOpen((current) => !current)
          }
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <WalletModal
        open={walletOpen}
        connected={connected}
        walletAddress={walletAddress}
        onClose={() => setWalletOpen(false)}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
}