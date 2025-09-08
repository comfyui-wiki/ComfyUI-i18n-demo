import { app } from "/scripts/app.js";

app.registerExtension({
    name: "I18nDemo",
    settings: [
        {
            id: "Comfy.Frontend.I18nDemo.EnableDebugMode",
            category: ["I18nDemo","I18nDemo"], // This matches the settingsCategories key in main.json
            name: "Enable Debug Mode", // Will be overridden by translation
            tooltip: "Show debug information in console for i18n demo nodes", // Will be overridden by translation
            type: "boolean",
            defaultValue: false,
            experimental: true,
            onChange: (value) => {
                console.log("I18n Demo:", value ? "Debug mode enabled" : "Debug mode disabled");
            }
        },
        {
            id: "Comfy.Frontend.I18nDemo.DefaultTextOperation",
            category: ["I18nDemo","I18nDemo"], // This matches the settingsCategories key in main.json
            name: "Default Text Operation", // Will be overridden by translation
            tooltip: "Default operation for text processor node", // Will be overridden by translation
            type: "combo",
            options: ["uppercase", "lowercase", "reverse", "add_prefix"],
            defaultValue: "uppercase",
            experimental: true
        }
    ],

    // Commands for selection toolbox
    commands: [
        {
            id: "i18n-demo.duplicate-with-translation",
            label: "Duplicate with Translation",
            icon: "pi pi-copy",
            function: (selectedItem) => {
                app.extensionManager.toast.add({
                    severity: "info",
                    summary: "I18n Demo",
                    detail: "Duplicating selected nodes with translation support",
                    life: 3000
                });
                console.log("Duplicating with translation support:", selectedItem);
            }
        },
        {
            id: "i18n-demo.show-node-info",
            label: "Show Node Info",
            icon: "pi pi-info-circle",
            function: (selectedItem) => {
                const selectedItems = app.canvas.selectedItems;
                const count = selectedItems ? selectedItems.size : 0;
                
                app.extensionManager.dialog.prompt({
                    title: "Node Information",
                    message: `Selected ${count} node(s). Enter a message:`,
                    defaultValue: "Hello from I18n Demo!"
                }).then(result => {
                    if (result !== null) {
                        app.extensionManager.toast.add({
                            severity: "success",
                            summary: "I18n Demo",
                            detail: `You entered: ${result}`,
                            life: 3000
                        });
                    }
                });
            }
        },
        {
            id: "i18n-demo.confirm-action",
            label: "Confirm Action",
            icon: "pi pi-check",
            function: () => {
                app.extensionManager.dialog.confirm({
                    title: "I18n Demo Confirmation",
                    message: "Are you sure you want to perform this action?",
                    type: "default"
                }).then(result => {
                    if (result === true) {
                        app.extensionManager.toast.add({
                            severity: "success",
                            summary: "Confirmed",
                            detail: "Action confirmed successfully!",
                            life: 3000
                        });
                    } else if (result === false) {
                        app.extensionManager.toast.add({
                            severity: "warn",
                            summary: "Cancelled",
                            detail: "Action was cancelled",
                            life: 3000
                        });
                    }
                });
            }
        }
    ],

    // Selection toolbox commands
    getSelectionToolboxCommands: (selectedItem) => {
        const selectedItems = app.canvas.selectedItems;
        const itemCount = selectedItems ? selectedItems.size : 0;
        
        if (itemCount === 0) return [];
        
        const commands = ["i18n-demo.show-node-info"];
        
        if (itemCount > 0) {
            commands.push("i18n-demo.duplicate-with-translation");
        }
        
        if (itemCount === 1) {
            commands.push("i18n-demo.confirm-action");
        }
        
        return commands;
    },

    // Sidebar tabs
    sidebarTabs: [
        {
            id: "i18n-demo-sidebar",
            icon: "pi pi-globe",
            title: "I18n Demo",
            tooltip: "Internationalization Demo Sidebar",
            type: "custom",
            render: (el) => {
                const container = document.createElement('div');
                container.style.padding = '10px';
                
                // Title
                const title = document.createElement('h3');
                title.textContent = 'I18n Demo Sidebar';
                title.style.marginBottom = '15px';
                title.style.color = '#007ad9';
                
                // Language selector
                const langLabel = document.createElement('label');
                langLabel.textContent = 'Current Language:';
                langLabel.style.display = 'block';
                langLabel.style.marginBottom = '5px';
                
                const langDisplay = document.createElement('div');
                langDisplay.textContent = 'English (en)';
                langDisplay.style.padding = '5px';
                langDisplay.style.backgroundColor = '#f0f0f0';
                langDisplay.style.borderRadius = '3px';
                langDisplay.style.marginBottom = '15px';
                
                // Demo buttons
                const buttonContainer = document.createElement('div');
                buttonContainer.style.display = 'flex';
                buttonContainer.style.flexDirection = 'column';
                buttonContainer.style.gap = '8px';
                
                const toastBtn = document.createElement('button');
                toastBtn.textContent = 'Show Toast';
                toastBtn.style.padding = '8px';
                toastBtn.style.backgroundColor = '#007ad9';
                toastBtn.style.color = 'white';
                toastBtn.style.border = 'none';
                toastBtn.style.borderRadius = '3px';
                toastBtn.style.cursor = 'pointer';
                
                toastBtn.addEventListener('click', () => {
                    app.extensionManager.toast.add({
                        severity: "info",
                        summary: "I18n Demo",
                        detail: "This is a demo toast from the sidebar!",
                        life: 3000
                    });
                });
                
                const dialogBtn = document.createElement('button');
                dialogBtn.textContent = 'Show Dialog';
                dialogBtn.style.padding = '8px';
                dialogBtn.style.backgroundColor = '#28a745';
                dialogBtn.style.color = 'white';
                dialogBtn.style.border = 'none';
                dialogBtn.style.borderRadius = '3px';
                dialogBtn.style.cursor = 'pointer';
                
                dialogBtn.addEventListener('click', () => {
                    app.extensionManager.dialog.prompt({
                        title: "I18n Demo Dialog",
                        message: "Enter some text:",
                        defaultValue: "Hello from sidebar!"
                    }).then(result => {
                        if (result !== null) {
                            app.extensionManager.toast.add({
                                severity: "success",
                                summary: "Dialog Result",
                                detail: `You entered: ${result}`,
                                life: 3000
                            });
                        }
                    });
                });
                
                // Assemble the UI
                buttonContainer.appendChild(toastBtn);
                buttonContainer.appendChild(dialogBtn);
                
                container.appendChild(title);
                container.appendChild(langLabel);
                container.appendChild(langDisplay);
                container.appendChild(buttonContainer);
                el.appendChild(container);
            }
        }
    ],

    // Bottom panel tabs
    bottomPanelTabs: [
        {
            id: "i18n-demo-bottom",
            title: "I18n Demo Log",
            type: "custom",
            icon: "pi pi-list",
            render: (el) => {
                const container = document.createElement('div');
                container.style.padding = '10px';
                container.style.height = '100%';
                container.style.overflow = 'auto';
                
                // Title
                const title = document.createElement('h3');
                title.textContent = 'I18n Demo Activity Log';
                title.style.marginBottom = '15px';
                title.style.color = '#007ad9';
                
                // Log area
                const logArea = document.createElement('div');
                logArea.id = 'i18n-demo-log';
                logArea.style.backgroundColor = '#f8f9fa';
                logArea.style.border = '1px solid #dee2e6';
                logArea.style.borderRadius = '3px';
                logArea.style.padding = '10px';
                logArea.style.height = '200px';
                logArea.style.overflow = 'auto';
                logArea.style.fontFamily = 'monospace';
                logArea.style.fontSize = '12px';
                
                // Add initial log entry
                const timestamp = new Date().toLocaleTimeString();
                logArea.innerHTML = `<div>[${timestamp}] I18n Demo extension loaded</div>`;
                
                // Control buttons
                const buttonContainer = document.createElement('div');
                buttonContainer.style.marginTop = '10px';
                buttonContainer.style.display = 'flex';
                buttonContainer.style.gap = '8px';
                
                const clearBtn = document.createElement('button');
                clearBtn.textContent = 'Clear Log';
                clearBtn.style.padding = '5px 10px';
                clearBtn.style.backgroundColor = '#dc3545';
                clearBtn.style.color = 'white';
                clearBtn.style.border = 'none';
                clearBtn.style.borderRadius = '3px';
                clearBtn.style.cursor = 'pointer';
                
                clearBtn.addEventListener('click', () => {
                    logArea.innerHTML = '';
                });
                
                const addLogBtn = document.createElement('button');
                addLogBtn.textContent = 'Add Log Entry';
                addLogBtn.style.padding = '5px 10px';
                addLogBtn.style.backgroundColor = '#007ad9';
                addLogBtn.style.color = 'white';
                addLogBtn.style.border = 'none';
                addLogBtn.style.borderRadius = '3px';
                addLogBtn.style.cursor = 'pointer';
                
                addLogBtn.addEventListener('click', () => {
                    const timestamp = new Date().toLocaleTimeString();
                    const logEntry = document.createElement('div');
                    logEntry.innerHTML = `[${timestamp}] Manual log entry added`;
                    logArea.appendChild(logEntry);
                    logArea.scrollTop = logArea.scrollHeight;
                });
                
                buttonContainer.appendChild(clearBtn);
                buttonContainer.appendChild(addLogBtn);
                
                // Assemble the UI
                container.appendChild(title);
                container.appendChild(logArea);
                container.appendChild(buttonContainer);
                el.appendChild(container);
            }
        }
    ],

    // About page badges
    aboutPageBadges: [
        {
            label: "I18n Demo",
            url: "#",
            icon: "pi pi-globe"
        }
    ],
    
    async setup() {
        console.log("I18n Demo extension loaded with multi-language support and UI components.");
        
        // Register sidebar tab using the extension manager
        app.extensionManager.registerSidebarTab({
            id: "i18n-demo-standalone",
            icon: "pi pi-cog",
            title: "I18n Settings",
            tooltip: "I18n Demo Settings Panel",
            type: "custom",
            render: (el) => {
                const container = document.createElement('div');
                container.style.padding = '10px';
                
                const title = document.createElement('h3');
                title.textContent = 'I18n Demo Settings';
                title.style.marginBottom = '15px';
                title.style.color = '#007ad9';
                
                const info = document.createElement('p');
                info.textContent = 'This is a standalone sidebar tab registered via extensionManager.';
                info.style.marginBottom = '15px';
                info.style.color = '#666';
                
                const testBtn = document.createElement('button');
                testBtn.textContent = 'Test All Features';
                testBtn.style.padding = '8px 16px';
                testBtn.style.backgroundColor = '#6f42c1';
                testBtn.style.color = 'white';
                testBtn.style.border = 'none';
                testBtn.style.borderRadius = '3px';
                testBtn.style.cursor = 'pointer';
                
                testBtn.addEventListener('click', () => {
                    // Test toast
                    app.extensionManager.toast.add({
                        severity: "info",
                        summary: "Testing",
                        detail: "Testing all I18n Demo features...",
                        life: 2000
                    });
                    
                    // Test dialog after a short delay
                    setTimeout(() => {
                        app.extensionManager.dialog.confirm({
                            title: "Feature Test",
                            message: "All I18n Demo features are working!",
                            type: "default"
                        }).then(result => {
                            app.extensionManager.toast.add({
                                severity: result ? "success" : "info",
                                summary: "Test Complete",
                                detail: result ? "All features confirmed!" : "Test completed",
                                life: 3000
                            });
                        });
                    }, 2000);
                });
                
                container.appendChild(title);
                container.appendChild(info);
                container.appendChild(testBtn);
                el.appendChild(container);
            }
        });
    }
});