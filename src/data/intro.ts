/** sessionStorage key marking that the opening curtain already played this session. */
export const INTRO_SEEN_KEY = "oddly-intro-seen";

/**
 * Inline <head> script: marks <html data-intro-seen> before first paint when
 * the intro already played this browser session, so the server-rendered
 * curtain is hidden by CSS and never flashes on reloads.
 */
export const introSeenScript = `try{if(sessionStorage.getItem("${INTRO_SEEN_KEY}"))document.documentElement.dataset.introSeen=""}catch(e){}`;
