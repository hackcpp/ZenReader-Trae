# ZenReader Chrome Extension

ZenReader is a minimalist Chrome extension that provides a distraction-free reading experience. It utilizes `Readability.js` to extract the main content of an article and presents it in a clean, customizable view using Shadow DOM to isolate styles from the original page.

## Features

-   **Distraction-Free Reading**: Removes ads, sidebars, and clutter, leaving only the article content.
-   **Style Isolation**: Uses Shadow DOM to ensure the reader view looks consistent regardless of the website's CSS.
-   **Theme Support**:
    -   ☀️ **Light**: Classic black text on white background.
    -   📜 **Sepia**: Warm tones for easier reading.
    -   🌿 **Green**: Eye-protection green mode.
    -   🌙 **Dark**: High contrast dark mode for night reading.
-   **Persistence**: Remembers your last used theme automatically.

## Installation

### From Source (Developer Mode)

1.  Clone this repository:
    ```bash
    git clone https://github.com/hackcpp/ZenReader-Trae.git
    ```
2.  Open Chrome and navigate to `chrome://extensions/`.
3.  Enable **Developer mode** in the top right corner.
4.  Click **Load unpacked**.
5.  Select the `ZenReader-Trae` directory you just cloned.

## Usage

1.  Navigate to any article or blog post.
2.  Click the **ZenReader** icon in the Chrome toolbar.
3.  Click **Toggle Reader Mode** to activate the reader view.
4.  Use the theme buttons in the popup to switch between Light, Sepia, Green, and Dark modes.

## Tech Stack

-   **Manifest V3**: The latest Chrome Extension specification.
-   **Readability.js**: A standalone version of the library used for Firefox Reader View.
-   **Shadow DOM**: Web Components technology for CSS encapsulation.

## License

[Apache License 2.0](LICENSE)
