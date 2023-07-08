import React from 'react';

class ImageDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
    };
  }

  componentDidMount() {
    const { blob } = this.props;

    // Convert the Blob into a URL
    const imageUrl = URL.createObjectURL(blob);

    this.setState({ imageUrl });
  }

  componentWillUnmount() {
    // Clean up the URL when the component is unmounted
    URL.revokeObjectURL(this.state.imageUrl);
  }

  render() {
    const { imageUrl } = this.state;

    return (
      <div>
        <img src={imageUrl} alt="Blob Image" />
      </div>
    );
  }
}

export default ImageDisplay;
