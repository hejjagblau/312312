// ============================================
// DELLA SCENES
// Extracted from scenes.js for modularity
// ============================================

// ==========================================
// DELLA SCENES
// ==========================================

SCENES['della_greeting'] = {
    id: 'della_greeting',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'happy');

        // Check if already interacted this phase
        if (hasInteractedThisPhase('della')) {
            this.text = getAlreadyInteractedMessage('della');
            this.actions = [{ label: 'Leave', nextScene: 'location_bakery' }];
            return;
        }

        // Check if this is the first meeting (introduction)
        const intro = getNpcIntroduction('della');
        if (intro) {
            this.text = intro.text;
            this.speaker = intro.speaker;
            markNpcIntroCompleted('della');
            updateNpcLastSeenPlayer('della');
            this.actions = [
                {
                    label: 'Continue',
                    nextScene: 'location_bakery',
                    effects: [
                        { type: 'addTrust', npc: 'della', amount: 1 },
                        { type: 'recordNpcInteraction', npc: 'della' }
                    ]
                }
            ];
            return;
        }

        // Check for regret event (NPC went too far with transformations)
        const regretData = checkGreetingRegretEvent('della');
        if (regretData) {
            SCENES['regret_event']._regretData = regretData;
            SceneManager.playScene('regret_event');
            return;
        }

        // Check for genital proposal, goddess reveal, or archetype celebration
        const dellaArchEvent = checkGreetingArchetypeEvent('della');
        if (dellaArchEvent && (dellaArchEvent.type === 'proposal' || dellaArchEvent.type === 'goddess_reveal' || dellaArchEvent.type === 'celebration')) {
            SceneManager.playScene(dellaArchEvent.sceneId);
            return;
        }

        const reaction = getNpcReactionToChanges('della');
        if (reaction) {
            this.text = `Della looks at you with motherly concern. "${reaction}"\n\n"Well now, dear. Would you like a fresh pastry? Just out of the oven!"`;
        } else {
            this.text = "\"Hello, dear! Would you like a fresh pastry? Just out of the oven!\" Della gestures warmly at her display case.";
        }
        updateNpcLastSeenPlayer('della');

        // Build normal actions
        this.actions = [
            { label: 'Yes please (5 coin)', nextScene: 'della_buy_pastry' },
            {
                label: 'Chat',
                nextScene: 'della_chat',
                condition: () => !hasInteractedThisPhase('della'),
                effects: [{ type: 'recordNpcInteraction', npc: 'della' }]
            }
        ];

        // Invite to workshop if desire is known and NPC can be transformed
        const dellaState = gameState.npcs.della;
        const dellaDesireKnown = dellaState?.desireKnownToPlayer || dellaState?.desireRevealed;
        const dellaHasGoal = dellaDesireKnown && dellaState?.currentDesire;
        if (canTransformNpc('della').canTransform && dellaHasGoal && !isNpcSatisfied('della')) {
            this.actions.push({
                label: 'Invite to workshop',
                nextScene: 'della_invite_workshop',
                condition: () => !hasInteractedThisPhase('della'),
                effects: [{ type: 'recordNpcInteraction', npc: 'della' }]
            });
        }

        if (canFlirtWithNpc('della').canFlirt) {
            this.actions.push({
                label: 'Flirt',
                nextScene: 'della_flirt_1',
                condition: () => !hasInteractedThisPhase('della'),
                effects: [{ type: 'recordNpcInteraction', npc: 'della' }]
            });
        }

        const dellaThresholds2 = getNpcTrustThresholds('della');
        if ((dellaState?.trust || 0) >= dellaThresholds2.intimate || dellaState?.archetypeIntimateReady) {
            this.actions.push({
                label: 'Intimate...',
                nextScene: 'della_sex_intro',
                condition: () => !hasInteractedThisPhase('della'),
                effects: [{ type: 'recordNpcInteraction', npc: 'della' }]
            });
        }

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
};

SCENES['della_buy_pastry'] = {
    id: 'della_buy_pastry',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: "Della wraps up a delicious honey cake for you.\n\n\"Here you go, dear. Made with love, as always.\" She pats your hand. \"You look like you needed something sweet today.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'kind');
        if (gameState.player.coin >= 5) {
            gameState.player.coin -= 5;
            gameState.npcs.della.trust += 1;
            saveState();
            UI.updatePlayerSidebar();
        }
    },
    actions: [
        { label: 'Thank you', nextScene: 'della_greeting' }
    ]
};

SCENES['della_chat_1'] = {
    id: 'della_chat_1',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: "\"Your uncle had quite the sweet tooth, you know. Came by every week for my honey cakes.\" She smiles fondly. \"Always said they reminded him of someone. Never told me who.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'nostalgic');
        gameState.npcs.della.trust += 1;
        gameState.flags.knowledge_hint_honeycakes = true;
        saveState();
    },
    actions: [
        { label: 'Did he talk about his work?', nextScene: 'della_chat_1b' },
        { label: 'He sounds lonely', nextScene: 'della_chat_1c' },
        { label: 'Continue', nextScene: 'location_bakery' }
    ]
};

SCENES['della_chat_1b'] = {
    id: 'della_chat_1b',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: "\"Not much, dear. He was a private man. But sometimes, when he'd had a bit of my elderberry wine, he'd talk about 'helping people become who they really are.'\" She chuckles. \"I never quite understood what he meant.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'thoughtful');
    },
    actions: [
        { label: 'Continue', nextScene: 'della_greeting' }
    ]
};

SCENES['della_chat_1c'] = {
    id: 'della_chat_1c',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: "Della's eyes soften. \"I think he was, dear. Very lonely. But he had his work, and that seemed to be enough for him.\" She pats your hand. \"I'm glad you're here now. This town needs more young people.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'kind');
        gameState.npcs.della.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'della_greeting' }
    ]
};

SCENES['della_chat_2'] = {
    id: 'della_chat_2',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: "Della sighs, stretching her back. \"The trouble with being a baker is all the kneading and lifting. I'm not as strong as I used to be.\" She rubs her arm. \"My muscles just aren't what they once were.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'thoughtful');
        gameState.npcs.della.trust += 1;
        gameState.flags.della_mentioned_muscle = true;
        saveState();
    },
    actions: [
        { label: 'You look wonderful as you are', nextScene: 'della_chat_2b' },
        { label: 'Would you want to change that?', nextScene: 'della_chat_2c' },
        { label: 'Continue', nextScene: 'location_bakery' }
    ]
};

SCENES['della_chat_2b'] = {
    id: 'della_chat_2b',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: "Della blushes, looking pleased. \"Oh, you're sweet. Just like my pastries.\" She laughs warmly. \"But thank you, dear. It's nice to hear.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'blushing');
        gameState.npcs.della.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'della_greeting' }
    ]
};

SCENES['della_chat_2c'] = {
    id: 'della_chat_2c',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: "Della considers the question. \"Change? At my age?\" She chuckles. \"Well... maybe I could use a bit more strength. Would make the kneading easier. But it's just a silly thought.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'considering');
        gameState.flags.della_desire_muscle_revealed = true;
        gameState.npcs.della.desiresRevealed[0] = true;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'della_greeting' }
    ]
};

SCENES['della_chat_3'] = {
    id: 'della_chat_3',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: "After a few drinks at the tavern, Della leans in with a giggly whisper. \"Can I tell you something silly? Don't laugh, but... I've always wanted a bigger behind. Like those women in the old paintings - all curves and grace.\" She dissolves into giggles. \"Ridiculous at my age, isn't it?\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'giggling');
        gameState.flags.della_desire_butt_revealed = true;
        gameState.npcs.della.desiresRevealed[2] = true;
        saveState();
    },
    actions: [
        { label: 'Not ridiculous at all', nextScene: 'della_chat_3b' },
        {
            label: 'I could make that happen',
            nextScene: 'della_offer_butt',
            condition: () => gameState.day >= 4  // After getting more familiar with devices
        },
        { label: 'Continue', nextScene: 'location_bakery' }
    ]
};

SCENES['della_chat_3b'] = {
    id: 'della_chat_3b',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: "Della's cheeks turn pink. \"Oh, you're too kind, dear. At my age, silly dreams are all I have.\" She pats your hand. \"But thank you for not laughing.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'blushing');
        gameState.npcs.della.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'location_bakery' }
    ]
};

SCENES['della_offer_butt'] = {
    id: 'della_offer_butt',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: "Della's eyes go wide. \"You... you're not joking?\" Her hands flutter to her chest. \"Oh my... I never thought... at my age, I never expected anyone would...\" She tears up a little. \"Would you really do that for me?\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'hopeful');
    },
    actions: [
        { label: 'Of course. Come to my workshop.', nextScene: 'della_accept_workshop_invite' },
        { label: 'Let me prepare first', nextScene: 'location_bakery' }
    ]
};

SCENES['della_accept_workshop_invite'] = {
    id: 'della_accept_workshop_invite',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: "Della dabs at her eyes with her apron. \"Thank you, dear. I'll close up shop and come by tomorrow morning. Before the breakfast rush.\" She hugs you warmly. \"You're a blessing to this old baker.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'grateful');
        gameState.npcs.della.trust += 1;
        gameState.flags.della_workshop_visit_scheduled = true;
        gameState.flags.della_workshop_visit_triggered = false;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'location_bakery' }
    ]
};

SCENES['della_workshop_arrival'] = {
    id: 'della_workshop_arrival',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        // Skip intro on repeat visits
        if (gameState.npcs.della.firstDesireFulfilledDay !== null) {
            SceneManager.playScene('della_transformation_ready');
            return 'redirect';
        }
        this.image = getNpcImagePathSimple('della', 'nervous');
        this.text = "A gentle knock at your door. Della enters, still dusted with flour, looking nervous but hopeful.\n\n{della}\"I hope I'm not too early, dear. I couldn't sleep last night thinking about... well, you know.\" She wrings her hands. {della}\"Is this really happening? I feel like a young girl with a secret!\"";
    },
    actions: [
        { label: "It's really happening", nextScene: 'della_transformation_ready' },
        { label: 'We can wait if you need time', nextScene: 'della_transformation_delay' }
    ]
};

SCENES['della_transformation_delay'] = {
    id: 'della_transformation_delay',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: "Della shakes her head firmly. \"No, no. I've waited fifty years for something like this. If I wait any longer, I'll lose my nerve.\" She takes a deep breath. \"Let's do this, dear.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'determined');
    },
    actions: [
        { label: 'As you wish', nextScene: 'della_transformation_ready' }
    ]
};

SCENES['della_transformation_ready'] = {
    id: 'della_transformation_ready',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('della');
        gameState.currentTransformationTarget = 'della';
        saveState();

        const npc = gameState.npcs.della;
        const desire = npc?.currentDesire;
        const label = desire?.label?.toLowerCase() || 'a change';
        const thresholds = getNpcTrustThresholds('della');
        const horny = (npc.trust >= thresholds.intimate) || npc.hiddenArchetype === 'goddess';

        if (horny) {
            this.text = `Della fans herself, cheeks pink, fidgeting with the hem of her apron.\n\n{della}"So, ${label}." She laughs — too loud, too giddy. {della}"I've been thinking about it all morning and I may have burned two batches of scones." She bites her lip, eyes bright. {della}"Oh dear, let's just do it before I lose my nerve."`;
        } else {
            this.text = `Della smooths her apron and takes a steadying breath.\n\n{della}"${label[0].toUpperCase() + label.slice(1)}, dear." She wrings her hands once, then clasps them together firmly. {della}"I'm ready. It's time I stopped just dreaming about it."`;
        }
    },
    actions: [
        { label: 'Select a device', nextScene: 'device_selection' },
        { label: 'Changed your mind?', nextScene: 'workshop_main' }
    ]
};

SCENES['della_transform_butt'] = {
    id: 'della_transform_butt',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "The device activates with a warm glow. Della gasps, gripping the handles.\n\n{della}\"Oh! Oh my!\" Her eyes close as the transformation begins. {della}\"It's... it's happening! I can feel it!\"",
    onEnter: function() {
        this.image = 'images/transformations/transform_butt_5.webp';
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.della_transformation_complete) {
            gameState.npcs.della.body.butt = 5;
            gameState.npcs.della.trust += 5;
            gameState.flags.della_transformation_complete = true;
            recordNpcBodyChange('della');
            saveState();
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'della_transform_butt_success' }
    ]
};

SCENES['della_transform_butt_success'] = {
    id: 'della_transform_butt_success',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "Della stares at herself in wonder as the transformation completes.\n\n{della}\"Oh my... oh goodness...\" She starts to laugh, tears forming in her eyes. {della}\"I look like a painting! A real painting!\"\n\nShe turns to you, dabbing her eyes with her apron. {della}\"I never thought... at my age... thank you, dear. Thank you so much.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'overjoyed');
    },
    actions: [
        { label: 'Continue', nextScene: 'della_transform_aftermath' }
    ]
};

SCENES['della_transform_aftermath'] = {
    id: 'della_transform_aftermath',
    image: '',
    imagePrompt: null,
    speaker: 'Della',
    text: `Della adjusts her now-snug dress, laughing through her tears. Her hands keep drifting back to her curves, smoothing the fabric over flesh that wasn't there minutes ago.

"I'll have to let out all my clothes! And oh, the looks I'll get..." She grins mischievously - an expression you've never seen on her before. "Let them look. For once, I'm going to enjoy being looked at."

She pulls you into a flour-dusted embrace, and you feel her transformed body press against yours - warm and soft and substantial in ways it wasn't before. The scent of baked bread and vanilla surrounds you as she holds you close.

"Free pastries for life, dear. It's the least I can do." Her voice is thick with emotion as she squeezes you tight. "You've given an old woman a second chance to feel beautiful."`,
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'happy');
        gameState.npcs.della.trust += 3;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

SCENES['della_flirt_1'] = {
    id: 'della_flirt_1',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "{player}\"You know, your pastries aren't the only sweet thing in this bakery.\" You give her a warm smile.\n\nDella nearly drops her rolling pin, flustered. {della}\"Oh! Oh my... at my age, I...\" She fans herself with her apron. {della}\"Well, aren't you a charmer!\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('della', 'flustered');
        gameState.npcs.della.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'della_greeting' }
    ]
};


// ============================================
// DELLA SEX SCENES
// ============================================

SCENES['della_sex_intro'] = {
    id: 'della_sex_intro',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('della', 'base');
        markSexUnlocked('della');

        // --- Variables ---
        const npcBody = gameState.npcs.della.body;
        const playerBody = gameState.player.body;
        const dellaM = npcBody.muscle;
        const dellaC = npcBody.chest;
        const dellaB = npcBody.butt;
        const dellaGS = npcBody.genitaliaSize;
        const dellaHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerM = playerBody.muscle;
        const playerB = playerBody.butt;
        const playerGS = playerBody.genitaliaSize;
        const npcInSkirt = dellaB >= 5 || (!dellaHasVulva && dellaGS >= 3);
        const playerInSkirt = playerB >= 5 || (playerBody.genitalia === 1 && playerGS >= 3);
        const npcChest = getBodyStatDesc('della', 'chest');
        const npcButt = getBodyStatDesc('della', 'butt');
        const npcGenSize = getBodyStatDesc('della', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        // --- Part 1: Della's Body (muscle-branched with chest sub-branches) ---
        let part1;
        if (dellaM <= 1) {
            if (dellaC <= 1) {
                part1 = `Della unties her flour-dusted apron with careful hands, folding it neatly on the bedside table before setting her kerchief beside it. Even now, she tidies.\n\n{della}"I've been thinking about this," she admits, not quite meeting your eyes. {della}"For longer than I should probably say." She unbuttons her blouse slowly, fingers fumbling once, twice. Her chest is nearly flat — warm brown skin over gentle ribs, smaller than she's used to. Her hands go to cover herself, find nothing to cover, and hover there.\n\n{della}"I'm sorry, I know there's not much to..." She trails off. You take her hands and lower them, and the directness of your mouth on her bare skin makes her gasp — no buffer, nothing between you and her. Just warmth and contact and the softness of her everywhere else. She pulls you closer, wrapping around you, her whole body yielding and light in a way that startles her.\n\n{della}"Oh. You can just... all of me." Her voice catches. Soft everywhere. No resistance. Everything you do moves her.`;
            } else if (dellaC <= 3) {
                part1 = `Della unties her flour-dusted apron with careful hands, folding it neatly on the bedside table before setting her kerchief beside it. Even now, she tidies.\n\n{della}"I've been thinking about this," she admits, not quite meeting your eyes. {della}"For longer than I should probably say." She unbuttons her blouse slowly, fingers fumbling once, twice. Her ${npcChest} are fuller than the modest dress suggested — soft, warm brown skin dusted with flour she missed. She covers them instinctively, then forces her hands down.\n\n{della}"I'm sorry, it's been... it's been a very long time." She laughs, embarrassed, fanning herself with one hand. Her body is soft and yielding — everything about her gives when you touch her, warm dough under warm hands. She pulls you close and melts into you, her chest pressing against yours like she's been waiting years for this exact contact.`;
            } else {
                part1 = `Della unties her flour-dusted apron and folds it on the bedside table. Her blouse comes off slowly — fumbling, apologetic — and her chest spills free. Her ${npcChest} are heavy on her soft frame, warm and full, and she cradles them instinctively.\n\n{della}"I'm sorry, they're just — I did say I wanted to try them this size, but I didn't think they'd be so..." She looks down at them, flushed. Then she looks at you looking at them, and something shifts. She straightens. Shows them without admitting she's showing them.\n\nYou press your face between them and she makes a sound — soft, surprised, not quite a moan. Her hand finds the back of your head and holds you there. {della}"Oh. Oh, that's..." She strokes your hair. What started as nurturing becomes something else — she presses her chest harder against your face and starts rolling slowly, dragging her breasts up and down against you. The friction makes her breath catch. She does it again, deliberate this time, pulling you tighter, chasing the feeling of them shifting and rubbing against warm skin, and at some point 'dear' became a breath she can't finish.`;
            }
        } else if (dellaM <= 3) {
            part1 = `Della unties her apron and folds it on the bedside table. The blouse comes off and the body underneath has changed — toned arms, definition through her stomach, strength she didn't used to carry. Her ${npcChest} settle as the fabric passes, and she runs her hand down her own arm, surprised by the firmness.\n\n{della}"I've been thinking about this." She steps toward you, and there's a sureness in her stance that's new. She wraps her arms around you and pulls — and is startled by the possessiveness of her own grip. You don't move. She pulled you against her and held you there, and for a moment she doesn't know what to do with the strength behind the gesture.\n\n{della}"I didn't mean to — well." A flush climbs her neck. {della}"Stay." Her hands find your back, stroking, still trying to take care of you. But her legs wrap around your hip and pull you closer, and the instinct in it shocks her more than the strength.`;
        } else if (dellaM === 4) {
            part1 = `Della unties her apron and folds it with hands that could crush the bedframe. She doesn't notice. She never notices. Her blouse comes off and her body fills the space — powerful shoulders, thick arms, dense muscle under soft brown skin. Her ${npcChest} sit on a chest wall that could crack stone.\n\n{della}"I've been thinking about this, dear." She steps toward you and the floor feels it. She pulls you close and her grip is immovable — not tight, just absolute. She braces against the bedframe with one hand and it creaks.\n\n{della}"Oh, I'm sorry, was that too —" She loosens her grip. You pull her harder against you and she stops apologizing about that one. Something lights up behind her eyes. She holds your hip steady with zero effort and discovers she likes having force behind her movements.`;
        } else {
            part1 = `Della unties her apron and folds it on the bedside table. The blouse comes off and she fills the room — massive, powerful, warm brown skin over dense muscle. Her ${npcChest} are heavy on her broad frame. She rolls her shoulders and tools rattle on the wall.\n\n{della}"Is this alright, dear?" she asks, while having you pinned under her full weight against the bed. She genuinely doesn't register that she's in complete control. She thinks she's being gentle.\n\nHer grip doesn't bruise — it just doesn't let go. She repositions you with one arm, the other hand stroking your hair. {della}"Comfortable?" She's flipping you, holding you down, driving the pace, all while maintaining the warm Della voice. Inexorable. Unstoppable. And so very, very soft about it.`;
        }
        // Part 1 butt modifier
        if (dellaB >= 5) {
            part1 += `\n\nHer ${npcButt} reshapes every surface she sits on. She shifts and it ripples — enormous, warm, impossible to ignore. She catches you staring and covers her face. {della}"I'm sorry, there's just so much of me now, I —" You grab her hips and pull her into your lap and her embarrassment evaporates into a grind she didn't know she had.`;
        } else if (dellaB >= 4) {
            part1 += ` Her ${npcButt} fills out her frame generously — she shifts her weight and the motion draws your eye. She's comfortable with this. Her hips know how to move.`;
        } else if (dellaB <= 1) {
            part1 += ` Her rear is light, almost girlish — she wiggles to find the right position in your lap, and the precision of contact without the cushion makes her gasp sooner than expected. {della}"I'm sorry, that was just —" She apologizes for the gasp. She apologizes for gasping.`;
        }

        // --- Part 2: Getting Close (power dynamics) ---
        let part2;
        const bothPetite = playerM <= 1 && dellaM <= 1;
        if (playerM >= 5 && dellaM <= 1) {
            part2 = `You pull her against you and she makes a small, startled sound. Not fear — wonder. Nobody has ever just moved her. The caretaker being taken care of. Your arms close around her soft frame and she goes pliant, yielding completely.\n\n{della}"Oh. You can just... put me where you want me." Her voice is quiet, amazed. The apology reflex doesn't fire because there's nothing to apologize for. She's allowed to receive for once. Her hands rest on your chest, not guiding, not stroking — just feeling. Being held.`;
        } else if (playerM >= 5 && dellaM >= 2) {
            part2 = `You pull her close and she meets you with strength of her own — but she yields anyway. Not weakness. Permission. She lets you reposition her and the wonder on her face is genuine.\n\n{della}"Oh my." She tests your arms, your shoulders, feeling the power there. {della}"I've never been... handled." She says it like she's tasting something new. Her hands smooth down your back — caretaker instinct, redirected. She wraps around you and lets your strength drive.`;
        } else if (playerM <= 1 && dellaM <= 1) {
            if (playerC >= 4 && playerB >= 4) {
                part2 = `She draws you close and her hands find the contrast — your slight frame, then the swell of your chest, then the curve of your ass. Her caretaker instinct goes straight to your body, touching everywhere.\n\n{della}"Oh, look at you, dear." Her voice is warm with something that isn't motherly anymore. She cups your breasts — adjusting, supporting, testing the weight. Then kneading. Her other hand rests on your hip and doesn't leave. {della}"Just... looking after you." She is not just looking after you.`;
            } else if (playerC >= 4) {
                part2 = `She draws you close and her hands go straight to your chest. Cups, hefts, presses her face between them. {della}"Oh, look at these, dear." The caretaking becomes groping without her noticing — adjusting, supporting, testing. Then her mouth is on your nipple and she's not pretending it's caretaking anymore.\n\nShe pulls back, flushed. {della}"I'm sorry, I don't know what —" She goes right back.`;
            } else if (playerB >= 4) {
                part2 = `She draws you close and both hands find your ass — to 'steady you,' she says. She grabs and never lets go. Uses it as a handle to pull you into her, gentle grip, absolutely immovable.\n\n{della}"Just keeping you close, dear." She's kneading, pulling, pressing you against her with warm insistence. Her hips roll against yours and the motion is anything but maternal.`;
            } else {
                part2 = `She draws you close and you fold together — two soft bodies finding each other. Her hands trace your spine, your shoulders, the line of your hip. She maps you with a baker's hands — warm, practiced, finding where the warmth gathers.\n\n{della}"There you go." She angles herself against you, skin to skin, settling you into her arms like you're something rising that needs tending. She knows how to hold things. She's held dough and children and grief. She holds you like all three and none of them.`;
            }
        } else if (playerM <= 1 && dellaM >= 4) {
            part2 = `She wraps around you entirely — arms, legs, chest, weight. You disappear into her. Protective and sexual at once. She's stroking your hair while grinding against you.\n\n{della}"Comfortable, dear?" She's moving you through positions one-handed while the other pets your hair. Effortless. Relentless. Unbearably tender. Her warmth engulfs you and her grip is soft and absolute.`;
        } else if (playerM <= 1 && dellaM >= 2) {
            part2 = `She pulls you close and wraps around you with easy strength. Her body is warm and firm and her soft frame settles over yours like a blanket you didn't know you needed. She holds you where she wants you.\n\n{della}"Let me take care of you, dear." She adjusts your position with gentle, certain hands. Not a suggestion. A placement. She's already stroking your hair.`;
        } else if (dellaM >= 5 && playerM >= 5) {
            part2 = `You pull each other close and neither gives ground. Two strong bodies pressing together, testing, finding the balance. She's startled by meeting resistance — she's been the immovable warmth for everyone, and now someone is holding her back.\n\nA breathless laugh escapes her. Her grip tightens, testing your strength against hers. Then she softens deliberately, opens herself, pulls you in. {della}"Oh, you're strong." Her voice is warm with something like relief. {della}"I don't have to be careful with you."`;
        } else {
            part2 = `She draws you close with warm hands — no rush, no urgency, just the steady pull of someone who knows how to hold things. She settles against you, finds the angle that puts the most skin together, and sighs.\n\n{della}"I've wanted this." Soft, simple, honest. Her hands find your back and stroke — the caretaker's instinct, the first thing she reaches for. But her hips press against yours and the warmth between them has nothing to do with baking.`;
        }
        // Part 2 modifiers
        if (playerC >= 4 && !bothPetite) {
            part2 += ` Her hands find your chest — cups, hefts, nuzzles. {della}"Oh, those are lovely, dear." The caretaking becomes groping without her noticing. She adjusts, supports, tests — then her mouth is there and she's not pretending anymore.`;
        }
        if (playerB >= 4 && !bothPetite) {
            part2 += ` Both hands find your ass. She grabs to 'steady you' and never lets go — pulling you into her, using the grip as leverage. {della}"Just resting my hand." It is not just resting.`;
        }
        if (npcInSkirt && dellaHasVulva) {
            part2 += ` Her skirt is dark with wetness between her thighs. She tries to smooth it down, embarrassed. {della}"I'm sorry, I don't usually —" She's been soaking since she walked in.`;
        }
        if (dellaM >= 5 && !(dellaM >= 5 && playerM >= 5)) {
            part2 += ` Her arms close around you and the strength is warm, incidental — she just repositioned you because she wanted you closer. She didn't notice she lifted you off the ground.`;
        }
        if (dellaC >= 5 && !bothPetite) {
            part2 += ` Her massive chest presses between you, engulfing, smothering. She pulls you in and her breasts deform against you and she's grinding before she realizes it. {della}"Oh — I'm sorry, was that —" She doesn't stop grinding.`;
        }

        // --- Part 3: Foreplay (the mask-drop moment) ---
        let part3;
        if (dellaM <= 1) {
            part3 = `She starts by taking care of you. Of course she does. Gentle hands, soft mouth, tender attention — the way she does everything. {della}"Let me take care of you, dear." She means it. She's good at this in a way that suggests she hasn't always been alone.\n\nThen you touch her back. Not gently — with purpose, with hunger, touching her like she's not fragile, not maternal, not a caretaker. Like she's wanted.\n\nSomething cracks behind her eyes. Her hands stop being gentle and start being urgent. She pulls instead of guides. A sound escapes her — low, warm, startled — and her hand flies to her mouth.\n\n{della}"I'm sorry, I don't know where that —" You kiss her and the apology dies on her lips. She kisses back and it's not careful. It's not measured. It's decades of restraint meeting one decisive touch, and the dam is groaning.`;
        } else if (dellaM <= 3) {
            part3 = `She starts by taking care of you — hands stroking, mouth gentle, the caretaker's script. {della}"Let me do the work, dear." But her new strength makes the gestures different. She grips harder without meaning to, pulls you closer than she planned.\n\nThen you touch her like she's wanted, not like she's needed, and her whole body responds. Her legs wrap around you and pull — instinct, not decision — and the possessiveness of it shocks her. Her eyes widen.\n\n{della}"I didn't mean to —" But her legs don't unlock. Her breathing changes. The apologies thin out as the warmth behind them catches fire.`;
        } else {
            part3 = `She tries to take care of you. She does. Gentle hands, soft words — but her body keeps overriding the script. She braces against the bedframe and it creaks. She grips your hip and holds you steady with zero effort. She starts to apologize and a thrust escapes her that rattles the shelf behind you.\n\n{della}"I'm sorry, was that too —" You pull her harder against you. She stops apologizing about that one. Something lights up behind her eyes — not roughness, not aggression. Discovery. She's finding out what her body wants to do, and what it wants is to keep coming, keep pressing, keep holding you in place with warm, inexorable force.\n\nThe apologies are already fading. What's replacing them is heat.`;
        }

        const opening = part1 + '\n\n' + part2 + '\n\n' + part3;

        // --- Genital Branches ---

        // === PV: player penis + Della vulva ===
        let pvText;
        if (playerM >= 5 && dellaM <= 1) {
            pvText = `You lift her onto the bed — she weighs nothing, soft body settling into your hands. She wraps her legs around you, eyes wide, still amazed that someone can just move her. You push your ${playerGenSize} cock into her pussy and her mouth opens in a silent 'oh.'\n\nHer whole body yields. Every thrust rocks her, moves her, and she clings to your arms — not for control, just to hold on. Her softness makes every impact ripple through her. {della}"Oh, that's — I've never —" She buries her face in your shoulder. The apologies are gone. She's just holding on.`;
        } else if (dellaM >= 4 && playerM <= 1) {
            pvText = `She settles over you with the full weight of her powerful body — gentle, immovable. She takes your ${playerGenSize} cock and guides it into her pussy with one hand, the other cradling your head. {della}"Is this alright, dear?" She sinks down and the thrust that follows is inexorable — not rough, not slamming, just a force that keeps coming.\n\nShe rocks with a strength that pins you to the bed. Each motion is warm, measured, and completely unstoppable. She strokes your hair while her hips drive the pace. She genuinely doesn't register that she has you pinned under her full weight. She thinks she's being gentle.`;
        } else if (dellaM >= 5 && playerM >= 5) {
            pvText = `She pulls you against her and neither of you gives ground. You push your ${playerGenSize} cock into her pussy and she wraps around you — legs, arms, chest — and meets every thrust with warm, equal force. The bed groans beneath you.\n\nShe laughs — breathless, delighted. {della}"I don't have to be careful." She pulls you deeper with her legs, matching your strength, and the relief of not holding back is written across her flushed face. She thrusts back and the impact is mutual, devastating, and tender.`;
        } else {
            pvText = playerGS >= 3
                ? `She guides you to lie back, settling her warm weight over you. {della}"Let me do the work, dear." She reaches down and her soft hand wraps around your huge cock. Her eyes widen. {della}"Oh my." She needs both hands to line you up, lowering herself slowly, easing you into her pussy inch by inch. Her breath comes in short, startled puffs. {della}"That's — oh, there's so much of you."\n\nHer ${npcButt} pillows against your thighs as she begins to rock — slow, careful, adjusting to the size. Then you thrust up to meet her and something shifts. Her mouth opens and stays open. Her hips find a pace that isn't careful anymore — warm, steady, greedy. {della}"Oh my." She covers her mouth. Her hips don't stop.`
                : playerGS >= 2
                ? `She guides you to lie back, settling her warm weight over you. {della}"Let me do the work, dear." She takes your thick cock in her soft hand and guides it into her pussy. The stretch makes her gasp — a warm, surprised sound. {della}"Oh, that fills me up."\n\nHer ${npcButt} pillows against your thighs as she begins to rock — slow, gentle, savoring how full she feels. {della}"Oh, that's... that's lovely." Her hands rest on your chest, steadying herself. Then you thrust up to meet her and something shifts. Her rhythm stutters. Her hips find a pace that isn't gentle anymore — warm, steady, building. {della}"Oh my." She covers her mouth. Her hips don't stop.`
                : `She guides you to lie back, settling her warm weight over you. {della}"Let me do the work, dear." She takes your cock in her soft hand and guides it into her pussy with a tender, practiced motion. When you slip inside, her eyes flutter closed and her mouth opens — the fit is snug, intimate, every shift felt instantly.\n\nHer ${npcButt} pillows against your thighs as she begins to rock — slow, gentle, savoring it. {della}"Oh, that's... that's lovely." Her hands rest on your chest, steadying herself. Then you thrust up to meet her and something shifts. Her rhythm stutters. Her hips find a pace that isn't gentle anymore — warm, steady, building. {della}"Oh my." She covers her mouth. Her hips don't stop.`;
        }
        // PV gs-awareness
        if (playerGS >= 2 && dellaGS === 0) {
            pvText += `\n\nHer tight pussy grips your thick cock and the fullness hits her all at once. She gasps — {della}"Oh, I was so focused on you I didn't realize I was —" She's been close the whole time. The tightness pulls sensation from every inch and her composure fractures.`;
        } else if (playerGS === 0 && dellaGS >= 2) {
            pvText += `\n\nShe's swollen and dripping — thick folds engulfing your cock in plush, gripping heat. Every touch makes her gasp and then apologize. {della}"I'm sorry, that's just — oh —" She can't stop reacting. The sensitivity overwhelms her composure completely.`;
        } else if (playerGS >= 2 && dellaGS >= 2) {
            pvText += `\n\nShe's swollen and your thick cock fills her completely — the combination is staggering. Every thrust lands and she cries out, then covers her mouth. {della}"I'm sorry, I —" Another thrust, another sound she can't catch. The apologies thin out. The sounds don't.`;
        } else if (playerGS === 0 && dellaGS === 0) {
            pvText += `\n\nBoth tight, both precise — she clenches around you with warmth that's almost unbearable. Every movement is vivid and exact. She focuses on you, doing the work, being attentive — her own pleasure building slowly underneath until it catches her off guard.`;
        }
        // PV stat modifiers
        if (dellaC >= 5) {
            pvText += `\n\nShe pulls your face into her massive chest — starts as nurturing, stroking your hair. {della}"There, there." Then she's grinding, breasts engulfing you, and 'dear' becomes a moan. She doesn't notice the transition. You do.`;
        } else if (dellaC >= 4) {
            pvText += `\n\nHer ${npcChest} sway with every roll of her hips. She presses them against you and the contact makes her straighten — showing off without admitting it.`;
        }
        if (dellaB >= 5) {
            pvText += `\n\nHer enormous ass drives every thrust — she sits deeper, pulls you closer with each roll, and the weight behind her hips controls the depth completely. She apologizes for the first three deep grinds. Not the fourth.`;
        }
        if (dellaM >= 5 && !(dellaM >= 4 && playerM <= 1) && !(dellaM >= 5 && playerM >= 5)) {
            pvText += ` She braces with one arm and the bedframe groans. She doesn't notice. She's stroking your hair with the other hand.`;
        }
        // PV player standout modifiers
        if (playerC >= 4) {
            pvText += `\n\nHer hands find your chest — cupping, hefting, her nurturing instinct redirected into something hungry. She kneads while her hips move, attention split between the sensation below and the shape in her hands.`;
        }
        if (playerB >= 4) {
            pvText += `\n\nHer hands slide under your ass, pulling you deeper with each thrust. {della}"Just keeping you close." The grip is gentle. Absolutely immovable.`;
        }

        // === VV: both vulva ===
        let vvText;
        if (playerM >= 5 && dellaM <= 1) {
            vvText = `You push her down onto the bed and her soft body yields completely. Your fingers slide between her thighs and she opens for you, her own hands reaching for your pussy with the caretaker's instinct — gentle, attentive, trying to give even while receiving.\n\nThen your fingers push inside and she gasps. She's soaking. Has been since she walked in. Her technique falters, her measured patience overwhelmed by the sensation of being filled while strong hands hold her in place. {della}"Oh — I was so focused on you I didn't realize —" She's been close the whole time.`;
        } else if (dellaM >= 4 && playerM <= 1) {
            vvText = `She settles over you and her strong hands part your thighs — warm, certain, immovable. Her mouth finds your pussy with tender precision, her fingers working with a skill that suggests years of private knowledge.\n\nShe guides your hand between her legs and she's dripping. {della}"Your turn, dear." Not a request — a warm command. Her powerful body pins yours in place while she works, her hips grinding against your fingers with force she doesn't register. She thinks she's being careful. The bedframe disagrees.`;
        } else if (dellaM >= 5 && playerM >= 5) {
            vvText = `Neither yields. Strong hands find each other's bodies — gripping, pressing, testing. Her fingers slide between your legs at the same moment yours find hers. Both of you freeze. Then both press deeper.\n\nShe laughs breathlessly against your neck, matching your rhythm, refusing to let you outpace her. Her strong fingers curl inside you and yours curl inside her and it becomes a different kind of contest — who can hold out, who breaks first. Her warm body shakes with the effort of not breaking.`;
        } else {
            vvText = `Her soft hands cup your face, thumbs stroking your cheeks, before trailing down your body with the tender attention she'd give rising dough. Patient. Warm. When her fingers find your pussy she works with careful skill, her other hand stroking your hair. {della}"That's it, dear. Just relax."\n\nYou reach for her in return and the moment your fingers slip between her thighs, she gasps. She's soaking wet. Has been since she walked in. {della}"Oh," she breathes, pressing into your hand. {della}"It's been so long since anyone —" Her hips roll against your fingers, losing their gentle rhythm, grinding harder. Her composure cracks. She can feel it happening and can't stop it. Her fingers inside you lose their measured patience, moving faster, needier.`;
        }
        // VV gs-awareness
        if (playerGS >= 2 && dellaGS >= 2) {
            vvText += `\n\nBoth swollen — thick folds meeting thick folds, everything slick and amplified. Every touch makes her gasp and apologize. {della}"I'm sorry, that's just — oh —" She can't stop reacting. Her own thick lips part eagerly, plush and sensitive, and her fingers on you tremble with how much she's feeling.`;
        } else if (playerGS === 0 && dellaGS === 0) {
            vvText += `\n\nBoth tight, both precise. Her fingers work you with warm, deliberate pressure. The sensitivity is manageable — she maintains her composure, focuses on you, does the caretaking. Her own pleasure builds slowly underneath, quiet, ignored. When it surfaces it catches her completely off guard. {della}"Oh — I was so focused on you I didn't realize I was —"`;
        } else if (playerGS >= 2 && dellaGS === 0) {
            vvText += `\n\nYour swollen folds are thick under her fingers — she traces every ridge with warm attention, fascinated by the sensitivity. {della}"Oh, you're so responsive, dear." Her own tight pussy clenches around your fingers, the subtler sensation letting her focus on you. Until it builds past her ability to ignore.`;
        } else if (playerGS === 0 && dellaGS >= 2) {
            vvText += `\n\nShe's swollen and dripping — thick lips parting eagerly under your touch. Every contact makes her gasp. {della}"I'm sorry, that's — oh dear —" She keeps apologizing between moans, her composure shattered by her own sensitivity. Your fingers find her and she presses into your hand with desperate warmth.`;
        }
        // VV stat modifiers
        if (dellaC >= 5) {
            vvText += `\n\nShe pulls you against her massive chest while her fingers work — your face buried in warm, engulfing softness. She's grinding into the contact, pulling you tighter, nurturing and sexual in equal measure.`;
        } else if (dellaC >= 4) {
            vvText += `\n\nHer ${npcChest} press between your bodies as she draws closer — warm, heavy. She uses the contact, grinding into you.`;
        }
        if (dellaM >= 5 && !(dellaM >= 4 && playerM <= 1) && !(dellaM >= 5 && playerM >= 5)) {
            vvText += ` Her grip on your thigh is warm, immovable. She doesn't notice how hard she's holding you. She's too focused on making you feel good.`;
        }
        if (playerC >= 4) {
            vvText += `\n\nHer mouth moves to your chest while her fingers keep working — nurturing instinct redirected, lips and tongue on your nipples, her free hand cupping and kneading. She goes down on you intending to be quick and attentive. She is not quick. She discovers she loves this.`;
        }
        if (playerB >= 4) {
            vvText += `\n\nBoth hands find your ass and she pulls you against her. {della}"Just let me, dear. Let me take care of you." She means it both ways now — the caretaking and the hunger indistinguishable.`;
        }

        // === VP: Della penis + player vulva ===
        let vpText;
        if (dellaGS >= 2) {
            if (playerM >= 5 && dellaM <= 1) {
                vpText = `She lets you arrange her — gentle, yielding, watching you position her ${npcGenSize} cock at your pussy. She can barely look at it. She can barely look away. You guide her inside and she pushes in slowly, carefully, watching your face.\n\nThe moan that escapes her surprises them both. Low, deep, from somewhere she keeps locked up. She grips your arms and her soft body trembles. {della}"Oh — tell me if I'm too much —" You pull her deeper with your legs and her careful rhythm shatters.`;
            } else if (dellaM >= 4 && playerM <= 1) {
                vpText = `She eases you down onto the bed with one powerful arm, the other positioning her ${npcGenSize} cock against your pussy. {della}"Tell me if I'm too much, dear." She pushes inside, slow and careful, and the moan that escapes her is low and inexorable.\n\nShe starts to move — gentle at first, the way she does everything. But each thrust pulls a deeper sound from her. She braces over you and her strong body drives the pace with warm, unstoppable force. She strokes your hair while her hips find a rhythm that pins you to the bed.`;
            } else {
                vpText = `She positions her ${npcGenSize} cock at your pussy, hands shaking slightly, watching your face with tender concern. {della}"Tell me if I'm too much." She pushes inside — slow, careful — and her eyes flutter closed.\n\nThe sound she makes is low and warm and shocked. She starts to move, gentle at first. But each thrust pulls something from her, each one less controlled. She presses her forehead to yours, breathing hard. {della}"I'm sorry, I just — you feel so good, I can't keep —" She bites her lip, but her hips have already decided. The thrusts come with warm, building urgency.`;
            }
        } else {
            // Small cock — tender, exploratory
            if (playerM >= 5 && dellaM <= 1) {
                vpText = `She lets you position her — soft and yielding in your strong hands. Her ${npcGenSize} cock is small and she touches it like she's not sure it's real. Gentle, exploratory. You guide it into your pussy and she cups it rather than grips it. Tender.\n\n{della}"Is this — am I doing this right, dear?" When her cock responds inside you, the sensation surprises her. She pulls her hand back, then reaches again. She cups the base while she pushes in with small, careful thrusts, every movement vivid and precise.`;
            } else if (dellaM >= 4 && playerM <= 1) {
                vpText = `She eases you down with powerful, gentle hands and positions her ${npcGenSize} cock at your pussy. It's small, and she touches it with uncertain tenderness — still learning what it does. She pushes inside carefully, and the sensation makes her brace against the bedframe. It creaks.\n\n{della}"Oh, that's — is this alright?" She cups the base of her modest cock with one hand while the other cradles your head. Her thrusts are small, precise, exploratory — but the strength behind them is immovable.`;
            } else {
                vpText = `She positions her ${npcGenSize} cock at your pussy, barely able to look at it. Not shame — strangeness. She touches it like she's not sure it's real. Gentle, exploratory. When it responds she pulls her hand back, then reaches again.\n\n{della}"Is this... am I doing this right, dear?" She pushes inside with careful tenderness, cupping rather than gripping. Each small thrust draws a sound from her that builds in warmth and surprise. She discovers what it does by doing it, and the discovery is written across her flushed face.`;
            }
        }
        // VP stat modifiers
        if (dellaC >= 5) {
            vpText += `\n\nHer massive chest presses against you with every thrust — engulfing, smothering, her breasts deforming against your body. She pulls you into them mid-stroke and the nurturing becomes grinding, her soft warmth everywhere.`;
        }
        if (dellaB >= 5) {
            vpText += `\n\nHer enormous ass provides the momentum — each thrust driven by the sheer mass behind her hips. She pushes deeper, the weight behind her impossible to resist.`;
        }
        if (playerC >= 4) {
            vpText += `\n\nHer hands find your chest between thrusts — cupping, hefting, her mouth finding your nipple. The caretaking becomes worship without her noticing the transition.`;
        }
        if (playerB >= 4) {
            vpText += `\n\nShe grabs your ass with both hands to 'steady you' and uses the grip to pull you onto her cock with each thrust. {della}"Just keeping you close." Gentle. Immovable.`;
        }
        // VP size overlay
        if (dellaGS >= 2 && playerGS === 0) {
            vpText += `\n\nYour tight pussy grips her thick cock and the sensation overwhelms her carefully maintained focus. She covers her mouth, then covers her eyes, then grips your hips and thrusts with purpose she can't take back.`;
        } else if (dellaGS >= 2 && playerGS >= 2) {
            vpText += `\n\nHer thick cock fills your swollen pussy completely — both oversized, both oversensitive. She grips your hips and they're both overwhelmed simultaneously. Her hands shake. {della}"Dear — I — oh, DEAR —"`;
        }

        // === PP: both penis ===
        let ppText;
        if (dellaM >= 4 && playerM <= 1) {
            ppText = `She takes both cocks in her strong, soft hands — your ${playerGenSize} shaft and her ${npcGenSize} length pressed together. Her grip is warm, immovable, effortless. She strokes with focused tenderness, watching both heads slide together.\n\nShe stares at both cocks in her hands, something raw and wondering on her face. {della}"Oh my, look at you both." Her rhythm quickens without her meaning to. Her powerful body pins you in place while she works, stroking through the dual sensation with warm, inexorable hands.`;
        } else if (playerM >= 5 && dellaM <= 1) {
            ppText = `You take both cocks in hand — her ${npcGenSize} shaft and your ${playerGenSize} length — and she lets you. She yields completely, soft body against yours, watching with wide eyes as both shafts press together.\n\n{della}"Oh, that's..." She covers her mouth. Her hips push into your grip, chasing the sensation. She reaches for you with one hand, stroking your arm, your chest — caretaking even now, even while gasping.`;
        } else {
            ppText = `She takes both cocks in her soft hands. Her touch starts exactly like you'd expect — gentle, warm, the way she'd knead dough. {della}"Oh my, look at you both," she murmurs, watching your ${playerGenSize} shaft throb alongside her ${npcGenSize} length with something like wonder.\n\nShe strokes slowly, savoring. Then you pulse in her grip and she feels it, and her breath catches. Her rhythm quickens without her meaning to. She's staring at her own hands wrapped around both of you, the wetness gathering at both tips. A low sound escapes her. She glances up, startled by herself. Her hands tighten. Still soft, still warm, but no longer gentle.`;
        }
        // PP stat modifiers
        if (dellaC >= 5) {
            ppText += `\n\nShe pulls both shafts against her massive chest — warm, engulfing, grinding both cocks between her breasts while her hands work. Her eyes close and the sound she makes vibrates through her whole body.`;
        }
        if (playerC >= 4) {
            ppText += `\n\nHer free hand finds your chest — cupping, kneading, nurturing instinct gone sexual. She splits her attention between the cocks in her hand and the breasts under her palm and loses track of both.`;
        }
        // PP size overlay
        if (playerGS >= 2 && dellaGS >= 2) {
            ppText += `\n\nBoth thick, both throbbing — her soft hands barely wrap around both shafts. She strokes and the pressure is overwhelming. She grips harder, breathing fast, the warm maternal composure crumbling into open hunger.`;
        } else if (playerGS === 0 && dellaGS === 0) {
            ppText += `\n\nBoth modest — she cups them together tenderly, fingers interlacing. She strokes with careful warmth, every micro-movement deliberate, her hands treating both cocks like something precious that needs gentle handling.`;
        } else if (playerGS >= 2 && dellaGS === 0) {
            ppText += `\n\nYour thick cock dwarfs her modest shaft — she stares at the contrast in her hands. {della}"Oh my, you're so —" She can't finish. Her small cock pulses against your thick one and the dual sensation makes her whole body shudder.`;
        } else if (playerGS === 0 && dellaGS >= 2) {
            ppText += `\n\nHer thick cock engulfs your modest shaft against it — the heat of her surrounding you. She watches the sight of both cocks in her hands and something raw breaks across her face. She strokes faster, the gentle composure cracking.`;
        }

        const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };

        this.text = opening + '\n\n' + getSexSceneText('della', branches);

        gameState.npcs.della.trust += 1;
        saveState();
    },
    actions: [
        {
            label: 'Della bumps something...',
            nextScene: 'della_sex_transform',
        },
        {
            label: 'Continue...',
            nextScene: 'della_sex_closing'
        }
    ]
};

SCENES['della_sex_transform'] = {
    id: 'della_sex_transform',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('della', 'transform');
        markTransformationSeen('della');

        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');
        const npcGenSize = getBodyStatDesc('della', 'genitaliaSize');
        const npcChest = getBodyStatDesc('della', 'chest');
        const playerGS = gameState.player.body.genitaliaSize;
        const playerBigVulva = gameState.player.body.genitalia === 0 && playerGS >= 3;
        const playerM = gameState.player.body.muscle;
        const playerC = gameState.player.body.chest;

        const npcBody = gameState.npcs.della.body;
        const dellaM = npcBody.muscle;
        const dellaB = npcBody.butt;
        const dellaC = npcBody.chest;
        const dellaGS = npcBody.genitaliaSize;
        const dellaHasVulva = npcBody.genitalia === 0;

        // === Tease: accidental trigger ===
        const tease = `Della rolls over, breathless, flushed, and her hand knocks something off the bedside table — a brass device you don't recognize, something half-buried under your uncle's old notes. It hits the floor and activates with a deep hum that vibrates through the room.\n\n{della}"Oh dear, oh my, what's..." She blinks. The bed is smaller than it was. No, she's bigger. The headboard was at her shoulders a moment ago — now it's at her waist. Her perspective is shifting, the room shrinking around her, and her eyes go wide. {della}"Oh! Oh my goodness!"`;

        // === Transform: giantess (~20ft, squatting/sitting at ceiling) ===
        const scaleDesc = dellaM >= 5
            ? `She doesn't stop. Ten feet. Fifteen. She backs into the open space near the wall, workbenches scraping aside like toys, and by the time it ends she has to sit, legs folded beneath her, head still pressing the ceiling. Her body fills the space like something geological. At this scale, at this mass, she's immovable. Nothing in this workshop, nothing in this world, could shift her an inch.`
            : `She doesn't stop. Ten feet. Fifteen. She backs into the open space near the wall, workbenches scraping aside like toys, and sinks into a squat as her head meets the ceiling. Twenty feet of warm, soft woman folded into a room that can barely contain her.`;

        let statDetails = '';
        if (dellaC >= 5) {
            statDetails += ` A single one of her massive breasts could fill the entire bed. Each nipple is the size of your face.`;
        } else if (dellaC >= 3) {
            statDetails += ` Her breasts at this scale are staggering — ${playerC >= 5 ? 'each one makes your own massive chest look modest' : playerC >= 3 ? 'each one larger than your whole body' : 'each one could smother you entirely'}. Her nipples are the size of your face.`;
        } else if (dellaC >= 1) {
            statDetails += ` Even her modest breasts at this scale ${playerC >= 5 ? 'rival your own massive chest' : playerC >= 3 ? 'are bigger than your torso' : 'are each bigger than you are'}. Her nipples are the size of your face.`;
        }
        if (dellaB >= 5) {
            statDetails += ` Her enormous ass spreads across the floor like a hill, soft and vast.`;
        }
        if (dellaM >= 5) {
            statDetails += ` Her muscle doesn't soften. At this scale, it's imposing. Massive arms, vast shoulders, a body that could hold up the ceiling if it asked. Nothing weighs anything to her. She nudges a workbench with one finger and it slides across the room.`;
        }

        let cockWidth = '';
        if (!dellaHasVulva && dellaGS >= 3) {
            if (playerM >= 4) cockWidth = 'as wide around as your shoulders';
            else if (playerM >= 2) cockWidth = 'wider than your whole body';
            else cockWidth = 'twice as wide as you are';
        }

        let genitalDetail = '';
        if (dellaHasVulva && dellaGS >= 3) {
            genitalDetail = `\n\nBetween her massive thighs, her pussy is swollen to a scale that defies comprehension. Thick, glistening folds large enough to swallow you whole. The heat radiating from her is like standing near an oven.`;
        } else if (!dellaHasVulva && dellaGS >= 3) {
            genitalDetail = `\n\nHer cock grew faster than the rest of her. At normal height it was huge — at this scale, it's beyond proportion. It juts out from her body at an angle, straining under its own weight like a falling tree — ${cockWidth}. The swollen head rises past her chest. She could put her lips to it without effort. Her testicles hang beneath her like beach balls, heavy, swaying when she shifts.\n\n{della}"Oh my." She stares down at herself. {della}"That wasn't... it wasn't that big before, was it?" It wasn't. The growth amplified it, as if the device had favorites.`;
        } else if (!dellaHasVulva) {
            genitalDetail = `\n\nHer cock scaled with the rest of her. At normal height it was large — at twenty feet, it's enormous, jutting from her body, heavy enough to pin you to the floor if it fell. Her testicles hang beneath her, each one the size of your head.`;
        }

        // Growth modifiers based on stats
        let growthDetails = '';
        if (dellaM >= 2 && dellaM < 5) {
            growthDetails += ` As she expands, her muscle softens. Definition melting away, replaced by warm, pillowy mass.`;
        }
        if (dellaC <= 1) {
            growthDetails += ` Her chest swells as she grows, breasts rounding out, filling, becoming generous where there was little before.`;
        }

        const transform = `Della grows. Not quickly, steadily, like watching dough rise, her body expanding in every direction. Her hips widen, the floor creaks beneath mounting weight.${growthDetails}\n\n${scaleDesc}${statDetails}\n\nShe looks down at you, way, way down, and she's smiling. Not embarrassed, not panicked. A warm, pleasant, wondering smile. {della}"Oh my," she breathes, her voice deeper now, resonant, vibrating in your chest like a cello. {della}"Look at me."\n\nShe holds her own massive hands up, turns them over, marvels at them. Then she looks at you again, tiny, at her knee, and her smile widens.${genitalDetail}\n\n{della}"Oh," she says softly. You reach up and press your hand against her leg. Her skin is warm, soft, vast. She looks down at you. Blinks. Tilts her head.\n\n{della}"Was that you?" She felt something. Barely. A tiny pressure, like a moth landing. She looks at your hand on her leg and her expression shifts. Not disappointment, just surprise. You're so small.\n\nYou take that as a challenge.\n\nHer giant fingers reach for you, still gentle, still careful, still Della. She picks you up and cradles you against her chest, your whole body smaller than a single breast. She's warm everywhere. She's apologizing for taking up so much space while actively pulling you closer.`;

        // === Genital branches (shorter — transform is the star) with climax integrated ===
        const branches = {
            'pv': `She sets you down between her legs and spreads her massive thighs. You climb the warm terrain of her body. Your ${playerGenSize} cock slides into her pussy, all the way, to the hilt, and you feel the heat of her everywhere, slick walls vast around you.${playerGS >= 3 ? ' Your cock is notably large by any human standard. Here, inside her, it barely registers.' : ''} She shifts, waiting, and her expression is patient. Hopeful. Nothing.\n\nYou find her clit instead. It's the size of your head, swollen, hot, a firm bud of concentrated sensation. You press your face against it, work it with both hands, and that gets a reaction. A low, shuddering rumble travels through her entire body.\n\nHer massive fingers find herself instinctively, and you're there, helpless in the motion. Her folds slide around you, thick and slick and warm, enveloping you to the chest. She presses her lips together for more friction and you sink deeper, engulfed. Her hips roll and you move with them. No choice, no leverage, just warmth and pressure and the rhythm of something enormous chasing its own pleasure.${dellaM >= 5 ? ' The motion is irresistible. Her body moves and yours moves with it, no force on earth that could resist.' : ''}\n\nThe orgasm hits like an earthquake. Her massive body arches, her cry making the walls tremble, tools rattling off hooks. {della}"Oh FUCK..." The word thunders from a body that size. You come at the same time, buried in her, overwhelmed.\n\nShe goes still. Then she lifts you out of her folds, gently, carefully, and holds you up to her face. Her eyes are soft. {della}"Oh dear. Was I too rough?" She presses her lips to your entire body in a kiss that envelops you from shoulder to knee, warm and impossibly tender. Then she sets you down on the bed, steadying you with one massive finger.`,
            'vv': `She spreads her massive thighs and lowers you between them. Her pussy radiates heat. At this scale, her folds are taller than you, glistening, a landscape of warm, slick flesh. You find her clit. It's the size of your head, swollen and firm, and when you press yourself against it, grinding, working it with your whole body, the reaction is immediate. A rumble travels through her that you feel in your bones.\n\n{della}"Oh... there..." Her voice vibrates through you. Her fingers find herself instinctively, and you're caught in the motion. Her folds slide around you, enveloping you, slick warmth closing in as she rubs. She presses her lips together and you sink deeper, embraced, helpless, your own pussy grinding against the hot, slick surface of hers. She slides you through her folds, inserts you slightly, and the sensation of being inside her, warm, tight, impossibly intimate, overwhelms you both.${dellaM >= 5 ? ' Her casual motions carry the force of something geological. You couldn\'t resist if you tried.' : ''}\n\nShe comes with a cry that rattles the foundation, her massive body shuddering, the vibration traveling through you like a wave. You follow, clenched against her, pulled along by the aftershocks rolling through her body.\n\nShe goes still. Then she lifts you out, gently, carefully, and holds you up to her face, expression soft and worried. {della}"Oh goodness, are you all right?" She presses her lips to you in a kiss that covers you from shoulder to knee. Warm, tender, apologetic. She sets you down on the bed and steadies you with one massive finger.`,
            'vp': dellaGS >= 3 ? `She sets you down gently on the bed and you look up. Way up. ${cockWidth} — you crane your neck to see the head, level with her face, and the sheer mass of it blots out the ceiling behind it.\n\nShe stares at her own cock. Then she wraps one hand around the shaft and pulls it toward her mouth — and realizes she can reach. Her lips lower to the swollen head. A shudder rolls through her entire body, rattling tools off their hooks. {della}"Oh..." Her massive eyes flutter closed. She does it again, more deliberately, her tongue tracing the ridge, and the sound she makes vibrates through the floor beneath your feet.${dellaC >= 4 ? `\n\nShe presses her cock between her massive breasts — it nestles into her cleavage and the head rises above, slick and swollen, still within reach of her mouth. She looks down at the sight of her own shaft buried in her own chest and something in her expression goes glassy with sensation.` : ''}\n\nYou climb her. There's no other word for it. You scale the warm terrain of her inner thigh and straddle her shaft, wrapping your arms and legs around the heated surface. Your whole body doesn't span its width. She feels it — barely — and looks down at you, tiny against her cock.\n\n{della}"Oh... hello, dear." Breathless. Wondering. She watches you grind against her shaft, your entire body working to create friction she can just barely register, and the sight of it — you, determined, clinging to something that dwarfs you completely — makes her breath catch.${dellaM >= 5 ? ' Her massive hand settles behind you, not pushing, just resting, and the weight of it alone pins you against her shaft.' : ''}\n\nShe goes back to her own lips, her own hands, ${dellaC >= 4 ? 'her own cleavage, ' : ''}the impossible self-reach the growth gave her. You contribute what you can — friction, warmth, your whole body pressed against her. Between her mouth on her own cock, her hands working the shaft, and your full-body effort, the sensation builds until it crests.\n\nThe climax hits like a natural disaster. Her massive body arches, her cock pulsing against you with force that nearly bucks you clear, her cry shaking dust from the rafters. {della}"Oh FUCK —" The word thunders from twenty feet of Della, shuddering, hands clutching the floor, tools crashing from every surface. You hold on.\n\nShe lifts you away, trembling, and holds you to her face. Her eyes are soft, dazed. She presses her warm lips to your entire body — shoulder to knee — and you taste herself on them. {della}"Was I too much, dear?" She sets you down on the bed, steadying you with one massive finger. She absolutely was.` : `Her ${npcGenSize} cock stands before you, scaled to match the rest of her. A pillar of warm flesh taller than your arm is long. She watches your expression with wide eyes, arousal and wonder fighting across her massive features.\n\nYou press your body against her shaft, arms wrapping as far as they'll reach, grinding yourself along her impossible length. The groan that tears from her throat rattles the windows. {della}"Oh my... oh, that's..." She peeks down at you clinging to her cock, tiny against it, and her composure cracks utterly.${dellaM >= 5 ? ' Her massive hand settles behind you, not pushing, just resting, and the weight of it alone pins you against her shaft.' : ''}\n\nThe climax hits her like a landslide, massive body convulsing, hands clutching the floor, a thunderous cry filling the workshop. Her giant cock pulses against you and her whole body shakes with waves she can't control.\n\nShe lifts you away from her softening cock, holds you up to her face. Her eyes are soft, apologetic. She presses her warm lips to you in a gentle kiss, then sets you down on the bed, steadying you with one massive finger.`,
            'pp': dellaGS >= 3 ? `She looks between you and her own cock. The comparison is absurd.\n\nShe takes your cock between two careful fingertips — your full length pinched gently between thumb and forefinger. {della}"Oh, look at you," she whispers, her resonant voice thick. {della}"You're so small." She rolls you between her fingers, each motion precise, impossibly warm.\n\nThen her free hand reaches down and pulls her shaft toward her mouth — and she realizes she can reach. She knows what to do. She's done this before, for other people, and her lips find the swollen head with practiced ease. The difference is that this time she feels it.\n\nHer whole body shudders. The floor vibrates beneath you.\n\n{della}"Oh." Her massive eyes go wide. {della}"Oh, that's — I've never had one of my own to —" She does it again, more deliberately this time, tongue circling the ridge, and the sound she makes is low and amazed. She knows exactly where to press, exactly how to move her tongue, and every technique she's ever learned is now feeding back into her own body. Her eyes flutter closed. She takes more of the head into her mouth and her hips roll involuntarily.\n\n{della}"I had no idea it felt like this," she breathes against her own cock, and then she stops talking because her mouth is busy.${dellaC >= 4 ? `\n\nShe presses her shaft into her own cleavage, nestling it between her massive breasts, the head rising above them to meet her waiting mouth. She works herself against her own chest, lips and tongue and the soft pressure of her breasts all at once, and her breathing roughens into something desperate.` : ''}\n\nShe loses herself in it. Completely. Her rhythm builds — slow and savoring at first, then hungrier, her mouth working with the focused attention she brings to everything she cares about. Her hips rock in time with her lips, each motion pulling a deeper sound from her chest. She's good at this and she knows it and feeling it from the other side is undoing her.${dellaM >= 5 ? ' She shifts her weight and the floor groans. At this mass, even her gentlest motion carries the weight of something tectonic.' : ''}\n\n${dellaC >= 5 ? `She's close. You can feel it in the trembling of her massive body, the way her breathing comes in ragged gusts. Her fingertips go slack around you — not dropping, just... forgetting. She shifts you absently onto her breast, a vast warm shelf, and her hand returns to her shaft. You're sitting on a surface the size of a mattress, sinking slightly into the warm soft flesh, her nipple somewhere beyond the horizon of her breast. She's completely forgotten you're there.\n\nYou watch her from atop her breast — twenty feet of Della, eyes closed, mouth working her own cock with practiced skill, every technique she's ever learned turned inward. Her chest heaves beneath you with each shuddering breath. The sight of it — her scale, her pleasure, her total absorption — is staggering. You wrap your hand around your cock and start stroking.\n\nShe doesn't notice. Her rhythm builds, her massive body tensing, her moans vibrating through the breast beneath you. You match her pace, grinding against the warm surface, your own climax building in time with hers.\n\nThen she opens her eyes. Looks down. Sees you — tiny, flushed, cock in hand, riding the curve of her breast.\n\n{della}"Oh." Her mouth leaves her cock. {della}"Oh, you're — have you been watching me this whole —" She flushes from her chest to her hairline. But she doesn't stop you. Her eyes drop to your hand, to the tiny motion of it, and something in her expression shifts from mortification to fascination. {della}"Don't stop," she whispers. {della}"Please don't stop."\n\nHer mouth returns to her cock — but now she's watching you, and you're watching her, and the feedback loop doubles. She's on a hair trigger. Three more strokes of her tongue and her whole body locks up. The moan tears out of her and rattles dust from the rafters. {della}"Oh FUCK —" The vibration cascading through her body, through the breast beneath you, through every inch of contact, pulls you over with her. You come on the vast warm surface of her chest and she comes with you, shuddering, enormous, undone.` : `She's close. You can feel it in the trembling of her massive body, the way her breathing comes in ragged gusts. Her fingertips go slack around you — not dropping, just forgetting — and you slip from her loosening grip, sliding down the warm terrain of her torso. Her soft stomach, slick with sweat, offers nothing to grip. You slide until something stops you — the thick, hot base of her shaft, jutting from her body. You're wedged between her cock and her belly, pinned by warm flesh on every side.\n\nShe doesn't notice. Her mouth works her own cock above, her hips rocking, each motion grinding you against the base of her shaft. The heat is overwhelming. Her pulse thuds through the flesh surrounding you. Your cock is pressed flat against her, every thrust of her hips dragging you along.\n\nThen she opens her eyes. Looks down. Can't find you in her fingertips. Panics.\n\n{della}"Where — oh no, where did you —" She looks down her own body and spots you, tiny, wedged against the base of her cock, flushed and grinding. Relief hits first. Then she processes what she's seeing.\n\n{della}"Oh my." Her voice is thick. {della}"Are you — have you been —" She reaches for you, but you grab the hot surface of her shaft and thrust against it, and the vibration of your tiny body against her base makes her gasp. Her hand hovers, trembling, torn between rescuing you and letting you finish what her neglect started.\n\nShe lets you finish. Her hand wraps gently around you and her shaft together, pressing you tighter against the pulsing surface. She's on a hair trigger. Two strokes. Her whole body locks up and a moan tears out of her that rattles dust from the rafters. {della}"Oh FUCK —" The vibration cascading through her shaft, through every inch of contact, pulls you over with her. You come against her cock and she comes with you, shuddering, enormous, undone.`}\n\nShe lifts you to her face, expression dazed and worried at the same time. {della}"I forgot about you. I actually forgot." She sounds devastated. A warm kiss envelops you, tender and enormous. {della}"I'm so sorry, dear." She sets you down on the bed carefully, steadying you with one finger. She is not sorry about any of the rest of it.` : `Her enormous shaft looms above you both. She reaches down and takes your cock between two careful fingers, pinching gently, feeling it throb between her fingertips. Her touch is precise and impossibly warm.\n\n{della}"Oh, look at you," she whispers, her deep voice thick. {della}"You're so small and you feel so good." She strokes you with two fingers while her other hand wraps around her own massive shaft. The sight of the scale difference, your whole cock between her fingertips, her cock filling her fist, makes her breath catch.${dellaM >= 5 ? ' She shifts her weight and the floor groans. At this mass, at this scale, even her gentlest motion carries the weight of something tectonic.' : ''}\n\nHer rhythm builds — fingertips rolling your cock faster while her fist works her own shaft with growing urgency. Her breathing comes in warm, shuddering gusts. She tries to stay gentle with you while her own body demands more, the tension between care and need written across her massive face. Her hips rock, her voice drops to a low, continuous moan, and her eyes squeeze shut. {della}"I can't — I'm —"\n\nThe orgasm tears through her, massive body quaking, her deep voice crying out words that shake the walls. Her fingers tighten around you and the sensation cascades through you both. The workshop trembles around you.\n\nShe lifts you to her face, expression worried. {della}"Oh... was that too much?" A warm kiss envelops you, tender and enormous. She sets you down on the bed carefully, steadying you with one finger.`
        };

        // === Revert ===
        const revert = `\n\nYou find the brass device on the floor, knocked aside during the chaos, but intact. You turn it over, find what looks like a reverse setting, and activate it.\n\nDella shrinks back slowly, her body deflating like a cooling loaf. Ten feet. Eight. Six. Normal. She's soft, round, flushed, breathing hard, kneeling on the floor amid scattered furniture.\n\nShe reaches for you immediately. Cupping your face, brushing your hair back, checking you over with shaking hands. {della}"Oh goodness, are you all right? I didn't crush anything, did I?"\n\nWhen she realizes you're fine, the mortification hits.\n\n{della}"Did I... did I say that word? At that volume?" She covers her face. {della}"The whole street must have heard. Oh dear."\n\nShe peeks between her fingers. She's glowing. She pulls you back to the bed, wrapping around you, warm and soft and normal-sized again.`;

        this.text = tease + '\n\n' + transform + '\n\n' + getSexSceneText('della', branches) + revert;
    },
    actions: [
        { label: 'Continue...', nextScene: 'della_sex_closing' }
    ]
};

SCENES['della_sex_closing'] = {
    id: 'della_sex_closing',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('della', 'base');

        const npcBody = gameState.npcs.della.body;
        const playerBody = gameState.player.body;
        const dellaM = npcBody.muscle;
        const dellaC = npcBody.chest;
        const dellaB = npcBody.butt;
        const dellaGS = npcBody.genitaliaSize;
        const dellaHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerB = playerBody.butt;
        const playerM = playerBody.muscle;
        const playerGS = playerBody.genitaliaSize;
        const npcChest = getBodyStatDesc('della', 'chest');
        const npcButt = getBodyStatDesc('della', 'butt');
        const npcGenSize = getBodyStatDesc('della', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');
        const sawTransform = hasSeenTransformation('della');
        const isGoddess = dellaC >= 5 && dellaB >= 5 && dellaM >= 4;

        let text = '';

        // === Climax (skip if transform path already delivered it) ===
        if (!sawTransform) {
            const climaxOpening = `The dam breaks.\n\nIt starts with a whimper Della tries to catch behind her hand, but it comes out too loud, too raw. Her eyes go wide. Then something inside her lets go, and decades of propriety crack open all at once.\n\nThe apologies are gone. The 'dear' is gone. What's left is a woman who wants MORE and can't believe she's the one saying it.`;

            // PV climax
            let pvClimax;
            if (playerM >= 5 && dellaM <= 1) {
                pvClimax = `She clings to your arms, her soft body rocking with every thrust, unable to do anything but hold on. Her orgasm hits like something released — her whole body clenching around your ${playerGenSize} cock, a cry tearing from her that has no words in it, no apologies, just raw warmth made sound. You follow and she takes all of it, face buried in your shoulder, shaking.`;
            } else if (dellaM >= 4 && playerM <= 1) {
                pvClimax = `She pins you under her full weight and drives down on your ${playerGenSize} cock with warm, inexorable force. Her orgasm doesn't slam — it rolls, like something vast and warm cresting. She holds you in place and her body shudders around you, each wave pulling a sound from her — low, deep, endless. You come inside her and she pulls you deeper, the strength gentle and absolute.`;
            } else if (dellaM >= 5 && playerM >= 5) {
                pvClimax = `Neither yields. You come together — her clenching around your ${playerGenSize} cock, you thrusting through her orgasm, two strong bodies locked together. The bed cracks beneath you. The sounds she makes are unrestrained, warm, enormous. She doesn't have to be careful and the release of that is written across her whole body.`;
            } else {
                pvClimax = `She rocks against you with hips that have abandoned gentleness, taking your ${playerGenSize} cock deep with every roll. The orgasm hits her mid-stroke and her rhythm breaks — she cries out, covers her mouth, pulls her hand away. {della}"Fuck —" The word sounds foreign and she uses it again. {della}"Oh, fuck —" Her whole body shudders, clenching around you, and you follow her over.`;
            }

            // VV climax
            let vvClimax;
            if (dellaM >= 4 && playerM <= 1) {
                vvClimax = `Her strong fingers curl inside you and drive you over first — her other arm holding you in place, immovable. Then yours find the spot inside her and her careful control collapses. She comes with a sound that vibrates through her whole body, her grip tightening, her powerful frame shuddering against you with warm, relentless waves.`;
            } else if (playerM >= 5 && dellaM <= 1) {
                vvClimax = `Your strong hands hold her in place and she comes apart against them — yielding, trusting, the caretaker letting someone else do the work. Her orgasm is loud and surprised and she doesn't cover her mouth. She lets it out. She lets all of it out.`;
            } else {
                vvClimax = `Her fingers inside you quicken past tenderness into need, driving you over. You follow her with your own hand and she breaks — the careful composure, the gentle rhythm, all of it shattering into a cry that fills the workshop. Her hips buck against your hand and she grips your wrist, holding you inside her, riding the waves.`;
            }

            // VP climax
            let vpClimax;
            if (dellaGS >= 2) {
                vpClimax = `She buries her ${npcGenSize} cock deep and the thrust that follows is inexorable — warm, soft, unstoppable. Her orgasm rolls through her in long, shuddering waves. She presses her forehead to yours and the sound she makes is low and endless and has no apology in it. Her cock pulses inside you and she holds you there, trembling, unable to stop.`;
            } else {
                vpClimax = `She pushes her modest cock deep and comes with a gasped {della}"Oh —" that turns into something louder, rawer, a sound she didn't know she could make. She grips you and shakes, each pulse vivid and precise, every sensation amplified by the unfamiliarity. She holds you through it, tender even at the peak.`;
            }

            // PP climax
            let ppClimax;
            if (dellaGS >= 2) {
                ppClimax = `Both thick cocks pulse in her hands — hers and yours straining together — and she grips harder as the orgasm hits. The sound she makes is low, warm, devastated. She strokes through it, both shafts throbbing in her warm grip, and the sensation cascading between them pulls you over seconds after her.`;
            } else {
                ppClimax = `Both cocks pulse in her tender grip. She comes first — a surprised, raw sound, her modest cock throbbing against yours — and the vibration pulls you after her. She holds both of you through it, shaking, her soft hands the only thing in the world that matters.`;
            }

            const branches = {
                'pv': pvClimax,
                'vv': vvClimax,
                'vp': vpClimax,
                'pp': ppClimax
            };

            text += climaxOpening + '\n\n' + getSexSceneText('della', branches);
        }

        // === Comedown (stat-priority) ===
        let comedown;
        if (isGoddess) {
            comedown = `\n\nShe's vast and warm and holding you like something precious. Every inch of her is soft and strong at once — massive chest pillowing your head, powerful arms wrapped around you, enormous ass reshaping the bed beneath you both. She's still apologizing for taking up the whole bed. Still glowing.\n\nHer hand finds your hair, thick fingers threading through it with inexorable tenderness. {della}"Are you comfortable, dear?" The 'dear' is back. But it means something different now. Warmer. Deeper. She pulls you tighter and the strength behind it could crack stone, and the gentleness of it could raise bread.`;
        } else if (dellaC >= 5) {
            comedown = `\n\nYour head rests on her massive chest. She strokes your hair — this part she knows, this is caretaking. But her heartbeat is still racing and the flush hasn't faded. Her enormous breasts rise and fall beneath you with each slow breath.\n\n{della}"Comfortable, dear?" Tender. Genuine. Not quite the same word it was an hour ago. She cups her own breast over your head, adjusting, settling you deeper into the warmth. The nurturing and the afterglow are indistinguishable.`;
        } else if (dellaB >= 5) {
            comedown = `\n\nOn her side, her enormous rear reshaping the mattress behind her. She reaches back, touches it, shakes her head. Pulls the blanket over it.\n\nThen you press against her back and she melts — warm, encompassing, safe. Her body curves around yours and you sink into the softness. {della}"Is this alright?" She already knows. She's already pulling you closer.`;
        } else if (dellaM >= 4) {
            comedown = `\n\nShe opens and closes her hand, watching the muscle work. {della}"I lifted you." Wonder in her voice. {della}"I've never lifted anyone." She wraps her arm around you — carefully, like she might break you. She won't. The embrace is soft, warm, and absolutely immovable.\n\nShe's still processing the strength. Still amazed that her body did that. Still gentle in every single way that matters.`;
        } else if (dellaC <= 1 && dellaM <= 1) {
            comedown = `\n\nSmaller than usual, lighter. She tucks against you, fitting into the crook of your arm. {della}"Is this alright?" She's not sure what to do with herself when she's not the big warm one.\n\nThen your arm closes around her and she discovers she likes being held instead of holding. She settles against you with a soft sigh, her small body warm and close, and something in her relaxes that she didn't know was tense.`;
        } else {
            comedown = `\n\nShe pulls you against her side, warm and soft. Pulls up the blanket, tucks you in. Smooths your hair. Checks for bruises that aren't there. The caretaker reasserts — but warmer now, more intimate.\n\n{della}"That was..." She laughs. Covers her mouth. The laugh keeps going. She's not the same Della who walked in and she knows it, and the knowledge is written in the flush on her cheeks and the brightness in her eyes.`;
        }
        text += comedown;

        // === Transform callback ===
        if (sawTransform) {
            text += `\n\nShe flexes her restored hands, checking her proportions. {della}"I can't believe I — at that size —" She covers her face. Peeks. The glow hasn't faded. {della}"Perhaps we could try it once more? When I'm... prepared?"`;
        }

        // === Player standout modifiers ===
        if (playerC >= 4) {
            text += `\n\nHer hand rests on your chest. Pats it gently. {della}"Oh, those are lovely, dear." Then she blushes at her own forwardness. Her hand stays.`;
        }
        if (playerB >= 4) {
            text += `\n\nHer hand slides to your hip. Stays. {della}"Just... resting my hand." It is not just resting. She gives a gentle squeeze and doesn't acknowledge it.`;
        }

        // === Exit line ===
        text += `\n\n{della}"Would you..." She smooths the blanket, straightens your collar, tucks a strand of hair behind your ear. The caretaker, rebuilding. But the flush is still there and the smile won't stop.\n\n{della}"Would you like me to bring something from the bakery next time? I could make your favorite." She can't ask for sex directly. She frames it as baking. Her eyes say everything the words don't.`;

        this.text = text;
    },
    actions: [
        { label: 'Return to workshop', nextScene: 'workshop_main' }
    ]
};

