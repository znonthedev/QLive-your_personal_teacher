import React from "react";

export const RatingStar = ({ rating, blackListed, size,margin }) => {
  const cappedRating = Math.min(rating, 5);

  const fullStar = (
    <svg
      width={size || "16"}
      height={size || "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_6_235)">
        <path
          d="M7.04894 2.92705C7.3483 2.00574 8.6517 2.00574 8.95106 2.92705L9.5716 4.83688C9.70547 5.2489 10.0894 5.52786 10.5227 5.52786H12.5308C13.4995 5.52786 13.9023 6.76748 13.1186 7.33688L11.494 8.51722C11.1435 8.77187 10.9968 9.22323 11.1307 9.63525L11.7512 11.5451C12.0506 12.4664 10.9961 13.2325 10.2124 12.6631L8.58778 11.4828C8.2373 11.2281 7.7627 11.2281 7.41221 11.4828L5.78761 12.6631C5.0039 13.2325 3.94942 12.4664 4.24878 11.5451L4.86932 9.63526C5.00319 9.22323 4.85653 8.77186 4.50604 8.51722L2.88144 7.33688C2.09773 6.76748 2.50051 5.52786 3.46923 5.52786H5.47735C5.91057 5.52786 6.29453 5.2489 6.4284 4.83688L7.04894 2.92705Z"
          fill={blackListed ? "#BEC7CE" : "#A5E755"}
          stroke="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_6_235">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const halfStar = (
    <svg
      width={size || "16"}
      height={size || "16"}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.04894 2.92705C7.3483 2.00574 8.6517 2.00574 8.95106 2.92705L9.5716 4.83688C9.70547 5.2489 10.0894 5.52786 10.5227 5.52786H12.5308C13.4995 5.52786 13.9023 6.76748 13.1186 7.33688L11.494 8.51722C11.1435 8.77187 10.9968 9.22323 11.1307 9.63525L11.7512 11.5451C12.0506 12.4664 10.9961 13.2325 10.2124 12.6631L8.58778 11.4828C8.2373 11.2281 7.7627 11.2281 7.41221 11.4828L5.78761 12.6631C5.0039 13.2325 3.94942 12.4664 4.24878 11.5451L4.86932 9.63526C5.00319 9.22323 4.85653 8.77186 4.50604 8.51722L2.88144 7.33688C2.09773 6.76748 2.50051 5.52786 3.46923 5.52786H5.47735C5.91057 5.52786 6.29453 5.2489 6.4284 4.83688L7.04894 2.92705Z"
        fill={blackListed ? "#BEC7CE" : "#A5E755"}
        stroke="black"
      />
      <g clipPath="url(#clip0_6_221)">
        <path
          d="M7.04894 2.92705C7.3483 2.00574 8.6517 2.00574 8.95106 2.92705L9.5716 4.83688C9.70547 5.2489 10.0894 5.52786 10.5227 5.52786H12.5308C13.4995 5.52786 13.9023 6.76748 13.1186 7.33688L11.494 8.51722C11.1435 8.77187 10.9968 9.22323 11.1307 9.63525L11.7512 11.5451C12.0506 12.4664 10.9961 13.2325 10.2124 12.6631L8.58778 11.4828C8.2373 11.2281 7.7627 11.2281 7.41221 11.4828L5.78761 12.6631C5.0039 13.2325 3.94942 12.4664 4.24878 11.5451L4.86932 9.63526C5.00319 9.22323 4.85653 8.77186 4.50604 8.51722L2.88144 7.33688C2.09773 6.76748 2.50051 5.52786 3.46923 5.52786H5.47735C5.91057 5.52786 6.29453 5.2489 6.4284 4.83688L7.04894 2.92705Z"
          fill="white"
          stroke="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_6_221">
          <rect width="8" height="16" fill="white" transform="translate(8)" />
        </clipPath>
      </defs>
    </svg>
  );

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(cappedRating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span
          key={i}
          style={{ display: "flex", alignItems: "center", margin: margin || "0 -1px" }}
        >
          {React.cloneElement(fullStar, { size: size })}
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span
          key={fullStars}
          style={{ display: "flex", alignItems: "center", margin: margin || "0 -1px" }}
        >
          {React.cloneElement(halfStar, { size: size })}
        </span>
      );
    }

    return stars;
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>{renderStars()}</div>
  );
};
