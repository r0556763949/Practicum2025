
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/Store';
import { fetchRemarksByFileId, addRemark, updateRemark, deleteRemark, fetchFileOwner } from '../../store/ReMarkSlice';
import decodeToken from '../../centeral/authUtils';
import '../../../styles/Remark.css';

const RemarksComponent: React.FC<{ fileId: number; clientId: number }> = ({ fileId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { remarks, loading, error } = useSelector((state: RootState) => state.remarks);
  const [newRemark, setNewRemark] = useState('');
  const [selectedRemark, setSelectedRemark] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [fileOwnerId, setFileOwnerId] = useState<number | null>(null);
  const remarksEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(fetchRemarksByFileId({ fileId }));
    dispatch(fetchFileOwner(fileId))
      .unwrap()
      .then((ownerId) => setFileOwnerId(ownerId))
      .catch((error) => console.error('Failed to fetch file owner:', error));
  }, [dispatch, fileId]);

  useEffect(() => {
    remarksEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [remarks]);

  const handleAddRemark = () => {
    if (!newRemark.trim()) return;
    const token = sessionStorage.getItem("token");
    const decodedToken = decodeToken(token!);
    if (decodedToken) {
      const clientId = parseInt(decodedToken.sub);
      dispatch(addRemark({ fileId, content: newRemark, clientId }));
      setNewRemark('');
    }
  };

  const handleDeleteRemark = (remarkId: number) => {
    dispatch(deleteRemark({ id: remarkId }));
    setDropdownOpen(null);
  };

  const handleUpdateRemark = (remarkId: number) => {
    setSelectedRemark(remarkId);
    const remarkToEdit = remarks.find((remark) => remark.id === remarkId);
    setNewRemark(remarkToEdit?.content || '');
    setDropdownOpen(null);
  };

  const handleSaveUpdate = () => {
    if (!newRemark.trim() || selectedRemark === null) return;
    dispatch(updateRemark({ id: selectedRemark, content: newRemark }));
    setNewRemark('');
    setSelectedRemark(null);
  };
  const handleDropdownToggle = (remarkId: number) => {
    setDropdownOpen(dropdownOpen === remarkId ? null : remarkId);
  };

  return (
    <div className="remarks-container">
      <h3>הערות לקובץ</h3>
      <div className="remarks-list">
        {remarks.length === 0 ? (
          <p>אין הערות לקובץ זה.</p>
        ) : (
          remarks.map((remark) => (
            <div
              key={remark.id}
              className={`remark-container ${remark.clientId === fileOwnerId ? 'remark-owner' : 'remark-client'}`}
            >
              <div className="remark-content">{remark.content}</div>
              <div className="remark-date">{new Date(remark.createAt).toLocaleString()}</div>
              <button className="remark-options-btn" onClick={() => handleDropdownToggle(remark.id)}>...</button>

              {dropdownOpen === remark.id && (
                <div className="remark-options open">
                  <button onClick={() => handleDeleteRemark(remark.id)}>מחיקה</button>
                  <button onClick={() => handleUpdateRemark(remark.id)}>עדכון</button>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={remarksEndRef}></div>
      </div>
      <div className="add-remark-container">
        <textarea
          value={newRemark}
          onChange={(e) => setNewRemark(e.target.value)}
          className="add-remark-textarea"
          placeholder="הכנס הערה חדשה"
          rows={4}
        />
        {selectedRemark === null ? (
          <button className="primary-button" onClick={handleAddRemark}>הוסף הערה</button>
        ) : (
          <button className="primary-button" onClick={handleSaveUpdate}>עדכן הערה</button>
        )}
      </div>
      {loading && <div>טוען...</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default RemarksComponent;



