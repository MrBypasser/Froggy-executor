#include <Windows.h>
#include <string>

// Simulate script execution
extern "C" __declspec(dllexport) void ExecuteScript(const char* script) {
    // Example: Log the script to a file (Replace with actual execution logic)
    FILE* log = fopen("script_log.txt", "a");
    if (log) {
        fprintf(log, "Executed Script: %s\n", script);
        fclose(log);
    }
}

BOOL APIENTRY DllMain(HMODULE hModule, DWORD ul_reason_for_call, LPVOID lpReserved) {
    switch (ul_reason_for_call) {
    case DLL_PROCESS_ATTACH:
        MessageBox(NULL, "DLL Injected!", "Success", MB_OK);
        break;
    case DLL_PROCESS_DETACH:
        break;
    }
    return TRUE;
}
