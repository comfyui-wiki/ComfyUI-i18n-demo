class I18nTextProcessor:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {
                    "multiline": True,
                    "default": "Hello World!",
                    "tooltip": "The original text content to be processed"
                }),
                "operation": (["uppercase", "lowercase", "reverse", "add_prefix"], {
                    "default": "uppercase",
                    "tooltip": "The text processing operation to be executed"
                }),
                "count": ("INT", {
                    "default": 1,
                    "min": 1,
                    "max": 10,
                    "step": 1,
                    "tooltip": "The number of times to repeat the operation"
                }),
            },
            "optional": {
                "prefix": ("STRING", {
                    "default": "[I18N] ",
                    "multiline": False,
                    "tooltip": "The prefix to add to the text"
                }),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("processed_text",)
    FUNCTION = "process_text"
    CATEGORY = "I18n Demo"
    DESCRIPTION = "A simple i18n demo node that demonstrates text processing with internationalization support"

    def process_text(self, text, operation, count, prefix=""):
        try:
            result = text
            
            for _ in range(count):
                if operation == "uppercase":
                    result = result.upper()
                elif operation == "lowercase":
                    result = result.lower()
                elif operation == "reverse":
                    result = result[::-1]
                elif operation == "add_prefix":
                    result = prefix + result
            
            return (result,)
        except Exception as e:
            print(f"I18nTextProcessor error: {e}")
            return (f"Error: {str(e)}",)


NODE_CLASS_MAPPINGS = {
    "I18nTextProcessor": I18nTextProcessor,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "I18nTextProcessor": "I18n Text Processor",
}