import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../../../assets/404-page-animation-example.gif";

const ErrorPage = () => {
  return (
    <section className="flex items-center h-screen w-full p-16 bg-white text-gray-900">
      <div className="container flex w-full flex-col items-center justify-center md:px-5 mx-auto my-8">
        <div className="w-full md:max-w-md text-center">
          <div>
            <img className="object-cover" src={errorImage} alt="Error Page" />
          </div>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 text-gray-700">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            to="/"
            className="px-8 py-3 btn btn-primary font-semibold rounded text-white"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
