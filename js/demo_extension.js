import { app } from "/scripts/app.js";

// Helper function to get translated text from ComfyUI's i18n system
function getTranslatedText(key, defaultText, category = "settings") {
    // Try to get current locale
    const currentLocale = app.ui?.settings?.getSettingValue?.("Comfy.Locale") || "en";
    
    // Try to access custom node translations
    if (window.comfyUITranslations && window.comfyUITranslations[currentLocale]) {
        const translations = window.comfyUITranslations[currentLocale];
        if (translations.i18nDemo && translations.i18nDemo[category] && translations.i18nDemo[category][key]) {
            return translations.i18nDemo[category][key];
        }
    }
    
    return defaultText;
}

app.registerExtension({
    name: "ComfyUI-i18n-demo",
    
    settings: [
        {
            id: "I18nDemo.EnableDebugMode",
            get name() { return getTranslatedText("enableDebugMode", "Enable Debug Mode"); },
            type: "boolean",
            defaultValue: false,
            get tooltip() { return getTranslatedText("enableDebugModeTooltip", "Show debug information in console for i18n demo nodes"); },
            onChange: (value) => {
                console.log("I18n Demo debug mode:", value ? "enabled" : "disabled");
            }
        },
        {
            id: "I18nDemo.DefaultTextOperation",
            get name() { return getTranslatedText("defaultTextOperation", "Default Text Operation"); },
            type: "combo",
            get options() {
                return [
                    { value: "uppercase", text: getTranslatedText("uppercase", "Uppercase", "options.textOperations") },
                    { value: "lowercase", text: getTranslatedText("lowercase", "Lowercase", "options.textOperations") },
                    { value: "reverse", text: getTranslatedText("reverse", "Reverse", "options.textOperations") },
                    { value: "add_prefix", text: getTranslatedText("add_prefix", "Add Prefix", "options.textOperations") }
                ];
            },
            defaultValue: "uppercase",
            get tooltip() { return getTranslatedText("defaultTextOperationTooltip", "Default operation for text processor node"); }
        }
    ],

    // Helper function to get setting value
    getSetting(id) {
        return app.extensionManager?.setting?.get?.(id);
    }
});