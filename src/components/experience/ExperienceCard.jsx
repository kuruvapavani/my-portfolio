import React from 'react';

const ExperienceCard = ({ position, company, image, blogLink }) => {
  return (
    <div className="bg-white/30 backdrop-blur-md shadow-lg rounded-lg p-6 m-4 max-w-sm mx-auto transition-transform transform hover:scale-105 experience-card">
      <div className="text-left">
        <h3 className="text-xl font-semibold text-gray-800">{position}</h3>
        <p className="text-md text-gray-700">{company}</p>
      </div>
      <div className="mt-4">
        <img
          src={image}
          alt="Completion or Offer Letter"
          className="w-full h-40 object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="mt-4">
        <a
          href={blogLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Know More
        </a>
      </div>
    </div>
  );
};

export default ExperienceCard;
