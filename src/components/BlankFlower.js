import React from "react";

function BlankFlower(props) {
  const {
    width,
    height,
    colorOne,
    colorTwo,
    colorThree,
    colorFour,
    colorFive,
    colorSix,
  } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      version="1.1"
      viewBox="20 80 170 160"
    >
      <g>
        <g
          fill="#fff"
          fillOpacity="1"
          strokeDasharray="none"
          strokeMiterlimit="4"
          strokeOpacity="1"
        >
          <ellipse
            cx="108.511"
            cy="158.389"
            fillRule="nonzero"
            stroke="#000"
            strokeWidth="1.624"
            rx="26.226"
            ry="26.236"
          ></ellipse>
          <path
            id="petal-one"
            fill={colorOne}
            stroke="#000"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeWidth="1.565"
            d="M126.566 90.797c-18.293-12.082-46.995-3.813-45.627 20.02 10.259 6.089 16.923 12.223 24.714 21.08 12.048.238 17.433 2.784 24.368 10.673 4.91-17.95 11.343-39.926-3.455-51.773z"
          ></path>
          <path
            id="petal-two"
            fill={colorTwo}
            stroke="#000"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeWidth="1.565"
            d="M176.07 140.131c1.317-21.883-20.194-42.605-40.151-29.503-.143 11.928-2.124 20.766-5.898 31.942 5.818 10.553 6.305 16.49 2.94 26.44 18.002-4.722 40.249-10.14 43.11-28.879z"
          ></path>
          <path
            id="petal-three"
            fill={colorThree}
            stroke="#000"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeWidth="1.565"
            d="M158.098 207.671c19.61-9.801 26.8-38.792 5.475-49.524-10.402 5.84-19.046 8.544-30.612 10.863-6.23 10.315-11.127 13.705-21.427 15.767 13.09 13.228 28.905 29.786 46.564 22.894z"
          ></path>
          <path
            id="petal-four"
            fill={colorFour}
            stroke="#000"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeWidth="1.565"
            d="M90.62 225.876c18.294 12.082 46.996 3.813 45.627-20.02-10.258-6.089-16.922-12.223-24.713-21.08-12.048-.238-17.433-2.784-24.368-10.673-4.911 17.95-11.343 39.926 3.455 51.773z"
          ></path>
          <path
            id="petal-five"
            fill={colorFive}
            stroke="#000"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeWidth="1.565"
            d="M41.116 176.542c-1.317 21.883 20.195 42.605 40.152 29.503.143-11.928 2.124-20.766 5.898-31.942-5.818-10.553-6.305-16.49-2.94-26.44-18.002 4.722-40.249 10.14-43.11 28.879z"
          ></path>
          <path
            id="petal-six"
            fill={colorSix}
            stroke="#000"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeWidth="1.565"
            d="M59.089 109.002c-19.61 9.801-26.8 38.792-5.475 49.524 10.402-5.84 19.046-8.544 30.612-10.863 6.23-10.315 11.127-13.705 21.427-15.767-13.09-13.228-28.905-29.786-46.564-22.894z"
          ></path>
        </g>
      </g>
    </svg>
  );
}

export default BlankFlower;

// pass array through to petals - in petal SVG, we can escape to javascript (color[0], color[1],etc)
