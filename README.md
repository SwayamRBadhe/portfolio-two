# Swayam Badhe - Space Journey Portfolio

A second, independent portfolio concept: an uninterrupted voyage through software engineering, backend systems, full-stack development, and applied AI. Native vertical scrolling moves the viewpoint through a quiet spacecraft window. Professional content stays in HTML, with 3D as progressive enhancement.

## The journey

1. **Earth - Introduction.** Home base introduces Swayam Rohidas Badhe, his focus, location, and links.
2. **Orbital station - D&D Motor Systems.** An interconnected, operating station represents maintaining and gradually modernizing a live legacy production platform.
3. **Mars colony - Accenture.** The settlement represents layered backend infrastructure, query performance, integration, and testing.
4. **Jupiter knowledge system - Syracuse University iConsult Collaborative.** Six independently orbiting workflow moons connect documents, NLP/LLM extraction, embeddings, ChromaDB, semantic retrieval, and validation. Eight smaller moons populate the scene.
5. **Deep-space AI research station - ClearPath AI.** Two data docks receive document retrieval and explainable model output in one modular application lab. The project is not legal advice.
6. **Multi-moon system - TenantLens.** A central secured platform connects fake-review detection, rent manipulation scoring, and neighborhood safety assessment. Selecting a service highlights its corresponding moon.
7. **Deep-space observatory - Education and certification.** A calmer section presents completed degrees and AWS certification.
8. **Exploration probe - TimeLens.** A smaller historical discovery experiment, rather than a major planetary destination.
9. **Earth - Contact.** A quiet return to the person behind the work.

The technology asteroid belt carries the Skills journey between TenantLens and the academic observatory route.

## Stack

Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4, Framer Motion, Three.js, React Three Fiber 9, Drei, and Lucide. Manrope and Newsreader are self-hosted through Fontsource. There are no databases, CMS integrations, authentication services, paid APIs, or secrets.

## Local development

Use Node.js 22 LTS or newer and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3000. On Windows PowerShell, use `npm.cmd` if the npm PowerShell shim is restricted. To compare with another local portfolio, run `npm run dev -- --port 3001`.

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

All project detail routes are generated from the content data:

- `/projects/clearpath-ai`
- `/projects/tenantlens`
- `/projects/timelens`

## Project structure

```text
app/
  globals.css                  Responsive design system
  layout.tsx                   Metadata and self-hosted fonts
  page.tsx                     Main journey entry
  projects/[slug]/page.tsx      Readable project detail pages
components/
  Journey.tsx                  Shared scroll model and HTML composition
  space/
    JourneyController.ts       Normalized progress and pacing
    CameraRig.tsx              Damped camera and restrained pointer movement
    SpaceCanvas.tsx            Renderer, destination positions, visibility
    SpaceLighting.tsx          Gradual lighting changes
    Starfield.tsx              Seeded layered stars, varied sizes and distant dust
    Planet.tsx                 Detailed Mars, Jupiter, and moon shaders
    Earth.tsx                  Geographic coastline map, clouds, atmosphere
    SemanticSystems.tsx        Projected labels and spatial architecture paths
    OrbitalStation.tsx         Modular production / research stations
    AIResearchStation.tsx         Modular AI lab with two input docks
    TenantSystem.tsx           Central planet, orbit paths, three moons
    Observatory.tsx            Observatory and smaller exploration probe
  ui/
    Navigation.tsx             Navigation, mobile menu, command palette
    SkillsSystem.tsx           Interactive onboard technology architecture
    ExperienceOverlay.tsx      Professional experience
    ProjectOverlay.tsx         Flagship projects and service selection
    EducationOverlay.tsx       Education and certification
    HeroOverlay.tsx            Identity and primary actions
    ProbeOverlay.tsx           TimeLens discovery
    ContactOverlay.tsx         Final contact and direct resume links
    DestinationLabel.tsx       Secondary journey framing
    Pipeline.tsx               Accessible engineering flows
    SocialLinks.tsx            Shared GitHub / LinkedIn links
 data/
  experience.ts
  projects.ts
  skills.ts
  education.ts
  navigation.ts
public/
  icon.svg                     Local favicon
  og.png / og.svg               Social preview and editable source
  resume/                      Owner-supplied PDF location
```

## Content architecture

Edit professional facts in `data/`, not in the scene components. Project details, homepage summaries, technology lists, and architecture paths reuse the same records. Scene labels consume the same content records; all facts remain available in normal HTML. All reported metrics originate from the supplied brief; there are no invented testimonials, awards, or results. ClearPath and TenantLens source links were verified as public repositories through the GitHub connector on October 7, 2026.

## Scroll and camera system

`Journey.tsx` owns one passive scroll listener. A requestAnimationFrame callback measures progress against the centers of the actual HTML destination sections. A ResizeObserver recalculates anchors when layout changes. This makes pacing responsive to content height rather than fixed page percentages.

`progressAtScroll` maps those anchors to 0-1 and eases each leg with smoothstep. Nine destinations are spaced 28 world units apart along the negative Z axis. `CameraRig` reads the shared MotionValue directly in `useFrame`; exponential damping moves the camera toward `10 - progress * 8 * 28`. Continuous animation does not update React state every frame. The HTML journey rail updates only as the nearest destination changes.

Destinations remain at persistent world positions. Upcoming objects are small and distant, enlarge as the camera approaches, then move past the viewpoint. Nearby groups are rendered; distant groups are hidden. CSS gradient compositions remain beneath the renderer for startup and failure states. Native anchor navigation and normal scrolling work independently of the scene.

## Visual implementation

Earth uses locally rasterized Natural Earth 1:110m coastline data, ocean specular shading, a day/night terminator, a separate cloud sphere, and a restrained atmospheric shell. Geography is grounded in real coastline rings; surface colors and weather remain stylized. Mars uses warm surface variation. Jupiter uses procedural cloud bands, with a station in front. Stations use proportioned cylindrical modules, collar details, and shared framed photovoltaic panels. Mars and Jupiter use explicit orbital layouts with conservative object envelopes; the observatory has a segmented primary mirror, secondary-mirror struts, a sunshield, and solar wings. TenantLens has three distinct service moons with projected labels and paths connecting to the secured core; the HTML service buttons highlight the corresponding moon and its connector.

ClearPath uses an engineered deep-space lab with two data docks, compute modules, communications hardware and an independent solar array. Its two technical streams enter the same application. The layered starfield retains its density and dust without local gravitational distortion.

Lighting interpolates between cool Earth, industrial white, warm Mars, Jupiter's reflected tones, restrained singularity warmth, and cool observatory light. The custom planet shader also controls planetary lighting independently.

## Ship Systems

Six keyboard-accessible buttons select propulsion/backend, navigation/frontend, data, AI, infrastructure, or reliability/security. The selected subsystem exposes its description and complete technology list in a stable detail region. `aria-pressed` communicates selection; `aria-live` announces the updated detail. No skills are hidden in a canvas interaction.

## Mobile and performance

At widths at or below 900px, the scene uses 1,915 stars rather than 6,145, scales celestial geometry to 58%, 40-by-24 planet geometry rather than 80-by-48, DPR capped at 1.15 rather than 1.5, and no pointer movement or star distortion. The camera composition is adjusted for a narrow screen; HTML switches to one column with 24px gutters. The journey rail is replaced by unobtrusive bottom status text. Native touch scrolling is preserved.

The renderer is dynamically imported and does not block initial HTML. There are no large texture downloads, environment maps, shadows, physics engines, or postprocessing pipelines. Nearby-group visibility bounds draw calls. Materials are explicitly disposed where externally constructed, and declarative geometry is managed by React Three Fiber. There are only ambient and directional lights. Rendering stops when the tab is hidden. Drei AdaptiveDpr is included alongside explicit device caps; there is no claim of benchmarked adaptive frame rates.

## Reduced motion

`prefers-reduced-motion` disables smooth HTML scrolling, pointer movement, slow destination rotation, and star distortion. The camera uses static nearest-destination compositions rather than continuous travel. The canvas uses demand rendering and invalidates when shared progress changes. Information remains fully readable.

## WebGL fallback and accessibility

The CSS starfield and destination-specific celestial shapes remain available if WebGL is unavailable, the renderer throws, or its context is lost. Three.js is always a visual enhancement. Experience, projects, skills, education, resume links, and contact are HTML.

Semantic sections, a skip link, native links, visible focus, accessible subsystem controls, mobile menu labels, and a focus-contained command palette are included. Use Ctrl/Cmd+K or the search button to open the navigation console; Escape closes it and returns focus. Project detail pages can be opened directly.

## Resume

Place the actual PDF at:

```text
public/resume/Swayam_Badhe_Resume.pdf
```

Every Resume action opens `/resume/Swayam_Badhe_Resume.pdf` directly. The PDF was not present in this initially empty directory and has not been fabricated. Until it is supplied, that URL will return 404.

## Metadata and Vercel

Title, professional description, OpenGraph/Twitter preview, and local favicon are configured. An optional `NEXT_PUBLIC_SITE_URL` can set the final metadata base and canonical URLs after a domain is chosen. No domain is guessed for this local comparison.

When you choose to deploy later, import this project into Vercel using the Next.js preset, run `npm run build`, and leave the output directory at its default. All public project routes are generated at build time. The site needs no database or secrets. No deployment or GitHub push was performed.

## Composition refinement

The existing journey, camera pacing, navigation, routes, and professional facts are preserved. Destination framing now varies by scene. Experience metrics and TenantLens services sit within the orbital field; architecture flows extend across the composition. Flat SVG trajectory doodles are removed, including the small Earth hero arc. Headings sit above a central viewing area, supporting facts sit beneath it, and labels attach to actual 3D nodes. Perspective paths use Catmull-Rom curves between system components, with transparent content regions and small text shadows.

Education follows a connected academic route: a nearby diploma moon, a larger bachelor’s station, and an advanced master’s observatory. An AWS certification probe sits on an orbit around the final station. A scroll-driven route marker follows the three milestones. The full institution, degree, dates, and GPA/percentage remain in the chronological HTML timeline. Tablet/mobile retain the route and certification in a transparent diagram with distinct outpost symbols.

Orbital placement is defined in `components/space/sceneComposition.ts`. The station envelope includes its entire panel assembly and any rotation. Run `node scripts/check-orbital-clearance.mjs` with Node.js 22.18+ or 24+ to verify planet/station separation and the desktop pointer/camera lane. The current conservative clearance is 1.125 world units for Mars and 1.215 for Jupiter. This numerical check does not replace a visual review.

## Verification status

The refinement passes `npm run lint`, `npm run typecheck`, and `npm run build`. Next.js prerenders the homepage and all three project detail routes. Orbital envelope and camera-lane checks pass. All five professional data files are unchanged.

An isolated extension-free headless Chrome session with software WebGL reviewed all six requested widths. The Canvas remained stable across breakpoints and the browser reported no application runtime errors in the completed checks. Screenshots and JSON evidence are stored locally in `.qa/`. Physical-phone GPU, touch, thermal behavior, and final subjective visual approval still need manual review. See `docs/VERIFICATION.md` for the visual review matrix. No deployment or GitHub push was performed.

## Semantic scene refinement

D&D labels attach to production modules and describe dependency mapping, Git organization, and phased modernization. Mars has six connected infrastructure relays matching Client, REST API, Controller, Service, Repository, and PostgreSQL. Jupiter has six research relays matching documents, NLP/LLM, embeddings, ChromaDB, semantic retrieval, and structured output. Both paths connect to the station bus without intersecting the planetary envelope. ClearPath has separate warm retrieval and cool ML/SHAP streams converging at one application, with the supplied document, case, and accuracy metrics attached. Education has three distinct academic outposts ordered from diploma to master’s degree, culminating in a segmented-mirror observatory and an orbiting AWS certification beacon.

Projected scene annotations belong to the main React DOM tree. Tablet/mobile replace the desktop projected presentation with transparent compact system diagrams in the same viewing field; all stages, services, and education waypoints remain visible. No meaningful map is removed. The renderer retains the shared scroll model, DPR caps, reduced-motion demand rendering, and WebGL fallback.

### Geographic data attribution

`data/earth-coastlines.json` is derived from [Natural Earth land polygons](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson), rounded to three decimal places. Natural Earth is a public-domain map dataset, as documented in its [README](https://github.com/nvkelso/natural-earth-vector/blob/master/README.md). The compact local file is approximately 86 KB and requires no runtime network requests.

## Runtime ownership fix

The former Drei `Html` annotations created separate React DOM roots, appended their wrappers manually, and synchronously removed/unmounted them on cleanup. Mobile breakpoint changes removed that entire label tree. They have been replaced by `SceneAnnotations.tsx`, a stable part of the page's existing React DOM root, and Three.js marker groups that update position styles through a shared registry. There are no application-created DOM roots, portals, or manual DOM node removals.

The Canvas keeps its identity during resize, quality changes, reduced motion, and context loss. Context loss stops rendering and exposes the CSS/semantic fallback. Fatal scene errors still use the existing boundary; ordinary React lifecycle handles route departures. Context event listeners are attached and removed in an effect. Offscreen probe/texture canvases are never appended to the DOM.

The shared layout measurement also records each viewing field's offset; camera pitch interpolates that information to align the celestial system with its HTML labels rather than with a fixed screen half. Footer year is computed on the server and serialized as a prop, keeping hydration deterministic. The app does not produce `cz-shortcut-listen` or suppress hydration warnings; the attribute was absent with browser extensions disabled.

## Solar System Scope textures and attribution

**Solar System Scope assets are imported and used**, rather than linked as future suggestions. Planetary textures by [Solar System Scope / INOVE](https://www.solarsystemscope.com/textures/), licensed under [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/). Attribution, source/mirror provenance, modification notes, dimensions, and file sizes are retained in [public/textures/ATTRIBUTION.md](public/textures/ATTRIBUTION.md) and [manifest.json](public/textures/manifest.json).

- earth-day.webp: Earth surface at home and contact, 2048 × 1024, 148,312 bytes.
- earth-clouds.webp: Earth's independent cloud shell, 1024 × 512, 114,714 bytes.
- mars.webp: Accenture/Mars surface, 2048 × 1024, 204,912 bytes.
- jupiter.webp: iConsult/Jupiter surface, 2048 × 1024, 126,450 bytes.
- moon.webp: Jupiter knowledge moons, TenantLens service moons/platform, diploma outpost, and asteroid materials, 1024 × 512, 137,582 bytes.

Total: 731,970 bytes (about 715 KiB). Images were re-encoded as WebP using the existing Sharp dependency; clouds were downsampled, and the Moon source mirror was already downsampled. Fictional bodies are tinted, and the Moon texture is applied to irregular asteroid geometry. No endorsement is implied. Direct shell downloads were unavailable, so read-only public mirrors of the licensed originals supplied the bytes. Original download links and source Git blob hashes are recorded in the manifest. No runtime hotlinking, paid assets, new dependencies, or premium services are involved.


## Current scene and interaction refinement

Mars retains its textured planet, spacecraft, six backend nodes, labels and metrics. Only its station loop changes: a 128-segment closed ellipse centered at the spacecraft's existing position, with continuous closure and the same restrained line treatment. The narrow-screen ellipse closes with SVG arc commands and Z.

Jupiter has six Moon-textured knowledge moons plus eight smaller, unlabeled moons. Each important moon has a different radius, inclination, ascending-plane angle, initial phase and angular speed. No orbital tracks are drawn. Captions follow their actual projected anchors; a page-owned layout avoids collisions, using quiet connector stems when spacing requires it. Mobile enlarges important moon bodies modestly and keeps all six captions legible. The texture-backed WebGL fallback uses the same orbital elements and pauses offscreen/when hidden.

ClearPath is an asymmetric deep-space AI research lab with a compute spine, two colored data docks, radiator/compute modules, communications mast and solar array. Warm input: USCIS documents / FAISS / RAG, with LangChain retrieval called out. Cool input: Random Forest / SHAP / explainable output. Animated packets enter separate ports of the same application. Existing metrics remain, with additional transparent spatial callouts for 25,480 cases, 73.6% model accuracy and four official USCIS documents. The previous phenomenon, shader and background distortion are removed; fallback art also shows the station.

Skills is a full-window perspective flight. Native scroll advances the camera 132 world units through exactly 49 permanently named rocks from the unique technologies in `data/skills.ts`, with no added SQL or decorative fragments. All rocks use one instanced mesh, shared 80-triangle geometry, and a lightweight Moon-textured Lambert material without bump mapping. DPR is capped at 1; the belt renders only when scroll or resize changes the view, and the hidden destination scene uses demand rendering while inside the belt. Label dimensions are measured only on resize/font readiness; projection and DOM writes are batched. The obsolete horizontal progress divider is removed. World positions and physical sizes remain fixed; approach, growth, parallax and passing are consequences of perspective and camera travel. One continuous volume spans the entire Skills journey; a deterministic scattered volume broadens the field without changing scenes. Positions vary across all three axes; physical radii vary without changing the asteroid count. Layouts are cached per device class, and projected-separation scoring happens once rather than every frame. Caption priority and persistent small vertical offsets preserve readable spacing. The phase captions are removed. Up to 20 desktop, 12 tablet, and 8 mobile collision-spaced captions may appear together. Labels hold full opacity throughout a wider viewing window. The scroll path is 1100svh on desktop/tablet and 1300svh on mobile, with only gradual whole-field entrance/exit fading. At a reference scroll speed of 250px/s, browser sweeps measured minimum uninterrupted label windows of 5.5s, 4.4s and 3.6s respectively; actual duration depends on scrolling speed and remains unlimited while stopped. All 49 names were verified as actually encountered on desktop, tablet and mobile. The category controls, cards and duplicate visible catalogue are removed; a hidden accessible list retains the complete content for assistive technology. Context-loss fallback uses the same depth projection.

Education preserves Diploma outpost / Bachelor's station / Master's deep-space observatory, with all original degrees, institutions, dates and results. The route traveler follows scroll progression. The AWS probe now revolves around the final observatory, and its caption follows that probe. TenantLens and its three service moons remain intact.

No assets or dependencies were added. All existing texture files and professional records remain unchanged. Routes and menu links are preserved. Added: orbitalMotion.ts, JovianSystem.tsx, JovianLabelLayout.tsx, JovianMap.tsx and AIResearchStation.tsx. Updated: scene systems, renderer composition, starfield (distortion removal only), skills field/UI/layout, scene captions, responsive CSS, semantic navigation names and verification script.

Current production preview: http://localhost:3001. See docs/VERIFICATION.md for exact checks and physical-device limitations. Nothing was pushed or deployed.

## Responsive scene semantics

Working WebGL scenes use direct projected labels at mobile/tablet widths through 1100px. D&D anchors belong to station modules; Mars labels follow its existing closed orbit relays; ClearPath labels follow both real streams into its station; TenantLens labels attach to its three moons and central platform; Education labels attach to its outposts, observatory and moving AWS beacon; TimeLens labels its actual probe. A shared bounded caption solver avoids overlaps and draws thin anchor connectors. ClearPath uses a uniform mobile scale of 0.82 to keep the stream origins visible. Jupiter retains its original moon label solver. Skills is unchanged. Secondary compact schematics are hidden while WebGL works and remain available only as the renderer-failure fallback. Textual architecture sequences are visually hidden on compact enhanced layouts but retained for screen readers.
