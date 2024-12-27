const injectButton = document.getElementById('inject-btn');
const executeButton = document.getElementById('execute-btn');
const scriptInput = document.getElementById('script-input');
const output = document.getElementById('output');

let isInjected = false;

// Simulate the injection process
injectButton.addEventListener('click', async () => {
    try {
        // Hypothetical injection API call (replace with actual injector logic)
        const response = await fetch('http://localhost:3000/inject', { method: 'POST' });
        const result = await response.json();

        if (result.success) {
            isInjected = true;
            output.textContent = 'Injection successful!';
            injectButton.disabled = true;
            executeButton.disabled = false;
        } else {
            output.textContent = `Injection failed: ${result.error}`;
        }
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
    }
});

// Handle script execution
executeButton.addEventListener('click', async () => {
    if (!isInjected) {
        output.textContent = 'Error: Inject into Roblox before executing scripts.';
        return;
    }

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
