import React, {useEffect, useState} from "react";
// import {Link} from "react-router-dom";
import Link from 'next/link'
import TextTransition, {presets} from 'react-text-transition';

// import {styles} from "../styles";
// import {navLinks, descriptors} from "../constants/index";
import {logo, menu, close} from "../assets";

const styles = {
  paddingX: 'px-5',
}

const navLinks = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
];

const descriptors = [
  "Web Developer",
  "Software Engineer",
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [descriptorIndex, setIndex] = React.useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((descriptorIndex) => descriptorIndex + 1),
      5000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          href='/'
          className='flex items-center gap-2'
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain'/>
          <div className='text-white text-[18px] font-bold cursor-pointer flex '>
            <span>DJ &nbsp; | &nbsp;</span>
            <TextTransition springConfig={presets.wobbly}>{descriptors[descriptorIndex % descriptors.length]}</TextTransition>
          </div>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`${nav.url}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`${nav.url}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
