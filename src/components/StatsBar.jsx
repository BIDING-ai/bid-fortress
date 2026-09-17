export default function StatsBar() {
  const stats = [
    {
      label: "ACTIVE LOTS",
      value: "06",
      detail: "LIVE",
    },
    {
      label: "TOTAL BIDS",
      value: "201",
      detail: "24H",
    },
    {
      label: "MARKET VOLUME",
      value: "184.72",
      detail: "ETH",
    },
    {
      label: "NETWORK",
      value: "OPERATIONAL",
      detail: "99.98%",
    },
  ];

  return (
    <section className="stats-bar">
      {stats.map((stat) => (
        <div className="stat-box" key={stat.label}>
          <span className="stat-label">
            {stat.label}
          </span>

          <div className="stat-value-row">
            <strong>{stat.value}</strong>
            <span>{stat.detail}</span>
          </div>
        </div>
      ))}
    </section>
  );
}