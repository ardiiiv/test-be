import axios from 'axios';
export const predict = async (req, res) => {
    const { responses } = req.body;

    if (!responses || responses.length !== 16) {
        return res.status(400).json({ error: 'Input harus berupa 16 karakter V/A/R/K' });
    }

    try {
        const result = await axios.post(process.env.FLASK_API_URL, { responses });
        res.json({ predicted_style: result.data.predicted_style });
    } catch (err) {
        res.status(500).json({ error: 'Gagal memproses prediksi' });
    }
};