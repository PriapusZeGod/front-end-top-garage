
import React from "react";
import ImageUploader from "react-images-upload";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    //// Here we can add to the images to the server or maybe possibly store them on the application but I dont know how:(
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles)
    });
  }

  render() {
    return (
      <ImageUploader style={{ maxWidth: '10000px', margin: "20px auto" }}
       withPreview={true} />
    );
  }
}

 export default App;





