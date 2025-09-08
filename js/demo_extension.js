import { app } from "/scripts/app.js";

app.registerExtension({
    name: "I18nDemo",
    settings: [
        {
            id: "I18nDemo.EnableDebugMode",
            category: ["I18nDemo","DebugMode"], // This matches the settingsCategories key in main.json
            name: "Enable Debug Mode", // Will be overridden by translation
            tooltip: "Show debug information in console for i18n demo nodes", // Will be overridden by translation
            type: "boolean",
            defaultValue: false,
            onChange: (value) => {
                console.log("I18n Demo:", value ? "Debug mode enabled" : "Debug mode disabled");
            }
        },
        {
            id: "I18nDemo.DefaultTextOperation",
            category: ["I18nDemo","DefaultTextOperation"], // This matches the settingsCategories key in main.json
            name: "Default Text Operation", // Will be overridden by translation
            tooltip: "Default operation for text processor node", // Will be overridden by translation
            type: "combo",
            options: ["uppercase", "lowercase", "reverse", "add_prefix"],
            defaultValue: "uppercase",
            experimental: true
        }
    ],

    // About page badges
    aboutPageBadges: [
        {
            label: "I18n Demo",
            url: "https://github.com/comfyui-wiki/ComfyUI-i18n-demo",
            icon: "pi pi-globe"
        }
    ],
});