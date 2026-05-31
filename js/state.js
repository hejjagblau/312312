// Game State Management

// NPC Text Colors - unique dialogue colors per character
const NPC_COLORS = {
    mira: '#7ed56f',           // Soft green (courier)
    aldric: '#d4824a',         // Bronze (blacksmith)
    vessa: '#9b59b6',          // Purple (herbalist)
    mrs_thornwick: '#3498db',  // Royal blue (authority)
    fiona: '#f39c12',          // Amber (warmth)
    barret: '#e74c3c',         // Warm red (tavern)
    lenna: '#a8d8ea',          // Soft blue (librarian)
    corwin: '#1abc9c',         // Teal (merchant)
    della: '#d4a574',          // Warm brown (baker)
    holt: '#5d6d7e',           // Steel grey (guard)
    sylvie: '#ff69b4'          // Hot pink (mad scientist aunt)
};

// Text formatting colors
const TEXT_COLORS = {
    player: '#eee',            // Player dialogue (white)
    narration: '#aaa',         // Narration text (grey)
    action: '#aaa'             // Action/asterisk text (grey, italicized)
};

// Get color for NPC speaker name
function getNpcColor(npcId) {
    return NPC_COLORS[npcId] || '#e94560';  // Default to accent color
}

// Format dialogue text with colors and line breaks
// Parses: "quoted dialogue", *action/narration*, plain narration
// Supports {npcId} prefix before quotes to color individual lines by speaker
// Returns HTML string with appropriate styling
// Note: Only double quotes are treated as dialogue (single quotes/apostrophes are ignored to preserve contractions)
function formatDialogueText(text, speakerNpcId = null) {
    if (!text) return '';

    // Collapse double spaces (from empty stat descriptors like genitaliaSize at gs0)
    text = text.replace(/  +/g, ' ');

    // Determine default dialogue color based on speaker
    const defaultDialogueColor = speakerNpcId ? getNpcColor(speakerNpcId) : TEXT_COLORS.player;

    // Split text into segments, preserving delimiters
    // Match: {speaker} tags, "quoted text" (double quotes only), *asterisk text*, or plain text
    const segments = [];
    let remaining = text;
    let activeColor = defaultDialogueColor; // Track current speaker color for inline tags

    while (remaining.length > 0) {
        // Check for {npcId} speaker tag — sets color for the next quoted dialogue
        // Only consume if the tag ID is a known NPC or 'player'
        const tagMatch = remaining.match(/^\{(\w+)\}/);
        if (tagMatch) {
            const tagId = tagMatch[1];
            if (tagId === 'player' || NPC_COLORS[tagId]) {
                activeColor = tagId === 'player' ? TEXT_COLORS.player : NPC_COLORS[tagId];
                remaining = remaining.substring(tagMatch[0].length);
                continue;
            }
            // Unknown tag ID — treat { as literal text, fall through to plain text handling
        }

        // Check for quoted dialogue first (double quotes only - single quotes/apostrophes preserved for contractions)
        const quoteMatch = remaining.match(/^"([^"]*)"/) || remaining.match(/^"([^"]*)"/);
        if (quoteMatch) {
            segments.push({ type: 'dialogue', content: quoteMatch[0], color: activeColor });
            remaining = remaining.substring(quoteMatch[0].length);
            // Reset to default after consuming the tagged quote
            activeColor = defaultDialogueColor;
            continue;
        }

        // Check for double asterisks (bold/notification) - must check before single asterisks
        const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
        if (boldMatch) {
            segments.push({ type: 'bold', content: boldMatch[1] });
            remaining = remaining.substring(boldMatch[0].length);
            continue;
        }

        // Check for asterisk action/narration
        const asteriskMatch = remaining.match(/^\*([^*]+)\*/);
        if (asteriskMatch) {
            segments.push({ type: 'action', content: asteriskMatch[1] });
            remaining = remaining.substring(asteriskMatch[0].length);
            continue;
        }

        // Plain text until next special segment (double quotes, asterisks, or speaker tags)
        const nextSpecial = remaining.search(/[""\*{]/);
        if (nextSpecial === -1) {
            // Rest is plain text
            if (remaining.trim()) {
                segments.push({ type: 'narration', content: remaining });
            }
            break;
        } else if (nextSpecial === 0) {
            // Unmatched special char, treat as plain text
            segments.push({ type: 'narration', content: remaining[0] });
            remaining = remaining.substring(1);
        } else {
            // Plain text before next special
            const plainText = remaining.substring(0, nextSpecial);
            if (plainText.trim()) {
                segments.push({ type: 'narration', content: plainText });
            } else if (plainText) {
                // Preserve whitespace between segments
                segments.push({ type: 'whitespace', content: plainText });
            }
            remaining = remaining.substring(nextSpecial);
        }
    }

    // Build HTML output — paragraph breaks only from explicit \n\n in source text
    // (no automatic breaks on segment type changes, so inline quotes flow naturally)
    let html = '';
    let pendingBreak = false; // True when a \n\n has been seen but not yet output

    for (const segment of segments) {
        if (segment.type === 'whitespace') {
            if (segment.content.includes('\n\n')) {
                pendingBreak = true;
            }
            continue;
        }

        // Check if this segment's content starts with a paragraph break
        if (/^\n\s*\n/.test(segment.content)) {
            pendingBreak = true;
        }

        // Insert pending paragraph break (but not at the very start of output)
        if (pendingBreak && html) {
            html += '<br><br>';
        }
        pendingBreak = false;

        // Check if content ends with a paragraph break (signal for next segment)
        const endsWithBreak = /\n\s*\n\s*$/.test(segment.content);

        // Strip leading/trailing newlines — paragraph breaks at boundaries
        // are handled by the pendingBreak logic above
        let content = segment.content.replace(/^\n+/, '').replace(/\n+$/, '');

        // Escape HTML in content
        let escaped = content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Process inline **bold** markup within any segment type
        escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #e94560;">$1</strong>');

        // Convert double newlines to paragraph breaks within any segment
        escaped = escaped.replace(/\n\n/g, '<br><br>');

        switch (segment.type) {
            case 'dialogue':
                html += `<span style="color: ${segment.color || defaultDialogueColor}">${escaped}</span>`;
                break;
            case 'action':
                html += `<span style="color: ${TEXT_COLORS.action}; font-style: italic;">*${escaped}*</span>`;
                break;
            case 'narration':
                html += `<span style="color: ${TEXT_COLORS.narration}">${escaped}</span>`;
                break;
            case 'bold':
                html += `<strong style="color: #e94560;">${escaped}</strong>`;
                break;
        }

        // Propagate trailing paragraph break to next iteration
        if (endsWithBreak) {
            pendingBreak = true;
        }
    }

    // Collapse any runs of 3+ <br> tags down to exactly 2 (one paragraph break)
    html = html.replace(/(<br>){3,}/g, '<br><br>');
    // Strip leading/trailing breaks
    html = html.replace(/^(<br>)+/, '').replace(/(<br>)+$/, '');

    return html;
}

// Transformation Devices
// Each device modifies one body stat with "More" or "Less" options
// All devices are available from the start
// Aether is required for increases, refunded for decreases
const DEVICES = {
    chest_shaper: {
        id: 'chest_shaper',
        name: 'Chest Shaper',
        description: 'Modifies chest tissue composition. One of your uncle\'s more popular devices, judging by the wear on it.',
        stat: 'chest',
        statMax: 5,
        unlockOrder: 1,
        tiers: [5, 15, 25, 35, 45] // Â±1, Â±2, Â±3, Â±4, Â±5
    },
    posterior_enhancer: {
        id: 'posterior_enhancer',
        name: 'Posterior Enhancer',
        description: 'Reshapes the gluteal region. The cushioned seat suggests extended use was expected.',
        stat: 'butt',
        statMax: 5,
        unlockOrder: 2,
        tiers: [8, 18, 28, 38, 48]
    },
    muscle_toner: {
        id: 'muscle_toner',
        name: 'Muscle Toner',
        description: 'Stimulates or relaxes muscle fiber density. The device hums at a frequency you can feel in your teeth.',
        stat: 'muscle',
        statMax: 5,
        unlockOrder: 4,
        tiers: [16, 26, 36, 46, 56]
    },
    height_adjuster: {
        id: 'height_adjuster',
        name: 'Height Adjuster',
        description: 'Alters skeletal and tissue proportions uniformly. Complex calibration required - your uncle\'s notes stress caution.',
        stat: 'height',
        statMax: 5,
        unlockOrder: 5,
        tiers: [22, 32, 42, 52, 62],
        disabled: true // Height system disabled for now - revisit when images improve
    },
    genital_sizer: {
        id: 'genital_sizer',
        name: 'Genital Sizer',
        description: 'Adjusts the proportions of intimate anatomy. Handle with care and discretion.',
        stat: 'genitaliaSize',
        statMax: 3,
        unlockOrder: 6,
        tiers: [30, 40, 50, 60, 70]
    },
    genital_reshaper: {
        id: 'genital_reshaper',
        name: 'Genital Reshaper',
        description: 'Fundamentally alters primary physical characteristics. The most complex of your uncle\'s devices.',
        stat: 'genitalia',
        statMax: 1,  // 0=vagina, 1=penis
        unlockOrder: 7,
        tiers: [40, 50, 60, 70, 80]
    }
};

// Get devices sorted by unlock order (excludes disabled devices)
function getDevicesByUnlockOrder() {
    return Object.values(DEVICES)
        .filter(d => !d.disabled)
        .sort((a, b) => a.unlockOrder - b.unlockOrder);
}

// Check if a device is unlocked (all devices now available from start, just check if disabled)
function isDeviceUnlocked(deviceId) {
    const device = DEVICES[deviceId];
    if (!device) return false;
    if (device.disabled) return false;
    return true;  // All devices available from start - Aether is the only gate
}

// Get the current tier level for a device (always max tier)
function getDeviceTier(deviceId) {
    const device = DEVICES[deviceId];
    if (!device) return 0;
    return device.tiers.length;  // Always max tier - devices are fully unlocked
}

// Get the safe range (Â±X from natural) for a device (always max range now)
function getDeviceSafeRange(deviceId) {
    return 5;  // All transformations are "safe" - Aether is the only gate
}

// Check if player can use a device (all devices available, just need aether)
function canUseDevice(deviceId) {
    const device = DEVICES[deviceId];
    if (!device) return { canUse: false, reason: 'Device not found' };

    if (!isDeviceUnlocked(deviceId)) {
        return { canUse: false, reason: 'Device is disabled' };
    }

    return { canUse: true };
}

// Legacy function - kept for compatibility but all devices are now always unlocked
function getNewlyUnlockedDevices() {
    return [];  // No unlock progression - all devices available from start
}

// Legacy function - kept for compatibility
function markDevicesSeen() {
}

// Legacy function - no unlock tiers anymore
function deviceHasNewTiers(deviceId) {
    return false;  // No tier progression - all tiers always unlocked
}

// Get the natural body stats for a target (NPC or player)
function getNaturalBody(targetId) {
    if (targetId === 'player') {
        return gameState.player.naturalBody;
    }
    return gameState.npcs[targetId]?.naturalBody;
}

// Get the current body stats for a target (NPC or player)
function getCurrentBody(targetId) {
    if (targetId === 'player') {
        return gameState.player.body;
    }
    return gameState.npcs[targetId]?.body;
}

// Check if a transformation is within safe range
function isTransformationSafe(deviceId, targetId, direction) {
    const device = DEVICES[deviceId];
    if (!device) return { safe: false, reason: 'Device not found' };

    const naturalBody = getNaturalBody(targetId);
    const currentBody = getCurrentBody(targetId);
    if (!naturalBody || !currentBody) return { safe: false, reason: 'Target not found' };

    const naturalValue = naturalBody[device.stat];
    const currentValue = currentBody[device.stat];
    const safeRange = getDeviceSafeRange(deviceId);

    const newValue = currentValue + (direction === 'more' ? 1 : -1);
    const distanceFromNatural = Math.abs(newValue - naturalValue);

    if (distanceFromNatural > safeRange) {
        return {
            safe: false,
            reason: `Exceeds safe range (Â±${safeRange} from natural)`,
            wouldNeed: distanceFromNatural
        };
    }

    // Check stat bounds
    if (newValue < 0 || newValue > device.statMax) {
        return { safe: false, reason: 'At stat limit' };
    }

    return { safe: true };
}

// Check if an NPC transformation is allowed based on desire system
// At trust < 100 (sandbox), only transformations toward current desire are allowed
function isTransformationAllowedForNpc(npcId, stat, direction) {
    const trust = gameState.npcs[npcId]?.trust || 0;
    const thresholds = getNpcTrustThresholds(npcId);
    const npc = gameState.npcs[npcId];

    // At sandbox level (100), any transformation is allowed
    if (trust >= thresholds.sandbox) {
        return { allowed: true };
    }

    // Check if desire is revealed (trust threshold)
    if (!isDesireRevealed(npcId)) {
        return { allowed: false, reason: "They don't trust you enough to let you transform them yet." };
    }

    // Check if desire has been shared through dialogue (defense-in-depth)
    // Check new system flags, jealousy events, AND legacy desiresRevealed array
    const legacyDesireRevealed = npc?.desiresRevealed?.some(r => r === true);
    const desireKnown = npc?.desireKnownToPlayer || npc?.desireRevealed || legacyDesireRevealed;
    if (!desireKnown) {
        return { allowed: false, reason: "You haven't learned what they want yet. Try chatting with them." };
    }

    // Check if this transformation moves toward their current desire
    const desire = npc.currentDesire;

    if (!desire) {
        // No current desire - allow transformation to build relationship
        return { allowed: true };
    }

    // Only allow transformations toward the desired stat
    if (desire.stat !== stat) {
        return { allowed: false, reason: `They only want you to work on their ${getStatDisplayName(desire.stat)} right now.` };
    }

    // Check direction matches what they want
    const currentValue = npc.body[stat];
    const targetValue = desire.target;

    if (direction === 'more' && currentValue >= targetValue) {
        return { allowed: false, reason: "That's already at their desired level." };
    }
    if (direction === 'less' && currentValue <= targetValue) {
        return { allowed: false, reason: "That would go against what they want." };
    }

    return { allowed: true };
}

// Helper to get readable stat name (for UI and dialogue)
function getStatDisplayName(stat, forDialogue = false) {
    // Dialogue-friendly names (sounds more natural in speech)
    if (forDialogue) {
        const dialogueNames = {
            chest: 'chest',
            muscle: 'muscles',
            butt: 'rear',
            genitalia: 'anatomy',
            genitaliaSize: 'size'
        };
        return dialogueNames[stat] || stat;
    }
    // UI-friendly names
    const names = {
        chest: 'chest',
        muscle: 'muscle',
        butt: 'butt',
        genitalia: 'genitalia',
        genitaliaSize: 'genital size'
    };
    return names[stat] || stat;
}

// Perform a transformation with a device
// targetId can be 'player' or an NPC id
// Aether costs: increase or genitalia change = 2 (drawn from crystal cube), decrease = free
function useDevice(deviceId, targetId, direction) {
    const device = DEVICES[deviceId];
    if (!device) return { success: false, message: 'Device not found' };

    const check = canUseDevice(deviceId);
    if (!check.canUse) return { success: false, message: check.reason };

    const naturalBody = getNaturalBody(targetId);
    const currentBody = getCurrentBody(targetId);
    if (!naturalBody || !currentBody) return { success: false, message: 'Target not found' };

    const currentValue = currentBody[device.stat];

    const change = direction === 'more' ? 1 : -1;
    let newValue = currentValue + change;

    // Check bounds
    if (newValue < 0 || newValue > device.statMax) {
        return { success: false, message: 'Cannot change further in that direction' };
    }

    // Check if NPC transformation is allowed (desire system)
    if (targetId !== 'player') {
        const allowCheck = isTransformationAllowedForNpc(targetId, device.stat, direction);
        if (!allowCheck.allowed) {
            return { success: false, message: allowCheck.reason };
        }
    }

    // Calculate aether cost
    const isIncrease = direction === 'more';
    const isGenitaliaChange = device.stat === 'genitalia';
    const aetherCost = (isIncrease || isGenitaliaChange) ? 2 : 0;

    // Check aether affordability for increases
    if (aetherCost > 0 && !canAffordAether(aetherCost)) {
        return { success: false, message: `The crystal cube doesn't have enough Aether. Requires ${aetherCost} Aether.` };
    }

    // Apply aether cost
    if (aetherCost > 0) {
        spendAether(aetherCost);
    }

    // Apply change
    if (targetId === 'player') {
        gameState.player.body[device.stat] = newValue;
        // When changing genitalia type, reset genital size to 1
        if (device.stat === 'genitalia') {
            gameState.player.body.genitaliaSize = 1;
        }
    } else {
        gameState.npcs[targetId].body[device.stat] = newValue;
        // When changing genitalia type, reset genital size to 1
        if (device.stat === 'genitalia') {
            gameState.npcs[targetId].body.genitaliaSize = 1;
        }
    }

    // Enforce cascading stat restrictions
    const cascadingChanges = enforceStatRestrictions(targetId);

    // Update newValue to reflect actual value after cascading restrictions
    // This ensures the return value matches reality for UI display
    const actualBody = targetId === 'player' ? gameState.player.body : gameState.npcs[targetId]?.body;
    if (actualBody && actualBody[device.stat] !== newValue) {
        newValue = actualBody[device.stat];
    }

    // Check if this is a repeat visit to this stat level (NPCs only)
    let isRepeatLevel = false;
    if (targetId !== 'player') {
        const npc = gameState.npcs[targetId];
        if (npc.reachedLevels?.[device.stat]) {
            isRepeatLevel = npc.reachedLevels[device.stat].includes(newValue);
        }
    }

    // Record body history snapshot for NPCs
    if (targetId !== 'player') {
        recordNpcBodyChange(targetId);
    }

    // Check if NPC desire was fulfilled
    let desireFulfilled = false;
    if (targetId !== 'player') {
        const npc = gameState.npcs[targetId];
        if (npc.currentDesire && npc.currentDesire.stat === device.stat) {
            if (npc.body[device.stat] === npc.currentDesire.target) {
                markDesireFulfilled(targetId);
                desireFulfilled = true;
            }
        }
    }

    // Mark first transformation flag (unlocks "Use Transformation Devices" in workshop)
    if (!gameState.flags.first_transformation) {
        gameState.flags.first_transformation = true;
    }

    saveState();

    // Calculate trust change if target is an NPC
    let trustResult = null;
    if (targetId !== 'player') {
        trustResult = calculateTrustChangeNew(targetId, device.stat, currentValue, newValue, desireFulfilled);
        applyTrustChange(targetId, trustResult.trustChange, trustResult.halveTrust);
    }

    return {
        success: true,
        previousValue: currentValue,
        newValue: newValue,
        stat: device.stat,
        isRepeatLevel: isRepeatLevel,
        aetherCost: aetherCost,
        trustResult: trustResult,
        cascadingChanges: cascadingChanges,
        desireFulfilled: desireFulfilled
    };
}

// Enforce stat combination restrictions with cascading effects
// - Muscle 4-5 â†’ butt minimum 2
// - Muscle 5 â†’ chest minimum 1
// - Chest 5 â†’ muscle minimum 1
// - Butt 5 â†’ muscle minimum 1
function enforceStatRestrictions(targetId) {
    const body = targetId === 'player' ? gameState.player.body : gameState.npcs[targetId]?.body;
    if (!body) return [];

    const changes = [];

    // Muscle 4-5 requires butt minimum 2
    if (body.muscle >= 4 && body.butt < 2) {
        changes.push({ stat: 'butt', from: body.butt, to: 2, reason: 'Increased muscle mass developed your glutes as well.' });
        body.butt = 2;
    }

    // Muscle 5 requires chest minimum 1
    if (body.muscle >= 5 && body.chest < 1) {
        changes.push({ stat: 'chest', from: body.chest, to: 1, reason: 'Your powerful pectoral muscles have added some mass to your chest.' });
        body.chest = 1;
    }

    // Chest 5 requires muscle minimum 1
    if (body.chest >= 5 && body.muscle < 1) {
        changes.push({ stat: 'muscle', from: body.muscle, to: 1, reason: 'Supporting such a massive chest has built some underlying muscle.' });
        body.muscle = 1;
    }

    // Butt 5 requires muscle minimum 1
    if (body.butt >= 5 && body.muscle < 1) {
        changes.push({ stat: 'muscle', from: body.muscle, to: 1, reason: 'Such powerful glutes have toned the rest of your body slightly.' });
        body.muscle = 1;
    }

    return changes;
}

// Get the minimum achievable value for a stat given current body restrictions
// Used to filter out unreachable archetype targets
function getMinimumAchievableValue(stat, body) {
    if (stat === 'muscle') {
        // Muscle minimum is 1 if chest >= 5 or butt >= 5
        if (body.chest >= 5 || body.butt >= 5) return 1;
    }
    if (stat === 'butt') {
        // Butt minimum is 2 if muscle >= 4
        if (body.muscle >= 4) return 2;
    }
    if (stat === 'chest') {
        // Chest minimum is 1 if muscle >= 5
        if (body.muscle >= 5) return 1;
    }
    return 0;
}


const STAT_LABELS = {
    chest: ['Flat', 'Small', 'Average', 'Large', 'Very Large', 'Massive'],
    muscle: ['None', 'Minimal', 'Fit', 'Athletic', 'Muscular', 'Extreme'],
    butt: ['Flat', 'Small', 'Average', 'Full', 'Large', 'Massive'],
    genitalia: ['Vagina', 'Penis'],
    genitaliaSize: ['Small', 'Average', 'Large', 'Huge']
};

// ==========================================
// KNOWLEDGE DISCOVERY SYSTEM
// ==========================================
// Knowledge is discovered through conversations and research
// Some knowledge unlocks device recipes or story content

const KNOWLEDGE_ITEMS = {
    // Basic concepts (discovered through NPC conversations)
    transformation_basics: {
        id: 'transformation_basics',
        name: 'Transformation Basics',
        description: 'The fundamental principles of physical transformation magic.',
        discoveredFrom: 'Studying uncle\'s notes'
    },
    // Device-related knowledge
    crystal_focusing: {
        id: 'crystal_focusing',
        name: 'Crystal Focusing',
        description: 'How magical crystals channel transformation energy.',
        discoveredFrom: 'Vessa\'s herbs contain crystalline compounds',
        unlocksHint: 'chest_shaper'
    },
    pressure_dynamics: {
        id: 'pressure_dynamics',
        name: 'Pressure Dynamics',
        description: 'How controlled pressure affects tissue reshaping.',
        discoveredFrom: 'Aldric mentions special alloys',
        unlocksHint: 'posterior_enhancer'
    },
    muscle_resonance: {
        id: 'muscle_resonance',
        name: 'Muscle Fiber Resonance',
        description: 'Frequencies that stimulate muscle growth or relaxation.',
        discoveredFrom: 'Uncle\'s notes on vibration patterns',
        unlocksHint: 'muscle_toner'
    },
    fundamental_reshaping: {
        id: 'fundamental_reshaping',
        name: 'Fundamental Reshaping',
        description: 'The deepest level of physical transformation.',
        discoveredFrom: 'Uncle\'s personal journal',
        unlocksHint: 'genital_reshaper'
    },

    // Story knowledge
    uncle_past: {
        id: 'uncle_past',
        name: 'Uncle\'s History',
        description: 'Your uncle was once a renowned healer who grew disillusioned with conventional medicine.',
        discoveredFrom: 'Mrs. Thornwick remembers him',
        storyFlag: 'uncle_healer_past'
    },
    blackstone_tower: {
        id: 'blackstone_tower',
        name: 'Blackstone Tower',
        description: 'An abandoned tower where your uncle sent mysterious packages.',
        discoveredFrom: 'Mira\'s delivery routes',
        storyFlag: 'knows_blackstone_tower'
    },
    moonpetal_essence: {
        id: 'moonpetal_essence',
        name: 'Moonpetal Essence',
        description: 'A rare ingredient that amplifies transformation effects.',
        discoveredFrom: 'Vessa\'s rare inventory',
        storyFlag: 'knows_moonpetal'
    },
    uncle_love: {
        id: 'uncle_love',
        name: 'Uncle\'s Lost Love',
        description: 'Your uncle created his devices to help someone he loved who couldn\'t accept their body.',
        discoveredFrom: 'Della\'s honey cake memories',
        storyFlag: 'uncle_motivation_revealed'
    },
    uncle_feminizing: {
        id: 'uncle_feminizing',
        name: 'The Feminizing Effect',
        description: 'Uncle\'s devices have a built-in bias toward feminine presentation. Every transformation pulls the body toward a more feminine form, regardless of intent.',
        discoveredFrom: 'Hidden journal entry',
        storyFlag: 'knows_feminizing_effect'
    }
};

// Check if player has discovered specific knowledge
function hasKnowledge(knowledgeId) {
    return gameState.player.knowledgeUnlocked.includes(knowledgeId);
}

// Discover new knowledge
function discoverKnowledge(knowledgeId) {
    if (hasKnowledge(knowledgeId)) return { alreadyKnown: true };

    const knowledge = KNOWLEDGE_ITEMS[knowledgeId];
    if (!knowledge) return { error: 'Knowledge not found' };

    // Check prerequisites
    if (knowledge.requiresKnowledge) {
        for (const req of knowledge.requiresKnowledge) {
            if (!hasKnowledge(req)) {
                return { error: `Requires understanding of ${KNOWLEDGE_ITEMS[req]?.name || req} first` };
            }
        }
    }

    // Add to unlocked knowledge
    gameState.player.knowledgeUnlocked.push(knowledgeId);

    // Set story flag if applicable
    if (knowledge.storyFlag) {
        gameState.flags[knowledge.storyFlag] = true;
    }

    saveState();
    UI.updatePlayerSidebar();

    return {
        success: true,
        knowledge: knowledge
    };
}

// Get all available knowledge to discover (prerequisites met, not yet known)
function getDiscoverableKnowledge() {
    return Object.values(KNOWLEDGE_ITEMS).filter(k => {
        if (hasKnowledge(k.id)) return false;
        if (k.requiresKnowledge) {
            return k.requiresKnowledge.every(req => hasKnowledge(req));
        }
        return true;
    });
}

// ==========================================
// REQUEST BOARD SYSTEM
// ==========================================
// Abstract jobs that earn coins without detailed content
// Some jobs have special outcomes: NPC hints, trust boosts, story flags

const TOWN_ENCOUNTER_TEXTS = {
    fiona: 'You spot Fiona lounging near the fountain in the town square. She flags you down and peppers you with questions about your workshop while you walk together.',
    vessa: 'You spot Vessa rearranging her shop window. She asks your opinion on the display, and you spend a pleasant few minutes chatting about her wares.',
    barret: 'Barret waves you over to taste-test a new ale recipe. You give honest feedback, and she seems genuinely grateful for the input.',
    della: 'Della flags you down outside the bakery, flustered about a stuck window shutter. A quick fix earns you a warm smile and a fresh roll.',
    lenna: 'You find Lenna struggling with a heavy stack of books near the library. You help her carry them inside, and she thanks you shyly.',
    mrs_thornwick: 'Mrs. Thornwick nods to you from her desk as you pass the library. You exchange a few words about your uncle, and she seems mildly impressed you are keeping the workshop open.',
    aldric: 'You encounter Aldric near the town square, adjusting his sword belt. He asks about the workshop and you trade a few friendly words.',
    corwin: 'Corwin spots you from his market stall and waves you over. He shares a bit of local gossip while you browse his goods.',
    holt: 'Holt gives you a curt nod from the guard post. You chat briefly about the town, and he seems to warm up slightly.'
};

const REQUEST_TYPES = [
    {
        id: 'simple_repair',
        name: 'Simple Repair',
        description: 'Fix a broken household device.',
        coinReward: 8,
        weight: 30
    },
    {
        id: 'consultation',
        name: 'Technical Consultation',
        description: 'Advise someone on mechanical matters.',
        coinReward: 12,
        weight: 25
    },
    {
        id: 'town_encounter',
        name: 'Town Encounter',
        description: 'A job takes you into town, where you bump into a familiar face.',
        coinReward: 10,
        weight: 35,
        outcome: 'town_encounter',
        getOutcomeText: function() {
            // Pick a random unlocked NPC (excluding mira)
            const eligible = (gameState.progression?.unlockedNpcs || []).filter(id => id !== 'mira');
            if (eligible.length === 0) {
                return { text: 'You finish the job and head back to the workshop. The streets are quiet today.', npcId: null };
            }
            const npcId = eligible[Math.floor(Math.random() * eligible.length)];
            const text = TOWN_ENCOUNTER_TEXTS[npcId] || `You bump into ${getNpcDisplayName(npcId)} while out on the job and have a brief chat.`;
            return { text, npcId };
        }
    },
    {
        id: 'rush_job',
        name: 'Rush Job',
        description: 'An urgent repair with a tight deadline.',
        coinReward: 25,
        weight: 10
    },
    {
        id: 'complex_repair',
        name: 'Complex Repair',
        description: 'Repair an intricate mechanism.',
        coinReward: 15,
        weight: 20,
        minDay: 5
    },
    {
        id: 'research_assistance',
        name: 'Research Assistance',
        description: 'Help someone understand old technical documents.',
        coinReward: 15,
        weight: 10,
        minDay: 6
    },
    {
        id: 'calibration',
        name: 'Device Calibration',
        description: 'Calibrate sensitive equipment for a client.',
        coinReward: 20,
        weight: 15,
        minDay: 8
    },
    {
        id: 'old_acquaintance',
        name: 'Old Acquaintance',
        description: 'An elderly customer claims to have known your uncle.',
        coinReward: 15,
        weight: 5,
        minDay: 8,
        outcome: 'story_hook',
        storyFlag: 'uncle_regular_clients',
        outcomeText: 'The old man smiles warmly. "Your uncle helped me years ago. Discretely. He was a good man - helped more people than you\'d ever guess. Ask around town... carefully."'
    },
    {
        id: 'noble_commission',
        name: 'Noble Commission',
        description: 'A minor noble needs discreet repairs to an unusual device.',
        coinReward: [20, 35],
        weight: 8,
        minDay: 10
    },
    {
        id: 'mysterious_package',
        name: 'Mysterious Package',
        description: 'Someone left a package with a cryptic note asking for "adjustments."',
        coinReward: 30,
        weight: 5,
        minDay: 12,
        storyHint: true
    }
];

// Get a random request based on day (more options unlock over time)
function getRandomRequest() {
    const day = gameState.day;

    // Filter requests available based on days passed
    const availableRequests = REQUEST_TYPES.filter(r =>
        !r.minDay || day >= r.minDay
    );

    // Weighted random selection
    const totalWeight = availableRequests.reduce((sum, r) => sum + r.weight, 0);
    let random = Math.random() * totalWeight;

    for (const request of availableRequests) {
        random -= request.weight;
        if (random <= 0) {
            return request;
        }
    }

    return availableRequests[0]; // Fallback
}

// Complete a request and get rewards
function completeRequest(request) {
    // Handle variable coin reward (array = random range)
    let coinEarned;
    if (Array.isArray(request.coinReward)) {
        const [min, max] = request.coinReward;
        coinEarned = min + Math.floor(Math.random() * (max - min + 1));
    } else {
        coinEarned = request.coinReward;
    }

    gameState.player.coin += coinEarned;

    // Handle special outcomes
    let outcomeText = null;
    let specialOutcome = null;

    if (request.outcome) {
        switch (request.outcome) {
            case 'town_encounter':
                // Dynamic NPC encounter with +1 trust
                if (request.getOutcomeText) {
                    const result = request.getOutcomeText();
                    outcomeText = result.text;
                    if (result.npcId && gameState.npcs[result.npcId]) {
                        gameState.npcs[result.npcId].trust = Math.min(100, (gameState.npcs[result.npcId].trust || 0) + 1);
                        specialOutcome = 'trust_boost';
                    }
                }
                break;

            case 'story_hook':
                // Set story flag
                if (request.storyFlag) {
                    gameState.flags[request.storyFlag] = true;
                    outcomeText = request.outcomeText;
                    specialOutcome = 'story_hook';
                }
                break;
        }
    }

    saveState();
    UI.updatePlayerSidebar();

    return {
        coinEarned: coinEarned,
        outcomeText: outcomeText,
        specialOutcome: specialOutcome
    };
}

// ==========================================
// STORY EVENTS SYSTEM
// ==========================================
// Triggered by conditions - day count, flags, etc.

const STORY_EVENTS = {
    // Note: first_device_unlock removed - devices are always available now
    uncle_journal_found: {
        id: 'uncle_journal_found',
        name: 'Uncle\'s Journal',
        trigger: () => gameState.day >= 7 && !gameState.flags.story_journal_found,
        scene: 'story_uncle_journal',
        priority: 8
    },
    mysterious_visitor: {
        id: 'mysterious_visitor',
        name: 'Mysterious Visitor',
        trigger: () => gameState.day >= 14 && !gameState.flags.story_mysterious_visitor &&
                      gameState.phase === 'evening' && gameState.currentLocation === 'workshop',
        scene: 'story_mysterious_visitor',
        priority: 9
    },
    // blackstone_revelation removed - key is now given by mysterious visitor on Day 14
    // Male NPC Transformation Events - spaced one week apart
    corwin_vessa_bet: {
        id: 'corwin_vessa_bet',
        name: 'The Wager',
        trigger: () => isNpcUnlocked('corwin') && isNpcUnlocked('vessa') &&
                      (gameState.npcs.corwin?.trust || 0) >= 3 &&
                      (gameState.npcs.vessa?.trust || 0) >= 3 &&
                      !gameState.flags.story_corwin_bet_started &&
                      gameState.phase === 'evening',
        scene: 'story_corwin_bet_intro',
        priority: 10  // High priority - important story event
    },
    aldric_accident: {
        id: 'aldric_accident',
        name: 'Workshop Accident',
        trigger: () => isNpcUnlocked('aldric') &&
                      !gameState.flags.story_aldric_accident &&
                      gameState.flags.story_corwin_bet_complete,
        scene: 'story_aldric_accident_intro',
        priority: 10
    },
    holt_transformation_available: {
        id: 'holt_transformation_available',
        name: 'Holt\'s Revelation',
        trigger: () => isNpcUnlocked('holt') &&
                      !gameState.flags.story_holt_transformation_available &&
                      gameState.flags.story_aldric_accident_complete,
        scene: 'story_holt_revelation',
        priority: 10
    },
    // Self-transform unlock - triggers when first NPC completes a desire today
    // Mira + Mrs. Thornwick drunk workshop dare - 3 days after Thornwick reaches intimate trust
    mira_thornwick_vignette: {
        id: 'mira_thornwick_vignette',
        name: 'Late Night at the Workshop',
        trigger: () => {
            if (gameState.flags.mira_thornwick_vignette_seen) return false;

            const trust = gameState.npcs.mrs_thornwick?.trust || 0;
            const threshold = getNpcTrustThresholds('mrs_thornwick').intimate;

            if (trust < threshold) return false;

            // Track when she first reached intimate
            if (!gameState.flags.thornwick_intimate_reached_day) {
                gameState.flags.thornwick_intimate_reached_day = gameState.day;
                saveState();
                return false;
            }

            return gameState.day >= gameState.flags.thornwick_intimate_reached_day + 3;
        },
        scene: 'mira_thornwick_vignette_1',
        priority: 8
    },
    self_transform_unlock: {
        id: 'self_transform_unlock',
        name: 'Gift of Gratitude',
        trigger: () => {
            // Already unlocked - don't trigger again
            if (gameState.player.canSelfTransform) return false;

            // Already triggered - don't trigger again
            if (gameState.flags.self_transform_unlock_triggered) return false;

            // Check if any unlocked NPC had their desire fulfilled today
            for (const npcId of Object.keys(gameState.npcs)) {
                if (!isNpcUnlocked(npcId)) continue;
                const npc = gameState.npcs[npcId];
                if (npc.desireFulfilledDay === gameState.day) {
                    // Store which NPC triggered this
                    gameState.flags.self_transform_unlock_npc = npcId;
                    return true;
                }
            }
            return false;
        },
        scene: 'self_transform_unlock_event',
        priority: 15  // Higher priority than most events
    }
};

// Check for triggered story events (returns highest priority triggered event)
function checkStoryEvents() {
    let triggeredEvent = null;
    let highestPriority = -1;

    for (const event of Object.values(STORY_EVENTS)) {
        if (event.trigger() && event.priority > highestPriority) {
            triggeredEvent = event;
            highestPriority = event.priority;
        }
    }

    return triggeredEvent;
}

// Mark a story event as seen
function markStoryEventSeen(eventId) {
    const flagName = `story_${eventId.replace('story_', '')}`;
    gameState.flags[flagName] = true;
    saveState();
}

// ==========================================
// DAY TRANSITION SYSTEM
// ==========================================
// Handle overnight effects reset and daily events

function handleDayTransition() {
    // Clear prototype effects overnight
    if (gameState.player.prototypeEffect) {
        gameState.player.prototypeEffect = null;
        gameState.player.prototypeEffectSeenBy = [];  // Clear tracking of who's commented
    }

    // Increment day
    gameState.day += 1;
    gameState.phase = 'morning';

    // Force workshop as starting location for new day
    gameState.currentLocation = 'workshop';

    // Reset Mira daily workshop visit flag
    gameState.miraVisitedWorkshopToday = false;

    // Reset tower daily visit flag
    gameState.towerVisitedToday = false;

    // Check vendor restocking (items auto-restock when restockDay is reached)
    checkVendorRestock();

    // Refresh NPC desires if needed
    refreshAllNpcDesires();

    // Roll for NPC sexual advance
    rollNpcAdvance();

    saveState();
}

// Prototype device effects - temporary, reset overnight
// dayEnding: true means the effect is so extreme it ends the player's day
const PROTOTYPE_EFFECTS = [
    // 1-3: Mild effects (good early introductions)
    {
        id: 'inflate_hips',
        name: 'Wide Load',
        description: 'Your hips widen dramatically! Doorways are now a tight squeeze...',
        category: 'inflation',
        dayEnding: false
    },
    { id: 'big_lips', name: 'Plump Lips', description: 'Your lips have become very full and plump!', category: 'face' },
    {
        id: 'inflate_belly',
        name: 'Balloon Belly',
        description: 'Your belly swells enormously, making you look extremely pregnant with quintuplets!',
        category: 'inflation',
        dayEnding: true,
        dayEndMessage: "Your belly is so swollen you can't even bend over! You'll have to wait until the effect wears off overnight..."
    },

    // 4+: Shuffled remaining effects
    { id: 'elf_ears', name: 'Pointed Ears', description: 'Your ears have become long and pointed like an elf!', category: 'face' },
    { id: 'skin_green', name: 'Green Skin', description: 'Your skin has turned a soft green!', category: 'body' },
    {
        id: 'inflate_breasts',
        name: 'Balloon Breasts',
        description: 'Your breasts suddenly swell to ridiculous proportions! You can barely see past them, let alone walk properly...',
        category: 'inflation',
        dayEnding: true,
        dayEndMessage: "Your breasts have swollen so large you can barely stand upright! You'll have to wait until the effect wears off overnight..."
    },
    { id: 'hair_pink', name: 'Pink Hair', description: 'Your hair has turned bright pink!', category: 'hair' },
    { id: 'tail', name: 'Tail', description: 'You\'ve grown a tail!', category: 'body' },
    { id: 'eyes_red', name: 'Glowing Red Eyes', description: 'Your eyes are glowing a fierce red and your skin has flushed a deep crimson!', category: 'face' },
    {
        id: 'inflate_butt',
        name: 'Balloon Butt',
        description: 'Your rear suddenly expands until it\'s almost spherical! You can\'t even fit through doorways anymore...',
        category: 'inflation',
        dayEnding: true,
        dayEndMessage: "Your butt has inflated so much you're stuck! You'll have to wait until the effect wears off overnight..."
    },
    { id: 'hair_long', name: 'Floor-Length Hair', description: 'Your hair has grown impossibly long, reaching the floor!', category: 'hair' },
    { id: 'skin_blue', name: 'Blue Skin', description: 'Your skin has turned a pale blue!', category: 'body' },
    { id: 'four_arms', name: 'Four Arms', description: 'You\'ve sprouted an extra pair of arms!', category: 'body' },
    { id: 'eyes_purple', name: 'Glowing Purple Eyes', description: 'Your eyes are glowing an eerie purple!', category: 'face' },
    {
        id: 'inflate_body',
        name: 'Full Body Inflation',
        description: 'Your entire body puffs up like a balloon! You feel like you might float away...',
        category: 'inflation',
        dayEnding: true,
        dayEndMessage: "You've inflated into a round ball! You can barely move at all. You'll have to wait until the effect wears off overnight..."
    },
    { id: 'huge_hands', name: 'Huge Hands', description: 'Your hands have grown enormous!', category: 'body' },
    { id: 'hair_white', name: 'White Hair', description: 'Your hair has turned snow white!', category: 'hair' },
    { id: 'bald', name: 'Bald', description: 'All your hair has fallen out!', category: 'hair' }
];

// NPC Trust Thresholds - required trust levels for interactions (scaled to 100)
// desireReveal: when NPC shares their desire and allows transformation toward it
// sandbox (100): full trust - player can use any device freely
// Thresholds: flirt = desireReveal+10, intimate = flirt+10, sandbox = intimate+40
const NPC_TRUST_THRESHOLDS = {
    mira:          { desireReveal: 5,   flirt: 15,  intimate: 20,  sandbox: 40 },
    aldric:        { desireReveal: 10,  flirt: 20,  intimate: 30,  sandbox: 70 },
    vessa:         { desireReveal: 5,   flirt: 15,  intimate: 25,  sandbox: 65 },
    mrs_thornwick: { desireReveal: 10,  flirt: 20,  intimate: 30,  sandbox: 70 },
    fiona:         { desireReveal: 0,   flirt: 10,  intimate: 20,  sandbox: 60 },
    barret:        { desireReveal: 5,   flirt: 15,  intimate: 25,  sandbox: 65 },
    lenna:         { desireReveal: 10,  flirt: 20,  intimate: 30,  sandbox: 70 },
    corwin:        { desireReveal: 5,   flirt: 15,  intimate: 25,  sandbox: 65 },
    della:         { desireReveal: 10,  flirt: 20,  intimate: 30,  sandbox: 70 },
    holt:          { desireReveal: 10,  flirt: 20,  intimate: 30,  sandbox: 70 }
};

// ==========================================
// NPC PROGRESSION GATING SYSTEM
// ==========================================
// NPCs unlock in tiers as player reaches sex milestones with Mira directing

const PROGRESSION_TIERS = {
    0: { npcs: ['fiona'], requires: [] },                           // Fiona available from day 3
    1: { options: { corwin_vessa: ['corwin', 'vessa'], barret_della: ['barret', 'della'] } },
    '1b': { npcs: null },  // Populated dynamically based on tier1Choice (the unchosen pair)
    2: { npcs: ['aldric', 'lenna'] },
    3: { npcs: ['mrs_thornwick', 'holt'] }
};

const NPC_BRUSHOFF_TEXT = {
    fiona: "She freezes when she notices you looking her way, then quickly busies herself with whatever's in her hands. She's clearly not ready to talk to a stranger.",
    vessa: "She glances at you with polite disinterest, then returns to sorting her herbs. You get the feeling she's sizing you up and finding you... unremarkable.",
    barret: "\"What'll it be, love?\" She takes your order with professional warmth, but there's a wall there. You're just another customer.",
    corwin: "He tips his hat with a charming smile that doesn't reach his eyes. \"New in town, are we? Best of luck settling in.\" The dismissal is smooth as silk.",
    della: "\"Hello, dear! Fresh bread?\" She's warm and friendly, but the conversation never goes deeper than pastries. She has a way of steering things back to baked goods whenever you try.",
    lenna: "She startles when you approach, clutching her book to her chest. \"Oh! I... the reference section is over there.\" She buries her nose back in her book before you can say anything else.",
    aldric: "He looks up from the anvil, gives you a flat once-over, and goes back to hammering. Not hostile. Just busy. You clearly haven't earned a conversation yet.",
    mrs_thornwick: "\"Good day.\" Her smile is diplomatic and her tone is final. The Town Elder has things to attend to, and you are not one of them.",
    holt: "\"Citizen.\" A curt nod, eyes already scanning past you. The town guard is on duty. You're not a threat, so you're not interesting."
};

// ==========================================
// MIRA SEX HINT SYSTEM (Primary Tier Advancement Path)
// ==========================================
// When an NPC needs sex unlocked for tier progression (getNpcsAwaitingSex),
// Mira visits the workshop and hints that the NPC is interested.
// 3 escalating hint levels per NPC, with body-stat-specific punchlines.
// The player then goes to the NPC and clicks "Intimate..." in their greeting.
// This is the PRIMARY path — see also the secondary random advance system above.
//
// Flow: workshop_main onEnter → getNpcsAwaitingSex() → mira_sex_hint scene
//       → player visits NPC → "Intimate..." button → {npc}_sex_intro
//       → markSexUnlocked() → checkTierAdvancement()

const HINT_NPC_FRAMING = {
    fiona: [
        "\"So... Fiona's been talking about you. A lot. I think she really wants to get closer.\"",
        "\"You still haven't made a move on Fiona? She practically told me she's ready.\"",
        "\"Okay boss, seriously. Fiona is RIGHT THERE. She wants you. What are you waiting for?!\""
    ],
    vessa: [
        "\"Even Vessa seems curious about you, and she's bored by everything. That's saying something.\"",
        "\"Vessa's been dropping hints, boss. For her that's basically throwing herself at you.\"",
        "\"Vessa is interested. VESSA. Do you know how rare that is? Go!\""
    ],
    barret: [
        "\"Barret's been asking about you after closing time. I think she's interested in more than your drink order.\"",
        "\"Barret keeps bringing you up, boss. 'Has the workshop owner been in lately?' She's not subtle.\"",
        "\"Barret basically asked me to send you over! She's waiting, boss. Go close the deal!\""
    ],
    della: [
        "\"Della baked you something special today. I think it's a hint, boss.\"",
        "\"Della's been saving the good pastries for you. And blushing when she talks about you. Take the hint!\"",
        "\"Della told me she can't stop thinking about you! She's too sweet to say it herself, so I'm saying it. Go!\""
    ],
    corwin: [
        "\"Corwin's been showing off whenever you're around. It's actually kind of adorable.\"",
        "\"Corwin keeps 'accidentally' running into you. That's not an accident, boss.\"",
        "\"Corwin wants you, boss. That whole charming act? It's for YOU. Stop making her work so hard!\""
    ],
    lenna: [
        "\"Lenna keeps looking up from her books when you walk by. I don't think she knows she's doing it.\"",
        "\"I caught Lenna writing your name in the margins of a book. She turned so red. Boss, come on.\"",
        "\"Lenna's been fantasizing about you, I guarantee it. She reads those romance novels for a reason! Go be the hero!\""
    ],
    aldric: [
        "\"Aldric's been checking herself out in the forge reflection a lot lately. I think she's ready for someone else to appreciate the view.\"",
        "\"Aldric keeps glancing at you when she thinks nobody's looking. For Aldric, that's basically a love confession.\"",
        "\"Aldric's not going to make the first move, boss. She's too stubborn. So YOU do it!\""
    ],
    holt: [
        "\"Holt finally looks like herself. I think she could use someone to help her... settle in.\"",
        "\"Holt's been lingering near the workshop on her patrols. That's not a coincidence, boss.\"",
        "\"Holt is standing out there RIGHT NOW pretending to be on duty. She wants you! Go!\""
    ]
};

const HINT_PUNCHLINES_L1 = {
    chest: "\"She keeps tugging at her top when you're around. Those breasts want attention, boss.\"",
    butt: "\"Have you noticed the way she walks now? That ass is begging to be appreciated.\"",
    muscle: "\"She's been flexing when you're around. I think she wants you to feel.\"",
    genital_g1: "\"She's got a cock now and I can tell she's dying for someone to help her enjoy it.\"",
    genital_g0: "\"She keeps squirming in her seat lately. I think she needs some hands-on attention down there.\""
};

const HINT_PUNCHLINES_L23 = {
    chest: [
        "\"Those {size} tits aren't going to play with themselves, boss.\"",
        "\"She's spilling out of her top with those {size} breasts. You're just going to look?\"",
        "\"I'd kill to have {size} tits like that. Don't let them go to waste.\""
    ],
    butt: [
        "\"That {size} ass isn't going to appreciate itself. She's waiting for you.\"",
        "\"She's been walking around with that {size} ass and you haven't grabbed it? Criminal.\"",
        "\"I can't stop staring at that {size} butt and I'm not even the one she wants.\""
    ],
    muscle: [
        "\"All those {size} muscles and nobody's felt them up close? Tragic.\"",
        "\"She could pin you down with those {size} arms. Let her.\"",
        "\"Those {size} abs, those arms... boss, come on. Go find out how firm they are.\""
    ],
    genital_g1: [
        "\"That {size} cock isn't going to enjoy itself, boss.\"",
        "\"She's packing a {size} cock and nobody's touched it. That's a crime.\"",
        "\"She told me it's {size} enough that she can barely fit it in her pants. Imagine what that would feel like.\""
    ],
    genital_g0: [
        "\"That {size} pussy is practically on display and you haven't gone near it.\"",
        "\"She can barely sit still with that {size} pussy. Everything's so sensitive. Go help her out.\"",
        "\"I can see that {size} pussy right through her clothes, boss. She doesn't mind one bit.\""
    ]
};

const HINT_SIZE_ADJECTIVES = {
    chest:      { 1: 'small', 2: 'nice', 3: 'big', 4: 'huge', 5: 'massive' },
    butt:       { 1: 'small', 2: 'cute', 3: 'round', 4: 'big', 5: 'enormous' },
    muscle:     { 1: 'toned', 2: 'fit', 3: 'strong', 4: 'powerful', 5: 'incredible' },
    genital_g1: { 1: 'cute little', 2: 'nice', 3: 'big', 4: 'huge' },
    genital_g0: { 2: 'pretty', 3: 'plump', 4: 'fat' }
};

// ==========================================
// DYNAMIC DESIRE SYSTEM (Jealousy-Based)
// ==========================================
// NPCs with female body presentation participate in the jealousy system
// They compare themselves to other female NPCs and develop desires based on comparisons

// Config for which stats each NPC can desire and whether they can want to shrink
// NPC Personality Types for shrink desire behavior:
// PRUDE: Small reductions (1-2 pts) to be "proper" or avoid attention
// PRACTICAL: Only shrink if current size interferes with work/life
// ADVENTUROUS: Only dramatic shrinks (3+ pts) for experimentation
// GROWTH_FOCUSED: Almost never want to shrink
// ENTHUSIAST: Loves all change equally - the process itself is arousing
const NPC_PERSONALITY_TYPES = {
    PRUDE: 'prude',
    PRACTICAL: 'practical',
    ADVENTUROUS: 'adventurous',
    GROWTH_FOCUSED: 'growth_focused',
    ENTHUSIAST: 'enthusiast'
};

// ==========================================
// JEALOUSY VARIETY EXPANSION CONFIG
// ==========================================

const SATISFACTION_CONFIG = {
    baseMinDays: 4,           // Minimum days of satisfaction after desire fulfilled
    archetypeBonus: 3,        // Extra days after completing an archetype
    majorChangeBonus: 2,      // Extra days if change was 3+ points
    naturalReturnBonus: 2,    // Extra days if returned to natural value
    maxSatisfaction: 10       // Cap on satisfaction period
};

// (WHIM_CONFIG, ARCHETYPE_CONFIG, GODDESS_CONFIG removed â€” replaced by hidden archetype system)

// ==========================================
// BODY ARCHETYPES
// ==========================================

const BODY_ARCHETYPES = {
    hourglass: {
        name: "Hourglass",
        description: "Classic curves - generous top and bottom with a slim waist",
        targets: { chest: [5, 5], muscle: [0, 2], butt: [5, 5], genitaliaSize: [2, 2] },
        flavorText: {
            celebration: "She catches her reflection and stops mid-step, hands sliding down to the narrow dip of her waist. Above and below, generous curves complete the silhouette she's been chasing. She bites her lip, fighting back a grin \u2014 and losing."
        }
    },

    amazon: {
        name: "Amazon",
        description: "Powerful warrior physique with commanding presence",
        targets: { chest: [2, 3], muscle: [5, 5], butt: [3, 4], genitaliaSize: [2, 3] },
        flavorText: {
            celebration: "She rolls her shoulders and the muscles across her back ripple visibly beneath her clothes. She clenches a fist, watching the tendons flex, then lets out a low, satisfied breath. She's never felt this strong \u2014 this dangerous \u2014 and the thrill of it lights up her eyes."
        }
    },

    bombshell: {
        name: "Bombshell",
        description: "Top-heavy stunner with a slim frame",
        targets: { chest: [5, 5], muscle: [0, 1], butt: [2, 3], genitaliaSize: [3, 3] },
        flavorText: {
            celebration: "She straightens up and the weight shifts forward, heavy and impossible to ignore. Her slim frame makes it all the more dramatic \u2014 a figure that demands a second look. She adjusts her top with a smirk, like she knows exactly what she's doing."
        }
    },

    bootylicious: {
        name: "Bootylicious",
        description: "Pear-shaped with emphasis on the rear",
        targets: { chest: [1, 2], muscle: [1, 2], butt: [5, 5], genitaliaSize: [3, 3] },
        flavorText: {
            celebration: "She turns to check over her shoulder and her eyes go wide at what she finds. She gives an experimental sway and watches it move, her cheeks flushing with delight. Every step from now on is going to make a statement."
        }
    },

    goddess: {
        name: "Goddess",
        description: "The ultimate form - maximum in every dimension",
        targets: { chest: [5, 5], muscle: [5, 5], butt: [5, 5], genitaliaSize: [3, 3] },
        flavorText: {
            celebration: "She stands utterly still, overwhelmed. Every inch of her body hums with impossible fullness \u2014 massive, powerful, absurdly voluptuous. A shudder runs through her and her knees nearly buckle. She's never felt anything this intense in her entire life."
        }
    },

    petite: {
        name: "Petite",
        description: "Delicate, elfin figure",
        targets: { chest: [0, 1], muscle: [0, 1], butt: [0, 2], genitaliaSize: [0, 1] },
        flavorText: {
            celebration: "She looks down at herself and a quiet smile spreads across her face. Everything about her feels light and clean, like a drawing made with a single fine line. She moves her hand and marvels at how delicate her own wrist looks."
        }
    },

    statuesque: {
        name: "Statuesque",
        description: "Elegant, balanced proportions like a classical sculpture",
        targets: { chest: [4, 4], muscle: [3, 3], butt: [3, 3] },
        flavorText: {
            celebration: "She stands tall and something about the proportions just clicks \u2014 chest, waist, hips, the tone of her arms \u2014 every line flowing into the next. She looks like she was carved rather than born. She holds the pose, savoring it."
        }
    }
};

// Archetype weights by NPC â€” weighted random selection. Higher = more likely.
// Any NPC can roll any archetype; weights just reflect personality preference.
const NPC_ARCHETYPE_WEIGHTS = {
    mira:           { hourglass: 30, amazon: 20, bombshell: 15, bootylicious: 10, petite: 5, statuesque: 15 },
    vessa:          { hourglass: 15, amazon: 10, bombshell: 5, bootylicious: 5, petite: 35, statuesque: 25 },
    barret:         { hourglass: 30, amazon: 20, bombshell: 15, bootylicious: 20, petite: 2, statuesque: 5 },
    della:          { hourglass: 20, amazon: 5, bombshell: 5, bootylicious: 35, petite: 5, statuesque: 15 },
    fiona:          { hourglass: 10, amazon: 10, bombshell: 5, bootylicious: 5, petite: 35, statuesque: 25 },
    lenna:          { hourglass: 15, amazon: 5, bombshell: 10, bootylicious: 10, petite: 40, statuesque: 15 },
    mrs_thornwick:  { hourglass: 15, amazon: 10, bombshell: 5, bootylicious: 5, petite: 5, statuesque: 45 },
    aldric:         { hourglass: 10, amazon: 40, bombshell: 5, bootylicious: 5, petite: 2, statuesque: 20 },
    corwin:         { hourglass: 20, amazon: 10, bombshell: 20, bootylicious: 15, petite: 5, statuesque: 20 },
    holt:           { hourglass: 10, amazon: 45, bombshell: 5, bootylicious: 5, petite: 2, statuesque: 15 }
};

// ==========================================
// ARCHETYPE SUGGESTION SYSTEM
// ==========================================
// Player can suggest an archetype to an NPC when trust is 20+ above flirt threshold

// All 7 archetypes are suggestable (goddess included per design decision)
const SUGGESTABLE_ARCHETYPES = [
    'hourglass', 'amazon', 'bombshell', 'bootylicious',
    'goddess', 'petite', 'statuesque'
];

// Check if player can suggest an archetype to this NPC
function canSuggestArchetype(npcId) {
    if (npcId === 'mira') return false;
    const trust = gameState.npcs[npcId]?.trust || 0;
    const thresholds = getNpcTrustThresholds(npcId);
    return trust >= thresholds.flirt + 20;
}

// Check if NPC's stats match an archetype's targets
// All targets are [min, max] ranges
function doesNpcMatchArchetype(npcId, archetypeId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return false;

    const archetype = BODY_ARCHETYPES[archetypeId];
    if (!archetype) return false;

    for (const stat of Object.keys(archetype.targets)) {
        const target = archetype.targets[stat];
        const npcValue = npc.body[stat];

        // Target is [min, max] range
        if (Array.isArray(target)) {
            if (npcValue < target[0] || npcValue > target[1]) return false;
        } else {
            if (npcValue !== target) return false;
        }
    }
    return true;
}

// Get archetypes available for suggestion (ones NPC doesn't already match)
function getAvailableArchetypesForSuggestion(npcId) {
    return SUGGESTABLE_ARCHETYPES.filter(archId => !doesNpcMatchArchetype(npcId, archId));
}

// Check if NPC's stat matches an archetype's target range for that stat
function doesNpcMatchArchetypeStat(npcId, archetypeId, stat) {
    const npc = gameState.npcs[npcId];
    if (!npc) return false;

    const archetype = BODY_ARCHETYPES[archetypeId];
    if (!archetype || !archetype.targets[stat]) return false;

    const target = archetype.targets[stat];
    const npcValue = npc.body[stat];

    if (Array.isArray(target)) {
        return npcValue >= target[0] && npcValue <= target[1];
    }
    return npcValue === target;
}

// Get body parts available for starting the archetype (ones NPC doesn't already match)
function getAvailableBodyPartsForArchetype(npcId, archetypeId) {
    const archetype = BODY_ARCHETYPES[archetypeId];
    if (!archetype) return [];

    const stats = Object.keys(archetype.targets);
    return stats.filter(stat => !doesNpcMatchArchetypeStat(npcId, archetypeId, stat));
}

// ==========================================
// HIDDEN ARCHETYPE CORE LOGIC
// ==========================================

// Assign a hidden archetype to an NPC via weighted random selection
function assignHiddenArchetype(npcId) {
    const weights = NPC_ARCHETYPE_WEIGHTS[npcId];
    if (!weights) return null;

    const npc = gameState.npcs[npcId];
    if (!npc) return null;

    // Build weighted pool, excluding archetypes the NPC already matches
    const candidates = [];
    let totalWeight = 0;
    for (const archId of Object.keys(weights)) {
        if (doesNpcMatchArchetype(npcId, archId)) continue;
        // Also skip the most recently completed archetype to encourage variety
        const lastCompleted = npc.archetypeHistory?.[npc.archetypeHistory.length - 1];
        if (lastCompleted && lastCompleted.id === archId) continue;
        candidates.push({ id: archId, weight: weights[archId] });
        totalWeight += weights[archId];
    }

    if (candidates.length === 0 || totalWeight === 0) return null;

    // Weighted random selection
    let roll = Math.random() * totalWeight;
    for (const c of candidates) {
        roll -= c.weight;
        if (roll <= 0) {
            npc.hiddenArchetype = c.id;
            npc.archetypeAchieved = false;
            npc.archetypeAchievedDay = null;
            npc.archetypeSatisfactionEnd = null;
            npc.archetypeJustAchieved = false;
            saveState();
            return c.id;
        }
    }

    // Fallback (shouldn't happen)
    const fallback = candidates[candidates.length - 1].id;
    npc.hiddenArchetype = fallback;
    saveState();
    return fallback;
}

// Calculate gaps between NPC's current stats and their hidden archetype targets
// Returns [{stat, gap, direction, targetValue}] sorted by gap descending
// Only includes stats not already in the archetype's target range
function calculateArchetypeGaps(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc || !npc.hiddenArchetype) return [];

    const archetype = BODY_ARCHETYPES[npc.hiddenArchetype];
    if (!archetype) return [];

    const gaps = [];

    for (const stat of Object.keys(archetype.targets)) {
        const target = archetype.targets[stat]; // [min, max]
        const currentValue = npc.body[stat];

        // Skip if already in range
        if (Array.isArray(target)) {
            if (currentValue >= target[0] && currentValue <= target[1]) continue;

            // Calculate gap and direction
            if (currentValue < target[0]) {
                gaps.push({
                    stat,
                    gap: target[0] - currentValue,
                    direction: 'increase',
                    targetValue: target[0] // Aim for minimum of range
                });
            } else if (currentValue > target[1]) {
                gaps.push({
                    stat,
                    gap: currentValue - target[1],
                    direction: 'decrease',
                    targetValue: target[1] // Aim for maximum of range
                });
            }
        }
    }

    // Sort by gap descending (biggest gap first)
    gaps.sort((a, b) => b.gap - a.gap);
    return gaps;
}

// Check if NPC has achieved their hidden archetype (all target stats in range)
function checkArchetypeAchieved(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc || !npc.hiddenArchetype) return false;
    return doesNpcMatchArchetype(npcId, npc.hiddenArchetype);
}

// Handle archetype achievement â€” set flags, schedule satisfaction period
function handleArchetypeAchievement(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return;

    npc.archetypeAchieved = true;
    npc.archetypeAchievedDay = gameState.day;
    npc.archetypeJustAchieved = true; // For celebration dialogue

    // Allow one-time intimate encounter to advance tier, even below intimate trust
    if (!npc.sexUnlocked) {
        npc.archetypeIntimateReady = true;
    }

    // 10-20 day satisfaction rest period
    const restDays = 10 + Math.floor(Math.random() * 11);
    npc.archetypeSatisfactionEnd = gameState.day + restDays;

    saveState();
}

// Apply archetype suggestion - overrides current hidden archetype and generates first gap-based desire
function applyArchetypeSuggestion(npcId, archetypeId, startingStat) {
    const npc = gameState.npcs[npcId];
    if (!npc) return false;

    const archetype = BODY_ARCHETYPES[archetypeId];
    if (!archetype) return false;

    // Override hidden archetype (clears any previous)
    npc.hiddenArchetype = archetypeId;
    npc.archetypeAchieved = false;
    npc.archetypeAchievedDay = null;
    npc.archetypeSatisfactionEnd = null;
    npc.archetypeJustAchieved = false;
    // If player suggests goddess, skip reveal scene (player already knows)
    if (archetypeId === 'goddess') {
        npc.goddessRevealed = true;
    }

    // Get target value for the starting stat
    const target = archetype.targets[startingStat];
    const currentValue = npc.body[startingStat];
    let targetValue;
    if (Array.isArray(target)) {
        targetValue = currentValue < target[0] ? target[0] : target[1];
    } else {
        targetValue = target;
    }

    // Find a jealousy target for framing
    const comparedTo = findJealousyTarget(npcId, startingStat, targetValue);

    const direction = targetValue > currentValue ? 'increase' : 'decrease';
    npc.currentDesire = {
        stat: startingStat,
        target: targetValue,
        direction: direction,
        label: getDesireLabel(startingStat, direction),
        originalValue: currentValue,
        isArchetypeDriven: true,
        comparedTo: comparedTo,
        generatedDay: gameState.day
    };

    npc.desireGeneratedDay = gameState.day;
    npc.desireFulfilledDay = null;
    npc.satisfactionEndDay = null;
    npc.desireKnownToPlayer = true; // Player suggested it

    saveState();
    return true;
}

// NPC dialogue when player suggests an archetype (initial response)
const ARCHETYPE_SUGGESTION_INITIAL_DIALOGUE = {
    mira: `Mira's green eyes light up with curiosity, her whole face brightening at the suggestion.

"Ooh, you have an idea for how I should look?" She claps her hands together excitedly. "I'm always up for trying something new! What did you have in mind?"`,

    vessa: `Vessa tilts her head, her dark hair falling like a curtain as a knowing smile plays on her pale lips.

"You wish to shape me?" Her violet eyes gleam with intrigue. "How... fascinating. Tell me what form you envision for this vessel."`,

    barret: `Barret's warm grin spreads wide across her face as she leans in, red curls bouncing.

"Oh ho! You want to play sculptor with me?" She gestures at herself invitingly. "I like where this is going! What's your vision, artist?"`,

    della: `Della's cheeks flush pink as she fans herself with a flour-dusted hand.

"Oh my! You want to... redesign me? At my age?" She giggles like a much younger woman, brown eyes twinkling. "Well, what did you have in mind, dear?"`,

    fiona: `Fiona looks uncertain but intrigued, her hazel eyes searching your face for any sign of mockery.

"You... you have a plan for me? Like, a whole look?" She fidgets with the hem of her patched shirt. "What kind of look?"`,

    lenna: `Lenna adjusts her reading glasses, clearly fascinated by the methodical approach.

"A comprehensive transformation plan? That's... quite thorough." She pulls out her ever-present notebook, pen poised. "What parameters are you proposing?"`,

    mrs_thornwick: `Mrs. Thornwick raises an elegant eyebrow, her dignified composure masking obvious interest.

"You wish to suggest a... complete aesthetic direction for me?" She considers this carefully, smoothing her mayoral sash. "Very well. What do you propose?"`,

    aldric: `Aldric crosses his muscular arms, curious despite his usual stoic demeanor.

"You've got a whole plan for how I should look?" He rubs his stubbled chin thoughtfully. "Alright, I'm listening. What're you thinking?"`,

    corwin: `Corwin's dark eyes sharpen with mercantile interest, his charming smile widening.

"A complete makeover package?" He strokes his well-groomed goatee. "Now that's an interesting proposition. What's the pitch?"`,

    holt: `Holt straightens to full attention, taking the suggestion with military seriousness.

"A transformation objective?" His steel-grey eyes focus intently. "Give me the parameters and I'll... consider them carefully."`
};

// NPC dialogue when accepting an archetype
const ARCHETYPE_SUGGESTION_ACCEPT_DIALOGUE = {
    mira: {
        bombshell: `Mira's green eyes go wide and she bounces on her heels with barely contained excitement.

"Top-heavy with a slim frame? Oh wow, that sounds fun!" She glances down at herself, imagining the change. "I'd definitely turn heads on my delivery route. Maybe finally get some respect from the merchants!"`,

        bootylicious: `Mira grins and does a little spin, already picturing herself.

"All curves down below? Ooh, I could really work that!" She sways her hips experimentally. "Imagine the sway when I walk through the market. Everyone would notice me coming!"`,

        hourglass: `Mira practically squeals, her freckled cheeks flushing with excitement.

"Maximum curves everywhere?! Yes!" She throws her arms wide. "Make me impossible to ignore! I've spent my whole life being the small courier girl. Time for that to change!"`,

        amazon: `Mira's eyes light up with a fierce gleam.

"A warrior goddess? Strong and powerful?" She flexes her slim arms experimentally. "I love it! No more struggling with heavy packages. Let's do this!"`,

        petite: `Mira tilts her head, considering the unusual suggestion.

"Small and delicate? That's... different from what I usually want." She chews her lip thoughtfully. "But you know what? I trust you! Might be nice to be dainty for once."`,

        goddess: `Mira's jaw drops and she goes completely still for three whole seconds \u2014 a personal record.

"Everything? EVERYTHING at maximum?" Her voice climbs with each word. "Boss, that's \u2014 that's the ultimate! Maximum chest, maximum muscle, maximum butt, maximum \u2014 EVERYTHING!" She grabs your hands and bounces, her whole body vibrating with excitement. "I'd be unstoppable! I'd be a GOD! Do you really think I can get there?" Her eyes are enormous, desperate, already imagining it. "Let's START. Right now. Immediately. Yesterday."`,

    },
    vessa: {
        bombshell: `Vessa's violet eyes gleam with quiet intrigue as she traces a finger along her collarbone.

"An ethereal top-heavy form?" Her knowing smile deepens. "There's a certain mystique to that aesthetic. I accept your vision."`,

        bootylicious: `Vessa tilts her head, considering the ancient symbolism.

"Emphasis below... like certain fertility symbols I've studied." She runs a hand over her hip. "Interesting choice. The old texts speak of such forms with reverence."`,

        hourglass: `Vessa's pale features flush with rare excitement.

"The ultimate hourglass?" She draws the shape in the air with her fingers. "Ambitious. I appreciate ambition. Let us see how far we can push the boundaries of form."`,

        amazon: `Vessa raises an elegant eyebrow, genuinely surprised.

"A powerful warrior's form?" She flexes her slender fingers. "Unexpected, but I see the appeal. Strength has its own kind of magic."`,

        petite: `A genuine smile crosses Vessa's angular features.

"Delicate and small?" She pulls her dark cloak closer. "Yes... that suits my aesthetic perfectly. To be overlooked until I choose to be seen."`,

        goddess: `Vessa's violet eyes flare with an intensity you've never seen, her usual dreamy affect burned away entirely.

"The goddess form." Her voice is barely above a whisper but it fills the room. "Maximum in every dimension. I have studied transcendence my entire life \u2014 the spirits speak of it, the old texts describe it, but no one has ever achieved it through flesh alone." She steps closer, her pale features flushed. "You're offering me the chance to become something the ancients only theorized about. The answer is yes. The answer has always been yes."`,

    },
    barret: {
        bombshell: `Barret throws her head back and laughs, her red curls bouncing.

"All up top with a slim waist?" She gestures dramatically at her chest. "The patrons won't know where to look! Ha! Tips would go through the roof!"`,

        bootylicious: `Barret grins and gives her hips an experimental shake.

"Big behind, smaller up top? Oh, I can work with that!" She winks. "More hip swaying when I'm carrying drinks. The regulars will love it!"`,

        hourglass: `Barret's eyes go wide with delight, clapping her hands together.

"Maximum everything?! Now you're speaking my language!" She spreads her arms wide. "Let's get extreme! This tavern's about to get a lot more interesting!"`,

        amazon: `Barret cracks her knuckles with a mischievous grin.

"Strong and powerful?" She glances at a rowdy table in the corner. "I'd love to arm-wrestle the regulars! Toss out troublemakers myself! Let's go!"`,

        petite: `Barret pauses, looking genuinely surprised for once.

"Petite? That's... not usually my style." She taps her chin, then shrugs with a laugh. "But hey, I'm game for anything! Variety keeps things interesting!"`,

        goddess: `Barret slams her palms on the bar, rattling every glass, her brown eyes wild with hunger.

"Everything maxed out? EVERYTHING?!" She vaults over the bar and grabs your shoulders. "Do you have any idea how long I've wanted someone to say that to me? I've watched every woman in this town get bigger, stronger, curvier \u2014 I want ALL of it! The biggest chest, the most muscle, the fattest arse, the works! I want to walk into my own tavern and have the whole room go SILENT!" She's shaking with excitement. "Let's make me a goddess. No half measures. Not this time."`,

    },
    della: {
        bombshell: `Della presses a flour-dusted hand to her chest, her cheeks going pink.

"Oh my! Top-heavy? At my age?" She giggles like a much younger woman, brown eyes twinkling. "Well, why not! My husband always said I should have been bolder. Rest his soul."`,

        bootylicious: `Della fans herself with her apron, looking flustered but pleased.

"More in the rear? Oh dear..." Her voice drops to a whisper. "That does sound nice... I always did admire those Renaissance paintings. The women looked so... comfortable."`,

        hourglass: `Della gasps, hand flying to her mouth.

"Maximum curves everywhere? Goodness gracious!" She looks around as if checking for eavesdroppers, then leans in conspiratorially. "But... yes, let's try it! I'm tired of being sensible!"`,

        amazon: `Della blinks in surprise, then bursts into warm laughter.

"Strong like a warrior? Me?" She flexes her arms, still soft from decades of kneading. "That's certainly different! But think of how much dough I could work! I'm intrigued!"`,

        petite: `Della considers the idea, absently wiping flour from her hands.

"Small and delicate? Oh, that would be quite a change from my current shape!" She looks down at herself. "Interesting... like a fresh start. Why not?"`,

        goddess: `Della's flour-dusted hands fly to her mouth and her warm brown eyes go perfectly round.

"Everything? At maximum?" Her voice drops to a scandalized whisper. "That's \u2014 oh my \u2014 that's the most indulgent thing I've ever heard." She fans herself with her apron, cheeks blazing. "My late husband would have fainted. I might faint." But her eyes are shining and she's already nodding. "Oh, who am I fooling \u2014 I've spent fifty years being sensible and moderate about everything. For once in my life I want to be EXCESSIVE. Yes. Yes, please. All of it."`,

    },
    fiona: {
        bombshell: `Fiona's hazel eyes go wide, a deep blush spreading across her dirt-smudged cheeks.

"Big up top, slim everywhere else?" She wraps her arms protectively around herself. "That's... bold..." Her voice drops to barely a whisper. "But maybe people would look at those instead of... the rest of me."`,

        bootylicious: `Fiona looks down at her thin frame, something hopeful flickering in her expression.

"More curves down below?" She shifts her weight nervously. "I... I could see that. Less attention on my face. On my past." She nods slowly. "Yeah. I'd like that."`,

        hourglass: `Fiona's eyes go round as saucers.

"Maximum everything?" Her voice cracks. "That's... a lot." She takes a shaky breath, then squares her narrow shoulders. "But okay... if you think I can handle it. No one would recognize me."`,

        amazon: `Something fierce flashes in Fiona's wary eyes.

"Strong and powerful?" Her hands curl into fists at her sides. "So no one could push me around again? So I'd never have to run or hide?" Her jaw sets with determination. "...Yes."`,

        petite: `Fiona looks down at her scrawny frame with a complicated expression.

"Small and delicate? I'm already kind of..." She trails off, thinking. "But like, refined small? Cute small instead of just... underfed?" She nods cautiously. "Okay. That's different."`,

        goddess: `Fiona goes very still. Her hazel eyes fix on yours with an intensity that burns through every layer of wariness.

"Everything. Maximum everything." Her voice is flat, almost dangerous. "You're saying I could be the biggest, the strongest, the most \u2014" She swallows hard and her tough facade cracks, revealing something raw underneath. "No one would ever push me around again. No one would ever look through me. I'd take up more space than anyone in this entire town." Her hands are shaking. Her jaw sets. "Do it. I don't care how long it takes. I want all of it."`,

    },
    lenna: {
        bombshell: `Lenna adjusts her reading glasses and pulls out a small notebook, already scribbling.

"Top-heavy configuration?" She sketches a quick diagram. "Interesting biomechanics... the stress on the spine, the changes to center of gravity..." She looks up, blushing. "I mean, yes. Let's proceed."`,

        bootylicious: `Lenna nods thoughtfully, tapping her quill against her chin.

"Lower body emphasis?" She flips through her mental catalog. "I've read about that aesthetic in the Ancient Veltran beauty texts. The mathematics of proportion are fascinating."`,

        hourglass: `Lenna's grey eyes widen behind her glasses as she mentally calculates.

"Maximum proportions in both directions?" She traces equations in the air. "Structurally ambitious! The engineering required to maintain such a form... I must document this!"`,

        amazon: `Lenna looks up from her books, genuinely intrigued.

"Athletic warrior build?" Her voice takes on a dreamy quality. "Like the ancient heroes in the epic poems. Athena made flesh..." She blushes deeply. "I-I mean, the research possibilities..."`,

        petite: `Lenna sets down her heavy tome with a soft smile.

"Petite form factor?" She pushes her glasses up. "That does appeal to me, actually. Small enough to fit in the reading nooks. Light enough for the rolling ladders. Yes."`,

        goddess: `Lenna drops the book she's holding. She doesn't pick it up. Her grey eyes go wide behind her glasses and her lips move soundlessly for several seconds before words come.

"Every parameter at maximum? Simultaneously?" She pulls out her notebook with trembling hands. "The structural implications alone \u2014 the biological impossibility of \u2014 the SENSATION must be \u2014" She stops writing, pen hovering, and looks up at you. Her academic mask slips and underneath is naked, desperate want. "I've spent my whole life reading about extraordinary things. I want to BE one. Yes. Please. Every dimension. I want to know what it feels like."`,

    },
    mrs_thornwick: {
        bombshell: `Mrs. Thornwick considers the suggestion with practiced political neutrality, though a subtle flush colors her cheeks.

"An... emphatic upper silhouette?" She smooths her mayoral sash. "Dignified, yet bold. Acceptable. A leader should command attention."`,

        bootylicious: `Mrs. Thornwick nods slowly, her dignified composure barely concealing her interest.

"Emphasis on the lower figure?" She straightens her posture. "That has its elegance. The classical statues in the town hall feature such proportions. Timeless."`,

        hourglass: `Mrs. Thornwick's practiced composure slips just slightly, her blue eyes bright with suppressed excitement.

"Maximum feminine proportions?" She stands taller, chin raised. "A mayor should be memorable. Unforgettable, even. This would certainly achieve that."`,

        amazon: `Mrs. Thornwick's expression sharpens with approval.

"A powerful, commanding presence?" She clasps her hands behind her back like a general. "That suits my station. One should look the part of authority. I accept."`,

        petite: `Mrs. Thornwick raises an eyebrow, considering the unexpected suggestion.

"A more delicate frame?" She taps her chin thoughtfully. "There's power in underestimation... people reveal themselves when they think you're harmless. Strategic."`,

        goddess: `Mrs. Thornwick's practiced composure doesn't just crack \u2014 it shatters. Her blue eyes blaze with a hunger she's kept locked away for decades.

"Everything at maximum." She says it like a decree, her mayoral voice ringing. Then quieter, almost to herself: "I have been dignified. I have been moderate. I have been a pillar of this community." She stands, straightening her sash with trembling fingers. "And I am done. I want to be so overwhelming that the concept of propriety becomes irrelevant. Maximum everything. Let the town council take minutes on THAT."`,

    },
    aldric: {
        bombshell: `Aldric scratches his stubbled jaw, soot-marked fingers leaving a trail.

"Top-heavy, slim frame?" He looks down at his broad, stocky build with a grunt. "That's quite a change from the forge body. But alright. If that's your vision, I'll trust it."`,

        bootylicious: `Aldric shrugs his massive shoulders, surprisingly unbothered.

"Curves below?" He wipes his hands on his leather apron. "Different, but I trust your judgment. Spent forty years looking one way. Might as well try something new."`,

        hourglass: `Aldric lets out a gruff chuckle, crossing his muscular arms.

"Maximum curves?" He shakes his head with a grin. "Go big or go home, right? That's how I approach the forge. Why not this too?"`,

        amazon: `Aldric's stern face breaks into a genuine smile.

"Strong and powerful? Now that I understand." He nods firmly, cracking his knuckles. "Keep the strength, add some curves. Let's do it. Finally, something that makes sense."`,

        petite: `Aldric raises a bushy eyebrow, clearly surprised.

"Small and delicate?" He looks at his calloused hands. "That's... unexpected. But okay. Been the big one my whole life. Might be interesting to see the world differently."`,

        goddess: `Aldric goes quiet. She stares at her calloused hands for a long time, flexing them open and closed.

"Everything at maximum." Her gruff voice is rough with something that isn't anger. "Biggest muscles, biggest chest, biggest arse, the works." She looks up and her brown eyes are fierce. "I spent forty years being the biggest man in this town. If I'm going to be a woman \u2014 and I am \u2014 then I'm going to be the biggest woman anyone has ever seen. I don't do things by halves. Never have." She cracks her knuckles. "Let's go."`,

    },
    corwin: {
        bombshell: `Corwin's merchant instincts kick in immediately, his charming smile widening.

"Top-heavy aesthetic?" He strokes his well-groomed goatee. "That's certainly marketable. Eye-catching. Memorable. I'm in. Good investment."`,

        bootylicious: `Corwin considers the proposition like a business deal.

"Lower emphasis?" He taps his chin with a ringed finger. "There's a market for everything. And variety keeps clients interested. Deal."`,

        hourglass: `Corwin throws his head back with a delighted laugh.

"Maximum impact?" His dark eyes sparkle with enthusiasm. "Go big or go home! I love it! When I walk into negotiations, I want them too distracted to bargain properly!"`,

        amazon: `Corwin nods thoughtfully, seeing the tactical advantage.

"Strong and imposing?" He straightens his colorful traveling coat. "Intimidation is good for negotiations. And no one tries to shortchange someone who looks like they could break them. Smart."`,

        petite: `Corwin pauses, calculating possibilities.

"Petite and delicate?" He thinks it through. "Unassuming... useful in its way. People underestimate the small. I've made fortunes off being underestimated. Agreed."`,

        goddess: `Corwin's calculating mask drops completely. For the first time, you see genuine, uncalculated desire in her dark eyes.

"Maximum everything?" She whispers it like a business secret too valuable to say aloud. Then louder, unable to contain it: "Do you know what that's worth? You can't buy that. You can't trade for it. The biggest, strongest, most impossibly voluptuous body in existence?" She runs both hands through her dark hair, trembling. "I've spent my life putting price tags on everything. This is beyond price. This is \u2014" She grabs your arm. "Yes. Whatever it takes. Every last coin, every favor, anything. Make me a goddess."`,

    },
    holt: {
        bombshell: `Holt stands at attention, processing the directive with military precision.

"Upper body emphasis?" He squares his broad shoulders. "Understood. Proceeding with objective." A slight tremor in his voice betrays his excitement beneath the discipline.`,

        bootylicious: `Holt gives a single sharp nod.

"Lower body focus?" He clasps his hands behind his back. "Acknowledged. Ready to comply." His steel-grey eyes hold something almost eager beneath the stoic mask.`,

        hourglass: `Holt takes a deep breath, his disciplined facade cracking just slightly.

"Maximum proportions?" His voice is steady but his pulse is visible at his throat. "That's... ambitious. But I'm ready. Orders accepted."`,

        amazon: `For the first time, Holt's stern face softens into a genuine smile.

"Warrior build?" His steel-grey eyes brighten. "Now that's a mission I understand. Strength I know. Just... a different kind. I'm ready, sir."`,

        petite: `Holt considers the tactical implications, his military mind adapting.

"Smaller frame?" He shifts his stance. "Less imposing but... more agile. Tactical advantages. Different approach to protection. Acknowledged."`,

        goddess: `Holt stands at rigid attention. For ten full seconds, she says nothing. Then something behind her steel-grey eyes breaks open.

"Maximum. All parameters. Maximum." Her clipped military cadence fractures with each word. "I have spent my entire life operating at regulation standard. Controlled. Contained. Measured." Her hands form fists at her sides and her voice drops. "I want to know what it feels like to be beyond all measurement. Beyond regulation. Beyond containment." She swallows hard. "That's not a request. That's..." She searches for the word, and when she finds it, her voice is barely audible: "A need."`,

    }
};

// NPC dialogue asking which body part to start with
const ARCHETYPE_BODYPART_DIALOGUE = {
    mira: `Mira practically vibrates with anticipation, her green eyes darting between different parts of herself.

"So where do we start?" She tugs at her courier vest. "Which part of me should we work on first? I want to see the changes already!"`,

    vessa: `Vessa's violet eyes gleam with scientific curiosity as she considers the question.

"Which aspect of my form shall we address first?" She traces a hand along her silhouette. "Each transformation is a new variable to explore."`,

    barret: `Barret plants her hands on her hips and grins, presenting herself like a canvas.

"Alright, where do you want to start sculpting?" She turns slightly. "Pick your first target! I'm ready for anything!"`,

    della: `Della clasps her flour-dusted hands together, a mix of nervousness and excitement on her kind face.

"Oh my, so many changes ahead!" She looks down at herself with wonder. "Where should we begin, dear? I trust your judgment."`,

    fiona: `Fiona shifts her weight from foot to foot, hugging herself protectively despite her eagerness.

"S-so... what do we change first?" Her voice is barely above a whisper. "I'm ready. I think. Just... tell me where to stand."`,

    lenna: `Lenna pushes up her reading glasses and pulls out her notebook, pen poised.

"Logically, we should prioritize one variable." She taps the pen against her chin. "Which stat do we modify first? I want to document the sequence."`,

    mrs_thornwick: `Mrs. Thornwick straightens her mayoral sash and assumes a dignified pose.

"Very well. Which element of my figure shall we address initially?" She lifts her chin. "I trust you'll proceed with appropriate... discretion."`,

    aldric: `Aldric cracks his knuckles and settles into a ready stance, treating this like another job at the forge.

"Right then. Where do we start this transformation?" He squares his broad shoulders. "Point me at the first step and I'll see it through."`,

    corwin: `Corwin rubs his hands together like he's about to close a particularly exciting deal.

"So what's the first item on the agenda?" He checks his reflection in a polished button. "Where do we begin this renovation project?"`,

    holt: `Holt snaps to attention, treating the question like a mission briefing.

"Orders received." He stands perfectly still, awaiting direction. "Which objective do we tackle first? I await your command."`
};

// Get stat display name for body part selection
function getStatDisplayNameForArchetype(stat, npcId) {
    if (stat === 'genitaliaSize' && npcId) {
        const g = gameState.npcs[npcId]?.body?.genitalia;
        return g === 1 ? 'Penis size' : 'Vagina size';
    }
    if (stat === 'genitalia' && npcId) {
        const g = gameState.npcs[npcId]?.body?.genitalia;
        return g === 1 ? 'Penis' : 'Vagina';
    }
    const names = {
        chest: 'Chest',
        butt: 'Rear',
        muscle: 'Muscle',
        genitaliaSize: 'Size',
        genitalia: 'Genitalia'
    };
    return names[stat] || stat;
}

// ==========================================
// SATISFACTION PERIOD DIALOGUE
// ==========================================

const SATISFACTION_TEXTS = {
    mira: [
        "She strikes a confident pose. \"I love how I look right now!\"",
        "\"This body is perfect. Well, for now anyway!\"",
        "She admires herself. \"Yep. Still exactly what I wanted.\"",
        "\"No complaints here! I'm feeling great about myself.\""
    ],
    vessa: [
        "Her violet eyes gleam with contentment. \"My form feels... balanced. Complete.\"",
        "\"The spirits whisper approval. I am at peace with this body.\"",
        "She moves gracefully. \"Every proportion feels intentional now.\"",
        "\"I need no changes. Not yet. Let me savor this form.\""
    ],
    barret: [
        "\"Tips have never been better. I'm in a good place, sweetie.\"",
        "She stretches contentedly. \"I feel great, honestly.\"",
        "\"No changes needed right now. I'm loving every curve.\"",
        "She winks. \"Everything is exactly where it should be.\""
    ],
    della: [
        "\"I feel comfortable in my own skin, dear. It's a lovely feeling.\"",
        "She pats her apron. \"Everything fits just right these days.\"",
        "\"No complaints from me. My body feels like home again.\"",
        "She smiles warmly. \"I'm content. Truly content.\""
    ],
    fiona: [
        "She stands a little taller. \"I'm... good. For once, I'm actually good.\"",
        "\"Nothing needs fixing. That's weird to say, but it's true.\"",
        "A rare smile. \"I don't hate what I see in the mirror anymore.\"",
        "\"I'm okay. More than okay, actually.\""
    ],
    lenna: [
        "She adjusts her glasses, blushing slightly. \"I'm... happy with myself. Is that strange to say?\"",
        "\"The heroines in my books always know who they are. I think I finally do too.\"",
        "She hugs a book to her chest. \"No changes needed. I feel like myself.\"",
        "\"I look in the mirror now and I recognize who I am.\""
    ],
    mrs_thornwick: [
        "She stands with dignified poise. \"I am quite satisfied with my current... presentation.\"",
        "\"No alterations required. Everything is as it should be.\"",
        "A subtle smile. \"I feel appropriately... composed.\"",
        "\"My appearance requires no adjustment at this time.\""
    ],
    aldric: [
        "He grunts. \"Body works fine. No need to change anything.\"",
        "\"I'm strong enough for the forge. That's what matters.\"",
        "He flexes absently. \"Everything's where it should be.\"",
        "\"No complaints. Body does what I need it to do.\""
    ],
    corwin: [
        "He adjusts his fine coat. \"Business is good, body is good. All is well.\"",
        "\"I'm quite pleased with my current marketable appearance.\"",
        "A merchant's smile. \"No need to change a winning formula.\"",
        "\"Customers are responding well. I see no reason for alterations.\""
    ],
    holt: [
        "His expression remains stoic. \"I am at optimal condition.\"",
        "\"No changes required. Body is combat-ready.\"",
        "A curt nod. \"Everything functions as intended.\"",
        "\"My physical form requires no modification.\""
    ],
    generic: [
        "\"I'm happy with how I look right now.\"",
        "\"No changes needed at the moment.\"",
        "They seem content. \"Everything feels right.\"",
        "\"I'm satisfied for now.\""
    ]
};

function getContentmentText(npcId) {
    const texts = SATISFACTION_TEXTS[npcId] || SATISFACTION_TEXTS.generic;
    return texts[Math.floor(Math.random() * texts.length)];
}

// ==========================================
// WHIM DESIRE DIALOGUE
// ==========================================

const WHIM_REASONS = {
    maximize: {
        mira: [
            "\"I just want to go BIG. Maximum everything! Let's DO this!\"",
            "\"Why settle for medium when you can have MAXIMUM?!\"",
            "\"Go big or go home, right? I choose BIG!\""
        ],
        vessa: [
            "\"The spirits whisper of... abundance. I wish to experience it.\"",
            "\"What would it feel like to be as large as possible? I want to know.\"",
            "\"My body craves expansion. An experiment in extremes.\""
        ],
        barret: [
            "\"I'm feeling bold. Let's take it all the way, sweetie.\"",
            "\"Go big or go home, right? I choose big.\"",
            "\"Sometimes you just want to be MAGNIFICENT.\""
        ],
        della: [
            "\"I've been sensible my whole life. Maybe it's time to go all out, just once.\"",
            "\"What would it be like to be truly... impressive? Let me find out.\"",
            "\"At my age, why not? Let's see how big we can go.\""
        ],
        fiona: [
            "\"I'm tired of being small. I want to know what big feels like.\"",
            "\"Everyone always overlooked me. Not if I'm impossible to miss.\"",
            "\"Maximum. I want to try maximum. Just to see.\""
        ],
        lenna: [
            "\"In the stories, the heroines are always... substantial. I want to know what that feels like.\"",
            "\"I've read about transformations. I want to experience the extreme.\"",
            "\"What if I was... as big as possible? Just theoretically?\""
        ],
        mrs_thornwick: [
            "\"I've been proper my entire life. Perhaps it's time to be... impressive instead.\"",
            "\"Dignified is overrated. I want to command attention.\"",
            "\"Maximum. Yes. Let them see what the council leader is capable of.\""
        ],
        aldric: [
            "\"If I'm going to do this, I'm doing it right. Maximum.\"",
            "\"Halfhearted work is shoddy work. Let's go all the way.\"",
            "\"I don't do things by halves. Make it as big as it'll go.\""
        ],
        corwin: [
            "\"Maximum exposure means maximum profit. Take me to the limit.\"",
            "\"Why would I settle for less when I could have the most?\"",
            "\"The market rewards boldness. Make me unforgettable.\""
        ],
        holt: [
            "\"Maximum. There is no room for half-measures.\"",
            "\"If I am to change, I will change completely.\"",
            "\"Full commitment. Maximum intensity.\""
        ],
        generic: [
            "\"I want to try being really big. Just once.\"",
            "\"I'm curious what maximum would feel like.\""
        ]
    },

    minimize: {
        mira: [
            "\"Okay wild idea - what if I tried being TINY? Just for fun!\"",
            "\"I've been chasing bigger forever. What's smaller like?\"",
            "\"Plot twist! Let's try the opposite direction!\""
        ],
        vessa: [
            "\"I wonder what it's like to be almost nothing there. Pure spirit.\"",
            "\"To shed the physical... let me try being minimal.\"",
            "\"The spirits speak of lightness. I wish to experience it.\""
        ],
        barret: [
            "\"I've been busty for years. What if I tried... not?\"",
            "\"Complete opposite of what I've got. Just for the experience.\"",
            "\"Sometimes you need to go small to appreciate big again, sweetie.\""
        ],
        della: [
            "\"My back would thank me for being smaller, dear.\"",
            "\"Maybe life was simpler when I was less... noticeable.\"",
            "\"Let me try being petite. Just to see what it's like.\""
        ],
        fiona: [
            "\"I've always been small. But what if I was REALLY small?\"",
            "\"Smaller means faster. Harder to catch. That could be useful.\"",
            "\"Let's try minimal. See how it feels.\""
        ],
        lenna: [
            "\"Maybe if I were smaller, people would stop staring.\"",
            "\"I've always wondered what being truly petite would be like.\"",
            "\"Less to notice means less attention. That sounds... nice.\""
        ],
        mrs_thornwick: [
            "\"Perhaps a more modest presentation would be appropriate.\"",
            "\"Smaller might be more dignified. Let me try.\"",
            "\"Less is more, as they say. Let's test that theory.\""
        ],
        aldric: [
            "\"Less bulk might help with the detail work.\"",
            "\"Maybe smaller would be more practical for the forge.\"",
            "\"Let's try reducing. See if it helps.\""
        ],
        corwin: [
            "\"Perhaps a more subtle appearance would appeal to a different clientele.\"",
            "\"Less conspicuous might mean better deals. Let's try it.\"",
            "\"Minimal. A new market strategy.\""
        ],
        holt: [
            "\"Smaller target profile. Tactically advantageous.\"",
            "\"Less mass, more speed. Worth testing.\"",
            "\"Reduction. For efficiency.\""
        ],
        generic: [
            "\"I want to know what being small feels like.\"",
            "\"Less might be freeing. Let me try.\""
        ]
    },

    opposite: {
        mira: [
            "\"I'm always chasing one direction - what if the OTHER extreme is better?\"",
            "\"Plot twist time! Let's try the complete opposite!\"",
            "\"What if everything I thought I wanted was wrong? Only one way to find out!\""
        ],
        vessa: [
            "\"Balance requires understanding both extremes. Let me experience the other.\"",
            "\"I have known one end of the spectrum. Now I seek the other.\"",
            "\"Opposites inform each other. Transform me.\""
        ],
        barret: [
            "\"I've been this way forever. Time to flip the script, sweetie.\"",
            "\"What's the opposite of me? Let's find out.\"",
            "\"Variety is the spice of life. Give me the reverse.\""
        ],
        della: [
            "\"I wonder what the other extreme would be like, dear.\"",
            "\"Maybe I've had it backwards all along.\"",
            "\"Let me try the opposite. Just to know.\""
        ],
        fiona: [
            "\"Everything I've wanted... maybe the opposite is better.\"",
            "\"What if I've been wrong this whole time?\"",
            "\"Give me the reverse. I need to know.\""
        ],
        lenna: [
            "\"In stories, sometimes the hero realizes they wanted the opposite all along.\"",
            "\"What if my desires were inverted? I should test it.\"",
            "\"The opposite path. For research purposes.\""
        ],
        mrs_thornwick: [
            "\"Perhaps my assumptions have been incorrect. Let me test the alternative.\"",
            "\"The opposite of what I thought I wanted. Enlightening.\"",
            "\"I should explore the other extreme. For perspective.\""
        ],
        aldric: [
            "\"Maybe I've been forging in the wrong direction.\"",
            "\"The opposite approach. Worth testing.\"",
            "\"Let's try it the other way around.\""
        ],
        corwin: [
            "\"The market I've been targeting... perhaps the opposite is more profitable.\"",
            "\"Contrarian strategy. Give me the reverse.\"",
            "\"What if my instincts were backwards? Let's find out.\""
        ],
        holt: [
            "\"Perhaps my assumptions were flawed. Test the opposite.\"",
            "\"The reverse of my current state. For evaluation.\"",
            "\"Opposite direction. Reconnaissance.\""
        ],
        generic: [
            "\"I want to know what the other extreme feels like.\"",
            "\"What if I tried being completely different?\""
        ]
    },

    balanced: {
        mira: [
            "\"Okay maybe I've gone too extreme. Let's even things out a bit!\"",
            "\"Balance! That's a thing, right? Let's try it!\"",
            "\"What if moderation is actually the secret? Worth a shot!\""
        ],
        vessa: [
            "\"The spirits speak of equilibrium. Let me seek balance.\"",
            "\"Harmony requires moderation. Adjust me accordingly.\"",
            "\"Neither extreme. The middle path calls to me.\""
        ],
        barret: [
            "\"Maybe I've gone overboard. Let's find a happy medium, sweetie.\"",
            "\"Balanced might be nice for a change.\"",
            "\"Even things out a bit. See how it feels.\""
        ],
        della: [
            "\"A more balanced figure would be practical, dear.\"",
            "\"Maybe moderation is the answer after all.\"",
            "\"Let's even things out. My back will thank me.\""
        ],
        fiona: [
            "\"Not too big, not too small. Maybe just right exists.\"",
            "\"Balanced. Normal. What would that even feel like?\"",
            "\"Let's try average. I've never been average before.\""
        ],
        lenna: [
            "\"Perhaps proportional would be less... conspicuous.\"",
            "\"Balance. Like the perfectly structured narrative.\"",
            "\"Moderate everything. Even and controlled.\""
        ],
        mrs_thornwick: [
            "\"Balanced proportions are the height of dignity.\"",
            "\"Moderation in all things. Let me practice what I preach.\"",
            "\"A well-proportioned figure. As it should be.\""
        ],
        aldric: [
            "\"Balanced tools work best. Same for bodies, probably.\"",
            "\"Even distribution. Good for work.\"",
            "\"Let's even things out. More practical.\""
        ],
        corwin: [
            "\"A balanced appearance appeals to the broadest market.\"",
            "\"Moderate. Accessible. Smart business.\"",
            "\"Even me out. Mass appeal.\""
        ],
        holt: [
            "\"Balanced form. Optimal for varied combat situations.\"",
            "\"Neither extreme. Adaptable.\"",
            "\"Moderation. Tactical flexibility.\""
        ],
        generic: [
            "\"I think I'd like to be more proportional.\"",
            "\"Extremes are tiring. Let me try moderate.\""
        ]
    }
};

function getWhimReasonText(npcId, whimType) {
    const typeTexts = WHIM_REASONS[whimType];
    if (!typeTexts) return null;
    const npcTexts = typeTexts[npcId] || typeTexts.generic;
    return npcTexts[Math.floor(Math.random() * npcTexts.length)];
}

// ==========================================
// ARCHETYPE REVEAL DIALOGUE
// ==========================================

const ARCHETYPE_REVEAL_TEXTS = {
    mira: {
        hourglass: [
            "\"I've been thinking... why settle for big in ONE place? I want to be extreme EVERYWHERE! Huge chest, huge behind, tiny waist. The ultimate figure!\"",
            "\"You know what I want? The most ridiculous hourglass shape possible. Like, cartoon proportions. Can you do that?\""
        ],
        bombshell: [
            "\"Okay hear me out - what if I was ALL chest? Like, nothing else. Just maximum on top, minimum everywhere else. It'll be hilarious AND hot!\"",
            "\"I want to be top-heavy. REALLY top-heavy. Like I might fall over. Let's do it!\""
        ],
        amazon: [
            "\"I want to be POWERFUL. Not just curvy - strong. Muscles AND curves. The complete package!\"",
            "\"Make me an amazon! I want to look like I could pick someone up with one arm!\""
        ]
    },
    vessa: {
        petite: [
            "\"The spirits speak of lightness. Ethereal form. I wish to become small. Almost nothing. To float between worlds.\"",
            "\"What would it be like to be truly delicate? I wish to experience it. Make me small everywhere.\""
        ],
        hourglass: [
            "\"Even the spirits appreciate beauty. I wish to embody... abundance.\"",
            "\"Curves upon curves. The ultimate feminine form. I am curious.\""
        ]
    },
    barret: {
        hourglass: [
            "\"Sweetie, I want it ALL. Big chest, big behind, curves for days. Make jaws drop when I walk into the room.\"",
            "\"The ultimate figure. That's what I'm after. Impossible to ignore in EVERY direction.\""
        ],
        amazon: [
            "\"I'm tired of just being curvy. I want to be POWERFUL. Strong enough to throw out troublemakers myself.\"",
            "\"Make me an amazon. Curves AND muscle. The complete package.\""
        ]
    },
    della: {
        hourglass: [
            "\"At my age, why not go all out? Curves everywhere. Let them stare for once.\"",
            "\"The ultimate figure. I've been practical long enough.\""
        ],
        bootylicious: [
            "\"All my curves down below. That's what I want, dear. Top heavy just isn't me.\"",
            "\"Pear-shaped. That's the goal. Everything where I want it.\""
        ]
    },
    fiona: {
        petite: [
            "\"Small. Quick. Hard to catch. That's what I want to be.\"",
            "\"Tiny but nimble. Less of me to notice. More of me to slip away.\""
        ]
    },
    lenna: {
        petite: [
            "\"In some of the stories, the heroines are delicate. Ethereal. I think that might suit me.\"",
            "\"Small. Less noticeable. That sounds... nice, actually.\""
        ]
    },
    mrs_thornwick: {
    },
    aldric: {
        amazon: [
            "\"If I'm going to have this body, it's going to be STRONG. Warrior strength.\"",
            "\"Maximum muscle. That I understand. Let me be powerful.\""
        ]
    },
    corwin: {
        hourglass: [
            "\"Maximum marketability requires maximum... assets. In all directions.\"",
            "\"The ultimate figure. Customers won't be able to look away.\""
        ]
    },
    holt: {
        amazon: [
            "\"Combat effective. Maximum strength. That is the goal.\"",
            "\"A warrior's body. Powerful in every dimension.\""
        ]
    }
};

function getArchetypeRevealText(npcId, archetypeId) {
    const archetype = BODY_ARCHETYPES[archetypeId];
    const npcTexts = ARCHETYPE_REVEAL_TEXTS[npcId]?.[archetypeId];

    if (npcTexts) {
        return npcTexts[Math.floor(Math.random() * npcTexts.length)];
    }

    // Generic reveal using archetype flavor text
    return `"I have a vision of what I want to look like... ${archetype.flavorText.reveal}"`;
}

// ==========================================
// GODDESS ARCHETYPE - FRUSTRATION DIALOGUE
// ==========================================
// Extended dialogue (2-3 paragraphs) for the rare frustration-triggered Goddess archetype.
// Only available to female-bodied NPCs who have been actively transforming and comparing.

const GODDESS_REVEAL_TEXTS = {
    mira: [
        `Mira slumps against the counter, her usual energy replaced by something darker.

"You know what I realized today? I'm ALWAYS chasing someone. First it was Barret's chest, then Della's curves, then... everyone. Every time I think I've caught up, someone else has more. I'm so tired of running in circles."

She straightens up suddenly, eyes blazing.

"No more. I don't want to match anyone anymore. I want to be SO big - in EVERY way - that no one can ever make me feel small again. Maximum everything. Let THEM chase ME for once."`
    ],

    vessa: [
        `Vessa's dreamy demeanor is gone. She stares at you with unusual intensity.

"The spirits showed me something today. A vision of myself - always reaching, always grasping for what others have. I've experimented with being more, being less, always dancing around the edges. But I've never committed. Never gone all the way."

She laughs, but there's an edge to it.

"I'm tired of being the mysterious one who 'doesn't care about such things.' I DO care. I want to know what it feels like to have everything at maximum. The spirits can whisper all they want - I want to ROAR."`
    ],

    barret: [
        `Barret pours herself a drink behind the bar, her jaw tight. She doesn't offer you one.

"Twenty years I've run this tavern. Twenty years of watching women walk in with bigger this, better that. I've seen Della's backside grow, watched Vessa flaunt herself. And I'm supposed to just smile and serve drinks while they take all the attention?"

She downs the drink and slams the glass down.

"I built this place from nothing. I deserve to be the one they ALL stare at. Not just curvy - I want to be impossible to ignore. Biggest everything. When I walk through that door, I want every jaw in the room to hit the floor."`
    ],

    della: [
        `Della sits at her bakery counter, flour-dusted hands trembling. Her eyes are red.

"Do you know what it's like to spend your whole life being 'the nice one'? The motherly one, the soft one, the one who always comes in second? I bake for everyone's celebrations while they fawn over Barret's figure or compliment Mira's energy."

She wipes her eyes with her apron.

"I've been so practical about everything. Always moderate. Always sensible Della. Well, I'm done being sensible. I want to walk into the market and have everyone stop and stare. Maximum everything. Let them see what 'the baker lady' can become."`
    ],

    fiona: [
        `Fiona's usual guarded expression has shattered. She looks almost feral.

"You want to know why I stay in the shadows? Because being small, being forgettable, keeps you safe. But survival isn't living, is it? I've watched women in this town walk around like they own the space they're in. Confident. Powerful."

She clenches her fists.

"I'm done being a ghost. Done being the one people's eyes slide past. I want to take up space - ALL the space. Maximum muscle to fight. Maximum curves to intimidate. Everything at five. Let them try to overlook me THEN."`
    ],

    lenna: [
        `Lenna's hands shake as she closes the book she was pretending to read. Her voice is barely above a whisper, but filled with emotion.

"I've spent my whole life hiding behind these shelves. Watching other women live while I just read about it. Every time someone beautiful comes into the library, I shrink a little more. Trying to disappear."

Her voice rises.

"But I don't want to disappear anymore. I'm so tired of being invisible. I want to be seen. Not just noticed - overwhelming. So big, so present that no one can ever overlook me again. Maximum everything. I don't care if it makes sense."`
    ],

    mrs_thornwick: [
        `Mrs. Thornwick's composed facade cracks. She grips her teacup so hard her knuckles go white.

"I have maintained propriety my entire life. Proper posture, proper dress, proper proportions. Do you know how exhausting it is? Watching Barret flaunt herself, watching even that strange Vessa woman draw eyes while I sit in council meetings being 'respectable'?"

She sets the teacup down with a sharp click.

"I'm done. I've spent decades being dignified while everyone else got to be impressive. Maximum everything. Let them write THAT into the town records."`
    ],

    aldric: [
        `Aldric sets down his hammer with uncharacteristic gentleness. His massive frame seems somehow diminished.

"I've always been the strongest. The biggest. It was simple - work hard, get strong. But watching these women with their curves and their confidence... I see power I never understood. A different kind of strength."

He flexes his calloused hands, staring at them.

"If this body is what I have now, I won't do it halfway. I've never done anything halfway. Maximum muscle - that I understand. But also maximum curves. Maximum everything. I want to be as overwhelming as a woman as I was as a man."`
    ],

    corwin: [
        `Corwin's merchant smile is nowhere to be seen. His calculating eyes are fixed on something far away.

"I've built a fortune by understanding what people want. And what everyone wants is to be noticed. To be desired. To be the one others aspire to. I've facilitated that for customers while I stood behind the counter, forgettable."

He turns to you with unusual intensity.

"If I'm going to be in this female form, I refuse to be mediocre at it. I've watched the women of this town compete with each other for years. Maximum everything. Let the other merchants compete for scraps while customers can't take their eyes off me."`
    ],

    holt: [
        `Holt stands rigid, every muscle tense. When he speaks, each word seems pulled from somewhere deep.

"I've watched. Always watched. Never participated in their petty competitions. Told myself it was beneath me. Discipline. Control."

A crack appears in his stoic facade.

"But I'm tired of being apart. Tired of watching everyone else feel things while I stand guard over my own emptiness. Maximum everything - not for attention, but because I want to finally know what it's like to be overwhelming. Even to myself."`
    ]
};

function getGoddessRevealText(npcId) {
    const texts = GODDESS_REVEAL_TEXTS[npcId];
    if (texts) {
        return texts[Math.floor(Math.random() * texts.length)];
    }
    // Fallback (shouldn't happen)
    return BODY_ARCHETYPES.goddess.flavorText.celebration;
}

// ==========================================
// PER-NPC ARCHETYPE ONE-LINERS
// ==========================================
// Short italic stage directions shown ~20% of the time during archetype satisfaction.
// Character-specific behavior showing NPC comfortable/confident in her achieved body.

const NPC_ARCHETYPE_ONELINERS = {
    mira: {
        hourglass: [
            "She does a little spin in the doorway, watching her skirt flare out around her new curves with pure delight.",
            "She catches you looking and strikes an exaggerated hourglass pose, hands on her tiny waist, giggling.",
            "She's walking differently \u2014 slower, more deliberate, hips swaying like she's just discovered they exist."
        ],
        amazon: [
            "She flexes both arms and grins at the definition, bouncing on her toes like she's about to sprint somewhere.",
            "She picks up a heavy crate one-handed and winks at you, barely breaking a sweat.",
            "She's practically vibrating with energy, the muscles in her arms and legs taut and ready, looking for any excuse to move."
        ],
        bombshell: [
            "She adjusts her top for the third time since you arrived, cheeks pink but grinning ear to ear.",
            "She leans forward to hand you something and the weight shifts dramatically. She catches your reaction and laughs.",
            "She keeps glancing down at herself as if checking they're still there, each time looking more pleased than the last."
        ],
        bootylicious: [
            "She perches on the edge of a stool and it creaks ominously. She hops up with a sheepish grin, patting her rear.",
            "She sways past you in the narrow corridor and bumps you with her hip \u2014 apparently by accident, but her smirk says otherwise.",
            "She turns to grab something from a shelf and you can see her fighting back a smile at her own silhouette."
        ],
        petite: [
            "She slips through a gap between crates that no one else could fit through, looking immensely pleased with herself.",
            "She holds up her own wrist and marvels at how delicate it looks, turning it in the light like a jeweler admiring a ring.",
            "She's perched on a high shelf, legs dangling, looking down at you with pixie-like amusement."
        ],
        statuesque: [
            "She catches her reflection in a window and pauses, smoothing her hair with the quiet satisfaction of someone who knows they look good.",
            "She stands in the center of the room and everything about her proportions just works \u2014 balanced, elegant, effortless.",
            "She moves through the space with a dancer's grace, every line of her body flowing naturally into the next."
        ],
        goddess: [
            "She braces herself against the doorframe as a visible shudder runs through her, biting her lip, eyes fluttering shut for a moment before she grins at you breathlessly.",
            "She shifts her weight and her breath catches \u2014 every sensation magnified to an almost unbearable degree. She lets out a giddy laugh, face flushed.",
            "She's trying to act normal but keeps losing her train of thought mid-sentence, distracted by the overwhelming fullness of her own body."
        ]
    },

    vessa: {
        hourglass: [
            "She runs her fingers slowly along the curve of her waist, as if tracing a spell sigil only she can see.",
            "Her dark cloak parts as she turns and the dramatic hourglass beneath draws the eye like a lodestone.",
            "She sits with one leg crossed over the other, violet eyes half-lidded, radiating a languid confidence."
        ],
        amazon: [
            "She rolls the sleeves of her robe up past her elbows, revealing corded forearms, examining them with scholarly interest.",
            "She lifts a heavy mortar one-handed while grinding herbs with the other, the muscles in her arm barely straining.",
            "She moves through her shop with a predator's economy of motion, every step deliberate and powerful."
        ],
        bombshell: [
            "She adjusts the neckline of her robe with an air of academic detachment that doesn't quite hide her satisfaction.",
            "Her hooded cloak can't conceal the dramatic silhouette beneath. She makes no effort to try.",
            "She reaches for a high shelf and the fabric pulls tight across her chest. Her knowing smile deepens."
        ],
        bootylicious: [
            "She sways past the herb racks with slow deliberation, the fabric of her dress whispering against her curves.",
            "She bends to examine a low shelf and the shape of her is suddenly, dramatically apparent. She glances back at you with a flicker of amusement.",
            "She settles into her chair with more care than usual, adjusting herself with quiet pleasure."
        ],
        petite: [
            "She seems to melt into the shadows of her herb shop, small and nearly invisible until her violet eyes catch the light.",
            "She moves through the narrow aisles of her shop like a wisp of smoke, barely disturbing the hanging dried herbs.",
            "She perches on the edge of a stool, feet dangling, looking ethereal and faintly amused."
        ],
        statuesque: [
            "She stands in a shaft of light from the window, her proportions so perfectly balanced she could be a painting.",
            "She tilts her head in thought and the line from her jaw to her shoulder is classically, almost mathematically perfect.",
            "She arranges herbs with precise, graceful movements, her balanced form lending an air of ritual to every gesture."
        ],
        goddess: [
            "She grips the edge of her herb table, knuckles white, breathing slow and controlled as sensation cascades through her massive body. Her violet eyes glow brighter.",
            "She pauses mid-sentence, pressing her thighs together, a tremor passing through her that she doesn't bother to hide. When she speaks again her voice is thick.",
            "She traces a finger along her own collarbone, then lower, eyes drifting shut. The faintest whisper: 'The spirits have nothing on this.'"
        ]
    },

    barret: {
        hourglass: [
            "She props both hands on her waist and arches her back behind the bar, showing off the dramatic pinch of her waistline with zero subtlety.",
            "She squeezes past a table and every patron watches the hourglass figure go by. She tips them a wink.",
            "She catches sight of herself in the mirror behind the bar and grins like a cat that got the cream."
        ],
        amazon: [
            "She hauls a full keg from behind the bar and sets it down with a heavy thud, barely winded, grinning like a wolf.",
            "She arm-wrestles a patron and wins so fast his elbow cracks against the table. She throws her head back laughing.",
            "She rolls up her sleeves and the muscles in her forearms flex impressively. 'Anyone else want to cause trouble tonight?'"
        ],
        bombshell: [
            "She leans over the bar to take an order and the view is... considerable. She knows exactly what she's doing.",
            "She adjusts her bodice with a theatrical sigh. 'These things have a mind of their own.' She doesn't sound like she minds.",
            "She sways behind the bar, her slim waist and dramatic top half drawing looks from every corner of the tavern."
        ],
        bootylicious: [
            "She bumps the kitchen door open with her hip and it flies wide. 'Built-in battering ram,' she cackles.",
            "She drops something and bends to pick it up slowly, catching your eye over her shoulder with a brazen grin.",
            "She settles onto a barstool and it groans. She pats her rear proudly. 'Quality seating, that is.'"
        ],
        petite: [
            "She hops up onto the bar to reach the top shelf, looking surprisingly nimble and pleased about it.",
            "She darts between the tables with new agility, weaving through the crowd like a fish through reeds.",
            "She holds up a pint glass next to her face and it looks almost comically large by comparison. She laughs."
        ],
        statuesque: [
            "She stands behind the bar with perfect posture, polishing a glass, looking like a portrait of the ideal innkeeper.",
            "She carries drinks through the tavern with effortless poise, every movement controlled and elegant.",
            "She leans against the bar with one elbow, her balanced proportions catching the warm lamplight. She looks... right."
        ],
        goddess: [
            "She grabs the bar rail with both hands, her massive body shaking, and lets out a throaty laugh that's at least half moan. 'Gods above and below, I can FEEL the draft from the door.'",
            "She shifts her stance and sucks air through her teeth, eyes going glassy for a second. 'Everything's turned up to eleven. Don't even get me started on what sitting down does.'",
            "She serves a pint and her hand trembles, beer sloshing. She sets it down quick and grips the bar, breathing hard. 'Sorry. Wave. Give me a second. Or don't. I'm enjoying this.'"
        ]
    },

    della: {
        hourglass: [
            "She ties her apron tight and the dramatic curve of her waist is suddenly very apparent beneath the flour dust.",
            "She hums a lullaby while kneading dough, her new silhouette swaying gently with each push and pull.",
            "She turns sideways to slide past the oven and stops, running a hand down her waist with quiet wonder."
        ],
        amazon: [
            "She hefts a sack of flour that used to take both arms and tosses it onto the counter one-handed, blinking in surprise.",
            "She kneads the dough with vigor and the muscles in her forearms stand out. She laughs. 'My husband would never believe this.'",
            "She stands at the oven with her arms crossed, looking solid and formidable. The bakery feels smaller around her."
        ],
        bombshell: [
            "She bends over the display case to arrange pastries and has to back up and try again from a different angle.",
            "She catches a patron's wandering eyes and goes pink, but tucks a strand of hair behind her ear with a pleased smile.",
            "She fans herself with her apron near the hot oven, the motion drawing attention to her dramatic silhouette."
        ],
        bootylicious: [
            "She backs into the counter and the whole thing scoots an inch. 'Oops,' she giggles, patting herself.",
            "She squeezes behind the display case and knocks a tray of scones sideways. She turns pink but can't stop smiling.",
            "She sits down on her stool and it disappears entirely beneath her. She laughs so hard she nearly falls off."
        ],
        petite: [
            "She reaches for the high shelf and has to stretch up on her tiptoes, humming contentedly despite the effort.",
            "She slips through the narrow gap between the oven and the counter with room to spare, looking delighted.",
            "She pats a fresh loaf with delicate, nimble fingers and smiles like a grandmother admiring a grandchild."
        ],
        statuesque: [
            "She moves through the bakery with an unhurried grace that makes even flouring a surface look elegant.",
            "She stands at the counter with perfect posture, a serene smile on her face, every line of her proportioned like fine pottery.",
            "She sets a cake on the display and steps back to admire it. The proportions of both baker and cake are impeccable."
        ],
        goddess: [
            "She grips the edge of the bakery counter, flour poofing up from beneath her fingers, her legs trembling. 'Oh my \u2014 oh goodness \u2014' She fans herself with her apron, face bright red, grinning helplessly.",
            "She drops a tray of rolls and doesn't even notice, pressing her thighs together, eyes squeezed shut. When she opens them she's laughing through tears. 'At my age! Imagine!'",
            "She leans heavily against the oven, cheeks flushed from more than the heat, enormous body quivering. 'I should be ashamed,' she whispers. 'I'm not. I'm really, really not.'"
        ]
    },

    fiona: {
        hourglass: [
            "She catches her reflection in a rain puddle and stares for a long moment, as if she can't quite believe the curves belong to her.",
            "She walks with her head up for once, shoulders back, the confidence of her new shape slowly replacing old habits.",
            "She tugs at her too-small shirt and looks annoyed \u2014 but there's a flicker of pride in the way she stands."
        ],
        amazon: [
            "She clenches her fists and watches the muscles in her forearms flex, a fierce, almost savage satisfaction crossing her face.",
            "She carries a heavy bundle without slowing down, jaw set, walking like someone who dares the world to try something.",
            "She leans against a wall with her arms crossed, muscular and alert, watching the street with a predator's calm."
        ],
        bombshell: [
            "She hunches her shoulders out of old habit, then catches herself and straightens up. The effect is dramatic.",
            "She adjusts her shirt with quick, self-conscious movements, but can't quite hide the small smile tugging at her lips.",
            "She walks through a crowded area and people actually part for her. Her eyes go wide, then narrow with something like satisfaction."
        ],
        bootylicious: [
            "She plops down on a crate and it creaks loudly. She freezes, then snorts a laugh \u2014 the first unguarded sound she's made all day.",
            "She walks ahead of you and there's a new swagger in her step, not practiced but natural, like her body knows what to do.",
            "She glances over her shoulder and catches you looking. Instead of flinching, she raises an eyebrow. Progress."
        ],
        petite: [
            "She slips through a gap in a fence and waits on the other side, looking more at ease in her own skin than you've ever seen her.",
            "She sits in a high windowsill, feet drawn up, looking small and safe and, for once, content.",
            "She holds out her hand to examine her own thin fingers, and for the first time it looks like delicacy instead of deprivation."
        ],
        statuesque: [
            "She stands in the street with a posture she didn't have before \u2014 straight-backed, balanced, quietly commanding.",
            "She walks past a group of people and they glance at her with casual admiration instead of pity. Her jaw tightens, hiding a smile.",
            "She pauses to look out over the town square, the elegant lines of her body silhouetted against the sky."
        ],
        goddess: [
            "She braces against a wall, breathing hard, her massive body trembling with sensation she never believed she'd feel. Her eyes are fierce and wet. 'I'm real,' she whispers. 'I'm actually real.'",
            "She wraps her muscular arms around herself and squeezes, shuddering, overwhelmed by the sheer physical presence of her own body. A ragged laugh breaks free.",
            "She stands in the middle of the street taking up space \u2014 so much space \u2014 and every nerve ending is singing. She closes her eyes, fists clenched, refusing to let the moment pass."
        ]
    },

    lenna: {
        hourglass: [
            "She's scribbling in her notebook with one hand and tracing the curve of her own waist with the other, apparently unconsciously.",
            "She stretches in her reading chair and the hourglass silhouette is striking against the bookshelves. She doesn't notice. You do.",
            "She stands to reach a high shelf and her dramatic proportions make the library's narrow aisles feel even narrower."
        ],
        amazon: [
            "She reshelves a massive atlas one-handed and looks down at her own bicep with academic fascination.",
            "She moves the rolling ladder to a new section with a single push, her muscular arms barely straining.",
            "She sits at her desk and the chair groans. She notes it down \u2014 'chair stress tolerance' \u2014 and keeps working."
        ],
        bombshell: [
            "She leans over her desk to read and knocks an inkwell over with her chest. She rescues the book first, then blushes.",
            "She pushes her glasses up and peers at you over the top of a very large book, her dramatic silhouette visible even through her high-collared dress.",
            "She reaches for a shelf and pulls back quickly, adjusting her posture. 'Center of gravity calculations,' she mutters, cheeks pink."
        ],
        bootylicious: [
            "She reaches for a bottom shelf and her pear-shaped silhouette fills the aisle. She notes 'spatial requirements increased' in her margin.",
            "She sits on her reading stool and shifts several times to get comfortable. Each adjustment looks more self-conscious than the last.",
            "She squeezes between two bookshelves sideways and has to turn the other way. 'The architecture hasn't changed,' she mutters. 'I have.'"
        ],
        petite: [
            "She curls up in a reading nook that would be cramped for anyone else, her small frame fitting perfectly. She looks utterly content.",
            "She climbs the rolling ladder with the lightness of a cat, barely making the wheels creak.",
            "She holds a quill and her delicate fingers make even handwriting look like calligraphy."
        ],
        statuesque: [
            "She stands at the lectern to read aloud and the proportions of her body lend a kind of classical authority to every word.",
            "She reaches for a book and the motion is perfectly balanced \u2014 efficient, graceful, unrehearsed.",
            "She sits with one ankle crossed over the other, posture perfect, looking like a scholar in an illuminated manuscript."
        ],
        goddess: [
            "She grips the edge of her desk with both hands, massive body trembling, spectacles fogging. 'Sensory input exceeding all \u2014 all documented \u2014' She gives up on the sentence.",
            "She leans against a bookshelf and it rocks. She doesn't notice, too busy pressing her enormous thighs together, eyes unfocused behind clouded lenses.",
            "She tries to write in her notebook and the pen shakes so badly the line wavers. 'Fascinating,' she breathes, but her voice cracks on the second syllable."
        ]
    },

    mrs_thornwick: {
        hourglass: [
            "She smooths her mayoral sash over the dramatic curve of her waist with the measured precision of someone who is definitely not preening.",
            "She stands at the town hall podium and her silhouette commands attention before she speaks a single word.",
            "She takes a measured breath and the sash strains. Her expression doesn't change. Her eyes sparkle."
        ],
        amazon: [
            "She grips a ceremonial staff and the muscles in her forearm stand out. She holds it with the ease of a natural-born general.",
            "She straightens a portrait on the wall that no one else could reach without a stepstool, barely extending her arm.",
            "She crosses her arms during a disagreement and the gesture is newly, visibly intimidating. She notices. She approves."
        ],
        bombshell: [
            "She buttons her jacket slowly, each button requiring careful negotiation. Her composure doesn't waver, but her cheeks pinken.",
            "She sits at the head of the council table and the view from the front of the room has... changed. She pretends not to notice.",
            "She clears her throat before speaking and two council members look up quickly. Neither was looking at her face."
        ],
        bootylicious: [
            "She rises from her council chair with deliberate dignity, tugging her skirt straight with practiced discretion.",
            "She walks down the town hall corridor and her heels click with authority, her new proportions lending gravitas to every step.",
            "She adjusts the angle of her chair before sitting, a minor accommodation she makes without comment or complaint."
        ],
        petite: [
            "She stands at the podium and barely clears the top, but the steel in her voice fills the room regardless.",
            "She walks through the town hall with quick, precise steps, her small frame making her seem to appear and disappear between pillars.",
            "She folds her hands on the council table, delicate fingers interlaced, and somehow the gesture radiates authority."
        ],
        statuesque: [
            "She stands at the window overlooking the town square with impeccable posture, every proportion elegant and deliberate.",
            "She walks the length of the council chamber and every eye follows, not from spectacle but from a quiet, sculpted authority.",
            "She turns to face you and the light falls on her in a way that makes her look like a portrait of ideal governance."
        ],
        goddess: [
            "She grips the edge of the council table, knuckles white, jaw clenched, the effort to maintain composure written across her entire massive, trembling body. A tiny sound escapes her. She clears her throat.",
            "She sits rigidly in her mayoral chair, hands flat on the desk, breathing through her nose, her enormous frame vibrating with sensation. 'The meeting,' she manages, 'is adjourned.'",
            "She smooths her sash with shaking hands, her eyes bright and glazed, her chest heaving. For one unguarded moment her lips part and her expression is pure, helpless bliss."
        ]
    },

    aldric: {
        hourglass: [
            "She rolls a piece of hot iron on the anvil and the dramatic curve of her waist is visible even through her leather apron.",
            "She stretches after a long session at the forge, hands in the small of her back, and the hourglass shape takes your breath away.",
            "She catches sight of her shadow on the forge wall and studies it for a long, quiet moment. A small, gruff smile."
        ],
        amazon: [
            "She hammers a blade with focused intensity, every muscle working in concert. She's always been strong \u2014 but this is different.",
            "She hefts a finished breastplate and tests its weight, then grins. 'Lighter than I expected. Or maybe I'm just that good now.'",
            "She stands at the quenching trough, arms glistening, looking every inch the warrior she's become."
        ],
        bombshell: [
            "She pulls her apron tight and pauses, looking down at herself with a complicated expression that settles into reluctant satisfaction.",
            "She reaches for tongs on a high hook and the weight of her chest shifts. She compensates without thinking \u2014 she's learning.",
            "She bends over the anvil and straightens up quickly, adjusting her top. 'Forge work wasn't designed for these,' she mutters, but there's no real complaint in her voice."
        ],
        bootylicious: [
            "She bumps the workbench turning around and grunts in surprise. She reaches back and pats her rear with a bewildered chuckle.",
            "She settles onto her forge stool and shifts her weight several times, finding the new center of gravity.",
            "She bends to stoke the fire and her silhouette against the forge glow is dramatically pear-shaped. She snorts. 'Well, that's different.'"
        ],
        petite: [
            "She picks up a delicate tool set she could never use with her old thick fingers, examining the fine work with quiet wonder.",
            "She moves around the forge with unexpected agility, ducking under hanging tools and slipping between workbenches.",
            "She stands at the anvil and it comes up to her waist now. She shakes her head, adjusting to the new perspective."
        ],
        statuesque: [
            "She stands at the forge with the balanced, powerful grace of a master artisan, every proportion speaking to capability.",
            "She examines a finished piece and holds it up to the light. Both smith and creation have the same quality: elegant precision.",
            "She leans against the doorframe of the smithy, arms crossed, and the proportions of her body are as well-crafted as her work."
        ],
        goddess: [
            "She grips the anvil's horn with both hands, her enormous body shaking, sweat rolling down muscles she didn't have a year ago. Her breath comes in ragged gasps. 'This body...' she growls, and there's something raw and undone in her voice.",
            "She drives the hammer down and a visible tremor runs through her entire frame, massive chest heaving, thighs clenching. She sets the hammer down carefully, jaw tight. 'Every. Single. Impact.'",
            "She leans against the forge wall, soot-streaked and trembling, pressing her legs together. Her gruff voice is barely a whisper: 'Never thought I'd feel like this. Never thought I'd want to.'"
        ]
    },

    corwin: {
        hourglass: [
            "She adjusts her scarf, letting it frame the narrow waist beneath, and flashes you a merchant's appraising smile.",
            "She turns to show a customer some fabric and the hourglass figure moves with practiced, fluid grace.",
            "She catches her reflection in a polished silver platter and does a subtle double-take, then smooths her coat with satisfaction."
        ],
        amazon: [
            "She unloads a heavy crate from a wagon single-handed, barely pausing her sales pitch to the customer beside her.",
            "She rolls her sleeves up and the muscles in her forearms are impressive. 'No porters needed anymore,' she says with a merchant's grin.",
            "She stands with her feet planted and arms crossed, her powerful frame lending real weight to her negotiating stance."
        ],
        bombshell: [
            "She leans across the counter to show you something and the neckline of her traveling coat plunges. The customer across from her loses his train of thought.",
            "She adjusts her colorful scarf to better display \u2014 or barely conceal \u2014 her dramatic silhouette. The gesture looks entirely calculated.",
            "She stretches languidly and the slim-framed, top-heavy figure catches the eye of half the market. She notes each glance like a ledger entry."
        ],
        bootylicious: [
            "She turns to rummage through her wares and the pear-shaped curve of her is suddenly, dramatically apparent.",
            "She weaves between her display tables and has to turn sideways at the last one. She adjusts the table spacing without comment.",
            "She sits on a barrel to do her accounts and shifts to find a comfortable position, her expression that of a merchant calculating margin."
        ],
        petite: [
            "She slips through the crowded market stalls like a shadow, appearing at exactly the right moment to close a deal.",
            "She stands next to her towering display of goods and looks almost swallowed by her own inventory. Somehow, she still commands the space.",
            "She counts coins with quick, deft fingers, her small hands surprisingly nimble."
        ],
        statuesque: [
            "She stands at her market stall with the poise of a portrait subject, every proportion conveying reliability and good taste.",
            "She gestures while describing her wares and every movement has an unconscious elegance, like a sculptor's demonstration.",
            "She walks through the market at an unhurried pace, her balanced silhouette turning heads through sheer aesthetic harmony."
        ],
        goddess: [
            "She staggers against her market stall, sending goods rattling, her enormous body trembling. 'I have negotiated with princes,' she manages between gasps, 'and nothing \u2014 NOTHING \u2014 has ever made me this dizzy.'",
            "She grips the edge of a display table, her massive thighs pressing together, rings clinking. Her charming smile has been replaced by something far more honest and desperate.",
            "She leans against a wall, chest heaving, eyes wild, one hand pressed to her stomach. 'This isn't marketable,' she breathes. 'This is priceless. This is \u2014' She shudders and loses the sentence."
        ]
    },

    holt: {
        hourglass: [
            "She stands at her guard post with perfect posture, the curve of her waist visible even beneath her uniform.",
            "She performs a patrol sweep and her silhouette against the sunset is striking \u2014 disciplined shoulders, narrow waist, generous hips.",
            "She clasps her hands behind her back and the hourglass shape of her body is unmistakable beneath the chainmail."
        ],
        amazon: [
            "She performs her weapon drills with mechanical precision, every strike backed by muscle that makes the practice sword whistle.",
            "She stands at the gate and simply being there is enough of a deterrent. Her muscular frame fills the doorway.",
            "She does pushups during her break with easy, metronomic discipline, her powerful body showing no sign of strain."
        ],
        bombshell: [
            "She tugs at her uniform, which was clearly not tailored for her current dimensions. She makes no complaint. Protocol.",
            "She stands at attention and the effect is... distracting. Her expression remains perfectly neutral.",
            "She performs a salute and the motion creates some structural tension in her uniform. She ignores it with military discipline."
        ],
        bootylicious: [
            "She rises from the guard bench with a subtle adjustment of her belt, her expression betraying nothing despite the obvious accommodation.",
            "She walks her patrol route with measured, even strides, the regulation gait slightly adapted for new proportions.",
            "She sits at her post and shifts once, then locks into position, back straight, adapted and resolved."
        ],
        petite: [
            "She stands at her post, smaller now but no less alert, her steel-grey eyes scanning every corner with undiminished intensity.",
            "She moves through a crowd unseen, appearing exactly where she's needed, small and deadly efficient.",
            "She adjusts her uniform, which hangs looser now, and cinches the belt tighter with a single, practiced motion."
        ],
        statuesque: [
            "She stands at the gate and her balanced, sculpted proportions make the guard uniform look ceremonial rather than functional.",
            "She performs her rounds with the measured grace of a military parade, every line of her body regulation-perfect.",
            "She salutes and the motion is crisp, her proportions lending a classical, almost statuesque quality to the gesture."
        ],
        goddess: [
            "She stands at her post, every muscle locked, jaw clenched, her enormous body vibrating beneath the straining uniform. A bead of sweat rolls down her temple. 'Holding position,' she whispers to no one.",
            "She grips her sword hilt until her knuckles go white, her massive chest heaving with controlled breaths. Her steel-grey eyes are bright and unfocused. 'Status: overwhelmed. Continuing duty.'",
            "She leans against the guardhouse wall with uncharacteristic need for support, her legs trembling, a sound caught in her throat. 'Compromised,' she breathes, and for once the word sounds like a gift."
        ]
    }
};

// ==========================================
// JEALOUSY VARIETY HELPER FUNCTIONS
// ==========================================

// Weighted random selection from an object of weights
function weightedRandom(weights) {
    const entries = Object.entries(weights);
    const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
    let random = Math.random() * total;

    for (const [key, weight] of entries) {
        random -= weight;
        if (random <= 0) return key;
    }

    return entries[0][0]; // Fallback
}


const NPC_DESIRE_CONFIG = {
    // All NPCs can desire changes to all body stats (no per-NPC restrictions)
    mira:          { allowedStats: ['chest', 'butt', 'muscle', 'genitalia'], personality: NPC_PERSONALITY_TYPES.ENTHUSIAST },
    vessa:         { allowedStats: ['chest', 'butt', 'muscle', 'genitalia'], personality: NPC_PERSONALITY_TYPES.ADVENTUROUS },
    barret:        { allowedStats: ['chest', 'butt', 'muscle', 'genitalia'], personality: NPC_PERSONALITY_TYPES.ADVENTUROUS },
    della:         { allowedStats: ['chest', 'butt', 'muscle', 'genitalia'], personality: NPC_PERSONALITY_TYPES.PRACTICAL },
    fiona:         { allowedStats: ['chest', 'butt', 'muscle', 'genitalia'], personality: NPC_PERSONALITY_TYPES.PRACTICAL },
    lenna:         { allowedStats: ['chest', 'butt', 'muscle', 'genitalia'], personality: NPC_PERSONALITY_TYPES.PRUDE },
    mrs_thornwick: { allowedStats: ['chest', 'butt', 'muscle', 'genitalia'], personality: NPC_PERSONALITY_TYPES.PRUDE },
    aldric:        { allowedStats: ['chest', 'butt', 'muscle', 'genitalia'], personality: NPC_PERSONALITY_TYPES.PRACTICAL },
    corwin:        { allowedStats: ['chest', 'butt', 'muscle', 'genitalia'], personality: NPC_PERSONALITY_TYPES.ADVENTUROUS },
    holt:          { allowedStats: ['chest', 'butt', 'muscle', 'genitalia'], personality: NPC_PERSONALITY_TYPES.PRACTICAL }
};

// (Target profile system removed â€” replaced by hidden archetype system)

// Genitalia Change Configuration
// Once an NPC achieves a genitalia change, they won't desire another for this many days
const GENITALIA_CHANGE_CONFIG = {
    cooldownDays: 20,       // Days before NPC can desire another genitalia change
    whimChance: 0.15,       // 15% base chance when rolling a whim to consider genitalia
    // Curiosity bonus for conservative personalities (they whim less often, but when they do...)
    curiosityBonus: {
        prude: 0.20,        // +20% chance for prudes (total 35%)
        practical: 0.10,    // +10% chance for practicals (total 25%)
        adventurous: 0.00,
        growth_focused: 0.00
    }
};

// (canDesireShrink removed â€” archetype gap system handles direction)

// Check if an NPC has female body presentation (eligible for jealousy system)
// Female if vagina OR if penis with breasts (dickgirl)
function isEligibleForJealousy(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return false;
    const body = npc.body;
    return body.genitalia === 0 || (body.genitalia === 1 && body.chest >= 1);
}

// Get all NPCs eligible for jealousy (for comparison pool)
// Includes all NPCs, not just unlocked ones — locked NPCs still exist in the game world
function getEligibleNpcs() {
    return Object.keys(gameState.npcs).filter(id => isEligibleForJealousy(id));
}

// Check if desire should be refreshed (using satisfaction period)
function shouldRefreshDesire(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return false;
    if (!isNpcUnlocked(npcId)) return false;

    // Check if NPC meets desireReveal threshold - no desire generation until player earns trust
    const thresholds = NPC_TRUST_THRESHOLDS[npcId];
    if (thresholds && (npc.trust || 0) < thresholds.desireReveal) {
        return false;
    }

    // No desire yet - can get one
    if (!npc.currentDesire && !npc.satisfactionEndDay) return true;

    // Currently satisfied - wait it out
    if (npc.satisfactionEndDay && gameState.day < npc.satisfactionEndDay) {
        return false;
    }

    // Satisfaction period ended or no desire
    return !npc.currentDesire;
}

// Check if NPC is in satisfaction period (for UI/dialogue)
function isNpcSatisfied(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return false;
    return npc.satisfactionEndDay && gameState.day <= npc.satisfactionEndDay;
}

// (isNpcContent, shouldSkipDueToContentment, countStatsAtFive, applyBalanceResistance removed â€” replaced by archetype-driven system)

// ==========================================
// NPC SEXUAL ADVANCE SYSTEM (Random Propositions)
// ==========================================
// This is a SECONDARY/FLAVOR system — NPCs randomly proposition the player.
// The PRIMARY path to sex (and tier advancement) is:
//   1. Mira hints at workshop (mira_sex_hint scene, escalating 3 levels)
//   2. Player goes to NPC and clicks "Intimate..." in greeting menu
//   3. Sex scene fires, markSexUnlocked() handles tier progression
// The "Intimate..." button appears once trust >= intimate threshold.
//
// This advance system is supplementary: once eligible, an NPC may randomly
// proposition the player via checkPendingAdvanceRedirect() when entering
// a location. Both paths lead to the same sex_intro scene and markSexUnlocked().

// Get NPCs eligible to make sexual advances (random propositions)
// Requirements: satisfied, intimate trust, transformed (if male)
function getEligibleAdvanceNpcs() {
    const eligible = [];
    const npcIds = ['mira', 'vessa', 'mrs_thornwick', 'fiona', 'barret', 'lenna', 'della', 'aldric', 'corwin', 'holt'];

    for (const npcId of npcIds) {
        const npc = gameState.npcs[npcId];
        if (!npc) continue;
        if (!isNpcUnlocked(npcId)) continue;

        // Must be satisfied (completed a desire recently)
        if (!isNpcSatisfied(npcId)) continue;

        // Must have intimate trust level
        const thresholds = getNpcTrustThresholds(npcId);
        if ((npc.trust || 0) < thresholds.intimate) continue;

        // Male NPCs must have enjoys_feminine_form flag (post-transformation)
        const maleNpcs = ['aldric', 'corwin', 'holt'];
        if (maleNpcs.includes(npcId) && !npc.enjoys_feminine_form) continue;

        eligible.push(npcId);
    }

    return eligible;
}

// Roll for NPC advance - called during day transition
function rollNpcAdvance() {
    // Not time yet
    if (gameState.day < gameState.nextAdvanceDay) return;

    // Already have pending advance
    if (gameState.pendingAdvance) return;

    const eligible = getEligibleAdvanceNpcs();

    if (eligible.length === 0) {
        // No eligible NPCs - roll new day and try again later
        gameState.nextAdvanceDay = gameState.day + 3 + Math.floor(Math.random() * 5);
        return;
    }

    // Pick random NPC and mood
    const npcId = eligible[Math.floor(Math.random() * eligible.length)];
    const mood = Math.random() < 0.5 ? 'playful' : 'direct';

    gameState.pendingAdvance = { npcId, mood };
}

// Clear pending advance after accept/reject
function clearPendingAdvance(accepted) {
    if (!gameState.pendingAdvance) return;

    if (!accepted) {
        // Rejection: -1 trust
        const npcId = gameState.pendingAdvance.npcId;
        if (gameState.npcs[npcId]) {
            gameState.npcs[npcId].trust = Math.max(0, (gameState.npcs[npcId].trust || 0) - 1);
        }
    }

    gameState.pendingAdvance = null;

    // Roll next advance day (3-7 days from now)
    gameState.nextAdvanceDay = gameState.day + 3 + Math.floor(Math.random() * 5);

    saveState();
}

// Get current pending advance mood (for scene branching)
function getPendingAdvanceMood() {
    return gameState.pendingAdvance?.mood || 'playful';
}

// Get current pending advance NPC
function getPendingAdvanceNpc() {
    return gameState.pendingAdvance?.npcId || null;
}

// Mark a desire as fulfilled and set satisfaction period
function markDesireFulfilled(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return;

    // Track first desire fulfillment for vendor system
    if (npc.firstDesireFulfilledDay === null) {
        npc.firstDesireFulfilledDay = gameState.day;
    }

    const desire = npc.currentDesire;

    // Track genitalia change for cooldown system
    if (desire && desire.stat === 'genitalia') {
        npc.lastGenitaliaChangeDay = gameState.day;
    }

    // Record to desire history
    recordDesireToHistory(npcId, desire);

    // Check if this fulfillment completed the hidden archetype
    if (npc.hiddenArchetype && checkArchetypeAchieved(npcId)) {
        // Archetype achieved! Skip normal satisfaction, use archetype achievement flow
        handleArchetypeAchievement(npcId);

        // Archetype steps exempt from "avoid same stat" — don't set lastDesireStat
        npc.lastDesireStat = null;
        npc.currentDesire = null;
        npc.desireFulfilledDay = gameState.day;

        saveState();

        // Update desire tracker UI
        if (typeof UI !== 'undefined' && UI.updateDesireTracker) {
            UI.updateDesireTracker();
        }

        // Generate next archetype desire immediately (no cooldown between archetype steps)
        const nextDesire = generateArchetypeDrivenDesire(npcId);
        if (!nextDesire) {
            // No more gaps â€” already handled by handleArchetypeAchievement
        }
        return;
    }

    // Store last desire stat to prevent same body part being desired twice in a row
    npc.lastDesireStat = desire?.stat || null;
    npc.currentDesire = null;
    npc.desireFulfilledDay = gameState.day;

    // Archetype-driven desires skip satisfaction cooldown — generate next step immediately
    if (desire?.isArchetypeDriven && npc.hiddenArchetype) {
        npc.lastDesireStat = null; // Archetype steps exempt from "avoid same stat" constraint
        npc.satisfactionEndDay = null;
        saveState();
        generateArchetypeDrivenDesire(npcId);
        saveState();
    } else {
        // Normal satisfaction cooldown
        let satisfactionDays = SATISFACTION_CONFIG.baseMinDays;

        // Bonus for major change (3+ points)
        if (desire && desire.originalValue !== undefined) {
            const change = Math.abs(desire.target - desire.originalValue);
            if (change >= 3) {
                satisfactionDays += SATISFACTION_CONFIG.majorChangeBonus;
            }
        }

        // Bonus for returning to natural
        if (desire?.isNostalgic) {
            satisfactionDays += SATISFACTION_CONFIG.naturalReturnBonus;
        }

        satisfactionDays = Math.min(satisfactionDays, SATISFACTION_CONFIG.maxSatisfaction);

        // No satisfaction cooldown when only one NPC is unlocked (early game pacing)
        const nonMiraUnlocked = (gameState.progression?.unlockedNpcs || []).filter(id => id !== 'mira');
        if (nonMiraUnlocked.length <= 1) {
            satisfactionDays = 0;
        }

        npc.satisfactionEndDay = gameState.day + satisfactionDays;

        // When no cooldown, generate next desire immediately so invite button is available
        if (satisfactionDays === 0) {
            generateNpcDesire(npcId);
            saveState();
        }
    }

    // Update desire tracker UI
    if (typeof UI !== 'undefined' && UI.updateDesireTracker) {
        UI.updateDesireTracker();
    }
}

// (findNextArchetypeStep, countCompletedArchetypeSteps, countTotalArchetypeSteps removed â€” replaced by gap-based system)

// (getArchetypeProgressionDialogue removed â€” replaced by celebration/one-liner system)

// Record fulfilled desires for frustration trigger tracking
function recordDesireToHistory(npcId, desire) {
    if (!desire) return;

    if (!gameState.desireHistory) {
        gameState.desireHistory = [];
    }

    gameState.desireHistory.push({
        npcId: npcId,
        stat: desire.stat,
        target: desire.target,
        comparedTo: desire.comparedTo,
        generatedDay: desire.generatedDay || gameState.day,
        fulfilledDay: gameState.day,
        isArchetype: desire.isArchetype || false,
        isWhim: desire.isWhim || false
    });

    // Keep history manageable (last 100 entries)
    if (gameState.desireHistory.length > 100) {
        gameState.desireHistory = gameState.desireHistory.slice(-50);
    }
}

// Check if player has ever spoken to an NPC
function hasSpokenToNpc(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return false;
    // Player has spoken if they have any trust OR if NPC has seen player's body
    return npc.trust > 0 || npc.lastSeenPlayer !== null;
}

// Check if player has seen this NPC's introduction
function hasSeenNpcIntro(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return true; // Default to true if NPC doesn't exist
    return npc.introCompleted === true;
}

// Mark NPC introduction as completed
function markNpcIntroCompleted(npcId) {
    const npc = gameState.npcs[npcId];
    if (npc) {
        npc.introCompleted = true;
    }
}

// Get display text and state for desire tracker for a specific NPC
// Returns { name, text, state } where state is one of:
//   'max-trust', 'not-met', 'satisfied', 'desire-known', 'desire-unknown',
//   'low-trust', 'waiting'
function getDesireTrackerText(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return null;
    if (!isNpcUnlocked(npcId)) return null;

    const npcName = getNpcDisplayName(npcId);
    const pronouns = getNpcPronouns(npcId);
    const thresholds = NPC_TRUST_THRESHOLDS[npcId];

    // Check if at sandbox trust (max)
    if (npc.trust >= thresholds.sandbox) {
        return { name: npcName, text: `Trusts you completely.`, state: 'max-trust' };
    }

    // Mira has no desire system — hide from tracker entirely
    if (npcId === 'mira') {
        return null;
    }

    // FIRST: If player hasn't spoken to NPC yet, just say to speak with them
    // This takes priority over everything else - can't have desires/prereqs with someone you haven't met
    if (!hasSpokenToNpc(npcId)) {
        const loc = getNpcLocation(npcId);
        const locName = (loc && loc !== 'home' && loc !== 'unavailable') ? ` in ${getLocationDisplayName(loc)}` : '';
        return { name: npcName, text: `Speak with ${pronouns.object}${locName}.`, state: 'not-met' };
    }

    // Check if pending genital proposal
    if (npc.pendingGenitalProposal) {
        return { name: npcName, text: `Has something to ask you.`, state: 'proposal-pending' };
    }

    // Check if in archetype celebration/satisfaction
    if (npc.archetypeAchieved && npc.archetypeSatisfactionEnd && gameState.day < npc.archetypeSatisfactionEnd) {
        // If intimate is available, hint at it instead of generic satisfaction
        if (npc.archetypeIntimateReady && !npc.sexUnlocked) {
            const loc = getNpcLocation(npcId);
            const locName = (loc && loc !== 'home' && loc !== 'unavailable') ? ` in ${getLocationDisplayName(loc)}` : '';
            return { name: npcName, text: `Wants to be closer to you${locName}.`, state: 'desire-known' };
        }
        return { name: npcName, text: `Loving ${pronouns.possessive} new look!`, state: 'satisfied' };
    }

    // Check if satisfied (in cooldown)
    if (npc.satisfactionEndDay && gameState.day <= npc.satisfactionEndDay) {
        // "Waiting for you" before first sex (tier unlock) — at intimate trust or after archetype achievement
        const thresholds = getNpcTrustThresholds(npcId);
        if (!npc.sexUnlocked && ((npc.trust || 0) >= thresholds.intimate || npc.archetypeIntimateReady)) {
            return { name: npcName, text: `Waiting for you.`, state: 'satisfied' };
        }
        return { name: npcName, text: `Satisfied.`, state: 'satisfied' };
    }

    // When goddess is active and revealed, show archetype progress
    if (npc.hiddenArchetype === 'goddess' && npc.goddessRevealed && !npc.archetypeAchieved) {
        if (npc.currentDesire) {
            const legacyDesireRevealed = npc?.desiresRevealed?.some(r => r === true);
            const desireKnown = npc.desireKnownToPlayer || npc.desireRevealed || legacyDesireRevealed;
            if (!desireKnown) {
                return { name: npcName, text: `Pursuing Goddess form \u2014 chat with ${pronouns.object}.`, state: 'desire-unknown' };
            }
            const goddessDirHint = npc.currentDesire.direction === 'increase' ? ' (+)' : ' (-)';
            return { name: npcName, text: `Pursuing Goddess form \u2014 wants ${npc.currentDesire.label.toLowerCase()}.${goddessDirHint}`, state: 'desire-known' };
        }
        return { name: npcName, text: `Pursuing Goddess form.`, state: 'desire-known' };
    }

    // Check if has current desire
    if (npc.currentDesire) {
        // Don't show specific desire until it's been revealed through dialogue
        // Check new system flags, jealousy events, AND legacy desiresRevealed array
        const legacyDesireRevealed = npc?.desiresRevealed?.some(r => r === true);
        const desireKnown = npc.desireKnownToPlayer || npc.desireRevealed || legacyDesireRevealed;
        if (!desireKnown) {
            return { name: npcName, text: `Chat with ${pronouns.object}.`, state: 'desire-unknown' };
        }

        const desire = npc.currentDesire;

        // Before first transformation, append workshop invite hint
        const inviteHint = !gameState.flags?.first_transformation ? ' Invite to workshop.' : '';

        // Jealousy-based desire (compared to another NPC)
        if (desire.comparedTo) {
            const otherName = getNpcDisplayName(desire.comparedTo);
            const statLabel = getStatLabelForDesire(desire.stat, npcId);
            const otherNpc = gameState.npcs[desire.comparedTo];
            const otherValue = otherNpc?.body?.[desire.stat] ?? 0;
            const gap = Math.abs(desire.target - otherValue);
            const isGrowing = desire.direction === 'increase';
            const dirHint = isGrowing ? ' (+)' : ' (-)';

            let comparison;
            if (gap <= 1) {
                comparison = `${statLabel} like ${otherName}`;
            } else if (gap === 2) {
                comparison = `${statLabel} ${isGrowing ? 'bigger' : 'smaller'} than ${otherName}`;
            } else {
                comparison = `${statLabel} much ${isGrowing ? 'bigger' : 'smaller'} than ${otherName}`;
            }
            return { name: npcName, text: `Wants ${comparison}.${dirHint}${inviteHint}`, state: 'desire-known' };
        }

        // Regular desire (whim, experiment, or archetype-driven without comparison)
        const dirHint = desire.direction === 'increase' ? ' (+)' : ' (-)';
        return { name: npcName, text: `Wants ${desire.label.toLowerCase()}.${dirHint}${inviteHint}`, state: 'desire-known' };
    }

    // Below desireReveal threshold - show generic trust goal (no specific number)
    if (npc.trust < thresholds.desireReveal) {
        return { name: npcName, text: `Build more trust with ${pronouns.object}.`, state: 'low-trust' };
    }

    // Has desireReveal but no current desire (waiting for one to generate)
    // This can happen if desire system hasn't triggered yet - suggest interaction
    return { name: npcName, text: `Spend time with ${pronouns.object}.`, state: 'waiting' };
}

// Helper to get readable stat label for desire display
function getStatLabelForDesire(stat, npcId) {
    if (stat === 'genitaliaSize' && npcId) {
        const npc = gameState.npcs[npcId];
        return npc?.body?.genitalia === 1 ? 'a penis' : 'a vagina';
    }
    const labels = {
        chest: 'breasts',
        butt: 'a butt',
        muscle: 'muscles',
        genitalia: 'genitals'
    };
    return labels[stat] || stat;
}

// Helper to generate natural-sounding desire labels (used in dialogue)
function getDesireLabel(stat, direction) {
    const bigger = direction === 'increase';
    const labels = {
        chest: bigger ? 'a bigger chest' : 'a smaller chest',
        butt: bigger ? 'a bigger butt' : 'a smaller butt',
        muscle: bigger ? 'more muscle' : 'less muscle',
        genitaliaSize: bigger ? 'bigger down there' : 'smaller down there',
        genitalia: 'a change down there'
    };
    return labels[stat] || `${bigger ? 'bigger' : 'smaller'} ${stat}`;
}

// ==========================================
// MIRA BESPOKE DESIRE SYSTEM
// ==========================================
// Mira is an "experimenter" who randomly wants different body shapes
// Not jealousy-driven - she just likes trying new things
// When Mira has extreme stats, other NPCs can compare to her

// (Mira experiment config and generateMiraExperimentDesire removed — Mira uses accidents now)

// (Old whim system removed â€” replaced by generateOffArchetypeWhim)

// (Old archetype/goddess generation removed â€” replaced by archetype-driven system)


// ==========================================
// ARCHETYPE-DRIVEN DESIRE GENERATION
// ==========================================

// Find a jealousy target â€” another NPC who is closer to targetValue for stat
// Returns npcId or null
function findJealousyTarget(npcId, stat, targetValue) {
    let eligibleOthers = getEligibleNpcs().filter(id => id !== npcId);
    if (eligibleOthers.length === 0) return null;

    const npc = gameState.npcs[npcId];
    const myValue = npc.body[stat];

    // For genitaliaSize, only compare against NPCs with the same genitalia type
    if (stat === 'genitaliaSize') {
        const myGenitalia = npc.body.genitalia;
        eligibleOthers = eligibleOthers.filter(id => gameState.npcs[id].body.genitalia === myGenitalia);
        if (eligibleOthers.length === 0) return null;
    }

    // NPCs closer to target than us
    const closerNpcs = eligibleOthers.filter(id => {
        const otherValue = gameState.npcs[id].body[stat];
        const otherDist = Math.abs(otherValue - targetValue);
        const myDist = Math.abs(myValue - targetValue);
        return otherDist < myDist;
    });

    if (closerNpcs.length === 0) {
        // Nobody closer — pick random eligible NPC with matching criteria
        return eligibleOthers[Math.floor(Math.random() * eligibleOthers.length)];
    }

    return closerNpcs[Math.floor(Math.random() * closerNpcs.length)];
}

// Generate a desire driven by the NPC's hidden archetype
// Picks stat with biggest gap from target, applies jealousy framing
function generateArchetypeDrivenDesire(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc || !npc.hiddenArchetype) return null;

    const gaps = calculateArchetypeGaps(npcId);

    // No gaps = archetype achieved
    if (gaps.length === 0) {
        handleArchetypeAchievement(npcId);
        return null;
    }

    // First desire should never be genital-related (save those for later)
    let eligibleGaps = gaps;
    if (!npc.lastDesireStat) {
        const nonGenitalGaps = gaps.filter(g => g.stat !== 'genitaliaSize' && g.stat !== 'genitalia');
        if (nonGenitalGaps.length > 0) eligibleGaps = nonGenitalGaps;
    }

    // Pick stat: 50% biggest gap, 50% random among other gaps
    let chosen;
    if (eligibleGaps.length === 1 || Math.random() < 0.5) {
        chosen = eligibleGaps[0]; // Biggest gap
    } else {
        // Random among non-biggest gaps
        chosen = eligibleGaps[1 + Math.floor(Math.random() * (eligibleGaps.length - 1))];
    }

    // Avoid same stat as last desire (unless it's the only gap)
    if (eligibleGaps.length > 1 && chosen.stat === npc.lastDesireStat) {
        const alternatives = eligibleGaps.filter(g => g.stat !== npc.lastDesireStat);
        if (alternatives.length > 0) {
            chosen = alternatives[0];
        }
    }

    // Find jealousy target for framing (used by tracker/gossip, not the label)
    const comparedTo = findJealousyTarget(npcId, chosen.stat, chosen.targetValue);

    // Label is always plain language — comparison framing belongs in tracker/gossip only
    const label = getDesireLabel(chosen.stat, chosen.direction);

    const desire = {
        stat: chosen.stat,
        target: chosen.targetValue,
        comparedTo: comparedTo,
        direction: chosen.direction,
        label: label,
        isArchetypeDriven: true,
        originalValue: npc.body[chosen.stat],
        generatedDay: gameState.day
    };

    npc.currentDesire = desire;
    npc.desireGeneratedDay = gameState.day;
    npc.desireFulfilledDay = null;
    npc.desireKnownToPlayer = false;
    npc.desireRevealed = false;
    saveState();

    return desire;
}

// Generate an off-archetype whim â€” small random deviation
function generateOffArchetypeWhim(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return null;

    // Pick random body stat (exclude genitalia â€” handled by proposal system)
    const bodyStats = ['chest', 'butt', 'muscle'];
    let candidates = bodyStats.filter(s => s !== npc.lastDesireStat);
    if (candidates.length === 0) candidates = bodyStats;

    const stat = candidates[Math.floor(Math.random() * candidates.length)];
    const currentValue = npc.body[stat];

    // Small random change (+1 or -1)
    let target;
    if (currentValue === 0) {
        target = 1;
    } else if (currentValue === 5) {
        target = 4;
    } else {
        target = Math.random() < 0.5 ? currentValue + 1 : currentValue - 1;
    }

    // Constraint: NPCs with penis cannot target chest 0
    if (stat === 'chest' && npc.body.genitalia === 1 && target === 0) {
        target = 1;
        if (currentValue === target) return null;
    }

    if (currentValue === target) return null;

    const direction = target > currentValue ? 'increase' : 'decrease';
    const comparedTo = findJealousyTarget(npcId, stat, target);

    const label = getDesireLabel(stat, direction);

    const desire = {
        stat: stat,
        target: target,
        comparedTo: comparedTo,
        direction: direction,
        label: label,
        isWhim: true,
        isOffArchetype: true,
        originalValue: currentValue,
        generatedDay: gameState.day
    };

    npc.currentDesire = desire;
    npc.desireGeneratedDay = gameState.day;
    npc.desireFulfilledDay = null;
    npc.desireKnownToPlayer = false;
    npc.desireRevealed = false;
    saveState();

    return desire;
}

// (generateMiraDesireWithArchetype removed — Mira uses accidents now)

// ==========================================
// GENITAL PROPOSAL SYSTEM
// ==========================================

// Create a pending genital type change proposal (requires player approval)
function createGenitalProposal(npcId, targetGenitalia, source) {
    const npc = gameState.npcs[npcId];
    if (!npc) return null;

    npc.pendingGenitalProposal = {
        type: 'genitalia',
        targetGenitalia: targetGenitalia,
        source: source, // 'archetype', 'homeostasis', 'whim'
        proposedDay: gameState.day
    };

    saveState();
    return npc.pendingGenitalProposal;
}

// Player approves genital proposal â€” converts to active desire
function approveGenitalProposal(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc || !npc.pendingGenitalProposal) return null;

    const proposal = npc.pendingGenitalProposal;
    const currentGenitalia = npc.body.genitalia;
    const targetGenitalia = proposal.targetGenitalia;

    const label = targetGenitalia === 1 ? 'to try having a penis' : 'to try going back to vagina';

    npc.currentDesire = {
        stat: 'genitalia',
        target: targetGenitalia,
        direction: targetGenitalia === 1 ? 'increase' : 'decrease',
        label: label,
        isGenitaliaChange: true,
        comparedTo: null,
        originalValue: currentGenitalia,
        generatedDay: gameState.day
    };

    npc.desireGeneratedDay = gameState.day;
    npc.desireFulfilledDay = null;
    npc.desireKnownToPlayer = true; // Player approved it
    npc.pendingGenitalProposal = null;

    saveState();

    // Update desire tracker UI
    if (typeof UI !== 'undefined' && UI.updateDesireTracker) {
        UI.updateDesireTracker();
    }

    return npc.currentDesire;
}

// Player denies genital proposal â€” clear and generate new desire immediately
function denyGenitalProposal(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return;

    npc.pendingGenitalProposal = null;
    saveState();

    // Generate a new desire immediately
    generateNpcDesire(npcId);
}

// Check genital homeostasis â€” soft pressure to maintain ~50% penis distribution
function checkGenitalHomeostasis(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return null;

    // Don't check if on genitalia cooldown
    if (npc.lastGenitaliaChangeDay &&
        (gameState.day - npc.lastGenitaliaChangeDay) < GENITALIA_CHANGE_CONFIG.cooldownDays) {
        return null;
    }

    // Count current penis NPCs (with female presentation â€” dickgirls)
    let penisCount = 0;
    for (const id of Object.keys(gameState.npcs)) {
        const other = gameState.npcs[id];
        if (other.body.genitalia === 1 && other.body.chest >= 1) penisCount++;
    }

    const currentGenitalia = npc.body.genitalia;

    // Target: 4-5 penis NPCs out of 10
    if (penisCount < 4 && currentGenitalia === 0) {
        // Too few penises â€” 2.5x chance of penis whim for vagina-havers
        if (Math.random() < GENITALIA_CHANGE_CONFIG.whimChance * 2.5) {
            // Constraint: must have chest >= 1 to become dickgirl
            if (npc.body.chest < 1) return null;
            return createGenitalProposal(npcId, 1, 'homeostasis');
        }
    } else if (penisCount > 5 && currentGenitalia === 1) {
        // Too many penises â€” 2.5x chance of vagina whim for penis-havers
        if (Math.random() < GENITALIA_CHANGE_CONFIG.whimChance * 2.5) {
            // Constraint: can't revert unless another penis-haver exists
            const otherPenisHavers = Object.keys(gameState.npcs).filter(id => {
                if (id === npcId) return false;
                if (!isNpcUnlocked(id)) return false;
                const other = gameState.npcs[id];
                return other.body.genitalia === 1 && other.body.chest >= 1;
            });
            if (otherPenisHavers.length === 0) return null;
            return createGenitalProposal(npcId, 0, 'homeostasis');
        }
    }

    return null;
}

// Generate a new desire based on hidden archetype system
function generateNpcDesire(npcId) {
    // Mira has no desire system — her body changes through delivery accidents
    if (npcId === 'mira') return null;

    // Male NPCs with chest 0 can still generate their first desire (to get feminized)
    // but unfeminized males shouldn't be in the jealousy comparison pool
    const npc_body = gameState.npcs[npcId]?.body;
    if (!npc_body) return null;
    const isMaleUnfeminized = npc_body.genitalia === 1 && npc_body.chest < 1;
    if (!isEligibleForJealousy(npcId) && !isMaleUnfeminized) return null;

    const npc = gameState.npcs[npcId];
    if (!npc) return null;

    // If pending genital proposal, wait for player response
    if (npc.pendingGenitalProposal) return null;

    // If in archetype satisfaction period, wait it out
    if (npc.archetypeSatisfactionEnd && gameState.day < npc.archetypeSatisfactionEnd) {
        return null;
    }

    // If archetype satisfaction just ended, drift to new archetype
    if (npc.archetypeSatisfactionEnd && gameState.day >= npc.archetypeSatisfactionEnd) {
        // Push completed archetype to history
        if (npc.hiddenArchetype && npc.archetypeAchieved) {
            npc.archetypeHistory.push({
                id: npc.hiddenArchetype,
                achievedDay: npc.archetypeAchievedDay
            });
        }
        // Clear and reassign
        npc.hiddenArchetype = null;
        npc.archetypeAchieved = false;
        npc.archetypeAchievedDay = null;
        npc.archetypeSatisfactionEnd = null;
        npc.archetypeJustAchieved = false;
        npc.goddessRevealed = false;
        // Goddess unlocks after 2 completed archetypes, 20% chance
        if (npc.archetypeHistory.length >= 2 && Math.random() < 0.20) {
            npc.hiddenArchetype = 'goddess';
        } else {
            assignHiddenArchetype(npcId);
        }
    }

    // If no hidden archetype, assign one
    if (!npc.hiddenArchetype) {
        assignHiddenArchetype(npcId);
    }

    // ~10% chance for off-archetype whim
    if (Math.random() < 0.10) {
        const whim = generateOffArchetypeWhim(npcId);
        if (whim) return whim;
    }

    // Check genital homeostasis â€” may create pending proposal
    const homeostasisProposal = checkGenitalHomeostasis(npcId);
    if (homeostasisProposal) {
        return null; // Waiting for player approval
    }

    // Main path: archetype-driven desire
    return generateArchetypeDrivenDesire(npcId);
}

// (generateJealousyDesire removed â€” replaced by generateArchetypeDrivenDesire with jealousy framing)

// Refresh desires for all eligible NPCs if needed
function refreshAllNpcDesires() {
    for (const npcId of Object.keys(gameState.npcs)) {
        if (shouldRefreshDesire(npcId)) {
            generateNpcDesire(npcId);
        }
    }
}

// Get the current desire for an NPC (for display in codex)
function getNpcCurrentDesire(npcId) {
    const npc = gameState.npcs[npcId];
    return npc?.currentDesire || null;
}

// Ensure NPC has a desire if they meet desireReveal threshold
// Called when viewing character page or when desireHint chat is shown
// This fixes the issue where NPCs have no desire on day 1 even though they meet desireReveal
function ensureNpcHasDesire(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return null;

    // Already has a desire - nothing to do
    if (npc.currentDesire) return npc.currentDesire;

    // In satisfaction period - don't generate new desire
    if (isNpcSatisfied(npcId)) return null;

    // Check if NPC meets desireReveal threshold
    const thresholds = NPC_TRUST_THRESHOLDS[npcId];
    if (!thresholds) return null;
    if (npc.trust < thresholds.desireReveal) return null;

    // Generate a desire for this NPC
    const desire = generateNpcDesire(npcId);
    if (desire) {
        // Mark desire as not yet revealed to player through dialogue
        npc.desireKnownToPlayer = false;
        saveState();
    }
    return desire;
}

// Check if player knows about NPC's current desire
function isDesireKnownToPlayer(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc || !npc.currentDesire) return false;
    return npc.desireKnownToPlayer === true;
}

// Reveal NPC's desire to player and return dialogue text
// Called from greeting/chat scenes when NPC shares their desire
function revealNpcDesireToPlayer(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc || !npc.currentDesire) return null;

    // Already known
    if (npc.desireKnownToPlayer) return null;

    // Mark as known
    npc.desireKnownToPlayer = true;
    saveState();

    // Update desire tracker immediately
    if (typeof UI !== 'undefined' && UI.updateDesireTracker) {
        UI.updateDesireTracker();
    }

    // Generate reveal dialogue based on desire type
    return generateDesireRevealDialogue(npcId, npc.currentDesire);
}

// Generate dialogue for when NPC reveals their desire
function generateDesireRevealDialogue(npcId, desire) {
    if (!desire || !desire.stat) return null;

    const npcName = getNpcDisplayName(npcId);
    const stat = desire.stat;
    const target = desire.target;
    const npcBody = gameState.npcs[npcId]?.body;
    if (!npcBody) return null;

    const currentVal = npcBody[stat] ?? 0;
    const direction = target > currentVal ? 'increase' : 'decrease';

    // Jealousy-based desire (comparing to another NPC)
    // Note: desire uses trackingNpc or comparedTo depending on source
    const comparedToNpc = desire.comparedTo || desire.trackingNpc;
    if (comparedToNpc) {
        // Try new dialogue system first (desire-dialogues.js)
        if (typeof getDesireRevealDialogue === 'function') {
            const targetNpc = gameState.npcs[comparedToNpc];
            if (targetNpc) {
                // Check if target's stat is their natural/base value
                const targetStatValue = targetNpc.body[stat] ?? 0;
                const targetNaturalValue = targetNpc.naturalBody?.[stat] ?? targetStatValue;
                const isBaseValue = targetStatValue === targetNaturalValue;

                // Check if observer trust >= intimate threshold
                const thresholds = NPC_TRUST_THRESHOLDS[npcId];
                const npcTrust = gameState.npcs[npcId]?.trust ?? 0;
                const isIntimate = thresholds && npcTrust >= thresholds.intimate;

                // Get stat values and genitalia types
                const observerStatValue = npcBody[stat] ?? 0;
                const targetGenitaliaType = targetNpc.body.genitalia ?? 0;
                const observerGenitaliaType = npcBody.genitalia ?? 0;

                const dialogue = getDesireRevealDialogue(
                    npcId,
                    comparedToNpc,
                    stat,
                    isBaseValue,
                    isIntimate,
                    targetStatValue,
                    observerStatValue,
                    targetGenitaliaType,
                    observerGenitaliaType,
                    direction
                );

                if (dialogue) {
                    return dialogue;
                }
            }
        }

        // Fallback to generic dialogue
        const otherName = getNpcDisplayName(comparedToNpc) || 'someone';
        const targetNpc = gameState.npcs[comparedToNpc];
        const targetGenitalia = targetNpc?.body?.genitalia ?? 0;
        const observerNpc = gameState.npcs[npcId];
        const observerGenitalia = observerNpc?.body?.genitalia ?? 0;

        // Build genitaliaSize labels based on OBSERVER's equipment type (what they want for themselves)
        const genitalSizeLabels = observerGenitalia === 1
            ? { increase: 'a bigger cock', decrease: 'a more modest cock' }
            : { increase: 'a more prominent pussy', decrease: 'a more subtle pussy' };

        const statLabels = {
            chest: { increase: 'bigger breasts', decrease: 'a smaller chest' },
            butt: { increase: 'a bigger butt', decrease: 'a smaller rear' },
            muscle: { increase: 'more muscles', decrease: 'to be less muscular' },
            genitalia: { increase: observerGenitalia === 1 ? 'a pussy' : 'a cock', decrease: observerGenitalia === 1 ? 'a pussy' : 'a cock' },
            genitaliaSize: genitalSizeLabels
        };

        // Stat-specific descriptions for what the target has (what they're envying)
        const statDescriptions = {
            chest: 'nice curves',
            butt: 'a lovely figure',
            muscle: 'impressive strength',
            genitalia: 'interesting equipment',
            genitaliaSize: targetGenitalia === 1 ? 'an impressive bulge' : 'appealing proportions down there'
        };

        const label = statLabels[stat]?.[direction] || desire.label || 'something different';
        const statDesc = statDescriptions[stat] || 'great proportions';
        const firstName = otherName.includes(' ') ? otherName.split(' ')[0] : otherName;

        return `${npcName} glances away, something wistful in her expression.\n\n"I've been thinking... ${otherName} has such ${statDesc}. I wish I had ${label} like ${firstName}..."`;
    }

    // Whim desire
    if (desire.isWhim) {
        const whimDialogues = {
            chest: {
                increase: `"I woke up today thinking... wouldn't it be nice to have bigger breasts? Just a whim, I suppose..."`,
                decrease: `"I've been feeling like my chest is a bit much lately. Wouldn't mind if it were smaller..."`
            },
            butt: {
                increase: `"I've been wanting a bigger butt lately. Don't ask why, it's just a feeling..."`,
                decrease: `"My rear feels a bit too prominent. I wouldn't mind slimming it down..."`
            },
            muscle: {
                increase: `"I've been wanting to get stronger. Build some muscle, you know?"`,
                decrease: `"I feel like I'm getting too bulky. Wouldn't mind being a bit softer..."`
            }
        };
        const dialogue = whimDialogues[stat]?.[direction];
        if (dialogue) {
            return `*${npcName} shifts, looking a bit embarrassed.*\n\n${dialogue}`;
        }
    }

    // Generic desire with label
    if (desire.label) {
        return `*${npcName} looks at you with a hint of vulnerability.*\n\n"I've been thinking... I want ${desire.label.toLowerCase()}. Could your workshop help with that?"`;
    }

    return null;
}


// (Target profile, flash, and jealousy dialogue systems removed â€” replaced by hidden archetype system)

// ==========================================
// DESIRE TEXT GENERATION SYSTEM
// ==========================================

// ==========================================
// DEVICE SCALE EDUCATION SYSTEM
// ==========================================
// NPCs use qualitative terms for desires by default
// Only reference numeric values after device education

const DESIRE_QUALITATIVE_TERMS = {
    // Increase terms (relative to current)
    '+1': ['a bit bigger', 'slightly larger', 'a little more', 'somewhat more'],
    '+2': ['much bigger', 'significantly larger', 'noticeably more', 'considerably more'],
    '+3': ['way bigger', 'dramatically larger', 'a lot more', 'much much bigger'],
    'max': ['as big as possible', 'the maximum', 'huge', 'absolutely massive', 'the biggest'],
    // Decrease terms
    '-1': ['a bit smaller', 'slightly less', 'toned down a little', 'reduced a bit'],
    '-2': ['much smaller', 'significantly less', 'notably reduced', 'quite a bit less'],
    '-3': ['way smaller', 'dramatically reduced', 'much much smaller'],
    'natural': ['back to normal', 'how I was originally', 'my natural size', 'the way I used to be']
};

// Get qualitative description for a desire target relative to current
function getDesireDescription(current, target, naturalValue) {
    // Check for return to natural
    if (target === naturalValue) {
        const terms = DESIRE_QUALITATIVE_TERMS['natural'];
        return terms[Math.floor(Math.random() * terms.length)];
    }

    const diff = target - current;

    // Maximum value
    if (target === 5) {
        const terms = DESIRE_QUALITATIVE_TERMS['max'];
        return terms[Math.floor(Math.random() * terms.length)];
    }

    // Increases
    if (diff >= 3) {
        const terms = DESIRE_QUALITATIVE_TERMS['+3'];
        return terms[Math.floor(Math.random() * terms.length)];
    }
    if (diff === 2) {
        const terms = DESIRE_QUALITATIVE_TERMS['+2'];
        return terms[Math.floor(Math.random() * terms.length)];
    }
    if (diff === 1) {
        const terms = DESIRE_QUALITATIVE_TERMS['+1'];
        return terms[Math.floor(Math.random() * terms.length)];
    }

    // Decreases
    if (diff === -1) {
        const terms = DESIRE_QUALITATIVE_TERMS['-1'];
        return terms[Math.floor(Math.random() * terms.length)];
    }
    if (diff === -2) {
        const terms = DESIRE_QUALITATIVE_TERMS['-2'];
        return terms[Math.floor(Math.random() * terms.length)];
    }
    if (diff <= -3) {
        const terms = DESIRE_QUALITATIVE_TERMS['-3'];
        return terms[Math.floor(Math.random() * terms.length)];
    }

    // No change or unknown
    return 'different';
}

// Get descriptive text for what an NPC wants (uses qualitative terms)
function getDesireWantText(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc?.currentDesire) return null;

    const desire = npc.currentDesire;
    const stat = getStatDisplayName(desire.stat, true);
    const current = npc.body[desire.stat];
    const target = desire.target;
    const natural = npc.naturalBody[desire.stat];

    const description = getDesireDescription(current, target, natural);

    return `I want my ${stat} to be ${description}`;
}

// Check if a desire is nostalgic (wanting to return to original stat)
function isDesireNostalgic(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc?.currentDesire) return false;
    const desire = npc.currentDesire;
    return desire.target === npc.naturalBody[desire.stat];
}

// (MIRA_EXPERIMENT_TEXTS removed — Mira uses accidents now)

// Nostalgic text - when NPC wants to return to their original stat
const NOSTALGIC_DESIRE_TEXTS = {
    barret: {
        chest: [
            '"These are great for tips, but..." She shrugs. "I miss not having constant back pain. The old size was better for actual work."',
            '"Sometimes I think about when I could actually see my feet while walking," she says dryly.'
        ],
        butt: [
            '"The barstools were more comfortable before," she admits. "And fitting through the gap behind the bar was easier."'
        ]
    },
    della: {
        chest: [
            '"Baking is harder now," Della admits, gesturing at herself. "I keep bumping into things. I miss my old figure."',
            '"The apron strings don\'t tie the same anymore," she says wistfully. "I had a nice shape before all this."'
        ],
        butt: [
            '"My kitchen is small," she explains. "I keep knocking things off counters when I turn around. Less was more."'
        ],
        muscle: [
            '"I got too strong for delicate pastry work," she admits. "I keep crushing the dough."'
        ]
    },
    vessa: {
        chest: [
            '"The spirits don\'t care about appearances," Vessa muses. "I prefer something more... ethereal. Less earthly."',
            '"Bigger isn\'t always better for my work. I need to move quietly, blend with shadows."'
        ],
        butt: [
            '"Balance is important for ritual work," *she explains.* "Too much weight in one place disrupts my center."'
        ],
        muscle: [
            '"Herbalism requires delicacy, not strength. I was better suited to my craft before."'
        ]
    },
    mrs_thornwick: {
        chest: [
            '"At my position, being too noticeable can be... politically complicated," *she says carefully.* "Subtlety has advantages."',
            '"The council chairs were measured for my old proportions," *she admits.* "Now I barely fit."'
        ],
        muscle: [
            '"Authority comes from presence, not size," *she observes.* "I was more... dignified before."'
        ]
    },
    lenna: {
        chest: [
            '"The library aisles are narrow," Lenna explains, adjusting her glasses. "I keep brushing against the shelves now."',
            '"Books are meant to be noticed, not librarians," *she says quietly.* "I was more comfortable before."'
        ],
        butt: [
            '"The reading chairs don\'t fit the same," *she admits with a blush.* "It\'s distracting."'
        ]
    },
    fiona: {
        chest: [
            '"I was fine before," Fiona says quietly. "Not everyone needs to be noticed..."',
            '"Smaller was easier," *she admits.* "Less attention. Easier to slip away."'
        ],
        muscle: [
            '"I got by on cleverness, not strength," *she says.* "I don\'t need to be strong."'
        ]
    }
};

// Jealous text - when NPC wants to match someone else
const JEALOUS_DESIRE_TEXTS = {
    generic: {
        chest: [
            '"Look at {compared}\'s chest," *{observer} sighs.* "I wish mine looked like that."',
            '"I can\'t help but notice {compared}\'s figure... that\'s exactly what I wish I had."',
            '*{observer} sighs wistfully.* "I\'d give anything for a chest like {compared}\'s."'
        ],
        butt: [
            '"See how {compared} fills out those clothes? That\'s what I want."',
            '"I catch myself staring at {compared}\'s rear. It\'s exactly what I wish I had."',
            '"Every time {compared} walks by, I think about how much better her curves are than mine."'
        ],
        muscle: [
            '"{compared} has such nice definition," *{observer} says.* "I want arms like that."',
            '"Look at how toned {compared} is. That\'s the body I want."',
            '"Every time I see {compared}, I think about getting more fit."'
        ]
    },
    mira: {
        chest: [
            '"Barret\'s tips must be AMAZING with a chest like that," Mira says enviously. "I want in on that action!"',
            '"Have you SEEN Della? She\'s got the kind of chest that makes people buy extra pastries."'
        ]
    },
    lenna: {
        chest: [
            '"Mrs. Thornwick carries herself with such... presence," Lenna whispers. "I wish I had that kind of figure."',
            '"Barret gets so much attention at the tavern," *she observes academically.* "It must be nice to be... noticed."'
        ]
    },
    vessa: {
        butt: [
            '"Della has such lovely curves," Vessa muses. "The men at the bakery certainly notice her."'
        ]
    }
};

// Competitive text - when NPC wants to exceed someone else
const COMPETITIVE_DESIRE_TEXTS = {
    generic: {
        chest: [
            '"I don\'t want to just match {compared}," *{observer} says, eyes gleaming.* "I want to be BIGGER."',
            '"Why should {compared} get all the attention?" *{observer} asks.* "I want MORE than she has."',
            '*{observer}\'s eyes flash with determination.* "Second place isn\'t good enough. I want the biggest chest in town."'
        ],
        butt: [
            '"{compared} thinks she\'s got curves?" *{observer} scoffs.* "I\'ll show her what REAL curves look like."',
            '"I want everyone looking at MY rear, not {compared}\'s."'
        ],
        muscle: [
            '"I could be stronger than {compared}," *{observer} says confidently.* "I WILL be stronger."',
            '"Why should {compared} be the strong one? I want more muscle than her."'
        ]
    },
    barret: {
        chest: [
            '"Della thinks she\'s the curvy one at the bakery?" Barret laughs. "I\'ll give the tavern patrons something to REALLY stare at."'
        ],
        butt: [
            '"I want everyone coming to MY establishment for the view, not somewhere else."'
        ]
    },
    fiona: {
        chest: [
            '"I\'m tired of being the small one," Fiona says with surprising intensity. "I want to be the one people notice."'
        ],
        muscle: [
            '"Everyone underestimates me because of my size. I want to be strong. REALLY strong."'
        ]
    }
};

// Shrink text - when NPC wants to reduce a stat (not nostalgic)
// Shrink texts organized by personality type and magnitude
const SHRINK_DESIRE_TEXTS = {
    // Generic fallback texts
    generic: {
        chest: [
            '"Honestly? I\'d like to be a bit smaller up top," *{observer} admits.* "Less... attention."',
            '"Sometimes bigger isn\'t better. I\'d like something more practical."',
            '"I\'ve had my fun with the bigger look. Time for something more reasonable."'
        ],
        butt: [
            '"I think I\'d like less back there," *{observer} says.* "Chairs would be more comfortable."',
            '"A bit less would suit me better. Easier to move around."'
        ],
        muscle: [
            '"I don\'t need to be this strong," *{observer} admits.* "Something more delicate would suit me."'
        ]
    },

    // PRUDE type - small, modest reductions for propriety
    mrs_thornwick: {
        chest: [
            '"A lady of my position shouldn\'t be so... prominent," *she says primly.* "Perhaps something more modest."',
            '"I\'ve noticed the council members staring. It\'s quite improper. I should be more... understated."',
            '"At my age and position, subtlety is a virtue," Mrs. Thornwick says. "Less is often more."'
        ],
        muscle: [
            '"A dignified bearing doesn\'t require such... bulk," *she says carefully.*'
        ]
    },
    lenna: {
        chest: [
            '"People keep looking at me instead of the books," Lenna whispers, mortified. "I\'d rather disappear."',
            'She hunches slightly. "The aisles are narrow. And the patrons are... distracting."',
            '"I preferred when no one noticed me at all. Can you help with that?"'
        ],
        butt: [
            '"The reading chairs are so uncomfortable now," *she admits with a deep blush.* "Just a little less..."'
        ],
        muscle: [
            '"I don\'t need to be strong. I need to be invisible."'
        ]
    },

    // PRACTICAL type - shrinks for functional reasons
    aldric: {
        muscle: [
            '"Can\'t fit through the forge door properly anymore," Aldric grunts. "Need to trim down for work."',
            '"Too bulky for precision hammering now. Efficiency matters."'
        ],
        chest: [
            '"Getting in the way of my swing," *he says matter-of-factly.* "Impractical."'
        ]
    },
    della: {
        chest: [
            '"My back\'s been aching something terrible," Della admits. "Maybe a bit less would help."',
            '"I keep knocking flour off the counter," *she laughs.* "Time to scale back a little."'
        ],
        butt: [
            '"My kitchen is too small for all this," *she gestures behind her.* "Practical concerns, dear."'
        ]
    },
    fiona: {
        chest: [
            '"Being bigger made me easier to spot," Fiona mutters. "I need to slip away unnoticed."',
            '"Stealth is survival. Less to notice means less trouble."'
        ],
        muscle: [
            '"Strength is good, but stealth is better. I was faster before."'
        ]
    },

    // ADVENTUROUS type - dramatic experimental shrinks
    vessa: {
        chest: [
            '"I want to know what it feels like to be completely flat," Vessa says with genuine curiosity. "An experiment in sensation."',
            '"The spirits care nothing for physical form. Let me experience that emptiness."',
            '"I\'ve been curved. Now I wish to be... angular. Ethereal. Empty."'
        ],
        butt: [
            '"I\'ve been curved for so long. What would it be like to be... angular? Minimal?"',
            '"Let\'s try the opposite extreme. For the experience."'
        ],
        muscle: [
            '"Strength is one experience. Frailty is another. I wish to understand both."'
        ]
    },
    barret: {
        chest: [
            '"I\'ve been buxom for YEARS!" Barret laughs. "Let\'s try the opposite. Flat as a board. Just for fun!"',
            '"Variety is the spice of life, darling. Give me something completely different."',
            '"The regulars would be SO confused if I walked in flat. That alone is worth it!"'
        ],
        butt: [
            '"What if I had NO curves? Wouldn\'t that be hilarious? The patrons would be so confused!"',
            '"I want to try having nothing back there. Just once. For the experience."'
        ]
    },
    corwin: {
        chest: [
            '"The novelty has worn off. Let\'s try the other extreme - completely flat."',
            '"There\'s a market advantage to appearing... delicate. Less threatening."'
        ],
        muscle: [
            '"Strength can intimidate customers. Sometimes appearing weak is more profitable."'
        ]
    },

};

// Generate desire reveal text based on context
function getDesireRevealText(observerId, comparedToId, desire) {
    const npc = gameState.npcs[observerId];
    const config = NPC_DESIRE_CONFIG[observerId];
    const observerName = getNpcDisplayName(observerId);
    const comparedName = comparedToId ? getNpcDisplayName(comparedToId) : '';
    const stat = desire.stat;

    // Try new jealousy dialogue system (desire-dialogues.js)
    if (comparedToId && typeof getDesireRevealDialogue === 'function') {
        const targetNpc = gameState.npcs[comparedToId];
        if (targetNpc) {
            // Check if target's stat is their natural/base value
            const targetStatValue = targetNpc.body[stat] ?? 0;
            const targetNaturalValue = targetNpc.naturalBody?.[stat] ?? targetStatValue;
            const isBaseValue = targetStatValue === targetNaturalValue;

            // Check if observer trust >= intimate threshold
            const thresholds = NPC_TRUST_THRESHOLDS[observerId];
            const isIntimate = thresholds && npc.trust >= thresholds.intimate;

            // Get stat values and genitalia types
            const observerStatValue = npc.body[stat] ?? 0;
            const targetGenitaliaType = targetNpc.body.genitalia ?? 0;
            const observerGenitaliaType = npc.body.genitalia ?? 0;

            // Use the desire's actual target to determine direction
            const desireDirection = desire.target > observerStatValue ? 'increase' : 'decrease';

            const dialogue = getDesireRevealDialogue(
                observerId,
                comparedToId,
                stat,
                isBaseValue,
                isIntimate,
                targetStatValue,
                observerStatValue,
                targetGenitaliaType,
                observerGenitaliaType,
                desireDirection
            );

            if (dialogue) {
                return dialogue;
            }
        }
    }

    // Check if nostalgic (wanting original value back) - use flag if present, otherwise calculate
    const isNostalgic = desire.isNostalgic !== undefined
        ? desire.isNostalgic
        : desire.target === npc.naturalBody[stat];

    if (isNostalgic) {
        const npcTexts = NOSTALGIC_DESIRE_TEXTS[observerId];
        if (npcTexts && npcTexts[stat] && npcTexts[stat].length > 0) {
            return npcTexts[stat][Math.floor(Math.random() * npcTexts[stat].length)];
        }
        // Fallback generic nostalgic
        return `*${observerName} sighs.* "I miss how my ${getStatDisplayName(stat, true)} used to be. The original size suited me better."`;
    }

    // Competitive (wanting to exceed)
    if (desire.direction === 'exceed') {
        // Check character-specific first
        const npcTexts = COMPETITIVE_DESIRE_TEXTS[observerId];
        if (npcTexts && npcTexts[stat] && npcTexts[stat].length > 0) {
            return npcTexts[stat][Math.floor(Math.random() * npcTexts[stat].length)]
                .replace(/{observer}/g, observerName)
                .replace(/{compared}/g, comparedName);
        }
        // Generic
        const genericTexts = COMPETITIVE_DESIRE_TEXTS.generic[stat];
        if (genericTexts && genericTexts.length > 0) {
            return genericTexts[Math.floor(Math.random() * genericTexts.length)]
                .replace(/{observer}/g, observerName)
                .replace(/{compared}/g, comparedName);
        }
    }

    // Jealous (wanting to match)
    if (desire.direction === 'match') {
        // Check character-specific first
        const npcTexts = JEALOUS_DESIRE_TEXTS[observerId];
        if (npcTexts && npcTexts[stat] && npcTexts[stat].length > 0) {
            return npcTexts[stat][Math.floor(Math.random() * npcTexts[stat].length)]
                .replace(/{observer}/g, observerName)
                .replace(/{compared}/g, comparedName);
        }
        // Generic
        const genericTexts = JEALOUS_DESIRE_TEXTS.generic[stat];
        if (genericTexts && genericTexts.length > 0) {
            return genericTexts[Math.floor(Math.random() * genericTexts.length)]
                .replace(/{observer}/g, observerName)
                .replace(/{compared}/g, comparedName);
        }
    }

    // Shrink (wanting to reduce)
    if (desire.direction === 'shrink') {
        // Check character-specific first
        const npcTexts = SHRINK_DESIRE_TEXTS[observerId];
        if (npcTexts && npcTexts[stat] && npcTexts[stat].length > 0) {
            return npcTexts[stat][Math.floor(Math.random() * npcTexts[stat].length)]
                .replace(/{observer}/g, observerName);
        }
        // Generic
        const genericTexts = SHRINK_DESIRE_TEXTS.generic[stat];
        if (genericTexts && genericTexts.length > 0) {
            return genericTexts[Math.floor(Math.random() * genericTexts.length)]
                .replace(/{observer}/g, observerName);
        }
    }

    // Ultimate fallback
    return `*${observerName} looks wistful.* "I wish my ${getStatDisplayName(stat, true)} was different..."`;
}

// ==========================================
// TRANSFORMATION COMMENT SYSTEM
// ==========================================

// Comments for when transformation moves toward desire
const DESIRE_PROGRESS_COMMENTS = {
    mira: {
        chest: ['"Yes! More! Keep going!"', '"This is exactly what I wanted!"', 'Her eyes light up with excitement. "I can feel it growing!"'],
        butt: ['"Ooh, I can feel it!" She wiggles experimentally.', '"Yes, more curves!"'],
        muscle: ['"I feel stronger already!"', '"This is amazing!"']
    },
    lenna: {
        chest: ['"Oh my..." She looks down, blushing furiously.', 'She gasps softly. "It\'s really happening..."'],
        butt: ['She shifts in place, face red. "I can... feel the difference."'],
        muscle: ['"I feel... capable."']
    },
    barret: {
        chest: ['"Now THAT\'S what I\'m talking about!"', 'She grins widely. "The tips are going to be GREAT!"'],
        butt: ['"Oh yes! Give me more of that!"', '"The regulars are going to love this!"']
    },
    mrs_thornwick: {
        chest: ['She maintains composure, but her eyes betray excitement.', '"This is... acceptable. Perhaps continue."'],
        muscle: ['"I feel more... authoritative."']
    },
    della: {
        butt: ['She giggles. "Oh my, that\'s quite something!"', '"I haven\'t felt this good in years!"'],
        muscle: ['"Good for kneading dough!"']
    },
    vessa: {
        chest: ['"Interesting sensation..."', '"The transformation energy feels... pleasant."'],
        butt: ['"My balance is shifting. Fascinating."'],
        muscle: ['"Power flows through me."']
    },
    fiona: {
        chest: ['She looks down with wide eyes. "I... I have..."', '"People might actually notice me now."'],
        muscle: ['"I feel... less vulnerable."', '"Stronger. Good."']
    },
    generic: {
        chest: ['"It\'s working!"', '"I can feel the change!"'],
        butt: ['"The transformation is working!"'],
        muscle: ['"I feel the difference!"']
    }
};

// Comments for when desire is fulfilled
const DESIRE_COMPLETE_COMMENTS = {
    mira: {
        chest: ['"PERFECT! This is exactly what I wanted!"', '"YES! Finally! I could kiss you!"', '"I look just like I imagined!"'],
        butt: ['"My courier pants are going to fit SO differently now!"'],
        muscle: ['"I feel amazing!"']
    },
    lenna: {
        chest: ['"I... I match her now," *she whispers, amazed.* "I never thought..."', 'She stares at herself in disbelief. "Is this really me?"'],
        butt: ['She sits down experimentally. "It\'s... comfortable."'],
        muscle: ['"The heavy books won\'t be a problem anymore."']
    },
    barret: {
        chest: ['"Now THIS is a proper barmaid figure!"', '"Wait till the evening rush sees THESE!"'],
        butt: ['"PERFECT! Nobody\'s going to forget this view!"']
    },
    mrs_thornwick: {
        chest: ['She examines herself with barely concealed satisfaction. "This will do nicely."', '"Dignified, yet... impressive."'],
        muscle: ['"Authority and presence. Excellent."']
    },
    della: {
        butt: ['"Oh my! The customers won\'t know where to look!"', 'She twirls experimentally. "I feel twenty years younger!"'],
        muscle: ['"Those heavy flour bags won\'t be trouble anymore!"']
    },
    vessa: {
        chest: ['"The form I desired. Thank you."', '"Balance achieved."'],
        butt: ['"Symmetry restored."'],
        muscle: ['"Power contained within."']
    },
    fiona: {
        chest: ['"I actually look like... someone," *she says quietly, almost awed.*'],
        muscle: ['"No one\'s going to push me around now."']
    },
    generic: {
        chest: ['"That\'s exactly what I wanted!"'],
        butt: ['"Perfect! Thank you!"'],
        muscle: ['"Just right!!"']
    }
};

// Comments for when transformation overshoots desire
const DESIRE_OVERSHOOT_COMMENTS = {
    mira: {
        chest: ['"Wait, this might be too much... actually no, keep going! MORE is always better!"', '"Okay that\'s bigger than I asked for but I\'m NOT complaining!"'],
        butt: ['"That\'s... more than I expected! But I like it!"'],
        muscle: ['"Whoa, I\'m getting BUFF!"']
    },
    lenna: {
        chest: ['"This is more than I wanted!" She squeaks, face crimson. "But... maybe it\'s okay..."', '"Oh dear, this is quite... prominent..."'],
        butt: ['She looks behind her with wide eyes. "That\'s... substantial."'],
        muscle: ['"I didn\'t ask for this much!"']
    },
    barret: {
        chest: ['"Oh WOW! Even better than I imagined!"', '"The tavern is going to need new uniforms!"'],
        butt: ['"WHOA! That\'s a LOT of curve!"']
    },
    mrs_thornwick: {
        chest: ['"This is... beyond what I asked for," *she says, not sounding upset.*', '"Perhaps slightly excessive, but... acceptable."'],
        muscle: ['"Rather more than intended."']
    },
    della: {
        butt: ['"Oh my goodness!" She laughs. "That\'s quite the behind!"'],
        muscle: ['"I might crush the pastries!"']
    },
    vessa: {
        chest: ['"Excess can be its own form of balance..."', '"More than requested, but not unwelcome."'],
        butt: ['"An abundance. Interesting."'],
        muscle: ['"Perhaps too much power..."']
    },
    fiona: {
        chest: ['"This is... a lot," *she says, looking uncertain.*'],
        muscle: ['"I didn\'t need THIS much strength..."']
    },
    generic: {
        chest: ['"That\'s more than I expected!"'],
        butt: ['"Whoa, that\'s a lot!"'],
        muscle: ['"That\'s quite strong!"']
    }
};

// Comments for wrong direction (moving away from desire)
const DESIRE_WRONG_DIRECTION_COMMENTS = {
    generic: {
        increase: ['"Wait, that\'s not what I wanted..."', '"Um, could we go the other direction?"', '"I wanted less, not more..."'],
        decrease: ['"No, I wanted bigger!"', '"Wait, stop! Wrong way!"', '"I wanted more, not less!"']
    }
};

// Get transformation comment based on NPC desire and transformation result
function getTransformationComment(npcId, stat, direction, oldValue, newValue) {
    const npc = gameState.npcs[npcId];
    const desire = npc?.currentDesire;

    // No desire or different stat - no comment
    if (!desire || desire.stat !== stat) return null;

    const target = desire.target;

    // Check if we've reached exactly the target
    if (newValue === target) {
        const npcComments = DESIRE_COMPLETE_COMMENTS[npcId];
        const comments = npcComments?.[stat] || DESIRE_COMPLETE_COMMENTS.generic[stat] || [];
        if (comments.length > 0) {
            return { type: 'complete', text: comments[Math.floor(Math.random() * comments.length)] };
        }
    }

    // Check if we've overshot the target
    const wasCloser = Math.abs(oldValue - target) > Math.abs(newValue - target);
    const nowPastTarget = (direction === 'increase' && newValue > target) ||
                          (direction === 'decrease' && newValue < target);

    if (nowPastTarget && newValue !== target) {
        const npcComments = DESIRE_OVERSHOOT_COMMENTS[npcId];
        const comments = npcComments?.[stat] || DESIRE_OVERSHOOT_COMMENTS.generic[stat] || [];
        if (comments.length > 0) {
            return { type: 'overshoot', text: comments[Math.floor(Math.random() * comments.length)] };
        }
    }

    // Check if we're moving in the right direction (toward target)
    if (wasCloser) {
        const npcComments = DESIRE_PROGRESS_COMMENTS[npcId];
        const comments = npcComments?.[stat] || DESIRE_PROGRESS_COMMENTS.generic[stat] || [];
        if (comments.length > 0) {
            return { type: 'progress', text: comments[Math.floor(Math.random() * comments.length)] };
        }
    }

    // Moving wrong direction
    const wrongComments = DESIRE_WRONG_DIRECTION_COMMENTS.generic[direction] || [];
    if (wrongComments.length > 0 && Math.random() < 0.5) {  // Only 50% chance to comment on wrong direction
        return { type: 'wrong', text: wrongComments[Math.floor(Math.random() * wrongComments.length)] };
    }

    return null;
}

// ==========================================
// GREETING DESIRE HINTS
// ==========================================

// Hints NPCs drop about their desires during greetings
const DESIRE_GREETING_HINTS = {
    mira: {
        chest: [
            'Her eyes flicker to your chest, then away. "So, um... about those devices..."',
            '"I keep thinking about what you could do for me. You know... up here." She gestures vaguely.'
        ],
        butt: ['"These pants are getting boring. Maybe something that shows off more curve?"'],
        muscle: ['"Been thinking I should get stronger for my runs..."']
    },
    lenna: {
        chest: [
            'She fidgets with her glasses. "I\'ve been reading about transformation magic. Purely academic interest."',
            '"The texts on body modification are... fascinating. Theoretically."'
        ],
        butt: ['"The chairs here are so uncomfortable. I wonder if... never mind."'],
        muscle: ['"These book stacks are so heavy..."']
    },
    barret: {
        chest: ['"You know what would really improve business? If I had more to show off up front."', '"Tips have been good, but they could be better. If you know what I mean."'],
        butt: ['"I want the kind of curves that make people drop their drinks."']
    },
    mrs_thornwick: {
        chest: ['She adjusts her dress. "One must maintain appearances. Though sometimes I wonder about... enhancements."'],
        muscle: ['"Authority requires presence. Physical presence."']
    },
    della: {
        butt: ['"My old dancing days..." She sighs wistfully. "I used to have such lovely curves."'],
        muscle: ['"This flour is getting heavier every year. Or maybe I\'m getting weaker."']
    },
    vessa: {
        chest: ['"The physical form is merely a vessel. But vessels can be... reshaped."'],
        butt: ['"Balance in all things. Including the body."'],
        muscle: ['"Power comes in many forms. Some physical."']
    },
    fiona: {
        chest: ['She looks at herself. "Sometimes I wish people could see me. Really see me."'],
        muscle: ['"Stronger would be good. Safer."']
    },
    generic: {
        chest: ['"I\'ve been thinking about changes..."'],
        butt: ['"Some adjustments might be nice..."'],
        muscle: ['"I could use more strength..."']
    }
};

// Get a desire hint for NPC greeting
// If NPC has an unrevealed desire, ALWAYS reveal it (one-time)
// Otherwise, 20% chance for a reminder hint
function getDesireGreetingHint(npcId) {
    const npc = gameState.npcs[npcId];
    const desire = npc?.currentDesire;

    // No hint if no desire or trust too low
    if (!desire) return null;
    if (!canRevealDesire(npcId)) return null;

    // If desire hasn't been revealed to player yet, ALWAYS reveal it
    // Check new system flags, jealousy events, AND legacy desiresRevealed array
    const legacyDesireRevealed = npc?.desiresRevealed?.some(r => r === true);
    const desireKnown = npc.desireKnownToPlayer || npc.desireRevealed || legacyDesireRevealed;
    if (!desireKnown) {
        const revealDialogue = revealNpcDesireToPlayer(npcId);
        if (revealDialogue) return revealDialogue;
    }

    // Already revealed - 20% chance for a casual reminder hint
    if (Math.random() > 0.20) return null;

    const stat = desire.stat;
    const npcHints = DESIRE_GREETING_HINTS[npcId];
    const hints = npcHints?.[stat] || DESIRE_GREETING_HINTS.generic[stat] || [];

    if (hints.length === 0) return null;

    return hints[Math.floor(Math.random() * hints.length)];
}

// ==========================================
// PLAYER BODY ADMIRATION SYSTEM
// ==========================================
// NPCs react when player's body matches their desires
// Triggers at thresholds 3, 4, 5 - once per threshold per NPC per stat

const PLAYER_BODY_ADMIRATION_REACTIONS = {
    chest: {
        3: {
            friendly: 'Her eyes drift to your chest. "You look... great. Have you been doing something different?"',
            flirty: 'She openly admires your figure. "Now THAT is impressive! Where can I get some of that?"',
            shy: 'She blushes and steals glances. "Y-your chest looks... I mean... you look nice."',
            curious: 'She studies your figure analytically. "Interesting proportions. Natural or... enhanced?"',
            proper: 'She maintains eye contact, but her gaze flickers downward. "You\'re looking rather... well-developed."',
            gruff: '"Nice chest." She nods approvingly.',
            charming: '"You\'re looking particularly lovely today. Something\'s changed..."',
            motherly: '"Oh my, you\'re looking very... healthy! Good for you, dear."',
            stoic: 'A slight pause as eyes momentarily lower. "... You look well."'
        },
        4: {
            friendly: 'She catches herself staring. "Sorry, I just... wow. You look amazing."',
            flirty: 'She whistles appreciatively. "Well, hello! Someone\'s been getting transformations..."',
            shy: 'She can\'t help but gaze at your chest. "I-I wish I had... I mean... you look wonderful."',
            curious: '"Fascinating development. I\'d love to know how you achieved those proportions."',
            proper: 'She clears her throat. "You\'ve become quite... commanding in appearance."',
            gruff: '"That\'s a serious chest. Impressive."',
            charming: '"Every time I see you, you\'re more stunning. It\'s almost unfair."',
            motherly: '"Goodness gracious! You\'re really blossoming, aren\'t you?"',
            stoic: 'Eyes linger a moment too long. "... Significant growth."'
        },
        5: {
            friendly: 'She\'s openly awed. "How do you even... I mean... WOW."',
            flirty: 'She fans herself. "Is it getting hot in here, or is that just your chest?"',
            shy: 'She turns bright red. "I c-can\'t stop... you\'re just so..."',
            curious: '"Maximum development. The results are... extraordinary."',
            proper: 'Even she can\'t hide her surprise. "That is... quite the figure."',
            gruff: '"Biggest I\'ve ever seen. You win."',
            charming: '"You\'ve become a work of art. Truly breathtaking."',
            motherly: '"Oh my stars! You could win competitions with those!"',
            stoic: 'Visible effort to maintain composure. "... Impressive."'
        }
    },
    butt: {
        3: {
            friendly: 'She notices your curves as you walk. "Someone\'s looking curvy today!"',
            flirty: 'She watches you move. "Love the way you\'re filling out those clothes."',
            shy: 'She quickly looks away when you turn. "Y-your figure is really..."',
            curious: '"I notice your posterior has changed. Interesting development."',
            proper: '"You carry yourself with... notable curves."',
            gruff: '"Nice rear."',
            charming: '"The way you move now... quite captivating."',
            motherly: '"Oh, you\'re getting such lovely curves, dear!"',
            stoic: 'Brief glance downward. "... You\'ve changed."'
        },
        4: {
            friendly: 'She openly appreciates your figure. "Okay, I need to know your secret!"',
            flirty: '"Keep swaying like that and you\'re going to cause accidents."',
            shy: 'She trips over her words. "Your... the way you... um..."',
            curious: '"The development is quite pronounced now. Fascinating proportions."',
            proper: '"You have developed quite the... silhouette."',
            gruff: '"That\'s a serious behind."',
            charming: '"You move like poetry in motion now."',
            motherly: '"My, my! You could balance a tray on those curves!"',
            stoic: 'Eyes tracking you. "... Notable."'
        },
        5: {
            friendly: '"I can\'t believe what I\'m seeing! You\'re like a sculpture!"',
            flirty: '"I need a drink. That view is overwhelming."',
            shy: 'She can barely speak. "H-how do you even... I mean..."',
            curious: '"Peak development achieved. Remarkable specimen."',
            proper: '"That is... unprecedented. Even I must admit..."',
            gruff: '"Never seen anything like it."',
            charming: '"You\'ve transcended beauty. That\'s a masterpiece."',
            motherly: '"Oh dear! I don\'t know where to look!"',
            stoic: 'Long stare. "... Extraordinary."'
        }
    },
    muscle: {
        3: {
            friendly: '"Have you been working out? You look stronger!"',
            flirty: '"Ooh, I see some definition there. Show me more?"',
            shy: '"You seem... more athletic. It suits you."',
            curious: '"Interesting muscular development. Have you been training?"',
            proper: '"You look quite... capable. Well done."',
            gruff: '"Getting stronger. Good."',
            charming: '"Strength looks good on you."',
            motherly: '"My, you\'re looking fit! Healthy living, I see!"',
            stoic: '"... You\'ve grown stronger."'
        },
        4: {
            friendly: '"Wow, look at those muscles! You could lift me!"',
            flirty: '"All those muscles... I wouldn\'t mind a personal demonstration."',
            shy: '"Y-you\'re so... strong now. It\'s kind of intimidating..."',
            curious: '"Remarkable definition. The transformation process is effective."',
            proper: '"You\'ve become quite... formidable in appearance."',
            gruff: '"Real strength there. Respect."',
            charming: '"Power and beauty combined. You\'re quite the package."',
            motherly: '"Such strong arms! You could help me move furniture!"',
            stoic: '"... Impressive strength."'
        },
        5: {
            friendly: '"You\'re like a warrior goddess! How are you so muscular?!"',
            flirty: '"All those muscles... I\'m going to need a moment to recover from this view."',
            shy: '"Y-you\'re so... powerful. I feel safe just standing near you."',
            curious: '"Maximum muscular development. You\'ve pushed the limits."',
            proper: '"That is... quite extraordinary physical presence."',
            gruff: '"Strongest I\'ve seen. Period."',
            charming: '"You\'ve become a force of nature. Magnificent."',
            motherly: '"Oh my! You could probably carry the whole workshop!"',
            stoic: '"... Formidable."'
        }
    }
};

// Check if NPC should comment on player's body during greeting
// Triggers once per threshold (3, 4, 5) per NPC per stat
function checkPlayerBodyAdmiration(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return null;

    // Initialize admiration tracking if needed
    if (!gameState.npcAdmiredPlayerStats) {
        gameState.npcAdmiredPlayerStats = {};
    }
    if (!gameState.npcAdmiredPlayerStats[npcId]) {
        gameState.npcAdmiredPlayerStats[npcId] = {};
    }

    const playerBody = gameState.player.body;
    const personality = NPC_PERSONALITIES[npcId]?.type || 'friendly';
    const admired = gameState.npcAdmiredPlayerStats[npcId];

    // Check each stat the NPC cares about
    const config = NPC_DESIRE_CONFIG[npcId];
    if (!config) return null;

    for (const stat of config.allowedStats) {
        const playerValue = playerBody[stat];

        // Check thresholds 3, 4, 5
        for (const threshold of [3, 4, 5]) {
            if (playerValue >= threshold) {
                const key = `${stat}_${threshold}`;

                // Already admired this threshold
                if (admired[key]) continue;

                // Get reaction based on personality
                const reactions = PLAYER_BODY_ADMIRATION_REACTIONS[stat]?.[threshold];
                if (!reactions) continue;

                const reaction = reactions[personality];
                if (!reaction) continue;

                // Mark as admired
                admired[key] = true;
                saveState();

                return reaction;
            }
        }
    }

    return null;
}

// ==========================================
// PHASE 5: SPECIAL EVENT CHAINS
// ==========================================

// Rivalry pair definitions - NPCs competing for the same transformation goal
const RIVALRY_PAIRS = {
    barret_della_butt: {
        id: 'barret_della_butt',
        npc1: 'barret',
        npc2: 'della',
        stat: 'butt',
        triggerValue: 4,  // Both at 4+ triggers rivalry
        text: {
            discovery: `You notice Barret and Della sizing each other up across the tavern.

Barret smirks, shifting her weight to emphasize her curves. {barret}"Della's been getting some work done, I see."

Della flushes but stands her ground. {della}"Some of us want to keep up appearances."

{barret}"Keep up?" Barret laughs. {barret}"Sweetie, you're trying to catch up."`,
            barret_wins: `Barret struts past Della's bakery, putting extra sway in her step.

{barret}"Looks like I'm still the queen of curves around here!" She winks at you.

From inside, you hear Della sigh heavily.`,
            della_wins: `Della beams as she serves a customer, her new proportions drawing admiring glances.

Barret watches from across the square, arms crossed. {barret}"Well... she earned it, I suppose."`,
            tie: `Barret and Della stand side by side, comparing their profiles.

{barret}"I'll admit it," Barret says grudgingly, {barret}"you're giving me a run for my money."

{della}"Takes one to know one," Della replies with a sly smile.`
        }
    },
    lenna_mira_chest: {
        id: 'lenna_mira_chest',
        npc1: 'lenna',
        npc2: 'mira',
        stat: 'chest',
        triggerValue: 3,  // Both at 3+ triggers rivalry
        text: {
            discovery: `In the library, you catch Lenna stealing glances at Mira, who's browsing the shelves.

Mira notices and grins. {mira}"Like what you see, bookworm?"

Lenna turns crimson. {lenna}"I-I was just... the books behind you..."

{mira}"Sure you were." Mira stretches, emphasizing her figure. {mira}"We both know what you're really looking at."`,
            lenna_wins: `Lenna carefully organizes books on a high shelf, her new figure straining her librarian's blouse.

Mira watches with wide eyes. {mira}"When did THAT happen?!"

Lenna allows herself a small, satisfied smile. {lenna}"I've been doing some... research."`,
            mira_wins: `Mira bounces into the library, her impressive chest nearly knocking books off the counter.

Lenna watches from behind her glasses, a mixture of envy and fascination.

{mira}"Still reading about it?" Mira teases. {mira}"While I'm living it!"`,
            tie: `Mira and Lenna stand at the checkout desk, their matching figures causing quite a scene.

{mira}"We could be twins!" Mira exclaims.

{lenna}"P-please don't say that so loudly," Lenna whispers, but she's smiling.`
        }
    },
    // New rivalry pairs
    vessa_mrs_thornwick_chest: {
        id: 'vessa_mrs_thornwick_chest',
        npc1: 'vessa',
        npc2: 'mrs_thornwick',
        stat: 'chest',
        triggerValue: 4,  // Both at 4+ triggers rivalry
        text: {
            discovery: `At a town meeting, you notice Vessa and Mrs. Thornwick eyeing each other's figures.

Mrs. Thornwick sniffs primly. {mrs_thornwick}"Some of us maintain a dignified appearance through proper posture."

Vessa smiles enigmatically. {vessa}"And some of us don't need posture to command attention."

The tension between them is palpable.`,
            vessa_wins: `Vessa glides past Mrs. Thornwick at the herbalist shop, her impressive figure drawing murmurs.

{vessa}"The spirits have been... generous," Vessa says cryptically.

Mrs. Thornwick's expression sours momentarily before she regains her composure.`,
            mrs_thornwick_wins: `Mrs. Thornwick presides over the town meeting, her commanding presence enhanced by her impressive figure.

{mrs_thornwick}"Authority has many forms," she says with a knowing smile.

From the back, Vessa watches with an unreadable expression.`,
            tie: `Vessa and Mrs. Thornwick encounter each other at the market.

{mrs_thornwick}"We seem to have reached an... understanding," Mrs. Thornwick observes.

{vessa}"Balance," Vessa replies simply. {vessa}"There is always balance."`
        }
    },
    fiona_lenna_muscle: {
        id: 'fiona_lenna_muscle',
        npc1: 'fiona',
        npc2: 'lenna',
        stat: 'muscle',
        triggerValue: 3,  // Both at 3+ triggers rivalry
        text: {
            discovery: `In the library, Fiona reaches for a heavy book on a high shelf - the same one Lenna was reaching for.

They both struggle for a moment before Fiona pulls it down.

Lenna blinks behind her glasses. {lenna}"You've gotten... stronger."

Fiona shrugs. {fiona}"Had to. The streets aren't kind to the weak."

You sense an unspoken competition forming.`,
            fiona_wins: `You see Fiona helping Lenna carry a stack of heavy tomes.

{fiona}"I used to be the one needing help," Fiona says quietly, but there's pride in her voice.

Lenna nods respectfully. {lenna}"You've come a long way."`,
            lenna_wins: `Lenna hefts a massive book with ease, drawing a surprised look from Fiona.

{lenna}"Research requires... stamina," Lenna says, adjusting her glasses.

Fiona watches with newfound respect. {fiona}"Maybe I should read more."`,
            tie: `Fiona and Lenna work together to reorganize the heavy reference section.

{lenna}"We make a good team," Lenna observes.

Fiona smiles - a rare sight. {fiona}"Strength in numbers."`
        }
    }
};

// Spontaneous comparison comments - when NPCs comment on their desire during greeting
// 20% chance during greeting if they have a desire with a comparison target
const SPONTANEOUS_COMPARISON_COMMENTS = {
    envious: {
        friendly: [
            '"Have you noticed {target}\'s {stat} lately?" She sighs wistfully.',
            '"I keep looking at {target}... is it weird that I want what she has?"',
            '"Ugh, every time I see {target}, I think about how much better her {stat} is."'
        ],
        flirty: [
            '"Did you SEE {target}? I want what she\'s got!" She gestures expressively.',
            '"If I had {target}\'s {stat}, I\'d never stop showing it off."',
            '"Someone needs to help me catch up to {target}..." She winks meaningfully.'
        ],
        shy: [
            '"I shouldn\'t say this, but... {target}\'s {stat}..." She trails off, blushing.',
            'She glances down. "I wish I could look more like {target}..."',
            '"Don\'t tell anyone, but I\'ve been thinking about {target}\'s figure..."'
        ],
        proper: [
            '"One can\'t help but notice certain... developments with {target}."',
            '"While I try not to compare, {target}\'s {stat} is quite... impressive."',
            '"It would be improper to envy {target}, of course. And yet..."'
        ],
        gruff: [
            '"{target}\'s looking good. Wish I had that."',
            '"Not gonna lie, I\'ve been eyeing {target}\'s {stat}."',
            '"What\'s {target}\'s secret? I want in."'
        ],
        curious: [
            '"I\'ve been studying {target}\'s proportions. Fascinating, really."',
            '"From a purely analytical perspective, {target}\'s {stat} is quite remarkable."',
            '"I wonder what it would feel like to have {target}\'s figure..."'
        ],
        motherly: [
            '"Oh, have you seen {target}? She\'s looking wonderful lately."',
            '"I remember when I looked more like {target}... those were the days."',
            '"That {target} is certainly blessed in the {stat} department, isn\'t she?"'
        ],
        stoic: [
            'She glances at {target} across the room. "Some have more than others."',
            '"I have noticed {target}\'s... attributes."',
            'A brief look of envy crosses her face when {target} walks by.'
        ],
        charming: [
            '"Between you and me, {target}\'s figure is giving me ideas."',
            '"I can\'t help but admire {target}\'s {stat}. Truly inspiring."',
            '"What I wouldn\'t give to have what {target} has..."'
        ]
    },
    triumphant: {
        friendly: [
            '"I feel so much better now that my {stat} is bigger than {target}\'s!"',
            '"Did you notice I finally caught up to {target}? Maybe even passed her!"',
            '"I can\'t stop smiling. I never thought I\'d have better {stat} than {target}!"'
        ],
        flirty: [
            '"Take THAT, {target}!" She poses proudly. "Who\'s got the better {stat} now?"',
            '"I love walking past {target} now. She actually looks envious of ME!"',
            '"Guess who\'s getting all the attention now instead of {target}?"'
        ],
        shy: [
            '"I... I actually have bigger {stat} than {target} now," *she whispers, amazed.*',
            'She blushes. "People are looking at me instead of {target}..."',
            '"I never thought I\'d feel confident compared to {target}..."'
        ],
        proper: [
            '"One might observe that my {stat} now exceeds {target}\'s. Not that I\'m comparing."',
            '"It seems the tables have turned regarding certain... endowments."',
            '"I believe I\'ve achieved a certain... superiority in that area."'
        ],
        gruff: [
            '"Finally bigger than {target}. Feels good."',
            '"{target} can\'t look down on me anymore. Not with these."',
            '"I win. Simple as that."'
        ],
        curious: [
            '"Interesting - I\'ve now surpassed {target}\'s measurements."',
            '"The transformation has yielded results exceeding {target}\'s."',
            '"From an objective standpoint, I now exceed {target} in that area."'
        ],
        motherly: [
            '"Oh my, I think I\'m actually bigger than {target} now!"',
            '"Who would have thought I\'d have more {stat} than young {target}?"',
            '"At my age, surpassing {target} feels like quite an accomplishment!"'
        ],
        stoic: [
            'A subtle look of satisfaction. "I\'ve exceeded {target}."',
            '"The goal has been achieved. {target} is no longer ahead."',
            '"Progress measured. {target} surpassed."'
        ],
        charming: [
            '"I believe I\'ve won our little unspoken competition with {target}."',
            '"Darling {target} must be positively green with envy now."',
            '"I do believe I\'ve become the new standard to aspire to."'
        ]
    }
};

// Get a spontaneous comparison comment during NPC greeting
// 20% chance if NPC has a desire with a comparison target
function checkSpontaneousComparison(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc?.currentDesire?.comparedTo) return null;

    // 20% chance to make a spontaneous comment
    if (Math.random() > 0.20) return null;

    // Need trust high enough to reveal desire
    if (!canRevealDesire(npcId)) return null;

    const desire = npc.currentDesire;
    const targetId = desire.comparedTo;
    const targetName = getNpcDisplayName(targetId);
    const stat = getStatDisplayName(desire.stat, true);

    // Get NPC personality type
    const personality = NPC_PERSONALITIES[npcId]?.type || 'friendly';

    // Determine if envious or triumphant
    const myValue = npc.body[desire.stat];
    const targetNpc = gameState.npcs[targetId];
    const theirValue = targetNpc?.body?.[desire.stat] || 0;

    const type = myValue >= theirValue ? 'triumphant' : 'envious';
    const comments = SPONTANEOUS_COMPARISON_COMMENTS[type]?.[personality];

    if (!comments || comments.length === 0) return null;

    const comment = comments[Math.floor(Math.random() * comments.length)]
        .replace(/{target}/g, targetName)
        .replace(/{stat}/g, stat);

    return comment;
}

// Check if a rivalry event should trigger
function checkRivalryEvent() {
    for (const rivalryId in RIVALRY_PAIRS) {
        const rivalry = RIVALRY_PAIRS[rivalryId];
        if (!isNpcUnlocked(rivalry.npc1) || !isNpcUnlocked(rivalry.npc2)) continue;
        const npc1Body = gameState.npcs[rivalry.npc1]?.body;
        const npc2Body = gameState.npcs[rivalry.npc2]?.body;

        if (!npc1Body || !npc2Body) continue;

        const npc1Stat = npc1Body[rivalry.stat] || 0;
        const npc2Stat = npc2Body[rivalry.stat] || 0;

        // Check if both are at trigger value
        if (npc1Stat >= rivalry.triggerValue && npc2Stat >= rivalry.triggerValue) {
            // Check if we haven't seen discovery yet
            if (!gameState.flags[`rivalry_${rivalryId}_discovered`]) {
                return { type: 'discovery', rivalry: rivalry };
            }
            // Check for winner scenarios (only after discovery)
            if (npc1Stat >= 5 && npc2Stat < 5 && !gameState.flags[`rivalry_${rivalryId}_resolved`]) {
                return { type: 'npc1_wins', rivalry: rivalry };
            }
            if (npc2Stat >= 5 && npc1Stat < 5 && !gameState.flags[`rivalry_${rivalryId}_resolved`]) {
                return { type: 'npc2_wins', rivalry: rivalry };
            }
            if (npc1Stat >= 5 && npc2Stat >= 5 && !gameState.flags[`rivalry_${rivalryId}_resolved`]) {
                return { type: 'tie', rivalry: rivalry };
            }
        }
    }
    return null;
}

// Mark rivalry event as seen
function markRivalryDiscovered(rivalryId) {
    gameState.flags[`rivalry_${rivalryId}_discovered`] = true;
    saveState();
}

function markRivalryResolved(rivalryId) {
    gameState.flags[`rivalry_${rivalryId}_resolved`] = true;
    saveState();
}

// Get rivalry event text
function getRivalryEventText(eventType, rivalry) {
    if (eventType === 'npc1_wins') {
        return rivalry.text[`${rivalry.npc1}_wins`];
    }
    if (eventType === 'npc2_wins') {
        return rivalry.text[`${rivalry.npc2}_wins`];
    }
    return rivalry.text[eventType] || rivalry.text.discovery;
}

// Support event definitions - NPCs encouraging each other's transformation
const SUPPORT_EVENTS = {
    mira_supports_lenna: {
        id: 'mira_supports_lenna',
        supporter: 'mira',
        supported: 'lenna',
        stat: 'chest',
        triggerCondition: (state) => {
            // Mira has chest 3+, Lenna has chest 2 or less
            const miraChest = state.npcs.mira?.body?.chest || 0;
            const lennaChest = state.npcs.lenna?.body?.chest || 0;
            return miraChest >= 3 && lennaChest <= 2;
        },
        text: `Mira corners you near the workshop.

"Hey, so I've been watching Lenna at the library. She's always staring at my chest when she thinks I'm not looking."

She leans in conspiratorially. "I think she wants what I have. She's just too shy to ask."

Mira grins. "You should help her! I bet she'd be so happy. And maybe a little more confident, you know?"`,
        trustBoost: 5  // Boost to supporter's trust if player helps the supported NPC
    },
    barret_supports_della: {
        id: 'barret_supports_della',
        supporter: 'barret',
        supported: 'della',
        stat: 'butt',
        triggerCondition: (state) => {
            // Barret has butt 4+, Della has butt 3 or less
            const barretButt = state.npcs.barret?.body?.butt || 0;
            const dellaButt = state.npcs.della?.body?.butt || 0;
            return barretButt >= 4 && dellaButt <= 3;
        },
        text: `Barret catches you at the tavern bar.

"Listen, Della's been in here sighing at my backside for weeks. It's getting a little sad, honestly."

She pours you a drink. "We curvy ladies need to stick together. Help her out, would you?"

"And tell her I sent you. She'll appreciate having a friend in this."`,
        trustBoost: 5
    },
    vessa_supports_fiona: {
        id: 'vessa_supports_fiona',
        supporter: 'vessa',
        supported: 'fiona',
        stat: 'muscle',
        triggerCondition: (state) => {
            // Vessa has interacted with Fiona, Fiona is still at muscle 1 or less
            const fionaMuscle = state.npcs.fiona?.body?.muscle || 0;
            return fionaMuscle <= 1 && state.npcs.fiona?.trust >= 10;
        },
        text: `Vessa appears beside you, as she often does.

"The small one. Fiona." She speaks softly. "She hides from the world because she feels weak."

"Perhaps strength would give her courage. The courage to stop hiding."

Vessa's eyes meet yours. "You have the means. Consider using them for her."`,
        trustBoost: 3
    }
};

// Check if a support event should trigger
function checkSupportEvent() {
    for (const eventId in SUPPORT_EVENTS) {
        const event = SUPPORT_EVENTS[eventId];

        // Skip if either NPC is locked
        if (!isNpcUnlocked(event.supporter) || !isNpcUnlocked(event.supported)) continue;

        // Already triggered
        if (gameState.flags[`support_${eventId}_seen`]) continue;

        // Check trigger condition
        if (event.triggerCondition(gameState)) {
            // 20% chance per check (cached to prevent F5 rerolling)
            if (getPhaseRoll('support_' + eventId, 0.20)) {
                return event;
            }
        }
    }
    return null;
}

// Mark support event as seen
function markSupportEventSeen(eventId) {
    gameState.flags[`support_${eventId}_seen`] = true;
    saveState();
}

// Check if player helped the supported NPC after a support event
function checkSupportEventFollowup(supporterId, supportedId, stat) {
    const eventId = `${supporterId}_supports_${supportedId}`;
    if (!gameState.flags[`support_${eventId}_seen`]) return null;
    if (gameState.flags[`support_${eventId}_completed`]) return null;

    // Check if supported NPC has been transformed in the stat
    const supportedBody = gameState.npcs[supportedId]?.body;
    const supportedNatural = gameState.npcs[supportedId]?.naturalBody;
    if (!supportedBody || !supportedNatural) return null;

    if (supportedBody[stat] > supportedNatural[stat]) {
        gameState.flags[`support_${eventId}_completed`] = true;

        // Boost supporter's trust
        const event = SUPPORT_EVENTS[eventId];
        if (event && gameState.npcs[supporterId]) {
            gameState.npcs[supporterId].trust = Math.min(100, (gameState.npcs[supporterId].trust || 0) + event.trustBoost);
        }
        saveState();

        return {
            supporter: supporterId,
            supported: supportedId,
            text: getSupportFollowupText(supporterId, supportedId)
        };
    }
    return null;
}

// Get followup text when player helps after support event
function getSupportFollowupText(supporterId, supportedId) {
    const supporterName = getNpcDisplayName(supporterId);
    const supportedName = getNpcDisplayName(supportedId);

    const followups = {
        mira_lenna: `Next time you see Mira, she's beaming.

"I heard about Lenna! She's actually smiling now! You're amazing!"

She gives you an enthusiastic hug. "I knew you'd come through!"`,
        barret_della: `Barret slides you a free drink at the tavern.

"Saw Della's new look. Nice work." She winks. "The sisterhood of curves grows stronger."`,
        vessa_fiona: `Vessa nods approvingly when you next meet.

"The small one walks taller now. You did well."

There's the faintest hint of a smile. "The spirits approve."`
    };

    const key = `${supporterId}_${supportedId}`;
    return followups[key] || `*${supporterName} seems pleased about ${supportedName}'s transformation.*`;
}

// ==========================================
// RANDOM LOCATION EVENTS
// ==========================================
// Chance-based events when "looking around" at locations
// 30% chance when jealousy event doesn't trigger

const RANDOM_LOCATION_EVENTS = {
    gossip: {
        weight: 30,
        events: [
            {
                id: 'gossip_desire',
                getText: function() {
                    // Find an NPC with a revealed desire
                    const eligibleNpcs = Object.keys(gameState.npcs).filter(id => {
                        const npc = gameState.npcs[id];
                        return isNpcUnlocked(id) && npc.currentDesire && isDesireRevealed(id);
                    });
                    if (eligibleNpcs.length === 0) return null;
                    const npcId = eligibleNpcs[Math.floor(Math.random() * eligibleNpcs.length)];
                    const npcName = getNpcDisplayName(npcId);
                    const stat = getStatDisplayName(gameState.npcs[npcId].currentDesire.stat, true);
                    return `You overhear townspeople whispering. "Have you noticed ${npcName} lately? She seems... dissatisfied with her ${stat}."`;
                }
            },
            {
                id: 'gossip_uncle',
                text: 'An elderly woman mutters as she passes. "That workshop owner helped my sister years ago. Discretely. Changed her life, he did..."',
                flag: 'heard_uncle_gossip'
            },
            {
                id: 'gossip_workshop',
                text: 'Two merchants discuss in hushed tones. "I hear the new workshop owner has their uncle\'s old devices running again. Wonder what they can do..."'
            }
        ]
    },
    find_coin: {
        weight: 20,
        events: [
            {
                id: 'find_coin_small',
                text: 'Something glints in the cobblestones. You pick up a few coins someone dropped.',
                reward: { coin: [2, 5] }
            },
            {
                id: 'find_coin_pouch',
                text: 'You spot a small coin pouch tucked behind a barrel. No one seems to be looking for it...',
                reward: { coin: [5, 10] },
                minDay: 5
            }
        ]
    },
    npc_approach: {
        weight: 15,
        events: [
            {
                id: 'npc_wave',
                getText: function() {
                    const eligibleNpcs = getEligibleNpcs();
                    if (eligibleNpcs.length === 0) return null;
                    const npcId = eligibleNpcs[Math.floor(Math.random() * eligibleNpcs.length)];
                    const npcName = getNpcDisplayName(npcId);
                    return `*${npcName} notices you from across the area and gives a friendly wave.*\n\nYou could go talk to them, or continue observing.`;
                }
            }
        ]
    },
    witness_scene: {
        weight: 25,
        events: [
            {
                id: 'witness_envy',
                getText: function() {
                    // Find two NPCs where one is envious of another
                    const eligibleNpcs = getEligibleNpcs();
                    if (eligibleNpcs.length < 2) return null;
                    for (const npcId of eligibleNpcs) {
                        const npc = gameState.npcs[npcId];
                        if (npc.currentDesire?.comparedTo) {
                            const targetId = npc.currentDesire.comparedTo;
                            const npcName = getNpcDisplayName(npcId);
                            const targetName = getNpcDisplayName(targetId);
                            const stat = getStatDisplayName(npc.currentDesire.stat, true);
                            return `You catch ${npcName} stealing glances at ${targetName}'s ${stat}. There's obvious envy in those looks...`;
                        }
                    }
                    return null;
                },
                requiresJealousy: true
            },
            {
                id: 'witness_satisfied',
                getText: function() {
                    // Find an NPC who recently had a desire fulfilled
                    for (const npcId of Object.keys(gameState.npcs)) {
                        if (!isNpcUnlocked(npcId)) continue;
                        const npc = gameState.npcs[npcId];
                        if (npc.desireFulfilledDay && gameState.day - npc.desireFulfilledDay <= 2) {
                            const npcName = getNpcDisplayName(npcId);
                            return `You notice ${npcName} admiring herself in a shop window, clearly pleased with her appearance.`;
                        }
                    }
                    return null;
                }
            }
        ]
    },
    uncle_clue: {
        weight: 10,
        events: [
            {
                id: 'uncle_letter',
                text: 'A faded letter blows against your leg. It\'s addressed to your uncle in elegant handwriting.\n\n*"Thank you for your discretion. The changes have brought me peace I never thought possible. Your methods are... miraculous."*',
                flag: 'uncle_story_clue_letter',
                minDay: 5
            },
            {
                id: 'uncle_mention',
                text: 'A passing merchant stops when he sees you. "You! You\'re from that workshop, aren\'t you? Your uncle helped my wife years ago. She was miserable with her body. Now she\'s... happy. Really happy."',
                flag: 'uncle_story_clue_mention',
                minDay: 8
            },
            {
                id: 'uncle_device_part',
                text: 'Tucked behind a loose cobblestone, you find a small metal component with your uncle\'s maker\'s mark. It looks like part of a device you\'ve never seen.',
                flag: 'uncle_story_clue_device',
                minDay: 12
            }
        ]
    }
};

// Roll for a random location event
function rollRandomLocationEvent(locationId) {
    // Only trigger with 30% chance
    if (Math.random() > 0.30) return null;

    // Build list of available events with weights
    const availableCategories = [];
    let totalWeight = 0;

    for (const [category, data] of Object.entries(RANDOM_LOCATION_EVENTS)) {
        // Filter events by minDay and other conditions
        const availableEvents = data.events.filter(e => {
            if (e.minDay && gameState.day < e.minDay) return false;
            if (e.flag && gameState.flags[e.flag]) return false;  // Already seen this unique event
            if (e.requiresJealousy && !gameState.flags.mira_story_day3_complete) return false;
            return true;
        });

        if (availableEvents.length > 0) {
            availableCategories.push({
                category: category,
                weight: data.weight,
                events: availableEvents
            });
            totalWeight += data.weight;
        }
    }

    if (availableCategories.length === 0 || totalWeight === 0) return null;

    // Weighted random category selection
    let random = Math.random() * totalWeight;
    let selectedCategory = null;

    for (const cat of availableCategories) {
        random -= cat.weight;
        if (random <= 0) {
            selectedCategory = cat;
            break;
        }
    }

    if (!selectedCategory) return null;

    // Pick random event from category
    const event = selectedCategory.events[Math.floor(Math.random() * selectedCategory.events.length)];

    // Get event text (may be dynamic)
    let text;
    if (event.getText) {
        text = event.getText();
        if (!text) return null;  // Dynamic text generation failed
    } else {
        text = event.text;
    }

    // Apply rewards
    let rewardText = null;
    if (event.reward) {
        if (event.reward.coin) {
            const [min, max] = event.reward.coin;
            const amount = min + Math.floor(Math.random() * (max - min + 1));
            gameState.player.coin += amount;
            rewardText = `(+${amount} Coin)`;
            saveState();
            UI.updatePlayerSidebar();
        }
    }

    // Set flag if applicable
    if (event.flag) {
        gameState.flags[event.flag] = true;
        saveState();
    }

    return {
        category: selectedCategory.category,
        event: event,
        text: text,
        rewardText: rewardText
    };
}

// Regret event definitions - NPCs who went too far wanting to reverse
const REGRET_THRESHOLDS = {
    // How far above natural before regret becomes possible
    mira: { threshold: 4, chance: 0.05 },     // Growth-focused - only regrets at extreme
    barret: { threshold: 3, chance: 0.10 },   // Adventurous - might regret big changes
    della: { threshold: 2, chance: 0.20 },    // Practical - regrets sooner
    lenna: { threshold: 2, chance: 0.25 },    // Prude - regrets quickly
    mrs_thornwick: { threshold: 2, chance: 0.30 },  // Prude - regrets very quickly
    vessa: { threshold: 3, chance: 0.15 },    // Adventurous - experimental
    fiona: { threshold: 2, chance: 0.15 },    // Practical
    aldric: { threshold: 2, chance: 0.20 },   // Practical
    corwin: { threshold: 3, chance: 0.10 },   // Adventurous
    holt: { threshold: 2, chance: 0.15 }      // Practical
};

// Regret dialogue per NPC and stat
const REGRET_TEXTS = {
    mira: {
        chest: [
            `Mira adjusts her courier bag with difficulty, her massive chest getting in the way.

"Okay, I'll admit it... MAYBE I went a little overboard."

She winces as she tries to run. "Can we... dial it back? Just a little? I still want to be big, just... functional?"`,
            `"I can't see my feet anymore! This is a work hazard!"

Mira pouts. "Don't make me too small though! Just... back to where I could still do my job?"`
        ],
        butt: [
            `Mira struggles to fit through the bakery doorway.

"Okay, this is ridiculous. I'm stuck. LITERALLY stuck."

She laughs nervously. "Help?"`
        ]
    },
    barret: {
        chest: [
            `Barret leans on the bar, rubbing her shoulders.

"You know what? Being the biggest has its downsides. My back is killing me."

She sighs. "Maybe I was better off before. Want to help a girl out?"`,
        ],
        butt: [
            `"The barstools are protesting," Barret jokes, but there's real discomfort in her voice.

"I wanted curves, not... whatever this is. Can we find a happy medium?"`
        ]
    },
    della: {
        chest: [
            `Della kneads dough with visible strain.

"I thought bigger would be nice, but..." She stretches her aching back. "I miss being comfortable."

"Could you help me get back to something more... manageable?"`,
        ],
        butt: [
            `"I keep knocking things off the counter!" Della laughs, but she's clearly frustrated.

"My kitchen wasn't built for... this much. Maybe a little less?"`
        ]
    },
    lenna: {
        chest: [
            `Lenna hunches over her books, face red.

"Everyone is staring. I can't concentrate on my research anymore."

She whispers desperately. "Please, can we undo some of this? I wanted to be noticed, not... gawked at."`,
        ],
        butt: [
            `"The reading chairs..." Lenna's voice is barely audible. "I don't fit in them anymore."

"I made a mistake. Can you fix it? Please?"`
        ]
    },
    mrs_thornwick: {
        chest: [
            `Mrs. Thornwick stands stiffly, her formal dress straining.

"This is... undignified." She struggles to maintain composure. "A lady of my position cannot appear so... excessive."

"I must request you reverse some of these changes. For propriety's sake."`,
        ],
        muscle: [
            `"I look like a dock worker," Mrs. Thornwick says with barely concealed horror.

"This is entirely inappropriate for the council chamber. Please, restore some decorum."`
        ]
    },
    vessa: {
        chest: [
            `Vessa tilts her head, examining herself.

"The experience was... educational. But I think I understand now."

"The physical form has limits. I've found mine. Perhaps it's time to return to balance."`,
        ]
    },
    fiona: {
        muscle: [
            `Fiona flexes experimentally, then sighs.

"I thought being stronger would make me safer. But now everyone notices me."

"I was better off when I could disappear. Can you help me fade back into the shadows?"`,
        ]
    }
};

// Check if an NPC should express regret
function checkRegretEvent(npcId, stat) {
    const npc = gameState.npcs[npcId];
    if (!npc) return null;

    const current = npc.body[stat];
    const natural = npc.naturalBody[stat];
    const config = REGRET_THRESHOLDS[npcId];

    if (!config) return null;

    // Already saw regret for this stat
    if (gameState.flags[`regret_${npcId}_${stat}_seen`]) return null;

    // Check if far enough above natural
    const difference = current - natural;
    if (difference < config.threshold) return null;

    // Roll for regret based on personality
    if (Math.random() > config.chance) return null;

    // Get regret text
    const texts = REGRET_TEXTS[npcId]?.[stat];
    if (!texts || texts.length === 0) return null;

    return {
        npcId: npcId,
        stat: stat,
        text: texts[Math.floor(Math.random() * texts.length)],
        targetValue: natural + 1  // They want to shrink but not all the way
    };
}

// Mark regret event as seen
function markRegretSeen(npcId, stat) {
    gameState.flags[`regret_${npcId}_${stat}_seen`] = true;
    saveState();
}

// Check for regret event during NPC greeting - returns regret data if should trigger, null otherwise
// Call this in NPC greeting onEnter functions to potentially redirect to regret scene
function checkGreetingRegretEvent(npcId) {
    // Only check after jealousy system is active
    if (!gameState.flags.mira_story_day3_complete) return null;

    // 15% chance to trigger regret check during greeting
    if (Math.random() > 0.15) return null;

    // Check all stats for potential regret
    const stats = ['chest', 'butt', 'muscle'];
    for (const stat of stats) {
        const regret = checkRegretEvent(npcId, stat);
        if (regret) {
            return regret;
        }
    }
    return null;
}

// Check if NPC has a genital proposal, goddess reveal, or archetype celebration to show in greeting
// Returns { type: 'proposal' | 'goddess_reveal' | 'celebration' | 'oneliner', sceneId?, text? } or null
function checkGreetingArchetypeEvent(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return null;

    // Priority 1: Pending genital proposal â†' redirect to proposal scene
    if (npc.pendingGenitalProposal) {
        return { type: 'proposal', sceneId: `${npcId}_genital_proposal` };
    }

    // Priority 2: Goddess just assigned but not revealed â†' redirect to reveal scene
    if (npc.hiddenArchetype === 'goddess' && !npc.goddessRevealed) {
        return { type: 'goddess_reveal', sceneId: `${npcId}_goddess_reveal` };
    }

    // Priority 3: Just achieved archetype â†' redirect to achievement scene
    if (npc.archetypeJustAchieved && npc.hiddenArchetype) {
        npc.archetypeJustAchieved = false;
        saveState();
        return { type: 'celebration', sceneId: `${npcId}_archetype_achievement` };
    }

    // Priority 4: Achieved archetype â†' random one-liner (20% chance)
    if (npc.archetypeAchieved && npc.hiddenArchetype && Math.random() < 0.20) {
        const npcOneLiners = NPC_ARCHETYPE_ONELINERS[npcId]?.[npc.hiddenArchetype];
        if (npcOneLiners && npcOneLiners.length > 0) {
            const oneLiner = npcOneLiners[Math.floor(Math.random() * npcOneLiners.length)];
            return { type: 'oneliner', text: oneLiner };
        }
    }

    return null;
}

// ==========================================
// PHASE 6: STAT-SPECIFIC DIALOGUE FLAVORS
// ==========================================

// These add variety to desire comments based on motivation themes

const CHEST_DESIRE_FLAVORS = {
    attention: [
        "Everyone notices her first. I want that.",
        "Tips are better when you've got something to show.",
        "She gets all the looks. I feel invisible.",
        "When she walks in, every head turns. I want that power."
    ],
    confidence: [
        "She walks with such confidence. It must be nice to fill out clothes like that.",
        "I'd feel more... womanly with more there.",
        "There's something about the way she carries herself. It's the figure.",
        "Confidence comes from feeling good about yourself. I want to feel... fuller."
    ],
    clothing: [
        "My dresses never fit right. Hers fill out perfectly.",
        "I want blouses to actually fit me properly.",
        "Nothing looks right on me. But on her? Everything.",
        "I'm tired of padding. I want the real thing."
    ],
    jealousy: [
        "It's not fair. She was BORN like that. I want what she has.",
        "Why does she get to look like that and I don't?",
        "Every time I see her, I feel... less. I hate it.",
        "She doesn't even appreciate what she has. I would."
    ],
    practical: [
        "Men listen to her. Maybe they'd listen to me too.",
        "In this business, certain... assets help.",
        "Call it shallow, but it works. And I want what works."
    ]
};

const BUTT_DESIRE_FLAVORS = {
    curves: [
        "Look at those curves. I want to move like that.",
        "She fills out her skirt so nicely. Mine just hangs.",
        "There's an elegance to the way she walks. It's all about the shape.",
        "Curves like that turn heads. I want to turn heads."
    ],
    attention: [
        "Everyone watches when she walks away. I want that power.",
        "The customers tip better when there's something to look at.",
        "She commands attention without saying a word. It's all in the sway.",
        "I've seen how people stare. I want them staring at me."
    ],
    comfort: [
        "Sitting would be more comfortable with more padding.",
        "These hard chairs are murder. A bit more cushion would help.",
        "She always looks comfortable. I bet it's the natural padding.",
        "My hips ache after long days. More cushion would help."
    ],
    confidence: [
        "The way she walks into a room... that's confidence.",
        "A fuller figure fills out the silhouette. It's commanding.",
        "I want to feel powerful when I move. She has that."
    ],
    practical: [
        "Wider hips are considered desirable. That's just facts.",
        "In certain professions, appearances matter. I need every advantage.",
        "It's an investment in myself, really."
    ]
};

const MUSCLE_DESIRE_FLAVORS = {
    strength: [
        "She carries those heavy supplies like they're nothing.",
        "I want to be strong enough to protect myself.",
        "Watch her work. Effortless. That takes real strength.",
        "I'm tired of struggling with simple tasks. I want her strength."
    ],
    appearance: [
        "Look at her arms. Defined. Powerful. I want that.",
        "Toned is attractive. I'm just... soft.",
        "There's beauty in strength. I want to embody that.",
        "She looks like she could handle anything. I want to look like that."
    ],
    work: [
        "My job would be easier if I had more strength.",
        "She makes the work look easy. I'm always struggling.",
        "Every task is a battle for me. For her, it's nothing.",
        "I need to keep up. That means getting stronger."
    ],
    respect: [
        "People don't mess with her. They take her seriously.",
        "I want to command respect when I walk into a room.",
        "Strength earns respect. I've seen it.",
        "No one dismisses her. I want that same authority."
    ],
    survival: [
        "This town isn't always safe. I need to be able to defend myself.",
        "Strength means survival. I've learned that the hard way.",
        "The strong survive. The weak... don't. I choose survival."
    ]
};

// Get a random flavor text for a desire
function getDesireFlavorText(stat, npcId) {
    let flavors;
    switch (stat) {
        case 'chest':
            flavors = CHEST_DESIRE_FLAVORS;
            break;
        case 'butt':
            flavors = BUTT_DESIRE_FLAVORS;
            break;
        case 'muscle':
            flavors = MUSCLE_DESIRE_FLAVORS;
            break;
        default:
            return null;
    }

    // Get personality-appropriate category
    const personality = NPC_PERSONALITIES[npcId]?.type || 'friendly';
    let preferredCategories;

    switch (personality) {
        case 'flirty':
        case 'charming':
            preferredCategories = ['attention', 'curves', 'appearance'];
            break;
        case 'gruff':
        case 'stoic':
            preferredCategories = ['practical', 'work', 'strength', 'survival'];
            break;
        case 'shy':
            preferredCategories = ['confidence', 'clothing', 'comfort'];
            break;
        case 'proper':
            preferredCategories = ['confidence', 'respect', 'practical'];
            break;
        case 'curious':
            preferredCategories = ['attention', 'appearance', 'strength'];
            break;
        case 'motherly':
            preferredCategories = ['comfort', 'practical', 'confidence'];
            break;
        default:
            preferredCategories = Object.keys(flavors);
    }

    // Try preferred categories first, then fallback to any
    for (const category of preferredCategories) {
        if (flavors[category] && flavors[category].length > 0) {
            return flavors[category][Math.floor(Math.random() * flavors[category].length)];
        }
    }

    // Fallback: pick from any category
    const allCategories = Object.keys(flavors);
    const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
    const texts = flavors[randomCategory];
    return texts[Math.floor(Math.random() * texts.length)];
}

// Get enhanced desire text with flavor
function getEnhancedDesireText(npcId, stat, baseText) {
    // 40% chance to add flavor text
    if (Math.random() > 0.40) return baseText;

    const flavor = getDesireFlavorText(stat, npcId);
    if (!flavor) return baseText;

    // Combine base text with flavor
    return `${baseText}\n\n*${getNpcDisplayName(npcId)}'s expression darkens slightly.* "${flavor}"`;
}

// Check if player can see NPC's desire (trust threshold)
function canRevealDesire(npcId) {
    const npc = gameState.npcs[npcId];
    const threshold = NPC_TRUST_THRESHOLDS[npcId]?.desireReveal ?? 10;
    return (npc?.trust || 0) >= threshold;
}

// Get NPC entrance text for jealousy events
function getNpcEntranceText(npcId) {
    const entrances = {
        mira: ['hurries past with a delivery', 'bounces through with her courier bag', 'dashes by on her rounds'],
        barret: ['strides past confidently', 'walks by with her characteristic swagger', 'passes through heading to the tavern'],
        della: ['waddles past with a basket of bread', 'shuffles by smelling of fresh pastries', 'walks past, dusting flour from her apron'],
        vessa: ['glides past silently', 'drifts through like a shadow', 'passes by with her basket of herbs'],
        mrs_thornwick: ['walks past with dignified purpose', 'strides by with her head held high', 'passes through on official business'],
        lenna: ['hurries past with an armful of books', 'walks by with her nose in a tome', 'scurries past, glasses askew'],
        fiona: ['slips past quietly', 'slinks by trying not to be noticed', 'passes through keeping to the shadows'],
        aldric: ['trudges past, muscles gleaming with sweat', 'walks by wiping soot from his hands', 'strides past with heavy footsteps'],
        corwin: ['hurries past counting coins', 'walks by checking his ledger', 'passes through with a merchant\'s purposeful stride'],
        holt: ['marches past on patrol', 'walks by with watchful eyes', 'passes through scanning for trouble']
    };
    const texts = entrances[npcId] || ['walks past'];
    return texts[Math.floor(Math.random() * texts.length)];
}

// Check if jealousy event should trigger during NPC chat
function shouldTriggerJealousyEvent(observerNpcId) {
    // Only after Mira story day 3 (jealousy system intro)
    if (!gameState.flags.mira_story_day3_complete) return false;

    // Need a current desire
    const observer = gameState.npcs[observerNpcId];
    if (!observer?.currentDesire) return false;

    // 25% chance
    if (Math.random() > 0.25) return false;

    // Find an eligible NPC that could "enter"
    const comparedTo = observer.currentDesire.comparedTo;
    if (!comparedTo) return false;

    // The compared-to NPC should be at a location that could pass by
    // (simplified: just check they exist)
    if (!gameState.npcs[comparedTo]) return false;

    return true;
}

// Get jealousy event data for scene generation
function getJealousyEventData(observerNpcId) {
    const observer = gameState.npcs[observerNpcId];
    const desire = observer.currentDesire;
    if (!desire) return null;

    return {
        observer: observerNpcId,
        entering: desire.comparedTo,
        desire: desire,
        canReveal: canRevealDesire(observerNpcId),
        observerName: getNpcDisplayName(observerNpcId),
        enteringName: getNpcDisplayName(desire.comparedTo),
        bodyPart: getStatDisplayName(desire.stat, true),  // Use dialogue-friendly name
        entranceText: getNpcEntranceText(desire.comparedTo),
        revealText: canRevealDesire(observerNpcId) ? getDesireRevealText(observerNpcId, desire.comparedTo, desire) : null
    };
}

// NPC Schedules - where each NPC is during each phase
// Some NPCs move around, others stay in one place
const NPC_SCHEDULES = {
    mira: {
        morning: 'square',      // Making deliveries
        afternoon: 'tavern',    // Break time
        evening: 'tavern'       // Socializing
    },
    aldric: {
        morning: 'blacksmith',
        afternoon: 'blacksmith',
        evening: 'tavern'       // Takes evenings off
    },
    vessa: {
        morning: 'herbalist',
        afternoon: 'herbalist',
        evening: 'herbalist'    // Often works late
    },
    mrs_thornwick: {
        morning: 'square',      // Town business
        afternoon: 'library',   // Paperwork
        evening: 'home'         // Private
    },
    fiona: {
        morning: 'square',      // Wandering
        afternoon: 'square',    // Looking for opportunities
        evening: 'tavern'       // Warm place to be
    },
    barret: {
        morning: 'tavern',      // Preparing
        afternoon: 'tavern',
        evening: 'tavern'       // Busy hours
    },
    lenna: {
        morning: 'library',
        afternoon: 'library',
        evening: 'home'         // Reading at home
    },
    corwin: {
        morning: 'square',      // When in town (stall in the square)
        afternoon: 'square',
        evening: 'tavern'       // Networking
    },
    della: {
        morning: 'bakery',      // Early baker
        afternoon: 'bakery',
        evening: 'home'         // Resting
    },
    holt: {
        morning: 'guardpost',
        afternoon: 'square',    // Patrol
        evening: 'guardpost'    // Night shift starts
    }
};

// Get where an NPC currently is
function getNpcLocation(npcId) {
    const schedule = NPC_SCHEDULES[npcId];
    if (!schedule) return null;

    // Mira is only available at her scheduled locations every 3rd day
    // On other days, she's "out on deliveries" and unavailable
    if (npcId === 'mira' && !isMiraAvailableToday()) {
        return 'unavailable';
    }

    return schedule[gameState.phase] || 'home';
}

// Get display name for a location ID
const LOCATION_DISPLAY_NAMES = {
    square: 'the Town Square',
    tavern: 'the Tavern',
    blacksmith: 'the Blacksmith',
    herbalist: 'the Herbalist',
    library: 'the Library',
    bakery: 'the Bakery',
    guardpost: 'the Guard Post',
    home: 'home'
};

function getLocationDisplayName(locationId) {
    return LOCATION_DISPLAY_NAMES[locationId] || locationId;
}

// Get all NPCs at a specific location
function getNpcsAtLocation(locationId) {
    const npcsHere = [];
    for (const npcId in NPC_SCHEDULES) {
        if (getNpcLocation(npcId) === locationId) {
            npcsHere.push(npcId);
        }
    }
    return npcsHere;
}

// Check if NPC is available for interaction at their location
function isNpcAvailable(npcId) {
    const location = getNpcLocation(npcId);
    // NPCs at 'home' are not available unless invited
    return location !== 'home';
}

// Get trust thresholds for an NPC
function getNpcTrustThresholds(npcId) {
    return NPC_TRUST_THRESHOLDS[npcId] || NPC_TRUST_THRESHOLDS.mira;
}

// Check if NPC's desire is revealed (trust >= desireReveal threshold)
function isDesireRevealed(npcId) {
    const trust = gameState.npcs[npcId]?.trust || 0;
    const thresholds = getNpcTrustThresholds(npcId);
    return trust >= thresholds.desireReveal;
}

// Trust calculation for dynamic desire system
// Simpler: moving toward desire = +2 trust, fulfilling = +3 trust, sandbox = no change
function calculateTrustChangeNew(npcId, stat, oldValue, newValue, desireFulfilled) {
    const trust = gameState.npcs[npcId]?.trust || 0;
    const thresholds = getNpcTrustThresholds(npcId);

    // At sandbox level (max trust), no trust changes
    if (trust >= thresholds.sandbox) {
        return { trustChange: 0, feedback: 'sandbox', message: "They trust you completely." };
    }

    // Desire fulfilled - trust boost for reaching target
    if (desireFulfilled) {
        return { trustChange: 3, feedback: 'perfect', message: '"That\'s perfect! Exactly what I wanted!"' };
    }

    // Moving toward desire - moderate trust boost
    const npc = gameState.npcs[npcId];
    if (npc.currentDesire && npc.currentDesire.stat === stat) {
        const target = npc.currentDesire.target;
        const gettingCloser = Math.abs(newValue - target) < Math.abs(oldValue - target);
        if (gettingCloser) {
            return { trustChange: 2, feedback: 'progress', message: '"That\'s good! Keep going..."' };
        }
    }

    // Generic transformation - small trust boost for willingness
    return { trustChange: 1, feedback: 'unknown', message: "They seem uncertain about the change." };
}

// Apply trust change to an NPC (max trust is 100)
function applyTrustChange(npcId, change, halveTrust = false) {
    if (!gameState.npcs[npcId]) return;
    if (!isNpcUnlocked(npcId)) return;

    const oldTrust = gameState.npcs[npcId].trust || 0;

    if (halveTrust) {
        gameState.npcs[npcId].trust = Math.floor(gameState.npcs[npcId].trust / 2);
    } else {
        gameState.npcs[npcId].trust = Math.max(0, Math.min(100, gameState.npcs[npcId].trust + change));
    }

    const newTrust = gameState.npcs[npcId].trust;

    // Check if trust crossed the intimate threshold - regenerate profile to include genitalia desires
    saveState();
}

// Check if player can attempt a transformation on an NPC
// Gated by desireReveal threshold - once desires are revealed, transformations are allowed
function canTransformNpc(npcId) {
    const trust = gameState.npcs[npcId]?.trust || 0;
    const thresholds = getNpcTrustThresholds(npcId);

    if (trust < thresholds.desireReveal) {
        return { canTransform: false, reason: "They don't trust you enough yet." };
    }
    return { canTransform: true };
}

// Check if player can access romantic/intimate content with an NPC
// Male NPCs (chest=0, genitalia=1) are only available to female players
// Once transformed to female presentation, available to all players
function canAccessRomanticContent(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return false;

    // If NPC no longer has male body (transformed to dickgirl or full female), available to all
    if (!hasMaleBody(npcId)) return true;

    // If NPC still has male body, only available to female players (genitalia=0)
    return gameState.player.body.genitalia === 0;
}

// Check if player can flirt with an NPC
function canFlirtWithNpc(npcId) {
    const trust = gameState.npcs[npcId]?.trust || 0;
    const thresholds = getNpcTrustThresholds(npcId);

    // Check romantic content access for male NPCs
    if (!canAccessRomanticContent(npcId)) {
        return { canFlirt: false, reason: "He doesn't seem interested in that kind of attention from you." };
    }

    if (trust < thresholds.flirt) {
        return { canFlirt: false, reason: "You don't know them well enough yet." };
    }
    return { canFlirt: true };
}

// Check if intimate interactions are available
function canBeIntimateWithNpc(npcId) {
    const trust = gameState.npcs[npcId]?.trust || 0;
    const thresholds = getNpcTrustThresholds(npcId);

    // Check romantic content access for male NPCs
    if (!canAccessRomanticContent(npcId)) {
        return { canBeIntimate: false, reason: "He doesn't seem interested in that kind of relationship with you." };
    }

    if (trust < thresholds.intimate) {
        return { canBeIntimate: false, reason: "Your relationship isn't deep enough yet." };
    }
    return { canBeIntimate: true };
}

// NPC Personalities - affects how they react to player changes
const NPC_PERSONALITIES = {
    mira: { type: 'friendly', style: 'casual' },      // Friendly, casual comments
    aldric: { type: 'gruff', style: 'blunt' },        // Direct, no-nonsense
    vessa: { type: 'curious', style: 'analytical' },  // Intrigued, observational
    mrs_thornwick: { type: 'proper', style: 'polite' }, // Dignified, tactful
    fiona: { type: 'shy', style: 'awkward' },         // Nervous, stammering
    barret: { type: 'flirty', style: 'playful' },     // Teasing, suggestive
    lenna: { type: 'shy', style: 'bookish' },         // Quiet, flustered
    corwin: { type: 'charming', style: 'smooth' },    // Suave, complimentary
    della: { type: 'motherly', style: 'warm' },       // Caring, gentle
    holt: { type: 'stoic', style: 'formal' }          // Professional, restrained
};

// NPC Reaction dialogues for prototype effects
const PROTOTYPE_EFFECT_REACTIONS = {
    hair_pink: {
        friendly: "Whoa, your hair! That's... actually kind of cute?",
        gruff: "What happened to your head?",
        curious: "Fascinating... what caused that pigmentation change?",
        proper: "My, that's quite a... bold hair choice.",
        shy: "Y-your hair is... um... pink?",
        flirty: "Ooh, I like the new look! Very eye-catching.",
        charming: "Pink suits you, I must say.",
        motherly: "Oh dear, what happened to your lovely hair?",
        stoic: "I see you've had an... incident."
    },
    hair_white: {
        friendly: "Your hair went white! Are you okay?",
        gruff: "You look like you've seen a ghost.",
        curious: "Complete depigmentation... remarkable.",
        proper: "Very... distinguished looking.",
        shy: "W-white hair... like snow...",
        flirty: "Ooh, mysterious! I like it.",
        charming: "Silver fox, eh? Suits you.",
        motherly: "Oh dear, did something frighten you?",
        stoic: "Premature graying, I see."
    },
    hair_long: {
        friendly: "Your hair is SO long! How did that happen?!",
        gruff: "You're gonna trip on that.",
        curious: "Rapid follicle growth... fascinating!",
        proper: "That's... quite a lot of hair.",
        shy: "S-so much hair...",
        flirty: "All that hair... I want to run my fingers through it.",
        charming: "Very dramatic. I approve.",
        motherly: "Oh my, you could braid that for days!",
        stoic: "That seems impractical."
    },
    bald: {
        friendly: "Oh no! What happened to your hair?!",
        gruff: "Ha! Smooth as an egg.",
        curious: "Complete hair loss... reversible, I hope?",
        proper: "Oh... oh my.",
        shy: "Y-your hair... it's gone...",
        flirty: "Bald can be sexy, you know.",
        charming: "Bold choice. Very bold.",
        motherly: "Oh you poor thing! It'll grow back, I'm sure.",
        stoic: "I see you've lost your hair."
    },
    big_lips: {
        friendly: "Your lips look... different. Bigger?",
        gruff: "What's wrong with your face?",
        curious: "Lip tissue inflammation? Or enhancement?",
        proper: "Your lips seem rather... full today.",
        shy: "Y-your lips are... um...",
        flirty: "Mmm, those lips look very kissable now.",
        charming: "Pouty. It works for you.",
        motherly: "Oh dear, did something bite you?",
        stoic: "Your lips appear swollen."
    },
    elf_ears: {
        friendly: "You have elf ears!! That's so cool!",
        gruff: "The hell happened to your ears?",
        curious: "Pointed ears... elven ancestry awakened?",
        proper: "Your ears have become rather... pointed.",
        shy: "E-elf ears... like in stories...",
        flirty: "Elf ears? That's kind of hot actually.",
        charming: "Very mystical. Suits the workshop owner.",
        motherly: "Oh my! Look at your little ears!",
        stoic: "Your ears have changed shape."
    },
    eyes_purple: {
        friendly: "Your eyes are glowing purple! Are you okay?!",
        gruff: "Your eyes look weird.",
        curious: "Bioluminescent eyes... magical saturation?",
        proper: "Your eyes are rather... alarming.",
        shy: "Y-your eyes... they're glowing...",
        flirty: "Those eyes... I could get lost in them.",
        charming: "Mesmerizing. Truly.",
        motherly: "Oh dear, your eyes! Does it hurt?",
        stoic: "Your eyes are emitting light."
    },
    eyes_red: {
        friendly: "Whoa, your eyes are red! And glowing!",
        gruff: "You look possessed.",
        curious: "Red luminescence... demonic influence?",
        proper: "That's rather... unsettling.",
        shy: "Y-your eyes... scary...",
        flirty: "Ooh, dangerous eyes. I like it.",
        charming: "Intense. Very intense.",
        motherly: "Oh my word! Your eyes!",
        stoic: "Your eyes appear abnormal."
    },
    huge_hands: {
        friendly: "Your hands are HUGE!",
        gruff: "Could crush a melon with those.",
        curious: "Localized gigantism... interesting.",
        proper: "Your hands are rather... enlarged.",
        shy: "B-big hands...",
        flirty: "Big hands, hm? I wonder what else...",
        charming: "Those could be useful for... many things.",
        motherly: "Oh dear, your poor hands!",
        stoic: "Your hands have grown significantly."
    },
    four_arms: {
        friendly: "YOU HAVE FOUR ARMS!!",
        gruff: "What in the...",
        curious: "Extra limbs! This is unprecedented!",
        proper: "That's... that's not natural.",
        shy: "F-four... arms...",
        flirty: "Four arms means more to hold me with~",
        charming: "Well. That's new.",
        motherly: "Oh my goodness! Extra arms!",
        stoic: "You appear to have additional limbs."
    },
    tail: {
        friendly: "You grew a TAIL?!",
        gruff: "Got a tail now, do ya?",
        curious: "Caudal appendage... remarkable!",
        proper: "Is that... a tail?",
        shy: "Y-you have a... tail...",
        flirty: "A tail? How... animalistic. I like it.",
        charming: "That's quite the new accessory.",
        motherly: "A tail! Can you control it?",
        stoic: "You've grown a tail."
    },
    skin_blue: {
        friendly: "You're blue! Like, your whole skin!",
        gruff: "You look like you froze to death.",
        curious: "Dermal pigmentation shift... fascinating!",
        proper: "You're looking rather... unwell.",
        shy: "Y-you're blue...",
        flirty: "Blue looks good on you. All over.",
        charming: "Very exotic. I'm intrigued.",
        motherly: "Oh dear, are you feeling alright?",
        stoic: "Your skin has changed color."
    },
    skin_green: {
        friendly: "You're green! Like an orc or something!",
        gruff: "You look seasick.",
        curious: "Green dermis... plant-like adaptation?",
        proper: "You're looking rather... verdant.",
        shy: "G-green skin...",
        flirty: "Green's a good color. Very... wild.",
        charming: "Interesting complexion. It works.",
        motherly: "Oh my, you've gone green!",
        stoic: "Your skin pigmentation has altered."
    },

    // Inflation effects (day-ending)
    inflate_breasts: {
        friendly: "Oh my gosh! Are you okay?! Your chest is HUGE!",
        gruff: "What the... You're gonna tip over!",
        curious: "Remarkable inflation... how are you even standing?",
        proper: "Good heavens! That's... that's quite alarming!",
        shy: "Y-your... they're so... so big...",
        flirty: "Wow... those are impressively massive~",
        charming: "Well. That's quite the... development.",
        motherly: "Oh you poor dear! Those must be so heavy!",
        stoic: "Your chest has expanded to an impractical degree."
    },
    inflate_butt: {
        friendly: "Your butt! It's like a giant balloon!",
        gruff: "Ha! You're not fitting through any doors like that.",
        curious: "Fascinating... gluteal hyper-expansion!",
        proper: "Oh my! That's... extremely pronounced.",
        shy: "Y-your behind... it's... so round...",
        flirty: "Now THAT'S a rear view~",
        charming: "That's... impressively spherical.",
        motherly: "Oh dear! How will you sit down?",
        stoic: "Your posterior has reached critical mass."
    },
    inflate_body: {
        friendly: "You're like a balloon!! Are you floating?!",
        gruff: "You look like you swallowed a weather balloon.",
        curious: "Full body inflation... unprecedented!",
        proper: "This is extremely concerning!",
        shy: "Y-you're so... round...",
        flirty: "Very... rotund. Still cute though~",
        charming: "Well, you're certainly... spherical now.",
        motherly: "Oh no! Can you even move?",
        stoic: "You appear to have become approximately spherical."
    },
    inflate_belly: {
        friendly: "Your belly! Are you okay?! It's huge!",
        gruff: "Look like you swallowed a barrel.",
        curious: "Abdominal inflation... most unusual!",
        proper: "That looks extremely uncomfortable!",
        shy: "Y-your belly... it's so swollen...",
        flirty: "That's quite the belly you've got there~",
        charming: "Quite the... prominent midsection.",
        motherly: "Oh dear, does it hurt? Let me get you a chair!",
        stoic: "Your abdomen has expanded significantly."
    },
    inflate_hips: {
        friendly: "Whoa! Your hips got WIDE!",
        gruff: "You're not gonna fit through doorways like that.",
        curious: "Hip expansion... interesting proportions!",
        proper: "That's a rather... dramatic change.",
        shy: "Y-your hips... they're so wide...",
        flirty: "Those hips don't lie~ They're saying 'hello!'",
        charming: "Very... statuesque proportions now.",
        motherly: "Oh my! Those are some child-bearing hips!",
        stoic: "Your hip-to-shoulder ratio has changed dramatically."
    }
};

// NPC Reaction dialogues for permanent body changes
const BODY_CHANGE_REACTIONS = {
    height_increase: {
        friendly: "Did you get taller? Looking good!",
        gruff: "You're bigger.",
        curious: "Height increase... transformation device?",
        proper: "You seem to have grown.",
        shy: "Y-you're taller...",
        flirty: "Mmm, taller. I like looking up at you.",
        charming: "Standing a bit taller, I see.",
        motherly: "Oh, you've grown! Still eating well?",
        stoic: "You've increased in height."
    },
    height_decrease: {
        friendly: "Did you get shorter? You look cute!",
        gruff: "You shrunk.",
        curious: "Height reduction... interesting application.",
        proper: "You seem... more compact.",
        shy: "Y-you're shorter... it's cute...",
        flirty: "Shorter now? Perfect hugging height~",
        charming: "More petite. It suits you.",
        motherly: "Oh my, you seem smaller!",
        stoic: "Your height has decreased."
    },
    chest_increase: {
        friendly: "Whoa, you're looking... fuller up top!",
        gruff: "Got bigger, did ya?",
        curious: "Chest development... deliberate?",
        proper: "You seem... more endowed.",
        shy: "Y-your chest... it's bigger...",
        flirty: "Well hello there! Those are impressive.",
        charming: "Filling out nicely, I see.",
        motherly: "Oh! You're looking more... developed!",
        stoic: "Your chest has increased in size."
    },
    chest_decrease: {
        friendly: "You're looking more streamlined!",
        gruff: "Smaller up top.",
        curious: "Chest reduction... practical choice.",
        proper: "You seem more... modest.",
        shy: "Y-you look different...",
        flirty: "Different look. Still cute.",
        charming: "Sleeker silhouette. Nice.",
        motherly: "You're looking more petite!",
        stoic: "Your chest has decreased in size."
    },
    butt_increase: {
        friendly: "Packing a bit more back there, huh?",
        gruff: "Bigger behind.",
        curious: "Gluteal enhancement... for comfort?",
        proper: "You seem more... shapely.",
        shy: "Y-your... um... behind...",
        flirty: "Oh my, that's quite the view from behind~",
        charming: "Curves in all the right places now.",
        motherly: "You're looking very healthy back there!",
        stoic: "Your posterior has enlarged."
    },
    butt_decrease: {
        friendly: "Looking more athletic back there!",
        gruff: "Less junk in the trunk.",
        curious: "Gluteal reduction... streamlining?",
        proper: "You seem more... svelte.",
        shy: "Y-you look different...",
        flirty: "Tighter back there. Nice.",
        charming: "Sleeker profile. I approve.",
        motherly: "You're looking trimmer!",
        stoic: "Your posterior has reduced."
    },
    muscle_increase: {
        friendly: "Wow, you've been working out!",
        gruff: "Getting stronger. Good.",
        curious: "Muscle development... physical training?",
        proper: "You seem more... toned.",
        shy: "Y-you're more muscular...",
        flirty: "Ooh, someone's been getting buff~",
        charming: "Looking powerful. I like it.",
        motherly: "My, you're getting strong!",
        stoic: "Your muscle mass has increased."
    },
    muscle_decrease: {
        friendly: "You're looking softer!",
        gruff: "Lost some muscle.",
        curious: "Muscle atrophy... deliberate?",
        proper: "You seem more... gentle.",
        shy: "Y-you look softer...",
        flirty: "Softer now. Still nice.",
        charming: "Less bulk. Different look.",
        motherly: "You're looking more relaxed!",
        stoic: "Your muscle mass has decreased."
    }
};

// Player body commentary - NPCs comment on prominent stats during regular interactions
// Organized by stat → variant → personality type → array of lines
// Variant is trust-gated: regular (below intimate), horny (at/above intimate)
const PLAYER_BODY_COMMENTS = {
    chest: {
        regular: {
            friendly: [
                `{mira}"I'm not gonna lie, boss, your boobs are amazing." She grins. {mira}"Like, seriously. Wow."`,
                `{mira}"Have I mentioned how great your boobs look? Because they do. They really, really do."`,
                `Mira's eyes drift down and she catches herself. {mira}"Sorry! It's just... you've got really nice boobs, boss."`
            ],
            gruff: [
                `Aldric glances at your chest, then away. {aldric}"Nice rack. Not gonna dance around it."`,
                `{aldric}"Hard not to notice those." He nods at your chest. {aldric}"Look good on you."`,
                `{aldric}"You fill out a shirt pretty well. Just an observation."`
            ],
            curious: [
                `Vessa's gaze lingers on your chest with detached appreciation. {vessa}"Impressive proportions. Quite the silhouette."`,
                `{vessa}"I keep noticing your chest. Purely from an aesthetic standpoint, you understand."`,
                `{vessa}"The way your body has developed... your chest especially. Remarkable composition."`
            ],
            proper: [
                `Mrs. Thornwick's eyes flicker downward for just a moment. {mrs_thornwick}"You carry yourself well. Very... striking figure."`,
                `{mrs_thornwick}"I hope you don't mind my saying, but your figure is quite... prominent." She clears her throat.`,
                `{mrs_thornwick}"One can't help but notice your... endowments. You wear them with confidence."`
            ],
            shy: [
                `{fiona}"Y-you..." She catches herself staring at your chest and turns bright red. {fiona}"Sorry! I just... you look really good."`,
                `Fiona's gaze drops to your chest, then snaps away. She hugs herself tighter. {fiona}"...your body is really something."`,
                `{lenna}"Your, um..." Lenna adjusts her glasses, cheeks pink. {lenna}"Your figure is very... noticeable. In a good way!"`
            ],
            flirty: [
                `Barret leans back, eyeing your chest openly. {barret}"You know what those do to people, right? Because if not, let me tell you... devastating."`,
                `{barret}"I've seen a lot of bodies in my tavern, love. Yours?" She gestures at your chest. {barret}"Top shelf."`,
                `{barret}"Every time you walk in I stare at your chest. Just thought you should know."`
            ],
            charming: [
                `Corwin's eyes dip briefly before meeting yours again. {corwin}"Forgive me. It's difficult not to admire your... assets."`,
                `{corwin}"I've been trying not to stare, but you make it terribly difficult." A smooth smile. {corwin}"Your figure is exquisite."`,
                `{corwin}"That silhouette... you could ruin someone's concentration from across the room. Mine, specifically."`
            ],
            motherly: [
                `Della's eyes widen and she catches herself. {della}"Oh my, dear. You're looking very... full-figured." She fans herself.`,
                `{della}"I hope this isn't forward, but you have a lovely chest, dear." She blushes. {della}"I noticed. I'm only human."`,
                `{della}"My goodness, dear. I keep catching myself looking at your... well." She gestures vaguely. {della}"You're very blessed."`
            ],
            stoic: [
                `Holt's eyes remain professionally forward. Almost. {holt}"Your physique is... noteworthy. I'll leave it at that."`,
                `{holt}"I've noticed your build has become quite... prominent." A pause. {holt}"An observation. Nothing more."`,
                `{holt}"You have a commanding presence. Particularly your..." She stops herself. {holt}"You carry it well."`
            ]
        },
        horny: {
            friendly: [
                `{mira}"God, your tits are so big, boss." She bites her lip, not even pretending to look away. {mira}"I think about them a lot. Like... a lot."`,
                `Mira stares openly at your chest. {mira}"I just wanna bury my face in there. Is that weird? I don't care if it's weird."`,
                `{mira}"Every time I see you I forget how huge your tits are." She exhales shakily. {mira}"It's not fair."`
            ],
            gruff: [
                `Aldric stares at your chest, jaw tight. {aldric}"Your tits are driving me crazy. Just so you know."`,
                `{aldric}"I keep thinking about getting my hands on those." She nods at your chest. {aldric}"Can't help it."`,
                `{aldric}"Look, I'm not good with words. Your tits are incredible and I want to touch them. There."`
            ],
            curious: [
                `Vessa's composure slips, her eyes fixed on your chest. {vessa}"I find myself... distracted by your breasts. More than I'd like to admit."`,
                `{vessa}"I've studied many bodies. Yours..." Her gaze lingers on your chest. {vessa}"Yours makes me want to do more than study."`,
                `{vessa}"Your breasts are exquisite. I want to map every curve with my hands." Her voice is lower than usual.`
            ],
            proper: [
                `Mrs. Thornwick's composure cracks. {mrs_thornwick}"Your breasts are..." She swallows. {mrs_thornwick}"I want to touch them. Forgive me, I shouldn't say that."`,
                `{mrs_thornwick}"I've been trying not to stare at your chest all day." Her voice drops. {mrs_thornwick}"I'm failing."`,
                `{mrs_thornwick}"Propriety be damned. Your tits are magnificent and I can't stop thinking about them."`
            ],
            shy: [
                `{fiona}"I keep thinking about your breasts." Her face burns scarlet but she doesn't look away. {fiona}"I can't help it. They're so... big..."`,
                `Fiona's gaze drops to your chest and stays there, her breathing uneven. {fiona}"I want to touch them. Please."`,
                `{lenna}"Your breasts are..." Lenna's voice is barely audible. {lenna}"I've been having dreams about them. Very... detailed dreams."`
            ],
            flirty: [
                `Barret's eyes are locked on your chest. {barret}"I want those tits in my face. Tonight. That's not a request, love."`,
                `{barret}"Your tits are the best thing I've seen all week and I run a tavern full of drunks trying to impress me."`,
                `{barret}"I'm going to be honest, love. I've been thinking about sucking on your tits since you walked in."`
            ],
            charming: [
                `Corwin's smooth facade wavers. {corwin}"Your breasts... I've been trying to be civilized about this, but I want my hands on them."`,
                `{corwin}"I find myself unable to focus on business." Her eyes are on your chest. {corwin}"You're entirely too distracting."`,
                `{corwin}"I'd pay any price for a night with those." She nods at your chest, all pretense of charm gone. {corwin}"Name it."`
            ],
            motherly: [
                `Della's cheeks are flushed. {della}"Dear, I... I can't stop looking at your breasts." She laughs nervously. {della}"A woman my age, honestly..."`,
                `{della}"I've been having the most inappropriate thoughts about your chest, dear." She fans herself. {della}"Very inappropriate."`,
                `{della}"Oh, to hell with it. Your tits are gorgeous and I want my hands on them." She claps a hand over her mouth, laughing.`
            ],
            stoic: [
                `Holt's professional mask slips. {holt}"Your breasts... I've been trying not to think about them." A strained pause. {holt}"I've been failing."`,
                `{holt}"I want to touch your chest." The words come out flat, factual. Her eyes say something very different.`,
                `{holt}"Composure has its limits. Yours are..." She stares at your chest. {holt}"...testing mine considerably."`
            ]
        }
    },
    butt: {
        regular: {
            friendly: [
                `{mira}"Okay, I have to say it... your butt looks incredible, boss." She gives a chef's kiss.`,
                `Mira tilts her head as you walk past. {mira}"You know you've got a great rear view, right? Just making sure you know."`,
                `{mira}"I'd kill for a butt like yours, boss. Just saying."`
            ],
            gruff: [
                `Aldric watches you walk past, then grunts. {aldric}"Nice ass. I said what I said."`,
                `{aldric}"You've got a hell of a rear on you. Not complaining."`,
                `{aldric}"Hard to miss that backside." She shrugs. {aldric}"Looks good."`
            ],
            curious: [
                `Vessa watches you pass with an appraising eye. {vessa}"Your proportions from behind are... quite striking."`,
                `{vessa}"The curve of your hips, the shape of your rear... aesthetically quite pleasing."`,
                `{vessa}"I find myself noticing your backside more than is strictly polite. An occupational hazard of studying form."`
            ],
            proper: [
                `Mrs. Thornwick's gaze lingers a moment too long as you turn. {mrs_thornwick}"You have a very... shapely figure. From all angles."`,
                `{mrs_thornwick}"I noticed your... silhouette is rather eye-catching. Particularly from behind." She straightens her collar.`,
                `{mrs_thornwick}"One tries not to stare, but your posterior is quite... commanding."`
            ],
            shy: [
                `Fiona's eyes go wide as you walk past. She quickly looks at the ground. {fiona}"Y-your... um... from behind you're... really..."`,
                `{fiona}"I wasn't looking at your butt!" She absolutely was. {fiona}"I mean... it's just... there..."`,
                `Lenna drops her book as you turn around. {lenna}"Oh! I... sorry, I was just... your figure is very... um..."`
            ],
            flirty: [
                `Barret watches you walk by with undisguised appreciation. {barret}"That rear view, love. Criminal. Absolutely criminal."`,
                `{barret}"If I had an ass like yours I'd charge admission." She winks. {barret}"Just saying."`,
                `{barret}"Turn around again. Slowly." She grins. {barret}"I wasn't done looking."`
            ],
            charming: [
                `Corwin's eyes follow you as you turn. {corwin}"Has anyone told you your figure from behind is... devastating?"`,
                `{corwin}"I try to be a gentleman, but your backside makes that extraordinarily difficult."`,
                `{corwin}"I've been admiring the view, I won't lie." A charming half-smile. {corwin}"You're a work of art from every angle."`
            ],
            motherly: [
                `Della watches you pass and catches herself. {della}"Oh my... you have such lovely curves, dear." She blushes.`,
                `{della}"Don't mind me, dear, I just... couldn't help noticing your figure." She gestures behind herself. {della}"Very shapely."`,
                `{della}"In my day we'd call that a figure worth painting." She fans herself. {della}"Still is, honestly."`
            ],
            stoic: [
                `Holt's eyes track you briefly as you pass. {holt}"Your build is... well-proportioned. From all angles." She looks away.`,
                `{holt}"I noticed your physique. Specifically from behind." A stiff pause. {holt}"That came out wrong."`,
                `{holt}"You carry yourself with presence. Especially when walking away." The faintest color rises in her cheeks.`
            ]
        },
        horny: {
            friendly: [
                `{mira}"Boss, your ass is unreal." She fans herself. {mira}"I'm serious, I lose my train of thought every time you turn around."`,
                `Mira's gaze lingers as you walk past. {mira}"I want to grab it so bad. Your butt. I want to grab your butt. Just putting that out there."`,
                `{mira}"You have no idea what your ass does to me, boss." Her voice drops. {mira}"Or maybe you do and you're doing it on purpose."`
            ],
            gruff: [
                `{aldric}"Your ass is all I can think about." She clenches her jaw. {aldric}"I want to grab it. Hard."`,
                `Aldric stares as you pass. {aldric}"I need my hands on that ass. I'm done pretending I don't."`,
                `{aldric}"Turn around. Let me look." Her voice is rough. {aldric}"God, that's a perfect ass."`
            ],
            curious: [
                `Vessa's analytical tone wavers. {vessa}"Your rear is... I've lost my objectivity entirely. I want to touch it."`,
                `{vessa}"I've been studying your backside and my thoughts have become distinctly... unscientific."`,
                `{vessa}"Your ass is magnificent." The word comes out raw, unfiltered. She blinks, surprised at herself.`
            ],
            proper: [
                `{mrs_thornwick}"I've been watching you walk away and I..." She closes her eyes. {mrs_thornwick}"Your ass is all I can think about."`,
                `Mrs. Thornwick's hand twitches. {mrs_thornwick}"I want to grab your rear so badly my hands are shaking. This is mortifying."`,
                `{mrs_thornwick}"That ass of yours. I dream about it." She says it like a confession. {mrs_thornwick}"Vividly."`
            ],
            shy: [
                `Fiona's face is burning. {fiona}"Your... your butt. I keep staring and I can't stop." Her voice is tiny. {fiona}"It's so big and round and I just..."`,
                `{fiona}"I want to... touch your butt." She looks like she might faint. {fiona}"I'm sorry. I'm sorry. I just really want to."`,
                `Lenna's book lies forgotten. {lenna}"Your rear is... I've been writing about it in my journal." She whispers. {lenna}"Extensively."`
            ],
            flirty: [
                `{barret}"I want to bend you over this bar and worship that ass, love." She's not joking. {barret}"Say the word."`,
                `Barret grabs your arm, pulling you closer. {barret}"Your ass is driving me insane. I need to get my hands on it. Now."`,
                `{barret}"I've been staring at your ass all day. Not sorry. Not even a little." She licks her lips.`
            ],
            charming: [
                `Corwin's composure cracks. {corwin}"Your ass... I've been trying to be smooth about this but I just want to grab it."`,
                `{corwin}"All my charm, all my wit, and all I can think about is your rear." She shakes her head. {corwin}"You've ruined me."`,
                `{corwin}"I want my hands on your ass. No clever framing. Just that." Her voice is strained.`
            ],
            motherly: [
                `{della}"Dear, I... oh goodness." She stares at your rear. {della}"I want to squeeze it. There, I said it."`,
                `Della fans herself vigorously. {della}"Your backside is... I've been having very un-motherly thoughts about it, dear."`,
                `{della}"I dreamed about your behind last night." She laughs, mortified. {della}"At my age! But honestly... it's just so perfect."`
            ],
            stoic: [
                `{holt}"Your ass." She says it flatly, like a status report. {holt}"I can't stop thinking about it. That's... a problem."`,
                `Holt's jaw tightens as you walk past. {holt}"I want to touch your rear. I've been trying not to want that. It's not working."`,
                `{holt}"Professionally speaking..." She trails off, staring. {holt}"There's nothing professional about what I'm thinking right now."`
            ]
        }
    },
    muscle: {
        regular: {
            friendly: [
                `{mira}"Looking strong, boss!" She squeezes your arm without asking. {mira}"Oh wow, yeah, that's real."`,
                `Mira whistles. {mira}"Seriously, your build is something else. You could probably throw me across the workshop."`,
                `{mira}"I keep forgetting how built you are until I'm standing next to you." She laughs. {mira}"It's a little intimidating, honestly!"`
            ],
            gruff: [
                `Aldric sizes you up approvingly. {aldric}"Good build. You could hold your own at the forge."`,
                `{aldric}"Arms like that don't happen by accident." A nod of respect. {aldric}"Impressive."`,
                `{aldric}"You're built solid. I appreciate that in a person."`
            ],
            curious: [
                `Vessa appraises your frame with clinical interest. {vessa}"Remarkable musculature. The result of the devices, I presume?"`,
                `{vessa}"Your physique is quite developed. I find myself... noticing." She tilts her head. {vessa}"Frequently."`,
                `{vessa}"The definition in your arms, your shoulders... very aesthetically compelling."`
            ],
            proper: [
                `{mrs_thornwick}"You have a very... athletic build." Her eyes trace your arms briefly. {mrs_thornwick}"Quite impressive."`,
                `Mrs. Thornwick watches you lift something with ease. {mrs_thornwick}"My. You're stronger than you look. And you already look quite strong."`,
                `{mrs_thornwick}"Your physique is quite commanding. One feels very... safe in your presence."`
            ],
            shy: [
                `Fiona sneaks a glance at your arms. {fiona}"You're really... strong. Like, really strong." She fidgets.`,
                `{fiona}"I bet you could pick me up with one arm..." She goes red. {fiona}"N-not that I was thinking about that!"`,
                `Lenna peeks over her book at your arms. {lenna}"Your build is very... the word is... imposing? In a good way!"`
            ],
            flirty: [
                `Barret reaches out and squeezes your arm. {barret}"Ooh. Yeah. That's the good stuff, love."`,
                `{barret}"Muscles like that should be illegal." She traces a finger along your bicep. {barret}"Or at least taxed."`,
                `{barret}"Flex for me." She grins. {barret}"I'm serious. I want to see."`
            ],
            charming: [
                `{corwin}"That build of yours... it's distracting in the best possible way."`,
                `Corwin watches you move with undisguised appreciation. {corwin}"Powerful. Graceful. A rare combination."`,
                `{corwin}"I find myself wanting to be closer to you. Specifically closer to those arms."`
            ],
            motherly: [
                `{della}"My goodness, you're strong, dear." Della pats your arm. {della}"Makes me feel very safe, I must say."`,
                `Della watches you carry something and fans herself. {della}"Oh, to be young with arms like that..."`,
                `{della}"You've got the build of those figures in the old paintings, dear. Very... heroic."`
            ],
            stoic: [
                `Holt gives your frame an appraising look. {holt}"Good build. You could pass the guard fitness exam."`,
                `{holt}"Your physique is impressive." She says it like reading from a report. {holt}"Objectively."`,
                `{holt}"I respect a strong build." The briefest glance at your arms. {holt}"Yours is... notable."`
            ]
        },
        horny: {
            friendly: [
                `{mira}"I keep imagining you picking me up, boss." Her cheeks are flushed. {mira}"Like, just... lifting me. With those arms. Whenever you want."`,
                `Mira squeezes your arm and doesn't let go. {mira}"You're so strong... I want you to pin me down." She laughs nervously. {mira}"I said that out loud, didn't I?"`,
                `{mira}"Your body is ridiculous." She traces a finger along your arm. {mira}"I want to feel all of it on top of me."`
            ],
            gruff: [
                `{aldric}"I want those arms around me." She says it flat, like a fact. {aldric}"Tight. Like you're not letting go."`,
                `Aldric grabs your arm, feeling the muscle. {aldric}"Pin me against the wall. I dare you."`,
                `{aldric}"You're so strong it makes my knees weak." She scowls like she's angry about it. {aldric}"Do something about that."`
            ],
            curious: [
                `{vessa}"Your physique is... I want to feel those muscles pressed against me." Her composure flickers. {vessa}"All of them."`,
                `Vessa runs her fingers along your arm, breathing shallow. {vessa}"I want you to hold me down. For... research purposes."`,
                `{vessa}"The strength in your body..." Her voice drops. {vessa}"I want to feel it. On me. In me. Everywhere."`
            ],
            proper: [
                `{mrs_thornwick}"Your arms..." Mrs. Thornwick swallows. {mrs_thornwick}"I want them around me. I want to feel how strong you are."`,
                `{mrs_thornwick}"I keep imagining you lifting me. Carrying me. Holding me down." She presses her lips together. {mrs_thornwick}"It's very distracting."`,
                `{mrs_thornwick}"Throw me over your shoulder and take me somewhere private." She blinks, shocked at her own words.`
            ],
            shy: [
                `{fiona}"I want you to... hold me." She barely whispers it. {fiona}"With those arms. Tight. So I can't get away." Her face is on fire.`,
                `Fiona stares at your arms, trembling. {fiona}"Pick me up. Please. I want... I want to feel how strong you are."`,
                `{lenna}"I've been fantasizing about your arms." Lenna's glasses are fogged. {lenna}"Holding me down while you... while we..."`
            ],
            flirty: [
                `{barret}"Pick me up and put me on this bar." She's dead serious. {barret}"Right now. I want to feel those arms."`,
                `Barret grabs your bicep, squeezing hard. {barret}"Fuck. Carry me to bed. I'm not asking."`,
                `{barret}"I want you to hold me down with those arms and have your way with me, love. Every muscle. Every inch."`
            ],
            charming: [
                `{corwin}"I've given up pretending." She stares at your arms. {corwin}"I want those hands on me. Rough. Now."`,
                `Corwin's smooth veneer cracks. {corwin}"Hold me against the wall. I need to feel how strong you are."`,
                `{corwin}"Your strength... I want it all over me." No charm, no games. {corwin}"Just you. Pinning me down."`
            ],
            motherly: [
                `{della}"Oh dear." Della stares at your arms, fanning herself. {della}"I keep thinking about being held down by you. A woman my age..."`,
                `{della}"I want those arms around me, dear." Her voice is breathless. {della}"Tight. Don't be gentle."`,
                `{della}"Pick me up." She says it soft, almost pleading. {della}"I want to feel how strong you are. All of it."`
            ],
            stoic: [
                `{holt}"I want you to use that strength on me." Her voice is controlled but her breathing isn't. {holt}"Thoroughly."`,
                `Holt stares at your arms. {holt}"Restrain me." A flat command. {holt}"I need to know what those muscles can do."`,
                `{holt}"I've been thinking about your body. Specifically about being underneath it." She exhales slowly. {holt}"Constantly."`
            ]
        }
    },
    penis: {
        regular: {
            friendly: [
                `Mira glances down, then quickly back up, cheeks pink. {mira}"So, uh... those trousers aren't hiding much, boss. Just so you know."`,
                `{mira}"I'm trying really hard not to stare, boss." She is absolutely staring. {mira}"It's just... right there."`,
                `{mira}"I don't know how you walk around with that thing, boss." She laughs, flustered. {mira}"Seriously though."`
            ],
            gruff: [
                `Aldric glances down, then up. {aldric}"That's, uh. That's something. Hard to miss."`,
                `{aldric}"Your trousers are working overtime." A brief glance. {aldric}"Just thought you should know."`,
                `{aldric}"You're not exactly subtle down there." She shrugs. {aldric}"Not a complaint."`
            ],
            curious: [
                `Vessa's gaze drifts downward with clinical curiosity. {vessa}"Your... endowment is rather difficult to overlook. Quite the specimen."`,
                `{vessa}"I find myself noticing your lower proportions. Purely observational." Her cheeks say otherwise.`,
                `{vessa}"The, ah, outline through your clothing is... notable. Impressively so."`
            ],
            proper: [
                `Mrs. Thornwick's eyes dip for a fraction of a second. {mrs_thornwick}"You are... well-equipped. If you'll pardon the observation."`,
                `{mrs_thornwick}"Your trousers seem rather... strained." She adjusts her collar. {mrs_thornwick}"I couldn't help but notice."`,
                `{mrs_thornwick}"One tries to be discreet, but your... proportions are rather attention-commanding."`
            ],
            shy: [
                `Fiona's eyes go wide, staring at your crotch before she snaps her gaze away. {fiona}"I... you... it's really..." She can't finish.`,
                `{fiona}"Y-your..." She gestures vaguely below your waist, face crimson. {fiona}"It's... big. Really big." She hides behind her hands.`,
                `Lenna's book drifts lower and she catches herself staring. {lenna}"Oh! I wasn't... I mean... your, um... goodness."`
            ],
            flirty: [
                `Barret's eyes drop and stay there. {barret}"Well, well. That's quite the package you're carrying around, love."`,
                `{barret}"Not gonna lie, I've been sneaking glances." She nods downward. {barret}"Very impressive."`,
                `{barret}"Those trousers should be illegal on you." She grins. {barret}"Leaving nothing to the imagination and I love it."`
            ],
            charming: [
                `Corwin's gaze dips briefly. {corwin}"You're rather... generously proportioned. I couldn't help but notice."`,
                `{corwin}"I've been trying not to look, but you make discretion terribly difficult." A knowing glance downward.`,
                `{corwin}"You're packing quite the... advantage." A smooth smile that doesn't quite hide the flush in her cheeks.`
            ],
            motherly: [
                `Della's eyes drift downward and she goes pink. {della}"Oh my, dear. You're very... well-endowed." She fans herself.`,
                `{della}"I don't mean to stare, dear, but your..." She gestures. {della}"It's very... prominent."`,
                `{della}"Goodness, dear. Your trousers are working very hard." She lets out a flustered laugh.`
            ],
            stoic: [
                `Holt's gaze stays firmly above the waist. Almost. {holt}"Your... proportions. Below. They're... considerable."`,
                `{holt}"I noticed your... equipment." She says it like a field report. Her ears are red. {holt}"That is all."`,
                `{holt}"You are... well-equipped." A stiff pause. {holt}"Anatomically speaking."`
            ]
        },
        horny: {
            friendly: [
                `Mira's eyes drop and stay there. {mira}"Boss, I... I can't stop looking at your cock. It's so big. I want it so bad."`,
                `{mira}"I think about your cock when I'm on my delivery route." Her face is scarlet but she holds eye contact. {mira}"Like, all the time."`,
                `{mira}"Every time you move I can see it through your trousers and it's..." She swallows hard. {mira}"...driving me crazy, boss."`
            ],
            gruff: [
                `Aldric stares at your crotch. {aldric}"I want that cock." No preamble, no softening. {aldric}"Bad."`,
                `{aldric}"I keep thinking about your dick." She grinds her jaw. {aldric}"What it'd feel like. Inside me."`,
                `{aldric}"Your cock is all I can focus on." She looks frustrated about it. {aldric}"Do something about it."`
            ],
            curious: [
                `Vessa's composure dissolves. {vessa}"Your cock... I've been trying to analyze my fascination objectively." Her breathing quickens. {vessa}"I've failed."`,
                `{vessa}"I want to study your cock. Intimately." The clinical framing can't hide the hunger in her eyes.`,
                `{vessa}"I keep thinking about how you'd feel inside me." She says it like a confession. {vessa}"It's consuming my focus."`
            ],
            proper: [
                `{mrs_thornwick}"Your..." She stares at your crotch. {mrs_thornwick}"I want it. Inside me. I can't believe I'm saying this."`,
                `Mrs. Thornwick's dignified facade crumbles. {mrs_thornwick}"I've been dreaming about your cock. Every night. In great detail."`,
                `{mrs_thornwick}"Decorum be damned." She's staring openly. {mrs_thornwick}"I need that cock. I'm aching for it."`
            ],
            shy: [
                `{fiona}"Your... your cock." She's shaking but doesn't look away. {fiona}"I want it. I want it so much it scares me."`,
                `Fiona stares at your crotch, breathing hard. {fiona}"I think about it... at night. What it would feel like. I can't stop."`,
                `{lenna}"I've been reading about... techniques." She's crimson. {lenna}"For someone your size. I want to try them. On you."`
            ],
            flirty: [
                `{barret}"I want that cock inside me. Tonight." She stares unblinking. {barret}"No games, love. I'm dripping just looking at it."`,
                `Barret grabs your belt. {barret}"I can see it. I want it. In my mouth, in my pussy, I don't care. Just give it to me."`,
                `{barret}"Your cock is the only thing I've thought about all day." She presses against you. {barret}"I need it. Now."`
            ],
            charming: [
                `Corwin's smoothness evaporates. {corwin}"I want your cock." She breathes it out. {corwin}"All of it. I'm done being coy."`,
                `{corwin}"Every deal I've made today I was thinking about your cock instead." Her hand is on your thigh. {corwin}"Take me."`,
                `{corwin}"I need to feel you inside me." No smile, no charm. Just hunger. {corwin}"Please."`
            ],
            motherly: [
                `{della}"Oh, dear... your cock." Della stares, hand over her mouth. {della}"I want it. I've never wanted anything this badly."`,
                `{della}"I keep imagining your... your cock." She's trembling. {della}"Inside me. Filling me up. Oh dear, oh dear..."`,
                `{della}"A woman my age shouldn't think such things." She's breathing hard. {della}"But your cock... I need it, dear. I really do."`
            ],
            stoic: [
                `{holt}"Your cock." She states it flatly. {holt}"I need it inside me. I've run out of ways to not say that."`,
                `Holt stares at your crotch, expressionless. {holt}"I want you to fuck me with that. That's... not a professional assessment."`,
                `{holt}"I've maintained composure through many things." She stares. {holt}"Your cock is not one of them. I need it."`
            ]
        }
    }
};

const DEFAULT_PLAYER_BODY = {
    genitalia: 0,
    genitaliaSize: 0,
    chest: 1,
    muscle: 1,
    butt: 2
};

// NPC starting body stats (used for both body and naturalBody)
const NPC_BODIES = {
    mira: { genitalia: 0, genitaliaSize: 0, chest: 2, muscle: 1, butt: 1 },
    aldric: { genitalia: 1, genitaliaSize: 2, chest: 0, muscle: 1, butt: 1 },
    vessa: { genitalia: 0, genitaliaSize: 1, chest: 2, muscle: 1, butt: 2 },
    mrs_thornwick: { genitalia: 0, genitaliaSize: 1, chest: 3, muscle: 1, butt: 2 },
    fiona: { genitalia: 0, genitaliaSize: 0, chest: 0, muscle: 0, butt: 0 },
    barret: { genitalia: 0, genitaliaSize: 1, chest: 3, muscle: 1, butt: 3 },
    lenna: { genitalia: 0, genitaliaSize: 0, chest: 2, muscle: 1, butt: 1 },
    corwin: { genitalia: 1, genitaliaSize: 1, chest: 0, muscle: 1, butt: 1 },
    della: { genitalia: 0, genitaliaSize: 1, chest: 3, muscle: 1, butt: 3 },
    holt: { genitalia: 1, genitaliaSize: 2, chest: 0, muscle: 1, butt: 1 }
};

// Build NPC state with both body and naturalBody
function buildNpcState(npcId) {
    const body = { ...NPC_BODIES[npcId] };
    return {
        trust: 0,
        body: body,
        naturalBody: { ...body }, // Copy of original stats, never changes
        bodyHistory: [{ body: { ...body }, day: 0 }], // Transformation history snapshots
        desiresRevealed: [false, false, false],
        lastSeenPlayer: null,
        firstDesireFulfilledDay: null,  // Track when first desire was fulfilled
        introCompleted: false,      // Has the player seen this NPC's introduction?
        // Hidden archetype system â€” NPC secretly works toward a body shape
        hiddenArchetype: null,              // Archetype ID (string) â€” hidden from player
        archetypeAchieved: false,           // True when all stats in range
        archetypeAchievedDay: null,         // Day achieved
        archetypeSatisfactionEnd: null,     // Day when post-achievement rest ends
        archetypeHistory: [],               // [{id, achievedDay}] â€” completed archetypes
        archetypeJustAchieved: false,       // Flag for celebration dialogue (cleared after shown)
        pendingGenitalProposal: null,       // {type, targetGenitalia, source, proposedDay}
        goddessRevealed: false,             // Whether NPC has told player about goddess pursuit
        // Track which stat levels have been visited (for first-time vs repeat flavor text)
        reachedLevels: {
            chest: [body.chest],
            muscle: [body.muscle],
            butt: [body.butt],
            genitaliaSize: [body.genitaliaSize],
            genitalia: [body.genitalia]
        }
    };
}

const DEFAULT_STATE = {
    day: 1,
    phase: 'morning', // morning, afternoon, evening

    player: {
        name: 'Player',
        gender: 'female',
        body: { ...DEFAULT_PLAYER_BODY },
        naturalBody: { ...DEFAULT_PLAYER_BODY }, // Original stats
        aether: 2,  // Starting aether stored in the workshop's crystal cube
        coin: 50,
        knowledgeUnlocked: [],
        prototypeEffect: null,  // Current temporary effect from prototype device
        prototypeEffectSeenBy: [],  // NPCs who have already commented on current effect
        canSelfTransform: false  // Unlocked when first NPC reaches their target
    },

    npcs: {
        mira: buildNpcState('mira'),
        aldric: buildNpcState('aldric'),
        vessa: buildNpcState('vessa'),
        mrs_thornwick: buildNpcState('mrs_thornwick'),
        fiona: buildNpcState('fiona'),
        barret: buildNpcState('barret'),
        lenna: buildNpcState('lenna'),
        corwin: buildNpcState('corwin'),
        della: buildNpcState('della'),
        holt: buildNpcState('holt')
    },

    devices: {
        prototypes: true
    },

    currentLocation: 'workshop',
    currentTransformationTarget: null, // NPC id or 'player' when using devices

    // Per-phase interaction tracking
    phaseInteractions: {
        npcsInteracted: [],  // NPC IDs interacted with this phase
        actionCount: 0       // Number of actions taken this phase (talk, flirt, use device)
    },

    // Deferred phase advance - waits until player exits current interaction
    pendingPhaseAdvance: false,

    // Random roll cache - prevents save-scumming by caching rolls per phase
    // Keyed by roll ID (e.g., "d3_morning_mira_visit"), value is the roll result
    phaseRolls: {},

    // Current scene persistence - resume on refresh instead of resetting to workshop
    currentSceneId: null,
    cachedSceneRender: null,

    // Mira workshop delivery system
    workshopVisitCount: 0,  // Increments each workshop visit, triggers Mira delivery at 12

    // Aether system
    prototypeEffectsSeen: [],  // Track rotation for aether rewards (first-time bonuses)

    // Vendor system
    vendorItems: {
        bakery: { revealedDay: null, purchasedDay: null, restockDay: 8 },
        tavern: { revealedDay: null, purchasedDay: null, restockDay: 10 },
        herbalist: { revealedDay: null, purchasedDay: null, restockDay: 6 },
        blacksmith: { revealedDay: null, purchasedDay: null, restockDay: 9 },
        square: { revealedDay: null, purchasedDay: null, restockDay: 7 }
    },
    miraVendorReveals: [],  // Vendors Mira has told player about
    aetherContainers: 0,    // Purchased containers waiting to be extracted

    // Mira storyline
    miraWillingPartner: false,  // Set after Day 3 story event
    miraVisitedWorkshopToday: false,  // Reset daily, for 33% workshop visits

    // UI preferences
    ui: {
        desireTrackerExpanded: true  // Whether desire tracker is expanded or collapsed
    },

    // NPC Advance System
    nextAdvanceDay: 5 + Math.floor(Math.random() * 3), // Day 5-7
    pendingAdvance: null, // { npcId: string, mood: 'playful' | 'direct' } or null

    // NPC Progression Gating
    progression: {
        tier: 0,
        tier1Choice: null,          // 'corwin_vessa' or 'barret_della'
        unlockedNpcs: ['mira', 'fiona'],
        hintLevel: {},              // Per-NPC: current hint escalation level (1-3)
        hintLastDay: {},            // Per-NPC: last day a hint was shown
        hintLastNpc: null           // Last NPC Mira hinted about (for alternation)
    },

    flags: {},

    unlockedPortraits: {},   // { npcId: ["g0_gs0_c0_m1_b2", ...] }
    unlockedScenes: [],      // ["mira_sex_intro", ...]
    seenSylvieVignettes: []  // ["sq1", "tav2", ...]
};

let gameState = null;

function initState(genitalia = 0) {
    gameState = JSON.parse(JSON.stringify(DEFAULT_STATE));

    gameState.player.body = { ...DEFAULT_PLAYER_BODY, genitalia };
    gameState.player.naturalBody = { ...DEFAULT_PLAYER_BODY, genitalia };

    saveState();
    return gameState;
}

function saveState() {
    localStorage.setItem('magitechWorkshop_save', JSON.stringify(gameState));
}

function loadState() {
    const saved = localStorage.getItem('magitechWorkshop_save');
    if (saved) {
        gameState = JSON.parse(saved);
        migrateState();
        return true;
    }
    return false;
}

// Migrate old saves to include new fields
function migrateState() {
    if (!gameState) return;

    // Clear stale Mira desire data (Mira no longer uses desire system)
    if (gameState.npcs?.mira?.currentDesire) {
        gameState.npcs.mira.currentDesire = null;
    }

    // Add ui preferences if missing
    if (!gameState.ui) {
        gameState.ui = { desireTrackerExpanded: true };
    }

    // Add phase rolls and scene persistence if missing
    if (!gameState.phaseRolls) gameState.phaseRolls = {};
    if (gameState.currentSceneId === undefined) gameState.currentSceneId = null;
    if (gameState.cachedSceneRender === undefined) gameState.cachedSceneRender = null;

    // Add firstDesireFulfilledDay to NPCs if missing
    if (gameState.npcs) {
        for (const npcId of Object.keys(gameState.npcs)) {
            if (gameState.npcs[npcId].firstDesireFulfilledDay === undefined) {
                gameState.npcs[npcId].firstDesireFulfilledDay = null;
            }
        }
    }

    // Add reachedLevels to NPCs if missing (reconstruct from history)
    if (gameState.npcs) {
        for (const npcId of Object.keys(gameState.npcs)) {
            const npc = gameState.npcs[npcId];
            if (!npc.reachedLevels) {
                const stats = ['chest', 'muscle', 'butt', 'genitaliaSize', 'genitalia'];
                const reached = {};
                for (const stat of stats) {
                    const levels = new Set();
                    if (npc.naturalBody) levels.add(npc.naturalBody[stat]);
                    if (npc.bodyHistory) {
                        for (const entry of npc.bodyHistory) {
                            if (entry.body[stat] !== undefined) levels.add(entry.body[stat]);
                        }
                    }
                    if (npc.body[stat] !== undefined) levels.add(npc.body[stat]);
                    reached[stat] = Array.from(levels);
                }
                npc.reachedLevels = reached;
            }
        }
    }

    // Fix old whim desire labels (e.g. "Try the opposite butt" â†’ "bigger butt")
    if (gameState.npcs) {
        const oldLabelPattern = /^(Go all out on|Try minimal|Try the opposite|Balance out|Return to natural|Reduce|Grow bigger|Try bigger|Try smaller) /;
        for (const npcId of Object.keys(gameState.npcs)) {
            const desire = gameState.npcs[npcId].currentDesire;
            if (desire && desire.label && oldLabelPattern.test(desire.label)) {
                const stat = desire.stat;
                const currentValue = gameState.npcs[npcId].body?.[stat] ?? 0;
                const target = desire.target;
                desire.label = target > currentValue ? `bigger ${stat}` : `smaller ${stat}`;
            }
        }
    }

    // Add bodyHistory to NPCs if missing
    if (gameState.npcs) {
        for (const npcId of Object.keys(gameState.npcs)) {
            if (!gameState.npcs[npcId].bodyHistory) {
                gameState.npcs[npcId].bodyHistory = [
                    { body: { ...gameState.npcs[npcId].naturalBody }, day: 0 }
                ];
                // If current body differs from natural, add current as latest
                const cur = gameState.npcs[npcId].body;
                const nat = gameState.npcs[npcId].naturalBody;
                if (JSON.stringify(cur) !== JSON.stringify(nat)) {
                    gameState.npcs[npcId].bodyHistory.push(
                        { body: { ...cur }, day: gameState.day || 0 }
                    );
                }
            }
        }
    }

    // Migrate to hidden archetype system
    if (gameState.npcs) {
        // Old archetype ID â†’ new archetype ID mapping
        const ARCHETYPE_ID_MAP = {
            bombshell: 'bombshell',
            hourglass: 'hourglass',
            amazon: 'amazon',
            bootylicious: 'bootylicious',
            fitness_model: 'statuesque',
            thicc: 'hourglass'
            // petite â†’ petite (same), goddess â†’ goddess (same)
        };

        for (const npcId of Object.keys(gameState.npcs)) {
            const npc = gameState.npcs[npcId];

            // Add missing hidden archetype fields
            if (npc.hiddenArchetype === undefined) npc.hiddenArchetype = null;
            if (npc.archetypeAchieved === undefined) npc.archetypeAchieved = false;
            if (npc.archetypeAchievedDay === undefined) npc.archetypeAchievedDay = null;
            if (npc.archetypeSatisfactionEnd === undefined) npc.archetypeSatisfactionEnd = null;
            if (npc.archetypeHistory === undefined) npc.archetypeHistory = [];
            if (npc.archetypeJustAchieved === undefined) npc.archetypeJustAchieved = false;
            if (npc.pendingGenitalProposal === undefined) npc.pendingGenitalProposal = null;
            if (npc.goddessRevealed === undefined) npc.goddessRevealed = false;

            // Migrate old currentArchetype â†’ hiddenArchetype
            if (npc.currentArchetype && !npc.hiddenArchetype) {
                const oldId = typeof npc.currentArchetype === 'string'
                    ? npc.currentArchetype
                    : npc.currentArchetype.id;
                if (oldId) {
                    npc.hiddenArchetype = ARCHETYPE_ID_MAP[oldId] || oldId;
                }
            }

            // Migrate old archetype desire labels to new names
            if (npc.currentDesire && npc.currentDesire.isArchetype && npc.currentDesire.archetypeId) {
                const oldArchId = npc.currentDesire.archetypeId;
                const newArchId = ARCHETYPE_ID_MAP[oldArchId] || oldArchId;
                npc.currentDesire.archetypeId = newArchId;
                npc.currentDesire.isArchetypeDriven = true;
                // Update label to use jealousy framing (archetype is hidden now)
                const stat = npc.currentDesire.stat;
                const target = npc.currentDesire.target;
                const currentVal = npc.body[stat] ?? 0;
                npc.currentDesire.label = target > currentVal ? `bigger ${stat}` : `smaller ${stat}`;
            }

            // Clear old system fields
            delete npc.currentArchetype;
            delete npc.archetypeStepJustCompleted;
            delete npc.archetypeSuggestedByPlayer;
            delete npc.targetProfile;
            delete npc.achievedTargets;
            delete npc.targetProfileVersion;
            delete npc.needsProfileRegeneration;
        }
    }

    // Add gallery unlock tracking if missing
    if (!gameState.unlockedPortraits) gameState.unlockedPortraits = {};
    if (!gameState.unlockedScenes) gameState.unlockedScenes = [];
    if (!gameState.seenSylvieVignettes) gameState.seenSylvieVignettes = [];

    // Add progression gating state if missing
    if (!gameState.progression) {
        gameState.progression = {
            tier: 0,
            tier1Choice: null,
            unlockedNpcs: ['mira', 'fiona'],
            hintLevel: {},
            hintLastDay: {},
            hintLastNpc: null
        };
    }
}

function clearState() {
    localStorage.removeItem('magitechWorkshop_save');
    gameState = null;
}

// ==========================================
// AETHER SYSTEM (Crystal Cube)
// ==========================================
// Aether is stored in a crystal cube in the workshop
// Absorbed into cube from: passive daily absorption, prototype effects (first time +1), vendor items (+2)
// Drawn from cube for: increasing stats or changing genitalia (-2)

function getAether() {
    return gameState.player.aether || 0;
}

function addAether(amount) {
    gameState.player.aether = (gameState.player.aether || 0) + amount;
    saveState();
    UI.updatePlayerSidebar();
}

function spendAether(amount) {
    if (!canAffordAether(amount)) return false;
    gameState.player.aether = (gameState.player.aether || 0) - amount;
    saveState();
    UI.updatePlayerSidebar();
    return true;
}

function canAffordAether(amount) {
    return getAether() >= amount;
}

// Passive Aether Absorption - applied at start of each new day
// Formula: floor(2 * revealed_npc_count) where revealed = trust >= desireReveal threshold
function applyPassiveAether() {
    const npcIds = Object.keys(NPC_TRUST_THRESHOLDS);
    let revealedCount = 0;
    for (const npcId of npcIds) {
        const trust = gameState.npcs[npcId]?.trust || 0;
        const threshold = getNpcTrustThresholds(npcId).desireReveal;
        if (trust >= threshold) {
            revealedCount++;
        }
    }
    const passiveAether = Math.floor(2 * revealedCount);
    if (passiveAether > 0) {
        addAether(passiveAether);
    }
    return passiveAether;
}

// ==========================================
// VENDOR ITEM SYSTEM
// ==========================================

const VENDOR_ITEMS = {
    bakery: {
        name: 'Aether-Glazed Pastry',
        price: 25,
        description: 'A pastry that shimmers with captured magical energy.',
        purchaseText: 'Della wraps the pastry carefully. "Handle it gently - bring it to your workshop and the crystal cube will absorb the energy."',
        freeText: 'Della pushes the glowing pastry toward you with a warm smile. "Take it, sweetie. Consider it a thank-you for... helping me out." She winks. "Maybe you\'ll find another use for that aether~"'
    },
    tavern: {
        name: 'Shimmering Ale',
        price: 30,
        description: 'A mug of ale that glows faintly from within.',
        purchaseText: 'Barret slides the glowing mug toward you. "Get it to your workshop quick - that shimmer won\'t last forever!"',
        freeText: 'Barret slides the shimmering mug across the bar with a knowing grin. "On the house, love. You\'ve done plenty for me already." She leans in conspiratorially. "Though if you wanted to do more..."'
    },
    herbalist: {
        name: 'Bottled Essence',
        price: 35,
        description: 'A small vial of concentrated magical essence.',
        purchaseText: 'Vessa hands you the vial with care. "The essence is volatile - your crystal cube should absorb it right away."',
        freeText: 'Vessa presses the vial into your hands, her fingers lingering. "A gift. You\'ve been... very helpful with my research." Her cheeks flush slightly. "Perhaps you\'ll use it to help me again sometime?"'
    },
    blacksmith: {
        name: 'Charged Crystal',
        price: 40,
        description: 'A crystal humming with stored energy.',
        purchaseText: 'Aldric grunts as he hands over the crystal. "Don\'t drop it. Take it to your cube thing."',
        freeText: 'Aldric sets the crystal on the counter with uncharacteristic gentleness. "Take it. No charge." He clears his throat awkwardly. "You\'ve been... good to me. Maybe too good." A hint of a smile crosses his face.'
    },
    square: {
        name: 'Exotic Vial',
        price: 35,
        description: 'A mysterious vial from distant lands.',
        purchaseText: 'Corwin winks as he wraps the vial. "Straight from the eastern markets. Your workshop crystal will love it."',
        freeText: 'Corwin tosses you the vial with a flourish. "Compliments of the house, gorgeous. After what you did for me..." He grins suggestively. "Well, let\'s just say I\'m hoping you\'ll put that aether to good use. On me, perhaps?"'
    }
};

// Map vendor locations to their NPC owners
const VENDOR_TO_NPC = {
    bakery: 'della',
    tavern: 'barret',
    herbalist: 'vessa',
    blacksmith: 'aldric',
    square: 'corwin'
};

// Check if vendor gives free items (after first desire fulfilled)
function isVendorItemFree(vendorId) {
    const npcId = VENDOR_TO_NPC[vendorId];
    if (!npcId) return false;
    const npc = gameState.npcs[npcId];
    return npc && npc.firstDesireFulfilledDay !== null;
}

// Get current price for vendor item (0 if free)
function getVendorItemPrice(vendorId) {
    if (isVendorItemFree(vendorId)) return 0;
    const item = VENDOR_ITEMS[vendorId];
    return item ? item.price : 0;
}

// Check if all vendor NPCs give free items
function areAllVendorItemsFree() {
    return Object.keys(VENDOR_TO_NPC).every(vendorId => isVendorItemFree(vendorId));
}

function isVendorItemAvailable(vendorId) {
    // Must be revealed by Mira first
    if (!gameState.miraVendorReveals.includes(vendorId)) return false;

    const vendor = gameState.vendorItems[vendorId];
    if (!vendor) return false;

    // Check if already purchased and not restocked
    if (vendor.purchasedDay !== null) {
        return gameState.day >= vendor.restockDay;
    }
    return true;
}

function purchaseVendorItem(vendorId) {
    const item = VENDOR_ITEMS[vendorId];
    if (!item) return { success: false, message: 'Item not found' };

    if (!isVendorItemAvailable(vendorId)) {
        return { success: false, message: 'Item not available' };
    }

    const isFree = isVendorItemFree(vendorId);
    const price = isFree ? 0 : item.price;

    if (!isFree && gameState.player.coin < price) {
        return { success: false, message: 'Not enough coin' };
    }

    if (!isFree) {
        gameState.player.coin -= price;
    }
    gameState.vendorItems[vendorId].purchasedDay = gameState.day;
    gameState.vendorItems[vendorId].restockDay = gameState.day + 4 + Math.floor(Math.random() * 4);
    gameState.aetherContainers = (gameState.aetherContainers || 0) + 1;
    saveState();
    UI.updatePlayerSidebar();

    return { success: true, item: item, wasFree: isFree };
}

function extractAetherContainers() {
    const count = gameState.aetherContainers || 0;
    if (count <= 0) return { success: false, extracted: 0 };

    const aetherGained = count * 2;
    gameState.aetherContainers = 0;
    addAether(aetherGained);

    return { success: true, extracted: count, aetherGained: aetherGained };
}

function checkVendorRestock() {
    // Called on day transition - just updates availability
    // Items auto-restock when restockDay is reached and isVendorItemAvailable is checked
}

// Get vendor browse result for shop scenes
function getVendorBrowseResult(vendorId) {
    if (isVendorItemAvailable(vendorId)) {
        return { hasItem: true, item: VENDOR_ITEMS[vendorId] };
    }
    return { hasItem: false };
}

function getStatLabel(stat, value) {
    const labels = STAT_LABELS[stat];
    if (labels && value >= 0 && value < labels.length) {
        return labels[value];
    }
    return String(value);
}

function getPlayerImagePath() {
    const p = gameState.player;
    const b = p.body;

    // If player has an active prototype effect, show that image instead
    if (p.prototypeEffect) {
        return `images/effects/female_${p.prototypeEffect}.webp`;
    }

    // Use stat-based naming convention:
    // player_g[genitalia]_gs[genSize]_c[chest]_m[muscle]_b[butt].webp
    // Butt 0-3 all use b2 (average), only 4-5 are visually distinct
    // Muscle 0 uses m1 image (m0/m1 look identical, saves images)
    // GenitaliaSize 0-1 bucketed to gs0 (visually identical, no genital tags)
    // When gs=0, g0 and g1 portraits are identical (no genital tags either way), so use g0
    const buttValue = b.butt >= 4 ? b.butt : 2;
    const muscleValue = b.muscle >= 1 ? b.muscle : 1;
    const gsValue = b.genitaliaSize <= 1 ? 0 : b.genitaliaSize;
    const gValue = gsValue === 0 ? 0 : b.genitalia;
    // Penis portraits not generated at c0 (visually identical to g0 at flat chest)
    const chestValue = (gValue === 1 && b.chest === 0) ? 1 : b.chest;

    return `images/player/player_g${gValue}_gs${gsValue}_c${chestValue}_m${muscleValue}_b${buttValue}.webp`;
}

// Check if player currently has a prototype effect active
function hasPrototypeEffect() {
    return gameState.player.prototypeEffect !== null;
}

// Check if player can use prototype devices (once per day restriction)
function canUsePrototypeDevice() {
    // Cannot use if already affected by a prototype effect
    if (hasPrototypeEffect()) return false;
    // Cannot use if already used today (effect may have been cleared by day transition)
    if (gameState.player.prototypeUsedDay === gameState.day) return false;
    return true;
}

// Check if player can be target of transformation devices
function canTransformPlayer() {
    // Cannot transform player while affected by prototype (body is unstable)
    if (hasPrototypeEffect()) return false;

    // Cannot transform player until self-transform is unlocked
    if (!gameState.player.canSelfTransform) return false;

    return true;
}

// Check if self-transform is still locked (for UI display)
function isSelfTransformLocked() {
    return !gameState.player.canSelfTransform;
}

// Unlock self-transform ability
function unlockSelfTransform() {
    gameState.player.canSelfTransform = true;
    saveState();
}

// Male NPCs show a single male portrait until their feminization story event completes,
// after which they use stat-based portraits like all other NPCs.
const MALE_NPC_FEMINIZATION_FLAGS = {
    aldric: 'story_aldric_accident_complete',
    corwin: 'story_corwin_bet_complete',
    holt: 'story_holt_transform_complete'
};

function isMaleNpcFeminized(npcId) {
    const flag = MALE_NPC_FEMINIZATION_FLAGS[npcId];
    return !flag || gameState.flags[flag];
}

function getNpcImagePath(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return '';

    // Before feminization event: always show the single male portrait
    if (!isMaleNpcFeminized(npcId)) {
        return `images/npcs/${npcId}/male.webp`;
    }

    recordPortraitUnlock(npcId, npc.body);
    return getNpcImagePathForBody(npcId, npc.body);
}

// Alias for backwards compatibility
function getNpcImagePathSimple(npcId) {
    return getNpcImagePath(npcId);
}

// Get NPC image path for a specific body snapshot (used by codex history)
function getNpcImagePathForBody(npcId, body) {
    if (!body) return '';

    // Stat-based naming: images/npcs/[npcId]/g[genitalia]_gs[genSize]_c[chest]_m[muscle]_b[butt].webp
    // Butt 0-3 all use b2 (average), only 4-5 are visually distinct
    // Muscle 0 uses m1 image (m0/m1 look identical, saves images)
    // GenitaliaSize 0-1 bucketed to gs0 (visually identical, no genital tags)
    // When gs=0, g0 and g1 portraits are identical (no genital tags either way), so use g0
    // Exception: c5+m5+b5 renders nude — genitals are visible even at gs0/gs1
    const b = body;
    const buttValue = b.butt >= 4 ? b.butt : 2;
    const muscleValue = b.muscle >= 1 ? b.muscle : 1;
    const isNude = b.chest >= 5 && b.muscle >= 5 && b.butt >= 5;
    let gsValue = b.genitaliaSize <= 1 ? 0 : b.genitaliaSize;
    let gValue = gsValue === 0 ? 0 : b.genitalia;
    // When nude, genitals are always visible — use actual genitalia type
    if (isNude && b.genitalia === 1) {
        gValue = 1;
        gsValue = gsValue === 0 ? 2 : gsValue; // Bump to gs2 (smallest visible penis bucket)
    }
    // Penis portraits not generated at c0 (visually identical to g0 at flat chest)
    const chestValue = (gValue === 1 && b.chest === 0) ? 1 : b.chest;
    return `images/npcs/${npcId}/g${gValue}_gs${gsValue}_c${chestValue}_m${muscleValue}_b${buttValue}.webp`;
}

function recordPortraitUnlock(npcId, body) {
    if (!gameState.unlockedPortraits) gameState.unlockedPortraits = {};
    if (!gameState.unlockedPortraits[npcId]) gameState.unlockedPortraits[npcId] = [];

    // Build the combo string using bucketed values (matching image file naming)
    const b = body;
    const buttValue = b.butt >= 4 ? b.butt : 2;
    const muscleValue = b.muscle >= 1 ? b.muscle : 1;
    let gsValue = b.genitaliaSize <= 1 ? 0 : b.genitaliaSize;
    let gValue = gsValue === 0 ? 0 : b.genitalia;
    const isNude = b.chest >= 5 && b.muscle >= 5 && b.butt >= 5;
    if (isNude && b.genitalia === 1) {
        gValue = 1;
        gsValue = gsValue === 0 ? 2 : gsValue; // Bump to gs2 (smallest visible penis bucket)
    }
    const chestValue = (gValue === 1 && b.chest === 0) ? 1 : b.chest;

    const combo = `g${gValue}_gs${gsValue}_c${chestValue}_m${muscleValue}_b${buttValue}`;
    if (!gameState.unlockedPortraits[npcId].includes(combo)) {
        gameState.unlockedPortraits[npcId].push(combo);
    }
}

// Get vignette image path for an NPC using scene-level bucketing
function getVignetteImagePath(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return '';

    // Before feminization event: use single male vignette
    if (!isMaleNpcFeminized(npcId)) {
        return `images/locations/vignettes/${npcId}_male.webp`;
    }

    const b = npc.body;
    // Vignette bucketing: c0-3->2, c4->4, c5->5; m0-3->1, m4-5->4 (except extreme->5); b0-2->2, b3-4->4, b5->5
    const c = b.chest <= 3 ? 2 : (b.chest === 4 ? 4 : 5);
    const m = (c === 5 && b.muscle >= 5 && b.butt >= 5) ? 5 : (b.muscle <= 3 ? 1 : 4);
    const bt = b.butt <= 2 ? 2 : (b.butt <= 4 ? 4 : 5);
    const isExtreme = c === 5 && m === 5 && bt === 5;
    // Genital size bucketing:
    //   Extreme (c5+m5+b5): gs 0-2->0, 3->3 (both g0 and g1 use gs0/gs3 goddess images)
    //   Normal vagina: 0-2->0, 3->3
    //   Normal penis: 0-1->1, 2-3->2
    let g = b.genitalia;
    let gs;
    if (isExtreme) {
        gs = b.genitaliaSize >= 3 ? 3 : 0;
    } else {
        gs = g === 0
            ? (b.genitaliaSize <= 2 ? 0 : 3)
            : (b.genitaliaSize <= 1 ? 1 : 2);
    }
    // g1 + raw genitaliaSize 0 has no visible genital difference — use g0 gs0 image
    if (g === 1 && b.genitaliaSize === 0) { g = 0; gs = 0; }
    return `images/locations/vignettes/${npcId}_g${g}_gs${gs}_c${c}_m${m}_b${bt}.webp`;
}

// Record a body change snapshot for an NPC (avoids duplicates)
function recordNpcBodyChange(targetId) {
    const npc = gameState.npcs[targetId];
    if (!npc) return;
    if (!npc.bodyHistory) {
        npc.bodyHistory = [{ body: { ...npc.naturalBody }, day: 0 }];
    }
    const currentBody = npc.body;
    const lastEntry = npc.bodyHistory[npc.bodyHistory.length - 1];
    // Only push if stats actually differ from the last snapshot
    if (JSON.stringify(lastEntry.body) !== JSON.stringify(currentBody)) {
        npc.bodyHistory.push({ body: { ...currentBody }, day: gameState.day });
    }

    // Update reachedLevels from current body
    if (!npc.reachedLevels) npc.reachedLevels = {};
    const reachedStats = ['chest', 'muscle', 'butt', 'genitaliaSize', 'genitalia'];
    for (const stat of reachedStats) {
        const val = npc.body[stat];
        if (val === undefined) continue;
        if (!npc.reachedLevels[stat]) npc.reachedLevels[stat] = [];
        if (!npc.reachedLevels[stat].includes(val)) {
            npc.reachedLevels[stat].push(val);
        }
    }
}

// Get flirt/transformation image path for player or NPC
// Returns: images/flirt/{id}_{stat}_{code}{level}.webp
// e.g., images/flirt/mira_chest_c3.webp, images/flirt/player_chest_c3.webp
function getFlirtTransformationImagePath(targetId, stat, newValue) {
    // Valid characters with flirt images (player + all 10 NPCs)
    const validIds = ['player', 'mira', 'vessa', 'barret', 'della', 'fiona', 'lenna', 'mrs_thornwick', 'aldric', 'corwin', 'holt'];
    if (!validIds.includes(targetId)) return null;

    // Stat code mapping
    const statCodes = {
        chest: 'c',
        butt: 'b',
        muscle: 'm'
    };

    const code = statCodes[stat];
    if (!code) return null;

    return `images/flirt/${targetId}_${stat}_${code}${newValue}.webp`;
}

// Get flirt genital image path (shared across all characters)
// Vagina: images/flirt/shared_vagina_gs{size}.webp
// Penis:  images/flirt/shared_penis_gs{size}_m1.webp
function getFlirtGenitalImagePath(targetId, genitalia, size) {
    if (genitalia === 0) {
        return `images/flirt/shared_vagina_gs${size}.webp`;
    } else {
        return `images/flirt/shared_penis_gs${size}_m1.webp`;
    }
}

// Select a body part for NPC to show during flirt scene
// Returns: { part: 'chest'|'butt'|'muscle'|'vagina'|'penis', level: number, imagePath: string }
// Or null if no eligible body parts to show
function selectFlirtBodyPart(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return null;

    const body = npc.body;
    const eligibleParts = [];

    // Check each body part - only include if level >= 2 for non-genitals
    // (lower levels don't have interesting visuals to show off)
    if (body.chest >= 2) {
        eligibleParts.push({
            part: 'chest',
            level: body.chest,
            imagePath: `images/flirt/${npcId}_chest_c${body.chest}.webp`
        });
    }
    if (body.butt >= 2) {
        eligibleParts.push({
            part: 'butt',
            level: body.butt,
            imagePath: `images/flirt/${npcId}_butt_b${body.butt}.webp`
        });
    }
    if (body.muscle >= 2) {
        eligibleParts.push({
            part: 'muscle',
            level: body.muscle,
            imagePath: `images/flirt/${npcId}_muscle_m${body.muscle}.webp`
        });
    }

    // Always include genitals as an option (all sizes are valid)
    if (body.genitalia === 0) {
        eligibleParts.push({
            part: 'vagina',
            level: body.genitaliaSize,
            imagePath: getFlirtGenitalImagePath(npcId, 0, body.genitaliaSize)
        });
    } else {
        eligibleParts.push({
            part: 'penis',
            level: body.genitaliaSize,
            imagePath: getFlirtGenitalImagePath(npcId, 1, body.genitaliaSize)
        });
    }

    if (eligibleParts.length === 0) return null;

    // Weight selection towards higher stats (more impressive to show off)
    // But also give some randomness
    const weighted = [];
    for (const part of eligibleParts) {
        // Weight: 1 for level 0-1, 2 for level 2-3, 3 for level 4-5
        const weight = part.level <= 1 ? 1 : (part.level <= 3 ? 2 : 3);
        for (let i = 0; i < weight; i++) {
            weighted.push(part);
        }
    }

    const selected = weighted[Math.floor(Math.random() * weighted.length)];
    return selected;
}

// Select an alternative body part (excluding a specific part)
// Used when player declines to see penis
function selectAlternativeFlirtBodyPart(npcId, excludePart) {
    const npc = gameState.npcs[npcId];
    if (!npc) return null;

    const body = npc.body;
    const eligibleParts = [];

    // Check each body part - only include if level >= 2 for non-genitals
    if (body.chest >= 2 && excludePart !== 'chest') {
        eligibleParts.push({
            part: 'chest',
            level: body.chest,
            imagePath: `images/flirt/${npcId}_chest_c${body.chest}.webp`
        });
    }
    if (body.butt >= 2 && excludePart !== 'butt') {
        eligibleParts.push({
            part: 'butt',
            level: body.butt,
            imagePath: `images/flirt/${npcId}_butt_b${body.butt}.webp`
        });
    }
    if (body.muscle >= 2 && excludePart !== 'muscle') {
        eligibleParts.push({
            part: 'muscle',
            level: body.muscle,
            imagePath: `images/flirt/${npcId}_muscle_m${body.muscle}.webp`
        });
    }

    // Include vagina if not excluded and NPC has vagina
    if (body.genitalia === 0 && excludePart !== 'vagina') {
        eligibleParts.push({
            part: 'vagina',
            level: body.genitaliaSize,
            imagePath: getFlirtGenitalImagePath(npcId, 0, body.genitaliaSize)
        });
    }

    if (eligibleParts.length === 0) return null;

    // Random selection from eligible parts
    return eligibleParts[Math.floor(Math.random() * eligibleParts.length)];
}

// Get transformation image path, preferring flirt images for player and NPCs
function getTransformationImagePath(targetId, stat, newValue) {
    // For genital stats, try flirt genital images first
    if (stat === 'genitalia' || stat === 'genitaliaSize') {
        const body = targetId === 'player' ? gameState.player.body : gameState.npcs[targetId]?.body;
        if (body) {
            const genType = body.genitalia;
            const genSize = body.genitaliaSize;
            // Try flirt genital image first
            const flirtGenitalImage = getFlirtGenitalImagePath(targetId, genType, genSize);
            if (flirtGenitalImage) return flirtGenitalImage;
            // Fall back to generic transformation image
            return `images/transformations/transform_genital_g${genType}_gs${genSize}.webp`;
        }
    }

    // For body stats (chest, butt, muscle), try flirt images first
    const flirtImage = getFlirtTransformationImagePath(targetId, stat, newValue);
    if (flirtImage) return flirtImage;

    // Fall back to generic transformation images
    return `images/transformations/transform_${stat}_${newValue}.webp`;
}

// Prototype Effects Functions
function getRandomPrototypeEffect() {
    const index = Math.floor(Math.random() * PROTOTYPE_EFFECTS.length);
    return PROTOTYPE_EFFECTS[index];
}

// Get next prototype effect using rotation (sequential through unseen, then random)
// Returns { effect, grantsAether } - grantsAether is true for first-time effects
function getNextPrototypeEffect() {
    const seen = gameState.prototypeEffectsSeen || [];

    // Find unseen effects
    const unseenEffects = PROTOTYPE_EFFECTS.filter(e => !seen.includes(e.id));

    if (unseenEffects.length > 0) {
        // Return next unseen effect (sequential)
        const effect = unseenEffects[0];
        return { effect, grantsAether: true };
    } else {
        // All seen - random, no aether
        const index = Math.floor(Math.random() * PROTOTYPE_EFFECTS.length);
        return { effect: PROTOTYPE_EFFECTS[index], grantsAether: false };
    }
}

function applyPrototypeEffect() {
    const { effect, grantsAether } = getNextPrototypeEffect();

    // Track as seen
    if (!gameState.prototypeEffectsSeen) {
        gameState.prototypeEffectsSeen = [];
    }
    if (!gameState.prototypeEffectsSeen.includes(effect.id)) {
        gameState.prototypeEffectsSeen.push(effect.id);
    }

    // Apply effect
    gameState.player.prototypeEffect = effect.id;
    gameState.player.prototypeUsedDay = gameState.day;

    // Grant aether for first-time effects
    if (grantsAether) {
        addAether(1);
    }

    saveState();

    return { ...effect, grantsAether };
}

function clearPrototypeEffect() {
    gameState.player.prototypeEffect = null;
    saveState();
}

function getCurrentPrototypeEffect() {
    if (!gameState.player.prototypeEffect) return null;
    return PROTOTYPE_EFFECTS.find(e => e.id === gameState.player.prototypeEffect);
}

function getPrototypeEffectById(id) {
    return PROTOTYPE_EFFECTS.find(e => e.id === id);
}

// NPC Reaction Functions
function getNpcPersonality(npcId) {
    return NPC_PERSONALITIES[npcId] || { type: 'friendly', style: 'casual' };
}

function getPrototypeEffectReaction(npcId, effectId) {
    const personality = getNpcPersonality(npcId);
    const reactions = PROTOTYPE_EFFECT_REACTIONS[effectId];
    if (!reactions) return null;
    return reactions[personality.type] || reactions.friendly;
}

function getBodyChangeReaction(npcId, changeType) {
    const personality = getNpcPersonality(npcId);
    const reactions = BODY_CHANGE_REACTIONS[changeType];
    if (!reactions) return null;
    return reactions[personality.type] || reactions.friendly;
}

// Get a comment about the player's prominent body stats
// variant is trust-gated: regular (below intimate), horny (at/above intimate)
function getPlayerBodyComment(npcId, variantOverride) {
    const body = gameState.player.body;
    const prominentStats = [];

    if (body.chest >= 4) prominentStats.push('chest');
    if (body.butt >= 4) prominentStats.push('butt');
    if (body.muscle >= 4) prominentStats.push('muscle');
    if (body.genitalia === 1 && body.genitaliaSize >= 2) prominentStats.push('penis');

    if (prominentStats.length === 0) return null;

    // Pick variant based on trust if no override
    let variant = variantOverride;
    if (!variant) {
        const trust = gameState.npcs[npcId]?.trust || 0;
        const thresholds = getNpcTrustThresholds(npcId);
        variant = trust >= thresholds.intimate ? 'horny' : 'regular';
    }

    // Pick a random prominent stat
    const stat = prominentStats[Math.floor(Math.random() * prominentStats.length)];
    const personality = getNpcPersonality(npcId);
    const pool = PLAYER_BODY_COMMENTS[stat]?.[variant]?.[personality.type]
              || PLAYER_BODY_COMMENTS[stat]?.[variant]?.friendly;

    if (!pool || pool.length === 0) return null;

    // Replace {npcId} placeholders with actual npcId for color tags
    const comment = pool[Math.floor(Math.random() * pool.length)];
    return comment;
}

// Detect changes since NPC last saw player
function detectPlayerChanges(npcId) {
    const npc = gameState.npcs[npcId];
    const changes = [];

    // Check for prototype effect (only if this NPC hasn't commented on it yet)
    if (gameState.player.prototypeEffect) {
        const seenBy = gameState.player.prototypeEffectSeenBy || [];
        if (!seenBy.includes(npcId)) {
            changes.push({
                type: 'prototypeEffect',
                effectId: gameState.player.prototypeEffect
            });
        }
    }

    // Check for body stat changes if NPC has seen player before
    if (npc.lastSeenPlayer) {
        const current = gameState.player.body;
        const last = npc.lastSeenPlayer;

        if (current.height > last.height) {
            changes.push({ type: 'bodyChange', changeType: 'height_increase' });
        } else if (current.height < last.height) {
            changes.push({ type: 'bodyChange', changeType: 'height_decrease' });
        }

        if (current.chest > last.chest) {
            changes.push({ type: 'bodyChange', changeType: 'chest_increase' });
        } else if (current.chest < last.chest) {
            changes.push({ type: 'bodyChange', changeType: 'chest_decrease' });
        }

        if (current.butt > last.butt) {
            changes.push({ type: 'bodyChange', changeType: 'butt_increase' });
        } else if (current.butt < last.butt) {
            changes.push({ type: 'bodyChange', changeType: 'butt_decrease' });
        }

        if (current.muscle > last.muscle) {
            changes.push({ type: 'bodyChange', changeType: 'muscle_increase' });
        } else if (current.muscle < last.muscle) {
            changes.push({ type: 'bodyChange', changeType: 'muscle_decrease' });
        }
    }

    return changes;
}

// Get reaction dialogue for changes (returns first/most notable change)
function getNpcReactionToChanges(npcId) {
    const changes = detectPlayerChanges(npcId);
    if (changes.length === 0) return null;

    // Prioritize prototype effects over body changes
    const prototypeChange = changes.find(c => c.type === 'prototypeEffect');
    if (prototypeChange) {
        // Mark this NPC as having seen and commented on the current prototype effect
        if (!gameState.player.prototypeEffectSeenBy) {
            gameState.player.prototypeEffectSeenBy = [];
        }
        if (!gameState.player.prototypeEffectSeenBy.includes(npcId)) {
            gameState.player.prototypeEffectSeenBy.push(npcId);
        }
        return getPrototypeEffectReaction(npcId, prototypeChange.effectId);
    }

    // Return first body change reaction
    const bodyChange = changes.find(c => c.type === 'bodyChange');
    if (bodyChange) {
        return getBodyChangeReaction(npcId, bodyChange.changeType);
    }

    return null;
}

// Update NPC's record of player appearance
function updateNpcLastSeenPlayer(npcId) {
    gameState.npcs[npcId].lastSeenPlayer = { ...gameState.player.body };
    saveState();
}

// Trust-building activities
// Returns the trust gained for feedback purposes
function gainTrustFromConversation(npcId) {
    const gain = 1;
    applyTrustChange(npcId, gain);
    return gain;
}

function gainTrustFromFavor(npcId) {
    const gain = 2;
    applyTrustChange(npcId, gain);
    return gain;
}

function gainTrustFromDrink(npcId) {
    const gain = 1;
    applyTrustChange(npcId, gain);
    return gain;
}

function gainTrustFromFlirt(npcId) {
    // Only works if they're receptive (check canFlirt first)
    const gain = 1;
    applyTrustChange(npcId, gain);
    return gain;
}

// Get a description of the NPC's current trust level
function getTrustDescription(npcId) {
    const trust = gameState.npcs[npcId]?.trust || 0;
    const thresholds = getNpcTrustThresholds(npcId);

    if (trust >= thresholds.sandbox) return "Complete trust - they'll let you do anything";
    if (trust >= thresholds.intimate) return "Deep intimacy - very close relationship";
    if (trust >= thresholds.desireReveal) return "Good trust - willing to share their desires";
    if (trust >= thresholds.flirt) return "Friendly - open to flirtation";
    if (trust > 0) return "Acquaintance - getting to know you";
    return "Stranger - just met";
}

// Get current trust value for display
function getNpcTrust(npcId) {
    return gameState.npcs[npcId]?.trust || 0;
}

// Get NPC display name
function getNpcDisplayName(npcId) {
    const names = {
        mira: 'Mira',
        aldric: 'Aldric',
        vessa: 'Vessa',
        mrs_thornwick: 'Mrs. Thornwick',
        fiona: 'Fiona',
        barret: 'Barret',
        lenna: 'Lenna',
        corwin: 'Corwin',
        della: 'Della',
        holt: 'Holt',
        sylvie: 'Sylvie'
    };
    return names[npcId] || npcId;
}

// NPC Roles for codex
const NPC_ROLES = {
    mira: 'Town Courier',
    aldric: 'Blacksmith',
    vessa: 'Herbalist',
    mrs_thornwick: 'Town Elder',
    fiona: 'Street Kid',
    barret: 'Tavern Owner',
    lenna: 'Librarian',
    corwin: 'Traveling Merchant',
    della: 'Baker',
    holt: 'Town Guard',
    sylvie: 'Magitech Researcher'
};

// NPC Base descriptions for codex
const NPC_DESCRIPTIONS = {
    mira: "A cheerful young courier who knows everyone in town. She's always on the move, delivering packages and messages with boundless energy.",
    aldric: "The town's blacksmith, a gruff but reliable man. He's been forging tools and weapons here for decades and knew your uncle well.",
    vessa: "A mysterious herbalist with violet eyes that hint at magical exposure. She's curious about your uncle's work and seems to know more than she lets on.",
    mrs_thornwick: "The dignified town elder who maintains order in Millbrook. She's proper and formal, but fair in her dealings.",
    fiona: "A scrappy young woman surviving on the streets. She's wary of strangers but warms up to those who treat her kindly.",
    barret: "The warm and welcoming owner of the town tavern. She knows all the local gossip and enjoys a good flirt.",
    lenna: "A shy librarian who spends most of her time among dusty tomes. She's easily flustered but deeply knowledgeable.",
    corwin: "A charming traveling merchant who passes through town regularly. He deals in rare goods and trades in secrets.",
    della: "The town's beloved baker, a motherly woman who's been feeding Millbrook for decades. Her pastries are legendary.",
    holt: "A stern and disciplined guard who takes his duty seriously. There's something weighing on him beneath the stoic exterior.",
    sylvie: "Your 'late' uncle, reborn. She built the workshop devices to transform herself, faked her death, and has been living happily in the Blackstone Tower ever since. A brilliant magitech scientist who treats her own body as a laboratory and approaches every experiment with childlike delight."
};

// Generate flavor text based on NPC's current body stats
function getNpcFlavorText(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return '';
    if (!isNpcUnlocked(npcId)) return '';

    const b = npc.body;
    const name = getNpcDisplayName(npcId);
    const isMale = hasMaleBody(npcId);

    // Goddess form: all physical stats maxed, NPC is nude
    if (b.chest === 5 && b.muscle === 5 && b.butt === 5) {
        if (b.genitaliaSize === 3) {
            // Overwhelmed goddess — barely functional
            const overwhelmedFlavors = [
                `${name} is here, naked and trembling, her massive body glistening with sweat. She seems barely aware of her surroundings.`,
                `${name} stands nearby, enormous and nude, her eyes glassy and unfocused. Every few seconds a shudder runs through her.`,
                `${name} is leaning against the wall, breathing hard, her vast naked body flushed from head to toe.`,
            ];
            return overwhelmedFlavors[Math.floor(Math.random() * overwhelmedFlavors.length)];
        } else {
            // Lucid goddess — composed, powerful, nude
            const lucidFlavors = [
                `${name} is here, naked and unhurried, her massive body moving with easy, deliberate power.`,
                `${name} stands nearby, nude and composed, the sheer scale of her impossible to ignore.`,
                `${name} is here. She takes up more space than anyone in the room, bare-skinned and utterly at ease.`,
            ];
            return lucidFlavors[Math.floor(Math.random() * lucidFlavors.length)];
        }
    }

    const flavors = [];

    // Height flavor
    if (b.height >= 5) {
        flavors.push(`${name} towers over you, having to look down to meet your eyes.`);
    } else if (b.height === 4) {
        flavors.push(`${name} stands notably tall, a head above most people.`);
    } else if (b.height <= 1) {
        flavors.push(`${name} barely reaches your waist, looking up at you with determination.`);
    } else if (b.height === 2) {
        flavors.push(`${name} is quite petite, coming up to about your shoulder.`);
    }

    // Chest flavor (different for male vs female body)
    if (isMale) {
        // Male body - describe chest/pecs differently
        if (b.muscle >= 4) {
            flavors.push(`His broad chest strains against his shirt, powerful pecs clearly defined.`);
        }
    } else {
        if (b.chest >= 5) {
            flavors.push(`Her massive chest strains against her clothing, impossible to ignore.`);
        } else if (b.chest === 4) {
            flavors.push(`Her impressive bust draws the eye despite her attempts at modesty.`);
        }
    }

    // Muscle flavor (different terms for male)
    if (b.muscle >= 5) {
        if (isMale) {
            flavors.push(`Massive muscles bulge beneath his clothing, a hulking and powerful physique.`);
        } else {
            flavors.push(`Massive muscles bulge beneath her clothing, an almost superhuman physique.`);
        }
    } else if (b.muscle === 4) {
        if (isMale) {
            flavors.push(`He's clearly very muscular, with a brawny build and powerful arms.`);
        } else {
            flavors.push(`She's clearly very muscular, with well-defined arms and a powerful build.`);
        }
    }

    // Butt flavor (only for high values, different for male)
    if (b.butt >= 5) {
        if (isMale) {
            flavors.push(`His powerfully built glutes are impossible to miss.`);
        } else {
            flavors.push(`Her enormous rear makes it difficult for her to navigate tight spaces.`);
        }
    } else if (b.butt === 4) {
        if (isMale) {
            flavors.push(`He has notably muscular glutes that fill out his trousers.`);
        } else {
            flavors.push(`She has a notably large posterior that sways as she moves.`);
        }
    }

    // Return one random flavor, or empty if none apply
    if (flavors.length === 0) return '';
    return flavors[Math.floor(Math.random() * flavors.length)];
}

// Get a physical description summary for the codex
function getNpcPhysicalSummary(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return '';

    const b = npc.body;
    const isMale = hasMaleBody(npcId);
    const parts = [];

    // Build a readable physical description with gender-appropriate terms
    // Chest words differ by gender (male = flat chest, no breast terms)
    const chestWordsFemale = ['flat-chested', 'small-chested', 'average-chested', 'busty', 'very busty', 'massively busty'];
    const chestWordsMale = ['narrow-chested', 'slim-chested', 'average chest', 'broad-chested', 'barrel-chested', 'massive-chested'];

    // Muscle words differ slightly by gender
    const muscleWordsFemale = ['thin', 'lightly toned', 'fit', 'athletic', 'muscular', 'extremely muscular'];
    const muscleWordsMale = ['scrawny', 'lean', 'fit', 'athletic', 'brawny', 'powerfully built'];

    // Butt words differ by gender
    const buttWordsFemale = ['flat-bottomed', 'small-bottomed', 'average', 'curvy', 'very curvy', 'enormously curvy'];
    const buttWordsMale = ['narrow-hipped', 'slim-hipped', 'average', 'solid', 'thick-thighed', 'powerfully built lower body'];

    const chestWords = isMale ? chestWordsMale : chestWordsFemale;
    const muscleWords = isMale ? muscleWordsMale : muscleWordsFemale;
    const buttWords = isMale ? buttWordsMale : buttWordsFemale;

    // For males, mention chest build if muscular
    if (isMale) {
        if (b.muscle > 2) {
            parts.push(muscleWords[b.muscle]);
        }
        if (b.butt > 2) {
            parts.push(buttWords[b.butt]);
        }
    } else {
        if (b.chest > 2) {
            parts.push(chestWords[b.chest]);
        }
        if (b.muscle > 2) {
            parts.push(muscleWords[b.muscle]);
        }
        if (b.butt > 2) {
            parts.push(buttWords[b.butt] + ' hips');
        }
    }

    return parts.join(', ');
}

// Get NPC role
function getNpcRole(npcId) {
    return NPC_ROLES[npcId] || 'Resident';
}

// ============================================
// Sex Scene Helper Functions
// ============================================

// Body stat descriptions for sex scenes (female body)
const SEX_SCENE_DESCRIPTIONS = {
    chest: {
        0: 'flat chest',
        1: 'small breasts',
        2: 'modest breasts',
        3: 'full breasts',
        4: 'large breasts',
        5: 'massive breasts'
    },
    butt: {
        0: 'small rear',
        1: 'modest rear',
        2: 'round rear',
        3: 'full rear',
        4: 'large rear',
        5: 'enormous rear'
    },
    muscle: {
        0: 'thin body',
        1: 'slender body',
        2: 'toned body',
        3: 'athletic body',
        4: 'muscular body',
        5: 'powerfully muscular body'
    },
    genitaliaSize: {
        0: '',
        1: '',
        2: 'large',
        3: 'huge'
    }
};

// Body stat descriptions for sex scenes (male body)
const SEX_SCENE_DESCRIPTIONS_MALE = {
    chest: {
        0: 'flat chest',
        1: 'slim chest',
        2: 'solid chest',
        3: 'broad chest',
        4: 'powerful chest',
        5: 'massive chest'
    },
    butt: {
        0: 'narrow hips',
        1: 'slim hips',
        2: 'solid rear',
        3: 'firm rear',
        4: 'muscular rear',
        5: 'powerful rear'
    },
    muscle: {
        0: 'thin body',
        1: 'lean body',
        2: 'toned body',
        3: 'athletic body',
        4: 'brawny body',
        5: 'hulking body'
    },
    genitaliaSize: {
        0: '',
        1: '',
        2: 'large',
        3: 'huge'
    }
};

// Get body stat description for sex scenes (uses RAW stat value)
// For descriptions that should match image, use getBucketedBodyStatDesc instead
function getBodyStatDesc(who, stat) {
    const body = who === 'player' ? gameState.player.body : gameState.npcs[who]?.body;
    if (!body) return '';

    // Determine if this is a male body
    const isMale = who === 'player' ? playerHasMaleBody() : hasMaleBody(who);
    const descriptions = isMale ? SEX_SCENE_DESCRIPTIONS_MALE : SEX_SCENE_DESCRIPTIONS;
    const value = body[stat];
    return descriptions[stat]?.[value] || '';
}

// Body stat bucketing for sex scene images
// Reduces image variants by grouping similar stat values
function getBucketedStat(stat, value) {
    if (stat === 'chest' || stat === 'butt') {
        // 0-2 = average (2), 3-4 = large (4), 5 = extreme (5)
        if (value <= 2) return 2;
        if (value <= 4) return 4;
        return 5;
    }
    if (stat === 'muscle') {
        // 0-3 = soft (1), 4 = toned (4), 5 = muscular (5)
        if (value <= 3) return 1;
        if (value === 4) return 4;
        return 5;
    }
    return value;
}

// Get body stat description using BUCKETED values (matches what images show)
// Use this for sex scene text to ensure text matches the displayed image
function getBucketedBodyStatDesc(who, stat) {
    const body = who === 'player' ? gameState.player.body : gameState.npcs[who]?.body;
    if (!body) return '';

    // Determine if this is a male body
    const isMale = who === 'player' ? playerHasMaleBody() : hasMaleBody(who);
    const descriptions = isMale ? SEX_SCENE_DESCRIPTIONS_MALE : SEX_SCENE_DESCRIPTIONS;

    const rawValue = body[stat];
    const bucketedValue = getBucketedStat(stat, rawValue);
    return descriptions[stat]?.[bucketedValue] || '';
}

// Get sex scene image path based on NPC body stats and genitals
// Base scenes: [npc]_base_[v/v3/p/p3]_c[2/4/5]_m[1/4/5]_b[2/4/5].webp
// Genital bucketing: gs0-2 = v/p, gs3 = v3/p3
// Transform scenes: stat-aware in images/sex/transformation/
//   Mira: [v3/p3]_c5_m[1/3/4/5]_b[4/5] | Corwin: c[4/5]_m[1/4/5] (no gen/butt)
//   Della: [v/v3/p/p3]_c[2/4/5]_m[1/5]_b[2/4/5] | Holt: [v/v3/p/p3]_c[2/4/5]_m[1/4/5]_b[2/4/5]
//   Thornwick: [v/v3/p/p3]_c[2/4/5]_m[1/4/5]_b[2/4/5] (m5→b4)
//   Fiona: m1→c[0/2/5]_b[2/5], m5→c[0/2/4/5]_b[4/5]
//   Vessa: [v/v3/p/p3]_c[0/2/4/5]_m[1/3/5] (no butt)
// Legacy transforms: [npc]_transform_[v/p].webp (Lenna only, no body variation, no gs3)
// Exceptions: Aldric and Barret use single image ([npc]_transform.webp)
function getSexSceneImage(npcId, sceneType) {
    const npc = gameState.npcs[npcId];
    if (!npc) return '';

    // Genital suffix: v/p for gs0-2, v3/p3 for gs3
    const baseGen = npc.body.genitalia === 1 ? 'p' : 'v';
    const genitalSuffix = npc.body.genitaliaSize >= 3 ? baseGen + '3' : baseGen;

    if (sceneType === 'transform') {
        // Aldric and Barret transforms have no genital variants - single image
        if (npcId === 'aldric' || npcId === 'barret') {
            return `images/sex/${npcId}_transform.webp`;
        }

        // Stat-aware transform images in images/sex/transformation/
        if (npcId === 'mira') {
            // Transform inflates genitals — always v3/p3
            const tGen = npc.body.genitalia === 1 ? 'p3' : 'v3';
            // Chest: always c5. Muscle: 0-1→1, 2-3→3, 4→4, 5→5
            const rawM = npc.body.muscle;
            const tM = rawM <= 1 ? 1 : rawM <= 3 ? 3 : rawM;
            const tB = tM === 5 ? (npc.body.butt >= 5 ? 5 : 4) : 5;
            return `images/sex/transformation/mira_transform_${tGen}_c5_m${tM}_b${tB}.webp`;
        }

        if (npcId === 'corwin') {
            // No genital/butt variation. Chest: 0-4→4, 5→5. Muscle: standard
            const tC = npc.body.chest >= 5 ? 5 : 4;
            const tM = getBucketedStat('muscle', npc.body.muscle);
            return `images/sex/transformation/corwin_transform_c${tC}_m${tM}.webp`;
        }

        if (npcId === 'della') {
            // Chest: 0-3→2, 4→4, 5→5. Muscle: 0-4→1, 5→5. Butt: standard (m5: b<5→4)
            const tC = npc.body.chest <= 3 ? 2 : npc.body.chest;
            const tM = npc.body.muscle >= 5 ? 5 : 1;
            const tB = tM === 5 ? (npc.body.butt >= 5 ? 5 : 4) : getBucketedStat('butt', npc.body.butt);
            return `images/sex/transformation/${npcId}_transform_${genitalSuffix}_c${tC}_m${tM}_b${tB}.webp`;
        }

        if (npcId === 'holt') {
            // Chest: 0-3→2, 4→4, 5→5. Muscle: standard (0-3→1, 4→4, 5→5). Butt: standard (m5: b<5→4)
            const tC = npc.body.chest <= 3 ? 2 : npc.body.chest;
            const tM = getBucketedStat('muscle', npc.body.muscle);
            const tB = tM === 5 ? (npc.body.butt >= 5 ? 5 : 4) : getBucketedStat('butt', npc.body.butt);
            return `images/sex/transformation/${npcId}_transform_${genitalSuffix}_c${tC}_m${tM}_b${tB}.webp`;
        }

        if (npcId === 'mrs_thornwick') {
            // Chest: standard (no c0). Muscle: standard. m5 always b4
            const tC = getBucketedStat('chest', npc.body.chest);
            const tM = getBucketedStat('muscle', npc.body.muscle);
            const tB = tM === 5 ? 4 : getBucketedStat('butt', npc.body.butt);
            return `images/sex/transformation/mrs_thornwick_transform_${genitalSuffix}_c${tC}_m${tM}_b${tB}.webp`;
        }

        if (npcId === 'fiona') {
            // Muscle: 0-3→1, 4-5→5. Butt: m1→(0-4→2, 5→5), m5→(0-4→4, 5→5)
            // Chest at m1: 0→0, 1-4→2, 5→5. Chest at m5: 0→0, 1-2→2, 3-4→4, 5→5
            const tM = npc.body.muscle <= 3 ? 1 : 5;
            let tC;
            if (npc.body.chest === 0) {
                tC = 0;
            } else if (tM === 1) {
                tC = npc.body.chest >= 5 ? 5 : 2;
            } else {
                tC = getBucketedStat('chest', npc.body.chest);
            }
            const tB = tM === 5 ? (npc.body.butt >= 5 ? 5 : 4) : (npc.body.butt >= 5 ? 5 : 2);
            return `images/sex/transformation/fiona_transform_${genitalSuffix}_c${tC}_m${tM}_b${tB}.webp`;
        }

        if (npcId === 'vessa') {
            // Chest: 0-1→0, 2-3→2, 4→4, 5→5. Muscle: 0-2→1, 3-4→3, 5→5. No butt variation.
            const tC = npc.body.chest <= 1 ? 0 : npc.body.chest <= 3 ? 2 : npc.body.chest;
            const tM = npc.body.muscle <= 2 ? 1 : npc.body.muscle <= 4 ? 3 : 5;
            return `images/sex/transformation/vessa_transform_${genitalSuffix}_c${tC}_m${tM}.webp`;
        }

        // Lenna uses legacy static transform images
        return `images/sex/${npcId}_transform_${baseGen}.webp`;
    }

    // Base scenes use bucketed body stats
    // m5 forces b4 (muscle LoRA dominates, butt differences invisible)
    const c = getBucketedStat('chest', npc.body.chest);
    const m = getBucketedStat('muscle', npc.body.muscle);
    const b = m === 5 ? 4 : getBucketedStat('butt', npc.body.butt);

    return `images/sex/${npcId}_base_${genitalSuffix}_c${c}_m${m}_b${b}.webp`;
}

// Determine genital combination for scene branching
// Returns: 'pp' (both penis), 'pv' (player penis, npc vagina), 'vp' (player vagina, npc penis), 'vv' (both vagina)
function getGenitalCombination(npcId) {
    const playerGen = gameState.player.body.genitalia;
    const npcGen = gameState.npcs[npcId]?.body.genitalia;

    const playerHasPenis = playerGen === 1;
    const npcHasPenis = npcGen === 1;

    if (playerHasPenis && !npcHasPenis) return 'pv';
    if (!playerHasPenis && !npcHasPenis) return 'vv';
    if (!playerHasPenis && npcHasPenis) return 'vp';
    if (playerHasPenis && npcHasPenis) return 'pp';
    return 'vv';
}

// Check if NPC sex scene is unlocked (trust >= 10)
function isSexUnlocked(npcId) {
    return gameState.npcs[npcId]?.trust >= 10;
}


// Mark first sex encounter complete
function markSexUnlocked(npcId) {
    if (gameState.npcs[npcId]) {
        gameState.npcs[npcId].sexUnlocked = true;
        gameState.npcs[npcId].archetypeIntimateReady = false;

        // Clear satisfaction period so tracker moves past "Waiting for you."
        gameState.npcs[npcId].satisfactionEndDay = null;

        // Generate next desire so the NPC has something to work toward
        generateNpcDesire(npcId);

        // Check if this completes a tier advancement requirement
        if (gameState.progression && checkTierAdvancement()) {
            gameState.flags.progression_advancement_ready = true;
        }
        saveState();
    }
}

// Check if first sex encounter has happened
function hasSexUnlocked(npcId) {
    return gameState.npcs[npcId]?.sexUnlocked || false;
}

// Mark that the transform path was taken this sex encounter (transient flag)
function markTransformationSeen(npcId) {
    gameState.flags[npcId + '_transform_seen_this_session'] = true;
}

// Check if transform path was taken this sex encounter, then clear the flag
function hasSeenTransformation(npcId) {
    const key = npcId + '_transform_seen_this_session';
    const seen = gameState.flags[key] || false;
    if (seen) {
        delete gameState.flags[key];
    }
    return seen;
}

// Get NPC base description
function getNpcDescription(npcId) {
    return NPC_DESCRIPTIONS[npcId] || '';
}

// ==========================================
// NPC PROGRESSION GATING HELPERS
// ==========================================

function isNpcUnlocked(npcId) {
    if (!gameState.progression) return true; // Fallback for old saves
    return gameState.progression.unlockedNpcs.includes(npcId);
}

function unlockNpc(npcId) {
    if (!gameState.progression.unlockedNpcs.includes(npcId)) {
        gameState.progression.unlockedNpcs.push(npcId);
        saveState();
    }
}

function getTierSexRequirements(tier) {
    const p = gameState.progression;
    switch (tier) {
        case 0: return ['fiona'];
        case 1: {
            // Current chosen pair
            const pair = PROGRESSION_TIERS[1].options[p.tier1Choice];
            return pair || [];
        }
        case 1.5: {
            // Unchosen pair (tier 1b)
            const other = p.tier1Choice === 'corwin_vessa' ? 'barret_della' : 'corwin_vessa';
            return PROGRESSION_TIERS[1].options[other] || [];
        }
        case 2: return ['aldric', 'lenna'];
        default: return [];
    }
}

function checkTierAdvancement() {
    const tier = gameState.progression.tier;
    if (tier >= 3) return false;
    const reqs = getTierSexRequirements(tier);
    return reqs.every(npcId => hasSexUnlocked(npcId));
}

function advanceTier(choice) {
    const p = gameState.progression;
    if (p.tier === 0) {
        // Tier 0 → 1: player chooses a pair
        p.tier1Choice = choice;
        p.tier = 1;
        const pair = PROGRESSION_TIERS[1].options[choice];
        pair.forEach(id => unlockNpc(id));
    } else if (p.tier === 1) {
        // Tier 1 → 1.5 (1b): unlock unchosen pair
        p.tier = 1.5;
        const other = p.tier1Choice === 'corwin_vessa' ? 'barret_della' : 'corwin_vessa';
        const pair = PROGRESSION_TIERS[1].options[other];
        pair.forEach(id => unlockNpc(id));
    } else if (p.tier === 1.5) {
        // Tier 1b → 2: unlock Aldric + Lenna
        p.tier = 2;
        PROGRESSION_TIERS[2].npcs.forEach(id => unlockNpc(id));
    } else if (p.tier === 2) {
        // Tier 2 → 3: unlock Mrs. Thornwick + Holt
        p.tier = 3;
        PROGRESSION_TIERS[3].npcs.forEach(id => unlockNpc(id));
    }
    // Clear advancement flag
    gameState.flags.progression_advancement_ready = false;
    saveState();
}

// Debug: skip to a target tier, setting all prerequisite state
// pairChoice: 'corwin_vessa' or 'barret_della' (used for tier1Choice)
function debugSkipToTier(targetTier, pairChoice) {
    if (!gameState || !gameState.progression) return;

    // Build ordered list of NPCs that should be "completed" before targetTier
    const tierOrder = [0, 1, 1.5, 2, 3];
    const targetIndex = tierOrder.indexOf(targetTier);
    if (targetIndex < 0) return;

    // Determine which NPCs need to be marked complete (all tiers before target)
    const completedNpcs = [];
    for (let i = 0; i < targetIndex; i++) {
        const t = tierOrder[i];
        if (t === 0) {
            completedNpcs.push('fiona');
        } else if (t === 1) {
            const pair = PROGRESSION_TIERS[1].options[pairChoice];
            if (pair) completedNpcs.push(...pair);
        } else if (t === 1.5) {
            const other = pairChoice === 'corwin_vessa' ? 'barret_della' : 'corwin_vessa';
            const pair = PROGRESSION_TIERS[1].options[other];
            if (pair) completedNpcs.push(...pair);
        } else if (t === 2) {
            completedNpcs.push('aldric', 'lenna');
        }
    }

    // Also unlock (but don't complete) the NPCs AT the target tier
    const targetNpcs = [];
    if (targetTier === 1) {
        const pair = PROGRESSION_TIERS[1].options[pairChoice];
        if (pair) targetNpcs.push(...pair);
    } else if (targetTier === 1.5) {
        const other = pairChoice === 'corwin_vessa' ? 'barret_della' : 'corwin_vessa';
        const pair = PROGRESSION_TIERS[1].options[other];
        if (pair) targetNpcs.push(...pair);
    } else if (targetTier === 2) {
        targetNpcs.push(...PROGRESSION_TIERS[2].npcs);
    } else if (targetTier === 3) {
        targetNpcs.push(...PROGRESSION_TIERS[3].npcs);
    }

    // Mark completed NPCs: unlock, sex, trust
    for (const npcId of completedNpcs) {
        unlockNpc(npcId);
        if (gameState.npcs[npcId]) {
            gameState.npcs[npcId].sexUnlocked = true;
            const threshold = NPC_TRUST_THRESHOLDS[npcId]?.intimate || 30;
            gameState.npcs[npcId].trust = Math.max(gameState.npcs[npcId].trust, threshold);
            gameState.npcs[npcId].introCompleted = true;
            if (typeof generateNpcDesire === 'function') {
                generateNpcDesire(npcId);
            }
        }
    }

    // Unlock target tier NPCs (interactable but not yet "completed")
    for (const npcId of targetNpcs) {
        unlockNpc(npcId);
    }

    // Set progression state
    gameState.progression.tier = targetTier;
    gameState.progression.tier1Choice = pairChoice;
    gameState.flags.progression_advancement_ready = false;

    // Male NPC story event flags (chained dependency)
    const maleFlags = {
        corwin: 'story_corwin_bet_complete',
        aldric: 'story_aldric_accident_complete',
        holt: 'story_holt_transform_complete'
    };
    for (const npcId of [...completedNpcs, ...targetNpcs]) {
        if (maleFlags[npcId]) {
            gameState.flags[maleFlags[npcId]] = true;
            // Also mark the "started" flags so triggers don't re-fire
            if (npcId === 'corwin') gameState.flags.story_corwin_bet_started = true;
            if (npcId === 'aldric') gameState.flags.story_aldric_accident = true;
            if (npcId === 'holt') gameState.flags.story_holt_transformation_available = true;
        }
    }

    // Ensure day is high enough that story events don't re-trigger
    gameState.day = Math.max(gameState.day, 25);

    // Ensure Mira intro and willing partner flags are set
    gameState.flags.mira_day2_complete = true;
    gameState.flags.mira_day3_complete = true;
    gameState.npcs.mira.trust = Math.max(gameState.npcs.mira.trust || 0, 25);

    // Give some aether to work with
    gameState.player.aether = Math.max(gameState.player.aether || 0, 20);

    saveState();
    return { completedNpcs, targetNpcs };
}

function getNpcHighestStat(npcId) {
    const body = gameState.npcs[npcId]?.body;
    if (!body) return { stat: 'chest', value: 0 };

    // Priority: chest > butt > muscle > genital_g1 > genital_g0
    const candidates = [
        { stat: 'chest', value: body.chest || 0 },
        { stat: 'butt', value: body.butt || 0 },
        { stat: 'muscle', value: body.muscle || 0 }
    ];

    // Add genital stat
    if (body.genitalia === 1) {
        candidates.push({ stat: 'genital_g1', value: body.genitaliaSize || 0 });
    } else {
        candidates.push({ stat: 'genital_g0', value: body.genitaliaSize || 0 });
    }

    // Return highest value (priority order breaks ties via sort stability)
    let best = candidates[0];
    for (let i = 1; i < candidates.length; i++) {
        if (candidates[i].value > best.value) {
            best = candidates[i];
        }
    }
    return best;
}

function getNpcsAwaitingSex() {
    const tier = gameState.progression.tier;
    if (tier >= 3) return [];
    const reqs = getTierSexRequirements(tier);
    const maleNpcs = ['aldric', 'corwin', 'holt'];
    return reqs.filter(npcId => {
        if (!isNpcUnlocked(npcId)) return false;
        if (hasSexUnlocked(npcId)) return false;
        if (maleNpcs.includes(npcId) && !canAccessRomanticContent(npcId)) return false;
        // Only hint once NPC is ready for intimacy: archetype goal met OR trust >= intimate threshold
        const npc = gameState.npcs[npcId];
        if (!npc) return false;
        const thresholds = NPC_TRUST_THRESHOLDS[npcId];
        const atIntimate = thresholds && (npc.trust || 0) >= thresholds.intimate;
        if (!atIntimate && !npc.archetypeIntimateReady) return false;
        return true;
    });
}

function getNextMiraHint() {
    const awaiting = getNpcsAwaitingSex();
    if (awaiting.length === 0) return null;

    const p = gameState.progression;

    // Pick NPC to hint about — alternate if multiple waiting
    let npcId;
    if (awaiting.length === 1) {
        npcId = awaiting[0];
    } else {
        // Alternate: pick the one that WASN'T hinted about last
        npcId = awaiting.find(id => id !== p.hintLastNpc) || awaiting[0];
    }

    // Determine hint level (1→2→3→alternating 2/3)
    const currentLevel = p.hintLevel[npcId] || 0;
    let level;
    if (currentLevel < 3) {
        level = currentLevel + 1;
    } else {
        // Alternate between 2 and 3 on each subsequent hint
        level = (currentLevel % 2 === 1) ? 2 : 3;
    }

    // Get framing (0-indexed: level 1 = index 0)
    const framingIndex = Math.min(level - 1, 2); // Cap at level 3 framing
    const framing = HINT_NPC_FRAMING[npcId]?.[framingIndex] || '';

    // Get punchline
    const highest = getNpcHighestStat(npcId);
    let punchline;
    if (level === 1) {
        punchline = HINT_PUNCHLINES_L1[highest.stat] || '';
    } else {
        const lines = HINT_PUNCHLINES_L23[highest.stat] || [];
        const sizeAdj = HINT_SIZE_ADJECTIVES[highest.stat]?.[highest.value] || '';
        if (lines.length > 0 && sizeAdj) {
            const line = lines[Math.floor(Math.random() * lines.length)];
            punchline = line.replace('{size}', sizeAdj);
        } else {
            // Fallback to L1 if no size adjective available (value 0 or unmapped)
            punchline = HINT_PUNCHLINES_L1[highest.stat] || '';
        }
    }

    return { npcId, level, framing, punchline };
}

function applyMiraHint(hint) {
    const p = gameState.progression;
    p.hintLevel[hint.npcId] = hint.level;
    p.hintLastDay[hint.npcId] = gameState.day;
    p.hintLastNpc = hint.npcId;
    saveState();
}

// ============================================
// Per-Phase Interaction Tracking
// ============================================

// Get pronouns for an NPC based on their body presentation
// Genitalia 0 (vagina) = always she/her
// Genitalia 1 (penis) + Chest 0 = he/him (male body)
// Genitalia 1 (penis) + Chest 1+ = she/her (dickgirl)
function getNpcPronouns(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return { subject: 'they', object: 'them', possessive: 'their' };

    // Male NPCs use he/him until their transformation story event fires
    const maleNpcFlags = {
        aldric: 'story_aldric_transformed',
        corwin: 'story_corwin_transformed',
        holt: 'story_holt_transformed'
    };
    const transformFlag = maleNpcFlags[npcId];
    if (transformFlag) {
        if (!gameState.flags[transformFlag]) {
            return { subject: 'he', object: 'him', possessive: 'his' };
        }
        return { subject: 'she', object: 'her', possessive: 'her' };
    }

    // Female NPCs: always she/her
    return { subject: 'she', object: 'her', possessive: 'her' };
}

// Check if an NPC has a male body presentation
// Male body = penis (genitalia 1) + flat chest (chest 0)
function hasMaleBody(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return false;
    return npc.body.genitalia === 1 && npc.body.chest === 0;
}

// Check if player has a male body presentation
function playerHasMaleBody() {
    const p = gameState.player;
    return p.body.genitalia === 1 && p.body.chest === 0;
}

// Check if player has already interacted with an NPC this phase
function hasInteractedThisPhase(npcId) {
    if (!gameState.phaseInteractions) {
        gameState.phaseInteractions = { npcsInteracted: [], actionCount: 0 };
    }
    return gameState.phaseInteractions.npcsInteracted.includes(npcId);
}

// Record an NPC interaction and increment action count
// Returns true if this was a new interaction, false if already interacted
function recordNpcInteraction(npcId) {
    if (!gameState.phaseInteractions) {
        gameState.phaseInteractions = { npcsInteracted: [], actionCount: 0 };
    }

    if (hasInteractedThisPhase(npcId)) {
        return false;
    }

    gameState.phaseInteractions.npcsInteracted.push(npcId);
    gameState.phaseInteractions.actionCount++;
    saveState();
    return true;
}

// Record a non-NPC action (like using a device)
function recordAction() {
    if (!gameState.phaseInteractions) {
        gameState.phaseInteractions = { npcsInteracted: [], actionCount: 0 };
    }
    gameState.phaseInteractions.actionCount++;
    saveState();
}

// Get current action count for the phase
function getPhaseActionCount() {
    if (!gameState.phaseInteractions) {
        return 0;
    }
    return gameState.phaseInteractions.actionCount;
}

// Check if phase should auto-advance (after 2 actions)
function shouldAutoAdvancePhase() {
    return getPhaseActionCount() >= 2;
}

// Reset phase interactions (called when phase advances)
function resetPhaseInteractions() {
    gameState.phaseInteractions = {
        npcsInteracted: [],
        actionCount: 0
    };
    saveState();
}

// Get a cached random roll for the current phase. Rolls once and caches the result
// so refreshing the page doesn't re-roll. Cleared when phase advances.
function getPhaseRoll(rollId, chance) {
    if (!gameState.phaseRolls) gameState.phaseRolls = {};
    const key = `d${gameState.day}_${gameState.phase}_${rollId}`;
    if (!(key in gameState.phaseRolls)) {
        gameState.phaseRolls[key] = Math.random() < chance;
        saveState();
    }
    return gameState.phaseRolls[key];
}

// Get a cached random index for the current phase (for picking from arrays)
function getPhaseRollIndex(rollId, arrayLength) {
    if (!gameState.phaseRolls) gameState.phaseRolls = {};
    const key = `d${gameState.day}_${gameState.phase}_${rollId}`;
    if (!(key in gameState.phaseRolls)) {
        gameState.phaseRolls[key] = Math.floor(Math.random() * arrayLength);
        saveState();
    }
    return gameState.phaseRolls[key] % arrayLength;
}

// Clear phase rolls (called when phase advances)
function clearPhaseRolls() {
    gameState.phaseRolls = {};
}

// Set pending phase advance flag (called when 2 actions reached, deferred until interaction exit)
function setPendingPhaseAdvance() {
    gameState.pendingPhaseAdvance = true;
    saveState();
}

// Check and execute pending phase advance (called when entering hub scenes)
// Advances phase silently, then lets the scene render normally
// Returns true if new day started (caller should redirect to workshop)
function checkAndExecutePendingPhaseAdvance() {
    if (gameState.pendingPhaseAdvance) {
        gameState.pendingPhaseAdvance = false;
        saveState();

        // Check if this will be a new day (currently evening)
        const willBeNewDay = gameState.phase === 'evening';

        UI.showNotification('Time passes...', 'info');
        // Use silent mode - advance state but don't show intermediate UI
        UI.advancePhase(true);

        // If new day started, return true so caller redirects to workshop
        if (willBeNewDay) {
            return true;
        }
    }
    // Return false to let the scene render normally
    return false;
}

// Reset daily flags (called when day advances)
function resetDailyFlags() {
    if (!gameState.flags) gameState.flags = {};

    // Reset service-related daily trust flags
    gameState.flags.barret_drink_thanked_today = false;
    gameState.flags.della_pastry_bought_today = false;

    saveState();
}

// ============================================
// Mira Workshop Delivery System
// ============================================

// Increment workshop visit counter (only once per phase, not on reload)
function incrementWorkshopVisits() {
    if (typeof gameState.workshopVisitCount !== 'number') {
        gameState.workshopVisitCount = 0;
    }
    const key = `d${gameState.day}_${gameState.phase}_workshop_visited`;
    if (!gameState.phaseRolls) gameState.phaseRolls = {};
    if (gameState.phaseRolls[key]) return; // Already counted this phase
    gameState.phaseRolls[key] = true;
    gameState.workshopVisitCount++;
    saveState();
}

// Check if Mira delivery event should trigger (every 12 visits)
function shouldTriggerMiraDelivery() {
    return gameState.workshopVisitCount >= 12;
}

// Reset workshop visit counter after delivery event
function resetWorkshopVisitCounter() {
    gameState.workshopVisitCount = 0;
    saveState();
}

// Check if Mira is available at her usual locations today
// She only appears at her scheduled locations every 3rd day (days 1, 4, 7, 10...)
// On other days, she's "out on deliveries"
function isMiraAvailableToday() {
    return ((gameState.day - 1) % 3) === 0;
}

// Check if Mira should randomly visit the workshop (33% chance after Day 3)
function shouldTriggerMiraWorkshopVisit() {
    // Must have completed Day 3 story event
    if (!gameState.miraWillingPartner) return false;

    // Random visits start the day after Day 3 story (not same day)
    if (gameState.day <= 3) return false;

    // Only once per day
    if (gameState.miraVisitedWorkshopToday) return false;

    // Minimum 3 days between random visits
    if (gameState.miraLastRandomVisitDay && gameState.day - gameState.miraLastRandomVisitDay < 3) {
        return false;
    }

    // 33% chance (cached per phase to prevent save-scumming)
    return getPhaseRoll('mira_visit', 0.33);
}

// Mark Mira as having visited the workshop today
function markMiraVisitedWorkshop() {
    gameState.miraVisitedWorkshopToday = true;
    gameState.miraLastRandomVisitDay = gameState.day;
    saveState();
}

// Get a random Mira greeting type for workshop visits
// Returns: 'player_body', 'her_body', 'vendor_info', 'offers_sex'
function getMiraGreetingType() {
    const weights = [];

    // Comments on player body (40%)
    weights.push({ type: 'player_body', weight: 40 });

    // Vendor info (20%) - only if there's an unrevealed vendor with item
    const unrevealedVendor = getUnrevealedVendorWithItem();
    if (unrevealedVendor) {
        weights.push({ type: 'vendor_info', weight: 20, vendor: unrevealedVendor });
    }

    // Offers sex (20%) - only if trust >= intimate threshold
    const thresholds = getNpcTrustThresholds('mira');
    if ((gameState.npcs.mira?.trust || 0) >= thresholds.intimate) {
        weights.push({ type: 'offers_sex', weight: 20 });
    }

    // Weighted random selection
    const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
    let random = Math.random() * totalWeight;

    for (const w of weights) {
        random -= w.weight;
        if (random <= 0) return w;
    }

    return weights[0];
}

// Get an unrevealed vendor that currently has an item available
function getUnrevealedVendorWithItem() {
    const vendors = ['bakery', 'tavern', 'herbalist', 'blacksmith', 'square'];
    for (const vendorId of vendors) {
        if (!gameState.miraVendorReveals.includes(vendorId)) {
            return vendorId;
        }
    }
    return null;
}

// Reveal a vendor item location (Mira tells player about it)
function revealVendorItem(vendorId) {
    if (!gameState.miraVendorReveals.includes(vendorId)) {
        gameState.miraVendorReveals.push(vendorId);
        saveState();
    }
}

// Get the "already interacted" message for an NPC
function getAlreadyInteractedMessage(npcId) {
    const pronouns = getNpcPronouns(npcId);
    const name = getNpcDisplayName(npcId);
    return `You've already spent time with ${name} recently. ${pronouns.subject.charAt(0).toUpperCase() + pronouns.subject.slice(1)} seems busy now - maybe come back later?`;
}

