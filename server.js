const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/execute', (req, res) => {
    const script = req.body.script;

    // Using a Lua interpreter for execution (e.g., luvit or LuaJIT)
    exec(`lua -e "${script}"`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ output: stderr || 'Execution failed' });
        }

        res.json({ output: stdout || 'Execution succeeded with no output' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
