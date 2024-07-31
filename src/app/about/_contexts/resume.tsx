import React, { createContext, useContext, useState } from 'react';
import useQuery from 'react-query'

// Create a context for the resume
const ResumeContext = createContext({});

// Custom hook to use the Resume context
export const useResume = () => {
  return useContext(ResumeContext);
};

// ResumeProvider component to wrap your app and provide the resume data
export const ResumeProvider = ({ children }) => {

  // useQuery()


  return (
    <ResumeContext.Provider value={{ resume, updateResume }}>
      {children}
    </ResumeContext.Provider>
  );
};
