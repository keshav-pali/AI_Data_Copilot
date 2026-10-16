function DataTable({ datasets = [], loading = false }) {
  const formatNumber = (number) => {
    return Number(number || 0).toLocaleString();
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const createdDate = new Date(date);

    if (Number.isNaN(createdDate.getTime())) {
      return "-";
    }

    return createdDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getFileType = (fileName = "") => {
    const extension = fileName
      .substring(fileName.lastIndexOf(".") + 1)
      .toUpperCase();

    return extension || "FILE";
  };

  return (
    <div className="table-card">

      <div className="table-header">

        <div>
          <h3>
            Recent Datasets
          </h3>

          <p>
            Your recently uploaded data
          </p>
        </div>

        <button className="view-button">
          View all
        </button>

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

            {loading ? (

              <tr>
                <td colSpan="5">
                  Loading datasets...
                </td>
              </tr>

            ) : datasets.length === 0 ? (

              <tr>
                <td colSpan="5">
                  No datasets uploaded yet.
                </td>
              </tr>

            ) : (

              datasets.slice(0, 5).map((item) => (

                <tr key={item._id}>

                  <td>

                    <div className="dataset-name">

                      <div className="file-icon">
                        ▤
                      </div>

                      {item.originalFileName ||
                        item.name ||
                        "Unnamed Dataset"}

                    </div>

                  </td>


                  <td>
                    {getFileType(
                      item.originalFileName ||
                        item.name
                    )}
                  </td>


                  <td>
                    {formatNumber(item.rowCount)}
                  </td>


                  <td>
                    {formatDate(item.updatedAt)}
                  </td>


                  <td>

                    <span
                      className={`status-badge ${
                        item.status === "ready"
                          ? "processed"
                          : ""
                      }`}
                    >
                      ●{" "}
                      {item.status === "ready"
                        ? "Processed"
                        : item.status === "failed"
                        ? "Failed"
                        : "Processing"}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DataTable;