import React from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

import "../App.css";

const qrcodeRegionId = "html5qr-code-full-region";

class Html5QrcodePlugin extends React.Component {
  constructor(props) {
    super(props);
    this.html5QrcodeScanner = null;
  }

  componentWillUnmount() {
    if (this.html5QrcodeScanner) {
      this.html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    }
  }

  componentDidMount() {
    this.createHtml5QrcodeScanner();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.qrCodeSuccessCallback !== this.props.qrCodeSuccessCallback) {
      // Re-create the scanner if the success callback prop changes
      this.createHtml5QrcodeScanner();
    }
  }

  createHtml5QrcodeScanner() {
    // Creates the configuration object for Html5QrcodeScanner.
    function createConfig(props) {
      var config = {};
      if (props.fps) {
        config.fps = props.fps;
      }
      if (props.qrbox) {
        config.qrbox = props.qrbox;
      }
      if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
      }
      if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
      }
      return config;
    }

    var config = createConfig(this.props);
    var verbose = this.props.verbose === true;

    // Success callback is required.
    if (!this.props.qrCodeSuccessCallback) {
      throw new Error("qrCodeSuccessCallback is a required callback.");
    }

    this.html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    this.html5QrcodeScanner.render(
      this.props.qrCodeSuccessCallback,
      this.props.qrCodeErrorCallback
    );
  }

  render() {
    return <div id={qrcodeRegionId} />;
  }
}

export default Html5QrcodePlugin;
