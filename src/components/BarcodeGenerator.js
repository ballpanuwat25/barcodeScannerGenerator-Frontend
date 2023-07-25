import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";

import "../App.css";

function BarcodeGenerator() {
    const [barcode, setBarcode] = useState("Barcode Content");
    const barcodeRef = useRef(null);

    const handleChange = (event) => {
        setBarcode(event.target.value);
    };

    const downloadBarcode = () => {
        if (!barcodeRef.current) return;

        html2canvas(barcodeRef.current).then((canvas) => {
            const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            const downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "mybarcode.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Barcode Generator</h1>
                <Link to="/" className="link">Go to Barcode Scanner</Link>
            </div>

            <div className="mt-3 mb-3">
                <label>Barcode content</label>
                <input
                    type="text"
                    onChange={handleChange}
                    value={barcode}
                    placeholder="Barcode content"
                    className="form-control"
                />
            </div>

            <div ref={barcodeRef} className="d-flex justify-content-center align-items-center" >
                {barcode.trim() !== "" ? <Barcode value={barcode} background="#ffffff" /> : <p>No barcode preview</p>}
            </div>

            <div className="d-flex justify-content-center align-items-center">
                {barcode && (
                    <div style={{ marginTop: 30 }}>
                        <button className="btn btn-success" onClick={downloadBarcode} style={{ marginLeft: 10 }}>
                            Download Barcode
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BarcodeGenerator;