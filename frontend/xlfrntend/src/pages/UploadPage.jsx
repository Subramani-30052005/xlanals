import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../app/slices/fileSlice';

export default function UploadPage() {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null); // 🟢 renamed to match your request
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage('');
    setPreview([]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select an Excel file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile); // ✅ this is the line you asked for

    try {
      const res = await dispatch(uploadFile(formData)).unwrap();
      setMessage('✅ File uploaded successfully!');
      setPreview(res.preview || []); // expects backend to return preview array
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload failed. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Excel File</h2>

      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFileChange}
        className="w-full p-2 border mb-4"
      />

      {selectedFile && (
        <div className="text-sm mb-4">
          Selected: <span className="font-medium">{selectedFile.name}</span>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Upload
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}

      {preview.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl mb-2 font-semibold">Preview (First 5 rows):</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr>
                  {Object.keys(preview[0]).map((key) => (
                    <th key={key} className="border px-4 py-2 bg-gray-100 text-left">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex} className="border px-4 py-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
