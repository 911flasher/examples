import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import * as qwest from 'qwest';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function SimpleDialog(props) {
  const { onClose, open, id, info } = props;
  const handleClose = () => {
    onClose();
  };
  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog fullWidth={true} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Image detailed view</DialogTitle>
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={200}
        defaultPositionY={100}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <div className="tools">
              <button onClick={zoomIn}>+</button>
              <button onClick={zoomOut}>-</button>
              <button onClick={resetTransform}>x</button>
            </div>
            <TransformComponent>
              <LazyLoadImage
                        alt=""
                        src={info.download_url} // use normal <img> attributes as props
                        width="100%" 
                        effect="blur"/>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  info: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {
  const [open, setOpen] = React.useState(false);
  const { info } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
   
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Detail image view.
      </Button>
      
      <SimpleDialog open={open} onClose={handleClose} info={info} />
    </div>
  );
}

