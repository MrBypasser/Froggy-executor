const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let isInjected = false;

// Endpoint to handle injection
app.post('/inject', (req, res) => {
    // Simulate injection process
    exec('path/to/injector.exe', (error) => {
        if (error) {
            return res.status(500).json({ success: false, error: 'Injection failed.' });
        }

        isInjected = true;
        res.json({ success: true });
    });
});

// Endpoint to handle script execution
app.post('/execute', (req, res) => {
    if (!isInjected) {
        return res.status(400).json({ output: 'Error: Not injected into Roblox.' });
    }

    const script = req.body.script;

    exec(`lua -e "${script}"`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ output: stderr || 'Execution failed.' });
        }

        res.json({ output: stdout || 'Execution succeeded with no output.' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
