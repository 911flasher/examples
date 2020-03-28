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
  constructor(props){
    super(props);
    this.loadItems = this.loadItems.bind(this);
    this.getURLResp = this.getURLResp.bind(this);
    this.getURL = this.getURL.bind(this);
  }

  state = {
    images: [],
    items: 10,
    loadingState: false,
   
    tracks: [],
    hasMoreItems: true,
    pageIndex:1
  };

  loadItems = (page)=>{
      if(this.state.loadingState){
      return;
    }
    var url = api.baseUrl;
    qwest.get(url, {
          page: this.state.pageIndex,
          limit: api.limit
        }, {
            cache: true
        }).then(this.getURL);
  };

  getURL = (xhr, resp) => {
    if(resp) {
      debugger;
      this.getURLResp(resp);
    }
  }

  getURLResp = (resp) => {
    var tracks = this.state.tracks;
    resp.map((track) => {
        tracks.push(track);
    });
    this.setState({ loadingState: true });
    setTimeout(() => {
      this.setState({tracks: tracks, pageIndex: this.state.pageIndex + 1, loadingState: false });
    }, 3000);
  }

  likeImage = () => {};
  componentDidMount(){

  }

  render() {
    const loader = <div  key="1232edqda" >Loading ...</div>;
    debugger;
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
                loadMore={this.loadItems}
                hasMore={this.state.hasMoreItems}
                loader={loader}>
               <Layout>
                  <p className="loading">Loaded pages:{this.state.pageIndex}</p>
                  <Grid container
                    direction="row"
                    justify="center"
                    alignItems="flex-start" 
                   >
                    
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
