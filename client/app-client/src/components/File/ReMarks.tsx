import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/Store';
import { fetchRemarksByFileId, addRemark } from '../store/ReMarkSlice';
import { useParams } from 'react-router-dom';

// הגדרת סטיילינג בעזרת CSS-Modules או Inline styles
const styles = {
  container: {
    width: '600px',
    padding: '20px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  remarkContainer: {
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '8px',
    border: '2px solid',
    marginBottom: '10px',
  },
  remarkContent: {
    padding: '10px',
    fontSize: '14px',
    color: '#333',
  },
  date: {
    fontSize: '12px',
    color: '#777',
    marginTop: '5px',
  },
  blueBorder: {
    borderColor: '#007bff', // כחול
  },
  lightBlueBorder: {
    borderColor: '#add8e6', // תכלת
  },
  inputContainer: {
    marginTop: '20px',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    marginBottom: '10px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  addButtonHover: {
    backgroundColor: '#0056b3',
  },
};

const RemarksComponent: React.FC<{fileId:number, clientId:number}> = ({fileId, clientId}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { remarks, loading, error } = useSelector((state: RootState) => state.remarks);
  
    const [newRemark, setNewRemark] = useState<string>('');
  
    useEffect(() => {
      if (fileId) {
        dispatch(fetchRemarksByFileId({ fileId: fileId }));
      }
    }, [fileId, dispatch]);
  
    const handleAddRemark = () => {
      if (newRemark.trim() !== '') {
        const remark = {
          fileId: fileId,
          content: newRemark,
          clientId: clientId, // הוספת clientId
        };
        dispatch(addRemark(remark));
        setNewRemark(''); // ריקון השדה לאחר הוספת הערה
      }
    };
  
    if (loading) return <div>טוען הערות...</div>;
    if (error) return <div>{`שגיאה: ${error}`}</div>;
  
    return (
      <div style={styles.container}>
        <h3>הערות לקובץ</h3>
        {remarks.length === 0 ? (
          <p>אין הערות לקובץ זה.</p>
        ) : (
          remarks.map((remark) => {
            // הוספת לוגים לצורך בדיקה
            console.log(`ClientId בקובץ: ${remark.clientId}, ClientId של המשתמש: ${clientId}`);
  
            return (
              <div
                key={remark.id}
                style={{
                  ...styles.remarkContainer,
                  ...(remark.clientId === clientId ? styles.blueBorder : styles.lightBlueBorder),
                }}
              >
                <div style={styles.remarkContent}>{remark.content}</div>
                <div style={styles.date}>{new Date(remark.createAt).toLocaleDateString()}</div>
              </div>
            );
          })
        )}
  
        <div style={styles.inputContainer}>
          <textarea
            value={newRemark}
            onChange={(e) => setNewRemark(e.target.value)}
            style={styles.inputField}
            placeholder="הכנס הערה חדשה"
            rows={4}
          />
          <button
            onClick={handleAddRemark}
            style={styles.addButton}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.addButtonHover.backgroundColor)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.addButton.backgroundColor)}
          >
            הוסף הערה
          </button>
        </div>
      </div>
    );
  };
  export default RemarksComponent;
  

