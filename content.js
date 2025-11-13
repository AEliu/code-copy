(function() {
  'use strict';

  const COPY_BUTTON_CLASS = 'cbc-copy-button';
  const COPY_SUCCESS_TIMEOUT = 2000;

  // Common selectors for code blocks
  const CODE_BLOCK_SELECTORS = [
    'pre:not(.' + COPY_BUTTON_CLASS + ')',
    'pre code',
    '.highlight',
    '.code-block',
    '.codeblock',
    '[class*="code-block"]',
    '[class*="codeblock"]',
    'div.code',
    '.snippet',
    '.snippet-code'
  ];

  /**
   * Check if an element already has a copy button
   */
  function hasCopyButton(element) {
    return element.querySelector('.' + COPY_BUTTON_CLASS) !== null;
  }

  /**
   * Check if an element or any of its ancestors already has a copy button
   */
  function hasCopyButtonInHierarchy(element) {
    // 检查当前元素
    if (hasCopyButton(element)) {
      return true;
    }

    // 检查父元素
    const parent = element.parentElement;
    if (parent && (parent.tagName === 'PRE' || parent.classList.contains('cbc-code-block'))) {
      if (hasCopyButton(parent)) {
        return true;
      }
    }

    // 检查祖先元素（最多向上3层）
    let current = element;
    for (let i = 0; i < 3; i++) {
      current = current.parentElement;
      if (!current) break;

      const tagName = current.tagName;
      const className = current.className;

      if (tagName === 'PRE' ||
          (className && (className.includes('code') || className.includes('highlight')))) {
        if (hasCopyButton(current)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Check if a code block already has existing copy functionality
   * (e.g., GitHub's clipboard-copy element)
   */
  function hasExistingCopyFunctionality(codeBlock) {
    // 检查 GitHub 的 clipboard-copy 元素
    if (codeBlock.tagName === 'CLIPBOARD-COPY' ||
        codeBlock.querySelector('clipboard-copy')) {
      return true;
    }

    // 搜索常见的复制按钮类名
    const existingCopySelectors = [
      '.ClipboardButton',
      '.js-clipboard-copy',
      '.copy-button',
      '.btn-clipboard',
      '.clipboard-button',
      '.code-copy-button'
    ];

    for (const selector of existingCopySelectors) {
      if (codeBlock.matches(selector) || codeBlock.querySelector(selector)) {
        return true;
      }
    }

    // 检查祖先元素（因为有些网站的复制按钮在容器级别）
    let parent = codeBlock.parentElement;
    for (let i = 0; i < 2 && parent; i++) {
      for (const selector of existingCopySelectors) {
        if (parent.querySelector(selector)) {
          return true;
        }
      }
      parent = parent.parentElement;
    }

    return false;
  }

  /**
   * Extract text content from a code block
   */
  function getCodeText(codeBlock) {
    const codeElement = codeBlock.tagName === 'CODE' ? codeBlock : codeBlock.querySelector('code');
    if (codeElement) {
      return codeElement.textContent || codeElement.innerText || '';
    }
    return codeBlock.textContent || codeBlock.innerText || '';
  }

  /**
   * Create a copy button element with SVG icon
   */
  function createCopyButton() {
    const button = document.createElement('button');
    button.className = COPY_BUTTON_CLASS;
    button.title = '复制代码';
    button.setAttribute('type', 'button');

    // SVG 复制图标
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="copy-icon">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="success-icon" style="display:none">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="error-icon" style="display:none">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    `;

    return button;
  }

  /**
   * Copy text to clipboard
   */
  async function copyToClipboard(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      showSuccessFeedback(button);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showErrorFeedback(button);
    }
  }

  /**
   * Show success feedback on button
   */
  function showSuccessFeedback(button) {
    const copyIcon = button.querySelector('.copy-icon');
    const successIcon = button.querySelector('.success-icon');

    copyIcon.style.display = 'none';
    successIcon.style.display = 'block';
    button.classList.add('success');

    setTimeout(() => {
      copyIcon.style.display = 'block';
      successIcon.style.display = 'none';
      button.classList.remove('success');
    }, COPY_SUCCESS_TIMEOUT);
  }

  /**
   * Show error feedback on button
   */
  function showErrorFeedback(button) {
    const copyIcon = button.querySelector('.copy-icon');
    const errorIcon = button.querySelector('.error-icon');

    copyIcon.style.display = 'none';
    errorIcon.style.display = 'block';
    button.classList.add('error');

    setTimeout(() => {
      copyIcon.style.display = 'block';
      errorIcon.style.display = 'none';
      button.classList.remove('error');
    }, COPY_SUCCESS_TIMEOUT);
  }

  /**
   * Inject copy button into a code block
   */
  function injectCopyButton(codeBlock) {
    if (!codeBlock) {
      return;
    }

    // 检查当前元素或其祖先是否已有复制按钮
    if (hasCopyButtonInHierarchy(codeBlock)) {
      return;
    }

    // 检查是否已有现有的复制功能（如 GitHub 的 clipboard-copy）
    if (hasExistingCopyFunctionality(codeBlock)) {
      return;
    }

    // Skip if code block is too small
    const codeText = getCodeText(codeBlock).trim();
    if (codeText.length < 10) {
      return;
    }

    const button = createCopyButton();

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = getCodeText(codeBlock);
      copyToClipboard(textToCopy, button);
    });

    // Make code block relative positioned if not already
    const computedStyle = window.getComputedStyle(codeBlock);
    if (computedStyle.position === 'static') {
      codeBlock.style.position = 'relative';
    }

    codeBlock.appendChild(button);
    codeBlock.classList.add('cbc-code-block');
  }

  /**
   * Find and process all code blocks on the page
   */
  function processCodeBlocks() {
    try {
      const codeBlocks = new Set();

      // Find all potential code blocks
      CODE_BLOCK_SELECTORS.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          const text = el.textContent || el.innerText;
          if (text && text.trim().length > 10) {
            codeBlocks.add(el);
          }
        });
      });

      // Add copy buttons to found code blocks
      codeBlocks.forEach(block => injectCopyButton(block));
    } catch (error) {
      console.error('Error processing code blocks:', error);
    }
  }

  /**
   * Observe DOM changes for dynamically loaded content
   */
  function observeDOMChanges() {
    const observer = new MutationObserver((mutations) => {
      let shouldProcess = false;

      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldProcess = true;
        }
      });

      if (shouldProcess) {
        setTimeout(processCodeBlocks, 500);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      processCodeBlocks();
      observeDOMChanges();
    });
  } else {
    processCodeBlocks();
    observeDOMChanges();
  }

  // Also process on window load (for lazy-loaded content)
  window.addEventListener('load', () => {
    setTimeout(processCodeBlocks, 1000);
  });

})();
