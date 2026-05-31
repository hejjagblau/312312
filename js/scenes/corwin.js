// ============================================
// CORWIN SCENES
// Extracted from scenes.js for modularity
// ============================================

SCENES['corwin_workshop_arrival'] = {
    id: 'corwin_workshop_arrival',
    image: '',
    imagePrompt: null,
    speaker: 'Corwin',
    text: '',
    onEnter: function() {
        if (gameState.npcs.corwin.firstDesireFulfilledDay !== null) {
            SceneManager.playScene('corwin_transformation_ready');
            return 'redirect';
        }
        this.image = getNpcImagePath('corwin');
        this.text = `Corwin slips in with a merchant's practiced ease, eyes cataloguing every device.\n\n{corwin}"Well, well. Quite the operation you have here." She picks up a crystal, holds it to the light, puts it back. {corwin}"I've been thinking about what you said. About what's possible." She meets your eyes. {corwin}"I'm in."`;
    },
    actions: [
        { label: 'Show the devices', nextScene: 'corwin_transformation_ready' }
    ]
};

SCENES['corwin_transformation_ready'] = {
    id: 'corwin_transformation_ready',
    image: '',
    imagePrompt: null,
    speaker: 'Corwin',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('corwin');
        gameState.currentTransformationTarget = 'corwin';
        saveState();

        const npc = gameState.npcs.corwin;
        const desire = npc?.currentDesire;
        const label = desire?.label?.toLowerCase() || 'a change';
        const thresholds = getNpcTrustThresholds('corwin');
        const horny = (npc.trust >= thresholds.intimate) || npc.hiddenArchetype === 'goddess';

        if (horny) {
            this.text = `Corwin leans against a workbench, twirling a strand of hair. The charming smirk is there, but her breathing is a little fast.\n\n{corwin}"I want ${label}." The smirk wavers. {corwin}"And I'd consider it a... personal favor." She catches herself. {corwin}"A mutually beneficial one, obviously."`;
        } else {
            this.text = `Corwin surveys the devices with an appraising eye.\n\n{corwin}"${label[0].toUpperCase() + label.slice(1)}." She flashes a grin. {corwin}"I trust you'll make it worth the trip."`;
        }
    },
    actions: [
        { label: 'Select a device', nextScene: 'device_selection' },
        { label: 'Changed your mind?', nextScene: 'workshop_main' }
    ]
};

// Holt workshop arrival

// ============================================
// CORWIN SEX SCENES
// ============================================

SCENES['corwin_sex_intro'] = {
    id: 'corwin_sex_intro',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('corwin', 'base');
        markSexUnlocked('corwin');

        // --- Variables ---
        const npcBody = gameState.npcs.corwin.body;
        const playerBody = gameState.player.body;
        const corwinM = npcBody.muscle;
        const corwinC = npcBody.chest;
        const corwinB = npcBody.butt;
        const corwinGS = npcBody.genitaliaSize;
        const corwinHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerM = playerBody.muscle;
        const playerB = playerBody.butt;
        const playerGS = playerBody.genitaliaSize;
        const npcChest = getBodyStatDesc('corwin', 'chest');
        const npcButt = getBodyStatDesc('corwin', 'butt');
        const npcGenSize = getBodyStatDesc('corwin', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        // --- Part 1: Corwin's Body ---
        let part1;
        if (corwinM <= 1) {
            if (corwinC <= 1) {
                part1 = `Corwin shrugs off her merchant's coat with a showman's flourish — one shoulder, then the other, letting it pool at her feet. Beneath it she's slight, narrow, almost delicate. Dark hair frames a sharp jaw that's softened since the Wager, cheekbones that catch the lamplight.\n\nShe catches you looking and grins. {corwin}"Taking it in? Good." She runs her hands down her own sides — flat chest, narrow waist, slim hips — and poses. Actually poses. One hand behind her head, weight on one leg, like she's auditioning for a painting.\n\n{corwin}"I went petite." She says it like she's announcing a business strategy. {corwin}"Dainty. Feminine." She turns in a slow circle, checking herself over one shoulder. {corwin}"I look incredible."`;
            } else if (corwinC <= 3) {
                part1 = `Corwin shrugs off her merchant's coat with theatrical precision — watching herself do it, because of course she is. Her ${npcChest} press against the silk undershirt she's wearing, and she pauses to look down at them.\n\n{corwin}"Still can't believe these are mine." She cups them through the fabric, testing the weight, then pulls the shirt overhead. Her breasts settle and she watches them move. Blinks. She knew what breasts looked like on other women. She did not know they felt like this when they shifted.\n\nShe grins past the surprise. {corwin}"Well? What do you think?" She's already posing — shoulders back, chest forward, chin lifted. The charmer's instinct is alive and well. It just has new material to work with.`;
            } else {
                part1 = `Corwin's merchant coat hits the floor and her ${npcChest} are the first thing you see — enormous on her slight frame, straining against silk that was never designed for this. She pulls the undershirt off and they spill free. Heavy. Swaying. She stares down at them.\n\n{corwin}"Gods." She cups them both, lifts, lets them drop. Watches the bounce with her mouth slightly open. {corwin}"Look at these." She's not talking to you. She's talking to herself. She pushes them together, watches the cleavage deepen, and her breath catches.\n\nThen she remembers you exist. {corwin}"Look at these." Now she IS talking to you. She turns, poses, pushes her chest forward. She's living the fantasy she spent years looking at from the outside, and she is incandescent with vanity.`;
            }
        } else if (corwinM <= 3) {
            part1 = `Corwin strips the merchant coat with a practiced shrug, then flexes. She actually flexes — one arm up, checking her own bicep, grinning at what she finds. Her body has filled out with toned muscle under soft skin, and she runs a hand along her own arm like she's appraising merchandise.\n\n{corwin}"Not bad, right?" She pulls the undershirt over her head and her ${npcChest} settle on a frame that's learned how to carry them. She stretches, rolls her shoulders, admires the way her body moves in the workshop light. {corwin}"Two fit women." She catches your eye. {corwin}"This is going to look amazing."`;
        } else {
            part1 = `Corwin's coat hits the floor and the body underneath fills the space. She's big — dense muscle under soft curves, shoulders broad, arms that could pin you without effort. She strips her undershirt and her ${npcChest} sit on a chest wall that's thick with power.\n\nShe flexes. Both arms. Watching herself in the polished metal of a device housing, grinning at the reflection. {corwin}"Look at me." She's not talking to you yet — she's talking to herself in the mirror, admiring the sheer scale of what she's become. She turns, checks herself from the side, runs her hand down her own thigh.\n\n{corwin}"I look incredible." She means it completely. She turns to you and the grin widens. {corwin}"We're going to look incredible together."`;
        }
        // Part 1 butt modifier
        if (corwinB >= 5) {
            part1 += `\n\nShe turns and her ass is staggering — enormous, round, reshaping every line of her body. She looks back at it over her shoulder and her face lights up. {corwin}"Look at this thing." She slaps one cheek and watches the ripple with open delight. {corwin}"I picked the biggest because bigger is better, and I was right." She wiggles, watching herself, completely absorbed.`;
        } else if (corwinB >= 4) {
            part1 += ` She turns and her ${npcButt} draws the eye — full and round. She catches you looking and shifts her weight to show it off. {corwin}"Noticed that, did you?"`;
        }

        // --- Part 2: Getting Close (power dynamics + mirror scene) ---
        let part2;
        const mirrorDiscrepancy = (corwinM >= 4 && playerM <= 1) || (playerM >= 4 && corwinM <= 1);
        const bothBig = corwinM >= 4 && playerM >= 4;

        if (mirrorDiscrepancy) {
            // THE MIRROR SCENE — anchor scene for muscle discrepancy
            if (corwinM >= 4 && playerM <= 1) {
                part2 = `She catches sight of the full-length mirror propped against the workshop wall and her eyes go bright. {corwin}"Over there. Come here."\n\nShe pulls you to the mirror, positions you in front of it, and stands behind you. Her powerful body dwarfs your slight frame. She wraps her arms around you from behind — thick arms engulfing your waist — and looks at the reflection over your shoulder.\n\n{corwin}"Gods, look at us." Her voice drops. She's staring at the picture you make together — her massive body behind your delicate one, the contrast in scale. She adjusts the angle, tilts the mirror, positions your hips. Directing. She's casting a scene and both of you are in it.\n\nShe meets your eyes in the mirror and the charmer's grin has gone dark with want. {corwin}"Tell me this isn't the hottest thing you've ever seen."`;
            } else {
                // Player m4+, Corwin smaller
                part2 = `She spots the full-length mirror propped against the wall and grabs your arm. {corwin}"There. Pick me up."\n\nIt's an instruction, not a request. She knows exactly what she wants. You lift her — she's light in your strong arms — and she faces the mirror, wrapping her legs around your waist. Her slight body is framed by your powerful one, and she stares at the reflection with her lips parted.\n\n{corwin}"Oh, that's perfect." She adjusts her own position, tilts her head, poses even while being held. Watching herself — the petite woman in the muscular arms. This is the fantasy she always had. She just used to imagine being the one holding. {corwin}"Don't put me down. I need to see this."`;
            }
        } else if (bothBig) {
            part2 = `She pulls you close and you don't yield. She pushes harder. Neither of you moves. She looks at you with something between surprise and delight — two powerful bodies pressed together, neither giving ground.\n\n{corwin}"Gods, look at us." She wraps her arms around you and flexes, testing herself against your strength. It's not a contest — it's a visual. Two muscular women locked together, the sheer scale of both bodies. She glances toward the mirror and pulls you both toward it.\n\nIn the reflection: two powerful frames, all muscle and curves and skin. She grins. {corwin}"Nobody is the small one. Good. I want to see ALL of this."`;
        } else if (playerM >= 5 && corwinM >= 2) {
            part2 = `You pull her close and she comes willingly — pressing against you, running her hands over your arms, your shoulders. She's not yielding. She's admiring. Her fingers trace your muscle with the eye of someone who knows exactly what a good body looks like.\n\n{corwin}"Look at you." She positions herself against you, finds the angle she wants — her body framed against yours. She catches your reflection in a polished surface and adjusts her chin. {corwin}"We look amazing." Even now, she's composing the picture.`;
        } else if (corwinM <= 1 && playerM <= 1) {
            if (playerC >= 4 && playerB >= 4) {
                part2 = `She draws you close and her hands find the contrast immediately — your slight frame, then the swell of your chest, then the curve of your ass. She steps back to look, then forward to touch, then back again. She can't decide if she wants to see or feel.\n\n{corwin}"Look at you." She positions you both in front of the polished surface of a device housing. Two petite women, but you with curves she can't stop staring at. Her hands roam your chest, your hips, comparing against her own narrow frame. {corwin}"You make me look tiny. I love it."`;
            } else if (playerC >= 4) {
                part2 = `She draws you close and her hands go straight to your chest. No preamble, no pretense. She cups your breasts, lifts them, presses her face between them. Steps back to look. Steps forward again.\n\n{corwin}"I've been staring at tits my entire life and yours are—" She doesn't finish. She's already back between them, her slight body pressed against your curves, hands exploring with the confidence of someone who spent years on the other side of this equation.`;
            } else if (playerB >= 4) {
                part2 = `She draws you close and her hands slide immediately to your ass. Both hands, full grip, pulling you against her. She turns you around to see it, then turns you back. {corwin}"Hold still, I'm looking."\n\nShe positions you both so she can see the two of you together — her narrow hips, your full curves. She grins at the contrast. Grabs again. {corwin}"This is mine now. For the next hour, this is mine."`;
            } else {
                part2 = `She draws you close and you fold together — two slight bodies, all angles and warmth. She tangles her legs with yours, presses herself against you sternum to sternum, and reaches past you to angle a polished surface so she can see them both.\n\n{corwin}"Cute." She studies the reflection — two delicate women tangled together. {corwin}"We're cute." She sounds genuinely pleased. Her hands trace your body with a charmer's confidence, mapping everything she can reach. {corwin}"I like us like this."`;
            }
        } else {
            part2 = `She pulls you close with merchant's hands — confident, knowing where to grip. She presses herself against you, runs her hands up your sides, and angles you both toward the nearest reflective surface.\n\n{corwin}"Look at us." She always says that. She means it every time. She adjusts your position, tilts her own chin, finds the angle that makes the picture perfect. Her dark eyes track between the reflection and the reality, composing, admiring.\n\nShe catches your mouth with hers — theatrical, deliberate, the kind of kiss that's meant to be watched. Even with her eyes closed, she's performing.`;
        }

        // Part 2 modifiers
        if (playerC >= 4 && !mirrorDiscrepancy && !bothBig && !(corwinM <= 1 && playerM <= 1)) {
            part2 += `\n\nHer hands find your chest and she loses her train of thought. She cups, squeezes, pushes them together, steps back to look. {corwin}"These." She buries her face between them. Steps back again. She's been staring at breasts her whole life and having them at arm's length — on someone else while she's also touching her own — is short-circuiting her.`;
        }
        if (playerB >= 4 && !mirrorDiscrepancy && !bothBig && !(corwinM <= 1 && playerM <= 1)) {
            part2 += `\n\nHer hand slides to your ass and grabs with both hands. She turns you, checks the view, grabs again. {corwin}"Turn around." She watches you move, watches it bounce, slaps once — not hard, just to see the ripple — and grins. {corwin}"That's incredible."`;
        }
        if (corwinC >= 5 && !mirrorDiscrepancy) {
            part2 += `\n\nShe keeps looking down at her own chest — the sheer mass of it, swaying with every motion. She pushes her breasts together, watches the cleavage, looks at the reflection. {corwin}"I can't get over these." She's half-talking to you, half-talking to herself.`;
        }

        // --- NO Part 3 (oral phase) — male NPC rule ---

        const opening = part1 + '\n\n' + part2;

        // --- Genital Branches ---

        // === PV: player penis + Corwin vulva ===
        let pvText;
        if (mirrorDiscrepancy && corwinM >= 4) {
            // Mirror scene: Corwin m4+ with vagina, player smaller with penis
            pvText = `She faces you, wraps her legs around your waist, and pulls you inside her with one powerful roll of her hips. {corwin}"Watch the mirror." Your ${playerGenSize} cock sinks into her pussy and she gasps — not at the sensation, at the sight. Both of you reflected: her muscular body engulfing your slight one, her breasts pressed between you, your cock disappearing into her.\n\nShe holds you with one arm and uses the other to grip the shelf for leverage, bobbing you against her. Every thrust is a visual she's composing in real time — checking the mirror, checking the reality, losing herself in the feedback loop between sight and sensation.`;
        } else if (mirrorDiscrepancy && playerM >= 4) {
            // Mirror scene: Player m4+ with penis, Corwin smaller
            pvText = `She wraps her legs around you, facing the mirror. {corwin}"Like this. I want to see." You hold her up — she's light — and slide your ${playerGenSize} cock into her pussy. Her breath catches and her eyes go wide, but she's looking at the mirror, not at you.\n\n{corwin}"Oh gods." She's watching herself get fucked — her petite body held aloft, your thick arms around her, your cock stretching her open. She reaches between her legs to rub her clit while watching the reflection, legs trembling. The visual and the sensation are hitting together and she can't process both. Her commentary dissolves into moans she doesn't bother narrating.`;
        } else if (bothBig) {
            pvText = `Neither of you yields. She pushes you toward the workbench; you push back. The contest becomes its own foreplay — two powerful bodies straining, gripping, wrestling — until you take her hips and drive your ${playerGenSize} cock into her pussy and she wraps her legs around you and pulls.\n\n{corwin}"Gods, look at us." She's staring at the mirror — two massive women locked together, muscle flexing, skin slick. Every thrust makes her breasts bounce and she watches them in the reflection, grinning even while gasping. {corwin}"Nobody in this room is small. I love it."`;
        } else {
            pvText = `She pulls you onto the bed and positions herself with deliberate care — not for comfort, for the visual. She angles toward the mirror, spreads her thighs, and guides your ${playerGenSize} cock to her pussy. {corwin}"Right there. Now look."\n\nYou push inside and she moans — loud, performative at first, then the sensation catches up and the performance cracks. She's tight and wet and the feeling is real and her eyes flutter. She tries to watch the mirror and can't quite focus. {corwin}"Tell me what I look like right now."\n\nShe means it. She wants to hear it described because the sensation is overriding her ability to watch.`;
        }
        // PV stat modifiers
        if (corwinC >= 5 && !(mirrorDiscrepancy && corwinM >= 4)) {
            pvText += `\n\nHer massive breasts bounce with every thrust and she can't stop watching them. She cups one, squeezes, watches it deform under her fingers while your cock drives into her. The dual input — sight and sensation — is overwhelming. She keeps losing the rhythm to stare at herself.`;
        } else if (corwinC >= 4) {
            pvText += `\n\nHer ${npcChest} sway with every motion and she watches them — mesmerized by her own body in motion. She catches sight of them in the reflection and her breath stutters.`;
        }
        if (corwinB >= 5) {
            pvText += `\n\nHer enormous ass cushions every impact, rippling with each thrust. She looks back at it over her shoulder, watches it move in the mirror, and the sight makes her clench tighter around you.`;
        }
        if (corwinM >= 5 && !mirrorDiscrepancy && !bothBig) {
            pvText += ` She braces with one arm and the other hand grips your hip, pulling you deeper with effortless strength. She could hold this position all day and she knows it looks good.`;
        }
        // PV player standout modifiers
        if (playerC >= 4) {
            pvText += `\n\nHer eyes keep drifting to your chest. She reaches for your breasts mid-stroke, cups them, watches them bounce in her hands while you thrust. {corwin}"Look at those." She squeezes and watches and her pussy clenches around you reflexively — the visual feeding the sensation.`;
        }
        if (playerB >= 4) {
            pvText += `\n\nShe grabs your ass, pulls you deeper, watches the way your hips flex in the mirror. {corwin}"Turn around." She wants to see the impact from behind. She wants to watch.`;
        }
        // PV size overlay
        if (playerGS >= 2 && corwinGS === 0) {
            pvText += `\n\nHer tight pussy grips your thick cock and she clenches with smug intent — the sensation is sharp, vivid, every inch amplified. {corwin}"I knew tight was the way to go." She's proud of her own logic even while she's losing her composure. Her hips grind against you, maximizing the friction, and the smugness dissolves into a moan she didn't plan.`;
        } else if (playerGS === 0 && corwinGS >= 2) {
            pvText += `\n\nShe's swollen and dripping — thick folds engulfing your modest cock in slick, plush heat. Everything is amplified and she's too sensitive to maintain the commentary. Her body keeps interrupting her — a moan here, a gasp there, hips bucking without permission. {corwin}"It's so much—" She doesn't finish. Her body finishes for her.`;
        } else if (playerGS >= 2 && corwinGS >= 2) {
            pvText += `\n\nHer swollen pussy and your thick cock together are staggering — every thrust lands hard, every inch registers. She grips the sheets and her composed commentary shatters. Just sensation, just visual, both too much. She stares at where your bodies meet and her mouth moves but nothing comes out.`;
        } else if (playerGS === 0 && corwinGS === 0) {
            pvText += `\n\nBoth tight, both precise. She chose the smallest because she figured tightest was best, and the friction proves her right. She clenches with deliberate control, watching your face, smug. {corwin}"I knew it." She angles her hips and the sensation spikes for both of you.`;
        }

        // === VV: both vulva ===
        let vvText;
        if (mirrorDiscrepancy && corwinM >= 4) {
            // Mirror scene: Corwin m4+ with vagina, player smaller with vagina
            vvText = `She pulls you against her, facing each other, her powerful arms holding your slight frame off the ground. She grinds against you — thigh between your legs, your thigh between hers, both slick, both pressed together.\n\n{corwin}"Mirror." She adjusts the angle so you're both reflected — her muscular body engulfing your delicate one, thighs interlocked, wetness gleaming between you. She grinds harder, watching the way your body moves against hers. {corwin}"Tell me what this looks like." She can see it. She wants to hear it too.`;
        } else if (mirrorDiscrepancy && playerM >= 4) {
            // Mirror scene: Player m4+, Corwin smaller with vagina
            vvText = `She instructs you to hold her — facing the mirror, her slight body in your powerful arms. You press your thigh between her legs and she wraps around it, grinding, watching herself in the reflection. Her hand slides between your legs from behind.\n\n{corwin}"Look at us." She's mesmerized — her petite form held by your muscular frame, both wet, grinding in the mirror's view. She rubs your clit while riding your thigh and keeps checking the reflection between gasps.`;
        } else if (bothBig) {
            vvText = `Two massive women tangled together. She pushes you down and you pull her with you. She grinds against your thigh and you grind against hers — both powerful, both slick, neither yielding.\n\nShe keeps pulling back to look at the two of you together. {corwin}"Gods, look at us." So much body, so much skin, muscle and curves everywhere. She grinds harder, fingers finding you while you find her, working each other with urgent, admiring hands.`;
        } else {
            vvText = `She pulls you down onto the bed and tangles herself around you — legs interlocking, hands everywhere, trying to touch and be touched and watch all at once. She slides her fingers between your thighs and finds you wet, and the sound she makes is pure satisfaction.\n\n{corwin}"Look at us." She angles you both toward the mirror while her fingers work you — circling, pressing, reading your face the way a charmer reads a mark. She guides your hand between her legs. {corwin}"Here. Touch me while I watch."`;
        }
        // VV gs-awareness
        if (playerGS >= 2 && corwinGS >= 2) {
            vvText += `\n\nBoth swollen, both slick — thick folds meeting thick folds, fingers sinking in deep. The sensitivity is staggering and she can't maintain the visual narration. Her hips buck into your hand and she gasps, head falling back. When she looks at the mirror again her eyes are glazed. {corwin}"It's too—" She presses harder. She doesn't stop.`;
        } else if (playerGS === 0 && corwinGS === 0) {
            vvText += `\n\nBoth tight, both sensitive. Her fingers circle your clit with precision while you match her rhythm inside her. She watches your face, then the mirror, then your face. {corwin}"I knew tight was the right call." She clenches around your fingers and her smugness breaks into a gasp.`;
        } else if (playerGS >= 2 && corwinGS === 0) {
            vvText += `\n\nYour swollen folds are thick under her fingers — she traces every crease, fascinated, spreading the wetness. {corwin}"Look how wet you are." She's comparing against her own tight, precise entrance. The contrast turns her on more than the similarity would.`;
        } else if (playerGS === 0 && corwinGS >= 2) {
            vvText += `\n\nShe's swollen and dripping — her thick pussy engulfing your fingers in slick heat. She grinds against your hand and the sensitivity overwhelms her commentary. {corwin}"It's so much, I can't—" She can. She does. But she can't narrate while she does it.`;
        }
        // VV stat modifiers
        if (corwinC >= 4) {
            vvText += `\n\nHer ${npcChest} press between them as she grinds closer. She grabs one of her own breasts, squeezes, watches it in the mirror while her other hand works you. The dual focus — her body, your body — is her sweet spot.`;
        }
        if (playerC >= 4) {
            vvText += `\n\nHer mouth finds your chest — lips, tongue, teeth. She buries her face between your breasts and makes muffled sounds of satisfaction. Her hand doesn't stop working between your legs. She keeps coming back to your chest even when her focus should be elsewhere.`;
        }

        // === VP: Corwin penis + player vulva ===
        let vpText;
        if (mirrorDiscrepancy && corwinM >= 4) {
            // Mirror scene: Corwin m4+ with penis, player smaller
            vpText = `She stands behind you, both facing the mirror. She lifts you with one arm — casual, strong — and settles you in her lap, her ${npcGenSize} cock pressing against your pussy from behind. {corwin}"Watch."\n\nShe lowers you onto her cock and you both watch it happen in the mirror. Your slight body sinking down, her muscular frame holding you up, her breasts pressing against your back. She bobs you — not thrusting, bobbing, using your body's weight — and watches two sets of breasts bounce in the reflection.\n\n{corwin}"Look at us." Her voice is rough. She's watching herself fuck you in the mirror and the visual is everything she ever wanted.`;
            if (corwinGS >= 2) {
                vpText += ` At this size, she can see the shape of her cock pressing against your belly and she almost stops. Almost. {corwin}"Oh gods, look—" She bobs you harder, chasing the visual.`;
            }
        } else if (mirrorDiscrepancy && playerM >= 4) {
            // Mirror scene: Player m4+, Corwin smaller with penis
            vpText = `She positions you in front of the mirror and instructs you to hold her facing it. {corwin}"Like that. I want to see everything."\n\nYou hold her up — she's slight in your arms — and she wraps her legs around you, reaching between them to guide her ${npcGenSize} cock into your pussy from behind. She's the petite one being held, her cock inside you, watching the whole thing reflected.\n\nHer hand drifts between her own legs, rubbing her clit while her cock thrusts, eyes locked on the mirror. The sight of herself — small, feminine, cock buried in someone twice her size — is undoing her.`;
        } else if (bothBig) {
            vpText = `Two powerful bodies, and she has the cock. She grabs your hips and drives her ${npcGenSize} shaft into your pussy with practiced confidence — she's had a cock her whole life, she knows the mechanics. But in this body, with these breasts bouncing, with this much muscle behind every thrust, the feedback is different.\n\nShe catches sight of you both in the mirror and grins through gritted teeth. {corwin}"Gods, look at us." Two massive women, one buried inside the other, muscles flexing. She thrusts harder, watching the reflection.`;
        } else {
            vpText = `She guides you to the bed with a charmer's confidence — hands on your hips, mouth on your neck, her ${npcGenSize} cock pressing against your thigh. {corwin}"I kept this." She grins. {corwin}"Best decision I ever made."\n\nShe positions you and slides inside your pussy with a groan that's half performance, half genuine. She knows this part — the thrust, the rhythm, the angle. She's done this a thousand times. But then her new breasts bounce with the motion and she looks down and loses her rhythm entirely.\n\n{corwin}"That's—" She watches them sway, fascinated, cock still inside you, hips stuttering. The old expertise and the new body are fighting for control.`;
        }
        // VP stat modifiers
        if (corwinC >= 5 && !(mirrorDiscrepancy && corwinM >= 4)) {
            vpText += `\n\nHer massive breasts are hypnotic with every thrust — bouncing, swaying, the weight of them pulling her forward. She cups one while thrusting and the dual sensation makes her rhythm break. She's watching her own chest more than she's watching you.`;
        }
        if (corwinB >= 5) {
            vpText += `\n\nHer enormous ass drives every thrust forward — she rolls her hips and the mass behind it is devastating. She glances back at the mirror to watch herself move and the sight makes her thrust harder.`;
        }
        if (playerC >= 4) {
            vpText += `\n\nShe reaches for your breasts while she thrusts — cupping, squeezing, pressing her face between them mid-stroke. She pulls back to look, then dives in again. She's waited her whole life to have breasts at arm's length during sex.`;
        }
        if (playerB >= 4) {
            vpText += `\n\nShe grabs your ass with both hands, pulling you onto her cock, watching the impact in the mirror. She squeezes, watches the flesh deform in her hands, and grins. {corwin}"Incredible."`;
        }
        // VP size overlay
        if (corwinGS >= 2 && playerGS === 0) {
            vpText += `\n\nHer thick cock stretches your tight pussy and she watches your face with the expertise of someone who's done this before — but in this body, with these breasts bouncing, the familiar act becomes overwhelming. She thrusts with practiced confidence and then a sensation she didn't expect ripples through her new body and her swagger cracks. {corwin}"That's different. That's—" She doesn't stop. She chases it.`;
        } else if (corwinGS === 0 && playerGS >= 2) {
            vpText += `\n\nHer modest cock slides into your swollen, dripping pussy — engulfed in slick heat. She compensates with angle and precision, finding the spot that makes you gasp. {corwin}"Still got it." The old confidence. But in her new body the feedback loop hits different and her smirk wavers.`;
        } else if (corwinGS >= 2 && playerGS >= 2) {
            vpText += `\n\nHer thick cock fills your swollen pussy completely — both oversized, both overwhelmed. She watches herself push in and the visual combined with the sensation shatters her composure. {corwin}"Look at—" She can't finish. She's too busy feeling.`;
        } else if (corwinGS === 0) {
            vpText += `\n\nFamiliar territory — she's had a cock her whole life, and at this size, she knows every trick. Angle, rhythm, pressure. The old moves work. But in her woman's body the feedback is different and she keeps getting distracted by sensations that weren't there before. Competent, confident, and quietly overwhelmed.`;
        }

        // === PP: both penis ===
        let ppText;
        if (mirrorDiscrepancy && corwinM >= 4) {
            // Mirror scene: Corwin m4+ with penis, player smaller with penis
            ppText = `She holds you against her, both facing the mirror, her ${npcGenSize} cock pressed against your ${playerGenSize} shaft. She wraps one powerful hand around both and strokes, watching the reflection — her muscular body behind your slight one, two cocks in her grip, her breasts pressing against your back.\n\n{corwin}"Look at us." She strokes and watches, strokes and watches. The visual of her powerful frame around your delicate one, both cocks throbbing together — she's directing and starring in her own fantasy.`;
        } else if (mirrorDiscrepancy && playerM >= 4) {
            ppText = `You hold her from behind, one arm around her waist, the other reaching down to wrap around both cocks — her ${npcGenSize} shaft and your ${playerGenSize} length pressed together. She's the petite one, held, watching in the mirror.\n\nShe reaches between her own legs, rubbing where her cock meets yours, watching the reflection with parted lips. {corwin}"Oh, that's a picture." Her hips push into your grip, chasing friction, watching herself be held and stroked by someone twice her size.`;
        } else if (bothBig) {
            ppText = `She wraps both hands around their cocks — her ${npcGenSize} shaft and your ${playerGenSize} length, pressed together between two massive bodies. She strokes, muscles flexing in her forearms, watching the mirror.\n\n{corwin}"Two big women with two big cocks." She grins through the sensation. {corwin}"This is the best day of my life." She means it. She pulls back to look at the two of you — enormous, powerful, both hard — and the visual feeds the friction.`;
        } else {
            ppText = `She takes both cocks in hand — her ${npcGenSize} shaft and your ${playerGenSize} length, pressed together — and strokes with the confidence of someone who's handled one of these her entire life. She positions them toward the mirror.\n\n{corwin}"Look at this." She's fascinated — her woman's hand wrapped around two cocks, her new breasts swaying with the motion. The old expertise with the new visual. She strokes faster and watches the mirror, and her commentary dissolves into breathy moans when the sensation catches up to the sight.`;
        }
        // PP stat modifiers
        if (corwinC >= 5) {
            ppText += `\n\nShe presses both cocks between her massive breasts — engulfing them in warm, soft flesh — and strokes while squeezing. She watches the heads appear and disappear between her chest and the look on her face is pure ecstasy. The vanity and the sensation fusing into one.`;
        } else if (corwinC >= 4) {
            ppText += `\n\nShe leans forward and her ${npcChest} press against both shafts. She grinds, using the softness as friction, watching herself do it.`;
        }
        if (playerC >= 4) {
            ppText += `\n\nHer free hand finds your chest — squeezing, groping, eyes darting between your breasts and the cocks in her grip. She can't settle on where to look. Everything is a visual she wants to memorize.`;
        }
        // PP size overlay
        if (playerGS >= 2 && corwinGS >= 2) {
            ppText += `\n\nBoth thick, both throbbing — her hand barely fits around both shafts. She strokes and the pressure is staggering. {corwin}"Look at these." She's openly admiring — the sight of two big cocks in her feminine hand. Her composure disintegrates under the combined sensation.`;
        } else if (playerGS === 0 && corwinGS === 0) {
            ppText += `\n\nBoth modest — her hand wraps easily around them. She strokes with precision, angle and rhythm compensating for size. {corwin}"Still got the touch." The old confidence, in a new body. She watches the mirror, compares the two shafts, and her competitive instinct and her arousal merge.`;
        }

        const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };

        this.text = opening + '\n\n' + getSexSceneText('corwin', branches);

        gameState.npcs.corwin.trust += 1;
        saveState();
    },
    actions: [
        {
            label: 'Something activates...',
            nextScene: 'corwin_sex_transform',
        },
        {
            label: 'Continue...',
            nextScene: 'corwin_sex_closing'
        }
    ]
};

SCENES['corwin_sex_transform'] = {
    id: 'corwin_sex_transform',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('corwin', 'transform');
        markTransformationSeen('corwin');

        const npcBody = gameState.npcs.corwin.body;
        const playerBody = gameState.player.body;
        const corwinC = npcBody.chest;
        const corwinGS = npcBody.genitaliaSize;
        const corwinHasVulva = npcBody.genitalia === 0;
        const playerGS = playerBody.genitaliaSize;
        const npcChest = getBodyStatDesc('corwin', 'chest');
        const npcGenSize = getBodyStatDesc('corwin', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        // === Tease: accidental device trigger in the heat of the moment ===
        const tease = `Her back arches against the edge of the bed and her elbow knocks something off the shelf behind her. A device, crystal housing, unfamiliar runes. It clatters, activates on impact, and a warm pulse washes over her chest before either of you can react.\n\n{corwin}"What..." She looks down. Her eyes go wide.`;

        // === Transform: four breasts (chest-stat aware) ===
        let transform;
        if (corwinC >= 5) {
            transform = `Below her ${npcChest}, two new mounds are forming, pressing out from her ribcage, swelling steadily. Her top pair doesn't change, already massive, but the second set grows beneath them until they're nearly as large. Huge by any conventional standard, resting just below the originals.\n\nCorwin leans back against the edge of the bed, four breasts settling in two heavy rows, the upper pair resting on the lower. She stares at herself. Then a grin splits her face.\n\n{corwin}"Four." She cups the lower pair and her breath catches. {corwin}"I have four of them." She bounces experimentally, all four swaying with different weight, the upper pair heavier, the lower pair following a beat behind. She's glowing. {corwin}"What's better than having amazing breasts?" She looks at you, incandescent. {corwin}"Having a second set."`;
        } else {
            transform = `Her ${npcChest} begin to swell, heavier, rounder, pushing outward, filling until they're large and full. But that's not all. Below them, two new mounds are forming, pressing out from her ribcage, growing in tandem until they're almost as large as the swollen upper pair.\n\nCorwin leans back against the edge of the bed, four breasts settling in two generous rows, the upper pair resting on the lower. She stares down at herself. Then a grin splits her face.\n\n{corwin}"Four." She cups the lower pair and her breath catches. {corwin}"I have four of them." She bounces experimentally, all four swaying together, the upper pair heavier, the lower pair following a beat behind. She's glowing. {corwin}"What's better than having breasts?" She looks at you, incandescent. {corwin}"Having a second set."`;
        }

        // === Genital branches (image is waist-up, leaning at bed edge) ===
        const branches = {
            'pv': `She pulls you closer by the wrist, leaning back against the edge of the bed, all four breasts on display. {corwin}"Get over here. Now."\n\nYou slide your ${playerGenSize} cock into her pussy and she moans, loud, performative, and then the performance cracks because the sensation of all four breasts bouncing at once hits her like a wall. {corwin}"Touch them. All of them." Your hands roam across the doubled expanse, upper pair, lower pair, the warm valley between, and she arches into every point of contact, head tipping back.\n\nThe orgasm takes her theatrically. She cries out without restraint, all four breasts heaving, back arching off the edge of the bed. She grabs you and pulls you against the whole warm landscape of her chest, trembling and laughing. {corwin}"Oh gods. Oh, that was..." She squeezes both lower breasts and shudders through the aftershocks.`,
            'vv': `She pulls you on top of her at the edge of the bed, four breasts creating a landscape of softness between your bodies. Your own breasts sink into hers and there's warmth everywhere, skin dragging against skin with every shift.\n\nShe guides your hand between her legs and finds you with her own. {corwin}"I can feel everything. Everywhere." She's not narrating for effect. She genuinely can't sort the input. Fingers working, hips grinding, all four breasts pressed and shifting between you.\n\nShe comes with a sound that's half laugh, half cry, too much sensation from too many points, her body clenching around your fingers while hers drive you over seconds later. She lies there panting, four breasts rising and falling in two rows. {corwin}"Best. Day. Ever."`,
            'vp': `She pushes you back against the bed, four breasts swaying as she positions herself. {corwin}"Watch them bounce." She slides her ${npcGenSize} cock into your pussy and they do, all four, hypnotic and heavy, the upper pair swaying while the lower pair follow with a different rhythm.\n\nShe grabs your hands and presses them to the lower pair while the upper ones move freely. {corwin}"Touch me. I need it everywhere." She thrusts with practiced confidence and then the quadrupled feedback hits her and her eyes roll back. The old moves can't account for this much body.\n\nShe comes buried deep inside you, all four breasts heaving, the sound she makes raw, past performance, past narration. She leans over you, panting, and looks down at the four heavy shapes between you. {corwin}"Look at me."`,
            'pp': `She nestles your ${playerGenSize} cock in the valley between her upper breasts while her ${npcGenSize} shaft slides between the lower pair. {corwin}"Double the pleasure." She presses all four together and warm flesh engulfs both shafts. She leans back against the edge of the bed and rocks, stroking with her whole body.\n\nThe visual undoes her before the friction does — looking down at four breasts wrapped around two cocks. {corwin}"This is the best thing that's ever happened to me." She comes with both shafts buried in her chest, all four breasts shaking, crying out theatrically and then for real as the sensation catches up. You follow, and warmth pools across all four breasts.`
        };

        // === Revert ===
        const revert = `\n\nThe effect fades. Her lower breasts slowly recede, shrinking, flattening, sinking back into her ribcage until only the original pair remains. Corwin watches them go, looking down at herself with genuine mourning.\n\n{corwin}"No." She cups the space where the lower pair used to be. {corwin}"Come back." They don't. She sighs, looks down at her remaining breasts, and cups them instead.\n\n{corwin}"We're doing that again." It's not a request.`;

        this.text = tease + '\n\n' + transform + '\n\n' + getSexSceneText('corwin', branches) + revert;
    },
    actions: [
        { label: 'Continue...', nextScene: 'corwin_sex_closing' }
    ]
};

SCENES['corwin_sex_closing'] = {
    id: 'corwin_sex_closing',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('corwin', 'base');

        const npcBody = gameState.npcs.corwin.body;
        const playerBody = gameState.player.body;
        const corwinM = npcBody.muscle;
        const corwinC = npcBody.chest;
        const corwinB = npcBody.butt;
        const corwinGS = npcBody.genitaliaSize;
        const corwinHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerB = playerBody.butt;
        const playerM = playerBody.muscle;
        const sawTransform = hasSeenTransformation('corwin');
        const isGoddess = corwinC >= 5 && corwinB >= 5 && corwinM >= 4;
        const npcChest = getBodyStatDesc('corwin', 'chest');
        const npcGenSize = getBodyStatDesc('corwin', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        let text = '';

        // === CLIMAX (skip if transform path already delivered it) ===
        if (!sawTransform) {
            let climaxText = `The performance falls away. Corwin stops posing, stops narrating, stops checking the mirror. For the first time all scene she's not watching — she's feeling. Her eyes squeeze shut, her mouth opens, and the sound that comes out is raw and unscripted.\n\nShe comes hard. Whole body. Her hands grab whatever they can reach — your skin, the sheets, her own breasts — and she shakes through it, past words, past commentary, past vanity.`;

            const branches = {
                'pv': corwinM >= 4 ? `\n\nHer powerful body clamps around you — pussy clenching your ${playerGenSize} cock, legs locked, arms pulling you flush against her. She rides the orgasm with her full strength, every muscle engaged, and the mirror reflects something she's too overwhelmed to watch.` : `\n\nHer pussy clenches around your ${playerGenSize} cock — rhythmic, involuntary, nothing performed about it. Her hips stutter and she grips your shoulders, mouth open, eyes finally closed. The woman who always watches can't watch anymore.`,
                'vv': `\n\nHer fingers curl inside you as she comes — rhythm breaking, pressure building instead of releasing. Her hips buck against your hand and she grips your wrist. Her other hand is between her own legs and she's lost in the dual sensation, eyes shut, unable to watch the picture she's making for the first time all scene.`,
                'vp': `\n\nHer ${npcGenSize} cock pulses inside you — she thrusts through the orgasm with the old rhythm, the practiced confidence, but her face is entirely new. No charm. No performance. Just a woman overwhelmed by a body that still surprises her. She grips your hips and drives deep, eyes shut, past watching.`,
                'pp': `\n\nBoth cocks pulse together — hers and yours, the sensation cascading between them. She strokes through it, grip tightening, rhythm dissolving. Her eyes are closed — she's not watching the mirror, not narrating, not performing. Just feeling. The visual brain shuts down for the first time and sensation takes everything.`
            };

            text += climaxText + getSexSceneText('corwin', branches);
        }

        // === COMEDOWN (stat-priority — "look at us" framing) ===
        let comedown;
        if (isGoddess) {
            comedown = `\n\nCorwin lies sprawled across the bed — enormous, magnificent, taking up every inch of space. She's still touching herself. Not sexually — inventorying. Running her hands along her thick arms, cupping her massive breasts, tracing the curve of her enormous ass. Looking at herself. Looking at you. Looking at both together.\n\nShe catches the mirror and adjusts her pose. Even spent, even flushed, she's composing. {corwin}"We're the two hottest people alive right now." She runs her fingers through her dark hair, turns her head to check the angle, and pulls you against her vast body. {corwin}"Look at us." She says it like a prayer. She believes it completely.`;
        } else if (corwinC >= 5) {
            comedown = `\n\nCorwin props herself up on her elbows and looks down at her chest. Cups both breasts. Bounces them once. The satisfied smile is slow and complete — she's living the dream and she knows it.\n\nShe pulls you against her, your head sinking into the softness. {corwin}"Look at us." She means the image. The picture of two women together, her enormous breasts between them. The afterglow matters less than the composition.`;
        } else if (corwinM >= 4) {
            comedown = `\n\nCorwin flexes. She can't help it. One arm up, checking the definition, then the other. She runs a hand along her own thigh and looks at your body next to hers. She's still admiring the composition — two bodies, the contrast or the symmetry.\n\n{corwin}"We should do this more often." She grins, catching the mirror. {corwin}"We look incredible." She means the picture. She means the two of you together.`;
        } else if (corwinB >= 5) {
            comedown = `\n\nCorwin rolls onto her stomach, enormous ass in the air, and looks back at it over her shoulder. She wiggles. She's performing even in the comedown — for the mirror, for you, for herself.\n\n{corwin}"It looked amazing, right?" She already knows the answer. She slaps one cheek, watches it ripple, and settles with a satisfied sigh. Still posing. Still watching.`;
        } else if (corwinC <= 1 && corwinM <= 1) {
            comedown = `\n\nCorwin curls against you — small, flushed, feminine. She catches sight of you both in the mirror and studies the picture: two delicate bodies tangled together, all angles and warmth.\n\n{corwin}"Cute." She sounds genuinely pleased. {corwin}"We're cute." She traces your jaw with one finger, looking between you and the reflection. Two petite women in the afterglow. She chose this aesthetic and she's satisfied with the result.`;
        } else {
            comedown = `\n\nCorwin lies next to you, looking sideways, dark hair fanned across the pillow. She grins. Catches the mirror. Adjusts her pose so the angle is better.\n\n{corwin}"Look at us." She always says that. She means it every time. Already she's thinking about what to try next — what stats, what positions, what picture they'd make. The visual brain never sleeps.`;
        }
        text += comedown;

        // === Transform callback ===
        if (sawTransform) {
            text += `\n\nShe touches her chest — just two breasts now. {corwin}"I miss the other two already." She cups them, bounces once, sighs. {corwin}"We're absolutely doing that again. I need to see what they look like in different positions."`;
        }

        // === Player standout modifiers ===
        if (playerC >= 4) {
            text += `\n\nHer hand drifts to your breast. Not sexual anymore — possessive. She's claimed it. Her thumb traces an idle circle, watching her own hand on your chest in the mirror. She likes the image of it: her hand, your breast. The composition.`;
        }
        if (playerB >= 4) {
            text += `\n\nShe spoons behind you specifically so she can hold your ass. {corwin}"Just comfortable like this." Her hand rests on the curve, kneading absently. She's watching over your shoulder at how they look together in the mirror. The picture. Always the picture.`;
        }

        // === Exit line ===
        text += `\n\n{corwin}"Was that as hot as it looked?" She stretches, posing even now, dark eyes finding yours with satisfaction that hasn't dimmed since the first mirror check. She already knows the answer. She pulls on her shirt and catches her reflection one more time.\n\n{corwin}"We look incredible right now. You know that, right?"`;

        this.text = text;
    },
    actions: [
        { label: 'Return to workshop', nextScene: 'workshop_main' }
    ]
};

