export default function Dashboard({
  walletAddress,
  activities,
  user,
  onClose,
  onDisconnect,
}) {
  return (
    <div className="dashboard-backdrop" onClick={onClose}>
      <section
        className="user-dashboard"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="dashboard-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="dashboard-header">
          <div>
            <span className="eyebrow">ACCOUNT CENTER</span>

            <h2>
              {user?.username || "My Dashboard"}
            </h2>

            {user && (
              <span className="dashboard-role">
                {user.role} ACCOUNT
              </span>
            )}
          </div>

          <span className="dashboard-live">
            <span />
            CONNECTED
          </span>
        </div>

        <div className="dashboard-wallet">
          <span>CONNECTED WALLET</span>

          <strong>{walletAddress}</strong>

          <button
            type="button"
            className="dashboard-disconnect"
            onClick={onDisconnect}
          >
            DISCONNECT WALLET
          </button>
        </div>

        <div className="dashboard-stats">
          <div>
            <span>MY BIDS</span>
            <strong>{activities.length}</strong>
          </div>

          <div>
            <span>ACTIVE LOTS</span>
            <strong>02</strong>
          </div>

          <div>
            <span>PORTFOLIO</span>
            <strong>5.280</strong>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="dashboard-section-title">
            <span className="eyebrow">ACTIVITY</span>
            <span>RECENT BIDS</span>
          </div>

          <div className="dashboard-activity">
            {activities.slice(0, 5).map((activity, index) => (
              <div
                className="dashboard-activity-row"
                key={`${activity.bidder}-${activity.amount}-${index}`}
              >
                <div>
                  <strong>{activity.bidder}</strong>
                  <span>{activity.time}</span>
                </div>

                <strong>{activity.amount}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}