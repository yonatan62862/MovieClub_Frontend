import React from 'react';
import barImage from '../assets/bar.png';
import nitzanImage from '../assets/nitzan.png';
import yonatanImage from '../assets/Yonatan.png';

const About = () => {
  return (
    <div className="flex flex-col items-center text-center p-8">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <br />
      <p className="max-w-2xl mb-6">
        We are three student developers who share a passion for movies. Our goal is to create an engaging
        platform that connects movie lovers and provides insightful content about films.
      </p>
      <br />
      <div className="flex justify-center space-x-12">
        <div className="flex flex-col items-center">
          <img
            src={barImage}
            alt="Bar Kobi"
            className="w-32 h-32 rounded-full object-cover"
          />
          <a
            href="https://www.linkedin.com/in/bar-kobi/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-600 hover:underline"
          >
            Bar Kobi
          </a>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={nitzanImage}
            alt="Nitzan Naveh"
            className="w-32 h-32 rounded-full object-cover"
          />
          <a
            href="https://www.linkedin.com/in/nitzannaveh/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-600 hover:underline"
          >
            Nitzan Naveh
          </a>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={yonatanImage}
            alt="Yonatan Cohen"
            className="w-32 h-32 rounded-full object-cover"
          />
          <a
            href="https://www.linkedin.com/in/yonatan-cohen-a22054312/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-600 hover:underline"
          >
            Yonatan Cohen
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
