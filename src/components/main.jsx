import { useState } from 'react';
import { getSummary } from './useGemini';

function TextSummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState([]);

  const handleSummarize = async () => {
    const result = await getSummary(text);
    setSummary(result);
  };

  return (
    <div className="p-4">
      <textarea className="w-full border p-2" rows={6} value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSummarize} className="mt-2 bg-blue-500 text-white px-4 py-2">Summarize</button>
      <ul className="mt-4 list-disc ml-5">
        {summary.map((point, i) => <li key={i}>{point}</li>)}
      </ul>
    </div>
  );
}

export default TextSummarizer;