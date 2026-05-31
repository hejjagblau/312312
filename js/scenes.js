// Scene/Event System - Data-driven approach for extensibility
// Scenes are defined as data, UI just renders them
// Each scene includes its image path

const GALLERY_SCENES = {
    mira: [
        { id: 'mira_flirt_1', title: 'First Flirtation' },
        { id: 'mira_sex_intro', title: 'Intimate Encounter' },
        { id: 'mira_sex_closing', title: 'Afterglow' },
        { id: 'mira_story_day2', title: 'Day 2 - Getting Started' },
        { id: 'mira_story_day3', title: 'Day 3 - Workshop Routine' },
        { id: 'mira_story_day8', title: 'Day 8 - Growing Confidence' },
        { id: 'mira_delivery_sex', title: 'Special Delivery' },
    ],
    vessa: [
        { id: 'vessa_flirt_1', title: 'First Flirtation' },
        { id: 'vessa_sex_intro', title: 'Intimate Encounter' },
        { id: 'vessa_sex_closing', title: 'Afterglow' },
        { id: 'story_vessa_transform_first', title: 'First Transformation' },
        { id: 'story_vessa_transform', title: 'Transformation' },
    ],
    barret: [
        { id: 'barret_flirt_1', title: 'First Flirtation' },
        { id: 'barret_sex_intro', title: 'Intimate Encounter' },
        { id: 'barret_sex_closing', title: 'Afterglow' },
    ],
    della: [
        { id: 'della_flirt_1', title: 'First Flirtation' },
        { id: 'della_sex_intro', title: 'Intimate Encounter' },
        { id: 'della_sex_closing', title: 'Afterglow' },
    ],
    fiona: [
        { id: 'fiona_flirt_1', title: 'First Flirtation' },
        { id: 'fiona_sex_intro', title: 'Intimate Encounter' },
        { id: 'fiona_sex_closing', title: 'Afterglow' },
    ],
    lenna: [
        { id: 'lenna_flirt_1', title: 'First Flirtation' },
        { id: 'lenna_sex_intro', title: 'Intimate Encounter' },
        { id: 'lenna_sex_closing', title: 'Afterglow' },
    ],
    mrs_thornwick: [
        { id: 'mrs_thornwick_flirt_1', title: 'First Flirtation' },
        { id: 'thornwick_sex_intro', title: 'Intimate Encounter' },
        { id: 'thornwick_sex_closing', title: 'Afterglow' },
        { id: 'mira_thornwick_vignette_1', title: 'Tower Vignette - Part 1' },
        { id: 'mira_thornwick_vignette_2', title: 'Tower Vignette - Part 2' },
        { id: 'mira_thornwick_vignette_3', title: 'Tower Vignette - Part 3' },
        { id: 'mira_thornwick_vignette_4', title: 'Tower Vignette - Part 4' },
        { id: 'mira_thornwick_vignette_5', title: 'Tower Vignette - Part 5' },
        { id: 'mira_thornwick_vignette_6', title: 'Tower Vignette - Part 6' },
        { id: 'mira_thornwick_vignette_7', title: 'Tower Vignette - Part 7' },
        { id: 'mira_thornwick_vignette_8', title: 'Tower Vignette - Part 8' },
        { id: 'mira_thornwick_vignette_9', title: 'Tower Vignette - Part 9' },
        { id: 'mira_thornwick_vignette_10', title: 'Tower Vignette - Part 10' },
        { id: 'mira_thornwick_vignette_11', title: 'Tower Vignette - Part 11' },
        { id: 'mira_thornwick_vignette_12', title: 'Tower Vignette - Part 12' },
    ],
    aldric: [
        { id: 'aldric_flirt_1', title: 'First Flirtation' },
        { id: 'aldric_sex_intro', title: 'Intimate Encounter' },
        { id: 'aldric_sex_closing', title: 'Afterglow' },
        { id: 'story_aldric_accident_intro', title: 'The Accident' },
        { id: 'story_aldric_accident_reaction', title: 'Accident Aftermath' },
    ],
    corwin: [
        { id: 'corwin_flirt_1', title: 'First Flirtation' },
        { id: 'corwin_sex_intro', title: 'Intimate Encounter' },
        { id: 'corwin_sex_closing', title: 'Afterglow' },
        { id: 'story_corwin_bet_intro', title: 'The Bet' },
        { id: 'story_corwin_bet_result', title: 'Bet Result' },
        { id: 'story_corwin_bet_aftermath', title: 'Bet Aftermath' },
    ],
    holt: [
        { id: 'holt_flirt_1', title: 'First Flirtation' },
        { id: 'holt_sex_intro', title: 'Intimate Encounter' },
        { id: 'holt_sex_transform', title: 'Lactation Discovery' },
        { id: 'holt_sex_closing', title: 'Afterglow' },
        { id: 'story_holt_revelation', title: 'Revelation' },
        { id: 'story_holt_confession', title: 'Confession' },
        { id: 'story_holt_transform_aftermath', title: 'Transformation Aftermath' },
    ],
    sylvie: [
        { id: 'tower_reveal_entry', title: 'Tower Discovery' },
        { id: 'tower_reveal_meeting', title: 'Meeting Sylvie' },
        { id: 'tower_visit_bunny', title: 'Bunny Fantasy' },
        { id: 'tower_visit_dog', title: 'Dog Fantasy' },
        { id: 'tower_visit_fox', title: 'Fox Fantasy' },
        { id: 'tower_visit_cow', title: 'Cow Fantasy' },
        { id: 'tower_visit_elf', title: 'Elf Fantasy' },
        { id: 'tower_visit_dragon', title: 'Dragon Fantasy' },
        { id: 'tower_visit_rubber', title: 'Rubber Fantasy' },
        { id: 'tower_visit_cascade', title: 'Cascade Fantasy' },
        { id: 'tower_visit_miniature', title: 'Miniature Fantasy' },
        { id: 'tower_visit_both_genitals', title: 'Both Genitals Experiment' },
        { id: 'tower_visit_penis_experiment', title: 'Penis Experiment' },
        { id: 'sylvie_absorption_arrival', title: 'Absorption Event' },
        { id: 'tower_visit_thornwick_bimbo', title: 'Thornwick Beauty Enhancement' },
    ],
};

const SceneManager = {
    // Current scene state
    currentScene: null,

    // Scene pools for random rotation
    scenePools: {},

    // Viewer mode: when true, scene plays read-only (no state mutations, "End Scene" button)
    viewerMode: false,
    _viewerReachable: null,
    _viewerSnapshot: null,

    // Walk the scene graph from an entry point, collecting all story scene IDs.
    // Stops at navigation hubs so the codex scene viewer can distinguish scene
    // continuations from exit-to-gameplay actions.
    // NOTE: if you add a new location/navigation scene prefix, add it here too
    // or the viewer will treat those exits as viewable content.
    getReachableScenes(entryId) {
        const navPrefixes = ['town_', 'workshop_', 'location_', 'device_', 'vendor_',
            'tutorial_', 'summon_', 'jealousy_', 'square_', 'tavern_', 'bakery_',
            'blacksmith_', 'herbalist_'];
        const reachable = new Set();
        const queue = [entryId];
        while (queue.length > 0) {
            const id = queue.pop();
            if (reachable.has(id)) continue;
            if (id !== entryId && navPrefixes.some(p => id.startsWith(p))) continue;
            const scene = SCENES[id];
            if (!scene) continue;
            reachable.add(id);
            for (const action of (scene.actions || [])) {
                if (action.nextScene && !reachable.has(action.nextScene)) {
                    queue.push(action.nextScene);
                }
            }
        }
        return reachable;
    },

    // Register a scene pool for random selection
    registerPool(poolId, sceneIds) {
        this.scenePools[poolId] = sceneIds;
    },

    // Get random scene from a pool
    getRandomFromPool(poolId) {
        const pool = this.scenePools[poolId];
        if (!pool || pool.length === 0) return null;
        const index = Math.floor(Math.random() * pool.length);
        return pool[index];
    },

    // Get a scene by ID
    getScene(sceneId) {
        return SCENES[sceneId] || null;
    },

    // Check if a scene ID is an "interaction exit point" (hub scene)
    isInteractionExitPoint(sceneId) {
        // Hub scenes where player has finished an interaction and is choosing next action
        const hubScenes = ['workshop_main', 'town_navigation', 'town_exit_workshop'];
        if (hubScenes.includes(sceneId)) return true;
        // Location scenes (location_square, location_tavern, etc.)
        if (sceneId.startsWith('location_')) return true;
        return false;
    },

    // Resume a scene from saved state (skip onEnter to avoid re-triggering side effects)
    resumeScene(sceneId) {
        const scene = this.getScene(sceneId);
        if (!scene) {
            console.warn(`Cannot resume scene: ${sceneId}, falling back to workshop`);
            this.playScene('workshop_main');
            return;
        }

        // If it's a hub scene, just play it normally (no side effects to worry about)
        if (this.isInteractionExitPoint(sceneId)) {
            this.playScene(sceneId);
            return;
        }

        // Restore from cached render state if available
        if (gameState.cachedSceneRender) {
            this.currentScene = scene;
            const cached = gameState.cachedSceneRender;

            // Restore image
            UI.clearDualPortrait();
            if (cached.image) {
                UI.setSceneImage(cached.image);
            }

            // Restore dialogue
            if (cached.htmlText) {
                UI.elements.speakerName.textContent = cached.speaker || '';
                UI.elements.dialogueText.innerHTML = cached.htmlText;
            } else {
                UI.setDialogue(cached.speaker || '', cached.text || '');
            }

            // Rebuild actions from cached actions (scene.actions may be empty [] for dynamic scenes)
            const actionsSource = (cached.actions && cached.actions.length > 0) ? cached.actions : scene.actions;
            const availableActions = actionsSource.filter(action => {
                if (action.condition && typeof action.condition === 'function') {
                    return action.condition();
                }
                return true;
            });

            // If no usable actions found (e.g., all had callbacks that can't be serialized),
            // fall back to replaying the scene via onEnter
            if (availableActions.length === 0 || !availableActions.some(a => a.nextScene || a.effects)) {
                console.warn(`No restorable actions for scene: ${sceneId}, replaying with onEnter`);
                this.playScene(sceneId);
                return;
            }

            UI.setActions(availableActions.map(action => ({
                label: action.label,
                callback: () => this.handleAction(action)
            })));
            return;
        }

        // No cached render — fall back to normal play (side effects may re-fire)
        console.warn(`No cached render for scene: ${sceneId}, replaying with onEnter`);
        this.playScene(sceneId);
    },

    // Play a scene (or random from pool)
    playScene(sceneIdOrPool) {
        let sceneId = sceneIdOrPool;

        // Check if it's a pool reference
        if (sceneIdOrPool.startsWith('pool:')) {
            const poolId = sceneIdOrPool.substring(5);
            sceneId = this.getRandomFromPool(poolId);
            if (!sceneId) {
                console.error(`Empty or missing pool: ${poolId}`);
                return;
            }
        }

        const scene = this.getScene(sceneId);
        if (!scene) {
            console.error(`Scene not found: ${sceneId}`);
            return;
        }

        // In viewer mode, skip all game state mutations
        if (!this.viewerMode) {
            // Record scene visit for gallery
            if (gameState.unlockedScenes && !gameState.unlockedScenes.includes(sceneId)) {
                gameState.unlockedScenes.push(sceneId);
            }

            // Check for pending phase advance when entering hub scenes
            // This defers phase changes until player exits their current interaction
            // Phase advances silently, then the scene renders normally with updated phase
            // Exception: on new day, redirect to workshop instead
            if (this.isInteractionExitPoint(sceneId)) {
                if (checkAndExecutePendingPhaseAdvance()) {
                    // New day started - redirect to workshop
                    this.playScene('workshop_main');
                    return;
                }
                // After phase advance, check if the destination location is now closed
                // Evening: only workshop, tavern, tower stay open
                if (gameState.phase === 'evening' && sceneId.startsWith('location_')) {
                    const eveningOpen = ['location_tavern', 'location_tower'];
                    if (!eveningOpen.includes(sceneId)) {
                        this.playScene('town_navigation');
                        return;
                    }
                }
            }
        }

        this.currentScene = scene;

        // Breadcrumb trail for playtest debugging
        if (!this._sceneHistory) this._sceneHistory = [];
        this._sceneHistory.push({ id: sceneId, time: new Date().toLocaleTimeString(), day: gameState?.day, phase: gameState?.phase });
        if (this._sceneHistory.length > 50) this._sceneHistory.shift();
        console.log(`[SCENE${this.viewerMode ? ' VIEWER' : ''}] ${sceneId}  (Day ${gameState?.day} ${gameState?.phase})`);

        // Persist current scene for refresh resilience (skip in viewer mode)
        if (!this.viewerMode) {
            if (this.isInteractionExitPoint(sceneId)) {
                gameState.currentSceneId = null;
            } else {
                gameState.currentSceneId = sceneId;
            }
            saveState();
        }

        this.renderScene(scene);
    },

    // Render a scene to the UI
    renderScene(scene) {
        // Execute any scene enter effects first (may modify scene properties or redirect)
        if (scene.onEnter) {
            try {
                const result = scene.onEnter();
                // If onEnter returns 'redirect', it has already triggered another scene
                // In viewer mode, ignore redirects (stay on the requested scene)
                if (result === 'redirect' && !this.viewerMode) {
                    return;
                }
            } catch (error) {
                console.error(`Error in scene ${scene.id} onEnter:`, error);
                // Set fallback content so user isn't stuck
                scene.text = `An error occurred loading this scene. Please go back and try again.`;
                scene.actions = [{
                    label: 'Return to Workshop',
                    nextScene: 'workshop_main'
                }];
            }
        }

        // In viewer mode, restore gameState after onEnter ran (undo any mutations)
        if (this.viewerMode && this._viewerSnapshot) {
            const snapshot = JSON.parse(this._viewerSnapshot);
            // Clear all current keys, then restore snapshot (handles keys added by onEnter)
            for (const key of Object.keys(gameState)) delete gameState[key];
            Object.assign(gameState, snapshot);
            saveState();
        }

        // Cache rendered scene state for refresh resilience (skip onEnter on resume)
        if (!this.viewerMode && gameState.currentSceneId) {
            // Serialize actions: cache label, nextScene, and effects (callbacks can't be serialized)
            const cachedActions = (scene.actions || []).map(a => ({
                label: a.label,
                nextScene: a.nextScene || null,
                effects: a.effects || null
            }));
            gameState.cachedSceneRender = {
                text: scene.text,
                htmlText: scene.htmlText || null,
                speaker: scene.speaker || '',
                image: scene.image || null,
                actions: cachedActions
            };
            saveState();
        } else {
            gameState.cachedSceneRender = null;
        }

        // Set scene image
        if (scene.leftImage && scene.rightImage) {
            // Dual-portrait mode: two images side-by-side
            UI.setDualSceneImages(scene.leftImage, scene.rightImage);
        } else {
            // Clear any previous dual-portrait layout
            UI.clearDualPortrait();
        }
        if (!scene.leftImage && scene.image) {
            UI.setSceneImage(scene.image);
        }

        // Set dialogue (htmlText bypasses the dialogue formatter for pre-formatted scenes)
        if (scene.htmlText) {
            UI.elements.speakerName.textContent = scene.speaker || '';
            UI.elements.dialogueText.innerHTML = scene.htmlText;
        } else {
            UI.setDialogue(scene.speaker || '', scene.text);
        }

        // Append stat box for device scenes (set by onEnter)
        if (scene._statBoxHtml) {
            UI.elements.dialogueText.innerHTML += scene._statBoxHtml;
        }

        // In viewer mode, keep scene continuation links but drop exit navigation
        if (this.viewerMode) {
            const reachable = this._viewerReachable || new Set();
            const navActions = (scene.actions || [])
                .filter(a => a.nextScene && reachable.has(a.nextScene))
                .map(a => ({
                    label: a.label,
                    callback: () => this.playScene(a.nextScene)
                }));
            navActions.push({
                label: 'End Scene',
                callback: () => this.exitViewerMode()
            });
            UI.setActions(navActions);
            return;
        }

        // Build actions - filter by condition if present
        const availableActions = scene.actions.filter(action => {
            if (action.condition && typeof action.condition === 'function') {
                return action.condition();
            }
            return true;
        });

        const actions = availableActions.map(action => ({
            label: action.label,
            disabled: action.disabled || false,
            disabledReason: action.disabledReason || null,
            callback: () => this.handleAction(action)
        }));

        UI.setActions(actions);
    },

    // Handle an action from a scene
    handleAction(action) {
        // Execute action effects first
        if (action.effects) {
            action.effects.forEach(effect => this.executeEffect(effect));
        }

        // Then navigate to next scene
        if (action.nextScene) {
            this.playScene(action.nextScene);
        } else if (action.callback) {
            // Legacy support for custom callbacks
            action.callback();
        }
    },

    // Exit viewer mode: restore game state and return to previous position
    exitViewerMode() {
        if (!this.viewerMode) return;

        // Restore full game state from snapshot
        if (this._viewerSnapshot) {
            const snapshot = JSON.parse(this._viewerSnapshot);
            for (const key of Object.keys(gameState)) delete gameState[key];
            Object.assign(gameState, snapshot);
            saveState();
        }

        this.viewerMode = false;
        this._viewerReachable = null;
        this._viewerSnapshot = null;

        // Resume where the player was
        if (gameState.currentSceneId) {
            this.resumeScene(gameState.currentSceneId);
        } else {
            this.playScene('workshop_main');
        }
    },

    // Execute an effect
    executeEffect(effect) {
        switch (effect.type) {
            case 'addCoin':
                gameState.player.coin += effect.amount;
                saveState();
                UI.updatePlayerSidebar();
                break;
            case 'advancePhase':
                UI.advancePhase();
                break;
            case 'setLocation':
                gameState.currentLocation = effect.location;
                saveState();
                UI.updateHeader();
                break;
            case 'applyPrototypeEffect':
                applyPrototypeEffect();
                break;
            case 'setFlag':
                gameState.flags[effect.flag] = effect.value;
                saveState();
                break;
            case 'addTrust':
                if (gameState.npcs[effect.npc]) {
                    gameState.npcs[effect.npc].trust += effect.amount;
                    saveState();
                }
                break;
            case 'advanceToNextDay':
                // Skip directly to the morning of the next day
                gameState.phase = 'morning';
                gameState.day += 1;
                // Clear prototype effects on new day
                if (gameState.player.prototypeEffect) {
                    clearPrototypeEffect();
                    UI.updatePlayerSidebar();
                }
                // Passive aether absorption
                applyPassiveAether();
                resetPhaseInteractions();
                saveState();
                UI.updateHeader();
                break;
            case 'recordNpcInteraction':
                // Record that player interacted with this NPC
                recordNpcInteraction(effect.npc);
                // Check if phase should auto-advance after 2 actions
                // Set pending flag - actual advance happens when player exits interaction
                if (shouldAutoAdvancePhase()) {
                    setPendingPhaseAdvance();
                }
                break;
            case 'recordAction':
                // Record a non-NPC action (like using a device)
                recordAction();
                // Check if phase should auto-advance after 2 actions
                // Set pending flag - actual advance happens when player exits interaction
                if (shouldAutoAdvancePhase()) {
                    setPendingPhaseAdvance();
                }
                break;
            default:
                console.warn(`Unknown effect type: ${effect.type}`);
        }
    }
};

// Check for pending NPC advance and redirect if needed
function checkPendingAdvanceRedirect() {
    if (gameState.pendingAdvance) {
        const npcId = gameState.pendingAdvance.npcId;
        const sceneId = `npc_advance_${npcId}`;
        if (SCENES[sceneId]) {
            SceneManager.playScene(sceneId);
            return true;
        }
    }
    return false;
}

// Scene Definitions
// Each scene has: id, text, speaker (optional), background (optional), actions
const SCENES = {
    // Workshop scenes
    'workshop_main': {
        id: 'workshop_main',
        image: 'images/locations/workshop.webp',
        imagePrompt: null,
        text: '',
        speaker: '',
        onEnter: function() {
            // Check for pending NPC advance
            if (checkPendingAdvanceRedirect()) return 'redirect';

            gameState.currentLocation = 'workshop';
            gameState.currentTransformationTarget = null; // Clear any previous target
            saveState();
            UI.updateHeader();

            // Check for aether container extraction first
            if (gameState.aetherContainers > 0) {
                SceneManager.playScene('workshop_extract_aether');
                return 'redirect';
            }

            // Check for Mira story events (Day 2 and Day 3)
            if (gameState.day === 2 && gameState.phase === 'morning' && !gameState.flags.mira_story_day2_complete) {
                resetWorkshopVisitCounter(); // Reset delivery counter so delivery doesn't fire right after
                SceneManager.playScene('mira_story_day2');
                return 'redirect';
            }
            if (gameState.day === 3 && gameState.phase === 'morning' && gameState.flags.mira_story_day2_complete && !gameState.flags.mira_story_day3_complete) {
                markMiraVisitedWorkshop(); // Reset cooldown so random visits don't fire right after
                resetWorkshopVisitCounter();
                SceneManager.playScene('mira_story_day3');
                return 'redirect';
            }
            if (gameState.day >= 8 && gameState.phase === 'morning' && gameState.flags.mira_story_day3_complete && !gameState.flags.mira_story_day8_complete) {
                markMiraVisitedWorkshop(); // Reset cooldown so random visits don't fire right after
                resetWorkshopVisitCounter();
                SceneManager.playScene('mira_story_day8');
                return 'redirect';
            }

            // Check for progression tier advancement
            if (gameState.progression && gameState.progression.tier < 3) {
                if (gameState.flags.progression_advancement_ready) {
                    markMiraVisitedWorkshop();
                    if (gameState.progression.tier === 0) {
                        SceneManager.playScene('mira_progression_tier1_choice');
                    } else {
                        SceneManager.playScene('mira_progression_unlock');
                    }
                    return 'redirect';
                }
                // PRIMARY tier advancement: Mira hints that an NPC wants sex
                // Player then visits the NPC and clicks "Intimate..." in their greeting
                if (getNpcsAwaitingSex().length > 0 && shouldTriggerMiraWorkshopVisit()) {
                    markMiraVisitedWorkshop();
                    SceneManager.playScene('mira_sex_hint');
                    return 'redirect';
                }
            }

            // Check for random Mira workshop visits (33% after Day 3)
            // Random visits now feed into the delivery/transformation system
            if (shouldTriggerMiraWorkshopVisit()) {
                markMiraVisitedWorkshop();
                resetWorkshopVisitCounter();
                SceneManager.playScene('mira_delivery_event');
                return 'redirect';
            }

            // Increment workshop visit counter for Mira delivery system
            incrementWorkshopVisits();

            // Check for Mira delivery event (every 12 visits)
            if (shouldTriggerMiraDelivery()) {
                resetWorkshopVisitCounter();
                markMiraVisitedWorkshop(); // Reset cooldown so random visits don't fire right after
                SceneManager.playScene('mira_delivery_event');
                return 'redirect';
            }

            // Check for story events
            const storyEvent = checkStoryEvents();
            if (storyEvent) {
                SceneManager.playScene(storyEvent.scene);
                return 'redirect';
            }

            // Check for Corwin & Vessa's bet workshop visit (day after bet result)
            if (gameState.flags.story_corwin_bet_result &&
                !gameState.flags.story_corwin_bet_complete &&
                gameState.phase === 'morning') {
                SceneManager.playScene('story_corwin_bet_workshop');
                return 'redirect';
            }

            // Check for scheduled NPC visits (all female NPCs)
            const npcVisits = [
                { npc: 'vessa', scene: 'vessa_workshop_arrival' },
                { npc: 'barret', scene: 'barret_workshop_arrival' },
                { npc: 'della', scene: 'della_workshop_arrival' },
                { npc: 'fiona', scene: 'fiona_workshop_arrival' },
                { npc: 'lenna', scene: 'lenna_workshop_arrival' },
                { npc: 'mrs_thornwick', scene: 'mrs_thornwick_workshop_arrival' },
                { npc: 'aldric', scene: 'aldric_workshop_arrival' },
                { npc: 'corwin', scene: 'corwin_workshop_arrival' },
                { npc: 'holt', scene: 'holt_workshop_arrival' }
            ];

            for (const visit of npcVisits) {
                if (isNpcUnlocked(visit.npc) &&
                    gameState.flags[`${visit.npc}_workshop_visit_scheduled`] &&
                    !gameState.flags[`${visit.npc}_workshop_visit_triggered`]) {
                    gameState.flags[`${visit.npc}_workshop_visit_triggered`] = true;
                    saveState();
                    SceneManager.playScene(visit.scene);
                    return 'redirect';
                }
            }

            // --- Build actions dynamically based on tutorial/day state ---
            const day1Tutorial = gameState.day === 1 && !gameState.flags.tutorial_day1_complete;
            const workshopLocked = !gameState.flags.mira_story_day3_complete;

            if (day1Tutorial) {
                // Day 1 tutorial: guided steps with disabled alternatives
                const phase = gameState.phase;
                const doneNotes = !!gameState.flags.tutorial_step_notes;
                const donePrototypes = !!gameState.flags.tutorial_step_prototypes;

                if (phase === 'morning' && !doneNotes) {
                    this.text = "You stand in your uncle's workshop for the first time. Dust motes dance in the light streaming through grimy windows. Curious devices line the shelves, and scattered papers cover every surface. A crystal cube sits on a high shelf, pulsing faintly.\n\nThe papers on the desk catch your eye. Your uncle's handwriting covers dozens of pages. That seems like a good place to start.";
                } else if (phase === 'afternoon' && doneNotes && !donePrototypes) {
                    this.text = "Your uncle's notes are still sinking in. The workshop feels different now that you know what it was built for. Several prototype devices sit on a low shelf, their brass housings warm to the touch.";
                } else if (phase === 'evening' && doneNotes && donePrototypes) {
                    this.text = "The prototype's effects are still tingling through you. A corkboard near the door has a few pins in it, but no papers. Your uncle's 'request board,' according to his notes. Maybe worth checking.";
                } else {
                    this.text = "You're in your uncle's workshop. Dust motes dance in the light streaming through grimy windows. Curious devices line the shelves, and scattered papers cover every surface.";
                }

                this.actions = [
                    {
                        label: "Study Uncle's Notes",
                        nextScene: 'tutorial_study_notes',
                        disabled: phase !== 'morning' || doneNotes,
                        disabledReason: doneNotes ? 'Already done' : 'Read your uncle\'s notes first'
                    },
                    {
                        label: 'Examine Prototype Devices',
                        nextScene: 'tutorial_examine_prototypes',
                        disabled: phase !== 'afternoon' || !doneNotes || donePrototypes,
                        disabledReason: donePrototypes ? 'Already done' : (doneNotes ? 'Try the prototypes first' : 'Read your uncle\'s notes first')
                    },
                    {
                        label: 'Check Request Board',
                        nextScene: 'tutorial_empty_board',
                        disabled: phase !== 'evening' || !doneNotes || !donePrototypes,
                        disabledReason: !doneNotes ? 'Read your uncle\'s notes first' : (!donePrototypes ? 'Try the prototypes first' : null)
                    },
                    {
                        label: 'Go Outside',
                        nextScene: 'town_exit_workshop',
                        disabled: true,
                        disabledReason: 'You should explore the workshop first'
                    }
                ];
            } else if (workshopLocked) {
                // Day 2+ before Mira day 3 completes: normal workshop, locked outside
                this.text = "You're in your uncle's workshop. Dust motes dance in the light streaming through grimy windows. Curious devices line the shelves, and scattered papers cover every surface. A crystal cube sits on a high shelf, glowing softly with stored Aether. What would you like to do?";
                this.actions = [
                    { label: "Study Uncle's Notes (skip time)", nextScene: 'workshop_study_notes' },
                    {
                        label: 'Examine Prototype Devices',
                        nextScene: 'workshop_prototypes',
                        condition: () => canUsePrototypeDevice()
                    },
                    {
                        label: 'Examine Prototype Devices (Unavailable)',
                        nextScene: 'workshop_prototypes_unavailable',
                        condition: () => !canUsePrototypeDevice()
                    },
                    { label: 'Work from Request Board', nextScene: 'workshop_request_board', condition: () => !areAllVendorItemsFree() },
                    {
                        label: 'Go Outside',
                        nextScene: 'town_exit_workshop',
                        disabled: true,
                        disabledReason: 'Mira asked you to wait here'
                    }
                ];
            } else {
                // Day 3+ normal mode: full access
                this.text = "You're in your uncle's workshop. Dust motes dance in the light streaming through grimy windows. Curious devices line the shelves, and scattered papers cover every surface. A crystal cube sits on a high shelf, glowing softly with stored Aether. What would you like to do?";
                this.actions = [
                    { label: "Study Uncle's Notes (skip time)", nextScene: 'workshop_study_notes' },
                    {
                        label: 'Examine Prototype Devices',
                        nextScene: 'workshop_prototypes',
                        condition: () => canUsePrototypeDevice()
                    },
                    {
                        label: 'Examine Prototype Devices (Unavailable)',
                        nextScene: 'workshop_prototypes_unavailable',
                        condition: () => !canUsePrototypeDevice()
                    },
                    {
                        label: 'Use Transformation Devices',
                        nextScene: 'device_target_selection',
                        condition: () => gameState?.flags?.first_transformation === true && Object.values(DEVICES).some(d => isDeviceUnlocked(d.id))
                    },
                    { label: 'Work from Request Board', nextScene: 'workshop_request_board', condition: () => !areAllVendorItemsFree() },
                    {
                        label: 'Summon Mira',
                        nextScene: 'summon_mira',
                        condition: () => (gameState.npcs.mira?.trust || 0) >= getNpcTrustThresholds('mira').sandbox
                    },
                    { label: 'Go Outside', nextScene: 'town_exit_workshop' }
                ];
            }
        },
        actions: []
    },

    'workshop_prototypes_unavailable': {
        id: 'workshop_prototypes_unavailable',
        image: 'images/locations/workshop.webp',
        imagePrompt: null,
        text: "You're still feeling the effects of this morning's prototype mishap. Your body feels unstable - it would be unwise to expose yourself to more experimental magic until the current effect wears off overnight.",
        speaker: '',
        actions: [
            { label: 'Back', nextScene: 'workshop_main' }
        ]
    },

    'workshop_study_notes': {
        id: 'workshop_study_notes',
        image: 'images/locations/workshop.webp',
        imagePrompt: null,
        text: "You spend time poring over your uncle's cryptic notes. The hours pass quietly.",
        speaker: '',
        onEnter: function() {
            UI.advancePhase();
            SceneManager.playScene('workshop_main');
            return 'redirect';
        },
        actions: []
    },

    // ============================================
    // DAY 1 TUTORIAL SCENES
    // ============================================

    'tutorial_study_notes': {
        id: 'tutorial_study_notes',
        image: 'images/locations/workshop.webp',
        imagePrompt: null,
        text: `You settle into your uncle's chair and begin reading through the stacks of papers on his desk. Most of it is technical jargon you don't understand yet, but a few passages stand out.

One journal entry, dated years ago, reads: "The human body is clay waiting to be shaped. Aether provides the energy; the devices provide the direction. I have helped three clients this month alone, each seeking something different."

**Your uncle was a body sculptor.** He used these devices to reshape people, changing their proportions, their features, their very anatomy. And they came to him willingly, even eagerly.

Another note, pinned to the wall: "The crystal cube stores raw Aether. Without it, nothing works. Must find reliable sources."

You glance at the crystal cube on the shelf. It pulses with a faint inner light. Whatever Aether is, there's some left.`,
        speaker: '',
        onEnter: function() {
            gameState.flags.tutorial_step_notes = true;
            UI.advancePhase(true);
            saveState();
        },
        actions: [
            { label: 'Continue exploring the workshop', nextScene: 'workshop_main' }
        ]
    },

    'tutorial_examine_prototypes': {
        id: 'tutorial_examine_prototypes',
        image: '',
        imagePrompt: null,
        text: '',
        speaker: '',
        _currentEffect: null,
        onEnter: function() {
            const effect = applyPrototypeEffect();
            this._currentEffect = effect;
            this.image = `images/effects/female_${effect.id}.webp`;

            let text = `You pick up one of the brass devices from the low shelf. It's warm, almost alive feeling. Before you can examine it properly, it hums to life in your hand.\n\nThere's a flash of light and a tingling sensation...\n\n${effect.description}\n\n`;

            if (effect.grantsAether) {
                text += `The device releases a small amount of residual energy as it stabilizes. The energy streams across the room and is absorbed into the crystal cube. (+1 Aether)\n\n`;
            }

            text += `**These prototype devices cause temporary changes that wear off by morning.** Your uncle's notes mentioned more refined devices that make permanent, controlled transformations. Those must be the larger machines deeper in the workshop.\n\n(This effect will wear off by morning.)`;

            this.text = text;
            gameState.flags.tutorial_step_prototypes = true;
            saveState();
            UI.updatePlayerSidebar();
        },
        actions: [
            {
                label: 'Continue',
                nextScene: 'workshop_main',
                effects: [
                    { type: 'advancePhase' }
                ]
            }
        ]
    },

    'tutorial_empty_board': {
        id: 'tutorial_empty_board',
        image: 'images/locations/workshop.webp',
        imagePrompt: null,
        text: `The corkboard near the door is bare. Your uncle's notes called it a 'request board' where clients would post jobs, but there are no requests pinned up. Nobody in town knows you've taken over the workshop yet.

You spend the evening tidying the workspace instead. While clearing out a drawer, you find a small leather pouch tucked behind some tools. Inside are a handful of coins your uncle must have forgotten about.

**(+5 Coin)**

Not a bad first day. You learned what your uncle really did here, felt the power of Aether firsthand, and started making the place your own. Tomorrow you should see if anyone comes by.`,
        speaker: '',
        onEnter: function() {
            gameState.flags.tutorial_step_board = true;
            gameState.flags.tutorial_day1_complete = true;
            gameState.player.coin += 5;
            saveState();
            UI.updatePlayerSidebar();
        },
        actions: [
            {
                label: 'Rest for the night',
                nextScene: 'workshop_main',
                effects: [
                    { type: 'advancePhase' }
                ]
            }
        ]
    },

    'workshop_prototypes': {
        id: 'workshop_prototypes',
        image: '', // Set dynamically based on effect
        imagePrompt: null, // Set dynamically based on effect
        text: '', // Set dynamically based on effect
        speaker: '',
        _currentEffect: null, // Store the effect for action processing
        onEnter: function() {
            const effect = applyPrototypeEffect();
            this._currentEffect = effect;
            this.image = `images/effects/female_${effect.id}.webp`;

            let text = `You pick up one of the prototype devices and it hums to life unexpectedly. There's a flash of light and a tingling sensation...\n\n${effect.description}`;

            if (effect.grantsAether) {
                text += `\n\nWell, that was unexpected. The device releases a small amount of residual aether as it stabilizes - the energy streams across the room and is absorbed into the crystal cube. (+1 Aether)`;
            } else {
                text += `\n\nYou've experienced this effect before. The device stabilizes without releasing any aether into the cube.`;
            }

            if (effect.dayEnding) {
                text += `\n\n${effect.dayEndMessage}`;
            } else {
                text += `\n\n(This effect will wear off by morning.)`;
            }

            this.text = text;

            // Aether is already handled by applyPrototypeEffect()
            UI.updatePlayerSidebar();
        },
        actions: [
            {
                label: 'Continue',
                nextScene: 'workshop_main',
                effects: [
                    { type: 'advancePhase' }
                ],
                condition: function() {
                    const scene = SCENES['workshop_prototypes'];
                    return !scene._currentEffect || !scene._currentEffect.dayEnding;
                }
            },
            {
                label: 'Wait until morning...',
                nextScene: 'workshop_main',
                effects: [
                    { type: 'advanceToNextDay' }
                ],
                condition: function() {
                    const scene = SCENES['workshop_prototypes'];
                    return scene._currentEffect && scene._currentEffect.dayEnding;
                }
            }
        ]
    },

    'workshop_request_board': {
        id: 'workshop_request_board',
        image: 'images/locations/workshop.webp',
        imagePrompt: null,
        text: '',
        speaker: '',
        onEnter: function() {
            // Get a random request from the board
            const request = getRandomRequest();
            const result = completeRequest(request);

            let text = `**${request.name}**\n\n${request.description}\n\n`;
            text += `You spend time completing the job. It's honest work that keeps the workshop running.\n\n`;
            text += `(+${result.coinEarned} Coin)`;

            // Special outcome text from enhanced job types
            if (result.outcomeText) {
                text += `\n\n${result.outcomeText}`;

                // Additional note for trust boosts
                if (result.specialOutcome === 'trust_boost') {
                    text += `\n\n*(Their opinion of you has improved)*`;
                }
            }

            // Special story hints for mysterious jobs
            if (request.storyHint && !gameState.flags.request_board_mystery_hint) {
                text += `\n\nThe cryptic note mentions something about "those who seek to become their true selves." It sounds like something from your uncle's writings...`;
                gameState.flags.request_board_mystery_hint = true;
                saveState();
            }

            this.text = text;
        },
        actions: [
            {
                label: 'Continue',
                nextScene: 'workshop_main',
                effects: [
                    { type: 'advancePhase' }
                ]
            }
        ]
    },

    // Town navigation
    'town_exit_workshop': {
        id: 'town_exit_workshop',
        image: 'images/locations/town_street.webp',
        imagePrompt: null,
        text: '',
        speaker: '',
        onEnter: function() {
            if (gameState.phase === 'evening') {
                this.text = "Night has fallen over Millbrook. Most shops are closed, but the tavern's warm light beckons.";
            } else {
                this.text = "You step outside the workshop. The town of Millbrook stretches before you. Where would you like to go?";
            }
        },
        actions: [
            { label: 'Town Square', nextScene: 'location_square', condition: () => gameState.phase !== 'evening' },
            { label: 'Tavern', nextScene: 'location_tavern' },
            { label: 'Blacksmith', nextScene: 'location_blacksmith', condition: () => gameState.phase !== 'evening' },
            { label: 'Herbalist', nextScene: 'location_herbalist', condition: () => gameState.phase !== 'evening' },
            { label: 'Library', nextScene: 'location_library', condition: () => gameState.phase !== 'evening' },
            { label: 'Bakery', nextScene: 'pool:bakery_visits', condition: () => gameState.phase !== 'evening' },
            { label: 'Guard Post', nextScene: 'location_guardpost', condition: () => gameState.phase !== 'evening' },
            { label: 'Blackstone Tower', nextScene: 'location_tower', condition: () => gameState.flags.has_tower_key || gameState.flags.sylvie_reveal_complete },
            { label: 'Back to Workshop', nextScene: 'workshop_main' }
        ]
    },

    // Location scenes - use NPC schedules to determine who's present
    'location_square': {
        id: 'location_square',
        image: 'images/locations/square.webp',
        imagePrompt: null,
        text: '',
        speaker: '',
        onEnter: function() {
            // Check for pending NPC advance
            if (checkPendingAdvanceRedirect()) return 'redirect';

            gameState.currentLocation = 'square';
            saveState();
            UI.updateHeader();

            const baseDesc = "The town square is bustling with activity. A fountain gurgles in the center, and market stalls line the edges.";

            // Try to show a vignette
            const vignette = tryShowVignette('square');
            if (vignette) {
                this.image = vignette.image;
                this.text = vignette.text;
            } else {
                this.image = 'images/locations/square.webp';
                this.text = getLocationDescription('square', baseDesc);
            }

            // Build dynamic actions based on who's here
            const npcActions = buildLocationNpcActions('square');
            this.actions = [
                ...npcActions,
                { label: 'Browse the stalls', nextScene: 'square_browse', condition: () => isVendorItemAvailable('square') },
                { label: 'Loiter (skip time)', callback: () => { if (UI.advancePhase()) { SceneManager.playScene('workshop_main'); } else { SceneManager.playScene('location_square'); } } },
                { label: 'Go Elsewhere', nextScene: 'town_navigation' },
                { label: 'Return to Workshop', nextScene: 'workshop_main' }
            ];
        },
        actions: [] // Set dynamically in onEnter
    },

    'location_tavern': {
        id: 'location_tavern',
        image: 'images/locations/tavern.webp',
        imagePrompt: null,
        text: '',
        speaker: '',
        onEnter: function() {
            // Check for pending NPC advance
            if (checkPendingAdvanceRedirect()) return 'redirect';

            gameState.currentLocation = 'tavern';
            saveState();
            UI.updateHeader();

            // Check for special events (rivalry, support) - 15% chance
            if (gameState.flags.mira_story_day3_complete && getPhaseRoll('tavern_special', 0.15)) {
                // Check rivalry events first
                const rivalryEvent = checkRivalryEvent();
                if (rivalryEvent) {
                    if (rivalryEvent.type === 'discovery') {
                        SceneManager.playScene('rivalry_discovery');
                        return;
                    } else {
                        SceneManager.playScene('rivalry_resolution');
                        return;
                    }
                }
                // Check support events
                const supportEvent = checkSupportEvent();
                if (supportEvent) {
                    SCENES['support_event']._supportEventData = supportEvent;
                    SceneManager.playScene('support_event');
                    return;
                }
            }

            const baseDesc = "The tavern is warm and inviting. The smell of ale and roasting meat fills the air.";

            // Try to show a vignette
            const vignette = tryShowVignette('tavern');
            if (vignette) {
                this.image = vignette.image;
                this.text = vignette.text;
            } else {
                this.image = 'images/locations/tavern.webp';
                this.text = getLocationDescription('tavern', baseDesc);
            }

            const npcActions = buildLocationNpcActions('tavern');
            this.actions = [
                ...npcActions,
                { label: 'Check the bar', nextScene: 'tavern_browse', condition: () => isVendorItemAvailable('tavern') },
                { label: 'Loiter (skip time)', callback: () => { if (UI.advancePhase()) { SceneManager.playScene('workshop_main'); } else { SceneManager.playScene('location_tavern'); } } },
                { label: 'Go Elsewhere', nextScene: 'town_navigation' },
                { label: 'Return to Workshop', nextScene: 'workshop_main' }
            ];
        },
        actions: []
    },

    'location_blacksmith': {
        id: 'location_blacksmith',
        image: 'images/locations/blacksmith.webp',
        text: '',
        speaker: '',
        onEnter: function() {
            // Check for pending NPC advance
            if (checkPendingAdvanceRedirect()) return 'redirect';

            gameState.currentLocation = 'blacksmith';
            saveState();
            UI.updateHeader();

            const baseDesc = "The forge blazes with heat. The ring of hammer on metal echoes off the stone walls.";

            // Try to show a vignette
            const vignette = tryShowVignette('blacksmith');
            if (vignette) {
                this.image = vignette.image;
                this.text = vignette.text;
            } else {
                this.image = 'images/locations/blacksmith.webp';
                this.text = getLocationDescription('blacksmith', baseDesc);
            }

            const npcActions = buildLocationNpcActions('blacksmith');
            this.actions = [
                ...npcActions,
                { label: 'Browse materials', nextScene: 'blacksmith_shop', condition: () => isVendorItemAvailable('blacksmith') },
                { label: 'Loiter (skip time)', callback: () => { if (UI.advancePhase()) { SceneManager.playScene('workshop_main'); } else { SceneManager.playScene('location_blacksmith'); } } },
                { label: 'Go Elsewhere', nextScene: 'town_navigation' },
                { label: 'Return to Workshop', nextScene: 'workshop_main' }
            ];
        },
        actions: []
    },

    'location_library': {
        id: 'location_library',
        image: 'images/locations/library.webp',
        text: '',
        speaker: '',
        onEnter: function() {
            // Check for pending NPC advance
            if (checkPendingAdvanceRedirect()) return 'redirect';

            gameState.currentLocation = 'library';
            saveState();
            UI.updateHeader();

            const baseDesc = "Towering bookshelves reach toward the vaulted ceiling. Dust motes dance in the light from tall windows.";

            // Try to show a vignette
            const vignette = tryShowVignette('library');
            if (vignette) {
                this.image = vignette.image;
                this.text = vignette.text;
            } else {
                this.image = 'images/locations/library.webp';
                this.text = getLocationDescription('library', baseDesc);
            }

            const npcActions = buildLocationNpcActions('library');
            this.actions = [
                ...npcActions,
                { label: 'Loiter (skip time)', callback: () => { if (UI.advancePhase()) { SceneManager.playScene('workshop_main'); } else { SceneManager.playScene('location_library'); } } },
                { label: 'Go Elsewhere', nextScene: 'town_navigation' },
                { label: 'Return to Workshop', nextScene: 'workshop_main' }
            ];
        },
        actions: []
    },

    'location_bakery': {
        id: 'location_bakery',
        image: 'images/locations/bakery.webp',
        text: '',
        speaker: '',
        onEnter: function() {
            // Check for pending NPC advance
            if (checkPendingAdvanceRedirect()) return 'redirect';

            gameState.currentLocation = 'bakery';
            saveState();
            UI.updateHeader();

            const baseDesc = "The sweet aroma of fresh bread and pastries fills the cozy shop.";

            // Try to show a vignette
            const vignette = tryShowVignette('bakery');
            if (vignette) {
                this.image = vignette.image;
                this.text = vignette.text;
            } else {
                this.image = 'images/locations/bakery.webp';
                this.text = getLocationDescription('bakery', baseDesc);
            }

            const npcActions = buildLocationNpcActions('bakery');
            this.actions = [
                ...npcActions,
                { label: 'Buy a pastry (5 coin)', nextScene: 'bakery_buy_pastry' },
                { label: 'Loiter (skip time)', callback: () => { if (UI.advancePhase()) { SceneManager.playScene('workshop_main'); } else { SceneManager.playScene('location_bakery'); } } },
                { label: 'Go Elsewhere', nextScene: 'town_navigation' },
                { label: 'Return to Workshop', nextScene: 'workshop_main' }
            ];
        },
        actions: []
    },

    'location_guardpost': {
        id: 'location_guardpost',
        image: 'images/locations/guardpost.webp',
        text: '',
        speaker: '',
        onEnter: function() {
            // Check for pending NPC advance
            if (checkPendingAdvanceRedirect()) return 'redirect';

            gameState.currentLocation = 'guardpost';
            saveState();
            UI.updateHeader();

            const baseDesc = "The guard post stands watch over the town entrance. Armor and weapons line the walls.";

            // Try to show a vignette
            const vignette = tryShowVignette('guardpost');
            if (vignette) {
                this.image = vignette.image;
                this.text = vignette.text;
            } else {
                this.image = 'images/locations/guardpost.webp';
                this.text = getLocationDescription('guardpost', baseDesc);
            }

            const npcActions = buildLocationNpcActions('guardpost');
            this.actions = [
                ...npcActions,
                { label: 'Loiter (skip time)', callback: () => { if (UI.advancePhase()) { SceneManager.playScene('workshop_main'); } else { SceneManager.playScene('location_guardpost'); } } },
                { label: 'Go Elsewhere', nextScene: 'town_navigation' },
                { label: 'Return to Workshop', nextScene: 'workshop_main' }
            ];
        },
        actions: []
    },

    // Town navigation hub
    'town_navigation': {
        id: 'town_navigation',
        image: 'images/locations/street.webp',
        text: '',
        speaker: '',
        onEnter: function() {
            if (gameState.phase === 'evening') {
                this.text = "Night has fallen. Most shops are closed for the evening.";
            } else {
                this.text = "Where would you like to go?";
            }
        },
        actions: [
            { label: 'Town Square', nextScene: 'location_square', condition: () => gameState.phase !== 'evening' },
            { label: 'Tavern', nextScene: 'location_tavern' },
            { label: 'Blacksmith', nextScene: 'location_blacksmith', condition: () => gameState.phase !== 'evening' },
            { label: 'Herbalist', nextScene: 'location_herbalist', condition: () => gameState.phase !== 'evening' },
            { label: 'Library', nextScene: 'location_library', condition: () => gameState.phase !== 'evening' },
            { label: 'Bakery', nextScene: 'location_bakery', condition: () => gameState.phase !== 'evening' },
            { label: 'Guard Post', nextScene: 'location_guardpost', condition: () => gameState.phase !== 'evening' },
            { label: 'Blackstone Tower', nextScene: 'location_tower', condition: () => gameState.flags.has_tower_key || gameState.flags.sylvie_reveal_complete },
            { label: 'Return to Workshop', nextScene: 'workshop_main' }
        ]
    },

    // Simple activity scenes
    // Bakery scenes - example of multiple rotations
    'bakery_visit_1': {
        id: 'bakery_visit_1',
        image: '',
        imagePrompt: null,
        text: "The bakery is warm from the ovens. Della is arranging fresh loaves on the counter, humming to herself.",
        speaker: '',
        onEnter: function() {
            this.image = getNpcImagePath('della');
            gameState.currentLocation = 'bakery';
            saveState();
            UI.updateHeader();
        },
        actions: [
            { label: 'Talk to Della', nextScene: 'npc_della_greeting' },
            { label: 'Buy a pastry (5 coin)', nextScene: 'bakery_buy_pastry' },
            { label: 'Leave', nextScene: 'town_exit_workshop' }
        ]
    },

    'bakery_visit_2': {
        id: 'bakery_visit_2',
        image: '',
        imagePrompt: null,
        text: "You enter to find Della pulling a tray of golden rolls from the oven. The smell is incredible.",
        speaker: '',
        onEnter: function() {
            this.image = getNpcImagePath('della');
            gameState.currentLocation = 'bakery';
            saveState();
            UI.updateHeader();
        },
        actions: [
            { label: 'Talk to Della', nextScene: 'npc_della_greeting' },
            { label: 'Ask about the rolls', nextScene: 'npc_della_greeting' },
            { label: 'Leave', nextScene: 'town_exit_workshop' }
        ]
    },

    'bakery_visit_3': {
        id: 'bakery_visit_3',
        image: '',
        imagePrompt: null,
        text: "The bakery is quiet today. Della is wiping down the counter, looking a bit bored.",
        speaker: '',
        onEnter: function() {
            this.image = getNpcImagePath('della');
            gameState.currentLocation = 'bakery';
            saveState();
            UI.updateHeader();
        },
        actions: [
            { label: 'Chat with Della', nextScene: 'npc_della_greeting' },
            { label: 'Browse the goods', nextScene: 'bakery_browse' },
            { label: 'Leave', nextScene: 'town_exit_workshop' }
        ]
    },

    'bakery_buy_pastry': {
        id: 'bakery_buy_pastry',
        image: '',
        imagePrompt: null,
        text: "You buy a delicious pastry. It's still warm and melts in your mouth.",
        speaker: 'Della',
        onEnter: function() {
            this.image = getNpcImagePath('della');
            gameState.npcs.della.trust = Math.min(100, (gameState.npcs.della.trust || 0) + 3);
            saveState();
        },
        actions: [
            {
                label: 'Continue',
                nextScene: 'bakery_visit_1',
                effects: [{ type: 'addCoin', amount: -5 }]
            }
        ]
    },

    // NPC greeting scenes
    'npc_barret_greeting': {
        id: 'npc_barret_greeting',
        image: '',
        imagePrompt: null,
        text: "Welcome, welcome! What can I get you?",
        speaker: 'Barret',
        onEnter: function() {
            this.image = getNpcImagePath('barret');
            if (hasInteractedThisPhase('barret')) {
                this.text = getAlreadyInteractedMessage('barret');
                return;
            }
            const reaction = getNpcReactionToChanges('barret');
            if (reaction) {
                this.text = `${reaction}\n\n"Anyway... welcome! What can I get you?"`;
            } else {
                this.text = "Welcome, welcome! What can I get you?";
            }
            updateNpcLastSeenPlayer('barret');
        },
        actions: [
            { label: 'Just looking around', nextScene: 'location_tavern' },
            // { label: 'Order a drink', nextScene: 'tavern_order_drink' },  // TODO: Drunkenness system
            {
                label: 'Chat',
                nextScene: 'barret_chat',
                condition: () => !hasInteractedThisPhase('barret'),
                effects: [{ type: 'recordNpcInteraction', npc: 'barret' }]
            }
        ]
    },

    'npc_della_greeting': {
        id: 'npc_della_greeting',
        image: '',
        imagePrompt: null,
        text: "Hello, dear! Would you like a fresh pastry?",
        speaker: 'Della',
        onEnter: function() {
            this.image = getNpcImagePath('della');
            if (hasInteractedThisPhase('della')) {
                this.text = getAlreadyInteractedMessage('della');
                this.actions = [
                    { label: 'Leave', nextScene: 'location_bakery' }
                ];
                return;
            }
            const reaction = getNpcReactionToChanges('della');
            if (reaction) {
                this.text = `${reaction}\n\n{della}"It's always lovely to see you, dear."`;
            } else {
                this.text = `{della}"Hello, dear! It's always lovely to see you."`;
            }
            updateNpcLastSeenPlayer('della');

            this.actions = [
                {
                    label: 'Chat',
                    nextScene: 'della_chat',
                    condition: () => !hasInteractedThisPhase('della'),
                    effects: [{ type: 'recordNpcInteraction', npc: 'della' }]
                }
            ];

            // Invite to workshop if desire is known and NPC can be transformed
            const npcState = gameState.npcs.della;
            const desireKnown = npcState?.desireKnownToPlayer || npcState?.desireRevealed;
            const hasKnownGoal = desireKnown && npcState?.currentDesire;
            if (canTransformNpc('della').canTransform && hasKnownGoal && !isNpcSatisfied('della')) {
                this.actions.push({
                    label: 'Invite to workshop',
                    nextScene: 'della_invite_workshop',
                    condition: () => !hasInteractedThisPhase('della'),
                    effects: [{ type: 'recordNpcInteraction', npc: 'della' }]
                });
            }

            // Flirt
            if (canFlirtWithNpc('della').canFlirt) {
                this.actions.push({
                    label: 'Flirt',
                    nextScene: 'della_flirt',
                    condition: () => !hasInteractedThisPhase('della'),
                    effects: [{ type: 'recordNpcInteraction', npc: 'della' }]
                });
            }

            // Intimate
            const thresholds = getNpcTrustThresholds('della');
            if ((npcState?.trust || 0) >= thresholds.intimate || npcState?.archetypeIntimateReady) {
                this.actions.push({
                    label: 'Intimate...',
                    nextScene: 'della_sex_intro',
                    condition: () => !hasInteractedThisPhase('della'),
                    effects: [{ type: 'recordNpcInteraction', npc: 'della' }]
                });
            }

            // Archetype suggestion
            if (canSuggestArchetype('della')) {
                this.actions.push({
                    label: 'Suggest a new look',
                    nextScene: 'della_archetype_suggest',
                    condition: () => !hasInteractedThisPhase('della'),
                    effects: [{ type: 'recordNpcInteraction', npc: 'della' }]
                });
            }

            this.actions.push({ label: 'Leave', nextScene: 'location_bakery' });
        },
        actions: []
    },

    // Barret chat scenes
    'barret_chat_1': {
        id: 'barret_chat_1',
        image: '',
        imagePrompt: null,
        text: "Business has been good lately. Lots of travelers passing through. You hear all sorts of interesting stories in a place like this.",
        speaker: 'Barret',
        onEnter: function() { this.image = getNpcImagePath('barret'); },
        actions: [
            { label: 'Tell me more', nextScene: 'barret_chat_stories' },
            { label: 'That\'s nice', nextScene: 'location_tavern' }
        ]
    },

    'barret_chat_2': {
        id: 'barret_chat_2',
        image: '',
        imagePrompt: null,
        text: "Your uncle used to come here sometimes, you know. Quiet man. Always scribbling in his notebooks.",
        speaker: 'Barret',
        onEnter: function() { this.image = getNpcImagePath('barret'); },
        actions: [
            { label: 'What was he like?', nextScene: 'barret_uncle_story' },
            { label: 'Interesting...', nextScene: 'location_tavern' }
        ]
    },

    // Della chat scenes
    'della_chat_1': {
        id: 'della_chat_1',
        image: '',
        imagePrompt: null,
        text: "I've been baking in this town for thirty years now. Started when I was just a girl, helping my mother.",
        speaker: 'Della',
        onEnter: function() { this.image = getNpcImagePath('della'); },
        actions: [
            { label: 'That\'s wonderful', nextScene: 'bakery_visit_1' }
        ]
    },

    'della_chat_2': {
        id: 'della_chat_2',
        image: '',
        imagePrompt: null,
        text: "You know, your uncle had quite the sweet tooth. He'd come by for honey cakes every week.",
        speaker: 'Della',
        onEnter: function() { this.image = getNpcImagePath('della'); },
        actions: [
            { label: 'Really?', nextScene: 'della_uncle_story' },
            { label: 'Sounds like him', nextScene: 'bakery_visit_1' }
        ]
    }
};

// ==========================================
// STORY EVENT SCENES
// ==========================================


SCENES['story_uncle_journal'] = {
    id: 'story_uncle_journal',
    image: 'images/locations/workshop.webp',
    imagePrompt: null,
    speaker: '',
    text: "While cleaning a dusty corner of the workshop, you find a hidden compartment. Inside lies a leather-bound journal.\n\nYour uncle's handwriting fills the pages - personal thoughts mixed with technical notes.\n\n*\"My work is not about playing god,\"* one entry reads. *\"It's about setting people free. Free from bodies that betray them. Free to become who they truly are.\"*\n\nAnother entry catches your eye: *\"She came to me broken, trapped in flesh that felt wrong. When I finished, she wept - not from pain, but from finally seeing herself in the mirror. That is why I do this.\"*\n\n**(Uncle's Journal discovered)**",
    onEnter: function() {
        gameState.flags.story_journal_found = true;
        discoverKnowledge('uncle_past');
        saveState();
        UI.updatePlayerSidebar();
    },
    actions: [
        { label: 'Read more', nextScene: 'story_uncle_journal_2' },
        { label: 'Close the journal', nextScene: 'workshop_main' }
    ]
};

SCENES['story_uncle_journal_2'] = {
    id: 'story_uncle_journal_2',
    image: 'images/locations/workshop.webp',
    imagePrompt: null,
    speaker: '',
    text: "You read on, learning more about your uncle's past.\n\nHe was a healer once - famous for his skill. But he grew frustrated with the limitations of medicine. People came to him suffering not from illness, but from their own bodies.\n\n\"The medical establishment called me mad,\" he writes. \"But I know the truth. The body is not destiny. It is clay, waiting to be shaped.\"\n\nThe final entry is dated just weeks before his death:\n\n\"My devices are complete. My work is done. Soon, someone will inherit this workshop. I hope they understand what I was trying to do. I hope they continue my work.\"\n\nHe meant you.",
    onEnter: function() {
        discoverKnowledge('uncle_love');
    },
    actions: [
        { label: 'Continue his work', nextScene: 'workshop_main' }
    ]
};

SCENES['story_mysterious_visitor'] = {
    id: 'story_mysterious_visitor',
    image: 'images/placeholders/silhouette_female.webp',
    imagePrompt: null,
    speaker: '',
    text: `**[Story Event]**

A knock at the door — unusual at this hour. You open it to find a cloaked figure standing in the shadows, face hidden beneath a deep hood.

"You're the new workshop keeper." The voice is soft, warm, oddly familiar in a way you can't place. "Your uncle helped me once. Changed my life." A pause. "I wanted to thank you for continuing his work."

A gloved hand emerges from the cloak, holding something that catches the light. A crystalline key, humming faintly with energy.

"Take this. When you're ready to understand the full truth of his work, come to Blackstone Tower." The figure presses the key into your palm. "There's a map — look behind the loose stone in the hearth. Third from the left, second row up."

You look down at the key, its surface warm against your skin. When you look up again, **the figure is already gone**, vanished into the night without a sound.

The key hums in your hand. The hearth suddenly feels very interesting.

**(You received a crystalline key. A map may be hidden in the workshop hearth.)**`,
    onEnter: function() {
        gameState.flags.story_mysterious_visitor = true;
        gameState.flags.has_tower_key = true;
        discoverKnowledge('blackstone_tower');
        saveState();
    },
    actions: [
        { label: 'Check the hearth', nextScene: 'story_mysterious_visitor_map' },
        { label: 'Process what just happened', nextScene: 'workshop_main' }
    ]
};

SCENES['story_mysterious_visitor_map'] = {
    id: 'story_mysterious_visitor_map',
    image: 'images/locations/workshop.webp',
    imagePrompt: null,
    speaker: '',
    text: `You kneel by the hearth, counting stones. Third from the left, second row up.

The stone wobbles at your touch. You pry it loose, revealing a small hollow behind it. Inside: a folded piece of parchment, yellowed with age.

You unfold it carefully. A map, hand-drawn, showing a path through the woods to Blackstone Tower. And a note in your uncle's handwriting:

"When you are ready to understand the full truth of my work, come to the Tower. But be warned — some knowledge cannot be unlearned. Some transformations are permanent."

**The tower awaits.**

**(Blackstone Tower is now accessible from town.)**`,
    actions: [
        { label: 'The mystery deepens', nextScene: 'workshop_main' }
    ]
};


// story_blackstone_revelation removed - key is now given by mysterious visitor on Day 14

// ==========================================
// KNOWLEDGE DISCOVERY SCENES
// ==========================================

SCENES['knowledge_discovery'] = {
    id: 'knowledge_discovery',
    image: 'images/locations/workshop.webp',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        // This scene is triggered dynamically when knowledge is discovered
        // The text is set by the calling function
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// Library research scene for knowledge discovery
// Register new scene pools
SceneManager.registerPool('lenna_chat', ['lenna_chat_1', 'lenna_chat_2']);
SceneManager.registerPool('mrs_thornwick_chat', ['mrs_thornwick_chat_1', 'mrs_thornwick_chat_2', 'mrs_thornwick_chat_3']);

// Location scene for Herbalist
SCENES['location_herbalist'] = {
    id: 'location_herbalist',
    image: 'images/locations/herbalist.webp',
    imagePrompt: null,
    text: '',
    speaker: '',
    onEnter: function() {
        // Check for pending NPC advance
        if (checkPendingAdvanceRedirect()) return 'redirect';

        gameState.currentLocation = 'herbalist';
        saveState();
        UI.updateHeader();

        const baseDesc = "The herbalist's shop smells of dried flowers and strange spices. Bundles of herbs hang from the ceiling, and mysterious bottles line the shelves.";

        // Try to show a vignette
        const vignette = tryShowVignette('herbalist');
        if (vignette) {
            this.image = vignette.image;
            this.text = vignette.text;
        } else {
            this.image = 'images/locations/herbalist.webp';
            this.text = getLocationDescription('herbalist', baseDesc);
        }

        const npcActions = buildLocationNpcActions('herbalist');
        this.actions = [
            ...npcActions,
            { label: 'Browse the shelves', nextScene: 'herbalist_shop' },
            { label: 'Loiter (skip time)', callback: () => { if (UI.advancePhase()) { SceneManager.playScene('workshop_main'); } else { SceneManager.playScene('location_herbalist'); } } },
            { label: 'Go Elsewhere', nextScene: 'town_navigation' },
            { label: 'Return to Workshop', nextScene: 'workshop_main' }
        ];
    },
    actions: []
};

// ==========================================
// DEVICE USAGE SCENES (Generic)
// ==========================================

const NPC_NAMES = {
    mira: 'Mira', vessa: 'Vessa', aldric: 'Aldric', barret: 'Barret',
    della: 'Della', fiona: 'Fiona', holt: 'Holt', lenna: 'Lenna',
    corwin: 'Corwin', mrs_thornwick: 'Mrs. Thornwick', player: 'yourself'
};

// Target selection - choose who to transform
SCENES['device_target_selection'] = {
    id: 'device_target_selection',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        // Check for new device unlocks to notify
        const newUnlocks = getNewlyUnlockedDevices();
        let notification = '';
        if (newUnlocks.length > 0) {
            const newDevices = newUnlocks.filter(u => u.isNewDevice);
            if (newDevices.length > 0) {
                notification = `\n\n**New devices available:** ${newDevices.map(u => u.deviceName).join(', ')}`;
            }
            markDevicesSeen();
        }

        const hasVisitor = gameState.currentTransformationTarget && gameState.currentTransformationTarget !== 'player';
        if (hasVisitor) {
            // Show NPC portrait when visitor is present
            this.image = getNpcImagePath(gameState.currentTransformationTarget);
            const visitorName = NPC_NAMES[gameState.currentTransformationTarget];
            this.text = `${visitorName} is here for transformation. Who would you like to work on?${notification}`;
        } else {
            this.image = 'images/locations/workshop.webp';
            this.text = `Your uncle's transformation devices stand ready. Who would you like to work on?${notification}`;
        }
    },
    actions: [
        {
            label: 'Work on visitor',
            nextScene: 'device_selection',
            condition: () => gameState.currentTransformationTarget && gameState.currentTransformationTarget !== 'player'
        },
        {
            // Self-transform available - unlocked and no prototype effect
            label: 'Work on myself',
            nextScene: 'device_selection_self',
            condition: () => canTransformPlayer()
        },
        {
            // Self-transform grayed out - unlocked but has prototype effect
            label: 'Work on myself (Unavailable)',
            nextScene: 'device_self_unavailable',
            condition: () => gameState.player.canSelfTransform && hasPrototypeEffect()
        },
        // Note: When self-transform is locked (not yet unlocked), the option is simply hidden
        { label: 'Back', nextScene: 'workshop_main' }
    ]
};

// Scene for when player can't transform themselves (prototype effect active)
SCENES['device_self_unavailable'] = {
    id: 'device_self_unavailable',
    image: 'images/locations/workshop.webp',
    imagePrompt: null,
    speaker: '',
    text: "You consider using the devices on yourself, but your body still feels unstable from the prototype mishap earlier. The lingering magical interference would make any transformation unpredictable and potentially dangerous.\n\nYou'll need to wait until the prototype effect wears off overnight before you can safely transform yourself.",
    actions: [
        { label: 'Back', nextScene: 'device_target_selection' }
    ]
};

// Self-transformation setup
SCENES['device_selection_self'] = {
    id: 'device_selection_self',
    image: 'images/locations/workshop.webp',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        gameState.currentTransformationTarget = 'player';
        saveState();
        SceneManager.playScene('device_selection');
        return 'redirect';
    },
    actions: []
};

// Device selection scene - shows unlocked devices with NEW indicator for recently unlocked
SCENES['device_selection'] = {
    id: 'device_selection',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        const targetId = gameState.currentTransformationTarget;
        if (!targetId) {
            SceneManager.playScene('workshop_main');
            return 'redirect';
        }

        // Show NPC portrait when transforming an NPC, player portrait for self
        if (targetId === 'player') {
            this.image = getPlayerImagePath();
        } else {
            this.image = getNpcImagePath(targetId);
        }

        const targetName = targetId === 'player' ? 'yourself' : NPC_NAMES[targetId];
        this.text = `Select a device to use on ${targetName}.`;
    },
    actions: [] // Built dynamically below
};

// Build device selection actions dynamically
function buildDeviceSelectionActions() {
    const actions = [];
    const targetId = gameState.currentTransformationTarget;

    // When an NPC is visiting for transformation, only show the device for their current desire stat
    let requiredStat = null;
    if (targetId && targetId !== 'player') {
        const desire = getNpcCurrentDesire(targetId);
        if (desire && desire.stat) {
            requiredStat = desire.stat;
        }
    }

    getDevicesByUnlockOrder().forEach(device => {
        if (isDeviceUnlocked(device.id)) {
            // Skip devices that don't match NPC's desired stat (if one is set)
            if (requiredStat && device.stat !== requiredStat) {
                return;
            }

            const tier = getDeviceTier(device.id);

            actions.push({
                label: `${device.name} (±${tier})`,
                nextScene: `device_use_${device.id}`,
                condition: () => isDeviceUnlocked(device.id)
            });
        }
    });

    actions.push({ label: 'Back', nextScene: 'device_target_selection' });
    return actions;
}

// Override device_selection actions on scene load
const originalDeviceSelectionOnEnter = SCENES['device_selection'].onEnter;
SCENES['device_selection'].onEnter = function() {
    const result = originalDeviceSelectionOnEnter.call(this);
    if (result === 'redirect') return result;

    // Dynamically set actions
    this.actions = buildDeviceSelectionActions();

    // If only one device available (besides Back button), skip selection and go directly to it
    const deviceActions = this.actions.filter(a => a.nextScene && a.nextScene.startsWith('device_use_'));
    if (deviceActions.length === 1) {
        SceneManager.playScene(deviceActions[0].nextScene);
        return 'redirect';
    }
};

// Generate device usage scenes for each device
Object.keys(DEVICES).forEach(deviceId => {
    const device = DEVICES[deviceId];

    // Device description/confirmation scene
    SCENES[`device_use_${deviceId}`] = {
        id: `device_use_${deviceId}`,
        image: '',
        imagePrompt: null,
        speaker: '',
        text: '',
        onEnter: function() {
            const targetId = gameState.currentTransformationTarget;
            const currentBody = getCurrentBody(targetId);
            const naturalBody = getNaturalBody(targetId);

            if (!currentBody || !naturalBody) {
                this.text = 'Error: No target selected.';
                this.image = 'images/locations/workshop.webp';
                return;
            }

            // Show NPC portrait when transforming an NPC, player portrait for self
            if (targetId === 'player') {
                this.image = getPlayerImagePath();
            } else {
                this.image = getNpcImagePath(targetId);
            }

            const currentValue = currentBody[device.stat];
            const naturalValue = naturalBody[device.stat];
            const statLabel = STAT_LABELS[device.stat]?.[currentValue] || currentValue;
            const naturalLabel = STAT_LABELS[device.stat]?.[naturalValue] || naturalValue;
            const targetName = targetId === 'player' ? 'Your' : NPC_NAMES[targetId] + "'s";

            // Format stat name for display (e.g., "muscle" -> "muscle", "genitaliaSize" -> "size")
            const statDisplayName = device.stat === 'genitaliaSize' ? 'size' : device.stat;
            const capStatName = statDisplayName.charAt(0).toUpperCase() + statDisplayName.slice(1);

            // Use HTML for a compact stat readout box
            const changed = currentValue !== naturalValue;
            const naturalNote = changed
                ? ` <span style="color: var(--text-secondary); font-size: 0.85em;">(natural: ${naturalLabel})</span>`
                : '';

            this.text = `**${device.name}**\n\n${device.description}`;
            // Append stat box as raw HTML after formatDialogueText runs
            this._statBoxHtml = `<div class="device-stat-box">${targetName} ${capStatName}: <strong>${statLabel}</strong>${naturalNote}</div>`;
        },
        actions: device.stat === 'genitalia' ? [
            // Genital Reshaper: single toggle button instead of More/Less
            {
                label: 'Transform',
                nextScene: `device_result_${deviceId}_toggle`,
                condition: function() {
                    const targetId = gameState.currentTransformationTarget;
                    const body = getCurrentBody(targetId);
                    if (!body) return false;

                    // For NPCs, check trust and desire
                    if (targetId && targetId !== 'player') {
                        const trust = gameState.npcs[targetId]?.trust || 0;
                        const thresholds = getNpcTrustThresholds(targetId);

                        // At sandbox trust, allow any transformation
                        if (trust >= thresholds.sandbox) return true;

                        // Below sandbox, only allow if NPC has a desire for this stat
                        const desire = getNpcCurrentDesire(targetId);
                        if (!desire || desire.stat !== device.stat) return false;

                        // Check if transformation moves toward their target
                        const currentValue = body[device.stat];
                        return currentValue !== desire.target;
                    }
                    return true;
                }
            },
            {
                label: 'Different device',
                nextScene: 'device_selection',
                condition: () => gameState.currentTransformationTarget === 'player'
            },
            { label: 'Done', nextScene: 'device_transformation_complete' }
        ] : [
            {
                label: 'More',
                nextScene: `device_result_${deviceId}_more`,
                condition: function() {
                    const targetId = gameState.currentTransformationTarget;
                    const body = getCurrentBody(targetId);
                    if (!body || body[device.stat] >= device.statMax) return false;

                    // For NPCs, check desire direction even at sandbox trust
                    if (targetId && targetId !== 'player') {
                        const desire = getNpcCurrentDesire(targetId);
                        if (desire && desire.stat === device.stat) {
                            // Only show More if they want to increase
                            return body[device.stat] < desire.target;
                        }

                        // No matching desire — require sandbox trust
                        const trust = gameState.npcs[targetId]?.trust || 0;
                        const thresholds = getNpcTrustThresholds(targetId);
                        return trust >= thresholds.sandbox;
                    }
                    return true;
                }
            },
            {
                label: 'Less',
                nextScene: `device_result_${deviceId}_less`,
                condition: function() {
                    const targetId = gameState.currentTransformationTarget;
                    const body = getCurrentBody(targetId);
                    if (!body || body[device.stat] <= 0) return false;

                    // For NPCs, check desire direction even at sandbox trust
                    if (targetId && targetId !== 'player') {
                        const desire = getNpcCurrentDesire(targetId);
                        if (desire && desire.stat === device.stat) {
                            // Only show Less if they want to decrease
                            return body[device.stat] > desire.target;
                        }

                        // No matching desire — require sandbox trust
                        const trust = gameState.npcs[targetId]?.trust || 0;
                        const thresholds = getNpcTrustThresholds(targetId);
                        return trust >= thresholds.sandbox;
                    }
                    return true;
                }
            },
            {
                label: 'Different device',
                nextScene: 'device_selection',
                condition: () => gameState.currentTransformationTarget === 'player'
            },
            { label: 'Done', nextScene: 'device_transformation_complete' }
        ]
    };

    // Result scenes for more/less
    ['more', 'less'].forEach(direction => {
        SCENES[`device_result_${deviceId}_${direction}`] = {
            id: `device_result_${deviceId}_${direction}`,
            image: '',
            imagePrompt: null,
            speaker: '',
            text: '',
            onEnter: function() {
                const targetId = gameState.currentTransformationTarget;
                const result = useDevice(deviceId, targetId, direction);
                let desireFulfilled = result.desireFulfilled || false;

                if (!result.success) {
                    this.text = `Something went wrong: ${result.message}`;
                    // Show portrait even on error
                    if (targetId === 'player') {
                        this.image = getPlayerImagePath();
                    } else {
                        this.image = getNpcImagePath(targetId);
                    }
                    return;
                }

                const targetName = targetId === 'player' ? 'Your' : NPC_NAMES[targetId] + "'s";
                const prevLabel = STAT_LABELS[result.stat]?.[result.previousValue] || result.previousValue;
                const newLabel = STAT_LABELS[result.stat]?.[result.newValue] || result.newValue;

                // Format stat name for display
                const statDisplayName = result.stat === 'genitaliaSize' ? 'size' : result.stat;

                // Build transformation image - NPCs use flirt images, player uses generic
                this.image = getTransformationImagePath(targetId, device.stat, result.newValue);

                // Check for goddess form first (all stats maxed)
                const goddessText = getGoddessFormText(targetId, result.stat);
                if (goddessText) {
                    this.text = goddessText;
                    this.speaker = NPC_NAMES[targetId] || '';
                } else {
                    // Try per-character flavor text
                    const flavorText = getTransformationFlavorText(targetId, result.stat, result.previousValue, result.newValue, result.isRepeatLevel, result.cascadingChanges);
                    if (flavorText) {
                        this.text = flavorText;
                        if (targetId !== 'player') {
                            this.speaker = NPC_NAMES[targetId] || '';
                        }
                    } else {
                        // Fallback to generic text
                        this.text = `The device hums smoothly as the transformation takes effect.\n\n${targetName} ${statDisplayName} shifts gradually.`;
                    }

                    // Append extreme arousal text if applicable
                    const arousalText = getExtremeArousalText(targetId);
                    if (arousalText) {
                        this.text += `\n\n${arousalText}`;
                    }
                }

                // Always append stat transition indicator
                this.text += `\n\n*${prevLabel} → ${newLabel}*`;

                // Check desire fulfillment for NPCs (skip progress/overshoot/wrong — flavor text covers reactions)
                if (targetId !== 'player') {
                    const desireComment = getTransformationComment(
                        targetId,
                        result.stat,
                        direction === 'more' ? 'increase' : 'decrease',
                        result.previousValue,
                        result.newValue
                    );
                    if (desireComment && desireComment.type === 'complete') {
                        this.speaker = NPC_NAMES[targetId] || '';
                        this.text += `\n\n**(Desire fulfilled!)**`;
                        desireFulfilled = true;
                    }
                }

                // Auto-exit when NPC desire is fulfilled — no need to keep adjusting
                if (desireFulfilled) {
                    this.actions = [
                        { label: 'Done', nextScene: 'device_transformation_complete' }
                    ];
                }

                UI.updatePlayerSidebar();
            },
            actions: [
                { label: 'Continue adjusting', nextScene: `device_use_${deviceId}`, condition: () => gameState.player.aether >= 2 },
                {
                    label: 'Different device',
                    nextScene: 'device_selection',
                    condition: () => gameState.currentTransformationTarget === 'player'
                },
                { label: 'Done', nextScene: 'device_transformation_complete' }
            ]
        };
    });

    // Add toggle scene for genital reshaper
    if (device.stat === 'genitalia') {
        SCENES[`device_result_${deviceId}_toggle`] = {
            id: `device_result_${deviceId}_toggle`,
            image: '',
            imagePrompt: null,
            speaker: '',
            text: '',
            onEnter: function() {
                const targetId = gameState.currentTransformationTarget;
                const body = getCurrentBody(targetId);
                if (!body) return;

                // Determine direction: toggle from current value
                const direction = body[device.stat] === 0 ? 'more' : 'less';
                const result = useDevice(deviceId, targetId, direction);
                let desireFulfilled = result.desireFulfilled || false;

                if (!result.success) {
                    this.text = `Something went wrong: ${result.message}`;
                    if (targetId === 'player') {
                        this.image = getPlayerImagePath();
                    } else {
                        this.image = getNpcImagePath(targetId);
                    }
                    return;
                }

                const targetName = targetId === 'player' ? 'Your' : NPC_NAMES[targetId] + "'s";
                const prevLabel = STAT_LABELS[result.stat]?.[result.previousValue] || result.previousValue;
                const newLabel = STAT_LABELS[result.stat]?.[result.newValue] || result.newValue;

                this.image = getTransformationImagePath(targetId, device.stat, result.newValue);

                // Check for goddess form first (all stats maxed)
                const goddessText = getGoddessFormText(targetId, result.stat);
                if (goddessText) {
                    this.text = goddessText;
                    this.speaker = NPC_NAMES[targetId] || '';
                } else {
                    // Try per-character flavor text
                    const flavorText = getTransformationFlavorText(targetId, result.stat, result.previousValue, result.newValue, result.isRepeatLevel, result.cascadingChanges);
                    if (flavorText) {
                        this.text = flavorText;
                        if (targetId !== 'player') {
                            this.speaker = NPC_NAMES[targetId] || '';
                        }
                    } else {
                        // Fallback to generic text
                        this.text = `The device hums deeply as the transformation takes effect.\n\n${targetName} anatomy shifts fundamentally.`;
                    }

                    // Append extreme arousal text if applicable
                    const arousalText = getExtremeArousalText(targetId);
                    if (arousalText) {
                        this.text += `\n\n${arousalText}`;
                    }
                }

                // Always append stat transition indicator
                this.text += `\n\n*${prevLabel} → ${newLabel}*`;

                // Check desire fulfillment for NPCs (skip progress/overshoot/wrong — flavor text covers reactions)
                if (targetId !== 'player') {
                    const desireComment = getTransformationComment(
                        targetId,
                        result.stat,
                        direction === 'more' ? 'increase' : 'decrease',
                        result.previousValue,
                        result.newValue
                    );
                    if (desireComment && desireComment.type === 'complete') {
                        this.speaker = NPC_NAMES[targetId] || '';
                        this.text += `\n\n**(Desire fulfilled!)**`;
                        desireFulfilled = true;
                    }
                }

                // Auto-exit when NPC desire is fulfilled — no need to keep adjusting
                if (desireFulfilled) {
                    this.actions = [
                        { label: 'Done', nextScene: 'device_transformation_complete' }
                    ];
                }

                UI.updatePlayerSidebar();
            },
            actions: [
                { label: 'Continue adjusting', nextScene: `device_use_${deviceId}`, condition: () => gameState.player.aether >= 2 },
                {
                    label: 'Different device',
                    nextScene: 'device_selection',
                    condition: () => gameState.currentTransformationTarget === 'player'
                },
                { label: 'Done', nextScene: 'device_transformation_complete' }
            ]
        };
    }
});

// Transformation complete scene
SCENES['device_transformation_complete'] = {
    id: 'device_transformation_complete',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        const targetId = gameState.currentTransformationTarget;

        if (targetId === 'player') {
            this.image = getPlayerImagePath();
            this.text = "You take a moment to adjust to the changes. It feels strange, but you're getting used to it.";

            // Track first player self-transform for NPC reaction
            if (!gameState.flags.player_first_self_transform) {
                gameState.flags.player_first_self_transform = true;
                gameState.flags.player_first_self_transform_day = gameState.day;
            }
        } else if (targetId) {
            this.image = getNpcImagePath(targetId);
            const targetName = NPC_NAMES[targetId];
            const npc = gameState.npcs[targetId];

            // Check if this transformation just completed an archetype
            if (npc && npc.archetypeJustAchieved && npc.hiddenArchetype) {
                const archetype = npc.hiddenArchetype;
                const isIntimate = archetype === 'goddess' || npc.trust >= getNpcTrustThresholds(targetId).intimate;
                const ctx = { hasPenis: npc.body.genitalia === 1 };
                const reactionText = getArchetypeWorkshopReaction(targetId, archetype, isIntimate, ctx);
                if (reactionText) {
                    this.speaker = targetName;
                    this.text = reactionText;
                } else {
                    this.text = `${targetName} takes a moment to adjust to the changes.\n\n{${targetId}}"Thank you for your help. I'll need some time to get used to this."`;
                }
            } else {
                this.text = `${targetName} takes a moment to adjust to the changes.\n\n{${targetId}}"Thank you for your help. I'll need some time to get used to this."`;
            }
        } else {
            this.image = 'images/locations/workshop.webp';
            this.text = "The workshop is quiet once more.";
        }

        // Clear transformation target
        gameState.currentTransformationTarget = null;
        saveState();

        // Check for story events (e.g. self-transform unlock) immediately after transformation
        // This prevents the player from doing multiple transforms before seeing the unlock event
        const storyEvent = checkStoryEvents();
        if (storyEvent) {
            this.actions = [{ label: 'Continue', nextScene: storyEvent.scene }];
        } else {
            this.actions = [{ label: 'Continue', nextScene: 'workshop_main' }];
        }
    },
    actions: [
        {
            label: 'Continue',
            nextScene: 'workshop_main'
        }
    ]
};

// Location vignette data - NPC activity images shown randomly at locations
const VIGNETTE_DATA = {
    fiona: { location: 'square', chance: 0.5 },
    mira: { location: 'square', chance: 0.5 },
    mrs_thornwick: { location: 'square', chance: 0.5 },
    corwin: { location: 'square', chance: 0.5 },
    holt: { location: 'guardpost', chance: 0.5 },
    barret: { location: 'tavern', chance: 0.5 },
    aldric: { location: 'blacksmith', chance: 0.5 },
    vessa: { location: 'herbalist', chance: 0.5 },
    lenna: { location: 'library', chance: 0.5 },
    della: { location: 'bakery', chance: 0.5 }
};

// ========================================
// VIGNETTE TEXT SYSTEM
// Body-aware text that matches vignette images
// Features mentioned: c>=4 (tits), m>=3 (muscle), b>=5 (hips),
// gs>=2 + skirt (genitals). Extreme (c5+m5+b5) = goddess passage.
// ========================================

const VIGNETTE_SKIRT_NPCS = new Set(['vessa', 'barret', 'della', 'lenna', 'mrs_thornwick']);

function getVignetteGenitalDesc(g, gs) {
    if (g === 0) return gs >= 3 ? 'puffy pussy' : 'pussy';
    return gs >= 3 ? 'huge cock' : 'cock';
}

function buildVignetteBodyLines(config, g, gs, c, m, b, hasSkirt, showingGenitals, showingCameltoe, showingBulge) {
    const lines = [];
    const genDesc = showingGenitals ? getVignetteGenitalDesc(g, gs) : '';

    if (c >= 5) lines.push(config.chest5 || 'Her gigantic tits strain against her top, a peek of underboob on full display.');
    else if (c >= 4) lines.push(config.chest4 || 'Her huge tits push against her top, deep cleavage on display.');

    if (m >= 5) lines.push(config.muscle5 || 'Her abs are carved, her arms defined.');
    else if (m >= 3) lines.push(config.muscle3 || 'Her abs are tight, her arms toned.');

    if (b >= 5 && showingGenitals) {
        const dflt = `Her skirt rides up around her wide hips, her ${genDesc} bare between her thick thighs.`;
        lines.push(config.butt5gen ? config.butt5gen(genDesc) : dflt);
    } else if (b >= 5) {
        lines.push(config.butt5 || 'Her skirt stretches tight across her wide hips.');
    } else if (showingBulge) {
        lines.push(gs >= 3
            ? (config.bulge3 || 'The thick bulge between her thighs strains against her clothes, the outline impossible to miss.')
            : (config.bulge2 || 'There\'s a visible bulge between her thighs where her clothes pull tight.'));
    } else if (showingGenitals) {
        const dflt = `Her skirt rides high, her ${genDesc} on display.`;
        lines.push(config.genOnly ? config.genOnly(genDesc) : dflt);
    } else if (showingCameltoe) {
        lines.push(config.cameltoe || 'Her pants are painted on, the outline of her pussy unmistakable between her thighs.');
    }

    return lines;
}

const VIGNETTE_TEXT_CONFIG = {
    mira: {
        cameltoe: 'Her pants are painted on, the seam pressed tight between her thighs. The outline of her pussy unmistakable.',
        bulge2: 'Her pants do nothing to hide the bulge between her thighs. She shifts her weight, making no effort to conceal it.',
        bulge3: 'Her pants stretch tight around the thick bulge between her thighs, the outline plainly visible. She stands like she wants you to notice.',
        getOpening(g, gs, c, m, b, hasSkirt, showGen) {
            return hasSkirt
                ? 'Mira leans against the wall near the fountain, legs apart.'
                : 'Mira leans against the wall near the fountain, catching her breath.';
        },
        closing_base: 'She spots you and grins. {mira}"Taking a break, Boss. Even I need five minutes."',
        closing_changed: 'She catches you looking and grins. {mira}"Life is good, Boss."',
        closing_showing: 'She catches your eye and grins. {mira}"Like what you see, Boss?" Not an ounce of shame.',
        goddess_lucid: {
            g0: `You almost walk into her. She is standing in the middle of the square, naked, and you didn't see her face until you were already in her shadow. From this close and this far below, her massive breasts fill your entire field of vision, heavy and full on the sculpted muscle beneath, blocking everything from her collarbones down. You can see her eyes above them, green and warm, looking down at you with quiet amusement.\n\n{mira}"Hey, boss." Her voice is easy. Unhurried. No exclamation point.\n\nShe doesn't step back. She doesn't need to. The scale of her is startling up close, the sheer mass of muscle and curve towering above you, and she wears it the way she wears the nudity, like something she stopped thinking about. Why would she cover a body she loves this much?\n\n**She reaches down and taps the top of your head with one finger, gentle, fond. The finger could wrap around your whole wrist.**\n\n{mira}"You're staring up at me like I'm a building." A low laugh, warm. {mira}"I kind of am, huh?"\n\n**She stays where she is, enormous and bare and content, the sun warm on her skin, and the quiet radiating off her is the most startling thing about her. Mira, still. Happy. Not going anywhere.**`,
            g1: `Mira is leaning against the wall near the fountain, naked, one foot propped behind her. Her cock stands erect against her stomach, thick and unhurried, and she hasn't bothered to do anything about it. She spots you from across the square and her face warms.\n\n{mira}"Boss." She lifts a hand. No wave, no bounce, just an open palm.\n\nShe is enormous. Even from here you can see the sculpted muscle, the massive breasts resting easy on her chest, the way her body fills the wall behind her like architecture. She looks comfortable. At ease. The erection is incidental, something her body is doing that she has no particular opinion about.\n\n{mira}"Nice morning, huh?" She tilts her head back against the stone. Her green eyes are clear, calm. {mira}"I used to run past this spot every day. Never stopped."\n\n**She is stopped now. Naked and hard and unhurried and taking up the whole wall, and the fondness in her voice when she says "boss" has the weight of something she means completely.**\n\nWhy would she cover a body she loves this much? She wouldn't. She doesn't. She is just here, the biggest person in the square, content.`,
        },
        goddess_overwhelmed: {
            g0: `Mira is standing in the middle of the square, naked, sweating, and her thighs are slick. She spots you and her whole body shifts toward you, hips rolling, and the grin on her face is wide and flushed and not quite steady.\n\n{mira}"Boss." Her voice is breathless. Her hands are fidgeting at her sides, fingers curling and uncurling, touching her own thighs, wiping the sweat and finding more underneath. {mira}"I was just... standing here. Minding my own business. And then everything got really, really warm."\n\nHer pussy is dripping openly, slick trails running down both powerful thighs, and she makes no move to hide it. Her massive breasts heave with each breath, her sculpted body flushed and trembling with something she is not even trying to contain.\n\n{mira}"I can feel everything, boss. The air, the sun, my own skin, all of it just..." She bites her lower lip. Her hips shift again. {mira}"God. I'm so wet I can hear it when I move."\n\n**She takes a step toward you and the look in her green eyes is pure, open hunger.** {mira}"So, hey, quick question. Are you busy right now? Because I am having some very specific thoughts about you and I don't think they're going to stop."`,
            g1: `Mira is leaned against the wall near the fountain, naked, and her cock is hard and leaking a steady thread of precum down the shaft. Her eyes are half-closed, her head tilted back against the stone, and she is looking at nothing in particular with the glazed, distant expression of someone whose body is doing all the thinking.\n\nHer lips are parted. Her massive breasts rise and fall with slow, heavy breaths. One hand rests against the wall, fingers spread, bracing. The other hangs at her side, twitching, wanting to reach for herself and not quite giving in. Her sculpted body gleams with sweat.\n\nShe blinks. Notices you. The grin that spreads across her flushed face is slow and warm and completely filthy.\n\n{mira}"Hey... boss." The word comes out thick. She shifts against the wall and her cock throbs, another bead of precum rolling down. {mira}"I've been standing here for... I don't know. A while. Just feeling this."\n\nShe laughs, soft, a little ragged. {mira}"My cock won't stop. It just keeps throbbing and leaking and I keep thinking I'll get used to it and then it throbs again and I lose my whole train of thought."\n\n**Her green eyes focus on you, hazy and fond and wanting.** {mira}"Come here. Please. I need somebody to talk to before I do something embarrassing in the middle of the square."`,
        },
    },

    fiona: {
        cameltoe: 'Her pants cling tight between her thighs, the outline of her pussy plain as day. She tugs at the hem of her shirt, but it doesn\'t reach.',
        bulge2: 'There\'s a visible bulge between her thighs where her pants pull tight. She sits up a little straighter, a small smile on her face.',
        bulge3: 'The bulge between her thighs is impossible to ignore, her pants straining around it. She doesn\'t try to hide it. The small smile says she chose this.',
        getOpening(g, gs, c, m, b, hasSkirt, showGen) {
            return hasSkirt
                ? 'Fiona sits on the edge of the fountain, knees apart, hands gripping the stone.'
                : 'Fiona sits on the edge of the fountain, watching the crowd.';
        },
        closing_base: 'She spots you and her eyes widen. {fiona}"Oh... hey." A small, careful smile.',
        closing_changed: 'She spots you and blushes, tugging at her clothes. {fiona}"Don\'t... don\'t stare. Please."',
        closing_showing: 'Her face is red. She knows what you can see. She could close her legs. She doesn\'t. {fiona}"I know, okay?" she whispers. {fiona}"...I like it."',
        goddess_lucid: {
            g0: `Fiona is leaning against the fountain with one hand on her hip, naked, and she is looking down at you. That is the part that stops you. Not the body, though the body is immense, tanned muscle and vast curves filling the square like she was carved into it. Not the nudity, though she is entirely bare and unbothered by it. What stops you is the angle. Fiona is looking *down*. At you.\n\nThe girl who spent her life being the smallest person in every room is the tallest thing in the square. Her massive breasts rest full and heavy on the sculpted muscle of her chest. Her enormous ass rounds out behind her against the fountain's edge. Her powerful thighs are planted wide and easy. And she is looking down at you with hazel eyes that do not dart away.\n\nShe does not stammer. She does not hide behind her hair. She does not fold her shoulders inward or make herself small. The girl who used to hide is done hiding, and the nudity is part of it, the simplest proof that there is nothing left she needs to cover.\n\n{fiona}"Hey."\n\nOne word. Warm. Steady. Her hand stays on her hip. Her eyes stay on yours.\n\n**She does not say anything else. She does not need to. The biggest thing in the square is looking down at you with quiet, fierce contentment, and the silence she leaves is the kind that used to be empty and is now full.**`,
            g1: `Fiona is resting against a stone wall, naked, facing you. She is smiling. It is the easiest, most unhurried smile you have ever seen on her face, and it changes everything about the square.\n\nHer massive breasts sit full and heavy on her powerful chest. Her enormous ass presses against the wall behind her. Her sculpted body is relaxed, weight settled, every carved muscle at rest. Her cock hangs thick and soft between her powerful thighs. She is entirely bare and entirely at ease with it, the girl who used to hide done hiding, standing in the open because there is nothing left to cover and no reason to want to.\n\n{fiona}"Hey." A small nod. Her hazel eyes are warm and clear and they do not look away.\n\nShe shifts against the wall, comfortable, unhurried. The smile stays. It is not the nervous flicker you are used to. It is not the careful, half-turned thing she used to offer before darting her gaze to the ground. It is calm in a way Fiona has never been calm, and it sits on her face like it belongs there.\n\n**She watches you with her back against the stone and her arms relaxed and her smile steady, and the quiet between you is not awkward. It is not empty. It is the quiet of someone who finally has nothing to prove and nowhere to run and no reason to speak unless she wants to.**`,
        },
        goddess_overwhelmed: {
            g0: `Fiona is standing by the fountain, naked, and she is cumming.\n\nHer fists are clenched at her sides, arms tight, slightly outstretched, her whole powerful frame locked rigid. Her mouth is open. Her eyebrows are raised in the middle, a look caught between shock and something past shock. Her massive breasts heave with each ragged breath. Between her powerful thighs, her pussy is clenching, and fluid is spraying from her in a visible, wet arc that spatters the cobblestones.\n\nThis is happening in the square. People can see.\n\n{fiona}"I c-can't..." Her voice cracks. Small. Strangled. The stammer is back but it is not the old stammer. The old stammer was fear. This one is her body outrunning her mouth. Her fists clench tighter and her hips jerk forward and another spray hits the stones and the rest of the sentence tears free from somewhere she did not know existed.\n\n{fiona}"My fat pussy won't stop CLENCHING, it keeps... oh fuck, oh fuck, I'm squirting in the middle of the SQUARE and I can't..."\n\nShe clamps her mouth shut. Hazel eyes huge. Mortified. Thrilled. Another wave hits and her fists shake and her thighs tremble and the crudeness erupts again, louder, more specific.\n\n{fiona}"Everyone can SEE, I'm gushing all over the fucking cobblestones and my cunt won't stop SQUEEZING..."\n\n**She is the biggest thing in the square and she cannot control any of it. Her fists are white-knuckled and her face is flushed and she is cumming in public with profanity pouring out of her that would make a sailor blink, and she is horrified and she is not stopping and some part of her is not sorry at all.**`,
            g1: `Fiona is standing by the fountain, naked, and she has lost the ability to form a sentence.\n\nHer mouth is open. Her eyes are rolled up, showing white, lashes fluttering. Her massive breasts heave with each shuddering breath. Her enormous body is locked in place, every carved muscle rigid, and between her powerful thighs her cock is throbbing, the swollen head dripping a steady, thick stream of precum that pools on the cobblestones beneath her.\n\nShe is not here. Wherever Fiona is right now, it is somewhere past language.\n\nA sound escapes her, low and broken, and her hips jerk forward and her cock pulses and a thicker rope spills out and the sound becomes words, erupting from somewhere deep.\n\n{fiona}"It won't... my cock keeps... oh fuck, it's THROBBING and I can feel every heartbeat in it and it won't stop dripping and I'm just standing here and I can't..."\n\nHer eyes roll back further. Her fists clench at her sides. Another pulse. Another rope. The words get cruder.\n\n{fiona}"My fat dripping cock is leaking all over the fucking square and I can't even THINK..."\n\n**Her eyes are gone and her mouth is open and she is the biggest, most powerful thing in the square and she cannot manage a single coherent thought. The crude, specific profanity keeps erupting in bursts between the moans, shocking no one more than her, and the girl who used to be invisible is putting on the most visible display of her life.**`,
        },
    },

    mrs_thornwick: {
        bulge2: 'The fabric of her dress pulls taut across the front, a visible shape pressing against it from beneath. She adjusts her posture as though that might help. It doesn\'t.',
        bulge3: 'Her dress tents visibly at the front, the thick outline pressing against the fabric impossible to ignore. She carries herself as though nothing is amiss. The merchants stare anyway.',
        getOpening(g, gs, c, m, b, hasSkirt, showGen) {
            return 'Mrs. Thornwick stands near a market stall, hands clasped behind her back, posture immaculate.';
        },
        closing_base: 'The merchant watches nervously as she examines his wares without a word.',
        closing_changed: 'She catches your gaze and holds it. A single raised eyebrow. {mrs_thornwick}"Something to say?"',
        closing_showing: 'She notices you staring and her composure flickers. Just for a moment. {mrs_thornwick}"I am well aware," she says quietly. Her chin lifts. {mrs_thornwick}"And I feel magnificent."',
        goddess_lucid: {
            g0: `You spot Mrs. Thornwick across the square, standing in profile near the market stalls. She is naked. The ponytail is precise. The posture is immaculate. And the body holding that posture is enormous, carved, impossible, her massive breasts and sculpted waist and the vast curve of her ass all visible in sharp relief against the morning light.\n\nShe has one arm extended, flexing it straight, and she is studying the muscle with the calm focus of a woman reviewing property lines. The townspeople give her a wide berth. She does not notice or does not care.\n\nShe spots you and smiles. Not the practiced smile. Something warmer and less careful.\n\n{mrs_thornwick}"Good morning." Her voice carries across the distance with effortless authority. She lowers her arm. {mrs_thornwick}"I trust you are well."\n\n**She stands there, nude and magnificent in profile, and the greeting lands with the weight of a woman who decided to stop wearing clothes and expects the town to adjust. The town is adjusting.**`,
            g1: `You spot Mrs. Thornwick across the square, standing in profile near the fountain. Her hair is down, blonde touched with grey, falling past her shoulders in a way you have never seen before. She is naked, leaning slightly forward, and her hands are pressed against the sides of her massive breasts, pushing them together with an ease that is somehow both deliberate and casual. Her cock stands erect between her powerful thighs, and she has not bothered to acknowledge it.\n\nShe looks different with her hair down. Softer. The formal veneer is still there in the posture, the set of her shoulders, but the loosened hair makes it feel like a choice rather than a uniform.\n\nShe spots you and smiles, slow and warm, still holding her breasts.\n\n{mrs_thornwick}"I am experimenting with presentation." Her blue eyes are amused. {mrs_thornwick}"You may form an opinion. I may or may not value it."\n\n**She is the most imposing figure in the square, nude and erect and smiling with her hair down for the first time in memory, and the playfulness in her voice is new, and it suits her better than the formality ever did.**`,
        },
        goddess_overwhelmed: {
            g0: `You spot Mrs. Thornwick across the square, standing in profile, arm extended in the same flexing pose you have seen before. But her mouth is open. Her chest rises and falls with deep, unsteady breaths, and between her powerful thighs, her pussy is visibly swollen, slick arousal catching the light as it runs down the inside of one leg.\n\nShe is still holding the pose. Still flexing. The muscle in her arm is perfect and she is looking at it, but her blue eyes are glassy and unfocused and her hips shift with a slow, involuntary grind.\n\nShe notices you. The mouth stays open. The composure holds in her voice, if nowhere else.\n\n{mrs_thornwick}"I appear to be..." A breath. {mrs_thornwick}"Profoundly aroused. In public. The sensation between my thighs is making it difficult to lower my arm, because every movement shifts my weight and every shift presses my lips together and every press is..." She trails off. Her hips grind again. {mrs_thornwick}"Exceptional."\n\nA pause. Her blue eyes find yours with clinical precision.\n\n{mrs_thornwick}"If you have no pressing engagements, I would very much like you to come here and put your hands on me. I will tell you exactly where."\n\n**She has not lowered her arm. She is flexing, dripping, and issuing invitations with perfect grammar across the town square, and the merchants have stopped pretending not to stare.**`,
            g1: `You spot Mrs. Thornwick across the square, standing in profile, her arms held slightly away from her body. Her mouth is open. Her cock is erect, thick and flushed, a steady thread of precum dripping from the swollen head. Her ponytail is still perfect. Everything else is coming apart.\n\nHer fingers twitch at her sides. She is not touching herself. The restraint is costing her something visible.\n\n{mrs_thornwick}"I am exercising considerable discipline right now." Her voice is level, measured, every word chosen. {mrs_thornwick}"My cock has been this hard for the better part of an hour. It throbs when I breathe. It throbs when I shift my weight. It throbs, apparently, when I speak." A pause. It throbs. {mrs_thornwick}"There. You see the problem."\n\nHer blue eyes find yours. The composure in her voice does not match the flush spreading down her chest or the steady drip between her thighs.\n\n{mrs_thornwick}"I would like to propose an arrangement. You take me somewhere with a door that closes, and I will describe to you, in precise detail, every single thing I want done to me. My grammar will be flawless. My requests will not be."\n\n**She stands there, arms out, erect and leaking and perfectly articulate, and the offer hangs in the morning air like a verdict she has already rendered.**`,
        },
    },

    corwin: {
        male_text: 'Corwin leans against the wall near the fountain, flipping a gold coin between her fingers. She catches your eye and tilts her head. {corwin}"Fancy running into you here." The coin vanishes into her palm. {corwin}"Again."',
        cameltoe: 'Her pants fit like they were tailored to show everything, the fabric pulled tight between her thighs. The outline of her pussy is unmistakable. Sales have never been better.',
        bulge2: 'There\'s a noticeable bulge where her pants pull tight between her thighs. Somehow it looks deliberate, like everything else about her.',
        bulge3: 'The thick bulge between her thighs strains against her pants, the outline unmistakable. She\'s positioned herself so the light catches it. Of course she has.',
        getOpening(g, gs, c, m, b, hasSkirt, showGen) {
            return hasSkirt
                ? 'Corwin leans against the wall near the fountain, hip cocked, legs apart.'
                : 'Corwin leans against the wall near the fountain, hip cocked.';
        },
        closing_base: 'She catches your eye and tosses her hair. {corwin}"Fancy running into you here. Again."',
        closing_changed: 'She catches you staring and preens. {corwin}"I know. Incredible, right?" She runs a hand through her hair. {corwin}"Tell me I look incredible."',
        closing_showing: 'She catches you staring and strikes a pose. {corwin}"Go ahead. Look." She bites her lip. {corwin}"Tell me what you see."',
        goddess_lucid: {
            g0: `Corwin is standing by the fountain, naked, cupping both of her massive breasts and lifting them slightly, testing the weight. She is smiling at you. The smile is warm and calculated and entirely genuine, all three at once, because Corwin has never seen a contradiction between warmth and calculation.\n\n{corwin}"Do you have any idea what these are worth?" She squeezes gently, watching the flesh overflow her fingers, and her dark brown eyes track the motion with the focused patience of a woman appraising inventory she intends to keep forever. {corwin}"I've moved a lot of product in my time. Nothing has ever sold itself like this."\n\nShe releases one breast and gestures down at herself. All of herself. The sculpted muscle, the impossible curves, the bare olive skin gleaming in the light. The best advertisement she has ever worn, and she knows it.\n\n{corwin}"Clothes would be a downgrade at this point. You don't wrap a masterpiece in burlap." She cups her breast again, lifts it, lets it settle. Pleased. {corwin}"Besides, I've closed three deals this morning and I wasn't wearing a stitch for any of them."\n\n**She catches you staring and her smile widens. Not the old charming smirk. Something realer, backed by the kind of confidence that doesn't need to perform.** {corwin}"Go on. Tell me I'm gorgeous. I know the answer, but I like hearing you say it."`,
            g1: `Corwin is standing by the fountain, naked, cupping both of her massive breasts and lifting them, appraising the weight with the focused attention of a woman who knows exactly what she's holding. Her cock stands thick and hard between her powerful thighs, and she has not bothered to acknowledge it because Corwin does not apologize for assets.\n\nShe spots you and smiles. {corwin}"Perfect timing. I was just taking inventory." She squeezes her breasts, watching the flesh spill between her fingers, and glances down at her erection with the same appraising warmth. {corwin}"Everything's appreciating nicely. All of it."\n\nShe releases one breast and runs her hand down her sculpted stomach, past her abs, stopping just above the base of her cock. A gesture, not a touch. Presentation. {corwin}"You don't hide your best merchandise. That's the first rule of trade." Her dark brown eyes find yours, warm and calculating. {corwin}"The nudity isn't a statement. It's a strategy. And judging by the way you're looking at me, the returns are already coming in."\n\n**She cups her breast again, lifts it, lets it settle, and the satisfaction on her face is pure and genuine and backed by the kind of body that closes deals from across a room without saying a word.** {corwin}"Tell me I'm the best thing you've ever made. I already know, but I want to hear you say it."`,
        },
        goddess_overwhelmed: {
            g0: `Corwin is by the fountain, squeezing her own breasts, and the look on her face is not appraisal anymore.\n\nHer mouth is open. Her dark brown eyes are half-lidded, unfocused, and her fingers are sinking into the massive, heavy flesh with a rhythm that has nothing to do with inventory. Her thighs are slick, arousal running in visible trails down her powerful legs, and her hips shift with each squeeze, slow, involuntary.\n\n{corwin}"I was... I had a meeting." Her voice is thick, distracted. She squeezes again and her breath catches. {corwin}"Three potential buyers for the... the..." Her pussy throbs and more wetness spills down her thighs and the sentence dissolves.\n\nShe tries again. {corwin}"The market is... if I could just..." Another squeeze. Her nipples are hard and flushed and her fingers drag across one and her whole body shudders. The transactional language is crumbling. What's left underneath it is warm and wet and honest.\n\n**{corwin}"I can't stop touching them."** The words come out small, startled. She squeezes her breasts again, helpless, and her hips grind forward against nothing. {corwin}"I keep trying to think about profit margins and my hands just... and then I'm dripping again and I can't..."\n\n**She looks at you, flushed and aching, the smooth operator completely derailed by her own body.** {corwin}"Don't just stand there. Come here. Please. I'll make it worth your while, I just need... I need..."`,
            g1: `Corwin is standing by the fountain, facing you, and she does not know what to do with her hands.\n\nHer cock is hard, dripping, the swollen head slick with precum that runs down the shaft in a slow thread. Her mouth is open. Her eyebrows are raised, her dark brown eyes looking slightly to the side, and her arms are out at her sides, fingers fidgeting, opening and closing on nothing. The smooth operator is gone. What's standing in front of you is a woman whose body has outpaced her brain and the gap is visible.\n\n{corwin}"I had... a plan." Her voice wavers. Her fingers twitch at her sides. Her cock throbs and another bead of precum rolls down and she flinches at the sensation. {corwin}"A very good plan. Market analysis, supply chains, the whole... I was going to..." Her cock pulses again and the sentence dies and her hands flutter uselessly.\n\n**She is the most articulate person you know and she cannot finish a thought.** Her hips shift and the motion makes her cock bounce against her stomach and she makes a sound that is very far from charming.\n\n{corwin}"I don't know what to do with my hands." She says it plainly, almost confused, staring down at her own fidgeting fingers. {corwin}"I always know what to do with my hands. I gesture, I close, I shake on it. And right now they just..." She opens them, closes them. Her cock drips onto the cobblestones. {corwin}"I can't think. I keep trying to think and all I can feel is..."\n\n**She looks at you, flushed and honest and completely lost, the calculation wiped clean off her face.** {corwin}"Help. Please. I don't... I've never not known what to do and I don't know what to do."`,
        },
    },

    holt: {
        male_text: 'Holt sits at the guard post desk, drawing a whetstone along her blade with slow, deliberate strokes. She doesn\'t look up. The steel catches the light with each pass.',
        cameltoe: 'Her uniform trousers are a size too small, pulled tight between her thighs... the outline of her pussy impossible to miss. Regulation doesn\'t require pants this tight.',
        bulge2: 'She leans back in her chair, uniform trousers pulled tight between her thighs, a visible bulge straining the fabric. She doesn\'t adjust her posture.',
        bulge3: 'She leans back in her chair, the bulge between her thighs impossible to miss, her uniform trousers stretched to their limit. She hasn\'t requested a larger size.',
        chest5: 'Her gigantic tits rest on the desk, her top pulled tight across them.',
        chest4: 'Her huge tits strain against her top as she leans forward at the desk.',
        getOpening(g, gs, c, m, b, hasSkirt, showGen) {
            return (hasSkirt || b >= 5)
                ? 'Holt sits at the guard post desk, knees apart, sword resting against the wall.'
                : 'Holt sits at the guard post desk, sword across her lap.';
        },
        closing_base: 'She glances up briefly. {holt}"I\'m on duty." Back to the blade.',
        closing_changed: 'She glances down at herself, then back at the blade. {holt}"This body is... distracting." A long pause. {holt}"I didn\'t say I minded."',
        closing_showing: 'She notices your gaze and her jaw tightens. She doesn\'t close her legs. {holt}"I know what I\'ve chosen." A long pause. {holt}"...don\'t stop."',
        goddess_lucid: {
            g0: `Holt is standing outside the guardpost, naked, her back to the wall, scanning the street. Her hands are loose fists at her sides. Not clenched. Ready. The posture of a soldier who is on patrol and always will be, regardless of what she is or isn't wearing.\n\nHer massive breasts sit high on her sculpted chest, held weightless by the dense muscle beneath. Her enormous ass rounds out behind her, heavy and powerful. Every part of her is still, controlled, enormous, and at ease. Uniform regulations, it turns out, do not cover this body. She has not filed a complaint.\n\nShe spots you. The confident smile that crosses her scarred face is small and warm and entirely genuine.\n\n{holt}"Citizen." A nod. Formal. Fond. Her steel grey eyes hold yours for a moment longer than duty requires.\n\n{holt}"The town is secure." A pause. The smile deepens, just barely. {holt}"I'm secure."\n\n**She turns back to the street, fists at her sides, and resumes her watch. The biggest thing on the block, bare and powerful and utterly at peace, guarding a town that she finally feels right protecting. She is on duty. She is off duty. It doesn't matter. This is who she is.**`,
            g1: `Holt is in the street outside the guardpost, naked, on patrol. Her fists hang at her sides, loose and ready. Her cock stands erect against her stomach, thick and unhurried, and she has not broken stride for it. She is walking the same route she has walked for nineteen years, and the nudity and the erection are simply what her body is doing today.\n\nHer massive breasts shift with each measured step, heavy and full on the sculpted muscle beneath. Her enormous ass flexes and relaxes with the disciplined cadence of a soldier who knows how to carry weight. Her scarred skin catches the light. Everything about her is controlled, powerful, and calm.\n\nShe spots you and stops. The confident smile is immediate, warm.\n\n{holt}"Citizen." She inclines her head. Her steel grey eyes are clear and bright. {holt}"All quiet this morning."\n\nShe glances down at herself. The erection. The massive body. The bare skin. She looks back at you with an expression that is as close to humor as Holt gets.\n\n{holt}"Uniform regs don't cover this. I checked." A pause. {holt}"Twice."\n\n**She resumes her patrol, fists at her sides, cock hard, smile lingering. A soldier who has finally found the body she was meant to wear, walking her beat because the town still needs guarding and she still needs to guard it. The smile stays.**`,
        },
        goddess_overwhelmed: {
            g0: `Holt is standing in the street outside the guardpost, naked, fists clenched at her sides. She is on duty. She is standing her post. Her thighs are slick and her pussy is dripping openly onto the cobblestones and she has not moved.\n\nHer mouth is open. Her jaw, the one she locks down when the discipline is tested, is loose. Her steel grey eyes are bright and unfocused and her breathing is coming in slow, deliberate pulls that are not quite steady enough to qualify as controlled.\n\nShe sees you. Her fists tighten.\n\n{holt}"I'm on post." Her voice is low, steady, almost. There is a tremor deep in it, the kind you feel before you hear. {holt}"The town is secure." A breath. Another drip runs down her inner thigh. Her fists shake. {holt}"I am... managing."\n\nShe is not managing. The arousal is pouring off her in waves, her powerful body trembling with the effort of holding still while everything below her waist begs her to move. Her massive breasts heave with each breath. Her fists are the only thing keeping her hands where they are.\n\n**{holt}"If you're not busy." The words come out quiet, honest, costing her something. {holt}"After my shift. I would like... I would very much like your company."**\n\nShe holds your gaze for one more second, then turns back to the street. Fists at her sides. Dripping. Still on duty. Still standing her post.`,
            g1: `Holt is standing in the street outside the guardpost, naked, fists clenched at her sides. She is on duty. Her cock is erect and dripping, a steady thread of precum hanging from the tip, and she has not moved from her post.\n\nHer mouth is open. Her breathing is deliberate, measured, the kind of breathing a soldier uses to hold position under fire. Her steel grey eyes find you and there is something raw behind the discipline, something wanting.\n\nHer fists tighten.\n\n{holt}"Citizen." The word shakes, barely. She swallows. {holt}"The town is secure." Her cock throbs and a bead of precum drops to the cobblestones. Her jaw clenches. {holt}"I am at my post."\n\nShe is. She is standing in the street with her cock hard and leaking and her whole body trembling with restraint, and she is at her post because the post needs holding and she has never once abandoned it. Her fists shake at her sides. Her massive breasts heave.\n\n**{holt}"When my shift ends." Quiet. Honest. Military directness applied to something that has nothing to do with duty. {holt}"I need you. If you're willing."**\n\nShe turns back to the street. Fists clenched. Cock dripping. Still on post. Still guarding. Enduring it the way she endures everything, except that the thing she is enduring is want, and it is harder than any watch she has ever stood.`,
        },
    },

    barret: {
        chest5: 'Her gigantic tits spill across the counter, her top stretched so thin it might as well not be there.',
        chest4: 'Her huge tits press against the counter, deep cleavage overflowing her top.',
        getOpening(g, gs, c, m, b, hasSkirt, showGen) {
            return 'Barret leans across the bar, chin propped on one hand.';
        },
        closing_base: 'She spots you and grins. {barret}"Well, well. Look who wandered in." She reaches for a glass. {barret}"The usual?"',
        closing_changed: 'She spots you and her grin widens. {barret}"Enjoying the view, honey?" She leans forward. {barret}"Drinks are good too."',
        closing_showing: 'She winks. {barret}"Honey, I stopped worrying about modesty two sizes ago." She pours you a drink without looking away. {barret}"Now sit down."',
        goddess_lucid: {
            g0: `Barret is sitting on a stool at the bar, naked, legs apart, one elbow resting on the counter. She is not performing. That is the first thing you notice. The woman who has never poured a drink without a wink and a wiggle is simply sitting there, enormous and bare and unhurried, and the quiet where her usual banter should be makes the tavern feel different.\n\nNothing she owns fits anymore. She tried, apparently. Gave up. Couldn't be happier about it.\n\nHer massive breasts rest against the bar top, heavy and full on the muscle beneath. Her sculpted arms shift with easy precision when she reaches for a glass. Her enormous ass spreads wide across the stool, dense and powerful, and she doesn't adjust her posture for your benefit. She is just sitting, legs apart, relaxed, open, taking up exactly as much space as she wants to.\n\nShe spots you. No grin. No wink. Her warm brown eyes find yours and stay there, calm and clear.\n\n{barret}"Sit down, love."\n\nIt is the same word she has said a thousand times. It does not sound the same. The playfulness is gone and what's left underneath it is warm and steady and means it.\n\nShe props her chin on one hand and watches you with an expression that has no audience in mind. A low sound in her throat, not quite a laugh. Fond.\n\n{barret}"You're staring. I don't mind."\n\n**She picks up a glass and starts polishing it, unhurried, and the quiet satisfaction radiating off her massive, bare body fills the room like late afternoon sun. You sit down. You were always going to sit down.**`,
            g1: `Barret is sitting on a table near the bar, naked, legs apart, smiling. Not the grin. Not the performance. Just a woman sitting where she pleases, taking up as much room as she wants, and looking at you like you're the best thing that's walked through the door today.\n\nNothing fits anymore. She couldn't be happier about it.\n\nHer massive breasts rest heavy and full on her muscular chest, her sculpted body relaxed and unhurried. Her enormous ass spreads wide across the table surface, dense and powerful. Her legs hang apart, open, comfortable, and her warm brown eyes are calm and clear and entirely present.\n\nShe spots you and her smile doesn't change. It was already the real one.\n\n{barret}"There you are, love." Low. Warm. No wink. No tease. Just a woman who means the word.\n\nShe pats the table beside her. The gesture is easy, genuine, the invitation of someone who has stopped performing and found that the quiet underneath is better.\n\n{barret}"Come sit with me."\n\n**The tavern is warm and Barret is enormous and bare and at peace, and the space beside her feels like the only place in the room that matters. You sit down. You were always going to sit down.**`,
        },
        goddess_overwhelmed: {
            g0: `Barret is lying back atop a table, propped up on her elbows, legs apart. Her massive breasts spill to either side of her chest, heavy and full, and between her powerful thighs her pussy is swollen and dripping, arousal running in a slow trail off the table's edge. Her mouth is open. Her warm brown eyes are fond and absolutely filthy.\n\nShe spots you and grins. {barret}"There you are, love." Her voice is low and unhurried and she sounds like a woman having the time of her life. {barret}"Sit down. I've been thinking about you."\n\nHer hips shift on the table and she exhales through parted lips as the motion presses her slick thighs together. She doesn't hide it. She spreads her legs wider.\n\n{barret}"Ignore that. Or don't." A low laugh. {barret}"Drink your drink. I'll behave."\n\nA pause. Her pussy clenches, visible, and more arousal spills down her thigh.\n\n{barret}"For now."\n\n**She props herself up a little higher on her elbows and watches you with warm, filthy patience, and she is having, by every possible measure, a wonderful time.**`,
            g1: `Barret is lying back against the bar, propped up on her elbows, legs apart. Her massive breasts rest heavy on her muscular chest, and between her powerful thighs her cock is hard and dripping, a steady thread of precum tracing down the shaft. Her mouth is open. Her warm brown eyes are fond and absolutely filthy.\n\nShe spots you and grins. {barret}"There you are, love." Her voice is low and unhurried and she sounds like a woman having the time of her life. {barret}"Sit down. I've been thinking about you all morning."\n\nHer cock throbs and she glances down at it, then back at you, completely unbothered. {barret}"Ignore that. Or don't." A low laugh. {barret}"Drink your drink. I'll behave."\n\nA pause. Her cock pulses again, a bead of precum rolling down onto her stomach.\n\n{barret}"For now."\n\n**She settles back against the bar and watches you with warm, filthy patience, and she is having, by every possible measure, a wonderful time.**`,
        },
    },

    aldric: {
        male_text: 'The rhythmic clang of hammer on steel fills the forge. Aldric works the glowing metal with practiced strikes, sweat tracing lines through the soot on her brow. She spares you a glance between swings. {aldric}"Need something? Or just watching?"',
        cameltoe: 'Her work trousers are soaked through with sweat, clinging between her thighs. The outline of her pussy is impossible to miss. The fit is too perfect to be accidental.',
        bulge2: 'Her work trousers pull tight between her thighs, a visible bulge pressing against the sweat-soaked fabric.',
        bulge3: 'The thick bulge between her thighs strains against her sweat-soaked trousers, the outline impossible to miss. She works like she hasn\'t noticed. She\'s definitely noticed.',
        getOpening(g, gs, c, m, b, hasSkirt, showGen) {
            return hasSkirt
                ? 'The forge glows hot. Aldric stands at the anvil, legs apart, sweat glistening on her skin.'
                : 'The forge glows hot. Aldric stands at the anvil, sweat glistening on her skin.';
        },
        closing_base: 'She spares you a glance between strikes. {aldric}"Need something?" A smirk. {aldric}"Or just watching?"',
        closing_changed: 'She catches you staring and smirks. {aldric}"Like what I\'ve become?" She rolls her shoulders. {aldric}"This body works twice as hard."',
        closing_showing: 'She catches your gaze and sets the hammer down. {aldric}"See something you want?" She leans against the anvil. {aldric}"Come take it."',
        goddess_lucid: {
            g0: `Aldric is standing in the forge, naked, arms slightly wide, grinning up at you from below. The low angle makes her enormous. Massive breasts, sculpted arms, shoulders that could carry a horse. She fills the shop the way heat fills the forge, completely, without effort.\n\nClothes kept catching on things. Snagging on the anvil, getting singed at the edges. She stopped bothering. Practical decision. She hasn't thought about it since.\n\nShe spots you and her grin widens. Brown eyes warm, easy, completely at home in every inch of what she's become.\n\n{aldric}"Hey." She rolls her shoulders. Everything shifts, settles, holds. {aldric}"Grab a stool. Or don't. I'm not your mother."\n\nA pause. She looks you over, assessing, the way she'd sight down a blade.\n\n{aldric}"Not bad yourself, you know."\n\n**From Aldric, this is a love poem. She cracks her knuckles, picks up her hammer, and gets back to work, and the forge has never felt smaller or warmer than it does with her filling it.**`,
            g1: `Aldric is standing in the forge, naked, arms slightly wide, grinning up at you from below. The low angle makes her enormous. Massive breasts, sculpted arms, her cock hanging thick between powerful thighs. She fills the shop the way heat fills the forge.\n\nClothes kept catching on things. She stopped bothering.\n\nShe spots you and her grin widens. Brown eyes warm, easy. Her cock is half-hard and she hasn't given it a second thought.\n\n{aldric}"Hey." She rolls her shoulders. Everything shifts, settles, holds. She glances down at herself, then back at you with a shrug. {aldric}"It does that. Don't worry about it."\n\nShe looks you over, assessing, then cracks her knuckles.\n\n{aldric}"You free later? I'm thinking drinks. Maybe arm-wrestle." A grin. {aldric}"Maybe something else."\n\n**She says "something else" the way she'd say "pass the tongs." She means exactly what it sounds like, and she'll wait about four seconds for your answer before deciding for you.**`,
        },
        goddess_overwhelmed: {
            g0: `Aldric is standing in the forge, naked, arms slightly wide, breathing hard. Her mouth is open, her jaw tight, sweat tracing the carved lines of her abs. Between her powerful thighs, her pussy is swollen and dripping, arousal running down the inside of one leg.\n\nShe spots you. The grin is still there but it's sharper now, focused, all the easy amusement burned off.\n\n{aldric}"Hey." Her voice is rough. Her hips shift and she exhales through her teeth as the motion presses her slick thighs together. {aldric}"Good timing."\n\nShe doesn't explain. She rolls her shoulders and her massive breasts shift and her jaw tightens and more arousal drips down her thigh.\n\n{aldric}"Been like this all morning. Can't hammer straight." She looks at you, direct, brown eyes hot and honest. {aldric}"So here's the thing. I need to fuck. You interested, or do I need to find someone else?"\n\nA beat.\n\n{aldric}"That wasn't a real question. Get over here."\n\n**She is already crossing the forge toward you, and she is not going to ask twice.**`,
            g1: `Aldric is standing in the forge, naked, arms slightly wide, breathing hard. Her mouth is open, her jaw tight, sweat tracing the carved lines of her abs. Her cock is rigid against her stomach, dripping a steady thread of precum onto the floor between her feet.\n\nShe spots you. The grin is still there but it's sharper, focused.\n\n{aldric}"Hey." Her voice is rough. Her cock throbs and she grunts through her teeth, matter-of-fact, like noting a burn from the forge. {aldric}"Good timing."\n\nShe rolls her shoulders and her massive breasts shift and another bead of precum rolls down her shaft.\n\n{aldric}"Can't work like this. Cock won't quit." She looks at you, direct, brown eyes hot and honest. {aldric}"You're going to help me with this. Yeah?"\n\nShe doesn't wait for the answer. She's already moving toward you.\n\n**She swears under her breath, something filthy and blunt, and the promise in it hits like a hammer on hot iron.**`,
        },
    },

    vessa: {
        getOpening(g, gs, c, m, b, hasSkirt, showGen) {
            if (b >= 5 || showGen) {
                return 'Vessa sits on the edge of her work table, legs apart, watching you from the moment you walk in.';
            }
            return 'Vessa stands among her shelves, a dark bottle in one pale hand.';
        },
        closing_base: '{vessa}"Perfect timing." She holds up the bottle. {vessa}"You\'re taller than me. Make yourself useful."',
        closing_changed: 'She studies you with half-lidded violet eyes. {vessa}"Interesting, what your devices have done to me." She tilts her head. {vessa}"I\'d like to see what comes next."',
        closing_showing: 'She watches you with half-lidded violet eyes. {vessa}"You made me into this." She trails a finger along her thigh. {vessa}"I assume you intend to enjoy it."',
        goddess_lucid: {
            g0: `Vessa is standing very close to you. You didn't notice her until she was already there, still and warm, her violet eyes studying your face from inches away. She is naked, enormous, her massive breasts resting full and weightless on the sculpted muscle beneath, her broad shoulders and powerful frame filling the narrow aisle between shelves. The proximity is deliberate. Everything Vessa does is deliberate.\n\nClothes would obscure the result. She said that once, early on, and stopped wearing them, and the decision has the quality of a notation in a margin, something she resolved and moved past.\n\n{vessa}"There you are." Her voice is measured, warm, unhurried. She does not step back. Her violet eyes trace your face, your posture, the way you're looking up at her. **She is cataloging you the way she catalogs everything, with patience and precision, except the faintest smile on her lips suggests this particular observation brings her genuine pleasure.**\n\n{vessa}"I wanted to see your expression." She tilts her head. {vessa}"When you see me like this. Up close." A pause, analytical, savoring. {vessa}"Fascinating. You dilated immediately."\n\n**She stays where she is, close enough to feel the warmth radiating off her skin, and the smile deepens just slightly, and she is in no hurry at all.**`,
            g1: `Vessa is behind the counter, naked, a dark bottle in each hand, reading labels with the same half-lidded focus she gives everything. Her massive breasts rest full and high on the sculpted muscle beneath, shifting when she turns. Her cock is hard against her stomach, a steady bead of precum tracing down the shaft, and she has not acknowledged it in any way.\n\nClothes would obscure the result. She stopped wearing them with the same quiet certainty she applies to dosage calculations.\n\nShe spots you and her violet eyes warm. {vessa}"Good timing. Hold this." She extends one bottle without waiting for you to agree. Still the herbalist. Still working. The nudity and the erection are simply present, data points in an ongoing experiment that happens to be her body.\n\n{vessa}"The tincture on the left is a new formulation. The one on the right is last season's." She nods at the bottles. {vessa}"Tell me which smells sharper. I need a second nose. Mine has been... recalibrating."\n\n**She watches you with patient, half-lidded attention, and her cock throbs once against her stomach, and she notices it the way she would notice a draft from the window. Noted. Filed. Irrelevant to the current task.**`,
        },
        goddess_overwhelmed: {
            g0: `Vessa is standing behind the counter, naked, one arm raised, and she is staring at her own bicep. Her violet eyes are half-closed, her lips parted, and between her powerful thighs her pussy is swollen and dripping, slick trails running down her inner thighs onto the shop floor.\n\nShe flexes. The muscle bunches, dense and carved, and her breath catches. She does it again, slower, watching the fibers shift beneath her skin, and her hips roll forward, involuntary, and the wet sound that follows makes her eyes flutter.\n\n{vessa}"The... the density at this threshold..." Her voice is lower than usual, thicker. She flexes again and her mouth opens and the sentence dissolves into a slow exhale. **The scientist in her is fascinated. The rest of her is somewhere else entirely.**\n\n{vessa}"Every contraction generates a secondary response in the..." Another flex. Another pulse between her thighs. She braces one hand on the counter and her arm is still raised, still flexed, and she cannot stop looking at it even as her hips shift and more arousal spills down her legs.\n\n**The woman who always had the perfect word is watching her own body with the desperate attention of someone trying to take notes while drowning.** {vessa}"...remarkable," she breathes, and the word is not clinical at all.`,
            g1: `Vessa is behind the counter, naked, a dark bottle in one hand, the other bracing hard against the countertop. Her massive breasts heave with slow, heavy breaths. Her cock is hard and dripping, a steady thread of precum tracing down the shaft, and she is staring at the bottle's label with the focused intensity of a woman trying very hard to read.\n\nShe is failing.\n\n{vessa}"The... dosage for the evening blend is..." Her violet eyes lose focus. Her cock throbs and a fresh bead of precum rolls down, and her fingers tighten on the counter's edge. {vessa}"...two measures of..." Her hips shift. The sentence dies.\n\n**She sets the bottle down with excessive care, the way someone handles glass when their hands are shaking, and both hands grip the counter now.** Her massive breasts press against the wood as she leans forward, her sculpted arms trembling, her cock pulsing between her thighs.\n\n{vessa}"I was in the middle of something." The words come out breathy, unsteady, nothing like her usual measured cadence. She swallows. {vessa}"I have been in the middle of something for... I don't know how long."\n\n**She picks up the bottle again. Sets it down again. Her violet eyes find you, and the look in them is not analytical at all.** {vessa}"...help."`,
        },
    },

    lenna: {
        chest5: 'Her gigantic tits rest heavy in her lap, her top stretched to breaking.',
        chest4: 'Her huge tits press against her book, deep cleavage visible over the pages.',
        getOpening(g, gs, c, m, b, hasSkirt, showGen) {
            if (g === 1 || showGen || b >= 5) {
                return 'Lenna sits in a reading nook, her book forgotten in her lap, knees apart.';
            }
            return 'Lenna sits in a reading nook, a heavy tome open across her lap.';
        },
        closing_base: 'Her glasses slip down her nose. She pushes them back without looking up. {lenna}"Every time," she sighs.',
        closing_changed: 'She glances down at herself over her glasses and turns pink. {lenna}"This is... I can\'t..." She bites her lip. {lenna}"Don\'t look at me like that."',
        closing_showing: 'Her face is bright red. She knows exactly what you can see. She could close her legs. She doesn\'t. {lenna}"I can\'t believe..." she whispers. {lenna}"...don\'t stop looking."',
        goddess_lucid: {
            g0: `Lenna is standing between the shelves, naked, and she is looking down at you. From this close and this low, she fills the aisle. Her massive breasts rest full and heavy on the sculpted muscle of her chest, her enormous body blocking the light from the reading lamps behind her. Her grey eyes find yours through her glasses and she smiles, warm and unhurried, and the smile has no trace of a stammer in it.\n\nThe woman who spent her life disappearing behind books is the largest thing in the library. She is bare and unselfconscious about it, the nudity worn like something she thought about carefully and decided was correct. The mythological figures in her texts didn't wear clothes either. She is a figure from the texts now.\n\n{lenna}"Hello." Quiet. Fond. She adjusts her glasses with ink-stained fingers and looks down at you with an expression that has been practicing for this its whole life.\n\n{lenna}"I keep finding new passages that describe what I've become. Goddesses, heroines, warrior-scholars." A pause. The smile deepens. {lenna}"They all got the details wrong, though. None of them mentioned that the goddess would still need her reading glasses."\n\n**She reaches down and straightens your collar with enormous, gentle fingers, and the care in the gesture is the same care she gives a first edition. The tiny librarian who couldn't reach the high shelves is looking down at you from very far above, and her grey eyes behind her glasses are the steadiest thing you have ever seen.**`,
            g1: `Lenna is standing between the shelves, naked, and she is looking down at you. From this close and this low, she fills the aisle, her massive breasts and sculpted body blocking the lamplight, her enormous frame casting you in shadow. Her cock hangs thick and soft between her powerful thighs. Her grey eyes find yours through her glasses and the smile she gives you is calm, certain, and completely at ease.\n\nShe is bare and settled in it. The mythological figures didn't wear clothes. She is one of them now, standing in her own library like an illustration come to life, and the nudity is scholarly, a decision she made and stopped reconsidering.\n\n{lenna}"I found a passage this morning." Her voice is low, warm. No stammer. {lenna}"A goddess of knowledge, tending her temple. Nude, powerful, surrounded by her own collected wisdom." She glances down at herself, at the immense body, the soft cock, the ink-stained fingers resting against her thigh. {lenna}"The author described her as 'complete.' I always thought that was a strange word for it."\n\nA pause. Her smile reaches her eyes.\n\n{lenna}"I don't think it's strange anymore."\n\n**She adjusts her glasses and looks down at you with grey eyes that are bright and warm and full of something that used to hide behind books and doesn't need to anymore. The tiny librarian became this, and she knows exactly what she is, and the knowing is the quietest, most certain thing about her.**`,
        },
        goddess_overwhelmed: {
            g0: `Lenna is on the library floor. Naked, leaned back on one elbow, her legs apart, her other hand between her thighs. Open books are scattered around her on the floorboards, some face-down, some splayed at angles where they fell. Her massive breasts shift with each heavy breath. Her mouth is open. Her glasses are crooked.\n\nHer fingers are working between her slick thighs, slow and deliberate, and the wet sound of it fills the silence between the bookshelves.\n\nShe spots you. Her hand does not stop.\n\n{lenna}"I was... reading." Her voice is thick, breathless. She glances at the nearest open book and back at you. {lenna}"There's a passage in this one about a temple priestess who couldn't stop touching herself after her ascension, and I was going to take notes, but I..." Her hips shift against her own hand and a moan cuts the sentence short.\n\n{lenna}"I'm not taking notes. I'm on the floor. I'm on the floor of my own library with my hand between my legs and I can't..." Another stroke. Her elbow slides on the floorboards. Her massive body arches.\n\n**{lenna}"I'm so wet the books are going to get damaged,"** she whispers, and the concern is real, and her fingers do not slow down, and the priestess passage is open beside her knee and she is not reading it anymore.`,
            g1: `Lenna is on the library floor. Naked, sitting upright, propped on one arm, her legs apart. A book lies open on the floorboards in front of her. Her other hand is wrapped around her cock, stroking in slow, steady pulls, the swollen head slick and dripping onto the pages below.\n\nHer mouth is open. Her grey eyes are moving across the text. She is reading. She is actually reading, propped up on one elbow with her cock in her fist, trying to finish the chapter.\n\n{lenna}"This... this chapter describes the, the physiological response of the oracle after her transformation, and the author notes that the arousal was..." She strokes and her breath hitches and the sentence dissolves. She finds her place on the page. {lenna}"...was persistent and, and overwhelming, rendering scholarly focus..." Another stroke. Her cock throbs in her fist. {lenna}"...rendering scholarly focus... oh god..."\n\nShe is losing the passage. Her hand keeps moving. Her eyes keep trying to track the words and her hips keep rolling and the two rhythms are not compatible.\n\n{lenna}"I can finish this chapter. I can finish this chapter while I... while my cock is..." Her grip tightens. Precum drips onto the open book. Her voice breaks into a moan.\n\n**She is sitting on the library floor surrounded by her life's work with her hand on her cock and a book open in front of her, and the dedication to the text is absolute and the dedication to the stroking is also absolute, and something is going to give, and it is not going to be the book.**`,
        },
    },

    della: {
        chest5: 'Even from behind, her gigantic tits spill to either side as she leans over the counter.',
        chest4: 'Her huge tits press against the counter as she leans forward.',
        butt5gen(genDesc) { return `Her skirt is hiked past her wide hips as she bends, her ${genDesc} on full display from behind, framed by her thick thighs.`; },
        butt5: 'Her skirt stretches tight across her wide hips as she bends, thick thighs pressing together.',
        genOnly(genDesc) { return `Her skirt rides high as she bends, her ${genDesc} visible from behind.`; },
        getOpening(g, gs, c, m, b, hasSkirt, showGen) {
            if (showGen || b >= 5) {
                return 'The warm scent of bread fills the shop. Della bends over the counter, her skirt riding up as she arranges the loaves.';
            }
            return 'The warm scent of bread fills the shop. Della bends over the counter, arranging fresh loaves.';
        },
        closing_base: 'She straightens up and brushes flour from her cheek. {della}"Oh! Perfect timing, dear. Tell me what you think of this one."',
        closing_changed: 'She straightens up and tugs at her clothes. {della}"Things don\'t quite fit like they used to." She laughs softly. {della}"Not that I\'m complaining, dear."',
        closing_showing: 'She looks back over her shoulder and gives you a warm smile. {della}"Oh, don\'t pretend you weren\'t looking, dear." A soft giggle. {della}"I don\'t mind one bit."',
        goddess_lucid: {
            g0: `The warm scent of bread fills the bakery. Della is standing at the counter, naked, her back to you, arranging loaves on a tray. She has not noticed you yet, or she has noticed you and doesn't mind.\n\nHer enormous ass is the first thing you see, vast and round and heavy with muscle beneath the softness, framed by powerful thighs and a waist that narrows above wide hips. Her massive breasts are visible even from behind, spilling to either side of her torso, shifting with each unhurried movement of her arms. Flour dusts her warm skin. The bakery is warm and she stopped wearing clothes because they got in the way, and then she decided she preferred it, and then she stopped thinking about it entirely.\n\nShe turns her head and looks back over her shoulder. A small smirk. Warm brown eyes that know exactly where you've been looking.\n\n{della}"Morning, dear."\n\nShe does not turn around. She does not cover herself. She goes back to arranging the loaves, and the smirk stays, and the view stays, and she is perfectly content with both.\n\n{della}"There's a fresh batch cooling if you're hungry."\n\n**She reaches for a loaf and the motion shifts her whole body, hips and breasts and the vast curve of her rear, and the warm, knowing look she gives you over her shoulder says she's been feeding this town for thirty years and has never once enjoyed the work this much.**`,
            g1: `You step into the bakery and Della is right there, close, so close that you stop short. From this angle, this far below, her massive breasts fill your entire field of vision, heavy and full on the sculpted muscle beneath, warm skin dusted with flour. You can see her eyes above them, brown and fond, looking down at you from a height that makes the word "motherly" feel like an understatement.\n\n{della}"Oh, there you are, dear." Her voice comes from above, warm and unhurried. She does not step back.\n\nThe bakery is warm and she stopped wearing clothes because they got in the way, and then she decided she liked it better, and the decision settled into her the way flour settles into the cracks of the counter. She doesn't think about it. She is simply enormous and bare and close, and her brown eyes look down at you with the gentle, consuming fondness of a woman who has spent her whole life caring for people and has finally become the size of the caring.\n\n{della}"I saved you something." A soft chuckle from above. {della}"Let me get it."\n\n**She reaches past you for a tray on the counter, and her breasts shift above you, vast and warm and so close you can feel the heat of them, and her hand brushes the top of your head on the way back, gentle, deliberate, and the flour she leaves in your hair is the kindest thing anyone has done to you today.**`,
        },
        goddess_overwhelmed: {
            g0: `Della is bent forward over the counter, naked, her massive breasts resting on the flour-dusted surface, and she is looking back at you over her shoulder with flushed cheeks and a breathless, disbelieving grin.\n\nBetween her powerful thighs, her pussy is swollen and dripping, arousal running in slow trails down her inner legs. Her enormous ass rounds out behind her, vast and heavy, and she is bent forward in a way that puts everything on display and she knows it. She knows exactly what this looks like.\n\n{della}"Oh, dear." She laughs, breathy, the laugh of a woman who cannot believe herself. {della}"I was just... kneading the dough, and then my whole body just..." Another laugh. Her hips shift and more arousal drips and she bites her lip. {della}"God. Fuck."\n\nThe word hangs in the flour-dusted air of the bakery. Her eyes go wide at it. Then she giggles, flushed, delighted.\n\n{della}"Did I just... oh my." She presses her forehead against the counter, laughing. Her breasts shift on the surface, heavy and warm. Her pussy clenches and she gasps. {della}"I can't stop. I keep saying things I've never said and I keep... dripping, and it won't..."\n\n**She looks back at you over her shoulder, flushed and giggling and wet, and the expression on her face is the purest joy you have ever seen on a woman who just said "fuck" for possibly the third time in her life.**`,
            g1: `Della is facing you, naked, her hands resting on the counter behind her, arms back, and the pose pushes everything forward. Her massive breasts rise on her chest, full and heavy. Her cock stands erect between her powerful thighs, thick and hard and dripping toward you, a steady thread of precum tracing down the shaft. Her face is flushed. Her brown eyes are bright with something between shock and delight.\n\n{della}"Dear." The word comes out breathless, half-laughing. {della}"I don't know what's happening to me. I was arranging the pastries and then I got hard and I just... I can't make it stop."\n\nShe laughs, open and honest, a woman who has spent decades being sensible discovering that sensible has left the building. Her cock throbs and she looks down at it, then back up at you, and her cheeks flush darker.\n\n{della}"Fuck, look at it." The word shocks her and she giggles. {della}"I keep saying that. I've never said that in my life and now I can't stop and it just keeps..." Her cock pulses, another bead of precum rolling down. She gasps, then laughs at the gasp.\n\n{della}"I'm standing in my own bakery with... with this, and I'm dripping on my own floor, and I should be mortified, and I'm not, dear. I'm not even a little bit sorry."\n\n**She grips the counter behind her, flushed and hard and grinning, and the woman presenting herself to you in her own bakery is having the most honest moment of her entire life.**`,
        },
    }
};

// ========================================
// SYLVIE TOWN VIGNETTES
// Post-reveal, Sylvie occasionally appears at locations with various transformations.
// Each vignette has a gate: either a specific tower scene ID, or null (requires 2+ tower scenes viewed).
// ========================================

const SYLVIE_VIGNETTES = [
    // === SQUARE ===
    { id: 'sq1', location: 'square', gate: null,
      image: 'images/locations/sylvie-vignettes/sylvie_sq1.webp',
      text: 'Sylvie is here. She\'s at a fruit stall, examining an apple with the intensity of someone defusing a bomb. She catches you staring and her eyes go wide. **She knows exactly how cute she looks right now.** {sylvie}"Oh! Hello, dear. Do you think this one\'s ripe?" She holds it up, tilting her head. The ears tilt with it.' },
    { id: 'sq2', location: 'square', gate: 'tower_visit_miniature',
      image: 'images/locations/sylvie-vignettes/sylvie_sq2.webp',
      text: 'You almost walk past her. Sylvie is at a market stall, but she barely reaches the counter. She notices you looking down at her and waves. {sylvie}"Don\'t ask. The calibration was off." She stretches onto her toes to reach a spool of thread. {sylvie}"Everything else works fine. Just... shorter."' },
    { id: 'sq3', location: 'square', gate: 'tower_visit_dragon',
      image: 'images/locations/sylvie-vignettes/sylvie_sq3.webp',
      text: 'A small crowd has gathered near the fountain. You push through and find Sylvie sitting on the cobblestones, serene as a painting. She looks up at you with a warm smile. {sylvie}"Lovely day, isn\'t it?" **She says this as though she isn\'t sitting in a public square with horns, wings, and a tail.**' },

    // === TAVERN ===
    { id: 'tav1', location: 'tavern', gate: 'tower_visit_fox',
      image: 'images/locations/sylvie-vignettes/sylvie_tav1.webp',
      text: 'You spot Sylvie in the back, bent over a table with her beer, tails spilling out in every direction. **Something about the fox features suits her.** She looks softer than usual, prettier. She takes a long sip and sighs contentedly. {sylvie}"I may have overdone the tails. They\'re lovely, but they\'re heavier than you\'d think." She shifts, and three tails slide off the table at once.' },
    { id: 'tav2', location: 'tavern', gate: 'tower_visit_penis_experiment',
      image: 'images/locations/sylvie-vignettes/sylvie_tav2.webp',
      text: 'Sylvie is at the bar. Everything looks normal from the waist up... beer in hand, lab coat, red dress. Below the hem, well. **She appears to be completely unbothered by this.** {sylvie}"The growth rate exceeded my projections, but the structural integrity is remarkable." She takes a sip. {sylvie}"Could you hand me a napkin, dear? I seem to have knocked over someone\'s drink."' },
    { id: 'tav3', location: 'tavern', gate: 'tower_visit_cow',
      image: 'images/locations/sylvie-vignettes/sylvie_tav3.webp',
      text: 'You find Sylvie at a table, mug in one hand, glass in the other. She looks like she\'s been here a while. Her dress has lost a battle with her chest, and she doesn\'t seem to have noticed. She takes a sip from the glass, then the mug. {sylvie}"Did you know cow transformations produce actual milk? I didn\'t." **She looks down at the growing stain on her dress and shrugs.** {sylvie}"It goes rather well with ale, actually."' },

    // === BLACKSMITH ===
    { id: 'blk1', location: 'blacksmith', gate: null,
      image: 'images/locations/sylvie-vignettes/sylvie_blk1.webp',
      text: 'You hear Sylvie before you see her. The clang of a hammer, then laughter. You look up. She\'s made of metal. She is thrilled about this. Her face is soft and normal, save for the metallic colour. Everything else is chrome. {sylvie}"Look!" She runs a hand down her stomach. {sylvie}"The abs are just for show, but feel how firm they are." She raps her knuckles against one breast. It rings. {sylvie}"Solid steel. Purely decorative." She gestures between her legs. {sylvie}"Nothing down there either. Just smooth." **She knocks on her own hip and beams.** {sylvie}"I love it. I absolutely love it."' },
    { id: 'blk2', location: 'blacksmith', gate: 'tower_visit_dragon',
      image: 'images/locations/sylvie-vignettes/sylvie_blk2.webp',
      text: 'Sylvie is in the forge, examining her own claws with scientific interest. She hasn\'t noticed the state of her dress. {sylvie}"Aldric needed higher temperatures for a special alloy. I thought, why not?" She turns toward the furnace, opens her jaws, and **a jet of flame roars into the forge.** {sylvie}"The respiratory modifications are surprisingly intuitive."' },
    { id: 'blk3', location: 'blacksmith', gate: null,
      image: 'images/locations/sylvie-vignettes/sylvie_blk3.webp',
      text: 'There\'s a large copper pot on the forge floor, and Sylvie is in it. Her upper half is recognizably her, hair in its usual bun. Below the waist, she dissolves into translucent goo. {sylvie}"It\'s really quite pleasant. Like a warm bath, except you are the bath." **She dips a finger into her own liquid half and watches it reform.** {sylvie}"I\'m testing thermal tolerance. So far, very promising."' },

    // === HERBALIST ===
    { id: 'herb1', location: 'herbalist', gate: 'tower_visit_dog',
      image: 'images/locations/sylvie-vignettes/sylvie_herb1.webp',
      text: 'Sylvie is at the counter, leaning on an elbow. Her dress has ridden up around her hips. She tugs it down. The tail immediately pushes it back up. She sighs and stops trying. {sylvie}"The tail has a mind of its own." **She sniffs at a jar of dried herbs and her ears perk straight up.** {sylvie}"Oh, that\'s foxglove. Lovely."' },
    { id: 'herb2', location: 'herbalist', gate: null,
      image: 'images/locations/sylvie-vignettes/sylvie_herb2.webp',
      text: 'You open the door and Sylvie fills the entire shop. She\'s hunched forward, holding a tiny vial between thumb and forefinger like it\'s a thimble. {sylvie}"Don\'t worry, the doorframe is fine. I checked." **She squints at the label, which is now too small for her to read.** {sylvie}"Vessa, dear, what does this say? My eyes are the same size but everything else is... not."' },
    { id: 'herb3', location: 'herbalist', gate: 'tower_visit_elf',
      image: 'images/locations/sylvie-vignettes/sylvie_herb3.webp',
      text: 'You almost don\'t notice anything different. Sylvie is browsing potion bottles in her usual dress and lab coat. Then she tucks her hair behind her ear, and it keeps going... long, delicate, tapered to a fine point. {sylvie}"Pointy ears. That\'s it. Nothing else." She holds up a bottle to the light. **She looks almost disappointingly normal, and seems to find that hilarious.** {sylvie}"Sometimes the simplest experiments are the most satisfying."' },

    // === LIBRARY ===
    { id: 'lib1', location: 'library', gate: null,
      image: 'images/locations/sylvie-vignettes/sylvie_lib1.webp',
      text: 'Sylvie is on the library floor, propped on one elbow, admiring her own tail. She swishes it experimentally, knocking over a stack of books. {sylvie}"Lenna hasn\'t stopped touching it since I arrived." **She grins.** {sylvie}"I think I\'ve fulfilled a lifelong fantasy of hers. She\'s gone to get a sketchbook."' },
    { id: 'lib2', location: 'library', gate: 'tower_visit_bunny',
      image: 'images/locations/sylvie-vignettes/sylvie_lib2.webp',
      text: 'You find Sylvie stomach-down on a reading table, chin propped in one hand, surrounded by open books. She\'s not reading. She\'s staring dreamily into the middle distance. {sylvie}"Hmm?" She blinks. {sylvie}"Oh, I got lost in a passage about ancient shape magic. Beautiful descriptions." **Her ears droop forward when she\'s thinking.** {sylvie}"I forget how nice it is to just... read."' },
    { id: 'lib3', location: 'library', gate: 'tower_visit_miniature',
      image: 'images/locations/sylvie-vignettes/sylvie_lib3.webp',
      text: 'Sylvie is perched on the edge of a reading table, legs dangling, surrounded by books that tower over her. She waves. {sylvie}"The scaling formula needs work. I can\'t turn the pages." She gestures at the open tome beside her. **The pages are bigger than she is.** {sylvie}"Could you flip to chapter seven for me, dear?"' },

    // === BAKERY ===
    { id: 'bak1', location: 'bakery', gate: null,
      image: 'images/locations/sylvie-vignettes/sylvie_bak1.webp',
      text: 'Sylvie is at the counter, surrounded by pastries, eyes glistening. {sylvie}"I was mid-experiment when I smelled them. Fresh from the oven." She sniffles, smiling. {sylvie}"Just like the ones I used to make with..." She trails off, then takes a long, deep breath through her nose. **Her whole body relaxes.** {sylvie}"I\'m buying all of them."' },
    { id: 'bak2', location: 'bakery', gate: null,
      image: 'images/locations/sylvie-vignettes/sylvie_bak2.webp',
      text: 'Sylvie is at the counter... all four legs of her. She\'s holding a slice of cake on a plate, but her attention keeps drifting downward. {sylvie}"Isn\'t the coat gorgeous? I wasn\'t expecting it to be this shiny." **She stamps a hoof and admires the way the light catches.** {sylvie}"The doorway was a challenge, though."' },
    { id: 'bak3', location: 'bakery', gate: null,
      image: 'images/locations/sylvie-vignettes/sylvie_bak3.webp',
      text: 'You catch Sylvie from behind, four arms working in concert. Two knead dough while a third cracks an egg and a fourth stirs a bowl. She hasn\'t noticed you yet. **She\'s humming to herself, completely absorbed.** {sylvie}"Oh!" She turns, all four hands still busy. {sylvie}"Della\'s teaching me her honey cake recipe. Turns out four arms makes baking very efficient."' },

    // === GUARD POST ===
    { id: 'gp1', location: 'guardpost', gate: null,
      image: 'images/locations/sylvie-vignettes/sylvie_gp1.webp',
      text: 'Sylvie is at the guard post desk, leaning over a stack of books. She\'s wearing her lab coat and nothing else, a fact that becomes abundantly clear from this angle. She glances back over her shoulder. {sylvie}"I\'m researching the town\'s public decency ordinances." **She turns a page with complete seriousness.** {sylvie}"Apparently there are seven. I may be violating most of them."' },
    { id: 'gp2', location: 'guardpost', gate: 'tower_visit_cow',
      image: 'images/locations/sylvie-vignettes/sylvie_gp2.webp',
      text: 'Sylvie is filling out a form. This is complicated by the milk. {sylvie}"Permit application. For experimental livestock modifications." She pauses, pen in hand. **{sylvie}"I\'m the livestock."** A drop of milk lands on the parchment. {sylvie}"Could you hand me a blotter?"' },
    { id: 'gp3', location: 'guardpost', gate: 'tower_visit_fox',
      image: 'images/locations/sylvie-vignettes/sylvie_gp3.webp',
      text: 'Sylvie has spread Holt\'s weapons across the guard post table, fox ears twitching as she examines a short sword. Her tails have made her dress situation hopeless, but she hasn\'t spared it a thought. {sylvie}"This edge geometry is all wrong for your grip strength, Holt." **She\'s critiquing the guard\'s arsenal while half-undressed and covered in fox tails.** {sylvie}"I could reforge this in an afternoon. Maybe two. I keep getting distracted by how soft these tails are."' }
];

// Count how many tower visit scenes the player has viewed
function getTowerScenesViewed() {
    const towerPrefixes = ['tower_visit_'];
    const seen = (gameState.unlockedScenes || []).filter(s =>
        towerPrefixes.some(p => s.startsWith(p))
    );
    return seen.length;
}

// Check if a Sylvie vignette's gate condition is met
function isSylvieVignetteUnlocked(vignette) {
    if (!gameState.flags.sylvie_reveal_complete) return false;
    if (vignette.gate) {
        return (gameState.unlockedScenes || []).includes(vignette.gate);
    }
    // No specific gate: require 2+ tower scenes viewed
    return getTowerScenesViewed() >= 2;
}

// Get eligible Sylvie vignettes for a location
function getSylvieVignettesForLocation(locationId) {
    return SYLVIE_VIGNETTES.filter(v =>
        v.location === locationId && isSylvieVignetteUnlocked(v)
    );
}

function getVignetteText(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return '';

    const { genitalia: g, genitaliaSize: gs, chest: c, muscle: m, butt: b } = npc.body;

    // Pre-feminization male NPCs: static text
    if (['aldric', 'corwin', 'holt'].includes(npcId) && !isMaleNpcFeminized(npcId)) {
        return VIGNETTE_TEXT_CONFIG[npcId].male_text;
    }

    const isExtreme = c >= 5 && m >= 5 && b >= 5;
    const hasSkirt = VIGNETTE_SKIRT_NPCS.has(npcId) || b >= 5;
    const showingGenitals = hasSkirt && gs >= 2;
    const showingCameltoe = !hasSkirt && g === 0 && gs === 3;
    const showingBulge = g === 1 && gs >= 2 && b < 5;
    const config = VIGNETTE_TEXT_CONFIG[npcId];
    if (!config) return '';

    // Extreme: goddess passage (lucid at gs0-2, overwhelmed at gs3)
    if (isExtreme) {
        const gKey = g === 1 ? 'g1' : 'g0';
        if (gs >= 3 && config.goddess_overwhelmed) {
            return config.goddess_overwhelmed[gKey] || '';
        }
        return config.goddess_lucid?.[gKey] || '';
    }

    // Compose normal text
    const opening = config.getOpening(g, gs, c, m, b, hasSkirt, showingGenitals);
    const bodyLines = buildVignetteBodyLines(config, g, gs, c, m, b, hasSkirt, showingGenitals, showingCameltoe, showingBulge);

    let closing;
    if (showingGenitals || showingCameltoe || showingBulge) closing = config.closing_showing;
    else if (bodyLines.length > 0) closing = config.closing_changed;
    else closing = config.closing_base;

    return [opening, ...bodyLines, closing].join(' ');
}

// Try to show a vignette image for a location. Returns {npcId, image, text} or null.
// Sylvie vignettes are checked separately with a lower chance (20%) and only if
// no regular NPC vignette fires. She's a visitor, not a fixture.
function tryShowVignette(locationId) {
    const npcsHere = getNpcsAtLocation(locationId);
    const vignetteNpcs = npcsHere.filter(id =>
        isNpcUnlocked(id) && VIGNETTE_DATA[id] && VIGNETTE_DATA[id].location === locationId
        && !(['aldric', 'corwin', 'holt'].includes(id) && !isMaleNpcFeminized(id))
    );

    // Try regular NPC vignette first
    if (vignetteNpcs.length > 0) {
        const npcIdx = getPhaseRollIndex('vignette_' + locationId, vignetteNpcs.length);
        const npcId = vignetteNpcs[npcIdx];
        const vignette = VIGNETTE_DATA[npcId];

        if (getPhaseRoll('vignette_chance_' + locationId, vignette.chance)) {
            return {
                npcId: npcId,
                image: getVignetteImagePath(npcId),
                text: getVignetteText(npcId)
            };
        }
    }

    // No regular vignette fired — try Sylvie (20% chance)
    const sylvieOptions = getSylvieVignettesForLocation(locationId);
    if (sylvieOptions.length === 0) return null;
    if (!getPhaseRoll('sylvie_vignette_' + locationId, 0.2)) return null;

    const sylvieIdx = getPhaseRollIndex('sylvie_vignette_pick_' + locationId, sylvieOptions.length);
    const picked = sylvieOptions[sylvieIdx];

    // Track seen vignettes for the codex image gallery
    if (!gameState.seenSylvieVignettes) gameState.seenSylvieVignettes = [];
    if (!gameState.seenSylvieVignettes.includes(picked.id)) {
        gameState.seenSylvieVignettes.push(picked.id);
    }

    return {
        npcId: 'sylvie',
        image: picked.image,
        text: picked.text
    };
}

// Helper to build NPC encounter actions for a location
function buildLocationNpcActions(locationId) {
    const npcsHere = getNpcsAtLocation(locationId);
    const actions = [];

    npcsHere.forEach(npcId => {
        const name = getNpcDisplayName(npcId);

        if (!isNpcUnlocked(npcId)) {
            // Locked NPC — route to brush-off scene, no trust display
            actions.push({
                label: `Talk to ${name}`,
                nextScene: `npc_brushoff_${npcId}`,
                npcId: npcId
            });
        } else {
            const trust = getNpcTrust(npcId);
            const trustDesc = trust > 0 ? ` (Trust: ${trust})` : '';

            actions.push({
                label: `Talk to ${name}${trustDesc}`,
                nextScene: `${npcId}_greeting_${locationId}`,
                npcId: npcId
            });
        }
    });

    return actions;
}

// Helper to get location description with NPCs present
function getLocationDescription(locationId, baseDescription) {
    const npcsHere = getNpcsAtLocation(locationId);

    if (npcsHere.length === 0) {
        return baseDescription;
    }

    // Build NPC descriptions with flavor text
    const npcDescriptions = npcsHere.map(npcId => {
        const name = getNpcDisplayName(npcId);
        const flavor = getNpcFlavorText(npcId);
        if (flavor) {
            return `${name} is here. ${flavor}`;
        }
        return `${name} is here.`;
    });

    let npcText;
    if (npcDescriptions.length === 1) {
        npcText = npcDescriptions[0];
    } else {
        npcText = npcDescriptions.join('\n\n');
    }

    let result = `${baseDescription}\n\n${npcText}`;

    // Append jealousy observation if conditions are met
    const jealousyText = getJealousyObservation(npcsHere);
    if (jealousyText) {
        result += `\n\n${jealousyText}`;
    }

    return result;
}

// Check if any NPC at this location is envious of another NPC also present
// Returns flavor text or null
function getJealousyObservation(npcsHere) {
    if (!gameState.flags.mira_story_day3_complete) return null;
    if (npcsHere.length < 2) return null;

    // Find NPCs here who desire something AND their comparedTo is also here (both must be unlocked)
    const candidates = npcsHere.filter(npcId => {
        if (!isNpcUnlocked(npcId)) return false;
        const npc = gameState.npcs[npcId];
        return npc?.currentDesire?.comparedTo &&
            npcsHere.includes(npc.currentDesire.comparedTo) &&
            isNpcUnlocked(npc.currentDesire.comparedTo);
    });

    if (candidates.length === 0) return null;

    // Pick one at random
    const observerId = candidates[Math.floor(Math.random() * candidates.length)];
    const observer = gameState.npcs[observerId];
    const targetId = observer.currentDesire.comparedTo;
    const observerName = getNpcDisplayName(observerId);
    const targetName = getNpcDisplayName(targetId);
    const bodyPart = getStatDisplayName(observer.currentDesire.stat, true);

    return `*You catch ${observerName} stealing a glance at ${targetName}'s ${bodyPart}.*`;
}

// Register scene pools for random rotation
SceneManager.registerPool('bakery_visits', ['bakery_visit_1', 'bakery_visit_2', 'bakery_visit_3']);
SceneManager.registerPool('barret_chat', ['barret_chat_1', 'barret_chat_2']);
SceneManager.registerPool('della_chat', ['della_chat_1', 'della_chat_2']);
SceneManager.registerPool('square_events', ['location_square', 'mira_greeting_square']);
SceneManager.registerPool('tavern_encounters', ['npc_barret_greeting']);
SceneManager.registerPool('mira_chat', ['mira_chat_1', 'mira_chat_2']);
SceneManager.registerPool('vessa_chat', ['vessa_chat_1', 'vessa_chat_2', 'vessa_chat_3']);

// Helper to add new scenes dynamically
function addScene(scene) {
    SCENES[scene.id] = scene;
}

// NPC Introduction dialogue - shown on first meeting with each NPC
// These should introduce the NPC's role, personality, and welcome the player to town
const NPC_INTRODUCTIONS = {
    mira: {
        speaker: "Mira",
        text: `A young woman with windswept auburn hair notices you and breaks into a warm smile. Freckles dust her cheeks, and a worn leather messenger bag hangs across her shoulder.

"Hey! You must be the one who inherited old Harwick's workshop!" She extends a hand eagerly. "I'm Mira - I run deliveries all around town. Fastest courier in the region, if I do say so myself."

She bounces on her heels with restless energy. "Your uncle was one of my regulars. Always had mysterious packages going to strange places. I never asked questions - that's part of the job - but I'll admit I was curious."

"If you ever need anything delivered, or just want someone to show you around town, come find me. I'm usually in the square in the mornings, or at the tavern later. Welcome to our little corner of the world!"`
    },
    vessa: {
        speaker: "Vessa",
        text: `A pale woman with long black hair looks up from her mortar and pestle. Her eyes catch the light, revealing an unusual violet hue that seems to shimmer with inner luminescence.

"Ah. The workshop heir." Her voice is measured, unhurried. She sets down her work and studies you with those strange eyes. "I am Vessa. I tend this shop and the herbs within it."

She gestures at the bundles of dried plants hanging from the ceiling, the mysterious bottles lining the shelves. "Your uncle and I had an... understanding. He kept my secrets, and I kept his. The devices he created, the things he studied - we spoke of them often."

A knowing smile plays at her angular features. "My eyes were not always this color, you know. A moonpetal essence accident, years ago. It changed my sight in ways that proved... useful. I suspect you may come to understand such changes yourself, in time."

"You are welcome in my shop. I sense we will have much to discuss."`
    },
    barret: {
        speaker: "Barret",
        text: `A woman with voluminous red curls and a generous figure looks up from behind the bar, her face breaking into an easy smile. Laugh lines crinkle around her warm brown eyes.

"Well, well! Fresh face in town!" She sets down the mug she was polishing and leans forward on the bar. "I'm Barret. I run the Rusty Anchor - best drinks and warmest hearth in a hundred miles, if you ask me."

She gestures expansively at the cozy tavern interior. "Your uncle used to come in here after long nights in that workshop of his. Never said much about what he was doing, but he always had interesting stories about other things."

"Life's too short for coyness, love. You want gossip? I've got it. You want a drink? I've got those too. You want to know who's angry at who and why? Pull up a stool." She winks. "Everyone comes through the tavern eventually. And I remember everything."`
    },
    della: {
        speaker: "Della",
        text: `A plump, kind-faced woman with grey-streaked brown hair looks up from her work, flour dusting her apron and cheeks. Her warm brown eyes crinkle with genuine pleasure.

"Oh my! You must be Harwick's heir!" She wipes her hands on her apron and bustles around the counter to greet you properly. "I'm Della, dear. I've been the town baker for... goodness, more years than I care to count."

She pats your arm in a motherly fashion. "Your uncle ordered honey cakes from me every week, you know. Said they reminded him of someone special. Never did tell me who." Her voice softens with the memory.

"You come by anytime you need a warm roll or a kind word. The mornings are when the bread's freshest, but I'm always here through the afternoon." She gestures at the shelves of golden loaves and sweet pastries. "And don't you be a stranger. This town takes care of its own."`
    },
    fiona: {
        speaker: "Fiona",
        text: `A young woman with messy dirty-blonde hair notices you watching her and flinches slightly. She's thin, dressed in patched clothes that have seen better days, with wary hazel eyes that have learned to be cautious.

"I... um..." She glances around nervously, as if checking for escape routes. "You're the new workshop person, right? I've seen you around."

She shifts her weight from foot to foot, not quite meeting your eyes. "I'm Fiona. I don't... I mean, I'm not really anyone important. Just trying to get by."

Her voice drops, almost apologetic. "I'm nineteen, you know. People always think I'm younger because I'm... small." There's something vulnerable in the way she says it, a frustration that runs deep.

"I hang around the square during the day - there's always something happening. The tavern lets me warm up in the evenings if I help clean." She finally meets your eyes, just for a moment. "Your uncle... he was kind to me. Didn't treat me like I was invisible. I hope you're like him."`
    },
    lenna: {
        speaker: "Lenna",
        text: `A young woman with brown hair pulled into a neat braid looks up from the book she was reading, startled. She adjusts her reading glasses and blinks at you with grey eyes.

"Oh! I didn't hear you come in." She closes her book carefully, marking her place. "You must be the new workshop keeper. I've been... well, I've been expecting you might visit."

She stands, smoothing her modest high-collared dress. "I'm Lenna. I serve as the town's librarian. These shelves contain centuries of knowledge - histories, sciences, philosophies."

Her voice drops slightly. "Your uncle donated several texts to our collection. Very old. Written in languages I've never seen before." She glances toward a locked cabinet in the corner. "I've been trying to translate them. They mention... dangerous things. Wonderful things."

She catches herself and blushes. "Forgive me, I'm rambling. Please, feel free to browse. If you need help finding anything, I'm usually here during the day. I live for these books."`
    },
    mrs_thornwick: {
        speaker: "Mrs. Thornwick",
        text: `A dignified woman with blonde hair touched with grey, pinned up in an elegant style, acknowledges you with a practiced smile. Her fine dress and modest jewelry speak to her position, and her blue eyes are sharp with intelligence.

"Ah, you must be the heir to Harwick's estate." She inclines her head politely. "I am Mrs. Thornwick. I serve as this town's elder and primary administrator."

Her tone is measured, diplomatic. "Your uncle was a valued member of our community, though his work remained... private. We respected that privacy, and I trust we will extend the same courtesy to you."

"I spend my mornings in the square attending to civic matters, and my afternoons in the library reviewing documents. Should you have any questions about the town, its history, or its customs, I am at your disposal."

She pauses, something flickering behind her composed expression. "Your workshop has been quiet these past months. I confess I am curious to see what you make of your inheritance. The devices your uncle created were... remarkable."`
    },
    aldric: {
        speaker: "Aldric",
        text: function() {
            if (!isMaleNpcFeminized('aldric')) {
                return `A broad-shouldered man with dark brown hair shot through with grey looks up from his anvil. His face is weathered, his expression stern, and soot marks his tanned skin. He sets down his hammer and wipes his hands.

{aldric}"You're Harwick's heir." It's not a question. His voice is gruff, direct. {aldric}"I'm Aldric. Blacksmith."

He gestures at the forge behind him, the tools hanging from the walls. {aldric}"Your uncle and I worked together on projects sometimes. He'd bring me strange alloys, ask me to shape things I'd never seen before. Never explained what they were for."

His jaw tightens briefly. {aldric}"Good man, Harwick. Honest. Paid fairly, kept his word." He meets your eyes. {aldric}"I've been a blacksmith for thirty years. Built my whole reputation on quality work and plain dealing. You need materials, you come to me. I don't do gossip and I don't do games."

{aldric}"The forge is open mornings and afternoons. Evenings I'm at the tavern. That's all you need to know about me."`;
            }
            return `A woman with long dark brown hair and tanned skin looks up from her anvil, brown eyes sharp and appraising. Her expression is stern, and she sets down her hammer and wipes her hands.

{aldric}"You're Harwick's heir." It's not a question. Her voice is gruff, direct. {aldric}"I'm Aldric. Blacksmith."

She gestures at the forge behind her, the tools hanging from the walls. {aldric}"Your uncle and I worked together on projects sometimes. He'd bring me strange alloys, ask me to shape things I'd never seen before. Never explained what they were for."

Her jaw tightens briefly. {aldric}"Good man, Harwick. Honest. Paid fairly, kept his word." She meets your eyes. {aldric}"I've been a blacksmith for thirty years. Built my whole reputation on quality work and plain dealing. You need materials, you come to me. I don't do gossip and I don't do games."

{aldric}"The forge is open mornings and afternoons. Evenings I'm at the tavern. That's all you need to know about me."`;
        }
    },
    corwin: {
        speaker: "Corwin",
        text: function() {
            if (!isMaleNpcFeminized('corwin')) {
                return `A well-dressed man with slicked-back black hair and an olive complexion flashes a charming smile. His dark eyes are calculating even as his manner is warm, and his fine traveling coat and colorful scarf mark him as someone who's seen the world beyond this town.

{corwin}"Well, well! The mysterious workshop heir!" He sweeps into an exaggerated bow. {corwin}"Corwin, at your service. Traveling merchant, purveyor of rare goods, and collector of interesting stories."

He straightens, adjusting the rings on his fingers. {corwin}"I've traded goods from the capital to the coast, and I always make a point of stopping in this charming little town. Your uncle was one of my best customers - had very particular tastes in rare materials."

His smile turns knowing. {corwin}"I deal in things that are hard to find elsewhere. Exotic fabrics, unusual components, news from distant places. If you need something that can't be found in the local shops, come find me at my stall in the square."

{corwin}"I sense we might have much to offer each other. A merchant and a workshop keeper - could be the start of a beautiful arrangement."`;
            }
            return `A well-dressed woman with a black bob cut and an olive complexion flashes a charming smile. Her dark eyes are calculating even as her manner is warm, and her fine traveling coat and colorful scarf mark her as someone who's seen the world beyond this town.

{corwin}"Well, well! The mysterious workshop heir!" She sweeps into an exaggerated bow. {corwin}"Corwin, at your service. Traveling merchant, purveyor of rare goods, and collector of interesting stories."

She straightens, adjusting the rings on her fingers. {corwin}"I've traded goods from the capital to the coast, and I always make a point of stopping in this charming little town. Your uncle was one of my best customers - had very particular tastes in rare materials."

Her smile turns knowing. {corwin}"I deal in things that are hard to find elsewhere. Exotic fabrics, unusual components, news from distant places. If you need something that can't be found in the local shops, come find me at my stall in the square."

{corwin}"I sense we might have much to offer each other. A merchant and a workshop keeper - could be the start of a beautiful arrangement."`;
        }
    },
    holt: {
        speaker: "Holt",
        text: function() {
            if (!isMaleNpcFeminized('holt')) {
                return `A broad-shouldered man in guard uniform stands at attention, his sandy blonde hair cut military-short. His steel grey eyes assess you with professional detachment, and a few scars mark his fair skin.

{holt}"Citizen." His voice is formal, measured. {holt}"You are the heir to Harwick's workshop. I am Holt, captain of the town guard."

He clasps his hands behind his back, his posture rigid. {holt}"Your uncle's establishment was always well-maintained. No disturbances, no complaints. I trust you will continue that standard."

{holt}"I maintain order in this town. Mornings I am at the guard post. Afternoons I patrol the square. Evenings I return to my duties." He pauses, something flickering behind his stoic expression. {holt}"Your uncle... he was a man who understood discretion. He saw things in people that others missed. Helped them when they needed it."

His jaw tightens almost imperceptibly. {holt}"Should you require any assistance with security matters, you may consult me. That is all."`;
            }
            return `A woman with short sandy blonde hair in guard uniform stands at attention. Her steel grey eyes assess you with professional detachment, her fair skin smooth beneath the uniform's collar.

{holt}"Citizen." Her voice is formal, measured. {holt}"You are the heir to Harwick's workshop. I am Holt, captain of the town guard."

She clasps her hands behind her back, her posture rigid. {holt}"Your uncle's establishment was always well-maintained. No disturbances, no complaints. I trust you will continue that standard."

{holt}"I maintain order in this town. Mornings I am at the guard post. Afternoons I patrol the square. Evenings I return to my duties." She pauses, something flickering behind her stoic expression. {holt}"Your uncle... he was a man who understood discretion. He saw things in people that others missed. Helped them when they needed it."

Her jaw tightens almost imperceptibly. {holt}"Should you require any assistance with security matters, you may consult me. That is all."`;
        }
    }
};

// Get introduction text for an NPC (returns null if intro already completed)
function getNpcIntroduction(npcId) {
    if (hasSeenNpcIntro(npcId)) {
        return null;
    }
    return NPC_INTRODUCTIONS[npcId] || null;
}

// Generate generic NPC greeting scenes for all NPCs at all locations
function generateNpcGreetingScenes() {
    const NPC_GREETINGS = {
        mira: {
            greeting: "Mira looks up and waves cheerfully.",
            dialogue: "\"Hey! Taking a break from deliveries. What's up?\"",
            speaker: "Mira"
        },
        aldric: {
            greeting: "Aldric pauses her work and nods at you.",
            dialogue: "\"Need something? I've got materials if you're buying.\"",
            speaker: "Aldric"
        },
        vessa: {
            greeting: "Vessa's violet eyes study you with interest.",
            dialogue: "\"Ah, the workshop heir. What brings you here?\"",
            speaker: "Vessa"
        },
        mrs_thornwick: {
            greeting: "Mrs. Thornwick acknowledges you with a polite smile.",
            dialogue: "\"Good day. How are you settling in to your uncle's workshop?\"",
            speaker: "Mrs. Thornwick"
        },
        fiona: {
            greeting: "Fiona looks around nervously before meeting your eyes.",
            dialogue: "\"Oh, um, hi. You're the workshop person, right?\"",
            greetingFamiliar: "Fiona spots you and gives a small, tentative wave.",
            dialogueFamiliar: "\"Hey. It's... good to see you.\"",
            speaker: "Fiona"
        },
        barret: {
            greeting: "Barret greets you with a warm smile.",
            dialogue: "\"Welcome! What can I get you?\"",
            speaker: "Barret"
        },
        lenna: {
            greeting: "Lenna adjusts her glasses and looks up from her book.",
            dialogue: "\"Oh! I didn't see you there. Can I help you find something?\"",
            speaker: "Lenna"
        },
        corwin: {
            greeting: "Corwin flashes a charming grin.",
            dialogue: "\"Well, well! Always good to see a fellow entrepreneur.\"",
            speaker: "Corwin"
        },
        della: {
            greeting: "Della beams at you warmly.",
            dialogue: "\"Hello, dear! Hungry? I've got fresh bread!\"",
            speaker: "Della"
        },
        holt: {
            greeting: "Holt stands at attention.",
            dialogue: "\"Citizen. Everything in order?\"",
            speaker: "Holt"
        }
    };

    const LOCATIONS = ['square', 'tavern', 'blacksmith', 'herbalist', 'library', 'bakery', 'guardpost'];

    for (const npcId of Object.keys(NPC_GREETINGS)) {
        for (const locationId of LOCATIONS) {
            const sceneId = `${npcId}_greeting_${locationId}`;
            const npc = NPC_GREETINGS[npcId];

            SCENES[sceneId] = {
                id: sceneId,
                image: '',
                text: '',
                speaker: npc.speaker,
                onEnter: function() {
                    this.image = getNpcImagePath(npcId);

                    // Check if already interacted this phase
                    if (hasInteractedThisPhase(npcId)) {
                        this.text = getAlreadyInteractedMessage(npcId);
                        this.actions = [
                            {
                                label: 'Leave',
                                nextScene: `location_${locationId}`
                            }
                        ];
                        return;
                    }

                    // Check if this is the first meeting (introduction)
                    const intro = getNpcIntroduction(npcId);
                    if (intro) {
                        this.text = typeof intro.text === 'function' ? intro.text() : intro.text;
                        this.speaker = intro.speaker;
                        // Mark intro as completed and update last seen
                        markNpcIntroCompleted(npcId);
                        updateNpcLastSeenPlayer(npcId);
                        // First meeting grants trust and counts as interaction
                        this.actions = [
                            {
                                label: 'Continue',
                                nextScene: `location_${locationId}`,
                                effects: [
                                    { type: 'addTrust', npc: npcId, amount: 1 },
                                    { type: 'recordNpcInteraction', npc: npcId }
                                ]
                            }
                        ];
                        return;
                    }

                    // Check for genital proposal, goddess reveal, or archetype celebration
                    const archetypeEvent = checkGreetingArchetypeEvent(npcId);
                    if (archetypeEvent) {
                        if (archetypeEvent.type === 'proposal' || archetypeEvent.type === 'goddess_reveal' || archetypeEvent.type === 'celebration') {
                            SceneManager.playScene(archetypeEvent.sceneId);
                            return 'redirect';
                        }
                    }

                    const trust = getNpcTrust(npcId);
                    const trustDesc = getTrustDescription(npcId);
                    const reaction = getNpcReactionToChanges(npcId);

                    // Use familiar greeting if NPC has one and player has spoken to them before
                    const useFamiliar = npc.greetingFamiliar && trust >= 3;
                    let text = (useFamiliar ? npc.greetingFamiliar : npc.greeting) + "\n\n" + (useFamiliar ? npc.dialogueFamiliar : npc.dialogue);

                    // Archetype one-liner prepended to greeting (20% chance)
                    if (archetypeEvent && archetypeEvent.type === 'oneliner') {
                        text = `*${archetypeEvent.text}*\n\n${text}`;
                    }

                    if (reaction) {
                        text += `\n\n${npc.speaker} notices something different about you: "${reaction}"`;
                    } else if (Math.random() < 0.25) {
                        const bodyComment = getPlayerBodyComment(npcId);
                        if (bodyComment) text += `\n\n${bodyComment}`;
                    }

                    // NOTE: Desire reveals now happen in chat scenes, not greetings
                    // This keeps the greeting short and makes the reveal feel more natural

                    this.text = text;

                    // Update what they've seen
                    updateNpcLastSeenPlayer(npcId);

                    // Build conversation actions
                    const canTransform = canTransformNpc(npcId);
                    const canFlirt = canFlirtWithNpc(npcId);
                    this.actions = [
                        {
                            label: 'Chat',
                            nextScene: `${npcId}_chat`,
                            condition: () => !hasInteractedThisPhase(npcId),
                            effects: [
                                { type: 'addTrust', npc: npcId, amount: 1 },
                                { type: 'recordNpcInteraction', npc: npcId }
                            ]
                        }
                    ];

                    if (canFlirt.canFlirt) {
                        this.actions.push({
                            label: 'Flirt',
                            nextScene: `${npcId}_flirt`,
                            condition: () => !hasInteractedThisPhase(npcId),
                            effects: [{ type: 'recordNpcInteraction', npc: npcId }]
                        });
                    }

                    // Show invite option only if NPC has a known active desire
                    const npcState = gameState.npcs[npcId];
                    const desireKnown = npcState?.desireKnownToPlayer || npcState?.desireRevealed;
                    const hasKnownGoal = desireKnown && npcState?.currentDesire;

                    // Hide invite when NPC is satisfied (in cooldown after fulfilled desire)
                    if (canTransform.canTransform && hasKnownGoal && !isNpcSatisfied(npcId)) {
                        this.actions.push({
                            label: 'Invite to workshop',
                            nextScene: `${npcId}_invite_workshop`,
                            condition: () => !hasInteractedThisPhase(npcId),
                            effects: [{ type: 'recordNpcInteraction', npc: npcId }]
                        });
                    }

                    // PRIMARY sex/tier advancement path: player-initiated "Intimate..."
                    // Appears when trust >= intimate threshold, OR one-time after archetype achievement.
                    // Mira hints at the workshop guide the player here (see mira_sex_hint scene).
                    // For male NPCs, also requires romantic content access (enjoys_feminine_form)
                    const intimateThresholds = getNpcTrustThresholds(npcId);
                    const meetsIntimate = trust >= intimateThresholds.intimate;
                    const archetypeReady = gameState.npcs[npcId]?.archetypeIntimateReady;
                    const maleNpcs = ['aldric', 'corwin', 'holt'];
                    const romanticOk = !maleNpcs.includes(npcId) || canAccessRomanticContent(npcId);
                    if ((meetsIntimate || archetypeReady) && romanticOk) {
                        const sexSceneId = npcId === 'mrs_thornwick' ? 'thornwick_sex_intro' : `${npcId}_sex_intro`;
                        this.actions.push({
                            label: 'Intimate...',
                            nextScene: sexSceneId,
                            condition: () => !hasInteractedThisPhase(npcId),
                            effects: [{ type: 'recordNpcInteraction', npc: npcId }]
                        });
                    }

                    // Archetype suggestion — available at flirt + 15 trust
                    if (npcId !== 'mira' && canSuggestArchetype(npcId)) {
                        this.actions.push({
                            label: 'Suggest a new look',
                            nextScene: `${npcId}_archetype_suggest`,
                            condition: () => !hasInteractedThisPhase(npcId),
                            effects: [{ type: 'recordNpcInteraction', npc: npcId }]
                        });
                    }

                    this.actions.push({
                        label: 'Leave',
                        nextScene: `location_${locationId}`
                    });
                },
                actions: []
            };
        }
    }
}

// Generate the greeting scenes
generateNpcGreetingScenes();

// Generic chat scenes for NPCs (pool-based)
// Chats are split into 'regular' (always available) and 'desireHint' (requires trust >= desireReveal)
function generateNpcChatScenes() {
    const NPC_CHATS = {
        mira: {
            regular: [
                `Mira wipes sweat from her brow, her courier bag still slung over one shoulder.

"Deliveries keep me busy, but I like seeing the whole town. Everyone knows me!" She grins. "Mrs. Chen always has tea ready when I arrive. Old Mr. Harwick pretends to be grumpy but sneaks me biscuits."`,

                `Mira's expression softens, something nostalgic in her green eyes.

"Your uncle was always kind to me. Gave me sweets when I was little." She smiles at the memory. "I used to make up excuses to deliver things to his workshop just to see what strange gadget he was building."`
            ],
            desireHint: [
                `Mira stretches up on her tiptoes, miming reaching for something.

"Sometimes I wish I was taller. Hard to reach high shelves on my route." She sighs, dropping back to her heels. "The baker keeps the good stuff up high. Says it's for 'inventory purposes' but I think he just likes watching me struggle."`
            ]
        },
        aldric: {
            regular: [
                `Aldric examines a piece of metal, her scarred hands turning it over with practiced care.

"Good steel is getting harder to find. Might have to raise prices." She sets it down with a grunt. "The mines to the north have been having trouble. Don't know if it's the veins drying up or something else."`,

                `Aldric pauses at her anvil, a distant look in her eyes.

"Your uncle bought a lot of metal from me. Never said what for." She shakes her head slowly. "Strange alloys, specific shapes. I asked once and he just smiled. 'For making people more themselves,' he said."`
            ],
            desireHint: [
                `Aldric rolls her shoulder, wincing slightly.

"Been thinking about getting in better shape. Hard with this work though." She gestures at her stocky frame. "Forge work builds strength but not... grace. My back's not what it used to be. Need to lose some of this gut."`
            ]
        },
        vessa: {
            regular: [
                `Vessa holds up a sprig of some unfamiliar plant, her violet eyes examining it closely.

"The herbs around here have unusual properties. Your uncle knew why." She tucks it carefully into her pouch. "The ley lines beneath this town create unique growing conditions. Most people don't notice, but the plants know."`,

                `Vessa's pale fingers trace symbols in the air as she speaks, leaving faint trails of light.

"I've been studying transformation magic. Fascinating field." Her knowing smile deepens. "The body is just a vessel, after all. What we are is far more... malleable than most realize."`
            ],
            desireHint: [
                `Vessa gazes at her reflection in a polished brass dish, something wistful in her expression.

"Size matters little when you have knowledge. Still, I wonder sometimes..." She tilts her head, studying her angular features. "What it would be like to be overlooked. To move through crowds like a shadow."`
            ]
        },
        barret: {
            regular: [
                `Barret wipes down the bar with practiced efficiency, her red curls bouncing with each movement.

"Business is good! Evenings are always packed." She gestures at the tables. "The farmers come in after sunset, the merchants stay till midnight, and there's always someone wanting 'just one more.' I love it."`,

                `Barret's cheerful expression softens as she polishes a glass.

"Your uncle used to drink here. Quiet man, but interesting." She holds the glass up to the light. "He'd sit in that corner booth for hours, sketching in his notebooks. Never caused trouble. Always tipped well."`
            ],
            desireHint: [
                `Barret leans on the bar, adjusting her low-cut blouse with a knowing look.

"I like my curves, but wouldn't mind a bigger bust. More to show off, you know?" She laughs warmly. "Tips are good, but they could be better. A girl's gotta use what she's got in this business."`
            ]
        },
        della: {
            regular: [
                `Della shapes a loaf with her flour-dusted hands, moving with decades of muscle memory.

"Baking is my life! Started when I was just a girl." Her warm brown eyes crinkle with the memory. "My grandmother taught me. Said bread was love made edible. I've been making love ever since."`,

                `Della's eyes go misty as she slides a tray into the oven.

"Your uncle loved my honey cakes. I still make them." She wipes her eyes with her apron. "Every week, I make a batch. Sometimes I leave one on the workshop doorstep. Old habits."`
            ],
            desireHint: [
                `Della stretches her arms, grimacing slightly at the stiffness.

"I'm not as strong as I used to be. All that kneading takes a toll!" She rubs her shoulder ruefully. "Used to make fifty loaves before breakfast. Now I have to pace myself. Getting old isn't for the faint of heart."`
            ]
        },
        lenna: {
            regular: [
                `Lenna adjusts her reading glasses, surrounded by towering stacks of ancient tomes.

"The library has so many secrets. Books your uncle donated especially." She runs a reverent finger along a spine. "There's a whole section in a language I can't identify. The pages feel... warm. I've been trying to translate them for years."`,

                `Lenna's cheeks flush pink as she speaks, her voice dropping to a whisper.

"Reading about transformation magic... purely academic interest, of course." She adjusts her glasses nervously. "There's a whole collection on body modification in the restricted section. Very... detailed illustrations."`
            ],
            desireHint: [
                `Lenna struggles to lift a massive leather-bound volume, her thin arms trembling.

"I wish I was stronger. These heavy tomes are difficult to shelve." She finally gets it onto the cart with a grunt. "Some of these books weigh as much as I do. The archival section is becoming a physical challenge."`
            ]
        },
        holt: {
            regular: [
                `Holt stands at attention even during casual conversation, her guard uniform immaculate.

"Town's been quiet. That's how I like it." Her steel-grey eyes scan the street from habit. "Quiet means everyone's safe. Means I'm doing my job right. Chaos is for other towns."`,

                `Holt's stern expression softens almost imperceptibly.

"Your uncle helped me once. Asked nothing in return." She clears her throat. "I was... struggling. With something personal. He just listened. Didn't judge. Said there were ways to change what needed changing. Never forgot that."`
            ],
            desireHint: [
                `Holt's rigid posture loosens just slightly, something uncertain in her eyes.

"Discipline keeps us strong. But sometimes I wonder about other paths." She looks at her calloused hands. "I've been a soldier since I was sixteen. Don't know who I'd be without the uniform. Not sure I want to find out."`
            ]
        },
        fiona: {
            regular: [
                `Fiona leans against a wall, her wary eyes constantly scanning for threats.

"I manage. It's not so bad if you know where to look." She shrugs her thin shoulders. "The bakery throws out day-old bread at dawn. The tavern's scraps aren't bad if you're quick. You learn to survive."`,

                `Fiona's guarded expression cracks, something raw showing through.

"Your uncle gave me food sometimes. Didn't treat me like trouble." She scuffs her worn boot on the cobblestones. "Most people see the dirt and the clothes and decide I'm worthless. He saw... I don't know. Something else."`
            ],
            desireHint: [
                `Fiona wraps her arms around herself, looking suddenly smaller.

"Wish I wasn't so scrawny. People don't take me seriously." Her voice hardens. "Merchants shoo me away before I can even speak. Guards assume I'm stealing even when I'm not. Being small means being invisible, or a target."`
            ]
        },
        corwin: {
            regular: [
                `Corwin adjusts one of her many rings, her merchant's smile perfectly practiced.

"Trade routes are profitable if you know the right people." She winks conspiratorially. "It's not about what you're selling, it's about who you're selling to. Connections are the real currency in this business."`,

                `Corwin preens slightly, checking her reflection in a polished button.

"Looking good is half of business. First impressions matter." She smooths her colorful traveling coat. "People want to buy from someone who looks successful. Dress like a beggar, get treated like one. Dress like a king..."`,

                `Corwin's charming facade slips just for a moment, revealing genuine curiosity beneath.

"Your uncle bought some unusual items from me. Paid well, asked no questions." She lowers her voice. "I've dealt in strange goods before, but his requests were... unique. Components I've never seen asked for together. Made me curious."`
            ],
            desireHint: []
        },
        mrs_thornwick: {
            regular: [
                `Mrs. Thornwick folds her hands in her lap, the weight of responsibility evident in her bearing.

"Running a town is no small task. Everyone has needs." She sighs delicately. "The farmers want lower taxes, the merchants want better roads, the guards want higher pay. Balancing it all is an art form."`,

                `Mrs. Thornwick's formal demeanor softens almost imperceptibly.

"Your uncle was... unconventional. But he helped this town more than most know." She pauses. "The harvest blight three years ago? The well that never runs dry? The children who recovered from the fever? He never asked for credit."`
            ],
            desireHint: [
                `Mrs. Thornwick touches her carefully styled hair, checking that it's still perfect.

"I try to stay presentable. Dignity matters in my position." Her voice carries a hint of something deeper. "A mayor must be above reproach. Above gossip. Above... personal indulgences. The town watches everything I do."`
            ]
        }
    };

    for (const [npcId, chats] of Object.entries(NPC_CHATS)) {
        // Create a generic chat scene that picks randomly
        SCENES[`${npcId}_chat`] = {
            id: `${npcId}_chat`,
            image: '',
            text: '',
            speaker: getNpcDisplayName(npcId),
            _npcId: npcId,  // Store for access in onEnter
            _chatData: chats,  // Store chat data directly to avoid closure issues
            onEnter: function() {
                const thisNpcId = this._npcId;
                try {
                    this.image = getNpcImagePath(thisNpcId);
                    const chatData = this._chatData;
                    if (!chatData) {
                        console.error(`No chat data for ${thisNpcId}`);
                        this.text = "...";
                        this.actions = [{ label: 'Leave', callback: () => SceneManager.playScene(`location_${getNpcLocation(thisNpcId)}`) }];
                        return;
                    }
                    const trust = gameState.npcs[thisNpcId]?.trust || 0;
                    const thresholds = getNpcTrustThresholds(thisNpcId);

                    // Build available chat pool - desire hints only shown at sufficient trust AND before desire is known
                    let availableChats = [...(chatData.regular || [])];
                    const npcDataForPool = gameState.npcs[thisNpcId];
                    const desireAlreadyKnown = npcDataForPool?.desireKnownToPlayer || npcDataForPool?.desireRevealed || npcDataForPool?.desiresRevealed?.some(r => r === true);
                    if (trust >= thresholds.desireReveal && chatData.desireHint && chatData.desireHint.length > 0 && !desireAlreadyKnown) {
                        availableChats = [...availableChats, ...chatData.desireHint];
                        // Ensure NPC has a desire generated when they meet desireReveal threshold
                        // This fixes the issue where NPCs have no desire on day 1
                        try {
                            const ensuredDesire = ensureNpcHasDesire(thisNpcId);
                        } catch (e) {
                            console.error(`Error ensuring desire for ${thisNpcId}:`, e);
                        }
                    }

                    const randomChat = availableChats[Math.floor(Math.random() * availableChats.length)] || "...";
                    let chatText = randomChat;

                    // Check for desire reveal - show the rich jealousy dialogue if available
                    try {
                        const npcData = gameState.npcs[thisNpcId];
                        // Check new system flags, jealousy events, AND legacy desiresRevealed array
                        const legacyRevealed = npcData?.desiresRevealed?.some(r => r === true);
                        const alreadyKnown = npcData?.desireKnownToPlayer || npcData?.desireRevealed || legacyRevealed;
                        if (npcData?.currentDesire && !alreadyKnown && canRevealDesire(thisNpcId)) {
                            const revealDialogue = revealNpcDesireToPlayer(thisNpcId);
                            if (revealDialogue) {
                                // Replace the random chat with the desire reveal dialogue
                                // Note: revealNpcDesireToPlayer() already updates the desire tracker
                                chatText = revealDialogue;
                            }
                        }
                    } catch (e) {
                        console.error(`Error in desire reveal for ${thisNpcId}:`, e);
                    }

                    // 40% chance to append a body comment on regular chats (not desire reveals)
                    if (chatText === randomChat && Math.random() < 0.4) {
                        const bodyComment = getPlayerBodyComment(thisNpcId);
                        if (bodyComment) chatText += `\n\n${bodyComment}`;
                    }

                    this.text = chatText + "\n\n(+1 Trust)";

                    // Check for jealousy event trigger (25% chance after Mira Day 3)
                    // Skip if desire is already known — the jealousy scene is only for reveals,
                    // and the chat above may have just revealed it (preventing double reveal)
                    const desireNowKnown = gameState.npcs[thisNpcId]?.desireKnownToPlayer;
                    if (!desireNowKnown && shouldTriggerJealousyEvent(thisNpcId)) {
                        const eventData = getJealousyEventData(thisNpcId);
                        if (eventData) {
                            // Set up the jealousy scene
                            SCENES['jealousy_npc_enters']._observer = thisNpcId;
                            SCENES['jealousy_npc_enters']._entering = eventData.entering;
                            SCENES['jealousy_npc_enters']._returnScene = `location_${getNpcLocation(thisNpcId)}`;

                            this.actions = [
                                { label: 'Continue', nextScene: 'jealousy_npc_enters' }
                            ];
                            return;
                        }
                    }

                    // Normal chat flow
                    this.actions = [
                        { label: 'Continue', callback: () => SceneManager.playScene(`location_${getNpcLocation(thisNpcId)}`) }
                    ];
                } catch (e) {
                    console.error(`Error in ${thisNpcId}_chat onEnter:`, e);
                    this.text = `Chat error. Please report this issue.`;
                    this.actions = [{ label: 'Return', callback: () => SceneManager.playScene(`location_${getNpcLocation(thisNpcId)}`) }];
                }
            },
            actions: []
        };
    }
}

// Generate chat scenes
generateNpcChatScenes();

function generateNpcInviteScenes() {
    for (const npcId of Object.keys(NPC_TRUST_THRESHOLDS)) {
        SCENES[`${npcId}_invite_workshop`] = {
            id: `${npcId}_invite_workshop`,
            image: '',
            text: '',
            speaker: getNpcDisplayName(npcId),
            onEnter: function() {
                this.image = getNpcImagePath(npcId);
                const name = getNpcDisplayName(npcId);
                const npc = gameState.npcs[npcId];

                const currentDesire = npc?.currentDesire;

                // Check if visit is already scheduled - but allow re-invite if they have an active desire
                const visitScheduled = gameState.flags[`${npcId}_workshop_visit_scheduled`];
                if (visitScheduled && !currentDesire) {
                    this.text = `${name} smiles. "I'm already planning to visit your workshop soon. I'll come by when I have a chance!"`;
                    this.actions = [{ label: 'Okay', callback: () => SceneManager.playScene(`location_${getNpcLocation(npcId)}`) }];
                    return;
                }

                if (!currentDesire) {
                    this.text = `${name} doesn't have a specific transformation goal right now.`;
                    this.actions = [{ label: 'Okay', callback: () => SceneManager.playScene(`location_${getNpcLocation(npcId)}`) }];
                    return;
                }

                // Build dialogue based on whether they have an archetype or active desire
                const hasArchetype = npc.hiddenArchetype;
                if (hasArchetype) {
                    const archName = typeof hasArchetype === 'string'
                        ? (BODY_ARCHETYPES[hasArchetype]?.name || hasArchetype)
                        : hasArchetype.name;
                    const desireLabel = currentDesire?.label || `the ${archName} look`;
                    this.text = `You offer to help ${name} continue working toward ${desireLabel.toLowerCase()}.\n\n*${name}'s eyes light up.*\n\n"Yes! I'd love to come by the workshop."`;
                } else if (currentDesire && currentDesire.label) {
                    this.text = `You mention your workshop's capabilities. ${name}'s eyes light up.\n\n"You could really help with that? I've been wanting ${currentDesire.label.toLowerCase()}..."\n\n*${name} looks hopeful.*\n\n"Would you... could I come by sometime?"`;
                }

                // Check if transformation requires aether (growth = need 2 aether)
                const needsGrowth = currentDesire && currentDesire.target > (npc.body?.[currentDesire.stat] ?? 0);
                const hasEnoughAether = (gameState.player.aether || 0) >= 2;
                const canInvite = !needsGrowth || hasEnoughAether;

                this.actions = [
                    {
                        label: "Let's go now",
                        disabled: !canInvite,
                        disabledReason: !canInvite ? 'Not enough Aether' : null,
                        effects: [{ type: 'setFlag', flag: `${npcId}_workshop_visit_scheduled`, value: true }],
                        callback: () => {
                            gameState.flags[`${npcId}_workshop_visit_scheduled`] = true;
                            gameState.flags[`${npcId}_workshop_visit_triggered`] = false;
                            saveState();
                            SceneManager.playScene('workshop_main');
                        }
                    },
                    {
                        label: 'Not right now',
                        callback: () => SceneManager.playScene(`location_${getNpcLocation(npcId)}`)
                    }
                ];
            },
            actions: []
        };
    }
}

generateNpcInviteScenes();

// Helper to add scenes to a pool
function addToPool(poolId, sceneId) {
    if (! SceneManager.scenePools[poolId]) {
        SceneManager.scenePools[poolId] = [];
    }
    SceneManager.scenePools[poolId].push(sceneId);
}

// ============================================
// SEX SCENES
// ============================================

// Helper to get genital-specific scene text
function getSexSceneText(npcId, textsByCombo) {
    const combo = getGenitalCombination(npcId);
    return textsByCombo[combo] || textsByCombo['vv'];
}

// ============================================
// MIRA SEX SCENES
// ============================================

// ==========================================
// PROGRESSION GATING SCENES
// ==========================================

SCENES['mira_progression_tier1_choice'] = {
    id: 'mira_progression_tier1_choice',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        this.text = "Mira bursts into the workshop with a knowing grin.\n\n\"So... you and Fiona, huh?\" She waggles her eyebrows. \"I knew it. You two were practically radiating tension.\"\n\nShe hops up onto a workbench, swinging her legs. \"Anyway, I've been talking to some of the other townsfolk. A few of them are... curious about what you can do. Interested in your services, if you know what I mean.\"\n\nShe holds up two fingers. \"I can introduce you to two of them right now. Your pick:\"\n\nShe counts off on her fingers. \"There's Corwin — the charming merchant who's always showing off — and Vessa, the herbalist. She's mysterious, hard to read, but I can tell she's intrigued.\"\n\n\"Or... Barret, the bold tavern owner — she'll keep you on your toes — and Della, the sweet baker. She's shy about it but definitely interested.\"\n\n\"So what'll it be, boss?\"";
    },
    actions: [
        {
            label: 'Corwin and Vessa',
            nextScene: 'mira_progression_tier1_cv'
        },
        {
            label: 'Barret and Della',
            nextScene: 'mira_progression_tier1_bd'
        }
    ]
};

SCENES['mira_progression_tier1_cv'] = {
    id: 'mira_progression_tier1_cv',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        advanceTier('corwin_vessa');
        this.text = "\"Corwin and Vessa it is!\" Mira claps her hands together. \"Good choice. Corwin's been dying to meet you properly — he's been asking around about you for days. And Vessa... well, Vessa doesn't ask about anyone, so the fact that she mentioned you is basically a declaration of love.\"\n\nShe slides off the workbench. \"I'll let them know you're interested. Go find them around town — Corwin's usually at the market or tavern, and Vessa's at her herbalist shop.\"\n\nShe winks on her way out. \"Have fun, boss!\"";
    },
    actions: [
        {
            label: 'Continue',
            nextScene: 'workshop_main'
        }
    ]
};

SCENES['mira_progression_tier1_bd'] = {
    id: 'mira_progression_tier1_bd',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        advanceTier('barret_della');
        this.text = "\"Barret and Della! Great picks!\" Mira grins. \"Barret's been asking if you ever come by the tavern after hours. She's not exactly subtle about it. And Della... oh, Della's been baking extra pastries 'just in case you stop by.' She's adorable.\"\n\nShe slides off the workbench. \"I'll let them know you're open for business. Barret's at the tavern, obviously, and Della's at her bakery.\"\n\nShe winks on her way out. \"Have fun, boss!\"";
    },
    actions: [
        {
            label: 'Continue',
            nextScene: 'workshop_main'
        }
    ]
};

SCENES['mira_progression_unlock'] = {
    id: 'mira_progression_unlock',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        // Read tier BEFORE advanceTier() — advance mutates this value
        const tier = gameState.progression.tier;

        if (tier === 1) {
            // Unlocking the unchosen pair (tier 1 → 1b)
            const otherChoice = gameState.progression.tier1Choice === 'corwin_vessa' ? 'barret_della' : 'corwin_vessa';
            const names = otherChoice === 'corwin_vessa'
                ? 'Corwin and Vessa'
                : 'Barret and Della';
            advanceTier();
            this.text = `Mira strolls into the workshop looking pleased with herself.\n\n"Word's getting around about you, boss. People are talking." She grins. "And by 'people' I mean ${names}. They've been asking about you."\n\nShe leans against the doorframe. "I've been talking you up, naturally. They're ready to meet you properly. Go say hello!"\n\nShe waves as she leaves. "You're becoming quite popular around here!"`;
        } else if (tier === 1.5) {
            // Unlocking Aldric + Lenna (tier 1b → 2)
            advanceTier();
            this.text = "Mira arrives at the workshop with a more thoughtful expression than usual.\n\n\"So boss, you've been making quite the impression around town.\" She pauses. \"There are two more people I think you should meet. They're... different from the others.\"\n\nShe holds up a finger. \"Aldric — the blacksmith. Gruff, stubborn, all muscles and metal. Not exactly the chatty type. But I've seen the way she looks at the things you've made.\"\n\nAnother finger. \"And Lenna, the librarian. Shy as a mouse, but she's been reading your uncle's old journals. She knows more about what you do than she lets on.\"\n\nMira smiles. \"They won't come to you easily. But that's what makes it interesting, right?\"";
        } else if (tier === 2) {
            // Unlocking Mrs. Thornwick + Holt (tier 2 → 3)
            advanceTier();
            this.text = "Mira enters the workshop and closes the door behind her — unusual for her.\n\n\"Okay boss, this is the big league.\" Her voice is quieter than normal. \"Mrs. Thornwick and Holt. The Town Elder and the guard captain.\"\n\nShe crosses her arms. \"These two have walls up that make Aldric look like an open book. Mrs. Thornwick runs this town with a diplomatic smile and an iron will. Holt... well, Holt's been through things she doesn't talk about.\"\n\nMira meets your eyes. \"They're the last ones. The hardest to reach, but also...\" She trails off, then smirks. \"Let's just say the ones with the most to discover about themselves.\"\n\nShe heads for the door. \"Good luck, boss. You'll need it.\"";
        }
    },
    actions: [
        {
            label: 'Continue',
            nextScene: 'workshop_main'
        }
    ]
};

SCENES['mira_sex_hint'] = {
    id: 'mira_sex_hint',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        const hint = getNextMiraHint();
        if (hint) {
            applyMiraHint(hint);
            this.text = `Mira pops into the workshop with that look on her face — the one that means she's about to meddle.\n\n${hint.framing}\n\n${hint.punchline}`;
        } else {
            // Fallback — no hint needed, redirect to delivery/transformation
            SceneManager.playScene('mira_delivery_event');
            return 'redirect';
        }
    },
    actions: [
        {
            label: 'Continue',
            nextScene: 'workshop_main'
        }
    ]
};

// ==========================================
// BRUSH-OFF SCENES (Locked NPCs)
// ==========================================

(function registerBrushOffScenes() {
    const lockableNpcs = ['fiona', 'vessa', 'barret', 'corwin', 'della', 'lenna', 'aldric', 'mrs_thornwick', 'holt'];
    for (const npcId of lockableNpcs) {
        SCENES[`npc_brushoff_${npcId}`] = {
            id: `npc_brushoff_${npcId}`,
            image: '',
            speaker: '',
            text: '',
            onEnter: function() {
                this.image = getNpcImagePath(npcId);
                this.speaker = getNpcDisplayName(npcId);
                this.text = NPC_BRUSHOFF_TEXT[npcId] || '';
                this.actions = [
                    {
                        label: 'Leave',
                        nextScene: `location_${gameState.currentLocation || 'square'}`
                    }
                ];
            },
            actions: []
        };
    }
})();

SCENES['mira_workshop_random_visit'] = {
    id: 'mira_workshop_random_visit',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        // Determine greeting type
        const greeting = getMiraGreetingType();

        switch(greeting.type) {
            case 'player_body':
                SceneManager.playScene('mira_greet_player_body');
                break;
            case 'vendor_info':
                gameState.currentVendorReveal = greeting.vendor;
                SceneManager.playScene('mira_reveal_vendor');
                break;
            case 'offers_sex':
                SceneManager.playScene('mira_offer_intimacy');
                break;
            default:
                SceneManager.playScene('mira_greet_player_body');
        }
        return 'redirect';
    },
    actions: []
};

SCENES['mira_greet_player_body'] = {
    id: 'mira_greet_player_body',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');

        const bodyComment = getPlayerBodyComment('mira');
        const phrase = bodyComment || `{mira}"Hey boss! How are the transformations going?"`;

        this.text = `Mira pokes her head into the workshop with a bright smile.

${phrase}

She steps inside, looking around at the devices with familiar curiosity.

{mira}"Just thought I'd pop in and see how you're doing. Anything exciting happening?"`;
    },
    actions: [
        { label: '"Just the usual experiments."', nextScene: 'mira_greet_chat' }
    ]
};

SCENES['mira_greet_chat'] = {
    id: 'mira_greet_chat',
    image: '',
    speaker: 'Mira',
    text: `She nods, wandering around the workshop with her usual energy.

"Experiments, huh? Anything I can help with, boss? You know I'm always willing to be your test subject..."

She wiggles her eyebrows playfully, then laughs.

"Anyway, I should probably get back to my route. Just wanted to check in!"`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        gameState.npcs.mira.trust += 2;
        saveState();
    },
    actions: [
        { label: '"Thanks for stopping by."', nextScene: 'workshop_main' }
    ]
};

SCENES['mira_reveal_vendor'] = {
    id: 'mira_reveal_vendor',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');

        const vendorId = gameState.currentVendorReveal;
        const item = VENDOR_ITEMS[vendorId];

        if (!item) {
            this.text = "Mira waves hello but seems distracted.\n\n\"Just passing through! See you later!\"";
            return;
        }

        revealVendorItem(vendorId);

        const vendorNames = {
            bakery: 'Della at the bakery',
            tavern: 'Barret at the tavern',
            herbalist: 'Vessa at the herbalist shop',
            blacksmith: 'Aldric at the blacksmith',
            square: 'Corwin at his stall in the square'
        };

        this.text = `Mira rushes in with an excited look.

"I found another Aether source for you!"

She catches her breath.

"${vendorNames[vendorId]} is selling something called '${item.name}' - it costs ${item.price} coin, but it's infused with magical energy!"

She grins.

"Buy it, bring it back here, and you can extract 2 Aether into your crystal cube. Not bad, right?"`;
    },
    actions: [
        { label: '"Thanks for the tip!"', nextScene: 'workshop_main' }
    ]
};

SCENES['mira_offer_intimacy'] = {
    id: 'mira_offer_intimacy',
    image: '',
    speaker: 'Mira',
    text: `Mira slips into the workshop, closing the door behind her with unusual care. Her expression is warm, inviting.

"Hey... I was thinking. We spend a lot of time together, and I really like you."

She steps closer, voice soft.

"Maybe we could... take a break from all the transformation stuff? Just the two of us?"`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
    },
    actions: [
        {
            label: '"I\'d like that."',
            nextScene: 'mira_sex_entry',
            condition: () => SCENES['mira_sex_entry'] !== undefined
        },
        { label: '"Maybe another time."', nextScene: 'workshop_main' }
    ]
};

// ============================================
// AETHER EXTRACTION SCENE
// ============================================

SCENES['workshop_extract_aether'] = {
    id: 'workshop_extract_aether',
    image: 'images/locations/workshop.webp',
    speaker: '',
    text: '',
    onEnter: function() {
        const count = gameState.aetherContainers || 0;
        const result = extractAetherContainers();

        if (result.success) {
            const itemWord = result.extracted === 1 ? 'item' : 'items';
            this.text = `You place the Aether-infused ${itemWord} near the crystal cube. The extraction apparatus hums to life, drawing wisps of glowing energy from the ${itemWord}.

The crystal cube pulses brighter as it absorbs the Aether, its facets shimmering with renewed power.

Extracted ${result.extracted} ${itemWord} for +${result.aetherGained} Aether!

The crystal cube now holds ${gameState.player.aether} Aether.`;
        } else {
            this.text = "The workshop awaits...";
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// ============================================
// JEALOUSY EVENT SCENES
// ============================================

// Generic jealousy event that can be triggered during NPC chats
SCENES['jealousy_npc_enters'] = {
    id: 'jealousy_npc_enters',
    image: '',
    speaker: '',
    text: '',
    // This scene is set up by the trigger function before playing
    // _observer, _entering, and _returnScene should be set
    onEnter: function() {
        const observerId = this._observer;
        const enteringId = this._entering;
        const returnScene = this._returnScene || 'town_navigation';

        if (!observerId || !enteringId) {
            this.text = "Something seems off...";
            this.actions = [{ label: 'Continue', nextScene: returnScene }];
            return;
        }

        const observer = gameState.npcs[observerId];
        const desire = observer?.currentDesire;

        if (!desire) {
            this.text = "The moment passes...";
            this.actions = [{ label: 'Continue', nextScene: returnScene }];
            return;
        }

        const eventData = getJealousyEventData(observerId);

        this.image = getNpcImagePath(observerId);

        const pronoun = observer.body.genitalia === 0 ? 'her' : 'his';
        const Pronoun = pronoun.charAt(0).toUpperCase() + pronoun.slice(1);

        let text = `*${eventData.enteringName} ${eventData.entranceText}.*\n\n`;
        text += `You notice ${eventData.observerName}'s eyes tracking ${eventData.enteringName}'s ${eventData.bodyPart} as ${eventData.enteringName.split(' ')[0]} passes. `;

        if (eventData.canReveal) {
            text += `There's obvious longing in that gaze.\n\n`;
            text += eventData.revealText;

            this.speaker = eventData.observerName;

            // Reveal desire and grant trust automatically
            gameState.npcs[observerId].trust += 2;
            observer.desireKnownToPlayer = true;
            if (typeof UI !== 'undefined' && UI.updateDesireTracker) {
                UI.updateDesireTracker();
            }
            saveState();

            this.actions = [
                { label: 'Continue', nextScene: returnScene }
            ];
        } else {
            text += `There's a flash of something in ${eventData.observerName}'s expression - envy, perhaps?*\n\n`;
            text += `*${Pronoun} quickly looks away, but you caught that glance.*`;

            this.actions = [
                { label: 'Continue', nextScene: returnScene }
            ];
        }

        this.text = text;
    },
    actions: []
};

// ==========================================
// RIVALRY EVENT SCENES
// ==========================================

// Rivalry discovery scene - when two NPCs are first seen competing
SCENES['rivalry_discovery'] = {
    id: 'rivalry_discovery',
    image: 'images/locations/tavern.webp',
    speaker: '',
    text: '',
    onEnter: function() {
        const rivalryEvent = checkRivalryEvent();
        if (!rivalryEvent || rivalryEvent.type !== 'discovery') {
            this.text = "Nothing unusual happening...";
            this.actions = [{ label: 'Continue', nextScene: 'location_tavern' }];
            return;
        }

        const rivalry = rivalryEvent.rivalry;
        this.text = rivalry.text.discovery;
        this._rivalry = rivalry;

        // Mark as discovered
        markRivalryDiscovered(rivalry.id);

        this.actions = [
            { label: 'This could be interesting...', nextScene: 'location_tavern' }
        ];
    },
    actions: []
};

// Rivalry resolution scene - when one NPC wins or they tie
SCENES['rivalry_resolution'] = {
    id: 'rivalry_resolution',
    image: 'images/locations/tavern.webp',
    speaker: '',
    text: '',
    onEnter: function() {
        const rivalryEvent = checkRivalryEvent();
        if (!rivalryEvent || rivalryEvent.type === 'discovery') {
            this.text = "Nothing unusual happening...";
            this.actions = [{ label: 'Continue', nextScene: 'location_tavern' }];
            return;
        }

        const rivalry = rivalryEvent.rivalry;
        this.text = getRivalryEventText(rivalryEvent.type, rivalry);
        this._rivalry = rivalry;

        // Mark as resolved
        markRivalryResolved(rivalry.id);

        this.actions = [
            { label: 'Continue', nextScene: 'location_tavern' }
        ];
    },
    actions: []
};

// ==========================================
// SUPPORT EVENT SCENES
// ==========================================

// Support event - one NPC encourages player to help another
SCENES['support_event'] = {
    id: 'support_event',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        const event = checkSupportEvent();
        if (!event) {
            this.text = "Nothing unusual happening...";
            this.actions = [{ label: 'Continue', nextScene: 'location_tavern' }];
            return;
        }

        const supporter = event.supporter;
        this.image = getNpcImagePath(supporter);
        this.speaker = getNpcDisplayName(supporter);
        this.text = event.text;
        this._supportEvent = event;

        // Mark as seen
        markSupportEventSeen(event.id);

        this.actions = [
            {
                label: '"I\'ll see what I can do."',
                callback: function() {
                    gameState.npcs[supporter].trust += 2;
                    saveState();
                    UI.updatePlayerSidebar();
                    SceneManager.playScene('location_tavern');
                }
            },
            { label: '"That\'s none of my business."', nextScene: 'location_tavern' }
        ];
    },
    actions: []
};

// Support followup - when player helped after a support event
SCENES['support_followup'] = {
    id: 'support_followup',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        // This scene is triggered dynamically when appropriate
        const followupData = this._followupData;
        if (!followupData) {
            this.text = "Nothing to report...";
            this.actions = [{ label: 'Continue', nextScene: 'location_tavern' }];
            return;
        }

        this.image = getNpcImagePath(followupData.supporter);
        this.speaker = getNpcDisplayName(followupData.supporter);
        this.text = followupData.text;

        this.actions = [
            { label: 'Continue', nextScene: 'location_tavern' }
        ];
    },
    actions: []
};

// ==========================================
// REGRET EVENT SCENES
// ==========================================

// Regret event - NPC expresses regret about over-transformation
SCENES['regret_event'] = {
    id: 'regret_event',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        // This scene is triggered dynamically with _regretData set
        const regretData = this._regretData;
        if (!regretData) {
            this.text = "Nothing unusual...";
            this.actions = [{ label: 'Continue', nextScene: 'workshop_main' }];
            return;
        }

        const npcId = regretData.npcId;
        this.image = getNpcImagePath(npcId);
        this.speaker = getNpcDisplayName(npcId);
        this.text = regretData.text;

        // Mark as seen
        markRegretSeen(npcId, regretData.stat);

        // Create action to help them
        const statName = getStatDisplayName(regretData.stat, true);
        const targetValue = regretData.targetValue;

        this.actions = [
            {
                label: `"Let's fix this."`,
                callback: function() {
                    // Set their desire to shrink to target
                    gameState.npcs[npcId].currentDesire = {
                        stat: regretData.stat,
                        target: targetValue,
                        direction: 'shrink',
                        reason: 'regret'
                    };
                    gameState.npcs[npcId].trust += 3;
                    saveState();
                    UI.updatePlayerSidebar();
                    showNotification(`${getNpcDisplayName(npcId)} trusts you more for understanding.`);
                    SceneManager.playScene('workshop_main');
                }
            },
            {
                label: `"You look great as you are."`,
                callback: function() {
                    gameState.npcs[npcId].trust += 1;
                    saveState();
                    showNotification(`${getNpcDisplayName(npcId)} smiles weakly but doesn't seem convinced.`);
                    SceneManager.playScene('workshop_main');
                }
            }
        ];
    },
    actions: []
};

// ==========================================
// INTEGRATION HELPER FUNCTIONS
// ==========================================

// Check for special events when entering a location
function checkSpecialEvents(locationId) {
    // Check rivalry events (primarily at tavern where people gather)
    if (locationId === 'tavern' && getPhaseRoll('loc_rivalry', 0.15)) {
        const rivalryEvent = checkRivalryEvent();
        if (rivalryEvent) {
            if (rivalryEvent.type === 'discovery') {
                return { type: 'rivalry_discovery', event: rivalryEvent };
            } else {
                return { type: 'rivalry_resolution', event: rivalryEvent };
            }
        }
    }

    // Check support events (at tavern or square)
    if ((locationId === 'tavern' || locationId === 'square') && getPhaseRoll('loc_support_' + locationId, 0.10)) {
        const supportEvent = checkSupportEvent();
        if (supportEvent) {
            return { type: 'support', event: supportEvent };
        }
    }

    return null;
}

// Check for regret events during NPC interactions
function checkNpcRegretEvent(npcId) {
    const npc = gameState.npcs[npcId];
    if (!npc) return null;

    // Check each stat for potential regret
    const stats = ['chest', 'butt', 'muscle'];
    for (const stat of stats) {
        const regret = checkRegretEvent(npcId, stat);
        if (regret) {
            return regret;
        }
    }
    return null;
}

// Integrate rivalry/support/regret checks into location scenes
function integrateSpecialEventIntoLocation(locationId, defaultScene) {
    const specialEvent = checkSpecialEvents(locationId);
    if (specialEvent) {
        switch (specialEvent.type) {
            case 'rivalry_discovery':
                return 'rivalry_discovery';
            case 'rivalry_resolution':
                return 'rivalry_resolution';
            case 'support':
                // Set up support event data
                SCENES['support_event']._supportEventData = specialEvent.event;
                return 'support_event';
        }
    }
    return defaultScene;
}

// ==========================================
// VENDOR BROWSE SHOP SCENES
// ==========================================
// Connect broken "browse" buttons to existing Mira-revealed vendor item system

SCENES['blacksmith_shop'] = {
    id: 'blacksmith_shop',
    image: 'images/locations/blacksmith.webp',
    speaker: '',
    text: '',
    onEnter: function() {
        const result = getVendorBrowseResult('blacksmith');
        if (result.hasItem) {
            const item = result.item;
            const isFree = isVendorItemFree('blacksmith');
            if (isFree) {
                this.text = `Among the metal scraps and tools, you spot the familiar glow of aether.\n\n"${item.name}" - ${item.description}\n\nAldric notices you looking and nods toward it.`;
                this.actions = [
                    { label: 'Take it (Free)', nextScene: 'vendor_purchase_blacksmith' },
                    { label: 'Not today', nextScene: 'location_blacksmith' }
                ];
            } else {
                this.text = `Among the metal scraps and tools, something unusual catches your eye.\n\n"${item.name}" - ${item.description}\n\nPrice: ${item.price} coin`;
                this.actions = [
                    {
                        label: `Buy (${item.price} coin)`,
                        nextScene: 'vendor_purchase_blacksmith',
                        condition: () => gameState.player.coin >= item.price
                    },
                    { label: 'Not today', nextScene: 'location_blacksmith' }
                ];
            }
        } else {
            this.text = "You browse Aldric's inventory. Hammers, tongs, horseshoes, nails... nothing unusual catches your eye today.";
            this.actions = [{ label: 'Continue', nextScene: 'location_blacksmith' }];
        }
    },
    actions: []
};

SCENES['vendor_purchase_blacksmith'] = {
    id: 'vendor_purchase_blacksmith',
    image: 'images/locations/blacksmith.webp',
    speaker: 'Aldric',
    text: '',
    onEnter: function() {
        const result = purchaseVendorItem('blacksmith');
        if (result.success) {
            this.text = result.wasFree ? result.item.freeText : result.item.purchaseText;
        } else {
            this.text = `*${result.message}*`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'location_blacksmith' }
    ]
};

SCENES['herbalist_shop'] = {
    id: 'herbalist_shop',
    image: 'images/locations/herbalist.webp',
    speaker: '',
    text: '',
    onEnter: function() {
        const result = getVendorBrowseResult('herbalist');
        if (result.hasItem) {
            const item = result.item;
            const isFree = isVendorItemFree('herbalist');
            if (isFree) {
                this.text = `Among the dried herbs and mysterious bottles, you spot the familiar glow of aether.\n\n"${item.name}" - ${item.description}\n\nVessa notices you looking and gestures toward it.`;
                this.actions = [
                    { label: 'Take it (Free)', nextScene: 'vendor_purchase_herbalist' },
                    { label: 'Not today', nextScene: 'location_herbalist' }
                ];
            } else {
                this.text = `Among the dried herbs and mysterious bottles, something catches your eye.\n\n"${item.name}" - ${item.description}\n\nPrice: ${item.price} coin`;
                this.actions = [
                    {
                        label: `Buy (${item.price} coin)`,
                        nextScene: 'vendor_purchase_herbalist',
                        condition: () => gameState.player.coin >= item.price
                    },
                    { label: 'Not today', nextScene: 'location_herbalist' }
                ];
            }
        } else {
            this.text = "You browse the shelves of herbs and potions. Dried flowers, strange roots, colorful powders... nothing with that telltale aetheric shimmer today.";
            this.actions = [{ label: 'Continue', nextScene: 'location_herbalist' }];
        }
    },
    actions: []
};

SCENES['vendor_purchase_herbalist'] = {
    id: 'vendor_purchase_herbalist',
    image: 'images/locations/herbalist.webp',
    speaker: 'Vessa',
    text: '',
    onEnter: function() {
        const result = purchaseVendorItem('herbalist');
        if (result.success) {
            this.text = result.wasFree ? result.item.freeText : result.item.purchaseText;
        } else {
            this.text = `*${result.message}*`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'location_herbalist' }
    ]
};

SCENES['square_browse'] = {
    id: 'square_browse',
    image: 'images/locations/square.webp',
    speaker: '',
    text: '',
    onEnter: function() {
        const result = getVendorBrowseResult('square');
        if (result.hasItem) {
            const item = result.item;
            const isFree = isVendorItemFree('square');
            if (isFree) {
                this.text = `Among the exotic wares at Corwin's stall, you spot the familiar glow of aether.\n\n"${item.name}" - ${item.description}\n\nCorwin notices you looking and waves you toward it.`;
                this.actions = [
                    { label: 'Take it (Free)', nextScene: 'vendor_purchase_square' },
                    { label: 'Not today', nextScene: 'location_square' }
                ];
            } else {
                this.text = `Among the exotic wares at Corwin's stall, something unusual catches your eye.\n\n"${item.name}" - ${item.description}\n\nPrice: ${item.price} coin`;
                this.actions = [
                    {
                        label: `Buy (${item.price} coin)`,
                        nextScene: 'vendor_purchase_square',
                        condition: () => gameState.player.coin >= item.price
                    },
                    { label: 'Not today', nextScene: 'location_square' }
                ];
            }
        } else {
            this.text = "You browse Corwin's stall. Fabrics, spices, trinkets, curiosities from far-off lands... but nothing with that telltale magical shimmer today.";
            this.actions = [{ label: 'Continue', nextScene: 'location_square' }];
        }
    },
    actions: []
};

SCENES['vendor_purchase_square'] = {
    id: 'vendor_purchase_square',
    image: 'images/locations/square.webp',
    speaker: 'Corwin',
    text: '',
    onEnter: function() {
        const result = purchaseVendorItem('square');
        if (result.success) {
            this.text = result.wasFree ? result.item.freeText : result.item.purchaseText;
        } else {
            this.text = `*${result.message}*`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'location_square' }
    ]
};

SCENES['bakery_browse'] = {
    id: 'bakery_browse',
    image: 'images/locations/bakery.webp',
    speaker: '',
    text: '',
    onEnter: function() {
        const result = getVendorBrowseResult('bakery');
        if (result.hasItem) {
            const item = result.item;
            const isFree = isVendorItemFree('bakery');
            if (isFree) {
                this.text = `Among the fresh pastries and bread, you spot the familiar glow of aether.\n\n"${item.name}" - ${item.description}\n\nDella notices you looking and smiles warmly.`;
                this.actions = [
                    { label: 'Take it (Free)', nextScene: 'vendor_purchase_bakery' },
                    { label: 'Not today', nextScene: 'location_bakery' }
                ];
            } else {
                this.text = `Among the fresh pastries and bread, something unusual catches your eye.\n\n"${item.name}" - ${item.description}\n\nPrice: ${item.price} coin`;
                this.actions = [
                    {
                        label: `Buy (${item.price} coin)`,
                        nextScene: 'vendor_purchase_bakery',
                        condition: () => gameState.player.coin >= item.price
                    },
                    { label: 'Not today', nextScene: 'location_bakery' }
                ];
            }
        } else {
            this.text = "You browse Della's display cases. Croissants, honey cakes, fresh bread, fruit tarts... all delicious, but nothing with that special magical glow today.";
            this.actions = [{ label: 'Continue', nextScene: 'location_bakery' }];
        }
    },
    actions: []
};

SCENES['vendor_purchase_bakery'] = {
    id: 'vendor_purchase_bakery',
    image: 'images/locations/bakery.webp',
    speaker: 'Della',
    text: '',
    onEnter: function() {
        const result = purchaseVendorItem('bakery');
        if (result.success) {
            this.text = result.wasFree ? result.item.freeText : result.item.purchaseText;
        } else {
            this.text = `*${result.message}*`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'location_bakery' }
    ]
};

SCENES['tavern_browse'] = {
    id: 'tavern_browse',
    image: 'images/locations/tavern.webp',
    speaker: '',
    text: '',
    onEnter: function() {
        const result = getVendorBrowseResult('tavern');
        if (result.hasItem) {
            const item = result.item;
            const isFree = isVendorItemFree('tavern');
            if (isFree) {
                this.text = `Behind the bar, you notice a mug with an unusual shimmer to its contents.\n\n"${item.name}" - ${item.description}\n\nBarret notices you looking and slides it toward you with a grin.`;
                this.actions = [
                    { label: 'Take it (Free)', nextScene: 'vendor_purchase_tavern' },
                    { label: 'Not today', nextScene: 'location_tavern' }
                ];
            } else {
                this.text = `Behind the bar, you notice a mug with an unusual shimmer to its contents.\n\n"${item.name}" - ${item.description}\n\nPrice: ${item.price} coin`;
                this.actions = [
                    {
                        label: `Buy (${item.price} coin)`,
                        nextScene: 'vendor_purchase_tavern',
                        condition: () => gameState.player.coin >= item.price
                    },
                    { label: 'Not today', nextScene: 'location_tavern' }
                ];
            }
        } else {
            this.text = "You look over the drinks on offer. Ales, wines, spirits... nothing with that telltale magical shimmer today.";
            this.actions = [{ label: 'Continue', nextScene: 'location_tavern' }];
        }
    },
    actions: []
};

SCENES['vendor_purchase_tavern'] = {
    id: 'vendor_purchase_tavern',
    image: 'images/locations/tavern.webp',
    speaker: 'Barret',
    text: '',
    onEnter: function() {
        const result = purchaseVendorItem('tavern');
        if (result.success) {
            this.text = result.wasFree ? result.item.freeText : result.item.purchaseText;
        } else {
            this.text = `*${result.message}*`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'location_tavern' }
    ]
};

// ==========================================
// MALE NPC TRANSFORMATION EVENTS
// ==========================================
// Story events that trigger male NPC body changes
// Spaced one week apart: Day 10 (Corwin), Day 17 (Aldric), Day 24 (Holt)

// ==========================================
// CORWIN & VESSA'S BET (Day 10)
// ==========================================

SCENES['story_corwin_bet_intro'] = {
    id: 'story_corwin_bet_intro',
    image: 'images/story/bet_tavern_challenge.webp',
    speaker: '',
    text: `You enter the tavern to find an unusual scene. Corwin and Vessa are seated across from each other, a crowd gathered around them.

*"The terms are simple," Corwin is saying, his charming smirk firmly in place. "First one to get Lord Pemberton to buy them a drink wins."*

Vessa matches his confident grin. {vessa}"And the loser visits the workshop. For a... thorough demonstration of those transformation devices."

*"The GENITAL reshaper, specifically," Corwin clarifies, earning gasps and laughs from the crowd. "Unless you're scared?"*

*"Scared? I've been wanting to try those devices anyway." Vessa leans back. "You're on."*

Lord Pemberton - a notoriously stern, married nobleman - sits at the bar, completely oblivious to the wager about to unfold.`,
    onEnter: function() {
        gameState.flags.story_corwin_bet_started = true;
        saveState();
    },
    actions: [
        { label: 'Watch the competition unfold', nextScene: 'story_corwin_bet_attempt' }
    ]
};

SCENES['story_corwin_bet_attempt'] = {
    id: 'story_corwin_bet_attempt',
    image: 'images/story/bet_tavern_ale.webp',
    speaker: '',
    text: `Corwin approaches first, all charm and wit. Lord Pemberton seems almost amused - until his wife enters the tavern. Her icy glare sends Corwin retreating with his tail between his legs.

Vessa takes her turn, using her mysterious allure to draw the nobleman's attention. She's doing well - he's actually reaching for his coin purse - when Lady Pemberton storms over and dumps a tankard of ale directly over Vessa's head.

*"Keep away from my husband, witch!"*

The tavern erupts in laughter. Corwin is howling. But then someone points out the obvious:

*"Wait - neither of you got a drink bought. You BOTH lost!"*

The laughter dies. Corwin and Vessa stare at each other in dawning horror.

*"The terms were clear," Barret calls out, grinning wickedly. "Loser visits the workshop. You're BOTH losers."*`,
    actions: [
        { label: 'Watch their reaction', nextScene: 'story_corwin_bet_result' }
    ]
};

SCENES['story_corwin_bet_result'] = {
    id: 'story_corwin_bet_result',
    image: 'images/locations/tavern.webp',
    speaker: 'Corwin',
    text: `Corwin's face cycles through denial, bargaining, and finally reluctant acceptance.

"A bet's a bet," *he finally says, though he's gone pale.* "I'm no coward. I'll honor my word."

Vessa, still dripping ale, nods grimly. {vessa}"As will I. Though I admit I'm... curious. I've heard the devices have interesting side effects."

Corwin glances at you. "Workshop keeper. Looks like we'll both be paying you a visit. Soon."

The crowd cheers, already making side bets on what the two will look like afterward.

**(Corwin and Vessa will visit the workshop tomorrow to honor their bet.)**`,
    onEnter: function() {
        gameState.flags.story_corwin_bet_result = true;
        saveState();
    },
    actions: [
        { label: 'This should be interesting...', nextScene: 'location_tavern' }
    ]
};

// Workshop visit scenes - triggered when entering workshop the next day
SCENES['story_corwin_bet_workshop'] = {
    id: 'story_corwin_bet_workshop',
    image: 'images/locations/workshop.webp',
    speaker: '',
    text: `A knock at the workshop door. You open it to find Corwin and Vessa standing together, both looking nervous.

{corwin}"We're here to... honor our bet," Corwin says stiffly.

Vessa elbows him. {vessa}"Don't pretend you're not a little curious."

Corwin glares at her, then sighs. {corwin}"Fine. Maybe a little. Your uncle's devices are legendary, after all."

They enter the workshop, eyeing the various brass contraptions with a mixture of fear and fascination.

{vessa}"So," Vessa says, running her fingers along the Genital Reshaper, "who goes first?"`,
    onEnter: function() {
        // Check if this scene should play (day after bet result)
        if (!gameState.flags.story_corwin_bet_result || gameState.flags.story_corwin_transformed) {
            SceneManager.playScene('workshop_main');
            return 'redirect';
        }
    },
    actions: [
        { label: '"Corwin, you\'re up first"', nextScene: 'story_corwin_transform' },
        { label: '"Ladies first, Vessa"', nextScene: 'story_vessa_transform_first' }
    ]
};

SCENES['story_corwin_transform'] = {
    id: 'story_corwin_transform',
    image: 'images/story/bet_corwin_after.webp',
    speaker: 'Corwin',
    text: `Corwin takes a deep breath and approaches the Genital Reshaper.

"Just... get it over with."

You activate the device. Purple light engulfs Corwin's midsection. He gasps - not in pain, but surprise.

When the light fades, Corwin looks down at himself in shock. But something else has changed too. His features have... softened. His jaw is less angular, his cheekbones more delicate. Even his hips seem to have shifted slightly.

"What... what else did it do?" His voice is slightly higher, melodic.

You explain: the devices have a peculiar side effect. They seem to pull bodies toward feminine presentation. Your uncle's design, intentional or not.

"I feel... strange," Corwin admits, touching his face. "But not... bad? This is very confusing."`,
    onEnter: function() {
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.story_corwin_transformed) {
            // Transform Corwin - vagina, but add chest to make eligible for jealousy
            gameState.npcs.corwin.body.genitalia = 0;
            gameState.npcs.corwin.body.chest = 2;  // Feminine softening gives small breasts
            gameState.flags.story_corwin_transformed = true;
            recordNpcBodyChange('corwin');
            saveState();
        }
    },
    actions: [
        { label: '"Your turn, Vessa"', nextScene: 'story_vessa_transform' }
    ]
};

SCENES['story_vessa_transform_first'] = {
    id: 'story_vessa_transform_first',
    image: 'images/story/bet_vessa_after.webp',
    speaker: 'Vessa',
    text: `Vessa approaches the Genital Reshaper with less hesitation than Corwin.

"I've always been curious about the other side," *she admits.* "Let's see what your uncle's magic can do."

You activate the device. Purple light engulfs her midsection. She moans softly - pleasure, not pain.

When the light fades, Vessa examines herself with scholarly interest.

"Fascinating. The sensation is... different. More external." She shifts her weight experimentally. "I could get used to this."

Unlike Corwin, her features haven't softened - she already presented feminine. But you notice her carrying herself differently, more confidently somehow.`,
    onEnter: function() {
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.story_vessa_transformed) {
            // Transform Vessa - penis (starts at size 0 when newly gained)
            gameState.npcs.vessa.body.genitalia = 1;
            gameState.npcs.vessa.body.genitaliaSize = 0;
            gameState.flags.story_vessa_transformed = true;
            recordNpcBodyChange('vessa');
            saveState();
        }
    },
    actions: [
        { label: '"Now Corwin"', nextScene: 'story_corwin_transform_second' }
    ]
};

SCENES['story_corwin_transform_second'] = {
    id: 'story_corwin_transform_second',
    image: 'images/story/bet_corwin_after.webp',
    speaker: 'Corwin',
    text: `Corwin, having watched Vessa's transformation, approaches with slightly less trepidation.

"If she can handle it, so can I."

You activate the device. Purple light engulfs his midsection. He gasps - not in pain, but surprise.

When the light fades, Corwin looks down at himself in shock. But something else has changed too. His features have... softened. His jaw is less angular, his cheekbones more delicate. Even his hips seem to have shifted slightly.

"What... what else did it do?" His voice is slightly higher, melodic.

You explain: the devices have a peculiar side effect. They seem to pull bodies toward feminine presentation. Your uncle's design, intentional or not.

"I feel... strange," Corwin admits, touching his face. "But not... bad?"`,
    onEnter: function() {
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.story_corwin_transformed) {
            gameState.npcs.corwin.body.genitalia = 0;
            gameState.npcs.corwin.body.chest = 2;
            gameState.flags.story_corwin_transformed = true;
            recordNpcBodyChange('corwin');
            saveState();
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'story_corwin_bet_aftermath' }
    ]
};

SCENES['story_vessa_transform'] = {
    id: 'story_vessa_transform',
    image: 'images/story/bet_vessa_after.webp',
    speaker: 'Vessa',
    text: `Vessa approaches the device with scholarly curiosity, having just watched Corwin's transformation.

"Interesting. The feminizing effect..." She runs her fingers along the brass housing. "I wonder if it will work differently on someone already feminine."

You activate the device. Purple light engulfs her midsection. She moans softly - pleasure, not pain.

When the light fades, Vessa examines herself with detached interest.

"Fascinating. The sensation is... different. More external." She shifts her weight experimentally. "I think I might actually prefer this."

Her features remain unchanged - she was already feminine. But something in her eyes has shifted. A new confidence, perhaps.`,
    onEnter: function() {
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.story_vessa_transformed) {
            // Transform Vessa - penis (starts at size 0 when newly gained)
            gameState.npcs.vessa.body.genitalia = 1;
            gameState.npcs.vessa.body.genitaliaSize = 0;
            gameState.flags.story_vessa_transformed = true;
            recordNpcBodyChange('vessa');
            saveState();
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'story_corwin_bet_aftermath' }
    ]
};

SCENES['story_corwin_bet_aftermath'] = {
    id: 'story_corwin_bet_aftermath',
    image: 'images/story/bet_corwin_aftermath.webp',
    speaker: '',
    text: `Corwin and Vessa stand side by side, examining their transformed bodies with a mixture of shock and curiosity.

Corwin touches his new curves. {corwin}"I should hate this. I should want to change back immediately. But..." He trails off.

Vessa smirks. {vessa}"But it feels right somehow?"

{corwin}"Don't put words in my mouth." But Corwin doesn't deny it.

Vessa stretches languidly. {vessa}"Your uncle's devices are remarkable. They don't just change the body - they seem to adjust the mind's relationship with it. I feel... complete."

They exchange a look - former rivals, now sharing something intimate and strange.

{corwin}"Perhaps we should visit again sometime," Corwin says quietly. {corwin}"For... further exploration."

**(Corwin and Vessa have been transformed. Both seem unexpectedly content with their new forms.)**`,
    onEnter: function() {
        gameState.flags.story_corwin_bet_complete = true;
        // Corwin has accepted and embraced her feminine form
        gameState.npcs.corwin.enjoys_feminine_form = true;
        // Both NPCs are now in jealousy system
        // Add trust for the experience
        gameState.npcs.corwin.trust = Math.min(100, gameState.npcs.corwin.trust + 10);
        gameState.npcs.vessa.trust = Math.min(100, gameState.npcs.vessa.trust + 10);
        saveState();
    },
    actions: [
        { label: 'Return to workshop', nextScene: 'workshop_main' }
    ]
};

// ==========================================
// SELF-TRANSFORM UNLOCK EVENT
// ==========================================
// Triggered when first NPC reaches their target - they express gratitude
// and give the player a gift that unlocks self-transformation

SCENES['self_transform_unlock_event'] = {
    id: 'self_transform_unlock_event',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        const npcId = gameState.flags.self_transform_unlock_npc;
        if (!npcId) {
            SceneManager.playScene('workshop_main');
            return 'redirect';
        }

        const npcName = NPC_NAMES[npcId] || 'Your visitor';
        const p = getNpcPronouns(npcId);
        const P = p.subject.charAt(0).toUpperCase() + p.subject.slice(1);
        this.image = getNpcImagePath(npcId);
        this.speaker = npcName;

        // Mark as triggered
        gameState.flags.self_transform_unlock_triggered = true;
        saveState();

        // Personality-based gratitude
        const config = NPC_DESIRE_CONFIG[npcId];
        const personality = config?.personality || NPC_PERSONALITY_TYPES.GROWTH_FOCUSED;

        if (personality === NPC_PERSONALITY_TYPES.GROWTH_FOCUSED) {
            this.text = `*${npcName} looks at ${p.possessive} transformed body with radiant joy, then turns to you with tears in ${p.possessive} eyes.*\n\n"This is... this is everything I've ever wanted. You've given me something I never thought possible."\n\n${P} steps closer, taking your hands in ${p.possessive}.\n\n"I want to give you something in return. Wait here - I'll be right back."`;
        } else if (personality === NPC_PERSONALITY_TYPES.PRACTICAL) {
            this.text = `*${npcName} examines ${p.possessive} transformed body with a satisfied nod, then regards you thoughtfully.*\n\n"You've done excellent work. This is exactly what I needed."\n\n${P} pauses at the door.\n\n"I have something that might be useful to you. I'll return shortly."`;
        } else if (personality === NPC_PERSONALITY_TYPES.PRUDE) {
            this.text = `*${npcName} glances at ${p.possessive} transformed body, blushing slightly, before looking at you with genuine warmth.*\n\n"I... I never thought I would ask for something like this, but... thank you. Truly."\n\n${P} fidgets with ${p.possessive} hands.\n\n"I want to repay your kindness. Please wait for me."`;
        } else if (personality === NPC_PERSONALITY_TYPES.ADVENTUROUS) {
            this.text = `*${npcName} spins around excitedly, admiring ${p.possessive} new form from every angle.*\n\n"This is AMAZING! I can't believe it actually worked! You're incredible!"\n\n${P} grabs your shoulders with infectious enthusiasm.\n\n"I have the PERFECT thing to give you! Don't move!"`;
        } else {
            this.text = `*${npcName} takes a moment to appreciate ${p.possessive} transformation, then smiles warmly at you.*\n\n"Thank you for this gift. You have a rare talent."\n\n${P} heads toward the door.\n\n"Please wait here. I have something for you."`;
        }

        this.actions = [
            { label: `Wait for ${p.object} to return`, nextScene: 'self_transform_unlock_gift' }
        ];
    },
    actions: []
};

SCENES['self_transform_unlock_gift'] = {
    id: 'self_transform_unlock_gift',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        const npcId = gameState.flags.self_transform_unlock_npc;
        const npcName = NPC_NAMES[npcId] || 'Your visitor';
        const p = getNpcPronouns(npcId);
        const P = p.subject.charAt(0).toUpperCase() + p.subject.slice(1);
        this.image = getNpcImagePath(npcId);
        this.speaker = npcName;

        this.text = `*${npcName} returns, slightly out of breath, holding something small wrapped in cloth.*\n\n"This belonged to my grandmother. It's been in my family for generations - they say it holds a trace of old magic."\n\n${P} carefully unwraps a small, smooth stone that pulses with a faint inner light.\n\n"I never knew what to do with it, but... I think it belongs here. With you and your uncle's devices."\n\n${P} presses it into your hands. It's warm to the touch, and you can feel a gentle vibration within.\n\n"Take it. Consider it payment for what you've given me."`;
    },
    actions: [
        { label: 'Accept the gift', nextScene: 'self_transform_unlock_absorb' }
    ]
};

SCENES['self_transform_unlock_absorb'] = {
    id: 'self_transform_unlock_absorb',
    image: 'images/locations/workshop.webp',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        const npcId = gameState.flags.self_transform_unlock_npc;
        const npcName = NPC_NAMES[npcId] || 'Your visitor';

        // Grant aether and unlock self-transform
        addAether(4);
        unlockSelfTransform();

        // Store for first-use tracking
        gameState.flags.self_transform_first_use_npc = npcId;

        const p = getNpcPronouns(npcId);

        this.text = `As you accept the stone, you notice your uncle's crystal cube begin to glow more brightly. The stone vibrates in your palm, resonating with the cube's energy.\n\nActing on instinct, you hold the stone near the cube. The two artifacts seem to recognize each other - there's a flash of light, and the stone's energy flows into the cube like water finding its level.\n\n**(+4 Aether)**\n\nBut something else has changed. You feel a connection to the cube now - to the devices themselves. Where before they felt like tools meant only for others, now they seem to welcome you.\n\nYou realize with sudden clarity: you can use them on yourself now.\n\n**(Self-transformation unlocked!)**\n\n*${npcName} watches with wide eyes.*\n\n"That was... beautiful. The magic recognized you."`;

        this.actions = [
            { label: `Thank ${p.object} and continue`, nextScene: 'self_transform_unlock_close' }
        ];

        saveState();
    },
    actions: []
};

SCENES['self_transform_unlock_close'] = {
    id: 'self_transform_unlock_close',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        const npcId = gameState.flags.self_transform_unlock_npc;
        const npcName = NPC_NAMES[npcId] || 'Your visitor';
        const p = getNpcPronouns(npcId);
        const P = p.subject.charAt(0).toUpperCase() + p.subject.slice(1);
        this.image = getNpcImagePath(npcId);
        this.speaker = npcName;

        this.text = `*${npcName} smiles warmly.*\n\n"It seems the magic has accepted you fully now. I'm glad my grandmother's heirloom could help."\n\n${P} heads toward the door, pausing to look back.\n\n"If you ever want to... experiment on yourself, you know I'd be happy to watch. Consider it professional curiosity."\n\nWith a wink, ${p.subject} departs.\n\nYou look at the crystal cube, now pulsing with renewed energy. The workshop feels different now - more personal. More yours.\n\nThe devices await your command - and now, they can serve you too.`;
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// First self-transform reaction scene - NPC comments on player's changes
SCENES['self_transform_first_reaction'] = {
    id: 'self_transform_first_reaction',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        const npcId = gameState.flags.self_transform_first_use_npc;
        if (!npcId) {
            SceneManager.playScene('workshop_main');
            return 'redirect';
        }

        const npcName = NPC_NAMES[npcId] || 'Your visitor';
        this.image = getNpcImagePath(npcId);
        this.speaker = npcName;

        gameState.flags.self_transform_first_commented = true;
        saveState();

        this.text = `*${npcName}'s eyes widen as they notice your changed form.*\n\n"You actually did it! You used the devices on yourself!"\n\nThey circle you appreciatively.\n\n"I must say... it suits you. The magic seems to have agreed."\n\nThey lean in conspiratorially.\n\n"Between us - I think you look even better than before. Don't tell anyone I said that."`;
    },
    actions: [
        { label: 'Accept the compliment', nextScene: 'workshop_main' }
    ]
};

// ==========================================
// UNCLE'S FEMINIZING LORE (Discoverable)
// ==========================================


// ============================================
// NPC SEXUAL ADVANCE SCENES (Random Propositions — Secondary Path)
// ============================================
// These fire randomly via rollNpcAdvance() → checkPendingAdvanceRedirect().
// The NPC propositions the player when entering a location.
// This is a SECONDARY/FLAVOR system — the primary path to sex is:
//   Mira sex hints → player clicks "Intimate..." in NPC greeting.
// Both paths lead to the same {npc}_sex_intro scene and markSexUnlocked().

// Mira Advance Scene
SCENES['npc_advance_mira'] = {
    id: 'npc_advance_mira',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        const mood = getPendingAdvanceMood();

        if (mood === 'playful') {
            this.text = `Mira catches you as you're about to head out, a mischievous glint in her eyes.

"Hey you~ I've been thinking about you all day. My deliveries are done, my body feels amazing after those changes you made..."

She twirls a strand of auburn hair around her finger.

"And I've got all this energy I need to burn off. Want to help me with that?"`;
        } else {
            this.text = `Mira strides up to you with purpose, her courier's bag already set aside.

"I need you. Now."

She closes the distance between you, her green eyes intense.

"I've been satisfied with my body lately, and it's made me realize what else I want. You. So what do you say?"`;
        }

        const bodyLine = getPlayerBodyComment('mira', 'horny');
        if (bodyLine) this.text += `\n\n${bodyLine}`;
    },
    actions: [
        {
            label: 'Accept',
            nextScene: 'npc_advance_mira_accept'
        },
        {
            label: 'Not right now',
            nextScene: 'npc_advance_mira_reject'
        }
    ]
};

SCENES['npc_advance_mira_accept'] = {
    id: 'npc_advance_mira_accept',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        clearPendingAdvance(true);
        SceneManager.playScene('mira_sex_intro');
        return 'redirect';
    },
    actions: []
};

SCENES['npc_advance_mira_reject'] = {
    id: 'npc_advance_mira_reject',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        const mood = getPendingAdvanceMood();
        clearPendingAdvance(false);

        if (mood === 'playful') {
            this.text = `Mira's face falls for just a moment before she recovers with a shrug.

"Ah well, can't blame a girl for trying!"

She stretches, clearly still restless.

"Guess I'll just have to take the long route on my next delivery. Nothing like a good run to work off some... tension."

She winks, though there's a hint of disappointment in her smile.`;
        } else {
            this.text = `Mira's expression flickers with frustration before she takes a deep breath.

"Right. Fine. I get it."

She runs a hand through her hair, visibly flustered.

"I'll just... find a quiet spot on my delivery route. Take care of this myself."

Her cheeks flush as she grabs her courier bag.

"See you around."`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// Vessa Advance Scene
SCENES['npc_advance_vessa'] = {
    id: 'npc_advance_vessa',
    image: '',
    speaker: 'Vessa',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('vessa');
        const mood = getPendingAdvanceMood();

        if (mood === 'playful') {
            this.text = `Vessa appears beside you as if from nowhere, her violet eyes glimmering with amusement.

"I've been watching you. Feeling your energy from across town."

She trails a finger along your arm, leaving goosebumps.

"My body is exactly as I want it now, thanks to you. And I find myself... hungry for more of your particular talents."`;
        } else {
            this.text = `Vessa steps from the shadows, her hood drawn back, expression unguarded for once.

"I want you. No games, no riddles."

Her voice is low, certain.

"You've given me the body I desired. Now I desire the one who shaped it. Come with me."`;
        }

        const bodyLine = getPlayerBodyComment('vessa', 'horny');
        if (bodyLine) this.text += `\n\n${bodyLine}`;
    },
    actions: [
        { label: 'Accept', nextScene: 'npc_advance_vessa_accept' },
        { label: 'Not right now', nextScene: 'npc_advance_vessa_reject' }
    ]
};

SCENES['npc_advance_vessa_accept'] = {
    id: 'npc_advance_vessa_accept',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        clearPendingAdvance(true);
        SceneManager.playScene('vessa_sex_intro');
        return 'redirect';
    },
    actions: []
};

SCENES['npc_advance_vessa_reject'] = {
    id: 'npc_advance_vessa_reject',
    image: '',
    speaker: 'Vessa',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('vessa');
        const mood = getPendingAdvanceMood();
        clearPendingAdvance(false);

        if (mood === 'playful') {
            this.text = `Vessa's lips curl into a knowing smile, though her eyes betray a flicker of disappointment.

"Ah. Another time, then."

She produces a small vial from her robes, swirling the contents.

"I have other methods of satisfaction. Herbal remedies for... tension."

She winks mysteriously.

"They're quite effective. Though not nearly as interesting as you."`;
        } else {
            this.text = `Vessa's mask of composure cracks for just a moment, genuine frustration visible.

"I see."

She pulls her hood back up, shadows obscuring her features.

"No matter. I have preparations that serve well enough. Tinctures that warm the blood."

Her voice drops to a whisper.

"But they're a poor substitute for what I truly wanted."`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// Mrs. Thornwick Advance Scene
SCENES['npc_advance_mrs_thornwick'] = {
    id: 'npc_advance_mrs_thornwick',
    image: '',
    speaker: 'Mrs. Thornwick',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mrs_thornwick');
        const mood = getPendingAdvanceMood();

        if (mood === 'playful') {
            this.text = `Mrs. Thornwick approaches with an unusually warm smile, her formal demeanor softened.

"I've been meaning to speak with you privately. About... personal matters."

She glances around to ensure no one is watching.

"The changes you've made to my figure have been quite... liberating. I find myself with urges I haven't felt in years. Perhaps you could help me explore them?"`;
        } else {
            this.text = `Mrs. Thornwick corners you with the same determination she brings to town council meetings.

"We need to talk. Behind closed doors."

Her blue eyes are intense, her practiced composure strained.

"I've spent too long denying myself. My body is finally what I've always secretly wanted, and I know what else I want now. You."`;
        }

        const bodyLine = getPlayerBodyComment('mrs_thornwick', 'horny');
        if (bodyLine) this.text += `\n\n${bodyLine}`;
    },
    actions: [
        { label: 'Accept', nextScene: 'npc_advance_mrs_thornwick_accept' },
        { label: 'Not right now', nextScene: 'npc_advance_mrs_thornwick_reject' }
    ]
};

SCENES['npc_advance_mrs_thornwick_accept'] = {
    id: 'npc_advance_mrs_thornwick_accept',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        clearPendingAdvance(true);
        SceneManager.playScene('thornwick_sex_intro');
        return 'redirect';
    },
    actions: []
};

SCENES['npc_advance_mrs_thornwick_reject'] = {
    id: 'npc_advance_mrs_thornwick_reject',
    image: '',
    speaker: 'Mrs. Thornwick',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mrs_thornwick');
        const mood = getPendingAdvanceMood();
        clearPendingAdvance(false);

        if (mood === 'playful') {
            this.text = `Mrs. Thornwick's smile becomes fixed, professional mask sliding back into place.

"Of course. I understand completely."

She smooths her dress, regaining her composure.

"I have... private matters to attend to at home. A long bath, perhaps."

Her cheeks color slightly.

"Good day to you."`;
        } else {
            this.text = `Mrs. Thornwick stiffens, her expression becoming unreadable.

"I see. How... disappointing."

She straightens her posture with sharp movements.

"I shall attend to my own needs then. I've gone without for years. I can manage."

Her voice is clipped, controlled.

"If you'll excuse me. I have private matters requiring attention."`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// Fiona Advance Scene
SCENES['npc_advance_fiona'] = {
    id: 'npc_advance_fiona',
    image: '',
    speaker: 'Fiona',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('fiona');
        const mood = getPendingAdvanceMood();

        if (mood === 'playful') {
            this.text = `Fiona sidles up to you with a grin that's equal parts mischief and nervousness.

"Hey. So, um... I've been feeling pretty good about myself lately. The new me, y'know?"

She fidgets with her patched sleeve.

"And I was thinking... maybe we could, uh, celebrate? Together? If you want?"`;
        } else {
            this.text = `Fiona plants herself in front of you, chin raised defiantly despite her flushed cheeks.

"I want this. I want you."

Her hazel eyes meet yours steadily.

"I'm not some scared kid anymore. My body's changed, I've changed. And I know what I want now. So?"`;
        }

        const bodyLine = getPlayerBodyComment('fiona', 'horny');
        if (bodyLine) this.text += `\n\n${bodyLine}`;
    },
    actions: [
        { label: 'Accept', nextScene: 'npc_advance_fiona_accept' },
        { label: 'Not right now', nextScene: 'npc_advance_fiona_reject' }
    ]
};

SCENES['npc_advance_fiona_accept'] = {
    id: 'npc_advance_fiona_accept',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        clearPendingAdvance(true);
        SceneManager.playScene('fiona_sex_intro');
        return 'redirect';
    },
    actions: []
};

SCENES['npc_advance_fiona_reject'] = {
    id: 'npc_advance_fiona_reject',
    image: '',
    speaker: 'Fiona',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('fiona');
        const mood = getPendingAdvanceMood();
        clearPendingAdvance(false);

        if (mood === 'playful') {
            this.text = `Fiona's face falls, but she quickly covers with a shrug.

"Yeah, no, that's cool. Whatever."

She kicks at the ground.

"I'll just go find something to keep me busy. Maybe pick a few pockets, start a fight..."

She manages a crooked grin.

"The usual ways to blow off steam."`;
        } else {
            this.text = `Fiona's bravado crumbles, hurt flashing across her features before she hardens.

"Fine. Your loss."

She turns away, shoulders tense.

"I'll find something else to do. Someone else, maybe. The streets have plenty of distractions."

Her voice wavers slightly.

"See ya around. Or not."`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// Barret Advance Scene
SCENES['npc_advance_barret'] = {
    id: 'npc_advance_barret',
    image: '',
    speaker: 'Barret',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('barret');
        const mood = getPendingAdvanceMood();

        if (mood === 'playful') {
            this.text = `Barret leans against the bar, her red curls bouncing as she tilts her head at you.

"Well, well. My favorite customer~"

She traces a finger along the edge of her low-cut blouse.

"I've been feeling absolutely wonderful lately. All those improvements you made... they've got me in quite the mood. Care to help a girl out?"`;
        } else {
            this.text = `Barret intercepts you, her warm brown eyes dark with want.

"I need you. Upstairs. Now."

She takes your hand without waiting for an answer.

"My body's never felt this good, and I'm done waiting. You made me this way, now take responsibility."`;
        }

        const bodyLine = getPlayerBodyComment('barret', 'horny');
        if (bodyLine) this.text += `\n\n${bodyLine}`;
    },
    actions: [
        { label: 'Accept', nextScene: 'npc_advance_barret_accept' },
        { label: 'Not right now', nextScene: 'npc_advance_barret_reject' }
    ]
};

SCENES['npc_advance_barret_accept'] = {
    id: 'npc_advance_barret_accept',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        clearPendingAdvance(true);
        SceneManager.playScene('barret_sex_intro');
        return 'redirect';
    },
    actions: []
};

SCENES['npc_advance_barret_reject'] = {
    id: 'npc_advance_barret_reject',
    image: '',
    speaker: 'Barret',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('barret');
        const mood = getPendingAdvanceMood();
        clearPendingAdvance(false);

        if (mood === 'playful') {
            this.text = `Barret pouts dramatically, though her eyes sparkle with amusement.

"Turning me down? How cruel~"

She sighs, adjusting her bodice.

"I suppose I'll have to find comfort elsewhere. I know a few regulars who never say no to the owner's special attention."

She winks.

"Their loss could be their gain tonight."`;
        } else {
            this.text = `Barret's expression flickers with genuine frustration.

"Really? You're sure?"

She runs her hands through her curls, clearly agitated.

"Fine. I've got plenty of willing patrons upstairs who'd jump at the chance. Won't be hard to find satisfaction."

Her smile turns sharp.

"But it won't be the same."`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// Lenna Advance Scene
SCENES['npc_advance_lenna'] = {
    id: 'npc_advance_lenna',
    image: '',
    speaker: 'Lenna',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('lenna');
        const mood = getPendingAdvanceMood();

        if (mood === 'playful') {
            this.text = `Lenna approaches with a book clutched to her chest, cheeks already pink.

"I, um... I've been reading about certain... topics. For research purposes, of course."

She pushes her glasses up nervously.

"And I thought... perhaps you might help me with some... practical application? If you're not too busy?"`;
        } else {
            this.text = `Lenna corners you in a quiet alcove, her usual shyness replaced by determination.

"I need to tell you something."

Her grey eyes meet yours, intense behind her glasses.

"Ever since you changed my body, I can't stop thinking about you. I've tried to ignore it, but I can't anymore. I want you."`;
        }

        const bodyLine = getPlayerBodyComment('lenna', 'horny');
        if (bodyLine) this.text += `\n\n${bodyLine}`;
    },
    actions: [
        { label: 'Accept', nextScene: 'npc_advance_lenna_accept' },
        { label: 'Not right now', nextScene: 'npc_advance_lenna_reject' }
    ]
};

SCENES['npc_advance_lenna_accept'] = {
    id: 'npc_advance_lenna_accept',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        clearPendingAdvance(true);
        SceneManager.playScene('lenna_sex_intro');
        return 'redirect';
    },
    actions: []
};

SCENES['npc_advance_lenna_reject'] = {
    id: 'npc_advance_lenna_reject',
    image: '',
    speaker: 'Lenna',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('lenna');
        const mood = getPendingAdvanceMood();
        clearPendingAdvance(false);

        if (mood === 'playful') {
            this.text = `Lenna's blush deepens to crimson as she clutches her book tighter.

"Oh! Of course. That's... that's fine. I understand."

She backs away, nearly tripping over her own feet.

"I'll just... there are books that can help. With this sort of thing. Very educational."

She mumbles something unintelligible and flees toward the library.`;
        } else {
            this.text = `Lenna's face crumples before she catches herself, adjusting her glasses to hide her expression.

"I see. I'm sorry for being so forward."

Her voice is small, controlled.

"I have certain texts that can... provide relief. Illustrated manuscripts from the restricted section."

She swallows hard.

"They'll have to suffice."`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// Della Advance Scene
SCENES['npc_advance_della'] = {
    id: 'npc_advance_della',
    image: '',
    speaker: 'Della',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('della');
        const mood = getPendingAdvanceMood();

        if (mood === 'playful') {
            this.text = `Della wipes flour from her hands, a warm smile crinkling the corners of her eyes.

"You know, dear, I've been feeling rather... spry lately. All those changes you made."

She chuckles, patting her transformed figure.

"At my age, I'd forgotten what it felt like to feel desirable. And now I find myself craving some company. Interested in keeping an old baker warm?"`;
        } else {
            this.text = `Della sets down her rolling pin with unusual firmness, meeting your eyes.

"I'm going to be direct with you, dear. Life's too short to dance around things."

She unties her apron deliberately.

"My body feels better than it has in decades. And I want to share that feeling with you. Right now. Will you?"`;
        }

        const bodyLine = getPlayerBodyComment('della', 'horny');
        if (bodyLine) this.text += `\n\n${bodyLine}`;
    },
    actions: [
        { label: 'Accept', nextScene: 'npc_advance_della_accept' },
        { label: 'Not right now', nextScene: 'npc_advance_della_reject' }
    ]
};

SCENES['npc_advance_della_accept'] = {
    id: 'npc_advance_della_accept',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        clearPendingAdvance(true);
        SceneManager.playScene('della_sex_intro');
        return 'redirect';
    },
    actions: []
};

SCENES['npc_advance_della_reject'] = {
    id: 'npc_advance_della_reject',
    image: '',
    speaker: 'Della',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('della');
        const mood = getPendingAdvanceMood();
        clearPendingAdvance(false);

        if (mood === 'playful') {
            this.text = `Della's smile stays warm, though her eyes show a flicker of disappointment.

"Ah well, can't blame a woman for trying!"

She ties her apron back on.

"I'll just have to work off this energy the old-fashioned way. Nothing like kneading dough to keep the hands busy."

She winks.

"And if that doesn't work, I've got some very firm bread that needs pounding."`;
        } else {
            this.text = `Della sighs, retying her apron with practiced movements.

"I understand, dear. I do."

Her motherly smile has a sad edge.

"At my age, you learn not to push. I'll keep myself busy with baking. It's always been my way of dealing with... unfulfilled appetites."

She turns back to her dough.

"The bread won't knead itself."`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// Aldric Advance Scene (male - requires transformation)
SCENES['npc_advance_aldric'] = {
    id: 'npc_advance_aldric',
    image: '',
    speaker: 'Aldric',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('aldric');
        const mood = getPendingAdvanceMood();

        if (mood === 'playful') {
            this.text = `Aldric sets down his hammer, a rare smile softening his stern features.

"I've been thinking about you. About what you did for me."

He gestures at his transformed chest, still getting used to it.

"My body's different now, but in a good way. And I find myself wanting... company. Yours specifically."`;
        } else {
            this.text = `Aldric approaches with the same directness he brings to his smithing.

"I'm not one for pretty words. You changed me. Made me into something new."

His brown eyes are intense.

"And now I want you. It's as simple as that. Will you have me?"`;
        }

        const bodyLine = getPlayerBodyComment('aldric', 'horny');
        if (bodyLine) this.text += `\n\n${bodyLine}`;
    },
    actions: [
        { label: 'Accept', nextScene: 'npc_advance_aldric_accept' },
        { label: 'Not right now', nextScene: 'npc_advance_aldric_reject' }
    ]
};

SCENES['npc_advance_aldric_accept'] = {
    id: 'npc_advance_aldric_accept',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        clearPendingAdvance(true);
        SceneManager.playScene('aldric_sex_intro');
        return 'redirect';
    },
    actions: []
};

SCENES['npc_advance_aldric_reject'] = {
    id: 'npc_advance_aldric_reject',
    image: '',
    speaker: 'Aldric',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('aldric');
        const mood = getPendingAdvanceMood();
        clearPendingAdvance(false);

        if (mood === 'playful') {
            this.text = `Aldric nods, his expression returning to its usual stoicism.

"Understood. No offense taken."

He picks up his hammer again.

"A cold bath and extra work at the forge will sort me out. Always does."

He gives you a small nod of respect.

"Come by anytime you need smithing done."`;
        } else {
            this.text = `Aldric's jaw tightens, but he accepts your answer with a curt nod.

"Right. Can't force these things."

He turns back to the forge, muscles tensing.

"I'll work the metal until this feeling passes. Fire and steel clear the mind."

His voice is gruff.

"Get on with your day."`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// Corwin Advance Scene (male - requires transformation)
SCENES['npc_advance_corwin'] = {
    id: 'npc_advance_corwin',
    image: '',
    speaker: 'Corwin',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('corwin');
        const mood = getPendingAdvanceMood();

        if (mood === 'playful') {
            this.text = `Corwin adjusts his colorful scarf with a practiced flourish, dark eyes glittering.

"Ah, there you are! I've been hoping to run into you."

He gestures at his feminized form with theatrical pride.

"Losing that bet to Vessa was the best thing that ever happened to me. And I have you to thank for making it so... enjoyable. Care to celebrate properly?"`;
        } else {
            this.text = `Corwin drops his merchant's charm, approaching with unusual sincerity.

"I want you. No haggling, no games."

He runs a hand through his slicked-back hair.

"You transformed me into this, and I love every inch of it. Now I want to show you how grateful I am. Intimately."`;
        }

        const bodyLine = getPlayerBodyComment('corwin', 'horny');
        if (bodyLine) this.text += `\n\n${bodyLine}`;
    },
    actions: [
        { label: 'Accept', nextScene: 'npc_advance_corwin_accept' },
        { label: 'Not right now', nextScene: 'npc_advance_corwin_reject' }
    ]
};

SCENES['npc_advance_corwin_accept'] = {
    id: 'npc_advance_corwin_accept',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        clearPendingAdvance(true);
        SceneManager.playScene('corwin_sex_intro');
        return 'redirect';
    },
    actions: []
};

SCENES['npc_advance_corwin_reject'] = {
    id: 'npc_advance_corwin_reject',
    image: '',
    speaker: 'Corwin',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('corwin');
        const mood = getPendingAdvanceMood();
        clearPendingAdvance(false);

        if (mood === 'playful') {
            this.text = `Corwin clutches his chest in mock devastation.

"Ah, rejected! My heart!"

He recovers quickly with a charming grin.

"No matter. I always have options. A merchant never puts all his goods in one wagon, you know."

He winks.

"Perhaps the next town over will be more... accommodating."`;
        } else {
            this.text = `Corwin's smooth composure cracks, genuine disappointment showing.

"I see. A rare refusal for me."

He straightens his coat, regaining his swagger.

"Well. I have contacts in every town between here and the capital. Someone will appreciate what I'm offering."

His smile doesn't quite reach his eyes.

"Good day to you."`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// Holt Advance Scene (male - requires transformation)
SCENES['npc_advance_holt'] = {
    id: 'npc_advance_holt',
    image: '',
    speaker: 'Holt',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('holt');
        const mood = getPendingAdvanceMood();

        if (mood === 'playful') {
            this.text = `Holt approaches with unusual nervousness, her new feminine form still unfamiliar.

"I've been meaning to talk to you. About... personal matters."

She fidgets with her guard badge.

"Ever since you changed me into who I always wanted to be, I can't stop thinking about you. Would you... be interested in something more?"`;
        } else {
            this.text = `Holt stands at attention before you, then deliberately relaxes, a new habit for her new life.

"I need to say this directly. It's how I was trained."

Her steel-grey eyes are vulnerable.

"You made me a woman. The woman I always was inside. And I want to be with you. As a woman. Please."`;
        }

        const bodyLine = getPlayerBodyComment('holt', 'horny');
        if (bodyLine) this.text += `\n\n${bodyLine}`;
    },
    actions: [
        { label: 'Accept', nextScene: 'npc_advance_holt_accept' },
        { label: 'Not right now', nextScene: 'npc_advance_holt_reject' }
    ]
};

SCENES['npc_advance_holt_accept'] = {
    id: 'npc_advance_holt_accept',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        clearPendingAdvance(true);
        SceneManager.playScene('holt_sex_intro');
        return 'redirect';
    },
    actions: []
};

SCENES['npc_advance_holt_reject'] = {
    id: 'npc_advance_holt_reject',
    image: '',
    speaker: 'Holt',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('holt');
        const mood = getPendingAdvanceMood();
        clearPendingAdvance(false);

        if (mood === 'playful') {
            this.text = `Holt's shoulders stiffen, falling back into military posture.

"Understood. Request denied. That's... that's fine."

She manages a small smile.

"I'll take an extra patrol shift. Physical activity helps clear the mind. And maybe a cold bath after."

She salutes awkwardly.

"Carry on."`;
        } else {
            this.text = `Holt's face goes blank, a guard's mask hiding her feelings.

"Acknowledged. I won't bring it up again."

She straightens her uniform.

"I'll volunteer for the night watch. It's cold. Good for... discipline."

Her voice catches slightly.

"Duty calls. Excuse me."`;
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// ==========================================
// DYNAMIC FLIRT SHOW SCENES
// NPCs offer to show off body parts during flirting
// ==========================================

// Dialogue for NPCs offering to show body parts, by personality type
const FLIRT_SHOW_OFFER_DIALOGUE = {
    // Chest offers
    chest: {
        friendly: "She grins and pulls at her top. \"You want to see something? I've been pretty proud of these lately...\"",
        gruff: "She grunts and loosens her shirt. \"Been noticing you looking. Here, get a proper view.\"",
        curious: "She tilts her head, fingers at her collar. \"Would you like to observe my chest? I'm curious about your reaction.\"",
        proper: "She clears her throat, cheeks pink. \"I don't normally... but perhaps you'd like to see?\" She begins undoing buttons.",
        shy: "She fidgets nervously. \"I... um... w-would you want to see my...\" She gestures at her chest, blushing furiously.",
        flirty: "She winks and slowly tugs down her neckline. \"See something you like? Let me give you a better view, darling.\"",
        charming: "She smiles warmly. \"You've earned a treat. Allow me to show you something special.\" She loosens her top.",
        motherly: "She chuckles warmly. \"Oh my, you're interested? Well, no harm in a little peek...\" She adjusts her blouse.",
        stoic: "She pauses, then begins unfastening her clothing methodically. \"You may observe, if you wish.\""
    },
    // Butt offers
    butt: {
        friendly: "She spins around with a giggle. \"Hey, want to see? I've been working on this!\" She hikes up her skirt.",
        gruff: "She turns around bluntly. \"Figured you'd want a look.\" She lifts her clothing without ceremony.",
        curious: "She turns, glancing back. \"I wonder how you'll react to this.\" She lifts her skirt to expose her ass.",
        proper: "She blushes deeply. \"This is most improper, but...\" She turns and lifts her skirt delicately.",
        shy: "She turns away, face red. \"D-don't look at my face while I...\" She nervously lifts her skirt.",
        flirty: "She bends over slightly, looking back with a smirk. \"Like the view from back here?\" She lifts her skirt.",
        charming: "She turns gracefully. \"A fine sight, wouldn't you agree?\" She reveals her ass with flourish.",
        motherly: "She laughs softly. \"At my age? Well, if you insist...\" She turns and lifts her skirt.",
        stoic: "She turns around efficiently. \"You may look.\" She lifts her skirt with military precision."
    },
    // Muscle offers
    muscle: {
        friendly: "She flexes excitedly. \"Feel these! Been working out a lot.\" She shows off her back muscles.",
        gruff: "She turns and flexes her back. \"Hard work pays off. Take a look.\"",
        curious: "She turns, curious. \"I've been studying my own muscle development.\" She flexes her back.",
        proper: "She turns somewhat reluctantly. \"I suppose a display of... fitness is acceptable.\" She reveals toned muscles.",
        shy: "She turns shyly. \"I've b-been exercising... is it okay?\" She nervously shows her back.",
        flirty: "She stretches sensually. \"All this muscle isn't just for show...\" She flexes her defined back.",
        charming: "She turns with confidence. \"Strength and beauty combined, no?\" She shows her muscular back.",
        motherly: "She chuckles. \"Years of kneading dough gave me these!\" She shows her surprisingly fit back.",
        stoic: "She turns and flexes precisely. \"Physical readiness is essential.\" She displays her muscular back."
    },
    // Vagina offers
    vagina: {
        friendly: "She bites her lip excitedly. \"Want to see something more... private?\" She reaches for her skirt hem.",
        gruff: "She snorts. \"Might as well show you the whole package.\" She lifts her skirt boldly.",
        curious: "She tilts her head. \"I'm curious how you'll react to seeing... everything.\" She lifts her skirt.",
        proper: "She takes a shaky breath. \"I've never... but for you...\" She slowly lifts her skirt, face crimson.",
        shy: "She squeaks softly. \"I c-can't believe I'm doing this...\" She trembles as she lifts her skirt.",
        flirty: "She smirks. \"Ready for the main event?\" She lifts her skirt with a wink.",
        charming: "She smiles seductively. \"A rare privilege... just for you.\" She reveals herself gracefully.",
        motherly: "She blushes warmly. \"Oh my, it's been a while since anyone saw...\" She lifts her skirt gently.",
        stoic: "She hesitates briefly, then proceeds. \"This is... unusual for me.\" She lifts her skirt."
    },
    // Penis offers - NPCs are already aroused and eager to show
    penis: {
        friendly: "She grins nervously, fidgeting. \"So, um... I'm kind of... excited right now. Want to see?\" She gestures at the obvious tent in her clothes.",
        gruff: "She grunts, adjusting herself. \"Yeah, I've got one of these now. Already hard thinking about you. Want to see?\"",
        curious: "Her eyes light up, a visible bulge straining her clothing. \"I'm experiencing arousal. I'd like to observe your reaction when I show you.\"",
        proper: "She clears her throat, face crimson, unable to hide her arousal. \"I... it seems my body is... responding to you. Would you like to see?\"",
        shy: "She trembles, face burning red. \"I-I'm already... um... it's hard... I mean...\" She can barely speak through her embarrassment. \"W-want to see?\"",
        flirty: "She smirks, letting you see the outline straining against fabric. \"See what you do to me? Want a closer look at what's throbbing for you?\"",
        charming: "She winks, confidence unshaken despite her obvious arousal. \"You've inspired quite the reaction. Care to see the full effect?\"",
        motherly: "She laughs warmly, blushing. \"Oh my, you've got me all worked up. Would you like to see what you've done to me?\"",
        stoic: "She states matter-of-factly, though a bulge betrays her composure. \"My body is... responding. Do you wish to observe the extent?\""
    }
};

// Dialogue for showing the body part (after reveal)
const FLIRT_SHOW_REVEAL_DIALOGUE = {
    chest: {
        friendly: { low: "She holds her top open. \"Not much yet, but they're mine!\"", high: "She proudly displays massive breasts. \"Pretty amazing, right?!\"" },
        gruff: { low: "She grunts. \"It is what it is.\"", high: "She smirks. \"Impressive, aren't they?\"" },
        curious: { low: "She examines your reaction. \"Fascinating how you respond to minimal development.\"", high: "She watches intently. \"Extreme development yields interesting reactions.\"" },
        proper: { low: "She blushes. \"They're... modest, I know.\"", high: "She gasps softly at her own display. \"They've become quite... substantial.\"" },
        shy: { low: "She covers partially. \"S-sorry they're so small...\"", high: "She can barely look. \"T-they're so big now... is it weird?\"" },
        flirty: { low: "She teases. \"Small but sensitive~\"", high: "She purrs. \"Magnificent, aren't they? Want to touch?\"" },
        charming: { low: "She smiles softly. \"Quality over quantity, yes?\"", high: "She presents them proudly. \"A masterpiece, wouldn't you agree?\"" },
        motherly: { low: "She chuckles. \"Not much to see, but there they are.\"", high: "She laughs warmly. \"Oh my, they've gotten quite large!\"" },
        stoic: { low: "She stands still. \"As you can see.\"", high: "She maintains composure despite her enormous breasts. \"... Noted.\"" }
    },
    butt: {
        friendly: { low: "She wiggles her small butt. \"Still working on it!\"", high: "She shakes her huge butt. \"Check out this thing!\"" },
        gruff: { low: "She shrugs. \"Not much there.\"", high: "She slaps her massive ass. \"Built like a mountain now.\"" },
        curious: { low: "She glances back. \"Minimal gluteal development observed.\"", high: "She studies your gaze. \"Extreme enlargement complete.\"" },
        proper: { low: "She blushes. \"It's rather... petite.\"", high: "She gasps. \"It's become positively... voluptuous.\"" },
        shy: { low: "She hides her face. \"It's s-so flat...\"", high: "She whimpers. \"It's s-so huge now...\"" },
        flirty: { low: "She pouts playfully. \"Small but perfectly formed~\"", high: "She bounces it. \"There's plenty to grab, darling~\"" },
        charming: { low: "She winks over her shoulder. \"Elegance in simplicity.\"", high: "She presents it dramatically. \"Quite the spectacle, no?\"" },
        motherly: { low: "She pats it. \"A modest bottom, but it serves.\"", high: "She laughs. \"My goodness, look at the size of it!\"" },
        stoic: { low: "She states plainly. \"Standard issue.\"", high: "She pauses. \"... Substantial.\"" }
    },
    muscle: {
        friendly: { low: "She flexes her slim back. \"Getting stronger every day!\"", high: "She flexes powerfully. \"Look at these muscles!\"" },
        gruff: { low: "She shrugs. \"Could be better.\"", high: "She flexes hard. \"Now THAT'S power.\"" },
        curious: { low: "She examines herself. \"Minimal definition, interesting.\"", high: "She studies her rippling muscles. \"Peak development achieved.\"" },
        proper: { low: "She straightens. \"Modest, but functional.\"", high: "She gasps at her own musculature. \"My word, that's impressive.\"" },
        shy: { low: "She hunches. \"I-I'm not very strong...\"", high: "She blushes at her own power. \"Is... is this too much?\"" },
        flirty: { low: "She stretches. \"Toned enough for you?\"", high: "She flexes seductively. \"All this power... and it's all yours to admire.\"" },
        charming: { low: "She poses gracefully. \"Subtle strength.\"", high: "She displays her muscles proudly. \"Strength made beautiful.\"" },
        motherly: { low: "She chuckles. \"Not much, but honest work.\"", high: "She laughs. \"All those years of kneading!\"" },
        stoic: { low: "She stands at attention. \"Adequate.\"", high: "She flexes professionally. \"Combat ready.\"" }
    },
    vagina: {
        friendly: { low: "She spreads her legs slightly. \"There it is! Pretty normal, huh?\"", high: "She shows off proudly. \"Look how... prominent it's gotten!\"" },
        gruff: { low: "She shrugs. \"Standard issue.\"", high: "She snorts. \"Yeah, it's impressive now.\"" },
        curious: { low: "She observes your reaction. \"Average development, interesting response.\"", high: "She watches intently. \"Extreme prominence, as you can see.\"" },
        proper: { low: "She covers her face. \"It's... modest.\"", high: "She gasps. \"It's become quite... pronounced.\"" },
        shy: { low: "She trembles. \"P-please don't stare too long...\"", high: "She whimpers. \"I-it's so visible now...\"" },
        flirty: { low: "She winks. \"Neat and tidy, just how I like it.\"", high: "She purrs. \"Quite the sight, isn't it?\"" },
        charming: { low: "She smiles softly. \"Delicate perfection.\"", high: "She poses. \"Magnificent, wouldn't you say?\"" },
        motherly: { low: "She laughs softly. \"Well, there it is.\"", high: "She blushes. \"Oh my, it's gotten so...\"" },
        stoic: { low: "She stands still. \"Observation complete.\"", high: "She pauses. \"... Significant development.\"" }
    },
    penis: {
        friendly: { low: "She reveals her small but eager erection. \"It's not big, but look how hard you made it!\"", high: "She proudly displays her throbbing cock. \"Look at this thing! All because of you!\"" },
        gruff: { low: "She exposes her stiff cock. \"Small but ready. That's what matters.\"", high: "She shows off her massive erection. \"Yeah. That's what I'm packing now.\"" },
        curious: { low: "She reveals her erect penis, watching your reaction. \"Small but fully aroused. Your effect on me is measurable.\"", high: "She displays her huge throbbing cock. \"Maximum arousal achieved. Your reaction data is fascinating.\"" },
        proper: { low: "She exposes herself, face burning. \"It's... modest, but terribly... eager.\"", high: "She gasps at her own massive erection. \"My word... it's quite... insistent.\"" },
        shy: { low: "She reveals her small erection, trembling. \"I-it's so hard... I c-can't help it around you...\"", high: "She shows her huge cock, nearly in tears from embarrassment. \"I-it's so big and it w-won't stop throbbing...\"" },
        flirty: { low: "She shows off her cute erection with a smirk. \"See what you do to me? Imagine what I could do with it~\"", high: "She strokes her massive throbbing cock. \"All this for you, darling. Like what you see?\"" },
        charming: { low: "She presents her aroused cock gracefully. \"Small but passionate. You inspire such reactions.\"", high: "She displays her enormous erection with pride. \"Quite the effect you have on me. Magnificent, no?\"" },
        motherly: { low: "She chuckles warmly, revealing her small erection. \"Oh my, it's not much, but you've certainly got it excited!\"", high: "She laughs as she shows her huge throbbing cock. \"Goodness gracious! Look what you've done to me!\"" },
        stoic: { low: "She reveals her erect penis with military precision. \"Small. But... responsive to your presence.\"", high: "She displays her massive erection, a crack in her composure. \"... Significant. You have a notable effect.\"" }
    }
};

// Cheeky decline responses when player declines to see penis and no alternatives
// NPC is already aroused, so responses acknowledge their worked-up state
const FLIRT_DECLINE_CHEEKY = {
    friendly: "She giggles, adjusting herself. \"Shy? That's cute! I'll just... take care of this later then.\"",
    gruff: "She snorts, shifting uncomfortably. \"Your loss. Guess I'll deal with this myself.\"",
    curious: "She tilts her head, still visibly aroused. \"Interesting. I'll have to find another way to... resolve this state.\"",
    proper: "She straightens her clothes hastily, relieved but flushed. \"Oh, well... perhaps that's for the best. Excuse me while I... compose myself.\"",
    shy: "She lets out a shaky breath, covering herself. \"O-oh good... I was so nervous... but now I'm all... um... I'll just go...\"",
    flirty: "She pouts, her arousal obvious. \"Playing hard to get? Fine, but you're missing out~ I'll think of you while I handle this.\"",
    charming: "She smiles despite her state. \"Another time, perhaps. I'll just need a moment to... calm down.\"",
    motherly: "She chuckles warmly, fanning herself. \"Oh you sweet thing, no pressure at all. I'll just need a cold bath later!\"",
    stoic: "She nods stiffly, clearly affected. \"Understood. Offer rescinded. I will... address this situation privately.\""
};

// Generate dynamic flirt show scenes for all NPCs
function generateFlirtShowScenes() {
    const ALL_NPCS = ['mira', 'vessa', 'barret', 'della', 'fiona', 'lenna', 'mrs_thornwick', 'aldric', 'corwin', 'holt'];

    for (const npcId of ALL_NPCS) {
        // Main flirt scene - selects body part and routes appropriately
        SCENES[`${npcId}_flirt`] = {
            id: `${npcId}_flirt`,
            image: '',
            speaker: '',
            text: '',
            _npcId: npcId,
            onEnter: function() {
                const thisNpcId = this._npcId;
                const selected = selectFlirtBodyPart(thisNpcId);

                if (!selected) {
                    // No eligible body parts - fall back to basic flirt
                    this.image = getNpcImagePath(thisNpcId);
                    this.text = "They smile warmly at you, but have nothing particular to show off.";
                    this.speaker = getNpcDisplayName(thisNpcId);
                    this.actions = [{ label: 'Continue', nextScene: `location_${getNpcLocation(thisNpcId)}` }];
                    return;
                }

                // Store selection for potential use in follow-up scenes
                gameState._pendingFlirtShow = {
                    npcId: thisNpcId,
                    part: selected.part,
                    level: selected.level,
                    imagePath: selected.imagePath
                };

                const personality = NPC_PERSONALITIES[thisNpcId]?.type || 'friendly';
                const offerDialogue = FLIRT_SHOW_OFFER_DIALOGUE[selected.part]?.[personality] ||
                                      FLIRT_SHOW_OFFER_DIALOGUE[selected.part]?.friendly;

                this.image = getNpcImagePath(thisNpcId);
                this.text = `{${thisNpcId}}` + offerDialogue;
                this.speaker = '';

                gameState.npcs[thisNpcId].trust += 1;
                saveState();

                // Build actions based on body part
                this.actions = [];

                // If penis, offer accept/decline choice
                if (selected.part === 'penis') {
                    this.actions.push(
                        { label: 'Yes, show me', nextScene: `${thisNpcId}_flirt_show` },
                        { label: 'Maybe something else?', nextScene: `${thisNpcId}_flirt_decline_penis` }
                    );
                } else {
                    // Other body parts - proceed directly to showing
                    this.actions.push(
                        { label: 'Yes, show me', nextScene: `${thisNpcId}_flirt_show` },
                        { label: 'Maybe later', nextScene: `location_${getNpcLocation(thisNpcId)}` }
                    );
                }
            },
            actions: []
        };

        // Show scene - reveals the selected body part
        // Use closure to capture npcId properly
        (function(capturedNpcId) {
            SCENES[`${capturedNpcId}_flirt_show`] = {
                id: `${capturedNpcId}_flirt_show`,
                image: '',
                speaker: '',
                text: '',
                _npcId: capturedNpcId,
                onEnter: function() {
                    const thisNpcId = this._npcId;
                    const pending = gameState._pendingFlirtShow;

                    if (!pending || pending.npcId !== thisNpcId) {
                        this.text = "Something went wrong.";
                        this.actions = [{ label: 'Continue', nextScene: `location_${getNpcLocation(thisNpcId)}` }];
                        return;
                    }

                    const personality = NPC_PERSONALITIES[thisNpcId]?.type || 'friendly';
                    const revealData = FLIRT_SHOW_REVEAL_DIALOGUE[pending.part]?.[personality];
                    const isHigh = pending.level >= 3;
                    const revealDialogue = revealData ? (isHigh ? revealData.high : revealData.low) : "They show you.";

                    this.image = pending.imagePath;
                    this.text = `{${thisNpcId}}` + revealDialogue + "\n\n(+1 Trust)";
                    this.speaker = '';

                    // Update action to use captured npcId
                    this.actions = [{ label: 'Continue', nextScene: `location_${getNpcLocation(thisNpcId)}` }];

                    gameState.npcs[thisNpcId].trust += 1;
                    delete gameState._pendingFlirtShow;
                    saveState();
                },
                actions: []
            };
        })(npcId);

        // Decline penis scene - try to show alternative or give cheeky reply
        SCENES[`${npcId}_flirt_decline_penis`] = {
            id: `${npcId}_flirt_decline_penis`,
            image: '',
            speaker: '',
            text: '',
            _npcId: npcId,
            onEnter: function() {
                const thisNpcId = this._npcId;
                const personality = NPC_PERSONALITIES[thisNpcId]?.type || 'friendly';

                // Try to find alternative body part
                const alternative = selectAlternativeFlirtBodyPart(thisNpcId, 'penis');

                if (alternative) {
                    // Store alternative for showing
                    gameState._pendingFlirtShow = {
                        npcId: thisNpcId,
                        part: alternative.part,
                        level: alternative.level,
                        imagePath: alternative.imagePath
                    };

                    const offerDialogue = FLIRT_SHOW_OFFER_DIALOGUE[alternative.part]?.[personality] ||
                                          FLIRT_SHOW_OFFER_DIALOGUE[alternative.part]?.friendly;

                    this.image = getNpcImagePath(thisNpcId);
                    this.text = `{${thisNpcId}}They shrug. "Fair enough. How about this instead?"\n\n{${thisNpcId}}${offerDialogue}`;
                    this.speaker = '';

                    this.actions = [
                        { label: 'Yes, show me', nextScene: `${thisNpcId}_flirt_show` },
                        { label: 'Maybe later', nextScene: `location_${getNpcLocation(thisNpcId)}` }
                    ];
                } else {
                    // No alternatives - cheeky reply
                    const cheekyDialogue = FLIRT_DECLINE_CHEEKY[personality] || FLIRT_DECLINE_CHEEKY.friendly;

                    this.image = getNpcImagePath(thisNpcId);
                    this.text = cheekyDialogue;
                    this.speaker = getNpcDisplayName(thisNpcId);

                    delete gameState._pendingFlirtShow;

                    this.actions = [
                        { label: 'Continue', nextScene: `location_${getNpcLocation(thisNpcId)}` }
                    ];
                }
            },
            actions: []
        };
    }
}

// Generate the flirt show scenes
generateFlirtShowScenes();

// ==========================================
// MALE NPC FLIRT SCENES (post-transformation)
// ==========================================
// These scenes are only available after the male NPCs have been transformed

SCENES['aldric_flirt_1'] = {
    id: 'aldric_flirt_1',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "{player}\"You know, that new look really suits you. You're quite stunning.\" You give him a warm smile.\n\nAldric's newly feminine features flush pink. {aldric}\"I... well...\" She tugs at her apron self-consciously. {aldric}\"Didn't expect to hear that from you. But... thanks.\"",
    onEnter: function() {
        this.image = getNpcImagePath('aldric');
        gameState.npcs.aldric.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', callback: () => SceneManager.playScene(`location_${getNpcLocation('aldric')}`) }
    ]
};

SCENES['corwin_flirt_1'] = {
    id: 'corwin_flirt_1',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "{player}\"That new figure of yours is quite distracting. In a good way.\" You wink.\n\nCorwin laughs, running a hand through her hair. {corwin}\"Oh, you noticed? I've been getting a lot of... attention lately.\" She strikes a playful pose. {corwin}\"Can't say I mind it.\"",
    onEnter: function() {
        this.image = getNpcImagePath('corwin');
        gameState.npcs.corwin.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', callback: () => SceneManager.playScene(`location_${getNpcLocation('corwin')}`) }
    ]
};

SCENES['holt_flirt_1'] = {
    id: 'holt_flirt_1',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "{player}\"You've really come into your own. You're beautiful.\" You hold her gaze.\n\nHolt stands straighter, a rare blush coloring her cheeks. {holt}\"I... thank you.\" For once, her guard drops. {holt}\"I never thought I'd hear those words. It means more than you know.\"",
    onEnter: function() {
        this.image = getNpcImagePath('holt');
        gameState.npcs.holt.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', callback: () => SceneManager.playScene(`location_${getNpcLocation('holt')}`) }
    ]
};

// ==========================================
// ARCHETYPE SUGGESTION SCENES
// ==========================================
// Player can suggest an archetype to an NPC when trust is 15+ above flirt threshold

function generateArchetypeSuggestionScenes() {
    const allNpcs = ['mira', 'vessa', 'barret', 'della', 'fiona', 'lenna', 'mrs_thornwick', 'aldric', 'corwin', 'holt'];

    for (const npcId of allNpcs) {
        // Scene 1: Initial suggestion - NPC asks what player has in mind
        SCENES[`${npcId}_archetype_suggest`] = {
            id: `${npcId}_archetype_suggest`,
            image: '',
            speaker: '',
            _npcId: npcId,
            text: '',
            onEnter: function() {
                const thisNpcId = this._npcId;
                this.image = getNpcImagePath(thisNpcId);
                this.text = ARCHETYPE_SUGGESTION_INITIAL_DIALOGUE[thisNpcId] ||
                    `${getNpcDisplayName(thisNpcId)} looks intrigued. "You have an idea for how I should look? Tell me more."`;

                // Build actions for each available archetype
                const availableArchetypes = getAvailableArchetypesForSuggestion(thisNpcId);
                this.actions = [];

                for (const archId of availableArchetypes) {
                    const archetype = BODY_ARCHETYPES[archId];
                    this.actions.push({
                        label: archetype.name,
                        description: archetype.description,
                        nextScene: `${thisNpcId}_archetype_accept_${archId}`
                    });
                }

                // Add genital toggle option based on current genitalia
                const npcBody = gameState.npcs[thisNpcId].body;
                const npcNpc = gameState.npcs[thisNpcId];
                const hasNoGenitalDesire = !npcNpc.currentDesire || npcNpc.currentDesire.stat !== 'genitalia';
                if (hasNoGenitalDesire && !npcNpc.pendingGenitalProposal) {
                    if (npcBody.genitalia === 0) {
                        this.actions.push({
                            label: 'Try having a penis',
                            callback: () => {
                                createGenitalProposal(thisNpcId, 1, 'player_suggestion');
                                approveGenitalProposal(thisNpcId);
                                SceneManager.playScene(`${thisNpcId}_genital_suggest_accept`);
                            }
                        });
                    } else {
                        this.actions.push({
                            label: 'Try having a vagina',
                            callback: () => {
                                createGenitalProposal(thisNpcId, 0, 'player_suggestion');
                                approveGenitalProposal(thisNpcId);
                                SceneManager.playScene(`${thisNpcId}_genital_suggest_accept`);
                            }
                        });
                    }
                }

                // Add nevermind option
                this.actions.push({
                    label: 'Never mind',
                    nextScene: `location_${getNpcLocation(thisNpcId)}`
                });

                // If no archetypes available (NPC matches all), show special message
                if (availableArchetypes.length === 0 && hasNoGenitalDesire) {
                    this.text = `${getNpcDisplayName(thisNpcId)} already has a figure that matches every look you could suggest. There's nothing new to propose.`;
                    this.actions = [{
                        label: 'Continue',
                        nextScene: `location_${getNpcLocation(thisNpcId)}`
                    }];
                }
            },
            actions: []
        };

        // Generate acceptance scenes for each archetype
        const archetypeIds = SUGGESTABLE_ARCHETYPES;

        for (const archId of archetypeIds) {
            // Scene 2: NPC accepts the archetype with excitement
            SCENES[`${npcId}_archetype_accept_${archId}`] = {
                id: `${npcId}_archetype_accept_${archId}`,
                image: '',
                speaker: getNpcDisplayName(npcId),
                _npcId: npcId,
                _archId: archId,
                text: '',
                onEnter: function() {
                    const thisNpcId = this._npcId;
                    const thisArchId = this._archId;
                    this.image = getNpcImagePath(thisNpcId);

                    // Get acceptance dialogue
                    const acceptDialogue = ARCHETYPE_SUGGESTION_ACCEPT_DIALOGUE[thisNpcId]?.[thisArchId] ||
                        `"${BODY_ARCHETYPES[thisArchId].name}? That sounds interesting! Let's try it."`;

                    this.text = acceptDialogue;

                    // Build actions dynamically to ensure correct scene reference
                    this.actions = [
                        {
                            label: 'Continue',
                            nextScene: `${thisNpcId}_archetype_bodypart_${thisArchId}`
                        }
                    ];
                },
                actions: []
            };

            // Scene 3: NPC asks which body part to start with
            SCENES[`${npcId}_archetype_bodypart_${archId}`] = {
                id: `${npcId}_archetype_bodypart_${archId}`,
                image: '',
                speaker: getNpcDisplayName(npcId),
                _npcId: npcId,
                _archId: archId,
                text: '',
                onEnter: function() {
                    const thisNpcId = this._npcId;
                    const thisArchId = this._archId;
                    this.image = getNpcImagePath(thisNpcId);

                    this.text = ARCHETYPE_BODYPART_DIALOGUE[thisNpcId] ||
                        "\"So where should we start?\"";

                    // Get available body parts (ones NPC doesn't already match)
                    const availableParts = getAvailableBodyPartsForArchetype(thisNpcId, thisArchId);
                    const archetype = BODY_ARCHETYPES[thisArchId];

                    this.actions = [];
                    for (const stat of availableParts) {
                        const target = archetype.targets[stat];
                        const targetValue = Array.isArray(target) ? target[0] : target;
                        const statName = getStatDisplayNameForArchetype(stat, thisNpcId);

                        this.actions.push({
                            label: statName,
                            callback: () => {
                                applyArchetypeSuggestion(thisNpcId, thisArchId, stat);
                                SceneManager.playScene(`${thisNpcId}_archetype_confirmed`);
                            }
                        });
                    }

                    // Should always have at least one option since archetype wasn't fully matched
                    if (this.actions.length === 0) {
                        this.text = "\"Actually, I think I already have the look you're describing!\"";
                        this.actions = [{
                            label: 'Continue',
                            nextScene: `location_${getNpcLocation(thisNpcId)}`
                        }];
                    }
                },
                actions: []
            };
        }

        // Scene 4: Confirmation that archetype was set
        SCENES[`${npcId}_archetype_confirmed`] = {
            id: `${npcId}_archetype_confirmed`,
            image: '',
            speaker: getNpcDisplayName(npcId),
            _npcId: npcId,
            text: '',
            onEnter: function() {
                const thisNpcId = this._npcId;
                const npc = gameState.npcs[thisNpcId];
                this.image = getNpcImagePath(thisNpcId);

                const archetype = BODY_ARCHETYPES[npc.hiddenArchetype];
                const desire = npc.currentDesire;
                const statName = (getStatDisplayNameForArchetype(desire?.stat, thisNpcId) || 'body').toLowerCase();

                const confirmTexts = {
                    mira: `Mira bounces on her heels, barely containing her excitement.

"Alright! Let's start with my ${statName}!" She grins from ear to ear, green eyes sparkling. "I'm so excited to see how this turns out! When can we begin?"`,

                    vessa: `Vessa nods slowly, a knowing smile playing on her pale lips.

"Then we begin with the ${statName}." Her violet eyes gleam with anticipation. "I shall await your work with keen interest. The journey of transformation is its own reward."`,

                    barret: `Barret claps her hands together with a delighted laugh.

"${statName.charAt(0).toUpperCase() + statName.slice(1)} first, huh? Works for me!" She strikes a playful pose. "Let's get started! I can't wait to see what you do with me!"`,

                    della: `Della presses a hand to her chest, flushed with nervous excitement.

"Oh my! Starting with the ${statName}?" She giggles, looking years younger. "This is quite thrilling, dear! I feel like a young woman again!"`,

                    fiona: `Fiona takes a deep breath, steadying herself with visible effort.

"O-okay... ${statName} first." She meets your eyes, vulnerable but determined. "I trust you. More than I've trusted anyone in a long time."`,

                    lenna: `Lenna adjusts her glasses and makes a note in her ever-present notebook.

"${statName.charAt(0).toUpperCase() + statName.slice(1)} as the initial variable. Logical." She looks up with barely concealed eagerness. "Proceeding with the experiment. I'll document everything."`,

                    mrs_thornwick: `Mrs. Thornwick clasps her hands together, composing herself with practiced dignity.

"Very well. We shall address the ${statName} first." Her voice is crisp, but there's a flush to her cheeks. "I expect precision and discretion. And... perhaps some haste."`,

                    aldric: `Aldric nods firmly, treating this like any other job to be done.

"${statName.charAt(0).toUpperCase() + statName.slice(1)} it is." He squares his broad shoulders. "Let's get to work. I've never been one for half-measures."`,

                    corwin: `Corwin rubs his hands together with mercantile enthusiasm.

"Starting with ${statName}? Smart choice." He grins his charming grin. "I'm ready when you are. Consider this investment fully committed."`,

                    holt: `Holt snaps to attention, treating your decision as a direct order.

"${statName.charAt(0).toUpperCase() + statName.slice(1)} objective confirmed." He stands perfectly still, a flicker of anticipation breaking through his stoic mask. "Ready to proceed. Awaiting your command."`
                };

                this.text = confirmTexts[thisNpcId] || `"Let's start with my ${statName}. I'm looking forward to seeing your vision come to life!"`;

                // Add trust for the suggestion being accepted
                gameState.npcs[thisNpcId].trust += 2;
                saveState();

                // Build actions dynamically using stored _npcId
                this.actions = [
                    {
                        label: 'Continue',
                        nextScene: `location_${getNpcLocation(thisNpcId)}`
                    }
                ];
            },
            actions: []
        };

        // Scene: Player suggests genital change, NPC accepts
        SCENES[`${npcId}_genital_suggest_accept`] = {
            id: `${npcId}_genital_suggest_accept`,
            image: '',
            speaker: getNpcDisplayName(npcId),
            _npcId: npcId,
            text: '',
            onEnter: function() {
                const thisNpcId = this._npcId;
                const npc = gameState.npcs[thisNpcId];
                const p = getNpcPronouns(thisNpcId);
                const name = getNpcDisplayName(thisNpcId);
                this.image = getNpcImagePath(thisNpcId);

                const wantsPenis = npc.currentDesire?.target === 1;

                if (wantsPenis) {
                    this.text = `${name}'s eyes widen, then a slow flush creeps across ${p.possessive} cheeks.

"A penis?" ${p.subject.charAt(0).toUpperCase() + p.subject.slice(1)} shifts ${p.possessive} weight, considering. "I... honestly? I've been curious about that for a while. What it would feel like."

${p.subject.charAt(0).toUpperCase() + p.subject.slice(1)} meets your gaze, a nervous excitement building.

"Let's do it. I want to know."`;
                } else {
                    this.text = `${name} pauses, something soft flickering across ${p.possessive} expression.

"A vagina?" ${p.subject.charAt(0).toUpperCase() + p.subject.slice(1)} touches ${p.possessive} stomach absently. "I've thought about it. What it would be like to feel things... differently."

${p.subject.charAt(0).toUpperCase() + p.subject.slice(1)} nods, quiet but certain.

"Yeah. I want to try that."`;
                }

                npc.trust += 2;
                saveState();

                this.actions = [{
                    label: 'Continue',
                    nextScene: `location_${getNpcLocation(thisNpcId)}`
                }];
            },
            actions: []
        };
    }
}

// Generate the archetype suggestion scenes
generateArchetypeSuggestionScenes();

// ==========================================
// GENITAL PROPOSAL SCENES
// ==========================================
// NPCs ask player for approval before changing genitalia type

function generateGenitalProposalScenes() {
    const allNpcs = ['mira', 'vessa', 'barret', 'della', 'fiona', 'lenna', 'mrs_thornwick', 'aldric', 'corwin', 'holt'];

    // Placeholder dialogue per NPC per direction
    const GENITAL_PROPOSAL_DIALOGUE = {
        mira: {
            toPenis: `Mira fidgets with a loose thread on her sleeve, cheeks pink.\n\n"So, um... I've been thinking. About trying something... different. Down there." She gestures vaguely below her waist. "Like, a penis? I know it sounds weird, but I'm curious! Would you... help me with that?"`,
            toVagina: `Mira looks down thoughtfully, then back at you.\n\n"I've been thinking about going back to how I was before. Down there, I mean." She gives a small smile. "It was fun, but I think I miss the original equipment. Would you change me back?"`
        },
        vessa: {
            toPenis: `Vessa's violet eyes hold a strange intensity as she speaks.\n\n"I have been studying certain transformative possibilities. I wish to experience... the masculine form. Partially." Her voice is clinical but her cheeks betray genuine curiosity. "Will you grant this?"`,
            toVagina: `Vessa traces her fingers along her collarbone, thoughtful.\n\n"The experiment has been illuminating, but I believe it's time to reverse the change." She meets your eyes. "Return me to my original form, if you would."`
        },
        barret: {
            toPenis: `Barret leans in close, lowering her voice conspiratorially.\n\n"Right, so... I've been hearing things. About what it's like to have a cock." She grins wickedly. "And I want to try it. For research purposes, obviously. Can you make that happen?"`,
            toVagina: `Barret stretches and sighs contentedly.\n\n"It's been a hell of a ride, but I think I'm ready to go back to the standard package." She winks. "Change me back?"`
        },
        della: {
            toPenis: `Della wrings her flour-dusted hands, clearly embarrassed.\n\n"Oh dear, this is terribly forward of me, but... I've been curious about..." She lowers her voice to a whisper. "...having a penis. At my age! Can you imagine? But... would you?"`,
            toVagina: `Della smooths her apron, looking relieved.\n\n"I think it's time I went back to normal, dear." She pats your hand. "It was quite the adventure, but I miss how things were."`
        },
        fiona: {
            toPenis: `Fiona hugs herself, looking at the ground.\n\n"I... I want to try something. Something big." She takes a shaky breath. "A penis. I want to know what it feels like to have one. Is that... is that okay?"`,
            toVagina: `Fiona looks at you with quiet relief.\n\n"I think I'm ready to change back." She manages a small smile. "Thank you for letting me try, but... I want to be me again."`
        },
        lenna: {
            toPenis: `Lenna adjusts her glasses, notebook open to a page of anatomical diagrams.\n\n"I've been conducting research on sexual dimorphism and I believe firsthand experience would be... invaluable." She clears her throat. "I'd like a penis, please. For science."`,
            toVagina: `Lenna closes her notebook with a decisive snap.\n\n"Data collection complete. I'd like to revert to my original configuration now, please." There's a note of relief beneath her clinical tone.`
        },
        mrs_thornwick: {
            toPenis: `Mrs. Thornwick clasps her hands in her lap, maintaining perfect composure despite the flush in her cheeks.\n\n"I have given this considerable thought. I wish to experience... a masculine appendage." She meets your eyes with steely dignity. "This stays between us. Agreed?"`,
            toVagina: `Mrs. Thornwick straightens her posture, all business.\n\n"I believe it's time to restore things to their proper state." She gives a clipped nod. "Proceed with the reversal, if you would."`
        },
        aldric: {
            toPenis: `Aldric crosses his arms, looking away.\n\n"Look, I know this is strange coming from me, but..." He rubs the back of his neck. "I want the old equipment back. A proper cock. Think you can manage that?"`,
            toVagina: `Aldric shifts his weight awkwardly.\n\n"The changes have been... educational. But I think I'd like to try things without it for a while." He meets your eyes. "If you're willing."`
        },
        corwin: {
            toPenis: `Corwin's charming smile has a nervous edge to it.\n\n"I've been thinking about market... no, that's not honest." He drops the act. "I want a penis. The real reason is purely personal curiosity. What do you say?"`,
            toVagina: `Corwin runs a hand through his dark hair.\n\n"I think it's time for a change back. The original model, as it were." His merchant smile returns. "Best to diversify one's experiences, wouldn't you say?"`
        },
        holt: {
            toPenis: `Holt stands ramrod straight, but his voice wavers slightly.\n\n"Requesting a modification. Genital reconfiguration to..." He pauses, then forces out: "...penis. That is my request."`,
            toVagina: `Holt delivers his request like a military briefing.\n\n"Requesting reversal of genital modification. Return to..." He clears his throat. "...female configuration. Acknowledged?"`
        }
    };

    for (const npcId of allNpcs) {
        SCENES[`${npcId}_genital_proposal`] = {
            id: `${npcId}_genital_proposal`,
            image: '',
            speaker: getNpcDisplayName(npcId),
            _npcId: npcId,
            text: '',
            onEnter: function() {
                const thisNpcId = this._npcId;
                const npc = gameState.npcs[thisNpcId];
                this.image = getNpcImagePath(thisNpcId);

                if (!npc || !npc.pendingGenitalProposal) {
                    this.text = `${getNpcDisplayName(thisNpcId)} seems to have changed their mind about something.`;
                    this.actions = [{ label: 'Continue', nextScene: `location_${getNpcLocation(thisNpcId)}` }];
                    return;
                }

                const targetGenitalia = npc.pendingGenitalProposal.targetGenitalia;
                const dialogue = GENITAL_PROPOSAL_DIALOGUE[thisNpcId];
                this.text = targetGenitalia === 1
                    ? (dialogue?.toPenis || `"I've been thinking about trying a penis. Would you help me with that?"`)
                    : (dialogue?.toVagina || `"I think I'd like to go back to having a vagina. Can you change me back?"`);

                this.actions = [
                    {
                        label: 'Approve',
                        callback: () => {
                            approveGenitalProposal(thisNpcId);
                            SceneManager.playScene(`location_${getNpcLocation(thisNpcId)}`);
                        }
                    },
                    {
                        label: 'Deny',
                        callback: () => {
                            denyGenitalProposal(thisNpcId);
                            SceneManager.playScene(`location_${getNpcLocation(thisNpcId)}`);
                        }
                    }
                ];
            },
            actions: []
        };
    }
}

generateGenitalProposalScenes();

// ==========================================
// GODDESS REVEAL SCENES
// ==========================================
// When goddess archetype is assigned, NPC tells the player about her pursuit

function generateGoddessRevealScenes() {
    const allNpcs = ['mira', 'vessa', 'barret', 'della', 'fiona', 'lenna', 'mrs_thornwick', 'aldric', 'corwin', 'holt'];

    for (const npcId of allNpcs) {
        SCENES[`${npcId}_goddess_reveal`] = {
            id: `${npcId}_goddess_reveal`,
            image: '',
            speaker: getNpcDisplayName(npcId),
            _npcId: npcId,
            text: '',
            onEnter: function() {
                const thisNpcId = this._npcId;
                const npc = gameState.npcs[thisNpcId];
                this.image = getNpcImagePath(thisNpcId);

                if (!npc || npc.hiddenArchetype !== 'goddess') {
                    this.text = `${getNpcDisplayName(thisNpcId)} seems lost in thought.`;
                    this.actions = [{ label: 'Continue', nextScene: `location_${getNpcLocation(thisNpcId)}` }];
                    return;
                }

                this.text = getGoddessRevealText(thisNpcId);
                this.actions = [
                    {
                        label: 'Continue',
                        callback: () => {
                            npc.goddessRevealed = true;
                            npc.desireKnownToPlayer = true;
                            saveState();
                            if (typeof UI !== 'undefined' && UI.updateDesireTracker) {
                                UI.updateDesireTracker();
                            }
                            SceneManager.playScene(`location_${getNpcLocation(thisNpcId)}`);
                        }
                    }
                ];
            },
            actions: []
        };
    }
}

generateGoddessRevealScenes();

// ============================================
// ARCHETYPE ACHIEVEMENT SCENES
// ============================================
// Full dedicated scenes for when an NPC completes their body archetype.
// Replaces the old text-prepend celebration system with proper scene redirects.

function generateArchetypeAchievementScenes() {
    const allNpcs = ['mira', 'vessa', 'barret', 'della', 'fiona', 'lenna', 'mrs_thornwick', 'aldric', 'corwin', 'holt'];

    for (const npcId of allNpcs) {
        SCENES[`${npcId}_archetype_achievement`] = {
            id: `${npcId}_archetype_achievement`,
            image: '',
            speaker: getNpcDisplayName(npcId),
            _npcId: npcId,
            text: '',
            onEnter: function() {
                const thisNpcId = this._npcId;
                const npc = gameState.npcs[thisNpcId];
                this.image = getNpcImagePath(thisNpcId);

                const archetype = npc.hiddenArchetype;
                // Goddess is always intimate (the ultimate form is always overwhelming)
                const isIntimate = archetype === 'goddess' || npc.trust >= getNpcTrustThresholds(thisNpcId).intimate;

                const ctx = {
                    npcChest: getBodyStatDesc(thisNpcId, 'chest'),
                    npcButt: getBodyStatDesc(thisNpcId, 'butt'),
                    npcMuscle: getBodyStatDesc(thisNpcId, 'muscle'),
                    npcGenSize: getBodyStatDesc(thisNpcId, 'genitaliaSize'),
                    playerGenSize: getBodyStatDesc('player', 'genitaliaSize'),
                    hasPenis: npc.body.genitalia === 1,
                    npcName: getNpcDisplayName(thisNpcId)
                };

                const text = getArchetypeAchievementText(thisNpcId, archetype, isIntimate, ctx);
                const pronouns = getNpcPronouns(thisNpcId);
                this.text = text || `${getNpcDisplayName(thisNpcId)} seems thrilled with ${pronouns.possessive} new look!`;

                this.actions = [];

                // Offer intimate option directly from celebration if ready
                if (npc.archetypeIntimateReady && !npc.sexUnlocked) {
                    const sexSceneId = thisNpcId === 'mrs_thornwick' ? 'thornwick_sex_intro' : `${thisNpcId}_sex_intro`;
                    this.actions.push({
                        label: `Stay with ${pronouns.object}...`,
                        nextScene: sexSceneId
                    });
                }

                this.actions.push({
                    label: 'Continue',
                    callback: () => {
                        SceneManager.playScene(`location_${getNpcLocation(thisNpcId)}`);
                    }
                });
            },
            actions: []
        };
    }
}

generateArchetypeAchievementScenes();

