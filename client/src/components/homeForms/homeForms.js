import React from 'react';

import './homeForms.scss';

import { SongForm, SetForm } from './components';

const HomeForms = () => {
  return (
    <div className="temp-style-until-gigs-implementation">
      <SongForm />
      <SetForm />
    </div>
  );
};

export default HomeForms;
