import React from "react";

const AboutUs = () => {
  return (
    <div id="about" className="py-12 mt-5">
      <div className="relative w-full flex flex-col items-center justify-center">
        <p className="text-base font-bold text-gray-600 uppercase">our story</p>
        <span className="text-primary text-3xl font-semibold italic">
          About Us
        </span>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-y-1.5 mt-7">
        <span className="text-base font-medium text-gray-900 max-w-2xl text-center mb-4">
          {
            "Welcome to ST PIZZA - where pizza passion meets modern convenience! We're on a mission to redefine your pizza experience."
          }
        </span>
        <p className="max-w-lg text-center font-normal text-sm text-gray-700">
          🍕 Crafting Excellence: Our chefs use the finest ingredients to create
          pizza perfection, ensuring every bite is a taste sensation.
        </p>
        <p className="max-w-lg text-center font-normal text-sm text-gray-700 mt-2.5">
          🚀 Tech-Driven Convenience: Ordering is a breeze with our
          user-friendly app. Customize, track, and enjoy doorstep delivery with
          just a few taps.
        </p>
        <p className="max-w-lg text-center font-normal text-sm text-gray-700 mt-2.5">
          🤝 Community and Connection: Join our community of pizza lovers! Share
          your pizza moments and connect with fellow enthusiasts who appreciate
          the art of a perfect pizza.
        </p>
        <p className="max-w-lg text-center font-normal text-sm text-gray-700 mt-2.5">
          🌟 Your Pizza, Your Way: Explore our diverse menu, discover new
          flavors, and create your pizza, your way. Thank you for being a part
          of the [Your App Name] family. {"Let's"} share the joy of pizza
          together!
        </p>
      </div>

      <p></p>
    </div>
  );
};

export default AboutUs;
