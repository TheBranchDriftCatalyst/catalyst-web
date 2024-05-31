import { motion } from "framer-motion";
import React from "react";
import Tilt from "react-tilt";
import { jsonResume, services } from "../constants/index";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({index, title, icon, level, keywords}) => {

  const imageMapping = {
    'Experimenting': '',
    'Frontend': '',
    'Backend': '',
    'Technical Design': '',
    'Project Management': '',
    'Git-Ops/IAC': ''
  }

  return (
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div
        variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <div
          options={{max: 45, scale: 1, speed: 450}}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
        >
          <img
            src={icon}
            alt='web-development'
            className='w-16 h-16 object-contain'
          />

          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
}

const About = () => {
  console.log('services', services)
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
        {/*<Ball icon={github}/>*/}
      </motion.div>


      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className='text-[17px] leading-[30px]'
      >
        <div className={'mt-20 flex flex-wrap gap-10'}>
        <span>
          <p>{jsonResume.basics.summary}</p>
        </span>
          {/*<Tilt href="resume.html" className='xs:w-[250px] w-full'>*/}
          {/*  <motion.div*/}
          {/*    variants={fadeIn("right", "spring", 0, 0.75)}*/}
          {/*    className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'*/}
          {/*  >*/}
          {/*    <div*/}
          {/*      options={{max: 45, scale: 1, speed: 450}}*/}
          {/*      className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'*/}
          {/*    >*/}
          {/*      <img*/}
          {/*        src={'resume.png'}*/}
          {/*        alt='resume'*/}
          {/*      />*/}

          {/*      <h3 className='text-white text-[20px] font-bold text-center'>*/}
          {/*        Resume*/}
          {/*      </h3>*/}
          {/*    </div>*/}


          {/*  </motion.div>*/}
          {/*</Tilt>*/}
        </div>

      </motion.div>

      {/*<div className='mt-20 flex flex-wrap gap-10'>*/}
      {/*  {services.map((service, index) => (*/}
      {/*    <ServiceCard key={service.title} index={index} {...service} />*/}
      {/*  ))}*/}
      {/*</div>*/}
    </>
  );
};

export default SectionWrapper(About, "about");
