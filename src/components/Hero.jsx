export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="status">
            <span className="status-dot" />
            EXCHANGE ONLINE
          </div>

          <h1>
            Secure the
            <br />
            <span>next sequence.</span>
          </h1>

          <p>
            A high-integrity marketplace for serialized assets,
            authenticated lots, and competitive bidding.
          </p>

          <div className="hero-actions">
            <a href="#market" className="primary-button">
              ENTER EXCHANGE
            </a>

            <a href="#activity" className="secondary-button">
              VIEW ACTIVITY
            </a>
          </div>
        </div>

        <div className="hero-terminal">
          <div className="terminal-header">
            <span>FORTRESS // SYSTEM</span>
            <span>LIVE</span>
          </div>

          <div className="terminal-body">
            <p>
              <span>&gt;</span> initializing exchange...
            </p>

            <p>
              <span>&gt;</span> validating serialization layer...
            </p>

            <p className="success">
              <span>&gt;</span> integrity check: PASS
            </p>

            <p>
              <span>&gt;</span> active lots: <strong>24</strong>
            </p>

            <p>
              <span>&gt;</span> participants: <strong>1,284</strong>
            </p>

            <p className="cursor">
              <span>&gt;</span>_
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}