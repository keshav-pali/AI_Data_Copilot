function DataTable() {
  const data = [
    {
      name: "Sales Data",
      type: "CSV",
      rows: "12,450",
      updated: "2 hours ago",
      status: "Processed",
    },
    {
      name: "Customer Data",
      type: "Excel",
      rows: "8,921",
      updated: "5 hours ago",
      status: "Processed",
    },
    {
      name: "Marketing Data",
      type: "CSV",
      rows: "5,430",
      updated: "Yesterday",
      status: "Processed",
    },
    {
      name: "Product Data",
      type: "JSON",
      rows: "3,210",
      updated: "2 days ago",
      status: "Processed",
    },
  ];

  return (
    <div className="table-card">
      <div className="table-header">
        <div>
          <h3>Recent Datasets</h3>
          <p>Your recently uploaded data</p>
        </div>

        <button className="view-button">View all</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Dataset</th>
              <th>Type</th>
              <th>Rows</th>
              <th>Updated</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.name}>
                <td>
                  <div className="dataset-name">
                    <div className="file-icon">▤</div>
                    {item.name}
                  </div>
                </td>

                <td>{item.type}</td>

                <td>{item.rows}</td>

                <td>{item.updated}</td>

                <td>
                  <span className="status-badge">
                    ● {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;