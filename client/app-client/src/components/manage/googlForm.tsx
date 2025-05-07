
import React, { useState } from 'react';

function QuestionnaireComponent() {
  const [summary, setSummary] = useState('');
  const [email, setEmail] = useState('');

  const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdnjTd0kEe6yNIJOxSp7FxILa3dyTfl0utgCOTQvrKrgfZK_A/viewform?usp=header'; // החליפי בקישור האמיתי לשאלון
  const googleSheetId = '1v1TGgxBoEdyoDZGodlygpULuEDPslBajFVtVsZw9IO0'; // ID של השיטס שלך

  const handleFillForm = () => {
    window.open(googleFormUrl, '_blank');
  };

  const handleSummarize = async () => {
    if (!email) {
      setSummary('נא להזין כתובת מייל.');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7156/api/summarize/${googleSheetId}/${email}`);
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setSummary('אירעה שגיאה בשליפת הסיכום');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>שאלון ללקוח</h2>
      <button onClick={handleFillForm} style={{ margin: '10px', padding: '10px 20px' }}>
        מלא שאלון
      </button>

      <div style={{ marginTop: '20px' }}>
        <input
          type="email"
          placeholder="הכנס כתובת מייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', width: '250px', marginBottom: '10px' }}
        />
        <br />
        <button onClick={handleSummarize} style={{ margin: '10px', padding: '10px 20px' }}>
          סכם תשובות
        </button>
      </div>

      {summary && (
        <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '15px' }}>
          <h3>סיכום:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default QuestionnaireComponent;
