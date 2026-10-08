---
name: Swayam Space Journey
description: Quiet spacecraft window with editorial engineering content
colors:
  neutral-bg: "#040810"
  foreground: "#edf1f7"
  secondary: "#aab8c9"
  primary: "#9fc6ef"
  line: "#ffffff24"
typography:
  display:
    fontFamily: "Manrope Variable, Arial, sans-serif"
    fontSize: "clamp(44px, 5.4vw, 82px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  accent:
    fontFamily: "Newsreader Variable, Georgia, serif"
    fontWeight: 400
  body:
    fontFamily: "Manrope Variable, Arial, sans-serif"
    fontSize: "16px"
    lineHeight: 1.65
rounded:
  control: "3px"
  dialog: "12px"
spacing:
  mobile-gutter: "24px"
  desktop-gutter: "8vw"
components:
  button-primary:
    backgroundColor: "#e3ebf3"
    textColor: "#09121e"
    rounded: "{rounded.control}"
    padding: "12px 22px"
---

# Design System: Space Journey

## Overview

A quiet spacecraft window framing a continuous professional journey. NASA documentary scale, Interstellar restraint, and premium product clarity. The portfolio is an experience; project pages emphasize reading.

**The Content Independence Rule.** Resume facts live in HTML and data records. Scene failure must never remove professional information.

## Colors

Space is near black. Soft white is the primary reading color; blue is reserved for focus, selected controls, and atmospheric light. Secondary text uses a cool blue-gray. Planetary warmth belongs to Mars, Jupiter, and the accretion disk.

## Typography

Manrope carries headings, controls, and body copy. Newsreader provides occasional italic editorial emphasis. Display headings remain restrained, balanced, and within the defined tracking floor. Both fonts are self-hosted through Fontsource.

## Layout

Desktop destinations place a central viewing field between the professional heading and supporting engineering facts. Spatial labels are projected from actual station modules, architecture relays, service moons, reasoning paths, and education observation points. No flat SVG orbit doodles connect arbitrary screen positions. Content regions are transparent, with small text shadows and thin rules. At 1100px and below, projected callouts attach directly to the real station modules, Mars orbit relays, ClearPath stream inputs, TenantLens moons, education objects and TimeLens probe. Jupiter retains its established moon-caption layout. Compact schematics render only when WebGL is unavailable; mobile stacks the professional text. ClearPath scales uniformly to 82% on mobile so both real input docks fit.

**The Native Scroll Rule.** No wheel interception, scroll snapping, or forced horizontal navigation.

## Elevation & Depth

Real geometry and perspective create visual depth. Content overlays remain mostly transparent. Fine rules group facts without a grid of glowing cards. Only the navigation console uses a contained elevated surface. Skills forms a cinematic field of lit, irregular, textured 3D skill asteroids in one instanced mesh; up to six labels attach to nearby rocks without an orbital hub or spokes. Solar System Scope textures ground the planetary surfaces; education uses a moon, station, and advanced observatory along one chronological route, with AWS orbiting the final stage.

## Shapes

Controls have small corners. The navigation console has a moderate radius. Circular forms belong to actual orbital symbols and celestial geometry.

## Components

Primary actions use a light surface and dark text. Secondary actions use a fine border. Subsystems and moon services use pressed-state semantics. The navigation console contains keyboard focus and restores it on close. The journey rail is secondary navigation; mobile uses the regular navigation menu.

## Do's and Don'ts

**The Quiet Space Rule.** Motion should communicate distance and approach. Avoid bouncing UI, neon glow, a large cockpit, random planetary assignments, and fake telemetry. Respect reduced motion and device constraints. Journey destination labels are secondary framing required by the brief; professional roles and engineering explanations remain ordinary language.

Lint, strict typecheck, production build, and orbital-clearance checks pass. An isolated headless Chrome session reviewed the requested widths with software WebGL, without application console errors or horizontal overflow. Physical-device GPU behavior and final visual approval remain manual checks.


## Current semantic scene treatment

Mars changes only its station-centered closed ellipse; its nodes, labels, planet and hardware stay in place. Jupiter is a natural 3D moon system with independent inclined orbits and no persistent tracks. Six important captions follow real moon anchors; page-owned caption spacing and restrained stems maintain readability. ClearPath is an asymmetric deep-space modular AI lab with two input docks, not a planet or a duplicate of the D&D truss station.

Skills is forward camera travel through fixed world-space asteroids, with genuine perspective growth, near passes, mid-distance and far skill rocks. The full-window field contains exactly the 49 unique technologies in data/skills.ts, with no decorative fragments; captions never change names on an unmoving rock. Skills is one continuous native-scroll experience with no phase captions or scene replacement. The broad volume uses deterministic scattered positions across width, height and irregular depth, with responsive transverse bounds and varied physical sizes. Position candidates are selected once per device class using projected separation during shared reading intervals; no rows or columns remain. Visible captions retain priority, with small persistent vertical offsets to avoid overlap. Up to 20/12/8 collision-spaced labels remain fully opaque throughout the reading window. A 1100svh desktop/tablet and 1300svh mobile flight deliberately slows camera movement; entrance/exit fades apply only to the whole field. No visible duplicate skills grid or selector. Reduced motion removes ambient parallax/orbital motion while retaining user-controlled progress. Transparent content surfaces, stable canvas identity, normal page-root caption ownership and licensed local textures remain mandatory. Education retains its progressively advanced outposts and a small orbiting AWS beacon. Responsive callouts use consistent thin connector lines, viewport bounds and collision-aware spacing; supporting architecture lists remain available to assistive technology without duplicating the visual scene. Skills renders on scroll demand at DPR 1, shares an 80-triangle geometry and Lambert material without bump mapping, caches label measurements, and has no progress divider. The destination canvas also uses demand rendering while the belt is active.
