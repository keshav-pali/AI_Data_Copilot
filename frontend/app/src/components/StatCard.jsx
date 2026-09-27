function StatCard({
  title,
  value,
  change,
  icon,
  positive = true,
}) {
  return (
    <div className="stat-card">

      <div className="stat-card-top">

        <div className="stat-icon">
          {icon}
        </div>

        <span
          className={`stat-change ${
            positive ? "positive" : "negative"
          }`}
        >
          {positive ? "↑" : "↓"}

          {change}
        </span>

      </div>


      <div className="stat-content">

        <p>
          {title}
        </p>

        <h2>
          {value}
        </h2>

      </div>

    </div>
  );
}

export default StatCard;