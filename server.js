const express = require('express');
const cors = require('cors');
const ffi = require('ffi-napi');

const app = express();
const PORT = 3000;

// Load the DLL
const injector = ffi.Library('./path/to/injector.dll', {
    'ExecuteScript': ['void', ['string']],
});

let isInjected = false;

// Endpoint to inject the DLL
app.post('/inject', (req, res) => {
    isInjected = true; // Simulate successful injection
    res.json({ success: true, message: 'Injection simulated!' });
});

// Endpoint to execute a script
app.post('/execute', (req, res) => {
    if (!isInjected) {
        return res.status(400).json({ output: 'Error: Not injected into Roblox.' });
    }

    const script = req.body.script;
    try {
        injector.ExecuteScript(script);
        res.json({ output: 'Script executed successfully!' });
    } catch (error) {
        res.status(500).json({ output: `Execution failed: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
