const ContactUs = () => {
  return (
    <div
      id="contact"
      className="py-4 mt-6 flex flex-col items-center justify-center space-y-5">
      <div className="relative w-full flex flex-col items-center justify-center">
        <p className="text-base font-bold text-gray-600 uppercase">
          {"don't"} hesitate
        </p>
        <span className="text-primary text-3xl font-semibold italic">
          Contuct Us
        </span>
      </div>
      <span className="text-gray-800 text-3xl font-semibold hover:text-gray-700 hover:border-b hover:border-gray-800/50 transition cursor-pointer">
        +961 81 234 567
      </span>
    </div>
  );
};

export default ContactUs;
