# Browser Testing Guide

Comprehensive guide for verifying UI implementations using the cursor-ide-browser MCP.

## Critical Workflow

**IMPORTANT**: Always follow this order:

```
1. browser_navigate → Opens/navigates to URL (creates tab if needed)
2. browser_lock → Lock AFTER navigate (requires existing tab)
3. browser_snapshot → Get page structure
4. [interactions] → Click, type, scroll, etc.
5. browser_take_screenshot → Visual capture
6. browser_console_messages → Check for errors
7. browser_unlock → Release when COMPLETELY done
```

**Common mistake**: Calling `browser_lock` before `browser_navigate` will fail because there's no tab to lock.

---

## Opening and Navigating

### Initial Navigation

```
browser_navigate:
  url: "http://localhost:3000"
  take_screenshot_afterwards: true
```

### Navigate in Side Panel (for side-by-side development)

```
browser_navigate:
  url: "http://localhost:3000"
  position: "side"
  take_screenshot_afterwards: true
```

### Open in New Tab

```
browser_navigate:
  url: "http://localhost:3000/different-page"
  newTab: true
```

---

## Inspecting the Page

### Get Page Structure

Use `browser_snapshot` to understand what's on the page:

```
browser_snapshot:
  take_screenshot_afterwards: true
```

The snapshot returns an accessibility tree showing all interactive elements with `ref` identifiers you can use for interactions.

### Check for Differences

After making changes, check what changed:

```
browser_snapshot:
  includeDiff: true
```

### Focus on Specific Area

```
browser_snapshot:
  selector: "#main-content"
  compact: true
```

---

## Interacting with Elements

### Click Elements

```
browser_click:
  element: "Submit button"
  ref: "#submit-btn"
```

### Fill Input Fields

```
// Replace all content
browser_fill:
  element: "Email input"
  ref: "#email"
  value: "test@example.com"

// Append to existing content
browser_type:
  element: "Search input"
  ref: "#search"
  text: "additional text"
```

### Select Dropdown Options

```
browser_select_option:
  element: "Country select"
  ref: "#country"
  value: "US"
```

### Keyboard Input

```
browser_press_key:
  key: "Enter"

browser_press_key:
  key: "Tab"
```

---

## Visual Verification

### Take Screenshots

```
// Viewport screenshot
browser_take_screenshot:
  filename: "feature-mobile.png"

// Full page screenshot
browser_take_screenshot:
  fullPage: true
  filename: "feature-full.png"

// Specific element
browser_take_screenshot:
  element: "User card component"
  ref: ".user-card"
  filename: "user-card.png"
```

### Responsive Testing

Resize and screenshot at different widths:

```
// Mobile
browser_resize:
  width: 375
  height: 667

browser_take_screenshot:
  filename: "feature-375.png"

// Tablet
browser_resize:
  width: 768
  height: 1024

browser_take_screenshot:
  filename: "feature-768.png"

// Desktop
browser_resize:
  width: 1280
  height: 800

browser_take_screenshot:
  filename: "feature-1280.png"
```

---

## Error Detection

### Check Console Messages

```
browser_console_messages
```

Look for:
- **Errors**: JavaScript errors, failed requests
- **Warnings**: React warnings, deprecation notices
- **Failed network requests**: 404s, CORS issues

### Check Network Requests

```
browser_network_requests
```

Verify:
- API calls succeed (200/201 status)
- No CORS errors
- Response times are reasonable

---

## Scrolling and Navigation

### Scroll to Element

```
browser_scroll:
  element: "Footer section"
  ref: "#footer"
  scrollIntoView: true
```

### Scroll Page

```
// Scroll down
browser_scroll:
  direction: "down"
  amount: 500

// Scroll to bottom
browser_scroll:
  direction: "down"
  amount: "max"
```

### Browser Navigation

```
browser_navigate_back
browser_navigate_forward
browser_reload
```

---

## Testing Interactive States

### Hover States

```
browser_hover:
  element: "Button"
  ref: "#primary-btn"

browser_take_screenshot:
  filename: "button-hover.png"
```

### Focus States

```
browser_click:
  element: "Input field"
  ref: "#email"

browser_take_screenshot:
  filename: "input-focused.png"
```

### Check Element State

```
// Is element visible?
browser_is_visible:
  element: "Modal"
  ref: "#modal"

// Is checkbox checked?
browser_is_checked:
  element: "Terms checkbox"
  ref: "#terms"

// Is button enabled?
browser_is_enabled:
  element: "Submit button"
  ref: "#submit"
```

---

## Complete Testing Workflow Example

Here's a complete example testing a user registration form:

```
# 1. Navigate and lock
browser_navigate:
  url: "http://localhost:3000/register"
  take_screenshot_afterwards: true

browser_lock

# 2. Get initial page structure
browser_snapshot

# 3. Test form interaction
browser_fill:
  element: "Name input"
  ref: "#name"
  value: "John Doe"

browser_fill:
  element: "Email input"
  ref: "#email"
  value: "john@example.com"

browser_fill:
  element: "Password input"
  ref: "#password"
  value: "SecurePass123!"

# 4. Screenshot before submit
browser_take_screenshot:
  filename: "register-filled.png"

# 5. Submit form
browser_click:
  element: "Register button"
  ref: "#register-btn"

# 6. Wait for response
browser_wait_for:
  selector: ".success-message"
  state: "visible"
  timeout: 5000

# 7. Verify success
browser_snapshot:
  take_screenshot_afterwards: true

browser_console_messages

# 8. Test responsive
browser_resize:
  width: 375
  height: 667

browser_take_screenshot:
  filename: "register-mobile.png"

# 9. Release browser
browser_unlock
```

---

## Handling Common Scenarios

### Dialogs and Modals

For alert/confirm/prompt dialogs, set up the handler BEFORE triggering:

```
// Set up handler first
browser_handle_dialog:
  accept: true  // or false for cancel

// Then trigger the dialog
browser_click:
  element: "Delete button"
  ref: "#delete-btn"
```

### Waiting for Content

```
// Wait for element to appear
browser_wait_for:
  selector: ".data-loaded"
  state: "visible"
  timeout: 10000

// Wait for element to disappear (loading spinner)
browser_wait_for:
  selector: ".loading"
  state: "hidden"
  timeout: 10000
```

### Working with Tabs

```
// List all tabs
browser_tabs:
  action: "list"

// Switch to specific tab
browser_tabs:
  action: "select"
  viewId: "tab-id-from-list"

// Close current tab
browser_tabs:
  action: "close"
```

---

## Testing Checklist

Use this checklist for every feature:

```
Initial Verification:
- [ ] Page loads without errors
- [ ] No console errors/warnings
- [ ] Layout renders correctly

Functionality:
- [ ] Forms accept input
- [ ] Buttons are clickable
- [ ] API calls succeed
- [ ] Success/error states display

Visual Quality:
- [ ] Spacing is consistent
- [ ] Alignment is correct
- [ ] Text is readable
- [ ] Colors match design system

Responsive:
- [ ] Mobile (375px) layout works
- [ ] Tablet (768px) layout works
- [ ] Desktop (1280px) layout works

Interactive States:
- [ ] Hover states work
- [ ] Focus indicators visible
- [ ] Active states display
- [ ] Disabled states respected

Cleanup:
- [ ] Browser unlocked
```
