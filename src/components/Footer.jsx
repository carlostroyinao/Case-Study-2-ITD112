import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="about">
              <div className="logo">
                <img src="assets/images/black-logo.png" alt="key-insights Template" />
              </div>
              <p>
              The Filipino Emigrants Dataset provides an overview of emigration trends from the Philippines,
              capturing demographic and geographic details of Filipinos who have permanently settled abroad.
              The data helps policymakers, researchers, and the public understand migration patterns and their socio-economic impact.
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="key-insights">
              <h4>Key Insights</h4>
              <div className="row">
                <div className="col-lg-6">
                  <ul>
                    <li>Sex</li>
                    <li>Age Group</li>
                    <li>Civil Status</li>
                    <li>Education Level</li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <ul>
                    <li>Occupation</li>
                    <li>Place of Origin</li>
                    <li>Major Country</li>
                    <li>All Countries</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="contact-us">
              <h4>Contact Us for Recommendation</h4>
              <p>
                GMAIL: carlostroy.inao@g.msuiit.edu.ph
              </p>
              <p>
                FACEBOOK: <a href="https://www.facebook.com/carlosinao12315">Carlos Troy Razo Inao</a>
              </p>
              <div className="row">
                <div className="col-lg-6">0960 231 7887</div>
                <div className="col-lg-6">0935 888 4719</div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="sub-footer">
              <p>
                Copyright © 2025 All Rights Reserved.
                <br />
                Designed by: Carlos Troy Razo Inao
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
