import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src="/static/taskx.jpg" sx={{ width: 120, height: 120 , ...sx}} />;
}
