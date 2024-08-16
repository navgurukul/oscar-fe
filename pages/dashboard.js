import React from "react";
import withAuth from '../components/WithAuth';
import Audio from '../components/ReacodringView'

const dashboard = () => {
  return (
    <div>
      <Audio/>
    </div>
  );
};

export default withAuth(dashboard);
