// ============================================
// ALDRIC SCENES
// Extracted from scenes.js for modularity
// ============================================

// ==========================================
// MALE NPC WORKSHOP SCENES (Aldric, Corwin, Holt)
// ==========================================

// Aldric workshop arrival
SCENES['aldric_workshop_arrival'] = {
    id: 'aldric_workshop_arrival',
    image: '',
    imagePrompt: null,
    speaker: 'Aldric',
    text: '',
    onEnter: function() {
        if (gameState.npcs.aldric.firstDesireFulfilledDay !== null) {
            SceneManager.playScene('aldric_transformation_ready');
            return 'redirect';
        }
        this.image = getNpcImagePath('aldric');
        this.text = `Aldric ducks through the doorway, looking around the workshop with guarded curiosity.\n\n{aldric}"So this is the place." She runs a calloused hand along a workbench. {aldric}"Your uncle's work. I'll admit, I'm impressed." She turns to you. {aldric}"Let's see what it can do."`;
    },
    actions: [
        { label: 'Show the devices', nextScene: 'aldric_transformation_ready' }
    ]
};

SCENES['aldric_transformation_ready'] = {
    id: 'aldric_transformation_ready',
    image: '',
    imagePrompt: null,
    speaker: 'Aldric',
    text: '',
    onEnter: function() {
        this.image = getNpcImagePath('aldric');
        gameState.currentTransformationTarget = 'aldric';
        saveState();

        const npc = gameState.npcs.aldric;
        const desire = npc?.currentDesire;
        const label = desire?.label?.toLowerCase() || 'a change';
        const thresholds = getNpcTrustThresholds('aldric');
        const horny = (npc.trust >= thresholds.intimate) || npc.hiddenArchetype === 'goddess';

        if (horny) {
            this.text = `Aldric steps into your space, arms crossed, eyes locked on yours.\n\n{aldric}"${label[0].toUpperCase() + label.slice(1)}." No hesitation. She cracks her knuckles. {aldric}"Quit stalling. I want to feel it."`;
        } else {
            this.text = `Aldric crosses her arms and nods once.\n\n{aldric}"${label[0].toUpperCase() + label.slice(1)}." She rolls her shoulders like she's warming up at the forge. {aldric}"Let's get to it."`;
        }
    },
    actions: [
        { label: 'Select a device', nextScene: 'device_selection' },
        { label: 'Changed your mind?', nextScene: 'workshop_main' }
    ]
};

// Corwin workshop arrival

// ============================================
// ALDRIC SEX SCENES
// ============================================

SCENES['aldric_sex_intro'] = {
    id: 'aldric_sex_intro',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('aldric', 'base');
        markSexUnlocked('aldric');

        // --- Variables ---
        const npcBody = gameState.npcs.aldric.body;
        const playerBody = gameState.player.body;
        const aldricM = npcBody.muscle;
        const aldricC = npcBody.chest;
        const aldricB = npcBody.butt;
        const aldricGS = npcBody.genitaliaSize;
        const aldricHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerM = playerBody.muscle;
        const playerB = playerBody.butt;
        const playerGS = playerBody.genitaliaSize;
        const npcChest = getBodyStatDesc('aldric', 'chest');
        const npcButt = getBodyStatDesc('aldric', 'butt');
        const npcGenSize = getBodyStatDesc('aldric', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');

        // --- Part 1: Aldric's Body ---
        let part1;
        if (aldricM <= 1) {
            if (aldricC <= 1) {
                part1 = `Aldric's calloused hands find your shoulders — firm, precise, the grip of someone who's shaped metal for decades. She pushes you back against the workbench with more force than her slight frame should allow. She's smaller than she used to be. Thinner arms, narrower shoulders, a body that lost the bulk of the forge but kept the hands.\n\nShe pulls her leather vest over her head without ceremony. Beneath it she's lean, angular, flat-chested — a blacksmith's frame stripped of its muscle. The callouses on her palms are still there. Everything else is different.\n\n{aldric}"Bear with me." She looks at her own hands on your shoulders, testing the grip. Not enough force. She adjusts. {aldric}"I used to be able to lift an anvil." Not self-pity — inventory. She's cataloguing what she has to work with.`;
            } else if (aldricC <= 3) {
                part1 = `Aldric's calloused hands find your shoulders — firm, precise. She pushes you back against the workbench, her grip compensating for the strength she's lost. She's slight now, arms thinner than they've been since adolescence, but those hands still know exactly where to press.\n\nShe pulls her vest off and her ${npcChest} shift with the motion. She looks down at them — not embarrassment, just noticing. They move when she moves and she wasn't quite ready for that. She glances at you: is she supposed to do something with them?\n\n{aldric}"These are new." Gruff. Matter-of-fact. She touches one experimentally, registers the sensation, files it away. {aldric}"Bear with me. I'm still learning the layout."`;
            } else {
                part1 = `Aldric's calloused hands find your shoulders, but the body behind them is unfamiliar. She's slight — thin arms, narrow frame — and her ${npcChest} are heavy on that frame, shifting with every motion, impossible to ignore. She pushes you back against the workbench and the effort costs her more than it should.\n\nShe pulls her vest off and her chest drops free — heavy, swaying. She braces her arms against the workbench edge and lets them hang. The sensation alone makes her breath catch.\n\n{aldric}"I can't figure these out mid-act." Honest. Not embarrassed. She looks at you with genuine openness. {aldric}"Should I — do you want me to use these somehow?" She's asking for instruction the way an apprentice asks a journeyman.`;
            }
        } else if (aldricM <= 3) {
            part1 = `Aldric's calloused hands find your shoulders and push. The strength is close to what it used to be — not forge-strength, but functional. She's rebuilt some of what she lost, and her body moves with the confidence of someone relearning familiar ground.\n\nShe pulls her vest overhead. Her ${npcChest} settle as the fabric passes, and she rolls her shoulders — testing the range, the weight, the way her body responds. Her hands are still a blacksmith's hands: calloused, precise, sure of themselves even when the rest of her isn't.\n\n{aldric}"Show me." Two words. She steps closer and her brown eyes are steady, attentive. She's approaching this the way she'd approach a new alloy — testing the material before committing.`;
        } else {
            part1 = `Aldric's hands find your shoulders and the force behind them is real. She's stronger than she's been since the accident — maybe stronger than before, in a body she's still mapping. She pushes you back against the workbench and the wood groans.\n\nShe pulls her vest off and the body underneath fills the space. Dense muscle under brown skin, thick arms, power coiled through her shoulders and back. Her ${npcChest} sit on a chest wall that could crack stone. She flexes her hands, testing, measuring.\n\n{aldric}"I need to be careful with you." She means it. She's replaying every time she gripped too hard, overcorrected, forgot the difference between forge-strength and this. Every motion measured. She steps closer and the floor feels it.`;
        }
        // Part 1 butt modifier
        if (aldricB >= 5) {
            part1 += `\n\nHer ass has changed the geometry of her entirely — enormous, reshaping her silhouette. She turns and you see the full scale of it. She shifts her stance, recalibrating balance in real time, the way she'd adjust her footing at the forge. She reaches back, touches one cheek, testing the weight with a blacksmith's appraising hand. Doesn't comment. But she doesn't stop touching it either.`;
        } else if (aldricB >= 4) {
            part1 += ` Her ${npcButt} fills out her frame in a way that affects her balance — she shifts her stance wider, the forge instinct, and watches you notice.`;
        }

        // --- Part 2: Getting Close (power dynamics + mask drop) ---
        let part2;
        const bothPetite = playerM <= 1 && aldricM <= 1;
        if (playerM >= 5 && aldricM <= 1) {
            part2 = `You pull her against you and her slight body settles into your arms. The relief is immediate — visible in her shoulders, in the way her hands stop testing and start holding. Someone who can take what she gives without her having to measure every motion.\n\n{aldric}"Good." One word. She grips your arms, feels the muscle underneath, and something unclenches. She doesn't have to be careful. She presses against you, calloused palms flat on your chest, and for the first time since the scene started, she stops cataloguing and starts touching.`;
        } else if (playerM >= 5 && aldricM >= 2) {
            part2 = `You pull her close and she meets you — strength against strength. Her hands find your arms, test the muscle, and the tension in her jaw loosens. Someone who can take her full force.\n\nShe stops measuring. Her grip firms up, her body presses against yours without the careful restraint she's been holding. {aldric}"You can handle it." Not a question. The blacksmith found material that won't break.`;
        } else if (playerM <= 1 && aldricM <= 1) {
            if (playerC >= 4 && playerB >= 4) {
                part2 = `She draws you close and her calloused hands find the contrast — your slight frame, then the swell of your chest, then the curve of your ass. She pauses on each, not grabbing but studying. Testing the weight, the give. Her brown eyes are focused in a way that has nothing to do with desire yet — she's reading the material.\n\nThen her hands come back to your chest and stay. She traces the shape, cups, tests with forge-careful pressure. {aldric}"Does this feel good, or should I —" She adjusts based on your response. Immediately. Precisely. Filing away data.`;
            } else if (playerC >= 4) {
                part2 = `She draws you close and her hands find your chest — curious, careful, calloused fingers tracing the shape. She cups the weight, tests it with the attention she'd give a new material. Studies your face for feedback.\n\n{aldric}"Does this feel good, or should I —" She adjusts before you finish answering. Attentive. Not worshipful. A craftsman studying something new and filing away every response.`;
            } else if (playerB >= 4) {
                part2 = `She draws you close and her hands slide down your back to your ass. She cups one cheek, tests the weight. {aldric}"Hm." Satisfied sound. She squeezes once, deliberately, then uses the grip to pull you against her.\n\nPractical and appreciative at the same time. Her calloused palm stays there, holding, while her other hand traces your spine.`;
            } else {
                part2 = `She draws you close and you fold together — two slight bodies, all angles and warmth. Her calloused hands trace your spine, your ribs, the line of your hip. She maps you with a blacksmith's attention — pressure points, responses, what makes you tense and what makes you lean in.\n\n{aldric}"Show me." She angles herself against you, testing the fit. Her hands are careful, precise, asking questions through touch. This is new metal and she's learning the grain before she commits.`;
            }
        } else if (playerM <= 1 && aldricM >= 4) {
            part2 = `She pulls you against her and you feel the difference immediately — the density of her, the controlled power. Her arms close around you and she's hyperaware of the gap between her strength and yours. Every touch measured. She holds you the way she'd hold a piece she's tempering — firm enough to control, gentle enough not to damage.\n\nHer grip adjusts, loosens, adjusts again. {aldric}"Sorry. I forget how —" She catches herself mid-sentence, recalibrates. Her hands settle on your hips with deliberate gentleness. {aldric}"Sorry."`;
        } else if (playerM <= 1 && aldricM >= 2) {
            part2 = `She pulls you close with careful hands — not rough, not tentative. Measured. She's stronger than you and she knows it and she's accounting for the difference in every motion. Her calloused palms settle on your waist, drawing you in with steady pressure.\n\n{aldric}"Was that too much?" She checks your face. Adjusts her grip. The blacksmith testing tolerances.`;
        } else if (aldricM >= 5 && playerM >= 5) {
            part2 = `She pulls you close and you don't give. She pulls harder. Neither of you budges. Her eyes widen — then narrow with something like relief. Someone she doesn't have to measure herself against.\n\nHer grip firms up. She stops being careful and starts being honest — full strength, full pressure, calloused hands gripping with the force she's been holding back since the scene started. {aldric}"You can take it." The relief is visible in her shoulders.`;
        } else {
            part2 = `She draws you close with calloused hands — unhurried, testing the space between you. She settles against you, adjusts the angle, finds the position that works. Her hands move with the patient certainty of someone who shapes things for a living.\n\nHer brown eyes find yours. Steady. Attentive. She's reading your reactions the way she'd read metal — watching for the moment the material tells her what it needs. Her hands stop exploring and settle with purpose.`;
        }
        // Part 2 modifiers
        if (playerC >= 4 && !bothPetite) {
            part2 += ` Her hands find your chest and she studies them — touch, weight, how they respond to pressure. {aldric}"Does this feel good, or should I —" She adjusts based on what you show her. Attentive, not worshipful. Filing away data.`;
        }
        if (playerB >= 4 && !bothPetite) {
            part2 += ` Her hand slides to your hip, then lower. She cups, holds, notices the give. Uses your ass as a handhold — practical, appreciative. She tests the weight with one hand. {aldric}"Hm." Squeezes once, deliberately.`;
        }
        if (aldricM >= 5 && !(aldricM >= 5 && playerM >= 5) && !(playerM <= 1 && aldricM >= 4)) {
            part2 += ` Her arms close around you and the strength is real — she's dangerous in a body she's still learning. Every motion measured, overcorrection held in check.`;
        }
        if (aldricC >= 5) {
            part2 += ` Her massive chest presses between you — heavy, warm, overwhelming on her frame. She braces her arms and lets them hang and the sensation alone makes her breath catch.`;
        }

        // --- Part 3: Foreplay / Mask Drop (no oral phase — male NPC rule) ---
        let part3;
        if (aldricM <= 1) {
            part3 = `She strips the rest without performance — leather trousers, boots, everything set aside with forge efficiency. Each motion purposeful. She stands bare and slight, callouses on her palms, and looks at you with brown eyes that are assessing, not uncertain.\n\nThen she touches you. Calloused fingers on your skin, tracing, testing. Careful at first — too careful, almost too gentle. Her hands know what to do but her arms can't follow through the way they used to. She finds a spot that makes you react and her attention sharpens. She does it again. Harder. Watches your face.\n\nThe check-ins start. {aldric}"Was that too much?" {aldric}"Should I —" She's not performing uncertainty. She's gathering data. And between each question, her hands get surer. The blacksmith finding the rhythm of new material.`;
        } else if (aldricM <= 3) {
            part3 = `She strips efficiently — trousers, boots, vest already gone. No show. She's not embarrassed by any configuration of herself, just focused on what comes next. She stands bare, rebuilt, calloused hands flexing at her sides.\n\nHer hands find your skin and the testing begins. Careful pressure, watching your response, adjusting. She grips too hard, then loosens. Pushes, then checks: {aldric}"Was that too much?" She's mapping your tolerances with forge patience.\n\nThe questions dry up as she finds her footing. Her touch gets surer, more confident, calloused fingers finding pressure points with increasing precision. She stops asking because she can read the answers.`;
        } else {
            part3 = `She strips with forge efficiency — each piece of clothing removed and set aside like tools at the end of a shift. The body underneath is powerful, dense with muscle, and she moves through the space with measured deliberation. Every motion calculated.\n\nShe touches you and the restraint is palpable. Calloused fingers pressing with a fraction of what they could give. She's dangerous and she knows it — strongest she's ever been, in a body she's still calibrating. She finds a sensitive spot and her grip tightens instinctively, then loosens.\n\n{aldric}"Was that too much?" She checks. Once. The last time she'll ask — because after that her hands find their precision and the blacksmith takes over. Confident. Committed. Testing done.`;
        }

        const opening = part1 + '\n\n' + part2 + '\n\n' + part3;

        // --- Genital Branches ---

        // === PV: player penis + Aldric vulva ===
        let pvText;
        if (playerM >= 5 && aldricM <= 1) {
            pvText = `You lift her onto the workbench — she's light, her slight body settling in your hands without resistance. She wraps her legs around you, calloused heels hooking your back, and looks up at you with steady brown eyes.\n\nYou push your ${playerGenSize} cock into her pussy and her jaw tightens. She takes you with a controlled exhale, hands gripping your arms, reading the sensation. Everything about this is new — the position, the fullness, the way her body responds to yours from the inside.\n\n{aldric}"Show me." She means: set the pace. She watches your face while you thrust, cataloguing every response her body gives, learning the material. Her hips shift — a fraction, testing — and she finds the angle that works. Her grip firms up. She stops asking and starts matching your rhythm.`;
        } else if (aldricM >= 4 && playerM <= 1) {
            pvText = `She lifts you onto the workbench with one arm — not showing off. Repositioning. She straddles you and takes your ${playerGenSize} cock in calloused fingers, guiding it to her pussy. Sinks down with controlled force, jaw set, eyes open.\n\nHer hips roll — powerful, measured, each motion calibrated to not crush you. She's hyperaware of the strength difference and she's accounting for it in every thrust. Her hands pin your hips gently, holding you exactly where she wants you.\n\nThe rhythm builds and she finds what works. Her grip loosens as confidence replaces caution. She stops measuring and starts driving — forge-steady, building heat.`;
        } else if (aldricM >= 5 && playerM >= 5) {
            pvText = `She pushes you toward the workbench. You hold your ground. She pushes harder — calloused hands digging in — and neither of you moves. She exhales through her nose, almost a laugh, and reaches between you, taking your ${playerGenSize} cock and guiding it into her pussy while you're both still locked.\n\nThe penetration changes the dynamic. She gasps — short, surprised — and her grip shifts from pushing to pulling. You thrust and she braces against you, matching your force, calloused hands locked on your shoulders. Neither giving ground. Both driving harder.\n\nShe finds the rhythm and commits to it with forge conviction.`;
        } else {
            pvText = `She settles onto the workbench, guides your ${playerGenSize} cock to her pussy with calloused fingers, and pulls you in. Controlled. Deliberate. She takes you with a slow exhale, jaw tight, brown eyes on yours the whole time.\n\nShe's reading you. Every thrust registers — she watches your face, adjusts the angle, shifts her hips a fraction. Testing. When she finds the spot that makes your breath catch, she does it again. And again. The blacksmith found the seam in the metal.\n\nHer hands grip your hips, calloused palms rough against your skin, and her rhythm builds. Careful becomes confident. Confident becomes sure.`;
        }
        // PV stat modifiers
        if (aldricC >= 5 && !(playerM >= 5 && aldricM <= 1)) {
            pvText += `\n\nHer massive chest sways with every motion — heavy, overwhelming, too much new input. She braces her arms and lets them hang, and the sensation of them moving while she's being filled makes her breath stutter. She can't process both at once. She grips the workbench and lets her body take over.`;
        } else if (aldricC >= 3) {
            pvText += `\n\nHer ${npcChest} sway with the motion and she notices every time — glances down, then back at you. Still learning what they do during this. If you touch them she pays close attention to what that does.`;
        }
        if (aldricB >= 5) {
            pvText += `\n\nHer enormous ass affects every thrust — she pushes back and the impact ripples. She braces wider, adjusts her stance, the forge instinct kicking in. She holds still for a moment, processing the sensation, then pushes back into it. Not performing enjoyment — testing whether she likes it. She does.`;
        }
        if (aldricM >= 5 && !(aldricM >= 4 && playerM <= 1) && !(aldricM >= 5 && playerM >= 5)) {
            pvText += ` Her calloused hands grip the workbench and the wood groans. She notices. Loosens. Grips again — less. Calibrating.`;
        }
        // PV player standout modifiers
        if (playerC >= 4) {
            pvText += `\n\nHer hands find your chest between thrusts — calloused fingers tracing the shape, testing the weight. {aldric}"Does this feel good, or should I —" She adjusts based on your reaction. Precise. Attentive. Already filing it away.`;
        }
        if (playerB >= 4) {
            pvText += `\n\nHer hand slides to your ass — grips, holds, uses it as a handhold to pull you deeper. Practical and appreciative. She cups one cheek, tests the weight. {aldric}"Hm." The satisfied sound. She doesn't let go.`;
        }
        // PV size overlay
        if (playerGS >= 2 && aldricGS === 0) {
            pvText += `\n\nHer tight pussy grips your thick cock — she clenches with forge focus, controlling every inch. She angles deliberately, finds the friction that works, and commits to it. Goes still when you push deep, processing the fullness. Then pushes back into it.`;
        } else if (playerGS === 0 && aldricGS >= 2) {
            pvText += `\n\nShe's swollen and slick around you — thick folds gripping your modest cock in plush heat. She clenches and the sensation catches her off guard. She grips harder, adjusts, finds the rhythm that makes the extra sensitivity work for her instead of against.`;
        } else if (playerGS >= 2 && aldricGS >= 2) {
            pvText += `\n\nShe's swollen and dripping and your thick cock fills her completely. Every thrust lands hard, every inch registers. Her composure cracks — she grips the workbench, calloused knuckles white, and her steady rhythm breaks into something urgent. Too much input. She breathes through it like forge-heat.`;
        } else if (playerGS === 0 && aldricGS === 0) {
            pvText += `\n\nBoth tight, both precise. She clenches around your modest cock with deliberate control — every movement vivid and exact. She watches your face, calibrates, adjusts the angle by a fraction. Gets results. The craftsman's approach.`;
        }

        // === VV: both vulva ===
        let vvText;
        if (playerM >= 5 && aldricM <= 1) {
            vvText = `You push her down onto the workbench and her slight body settles beneath you. She opens her thighs, brown eyes steady, watching you with the same attention she'd give a master demonstrating a technique.\n\nYour fingers find her pussy soaking and you push inside. She flinches — not pain, just surprise at where the sensation comes from. Her jaw sets. She breathes through it, cataloguing. Then her hips press into your hand.\n\n{aldric}"Show me. I don't know what works yet." No ego. She reaches between your legs from below, calloused fingers finding your pussy with careful precision, learning from what you're doing to her and applying it in real time.`;
        } else if (aldricM >= 4 && playerM <= 1) {
            vvText = `She pushes you down onto the workbench — one hand on your chest, controlled force, the other sliding between your thighs. She spreads you with careful strength, calloused fingers finding your pussy with forge precision.\n\nShe's cautious. Hyperaware of the difference in strength. Her fingers push inside and she watches your face for feedback — adjusting pressure, depth, angle. {aldric}"Still good?" Not insecure. Responsible. A craftsman who doesn't want to ruin the piece.\n\nShe guides your hand between her own legs with her free hand. She's wet, and the surprise of it registers on her face for a half-second before she files it away.`;
        } else if (aldricM >= 5 && playerM >= 5) {
            vvText = `Neither yields. Hands gripping, bodies pressing, the contest sliding into something else. She slides her calloused fingers between your legs at the same moment you reach for her. Both freeze. Then both press deeper.\n\nIt becomes a different kind of contest. She matches your rhythm with forge precision — fingers curling, hips pressing. She can give her full strength without measuring and the relief shows. Her jaw unclenches. Her rhythm builds without restraint.`;
        } else {
            vvText = `She settles beside you on the workbench, calloused fingers tracing your thigh. She finds your pussy with careful attention — mapping, testing, learning what makes you respond. Her touch is precise but tentative at first, the way she'd handle an unfamiliar material.\n\nShe finds the spot that works and commits to it. Her rhythm steadies, confident now, calloused fingers working with forge precision. She watches your face the whole time — reading temperature, adjusting pressure.\n\nYou reach between her legs and she flinches at the first touch — surprise, not pain. {aldric}"That's..." She doesn't finish. She presses into your hand instead, learning from sensation what no amount of studying could teach.`;
        }
        // VV gs-awareness
        if (playerGS >= 2 && aldricGS >= 2) {
            vvText += `\n\nBoth swollen — thick folds meeting thick folds, everything slick and amplified. She goes still when the sensation hits, jaw clenching. She breathes through it the way you breathe through difficult physical work. Steady. Deliberate. Not fighting it. Then she presses harder.`;
        } else if (playerGS === 0 && aldricGS === 0) {
            vvText += `\n\nBoth tight, both precise. Her calloused fingers work you with controlled pressure, finding the exact spot and staying there. She clenches around your fingers in return — learning what works through your body and applying it to her own. Two people figuring it out together with honest, patient attention.`;
        } else if (playerGS >= 2 && aldricGS === 0) {
            vvText += `\n\nYour swollen folds are thick under her calloused fingers — she traces every ridge, every crease, learning the extra sensitivity. She watches your reactions and adjusts with forge precision. Her own tight pussy clenches around your fingers. She's precise where you're plush.`;
        } else if (playerGS === 0 && aldricGS >= 2) {
            vvText += `\n\nShe's swollen and slick — thick folds parting easily, her pussy engulfing your fingers in plush heat. Every touch lands hard and she wasn't ready for the intensity. She grips the workbench, breathing through it. Your own tight entrance responds to her calloused fingers.`;
        }
        // VV stat modifiers
        if (aldricC >= 4) {
            vvText += `\n\nHer ${npcChest} press between your bodies and she's aware of them constantly — they shift when she moves, new input she can't ignore. She braces against you, using the contact to ground herself.`;
        }
        if (aldricM >= 5 && !(aldricM >= 4 && playerM <= 1) && !(aldricM >= 5 && playerM >= 5)) {
            vvText += ` Her fingers inside you are strong — she feels you tense and adjusts instantly. Not worried. Calibrating.`;
        }
        if (playerC >= 4) {
            vvText += `\n\nHer calloused hands find your chest while her fingers keep working — she traces the shape, cups, tests. Studies them the way she'd study a new material. Her attention splits between the sensation below and the shape in her hands. She keeps coming back to them.`;
        }
        if (playerB >= 4) {
            vvText += `\n\nHer hand slides to your ass, grips, uses it as an anchor. She pulls you against her while her fingers work. Practical, appreciative — a handhold that happens to be exactly where she wants her hand.`;
        }

        // === VP: Aldric penis + player vulva ===
        let vpText;
        if (aldricGS >= 2) {
            // Big or baseline cock — experienced territory
            if (playerM >= 5 && aldricM <= 1) {
                vpText = `She lets you arrange her — your hands positioning her slight body, guiding her ${npcGenSize} cock to your pussy. She knows this instrument. Decades of experience. She pushes in with confident rhythm, jaw set, calloused hands gripping your thighs.\n\nBut the feedback has changed. Everything routes through hips she didn't use to have, through a pelvis that sits different. Her rhythm stutters — too much new input from familiar motions. She pulls back, tries again, slower.\n\n{aldric}"It's... more than I expected." She means the feeling, not the size. The blacksmith recalibrating a familiar tool in an unfamiliar workshop.`;
            } else if (aldricM >= 4 && playerM <= 1) {
                vpText = `She positions you with careful strength — calloused hands on your hips, controlled force, placing you exactly where she wants you. She guides her ${npcGenSize} cock to your pussy and pushes in. She knows this. The motion is familiar, the rhythm practiced.\n\nBut she's hyperaware of the power behind each thrust now. She measures every stroke, watching your face like a gauge — reading temperature, adjusting pressure. {aldric}"Still good?" She checks once. Then she reads the answer in your body and stops asking.\n\nHer rhythm builds — forge-steady, confident, each thrust placed with decades of practice.`;
            } else if (aldricM >= 5 && playerM >= 5) {
                vpText = `She pushes her ${npcGenSize} cock against your pussy and drives in without preamble — she knows this. Confident, practiced, the one part of the encounter that runs on muscle memory. You brace against her and she doesn't hold back.\n\nThe strength is mutual and the relief is visible. She thrusts with full force, calloused hands locked on your hips, and neither of you flinches. The rhythm is powerful, driving, two bodies that can take what the other gives. She stops calibrating and starts committing.`;
            } else {
                vpText = `She positions her ${npcGenSize} cock at your pussy with calloused fingers. This she knows — the angles, the rhythm, the way to read a partner's response. She pushes in with familiar confidence, jaw set, brown eyes on yours.\n\nBut the body behind the cock is different now. Her hips roll differently, her center of gravity has shifted, and the feedback loop routes through anatomy she's still learning. She stutters, adjusts, finds the new rhythm. {aldric}"It's... more than I expected." The sensitivity. The way everything amplifies through a body this changed.\n\nShe adapts. The blacksmith always adapts. Her rhythm steadies, builds, and the decades of experience fill in around the unfamiliar edges.`;
            }
        } else {
            // gs0 cock — familiar but rewired
            vpText = `She positions her ${npcGenSize} cock at your pussy — calloused fingers steady, precise. She knows this instrument, but it's responding differently in a woman's body. She pushes in with careful attention, jaw tight, reading every sensation.\n\nThe familiar motions work but the feedback has changed. Everything routes through hips she didn't use to have. She adjusts the angle, finds what works in this new configuration, and commits to it with forge focus.\n\nHer rhythm is precise, measured — treating it like a familiar tool in an unfamiliar workshop. She watches your face, calibrating. Finds the spot that makes your breath catch. Does it again. Deliberately.`;
        }
        // VP stat modifiers
        if (aldricC >= 5) {
            vpText += `\n\nHer massive chest sways with every thrust — the motion is new and she notices every time. She can't ignore them and she can't figure them out mid-act. She braces her arms and lets them hang, and the combined sensation of her chest swaying while she thrusts makes her rhythm stutter.`;
        } else if (aldricC >= 3) {
            vpText += `\n\nHer ${npcChest} shift with every thrust and she glances down each time — not embarrassment, just the persistent awareness of something new moving on her body while she's doing something familiar.`;
        }
        if (aldricB >= 5) {
            vpText += `\n\nHer enormous ass drives every thrust — momentum she's still learning to account for. She pushes deeper than she intended, the sheer mass behind her carrying the motion. She braces wider, adjusts her stance, and the impact ripples through her.`;
        }
        if (aldricM >= 5 && !(aldricM >= 4 && playerM <= 1) && !(aldricM >= 5 && playerM >= 5)) {
            vpText += ` She grips your hips and the wood beneath you creaks. She loosens immediately. Tightens again — less. The calibration is constant.`;
        }
        // VP player standout modifiers
        if (playerC >= 4) {
            vpText += `\n\nHer calloused hands find your chest between thrusts — cupping, testing, applying what she's learned about pressure and response. She's curious. Studies them the way she'd study a new material.`;
        }
        if (playerB >= 4) {
            vpText += `\n\nShe grabs your ass with both calloused hands, pulling you onto her cock with each thrust. Uses your body's weight to control the depth. Practical, effective. {aldric}"Hm." The satisfied sound.`;
        }
        // VP size overlay
        if (aldricGS >= 2 && playerGS === 0) {
            vpText += `\n\nYour tight pussy grips her thick cock and the sensation makes her rhythm break. She pushes deeper and the tightness grips every inch. She goes still — processing — then pushes again, slower. She's managing sensitivity she didn't expect at this size.`;
        } else if (aldricGS === 0 && playerGS >= 2) {
            vpText += `\n\nHer modest cock slides into your swollen, slick pussy — engulfed in plush heat. She angles for maximum effect with forge precision, finding pressure points, compensating for size with technique. She watches your face and adjusts until she finds what works.`;
        } else if (aldricGS >= 2 && playerGS >= 2) {
            vpText += `\n\nHer thick cock fills your swollen pussy completely — both oversized, both oversensitive. Every thrust lands devastatingly. Her calloused hands grip your hips and her steady rhythm shatters. Too much feedback. She breathes through it like forge-heat and pushes deeper.`;
        }

        // === PP: both penis ===
        let ppText;
        if (aldricM >= 4 && playerM <= 1) {
            ppText = `She wraps her calloused hand around both shafts — her ${npcGenSize} cock and your ${playerGenSize} length pressed together. She knows her own cock. The grip is familiar, the pressure practiced. She holds you in place with her free hand — careful, controlled — and strokes with forge-steady rhythm.\n\nShe watches both shafts in her grip, cataloguing the difference in response. Her calloused palm is rough against you, the friction different from anything you'd do to yourself. She adjusts pressure, angle, speed — reading your face, applying corrections.\n\n{aldric}"Was that too much?" Last time she asks. Your response tells her everything and her grip adjusts with precision.`;
        } else if (playerM >= 5 && aldricM <= 1) {
            ppText = `You take both cocks in hand — her ${npcGenSize} shaft and your ${playerGenSize} length — and she lets you. She leans against you, slight body settling into your strength, and watches where both shafts press together with focused attention.\n\nHer calloused hand wraps over yours, guiding the pressure. She knows her own cock — how it responds, what rhythm works. She shows you through touch. {aldric}"There." One word when you find the right grip. Her hips push into your hand, familiar motions in an unfamiliar body, the feedback different but the expertise intact.`;
        } else {
            ppText = `She wraps her calloused hand around both shafts — her ${npcGenSize} cock and your ${playerGenSize} length pressed together. This part she knows. Her grip is practiced, confident, decades of familiarity guiding the pressure and rhythm.\n\nBut both cocks pulsing together creates a feedback loop she wasn't expecting. Her hand on your shaft translates into pressure on hers and the dual input breaks her focus. She adjusts, finds the rhythm that serves both, and her calloused fingers work with increasing urgency.\n\nHer free hand braces against the workbench. Her jaw clenches. She's chasing something and the expertise is winning against the unfamiliarity.`;
        }
        // PP stat modifiers
        if (aldricC >= 5) {
            ppText += `\n\nHer massive chest presses against both shafts as she leans in — the weight, the warmth, the incidental friction. She wasn't trying to use them. They're just there, overwhelming and inescapable, and the added sensation makes her rhythm stutter.`;
        } else if (aldricC >= 3) {
            ppText += `\n\nHer ${npcChest} press between their bodies and she glances down — the sight of her chest above both cocks is something she's still processing. She shakes her head once and refocuses.`;
        }
        if (playerC >= 4) {
            ppText += `\n\nHer free hand finds your chest — calloused fingers tracing, testing, cupping the weight while her other hand works both shafts. She's splitting attention and losing the thread of both. Her grip tightens on your cock when she squeezes your chest.`;
        }
        // PP size overlay
        if (playerGS >= 2 && aldricGS >= 2) {
            ppText += `\n\nBoth thick — her calloused hand barely wraps around both shafts. She strokes and the friction is staggering, every ridge amplified. Her jaw clenches. She grips harder, stroking faster, the blacksmith pushing through difficult material.`;
        } else if (playerGS === 0 && aldricGS === 0) {
            ppText += `\n\nBoth modest — her calloused hand wraps easily around both, fingers precise. She strokes with controlled rhythm, every micro-adjustment deliberate. Forge technique applied to a different kind of metalwork.`;
        } else if (playerGS >= 2 && aldricGS === 0) {
            ppText += `\n\nYour thick cock dwarfs hers — she stares at the contrast, grip adjusting around the size difference. She presses her modest shaft against your thick one and uses the friction. Practical. She works with what she has.`;
        } else if (playerGS === 0 && aldricGS >= 2) {
            ppText += `\n\nHer thick cock strains against your modest length — the familiar instrument, oversensitive now. She presses them together and the feedback from her own cock overwhelms the rhythm. She adjusts, recalibrates. {aldric}"It's... more than I expected." The sensitivity, not the size.`;
        }

        const branches = { 'pv': pvText, 'vv': vvText, 'vp': vpText, 'pp': ppText };
        this.text = opening + '\n\n' + getSexSceneText('aldric', branches);

        gameState.npcs.aldric.trust += 1;
        saveState();
    },
    actions: [
        {
            label: 'Aldric bumps a device...',
            nextScene: 'aldric_sex_transform'
        },
        {
            label: 'Continue...',
            nextScene: 'aldric_sex_closing'
        }
    ]
};

SCENES['aldric_sex_transform'] = {
    id: 'aldric_sex_transform',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('aldric', 'transform');
        markTransformationSeen('aldric');

        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');
        const npcGenSize = getBodyStatDesc('aldric', 'genitaliaSize');

        // === Tease: accidental but not panicked — forge calm ===
        const tease = `Her elbow catches a device on the workbench shelf. It hums to life, a pulse of warmth radiating outward. Aldric goes still — not alarmed, just assessing. The blacksmith registering a change in the forge temperature.\n\n{aldric}"Something's happening." She looks down at herself. Her voice is level. Her hands are steady. She watches the way she'd watch metal change color in the heat — with attention, not fear.`;

        // === Transform: gigantic penis + body shrinks petite (mass transfer) ===
        const transform = `Her cock begins to swell. She watches it happen with forge-calm attention — thickening, lengthening, veins darkening as it grows past anything she's ever been. At the same time, her body diminishes. Shoulders narrowing, frame shrinking, mass transferring from everywhere else into the shaft between her legs.\n\nBy the time it stabilizes, she's barely recognizable. Petite. Delicate. A head shorter than before, her once-imposing frame now slight and fragile-looking. But between her legs stands a cock of absurd proportions — thick as her forearm, reaching past her chest, the head brushing her collarbone. Her balls hang heavy and swollen, round and taut against her diminished thighs.\n\nShe wraps her hands around the shaft. Her calloused fingers don't even come close to meeting. She can feel every heartbeat throbbing through it, every pulse of sensitivity amplified tenfold. She knows this instrument — she's had a cock for decades. She knows the angles, the rhythm, the way to grip.\n\nNone of that helps. The sensitivity is beyond anything she's experienced. Her shrunken body has no leverage, no strength to manage the sheer scale of it. She tries to adjust her grip and her whole frame shakes.\n\nA long exhale. Then:\n\n{aldric}"...holy shit."\n\nThe first time in the entire scene she's lost her composure completely. She stares at the cock in her hands — a master smith holding a tool she can't lift. The calm returns, but it's thinner now. She's working the problem. But the problem is winning.`;

        // === Genital branches ===
        const branches = {
            'pv': `Your ${playerGenSize} cock is modest compared to the monument between her legs. She reaches for you with one hand, the other bracing against her own shaft for balance. Her calloused fingers wrap around you and pull you close, pressing your cock against the massive surface of hers.\n\nShe strokes both — muscle memory guiding the motion on yours, but her own cock overwhelms her technique. Every pass of her hand sends her shaking. She grips tighter, tries to maintain forge rhythm, and her eyes lose focus.\n\n{aldric}"I know how to do this." Her voice is strained. {aldric}"I've done this a thousand times." But her hand stutters, the sensitivity too much for her shrunken body to manage. She keeps trying. The discipline holds even as the sensation cracks it.\n\nThe orgasm hits her like a forge hammer. Her petite body locks rigid, arms squeezing the massive shaft, a sound tearing from her throat that's half growl, half gasp. Her cock pulses in enormous throbs, each one shaking her entire frame. You follow, caught in the pressure between her shaft and her calloused grip.`,
            'vv': `Her cock is too large for anything but friction. She presses it against you, the massive shaft hot between your bodies, and grinds her hips with the desperation of someone who knows exactly what she wants and can't reach it.\n\nYou press yourself against the other side of the shaft and she makes a sound she's never made before — high, thin, nothing like gruff Aldric. Her calloused fingers find your pussy from below, working you with familiar precision while the rest of her shakes against her own impossible cock.\n\n{aldric}"I can't —" She grips the shaft tighter, her shrunken body trembling with the effort of managing sensation at this scale. {aldric}"I know how this works. I know how —" She can't finish. The expertise is useless at this proportion.\n\nShe comes grinding against her own shaft, petite body seizing, calloused hands locked around the base. The sound she makes fills the workshop. You follow with her fingers still inside you, both of you shuddering against the massive cock between you.`,
            'vp': `Her enormous cock can't fit inside you and she knows it — she's done the math. She wraps her shrunken body around the shaft and grinds, pressing the head against your stomach, your thighs, anywhere she can find friction. Her ${npcGenSize} cock has become something she can only ride, not wield.\n\nYou help — hands on the shaft, mouth on the head, and she makes a sound through her teeth that's pure overwhelmed blacksmith. {aldric}"That's —" She grips the base with both hands and her whole body shakes. She knows every technique for a cock this responsive. Her body is too small to execute any of them.\n\nThe orgasm wrecks her. Her petite frame goes rigid around the shaft, calloused hands locked tight, and the pulse that runs through her cock shakes them both. She holds on through it, jaw clenched, managing the aftermath the way she'd manage a cooling forge — breathing, holding, letting the heat pass.`,
            'pp': `She presses her enormous cock against your ${playerGenSize} shaft and the contrast is absurd — hers eclipses yours entirely. She wraps her calloused hand around both, but her shrunken fingers can barely grip her own cock, let alone yours alongside it.\n\nShe tries. Forge stubbornness. She adjusts her grip, braces against the workbench, and strokes with both hands — one on each shaft. Her coordination is perfect but her body keeps betraying her, shaking with every pass across her own oversensitive cock.\n\n{aldric}"I've had this for decades." She means a cock. Not this cock. {aldric}"This is —" A full-body shudder cuts her off. She keeps stroking. The discipline is extraordinary.\n\nShe comes with her whole body, petite frame locking rigid, both shafts pulsing under her calloused hands. The sound she makes is raw — nothing gruff left in it. You follow, and she holds both of you through it with the grip of a woman who never lets go of her tools.`
        };

        // === Revert ===
        const revert = `\n\nThe effect fades. Mass flows back — her frame expanding, shoulders broadening, strength returning to her arms. She watches it happen with the same forge-calm attention she watched it start, flexing her hands as they regain their familiar proportions. Her cock diminishes to its normal size and she exhales slowly.\n\nShe looks at her restored hands. Turns them over. Opens and closes them.\n\n{aldric}"I couldn't lift it." Quiet. Almost to herself. She means the sensation — the sheer scale of it, beyond what decades of experience could manage. She flexes her hands again, confirming they're hers. {aldric}"That was..." She shakes her head. No word for it.`;

        this.text = tease + '\n\n' + transform + '\n\n' + getSexSceneText('aldric', branches) + revert;
    },
    actions: [
        { label: 'Continue...', nextScene: 'aldric_sex_closing' }
    ]
};

SCENES['aldric_sex_closing'] = {
    id: 'aldric_sex_closing',
    image: '',
    speaker: '',
    text: '',
    onEnter: function() {
        this.image = getSexSceneImage('aldric', 'base');

        const npcBody = gameState.npcs.aldric.body;
        const playerBody = gameState.player.body;
        const aldricM = npcBody.muscle;
        const aldricC = npcBody.chest;
        const aldricB = npcBody.butt;
        const aldricGS = npcBody.genitaliaSize;
        const aldricHasVulva = npcBody.genitalia === 0;
        const playerC = playerBody.chest;
        const playerB = playerBody.butt;
        const playerM = playerBody.muscle;
        const npcChest = getBodyStatDesc('aldric', 'chest');
        const npcGenSize = getBodyStatDesc('aldric', 'genitaliaSize');
        const playerGenSize = getBodyStatDesc('player', 'genitaliaSize');
        const sawTransform = hasSeenTransformation('aldric');
        const isGoddess = aldricC >= 5 && aldricB >= 5 && aldricM >= 4;

        let text = '';

        // === Climax (skip if transform path already handled it) ===
        if (!sawTransform) {
            const climaxOpening = `The climax builds the way heat builds in a forge — steady, inevitable, and then all at once. Aldric's rhythm tightens. Her calloused hands grip harder. Her jaw clenches and her breathing goes sharp through her nose, controlled, forced steady, because everything else is spiraling.\n\nShe doesn't throw her head back. Doesn't cry out. She comes with held breath and grip tightening — controlled intensity, the forge at maximum heat, contained by discipline that's cracking at the edges.`;

            // PV climax
            let pvClimax;
            if (playerM >= 5 && aldricM <= 1) {
                pvClimax = `Her slight body clenches around your ${playerGenSize} cock — involuntary, total. Her calloused hands grip your arms and her legs lock around you. The held breath breaks into a single rough exhale. She takes everything you give with her jaw set and her eyes open.`;
            } else if (aldricM >= 4 && playerM <= 1) {
                pvClimax = `She grinds down on your ${playerGenSize} cock with the full controlled force of her powerful body — each roll deliberate, measured even now. Her orgasm hits and her grip tightens on the workbench, wood groaning. She rides through it with forge discipline, jaw locked, and drives you over after her.`;
            } else {
                pvClimax = `Her pussy clenches around your ${playerGenSize} cock — rhythmic, involuntary, nothing controlled about it. Her calloused hands grip whatever they can find and her hips stutter. She comes with a held breath that breaks into a rough exhale, and you follow, pulled over by the way she tightens around you.`;
            }

            // VV climax
            let vvClimax;
            if (aldricHasVulva && aldricGS >= 3) {
                vvClimax = `She comes with her whole body — aftershocks she can't predict, in an organ she barely understands. She grips the workbench with calloused hands, breathing through it like difficult physical work. Her thick, swollen pussy clenches around your fingers in waves she can't control. She drives you over with forge-precise fingers that don't stop even while she's shaking.`;
            } else if (aldricHasVulva) {
                vvClimax = `She comes and the surprise shows — not at the pleasure, but at the shape of it. Different from anything she has a framework for. She goes rigid, calloused hands locked on the workbench, jaw clenched. A sound escapes through her teeth. Her fingers don't stop working you, and she drives you over with precision that holds even through her own orgasm.`;
            } else {
                vvClimax = `She comes with calloused fingers still working you — jaw locked, eyes open, her body going rigid against yours. She drives you over seconds later with precise, steady strokes that don't falter even as her own aftershocks hit.`;
            }

            // VP climax
            let vpClimax;
            if (aldricGS >= 2) {
                vpClimax = `She buries her thick cock deep and holds — hips pressing flush, calloused hands locked on the workbench. The held breath breaks. Her cock pulses inside you in long, heavy throbs, familiar and unfamiliar at once — the same instrument, different acoustics. She doesn't pull out. She stays locked against you, jaw set, riding through it. You come around her and the clench makes her grip tighten.`;
            } else {
                vpClimax = `She buries her modest cock to the hilt and comes with precise, controlled intensity — held breath, single tremor, jaw locked. Her cock pulses inside you in careful throbs. She watches you while she finishes, brown eyes steady, reading the gauge. You follow, clenching around her, and she takes it in with quiet attention.`;
            }

            // PP climax
            let ppClimax;
            if (aldricGS >= 2) {
                ppClimax = `Her calloused hand tightens around both shafts — her thick cock straining against yours. The rhythm turns urgent, forge-precise, building to the breaking point. She comes with a held breath and a single rough sound through her teeth. Her cock pulses hard against yours. You follow, and her grip doesn't loosen until the last throb.`;
            } else {
                ppClimax = `Her calloused hand tightens around both shafts and the rhythm turns precise, urgent. She comes with controlled intensity — held breath, jaw locked. Her modest cock pulses against yours in deliberate throbs. Her grip doesn't release. She rides it out watching your face, and you follow under her expert hand.`;
            }

            const branches = {
                'pv': pvClimax,
                'vv': vvClimax,
                'vp': vpClimax,
                'pp': ppClimax
            };

            text += climaxOpening + '\n\n' + getSexSceneText('aldric', branches);
        }

        // === Comedown (stat-priority) ===
        let comedown;
        if (isGoddess) {
            comedown = `\n\nShe sits on the edge of the workbench, breathing like she just finished a twelve-hour forge session. She doesn't speak for a long time. Her hands are shaking — she looks at them, turns them over, watches them still.\n\nToo much new at once. Her chest, her ass, her hips, her strength — all enormous, all sensitive, all hitting at once. The blacksmith wanted to take each sensation one at a time and they all came together.\n\n{aldric}"I don't know what half of that was." Not upset. Honest. She looks at you and there's something raw in it — she just experienced more new things in twenty minutes than in twenty years. {aldric}"Thank you. For being patient with me."`;
        } else if (aldricC >= 5) {
            comedown = `\n\nShe cups her own chest, testing the weight, still processing. She's been doing that the whole time and she can't stop. They're heavy, sensitive, everywhere — and she still doesn't know what to do with them.\n\n{aldric}"They don't stop moving." Not a complaint. An observation. She looks at you for confirmation that what just happened was normal. Whatever you say, she nods once, files it away.`;
        } else if (aldricB >= 5) {
            comedown = `\n\nShe shifts on the workbench and feels the cushion of her own ass. Pauses. Shifts again. {aldric}"That's going to take getting used to."\n\nShe stands, looks over her shoulder at herself with the same appraising eye she'd give a finished blade. Doesn't say whether she likes it. The fact that she's looking says enough.`;
        } else if (aldricM >= 4) {
            comedown = `\n\nShe flexes her hands, opening and closing them. Checking her own strength the way she'd check a tool after heavy use. {aldric}"I need to be more careful." She means during sex. She's replaying moments where she gripped too hard or pushed too fast. Not guilt — calibration. She'll be better next time because she's noted the tolerances.`;
        } else if (aldricGS >= 3 && !aldricHasVulva) {
            comedown = `\n\nShe looks down at herself, still half-hard, still oversensitive. {aldric}"That's... a lot to manage." She sits carefully, adjusts, winces at the sensitivity. Practical. She'll figure it out. She's already thinking about how to handle it better next time.`;
        } else if (aldricGS >= 3 && aldricHasVulva) {
            comedown = `\n\nShe presses her thighs together, aftershocks still coming. Her expression is focused — she's cataloguing what just happened. {aldric}"I don't have words for that yet." She means: no framework, no comparison. It was unlike anything. She's quiet, processing. The forge is cool and she's examining what came out of it.`;
        } else if (aldricC <= 1 && aldricM <= 1) {
            comedown = `\n\nSmall, changed, still herself under it all. She sits with her elbows on her knees, looking at her hands — the callouses are still there even if the arms are thinner. {aldric}"I'm still me." She says it like she needed to confirm it.\n\nShe looks at you. {aldric}"Was I... alright?" Not fishing. Genuinely asking for a performance review.`;
        } else {
            comedown = `\n\nShe dresses efficiently, the way she'd close up the forge — each motion purposeful. No lingering, no cuddling, not because she didn't enjoy it but because she's not sure that's what you do. She pauses, vest half-laced, and looks at you with brown eyes that are softer than they were at the start.`;
        }
        text += comedown;

        // === Transform callback ===
        if (sawTransform) {
            text += `\n\nShe flexes her restored hands, turns them over. {aldric}"I couldn't manage it." The admission costs her something — she's a master smith and the tool defeated her. She looks at her palms, at the callouses that are still there. {aldric}"I'll figure it out." Forge stubbornness. She means next time.`;
        }

        // === Player standout modifiers ===
        if (playerC >= 4) {
            text += `\n\nShe glances at your chest while dressing. Looks away. Looks back. {aldric}"Those are... well-made." She means it as the highest compliment she knows.`;
        }
        if (playerB >= 4) {
            text += `\n\nA hand on your hip as she passes. Firm, appreciative, brief. The way you'd pat a good piece of work. She doesn't explain.`;
        }

        // === Exit line ===
        text += `\n\n{aldric}"Same time works for me. If you want." Gruff. She's already turning toward the door, pulling on her boots with forge efficiency. But she pauses with one hand on the frame. The 'if you want' hangs in the air — the vulnerable part, and she knows it.`;

        this.text = text;
    },
    actions: [
        { label: 'Return to workshop', nextScene: 'workshop_main' }
    ]
};


// ==========================================
// ALDRIC'S ACCIDENT (Day 17)
// ==========================================

SCENES['story_aldric_accident_intro'] = {
    id: 'story_aldric_accident_intro',
    image: 'images/story/aldric_accident_intro.webp',
    speaker: 'Aldric',
    text: `A knock at your door. Aldric stands there, looking uncharacteristically hesitant.

"Workshop keeper. I heard about Corwin and Vessa's... experience." He clears his throat gruffly. "Word travels fast in a small town."

He shifts his weight, clearly uncomfortable.

"One of my forge bellows is acting up. Magical components your uncle sold me years ago. Thought maybe you could take a look." He holds up a brass mechanism. "I'll pay, of course."

You recognize the component - it interfaces with the Chest Shaper. Your uncle must have been experimenting with portable applications.

"Could use your expertise. If you're willing."`,
    onEnter: function() {
        gameState.flags.story_aldric_accident = true;
        saveState();
    },
    actions: [
        { label: '"Let me take a look"', nextScene: 'story_aldric_accident_examine' },
        { label: '"Bring it inside"', nextScene: 'story_aldric_accident_examine' }
    ]
};

SCENES['story_aldric_accident_examine'] = {
    id: 'story_aldric_accident_examine',
    image: 'images/story/aldric_accident_flash.webp',
    speaker: '',
    text: `You examine the mechanism while Aldric watches. It's definitely related to the Chest Shaper - same crystalline core, same brass filigree.

{aldric}"Careful with that," Aldric grunts. {aldric}"It's been sparking lately. Nearly singed my beard."

You notice a loose connection and reach to adjust it. The crystal flares blue-white.

{aldric}"Watch out-!"

Aldric lunges forward to push you away from the blast - putting himself directly in the path of the device's discharge.

Blue light engulfs his chest. He staggers back, eyes wide.`,
    actions: [
        { label: 'Check on Aldric', nextScene: 'story_aldric_accident_transform' }
    ]
};

SCENES['story_aldric_accident_transform'] = {
    id: 'story_aldric_accident_transform',
    image: 'images/story/aldric_accident_transform.webp',
    speaker: 'Aldric',
    text: `The light fades. Aldric looks down at himself and freezes.

His chest has... changed. Where once was flat, muscled pectoral, now there's definite curve and softness. Not dramatic, but unmistakable.

And like Corwin before him, the change has spread. His features have softened subtly - still recognizably Aldric, but with a feminine cast to his jaw and cheekbones.

"What in the-" His voice catches. It's slightly different. Softer.

He looks at you, then down at himself, then back at you.

"The devices. They do this? Turn men into..." He can't finish the sentence.

You explain the feminizing effect. How it seems to be built into the very nature of your uncle's creations.

Aldric is quiet for a long moment.`,
    onEnter: function() {
        // Only apply transformation once (prevents repeat on reload)
        if (!gameState.flags.story_aldric_transformed) {
            // Transform Aldric
            gameState.npcs.aldric.body.chest = 2;  // Subtle chest from accident
            // Soften other features slightly
            if (gameState.npcs.aldric.body.muscle > 2) {
                gameState.npcs.aldric.body.muscle = 2;  // Less bulky
            }
            gameState.flags.story_aldric_transformed = true;
            recordNpcBodyChange('aldric');
            saveState();
        }
    },
    actions: [
        { label: '"I\'m so sorry - I can try to reverse it"', nextScene: 'story_aldric_accident_reaction' },
        { label: '"Are you alright?"', nextScene: 'story_aldric_accident_reaction' }
    ]
};

SCENES['story_aldric_accident_reaction'] = {
    id: 'story_aldric_accident_reaction',
    image: 'images/story/aldric_accident_reaction.webp',
    speaker: 'Aldric',
    text: `Aldric runs his calloused hands over his new chest, expression unreadable.

"Reverse it?" He's quiet for a moment. "I... don't know."

He looks down at himself, turning his hands over slowly.

"I've been a blacksmith for thirty years. Built my whole identity around being strong. Tough. A man's man." His voice wavers. "But this..."

He — no, *she* — touches her softened jawline.

"I don't hate it. That's what scares me. I should hate it. But I look at myself and I feel... something I haven't felt in a long time."

She meets your eyes.

"Let me think about it. Don't... don't tell anyone yet. I need time to figure out what this means."

**(Aldric has been transformed. She seems confused but not entirely unhappy.)**`,
    onEnter: function() {
        gameState.flags.story_aldric_accident_complete = true;
        // Aldric has been transformed and is open to exploring her new form
        gameState.npcs.aldric.enjoys_feminine_form = true;
        gameState.npcs.aldric.trust = Math.min(100, gameState.npcs.aldric.trust + 15);
        saveState();
    },
    actions: [
        { label: '"Take all the time you need"', nextScene: 'workshop_main' }
    ]
};

