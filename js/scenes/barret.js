// ============================================
// BARRET SCENES
// Extracted from scenes.js for modularity
// ============================================

// ==========================================
// BARRET SCENES
// ==========================================

SCENES['barret_greeting'] = {
    id: 'barret_greeting',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'happy');

        // Check if already interacted this phase
        if (hasInteractedThisPhase('barret')) {
            this.text = getAlreadyInteractedMessage('barret');
            this.actions = [{ label: 'Leave', nextScene: 'location_tavern' }];
            return;
        }

        // Check if this is the first meeting (introduction)
        const intro = getNpcIntroduction('barret');
        if (intro) {
            this.text = intro.text;
            this.speaker = intro.speaker;
            markNpcIntroCompleted('barret');
            updateNpcLastSeenPlayer('barret');
            this.actions = [
                {
                    label: 'Continue',
                    nextScene: 'location_tavern',
                    effects: [
                        { type: 'addTrust', npc: 'barret', amount: 1 },
                        { type: 'recordNpcInteraction', npc: 'barret' }
                    ]
                }
            ];
            return;
        }

        // Check for regret event (NPC went too far with transformations)
        const regretData = checkGreetingRegretEvent('barret');
        if (regretData) {
            SCENES['regret_event']._regretData = regretData;
            SceneManager.playScene('regret_event');
            return;
        }

        // Check for genital proposal, goddess reveal, or archetype celebration
        const barretArchEvent = checkGreetingArchetypeEvent('barret');
        if (barretArchEvent && (barretArchEvent.type === 'proposal' || barretArchEvent.type === 'goddess_reveal' || barretArchEvent.type === 'celebration')) {
            SceneManager.playScene(barretArchEvent.sceneId);
            return;
        }

        const reaction = getNpcReactionToChanges('barret');
        if (reaction) {
            this.text = `Barret looks you over with interest. "${reaction}"\n\n"Well now! What can I get you, sweetie?"`;
        } else {
            this.text = "Welcome, welcome! What can I get you, sweetie?";
        }
        updateNpcLastSeenPlayer('barret');

        // Build normal actions
        this.actions = [
            { label: "I'll have a drink", nextScene: 'barret_drink' },
            {
                label: 'Chat',
                nextScene: 'barret_chat',
                condition: () => !hasInteractedThisPhase('barret'),
                effects: [{ type: 'recordNpcInteraction', npc: 'barret' }]
            }
        ];

        // Invite to workshop if desire is known and NPC can be transformed
        const barretState = gameState.npcs.barret;
        const barretDesireKnown = barretState?.desireKnownToPlayer || barretState?.desireRevealed;
        const barretHasGoal = barretDesireKnown && barretState?.currentDesire;
        if (canTransformNpc('barret').canTransform && barretHasGoal && !isNpcSatisfied('barret')) {
            this.actions.push({
                label: 'Invite to workshop',
                nextScene: 'barret_invite_workshop',
                condition: () => !hasInteractedThisPhase('barret'),
                effects: [{ type: 'recordNpcInteraction', npc: 'barret' }]
            });
        }

        if (canFlirtWithNpc('barret').canFlirt) {
            this.actions.push({
                label: 'Flirt',
                nextScene: 'barret_flirt_1',
                condition: () => !hasInteractedThisPhase('barret'),
                effects: [{ type: 'recordNpcInteraction', npc: 'barret' }]
            });
        }

        const barretThresholds = getNpcTrustThresholds('barret');
        if ((barretState?.trust || 0) >= barretThresholds.intimate || barretState?.archetypeIntimateReady) {
            this.actions.push({
                label: 'Intimate...',
                nextScene: 'barret_sex_intro',
                condition: () => !hasInteractedThisPhase('barret'),
                effects: [{ type: 'recordNpcInteraction', npc: 'barret' }]
            });
        }

        if (canSuggestArchetype('barret')) {
            this.actions.push({
                label: 'Suggest a new look',
                nextScene: 'barret_archetype_suggest',
                condition: () => !hasInteractedThisPhase('barret'),
                effects: [{ type: 'recordNpcInteraction', npc: 'barret' }]
            });
        }

        this.actions.push({ label: 'Leave', nextScene: 'location_tavern' });
    },
    actions: []
};

SCENES['barret_drink'] = {
    id: 'barret_drink',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "Barret pours you a frothy ale and slides it across the bar. {barret}\"On the house for my favorite workshop keeper. You look like you could use it.\"\n\nShe leans on the counter, getting comfortable. {barret}\"So, what's new in the world of mysterious devices?\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'serving');
        gameState.player.coin -= 5;
        gameState.npcs.barret.trust += 1;
        saveState();
        UI.updatePlayerSidebar();
    },
    actions: [
        { label: 'Chat', nextScene: 'barret_chat' },
        { label: 'Thanks, I needed this', nextScene: 'barret_drink_thanks' },
        { label: 'Continue', nextScene: 'location_tavern' }
    ]
};

SCENES['barret_drink_thanks'] = {
    id: 'barret_drink_thanks',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: "She beams. \"That's what I'm here for, sweetie. A good drink and a friendly ear. Both free of charge for good customers.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'happy');
        gameState.npcs.barret.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'barret_greeting' }
    ]
};

SCENES['barret_chat_1'] = {
    id: 'barret_chat_1',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: "Barret leans in conspiratorially. \"You know, there's been talk about you around town. The mysterious heir to the mad inventor's workshop. Some folks are curious, others are nervous.\" She winks. \"I'm in the curious camp.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'gossiping');
        gameState.npcs.barret.trust += 1;
        saveState();
    },
    actions: [
        { label: 'What are they saying?', nextScene: 'barret_chat_1b' },
        { label: 'Let them talk', nextScene: 'barret_chat_1c' },
        { label: 'Continue', nextScene: 'location_tavern' }
    ]
};

SCENES['barret_chat_1b'] = {
    id: 'barret_chat_1b',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: "She grins. \"Oh, the usual. Strange lights, odd sounds. Some say you've got your uncle's gift for... changing things.\" She raises an eyebrow. \"Any truth to that?\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'curious');
    },
    actions: [
        { label: 'Continue', nextScene: 'barret_greeting' }
    ]
};

SCENES['barret_chat_1c'] = {
    id: 'barret_chat_1c',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: "She laughs heartily. \"That's the spirit! Confidence is attractive, you know.\" She winks. \"Don't let the gossips get to you.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'happy');
        gameState.npcs.barret.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'barret_greeting' }
    ]
};

SCENES['barret_chat_2'] = {
    id: 'barret_chat_2',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: "Barret glances back at herself in the bar mirror. \"You know, I've always thought my best asset could be... bigger.\" She laughs openly. \"Don't look so shocked! A girl knows what she wants. And what I want is a backside that stops traffic.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'playful');
        gameState.npcs.barret.trust += 1;
        gameState.flags.barret_desire_butt_revealed = true;
        gameState.npcs.barret.desiresRevealed[1] = true;
        saveState();
    },
    actions: [
        {
            label: 'I might be able to help with that',
            nextScene: 'barret_offer_butt',
            condition: () => gameState.day >= 4  // After getting more familiar with devices
        },
        { label: "That's... refreshingly direct", nextScene: 'barret_chat_2b' },
        { label: 'Continue', nextScene: 'location_tavern' }
    ]
};

SCENES['barret_chat_2b'] = {
    id: 'barret_chat_2b',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: "She winks. \"Life's too short for coyness, sweetie. I know what I like, and I'm not afraid to say it. You should try it sometime.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'winking');
        gameState.npcs.barret.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'barret_greeting' }
    ]
};

SCENES['barret_flirt_1'] = {
    id: 'barret_flirt_1',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "{player}\"Has anyone ever told you how good you look in the firelight?\" You give her your best smile.\n\nBarret grins widely. {barret}\"Ooh, someone's feeling bold tonight! I like it.\" She leans closer. {barret}\"Keep talking like that and I might have to close the bar early.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'flirty');
        gameState.npcs.barret.trust += 1;
        saveState();
    },
    actions: [
        { label: 'Is that a promise?', nextScene: 'barret_flirt_1b' },
        { label: 'Continue', nextScene: 'barret_greeting' }
    ]
};

SCENES['barret_flirt_1b'] = {
    id: 'barret_flirt_1b',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: "For once, Barret actually blushes. \"Well, well. You're full of surprises, aren't you?\" She fans herself. \"Come back when the evening crowd thins out. We'll... talk more.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'blushing');
        gameState.npcs.barret.trust += 1;
        gameState.flags.barret_evening_invite = true;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'location_tavern' }
    ]
};

SCENES['barret_offer_butt'] = {
    id: 'barret_offer_butt',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: "Barret's eyes widen. \"Wait, you're serious? You can actually do that?\" She grabs your hands excitedly. \"Oh sweetie, you have no idea how long I've dreamed about this! When can we do it?\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'excited');
    },
    actions: [
        { label: 'Come to my workshop', nextScene: 'barret_accept_workshop_invite' },
        { label: 'Let me prepare first', nextScene: 'location_tavern' }
    ]
};

SCENES['barret_accept_workshop_invite'] = {
    id: 'barret_accept_workshop_invite',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: "Barret bounces excitedly. \"I'll close up early tomorrow and come right over! Oh, I can't wait!\" She hugs you tightly. \"You're the best, you know that?\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'happy');
        gameState.npcs.barret.trust += 1;
        gameState.flags.barret_workshop_visit_scheduled = true;
        gameState.flags.barret_workshop_visit_triggered = false;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'location_tavern' }
    ]
};

SCENES['barret_workshop_arrival'] = {
    id: 'barret_workshop_arrival',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        // Skip intro on repeat visits
        if (gameState.npcs.barret.firstDesireFulfilledDay !== null) {
            SceneManager.playScene('barret_transformation_ready');
            return 'redirect';
        }
        this.image = getNpcImagePathSimple('barret', 'excited');

        // Dynamic text based on current desire
        const npc = gameState.npcs.barret;
        const currentDesire = npc?.currentDesire;
        const desireLabel = currentDesire?.label || 'the body of my dreams';

        this.text = `There's an enthusiastic knock at your door. Barret bursts in, barely able to contain her excitement.\n\n{barret}"I'm here! I closed up early - told everyone I had a headache. Which is a terrible excuse but I couldn't wait!" She looks around at the devices. {barret}"So, which one of these wonderful contraptions is going to give me ${desireLabel.toLowerCase()}?"`;
    },
    actions: [
        { label: 'Right this way', nextScene: 'barret_transformation_ready' },
        { label: 'Let me show you around first', nextScene: 'barret_workshop_tour' }
    ]
};

SCENES['barret_workshop_tour'] = {
    id: 'barret_workshop_tour',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'impatient');
        gameState.npcs.barret.trust += 1;
        saveState();

        // Dynamic text - glancing at the device that matches her desire
        const npc = gameState.npcs.barret;
        const currentDesire = npc?.currentDesire;
        let deviceName = 'the devices';
        if (currentDesire) {
            const statToDevice = {
                butt: 'the Posterior Enhancer',
                chest: 'the Chest Shaper',
                muscle: 'the Muscle Toner',
                genitalSize: 'the Genital Sizer',
                genitalia: 'the Genital Reshaper'
            };
            deviceName = statToDevice[currentDesire.stat] || 'the devices';
        }

        this.text = `Barret listens attentively as you explain the devices, though she keeps glancing at ${deviceName}.\n\n"This is all fascinating, really. Your uncle was brilliant." She fidgets. "But can we... you know... get to the good part?"`;
    },
    actions: [
        { label: 'Of course', nextScene: 'barret_transformation_ready' }
    ]
};

SCENES['barret_transformation_ready'] = {
    id: 'barret_transformation_ready',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'ready');
        gameState.currentTransformationTarget = 'barret';
        saveState();

        // Check if Barret has an active desire/archetype - use dynamic device selection
        const npc = gameState.npcs.barret;
        const currentDesire = npc?.currentDesire;
        if (currentDesire) {
            const label = currentDesire?.label?.toLowerCase() || 'her transformation goal';
            const thresholds = getNpcTrustThresholds('barret');
            const horny = (npc.trust >= thresholds.intimate) || npc.hiddenArchetype === 'goddess';

            if (horny) {
                this.text = `Barret pulls you close by the collar, grinning.\n\n{barret}"${label[0].toUpperCase() + label.slice(1)}. And don't hold back this time." She lets go, turns, and stretches with her arms above her head. {barret}"I want to feel it."`;
            } else {
                this.text = `Barret looks at you eagerly.\n\n{barret}"So! ${label[0].toUpperCase() + label.slice(1)}. Let's do this!" She bounces on her heels. {barret}"Which gadget do we use?"`;
            }
            this.actions = [
                { label: 'Select device', nextScene: 'device_selection' },
                { label: 'Wait, let me prepare more', nextScene: 'workshop_main' }
            ];
        } else {
            // Legacy flow - hardcoded butt transformation (single step only)
            this.text = "Barret positions herself at the Posterior Enhancer, practically vibrating with anticipation.\n\n\"Okay, I'm ready!\" She winks over her shoulder. \"Make it memorable, sweetie.\"";
            this.actions = [
                { label: 'Use device (+1 level)', nextScene: 'barret_transform_butt_moderate' },
                { label: 'Wait, let me prepare more', nextScene: 'workshop_main' }
            ];
        }
    },
    actions: []
};

SCENES['barret_transform_butt_moderate'] = {
    id: 'barret_transform_butt_moderate',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "The device hums to life. Barret gasps as warmth spreads through her lower body.\n\n{barret}\"Ohhh... oh my!\" She grips the handles tightly as her curves begin to expand. {barret}\"Yes! That's it! More!\"",
    onEnter: function() {
        this.image = 'images/transformations/transform_butt_4.webp';
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.barret_transform_butt_moderate_done) {
            gameState.npcs.barret.body.butt = 4;
            gameState.npcs.barret.trust += 3;
            gameState.flags.barret_transform_butt_moderate_done = true;
            recordNpcBodyChange('barret');
            saveState();
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'barret_transform_butt_reaction' }
    ]
};

SCENES['barret_transform_butt_full'] = {
    id: 'barret_transform_butt_full',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "The device flares brightly. Barret cries out in surprise and pleasure as the transformation takes hold.\n\n{barret}\"Oh GOODNESS!\" Her backside swells dramatically, her skirt straining to contain the new curves. {barret}\"It's happening! It's really happening!\"",
    onEnter: function() {
        this.image = 'images/transformations/transform_butt_5.webp';
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.barret_transformation_complete) {
            gameState.npcs.barret.body.butt = 5;
            gameState.npcs.barret.trust += 5;
            gameState.flags.barret_transformation_complete = true;
            recordNpcBodyChange('barret');
            saveState();
        }
    },
    actions: [
        { label: 'Continue', nextScene: 'barret_transform_butt_success' }
    ]
};

SCENES['barret_transform_butt_reaction'] = {
    id: 'barret_transform_butt_reaction',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: `Barret twists to look at herself, eyes wide with delight. Her hands immediately fly to her new curves, fingers sinking into the soft flesh.

"Oh my... OH MY!" She squeezes experimentally, gasping at how much there is to grab now. "It's so soft and... and ROUND!"

She takes your hand and presses it against her hip so you can feel the transformation. "Touch it! Can you feel how much bigger it is?" The warmth of her body radiates through your palm as she guides your fingers over her new shape.

Her whole body shivers with excitement as she gives herself a testing wiggle. "But... could we maybe do a little more? I did say I wanted to stop traffic..."`,
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'pleased');
    },
    actions: [
        { label: 'One more adjustment', nextScene: 'barret_transform_butt_full' },
        { label: 'This is perfect as is', nextScene: 'barret_transform_butt_satisfied' }
    ]
};

SCENES['barret_transform_butt_satisfied'] = {
    id: 'barret_transform_butt_satisfied',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: "Barret nods, accepting your judgment.\n\n\"You know what? You're right. This is already amazing.\" She does a little spin. \"I can feel the difference with every step! Thank you, sweetie. Really.\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'happy');
        gameState.npcs.barret.trust += 1;
        gameState.flags.barret_transformation_complete = true;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

SCENES['barret_transform_butt_success'] = {
    id: 'barret_transform_butt_success',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: "The transformation completes. Barret immediately twists to look at herself.\n\n{barret}\"Oh. My. GOODNESS!\" She laughs with pure delight, giving herself an experimental shake. {barret}\"It's everything I dreamed of and more! I'm going to need a whole new wardrobe!\"\n\nShe turns back to you, eyes sparkling. {barret}\"You wonderful, wonderful person. This is the best gift anyone's ever given me!\"",
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'overjoyed');
    },
    actions: [
        { label: 'Continue', nextScene: 'barret_transform_aftermath' }
    ]
};

SCENES['barret_transform_aftermath'] = {
    id: 'barret_transform_aftermath',
    image: '',
    imagePrompt: null,
    speaker: 'Barret',
    text: `Barret adjusts her now-straining skirt with a satisfied smile, running her hands over the expanded curves one more time.

"I'm going to have to waddle back to the tavern, but it'll be worth every step." She gives her hips a final testing shake, watching the new weight jiggle.

Then she pulls you into a tight hug, and you feel her transformed body pressing against yours - all that new softness warm against your chest. "You've made this girl very, VERY happy."

She holds you close for a long moment, her breath warm against your ear. "Drinks are on the house for life, sweetie. And if you ever need anything - ANYTHING - you come to me. I mean it."`,
    onEnter: function() {
        this.image = getNpcImagePathSimple('barret', 'grateful');
        gameState.npcs.barret.trust += 3;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};


// ============================================
// BARRET SEX SCENES
// ============================================

SCENES['barret_sex_intro'] = {
    id: 'barret_sex_intro',
    image: '',
    speaker: 'Barret',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('barret', 'base');
        markSexUnlocked('barret');

        // --- Variables ---
        const npcBody = gameState.npcs.barret.body;
        const playerBody = gameState.player.body;
        const barretM = npcBody.muscle;
        const barretC = npcBody.chest;
        const barretB = npcBody.butt;
        const barretGS = npcBody.genitaliaSize;
        const barretHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerM = playerBody.muscle;
        const playerB = playerBody.butt;
        const playerGS = playerBody.genitaliaSize;
        const npcInSkirt = barretB >= 5 || (!barretHasVulva && barretGS >= 3);
        const playerInSkirt = playerB >= 5 || (playerBody.genitalia === 1 && playerGS >= 3);
        const npcChest = getBodyStatDesc('barret', 'chest');
        const npcButt = getBodyStatDesc('barret', 'butt');
        const npcGenSize = getBodyStatDesc('barret', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        // --- Part 1: Barret's Body ---
        let part1;
        if (barretM <= 1) {
            if (barretC <= 1) {
                part1 = `Barret's laugh fills the workshop as she pulls you toward the back, red curls bouncing. {barret}"Finally got you alone, love." She unlaces her bodice with practiced fingers, makes a show of it — turning, letting you watch. The bodice falls and she's bare underneath. Lean. Narrow shoulders, flat chest, ribs visible when she stretches. She runs her hands down her own sides and grins.\n\nShe's soft everywhere. No muscle definition, no padding — just warm, yielding skin over a slight frame. She pulls you against her and you can feel her heartbeat directly through her chest, nothing between you. She hums at the contact. {barret}"No barriers." Her palms flatten against your skin. {barret}"I can feel everything like this. Your heartbeat. Your breathing." She presses closer. {barret}"I like it."`;
            } else if (barretC <= 2) {
                part1 = `Barret's laugh fills the workshop as she pulls you toward the back, red curls bouncing. {barret}"Finally got you alone, love." She unlaces her bodice with practiced fingers, makes a show of it — turning, letting you watch. Her ${npcChest} spill free and she cups them, testing the weight with a satisfied nod.\n\nShe's soft all over — no muscle definition, just warm generous skin. She pulls you against her and the contact is immediate, her body yielding into yours without resistance. Her hands find you with easy confidence. {barret}"Mmm." She settles into the embrace. {barret}"I know what this body does."`;
            } else {
                part1 = `Barret's laugh fills the workshop as she pulls you toward the back, red curls bouncing. {barret}"Finally got you alone, love." She unlaces her bodice and her ${npcChest} spill free — heavy, generous, impossible to ignore on her slight frame. She cups them with both hands, winks, lets them drop.\n\nShe's soft everywhere else — narrow shoulders, no muscle tone, warm yielding skin — but that chest dominates. She pulls you against her and her breasts press between you, warm and heavy and inescapable. She knows exactly what she's doing with the imbalance. {barret}"Eyes up here, love." The grin says she doesn't mean it.`;
            }
        } else if (barretM <= 3) {
            part1 = `Barret's laugh fills the workshop as she pulls you toward the back, red curls bouncing. {barret}"Finally got you alone, love." She unlaces her bodice with practiced fingers, makes a show of it — turning, letting you watch. Her ${npcChest} spill free and she cups them with a wink. {barret}"Like what you see?"\n\nShe pulls you against her — toned under the softness, a working body built from years of hauling kegs and leaning across bar counters. Warm, generous, capable. Her hands are everywhere, grabby, playful, performing for you. {barret}"Don't be shy. I've been wanting to get my hands on you."`;
        } else {
            part1 = `Barret's laugh fills the workshop as she pulls you toward the back, red curls bouncing. {barret}"Finally got you alone, love." She unlaces her bodice and rolls her shoulders as it falls — and the body underneath fills the space between you. Dense muscle packed under curves, arms thick, stomach solid. She flexes one arm without looking at it, inventorying, then runs her own hand down her bicep to her hip.\n\nHer ${npcChest} sit heavy on a chest wall that could crack walnuts. She doesn't cup them, doesn't make a show — she stretches, lets you see everything, and watches your reaction with knowing eyes. {barret}"Like the new hardware, love?" She pulls you against her and the contact is like hitting a warm wall. Nothing gives. {barret}"I certainly do."`;
        }
        // Part 1 butt modifier
        if (barretB >= 5) {
            if (npcInSkirt) {
                part1 += `\n\nHer skirt is a formality at this point — stretched taut across an ass that defies the fabric, riding up with every step, barely containing what's underneath. She catches you looking and doesn't bother pretending she minds. She turns, gives it a deliberate shake, and the ripple travels for longer than physics should allow. {barret}"You're staring, love." She looks back over her shoulder. {barret}"Good."`;
            } else {
                part1 += `\n\nHer trousers are fighting a losing battle with her ass — seams straining, fabric stretched smooth across curves that have no business in pants. She catches you looking and turns, gives it a deliberate shake. The ripple is obscene. {barret}"You're staring, love." She looks back over her shoulder. {barret}"Good."`;
            }
        } else if (barretB >= 4) {
            part1 += ` Her ${npcButt} fills out her ${npcInSkirt ? 'skirt' : 'trousers'} in a way that draws the eye — she knows it, shifts her weight to make it obvious.`;
        }

        // --- Part 2: Getting Close (power dynamics) ---
        let part2;
        const bothPetite = playerM <= 1 && barretM <= 1;
        if (playerM >= 5 && barretM <= 1) {
            part2 = `You pull her against you and she vanishes into your body — your arms wrap around her entirely, her slight frame swallowed by muscle. She doesn't resist. She melts into it, pressing her face against your chest, hands spreading across your back.\n\n{barret}"Oh, I like this." Her voice is muffled against you. She tilts her head up, chin on your sternum, and the grin is pure predator — delighted, calculating. {barret}"You could throw me across this room." Her eyes sharpen. {barret}"Maybe later."`;
        } else if (playerM >= 5 && barretM >= 2) {
            part2 = `You pull her close and she yields — willingly, watching you take charge with approval in her dark eyes. She lets your hands settle where they want, lets you angle her, position her. The grin stays but the playfulness drains out of it.\n\n{barret}"Alright then." She rolls her shoulders back, giving you more of her. {barret}"Show me what those arms can do."`;
        } else if (playerM <= 1 && barretM <= 1) {
            // Both petite — sub-branch on player standout stats
            if (playerC >= 4 && playerB >= 4) {
                part2 = `She pulls you close and her hands immediately find the contrast — your slight frame, then the swell of your chest, then your ass. She can't settle. Grabs one, then the other, then back. Her eyes are bright.\n\n{barret}"How are you this small and this stacked at the same time?" She squeezes your ass with one hand, your chest with the other. {barret}"This shouldn't work but it absolutely does." Her grip tightens. {barret}"I'm going to take my time with you."`;
            } else if (playerC >= 4) {
                part2 = `She pulls you close and her hands find your chest immediately — both hands, full grip, testing the weight. Her eyes widen. You're as slight as she is everywhere else, but this is impossible to miss.\n\n{barret}"Well now." She hefts them, thumbs brushing across your nipples. {barret}"Where were you hiding these?" She presses her face between them, breathes in, settles. {barret}"I could stay here."`;
            } else if (playerB >= 4) {
                part2 = `She pulls you close and her hands slide down your back to your ass. Both hands. Full grip. She squeezes and her eyebrows shoot up — on your slight frame, the size is startling.\n\n{barret}"Oh." She squeezes again, harder, pulling you against her. {barret}"You're tiny everywhere except where it counts, love." Her grip is possessive. {barret}"I know exactly what to do with this."`;
            } else {
                part2 = `She pulls you close and you fold together — two slight bodies, all warmth and skin and nothing in the way. Her hands roam across your narrow back, your slim hips, mapping the geography of someone her size.\n\n{barret}"Look at us." She wraps around you, legs tangling, every inch of skin finding a match. {barret}"Nowhere to hide like this." She presses closer, her heartbeat against yours. {barret}"I can feel everything."`;
            }
        } else if (playerM <= 1 && barretM >= 4) {
            part2 = `She pulls you against her and you disappear. Her arms close around you — thick, strong, immovable — and your slight body presses into the wall of her. She doesn't ask. She takes.\n\nOne hand cups the back of your head. The other grips your hip and lifts you — not all the way, just enough that your feet leave the ground for a second. She sets you down exactly where she wants you. {barret}"Stay." The word lands like a hand on your chest. She doesn't negotiate.`;
        } else if (playerM <= 1 && barretM >= 2) {
            part2 = `She pulls you against her and wraps around you — possessive, enveloping. You're slight against her generous frame, and she uses every inch of the difference. Her arms close tight, her chest presses against your face, her warmth swallows you.\n\n{barret}"Come here." She tucks you in closer. {barret}"I've got you." Her hands find your hips and she angles you where she wants you, easy, confident, a woman who knows how to handle something smaller than her.`;
        } else {
            part2 = `She pulls you close and you meet in the middle — matched, willing. Her hands find purchase on your hips, yours on hers. The grin is still there but it's thinning, sharpening at the edges.\n\nThen your eyes meet, and something changes. Her hands stop roaming and settle with purpose. She pulls you closer, and this time it's not playful. It's precise.`;
        }
        // Part 2 modifiers (guard against bothPetite which already handled standouts)
        if (playerC >= 4 && !bothPetite) {
            part2 += ` Her hands find your chest and she doesn't rush — she cups, she weighs, she tests. Thumbs finding the sensitive spots with expert precision. She's done this before. She knows exactly where to press. {barret}"Lovely." One word. Her hands don't leave.`;
        }
        if (playerB >= 4 && !playerInSkirt && !bothPetite) {
            part2 += ` Her hands slide to your ass and grip — hard, pulling you flush against her. She squeezes with a knowing pressure that says she's mapped a hundred bodies and knows this terrain. {barret}"Don't mind me." Her fingers dig in. She minds.`;
        }
        if (playerB <= 1 && bothPetite && playerC < 4) {
            part2 += ` She grabs your ass with one hand and her fingers wrap all the way around. {barret}"Got the whole thing." She squeezes. {barret}"Handful."`;
        }
        if (playerInSkirt && playerB >= 5) {
            part2 += ` Your skirt is ridden up past your massive ass, fabric bunched uselessly at your waist. She stares. Her hands are already there, sinking into the exposed flesh. {barret}"Well." She squeezes. {barret}"Forget the skirt."`;
        } else if (playerInSkirt && playerB < 5) {
            part2 += ` Your cock hangs past the hem of your skirt, too big to hide. She glances down and her grin sharpens. Her hand wraps around it without preamble.`;
        }
        if (npcInSkirt && barretHasVulva) {
            part2 += ` Her skirt is soaked through — dark with wetness, fabric clinging. She doesn't try to hide it.`;
        }
        if (barretM >= 5) {
            part2 += ` Her muscular arms close around you and the strength is real — a flex away from bruising. She notices you noticing and doesn't ease off.`;
        }
        if (barretC >= 5) {
            part2 += ` Her massive chest presses between you, impossible to ignore — every breath pushes them harder against you.`;
        } else if (barretC >= 3 && !bothPetite) {
            part2 += ` Her ${npcChest} press between you as she pulls closer.`;
        }

        // --- Part 3: Foreplay (the mask drops) ---
        let part3;
        if (barretM <= 1) {
            part3 = `She strips the rest slowly. Makes a production of it — skirt sliding down, stepping out, a little spin. Bare, soft, slight, every line of her body on display. She watches you watching her.\n\nThen the show stops. She goes still. Her eyes find yours and the playful warmth drains out of them, replaced by something focused and dark. She runs her own hands down her sides — not performing anymore. Testing. Feeling what she has.\n\n{barret}"Come here." Two words. No "love." The predator doesn't need a large body to hunt.`;
        } else if (barretM <= 3) {
            part3 = `She strips with practiced ease — bodice already gone, skirt unhooked with one hand, stepping out without looking down. She knows this body, knows how it moves. She runs her hands over herself, palms flat against toned stomach, fingers tracing the muscle under soft skin.\n\nThen she looks at you. And the barmaid evaporates. The grin thins to a line. Her chin drops. Her eyes go dark and still, locked on yours with an intensity that makes the air feel thicker.\n\nNo "love." No wink. Just Barret, stripped bare in more ways than one, and eyes that say she's done performing.`;
        } else {
            part3 = `She strips and her body fills the room. Dense muscle, thick limbs, power coiled under warm skin. She rolls her shoulders, flexes her hands, inventorying — not showing off like someone who just discovered strength. Cataloguing. She knows what every muscle does and she's running the checklist.\n\nShe catches your eyes and the barmaid falls away like a mask being set on a shelf. Her jaw sets. Her breathing slows. She rolls her neck once — a boxer before the bell.\n\n{barret}"Come here." Her voice drops a full register. No warmth, no play. The predator has teeth now, and she's done waiting.`;
        }

        const opening = part1 + '\n\n' + part2 + '\n\n' + part3;

        // --- Genital Branches ---

        // === PV: player penis + Barret vulva ===
        let pvText;
        if (playerM >= 5 && barretM <= 1) {
            pvText = `You lift her onto the workbench — she weighs nothing, her slight body settling in your hands like she was made to be picked up. She wraps her legs around you, heels hooking your back, and looks up at you with dark, steady eyes.\n\nYou push your ${playerGenSize} cock into her pussy and the look doesn't waver. She takes you in with a controlled exhale, jaw tight, hands gripping your arms. She yields — but strategically. Watching. Adjusting. Letting you set the pace because she's choosing to, not because she can't stop you.\n\nShe shifts her hips, changes the angle by a fraction, and suddenly every thrust hits exactly where she wants it. {barret}"Harder." Not asking. She yields like a door that opens exactly where it wants you to walk.`;
        } else if (barretM >= 4 && playerM <= 1) {
            pvText = `She pushes you onto the workbench. One hand on your chest, pressing you flat. She straddles you, positions your ${playerGenSize} cock against her pussy, and sinks down with a roll of her hips that leaves no doubt who's in charge.\n\nShe rides with grinding precision — each motion deliberate, controlled, taking exactly what she wants at the depth she wants it. Her hands pin your wrists to the wood. Her eyes don't blink. She watches your face the way a hawk watches a mouse.\n\n{barret}"More?" She rolls her hips deeper. She already knows the answer.`;
        } else {
            pvText = `She bends over the workbench and looks back with that grin. {barret}"Come on then, love, don't make me —"\n\nYou grip her ${npcButt} and push your ${playerGenSize} cock into her pussy, and the sentence dies. Her eyes widen, then narrow. The grin fades into something focused and intent.\n\nShe pushes back to meet you, but the playful bouncing is gone. Each motion is deliberate, grinding, taking exactly what she wants. Her hands grip the workbench edge, knuckles whitening. Her moans drop lower. Rougher.\n\nShe looks back over her shoulder, and there's no performance left. Just dark eyes locked on yours, red curls sticking to her flushed neck. {barret}"Harder." Not asking. No "love." Just the word, and eye contact that doesn't break.`;
        }
        // PV stat modifiers
        if (barretC >= 4) {
            pvText += `\n\nHer ${npcChest} swing with every thrust — heavy, shifting momentum she doesn't comment on. She braces differently, uses the weight as counterbalance, adjusts her stance. She doesn't look down at them. Doesn't need to. She already knows what they do.`;
        }
        if (barretB >= 5) {
            pvText += `\n\nHer massive ass takes over the scene. She backs into you with the full weight of it, every thrust landing with the momentum of all that flesh behind it. She doesn't just receive — she drives, pushing back harder, making you feel every ripple that travels across those enormous cheeks. She controls the depth with her hips, the angle with her ass, pins you between the workbench and the wall of her body. She grinds back against your cock between thrusts, slow and deliberate, and looks over her shoulder with eyes that say she could do this all night.\n\n{barret}"Don't stop." She pushes back harder. The workbench creaks. She doesn't care.`;
        }
        if (barretM >= 5 && !(barretM >= 4 && playerM <= 1)) {
            pvText += ` Her hands grip the workbench edge and the wood groans under her fingers. She doesn't notice.`;
        }
        // PV player standout modifiers
        if (playerC >= 4) {
            pvText += `\n\nHer hand finds your chest mid-thrust — not grabbing, working. She knows exactly where the weight shifts, exactly how to squeeze to make your rhythm stutter. She takes her time, thumb circling, palm pressing. Expert hands. {barret}"These." One word. Her grip tightens.`;
        }
        if (playerB >= 4) {
            pvText += `\n\nHer hands slide to your ass and grip with both palms, pulling you deeper into her with each thrust. She uses your own body against you — your weight, your momentum — angling you where she wants you. {barret}"Give me all of it."`;
        }
        // PV size overlay (post-climax)
        if (playerGS >= 2 && barretGS === 0) {
            if (barretM <= 1) {
                pvText += `\n\nHer tight pussy fights your cock the whole way in — her slight body clenching, resisting, then deliberately opening. She breathes through every inch with controlled precision, jaw set, working you deeper by force of will. She shifts carefully, a satisfied wince. {barret}"Big." She meets your eyes. {barret}"I can feel every inch." No surprise in it. Just assessment.`;
            } else {
                pvText += `\n\nHer tight pussy grips you — every inch a snug, deliberate fit. She controls every clench, every release, toying with the pressure. {barret}"You're thick." Assessment, not complaint. {barret}"I can feel all of it."`;
            }
        } else if (playerGS === 0 && barretGS >= 2) {
            pvText += `\n\nShe's slick and swollen around you — thick folds gripping your modest cock in plush, wet heat. She clenches deliberately, milking every movement. {barret}"Perfect fit." She says it like she planned it.`;
        } else if (playerGS === 0 && barretGS === 0) {
            pvText += `\n\nBoth tight, both precise — her compact pussy grips your modest cock with deliberate control, every movement vivid and exact. She clenches and releases at will, driving you to the edge and holding you there. {barret}"I know what I'm doing." She does.`;
        }

        // === VV: both vulva ===
        let vvText;
        if (barretB >= 5) {
            // b5 VV special — centerpiece moment, replaces the standard power dynamic
            vvText = `She turns around without a word, bends, and backs her massive ass toward your face. The sheer volume of it fills your vision — enormous, heavy, deliberate. She pushes you down onto the workbench and settles over you, that impossible ass pinning you under its weight. Her thighs press against your ears, warm and inescapable.\n\nHer face drops between your legs from below and her tongue finds your pussy with focused precision. No teasing, no warmth-up. She licks broad and flat, then zeroes in on your clit with the same predatory focus she brings to everything.\n\nYou're smothered. Her massive cheeks press against your face, her pussy grinding against your mouth while she works you from below. You grip those enormous cheeks and your fingers sink deep — there's so much of her, warm and soft and overwhelming.\n\nShe grinds harder. Her tongue doesn't stop. She controls the entire encounter through her ass — the pressure, the angle, the rhythm. She savors it, rolling her hips in slow deliberate circles, and the sound she makes against your pussy is low and guttural.`;
        } else if (playerM >= 5 && barretM <= 1) {
            vvText = `You push her down onto the workbench and pin her there — one hand on her chest, the other sliding between her legs. She opens for you without resistance, dark eyes locked on yours, her slight body spread beneath you.\n\nYour fingers find her soaking and you push inside. She grips the workbench edge, jaw clenching, watching you work her with an intensity that says she's memorizing every second. She submits — but her eyes never close. She's studying you.\n\nHer own hand reaches between your legs from below, fingers working you with precise, focused strokes even while pinned. She matches your rhythm exactly. {barret}"Don't stop." Through gritted teeth.`;
        } else if (barretM >= 4 && playerM <= 1) {
            vvText = `She pushes you down onto the workbench and drops between your legs. Her strong hands spread your thighs and hold them apart — her grip is immovable. She buries her face in your pussy and eats you out with predatory focus.\n\nNo teasing. No buildup. Her tongue works you with ruthless precision, hands gripping your thighs hard enough to leave marks. She controls you with her mouth and hands, and the sounds she makes are low and rough, vibrating against you.\n\nShe pulls back just long enough to guide your hand between her legs. She's soaking. {barret}"Your turn." It's not a request.`;
        } else {
            vvText = `She drops to her knees between your thighs, spreading them with confident hands. {barret}"Let me take care of you, lo —"\n\nHer tongue finds your pussy and your reaction stops her mid-word. Not because you interrupted. Because she forgot what she was saying. The taste, the heat, the way your thighs clench around her head. The performance dissolves.\n\nShe doesn't tease. Doesn't make a show. Her tongue works you with focused precision, hands gripping your thighs hard enough to leave marks, pulling you against her mouth. Red curls brush your skin. She looks up once, and the look in her eyes is predatory.\n\nWhen you reach for her, she guides your hand between her legs without breaking rhythm. She's soaking. She hasn't said a word in minutes.`;
        }
        // VV gs-awareness
        if (playerGS >= 2 && barretGS >= 2) {
            vvText += `\n\nBoth swollen — thick folds meeting thick folds, everything slick and puffy and overwhelming. The heat between you is staggering. Her eyes go dark, unfocused for a moment, and something predatory surfaces hard. She grinds against you with desperate precision. {barret}"More." Through gritted teeth.`;
        } else if (playerGS === 0 && barretGS === 0) {
            vvText += `\n\nHer pussy is a weapon. Tight, compact, every muscle under her control. She clenches around your fingers and releases, clenches and releases — toying with you, driving you to the edge and pulling back. She watches your face the entire time, reading you, adjusting the pressure with surgical precision. {barret}"I know exactly what I'm doing." She does.`;
        } else if (playerGS >= 2 && barretGS === 0) {
            vvText += `\n\nYour swollen folds are thick under her fingers — she traces every ridge, every crease with expert hands. She knows exactly where to press on a swollen pussy, exactly how much pressure makes you shake. Her own tight grip milks every movement of your fingers. She's precise where you're plush.`;
        } else if (playerGS === 0 && barretGS >= 2) {
            vvText += `\n\nShe's plush and dripping — thick lips parting easily, her swollen pussy engulfing your fingers in slick heat. She grinds against your hand, uses the volume of herself, and your tight entrance clenches in response. She feels the difference and her eyes sharpen. {barret}"Tight." She pushes deeper.`;
        }
        // VV stat modifiers
        if (barretC >= 4 && barretB < 5) {
            vvText += `\n\nHer ${npcChest} press between your bodies as she grinds closer — warm, heavy, inescapable. She uses the weight, pins you under them. She doesn't comment. She doesn't need to.`;
        }
        if (barretM >= 5 && !(barretM >= 4 && playerM <= 1) && barretB < 5) {
            vvText += ` Her fingers inside you are strong — too strong. She feels you tense and adjusts instantly. Not because she's worried. Because she knows exactly how much force to apply.`;
        }
        // VV player standout modifiers
        if (playerC >= 4) {
            vvText += `\n\nShe buries her face between your breasts while her fingers work you — taking her time, mouth on your skin, tongue tracing circles. She knows exactly how to use her mouth on your chest to amplify what her hands are doing below.`;
        }
        if (playerB >= 4) {
            vvText += `\n\nShe grabs your ass with both hands, lifts your hips to her mouth. Uses your own body's weight against you — angling, adjusting, finding the perfect position and holding you there.`;
        }

        // === VP: Barret penis + player vulva ===
        let vpText;
        if (barretGS >= 2) {
            // Big cock
            if (playerM >= 5 && barretM <= 1) {
                vpText = `You push her onto the workbench and straddle her. Her thick cock stands rigid against her stomach — heavy, straining. She looks up at you, eyes dark and steady. You lower yourself onto her and her jaw clenches as she slides into your pussy, watching every inch disappear.\n\nShe doesn't thrash. Doesn't lose control. She grips the workbench edge and lets you ride her, taking it all, studying your face with focused intensity. She adapted to this cock the moment she got it — she's already weaponized it. Each roll of her hips pushes deeper, angled precisely. She knows what her size does to you and she uses it. {barret}"More?" Eyes locked. She already knows.`;
            } else if (barretM >= 4 && playerM <= 1) {
                vpText = `She lifts you with strong arms and positions you over her thick cock. No hesitation. She lowers you slowly, watching you take her into your pussy, and each inch slides in with deliberate, devastating patience. She holds you exactly where she wants you.\n\nShe starts thrusting — powerful, measured, each stroke pushed all the way in, held, then drawn back. She watches your face with predatory attention, studying what her size does to you. She relishes it. Uses every inch as a tool, angling, adjusting, finding the depth that makes you gasp and driving there again. {barret}"Don't look away." Her hips drive deeper.`;
            } else {
                vpText = `She positions her thick cock against your pussy and pushes in — slow, deliberate, eyes on yours. She feels every inch and she owns every inch. No surprise, no fumbling. She slides deeper, reads your reaction, adjusts.\n\nShe sets a rhythm that's nothing like playful. Deep. Slow. Each thrust pushed all the way in, held, then drawn back. She watches your face with the focused intensity of a woman who knows exactly what her size does and exactly how to deploy it. She uses the full length — not to overwhelm, but to control. Every withdrawal makes you need the next thrust.\n\n{barret}"More?" Breath hot against your ear. She's already moving deeper.`;
            }
        } else {
            // Modest cock
            if (playerM >= 5 && barretM <= 1) {
                vpText = `You push her onto the workbench and straddle her. Her modest cock stands rigid — small, familiar, hers. You sink onto her and she takes a controlled breath, hands settling on your thighs with purpose.\n\nShe doesn't need size. She knows this cock. She angles her hips with precision, finds the spot that makes you gasp, and works it with deliberate, repetitive strokes. She watches your face and adjusts in real-time — depth, angle, rhythm, all calibrated. {barret}"Right there." She shifts a fraction. She was right.`;
            } else if (barretM >= 4 && playerM <= 1) {
                vpText = `She lifts you and lowers you onto her cock — strong, controlled, precise. Her modest cock slides into your pussy and she knows exactly what to do with it. Confident thrusts, measured depth. She's lived with this body. She understands every angle.\n\nHer arms hold you in place while her hips do the work — powerful, efficient, each stroke hitting where she wants it. She doesn't waste a movement. {barret}"I know what I have." Her voice drops. {barret}"And I know how to use it."`;
            } else {
                vpText = `She lifts you onto the workbench, positions her modest cock against your pussy, and slides in. Confident. Deliberate. She knows this body, knows the fit, knows the angle.\n\nShe sets a rhythm that's controlled and precise — nothing rushed, nothing wasted. Every thrust finds its target. She watches your face, reads you, adjusts. Her hands on your hips guide you exactly where she wants you. {barret}"I don't need size." She pushes deeper, hits the right spot, watches your eyes widen. {barret}"I need this." She does it again.`;
            }
        }
        // VP stat modifiers
        if (barretC >= 4) {
            vpText += `\n\nHer ${npcChest} press against you during deep thrusts — heavy, warm, pinning you under their weight. She uses them, leans in, lets them do the work of holding you in place. She doesn't mention them. She doesn't need to.`;
        }
        if (barretB >= 5) {
            vpText += `\n\nEvery thrust carries the momentum of her massive ass behind it — she backs up, grinds forward, makes you feel the full weight. Between thrusts she rubs her ass against your crotch, slow and deliberate, teasing. She's playing with her food. She looks back over her shoulder and the grin is gone. Just dark eyes and purpose.`;
        }
        if (barretM >= 5 && !(barretM >= 4 && playerM <= 1)) {
            vpText += ` Her grip on your hips is iron. She holds you exactly where she wants you and the strength isn't accidental — it's deployed.`;
        }
        // VP player standout modifiers
        if (playerC >= 4) {
            vpText += `\n\nShe grabs your chest while she thrusts — squeezing in rhythm, timing the pressure to the depth. She knows the timing that makes it intense. Expert hands. She's done this before.`;
        }
        if (playerB >= 4) {
            vpText += `\n\nShe grabs your ass with both hands, pulls you onto her cock. Uses your body's own weight to set the depth — pulling, releasing, pulling deeper.`;
        }
        // VP size overlay
        if (barretGS >= 2 && playerGS === 0) {
            vpText += `\n\nShe has to work for every inch — your tight pussy gripping her thick cock, resisting, clenching. She pushes in slow and steady, jaw set, reading your face, adjusting pressure. Not because she's worried about hurting you. Because she likes to savor the hunt.\n\n{barret}"Tight." A satisfied assessment. She shifts inside you. {barret}"I can feel all of that."`;
        } else if (barretGS === 0 && playerGS >= 2) {
            vpText += `\n\nHer modest cock slides into your swollen pussy easily — plush walls enveloping her completely in slick heat. She uses the fit, the closeness, every clench you give her. {barret}"You're wrapping around me." She says it with satisfaction. {barret}"Every bit."`;
        } else if (barretGS === 0 && playerGS === 0) {
            vpText += `\n\nBoth compact — she fits snugly inside you, every inch vivid and precise. She uses every fraction of what she has. {barret}"Perfect fit." She means it.`;
        }

        // === PP: both penis ===
        let ppText;
        if (barretGS >= 2) {
            // Big cock
            if (playerM >= 5 && barretM <= 1) {
                ppText = `You wrap your powerful hand around both cocks. Her thick shaft presses against yours — heavy, straining, hot. She grabs your forearm and feels the muscle flex as you stroke. Her hips roll into each pass, deliberate, controlled.\n\nShe watches the contact — both cocks caught in your grip, the friction, the slide. Her jaw clenches. Her eyes don't waver from yours. She uses her size, pressing harder against you, controlling the friction even while you control the grip. Her cock throbs against yours and her breathing goes ragged — close, fighting it, every muscle in her slight body straining. {barret}"Don't stop." Through gritted teeth.`;
            } else if (barretM >= 4 && playerM <= 1) {
                ppText = `She wraps her strong hand around both cocks — both thick, barely fitting in her grip. She pins you to the workbench with her free arm and strokes with controlled precision, her grip firm, measured.\n\nShe uses her size deliberately — pressing her thick cock against yours, controlling the friction with expert adjustments. She watches the contact with predatory focus. Both cocks throb in her grip and her jaw locks — she's shaking, close, the rhythm going desperate. Her hand tightens. {barret}"I've got you." She's right at the edge and dragging you with her.`;
            } else {
                ppText = `She wraps her hand around both cocks, pressing them together. Her thick shaft strains against yours — heavy, hot, pulsing. She starts to stroke and her eyes lock on yours.\n\nShe uses her size. Presses her thick cock against yours deliberately, controls the friction, adjusts the angle. She watches your reaction with focused attention — not fascinated by the sensation, weaponizing it. She knows what the pressure does and she drives it. Her cock throbs hard against yours and her whole body tenses — jaw locked, breathing raw, right at the edge. Her grip tightens and doesn't let up. {barret}"More." The word barely makes it out.`;
            }
        } else {
            // Modest cock
            if (playerM >= 5 && barretM <= 1) {
                ppText = `You wrap your powerful hand around both cocks — her modest shaft nestled against yours, warm and rigid. She grabs your forearm, feeling the muscle flex. Her hips push into each stroke with deliberate purpose.\n\nShe knows her cock. Knows the rhythm, knows the pressure. She uses that knowledge, grinding against you with practiced precision. Her cock pulses against yours and her whole body goes taut — shaking, close, jaw clenched. Her grip on your arm tightens. {barret}"Keep going." She's fighting it, losing.`;
            } else if (barretM >= 4 && playerM <= 1) {
                ppText = `She wraps her strong hand around both cocks and pins you to the workbench. Her thick fingers encompass both shafts — both modest, fitting neatly in her grip. She strokes with confidence. She knows what works.\n\nHer rhythm is controlled, measured, relentless. She watches your face and adjusts — pressure, speed, angle. Both cocks throb in her grip and her controlled rhythm breaks — jaw tight, breathing hard, close. Her hand doesn't release. {barret}"I know what I have." Her grip tightens. {barret}"And what to do with it."`;
            } else {
                ppText = `She wraps her hand around both cocks, pressing them together — both modest, fitting neatly in her grip. She starts to stroke with confident, practiced rhythm. She knows her cock. She uses that knowledge on both.\n\nHer eyes lock on yours. The performance is gone — just focused precision, building speed, reading your reactions and adjusting. Both cocks pulse together and her rhythm goes desperate — breathing raw, close, every muscle straining. Her grip tightens. {barret}"Don't look away." She's right at the edge and holding on.`;
            }
        }
        // PP stat modifiers
        if (barretC >= 4) {
            ppText += `\n\nShe presses both cocks between her chest — soft pressure from both sides, stroking with the weight of her breasts. She found a new tool and she's already mastered it. She doesn't comment. Just uses them.`;
        }
        if (barretB >= 5) {
            ppText += `\n\nShe grinds both cocks against her ass — presses them into the valley between those massive cheeks, clenches, controls the friction with her hips. Slow, deliberate, devastating. She looks back over her shoulder with dark eyes. She found her favorite game.`;
        }
        if (barretM >= 5 && !(barretM >= 4 && playerM <= 1)) {
            ppText += ` Her grip tightens and you wince — she adjusts instantly. Not apologetic. Calibrating.`;
        }
        // PP player standout modifiers
        if (playerC >= 4) {
            ppText += `\n\nShe presses your cock against your own chest, strokes it there while she works hers. Uses your body as a surface — knowing exactly how the soft pressure amplifies everything.`;
        }
        if (playerB >= 4) {
            ppText += `\n\nShe reaches behind you, grabs your ass, pulls your hips into each stroke. Uses your own momentum against you.`;
        }
        // PP size overlay
        if (playerGS >= 2 && barretGS >= 2) {
            ppText += `\n\nTwo thick cocks barely fit in one hand — the friction is devastating, both shafts straining. She flexes her grip. {barret}"We need a bigger hand." She means it.`;
        } else if (playerGS === 0 && barretGS === 0) {
            ppText += `\n\nBoth modest — they fit neatly together, compact and precise. She looks down at them with satisfaction. {barret}"Efficient." The word carries approval.`;
        } else if (playerGS >= 2 && barretGS === 0) {
            ppText += `\n\nYour thick cock dwarfs hers — she stares at the contrast, grip adjusting around the size difference. {barret}"Yours is something." Assessment, not envy. She strokes harder.`;
        } else if (playerGS === 0 && barretGS >= 2) {
            ppText += `\n\nHer thick cock dwarfs yours — she presses them together deliberately, using the size difference to control the friction. {barret}"I make the rules here." She squeezes to prove it.`;
        }

        const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };
        this.text = opening + '\n\n' + getSexSceneText('barret', branches);

        gameState.npcs.barret.trust += 1;
        saveState();
    },
    actions: [
        {
            label: 'Something unexpected happens...',
            nextScene: 'barret_sex_transform'
        },
        {
            label: 'Continue...',
            nextScene: 'barret_sex_closing'
        }
    ]
};

SCENES['barret_sex_transform'] = {
    id: 'barret_sex_transform',
    image: '',
    speaker: 'Barret',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('barret', 'transform');
        markTransformationSeen('barret');

        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');
        const npcGenSize = getBodyStatDesc('barret', 'genitaliaSize');
        const npcChest = getBodyStatDesc('barret', 'chest');
        const npcBigVulva = gameState.npcs.barret.body.genitalia === 0 && gameState.npcs.barret.body.genitaliaSize >= 3;
        const playerBigVulva = gameState.player.body.genitalia === 0 && gameState.player.body.genitaliaSize >= 3;

        // Tease (folded in from barret_sex_transform_tease)
        const tease = `Her elbow catches a device on the shelf behind her. It clatters, hums, and a warm pulse radiates outward before either of you can react. Barret goes still. Something is already happening — warmth pooling in her hips, her lower back, spreading with each pulse. Her eyes narrow, not with alarm, but with that predatory focus sharpening on a new sensation.`;

        const transformDesc = `The device pulses and something shifts. Barret goes still, that predatory focus flickering into confusion. Then her eyes widen.\n\nHer ass is growing. You can see it happening, her already generous backside swelling outward in waves, each pulse pushing her fuller, rounder, heavier. Her hips spread to match, thighs thickening, and the sheer weight of it forces her to grab the workbench for balance.\n\nFor a moment the predator falters. She looks over her shoulder at the enormous shelf of flesh her ass has become, and something almost vulnerable crosses her face. Then it hardens. She runs one hand over the massive curve, fingers sinking deep into soft flesh, and the predator doesn't flinch. She adapts.\n\nShe slaps one enormous cheek and watches the ripple travel across it like a wave. No laugh. No wink. Just dark eyes finding yours with a look that says she already knows exactly what she's going to do with this.`;

        const branches = {
            'pv': `She bends over the workbench without a word, that massive ass raised, and looks back at you with eyes that don't blink. You grip those enormous cheeks, fingers disappearing into soft flesh, and slide your ${playerGenSize} cock between them. She's impossibly tight around the sheer volume of her, and when you push inside, the sound she makes is low and guttural. Not playful. Not performed.\n\nEach thrust sends waves rippling across that massive ass. She braces against the workbench, pushing back into you with focused intensity, taking every inch with deliberate purpose. No "love." No encouragement. Just her body demanding more.`,
            'vv': `She pushes you down onto the workbench and climbs over you, that massive ass settling over your face with a weight that pins you. No warning, no teasing. Just her thighs on either side of your head and her ${npcBigVulva ? 'swollen, heavy' : 'soaking'} pussy against your mouth.\n\nYou grip those enormous cheeks and they overflow your hands. Your tongue finds her${npcBigVulva ? ', dragging through thick, plush folds' : ''} and the sound she makes vibrates through her whole body. She grinds against your face with deliberate pressure, her massive ass rippling with every movement, and reaches between your legs with precise, focused fingers${playerBigVulva ? ', parting the full swell of your pussy' : ''}.`,
            'vp': `She bends you over the workbench and presses her ${npcGenSize} cock against you from behind, that enormous ass giving her a new center of gravity. When she pushes into your pussy, the thrust carries the weight of all that flesh behind it, deep and unavoidable.\n\nHer massive hips roll as she finds her rhythm, each stroke deliberate, punishing. Her ${npcChest} press against your back and you can feel her breath, controlled and steady. Her hands pin your hips with that hunter's grip, and every thrust sends a ripple through her expanded ass that you can feel against your thighs.`,
            'pp': `She wraps her hand around both shafts and presses them into the valley between those enormous cheeks. The soft flesh swallows both cocks as she clenches, squeezing with focused precision, and begins to roll her hips.\n\nThe friction is overwhelming. Warm, impossibly soft, and she controls every ounce of pressure. She looks over her shoulder, not to perform or tease, but to watch your face with that predator's attention while her massive ass works both of you with grinding, deliberate rhythm.`
        };

        // Climax (in transformed state)
        const climax = `\n\nThe orgasm hits like an earthquake. Her whole body goes rigid, every inch of that massive ass clenching tight, and the sound she makes is barely human. Low, guttural, forced through a jaw locked shut. Her thighs shake. Her knuckles go white on whatever she's gripping. And through it all, her eyes stay open.\n\nYou follow, and the aftershocks ripple through her expanded flesh in waves that seem to last forever.`;

        // Revert
        const revert = `\n\nThe device winds down, and her ass begins to shrink. She can feel it going — all that warm heavy flesh receding, hips narrowing back to their normal proportions. She watches it happen over her shoulder, expressionless.`;

        this.text = tease + '\n\n' + transformDesc + '\n\n' + getSexSceneText('barret', branches) + climax + revert;
    },
    actions: [
        { label: 'Continue...', nextScene: 'barret_sex_closing' }
    ]
};

SCENES['barret_sex_closing'] = {
    id: 'barret_sex_closing',
    image: '',
    speaker: 'Barret',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('barret', 'base');

        const npcBody = gameState.npcs.barret.body;
        const playerBody = gameState.player.body;
        const barretM = npcBody.muscle;
        const barretC = npcBody.chest;
        const barretB = npcBody.butt;
        const barretGS = npcBody.genitaliaSize;
        const barretHasVulva = npcBody.genitalia === 0;
        const playerM = playerBody.muscle;
        const playerC = playerBody.chest;
        const playerB = playerBody.butt;
        const playerGS = playerBody.genitaliaSize;
        const npcChest = getBodyStatDesc('barret', 'chest');
        const npcButt = getBodyStatDesc('barret', 'butt');
        const npcGenSize = getBodyStatDesc('barret', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');
        const sawTransform = hasSeenTransformation('barret');
        const isGoddess = barretC >= 5 && barretB >= 5 && barretM >= 4;

        let text = '';

        // === Climax (skip if transform path already handled it) ===
        if (!sawTransform) {
            const climaxOpening = `The pace builds and Barret doesn't speed up so much as bear down. Every motion becomes tighter, harder, more deliberate. Her jaw clenches. Her breathing goes sharp through her nose — controlled, forced steady, because everything else is spiraling.\n\nHer fingers dig into you, leaving marks she doesn't notice. Her eyes stay open, locked on yours. No throwing her head back, no squeezing her eyes shut. She watches you while she comes apart.`;

            // PV climax
            let pvClimax;
            if (playerM >= 5 && barretM <= 1) {
                pvClimax = `She grips your arms with her slight hands and takes your final thrusts without looking away. Her orgasm hits low and guttural, through gritted teeth, her whole body clenching around your ${playerGenSize} cock. You follow, and she takes it — every pulse, every throb, her dark eyes locked on yours the entire time.`;
            } else if (barretM >= 4 && playerM <= 1) {
                pvClimax = `She grinds down on your ${playerGenSize} cock with the full force of her powerful body — each roll deliberate, punishing. Her orgasm hits like a wave crashing: low sound, locked jaw, thighs clamping. She doesn't slow down. She rides through it and drives you over after her.`;
            } else {
                pvClimax = `She pushes back against you with a roll of her hips that's almost violent, grinding your ${playerGenSize} cock deeper. Her orgasm hits low and rough — a sound through gritted teeth, barely human. Her ${npcButt} clenches and her thighs shake, but her eyes don't close. You follow, and she takes it, takes all of it, still watching your face.`;
            }

            // VV climax
            let vvClimax;
            if (barretB >= 5) {
                vvClimax = `She grinds her massive ass harder against your face as the orgasm hits — low, guttural, vibrating against your pussy as she comes with her mouth still working you. The weight of her pins you through it. You come moments after, smothered, overwhelmed, and she rides both orgasms with deliberate rolls of her enormous hips.`;
            } else if (playerM >= 5 && barretM <= 1) {
                vvClimax = `She comes beneath your hands — jaw locked, eyes open, her slight body going rigid. Silent except for a single controlled exhale. Her fingers don't stop working you, and she drives you over seconds later with precise, vicious strokes.`;
            } else if (barretM >= 4 && playerM <= 1) {
                vvClimax = `Her tongue drives deep, relentless, and you come first — thighs clamping around her head. She doesn't stop. Rides you through it, her strong fingers curling inside herself with ruthless precision. Her orgasm is silent except for a single strangled breath against your thigh, her whole body going rigid.`;
            } else {
                vvClimax = `Her tongue drives deep, relentless, and you come first — thighs clamping around her head. She doesn't stop. Rides you through it, fingers curling inside herself with focused precision. Her orgasm is silent except for a single strangled breath against your thigh, her whole body going rigid, red curls trembling.`;
            }

            // VP climax
            let vpClimax;
            if (barretGS >= 2) {
                if (barretM >= 4 && playerM <= 1) {
                    vpClimax = `She buries her thick cock deep and holds — hips pressing flush, powerful arms locked around you. The sound she makes is barely audible. Low, guttural, forced through clenched teeth. She doesn't pull out. She stays locked against you, cock pulsing inside you in massive throbs, her jaw set. You come around her and she feels every clench.`;
                } else {
                    vpClimax = `She buries her ${npcGenSize} cock deep and holds there, hips pressing flush. The sound she makes is barely audible — low, guttural, forced through clenched teeth. Her cock pulses inside you in long, heavy throbs. She doesn't pull out, doesn't soften, just stays locked against you, eyes open, breathing ragged. You come around her and the clench makes her jaw tighten harder.`;
                }
            } else {
                vpClimax = `She buries her modest cock to the hilt and holds — precise, deliberate, every fraction of herself pressed inside you. Her orgasm is controlled: a sharp exhale, a single tremor, jaw locked. She watches you while she pulses inside you. You follow, and she feels every clench, taking it in with dark steady eyes.`;
            }

            // PP climax
            let ppClimax;
            if (barretGS >= 2) {
                ppClimax = `Her hand tightens around both shafts — her thick cock straining against yours — and her rhythm turns brutal, precise. You come first, and she follows seconds later with a sound like something snapping. Low. Rough. Through gritted teeth. Her cock pulses hard against yours, and her grip doesn't loosen until the last throb.`;
            } else {
                ppClimax = `Her hand tightens around both shafts and her rhythm turns brutal, precise, twisting at the top. You come first, and she follows seconds later with a controlled exhale — jaw locked, eyes open. Her modest cock pulses against yours in deliberate throbs. Her grip doesn't release. She rides it out watching your face.`;
            }

            const branches = {
                'pv': pvClimax,
                'vv': vvClimax,
                'vp': vpClimax,
                'pp': ppClimax
            };

            text += climaxOpening + '\n\n' + getSexSceneText('barret', branches);
        }

        // === Wolf unclenches (always) ===
        text += `\n\nThen the predator unclenches.\n\nIt happens all at once. The tension drains from her shoulders, her grip loosens, and a grin splits across her flushed face like the sun coming out. She laughs — loud, sudden — and the relief of hearing it is almost physical.`;

        // === Comedown (always, genital-agnostic, stat-aware) ===
        // Priority order: goddess > b5 > c5 > m4+ > petite > default
        let comedown;
        if (isGoddess) {
            comedown = `\n\nYou're lying on top of her and she's a landscape. Your head rests on her massive chest, sinking into warm flesh, and beneath her the bed groans under the weight of her enormous ass. Her muscular arms wrap around you — not tight, just present, holding you in place like guardrails on a mountain. You couldn't get up if you wanted to.\n\nShe hums. Low, satisfied, the vibration traveling through her chest into your skull. One hand finds your hair, thick fingers threading through it with lazy ease.\n\n{barret}"Comfortable, love?" She already knows the answer. She shifts slightly and her whole body moves like terrain rearranging itself. {barret}"Good. Stay."`;
        } else if (barretB >= 5) {
            comedown = `\n\nShe rolls onto her stomach and her massive ass dominates the bed — rising like a hill, reshaping the sheets, impossible to look away from. She folds her arms under her chin, red curls spilling across the pillow, and catches you staring.\n\nShe doesn't pretend. She shifts her weight and the ripple travels across both cheeks, slow and deliberate.\n\n{barret}"Enjoying the view, love?" The grin is all barmaid. She reaches back and slaps one cheek, watches the aftershock. {barret}"Can't blame you. I'd stare too."`;
        } else if (barretC >= 5) {
            comedown = `\n\nShe pulls your head onto her chest without asking. You sink into her massive breasts — warm, heavy, enveloping — and her fingers thread through your hair.\n\n{barret}"Rest." Not a suggestion. Her breathing is slow and even, her chest rising and falling beneath you like the tide. She knows exactly what these are for right now and she deploys them without a shred of self-consciousness.\n\nYou can hear her heartbeat through all that softness. Steady. Unhurried. The predator is gone.`;
        } else if (barretM >= 4) {
            comedown = `\n\nShe stretches with a satisfied groan — arms above her head, every muscle on display. It's not a show. It's a boxer cooling down. She rolls her shoulders, flexes her hands, then reaches for you and pulls you against her side like you weigh nothing.\n\nYou hit a wall of warm muscle and sink no further. She tucks you in against her, one thick arm draped across your back. {barret}"Mmm." The sound is warm, easy, a woman settling into her favorite chair. {barret}"You fit nicely."`;
        } else if (barretC <= 1 && barretM <= 1) {
            comedown = `\n\nShe rolls against you — slight, warm, nothing between your bodies. Every inch of her skin pressed to every inch of yours, heartbeat to heartbeat, her flat chest against you so close you can feel her pulse directly.\n\nShe closes her eyes and breathes you in. {barret}"I can feel everything like this." Her voice is soft, satisfied. No performance. No mask. {barret}"Your heartbeat. Your breathing. All of it." She presses closer. {barret}"I like this."`;
        } else {
            comedown = `\n\nShe pulls you against her side with easy confidence — a warm, generous body settling into the sheets like it was made for this. She tucks your head into the crook of her shoulder and runs her thumb along your arm, idle, unhurried.\n\n{barret}"Mmm." She stretches, comfortable in her own skin, comfortable with you. The kind of ease that comes from a woman who's done this before and knows exactly how she likes the afterward. {barret}"Not bad at all."`;
        }
        text += comedown;

        // Player standout modifiers (appended)
        if (playerC >= 4) {
            text += `\n\nHer hand finds your chest one more time. Not sexual — appraising. A practiced squeeze, thumb testing the weight. {barret}"Lovely." She pats them like she's approving a cut of meat. The barmaid's expert eye.`;
        }
        if (playerB >= 4) {
            text += `\n\nAs you shift, her hand slides to your ass and squeezes. {barret}"One for the road." She winks. Full barmaid.`;
        }

        // Exit line (always)
        text += `\n\n{barret}"Same time next week, love?" She's already sitting up, already running her fingers through her curls, already bouncing back. The predator tucked neatly behind the grin. She winks, and the 'love' settles over the room like a warm blanket.\n\nShe was never not in control.`;

        this.text = text;
    },
    actions: [
        { label: 'Return to workshop', nextScene: 'workshop_main' }
    ]
};

