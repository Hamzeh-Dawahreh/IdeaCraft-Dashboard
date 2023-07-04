import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "daisyui";

const ContactForm = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const handleContact = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        `http://localhost:3500/dashboard/createAndUpdateContact`,
        {
          email: email,
          phone: phone,
          location: location,
        },
        config
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleContact}>
        <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
          <div className=" ">
            <section className="bg-gray-100 py-10 sm:py-16 lg:py-24">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                    update contact us information
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500">
                    You can contact us anytime to share your ideas on how to
                    improve our company. We value your support and would be glad
                    to have you as a valuable contributor.
                  </p>
                </div>

                <div className="mx-auto mt-12 max-w-5xl sm:mt-16">
                  <div className="grid grid-cols-1 gap-6 px-8 text-center md:grid-cols-3 md:px-0">
                    <div className="overflow-hidden rounded-xl bg-white">
                      <div className="p-6">
                        <svg
                          className="mx-auto h-10 w-10 flex-shrink-0 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            fill="#2E594A"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <p className="mt-6 text-lg font-medium text-gray-900">
                          {/* <a href="tel:+962790012079">+962 790012079</a> */}
                        </p>

                        <input
                          required
                          type="text"
                          placeholder="0712345678"
                          className="input input-bordered input-success w-full max-w-xs"
                          value={phone}
                          pattern="07\d{8}"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-xl bg-white">
                      <div className="p-6">
                        <svg
                          className="mx-auto h-10 w-10 flex-shrink-0 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            fill="#2E594A"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="mt-6 text-lg font-medium text-gray-900"></p>
                        <input
                          required
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered input-success w-full max-w-xs"
                          value={email}
                          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-wrap justify-center">
                        <button className="btn btn-outline btn-success flex w-20 bg-black">
                          Update
                        </button>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-xl bg-white">
                      <div className="p-6">
                        <svg
                          className="mx-auto h-10 w-10 flex-shrink-0 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            fill="#2E594A"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            fill="#2E594A"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <p className="mt-6 text-lg font-medium leading-relaxed text-gray-900">
                          {/* <a
                            href="https://goo.gl/maps/5xLRKXYoJmdNnYtw6?coh=178573&entry=tt"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Our Location
                          </a> */}
                        </p>
                        <input
                          required
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered input-success w-full max-w-xs"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
