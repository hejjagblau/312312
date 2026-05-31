// ============================================
// LENNA SCENES
// Extracted from scenes.js for modularity
// ============================================

// ==========================================
// LENNA SCENES
// ==========================================

SCENES['lenna_greeting'] = {
    id: 'lenna_greeting',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'shy');

        // Check if already interacted this phase
        if (hasInteractedThisPhase('lenna')) {
            this.text = getAlreadyInteractedMessage('lenna');
            this.actions = [{ label: 'Leave', nextScene: 'location_library' }];
            return;
        }

        // Check if this is the first meeting (introduction)
        const intro = getNpcIntroduction('lenna');
        if (intro) {
            this.text = intro.text;
            this.speaker = intro.speaker;
            markNpcIntroCompleted('lenna');
            updateNpcLastSeenPlayer('lenna');
            this.actions = [
                {
                    label: 'Continue',
                    nextScene: 'location_library',
                    effects: [
                        { type: 'addTrust', npc: 'lenna', amount: 1 },
                        { type: 'recordNpcInteraction', npc: 'lenna' }
                    ]
                }
            ];
            return;
        }

        // Check for regret event (NPC went too far with transformations)
        const regretData = checkGreetingRegretEvent('lenna');
        if (regretData) {
            SCENES['regret_event']._regretData = regretData;
            SceneManager.playScene('regret_event');
            return;
        }

        // Check for genital proposal, goddess reveal, or archetype celebration
        const lennaArchEvent = checkGreetingArchetypeEvent('lenna');
        if (lennaArchEvent && (lennaArchEvent.type === 'proposal' || lennaArchEvent.type === 'goddess_reveal' || lennaArchEvent.type === 'celebration')) {
            SceneManager.playScene(lennaArchEvent.sceneId);
            return;
        }

        const reaction = getNpcReactionToChanges('lenna');
        if (reaction) {
            this.text = `Lenna drops her book, staring. "${reaction}"\n\n"Oh! I'm so sorry, I didn't mean to... um..."`;
        } else {
            this.text = "Lenna looks up from her book, startled. \"Oh! Hello... I was just organizing some... um...\" She gestures vaguely at the perfectly organized shelves.";
        }
        updateNpcLastSeenPlayer('lenna');

        // Build normal actions
        this.actions = [
            { label: 'I need to research something', nextScene: 'lenna_research' },
            {
                label: 'Chat',
                nextScene: 'lenna_chat',
                condition: () => !hasInteractedThisPhase('lenna'),
                effects: [{ type: 'recordNpcInteraction', npc: 'lenna' }]
            },
            {
                label: 'Flirt',
                nextScene: 'lenna_flirt_1',
                condition: () => !hasInteractedThisPhase('lenna') && gameState.npcs.lenna.trust >= 8,
                effects: [{ type: 'recordNpcInteraction', npc: 'lenna' }]
            },
            {
                label: 'Intimate...',
                nextScene: 'lenna_sex_intro',
                condition: () => !hasInteractedThisPhase('lenna') && (gameState.npcs.lenna.trust >= 10 || gameState.npcs.lenna.archetypeIntimateReady),
                effects: [{ type: 'recordNpcInteraction', npc: 'lenna' }, { type: 'setLocation', location: 'workshop' }]
            },
            { label: 'Leave', nextScene: 'location_library' }
        ];
    },
    actions: []
};

SCENES['lenna_research'] = {
    id: 'lenna_research',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna's eyes light up behind her glasses. \"Research? Oh, I can help with that! What are you looking for?\" She's already moving toward the reference section.",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'eager');
    },
    actions: [
        { label: "Information about my uncle's work", nextScene: 'lenna_research_uncle' },
        { label: 'Transformation magic', nextScene: 'lenna_research_magic' },
        { label: 'Never mind', nextScene: 'lenna_greeting' }
    ]
};

SCENES['lenna_research_uncle'] = {
    id: 'lenna_research_uncle',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna pulls out several dusty tomes. \"Your uncle donated some fascinating texts. Most are in languages I can't identify, but there are notes in the margins...\" She hesitates. \"Some of it is quite... unusual. About changing the human form.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'helpful');
        gameState.flags.knowledge_hint_uncle_research = true;
        gameState.npcs.lenna.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Can I see them?', nextScene: 'lenna_show_books' },
        { label: 'Continue', nextScene: 'lenna_greeting' }
    ]
};

SCENES['lenna_research_magic'] = {
    id: 'lenna_research_magic',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna's cheeks flush. \"T-transformation magic? That's... that's a very specialized subject.\" She pushes her glasses up nervously. \"May I ask why you're interested?\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'flustered');
    },
    actions: [
        { label: 'Academic curiosity', nextScene: 'lenna_research_academic' },
        { label: 'Practical application', nextScene: 'lenna_research_practical' },
        { label: 'Continue', nextScene: 'lenna_greeting' }
    ]
};

SCENES['lenna_research_academic'] = {
    id: 'lenna_research_academic',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna nods eagerly. \"Academic! Yes, of course. I've been studying it myself. Purely academically, naturally.\" She's blushing harder. \"There's quite a lot of material if you know where to look.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'eager');
        gameState.npcs.lenna.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'lenna_greeting' }
    ]
};

SCENES['lenna_research_practical'] = {
    id: 'lenna_research_practical',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna's eyes go wide. \"P-practical? You mean you can actually...\" She swallows hard. \"I'd heard rumors about your uncle, but I never thought...\" Her voice drops to a whisper. \"Is it real?\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'amazed');
        gameState.npcs.lenna.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Would you like to find out?', nextScene: 'lenna_offer_change' },
        { label: 'Continue', nextScene: 'lenna_greeting' }
    ]
};

SCENES['lenna_show_books'] = {
    id: 'lenna_show_books',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna leads you to the restricted section, pulling out a leather-bound tome.\n\n\"These are your uncle's notes on physical transformation. I've been trying to decipher them for months.\" She hands you the book reverently. \"Maybe they'll make more sense to you.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'sharing');
        gameState.npcs.lenna.trust += 1;
        saveState();
        UI.updatePlayerSidebar();
    },
    actions: [
        { label: 'Thank you', nextScene: 'lenna_greeting' }
    ]
};

SCENES['lenna_chat_1'] = {
    id: 'lenna_chat_1',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna's eyes light up behind her glasses. \"Your uncle donated several books to the library. Strange texts, in languages I couldn't identify. They're in the restricted section now... I've been trying to translate them.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'interested');
        gameState.npcs.lenna.trust += 1;
        gameState.flags.knowledge_hint_books = true;
        saveState();
    },
    actions: [
        { label: 'Can I see them?', nextScene: 'lenna_chat_1b' },
        { label: 'Any luck with translations?', nextScene: 'lenna_chat_1c' },
        { label: 'Continue', nextScene: 'location_library' }
    ]
};

SCENES['lenna_chat_1b'] = {
    id: 'lenna_chat_1b',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "\"I... well, they're restricted for a reason. But since they were your uncle's...\" She pushes her glasses up nervously. \"Perhaps when I know you better. The texts mention dangerous things.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'hesitant');
        gameState.npcs.lenna.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'lenna_greeting' }
    ]
};

SCENES['lenna_chat_1c'] = {
    id: 'lenna_chat_1c',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna sighs. \"Some. The texts describe... physical alterations. Ways to change the human body using a combination of mechanical devices and magical energy.\" She looks at you intently. \"I assumed it was fiction. But now I'm not so sure.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'thoughtful');
        gameState.npcs.lenna.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'lenna_greeting' }
    ]
};

SCENES['lenna_chat_2'] = {
    id: 'lenna_chat_2',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna gazes at an illustrated book of heroic tales. \"Sometimes I read these stories and wonder... what would it be like to be one of those heroines? Strong, tall, commanding attention...\" She blushes. \"Instead of invisible little Lenna in her dusty library.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'wistful');
        gameState.npcs.lenna.trust += 1;
        gameState.flags.lenna_desire_revealed = true;
        gameState.npcs.lenna.desiresRevealed[2] = true;
        saveState();
    },
    actions: [
        { label: "You're not invisible to me", nextScene: 'lenna_chat_2b' },
        {
            label: 'I could help with that',
            nextScene: 'lenna_offer_change',
            condition: () => gameState.day >= 3  // After getting familiar with devices
        },
        { label: 'Continue', nextScene: 'location_library' }
    ]
};

SCENES['lenna_chat_2b'] = {
    id: 'lenna_chat_2b',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna's face turns bright red. \"I... you... that's...\" She takes a deep breath. \"That's the nicest thing anyone's said to me in years.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'blushing');
        gameState.npcs.lenna.trust += 3;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'lenna_greeting' }
    ]
};

SCENES['lenna_flirt_1'] = {
    id: 'lenna_flirt_1',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "{player}\"Has anyone told you how cute you look when you're concentrating?\" You lean against her desk.\n\nLenna drops her book, face crimson. {lenna}\"C-cute?! Me?! I'm not... that is to say... books don't just...\" She scrambles to pick it up. {lenna}\"You shouldn't say things like that in a library!\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'flustered');
        gameState.npcs.lenna.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Should I say them somewhere else?', nextScene: 'lenna_flirt_1b' },
        { label: 'Continue', nextScene: 'lenna_greeting' }
    ]
};

SCENES['lenna_flirt_1b'] = {
    id: 'lenna_flirt_1b',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna makes a small squeaking noise. \"I... that's... you're impossible!\" But she's smiling despite herself. \"Maybe... maybe sometime when the library is closed. For purely academic discussion, of course.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'flustered_happy');
        gameState.npcs.lenna.trust += 1;
        gameState.flags.lenna_interested = true;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'location_library' }
    ]
};

SCENES['lenna_offer_change'] = {
    id: 'lenna_offer_change',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna's glasses almost fall off. \"You... you can do that? Actually do that?\" Her hands tremble. \"I've read about it, dreamed about it, but I never thought...\" She whispers. \"You could make me like the heroines in the stories?\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'hopeful');
    },
    actions: [
        { label: 'Come to my workshop and see', nextScene: 'lenna_accept_workshop_invite' },
        { label: 'Think about what you really want first', nextScene: 'lenna_offer_delay' }
    ]
};

SCENES['lenna_offer_delay'] = {
    id: 'lenna_offer_delay',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna nods, taking a shaky breath. \"You're right. This is... a lot to process. I need to think about what I really want.\" She looks at you gratefully. \"Thank you for not rushing me.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'grateful');
        gameState.npcs.lenna.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'location_library' }
    ]
};

SCENES['lenna_accept_workshop_invite'] = {
    id: 'lenna_accept_workshop_invite',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna clutches a book to her chest like armor. \"I... yes. Yes, I want to see.\" She pushes her glasses up. \"I'll close the library early tomorrow. For research purposes.\" She can't hide her nervous excitement.",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'determined');
        gameState.npcs.lenna.trust += 1;
        gameState.flags.lenna_workshop_visit_scheduled = true;
        gameState.flags.lenna_workshop_visit_triggered = false;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'location_library' }
    ]
};

SCENES['lenna_workshop_arrival'] = {
    id: 'lenna_workshop_arrival',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        // Skip intro on repeat visits
        if (gameState.npcs.lenna.firstDesireFulfilledDay !== null) {
            SceneManager.playScene('lenna_transformation_ready');
            return 'redirect';
        }
        this.image = getNpcImagePathSimple('lenna', 'amazed');
        this.text = "A soft knock at your door. Lenna enters, clutching several books.\n\n{lenna}\"I brought reference materials. For... documentation purposes.\" She looks around at the devices with scholarly wonder. {lenna}\"Oh my. Oh my goodness. This is even more remarkable than I imagined.\"";
    },
    actions: [
        { label: 'What did you decide you wanted?', nextScene: 'lenna_transformation_ready' },
        { label: 'Let me show you around', nextScene: 'lenna_workshop_tour' }
    ]
};

SCENES['lenna_workshop_tour'] = {
    id: 'lenna_workshop_tour',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna takes copious notes as you explain each device.\n\n\"Fascinating! The theoretical principles are sound, but the practical application...\" She trails off, blushing. \"I'm stalling, aren't I? I'm just... nervous. About what I want to ask for.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'nervous');
        gameState.npcs.lenna.trust += 1;
        saveState();
    },
    actions: [
        { label: 'What do you want?', nextScene: 'lenna_transformation_ready' }
    ]
};

SCENES['lenna_transformation_choice'] = {
    id: 'lenna_transformation_choice',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna takes a deep breath. \"In the stories, the heroines are... commanding. Impossible to ignore. They have...\" She gestures vaguely at her chest, blushing furiously. \"I want that. I want to walk into a room and have people notice me. Is that... is that terribly vain?\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'embarrassed');
    },
    actions: [
        { label: "There's nothing wrong with wanting to be seen", nextScene: 'lenna_transformation_ready' },
        { label: 'Are you sure this is what you want?', nextScene: 'lenna_transformation_confirm' }
    ]
};

SCENES['lenna_transformation_confirm'] = {
    id: 'lenna_transformation_confirm',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: "Lenna nods firmly. \"I've thought about nothing else since you offered. I've spent my whole life being overlooked. I want to know what it feels like to be... magnificent.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'determined');
    },
    actions: [
        { label: 'Then magnificent you shall be', nextScene: 'lenna_transformation_ready' }
    ]
};

SCENES['lenna_transformation_ready'] = {
    id: 'lenna_transformation_ready',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('lenna');
        gameState.currentTransformationTarget = 'lenna';
        saveState();

        const npc = gameState.npcs.lenna;
        const desire = npc?.currentDesire;
        const label = desire?.label?.toLowerCase() || 'a change';
        const thresholds = getNpcTrustThresholds('lenna');
        const horny = (npc.trust >= thresholds.intimate) || npc.hiddenArchetype === 'goddess';

        if (horny) {
            this.text = `Lenna removes her glasses and sets them down carefully. Her cheeks are flushed.\n\n{lenna}"${label[0].toUpperCase() + label.slice(1)}." She meets your eyes without the usual deflection. {lenna}"I've read about this. What it's supposed to feel like." A breath. {lenna}"I want to know if the books were right."`;
        } else {
            this.text = `Lenna adjusts her glasses, then adjusts them again.\n\n{lenna}"I'd like ${label}." She pulls out a small notebook, pen poised. {lenna}"For documentation purposes, of course." She catches your look and flushes. {lenna}"Well — and because I want it."`;
        }
    },
    actions: [
        { label: 'Select a device', nextScene: 'device_selection' },
        { label: 'Changed your mind?', nextScene: 'workshop_main' }
    ]
};

SCENES['lenna_transform_chest'] = {
    id: 'lenna_transform_chest',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "The device flares to life. Lenna gasps, gripping the handles as warmth floods through her.\n\n{lenna}\"Oh! Oh goodness!\" Her modest dress begins to strain as her breasts swell dramatically. {lenna}\"It's... it's really happening!\"",
    onEnter: function() {
        this.image = 'images/transformations/transform_chest_5.webp';
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.lenna_transformation_complete) {
            gameState.npcs.lenna.body.chest = 5;
            gameState.npcs.lenna.trust += 5;
            gameState.flags.lenna_transformation_complete = true;
            recordNpcBodyChange('lenna');
            saveState();
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'lenna_transform_chest_success' }
    ]
};

SCENES['lenna_transform_chest_success'] = {
    id: 'lenna_transform_chest_success',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "The transformation completes. Lenna stares down at herself in disbelief.\n\n{lenna}\"Oh my goodness. Oh my goodness gracious.\" Her modest dress is now anything but modest. {lenna}\"I look like one of those heroines! I... I actually do!\"\n\nShe looks up at you, tears in her eyes behind her crooked glasses. {lenna}\"I'm so embarrassed that I wanted this, but... I'm so happy that I have it. Does that make sense?\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'transformed');
    },
    actions: [
        { label: 'Perfect sense', nextScene: 'lenna_transform_aftermath' }
    ]
};

SCENES['lenna_transform_aftermath'] = {
    id: 'lenna_transform_aftermath',
    image: '',
    imagePrompt: null,
    speaker: 'Lenna',
    text: `Lenna adjusts her now-straining dress, laughing through her tears. Her hands rise almost involuntarily to cup her new assets, as if confirming they're real.

"I'm going to need an entirely new wardrobe. And people are going to stare." She grins - a new, confident expression you've never seen on the shy librarian. "Let them stare. For once, I WANT them to."

She moves to hug you, and her new proportions press against your chest, warm and impossibly soft. She gasps at the sensation. "Oh! I... I didn't realize they'd be so... sensitive."

Her face flushes as she pulls back slightly, then pulls you close again. "Thank you. For making a librarian's foolish dream come true." Her breath catches. "Every heroine in every story... I finally understand what they feel like."`,
    onEnter: function() {
        this.image = getNpcImagePathSimple('lenna', 'happy');
        gameState.npcs.lenna.trust += 3;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};


// ============================================
// LENNA SEX SCENES
// ============================================

SCENES['lenna_sex_intro'] = {
    id: 'lenna_sex_intro',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('lenna', 'base');
        markSexUnlocked('lenna');

        // --- Variables ---
        const npcBody = gameState.npcs.lenna.body;
        const playerBody = gameState.player.body;
        const lennaM = npcBody.muscle;
        const lennaC = npcBody.chest;
        const lennaB = npcBody.butt;
        const lennaGS = npcBody.genitaliaSize;
        const lennaHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerM = playerBody.muscle;
        const playerB = playerBody.butt;
        const playerGS = playerBody.genitaliaSize;
        const npcInSkirt = lennaB >= 5 || (!lennaHasVulva && lennaGS >= 3);
        const playerInSkirt = playerB >= 5 || (playerBody.genitalia === 1 && playerGS >= 3);
        const npcChest = getBodyStatDesc('lenna', 'chest');
        const npcButt = getBodyStatDesc('lenna', 'butt');
        const npcGenSize = getBodyStatDesc('lenna', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        // --- Part 1: Lenna's Body (muscle-branched, then chest/butt modifiers) ---
        let part1;
        if (lennaM <= 1) {
            if (lennaC <= 1) {
                part1 = `Lenna removes her reading glasses with trembling hands and sets them on the shelf beside a stack of borrowed novels. Their spines are creased from rereading. She doesn't look at the titles.\n\n{lenna}"I've imagined this." Her voice is barely above a whisper. {lenna}"In considerable detail, actually." Her cheeks flush as you help her out of her high-collared dress. Underneath she's slight and pale — narrow shoulders, flat chest, every rib visible when she breathes. Ink-stained fingers rise to cover herself, then she forces them down to her sides.\n\nShe stands there. No curves, no softness, no armor. Her grey eyes find yours and hold. {lenna}"In The Trials of Lady Ashworth, the heroine stands before her lover and says, 'I offer myself without armor.'" She swallows. {lenna}"I always thought that was melodramatic." Her fingers trail along her own collarbone — reading herself, confirming the shape. {lenna}"I understand it now."`;
            } else if (lennaC <= 3) {
                part1 = `Lenna removes her reading glasses with trembling hands and sets them on the shelf beside a stack of borrowed novels. She doesn't look at the titles.\n\n{lenna}"I've imagined this." Her voice is barely above a whisper. {lenna}"In considerable detail, actually." Her cheeks flush as you help her out of her high-collared dress. Her ${npcChest} are pale and soft on a slight frame — she's still the librarian underneath, narrow and fine-boned, but the body isn't quite what you expected from the high collar.\n\nShe covers herself with ink-stained fingers. Then forces her hands down. One hand drifts to her own breast, tracing the curve — not for you. For herself. Confirming. {lenna}"The theoretical principles of physical intimacy suggest that initial exposure creates a heightened state of —" She catches herself. {lenna}"I'm stalling." A shaky breath. {lenna}"I want this. I'm just not used to someone seeing me."`;
            } else {
                part1 = `Lenna removes her reading glasses with trembling hands and sets them on the shelf. She doesn't look at the titles of the novels beside them.\n\n{lenna}"I've imagined this." Her voice is barely above a whisper. Her cheeks flush as you help her out of her high-collared dress, and her ${npcChest} spill free — heavy, pale, impossible to overlook on a frame this slight. She cups one with an ink-stained hand, testing the weight, and her breath catches.\n\n{lenna}"The books describe this feeling as 'vulnerability crossed with anticipation.'" Her fingers trace her own nipple and her eyelids flutter. {lenna}"The books are wrong. It's more than that." She lets her hand fall, stands there with her heavy chest bare and her grey eyes steady. She's trembling, but she isn't hiding.`;
            }
        } else if (lennaM <= 3) {
            part1 = `Lenna removes her reading glasses and sets them on the shelf. She's already unbuttoning her high collar before you reach for her — fingers working with a speed that betrays how much she's thought about this moment.\n\nThe dress falls and she's toned underneath — not dramatically, but the softness you expected from the shy librarian has definition to it. Arms with shape, stomach with a line down the center. She runs her own hand down her arm, feeling the muscle, then across her stomach. Her ${npcChest} sit on a frame that's stronger than it looks.\n\n{lenna}"I've been reading about the relationship between physical conditioning and sensory response." She meets your eyes. The shyness is there, but something else is underneath it — a steady focus that wasn't in the library. {lenna}"I have hypotheses I'd like to test." Her hand drifts to her own collarbone, traces down between her breasts. She's reading herself. {lenna}"Several hypotheses."`;
        } else {
            part1 = `Lenna removes her reading glasses and sets them on the shelf. She pulls her dress over her head in one motion — no fumbling, no hesitation — and the body underneath fills the space between you.\n\nDense muscle under pale skin. Broad shoulders, thick arms, a stomach ridged with definition. Her ${npcChest} sit on a chest wall that could crack stone. She rolls her shoulders, testing the range, and something about the motion makes her pause — fingers trailing across her own bicep, studying. She's still reading her own body, even now.\n\n{lenna}"The literature on proprioceptive feedback at elevated muscle density is remarkably thin." Her grey eyes find yours. No trembling. No covering herself. The shy librarian's posture is gone, replaced by something that takes up more room than she realizes. {lenna}"I intend to fill the gap." Her hand flexes at her side. She doesn't know how strong she is. You do.`;
        }
        // Part 1 butt modifier
        if (lennaB >= 5) {
            part1 += `\n\nHer ass is extraordinary — enormous, pale, reshaping the silhouette of the shy librarian into something from the illustrated plates she keeps in the restricted section. She turns and catches you looking. Her hand drifts to her own hip, traces the curve down, and her eyes half-close for a moment. {lenna}"The proportions exceed anything in the anatomical references." Her fingers press into the soft flesh. {lenna}"Considerably."`;
        } else if (lennaB >= 4) {
            part1 += ` Her ${npcButt} fills out her frame in a way that the high-collared dress had been hiding — she shifts her weight and her hand grazes her own hip, a reflexive touch.`;
        }

        // --- Part 2: Getting Close (power dynamics + player standouts) ---
        let part2;
        const bothPetite = playerM <= 1 && lennaM <= 1;
        if (playerM >= 5 && lennaM <= 1) {
            part2 = `You pull her against you and she disappears into the density of your body. Her slight frame presses against your chest, ink-stained fingers spreading across your skin, and the trembling stops. She goes still. Focused.\n\n{lenna}"Hold my wrists." Not a request. She places her own hands behind her back, looks up at you with those grey eyes, and the shy librarian is gone. What's left is someone who has spent years imagining exactly this. {lenna}"Hold them together. Behind me." She presses her wrists into your grip and her breath shudders. {lenna}"I've read about this. Restraint as a mechanism for redirecting attention to sensation." A beat. {lenna}"The theory is inadequate."`;
        } else if (playerM >= 5 && lennaM >= 2) {
            part2 = `You pull her close and she yields — not because she has to. Because she wants to test how it feels. Her toned body presses against yours and she catalogues the contact: your strength against hers, the difference in scale.\n\n{lenna}"I want you to hold me down." She says it in a complete sentence, meeting your eyes, cheeks burning. {lenna}"Chapter nine of The Sapphire Suitor describes the surrender of a strong woman to a stronger partner, and I've always wanted to know if the..." She trails off. Her hips press against yours. {lenna}"Just hold me down. Please."`;
        } else if (playerM <= 1 && lennaM <= 1) {
            if (playerC >= 4 && playerB >= 4) {
                part2 = `She draws you close and her hands find the contrast immediately — your slight frame, then the swell of your chest, then the curve of your ass. She goes still. Her ink-stained fingers trace from one to the other, mapping, studying.\n\n{lenna}"The anatomical distribution is remarkable." Quiet. Almost to herself. Her fingers trace the line where your narrow waist becomes the swell of your hip. {lenna}"I've read about body configurations like this but the illustrations never captured the..." Her hand cups your breast and she forgets the sentence. Her other hand finds your ass. She's splitting her attention and losing both threads.`;
            } else if (playerC >= 4) {
                part2 = `She draws you close and her hands find your chest — both hands, deliberate, tracing the shape. On your slight frame they're prominent, and she takes her time. Goes still when she cups the weight.\n\n{lenna}"I've been thinking about these since I noticed." Barely audible. Her thumbs trace slow circles. She presses her face between them, breathes in, and her composure dissolves for a moment. She pulls back. Swallows. Reaches for them again.`;
            } else if (playerB >= 4) {
                part2 = `She draws you close and her hands slide down your back to your ass. She cups the curve on your narrow frame and goes still — ink-stained fingers pressing into the flesh, studying the shape.\n\n{lenna}"In the illustrated edition there's a plate showing..." She trails off. Her hands don't move. She pulls you against her, using your hips as an anchor. The gesture is possessive in a way the shy librarian has never been.`;
            } else {
                part2 = `She draws you close and you fold together — two slight bodies, all angles and warmth. Her ink-stained fingers trace your spine, your ribs, the sharp line of your hip. She maps you with a scholar's attention, precise and thorough.\n\n{lenna}"Like this." She angles herself against you — sternum to sternum, skin to skin, nothing between. Her fingers find the spots that make you react and she files each one away. {lenna}"The texts describe initial physical compatibility as a function of surface contact." She presses closer. {lenna}"The texts are underselling it."`;
            }
        } else if (playerM <= 1 && lennaM >= 4) {
            part2 = `She pulls you against her and you vanish into the density of her body. Her thick arms close around you — not gently, not roughly. Efficiently. She repositions you with one hand while her mouth finds your neck, and you realize the shy librarian is gone. She wanted you there. Now you're there.\n\n{lenna}"I've been thinking about the optimal positioning for —" She picks you up. Moves you two feet to the left. Sets you down on the workbench. {lenna}"Better angle." She said it the way she'd say 'better shelf.' She hasn't noticed she just lifted you like a stack of books.`;
        } else if (playerM <= 1 && lennaM >= 2) {
            part2 = `She pulls you close and wraps around you — her body is warmer now, denser, and your slight frame settles against it. She holds you with easy strength, repositions you where she wants you.\n\n{lenna}"Here." She adjusts your hips with ink-stained hands. Not a suggestion. A placement. She's already cataloguing the next variable, her grey eyes distant with calculation. Her hand grabs your wrist and pulls it between her legs — a little too firmly. She doesn't notice the strength.`;
        } else if (lennaM >= 5 && playerM >= 5) {
            part2 = `She pulls you close and you don't move. She pulls harder. You still don't move. Her grey eyes widen — then narrow with a focus that has nothing shy about it.\n\nShe tries to reposition you. Can't. Tries again, harder, and neither of you budges. For a moment the scholar resurfaces: {lenna}"The coefficient of friction between two bodies of equivalent mass and muscle density would suggest —" Then she grabs your shoulders and shoves, and you shove back, and it becomes something else entirely. Wrestling that slides into grinding that slides into urgency. She's laughing — actually laughing, breathless, delighted — because she's never been matched.`;
        } else {
            part2 = `She draws you close with hands that are steadier than they were a moment ago. The shyness is still there in her cheeks, her averted eyes — but her hands know where they're going. She settles against you, finds the position she wants, and her ink-stained fingers stop roaming and settle with intent.\n\nHer hand finds yours and guides it to her breast. Not shy about the destination. Shy about the asking. {lenna}"I've thought about your hands here." She presses your palm against herself and her breath catches. {lenna}"Specifically your hands. For some time." Her grey eyes find yours and the blush is deep but the gaze is steady.`;
        }
        // Part 2 modifiers
        if (playerC >= 4 && !bothPetite) {
            part2 += ` Her hands find your chest and she goes still — that scholar's focus locking on. She traces the shape, cups the weight, runs her thumb across a nipple and watches your reaction with undivided attention. She keeps coming back to them. {lenna}"Remarkable architecture." The word is clinical. The touch is not.`;
        }
        if (playerB >= 4 && !bothPetite) {
            part2 += ` Her hands slide to your ass and she kneads, pulls, presses herself against the curve. She settles between your legs with her cheek resting against you, face pressed into the warmth. {lenna}"I had a chapter bookmarked about this exact configuration." She doesn't elaborate. Her hands don't leave.`;
        }
        if (npcInSkirt && lennaHasVulva) {
            part2 += ` Her dress is dark with wetness between her thighs. She notices, looks down, and for a moment the blush deepens — then she meets your eyes without hiding it.`;
        }
        if (lennaM >= 5 && !(lennaM >= 5 && playerM >= 5)) {
            part2 += ` Her arm closes around you and repositions you without thinking — her strength is casual, unconscious. She wanted you at a different angle, so she moved you. Like adjusting a bookmark.`;
        }
        if (lennaC >= 5) {
            part2 += ` Her massive chest presses between you, heavy and warm. She grinds into the pressure and her eyes half-close — her fingers trace the swell of her own breast, reading the shape. {lenna}"I need your mouth on my tits and I need you to not stop." The word lands. Her eyes widen at herself. She doesn't take it back.`;
        }

        // --- Part 3: Oral Phase ---
        let part3;
        if (lennaHasVulva && lennaGS >= 3) {
            // Changed body — swollen, oversensitive, the books didn't prepare her
            part3 = `She sinks to her knees. This part she's studied — anatomy diagrams, technique manuals, the forbidden collection's illustrated guides. She knows the theory better than anyone in this town.\n\nBut her body is different now and the position changes everything. Her swollen pussy throbs between her thighs, thick folds slick with arousal she can't control. She starts working you with her mouth — thorough, precise, devastatingly skilled — and then her hand drifts between her own legs. She touches herself and her rhythm falters.\n\nShe pauses. Grey eyes closed. The sensation from her own swollen folds is interfering with the technique she's rehearsed in her mind a hundred times. She adjusts, resumes, and her hips buck into her own hand. {lenna}"The anatomical literature doesn't account for —" She gives up on the sentence. Her free hand stays between her legs, idly maintaining, while her mouth works you with a thoroughness that borders on obsessive. She's going to cover everything. She has a curriculum.`;
        } else if (!lennaHasVulva && lennaGS >= 2) {
            // Has cock — unfamiliar but she's read about it extensively
            part3 = `She sinks to her knees. She knows oral — every technique manual, every anatomical guide, every position from every illustrated plate in the restricted section. Theory was all she had. Until now.\n\nBut her body is different and everything about the position has changed. Her cock hangs between her thighs, stiffening, sending feedback she's only read about. She starts working you with her mouth — devastatingly skilled, thorough — and her cock throbs and she pauses. Goes still. Grey eyes closed.\n\nSomething about kneeling with a cock between her legs while her mouth is on you is hitting different than any text suggested. She resumes. Slower. Her free hand drifts to her own shaft, wraps around it, and her rhythm on you changes — less precise, more urgent. She's idly stroking herself between attentions, maintaining, like keeping a page marked while switching books. {lenna}"The proprioceptive feedback is..." She doesn't finish. Her mouth is busy.`;
        } else {
            // Baseline — the devastating scholar
            part3 = `She sinks to her knees with a composure that doesn't match the blush on her cheeks. Her grey eyes meet yours from below — steady, focused, the look of someone about to demonstrate expertise.\n\nHer mouth finds you with precision that makes your breath catch. No fumbling, no warm-up. She knows exactly where to press, where to lick, where to apply pressure and where to ease off. She's read every anatomical treatise in that library and she remembers all of them. Her technique is flawless and thorough — almost too thorough. She takes her time because she wants to cover everything.\n\nHer free hand drifts between her own legs. Not urgent — casual. Maintaining. She touches herself while she works you, ink-stained fingers idly circling, keeping her own arousal at a simmer. She does it without thinking, like someone who does this all the time. {lenna}"I've wanted to try this particular technique since chapter fourteen." Murmured against you. She doesn't specify which book. She goes back to demonstrating.`;
        }

        const opening = part1 + '\n\n' + part2 + '\n\n' + part3;

        // --- Genital Branches ---

        // === PV: player penis + Lenna vulva ===
        let pvText;
        if (playerM >= 5 && lennaM <= 1) {
            pvText = `You lift her onto the workbench — she weighs nothing, her slight frame settling into your hands. She wraps her legs around you and places her own hands behind her back, wrists together, grey eyes locked on yours. She wants to be held down and taken. She's been imagining this exact configuration.\n\nYou push your ${playerGenSize} cock into her pussy and she takes a sharp breath — held, controlled, then fracturing. {lenna}"The sensation of penetration while physically restrained produces a —" The sentence dies. Her eyes go wide. Her wrists strain against your grip and the resistance makes her gasp. {lenna}"Harder." Single word. The literary voice is gone. She writhes against the restraint, her slim body pinned, and every thrust pushes a sound out of her that gets less composed and more desperate.`;
        } else if (lennaM >= 4 && playerM <= 1) {
            pvText = `She picks you up and puts you on the workbench. Not asking — positioning. She straddles you, takes your ${playerGenSize} cock in ink-stained fingers, and sinks down with a focused exhale. Then her hands pin your wrists above your head — one arm, casually immovable.\n\n{lenna}"Stay." Single word. Glasses askew. She rolls her hips and the motion is controlled, deliberate, cycling through angles the way she'd cycle through chapters. She finds the angle she wants and her rhythm stutters — a sharp inhale, eyes closing. She does it again. And again. {lenna}"There." She's not talking to you. She's cataloguing. Her free hand cups her own ${npcChest}, squeezing, and the dual stimulation makes her bite her lip hard enough to leave a mark.`;
        } else if (lennaM >= 5 && playerM >= 5) {
            pvText = `Neither of you yields. The wrestling becomes positioning becomes penetration — she takes your ${playerGenSize} cock mid-grapple, sinks down while you're both still straining against each other. The penetration breaks the stalemate. She gasps — the first uncontrolled sound she's made.\n\nShe tries to pin you. Can't. Tries again while riding you and her rhythm breaks apart with the effort. {lenna}"I can't —" She's laughing and grinding and trying to get leverage and failing. {lenna}"I can't move you and I can't stop and this is —" The sentence dissolves into a moan as you thrust upward and her whole body shudders.`;
        } else {
            pvText = `She guides you down onto the workbench cushions and straddles you with a composure that's cracking at the edges. She takes your ${playerGenSize} cock, positions it at her pussy, and sinks down with a controlled exhale. Her ink-stained fingers brace on your chest.\n\nThe composed librarian lasts three strokes. Her hips find a rhythm and her eyes go distant — not unfocused. Calculating. She shifts angles, tests depths, adjusts pressure. She's cycling through positions she's read about, testing each one against reality. {lenna}"The Ashworth technique suggests a circular —" She rolls her hips and whatever she was going to say dissolves into a shudder. Her hand drifts to her own breast, fingers circling her nipple. She touches herself as naturally as breathing while she rides you, and the casual expertise is more shocking than any fumbling would have been.`;
        }
        // PV stat modifiers
        if (lennaC >= 5 && !(playerM >= 5 && lennaM <= 1)) {
            pvText += `\n\nHer massive chest sways with every roll of her hips — heavy, shifting, the body she's been dreaming about. She leans forward and pushes her breasts together around your cock, pulling out of her pussy to slide you into the warm valley between them. She cranes her neck and her tongue catches the tip each time it pushes through. She's been wanting to try this for years. The smile on her face is pure gratification. {lenna}"Again." She adjusts the pressure, tests a new angle. {lenna}"Again."`;
        } else if (lennaC >= 4) {
            pvText += `\n\nHer ${npcChest} sway with the motion, heavy on her frame. She cups one, squeezing, then guides your hand to the other. {lenna}"Teeth." One word. She means it. You comply and the sound she makes is low and startled and she grinds down harder.`;
        }
        if (lennaB >= 5) {
            pvText += `\n\nHer enormous ass drives every thrust — she sits deeper, pushes harder, the sheer mass behind her controlling the rhythm. She backs into you deliberately, that vast rear pressing against your hips. {lenna}"From behind." She turns, presents herself, and looks back over her shoulder with grey eyes that have nothing shy in them. {lenna}"I want to feel the impact through all of this."`;
        }
        if (lennaM >= 5 && !(lennaM >= 4 && playerM <= 1) && !(lennaM >= 5 && playerM >= 5)) {
            pvText += ` She braces with one arm and the workbench groans. She grabs your hip with her free hand and pulls you deeper — the grip is immovable. She hasn't noticed she's in complete control. You have.`;
        }
        // PV player standout modifiers
        if (playerC >= 4) {
            pvText += `\n\nHer hands find your chest mid-stroke — she straddles you, positions her pussy against your stiff nipple, and grinds her clit against it with deliberate precision. She's been thinking about this since she noticed your chest. {lenna}"The texture. The firmness." She rocks her hips, using your body as an instrument. {lenna}"Exactly as I theorized."`;
        }
        if (playerB >= 4) {
            pvText += `\n\nShe pushes you face-down, settles between your legs with her cheek resting on the curve of your ass, and her fingers find you from behind. She's comfortable. She's settling in. {lenna}"I'm going to be thorough." She means it. Her tongue joins her fingers and the thoroughness is devastating.`;
        }
        // PV size overlay
        if (playerGS >= 2 && lennaGS === 0) {
            pvText += `\n\nHer tight pussy grips your thick cock and she clenches deliberately — practiced, intentional. She angles herself for maximum friction and the control is devastating. {lenna}"I can feel every ridge." Her voice is breaking apart, sentence by sentence. {lenna}"Every inch." She presses into it. {lenna}"More."`;
        } else if (playerGS === 0 && lennaGS >= 2) {
            pvText += `\n\nShe's swollen and slick around you — thick folds engulfing your modest cock in plush, gripping heat. The sensitivity at this size is staggering. She grinds and every motion registers tenfold. {lenna}"Don't stop because I'm loud." Her fingers grip your shoulders. {lenna}"I mean it. Don't stop."`;
        } else if (playerGS >= 2 && lennaGS >= 2) {
            pvText += `\n\nShe's swollen and dripping and your thick cock fills her completely — the combination is overwhelming. Every thrust lands hard. Her composure shatters. She grabs the edge of the workbench and the sounds coming from her have no literary precedent. {lenna}"More." The word is all she has left.`;
        } else if (playerGS === 0 && lennaGS === 0) {
            pvText += `\n\nBoth tight, both precise — she clenches around your modest cock with deliberate control, every movement vivid and exact. She angles for maximum effect, grey eyes watching your face to calibrate. Technique over force. {lenna}"I've been practicing." She means the clenching. The control is devastating.`;
        }

        // === VV: both vulva ===
        let vvText;
        if (playerM >= 5 && lennaM <= 1) {
            vvText = `She places her own hands behind her back and turns around. {lenna}"Hold my wrists." She says it calmly, facing away from you, her slim body offered up. {lenna}"Hold them together. Then use your other hand." She presses her wrists into your grip and shudders when you close around them.\n\nYour free hand finds her pussy soaking and you push inside from behind. She writhes against the restraint, her slight body straining, and the harder she struggles the more turned on she gets. {lenna}"Harder." She pushes back against your hand. {lenna}"I can take more than you think."`;
        } else if (lennaM >= 4 && playerM <= 1) {
            vvText = `She pushes you down and drops between your legs. Her strong hands spread your thighs and hold them there — her grip is casual, immovable. Her mouth finds your pussy with devastating precision.\n\nShe works you with tongue and fingers, adjusting based on every sound you make. Thorough. Almost too thorough. Between attentions her free hand is between her own legs, idly circling, maintaining. She guides your hand to herself without breaking rhythm. {lenna}"Your turn." Already refocused on you. She's going to be here a while.`;
        } else if (lennaM >= 5 && playerM >= 5) {
            vvText = `Neither yields. The contest continues — hands gripping, bodies pressing — until she slides her fingers between your legs and you slide yours between hers at the same moment. Both of you freeze. Then both press deeper.\n\nIt becomes a different contest. She matches your rhythm exactly, refuses to break first. Fingers curling, hips pressing, grey eyes locked on yours behind disheveled brown hair. {lenna}"I've read about symmetrical resistance as an arousal mechanism." She's breathless but still forming sentences. {lenna}"The literature was correct."`;
        } else {
            vvText = `Her ink-stained fingers trace down your body with a scholar's attention, finding your wetness and exploring with the careful thoroughness of someone who has read extensively about the theory and now intends to practice every word of it.\n\nShe finds what makes you gasp and locks on with focused precision. Her technique is flawless — tongue and fingers in concert, building with an efficiency that says she's rehearsed this in her mind a thousand times. Her free hand is between her own legs, idly maintaining, casual. She guides your hand between her thighs without breaking rhythm. She's soaking. {lenna}"Don't stop because I'm loud." She presses into your touch and a sound escapes her that echoes through the workshop. She doesn't flinch. {lenna}"I said don't stop."`;
        }
        // VV gs-awareness
        if (playerGS >= 2 && lennaGS >= 2) {
            vvText += `\n\nBoth swollen — thick folds meeting thick folds, everything slick and puffy and amplified. She goes still when the sensation hits, grey eyes squeezing shut. Then she presses harder, chasing it. {lenna}"The sensitivity at this scale is —" She can't finish. Her hips buck into your hand.`;
        } else if (playerGS === 0 && lennaGS === 0) {
            vvText += `\n\nBoth tight, both precise — her fingers work you with deliberate pressure, finding the exact spot. She clenches around your fingers in return. Technique against technique. {lenna}"I've been practicing." She means the internal control. The squeeze around your fingers is devastating and intentional.`;
        } else if (playerGS >= 2 && lennaGS === 0) {
            vvText += `\n\nYour swollen folds are thick under her fingers — she traces every ridge, every crease, mapping the extra sensitivity with a scholar's thoroughness. Her own tight entrance clenches around your fingers with practiced precision. {lenna}"The contrast in morphology is —" She swallows. {lenna}"— informative." Her voice is shaking.`;
        } else if (playerGS === 0 && lennaGS >= 2) {
            vvText += `\n\nShe's swollen and dripping — thick lips parting easily, her pussy engulfing your fingers in slick heat. She grinds against your hand and the sensitivity makes her gasp. Your own tight entrance responds to her practiced fingers — she finds every pressure point without searching. {lenna}"Don't stop because I'm loud." Her hips buck. She means it.`;
        }
        // VV stat modifiers
        if (lennaC >= 4) {
            vvText += `\n\nHer ${npcChest} press between your bodies as she grinds closer. She cups one with her free hand, kneading, pinching her own nipple while her other hand works you. Self-stimulating while using your body. Both hands busy, hips doing the work.`;
        }
        if (lennaM >= 5 && !(lennaM >= 4 && playerM <= 1) && !(lennaM >= 5 && playerM >= 5)) {
            vvText += ` Her fingers inside you are strong — she adjusts the pressure with a precision that says she's aware of exactly how much force she's using. The control is more unsettling than carelessness would be.`;
        }
        if (playerC >= 4) {
            vvText += `\n\nShe straddles your chest, positions her pussy against your stiff nipple, and grinds her clit against it. {lenna}"I've been thinking about this since I noticed your chest." Her hips rock with deliberate precision, using your body as an instrument. The texture, the firmness — she knew exactly what she wanted to do.`;
        }
        if (playerB >= 4) {
            vvText += `\n\nShe positions you face-down, settles between your legs with her cheek resting on the curve of your ass, and eats you out from behind. She's comfortable. She's settling in. Her hands rest on your hips, not urgently — patiently. She's going to be here a while.`;
        }

        // === VP: Lenna penis + player vulva ===
        let vpText;
        if (lennaGS >= 2) {
            if (playerM >= 5 && lennaM <= 1) {
                vpText = `She lets you arrange her — position her cock, guide her into you, control the depth. She watches the whole time. Grey eyes fixed on where her ${npcGenSize} cock disappears into your pussy. The visual hits as hard as the sensation.\n\nShe pushes deeper because you let her, your strong body absorbing everything she gives. She goes still — watching herself inside you, feeling everything at once. {lenna}"The visual and tactile feedback occurring simultaneously produces a —" The sentence dies. She thrusts. {lenna}"Again." Her voice is rough.`;
            } else if (lennaM >= 4 && playerM <= 1) {
                vpText = `She lifts you, positions you, and pushes her ${npcGenSize} cock into your pussy with casual strength. One motion. She's already adjusted the angle before you've processed the change in position.\n\nShe thrusts — slow, deep, deliberate. She watches herself push in and she can't look away. The visual and the sensation together exceed every description she's read. She grips harder, moves faster, trying different depths, different speeds. {lenna}"Stay." She's having the time of her life. She picks you up and moves you to a different surface because the angle wasn't quite right. Like carrying a stack of books to a better-lit desk.`;
            } else {
                vpText = `She positions her ${npcGenSize} cock at your pussy, grey eyes intent on your face. She pushes inside — slow, savoring each inch. Her jaw tightens. She watches herself disappear into you with fixated attention.\n\n{lenna}"I want to feel every inch going in." She pushes deeper, watching, annotating. She tries a different depth. A different speed. She pulls out, pushes back in at a new angle, and the expression on her face is pure absorption — not shy, not embarrassed. A scholar doing fieldwork. She finds the angle that makes you gasp and her eyes light up. She hits it again. Deliberately. And again.`;
            }
        } else {
            // Small cock — technique over force
            vpText = `She positions her ${npcGenSize} cock at your pussy with grey eyes fixed on yours. She pushes in — precise, deliberate, angling for maximum effect. Not self-conscious about the size. She has technique, and she knows it.\n\n{lenna}"Precision matters more than magnitude." She says it like she's quoting something. She angles herself and finds the spot that makes your breath catch on the first try. She does it again. And again. Her free hand is between her own legs, idly maintaining, while she works you with focused devastation. {lenna}"The Ashworth technique describes a rotational —" She shifts her hips and the rotation makes you gasp. She can't help a small, satisfied smile.`;
        }
        // VP stat modifiers
        if (lennaC >= 5) {
            vpText += `\n\nHer massive chest sways with every thrust. She leans forward, pushes her breasts against you, and grinds into the contact. Her hand cups her own breast and she squeezes, testing the sensitivity while she thrusts. {lenna}"I want teeth." She guides your mouth to her nipple. At this size she can take it.`;
        }
        if (lennaB >= 5) {
            vpText += `\n\nHer enormous ass provides momentum behind every thrust — she pushes deeper, hits harder. She backs into you deliberately and looks over her shoulder. {lenna}"The optimal angle for posterior-dominant positioning suggests —" She pushes back and the rest of the sentence is just a sound.`;
        }
        if (playerC >= 4) {
            vpText += `\n\nBetween positions her hands find your chest — cupping, tracing, pressing her face between them while her hips keep moving. She's splitting her attention between the sensation below and the shape in her hands, and the dual input is destroying her composure.`;
        }
        if (playerB >= 4) {
            vpText += `\n\nShe grabs your ass with both hands and uses the grip to pull you onto her cock with each thrust. She controls the depth through your hips, adjusting, finding the angle. She's comfortable there. Her hands stay.`;
        }
        // VP size overlay
        if (lennaGS >= 2 && playerGS === 0) {
            vpText += `\n\nYour tight pussy grips her thick cock — she feels every inch and the precision of the feedback overwhelms her. She watches herself disappear into you and her rhythm stutters. {lenna}"The tightness is —" She pushes deeper and the sentence dies. She pushes deeper still.`;
        } else if (lennaGS === 0 && playerGS >= 2) {
            vpText += `\n\nHer modest cock slides into your swollen, slick pussy — engulfed in plush, gripping heat. She angles for maximum effect, finding pressure points with precision. The technique compensates for the size. {lenna}"Precision." She finds the spot and hits it and hits it and hits it.`;
        } else if (lennaGS >= 2 && playerGS >= 2) {
            vpText += `\n\nHer thick cock fills your swollen pussy completely — both oversized, both oversensitive. Every thrust lands devastatingly. She grips harder, grey eyes closing, composure gone. {lenna}"More." It's all she can manage. The scholarly sentences are done.`;
        }

        // === PP: both penis ===
        let ppText;
        if (lennaM >= 4 && playerM <= 1) {
            ppText = `She wraps her hand around both shafts — her ${npcGenSize} cock and your ${playerGenSize} length pressed together in her strong grip. She strokes with focused attention, watching both heads slide together.\n\nHer free hand holds you in place — casual, immovable. She controls the pace, the pressure, the angle. She watches the sensation build with a scholar's fascination — until both shafts pulse in her grip and her breath catches. She goes still. Resumes stroking. Faster. Her other hand is between her own legs, maintaining. {lenna}"The feedback loop between visual and tactile stimulation is —" She tightens her grip and the sentence dies in her throat.`;
        } else if (playerM >= 5 && lennaM <= 1) {
            ppText = `You take both cocks in hand — her ${npcGenSize} shaft and your ${playerGenSize} length — and she lets you. She places her hands behind her back without being asked, grey eyes fixed on where the two shafts press together. Her slight body is entirely at your mercy.\n\nYou stroke and she watches the motion, fascinated. Both cocks throb together and she makes a sound — just a breath. Her hips push into your grip without her permission. {lenna}"The illustrated plate in The Sapphire Suitor depicts exactly this." Her voice is unsteady. {lenna}"The artist didn't capture the heat." Her hips push again. {lenna}"Or how it throbs." She swallows hard. {lenna}"Or how it makes you want to —" She doesn't finish. She can't stop watching.`;
        } else {
            ppText = `She wraps her ink-stained hand around both shafts — her ${npcGenSize} cock and your ${playerGenSize} length pressed together. She strokes with a precision that says she's thought about this extensively. Grey eyes fixed on both heads sliding against each other.\n\nThe sensation is different from anything the texts described. Both cocks pulsing together, the feedback loop of her hand on your shaft translating into pressure on hers. Her rhythm accelerates without her deciding to. Her free hand rises to her own ${npcChest} and she touches herself without seeming to notice — the casual self-stimulation of someone who maintains between positions without thinking.\n\n{lenna}"The synchronization of arousal between matched anatomies produces a —" Her grip tightens and whatever she was going to say dissolves. She's stroking faster, grey eyes glazed, sentences gone.`;
        }
        // PP stat modifiers
        if (lennaC >= 5) {
            ppText += `\n\nShe leans forward and pushes both shafts between her massive breasts, squeezing them together around both cocks. She cranes her neck to see the heads poke through and she can't stop smiling. She's been imagining this since the restricted section. {lenna}"Again." She adjusts the pressure and strokes.`;
        }
        if (playerC >= 4) {
            ppText += `\n\nHer free hand finds your chest — cupping, tracing, pressing into the softness while both cocks throb in her other hand. She's splitting her attention between two sensations and the scholar's focus is fracturing.`;
        }
        // PP size overlay
        if (playerGS >= 2 && lennaGS >= 2) {
            ppText += `\n\nBoth thick, both throbbing — her hand barely wraps around both shafts. She strokes and the pressure is staggering. {lenna}"The volumetric displacement alone —" Her grip tightens. The sentence was never going to survive. She strokes harder, watching both thick shafts pulse together, breathless.`;
        } else if (playerGS === 0 && lennaGS === 0) {
            ppText += `\n\nBoth modest — her hand wraps easily around both, ink-stained fingers interlacing. She strokes with controlled rhythm, every micro-adjustment deliberate. Technique. She watches the sensation build with analytical attention. {lenna}"Precision over magnitude." She keeps saying this. She keeps being right.`;
        }

        const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };

        this.text = opening + '\n\n' + getSexSceneText('lenna', branches);

        gameState.npcs.lenna.trust += 1;
        saveState();
    },
    actions: [
        {
            label: 'Something activates...',
            nextScene: 'lenna_sex_transform',
        },
        {
            label: 'Continue...',
            nextScene: 'lenna_sex_closing'
        }
    ]
};

SCENES['lenna_sex_transform'] = {
    id: 'lenna_sex_transform',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('lenna', 'transform');
        markTransformationSeen('lenna');

        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');
        const npcGenSize = getBodyStatDesc('lenna', 'genitaliaSize');
        const npcChest = getBodyStatDesc('lenna', 'chest');

        // === Tease: accidental trigger ===
        const tease = `Her hand sweeps across the shelf behind her, grasping for purchase, and knocks a device to the floor. It activates on impact, a warm pulse radiating upward through her body before either of you can react.\n\n{lenna}"Oh..." She presses her hand to her chest. Her grey eyes widen. {lenna}"Something's happening." The warmth spreads, and she looks down.`;

        // === Transform: breast inflation — her fantasy ===
        const transform = `The warmth spreads through her chest immediately. Her grey eyes widen as her breasts begin to swell, pushing outward, growing past her ${npcChest} in seconds. She watches it happen with an expression that isn't surprise or fear. It's satisfaction.\n\nThey don't stop. Her breasts expand past large, past huge, past enormous — each one swelling until it rivals the size of the rest of her. The weight forces her back against the workbench, her frame buried beneath twin mountains of warm, sensitive flesh.\n\nShe runs her hands over the vast expanse. Cups what she can — a fraction. Presses her fingers into the soft, taut skin and her breath shudders.\n\n{lenna}"This is what I wanted." No trembling. No embarrassment. Her ink-stained fingers find her enormous nipples and she squeezes, and the sound she makes is low and full and has no literary reference. She looks up at you from behind her own impossible curves. {lenna}"I have a very specific list of things I want done to these."`;

        // === Genital branches (shorter — the transform is the star) ===
        const branches = {
            'pv': `She lies back, pushes her enormous breasts together with both hands, and looks at you through the canyon between them. {lenna}"Between them. Now." Not a request.\n\nYou slide your ${playerGenSize} cock into the warm valley and she adjusts the pressure instantly — testing angles, finding the friction she wants. She cranes her neck and her tongue catches the tip each time it pushes through. She can't stop smiling.\n\nEach thrust sends waves through acres of sensitive flesh. She squeezes tighter, licks again, and the dual sensation — your cock between her breasts, her tongue on the tip, her own fingers kneading — builds faster than either of you expected. She comes first, the orgasm rippling through her enormous breasts in visible waves, and the quaking flesh drags you over seconds later.`,
            'vv': `You climb atop her massive breasts, straddling the vast expanse of warm, soft flesh. She can barely see you past them — just your face above the horizon of her own impossible curves. You grind against the yielding surface and she gasps, feeling your wetness drag across sensitized skin.\n\nHer hands reach around the enormous mounds, cupping from below, pressing up against you. {lenna}"Grind harder." Her voice is ragged. {lenna}"I can feel you everywhere." She presses her thighs together and her own arousal spills down them. The sensation at this scale is total, every inch of surface registering, and the orgasm builds through sheer surface area until it hits like a wave — her entire massive chest quaking, your body riding the tremors.`,
            'vp': `She can barely reach past her breasts. Her ${npcGenSize} cock strains against the underside of the enormous mounds, and you help guide it around the massive curves to your pussy. {lenna}"I can't see what I'm doing." Breathless. {lenna}"But I can feel everything."\n\nShe pushes inside you and the moan that comes from behind her enormous breasts is deep and resonant. She thrusts blindly, guided by sensation, while her hands knead her own massive curves. Every thrust sends feedback through acres of sensitive flesh, the stimulation cascading. She comes with a cry that vibrates through her whole expanded form, and the trembling flesh against your thighs pulls you over after.`,
            'pp': `Your cocks meet in the valley between her enormous breasts and she presses the massive mounds together, creating a warm, slick tunnel for both shafts. Your ${playerGenSize} and her ${npcGenSize} cocks appear and disappear between mountains of soft flesh with each thrust.\n\n{lenna}"In the illustrated plates this always looked anatomically improbable." She squeezes tighter, watching both heads crest between her breasts. {lenna}"It's better than the plates." Whatever scholarly distance she was maintaining collapses. She can feel both of you throbbing against her through acres of flesh, every pulse amplified. The orgasm hits her in a cascade — her enormous breasts quaking around both shafts — and drags you both over together.`
        };

        // === Revert ===
        const revert = `\n\nThe effect fades gradually. Her breasts recede over several minutes — the impossible weight lifting, proportions resolving back to her ${npcChest}. She lies on the workbench, boneless, flushed, brown hair spread beneath her.\n\nShe touches her restored chest with ink-stained fingers. Traces where the enormous nipples were. The sensation ghost lingers.\n\n{lenna}"Remarkable." Soft. Satisfied. She reaches for her glasses, then doesn't put them on. Just holds them. She's not ready to be the librarian again yet.`;

        this.text = tease + '\n\n' + transform + '\n\n' + getSexSceneText('lenna', branches) + revert;
    },
    actions: [
        { label: 'Continue...', nextScene: 'lenna_sex_closing' }
    ]
};

SCENES['lenna_sex_closing'] = {
    id: 'lenna_sex_closing',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('lenna', 'base');

        const npcBody = gameState.npcs.lenna.body;
        const playerBody = gameState.player.body;
        const lennaM = npcBody.muscle;
        const lennaC = npcBody.chest;
        const lennaB = npcBody.butt;
        const lennaGS = npcBody.genitaliaSize;
        const lennaHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerB = playerBody.butt;
        const sawTransform = hasSeenTransformation('lenna');
        const isGoddess = lennaC >= 5 && lennaB >= 5 && lennaM >= 4;
        const npcGenSize = getBodyStatDesc('lenna', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        let text = '';

        // === CLIMAX (skip if transform path already delivered it) ===
        if (!sawTransform) {
            let climaxText = `The pleasure keeps building, and Lenna keeps narrating, and the narration keeps falling apart. Sentences fracture into fragments. Fragments into words. Words into sounds.\n\n{lenna}"This is — in the literature they describe the apex as —" Her hand grips your arm, ink-stained fingers digging in. Her hips move with an urgency that has nothing academic about it. {lenna}"I need your mouth on my tits and I need you to not stop." The word lands in a complete, breathless sentence. Her grey eyes widen at herself. She made a vocabulary choice. She doesn't take it back.\n\nShe needs more. She's always needed more. The player may have come once already — Lenna hasn't. She's been maintaining between positions, idly touching herself, keeping the arousal at a simmer while she cycles through her curriculum. But now the curriculum is done and what's left is just need.`;

            const branches = {
                'pv': lennaM >= 4 ? `\n\nHer strong body clamps around you — her pussy clenching hard on your ${playerGenSize} cock, her legs locked, her arms pulling you deep. She rides the orgasm with her whole frame and the strength behind it pins you in place. The sound she makes is a single, startled cry — loud, echoing, nothing composed about it.` : `\n\nHer pussy clenches around your ${playerGenSize} cock — rhythmic, involuntary, nothing controlled about it. Her hips stutter and her hands grip whatever they can find. The orgasm tears through her and the sound she makes is raw and shocked — a cry that fills the workshop, followed by silence, followed by a breathless {lenna}"Oh."`,
                'vv': `\n\nHer fingers curl inside you as she comes — instinct overriding technique, pressure building. Her hips buck against your hand and she grips your wrist, holding you there with desperate strength. The orgasm rolls through her in waves and the sound she makes is loud and helpless. She grabs your hair and holds you against her and doesn't let go until the last aftershock passes.`,
                'vp': `\n\nHer ${npcGenSize} cock pulses inside you — she thrusts through the orgasm, unable to stop, rhythm breaking apart. Her hands grip your hips and pull you down onto her, taking everything. The cry that escapes her is startled and raw — the shy librarian making a sound that has no literary precedent.`,
                'pp': `\n\nBoth cocks pulse together — hers and yours in her grip, the sensation cascading between them. She strokes through it, hand tightening, rhythm gone, just pressure and heat. The sound she makes is a single word that might be {lenna}"yes" or might be {lenna}"please" or might just be a sound no book ever taught her.`
            };

            text += climaxText + getSexSceneText('lenna', branches);
        }

        // === COMEDOWN (stat-priority) ===
        let comedown;
        if (isGoddess) {
            comedown = `\n\nShe lies in the wreckage of the most thorough encounter the workshop has ever seen. Vast, powerful, spent. Every surface has been used. Every position attempted. She's beyond the books — everything she's ever read is muscle memory and she's been improvising for the last hour.\n\nShe reaches for her glasses. Puts them on. Opens her mouth to say something — and just laughs. Genuinely, helplessly. Because no amount of reading prepared her for how that actually felt.\n\n{lenna}"I think we covered most of it." Her grey eyes find yours. That word — most. She has ideas about the rest.`;
        } else if (lennaC >= 5) {
            comedown = `\n\nYou rest against her massive chest. She looks down at you, then at her breasts, and a quiet smile spreads — satisfied, complete. She strokes your hair with ink-stained fingers.\n\n{lenna}"I'll have to write my own reference material." She means it literally. Her hand traces the swell of her own breast, slow, appreciative. She's not studying anymore. She's savoring.`;
        } else if (lennaB >= 5) {
            comedown = `\n\nShe lies on her stomach, propped on elbows. Her enormous rear dominates the bed behind her, reshaping the mattress. She glances back at it, then at you, then back at it. You can see the wheels turning.\n\n{lenna}"I have additional hypotheses about posterior-dominant configurations." She's already planning the next session. She reaches back, touches the curve, and a small satisfied sound escapes her.`;
        } else if (lennaM >= 4) {
            comedown = `\n\nShe's still holding you without realizing it. When you shift, she tightens reflexively — not possessive. Not done. She stretches, watches her own arms, the muscle flexing and releasing.\n\n{lenna}"I didn't realize I was holding you that tightly." She doesn't let go. Her ink-stained fingers trace a pattern on your skin. She's cataloguing the sensation of strength. Of having held someone and not wanting to release them.`;
        } else if (lennaC <= 1 && lennaM <= 1) {
            comedown = `\n\nSmall, flushed, glasses crooked. She curls against you with ink-stained fingers tracing patterns on your skin. She looks like the shy librarian again — slight body tucked into the crook of your arm, brown hair mussed, grey eyes half-closed.\n\nShe is absolutely already planning the next session.\n\n{lenna}"That was adequate." The word is so absurdly insufficient for what just happened that she can't maintain the deadpan. A smile cracks through. She hides her face against your shoulder. She's shy again. She's not sorry.`;
        } else {
            comedown = `\n\nShe lies beside you, brown hair across the pillow. Quiet. Her hand reaches for an imaginary pen, catches itself, and she laughs softly — the sound of someone who's spent years writing about experiences and just had one that defied the medium.\n\nShe settles against you. Ink-stained fingers find yours and hold on. She already has new ideas. She doesn't share them yet.`;
        }
        text += comedown;

        // === Transform callback ===
        if (sawTransform) {
            text += `\n\nShe touches her restored chest with ink-stained fingers, tracing where the enormous proportions were. The ghost of that sensation lingers. {lenna}"The amplification at that scale exceeded every reference I've consulted." A pause. {lenna}"I'll need to make some notes about this." She means it.`;
        }

        // === Player standout modifiers ===
        if (playerC >= 4) {
            text += `\n\nHer hand rests on your chest. Thumb traces slow circles. She has thoughts about what she wants to do with these next time — you can see it in her grey eyes, cataloguing, planning. She doesn't share them yet. Her hand stays.`;
        }
        if (playerB >= 4) {
            text += `\n\nHer hand finds your rear and stays. She's not cataloguing anymore. She just likes it there. Her ink-stained fingers trace the curve with idle appreciation.`;
        }

        // === Exit line ===
        text += `\n\nShe reaches for her glasses. Settles them on her nose. Pushes her brown hair from her face. The scholarly composure reassembles itself — thinner now, warmer.\n\n{lenna}"I'll need to consult some additional references before next time." She meets your eyes and the blush returns, but the gaze is steady. {lenna}"I have a longer list."`;

        this.text = text;
    },
    actions: [
        { label: 'Return to workshop', nextScene: 'workshop_main' }
    ]
};

