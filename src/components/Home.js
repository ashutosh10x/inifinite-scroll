import React from "react";
import "../css/home.css";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      fetching: true,
      currentPage: 0
    };
    const page = this.state.currentPage;
    this.fetchData(page);
  }

  fetchData(page) {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          images: [...this.state.images, ...data],
          fetching: false
        });
      })
      .catch((e) => {
        throw new Error("Error while fetching the imagess" + e);
      });
  }

  componentDidMount() {
    const options = {
      root: null
    };

    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );

    this.observer.observe(this.loadingRef);
  }

  componentDidUnmount() {
    this.observer = null;
  }

  handleObserver(entries, observer) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        const page = this.state.currentPage + 1;
        this.setState({
          currentPage: page,
          fetching: true
        });

        this.fetchData(page);
      }
    });
  }

  logout() {
    this.props.history.push("/login");
  }

  render() {
    const loderStyle = {
      display: this.state.fetching ? "block" : "none"
    };

    return (
      <div>
        <div>
          <button className="logout" onClick={() => this.logout()}>
            Logout
          </button>
        </div>
        <div className="body">
          <div className="content">
            {this.state.images.map((image, index) => {
              const { author, download_url } = image;
              return (
                <div className="card" key={index}>
                  <div className="card-body">
                    <img
                      alt={author}
                      data-src={download_url}
                      className="card-body-img"
                      src={
                        "https://picsum.photos/id/870/300/300?grayscale&blur=2"
                      }
                    ></img>
                  </div>
                  <div class="card-footer">
                    <p>
                      {index + 1} : {author}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div ref={(loadingRef) => (this.loadingRef = loadingRef)}>
            <div style={loderStyle} className="fetching">
              Loading...
            </div>
          </div>
        </div>
      </div>
    );
  }
}
