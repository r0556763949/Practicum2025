import  { useState, useEffect } from "react";

interface ReMark {
  content: string;
}

const FileRemarks = ({ fileId, onClose, clientId }: { fileId: number; onClose: () => void; clientId: number|null }) => {
  const [remarks, setRemarks] = useState<ReMark[]>([]);
  const [newRemark, setNewRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRemarks();
  }, []);

  const fetchRemarks = async () => {
    try {
      const response = await fetch(`https://localhost:7156/api/remark/file/${fileId}`);
      if (!response.ok) throw new Error("Failed to fetch remarks");

      const data = await response.json();
      setRemarks(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddRemark = async () => {
    if (!newRemark.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`https://localhost:7156/api/remark/file/${fileId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          content: newRemark, 
          fileId: fileId,
        //   clientId: clientId // כאן אנחנו שולחים גם את ה-clientId
        }),
      });

      if (!response.ok) throw new Error("Failed to add remark");

      setNewRemark("");
      fetchRemarks(); // רענון הרשימה
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleDeleteRemark = async (remarkId: number) => {
    try {
      const response = await fetch(`https://localhost:7156/api/remark/${remarkId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete remark");
      
      setRemarks(remarks.filter((r) => r.id !== remarkId));

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Remarks for File #{fileId}</h3>
      <button onClick={onClose} className="text-red-500 float-right">✖</button>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
        {remarks.length === 0 ? <p>No remarks yet.</p> : (
          <ul>
            {remarks.map((remark) => (
              <li key={remark.id} className="flex justify-between items-center bg-white p-2 mb-2 rounded shadow">
                <span>{remark.content}</span>
                <button onClick={() => handleDeleteRemark(remark.id)} className="text-red-500">🗑</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="text"
        placeholder="Add a remark..."
        value={newRemark}
        onChange={(e) => setNewRemark(e.target.value)}
        className="mt-2 p-2 border rounded w-full"
      />
      <button onClick={handleAddRemark} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full">
        {loading ? "Adding..." : "Add Remark"}
      </button>
    </div>
  );
};

export default FileRemarks;