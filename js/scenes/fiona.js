// ============================================
// FIONA SCENES
// Extracted from scenes.js for modularity
// ============================================

// ==========================================
// FIONA SCENES
// ==========================================

SCENES['fiona_greeting'] = {
    id: 'fiona_greeting',
    image: '',
    imagePrompt: null,
    speaker: 'Fiona',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePathSimple('fiona', 'wary');

        // Check if already interacted this phase
        if (hasInteractedThisPhase('fiona')) {
            this.text = getAlreadyInteractedMessage('fiona');
            this.actions = [{ label: 'Leave', nextScene: 'location_square' }];
            return;
        }

        // Check if this is the first meeting (introduction)
        const intro = getNpcIntroduction('fiona');
        if (intro) {
            this.text = intro.text;
            this.speaker = intro.speaker;
            markNpcIntroCompleted('fiona');
            updateNpcLastSeenPlayer('fiona');
            this.actions = [
                {
                    label: 'Continue',
                    nextScene: 'location_square',
                    effects: [
                        { type: 'addTrust', npc: 'fiona', amount: 1 },
                        { type: 'recordNpcInteraction', npc: 'fiona' }
                    ]
                }
            ];
            return;
        }

        // Check for genital proposal, goddess reveal, or archetype celebration
        const fionaArchEvent = checkGreetingArchetypeEvent('fiona');
        if (fionaArchEvent && (fionaArchEvent.type === 'proposal' || fionaArchEvent.type === 'goddess_reveal' || fionaArchEvent.type === 'celebration')) {
            SceneManager.playScene(fionaArchEvent.sceneId);
            return;
        }

        const reaction = getNpcReactionToChanges('fiona');
        if (reaction) {
            this.text = `Fiona stares at you, eyes wide. "${reaction}"\n\n"Um... h-hey..."`;
        } else {
            this.text = "Fiona looks up from her spot near the fountain, tense like she might bolt at any moment. \"Oh, h-hey... didn't expect to see you here.\"";
        }

        // NOTE: Desire reveals now happen in chat scenes, not greetings

        updateNpcLastSeenPlayer('fiona');

        // Build normal actions
        this.actions = [
            {
                label: 'How are you doing?',
                nextScene: 'fiona_chat',
                condition: () => !hasInteractedThisPhase('fiona'),
                effects: [
                    { type: 'addTrust', npc: 'fiona', amount: 1 },
                    { type: 'recordNpcInteraction', npc: 'fiona' }
                ]
            },
            {
                label: 'Need anything?',
                nextScene: 'fiona_help_offer',
                condition: () => !hasInteractedThisPhase('fiona'),
                effects: [{ type: 'recordNpcInteraction', npc: 'fiona' }]
            },
            {
                label: 'Flirt',
                nextScene: 'fiona_flirt_1',
                condition: () => !hasInteractedThisPhase('fiona') && gameState.npcs.fiona.trust >= 4,
                effects: [{ type: 'recordNpcInteraction', npc: 'fiona' }]
            },
            {
                label: 'Intimate...',
                nextScene: 'fiona_sex_intro',
                condition: () => !hasInteractedThisPhase('fiona') && (gameState.npcs.fiona.trust >= 10 || gameState.npcs.fiona.archetypeIntimateReady),
                effects: [{ type: 'recordNpcInteraction', npc: 'fiona' }, { type: 'setLocation', location: 'workshop' }]
            },
            { label: 'Leave', nextScene: 'location_square' }
        ];
    },
    actions: []
};

SCENES['fiona_help_offer'] = {
    id: 'fiona_help_offer',
    image: '',
    imagePrompt: null,
    speaker: 'Fiona',
    text: "Fiona looks at you suspiciously. \"Need anything? What do you mean?\" She crosses her arms. \"I'm not a charity case.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('fiona', 'defensive');
    },
    actions: [
        { label: "I didn't mean it like that", nextScene: 'fiona_help_clarify' },
        { label: 'Never mind', nextScene: 'location_square' }
    ]
};

SCENES['fiona_help_clarify'] = {
    id: 'fiona_help_clarify',
    image: '',
    imagePrompt: null,
    speaker: 'Fiona',
    text: "Fiona relaxes slightly. \"Oh. Sorry. I just... people don't usually offer help without wanting something.\" She looks away. \"Thanks, I guess.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('fiona', 'softening');
        gameState.npcs.fiona.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'fiona_greeting' }
    ]
};

SCENES['fiona_flirt_1'] = {
    id: 'fiona_flirt_1',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "{player}\"You know, you have really pretty eyes.\" You give her a gentle smile.\n\nFiona's face turns bright red. {fiona}\"W-what? Me? No, I don't, I'm just...\" She trips over her own feet. {fiona}\"I mean, th-thanks? Nobody's ever... um...\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('fiona', 'flustered');
        gameState.npcs.fiona.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'fiona_greeting' }
    ]
};


SCENES['fiona_workshop_arrival'] = {
    id: 'fiona_workshop_arrival',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        // Skip intro on repeat visits — go straight to device selection
        if (gameState.npcs.fiona.firstDesireFulfilledDay !== null) {
            SceneManager.playScene('fiona_transformation_ready');
            return 'redirect';
        }
        this.image = getNpcImagePathSimple('fiona', 'nervous');
        this.text = "A tentative knock at your door. Fiona slips in, looking around nervously.\n\n{fiona}\"I wasn't sure I'd actually come.\" She hugs herself. {fiona}\"But I couldn't stop thinking about what you said. Is it... is it really possible?\"";
    },
    actions: [
        { label: 'Yes. Let me show you.', nextScene: 'fiona_transformation_ready' },
        { label: 'Take your time, look around first', nextScene: 'fiona_workshop_tour' }
    ]
};

SCENES['fiona_workshop_tour'] = {
    id: 'fiona_workshop_tour',
    image: '',
    imagePrompt: null,
    speaker: 'Fiona',
    text: "Fiona examines everything with wide eyes.\n\n\"Your uncle really made all this?\" She touches a device gently. \"People said he was crazy. But this is... amazing.\" She looks at you with new respect. \"You understand all this stuff?\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('fiona', 'amazed');
        gameState.npcs.fiona.trust += 1;
        saveState();
    },
    actions: [
        { label: "I'm still learning", nextScene: 'fiona_transformation_ready' }
    ]
};

SCENES['fiona_transformation_ready'] = {
    id: 'fiona_transformation_ready',
    image: '',
    imagePrompt: null,
    speaker: 'Fiona',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('fiona');
        gameState.currentTransformationTarget = 'fiona';
        saveState();

        const npc = gameState.npcs.fiona;
        const desire = npc?.currentDesire;
        const label = desire?.label?.toLowerCase() || 'a change';
        const thresholds = getNpcTrustThresholds('fiona');
        const horny = (npc.trust >= thresholds.intimate) || npc.hiddenArchetype === 'goddess';

        if (horny) {
            this.text = `Fiona's standing close — closer than usual. Her hands are trembling but she doesn't step back.\n\n{fiona}"I want ${label}." Her voice is barely above a whisper, but her eyes are wide and fixed on yours. {fiona}"I... I've been thinking about how it feels. A lot."`;
        } else {
            this.text = `Fiona takes a shaky breath and squares her shoulders.\n\n{fiona}"${label[0].toUpperCase() + label.slice(1)}." A small nod, like she's convincing herself. {fiona}"I'm ready."`;
        }
    },
    actions: [
        { label: 'Select a device', nextScene: 'device_selection' },
        { label: 'Changed your mind?', nextScene: 'workshop_main' }
    ]
};

SCENES['fiona_transform_height'] = {
    id: 'fiona_transform_height',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "The platform glows golden beneath Fiona's feet. She gasps as warmth flows through her body.\n\n{fiona}\"I feel... something's happening!\" Her voice rises with wonder as she begins to grow. {fiona}\"Oh! OH!\"",
    onEnter: function() {
        this.image = 'images/transformations/transform_height_4.webp';
        gameState.npcs.fiona.body.height = 4;
        gameState.npcs.fiona.trust += 5;
        gameState.flags.fiona_height_transformation_complete = true;
        recordNpcBodyChange('fiona');
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'fiona_transform_height_success' }
    ]
};

SCENES['fiona_transform_height_success'] = {
    id: 'fiona_transform_height_success',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "Fiona watches in disbelief as she grows taller, her clothes finally starting to fit properly instead of drowning her.\n\n{fiona}\"I'm... I'm tall. I'm actually TALL!\" She stretches her arms up, laughing with pure joy. {fiona}\"I can reach things! People will have to look UP at me!\"\n\nShe turns to you with tears streaming down her face. {fiona}\"Thank you. You have no idea what this means to me.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('fiona', 'overjoyed');
    },
    actions: [
        { label: 'Continue', nextScene: 'fiona_transform_aftermath' }
    ]
};

SCENES['fiona_transform_aftermath'] = {
    id: 'fiona_transform_aftermath',
    image: '',
    imagePrompt: null,
    speaker: 'Fiona',
    text: `Fiona keeps looking at her hands, her legs, running her palms down her newly lengthened limbs in wonder.

"I feel like a different person." Her voice cracks. "No, not different. Like MYSELF. For the first time."

She stretches up on her toes, reveling in how much further it takes her now. "I can look people in the eye! I'm not a child anymore - I'm a WOMAN!"

She throws her arms around you, and for the first time you don't have to bend down to meet her. Her body presses against yours at a whole new angle, her chin resting on your shoulder instead of against your chest. "I'll never forget this. Never."

She holds you tight, trembling with emotion. "You've given me the life I always dreamed of."`,
    onEnter: function() {
        this.image = getNpcImagePathSimple('fiona', 'grateful');
        gameState.npcs.fiona.trust += 3;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

SCENES['fiona_desire_chest_reveal'] = {
    id: 'fiona_desire_chest_reveal',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "Fiona fidgets nervously. {fiona}\"There's... um... one more thing. It's embarrassing but...\" She mumbles something inaudible.\n\n{player}\"What was that?\"\n\nHer face is crimson. {fiona}\"I said... could you make my... my chest... bigger? Not huge! Just... enough to feel like a woman?\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('fiona', 'embarrassed');
        gameState.flags.fiona_desire_chest_revealed = true;
        gameState.npcs.fiona.desiresRevealed[2] = true;
        saveState();
    },
    actions: [
        { label: 'Of course. No need to be embarrassed.', nextScene: 'fiona_transform_chest_ready' },
        { label: 'Are you sure? Take your time.', nextScene: 'fiona_transform_chest_delay' },
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

SCENES['fiona_transform_chest_delay'] = {
    id: 'fiona_transform_chest_delay',
    image: '',
    imagePrompt: null,
    speaker: 'Fiona',
    text: "Fiona nods, looking relieved. \"Y-yeah, maybe I should think about it more. It's just... now that I'm taller, I notice how... flat I still am.\" She sighs. \"But you're right. No rush.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('fiona', 'thoughtful');
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

SCENES['fiona_transform_chest_ready'] = {
    id: 'fiona_transform_chest_ready',
    image: '',
    imagePrompt: null,
    speaker: 'Fiona',
    text: "Fiona's blush deepens but she nods. \"O-okay. If you're sure it's not weird.\" She positions herself at the Chest Shaper. \"Just... be gentle? I don't want anything crazy. Just... normal.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('fiona', 'nervous');
        gameState.currentTransformationTarget = 'fiona';
        saveState();
    },
    actions: [
        { label: 'Begin transformation', nextScene: 'fiona_transform_chest' }
    ]
};

SCENES['fiona_transform_chest'] = {
    id: 'fiona_transform_chest',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "The device hums softly. Fiona gasps as warmth spreads through her chest.\n\n{fiona}\"Oh!\" She watches with wide eyes as her modest breasts begin to grow. {fiona}\"It's... it's actually working!\"",
    onEnter: function() {
        this.image = 'images/transformations/transform_chest_3.webp';
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.fiona_chest_transformation_complete) {
            gameState.npcs.fiona.body.chest = 3;
            gameState.npcs.fiona.trust += 3;
            gameState.flags.fiona_chest_transformation_complete = true;
            recordNpcBodyChange('fiona');
            saveState();
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'fiona_transform_chest_success' }
    ]
};

SCENES['fiona_transform_chest_success'] = {
    id: 'fiona_transform_chest_success',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "Fiona looks down at herself in wonder.\n\n{fiona}\"They're... perfect.\" Her voice is thick with emotion. {fiona}\"Not too big, not too small. Just... right.\" She looks up at you, crying again. {fiona}\"I look like a woman now. A real woman. Thank you. Thank you so much.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('fiona', 'happy_crying');
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};


// ============================================
// FIONA SEX SCENES
// ============================================

SCENES['fiona_sex_intro'] = {
    id: 'fiona_sex_intro',
    image: '',
    speaker: 'Fiona',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('fiona', 'base');
        markSexUnlocked('fiona');

        const fionaBody = gameState.npcs.fiona.body;
        const playerBody = gameState.player.body;
        const fionaM = fionaBody.muscle;
        const fionaC = fionaBody.chest;
        const fionaB = fionaBody.butt;
        const fionaGS = fionaBody.genitaliaSize;
        const fionaHasVulva = fionaBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerM = playerBody.muscle;
        const playerB = playerBody.butt;
        const playerGS = playerBody.genitaliaSize;
        const playerInSkirt = playerB >= 5 || (playerBody.genitalia === 1 && playerGS >= 3);
        const npcInSkirt = fionaB >= 5 || (!fionaHasVulva && fionaGS >= 3);
        const npcChest = getBodyStatDesc('fiona', 'chest');
        const npcButt = getBodyStatDesc('fiona', 'butt');

        // Part 1: Fiona's body description (branch on muscle → chest)
        let part1;
        if (fionaM <= 1) {
            if (fionaC <= 1) {
                part1 = `Fiona tugs her patched shirt over her head in one sharp motion — like ripping off a bandage. Underneath: nothing you didn't expect. Slim shoulders, flat chest, narrow everything. Wiry and tanned, every tendon visible under her skin. She stands there, bare from the waist up, chin lifted.\n\nShe's not embarrassed. This is the body she knows. Her hazel eyes hold yours, steady, daring you to look away. {fiona}"This is me," she says. Not an apology. A fact. Her jaw is set but her pulse hammers visibly at her throat. {fiona}"I know what I look like. I've always looked like this."`;
            } else {
                part1 = `Fiona tugs her patched shirt over her head and the contrast stops you — slim arms, narrow waist, and then her ${npcChest} spilling free, completely out of proportion with her small frame. She catches you staring and her breath hitches.\n\n{fiona}"Yeah." She looks down at herself, a flicker of something crossing her face — surprise, still. Like she hasn't gotten used to it. {fiona}"I wanted to know what these felt like." She cups herself, testing the weight. {fiona}"They're... a lot. On me." A half-laugh that shakes. {fiona}"I'm glad I tried."`;
            }
        } else if (fionaM <= 3) {
            part1 = `Fiona pulls her shirt off and rolls her shoulders. She's filled out — toned arms, defined stomach, the lean build of someone who chose to be stronger. Her ${npcChest} rise and fall with measured breaths. She flexes one arm, looks at the muscle there, and something complicated crosses her face.\n\n{fiona}"I did this," she says quietly. Not bragging. Processing. {fiona}"I asked you to make me stronger and you did and now I'm..." She runs a hand down her own arm, feeling the definition. {fiona}"I like it. I didn't know if I would, but I do."`;
        } else {
            part1 = `Fiona pulls her shirt off and her body fills the space. Thick arms, broad shoulders, visible abs — real muscle, dense and functional. Her ${npcChest} sit on a powerful frame. She looks down at herself and her hands open and close, testing.\n\n{fiona}"I lifted a supply crate yesterday. One arm." She says it to herself as much as to you. Her voice is quiet, stunned. She flexes and watches the muscle bunch. {fiona}"I wanted to know what strong felt like. Now I know." She meets your eyes. {fiona}"It feels like this."`;
        }
        if (fionaB >= 3) {
            if (npcInSkirt) {
                part1 += ` Her ${npcButt} has ridden her skirt up past the point of usefulness — the fabric bunched at her waist, everything below it bare.`;
            } else {
                part1 += ` Her ${npcButt} strains against her work pants — she shifts her weight and the fabric pulls tight.`;
            }
        }
        if (fionaC >= 4 && fionaM > 1) {
            part1 += ` Her ${npcChest} are impossible to ignore on her frame — heavy, full, moving when she breathes.`;
        }
        if (fionaM >= 4 && fionaC >= 4) {
            part1 += ` Muscle and curves together — she's built like someone who chose everything about this body, and chose a lot.`;
        }

        // Part 2: Getting close (branch on player muscle vs Fiona muscle)
        let part2;
        if (playerM >= 5 && fionaM <= 1) {
            part2 = `You close the distance and she has to crane her neck. Your frame dwarfs her entirely — when your hands find her waist, your fingers nearly meet behind her back. She doesn't flinch. Her eyes travel up your body, taking in the sheer size of you, and her grip tightens on your arms.\n\n{fiona}"Good." Her voice is low, rough. {fiona}"I want to feel how strong you are." She pulls herself against you, pressing her slight body into yours. Her nails dig into your bicep — not gently. {fiona}"Don't hold back because I'm small. I can take it."`;
        } else if (playerM >= 5) {
            part2 = `You close the distance and grip her shoulder. Even with her build, you're massive compared to her. She feels the strength in your hand and inhales sharply — not fear, hunger.\n\n{fiona}"Okay." Her eyes darken. {fiona}"Show me." She leans into your grip, giving you her weight.`;
        } else if (playerM <= 1 && fionaM <= 1) {
            if (playerC >= 4 && playerB >= 4) {
                part2 = `You step close and she pulls you in — both slight, both light, your bodies meeting easily until she runs into your chest. Her hands slide lower and find your ass. She stops. Looks up. Down. Back up.\n\nHer fingers dig in — chest, then ass, then chest again. She can't decide where to hold on. {fiona}"You're tiny like me but you've got..." She grabs a handful of your ass, then reaches up to press her palm against your chest. {fiona}"How." Not a question. Her jaw works. {fiona}"I can't stop touching you."`;
            } else if (playerC >= 4) {
                part2 = `You step close and she pulls you in — both slight, both light, fitting together until your chest gets in the way. She stares at the collision. Her hand comes up slowly, presses against you.\n\n{fiona}"You're small like me but these are..." She doesn't finish. Just buries her face between them, breathing hard against your skin. Her fingers dig into your sides. When she comes up for air her eyes are glazed. {fiona}"I wanted to do that the second I saw them."`;
            } else if (playerB >= 4) {
                part2 = `You step close and she pulls you in — both slight, both light. Her hands slide down your back and find your ass, and her fingers clench. Hard.\n\n{fiona}"How is this attached to you." She grabs with both hands, pulling you flush against her by the grip on your rear. Her jaw is tight, her breathing rough. {fiona}"You're tiny everywhere else and then there's THIS." She squeezes, not letting go.`;
            } else {
                part2 = `You step close and she pulls you in. Both slight, both light — your bodies press flush, every point of contact sharp and vivid. Zero gap. Her arms wrap around you tight, her face against your neck, breathing you in.\n\n{fiona}"We fit." Her voice is muffled against your skin. She pulls back to look at you — your matched frames, your similar builds. Something raw in her expression. {fiona}"We fit and I've been wanting this."`;
            }
        } else if (playerM <= 1 && fionaM >= 2) {
            part2 = `You step close and she wraps her arms around you — with her build, the embrace is enveloping. Your lighter frame folds against her warmth. She pulls you tight, chin resting on your head.\n\n{fiona}"Come here." Quiet. Possessive. Her arms tighten. {fiona}"I've got you."`;
        } else {
            part2 = `You pull her close and she comes willingly, pressing against you. Her hands grip your shirt, pulling you tighter, her face finding your neck. She breathes you in — one long, shuddering inhale.\n\n{fiona}"I've been thinking about this." She pulls back enough to meet your eyes. Intense. Unwavering. {fiona}"All day. I couldn't stop." Her grip tightens on your shirt. {fiona}"Don't make me wait."`;
        }
        const bothPetite = playerM <= 1 && fionaM <= 1;
        if (playerC >= 4 && !bothPetite) {
            part2 += ` Her eyes drop to your chest. She stares. Then her hand comes up and presses flat against you, feeling the shape. She doesn't comment — just keeps her hand there, breathing harder.`;
        }
        if (playerB >= 4 && !playerInSkirt && !bothPetite) {
            part2 += ` Her hand slides down to your ass and grips. Hard. She doesn't say a word — just holds on like she's claiming it.`;
        } else if (playerB <= 1 && fionaM <= 1) {
            part2 += ` Her hand slides to your ass and grabs the whole thing in one palm. A sound escapes her — almost a laugh. {fiona}"Tiny." She squeezes. {fiona}"All of you is tiny." She says it like it's something precious.`;
        }
        if (playerInSkirt && playerB >= 5) {
            part2 += ` Your skirt has ridden up — your massive ass bare, fabric useless. She stares, jaw working, and grabs with both hands.`;
        } else if (playerInSkirt) {
            part2 += ` Your skirt isn't hiding anything — your cock hangs past the hem. She glances down and her breath catches. Her eyes stay there.`;
        }
        if (npcInSkirt && fionaHasVulva) {
            part2 += ` Her skirt is soaked through — the fabric clinging, dark with wetness she couldn't hide if she tried.`;
        }
        if (fionaM >= 5) {
            part2 += ` Her muscular arms tremble where they hold you — the strength in them barely restrained.`;
        }
        if (fionaC >= 5) {
            part2 += ` Her massive chest presses between you, impossible to ignore, her breathing pushing them against you with every inhale.`;
        } else if (fionaC >= 3 && !bothPetite) {
            part2 += ` Her ${npcChest} press between you as she pulls closer.`;
        }

        // Part 3: Foreplay (branch on Fiona's build)
        let part3;
        if (fionaM <= 1) {
            part3 = `She strips the rest quickly — no ceremony, no performance. Bare, slim, tanned, every rib faintly visible. She's not self-conscious about it. This is her body and she knows it well.\n\nShe takes your hands and puts them on her. Flat stomach, narrow hips, the ridge of her collarbone. Guiding you across the geography of someone who's always been small. {fiona}"No padding." She watches your hands move across her skin. {fiona}"You touch me anywhere and I feel every inch of it." She arches into your palm, pressing closer. She knows exactly how her body responds — she's lived in it her whole life. {fiona}"Everything's right at the surface. Always has been."`;
        } else if (fionaM <= 3) {
            part3 = `She strips and stands there — toned, defined, her skin warm under the workshop light. She runs her own hand down her arm, feeling the muscle she chose, then takes your hand and places it on her stomach.\n\n{fiona}"Feel." She flexes under your palm. Then she guides your hand lower, across her hip, and her composure cracks for a second — a sharp inhale, eyes squeezing shut. {fiona}"I'm stronger than I was. Everything feels... more." She opens her eyes. {fiona}"Touch me. I want to know what this body does."`;
        } else {
            part3 = `She strips and her body fills the space between you — dense muscle, thick limbs, power in every line. She flexes one arm and watches it, still processing what she's become. Then she grabs your hand and drags it across her body — bicep, chest, abs, hip.\n\n{fiona}"I chose all of this." Her voice is rough. {fiona}"Every bit." She puts your hand on her thigh and the muscle under your palm is solid. {fiona}"I've never felt this strong. I didn't know it would feel like this during..." She trails off, jaw tight. {fiona}"Touch me harder. I can take more now."`;
        }

        const opening = part1 + '\n\n' + part2 + '\n\n' + part3;

        // PV: player penis + Fiona vulva
        // Phase 1: Oral — Fiona sucks player's cock
        let pvOral;
        if (playerM >= 5 && fionaM <= 1) {
            pvOral = `You grab the back of her head and guide her down. She drops to her knees without resistance — hands bracing on your thighs, face level with your cock. She stares at it for a beat, breathing hard. Then she opens her mouth and takes you in.\n\nNo technique. All hunger. She bobs her head in uneven strokes, lips tight, tongue working clumsily against the underside. She gags once, pulls off, wipes her mouth with the back of her hand — and goes right back. Her thin fingers wrap around the base while she sucks the head, learning what makes your breath hitch. When she finds it, she locks on with desperate focus. A raw sound escapes her, muffled around you. She pulls off gasping. {fiona}"Holy shit." Her eyes are glazed. {fiona}"I didn't think I'd like doing that." She licks her lips. {fiona}"I really like doing that."`;
        } else if (fionaM >= 4 && playerM <= 1) {
            pvOral = `She pushes you against the workbench and drops to her knees — strong hands pinning your hips to the wood. She takes your cock in her mouth and her grip tightens every time you try to move. She's in control.\n\nHer technique is rough, inexperienced — too much teeth at first, then she adjusts, figures out the angle. What she lacks in skill she makes up in relentless effort, her head working steadily, her strong jaw accommodating you. She pulls off with a wet sound and stares up at you, breathing hard. {fiona}"Stay still." She wipes her chin with the back of her hand. {fiona}"I'm figuring this out." She takes you back in deeper this time, a low groan vibrating around you.`;
        } else {
            pvOral = `She drops to her knees in front of you, hazel eyes locked on yours, and wraps her hand around your cock. She studies it — the weight, the heat — then leans in and takes you in her mouth. She doesn't know what she's doing. The tentative licks, the way she pulls off to check your face, the awkward shift of her jaw — first time.\n\nBut she's ravenous for it. She finds a rhythm — sloppy, eager, her hand working what her mouth can't reach. When you groan she makes a sound around you, muffled and surprised, like she didn't expect to like it this much. She comes up gasping, mouth wet, a string of spit connecting her lips to your cock. {fiona}"Holy shit." She stares at you, then back down. {fiona}"I want to keep going." She doesn't wait for permission.`;
        }
        if (playerGS >= 2) {
            pvOral += ` She pulls back, jaw aching, staring at your thick cock. {fiona}"You're..." She works her jaw. {fiona}"A lot." She takes a breath and goes back in, stretching her mouth wider, determined to take as much as she can.`;
        }

        // Phase 2: Penetration — branches on power dynamic (existing text kept)
        let pvPen;
        if (playerM >= 5 && fionaM <= 1) {
            pvPen = `You lift her with one arm and press her against the wall. She weighs nothing — her slim body suspended, legs wrapping around your waist, hands gripping your shoulders hard enough to leave marks. You push into her pussy and her whole body goes rigid.\n\nHer nails dig in. Her jaw clenches. Then a sound tears out of her — raw, unguarded, and her eyes fly open. {fiona}"Don't stop." Barely a whisper. She locks her ankles behind you and grinds against each thrust, using every bit of leverage her small body can find. Her face buries in your neck, teeth pressing into your shoulder, her whole body clenching tighter around you with every thrust. She's shaking, close, so close. {fiona}"I can feel that everywhere." She digs her nails deeper into your shoulders. {fiona}"Don't you dare stop."`;
        } else if (fionaM >= 4 && playerM <= 1) {
            pvPen = `She pushes you back onto the workbench and climbs over you. Her strong hands pin your wrists — not cruel, but immovable. She lowers herself onto your cock and her eyes squeeze shut, jaw clenching at the sensation.\n\n{fiona}"Let me." She rolls her hips, powerful thighs controlling the depth. She builds her own rhythm, using you, her grip tightening on your wrists every time she drops deeper. Her fingers crush your wrists harder with each thrust, jaw locked, eyes screwing shut. {fiona}"I'm —" She can't finish. She grinds down harder, her whole body shaking, right at the edge.`;
        } else {
            pvPen = `She sits on the edge of the workbench and pulls you between her legs. Her thighs wrap around you, heels hooking your back, pulling you close. You push into her pussy and she inhales sharply — held breath, white knuckles on the edge of the bench.\n\nThen she exhales and her hips start moving. Finding you. Learning the angle. Her hands come off the bench and grip your arms instead, nails pressing crescents into your skin. She meets you thrust for thrust, building faster, eyes locked on yours with an intensity that doesn't waver. Her jaw clenches, her thighs tighten around you, every muscle pulling taut. {fiona}"I'm close." The words come out raw, shocked. {fiona}"I'm so close, don't stop —" Her nails dig deeper, her back arching, right at the edge.`;
        }
        // PV stat modifiers during penetration
        if (fionaC >= 4) {
            pvPen += ` Her ${npcChest} press against your chest with every thrust, the weight shifting, spilling to the sides when she arches back. She looks down at them and her breath catches. {fiona}"I can feel them moving." She grabs one, steadying it, then lets go — watching it bounce. {fiona}"That's... distracting. In a good way."`;
        }
        if (fionaB >= 5) {
            pvPen += ` Her ${npcButt} cushions every impact — workbench or wall, the padding absorbs what bone used to take. She shifts her weight and something registers. {fiona}"I used to bruise sitting on this thing." She presses back against the surface, testing. {fiona}"Not anymore."`;
        }
        if (fionaM >= 5 && !(fionaM >= 4 && playerM <= 1)) {
            pvPen += ` Her thighs clamp around you and you feel the strength — real, functional, enough to hold you in place. She notices you noticing. {fiona}"I could pin you down right now." She says it matter-of-factly. {fiona}"I won't. But I could." Her grip loosens slightly. {fiona}"...unless you want me to."`;
        }

        let pvText = pvOral + '\n\n' + pvPen;

        // PV size overlay (mid-act)
        if (playerGS >= 2 && fionaGS === 0) {
            if (fionaM <= 1) {
                pvText += `\n\nHer tiny body fights your cock the whole way in. The first inch makes her grip your arms — hard, nails digging in, jaw clenched. The second inch makes her exhale through her teeth, slow and controlled, her whole body taut. By the third she's breathing in shallow pulls, eyes squeezed shut, her small frame visibly stretched around you. She doesn't tell you to stop. She adjusts, millimeter by millimeter, until her body gives way and you sink the rest in.\n\n{fiona}"That's..." She looks down at where your bodies meet, then back at you. {fiona}"A lot. For someone my size." Her voice shakes. {fiona}"I can feel every inch. All of them." A beat, hazel eyes fierce. {fiona}"Don't stop."`;
            } else {
                pvText += `\n\nEvery thrust fills her tight pussy completely — your thick cock stretching her, her walls gripping you with every movement. She sucks air through her teeth. {fiona}"You're big and I'm tight and I can feel every single bit of that." A pause, jaw clenched. {fiona}"I like it."`;
            }
        } else if (playerGS === 0 && fionaGS >= 2) {
            pvText += `\n\nShe's slick and swollen around you — her pussy gripping your modest cock in plush, wet heat, thick folds clenching with every thrust. {fiona}"You fit inside me perfectly." She says it quietly, like she's surprised. {fiona}"I can feel you. Every movement."`;
        } else if (playerGS === 0 && fionaGS === 0) {
            pvText += `\n\nBoth small, both tight — she's a snug fit around you, every movement precise and vivid. {fiona}"I feel everything." She meets your eyes. {fiona}"Every bit."`;
        }

        // VV: both vulva
        // Phase 1: Oral — Fiona goes down on player first, then mutual
        let vvOral;
        if (playerM >= 5 && fionaM <= 1) {
            vvOral = `You push her to her knees and she goes willingly, hands bracing on your powerful thighs. She presses her mouth between your legs — broad, hungry licks, no finesse. She grabs your hips and pulls you against her face, a muffled sound vibrating against you.\n\nShe comes up gasping. {fiona}"Your turn." She lies back and spreads her legs — slim, tanned, offering. You drop between her thighs and she arches off the floor the moment your tongue touches her.`;
        } else if (fionaM >= 4 && playerM <= 1) {
            vvOral = `She pushes you down onto the workbench and drops between your legs. Her strong hands hold your thighs apart while she eats you out — rough, eager, her tongue working broad strokes until she finds your clit and bears down.\n\nShe pulls back, breathing hard, chin wet. {fiona}"Now you." She climbs onto the bench, straddles your face, and lowers herself down. Her thighs press against your ears, strong, warm, as you taste her.`;
        } else {
            vvOral = `She sinks between your legs and presses her mouth to you. Searching, hungry — broad tongue tasting everything, pausing to read your reactions. When she finds your clit and you gasp, she locks on with desperate focus, pulling you closer by the hips. A sound vibrates out of her — surprise and hunger mixed.\n\nShe comes up with her mouth wet, eyes glazed. {fiona}"Holy shit." She wipes her chin. {fiona}"I want you to do that to me." She lies back, pulls you down between her legs. The moment your tongue touches her she jolts — a full-body flinch, then her fingers thread into your hair and hold you there.`;
        }
        if (playerGS >= 2) {
            vvOral += ` Your swollen folds are thick under her tongue — she traces every ridge, every crease, licking along your full lips with wide-eyed intensity. {fiona}"You're so swollen." Breathless. {fiona}"I can feel all of it."`;
        }
        if (fionaGS >= 2) {
            vvOral += ` When you return the favor, her pussy is plush and swollen — thick folds glistening, everything puffy and sensitive. She bucks the moment you touch her. {fiona}"Careful —" She sucks air through her teeth. {fiona}"Everything's so much right now."`;
        }

        // Phase 2: Fingering/tribbing — branches on power dynamic + gs-awareness
        let vvMain;
        if (playerM >= 5 && fionaM <= 1) {
            vvMain = `You lift her onto the workbench and push her thighs apart with your powerful hands. She opens for you — no hesitation, eyes dark with want. Your fingers find her wet, and the moment you push inside her pussy she grips the edge of the bench so hard her knuckles go white.\n\nShe's still and taut while you work her, her slim body trembling under your hands — then her own fingers reach down to find your pussy from below, working between your thighs with desperate precision even while pinned. Her back arches off the wood, jaw clenching, every muscle in her slight body straining. {fiona}"I can't move." She stares up at you, gasping. {fiona}"I can't move and I don't want to." Her fingers drive harder into you, shaking.`;
        } else if (fionaM >= 4 && playerM <= 1) {
            vvMain = `She lifts you onto the workbench — one smooth motion, no strain. Her strong fingers find your pussy with precision, thick capable digits that press exactly right. {fiona}"Let me." Her other hand works herself without looking, efficient, practiced.\n\nShe builds you with patient, relentless strokes — reading your face, adjusting pressure, finding exactly what makes you shake. Her own breath goes ragged, her free hand faltering on herself as the sensation mounts. She looks at the hand inside you and her fingers curl harder. {fiona}"Strong hands." Barely audible. {fiona}"Good for more than just the workshop." Her jaw clenches. She's close. You're closer.`;
        } else {
            vvMain = `Her fingers trace up your inner thighs and find your pussy — careful at first, learning the shape of you, hazel eyes intent on your face. She watches every reaction, cataloguing, adjusting. When her fingers push inside you and your breath catches, something fierce crosses her expression.\n\nYou reach between her legs in return and the moment your fingers touch her pussy she jolts — a full-body flinch, then she presses into your hand. You build a rhythm together, foreheads close, breath mixing. Her face presses against your shoulder, teeth grazing your skin, the sounds vibrating out of her getting louder. {fiona}"I didn't know it could feel like —" She can't finish. Her fingers dig into you harder. {fiona}"Don't stop." She's shaking against you, close, so close.`;
        }
        // VV gs-awareness during fingering
        if (playerGS >= 2 && fionaGS >= 2) {
            vvMain += ` Both swollen, both slick — fingers slide through plush folds easily, every touch amplified. The heat between you is overwhelming. She shudders when you graze her clit, and when she does the same to you the sensitivity makes you gasp. {fiona}"We're both so..." She trails off, shivering. {fiona}"Everything's turned up."`;
        } else if (playerGS === 0 && fionaGS === 0) {
            vvMain += ` Both tight, both compact — every touch is precise, deliberate. Her fingers find their targets in your small folds with careful accuracy, and yours do the same. Nothing wasted. {fiona}"Small targets." She almost smiles. {fiona}"We didn't miss."`;
        } else if (playerGS >= 2 && fionaGS === 0) {
            vvMain += ` Your swollen folds engulf her fingers — plush, thick, slippery. She stares at the contrast with her own tight pussy. {fiona}"You're so much more than me down there." She pushes deeper into you, fascinated. {fiona}"I can feel you gripping."`;
        } else if (playerGS === 0 && fionaGS >= 2) {
            vvMain += ` Her swollen pussy dwarfs your delicate folds — thick lips parting around your fingers, slick and puffy. Your own tight entrance grips her fingers snugly by comparison. {fiona}"We're so different." She watches your fingers disappear into her. {fiona}"But it works."`;
        }
        // VV stat modifiers
        if (fionaC >= 4) {
            vvMain += ` Her ${npcChest} press against you as she grinds closer — heavy, warm, impossible to ignore during tribbing. She looks down at them squished between your bodies. {fiona}"They keep getting in the way." She adjusts, pressing harder. {fiona}"I don't mind."`;
        }
        if (fionaM >= 5 && !(fionaM >= 4 && playerM <= 1)) {
            vvMain += ` Her fingers inside you are strong — too strong. She feels you tense and eases off, staring at her hand. {fiona}"I forget." She flexes carefully. {fiona}"These hands can bend steel now. I need to be careful with you."`;
        }

        let vvText = vvOral + '\n\n' + vvMain;

        // VP: Fiona penis + player vulva
        // Phase 1: Oral — Fiona eats player out
        let vpOral;
        if (playerM >= 5 && fionaM <= 1) {
            vpOral = `You push her to her knees. She drops willingly — hands on your thighs before her knees hit the floor. She presses her mouth between your legs and starts with broad, searching licks. No technique, all hunger — tongue flat against you, tasting, hunting for what makes you react. When she finds your clit and you gasp, she locks on with single-minded intensity.\n\nHer thin fingers dig into your thighs. She pulls you against her face like she can't get close enough, a raw muffled sound vibrating against you. She comes up just long enough to breathe. {fiona}"I've been wanting to do this." Her mouth is wet. Her eyes are dark. She goes back down without waiting for an answer.`;
        } else if (fionaM >= 4 && playerM <= 1) {
            vpOral = `She pushes you onto the workbench and drops between your legs. Her strong hands spread your thighs and hold them apart — her grip is immovable. She buries her face in you, tongue working broad and flat, mapping you by taste.\n\nShe finds your clit and bears down — not gentle, focused. Her grip tightens every time you squirm. A rough sound escapes her, muffled against you, and the vibration makes you buck. {fiona}"Don't move." Breathed against your skin. Her tongue doesn't stop. {fiona}"I'm not done with you."`;
        } else {
            vpOral = `She sinks to her knees, looks up once — hazel eyes dark, jaw set — and presses her mouth between your legs. She doesn't know what she's doing. The searching licks, the experimental angles, the way she pauses to read your face — first time. But she's ravenous for it. She grabs your hips and pulls you closer, tongue broad and flat, tasting everything.\n\nWhen she finds what works and you moan, something shifts in her. She locks in with desperate focus, pulling you tighter against her mouth. A sound vibrates out of her — half groan, half surprise. She comes up gasping, mouth wet. {fiona}"Holy shit." She stares at you, stunned by her own enthusiasm. {fiona}"I didn't know I'd..." She shakes her head and goes back down.`;
        }
        if (playerGS >= 2) {
            vpOral += ` She pulls back for a second, staring at your swollen folds — thick, puffy, glistening. {fiona}"You're so..." She doesn't finish. She buries her face back in, licking along your full lips, tracing every ridge with her tongue.`;
        }

        // Phase 2: Penetration — branches on Fiona's cock size × power dynamic
        let vpPen;
        if (fionaGS >= 2) {
            // Big cock
            if (playerM >= 5 && fionaM <= 1) {
                vpPen = `You push her onto her back. Her huge cock bobs against her stomach — thick, heavy, almost obscene on her slight frame. She stares at it, then at you. You straddle her and lower yourself onto her cock, and the moment the head pushes into your pussy she seizes up — jaw locked, eyes screwing shut.\n\n{fiona}"Oh god —" Her voice cracks. You sink deeper and she grabs the workbench edge with white knuckles. She can feel everything — every inch of herself inside your pussy, the heat, the grip. She's helpless beneath you, can't thrust, can't think. You ride her and she watches herself disappear into you with glazed, fascinated eyes. {fiona}"It's so much." She swallows, shaking. {fiona}"Having something that big inside someone. I can feel all of it." Her whole body trembles, fighting it, trying to last.`;
            } else if (fionaM >= 4 && playerM <= 1) {
                vpPen = `She lifts you with strong arms and positions you over her huge cock — trembling, not from effort but anticipation. She lowers you slowly, watching every inch disappear into your pussy, jaw tight, breathing hard. The sensation hits her in waves.\n\n{fiona}"It's —" She can't finish. She starts thrusting upward, powerful thighs driving, but keeps faltering — every stroke sends sensation through a cock she hasn't adjusted to. Strong enough to control the position, not strong enough to control her own reactions. Her jaw locks, eyes screwing shut, shaking. {fiona}"I chose this size." Barely audible. {fiona}"I wanted to know what big felt like." She drives deeper, overwhelmed. {fiona}"Now I know."`;
            } else {
                vpPen = `She guides her huge cock to your pussy and the head presses against you — thick, straining. She pushes in and her eyes go wide. Not at the tightness — at the sensation. She can feel everything along the entire length.\n\nShe starts moving in slow, shaky strokes, watching herself slide in and out of your pussy, transfixed. {fiona}"I can feel..." She trails off. Every thrust sends a full-body shudder through her. She tries to build a rhythm but keeps getting overwhelmed — stopping, starting, hands gripping your hips hard enough to leave marks. {fiona}"It's so much." Her voice breaks. {fiona}"Every inch. I feel every inch." She drives deeper, shaking, close to losing it entirely.`;
            }
        } else {
            // Modest/small cock
            if (playerM >= 5 && fionaM <= 1) {
                vpPen = `You push her onto the workbench and straddle her. Her modest cock stands rigid — small, familiar, hers. You sink onto her cock and she gasps, hands flying to your thighs. You control the depth, the angle, everything. She lies beneath you pinned and shaking, hips twitching upward in small urgent thrusts.\n\nHer jaw clenches, fingers digging into your thighs, every muscle in her slight body straining. {fiona}"I can't move." She stares up at you, breathless. {fiona}"I don't want to." Her hips twitch harder, desperate, close.`;
            } else if (fionaM >= 4 && playerM <= 1) {
                vpPen = `She lifts you and lowers you onto her cock — strong, controlled, precise. Her modest cock slides into your pussy and she knows exactly what to do with it. This is the body she's had. She understands it. Her hips thrust upward in measured strokes, building a rhythm that's confident, deliberate.\n\nHer arms tighten around you, pulling you down onto every thrust. She meets your eyes with that fierce concentration. {fiona}"I know what I have." Quiet, steady. {fiona}"I know how to use it." Her rhythm builds harder, faster, jaw clenching.`;
            } else {
                vpPen = `She guides her modest cock to your pussy and pushes in — slow, deliberate, eyes on yours. No hesitation. She knows this body, knows the fit. Every inch is precise, vivid, intimate.\n\nShe moves in careful strokes that build faster, hands on your hips, forehead pressed to yours. Her breath shakes against your skin, each thrust harder than the last. {fiona}"I don't need to be big." Quietly. {fiona}"I can feel everything." Her forehead presses harder against yours, shaking, right at the edge.`;
            }
        }
        // Stat modifiers during penetration
        if (fionaC >= 4) {
            vpPen += ` Her ${npcChest} bounce with every thrust — she looks down, startled, distracted by the movement. {fiona}"They move so much." She sounds caught off guard. {fiona}"I didn't think about that part."`;
        }
        if (fionaB >= 5) {
            vpPen += ` She shifts on the workbench and pauses. Her ${npcButt} cushions the contact where bone used to press wood. {fiona}"The workbench used to hurt." She adjusts, sinking into the padding. {fiona}"Not anymore."`;
        }
        if (fionaM >= 5 && !(fionaM >= 4 && playerM <= 1)) {
            vpPen += ` Her hands grip your hips and she freezes — staring at the marks her fingers are leaving. {fiona}"I keep forgetting how strong I am." She loosens her grip carefully. {fiona}"Sorry."`;
        }

        let vpText = vpOral + '\n\n' + vpPen;

        // VP size overlay (mid-act)
        if (fionaGS >= 2 && playerGS === 0) {
            vpText += `\n\nYour tight pussy fights her cock the whole way in — gripping, clenching, refusing to give. She pushes in slowly, jaw clenched, breathing hard, her whole body trembling with the effort of not thrusting. Every fraction she gains makes her gasp.\n\n{fiona}"You're so tight." Barely a whisper. She shifts inside you, careful. {fiona}"I can feel every bit of you. Every inch is..." She trails off, swallowing. {fiona}"I didn't know it could grip like that."`;
        } else if (fionaGS === 0 && playerGS >= 2) {
            vpText += `\n\nHer modest cock slides into your swollen pussy easily — plush walls enveloping her completely. {fiona}"You're so warm." She shivers. {fiona}"Everything just... wraps around me."`;
        } else if (fionaGS === 0 && playerGS === 0) {
            vpText += `\n\nBoth small — she fits snugly inside your tight pussy, every inch vivid and deliberate. {fiona}"Perfect fit." She says it like a discovery.`;
        }

        // PP: both penis
        // Phase 1: Oral — Fiona sucks player's cock (same energy as PV oral)
        let ppOral;
        if (playerM >= 5 && fionaM <= 1) {
            ppOral = `You grab the back of her head and guide her down. She drops without resistance — hands bracing on your thighs, face level with your cock. She stares for a beat, then opens her mouth and takes you in. No technique, all hunger — she bobs in uneven strokes, gagging once, pulling off to wipe her mouth, going right back. Her thin fingers wrap around the base while she works the head.\n\nShe pulls off gasping. {fiona}"Holy shit." Her eyes are glazed. {fiona}"I really like doing that." She licks her lips and takes you back in deeper.`;
        } else if (fionaM >= 4 && playerM <= 1) {
            ppOral = `She pushes you against the workbench and drops to her knees. Her strong hands pin your hips while she takes your cock in her mouth — rough, inexperienced, but relentless. Her grip tightens every time you squirm.\n\nShe adjusts her angle, figures out the rhythm. Pulls off with a wet sound. {fiona}"Stay still." She wipes her chin. {fiona}"I'm getting better at this." She takes you back in, a groan vibrating around you.`;
        } else {
            ppOral = `She drops to her knees and wraps her hand around your cock, studying it. Then she leans in and takes you in her mouth. Tentative licks, awkward jaw shifts — first time. But she's ravenous for it. She finds a sloppy, eager rhythm, her hand working what her mouth can't reach.\n\nShe comes up gasping, mouth wet, a string connecting her lips to your cock. {fiona}"Holy shit." She stares at you. {fiona}"I want to keep going." She doesn't wait for permission.`;
        }
        if (playerGS >= 2) {
            ppOral += ` She pulls back, jaw aching, staring at your thick cock. {fiona}"You're..." She works her jaw. {fiona}"A lot." She takes a breath and stretches her mouth wider, determined.`;
        }

        // Phase 2: Frot/handjob — gs-aware for Fiona's cock + power dynamic
        let ppMain;
        if (fionaGS >= 2) {
            // Fiona has a big cock — sensation overwhelms her
            if (playerM >= 5 && fionaM <= 1) {
                ppMain = `You wrap your powerful hand around both cocks and she gasps. Her huge cock throbs against yours in your grip — thick, heavy, almost too much for one hand. She grabs your forearm, feeling the muscle flex as you stroke. Her hips jerk involuntarily with each pass.\n\n{fiona}"I can feel —" She can't finish. The friction along her entire length sends her eyes rolling. Her cock pulses against yours, throbbing, her hips jerking harder with each stroke. {fiona}"It's too much." She grips your arm, shaking. {fiona}"Having something that big, and then you touching it — I can't think." She's fighting it, but losing.`;
            } else if (fionaM >= 4 && playerM <= 1) {
                ppMain = `She wraps her strong hand around both cocks — both thick, both heavy, barely fitting in her grip. She pins you to the workbench with her free arm and strokes, her grip firm, controlled. But her own cock keeps betraying her — every stroke sends a shudder through her, her rhythm faltering.\n\n{fiona}"I chose this size." Her voice shakes. She strokes faster, trying to maintain control, but her huge cock is too sensitive — every pass makes her gasp, her rhythm breaking. {fiona}"I can't control it." She grips harder, jaw clenching. {fiona}"It's so much sensation." Her whole body trembles, fighting a losing battle.`;
            } else {
                ppMain = `She wraps her hand around both cocks, pressing them together. Her huge cock dwarfs the grip — thick, heavy, pulsing with heat. She stares at the contact, fascinated, and starts to stroke. The friction hits her immediately. Her eyes go wide.\n\n{fiona}"Oh —" She tries to build a rhythm but keeps stuttering, overwhelmed by sensation along the full length. Every stroke is too much and not enough. Her cock pulses against yours, throbbing harder with each pass. {fiona}"I feel everything along the whole shaft." She swallows, shaking. {fiona}"Every inch." Her hand speeds up, desperate now, approaching the edge fast.`;
            }
        } else {
            // Fiona has a modest cock — familiar, confident
            if (playerM >= 5 && fionaM <= 1) {
                ppMain = `You wrap your powerful hand around both cocks and she gasps — her modest shaft disappears against yours in your grip. She grabs your forearm, feeling the muscle flex as you stroke, her slim body taut and trembling.\n\nHer cock pulses against yours, her whole body straining, her grip on your arm white-knuckled. {fiona}"Your hand is bigger than my entire..." She trails off, shaking. {fiona}"I couldn't stop you if I wanted to." A beat, breathless. {fiona}"I don't want to." Her hips jerk into your grip, desperate.`;
            } else if (fionaM >= 4 && playerM <= 1) {
                ppMain = `She wraps her strong hand around both cocks and pins you against the workbench. Her thick fingers encompass both shafts easily — both modest, both fitting neatly in her grip. She strokes with confidence. She knows her cock. She knows what works.\n\nHer rhythm builds, relentless, her strong hand driving you both higher. She looks at her grip, at both cocks caught in her fingers, and her jaw sets. {fiona}"I know what I have." Steady, but her breath betrays her. {fiona}"And these hands know what to do with it." Her strokes speed up, both of you shaking.`;
            } else {
                ppMain = `She wraps her hand around both your cocks, pressing them together — both modest, fitting neatly in her grip. She stares at the contact, fascinated, and starts to stroke. She knows her own cock, knows the pressure. She uses that knowledge on both.\n\nShe builds a rhythm, her free hand braced against your chest. Both cocks pulse together in her grip, the friction building, her breath coming faster. {fiona}"Holy shit." She stares at the contact, transfixed. {fiona}"I didn't know that would be..." She catches herself, shaking. {fiona}"I don't know why I keep being surprised." Her strokes drive harder, both of you close.`;
            }
        }
        // PP stat modifiers
        if (fionaC >= 4) {
            ppMain += ` Her ${npcChest} press between your bodies during frot, warm and heavy, shifting with every stroke. She looks down at them. {fiona}"They're everywhere." She pushes closer. {fiona}"I can't get away from them. I don't want to."`;
        }
        if (fionaM >= 5 && !(fionaM >= 4 && playerM <= 1)) {
            ppMain += ` Her grip tightens and you wince — she eases off immediately, staring at her hand. {fiona}"Sorry." She flexes carefully. {fiona}"I keep forgetting. I could crush a wrench with this grip now."`;
        }

        let ppText = ppOral + '\n\n' + ppMain;

        // PP size overlay (mid-act)
        if (playerGS >= 2 && fionaGS >= 2) {
            ppText += `\n\nTwo huge cocks barely fit in one hand — the friction is devastating, both shafts straining against each other, too much sensation for either of you. {fiona}"Both big." She flexes her grip. {fiona}"I need bigger hands."`;
        } else if (playerGS === 0 && fionaGS === 0) {
            ppText += `\n\nBoth modest — they fit neatly together, compact and precise. {fiona}"Small." She looks at both of them. {fiona}"Both of them. It works."`;
        } else if (playerGS >= 2 && fionaGS === 0) {
            ppText += `\n\nYour thick cock dwarfs hers — the size difference impossible to ignore. {fiona}"Yours is..." She stares. {fiona}"Yeah." She doesn't finish the thought.`;
        } else if (playerGS === 0 && fionaGS >= 2) {
            ppText += `\n\nHer huge cock dwarfs yours — the size difference adding pressure and friction that overwhelms her. {fiona}"I'm still getting used to the size." She looks down at hers, throbbing. {fiona}"It's a lot to have between my legs."`;
        }

        const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };
        this.text = opening + '\n\n' + getSexSceneText('fiona', branches);

        gameState.npcs.fiona.trust = Math.min((gameState.npcs.fiona.trust || 0) + 3, 100);
        saveState();
    },
    actions: [
        {
            label: 'Something unexpected happens...',
            nextScene: 'fiona_sex_transform'
        },
        {
            label: 'Continue...',
            nextScene: 'fiona_sex_closing'
        }
    ]
};

SCENES['fiona_sex_transform'] = {
    id: 'fiona_sex_transform',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('fiona', 'transform');
        markTransformationSeen('fiona');

        const fionaBody = gameState.npcs.fiona.body;
        const fionaM = fionaBody.muscle;
        const fionaGS = fionaBody.genitaliaSize;
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        // Tease — accidental trigger
        const tease = `In her enthusiasm, Fiona's elbow catches one of the prototype devices on the workbench. It tumbles, activating with a soft splat as something gelatinous splashes across her bare back. {fiona}"Oh no, I'm sorry, I didn't mean to —" She freezes, eyes going wide. {fiona}"I feel... strange..."`;

        // Transform — goo girl
        let transform = `The change spreads across Fiona's skin like water soaking through cloth. Green — vivid, unmistakable green — blooms outward from her spine. Her flesh becomes translucent, shimmering, workshop light passing through her like sun through stained glass. It reaches her face, her head — her blonde hair thickening into heavy ropes of goo that drip onto the sheets and slowly pull themselves back up.`;

        transform += `\n\nShe holds up her hand. She can see through it. She can see through all of herself. Green, translucent, constantly dripping and reforming — goo melting off her body, reconstituting, melting again. A puddle spreads on the sheets beneath her. She's a candle that keeps un-melting.`;

        // Breasts — both characters in awe
        transform += `\n\nHer breasts are impossible. Perky — impossibly perky for how impossibly soft they look, sitting high on her chest like they're defying the goo's own weight. You reach for one without thinking. Your hand sinks in.`;

        transform += `\n\nNo resistance. Just cool, yielding softness. Your fingers disappear and the breast squishes flat under your palm. Then slowly it pushes back up around your fingers. Reforms. Perky again.`;

        transform += `\n\n{fiona}"Did you just —" She looks down at the handprint slowly filling itself in. {fiona}"Do that again."`;

        transform += `\n\nYou squeeze. It flattens, goo bulging between your fingers. Springs back. You both stare at it.`;

        transform += `\n\n{fiona}"They're so soft." She sounds reverent. She cups the other one, watching her own translucent fingers sink in. {fiona}"How are they this soft and still... up?" She bounces them. They jiggle slow and heavy, like water balloons made of light.\n\n{fiona}"This is amazing."`;

        // Body yielding
        transform += `\n\nYou grab her hips. Your fingers press IN — her body gives way, goo yielding, her waist narrowing where you squeeze. She gasps. When you let go, her hips slowly reform to their original shape.`;

        // Muscle check
        if (fionaM >= 5) {
            transform += `\n\nEven in goo form, the definition of her muscles is visible — broad shoulders, defined abs, powerful thighs outlined beneath the translucent green surface. The goo erased everything else. Skin color, opacity, solidity. But those muscles persist, from their sheer insistence on existing.`;
        }

        // Genital check
        if (fionaBody.genitalia === 1) {
            if (fionaGS >= 3) {
                transform += `\n\nBetween her thighs, her cock is still very much present — goo, translucent, and somehow even BIGGER than before. Neither of you can explain it. {fiona}"Was it always that..." She stares at it through her own translucent body. {fiona}"No. No it was not."`;
            } else {
                transform += `\n\nBetween her thighs, her cock is still there — translucent goo, visibly throbbing with a pulse that ripples green light up the shaft.`;
            }
        } else {
            if (fionaGS >= 3) {
                transform += `\n\nBetween her thighs, her pussy is swollen even in goo form — thick folds, puffy and glistening, translucent green and slick.`;
            }
        }

        // === Sex branches ===
        let pvText = `You ease her onto her back. Her goo body spreads against the sheets, melting slightly into the fabric, reforming. You slide into her goo pussy and nothing prepares you for it — cool, yielding, impossibly slick, conforming to every ridge of your ${playerGenSize} cock. Through the shimmer of her translucent stomach, you can see yourself moving inside her. The shape of you, clearly visible, pushing deep.`;

        pvText += `\n\nFiona stares down at the outline of you inside her. {fiona}"I can see you." Her voice cracks. You grip her hips to thrust deeper and your fingers press IN — her body yields, waist narrowing under your hands, reforming the moment you shift.`;

        if (fionaGS >= 3) {
            pvText += ` Her thick, swollen goo folds grip you, pulsing and squeezing involuntarily around your cock.`;
        } else {
            pvText += ` Her goo walls pulse and squeeze around you, conforming tighter with each thrust.`;
        }

        pvText += ` {fiona}"I can feel everything. Every single —" She grabs your arms with goo fingers that grip harder than you'd expect and pulls you deeper.`;

        let vvText = `You press against her on the bed and her goo body molds to every curve of yours. Cool, slick, perfectly fitted. Her breasts squish flat against your chest — impossibly soft, slowly reforming around you, pushing back. Through her translucent form you can see your own skin where your bodies meet, overlapping in ways flesh never could.`;

        vvText += `\n\nYour fingers sink into her`;
        if (fionaGS >= 3) {
            vvText += ` swollen goo pussy — thick folds yielding, conforming around your fingers with impossible precision.`;
        } else {
            vvText += ` and the goo yields, then grips, conforming around your fingers with impossible precision.`;
        }
        vvText += ` She whimpers, the sound reverberating through her translucent chest. {fiona}"We fit." Breathless. {fiona}"We actually fit together."`;

        vvText += `\n\nShe grinds against you and visible ripples cascade through her entire body — pleasure you can literally watch traveling from her core outward. Every point of contact is frictionless and total. {fiona}"I can feel all of you," she gasps. {fiona}"Every part of you against every part of me." Her goo fingers grip your hips, sinking in slightly. The sounds she makes are raw and startled and completely hers.`;

        let vpText = `Her goo cock slides into your pussy and the sensation is like nothing else — cool, perfectly smooth, yielding. It doesn't push against your walls. It fills them. Conforming to every contour, pressing into every space, reshaping itself to fit you completely.`;

        if (fionaGS >= 3) {
            vpText += ` It's massive — impossibly so — but it's goo. It fits. Every inch of available space inside you fills with cool, pulsing, translucent green. When she pulls back, it reforms to its huge shape between strokes, then fills you completely again. {fiona}"It's fitting." She sounds amazed, watching through her own translucent body. {fiona}"All of it. How is all of it fitting?"`;
        } else {
            vpText += ` Through her translucent body, you can see the shape of her cock moving inside you — visible through her own goo stomach. {fiona}"I can see it." She chokes. {fiona}"I can see myself inside you."`;
        }

        vpText += `\n\nEach thrust sends visible ripples through her whole body. You grab her hips and your hands sink in — her body gives, reforms, gives again. Her translucent breasts bounce, so soft they flatten with each impact and spring back. {fiona}"It's too much. I can feel everything at once..." The quiet girl is gone.`;

        let ppText = `Your cocks press together and her goo shaft molds around yours — cool, yielding, wrapping your ${playerGenSize} cock in translucent green. Through her body, you can see both shafts sliding together, the heat of your cock turning the goo around it warmer, almost glowing.`;

        ppText += `\n\nFiona wraps her translucent hand around both and strokes, watching the sensation ripple up through her goo arm, her chest, her whole body. You squeeze one of her breasts and it squishes flat, reforms, and she shudders. {fiona}"I can see everything." A whisper. {fiona}"Both of us." She pumps faster, slick sounds amplified by her goo body, the words still coming — surprised, raw, each one pulled from her against her will.`;

        const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };

        // Climax — visible orgasm
        const climax = `\n\nThe goo amplifies everything. When Fiona's orgasm hits, you can see it happen — a cascade of rippling light racing from her core to her edges, her whole translucent body pulsing with visible pleasure. She cries out, raw and unrestrained and loud in a way Fiona has never been loud.\n\n{fiona}"Oh fuck..." She shakes, goo quivering but holding its shape, every aftershock visible as waves of light rolling under her surface. You can literally watch the pleasure move through her. She clings to you, goo fingers locked tight, riding it out with nowhere to hide.`;

        // Revert
        const revert = `\n\nSlowly, color returns. Warmth creeps back into her skin like ink spreading through water. Opacity, then flesh, then the familiar tanned skin and hazel eyes blinking in the lamplight. She flexes her fingers. Solid again.\n\nShe looks down at her body — opaque and ordinary and hers. {fiona}"I could feel everything." Quiet. {fiona}"There was nowhere to hide from it." She looks at you with that fierce little smile. {fiona}"I want to do that again. On purpose next time."`;

        this.text = tease + '\n\n' + transform + '\n\n' + getSexSceneText('fiona', branches) + climax + revert;
    },
    actions: [
        { label: 'Continue...', nextScene: 'fiona_sex_closing' }
    ]
};

SCENES['fiona_sex_closing'] = {
    id: 'fiona_sex_closing',
    image: '',
    speaker: 'Fiona',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('fiona', 'base');

        const npcBody = gameState.npcs.fiona.body;
        const playerBody = gameState.player.body;
        const fionaM = npcBody.muscle;
        const fionaC = npcBody.chest;
        const fionaB = npcBody.butt;
        const fionaGS = npcBody.genitaliaSize;
        const fionaHasVulva = npcBody.genitalia === 0;
        const playerM = playerBody.muscle;
        const playerC = playerBody.chest;
        const playerB = playerBody.butt;
        const playerGS = playerBody.genitaliaSize;
        const npcChest = getBodyStatDesc('fiona', 'chest');
        const npcButt = getBodyStatDesc('fiona', 'butt');
        const npcGenSize = getBodyStatDesc('fiona', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');
        const sawTransform = hasSeenTransformation('fiona');
        const isGoddess = fionaC >= 5 && fionaB >= 5 && fionaM >= 4;

        let text = '';

        // === Climax (skip if transform path already handled it) ===
        if (!sawTransform) {
            const climaxOpening = `The pleasure keeps building, and Fiona keeps trying to hold it together, and she keeps failing. Her whole body is slick with sweat, every gasp and tremor amplified. She's been catching the sounds in her throat, swallowing them back, but they keep escaping louder each time.\n\n{fiona}"I'm close, I'm so close, I —" She grabs onto you like an anchor, nails digging in. Her eyes are glassy. The words come faster now, tumbling over each other, and she's given up trying to stop them. {fiona}"Oh fuck, please don't stop, it feels so fucking good..."`;

            // PV climax
            let pvClimax;
            if (playerM >= 5 && fionaM <= 1) {
                pvClimax = `She comes clinging to you — her slight body clenching around your ${playerGenSize} cock, a cry tearing out of her that echoes off the workshop walls. Her nails dig crescents into your shoulders. Her thin thighs lock around you and won't let go. {fiona}"Fuck —" The word punched out of her, raw and shocked.`;
            } else if (fionaM >= 4 && playerM <= 1) {
                pvClimax = `She comes bearing down — powerful thighs clamping, her strong body driving your ${playerGenSize} cock deep as the orgasm rips through her. The sound she makes is loud, animal, nothing like quiet Fiona. Her grip on your wrists crushes. She rides through it with the full force of her body.`;
            } else {
                pvClimax = `She comes apart. A cry rips out of her that echoes off the workshop walls, raw and animal. Her body arches, shaking, thighs clamping around your ${playerGenSize} cock. {fiona}"Fuck, fuck —" Each word punched out between waves, her voice cracking. You follow, pulled over by the way she clenches around you.`;
            }

            // VV climax
            let vvClimax;
            if (playerM >= 5 && fionaM <= 1) {
                vvClimax = `She comes beneath your hands — her slight body arching off the workbench, a sound tearing out of her that she can't control. Her fingers drive into you with desperate precision and drag you over seconds later. She shakes through the aftershocks pinned under you, gasping.`;
            } else if (fionaM >= 4 && playerM <= 1) {
                vvClimax = `She comes with her face between your legs — a sound vibrating against you, her strong body going rigid. Her fingers don't stop working you, relentless, and she drives you over with ruthless precision. She pulls back gasping, chin wet, eyes dark.`;
            } else {
                vvClimax = `She comes with her face pressed against your shoulder, teeth grazing your skin. The sound she makes vibrates through her whole body. Her fingers curl inside you and drag you over — you come together, tangled, gasping, the sounds raw and startled and completely hers.`;
            }

            // VP climax
            let vpClimax;
            if (fionaGS >= 2) {
                vpClimax = `She buries her thick cock deep and the orgasm hits her in a wave — her whole body shuddering, eyes screwing shut, a cry ripping out of her. Her cock pulses inside you in long heavy throbs. {fiona}"Oh god —" She can't finish. You come around her and the clench makes her gasp again, aftershocks rolling through her.`;
            } else {
                vpClimax = `She buries her modest cock to the hilt and comes with a shudder — controlled, precise, then cracking apart. A sharp exhale that turns into a cry, her jaw locked open. She pulses inside you and you follow, clenching around her. She stays close, breathing hard, forehead against yours.`;
            }

            // PP climax
            let ppClimax;
            if (fionaGS >= 2) {
                ppClimax = `Her hand tightens around both cocks — her thick shaft straining against yours — and she comes fast and hard, a shocked sound tearing out of her. Her cock pulses massively. The throb triggers you and you come together, both shafts pulsing in her grip. She stares at the mess, breathing ragged. {fiona}"Holy shit."`;
            } else {
                ppClimax = `Her hand tightens around both cocks and her rhythm turns urgent, desperate. She comes with a gasp — cocks pulsing together — and you follow. She watches, unwilling to look away, her hand still moving through the aftershocks. {fiona}"I didn't know that would..." She catches herself, shakes her head.`;
            }

            const branches = {
                'pv': pvClimax,
                'vv': vvClimax,
                'vp': vpClimax,
                'pp': ppClimax
            };

            text += climaxOpening + '\n\n' + getSexSceneText('fiona', branches);

            // Post-climax transition to quiet
            text += `\n\nYou hold her through the aftershocks. Each tremor runs through her like a current. Gradually the shaking slows. Her breathing evens. Her grip loosens, though she doesn't let go.\n\nQuiet again. Just like that.`;
        }

        // === Comedown (always, genital-agnostic, stat-aware) ===
        // Priority order: goddess > c5 > b5 > m4+ > petite > default
        let comedown;
        if (isGoddess) {
            comedown = `\n\nYou're lying on top of her and she's vast underneath you — warm everywhere, soft and solid at once. Her thick arms wrap around you and you sink into the landscape of her body. She exhales slowly, settling into the bed like the bed was built for her.\n\n{fiona}"This body is incredible." Quiet. Certain. She pulls you tighter, her massive chest warm under your head, her powerful arms holding you in place. Her breathing is slow, deep, unhurried. She runs her thumb along your spine.\n\n{fiona}"I'm not letting you up yet." Not fierce. Just honest.`;
        } else if (fionaC >= 5) {
            comedown = `\n\nYou rest against her massive chest. They're warm, heavy, perfect for this — your head sinking into soft flesh, her heartbeat slow and steady underneath. She runs her fingers through your hair, idly, her breathing deep and even.\n\n{fiona}"Best pillows I've ever had." A small smile. She means it. She settles deeper into the bed, pulling you closer, her free hand resting on your back. Unhurried. Content.`;
        } else if (fionaB >= 5) {
            comedown = `\n\nShe shifts and her enormous ass reshapes the mattress underneath her — settling into it like a throne, weight sinking deep. She adjusts, finds the comfortable angle, and a quiet satisfaction crosses her face.\n\n{fiona}"I take up the whole bed." She sinks deeper, pulling you against her side. Not complaining. Not even close. She runs her hand along her own hip, feeling the curve of herself, and the satisfaction is quiet and real.`;
        } else if (fionaM >= 4) {
            comedown = `\n\nShe lies there — all dense muscle and warm skin — and finally her body unclenches. It takes a while. She exhales, flexes her hand, watches the forearm tense and release. Then she wraps around you, solid and warm and immovable.\n\n{fiona}"I could hold you here all night." She could. Her arms don't tremble anymore. She pulls you against her chest and her breathing slows, steady, deep. The strength isn't coiled now. It's resting.`;
        } else if (fionaC <= 1 && fionaM <= 1) {
            comedown = `\n\nShe curls into the crook of your arm — tiny, warm, still trembling faintly. She fits perfectly, her slight body tucked against yours, her flat chest pressed close. Your heartbeat against hers, nothing between.\n\n{fiona}"I can feel all of you." Content. She presses closer, eyes closed, her breathing evening out. Her hand finds yours and holds on. Small fingers, strong grip.`;
        } else {
            comedown = `\n\nShe lies beside you, toned body finally relaxing into the sheets. She leans into your warmth, her hand finding yours. She doesn't say anything for a while. Doesn't need to.\n\nHer thumb traces a slow circle on the back of your hand. Her breathing is steady, her body still, her eyes half-closed. Quiet and satisfied in a way that needs no words.`;
        }
        text += comedown;

        // Player standout modifiers (appended)
        if (playerC >= 4) {
            text += `\n\nShe buries her face in your chest and doesn't come up. {fiona}"Comfortable." Muffled against your skin. Her hands settle on either side, not grabbing — resting. Like she's found a place she fits.`;
        }
        if (playerB >= 4) {
            text += `\n\nHer hand slides to your ass and stays there. She doesn't draw attention to it. Doesn't squeeze. Just rests her palm against you, possessive and quiet, like she's claiming something she doesn't want to give back.`;
        }

        // Exit line (always)
        text += `\n\n{fiona}"Can we... again? Sometime?" She hides her face against you immediately, but you can feel the smile pressed against your skin. She's not sorry. She's not shy about wanting this. She just doesn't know how to ask without hiding.\n\nHer fingers tighten on yours. She doesn't let go.`;

        this.text = text;
    },
    actions: [
        { label: 'Return to workshop', nextScene: 'workshop_main' }
    ]
};

