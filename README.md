# ComfyUI I18n Demo

A clean, focused demonstration custom node package for ComfyUI that shows how to implement internationalization (i18n) support in custom nodes.

## Features

This package provides a minimal example of internationalization implementation:

### I18n Text Processor Node
- **Category**: I18n Demo
- **Function**: Simple text processing with multiple language support
- **Inputs**: Text, operation type, repeat count, optional prefix
- **Outputs**: Processed text

### Settings System
- **Configurable Settings**: Debug mode, default operations
- **Real-time Updates**: Settings changes apply immediately
- **Internationalized**: All settings text supports multiple languages

## Internationalization Support

This package demonstrates proper internationalization (i18n) implementation with **menu and settings support**:

- **Supported Languages**: English (en), Chinese (zh)
- **Translation Files**: Located in `locales/{language}/`
- **File Structure**:
  - `nodeDefs.json` - Node display names, descriptions, and input/output labels
  - `main.json` - **NEW**: Settings categories, buttons, messages, and menu items
  - `settings.json` - Settings panel text and tooltips

### New Menu & Settings Features
- **Settings Categories**: Organized settings with internationalized category names
- **Setting Names & Tooltips**: Full translation support for all setting text
- **Button Labels**: Internationalized UI buttons (Apply, Cancel, Reset, etc.)
- **Status Messages**: Localized success/error messages

## Installation

1. Copy this entire folder to your ComfyUI `custom_nodes` directory
2. Restart ComfyUI
3. The i18n demo node will appear in the node menu under the "I18n Demo" category

## File Structure

```
ComfyUI-i18n-demo/
├── __init__.py              # Node registration
├── demo_node.py             # Node implementation  
├── README.md                # Documentation
├── js/                      # Frontend JavaScript
│   └── demo_extension.js    # I18n functionality and settings
└── locales/                 # Internationalization files
    ├── en/                  # English translations
    │   ├── nodeDefs.json    # Node definitions
    │   ├── main.json        # General UI text
    │   └── settings.json    # Settings text
    └── zh/                  # Chinese translations
        ├── nodeDefs.json    # 节点定义
        ├── main.json        # 通用界面文本
        └── settings.json    # 设置文本
```

## How It Works

1. **Node Registration**: The `__init__.py` file exports the node class mappings
2. **Translation Loading**: ComfyUI automatically loads translations from the `locales/` folder
3. **Settings Integration**: JavaScript code integrates with ComfyUI's settings system
4. **Language Selection**: Users can switch languages in ComfyUI settings
5. **Fallback**: If a translation is missing, it falls back to English

## Settings Features

### Available Settings
- **Debug Mode**: Enable/disable debug console logging
- **Default Text Operation**: Choose default operation for text processor

### Accessing Settings
1. Open ComfyUI Settings (gear icon)
2. Navigate to **"I18n Demo"** category (name changes based on language)
3. Adjust settings as needed
4. Changes are saved automatically
5. **Language Support**: Setting names and tooltips automatically change with UI language

## For Developers

This package serves as a clean template for creating ComfyUI nodes with internationalization:

1. **Copy the structure** of this i18n demo package
2. **Modify the node class** in `demo_node.py` for your functionality
3. **Update translations** in the `locales/` folders
4. **Add more languages** by creating new language folders
5. **Customize settings** in the JavaScript file

## Key Features

This updated version demonstrates modern ComfyUI i18n functionality:
- ✅ **Menu Internationalization** - Settings categories with localized names
- ✅ **Complete Settings i18n** - Names, tooltips, and categories all translate
- ✅ **Node Interface i18n** - Full node translation support
- ✅ **Proper Translation Structure** - Following ComfyUI's latest i18n standards
- ✅ **Button & Message i18n** - UI elements with translation support
- ✅ **Single focused text processing node**

## No Dependencies

This i18n demo node has no external dependencies and uses only ComfyUI's built-in functionality.