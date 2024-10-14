import './Loader.css';
import { Backdrop, CircularProgress } from '@mui/material';

// eslint-disable-next-line react/prop-types
const Loader = ({ isLoading = true }) => {
  return (
    <div className="loader-overlay">
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}  // Always open on render based on the prop
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loader;
