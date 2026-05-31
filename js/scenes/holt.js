// ============================================
// HOLT SCENES
// Extracted from scenes.js for modularity
// ============================================

SCENES['holt_workshop_arrival'] = {
    id: 'holt_workshop_arrival',
    image: '',
    imagePrompt: null,
    speaker: 'Holt',
    text: '',
    onEnter: function() {
        if (gameState.npcs.holt.firstDesireFulfilledDay !== null) {
            SceneManager.playScene('holt_transformation_ready');
            return 'redirect';
        }
        this.image = getNpcImagePath('holt');
        this.text = `Holt enters the workshop with a soldier's caution, scanning the room before stepping fully inside.\n\n{holt}"Interesting." She examines a device with methodical attention. {holt}"I've seen many things in my years of service. Nothing like this." She straightens up. {holt}"Let's proceed."`;
    },
    actions: [
        { label: 'Show the devices', nextScene: 'holt_transformation_ready' }
    ]
};

SCENES['holt_transformation_ready'] = {
    id: 'holt_transformation_ready',
    image: '',
    imagePrompt: null,
    speaker: 'Holt',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('holt');
        gameState.currentTransformationTarget = 'holt';
        saveState();

        const npc = gameState.npcs.holt;
        const desire = npc?.currentDesire;
        const label = desire?.label?.toLowerCase() || 'a change';
        const thresholds = getNpcTrustThresholds('holt');
        const horny = (npc.trust >= thresholds.intimate) || npc.hiddenArchetype === 'goddess';

        if (horny) {
            this.text = `Holt stands very still. Her jaw is tight, her hands clasped behind her back — but her eyes are searching yours.\n\n{holt}"I'd like ${label}." Her voice is quieter than usual. {holt}"I trust you." A pause, like the words cost her something. {holt}"Completely."`;
        } else {
            this.text = `Holt stands at attention, composed and measured.\n\n{holt}"I'd like ${label}." She meets your eyes steadily. {holt}"Whenever you're ready."`;
        }
    },
    actions: [
        { label: 'Select a device', nextScene: 'device_selection' },
        { label: 'Changed your mind?', nextScene: 'workshop_main' }
    ]
};

// Generate NPC invite to workshop scenes

// ============================================
// HOLT SEX SCENES
// ============================================

SCENES['holt_sex_intro'] = {
    id: 'holt_sex_intro',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('holt', 'base');
        markSexUnlocked('holt');

        // --- Variables ---
        const npcBody = gameState.npcs.holt.body;
        const playerBody = gameState.player.body;
        const holtM = npcBody.muscle;
        const holtC = npcBody.chest;
        const holtB = npcBody.butt;
        const holtGS = npcBody.genitaliaSize;
        const holtHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerM = playerBody.muscle;
        const playerB = playerBody.butt;
        const playerGS = playerBody.genitaliaSize;
        const npcChest = getBodyStatDesc('holt', 'chest');
        const npcButt = getBodyStatDesc('holt', 'butt');
        const npcGenSize = getBodyStatDesc('holt', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        // --- Part 1: Holt's Body (THE BRACE — front-loaded) ---
        let part1;
        if (holtM <= 1) {
            if (holtC <= 1) {
                part1 = `Holt stands at the edge of the workbench, hands at her sides. She's already undressed — folded her clothes in a neat stack on the chair. Guard habit. Her body is slight, narrow, almost boyish. Flat chest, visible collarbones, lean limbs with none of the bulk she carried for fifteen years. She chose this.\n\nShe stands at attention without meaning to. Shoulders square, chin up, spine straight. Then she catches herself and forces her shoulders down. They creep back up.\n\n{holt}"I'm smaller than I've ever been." Not a complaint. An observation, delivered like a field report. She looks down at her flat chest, her narrow hips, the body she traded armor for. {holt}"I wanted to know what it's like. To not be the big one." Her steel grey eyes find yours. Steady. Honest. {holt}"I don't know what happens next."`;
            } else if (holtC <= 3) {
                part1 = `Holt undresses with military efficiency — each garment folded, stacked, squared away. When the shirt comes off her ${npcChest} shift and she freezes. Looks down. Her jaw tightens — the brace, shoulders squaring against a sensation that isn't an attack.\n\nThen the sensation passes and she exhales. Her body softens by a fraction.\n\n{holt}"They move." She says it like she's filing a report on unexpected equipment behavior. She cups one experimentally, watches it settle in her palm. {holt}"I thought they'd be firm. Like muscle." She lets go and it sways. She watches it happen. {holt}"They're not like muscle at all."`;
            } else {
                part1 = `Holt pulls her shirt over her head and her ${npcChest} spill free — heavy, full, completely out of proportion on her slight frame. She stands there, rigid. The brace: shoulders locked, breath held, jaw set. She's bracing for impact that already happened.\n\nHer chest moves when she breathes and she stares down at it like misbehaving equipment. She grabs one breast to steady it — too hard, winces, loosens her grip. {holt}"They're heavier than I calculated." She shifts her weight and they shift with her and she watches it happen with genuine confusion. {holt}"I thought bigger meant more feminine. Like heavier armor means more protection." A pause. {holt}"The framework was wrong." She looks at you. Not embarrassed — recalibrating. {holt}"I don't know what to do with them."`;
            }
        } else if (holtM <= 3) {
            part1 = `Holt strips with the efficiency of someone who's changed in barracks a thousand times. No hesitation about the nudity — it's the vulnerability underneath she's not prepared for. Her body is toned, functional — the guard's frame rebuilt in a different shape. Her ${npcChest} sit on a frame that knows how to move.\n\nShe stands there and her hands want to clasp behind her back. She lets them. {holt}"I feel..." She tests her own arm, squeezes the muscle there. Familiar capability in unfamiliar packaging. {holt}"This feels right. Mostly." She rolls her shoulders. {holt}"I can hold a position. I can brace." Her jaw tightens — the brace, reflexive, unnecessary. She forces it to relax. {holt}"I keep doing that."`;
        } else {
            part1 = `Holt strips and her body fills the space — dense muscle, broad shoulders, powerful limbs. Stronger than she was as a man, and the awareness of it shows in how carefully she moves. Every gesture is measured, checked.\n\nShe flexes one arm, watches the muscle bunch. Her expression is complicated — not pride, not confusion. Something between. {holt}"I'm stronger than I was. Before." She means before everything. She opens and closes her fist, testing. {holt}"I don't have a protocol for this." Her ${npcChest} sit on a chest wall that could crack stone. She moves and they move and she tenses — the brace again, shoulders squaring against sensation. {holt}"What do I do with this?" She's not performing helplessness. She genuinely doesn't know what comes next when you're the most powerful person in the room and the room isn't a battlefield.`;
        }
        // Part 1 butt modifier
        if (holtB >= 5) {
            part1 += `\n\nHer ass is enormous — she chose it the way she'd choose heavier armor, assuming more is better. She shifts her weight and the mass throws off her stance. She adjusts, overcorrects, adjusts again. Fifteen years of trained balance, useless. {holt}"My center of gravity is wrong." Pure observation. She touches her own hip, traces the curve. Something about her own shape surprises her and she doesn't say what.`;
        } else if (holtB >= 4) {
            part1 += ` Her ${npcButt} shifts when she moves — more weight than she's used to carrying there. She notices. Files it away.`;
        } else if (holtB <= 1) {
            part1 += ` Her hips are narrow, lean — the body of someone who sat on hard benches for fifteen years without registering it. Military through and through.`;
        }

        // --- Part 2: Getting Close (power dynamics + THE BRACE softening) ---
        let part2;
        const bothPetite = playerM <= 1 && holtM <= 1;
        if (playerM >= 5 && holtM <= 1) {
            part2 = `You step toward her and she has to look up. Way up. Your frame dwarfs hers entirely — when your hands settle on her waist, your fingers nearly meet behind her back. She tenses. The brace. Shoulders square, breath held —\n\nThen your hands are warm and she's not under attack and the brace was useless. Her shoulders drop. Her breath comes out shaky.\n\n{holt}"I've never been the small one before." Not wistful. Trying it on. She presses against you, her slight body folding into yours, and something in her face changes. Relief. Quiet, enormous relief. For once in her life she doesn't have to hold the line. {holt}"You can hold me. If you want." Permission granted. Permission she's never given anyone.`;
        } else if (playerM >= 5 && holtM >= 2) {
            part2 = `You close the distance and she meets you — not yielding, assessing. Her hands test your arms, your shoulders. Trained evaluation. She's mapping your strength against hers and finding yours greater.\n\nShe nods once. Decision made. {holt}"I trust strong people. I've had to." She positions herself against you. Not submission — the trained trust of a soldier who knows when to follow a capable lead. {holt}"Show me what to do." An order, framed as a request. The only kind she knows how to make.`;
        } else if (playerM <= 1 && holtM <= 1) {
            if (playerC >= 4 && playerB >= 4) {
                part2 = `You step close and she reaches for you — both slight, both light, your bodies meeting easily until she encounters the swell of your chest. She stops. Looks down. Back up. Her hand hovers.\n\n{holt}"Can I..." She doesn't finish. Military manners. She doesn't assume access. You nod and her hand settles on your chest with the careful pressure of someone handling something she's never held before. Then her other hand finds your ass and she tenses — at how much she felt it, at the shape of you, at all of it. She doesn't let go. {holt}"You're built like nothing in my field manual."`;
            } else if (playerC >= 4) {
                part2 = `You step close and she reaches for you — and stops, hands hovering near your chest. She stares. She knows she's staring and she can't stop.\n\n{holt}"Can I..." She waits. When you nod, she touches with careful fascination — not expert hands, exploratory ones. She traces the shape, cups the weight. Her breath catches. {holt}"I thought I understood breasts from having them." She shakes her head slowly. {holt}"Seeing them on someone else is different." She doesn't remove her hands.`;
            } else if (playerB >= 4) {
                part2 = `You step close and she pulls you in — both slight, both light. Her hands slide down your back and find your ass. She grabs it because it's there and it feels natural and then she realizes what she's doing and almost lets go.\n\nDoesn't. Holds on. {holt}"Sorry, I just —" She doesn't finish. She's not sorry. Her grip tightens. Something loosens in her face. The brace, finally, starting to soften.`;
            } else {
                part2 = `You step close and she pulls you in. Two slight bodies, all angles and warmth. Neither of you is the strong one. Neither of you has a roadmap.\n\nHer hands find your ribs, your hip, the line of your shoulder. She maps you with a soldier's attention and a beginner's care. {holt}"I don't know who's supposed to lead." She searches your face. {holt}"I keep waiting for orders that aren't coming." A breath. {holt}"Because this isn't that kind of mission." Something loosens. The brace, finally, starting to soften. She leans her forehead against yours.`;
            }
        } else if (playerM <= 1 && holtM >= 4) {
            part2 = `You step close and she wraps around you — and then freezes. She felt how slight you are under her hands. How easily she could hurt you.\n\nEvery motion becomes measured. She holds you like she's handling something precious. Her powerful arms settle around you with exaggerated gentleness. {holt}"I need to be careful." Not an apology — a protocol. She's the guard protecting the civilian. But the civilian is here by choice and she doesn't have a field manual for what happens next.\n\nHer grip loosens, finds a middle ground between protective and present. {holt}"Tell me if I'm too much."`;
        } else if (playerM <= 1 && holtM >= 2) {
            part2 = `You step close and she pulls you in — her body warmer and denser than yours, your slight frame settling against her. She holds you with easy strength, instinct kicking in before protocol.\n\nShe adjusts you in her arms. Not a suggestion — a placement. Then catches herself. {holt}"Sorry. Guard habit." She loosens her grip, gives you room. The brace in her shoulders softens when you press back against her. {holt}"You can stay close. I'd — I'd like that."`;
        } else if (holtM >= 5 && playerM >= 5) {
            part2 = `You pull her close and she doesn't move. She pulls back and you don't move. You look at each other.\n\n{holt}"You too?" Two soldiers in the same situation. Something loosens in her face — the closest she gets to a grin. The contest becomes something else — hands gripping, bodies testing, and she realizes she doesn't have to defer and she doesn't know what to do with that freedom.\n\nHer grip softens first. Not weakness — choice. {holt}"I don't have to be the strong one here." She says it like a discovery. {holt}"We're the same."`;
        } else {
            part2 = `You close the distance and she lets you. Her hands settle on your arms — testing, reading, the way she'd assess a fellow guard. She nods once, satisfied with whatever she found.\n\nShe positions herself against you. Methodical. She's building a framework from nothing — no experience, no reference points, just a disciplined person trying to figure out where the pieces go. Her hands find your waist and she holds on. {holt}"I'm ready." She says it the way she'd say it before a watch shift. Then softer: {holt}"I think I'm ready."`;
        }
        // Part 2 modifiers
        if (playerC >= 4 && !bothPetite) {
            part2 += ` Her gaze drops to your chest. She catches herself, looks away — military propriety. Then back. {holt}"Can I..." She reaches out and touches with careful pressure. Not expert. Reverent.`;
        }
        if (playerB >= 4 && !bothPetite) {
            part2 += ` Her hand finds your ass during the embrace — grabs, holds, then she realizes what she's doing. Almost lets go. Doesn't. Her jaw works. She says nothing. But she held on.`;
        }
        if (holtC >= 5) {
            part2 += ` Her massive chest presses between you and she tenses — too much sensation in too many places. She's trying to manage them like equipment and failing. When you take the weight in your hands she exhales with visible relief. Someone else is handling it.`;
        }
        if (holtM >= 5 && !(holtM >= 5 && playerM >= 5) && !(playerM <= 1 && holtM >= 4)) {
            part2 += ` She moves you without meaning to — adjusts your position with one hand, casual, instinctive. Then notices. {holt}"Sorry. I don't know my own —" She flexes her hand. {holt}"Everything is stronger than I expect."`;
        }

        // --- Part 3: No oral phase (male NPC rule) — instead, the moment before ---
        let part3;
        if (holtM <= 1) {
            part3 = `She's breathing faster now and she doesn't know what to do with her hands. They go to her sides, then her thighs, then the workbench edge. Guard discipline looking for a post to hold.\n\n{holt}"I haven't done this before." Flat. Honest. She says it the way she'd report a gap in her training. {holt}"I don't know what it's supposed to feel like. I don't have a comparison." She meets your eyes. {holt}"So whatever happens is the first time and I'd like it to be with you."\n\nThe brace comes one more time — shoulders square, breath held. She's waiting for the order to advance. You touch her face instead. Her jaw unclenches. Her eyes close. When they open, something has shifted. She's not bracing anymore. She's present.`;
        } else if (holtM <= 3) {
            part3 = `Her hands find you and hold on — functional grip, guard's instinct. She's shaking slightly. Not fear. Anticipation she doesn't have a protocol for.\n\n{holt}"I should tell you something." She swallows. {holt}"I don't know what I'm doing. I was a guard for fifteen years and I know how to hold a line and I don't know how to do this." Her grip tightens. {holt}"But I want to. I want to do this."\n\nShe tenses — the brace, one more time. Then your hand finds the small of her back and she softens against you. The discipline that held her together for fifteen years steps quietly aside. {holt}"Tell me what to do." Not an order. A request. The first one she's made that isn't about duty.`;
        } else {
            part3 = `She's holding you and trying not to hold too hard. Every instinct says brace, grip, secure. But this isn't a perimeter and you're not a weapon and she's finding the difference in real time.\n\n{holt}"I should warn you." Her voice is controlled. Barely. {holt}"I haven't done this. Any of this. And I'm —" She looks down at her powerful arms, her dense frame. {holt}"I'm very strong right now and I don't know how to be gentle yet."\n\nThe brace again — jaw set, muscles coiled. You put your hand on her chest, over her heart. It's hammering. She looks at your hand. Looks at you. The coil releases, slow, like a fist uncurling. {holt}"I'll follow your lead." Gratitude underneath the words. Someone gave her an order she knows how to follow.`;
        }

        const opening = part1 + '\n\n' + part2 + '\n\n' + part3;

        // --- Genital Branches (NO oral phase — straight to the act) ---

        // === PV: player penis + Holt vulva ===
        let pvText;
        if (playerM >= 5 && holtM <= 1) {
            pvText = `You lift her onto the workbench — she weighs nothing, her slight body settling in your hands like something she's never been before: held. Her legs wrap around you, and when you press your ${playerGenSize} cock against her pussy she tenses. The brace. Shoulders square, breath held, jaw set —\n\nYou push inside and the brace shatters. Her eyes go wide. Her mouth opens. Nothing comes out for a long moment. Then:\n\n{holt}"Is it supposed to feel like that?" Yes. Yes it is. She nods once, processing, and then you thrust and her head drops back and her body does something she never authorized — it arches into you, pulls you deeper, moves on instinct she didn't know she had.\n\nShe holds onto your arms. Not gripping — anchoring. Her slight frame rocks with each thrust and she lets it happen. For the first time in her life, someone else is the strong one. She doesn't have to hold anything. Just feel.`;
        } else if (holtM >= 4 && playerM <= 1) {
            pvText = `She positions you on the workbench with one arm — careful, measured. She straddles you and takes your ${playerGenSize} cock in her hand. Looks at it. Looks at you.\n\n{holt}"Tell me if —" She doesn't finish. She guides you to her pussy and sinks down. Slowly. Agonizingly slowly. She's watching your face like a perimeter check — any sign of distress and she stops immediately. Her powerful thighs control every inch of the descent.\n\nWhen she's taken all of you she goes still. Something registers she didn't prepare for. {holt}"Oh." Just that. Her hips move — tentative, then less tentative, finding a rhythm that's methodical at first and then isn't. Her hands brace on the workbench and it groans under her grip. She doesn't notice. She's somewhere else entirely.`;
        } else if (holtM >= 5 && playerM >= 5) {
            pvText = `Neither of you yields — the approach becomes a negotiation of strength, hands gripping, bodies testing. She reaches between you and takes your ${playerGenSize} cock. Guides it to her pussy. Sinks onto you while you're both still locked in it.\n\nThe penetration breaks the stalemate. She gasps — the first sound she's made all scene that she didn't plan. You thrust and she braces, matching your force, and for a moment she's back on the training ground, holding the line. Then the sensation hits and the training ground dissolves.\n\n{holt}"That's —" She pushes back against you. Hard. {holt}"Again." Not an order. Not a request. Just need, coming out before she can stop it.`;
        } else {
            pvText = `She lies back on the workbench, drawing you down. Her thighs part and she breathes — counted breaths, steady, the way she'd breathe through a forced march. You press your ${playerGenSize} cock against her pussy and she tenses. The brace.\n\nYou push inside and the brace collapses. Her hands fly to your arms, gripping — not pulling, not pushing. Just holding on. Her breath breaks rhythm. Her eyes are wide open, fixed on yours.\n\n{holt}"Is it supposed to feel like that?" Genuine question. She has no comparison. You move and she holds still, processing, and then her hips start to respond — tentative, unpracticed, following your rhythm because it's the best data she has. Her jaw unclenches. Her eyes soften. She's stopped expecting the worst.`;
        }
        // PV stat modifiers
        if (holtC >= 5 && !(playerM >= 5 && holtM <= 1)) {
            pvText += `\n\nHer massive chest sways with every thrust and she keeps looking down at it like misbehaving equipment. She grabs one breast to steady it — then your hand covers hers and she lets go. Lets you take the weight. Her eyes close. {holt}"That's better." She means someone else is managing the thing she couldn't figure out.`;
        } else if (holtC >= 4) {
            pvText += `\n\nHer ${npcChest} shift with the rhythm and she glances down each time — still adjusting. When you touch them she short-circuits mid-thrust. {holt}"I wasn't — I didn't expect them to be so —" She doesn't finish.`;
        }
        if (holtB >= 5) {
            pvText += `\n\nHer enormous ass cushions every impact — the weight she chose because she thought more was better. It throws off her rhythm, her center of gravity wrong, overcompensating. You grab her hips and steady her and she exhales. {holt}"Thank you." For the assist. For taking over. For knowing she couldn't do it herself.`;
        }
        if (holtM >= 5 && !(holtM >= 4 && playerM <= 1) && !(holtM >= 5 && playerM >= 5)) {
            pvText += ` She grips the workbench edge and her fingers dent the wood. She looks at the marks and her eyes widen. {holt}"I didn't mean to —" She moves her hands to your waist instead. Gentler. Carefully.`;
        }
        // PV player standout modifiers
        if (playerC >= 4) {
            pvText += `\n\nHer eyes keep going to your chest. She reaches out mid-thrust, stops, remembers to ask. {holt}"Can I..." You nod and she cups your breasts with the careful fascination of someone holding something she's only had for months. Not expert. Reverent.`;
        }
        if (playerB >= 4) {
            pvText += `\n\nHer hands find your ass during a thrust — she grabs because it's there and instinct overrode protocol. She realizes what she's doing. Almost releases. Doesn't. {holt}"Sorry, I just —" She holds on tighter.`;
        }
        // PV size overlay
        if (playerGS >= 2 && holtGS === 0) {
            pvText += `\n\nHer pussy is tight — she's new to all of this and her body grips your thick cock with reflexive intensity. She tenses, breathes through it, and then cautiously presses into the fullness. {holt}"Is it supposed to —" She swallows. {holt}"I can feel all of it." Every inch a first. She nods once — permission to continue — and her body slowly opens, accepting what she chose to experience.`;
        } else if (playerGS === 0 && holtGS >= 2) {
            pvText += `\n\nShe's swollen and slick — thick folds engulfing your modest cock in wet heat she wasn't briefed on. She grips the workbench, legs shaking. {holt}"I can't — it doesn't stop —" She means the sensation. It keeps coming. Her body responds to everything and she has no framework for managing it.`;
        } else if (playerGS >= 2 && holtGS >= 2) {
            pvText += `\n\nHer swollen pussy grips your thick cock and the combination is staggering — too much sensation from every direction. Her training kicks in: steady breathing, don't panic, ride it out. But her legs are shaking and she can't stop them. {holt}"I need to —" She can't finish. She braces and the brace is useless and she softens into it.`;
        } else if (playerGS === 0 && holtGS === 0) {
            pvText += `\n\nBoth tight, both precise — she clenches around your modest cock with involuntary intensity, every movement vivid and exact. She feels everything. Every shift, every pulse. Her eyes stay on yours, reading your face like a briefing she needs to memorize.`;
        }

        // === VV: both vulva ===
        let vvText;
        if (playerM >= 5 && holtM <= 1) {
            vvText = `You push her down onto the workbench gently and she goes — slight, pliant, looking up at you with those steel grey eyes. Your hand slides between her thighs and she tenses. The brace.\n\nYour fingers find her pussy — wet, warm. When you push inside she makes a sound she didn't plan. High, startled. Her hands grip your wrists. Not stopping you — holding on.\n\n{holt}"That's —" She presses into your hand. Cautious at first, then less cautious. Her own fingers reach between your legs, searching — she's copying what you do because that's the best data she has. Military learning: observe, replicate.`;
        } else if (holtM >= 4 && playerM <= 1) {
            vvText = `She lays you down with careful strength — one arm, controlled descent. She positions herself beside you and her hand moves between your legs with the same methodical attention she'd give a weapon she's learning to field-strip.\n\nHer fingers find you and she watches your face for feedback. Every reaction becomes data. She adjusts, tries again. When she finds the spot that makes your breath catch she locks on with focused discipline and doesn't lose it.\n\nYou reach between her legs and she tenses at the first touch — the brace, brief and useless. Then she presses into your hand. {holt}"Together." The word comes out before she can stop it. She means it.`;
        } else if (holtM >= 5 && playerM >= 5) {
            vvText = `Neither yields. Hands grip, bodies press. She slides her fingers between your legs at the same moment yours find hers. Both freeze. Then both press deeper.\n\nShe matches your rhythm — not from skill, from trained discipline. She can mirror any movement with precision. Her jaw is tight with concentration, steel grey eyes locked on yours. It becomes a different kind of contest — who breaks first, who loses the rhythm, who gives in to what their body wants to do.\n\n{holt}"You too?" She means overwhelmed. She means in over her head. Two soldiers finding humor in the chaos.`;
        } else {
            vvText = `She reaches for you with careful hands — one on your hip, the other sliding between your thighs. She touches you the way she'd test unfamiliar equipment: gently, systematically, paying close attention to every response.\n\nWhen her fingers find your pussy she watches your face like a briefing. She adjusts. Tries different pressure. When you gasp she locks on and doesn't waver.\n\nYou reach between her legs and she tenses — the brace, one last time. Then your fingers find her and the brace dissolves. She's wet, warm, responsive in ways she wasn't prepared for. {holt}"Is it supposed to feel like that?" Yes. She nods. Lets the next touch come. Presses into it.`;
        }
        // VV gs-awareness
        if (playerGS >= 2 && holtGS >= 2) {
            vvText += `\n\nBoth swollen, both slick — thick folds meeting thick folds. She shudders when you touch her clit, and when she does the same the sensitivity overwhelms her training. Her breathing goes ragged. {holt}"I can't — it doesn't stop —" She means the sensation. She holds on tighter.`;
        } else if (playerGS === 0 && holtGS === 0) {
            vvText += `\n\nBoth tight, both precise. Her fingers work you with careful pressure, finding the spot and staying there. She clenches around your fingers in return. Two people without a roadmap, figuring it out by touch. {holt}"Small targets." She almost smiles. {holt}"I'm used to small targets."`;
        } else if (playerGS >= 2 && holtGS === 0) {
            vvText += `\n\nYour swollen folds are thick under her fingers — she traces every ridge, exploring. Her own tight entrance grips your fingers with reflexive intensity. The contrast fascinates her. She watches her fingers disappear into you with frank attention.`;
        } else if (playerGS === 0 && holtGS >= 2) {
            vvText += `\n\nShe's swollen and dripping — thick folds parting around your fingers, responsive in ways she wasn't briefed on. Her legs shake. She breathes through it like a forced march. Your own tight entrance responds to her careful, methodical fingers.`;
        }
        // VV stat modifiers
        if (holtC >= 4) {
            vvText += `\n\nHer ${npcChest} press between your bodies as she grinds closer — heavy, moving, distracting her from her own rhythm. She looks down and back up. {holt}"They keep —" She doesn't finish. Her focus splits between what she's feeling below and what she's feeling above.`;
        }
        if (holtM >= 5 && !(holtM >= 4 && playerM <= 1) && !(holtM >= 5 && playerM >= 5)) {
            vvText += ` Her fingers inside you are strong — too strong for a moment. She pulls back instantly. {holt}"Sorry. I'm still —" She adjusts. Gentler. Watching your face for the all-clear.`;
        }
        if (playerC >= 4) {
            vvText += `\n\nHer free hand finds your chest — touches, cups, traces. She keeps coming back to it between strokes. The dual input is overloading her. She doesn't care.`;
        }
        if (playerB >= 4) {
            vvText += `\n\nHer hand slides to your ass and holds on — gripping, pulling you closer. She realizes, doesn't let go. Uses the grip as an anchor.`;
        }

        // === VP: Holt penis + player vulva ===
        let vpText;
        if (holtGS >= 2) {
            if (playerM >= 5 && holtM <= 1) {
                vpText = `She lets you arrange her — you take her ${npcGenSize} cock in hand and she watches the whole process with wide eyes. She's had a penis her whole life but never used it like this. You guide her to your pussy and she pushes in — too fast, then stops. Checks your face.\n\n{holt}"Tell me if —" You pull her deeper. The look on her face is pure overload — the sensitivity is staggering and she has no framework for managing it. She treats it like a weapon she hasn't been trained on: careful, respectful of its power. Her hips move in tentative thrusts, each one checked, double-checked.\n\n{holt}"I need to... slow down." She means she's close already and she doesn't know how to manage that. You hold her slight body against you and she follows your rhythm instead of her own. Relief washes across her face.`;
            } else if (holtM >= 4 && playerM <= 1) {
                vpText = `She positions you on the workbench with terrified gentleness — her powerful hands handling you like something precious. She presses her ${npcGenSize} cock against your pussy and watches your face like a perimeter check. Any sign of distress and she stops.\n\nShe pushes in. Agonizingly slow. Every motion checked, double-checked. The guard protecting the civilian. Her jaw is locked with concentration. {holt}"Is that —" She watches you nod. Pushes deeper. The sensation hits her and she goes still — processing, not resisting.\n\nHer discipline holds. She'd rather not finish than cause harm. But her body is responding to everything at once and the discipline is a dam with water rising behind it.`;
            } else {
                vpText = `She positions her ${npcGenSize} cock at your pussy and looks at you. Steadily. Honestly. {holt}"I've never done this." She pushes in — slow, feeling every inch, her jaw tightening at the sensation. This is nothing like anything she's experienced.\n\nShe watches herself push in and can't look away. The visual and the sensation together overload her and her rhythm stutters. She grips your hips — too hard, loosens — and tries again. Methodical. Finding what works through trial and observation.\n\n{holt}"I need to... slow down." She's close already and she doesn't know how to manage it. She breathes — counted, forced — and resumes. Slower. More careful. The discipline holds. Barely.`;
            }
        } else {
            // Small cock — familiar but different
            vpText = `She positions her ${npcGenSize} cock at your pussy, steel grey eyes steady on yours. She pushes in — precise, careful. Familiar territory, but it doesn't work the same. The sensitivity has shifted, the response time is different.\n\nShe uses old protocols on new hardware — competent, methodical, slightly unsettled. She knows this should feel normal and it doesn't. Every thrust is information she's processing in real time.\n\n{holt}"It's different." Not complaint. Report. She adjusts the angle, watches your face for data. Finds the spot that makes you gasp. Hits it again. Deliberately. The guard's discipline, applied to an entirely new mission.`;
        }
        // VP stat modifiers
        if (holtC >= 5) {
            vpText += `\n\nHer massive chest sways with every thrust — she looks down, startled every time, still not used to the motion. The movement distracts her from her rhythm. She grabs one breast, then lets go to brace. Can't manage both. {holt}"They don't — they won't —" She gives up trying to control them.`;
        }
        if (holtB >= 5) {
            vpText += `\n\nHer enormous ass drives weight behind each thrust — more momentum than she intended. She overcorrects, pulls back too far. The mass is equipment she hasn't trained with. Every motion recalibrated in real time.`;
        }
        if (playerC >= 4) {
            vpText += `\n\nHer eyes keep dropping to your chest as she thrusts. She reaches out — stops — asks with a look. Her hand settles there between strokes, careful and fascinated.`;
        }
        if (playerB >= 4) {
            vpText += `\n\nShe grabs your ass for leverage and holds — the grip instinctive, the awareness delayed. When she realizes she's holding on she doesn't let go. Adjusts the angle instead. Uses it.`;
        }
        // VP size overlay
        if (holtGS >= 2 && playerGS === 0) {
            vpText += `\n\nYour tight pussy grips her thick cock and her eyes go wide — she feels every inch and her composure fractures. {holt}"I need to — slow —" The sensitivity is staggering. She breathes through it the way she'd breathe through a forced march. It doesn't work as well.`;
        } else if (holtGS === 0 && playerGS >= 2) {
            vpText += `\n\nHer modest cock slides into your swollen, slick pussy — engulfed in plush heat. She angles for effect, finding pressure points through trial and careful observation. What she lacks in size she compensates with discipline and attention to your reactions.`;
        } else if (holtGS >= 2 && playerGS >= 2) {
            vpText += `\n\nHer thick cock fills your swollen pussy completely — both oversensitive, both overwhelming. Every thrust lands hard. She grips you tighter, jaw locked, eyes focused on anything that will keep her from losing control. {holt}"I can't —" She means she's losing the fight with the sensation. She is.`;
        }

        // === PP: both penis ===
        let ppText;
        if (holtM >= 4 && playerM <= 1) {
            ppText = `She wraps her hand around both shafts — her ${npcGenSize} cock and your ${playerGenSize} length pressed together. She holds you still with her free arm, not roughly, just immovably. She strokes with focused attention, watching both heads slide together.\n\nHer face is pure concentration — the guard running drills on unfamiliar equipment. When both shafts pulse in her grip she tenses. The brace. Useless. She softens and strokes faster, her breathing going uneven for the first time. {holt}"That's —" She doesn't finish. She's somewhere she's never been and the map doesn't help.`;
        } else if (playerM >= 5 && holtM <= 1) {
            ppText = `You take both cocks in hand — her ${npcGenSize} shaft and your ${playerGenSize} length. She lets you. Her slight body leans into yours, trusting, her steel grey eyes fixed on where the two shafts press together.\n\nYou stroke and she watches, fascinated. Both cocks throb together and she makes a small sound — just a breath, barely there. Her hips push into your grip without permission. She tenses — the brace. Then lets it happen again.\n\n{holt}"I've had this my whole life." She means her cock. {holt}"It's never felt like that."`;
        } else {
            ppText = `Her hand wraps around both shafts — her ${npcGenSize} cock and your ${playerGenSize} length pressed together. She strokes with methodical attention, the same careful precision she'd give any unfamiliar task.\n\nThe sensation is nothing she prepared for. Both cocks pulsing together, the feedback loop of pressure translating between them. Her rhythm accelerates without her deciding to. Her free hand hovers — then settles on your shoulder. Anchoring.\n\n{holt}"I didn't know it could feel like this." She means all of it — the sensation, the closeness, another person's body against hers. Her breathing goes uneven and she doesn't try to control it. {holt}"Is it supposed to feel like that?"`;
        }
        // PP stat modifiers
        if (holtC >= 5) {
            ppText += `\n\nHer massive chest presses between them as she leans closer — the weight settling against your body, warm, impossible to ignore. She looks down at the collision of flesh and cocks and breasts and her expression goes blank with overload.`;
        }
        if (playerC >= 4) {
            ppText += `\n\nHer free hand finds your chest — hovers, asks with a look, settles. She traces the shape while both cocks throb in her other hand. Split attention. She can't manage both inputs and she's trying anyway.`;
        }
        // PP size overlay
        if (playerGS >= 2 && holtGS >= 2) {
            ppText += `\n\nBoth thick, both throbbing — her hand barely wraps around both shafts. She strokes and the pressure is staggering. Her composure fractures. {holt}"I need to —" She doesn't. She keeps going, jaw set, riding it out.`;
        } else if (playerGS === 0 && holtGS === 0) {
            ppText += `\n\nBoth modest — her hand wraps easily around both, fingers precise. She strokes with controlled rhythm, every adjustment deliberate. The discipline holds until the sensation builds past her ability to manage it. Then the discipline steps aside.`;
        }

        const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };

        this.text = opening + '\n\n' + getSexSceneText('holt', branches);

        gameState.npcs.holt.trust += 1;
        saveState();
    },
    actions: [
        {
            label: 'Something catches her shoulder...',
            nextScene: 'holt_sex_transform',
        },
        {
            label: 'Continue...',
            nextScene: 'holt_sex_closing'
        }
    ]
};

// === HOLT TRANSFORM: Lactation + mutual masturbation (consolidated) ===
// UNIQUE: tender, intimate, accidental trigger. NOT spectacular.
SCENES['holt_sex_transform'] = {
    id: 'holt_sex_transform',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('holt', 'transform');
        markTransformationSeen('holt');

        const npcBody = gameState.npcs.holt.body;
        const playerBody = gameState.player.body;
        const holtHasVulva = npcBody.genitalia === 0;
        const playerHasVulva = playerBody.genitalia === 0;
        const holtGS = npcBody.genitaliaSize;
        const playerGS = playerBody.genitaliaSize;
        const npcGenSize = getBodyStatDesc('holt', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');
        const npcChest = getBodyStatDesc('holt', 'chest');

        // === Tease: ACCIDENTAL — she bumps a device ===
        const tease = `Her shoulder catches a device hanging from a workshop beam — something you haven't catalogued yet. It chimes. Once. A soft, warm pulse radiates outward before either of you can react.\n\nHolt goes still. Her hand rises to her chest. {holt}"Something's —" She looks down. A warmth is spreading through her breasts, not unpleasant, just unfamiliar. Deeper than skin. {holt}"I think something's wrong."`;

        // === Transform: lactation + arousal overflow ===
        const growthBeat = npcBody.chest < 2
            ? `\n\nThen they grow. Not dramatically, just fullness, her chest rounding out, filling, her body making room for what's building inside. She watches her breasts swell under her hands, eyes wide. By the time it stops she has more than she's ever had. Enough to hold what's coming.`
            : '';
        const transform = `It's not wrong.\n\nThe warmth builds — not pain, fullness. Pressure behind her nipples, swelling, insistent. Her ${npcChest} feel heavy in a new way.${growthBeat} She cups them instinctively, and her fingers come away wet.\n\nMilk. A bead of white at each nipple, growing, spilling. She stares down at her own body doing something she never asked it to do.\n\n{holt}"I'm —" She touches the wetness. Looks at her fingers. Her expression cycles through confusion, alarm, and then something quieter. Wonder, maybe. Her body is doing something it was built to do and she didn't know it could. {holt}"Is this... is this what this feels like?"\n\nThe pressure builds. Not pain — fullness, insistent and warm, spreading through her chest and down through her stomach and lower. Her nipples are dripping now, thin streams of white tracing lines down her skin. The fullness needs somewhere to go.\n\nYou touch her breast. Gently. The milk beads out under your thumb and the relief is immediate — her shoulders drop, her breath rushes out, and she makes a sound she didn't authorize. Small, startled, cracked open.\n\nShe looks at you with wet eyes. Not crying — overwhelmed. She lifts her breast toward you. An offer. {holt}"Please."`;

        // === The nursing — NOT sexual at first, then it becomes sexual ===
        let nursingText = `You take her breast in your mouth. The first taste is warm, faintly sweet, and the relief that passes through her is visible — her whole body unclenches. The fullness eases as you draw the milk out and she exhales like she's been holding her breath for years.\n\nShe holds your head against her chest. Both hands, gentle, steady. Her breathing slows. This isn't sexual — it's pressure release, warmth, closeness. Two people in a quiet room and one of them is giving something she didn't know she had.\n\nThen it shifts. Because she's never been this close to anyone. Because her body is responding to everything at once — the warmth of your mouth, the relief in her chest, the sensation traveling downward, pooling between her thighs. Her breathing changes. Her hand tightens in your hair.`;

        // === Genital-aware mutual masturbation (hand stimulation while nursing) ===
        let mutualText;
        if (holtHasVulva && playerHasVulva) {
            mutualText = `Her free hand finds yours. She guides it between her thighs — she's wet, soaked, her body ahead of her mind. Your fingers slide against her pussy and she shudders, a sound muffled against the top of your head.\n\nYou take her hand and press it between your legs in return. She touches you the way she touches herself — careful, exploring, learning what makes your breath change against her breast. The milk flows and you drink and her fingers work you slowly and your fingers work her and the rhythm synchronizes without either of you deciding it should.\n\nNo acrobatics. No power dynamics. Just two people close together, hands moving in the same quiet rhythm, one of them giving something she didn't know she had.`;
            if (holtGS >= 2 && playerGS >= 2) {
                mutualText += ` Both swollen — thick folds sliding under each other's fingers, everything slick and amplified. She shudders and the vibration travels through her breast into your mouth.`;
            } else if (holtGS === 0 && playerGS === 0) {
                mutualText += ` Both tight, both precise — fingers finding small targets with careful attention. Every touch is vivid, exact. She feels everything and so do you.`;
            }
        } else if (holtHasVulva && !playerHasVulva) {
            mutualText = `Her free hand finds your cock — she wraps her fingers around your ${playerGenSize} shaft with the careful grip of someone handling something she's learning. She strokes slowly, watching your face against her breast for feedback.\n\nYou slip your hand between her thighs. She's soaked — wet, warm, her body ahead of her mind. Your fingers find her pussy and she shudders, a sound pressed against the top of your head. {holt}"Don't stop." She means any of it — your mouth, your fingers, the closeness.\n\nThe milk flows and you drink and her hand works your cock and your fingers work her pussy and the rhythm finds itself. Quiet. Close. Two people figured out where the pieces go.`;
            if (playerGS >= 2) {
                mutualText += ` Your thick cock pulses in her grip and she strokes with both hands, fascinated, while you drink deeper. The dual sensation — mouth above, hand below — overwhelms her training.`;
            }
        } else if (!holtHasVulva && playerHasVulva) {
            mutualText = `Her cock is hard against your thigh — she shifts, embarrassed, and you take it in your hand. She tenses at the touch. Her cock has responded differently since the transformation — the sensitivity shifted, the response time changed. Your hand on it now, while her breast is in your mouth, is information she can't process.\n\nShe reaches between your legs and touches you — careful, methodical, watching your face against her breast. Her fingers find your pussy and she mimics what she felt earlier, learning through observation.\n\nThe milk flows and you drink and her fingers work you and your hand strokes her ${npcGenSize} cock and neither of you speaks. Just breath and warmth and the slow rhythm of two people finding each other.`;
            if (holtGS >= 2) {
                mutualText += ` Her thick cock pulses in your hand — the sensitivity is staggering and she grips your shoulder, jaw tight. {holt}"I need to — slow —" She can't. The sensation from your mouth on her breast and your hand on her cock is too much from too many directions.`;
            }
        } else {
            // Both have cocks
            mutualText = `Her free hand finds your cock. She wraps her fingers around your ${playerGenSize} shaft and strokes — slow, careful. You reach for her ${npcGenSize} cock in return. She tenses at the touch — familiar equipment, unfamiliar context. Everything feels different when someone else is holding it.\n\nThe milk flows and you drink and your hands work each other and the rhythm finds itself without either of you planning it. Her forehead drops against yours. Her breath is warm and shaky. No acrobatics. No contest. Just two people close together, hands moving in the same quiet rhythm.\n\n{holt}"I've had this my whole life." She means her cock. {holt}"It's never felt like this." She means with someone. She means while being held.`;
            if (holtGS >= 2 && playerGS >= 2) {
                mutualText += ` Both thick, both throbbing in each other's grip. The dual sensation — mouth on breast, hand on cock — is too much. She grips you harder and you grip her harder and neither of you can slow down.`;
            }
        }

        // === Climax: quiet, almost at the same time ===
        const climax = `\n\nThe finish comes quietly. Her body tightens — not the brace, something deeper, something involuntary — and she holds your head against her chest and makes a sound that isn't a word. Small. Cracked open. You follow moments later, her hand still moving, your mouth still on her breast, the milk still flowing.\n\nShe doesn't let go. Minutes pass. The milk slows to a trickle, then stops. The fullness fades. Her body returns to normal but she doesn't move. Your head stays against her chest. Her hand stays in your hair.\n\n{holt}"...thank you." She says it into the top of your head. Quiet. She means for everything. For showing her. For not making it complicated. For being the person she could be this close to for the first time in her life.`;

        this.text = tease + '\n\n' + transform + '\n\n' + nursingText + '\n\n' + mutualText + climax;
    },
    actions: [
        { label: 'Continue...', nextScene: 'holt_sex_closing' }
    ]
};

SCENES['holt_sex_closing'] = {
    id: 'holt_sex_closing',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('holt', 'base');

        const npcBody = gameState.npcs.holt.body;
        const playerBody = gameState.player.body;
        const holtM = npcBody.muscle;
        const holtC = npcBody.chest;
        const holtB = npcBody.butt;
        const holtGS = npcBody.genitaliaSize;
        const holtHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerB = playerBody.butt;
        const sawTransform = hasSeenTransformation('holt');
        const isGoddess = holtC >= 5 && holtB >= 5 && holtM >= 4;
        const npcGenSize = getBodyStatDesc('holt', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        let text = '';

        // === CLIMAX (skip if transform path already delivered it) ===
        if (!sawTransform) {
            let climaxText = `The climax takes her by surprise. She didn't know it would feel like this — she had no expectations to exceed and the reality exceeds all of them.\n\nHer body goes rigid. Not the brace — something past the brace, past discipline, past anything she has a name for. Her eyes go wide. Her mouth opens. A held breath and then a sound she's never made — small, raw, startled. She comes with her whole body and she didn't know bodies could do this.`;

            const branches = {
                'pv': holtM >= 4 ? `\n\nHer powerful body clamps around you — her pussy clenching hard on your ${playerGenSize} cock, her legs locked, her arms pulling you deep with strength she didn't mean to use. She rides the orgasm through gritted teeth, eyes wide open, watching you through all of it.` : `\n\nHer pussy clenches around your ${playerGenSize} cock — rhythmic, involuntary, nothing controlled about it. Her slight body shakes, hands gripping whatever they can find. She makes no sound. She can't. Her eyes stay open the entire time, fixed on yours, like if she looks away she'll lose it.`,
                'vv': `\n\nHer fingers curl inside you as she comes — instinct overriding the careful technique she'd built. Her hips buck against your hand. She grips your wrist — not hard, just needing something to hold. A single shuddering exhale and then silence. Wide eyes. Processing.`,
                'vp': holtGS >= 2 ? `\n\nHer ${npcGenSize} cock pulses inside you — she thrusts through the orgasm because she can't stop, rhythm breaking, discipline gone. Her hands grip your hips too hard and then loosen and then grip again. She's trying to be careful and her body won't let her.` : `\n\nHer modest cock pulses inside you — precise, controlled even at the peak. Her jaw locks. One sharp exhale. She holds herself inside you, not moving, feeling every pulse. Her eyes don't close. She watches you through it like she needs to memorize this.`,
                'pp': `\n\nBoth cocks pulse in her grip — hers and yours together. She strokes through it, hand tightening, rhythm gone. The sound she makes is barely audible — a breath, a half-word, something she started to say and couldn't finish. Her forehead drops against yours.`
            };

            text += climaxText + getSexSceneText('holt', branches);
        }

        // === COMEDOWN (stat-priority) ===
        let comedown;
        if (isGoddess) {
            comedown = `\n\nShe sits at attention. Old habit. Then she realizes what she's doing — naked, post-coital, sitting at attention — and makes herself lean back. Her body is enormous and sensitive and she can still feel everything and she doesn't know what to do with her hands. They go to her lap. Then her thighs. Then her lap again.\n\n{holt}"I don't have a report for this." It's the closest thing to a joke she's made all scene. She looks at you and her expression is open in a way it has never been in daylight. Unguarded. Every layer of discipline and duty stripped away.\n\n{holt}"Was that... is that what it's always like?" She means sex. She means all of it. She means being alive in a body that feels things.`;
        } else if (holtC >= 5) {
            comedown = `\n\nShe's still looking down at them. She can't stop. She pokes one experimentally, watches it move. Her expression is someone revising an entire mental model in real time.\n\n{holt}"They're not what I thought they'd be." She thought firm. They're soft. She thought decorative. They're sensitive. She traces the curve of one breast, then cups it, then lets go and watches it settle.\n\nShe looks at you for a debrief she isn't going to get. The question is in her eyes: was that normal? Was I normal? She doesn't ask it out loud.`;
        } else if (holtB >= 5) {
            comedown = `\n\nShe stands up. Feels the weight shift. Sits back down. Stands again. She's testing her own center of gravity, the way she'd test new equipment.\n\n{holt}"My balance is different." Pure observation. Field report. She touches her own hip, traces the curve down. Something about her own shape surprises her. She doesn't say what.\n\nShe sits carefully. The workbench creaks under the new distribution. She adjusts, adjusts again. Files it away.`;
        } else if (holtM >= 4) {
            comedown = `\n\nShe flexes. Not showing off — checking. The way she'd check her weapon after a drill. Everything works. Everything's stronger than she expected. She looks at her own arms with the expression of someone who got a better assignment than they requested.\n\n{holt}"I could get used to this." The most enthusiastic thing she's said all scene. She rolls her shoulders, tests her grip. The guard is running diagnostics. Everything passes.`;
        } else if (holtGS >= 3 && !holtHasVulva) {
            comedown = `\n\nShe's sitting carefully, legs apart, still sensitive. Her posture is perfect because her posture is always perfect, but there's a tension in her jaw. She looks down at her cock, still half-hard.\n\n{holt}"That's going to be... difficult to manage on patrol." The guard is back. She's already thinking about logistics. She adjusts, winces. Logistics are complicated.`;
        } else if (holtGS >= 3 && holtHasVulva) {
            comedown = `\n\nShe presses her knees together. Then apart. Then together. Aftershocks. She breathes through them the way she'd breathe through a forced march — steady, counted, not quite working.\n\n{holt}"No one told me it keeps going." She means the waves. She means no one warned her. She's not upset. She's adding this to the briefing she never received. Her hands grip the workbench edge and she rides it out. Disciplined. Shaking.`;
        } else if (holtC <= 1 && holtM <= 1) {
            comedown = `\n\nSmall, soft, un-armored in every sense. She pulls her knees up, wraps her arms around them. Compact. She's smaller than she's ever been and she doesn't take up the space she used to.\n\n{holt}"I like being small." She says it like a confession. Like admitting she doesn't want the armor back. Not yet. Not ever, maybe. She rests her chin on her knees. The guard is gone. Just a person, small and honest, in the quiet after.`;
        } else {
            comedown = `\n\nShe dresses in order. Undergarments, clothes, boots. Each item squared away before the next. She's rebuilding the guard one layer at a time. Her hands are steady. Her breathing is even. The discipline reassembles itself like armor going on.\n\nAt the door she turns. Stands straight. The guard is back, but the eyes are different. Something behind them that wasn't there before.`;
        }
        text += comedown;

        // === Transform callback ===
        if (sawTransform) {
            text += `\n\nShe touches her own breast. Dry now. The device is dark on its beam. She looks at it, then at you.\n\n{holt}"I didn't know I could do that." Her voice is quiet. She means the milk. She means the closeness. She means all of it. Her hand stays on her chest. Over her heart.`;
        }

        // === Player standout modifiers ===
        if (playerC >= 4) {
            text += `\n\nHer gaze drops to your chest while you're dressing. She looks away — military propriety. Then back. {holt}"You carry those well." She means it the way she'd mean it about someone carrying a heavy pack. Compliment on capability. Not aesthetics.`;
        }
        if (playerB >= 4) {
            text += `\n\nShe watches you move. The weight, the sway. She's been trained to assess bodies for combat readiness and now she's assessing for something else entirely and her training has no category for it. She swallows. Says nothing. But she watched.`;
        }

        // === Exit line (always) ===
        text += `\n\n{holt}"I'd like to do that again. If the schedule permits." Formal. The vulnerability is in the request itself — she's never asked for anything for herself before. She stands straight at the door. Steel grey eyes steady. The guard is back.\n\nBut the guard is smiling.`;

        this.text = text;
    },
    actions: [
        { label: 'Return to workshop', nextScene: 'workshop_main' }
    ]
};


// ==========================================
// HOLT'S REVELATION (Day 24)
// ==========================================

SCENES['story_holt_revelation'] = {
    id: 'story_holt_revelation',
    image: 'images/story/holt_revelation.webp',
    speaker: '',
    text: `You find Holt at the guard post, cleaning his sword with unusual intensity. He glances up when you enter.

{holt}"Have you noticed this town lately?" He sets the blade down. {holt}"Corwin won't shut up about how great she feels. Aldric's been smiling — *Aldric*. Even the regulars at the tavern are placing bets on who's next."

He leans back, crossing his arms.

{holt}"I keep watching them. Corwin's got this... energy now. Confidence. And Aldric moves different — looser, like something that was wound too tight finally let go."

He's quiet for a moment, then shrugs with forced casualness.

{holt}"Look, I'm not going to pretend I haven't been curious. Fifteen years standing guard gives you a lot of time to think. And lately I've been thinking... what's it actually like?"`,
    onEnter: function() {
        gameState.flags.story_holt_transformation_available = true;
        saveState();
    },
    actions: [
        { label: '"Tell me what you\'re feeling"', nextScene: 'story_holt_confession' },
        { label: 'Wait silently', nextScene: 'story_holt_confession' }
    ]
};

SCENES['story_holt_confession'] = {
    id: 'story_holt_confession',
    image: 'images/locations/guardpost.webp',
    speaker: 'Holt',
    text: `Holt rubs the back of his neck.

"Corwin told me about it. Said the devices don't just change the obvious — there's this whole-body effect. Said she feels sharper, more alive. Like everything fits better."

He stands, pacing slowly.

"I'm a practical man. If something makes you better at your job, you'd be a fool not to consider it. And Corwin and Aldric both seem... better. Happier. Stronger in a different way."

He stops and looks at you directly.

"But I'll be honest — it's not just practical. I've been curious about this for a long time. Never had a reason to admit it before." A slight smirk. "Now half the town's done it and the other half's jealous."

He squares his shoulders. "So. Can you do for me what you did for them?"`,
    actions: [
        {
            label: '"I would be honored to help you"',
            nextScene: 'story_holt_transform_begin'
        }
    ]
};

SCENES['story_holt_transform_begin'] = {
    id: 'story_holt_transform_begin',
    image: 'images/story/holt_transform_begin.webp',
    speaker: 'Holt',
    text: `Holt enters the workshop and surveys the devices with a guard's eye — methodical, assessing.

"So which one did the trick for Corwin?"

You guide him to the Genital Reshaper. He runs a hand along the brass housing, nodding slowly.

"Solid craftsmanship. Your uncle knew what he was doing." He takes a breath. "Alright. Let's see what all the fuss is about."

He positions himself and gives you a look — not scared, but alert. Ready.

"Do it."`,
    actions: [
        { label: 'Activate the device', nextScene: 'story_holt_transform_complete' }
    ]
};

SCENES['story_holt_transform_complete'] = {
    id: 'story_holt_transform_complete',
    image: 'images/story/holt_transform_complete.webp',
    speaker: '',
    text: `Purple light engulfs Holt. He goes rigid for a moment, then lets out a slow breath.

The transformation ripples through him — broader changes than the others. Curves filling out where there were none, features softening, his whole frame shrinking and reshaping.

There's a clatter of metal. Holt's chainmail slides off her narrower shoulders and hits the floor. The armor follows — breastplate, pauldrons, all of it suddenly far too large for the body wearing it. Her uniform pools around her feet.

She stands there, bare, blinking down at herself.

{holt}"Oh." A pause. Then, quieter: *"Oh."*

She flexes her hands, rolls her shoulders, shifts her weight from foot to foot — testing everything like she's running a field check on new equipment. Completely unbothered by the nudity.

{holt}"That's... not what I expected." She looks up at you. {holt}"It's better."`,
    onEnter: function() {
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.story_holt_transformed) {
            // Full transformation for Holt
            gameState.npcs.holt.body.genitalia = 0;
            gameState.npcs.holt.body.chest = 3;
            gameState.npcs.holt.body.muscle = 2;  // Less bulky, more toned
            gameState.npcs.holt.body.butt = 3;
            gameState.npcs.holt.enjoys_feminine_form = true;  // Will never want to be male
            gameState.flags.story_holt_transformed = true;
            recordNpcBodyChange('holt');
            saveState();
        }
    },
    actions: [
        { label: 'Give her space', nextScene: 'story_holt_transform_aftermath' }
    ]
};

SCENES['story_holt_transform_aftermath'] = {
    id: 'story_holt_transform_aftermath',
    image: 'images/story/holt_transform_aftermath.webp',
    speaker: 'Holt',
    text: `You grab a shirt from a hook on the wall — one of your uncle's old work shirts. She pulls it on. It hangs past her thighs, sleeves dangling well past her hands. She rolls them up with practiced efficiency.

"Fits about as well as the armor did." She grins — the first genuine one you've ever seen from her.

She stretches, testing her new body's range. Arms above her head, arching her back, rolling her neck.

"I'm keeping this. Obviously." She laughs — actually laughs. "God, I should've done this years ago."

She claps you on the shoulder. Still strong.

"I owe you one. A big one. I'll still be at the guard post — someone's got to keep this town in line. Especially now that half of it is getting transformed."

She glances down at the oversized shirt. "I'll sort out a proper outfit on the way back. This'll do for now."

**(Holt has been transformed and seems genuinely happy. She has no intention of changing back.)**`,
    onEnter: function() {
        gameState.flags.story_holt_transform_complete = true;
        gameState.npcs.holt.trust = Math.min(100, gameState.npcs.holt.trust + 20);
        // Mark all transformed male NPCs as enjoying their feminine forms
        if (gameState.flags.story_corwin_transformed) {
            gameState.npcs.corwin.enjoys_feminine_form = true;
        }
        if (gameState.flags.story_aldric_accident_complete) {
            gameState.npcs.aldric.enjoys_feminine_form = true;
        }
        saveState();
    },
    actions: [
        { label: '"Welcome to your new life"', nextScene: 'workshop_main' }
    ]
};

