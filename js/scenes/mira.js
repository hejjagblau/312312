// ============================================
// MIRA SCENES
// Extracted from scenes.js for modularity
// ============================================

// ==========================================
// MIRA SCENES
// ==========================================

// Mira - Town Square Greeting
SCENES['mira_greeting_square'] = {
    id: 'mira_greeting_square',
    image: '', // Set dynamically
    imagePrompt: null, // Set dynamically
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePathSimple('mira', 'neutral');

        // Check if already interacted this phase
        if (hasInteractedThisPhase('mira')) {
            this.text = getAlreadyInteractedMessage('mira');
            this.actions = [{ label: 'Leave', nextScene: 'location_square' }];
            return;
        }

        // Check if this is the first meeting (introduction)
        const intro = getNpcIntroduction('mira');
        if (intro) {
            this.text = intro.text;
            this.speaker = intro.speaker;
            markNpcIntroCompleted('mira');
            updateNpcLastSeenPlayer('mira');
            this.actions = [
                {
                    label: 'Continue',
                    nextScene: 'location_square',
                    effects: [
                        { type: 'addTrust', npc: 'mira', amount: 1 },
                        { type: 'recordNpcInteraction', npc: 'mira' }
                    ]
                }
            ];
            return;
        }

        // Check for regret event (NPC went too far with transformations)
        const regretData = checkGreetingRegretEvent('mira');
        if (regretData) {
            SCENES['regret_event']._regretData = regretData;
            SceneManager.playScene('regret_event');
            return;
        }

        // Check for genital proposal, goddess reveal, or archetype celebration
        const miraArchEvent = checkGreetingArchetypeEvent('mira');
        if (miraArchEvent && (miraArchEvent.type === 'proposal' || miraArchEvent.type === 'goddess_reveal' || miraArchEvent.type === 'celebration')) {
            SceneManager.playScene(miraArchEvent.sceneId);
            return;
        }

        const reaction = getNpcReactionToChanges('mira');
        const useBoss = gameState.flags.mira_story_day2_complete;
        if (reaction) {
            this.text = useBoss
                ? `Mira looks you up and down, grinning. "${reaction}"\n\n"Anyway, boss... how's the workshop treating you?"`
                : `Mira looks you up and down. "${reaction}"\n\n"Anyway... how's the workshop treating you?"`;
        } else {
            this.text = useBoss
                ? "Hey boss! Just finished a delivery run. How's the workshop treating you?"
                : "Hey there! Just finished a delivery run. How's the workshop treating you?";
        }
        updateNpcLastSeenPlayer('mira');

        // Build normal actions
        const trust = gameState.npcs.mira.trust || 0;
        const thresholds = getNpcTrustThresholds('mira');
        const canFlirt = canFlirtWithNpc('mira');
        const canTransform = canTransformNpc('mira');
        const npcState = gameState.npcs.mira;
        const desireKnown = npcState?.desireKnownToPlayer || npcState?.desireRevealed;
        const hasKnownGoal = desireKnown && npcState?.currentDesire;

        this.actions = [
            {
                label: 'Chat',
                nextScene: 'mira_chat',
                condition: () => !hasInteractedThisPhase('mira'),
                effects: [{ type: 'recordNpcInteraction', npc: 'mira' }]
            }
        ];

        if (canFlirt.canFlirt) {
            this.actions.push({
                label: 'Flirt',
                nextScene: trust < thresholds.intimate ? 'mira_flirt_1' : 'mira_flirt_2',
                condition: () => !hasInteractedThisPhase('mira'),
                effects: [{ type: 'recordNpcInteraction', npc: 'mira' }]
            });
        }

        if (canTransform.canTransform && hasKnownGoal && !isNpcSatisfied('mira')) {
            this.actions.push({
                label: 'Invite to workshop',
                nextScene: 'mira_invite_workshop',
                condition: () => !hasInteractedThisPhase('mira'),
                effects: [{ type: 'recordNpcInteraction', npc: 'mira' }]
            });
        }

        if (trust >= thresholds.intimate || npcState?.archetypeIntimateReady) {
            this.actions.push({
                label: 'Intimate...',
                nextScene: 'mira_sex_intro',
                condition: () => !hasInteractedThisPhase('mira'),
                effects: [{ type: 'recordNpcInteraction', npc: 'mira' }, { type: 'setLocation', location: 'workshop' }]
            });
        }

        this.actions.push({ label: 'Leave', nextScene: 'location_square' });
    },
    actions: []
};

// Mira - Chat 1
SCENES['mira_chat_1'] = {
    id: 'mira_chat_1',
    image: '',
    imagePrompt: null,
    speaker: 'Mira',
    text: "Being a courier isn't glamorous, but I love it. You get to see everything, meet everyone. Plus, I'm faster than anyone in town!",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mira', 'neutral');
        if (gameState.npcs.mira.trust < 5) {
            gameState.npcs.mira.trust += 1;
            saveState();
        }
    },
    actions: [
        { label: 'That sounds fun', nextScene: 'mira_chat_1b' },
        { label: "Isn't it tiring?", nextScene: 'mira_chat_1c' },
        { label: 'I should go', nextScene: 'location_square' }
    ]
};

SCENES['mira_chat_1b'] = {
    id: 'mira_chat_1b',
    image: '',
    imagePrompt: null,
    speaker: 'Mira',
    text: 'She grins proudly. "It really is! Yesterday I raced a merchant\'s horse to the north gate. Won by three seconds!"',
    onEnter: function() {
        this.image = getNpcImagePathSimple('mira', 'happy');
    },
    actions: [
        { label: 'Continue', nextScene: 'mira_greeting_square' }
    ]
};

SCENES['mira_chat_1c'] = {
    id: 'mira_chat_1c',
    image: '',
    imagePrompt: null,
    speaker: 'Mira',
    text: '"Sometimes, yeah. My legs ache after long runs. But it keeps me fit!" She stretches her arms. "Though I wouldn\'t mind being a bit taller. Reaching high shelves is a nightmare."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('mira', 'neutral');
        gameState.flags.mira_mentioned_height = true;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'mira_greeting_square' }
    ]
};

// Mira - Chat 2
SCENES['mira_chat_2'] = {
    id: 'mira_chat_2',
    image: '',
    imagePrompt: null,
    speaker: 'Mira',
    text: "Your uncle was one of my regulars. Always had packages going to strange places - the capital, the coast, even that creepy tower up north.",
    onEnter: function() {
        this.image = getNpcImagePathSimple('mira', 'neutral');
        if (gameState.npcs.mira.trust < 5) {
            gameState.npcs.mira.trust += 1;
            saveState();
        }
    },
    actions: [
        { label: 'What kind of packages?', nextScene: 'mira_chat_2b' },
        { label: 'The tower?', nextScene: 'mira_chat_2c' },
        { label: 'I should go', nextScene: 'location_square' }
    ]
};

SCENES['mira_chat_2b'] = {
    id: 'mira_chat_2b',
    image: '',
    imagePrompt: null,
    speaker: 'Mira',
    text: '"Honestly? No idea. Heavy boxes, always wrapped tight. He paid well and never asked questions, so neither did I." She lowers her voice. "Though once I heard something... humming inside one."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('mira', 'thoughtful');
        gameState.flags.knowledge_hint_devices = true;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'mira_greeting_square' }
    ]
};

SCENES['mira_chat_2c'] = {
    id: 'mira_chat_2c',
    image: '',
    imagePrompt: null,
    speaker: 'Mira',
    text: '"Old Blackstone Tower. Nobody lives there anymore, but your uncle sent stuff there regularly. I never went inside - place gives me the creeps. Some say it\'s haunted."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('mira', 'nervous');
        gameState.flags.knowledge_hint_tower = true;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'mira_greeting_square' }
    ]
};

// (Legacy Mira height/chest transformation chain removed, Mira transforms via delivery system)

// Mira - Flirt 1 (Trust 6+)
SCENES['mira_flirt_1'] = {
    id: 'mira_flirt_1',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '{player}"You know, you\'re pretty cute when you\'re all focused on your work." You give her a playful smile.\n\nMira\'s cheeks flush pink. {mira}"W-what? I mean... thanks? You\'re not so bad yourself, workshop keeper."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('mira', 'blushing');
        gameState.npcs.mira.trust += 2;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'mira_greeting_square' }
    ]
};

// Mira - Flirt 2 (Trust 8+)
SCENES['mira_flirt_2'] = {
    id: 'mira_flirt_2',
    image: '',
    imagePrompt: null,
    speaker: '',
    text: '{player}"Fastest courier in town, huh? I bet I could catch you." You wink.\n\nMira\'s blush deepens. {mira}"Is that a challenge? Because I don\'t lose races." Despite her words, she\'s smiling. {mira}"...Though maybe I\'d let you catch me. Just once."',
    onEnter: function() {
        this.image = getNpcImagePathSimple('mira', 'blushing');
        gameState.npcs.mira.trust += 2;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'mira_greeting_square' }
    ]
};


SCENES['mira_sex_intro'] = {
    id: 'mira_sex_intro',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('mira', 'base');
        markSexUnlocked('mira');

        // Check if delivery system specified which stat triggered this scene
        const deliveryStat = gameState.flags.mira_delivery_sex_stat || null;
        delete gameState.flags.mira_delivery_sex_stat;

        const miraBody = gameState.npcs.mira.body;
        const playerBody = gameState.player.body;

        // === Partner beat + oral phase (shared across all stat variants) ===
        const _pHasVulva = playerBody.genitalia === 0;
        const _pGS = playerBody.genitaliaSize;
        const _pM = playerBody.muscle;
        const _mM = miraBody.muscle;

        // Partner beat: the quiet moment between worship and sex
        const partnerBeat = `She stops. Leans in. Kisses you, not the excited kind. Slow, soft, her hand finding yours. Fingers lacing through. The grin is gone. Just green eyes on yours, warm and steady.\n\n{mira}"Hey, Boss." Quiet. No punchline.\n\nThen she's moving again. {mira}"Okay. My turn."`;

        // Oral phase: Mira gives to player (verbal, enthusiastic, shameless)
        let oralOpener;
        if (_mM >= 5 && _pM === 0) {
            oralOpener = `She picks you up, sets you on the workbench edge, and kneels between your legs.`;
        } else if (_pM >= 5) {
            oralOpener = `You put a hand on her shoulder and press. She grins and drops to her knees.`;
        } else {
            oralOpener = `She drops to her knees.`;
        }

        let oralBody;
        if (_pHasVulva) {
            if (_pGS >= 3) {
                oralBody = `{mira}"Boss. BOSS. Look at you." Your swollen lips are flushed and glistening and she buries her face between your thighs. The commentary starts. {mira}"You taste... the way you're throbbing on my tongue..." She finds your engorged clit and the words dissolve into focused moaning. Hands gripping your hips, mouth relentless. She comes up for air, chin wet, grinning. {mira}"Gorgeous down here. Just so you know."`;
            } else if (_pGS === 0) {
                oralBody = `{mira}"Oh, you're perfect." She presses her mouth against you, precise, eager. {mira}"I can cover all of you with my tongue..." She proves it, sealing her lips around your folds, narrating between licks. {mira}"left, no MY left, THERE..." She finds the spot and doesn't leave it. Your knees buckle. She catches your hip, grinning up. {mira}"Got it in one."`;
            } else {
                oralBody = `{mira}"I've been thinking about this." Her mouth finds you and the narration starts. {mira}"You taste incredible... right here, wait, let me..." She adjusts mid-lick, redirecting herself out loud. She reads every sound you make like a courier reads street signs. She comes up flushed. {mira}"That was the preview."`;
            }
        } else {
            if (_pGS >= 3) {
                oralBody = `{mira}"Oh my gods." She wraps both hands around your cock, staring. {mira}"I can barely get my hand around..." She takes you in her mouth and the narration goes muffled but doesn't stop. She pulls back. {mira}"My jaw is going to be sore tomorrow and I don't CARE..." She dives back in. Enthusiastic, verbal, zero shame. She sits back, wiping her mouth. {mira}"Preview."`;
            } else if (_pGS === 0) {
                oralBody = `{mira}"Watch this." She takes your cock in her mouth, all of it, immediately. Pulls back, triumphant. {mira}"Got the whole thing! I'm incredible." She goes back with focused energy, narrating around your shaft. {mira}"Perfect size for doing things with my tongue..." She demonstrates. She comes up beaming. {mira}"Compact and efficient."`;
            } else {
                oralBody = `{mira}"My turn." She takes you in her mouth and starts narrating, muffled appreciation, adjustments, commentary she can't stop voicing. She pulls back to breathe. {mira}"You taste like brass and warmth and I'm not stopping." She reads every sound you make, adjusting, optimizing. She sits back, wiping her mouth. {mira}"Preview."`;
            }
        }

        const oralPhase = oralOpener + ' ' + oralBody;

        // Detect maxed stats for stat-focused scenes
        const maxedStats = [];
        if (miraBody.chest >= 5) maxedStats.push('chest');
        if (miraBody.butt >= 5) maxedStats.push('butt');
        if (miraBody.muscle >= 5) maxedStats.push('muscle');
        if (miraBody.genitaliaSize >= 3) maxedStats.push('genitaliaSize');

        // Use delivery stat if set and valid, otherwise pick randomly from maxed
        const focusStat = (deliveryStat && maxedStats.includes(deliveryStat))
            ? deliveryStat
            : maxedStats.length > 0
                ? maxedStats[Math.floor(Math.random() * maxedStats.length)]
                : null;

        if (focusStat === 'chest') {
            // === CHEST-FOCUSED SEX SCENE ===
            const miraM = miraBody.muscle;
            const miraB = miraBody.butt;
            const playerC = playerBody.chest;
            const playerM = playerBody.muscle;
            const playerB = playerBody.butt;
            const playerGS = playerBody.genitaliaSize;
            const miraGS = miraBody.genitaliaSize;

            // Part 1: Mira's body description (branch on her muscle)
            let part1;
            if (miraM <= 2) {
                part1 = `Mira tugs at her crop top, and the moment it loosens her chest practically spills forward. Her slim frame has no business carrying breasts this massive. She's visibly top-heavy, swaying when she moves too fast, and she doesn't care one bit.\n\n{mira}"I'm all boob, boss." She cups herself with both hands, barely containing them. {mira}"All boob and I LOVE it."`;
            } else if (miraM <= 4) {
                part1 = `Mira shrugs off her crop top and stretches, athletic arms flexing as her massive chest practically bursting out of the thin fabric. Her toned frame carries the weight well. She moves with confident swagger, balanced and powerful, completely at ease with every impossible inch.\n\n{mira}"Like what you see?" She bounces on her heels and everything moves. {mira}"They feel even better than they look."`;
            } else {
                part1 = `Mira doesn't bother with the crop top. She tears it off and her massive chest bounces free. Her chest sits atop a wall of rippling muscle, pecs flexing beneath the weight like it's nothing. She could carry you AND her breasts without breaking a sweat.\n\n{mira}"Come here." It's not a request. She rolls her shoulders and every muscle in her arms bunches. {mira}"I want your hands on me. Now."`;
            }

            // Part 2: Getting close (branch on player chest)
            let part2;
            if (playerC === 0) {
                part2 = `You step close and she pulls you in, and you disappear. Your flat chest slots perfectly into the valley between her breasts, warm flesh enveloping you on both sides. She wraps her arms around your head and presses you deeper.\n\n{mira}"Oh, you fit right in there." She sounds delighted. {mira}"Like you were made for this."`;
            } else if (playerC >= 4) {
                part2 = `You press close and immediately hit a problem. Your own massive chest collides with hers, neither pair willing to yield. Breasts crush together, spilling sideways, and neither of you can get face-to-face without turning sideways.\n\nMira bursts out laughing. {mira}"Okay, we're going to need to figure out angles." She tilts, finds a position that works, and pulls you in. {mira}"There. Logistics."`;
            } else {
                part2 = `You step close and she pulls you against her, her chest filling every inch of space between your bodies. Warm, heavy, impossibly soft, they press against you and you can feel her heartbeat through them.\n\n{mira}"Feel that?" She shifts, letting her breasts drag across you. {mira}"They're so sensitive right now. Every little touch..."`;
            }

            if (playerM === 0) {
                part2 += ` Your slight frame feels small against her, light enough that she adjusts you effortlessly, pulling you exactly where she wants.`;
            }
            if (playerB >= 4) {
                part2 += ` Her hand drops to grab your ass, squeezing hard. {mira}"Gods, that's nice too."`;
            }
            if (miraB >= 5) {
                part2 += ` Below, her tiny skirt has ridden up past the point of coverage. Her enormous ass is bare, the fabric bunched uselessly at her waist. She doesn't bother fixing it.`;
            } else if (miraBody.genitalia === 1 && miraGS >= 3) {
                part2 += ` Below, her skirt does nothing. Her cock hangs past the hem, too big for any clothing to contain.`;
            }
            if (playerB >= 5) {
                part2 += ` Your own skirt isn't faring any better, hiked up over your hips, covering nothing. Between the two of you there isn't a square inch of modesty left.`;
            } else if (playerBody.genitalia === 1 && playerGS >= 3) {
                part2 += ` Your own skirt isn't helping either, your cock juts past the hem, fully exposed. Neither of you is properly covered.`;
            }

            // Part 3: Chest worship (always present)
            const part3 = `Her nipples are already stiff and flushed dark pink against freckled skin. She takes your hands and presses them against herself with a shuddering gasp.\n\n{mira}"My nipples have been driving me crazy." She guides your mouth down. {mira}"Suck. Please. I need it."\n\nYou take one nipple between your lips and she moans so loud it echoes off the workshop walls. Her hands grip the back of your head, holding you there, her whole body arching into your mouth.`;

            const opening = part1 + '\n\n' + part2 + '\n\n' + part3;

            // === Genital branches: position → escalation w/ chest beats → climax ===

            // PV: player penis + Mira vulva
            let pvText;
            if (miraM >= 5 && playerM === 0) {
                pvText = `Mira picks you up like you weigh nothing, one arm under your thighs, the other pressing your face into her chest. Your whole world becomes warm breast flesh as she lowers herself onto you, impaling herself with a ragged moan. {mira}"Stay right there," she breathes, bouncing you against her, your face buried between her breasts with each thrust.`;
                pvText += `\n\nShe finds a rhythm, lifting you, dropping you, your cock sinking deep each time while her breasts bounce against your cheeks. You latch onto a nipple and she nearly drops you, her grip spasming. {mira}"Oh FUCK, warn me before you ..." You do it again. Her knees buckle but her arms hold. She's shaking, massive chest heaving, sweat running between her breasts and onto your face.`;
                pvText += `\n\nShe slams you down one final time and holds you there, buried deep, her whole body clenching around you as she comes with a scream that rattles the workshop shelves. Her breasts crush against your face, smothering you in warmth, and you finish inside her a moment later. She keeps holding you there, panting, neither of you willing to move.`;
            } else if (miraM >= 5) {
                pvText = `She pins you flat on the workbench, climbing on top, her massive breasts dropping onto your face like a warm avalanche. You can barely breathe, and you don't want to. She rides you hard, shoving a nipple into your mouth every time you gasp for air. {mira}"Suck while I fuck you," she growls, and you obey.`;
                pvText += `\n\nHer pace builds. Every time she drops her hips, her breasts slam into your face, and every time you bite down on her nipple she clenches so hard it almost hurts. She's dripping onto your thighs, the workbench creaking, one hand braced on the wall while the other shoves her breast deeper into your mouth. {mira}"Harder," she pants. {mira}"Bite me harder."`;
                pvText += `\n\nYou bite. She screams, slams down, and comes, her whole body locking up, her massive chest pressing you flat against the bench as she rides the orgasm in grinding pulses. You can't breathe, can't move, can't do anything but come inside her while she pins you under the weight of her body and her breasts. She collapses onto you afterward, still shaking. {mira}"...ow. Worth it."`;
            } else if (playerM >= 5) {
                pvText = `You pin her on her back, her massive breasts splaying wide. She's trapped beneath you, writhing, as you thrust into her and alternate your mouth between her nipples. Every suck makes her clench tighter around you. {mira}"Both, do both ..." she begs, but you've only got one mouth and she's losing her mind over it.`;
                pvText += `\n\nYou grab both breasts and squeeze them together, nipples side by side, and suck both at once. Her back arches so hard she nearly lifts you off her. {mira}"HOW, how are you ..." Her legs wrap around you, pulling you deeper, and you thrust harder while keeping both nipples in your mouth. She's babbling, incoherent, her massive chest heaving under your grip.`;
                pvText += `\n\nShe comes first, hard, clenching around you like a vice, her breasts shaking in your hands as her whole body convulses. The squeeze pulls you over the edge and you finish deep inside her, face still buried in her chest. She lies there trembling, staring at the ceiling. {mira}"You... nobody's ever done the both-at-once thing before." She sounds wrecked. {mira}"Do it again later."`;
            } else {
                pvText = `She hops onto the workbench, legs spread, and you step between them. One hand on her breast, mouth on the other nipple, you slide inside her and start thrusting. Her massive chest bounces with every motion, nipples dragging across your face, and her moans come faster with each stroke.`;
                pvText += `\n\nThe rhythm builds, thrust, suck, squeeze, thrust. Her breasts are slick with sweat and your saliva, sliding under your hands. She grabs the back of your head and forces your mouth down harder onto her nipple. {mira}"Don't you dare stop," she gasps. Her heels dig into your lower back, pulling you deeper. The workbench groans under you both.`;
                pvText += `\n\nShe hooks her ankles behind you, pulls you flush, and comes apart, head thrown back, breasts heaving, her whole body clamping down on you in waves. You thrust through it, mouth still on her nipple, and the sensation drags you over too. She holds you there, panting against your neck, her massive chest rising and falling between you. {mira}"Gods." A breathless laugh. {mira}"My legs don't work."`;
            }
            if (playerGS >= 3 && miraGS === 0) {
                pvText += `\n\nShe winces when you finally pull out. She's been stretched, and every inch of withdrawal makes her gasp. {mira}"You're... big." She rubs her thighs together gingerly. {mira}"My chest can take anything but THAT is going to take some getting used to."`;
            } else if (playerGS === 0 && miraGS >= 3) {
                pvText += `\n\nShe's still clenching, her swollen pussy almost reluctant to let you go. {mira}"I barely felt you at first," she admits, then grins. {mira}"But when you did that thing with my nipples? Didn't matter. My chest makes up for everything."`;
            } else if (playerGS >= 3 && miraGS >= 3) {
                pvText += `\n\nThe fullness was overwhelming, her swollen pussy stretched tight around your thick cock while her chest throbbed from every touch. She lies there twitching, overstimulated from both ends. {mira}"I felt that everywhere. EVERYWHERE."`;
            }

            // VV: both vulva
            let vvText;
            if (miraM >= 5 && playerM === 0) {
                vvText = `Mira picks you up and sets you atop her chest like a throne. You lie face-down across her massive breasts, warm, impossibly soft, stroking her nipples while she reaches between your legs from behind. Her thick fingers find you with practiced ease, and you moan into her cleavage as she works you.`;
                vvText += `\n\nShe curls her fingers and you arch, grinding your hips against her breast. Every time you tweak her nipple in retaliation her fingers stutter inside you. You're both building each other up, your mouth on her nipple, her fingers inside you, sweat pooling in the valley of her cleavage. She's panting, chest rising and falling under your weight, her massive breasts bouncing you gently with every heavy breath.`;
                vvText += `\n\nShe hooks her fingers just right and you shatter, biting down on her nipple as you come, which sends her over the edge too. She bucks beneath you, nearly throwing you off her chest, both of you shaking and gasping and clinging to each other. {mira}"Stay right there," she murmurs when it's over, arms wrapping around you. {mira}"You're the best blanket I've ever had."`;
            } else if (miraM >= 5) {
                vvText = `She pins you beneath her, her massive breasts pressing down over your face as she grinds against your thigh. You can barely breathe through warm flesh. Your hand finds her below, fingers slipping inside, while she does the same, mutual fingering while she smothers you in chest. {mira}"Can you breathe?" she asks. You shake your head. {mira}"Good."`;
                vvText += `\n\nThe pace builds, her fingers pumping faster, your fingers curling deeper, her breasts sliding across your face slick with sweat. You turn your head just enough to catch a nipple between your teeth and she moans so loud the walls rattle. Her hips grind harder against your hand, riding your fingers while she works you relentlessly.`;
                vvText += `\n\nShe comes first, her body going rigid on top of you, massive chest pressing the air from your lungs as she shudders. Her fingers don't stop, though, and the aftershocks rolling through her breasts against your face push you over seconds later. She rolls off you and you both lie there gasping. {mira}"I could smother you every day," she says happily. {mira}"Just say the word."`;
            } else if (playerM >= 5) {
                vvText = `You push her onto her back and straddle her face. She moans eagerly beneath you, tongue finding you immediately, while you lean forward and take both her nipples, one in each hand, squeezing, rolling, pinching. Her hips buck every time you pinch harder. Her muffled moans vibrate through your core.`;
                vvText += `\n\nYou ride her mouth, grinding down every time she licks, while your hands work her chest relentlessly. Pinch, roll, twist, her back arches off the workbench and her tongue loses rhythm, going frantic. Her massive breasts fill your hands completely, hot and heaving. She grabs your thighs and pulls you down harder onto her mouth.`;
                vvText += `\n\nHer scream vibrates directly into you and that's what finishes it, you come on her tongue while she thrashes beneath you, her chest spasming under your hands as her own orgasm tears through her. You collapse forward onto her breasts, face-first, still twitching. From below you, muffled: {mira}"...mmrph." You lift up. She's grinning, face glistening. {mira}"Get off me. No, wait. Don't."`;
            } else {
                vvText = `You lie side by side, faces close, mouths trading between kissing and sucking her nipples. Fingers work between each other's thighs, slow at first, then faster. Every time you suck a nipple she whimpers and her fingers curl inside you harder.`;
                vvText += `\n\nThe rhythm turns frantic, fingers pumping, mouths hungry, her massive breasts pressed between your bodies slick with sweat. She pulls back just to gasp and you chase her mouth, kissing her while your thumb circles her clit. Her free hand clutches your hip, nails digging in. {mira}"I'm close," she pants against your lips. {mira}"Don't stop, the nipple thing, don't stop ..."`;
                vvText += `\n\nYou duck down and suck her nipple hard and she comes undone, her body curling into yours, fingers driving deep inside you as she shakes. The pressure and her desperate grip drag you over with her, both of you trembling, faces pressed together, her massive chest heaving between your bodies. She doesn't pull her fingers out. You don't pull yours out either. Neither of you moves for a long time.`;
            }
            if (miraGS >= 3 && playerGS >= 3) {
                vvText += `\n\nBoth of you are swollen and sensitive, even the slightest shift sends aftershocks through thick, puffy lips. She presses her vulva against yours experimentally and you both gasp. {mira}"We should do that again," she murmurs, grinding lazily. {mira}"In like five minutes. When I can feel my legs."`;
            }

            // VP: player vulva + Mira penis
            let vpText;
            if (miraM >= 5 && playerM === 0) {
                vpText = `She lifts you effortlessly, holds you up with both arms, and lowers you onto her cock. Your legs dangle, your face pressed into her massive chest as she bounces you like you weigh nothing. {mira}"Hold onto me," she says, unnecessary, because her breasts are the only thing in your world.`;
                vpText += `\n\nShe sets a pace, lifting you, dropping you, her cock sinking deep each time while her breasts bounce against your face. You grab onto them for leverage and she groans, her rhythm stuttering. You latch onto a nipple and suck hard. {mira}"Oh, oh FUCK ..." Her arms tighten, crushing you against her chest as she thrusts harder, faster, desperate and sloppy.`;
                vpText += `\n\nShe buries herself to the hilt and comes with a full-body shudder, her breasts smothering your scream as you clench around her. She holds you there, impaled, trembling, her cock pulsing inside you while her massive chest heaves against your face. {mira}"Don't move." Her voice is wrecked. {mira}"Just... stay."`;
            } else if (miraM >= 5) {
                vpText = `Standing carry, your legs wrap around her waist, face buried between her breasts, as she thrusts upward. Her massive arms hold you steady while her cock drives deeper. Every thrust pushes your face into warm cleavage, her nipples dragging across your cheeks.`;
                vpText += `\n\nShe braces you against the wall, freeing one hand to grab her own breast and shove the nipple into your mouth. {mira}"Suck it while I'm inside you." You obey, and her thrusts turn savage, deep, grinding, her whole body flexing with each one. Her breast fills your mouth, her cock fills you below, and there's nothing in the world but Mira.`;
                vpText += `\n\nShe finishes with her forehead pressed against yours, teeth gritted, cock buried deep as she pumps into you. The nipple between your teeth and the cock inside you tip you over at the same time and you come clenching around her, legs shaking, held up entirely by her strength. She doesn't put you down for a long time. {mira}"I could do this all day," she breathes. {mira}"Literally. I don't get tired."`;
            } else if (playerM >= 5) {
                vpText = `You push her down and climb on top, reverse cowgirl, leaning back onto her massive breasts. They cushion your back like pillows. You reach behind to pinch her nipples while you bounce on her cock, and every pinch makes her thrust harder involuntarily. {mira}"That's... cheating ..." she gasps.`;
                vpText += `\n\nYou squeeze both nipples and grind down, taking her as deep as she'll go. She's losing control beneath you, her hips bucking wildly, her breasts shaking against your back, hands clawing at your hips. {mira}"You're going to... I can't... when you do that with my ..." She can't finish a sentence. You pinch harder.`;
                vpText += `\n\nShe comes with a strangled cry, hips slamming upward, cock pulsing deep inside you. Her chest spasms under your hands and the pressure tips you over, you grind down and clench around her as you come, her twitching nipples under your fingers. She's still thrusting weakly when you finally collapse back onto her chest. {mira}"That was cheating," she repeats, panting. {mira}"Don't ever stop cheating."`;
            } else {
                vpText = `She leans over you, thrusting, her massive breasts swaying above your face like pendulums. You grab them, one in each hand, and pinch her nipples with every thrust. She moans, rhythm faltering each time. {mira}"Keep doing that and I'm not going to last."`;
                vpText += `\n\nShe lasts. Barely. Her thrusts get deeper, slower, more deliberate, pulling almost all the way out and sinking back in while you work her nipples. Her breasts swing heavy above you, slapping together, flushed and covered in a sheen of sweat. She bites her lip, brow furrowed, fighting to hold on. {mira}"I want you to come first," she manages. {mira}"I want to feel you ..."`;
                vpText += `\n\nYou pinch both nipples and twist and she breaks, slamming deep and coming hard, her massive chest dropping onto your face as her arms give out. The weight of her, the cock inside you, the heat of her breasts. It pulls you under too. You come together, her body shaking on top of yours, breath hot against your neck. {mira}"Okay," she pants into your shoulder. {mira}"I didn't last. I never last when you touch my chest."`;
            }
            if (miraGS >= 3 && playerGS === 0) {
                vpText += `\n\nShe pulls out carefully and you both wince. She's big, and you feel every inch leaving. {mira}"Sorry." She winces. {mira}"My chest gets me so worked up I forget to be gentle." She kisses your forehead, then your collarbone, then buries her face in your neck. {mira}"Next time I'll go slower." She won't.`;
            } else if (miraGS === 0 && playerGS >= 3) {
                vpText += `\n\nShe's still twitching, oversensitive. Even the smallest movement makes her gasp. {mira}"Everything is connected," she mumbles, gesturing vaguely at her chest and her cock. {mira}"You touch one and the other just... explodes." She shivers. {mira}"I'm ruined."`;
            } else if (miraGS >= 3 && playerGS >= 3) {
                vpText += `\n\nThe fullness was devastating, her thick cock stretching your swollen pussy while her chest throbbed under your hands. She's still inside you, softening, neither of you wanting to separate. {mira}"I felt everything at once. Chest, cock, you." She exhales slowly. {mira}"I think I saw stars."`;
            }

            // PP: both penis
            let ppText;
            if (playerC === 0) {
                ppText = `She pulls you sideways into her cleavage, your entire slim body nestled in warm breast flesh while she wraps her hand around your cock. You're cocooned in softness, stroking yourself against her skin while she strokes you. {mira}"You look so cute in there," she murmurs, squeezing her breasts around you.`;
                ppText += `\n\nShe shifts, pressing her own cock alongside yours, and wraps her breasts around both. The warm pressure, the friction of skin on skin, the way her nipples brush against your chest with every stroke. It builds fast. She gasps when you reach up and pinch a nipple, her hand tightening around both shafts. {mira}"Do that again," she whispers. {mira}"The nipple thing. Do it again."`;
                ppText += `\n\nYou twist her nipple and she comes, cock pulsing against yours, cum spattering across her own breasts, her whole body shuddering around you. The hot spill and the squeeze of her chest pull you over seconds later. You lie there in her cleavage, both of you slick and sticky and breathing hard. {mira}"You're not allowed to leave," she says. {mira}"You live here now. In my tits."`;
            } else if (miraM >= 5) {
                ppText = `She pins you down and wraps her massive breasts around both your cocks, pressing them together in the warm valley. She squeezes from the sides, flexing her pecs, and the friction makes you both groan. {mira}"I've been wanting to try this," she pants, pumping her chest up and down.`;
                ppText += `\n\nThe titfuck is relentless. She controls the pressure, the speed, the angle, flexing her pecs to squeeze tighter on every upstroke. Both cocks leak between her breasts, slicking the path, and the wet sounds fill the workshop. She watches your face with hungry eyes, nipples flushed and hard. {mira}"You're throbbing," she growls. {mira}"I can feel it. Both of us."`;
                ppText += `\n\nShe squeezes hard and both of you come at once, cum erupting between her massive breasts, coating her chest and chin. She milks every drop with slow, rolling squeezes, grinning down at the mess. {mira}"Perfect." She runs a finger through it. {mira}"We're doing this every time."`;
            } else if (playerM >= 5) {
                ppText = `You kneel over her, cock sliding into the valley between her breasts while she strokes herself below. She squeezes them together for you, eyes locked on yours, and you thrust between the massive soft mounds. Her nipples poke against your stomach with each stroke.`;
                ppText += `\n\nYou reach down and roll both her nipples between your fingers while you fuck her chest. She arches up, moaning, her hand speeding on her own cock. Every pinch makes her squeeze her breasts tighter around you. The friction is incredible. Warm, slick, her skin flushed pink under your hands. {mira}"I'm... when you do my nipples like that I can't ..."`;
                ppText += `\n\nYou pinch hard and she comes, cock jerking in her hand, cum hitting her own chin while her chest spasms around your shaft. The squeeze tips you over and you add to the mess, painting her breasts as she milks you with rolling pressure. She lies there panting, covered, grinning. {mira}"You wrecked me." She sounds thrilled.`;
            } else {
                ppText = `Both cocks press between her massive breasts as she squeezes them together. You thrust in tandem, shafts sliding against each other in the warm tunnel of her cleavage. Friction builds, pre-cum slicking the path, and her moans vibrate through her chest into your cock.`;
                ppText += `\n\nShe rolls her nipples against your chest as you thrust, and the stimulation makes her cock pulse against yours. The pace builds, slick, hot, her breasts bouncing around both shafts. She's panting, eyes glazed, massive chest heaving. {mira}"Together," she manages. {mira}"Come with me ..."`;
                ppText += `\n\nYou reach down and squeeze her nipple and she shatters, cock erupting between her own breasts, the pulsing pulling you over too. You come together, making a mess of her massive cleavage, both shafts twitching against each other in the hot slick valley. She looks down at the aftermath. {mira}"Worth every inch." She laughs breathlessly. {mira}"Of all of them."`;
            }
            if (playerGS >= 3 && miraGS >= 3) {
                ppText += `\n\nTwo thick cocks barely fit between even her enormous breasts. The heat and pressure were almost unbearable. She squeezes the last aftershocks from both of you and surveys the mess with satisfaction. {mira}"We're going to need a towel. Maybe two."`;
            } else if (playerGS === 0 && miraGS === 0) {
                ppText += `\n\nBoth of you are small enough to disappear between her massive breasts. It took real effort to create enough friction. But Mira's chest sensitivity more than compensated. {mira}"Doesn't matter how big the cock is," she declares, patting her cleavage. {mira}"It matters how big the tits are."`;
            }

            const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };
            this.text = opening + '\n\n' + partnerBeat + '\n\n' + oralPhase + '\n\n' + getSexSceneText('mira', branches);

        } else if (focusStat === 'butt') {
            // === BUTT-FOCUSED SEX SCENE ===
            const miraM = miraBody.muscle;
            const miraC = miraBody.chest;
            const playerC = playerBody.chest;
            const playerM = playerBody.muscle;
            const playerB = playerBody.butt;
            const playerGS = playerBody.genitaliaSize;
            const miraGS = miraBody.genitaliaSize;

            // Part 1: Mira's butt description (branch on muscle)
            let part1;
            if (miraM <= 2) {
                part1 = `Mira turns around before she even says hello, looking over her shoulder at you. Her slim frame makes her ass look even more absurd, it's enormous, her little leather skirt barely clinging to the top of her cheeks, and it bounces with every tiny shift of weight. She can barely fit through the doorframe sideways.\n\n{mira}"Boss, look at this thing." She slaps her own rear and it jiggles for a solid three seconds. {mira}"I sat down on a stool earlier and it just... engulfed it. The stool is gone. I think my ass ate it."`;
            } else if (miraM <= 4) {
                part1 = `Mira strides in with a rolling, confident gait, her athletic thighs flexing with each step. Her enormous ass sits on a foundation of toned muscle. It moves deliberately, powerfully, every bounce controlled by thick glutes underneath.\n\n{mira}"You're staring." She does a slow turn, letting you see the full scope. {mira}"Good. I worked hard for these thighs and they deserve an audience."`;
            } else {
                part1 = `Mira walks in and the floorboards creak. Her glutes are boulders, massive, muscular, her enormous ass carved from solid power. Her thighs are as thick as your waist, every stride making the muscle ripple beneath her skin. She turns and flexes and her skirt rides up past the point of decency.\n\n{mira}"Oops." She doesn't sound sorry at all. She tugs the hem down but it springs right back. {mira}"This skirt never stood a chance."`;
            }

            // Chest commentary (appended to part1)
            if (miraC >= 5) {
                part1 += `\n\nThe absurd part is the balance. Her massive chest counterweights her enormous rear perfectly. She shouldn't be able to stand upright, but somehow the two cancel out and she moves like she owns the room. The silhouette is obscene from every angle.`;
            } else if (miraC >= 3) {
                part1 += ` Her ${getBodyStatDesc('mira', 'chest')} bounces in counterpoint to her rear with every step.`;
            }

            // Part 2: Getting close (branch on player butt)
            let part2;
            if (playerB <= 1) {
                part2 = `You step close and she immediately grabs your hips, spinning you around to compare. Your flat rear pressed against her enormous one is almost comical, hers could swallow yours twice over.\n\n{mira}"Aww." She bumps you with her hip and you stumble forward. {mira}"That's not fair. All mine, none for you." She says it with a wink.`;
            } else if (playerB >= 4) {
                part2 = `You step close and immediately bump asses, yours is stacked too, and the collision sends a ripple through both of you. Neither can sit on the workbench at the same time. There's simply too much rear between you.\n\nMira looks over her shoulder, delighted. {mira}"Finally, someone who gets it." She bumps you again, harder. {mira}"Ass twins."`;
            } else {
                part2 = `You step close and her hands go straight to your hips, pulling you against her. Her enormous rear presses into your front, warm and impossibly soft through the thin fabric.\n\n{mira}"Put your hands on it." She takes your wrists and plants them on her ass. {mira}"Squeeze. Hard. I can take it."`;
            }

            if (playerM === 0) {
                part2 += ` Your slight frame makes her rear look even more massive by comparison. She could pin you against a wall with her hips alone.`;
            }
            if (playerC >= 4) {
                part2 += ` She reaches around to palm your chest. {mira}"Oh, you've got your own thing going on up top. Nice."`;
            }
            if (playerB >= 5) {
                part2 += ` Your own skirt has ridden up past the point of return, your bare ass on full display, a match for hers. She looks back and forth between them. {mira}"We need a bigger workshop."`;
            } else if (playerBody.genitalia === 1 && playerGS >= 3) {
                part2 += ` Your skirt isn't faring any better, your massive cock hangs past the hem, impossible to hide. She glances between your cock and her ass. {mira}"We need a bigger workshop."`;
            }

            // Part 3: Butt worship (always present)
            let part3 = `She bends over the workbench, arching her back, and her skirt rides up the rest of the way, not that it was covering much to begin with.`;
            if (miraC >= 5) {
                part3 += ` Her massive breasts press flat against the wood, spilling sideways, giving her something to rest on while her enormous rear rises behind her. She looks like an hourglass tipped on its side.`;
            } else if (miraC >= 3) {
                part3 += ` Her ${getBodyStatDesc('mira', 'chest')} presses against the wood as she settles her weight forward.`;
            }
            part3 += ` Her bare ass is freckled and flushed pink, impossibly round, each cheek larger than your head. She wiggles and everything moves like a slow wave.\n\n{mira}"I've been dying for someone to pay proper attention to this." She reaches back and spreads herself. {mira}"Don't be gentle. I want to feel your hands for days."\n\nYou grab two handfuls, it takes both hands per cheek, and she groans so deep it vibrates through the workbench. You knead, squeeze, spank, and she pushes back into every touch, hips grinding against the wood.`;

            const opening = part1 + '\n\n' + part2 + '\n\n' + part3;

            // Build penetration feel based on both genital sizes
            let pvFeel, pvReact;
            if (playerGS >= 3 && miraGS === 0) {
                pvFeel = `she's impossibly tight around your thick cock. You have to force your way in, stretching her open inch by agonizing inch`;
                pvReact = `{mira}"Oh gods, you're too big, you're splitting me ..." Her whole body tenses, but she doesn't pull away.`;
            } else if (playerGS >= 3 && miraGS >= 3) {
                pvFeel = `her swollen pussy stretches around your thick cock, plush lips gripping every vein, the fullness devastating for both of you`;
                pvReact = `{mira}"ALL of it, I want every inch ..." She's shaking before you're even fully inside, her thick lips pulsing around your girth.`;
            } else if (playerGS === 0 && miraGS === 0) {
                pvFeel = `she's tight around you. The fit is perfect, snug, intimate, every tiny movement magnified between you`;
                pvReact = `{mira}"Oh, that's perfect." She sighs, rolling her hips in slow circles, savoring the closeness. {mira}"I can feel every little thing you do in there." She takes control of the rhythm, keeping you deep.`;
            } else if (playerGS === 0 && miraGS >= 3) {
                pvFeel = `her swollen pussy engulfs you completely, plush, wet, burning hot, her thick lips wrapping around your cock and swallowing every inch with ease`;
                pvReact = `{mira}"Oh, that's cute." She rolls her hips, controlling the angle, the depth, everything. {mira}"I get to do whatever I want with this one." She clenches deliberately around you, her swollen walls gripping tight, and sets a pace that's entirely hers.`;
            } else if (playerGS >= 3) {
                pvFeel = `your thick cock stretches her open, filling her completely, and she feels every inch`;
                pvReact = `She gasps, walls clenching around your girth. {mira}"Gods, you're big ..." She braces herself and pushes back.`;
            } else if (miraGS === 0) {
                pvFeel = `she's tight, walls gripping you firmly the moment you push in`;
                pvReact = `She hisses through her teeth. {mira}"Careful, go slow ..." But her hips are already rocking back into you.`;
            } else if (miraGS >= 3) {
                pvFeel = `her swollen pussy parts around you, plush and slick and burning hot, thick lips gripping your shaft`;
                pvReact = `She moans the instant you sink in. {mira}"Oh fuck, that's good ..." Her oversensitive walls squeeze around you.`;
            } else {
                pvFeel = `she's warm and wet around you, walls squeezing on instinct`;
                pvReact = `She gasps as you push in. {mira}"There, right there ..." She pushes back to meet you.`;
            }

            // PV: player penis + Mira vulva
            let pvText;
            if (miraM >= 5 && playerM === 0) {
                pvText = `She backs into you, pinning you against the wall with her massive ass. You're trapped, smothered in warm, muscular flesh from the waist down. She reaches between her legs and guides you inside her pussy, ${pvFeel}. ${pvReact} Her glutes are already grinding, pulling you deeper with each roll. You can't move. You don't need to. Her glutes do all the work, flexing around you.`;
                pvText += `\n\nShe picks up speed, her ass slamming against your hips with rhythmic force. Each impact sends a ripple through her rear that presses you harder into the wall. You grab her cheeks and squeeze and she moans, head dropping forward. {mira}"Spank me." You do. The slap echoes and her walls clamp around you. {mira}"AGAIN." You spank harder, gripping her bouncing ass between strikes, red marks blooming across freckled skin.`;
                pvText += `\n\nShe grinds down hard and comes, her enormous ass pinning you flat against the wall as she shakes, clenching around you in waves. The pressure is inescapable and you come inside her, trapped beneath the weight of her rear. She doesn't move for a long time. {mira}"You're my favorite wall decoration," she pants, still pressed against you. {mira}"I'm keeping you there."`;
            } else if (miraM >= 5) {
                pvText = `She bends over the workbench and braces, glutes flexing. You grab her hips and thrust into her pussy, ${pvFeel}. ${pvReact} The impact sends a ripple through her enormous ass that takes a full second to settle. She flexes deliberately, clenching around you with impossible strength. {mira}"Harder," she growls. {mira}"I can barely feel that."`;
                pvText += `\n\nYou slam harder. Her ass bounces against your hips, ripples cascading through flesh on every impact. She's clenching so tight you can barely pull out to thrust again. You spank her, hard, and she unclenches just enough before slamming down tighter. {mira}"That's better." She reaches back and grabs your hand, pressing it deeper into her cheek. {mira}"Leave marks. I want to see them tomorrow."`;
                pvText += `\n\nYou grab both cheeks and pull her back onto you as hard as you can and she screams, coming, her muscular glutes clenching so hard it's almost painful. The squeeze drags you over with her, buried deep, her massive ass trembling against your hips in aftershocks. She collapses on the workbench, still clenching. {mira}"Check if I have handprints." She does. She grins.`;
            } else if (playerM >= 5) {
                pvText = `You grab her hips with both hands, lift her rear to the perfect angle, and slam into her pussy, ${pvFeel}. ${pvReact} Her massive ass bounces against your hips with each thrust. You spank her between strokes and she clenches hard around you every time. {mira}"Again ..." she gasps. You oblige.`;
                pvText += `\n\nYou set a punishing pace, one hand on her hip, one alternating between her cheeks. Spank, thrust, spank, thrust. Her ass jiggles with every impact, flushed red, and she's pushing back to meet you, moaning into her forearms. {mira}"Harder, gods, yes, grab it, SQUEEZE ..." You grab a full handful of her ass and dig your fingers in while thrusting deep. She screams into the workbench.`;
                pvText += `\n\nYou slam in one final time, both hands clamped on her massive cheeks, and she comes so hard her knees buckle. You catch her by the hips and come inside her, her ass shaking against you in waves. She sags onto the workbench, legs useless. {mira}"I can't walk." She sounds delighted. {mira}"That's the best sex I've ever had and I can't walk. Carry me."`;
            } else {
                pvText = `She climbs onto the workbench on all fours, her enormous ass raised and waiting. You step up behind her, grab a handful in each hand, and push into her pussy, ${pvFeel}. ${pvReact} Every thrust sends her ass bouncing, the impact rippling through her, and her moans get louder each time you squeeze harder.`;
                pvText += `\n\nThe rhythm builds, your hips slapping against her rear, each impact sending waves through her massive cheeks. She reaches back and grabs your wrist, pulling your hand to her ass. {mira}"Don't just squeeze, spank." You oblige and she moans, head dropping, her whole body rocking forward with each thrust. The workbench creaks beneath you both. She's dripping onto the wood, clenching tighter every time your palm connects.`;
                pvText += `\n\nShe buries her face in her arms and comes, her ass pushing back hard against you, her walls squeezing in rhythmic pulses. You grab both cheeks and thrust through it, the rippling flesh pulling you over the edge. You collapse over her back, both of you panting. {mira}"My ass is going to be red for a week." She turns her head and grins. {mira}"Promise me it will."`;
            }
            if (playerGS >= 3 && miraGS === 0) {
                pvText += `\n\nShe winces as you pull out, tight to begin with, and the angle from behind stretched her to her limit. {mira}"You're big and my ass makes the angle deeper." She rubs her rear gingerly. {mira}"Worth every inch though."`;
            } else if (playerGS === 0 && miraGS >= 3) {
                pvText += `\n\nHer swollen pussy is still clenching in aftershocks, puffy lips reluctant to release you. {mira}"See, this is why the ass matters." She wiggles her rear. {mira}"You don't need a big dick when you've got something THIS good to grind against."`;
            } else if (playerGS >= 3 && miraGS >= 3) {
                pvText += `\n\nThe combination was overwhelming, your thick cock stretching her swollen pussy while her massive ass cushioned every impact. She lies there twitching, overstimulated from the inside out. {mira}"Too big, too sensitive, too much ass." She shivers. {mira}"I think you broke me."`;
            }

            // VV: both vulva
            let vvText;
            if (miraM >= 5 && playerM === 0) {
                vvText = `She sits on your face without preamble, straddles you on the workbench and drops her enormous ass onto you. You're buried, surrounded, your whole world reduced to warm flesh and the taste of her. She grinds against your mouth while her thick fingers find you below, working you with casual strength.`;
                vvText += `\n\nHer massive cheeks press against the sides of your head, blocking out all sound except her moans from above. Your tongue works her folds and she rocks harder, her ass bouncing on your face. Every time you lick deeper she rewards you with faster fingers. {mira}"Right there, oh, your tongue, right THERE ..." Her thighs tremble on either side of you, her enormous rear shaking.`;
                vvText += `\n\nShe grinds down hard and comes on your face, her ass pressing you into the workbench as her body convulses. Her fingers don't stop, they speed up, curling inside you, and the vibrations of her moans against your body tip you over seconds later. She rolls off, panting, and you gasp for air. {mira}"Sorry about the... suffocation." She's not sorry at all. {mira}"Your face was SO good in there."`;
            } else if (miraM >= 5) {
                vvText = `She pins you face-down over the workbench and grinds against your ass from behind, her massive rear pressing against yours. Her hand snakes between your legs, fingers finding you. She fingers you from behind while grinding, her muscular hips rolling with devastating rhythm. {mira}"How's that feel?" You can't answer. She laughs.`;
                vvText += `\n\nHer fingers pump deeper, matching the rhythm of her grinding hips. Her enormous ass presses against yours, warm and heavy, while her other hand reaches around to grab you by the hip for leverage. She's relentless, strong, tireless. Her muscular body working you from both sides. You reach back and grab her ass and she groans, grinding harder.`;
                vvText += `\n\nShe comes first, her grinding going frantic, her ass slamming against yours, her fingers buried deep as she shakes. She doesn't stop working you though, and the desperate pace of her fingers push you over the edge moments later. You both collapse on the workbench, her massive rear resting on your back like a warm blanket. {mira}"Best workout I've had all week," she mumbles into your shoulder.`;
            } else if (playerM >= 5) {
                vvText = `You bend her over and press behind her, one hand buried between her thighs, the other squeezing her massive ass hard enough to leave marks. She pushes back into your hand, moaning, while you finger her from behind. {mira}"Your grip, gods, yes, don't let go ..."`;
                vvText += `\n\nYou work her hard, fingers pumping, palm grinding against her clit, your other hand kneading her enormous cheek. She's braced against the workbench, moaning constantly, her ass pushing back into your grip with every stroke. You spank her between thrusts of your fingers and she yelps, clenching around you. {mira}"Keep doing, both things, at once ..."`;
                vvText += `\n\nYou spank her one last time and curl your fingers and she comes apart, screaming, her massive ass shaking, her legs giving out. You hold her up by her rear, still fingering her through the aftershocks, until she reaches back and grabs your wrist. {mira}"Mercy." She's breathless. {mira}"Now let me do you." She turns around with a look that promises revenge.`;
            } else {
                vvText = `You sit side by side on the workbench, and she lifts one leg over yours, pulling you close. Fingers slide between each other's thighs while her free hand guides yours to her ass. {mira}"Squeeze while you touch me." You do, and she whimpers every time your grip tightens on her rear.`;
                vvText += `\n\nThe pace quickens, fingers pumping, mouths trading kisses, your hand kneading her enormous ass while her other hand pulls you closer by the hip. She's whimpering with every stroke, pushing her rear into your palm. {mira}"Harder, squeeze harder ..." You dig your fingers into the soft flesh and she clenches around your fingers, gasping. Her own hand speeds up inside you, desperate and sloppy.`;
                vvText += `\n\nShe comes with your fingers buried inside her and your hand clenched on her ass, shaking, whimpering, her massive rear trembling in your grip. The sight and feel of her falling apart drags you after her, and you bury your face in her neck as you come around her fingers. She pulls you close, your hand still on her ass. {mira}"Don't let go." You don't.`;
            }
            if (miraGS >= 3 && playerGS >= 3) {
                vvText += `\n\nBoth of you are swollen and oversensitive in the aftermath, thick, puffy lips still throbbing. She shifts her massive ass against you experimentally and you both shudder. {mira}"Round two?" She's already reaching for you again.`;
            }

            // Build VP penetration feel based on both genital sizes
            let vpFeel, vpReact;
            if (miraGS >= 3 && playerGS === 0) {
                vpFeel = `her thick cock forces your tight pussy open, you're stretched around every inch, the fullness bordering on too much`;
                vpReact = `{mira}"Oh fuck, you're so TIGHT ..." Her eyes roll back, her hips stuttering. {mira}"I can feel you squeezing every inch of me."`;
            } else if (miraGS >= 3 && playerGS >= 3) {
                vpFeel = `her thick cock sinks into your swollen pussy, plush walls parting around her girth, both of you feeling every vein and ridge`;
                vpReact = `{mira}"Gods, you're so wet and I'm so big and it's ..." She can't finish the sentence, overwhelmed by the hot, slick grip of you around her.`;
            } else if (miraGS === 0 && playerGS === 0) {
                vpFeel = `her modest cock slides into your tight pussy, the fit is snug, intimate, every small thrust magnified`;
                vpReact = `{mira}"Oh, that's perfect." She bites her lip, savoring how closely you grip her. {mira}"I can feel everything like this."`;
            } else if (miraGS === 0 && playerGS >= 3) {
                vpFeel = `her modest cock slips easily into your swollen pussy, your plush walls engulfing her completely`;
                vpReact = `{mira}"Oh, you just swallowed me whole." She grins, rolling her hips experimentally. {mira}"I'm going to have to work for it in there." She clenches her ass and thrusts harder to compensate.`;
            } else if (miraGS >= 3) {
                vpFeel = `her thick cock stretches you open, filling you completely as she pushes in`;
                vpReact = `You gasp at the fullness. {mira}"Too much?" She doesn't slow down. {mira}"Your pussy can take it."`;
            } else if (playerGS === 0) {
                vpFeel = `your tight pussy grips her cock firmly the moment she pushes in`;
                vpReact = `{mira}"Tight ..." she hisses, her hips jerking forward. {mira}"Gods, you're gripping me so hard."`;
            } else if (playerGS >= 3) {
                vpFeel = `your swollen pussy takes her easily, plush walls wrapping around her cock, wet and hot`;
                vpReact = `{mira}"Oh, that's nice." She rolls her hips, feeling how easily she glides inside you. {mira}"So wet for me."`;
            } else {
                vpFeel = `you're warm and wet around her cock, walls squeezing as she pushes in`;
                vpReact = `{mira}"There you go ..." She sighs, sinking deeper. {mira}"You feel incredible."`;
            }

            // VP: player vulva + Mira penis
            let vpText;
            if (miraM >= 5 && playerM === 0) {
                vpText = `She lifts you, turns you around, and lowers you onto her cock. You're sitting in her lap, her enormous ass cushioning you like a throne, ${vpFeel}. ${vpReact} Her arms wrap around your waist. She bounces you with her hips, using nothing but glute power, and you're helpless, just along for the ride.`;
                vpText += `\n\nHer glutes flex beneath you, driving her cock deeper with each bounce. Her massive cheeks cushion every impact, soft flesh against your thighs while her rigid cock works you from below. She buries her face in your neck, groaning, her arms pulling you down harder. {mira}"You feel so good on top of me." Her hips roll, grinding deep, her ass flexing with terrifying precision.`;
                vpText += `\n\nShe slams her hips up and comes, buried deep, her cock pulsing inside you while her enormous ass clenches beneath you. The force lifts you off her lap and she catches you, pulls you back down, holds you there while she finishes. You come clenching around her, cradled in the cushion of her rear. {mira}"Best seat in the house," she pants. {mira}"You're sitting here from now on."`;
            } else if (miraM >= 5) {
                vpText = `She pins you against the workbench face-first and pushes her cock into your pussy from behind, ${vpFeel}. ${vpReact} Her massive hips slam against your ass with each thrust, the impact of her enormous rear shaking the whole bench. {mira}"I could do this all day," she pants, not slowing down.`;
                vpText += `\n\nShe grabs your hips and pulls you back to meet her, her massive ass providing the driving force behind each brutal thrust. The slap of her flesh against yours echoes through the workshop. Her hand reaches around to grab your hip for leverage and her pace doubles, her ass flexing, her cock driving deep. {mira}"Take it, all of it ..." Each word punctuated by the impact of her rear against you.`;
                vpText += `\n\nShe buries herself and comes with a guttural moan, her ass pressed tight against you as her cock pulses. The pressure and depth push you over and you come clenching around her, both of you shaking, braced against the creaking workbench. She pulls out slowly and leans her weight against your back. {mira}"I dented the workbench." She sounds proud. {mira}"With my ass. That's a first."`;
            } else if (playerM >= 5) {
                vpText = `You push her down, climb on top facing away, reverse cowgirl, and sink your pussy onto her cock, ${vpFeel}. ${vpReact} You lean back, your hands gripping her massive ass for leverage, squeezing the soft flesh as you bounce. She's moaning beneath you, hips bucking involuntarily every time you dig your fingers into her rear.`;
                vpText += `\n\nYou ride her hard, using her massive cheeks as handholds, fingers sinking into soft flesh while her cock hits deep. She bucks beneath you, her ass bouncing off the workbench with every thrust, and each time you squeeze harder she thrusts harder. {mira}"My ass, gods, your HANDS ..." She's gripping the edge of the bench, knuckles white.`;
                vpText += `\n\nYou slam down and squeeze her ass hard enough to leave bruises and she comes, screaming, cock pulsing inside you, her massive rear trembling in your grip. You ride her through it, clenching, and the feeling of her twitching cock tips you over. You collapse back onto her, your weight settling onto her enormous soft cheeks. {mira}"Ow." She shifts beneath you. {mira}"Worth it. Stay."`;
            } else {
                vpText = `She pushes her cock into your pussy from behind, ${vpFeel}. ${vpReact} Her enormous ass bounces against your rear with each thrust, hands gripping your hips while she watches herself disappear into you. {mira}"You feel incredible," she breathes, squeezing your hip harder.`;
                vpText += `\n\nHer pace builds, her massive cheeks slapping against you on every stroke, the sound filling the workshop. She reaches around your hip, pulling you back to meet each thrust, her ass providing the momentum. {mira}"I love this, watching my ass bounce against you ..." She's watching herself in the reflection of a brass fitting, grinning even as she pants.`;
                vpText += `\n\nShe thrusts deep and stays, grinding, her enormous rear pressed against you as she comes, cock pulsing, hips rolling, a moan that starts in her chest and doesn't stop. You come around her moments later, pushing back against the warm press of her body. She drapes over your back, still inside you. {mira}"My ass jiggles when I come. Did you know that?" She sounds unreasonably pleased. {mira}"I watched."`;
            }
            if (miraGS >= 3 && playerGS === 0) {
                vpText += `\n\nShe pulls out slowly and you feel every inch, her massive cock was a lot for your body. {mira}"Sorry." She kisses your shoulder. {mira}"My ass gets me so worked up I forget to pace myself."`;
            } else if (miraGS === 0 && playerGS >= 3) {
                vpText += `\n\nHer small cock slips free and she looks almost embarrassed, but you pull her close, pressing her massive ass against you reassuringly. {mira}"You don't care about the cock, do you?" She wiggles her rear against you. {mira}"You're an ass person. I can tell."`;
            } else if (miraGS >= 3 && playerGS >= 3) {
                vpText += `\n\nHer thick cock and your swollen pussy made every thrust overwhelming, deep, stretching, her massive ass driving the force. She's still twitching inside you. {mira}"I think I came twice. Maybe three times. I lost count around when you grabbed my ass."`;
            }

            // PP: both penis
            let ppText;
            if (miraM >= 5) {
                ppText = `She pins you down and sits on your cock, not inside, between her cheeks. Her massive muscular ass engulfs your shaft as she squeezes her glutes, creating a tight tunnel of warm flesh. She grinds back and forth while stroking herself, flexing deliberately with each stroke. {mira}"How's THAT for a workout?"`;
                ppText += `\n\nShe rolls her hips, her enormous cheeks sliding along your shaft with controlled power. The friction is incredible. Warm, tight, her muscles squeezing on every backstroke. She's stroking herself in time, cock bobbing between her thighs, while her other hand braces on your chest. {mira}"I can feel you throbbing between my cheeks." She clenches tighter. {mira}"Throb harder."`;
                ppText += `\n\nShe grinds down and squeezes and you come between her massive cheeks, cum streaking up her back. The friction and her own hand push her over seconds later, her cock spurting onto your stomach as her glutes clench in rhythmic spasms. She looks over her shoulder at the mess. {mira}"My ass did that." She flexes one cheek, then the other. {mira}"My ass is talented."`;
            } else if (playerM >= 5) {
                ppText = `You bend her over and slide your cock between her enormous cheeks, grabbing handfuls of flesh to press them together around your shaft. She strokes herself while you thrust, the soft heat of her ass enveloping you. She pushes back with every stroke, moaning each time you spank her.`;
                ppText += `\n\nYou squeeze her cheeks tight around your shaft and thrust harder, the soft flesh bouncing with every stroke. She's jerking herself fast, moaning into the workbench, pushing her massive ass back to meet you. You spank her again, hard, and she yelps, her hand speeding up. {mira}"Keep spanking me, I'm close, don't stop ..."`;
                ppText += `\n\nYou spank her one last time and she comes, cock jerking, cum hitting the underside of the workbench, her massive ass shaking in your hands. The clenching cheeks squeeze your shaft and you come across her back, painting her rear. She reaches back and runs a finger through it. {mira}"Best. Ass. Ever." She's not wrong.`;
            } else {
                ppText = `She sits in your lap, her enormous ass settling over your cock, not inside, between her cheeks. She grinds back and forth, both of you stroking yourselves while her massive rear provides the friction. Both cocks drip between her cheeks, slicking the path. {mira}"I've thought about this," she admits, grinding harder.`;
                ppText += `\n\nShe leans back against you, grinding her ass along your shaft while you both stroke. The wet friction builds, pre-cum from both of you slicking her cheeks. She's panting, rolling her hips, her massive rear bouncing in your lap. {mira}"Squeeze my ass while we do this." You grab two handfuls and she moans, grinding faster, her hand a blur on her own cock.`;
                ppText += `\n\nShe comes first, her ass clenching in your hands, cock pulsing, cum arcing forward while she shakes in your lap. The clenching and grinding pull you after her, and you come between her massive cheeks, both of you slick and sticky and breathing hard. She looks down at the mess. {mira}"We're going to need a bath." She wiggles in your lap. {mira}"Together, obviously."`;
            }
            if (playerGS >= 3 && miraGS >= 3) {
                ppText += `\n\nTwo thick cocks made a spectacular mess of her enormous cheeks, barely enough room between them, cum everywhere. She surveys the aftermath with pride. {mira}"My ass could start charging admission."`;
            } else if (playerGS === 0 && miraGS === 0) {
                ppText += `\n\nBoth modest cocks nearly vanished between the sheer mass of her ass, but her grinding more than compensated. {mira}"See? Doesn't matter how big you are when you've got an ass like mine."`;
            }

            const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };
            this.text = opening + '\n\n' + partnerBeat + '\n\n' + oralPhase + '\n\n' + getSexSceneText('mira', branches);

        } else if (focusStat === 'muscle') {
            // === MUSCLE-FOCUSED SEX SCENE ===
            const miraC = miraBody.chest;
            const miraB = miraBody.butt;
            const playerC = playerBody.chest;
            const playerM = playerBody.muscle;
            const playerB = playerBody.butt;
            const playerGS = playerBody.genitaliaSize;
            const miraGS = miraBody.genitaliaSize;
            const npcChest = getBodyStatDesc('mira', 'chest');

            // Part 1: Mira's muscle description (branch on her chest)
            let part1;
            if (miraC <= 1) {
                part1 = `Mira walks in and the first thing you notice is the vein running down her bicep. She's pure muscle, no softness anywhere, every line of her body hard-edged and defined. Her ${npcChest} is nearly invisible against the wall of her pecs. She flexes both arms without being asked.\n\n{mira}"Check it out, boss." She grins, bouncing her pecs one at a time. {mira}"I scared a horse today. Just by flexing. Horse ran into a fence."`;
            } else if (miraC <= 3) {
                part1 = `Mira pulls her crop top tight across her chest, fabric straining across both muscle and curves. She's powerful, thick arms, carved abs visible beneath the thin material, but her ${npcChest} softens the edges. Athletic goddess. She rolls her shoulders and everything ripples.\n\n{mira}"I arm-wrestled a blacksmith today." She cracks her knuckles. {mira}"Won. He cried a little."`;
            } else {
                part1 = `Mira is a wall of contradictions, massive chest sitting atop massive muscles, her ${npcChest} straining against a body that could bench-press the workbench. She's enormous in every direction, powerful and soft at the same time, and she fills the entire doorway.\n\n{mira}"I picked up a cart today. Not pulled, picked up." She flexes and her crop top tears at the shoulder. {mira}"With people in it. They screamed but I think they liked it."`;
            }

            // Part 2: Getting close (branch on player muscle)
            let part2;
            if (playerM === 0) {
                part2 = `She pulls you in and your body folds against hers like paper against stone. Every part of her is hard, arms, abs, thighs. You feel impossibly small and light in her grip. She lifts you off the ground with one arm, just to prove she can.\n\n{mira}"You weigh nothing." She sounds almost concerned. Then she grins. {mira}"I could throw you across the room. I won't. But I COULD."`;
            } else if (playerM >= 5) {
                part2 = `You grab each other and it immediately becomes a contest. Her hands clamp on your arms, yours on hers, and you both squeeze. Muscle against muscle. Neither gives. She grins. You grin. She tries to push you against the wall. You push back.\n\nThe workbench between you cracks.\n\n{mira}"Finally," she breathes, eyes bright. {mira}"Someone who can take it."`;
            } else {
                part2 = `She grabs your arms and squeezes experimentally, testing you. Then she picks you up, both hands on your waist, effortless, and sets you on the workbench like you're a piece of equipment.\n\n{mira}"Cute." She pins both your wrists with one hand. Her grip is iron. {mira}"Let me show you what this body can do."`;
            }

            if (playerC >= 4) {
                part2 += ` She presses against you and your chest cushions the impact of her hard body. {mira}"Oh, that's nice. Soft where I'm hard."`;
            }
            if (playerB >= 4) {
                part2 += ` Her hand drops to grab your ass, testing its firmness. {mira}"Good. Something to hold onto."`;
            }
            if (miraB >= 5) {
                part2 += ` Her skirt has given up entirely, bunched at her waist, her enormous muscular ass completely exposed. Between the muscle and the sheer size, no fabric stands a chance.`;
            } else if (miraBody.genitalia === 1 && miraGS >= 3) {
                part2 += ` Her skirt does nothing useful, her massive cock hangs past the hem, fully exposed. She doesn't even pretend to adjust it.`;
            }
            if (playerB >= 5) {
                part2 += ` Your own skirt has ridden up past your hips, your bare ass on full display. She glances down and grins. {mira}"Guess we're both done pretending clothes work."`;
            } else if (playerBody.genitalia === 1 && playerGS >= 3) {
                part2 += ` Your own skirt isn't hiding anything, your cock juts past the hem, on full display. She glances down and grins. {mira}"Guess we're both done pretending clothes work."`;
            }

            // Part 3: Muscle worship (always present)
            const part3 = `She strips off her crop top and flexes, a full double bicep pose, every muscle visible, sweat already sheening across her skin. Her abs are a cobblestone road. Her arms are bigger than your thighs.\n\n{mira}"Touch them." She grabs your hand and runs it down her bicep, across her chest, over the ridges of her abs. {mira}"Feel how hard I am. Everywhere."\n\nYou trace each muscle, feeling it twitch under your fingers. She shivers, every part of her is sensitive, wound tight, buzzing with restrained power. When you run your nails across her abs she sucks in a breath and her whole body tenses.`;

            const opening = part1 + '\n\n' + part2 + '\n\n' + part3;

            // PV: player penis + Mira vulva
            let pvText;
            if (playerM === 0) {
                pvText = `She picks you up with one arm and holds you against the wall. Your feet don't touch the ground. She lowers herself onto you, impaling herself while holding your entire body weight, and starts bouncing you. Her arms don't shake. Her abs flex with each thrust. {mira}"Just hold on," she says. You have no choice in the matter.`;
                pvText += `\n\nHer biceps flex as she lifts and drops you, each thrust controlled entirely by her arms. You grab her shoulders, solid, carved, and hold on while she uses you. Her abs crunch visibly with every movement, a wall of muscle rippling beneath her skin. She watches your face with hungry eyes, her pace increasing without effort. {mira}"You weigh nothing. I could do this for hours."`;
                pvText += `\n\nShe flexes every muscle at once, arms, abs, walls, and comes with you pinned against the wall, your feet dangling, her whole body clenching around you like a full-body fist. You come inside her with nowhere to go, held in place by nothing but her strength. She holds the position for a long, trembling moment, then sets you down gently. Your legs don't work. {mira}"Sorry." She's grinning. {mira}"Forgot you have normal muscles."`;
            } else if (playerM >= 5) {
                pvText = `You slam her against the wall and she slams you back. You end up on the workbench, her on top, then you on top, then her again, both fighting for position while fucking. Every thrust is a power move. She clenches around you and flexes her abs simultaneously, the internal pressure almost painful. {mira}"Is that all you've got?" You answer with your hips.`;
                pvText += `\n\nYou flip her and she flips you back, you're both too strong to stay pinned. You end up with her riding you while you grip her arms, testing each other's strength, muscles straining. She clenches around you with terrifying control, her abs rippling as she rolls her hips. You thrust up hard enough to lift her and she gasps, then slams back down harder. Neither of you is backing down.`;
                pvText += `\n\nIt ends like a contest, she comes first, losing the grip battle, her muscular body convulsing around you while she tries to maintain position. You come seconds later, pulling her down by her rock-hard biceps, both of you tangled in a knot of sweaty muscle. She's panting, arms shaking for the first time. {mira}"Draw." You disagree. {mira}"Fine. You won. THIS time."`;
            } else {
                pvText = `She pins you on the workbench, climbs on top, and rides you. Her muscular thighs grip your hips like a vise, her abs rolling with each movement. You grab her arms, solid as iron, and hold on while she controls every angle, every depth, every speed. {mira}"You don't get to move. I've got this."`;
                pvText += `\n\nShe rides you with machine precision, every flex calculated, every angle deliberate. Her thighs squeeze your hips, her abs ripple, her arms brace on either side of your head, biceps bulging. You reach up and trace the ridges of her stomach and she shivers, pace faltering. {mira}"Don't... when you touch my muscles I lose my ..." You do it again. Her rhythm breaks.`;
                pvText += `\n\nYou run your nails down her abs and she comes, losing all that careful control, her muscular body clenching around you in chaotic, powerful spasms. The squeeze is almost painful and it drags you over with her. She collapses on top of you, all hard angles and heaving muscle, heavy as stone. {mira}"You found my weakness." She sounds annoyed and satisfied in equal measure. {mira}"Nobody touches the abs during sex. That's cheating."`;
            }
            // PV genital size variation
            let pvSize;
            if (playerGS >= 3 && miraGS === 0) {
                pvSize = `Her muscle control made the tightness even more intense, her walls clenched deliberately around your thick cock, as strong as the rest of her, forcing herself wider through sheer power. {mira}"You're big, and I'm strong." She flexes. {mira}"Good combination."`;
            } else if (playerGS >= 3 && miraGS >= 3) {
                pvSize = `Your thick cock inside her swollen pussy, combined with her muscular grip, was devastating, plush walls squeezing your girth with deliberate force. She clenched so hard through the orgasm that you're still seeing spots. {mira}"Muscles make everything better." She's not wrong.`;
            } else if (playerGS === 0 && miraGS === 0) {
                pvSize = `Tight around you, the fit was snug and intimate, and her muscles made it perfect. She clenched with surgical precision, making every small movement feel enormous. {mira}"I can squeeze hard enough to crack walnuts." She clenches deliberately. {mira}"Imagine what I do with something this cute inside me."`;
            } else if (playerGS === 0 && miraGS >= 3) {
                pvSize = `Her swollen pussy engulfed you, plush, hot, overwhelming, but her muscles clamped down and made size irrelevant. She squeezed hard enough to make your cock feel twice as big. {mira}"Who needs a big cock when you've got THESE?" She flexes her abs. {mira}"I squeeze hard enough to make any cock feel huge."`;
            } else if (playerGS >= 3) {
                pvSize = `Her muscular walls gripped your thick cock with precision, every inch accounted for, her body treating your size like a workout. {mira}"Big." She squeezes one final time. {mira}"Gives my muscles something to work with."`;
            } else if (miraGS === 0) {
                pvSize = `She was tight, and her muscles made it tighter, deliberate, controlled, each clench turning the snug fit into something devastating. {mira}"Tight and strong." She flexes. {mira}"Basically a superpower."`;
            } else if (miraGS >= 3) {
                pvSize = `Her swollen pussy was plush and hot around you, but her muscles turned all that softness into rhythmic, powerful squeezes. {mira}"Swollen AND muscular." She grins. {mira}"Nature gave me the size and I gave it the squeeze. You're welcome."`;
            } else {
                pvSize = `Her muscular walls gripped you perfectly, not passive tightness but active, deliberate clenching, working you from the inside. {mira}"All muscle control." She flexes. {mira}"Everything I do is muscle control."`;
            }
            pvText += `\n\n${pvSize}`;

            // VV: both vulva, Mira lifts player for oral
            let vvText;
            if (playerM === 0) {
                vvText = `She grabs you by the waist with one arm and lifts you like you're made of paper. {mira}"Up you go." She settles your thighs on her shoulders, your pussy directly in front of her face. Her free arm hangs at her side, she doesn't need it. One arm holds your entire weight without a tremor.`;
            } else if (playerM >= 5) {
                vvText = `She grabs you and lifts, even with all your muscle mass, she handles you with one arm. Her bicep bulges, veins popping, but she doesn't falter. She settles your thighs on her shoulders, your pussy at eye level. {mira}"Heavy," she admits, grinning up at you. {mira}"But not heavy enough to matter."`;
            } else {
                vvText = `She grabs you by the waist and hoists you up with one arm, settling your thighs on her broad shoulders. Your pussy is directly in front of her face. She grins up at you, bicep flexed and steady. {mira}"Best seat in the house."`;
            }
            if (miraC >= 5) {
                vvText += ` She adjusts, settling your weight partly on her massive chest. Her breasts form a warm, soft shelf beneath your ass, cushioning you against all that hard muscle. {mira}"Comfortable? My tits make a pretty good seat."`;
            }
            if (playerC >= 5) {
                vvText += ` In this position, reclined back, held aloft, your massive breasts slide to either side of your torso, heavy and soft, pulled apart by gravity. She glances up past them and her eyes widen. {mira}"The view from down here is incredible, by the way."`;
            }

            // Oral, branch on player vagina size
            let vvOral;
            if (playerGS >= 3) {
                vvOral = `She buries her face between your thighs and groans, your swollen, puffy lips are everywhere, thick and flushed and glistening. She has to work to cover all of you, tongue sweeping broad strokes across your engorged folds, lips sealing around your throbbing clit. {mira}"Gods, there's so much of you." She sounds reverent. Her tongue pushes between your puffy lips and the sensation is electric, every oversensitive inch of her lighting up at once.`;
            } else if (playerGS === 0) {
                vvOral = `She presses her mouth against you, delicate, precise. Your tight pussy fits perfectly against her lips, everything compact and sensitive. Her tongue traces your folds with surgical accuracy, finding your clit immediately. {mira}"Cute." She licks slowly, deliberately. {mira}"I can cover all of you with my mouth." She proves it, sealing her lips around your entire pussy, tongue working inside.`;
            } else {
                vvOral = `She presses her face between your thighs and gets to work, tongue hot and firm, tracing your folds, circling your clit, pushing inside. She eats you out with the same intensity she brings to everything, focused, relentless, powerful. {mira}"You taste incredible." She licks deeper. {mira}"Hold on tight."`;
            }

            // Free hand, Mira fingers herself (branch on Mira vagina size)
            let vvSelf;
            if (miraGS >= 3) {
                vvSelf = `Her free hand drops between her own legs. She's soaking. Her thick, puffy lips are so sensitive she barely has to touch herself. A single finger dragged across her engorged clit makes her moan against your pussy, the vibration traveling through you. {mira}"I'm... barely have to ..." She can't finish the sentence because her own touch makes her gasp.`;
            } else if (miraGS === 0) {
                vvSelf = `Her free hand drops between her own legs, strong fingers working herself with precise, powerful strokes. She's tight. It takes focus, but her fingers know exactly where to press. She moans against your pussy when she finds the right angle, the vibration making you shudder. {mira}"Multitasking," she breathes between licks.`;
            } else {
                vvSelf = `Her free hand drops between her own legs, thick fingers pushing inside herself while her tongue works you. She moans into your pussy, the vibration making you arch, and her fingers speed up in time with her tongue. {mira}"I can do both." Her voice is muffled. {mira}"Strong hands. Strong tongue."`;
            }
            vvText += `\n\n${vvOral}\n\n${vvSelf}`;

            // Finish together, branch on size combination
            let vvFinish;
            if (playerGS >= 3 && miraGS >= 3) {
                vvFinish = `Your pussy throbs against her mouth, her tongue buried in your puffy folds, while her own thick lips pulse around her fingers. Both oversensitive, both racing toward the edge. She licks harder, fingers faster, and you come, flushed lips clenching against her mouth, your whole body spasming in her one-armed grip. The taste and trembling push her over and she comes moments later, fingers buried deep, moaning into you as her own puffy lips pulse and twitch. Her arm never wavers.\n\n{mira}"Both wrecked." She wipes her mouth, still holding you up. {mira}"Both satisfied. And I didn't even need both hands."`;
            } else if (playerGS >= 3) {
                vvFinish = `Her tongue works your swollen, sensitive flesh relentlessly while her fingers match the pace between her own legs. You come first, your puffy lips throbbing against her mouth, your body convulsing in her grip. She moans into you, the vibration extending your orgasm, and follows seconds later with a muffled cry against your skin. She holds you through it without a tremor.\n\n{mira}"You taste even better when you're swollen." She licks her lips. {mira}"Come back when you're like this again."`;
            } else if (miraGS >= 3) {
                vvFinish = `Her tongue drives you higher while her own swollen pussy barely needs encouragement. She's so sensitive that a few strokes have her trembling. You come with a cry, thighs clamping around her head, and she follows immediately, her swollen lips pulsing around her fingers as she moans into your flesh. Her arm holds you steady through both.\n\n{mira}"I was already halfway there before I started." She grins, wiping her mouth. {mira}"When I'm this swollen, watching someone squirm on my face is enough."`;
            } else if (playerGS === 0 && miraGS === 0) {
                vvFinish = `Her tongue covers you completely, everything tight, compact, precise. Her fingers work her own tight pussy with the same precision. You come first, clenching, body tightening, and the sound you make pushes her over, she comes with a groan against your skin, fingers buried deep. Her arm stays rock-steady.\n\n{mira}"Tight." She licks her lips. {mira}"Both of us. And my tongue still found every spot." She flexes the arm holding you. {mira}"One-armed, full-service."`;
            } else {
                vvFinish = `Her tongue and fingers find the same rhythm, working you and herself in sync, building together. You come with a gasp, body arching in her grip, and she follows a heartbeat later, moaning against your skin as her fingers curl deep. Her arm holds you effortlessly through both orgasms.\n\n{mira}"Simultaneous." She looks smug, setting you down gently. {mira}"Tongue, fingers, and a one-arm hold. That's peak performance." She flexes. {mira}"I'm basically an athlete."`;
            }
            vvText += `\n\n${vvFinish}`;

            // VP: player vulva + Mira penis
            let vpText;
            if (playerM === 0) {
                vpText = `She holds you in the air, one arm under your back, one under your thighs, and lowers you onto her cock. You're completely suspended, nothing touching the ground, your entire weight held by her arms while she thrusts upward using nothing but core strength. Her abs crunch visibly with each movement. {mira}"Light as a feather," she grins, not even winded.`;
                vpText += `\n\nShe adjusts your angle mid-air, one arm shifting you effortlessly, finding the position that makes you gasp. Her core does all the work, visible abs crunching with each thrust, every movement precise and powerful. You cling to her shoulders, feeling the muscles bunch and shift under your hands. She's not even breathing hard. You are.`;
                vpText += `\n\nShe flexes her whole body and comes, arms tightening, abs clenching, cock pulsing deep inside you. She holds you in the air through the entire orgasm, arms like steel, and the squeeze around you pulls you over too. She finally sets you down and you crumple, legs useless. She stands over you, still flexed, barely winded. {mira}"That was my favorite exercise." She offers you a hand up. {mira}"Cool-down stretch?"`;
            } else if (playerM >= 5) {
                vpText = `You grapple, testing each other, and she wins, barely. She pins you face-down on the workbench and enters from behind, one powerful arm holding your wrists, her muscular hips driving forward. You push back with everything you've got and she has to brace. {mira}"Finally, someone who makes me work for it."`;
                vpText += `\n\nIt becomes a contest of strength, you pushing back against her thrusts, her pinning you down, muscles straining on both sides. Neither gives. Her hips slam forward with raw power, abs flexing, while you brace and match her force. The workbench groans. {mira}"Harder?" You push back harder. She grins and drives forward with everything she's got.`;
                vpText += `\n\nShe comes with a roar, full-body, muscles locked, cock buried deep, her iron grip on your wrists finally trembling. You come moments later, clenching around her as her whole powerful body shakes against yours. The workbench cracks, actually cracks, and you both freeze. {mira}"...we broke the workbench." She pulls out, stares at the damage. {mira}"Worth it. I'll fix it tomorrow."`;
            } else {
                vpText = `She lifts you onto the workbench, spreads your legs, and steps between them. Her muscular arms brace on either side of you as she pushes inside, abs flexing with each controlled thrust. Every muscle in her body works in concert. She's a machine, relentless and precise.`;
                vpText += `\n\nHer pace builds, controlled, mechanical, every thrust driven by her hips and abs working together. Her arms flex as she grips the workbench edge, biceps bulging, the veins in her forearms visible. You run your hands down her abs, feeling them crunch with each thrust. She shivers. {mira}"Touching my muscles while I'm inside you is..." She loses the word, thrusting harder.`;
                vpText += `\n\nYou dig your nails into her abs and she comes, her whole muscular body seizing up, cock buried deep, every visible muscle clenching at once. The sight of her, every ridge, every vein, every line of her body taut, pulls you over with her. She sags onto you, heavy and hard, breathing against your neck. {mira}"You keep touching my muscles like that," she mumbles, {mira}"and I'll never last more than five minutes." She sounds like she's made peace with it.`;
            }
            // VP genital size variation
            let vpSize;
            if (miraGS >= 3 && playerGS === 0) {
                vpSize = `Her thick cock with those powerful hips behind it was a lot for your tight pussy. She stretched you open with every thrust, muscles driving relentlessly deeper. She pulls out carefully, muscles gentle for once. {mira}"Sorry. When my muscles take over I forget to hold back." She doesn't look sorry.`;
            } else if (miraGS >= 3 && playerGS >= 3) {
                vpSize = `Her thick cock inside your swollen pussy, driven by all that muscle, every thrust hit like a freight train, your plush walls gripping her girth while her powerful hips drove deeper. She's still twitching inside you. {mira}"Full power." She flexes weakly. {mira}"I gave you full power and you took it. Impressive."`;
            } else if (miraGS === 0 && playerGS === 0) {
                vpSize = `She wasn't big, but her muscles more than compensated, every thrust carried the full force of her frame, and your tight walls made each one count double. {mira}"Who needs size", she flexes both arms. {mira}"when you've got THESE behind every thrust?"`;
            } else if (miraGS === 0 && playerGS >= 3) {
                vpSize = `Her cock wasn't big, but your swollen pussy gripped her like a hot, plush glove, and her powerful muscles drove every thrust deep enough to make size irrelevant. {mira}"Your pussy did half the work." She grins. {mira}"My muscles did the rest. Good team."`;
            } else if (miraGS >= 3) {
                vpSize = `Her thick cock filled you completely, every thrust powered by raw muscle, the combination of her size and her strength was overwhelming. {mira}"Big AND strong." She flexes. {mira}"You got the full package."`;
            } else if (playerGS === 0) {
                vpSize = `You were tight around her, and her powerful thrusts made every inch feel like more, muscles turning each stroke into something overwhelming. {mira}"Tight." Her eyes darken. {mira}"I can feel EVERYTHING when you squeeze like that."`;
            } else if (playerGS >= 3) {
                vpSize = `Your swollen pussy gripped her cock, plush walls pulsing around her shaft with every muscle-powered thrust. {mira}"Swollen and squeezing." She shivers. {mira}"Best feeling in the world."`;
            } else {
                vpSize = `Every thrust powered by her full muscular frame. She didn't do anything halfway, and inside you was no exception. {mira}"Every thrust is a rep." She flexes. {mira}"And I never skip reps."`;
            }
            vpText += `\n\n${vpSize}`;

            // PP: both penis
            let ppText;
            if (playerM === 0) {
                ppText = `She wraps one massive hand around both your cocks and strokes with terrifying efficiency. Her grip is iron. Her other arm pins you against her chest, your back to her abs, and she works you both until your legs give out, which she expected, because her arm was already holding you up.`;
                ppText += `\n\nHer forearm flexes with each stroke, muscles rippling, her strong hand firm and perfect around both shafts. She adjusts her grip, finding the angle that makes you gasp, and her abs tighten against your back as she speeds up. {mira}"I can feel both of us pulsing." Her voice is strained. {mira}"My hand is the only thing keeping us both together."`;
                ppText += `\n\nShe tightens her grip and strokes hard and fast and you both come at once, her cock pulsing against yours in her iron fist, cum covering her hand and your stomach. She holds you through it, arm steady, muscles not even trembling while you shake apart against her. She surveys the mess. {mira}"One-handed." She wipes her hand on your thigh. {mira}"I didn't even use my strong hand."`;
            } else if (playerM >= 5) {
                ppText = `You grip each other's cocks like arm wrestlers, competitive, intense, neither willing to break first. Her powerful hand works your shaft while yours works hers, both of you grunting with effort and arousal. Her free hand grips your arm, feeling your bicep flex. {mira}"Nice." You return the compliment by squeezing harder.`;
                ppText += `\n\nIt becomes a race, who can make the other come first. Her grip tightens, yours tightens. Her pace increases, yours matches. Her free hand clamps on your forearm, feeling your muscles flex with each stroke. {mira}"You're strong." Her voice is strained. {mira}"But I'm stronger." She twists her wrist on the upstroke. You counter with a thumb over her head. Neither yields.`;
                ppText += `\n\nShe breaks first, her grip faltering, cock pulsing in your hand, a strangled cry tearing from her chest as she comes. You follow seconds later, triggered by her hand clenching involuntarily around your shaft as she loses control. Both of you stand there, muscles trembling, hands covered. {mira}"You won." She's panting. {mira}"BARELY. And next time I'm using both hands."`;
            } else {
                ppText = `She presses you against the wall, both cocks trapped between your bodies, and grinds. Her hard abs provide friction from one side, her hand from the other. She pins your wrists above your head and controls everything, speed, pressure, angle. {mira}"Just let me handle this."`;
                ppText += `\n\nHer abs grind against both shafts, hard muscle providing incredible friction. She wraps her hand around both cocks and strokes while grinding, her whole body working in coordinated rhythm. Every muscle flexes in time. You try to move your wrists and she tightens her grip, iron. {mira}"I said I've got this." Her pace builds, her abs trembling, sweat sheening across every ridge.`;
                ppText += `\n\nShe grinds hard and you both come, cocks pulsing between her abs and her hand, cum streaking across both your stomachs. She holds you pinned against the wall through it, muscles trembling for the first time, her breath hot against your neck. She finally releases your wrists. {mira}"That was all muscle." She flexes, still panting. {mira}"Every part of this was muscle. You're welcome."`;
            }
            // PP genital size variation
            let ppSize;
            if (playerGS >= 3 && miraGS >= 3) {
                ppSize = `Two massive cocks in her powerful grip, she had to use both hands just to contain them. The friction of shaft against shaft against muscle was overwhelming. {mira}"Big cocks, big muscles. Best combination in the world."`;
            } else if (playerGS === 0 && miraGS === 0) {
                ppSize = `Both modest, but her grip turned it into something incredible. She squeezed hard enough to make size irrelevant. {mira}"I can crush coal into diamonds with this grip." She flexes. {mira}"Imagine what I can do with a cock."`;
            } else if (playerGS >= 3 && miraGS === 0) {
                ppSize = `Your thick cock dwarfed hers in her grip, but her iron hand equalized them, wrapping both together, the size difference adding to the friction. {mira}"Big and small together." She squeezes. {mira}"More contrast means more friction. Science."`;
            } else if (playerGS === 0 && miraGS >= 3) {
                ppSize = `Her massive cock made yours look small by comparison, but her hand wrapped them together and her muscular grip made the difference part of the fun. The heat of her thick shaft throbbing against yours was intense. {mira}"Don't worry about size." She squeezes both. {mira}"My grip makes everyone equal."`;
            } else if (playerGS >= 3) {
                ppSize = `Your thick cock throbbed in her powerful grip, her strong hand working every inch with muscular precision. {mira}"Big." She squeezes appreciatively. {mira}"Gives me more to work with."`;
            } else if (miraGS >= 3) {
                ppSize = `Her massive cock pulsed against yours in her grip, the heat and thickness radiating through your shaft. Her strong hand kept them pressed together, muscles flexing with each stroke. {mira}"Mine's bigger." She grins. {mira}"But my hand doesn't play favorites."`;
            } else if (miraGS === 0) {
                ppSize = `Neither of you was big, but her grip made it irrelevant, strong fingers wrapping both shafts tight, muscular precision turning modest into devastating. {mira}"It's not about the size." She flexes her forearm. {mira}"It's about the grip. And my grip is legendary."`;
            } else {
                ppSize = `Her strong grip made the most of everything, strong hands working both shafts with muscular precision, every stroke deliberate and powerful. {mira}"All technique." She flexes. {mira}"Muscle technique. The best kind."`;
            }
            ppText += `\n\n${ppSize}`;

            const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };
            this.text = opening + '\n\n' + partnerBeat + '\n\n' + oralPhase + '\n\n' + getSexSceneText('mira', branches);

        } else if (focusStat === 'genitaliaSize') {
            // === GENITALIA-SIZE-FOCUSED SEX SCENE ===
            const miraM = miraBody.muscle;
            const miraC = miraBody.chest;
            const miraB = miraBody.butt;
            const miraHasVulva = miraBody.genitalia === 0;
            const playerC = playerBody.chest;
            const playerM = playerBody.muscle;
            const playerB = playerBody.butt;
            const playerGS = playerBody.genitaliaSize;
            const miraGS = miraBody.genitaliaSize;
            const npcChest = getBodyStatDesc('mira', 'chest');
            const miraInSkirt = miraB >= 5 || (!miraHasVulva && miraGS >= 3);
            const playerInSkirt = playerB >= 5 || (playerBody.genitalia === 1 && playerGS >= 3);

            // Part 1: Mira's genital description (branch on genitalia type)
            let part1;
            if (miraHasVulva) {
                if (miraInSkirt) {
                    part1 = `Mira walks in with her thighs pressed together, every step careful and deliberate. Her face is flushed and her breathing is shallow. Her tiny skirt, already fighting a losing battle against her enormous ass, has a dark wet patch spreading down the inside of one thigh. She grabs the edge of the workbench and squeezes.\n\n{mira}"Boss, I have a situation." She shifts her weight and her whole body shudders. {mira}"She's so swollen that every time my thighs rub together I almost, and this skirt doesn't even cover enough to hide ..."\n\nShe pulls at the hem uselessly. It springs back up. A thin trail of wetness glistens on her inner thigh.\n\n{mira}"I've been dripping since I woke up. I need you to touch me before I lose my mind."`;
                } else {
                    part1 = `Mira walks in with her thighs pressed together, every step careful and deliberate. Her face is flushed and her breathing is shallow. She grabs the edge of the workbench and squeezes.\n\n{mira}"Boss, I have a situation." She shifts her weight and her whole body shudders. {mira}"She's so swollen I can feel every seam in my pants. I've been throbbing since I woke up. Every step is, the friction is ..."\n\nShe bites her lip hard enough to leave marks.\n\n{mira}"I need you to touch me before I lose my mind."`;
                }
            } else {
                if (miraB >= 5) {
                    part1 = `Mira comes through the door holding her courier bag strategically in front of her hips, face crimson. She drops the bag and there's no hiding it. Her cock is jutting out past her tiny skirt entirely, the hem can't reach past her enormous ass in the back, and in the front it stopped pretending to cover anything long ago. Her shaft stands fully exposed, visibly throbbing. Pre-cum drips freely down her thigh.\n\n{mira}"Boss." She gestures at herself helplessly. {mira}"He won't go down. I've been like this for hours. This skirt doesn't hide ANYTHING and I've been leaking on every delivery ..."\n\nShe shifts and the skirt rides higher. She's given up trying to fix it.\n\n{mira}"I need help. Please. I'm dying."`;
                } else if (miraGS >= 3) {
                    part1 = `Mira comes through the door holding her courier bag strategically in front of her hips, face crimson. She drops the bag and there's no hiding it. Her cock stands at full attention, jutting out past the hem of her skirt. She gave up on pants weeks ago, nothing she owns can contain it, but the skirt isn't doing much better. Her shaft is fully exposed, visibly throbbing, pre-cum dripping freely down her thigh.\n\n{mira}"Boss." She gestures at herself helplessly. {mira}"He won't go down. I've been like this for hours. The skirt was supposed to help but there's nothing to hide behind ..."\n\nShe shifts and the skirt sways uselessly. The fabric barely reaches mid-thigh even without the obstruction.\n\n{mira}"I need help. Please. I'm dying."`;
                } else {
                    part1 = `Mira comes through the door holding her courier bag strategically in front of her hips, face crimson. She drops the bag and there's no hiding it. Her cock is straining against her pants, visibly throbbing, a wet spot already spreading through the fabric.\n\n{mira}"Boss." She gestures at herself helplessly. {mira}"He won't go down. I've been like this for hours. I tried cold water, I tried running, running made it WORSE because of the bouncing ..."\n\nShe shifts and winces as the fabric rubs against her.\n\n{mira}"I need help. Please. I'm dying."`;
                }
            }

            // Body context (appended to part1, secondary stats)
            if (miraM >= 4 && miraC >= 4) {
                part1 += `\n\nThe rest of her is no less distracting, massive chest straining against her crop top, muscular arms gripping the workbench hard enough to creak. Her whole body is wound tight.`;
            } else if (miraM >= 4) {
                part1 += `\n\nThe rest of her body makes the desperation more striking, muscular arms shaking, powerful frame reduced to squirming. All that strength and she can't do anything about THIS.`;
            } else if (miraC >= 4) {
                part1 += `\n\nHer massive chest heaves with each ragged breath, nipples visibly hard through her crop top. Between what's happening above and what's happening below, she's a wreck from every angle.`;
            }

            // Part 2: Getting close (branch on player genitaliaSize)
            let part2;
            if (playerGS >= 3) {
                if (miraHasVulva) {
                    part2 = playerBody.genitalia === 0
                        ? `You pull her close and she gasps, because you're in the same state. Both of you swollen, throbbing, oversensitive. The moment your bodies press together she whimpers.\n\n{mira}"You too?" Her hand slides down to cup you through your clothes and her eyes go wide. {mira}"Oh gods, you're as bad as I am. We're both wrecked."`
                        : `You pull her close and she doesn't have to look, your cock is already out past your skirt, massive and impossible to miss. She wraps her hand around it and her eyes go wide.\n\n{mira}"Oh." She strokes once, measuring. {mira}"Oh, that's... that's going to be a lot." She looks up at you, equal parts nervous and hungry. {mira}"Be careful with me. Or don't. I honestly can't decide."`;
                } else {
                    part2 = playerBody.genitalia === 1
                        ? `You step close and both of you are already on display, both hard, both massive, both leaking, skirts doing nothing to hide anything.\n\n{mira}"Well." She wraps a hand around you, then looks at herself, then back at you. {mira}"This is either going to be amazing or we're going to break something. Probably the workbench."`
                        : `You pull her close and guide her hand between your legs. She feels how swollen you are and inhales sharply.\n\n{mira}"Matching energy, huh?" She strokes you through the fabric and you shudder. {mira}"Good. I hate being the only desperate one."`;
                }
            } else {
                part2 = `You pull her close and start undressing her, peeling fabric away from oversensitive skin. Every touch makes her twitch.\n\n{mira}"Careful, I'm so sensitive right now that ..." You brush against her and she gasps, grabbing your wrist. {mira}"That. That right there. More of that."`;
            }

            if (playerM === 0) {
                part2 += ` Your slight frame lets her wrap around you completely, pulling you tight, desperate for contact.`;
            }
            if (miraM >= 5) {
                part2 += ` Her muscular arms tremble, all that strength reduced to shaking need.`;
            }
            if (miraC >= 5) {
                part2 += ` Her massive chest presses between you, nipples already hard through the thin fabric. She's too focused on what's happening below to care about what's happening above, but you notice.`;
            } else if (miraC >= 3) {
                part2 += ` Her ${getBodyStatDesc('mira', 'chest')} presses against you, adding heat to heat.`;
            }
            if (playerC >= 4) {
                part2 += ` Your chest cushions against her and she glances down. {mira}"Oh, nice." She'd appreciate it more if she wasn't losing her mind. Her hand cups you briefly before returning to more urgent territory.`;
            }
            if (playerB >= 4 && playerB < 5) {
                part2 += ` Her hand slides down to grab your ass, squeezing reflexively. {mira}"Sorry, needed something to hold onto."`;
            }
            if (miraInSkirt && miraHasVulva) {
                part2 += ` Her skirt is soaked through at the hem, wetness has been running down her thighs all day, and the thin fabric gave up absorbing it hours ago.`;
            }
            if (playerInSkirt && playerB >= 5) {
                part2 += ` Your own skirt has ridden up over your hips, bare and useless. Neither of you is wearing enough clothing to matter.`;
            } else if (playerInSkirt) {
                part2 += ` Your own skirt hangs uselessly, your cock juts past the hem, fully exposed. Neither of you is wearing enough to matter.`;
            }

            // Part 3: Genital reveal/foreplay (always present)
            let part3;
            if (miraHasVulva) {
                const miraStripLine = miraInSkirt
                    ? `She hikes her skirt up, it barely takes any effort, the thing was covering nothing anyway ...`
                    : `She strips her pants off`;
                part3 = `${miraStripLine} and you can see why she's been going crazy. Her pussy is swollen beyond reason, puffy lips flushed dark pink, visibly throbbing. She's drenched, wetness coats her inner thighs, glistening all the way to her knees. It hasn't stopped. It won't stop. The slightest touch makes her jolt. Her clit is engorged, peeking out from its hood, impossibly sensitive.\n\n{mira}"Don't stare, touch." She grabs your hand and presses it against her. The heat is extraordinary. Your fingers come away dripping before you've even done anything. She moans at the contact, hips bucking forward involuntarily. {mira}"Oh gods, even your hand feels like, I'm not going to last if you keep ..."\n\nYou haven't even started yet. You stroke her swollen lips apart and she nearly collapses, catching herself on the workbench. Fresh wetness runs down your wrist.`;
            } else {
                if (miraInSkirt) {
                    part3 = `Her cock is already out, has been the whole time, the skirt too small to even pretend. It stands rigid against her stomach, thick, veined, flushed dark. A steady line of pre-cum trails down the shaft.\n\n{mira}"Even the AIR feels good right now." She wraps a hand around herself and shudders. {mira}"I've been leaking all day. Every delivery. Every customer could see."\n\nYou wrap your hand around her and she groans so loud the walls shake. She's hot, impossibly hard, pulsing against your palm. Pre-cum drips steadily over your fingers. {mira}"Your hand, oh gods, your hand is so much better than mine ..."`;
                } else {
                    part3 = `She strips her pants off and her cock springs free, thick, veined, standing rigid against her stomach. It's huge, flushed dark, a bead of pre-cum already rolling down the shaft. It twitches at the open air and she hisses.\n\n{mira}"Even the AIR feels good right now." She wraps a hand around herself and shudders. {mira}"I've been leaking all day. My underwear is ruined. Two pairs."\n\nYou wrap your hand around her and she groans so loud the walls shake. She's hot, impossibly hard, pulsing against your palm. Pre-cum drips steadily over your fingers. {mira}"Your hand, oh gods, your hand is so much better than mine ..."`;
                }
            }

            const opening = part1 + '\n\n' + part2 + '\n\n' + part3;

            // PV: player penis + Mira vulva
            let pvText;
            if (miraM >= 5 && playerM === 0) {
                pvText = `She picks you up with shaking arms, still strong enough to lift you effortlessly, and lowers herself onto you. Her swollen pussy resists at first, then spreads around you with a wet gasp. She holds you against her chest, bouncing you, her oversensitive walls clenching with every thrust. {mira}"I can feel EVERYTHING, every ridge, every vein ..."`;
                pvText += `\n\nHer rhythm is erratic, every stroke sends shockwaves through her swollen flesh and she can barely maintain it. She presses you harder against her, your face against her chest, while her hips stutter and grind. Each time you push deeper her puffy lips spread wider and she whimpers. {mira}"More, I've needed this all day, I can't stop clenching ..." Her swollen walls grip you involuntarily, squeezing in pulses.`;
                pvText += `\n\nShe comes fast, too sensitive to hold out, slamming you against her body as her oversensitive pussy convulses around you. The clenching is intense, her swollen lips pulsing around your shaft, and it drags you over immediately. She holds you there, both of you shaking, her puffy lips still twitching around you. {mira}"Oh gods." She's trembling. {mira}"I needed that so badly that I can't see straight." She doesn't put you down. She doesn't want to let go.`;
            } else if (miraM >= 5) {
                pvText = `She slams you down on the workbench and impales herself, her swollen pussy stretching around you as she drops. The sensitivity makes her scream, actual, full-throated, and she doesn't stop riding. Her powerful thighs flex as she bounces, every inch of her oversized pussy clenching at once. {mira}"Don't stop, don't you dare stop ..."`;
                pvText += `\n\nShe rides you with desperate power, her swollen lips gripping your shaft on every upstroke, puffy flesh dragging along your length. She's dripping, oversensitive, every thrust making her gasp or moan or swear. Her thighs clamp and her swollen clit grinds against you. {mira}"I've been throbbing since MORNING, every step rubbed against, oh FUCK ..." She slams down hard and grinds.`;
                pvText += `\n\nShe comes screaming, her swollen pussy clenching in hard, rhythmic spasms, her powerful body pinning you flat. The pressure of her oversensitive walls milks you and you come inside her, both of you shaking on the creaking workbench. She collapses on you, her swollen lips still twitching around your cock. {mira}"Finally." Her voice cracks. {mira}"That's been building all day and it STILL wasn't enough." She grinds weakly. {mira}"Again. Give me ten seconds."`;
            } else if (playerM >= 5) {
                pvText = `You pin her down and slide in slowly, watching her massive pussy spread around you. She's so swollen that every millimeter of contact is magnified. She grabs fistfuls of whatever she can reach, your arms, the workbench, her own hair, writhing. {mira}"More, I need more, all of it ..."`;
                pvText += `\n\nYou thrust deeper and her back arches off the bench, her swollen lips stretching around you, puffy flesh hot and slick. Every stroke makes her louder. She's beyond speech now, just sounds, gasps, broken syllables. Her swollen clit bumps against you with each thrust and she jerks like she's been shocked. You grip her hips and set a hard, deep pace and she comes undone.`;
                pvText += `\n\nShe comes in a full-body convulsion, her swollen pussy clamping down, her legs locking around you, every oversensitive inch of her clenching at once. She screams your name and something incoherent and grips the workbench hard enough to crack wood. You come inside her, her pulsing walls pulling everything from you. She lies there afterward, legs still locked around you, twitching. {mira}"Don't pull out." Her voice is wrecked. {mira}"If you pull out I'll die. I mean it. I'll actually die."`;
            } else {
                pvText = `She sits on the edge of the workbench, legs spread, and pulls you in. The moment you enter her swollen pussy she arches off the wood, mouth open in a silent scream. She's unbelievably sensitive, every thrust sends shockwaves through her, her puffy lips gripping you, clit grinding against you with each stroke. {mira}"Right there, don't move, no, MOVE, I can't ..."`;
                pvText += `\n\nYou find a rhythm and she falls apart around it, her swollen walls gripping you on every stroke, her puffy lips dragging along your shaft, every sensation amplified. She grabs your shoulders and pulls you closer, wrapping her legs around you. {mira}"Deeper, I need to feel all of you ..." Her oversensitive body is betraying her, clenching and pulsing around you in waves that aren't orgasms yet but are close.`;
                pvText += `\n\nShe comes with her legs locked around you, her swollen pussy clenching in desperate, rhythmic pulses that pull you so deep it's almost painful. You come inside her a moment later, her hypersensitive flesh milking every last drop. She holds you there, legs trembling, her swollen lips still twitching. {mira}"I felt every single drop of that." She's shaking. {mira}"That's how sensitive she is right now. I felt EVERYTHING." She doesn't let go for a long time.`;
            }
            if (playerGS >= 3) {
                pvText += `\n\nYour thick cock stretched her swollen pussy to its absolute limit, oversensitive flesh gripping every inch. She winces when you finally separate. {mira}"Big cock plus swollen pussy equals..." She gestures vaguely at her whole trembling body. {mira}"This."`;
            } else if (playerGS === 0) {
                pvText += `\n\nSize didn't matter. Inside her hypersensitive pussy, every touch was magnified tenfold. She felt you like you were twice as big. {mira}"Don't ever let anyone tell you size matters." She shudders. {mira}"My pussy just made you feel like a god."`;
            }

            // VV: both vulva
            let vvText;
            if (miraM >= 5 && playerM === 0) {
                vvText = `She pulls you into her lap and grinds against you, her swollen vulva pressing against yours. Her muscular arms hold you tight as thick, oversensitive lips slide against each other. She's shaking, every point of contact sends a jolt through her. Her fingers find you too, pushing inside while she grinds.`;
                vvText += `\n\nHer swollen lips slide against your body, leaving a slick trail, every inch of her screaming. She's too sensitive to go slow, she grinds faster, harder, her puffy vulva hot against your skin. Her fingers inside you match the frantic rhythm. {mira}"I can feel my pulse between my legs, can you feel it?" You can. Her swollen flesh throbs against you, heavy and hot.`;
                vvText += `\n\nShe comes grinding against you, her swollen vulva pulsing, her whole body shaking, her arms crushing you against her. Her fingers curl deep inside you as she loses control and the intensity drags you over too. Both of you tremble in the aftermath, her oversensitive lips still twitching against your skin. {mira}"I've been on edge all day." She buries her face in your hair. {mira}"You just ended eight hours of torture."`;
            } else if (miraM >= 5) {
                vvText = `She pins you and grinds, her swollen pussy pressing against your thigh, leaving a wet trail. Her thick fingers push inside you while her other hand guides your hand to her, not inside, just pressing against her puffy outer lips. That alone makes her gasp. {mira}"Just pressure, I'm so swollen that pressure is enough ..."`;
                vvText += `\n\nShe grinds harder, her swollen lips hot and slick against your palm. Even light pressure makes her shake, her oversensitive flesh magnifies everything. She fingers you harder, desperate, her rhythm matching her grinding. You press your palm flat against her puffy vulva and she moans so loud it echoes. {mira}"Harder, just PRESS, I'm so close just from the pressure ..."`;
                vvText += `\n\nYou press hard and she comes, her swollen pussy pulsing against your palm, her whole muscular body convulsing, her fingers driving deep into you as she loses control. The force of her fingers tips you over and you come around her hand, both of you shaking. She rolls off, panting. {mira}"You barely touched me." She sounds amazed. {mira}"I was so swollen that your PALM was enough. That's... I need to process that."`;
            } else if (playerM >= 5) {
                vvText = `You push her onto her back and spread her legs, exposing the full extent of her swollen pussy. You lower yourself onto her, tribbing, your body against her puffed lips. She writhes beneath you, oversensitive, every grind making her louder. Your fingers join, slipping between swollen folds. {mira}"Everything, everything feels like, I can't ..."`;
                vvText += `\n\nYou work her swollen flesh with firm strokes, fingers spreading her puffy lips, thumb grinding her engorged clit. She bucks and writhes beneath you, too sensitive to hold still. Every touch is electric. She's grabbing the workbench, grabbing your arms, grabbing herself. {mira}"It's too much and not enough, I need MORE but everything already feels like ..." She gives up on words and just moans.`;
                vvText += `\n\nYou press two fingers inside her and curl them against her swollen walls and she detonates, arching off the workbench, screaming, her oversensitive pussy clenching around your fingers in violent pulses. You keep going, wringing every aftershock from her throbbing flesh, until she grabs your wrist and begs you to stop. {mira}"Mercy." Tears in her eyes, but she's grinning. {mira}"That was the best orgasm of my life and I can't feel my legs."`;
            } else {
                vvText = `Foreheads pressed together, you explore each other. Your fingers trace her swollen lips and she shakes, puffy, wet, burning hot. She returns the favor with trembling hands. You find a rhythm, fingers inside each other, palms grinding against swollen clits, building together.`;
                vvText += `\n\nThe pace quickens, both of you trembling, fingers slick, her swollen lips parting around your touch. She gasps every time you graze her engorged clit, her hips jerking involuntarily. {mira}"I'm already so close, I've been close since I walked in ..." Her fingers inside you speed up, desperate, matching her own mounting urgency. Her swollen pussy clenches around your fingers in pre-orgasmic flutters.`;
                vvText += `\n\nShe comes first, barely, her swollen pussy clamping around your fingers, her puffy lips pulsing, her whole body shaking. The feeling of her twitching against your hand and her fingers tightening inside you pulls you over seconds later. Both of you collapse together, fingers still inside each other, her oversensitive flesh still twitching. {mira}"I've been dying for that." She presses her forehead against yours. {mira}"All. Damn. Day."`;
            }
            if (playerGS >= 3) {
                vvText += `\n\nBoth of you are swollen and oversensitive, thick, puffy lips throbbing in the aftermath. Every accidental brush sends aftershocks through both of you. {mira}"We match." She presses against you experimentally and you both gasp. {mira}"We should do this when we're BOTH this swollen. Every time."`;
            }

            // VP: player vulva + Mira penis
            let vpText;
            if (miraM >= 5 && playerM === 0) {
                vpText = `She lifts you with trembling arms and lowers you onto her throbbing cock. She's so hard it hurts her, the relief of being inside you makes her groan from her chest. Her arms shake as she bounces you, every thrust sending a spasm through her oversensitive shaft. {mira}"You feel, gods, you feel so much better than my hand ..."`;
                vpText += `\n\nHer oversensitive cock throbs inside you with every heartbeat, each pulse visible in her expression. She bounces you with shaking arms, each thrust making her gasp. Her shaft is so swollen that every inch of contact is magnified, she can feel your walls, your heat, your pulse. {mira}"I've been hard since dawn, my cock has been screaming at me, and you feel like ..." She can't finish. She thrusts harder.`;
                vpText += `\n\nShe comes embarrassingly fast, slamming you down onto her, cock pulsing deep, her oversensitive shaft erupting inside you with hours of pent-up need. The force and heat tip you over and you come clenching around her, her hypersensitive cock twitching against your walls. She holds you there, still inside, still leaking. {mira}"That lasted about thirty seconds." She's mortified. {mira}"I've been hard ALL DAY. You can't judge me." You kiss her. She comes again from the clenching.`;
            } else if (miraM >= 5) {
                vpText = `She pins you against the wall and enters you standing, her massive cock pulsing inside you. She can barely control herself, the oversensitivity makes every thrust a lightning bolt. Her muscular hips stutter, rhythm breaking. {mira}"I can feel your heartbeat, around me, I'm going to ..." She grits her teeth and holds on.`;
                vpText += `\n\nShe fights to last, her oversensitive cock throbbing with every heartbeat, her muscular body trembling with the effort of not finishing immediately. Each thrust makes her groan, her swollen shaft feels everything magnified, every ripple of your walls like an electric shock. {mira}"How are you this tight, or am I this sensitive, I can't tell anymore ..." Her hips stutter, driving deep.`;
                vpText += `\n\nShe loses the fight, comes with a roar, slamming deep, her oversensitive cock pulsing in hard, desperate spurts. Her powerful body pins you against the wall as she shakes through it, every inch of her swollen shaft firing at once. You come around her, clenching, and the squeeze makes her cry out again. She stays inside you, trembling. {mira}"I lasted longer than I thought I would." She didn't. {mira}"DON'T clench. If you clench I'll come again and I don't think I can survive it." You clench. She comes again.`;
            } else if (playerM >= 5) {
                vpText = `You push her down and straddle her, sinking onto her throbbing cock. She's so swollen and hard that the pressure of you around her makes her eyes roll back. You ride her while she clutches the workbench, trying desperately not to finish in seconds. {mira}"Slow down, I can't... oh gods ..."`;
                vpText += `\n\nYou don't slow down. You ride her hard, her oversensitive cock throbbing inside you, and she's helpless, too swollen, too sensitive, every movement pushing her closer. She grabs your hips, trying to slow you, but you're stronger. Her cock twitches desperately. {mira}"You're going to make me, I'm trying not to, please ..." She's begging but her hips are thrusting upward involuntarily.`;
                vpText += `\n\nShe comes with a scream, her oversensitive cock erupting, hips bucking wildly beneath you. You ride her through it and the overstimulation keeps her coming, wave after wave, her swollen shaft pulsing, unable to stop. You come around her and the clenching triggers another spasm. She's crying and laughing simultaneously. {mira}"I came four times." She stares at the ceiling. {mira}"Maybe five. My cock won't stop. It just keeps GOING."`;
            } else {
                vpText = playerGS === 0
                    ? `She pushes against your tight entrance and has to work for it, you resist every inch, your body gripping her oversensitive cock like a fist. She gasps, shaking, forcing herself deeper in tiny increments. {mira}"You're so tight, I can feel EVERYTHING, every bit of you squeezing ..." She's barely halfway in and already losing control. By the time she bottoms out she's trembling, buried to the hilt in your vice grip, cock throbbing against walls that won't give her a millimeter of slack.`
                    : `She eases into you slowly, hissing at every inch. She's so sensitive that entering you is almost too much stimulation. Her cock throbs inside you, pulsing visibly. She starts moving in short, desperate strokes, overwhelmed. {mira}"I'm not going to last. I'm sorry, I'm not going to... you just feel too good ..."`;
                vpText += `\n\nShe tries to pace herself, but her oversensitive cock betrays her, throbbing, leaking, every stroke pushing her closer. She bites her lip until it's white, forehead against yours, hips moving in tight, desperate circles. {mira}"Every inch of my cock can feel every inch of you, it's like my whole body is ..." She gasps, thrusts deeper, loses her thought entirely.`;
                vpText += `\n\nShe comes too fast and too hard, buried inside you, cock pulsing in violent spasms, a choked cry in your ear. You hold her through it, clenching around her, and the squeeze extends her orgasm until she's shaking. She stays inside you, oversensitive and twitching. {mira}"That was the fastest I've ever come in my life." She hides her face in your neck. {mira}"And the hardest. I saw colors. Actual colors. Is that normal?"`;
            }
            if (playerGS === 0) {
                vpText += `\n\nYou're tight around her massive, swollen cock. The pressure made her oversensitivity even more intense. She pulls out carefully, wincing at each inch. {mira}"Tight plus sensitive equals... I think I blacked out for a second there."`;
            } else if (playerGS >= 3) {
                vpText += `\n\nYour swollen pussy gripped her throbbing cock perfectly, both of you oversensitive, every sensation magnified. {mira}"We were both so swollen that it felt like..." She gestures vaguely. {mira}"Like being struck by lightning. In a good way. If lightning was sexy."`;
            }

            // PP: both penis
            let ppText;
            if (miraM >= 5) {
                ppText = `She grabs both cocks in one massive hand, pressing them together. The contact of sensitive shaft against sensitive shaft makes her whole body jolt. She strokes with shaking muscles, her grip firm but her rhythm ragged, overwhelmed by the heat and friction. {mira}"Both of us, throbbing, I can feel yours pulsing against mine ..."`;
                ppText += `\n\nShe strokes faster, both oversensitive cocks leaking between her fingers, the slickness making every stroke electric. She can feel your heartbeat through your shaft, pulsing against hers, and the double stimulation makes her rhythm stutter. {mira}"Every vein, I can feel every vein on yours against every vein on mine ..." Her hand tightens and her cock jumps.`;
                ppText += `\n\nShe comes first, her oversensitive cock erupting in her own grip, cum coating both shafts. The pulsing of her cock against yours, each throb a shockwave through hypersensitive flesh, triggers your orgasm. You come together, both cocks twitching in her shaking hand, cum mixing. She stares at the mess, her cock still twitching. {mira}"I'm still hard." She sounds almost afraid. {mira}"I'm still SO hard. Oh gods, is it going to be like this all night?"`;
            } else if (playerM >= 5) {
                ppText = `You take both cocks in your grip, hers is hot, swollen, leaking constantly. She whimpers the moment you touch her, her oversensitive shaft jumping in your hand. You stroke together, firmly, while she grips your arm and holds on for dear life. {mira}"Your hand, harder, no, slower, I don't know, everything feels like too much ..."`;
                ppText += `\n\nYou find a firm, steady rhythm and she melts against you, her oversensitive cock throbbing in your grip, pre-cum dripping, every stroke pulling sounds from her she's never made before. Her cock jumps every time you thumb over the head. {mira}"I can feel your calluses, I can feel the LINES on your PALM, that's how sensitive I am right now ..."`;
                ppText += `\n\nShe comes in your hand with a strangled cry, her oversensitive cock pulsing in violent spurts, cum running over your fingers. The sight and the throb of her shaft against yours pushes you over, you come together, both cocks pulsing in your fist, her knees buckling. You hold her up. {mira}"My legs stopped working." She looks at her still-twitching cock. {mira}"He's still going. I think you broke him."`;
            } else {
                ppText = `You press your cocks together, both of you wrapping hands around the pair. She's throbbing so hard you can feel her pulse against your shaft. Pre-cum from both of you makes the stroking slick and frantic. She buries her face in your neck, moaning with each stroke. {mira}"I'm so close already, I've been close ALL DAY ..."`;
                ppText += `\n\nThe stroking turns frantic, both oversensitive cocks leaking, the slickness building, the friction devastating. She can barely stand, pressing against you, her throbbing shaft hot against yours. {mira}"If you squeeze any harder I'm going to, I've been holding this in since, oh gods ..." Her hips start jerking, fucking into your combined grip.`;
                ppText += `\n\nShe comes first, was never going to be able to hold it. Her oversensitive cock erupting between your hands, pulsing against your shaft. The throb triggers your own orgasm and you come together, cum mixing between your grips, both cocks twitching helplessly. She sags against you. {mira}"That was..." She exhales. {mira}"All day. I held that in ALL DAY. For hours. And it took you about two minutes." She doesn't sound mad. {mira}"Best two minutes of my life."`;
            }
            if (playerGS >= 3 && miraGS >= 3) {
                ppText += `\n\nTwo massive, oversensitive cocks, the amount of throbbing, sensitive flesh in contact was almost unbearable. Both still twitching in the aftermath. {mira}"We are BOTH too big and too sensitive for this." She looks down. {mira}"Let's do it again."`;
            } else if (playerGS === 0) {
                ppText += `\n\nHer massive cock dwarfed yours, but the sensitivity equalized everything. She was shaking from contact alone. {mira}"Size is meaningless when you're this sensitive." She stares at her still-hard cock. {mira}"He disagrees. He wants more. I'm going to have to negotiate with him."`;
            }

            const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };
            this.text = opening + '\n\n' + partnerBeat + '\n\n' + oralPhase + '\n\n' + getSexSceneText('mira', branches);

        } else {
            // === GENERIC SEX SCENE ===
            const miraM = miraBody.muscle;
            const miraC = miraBody.chest;
            const miraB = miraBody.butt;
            const miraGS = miraBody.genitaliaSize;
            const miraHasVulva = miraBody.genitalia === 0;
            const playerC = playerBody.chest;
            const playerM = playerBody.muscle;
            const playerB = playerBody.butt;
            const playerGS = playerBody.genitaliaSize;
            const playerInSkirt = playerB >= 5 || (playerBody.genitalia === 1 && playerGS >= 3);
            const npcChest = getBodyStatDesc('mira', 'chest');
            const npcButt = getBodyStatDesc('mira', 'butt');

            // Part 1: Mira's body description (branch on muscle → chest)
            let part1;
            if (miraM <= 1) {
                if (miraC <= 1) {
                    part1 = `Mira pulls off her courier vest and does a little spin, tiny. Slim shoulders, narrow waist, her ${npcChest} barely visible under her thin undershirt. She's all angles and freckles, a wisp of a girl with green eyes that take up half her face. She looks delighted with herself.\n\n{mira}"Look at me!" She bounces on her heels. {mira}"Aerodynamic. Nothing in the way. I can fit ANYWHERE." She grabs your hands and puts them on her waist, your fingers nearly meet behind her back. {mira}"And everything's sensitive because there's zero padding. Your hands are basically ON me."`;
                } else {
                    part1 = `Mira pulls off her courier vest and the contrast hits you, tiny frame, slim arms, narrow waist, and then her ${npcChest} straining against her undershirt, completely out of proportion with the rest of her. She notices you staring and grabs the hem, pulling the fabric tight to make it worse.\n\n{mira}"Right?!" She bounces and everything moves. {mira}"Tiny girl, big chest. Best of both worlds. I'm nimble AND I've got these." She cups herself, grinning. {mira}"Nothing else gets in the way."`;
                }
            } else if (miraM <= 3) {
                part1 = `Mira pulls off her courier vest and stretches, lean muscle flexing along her arms. Years of deliveries have carved her into something efficient, toned shoulders, defined forearms, her ${npcChest} filling out her undershirt. She moves with the restless energy of someone who runs for a living.\n\n{mira}"Like what you see?" She does a little spin. {mira}"Miles of running, packages up and down stairs. Better workout than any gym."`;
            } else {
                part1 = `Mira pulls off her courier vest and her muscular arms flex as she rolls her shoulders. She's built solid, thick shoulders, strong core, visible definition everywhere. Her ${npcChest} sits on a foundation of real muscle. She cracks her knuckles.\n\n{mira}"I benched the workbench yesterday." She flexes one arm. {mira}"The actual workbench. Just to see if I could." She grins. {mira}"I could."`;
            }
            if (miraB >= 3) {
                part1 += ` Her ${npcButt} fills out her pants nicely, noticeable even under the courier uniform.`;
            }

            // Part 2: Getting close (branch on player muscle)
            let part2;
            if (playerM >= 5 && miraM <= 1) {
                part2 = `You close the distance and she has to crane her neck to look at you. Your massive frame dwarfs her entirely. When you put your hands on her waist, your fingers almost meet behind her back. She grins up at you, delighted by the size difference.\n\n{mira}"Oh WOW." Her eyes light up. {mira}"You're ENORMOUS. This is going to be amazing." She bounces on her toes, barely reaching your chest. {mira}"Throw me around. I weigh nothing. I'm like a fun-sized courier and you're a whole wall. Use it."`;
            } else if (playerM >= 5) {
                part2 = `You close the distance and she looks up, even with her build, you're massive compared to her. You grip her shoulder and feel her frame give under your strength. She inhales sharply, eyes brightening.\n\n{mira}"Okay." She grins. {mira}"You're in charge. Show me what all that muscle is for."`;
            } else if (playerM <= 1 && miraM <= 1) {
                if (playerC >= 4 && playerB >= 4) {
                    part2 = `You step close and she pulls you in, both of you small, both light. Her slim body presses flush against yours and immediately runs into your chest. She looks down at the collision, then her hands slide to your ass, and she freezes.\n\n{mira}"Oh my GODS." She steps back and stares, mouth open. {mira}"You're tiny like me but you've got THESE ..." She grabs your chest with both hands, squeezing, then slides down to your ass and grabs a double handful. {mira}"... and THIS. You're fun-sized with all the extras." She can't settle, bouncing between chest and ass, squeezing, pressing herself against you to feel everything at once.`;
                } else if (playerC >= 4) {
                    part2 = `You step close and she pulls you in, both of you small, both light, fitting together until your chest gets in the way. She looks down at the collision and her eyes go wide.\n\n{mira}"Oh my GODS." She grabs your chest, squeezing. {mira}"You're tiny like me but you've got THESE. How do you even stay upright?" She buries her face between them, nuzzling, then comes up grinning. {mira}"We're both small and you've got the best chest I've ever touched. This is the best day."`;
                } else if (playerB >= 4) {
                    part2 = `You step close and she pulls you in, both of you small, both light, fitting together like puzzle pieces. Her hands slide down your back and find your ass, and she stops dead.\n\n{mira}"Oh my GODS." She grabs with both hands, eyes wide. {mira}"You're tiny like me but your ASS, how is this attached to you?" She squeezes, pulls you tighter by the grip on your rear, can't let go. {mira}"We're both small and you've got more ass than the rest of you. I'm never letting go of this."`;
                } else {
                    part2 = `You step close and she pulls you in, both of you small, both light, fitting together like puzzle pieces. Her slim body presses flush against yours, every point of contact vivid and warm. Zero gap between you.\n\nShe pulls back, looks you up and down, and her face splits into a grin so wide it takes over. {mira}"Oh my GODS." She grabs your hips, squeezing. {mira}"You're tiny too! We MATCH!" She's vibrating. {mira}"This is... look at us, we're adorable. I'm having cute overload. I might actually die."`;
                }
            } else if (playerM <= 1) {
                part2 = `You step close and she pulls you against her. Her body has enough on you to make the contact feel enveloping, arms wrapping around you easily, pulling you tight, your lighter frame folding against her warmth.\n\n{mira}"Come here." She squeezes. {mira}"You fit perfectly against me."`;
            } else {
                part2 = `You pull her close and she melts against you, her body warm and willing. Her hands find your chest, fingers exploring through fabric. She presses her face into your shoulder and inhales.\n\n{mira}"You smell like brass and leather." She pulls back, grinning. {mira}"Workshop smell. My favorite."`;
            }
            const bothPetite = playerM <= 1 && miraM <= 1;
            if (playerC >= 4 && !bothPetite) {
                part2 += ` Her eyes drop to your chest. {mira}"Oh, that's nice." She presses against you, appreciating the cushion.`;
            }
            if (playerB >= 4 && !playerInSkirt && !bothPetite) {
                part2 += ` Her hand drops to grab your ass. {mira}"Gods, that's quality rear."`;
            } else if (playerB <= 1 && miraM <= 1) {
                part2 += ` Her hand drops to your ass and grabs a tiny handful. {mira}"Oh my gods, it's so SMALL." She squeezes with both hands, grinning like it's a gift. {mira}"I got the whole thing! In one hand! This is the best day."`;
            }
            if (playerInSkirt && playerB >= 5) {
                part2 += ` Your skirt has ridden up over your hips, bare and useless, your massive ass on full display. She stares. {mira}"That's a whole situation back there."`;
            } else if (playerInSkirt) {
                part2 += ` Your skirt isn't hiding anything, your cock hangs past the hem, fully exposed. She glances down. {mira}"Well. That's just out."`;
            }

            // Part 3: Foreplay (branch on Mira's build)
            let part3;
            if (miraM <= 1) {
                part3 = `She peels off her undershirt and throws it across the room, bare, slim, freckled, and completely unashamed. She grabs your hands and plants them on her waist. Your hands span her entire torso, thumbs nearly meeting at her sternum.\n\n{mira}"Full access!" She's beaming. {mira}"No obstacles. Nothing in the way. You can reach everything from everywhere." She guides your hands down her sides, over her narrow waist, across her hips. {mira}"I'm like a sports car, compact, nimble, and VERY responsive." She arches into your touch, gasping. {mira}"See? Touch me ANYWHERE and I feel it instantly."`;
            } else if (miraM <= 3) {
                part3 = `She strips her undershirt off and stretches, lean muscles shifting under freckled skin. She's toned, not bulky, but defined, the kind of body built by years of hauling packages up stairs. She bounces on her heels, restless even now.\n\n{mira}"Can't stay still." She pulls you against her, hips already rolling. {mira}"Courier habit. Come keep up."`;
            } else {
                part3 = `She strips and flexes, not a full pose, but enough to show off what she's built. Thick arms, visible abs, strong thighs. She grabs your hand and places it on her bicep.\n\n{mira}"Feel that?" She flexes under your palm, then guides your hand lower, across her abs, over her hip. {mira}"All functional muscle. Every inch earned."`;
            }

            const opening = part1 + '\n\n' + part2 + '\n\n' + part3;

            // PV: player penis + Mira vulva
            let pvText;
            if (playerM >= 5 && miraM <= 1) {
                pvText = `You lift her with one arm, she weighs nothing, and pin her against the wall. She wraps her legs around your waist, her tiny body suspended, and you push into her pussy. She laughs breathlessly, locking her ankles behind you.\n\n{mira}"YES, I love this, I can't even touch the ground and I don't CARE ..." She wraps herself tighter around you, actively grinding against each thrust, using your body like a climbing frame. She comes howling, legs clenched around your waist, and you finish buried in her pussy while she clings to you, grinning even while shaking. {mira}"Being tiny is the BEST." She's radiant. {mira}"You just threw me around like a ragdoll and I came so hard I saw stars. Do it again."`;
            } else if (miraM >= 4 && playerM <= 1) {
                pvText = `She pushes you back onto the workbench and climbs on top. Her strong hands pin your wrists as she lowers herself onto your cock, controlling depth, angle, speed. {mira}"Let me drive." She rolls her hips, powerful thighs flexing.\n\nShe builds her own rhythm, using you, her core doing all the work. When she comes she squeezes your wrists hard enough to ache, her whole body clenching around you, and the pressure pulls you over with her. {mira}"Needed that." She releases your wrists. {mira}"Sorry, strong grip."`;
            } else {
                pvText = `She hops onto the workbench, wrapping her legs around you as you press against her entrance. {mira}"Don't make me wait," she breathes, and you push into her pussy. She gasps, pulling you closer with her heels, her whole body arching.\n\nYou find a rhythm together, her hips meeting yours, hands gripping your shoulders, small sounds escaping with each thrust. She buries her face in your neck, breathing hard, her body rocking with the motion. When she comes she clenches around you with a sharp cry, and the squeeze pulls you over after her. She holds you inside, trembling. {mira}"Perfect." She kisses your jaw. {mira}"Exactly what I needed."`;
            }
            // PV size overlay
            if (playerGS >= 2 && miraGS === 0) {
                if (miraM <= 1) {
                    pvText += `\n\nHer tiny body fought your cock the whole way in, tight, resisting, barely stretching around you. She had to breathe through every inch, jaw clenched, gripping your arms until she adjusted. She's still grinning. {mira}"That was a LOT for someone my size." She shifts carefully. {mira}"Took the whole thing though. I'm incredible."`;
                } else {
                    pvText += `\n\nYour cock stretched her tight pussy, every inch a snug fit that she felt to the hilt. She shifts carefully, wincing and grinning. {mira}"You're big and I'm small and I felt every single inch of that."`;
                }
            } else if (playerGS === 0 && miraGS >= 2) {
                pvText += `\n\nShe was slick and swollen around you, her pussy gripping your modest cock in plush, wet heat, thick lips clenching with every thrust. {mira}"You fit perfectly in me." She shivers. {mira}"Like you were made for it."`;
            } else if (playerGS === 0 && miraGS === 0) {
                pvText += `\n\nBoth small, both tight, she was a snug fit around you, every movement precise and vivid. {mira}"Compact and efficient." She grins. {mira}"Like everything else about us."`;
            }

            // VV: both vulva
            let vvText;
            if (playerM >= 5 && miraM <= 1) {
                vvText = `You lift her onto the workbench and push her thighs apart with your powerful hands. She opens eagerly, grinning up at you while you tower over her. Your fingers find her, already wet, and she arches into your touch with a delighted gasp.\n\n{mira}"I can't move and I don't WANT to ..." She squirms happily against your grip, her nimble fingers reaching down to work you from below even while pinned. She comes fast, her tiny body bucking in your hold, and you follow with her fingers driving you over. {mira}"I love being pinned!" She's flushed and beaming. {mira}"Being small is a FEATURE, not a bug."`;
            } else if (miraM >= 4 && playerM <= 1) {
                vvText = `She scoops you up and sets you on the workbench, stepping between your legs. Her strong fingers find you with precision, thick, capable digits that know exactly where to press. {mira}"Let me take care of you." Her other hand works herself without looking.\n\nShe brings you to the edge with relentless strokes while getting herself off one-handed. You come first, thighs clenching around her arm, and she follows with a groan. {mira}"Multitasking." She flexes the hand that was inside you. {mira}"Strong fingers."`;
            } else {
                vvText = `Her nimble fingers find you with practiced ease, courier's hands, dexterous and sure. She traces your folds, circling, watching your face to learn what works. You return the attention, fingers slipping between her thighs, finding her wet and warm.\n\nYou build a rhythm together, foreheads close, breath mixing, fingers mirroring each other. When she comes she buries her face in your shoulder, fingers stuttering against you, and the vibration of her moan pushes you over. {mira}"Synchronized." She pulls back, flushed. {mira}"We should do this more often."`;
            }
            // VV size overlay
            if (playerGS >= 2 && miraGS >= 2) {
                vvText += `\n\nBoth swollen, both sensitive, thick lips pulsing under every touch, heat amplified. {mira}"We're both so puffy." She shivers. {mira}"Everything's swollen and sensitive and it's INCREDIBLE."`;
            } else if (playerGS === 0 && miraGS === 0) {
                vvText += `\n\nBoth tight, both compact, her fingers found every sensitive spot in your small folds with precision. {mira}"Small target." She grins. {mira}"Good thing I have steady hands."`;
            }

            // VP: Mira penis + player vulva
            let vpText;
            if (playerM >= 5 && miraM <= 1) {
                vpText = `You push her down onto the workbench and straddle her. She grins up at you, cock rigid against her stomach, her tiny body dwarfed beneath your frame. You sink onto her and her eyes go wide with pleasure, hands grabbing your thighs to hang on for the ride.\n\n{mira}"Oh GODS, ride me, I can't even move under you and it's AMAZING ..." Her small hips thrust upward eagerly, her cock throbbing inside you, giving you everything she's got from beneath your weight. She comes fast, pulsing, laughing and gasping at the same time. {mira}"I am very small and you are very strong and that was the best ten seconds of my life." She's glowing. {mira}"No complaints. Zero. Negative complaints."`;
            } else if (miraM >= 4 && playerM <= 1) {
                vpText = `She lifts you with both arms and lowers you onto her cock, you're suspended, your weight nothing to her. She controls everything, strong arms adjusting your angle, hips thrusting upward into your pussy.\n\nShe comes buried deep in you, arms like iron, and the force pulls you over with her. She sets you down gently. {mira}"Strong arms. Good for packages." She flexes. {mira}"Better for carrying you."`;
            } else {
                vpText = `She guides her cock to your pussy and pushes inside slowly, watching your face. {mira}"Tell me if ..." She gasps as you pull her deeper with your heels. {mira}"Oh. Okay. You want it."\n\nShe moves in careful strokes at first, then faster as you find the rhythm. Her hands grip your hips, breath hot against your neck. She comes with a shudder, buried inside you, cock pulsing, and you follow moments later. She stays close, catching her breath. {mira}"That was exactly as good as I imagined." She pauses. {mira}"I imagined it a lot."`;
            }
            // VP size overlay
            if (miraGS >= 2 && playerGS === 0) {
                vpText += `\n\nHer cock stretched your tight pussy. She had to work for every inch, your walls resisting, gripping. {mira}"Tight. Gods, you're tight." She shivers. {mira}"I felt every bit of you squeezing me."`;
            } else if (miraGS === 0 && playerGS >= 2) {
                vpText += `\n\nHer modest cock slid into your swollen pussy easily, plush walls enveloping her completely in wet heat. {mira}"You're so warm and soft inside." She grins. {mira}"Like a hot, wet hug for my cock."`;
            } else if (miraGS === 0 && playerGS === 0) {
                vpText += `\n\nBoth small, she fit snugly inside your tight entrance, every inch deliberate and vivid. {mira}"Perfect fit." She grins. {mira}"Like a custom sheath."`;
            }

            // PP: both penis
            let ppText;
            if (playerM >= 5 && miraM <= 1) {
                ppText = `You wrap your powerful hand around both cocks and she gasps, grinning, her shaft disappears in your grip, pressed against yours. She grabs your forearm, feeling the muscle flex as you stroke, completely outmatched and loving every second.\n\nShe comes first, never had a chance, her cock pulsing against yours. You follow, triggered by the throb. She sags against you, buzzing with satisfaction. {mira}"Your hand is bigger than my entire ..." She gestures vaguely downward. {mira}"Everything. Your HAND. I'm obsessed with the size difference."`;
            } else if (miraM >= 4 && playerM <= 1) {
                ppText = `She wraps her strong hand around both cocks and pins you against the workbench. Her thick fingers encompass both shafts easily, her muscular arm providing a relentless rhythm. {mira}"Just stand there and look pretty."\n\nShe strokes you both to completion, you come first, shaking, and she follows with a grunt. {mira}"One-handed." She flexes. {mira}"Didn't break a sweat."`;
            } else {
                ppText = `She wraps her hand around both your cocks, pressing them together. {mira}"I've been wanting to try this," she admits, stroking firmly. The friction of shaft against shaft makes you both groan.\n\nShe builds a rhythm, one hand on both of you, the other braced against your chest. You come together, cocks pulsing against each other, and she watches with satisfaction. {mira}"Messy." She wipes her hand on your thigh. {mira}"Worth it."`;
            }
            // PP size overlay
            if (playerGS >= 2 && miraGS >= 2) {
                ppText += `\n\nTwo thick cocks barely fit in her hand, the friction was almost too much. {mira}"I need bigger hands for this job."`;
            } else if (playerGS === 0 && miraGS === 0) {
                ppText += `\n\nBoth modest, they fit neatly in her grip, compact and precise. {mira}"Cute." She squeezes. {mira}"Both of them."`;
            } else if (playerGS >= 2 && miraGS === 0) {
                ppText += `\n\nYour thick cock dwarfed hers in her grip, the size difference adding friction. {mira}"Yours is definitely the main attraction here."`;
            } else if (playerGS === 0 && miraGS >= 2) {
                ppText += `\n\nHer thick cock dwarfed yours, the size difference adding contrast. {mira}"Don't worry about it." She squeezes. {mira}"Friction doesn't care about size."`;
            }

            const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };
            this.text = opening + '\n\n' + partnerBeat + '\n\n' + oralPhase + '\n\n' + getSexSceneText('mira', branches);
        }

        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + 3, 100);
        saveState();
    },
    actions: [
        {
            label: 'Mira isn\'t finished',
            nextScene: 'mira_sex_transform',
        },
        {
            label: 'Continue...',
            nextScene: 'mira_sex_closing'
        }
    ]
};

SCENES['mira_sex_transform'] = {
    id: 'mira_sex_transform',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('mira', 'transform');
        markTransformationSeen('mira');

        const miraBody = gameState.npcs.mira.body;
        const miraM = miraBody.muscle;

        // === Tease: Mira manufactures an accident ===
        let tease = `Mira grins up at you from the tangle of sheets, flushed and breathless. Cum glistens on her freckled stomach, her thighs. Fresh, warm, barely a minute old. She doesn't care. Her eyes are bright. Too bright.`;

        tease += `\n\n{mira}"You're not getting rid of me that easily, Boss."`;

        tease += `\n\nShe rolls over, reaches for the workbench, and sweeps her arm across the surface. Not aiming. Not choosing. Just reaching. Her hand catches a dial, knocks a lever, brushes a crystal. Three devices hum to life simultaneously.`;

        tease += `\n\n{mira}"Oops."`;

        tease += `\n\nShe is not sorry. She's grinning.`;

        // === Transform: everything inflates BEYOND normal ===
        let transform = `The effect hits all at once.\n\nHer breasts surge forward, past huge, past massive, past anything the workshop devices have ever produced. They balloon outward, spilling heavy across the bed, so enormous she can't see past them. Her belly swells beneath, round and drum-tight, a smooth dome of taut skin pushing her breasts apart. Her ass and thighs swell in tandem, thickening, spreading, the mattress groaning under the weight.`;

        if (miraBody.genitalia === 1) {
            transform += `\n\nBetween her thighs, her cock surges, thickening past anything she's had, lengthening, veins darkening as it swells rigid against the curve of her belly. Her balls swell heavy beneath, tight with pressure.`;
        } else {
            transform += `\n\nBetween her thighs, her pussy swells, lips puffing outward, flushed and engorged, slick and glistening. Everything down there is bigger, hotter, hypersensitive.`;
        }

        if (miraBody.genitalia === 1) {
            transform += `\n\nCum still warm on skin stretched tight over curves that won't stop growing. Her thighs are forced apart, too much between them to close her legs. She's spread open, pinned flat by her own body. But her cock... her cock clears the wall of her own chest. So massive it juts past everything, rigid and throbbing against the dome of her belly.\n\n{mira}"Fuck." She stares at it. She can FEEL it and she can SEE it and the combination is devastating.`;
        } else {
            transform += `\n\nCum still warm on skin stretched tight over curves that won't stop growing. She can only feel it. Every swell. Every tightening inch. The pressure building everywhere at once.\n\nShe tries to close her legs and something is in the way. Something swollen, hot, pressed between her thighs. She squeezes and the pressure against her engorged pussy sends a jolt through her entire body.\n\n{mira}"Oh... oh FUCK, what is... is that ME down there?" She squeezes again, thighs pushing against puffy, slick flesh, and her breath catches. {mira}"That feels... oh gods, that feels WONDERFUL." Her thighs can't close. There's too much of her in the way. She keeps squeezing anyway.`;
        }

        if (miraM >= 5) {
            transform += `\n\nEven her muscles inflate. Her arms swell thick and round, biceps puffing up taut beneath the skin. Her abs clench, trying to hold their shape against the belly pushing outward, and lose. The definition stretches, each ridge bloating and softening under the dome. Her thighs are massive, columns of swollen muscle forced wide apart, each one thicker than her waist used to be.\n\n{mira}"Holy shit." She tries to lift her head. The sheer mass pins her flat. She flexes one enormous arm and the swollen bicep bunches uselessly against the weight holding her down. {mira}"Holy SHIT. Boss, I'm... even my MUSCLES are growing and the pressure feels..." She breaks off with a moan that shakes the bed.`;
        } else if (miraM >= 4) {
            transform += `\n\nHer toned arms brace against the mattress. Muscles strain, powerful, completely outmatched by the sheer mass piled on top of her. She tries to sit up and her own body slams her back down.\n\n{mira}"Holy shit." She grips the sheets hard enough to tear them. {mira}"Holy SHIT, I can't... it's too heavy and it all feels so..." A gasp. Every failed attempt sends waves rolling through her inflated body. {mira}"I'm so full I might actually explode and I don't want it to STOP."`;
        } else if (miraM >= 3) {
            transform += `\n\nShe tries to sit up. Not even close. Her athletic frame is buried under itself, breasts alone outweighing the rest of her. She falls back, laughing, gasping.\n\n{mira}"Holy shit." Her hands find her belly, run across the taut curve. {mira}"HOLY shit." She squeezes her own inflated thigh and her whole body quakes. {mira}"I can't move. I literally cannot move and everything is touching everything and it all feels AMAZING."`;
        } else {
            transform += `\n\nShe doesn't even try to move. Her slender frame has no chance. Pure inflation, soft and enormous, pinned flat. The pressure alone makes her dizzy.\n\n{mira}"Holy shit." Her voice is small. Her body is not. {mira}"Holy shit, holy shit, holy SHIT..." She grabs the side of one massive breast and the pressure sends a shudder through every inflated inch. {mira}"Everything is touching everything and it all FEELS... oh gods..."`;
        }

        transform += `\n\n{mira}"Does this make me look fat?" She's laughing too hard to care about the answer.`;

        // === Sex, player aggressively brings Mira to climax ===
        let sexText;

        if (miraM >= 5) {
            sexText = `{mira}"Get up here." Her inflated arms are massive but they still work. She reaches for you, swollen biceps straining, and PULLS. {mira}"Climb. Scale the mountain, Boss."`;

            sexText += `\n\nYou climb. Over the dome of her belly, between the valley of her breasts, hands slipping on taut, cum-slick skin. You swing around, straddling her face, and she buries herself between your thighs before you're even settled.`;

            if (miraBody.genitalia === 1) {
                sexText += `\n\nHer cock is right there, jutting past her breasts. You wrap both hands around the shaft. They don't come close to covering the girth. You stroke, squeeze, twist. Merciless, aggressive, giving her exactly what she needs while her swollen balls tighten under your grip. Below you, her moan vibrates through your thighs.`;

                sexText += `\n\nShe comes like a detonation. Her cock pulses in your hands and her swollen balls CLENCH, cum erupts in thick ropes, arcing past her own breasts. There's so much. Her balls keep pumping, each pulse sending another heavy streak across the dome of her belly, her chest, the sheets. She WATCHES it, eyes wide, gasping, seeing it and feeling it at the same time while her whole inflated body convulses beneath you.\n\n{mira}"I just came past my own tits." She sounds destroyed. {mira}"I SAW it. That's a core memory."`;
            } else {
                sexText += `\n\nYou bury your face between her spread thighs. Her swollen pussy is a feast. Engorged, glistening, so sensitive that the first lick makes her whole body quake. You press deeper, tongue and fingers working her mercilessly. Two fingers, then three, then your fist slides into slick heat and she SCREAMS.`;

                sexText += `\n\nShe comes around your fist, pussy clenching in waves, her whole inflated body convulsing beneath you. Her belly bounces you. Her thighs try to clamp and can't close. Below you, her scream vibrates through your entire body.\n\n{mira}"You fisted me from a 69 on top of a mountain." She sounds wrecked. {mira}"We are DEFINITELY doing that again."`;
            }
        } else {
            if (miraBody.genitalia === 1) {
                sexText = `You settle between her spread thighs. Her cock towers in front of you, so swollen it's absurd, veins thick, throbbing with her heartbeat. Her balls hang heavy and tight beneath, swollen to match. You wrap both hands around the shaft. They look comically small against it.`;

                sexText += `\n\nAbove the wall of her breasts, you hear her gasp. {mira}"Oh god, your hands look so TINY on it." A breathless laugh. {mira}"That's adorable. That's... oh FUCK that feels good..."`;

                sexText += `\n\nShe can't reach you. Can't reach past her own body. Her hands find her nipples and she tugs, vigorously, desperately, pulling and twisting while you pump her shaft with both hands. You're merciless. Fast, hard, relentless.`;

                sexText += `\n\nHer swollen balls tighten and she COMES, cock pulsing, cum erupting in thick heavy ropes over the dome of her belly, her breasts, everywhere. There's so much of it. Those swollen balls keep pumping, each clench sending another streak across her taut skin. Her massive body quakes while her fingers clamp down on her own nipples.\n\n{mira}"Your tiny hands just ruined me." She sounds wrecked and delighted. {mira}"I love that. I love everything about that."`;
            } else {
                sexText = `You settle between her spread thighs. Her pussy is right there. Swollen, flushed, glistening, impossible to miss. You drag your tongue across her engorged lips and her whole body shudders.`;

                sexText += `\n\n{mira}"Oh FUCK..." From somewhere past the mountain of her breasts. She can't see you. Can only feel your mouth on her swollen pussy, and every lick is devastating.`;

                sexText += `\n\nShe can't reach you. Can't reach past her own body. Her hands find her nipples and she tugs, vigorously, desperately, pulling and twisting while your tongue works her. You're merciless. Two fingers, then three, then your fist pushes into slick, yielding heat and she SCREAMS.`;

                sexText += `\n\nShe comes around your fist, pussy clenching, whole inflated body convulsing, a scream that shakes tools off the walls. Her belly bounces. Her thighs try to clamp and can't. Her fingers are still death-gripping her own nipples when the aftershocks fade.\n\n{mira}"You just fisted me while I couldn't move." She sounds wrecked. {mira}"Eleven out of ten. No notes."`;
            }
        }

        // === Revert ===
        let revert = `\n\nThe glow fades. Slowly, reluctantly, her body deflates. Breasts receding, belly flattening, thighs narrowing, everything returning to its previous proportions. She lies there breathing hard, testing restored limbs.\n\n{mira}"Wow." She stretches, pats herself down. Everything's back to normal. {mira}"That was..." She can't find the word. She grins. {mira}"Again. Definitely again."`;

        this.text = tease + '\n\n' + transform + '\n\n' + sexText + revert;
    },
    actions: [
        { label: 'Continue...', nextScene: 'mira_sex_closing' }
    ]
};

SCENES['mira_sex_closing'] = {
    id: 'mira_sex_closing',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('mira', 'base');

        const miraBody = gameState.npcs.mira.body;
        const playerBody = gameState.player.body;
        const miraC = miraBody.chest;
        const miraM = miraBody.muscle;
        const miraB = miraBody.butt;
        const miraGS = miraBody.genitaliaSize;
        const miraHasVulva = miraBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerB = playerBody.butt;
        const isGoddess = miraC >= 5 && miraB >= 5 && miraM >= 4;
        const sawTransform = hasSeenTransformation('mira');

        let text = '';

        // === Transform callback (if round two happened) ===
        if (sawTransform) {
            text += `She's still catching her breath from the transformation, the inflation, the sensitivity, the sheer overwhelming volume of herself. She flexes her hands, testing that everything's back to normal size.\n\n{mira}"That was..." She shakes her head, grinning. {mira}"I just slapped the workbench and turned on three devices at random and it was INCREDIBLE." She looks at the devices with new respect. {mira}"I think I accidentally found the best combination. We need to figure out which ones I hit." She's already scheming. {mira}"For science."\n\n`;
        }

        // === Comedown (stat-priority) ===
        let comedown;
        if (isGoddess) {
            comedown = `She's vast and magnificent and for once she's quiet. Not because she has nothing to say, because she doesn't need to say it. She pulls you close, buries her face in your neck, and just breathes. Her hand finds yours. Holds it.\n\n{mira}"...hey, Boss?" Soft. No punchline coming. No bouncing, no flexing, no narrating. Just Mira, enormous and warm and still.\n\n{mira}"Thanks." She squeezes your hand. Doesn't elaborate. Doesn't need to. You're in this together, and that's enough.`;
        } else if (miraC >= 5) {
            comedown = `Your head rests on her massive chest. She's still bouncing a little on purpose, tiny shifts, making them jiggle, watching your face for the laugh. She gets it.\n\nBut her hand is in your hair and her voice is softer than usual. {mira}"They're pretty great, right?" She means the breasts. She also means this, the warmth, the quiet, the two of you tangled up in the workshop.\n\nShe traces a lazy circle on your shoulder with her thumb. {mira}"I'm glad it's you." She says it like it's nothing. It's not nothing.`;
        } else if (miraB >= 5) {
            comedown = `She's lying on her stomach, enormous ass in the air, kicking her feet like a teenager. She looks over her shoulder at you with that grin.\n\n{mira}"Rate my ass. Scale of one to ten."\n\nWhatever you say, she shakes her head. {mira}"Wrong. Eleven." She wiggles for emphasis, the massive cheeks bouncing.\n\nThen she rolls onto her side and pulls you close. The grin softens into something warmer. Her forehead touches yours. She doesn't say anything for a moment, and Mira not talking is louder than Mira talking.`;
        } else if (miraM >= 4) {
            comedown = `She stretches, every muscle on display, still showing off. Can't help it. She flexes one arm, then the other, checking herself out with the same enthusiasm she had an hour ago.\n\nThen she pulls you against her and holds you with unnecessary gentleness. Careful, in a way she wasn't during.\n\n{mira}"Did I hurt you? I get carried away when I'm..." She flexes one more time. Can't resist. {mira}"...like this."\n\nBut she checks. She checks because she cares.`;
        } else if (miraGS >= 3 && miraHasVulva) {
            comedown = `She lies there with her thighs pressed together, aftershocks still making her gasp. Her whole body twitches when she shifts.\n\n{mira}"I'm going to be feeling that all day tomorrow." She grins. {mira}"Good."\n\nShe reaches for your hand. Presses it against her stomach, warm skin under your palm. Her breathing slows. She's quiet, and it's the satisfied kind, the kind where she's not performing calm. She's actually calm. {mira}"Stay for a minute?"`;
        } else if (miraGS >= 3 && !miraHasVulva) {
            comedown = `She's finally softening, the desperate edge gone. She lies there looking at the ceiling, one hand on her chest, catching her breath. The relief is visible, hours of need, finally answered.\n\n{mira}"I've been needing that since morning." She rolls to face you. {mira}"Thanks for... you know."\n\nShe kisses you. Not a joke kiss, not a peck, not punctuation for a punchline. A real one. Soft. She pulls back and looks almost surprised at herself. Then grins. {mira}"Sorry. Felt right."`;
        } else if (miraC <= 1 && miraM <= 1) {
            comedown = `She tucks against you like a cat, small, flushed, hair everywhere. Her whole body fits against yours with nothing in the way, no padding, just skin and warmth.\n\n{mira}"Being tiny is the best. You can just... fit everywhere." She's curled so tight against you there's no space between. Her nose against your neck. Her hand finds yours.\n\n{mira}"We fit." Two words. No joke. She means it.`;
        } else {
            comedown = `She lies next to you, propped on one elbow, grinning. She's already talking, a delivery that went sideways, a funny thing Barret said, plans for tomorrow. Normal Mira. The volume's back up.\n\nBut she hasn't moved away. Her leg is tangled with yours. Her hand keeps finding excuses to touch you, your arm, your shoulder, your hair. She's narrating the day and her fingers are tracing patterns on your skin and she doesn't seem to notice she's doing both.\n\n{mira}"Anyway." She grins down at you. The chatter pauses just long enough for her to lean down and kiss you. Warm. Quick. Real.`;
        }
        text += comedown;

        // Player standout modifiers (appended)
        if (playerC >= 4) {
            text += `\n\nHer hand finds your chest one more time. She cups, tests, nuzzles her cheek against them. {mira}"These are my favorites." She means the breasts. She also means the whole situation, the workshop, the weird devices, the two of you figuring it all out together.`;
        }
        if (playerB >= 4) {
            text += `\n\nHer hand slides to your ass. Squeezes once. {mira}"Dibs." Playful. But she's not letting go.`;
        }

        // Exit line (always)
        text += `\n\n{mira}"Same time tomorrow, Boss?" She's already sitting up, already stretching, already bouncing back. But she looks at you over her shoulder and the grin has something warm underneath it. She says it like it's casual. It's not casual. It's the most important question she asks all day.`;

        this.text = text;
    },
    actions: [
        { label: 'Return to workshop', nextScene: 'workshop_main' }
    ]
};


// ============================================
// MIRA WORKSHOP DELIVERY SYSTEM
// ============================================
// Every 12 workshop visits, Mira arrives to deliver a package
// 67% normal delivery, 33% accidental device activation

// Check if a stat can still change for Mira based on archetype targets
function canMiraStatChange(stat, max) {
    const current = gameState.npcs.mira.body[stat];
    // Direction is random, scene available if stat can move in either direction
    return current > 0 || current < max;
}

// Main dispatcher scene - picks between normal delivery and accident
SCENES['mira_delivery_event'] = {
    id: 'mira_delivery_event',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        // Build available normal delivery scenes (transformation demos only)
        let allNormalScenes = [/* 'mira_delivery_1', 'mira_delivery_2', */ 'mira_delivery_3', 'mira_delivery_4', 'mira_delivery_5', 'mira_delivery_6', 'mira_delivery_7'];

        // Skip device demo scenes if the stat can't change
        if (!canMiraStatChange('muscle', 5)) {
            allNormalScenes = allNormalScenes.filter(s => s !== 'mira_delivery_3');
        }
        if (!canMiraStatChange('chest', 5)) {
            allNormalScenes = allNormalScenes.filter(s => s !== 'mira_delivery_4');
        }
        if (!canMiraStatChange('butt', 5)) {
            allNormalScenes = allNormalScenes.filter(s => s !== 'mira_delivery_5');
        }
        if (!canMiraStatChange('genitaliaSize', 3)) {
            allNormalScenes = allNormalScenes.filter(s => s !== 'mira_delivery_6');
        }
        if (!gameState.flags.mira_story_day8_complete) {
            allNormalScenes = allNormalScenes.filter(s => s !== 'mira_delivery_7');
        }

        // 67% normal delivery (transformation demo), 33% accident
        // If no normal scenes available (all stats maxed), always use accident
        if (allNormalScenes.length > 0 && getPhaseRoll('mira_delivery_type', 0.67)) {
            // Filter out already seen deliveries
            const seenDeliveries = gameState.flags.seen_mira_deliveries || [];
            let availableDeliveries = allNormalScenes.filter(s => !seenDeliveries.includes(s));

            // If all seen, reset and allow repeats
            if (availableDeliveries.length === 0) {
                availableDeliveries = allNormalScenes;
                gameState.flags.seen_mira_deliveries = [];
            }

            // Weighted selection: genital swap (delivery_7) is rare (weight 1), others weight 3
            const weights = availableDeliveries.map(s => s === 'mira_delivery_7' ? 1 : 2);
            const totalWeight = weights.reduce((a, b) => a + b, 0);
            const roll = getPhaseRollIndex('mira_delivery_pick', totalWeight);
            let cumulative = 0;
            let scene = availableDeliveries[0];
            for (let i = 0; i < weights.length; i++) {
                cumulative += weights[i];
                if (roll < cumulative) { scene = availableDeliveries[i]; break; }
            }

            // Check if the picked scene's stat is at max, redirect to sex solicitation
            const sceneStatMap = {
                'mira_delivery_3': { stat: 'muscle', max: 5 },
                'mira_delivery_4': { stat: 'chest', max: 5 },
                'mira_delivery_5': { stat: 'butt', max: 5 },
                'mira_delivery_6': { stat: 'genitaliaSize', max: 3 }
            };
            const sceneInfo = sceneStatMap[scene];
            const miraBody = gameState.npcs.mira.body;
            const miraTrust = gameState.npcs.mira.trust || 0;
            const intimateThreshold = getNpcTrustThresholds('mira').intimate;

            if (sceneInfo && miraBody[sceneInfo.stat] >= sceneInfo.max
                && miraTrust >= intimateThreshold) {
                // Maxed stat + trust high enough → sex solicitation (no increase possible)
                gameState.flags.mira_delivery_sex_stat = sceneInfo.stat;
                saveState();
                SceneManager.playScene('mira_delivery_sex');
                return 'redirect';
            }

            // Track this delivery as seen (guard against duplicate push on reload)
            if (!gameState.flags.seen_mira_deliveries) gameState.flags.seen_mira_deliveries = [];
            if (!gameState.flags.seen_mira_deliveries.includes(scene)) {
                gameState.flags.seen_mira_deliveries.push(scene);
                saveState();
            }

            SceneManager.playScene(scene);
        } else {
            // Pick random accident scene (excluding already seen)
            const miraBody = gameState.npcs.mira.body;
            let allAccidentScenes = [
                'mira_accident_chest_max',
                'mira_accident_chest_min',
                'mira_accident_butt_max',
                'mira_accident_butt_min',
                'mira_accident_muscle_max',
                'mira_accident_muscle_min',
                'mira_accident_gs_min',
                'mira_accident_hair_pink',
                'mira_accident_hair_white',
                'mira_accident_eyes',
                'mira_accident_inflate_all'
            ];

            // Filter out stat accidents where stat is already at extreme
            if (miraBody.chest >= 5) allAccidentScenes = allAccidentScenes.filter(s => s !== 'mira_accident_chest_max');
            if (miraBody.chest <= 0) allAccidentScenes = allAccidentScenes.filter(s => s !== 'mira_accident_chest_min');
            if (miraBody.butt >= 5) allAccidentScenes = allAccidentScenes.filter(s => s !== 'mira_accident_butt_max');
            if (miraBody.butt <= 0) allAccidentScenes = allAccidentScenes.filter(s => s !== 'mira_accident_butt_min');
            if (miraBody.muscle >= 5) allAccidentScenes = allAccidentScenes.filter(s => s !== 'mira_accident_muscle_max');
            if (miraBody.muscle <= 0) allAccidentScenes = allAccidentScenes.filter(s => s !== 'mira_accident_muscle_min');
            if (miraBody.genitaliaSize <= 0) allAccidentScenes = allAccidentScenes.filter(s => s !== 'mira_accident_gs_min');

            // Filter out already seen accidents
            const seenAccidents = gameState.flags.seen_mira_accidents || [];
            let availableAccidents = allAccidentScenes.filter(s => !seenAccidents.includes(s));

            // If all seen, reset and allow repeats
            if (availableAccidents.length === 0) {
                availableAccidents = allAccidentScenes;
                gameState.flags.seen_mira_accidents = [];
            }

            const scene = availableAccidents[getPhaseRollIndex('mira_accident_pick', availableAccidents.length)];

            // Track this accident as seen (guard against duplicate push on reload)
            if (!gameState.flags.seen_mira_accidents) gameState.flags.seen_mira_accidents = [];
            if (!gameState.flags.seen_mira_accidents.includes(scene)) {
                gameState.flags.seen_mira_accidents.push(scene);
                saveState();
            }

            SceneManager.playScene(scene);
        }
        return 'redirect';
    },
    actions: []
};

// ============================================
// NORMAL DELIVERY SCENES
// ============================================

SCENES['mira_delivery_1'] = {
    id: 'mira_delivery_1',
    image: '',
    speaker: 'Mira',
    text: `The workshop door bursts open and Mira bounds in, package under her arm.

"Delivery! Someone ordered... well, I don't know what this is, but it's heavy!"

She sets the package on your workbench and looks around the workshop with wide eyes, taking in all the strange devices.

"This place is amazing. All these gadgets and gizmos... what do they all do?"

You tell her they help people change themselves.

Her eyes widen. "Change themselves? Like... magically? That's incredible!" She glances at one of the devices, then back at you. "Your uncle was doing stuff like this? No wonder he always had such strange packages..."

She shakes her head in wonder.

"Anyway, I've got more deliveries. But this place is fascinating! Maybe I'll visit again sometime."`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + 1, 100);
        saveState();
    },
    actions: [
        { label: '"You\'re welcome anytime."', nextScene: 'workshop_main' }
    ]
};

SCENES['mira_delivery_2'] = {
    id: 'mira_delivery_2',
    image: '',
    speaker: 'Mira',
    text: `Mira staggers through the door carrying an enormous crate, her legs wobbling under the weight.

"Oof... delivery... for you..."

She heaves it onto the workbench with a grunt and stretches her back.

"Whoever ordered this must really hate couriers. My back is going to be sore for days!"

You offer to help her stretch. Her eyes light up.

"Really? That would be amazing!"

She turns and presents her back to you, rolling her shoulders. "Right between the shoulder blades... that's where it hurts the most."

You press your hands against her back, working out the knots. She lets out a satisfied groan.

"Oh, that's the spot... You've got good hands, you know that?"

After a minute she steps away, looking much more relaxed.

"Thanks! You're the best. I really needed that."`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + 1, 100);
        saveState();
    },
    actions: [
        { label: '"Anytime."', nextScene: 'workshop_main' }
    ]
};

SCENES['mira_delivery_3'] = {
    id: 'mira_delivery_3',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + 1, 100);
        saveState();

        // Random direction (bounded by stat limits)
        const muscle = gameState.npcs.mira.body.muscle;
        const canGrow = muscle < 5;
        const canShrink = muscle > 0;
        const wantsLower = canShrink && (!canGrow || Math.random() < 0.25);

        // Store direction for the demo scene
        gameState.flags._mira_delivery3_decrease = wantsLower;

        const repeat = !!gameState.flags.mira_tried_toner;

        if (repeat && wantsLower) {
            this.text = `Mira drops a package on the workbench without ceremony and makes a beeline for the Muscle Toner.

"So... remember last time?" She's already standing next to it, fingers drumming on the casing. She squeezes her bicep and sighs dreamily.

"I want these noodles even softer, boss. Delicate. Petite." She holds her arm up and pokes it. "I want to be the kind of girl who gets picked up and carried. Not the one doing the carrying."

She hops onto the device, grinning.

"One more notch?"`;
        } else if (repeat) {
            this.text = `Mira drops a package on the workbench without ceremony and makes a beeline for the Muscle Toner, gripping the handles like she's about to arm-wrestle it.

"Boss." She flexes one arm, studying the curve of her bicep. "You remember what the Toner did last time? I could feel it for days. Every time I picked up a crate, carried a package... I felt stronger. Denser."

She squeezes the handle, knuckles white.

"I want more of that. I want to lift things that used to be heavy and barely notice."`;
        } else if (wantsLower) {
            this.text = `Mira slips through the door quietly this time, a small package in her hands.

"Psst... got a delivery."

She looks around the workshop, then stops in front of the Muscle Toner. She runs a hand down her arm, squeezing experimentally.

"Hey, so... this thing. It can make people stronger, right?" She bites her lip. "Can it go the other way? Because I want my arms to feel delicate. Soft." She runs her fingers down her forearm.

"I want to feel petite, boss. The kind of arms where someone looks at you and thinks 'I should hold the door for her.'"

She glances at you hopefully.

"Can you make my guns smaller?"`;
        } else {
            this.text = `Mira slips through the door quietly this time, a small package in her hands.

"Psst... got a delivery."

She looks around the workshop with exaggerated caution, like she's searching for hidden dangers. Then her eyes land on the Muscle Toner and she edges closer, curiosity getting the better of her.

"I've been thinking about this place since my last visit. All those weird devices..." She reaches toward the Toner, fingers hovering. "What does this one do?"`;
        }
    },
    actions: [
        { label: '"Let\'s do it."', nextScene: 'mira_delivery_3_demo' },
        { label: '"Don\'t touch that."', nextScene: 'mira_delivery_3_dismiss' }
    ]
};

SCENES['mira_delivery_3_demo'] = {
    id: 'mira_delivery_3_demo',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        const decrease = gameState.flags._mira_delivery3_decrease;
        const repeat = !!gameState.flags.mira_tried_toner;
        delete gameState.flags._mira_delivery3_decrease;

        const newMuscle = decrease
            ? Math.max(gameState.npcs.mira.body.muscle - 1, 0)
            : Math.min(gameState.npcs.mira.body.muscle + 1, 5);
        gameState.npcs.mira.body.muscle = newMuscle;
        gameState.npcs.mira.trust += 2;
        gameState.flags.mira_tried_toner = true;
        recordNpcBodyChange('mira');
        saveState();

        this.image = getFlirtTransformationImagePath('mira', 'muscle', newMuscle) || getNpcImagePath('mira');

        if (repeat && decrease) {
            this.text = `You dial the Toner down another notch. Mira closes her eyes this time, ready for it.

The warmth rolls through her and she exhales slowly as her frame softens further. The last traces of hard definition melt away, leaving smooth, easy lines.

{mira}"Mmm." She opens her eyes and checks herself, running her hands down her arms. {mira}"Yeah. That's the stuff."

She stretches lazily, enjoying how her body moves without the extra tension.

{mira}"You know what's funny? I used to think stronger was always better. Courier mentality, I guess." She shrugs. {mira}"Turns out I like being soft. Who knew?"

She grabs her delivery bag and slings it over her shoulder with a grin.

{mira}"Same time next delivery?"`;
        } else if (repeat) {
            this.text = `You crank the Toner up another notch. Mira grins and plants her feet, bracing herself this time. She knows what's coming.

The device hums and the warmth hits harder than before. Her muscles tighten visibly, new definition carving itself across her arms and shoulders.

{mira}"Oh yeah, there it is." She flexes both arms and watches the results with open delight. {mira}"Boss, I am getting JACKED."

She twists to check her stomach, poking at the abs forming under her vest.

{mira}"Last time was good but this?" She does a strongman pose, laughing at herself. {mira}"This is INCREDIBLE. I could carry two crates at once. Three, maybe!"

She shadowboxes the air for a moment, then catches herself and clears her throat.

{mira}"I mean. Very professional. Thank you for the demonstration."

She's still grinning ear to ear.

{mira}"Same time next delivery?"`;
        } else if (decrease) {
            this.text = `You adjust the Toner's dial to the lower setting and gesture for her to hold still. Mira takes a breath and nods.

The device hums, a softer tone than usual. Warmth spreads through her arms, her shoulders, her core, but instead of tightening, the tension melts away. The hard edges of her muscles ease into something gentler.

{mira}"Oh..." She watches the definition in her arms smooth out, her frame settling into a softer silhouette. She rolls her shoulders and sighs with relief. {mira}"That feels so much better."

She checks her reflection in a polished brass panel, turning side to side.

{mira}"Yeah. That's more like it." She grins at you. {mira}"I don't need to look like I'm about to arm-wrestle a blacksmith, you know? This is way more me."

She does a little spin, clearly pleased.

{mira}"Best delivery day EVER."`;
        } else {
            this.text = `You flip the Toner's switch and gesture for her to hold still. Mira's eyes go wide but she doesn't pull away.

The device hums. A warm glow crawls up her arms. She gasps as the sensation hits, a deep tingle spreading through her shoulders, her core, her legs.

{mira}"Oh... oh wow." She watches her arms tighten, the soft lines of her biceps hardening into something lean and defined. She flexes experimentally and lets out a delighted laugh. {mira}"Holy moly, look at that!"

She twists to check her stomach. A faint outline of abs shows through her courier vest.

{mira}"I feel amazing. Like I could run a delivery to the capital and back without stopping." She bounces on her heels, testing her new legs. {mira}"Is this what being athletic feels like? Because I am INTO it."

She flexes again, admiring herself with zero subtlety.

{mira}"Best delivery day EVER."`;
        }

        const archetypeScene = checkMiraArchetypeCompletion();
        if (archetypeScene) {
            gameState.flags._mira_delivery_archetype_scene = archetypeScene;
            saveState();
        }

        gameState.flags._mira_delivery_stat = { stat: 'muscle', newValue: newMuscle };
        saveState();

        this.actions = [
            { label: '"Suits you."', nextScene: 'mira_delivery_portrait' }
        ];
    },
    actions: []
};

// Mira puts herself together after a delivery demo, shows updated portrait
SCENES['mira_delivery_portrait'] = {
    id: 'mira_delivery_portrait',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');

        // Read stat context from the demo scene that just played
        const statCtx = gameState.flags._mira_delivery_stat;
        delete gameState.flags._mira_delivery_stat;

        let farewell;
        if (statCtx && statCtx.reverted) {
            // Accident revert, Mira's back to what she had before
            farewell = `Mira rolls her shoulders, pats herself down, and lets out a long breath. She looks the same as when she walked in.\n\n{mira}"Back to normal." She gives you a relieved grin. {mira}"That was... a LOT. But hey, no harm done, right?"\n\nShe straightens her vest and grabs her bag.\n\n{mira}"Thanks for fixing that, boss. Seriously. I owe you one."`;
        } else if (statCtx) {
            const { stat, newValue } = statCtx;
            if (stat === 'chest') {
                if (newValue <= 1) {
                    farewell = `Mira adjusts her vest and rolls her shoulders, light and easy. She grins at you, running a hand down her front.\n\n{mira}"Ahh, that's so much better. I can actually breathe." She bounces on her toes. {mira}"No bouncing, no aching, no adjusting every five minutes. I might actually run my route today instead of walking it."\n\nShe shoulders her bag and winks.\n\n{mira}"Thanks, boss. See you next time."`;
                } else if (newValue <= 3) {
                    farewell = `Mira tugs her top into place, checking herself in a polished brass panel. She turns side-on and smiles at what she sees.\n\n{mira}"Oh, I like these." She cups herself briefly, testing the weight. {mira}"Just the right amount of 'hello, look at me' without getting in the way. You know?"\n\nShe straightens up, pleased.\n\n{mira}"I'm going to walk past every mirror on my route home. Every. Single. One."`;
                } else {
                    farewell = `Mira adjusts her top for the third time, cheeks still flushed. She can't stop glancing down at herself, and every small movement makes her breath hitch.\n\n{mira}"I can't stop touching them." She laughs, hands drifting up again. {mira}"Is that weird? Every time they move I get this warm little shiver and I just..."\n\nShe fans herself, grinning ear to ear.\n\n{mira}"I'm going home to stand in front of my mirror for about three hours. Don't judge me, boss."`;
                }
            } else if (stat === 'muscle') {
                if (newValue <= 1) {
                    farewell = `Mira stretches her arms overhead and sighs contentedly. Her frame is soft and easy, all the hard edges smoothed away.\n\n{mira}"Light as a feather." She does a lazy spin. {mira}"No tension, no bulk, just... me. The soft version."\n\nShe grabs her delivery bag and slings it on.\n\n{mira}"Thanks, boss. I'm going to enjoy being squishy for a while."`;
                } else if (newValue <= 3) {
                    farewell = `Mira flexes experimentally, watching the definition in her arms with quiet satisfaction. She rolls her shoulders back and stands taller.\n\n{mira}"Now THAT feels good." She makes a fist and grins at the taut line of her forearm. {mira}"Strong but not scary. I could carry twice the packages like this."\n\nShe grabs her bag and punches the air on the way out.\n\n{mira}"See you next delivery, boss."`;
                } else {
                    farewell = `Mira flexes both arms and stares at the result with naked delight. She's practically vibrating with energy.\n\n{mira}"Boss, I want to arm-wrestle someone. Right now. Anyone. That guy at the tavern who brags about his grip? I could take him." She shadowboxes the air. {mira}"I could take EVERYBODY."\n\nShe grabs her delivery bag like it weighs nothing.\n\n{mira}"I'm going to find something heavy to carry. For FUN."`;
                }
            } else if (stat === 'butt') {
                if (newValue <= 1) {
                    farewell = `Mira pats herself down and takes a few light steps, marveling at how easily she moves.\n\n{mira}"I'm like a gazelle!" She does a little skip. {mira}"Nothing bumping, nothing bouncing, nothing knocking things off shelves. This is freedom, boss."\n\nShe grabs her bag and practically dances to the door.\n\n{mira}"See you next time!"`;
                } else if (newValue <= 3) {
                    farewell = `Mira smooths her shorts and sways her hips experimentally, watching the movement with interest.\n\n{mira}"Oh, that's nice." She does a slow turn, craning over her shoulder. {mira}"Just enough to have some swing to it, you know? I can feel it move when I walk and it's kind of..."\n\nShe bites her lip, grinning.\n\n{mira}"I'm going to take the long way home. The route with all the reflective shop windows."`;
                } else {
                    farewell = `Mira stands up and immediately looks over her shoulder, transfixed. She sways her hips and watches the jiggle with a dazed expression.\n\n{mira}"Boss." She's breathless. {mira}"I can feel it bounce with every step. Every. Single. Step. And it does something to me that I cannot describe in polite company."\n\nShe takes a few steps toward the door and her thighs press together.\n\n{mira}"I'm going home. Right now. To my mirror. And then I'm going to... um... 'test' things." She's bright red and grinning. {mira}"Don't wait up."`;
                }
            } else if (stat === 'genitaliaSize') {
                if (newValue === 0) {
                    farewell = `Mira adjusts her pants and takes a few easy steps, relief written across her face.\n\n{mira}"Back to baseline." She nods. {mira}"Clean, neat, no distractions. Exactly what I needed."\n\nShe shoulders her bag.\n\n{mira}"Thanks, boss. Same time next delivery."`;
                } else if (newValue <= 2) {
                    farewell = `Mira shifts in place, pressing her thighs together with a curious expression. Something's different and she's still processing it.\n\n{mira}"It's subtle but it's there." She takes a few careful steps. {mira}"I'm going to need some private time to... explore this properly. You know. Scientifically."\n\nShe grabs her bag, cheeks pink.\n\n{mira}"Thanks, boss. I'll, um, let you know how the research goes."`;
                } else {
                    farewell = `Mira catches her reflection in a brass panel and stares, lips parted. She shifts her weight and her breath hitches.\n\n{mira}"Yep." Her voice is tight. {mira}"That's... yep."\n\nShe grabs her bag without breaking eye contact with her own reflection. Her hands are shaking.\n\n{mira}"Bye, boss." She's out the door before you can respond.`;
                }
            } else if (stat === 'genitalia') {
                if (newValue === 0) {
                    // Got vulva
                    farewell = `Mira smooths her pants and takes a steadying breath, composure slowly returning. She catches sight of herself in a brass panel and tilts her head, studying the difference.\n\n{mira}"Huh." A small, private smile. {mira}"Yeah. That's me."\n\nShe grabs her bag and heads for the door.\n\n{mira}"See you next time, boss."`;
                } else {
                    // Got penis
                    farewell = `Mira adjusts her pants one more time and squares her shoulders. She catches her reflection in a brass panel and grins at it.\n\n{mira}"Looking good." She gives herself a nod. {mira}"Feeling good."\n\nShe grabs her bag and slings it over her shoulder.\n\n{mira}"See you next delivery, boss."`;
                }
            }
        }

        // Fallback to generic lines if no stat context
        if (!farewell) {
            const lines = [
                `Mira tugs her top back into place and smooths down her hair, composure slowly returning. She catches your eye and gives you a wink.\n\n{mira}"Thanks, boss. Really." She shoulders her delivery bag. {mira}"I'll see you next time around. Try not to miss me too much."`,
                `Mira adjusts her clothes, takes a steadying breath, and runs her fingers through her hair. The flush in her cheeks is fading but the grin isn't going anywhere.\n\n{mira}"You're the best, you know that?" She gives you a little salute. {mira}"Same route, same workshop. See you soon."`,
                `Mira straightens her vest and gives herself a once-over, patting everything into place. She rolls her shoulders back and stands a little taller.\n\n{mira}"Alright. Deliveries won't make themselves." She pauses at the door and looks back with a warm smile. {mira}"Thanks for this. Seriously."`
            ];
            farewell = lines[Math.floor(Math.random() * lines.length)];
        }

        this.text = farewell;

        const archetypeScene = gameState.flags._mira_delivery_archetype_scene;
        delete gameState.flags._mira_delivery_archetype_scene;
        this.actions = [
            { label: 'See you, Mira.', nextScene: archetypeScene || 'workshop_main' }
        ];
    },
    actions: []
};

SCENES['mira_delivery_3_dismiss'] = {
    id: 'mira_delivery_3_dismiss',
    image: '',
    speaker: 'Mira',
    text: `She jerks her hand back.

"Right! Sorry. Unstable magic devices, not toys. Got it."

She clutches her delivery bag tighter and takes a step back from the shelf.

"Your uncle was braver than I thought. Or crazier." She pauses. "Maybe both?"

She inches toward the door with an apologetic grin.

"Same time next delivery?"`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
    },
    actions: [
        { label: '"See you, Mira."', nextScene: 'workshop_main' }
    ]
};

SCENES['mira_delivery_4'] = {
    id: 'mira_delivery_4',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + 1, 100);
        saveState();

        // Random direction (bounded by stat limits)
        const chest = gameState.npcs.mira.body.chest;
        const canGrow = chest < 5;
        const canShrink = chest > 0;
        const wantsLower = canShrink && (!canGrow || Math.random() < 0.25);

        // Store direction for the demo scene
        gameState.flags._mira_delivery4_decrease = wantsLower;

        const repeat = true; // Mira always knows the chest shaper (used on her in day 2 story)

        if (repeat && wantsLower) {
            this.text = `Mira drops a package on the workbench and drifts straight to the Chest Shaper, running her fingers along the brass trim.

"Hey boss, remember what we did last time?" She glances down at herself and cups her breasts. "I want the girls even smaller. Perky. Cute."

She holds her hands against her chest, framing the shape she's imagining.

"I want a tight little top and nothing underneath and have it look amazing. You know that look? Where it's just... effortless?"

She taps the device hopefully.

"One more notch on these puppies?"`;
        } else if (repeat) {
            this.text = `Mira drops a package on the workbench and drifts straight to the Chest Shaper, running her fingers along the brass trim.

"Boss." She cups her hands under her breasts, testing the weight. "Every morning I wake up and check the mirror to see if they're still this big. And every morning I think... bigger."

She bites her lip, cheeks flushing.

"I've been staring at the Shaper in my head all week. The warmth when it kicks in, the way they just... swell. I need another session."`;
        } else if (wantsLower) {
            this.text = `Mira nudges through the door with a package balanced on one hip. She sets it down, then pauses, spotting the Chest Shaper on the workbench.

"What's that one do?" She leans closer, reading the label etched into the brass. "Chest... Shaper?"

She straightens up and cups her breasts with both hands, hefting them pointedly.

"Boss. Can this thing shrink these puppies?" She cups them and grins. "I want to go smaller. Cute and perky. The kind where you can wear whatever you want and it just looks right."

She bounces on her heels, eyes bright.

"I want to feel petite up top. Like a little handful. Can it do that?"`;
        } else {
            this.text = `Mira nudges through the door with a package balanced on one hip. She sets it down, then bumps the Chest Shaper with her elbow as she turns.

"Whoa!" She steadies the device and peers at it curiously. "I don't remember this one from last time."

She traces the label etched into the brass. "Chest... Shaper." Her eyebrows shoot up.

"Wait. Does this do what I think it does?" She looks at you with wide eyes, then back at the device, then back at you.

"Boss. Does this thing make your boobs bigger?"`;
        }
    },
    actions: [
        { label: '"Let\'s do it."', nextScene: 'mira_delivery_4_demo' },
        { label: '"Hands off the merchandise."', nextScene: 'mira_delivery_4_dismiss' }
    ]
};

SCENES['mira_delivery_4_demo'] = {
    id: 'mira_delivery_4_demo',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        const decrease = gameState.flags._mira_delivery4_decrease;
        const repeat = true; // Mira always knows the chest shaper (day 2 story)
        delete gameState.flags._mira_delivery4_decrease;

        const newChest = decrease
            ? Math.max(gameState.npcs.mira.body.chest - 1, 0)
            : Math.min(gameState.npcs.mira.body.chest + 1, 5);
        gameState.npcs.mira.body.chest = newChest;
        gameState.npcs.mira.trust += 2;
        gameState.flags.mira_tried_shaper = true;
        recordNpcBodyChange('mira');
        saveState();

        this.image = getFlirtTransformationImagePath('mira', 'chest', newChest) || getNpcImagePath('mira');

        const highLevel = newChest >= 4;

        if (repeat && decrease) {
            if (highLevel) {
                this.text = `You dial the Shaper down another notch. Mira bites her lip and holds still, but she's already squirming before the device even starts.

The warmth rolls through her chest and she shudders. Even shrinking, the sensation is intense at this size. Her eyes flutter shut as the fullness draws inward, and a soft moan slips out before she can stop it.

{mira}"Mmm... nnh." Her hands drift up to cup herself, fingers sinking into the still-generous swell. {mira}"They're so sensitive after, it's like... every little shift I can feel everywhere."

She opens her eyes, cheeks flushed, and catches you watching.

{mira}"Sorry, that was..." She grins, breathless. {mira}"Actually no. Not sorry. **That felt amazing.**"

She adjusts her top, which still has plenty to contain, and fans herself with one hand.

{mira}"Same time next delivery? Because, um... yeah. Definitely."`;
            } else {
                this.text = `You dial the Shaper down another notch. Mira takes a breath and holds still.

The warmth rolls through her chest, a gentle tide pulling inward. She watches the heaviness recede, her frame settling into something lighter, easier.

{mira}"Oh, that's nice." She rolls her shoulders, testing the new balance. {mira}"Yeah. Way better."

She does a little jog in place, grinning.

{mira}"No bouncing! Well... less bouncing." She laughs. {mira}"I can actually run deliveries without holding my chest now. This is amazing."

She grabs her bag and slings it on.

{mira}"Same time next delivery, boss?"`;
            }
        } else if (repeat) {
            if (highLevel) {
                this.text = `You crank the Shaper up another notch. Mira plants her feet, already breathing hard with anticipation.

The device hums and warmth floods her chest. She gasps as the pressure builds, her top stretching tighter, then tighter still. The fabric strains across curves that just keep growing.

{mira}"Oh... oh god." Her back arches and she grips the workbench. {mira}"They're so... so..."

She looks down. Her jaw drops.

{mira}"...**humongously massive.**" She cups them with both hands, fingers barely covering the swell, and her breath hitches. {mira}"Holy moly, boss, **you HAVE to feel these.** They're like... absolute UNITS."

She bounces once and her whole body shudders. Her thighs press together.

{mira}"Oh. Oh, that's... every time they move I can feel it and it's..." She bites her lip, flushed from cheeks to collarbone. {mira}"This is bananas. I'm a mess. I don't care. **More.**"`;
            } else {
                if (newChest <= 1) {
                this.text = `You flick the Shaper on at its lowest setting. Mira holds still, eyes squeezed shut in anticipation.

The device hums softly and gentle warmth spreads through her chest. She peeks down as the faintest swell pushes against her top.

{mira}"Oh!" Her hands fly up to cup herself. {mira}"They're... there's something there!"

She presses her palms against the small curves, grinning ear to ear.

{mira}"They're tiny but they're so CUTE! Like little handfuls!" She turns side-on and admires the profile. {mira}"Boss, look. I have a shape now!"

She bounces on her toes, delighted.

{mira}"Best. Delivery. Route. EVER."`;
            } else if (newChest === 2) {
                this.text = `You crank the Shaper up another notch. Mira plants her feet, already grinning.

The device hums and warmth blooms through her chest. She watches with wide eyes as her top fills out, the fabric pulling snug.

{mira}"Ohhh." She cups herself, testing the new weight. {mira}"Now THESE are nice. A proper handful!"

She adjusts her vest, which is noticeably tighter across the front.

{mira}"I can feel them move when I shift. That's so weird and I love it." She gives a little shimmy. {mira}"Okay, yeah. This is happening. This is a thing I have now."

She grabs her delivery bag, still beaming.

{mira}"Best. Delivery. Route. EVER."`;
            } else {
                this.text = `You crank the Shaper up another notch. Mira plants her feet and braces, grinning already.

The device hums and warmth blooms through her chest. She gasps as the pressure builds, her top stretching visibly tighter.

{mira}"Oh my god." She looks down and her eyes go wide. {mira}"Oh my GOD. Boss!"

She cups herself experimentally, jaw dropping.

{mira}"They're even bigger! Holy moly, **feel how heavy they are!**" She bounces once and watches the result with pure delight. {mira}"I am going to need a whole new wardrobe and I do NOT care."

She strikes a pose, hands on her hips.

{mira}"Best. Delivery. Route. EVER."`;
            }
            }
        } else if (decrease) {
            if (highLevel) {
                this.text = `You adjust the Shaper to the lower setting and nod for her to hold still. Mira nods back, but the moment the device hums she whimpers.

Even shrinking feels intense at this size. The warmth radiates through her chest and every inch of the change sends shivers through her. She hugs herself, arms pressing against the retreating fullness.

{mira}"Oh..." Her eyes flutter. {mira}"That's... mmm."

She opens her eyes, visibly flustered. Her chest is smaller now but still very generous, and she runs her hands over the new shape with a hungry expression.

{mira}"Okay so I asked for lighter." She lets out a shaky laugh. {mira}"But I'm feeling a lot of things right now and lighter is, um, not the main one."

She fans herself, cheeks burning, grinning wide.

{mira}"**Best delivery day EVER.** For... several reasons."`;
            } else {
                this.text = `You adjust the Shaper to the lower setting and nod for her to hold still. Mira closes her eyes, nervous but willing.

The device hums softly. Warmth spreads across her chest and the pressure starts to ease, like setting down a heavy pack after a long route. The fullness recedes, gently, steadily.

{mira}"Oh..." She opens her eyes and looks down. The tension in her shoulders melts. {mira}"Oh, that's so much better."

She rolls her shoulders back, standing taller without the weight pulling her forward.

{mira}"I can breathe properly!" She laughs, surprised by her own relief. {mira}"You have no idea how long I've been hunching to compensate for these."

She does an experimental stretch, arms overhead, and grins.

{mira}"Best delivery day EVER."`;
            }
        } else {
            if (highLevel) {
                this.text = `You flip the Shaper's switch and gesture for her to hold still. Mira nods, but nothing prepares her for this.

The device hums and warmth floods her chest. The pressure builds and builds and keeps building. Her top stretches taut, fabric creaking as her breasts swell heavy and full.

{mira}"Oh wow." Her voice comes out breathy. She looks down and her lips part. {mira}"They're... boss, they're ginormous."

She cups them with trembling hands. The sheer weight of them makes her dizzy. She shifts and the new heaviness moves with her, warm and soft, and a sound escapes her that's definitely not just surprise.

{mira}"**Holy moly.**" She's flushed everywhere, thighs pressed together. {mira}"I can feel my heartbeat in them. Is that normal? Because it feels..."

She squirms, biting her lip.

{mira}"It feels really, really good." She looks at you, cheeks burning, eyes bright. {mira}"Like REALLY good. **Feel this.** I'm not even kidding, you have to, they're so..."

She trails off, breathing hard, making zero move toward the door.

{mira}"Best delivery day ever. By a LOT."`;
            } else {
                this.text = `You flip the Shaper's switch and gesture for her to hold still. Mira's eyes go wide but she doesn't move.

The device hums. A warm pulse radiates through her chest, gentle at first, then building. She gasps as she feels the change, a slow, steady pressure pushing outward.

{mira}"Oh... oh WOW." She looks down and watches her top stretch tighter, the fabric pulling taut. Her hand flies to her mouth. {mira}"They're actually... oh my god, they're GROWING."

She cups them experimentally, eyes like dinner plates.

{mira}"**Holy moly, boss!**" She turns to check her profile in a polished brass panel. {mira}"Look at these! They're real! They're really real and they're MINE!"

She does a little shimmy, completely unable to contain herself.

{mira}"Best delivery day EVER."`;
            }
        }

        const archetypeScene = checkMiraArchetypeCompletion();
        if (archetypeScene) {
            gameState.flags._mira_delivery_archetype_scene = archetypeScene;
            saveState();
        }

        gameState.flags._mira_delivery_stat = { stat: 'chest', newValue: newChest };
        saveState();

        this.actions = [
            { label: '"Suits you."', nextScene: 'mira_delivery_portrait' }
        ];
    },
    actions: []
};

SCENES['mira_delivery_4_dismiss'] = {
    id: 'mira_delivery_4_dismiss',
    image: '',
    speaker: 'Mira',
    text: `She pulls her hand back with an exaggerated pout.

"Fine, fine. No touching the magic boob machine." She holds up her hands in surrender.

"I get it. Professional boundaries. Very responsible of you, boss."

She backs toward the door, stealing one last longing glance at the Shaper.

"Same time next delivery?"`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
    },
    actions: [
        { label: '"See you, Mira."', nextScene: 'workshop_main' }
    ]
};

SCENES['mira_delivery_5'] = {
    id: 'mira_delivery_5',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + 1, 100);
        saveState();

        // Random direction (bounded by stat limits)
        const butt = gameState.npcs.mira.body.butt;
        const canGrow = butt < 5;
        const canShrink = butt > 0;
        const wantsLower = canShrink && (!canGrow || Math.random() < 0.25);

        // Store direction for the demo scene
        gameState.flags._mira_delivery5_decrease = wantsLower;

        const repeat = !!gameState.flags.mira_tried_enhancer;

        if (repeat && wantsLower) {
            this.text = `Mira sets a package down and walks straight to the Posterior Enhancer, patting the padded seat like an old friend.

"Me again." She pats her rear and settles into the seat. "I want my booty tighter, boss. Smaller. The kind of butt that looks incredible in fitted pants."

She shifts her weight, grinning.

"I keep thinking about those slim trousers at the market. The ones that only work if you've got a tight little tush. I want THAT."

She wiggles in the seat.

"One more notch?"`;
        } else if (repeat) {
            this.text = `Mira sets a package down and walks straight to the Posterior Enhancer, dropping into the padded seat like she owns it.

"Boss. Don't even pretend you didn't know I was coming." She shifts her weight, settling her hips into the cushion. "I felt the difference for days after the last session. Every time I sat down, every time I walked past a mirror..."

She bites her lip, eyes bright.

"I want my butt bigger. Rounder. The kind where I can feel it bounce when I walk."`;
        } else if (wantsLower) {
            this.text = `Mira squeezes through the door with a package, bumping her hip on the frame as she enters.

"Ow." She rubs her side and frowns. "That's been happening a lot lately."

She sets the package down and notices the Posterior Enhancer, a cushioned chair-like device with brass fittings.

"Hey, what's this comfy-looking thing?" She reads the label and her eyes light up. "Posterior... Enhancer. Huh."

She glances over her shoulder at herself.

"So... can it go in reverse? Because I want a tight little butt." She cranes over her shoulder. "Sleek. The kind where you can wear anything and it looks amazing. I want my booty in slim pants, boss."`;
        } else {
            this.text = `Mira squeezes through the door with a package and trips over a cable, stumbling forward. She catches herself on the Posterior Enhancer, landing square in the padded seat.

"Whoa!" She laughs, settling into it. "Well, this is comfy. What is it?"

She reads the brass label. "Posterior... Enhancer."

She blinks.

"Wait." She looks at the seat, then down at herself, then up at you. A slow grin spreads across her face.

"Boss. Is this a butt machine?"`;
        }
    },
    actions: [
        { label: '"Take a seat."', nextScene: 'mira_delivery_5_demo' },
        { label: '"That one\'s not ready."', nextScene: 'mira_delivery_5_dismiss' }
    ]
};

SCENES['mira_delivery_5_demo'] = {
    id: 'mira_delivery_5_demo',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        const decrease = gameState.flags._mira_delivery5_decrease;
        const repeat = !!gameState.flags.mira_tried_enhancer;
        delete gameState.flags._mira_delivery5_decrease;

        const newButt = decrease
            ? Math.max(gameState.npcs.mira.body.butt - 1, 0)
            : Math.min(gameState.npcs.mira.body.butt + 1, 5);
        gameState.npcs.mira.body.butt = newButt;
        gameState.npcs.mira.trust += 2;
        gameState.flags.mira_tried_enhancer = true;
        recordNpcBodyChange('mira');
        saveState();

        this.image = getFlirtTransformationImagePath('mira', 'butt', newButt) || getNpcImagePath('mira');

        const highLevel = newButt >= 4;

        if (repeat && decrease) {
            if (highLevel) {
                this.text = `You dial the Enhancer down another notch. Mira sits down and immediately squirms, the seat pressing against curves that are still very much there.

The warmth rolls through her hips and she grips the armrests, biting her lip. Even the shrinking sensation sends heat radiating through her thighs.

{mira}"Mmm... oh." She shifts her weight and her breath catches. {mira}"It's doing the thing again. The, um. The good thing."

She stands up slowly, cheeks flushed, and looks over her shoulder. Still huge. Still very much a presence.

{mira}"Okay so it's smaller." She wiggles experimentally and watches the result. Her eyes go glassy. {mira}"But it still... **every time I move I can feel it** and it's just..."

She fans herself, laughing breathlessly.

{mira}"I'm supposed to go deliver packages after this. How am I supposed to concentrate?"`;
            } else {
                this.text = `You dial the Enhancer down another notch. Mira settles in and holds still.

The warmth rolls through her hips and rear, a slow pull inward. She feels herself tightening, slimming, the excess melting away.

{mira}"Ooh, there it goes." She shifts in the seat, feeling the difference immediately. {mira}"Yeah. That's better."

She stands up and does a cautious hip-shimmy, checking for clearance.

{mira}"I can sit on a barstool again! Do you know how long it's been since I could sit on a barstool without hanging off the sides?" She laughs. {mira}"Freedom, boss. Pure freedom."

She grabs her bag and heads for the door.

{mira}"Same time next delivery?"`;
            }
        } else if (repeat) {
            if (highLevel) {
                this.text = `You crank the Enhancer up another notch. Mira drops into the seat and grips the armrests, vibrating with anticipation.

The device hums deep. The warmth hits her hips like a wave and she gasps as she feels herself swell, her shorts stretching to their absolute limit, the seat groaning beneath her.

{mira}"Oh yes. Oh YES." She's gripping the armrests so hard her knuckles are white. {mira}"It's happening, it's so... so..."

She stands up and cranes over her shoulder. What she sees makes her clap both hands over her mouth.

{mira}"...**mega.**" She slaps her rear and the jiggle goes on for a solid two seconds. She makes a noise that's half laugh, half moan. {mira}"Amazeballs! They're absolute UNITS back here, boss!"

She wiggles her hips and her whole body shudders. Her thighs press together.

{mira}"Oh. Oh, that's... when I move them it does something to me." She's flushed bright red, grinning ear to ear. {mira}"**I need to sit down. Or not sit down. I don't know what I need.** This is bananas."`;
            } else {
                this.text = `You crank the Enhancer up another notch. Mira wiggles in the seat, bracing herself with a grin.

The device hums deeper this time. The warmth builds in her hips and spreads through her rear, and she feels herself swelling, filling out the seat even more than before.

{mira}"Oh YES." She grips the armrests. {mira}"Oh my god, I can feel it happening!"

She stands up and immediately checks over her shoulder, craning to see the result.

{mira}"BOSS." She slaps her own rear and gasps at the result. {mira}"**I have a DUMP TRUCK back here!**" She's laughing so hard she can barely talk. {mira}"Amazeballs! Literally!"

She does a slow turn, admiring herself from every angle.

{mira}"Best. Delivery. Route. EVER."`;
            }
        } else if (decrease) {
            if (highLevel) {
                this.text = `You adjust the Enhancer to the lower setting. Mira sits down and flinches as the padded seat presses against her, oversensitive.

The device hums and warmth rolls through her hips. The tightening sensation is gentle, but at this size even gentle sends sparks through her. She grips the armrests and her breath comes in short bursts.

{mira}"Oh..." She squirms. {mira}"That's... nnh. Even going down feels intense."

She stands up, legs a little unsteady, and checks over her shoulder. Still very generous. She runs a hand over the curve and shivers.

{mira}"I came here for practical reasons." She lets out a shaky laugh, cheeks burning. {mira}"But there is nothing practical about how that just made me feel."

She adjusts her shorts, which still have plenty to accommodate, and fans herself.

{mira}"**Best delivery day EVER.** I need... I need a glass of cold water. Or three."`;
            } else {
                this.text = `You adjust the Enhancer to the lower setting and nod for her to relax. Mira settles into the seat, fidgeting nervously.

The device hums softly. Warmth radiates through her hips and rear, but instead of building, it draws inward. She feels herself tightening, the excess padding slimming down.

{mira}"Oh!" She shifts in the seat. {mira}"That feels... lighter. Way lighter."

She stands up and does an experimental turn, checking over her shoulder.

{mira}"I have room in my shorts again!" She sounds genuinely amazed. {mira}"I'm not going to knock things over anymore!"

She does a happy little spin and grins at you.

{mira}"Best delivery day EVER."`;
            }
        } else {
            if (highLevel) {
                this.text = `You flip the Enhancer's switch. Mira yelps as it hums to life, then gasps as the warmth hits.

It's more than she expected. Way more. The pressure builds in her hips and rear, a relentless swell that pushes her shorts to their limit. The fabric stretches, creaks, strains across curves that just keep growing.

{mira}"Oh... oh WOW." She grips the armrests, wide-eyed. {mira}"Something's... something is very, VERY much happening."

She stands up on shaky legs and twists to look over her shoulder. Her jaw drops.

{mira}"**Boss.**" Her voice comes out small and breathless. {mira}"That's... that's ginormous. That is an absolute UNIT of a butt."

She gives it an experimental slap and the jiggle makes her knees buckle. A sound escapes her that's pure startled pleasure.

{mira}"Oh my god." She's flushed all the way down her neck. {mira}"Every time it moves I can feel it everywhere. Is that normal? Because it's..."

She presses her thighs together, biting her lip, grinning helplessly.

{mira}"It's amazing. **I'm amazing.** Best delivery day ever and I am not leaving this workshop for at least ten more minutes."`;
            } else {
                this.text = `You flip the Enhancer's switch. Mira yelps as the device hums to life beneath her.

Warmth spreads through her hips and rear. She grabs the armrests as pressure builds, a slow, insistent swell pushing outward.

{mira}"Oh... oh WOW." She squirms in the seat as her shorts stretch tighter. {mira}"Something's happening. Something is DEFINITELY happening."

She stands up and immediately twists to look over her shoulder. Her jaw drops.

{mira}"**Boss, I have a BUTT now!**" She slaps it and watches the jiggle with pure amazement. {mira}"Oh my god, it bounces! It BOUNCES!"

She does a little wiggle, giggling uncontrollably.

{mira}"I've had a flat courier butt my whole life and now look at this! LOOK AT IT!" She's practically glowing.

{mira}"Best delivery day EVER."`;
            }
        }

        const archetypeScene = checkMiraArchetypeCompletion();
        if (archetypeScene) {
            gameState.flags._mira_delivery_archetype_scene = archetypeScene;
            saveState();
        }

        gameState.flags._mira_delivery_stat = { stat: 'butt', newValue: newButt };
        saveState();

        this.actions = [
            { label: '"Suits you."', nextScene: 'mira_delivery_portrait' }
        ];
    },
    actions: []
};

SCENES['mira_delivery_5_dismiss'] = {
    id: 'mira_delivery_5_dismiss',
    image: '',
    speaker: 'Mira',
    text: `"Aw, really?" She pats the seat one more time before standing up reluctantly.

"Not ready, huh? That's okay. I get it. Safety first and all that."

She grabs her delivery bag but can't resist one last look at the device.

"You'll let me know when it IS ready though, right? Asking for a friend."

She winks and heads for the door.

"Same time next delivery?"`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
    },
    actions: [
        { label: '"See you, Mira."', nextScene: 'workshop_main' }
    ]
};

// ---- DELIVERY 6: Genital Sizer (genitaliaSize 0-3) ----

SCENES['mira_delivery_6'] = {
    id: 'mira_delivery_6',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + 1, 100);
        saveState();

        const gs = gameState.npcs.mira.body.genitaliaSize;
        const canGrow = gs < 3;
        const canShrink = gs > 0;
        const wantsLower = canShrink && (!canGrow || Math.random() < 0.25);
        gameState.flags._mira_delivery6_decrease = wantsLower;

        const repeat = !!gameState.flags.mira_tried_sizer;
        const hasVulva = gameState.npcs.mira.body.genitalia === 0;

        if (repeat && wantsLower) {
            if (hasVulva) {
                this.text = `Mira drops her package and makes a beeline for the Genital Sizer, hopping into the seat with practiced urgency.

{mira}"Boss. Remember last time?" She grins. {mira}"I want my girl tighter."

She crosses her legs and squeezes, a dreamy look on her face.

{mira}"I want her small and neat and tucked away. My little secret." She leans in conspiratorially. {mira}"The kind where it's so tight that when something finally does happen, I feel EVERYTHING. Every. Single. Thing."

She shivers at the thought.

{mira}"Dial her back for me?"`;
            } else {
                this.text = `Mira drops her package and makes a beeline for the Genital Sizer, sliding into the seat with a sheepish grin.

{mira}"Okay so... don't laugh." She shifts in the seat, hand on her lap. {mira}"I want my boy smaller."

She grins at your expression.

{mira}"Not gone! Just... compact. A cute little secret in my pants that nobody knows about but me." She bites her lip. {mira}"The kind of thing where it's hidden all day and then someone finds it and it's like a surprise gift."

She settles into the seat.

{mira}"Take him down a notch, boss?"`;
            }
        } else if (repeat) {
            if (hasVulva) {
                this.text = `Mira drops her package and makes a beeline for the Genital Sizer, dropping into the seat with zero pretense.

{mira}"Boss." Her eyes are bright. {mira}"I haven't stopped thinking about last time."

She presses her thighs together, grinning.

{mira}"The swelling? The way everything got fuller and puffier and more... present?" She shivers. {mira}"I want more. I want my lips so fat I can feel them pressing together when I walk. I want to be dripping before I even get home."

She settles into the seat and looks up at you with hungry anticipation.

{mira}"Crank it up."`;
            } else {
                this.text = `Mira drops her package and makes a beeline for the Genital Sizer, hopping into the seat with shameless excitement.

{mira}"Boss. You already know why I'm here." She grins wide, settling her hips in the seat. {mira}"Last time was incredible. The weight, the way it hangs, the way it presses against my thigh when I walk..."

She shifts in the seat, eyes bright.

{mira}"I want it bigger. I want a fat cock I can barely fit in my hand. I want to feel it heavy and warm between my legs every single step of my route."

She plants her feet and grips the armrests.

{mira}"More, boss. Give me MORE."`;
            }
        } else if (wantsLower) {
            if (hasVulva) {
                this.text = `Mira sets her package down and wanders the workshop, pausing at an unfamiliar device. She tilts her head, reading the brass label.

{mira}"Genital... Sizer." Her eyebrows climb. {mira}"Huh."

She glances at you, then back at the device, cheeks pinking.

{mira}"So..." She clears her throat, cheeks pinking. {mira}"Can this thing make my girl tighter? Smaller?"

She fidgets with the hem of her vest, then grins.

{mira}"I want her neat and tucked away. Like a little secret. The kind where everything's so tight that when something touches me it's just..." She shivers. {mira}"Incredible."`;
            } else {
                this.text = `Mira sets her package down and wanders the workshop, pausing at an unfamiliar device. She tilts her head, reading the brass label.

{mira}"Genital... Sizer." She connects the dots and looks down at herself, then back at the label. {mira}"Oh."

She pats her crotch absently and winces.

{mira}"So my boy..." She pats her lap fondly. {mira}"I want him smaller. Compact. A cute little surprise that nobody sees coming."

She grins.

{mira}"Like a hidden treasure, you know? Tucked away all day, my little secret. And then when someone finds him it's like..." She makes a 'ta-da' gesture. {mira}"Surprise!"`;
            }
        } else {
            if (hasVulva) {
                this.text = `Mira sets her package down and wanders the workshop, pausing at an unfamiliar device. She reads the brass label and her eyes go wide.

{mira}"Genital... Sizer." She stares. {mira}"Does this do what I think it does?"

She looks at you, then back at the device, cheeks flushing.

{mira}"So I've always been kind of... minimal. Down there." She cups her hands in front of her, illustrating nothing but embarrassment. {mira}"Flat. Tucked away. Not much to, um, feel."

She peers at the device with growing curiosity.

{mira}"What would it be like to have MORE? Like, actually feel something there? Fullness, presence, something that's not just... nothing?"

She bites her lip, shy but excited.

{mira}"Can I try?"`;
            } else {
                this.text = `Mira sets her package down and wanders the workshop, pausing at an unfamiliar device. She reads the brass label and a slow grin spreads across her face.

{mira}"Genital... Sizer." She looks down at her lap, then back at the label. {mira}"Oh my."

She traces the device casing with her fingers.

{mira}"So ever since I got my, um, addition..." She gestures at her crotch. {mira}"I've been curious about the size options. Like, what would it feel like bigger? More weight, more presence, more to feel when I move..."

She hops onto the seat, eyes bright.

{mira}"Boss. I want to see what a bigger version feels like. For science."`;
            }
        }
    },
    actions: [
        { label: '"Go ahead."', nextScene: 'mira_delivery_6_demo' },
        { label: '"That one\'s delicate."', nextScene: 'mira_delivery_6_dismiss' }
    ]
};

SCENES['mira_delivery_6_demo'] = {
    id: 'mira_delivery_6_demo',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        const decrease = gameState.flags._mira_delivery6_decrease;
        const repeat = !!gameState.flags.mira_tried_sizer;
        delete gameState.flags._mira_delivery6_decrease;

        const newGS = decrease
            ? Math.max(gameState.npcs.mira.body.genitaliaSize - 1, 0)
            : Math.min(gameState.npcs.mira.body.genitaliaSize + 1, 3);
        gameState.npcs.mira.body.genitaliaSize = newGS;
        gameState.npcs.mira.trust += 2;
        gameState.flags.mira_tried_sizer = true;
        recordNpcBodyChange('mira');
        saveState();

        const hasVulva = gameState.npcs.mira.body.genitalia === 0;
        const highLevel = newGS >= 2;

        this.image = getFlirtGenitalImagePath('mira', gameState.npcs.mira.body.genitalia, newGS) || getNpcImagePath('mira');

        if (!decrease && hasVulva && highLevel) {
            this.text = `You activate the Sizer. The device hums and warmth blooms between Mira's thighs. She gasps, gripping the armrests.

{mira}"Oh..." Her eyes flutter shut. {mira}"Oh, it's happening."

The swelling intensifies. She can feel her lips growing puffy and fat, pressing together on their own, slick heat building with every pulse of the device. Her hips rock against the seat involuntarily.

{mira}"God, it's..." She bites her lip hard. Every shift sends sparks through her. {mira}"I can feel everything. Every little movement, every..."

Her thighs press together and she shudders.

{mira}"I'm so wet I can feel it running down my thigh." She looks at you, flushed and breathless, zero pretense left. {mira}"I'm going straight home. Right now. Do NOT ask me to make any more deliveries today."`;
        } else if (!decrease && hasVulva) {
            this.text = `You activate the Sizer. A gentle warmth blooms between Mira's thighs. She holds still, eyes wide.

{mira}"Oh..." She presses her thighs together experimentally. {mira}"Something's... different."

It's subtle but unmistakable. Everything down there feels more present, more aware. Like someone turned up the volume on a radio she'd been ignoring.

{mira}"It's like..." She searches for words, cheeks pink. {mira}"Like I can feel myself. More. Everything's warmer and fuller and just... there."

She stands up carefully and takes a few steps, thighs pressing together with each one. A slow grin spreads across her face.

{mira}"Best delivery day EVER."`;
        } else if (decrease && hasVulva && highLevel) {
            this.text = `You dial the Sizer down. Warmth draws inward between Mira's thighs, and she exhales with visible relief as the overwhelming sensitivity begins to ebb.

{mira}"Oh thank god." She uncrosses her legs, and keeps them uncrossed. {mira}"I can SIT. I can actually sit without wanting to squirm out of my skin."

She shifts in the seat, testing. Manageable. She can think again.

{mira}"Don't get me wrong, I loved the swelling." She grins. {mira}"But there's a difference between 'fun sensitive' and 'can't ride the delivery cart without losing my mind.' You just saved my career, boss."

She hops off the seat, bouncing on her heels.

{mira}"Freedom. Sweet, sweet freedom."`;
        } else if (decrease && hasVulva) {
            this.text = `You dial the Sizer down. A gentle warmth draws inward and the heightened awareness between Mira's thighs dulls to a comfortable neutral.

{mira}"Oh." She blinks. {mira}"That was quick."

She shifts in the seat, presses her thighs together experimentally. The distracting sensitivity is gone. Just... normal.

{mira}"Back to baseline." She nods with satisfaction. {mira}"Thanks, boss. Clean and easy."

She hops off the seat and grabs her delivery bag.

{mira}"Same time next delivery?"`;
        } else if (!decrease && !hasVulva && highLevel) {
            this.text = `You activate the Sizer. The device hums deep and Mira gasps as heat surges between her thighs. She grips the armrests as the swelling starts, hard and heavy and relentless.

{mira}"Oh..." Her pants strain. {mira}"Oh, it's... oh god."

The growth doesn't stop. She can feel it throbbing against the fabric, heavy and hot, pressing insistently against her thigh. Her breath comes in short bursts.

{mira}"It's so heavy." She looks down with wide, hungry eyes. The outline against her pants is impossible to miss. {mira}"I can feel it pulsing. Every heartbeat. It's..."

She presses her thighs together and her eyes roll back.

{mira}"I need to go home RIGHT NOW." She's flushed everywhere, grinning shamelessly. {mira}"Like, immediately. Do not pass deliveries, do not collect packages. Home. Now."`;
        } else if (!decrease && !hasVulva) {
            this.text = `You activate the Sizer. The device hums and warmth spreads through Mira's lap. Her eyes widen as she feels the gradual expansion, new weight settling, more presence than before.

{mira}"Oh." She looks down. {mira}"There's... more there."

She shifts in the seat, feeling the new heft. It's not dramatic, but it's unmistakable. Something heavier, fuller, more noticeable against her thigh.

{mira}"Huh." She does a little hip wiggle. {mira}"That's different. Good different."

She stands up and adjusts her pants, getting used to the changed balance.

{mira}"Best delivery day EVER."`;
        } else if (decrease && !hasVulva && highLevel) {
            this.text = `You dial the Sizer down. Mira exhales with relief as the pressure eases between her thighs, the impossible tightness in her pants loosening to something manageable.

{mira}"Oh, thank you." She shifts in the seat. {mira}"I can sit like a normal person again."

She adjusts her pants, which finally have some room in them.

{mira}"Love having it, boss. Honestly. But there's a difference between a fun surprise and 'can't sit on the delivery cart.'" She grins. {mira}"This is way more manageable."

She stands up and takes a test walk, nodding with satisfaction.

{mira}"Lifesaver. Absolute lifesaver."`;
        } else {
            this.text = `You dial the Sizer down. The warmth draws inward and Mira feels the subtle retreat, a little more compact, a little more tucked away.

{mira}"Nice and tidy." She nods, adjusting her pants. {mira}"That's more like it."

Quick and easy. She can focus on deliveries instead of what's in her pants.

She hops off the seat and grabs her bag.

{mira}"Thanks, boss. Same time next delivery?"`;
        }

        const archetypeScene = checkMiraArchetypeCompletion();
        if (archetypeScene) {
            gameState.flags._mira_delivery_archetype_scene = archetypeScene;
            saveState();
        }

        gameState.flags._mira_delivery_stat = { stat: 'genitaliaSize', newValue: newGS };
        saveState();

        this.actions = [
            { label: '"Suits you."', nextScene: 'mira_delivery_portrait' }
        ];
    },
    actions: []
};

SCENES['mira_delivery_6_dismiss'] = {
    id: 'mira_delivery_6_dismiss',
    image: '',
    speaker: 'Mira',
    text: `{mira}"Aw, really?" She hops off the seat with a sigh.

{mira}"I get it, I get it. 'Delicate equipment,' 'sensitive calibrations,' blah blah." She air-quotes with her fingers, grinning.

{mira}"But you'll let me know when it's ready, right? Because I have PLANS for that thing."

She grabs her bag and heads for the door.

{mira}"Same time next delivery?"`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
    },
    actions: [
        { label: '"See you, Mira."', nextScene: 'workshop_main' }
    ]
};

// ---- DELIVERY 7: Genital Reshaper (genitalia toggle 0↔1) ----

SCENES['mira_delivery_7'] = {
    id: 'mira_delivery_7',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + 1, 100);
        saveState();

        const hasVulva = gameState.npcs.mira.body.genitalia === 0;

        if (hasVulva) {
            this.text = `Mira drops her package on the workbench and wanders over to the Genital Reshaper, patting the casing fondly.

{mira}"Boss." She hops onto the seat and swings her legs. {mira}"I miss it. I miss having something there, you know? That warm little weight between my legs. The way it just... nestles."

She sighs wistfully.

{mira}"I want it back. I want to feel all of this..." She gestures at her current body. {mira}"...with a cock again. Different body now, right? Gotta see how it all fits together."

She settles into the seat, wiggling with anticipation.

{mira}"Hit me, boss."`;
        } else {
            this.text = `Mira drops her package on the workbench and wanders over to the Genital Reshaper, patting the seat like an old friend.

{mira}"Boss. I love what I've got going on." She gestures at her lap. {mira}"But I'm curious. I want to see what the other side feels like with everything else I've got going on now."

She settles into the seat and looks up at you.

{mira}"The first time I swapped, I barely had any of this." She gestures at the rest of her body. {mira}"Now I want to feel what being sensitive is like when you've got all this going on. You know?"

She grins eagerly.

{mira}"Let's swap it up."`;
        }
    },
    actions: [
        { label: '"Let\'s do it."', nextScene: 'mira_delivery_7_demo' },
        { label: '"That one\'s not calibrated."', nextScene: 'mira_delivery_7_dismiss' }
    ]
};

SCENES['mira_delivery_7_demo'] = {
    id: 'mira_delivery_7_demo',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        const oldGenitalia = gameState.npcs.mira.body.genitalia;
        const newGen = oldGenitalia === 0 ? 1 : 0;
        gameState.npcs.mira.body.genitalia = newGen;
        gameState.npcs.mira.body.genitaliaSize = 0; // Reset on reshape
        gameState.npcs.mira.trust += 2;
        recordNpcBodyChange('mira');
        saveState();

        this.image = getFlirtGenitalImagePath('mira', newGen, 0) || getNpcImagePath('mira');

        if (newGen === 1) {
            // Gaining penis
            this.text = `You activate the Reshaper. Mira grips the armrests as the device hums to life, deeper and louder than the other devices.

The warmth hits like a wave. She gasps as the change begins, familiar and thrilling and terrifying all at once. She feels herself reshaping, the pressure building, something new pushing into existence.

{mira}"Oh..." Her eyes go wide. {mira}"There it is. There it is!"

She looks down, watching the front of her pants shift. A breathless laugh escapes her.

{mira}"I forgot how wild this feels. Every single time, it's like..." She shudders as the last of the change settles. {mira}"Like my whole body just rebooted."

She shifts in the seat, getting used to the new weight and presence between her thighs.

{mira}"Hello again, old friend." She pats her lap and then immediately flushes bright red. {mira}"I mean, I, okay, I'm talking to my crotch, this is fine, everything is fine."

She stands up on slightly wobbly legs, adjusting her pants.

{mira}"Best delivery day EVER. Again."`;
        } else {
            // Gaining vulva
            this.text = `You activate the Reshaper. Mira grips the armrests as the device hums to life, deep and resonant.

The warmth floods through her. She gasps as she feels the change, a retreating, a reshaping, everything rearranging. The weight between her thighs dissolves into something softer, warmer, more diffuse.

{mira}"Oh..." She presses her thighs together as the sensation settles. {mira}"Oh wow. That's... SO different."

She shifts in the seat and her breath catches. The sensitivity is immediate, nothing like the focused pressure of before, this is everywhere, a humming warmth spread across a wider surface.

{mira}"It's like..." She searches for words, cheeks flushed. {mira}"Like going from a spotlight to a whole sunset. Everything's warm. Everything's aware."

She stands up carefully, legs pressing together, and takes a few experimental steps.

{mira}"Okay. Okay yeah." She's grinning. {mira}"I needed to know what this felt like with everything else. And it's... wow."

She fans herself.

{mira}"Best delivery day EVER. I'm going straight home."`;
        }

        const archetypeScene = checkMiraArchetypeCompletion();
        if (archetypeScene) {
            gameState.flags._mira_delivery_archetype_scene = archetypeScene;
            saveState();
        }

        gameState.flags._mira_delivery_stat = { stat: 'genitalia', newValue: newGen };
        saveState();

        this.actions = [
            { label: '"Suits you."', nextScene: 'mira_delivery_portrait' }
        ];
    },
    actions: []
};

SCENES['mira_delivery_7_dismiss'] = {
    id: 'mira_delivery_7_dismiss',
    image: '',
    speaker: 'Mira',
    text: `{mira}"Aw, come on!" She slides off the seat, pouting. {mira}"Not calibrated? You say that about everything."

She sighs dramatically but she's already grinning.

{mira}"Fine. But I'm putting in a formal request. Write it on your board. 'Mira wants to swap.' Official courier business."

She grabs her bag and slings it over her shoulder.

{mira}"Same time next delivery, boss."`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
    },
    actions: [
        { label: '"See you, Mira."', nextScene: 'workshop_main' }
    ]
};

// ============================================
// SEX SOLICITATION FALLBACK, Maxed-stat redirect
// ============================================
// When a delivery scene is picked but the stat is already at max,
// Mira comes in horny about her maxed body instead of decreasing.

SCENES['mira_delivery_sex'] = {
    id: 'mira_delivery_sex',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');

        const maxedStat = gameState.flags.mira_delivery_sex_stat || null;
        const miraBody = gameState.npcs.mira.body;
        const hasVulva = miraBody.genitalia === 0;

        const flavorText = {
            muscle: `Mira slams the door open so hard the hinges rattle. She's breathing hard. Not from the climb, from something else entirely. Her courier vest is straining across her shoulders and she keeps flexing her hands open and shut like she can't stop feeling herself.

{mira}"Boss." Her voice is low, rough. She rolls her shoulders and her arms bunch, every line of muscle visible through her sleeves. {mira}"I can't... I've been like this ALL day. Feeling my abs when I breathe, feeling my thighs press together when I walk, feeling these ..."

She flexes both arms, the fabric creaking.

{mira}"These PYTHONS. And these thighs. Gods, my thighs." She shifts her weight and her legs tense visibly. {mira}"I keep thinking about what I could DO with them. I could pick you up. I could hold you against that wall. I could wrap my legs around you and not let go."

She steps closer, eyes dark.

{mira}"I don't want a device today. I want to USE this body. On you."`,

            chest: `Mira stumbles through the door with her arms crossed tight over her chest, face flushed crimson. Every few seconds her grip shifts and she bites her lip.

{mira}"Boss, I have a problem." She uncrosses her arms just long enough to gesture at herself and immediately crosses them again with a hiss. {mira}"The girls are, they won't CALM DOWN."

She leans against the workbench, pressing her chest against the wood and shuddering.

{mira}"Every time my shirt moves I can feel my nipples and it's driving me INSANE. I've been like this since I woke up. I tried ignoring it. I tried adjusting my vest. I tried thinking about taxes."

Her eyes find yours, desperate and hungry.

{mira}"None of it works. I need your mouth on them, boss. Please. I am genuinely begging you. I will get on my knees and beg if that helps."`,

            butt: `Mira walks in slowly, deliberately, every step a rolling sway that makes her whole lower half bounce. She keeps looking over her shoulder at herself like she can't believe what she's seeing.

{mira}"Boss." She turns around and puts both hands on her hips. {mira}"Look at this."

She shifts her weight from one foot to the other and everything jiggles.

{mira}"It won't STOP. Every step. Every time I sit down and stand up. I can feel it bouncing when I go down stairs." She bites her lower lip hard. {mira}"I had to take the long route today because the short one has cobblestones and I nearly lost my mind."

She turns back to face you, cheeks burning.

{mira}"I can't think about anything except your hands on it. Squeezing it. I need you to just, grab it. Please. I'm going crazy."`,

            genitaliaSize: hasVulva
                ? `Mira barely makes it through the door. She's walking with her thighs pressed together, each step tiny and careful, and her face is absolutely wrecked, flushed, glassy-eyed, lips parted.

{mira}"I can't..." She grabs the edge of your workbench for support. {mira}"Boss, I'm... she's so swollen I can feel her with every STEP. My pussy is throbbing and I'm soaking through my pants and I've been like this for HOURS."

She squeezes her thighs together and a shudder runs through her whole body.

{mira}"I tried to finish my route. I really did. But I had to stop twice because the walking was... the friction was ..." She swallows hard. {mira}"I'm so sensitive I could scream."

Her eyes lock onto yours.

{mira}"I need you. Right now. I don't care about deliveries. I need your hands on me."`
                : `Mira comes through the door and immediately shuts it behind her, pressing her back against it. Her face is red and she's holding her courier bag strategically in front of her hips.

{mira}"Boss, we have a situation." She moves the bag just enough for you to see the obvious bulge straining against her pants. {mira}"He's been like this since I woke up. I can't... every time I walk, he rubs against my thigh and it's..."

She shifts her weight and winces.

{mira}"I'm so hard it HURTS. I tried thinking about boring things. I tried cold water. I even tried running, which was a huge mistake because, bouncing."

She drops the bag entirely, too frustrated to care.

{mira}"I've been hard for hours, boss. I can feel him pulsing. I need help. Please."`
        };

        const fallbackText = `Mira bursts through the door and kicks it shut behind her. She's flushed from head to toe, breathing fast, and the look in her eyes is unmistakable.

{mira}"Hey boss." Her voice is lower than usual. {mira}"I don't have a delivery today. Well, I do. But I dropped it off next door because I needed an excuse to come here."

She drops her bag on the floor and walks straight toward you.

{mira}"I've been thinking about you all morning. All WEEK, honestly. And I'm done pretending I came here for workshop stuff."

She stops right in front of you, close enough to touch.

{mira}"I want you. That's my delivery. Take it or leave it."`;

        this.text = (maxedStat && flavorText[maxedStat]) ? flavorText[maxedStat] : fallbackText;

        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + 1, 100);
        saveState();
    },
    actions: [
        { label: '"Come here."', nextScene: 'mira_sex_intro' },
        { label: '"Not today, Mira."', nextScene: 'mira_delivery_sex_reject' }
    ]
};

SCENES['mira_delivery_sex_reject'] = {
    id: 'mira_delivery_sex_reject',
    image: '',
    speaker: 'Mira',
    text: `Mira stares at you for a second, then lets out a long, shaky breath.

{mira}"Okay. Okay, yeah. That's, fine." She runs a hand through her hair and tries to compose herself. {mira}"Sorry. That was... forward. Even for me."

She picks up her bag, adjusting her vest with hands that aren't quite steady.

{mira}"I'll just... go finish my route. Walk it off." She manages a sheepish grin. {mira}"Cold fountain. Deep breaths. The usual."

She heads for the door, pausing with her hand on the frame.

{mira}"Rain check, though. Yeah?"`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
    },
    actions: [
        { label: '"Rain check."', nextScene: 'workshop_main' }
    ]
};

// Register normal delivery pool
SceneManager.registerPool('mira_delivery_normal', ['mira_delivery_1', 'mira_delivery_2', 'mira_delivery_3', 'mira_delivery_4', 'mira_delivery_5', 'mira_delivery_6', 'mira_delivery_7']);

// ============================================
// ACCIDENT SCENES - Device activation mishaps
// ============================================
// Stat-change accidents push one stat to an extreme (0 or 5/3).
// Player picks how much to keep: revert / adjust 1 / adjust 2 / keep.
// Cosmetic accidents (hair, eyes) have no stat changes.

// ACCIDENT: Hair turns pink
SCENES['mira_accident_hair_pink'] = {
    id: 'mira_accident_hair_pink',
    image: 'images/transformations/mira_accident_hair_pink.webp',
    speaker: '',
    text: `Mira leans in to examine a device with a softly glowing crystal. The crystal pulses...

FLASH

She blinks, dazed.

{mira}"What was... why are you looking at me like that?"

She catches sight of her reflection in a metal surface and SHRIEKS.

{mira}"MY HAIR! My hair is PINK!"

Her auburn locks have transformed into a vivid, bright pink, the color of cherry blossoms.

{mira}"How am I supposed to do deliveries looking like this?! Everyone will stare!"`,
    onEnter: function() {
    },
    actions: [
        { label: '"Actually, it looks really cute on you."', nextScene: 'mira_accident_hair_pink_resolve' }
    ]
};

SCENES['mira_accident_hair_pink_resolve'] = {
    id: 'mira_accident_hair_pink_resolve',
    image: '',
    speaker: 'Mira',
    text: `She freezes mid-panic.

"Cute? You think it looks... cute?"

She touches her pink hair self-consciously, then looks at her reflection again with less horror and more curiosity.

"I mean... pink IS a nice color. And it does make my eyes pop..."

She twirls a strand around her finger and smiles.

"You know what? Maybe I'll keep it. Until it fades, anyway."

You reach for the device and make a small adjustment. Another soft flash, and auburn floods back through her hair like paint in water.

{mira}"Oh! It's back!"

She runs her fingers through it, checking.

{mira}"Good as new. Though... part of me will miss the pink."

She grins at you.

{mira}"Thanks for being so nice about it. Most people would have laughed."`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + 1, 100);
        saveState();
    },
    actions: [
        { label: '"It really did suit you."', nextScene: 'workshop_main' }
    ]
};

// ACCIDENT: Hair turns white
SCENES['mira_accident_hair_white'] = {
    id: 'mira_accident_hair_white',
    image: 'images/transformations/mira_accident_hair_white.webp',
    speaker: '',
    text: `A device on the shelf begins to whir unexpectedly. Mira reaches out to steady it...

BZZT

A wave of energy passes through her, and you watch as the color drains from her hair, leaving it pure snow-white.

She blinks.

{mira}"Why do I feel tingly? And why do you look so... shocked?"

She catches her reflection.

{mira}"Oh no. Oh NO. I look like a grandmother! A YOUNG grandmother!"`,
    onEnter: function() {},
    actions: [
        { label: '"You look mysterious and elegant."', nextScene: 'mira_accident_hair_white_resolve' }
    ]
};

SCENES['mira_accident_hair_white_resolve'] = {
    id: 'mira_accident_hair_white_resolve',
    image: '',
    speaker: 'Mira',
    text: `She pauses her panic.

"Mysterious? Elegant? Me?"

She looks at her reflection with new eyes.

"I guess... it IS kind of dramatic. Like a sorceress from those old stories."

She poses dramatically, her white hair flowing.

"'I am Mira, the Silver-Haired Messenger! Beware my speed!'"

She giggles, then glances at you hopefully.

"It IS pretty cool, but... can you fix it?"

You tinker with the device, reversing the polarity. A soft hum, and warm auburn color seeps back into her hair from the roots down.

{mira}"Oh, there it is!"

She shakes her hair out, relieved.

{mira}"Good as new. Thanks for the compliment, though, and for the fix."`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + 1, 100);
        saveState();
    },
    actions: [
        { label: '"Anytime, Silver-Hair."', nextScene: 'workshop_main' }
    ]
};

// ACCIDENT: Eyes glow purple
SCENES['mira_accident_eyes'] = {
    id: 'mira_accident_eyes',
    image: 'images/transformations/mira_accident_eyes.webp',
    speaker: '',
    text: `Mira peers curiously into a device with a swirling violet core.

{mira}"What's making that glow? It's so pret..."

The core flares, and violet light fills her vision.

She staggers back, blinking rapidly.

{mira}"Ow! That was bright!"

She looks at you, and her eyes are glowing an eerie purple, violet light streaming from her irises.

{mira}"Why... why do you look so freaked out?"

You point at a reflective surface. She looks.

{mira}"AAAAAH! What's wrong with my eyes?!"`,
    actions: [
        { label: '"You look like a sorceress, it\'s amazing."', nextScene: 'mira_accident_eyes_resolve' }
    ]
};

SCENES['mira_accident_eyes_resolve'] = {
    id: 'mira_accident_eyes_resolve',
    image: '',
    speaker: 'Mira',
    text: `She stops panicking.

"A sorceress? Like Vessa?"

She looks at her reflection again, tilting her head.

"I mean... the glow IS kind of magical-looking. Like I've got secret powers."

She experiments with narrowing her eyes dramatically.

"'Deliver my package, mortal, or face my ARCANE WRATH!'"

She giggles, then blinks nervously.

"Okay, it's fun, but please tell me you can undo this?"

You adjust the device's violet core, dimming it carefully. The glow in her eyes fades, green irises returning.

{mira}"Oh, thank goodness."

She checks her reflection one more time, relieved.

{mira}"Back to boring old green. Though I have to admit... the purple was growing on me."

She winks.

{mira}"Thanks for the fix, and for making me feel powerful for a minute there."`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + 1, 100);
        saveState();
    },
    actions: [
        { label: '"Use your powers wisely."', nextScene: 'workshop_main' }
    ]
};

// ============================================
// NEW SYSTEMATIC ACCIDENT SCENES
// ============================================
// 8 stat accidents (max/min for chest, butt, muscle, genitaliaSize)
// + 1 double-device inflation (cosmetic comedy)
// Each stat accident: device fires → stat pushed to extreme → 4 choices

// Shared accident reaction texts by stat and final value
const ACCIDENT_REACTIONS = {
    chest: {
        5: '{mira}"WHOA. Okay. These are... wow. I can barely see my feet!" She cups herself with both hands, eyes huge. {mira}"Boss. BOSS. Look at them."',
        4: '{mira}"Ooh, still big! I like this actually..." She gives an experimental bounce and grins. {mira}"Impressive."',
        3: '{mira}"Hmm, a nice upgrade from where I started!" She adjusts her vest. {mira}"Very respectable."',
        2: '{mira}"Back to something manageable." She nods. {mira}"Practical. I can run with these."',
        1: '{mira}"Oh, they\'re tiny now!" She looks down, surprised. {mira}"Kind of cute though? Very aerodynamic."',
        0: () => gameState.npcs.mira.body.genitalia === 1
            ? '{mira}"They\'re just... gone." She pats her flat chest, blinking. Then looks down and grins. {mira}"Oh wow, I can see my cock without leaning forward! That\'s actually amazing."'
            : '{mira}"They\'re just... gone." She pats her flat chest, marveling. Then looks down and laughs. {mira}"I can see my feet without leaning forward! Do you know how long it\'s been?"'
    },
    butt: {
        5: '{mira}"BOSS. My butt is ENORMOUS." She cranes over her shoulder, jaw dropped. {mira}"I am NEVER fitting through a doorway again and I don\'t even care."',
        4: '{mira}"That\'s still a LOT of butt." She slaps it and watches the jiggle. {mira}"I kinda love it."',
        3: '{mira}"Nice and curvy! Cushion for the deliveries." She wiggles her hips. {mira}"Yeah, this works."',
        2: '{mira}"Back to normal-ish." She shrugs. {mira}"At least the barstools fit again."',
        1: '{mira}"Pretty flat back there now." She twists to look and grins. {mira}"Sleek! Aerodynamic! I bet I could shave a minute off my delivery route like this."',
        0: '{mira}"It\'s completely flat!" She does a little spin, testing the difference. {mira}"Wow, I\'m so light! No drag at all. I could sprint the whole route without slowing down."'
    },
    muscle: {
        5: '{mira}"HOLY MOLY." She flexes and her bicep bulges. {mira}"I could carry a HORSE. I could carry TWO horses!" She\'s vibrating with excitement.',
        4: '{mira}"Ooh, I\'m really strong!" She flexes proudly. {mira}"These delivery bags are going to feel like nothing."',
        3: '{mira}"Solid! Athletic!" She pokes her arm. {mira}"I look like I could actually win a fight now."',
        2: '{mira}"Toned. Nice." She nods. {mira}"Good balance of speed and strength."',
        1: '{mira}"Kind of noodle-armed." She waves her arm limply and giggles. {mira}"Soft and squishy! I look like a totally different person."',
        0: '{mira}"I have no muscles at all." She tries to flex and nothing happens. She bursts out laughing. {mira}"I\'m so SOFT! Feel my arm, boss, it\'s like a pillow!"'
    },
    genitaliaSize: {
        3: '{mira}"Oh WOW that\'s big." She shifts her weight, adjusting. {mira}"I mean... wow. I can really feel it."',
        2: '{mira}"That\'s a nice size." She nods, shifting. {mira}"Yeah, I can work with this."',
        1: '{mira}"Kind of average?" She shrugs. {mira}"Less in the way, at least."',
        0: '{mira}"Tiny!" She looks down and tilts her head curiously. {mira}"Like, really tiny. Huh." She shifts her weight experimentally. {mira}"Actually that\'s kind of neat, nothing in the way at all!"'
    }
};

// Get stat display name for accident text
function getAccidentStatName(stat) {
    return { chest: 'chest', butt: 'butt', muscle: 'muscles', genitaliaSize: 'genitals' }[stat] || stat;
}

// Check if Mira just completed an archetype, handle it, return the scene ID to chain to (or null)
function checkMiraArchetypeCompletion() {
    const npc = gameState.npcs.mira;
    if (!npc.hiddenArchetype || npc.archetypeAchieved) return null;
    if (!checkArchetypeAchieved('mira')) return null;
    handleArchetypeAchievement('mira');
    if (npc.hiddenArchetype === 'goddess' && !npc.goddessRevealed) {
        return 'mira_goddess_reveal';
    }
    if (npc.archetypeJustAchieved) {
        return 'mira_archetype_achievement';
    }
    return null;
}

// Get device name for accident text
function getAccidentDeviceName(stat, isReverse) {
    const devices = {
        chest: 'Chest Shaper',
        butt: 'Posterior Enhancer',
        muscle: 'Muscle Toner',
        genitaliaSize: 'Genital Sizer'
    };
    return devices[stat] + (isReverse ? ' (in reverse)' : '');
}

// Build a stat accident scene
function buildAccidentScene(sceneId, stat, extreme, deviceText, reactionText) {
    const maxVal = (stat === 'genitaliaSize') ? 3 : 5;
    const isMax = extreme === maxVal;

    SCENES[sceneId] = {
        id: sceneId,
        image: '',
        speaker: '',
        text: '',
        onEnter: function() {
            const mira = gameState.npcs.mira;
            const originalValue = mira.body[stat];

            // Store context for resolve scene
            gameState.flags.mira_accident_context = {
                stat: stat,
                originalValue: originalValue,
                extremeValue: extreme
            };

            // Apply extreme temporarily
            mira.body[stat] = extreme;
            enforceStatRestrictions('mira');
            saveState();

            // Show flirt image for the changed stat
            if (stat === 'genitaliaSize') {
                this.image = getFlirtGenitalImagePath('mira', mira.body.genitalia, extreme);
            } else {
                this.image = getFlirtTransformationImagePath('mira', stat, extreme) || getNpcImagePath('mira');
            }

            const device = typeof deviceText === 'function' ? deviceText(mira) : deviceText;
            const reaction = typeof reactionText === 'function' ? reactionText(mira) : reactionText;
            this.text = device + '\n\n' + reaction;

            // Build actions based on actual distance changed
            const diff = Math.abs(extreme - originalValue);
            const actions = [
                { label: '"Revert completely"', nextScene: 'mira_accident_choice_revert' }
            ];
            if (diff >= 2) {
                actions.push({ label: '"Adjust 1 step back"', nextScene: 'mira_accident_choice_adj1' });
            }
            if (diff >= 3) {
                actions.push({ label: '"Adjust 2 steps back"', nextScene: 'mira_accident_choice_adj2' });
            }
            if (diff >= 1) {
                actions.push({ label: '"Keep as is"', nextScene: 'mira_accident_choice_keep' });
            }
            this.actions = actions;
        },
        actions: []
    };
}

// Build all 8 stat accident scenes
buildAccidentScene('mira_accident_chest_max', 'chest', 5,
    `Mira sets down a package and leans against the Chest Shaper. A dial clicks under her elbow.\n\nFLASH\n\nThe device roars to life. Mira gasps and clutches her chest as warmth floods through her. Her modest bust begins to swell, rapidly, insistently, her vest straining at the seams.\n\n{mira}"Wh... what's, BOSS!"`,
    `Her breasts have ballooned to an absurd size. Buttons pop. Seams tear. She stares down at herself, speechless, then bursts out laughing.\n\n{mira}"LOOK AT THEM! Boss, I can't even see the FLOOR!"\n\nShe cups herself with both hands, grinning ear to ear despite the shock.\n\n{mira}"Okay. Okay wow. These are RIDICULOUS and I kind of love it?" She bounces experimentally and watches the result with wide eyes. {mira}"Oh my god, the JIGGLE. Boss. BOSS. Are you seeing this?"`
);

buildAccidentScene('mira_accident_chest_min', 'chest', 0,
    `Mira bumps a switch on the Chest Shaper as she squeezes past with a parcel. The device whines in reverse.\n\nBZZZZT\n\nA pulling sensation hits her chest. She drops the package and grabs herself.\n\n{mira}"What the, something's SHRINKING!"`,
    `Her chest has gone completely flat. She looks down, then up at you, then down again.\n\n{mira}"They're GONE." She pats herself, bewildered. {mira}"Like, fully gone. I can see my belt buckle for the first time in my life."\n\nShe takes a deep breath, and realizes she can breathe more easily.\n\n{mira}"Huh. That's actually kind of nice? But also VERY weird."`
);

buildAccidentScene('mira_accident_butt_max', 'butt', 5,
    `Mira sits on the Posterior Enhancer while waiting for you. She didn't realize the device was armed.\n\nWHOOOOSH\n\nThe seat vibrates and heat surges through her hips. Her eyes go wide.\n\n{mira}"Oh. OH. Something's happening back there..."`,
    `Her butt has expanded to enormous proportions. She's stuck in the seat, hips wedged tight.\n\n{mira}"BOSS!" She wiggles frantically, which only makes things jiggle more. {mira}"I'm STUCK! And also, oh my god, it's still GROWING!"\n\nThe device clicks off. She cranes around to look and her jaw drops.\n\n{mira}"That's... that's a LOT of butt. Like, a LOT a lot."`
);

buildAccidentScene('mira_accident_butt_min', 'butt', 0,
    `Mira leans against the Posterior Enhancer and accidentally kicks the reverse lever.\n\nHSSSSS\n\nCold energy pulls at her backside. She yelps and jumps up.\n\n{mira}"What just, why does my butt feel LIGHTER?"`,
    `She twists around to look and her eyes go wide.\n\n{mira}"It's FLAT." She pats herself, marveling. {mira}"Completely flat. Like, NOTHING there."\n\nShe does an experimental spin and grins.\n\n{mira}"Okay wait, I'm so LIGHT. I could outrun anyone in town like this!" She bounces on her toes. {mira}"No jiggle, no bounce, just pure speed. This is kind of amazing?"`
);

buildAccidentScene('mira_accident_muscle_max', 'muscle', 5,
    `Mira grabs a malfunctioning Muscle Toner to steady it. Bad idea.\n\nCRACKLE-SURGE\n\nEnergy courses through her body. Every muscle seizes, then GROWS.\n\n{mira}"NNGH, what, I can feel my arms, BOSS!"`,
    `She's massive. Biceps bulging, thighs like tree trunks, abs carved from stone.\n\n{mira}"Holy..." She flexes one arm and the sleeve of her courier shirt rips clean off. She stares at the bicep underneath.\n\n{mira}"BOSS! I'M HUGE!" She looks terrified and thrilled in equal measure. {mira}"I could bench-press this BUILDING!"\n\nShe picks up her delivery bag with one finger.\n\n{mira}"This weighs NOTHING now. Is this what being strong feels like? Because WOW."`
);

buildAccidentScene('mira_accident_muscle_min', 'muscle', 0,
    `A prototype Muscle Toner falls off a shelf. Mira catches it, and it activates in reverse.\n\nDRAIN\n\nStrength pours out of her like water. Her arms go limp, her legs wobble.\n\n{mira}"I feel like, like I'm made of pudding..."`,
    `She's completely drained. Her arms hang like wet noodles.\n\n{mira}"Boss..." She tries to pick up her delivery bag and can't lift it an inch. {mira}"I can't... I literally can't lift anything."\n\nShe waves her noodle arms helplessly and starts giggling despite herself.\n\n{mira}"I'm a NOODLE! An actual walking noodle! This is terrible and also kind of hilarious!"`
);

buildAccidentScene('mira_accident_gs_min', 'genitaliaSize', 0,
    (mira) => mira.body.genitalia === 1
        ? `The Genital Sizer crackles as Mira walks by. A reverse pulse catches her.\n\nZZZT\n\nShe gasps, hands flying to her crotch as her cock rapidly shrinks.\n\n{mira}"What, my cock just SHRANK!"`
        : `The Genital Sizer crackles as Mira walks by. A reverse pulse catches her.\n\nZZZT\n\nShe gasps, hands flying to her crotch as a tightening sensation pulls inward.\n\n{mira}"What, it just, everything SHRANK!"`,
    (mira) => mira.body.genitalia === 1
        ? `She looks down at herself, blinking.\n\n{mira}"Boss, my cock is... tiny." She shifts uncomfortably. {mira}"Like, REALLY tiny. Or wait, did it go all the way back to...?"\n\nShe checks, then shakes her head.\n\n{mira}"No, still there. Just... very, very small. Huh."`
        : `She looks down at herself, blinking.\n\n{mira}"Boss, my pussy feels... different. Smaller?" She shifts uncomfortably. {mira}"Like, REALLY small. Everything's just... tight."\n\nShe shifts her weight experimentally.\n\n{mira}"That's so weird. It's like nothing's even there."`
);

// 4 choice router scenes
SCENES['mira_accident_choice_revert'] = {
    id: 'mira_accident_choice_revert',
    image: '', speaker: '', text: '',
    onEnter: function() {
        gameState.flags.mira_accident_choice = 'revert';
        SceneManager.playScene('mira_accident_resolve');
        return 'redirect';
    },
    actions: []
};
SCENES['mira_accident_choice_adj1'] = {
    id: 'mira_accident_choice_adj1',
    image: '', speaker: '', text: '',
    onEnter: function() {
        gameState.flags.mira_accident_choice = 'adj1';
        SceneManager.playScene('mira_accident_resolve');
        return 'redirect';
    },
    actions: []
};
SCENES['mira_accident_choice_adj2'] = {
    id: 'mira_accident_choice_adj2',
    image: '', speaker: '', text: '',
    onEnter: function() {
        gameState.flags.mira_accident_choice = 'adj2';
        SceneManager.playScene('mira_accident_resolve');
        return 'redirect';
    },
    actions: []
};
SCENES['mira_accident_choice_keep'] = {
    id: 'mira_accident_choice_keep',
    image: '', speaker: '', text: '',
    onEnter: function() {
        gameState.flags.mira_accident_choice = 'keep';
        SceneManager.playScene('mira_accident_resolve');
        return 'redirect';
    },
    actions: []
};

// Shared resolve scene
SCENES['mira_accident_resolve'] = {
    id: 'mira_accident_resolve',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        const ctx = gameState.flags.mira_accident_context;
        const choice = gameState.flags.mira_accident_choice;
        if (!ctx) {
            SceneManager.playScene('workshop_main');
            return 'redirect';
        }

        const { stat, originalValue, extremeValue } = ctx;
        const isMax = extremeValue > originalValue;

        // Calculate final value based on choice
        let finalValue;
        switch (choice) {
            case 'revert':
                finalValue = originalValue;
                break;
            case 'adj1':
                finalValue = isMax ? extremeValue - 1 : extremeValue + 1;
                break;
            case 'adj2':
                finalValue = isMax ? extremeValue - 2 : extremeValue + 2;
                break;
            case 'keep':
            default:
                finalValue = extremeValue;
                break;
        }

        // Clamp to valid range
        const maxVal = (stat === 'genitaliaSize') ? 3 : 5;
        finalValue = Math.max(0, Math.min(finalValue, maxVal));

        // Apply
        gameState.npcs.mira.body[stat] = finalValue;
        enforceStatRestrictions('mira');
        recordNpcBodyChange('mira');

        // Trust: +2 for keep/adjust, +1 for revert
        const trustGain = (choice === 'revert') ? 1 : 2;
        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + trustGain, 100);

        // Clean up flags
        delete gameState.flags.mira_accident_context;
        delete gameState.flags.mira_accident_choice;
        saveState();

        // Update portrait
        this.image = getNpcImagePath('mira');

        // Build reaction text
        const reactionEntry = ACCIDENT_REACTIONS[stat]?.[finalValue] || '{mira}"Well... that happened."';
        const reaction = typeof reactionEntry === 'function' ? reactionEntry() : reactionEntry;

        let choiceNarration;
        if (choice === 'revert') {
            choiceNarration = `You carefully work the device controls, reversing the changes. Mira watches as her body shifts back to what it was.`;
        } else if (choice === 'adj1') {
            choiceNarration = `You dial the device back one notch. Mira shivers as her body adjusts partway.`;
        } else if (choice === 'adj2') {
            choiceNarration = `You dial the device back two notches. Mira gasps as the changes partially reverse.`;
        } else {
            choiceNarration = `You step back from the device. Mira looks down at herself, and decides she's keeping it.`;
        }

        this.text = choiceNarration + '\n\n' + reaction;

        // Check if this change completed an archetype
        const archetypeScene = checkMiraArchetypeCompletion();
        if (archetypeScene) {
            gameState.flags._mira_delivery_archetype_scene = archetypeScene;
            saveState();
        }

        gameState.flags._mira_delivery_stat = { stat: stat, newValue: finalValue, reverted: choice === 'revert' };
        saveState();

        this.actions = [
            { label: 'Continue', nextScene: 'mira_delivery_portrait' }
        ];

        UI.updatePlayerSidebar();
    },
    actions: []
};

// Double-device comedy accident (no stat changes)
SCENES['mira_accident_inflate_all'] = {
    id: 'mira_accident_inflate_all',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = 'images/transformations/mira_accident_inflate_all.webp';

        this.text = `Mira trips over a cable and grabs a shelf for balance. Her hand closes on the Chest Shaper's output tube. Her elbow hits the Posterior Enhancer's trigger. Both devices scream to life simultaneously.

FLASH-WHOOSH-CRACKLE

{mira}"WHAT..."

Everything swells. Breasts, butt, belly, her whole body inflates like a balloon. Her clothes strain and creak. Her courier vest pops open. Her belt gives up entirely.

{mira}"Boss! BOSS! I'm, I'm HUGE! EVERYTHING is huge!"

She staggers, trying to balance a body that's suddenly three times its normal volume. Her belly rounds out like she swallowed a weather balloon. Her breasts and butt compete for space.

{mira}"Oh my god." Her voice is breathless, but not from fear. Her cheeks are flushed, her eyes bright. {mira}"Oh my GOD this feels..."

She runs her hands over the taut curve of her belly, shivering.

{mira}"I'm like a, I'm like a BLIMP and it feels AMAZING. Boss, every inch of me is so sensitive I could, I could just..."

The devices crackle. Sparks fly. Both overload circuits blow at once.

POP. HISSSSSS.

The inflation reverses. Air (or magic, or whatever it was) rushes out. Mira deflates back to normal in seconds, stumbling as her center of gravity shifts.

She stands there, clothes ruined, hair wild, panting.

{mira}"..." She stares at the smoking devices. Then at you.

{mira}"Can we do that again?"`;

        // Trust +2 for the shared experience
        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + 2, 100);
        saveState();
    },
    actions: [
        { label: '"...Maybe when I fix the devices."', nextScene: 'workshop_main' }
    ]
};


// Register accident pool, stat accidents filtered by eligibility in mira_delivery_event
SceneManager.registerPool("mira_delivery_accident", [
    "mira_accident_chest_max",
    "mira_accident_chest_min",
    "mira_accident_butt_max",
    "mira_accident_butt_min",
    "mira_accident_muscle_max",
    "mira_accident_muscle_min",
    "mira_accident_gs_min",
    "mira_accident_hair_pink",
    "mira_accident_hair_white",
    "mira_accident_eyes",
    "mira_accident_inflate_all"
]);

// ============================================
// MIRA STORYLINE SCENES (Day 2 & Day 3)
// ============================================

// Day 2 Morning - Mira curious about devices, accidentally transforms
SCENES['mira_story_day2'] = {
    id: 'mira_story_day2',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');

        // Check if this is the player's first time meeting Mira
        if (!hasSeenNpcIntro('mira')) {
            // First meeting happens during Day 2 event - include introduction
            this.text = `You're barely awake when the workshop door bursts open. A young woman with windswept auburn hair rushes in, freckles dusting her cheeks and a worn leather messenger bag bouncing on her hip.

"Oh! You must be Harwick's heir!" She skids to a stop, eyes bright with excitement. "I'm Mira - I run deliveries around town. Your uncle was one of my regulars!" She bounces on her heels. "I've been dying to see this place up close. He never let anyone in while he was working, you know."

Before you can properly introduce yourself, she's already wandered over to your uncle's devices, reaching out toward a gleaming copper apparatus - the Chest Shaper.

"What does THIS one do? It's so pretty..."`;
            // Mark intro as complete
            markNpcIntroCompleted('mira');
            updateNpcLastSeenPlayer('mira');
        } else {
            // Player has already met Mira in town
            this.text = `You're barely awake when the workshop door bursts open. Mira rushes in, eyes bright with excitement.

"Morning! I couldn't stop thinking about this place - had to come see it again!"

Before you can respond, she's wandered over to your uncle's devices, reaching out toward a gleaming copper apparatus - the Chest Shaper.

"What does THIS one do? It's so pretty..."`;
        }
    },
    actions: [
        { label: '"Wait, don\'t touch that!"', nextScene: 'mira_story_day2_touch' }
    ]
};

SCENES['mira_story_day2_touch'] = {
    id: 'mira_story_day2_touch',
    image: '',
    speaker: '',
    text: `Too late. Her fingers brush the device's activation crystal and it hums to life. A soft glow envelops Mira's breasts...

The crystal cube in the corner flares bright as Aether streams out of it and into the device!`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
    },
    actions: [
        { label: 'Watch in alarm as the transformation happens', nextScene: 'mira_story_day2_transform' }
    ]
};

SCENES['mira_story_day2_transform'] = {
    id: 'mira_story_day2_transform',
    image: '',
    speaker: 'Mira',
    text: `The glow fades and Mira looks down at herself. Her modest courier vest is now stretched noticeably tighter across her breasts.

"Oh... OH!"

She touches her breasts experimentally, eyes wide.

"Did it... did that thing make them BIGGER?!"

Her shock quickly transforms into delighted wonder.

"This is AMAZING! They're so... bouncy!"`,
    onEnter: function() {
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.mira_story_day2_transformed) {
            gameState.flags.mira_story_day2_transformed = true;
            // Apply the transformation - increase Mira's chest by 1
            if (gameState.npcs.mira.body.chest < 5) {
                gameState.npcs.mira.body.chest += 1;
            }
            recordNpcBodyChange('mira');
            // Drain the crystal cube's aether (player started with 2)
            gameState.player.aether = 0;
            saveState();
            UI.updatePlayerSidebar();
        }
        // Show the chest flirt image at Mira's new level
        this.image = getFlirtTransformationImagePath('mira', 'chest', gameState.npcs.mira.body.chest);
    },
    actions: [
        { label: '"That device cost me all my Aether..."', nextScene: 'mira_story_day2_apologize' }
    ]
};

SCENES['mira_story_day2_apologize'] = {
    id: 'mira_story_day2_apologize',
    image: '',
    speaker: 'Mira',
    text: `Her joy fades slightly as she realizes what happened.

"Aether? Is that... the magical energy your uncle's notes mentioned? The stuff that makes the devices work?"

She looks genuinely apologetic, but can't stop glancing down at herself.

"I'm SO sorry! I didn't mean to use all your... whatever it was. But..."

She cups her new breasts experimentally, grinning despite herself.

"...holy moly, I really REALLY like what it did. Is that bad?"`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
    },
    actions: [
        { label: '"It looks good on you."', nextScene: 'mira_story_day2_flatter' },
        { label: '"I\'ll have to find more Aether somehow."', nextScene: 'mira_story_day2_practical' }
    ]
};

SCENES['mira_story_day2_flatter'] = {
    id: 'mira_story_day2_flatter',
    image: '',
    speaker: 'Mira',
    text: `Her whole face lights up.

"You think so? I've always wanted to be more... you know." She gestures at her chest with a laugh. "And now I AM!"

She adjusts her vest, struggling to get it to close properly, still grinning.

"Gonna need new clothes. Worth it though. SO worth it."

Before leaving, she throws her arms around you in an enthusiastic hug.

"Thank you! Seriously. Even if it was an accident, this is amazing." She pulls back, eyes sparkling. "I'm gonna call you boss from now on, okay? You're like... my transformation guru. I'll find a way to make this up to you, I promise!"`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        // Increase trust
        gameState.npcs.mira.trust += 5;
        saveState();
    },
    actions: [
        { label: 'Wave goodbye', nextScene: 'mira_story_day2_end' }
    ]
};

SCENES['mira_story_day2_practical'] = {
    id: 'mira_story_day2_practical',
    image: '',
    speaker: 'Mira',
    text: `She nods eagerly.

"I'll help! As a courier, I know every shop in town. Some of them sell things that... shimmer, you know? Things that might have Aether in them."

She adjusts her vest, struggling to get it to close properly, but she's still grinning.

"Let me look into it. It's the least I can do after using yours!"

Before leaving, she throws her arms around you in an enthusiastic hug.

"Thank you! Seriously, this is amazing." She pulls back, eyes bright. "I'm gonna call you boss from now on, okay? Like my own personal transformation wizard. I'll be back tomorrow with information, promise!"`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        // Increase trust
        gameState.npcs.mira.trust += 5;
        saveState();
    },
    actions: [
        { label: 'Wave goodbye', nextScene: 'mira_story_day2_end' }
    ]
};

SCENES['mira_story_day2_end'] = {
    id: 'mira_story_day2_end',
    image: '',
    speaker: '',
    text: `Mira practically skips out of the workshop, still glancing down at herself with delight. At the door she pauses and turns back.

{mira}"Oh, one more thing. I'm going to ask around town about Aether sources and stuff. Should only take a day." She grins. **"Stick around the workshop and look around until I come back, okay?"**

{mira}"I'll be back first thing tomorrow morning. Promise!"

She waves and disappears down the street. You're left alone. The crystal cube in the corner has gone dim, its Aether depleted. Perhaps Mira's courier knowledge will prove useful in finding ways to replenish it.`,
    onEnter: function() {
        gameState.flags.mira_story_day2_complete = true;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// Day 3 Morning - Mira returns, proposes partnership, directs player to Fiona
SCENES['mira_story_day3'] = {
    id: 'mira_story_day3',
    image: '',
    speaker: '',
    text: `The workshop door swings open and Mira rushes in, practically glowing. Her enhanced figure bounces noticeably as she moves.

{mira}"You know what happened to me yesterday?" She cups her chest with a grin. {mira}"Best thing that ever happened to me. Seriously."

She pulls up a stool, leaning in.

{mira}"And I've been watching people around town. You know what I noticed? Everyone's got something they wish was different about themselves. Barret keeps tugging at her neckline like she's trying to make room for something that isn't there. Fiona hunches like she's trying to disappear."

{mira}"You've got these amazing devices. **People want what you can give them. They just don't know it exists yet.**"`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
    },
    actions: [
        { label: '"What are you suggesting?"', nextScene: 'mira_story_day3_partner' }
    ]
};

SCENES['mira_story_day3_partner'] = {
    id: 'mira_story_day3_partner',
    image: '',
    speaker: '',
    text: `{mira}"Here's what I'm thinking." She taps the nearest device. {mira}"Get to know people. Build some trust. Once they're comfortable around you, they'll open up about what they really want." She gestures around the workshop. {mira}"Then you invite them here, and you make it happen."

She bounces on her heels.

{mira}"And I want in. I'll be your eyes and ears out there. I'll visit when I can, let you know what I hear." She glances at the Chest Shaper with obvious longing. {mira}"And maybe you can help me get even bigger sometime? Like, a LOT bigger?"

She grins. {mira}"What do you say? Partners?"`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
    },
    actions: [
        { label: '"Partners."', nextScene: 'mira_story_day3_end' }
    ]
};

SCENES['mira_story_day3_end'] = {
    id: 'mira_story_day3_end',
    image: '',
    speaker: '',
    text: `{mira}"YES!" She throws her arms around you. {mira}"Best day ever! You won't regret this, boss!"

She heads for the door, then turns back.

{mira}"Oh, and boss? Start with Fiona. She's the girl in the town square, short, shy, looks like a stiff breeze would knock her over." She winks. {mira}"I think she'd really benefit from what you do here. Just a hunch."

She disappears with a wave.

**The town of Millbrook is now open to explore.** Check the desire tracker for hints about what each townsfolk secretly wants.`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        gameState.miraWillingPartner = true;
        gameState.npcs.mira.trust += 4;
        gameState.flags.mira_story_day3_complete = true;
        unlockNpc('fiona');
        refreshAllNpcDesires();
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// ============================================
// MIRA DAY 8 - GENITAL RESHAPER ACCIDENT
// ============================================
// Mira lets herself in while the player is out, bumps into the Genital Reshaper,
// grows a penis, and is overwhelmed by the experience.

SCENES['mira_story_day8'] = {
    id: 'mira_story_day8',
    image: 'images/transformations/mira_reshaper_growth.webp',
    speaker: '',
    text: `The workshop door creaks open. Mira peers inside, package under one arm.

{mira}"Hello? Boss?"

No answer. You must be out. She shrugs and lets herself in, setting the package on the workbench with a grunt. Heavy one today.

She turns to leave, but her hip catches something. A brass device on the lower shelf, half-hidden under a cloth. The cloth slides off as she stumbles, and her hand grabs the device for balance.

It hums to life.

{mira}"Oh no. Oh no no no..."

A flash of warmth shoots through her core, settling low in her belly. Then lower. She freezes, eyes going wide, as something starts to shift between her legs. Pressure, heat, a growing sensation she's never felt before.

She looks down.

{mira}"What... **what is that.**"

A bulge is forming in her courier shorts. Growing. Stretching the fabric. She yanks the waistband forward and stares.

{mira}"IS THAT A... IS THAT MINE?!"

It is. And it's still growing.`,
    onEnter: function() {
        gameState.npcs.mira.body.genitalia = 1;
        gameState.npcs.mira.body.genitaliaSize = 0;
        gameState.flags.mira_tried_reshaper = true;
        recordNpcBodyChange('mira');
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'mira_story_day8_climax' }
    ]
};

SCENES['mira_story_day8_climax'] = {
    id: 'mira_story_day8_climax',
    image: 'images/transformations/mira_reshaper_orgasm.webp',
    speaker: '',
    text: `Mira stumbles back against the workbench, breathing hard. The growth has stopped but the sensation hasn't. If anything it's getting worse. Better. She can't tell.

Her new anatomy is straining against her pants, painfully hard, and every shift of fabric sends a jolt through her whole body.

{mira}"Okay. Okay okay okay." She grips the edge of the workbench, knuckles white. {mira}"Just... calm down. It'll pass. It'll..."

It doesn't pass.

She fumbles with her waistband and pulls it free, gasping as the cool air hits. It's right there, flushed and stiff, and she stares at it for about three seconds before her hand wraps around it like she's grabbing a lifeline.

{mira}"Oh GOD."

She doesn't last long. She can't. Every stroke is electric, nothing like anything she's felt before, the intensity building so fast she can barely breathe. She leans back against the workbench, legs shaking, hand moving furiously.

{mira}"Oh god oh god oh god oh..."

**She comes hard**, knees buckling, a strangled cry echoing off the workshop walls. It splatters across the stone floor in thick ropes.

She stands there panting, legs trembling, staring at the mess she just made.

{mira}"...holy moly."`,
    onEnter: function() {},
    actions: [
        { label: 'Continue', nextScene: 'mira_story_day8_discovery' }
    ]
};

SCENES['mira_story_day8_discovery'] = {
    id: 'mira_story_day8_discovery',
    image: 'images/transformations/mira_reshaper_cleanup.webp',
    speaker: '',
    text: '',
    onEnter: function() {
        this.text = `You return to the workshop to find Mira on her knees, scrubbing the floor with a rag she found somewhere. Her penis is still out, hanging between her thighs as she works.

She looks up at the sound of the door. Flushed face, damp hair sticking to her forehead, a grin that's equal parts sheepish and thrilled.

{mira}"BOSS!" She scrambles to her feet, rag in one hand, the other gesturing vaguely at herself. {mira}"Okay so. Funny story."

She takes a breath.

{mira}"I came in to drop off your package, and I bumped into one of your devices, and it gave me a penis." She says it like she's recapping a sports match. {mira}"And then I, um. Had a moment."

She glances at the damp patch on the floor.

{mira}"Several moments, actually. It was..." She bites her lip, eyes bright. {mira}"Boss, it was INCREDIBLE. Like nothing I've ever felt. I thought my legs were going to give out."

She bounces on her heels, still buzzing with energy despite the obvious exhaustion.

{mira}"I cannot believe your workshop just gave me a penis and the best orgasm of my life in the same five minutes. This place is AMAZING."`;

        gameState.npcs.mira.trust = Math.min((gameState.npcs.mira.trust || 0) + 1, 100);
        saveState();
    },
    actions: [
        { label: '"Looks good on you."', nextScene: 'mira_story_day8_keep' },
        { label: '"I can fix that. Hold still."', nextScene: 'mira_story_day8_reverse' }
    ]
};

SCENES['mira_story_day8_keep'] = {
    id: 'mira_story_day8_keep',
    image: '',
    speaker: '',
    text: `{mira}"You think so?" She looks down at herself, then back at you, beaming. {mira}"You really think so?"

She laughs, bright and giddy.

{mira}"Who am I kidding, of course it does. This whole thing is weird and amazing."

She tucks herself back into her pants, wincing as she adjusts. The fit is... not ideal. These were not designed to accommodate new anatomy.

{mira}"Okay, that's... snug." She shifts her hips, tugging at the waistband. {mira}"Really snug. But I can make it work. Just gotta keep it under wraps until I figure out the wardrobe situation."

She stands up straight. Does a little bounce. Grins wider.

She tosses the rag into your laundry pile and brushes off her knees.

{mira}"Boss, I gotta say... every time I come here, something incredible happens." She looks around the workshop with open wonder. {mira}"You've got devices that change people's bodies. I just grew a penis from bumping into a shelf. And it was the best thing that's happened to me all month."

She grabs her delivery bag and slings it over her shoulder.

{mira}"I'm keeping it. Obviously." She glances down at the front of her pants, where nothing looks obviously different. {mira}"And I'm coming back. Also obviously."

She pauses at the door, hand on the frame.

{mira}"Hey. Thanks for not making it weird. You're the best, you know that?"

She flashes you one more grin, brighter than any of the others.

{mira}"Same time next delivery. I'll bring something good."`,
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        gameState.npcs.mira.trust += 5;
        gameState.flags.mira_story_day8_complete = true;
        saveState();
    },
    actions: [
        { label: '"Wouldn\'t miss it."', nextScene: 'workshop_main' }
    ]
};

SCENES['mira_story_day8_reverse'] = {
    id: 'mira_story_day8_reverse',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        gameState.npcs.mira.body.genitalia = 0;
        gameState.npcs.mira.body.genitaliaSize = 0;
        recordNpcBodyChange('mira');
        gameState.npcs.mira.trust += 5;
        gameState.flags.mira_story_day8_complete = true;
        saveState();

        this.image = getNpcImagePath('mira');

        this.text = `{mira}"Fix it?" She looks down at herself, then back at you. {mira}"Oh. Right. Yeah, that's probably the responsible thing to do."

She doesn't sound entirely convinced.

You guide her to the Genital Reshaper and make careful adjustments to the controls. The device hums, softer this time, and Mira shudders as warmth rolls through her again.

{mira}"Oh... there it goes." She watches it shrink, recede, disappear. The familiar flatness of her shorts returns. She lets out a long breath.

{mira}"Okay. Back to normal." She forces a smile, but there's something behind it. A flicker.

She's quiet for a moment. Then:

{mira}"Hey, boss?" She's looking at the floor, cheeks still pink. {mira}"Could we... do that again sometime? On purpose?"

She looks up at you, and the enthusiasm is back, mixed with something hungrier.

{mira}"Because that was the most incredible thing I've ever felt and I am NOT done exploring it." She grins. {mira}"**This workshop just keeps getting better.**"

She grabs her delivery bag and heads for the door, pausing to look back.

{mira}"Same time next delivery. I'll be thinking about this until then."`;
    },
    actions: [
        { label: '"Anytime."', nextScene: 'workshop_main' }
    ]
};

// ============================================
// MIRA RANDOM WORKSHOP VISITS (After Day 3)
// ============================================

// ============================================
// SUMMON MIRA (Sandbox trust, player-initiated)
// ============================================

SCENES['summon_mira'] = {
    id: 'summon_mira',
    image: '',
    speaker: 'Mira',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('mira');
        gameState.currentTransformationTarget = 'mira';
        saveState();

        const arrivals = [
            `Mira bursts through the door before you even finish sending the message.

"I was already on my way! I could feel it in my bones, transformation day!" She grins, already eyeing the devices. "What are we trying today, boss?"`,
            `Mira shows up within minutes, practically vibrating with excitement.

"You know I trust you completely, right? Whatever device, whatever setting, I'm in." She bounces on her heels. "So? What's the plan?"`,
            `The door flies open.

"I RAN here. Literally sprinted." Mira's out of breath but beaming. "Remember that first time your device zapped me by accident? Best day of my life."

She steps up to the workbench.

"Let's make today even better."`,
            `Mira strolls in with a knowing smile.

"You called?" She stretches, settling into the workshop like it's her second home. "I've been thinking about possibilities. Big ones, small ones, weird ones..."

She wiggles her eyebrows.

"I'm up for anything. You know that."`,
            `Mira appears at the door, courier bag already set aside.

"The usual?" She grins. "Just kidding. There's nothing usual about what we do here."

She pulls up a stool and sits down, eyes bright with anticipation.

"Okay. Work your magic, boss. Make me something new."`
        ];

        this.text = arrivals[Math.floor(Math.random() * arrivals.length)];
    },
    actions: [
        { label: 'Choose a device', nextScene: 'device_target_selection' },
        { label: 'Maybe later', nextScene: 'workshop_main' }
    ]
};

