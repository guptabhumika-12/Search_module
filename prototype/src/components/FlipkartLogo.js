import React from "react";

function FlipkartLogo() {
  return (
    <div>
      <div className="header_first">
        <img
          src="//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
          alt="Flipkart-logo"
        />
        <div className="header_first1">
          <span
            style={{
              fontSize: "11px",
              color: "white",
              fontStyle: "italic",
            }}
          >
            Explore
          </span>
          <span
            style={{
              color: "#f9e107",
              fontSize: "11px",
              fontStyle: "italic",
            }}
          >
            Plus
          </span>
          <span>
            <img
              width="10"
              src="
//img1a.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png"
              alt="plus-logo"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default FlipkartLogo;
