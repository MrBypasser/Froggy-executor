const executeButton = document.getElementById('execute-btn');
const scriptInput = document.getElementById('script-input');
const output = document.getElementById('output');

executeButton.addEventListener('click', async () => {
    const script = scriptInput.value;

    try {
        const response = await fetch('http://localhost:3000/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ script }),
        });

        const result = await response.json();
        output.textContent = result.output || 'Execution succeeded with no output.';
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
    }
});
