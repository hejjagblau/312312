// ============================================
// VESSA SCENES
// Extracted from scenes.js for modularity
// ============================================

// ==========================================
// VESSA SCENES
// ==========================================

// Vessa - Herbalist Greeting
SCENES['vessa_greeting'] = {
    id: 'vessa_greeting',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'neutral');

        // Check if already interacted this phase
        if (hasInteractedThisPhase('vessa')) {
            this.text = getAlreadyInteractedMessage('vessa');
            this.actions = [{ label: 'Leave', nextScene: 'location_herbalist' }];
            return;
        }

        // Check if this is the first meeting (introduction)
        const intro = getNpcIntroduction('vessa');
        if (intro) {
            this.text = intro.text;
            this.speaker = intro.speaker;
            markNpcIntroCompleted('vessa');
            updateNpcLastSeenPlayer('vessa');
            this.actions = [
                {
                    label: 'Continue',
                    nextScene: 'location_herbalist',
                    effects: [
                        { type: 'addTrust', npc: 'vessa', amount: 1 },
                        { type: 'recordNpcInteraction', npc: 'vessa' }
                    ]
                }
            ];
            return;
        }

        // Check for genital proposal, goddess reveal, or archetype celebration
        const vessaArchEvent = checkGreetingArchetypeEvent('vessa');
        if (vessaArchEvent && (vessaArchEvent.type === 'proposal' || vessaArchEvent.type === 'goddess_reveal' || vessaArchEvent.type === 'celebration')) {
            SceneManager.playScene(vessaArchEvent.sceneId);
            return;
        }

        const reaction = getNpcReactionToChanges('vessa');
        if (reaction) {
            this.text = `Vessa studies you with those violet eyes. "${reaction}"\n\n"Fascinating. Now then... seeking herbs or knowledge today?"`;
        } else {
            this.text = 'Vessa looks up from her mortar and pestle, violet eyes gleaming. "Ah, the workshop heir. Seeking herbs... or knowledge? I have both."';
        }
        updateNpcLastSeenPlayer('vessa');

        // Build normal actions
        this.actions = [
            { label: 'I need components', nextScene: 'vessa_shop' },
            {
                label: 'Chat',
                nextScene: 'vessa_chat',
                condition: () => !hasInteractedThisPhase('vessa'),
                effects: [{ type: 'recordNpcInteraction', npc: 'vessa' }]
            },
            {
                label: 'Flirt',
                nextScene: 'vessa_flirt_1',
                condition: () => !hasInteractedThisPhase('vessa') && gameState.npcs.vessa.trust >= 8,
                effects: [{ type: 'recordNpcInteraction', npc: 'vessa' }]
            },
            {
                label: 'About body modifications...',
                nextScene: 'vessa_desire_body_reveal',
                condition: () => !hasInteractedThisPhase('vessa') &&
                               gameState.flags.vessa_transformation_1_complete &&
                               gameState.npcs.vessa.trust >= 10 &&
                               !gameState.flags.vessa_desire_body_revealed,
                effects: [{ type: 'recordNpcInteraction', npc: 'vessa' }]
            },
            {
                label: 'Intimate...',
                nextScene: 'vessa_sex_intro',
                condition: () => !hasInteractedThisPhase('vessa') && (gameState.npcs.vessa.trust >= 10 || gameState.npcs.vessa.archetypeIntimateReady),
                effects: [{ type: 'recordNpcInteraction', npc: 'vessa' }, { type: 'setLocation', location: 'workshop' }]
            },
            { label: 'Leave', nextScene: 'location_herbalist' }
        ];
    },
    actions: []
};

// Vessa - Shop
SCENES['vessa_shop'] = {
    id: 'vessa_shop',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"Let me see what I have..." She gestures at the shelves of dried herbs, strange fungi, and bottled essences. "Moonpetal, wyrm\'s tongue, crystallized dewdrops... I have most things a workshop keeper might need."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'neutral');
    },
    actions: [
        { label: 'Buy basic components (10 coin)', nextScene: 'vessa_buy_basic' },
        { label: 'Ask about rare ingredients', nextScene: 'vessa_rare_ingredients' },
        { label: 'Just looking', nextScene: 'vessa_greeting' }
    ]
};

SCENES['vessa_buy_basic'] = {
    id: 'vessa_buy_basic',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: 'Vessa packages several pouches of herbs and a vial of glowing liquid. "Standard fare for your work. Use them wisely - some are harder to restock than others."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'neutral');
        if (gameState.player.coin >= 10) {
            gameState.player.coin -= 10;
            saveState();
            UI.updatePlayerSidebar();
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'vessa_greeting' }
    ]
};

SCENES['vessa_rare_ingredients'] = {
    id: 'vessa_rare_ingredients',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"Rare ingredients? I have a few things not on display." She produces a small locked box. "Moonpetal extract, wyrm\'s blood, crystallized starlight... expensive, but potent. Your uncle was one of my best customers for these."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'knowing');
    },
    actions: [
        {
            label: 'Buy rare components (50 coin)',
            nextScene: 'vessa_buy_rare',
            condition: () => gameState.player.coin >= 50
        },
        { label: 'Too expensive for now', nextScene: 'vessa_greeting' }
    ]
};

SCENES['vessa_buy_rare'] = {
    id: 'vessa_buy_rare',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: 'Vessa carefully wraps several small vials and a pouch of glittering powder. "Handle these with care. The moonpetal in particular can have... unexpected effects if mishandled." Her violet eyes twinkle. "As I can personally attest."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'pleased');
        gameState.player.coin -= 50;
        gameState.flags.has_rare_components = true;
        saveState();
        UI.updatePlayerSidebar();
    },
    actions: [
        { label: 'Continue', nextScene: 'vessa_greeting' }
    ]
};

// Vessa - Chat 1
SCENES['vessa_chat_1'] = {
    id: 'vessa_chat_1',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"Your uncle and I had many... interesting conversations. He understood things most people dismiss as fairy tales." She gestures at her violet eyes. "These aren\'t natural, you know. An accident with moonpetal essence, years ago. Most would call it a curse. I call it a gift."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'knowing');
        gameState.npcs.vessa.trust += 1;
        gameState.flags.knowledge_hint_moonpetal = true;
        saveState();
    },
    actions: [
        { label: 'Can the effect be replicated?', nextScene: 'vessa_chat_1b' },
        { label: 'Does it give you abilities?', nextScene: 'vessa_chat_1c' },
        { label: 'Continue', nextScene: 'location_herbalist' }
    ]
};

SCENES['vessa_chat_1b'] = {
    id: 'vessa_chat_1b',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"Perhaps. Your uncle tried. The results were... unpredictable." She smiles mysteriously. "But that\'s the nature of transformation, isn\'t it? Never quite what you expect."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'intrigued');
    },
    actions: [
        { label: 'Continue', nextScene: 'vessa_greeting' }
    ]
};

SCENES['vessa_chat_1c'] = {
    id: 'vessa_chat_1c',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"In a way. I see better in darkness now. And sometimes... I sense things others don\'t." Her violet eyes seem to glow slightly. "The boundaries between normal and magical are thinner than most realize."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'mysterious');
    },
    actions: [
        { label: 'Continue', nextScene: 'vessa_greeting' }
    ]
};

// Vessa - Chat 2 (Desire - Height)
SCENES['vessa_chat_2'] = {
    id: 'vessa_chat_2',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"I\'ve always been fascinated by perspective. How different the world must look from different heights." She gazes up at her tall shelves. "Sometimes I wonder what it would be like to be smaller. To see the world from a fairy\'s viewpoint."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'thoughtful');
        gameState.npcs.vessa.trust += 1;
        gameState.flags.vessa_desire_height_revealed = true;
        gameState.npcs.vessa.desiresRevealed[0] = true;
        saveState();
    },
    actions: [
        {
            label: 'That could be arranged',
            nextScene: 'vessa_offer_height',
            condition: () => gameState.day >= 3  // After getting familiar with devices
        },
        { label: 'That\'s an unusual wish', nextScene: 'vessa_chat_2b' },
        { label: 'Continue', nextScene: 'location_herbalist' }
    ]
};

SCENES['vessa_chat_2b'] = {
    id: 'vessa_chat_2b',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"Unusual? Perhaps. But normalcy is overrated, don\'t you think?" Her violet eyes sparkle. "The most interesting things happen when we step outside expectations."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'knowing');
        gameState.npcs.vessa.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'vessa_greeting' }
    ]
};

// Vessa - Chat 3
SCENES['vessa_chat_3'] = {
    id: 'vessa_chat_3',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"I grow most of my own ingredients, you know. The garden behind my shop holds things you won\'t find anywhere else in the region." She looks thoughtful. "Your uncle helped me acquire some rare seeds. In exchange for certain... consultations."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'neutral');
        gameState.npcs.vessa.trust += 1;
        saveState();
    },
    actions: [
        { label: 'What kind of consultations?', nextScene: 'vessa_chat_3b' },
        { label: 'Could I see the garden?', nextScene: 'vessa_chat_3c' },
        { label: 'Continue', nextScene: 'location_herbalist' }
    ]
};

SCENES['vessa_chat_3b'] = {
    id: 'vessa_chat_3b',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"He wanted to understand how magical plants affected the body. I was his test subject, in a way." She smiles. "Willingly, of course. We both learned a great deal."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'knowing');
    },
    actions: [
        { label: 'Continue', nextScene: 'vessa_greeting' }
    ]
};

SCENES['vessa_chat_3c'] = {
    id: 'vessa_chat_3c',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"Perhaps someday. When we know each other better." There\'s a hint of promise in her voice. "Some of my plants are... sensitive to new visitors."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'amused');
    },
    actions: [
        { label: 'Continue', nextScene: 'vessa_greeting' }
    ]
};

// Vessa - Flirt scenes
SCENES['vessa_flirt_1'] = {
    id: 'vessa_flirt_1',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '{player}"Those violet eyes of yours are mesmerizing." You step closer.\n\nVessa doesn\'t back away. {vessa}"Flattery through observation. I approve." She tilts her head. {vessa}"Most people find them unsettling. You find them... attractive?"',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'amused');
        gameState.npcs.vessa.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Very much so', nextScene: 'vessa_flirt_1b' },
        { label: 'Continue', nextScene: 'vessa_greeting' }
    ]
};

SCENES['vessa_flirt_1b'] = {
    id: 'vessa_flirt_1b',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: 'For a moment, Vessa\'s mysterious composure cracks, revealing genuine pleasure. "How refreshing. Perhaps we should continue this conversation somewhere more... private. When you\'re ready."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'pleased');
        gameState.npcs.vessa.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'vessa_greeting' }
    ]
};

// Vessa - Offer Height Transformation
SCENES['vessa_offer_height'] = {
    id: 'vessa_offer_height',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: 'Her violet eyes hold yours steadily. "You can adjust height? Interesting." She tilts her head, considering. "I\'ve always been curious about the smaller perspective, seeing the world from below. A different aesthetic entirely." She nods once, decided. "Yes. I think I\'d like to try that."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'curious');
    },
    actions: [
        { label: 'Come to my workshop', nextScene: 'vessa_accept_workshop_invite' },
        { label: 'Are you sure? It\'s a big change.', nextScene: 'vessa_height_confirm' },
        { label: 'Let me prepare first', nextScene: 'location_herbalist' }
    ]
};

SCENES['vessa_height_confirm'] = {
    id: 'vessa_height_confirm',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"The fae folk in old stories always intrigued me. Their perspective on the world must be entirely different." She smiles knowingly. "I\'ve experimented with many things in my travels. Transformation is not new to me. I\'m certain of what I want."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'knowing');
    },
    actions: [
        { label: 'Then come to my workshop', nextScene: 'vessa_accept_workshop_invite' },
        { label: 'Let me think about it', nextScene: 'location_herbalist' }
    ]
};

SCENES['vessa_accept_workshop_invite'] = {
    id: 'vessa_accept_workshop_invite',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"Excellent. I\'ll close up shop and come by this evening." A slight smile crosses her face. "I\'m curious to see what your uncle\'s devices can accomplish."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'pleased');
        gameState.npcs.vessa.trust += 1;
        gameState.flags.vessa_workshop_visit_scheduled = true;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'location_herbalist' }
    ]
};

// Vessa - Workshop scenes
SCENES['vessa_workshop_arrival'] = {
    id: 'vessa_workshop_arrival',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('vessa');
        this.imagePrompt = null;
        gameState.currentLocation = 'workshop';
        saveState();
        UI.updateHeader();
        // Skip intro on repeat visits
        if (gameState.npcs.vessa.firstDesireFulfilledDay !== null) {
            SceneManager.playScene('vessa_transformation_ready');
            return 'redirect';
        }
        this.text = 'Vessa enters the workshop with careful, measured steps, taking in every detail.\n\n{vessa}"So this is where your uncle conducted his research." She runs a finger along a dusty shelf. {vessa}"I can feel the residual energies. This place has witnessed remarkable things."';
    },
    actions: [
        { label: 'Ready to begin?', nextScene: 'vessa_transformation_ready' },
        { label: 'Would you like to look around?', nextScene: 'vessa_workshop_tour' }
    ]
};

SCENES['vessa_workshop_tour'] = {
    id: 'vessa_workshop_tour',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: 'Vessa examines each device with scientific interest. "Remarkable craftsmanship. The way the crystals are aligned... your uncle understood something most artificers don\'t." She turns to you. "You\'ve inherited something special here."',
    onEnter: function() {
        this.image = getNpcImagePath('vessa');
    },
    actions: [
        { label: 'Ready to begin?', nextScene: 'vessa_transformation_ready' },
        { label: 'Another time perhaps', nextScene: 'workshop_main' }
    ]
};

SCENES['vessa_transformation_ready'] = {
    id: 'vessa_transformation_ready',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('vessa');
        gameState.currentTransformationTarget = 'vessa';
        saveState();

        const npc = gameState.npcs.vessa;
        const desire = npc?.currentDesire;
        const label = desire?.label?.toLowerCase() || 'a change';
        const thresholds = getNpcTrustThresholds('vessa');
        const horny = (npc.trust >= thresholds.intimate) || npc.hiddenArchetype === 'goddess';

        if (horny) {
            this.text = `Vessa traces a finger along one of the devices, violet eyes half-lidded.\n\n{vessa}"${label[0].toUpperCase() + label.slice(1)}." A pause. {vessa}"I've been... anticipating this." Her composure is intact, but there's color in her cheeks that wasn't there a moment ago.`;
        } else {
            this.text = `Vessa regards the devices with a connoisseur's appreciation.\n\n{vessa}"${label[0].toUpperCase() + label.slice(1)}. Let's see what your uncle's devices can do."`;
        }
    },
    actions: [
        { label: 'Select a device', nextScene: 'device_selection' },
        { label: 'Changed your mind?', nextScene: 'workshop_main' }
    ]
};

SCENES['vessa_transform_height_moderate'] = {
    id: 'vessa_transform_height_moderate',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: 'The device activates with a soft hum. Vessa shrinks down, her robes pooling slightly around her ankles.\n\nShe looks up at you, now noticeably shorter. {vessa}"Interesting... the world does look different. Though I was hoping for more dramatic results."',
    onEnter: function() {
        gameState.npcs.vessa.body.height = 2; // 3 -> 2
        gameState.npcs.vessa.trust += 1;
        recordNpcBodyChange('vessa');
        saveState();

        this.image = getNpcImagePathSimple('vessa', 'content');
    },
    actions: [
        { label: 'Continue', nextScene: 'vessa_transform_height_moderate_after' }
    ]
};

SCENES['vessa_transform_height_moderate_after'] = {
    id: 'vessa_transform_height_moderate_after',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"This is pleasant, but... could we try again? I want to be truly small. Halfling-sized at least." Her eyes gleam with curiosity. "The scientific method requires pushing boundaries."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'knowing');
    },
    actions: [
        { label: 'Try again (smaller)', nextScene: 'vessa_transform_height_full' },
        { label: 'This is enough for now', nextScene: 'workshop_main' }
    ]
};

SCENES['vessa_transform_height_full'] = {
    id: 'vessa_transform_height_full',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: 'Vessa shrinks dramatically, her robes pooling around her like she\'s drowning in fabric. When it stops, she barely reaches your waist.\n\n{vessa}"Ah." Her voice is higher but still carries the same knowing tone. {vessa}"Now this is the aesthetic I was seeking." She looks around with quiet appreciation. {vessa}"The proportions of the world are entirely different from this vantage. Fascinating."',
    onEnter: function() {
        gameState.npcs.vessa.body.height = 1; // -> 1 (2-4 feet)
        gameState.npcs.vessa.trust += 4;
        gameState.flags.vessa_transformation_1_complete = true;
        recordNpcBodyChange('vessa');
        saveState();

        this.image = getNpcImagePath('vessa');
    },
    actions: [
        { label: 'Continue', nextScene: 'vessa_transform_height_reaction' }
    ]
};

SCENES['vessa_transform_height_reaction'] = {
    id: 'vessa_transform_height_reaction',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: `Vessa spins around, nearly tripping on her oversized clothes that now pool around her diminished frame. She runs her hands down her body, marveling at how compact she's become.

{vessa}"This is precisely the experience I was seeking." She examines her smaller hands, flexes her delicate fingers. {vessa}"Everything feels more... concentrated. The sensations are more vivid at this scale."

She looks up at you - far up now - with genuine warmth. {vessa}"The perspective is... humbling. Everything seems more wondrous from down here."

She takes your hand, and hers feels so small and delicate within your grasp. {vessa}"You tower over me now. It's magnificent." She presses your palm against her cheek, demonstrating how much larger your hand is compared to her face. {vessa}"Like something out of a faerie tale."`,
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'happy');
    },
    actions: [
        { label: 'I\'m glad you\'re happy', nextScene: 'vessa_transform_gratitude' },
        { label: 'Want me to change you back?', nextScene: 'vessa_change_back_offer' }
    ]
};

SCENES['vessa_transform_gratitude'] = {
    id: 'vessa_transform_gratitude',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: `"Happy doesn't cover it. This is research and wish-fulfillment combined." She gathers her voluminous robes around her smaller frame, swimming in fabric.

"I'll need new clothes, of course. But that's a small price for such a gift."

She reaches up - having to stretch now to reach your hand - and pulls you down toward her. Then she rises on her toes and wraps her arms around your neck, her petite body pressing against yours.

"You have my gratitude." Her voice is a whisper near your ear. "And my continued... interest." You feel her smile against your neck before she releases you, her violet eyes sparkling with promise.`,
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'pleased');
        gameState.npcs.vessa.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

SCENES['vessa_change_back_offer'] = {
    id: 'vessa_change_back_offer',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"Change me back?" She laughs, a soft knowing sound. "Absolutely not. This aesthetic suits me perfectly. I intend to explore this perspective for quite some time." She tilts her head with a slight smile. "Though I may need your assistance with high shelves."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'amused');
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// Vessa - Body Transformation (Chest/Butt - unashamed)
SCENES['vessa_desire_body_reveal'] = {
    id: 'vessa_desire_body_reveal',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: 'Vessa approaches you directly. "I have another request. I\'ve always wanted a more... generous figure. Larger chest, fuller hips." She meets your gaze unflinchingly. "Society would say I should be ashamed to ask, but I\'m not. Can you help?"',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'direct');
        gameState.flags.vessa_desire_body_revealed = true;
        gameState.npcs.vessa.desiresRevealed[1] = true;
        gameState.npcs.vessa.desiresRevealed[2] = true;
        saveState();
    },
    actions: [
        { label: 'Of course. No judgment here.', nextScene: 'vessa_transform_body_ready' },
        { label: 'That\'s quite a change. Are you certain?', nextScene: 'vessa_transform_body_confirm' },
        { label: 'Let me think about it', nextScene: 'workshop_main' }
    ]
};

SCENES['vessa_transform_body_confirm'] = {
    id: 'vessa_transform_body_confirm',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: '"Certain? I\'ve been certain for years." She gestures at her slim figure. "This body has served me well, but it\'s never quite felt... complete. I want curves. Real, substantial curves." She smiles. "And you\'re the one person who can give them to me."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'knowing');
    },
    actions: [
        { label: 'Then let\'s begin', nextScene: 'vessa_transform_body_ready' },
        { label: 'Another time', nextScene: 'workshop_main' }
    ]
};

SCENES['vessa_transform_body_ready'] = {
    id: 'vessa_transform_body_ready',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: 'Vessa stands before the device with calm anticipation. "I want to feel the weight of them. The way they move." Her eyes meet yours. "You know which devices I need."',
    onEnter: function() {
        this.image = getNpcImagePath('vessa');
        this.imagePrompt = null;
        // Set up transformation target for device system
        gameState.currentTransformationTarget = 'vessa';
        saveState();
    },
    actions: [
        { label: 'Select a device', nextScene: 'device_selection' },
        { label: 'Another time', nextScene: 'workshop_main' }
    ]
};

SCENES['vessa_transform_body_moderate'] = {
    id: 'vessa_transform_body_moderate',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: 'The transformation completes with noticeable but modest changes.\n\nVessa examines her new curves with scientific detachment. {vessa}"Interesting. An improvement, certainly." She looks at you. {vessa}"But I asked for voluptuous, not merely enhanced. Perhaps we could try again?"',
    onEnter: function() {
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.vessa_transform_body_moderate_done) {
            gameState.npcs.vessa.body.chest = 3;
            gameState.npcs.vessa.body.butt = 3;
            gameState.npcs.vessa.trust += 1;
            gameState.flags.vessa_transform_body_moderate_done = true;
            recordNpcBodyChange('vessa');
            saveState();
        }

        this.image = getNpcImagePathSimple('vessa', 'content');
    },
    actions: [
        { label: 'Try again (larger)', nextScene: 'vessa_transform_body_full' },
        { label: 'This is enough', nextScene: 'workshop_main' }
    ]
};

SCENES['vessa_transform_body_full'] = {
    id: 'vessa_transform_body_full',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: 'The transformation completes, leaving Vessa with dramatically enhanced curves.\n\nShe runs her hands over her new figure with scientific curiosity. {vessa}"Fascinating. The weight distribution is entirely different. I\'ll need to adjust my movement patterns."\n\nShe looks up at you with a warm smile. {vessa}"But more importantly - I feel wonderful. This body suits me. Thank you for understanding."',
    onEnter: function() {
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.vessa_transformation_body_complete) {
            gameState.npcs.vessa.body.chest = 4;
            gameState.npcs.vessa.body.butt = 4;
            gameState.npcs.vessa.trust += 5;
            gameState.flags.vessa_transformation_body_complete = true;
            recordNpcBodyChange('vessa');
            saveState();
        }

        this.image = getNpcImagePath('vessa');
    },
    actions: [
        { label: 'Continue', nextScene: 'vessa_transform_body_aftermath' }
    ]
};

SCENES['vessa_transform_body_aftermath'] = {
    id: 'vessa_transform_body_aftermath',
    image: '',
    imagePrompt: null,
    speaker: 'Vessa',
    text: 'Vessa adjusts her now-tight dress with an amused smile. "My clothes will need adjustment, but that\'s hardly a concern." She stretches experimentally. "The herbalist with the violet eyes and generous curves. I rather like that image."\n\nShe turns to you. "You\'ve given me two gifts now. I won\'t forget that."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('vessa', 'pleased');
        gameState.npcs.vessa.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};


// ============================================
// VESSA SEX SCENES
// ============================================

SCENES['vessa_sex_intro'] = {
    id: 'vessa_sex_intro',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('vessa', 'base');
        markSexUnlocked('vessa');

        // --- Variables ---
        const npcBody = gameState.npcs.vessa.body;
        const playerBody = gameState.player.body;
        const vessaM = npcBody.muscle;
        const vessaC = npcBody.chest;
        const vessaB = npcBody.butt;
        const vessaGS = npcBody.genitaliaSize;
        const vessaHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerM = playerBody.muscle;
        const playerB = playerBody.butt;
        const playerGS = playerBody.genitaliaSize;
        const npcInSkirt = vessaB >= 5 || (!vessaHasVulva && vessaGS >= 3);
        const playerInSkirt = playerB >= 5 || (playerBody.genitalia === 1 && playerGS >= 3);
        const npcChest = getBodyStatDesc('vessa', 'chest');
        const npcButt = getBodyStatDesc('vessa', 'butt');
        const npcGenSize = getBodyStatDesc('vessa', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        // --- Part 1: Vessa's Body ---
        let part1;
        if (vessaM <= 1) {
            if (vessaC <= 1) {
                part1 = `Vessa's dark cloak falls to the floor in a single motion — deliberate, unhurried. She planned this. Beneath it she's lean, pale, angular. No curves to speak of, no softness. Her body is a blade: narrow shoulders, visible collarbones, flat chest with faint muscle definition from years of grinding herbs.\n\nShe stands there without covering herself. No embarrassment — she's been naked in front of people before. Her violet eyes watch you assess her the way she'd watch you assess a specimen. Patient. Knowing.\n\n{vessa}"I've thought about this." Her voice is low, measured. She steps toward you. Her body is familiar to her — every angle, every limitation. She knows what it does and how to use it. She's done this before, in this body, many times. The question isn't whether she's good at this. The question is whether you can surprise her.`;
            } else if (vessaC <= 3) {
                part1 = `Vessa's dark cloak falls to the floor in a single motion. Beneath it she's slight but not flat — her ${npcChest} sit on a narrow frame, pale skin luminous in the workshop light. She doesn't pose. She doesn't need to.\n\n{vessa}"I've thought about this." Her voice is low. She steps toward you, unhurried. Her body moves with the ease of someone who knows it well — every angle of approach, every way to use what she has. She's been here before. Many times. Her hands find the hem of her dress and pull it over her head in one practiced motion.\n\nViolet eyes settle on yours. Calm. Ready. Waiting to see if anything about this will be different from the last time. Or the time before that.`;
            } else {
                part1 = `Vessa's dark cloak falls and her ${npcChest} are immediately apparent on her slight frame — heavy, pale, impossible to overlook on a body this narrow. She doesn't adjust, doesn't cup. She lets them exist.\n\n{vessa}"I've thought about this." She pulls her dress over her head and the motion makes her chest sway. She notices. Goes still for a half-second — eyes half-closing, breath held. Then she exhales and steps toward you.\n\nThat was new. The weight, the movement, the way they shifted. She's filed it away already. Her violet eyes settle on yours and her composure is back — but you saw the moment it cracked.`;
            }
        } else if (vessaM <= 3) {
            part1 = `Vessa's dark cloak falls to the floor. Beneath it, her body has changed from the herbalist you remember — toned arms, definition through her stomach, strength she didn't used to carry. She strips her dress overhead and the motion is smooth, easy. Her ${npcChest} settle as the fabric passes.\n\n{vessa}"I've thought about this." She steps toward you. She moves differently now — there's a sureness in her stance that wasn't there before. She knows she's stronger. She hasn't fully mapped what that means during sex. Her hands flex at her sides, testing.\n\nViolet eyes find yours. Composed. But there's a faint edge of curiosity underneath — she's not sure what this body will do, and that uncertainty is the most interesting thing that's happened to her in years.`;
        } else {
            part1 = `Vessa's dark cloak falls and the body underneath fills the room. Dense muscle under pale skin, shoulders broad, arms thick. The herbalist's frame is gone — this is someone who could pin you to the wall.\n\nShe strips her dress and the motion is powerful, casual, new. Her ${npcChest} sit on a chest wall that could crack stone. She rolls her shoulders, testing the range. Something about the way her muscles shift makes her go still — eyes closing, breath held. Then she opens them.\n\n{vessa}"I've thought about this." Her voice is the same low measured tone it's always been, but her body is making promises her voice hasn't caught up to. She steps toward you and the floor feels it.`;
        }
        // Part 1 butt modifier
        if (vessaB >= 5) {
            part1 += `\n\nHer ass is impossible to ignore — enormous, pale, reshaping every silhouette. She turns and you see the full scale of it. She goes still. Touches her own hip, traces the curve down, the way she'd trace the edge of a leaf she's never catalogued. Then she looks back at you. No comment. But her hand stays.`;
        } else if (vessaB >= 4) {
            part1 += ` Her ${npcButt} fills out her frame in a way that draws the eye — she shifts her weight and watches you notice.`;
        }

        // --- Part 2: Getting Close (power dynamics) ---
        let part2;
        const bothPetite = playerM <= 1 && vessaM <= 1;
        if (playerM >= 5 && vessaM <= 1) {
            part2 = `You pull her against you and she lets it happen — deliberately. She wants to know what this feels like: being overpowered. Your arms close around her slight frame and she presses into the contact, violet eyes open, paying attention.\n\n{vessa}"Show me." Two words. Not surrender — curiosity. She wants you to do something to her she can't do to herself. Her pale hands flatten against your chest, feeling the muscle underneath, cataloguing. She positions herself to receive whatever you give.`;
        } else if (playerM >= 5 && vessaM >= 2) {
            part2 = `You pull her close and she meets you with strength of her own — but she yields anyway. Not because she has to. Because she wants to see what happens when she lets someone stronger take the lead. Her hands test your arms, your shoulders, mapping the difference.\n\n{vessa}"Show me." She says it the way she'd say it about a rare herb. Full attention. She positions herself against you and waits — not passive, attentive. Collecting the experience.`;
        } else if (playerM <= 1 && vessaM <= 1) {
            if (playerC >= 4 && playerB >= 4) {
                part2 = `She draws you close and her hands find the contrast immediately — your slight frame, then the swell of your chest, then the curve of your ass. She goes still. Her hands move between them, tracing the shape of each. Not grabbing — studying.\n\n{vessa}"Extraordinary." Quiet. Almost to herself. Her fingers trace the line where your narrow waist becomes the swell of your hip. She's fascinated by the geometry. Her violet eyes have gone dark and focused in a way that has nothing to do with analysis.`;
            } else if (playerC >= 4) {
                part2 = `She draws you close and her hands find your chest — both hands, unhurried, tracing the shape. On your slight frame they're prominent, and she takes her time with them. Goes still when she cups the weight. Her violet eyes half-close.\n\nShe comes back to them. Thumb circling, pressing her face between them, breathing in. Not rushed. Savoring something she wants to understand.`;
            } else if (playerB >= 4) {
                part2 = `She draws you close and her hands slide down your back to your ass. She cups, tests the weight, traces the curve on your narrow frame. Goes still for a moment — that half-second pause she makes when something registers.\n\nHer hands stay there. She pulls you against her, using your hips as an anchor. The gesture is possessive in a way Vessa rarely is.`;
            } else {
                part2 = `She draws you close and you fold together — two slight bodies, all angles and warmth. Her hands trace your spine, your ribs, the sharp line of your hip. She maps you with herbalist's fingers, precise and thorough.\n\n{vessa}"Like this." She angles herself against you — sternum to sternum, skin to skin, nothing between. She knows this body. She's done this before. Her hands find every pressure point without searching.`;
            }
        } else if (playerM <= 1 && vessaM >= 4) {
            part2 = `She pulls you against her and you vanish into the density of her body. Her arms close around you — thick, certain — and she repositions you with one arm while her mouth stays on your neck. She wanted you there. Now you're there.\n\nIt's not domineering. It's efficient. She wanted a different angle, so she moved you. Her violet eyes are already focused on the next thing.`;
        } else if (playerM <= 1 && vessaM >= 2) {
            part2 = `She pulls you close and wraps around you — her body is warmer now, denser, and your slight frame settles against it like a key in a lock. She holds you with easy strength, positions you where she wants you without asking.\n\n{vessa}"Here." She adjusts your hips with practiced hands. Not a suggestion. A placement. She's already moving to the next step.`;
        } else if (vessaM >= 5 && playerM >= 5) {
            part2 = `She pulls you close and you don't move. She pulls harder. You still don't move. She looks up at you and for the first time in the scene she grins — not her usual knowing half-smile but genuine delight.\n\nShe tries to flip you. Can't. Tries again. Neither of you budges. It becomes a contest — wrestling that slides toward something else, bodies pressing and straining, and she's laughing, actually laughing, because this has never happened to her before.`;
        } else {
            part2 = `She draws you close with unhurried hands. No rush. She settles against you, angles herself, finds the position she wants. Her hands move with practiced certainty — she's mapped bodies before and she knows where everything goes.\n\nViolet eyes find yours. Calm, steady, measuring. Her hands stop roaming and settle with intent.`;
        }
        // Part 2 modifiers
        if (playerC >= 4 && !bothPetite) {
            part2 += ` Her hands find your chest and she goes quiet — the same stillness she shows when her own body surprises her. She traces the shape, tests the weight, presses her face between them. Not rushed. Savoring. She comes back to them even when focused elsewhere.`;
        }
        if (playerB >= 4 && !bothPetite) {
            part2 += ` Her hands slide to your ass and she kneads, pulls, presses herself against the curve. Her arm reaches around from behind, hand sliding between your legs — and she uses that grip to pull herself harder against you. The stimulation is a byproduct of Vessa getting what she wants.`;
        }
        if (npcInSkirt && vessaHasVulva) {
            part2 += ` Her dress is dark with wetness between her thighs. She doesn't acknowledge it. Her body's been ahead of her mind the entire time.`;
        }
        if (vessaM >= 5 && !(vessaM >= 5 && playerM >= 5)) {
            part2 += ` Her arms close around you and the strength is casual, incidental — she's not demonstrating it. She just moved you two inches to the left because she wanted you there.`;
        }
        if (vessaC >= 5) {
            part2 += ` Her massive chest presses between you, pinning you under the weight. She grinds into the pressure and her eyes half-close — stillness beat. Then she pushes harder.`;
        }

        // --- Part 3: Oral Phase ---
        let part3;
        if (vessaHasVulva && vessaGS >= 3) {
            // Changed body — re-learning
            part3 = `She drops to her knees. This part she knows — her mouth, her hands, the mechanics of giving pleasure. She's good at this.\n\nBut her body is different now and the position changes everything. Her swollen pussy throbs between her thighs, demanding attention she hasn't given it. She starts working you with her mouth — skilled, precise — and then her hand drifts between her own legs. She touches herself and her rhythm falters.\n\nShe pauses. Eyes closed. The sensation from below is interfering with the technique above. She adjusts, tries again, and her hips buck into her own hand. {vessa}"That's..." She doesn't finish. She's re-learning her own body while trying to use it on you. The dual input is overwhelming her composure.`;
        } else if (!vessaHasVulva && vessaGS >= 2) {
            // Has cock — unfamiliar territory
            part3 = `She drops to her knees. She knows oral — she's skilled, practiced, confident. But her body is different now and everything about the position has changed. Her cock hangs between her thighs, stiffening, sending feedback she's never had in this posture.\n\nShe starts working you with her mouth — and her cock throbs and she pauses. Goes still. Eyes closed. Something about kneeling with a cock between her legs while her mouth is on you is hitting different than she expected.\n\nShe resumes. Slower. Adjusting to the dual input. Her free hand drifts to her own shaft, wraps around it, and her rhythm on you changes — less precise, more urgent. She's chasing two sensations at once and neither is what she planned.`;
        } else {
            // Baseline — confident, precise
            part3 = `She drops to her knees with fluid grace. This she knows. Her mouth finds you with practiced precision — no fumbling, no warm-up. She's done this many times, in this body, and her technique is flawless.\n\nHer hands work in concert with her mouth, finding pressure points, angles, rhythms that build with terrifying efficiency. She watches your face the entire time — violet eyes steady, reading your reactions, adjusting in real time.\n\nShe's good. She knows she's good. And she's waiting — patiently, skillfully — for anything about this to surprise her.`;
        }

        const opening = part1 + '\n\n' + part2 + '\n\n' + part3;

        // --- Genital Branches ---

        // === PV: player penis + Vessa vulva ===
        let pvText;
        if (playerM >= 5 && vessaM <= 1) {
            pvText = `You lift her onto the workbench — she weighs nothing, her slight body settling in your hands. She wraps her legs around you, violet eyes open, watching. You push your ${playerGenSize} cock into her pussy and she takes you with a controlled exhale.\n\nThen something registers she didn't calculate for. Her eyes widen fractionally. She goes still — motion stops, breath held. The sensation of being filled in a body being held by someone this strong. It's new.\n\nShe presses into it. {vessa}"Again." Not a request. She wants more of whatever that was. You thrust and she braces against your arms, letting your strength drive the pace while she focuses entirely on what she's feeling.`;
        } else if (vessaM >= 4 && playerM <= 1) {
            pvText = `She lifts you onto the workbench with one arm — repositioning, not showing off. She straddles you, takes your ${playerGenSize} cock in her pale fingers, and sinks down onto it with her own weight.\n\nHer hips roll. Controlled, deliberate, taking what she wants at the depth she wants. She braces over you with thick arms and her violet eyes are focused — not on you. On the sensation. She's cataloguing. Adjusting the angle. Finding what works.\n\nShe finds it. Goes still — eyes closing, breath held. Then she rolls her hips again, harder, chasing it.`;
        } else if (vessaM >= 5 && playerM >= 5) {
            pvText = `Neither of you yields. She pushes you toward the workbench; you hold your ground. You pull her closer; she doesn't budge. The contest becomes the foreplay — hands gripping, bodies straining — until she reaches between you, takes your ${playerGenSize} cock, and guides it into her pussy while you're both still locked in it.\n\nThe penetration breaks the stalemate. She gasps — the first sound she's made. You thrust and she braces against you, matching your force, neither giving ground. It's a contest she's never had. Her grin hasn't faded.`;
        } else {
            pvText = `She guides you down onto the workbench cushions and straddles you with fluid grace. She takes your ${playerGenSize} cock, positions it at her pussy, and sinks down with a controlled exhale. Every motion choreographed.\n\nThen the sensation registers. Her rhythm stutters — just once. She adjusts, finds the angle, resumes. Her hips roll with practiced precision, her hands braced on your chest. She's done this before.\n\nBut her eyes are slightly wider than usual. And her breath is slightly faster. Something about this is landing differently.`;
        }
        // PV stat modifiers
        if (vessaC >= 5 && !(playerM >= 5 && vessaM <= 1)) {
            pvText += `\n\nHer massive chest sways with every roll of her hips — heavy, shifting, new. She leans forward and her breasts engulf you, pinning you under the weight. She grinds into the pressure and her eyes close. Stillness beat — longer than the others. She does it again. Harder.`;
        } else if (vessaC >= 4) {
            pvText += `\n\nHer ${npcChest} sway with the motion, and she presses them against you — using the weight as leverage, adjusting her angle through the contact.`;
        }
        if (vessaB >= 5) {
            pvText += `\n\nHer enormous ass drives every thrust — she sits deeper, pushes harder, uses the sheer mass behind her to control the rhythm. She rolls her hips and the weight is devastating, pinning you under her while she takes exactly what she wants.`;
        }
        if (vessaM >= 5 && !(vessaM >= 4 && playerM <= 1) && !(vessaM >= 5 && playerM >= 5)) {
            pvText += ` She braces with one arm and the workbench groans. She doesn't notice.`;
        }
        // PV player standout modifiers
        if (playerC >= 4) {
            pvText += `\n\nHer hands find your chest mid-stroke — she traces the shape, cups, tests the weight while her hips keep moving. Her attention splits between the sensation below and the shape in her hands. She keeps coming back to them.`;
        }
        if (playerB >= 4) {
            pvText += `\n\nHer hands slide under your ass, cupping, pulling you deeper into her with each thrust. She uses your body's weight against you — angling, adjusting. Finding the perfect depth and holding you there.`;
        }
        // PV size overlay
        if (playerGS >= 2 && vessaGS === 0) {
            pvText += `\n\nHer tight pussy grips your thick cock — she clenches with intent, controlling every inch. She angles deliberately, maximizing the friction. Goes still when you push deep — the fullness hitting somewhere she didn't expect. She presses into it.`;
        } else if (playerGS === 0 && vessaGS >= 2) {
            pvText += `\n\nShe's swollen and slick around you — thick folds engulfing your modest cock in plush, gripping heat. She clenches and the sensation is overwhelming for both of you. She rolls her hips, using the extra sensitivity, chasing every ripple.`;
        } else if (playerGS >= 2 && vessaGS >= 2) {
            pvText += `\n\nShe's swollen and dripping and your thick cock fills her completely — the combination is staggering. Every thrust lands hard, every inch registers. Her composure fractures. She grips your arms and her hips stutter, chasing sensation she can't control.`;
        } else if (playerGS === 0 && vessaGS === 0) {
            pvText += `\n\nBoth tight, both precise — she clenches around your modest cock with deliberate control, every movement vivid and exact. She angles for maximum effect, watching your face to calibrate. Technique over force. She gets results — she always does.`;
        }

        // === VV: both vulva ===
        let vvText;
        if (playerM >= 5 && vessaM <= 1) {
            vvText = `You push her down onto the workbench — one hand on her chest, the other sliding between her pale thighs. She opens for you, violet eyes locked on yours. She wants to feel what it's like to be handled.\n\nYour fingers find her pussy soaking and you push inside. She goes still — eyes closing, breath held — then her hips press into your hand. She reaches between your legs from below, fingers finding you with practiced precision even while pinned.`;
        } else if (vessaM >= 4 && playerM <= 1) {
            vvText = `She pushes you down and drops between your legs. Her strong hands spread your thighs and hold them there — her grip is casual, immovable. Her mouth finds your pussy with focused precision.\n\nShe works you with tongue and fingers, adjusting based on every sound you make. Her free hand guides yours between her legs. She's dripping. {vessa}"Your turn." Not a request. She's already refocused on you.`;
        } else if (vessaM >= 5 && playerM >= 5) {
            vvText = `Neither yields. The contest continues — hands gripping, bodies pressing — until she slides her fingers between your legs and you slide yours between hers at the same moment. Both of you freeze. Then both press deeper.\n\nIt becomes a different kind of contest. She matches your rhythm exactly, refuses to break first. Fingers curling, hips pressing, eyes locked. She's never had an equal. She grins.`;
        } else {
            vvText = `She settles between your thighs with practiced ease. Her fingers trace your pussy with herbalist's precision — finding every fold, every response, mapping you with terrifying accuracy. She watches your face the way she'd watch a reaction in her workshop. Adjusting. Calibrating.\n\nHer mouth joins her hands and the technique is flawless — tongue and fingers in concert, building with efficiency that says she's done this before. She guides your hand between her legs without breaking rhythm. She's soaking, body ahead of her mind.`;
        }
        // VV gs-awareness
        if (playerGS >= 2 && vessaGS >= 2) {
            vvText += `\n\nBoth swollen — thick folds meeting thick folds, everything slick and puffy and amplified. She goes still when the sensation hits — eyes closed, breath shaking. Then she presses harder, chasing it. Her composure is cracking in real time.`;
        } else if (playerGS === 0 && vessaGS === 0) {
            vvText += `\n\nBoth tight, both precise. Her fingers work you with controlled pressure, finding the exact spot and staying there. She clenches around your fingers in return. Technique against technique. She watches your face, adjusting micro-movements. This she's done before. This she's good at.`;
        } else if (playerGS >= 2 && vessaGS === 0) {
            vvText += `\n\nYour swollen folds are thick under her fingers — she traces every ridge, every crease, exploring the extra sensitivity. She knows where to press on a swollen pussy. Her own tight entrance clenches around your fingers with controlled precision. She's precise where you're plush.`;
        } else if (playerGS === 0 && vessaGS >= 2) {
            vvText += `\n\nShe's swollen and dripping — thick lips parting easily, her pussy engulfing your fingers in slick heat. She grinds against your hand. Goes still when you find the right spot — longer than usual. Her breath shakes when it resumes. Your own tight entrance responds to her practiced fingers.`;
        }
        // VV stat modifiers
        if (vessaC >= 4) {
            vvText += `\n\nHer ${npcChest} press between your bodies as she grinds closer — warm, heavy. She uses the weight, pins you under them, grinds into the pressure.`;
        }
        if (vessaM >= 5 && !(vessaM >= 4 && playerM <= 1) && !(vessaM >= 5 && playerM >= 5)) {
            vvText += ` Her fingers inside you are strong — too strong for a moment. She adjusts instantly. Not because she's worried. Because she's precise.`;
        }
        if (playerC >= 4) {
            vvText += `\n\nHer mouth moves to your chest while her fingers keep working — tracing, tasting, pressing her face between them. She keeps coming back. The dual sensation — her mouth above, her fingers below — is deliberate. She's building you toward something.`;
        }
        if (playerB >= 4) {
            vvText += `\n\nShe slides behind you, hand reaching around to your pussy while she presses herself against the curve of your ass. She uses the grip as leverage — pulling herself harder against you, grinding into the pressure while her fingers work. Layered. She's stimulating you to get better access to what she wants.`;
        }

        // === VP: Vessa penis + player vulva ===
        let vpText;
        if (vessaGS >= 2) {
            if (playerM >= 5 && vessaM <= 1) {
                vpText = `She lets you arrange her — position her cock, guide her into you, control the depth. She watches the whole time. Violet eyes fixed on where her ${npcGenSize} cock disappears into your pussy. The visual hits as hard as the sensation and her rhythm stutters.\n\nShe pushes deeper because you let her, your strong body absorbing everything she gives. She goes still — watching herself inside you, feeling everything at once. {vessa}"Again." Her voice is rough.`;
            } else if (vessaM >= 4 && playerM <= 1) {
                vpText = `She lifts you, positions you, and pushes her ${npcGenSize} cock into your pussy with casual strength. One motion. She's already adjusted the angle before you've processed the change in position.\n\nShe thrusts — slow, deep, deliberate. Her violet eyes are fixed on where her cock enters you. She watches herself push in and her rhythm stutters. The visual and the sensation together are too much. She grips harder, moves faster. Goes still for a half-second. Then faster still.`;
            } else {
                vpText = `She positions her ${npcGenSize} cock at your pussy, violet eyes watching your face with focused intensity. She presses inside — slow, measured, feeling every inch. Her jaw tightens. This is different from anything she's done before.\n\nShe watches herself push in — can't look away. The visual and the sensation hit together and her rhythm stutters. She grips your hips, adjusts the angle, and thrusts again. Slower. Chasing the feeling she just had. She finds it and her eyes close. Stillness beat. Then she moves with more purpose.`;
            }
        } else {
            // Small cock — precision
            vpText = `She positions her ${npcGenSize} cock at your pussy, violet eyes watching with focused intensity. She pushes in — precise, deliberate, angling for maximum effect.\n\nSmall, and she treats it the same way she treats everything: technique over force. She watches your face, calibrating. Adjusts the angle by a fraction and finds the spot that makes your breath catch. She does it again. Deliberately. {vessa}"There." Quiet. She keeps hitting it.`;
        }
        // VP stat modifiers
        if (vessaC >= 5) {
            vpText += `\n\nHer massive chest sways with every thrust — the motion is new and she notices every time. She leans forward, lets them press against you, and grinds into the contact. Goes still for a beat. Then pushes harder.`;
        }
        if (vessaB >= 5) {
            vpText += `\n\nHer enormous ass provides momentum behind every thrust — she pushes deeper, hits harder, uses the mass to drive the rhythm. She reaches back, touches her own ass mid-thrust, and the dual sensation makes her rhythm stutter.`;
        }
        if (playerC >= 4) {
            vpText += `\n\nHer hands find your chest between thrusts — cupping, tracing, pressing her face between them while her hips keep moving. She keeps returning. The shape of your breasts is something she wants to understand through touch.`;
        }
        if (playerB >= 4) {
            vpText += `\n\nShe grabs your ass with both hands and uses the grip to pull you onto her cock with each thrust — she controls the depth through your hips. Angling, adjusting. Finding the depth that makes you gasp and hitting it again.`;
        }
        // VP size overlay
        if (vessaGS >= 2 && playerGS === 0) {
            vpText += `\n\nYour tight pussy grips her thick cock — she feels every inch and her composure fractures. She watches herself disappear inside you with fixated attention, rhythm stuttering whenever the tightness grips her. Goes still. Pushes deeper.`;
        } else if (vessaGS === 0 && playerGS >= 2) {
            vpText += `\n\nHer modest cock slides into your swollen, slick pussy — engulfed in plush, gripping heat. She angles for maximum effect, finding pressure points with precision. The tightness of the fit makes up for the size. She watches your face and adjusts until she finds what works.`;
        } else if (vessaGS >= 2 && playerGS >= 2) {
            vpText += `\n\nHer thick cock fills your swollen pussy completely — both oversized, both oversensitive. Every thrust lands devastatingly. She grips harder, eyes closing, composure gone. The dual intensity is more than she calculated for.`;
        }

        // === PP: both penis ===
        let ppText;
        if (vessaM >= 4 && playerM <= 1) {
            ppText = `She wraps her hand around both shafts — her ${npcGenSize} cock and your ${playerGenSize} length pressed together in her strong grip. She strokes with focused attention, watching both heads slide together, slick with pre-cum.\n\nHer free hand holds you in place — casual, immovable. She controls the pace, the pressure, the angle. She watches the sensation happen with the same focused composure she brings to everything — until both shafts pulse in her grip and her breath catches. Goes still. Resumes stroking. Faster.`;
        } else if (playerM >= 5 && vessaM <= 1) {
            ppText = `You take both cocks in hand — her ${npcGenSize} shaft and your ${playerGenSize} length — and she lets you. She leans back, lets you set the pace, violet eyes fixed on where the two shafts press together. Her slight body is entirely at your mercy.\n\nYou stroke and she watches the motion, fascinated. Both cocks throb together and she makes a small sound — just a breath. Her hips push into your grip without her permission. She goes still. Lets it happen again.`;
        } else {
            ppText = `Her hand wraps around both shafts — her ${npcGenSize} cock and your ${playerGenSize} length pressed together. She strokes with practiced confidence, watching both heads slide against each other with focused attention.\n\nThe sensation is different from anything she expected. Both cocks pulsing together, the feedback loop of her hand on your shaft translating into pressure on hers. Her rhythm accelerates without her deciding to. Her free hand rises to her own ${npcChest} and she touches herself without seeming to notice.\n\nHer composure is thinning. She goes still — eyes closing — then resumes. Urgent now. Chasing it.`;
        }
        // PP stat modifiers
        if (vessaC >= 5) {
            ppText += `\n\nHer massive chest presses between them as she leans into the grip — she grinds both shafts between her breasts and her hand simultaneously. The dual pressure makes her eyes close.`;
        }
        if (playerC >= 4) {
            ppText += `\n\nHer free hand finds your chest — cupping, tracing, pressing into the softness while both cocks throb in her other hand. She's splitting her attention between two sensations and losing the thread of both.`;
        }
        // PP size overlay
        if (playerGS >= 2 && vessaGS >= 2) {
            ppText += `\n\nBoth thick, both throbbing — her hand barely wraps around both shafts. She strokes and the pressure is staggering, every ridge and vein amplified. Her composure is gone. She grips harder, stroking faster, eyes fixed on the sight.`;
        } else if (playerGS === 0 && vessaGS === 0) {
            ppText += `\n\nBoth modest — her hand wraps easily around both, fingers interlacing, precise. She strokes with controlled rhythm, every micro-adjustment deliberate. Technique. She watches the sensation build with analytical attention. Until it builds past her ability to analyze.`;
        }

        const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };

        this.text = opening + '\n\n' + getSexSceneText('vessa', branches);

        gameState.npcs.vessa.trust += 1;
        saveState();
    },
    actions: [
        {
            label: 'Something activates...',
            nextScene: 'vessa_sex_transform',
        },
        {
            label: 'Continue...',
            nextScene: 'vessa_sex_closing'
        }
    ]
};

SCENES['vessa_sex_transform'] = {
    id: 'vessa_sex_transform',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('vessa', 'transform');
        markTransformationSeen('vessa');

        const npcBody = gameState.npcs.vessa.body;
        const vessaM = npcBody.muscle;
        const vessaC = npcBody.chest;
        const npcChest = getBodyStatDesc('vessa', 'chest');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');
        const npcGenSize = getBodyStatDesc('vessa', 'genitaliaSize');

        // === Tease: deliberate trigger ===
        const tease = `The orgasm is building and Vessa knows exactly what it will feel like. She's been here before. Many times, in many configurations. Her body is close — rhythm urgent, breath fast — but her violet eyes are open. Scanning.\n\nThey land on something. A small polished device on the workbench beside the bed, half-buried under a discarded cloak. Labeled 'Inner Beauty — Prototype.'\n\nVessa pauses mid-stroke. Right at the edge. She looks at the device. Looks at you. Reaches over and smacks it with the heel of her hand.\n\n{vessa}"Let's find out."`;

        // === Transform: lamia ===
        let transform = `The shimmer hits her legs first. Her thighs press together — not by choice — and fuse. Scales bloom across her skin, spreading downward in a wave, swallowing her calves, her ankles, her feet. Where they meet her pale belly the color blends seamlessly — lighter underneath, darkening along the sides. Her legs elongate, thicken, merge into a single massive tail that uncoils across the bed, spills over the edge, and keeps going — coil after heavy coil filling the workshop floor.\n\nVessa watches the entire thing happen. She doesn't flinch. She props herself up on one elbow and observes her own legs disappearing with the same focused attention she'd give a rare herb unfurling.`;

        if (vessaM >= 4) {
            transform += `\n\nAbove the scales her torso is unchanged — abs carved, arms dense with muscle, her ${npcChest} sitting on a chest wall built for force. Below, the tail is thicker than her legs ever were, coiled with serpentine muscle that dwarfs even her upper body. She flexes the tail experimentally and the coils tighten with crushing strength. Her eyes light up.`;
        } else if (vessaC >= 4) {
            transform += `\n\nAbove the scales her torso is unchanged — her ${npcChest} heavy on a slight frame, pale skin blending smoothly into the tail below. The tail fills the room — massive coils arranged in wide loops across the stone floor. She shifts her weight and the tail responds like a limb she's always had. Her chest sways with the motion and she steadies it with one hand, the other tracing the seam where skin becomes scale.`;
        } else {
            transform += `\n\nAbove the scales her torso is unchanged — pale, angular, familiar. Below, the tail fills the room. Scales darkening along the back, pale beneath, massive coils arranged across the stone floor like something that belongs in this workshop. She runs her hand along the scales where her thigh used to be and her breath catches. Not alarm. Texture. Every scale is a landscape under her fingertips.`;
        }

        transform += `\n\nShe slides off the bed. The tail finds the floor and she rises up — taller than before, supported by coils that arrange themselves beneath her without conscious thought. She looks down at you from this new height. Inner beauty, the label said. Hers is a serpent.\n\n{vessa}"Remarkable." She runs both hands down the transition where pale skin meets scales at her hips. {vessa}"The proprioceptive integration is immediate. I can feel the tail as if I've always had it." She coils the tip around a workbench leg and squeezes. The wood creaks. Her smile sharpens — not her usual knowing half-smile. Something hungrier.\n\n{vessa}"Come here."`;

        // === Genital branches ===
        const branches = {
            'pv': `She coils around you before you've finished standing — scales wrapping your legs, your waist, the pale inner scales smooth and warm against your skin. She positions herself with a flex of muscle that runs her full length, tilting her hips to guide your ${playerGenSize} cock into her pussy.\n\nShe sinks onto you and the coils tighten. Not painfully — precisely. She controls the depth with her entire body, every thrust driven by eight feet of serpentine muscle instead of two legs. She rolls her hips and the coils pulse around you in rhythm, squeezing, releasing, squeezing.\n\nThe orgasm hits her through every coil. Her tail constricts, her back arches, and a sound tears out of her that has nothing analytical in it. The contractions ripple the full length of her body — her pussy clenching, her tail crushing tight, her hands grabbing whatever they find. You follow seconds later, buried deep, her coils locked around you.`,
            'vv': `She draws you against her with the tail — wrapping your waist, pulling you flush against the warm pale scales of her lower body. Her fingers slide between your legs with practiced precision while her tail undulates against your back, your thighs, everywhere at once.\n\nYour hand reaches where pale skin meets scale and finds her pussy — slick, hot, framed by smooth scales instead of skin. She goes still when you touch her there. The sensitivity at the boundary is different — amplified. She presses into your hand and her tail tightens around you, involuntary, a full-body response she wasn't expecting.\n\n{vessa}"The sensitivity at the transition is—" She stops. Your fingers found the spot. Her coils squeeze and her mouth opens but nothing comes out. The orgasm rolls through her in waves that translate down the full length of her tail — eight feet of muscle clenching, releasing, clenching. She holds you through it, coiled tight, shaking, every contraction pressing your hand harder against her.`,
            'vp': `She coils around you and lifts — effortlessly, tail wrapping your legs, suspending you at the height she wants. Her ${npcGenSize} cock presses against you, hard, the base framed by smooth scales. She pushes into your pussy with a flex of her entire lower body.\n\nThe thrust comes from everywhere. Not hips — the tail. Eight feet of muscle behind every stroke, controlled, devastating. She watches your face with focused intensity while her coils adjust, tighten, find the angle that makes you gasp. She hits it again. Deliberately.\n\nThe feedback undoes her. Every coil around you translates into sensation along her entire length and the loop builds faster than she can track. She thrusts harder, coils tightening, and the orgasm breaks her rhythm apart — her tail constricting, her ${npcGenSize} cock pulsing inside you, a raw sound tearing from her throat while her whole body locks around yours.`,
            'pp': `She coils her tail around your legs and draws you close. Her ${npcGenSize} cock presses against your ${playerGenSize} shaft — both hard, both slick. She takes both in one hand and her tail wraps your waist, warm scales sliding smooth against bare skin.\n\nShe strokes and the tail tightens in rhythm — squeezing your body with every pump of her hand. The feedback loop runs from her grip through both shafts and translates into contractions along her entire tail, each squeeze driving the next stroke.\n\n{vessa}"That's—" She doesn't finish. Her hand moves faster. The tail constricts. She presses her forehead against your chest and both of you come at the same time — her coils crushing tight, both cocks pulsing in her grip, her whole body shuddering in a single sustained contraction that neither of you can stop.`
        };

        // === Revert ===
        const revert = `\n\nThe effect fades gradually. The tail splits, shortens, scales receding like frost under sun. Vessa's legs re-emerge — pale, familiar, unsteady. She sits on the workshop floor, breathing slowly, flexing her restored toes with the careful attention of someone re-learning a limb.\n\nShe runs her hand down her bare thigh where scales were moments ago. Smooth skin. She touches it again, comparing the memory.\n\n{vessa}"The muscle integration was flawless. I could feel every coil." She looks up at you from the floor. Flushed. Satisfied. Still thinking, but the thoughts are warm. {vessa}"I want to do that again."`;

        this.text = tease + '\n\n' + transform + '\n\n' + getSexSceneText('vessa', branches) + revert;
    },
    actions: [
        { label: 'Continue...', nextScene: 'vessa_sex_closing' }
    ]
};

SCENES['vessa_sex_closing'] = {
    id: 'vessa_sex_closing',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('vessa', 'base');

        const npcBody = gameState.npcs.vessa.body;
        const playerBody = gameState.player.body;
        const vessaM = npcBody.muscle;
        const vessaC = npcBody.chest;
        const vessaB = npcBody.butt;
        const vessaGS = npcBody.genitaliaSize;
        const vessaHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerB = playerBody.butt;
        const sawTransform = hasSeenTransformation('vessa');
        const isGoddess = vessaC >= 5 && vessaB >= 5 && vessaM >= 4;
        const npcGenSize = getBodyStatDesc('vessa', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        let text = '';

        // === CLIMAX (skip if transform path already delivered it) ===
        if (!sawTransform) {
            let climaxText = `The climax takes Vessa by surprise. That, more than anything, is the revelation.\n\nHer violet eyes go wide. Her body moves without her permission — arching, grabbing, wrapping. She makes a sound that isn't a word, isn't an analysis. Raw. It tears from her throat and she can't take it back.\n\nShe comes with her whole body. Every muscle that's usually so still now shaking. Her mouth opens but nothing comes out. The woman who always has the perfect word has nothing.`;

            const branches = {
                'pv': vessaM >= 4 ? `\n\nHer strong body clamps around you — her pussy clenching hard on your ${playerGenSize} cock, her legs locked, her arms pulling you deep. She rides the orgasm with her whole frame and the strength behind it is startling.` : `\n\nHer pussy clenches around your ${playerGenSize} cock — rhythmic, involuntary, nothing controlled about it. Her hips stutter and her hands grip whatever they can find. She doesn't make a sound. She can't.`,
                'vv': `\n\nHer fingers curl inside you as she comes — instinct overriding technique, pressure building instead of releasing. Her hips buck against your hand and she grips your wrist hard enough to leave marks. The precision is gone. Just need.`,
                'vp': `\n\nHer ${npcGenSize} cock pulses inside you — she thrusts through the orgasm, unable to stop, rhythm breaking apart. Her hands grip your hips and pull you down onto her, taking everything, giving everything. The composure is demolished.`,
                'pp': `\n\nBoth cocks pulse in her grip — hers and yours together, the sensation cascading between them. She strokes through it, hand tightening, rhythm gone, just pressure and heat and the last of her composure dissolving.`
            };

            text += climaxText + getSexSceneText('vessa', branches);
        }

        // === COMEDOWN (stat-priority) ===
        let comedown;
        if (isGoddess) {
            comedown = `\n\nShe's vast and unfamiliar and still processing. You lie against her and she holds still — not from composure, from overload. Too many new sensations to sort. Eyes closed. Breathing slowly. Every shift in position triggers another stillness beat but there's nothing left to still — she's already stopped.\n\n{vessa}"I need a moment." She needs several. Minutes pass. Her hand finds yours and holds it. Not a gesture she's made before. She doesn't comment on it.`;
        } else if (vessaC >= 5) {
            comedown = `\n\nYou rest against her chest. The weight is still strange to her — she shifts, feels it move, then pulls you closer into the softness. Her hand traces idle patterns in your hair.\n\nShe's still cataloguing. You can tell by the way her fingers pause, test, resume. But there's warmth in it now that wasn't there at the start. {vessa}"These are..." She cups her own breast over your head. Doesn't finish the sentence. Settles.`;
        } else if (vessaB >= 5) {
            comedown = `\n\nShe lies on her side, her enormous ass reshaping the cushions behind her. She reaches back, touches it — still adjusting to the mass. Then she settles. Pulls you against her back, spoons, lets the warmth sink in.\n\nHer hand finds your hip and holds you there. She's not moving. Not analyzing. Just lying with someone in a body she's still getting to know.`;
        } else if (vessaM >= 4) {
            comedown = `\n\nHer muscles slowly unclench. She stretches — long, slow, feeling what her body can do. The power is still new and she tests it even at rest, flexing one arm, tracing the definition with her other hand.\n\nShe wraps around you. Solid and warm. Holds you like she's not sure she wants to let go yet. {vessa}"That was..." She trails off. The woman who always finishes her sentences doesn't. She holds you tighter instead.`;
        } else if (vessaGS >= 3 && vessaHasVulva) {
            comedown = `\n\nShe presses her thighs together, aftershocks still coming. Her hand drifts between her legs — not touching, just resting near the sensitivity. She breathes through it with something that's almost composure.\n\n{vessa}"That's new." Quiet. Almost to herself. She means the intensity. She means the scale of it. She lies next to you and her hand finds your arm. Just touching.`;
        } else if (vessaGS >= 3 && !vessaHasVulva) {
            comedown = `\n\nShe looks down at her cock, still half-hard, still sensitive. She doesn't touch it — too much input. She lies back, staring at the ceiling, processing.\n\n{vessa}"The feedback loop is..." She stops. Shakes her head once. {vessa}"Different from anything I had a framework for." She reaches for your hand. Holds it. Her thumb traces circles on your palm while her mind catches up.`;
        } else if (vessaC <= 1 && vessaM <= 1) {
            comedown = `\n\nShe curls against you — slight, pale, familiar. This is the body she knows. The sex was good. She was skilled. But the thrill was you, not the sensation.\n\nShe traces a finger along your collarbone. Violet eyes open, watching. Already reading the room again. {vessa}"That was lovely." Measured. Genuine. She already knew it would be.`;
        } else {
            comedown = `\n\nShe lies beside you, pale skin in the workshop light. One finger traces idle patterns on your chest — absent, content. She's thinking, but not about an experiment.\n\nMinutes pass before she speaks. {vessa}"I had an analysis prepared." Her finger keeps tracing. {vessa}"I can't remember a single observation." The faintest smile. She's not upset about it.`;
        }
        text += comedown;

        // === Transform callback ===
        if (sawTransform) {
            text += `\n\nShe stretches her legs — flexes, extends, wiggles her toes. {vessa}"The tail..." She traces her thigh where scales were minutes ago. {vessa}"I could feel the entire length. Every coil, every contraction." She looks at you sideways. {vessa}"We should document this properly next time."`;
        }

        // === Player standout modifiers ===
        if (playerC >= 4) {
            text += `\n\nHer hand drifts to your chest. Rests there. Thumb traces a slow circle. She doesn't comment — just keeps her hand there, pressing slightly, as if she's memorizing the shape through her palm.`;
        }
        if (playerB >= 4) {
            text += `\n\nHer hand slides to your hip, then lower. Appreciative. Lingering. She traces the curve with one finger, mapping it. She's still collecting data, even now.`;
        }

        // === Exit line ===
        text += `\n\n{vessa}"We should do that again." She stretches, slow and luxurious. Violet eyes find yours with a warmth that wasn't there before the scene started. {vessa}"I have theories I'd like to revisit."`;

        this.text = text;
    },
    actions: [
        { label: 'Return to workshop', nextScene: 'workshop_main' }
    ]
};

