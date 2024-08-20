
"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {

  const sitemaps = [
    // {
    //   name: "Features",
    //   paths: [
    //     {
    //       name: "Cool stuff",
    //       path: "/",
    //     },
    //     {
    //       name: "Random feature",
    //       path: "/",
    //     },
    //     {
    //       name: "Team feature",
    //       path: "/",
    //     },
    //     {
    //       name: "Stuff for developers",
    //       path: "/",
    //     },
    //     {
    //       name: "Another one",
    //       path: "/",
    //     },
    //     {
    //       name: "Last time",
    //       path: "/",
    //     },
    //   ],
    // },
    {
      name: "Resources",
      paths: [
        {
          name: "Resource",
          path: "/",
        },
        {
          name: "Resource name",
          path: "/",
        },
        {
          name: "Another resource",
          path: "/",
        },
        {
          name: "Final resource",
          path: "/",
        },
      ],
    },
    {
      name: "About",
      paths: [
        {
          name: "Team",
          path: "/",
        },
        {
          name: "Locations",
          path: "/",
        },
        {
          name: "Privacy",
          path: "/",
        },
        {
          name: "Terms",
          path: "/",
        },
      ],
    },
    {
      name: "Contact",
      paths: [
        {
          name: "Help",
          path: "/",
        },
        {
          name: "Sales",
          path: "/",
        },
        {
          name: "Advertise",
          path: "/",
        },
      ],
    },
    {
      name: "Legal",
      paths: [
        {
          name: "Claim",
          path: "/",
        },
        {
          name: "Terms of Services",
          path: "/",
        },
        {
          name: "Privacy & Policy",
          path: "/",
        },
      ],
    },
    {},
    {
      name: "Stay Connected",
      paths: [
        {
          name: "Facebook",
          path: "https://www.facebook.com/devhasibulislam/",
        },
        {
          name: "LinkedIn",
          path: "https://www.linkedin.com/in/devhasibulislam/",
        },
        {
          name: "GitHub",
          path: "https://github.com/devhasibulislam/",
        },
      ],
    },
  ];

  return (
    <footer className="footer-1 bg-white py-8 sm:py-12 mt-4 p-6 rounded-xl max-w-7xl mx-auto">
      <div className="container mx-auto px-4 flex flex-col gap-y-10">
        <div className="flex md:flex-row md:flex-wrap md:justify-between flex-col gap-x-4 gap-y-8">
          {sitemaps?.map((sitemap, index) => (
            <div key={index} className="flex flex-col gap-y-3">
              <h2 className="text-2xl">{sitemap.name}</h2>
              <div className="flex flex-col gap-y-1.5">
                {sitemap?.paths?.map((path, index) => (
                  <Link key={index} href={path?.path} className="text-base">
                    {path?.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
