export default function WalletModal({
  open,
  connected,
  walletAddress,
  onClose,
  onConnect,
  onDisconnect,
}) {
  if (!open) return null;

  return (
    <div className="wallet-backdrop" onClick={onClose}>
      <div
        className="wallet-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="wallet-close" onClick={onClose}>
          ×
        </button>

        {!connected ? (
          <>
            <div className="wallet-header">
              <span className="eyebrow">SECURE ACCESS</span>
              <h2>Connect Wallet</h2>
              <p>
                Connect your wallet to participate in the
                serialization exchange.
              </p>
            </div>

            <div className="wallet-options">
              <button
                className="wallet-option"
                onClick={() => onConnect("MetaMask")}
              >
                <span className="wallet-icon">M</span>

                <span>
                  <strong>MetaMask</strong>
                  <small>Browser wallet</small>
                </span>

                <span className="wallet-arrow">→</span>
              </button>

              <button
                className="wallet-option"
                onClick={() => onConnect("WalletConnect")}
              >
                <span className="wallet-icon">W</span>

                <span>
                  <strong>WalletConnect</strong>
                  <small>Mobile & desktop</small>
                </span>

                <span className="wallet-arrow">→</span>
              </button>
            </div>

            <div className="wallet-security">
              <span className="status-dot" />
              NON-CUSTODIAL CONNECTION
            </div>
          </>
        ) : (
          <>
            <div className="wallet-header">
              <span className="eyebrow">WALLET STATUS</span>
              <h2>Connected</h2>
              <p>Your wallet is connected to BID//FORTRESS.</p>
            </div>

            <div className="connected-wallet">
              <span className="connected-label">CONNECTED ADDRESS</span>

              <strong>{walletAddress}</strong>

              <span className="connected-status">
                <span className="status-dot" />
                ACTIVE SESSION
              </span>
            </div>

            <button
              className="wallet-disconnect"
              onClick={onDisconnect}
            >
              DISCONNECT WALLET
            </button>
          </>
        )}
      </div>
    </div>
  );
}