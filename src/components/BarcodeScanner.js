import React, { useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { Link } from "react-router-dom";

import "../App.css";

const BarcodeScanner = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [inputFields, setInputFields] = useState([
        { id: 1, value: "", active: true },
        { id: 2, value: "", active: false },
        { id: 3, value: "", active: false }
    ]);

    const handleScanResult = (decodedText) => {
        const activeInput = inputFields.find((field) => field.active);
        if (activeInput) {
            const updatedInputFields = inputFields.map((field) =>
                field.id === activeInput.id
                    ? { ...field, value: decodedText }
                    : field
            );
            setInputFields(updatedInputFields);
        }
    };

    const handleInputChange = (event, inputId) => {
        const updatedInputFields = inputFields.map((field) =>
            field.id === inputId ? { ...field, value: event.target.value } : field
        );
        setInputFields(updatedInputFields);
    };

    const activateInput = (inputId) => {
        const updatedInputFields = inputFields.map((field) => ({
            ...field,
            active: field.id === inputId
        }));
        setInputFields(updatedInputFields);
    };

    const startScanning = () => {
        setIsScanning(true);
    };

    const stopScanning = () => {
        setIsScanning(false);
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Barcode Scanner</h1>
                <Link to="/generator" className="link">Go to Barcode Generator</Link>
            </div>
            <div>
                {inputFields.map((field) => (
                    <div key={field.id}>
                        <label>Input value {field.id}</label>
                        <input
                            type="text"
                            value={field.value}
                            onChange={(event) => handleInputChange(event, field.id)}
                            onFocus={() => activateInput(field.id)}
                            readOnly={!field.active}
                            className="form-control mb-3"
                        />
                    </div>
                ))}
            </div>
            <div>
                {isScanning ? (
                    <button className="btn btn-danger mb-3" onClick={stopScanning}>Stop Scanning</button>
                ) : (
                    <button className="btn btn-primary mb-3" onClick={startScanning}>Start Scanning</button>
                )}
            </div>
            <div>
                {isScanning && (
                    <div>
                        <Html5QrcodePlugin
                            fps={10}
                            qrbox={250}
                            disableFlip={false}
                            qrCodeSuccessCallback={handleScanResult}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BarcodeScanner;
