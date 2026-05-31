// Scene Metadata System
// Separates SD generation data from production scene code
// In dev mode: prompts are available for curation/regeneration
// In production: prompts can be stripped out, only image paths needed

const SceneMetadata = {
    // Loaded metadata from JSON
    data: null,

    // Dev mode flag - set to false for production builds
    devMode: true,

    // Load metadata from JSON file
    async load() {
        if (!this.devMode) {
            console.log('SceneMetadata: Production mode, skipping metadata load');
            return;
        }

        try {
            const response = await fetch('data/scene-metadata.json');
            if (!response.ok) {
                console.warn('SceneMetadata: Could not load metadata file');
                return;
            }
            this.data = await response.json();
            console.log('SceneMetadata: Loaded successfully');
        } catch (error) {
            console.warn('SceneMetadata: Error loading metadata:', error);
        }
    },

    // Check if metadata is available
    isAvailable() {
        return this.devMode && this.data !== null;
    },

    // Get location metadata
    getLocation(locationId) {
        if (!this.isAvailable()) return null;
        return this.data.locations?.[locationId] || null;
    },

    // Get NPC base metadata
    getNpc(npcId) {
        if (!this.isAvailable()) return null;
        return this.data.npcs?.[npcId] || null;
    },

    // Get NPC expression metadata
    getNpcExpression(npcId, expression) {
        const npc = this.getNpc(npcId);
        return npc?.expressions?.[expression] || null;
    },

    // Get scene-specific metadata
    getScene(sceneId) {
        if (!this.isAvailable()) return null;
        return this.data.scenes?.[sceneId] || null;
    },

    // Get transformation image metadata
    getTransformation(stat, level) {
        if (!this.isAvailable()) return null;
        return this.data.transformations?.[stat]?.[level] || null;
    },

    // Get device metadata
    getDevice(deviceId) {
        if (!this.isAvailable()) return null;
        return this.data.devices?.[deviceId] || null;
    },

    // Build a complete NPC portrait prompt dynamically based on current body stats
    // This combines static NPC traits with dynamic body stats
    buildNpcPrompt(npcId, expression = 'neutral', customBackground = null) {
        const npc = this.getNpc(npcId);
        if (!npc) return null;

        // Get expression terms
        const exprData = npc.expressions?.[expression];
        const exprTerms = exprData?.terms || 'neutral expression';

        // Get current body stats from game state
        const npcState = window.gameState?.npcs?.[npcId];
        if (!npcState) return null;

        const b = npcState.body;

        // Body stat SD terms
        const CHEST_TERMS = ['flat chest', 'small breasts', 'average breasts', 'large breasts', 'very large breasts huge breasts', 'massive breasts enormous breasts'];
        const MUSCLE_TERMS = ['thin no muscle', 'minimal muscle slender', 'fit visible muscle tone', 'athletic well-defined muscles', 'muscular bodybuilder', 'extremely muscular'];
        const BUTT_TERMS = ['flat butt', 'small butt', 'average butt', 'full butt round shapely', 'large butt big ass', 'massive butt huge ass'];

        const bodyTerms = [
            CHEST_TERMS[b.chest] || 'average breasts',
            MUSCLE_TERMS[b.muscle] || 'minimal muscle',
            BUTT_TERMS[b.butt] || 'average butt'
        ].join(', ');

        // Determine clothing based on highest stat level
        const maxStatLevel = Math.max(b.chest, b.butt, b.muscle);
        const clothingState = this.getClothingForLevel(maxStatLevel, npc.defaultClothing);

        const bg = customBackground || npc.defaultBackground;
        const gender = npcId === 'aldric' || npcId === 'corwin' || npcId === 'holt' ? '1boy' : '1girl';

        return {
            prompt: `<lora:CherryMouseStreetStylePonyLyco:0.75> ${gender}, ${npc.baseTraits}, ${exprTerms}, ${bodyTerms}, ${clothingState}, ${bg}, portrait, upper body, looking at viewer`,
            negative: 'bad anatomy, bad hands, missing fingers, extra digits, blurry, low quality, deformed, child, childlike, text, watermark, nude, naked',
            width: 832,
            height: 1216
        };
    },

    // Get clothing description based on stat level
    getClothingForLevel(level, baseClothing) {
        if (level <= 2) {
            return `fully clothed, ${baseClothing}`;
        } else if (level === 3) {
            return `clothed, tight ${baseClothing}, straining fabric, (cleavage:1.2)`;
        } else if (level === 4) {
            return `clothed, very tight clothes, buttons straining, (underboob:1.2), revealing`;
        } else {
            return `minimal coverage, crop top, very revealing, (cleavage:1.3)`;
        }
    },

    // Add or update scene metadata (for curation workflow)
    setSceneMetadata(sceneId, metadata) {
        if (!this.isAvailable()) return false;

        if (!this.data.scenes) {
            this.data.scenes = {};
        }

        this.data.scenes[sceneId] = {
            ...this.data.scenes[sceneId],
            ...metadata,
            lastUpdated: new Date().toISOString()
        };

        return true;
    },

    // Add a variation to a scene's prompt history
    addVariation(sceneId, promptData, notes = '') {
        if (!this.isAvailable()) return false;

        const scene = this.data.scenes?.[sceneId];
        if (!scene) return false;

        if (!scene.variations) {
            scene.variations = [];
        }

        scene.variations.push({
            prompt: promptData,
            notes: notes,
            timestamp: new Date().toISOString()
        });

        return true;
    },

    // Export metadata as JSON string (for saving)
    exportJSON() {
        if (!this.data) return null;
        return JSON.stringify(this.data, null, 2);
    },

    // Get all scene IDs that have metadata
    getAllSceneIds() {
        if (!this.isAvailable()) return [];
        return Object.keys(this.data.scenes || {});
    },

    // Get all location IDs
    getAllLocationIds() {
        if (!this.isAvailable()) return [];
        return Object.keys(this.data.locations || {});
    },

    // Get all NPC IDs
    getAllNpcIds() {
        if (!this.isAvailable()) return [];
        return Object.keys(this.data.npcs || {});
    }
};

// Auto-load metadata when script loads (if in dev mode)
document.addEventListener('DOMContentLoaded', () => {
    SceneMetadata.load();
});
