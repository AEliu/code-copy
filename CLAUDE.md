# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome browser extension project that adds copy buttons to code blocks on web pages. The extension should work across different websites and detect various code block formats.

## Chrome Extension Development Commands

### Development Setup
- Load extension in Chrome: Navigate to `chrome://extensions/`, enable "Developer mode", click "Load unpacked" and select the project directory
- Reload extension: Click the refresh icon on the extension card after making changes
- View extension logs: Right-click extension icon → "Inspect popup" or check `chrome://extensions/` for errors

### Testing
- Manual testing: Load the extension and visit websites with code blocks (GitHub, Stack Overflow, documentation sites)
- Debug content scripts: Open DevTools on target pages → Sources → Content scripts
- Check for console errors: DevTools Console tab

## Architecture & Structure

### Core Components

1. **manifest.json** - Extension configuration file
   - Defines permissions (activeTab, scripting, etc.)
   - Specifies content scripts and their injection patterns
   - Sets extension metadata and icons

2. **Content Scripts** - JavaScript injected into web pages
   - Scans DOM for code block elements (`<pre>`, `<code>`, `.highlight`, etc.)
   - Injects copy buttons into detected code blocks
   - Handles copy functionality using Clipboard API

3. **Background Service Worker** (optional)
   - Manages extension lifecycle
   - Handles cross-tab communication if needed
   - Manages extension settings/preferences

4. **Popup/Options UI** (optional)
   - Extension settings interface
   - User preferences for copy button behavior

### Key Implementation Considerations

**Code Block Detection Strategy**:
- Common selectors: `pre`, `pre code`, `.highlight`, `.code-block`, `[class*="code"]`
- Website-specific selectors may be needed for popular sites
- Avoid duplicate buttons by checking for existing copy functionality

**Copy Button Implementation**:
- Use Clipboard API with fallback for older browsers
- Provide visual feedback (success/error states)
- Position buttons consistently (top-right corner of code blocks)
- Handle various code block styling and layouts

**Permissions Required**:
- `activeTab` - Access current tab content
- `scripting` - Inject content scripts dynamically
- Host permissions for specific domains (if needed for certain sites)

### Development Patterns

**Content Script Injection**:
- Use `document.querySelectorAll()` to find code blocks
- Create button elements dynamically
- Add event listeners for copy functionality
- Handle cleanup when pages change (SPAs)

**Error Handling**:
- Graceful degradation if Clipboard API unavailable
- Handle permission denials
- Network error handling for any external dependencies

**Performance Considerations**:
- Debounce DOM scanning for dynamic content
- Use MutationObserver for SPA page changes
- Minimize impact on page load performance