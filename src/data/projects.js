export const projects = [
  {
    slug: "ats-screener",
    number: "01",
    year: "2026",
    status: "Actively maintained",
    url: "ats-screener.vercel.app",
    title: "ATS Screener",
    subtitle: "Your resume vs. 6 real enterprise ATS engines",
    problem:
      "Most free ATS checkers hand you a single made-up score and paywall everything useful behind it. Job seekers had no way to know how their resume would actually be parsed by the specific hiring platforms real companies use, Workday, Greenhouse, Taleo, and others, each of which scores resumes differently based on undocumented internal logic.",
    approach: [
      "Reverse-engineered and documented how six major ATS platforms actually parse resumes: their section detection, keyword weighting, and formatting penalties, by studying public engineering blog posts, patents, and observed parsing behavior.",
      "Built a client-side parsing layer so resumes never leave the browser unnecessarily; only the extracted plain text is sent onward, keeping the raw file private.",
      "Modeled each ATS engine as an independent scoring module with its own thresholds, so a resume gets six honest, differentiated scores instead of one averaged number.",
      "Used an LLM as a calibrated scoring assistant, constrained by the documented rules per platform, rather than letting it freely guess a score.",
    ],
    diagram: {
      width: 900,
      height: 420,
      nodes: [
        { id: "browser", label: "Browser", detail: "PDF/DOCX parsed locally via pdfjs-dist and mammoth", category: "frontend", x: 60, y: 210 },
        { id: "extraction", label: "Extraction Layer", detail: "Structured text and section detection (SvelteKit)", category: "backend", x: 260, y: 210 },
        { id: "scoring", label: "Scoring Engine", detail: "6 independent ATS-behavior models", category: "engine", x: 540, y: 110 },
        { id: "llm", label: "LLM Layer", detail: "Gemma 3 27B, constrained scoring per engine", category: "ai", x: 540, y: 320 },
        { id: "results", label: "Results UI", detail: "Six scores, actionable formatting feedback", category: "output", x: 760, y: 210 },
      ],
      edges: [
        { from: "browser", to: "extraction" },
        { from: "extraction", to: "scoring", label: "parse" },
        { from: "extraction", to: "llm", label: "score", dashed: true },
        { from: "scoring", to: "results" },
        { from: "llm", to: "results", dashed: true },
      ],
    },
    techStack: [
      { name: "SvelteKit", reason: "Small bundle size and fast client-side rendering mattered since all parsing happens in the browser, not on a server." },
      { name: "TypeScript", reason: "Six separate scoring models with different rule sets needed strict typing to avoid silently mixing up thresholds between engines." },
      { name: "pdfjs-dist and mammoth", reason: "Industry-standard, battle-tested libraries for extracting text and structure from PDF and DOCX without a backend upload." },
      { name: "Custom NLP", reason: "Section and keyword detection needed rules specific to resume formatting conventions that generic NLP libraries don't handle well." },
      { name: "Gemma 3 27B", reason: "Used as a constrained scoring assistant rather than a free-form generator, kept local rule sets as the source of truth to avoid hallucinated scores." },
    ],
    tags: ["SvelteKit", "TypeScript", "pdfjs-dist", "mammoth", "Custom NLP", "Gemma 3 27B"],
  },
  {
    slug: "sunnify",
    number: "02",
    year: "2024",
    status: "Actively maintained",
    url: "sunnify.vercel.app",
    title: "Sunnify",
    subtitle: "Spotify playlists to tagged local audio",
    problem:
      "Existing Spotify downloader tools either grab audio with no metadata, or guess metadata from filenames, leaving libraries full of tracks with wrong artist names, missing album art, or blank release years, unusable in any serious media library or DJ setup.",
    approach: [
      "Resolved each track's real metadata directly from Spotify's catalog first, before ever touching the audio, so the source of truth is always correct.",
      "Matched the resolved metadata against the best available audio source, rather than trusting a filename or search-result title.",
      "Embedded metadata directly into the audio file's tags, not a sidecar file, so it survives being moved between apps and devices.",
      "Added a live counter and batch mode so the tool could be used for single tracks or entire playlists without re-running the process manually.",
    ],
    diagram: {
      width: 1000,
      height: 380,
      nodes: [
        { id: "input", label: "Input", detail: "Spotify playlist or track URL", category: "frontend", x: 60, y: 190 },
        { id: "metadata", label: "Metadata Resolver", detail: "Spotify Web API, artist, album, year, art", category: "backend", x: 260, y: 190 },
        { id: "audio", label: "Audio Resolver", detail: "yt-dlp, best matching audio source", category: "engine", x: 540, y: 190 },
        { id: "tagging", label: "Tagging Layer", detail: "Mutagen, embeds metadata into file tags", category: "ai", x: 760, y: 190 },
        { id: "output", label: "Output", detail: "Correctly tagged local audio file(s)", category: "output", x: 830, y: 300 },
      ],
      edges: [
        { from: "input", to: "metadata" },
        { from: "metadata", to: "audio" },
        { from: "metadata", to: "tagging", label: "metadata", dashed: true },
        { from: "audio", to: "tagging" },
        { from: "tagging", to: "output" },
      ],
    },
    techStack: [
      { name: "Python", reason: "Strong ecosystem for both metadata handling (Mutagen) and audio extraction (yt-dlp), avoided reinventing either." },
      { name: "Flask", reason: "Lightweight enough for a tool that's mostly a processing pipeline behind a simple UI, no need for a heavier framework." },
      { name: "Spotify API", reason: "The only reliable source of truth for accurate track metadata, resolving it here first anchors everything downstream." },
      { name: "yt-dlp", reason: "Actively maintained and resilient to source changes, better long-term reliability than rolling a custom extractor." },
      { name: "Mutagen", reason: "Handles tag embedding across multiple audio formats correctly, so metadata sticks to the file itself." },
    ],
    tags: ["Python", "Flask", "Spotify API", "yt-dlp", "Mutagen"],
  },
  {
    slug: "netdash",
    number: "03",
    year: "2025",
    status: "Actively maintained",
    url: "netdash-toolkit.vercel.app/",
    title: "Netdash",
    subtitle: "40+ network tools in one app",
    problem:
      "Network engineers and IT professionals routinely bounce between a dozen scattered single-purpose calculator sites, subnet math here, VLSM there, bandwidth somewhere else, losing time and context every time they switch tabs mid-task.",
    approach: [
      "Audited the calculators engineers reach for most often and grouped them into logical categories instead of a flat list.",
      "Built each tool as an isolated, reusable module so new calculators could be added without touching existing ones.",
      "Added a favorites system backed by local storage so frequently used tools stay one click away instead of buried in a menu.",
      "Kept everything client-side with no backend calls, so calculations are instant and the tool works offline once loaded.",
    ],
    diagram: {
      width: 780,
      height: 400,
      nodes: [
        { id: "shell", label: "Shell", detail: "React and Vite app, category-based sidebar navigation", category: "frontend", x: 60, y: 200 },
        { id: "tools", label: "Tool Modules", detail: "40+ isolated calculators, shared UI components", category: "engine", x: 300, y: 200 },
        { id: "state", label: "State Layer", detail: "IndexedDB, favorites and recent tools persist locally", category: "backend", x: 560, y: 110 },
        { id: "styling", label: "Styling", detail: "Tailwind, consistent design system across all tools", category: "ai", x: 560, y: 300 },
      ],
      edges: [
        { from: "shell", to: "tools" },
        { from: "tools", to: "state" },
        { from: "tools", to: "styling", dashed: true },
      ],
    },
    techStack: [
      { name: "React", reason: "Component isolation made it straightforward to add new calculators independently without regressions elsewhere." },
      { name: "Vite", reason: "Fast dev iteration mattered given how many small, similar tool components needed building and testing quickly." },
      { name: "Tailwind", reason: "Kept 40+ tools visually consistent without hand-writing repetitive CSS for each one." },
      { name: "IndexedDB", reason: "Needed to persist favorites and recent tools locally without a backend, and it handles more data reliably than localStorage." },
    ],
    tags: ["React", "Vite", "Tailwind", "IndexedDB"],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
