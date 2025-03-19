import React, { useState } from "react";
import FileRemarks from "./FileRemarks";

const PogramFile = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<any[]>([]); // רשימה של קבצים
  const [fileIdToDelete, setFileIdToDelete] = useState<number | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null); // לניהול הערות
  // מספרים רנדומליים לבדיקת ה-API
  const clientId = 1;
  const projectId = 3;

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };
  const handleManageRemarks = (fileId: number) => {
    setSelectedFileId(fileId);
  };
  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  // const handleUpload = async () => {
  //   if (!file) {
  //     setMessage("Please select a file first.");
  //     return;
  //   }

  //   setUploading(true);
  //   setMessage("");

  //   try {
  //     // שלב 1️⃣ - בקשת Presigned URL מהשרת
  //     const requestBody = {
  //       fileName: file.name,
  //       description: description,
  //     };

  //     const response = await fetch(
  //       `https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files/upload-url`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(requestBody),
  //       }
  //     );

  //     if (!response.ok) throw new Error("Failed to get upload URL");

  //     const data = await response.json();
  //     if (!data.uploadUrl) throw new Error("Server did not return an upload URL");

  //     // שלב 2️⃣ - העלאת הקובץ ישירות ל-S3
  //     const uploadResponse = await fetch(data.uploadUrl, {
  //       method: "PUT",
  //       body: file,
  //       headers: {
  //         "Content-Type": file.type,
  //       },
  //     });

  //     if (uploadResponse.ok) {
  //       setMessage("File uploaded successfully!");
  //       fetchFiles(); // אחרי ההעלאה, נטען את הקבצים שוב
  //     } else {
  //       throw new Error("Upload failed.");
  //     }
  //   } catch (error: any) {
  //     setMessage(error.message);
  //   }

  //   setUploading(false);
  // };
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }
  
    setUploading(true);
    setMessage("");
  
    try {
      // 🔹 שלב 1️⃣: בקשת Presigned URL מהשרת
      const response = await fetch(
        `https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files/upload-url`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(file.name),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Failed to get upload URL: " + errorData.message);
      }
  
      const data = await response.json();
      const uploadUrl = data.uploadUrl;
      const filePath = data.filePath;
  
      if (!uploadUrl || !filePath) throw new Error("Server response is missing data.");
  
      // 🔹 שלב 2️⃣: העלאת הקובץ ל-S3
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
  
      if (!uploadResponse.ok) throw new Error("Upload failed.");
  
      // 🔹 שלב 3️⃣: שליחת קריאה נוספת לאישור ההעלאה
      const confirmResponse = await fetch(
        `https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files/confirm-upload`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: file.name, description, filePath }),
        }
      );
  
      if (!confirmResponse.ok) throw new Error("Failed to confirm upload.");
  
      setMessage("File uploaded successfully!");
      fetchFiles(); // רענון רשימת הקבצים
    } catch (error: any) {
      console.error("Upload error:", error);
      setMessage(error.message);
    }
  
    setUploading(false);
  };
  
  
  // פונקציה לשליפה של כל הקבצים בפרויקט
  const fetchFiles = async () => {
    try {
      const response = await fetch(
        `https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files`
      );
      if (!response.ok) throw new Error("Failed to fetch files");

      const data = await response.json();
      console.log("Fetched files data:",data);
      setFiles(data); // עדכון הרשימה של הקבצים
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  // פונקציה למחיקת קובץ
  const handleDelete = async (fileId: number) => {
    try {
      const response = await fetch(
        `https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files/${fileId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setMessage("File deleted successfully!");
        fetchFiles(); // אחרי המחיקה, נטען את הקבצים שוב
      } else {
        throw new Error("Failed to delete file.");
      }
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  // פונקציה להורדת קובץ
  const handleDownload = async (fileId: number) => {
    try {
      const response = await fetch(
        `https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files/${fileId}/download`
      );
      if (!response.ok) throw new Error("Failed to get download URL");

      const data = await response.json();
      const downloadUrl = data.downloadUrl;

      // הורדת הקובץ
      window.location.href = downloadUrl;
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  // פונקציה לצפייה בקובץ
  const handleView = async (fileId: number) => {
    try {
      const response = await fetch(
        `https://localhost:7156/api/clients/${clientId}/projects/${projectId}/files/${fileId}/view`
      );
      if (!response.ok) throw new Error("Failed to get view URL");

      const data = await response.json();
      const viewUrl = data.viewUrl;

      // צפייה בקובץ ב-iframe
      window.open(viewUrl, "_blank");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  // קריאה ל-fetchFiles כשמודול עולה
  React.useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Upload File to S3</h2>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <input
        type="text"
        placeholder="Enter file description"
        value={description}
        onChange={handleDescriptionChange}
        className="mb-4 p-2 border rounded w-full"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && <p className="mt-4 text-red-500">{message}</p>}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Uploaded Files</h3>
        <ul>
          {files.length > 0 ? (
            files.map((file: any) => (
              <li key={file.id} className="mb-2 flex justify-between">
                <span>{file.fileName}</span>
                <button onClick={() => handleManageRemarks(file.id)} className="bg-purple-500 text-white px-2 py-1 rounded">
                Manage Remarks
              </button>
                <button
                  onClick={() => handleDownload(file.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Download
                </button>
                <button
                  onClick={() => handleView(file.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>No files found.</p>
          )}
          {selectedFileId && (
        <FileRemarks fileId={selectedFileId} onClose={() => setSelectedFileId(null)} clientId={null}/>
      )}
        </ul>
      </div>
    </div>
  );
};

export default PogramFile;