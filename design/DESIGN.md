# Design System Specification: The Logical Machine

## 1. Overview & Creative North Star
This design system is a tribute to high-functioning industrial brutalism. Our Creative North Star is **"The Clinical Diagnostic."** We are not building a consumer app; we are building a mission-critical terminal interface. The goal is to evoke the feeling of a hard-wired, logic-driven machine where every pixel serves a functional purpose. 

To move beyond a "standard" retro-tech look, we utilize **Intentional Data Density**. We break the traditional symmetrical grid by introducing "logic clusters"—areas of high information density (micro-text, crosshairs, reference codes) contrasted against expansive, deep-space voids. The layout should feel like a schematic, not a website.

---

## 2. Colors & Surface Philosophy
The palette is rooted in the high-contrast environment of a deep-space vessel. It prioritizes legibility in low-light conditions and the psychological weight of a monochrome-plus-accent system.

### Tonal Hierarchy
- **Background (`#131313`):** The primary void. All interface elements emerge from this depth.
- **Primary Amber (`#ffdca1` / `#ffba20`):** Used strictly for active data, critical prompts, and system status.
- **Surface Containers:** We use `surface_container_lowest` (#0e0e0e) to `surface_container_highest` (#353534) to define functional zones.

### The "Functional Frame" Rule
While standard UI relies on 1px borders for "boxes," this system prohibits decorative sectioning lines. Instead:
- **Structural Boundaries:** Must be defined by background shifts (e.g., a `surface_container_low` sidebar against a `surface` background).
- **Data Conduits:** Thin amber lines (`outline` token) are reserved *only* for connecting related data points or framing active terminal inputs. If it doesn't represent a logical flow, remove the line.

### Signature Textures
To add "soul" to the digital void, use a **Dot Grid Overlay** (1px dots every 24px) across `surface` levels. For primary action areas, utilize a subtle linear gradient transition from `primary` to `primary_container` to simulate the phosphor burn of an old CRT display.

---

## 3. Typography: The Monospace Mandate
We use **Space Grotesk** across all levels to maintain a rigid, machine-readable aesthetic.

- **Display (Large):** Reserved for system-level status or critical alerts. Must be **UPPERCASE** with -2% letter spacing.
- **Headings (Headline/Title):** Always **UPPERCASE**. These act as "Section Identifiers." Use `label-md` reference codes (e.g., `REF-42/B`) as prefixes to all headings.
- **Body:** Used for data readouts. Maintain a generous line height (1.5) to ensure legibility amidst dense information.
- **Micro-Labels:** Use `label-sm` (0.6875rem) for "noise" elements like coordinate points, timestamps, and secondary metadata.

---

## 4. Elevation & Depth: Tonal Layering
In a terminal environment, there are no shadows—only light and its absence. We achieve hierarchy through **Density Layering**.

- **The Layering Principle:** Depth is achieved by stacking containers. A `surface_container_highest` card sitting on a `surface` background creates a "lifted" diagnostic module. 
- **The "Ghost Border" Fallback:** For secondary modules, use a "Ghost Border" (the `outline_variant` token at 15% opacity). This provides a structural hint without cluttering the visual field.
- **Glassmorphism:** For "floating" diagnostic overlays, use a semi-transparent `surface_container` with a `backdrop-filter: blur(10px)`. This simulates a glass-panel readout over the main hardware console.

---

## 5. Components

### Buttons (Action Conduits)
- **Primary:** Solid `primary` background, `on_primary` text. No rounded corners (`0px`). 
- **Secondary:** `outline` stroke (amber) with `primary` text.
- **Tertiary:** Text-only with ">>" prefix markers.
- *Interaction:* On hover, the button should invert colors immediately (0ms transition) to mimic mechanical relay switches.

### Input Fields (Command Lines)
- Inputs must never look like "boxes." They are underlined by a `primary` stroke with a blinking block cursor. 
- **Helper Text:** Must be styled as `label-sm` with a system-code prefix (e.g., `SYS_MSG: Enter coordinates`).

### Chips (Status Indicators)
- Rectangular blocks. For status, use `error_container` for critical failures and `secondary_container` for nominal operations. No icons; use text abbreviations (e.g., `NOM`, `CRIT`, `STBY`).

### Cards & Modules
- **No Dividers:** Separate content using `surface_container` tier shifts or vertical whitespace. 
- **Accents:** Add a `+` marker in the `outline` color to the four corners of any high-priority module.

### Micro-Elements (The "Noise" Layer)
- **Crosshairs:** Use at the center of empty states or image containers.
- **Reference Strings:** Randomly generate alphanumeric strings (e.g., `NOST-0034-X`) in `label-sm` to occupy the corners of containers.

---

## 6. Do's and Don'ts

### Do:
- **Embrace Asymmetry:** Place a large readout on the left and a dense cluster of micro-data on the right.
- **Use All Caps for Authority:** Headings and labels should feel like commands.
- **Keep it Flat:** Rely on color shifts (`surface-container` tiers) for depth, never soft drop-shadows.
- **Treat the UI as a Map:** Use hatches and coordinate markers to guide the eye.

### Don't:
- **No Border Radius:** Everything is 90-degree angles. Any curve breaks the industrial immersion.
- **No Soft Glows:** We are aiming for a functional terminal, not a "cyberpunk" neon aesthetic. Lines should be crisp and sharp.
- **No Standard Icons:** Replace generic icons with text-based labels or custom-drawn geometric glyphs.
- **No Scrolling Transitions:** If possible, use "snap" transitions or "glitch" cuts between views. Smooth "apple-style" easing is prohibited.