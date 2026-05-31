// UI Management

const UI = {
    elements: {},
    codexHistoryIndex: null,
    codexCurrentNpcId: null,
    codexCurrentView: 'details',  // 'details', 'portraits', 'scenes'
    codexPortraitG: 0,
    codexPortraitAxis: 'chest',  // which stat to progress through
    codexLockedValues: { chest: 2, muscle: 1, butt: 2, genitaliaSize: 0 },

    init() {
        // Cache DOM elements
        this.elements = {
            // Screens
            introScreen: document.getElementById('intro-screen'),
            startGameBtn: document.getElementById('start-game-btn'),
            statsModal: document.getElementById('stats-modal'),
            restartModal: document.getElementById('restart-modal'),

            // Player sidebar
            playerImage: document.getElementById('player-image'),
            playerName: document.getElementById('player-name'),
            statAether: document.getElementById('stat-aether'),
            statCoin: document.getElementById('stat-coin'),
            btnPlayerDetails: document.getElementById('btn-player-details'),
            // Save/Load/Restart buttons
            btnSaveLoad: document.getElementById('btn-save-load'),
            saveLoadModal: document.getElementById('save-load-modal'),
            saveSlotList: document.getElementById('save-slot-list'),
            btnCloseSaveLoad: document.getElementById('btn-close-save-load'),
            btnRestart: document.getElementById('btn-restart'),
            btnConfirmRestart: document.getElementById('btn-confirm-restart'),
            btnCancelRestart: document.getElementById('btn-cancel-restart'),

            // Notification
            notification: document.getElementById('notification'),
            notificationText: document.getElementById('notification-text'),

            // Day Overlay
            dayOverlay: document.getElementById('day-overlay'),
            dayOverlayText: document.getElementById('day-overlay-text'),

            // Stats modal
            statGenitalia: document.getElementById('stat-genitalia'),
            statGenitaliaSize: document.getElementById('stat-genitalia-size'),
            statChest: document.getElementById('stat-chest'),
            statMuscle: document.getElementById('stat-muscle'),
            statButt: document.getElementById('stat-butt'),
            btnCloseStats: document.getElementById('btn-close-stats'),
            prototypeEffectDisplay: document.getElementById('prototype-effect-display'),
            currentEffectName: document.getElementById('current-effect-name'),
            currentEffectDesc: document.getElementById('current-effect-desc'),
            contentSexScenes: document.getElementById('content-sex-scenes'),
            contentSexTransforms: document.getElementById('content-sex-transforms'),
            contentTowerScenes: document.getElementById('content-tower-scenes'),
            contentMiraScenes: document.getElementById('content-mira-scenes'),
            contentPrototypeEffects: document.getElementById('content-prototype-effects'),
            contentMiscScenes: document.getElementById('content-misc-scenes'),

            // Header
            dayDisplay: document.getElementById('day-display'),
            phaseDisplay: document.getElementById('phase-display'),
            locationDisplay: document.getElementById('location-display'),

            // Main content
            sceneImage: document.getElementById('scene-image'),
            speakerName: document.getElementById('speaker-name'),
            dialogueText: document.getElementById('dialogue-text'),
            actionButtons: document.getElementById('action-buttons'),

            // Gender select

            // Character Codex Modal
            characterModal: document.getElementById('character-modal'),
            btnCharacters: document.getElementById('btn-characters'),
            btnCloseCharacters: document.getElementById('btn-close-characters'),
            characterListBtns: document.querySelectorAll('.character-list-btn'),
            codexPortrait: document.getElementById('codex-portrait'),
            codexName: document.getElementById('codex-name'),
            codexRole: document.getElementById('codex-role'),
            codexDescription: document.getElementById('codex-description'),
            codexStats: document.getElementById('codex-stats'),
            codexTrust: document.getElementById('codex-trust'),
            codexDesires: document.getElementById('codex-desires'),
            codexGalleryButtons: document.getElementById('codex-gallery-buttons'),
            btnCodexPortraits: document.getElementById('btn-codex-portraits'),
            btnCodexScenes: document.getElementById('btn-codex-scenes'),
            codexPortraitGallery: document.getElementById('codex-portrait-gallery'),
            codexSceneGallery: document.getElementById('codex-scene-gallery'),
            codexGenitaliaToggle: document.getElementById('codex-genitalia-toggle'),
            codexAxisTabs: document.getElementById('codex-axis-tabs'),
            codexLockedStats: document.getElementById('codex-locked-stats'),
            codexPortraitGrid: document.getElementById('codex-portrait-grid'),
            codexSceneList: document.getElementById('codex-scene-list'),
            btnGalleryBackPortraits: document.getElementById('btn-gallery-back-portraits'),
            btnGalleryBackScenes: document.getElementById('btn-gallery-back-scenes'),
            codexHistoryNav: document.getElementById('codex-history-nav'),
            codexHistFirst: document.getElementById('codex-hist-first'),
            codexHistPrev: document.getElementById('codex-hist-prev'),
            codexHistNext: document.getElementById('codex-hist-next'),
            codexHistLast: document.getElementById('codex-hist-last'),
            codexHistLabel: document.getElementById('codex-hist-label'),

            // Dev Tools
            btnDevMode: document.getElementById('btn-dev-mode'),
            devToolsContainer: document.getElementById('dev-tools-container'),
            devAether: document.getElementById('dev-aether'),
            btnSetAether: document.getElementById('btn-set-aether'),
            devTrustNpc: document.getElementById('dev-trust-npc'),
            devTrustValue: document.getElementById('dev-trust-value'),
            btnSetTrust: document.getElementById('btn-set-trust'),
            devBodyStat: document.getElementById('dev-body-stat'),
            devBodyValue: document.getElementById('dev-body-value'),
            btnSetBody: document.getElementById('btn-set-body'),
            devTierTarget: document.getElementById('dev-tier-target'),
            devTierPair: document.getElementById('dev-tier-pair'),
            btnSkipTier: document.getElementById('btn-skip-tier'),

            // Image Overlay
            imageOverlay: document.getElementById('image-overlay'),
            imageOverlayImg: document.getElementById('image-overlay-img'),
            imageOverlayClose: document.getElementById('image-overlay-close'),

            // Desire Tracker
            desireTracker: document.getElementById('desire-tracker'),
            desireTrackerContent: document.getElementById('desire-tracker-content'),

            // Scene Jump Modal
            sceneJumpModal: document.getElementById('scene-jump-modal'),
            btnSceneJump: document.getElementById('btn-scene-jump'),
            btnCloseSceneJump: document.getElementById('btn-close-scene-jump'),
            sceneSearch: document.getElementById('scene-search'),
            sceneCategoryFilter: document.getElementById('scene-category-filter'),
            sceneCount: document.getElementById('scene-count'),
            sceneJumpList: document.getElementById('scene-jump-list'),

            // Mobile
            mobileMenuBtn: document.getElementById('mobile-menu-btn'),
            sidebarOverlay: document.getElementById('sidebar-overlay'),
            playerSidebar: document.getElementById('player-sidebar')
        };

        this.bindEvents();
        this.initDevMode();
        this.initMobileMenu();

        // Initialize desire tracker
        this.updateDesireTracker();
    },

    bindEvents() {
        // Start game button
        this.elements.startGameBtn.addEventListener('click', () => {
            this.onStartGame();
        });

        // Body type toggle on intro screen
        document.querySelectorAll('.body-toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.body-toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Stats modal
        this.elements.btnPlayerDetails.addEventListener('click', () => {
            this.showStatsModal();
        });

        this.elements.btnCloseStats.addEventListener('click', () => {
            this.hideStatsModal();
        });

        this.elements.statsModal.addEventListener('click', (e) => {
            if (e.target === this.elements.statsModal) {
                this.hideStatsModal();
            }
        });

        // Save/Load/Restart
        this.elements.btnSaveLoad.addEventListener('click', () => {
            this.showSaveLoadModal();
        });

        this.elements.btnCloseSaveLoad.addEventListener('click', () => {
            this.hideSaveLoadModal();
        });

        this.elements.saveLoadModal.addEventListener('click', (e) => {
            if (e.target === this.elements.saveLoadModal) {
                this.hideSaveLoadModal();
            }
        });

        this.elements.btnRestart.addEventListener('click', () => {
            this.showRestartModal();
        });

        this.elements.btnConfirmRestart.addEventListener('click', () => {
            this.confirmRestart();
        });

        this.elements.btnCancelRestart.addEventListener('click', () => {
            this.hideRestartModal();
        });

        this.elements.restartModal.addEventListener('click', (e) => {
            if (e.target === this.elements.restartModal) {
                this.hideRestartModal();
            }
        });

        // Character Codex Modal
        this.elements.btnCharacters.addEventListener('click', () => {
            this.showCharacterModal();
        });

        this.elements.btnCloseCharacters.addEventListener('click', () => {
            this.hideCharacterModal();
        });

        this.elements.characterModal.addEventListener('click', (e) => {
            if (e.target === this.elements.characterModal) {
                this.hideCharacterModal();
            }
        });

        this.elements.characterListBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const npcId = btn.dataset.npc;
                this.showCharacterDetails(npcId);
                // Update active state
                this.elements.characterListBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Gallery buttons
        this.elements.btnCodexPortraits.addEventListener('click', () => {
            this.showCodexPortraitGallery();
        });

        this.elements.btnCodexScenes.addEventListener('click', () => {
            this.showCodexSceneGallery();
        });

        // Back buttons
        this.elements.btnGalleryBackPortraits.addEventListener('click', () => {
            this.showCodexDetailsView();
            this.showCharacterDetails(this.codexCurrentNpcId);
        });

        this.elements.btnGalleryBackScenes.addEventListener('click', () => {
            this.showCodexDetailsView();
            this.showCharacterDetails(this.codexCurrentNpcId);
        });

        // Genitalia toggle (delegated)
        this.elements.codexGenitaliaToggle.addEventListener('click', (e) => {
            const btn = e.target.closest('.codex-toggle-btn');
            if (!btn) return;
            this.codexPortraitG = parseInt(btn.dataset.g);
            // g1+gs0 images are identical to g0 - bump gs to 2 when switching to penis
            if (this.codexPortraitG === 1 && this.codexLockedValues.genitaliaSize === 0) {
                this.codexLockedValues.genitaliaSize = 2;
            }
            this.renderPortraitControls();
        });

        // Axis tabs (delegated)
        this.elements.codexAxisTabs.addEventListener('click', (e) => {
            const btn = e.target.closest('.codex-toggle-btn');
            if (!btn) return;
            this.codexPortraitAxis = btn.dataset.axis;
            this.renderPortraitControls();
        });

        // Locked stat selectors (delegated)
        this.elements.codexLockedStats.addEventListener('click', (e) => {
            const btn = e.target.closest('.codex-toggle-btn');
            if (!btn) return;
            this.codexLockedValues[btn.dataset.stat] = parseInt(btn.dataset.val);
            this.renderPortraitControls();
        });

        // Dev Mode Toggle (elements only exist in index-dev.html)
        if (this.elements.btnDevMode) {
            this.elements.btnDevMode.addEventListener('click', () => {
                this.toggleDevMode();
            });

            this.elements.btnSetAether.addEventListener('click', () => {
                this.devSetAether();
            });

            this.elements.btnSetTrust.addEventListener('click', () => {
                this.devSetTrust();
            });

            this.elements.btnSetBody.addEventListener('click', () => {
                this.devSetBody();
            });

            this.elements.btnSkipTier.addEventListener('click', () => {
                this.devSkipTier();
            });

            this.elements.devAether.addEventListener('focus', () => {
                if (gameState) {
                    this.elements.devAether.value = gameState.player.aether || 0;
                }
            });

            this.elements.devTrustNpc.addEventListener('change', () => {
                if (gameState) {
                    const npcId = this.elements.devTrustNpc.value;
                    this.elements.devTrustValue.value = gameState.npcs[npcId]?.trust || 0;
                }
            });

            this.elements.devBodyStat.addEventListener('change', () => {
                if (gameState) {
                    const stat = this.elements.devBodyStat.value;
                    const value = gameState.player.body[stat];
                    this.elements.devBodyValue.value = value !== undefined ? value : 0;
                    if (stat === 'genitalia') {
                        this.elements.devBodyValue.max = 1;
                    } else if (stat === 'genitaliaSize') {
                        this.elements.devBodyValue.max = 3;
                    } else {
                        this.elements.devBodyValue.max = 5;
                    }
                }
            });
        }

        // Image Overlay - close button
        this.elements.imageOverlayClose.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideImageOverlay();
        });

        // Image Overlay - click background to close
        this.elements.imageOverlay.addEventListener('click', (e) => {
            if (e.target === this.elements.imageOverlay) {
                this.hideImageOverlay();
            }
        });

        // Image Overlay - escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.elements.imageOverlay.classList.contains('hidden')) {
                this.hideImageOverlay();
            }
        });

        // Make images clickable
        this.elements.playerImage.classList.add('clickable-image');
        this.elements.playerImage.addEventListener('click', () => {
            this.showImageOverlay(this.elements.playerImage.src);
        });

        this.elements.sceneImage.classList.add('clickable-image');
        this.elements.sceneImage.addEventListener('click', () => {
            if (this.elements.sceneImage.src) {
                this.showImageOverlay(this.elements.sceneImage.src);
            }
        });

        this.elements.codexPortrait.classList.add('clickable-image');
        this.elements.codexPortrait.addEventListener('click', () => {
            if (this.elements.codexPortrait.src) {
                this.showImageOverlay(this.elements.codexPortrait.src);
            }
        });

        // Codex history navigation
        this.elements.codexHistFirst.addEventListener('click', () => {
            if (this.codexCurrentNpcId) this.showHistoricalNpcImage(this.codexCurrentNpcId, 0);
        });
        this.elements.codexHistPrev.addEventListener('click', () => {
            if (this.codexCurrentNpcId && this.codexHistoryIndex > 0) {
                this.showHistoricalNpcImage(this.codexCurrentNpcId, this.codexHistoryIndex - 1);
            }
        });
        this.elements.codexHistNext.addEventListener('click', () => {
            if (this.codexCurrentNpcId) {
                const history = gameState.npcs[this.codexCurrentNpcId]?.bodyHistory || [];
                if (this.codexHistoryIndex < history.length - 1) {
                    this.showHistoricalNpcImage(this.codexCurrentNpcId, this.codexHistoryIndex + 1);
                }
            }
        });
        this.elements.codexHistLast.addEventListener('click', () => {
            if (this.codexCurrentNpcId) {
                const history = gameState.npcs[this.codexCurrentNpcId]?.bodyHistory || [];
                this.showHistoricalNpcImage(this.codexCurrentNpcId, history.length - 1);
            }
        });

        // Scene Jump Modal (only exists in index-dev.html)
        if (this.elements.btnSceneJump) {
            this.elements.btnSceneJump.addEventListener('click', () => {
                this.showSceneJumpModal();
            });

            this.elements.btnCloseSceneJump.addEventListener('click', () => {
                this.hideSceneJumpModal();
            });

            this.elements.sceneJumpModal.addEventListener('click', (e) => {
                if (e.target === this.elements.sceneJumpModal) {
                    this.hideSceneJumpModal();
                }
            });

            this.elements.sceneSearch.addEventListener('input', () => {
                this.filterSceneJumpList();
            });
        }

        this.elements.sceneCategoryFilter?.addEventListener('change', () => {
            this.filterSceneJumpList();
        });
    },

    onStartGame() {
        const activeBtn = document.querySelector('.body-toggle-btn.active');
        const genitalia = activeBtn?.dataset.genitalia === '1' ? 1 : 0;
        initState(genitalia);
        this.hideIntroScreen();
        this.updateAll();
        this.showDayOverlay(1);
        this.showWorkshopIntro();
    },

    hideIntroScreen() {
        this.elements.introScreen.classList.add('hidden');
    },

    showIntroScreen() {
        this.elements.introScreen.classList.remove('hidden');
    },

    showStatsModal() {
        this.updateStatsModal();
        this.elements.statsModal.classList.remove('hidden');
    },

    hideStatsModal() {
        this.elements.statsModal.classList.add('hidden');
    },

    showImageOverlay(imageSrc) {
        if (!imageSrc) return;
        this.elements.imageOverlayImg.src = imageSrc;
        this.elements.imageOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    },

    hideImageOverlay() {
        this.elements.imageOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    },

    updateAll() {
        this.updatePlayerSidebar();
        this.updateHeader();
    },

    updatePlayerSidebar() {
        if (!gameState) return;

        const p = gameState.player;

        // Update image (avatar updates in-place when body changes)
        this.elements.playerImage.src = getPlayerImagePath();
        this.elements.playerImage.onerror = () => {
            this.elements.playerImage.src = 'images/placeholders/player.webp';
        };

        // Update name
        this.elements.playerName.textContent = p.name;

        // Update mini stats
        this.elements.statAether.textContent = p.aether || 0;
        this.elements.statCoin.textContent = p.coin;
    },

    updateStatsModal() {
        if (!gameState) return;

        const b = gameState.player.body;

        this.elements.statGenitalia.textContent = getStatLabel('genitalia', b.genitalia);
        this.elements.statGenitaliaSize.textContent = getStatLabel('genitaliaSize', b.genitaliaSize);
        this.elements.statChest.textContent = getStatLabel('chest', b.chest);
        this.elements.statMuscle.textContent = getStatLabel('muscle', b.muscle);
        this.elements.statButt.textContent = getStatLabel('butt', b.butt);

        // Show current prototype effect if any
        const effect = getCurrentPrototypeEffect();
        if (effect) {
            this.elements.prototypeEffectDisplay.classList.remove('hidden');
            this.elements.currentEffectName.textContent = effect.name;
            this.elements.currentEffectDesc.textContent = effect.description;
        } else {
            this.elements.prototypeEffectDisplay.classList.add('hidden');
        }

        // Content tracking
        this.updateContentStats();
    },

    updateContentStats() {
        if (!gameState) return;

        const unlocked = gameState.unlockedScenes || [];

        // Sex scenes: 1 per NPC, any _sex_ scene counts
        const sexNpcPrefixes = ['mira_sex_', 'vessa_sex_', 'barret_sex_', 'della_sex_', 'fiona_sex_', 'lenna_sex_', 'thornwick_sex_', 'aldric_sex_', 'corwin_sex_', 'holt_sex_'];
        const sexCount = sexNpcPrefixes.filter(prefix => unlocked.some(s => s.startsWith(prefix))).length;

        // Sex transformations: 1 per NPC (_sex_transform scene)
        const transformScenes = ['mira_sex_transform', 'vessa_sex_transform', 'barret_sex_transform', 'della_sex_transform', 'fiona_sex_transform', 'lenna_sex_transform', 'thornwick_sex_transform', 'aldric_sex_transform', 'corwin_sex_transform', 'holt_sex_transform'];
        const transformCount = transformScenes.filter(s => unlocked.includes(s)).length;

        // Tower scenes: individual visit concepts
        const towerScenes = ['tower_visit_bunny', 'tower_visit_dog', 'tower_visit_fox', 'tower_visit_cow', 'tower_visit_elf', 'tower_visit_dragon', 'tower_visit_rubber', 'tower_visit_cascade', 'tower_visit_miniature', 'tower_visit_miniature_latex', 'tower_visit_both_genitals', 'tower_visit_penis_experiment', 'tower_visit_thornwick_bimbo', 'tower_skinsuit_arrival'];
        const towerCount = towerScenes.filter(s => unlocked.includes(s)).length;

        // Mira scenes: deliveries (5) + accidents (11) + sex solicitation (1) = 17
        // (Mira sex + sex transform tracked in their own categories above)
        const seenDeliveries = (gameState.flags && gameState.flags.seen_mira_deliveries) || [];
        const seenAccidents = (gameState.flags && gameState.flags.seen_mira_accidents) || [];
        const miraSolicitation = unlocked.includes('mira_delivery_sex') ? 1 : 0;
        const miraCount = seenDeliveries.length + seenAccidents.length + miraSolicitation;

        // Prototype effects: 18 total
        const prototypeCount = (gameState.prototypeEffectsSeen || []).length;

        // Misc scenes: story events (1 each, any part counts)
        const miscScenes = [
            { check: s => s.startsWith('mira_thornwick_vignette_') },  // Thornwick dare
            { check: s => s === 'story_vessa_transform_first' || s === 'story_vessa_transform' },  // Vessa transform
            { check: s => s.startsWith('story_corwin_bet_') },  // Corwin's bet
            { check: s => s === 'story_holt_revelation' || s === 'story_holt_confession' || s === 'story_holt_transform_aftermath' },  // Holt's revelation
            { check: s => s === 'story_aldric_accident_intro' || s === 'story_aldric_accident_reaction' },  // Aldric's accident
        ];
        const miscCount = miscScenes.filter(m => unlocked.some(s => m.check(s))).length;

        this.elements.contentSexScenes.textContent = `${sexCount} / 10`;
        this.elements.contentSexTransforms.textContent = `${transformCount} / 10`;
        this.elements.contentTowerScenes.textContent = `${towerCount} / 14`;
        this.elements.contentMiraScenes.textContent = `${miraCount} / 17`;
        this.elements.contentPrototypeEffects.textContent = `${prototypeCount} / 18`;
        this.elements.contentMiscScenes.textContent = `${miscCount} / 5`;
    },

    updateHeader() {
        if (!gameState) return;

        this.elements.dayDisplay.textContent = `Day ${gameState.day}`;
        this.elements.phaseDisplay.textContent = capitalizeFirst(gameState.phase);
        this.elements.locationDisplay.textContent = getLocationName(gameState.currentLocation);

        this.updateDesireTracker();
    },

    toggleDesireTracker() {
        const tracker = this.elements.desireTracker;
        if (!tracker) return;

        const isCollapsed = tracker.classList.toggle('collapsed');
        gameState.ui = gameState.ui || {};
        gameState.ui.desireTrackerExpanded = !isCollapsed;
        saveState();

        // Update toggle indicator
        const toggle = tracker.querySelector('.desire-tracker-toggle');
        if (toggle) {
            toggle.textContent = isCollapsed ? '▲' : '▼';
        }
    },

    updateDesireTracker() {
        const content = this.elements.desireTrackerContent;
        if (!content) return;

        // Guard against being called before gameState is initialized
        if (!gameState || !gameState.npcs) return;

        // Hide tracker until workshop is unlocked (Go Outside available)
        const tracker = this.elements.desireTracker;
        if (tracker) {
            if (!gameState.flags || !gameState.flags.mira_story_day3_complete) {
                tracker.style.display = 'none';
                return;
            } else if (tracker.style.display === 'none') {
                tracker.style.display = '';
                tracker.classList.add('desire-tracker-reveal');
                setTimeout(() => tracker.classList.remove('desire-tracker-reveal'), 1500);
            }
        }

        const npcOrder = ['mira', 'fiona', 'della', 'vessa', 'lenna', 'mrs_thornwick', 'barret', 'aldric', 'corwin', 'holt'];

        let html = '';
        for (const npcId of npcOrder) {
            const entry = getDesireTrackerText(npcId);
            if (!entry) continue;

            let itemClass = 'desire-tracker-item';
            if (entry.state === 'max-trust') {
                itemClass += ' max-trust';
            } else if (entry.state === 'satisfied') {
                itemClass += ' satisfied';
            }

            html += `<div class="${itemClass}"><strong>${entry.name}:</strong> ${entry.text}</div>`;
        }

        content.innerHTML = html;

        // Restore collapsed state
        const trackerEl = this.elements.desireTracker;
        if (trackerEl && gameState.ui && !gameState.ui.desireTrackerExpanded) {
            trackerEl.classList.add('collapsed');
            const toggle = trackerEl.querySelector('.desire-tracker-toggle');
            if (toggle) toggle.textContent = '▲';
        }
    },

    setDialogue(speaker, text) {
        this.elements.speakerName.textContent = speaker || '';

        // Find NPC ID from speaker name for coloring
        let speakerNpcId = null;
        if (speaker) {
            const npcIds = ['mira', 'aldric', 'vessa', 'mrs_thornwick', 'fiona', 'barret', 'lenna', 'corwin', 'della', 'holt'];
            speakerNpcId = npcIds.find(id => getNpcDisplayName(id) === speaker);
        }

        // Format dialogue text with colors and line breaks
        if (typeof formatDialogueText === 'function') {
            this.elements.dialogueText.innerHTML = formatDialogueText(text, speakerNpcId);
        } else {
            // Fallback to plain text
            this.elements.dialogueText.textContent = text;
        }

        // Apply NPC color to speaker name if applicable
        if (speakerNpcId && typeof getNpcColor === 'function') {
            this.elements.speakerName.style.color = getNpcColor(speakerNpcId);
        } else {
            // Reset to default accent color
            this.elements.speakerName.style.color = '';
        }
    },

    setSceneImage(src) {
        // Convert legacy character paths to dynamic NPC portrait paths
        // e.g., images/characters/mira_neutral.webp -> getNpcImagePath('mira')
        let imagePath = src;
        const legacyMatch = src.match(/images\/characters\/(\w+)_\w+\.webp/);
        if (legacyMatch) {
            const npcId = legacyMatch[1];
            if (gameState && gameState.npcs[npcId]) {
                imagePath = getNpcImagePath(npcId);
            }
        }

        this.elements.sceneImage.src = imagePath;
        this.elements.sceneImage.onerror = () => {
            this.elements.sceneImage.src = 'images/placeholders/scene.webp';
        };
    },

    // Dual-portrait mode: show two images side-by-side
    setDualSceneImages(leftSrc, rightSrc) {
        const sceneArea = document.getElementById('scene-area');
        const singleImg = this.elements.sceneImage;

        // Hide the single scene image
        singleImg.style.display = 'none';

        // Remove any existing dual-portrait container
        const existing = sceneArea.querySelector('.scene-dual-portrait');
        if (existing) existing.remove();

        // Create the dual-portrait container
        const container = document.createElement('div');
        container.className = 'scene-dual-portrait';

        const leftImg = document.createElement('img');
        leftImg.className = 'dual-portrait-img clickable-image';
        leftImg.src = leftSrc;
        leftImg.alt = 'Left character';
        leftImg.onerror = () => { leftImg.src = 'images/placeholders/npc.webp'; };
        leftImg.addEventListener('click', () => {
            this.showImageOverlay(leftImg.src);
        });

        const rightImg = document.createElement('img');
        rightImg.className = 'dual-portrait-img clickable-image';
        rightImg.src = rightSrc;
        rightImg.alt = 'Right character';
        rightImg.onerror = () => { rightImg.src = 'images/placeholders/npc.webp'; };
        rightImg.addEventListener('click', () => {
            this.showImageOverlay(rightImg.src);
        });

        container.appendChild(leftImg);
        container.appendChild(rightImg);

        sceneArea.appendChild(container);
    },

    // Clear dual-portrait layout and restore single-image mode
    clearDualPortrait() {
        const sceneArea = document.getElementById('scene-area');
        const existing = sceneArea.querySelector('.scene-dual-portrait');
        if (existing) existing.remove();

        // Restore the single scene image
        this.elements.sceneImage.style.display = '';
    },

    setActions(actions) {
        this.elements.actionButtons.innerHTML = '';

        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'action-btn';
            // Style "return to workshop" buttons distinctly
            const lbl = action.label.toLowerCase();
            if (lbl.includes('return to workshop') || lbl.includes('back to workshop') || lbl.includes('return to your workshop')) {
                btn.classList.add('action-btn-workshop');
            }
            btn.textContent = action.label;

            // Support for disabled buttons with reason
            if (action.disabled) {
                btn.disabled = true;
                btn.classList.add('disabled');
                if (action.disabledReason) {
                    btn.title = action.disabledReason;
                    btn.textContent = `${action.label} (${action.disabledReason})`;
                }
            } else {
                btn.addEventListener('click', () => {
                    if (action.callback) action.callback();
                });
            }

            this.elements.actionButtons.appendChild(btn);
        });
    },

    showWorkshopIntro() {
        // Use scene manager for proper image/prompt handling
        SceneManager.playScene('workshop_main');
    },

    // Advance to next phase. If silent=true, just update state without showing UI.
    advancePhase(silent = false) {
        const phases = ['morning', 'afternoon', 'evening'];
        const currentIndex = phases.indexOf(gameState.phase);
        let newDayMessage = '';
        let isNewDay = false;

        if (currentIndex < phases.length - 1) {
            gameState.phase = phases[currentIndex + 1];
        } else {
            gameState.phase = 'morning';
            gameState.day += 1;
            isNewDay = true;

            // Clear prototype effects on new day
            if (gameState.player.prototypeEffect) {
                const effect = getCurrentPrototypeEffect();
                clearPrototypeEffect();
                newDayMessage = `\n\nAs you wake, you notice the effects of yesterday's prototype mishap have worn off. Your ${effect.category} is back to normal.`;
                this.updatePlayerSidebar();
            }

            // Reset daily flags and day transition logic
            resetDailyFlags();
            gameState.miraVisitedWorkshopToday = false;
            gameState.towerVisitedToday = false;
            checkVendorRestock();
            refreshAllNpcDesires();
            rollNpcAdvance();

            // Passive aether absorption from ambient sources
            const passiveAether = applyPassiveAether();
            if (passiveAether > 0) {
                newDayMessage += `\n\nThe crystal cube pulses softly as ambient aether is drawn in. (+${passiveAether} Aether)`;
            }
        }

        // Reset per-phase interaction tracking and cached random rolls
        resetPhaseInteractions();
        clearPhaseRolls();

        saveState();
        this.updateHeader();

        // Show day overlay when a new day begins
        if (isNewDay) {
            this.showDayOverlay(gameState.day);
        }

        // In silent mode, skip the UI (scene will render normally after)
        if (silent) {
            return isNewDay;
        }

        if (newDayMessage) {
            this.setDialogue('', `A new day begins.${newDayMessage}`);
        }

        // On phase change (not new day): move player to town if they're
        // at a location that closes. Workshop always stays. Tavern stays at evening.
        const shouldReturnToTown = !isNewDay && (
            (gameState.currentLocation !== 'workshop' && gameState.phase !== 'evening') ||
            (gameState.phase === 'evening' && !['workshop', 'tavern'].includes(gameState.currentLocation))
        );
        if (shouldReturnToTown) {
            gameState.currentLocation = 'town';
            saveState();
            this.setActions([
                { label: 'Continue', callback: () => SceneManager.playScene('town_navigation') }
            ]);
        } else {
            this.setActions([
                { label: 'Continue', callback: () => this.showWorkshopIntro() }
            ]);
        }
        return isNewDay;
    },

    showDayOverlay(dayNumber) {
        this.elements.dayOverlayText.textContent = `Day ${dayNumber}`;
        this.elements.dayOverlay.classList.remove('hidden');
        this.elements.dayOverlay.classList.add('visible');

        // Remove overlay after animation completes (2 seconds)
        setTimeout(() => {
            this.elements.dayOverlay.classList.remove('visible');
            this.elements.dayOverlay.classList.add('hidden');
        }, 2000);
    },

    // Save/Load Modal Methods
    SAVE_SLOT_COUNT: 5,
    SAVE_KEY_PREFIX: 'magitechWorkshop_slot_',

    showSaveLoadModal() {
        this.renderSaveSlots();
        this.elements.saveLoadModal.classList.remove('hidden');
    },

    hideSaveLoadModal() {
        this.elements.saveLoadModal.classList.add('hidden');
    },

    getSaveSlotData(slotNum) {
        const raw = localStorage.getItem(this.SAVE_KEY_PREFIX + slotNum);
        if (!raw) return null;
        try { return JSON.parse(raw); } catch { return null; }
    },

    formatSlotDetail(data) {
        if (!data) return 'Empty';
        const day = data.day || 1;
        const phase = data.phase || 'morning';
        const saved = data._savedAt ? new Date(data._savedAt).toLocaleString() : 'Unknown date';
        return `Day ${day} — ${phase.charAt(0).toUpperCase() + phase.slice(1)} · Saved ${saved}`;
    },

    renderSaveSlots() {
        const list = this.elements.saveSlotList;
        list.innerHTML = '';

        for (let i = 1; i <= this.SAVE_SLOT_COUNT; i++) {
            const data = this.getSaveSlotData(i);
            const slot = document.createElement('div');
            slot.className = 'save-slot';

            const info = document.createElement('div');
            info.className = 'save-slot-info';
            info.innerHTML = `<div class="save-slot-label">Slot ${i}</div><div class="save-slot-detail">${this.formatSlotDetail(data)}</div>`;

            const buttons = document.createElement('div');
            buttons.className = 'save-slot-buttons';

            const saveBtn = document.createElement('button');
            saveBtn.className = 'save-slot-btn' + (data ? ' btn-overwrite' : '');
            saveBtn.textContent = data ? 'Overwrite' : 'Save';
            saveBtn.disabled = !gameState;
            saveBtn.addEventListener('click', () => this.saveToSlot(i, !!data));

            const loadBtn = document.createElement('button');
            loadBtn.className = 'save-slot-btn';
            loadBtn.textContent = 'Load';
            loadBtn.disabled = !data;
            loadBtn.addEventListener('click', () => this.loadFromSlot(i));

            buttons.appendChild(saveBtn);
            buttons.appendChild(loadBtn);
            slot.appendChild(info);
            slot.appendChild(buttons);
            list.appendChild(slot);
        }
    },

    saveToSlot(slotNum, isOverwrite) {
        if (isOverwrite && !confirm(`Overwrite Slot ${slotNum}?`)) return;
        const snapshot = JSON.parse(JSON.stringify(gameState));
        snapshot._savedAt = Date.now();
        localStorage.setItem(this.SAVE_KEY_PREFIX + slotNum, JSON.stringify(snapshot));
        this.showNotification(`Saved to Slot ${slotNum}!`, 'success');
        this.renderSaveSlots();
    },

    loadFromSlot(slotNum) {
        const data = this.getSaveSlotData(slotNum);
        if (!data) return;
        delete data._savedAt;
        gameState = data;
        migrateState();
        saveState();
        this.hideSaveLoadModal();
        this.hideIntroScreen();
        this.updateAll();
        if (gameState.currentSceneId && SCENES[gameState.currentSceneId]) {
            SceneManager.resumeScene(gameState.currentSceneId);
        } else {
            this.showWorkshopIntro();
        }
        this.showNotification(`Loaded Slot ${slotNum}!`, 'success');
    },

    showRestartModal() {
        this.elements.restartModal.classList.remove('hidden');
    },

    hideRestartModal() {
        this.elements.restartModal.classList.add('hidden');
    },

    confirmRestart() {
        clearState();
        this.hideRestartModal();
        this.showIntroScreen();
        this.showNotification('Game restarted.', 'success');
    },

    showNotification(message, type = 'info', duration = 3000) {
        this.elements.notificationText.textContent = message;
        this.elements.notification.className = 'notification ' + type;

        // Auto-hide after duration
        setTimeout(() => {
            this.elements.notification.classList.add('hidden');
        }, duration);
    },

    // Character Codex Methods
    showCharacterModal() {
        this.elements.characterModal.classList.remove('hidden');
        // Update Sylvie button label based on met status
        const sylvieBtn = document.querySelector('.character-list-btn[data-npc="sylvie"]');
        if (sylvieBtn) {
            sylvieBtn.textContent = (gameState.flags && gameState.flags.sylvie_reveal_complete) ? 'Sylvie' : '???';
        }
        // Select first character by default
        const firstBtn = this.elements.characterListBtns[0];
        if (firstBtn) {
            firstBtn.click();
        }
    },

    hideCharacterModal() {
        this.elements.characterModal.classList.add('hidden');
    },

    showCharacterDetails(npcId) {
        // Sylvie is a special character — not in gameState.npcs
        if (npcId === 'sylvie') {
            this.showSylvieDetails();
            return;
        }

        if (!gameState || !gameState.npcs[npcId]) return;

        const npc = gameState.npcs[npcId];
        const body = npc.body;
        const hasMet = hasSpokenToNpc(npcId);

        // Name - always shown
        this.elements.codexName.textContent = getNpcDisplayName(npcId);

        // Track current NPC and reset history index
        this.codexCurrentNpcId = npcId;
        this.codexHistoryIndex = null;

        // Check if NPC is locked (progression gating)
        if (!isNpcUnlocked(npcId)) {
            const isMaleNpc = body.genitalia === 1 && body.chest < 1;
            const silhouettePath = isMaleNpc
                ? 'images/placeholders/silhouette_male.webp'
                : 'images/placeholders/silhouette_female.webp';
            this.elements.codexPortrait.src = silhouettePath;
            this.elements.codexPortrait.onerror = () => {
                this.elements.codexPortrait.src = 'images/placeholders/npc.webp';
            };
            this.elements.codexHistoryNav.classList.add('hidden');
            this.elements.codexRole.textContent = '???';
            this.elements.codexDescription.textContent = "You haven't been properly introduced yet.";
            this.elements.codexStats.innerHTML = '<div class="codex-stat-item unknown">Unknown</div>';
            this.elements.codexTrust.innerHTML = '<div>Not yet acquainted</div>';
            this.elements.codexDesires.innerHTML = '<h4>Current Desire</h4><div class="codex-desire-item unknown">Unknown</div>';
            this.elements.codexGalleryButtons.classList.add('hidden');
            this.elements.codexPortraitGallery.classList.add('hidden');
            this.elements.codexSceneGallery.classList.add('hidden');
            return;
        }

        // Check if player has met this NPC
        if (!hasMet) {
            // Not met yet - show silhouette and minimal info
            const isMaleNpc = body.genitalia === 1 && body.chest < 1;
            const silhouettePath = isMaleNpc
                ? 'images/placeholders/silhouette_male.webp'
                : 'images/placeholders/silhouette_female.webp';
            this.elements.codexPortrait.src = silhouettePath;
            this.elements.codexPortrait.onerror = () => {
                this.elements.codexPortrait.src = 'images/placeholders/npc.webp';
            };

            // Hide history nav and other details
            this.elements.codexHistoryNav.classList.add('hidden');
            this.elements.codexRole.textContent = '???';
            this.elements.codexDescription.textContent = 'You have not met this person yet.';
            this.elements.codexStats.innerHTML = '<div class="codex-stat-item unknown">Unknown</div>';
            this.elements.codexTrust.innerHTML = '<div>Not yet acquainted</div>';
            this.elements.codexDesires.innerHTML = '<h4>Current Desire</h4><div class="codex-desire-item unknown">Unknown</div>';
            this.elements.codexGalleryButtons.classList.add('hidden');
            this.elements.codexPortraitGallery.classList.add('hidden');
            this.elements.codexSceneGallery.classList.add('hidden');
            return;
        }

        // Met - show full details
        // Portrait - use dynamic path based on NPC's current stats
        this.elements.codexPortrait.src = getNpcImagePath(npcId);
        this.elements.codexPortrait.onerror = () => {
            this.elements.codexPortrait.src = `images/placeholders/npc.webp`;
        };

        // Show/hide history navigation
        const history = npc.bodyHistory || [];
        if (history.length > 1) {
            this.elements.codexHistoryNav.classList.remove('hidden');
            this.codexHistoryIndex = history.length - 1;
            this.updateHistoryNavState(history);
        } else {
            this.elements.codexHistoryNav.classList.add('hidden');
        }

        // Role
        this.elements.codexRole.textContent = getNpcRole(npcId);

        // Description
        this.elements.codexDescription.textContent = getNpcDescription(npcId);

        // Physical stats (show value in brackets)
        const genitaliaLabel = body.genitalia === 0 ? 'Vagina' : 'Penis';
        const sizeLabel = getStatLabel('genitaliaSize', body.genitaliaSize);
        const statsHtml = `
            <div class="codex-stat-item">
                <span class="codex-stat-label">Genitalia:</span>
                <span class="codex-stat-value">${genitaliaLabel} (${sizeLabel})</span>
            </div>
            <div class="codex-stat-item">
                <span class="codex-stat-label">Chest:</span>
                <span class="codex-stat-value">${getStatLabel('chest', body.chest)} [${body.chest}]</span>
            </div>
            <div class="codex-stat-item">
                <span class="codex-stat-label">Muscle:</span>
                <span class="codex-stat-value">${getStatLabel('muscle', body.muscle)} [${body.muscle}]</span>
            </div>
            <div class="codex-stat-item">
                <span class="codex-stat-label">Butt:</span>
                <span class="codex-stat-value">${getStatLabel('butt', body.butt)} [${body.butt}]</span>
            </div>
        `;
        this.elements.codexStats.innerHTML = statsHtml;

        // Trust
        const trust = npc.trust || 0;
        const trustPercent = (trust / 100) * 100;
        const trustDesc = getTrustDescription(npcId);
        this.elements.codexTrust.innerHTML = `
            <div>Trust: ${trust}/100 - ${trustDesc}</div>
            <div class="codex-trust-bar">
                <div class="codex-trust-fill" style="width: ${trustPercent}%"></div>
            </div>
        `;

        // Current desire (dynamic system)
        let desiresHtml = '<h4>Current Desire</h4>';
        if (!isDesireRevealed(npcId)) {
            desiresHtml += '<div class="codex-desire-item unknown">Build more trust to learn their desires...</div>';
        } else {
            // Ensure NPC has a desire if they meet threshold but don't have one yet
            ensureNpcHasDesire(npcId);

            // Check for pending genital proposal
            if (npc.pendingGenitalProposal) {
                desiresHtml += '<div class="codex-desire-item" style="color: var(--accent-primary);">Wants to discuss something with you...</div>';
            // Check if NPC achieved their archetype and is in celebration/satisfaction
            } else if (npc.archetypeAchieved && npc.archetypeSatisfactionEnd && gameState.day < npc.archetypeSatisfactionEnd) {
                const archetype = typeof BODY_ARCHETYPES !== 'undefined' ? BODY_ARCHETYPES[npc.hiddenArchetype] : null;
                const archName = archetype?.name || 'their ideal';
                desiresHtml += `<div class="codex-desire-item satisfied">Thrilled with their new look!</div>`;
                desiresHtml += `<div class="codex-desire-item" style="font-size: 0.8em; color: var(--accent-primary);">Achieved: ${archName}</div>`;
                const daysLeft = npc.archetypeSatisfactionEnd - gameState.day;
                desiresHtml += `<div class="codex-desire-item" style="font-size: 0.8em; color: var(--text-secondary);">Content for ${daysLeft} more day${daysLeft !== 1 ? 's' : ''}</div>`;
            // Check if NPC is in normal satisfaction period
            } else if (isNpcSatisfied(npcId)) {
                const daysLeft = npc.satisfactionEndDay - gameState.day;
                desiresHtml += `<div class="codex-desire-item satisfied">${getContentmentText(npcId)}</div>`;
                desiresHtml += `<div class="codex-desire-item" style="font-size: 0.8em; color: var(--text-secondary);">Content for ${daysLeft} more day${daysLeft !== 1 ? 's' : ''}</div>`;
            } else {
                const desire = getNpcCurrentDesire(npcId);
                if (desire) {
                    // Check if desire has been revealed through dialogue
                    const legacyDesireRevealed = npc?.desiresRevealed?.some(r => r === true);
                    const desireKnown = npc.desireKnownToPlayer || npc.desireRevealed || legacyDesireRevealed;
                    if (!desireKnown) {
                        desiresHtml += '<div class="codex-desire-item unknown">Chat with them to learn what they want...</div>';
                    } else {
                        const currentVal = body[desire.stat];
                        const targetVal = desire.target;
                        const status = currentVal === targetVal ? '✓ Fulfilled!' : (currentVal < targetVal ? '↑ Wants more' : '↓ Wants less');
                        const desireLabel = desire.label || `Work on ${desire.stat}`;
                        desiresHtml += `<div class="codex-desire-item">${desireLabel} ${status}</div>`;

                        // Show comparison NPC or whim indicator
                        if (desire.comparedTo) {
                            desiresHtml += `<div class="codex-desire-item" style="font-size: 0.8em; color: var(--text-secondary);">Comparing to ${getNpcDisplayName(desire.comparedTo)}</div>`;
                        } else if (desire.isWhim) {
                            desiresHtml += `<div class="codex-desire-item" style="font-size: 0.8em; color: var(--text-secondary);">A spontaneous whim</div>`;
                        }
                    }
                } else {
                    desiresHtml += '<div class="codex-desire-item unknown">Currently content...</div>';
                }
            }
        }
        this.elements.codexDesires.innerHTML = desiresHtml;

        // Show gallery buttons if NPC has been met
        if (hasMet && isNpcUnlocked(npcId)) {
            this.elements.codexGalleryButtons.classList.remove('hidden');
            this.elements.btnCodexPortraits.textContent = 'Portraits';
        } else {
            this.elements.codexGalleryButtons.classList.add('hidden');
        }

        // Reset to details view
        this.codexCurrentView = 'details';
        this.elements.codexPortraitGallery.classList.add('hidden');
        this.elements.codexSceneGallery.classList.add('hidden');
        this.showCodexDetailsView();
    },

    showSylvieDetails() {
        const hasMet = gameState.flags && gameState.flags.sylvie_reveal_complete;

        this.codexCurrentNpcId = 'sylvie';
        this.codexHistoryIndex = null;

        // Update button label based on met status
        const sylvieBtn = document.querySelector('.character-list-btn[data-npc="sylvie"]');
        if (sylvieBtn) {
            sylvieBtn.textContent = hasMet ? 'Sylvie' : '???';
        }

        // Name
        this.elements.codexName.textContent = hasMet ? 'Sylvie' : '???';

        if (!hasMet) {
            // Not met — show silhouette and locked info
            this.elements.codexPortrait.src = 'images/placeholders/silhouette_female.webp';
            this.elements.codexPortrait.onerror = () => {
                this.elements.codexPortrait.src = 'images/placeholders/npc.webp';
            };
            this.elements.codexHistoryNav.classList.add('hidden');
            this.elements.codexRole.textContent = '???';
            this.elements.codexDescription.textContent = 'You have not met this person yet.';
            this.elements.codexStats.innerHTML = '<div class="codex-stat-item unknown">Unknown</div>';
            this.elements.codexTrust.innerHTML = '<div>Not yet acquainted</div>';
            this.elements.codexDesires.innerHTML = '<h4>Current Desire</h4><div class="codex-desire-item unknown">Unknown</div>';
            this.elements.codexGalleryButtons.classList.add('hidden');
            this.elements.codexPortraitGallery.classList.add('hidden');
            this.elements.codexSceneGallery.classList.add('hidden');
            return;
        }

        // Met — show Sylvie's info
        this.elements.codexPortrait.src = 'images/tower/sylvie_portrait.webp';
        this.elements.codexPortrait.onerror = () => {
            this.elements.codexPortrait.src = 'images/placeholders/npc.webp';
        };
        this.elements.codexHistoryNav.classList.add('hidden');

        this.elements.codexRole.textContent = getNpcRole('sylvie');
        this.elements.codexDescription.textContent = getNpcDescription('sylvie');

        // Sylvie has no body stats or trust
        this.elements.codexStats.innerHTML = '';
        this.elements.codexTrust.innerHTML = '';
        this.elements.codexDesires.innerHTML = '';

        // Show gallery buttons — "Images" instead of "Portraits" for Sylvie
        this.elements.codexGalleryButtons.classList.remove('hidden');
        this.elements.btnCodexPortraits.textContent = 'Images';
        this.elements.btnCodexScenes.textContent = 'Scenes';

        // Reset to details view
        this.codexCurrentView = 'details';
        this.elements.codexPortraitGallery.classList.add('hidden');
        this.elements.codexSceneGallery.classList.add('hidden');
        this.showCodexDetailsView();
    },

    showCodexDetailsView() {
        this.codexCurrentView = 'details';
        const info = document.querySelector('.character-info');
        if (info) {
            for (const child of info.children) {
                if (child.id === 'codex-portrait-gallery' || child.id === 'codex-scene-gallery') {
                    child.classList.add('hidden');
                } else {
                    child.classList.remove('hidden');
                }
            }
        }
        // Collapse expanded modal and restore portrait column
        const modalContent = this.elements.characterModal.querySelector('.modal-content');
        if (modalContent) modalContent.classList.remove('codex-gallery-expanded');
        const portraitCol = document.querySelector('.character-portrait');
        if (portraitCol) portraitCol.classList.remove('hidden');
    },

    showCodexPortraitGallery() {
        this.codexCurrentView = 'portraits';
        const npcId = this.codexCurrentNpcId;
        if (!npcId) return;

        // Sylvie: show vignette image gallery instead of stat-based portraits
        if (npcId === 'sylvie') {
            this.showSylvieImageGallery();
            return;
        }

        // Hide detail elements, show portrait gallery
        const info = document.querySelector('.character-info');
        if (info) {
            for (const child of info.children) {
                if (child.id === 'codex-portrait-gallery') {
                    child.classList.remove('hidden');
                } else {
                    child.classList.add('hidden');
                }
            }
        }

        // Expand modal and hide NPC portrait column
        const modalContent = this.elements.characterModal.querySelector('.modal-content');
        if (modalContent) modalContent.classList.add('codex-gallery-expanded');
        const portraitCol = document.querySelector('.character-portrait');
        if (portraitCol) portraitCol.classList.add('hidden');

        // Ensure portrait layout (not landscape)
        this.elements.codexPortraitGrid.classList.remove('landscape');

        // Default genitalia to NPC's current value, axis to chest
        const npc = gameState.npcs[npcId];
        this.codexPortraitG = npc ? npc.body.genitalia : 0;
        this.codexPortraitAxis = 'chest';
        // Default locked values to NPC's current stats (bucketed)
        if (npc) {
            const b = npc.body;
            this.codexLockedValues = {
                chest: b.chest,
                muscle: b.muscle >= 1 ? b.muscle : 1,
                butt: b.butt >= 4 ? b.butt : 2,
                genitaliaSize: b.genitaliaSize <= 1 ? 0 : b.genitaliaSize
            };
        }

        this.renderPortraitControls();
    },

    renderPortraitControls() {
        this.renderGenitaliaToggle();
        this.renderAxisTabs();
        this.renderLockedStats();
        this.renderPortraitGrid();
    },

    renderGenitaliaToggle() {
        const gLabels = STAT_LABELS.genitalia;
        this.elements.codexGenitaliaToggle.innerHTML = gLabels.map((label, i) =>
            `<button class="codex-toggle-btn ${i === this.codexPortraitG ? 'active' : ''}" data-g="${i}">${label}</button>`
        ).join('');
    },

    getGenitalSizeLabel() {
        return this.codexPortraitG === 1 ? 'Penis Size' : 'Vagina Size';
    },

    renderAxisTabs() {
        const axes = [
            { key: 'chest', label: 'Chest' },
            { key: 'muscle', label: 'Muscle' },
            { key: 'butt', label: 'Butt' },
            { key: 'genitaliaSize', label: this.getGenitalSizeLabel() },
        ];
        this.elements.codexAxisTabs.innerHTML = axes.map(a =>
            `<button class="codex-toggle-btn ${a.key === this.codexPortraitAxis ? 'active' : ''}" data-axis="${a.key}">${a.label}</button>`
        ).join('');
    },

    getStatRanges() {
        // g1+gs0 = same image as g0, so exclude gs0 when viewing penis
        const gsRange = this.codexPortraitG === 1 ? [2, 3] : [0, 2, 3];
        return {
            chest: [0, 1, 2, 3, 4, 5],
            muscle: [1, 2, 3, 4, 5],
            butt: [2, 4, 5],
            genitaliaSize: gsRange
        };
    },

    renderLockedStats() {
        const STAT_RANGES = this.getStatRanges();
        const STAT_DISPLAY = {
            chest: 'Chest',
            muscle: 'Muscle',
            butt: 'Butt',
            genitaliaSize: this.getGenitalSizeLabel()
        };

        const lockedAxes = ['chest', 'muscle', 'butt', 'genitaliaSize'].filter(a => a !== this.codexPortraitAxis);

        this.elements.codexLockedStats.innerHTML = lockedAxes.map(axis => {
            const range = STAT_RANGES[axis];
            const labels = axis === 'genitaliaSize' ? STAT_LABELS.genitaliaSize : STAT_LABELS[axis];
            const buttons = range.map(val =>
                `<button class="codex-toggle-btn ${this.codexLockedValues[axis] === val ? 'active' : ''}" data-stat="${axis}" data-val="${val}">${labels[val]}</button>`
            ).join('');

            return `<div class="codex-locked-stat-row">
                <span class="codex-locked-stat-label">${STAT_DISPLAY[axis]}:</span>
                <div class="codex-locked-stat-values">${buttons}</div>
            </div>`;
        }).join('');
    },

    renderPortraitGrid() {
        const npcId = this.codexCurrentNpcId;
        if (!npcId) return;

        const STAT_RANGES = this.getStatRanges();

        const g = this.codexPortraitG;
        const axis = this.codexPortraitAxis;
        const range = STAT_RANGES[axis];
        const axisLabels = axis === 'genitaliaSize' ? STAT_LABELS.genitaliaSize : STAT_LABELS[axis];
        const unlocked = (gameState.unlockedPortraits && gameState.unlockedPortraits[npcId]) || [];

        const npc = gameState.npcs[npcId];
        const isMaleBase = npc && npc.body.genitalia === 1 && npc.body.chest < 1;
        const silhouette = isMaleBase
            ? 'images/placeholders/silhouette_male.webp'
            : 'images/placeholders/silhouette_female.webp';

        let html = '';
        for (const val of range) {
            // Build stat combo from locked values + current axis value
            const stats = { ...this.codexLockedValues };
            stats[axis] = val;

            const gs = stats.genitaliaSize;
            const effectiveG = (g === 1 && gs === 0) ? 0 : g;

            // Skip c0 for g1
            if (g === 1 && stats.chest === 0) continue;

            const combo = `g${effectiveG}_gs${gs}_c${stats.chest}_m${stats.muscle}_b${stats.butt}`;
            const isUnlocked = unlocked.includes(combo);
            const imgSrc = isUnlocked
                ? `images/npcs/${npcId}/${combo}.webp`
                : silhouette;

            const progressLabel = axisLabels[val];

            html += `<div class="codex-portrait-thumb ${isUnlocked ? '' : 'locked'}" ${isUnlocked ? `onclick="UI.showImageOverlay('${imgSrc}')"` : ''}>
                <img src="${imgSrc}" alt="${progressLabel}" onerror="this.src='${silhouette}'">
                <div class="thumb-label"><span class="progression-value">${progressLabel}</span></div>
            </div>`;
        }

        if (!html) {
            html = '<div style="color: var(--text-secondary); font-style: italic; grid-column: 1/-1; padding: 20px; text-align: center;">No portraits for this combination.</div>';
        }

        this.elements.codexPortraitGrid.innerHTML = html;
    },

    showSylvieImageGallery() {
        // Reuse the portrait gallery panel but hide stat controls
        const info = document.querySelector('.character-info');
        if (info) {
            for (const child of info.children) {
                if (child.id === 'codex-portrait-gallery') {
                    child.classList.remove('hidden');
                } else {
                    child.classList.add('hidden');
                }
            }
        }

        // Expand modal, hide portrait column
        const modalContent = this.elements.characterModal.querySelector('.modal-content');
        if (modalContent) modalContent.classList.add('codex-gallery-expanded');
        const portraitCol = document.querySelector('.character-portrait');
        if (portraitCol) portraitCol.classList.add('hidden');

        // Hide stat-based controls (genitalia toggle, axis tabs, locked stats)
        this.elements.codexGenitaliaToggle.innerHTML = '';
        this.elements.codexAxisTabs.innerHTML = '';
        this.elements.codexLockedStats.innerHTML = '';

        // Use landscape layout for vignette images
        this.elements.codexPortraitGrid.classList.add('landscape');

        // Build image grid from SYLVIE_VIGNETTES
        const vignettes = typeof SYLVIE_VIGNETTES !== 'undefined' ? SYLVIE_VIGNETTES : [];
        const seenVignettes = gameState.seenSylvieVignettes || [];

        let html = '';
        for (const v of vignettes) {
            const isSeen = seenVignettes.includes(v.id);
            if (isSeen) {
                html += `<div class="codex-portrait-thumb" onclick="UI.showImageOverlay('${v.image}')">
                    <img src="${v.image}" alt="${v.id}" loading="lazy">
                </div>`;
            } else {
                html += `<div class="codex-portrait-thumb locked">
                    <img src="images/placeholders/scene.webp" alt="Not yet seen" loading="lazy">
                </div>`;
            }
        }

        if (!html) {
            html = '<div style="color: var(--text-secondary); font-style: italic; grid-column: 1/-1; padding: 20px; text-align: center;">No town visit images yet.</div>';
        }

        this.elements.codexPortraitGrid.innerHTML = html;
    },

    showCodexSceneGallery() {
        this.codexCurrentView = 'scenes';
        const npcId = this.codexCurrentNpcId;
        if (!npcId) return;

        const info = document.querySelector('.character-info');
        if (info) {
            for (const child of info.children) {
                if (child.id === 'codex-scene-gallery') {
                    child.classList.remove('hidden');
                } else {
                    child.classList.add('hidden');
                }
            }
        }

        const scenes = (typeof GALLERY_SCENES !== 'undefined' && GALLERY_SCENES[npcId]) || [];
        const unlocked = gameState.unlockedScenes || [];

        let html = '';
        if (scenes.length === 0) {
            html = '<div style="color: var(--text-secondary); font-style: italic; padding: 20px; text-align: center;">No gallery scenes for this character.</div>';
        } else {
            for (const scene of scenes) {
                const isSeen = unlocked.includes(scene.id);
                if (isSeen) {
                    html += `<div class="codex-scene-item" onclick="UI.replayScene('${scene.id}')">${scene.title}</div>`;
                } else {
                    html += `<div class="codex-scene-item locked">Not yet seen</div>`;
                }
            }
        }

        this.elements.codexSceneList.innerHTML = html;
    },

    replayScene(sceneId) {
        this.hideCharacterModal();

        // Enter viewer mode: snapshot state so scene can't mutate the game
        SceneManager.viewerMode = true;
        SceneManager._viewerReachable = SceneManager.getReachableScenes(sceneId);
        SceneManager._viewerSnapshot = JSON.stringify(gameState);

        SceneManager.playScene(sceneId);
    },

    showHistoricalNpcImage(npcId, index) {
        const npc = gameState.npcs[npcId];
        if (!npc || !npc.bodyHistory) return;
        const history = npc.bodyHistory;
        if (index < 0 || index >= history.length) return;

        this.codexHistoryIndex = index;
        const snapshot = history[index];
        const body = snapshot.body;

        // Update portrait
        this.elements.codexPortrait.src = getNpcImagePathForBody(npcId, body);
        this.elements.codexPortrait.onerror = () => {
            this.elements.codexPortrait.src = 'images/placeholders/npc.webp';
        };

        // Update stats display with historical body
        const genitaliaLabel = body.genitalia === 0 ? 'Vagina' : 'Penis';
        const sizeLabel = getStatLabel('genitaliaSize', body.genitaliaSize);
        const dayLabel = index === 0 ? 'Original' : `Day ${snapshot.day}`;
        const statsHtml = `
            <div class="codex-stat-item" style="color: var(--accent-primary); font-size: 0.85em; margin-bottom: 4px;">
                <span>${dayLabel}</span>
            </div>
            <div class="codex-stat-item">
                <span class="codex-stat-label">Genitalia:</span>
                <span class="codex-stat-value">${genitaliaLabel} (${sizeLabel})</span>
            </div>
            <div class="codex-stat-item">
                <span class="codex-stat-label">Chest:</span>
                <span class="codex-stat-value">${getStatLabel('chest', body.chest)} [${body.chest}]</span>
            </div>
            <div class="codex-stat-item">
                <span class="codex-stat-label">Muscle:</span>
                <span class="codex-stat-value">${getStatLabel('muscle', body.muscle)} [${body.muscle}]</span>
            </div>
            <div class="codex-stat-item">
                <span class="codex-stat-label">Butt:</span>
                <span class="codex-stat-value">${getStatLabel('butt', body.butt)} [${body.butt}]</span>
            </div>
        `;
        this.elements.codexStats.innerHTML = statsHtml;

        this.updateHistoryNavState(history);
    },

    updateHistoryNavState(history) {
        const idx = this.codexHistoryIndex;
        const total = history.length;
        this.elements.codexHistLabel.textContent = `${idx + 1} / ${total}`;
        this.elements.codexHistFirst.disabled = idx === 0;
        this.elements.codexHistPrev.disabled = idx === 0;
        this.elements.codexHistNext.disabled = idx === total - 1;
        this.elements.codexHistLast.disabled = idx === total - 1;
    },

    // Dev Tools Methods
    devSetAether() {
        if (!gameState) {
            this.showNotification('No active game', 'error');
            return;
        }
        const value = parseInt(this.elements.devAether.value) || 0;
        gameState.player.aether = Math.max(0, Math.min(100, value));
        saveState();
        this.updatePlayerSidebar();
        this.showNotification(`Crystal cube now holds ${gameState.player.aether} Aether`, 'success');
    },

    devSetTrust() {
        if (!gameState) {
            this.showNotification('No active game', 'error');
            return;
        }
        const npcId = this.elements.devTrustNpc.value;
        const value = parseInt(this.elements.devTrustValue.value) || 0;
        if (gameState.npcs[npcId]) {
            gameState.npcs[npcId].trust = Math.max(0, Math.min(100, value));
            saveState();
            this.showNotification(`${getNpcDisplayName(npcId)} trust set to ${value}`, 'success');
        }
    },

    devSetBody() {
        if (!gameState) {
            this.showNotification('No active game', 'error');
            return;
        }
        const stat = this.elements.devBodyStat.value;
        let value = parseInt(this.elements.devBodyValue.value) || 0;

        // Clamp based on stat type
        if (stat === 'genitalia') {
            value = Math.max(0, Math.min(1, value));
        } else if (stat === 'genitaliaSize') {
            value = Math.max(0, Math.min(3, value));
        } else {
            value = Math.max(0, Math.min(5, value));
        }

        gameState.player.body[stat] = value;

        // Apply stat restrictions (cascading effects)
        if (typeof enforceStatRestrictions === 'function') {
            enforceStatRestrictions(gameState.player.body);
        }

        saveState();
        this.updatePlayerSidebar();
        this.updateStatsModal();

        const statLabels = {
            chest: 'Chest',
            muscle: 'Muscle',
            butt: 'Butt',
            genitaliaSize: 'Genital Size',
            genitalia: 'Genitalia'
        };
        this.showNotification(`${statLabels[stat]} set to ${value}`, 'success');
    },

    devSkipTier() {
        if (!gameState) {
            this.showNotification('No active game', 'error');
            return;
        }
        const targetTier = parseFloat(this.elements.devTierTarget.value);
        const pairChoice = this.elements.devTierPair.value;
        const result = debugSkipToTier(targetTier, pairChoice);
        if (result) {
            this.updatePlayerSidebar();
            this.syncDevPanel();
            const completed = result.completedNpcs.map(id => getNpcDisplayName(id)).join(', ');
            const unlocked = result.targetNpcs.map(id => getNpcDisplayName(id)).join(', ');
            this.showNotification(
                `Skipped to Tier ${targetTier}. Completed: ${completed || 'none'}. Now available: ${unlocked || 'none'}`,
                'success'
            );
        }
    },

    // Dev Mode Toggle
    toggleDevMode() {
        const isActive = this.elements.btnDevMode.classList.toggle('active');
        if (isActive) {
            this.elements.devToolsContainer.classList.remove('hidden');
            this.syncDevPanel();
        } else {
            this.elements.devToolsContainer.classList.add('hidden');
        }
        // Store preference
        localStorage.setItem('devMode', isActive ? 'true' : 'false');
    },

    // Initialize dev mode from localStorage
    initMobileMenu() {
        const { mobileMenuBtn, sidebarOverlay, playerSidebar } = this.elements;
        if (!mobileMenuBtn) return;

        const openSidebar = () => {
            playerSidebar.classList.add('open');
            sidebarOverlay.classList.remove('hidden');
        };
        const closeSidebar = () => {
            playerSidebar.classList.remove('open');
            sidebarOverlay.classList.add('hidden');
        };

        mobileMenuBtn.addEventListener('click', openSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);

        // Close sidebar when any sidebar button is clicked
        playerSidebar.querySelectorAll('.sidebar-btn').forEach(btn => {
            btn.addEventListener('click', closeSidebar);
        });
    },

    initDevMode() {
        if (!this.elements.btnDevMode) return;
        const devMode = localStorage.getItem('devMode') === 'true';
        if (devMode) {
            this.elements.btnDevMode.classList.add('active');
            this.elements.devToolsContainer.classList.remove('hidden');
        }
    },

    // Sync dev panel with current game state
    syncDevPanel() {
        if (!gameState) return;
        this.elements.devAether.value = gameState.player.aether || 0;
        const npcId = this.elements.devTrustNpc.value;
        this.elements.devTrustValue.value = gameState.npcs[npcId]?.trust || 0;

        // Sync body stat value
        const stat = this.elements.devBodyStat.value;
        const bodyValue = gameState.player.body[stat];
        this.elements.devBodyValue.value = bodyValue !== undefined ? bodyValue : 0;
    },

    // Scene Jump Modal
    showSceneJumpModal() {
        this.populateSceneJumpList();
        this.elements.sceneJumpModal.classList.remove('hidden');
        this.elements.sceneSearch.focus();
    },

    hideSceneJumpModal() {
        this.elements.sceneJumpModal.classList.add('hidden');
        this.elements.sceneSearch.value = '';
        this.elements.sceneCategoryFilter.value = 'all';
    },

    // Categorize a scene ID
    getSceneCategory(sceneId) {
        if (sceneId.startsWith('workshop_')) return 'workshop';
        if (sceneId.startsWith('location_')) return 'location';
        if (sceneId.startsWith('town_')) return 'town';
        if (sceneId.includes('_sex_') || sceneId.includes('sex_')) return 'sex';
        if (sceneId.includes('_transform') || sceneId.includes('transformation')) return 'transformation';
        // Check for NPC names
        const npcNames = ['mira', 'aldric', 'vessa', 'thornwick', 'fiona', 'barret', 'lenna', 'corwin', 'della', 'holt'];
        for (const npc of npcNames) {
            if (sceneId.includes(npc)) return 'npc';
        }
        return 'other';
    },

    // Get display name for category
    getCategoryDisplayName(category) {
        const names = {
            workshop: 'Workshop',
            location: 'Locations',
            town: 'Town',
            npc: 'NPC Interactions',
            transformation: 'Transformation',
            sex: 'Sex Scenes',
            other: 'Other'
        };
        return names[category] || category;
    },

    // Populate scene jump list
    populateSceneJumpList() {
        if (typeof SCENES === 'undefined') {
            this.elements.sceneJumpList.innerHTML = '<div class="scene-jump-error">SCENES not loaded</div>';
            return;
        }

        const sceneIds = Object.keys(SCENES).sort();
        this.allScenes = sceneIds.map(id => ({
            id,
            scene: SCENES[id],
            category: this.getSceneCategory(id)
        }));

        this.filterSceneJumpList();
    },

    // Filter and render scene list
    filterSceneJumpList() {
        if (!this.allScenes) return;

        const searchTerm = this.elements.sceneSearch.value.toLowerCase();
        const categoryFilter = this.elements.sceneCategoryFilter.value;

        // Filter scenes
        let filtered = this.allScenes.filter(item => {
            // Category filter
            if (categoryFilter !== 'all' && item.category !== categoryFilter) {
                return false;
            }
            // Search filter
            if (searchTerm) {
                const idMatch = item.id.toLowerCase().includes(searchTerm);
                const speakerMatch = item.scene.speaker && item.scene.speaker.toLowerCase().includes(searchTerm);
                const textMatch = item.scene.text && item.scene.text.toLowerCase().includes(searchTerm);
                return idMatch || speakerMatch || textMatch;
            }
            return true;
        });

        // Update count
        this.elements.sceneCount.textContent = `${filtered.length} scene${filtered.length !== 1 ? 's' : ''}`;

        // Group by category
        const grouped = {};
        filtered.forEach(item => {
            if (!grouped[item.category]) {
                grouped[item.category] = [];
            }
            grouped[item.category].push(item);
        });

        // Render
        const categoryOrder = ['workshop', 'location', 'town', 'npc', 'transformation', 'sex', 'other'];
        let html = '';

        categoryOrder.forEach(category => {
            if (grouped[category] && grouped[category].length > 0) {
                html += `<div class="scene-category-group">`;
                html += `<div class="scene-category-label">${this.getCategoryDisplayName(category)} (${grouped[category].length})</div>`;

                grouped[category].forEach(item => {
                    const speaker = item.scene.speaker ? `<span class="scene-item-speaker">${item.scene.speaker}</span>` : '';
                    html += `<div class="scene-item" data-scene-id="${item.id}">`;
                    html += `<span class="scene-item-id">${item.id}</span>`;
                    html += speaker;
                    html += `</div>`;
                });

                html += `</div>`;
            }
        });

        if (filtered.length === 0) {
            html = '<div class="scene-jump-empty">No scenes match your search</div>';
        }

        this.elements.sceneJumpList.innerHTML = html;

        // Bind click events
        this.elements.sceneJumpList.querySelectorAll('.scene-item').forEach(item => {
            item.addEventListener('click', () => {
                const sceneId = item.dataset.sceneId;
                this.jumpToScene(sceneId);
            });
        });
    },

    // Jump to a specific scene
    jumpToScene(sceneId) {
        if (!gameState) {
            this.showNotification('Start a game first', 'error');
            return;
        }

        this.hideSceneJumpModal();

        if (typeof SceneManager !== 'undefined' && SceneManager.playScene) {
            SceneManager.playScene(sceneId);
            this.showNotification(`Jumped to: ${sceneId}`, 'success');
        } else {
            this.showNotification('SceneManager not available', 'error');
        }
    }
};

// Utility functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getLocationName(locationId) {
    const names = {
        workshop: 'Workshop',
        square: 'Town Square',
        tavern: 'Tavern',
        blacksmith: 'Blacksmith',
        herbalist: 'Herbalist',
        bakery: 'Bakery',
        library: 'Library',
        guardpost: 'Guard Post'
    };
    return names[locationId] || locationId;
}
