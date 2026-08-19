
import "./MainContent.css";

import { useMemo } from "react";

import * as XLSX from "xlsx";


function MainContent({
  profile,
  messages,
}) {

  /*
    =====================================================
    Find latest bot response
    =====================================================
  */

  const latestBotMessage =
    useMemo(() => {

      return (
        messages
          ?.filter(
            (message) =>
              message.type ===
              "bot"
          )
          ?.at(-1) ||
        null
      );

    }, [messages]);


  /*
    =====================================================
    Backend response
    =====================================================
  */

  const result =
    latestBotMessage?.data ||
    null;


  /*
    =====================================================
    Extract recommendations
    =====================================================
  */

  const recommendations =
    useMemo(() => {

      if (!result) {
        return [];
      }


      if (
        Array.isArray(
          result.recommendations
        )
      ) {

        return result.recommendations;
      }


      if (
        Array.isArray(
          result.results
        )
      ) {

        return result.results;
      }


      if (
        Array.isArray(
          result.colleges
        )
      ) {

        return result.colleges;
      }


      if (
        Array.isArray(
          result.ranked_colleges
        )
      ) {

        return result.ranked_colleges;
      }


      if (
        Array.isArray(
          result.recommended_colleges
        )
      ) {

        return result.recommended_colleges;
      }


      return [];

    }, [result]);


  /*
    =====================================================
    Counts
    =====================================================
  */

  const totalCount =
    recommendations.length;


  const dreamCount =
    recommendations.filter(
      (item) =>
        String(
          item?.zone ||
          item?.bucket ||
          item?.category ||
          ""
        ).toLowerCase()
          .includes("dream")
    ).length;


  const targetCount =
    recommendations.filter(
      (item) =>
        String(
          item?.zone ||
          item?.bucket ||
          item?.category ||
          ""
        ).toLowerCase()
          .includes("target")
    ).length;


  const safeCount =
    recommendations.filter(
      (item) => {

        const value =
          String(
            item?.zone ||
            item?.bucket ||
            item?.category ||
            ""
          ).toLowerCase();

        return (
          value.includes("safe") ||
          value.includes("safer")
        );
      }
    ).length;


  /*
    =====================================================
    Download Excel
    =====================================================
  */

  const handleDownload = () => {
  try {
    if (!recommendations || recommendations.length === 0) {
      alert("No recommendations available to export.");
      return;
    }

    const excelData = recommendations.map((item, index) => ({
      Rank: item?.rank ?? item?.preference_rank ?? index + 1,

      College:
        item?.college ??
        item?.college_name ??
        item?.name ??
        "-",

      Branch:
        item?.branch ??
        item?.branch_name ??
        item?.program ??
        "-",

      Cutoff:
        item?.historical_cutoff ??
        item?.cutoff ??
        item?.closing_percentile ??
        "-",

      Percentile:
        item?.student_percentile ??
        item?.percentile ??
        profile?.ui_percentile ??
        "-",

      Gap:
        item?.gap ??
        item?.cutoff_gap ??
        "-",

      Zone:
        item?.zone ??
        item?.bucket ??
        item?.category ??
        "-",
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(excelData);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Recommendations"
    );

    XLSX.writeFile(
      workbook,
      "MHT_CET_CAP_Recommendations.xlsx"
    );

    console.log(
      "Excel file downloaded successfully."
    );

  } catch (error) {
    console.error(
      "Excel generation error:",
      error
    );

    alert(
      "Unable to generate Excel file."
    );
  }
};


  /*
    =====================================================
    Get table value
    =====================================================
  */

  const getValue = (
    item,
    keys,
    fallback = "-"
  ) => {

    for (
      const key of keys
    ) {

      if (
        item?.[key] !==
        undefined &&
        item?.[key] !==
        null
      ) {

        return item[key];
      }
    }

    return fallback;
  };


  return (

    <main className="main-content">

      {/* =================================================
          DASHBOARD
      ================================================= */}

      <section className="dashboard-section">

        <div className="dashboard-header">

          <div>

            <h2>
              📊 Master Output Preview
            </h2>

            <p>
              AI-generated CAP counselling
              recommendations
            </p>

          </div>


          <button
            className="download-btn"

            onClick={
              handleDownload
            }

            disabled={
              recommendations.length === 0
            }
          >
            ⬇ Download Excel
          </button>

        </div>


        {/* =================================================
            PROFILE SUMMARY
        ================================================= */}

        {/* <div className="profile-summary">

          <div>
            <strong>
              Percentile
            </strong>

            <span>
              {profile?.ui_percentile}
            </span>
          </div>


          <div>
            <strong>
              Category
            </strong>

            <span>
              {profile?.ui_category}
            </span>
          </div>


          <div>
            <strong>
              Branch
            </strong>

            <span>
              {profile?.ui_stream}
            </span>
          </div>


          <div>
            <strong>
              City
            </strong>

            <span>
              {profile?.ui_city}
            </span>
          </div>

        </div> */}


        {/* =================================================
            STAT CARDS
        ================================================= */}

        <div className="stats-grid">

          <div className="stat-card">

            <span className="stat-label">
              Total
            </span>

            <strong>
              {totalCount}
            </strong>

          </div>


          <div className="stat-card">

            <span className="stat-label">
              Dream
            </span>

            <strong>
              {dreamCount}
            </strong>

          </div>


          <div className="stat-card">

            <span className="stat-label">
              Target
            </span>

            <strong>
              {targetCount}
            </strong>

          </div>


          <div className="stat-card">

            <span className="stat-label">
              Safe
            </span>

            <strong>
              {safeCount}
            </strong>

          </div>

        </div>


        {/* =================================================
            RECOMMENDATIONS
        ================================================= */}

        <div className="recommendation-section">

          <h3>
            Recommended Colleges
          </h3>


          {recommendations.length ===
          0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                🎓
              </div>

              <h4>
                No recommendations yet
              </h4>

              <p>
                Enter the candidate
                profile and click
                "Generate Report".
              </p>

            </div>

          ) : (

            <div className="table-wrapper">

              <table className="recommendation-table">

                <thead>

                  <tr>

                    <th>
                      Rank
                    </th>

                    <th>
                      College
                    </th>

                    <th>
                      Branch
                    </th>

                    <th>
                      Cutoff
                    </th>

                    <th>
                      Percentile
                    </th>

                    <th>
                      Gap
                    </th>

                    <th>
                      Zone
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {recommendations.map(
                    (
                      item,
                      index
                    ) => (

                      <tr
                        key={
                          item?.rank ||
                          index
                        }
                      >

                        <td>
                          {getValue(
                            item,
                            [
                              "rank",
                              "preference_rank",
                            ],
                            index + 1
                          )}
                        </td>


                        <td>
                          {getValue(
                            item,
                            [
                              "college",
                              "college_name",
                              "name",
                            ]
                          )}
                        </td>


                        <td>
                          {getValue(
                            item,
                            [
                              "branch",
                              "branch_name",
                              "program",
                            ]
                          )}
                        </td>


                        <td>
                          {getValue(
                            item,
                            [
                              "historical_cutoff",
                              "cutoff",
                              "closing_percentile",
                            ]
                          )}
                        </td>


                        <td>
                          {getValue(
                            item,
                            [
                              "student_percentile",
                              "percentile",
                            ],
                            profile?.ui_percentile
                          )}
                        </td>


                        <td>
                          {getValue(
                            item,
                            [
                              "gap",
                              "cutoff_gap",
                            ]
                          )}
                        </td>


                        <td>

                          <span
                            className={`zone-badge ${
                              String(
                                getValue(
                                  item,
                                  [
                                    "zone",
                                    "bucket",
                                    "category",
                                  ],
                                  ""
                                )
                              )
                                .toLowerCase()
                                .replace(
                                  /\s+/g,
                                  "-"
                                )
                            }`}
                          >
                            {getValue(
                              item,
                              [
                                "zone",
                                "bucket",
                                "category",
                              ]
                            )}
                          </span>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </section>

    </main>
  );
}


export default MainContent;
