import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUploadUrl, confirmUpload } from "../store/FileSlice";
import { AppDispatch, RootState } from "../store/Store";

const FileUpload: React.FC<{ clientId: number; projectId: number }> = ({ clientId, projectId }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.files);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {

        if (!selectedFile) {
            alert("Please select a file!");
            return;
        }
        if (!description.trim()) {
            alert("Please add a description!");
            return;
        }

        try {
            const { uploadUrl, filePath } = await dispatch(
                getUploadUrl({
                    clientId,
                    projectId,
                    name: JSON.stringify(selectedFile.name),
                })
            ).unwrap();

            const uploadResponse = await fetch(uploadUrl, {
                method: "PUT",
                body: selectedFile,
            });

            if (!uploadResponse.ok) {
                throw new Error("Failed to upload file to S3.");
            }

            await dispatch(
                confirmUpload({
                    clientId,
                    projectId,
                    request: {
                        fileName: selectedFile.name,
                        description,
                        filePath,
                    },
                })
            ).unwrap();

            alert("File uploaded successfully!");
            setSelectedFile(null);
            setDescription("");
        } catch (err) {
            console.error("An error occurred:", err);
        }
    };

    return (
        <form className="medium-form">
            <h1 className="big-letter-blue" >
                Upload File
            </h1>

            <div style={styles.inputGroup}>
                 {selectedFile&&<label className="label">File</label>}
                <div className="file-input-wrapper">
                    {!selectedFile ? (
                        <label htmlFor="file" className="primary-button file-button">
                            Choose File
                        </label>
                    ) : (
                        <div className="input file-name-display">
                            {selectedFile.name}
                        </div>
                    )}
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        style={styles.hiddenInput}
                    />
                </div>
            </div>

            <div style={styles.inputGroup}>
                <label className="label">Description</label>
                <input
                    type="text"
                    placeholder="Enter a description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input"
                    required
                />
            </div>

            <button
                type="button"
                onClick={handleUpload}
                className={`primary-button`}
                disabled={loading}
                style={{ position: "relative", display: "inline-block", width: "100%" }}
            >
                {loading ? (
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                ) : (
                    "Upload"
                )}
            </button>

            {error && (
                <p className="small-letter-blue" style={styles.error}>
                    {error}
                </p>
            )}
        </form>
    );
};

const styles = {

    inputGroup: {
        marginBottom: "15px",
    },
    hiddenInput: {
        display: "none",
    },
    error: {
        marginTop: "15px",
        textAlign: "center",
        color: "#d9534f",
        fontSize: "14px",
    },
};

export default FileUpload;
