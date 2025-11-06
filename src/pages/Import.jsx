import React, { useState } from "react";
import Papa from "papaparse";
import { addEmigrant } from "../services/emigrants_CivilStatus";
import { addAgeGroup } from "../services/emigrants_Age";
import { addSexGroup } from "../services/emigrants_Sex";
import { addEducationLevel } from "../services/emigrants_EducationLevel";
import { addOccupationGroup } from "../services/emigrants_Occupation";
import { addOriginGroup } from "../services/emigrants_Origin";
import { addMajorCountryGroup } from "../services/emigrants_MajorCountry";
import { addAllCountriesGroup } from "../services/emigrants_AllCountries";

const Import = () => {
  const categories = [
    { name: "Age", icon: "assets/images/age-icon.png" },
    { name: "Sex", icon: "assets/images/sex-icon.png" },
    { name: "Civil Status", icon: "assets/images/civilstatus-icon.png" },
    { name: "Education Level", icon: "assets/images/educationlevel-icon.png" },
    { name: "Occupation", icon: "assets/images/occupation-icon.png" },
    { name: "Place of Origin", icon: "assets/images/origin-icon.png" },
    { name: "Major Country", icon: "assets/images/majorcountry-icon.png" },
    { name: "All Countries", icon: "assets/images/allcountry-icon.png" },
  ];

  const [files, setFiles] = useState({});
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const handleFileChange = (e, category) => {
    const file = e.target.files[0];
    setFiles((prev) => ({ ...prev, [category]: file }));
  };

  // ✅ Popup Helper
  const showPopup = (message, type = "success") => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 3000);
  };

  // ✅ Universal CSV Import Handler
  const handleImport = async (category) => {
    const file = files[category];
    if (!file) {
      showPopup(`Please choose a file for ${category} first.`, "error");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        const rows = result.data;

        try {
          // CIVIL STATUS
          if (category === "Civil Status") {
            for (const row of rows) {
              await addEmigrant({
                year: Number(row.year) || 0,
                single: Number(row.single) || 0,
                married: Number(row.married) || 0,
                widower: Number(row.widower) || 0,
                separated: Number(row.separated) || 0,
                divorced: Number(row.divorced) || 0,
                notReported: Number(row.notReported) || 0,
              });
            }
            showPopup("Civil Status CSV imported successfully!", "success");
          }

          // AGE
          else if (category === "Age") {
            for (const row of rows) {
              await addAgeGroup({
                year: Number(row.year) || 0,
                below14: Number(row.below14) || 0,
                "15-19": Number(row["15-19"]) || 0,
                "20-24": Number(row["20-24"]) || 0,
                "25-29": Number(row["25-29"]) || 0,
                "30-34": Number(row["30-34"]) || 0,
                "35-39": Number(row["35-39"]) || 0,
                "40-44": Number(row["40-44"]) || 0,
                "45-49": Number(row["45-49"]) || 0,
                "50-54": Number(row["50-54"]) || 0,
                "55-59": Number(row["55-59"]) || 0,
                "60-64": Number(row["60-64"]) || 0,
                "65-69": Number(row["65-69"]) || 0,
                above70: Number(row.above70) || 0,
                notReported: Number(row.notReported) || 0,
              });
            }
            showPopup("Age CSV imported successfully!", "success");
          }

          // SEX
          else if (category === "Sex") {
            for (const row of rows) {
              await addSexGroup({
                year: Number(row.year) || 0,
                male: Number(row.male) || 0,
                female: Number(row.female) || 0,
              });
            }
            showPopup("Sex CSV imported successfully!", "success");
          }

          // EDUCATION LEVEL
          else if (category === "Education Level") {
            for (const row of rows) {
              await addEducationLevel({
                year: Number(row.year) || 0,
                notOfSchoolingAge: Number(row.notOfSchoolingAge) || 0,
                noFormalEducation: Number(row.noFormalEducation) || 0,
                elementaryLevel: Number(row.elementaryLevel) || 0,
                elementaryGraduate: Number(row.elementaryGraduate) || 0,
                highSchoolLevel: Number(row.highSchoolLevel) || 0,
                highSchoolGraduate: Number(row.highSchoolGraduate) || 0,
                vocationalLevel: Number(row.vocationalLevel) || 0,
                vocationalGraduate: Number(row.vocationalGraduate) || 0,
                collegeLevel: Number(row.collegeLevel) || 0,
                collegeGraduate: Number(row.collegeGraduate) || 0,
                postGraduateLevel: Number(row.postGraduateLevel) || 0,
                postGraduate: Number(row.postGraduate) || 0,
                nonFormalEducation: Number(row.nonFormalEducation) || 0,
                notReported: Number(row.notReported) || 0,
              });
            }
            showPopup("Education Level CSV imported successfully!", "success");
          }

          // OCCUPATION
          else if (category === "Occupation") {
            for (const row of rows) {
              await addOccupationGroup({
                year: Number(row.year) || 0,
                professional: Number(row.professional) || 0,
                administrative: Number(row.administrative) || 0,
                clerical: Number(row.clerical) || 0,
                sales: Number(row.sales) || 0,
                service: Number(row.service) || 0,
                agriculture: Number(row.agriculture) || 0,
                production: Number(row.production) || 0,
                armedForces: Number(row.armedForces) || 0,
                housewives: Number(row.housewives) || 0,
                retirees: Number(row.retirees) || 0,
                students: Number(row.students) || 0,
                minors: Number(row.minors) || 0,
                outOfSchool: Number(row.outOfSchool) || 0,
                refugees: Number(row.refugees) || 0,
                noOccupationReported: Number(row.noOccupationReported) || 0,
              });
            }
            showPopup("Occupation CSV imported successfully!", "success");
          }

          // PLACE OF ORIGIN
          else if (category === "Place of Origin") {
            for (const row of rows) {
              await addOriginGroup({
                year: Number(row.year) || 0,
                regionI: Number(row.regionI) || 0,
                regionII: Number(row.regionII) || 0,
                regionIII: Number(row.regionIII) || 0,
                regionIVA: Number(row.regionIVA) || 0,
                regionIVB: Number(row.regionIVB) || 0,
                regionV: Number(row.regionV) || 0,
                regionVI: Number(row.regionVI) || 0,
                regionVII: Number(row.regionVII) || 0,
                regionVIII: Number(row.regionVIII) || 0,
                regionIX: Number(row.regionIX) || 0,
                regionX: Number(row.regionX) || 0,
                regionXI: Number(row.regionXI) || 0,
                regionXII: Number(row.regionXII) || 0,
                regionXIII: Number(row.regionXIII) || 0,
                armm: Number(row.armm) || 0,
                car: Number(row.car) || 0,
                ncr: Number(row.ncr) || 0,
              });
            }
            showPopup("Place of Origin CSV imported successfully!", "success");
          }

          // MAJOR COUNTRY
          else if (category === "Major Country") {
            for (const row of rows) {
              await addMajorCountryGroup({
                year: Number(row.year) || 0,
                usa: Number(row.usa) || 0,
                canada: Number(row.canada) || 0,
                japan: Number(row.japan) || 0,
                australia: Number(row.australia) || 0,
                italy: Number(row.italy) || 0,
                newZealand: Number(row.newZealand) || 0,
                unitedKingdom: Number(row.unitedKingdom) || 0,
                germany: Number(row.germany) || 0,
                southKorea: Number(row.southKorea) || 0,
                spain: Number(row.spain) || 0,
                others: Number(row.others) || 0,
              });
            }
            showPopup("Major Country CSV imported successfully!", "success");
          }

          // ALL COUNTRIES
          else if (category === "All Countries") {
            for (const row of rows) {
              await addAllCountriesGroup({
                year: Number(row.year) || 0,
                Philippines: Number(row.Philippines) || 0,
                Afghanistan: Number(row.Afghanistan) || 0,
                Albania: Number(row.Albania) || 0,
                Algeria: Number(row.Algeria) || 0,
                Angola: Number(row.Angola) || 0,
                Antarctica: Number(row.Antarctica) || 0,
                Argentina: Number(row.Argentina) || 0,
                Armenia: Number(row.Armenia) || 0,
                Australia: Number(row.Australia) || 0,
                Austria: Number(row.Austria) || 0,
                Azerbaijan: Number(row.Azerbaijan) || 0,
                Bahamas: Number(row.Bahamas) || 0,
                Bangladesh: Number(row.Bangladesh) || 0,
                Belarus: Number(row.Belarus) || 0,
                Belgium: Number(row.Belgium) || 0,
                Belize: Number(row.Belize) || 0,
                Benin: Number(row.Benin) || 0,
                Bhutan: Number(row.Bhutan) || 0,
                Bolivia: Number(row.Bolivia) || 0,
                "Bosnia and Herzegovina": Number(row["Bosnia and Herzegovina"]) || 0,
                Botswana: Number(row.Botswana) || 0,
                Brazil: Number(row.Brazil) || 0,
                "Brunei Darussalam": Number(row["Brunei Darussalam"]) || 0,
                Bulgaria: Number(row.Bulgaria) || 0,
                Burkina: Number(row.Burkina) || 0,
                Burundi: Number(row.Burundi) || 0,
                Cambodia: Number(row.Cambodia) || 0,
                Cameroon: Number(row.Cameroon) || 0,
                Canada: Number(row.Canada) || 0,
                "Central African Republic": Number(row["Central African Republic"]) || 0,
                Chad: Number(row.Chad) || 0,
                Chile: Number(row.Chile) || 0,
                China: Number(row.China) || 0,
                Colombia: Number(row.Colombia) || 0,
                "Ivory Coast": Number(row["Ivory Coast"]) || 0,
                "Costa Rica": Number(row["Costa Rica"]) || 0,
                Croatia: Number(row.Croatia) || 0,
                Cuba: Number(row.Cuba) || 0,
                Cyprus: Number(row.Cyprus) || 0,
                "Czech Republic": Number(row["Czech Republic"]) || 0,
                "Democratic Republic of the Congo": Number(row["Democratic Republic of the Congo"]) || 0,
                Denmark: Number(row.Denmark) || 0,
                Djibouti: Number(row.Djibouti) || 0,
                "Dominican Republic": Number(row["Dominican Republic"]) || 0,
                Ecuador: Number(row.Ecuador) || 0,
                Egypt: Number(row.Egypt) || 0,
                "El Salvador": Number(row["El Salvador"]) || 0,
                "Equatorial Guinea": Number(row["Equatorial Guinea"]) || 0,
                Eritrea: Number(row.Eritrea) || 0,
                Estonia: Number(row.Estonia) || 0,
                Ethiopia: Number(row.Ethiopia) || 0,
                "Falkland Islands": Number(row["Falkland Islands"]) || 0,
                Fiji: Number(row.Fiji) || 0,
                Finland: Number(row.Finland) || 0,
                France: Number(row.France) || 0,
                "French Southern and Antarctic Lands": Number(row["French Southern and Antarctic Lands"]) || 0,
                Gabon: Number(row.Gabon) || 0,
                Gambia: Number(row.Gambia) || 0,
                Georgia: Number(row.Georgia) || 0,
                Germany: Number(row.Germany) || 0,
                Ghana: Number(row.Ghana) || 0,
                Greece: Number(row.Greece) || 0,
                Greenland: Number(row.Greenland) || 0,
                Guatemala: Number(row.Guatemala) || 0,
                "Guinea Bissau": Number(row["Guinea Bissau"]) || 0,
                Guyana: Number(row.Guyana) || 0,
                Haiti: Number(row.Haiti) || 0,
                Honduras: Number(row.Honduras) || 0,
                Hungary: Number(row.Hungary) || 0,
                Iceland: Number(row.Iceland) || 0,
                India: Number(row.India) || 0,
                Indonesia: Number(row.Indonesia) || 0,
                Iran: Number(row.Iran) || 0,
                Iraq: Number(row.Iraq) || 0,
                Ireland: Number(row.Ireland) || 0,
                Israel: Number(row.Israel) || 0,
                Italy: Number(row.Italy) || 0,
                Jamaica: Number(row.Jamaica) || 0,
                Japan: Number(row.Japan) || 0,
                Kordan: Number(row.Kordan) || 0,
                Kazakhstan: Number(row.Kazakhstan) || 0,
                Kenya: Number(row.Kenya) || 0,
                Kosovo: Number(row.Kosovo) || 0,
                Kuwait: Number(row.Kuwait) || 0,
                Kyrgyzstan: Number(row.Kyrgyzstan) || 0,
                Laos: Number(row.Laos) || 0,
                Latvia: Number(row.Latvia) || 0,
                Lebanon: Number(row.Lebanon) || 0,
                Lesotho: Number(row.Lesotho) || 0,
                Liberia: Number(row.Liberia) || 0,
                Libya: Number(row.Libya) || 0,
                Lithuania: Number(row.Lithuania) || 0,
                Luxembourg: Number(row.Luxembourg) || 0,
                Macedonia: Number(row.Macedonia) || 0,
                Madagascar: Number(row.Madagascar) || 0,
                Malawi: Number(row.Malawi) || 0,
                Malaysia: Number(row.Malaysia) || 0,
                Mali: Number(row.Mali) || 0,
                Mauritania: Number(row.Mauritania) || 0,
                Mexico: Number(row.Mexico) || 0,
                Moldova: Number(row.Moldova) || 0,
                Mongolia: Number(row.Mongolia) || 0,
                Montenegro: Number(row.Montenegro) || 0,
                Morocco: Number(row.Morocco) || 0,
                Mozambique: Number(row.Mozambique) || 0,
                Myanmar: Number(row.Myanmar) || 0,
                Namibia: Number(row.Namibia) || 0,
                Nepal: Number(row.Nepal) || 0,
                Netherlands: Number(row.Netherlands) || 0,
                "New Caledonia": Number(row["New Caledonia"]) || 0,
                "New Zealand": Number(row["New Zealand"]) || 0,
                Nicaragua: Number(row.Nicaragua) || 0,
                Niger: Number(row.Niger) || 0,
                Nigeria: Number(row.Nigeria) || 0,
                "Northern Cyprus": Number(row["Northern Cyprus"]) || 0,
                "North Korea": Number(row["North Korea"]) || 0,
                Norway: Number(row.Norway) || 0,
                Oman: Number(row.Oman) || 0,
                Pakistan: Number(row.Pakistan) || 0,
                Panama: Number(row.Panama) || 0,
                "Papua New Guinea": Number(row["Papua New Guinea"]) || 0,
                Paraguay: Number(row.Paraguay) || 0,
                Peru: Number(row.Peru) || 0,
                Poland: Number(row.Poland) || 0,
                Portugal: Number(row.Portugal) || 0,
                "Puerto Rico": Number(row["Puerto Rico"]) || 0,
                Qatar: Number(row.Qatar) || 0,
                "Republic Of the Congo": Number(row["Republic Of the Congo"]) || 0,
                "Republic of Serbia": Number(row["Republic of Serbia"]) || 0,
                Romania: Number(row.Romania) || 0,
                "Russian Federation": Number(row["Russian Federation"]) || 0,
                Rwanda: Number(row.Rwanda) || 0,
                "Saudi Arabia": Number(row["Saudi Arabia"]) || 0,
                Senegal: Number(row.Senegal) || 0,
                "Sierra Leone": Number(row["Sierra Leone"]) || 0,
                "Slovak Republic": Number(row["Slovak Republic"]) || 0,
                Slovenia: Number(row.Slovenia) || 0,
                "Solomon Islands": Number(row["Solomon Islands"]) || 0,
                Somalia: Number(row.Somalia) || 0,
                Somaliland: Number(row.Somaliland) || 0,
                "South Africa": Number(row["South Africa"]) || 0,
                "South Korea": Number(row["South Korea"]) || 0,
                "South Sudan": Number(row["South Sudan"]) || 0,
                Spain: Number(row.Spain) || 0,
                "Sri Lanka": Number(row["Sri Lanka"]) || 0,
                Sudan: Number(row.Sudan) || 0,
                Suriname: Number(row.Suriname) || 0,
                Sweden: Number(row.Sweden) || 0,
                Switzerland: Number(row.Switzerland) || 0,
                Syria: Number(row.Syria) || 0,
                Tajikistan: Number(row.Tajikistan) || 0,
                Taiwan: Number(row.Taiwan) || 0,
                Thailand: Number(row.Thailand) || 0,
                Togo: Number(row.Togo) || 0,
                "Trinidad and Tobago": Number(row["Trinidad and Tobago"]) || 0,
                Tunisia: Number(row.Tunisia) || 0,
                Turkey: Number(row.Turkey) || 0,
                Turkmenistan: Number(row.Turkmenistan) || 0,
                Uganda: Number(row.Uganda) || 0,
                Ukraine: Number(row.Ukraine) || 0,
                "United Arab Emirates": Number(row["United Arab Emirates"]) || 0,
                "United Kingdom": Number(row["United Kingdom"]) || 0,
                "United Republic of Tanzania": Number(row["United Republic of Tanzania"]) || 0,
                "United States of America": Number(row["United States of America"]) || 0,
                Uruguay: Number(row.Uruguay) || 0,
                Uzbekistan: Number(row.Uzbekistan) || 0,
                Vanuatu: Number(row.Vanuatu) || 0,
                Venezuela: Number(row.Venezuela) || 0,
                Vietnam: Number(row.Vietnam) || 0,
                "West Bank": Number(row["West Bank"]) || 0,
                "Western Sahara": Number(row["Western Sahara"]) || 0,
                Yemen: Number(row.Yemen) || 0,
                Zambia: Number(row.Zambia) || 0,
                Zimbabwe: Number(row.Zimbabwe) || 0,
              });
            }
            showPopup("All Countries CSV imported successfully!", "success");
          }

          // If category is not matched
          else {
            showPopup(`"${file.name}" imported for ${category}. (Not yet implemented)`, "info");
          }

        } catch (error) {
          console.error(`Error importing ${category} CSV:`, error);
          showPopup(`Failed to import ${category} CSV.`, "error");
        }
      },
    });
  };

  return (
    <>
      {/* ✅ Popup Modal */}
      {popup.show && (
        <div
          className="popup-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="popup-box"
            style={{
              backgroundColor: popup.type === "error" ? "#ff4d4d" : "#2b2d42",
              color: "#fff",
              padding: "30px 40px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            <h3 style={{ marginBottom: "10px", fontWeight: "700" }}>
              {popup.type === "error"
                ? "Error"
                : popup.type === "info"
                ? "Notice"
                : "Imported Successfully!"}
            </h3>
            <p style={{ fontSize: "16px", marginBottom: "10px" }}>
              {popup.message}
            </p>
            <button
              onClick={() => setPopup({ show: false, message: "", type: "" })}
              style={{
                marginTop: "10px",
                backgroundColor: "#fff",
                color: "#000",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Page Heading */}
      <div className="page-heading">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="top-text header-text">
                <h6>Import File for Filipino Emigrants Data</h6>
                <h2>
                  Import and explore the Filipino Emigrants Dataset — a
                  comprehensive collection of data on Filipino migration.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Import Section */}
      <div className="listing-page">
        <div className="container">
          <div className="row">
            {categories.map((cat) => (
              <div
                className="col-lg-6 d-flex align-items-center mb-4"
                key={cat.name}
              >
                {/* Category Card */}
                <div
                  className="category-card d-flex align-items-center justify-content-center me-3"
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#262B40",
                    borderRadius: "10px",
                    width: "220px",
                    height: "100px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="text-center">
                    <img
                      src={cat.icon}
                      alt={cat.name}
                      style={{ width: "35px", marginBottom: "8px" }}
                    />
                    <div style={{ fontWeight: "600" }}>{cat.name}</div>
                  </div>
                </div>

                {/* File Upload Panel */}
                <div
                  className="file-panel d-flex flex-column justify-content-center p-3"
                  style={{
                    backgroundColor: "#8d99af",
                    borderRadius: "10px",
                    flex: 1,
                  }}
                >
                  <div
                    className="file-info d-flex align-items-center justify-content-between mb-2"
                    style={{
                      backgroundColor: "#8d99af",
                      padding: "10px 15px",
                      borderRadius: "6px",
                      color: "#fff",
                    }}
                  >
                    <span>
                      {files[cat.name] ? files[cat.name].name : "File Name"}
                    </span>
                    <label
                      style={{
                        backgroundColor: "#fff",
                        color: "#000",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      Choose File
                      <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleFileChange(e, cat.name)}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                  <button
                    onClick={() => handleImport(cat.name)}
                    style={{
                      backgroundColor: "transparent",
                      color: "#fff",
                      border: "2px solid #fff",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      fontWeight: "500",
                      transition: "0.2s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#fff";
                      e.currentTarget.style.color = "#000";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#fff";
                    }}
                  >
                    Import
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Import;
