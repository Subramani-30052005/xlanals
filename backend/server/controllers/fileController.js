const xlsx = require('xlsx');          // <-- NO await here

exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file' });

    const wb = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheet = wb.SheetNames[0];
    const json = xlsx.utils.sheet_to_json(wb.Sheets[sheet]);

    res.json({ message: 'OK', preview: json.slice(0, 5) });
  } catch (err) {
    console.error('Parse error:', err);
    res.status(500).json({ error: 'Failed to parse Excel' });
  }
};
