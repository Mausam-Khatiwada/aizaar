import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const categories = [
  {
    id: "image-generation",
    name: "Image Generation",
    icon: "Sparkles",
    emoji: "🎨",
    accent: "#7C3AED",
    accentSoft: "#A78BFA",
    gradient: "linear-gradient(135deg, #7C3AED, #06B6D4)",
    description:
      "Create illustrations, product visuals, concept art, and branded assets with AI image engines built for speed and quality.",
    heroCopy:
      "Find the strongest text-to-image, editing, and style transfer tools for creators, marketers, and design teams.",
    subcategories: [
      "text-to-image",
      "image-editing",
      "brand-assets",
      "photorealistic",
      "illustration",
    ],
  },
  {
    id: "video-generation",
    name: "Video Generation",
    icon: "Clapperboard",
    emoji: "🎬",
    accent: "#06B6D4",
    accentSoft: "#67E8F9",
    gradient: "linear-gradient(135deg, #06B6D4, #3B82F6)",
    description:
      "Turn prompts, storyboards, and raw clips into polished videos with AI-first editing, generation, and post-production tools.",
    heroCopy:
      "Browse cinematic video generation, talking-head creation, editing assistants, and short-form automation workflows.",
    subcategories: [
      "text-to-video",
      "video-editing",
      "avatar-video",
      "short-form",
      "cinematic",
    ],
  },
  {
    id: "music-generation",
    name: "Music Generation",
    icon: "Music4",
    emoji: "🎵",
    accent: "#10B981",
    accentSoft: "#6EE7B7",
    gradient: "linear-gradient(135deg, #10B981, #06B6D4)",
    description:
      "Generate original songs, instrumentals, loops, and royalty-safe soundtracks for content, games, and brand work.",
    heroCopy:
      "Compare the best AI composers for full songs, backing tracks, ad music, cinematic scoring, and genre experimentation.",
    subcategories: [
      "song-generation",
      "instrumentals",
      "royalty-free",
      "soundtracks",
      "stem-creation",
    ],
  },
  {
    id: "voice-audio",
    name: "Voice and Audio",
    icon: "Mic2",
    emoji: "🎙️",
    accent: "#F43F5E",
    accentSoft: "#FDA4AF",
    gradient: "linear-gradient(135deg, #F43F5E, #7C3AED)",
    description:
      "Clone voices, narrate scripts, clean recordings, and build speech experiences with premium voice and audio AI platforms.",
    heroCopy:
      "Explore text-to-speech, dubbing, transcription, expressive speech, and voice design tools built for production teams.",
    subcategories: [
      "text-to-speech",
      "voice-cloning",
      "dubbing",
      "transcription",
      "audio-cleanup",
    ],
  },
  {
    id: "music-video",
    name: "Music Video",
    icon: "Disc3",
    emoji: "💿",
    accent: "#F59E0B",
    accentSoft: "#FCD34D",
    gradient: "linear-gradient(135deg, #F59E0B, #F43F5E)",
    description:
      "Build reactive visuals, lyric videos, and stylized music-first storytelling using AI music video platforms.",
    heroCopy:
      "From audio-reactive visuals to performance avatars, these tools help artists turn songs into scroll-stopping videos fast.",
    subcategories: [
      "audio-reactive",
      "lyric-video",
      "music-promo",
      "visualizer",
    ],
  },
  {
    id: "presentation",
    name: "Presentation",
    icon: "Presentation",
    emoji: "📊",
    accent: "#3B82F6",
    accentSoft: "#93C5FD",
    gradient: "linear-gradient(135deg, #3B82F6, #06B6D4)",
    description:
      "Generate decks, sales narratives, and executive-ready slides with AI tools that make presentations clearer and faster.",
    heroCopy:
      "Compare slide builders for founders, consultants, educators, and teams who want presentation polish without design overhead.",
    subcategories: [
      "pitch-decks",
      "sales-presentations",
      "education",
      "meeting-briefs",
    ],
  },
  {
    id: "writing-content",
    name: "Writing and Content",
    icon: "PenSquare",
    emoji: "✍️",
    accent: "#8B5CF6",
    accentSoft: "#C4B5FD",
    gradient: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
    description:
      "Research, draft, rewrite, edit, and scale written content with AI assistants built for marketers, teams, and solo creators.",
    heroCopy:
      "Find the best writing copilots for blogs, landing pages, email, brainstorming, editing, and long-form ideation.",
    subcategories: [
      "general-assistant",
      "copywriting",
      "editing",
      "long-form",
      "productivity-writing",
    ],
  },
  {
    id: "coding-development",
    name: "Coding and Development",
    icon: "Code2",
    emoji: "💻",
    accent: "#22C55E",
    accentSoft: "#86EFAC",
    gradient: "linear-gradient(135deg, #22C55E, #06B6D4)",
    description:
      "Ship faster with AI coding tools for autocomplete, refactoring, multi-file changes, prototyping, and agentic development.",
    heroCopy:
      "Explore the strongest developer copilots for IDE coding, full-stack generation, debugging, and autonomous workflows.",
    subcategories: [
      "coding-assistant",
      "full-stack-builder",
      "autocomplete",
      "agentic-dev",
      "prototyping",
    ],
  },
  {
    id: "design-creative",
    name: "Design and Creative",
    icon: "Palette",
    emoji: "🪄",
    accent: "#EC4899",
    accentSoft: "#F9A8D4",
    gradient: "linear-gradient(135deg, #EC4899, #7C3AED)",
    description:
      "Build brands, mockups, interfaces, and creative assets with AI tools that augment visual design workflows end to end.",
    heroCopy:
      "Browse AI design tools for brand identity, UI wireframing, image cleanup, motion ideas, and creative experimentation.",
    subcategories: [
      "brand-design",
      "ui-ux",
      "creative-assistant",
      "asset-creation",
      "mockups",
    ],
  },
  {
    id: "ai-avatars",
    name: "AI Avatars",
    icon: "UserRound",
    emoji: "🧑‍🎤",
    accent: "#14B8A6",
    accentSoft: "#5EEAD4",
    gradient: "linear-gradient(135deg, #14B8A6, #3B82F6)",
    description:
      "Create spokesperson videos, training content, and presenter-led assets with avatar-first AI production platforms.",
    heroCopy:
      "Compare AI avatar tools for product demos, learning content, sales outreach, and multilingual video delivery.",
    subcategories: [
      "talking-avatar",
      "training-video",
      "ugc-style",
      "presenter-video",
    ],
  },
  {
    id: "research",
    name: "Research",
    icon: "SearchCode",
    emoji: "🔎",
    accent: "#06B6D4",
    accentSoft: "#A5F3FC",
    gradient: "linear-gradient(135deg, #06B6D4, #14B8A6)",
    description:
      "Answer faster, synthesize sources, and explore topics with AI research tools that surface insight instead of noise.",
    heroCopy:
      "These tools help students, analysts, founders, and operators search smarter, summarize sources, and validate decisions.",
    subcategories: [
      "research-assistant",
      "search-engine",
      "knowledge-synthesis",
      "source-citations",
    ],
  },
  {
    id: "productivity",
    name: "Productivity",
    icon: "Clock3",
    emoji: "⚡",
    accent: "#84CC16",
    accentSoft: "#BEF264",
    gradient: "linear-gradient(135deg, #84CC16, #10B981)",
    description:
      "Capture meetings, organize notes, automate busywork, and stay on top of work with AI productivity companions.",
    heroCopy:
      "From AI meeting notes to workflow copilots, these tools help operators, teams, and founders move faster every day.",
    subcategories: [
      "meeting-assistant",
      "note-taking",
      "workflow",
      "task-management",
      "office-copilot",
    ],
  },
  {
    id: "3d-generation",
    name: "3D Generation",
    icon: "Box",
    emoji: "🧊",
    accent: "#60A5FA",
    accentSoft: "#BFDBFE",
    gradient: "linear-gradient(135deg, #60A5FA, #7C3AED)",
    description:
      "Turn prompts, images, and sketches into 3D models, scenes, and assets for games, commerce, and product design.",
    heroCopy:
      "Discover the best AI 3D tools for modeling, texturing, scene ideation, and production-ready asset generation.",
    subcategories: [
      "text-to-3d",
      "3d-modeling",
      "asset-generation",
      "scene-design",
    ],
  },
  {
    id: "seo-marketing",
    name: "SEO and Marketing",
    icon: "TrendingUp",
    emoji: "📈",
    accent: "#FB7185",
    accentSoft: "#FDA4AF",
    gradient: "linear-gradient(135deg, #FB7185, #F59E0B)",
    description:
      "Plan keywords, optimize pages, and publish smarter content with AI-enhanced SEO and content strategy platforms.",
    heroCopy:
      "Use these tools to improve rankings, content briefs, topical coverage, and search-led editorial workflows.",
    subcategories: [
      "keyword-research",
      "content-briefs",
      "on-page-seo",
      "content-strategy",
    ],
  },
  {
    id: "social-media",
    name: "Social Media",
    icon: "MessagesSquare",
    emoji: "📱",
    accent: "#F97316",
    accentSoft: "#FDBA74",
    gradient: "linear-gradient(135deg, #F97316, #EC4899)",
    description:
      "Plan, generate, schedule, and repurpose social content with AI tools made for creators, agencies, and modern brands.",
    heroCopy:
      "Compare AI social platforms for scheduling, post generation, repurposing, thought leadership, and growth workflows.",
    subcategories: [
      "scheduling",
      "repurposing",
      "thought-leadership",
      "content-calendar",
    ],
  },
];

const toolCatalog = [
  {
    category: "image-generation",
    items: [
      { name: "Midjourney", website: "https://www.midjourney.com", subcategory: "text-to-image", pricingModel: "paid", startingPrice: "$10/mo", hasFree: false, paidPlans: ["$10/mo", "$30/mo", "$60/mo"], tags: ["photorealistic", "concept-art", "community"], integrations: ["Discord"], platforms: ["web"] },
      { name: "DALL-E 3", website: "https://openai.com/dall-e-3", subcategory: "text-to-image", pricingModel: "freemium", startingPrice: "$20/mo", hasFree: true, freeDetails: "Available through limited credits in connected products", paidPlans: ["$20/mo", "$200/mo"], tags: ["prompt-following", "fast-iteration", "general-purpose"], integrations: ["ChatGPT", "OpenAI API"], platforms: ["web", "api"] },
      { name: "GPT Image", website: "https://openai.com", subcategory: "image-editing", pricingModel: "freemium", startingPrice: "$20/mo", hasFree: true, freeDetails: "Bundled into limited consumer plans", paidPlans: ["$20/mo", "$200/mo"], tags: ["editing", "conversational", "multimodal"], integrations: ["ChatGPT", "OpenAI API"], platforms: ["web", "api"] },
      { name: "Adobe Firefly", website: "https://firefly.adobe.com", subcategory: "brand-assets", pricingModel: "freemium", startingPrice: "$9.99/mo", hasFree: true, freeDetails: "Monthly generative credits", paidPlans: ["$9.99/mo", "$29.99/mo"], tags: ["commercial-safe", "brand-assets", "adobe-workflows"], integrations: ["Photoshop", "Illustrator", "Express"], platforms: ["web", "desktop"], secondaryCategories: ["design-creative"] },
      { name: "Stable Diffusion", website: "https://stability.ai", subcategory: "text-to-image", pricingModel: "freemium", startingPrice: "$7/mo", hasFree: true, freeDetails: "Open-source models with community hosting", paidPlans: ["$7/mo", "$27/mo"], tags: ["open-source", "customizable", "developer-friendly"], integrations: ["ComfyUI", "Automatic1111"], platforms: ["web", "api", "desktop"] },
      { name: "Leonardo AI", website: "https://leonardo.ai", subcategory: "text-to-image", pricingModel: "freemium", startingPrice: "$12/mo", hasFree: true, freeDetails: "Daily tokens for generations", paidPlans: ["$12/mo", "$30/mo", "$60/mo"], tags: ["game-assets", "style-control", "prompt-tools"], integrations: ["API", "Canvas"], platforms: ["web", "api"] },
      { name: "Ideogram", website: "https://ideogram.ai", subcategory: "illustration", pricingModel: "freemium", startingPrice: "$8/mo", hasFree: true, freeDetails: "Public generations on free tier", paidPlans: ["$8/mo", "$20/mo"], tags: ["text-rendering", "branding", "poster-design"], integrations: ["API"], platforms: ["web"] },
      { name: "Recraft", website: "https://www.recraft.ai", subcategory: "brand-assets", pricingModel: "freemium", startingPrice: "$12/mo", hasFree: true, freeDetails: "Limited exports and generations", paidPlans: ["$12/mo", "$48/mo"], tags: ["vector-ready", "brand-systems", "marketing-assets"], integrations: ["Figma"], platforms: ["web"] },
      { name: "FLUX", website: "https://blackforestlabs.ai", subcategory: "text-to-image", pricingModel: "freemium", startingPrice: "$9/mo", hasFree: true, freeDetails: "Community model access and low-volume usage", paidPlans: ["$9/mo", "$29/mo"], tags: ["open-model", "high-detail", "developer-friendly"], integrations: ["API", "ComfyUI"], platforms: ["web", "api"] },
      { name: "Freepik", website: "https://www.freepik.com", subcategory: "brand-assets", pricingModel: "freemium", startingPrice: "$12/mo", hasFree: true, freeDetails: "Limited daily AI generations", paidPlans: ["$12/mo", "$24/mo"], tags: ["asset-library", "templates", "creative-suite"], integrations: ["Freepik Designer"], platforms: ["web"] },
      { name: "NightCafe", website: "https://creator.nightcafe.studio", subcategory: "illustration", pricingModel: "freemium", startingPrice: "$9.99/mo", hasFree: true, freeDetails: "Daily credits and challenge access", paidPlans: ["$9.99/mo", "$19.99/mo"], tags: ["community", "style-variety", "beginner-friendly"], integrations: ["Prompt tools"], platforms: ["web", "mobile"] },
      { name: "Playground AI", website: "https://playground.com", subcategory: "image-editing", pricingModel: "freemium", startingPrice: "$15/mo", hasFree: true, freeDetails: "Limited filtered generations", paidPlans: ["$15/mo", "$45/mo"], tags: ["canvas-editing", "batch-creation", "social-assets"], integrations: ["Canva"], platforms: ["web"] },
      { name: "Tensor.Art", website: "https://tensor.art", subcategory: "text-to-image", pricingModel: "freemium", startingPrice: "$8/mo", hasFree: true, freeDetails: "Community model access and queue credits", paidPlans: ["$8/mo", "$24/mo"], tags: ["community-models", "anime", "model-sharing"], integrations: ["SDXL"], platforms: ["web"] },
      { name: "DreamStudio", website: "https://dreamstudio.ai", subcategory: "text-to-image", pricingModel: "paid", startingPrice: "$10/mo", hasFree: false, paidPlans: ["Usage-based", "$10/mo equivalent"], tags: ["stability-api", "prompt-control", "fast-renders"], integrations: ["Stability API"], platforms: ["web", "api"] },
      { name: "Civitai", website: "https://civitai.com", subcategory: "illustration", pricingModel: "freemium", startingPrice: "$5/mo", hasFree: true, freeDetails: "Community browsing and limited generation credits", paidPlans: ["$5/mo", "$15/mo"], tags: ["model-marketplace", "community", "fine-tunes"], integrations: ["ComfyUI", "Automatic1111"], platforms: ["web"] },
    ],
  },
  {
    category: "video-generation",
    items: [
      { name: "Google Veo", website: "https://deepmind.google/models/veo", subcategory: "text-to-video", pricingModel: "paid", startingPrice: "$20/mo", hasFree: false, paidPlans: ["$20/mo", "Enterprise"], tags: ["cinematic", "google-stack", "prompt-following"], integrations: ["Google AI Studio"], platforms: ["web", "api"] },
      { name: "Runway ML", website: "https://runwayml.com", subcategory: "video-editing", pricingModel: "freemium", startingPrice: "$15/mo", hasFree: true, freeDetails: "Limited export credits", paidPlans: ["$15/mo", "$35/mo", "$95/mo"], tags: ["editing", "gen-video", "pro-workflows"], integrations: ["Adobe Premiere Pro"], platforms: ["web", "api", "mobile"] },
      { name: "Sora", website: "https://openai.com/sora", subcategory: "text-to-video", pricingModel: "paid", startingPrice: "$20/mo", hasFree: false, paidPlans: ["$20/mo", "$200/mo"], tags: ["cinematic", "world-model", "storytelling"], integrations: ["ChatGPT"], platforms: ["web"] },
      { name: "Kling AI", website: "https://klingai.com", subcategory: "text-to-video", pricingModel: "freemium", startingPrice: "$10/mo", hasFree: true, freeDetails: "Limited generation queue", paidPlans: ["$10/mo", "$35/mo"], tags: ["character-motion", "stylized-video", "prompt-control"], integrations: ["Image inputs"], platforms: ["web"], secondaryCategories: ["image-generation"] },
      { name: "Luma AI", website: "https://lumalabs.ai", subcategory: "cinematic", pricingModel: "freemium", startingPrice: "$9.99/mo", hasFree: true, freeDetails: "Starter generations and exports", paidPlans: ["$9.99/mo", "$29.99/mo"], tags: ["dream-machine", "motion", "fast-iteration"], integrations: ["iPhone capture"], platforms: ["web", "mobile"] },
      { name: "Synthesia", website: "https://www.synthesia.io", subcategory: "avatar-video", pricingModel: "paid", startingPrice: "$29/mo", hasFree: false, paidPlans: ["$29/mo", "$89/mo", "Enterprise"], tags: ["training", "multilingual", "corporate-video"], integrations: ["PowerPoint", "LMS"], platforms: ["web"], secondaryCategories: ["ai-avatars"] },
      { name: "Higgsfield", website: "https://higgsfield.ai", subcategory: "cinematic", pricingModel: "paid", startingPrice: "$24/mo", hasFree: false, paidPlans: ["$24/mo", "$79/mo"], tags: ["camera-motion", "filmmaker-tools", "stylized"], integrations: ["Storyboard tools"], platforms: ["web"] },
      { name: "Wondershare Filmora", website: "https://filmora.wondershare.com", subcategory: "video-editing", pricingModel: "freemium", startingPrice: "$19.99/mo", hasFree: true, freeDetails: "Watermarked exports on free plan", paidPlans: ["$19.99/mo", "$49.99/yr"], tags: ["editing-suite", "templates", "creator-friendly"], integrations: ["Stock media"], platforms: ["desktop", "mobile"] },
      { name: "LTX Studio", website: "https://ltx.studio", subcategory: "cinematic", pricingModel: "freemium", startingPrice: "$15/mo", hasFree: true, freeDetails: "Limited project exports", paidPlans: ["$15/mo", "$35/mo"], tags: ["storyboards", "scene-control", "pre-production"], integrations: ["Script import"], platforms: ["web"] },
      { name: "Revid.ai", website: "https://revid.ai", subcategory: "short-form", pricingModel: "freemium", startingPrice: "$19/mo", hasFree: true, freeDetails: "Trial exports with watermark", paidPlans: ["$19/mo", "$49/mo"], tags: ["repurposing", "faceless-video", "shorts"], integrations: ["TikTok", "YouTube"], platforms: ["web"] },
      { name: "Virbo", website: "https://virbo.wondershare.com", subcategory: "avatar-video", pricingModel: "paid", startingPrice: "$19.90/mo", hasFree: false, paidPlans: ["$19.90/mo", "$199/yr"], tags: ["avatar-presenters", "ugc-style", "marketing"], integrations: ["Filmora"], platforms: ["web", "mobile"] },
      { name: "Pika Labs", website: "https://pika.art", subcategory: "text-to-video", pricingModel: "freemium", startingPrice: "$10/mo", hasFree: true, freeDetails: "Basic generation credits", paidPlans: ["$10/mo", "$35/mo"], tags: ["creative-video", "effects", "prompt-editing"], integrations: ["Discord"], platforms: ["web"] },
      { name: "InVideo AI", website: "https://invideo.io/ai", subcategory: "short-form", pricingModel: "freemium", startingPrice: "$20/mo", hasFree: true, freeDetails: "Watermarked exports and capped minutes", paidPlans: ["$20/mo", "$48/mo"], tags: ["script-to-video", "template-heavy", "marketer-friendly"], integrations: ["Stock footage"], platforms: ["web"] },
      { name: "PixVerse", website: "https://pixverse.ai", subcategory: "text-to-video", pricingModel: "freemium", startingPrice: "$12/mo", hasFree: true, freeDetails: "Starter credits and slower queues", paidPlans: ["$12/mo", "$30/mo"], tags: ["anime", "motion-effects", "social-video"], integrations: ["Image prompts"], platforms: ["web", "mobile"] },
      { name: "VEED AI", website: "https://www.veed.io", subcategory: "video-editing", pricingModel: "freemium", startingPrice: "$18/mo", hasFree: true, freeDetails: "Watermarked exports", paidPlans: ["$18/mo", "$30/mo"], tags: ["captions", "editing", "social-video"], integrations: ["YouTube", "Dropbox"], platforms: ["web"] },
      { name: "Opus Clip", website: "https://www.opus.pro", subcategory: "short-form", pricingModel: "freemium", startingPrice: "$19/mo", hasFree: true, freeDetails: "Limited credits and exports", paidPlans: ["$19/mo", "$29/mo"], tags: ["repurposing", "clips", "viral-hooks"], integrations: ["YouTube", "Drive"], platforms: ["web"], secondaryCategories: ["social-media"] },
    ],
  },
  {
    category: "music-generation",
    items: [
      { name: "Suno", website: "https://suno.com", subcategory: "song-generation", pricingModel: "freemium", startingPrice: "$10/mo", hasFree: true, freeDetails: "Daily credits for personal use", paidPlans: ["$10/mo", "$30/mo"], tags: ["full-songs", "lyrics", "viral-ready"], integrations: ["Download stems"], platforms: ["web", "mobile"] },
      { name: "Udio", website: "https://www.udio.com", subcategory: "song-generation", pricingModel: "freemium", startingPrice: "$10/mo", hasFree: true, freeDetails: "Daily track credits", paidPlans: ["$10/mo", "$30/mo"], tags: ["songwriting", "vocals", "genre-range"], integrations: ["DAW export"], platforms: ["web"] },
      { name: "AIVA", website: "https://www.aiva.ai", subcategory: "soundtracks", pricingModel: "freemium", startingPrice: "$15/mo", hasFree: true, freeDetails: "Limited downloads and licenses", paidPlans: ["$15/mo", "$49/mo"], tags: ["cinematic", "composition", "orchestral"], integrations: ["MIDI export"], platforms: ["web"] },
      { name: "Soundraw", website: "https://soundraw.io", subcategory: "royalty-free", pricingModel: "paid", startingPrice: "$16.99/mo", hasFree: false, paidPlans: ["$16.99/mo", "$39.99/mo"], tags: ["royalty-safe", "brand-content", "edit-structure"], integrations: ["Premiere Pro"], platforms: ["web"] },
      { name: "Mubert", website: "https://mubert.com", subcategory: "royalty-free", pricingModel: "freemium", startingPrice: "$14/mo", hasFree: true, freeDetails: "Limited streaming and creator exports", paidPlans: ["$14/mo", "$39/mo"], tags: ["loops", "streaming", "api"], integrations: ["Mubert API"], platforms: ["web", "api"] },
      { name: "Beatoven.ai", website: "https://www.beatoven.ai", subcategory: "soundtracks", pricingModel: "freemium", startingPrice: "$6/mo", hasFree: true, freeDetails: "Monthly export credits", paidPlans: ["$6/mo", "$20/mo"], tags: ["background-music", "mood-control", "creator-friendly"], integrations: ["Video editors"], platforms: ["web"] },
      { name: "Ecrett Music", website: "https://ecrettmusic.com", subcategory: "royalty-free", pricingModel: "paid", startingPrice: "$4.99/mo", hasFree: false, paidPlans: ["$4.99/mo", "$14.99/mo"], tags: ["simple-ui", "content-creators", "royalty-safe"], integrations: ["YouTube"], platforms: ["web"] },
      { name: "Stable Audio", website: "https://stableaudio.com", subcategory: "soundtracks", pricingModel: "freemium", startingPrice: "$11.99/mo", hasFree: true, freeDetails: "Starter track generations", paidPlans: ["$11.99/mo", "$29.99/mo"], tags: ["high-fidelity", "stems", "sound-design"], integrations: ["Stability API"], platforms: ["web"] },
      { name: "Riffusion", website: "https://www.riffusion.com", subcategory: "song-generation", pricingModel: "freemium", startingPrice: "$8/mo", hasFree: true, freeDetails: "Free experimentation credits", paidPlans: ["$8/mo", "$24/mo"], tags: ["experimental", "genre-play", "instant-preview"], integrations: ["Prompt presets"], platforms: ["web"] },
      { name: "Boomy", website: "https://boomy.com", subcategory: "song-generation", pricingModel: "freemium", startingPrice: "$9.99/mo", hasFree: true, freeDetails: "Starter releases and downloads", paidPlans: ["$9.99/mo", "$29.99/mo"], tags: ["distribution", "quick-songs", "beginner-friendly"], integrations: ["Spotify", "Apple Music"], platforms: ["web"] },
      { name: "Loudly", website: "https://www.loudly.com", subcategory: "royalty-free", pricingModel: "freemium", startingPrice: "$10/mo", hasFree: true, freeDetails: "Short previews and capped exports", paidPlans: ["$10/mo", "$30/mo"], tags: ["social-sound", "music-library", "stem-editing"], integrations: ["Adobe Express"], platforms: ["web"] },
      { name: "Amper Music", website: "https://www.shutterstock.com/amper-music", subcategory: "soundtracks", pricingModel: "paid", startingPrice: "$19/mo", hasFree: false, paidPlans: ["Enterprise"], tags: ["enterprise", "commercial-use", "fast-licensing"], integrations: ["Shutterstock"], platforms: ["web"] },
      { name: "Soundful", website: "https://soundful.com", subcategory: "royalty-free", pricingModel: "freemium", startingPrice: "$7.99/mo", hasFree: true, freeDetails: "Starter monthly generations", paidPlans: ["$7.99/mo", "$24.99/mo"], tags: ["royalty-safe", "creator-music", "quick-edits"], integrations: ["TikTok"], platforms: ["web"] },
    ],
  },
  {
    category: "voice-audio",
    items: [
      { name: "ElevenLabs", website: "https://elevenlabs.io", subcategory: "text-to-speech", pricingModel: "freemium", startingPrice: "$5/mo", hasFree: true, freeDetails: "Monthly character cap", paidPlans: ["$5/mo", "$22/mo", "$99/mo"], tags: ["voice-cloning", "natural-speech", "multilingual"], integrations: ["API", "Dubbing Studio"], platforms: ["web", "api", "mobile"] },
      { name: "Fish Audio", website: "https://fish.audio", subcategory: "voice-cloning", pricingModel: "freemium", startingPrice: "$9.99/mo", hasFree: true, freeDetails: "Starter voice generations", paidPlans: ["$9.99/mo", "$29.99/mo"], tags: ["voice-library", "cloning", "creator-voices"], integrations: ["API"], platforms: ["web"] },
      { name: "Murf AI", website: "https://murf.ai", subcategory: "text-to-speech", pricingModel: "paid", startingPrice: "$19/mo", hasFree: false, paidPlans: ["$19/mo", "$39/mo", "Enterprise"], tags: ["presentations", "voiceovers", "team-collab"], integrations: ["Canva", "Google Slides"], platforms: ["web"] },
      { name: "Resemble AI", website: "https://www.resemble.ai", subcategory: "voice-cloning", pricingModel: "paid", startingPrice: "$29/mo", hasFree: false, paidPlans: ["$29/mo", "Enterprise"], tags: ["realtime", "voice-cloning", "api"], integrations: ["API", "Twilio"], platforms: ["web", "api"] },
      { name: "Descript", website: "https://www.descript.com", subcategory: "audio-cleanup", pricingModel: "freemium", startingPrice: "$12/mo", hasFree: true, freeDetails: "Basic transcription minutes", paidPlans: ["$12/mo", "$24/mo"], tags: ["editing", "podcasts", "overdub"], integrations: ["YouTube", "Slack"], platforms: ["web", "desktop"] },
      { name: "Speechify", website: "https://speechify.com", subcategory: "text-to-speech", pricingModel: "freemium", startingPrice: "$11.58/mo", hasFree: true, freeDetails: "Standard voices on free plan", paidPlans: ["$11.58/mo"], tags: ["reading", "accessibility", "mobile-first"], integrations: ["Chrome", "Google Docs"], platforms: ["web", "mobile", "desktop"] },
      { name: "Lovo.ai", website: "https://lovo.ai", subcategory: "text-to-speech", pricingModel: "freemium", startingPrice: "$24/mo", hasFree: true, freeDetails: "Starter voice generation and previews", paidPlans: ["$24/mo", "$75/mo"], tags: ["ads", "video-voiceover", "voice-library"], integrations: ["Genny"], platforms: ["web"] },
      { name: "Hume AI", website: "https://www.hume.ai", subcategory: "voice-cloning", pricingModel: "paid", startingPrice: "$20/mo", hasFree: false, paidPlans: ["Usage-based", "Enterprise"], tags: ["emotion", "speech-ai", "developer-first"], integrations: ["API"], platforms: ["web", "api"] },
      { name: "Maestra AI", website: "https://maestra.ai", subcategory: "dubbing", pricingModel: "freemium", startingPrice: "$12/mo", hasFree: true, freeDetails: "Limited subtitling minutes", paidPlans: ["$12/mo", "$29/mo"], tags: ["subtitles", "dubbing", "translation"], integrations: ["YouTube"], platforms: ["web"] },
      { name: "Vozo AI", website: "https://www.vozo.ai", subcategory: "dubbing", pricingModel: "freemium", startingPrice: "$15/mo", hasFree: true, freeDetails: "Starter dubbing credits", paidPlans: ["$15/mo", "$39/mo"], tags: ["voice-editing", "video-translation", "creator-tools"], integrations: ["Video upload"], platforms: ["web"] },
      { name: "MiniMax", website: "https://www.minimax.io", subcategory: "voice-cloning", pricingModel: "paid", startingPrice: "$15/mo", hasFree: false, paidPlans: ["$15/mo", "$49/mo"], tags: ["speech-models", "low-latency", "multilingual"], integrations: ["API"], platforms: ["web", "api"] },
      { name: "Chatterbox", website: "https://www.chatterbox.one", subcategory: "transcription", pricingModel: "freemium", startingPrice: "$9/mo", hasFree: true, freeDetails: "Free note summaries and capped minutes", paidPlans: ["$9/mo", "$24/mo"], tags: ["meeting-notes", "audio-insights", "teams"], integrations: ["Zoom", "Google Meet"], platforms: ["web"] },
    ],
  },
  {
    category: "music-video",
    items: [
      { name: "Freebeat", website: "https://freebeat.ai", subcategory: "audio-reactive", pricingModel: "freemium", startingPrice: "$12/mo", hasFree: true, freeDetails: "Limited render credits", paidPlans: ["$12/mo", "$24/mo"], tags: ["dance-avatar", "music-promos", "social-ready"], integrations: ["TikTok", "YouTube"], platforms: ["web"], secondaryCategories: ["ai-avatars"] },
      { name: "Neural Frames", website: "https://www.neuralframes.com", subcategory: "visualizer", pricingModel: "paid", startingPrice: "$19/mo", hasFree: false, paidPlans: ["$19/mo", "$49/mo"], tags: ["frame-control", "music-visuals", "artists"], integrations: ["MP3 upload"], platforms: ["web"] },
      { name: "Kaiber", website: "https://kaiber.ai", subcategory: "music-promo", pricingModel: "freemium", startingPrice: "$15/mo", hasFree: true, freeDetails: "Starter renders and watermarked previews", paidPlans: ["$15/mo", "$30/mo"], tags: ["stylized-video", "music-artists", "creative-control"], integrations: ["Spotify Canvas"], platforms: ["web", "mobile"] },
      { name: "WaveSpeedAI", website: "https://wavespeed.ai", subcategory: "lyric-video", pricingModel: "paid", startingPrice: "$16/mo", hasFree: false, paidPlans: ["$16/mo", "$49/mo"], tags: ["lyric-videos", "auto-beat-sync", "promos"], integrations: ["Audio upload"], platforms: ["web"] },
    ],
  },
  {
    category: "presentation",
    items: [
      { name: "Gamma", website: "https://gamma.app", subcategory: "pitch-decks", pricingModel: "freemium", startingPrice: "$10/mo", hasFree: true, freeDetails: "Basic card decks and exports", paidPlans: ["$10/mo", "$20/mo"], tags: ["storytelling", "fast-decks", "clean-design"], integrations: ["Notion", "Figma"], platforms: ["web"] },
      { name: "SlidesAI", website: "https://www.slidesai.io", subcategory: "education", pricingModel: "freemium", startingPrice: "$8/mo", hasFree: true, freeDetails: "Monthly AI credits", paidPlans: ["$8/mo", "$16/mo"], tags: ["google-slides", "education", "instant-decks"], integrations: ["Google Slides"], platforms: ["web"] },
      { name: "Decktopus AI", website: "https://www.decktopus.com", subcategory: "sales-presentations", pricingModel: "freemium", startingPrice: "$14.99/mo", hasFree: true, freeDetails: "Starter templates and exports", paidPlans: ["$14.99/mo", "$49.99/mo"], tags: ["sales", "templates", "speaker-notes"], integrations: ["Forms"], platforms: ["web"] },
      { name: "Beautiful.ai", website: "https://www.beautiful.ai", subcategory: "pitch-decks", pricingModel: "paid", startingPrice: "$12/mo", hasFree: false, paidPlans: ["$12/mo", "$40/mo"], tags: ["design-automation", "team-decks", "enterprise"], integrations: ["Slack", "PowerPoint"], platforms: ["web"] },
      { name: "Prezent.ai", website: "https://prezent.ai", subcategory: "meeting-briefs", pricingModel: "paid", startingPrice: "$20/mo", hasFree: false, paidPlans: ["Enterprise"], tags: ["enterprise", "comms-teams", "brand-compliance"], integrations: ["PowerPoint"], platforms: ["web"] },
      { name: "Tome", website: "https://tome.app", subcategory: "pitch-decks", pricingModel: "freemium", startingPrice: "$16/mo", hasFree: true, freeDetails: "Basic generative storytelling blocks", paidPlans: ["$16/mo", "$20/mo"], tags: ["narrative", "founder-friendly", "multimedia"], integrations: ["Figma", "Airtable"], platforms: ["web"] },
      { name: "Simplified", website: "https://simplified.com", subcategory: "sales-presentations", pricingModel: "freemium", startingPrice: "$15/mo", hasFree: true, freeDetails: "Limited AI credits and exports", paidPlans: ["$15/mo", "$39/mo"], tags: ["multi-format", "content-suite", "marketing"], integrations: ["Social scheduler"], platforms: ["web"] },
    ],
  },
  {
    category: "writing-content",
    items: [
      { name: "ChatGPT", website: "https://chatgpt.com", subcategory: "general-assistant", pricingModel: "freemium", startingPrice: "$20/mo", hasFree: true, freeDetails: "Free access with usage limits", paidPlans: ["$20/mo", "$200/mo"], tags: ["generalist", "brainstorming", "multimodal"], integrations: ["OpenAI API", "Files"], platforms: ["web", "mobile", "desktop"] },
      { name: "Claude", website: "https://claude.ai", subcategory: "general-assistant", pricingModel: "freemium", startingPrice: "$20/mo", hasFree: true, freeDetails: "Free tier with capped conversations", paidPlans: ["$20/mo", "$30/mo"], tags: ["long-context", "reasoning", "writing-quality"], integrations: ["Artifacts"], platforms: ["web", "mobile"] },
      { name: "Jasper", website: "https://www.jasper.ai", subcategory: "copywriting", pricingModel: "paid", startingPrice: "$39/mo", hasFree: false, paidPlans: ["$39/mo", "$59/mo", "Enterprise"], tags: ["brand-voice", "marketing", "teams"], integrations: ["Surfer SEO", "Google Docs"], platforms: ["web"] },
      { name: "Copy.ai", website: "https://www.copy.ai", subcategory: "copywriting", pricingModel: "freemium", startingPrice: "$36/mo", hasFree: true, freeDetails: "Limited workflows and chat usage", paidPlans: ["$36/mo", "$186/mo"], tags: ["sales-copy", "workflows", "automation"], integrations: ["HubSpot", "Salesforce"], platforms: ["web"] },
      { name: "Notion AI", website: "https://www.notion.so/product/ai", subcategory: "productivity-writing", pricingModel: "freemium", startingPrice: "$10/mo", hasFree: true, freeDetails: "Limited trial prompts", paidPlans: ["$10/mo add-on"], tags: ["workspace", "notes", "rewrite"], integrations: ["Notion"], platforms: ["web", "desktop", "mobile"] },
      { name: "Grammarly", website: "https://www.grammarly.com", subcategory: "editing", pricingModel: "freemium", startingPrice: "$12/mo", hasFree: true, freeDetails: "Grammar suggestions on free plan", paidPlans: ["$12/mo"], tags: ["editing", "clarity", "business-writing"], integrations: ["Browser", "Docs"], platforms: ["web", "desktop", "mobile"] },
      { name: "Writesonic", website: "https://writesonic.com", subcategory: "copywriting", pricingModel: "freemium", startingPrice: "$16/mo", hasFree: true, freeDetails: "Starter monthly credits", paidPlans: ["$16/mo", "$79/mo"], tags: ["seo-copy", "chatbot", "blogs"], integrations: ["WordPress"], platforms: ["web"] },
      { name: "Rytr", website: "https://rytr.me", subcategory: "copywriting", pricingModel: "freemium", startingPrice: "$9/mo", hasFree: true, freeDetails: "Starter characters monthly", paidPlans: ["$9/mo", "$29/mo"], tags: ["affordable", "templates", "freelancers"], integrations: ["Browser extension"], platforms: ["web"] },
      { name: "Sudowrite", website: "https://www.sudowrite.com", subcategory: "long-form", pricingModel: "paid", startingPrice: "$19/mo", hasFree: false, paidPlans: ["$19/mo", "$29/mo", "$59/mo"], tags: ["creative-writing", "fiction", "authors"], integrations: ["Google Docs"], platforms: ["web"] },
      { name: "Quillbot", website: "https://quillbot.com", subcategory: "editing", pricingModel: "freemium", startingPrice: "$8.33/mo", hasFree: true, freeDetails: "Usage limits on paraphrasing and summaries", paidPlans: ["$8.33/mo"], tags: ["paraphrasing", "students", "citation"], integrations: ["Chrome", "Word"], platforms: ["web", "desktop"] },
      { name: "Neuroflash", website: "https://neuroflash.com", subcategory: "copywriting", pricingModel: "freemium", startingPrice: "$30/mo", hasFree: true, freeDetails: "Starter words and brand assets", paidPlans: ["$30/mo", "$80/mo"], tags: ["brand-voice", "ecommerce", "multilingual"], integrations: ["CMS"], platforms: ["web"] },
      { name: "Peppertype", website: "https://www.peppertype.ai", subcategory: "copywriting", pricingModel: "paid", startingPrice: "$35/mo", hasFree: false, paidPlans: ["$35/mo", "Enterprise"], tags: ["marketing-teams", "briefs", "campaigns"], integrations: ["Pepper Content"], platforms: ["web"] },
    ],
  },
  {
    category: "coding-development",
    items: [
      { name: "Cursor", website: "https://cursor.com", subcategory: "coding-assistant", pricingModel: "freemium", startingPrice: "$20/mo", hasFree: true, freeDetails: "Free agent and premium request limits", paidPlans: ["$20/mo", "$40/mo"], tags: ["ide", "agentic-edits", "developer-loved"], integrations: ["VS Code extensions", "GitHub"], platforms: ["desktop"] },
      { name: "GitHub Copilot", website: "https://github.com/features/copilot", subcategory: "autocomplete", pricingModel: "paid", startingPrice: "$10/mo", hasFree: false, paidPlans: ["$10/mo", "$19/mo", "Enterprise"], tags: ["autocomplete", "github", "team-adoption"], integrations: ["VS Code", "JetBrains"], platforms: ["desktop", "web"] },
      { name: "v0", website: "https://v0.dev", subcategory: "full-stack-builder", pricingModel: "freemium", startingPrice: "$20/mo", hasFree: true, freeDetails: "Starter message credits", paidPlans: ["$20/mo", "$50/mo"], tags: ["ui-generation", "react", "frontend"], integrations: ["Vercel"], platforms: ["web"] },
      { name: "Lovable", website: "https://lovable.dev", subcategory: "full-stack-builder", pricingModel: "freemium", startingPrice: "$20/mo", hasFree: true, freeDetails: "Limited daily prompts", paidPlans: ["$20/mo", "$50/mo"], tags: ["full-stack", "prompt-to-app", "rapid-prototyping"], integrations: ["GitHub"], platforms: ["web"] },
      { name: "Bolt.new", website: "https://bolt.new", subcategory: "full-stack-builder", pricingModel: "freemium", startingPrice: "$20/mo", hasFree: true, freeDetails: "Starter token allowance", paidPlans: ["$20/mo", "$50/mo"], tags: ["browser-dev", "instant-preview", "ship-fast"], integrations: ["Netlify"], platforms: ["web"] },
      { name: "Replit AI", website: "https://replit.com/ai", subcategory: "prototyping", pricingModel: "freemium", startingPrice: "$15/mo", hasFree: true, freeDetails: "Limited AI completions and agent tasks", paidPlans: ["$15/mo", "$35/mo"], tags: ["browser-ide", "multiplayer", "deploy"], integrations: ["Replit Deployments"], platforms: ["web"] },
      { name: "Tabnine", website: "https://www.tabnine.com", subcategory: "autocomplete", pricingModel: "freemium", startingPrice: "$12/mo", hasFree: true, freeDetails: "Basic completions", paidPlans: ["$12/mo", "$39/mo"], tags: ["privacy", "enterprise", "autocomplete"], integrations: ["VS Code", "JetBrains"], platforms: ["desktop"] },
      { name: "Codeium", website: "https://codeium.com", subcategory: "autocomplete", pricingModel: "freemium", startingPrice: "$12/mo", hasFree: true, freeDetails: "Free individual plan", paidPlans: ["Free", "$12/mo", "Enterprise"], tags: ["fast-completions", "chat", "teams"], integrations: ["VS Code", "Neovim"], platforms: ["desktop", "web"] },
      { name: "Amazon CodeWhisperer", website: "https://aws.amazon.com/codewhisperer", subcategory: "autocomplete", pricingModel: "freemium", startingPrice: "$19/mo", hasFree: true, freeDetails: "Individual tier available", paidPlans: ["Free", "Enterprise"], tags: ["aws", "security-scanning", "enterprise"], integrations: ["AWS Toolkit"], platforms: ["desktop"] },
      { name: "Windsurf", website: "https://windsurf.com", subcategory: "coding-assistant", pricingModel: "freemium", startingPrice: "$15/mo", hasFree: true, freeDetails: "Starter credits", paidPlans: ["$15/mo", "$35/mo"], tags: ["agents", "flow-state", "ide"], integrations: ["GitHub"], platforms: ["desktop"] },
      { name: "Devin", website: "https://devin.ai", subcategory: "agentic-dev", pricingModel: "paid", startingPrice: "$500/mo", hasFree: false, paidPlans: ["Usage-based", "Enterprise"], tags: ["autonomous", "ticket-work", "enterprise"], integrations: ["Slack", "GitHub"], platforms: ["web"] },
    ],
  },
  {
    category: "design-creative",
    items: [
      { name: "Canva AI", website: "https://www.canva.com/ai-image-generator", subcategory: "asset-creation", pricingModel: "freemium", startingPrice: "$12.99/mo", hasFree: true, freeDetails: "Magic features with capped credits", paidPlans: ["$12.99/mo", "$14.99/mo"], tags: ["templates", "social-assets", "easy-to-use"], integrations: ["Canva"], platforms: ["web", "mobile"], secondaryCategories: ["image-generation"] },
      { name: "Framer AI", website: "https://www.framer.com/ai", subcategory: "ui-ux", pricingModel: "freemium", startingPrice: "$10/mo", hasFree: true, freeDetails: "Basic site pages and AI rewrites", paidPlans: ["$10/mo", "$20/mo"], tags: ["website-builder", "copy", "responsive"], integrations: ["Framer CMS"], platforms: ["web"] },
      { name: "Looka", website: "https://looka.com", subcategory: "brand-design", pricingModel: "paid", startingPrice: "$20 one-time", hasFree: false, paidPlans: ["$20 one-time", "$96/yr"], tags: ["logos", "brand-kits", "small-business"], integrations: ["Brand Kit"], platforms: ["web"] },
      { name: "Remove.bg", website: "https://www.remove.bg", subcategory: "asset-creation", pricingModel: "freemium", startingPrice: "$9/mo", hasFree: true, freeDetails: "Limited free previews", paidPlans: ["Usage-based"], tags: ["background-removal", "ecommerce", "fast"], integrations: ["Photoshop", "Figma"], platforms: ["web", "api", "desktop"] },
      { name: "Brandmark", website: "https://brandmark.io", subcategory: "brand-design", pricingModel: "paid", startingPrice: "$25 one-time", hasFree: false, paidPlans: ["$25 one-time", "$65 package"], tags: ["logo-kit", "naming", "brand-guides"], integrations: ["Brand assets"], platforms: ["web"] },
      { name: "Figma AI", website: "https://www.figma.com/ai", subcategory: "ui-ux", pricingModel: "freemium", startingPrice: "$15/mo", hasFree: true, freeDetails: "Limited AI credits inside paid workspace tiers", paidPlans: ["$15/mo", "$45/mo"], tags: ["ui-ux", "mockups", "team-design"], integrations: ["Figma"], platforms: ["web", "desktop"] },
      { name: "Uizard", website: "https://uizard.io", subcategory: "ui-ux", pricingModel: "freemium", startingPrice: "$12/mo", hasFree: true, freeDetails: "Starter generation credits", paidPlans: ["$12/mo", "$39/mo"], tags: ["wireframes", "product-teams", "rapid-ui"], integrations: ["Screenshot import"], platforms: ["web"] },
      { name: "Khroma", website: "https://www.khroma.co", subcategory: "creative-assistant", pricingModel: "free", startingPrice: "$0", hasFree: true, freeDetails: "Fully free color exploration tool", paidPlans: ["$0"], tags: ["color-palettes", "design-inspo", "free"], integrations: ["CSS export"], platforms: ["web"] },
      { name: "Magician", website: "https://magician.design", subcategory: "creative-assistant", pricingModel: "freemium", startingPrice: "$12/mo", hasFree: true, freeDetails: "Limited plugin credits", paidPlans: ["$12/mo", "$39/mo"], tags: ["figma-plugin", "copy", "icons"], integrations: ["Figma"], platforms: ["web"] },
    ],
  },
  {
    category: "ai-avatars",
    items: [
      { name: "HeyGen", website: "https://www.heygen.com", subcategory: "talking-avatar", pricingModel: "freemium", startingPrice: "$24/mo", hasFree: true, freeDetails: "Trial credits and watermarked exports", paidPlans: ["$24/mo", "$89/mo"], tags: ["ugc-avatars", "sales-videos", "multilingual"], integrations: ["Zapier"], platforms: ["web"] },
      { name: "D-ID", website: "https://www.d-id.com", subcategory: "talking-avatar", pricingModel: "paid", startingPrice: "$5.90/mo", hasFree: false, paidPlans: ["$5.90/mo", "$49/mo"], tags: ["photo-avatars", "api", "marketing"], integrations: ["API"], platforms: ["web", "api"] },
      { name: "Colossyan", website: "https://www.colossyan.com", subcategory: "training-video", pricingModel: "paid", startingPrice: "$27/mo", hasFree: false, paidPlans: ["$27/mo", "$88/mo"], tags: ["corporate-learning", "training", "avatars"], integrations: ["LMS"], platforms: ["web"] },
      { name: "Mango AI", website: "https://mangoanimate.com/ai", subcategory: "presenter-video", pricingModel: "freemium", startingPrice: "$13/mo", hasFree: true, freeDetails: "Limited exports", paidPlans: ["$13/mo", "$39/mo"], tags: ["presenters", "marketing-videos", "templates"], integrations: ["PPT import"], platforms: ["web"] },
    ],
  },
  {
    category: "research",
    items: [
      { name: "Perplexity AI", website: "https://www.perplexity.ai", subcategory: "research-assistant", pricingModel: "freemium", startingPrice: "$20/mo", hasFree: true, freeDetails: "Limited pro searches", paidPlans: ["$20/mo"], tags: ["citations", "research", "answer-engine"], integrations: ["File upload"], platforms: ["web", "mobile"] },
      { name: "NotebookLM", website: "https://notebooklm.google", subcategory: "knowledge-synthesis", pricingModel: "free", startingPrice: "$0", hasFree: true, freeDetails: "Free with Google account", paidPlans: ["$0"], tags: ["source-grounded", "audio-overviews", "students"], integrations: ["Google Drive"], platforms: ["web"] },
      { name: "Gemini", website: "https://gemini.google.com", subcategory: "research-assistant", pricingModel: "freemium", startingPrice: "$19.99/mo", hasFree: true, freeDetails: "Core assistant features on free tier", paidPlans: ["$19.99/mo"], tags: ["google-search", "workspace", "multimodal"], integrations: ["Gmail", "Docs"], platforms: ["web", "mobile"] },
      { name: "Grok", website: "https://grok.x.ai", subcategory: "search-engine", pricingModel: "paid", startingPrice: "$16/mo", hasFree: false, paidPlans: ["$16/mo", "$40/mo"], tags: ["real-time", "x-integration", "opinionated"], integrations: ["X"], platforms: ["web", "mobile"] },
      { name: "You.com", website: "https://you.com", subcategory: "search-engine", pricingModel: "freemium", startingPrice: "$15/mo", hasFree: true, freeDetails: "Core search and limited premium agents", paidPlans: ["$15/mo"], tags: ["search", "agents", "productivity"], integrations: ["Files"], platforms: ["web"] },
    ],
  },
  {
    category: "productivity",
    items: [
      { name: "Fathom", website: "https://fathom.video", subcategory: "meeting-assistant", pricingModel: "freemium", startingPrice: "$15/mo", hasFree: true, freeDetails: "Free personal meeting recorder", paidPlans: ["Free", "$15/mo"], tags: ["meeting-notes", "sales", "summaries"], integrations: ["Zoom", "Google Meet"], platforms: ["web", "desktop"] },
      { name: "Otter.ai", website: "https://otter.ai", subcategory: "meeting-assistant", pricingModel: "freemium", startingPrice: "$16.99/mo", hasFree: true, freeDetails: "Monthly transcription cap", paidPlans: ["$16.99/mo", "$30/mo"], tags: ["transcription", "meetings", "teams"], integrations: ["Zoom", "Slack"], platforms: ["web", "mobile"] },
      { name: "Microsoft Copilot", website: "https://copilot.microsoft.com", subcategory: "office-copilot", pricingModel: "freemium", startingPrice: "$20/mo", hasFree: true, freeDetails: "Consumer chat is free with limits", paidPlans: ["$20/mo", "$30/mo"], tags: ["office", "enterprise", "documents"], integrations: ["Microsoft 365"], platforms: ["web", "desktop", "mobile"] },
      { name: "Fireflies.ai", website: "https://fireflies.ai", subcategory: "meeting-assistant", pricingModel: "freemium", startingPrice: "$18/mo", hasFree: true, freeDetails: "Starter transcription credits", paidPlans: ["$18/mo", "$29/mo"], tags: ["meeting-notes", "search", "crm-sync"], integrations: ["Zoom", "HubSpot"], platforms: ["web"] },
      { name: "Mem AI", website: "https://mem.ai", subcategory: "note-taking", pricingModel: "paid", startingPrice: "$14.99/mo", hasFree: false, paidPlans: ["$14.99/mo"], tags: ["notes", "knowledge-base", "search"], integrations: ["Slack"], platforms: ["web", "desktop"] },
      { name: "Taskade AI", website: "https://www.taskade.com", subcategory: "task-management", pricingModel: "freemium", startingPrice: "$8/mo", hasFree: true, freeDetails: "Basic AI agents and limited projects", paidPlans: ["$8/mo", "$19/mo"], tags: ["tasks", "agents", "mindmaps"], integrations: ["Google Calendar"], platforms: ["web", "mobile", "desktop"] },
    ],
  },
  {
    category: "3d-generation",
    items: [
      { name: "Meshy AI", website: "https://www.meshy.ai", subcategory: "text-to-3d", pricingModel: "freemium", startingPrice: "$20/mo", hasFree: true, freeDetails: "Starter credits for generation", paidPlans: ["$20/mo", "$60/mo"], tags: ["3d-assets", "texturing", "games"], integrations: ["Blender", "Unity"], platforms: ["web"] },
      { name: "Spline AI", website: "https://spline.design/ai", subcategory: "scene-design", pricingModel: "freemium", startingPrice: "$12/mo", hasFree: true, freeDetails: "Community workspaces and AI basics", paidPlans: ["$12/mo", "$20/mo"], tags: ["3d-web", "scene-editing", "interactive"], integrations: ["Figma", "Webflow"], platforms: ["web"] },
      { name: "Kaedim", website: "https://www.kaedim3d.com", subcategory: "asset-generation", pricingModel: "paid", startingPrice: "$150/mo", hasFree: false, paidPlans: ["$150/mo", "Enterprise"], tags: ["production-assets", "games", "speed"], integrations: ["Blender"], platforms: ["web"] },
      { name: "Luma AI 3D", website: "https://lumalabs.ai", subcategory: "3d-modeling", pricingModel: "freemium", startingPrice: "$9.99/mo", hasFree: true, freeDetails: "Starter 3D capture and exports", paidPlans: ["$9.99/mo", "$29.99/mo"], tags: ["nerf", "capture", "immersive"], integrations: ["iPhone capture"], platforms: ["web", "mobile"] },
      { name: "Shap-E", website: "https://github.com/openai/shap-e", subcategory: "text-to-3d", pricingModel: "free", startingPrice: "$0", hasFree: true, freeDetails: "Open-source research release", paidPlans: ["$0"], tags: ["open-source", "research", "experimental"], integrations: ["Python"], platforms: ["web", "desktop"] },
    ],
  },
  {
    category: "seo-marketing",
    items: [
      { name: "SEMrush", website: "https://www.semrush.com", subcategory: "keyword-research", pricingModel: "paid", startingPrice: "$139.95/mo", hasFree: false, paidPlans: ["$139.95/mo", "$249.95/mo"], tags: ["keyword-research", "competitor-data", "all-in-one"], integrations: ["Google Search Console"], platforms: ["web"] },
      { name: "Ahrefs", website: "https://ahrefs.com", subcategory: "keyword-research", pricingModel: "paid", startingPrice: "$129/mo", hasFree: false, paidPlans: ["$129/mo", "$249/mo"], tags: ["backlinks", "keyword-data", "content-explorer"], integrations: ["Search Console"], platforms: ["web"] },
      { name: "Surfer SEO", website: "https://surferseo.com", subcategory: "on-page-seo", pricingModel: "paid", startingPrice: "$89/mo", hasFree: false, paidPlans: ["$89/mo", "$179/mo"], tags: ["content-editor", "optimization", "serp-analysis"], integrations: ["Jasper", "Google Docs"], platforms: ["web"] },
      { name: "Clearscope", website: "https://www.clearscope.io", subcategory: "content-briefs", pricingModel: "paid", startingPrice: "$189/mo", hasFree: false, paidPlans: ["$189/mo", "Enterprise"], tags: ["briefs", "editorial-teams", "topic-coverage"], integrations: ["WordPress", "Google Docs"], platforms: ["web"] },
      { name: "MarketMuse", website: "https://www.marketmuse.com", subcategory: "content-strategy", pricingModel: "freemium", startingPrice: "$149/mo", hasFree: true, freeDetails: "Limited queries and topical analysis", paidPlans: ["$149/mo", "Custom"], tags: ["topic-authority", "strategy", "content-planning"], integrations: ["CMS"], platforms: ["web"] },
      { name: "Frase", website: "https://www.frase.io", subcategory: "content-briefs", pricingModel: "paid", startingPrice: "$45/mo", hasFree: false, paidPlans: ["$45/mo", "$115/mo"], tags: ["briefs", "outlines", "seo-writing"], integrations: ["Google Search Console"], platforms: ["web"] },
      { name: "NeuronWriter", website: "https://neuronwriter.com", subcategory: "on-page-seo", pricingModel: "paid", startingPrice: "$19/mo", hasFree: false, paidPlans: ["$19/mo", "$37/mo"], tags: ["affordable", "optimization", "content-score"], integrations: ["WordPress"], platforms: ["web"] },
    ],
  },
  {
    category: "social-media",
    items: [
      { name: "Buffer AI", website: "https://buffer.com/ai-assistant", subcategory: "scheduling", pricingModel: "freemium", startingPrice: "$6/mo", hasFree: true, freeDetails: "Free social channels with limited AI support", paidPlans: ["$6/mo/channel"], tags: ["scheduling", "post-ideas", "small-teams"], integrations: ["Instagram", "LinkedIn"], platforms: ["web", "mobile"] },
      { name: "Hootsuite AI", website: "https://www.hootsuite.com/owlywriter-ai", subcategory: "scheduling", pricingModel: "paid", startingPrice: "$99/mo", hasFree: false, paidPlans: ["$99/mo", "Enterprise"], tags: ["enterprise-social", "calendar", "analytics"], integrations: ["LinkedIn", "TikTok"], platforms: ["web"] },
      { name: "Predis.ai", website: "https://predis.ai", subcategory: "content-calendar", pricingModel: "freemium", startingPrice: "$32/mo", hasFree: true, freeDetails: "Starter posts and brand templates", paidPlans: ["$32/mo", "$59/mo"], tags: ["social-creatives", "ads", "calendar"], integrations: ["Shopify"], platforms: ["web"] },
      { name: "Taplio", website: "https://taplio.com", subcategory: "thought-leadership", pricingModel: "paid", startingPrice: "$39/mo", hasFree: false, paidPlans: ["$39/mo", "$65/mo"], tags: ["linkedin", "personal-brand", "lead-gen"], integrations: ["LinkedIn"], platforms: ["web"] },
      { name: "Lately AI", website: "https://www.lately.ai", subcategory: "repurposing", pricingModel: "paid", startingPrice: "$49/mo", hasFree: false, paidPlans: ["$49/mo", "Enterprise"], tags: ["repurposing", "brand-voice", "teams"], integrations: ["HubSpot"], platforms: ["web"] },
      { name: "Flick", website: "https://flick.social", subcategory: "content-calendar", pricingModel: "paid", startingPrice: "$14/mo", hasFree: false, paidPlans: ["$14/mo", "$30/mo"], tags: ["instagram", "caption-writing", "scheduling"], integrations: ["Instagram", "TikTok"], platforms: ["web", "mobile"] },
    ],
  },
];

const featuredSlugs = new Set([
  "midjourney",
  "cursor",
  "elevenlabs",
  "runway-ml",
  "gamma",
  "perplexity-ai",
]);

const trendingSlugs = new Set([
  "suno",
  "cursor",
  "midjourney",
  "elevenlabs",
  "runway-ml",
  "github-copilot",
  "gamma",
  "v0",
]);

const newestSlugs = new Set([
  "google-veo",
  "higgsfield",
  "wavespeedai",
  "civitai",
  "taskade-ai",
]);

const sponsoredSlugs = new Set([
  "predis-ai",
  "decktopus-ai",
  "mango-ai",
  "revid-ai",
  "frase",
]);

const taglineOverrides = {
  "midjourney": "Cinematic image generation with unmistakable style depth",
  "dall-e-3": "Prompt-faithful images with strong conversational editing",
  "gpt-image": "Editable image generation that feels native to chat",
  "runway-ml": "The creator stack for generative video and editing",
  "sora": "High-fidelity video generation built for story-rich scenes",
  "cursor": "The coding IDE that feels like pair-programming with an agent",
  "v0": "Generate polished React interfaces from plain-language prompts",
  "gamma": "Pitch decks and docs that write themselves beautifully",
  "perplexity-ai": "Answer engine with source-backed research in seconds",
  "elevenlabs": "Natural voice AI for narration, dubbing, and cloning",
  "chatgpt": "The general AI workspace for writing, thinking, and building",
};

const categoryDefaults = {
  "image-generation": {
    bestFor: ["creative teams", "marketers", "visual storytellers"],
    features: ["Style presets", "Prompt refinement", "Commercial asset generation", "Fast upscaling"],
    pros: ["Great visual output quality", "Fast iteration loop", "Useful for campaign concepts", "Strong inspiration engine"],
    cons: ["Can still miss exact brand nuance", "Usage costs climb quickly", "Best results need prompt practice", "Licensing rules vary by plan"],
    personas: ["Design leads", "Founders", "Social media teams"],
  },
  "video-generation": {
    bestFor: ["video teams", "social creators", "growth marketers"],
    features: ["Scene generation", "Motion control", "Editing assist", "Aspect-ratio exports"],
    pros: ["Cuts production time dramatically", "Good for social-first content", "Flexible output styles", "Useful for rapid testing"],
    cons: ["Long renders can bottleneck", "Credits disappear quickly", "Complex scenes still need cleanup", "Not every export is client-ready"],
    personas: ["Content studios", "Agency editors", "Solo creators"],
  },
  "music-generation": {
    bestFor: ["musicians", "video editors", "content creators"],
    features: ["Mood control", "Genre presets", "Export options", "Song structure edits"],
    pros: ["Fast way to test creative directions", "Useful for background music", "Good for prototypes and demos", "Saves licensing time"],
    cons: ["Results can feel repetitive", "Commercial licensing varies", "Fine control is limited", "Vocals are not always consistent"],
    personas: ["YouTubers", "Indie artists", "Video teams"],
  },
  "voice-audio": {
    bestFor: ["podcasters", "video teams", "voice production teams"],
    features: ["Voice cloning", "Dubbing", "Cleanup", "Translation"],
    pros: ["Huge time saver for narration", "Works well across languages", "Good for repeatable workflows", "Quality can be broadcast-ready"],
    cons: ["Consent and rights matter", "Premium voices cost more", "Latency can vary", "Requires careful QA"],
    personas: ["Podcast producers", "Explainer video teams", "Localization leads"],
  },
  "music-video": {
    bestFor: ["musicians", "creative directors", "promo teams"],
    features: ["Audio sync", "Visual styles", "Beat-aware edits", "Loop exports"],
    pros: ["Great for social promos", "Visuals feel fresh fast", "Useful for pre-release campaigns", "Easy to remix ideas"],
    cons: ["Fine scene control is limited", "Some outputs feel template-driven", "Licensing details differ", "Long-form projects still need editing"],
    personas: ["Artists", "Label teams", "YouTube channels"],
  },
  "presentation": {
    bestFor: ["founders", "consultants", "educators"],
    features: ["Outline generation", "Brand templates", "Speaker notes", "Chart layouts"],
    pros: ["Makes decks much faster", "Good balance of speed and polish", "Easy to iterate with teammates", "Useful for non-designers"],
    cons: ["Can feel generic without edits", "Complex data storytelling still needs manual work", "Templates may repeat", "Brand control varies by plan"],
    personas: ["Sales teams", "Startup founders", "Teachers"],
  },
  "writing-content": {
    bestFor: ["marketers", "freelancers", "operators"],
    features: ["Drafting", "Rewriting", "Summaries", "Tone control"],
    pros: ["Useful across many workflows", "Strong for first drafts", "Easy to learn quickly", "Helps maintain output volume"],
    cons: ["Needs human editing for accuracy", "Outputs can sound similar", "Brand voice requires setup", "Research quality depends on sources"],
    personas: ["Content marketers", "SEO writers", "Consultants"],
  },
  "coding-development": {
    bestFor: ["developers", "product teams", "technical founders"],
    features: ["Code generation", "Refactoring", "Repository chat", "Debug support"],
    pros: ["Speeds up common coding tasks", "Good for scaffolding and refactors", "Can explain unfamiliar code", "Useful for solo builders"],
    cons: ["Hallucinations still happen", "Needs review before merge", "Context windows have limits", "Costs rise with heavy usage"],
    personas: ["Frontend engineers", "Indie hackers", "Startup teams"],
  },
  "design-creative": {
    bestFor: ["designers", "brand teams", "creators"],
    features: ["Brand kits", "Mockups", "Concept generation", "Visual cleanup"],
    pros: ["Moves ideas from blank page quickly", "Helpful for stakeholders and drafts", "Good for brand exploration", "Accessible for non-designers"],
    cons: ["Final polish often needs manual work", "Outputs can converge stylistically", "Advanced teams may outgrow templates", "Some exports need cleanup"],
    personas: ["Brand designers", "Creators", "Marketing teams"],
  },
  "ai-avatars": {
    bestFor: ["training teams", "sales teams", "video marketers"],
    features: ["Presenter avatars", "Multilingual scripts", "Templates", "Fast exports"],
    pros: ["Great for repeatable video formats", "Saves on filming costs", "Works well for multilingual delivery", "Strong for internal content"],
    cons: ["Still less human than live video", "Avatar realism varies", "Premium plans can be costly", "Best results need clean scripts"],
    personas: ["Enablement teams", "Course creators", "B2B marketers"],
  },
  "research": {
    bestFor: ["analysts", "students", "founders"],
    features: ["Citations", "Document grounding", "Source search", "Summaries"],
    pros: ["Cuts research time noticeably", "Makes source validation easier", "Good for synthesis", "Useful for decision support"],
    cons: ["Needs verification on important facts", "Source quality varies", "May miss niche data", "Free tiers can be limited"],
    personas: ["Researchers", "Operators", "Students"],
  },
  "productivity": {
    bestFor: ["operators", "busy teams", "founders"],
    features: ["Meeting notes", "Task capture", "Action items", "Searchable memory"],
    pros: ["Removes repetitive admin work", "Useful for staying organized", "Easy to adopt team-wide", "Great for meetings"],
    cons: ["Can create too much data", "Permissions matter", "Transcription quality varies", "Needs process discipline"],
    personas: ["Founders", "Account managers", "Operations leads"],
  },
  "3d-generation": {
    bestFor: ["game teams", "3D artists", "product designers"],
    features: ["Model generation", "Texturing", "Scene ideation", "Export support"],
    pros: ["Accelerates early asset creation", "Useful for concept exploration", "Good for prototype pipelines", "Can shorten modeling time"],
    cons: ["Topology cleanup is common", "Production readiness varies", "Prompting is still experimental", "Complex assets need manual finishing"],
    personas: ["Game artists", "3D generalists", "Product teams"],
  },
  "seo-marketing": {
    bestFor: ["seo teams", "content strategists", "agencies"],
    features: ["Keyword research", "Content briefs", "SERP analysis", "Optimization workflows"],
    pros: ["Clear leverage for content teams", "Useful competitive insights", "Improves planning rigor", "Strong reporting support"],
    cons: ["Premium pricing is steep", "Data can lag or differ by region", "Needs experienced interpretation", "Not every recommendation should be followed blindly"],
    personas: ["SEO leads", "Agencies", "Editorial teams"],
  },
  "social-media": {
    bestFor: ["social managers", "creators", "agencies"],
    features: ["Scheduling", "Repurposing", "Caption generation", "Calendar planning"],
    pros: ["Speeds up publishing cadence", "Helpful for content repurposing", "Easy to manage multiple channels", "Useful for lean teams"],
    cons: ["Strategy still needs a human", "Suggested copy can feel generic", "Analytics vary by platform", "Strong brand voice needs tuning"],
    personas: ["Social leads", "Creators", "Marketing agencies"],
  },
};

const palette = ["#7C3AED", "#06B6D4", "#10B981", "#F59E0B", "#F43F5E", "#3B82F6", "#EC4899", "#14B8A6"];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/\+/g, " plus ")
    .replace(/&/g, " and ")
    .replace(/[.'()]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function startCase(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function hashString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatUsers(value) {
  if (value >= 10000000) return `${Math.round(value / 1000000)}M+`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1).replace(".0", "")}M+`;
  if (value >= 1000) return `${Math.round(value / 1000)}K+`;
  return `${value}+`;
}

function addAffiliateTag(url) {
  if (!url.startsWith("http")) return url;
  return `${url}${url.includes("?") ? "&" : "?"}ref=toolverse`;
}

function buildRating(slug, category, index, overrideOverall) {
  const base = 4.08 + (hashString(`${slug}-${category}`) % 76) / 100;
  const overall = overrideOverall ?? clamp(Number(base.toFixed(1)), 4.0, 4.9);
  return {
    overall,
    easeOfUse: clamp(Number((overall - 0.1 + ((index % 5) * 0.05)).toFixed(1)), 4.0, 4.9),
    features: clamp(Number((overall + 0.1).toFixed(1)), 4.0, 4.9),
    valueForMoney: clamp(Number((overall - 0.2 + ((index % 3) * 0.1)).toFixed(1)), 4.0, 4.9),
    support: clamp(Number((overall - 0.3 + ((index % 4) * 0.1)).toFixed(1)), 4.0, 4.9),
  };
}

function buildTagline(tool, categoryMeta) {
  const slug = slugify(tool.name);
  if (taglineOverrides[slug]) return taglineOverrides[slug];
  return `${startCase(tool.subcategory)} platform for ${categoryDefaults[categoryMeta.id].bestFor[hashString(slug) % 3]}`;
}

function buildDescription(tool, categoryMeta) {
  const defaults = categoryDefaults[categoryMeta.id];
  const audience = defaults.bestFor[hashString(`${tool.name}-audience`) % defaults.bestFor.length];
  const feature = defaults.features[hashString(`${tool.name}-feature`) % defaults.features.length].toLowerCase();
  const strength = tool.tags[0].replace(/-/g, " ");
  return `${tool.name} is an AI product built for ${audience}, with a strong focus on ${strength} workflows and ${feature}. It balances accessibility with serious capability, so beginners can get useful output quickly while power users still have room to push deeper. Based on our scoring, ${tool.name} stands out most when speed, polish, and dependable output quality matter.`;
}

function buildPros(tool, categoryMeta) {
  const defaults = categoryDefaults[categoryMeta.id];
  return [
    defaults.pros[0],
    `Strong fit for ${tool.bestFor.toLowerCase()}`,
    `Useful support for ${tool.tags.slice(0, 2).join(" and ")}`,
    defaults.pros[1],
  ];
}

function buildCons(tool, categoryMeta) {
  const defaults = categoryDefaults[categoryMeta.id];
  const pricingNote =
    tool.pricing.model === "paid"
      ? "Price can feel steep for solo users"
      : tool.pricing.model === "freemium"
        ? "Free tier is useful but deliberately limited"
        : defaults.cons[0];
  return [pricingNote, defaults.cons[1], defaults.cons[2], defaults.cons[3]];
}

function buildQuickAnswer(tool) {
  return `${tool.name} is best for ${tool.bestFor.toLowerCase()} who want ${tool.tags[0].replace(/-/g, " ")} capability with a ${tool.pricing.model} pricing model. It earns a ${tool.rating.overall.toFixed(1)}/5 overall rating in our directory thanks to its blend of ease of use, depth, and real-world value.`;
}

function buildFeatures(tool, categoryMeta) {
  const defaults = categoryDefaults[categoryMeta.id];
  return defaults.features.slice(0, 4).map((feature, index) => ({
    title: index === 0 ? `${tool.name} Core Workflow` : feature,
    description:
      index === 0
        ? `${tool.name} is especially strong for ${tool.tags.slice(0, 2).join(" and ")} use cases.`
        : `${feature} is one of the main reasons teams shortlist ${tool.name} when comparing tools in ${categoryMeta.name.toLowerCase()}.`,
  }));
}

function buildFaq(tool, categoryMeta) {
  return [
    {
      question: `Is ${tool.name} good for beginners?`,
      answer: `${tool.name} is approachable if you already understand the basics of ${categoryMeta.name.toLowerCase()}. The interface is friendly enough for new users, but the best results usually come after a few rounds of experimentation.`,
    },
    {
      question: `Does ${tool.name} have a free plan?`,
      answer: tool.pricing.hasFree
        ? `Yes. ${tool.pricing.freeDetails} That makes it practical to test before committing to a paid workflow.`
        : `No. ${tool.name} is currently a paid product, so most users evaluate it through a trial, demo, or lower entry plan.`,
    },
    {
      question: `Who should use ${tool.name}?`,
      answer: `${tool.name} is a strong fit for ${tool.bestFor.toLowerCase()}, especially if you care about ${tool.tags.slice(0, 2).join(" and ")}.`,
    },
  ];
}

function buildPersonas(tool, categoryMeta) {
  const defaults = categoryDefaults[categoryMeta.id];
  return defaults.personas.map((persona, index) => ({
    title: persona,
    description:
      index === 0
        ? `${persona} can use ${tool.name} to move from idea to draft much faster.`
        : `${persona} benefit most when they need reliable output without building a heavy workflow around the tool.`,
  }));
}

function buildPricing(tool) {
  return {
    model: tool.pricingModel,
    startingPrice: tool.startingPrice,
    hasFree: tool.hasFree,
    freeDetails: tool.freeDetails || (tool.hasFree ? "Starter access with limited monthly usage" : "No free plan"),
    paidPlans: tool.paidPlans || [tool.startingPrice],
  };
}

function buildUsersCount(slug, category) {
  const popularity = 250000 + (hashString(`${slug}-${category}`) % 9200000);
  return formatUsers(popularity);
}

function buildReviewCount(slug) {
  return 140 + (hashString(`${slug}-reviews`) % 4200);
}

function buildLastUpdated(slug) {
  const dayOffset = hashString(`${slug}-updated`) % 32;
  const date = new Date("2026-04-01T00:00:00Z");
  date.setUTCDate(date.getUTCDate() - dayOffset);
  return date.toISOString().slice(0, 10);
}

function brandColors(slug) {
  const primary = palette[hashString(`${slug}-primary`) % palette.length];
  const secondary = palette[hashString(`${slug}-secondary`) % palette.length];
  return { primary, secondary };
}

function logoSvg(name, slug) {
  const { primary, secondary } = brandColors(slug);
  const letters = name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="16" y1="16" x2="112" y2="112" gradientUnits="userSpaceOnUse">
      <stop stop-color="${primary}" />
      <stop offset="1" stop-color="${secondary}" />
    </linearGradient>
    <radialGradient id="r" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 28) rotate(43) scale(120)">
      <stop stop-color="white" stop-opacity="0.28" />
      <stop offset="1" stop-color="white" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect x="6" y="6" width="116" height="116" rx="34" fill="#0D1117"/>
  <rect x="10" y="10" width="108" height="108" rx="30" fill="url(#g)"/>
  <rect x="10" y="10" width="108" height="108" rx="30" fill="url(#r)"/>
  <circle cx="64" cy="64" r="34" fill="rgba(8,11,20,0.22)"/>
  <path d="M26 92C42 80.6667 54.6667 75 64 75C73.3333 75 86 80.6667 102 92" stroke="rgba(255,255,255,0.18)" stroke-width="3" stroke-linecap="round"/>
  <text x="64" y="72" text-anchor="middle" fill="white" font-size="28" font-family="Inter, Arial, sans-serif" font-weight="700">${letters}</text>
</svg>`;
}

const flatTools = toolCatalog.flatMap((group) =>
  group.items.map((tool, index) => ({
    ...tool,
    category: group.category,
    index,
  })),
);

const tools = flatTools.map((tool, overallIndex) => {
  const slug = slugify(tool.name);
  const categoryMeta = categories.find((entry) => entry.id === tool.category);

  if (!categoryMeta) {
    throw new Error(`Missing category for ${tool.name}`);
  }

  const pricing = buildPricing(tool);
  const overallOverrides = {
    "midjourney": 4.8,
    "dall-e-3": 4.7,
    "cursor": 4.9,
    "elevenlabs": 4.8,
    "perplexity-ai": 4.8,
    "runway-ml": 4.7,
    "gamma": 4.7,
    "v0": 4.7,
    "github-copilot": 4.7,
  };
  const rating = buildRating(slug, tool.category, overallIndex, overallOverrides[slug]);
  const tags = tool.tags || [tool.subcategory, tool.category, "beginner-friendly"];
  const hasAffiliate = hashString(`${slug}-affiliate`) % 10 !== 0;
  const { primary, secondary } = brandColors(slug);
  const bestForSeed = categoryDefaults[categoryMeta.id].bestFor;
  const bestFor = tool.bestFor || `${bestForSeed[hashString(`${slug}-bestfor`) % bestForSeed.length].charAt(0).toUpperCase()}${bestForSeed[hashString(`${slug}-bestfor`) % bestForSeed.length].slice(1)}`;

  return {
    id: slug,
    name: tool.name,
    tagline: buildTagline(tool, categoryMeta),
    description: buildDescription({ ...tool, tags }, categoryMeta),
    quickAnswer: "",
    category: tool.category,
    secondaryCategories: tool.secondaryCategories || [],
    subcategory: tool.subcategory,
    logo: `/logos/${slug}.svg`,
    website: tool.website,
    affiliateUrl: addAffiliateTag(tool.website),
    hasAffiliate,
    pricing,
    rating,
    tags,
    pros: [],
    cons: [],
    bestFor,
    platforms: tool.platforms || ["web"],
    integrations: tool.integrations || [categoryMeta.name, "Zapier"],
    featured: featuredSlugs.has(slug),
    trending: trendingSlugs.has(slug),
    new: newestSlugs.has(slug),
    sponsored: sponsoredSlugs.has(slug),
    verified: hashString(`${slug}-verified`) % 8 !== 0,
    lastUpdated: buildLastUpdated(slug),
    usersCount: buildUsersCount(slug, tool.category),
    reviewCount: buildReviewCount(slug),
    brandColor: primary,
    brandGradient: `linear-gradient(135deg, ${primary}, ${secondary})`,
    highlights: [],
    personas: [],
    faq: [],
    alternatives: [],
    relatedTools: [],
    verdict:
      rating.overall >= 4.7
        ? `${tool.name} is one of the strongest options in this category if you want premium output and can justify the spend.`
        : `${tool.name} is a strong shortlist pick when you want a balance of usability, features, and sensible pricing.`,
  };
});

for (const tool of tools) {
  const categoryMeta = categories.find((entry) => entry.id === tool.category);
  if (!categoryMeta) continue;

  tool.pros = buildPros(tool, categoryMeta);
  tool.cons = buildCons(tool, categoryMeta);
  tool.quickAnswer = buildQuickAnswer(tool);
  tool.highlights = buildFeatures(tool, categoryMeta);
  tool.personas = buildPersonas(tool, categoryMeta);
  tool.faq = buildFaq(tool, categoryMeta);
}

for (const tool of tools) {
  const peers = tools
    .filter((candidate) => candidate.category === tool.category && candidate.id !== tool.id)
    .sort((left, right) => right.rating.overall - left.rating.overall)
    .slice(0, 3)
    .map((candidate) => candidate.id);
  tool.alternatives = peers.slice(0, 2);
  tool.relatedTools = peers;
}

const categoriesWithCounts = categories.map((category) => ({
  ...category,
  toolCount: tools.filter(
    (tool) => tool.category === category.id || tool.secondaryCategories.includes(category.id),
  ).length,
  featuredTools: tools
    .filter(
      (tool) =>
        (tool.category === category.id || tool.secondaryCategories.includes(category.id)) &&
        tool.featured,
    )
    .slice(0, 3)
    .map((tool) => tool.id),
}));

const blogPosts = [
  {
    slug: "cursor-ai-vs-github-copilot-which-is-better",
    content: `---
title: "Cursor AI vs GitHub Copilot - Which is Better in 2026?"
excerpt: "A practical comparison of the two most important AI coding assistants for modern product teams."
category: "Comparisons"
date: "2026-04-03"
featured: true
readTime: "9 min read"
author: "ToolVerse Editorial"
---

## The Short Answer

Cursor is the better choice if you want an AI-first editor with agentic workflows, deep repository awareness, and a faster path from idea to implementation.

GitHub Copilot remains the safer choice if your team is already standardized on GitHub, wants predictable IDE coverage, and values enterprise familiarity over experimentation.

## Where Cursor Wins

- It feels built around AI, not retrofitted with AI.
- Repository chat and multi-file edits are easier to reach.
- Prompt-to-code workflows feel more fluid for solo builders.

## Where GitHub Copilot Wins

- Adoption is easier inside existing enterprise engineering teams.
- It supports more editors without changing the team workflow.
- Security, governance, and billing conversations are simpler.

## Best For Different Teams

If you are a startup moving quickly, Cursor usually unlocks more leverage per developer.

If you are a larger team with strict compliance and established GitHub workflows, Copilot is often the lower-friction rollout.

## Our Take

For 2026, Cursor is the more exciting product and the stronger productivity jump for most modern builders. Copilot is still excellent, but it feels more incremental while Cursor feels more transformative.`,
  },
  {
    slug: "best-free-ai-tools-right-now",
    content: `---
title: "10 Best Free AI Tools You Can Use Right Now"
excerpt: "A high-signal list of free or generous AI products that still deliver real value in everyday workflows."
category: "Reviews"
date: "2026-03-28"
featured: false
readTime: "7 min read"
author: "ToolVerse Editorial"
---

## Why Free Still Matters

The best free AI tools are not the ones with the most marketing hype. They are the ones that let you complete meaningful work before you hit a wall.

## Our Favorites

1. ChatGPT for general ideation and drafting.
2. NotebookLM for source-grounded research.
3. Codeium for no-cost coding assistance.
4. Khroma for color exploration.
5. Canva AI for lightweight creative work.
6. Perplexity AI for answer-led research.
7. Fathom for meeting notes.
8. Ideogram for text-heavy image generation.
9. Taskade AI for structured productivity.
10. Suno for music experimentation.

## What To Watch For

Free tiers are excellent for exploration, but they often limit export quality, daily usage, or collaboration. The right move is to use free plans for validation, then upgrade only when the workflow proves itself.

## Final Thought

If you are building as a freelancer, student, or early-stage founder, a carefully chosen stack of free tools can cover a surprising amount of work without slowing you down.`,
  },
  {
    slug: "how-to-use-elevenlabs-professional-voiceovers",
    content: `---
title: "How to Use ElevenLabs to Create Professional Voiceovers"
excerpt: "A practical workflow for turning raw scripts into polished narration with better pacing, tone, and production quality."
category: "Tutorials"
date: "2026-03-21"
featured: false
readTime: "8 min read"
author: "ToolVerse Editorial"
---

## Start With the Script

Professional voiceovers are mostly a script problem. Before you touch a voice model, tighten the copy so every sentence is easy to say out loud.

## Choose the Right Voice

Pick a voice based on use case, not novelty. Explainers usually need calm clarity. Ads need stronger pacing and sharper emphasis. Tutorials often benefit from slightly slower delivery.

## Production Workflow

1. Break long scripts into smaller sections.
2. Generate multiple takes for key lines.
3. Listen for unnatural stress, then rewrite the line instead of forcing the model.
4. Clean the final export in Descript or your editor of choice.

## Common Mistakes

- Trying to fix weak copy with voice settings.
- Using one pacing style for every section.
- Exporting without a final listen on headphones.

## Final Thought

ElevenLabs can absolutely sound professional, but the best results come from treating AI voice generation like real production work instead of one-click automation.`,
  },
];

ensureDir(path.join(root, "data"));
ensureDir(path.join(root, "public", "logos"));
ensureDir(path.join(root, "content", "blog"));

fs.writeFileSync(path.join(root, "data", "tools.json"), `${JSON.stringify(tools, null, 2)}\n`);
fs.writeFileSync(
  path.join(root, "data", "categories.json"),
  `${JSON.stringify(categoriesWithCounts, null, 2)}\n`,
);

for (const tool of tools) {
  fs.writeFileSync(path.join(root, "public", "logos", `${tool.id}.svg`), logoSvg(tool.name, tool.id));
}

for (const post of blogPosts) {
  fs.writeFileSync(path.join(root, "content", "blog", `${post.slug}.mdx`), `${post.content}\n`);
}

console.log(`Generated ${tools.length} tools, ${categoriesWithCounts.length} categories, and ${blogPosts.length} blog posts.`);
