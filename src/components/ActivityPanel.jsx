export default function ActivityPanel({ activities }) {
  return (
    <aside className="activity-panel" id="activity">
      <div className="panel-heading">
        <div>
          <span className="label">NETWORK</span>
          <h3>Recent Activity</h3>
        </div>

        <span className="activity-status">
          <span />
          LIVE
        </span>
      </div>

      <div className="activity-list">
        {activities.map((activity, index) => (
          <div
            className={`activity-item ${
              index === 0 ? "new-activity" : ""
            }`}
            key={`${activity.bidder}-${activity.amount}-${index}`}
          >
            <div className="activity-dot" />

            <div className="activity-info">
              <strong>{activity.bidder}</strong>

              <span>{activity.time}</span>
            </div>

            <div className="activity-amount">
              {activity.amount}
            </div>
          </div>
        ))}
      </div>

      <div className="panel-footer">
        <span>BLOCK</span>
        <strong>#18,429,102</strong>
      </div>
    </aside>
  );
}