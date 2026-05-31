// Portrait State System
// Computes what an NPC's portrait visually shows based on their current body stats.
// Used by transformation dialogues to describe clothing/visibility changes.

// =========================================
// CONSTANTS
// =========================================

const SKIRT_BASED_NPCS = ['vessa', 'barret', 'della', 'lenna', 'mrs_thornwick'];
const PANTS_BASED_NPCS = ['mira', 'fiona', 'aldric', 'corwin', 'holt'];

const NPC_PORTRAIT_CONFIG = {
    mira: {
        topThresholds: [
            { level: 5, top: 'crop_top' },
            { level: 3, top: 'inner_layer' },
        ],
        masturbationTop: () => 'crop_top',
    },
    vessa: {
        topThresholds: [
            { level: 5, top: 'crop_top' },
            { level: 3, top: 'inner_layer' },
        ],
        masturbationTop: () => 'crop_top',
    },
    barret: {
        topThresholds: [],
        masturbationTop: () => 'crop_top',
    },
    della: {
        topThresholds: [
            { level: 5, top: 'crop_top' },
            { level: 3, top: 'inner_layer' },
        ],
        masturbationTop: () => 'crop_top',
    },
    lenna: {
        topThresholds: [
            { level: 5, top: 'crop_top' },
        ],
        masturbationTop: () => 'crop_top',
    },
    mrs_thornwick: {
        topThresholds: [
            { level: 4, top: 'inner_layer' },
        ],
        masturbationTop: () => 'crop_top',
    },
    aldric: {
        topThresholds: [
            { level: 5, top: 'crop_top' },
            { level: 3, top: 'inner_layer' },
        ],
        masturbationTop: () => 'crop_top',
    },
    corwin: {
        topThresholds: [
            { level: 4, top: 'revealing' },
        ],
        masturbationTop: (c) => c >= 4 ? 'nude' : 'crop_top',
    },
    holt: {
        topThresholds: [
            { level: 5, top: 'crop_top' },
            { level: 3, top: 'inner_layer' },
        ],
        masturbationTop: () => 'crop_top',
    },
    fiona: {
        topThresholds: [],
        masturbationTop: () => 'crop_top',
    },
};

// =========================================
// EXTREME FORM CHECK
// =========================================

// c5+m5+b5 at any genitalSize — distinct from isGoddessForm() which requires gs=3
function isExtremeForm(targetId) {
    if (targetId === 'player') return false;
    const body = getCurrentBody(targetId);
    if (!body) return false;
    return body.chest === 5 && body.muscle === 5 && body.butt === 5;
}

// =========================================
// HELPER FUNCTIONS
// =========================================

// Whether the NPC's portrait shows a short skirt (lifted/hiked up)
function _shouldWearShortSkirt(body, targetId) {
    if (body.butt >= 5) return true;
    if (body.genitaliaSize === 3 && body.genitalia === 1) return true;
    if (body.genitaliaSize === 3 && SKIRT_BASED_NPCS.includes(targetId)) return true;
    return false;
}

// Whether genitals are visible in the portrait
function _shouldShowGenitals(body, targetId) {
    if (body.genitaliaSize >= 2 && body.butt === 5) return true;
    if (body.genitaliaSize === 3 && body.genitalia === 1) return true;
    if (body.genitaliaSize === 3 && SKIRT_BASED_NPCS.includes(targetId)) return true;
    return false;
}

// Whether the NPC is in the masturbation pose (g1+gs3 with at least one stat at 5)
function _isMasturbationPose(body) {
    return body.genitaliaSize === 3 && body.genitalia === 1 &&
           (body.chest === 5 || body.muscle === 5 || body.butt === 5);
}

// Whether the body is at extreme stats (c5+m5+b5)
function _isExtremeBody(body) {
    return body.chest === 5 && body.muscle === 5 && body.butt === 5;
}

// =========================================
// CORE: getPortraitVisualState
// =========================================

// Returns { top, bottom, genitalVisibility, chestVisibility, pose }
// describing what the NPC's portrait currently looks like.
// bodyOverride: optional body object to use instead of getCurrentBody()
function getPortraitVisualState(targetId, bodyOverride) {
    const config = NPC_PORTRAIT_CONFIG[targetId];
    if (!config) return null;

    const body = bodyOverride || getCurrentBody(targetId);
    if (!body) return null;

    const extreme = _isExtremeBody(body);
    const masturbation = _isMasturbationPose(body);
    const wearsSkirt = SKIRT_BASED_NPCS.includes(targetId);
    const wearsPants = PANTS_BASED_NPCS.includes(targetId);
    const shortSkirt = _shouldWearShortSkirt(body, targetId);

    // --- Pose ---
    let pose;
    if (extreme) {
        pose = 'ahegao';
    } else if (masturbation) {
        pose = 'touching_self';
    } else if (body.genitalia === 1 && body.genitaliaSize === 3 && !masturbation) {
        pose = 'skirt_lift';
    } else {
        pose = 'normal';
    }

    // --- Bottom ---
    let bottom;
    if (extreme) {
        bottom = 'nude';
    } else if (masturbation) {
        // Corwin special case: nude bottom at c>=4
        if (targetId === 'corwin' && body.chest >= 4) {
            bottom = 'nude';
        } else {
            bottom = 'bottomless';
        }
    } else if (shortSkirt) {
        bottom = 'skirt';
    } else {
        bottom = wearsPants ? 'pants' : 'skirt';
    }

    // --- Top ---
    let top;
    if (extreme) {
        top = 'nude';
    } else if (masturbation) {
        top = config.masturbationTop(body.chest);
    } else {
        // Check thresholds (highest level first — config arrays are ordered descending)
        top = 'full_outfit';
        const level = Math.max(body.chest, body.muscle, body.butt, body.genitaliaSize);
        for (const threshold of config.topThresholds) {
            if (level >= threshold.level) {
                top = threshold.top;
                break;
            }
        }
    }

    // --- Genital Visibility ---
    let genitalVisibility;
    if (extreme || masturbation) {
        genitalVisibility = 'exposed';
    } else if (body.genitalia === 1 && body.genitaliaSize >= 2) {
        // Penis: always visible as bulge through any bottomwear,
        // or on_display if skirt+gs3
        if (shortSkirt && body.genitaliaSize === 3) {
            genitalVisibility = 'on_display';
        } else {
            genitalVisibility = 'bulge';
        }
    } else if (body.genitalia === 0 && body.genitaliaSize >= 2) {
        // Vagina visibility depends on clothing type
        if (shortSkirt) {
            // Forced into short skirt (b=5, or gs3+skirt-based) — genitals may be visible
            if (body.genitaliaSize === 3 || body.butt === 5) {
                genitalVisibility = 'on_display';
            } else {
                genitalVisibility = 'subtle_under_skirt';
            }
        } else if (wearsPants) {
            // Pants-based NPC: cameltoe
            genitalVisibility = 'cameltoe';
        } else {
            // Dress/skirt-based NPC in default dress at gs2: dress covers it
            genitalVisibility = 'hidden';
        }
    } else {
        genitalVisibility = 'hidden';
    }

    // --- Chest Visibility ---
    let chestVisibility;
    if (extreme || top === 'nude') {
        chestVisibility = 'exposed';
    } else if (body.chest === 5 && (top === 'crop_top' || top === 'revealing')) {
        chestVisibility = 'underboob';
    } else if (body.chest >= 4) {
        chestVisibility = 'deep_cleavage';
    } else if (body.chest >= 2) {
        chestVisibility = 'cleavage';
    } else {
        chestVisibility = 'covered';
    }

    return { top, bottom, genitalVisibility, chestVisibility, pose };
}

// =========================================
// TRANSITION DETECTION
// =========================================

// Given stat changes [{ stat, from, to }, ...], compute which visual properties changed.
// Returns an object of changed properties: { prop: { from, to } }
function getPortraitTransitions(targetId, statChanges) {
    if (!statChanges || statChanges.length === 0) return {};

    const body = getCurrentBody(targetId);
    if (!body) return {};

    // Reconstruct "before" body by reversing changes on current body
    const beforeBody = Object.assign({}, body);
    for (const change of statChanges) {
        beforeBody[change.stat] = change.from;
    }

    const beforeState = getPortraitVisualState(targetId, beforeBody);
    const afterState = getPortraitVisualState(targetId, body);
    if (!beforeState || !afterState) return {};

    const transitions = {};
    for (const prop of ['top', 'bottom', 'genitalVisibility', 'chestVisibility', 'pose']) {
        if (beforeState[prop] !== afterState[prop]) {
            transitions[prop] = { from: beforeState[prop], to: afterState[prop] };
        }
    }
    return transitions;
}
