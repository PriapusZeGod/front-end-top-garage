import React, { Component } from "react";
import ImageUploader from "react-images-upload";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      pictures: [],
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  

  async componentDidMount() {
    const response = await fetch("http://localhost:5027/Cars/2/image");
    const data = await response.blob();

  
    const url = URL.createObjectURL(data);

    this.setState({ image: url });
  }

  onDrop(pictureFiles, pictureDataURLs) {
    const formData = new FormData();
    formData.append("image", pictureFiles[0]);

    this.setState({
      pictures: this.state.pictures.concat(pictureFiles),
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", this.state.pictures[0]);

    fetch("http://localhost:5027/Cars/2/image", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const url = URL.createObjectURL(data);
        this.setState({ image: url });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <ImageUploader
            style={{ maxWidth: "10000px", margin: "20px auto" }}
            withPreview={true}
            withIcon={false}
            buttonText="Upload an image"
            onChange={this.onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
          <button type="submit">Submit</button>
        </form>
        {this.state.image && (
          <img src={this.state.image} alt="Car Image" width="300" height="300" />
        )}
      </div>
    );
  }
}




export default App;
