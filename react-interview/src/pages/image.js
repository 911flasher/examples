import React, { useState } from "react";
import { BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams} from "react-router-dom";
import {
  Grid,
  IconButton, Typography
} from "@material-ui/core";
import { MdFileDownload } from "react-icons/md";

import Layout from "../components/layout";
import * as qwest from 'qwest';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Dialog from '../components/image/dialog';
import Detail from '../components/image/detail';
import { createStore, useStore } from 'react-hookstore';
import _ from 'lodash';

const ImagePage = () => {
  const [track, setTrack] = useState(0); 
  const self = this;
  let { id } = useParams();
  let match = useRouteMatch();
  
  //const [ storeTracks ] = useStore('homeStore');
  let indexId = 0;//_.indexOf(storeTracks, id);
  let prevId = 0;//storeTracks[indexId-1];
  let nextId = 10;//storeTracks[indexId+1];
    qwest.get(`https://picsum.photos/id/${id}/info`, {

      }, {
        cache: true
      })
      .then(function(xhr, resp) {
        if(resp) {
          setTrack(resp);
        }
      });
       /*id: "10"
      author: "Paul Jarvis"
      width: 2500
      height: 1667
      url: "https://unsplash.com/photos/6J--NXulQCs"
      download_url: "https://picsum.photos/id/10/2500/1667"
      */
    return (

      <Layout>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item>
                <IconButton>
                  <MdFileDownload />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={12} direction="column" spacing={2}>
          
            <Grid item xs={6}>
              <LazyLoadImage
                alt=""
                height={"100%"}
                src={track.download_url} // use normal <img> attributes as props
                width="100%" 
                effect="blur"/>
            </Grid>
            <Grid item xs={6}>
              <Detail info = {track}/>
              <Dialog info={track}/>
            </Grid>
          </Grid>
        </Grid>
        <div>
          <Typography variant="h5">Related images</Typography>
          <Grid container spacing={2} justify="space-between">
            { prevId >= 0 ?<Grid item>
              <Link to={`/image/${prevId}`}>Previous</Link>
            </Grid> : <></>}
            {/*storeTracks.length <=*/ nextId ? <Grid item>
              <Link to={`/image/${nextId}`}>Next</Link>
            </Grid> : <></>}
          </Grid>
        </div>
      </Layout>
    );
}

export default ImagePage;


