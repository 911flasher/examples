import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button
} from "@material-ui/core";
import { MdFavorite } from "react-icons/md";

import Layout from "../components/layout";
import InfiniteScroll from 'react-infinite-scroller';
import * as qwest from 'qwest';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { createStore, useStore } from "react-hookstore";
//createStore("homeStore", null);
const imageList = [];
const api = {
    baseUrl: 'https://picsum.photos/v2/list',
    limit:10
};


class Homepage extends React.Component {
  state = {
    images: [],
    items: 10,
    loadingState: false,
   
    tracks: [],
    hasMoreItems: true,
    pageIndex:1
  };
  
  ///
  loadItems(page) {
    
    if(this.state.loadingState){
      return;
    }
    
    var self = this;
    var url = api.baseUrl /*+ '/users/8665091/favorites'*/;
   // const [ storeTracks, setTracks ] = useStore('homeStore');
  
    qwest.get(url, {
           // client_id: api.client_id,
           page: this.state.pageIndex,
           limit: api.limit
        }, {
            cache: true
        })
        .then(function(xhr, resp) {
            if(resp) {
                var tracks = self.state.tracks;
                resp.map((track) => {
                    /*if(track.artwork_url == null) {
                        track.artwork_url = track.user.avatar_url;
                    }*/
                    tracks.push(track);
                });
               // setTracks(tracks);
                self.setState({ loadingState: true });
                //delay
                setTimeout(() => {
                  
                  self.setState({tracks: tracks, pageIndex: self.state.pageIndex + 1, loadingState: false });
                  window.tracks = tracks;
                }, 3000);

            }
        });
}
  likeImage = () => {};
  /*<CardMedia
  style={{ paddingTop: '56.25%' }}
  image={track.download_url}
  title={track.author}
/>*/
  render() {

    const loader = <div  key="1232edqda" >Loading ...</div>;

        var items = [];
        this.state.tracks.map((track, i) => {
          items.push(
                <Grid item xs={4} key={i.toString()} >
                  <Card>
                    <CardHeader title={<Link to="/">{track.id}</Link>} />
                    <Link to={`/image/${track.id}`}>
                      <LazyLoadImage
                        alt=""
                        src={track.download_url} // use normal <img> attributes as props
                        width="100%" 
                        effect="blur"/>
                    </Link>
                    <span>{track.author}</span>
                    
                    <CardActions disableSpacing>
                      <Button>
                        <MdFavorite /> 0
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
            );
        });

    return (
      <>
       <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={loader}>
               <Layout>
                  <p className="loading">Loaded pages:{this.state.pageIndex}</p>
                  <Grid container
                    direction="row"
                    justify="center"
                    alignItems="flex-start" 
                    xs={12}>
                    
                    {items}

                  </Grid>
                </Layout>
                
            </InfiniteScroll>
      {this.state.loadingState ? <p className="loading"> loading More Items..</p> : ""}
      </>
    );
  }
}

export default Homepage;
