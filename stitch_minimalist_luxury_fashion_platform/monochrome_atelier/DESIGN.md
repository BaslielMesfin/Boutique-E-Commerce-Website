---
name: Monochrome Atelier
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
  secondary: '#5d5e60'
  on-secondary: '#ffffff'
  secondary-container: '#dfdfe1'
  on-secondary-container: '#616365'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1f'
  on-tertiary-container: '#828488'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e4'
  secondary-fixed-dim: '#c6c6c8'
  on-secondary-fixed: '#1a1c1d'
  on-secondary-fixed-variant: '#454749'
  tertiary-fixed: '#e2e2e7'
  tertiary-fixed-dim: '#c6c6cb'
  on-tertiary-fixed: '#1a1c1f'
  on-tertiary-fixed-variant: '#45474b'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.05em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-edge: 48px
  section-gap: 120px
---

## Brand & Style

The design system is rooted in the philosophy of "essentialism." It targets a discerning, high-end clientele that values craftsmanship over clutter. Drawing inspiration from luxury fashion houses and the precision of Apple’s hardware aesthetics, the system utilizes extreme negative space and high-contrast visual hierarchies to make products the sole focus.

The style is **Minimalist** with a focus on archival clarity. It avoids trends in favor of timelessness, utilizing a stark monochromatic palette to create an environment that feels both expansive and exclusive. Every element is intentional; if a component does not serve a functional or aesthetic purpose, it is removed.

## Colors

The color strategy for this design system is strictly monochromatic. White space is treated as a physical material, providing the "breathability" expected of a luxury boutique. 

- **Primary Black (#000000):** Reserved for high-impact typography and primary action states.
- **Surface Grays (#F5F5F7, #E8E8ED):** Used to differentiate UI layers without introducing hue. 
- **Interactive States:** Primary buttons are solid black with white text. Hover states utilize subtle opacity shifts (from 100% to 80%) rather than color changes.

## Typography

This design system employs **Inter** for its neutral, architectural qualities. 

- **Headings:** Set with generous letter-spacing (tracking) to evoke the feel of high-fashion editorial spreads. They should remain rhythmic and authoritative.
- **Body Text:** Optimizes readability through slightly tightened tracking and ample line-height. 
- **Labels:** Small-caps or uppercase transformations are used for secondary navigation and metadata to create a distinct visual texture from body copy.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop to maintain the integrity of a curated lookbook. 

- **The 12-Column Grid:** Elements should align strictly to a 12-column structure with wide 24px gutters.
- **Negative Space:** Vertical rhythms are intentionally loose. Section gaps of 120px+ are encouraged to prevent the user from feeling "crowded."
- **Alignment:** Left-aligned typography is standard for readability, while hero sections may utilize centered compositions for formal balance.

## Elevation & Depth

To maintain a minimalist aesthetic, this design system rejects heavy shadows. Depth is conveyed through **Tonal Layers** and **Subtle Outlines**.

- **Surfaces:** Use `#F5F5F7` to pull secondary information (like sidebar filters or cart drawers) away from the primary `#FFFFFF` canvas.
- **Borders:** A 1px solid border in `#E8E8ED` is the primary tool for containment. 
- **Shadows:** If absolutely necessary for modals, use a "Product Shadow": a very soft, highly diffused ambient occlusion shadow (0px 20px 40px rgba(0,0,0,0.04)).

## Shapes

The shape language is **Soft (0.25rem/4px)**. 

While the layout is overall very rectangular and structured, the slight rounding of corners prevents the UI from feeling aggressive or industrial. This "Apple-style" radius provides a premium, machined feel to buttons and input fields.

## Components

- **Buttons:** Primary buttons are solid black with white text. Secondary buttons are 1px black outlines with transparent backgrounds. Both use 4px corner radii.
- **Pills:** Selection chips for sizes or categories should be pill-shaped (fully rounded). Inactive states use a light gray background (#F5F5F7); active states are solid black.
- **Form Fields:** Minimalist design with only a bottom 1px border. Labels float above the field in uppercase 12px font.
- **Cards:** Product cards are borderless with high-quality photography. Text metadata (Price, Name) is placed underneath with generous padding.
- **Breadcrumbs & Progress:** Use thin 1px lines and simple typographic shifts to indicate current position.
- **Imagery:** All image containers should have a slight 1px inset border or a background color of #F5F5F7 to ensure white-background product shots don't "bleed" into the page.