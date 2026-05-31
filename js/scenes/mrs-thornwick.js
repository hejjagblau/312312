// ============================================
// MRS. THORNWICK SCENES
// Extracted from scenes.js for modularity
// ============================================

// ==========================================
// MRS. THORNWICK SCENES
// ==========================================

SCENES['mrs_thornwick_greeting'] = {
    id: 'mrs_thornwick_greeting',
    image: '',
    imagePrompt: null,
    speaker: 'Mrs. Thornwick',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'formal');

        // Check if already interacted this phase
        if (hasInteractedThisPhase('mrs_thornwick')) {
            this.text = getAlreadyInteractedMessage('mrs_thornwick');
            this.actions = [{ label: 'Leave', nextScene: 'location_square' }];
            return;
        }

        // Check if this is the first meeting (introduction)
        const intro = getNpcIntroduction('mrs_thornwick');
        if (intro) {
            this.text = intro.text;
            this.speaker = intro.speaker;
            markNpcIntroCompleted('mrs_thornwick');
            updateNpcLastSeenPlayer('mrs_thornwick');
            this.actions = [
                {
                    label: 'Continue',
                    nextScene: 'location_square',
                    effects: [
                        { type: 'addTrust', npc: 'mrs_thornwick', amount: 1 },
                        { type: 'recordNpcInteraction', npc: 'mrs_thornwick' }
                    ]
                }
            ];
            return;
        }

        // Check for genital proposal, goddess reveal, or archetype celebration
        const thornwickArchEvent = checkGreetingArchetypeEvent('mrs_thornwick');
        if (thornwickArchEvent && (thornwickArchEvent.type === 'proposal' || thornwickArchEvent.type === 'goddess_reveal' || thornwickArchEvent.type === 'celebration')) {
            SceneManager.playScene(thornwickArchEvent.sceneId);
            return;
        }

        const reaction = getNpcReactionToChanges('mrs_thornwick');
        if (reaction) {
            this.text = `Mrs. Thornwick's composure slips momentarily. "${reaction}"\n\nShe clears her throat. "I trust you're settling in well?"`;
        } else {
            this.text = "Mrs. Thornwick inclines her head graciously. \"Good day. I trust you're settling in well? Your uncle was... a unique presence in our community.\"";
        }
        updateNpcLastSeenPlayer('mrs_thornwick');

        // Build normal actions
        this.actions = [
            {
                label: 'Yes, thank you',
                nextScene: 'mrs_thornwick_chat_1',
                condition: () => !hasInteractedThisPhase('mrs_thornwick'),
                effects: [{ type: 'recordNpcInteraction', npc: 'mrs_thornwick' }]
            },
            {
                label: 'Chat',
                nextScene: 'mrs_thornwick_chat',
                condition: () => !hasInteractedThisPhase('mrs_thornwick'),
                effects: [{ type: 'recordNpcInteraction', npc: 'mrs_thornwick' }]
            },
            {
                label: 'Flirt',
                nextScene: 'mrs_thornwick_flirt_1',
                condition: () => !hasInteractedThisPhase('mrs_thornwick') && gameState.npcs.mrs_thornwick.trust >= 12,
                effects: [{ type: 'recordNpcInteraction', npc: 'mrs_thornwick' }]
            },
            {
                label: 'Intimate...',
                nextScene: 'thornwick_sex_intro',
                condition: () => !hasInteractedThisPhase('mrs_thornwick') && gameState.npcs.mrs_thornwick.trust >= 10,
                effects: [{ type: 'recordNpcInteraction', npc: 'mrs_thornwick' }, { type: 'setLocation', location: 'workshop' }]
            },
            { label: 'Leave', nextScene: 'location_square' }
        ];
    },
    actions: []
};

SCENES['mrs_thornwick_chat_1'] = {
    id: 'mrs_thornwick_chat_1',
    image: '',
    imagePrompt: null,
    speaker: 'Mrs. Thornwick',
    text: "\"Your uncle and I had... discussions, over the years. His work occasionally raised concerns among the townsfolk. I always found him to be reasonable, if unconventional.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'diplomatic');
        gameState.npcs.mrs_thornwick.trust += 1;
        saveState();
    },
    actions: [
        { label: 'What kind of concerns?', nextScene: 'mrs_thornwick_chat_1b' },
        { label: 'I hope I can be the same', nextScene: 'mrs_thornwick_chat_1c' },
        { label: 'Continue', nextScene: 'location_square' }
    ]
};

SCENES['mrs_thornwick_chat_1b'] = {
    id: 'mrs_thornwick_chat_1b',
    image: '',
    imagePrompt: null,
    speaker: 'Mrs. Thornwick',
    text: "Mrs. Thornwick chooses her words carefully. \"People claimed to see... changes. In themselves, in others. Nothing that could be proven, but enough to cause talk.\" She looks at you appraisingly. \"I trust you'll be discreet in whatever you do there.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'measured');
        gameState.flags.knowledge_hint_concerns = true;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'mrs_thornwick_greeting' }
    ]
};

SCENES['mrs_thornwick_chat_1c'] = {
    id: 'mrs_thornwick_chat_1c',
    image: '',
    imagePrompt: null,
    speaker: 'Mrs. Thornwick',
    text: "A genuine smile breaks through her practiced composure. \"That's all I can ask. This town has been through enough change. But... controlled change, managed well... that can be a good thing.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'warm');
        gameState.npcs.mrs_thornwick.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'mrs_thornwick_greeting' }
    ]
};

SCENES['mrs_thornwick_chat_2'] = {
    id: 'mrs_thornwick_chat_2',
    image: '',
    imagePrompt: null,
    speaker: 'Mrs. Thornwick',
    text: "Mrs. Thornwick adjusts her formal dress. \"Being an elder requires a certain... presentation. Dignified. Proper. Sometimes I wonder if anyone sees the woman beneath the title.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'reflective');
        gameState.npcs.mrs_thornwick.trust += 1;
        gameState.flags.mrs_thornwick_personal_revealed = true;
        saveState();
    },
    actions: [
        { label: 'I see her', nextScene: 'mrs_thornwick_chat_2b' },
        { label: 'That sounds lonely', nextScene: 'mrs_thornwick_chat_2c' },
        { label: 'Continue', nextScene: 'location_square' }
    ]
};

SCENES['mrs_thornwick_chat_2b'] = {
    id: 'mrs_thornwick_chat_2b',
    image: '',
    imagePrompt: null,
    speaker: 'Mrs. Thornwick',
    text: "For a moment, her composure cracks. Something vulnerable shows through. \"Do you?\" She quickly regains control. \"That's... kind of you to say. Not many people look past the title.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'vulnerable');
        gameState.npcs.mrs_thornwick.trust += 3;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'mrs_thornwick_greeting' }
    ]
};

SCENES['mrs_thornwick_chat_2c'] = {
    id: 'mrs_thornwick_chat_2c',
    image: '',
    imagePrompt: null,
    speaker: 'Mrs. Thornwick',
    text: "Mrs. Thornwick sighs. \"It can be. My late husband understood. But since he passed...\" She shakes her head. \"Forgive me. That was inappropriate for our relationship.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'sad');
        gameState.npcs.mrs_thornwick.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'mrs_thornwick_greeting' }
    ]
};

SCENES['mrs_thornwick_chat_3'] = {
    id: 'mrs_thornwick_chat_3',
    image: '',
    imagePrompt: null,
    speaker: 'Mrs. Thornwick',
    text: "After several drinks at a private dinner, Mrs. Thornwick's formal demeanor slips.\n\n\"Can I confess something? Something I've never told anyone?\" She looks at her reflection in a window. \"Sometimes I look at the younger women in town and I wish... well.\" She touches her chest briefly. \"It's foolish vanity. Unbefitting of my station.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'confessing');
        gameState.flags.mrs_thornwick_desire_chest_revealed = true;
        gameState.npcs.mrs_thornwick.desiresRevealed[2] = true;
        gameState.npcs.mrs_thornwick.trust += 1;
        saveState();
    },
    actions: [
        { label: "It's not foolish", nextScene: 'mrs_thornwick_chat_3b' },
        {
            label: 'What if I could help?',
            nextScene: 'mrs_thornwick_offer_change',
            condition: () => gameState.day >= 3  // After getting familiar with devices
        },
        { label: 'Continue', nextScene: 'location_square' }
    ]
};

SCENES['mrs_thornwick_chat_3b'] = {
    id: 'mrs_thornwick_chat_3b',
    image: '',
    imagePrompt: null,
    speaker: 'Mrs. Thornwick',
    text: "She looks at you gratefully. \"You're kind. But at my position, one must be careful about... changes. People would talk.\" She sighs wistfully. \"Still, a woman can dream.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'grateful');
        gameState.npcs.mrs_thornwick.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'mrs_thornwick_greeting' }
    ]
};

SCENES['mrs_thornwick_flirt_1'] = {
    id: 'mrs_thornwick_flirt_1',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "{player}\"You know, dignity and beauty aren't mutually exclusive. You have both in abundance.\" You hold her gaze.\n\nMrs. Thornwick's composure falters visibly. {mrs_thornwick}\"I... that's... highly inappropriate.\" But she doesn't look away. {mrs_thornwick}\"Though not unwelcome.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'flustered');
        gameState.npcs.mrs_thornwick.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'mrs_thornwick_greeting' }
    ]
};

SCENES['mrs_thornwick_offer_change'] = {
    id: 'mrs_thornwick_offer_change',
    image: '',
    imagePrompt: null,
    speaker: 'Mrs. Thornwick',
    text: "Mrs. Thornwick's careful composure shatters. \"You can... your uncle's devices actually...?\" She takes a moment to collect herself. \"I've heard rumors, of course. But I never dared to hope...\" She lowers her voice. \"This would need to be extremely discreet.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'hopeful');
    },
    actions: [
        { label: 'Complete discretion, I promise', nextScene: 'mrs_thornwick_accept_workshop_invite' },
        { label: 'Take time to think about it', nextScene: 'location_square' }
    ]
};

SCENES['mrs_thornwick_accept_workshop_invite'] = {
    id: 'mrs_thornwick_accept_workshop_invite',
    image: '',
    imagePrompt: null,
    speaker: 'Mrs. Thornwick',
    text: "Mrs. Thornwick nods, regaining some composure. \"I'll come after dark. When no one will see.\" A hint of excitement shows through her formal demeanor. \"I can't believe I'm doing this. But I can't stop thinking about it either.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'decided');
        gameState.npcs.mrs_thornwick.trust += 1;
        gameState.flags.mrs_thornwick_workshop_visit_scheduled = true;
        gameState.flags.mrs_thornwick_workshop_visit_triggered = false;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'location_square' }
    ]
};

SCENES['mrs_thornwick_workshop_arrival'] = {
    id: 'mrs_thornwick_workshop_arrival',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        // Skip intro on repeat visits
        if (gameState.npcs.mrs_thornwick.firstDesireFulfilledDay !== null) {
            SceneManager.playScene('mrs_thornwick_transformation_ready');
            return 'redirect';
        }
        this.image = getNpcImagePathSimple('mrs_thornwick', 'nervous');
        this.text = "A quiet knock after dark. Mrs. Thornwick slips in, having traded her formal dress for something simpler.\n\n{mrs_thornwick}\"I made sure no one saw me.\" She looks around nervously. {mrs_thornwick}\"I still can't believe I'm here. This is so unlike me.\" But there's excitement beneath the anxiety.";
    },
    actions: [
        { label: 'Sometimes unlike you is exactly what you need', nextScene: 'mrs_thornwick_transformation_ready' },
        { label: 'We can stop if you want', nextScene: 'mrs_thornwick_transformation_offer_stop' }
    ]
};

SCENES['mrs_thornwick_transformation_offer_stop'] = {
    id: 'mrs_thornwick_transformation_offer_stop',
    image: '',
    imagePrompt: null,
    speaker: 'Mrs. Thornwick',
    text: "She shakes her head firmly. \"No. I've been proper and controlled my whole life. Tonight, I want to be... impulsive.\" She looks at you with determination. \"Show me your devices.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'determined');
    },
    actions: [
        { label: 'As you wish', nextScene: 'mrs_thornwick_transformation_ready' }
    ]
};

SCENES['mrs_thornwick_transformation_ready'] = {
    id: 'mrs_thornwick_transformation_ready',
    image: '',
    imagePrompt: null,
    speaker: 'Mrs. Thornwick',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mrs_thornwick');
        gameState.currentTransformationTarget = 'mrs_thornwick';
        saveState();

        const npc = gameState.npcs.mrs_thornwick;
        const desire = npc?.currentDesire;
        const label = desire?.label?.toLowerCase() || 'a change';
        const thresholds = getNpcTrustThresholds('mrs_thornwick');
        const horny = (npc.trust >= thresholds.intimate) || npc.hiddenArchetype === 'goddess';

        if (horny) {
            this.text = `Mrs. Thornwick is already running her fingers along the nearest device, examining its contours with undisguised interest.\n\n{mrs_thornwick}"${label[0].toUpperCase() + label.slice(1)}." She doesn't look up. Her composure is immaculate but there's color high on her cheekbones. {mrs_thornwick}"I've wasted enough years being patient. Shall we begin?"`;
        } else {
            this.text = `Mrs. Thornwick stands with perfect posture, hands folded.\n\n{mrs_thornwick}"I'd like ${label}." A measured breath. {mrs_thornwick}"I trust your discretion in these matters. Whenever you're ready."`;
        }
    },
    actions: [
        { label: 'Select a device', nextScene: 'device_selection' },
        { label: 'Changed your mind?', nextScene: 'workshop_main' }
    ]
};

SCENES['mrs_thornwick_transform_chest'] = {
    id: 'mrs_thornwick_transform_chest',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "The device activates. Mrs. Thornwick gasps, her composure finally breaking completely.\n\n{mrs_thornwick}\"Oh... oh goodness!\" Years of repression melt away as she feels the changes begin. {mrs_thornwick}\"It's really happening... it's really...!\"",
    onEnter: function() {
        this.image = 'images/transformations/transform_chest_5.webp';
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.mrs_thornwick_transformation_complete) {
            gameState.npcs.mrs_thornwick.body.chest = 5;
            gameState.npcs.mrs_thornwick.trust += 5;
            gameState.flags.mrs_thornwick_transformation_complete = true;
            recordNpcBodyChange('mrs_thornwick');
            saveState();
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'mrs_thornwick_transform_chest_success' }
    ]
};

SCENES['mrs_thornwick_transform_chest_success'] = {
    id: 'mrs_thornwick_transform_chest_success',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "The transformation completes. Mrs. Thornwick stares at herself, all dignity forgotten.\n\n{mrs_thornwick}\"I'm... magnificent.\" Her voice is thick with emotion. {mrs_thornwick}\"I look like I always dreamed. Not the town elder. Not the widow. Just... a beautiful woman.\"\n\nTears stream down her face. {mrs_thornwick}\"I've wanted this since I was a girl. Thank you. Thank you for giving me what I never dared to ask for.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'transformed');
    },
    actions: [
        { label: 'Continue', nextScene: 'mrs_thornwick_transform_aftermath' }
    ]
};

SCENES['mrs_thornwick_transform_aftermath'] = {
    id: 'mrs_thornwick_transform_aftermath',
    image: '',
    imagePrompt: null,
    speaker: 'Mrs. Thornwick',
    text: `Mrs. Thornwick composes herself, though her hands keep returning to her transformed figure - cupping, testing, marveling at the new weight.

"I'll need new formal dresses. More... accommodating ones." She laughs - a genuine, joyful sound utterly unlike her usual refined chuckle. "Let the town gossip. They'll talk about how the widow has blossomed."

Her dignity cracks completely as she steps forward and pulls you into an embrace. You feel her new curves press firmly against you, the starched fabric of her formal dress straining around soft, abundant flesh. "I don't care what anyone says anymore."

She holds you there for a long moment, trembling slightly. "Whatever you need - permits, approvals, protection - come to me." Her voice drops to a whisper against your ear. "I owe you more than I can ever express. You've given me back something I thought I'd lost forever."`,
    onEnter: function() {
        this.image = getNpcImagePathSimple('mrs_thornwick', 'grateful');
        gameState.npcs.mrs_thornwick.trust += 3;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};


// ============================================
// MRS. THORNWICK SEX SCENES
// ============================================

SCENES['thornwick_sex_intro'] = {
    id: 'thornwick_sex_intro',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('mrs_thornwick', 'base');
        markSexUnlocked('mrs_thornwick');

        // --- Variables ---
        const npcBody = gameState.npcs.mrs_thornwick.body;
        const playerBody = gameState.player.body;
        const thornwickM = npcBody.muscle;
        const thornwickC = npcBody.chest;
        const thornwickB = npcBody.butt;
        const thornwickGS = npcBody.genitaliaSize;
        const thornwickHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerM = playerBody.muscle;
        const playerB = playerBody.butt;
        const playerGS = playerBody.genitaliaSize;
        const npcChest = getBodyStatDesc('mrs_thornwick', 'chest');
        const npcButt = getBodyStatDesc('mrs_thornwick', 'butt');
        const npcGenSize = getBodyStatDesc('mrs_thornwick', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        // --- Part 1: Thornwick's Body ---
        let part1;
        if (thornwickM <= 1) {
            if (thornwickC <= 1) {
                part1 = `Mrs. Thornwick undresses with ceremony. Each garment is folded precisely and set aside in order — dress, petticoat, shift — as though she's filing documents. She stands before you in nothing but composure, slight and pale and angular. No curves to speak of. Collarbones sharp enough to write with. A body she's maintained through decades of discipline, and she presents it the way she'd present a municipal report: without apology.\n\n{mrs_thornwick}"This is highly irregular." She says it while making no move to cover herself. Her hands settle at her sides — folded, then unfolded, then folded again. She can't find a dignified position for them. There isn't one. Her blue eyes meet yours with practiced steadiness, but her chin lifts a fraction higher than necessary.\n\nShe is waiting to be touched the way she waits for a committee vote. With expectation of a particular outcome she will not admit to wanting.`;
            } else if (thornwickC <= 3) {
                part1 = `Mrs. Thornwick undresses with ceremony. Each garment folded, set aside in order. When the formal dress comes off, her ${npcChest} are fuller than the high-collared fabric suggested — a fact she presents like a budget line item she's only now making public.\n\n{mrs_thornwick}"This is highly irregular." She stands with practiced posture, hands at her sides. Her blue eyes meet yours with composure, but when your gaze drops to her chest she straightens — a fraction. Showing them off without admitting she's showing them off. Her chin lifts. She is dignified. She is in control.\n\nHer nipples are hard. She does not acknowledge this.`;
            } else {
                part1 = `Mrs. Thornwick undresses with ceremony — but the ceremony falters at the shift. Her ${npcChest} spill free and the weight of them shifts her posture. She adjusts. Straightens. Adjusts again.\n\n{mrs_thornwick}"If you could just — they keep —" She pushes them together, trying to manage them the way she manages everything. They do not cooperate. They touch your arm without her arranging it. She goes rigid with a sensation she didn't schedule.\n\n{mrs_thornwick}"This is highly irregular." The words are automatic now. Her hands can't decide between covering herself and presenting herself. She settles for folding her arms beneath her massive chest, which only pushes them up and out. She notices. Unfolds her arms. Folds them again. The composure is holding. Barely.`;
            }
        } else if (thornwickM <= 3) {
            part1 = `Mrs. Thornwick undresses with ceremony. Each garment folded, set aside. Beneath the formal layers her body is toned, maintained — the kind of fitness that comes from discipline rather than vanity. Her ${npcChest} sit on a frame that holds them with quiet authority.\n\n{mrs_thornwick}"This is highly irregular." She stands with her spine straight, as though presenting herself at a town meeting. Even during undress, her posture is impeccable. Her blue eyes meet yours with composure that has only the faintest crack — a flush high on her cheekbones she cannot will away.\n\nShe braces herself the way she'd brace for a difficult vote. Feet planted, shoulders square. She is ready for whatever happens next. She will direct it. She is certain of this.`;
        } else {
            part1 = `Mrs. Thornwick undresses with ceremony — but the body beneath the formal layers is no longer the dignified elder's frame. Dense muscle fills her shoulders, her arms, her thighs. She folds her dress and the motion is powerful, casual, and she catches you watching the way her biceps flex.\n\n{mrs_thornwick}"I wanted to understand the full range of the device's capabilities." Clinical. As though she's explaining a budget expenditure. Her ${npcChest} sit on a chest wall that could crack stone. She straightens — and the workshop feels smaller.\n\n{mrs_thornwick}"This is highly irregular." But her powerful legs are already shifting her weight toward you. Her body is making promises her vocabulary hasn't caught up to. She reaches for composure and finds muscle instead.`;
        }
        // Part 1 butt modifier
        if (thornwickB >= 5) {
            part1 += `\n\nHer enormous ass is impossible to overlook — she chose this, she knows she chose this, and the knowledge does nothing to prepare her for the reality of sitting in the workshop chair and feeling it engulf the seat beneath her. {mrs_thornwick}"This is... more than I anticipated." She shifts, trying to find a dignified position. There isn't one. Every shift grinds her against the surface. She stops shifting. She starts grinding. She pretends the grinding is still shifting.`;
        } else if (thornwickB >= 4) {
            part1 += ` Her ${npcButt} fills out her frame in a way she pretends not to notice — but she turns slightly, giving you the angle, and her blue eyes track whether you're looking.`;
        }

        // --- Part 2: Getting Close (power dynamics / controlled surrender) ---
        let part2;
        const bothPetite = playerM <= 1 && thornwickM <= 1;
        if (playerM >= 5 && thornwickM <= 1) {
            // Player m5, she's slight — THE fantasy. She gets what she wants.
            part2 = `You pull her against you and she does not resist. She arranged this. She positioned herself to be exactly where your hands would land. {mrs_thornwick}"You may proceed." Formal. Breathless.\n\nYou pin her wrists and her entire body softens. The instructions — the endless corrections, the adjustments — go quiet. For a moment there is only the sound of her breathing, fast and shallow, and her blue eyes looking up at you with something she will never, ever name.\n\n{mrs_thornwick}"...yes." Almost a whisper. {mrs_thornwick}"Like that." The first genuine surrender. The instructions don't come back for a long time.`;
        } else if (playerM >= 5 && thornwickM >= 4) {
            // Both strong — she tries to yield and can't stop matching
            part2 = `You pull her close and she meets you with strength she wasn't planning to use. Her hands grip your arms, testing. She was going to yield. She was going to let you take charge. Instead she's matching you, pushing back, and the frustration on her face is genuine.\n\n{mrs_thornwick}"I'm allowing this." She is not allowing anything. She's wrestling you for the lead while insisting she's surrendering. Her powerful arms pin yours and she doesn't notice. {mrs_thornwick}"Take me." She flips you onto the workbench. {mrs_thornwick}"I said TAKE me." She holds you down with one hand and doesn't understand why you're grinning.`;
        } else if (playerM >= 5 && thornwickM >= 2) {
            part2 = `You pull her against you and she lets it happen — then immediately adjusts your hand placement. {mrs_thornwick}"A bit lower. No — there. That's adequate." She's directing her own ravishment. Your strength means she doesn't have to hold herself up, and her hands are free for corrections.\n\nYou pin her and her mouth opens. Closes. Opens again. {mrs_thornwick}"That's... you may continue." The instructions get quieter. She's not yielding. She's being overridden, and the difference makes her breathing stutter.`;
        } else if (playerM <= 1 && thornwickM >= 4) {
            // She's strong, player is slight — she picks them up and arranges them
            part2 = `She picks you up. One arm. Repositions you on the workbench like she's adjusting furniture for a meeting. {mrs_thornwick}"Is this comfortable for you? Good." She doesn't wait for the answer. She's already repositioning your legs.\n\nShe means to be taken. She genuinely believes she's creating the conditions for surrender. She has placed you exactly where she wants you, arranged your limbs, adjusted the angle. She steps back, assesses her work, and nods.\n\n{mrs_thornwick}"Whenever you're ready." She has done everything. She will do everything. She will go to her grave believing you were in charge.`;
        } else if (playerM <= 1 && thornwickM <= 1) {
            if (playerC >= 4 && playerB >= 4) {
                part2 = `She draws you close and her hands find the contrast immediately — your slight frame, then the swell of your chest, then the curve of your ass. She cups your breasts. Professionally. {mrs_thornwick}"Remarkable development." Does not let go. Her thumb moves. She's not aware her thumb is moving.\n\n{mrs_thornwick}"The tissue density is quite — I should stop talking." She doesn't stop talking. Her mouth finds your nipple and THEN she stops talking. Her hands slide to your ass. Both hands. The inspection becomes groping. The groping becomes kneading. {mrs_thornwick}"I'm conducting an evaluation." She is not conducting an evaluation.`;
            } else if (playerC >= 4) {
                part2 = `She draws close and her hands find your chest. She cups them. Professionally. {mrs_thornwick}"Remarkable development." Does not let go. Her thumb moves. She's not aware her thumb is moving. {mrs_thornwick}"The tissue density is quite — I should stop talking."\n\nShe doesn't stop talking. Her mouth finds your nipple and THEN she stops talking. She holds you there, hands on your chest, breathing against your skin, composure fraying one thread at a time.`;
            } else if (playerB >= 4) {
                part2 = `She draws you close and her hands slide down your back to your ass. Both hands. {mrs_thornwick}"Extraordinary proportions." The inspection becomes groping. The groping becomes kneading. She presses herself against your rear and her breath catches.\n\n{mrs_thornwick}"I'm conducting an evaluation." She is not conducting an evaluation. Her fingers dig in and she doesn't let go. She discusses something entirely unrelated — {mrs_thornwick}"As I was saying about the municipal —" She's squeezing. She knows she's squeezing.`;
            } else {
                part2 = `She draws you close and you fold together — two slight bodies, all angles and warmth. She adjusts your hip. Then your shoulder. Then your hip again. {mrs_thornwick}"Support my lower back, please. Your other hand should be — yes." The running commentary fills the space where surrender should be.\n\nHer hands settle on you with architectural precision. She's mapping you the way she'd map a district plan. Every angle calculated, every point of contact approved. But her breathing is faster than her instructions, and her body is pressing into yours before her committee has reached a decision.`;
            }
        } else if (thornwickM >= 5 && playerM <= 1) {
            part2 = `{mrs_thornwick}"Take me," she says, and then flips you onto your back with startling power. {mrs_thornwick}"I said TAKE me." She puts you exactly where she wants you. Holds you there. Her powerful thighs bracket your hips and her arms cage your shoulders.\n\n{mrs_thornwick}"I'm letting you do this." She is not letting you do anything. She is doing everything. You are along for the ride and she genuinely believes otherwise. She adjusts you twice more before she's satisfied with the arrangement.`;
        } else if (thornwickM >= 5 && playerM >= 5) {
            part2 = `She pushes you toward the workbench. You don't move. She pushes harder. You still don't move. Her blue eyes widen — not with alarm, with something hungrier. She's never been matched.\n\n{mrs_thornwick}"I require you to —" She pushes again. Neither of you budges. It becomes a contest — hands gripping, bodies straining, and somewhere in the middle she pins your wrists while saying {mrs_thornwick}"Whenever you're ready" as if you have a choice. She doesn't realize she's holding you down.`;
        } else {
            part2 = `She draws you close with hands that know exactly where they're going — and correct themselves twice before arriving. {mrs_thornwick}"A bit to the left — I didn't mean to say that." Her hands settle on your shoulders. She repositions you. Steps back. Assesses. Repositions again.\n\nShe braces herself with practiced posture — even now, her spine is straight. Her blue eyes meet yours with composure that has exactly one crack: the flush spreading down her neck that she cannot will away.\n\n{mrs_thornwick}"You may proceed." She means: touch me before I lose the ability to ask for it in complete sentences.`;
        }
        // Part 2 modifiers
        if (playerC >= 4 && !bothPetite) {
            part2 += ` Her hands find your chest again. She cups them. Official. Evaluative. {mrs_thornwick}"The tissue density is quite —" Her thumb traces a slow circle that is not official or evaluative. She doesn't move her hand.`;
        }
        if (playerB >= 4 && !bothPetite) {
            part2 += ` Her hand finds your rear and stays there while she discusses something entirely unrelated. {mrs_thornwick}"As I was saying about the municipal —" She's squeezing. She knows she's squeezing.`;
        }
        if (thornwickC >= 5 && thornwickM >= 4) {
            part2 += ` Her massive chest presses between you, unavoidable. She tries to fold her arms disapprovingly and her breasts get in the way. She unfolds. Refolds. Her powerful body pins you without her authorizing it. {mrs_thornwick}"I was merely — you were at an awkward angle."`;
        } else if (thornwickC >= 5) {
            part2 += ` Her massive chest presses between you. She tries to position them, to manage them. They touch you without her arranging it and she goes rigid. Her hands end up in your hair, holding you against her breasts. She didn't authorize that.`;
        }
        if (thornwickM >= 5 && !(thornwickM >= 5 && playerM >= 5) && !(thornwickM >= 5 && playerM <= 1) && !(playerM >= 5 && thornwickM >= 4)) {
            part2 += ` She repositions you with one hand. Meant to suggest. Moved you entirely. {mrs_thornwick}"I was merely — you were at an awkward angle."`;
        }

        // --- Part 3: Oral Phase (controlled surrender — she keeps directing) ---
        let part3;
        if (thornwickHasVulva && thornwickGS >= 3) {
            part3 = `She insists you go first. {mrs_thornwick}"I want to see your... approach." Clinical framing, hands clasped, watching with the focused attention of a performance review.\n\nYou begin. Her composure holds for approximately twelve seconds. Then your tongue finds where her swollen pussy is most sensitive and her voice cracks mid-sentence. {mrs_thornwick}"If you could please continue to — AH — to maintain that precise —" She grabs the bedframe. Her knuckles go white. The next instruction is just a sound.\n\nWhen you reciprocate, the feedback is constant. {mrs_thornwick}"A bit to the left. More pressure. That's — oh — that's acceptable." Her swollen folds throb against your mouth, oversensitive, unmanageable. Every touch makes her voice crack. The feedback gets less coherent as it goes. {mrs_thornwick}"Continue the — the — RIGHT there, don't —" Her hips buck. She didn't authorize that either.`;
        } else if (thornwickHasVulva) {
            part3 = `She insists you go first. {mrs_thornwick}"I want to see your... approach." Clinical framing, hands clasped, watching you with the focused attention of a committee chair reviewing a presentation.\n\nYou begin. She watches with increasing difficulty maintaining composure. Her legs open reluctantly, then wider than she meant to. A gasp she didn't authorize. A hip that moves on its own. She clenches deliberately, angles herself with architectural intent. Treats her own arousal like something to be managed.\n\nWhen reciprocated, the feedback begins. {mrs_thornwick}"A bit to the left. More pressure. That's — oh — that's acceptable." Her tight pussy clenches around your fingers with controlled precision. The feedback gets less coherent as it goes. {mrs_thornwick}"Maintain the — yes — I require you to —" She stops herself. Swallows. Resumes directing in a voice that has dropped an octave.`;
        } else if (!thornwickHasVulva && thornwickGS >= 2) {
            part3 = `She insists you go first. {mrs_thornwick}"I want to see your... approach." She examines her own cock with practiced clinical distance while you begin. {mrs_thornwick}"I wanted to understand the mechanics." She strokes it experimentally. Gets hard. Loses her composure for exactly one second. Recovers. {mrs_thornwick}"As I was saying." She was not saying anything.\n\nHer ${npcGenSize} cock is thick and she cannot maintain eye contact because she keeps looking down at it. {mrs_thornwick}"I may have been... ambitious with the calibration." She tries to direct you to handle it and her hips thrust of their own accord. Mortified. Does it again.\n\nThe feedback begins anyway. {mrs_thornwick}"A firmer grip. More — yes. The rhythm should be —" She grabs your wrist to demonstrate the correct pace and then forgets to let go because the pace is working.`;
        } else {
            part3 = `She insists you go first. {mrs_thornwick}"I want to see your... approach." She examines her modest cock with clinical distance. {mrs_thornwick}"I wanted to understand the mechanics." She strokes it experimentally. Gets hard. Loses her composure for exactly one second. Recovers. {mrs_thornwick}"As I was saying." She was not saying anything.\n\nWhen you reciprocate, the feedback is immediate and precise. {mrs_thornwick}"A firmer grip, please. The angle should be — yes, precisely. Maintain that rhythm." She watches your hand on her cock with focused attention, treating the encounter like a procedure she's overseeing. The composure holds until her hips thrust without permission. She pauses. Straightens. Pretends that didn't happen. It happens again.`;
        }

        const opening = part1 + '\n\n' + part2 + '\n\n' + part3;

        // --- Genital Branches ---

        // === PV: player penis + Thornwick vulva ===
        let pvText;
        if (playerM >= 5 && thornwickM <= 1) {
            pvText = `You lift her onto the workbench and she weighs nothing. She starts to direct — {mrs_thornwick}"Angle my hips approximately thirty degrees to the —" You push your ${playerGenSize} cock into her pussy and the instruction dissolves into a sound she didn't authorize.\n\nHer slight body goes limp in your arms. Not performing submission — actually surrendering. The instructions don't come back. She grips your shoulders and takes every thrust with wide blue eyes, composure demolished by the simple fact that you're stronger than her corrections.\n\n{mrs_thornwick}"...harder." The first order she doesn't apologize for.`;
        } else if (thornwickM >= 4 && playerM <= 1) {
            pvText = `She repositions you with one arm. {mrs_thornwick}"I believe you were going to take charge?" She lifts you onto the workbench, straddles you, and sinks down onto your ${playerGenSize} cock with administrative precision.\n\nShe rides you with powerful thighs. She is directing. She is organizing. She is managing the tempo, the angle, the depth. She pins your wrists for what she calls stabilization. {mrs_thornwick}"I'm letting you do this." She is not letting you do anything.\n\nBut her rhythm stutters when her pussy clenches without approval. Her eyes go wide. Her body takes over mid-instruction and her voice cracks. {mrs_thornwick}"I require — I — you will —" The sentence never finishes.`;
        } else if (thornwickM >= 5 && playerM >= 5) {
            pvText = `Neither of you yields. She says {mrs_thornwick}"take me" and pins you to the workbench. You flip her. She flips you back. The contest becomes the foreplay until she reaches between you, takes your ${playerGenSize} cock, and guides it into her pussy while you're both still locked in it.\n\nThe penetration breaks the stalemate. She gasps — the first sound she hasn't framed in a subordinate clause. You thrust and she matches your force, neither giving ground. Her powerful legs lock around you and she says {mrs_thornwick}"whenever you're ready" as though she isn't already coming apart.`;
        } else {
            pvText = `She guides you down onto the workbench and straddles you with ceremony. {mrs_thornwick}"You may proceed." She positions your ${playerGenSize} cock at her pussy and sinks down with a controlled exhale.\n\nFor three seconds her composure holds. Then her pussy grips you and her hips move without authorization. {mrs_thornwick}"A bit to the left — I didn't mean to say that." She rolls her hips, corrects, rolls again. {mrs_thornwick}"Harder — that was not a request." Her spine is still straight. Her hands are still braced properly. But her hips are grinding on your cock with desperate urgency and the instructions are getting louder.\n\n{mrs_thornwick}"I require you to — to maintain that precise —" She's giving orders she can't help and not apologizing anymore.`;
        }
        // PV stat modifiers
        if (thornwickC >= 5 && !(playerM >= 5 && thornwickM <= 1)) {
            pvText += `\n\nHer massive chest sways with every roll of her hips — they touch you without her arranging it, warm and heavy and impossible to manage. She tries to position them and they spill through her grip. She presses them against you and goes rigid with pleasure she didn't schedule. Her hands end up in your hair, holding your face against her breasts. She didn't authorize that either.`;
        } else if (thornwickC >= 4) {
            pvText += `\n\nHer ${npcChest} sway with the motion, fuller than her formal dress ever suggested. She straightens mid-thrust — showing them off without admitting she's showing them off.`;
        }
        if (thornwickB >= 5) {
            pvText += `\n\nHer enormous ass drives every thrust — she sits deeper, pushes harder, uses the sheer mass to control the rhythm she insists she's not controlling. Every movement grinds her against you and she pretends the grinding is still adjusting.`;
        }
        if (thornwickM >= 5 && !(thornwickM >= 4 && playerM <= 1) && !(thornwickM >= 5 && playerM >= 5)) {
            pvText += ` She pins your wrists for what she calls stabilization. Her grip could bend iron. {mrs_thornwick}"I was merely — you were at an awkward angle."`;
        }
        // PV player standout modifiers
        if (playerC >= 4) {
            pvText += `\n\nHer hand finds your chest mid-stroke. Official. Evaluative. Her thumb traces a slow circle that is not official or evaluative. {mrs_thornwick}"Remarkable development." She does not let go.`;
        }
        if (playerB >= 4) {
            pvText += `\n\nHer hands slide under your ass, gripping, pulling you deeper. {mrs_thornwick}"I'm conducting an evaluation." She is not conducting an evaluation. She's using your hips to drive herself harder onto your cock.`;
        }
        // PV size overlay
        if (playerGS >= 2 && thornwickGS === 0) {
            pvText += `\n\nHer tight pussy grips your thick cock with deliberate control — she clenches with architectural intent, managing every inch. She angles herself precisely, maximizing the friction. {mrs_thornwick}"That's quite — quite adequate." Her knuckles are white on the bedframe.`;
        } else if (playerGS === 0 && thornwickGS >= 2) {
            pvText += `\n\nShe's swollen and slick around you — thick folds engulfing your modest cock in plush, gripping heat. She clenches and the sensation overwhelms her mid-instruction. {mrs_thornwick}"If you could please continue to — AH —" Her swollen pussy throbs around you and the next direction is just a sound.`;
        } else if (playerGS >= 2 && thornwickGS >= 2) {
            pvText += `\n\nShe's swollen and dripping and your thick cock fills her completely — the combination staggers her. Every thrust makes her voice crack mid-instruction. {mrs_thornwick}"I require you to — to —" She grabs the bedframe, knuckles white, composure gone. The sensitivity she chose is more than she calculated for.`;
        } else if (playerGS === 0 && thornwickGS === 0) {
            pvText += `\n\nBoth tight, both precise — she clenches around your modest cock with deliberate control, every movement calculated. She angles for maximum effect, watching your face to calibrate. {mrs_thornwick}"Maintain that precise angle." Even now, the instructions keep coming.`;
        }

        // === VV: both vulva ===
        let vvText;
        if (playerM >= 5 && thornwickM <= 1) {
            vvText = `You push her down onto the workbench — one hand on her chest, the other sliding between her thighs. She opens for you, blue eyes wide, composure abandoned. You find her pussy soaking and push inside. She gasps — {mrs_thornwick}"That's — directly on the —" She stops herself. Swallows.\n\nPinned by your strength, the instructions finally quiet. She reaches between your legs from below, fingers finding you with practiced precision even while held. The feedback resumes in whispers. {mrs_thornwick}"...more pressure. There. Don't stop." For once, the directions sound like requests.`;
        } else if (thornwickM >= 4 && playerM <= 1) {
            vvText = `She pushes you down with one arm — administrative. Efficient. Her strong hands spread your thighs and hold them there, immovable. {mrs_thornwick}"I want to see your... approach." She's supposed to be the one being touched. Instead she's taking charge of touching you.\n\nHer mouth finds your pussy with focused precision and she provides her own feedback on the results. {mrs_thornwick}"Responsive. Good." Her free hand guides yours between her legs. She's dripping. {mrs_thornwick}"Your turn." Not a request. She's already refocused on you, directing the encounter she insists she's receiving.`;
        } else if (thornwickM >= 5 && playerM >= 5) {
            vvText = `Neither yields. She pushes you down; you hold your ground. You reach between her legs; she reaches between yours at the same moment. Both freeze. Then both press deeper.\n\nIt becomes a different kind of contest. She matches your rhythm exactly, refuses to break first. Her fingers curl inside you and she provides commentary through gritted teeth — {mrs_thornwick}"Your technique is — adequate — I require —" The commentary dissolves. She's losing and she's thrilled about it.`;
        } else {
            vvText = `She settles between your thighs with administrative purpose. {mrs_thornwick}"I want to see your... approach." She finds your pussy with precise fingers, mapping you like a municipal survey — every fold catalogued, every response noted.\n\nThe feedback is constant. {mrs_thornwick}"A bit to the left. More pressure. That's — oh — that's acceptable." She guides your hand between her legs without breaking her own rhythm. She's soaking. She doesn't acknowledge it. Her body has been ahead of her instructions the entire time.\n\nThe feedback gets less coherent. {mrs_thornwick}"Continue the — the — RIGHT there, maintain —" Her hips buck against your hand. She didn't approve that motion. It happens again.`;
        }
        // VV gs-awareness
        if (playerGS >= 2 && thornwickGS >= 2) {
            vvText += `\n\nBoth swollen — thick folds meeting thick folds, everything slick and oversensitive. She goes rigid when the sensation hits, voice cracking mid-direction. {mrs_thornwick}"If you could please continue to —" The sentence never finishes. She grabs the bedframe and her knuckles go white.`;
        } else if (playerGS === 0 && thornwickGS === 0) {
            vvText += `\n\nBoth tight, both precise. She works you with controlled pressure, finding the exact spot and staying there. She clenches around your fingers with deliberate control. {mrs_thornwick}"Maintain that precise angle." Even now — instructions. Always instructions.`;
        } else if (playerGS >= 2 && thornwickGS === 0) {
            vvText += `\n\nYour swollen folds are thick under her fingers — she traces every ridge with clinical attention that becomes something else entirely. {mrs_thornwick}"Extraordinary sensitivity, I'd imagine." She tests the hypothesis. Thorough. Her own tight pussy clenches around your fingers with architectural precision.`;
        } else if (playerGS === 0 && thornwickGS >= 2) {
            vvText += `\n\nShe's swollen and dripping — thick folds parting around your fingers, her oversensitive pussy throbbing at every touch. She chose this. She did not choose what it would feel like. Every touch makes her voice crack mid-instruction. {mrs_thornwick}"If you could please — AH —" She grabs whatever is nearest. Her composure is in pieces.`;
        }
        // VV stat modifiers
        if (thornwickC >= 4) {
            vvText += `\n\nHer ${npcChest} press between your bodies as she leans closer. She tries to manage them. They press against you anyway. She goes rigid, then pushes into the contact, then pretends she was adjusting her position.`;
        }
        if (thornwickM >= 5 && !(thornwickM >= 4 && playerM <= 1) && !(thornwickM >= 5 && playerM >= 5)) {
            vvText += ` Her fingers inside you are strong — stronger than she meant. She adjusts instantly. {mrs_thornwick}"Apologies. I overestimated the required —" She does it again.`;
        }
        if (playerC >= 4) {
            vvText += `\n\nHer mouth moves to your chest while her fingers keep working. She cups your breasts. Professionally. {mrs_thornwick}"Remarkable development." Her thumb traces circles that are not professional. She doesn't stop.`;
        }
        if (playerB >= 4) {
            vvText += `\n\nHer hands slide to your ass. Both hands. The inspection becomes groping becomes kneading. She presses herself against your rear. {mrs_thornwick}"I'm conducting an evaluation." Her breathing says otherwise.`;
        }

        // === VP: Thornwick penis + player vulva ===
        let vpText;
        if (thornwickGS >= 2) {
            if (playerM >= 5 && thornwickM <= 1) {
                vpText = `She lets you arrange her — position her thick cock, guide her into you, control the depth. She watches with blue eyes she can't keep on your face because they keep dropping to where her ${npcGenSize} cock disappears into your pussy.\n\n{mrs_thornwick}"I may have been... ambitious with the calibration." Her hips thrust of their own accord. Mortified. She straightens. It happens again. You grip her hips with your strong hands, taking over the rhythm, and the relief on her face is unmistakable. Someone else is directing. She doesn't have to.\n\n{mrs_thornwick}"...continue." A whisper. Not an instruction. A plea.`;
            } else if (thornwickM >= 4 && playerM <= 1) {
                vpText = `She lifts you, positions you, pushes her ${npcGenSize} cock into your pussy with administrative precision. One motion. She's already adjusted the angle before you've processed the change in position.\n\n{mrs_thornwick}"I believe I specified that you were to take charge." She thrusts — slow, deep, powerful. She is doing everything. {mrs_thornwick}"I'm allowing this." She pins your hips and drives deeper. Her eyes are fixed on where her cock enters you and her rhythm stutters at the visual. {mrs_thornwick}"I require —" The sentence never finishes.`;
            } else {
                vpText = `She positions her ${npcGenSize} cock at your pussy with focused precision, then hesitates — not from uncertainty, but because she's reviewing her own procedure. {mrs_thornwick}"The angle should be approximately —" She pushes inside and the instruction dissolves.\n\nHer hips thrust of their own accord and she's mortified. Does it again. And again. She's looking down, watching her cock disappear into you, and the visual combined with the sensation overwhelms the part of her brain that writes agendas. {mrs_thornwick}"I may have been — ambitious with —" Another thrust. She gives up on the sentence and grabs your hips instead.`;
            }
        } else {
            // Small cock — precision and control
            vpText = `She positions her ${npcGenSize} cock at your pussy with architectural precision. {mrs_thornwick}"The angle should be approximately —" She pushes in and her voice catches.\n\nModest, and she treats it the way she treats everything: as a variable to be optimized. She angles deliberately, watching your face to calibrate, adjusting by fractions until she finds the spot that makes your breath catch. {mrs_thornwick}"There. Maintain that exact —" She does it again. Deliberately.\n\nHer composure holds longer with precision work. She's managing. Directing. In control. Until her own hips buck without permission and she loses the thread of a sentence she was sure she'd memorized.`;
        }
        // VP stat modifiers
        if (thornwickC >= 5) {
            vpText += `\n\nHer massive chest sways with every thrust. She tries to manage them and they spill through her grip, bouncing with each motion. {mrs_thornwick}"If you could just — they keep —" She pushes them together, adjusts, and the motion makes her cock drive deeper. She was not prepared for that feedback. She does it again on purpose.`;
        }
        if (thornwickB >= 5) {
            vpText += `\n\nHer enormous ass provides momentum behind every thrust. The mass drives her deeper, harder. She reaches back, touches it, and the sensation of her own hand on that much flesh makes her rhythm stutter. {mrs_thornwick}"Ambition has consequences." She doesn't slow down.`;
        }
        if (playerC >= 4) {
            vpText += `\n\nHer hands find your chest between thrusts — cupping, testing. {mrs_thornwick}"Remarkable development." She does not let go. Her mouth finds your nipple and THEN the instructions stop. Her hips keep moving on their own.`;
        }
        if (playerB >= 4) {
            vpText += `\n\nShe grabs your ass with both hands and uses the grip to pull you onto her cock with each thrust. {mrs_thornwick}"I'm conducting an evaluation." She controls the depth through your hips with administrative precision.`;
        }
        // VP size overlay
        if (thornwickGS >= 2 && playerGS === 0) {
            vpText += `\n\nYour tight pussy grips her thick cock and her composure fractures. She watches herself disappear inside you with fixated attention. {mrs_thornwick}"The parameters are — the feedback is —" She grabs the workbench. The next instruction is just a moan.`;
        } else if (thornwickGS === 0 && playerGS >= 2) {
            vpText += `\n\nHer modest cock slides into your swollen, slick pussy — engulfed in plush heat. She angles for maximum effect with architectural precision. {mrs_thornwick}"The technique compensates for the — yes, precisely there." She finds the spot and hits it again. And again.`;
        } else if (thornwickGS >= 2 && playerGS >= 2) {
            vpText += `\n\nHer thick cock fills your swollen pussy completely — both oversized, both oversensitive. Every thrust makes her voice crack. {mrs_thornwick}"I require you to — to —" Composure gone. She grips harder and drives deeper and gives up on complete sentences.`;
        }

        // === PP: both penis ===
        let ppText;
        if (thornwickM >= 4 && playerM <= 1) {
            ppText = `She wraps her hand around both shafts — her ${npcGenSize} cock and your ${playerGenSize} length pressed together in her strong grip. She strokes with administrative purpose, watching both heads slide together.\n\n{mrs_thornwick}"The parallel stimulation should produce —" Her hips thrust into her own grip. She pauses. Straightens. Resumes as though that didn't happen. It happens again. Her powerful hand controls the pace, the pressure, the angle — she is directing, always directing — until both shafts pulse together and the direction becomes incoherent.`;
        } else if (playerM >= 5 && thornwickM <= 1) {
            ppText = `You take both cocks in hand — her ${npcGenSize} shaft and your ${playerGenSize} length — and she lets you. She leans back, blue eyes fixed on where the two shafts press together. For once, someone else is setting the agenda.\n\n{mrs_thornwick}"The rhythm should be — " You stroke. She loses the sentence. {mrs_thornwick}"I was going to say —" You stroke again. She stops trying. Her slight body softens against yours and she watches your hand work with an expression she will never, ever name.`;
        } else {
            ppText = `She wraps her hand around both shafts — her ${npcGenSize} cock and your ${playerGenSize} length pressed together. She strokes with practiced administrative purpose, like she's reviewing a document that requires a firm grip.\n\n{mrs_thornwick}"The parallel stimulation should produce —" Her hips thrust into her own grip. She pauses. Straightens. {mrs_thornwick}"As I was saying." She was not saying anything. She resumes stroking, watching both cocks slide together with focused attention.\n\nThe feedback loop — her hand on your shaft translating into pressure on hers — overwhelms the committee. Her rhythm accelerates without a vote. {mrs_thornwick}"I require —" She doesn't finish. She's giving orders her body won't follow.`;
        }
        // PP stat modifiers
        if (thornwickC >= 5) {
            ppText += `\n\nHer massive chest presses between them as she leans into the grip. She tries to manage the angle and her breasts engulf both shafts. She did not plan this. She adjusts. It happens again. She stops adjusting.`;
        }
        if (playerC >= 4) {
            ppText += `\n\nHer free hand finds your chest. Official. Evaluative. {mrs_thornwick}"Remarkable development." She cups you while stroking both cocks and her attention fractures between two sensations she can't manage simultaneously.`;
        }
        // PP size overlay
        if (playerGS >= 2 && thornwickGS >= 2) {
            ppText += `\n\nBoth thick, both throbbing — her hand barely wraps around both shafts. {mrs_thornwick}"I may have been... ambitious." She strokes harder, composure abandoned, eyes fixed on the sight. Her instructions have been replaced by sounds.`;
        } else if (playerGS === 0 && thornwickGS === 0) {
            ppText += `\n\nBoth modest — her hand wraps easily around both, fingers precise, every micro-adjustment calculated. She strokes with controlled rhythm, managing the encounter with architectural intent. Until the sensation builds past her ability to administrate.`;
        }

        const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };

        this.text = opening + '\n\n' + getSexSceneText('mrs_thornwick', branches);

        gameState.npcs.mrs_thornwick.trust += 1;
        saveState();
    },
    actions: [
        {
            label: 'Mrs. Thornwick reaches for a device...',
            nextScene: 'thornwick_sex_transform',
        },
        {
            label: 'Continue...',
            nextScene: 'thornwick_sex_closing'
        }
    ]
};

SCENES['thornwick_sex_transform'] = {
    id: 'thornwick_sex_transform',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('mrs_thornwick', 'transform');
        markTransformationSeen('mrs_thornwick');

        const thornwickBody = gameState.npcs.mrs_thornwick.body;
        const thornwickC = thornwickBody.chest;
        const thornwickM = thornwickBody.muscle;
        const thornwickB = thornwickBody.butt;
        const thornwickGS = thornwickBody.genitaliaSize;
        const thornwickHasVulva = thornwickBody.genitalia === 0;
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');
        const npcGenSize = getBodyStatDesc('mrs_thornwick', 'genitaliaSize');
        const npcChest = getBodyStatDesc('mrs_thornwick', 'chest');
        const npcButt = getBodyStatDesc('mrs_thornwick', 'butt');

        // === Tease: accidental trigger ===
        const tease = `Mrs. Thornwick flings a pillow — aiming for your face, missing entirely. It sails past and strikes a device on the workbench she hasn't noticed before. Small, polished, labeled 'Inner Beauty — Prototype.' The impact knocks it off the shelf and it cracks against the floor, releasing a warm shimmer that races across the room and envelops her. {mrs_thornwick}"What was — oh." She looks down at her arms. {mrs_thornwick}"Oh, that's — something is happening."`;

        // === Transform: foxgirl ===
        let transform = `White fur spreads across Mrs. Thornwick's skin like frost on a windowpane — short, dense, immaculately soft. It flows up her arms, across her stomach, down her thighs. Her ears reshape and migrate upward, becoming pointed fox ears that swivel atop her head, poking through her blonde hair which remains perfectly in place. Her face extends into a delicate snout — refined, narrow, almost aristocratic in its lines.`;

        transform += `\n\nA fluffy white tail unfurls from the base of her spine, thick and luxurious. It fans out behind her, then curls around her own thigh.`;

        transform += `\n\nShe looks down at herself. A town elder, covered in white fur, with a snout and a tail and pointed ears. She should be mortified.`;

        transform += `\n\n{mrs_thornwick}"Oh." She strokes the fur on her forearm. Short. Dense. Perfect. Her tail swishes. {mrs_thornwick}"Oh, very nice." She turns her arm, watching the white fur catch the lamplight. {mrs_thornwick}"Very nice indeed."`;

        transform += `\n\nShe runs both hands down her sides, feeling the fur over her curves — the familiar shape of her body beneath an unfamiliar pelt. Everything is exactly where she designed it. The workshop's modifications intact underneath. Inner beauty, the label said. Apparently her inner beauty is a fox. She does not seem to disagree.`;

        // p3 notice — larger in fox form
        if (!thornwickHasVulva && thornwickGS >= 3) {
            transform += `\n\nShe looks down and pauses. Her cock is — larger. Noticeably. The fur-covered shaft is thicker, heavier than it was a moment ago. She tilts her head, examining it with clinical interest that doesn't quite hide the pleased glint in her eye. {mrs_thornwick}"It appears the transformation has been... generous." Her tail wags once before she catches it.`;
        }

        // === Stat-based self-inspection / posing ===
        const isV3 = thornwickHasVulva && thornwickGS >= 3;

        if (isV3) {
            // v3: always fingering, regardless of stats
            transform += `\n\nShe runs her hands down her body — slow, deliberate, savoring every inch. The fur, the muscle underneath, the shape of herself remade. She smiles. Not the polite smile she wears in council meetings. A real one. Wide and sharp and hungry. The fox is beautiful and she knows it.`;
            transform += `\n\nHer hand drifts between her thighs and she doesn't hesitate. Her swollen folds are slick beneath the thin fur, thick and puffy and sensitive, and she parts them with two fingers and strokes with open, shameless pleasure. Her tail fans out behind her. Her smile doesn't waver.`;
            transform += `\n\n{mrs_thornwick}"A foxgirl." She laughs — low, warm, genuinely amused. {mrs_thornwick}"A foxgirl with a fat pussy." She rubs between her folds again, spreading them, letting you see. {mrs_thornwick}"There's an irony I'll be savoring for some time." Her ears swivel toward you, her blue eyes bright with arousal and delight. She is not embarrassed. She is not conducting an assessment. She is a fox admiring her own body and finding it spectacular.`;
            transform += `\n\nShe traces along her swollen lips again, hips rolling into her own touch, and the smile sharpens. {mrs_thornwick}"I have never felt this good in my own skin." She means the fur. She means everything underneath it. She looks at you with the confidence of a woman who has spent decades being composed and has just discovered something better.`;
        } else {
            const isGoddess = thornwickC >= 5 && thornwickB >= 5 && thornwickM >= 4;

            if (isGoddess) {
                // Goddess form: everything maxed, imposing, slightly low angle
                transform += `\n\nShe stands still for a moment. Just stands there. And you could swear she's bigger. Not just transformed — larger. The fox filled out what was already overwhelming and pushed it further. Massive breasts, arms that look permanently flexed, muscle rippling through white fur everywhere you look — shoulders, stomach, thighs. She fills the workshop. You're looking up at her and you don't remember when that started.`;

                transform += `\n\nShe feels it too. She straightens her spine and the movement adds another inch. Her fluffy white tail fans out behind her, slow and imperious. She looks down at you — literally down, her blue slit-pupils bright with a devious satisfaction that has nothing to do with composure or committees. She looks like something that was always inside Mrs. Thornwick, waiting for permission to stand at full height.`;

                if (thornwickHasVulva) {
                    if (thornwickGS >= 3) {
                        transform += `\n\nHer hand slides between her thighs. Her mound is impossible to miss — huge, swollen, an obvious shape even through the thin fur. She parts her folds with two fingers and moans. Not a gasp, not a sigh — a moan, open-mouthed and shameless, her ears pinning back with the intensity of it. {mrs_thornwick}"Oh." She strokes again, slower, and her thighs tremble. {mrs_thornwick}"Everything is more." Her other hand cups one massive breast, claws sinking into soft flesh, and she moans again when her thumb drags across the nipple. She doesn't choose between admiring herself and touching herself. She does both. The fox goddess with the fat pussy, pleasuring herself and looking down at you with that devious smile like she's deciding what to do with you next.`;
                    } else if (thornwickGS >= 2) {
                        transform += `\n\nHer hand slides between her thighs and she exhales — then moans, soft and surprised by the sound of her own voice. Her pussy is slick beneath the thin fur, sensitive, and she strokes once and her whole body shivers. {mrs_thornwick}"Everything is more." She cups one massive breast with her free hand, squeezing, thumb dragging across the nipple, and another moan escapes her — deeper this time, unguarded. She works between her legs with slow, deliberate strokes, looking down at you with bright, hungry eyes. Even her own touch is overwhelming in this body.`;
                    } else {
                        transform += `\n\nShe cups both breasts, lifting them, feeling their impossible weight in fur-covered hands. She squeezes and a moan rolls out of her — low, involuntary, her claws dimpling the soft flesh. {mrs_thornwick}"Everything is more." She runs one hand down her stomach, over the hard ridges of muscle beneath the pelt, and rests it on her hip. The other stays on her chest, thumb circling her nipple, and each pass draws another quiet sound from her throat. She looks down at you with that devious smile, her body a wall of white fur and power.`;
                    }
                } else {
                    transform += `\n\nHer cock stands against her powerful stomach — and even she stares. The fox made it bigger. Thick, fur-covered, visibly throbbing, larger than anything the workshop calibrated for.`;
                    if (thornwickGS >= 3) {
                        transform += ` Larger than yours, and she knows it — her eyes flick to your crotch and back, and that devious smile sharpens.`;
                    }
                    transform += ` She wraps one hand around it and strokes, and the moan that comes out of her is genuine — eyes half-closing, ears pinning back, her hips rolling into her own grip. {mrs_thornwick}"Everything is more." Her other hand cups one massive breast, claws sinking in, and she moans again at the combined sensation. Her fluffy white tail fans out rigid behind her. She strokes herself with slow, powerful pulls, muscle flexing in her arm with each one, looking down at you like a fox deciding when to pounce.`;
                }

                transform += `\n\n{mrs_thornwick}"I am perfection in a pelt." She says it looking down at you and it's not a boast. It's an observation. She is enormous, muscular, curved, furred — a goddess in white fox radiating heat, every inch of her body something she built in your workshop now set loose in a form that suits it. {mrs_thornwick}"You made this." She steps toward you and the floor creaks. {mrs_thornwick}"Every session. Every device." Another step. You're in her shadow now. {mrs_thornwick}"And now you get to find out what it feels like from underneath."`;

            } else if (thornwickC >= thornwickB && thornwickC >= thornwickM) {
                // Chest highest: showing off breasts
                transform += `\n\nShe cups her ${npcChest} and lifts — not testing the weight, enjoying it. White fur over soft flesh, the pelt making them look fuller, rounder. She squeezes and a sound escapes her that is entirely pleased. Her fluffy white tail sways behind her.`;
                transform += `\n\n{mrs_thornwick}"Look at these." She turns toward you, shoulders back, presenting. Not shy. Showing you. She runs her thumbs across her nipples through the fur and her breath catches — the fox's sensitivity turning a casual touch into something electric. She does it again, slower. {mrs_thornwick}"A fox with a figure like this." She smiles — wide, sharp, delighted. {mrs_thornwick}"I think I was meant to have fur."`;
            } else if (thornwickB >= thornwickM) {
                // Butt highest: teasing with her rear
                transform += `\n\nShe turns and looks back over her shoulder, one hand sliding down to rest on her ${npcButt}. White fur over generous curves, her fluffy tail lifting to give you an unobstructed view. She knows exactly what she's doing. She squeezes and watches your reaction with bright, amused eyes.`;
                transform += `\n\n{mrs_thornwick}"I can feel you staring." She shifts her weight, rolling her hips — slow, deliberate, letting the curve catch the lamplight. {mrs_thornwick}"Good." Her tail swishes, fanning across her rear and then lifting again like a curtain she keeps drawing back. She runs both hands over herself, feeling the fur over the shape she chose, and smiles. {mrs_thornwick}"Magnificent animal, wouldn't you say?"`;
            } else {
                // Muscle highest: flexing, powerful, predatory
                transform += `\n\nShe raises one arm and flexes. The muscle bunches under white fur — dense, powerful, every line of definition visible through the short pelt. She stares at it. Something shifts behind her eyes. Not surprise. Recognition. She flexes harder and a low sound rolls from her throat that isn't quite a growl and isn't quite a moan.`;
                transform += `\n\nShe rolls her shoulders and the fur ripples across her back — the muscle underneath coiled, animal, ready. Her fluffy white tail lashes behind her. She turns her arm in the lamplight, watching the definition shift, and her breath gets shorter. This is turning her on — not the fur, not the ears, the raw awareness of what her body can do wrapped in something wild.`;
                transform += `\n\n{mrs_thornwick}"I built this body one session at a time in your workshop. But I didn't feel it until now." She looks at you and smiles. Predator's smile. She steps closer, clawed hand settling on your shoulder, grip firm enough to make a point. {mrs_thornwick}"Do you understand what I could do to you?" Not a threat. An offer. Her eyes trace down your body slowly, appraisingly, the way a fox looks at something it's already decided to have. {mrs_thornwick}"Anything I want." The words come out breathless. She likes how they sound. Her grip tightens on your shoulder, pulling you a fraction closer. {mrs_thornwick}"And I want quite a lot." Her tail is rigid with excitement.`;
            }
        }

        // Transition to sex — fox stalking her prey
        transform += `\n\nA low growl rolls from her chest — not a warning, a purr. She catches your expression and her smile widens. Pointed ears forward. Blue slit-pupils fixed on you. She shifts her weight and begins to circle — slow, unhurried, one foot crossing the other, her fluffy white tail trailing behind her in a lazy arc. The movement is liquid. Predatory. She is stalking you across the workshop floor and she is enjoying every step.`;

        transform += `\n\n{mrs_thornwick}"You know what foxes do, don't you?" She stops in front of you. Close. The fur on her arm brushes your skin and it's impossibly soft. She tilts her head — an animal gesture, curious, appraising — and her ears swivel toward the sound of your breathing. {mrs_thornwick}"They take what they want." Her clawed hand settles on your hip. Light. Precise. Possessive. {mrs_thornwick}"And I have decided what I want."`;

        transform += `\n\nShe pushes you back toward the workbench with one hand. Not rough. Patient. A fox that has cornered something and sees no reason to rush. Her smile hasn't dimmed. {mrs_thornwick}"Now then." Her tail curls around your thigh. {mrs_thornwick}"My prize."`;

        // === Genital branches (no oral — snout prevents it) ===

        let pvText = `She turns and braces one hand against the workbench, her fluffy tail lifting to curl aside. The pose is deliberate — chosen, presented, elegant even on all fours. {mrs_thornwick}"You may proceed." The familiar instruction, but underneath it a rough warmth has settled into her voice.`;
        pvText += `\n\nYou grip her fur-covered hips and push your ${playerGenSize} cock into her pussy. The fur is impossibly soft under your hands, short and dense, warming where your skin meets it. She braces — claws, she has claws now — clicking against the wood.`;
        if (thornwickGS >= 3) {
            pvText += `\n\nHer swollen pussy grips you with heightened sensitivity — she gasps mid-instruction, the words dissolving. {mrs_thornwick}"The angle should be —" A growl swallows the sentence. Her ears pin flat, her tail tightens around your thigh, pulling you deeper. Every thrust presses fur against skin, soft and alien and overwhelming.`;
        } else {
            pvText += `\n\n{mrs_thornwick}"The angle should be —" She adjusts her hips, directing even now. But each thrust makes the instructions shorter, breathier. Her tail wraps around your thigh, pulling you deeper — betraying what her voice won't admit. The fur on her hips is impossibly soft against your hands as she pushes back to meet you.`;
        }
        pvText += `\n\nHer ears flatten with each thrust, her tail tightening its grip on your leg. The instructions have thinned to single words — {mrs_thornwick}"there" and {mrs_thornwick}"harder" — and then to sounds the fox makes instead, low and rough and nothing like the town elder who walked in.`;

        let vvText = `She pulls you down beside her, fur-covered body pressing against your skin. Every point of contact is dense white pelt — warm, yielding, impossibly soft. She takes your hand and places it between her legs with the precision of a woman arranging a committee agenda.`;
        vvText += `\n\n{mrs_thornwick}"Here." She guides your fingers to her pussy, showing you exactly where. The fur is thinner between her thighs, silky, slick with arousal. Her hips press into your hand the moment you touch her.`;
        if (thornwickGS >= 3) {
            vvText += ` Her swollen folds are even more sensitive in this form — thick, puffy, every touch amplified. She shudders, jaw clenching. {mrs_thornwick}"That's —" A growl interrupts the critique. She blinks. {mrs_thornwick}"I'm only kidding." She is not entirely kidding. Her tail thrashes.`;
        } else {
            vvText += ` {mrs_thornwick}"A bit more pressure — yes. Precisely." The composure cracks in increments. Her tail starts to swish.`;
        }
        vvText += `\n\nHer own hand finds your pussy in return — clawed fingers surprisingly precise, careful. She works you with the same meticulous attention she brings to everything, measuring reactions, adjusting pressure. But her tail is thrashing now, betraying urgency the instructions don't show. The fur on her arm brushes your inner thigh with every stroke, impossibly soft, and the contrast between her precise fingers and that wild tail says everything she won't.`;

        let vpText;
        if (thornwickGS >= 3) {
            vpText = `Her fox-form cock is bigger than it was — she's pretending she hasn't noticed. The fur-covered shaft is thick, warm, visibly throbbing. She positions herself between your legs with administrative precision that her trembling tail undermines entirely.`;
            vpText += `\n\n{mrs_thornwick}"I'll proceed carefully. The proportions seem to have —" She pushes her huge cock into your pussy and the sentence ends. Her ears pin flat against her head, eyes screwing shut. Every inch registers through the fox's amplified senses, fur-covered hips pressing against your thighs.`;
            vpText += `\n\nShe starts thrusting, her fluffy tail fanning out behind her. She tries to maintain a measured pace. Fails. {mrs_thornwick}"I am in complete —" A growl, low and rough. Her hips drive harder. {mrs_thornwick}"— control." She is not in control. Her tail lashes with every thrust, her claws dig into the sheets, and the dignified instructions have dissolved into sounds that are entirely fox.`;
        } else {
            vpText = `She positions herself between your legs, her modest cock rigid beneath the fur. Even in fox form, she knows this body — the fit, the angles. She pushes into your pussy with deliberate precision, clawed hands bracing on either side of you.`;
            vpText += `\n\n{mrs_thornwick}"Adequate depth." She adjusts the angle by a fraction — always directing. But the fox's senses amplify everything. Each thrust makes her ears twitch, her tail curl, small sounds escape her snout that she didn't authorize. The fur on her thighs brushes against your skin with every stroke, soft contrasting with the firm pressure inside you.`;
            vpText += `\n\nHer rhythm builds, instructions getting shorter. {mrs_thornwick}"The angle should remain —" A low growl rolls up her throat. She swallows it. Her tail wraps around your calf, grip tightening with each thrust. The administrator is still present. But the fox is gaining ground.`;
        }

        let ppText = `She wraps a fur-covered hand around both cocks, pressing them together. The pelt is downy-soft between the shafts — a sensation neither of you expected. She stares at the contact with scholarly interest that is rapidly losing its scholarly qualities.`;
        if (thornwickGS >= 3) {
            ppText += `\n\nHer fox-form cock is noticeably larger — thick, the fur-covered shaft straining against yours. She strokes and the friction through soft white fur makes her jaw clench. {mrs_thornwick}"The transformation appears to have augmented —" Her eyes flutter shut. She loses the sentence entirely. Her hand speeds up, grip tightening, tail lashing behind her.`;
        } else {
            ppText += `\n\nShe strokes with the precision of a woman who has read extensively on the subject. Both shafts fit neatly in her furred grip. She builds a rhythm, adjusting pressure with each pass. {mrs_thornwick}"Tell me if the pressure requires —" A growl. She clears her throat. {mrs_thornwick}"— adjustment." Her composure is thinning. Her tail has wrapped around your hip without permission.`;
        }
        ppText += `\n\nYour ${playerGenSize} cock and her ${npcGenSize} shaft slide together in her fur-lined grip, impossibly soft friction that makes her ears pin flat. She keeps stroking, the instructions getting shorter and more breathless. Her free hand grips your arm, claws pricking skin. The fox doesn't need to give directions. The fox knows what it's doing.`;

        const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };

        // === Climax ===
        const climax = `\n\nThe climax comes with a sharp, vulpine cry — high and wild, echoing off the workshop walls. Mrs. Thornwick's back arches, ears pinned flat, tail rigid. For one perfect moment the administrator is gone entirely. There is only the fox, and the fox is undone.\n\nShe shudders through the aftershocks, claws scratching the sheets, small whimpers escaping her snout. Her tail twitches with each wave. When her eyes finally open, they're bright. Satisfied. Not mortified. Not yet.`;

        // === Revert ===
        const revert = `\n\nThe fur recedes like snow melting in sunlight — white retreating from her fingertips, her arms, her stomach. The snout shortens, smooths, becomes a proper mouth again. The ears slide down and reshape. Her claws soften into nails. Last to go is the tail — it thins, pales, and vanishes.\n\nMrs. Thornwick blinks. Human again. She touches her face. Smooth skin. She looks at her arms — bare, furless, ordinary. Something flickers across her expression that might, if you squinted, be disappointment.\n\n{mrs_thornwick}"We will never speak of this." She smooths her hair. Her voice is steady. But her hand lingers where the tail was. {mrs_thornwick}"Though I may need to examine that device again. For documentation purposes."`;

        this.text = tease + '\n\n' + transform + '\n\n' + getSexSceneText('mrs_thornwick', branches) + climax + revert;
    },
    actions: [
        { label: 'Continue...', nextScene: 'thornwick_sex_closing' }
    ]
};

SCENES['thornwick_sex_closing'] = {
    id: 'thornwick_sex_closing',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('mrs_thornwick', 'base');

        const npcBody = gameState.npcs.mrs_thornwick.body;
        const playerBody = gameState.player.body;
        const thornwickM = npcBody.muscle;
        const thornwickC = npcBody.chest;
        const thornwickB = npcBody.butt;
        const thornwickGS = npcBody.genitaliaSize;
        const thornwickHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerB = playerBody.butt;
        const sawTransform = hasSeenTransformation('mrs_thornwick');
        const isGoddess = thornwickC >= 5 && thornwickB >= 5 && thornwickM >= 4;
        const npcGenSize = getBodyStatDesc('mrs_thornwick', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        let text = '';

        // === CLIMAX (skip if transform path already delivered it) ===
        if (!sawTransform) {
            let climaxText = `The climax takes Mrs. Thornwick by surprise. Not the fact of it — she anticipated that, she had an agenda — but the sound. The sound she makes is not on any agenda. It tears from her throat, raw and undignified and utterly beyond her control.\n\nHer composure doesn't crack. It detonates. Her body moves without authorization — arching, grabbing, wrapping. Her mouth opens and what comes out is not a sentence with subordinate clauses. It is not a sentence at all.`;

            const branches = {
                'pv': thornwickM >= 4 ? `\n\nHer powerful body clamps around you — pussy clenching hard on your ${playerGenSize} cock, legs locked, arms pulling you deep with strength that could bend iron. She rides the orgasm with her whole frame and the instructions have been replaced by sounds that will haunt the workshop walls.` : `\n\nHer pussy clenches around your ${playerGenSize} cock — rhythmic, involuntary, nothing controlled about it. Her hips stutter and she grips whatever she can find. She makes a sound she will never acknowledge. {mrs_thornwick}"I didn't authorize that." She means the moan, not the orgasm. Both were unauthorized.`,
                'vv': `\n\nHer fingers curl inside you as she comes — precision gone, just pressure and need. Her hips buck against your hand and she grips your wrist hard enough to leave marks she'll later attribute to the workbench. Her whole body shakes with something she will spend days pretending didn't happen.`,
                'vp': `\n\nHer ${npcGenSize} cock pulses inside you — she thrusts through the orgasm, unable to stop, rhythm shattering. Her hands grip your hips and pull you down onto her, taking everything. {mrs_thornwick}"I didn't —" She can't finish. She doesn't need to. Her body has overruled the committee entirely.`,
                'pp': `\n\nBoth cocks pulse in her grip — hers and yours together, the sensation cascading between them. She strokes through it, hand tightening, rhythm demolished, composure in ruins. The sound she makes is one she will deny to her dying day.`
            };

            text += climaxText + getSexSceneText('mrs_thornwick', branches);
        }

        // === COMEDOWN (stat-priority) ===
        let comedown;
        if (isGoddess) {
            comedown = `\n\nVast, powerful, utterly wrecked. Mrs. Thornwick reaches for her hair with a hand that's shaking. The composure won't reassemble. She tries — smoothing, straightening — and her hand trembles so badly she drops it.\n\nShe's quiet. Genuinely quiet, not performing quiet. For the first time in the scene there are no instructions, no corrections, no feedback. She pulls you against her enormous body and holds you there. Doesn't explain why. Doesn't frame it as an evaluation.\n\nFor once, she has nothing to say.`;
        } else if (thornwickC >= 5) {
            comedown = `\n\nYour head rests against her massive chest. She looks down, starts to say something managerial, and just... strokes your hair instead. Her heartbeat is still fast. You can feel it through all that softness, rapid and undignified.\n\n{mrs_thornwick}"That was... well-executed." The highest praise she knows how to give. Her hand keeps stroking your hair. She doesn't comment on it. She doesn't stop.`;
        } else if (thornwickM >= 4) {
            comedown = `\n\nShe's still holding you in position with one arm. Doesn't realize she hasn't let go. Minutes pass before she notices, and she releases you with a murmured {mrs_thornwick}"apologies" that doesn't sound sorry.\n\nShe flexes her hand, watching the muscle. {mrs_thornwick}"I may have been overzealous with the calibration." She sits on the edge of the workbench and her powerful frame takes up more space than the town elder used to. She straightens her spine. The composure rebuilds, layer by layer, thinner than before.`;
        } else if (thornwickB >= 5) {
            comedown = `\n\nShe sits on the edge of the workbench and her enormous rear reshapes the surface beneath her. She reaches back, touches it, sighs. {mrs_thornwick}"Ambition has consequences." She pulls the blanket around herself.\n\nThe dignified posture returns but the flush stays. She adjusts the blanket. Adjusts it again. Every shift grinds her against the surface and she pretends not to notice.`;
        } else if (thornwickC <= 1 && thornwickM <= 1) {
            comedown = `\n\nSmaller, sharper. The composure snaps back faster without the overwhelming body to fight. She dresses efficiently — each garment in reverse order, each fold precise. The committee chair is reassembling.\n\nBut she sits back down on the edge of the workbench instead of leaving. {mrs_thornwick}"I have a few notes." She doesn't have notes. She wants to stay. Her blue eyes meet yours and hold there longer than necessary.`;
        } else {
            comedown = `\n\nShe dresses with precision, each garment in order. The composure rebuilds layer by layer — smoothing hair, straightening fabric, buttoning with practiced fingers. The town elder is reconstructing herself from the wreckage.\n\nShe pauses with her hand on the last button. {mrs_thornwick}"This was adequate." Then, quieter: {mrs_thornwick}"You may schedule a follow-up at your convenience." She means tomorrow. She buttons her dress incorrectly and doesn't notice.`;
        }
        text += comedown;

        // === Transform callback ===
        if (sawTransform) {
            text += `\n\nShe touches her ears reflexively. They're normal. Human. She checks twice. {mrs_thornwick}"That device requires immediate containment." A pause. {mrs_thornwick}"After further study, of course. For public safety purposes."`;
        }

        // === Player standout modifiers ===
        if (playerC >= 4) {
            text += `\n\nHer hand rests on your chest. Official. Evaluative. Her thumb traces a slow circle that is not official or evaluative. She doesn't move her hand.`;
        }
        if (playerB >= 4) {
            text += `\n\nShe adjusts your blanket. The adjustment requires touching your hip. And staying there. {mrs_thornwick}"Just ensuring you're comfortable." Her hand does not move.`;
        }

        // === Exit line ===
        text += `\n\n{mrs_thornwick}"We will never speak of this." She smooths her hair one final time. Her blue eyes meet yours and hold there — warmer than they've ever been. The composure is back, but it's thinner now. There are cracks she can't quite plaster over.\n\nA pause. {mrs_thornwick}"Though I may require a... follow-up assessment. For public safety purposes."`;

        this.text = text;
    },
    actions: [
        { label: 'Return to workshop', nextScene: 'workshop_main' }
    ]
};

