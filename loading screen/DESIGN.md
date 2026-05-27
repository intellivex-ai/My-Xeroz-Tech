---
name: Exorz Brutalist Framework
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1b1b'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Anybody
    fontSize: 120px
    fontWeight: '900'
    lineHeight: 100px
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: Anybody
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 60px
  headline-lg-mobile:
    fontFamily: Anybody
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 38px
  headline-md:
    fontFamily: Anybody
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  grid-margin: 2rem
  gutter: 0px
  border-width-thin: 1px
  border-width-thick: 3px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 64px
---

## Brand & Style

This design system is rooted in **Neo-Brutalism**, specifically tailored for a digital design and web development agency. It rejects the polished, safe aesthetics of modern SaaS in favor of a raw, industrial, and unapologetic presence. The brand personality is technical, high-performance, and intentionally provocative.

The style is characterized by:
- **Raw Functionalism:** UI elements are exposed and structural.
- **Visual Tension:** Heavy borders and oversized typography create a sense of digital "heft."
- **Uncompromising Contrast:** A strictly monochromatic palette that demands attention and ensures absolute clarity.
- **Architectural Grid:** Everything is pinned to a visible or strongly implied grid, echoing the structural integrity of code and engineering.

## Colors

The palette is strictly binary. There are no shades of gray, no gradients, and no transparency blurs. 

- **Deep Black (#000000):** Used for all structural elements, borders, and primary text. It represents the "ink" of the digital world.
- **Crisp White (#FFFFFF):** Used for backgrounds and inverted text. It provides the "void" that allows the heavy typography to breathe.
- **Functional Inversion:** Interaction states (hover/active) are handled through simple color inversion rather than hue shifts. If a button is Black with White text, its active state is White with Black text.

## Typography

Typography is the primary visual driver of this design system. 

- **Headlines:** We use **Anybody** in its heaviest weights. It should be used at massive scales, often overlapping other elements or pushing the boundaries of the viewport. For "distorted" effects, headlines can be stretched or sheared via CSS transforms (e.g., `scaleY(1.2)` or `skewX(-10deg)`).
- **Body & Technical Info:** We use **JetBrains Mono**. As a monospaced font, it reinforces the agency's technical expertise and developer-centric roots. It ensures that data-heavy layouts remain legible and structured.
- **Vertical Text:** Use vertical writing modes for labels and side-tabs to maximize grid utility and lean into the industrial aesthetic.

## Layout & Spacing

The design system utilizes a **Fixed Grid** model inspired by technical blueprints and newspaper layouts.

- **The Blueprint Grid:** Use a strict 12-column grid on desktop. Gutters are 0px, as divisions are created by visible 1px or 3px black borders rather than empty space.
- **Borders as Dividers:** Every major section must be encased in a thick (3px) border. Internal divisions use a thin (1px) border.
- **Mobile Reflow:** On mobile, the 12-column grid collapses to a single column. Horizontal borders become primary separators.
- **Padding:** Maintain a generous 24px internal padding for containers to ensure text does not touch the heavy borders, preserving legibility.

## Elevation & Depth

This system is strictly flat. There are no shadows, no blurs, and no Z-axis depth in the traditional sense. 

- **Structural Layering:** Depth is achieved through "Tonal Stacking." To elevate an element, place it in a black container with white text. To push it back, use a white container with black text.
- **Hard Offsets:** If depth is absolutely required (e.g., a "pop-up" modal), use a "Hard Shadow"—a solid black rectangle offset by 8px or 16px behind the main container. 
- **The "Sticker" Effect:** Elements can overlap edges of containers to feel like they are "pasted" onto the interface, breaking the rigid grid while maintaining a flat perspective.

## Shapes

The shape language is defined by the **Right Angle**. 

- **Sharp Edges:** All buttons, inputs, and containers must have a 0px border-radius. This reinforces the "unrefined" and industrial feel.
- **Geometric Accents:** Circles or 45-degree angles may be used sparingly for icons or specific "GO" buttons to provide a point of focus against the predominantly rectangular layout.
- **Icons:** Use heavy-stroke, low-detail icons. All strokes must match the system's border widths (1px or 3px).

## Components

### Buttons
Buttons are high-impact. The primary "GO" button is a solid Black rectangle with White, uppercase **Anybody** text. On hover, it must invert to White background with Black text and a 3px Black border.

### Input Fields
Inputs are simple White boxes with a 2px Black border. Labels should be placed directly on the top border line or inside the box using **JetBrains Mono** in all-caps.

### Chips/Tags
Tags are smaller boxes with 1px borders. They use the `label-caps` typography style. They never have rounded corners.

### Lists
Lists are separated by 1px horizontal lines. Each list item should feel like a row in a spreadsheet, often including a "technical" index number (e.g., 01, 02, 03).

### Progress Bars / Data Viz
Use solid Black fills for bars. Avoid any softening or animation easing; transitions should be "Linear" or "Instant" to maintain the technical mood.

### Marquees
A signature component of this design system. Use a scrolling marquee of text (e.g., "EXORZ TECH // WEB DEV // DESIGN") to create movement in an otherwise static, rigid grid.