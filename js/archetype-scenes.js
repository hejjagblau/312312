// ==========================================
// ARCHETYPE ACHIEVEMENT SCENE TEXTS
// ==========================================
// Full 2-4 paragraph celebrations when an NPC completes their body archetype.
// Casual version (trust < intimate): appreciative but non-sexual
// Intimate version (trust >= intimate): appreciative + aroused
// Goddess version: intimate only (4-6 paragraphs, always overwhelming)

const ARCHETYPE_ACHIEVEMENT_TEXTS = {};

// ==========================================
// MIRA (Courier) - Enthusiastic, warm, playful
// Body mod fetishist who experiments on herself. Starting stats: g0, gs0, c2, m2, b1.
// Casual: goofy delight, "boss," "Amazeballs!", trail-offs, playful descriptors.
// Intimate: warmth becomes hunger. No "boss," no exclamations. Demanding fragments.
// ==========================================

ARCHETYPE_ACHIEVEMENT_TEXTS.mira = {
    hourglass: {
        casual: (ctx) => `The device winds down and Mira goes very still. Then both her hands clap down on her waist, or where her waist used to be. It has narrowed dramatically, the skin pulled in tight between the generous swell of her breasts and the new, full curve of her hips. She runs her palms up and down the dip, over and over, like she's checking a measurement.

{mira}"Boss." Her voice comes out a little strangled. "Boss, I have a waist. Like a... a proper, ridiculous, pinched-in waist. Feel how narrow that is." She grabs your hand and places it at her side, her eyes wide. Her ribs taper inward, then flare out again where her hips have filled and rounded. {mira}"And then there's this." She spreads her hands wide over her hips and squeezes. The new fullness gives under her fingers, soft and substantial. {mira}"Holy moly."

She twists side to side, watching herself in the polished surface of the workshop cabinet. The motion makes everything move in distinct, staggered waves: chest, waist, hips. She follows each one with fascinated eyes. **She looks exactly like those curves-and-lines illustrations in the physiology books she absolutely was not supposed to be reading at age fourteen.** {mira}"This is the hourglass. I'm an hourglass. I'm a literal, actual hourglass." She faces forward and her grin takes over her entire face. {mira}"Amazeballs."`,

        intimate: (ctx) => `The device clicks off. Mira doesn't move for a moment. Her hands are already at her waist, pressing in, feeling the new narrowness between the fullness above and below. She breathes out slowly.

{mira}"Oh." Just that. One syllable. Her hands travel upward, over the flare of her ribs to the weight of her breasts, then back down to where her waist pulls in tight, then out again over the generous curve of her hips. She traces the shape like she's reading it in the dark. Her lip catches between her teeth.

**The trail-off she was building dies in her throat.** Her hips shift, just slightly, pressing into her own hands. She's feeling the weight distribution change, chest heavy and full, hips substantial and warm, and the way it all balances on that pulled-in middle. She exhales through her nose.

{mira}"You need to touch this." Her voice has changed, gone lower and more direct. She takes your hands and puts them on her waist, your fingers nearly spanning it. {mira}"Feel how small that is. And then..." She slides your hands outward to her hips, the flesh filling your palms. {mira}"There. You feel the difference?" She presses your hands harder against her, her own hands covering yours. ${ctx.hasPenis ? `Between her thighs her arousal is visible, her pussy swollen and damp, and she presses into you without embarrassment.` : `She is pressing her thighs together, the need unmistakable.`} {mira}"Don't let go."`,
    },

    amazon: {
        casual: (ctx) => `Mira straightens up from the device and something is immediately different about the way she fills the room. Her shoulders have spread. Her arms have thickened. Every line of her reads as force contained, muscle layered under skin, the kind of body that suggests it could do real damage without trying.

She lifts her arm and stares at the flex of it, the defined curve of her bicep, the hardness underneath when she squeezes. {mira}"Okay. Okay, that is..." She reaches for a word and can't find one for a second. {mira}"That is UNITS, boss. Those are absolute UNITS of arms." She grabs the edge of the worktable and does a pull-up, quick and easy, like she's testing a new tool. She hangs there, grinning. {mira}"Look at that. Look how easy that was."

She drops back down and rolls her shoulders, feeling the muscle shift and settle. Her moderate chest sits differently now, framed by the breadth of her frame, and her butt has rounded out into something substantial. She bounces on her heels, testing the weight and power of her new body. **She looks less like a courier and more like someone who eats couriers for breakfast.** {mira}"Amazonian. I am full-on amazonian right now." She flexes both arms at once and admires them without a shred of self-consciousness. {mira}"This is the best experiment we've done yet."`,

        intimate: (ctx) => `Mira rolls her shoulders and the muscle moves under her skin in a way that makes her breath catch. She looks down at her arms, the defined thickness of them, the hardness when she flexes, and something in her expression sharpens.

She picks up a heavy wrench from the worktable. Holds it. Squeezes it. Sets it down. Her chest rises and falls a little faster. {mira}"You know what's happening to me right now?" She looks up at you. The warmth in her voice has been replaced by something with more heat and less sweetness in it. {mira}"I feel dangerous. I feel like I could pick you up." She steps closer. {mira}"That's doing something to me."

**She closes the distance between you in two steps and her hands are on your arms, gripping, testing her own strength against you.** Her fingers are strong in a way they weren't an hour ago. She can feel it. ${ctx.hasPenis ? `Her thighs press together and her pussy clenches, wet and hungry.` : `Her cock is already thick and heavy between her powerful thighs.`} Her jaw is set, her green eyes direct.

{mira}"Touch my arms." Not a request. {mira}"Feel how hard they are. Then I want to see if I can actually lift you." A beat. {mira}"For science."`,
    },

    bombshell: {
        casual: (ctx) => `The device finishes and Mira looks down. Then she looks down more. Her expression cycles through several stages: surprise, assessment, and then something settling into delighted, helpless laughter.

{mira}"Oh my god." She grabs her chest with both hands, fingers sinking into the new, impossible fullness. Her frame hasn't changed, she's still slim, still slight, but her breasts are now enormous relative to the rest of her, heavy and full and practically requiring their own structural support. {mira}"They're so... they're so..." She hefts them, watching them move, feeling the weight shift. {mira}"...humongously massive. That's the only word. Humongously massive."

She turns sideways to look at her own profile and her jaw drops. The contrast is dramatic: narrow waist, modest hips, and then this extraordinary chest jutting forward. Her top has ridden up, the hem pulled out of true by the new weight pulling at the fabric. She tugs at it uselessly. {mira}"I look like a cartoon, boss. A very good cartoon." **Her genital awareness arrives a moment later, the swollen, prominent heat between her thighs that the transformation has brought along with the rest,** and she claps a hand over her mouth. {mira}"Oh. Oh, AND that? We got the full bombshell package, huh?"`,

        intimate: (ctx) => `Mira's hands go to her chest the instant the device finishes and they stay there, fingers pressing in, testing the new weight and softness. She exhales in a long, unsteady breath.

{mira}"They're enormous." She says it quietly, with genuine reverence. Not performing for you, just saying the true thing. Her hands cup the undersides of her breasts, lifting, feeling how heavy they've become, and the motion pulls at her nipples and she makes a sound low in her throat.

**She is achingly aware of everything at once: the weight on her chest, the tightness in her top, the throbbing arousal between her thighs.** Her pussy is swollen and wet, gs3 making its presence known with a blunt, insistent heat. She presses her thighs together and it doesn't help.

{mira}"Come here." She reaches out and takes your hand, places it on her breast. The fullness overflows your palm. {mira}"That's real. That's actually... feel how heavy." Her hand covers yours, pressing in, and her head tips back slightly. When she looks at you again the goofy enthusiasm is gone, replaced by something simpler and more urgent. {mira}"I need you to touch them properly. Both of them. Right now."`,
    },

    bootylicious: {
        casual: (ctx) => `The first thing Mira does is look over her shoulder. The second thing she does is make a sound that's somewhere between a gasp and a giggle.

{mira}"Okay. Okay, boss, I need you to look at this." She turns her back to you and gestures at herself. Her butt has expanded dramatically, round and prominent, pressing against the back of her trousers and then some. She reaches back and cups it with both hands, fingers spreading across the new fullness. {mira}"That's ginormous. That is a ginormous amount of butt." She gives it a squeeze and watches it jiggle, actually watches it, craning her neck. {mira}"It moves. Did you see that? It moves independently."

She does a small experimental walk, back and forth in front of the device, paying careful attention to the swing and bounce with each step. Her messenger bag bumps against her hip differently now, knocked sideways by the new projection. She stops, looks down at her relatively modest chest and her new spectacular rear end, and grins. {mira}"Pear-shaped. That's the word. I am aggressively pear-shaped." **She is delighted by this in the same way she'd be delighted by finding an excellent shortcut on her delivery route.** {mira}"And the other thing..." She shifts her weight and her swollen arousal presses against the seam of her trousers. {mira}"...yeah, that's also happening. Amazeballs."`,

        intimate: (ctx) => `Mira reaches back and grabs her own ass before the device even finishes cycling down. Her fingers disappear into the new fullness and she squeezes, hard, her eyes going wide.

{mira}"Oh, that's..." She squeezes again. The flesh is generous, warm, giving under her hands, and the motion pulls at her swollen pussy in ways that are rapidly becoming hard to ignore. She presses her thighs together and inhales sharply.

She turns to face you, cheeks flushed, and there is nothing goofy about her expression anymore. She is looking at you the way she looks at very good mail, with intent and focus and the certainty of what she's about to do. {mira}"It's huge. My ass is huge and I'm so..." She trails off, but not in the usual way, not the happy babble. **A different kind of trail-off, the kind where words lose out to sensation.** {mira}"Touch it. I need you to actually grab it. Both hands."

She turns her back to you and waits, her hands braced on the worktable. Her generous ass curves out toward you, swollen and warm, and the damp heat between her thighs is unmistakable. ${ctx.hasPenis ? `Her pussy is dripping.` : `Her cock is thick and insistent against the front of her trousers.`} {mira}"Don't be polite about it."`,
    },

    goddess: {
        intimate: (ctx) => `The workshop fills with light. Every crystal on every device blazes at once, a chain reaction the like of which has never happened in here before, and Mira's body becomes the reason why.

It happens all at once. Her chest surges, already substantial, swelling massive and heavy and full until the front of her courier vest gives up entirely, clasps popping free. Her arms thicken, the muscle layering on fast, her shoulders broadening, her thighs and calves following suit until she stands in ruins of her clothing with a body that looks sculpted from some ancient template of excess. Her butt has destroyed her trousers from the rear. Between her powerful thighs her pussy is swollen enormously, the lips thick and prominent and dripping, and she is shaking.

She stands in the wreckage of her clothes. She is enormous. Every dimension is maximum, stacked and layered and overflowing, and she is making a sound that isn't quite a moan and isn't quite a sob, something between them, something overwhelmed.

{mira}"I..." She looks at her own hands. The muscle of her forearms. The broad, powerful shoulders. She cups one breast, massive, overflowing both hands, and the sensation hits her so hard her knees buckle. She catches herself on the worktable. {mira}"Oh god. Oh, oh that's..." Her voice has lost all its usual bright affect. She sounds like someone in a dream. {mira}"Everything is... every part of me is..."

**She can't finish the sentence. Every nerve ending she has is lit at maximum, and the feedback loop between her body and her brain has overwhelmed the part that makes words.** She grabs the edge of the worktable and holds on. Her enormous tits hang heavy and swaying with each shuddering breath. Her thighs are trembling, slick running freely down between them and onto the floor. She presses her legs together and the compression makes her cry out.

She looks at you. Her green eyes are dazed, dark, enormous. The freckles across her nose and cheeks are vivid against the flush spreading down her throat and chest. She reaches out and grabs your collar in one large, powerful hand. {mira}"Don't." Her voice comes out rough. {mira}"Don't go anywhere." She pulls you close, and the warmth of her enormous body radiates against you like a furnace. {mira}"I need..." The sentence dissolves. She shakes her head. Then she tries again, and for a moment she sounds entirely like herself, flushed and wrecked and totally thrilled by it. {mira}"Boss. I think I broke your workshop."`,
    },

    petite: {
        casual: (ctx) => `It goes the other way this time, and Mira watches it happen with the same focused, delighted attention she gives everything the devices do to her. She shrinks down, muscle softening, curves easing, the modest swell of her chest smoothing smaller. By the time the device stops she is slight and fine-boned and notably shorter than she was, her courier vest hanging loose, her trousers pooling at her ankles.

She looks down at herself and laughs, a bright, startled sound. {mira}"I'm tiny." She holds up her hands and turns them over, studying the delicacy of her wrists and fingers. {mira}"I'm completely tiny, boss. Look at my hands. My hands are adorable." She makes a fist, marveling at how small it is. Then she takes three running steps and jumps, tucking her knees up, landing light as a cat.

{mira}"Okay. Okay, this is a completely different experience." She bounces on her heels. **Everything about her movement has changed, she is quick and light in a way that her usual fit body never quite managed.** {mira}"I feel like I could fit under a door. Not that I would. But I feel like I could." She tilts her head up to look at you and her grin is enormous relative to her small face. {mira}"Do I look ridiculous? I think I look kind of amazing actually."`,

        intimate: (ctx) => `She is small. Genuinely, strikingly small, fine-boned and slight, her courier vest enormous on her narrow shoulders, and she is looking up at you with a completely new and arrested expression.

{mira}"Oh." She says it softly. She steps closer, and the fact that she has to look up to meet your eyes does something visible to her. A flush moves up her throat. {mira}"You're..." She puts a hand against your chest. Her hand is small. {mira}"You're really tall right now. That's..." She swallows.

**She is discovering something about herself, right here, in real time.** The smallness of her isn't diminishing, it's charged, electric. She presses closer, her small body fitting differently against you than it did before, and her hands find your arms and grip them.

{mira}"I didn't think this would be..." She trails off, genuinely at a loss, the usual bubbly narration gone quiet. Her pale face is vivid with color. She rises onto her toes to reach you, and there's something in the gesture, the stretch of it, the smallness of her against you, that makes her grip tighten. {mira}"Touch me. I want to feel how different this is." Her voice has gone low and direct. {mira}"All of it. I want to feel all of it."`,
    },

    statuesque: {
        casual: (ctx) => `Mira steps back from the device and the transformation has settled into something considered and even. Not dramatic in any single direction, just balanced, deliberate, like every line of her has been revised to the ideal version of itself. Her chest is full without being overwhelming. Her arms carry visible, graceful muscle. Her hips and waist read as classically proportioned.

She stands straighter, which she does automatically, as if her body already knows what this shape requires. She runs her hands down her sides and the expression on her face is thoughtful in a way that is different from her usual bright enthusiasm. {mira}"Huh." A pause. {mira}"Huh. That's... that's a different kind of feeling, boss."

She moves, just walks a few steps, turns, walks back, and the motion is fluid in a new way, each part of her contributing to the whole. She stops in front of the polished cabinet door and studies herself for a long, quiet moment. **She looks like the kind of person you'd put on a coin.** {mira}"Statuesque. Yeah, okay. I can see it." She tilts her head. {mira}"I look like I have opinions about architecture." She grins. {mira}"I kind of love it."`,

        intimate: (ctx) => `Mira is quiet in a way she usually isn't. She's looking at herself, the balanced proportions, the graceful tone, the way everything fits together with a kind of classical evenness, and something in her stillness reads as genuine surprise.

{mira}"I thought I'd like this less than the big stuff," she says finally. Her hands trace down her sides, over the curve of her hips, which are present and lovely without being excessive. {mira}"I thought I needed things to be bigger to feel it. But this is..." She pauses. {mira}"Every part of me feels right. Like nothing's competing."

She turns to face you and the movement is smooth and unhurried, and it's that unhurriedness that reveals her. She is genuinely, quietly turned on, the kind of arousal that builds slow rather than flares. **Her green eyes are warm and focused and very much on you.** She steps close, close enough that you can feel the deliberate, balanced warmth of her.

{mira}"There's this thing that happens with the big transformations," she says softly, reaching up to lay a hand against your face. {mira}"Where everything is loud and overwhelming and amazing. But this one is quiet." She presses her body against yours, steady and warm. {mira}"I feel every bit of myself right now. Every square inch." Her lips are near your ear. {mira}"I want you to feel all of it too."`,
    },
};

// ==========================================
// VESSA (Apothecary) - Analytical, precise, violet eyes
// Casual: measured observation, clinical framing, dry humor
// Intimate: words fail, body takes over, silence + action
// ==========================================

ARCHETYPE_ACHIEVEMENT_TEXTS.vessa = {
    hourglass: {
        casual: (ctx) => `Vessa stands before the tall mirror in her apothecary alcove, turning slowly. The motion is precise, methodical, the way she measures ingredients. Her fingers trace the new curve where her waist cinches inward before the swell of her hips.

{vessa}"Interesting. The proportional distribution is... more harmonious than I anticipated." She turns again, slower this time. {vessa}"I've catalogued body modification results for years, purely academic. The theoretical ideal and the practical result rarely align so cleanly."

She glances over her shoulder at the mirror, then at you. **Her expression is the one she gets when an experimental compound does exactly what the formula predicted.** {vessa}"The variables resolved themselves well. I'll note that in my records." A pause, and something briefly warmer crosses her face before her composure reasserts itself. {vessa}"You have an eye for this. Unexpectedly."`,

        intimate: (ctx) => `Vessa stands at the mirror with her journal open, making notations. You've seen her document dozens of subjects. You have never seen her stop writing mid-sentence.

She stops writing mid-sentence.

Her hand rests on her waist where the hourglass curve pulls inward, and she presses her own palm there, testing the give of flesh. A slow exhale through her nose. She sets the journal down with the particular care she reserves for breakable things.

{vessa}"Come here."

Not a question. She takes your hand and places it on her hip, at the exact point where the flare begins. **Her violet eyes watch your face rather than the mirror, and that is new.** {vessa}"Here." Your fingers settle into the curve. She is warm beneath the fabric. {vessa}"The sensation of... being the specimen rather than the observer is..." She pauses. Vessa does not pause for words.

She guides your hand upward along the contour of her waist, then down again, tracing the shape she has become. **A small, involuntary sound escapes her when your palm passes the fullest point of her hip.** She turns to face you and there is nothing analytical in her expression now at all.`,
    },

    amazon: {
        casual: (ctx) => `The workbench in Vessa's apothecary has been pushed aside. She needs the space. She rolls her shoulders, and the movement ripples through muscle that wasn't there a month ago, a wave of controlled power from trap to forearm.

{vessa}"The functional implications are considerable." She lifts a pestle that would have required both hands before. One hand now, easy. She holds it out and examines her own forearm. {vessa}"Muscle tissue this dense changes how the body processes the compounds I work with. I'll need to recalibrate several formulas."

She is already rationalizing it. Making it useful, fitting it into her system. But you catch her flexing her hand once more before setting the pestle down, and the motion has nothing to do with calibration. {vessa}"The power distribution is... precise. Exactly as the research suggested it could be." **Her eyes meet yours across the worktable, and for a moment she simply looks like someone very satisfied with a long experiment finally yielding results.**`,

        intimate: (ctx) => `Vessa does not fidget. You have never seen her fidget. She is standing very still in the center of her apothecary and her hands are at her sides in what you recognize, after a moment, as conscious restraint.

{vessa}"I've been attempting to document the proprioceptive shift." Her voice is measured. {vessa}"The awareness of one's own body in space. Mine has changed significantly."

She crosses to you in three long strides. The gait is different now, unhurried but absolute, the walk of someone who does not question whether the floor will hold her. She stops close enough that you can feel the warmth off her. Close enough that the difference in how she occupies space is undeniable.

**Her hand closes around your wrist, and the grip is new.** Not painful. Just certain. {vessa}"The formula for my work requires precision. The formula for this..." She looks at her own hand around your wrist, then at your face. The words stop. Something else starts. {vessa}"Different variables."

She doesn't let go.`,
    },

    bombshell: {
        casual: (ctx) => `Vessa has been very quiet for the last several minutes, which is unusual. She stands at the worktable but she hasn't touched anything on it. She keeps starting to reach for a jar, then stopping.

{vessa}"I want to document something." Her tone is scholarly, but she takes a breath before continuing. {vessa}"There is a specific phenomenon I've read about in old transformation records. The subject becomes... acutely aware of their own center of gravity." She finally turns to face you, and her posture is different now, the unconscious adjustment of someone relearning where their body ends and the world begins. {vessa}"I have, in the past, been somewhat skeptical of those accounts."

She looks down at herself, then back up at you with the particular expression she uses when a compound surprises her. {vessa}"I am revising my skepticism." **She touches the worktable lightly, the gesture of someone recalibrating their spatial sense, then straightens.** {vessa}"The proportions are... statistically improbable. And yet."`,

        intimate: (ctx) => `The apothecary is lit low. Vessa stands with her back to you, and you know she is aware of your presence because she has been aware of everything in this room since you walked in. She simply hasn't turned around.

When she does turn, she doesn't speak immediately. She is gathering language the way she gathers components, selecting, testing weight. Her arms hang at her sides.

{vessa}"I've been trying to write the entry for my records." A pause. {vessa}"I cannot find adequate terminology."

She crosses to you and takes your hand and places it against her chest, pressed flat against the swell there, and her eyes are on your face with an expression like scientific inquiry crossed with something that scientific inquiry has no name for. **She holds your hand there and watches what crosses your face.** {vessa}"The sensation of..." She stops. {vessa}"There."

Your hand curves instinctively and she exhales, sharp and short, and that is the end of the clinical language. Her fingers close over yours, pressing. She tips her chin toward you. {vessa}"More."`,
    },

    bootylicious: {
        casual: (ctx) => `Vessa stands at an angle to the mirror she keeps for checking labeling on high shelves. It is not designed for full-length viewing. She has angled it anyway.

{vessa}"The posterior muscular development is disproportionate to the anterior frame in a way that I find..." She turns slightly, observing. {vessa}"...statistically notable." She tilts her head. {vessa}"The records from subjects with this particular distribution consistently report enhanced balance and core stability, which tracks with the structural mechanics."

She is doing it again. Making it research. You watch her touch the curve of her lower back almost unconsciously, one fingertip pressed to the hollow where her spine meets the dramatic outward swell. **She realizes you're watching and her hand stills, but she does not move it away.** {vessa}"The proportionality is quite extreme. I'm not... displeased by the outcome." She turns back to the mirror. {vessa}"The variables resolved favorably."`,

        intimate: (ctx) => `Vessa is in the back of the apothecary when you arrive, among the hanging dried herbs. The light is low. She doesn't startle when you push through the curtain. She knew you were coming. She has been waiting, which is how you know something has shifted.

{vessa}"I've been running an experiment." Her hands are occupied with nothing, just resting at her sides. {vessa}"Observing my own responses to..." She gestures, a small motion toward her own body, uncharacteristically imprecise. {vessa}"...the new configuration."

She turns her back to you. **The curve is extreme from this angle, a dramatic downward sweep from narrow waist to full, heavy softness below it.** She glances over her shoulder with violet eyes that are not currently the eyes of someone conducting an experiment.

{vessa}"Tell me what you observe."

You do. Her lashes lower. She turns back around slowly, and when she reaches you she takes your hand without preamble and guides it to her hip, pulling you closer simultaneously. {vessa}"The posterior sensitivity is..." The sentence does not finish. She presses backward into your hand and the words do not come back.`,
    },

    goddess: {
        intimate: (ctx) => `The apothecary smells different. You notice it before anything else. The usual dried-herb calm has something underneath it now, sharper, warmer, the way the air changes before a storm.

Vessa stands at the center of the room and the room is smaller than it was. Not in dimensions. In the way space redistributes itself around a new point of gravity. She is facing the window. She has not moved since you entered, and you wonder if she heard you come in, and then you look at her hands and they are pressing flat against the worktable, and you understand she is not looking out the window. She is steadying herself.

{vessa}"I have written eleven different opening sentences for this entry." Her voice is entirely level. {vessa}"And deleted each of them."

She turns, and you have made a study of her face over these months, the micro-expressions she does not know she allows, and none of your study has prepared you for the current expression because it is not one you have seen on her before. **Every careful economy she has ever maintained is present in her face right now, all of it, straining to contain something that has outgrown the container.**

{vessa}"The problem..." She stops. Tries again. {vessa}"The compound produces measurable physiological effects on the subject. I documented that." Another stop. {vessa}"I did not adequately account for the feedback loop in which the subject is also..." She gestures at herself, at the impossible architecture of chest and muscle and curved weight, all of it gathered into one form. {vessa}"...observing herself respond."

She comes to you. The walk is slow, deliberate, because nothing about her body is easy to move quickly right now, or perhaps because she is choosing to be deliberate, and **the distinction no longer matters to her and that is the most remarkable finding of all.** She stops in front of you and her hands find your face, both of them, cradling it, and she studies you with the violet eyes that have catalogued a thousand specimens and found all of them insufficient until this moment.

{vessa}"I require..." A long silence. Her thumbs trace your cheekbones. {vessa}"I don't have the word." Another silence, and then, very quietly, with no clinical distance left in it at all: {vessa}"Stay."`,
    },

    petite: {
        casual: (ctx) => `Vessa has rearranged two of her upper shelves. You notice it immediately because the apothecary has not changed its organizational system in the four years she's run it. She catches you noticing.

{vessa}"The ergonomic implications of the current configuration are more pronounced than I anticipated." She reaches for a jar on the newly lowered shelf, comfortable now where it would have required a step stool before. {vessa}"I've been treating the adjustments as a constraint problem. Which shelves require reorganization, which routes through the market are now at a different sightline."

She lines up three small vials with precise fingers, exactly as she always does. The precision hasn't changed. The scale of it has. {vessa}"There's a peculiar acuity that comes with this," she says, almost to herself. {vessa}"A... fineness of awareness. I find I notice more." She doesn't specify what she notices more of. **Her hands move through their familiar work with the same intelligence they always had, just closer to the earth now.** {vessa}"It's an interesting dataset."`,

        intimate: (ctx) => `Vessa has made tea. This is not unusual. What is unusual is that she has made two cups, and she hands you one before you've said anything, and she sits down, which Vessa almost never does while the shop is open.

{vessa}"I've been conducting a longer-form observation." She wraps both hands around her cup. Her hands look different wrapped around it now, the same careful grip, differently scaled. {vessa}"The sensory... granularity at this configuration is not what I expected."

She sets her cup down and tilts her head, the look she gives a compound she hasn't categorized yet. Then she stands and crosses to you, and she has to look up at you now, and she is clearly aware of this, the new geometry between you.

**She places her hand flat on your sternum and applies the faintest pressure.** Not enough to move you. Just enough to register. Her violet eyes are on your face. {vessa}"Every point of contact reads differently." She says it as an observation and it is also a statement of intent. {vessa}"I want more data."

She doesn't move her hand. She waits, with the patience she brings to experiments she is very interested in.`,
    },

    statuesque: {
        casual: (ctx) => `The afternoon light falls through the apothecary's small high window in a way that Vessa has always arranged her workspace to catch. She is standing in it when you arrive, and you see immediately that the light has new material to work with.

{vessa}"The proportional distribution is classical." She turns slightly, not for your benefit, or not only for your benefit. {vessa}"I've been cross-referencing it against the anatomical records in my reference texts. The Verenni sculptors of the old period documented an ideal that the transformation archivists apparently took seriously." She traces a line in the air, the shape of her own silhouette, a gesture you've never seen from her. {vessa}"They called it the 'balanced form.' Neither extreme nor minimal."

She moves to her worktable and the movement is different now, a length and grace to it that the light seems to follow. {vessa}"I find I have no complaints with their mathematics." **She picks up a mortar and begins grinding, and even this ordinary motion carries the quality of something arranged, composed, deliberate.** {vessa}"Though I'd note the Verenni records describe their ideal in relation to marble. The practical version has... considerably more warmth."`,

        intimate: (ctx) => `Vessa is reading when you arrive. She closes her text without marking the page, which tells you something.

{vessa}"I was reviewing the archive documentation on this particular configuration." She sets the book aside. {vessa}"Formally it's the most studied body type in the historical transformation records. Extensively idealized. The literature uses words like 'harmony' and 'classical proportion.'" A pause, and something dry surfaces in her tone. {vessa}"I tend to distrust words like 'harmony.' They're imprecise."

She stands, and you see why she was distracted from her reading. The form is undeniable, the balanced, elegant arrangement of her that suggests nothing excessive and nothing withheld. **She looks like something someone thought about for a very long time.** {vessa}"And yet."

She crosses the room and stands close, close enough that you can see the particular alertness in her violet eyes, the one that means she is paying complete attention. {vessa}"I find I'm less interested in the formal literature than in the practical data." Her hand lifts and rests at her own waist, and then her eyes move from her own hand to your face, and the look is an invitation framed as scientific curiosity. {vessa}"The question of how well the theoretical ideal translates to... sensory experience. That data isn't in the archives."

She waits for you to help her gather it.`,
    },
};

// ==========================================
// BARRET (Tavern Owner) - Bold, competitive, "love"
// Casual: loud satisfaction, showing off, comparing to Della
// Intimate: predator emerges, no "love", focused intensity
// ==========================================

ARCHETYPE_ACHIEVEMENT_TEXTS.barret = {
    hourglass: {
        casual: (ctx) => `The common room is quiet between the lunch and dinner rushes and Barret is behind the bar, which is her natural habitat. She isn't working. She's standing there with both hands on the counter and a smile on her face like she just won an argument.

{barret}"Have you seen me today? Because I need you to have seen me today." She steps out from behind the bar and does a slow turn, arms out at her sides, completely unself-conscious about the three regulars at the corner table who are very much watching. {barret}"Della's been talking about her figure since the harvest festival. Della." She says the name like a punchline. {barret}"Love, I'm not trying to start anything, but..."

She stops with her hands on her hips and cocks a hip and laughs, bright and genuine. {barret}"Look at that. Would you look at that." She glances down at herself and then back up at you with brown eyes sparkling. **She looks like someone who has been waiting a long time to look exactly like this.** {barret}"Another round for the house, I think. We're celebrating. Don't ask celebrating what, love, just drink."`,

        intimate: (ctx) => `The tavern is locked. Barret locks it herself at this hour sometimes, when there's something she wants, and tonight apparently there is something she wants.

{barret}"I've been thinking about this since this morning," she says without preamble, and she walks toward you the way she crosses her own common room, like she owns every inch of the floor. She stops in front of you and takes your hand and places it on her waist, at the clean inward curve of it. {barret}"Feel that."

It's not a question. You feel it. The dramatic pinch inward and then the swell downward.

{barret}"Yeah." She watches your face. The usual performance is gone, the broad gestures, the laughter. She is very focused. {barret}"Come here." She moves your hand to her hip and steps closer and **the difference between Barret performing confidence and Barret having it is that the performing version is louder.** She isn't loud right now.

She reaches up and holds your face in both hands and studies you. {barret}"You're going to tell me it looks good."

You do.

**Her hands pull you in and the laughter doesn't come back.**`,
    },

    amazon: {
        casual: (ctx) => `Three kegs needed moving this morning. Barret moved them herself. She is telling you about this with the specific satisfaction of someone reporting a very good personal record.

{barret}"Normally that's a two-person job, love, or I'm bribing young Perrin with a meat pie to do it for me." She flexes an arm, blatant and joyful. {barret}"Not anymore. I moved three kegs and I wasn't even breathing hard and then I thought, you know what this calls for? This calls for someone to witness this." She points at you. {barret}"You. You're witnessing this."

She is grinning. She rolls her shoulders back and stands to her full height, which is more than it was, and the muscle on her is dense and real and not remotely apologetic. {barret}"Della couldn't lift a single keg before her back started bothering her, you know. Three kegs, love." She holds up three fingers. **Her laugh comes from somewhere deep in her chest now, fuller than before.** {barret}"I'm keeping score. Don't tell me not to keep score."`,

        intimate: (ctx) => `It's late. The tavern closed an hour ago and the candles are burning down and Barret is sitting on the bar, which she does when she wants to be taller than whoever she's talking to. She doesn't need the height advantage anymore, but she's sitting on the bar anyway.

She watches you cross the room to her without speaking.

{barret}"I benched the side door this morning," she says when you stop in front of her. {barret}"Hinges had rusted out. I just... lifted the door off." She turns her forearm over, looking at it. {barret}"Didn't plan to. Just did." She looks up at you, and there is something in her brown eyes that has very little to do with door hinges.

She drops off the bar and lands in front of you and the floor doesn't creak because she lands exactly as soft as she wants to. **This is new and she knows it and she is not talking about it, just letting you notice.** Her hand comes up and grips your shoulder, a real grip, a grip that would be easy to make painful and is instead simply present.

{barret}"You did this." Not an accusation. A statement of fact. Her eyes are on your mouth. {barret}"I want to do something about that."

She is not asking.`,
    },

    bombshell: {
        casual: (ctx) => `Barret has worn the same style of top for years. Today's top is different and she knows you know it's different and she is extracting maximum entertainment from this.

{barret}"Don't." She holds up a finger. {barret}"Don't try to be subtle about it, love, you'll strain something." She leans forward on the bar and the effect is significant and entirely deliberate. {barret}"I had to send to the seamstress twice this week. Twice. She's started expecting me."

She straightens up and comes around the bar and gestures expansively at herself, the way she gestures at a particularly good meal she's plated. {barret}"I've been debating whether to say something to Corwin about the view from the taps. Decided against it. Let him figure it out himself." She grins. **There is absolutely no uncertainty in this grin, no performance anxiety, nothing but pure uncomplicated satisfaction with her own body.** {barret}"I look ridiculous in the best possible way, love, and I intend to enjoy every single minute of it."`,

        intimate: (ctx) => `Barret closes the storage room door behind you and leans back against it.

{barret}"I've been waiting since the morning rush," she says, and the usual laughter is absent from her voice. Not replaced by anything colder, just... removed. What's underneath is direct and warm and not interested in jokes right now.

She pulls you close by your shirt and tips her chin up. {barret}"Touch me." Then she moves your hand, guiding, showing you exactly what she means, and watches your face when your palm settles against the full curve of her chest. **She exhales hard through her nose, eyes half-closing, and the sound is completely unguarded.**

{barret}"There." She leans into it. Her fingers are still wrapped in your shirt. She is not performing this for the room because there is no room, just her and you and the candlelight coming under the door.

She reaches up and undoes one button at her collar, not looking at the button, looking at you. {barret}"I've thought about this all day." Her voice has dropped to something that barely qualifies as a whisper. {barret}"Tell me you haven't."`,
    },

    bootylicious: {
        casual: (ctx) => `{barret}"Perrin dropped a full tray of mugs this morning." Barret is grinning behind the bar. {barret}"He tried to pretend he didn't. I saw it happen. I was walking away from the kitchen and I heard the whole thing go over and I turned around and he's on his knees picking up mugs and his face is like a tomato." She shakes her head, deeply pleased. {barret}"I gave him the afternoon off. It was the kind thing to do."

She comes out from behind the bar and makes no attempt to minimize the motion of the walk. {barret}"I've had three separate customers this week find a reason to sit at the far-end table. You know, the one with the view of the back hallway." She leans against the bar, hip cocked. {barret}"I started taking that route on purpose, love. It's good for business."

**The laugh she gives is entirely comfortable, a woman secure in exactly the amount of chaos she is causing.** {barret}"Della doesn't have back-hallway regulars. Just saying."`,

        intimate: (ctx) => `The back hallway is quiet. Barret has you pressed against the wall and her usual narration has shut off entirely.

She studies your face. Her hands are at her own hips, framing the flare of her silhouette, and she watches you look at it. {barret}"You know what I've been thinking about?" She doesn't wait for an answer. {barret}"Every person who sat at the far-end table this week trying to be subtle about staring." Her eyes are very steady. {barret}"And I kept thinking, none of them are allowed to do anything about it. You are."

**She turns, one slow rotation, close enough that you feel the warmth off her.** When she completes it she is facing away from you and she looks over her shoulder with an expression that has no laughter in it at all, only invitation.

{barret}"Well?"

Her hand reaches back and finds yours and pulls it to her hip. The curve under your palm is dramatic and warm. She leans back slightly, just enough, and makes a low sound in her throat. {barret}"Yeah." Her head drops back slightly. {barret}"That."`,
    },

    goddess: {
        intimate: (ctx) => `The tavern has been closed for two hours. Barret sent everyone home early. You knew something was happening when you heard the bolt on the front door.

She is standing in the middle of the common room when you come downstairs, in the space between the tables where she directs traffic every night of her life, and the space looks different with her in it now. Not larger. Just fully occupied for the first time.

{barret}"I broke a chair this morning." She says it without preamble, without the laugh that should follow it, which tells you immediately that this is not a joke. {barret}"Sat down wrong. Just snapped." She looks at her own hands on the bar, then at you. {barret}"I've been moving carefully all day. Measuring how much force I'm using. It's..." She pauses, and Barret never pauses. {barret}"It's a lot."

She comes around the bar and you watch her move and you understand what she means. The body she has now was not designed for careful movement and is doing it anyway, all that accumulated weight and strength coiled into deliberate stillness. **Every step she takes toward you is a decision.** When she stops in front of you her eyes are at a new level and the usual gleam in them is present but it has an edge to it that is not her usual flirtation.

{barret}"Tell me what you see." Not the performance question. The real one. She holds very still while you answer, and something in her face changes while you talk, the bravado dropping incrementally with each word until by the end of it she just looks... relieved. Like someone who needed to be seen accurately and has been.

She reaches up and her hand curls around the back of your neck, the grip certain and immovable, and **she pulls you into her and the kiss has nothing performed about it, no audience, no punchline, just Barret at the end of a long road wanting something real.** She pulls back just far enough to speak.

{barret}"I've been doing this job for eleven years." Her forehead drops to yours. Her voice is rough. {barret}"I've been doing it in a body that wasn't finished." Another breath. {barret}"Now it is."

She doesn't let go.`,
    },

    petite: {
        casual: (ctx) => `{barret}"The benefit," Barret announces, ducking under the bar hatch with the ease of someone who no longer has to tilt sideways to clear it, "is that I can now get into the low cellar without bending double." She straightens on the other side, just barely clearing the frame. {barret}"The low cellar, love. I hated the low cellar. Hated it. And now it is no longer my nemesis."

She sets a tray down on the bar and looks extremely satisfied. {barret}"Also Perrin can't find me when he wants to complain about the supply orders. I fit behind the tall shelving unit now." She demonstrates, slipping into the narrow gap between shelves and wall, and then reappearing. {barret}"He walked past me twice this morning. Twice."

**The delight she takes in this is completely genuine and very Barret.** {barret}"Some women want to be tall and striking, love, and that's lovely for them. Me, I want to fit in the low cellar and hide from my staff." She refills a mug. {barret}"I contain multitudes."`,

        intimate: (ctx) => `{barret}"Come here." Barret has been watching you across the common room for the last ten minutes with an expression you've learned to pay attention to. She doesn't say it loudly. She doesn't need to, from this distance, in a room that's mostly empty.

You go.

She takes your hand and walks you to the end of the bar, to the quiet corner, and turns to face you. The top of her head is different now from this distance, and she knows it, and she looks up at you with brown eyes that find this funny in a way she isn't currently laughing at.

{barret}"Different angle." She says it like an experiment. {barret}"I've been thinking about the different angle all afternoon." She reaches up and puts her hands on your chest, not pushing, just resting. Testing the geometry of it. {barret}"Everything's a different angle now."

**She rises onto her toes to bring her face closer to yours and the effort of it, the deliberate closing of the distance, is the most direct thing she has done in an hour of being direct.** {barret}"You're going to have to meet me halfway." The laughter is very close to the surface, but not in the way that means she's deflecting. In the way that means she's happy. {barret}"Think you can manage that, love?"`,
    },

    statuesque: {
        casual: (ctx) => `Barret has a theory that she is testing on the lunch crowd.

{barret}"Watch this." She straightens up from refilling a mug and stands behind the bar at her full height, spine long, shoulders back. She counts quietly to three under her breath. At the count of three, the customer at the near end looks up from his meal, blinks, and finds a reason to stay for a second bowl. Barret turns to you wearing an expression of vindicated hypothesis. {barret}"That's the fourth one."

She leans on the bar. {barret}"There is a specific way of standing that I have been practicing. It is not a complicated way of standing, love, it is simply... standing. But apparently in this particular arrangement of limbs the effect is..." She gestures. {barret}"Results speak for themselves."

She stands straight again and the light from the window catches her cleanly and the tavern's ambient noise drops by approximately a quarter. **She pretends not to notice, but the smile at the corner of her mouth says she notices everything.** {barret}"I always had good instincts about this place. Turns out I should have been decorating with myself the whole time."`,

        intimate: (ctx) => `Late. The fire has burned to coals and the candles are low and Barret has been leaning against the bar for the last quarter-hour not doing anything, which is very unlike her.

{barret}"You know what's strange?" She's not looking at you, she's looking at the middle distance, with the expression she gets when she's actually thinking instead of talking. {barret}"I feel like myself. Just..." She gestures at the full length of her. {barret}"More on purpose."

She looks at you. The fire light turns her brown eyes amber. **She has the quality of a painting just now, the composed stillness of something that has found its final form.** {barret}"Della's going to say I got tall. She's going to say it like it's something she noticed first." She pauses. {barret}"Let her."

She pushes off the bar and comes to you slowly, none of the usual forward momentum, just the long even stride, and she stops close and looks at you from the new height of her and her expression is different from the performance, different from the predator, different from the ease. **It is simply Barret, wanting something, and for once not covering it with anything.**

{barret}"Stay a while." Her hand finds your hip lightly. {barret}"I don't want to talk."`,
    },
};

// ==========================================
// DELLA (Baker) - Warm, motherly, flustered
// Casual: covers mouth, "oh my dear," gentle wonder
// Intimate: dam breaks, crude words erupt, shocked at herself
// ==========================================

ARCHETYPE_ACHIEVEMENT_TEXTS.della = {
    hourglass: {
        casual: (ctx) => `Della turns from the kneading board and stops. Flour drifts from her hands as she looks down at herself, then back up at you with an expression caught between wonder and embarrassment.

{della}"Oh my dear... oh, just look at that." She sets her hands on her waist, tracing the dip of it, and a soft laugh escapes her. {della}"I keep catching myself in the window glass and thinking someone else walked into my bakery." She smooths her apron over her hips, and the fabric pulls differently now, following a shape that wasn't there before. {della}"My back hasn't ached once this week. Did I mention that? Not once."

**She tucks a strand of hair behind her ear with floury fingers**, leaving a small white smear at her temple, and looks at you with something that might be the warmest thing you've ever seen. {della}"I don't have words for what you've given me. I really don't. So I made you a pie. It's not enough, but it's what I know how to do."`,

        intimate: (ctx) => `Della is pulling a tray from the oven when you arrive, and she sets it down harder than she means to when she straightens up and you're standing there. She's flushed from the heat of the kitchen, or something else.

{della}"I was going to be very composed about this," she says, and then she looks down at herself and all the composure just... goes. {della}"Oh. Oh god." Her hands travel to her chest, to her waist, following the pull of the new shape, and she makes a sound that is absolutely not appropriate for a bakery. {della}"Sorry. Sorry, I just--"

**She grabs the counter with both hands** and takes a breath that does not help because breathing makes things move in ways she's still adjusting to. {della}"My tits are-- I cannot say that word in my kitchen." A beat. {della}"My-- they're incredible. Aren't they? You can tell me honestly. I wake up every morning and I just..." She presses her thighs together and fans herself with her apron corner. {della}"Jesus. I'm forty-three years old. I should have better manners than this." She looks at you with wide, mortified, luminous eyes. {della}"I don't. Apparently I don't."`,
    },

    amazon: {
        casual: (ctx) => `The bags of flour stacked by the counter used to take two trips. Della lifts one easily now, tucks it under her arm like it weighs nothing, and sets it on the shelf without thinking. Then she thinks about it.

{della}"Did you see that?" She turns around, and **the way she holds herself has changed** -- shoulders settled back, spine easy, like she's been given more room inside her own skin. {della}"I didn't even... I just picked it up." She flexes her hand experimentally. {della}"My Marta keeps asking what I'm putting in the bread. I told her I changed the recipe."

She leans against the doorframe and crosses her arms, and the muscle in her forearms is quiet and definite beneath her skin. {della}"You know what I can do now? I opened the back door this morning. The one that sticks, that I've been asking the landlord about for six years." She smiles slowly. {della}"Didn't stick."`,

        intimate: (ctx) => `Della has been restless all morning. You can see it in how she moves -- too much energy for the bakery, shoulders looking for something that needs carrying. When she spots you in the doorway she crosses the kitchen in four long strides and pulls you in by the collar and **holds you against her for a long, deliberate moment**.

{della}"I've been trying to have a normal morning," she says into your hair. Her arms around you are genuinely strong now, a kind of warmth that's also a kind of power, and she knows it. {della}"It's not working."

She lets you go and steps back and looks at her own arms like she's seeing them for the first time again. {della}"I keep wanting to..." She stops. {della}"This is embarrassing." A breath. {della}"I keep wanting someone to push me. Just to see. I used to get tired making bread for six hours. Now I just want--" She covers her mouth with floury fingers. {della}"I want someone to grab my ass and find out I don't budge. That is what I want. I can't believe I said that out loud." She stares at you. **Her cheeks are burning.** {della}"Don't you dare tell anyone I said that."`,
    },

    bombshell: {
        casual: (ctx) => `Della has tied her apron twice this morning and it keeps ending up wrong. She's standing at the counter with a look of mild personal offense, trying to get the strings to sit right over hips that have thoroughly rearranged themselves.

{della}"It's a practical problem," she says when she notices you watching. But there's a smile under it. {della}"My whole wardrobe is a practical problem now." She gives up on the apron and sets her hands on her hips instead, and the gesture looks different than it used to -- more deliberate, more aware. {della}"My neighbor asked if I'd taken a holiday. I said I'd been sleeping better."

**She laughs, and it moves through her**, and she catches herself and clears her throat and very professionally offers you a biscuit. {della}"The point is, my dear, that I feel..." She searches for the word. {della}"...tremendous. I feel absolutely tremendous. It's a funny word but it's the right one."`,

        intimate: (ctx) => `The afternoon light through the bakery window is warm and thick, and Della is standing directly in it when you arrive, and you're not sure she's doing it on purpose but she should keep doing it forever.

{della}"I was going to save you something," she says, gesturing vaguely at the counter. {della}"And then I got... distracted." She looks down at herself with an expression that is one part bemusement and one part frank admiration. {della}"I've been standing here for ten minutes. My bread is going to over-proof."

She reaches up to push her hair back and the motion is unconsciously exhibitionist and she doesn't seem to realize it until she catches your face. Then she does realize it. {della}"Oh. Oh, I see how you're looking at me." She doesn't move away. **Something shifts in her expression**, something that was warm becoming something warmer and more specific. {della}"Good," she says, and she sounds startled by the word. {della}"That's-- I want that. I want you to look at me like that. I've got a-- I've got a pussy that is apparently very much on board with this conversation, and I am choosing not to be embarrassed about it." She covers her face with both hands. {della}"I am a little embarrassed about it."`,
    },

    bootylicious: {
        casual: (ctx) => `Della has rearranged her kitchen, and for a moment you don't understand why. Then you notice she's widened the space between the prep table and the oven, and the path to the pantry has more clearance now. She catches you looking and puts her hands on her hips.

{della}"Don't say a word," she says, but she's smiling. {della}"I've always kept a tidy kitchen. I simply have different... dimensions now. It's a matter of spatial awareness." She moves past the table, and it's a slow, rolling movement, confident in a way that's entirely new. {della}"My Marta said I've been walking differently. I told her the floors had been redone."

**She pulls two cups from the shelf** and turns around and the view from behind is something that her kitchen was apparently not quite designed for. She doesn't seem bothered by this in the slightest. {della}"Sit. I'll make tea. And don't think I can't see you smiling, dear, because I absolutely can."`,

        intimate: (ctx) => `Della is bent over the low shelf when you come in, taking inventory of the flour sacks, and she takes her time standing up. She absolutely knows you're there. When she turns around she has the expression of someone who has been practicing that moment in her head and is quietly delighted by how it landed.

{della}"Good morning," she says, simply. Then she smooths her skirt over her hips and the fabric pulls tight and she watches your face and **her own expression goes dark in a way that is absolutely not appropriate for before noon**. {della}"I've been doing that on purpose," she admits. {della}"All morning. I drop things and I pick them up slowly and I'm-- I'm not sorry. I'm absolutely not sorry."

She moves closer and turns slightly, glancing back over her shoulder at herself, and makes a low sound of pure self-satisfaction. {della}"It's a magnificent ass," she says, and then her hand flies to her mouth. {della}"I said that out loud." A long beat. Her eyes are wide. {della}"It is, though. Isn't it? You can see it. I can feel it when I walk and I keep thinking about someone grabbing it with both hands and I'm-- I need to start more bread." She doesn't move toward the bread. She presses her thighs together and stares at you. {della}"Help."`,
    },

    goddess: {
        intimate: (ctx) => `The bakery smells of cardamom and heat, and Della is standing behind the counter when you arrive, and the first thing you notice is that she is very, very still. The second thing you notice is why. She has been standing there looking at her reflection in the dark window behind the oven for some time.

{della}"I didn't hear you come in," she says, without turning around. Her voice is careful the way people are careful with things they don't trust themselves to hold. {della}"I've been standing here for a while."

She turns around, and **the breath goes out of you**. She fills the space differently now -- not just more, but more deliberately, as though the universe has been building toward this arrangement of mass and curve and warm, particular gravity. Her apron hangs open and she doesn't seem to notice or care. {della}"I keep waiting to feel like myself again," she says. {della}"But I think this is myself. I think this is what I actually am." Her hands move to her chest, press against the weight there, and a low, shuddering sound escapes her that she doesn't bother to apologize for. {della}"Christ. That is-- I can't."

She comes around the counter slowly, and **every step is an event**, and she stops close enough that you can feel the warmth radiating off her. She takes your hand without asking and places it at her waist, and the muscle there is solid beneath softness, and her hips flare out from it like an argument.

{della}"I need you to understand," she says, very quietly, {della}"that I am about thirty seconds away from locking the front door." Her other hand presses your palm harder against her hip. {della}"My tits feel incredible. My ass feels incredible. I am wet in a way that should probably concern a doctor." She searches your face. {della}"Do not be gentle with me. I have been gentle my entire life. I do not want gentle right now." She kisses you before you can answer, flour-dusted and deliberate, and she tastes like cardamom, and **she makes a sound against your mouth** like a woman who has been waiting her whole life to make it.`,
    },

    petite: {
        casual: (ctx) => `Della has never been a small woman, or thought of herself as one, and the adjustment is written all over her face -- a kind of bewildered amusement, looking down at hands that seem the same but are framed by a body that has quietly reorganized itself into something compact and neat.

{della}"I fit in the little chair," she says, the moment you walk in. She points to the low stool by the window that's been a decorative inconvenience for years. {della}"I sat in it this morning. My knees were fine. I had my tea and everything." She shakes her head slowly. {della}"My mother had a phrase for this kind of feeling. She called it 'right-sized.' Like when a thing is exactly as big as it needs to be and no bigger."

She smooths her apron, which has needed significant adjustment, and looks up at you with a smile that is warm and a little wondering. {della}"I feel very... neat," she says finally. {della}"Compact. Like nothing is wasted. Is that a strange thing to say?" **She tilts her head, genuine and curious.** {della}"I think I love it."`,

        intimate: (ctx) => `Della is behind the counter when you come in, and she is looking up at you with an expression that is entirely new on her face -- something that is half delight and half a more complicated, more specific feeling that has something to do with the difference in your heights and the way you're filling the doorframe.

{della}"Oh," she says softly. Then she looks at you looking at her and the soft becomes something else. {della}"Oh, you..." She covers her mouth with her hand, and then takes it away. {della}"No, I'm saying it. You look very large right now. From down here. I mean that as a compliment." She presses her thighs together. {della}"I very much mean that as a compliment."

She comes around the counter and stops in front of you and **looks up at your face**, and something in the angle of it undoes her. {della}"I want you to pick me up," she whispers, and sounds absolutely mortified. {della}"I've never wanted that before in my life and apparently I want it very badly and my-- I'm wet just from the thought of it, that's-- that's embarrassing, that's very embarrassing, I'm a grown woman." She curls her fingers into your shirt anyway. {della}"Don't make me ask twice."`,
    },

    statuesque: {
        casual: (ctx) => `Della moves through her bakery differently now -- not hurried, not bustling, but with a kind of long-strided ease, as if she's finally found the right tempo for her own body. She reaches the top shelf for the good sugar without the step stool. She doesn't remark on it. But she smiles.

{della}"You know what's funny," she says, coming back to the counter, {della}"is that I feel like I've always moved this way. Like this is how I was always going to end up and I just had to... get here." She tilts her head, trying to make sense of it. {della}"Does that make sense to you?"

She leans against the counter with an ease that is effortless and looks entirely like herself -- but a version of herself that has been given more space, more room, a larger margin. **The quality of her stillness is different.** Calmer. More certain. {della}"My customers keep telling me I seem well-rested," she says with a quiet laugh. {della}"I suppose I do, don't I."`,

        intimate: (ctx) => `Della isn't flustered when you come in. That's the first thing you notice. She's standing by the window with a cup of tea, watching the street, and when she turns to look at you there's a steadiness in it that sends something warm down your spine.

{della}"I've been thinking," she says, which is not unusual, except her voice is lower than it normally is and she keeps her eyes on you while she sets down the cup. {della}"About how I feel. In here." She presses a hand flat to her sternum, then trails it slowly down to her stomach, and the gesture is not innocent and she knows it. {della}"Very settled. Very..." She pauses. {della}"Present."

She crosses to you slowly, and **each step is unhurried and completely intentional**, and she stops close -- closer than the bakery warrants, closer than customers get. {della}"I keep thinking about your hands on me," she says, conversationally, **as if commenting on the weather**, and your whole body responds before your brain catches up. {della}"I don't get flustered about it anymore. I just... want. Clearly. Without all the apologizing." She tilts her chin up and her eyes are warm and dark and entirely sure of themselves. {della}"That's new for me. I thought you should know."`,
    },
};

// ==========================================
// FIONA (Street Urchin) - Few words, trembling hands, fierce
// Casual: wide-eyed, quiet, guarded wonder
// Intimate: clamp→burst→shock, crude eruptions she can't control
// ==========================================

ARCHETYPE_ACHIEVEMENT_TEXTS.fiona = {
    hourglass: {
        casual: (ctx) => `Fiona is sitting on the edge of the fountain when you find her, arms wrapped around herself in the old way -- the way she used to make herself small. Except now the shape her arms are wrapped around has changed, and she hasn't figured out what to do with that yet.

{fiona}"I keep..." She stops. Starts again. {fiona}"When I walk. There's this... movement." She makes a small, helpless gesture at her hips. {fiona}"I didn't know it did that."

**She looks up at you with wide, serious eyes.** She is not distressed. She is trying very hard to hold something large and quiet inside a small body. {fiona}"I looked in the water," she says, meaning the fountain. {fiona}"For a long time." A pause. {fiona}"I look like a person."

It takes you a moment to understand what she means. What kind of person. The kind that gets looked at. The kind that gets seen. She glances away, jaw set, chin up, daring you to make it a bigger thing than she can handle. {fiona}"...it's good," she adds quietly. {fiona}"It's really good."`,

        intimate: (ctx) => `You find Fiona by the fountain, and she stands up fast when she sees you, which is wrong -- she usually stays seated to make you come to her. Her hands are doing something restless at her sides.

{fiona}"Hi," she says. Then she looks at you and whatever she was going to say next just doesn't happen.

**The quiet between you has weight in it.** Her hands find the hem of her jacket and grip it. {fiona}"I keep thinking about..." She shakes her head. Tries again. {fiona}"My waist. And then my-- the hips. The way they..." She trails off and she is pink to her ears. {fiona}"I want someone to put their hands on me." The words come out in a rush. {fiona}"Right there. At the waist and then lower and I want them to-- I want--" She grabs your arm suddenly, fingers digging in, and **stares up at you with enormous eyes**. {fiona}"Sorry. Sorry, that was--" She's breathing harder than she should be. She doesn't let go. {fiona}"Don't go."`,
    },

    amazon: {
        casual: (ctx) => `Fiona doesn't say anything when you find her. She just holds out her arm, forearm up, and flexes it slowly. The muscle rises in a clean, definite arc. She watches it. You watch it. She lowers her arm.

{fiona}"I picked up a drunk man last night," she says. {fiona}"He was blocking the alley. I moved him."

She squares her shoulders -- it's a gesture you've seen her practice, a gesture she used to have to work at. Now it just happens, naturally, gravity obeying her instead of the other way around. **She looks like she was built for it.** {fiona}"Nobody messed with me this morning," she adds. {fiona}"I walked the whole market. Nobody." She pauses. {fiona}"That's never happened before."

She looks at you and the look has something fierce and private in it, the look of someone counting a debt paid. {fiona}"Thank you," she says. Just that.`,

        intimate: (ctx) => `Fiona grabs your wrist the moment you're close enough. Not hard enough to hurt. Just hard enough that you feel it -- really feel it, the strength in her hand, the certainty.

{fiona}"Can you feel that?" she asks.

You can. She holds for a moment, then lets go but doesn't step back. She's breathing fast. {fiona}"I've been doing that to things all day," she admits. {fiona}"Walls. Crates. Just... grabbing." She flexes her hand open and closed. {fiona}"I grabbed the doorframe this morning and I thought--" She stops. {fiona}"I thought about grabbing you." Her jaw tightens, bracing for something. {fiona}"I want to hold you down," she says, very quietly, and then **her eyes go wide at her own mouth**. {fiona}"I don't know where that came from. I've never--" She looks at her own hands. {fiona}"I want to. Really bad. I'm-- can I?" She's trembling. Not from fear.`,
    },

    bombshell: {
        casual: (ctx) => `Fiona is wearing something different today. Not different-new. Different-chosen. She's standing by the fountain in a jacket that she's left open when you've never seen it anything but zipped to the chin, and when she sees your face she lifts her chin and stares you down like she's daring you to say something.

{fiona}"People kept looking at me today."

A beat. She is not complaining. {fiona}"Different kind of looking." She glances down at herself, at the way the jacket falls open, and then back up. {fiona}"I get looked at usually because I'm in the way or I'm suspicious or they think I'll pick their pocket." Her voice is careful, measuring each word. {fiona}"Today was... not that."

**She sits down on the fountain ledge and stares at the water for a moment.** {fiona}"A woman asked if I needed help finding something," she says. {fiona}"She thought I was lost. I'm never lost." A small, wondering pause. {fiona}"She was just... being nice. I think." She sounds like she's encountered a new species. {fiona}"That happens to some people. I always knew that. Just not to me."`,

        intimate: (ctx) => `Fiona is flushed when you find her. She shoves off the wall where she was leaning and crosses her arms and then immediately uncrosses them, because crossing them does something now that she's still adjusting to.

{fiona}"Stop," she says, even though you haven't done anything.

She tries again. {fiona}"I need to say something and if you laugh I will actually hurt you." She takes a breath. {fiona}"My tits are-- they feel incredible." The last word comes out slightly strangled. {fiona}"When I move. When I breathe. There's all this... weight, and it's..." She grabs your sleeve with one hand. {fiona}"I've been thinking about your mouth on them for an hour and I didn't even know I could think about things like that." **She is shaking, whole-body, the kind of shaking that has nothing to do with cold.** {fiona}"And the other thing. Between my legs. It's all-- I'm--" She looks up at you, mortified and fierce. {fiona}"I'm soaked. That's the word. I'm just completely soaked and I've been walking around like that and I needed you to know." She stares at you. {fiona}"Do something about it."`,
    },

    bootylicious: {
        casual: (ctx) => `There's a man by the market stalls who has walked past Fiona three times. She clocks him on the second pass with the flat professional awareness of someone who has spent her life reading streets. But this time she doesn't move away. She just watches him with narrow eyes and a complicated expression.

When you reach her she tips her head toward him and says: {fiona}"He's not casing me."

She says it like a statement of fact that hasn't finished landing yet. {fiona}"He just keeps..." She trails off, glancing down at herself with an expression that is trying very hard to be neutral. {fiona}"I noticed it this morning, too. When I was walking." She shifts her weight, and there it is -- a natural, rolling shift, the easy confidence of a body that knows its own dimensions. {fiona}"It moves."

**A small, private smile crosses her face and disappears.** {fiona}"I kind of like it," she says, like she's confessing something. {fiona}"That it moves."`,

        intimate: (ctx) => `Fiona doesn't say hello. She turns around when she hears you coming and **she watches your face with absolute focus** and she sees it -- the thing that happens to your expression -- and something in her exhales.

{fiona}"Okay," she says quietly. {fiona}"Good."

She turns back around, slowly. She is not a person who performs things. She is a person checking data. The data comes back clear. She turns to face you again and her jaw is set but her eyes are dark. {fiona}"My ass," she says, just that, flat and factual, {fiona}"is fantastic." Like she's reporting news. {fiona}"I keep grabbing it myself. In the mornings. Which is weird." Her hands are curled at her sides. {fiona}"I keep thinking about someone bending me over." Her voice is very quiet. {fiona}"I've thought about it so many times today that I'm--" She grabs your hand suddenly and presses it to her hip and the curve under your palm is warm and real and she's trembling. {fiona}"Feel that," she orders. {fiona}"And then don't stop there."`,
    },

    goddess: {
        intimate: (ctx) => `You find her at the fountain, but you almost don't recognize her. She's sitting with her back straight and her hands in her lap and her eyes on the water, and the square is moving around her the way water moves around a stone.

{fiona}"I didn't know it would be like this," she says when you sit next to her. {fiona}"Like... loud. On the inside."

She turns to look at you and **the breath leaves your body**. She is all the things she asked for and more -- the curve and the strength and the weight of her all at once, settled into a frame that somehow carries all of it without effort. She looks like herself. The most herself she has ever been. Her hands are trembling slightly in her lap.

{fiona}"I don't have..." She shakes her head. {fiona}"Words." She looks down at herself and back up at you. {fiona}"All of it. At the same time." Her throat works. {fiona}"I can feel my heartbeat everywhere."

She grabs your hand and presses it flat against her chest, and you feel it -- the real, hammering insistence of her heart, the warm weight beneath your palm, and she makes a sound she doesn't try to contain and **her eyes go wide with the surprise of it**. {fiona}"That's from you," she whispers. {fiona}"Just from you sitting here." She pulls your hand lower, past her ribs, past her stomach, and she's shaking hard now. {fiona}"I want everything," she says. Her voice breaks on it. {fiona}"I've never wanted anything before. Not like this." She presses your hand harder and looks at you with enormous, overwhelmed eyes and says {fiona}"I don't know what to do with all of it." A pause. {fiona}"Teach me."`,
    },

    petite: {
        casual: (ctx) => `Fiona is harder to spot in the crowd than she used to be, and when you find her she's tucked between two market stalls in the old watching-spot she used before she started trusting you. She hasn't gone there in months. When she sees your face she shrugs, not defensive, just honest.

{fiona}"It's different," she says. {fiona}"Small different." She considers this. {fiona}"Small on purpose. That's different from before." Before she was small because the world had made her that way. This is different. **She seems to know that.** She looks down at her hands. {fiona}"I fit in more places." A pause. {fiona}"That's useful." Another pause, smaller. {fiona}"I also just... like it." She looks up, daring you to find that funny. {fiona}"Felt right. When I saw."`,

        intimate: (ctx) => `Fiona finds you for once, which is unusual enough that you stop and wait. She stops a foot away and looks up at you with an expression that is new -- measuring, and not the cold kind. The warm kind.

{fiona}"You're bigger than me," she says.

You know that. She knows you know that. She is not conveying information. She is sitting with it. {fiona}"A lot bigger." She steps closer. {fiona}"I keep thinking about that." She grabs the front of your shirt with both hands, not pulling, just holding, and **stares up at your face from a new angle**, and something in her shudders. {fiona}"I want to be covered," she blurts, and then she flinches at herself. {fiona}"Wrapped up. Held down. Not-- I mean I want to feel how big--" She stops. She is bright red and gripping your shirt with white knuckles and she looks like she wants to disappear and also absolutely does not want to disappear. {fiona}"You understand," she says. Not a question. She needs it not to be a question. {fiona}"You know what I mean." She tilts her chin up. {fiona}"Right?"`,
    },

    statuesque: {
        casual: (ctx) => `Fiona is leaning against the wall by the fountain with her arms loose at her sides, and the first thing you think is that she takes up more space than she used to. Not more than her body occupies -- but more than she used to let herself occupy. There's less apology in it. Less bracing.

{fiona}"The guard didn't hassle me this morning," she says when you're close. She says it simply, like she's still parsing what it means. {fiona}"He looked at me and just... didn't." She stands up from the wall, rolls her shoulders back. It's not a practiced gesture anymore. It just happens. {fiona}"I've been practicing walking," she admits, and the admission costs her something, because Fiona does not admit to practicing things. {fiona}"Not to look different. Just because it feels good to take up the whole step."

**She meets your eyes directly**, which she still does sparingly, and which therefore still matters. {fiona}"I look like I belong here," she says. {fiona}"Like I'm supposed to be here." Her jaw tightens, keeping the feeling contained. {fiona}"First time for that."`,

        intimate: (ctx) => `The square is quiet and Fiona is standing in it, not hiding, not watching exits. Just standing. When you reach her she doesn't move to meet you and doesn't move away, and there's something in that stillness that feels earned.

{fiona}"I've been thinking," she says.

She turns to face you, and she is taller in her own skin, and she looks at you the way she looks at things she has decided she wants. {fiona}"About how you see me." She says it evenly, not flinching. {fiona}"I want to know. How you see me now." She holds very still while you look at her, and **a slow flush moves up her throat**, and her hands tighten at her sides but she doesn't look away. {fiona}"Okay," she says softly, reading your face. {fiona}"Okay."

She steps in close and her hand finds your chest, feeling your heartbeat, steady and pressing. {fiona}"I want you to show me," she says against your jaw. {fiona}"How you see me." Her fingers curl into your shirt. {fiona}"Slow," she says. {fiona}"I want it slow." She is trembling, but it is not fear. **It is the specific trembling of someone who has finally decided they are allowed to want something.** {fiona}"Don't rush it."`,
    },
};

// ==========================================
// LENNA (Librarian) - Academic wonder, quoting books
// Casual: cataloguing, margin notes, "statistically speaking"
// Intimate: eloquently filthy, narrates herself like erotica
// ==========================================

ARCHETYPE_ACHIEVEMENT_TEXTS.lenna = {
    hourglass: {
        casual: (ctx) => `{lenna}"The proportional relationships are... remarkable," Lenna says, pressing her copy of Harwick's Anatomical Surveys against her chest. She turns slowly in front of the workbench mirror, adjusting her glasses with one ink-stained finger. {lenna}"Statistically speaking, the ratio of chest to waist to hip follows the golden section almost precisely."

She traces the curve of her waist with both hands, then catches herself and pulls them back. **Her cheeks go pink.** {lenna}"I have read about figures like this. In several genres of literature. Mostly in the restricted collection." She clears her throat. {lenna}"The physiological implications alone are worth cataloguing."

{lenna}"I may need to revise my notes," she admits, still sneaking glances at the mirror. {lenna}"Several of my previous assumptions appear to have been... theoretical."`,

        intimate: (ctx) => `{lenna}"I keep telling myself this is purely observational," Lenna murmurs, but her hands are already moving, tracing the deep inward curve of her waist and the heavy outward sweep of her hips. She has abandoned the book on the shelf. {lenna}"The heroine of Verannis's lost manuscript had a figure described in exactly these terms. I always assumed it was hyperbole."

She cups her breasts with a sharp intake of breath, and a small, startled laugh escapes her. **{lenna}"It is not hyperbole."** Her glasses slip and she does not fix them. {lenna}"The weight of them. I wrote a margin note questioning the physics of the scene. I owe Verannis an apology."

Her hips roll against nothing, finding their own rhythm. She narrates softly, almost to herself: {lenna}"She stood before him, undeniable, the curve of her speaking a language older than words..." {lenna}"I used to read that line aloud to myself," she breathes. {lenna}"For purely academic reasons."

**She presses her thighs together and shivers.** {lenna}"The ${ctx.hasPenis ? `arousal is rather more insistent than I anticipated` : `sensation is... documented in the literature. Extensively. I understand why now`}."`,
    },

    amazon: {
        casual: (ctx) => `Lenna flexes her arm and stares at it like a puzzle she has solved and is not sure she should have. The muscle rises in a smooth, dense arc. She flexes again. Then again. {lenna}"Fascinating," she says, and adjusts her glasses.

She lifts a heavy reference tome from the shelf one-handed, something she would normally drag with both arms, and holds it out at full extension. No tremor. **The book might as well be a pamphlet.** {lenna}"The warrior queens of the Ilari Steppe were described in very similar terms in Morrath's chronicles. Strong enough to bend iron. Capable of feats that..." She trails off, rotating her wrist slowly, watching the tendons move under the skin.

{lenna}"I have always found the Ilari queens compelling," she says finally, setting the tome down with great care. {lenna}"Academically speaking."`,

        intimate: (ctx) => `{lenna}"She stood at the edge of the battlefield, and men twice her size found excuses to look elsewhere," Lenna quotes, running both palms up her own arms, feeling the muscle beneath. She is narrating from memory, her voice dropping into the cadence she uses when she reads aloud to herself in the empty stacks. {lenna}"Her body was not a decoration. It was an argument."

She flexes slowly, watching herself, and then her hands travel inward, over her chest, down her stomach. **The scholar's detachment is cracking.** {lenna}"I always annotated that passage as melodramatic," she admits. {lenna}"I was wrong about a great many things."

Her thighs are thick and strong and she squeezes them together, feeling the density of them. She ${ctx.hasPenis ? `is already hard and does not bother pretending otherwise` : `is wet and has been for several minutes, which she is cataloguing with great academic interest`}. {lenna}"The Ilari queens were also noted for their..." she pauses, and then she is touching herself, quite deliberately, {lenna}"...appetites."

**She stops narrating. There is nothing academic left in her expression.**`,
    },

    bombshell: {
        casual: (ctx) => `{lenna}"I want to be precise about this," Lenna says, which means she is flustered. She is looking at herself in the mirror and touching her collarbone repeatedly, a nervous habit. {lenna}"The term 'bombshell' originates in mid-period theatrical culture as a descriptor for performers whose appearance caused a disruptive audience reaction. Involuntary. Difficult to suppress."

She turns sideways and her breath catches audibly. **The figure in the mirror is not the figure she is used to.** The curves are extravagant. Prominent. The kind she has read described in three different novels this month, always from the outside.

{lenna}"I am experiencing a mild version of that reaction myself," she admits, adjusting her glasses. {lenna}"Regarding my own reflection. Which is..." She picks up a book and holds it open without reading it. {lenna}"...a data point I will need some time to process."`,

        intimate: (ctx) => `{lenna}"There is a scene in Halloran's Forbidden Garden," Lenna begins, and her voice has that low, careful quality it gets when she reads something she loves, {lenna}"where the protagonist describes herself as too much for any single room to contain." She is looking at herself with her glasses pushed up into her hair, which she never does. {lenna}"I always found that phrase indulgent."

She cups her breasts and her composure evaporates cleanly, like morning frost. **{lenna}"Oh,"** she says, very quietly, with the tone of someone whose hypothesis has been experimentally confirmed. She rolls her hips. She watches herself do it.

{lenna}"The protagonist goes on to describe the sensation of being perceived as..." she keeps talking because talking keeps her tethered, but her hands are roaming freely now, mapping the heavy swing of her chest, the prominent jut of her ${ctx.hasPenis ? `cock pushing against fabric` : `pussy, swollen and obvious`}, {lenna}"...a provocation. An irresistible one."

**Her next breath comes out ragged.** {lenna}"Halloran was a better writer than I gave her credit for."`,
    },

    bootylicious: {
        casual: (ctx) => `Lenna walks to the bookshelf and back twice before she says anything. She is, observably, paying attention to the way she moves. To what moves when she does. {lenna}"The posterior musculature and adipose distribution in this configuration would be of significant interest to scholars of classical figure art," she finally says, which fools no one.

She sits down and stands back up immediately, pressing her lips together. **Something about the way gravity works now is requiring her full attention.** {lenna}"In the Orvantine tradition, a figure of this proportion was considered the highest expression of..." she reaches back and touches herself, just briefly, then pulls her hand away and straightens her glasses. {lenna}"...physical abundance."

{lenna}"I have several books with illustrations," she adds. Then: {lenna}"For comparative purposes."`,

        intimate: (ctx) => `{lenna}"The seductress in Castellan's third volume is described from behind," Lenna says, and she has turned sideways to the mirror, craning her neck to look. Her voice has gone low and even, the reading-aloud voice, but her hands are already sliding down to cup the heavy swell of her backside. {lenna}"The narrator spends two pages on the subject. I once thought it excessive."

She squeezes, and a small, involuntary sound escapes her. She does not apologize for it. **She is past apologies.** {lenna}"'The kind of excess that short-circuits thought,'" she quotes, and she is rocking her hips now, grinding the weight of herself against her own hands. {lenna}"Castellan, chapter eleven. I have read that chapter many times. For research."

Her ${ctx.hasPenis ? `cock is hard and she reaches for it with ink-stained fingers, wrapping them around the shaft with the focused expression she usually reserves for rare manuscripts` : `fingers find the wet heat of her pussy and she gasps, shoulders dropping, book falling from the shelf behind her unnoticed`}. {lenna}"I owe Castellan a review," she breathes. **{lenna}"Five stars. Thoroughly researched."**`,
    },

    goddess: {
        intimate: (ctx) => `Lenna does not speak at first. She stands in front of the mirror and simply looks, and her hands come up slowly, trembling slightly, like someone reaching toward something they expected to be behind glass.

{lenna}"There is a passage," she begins, and her voice is barely above a whisper, thick with something she has no academic category for. {lenna}"In the Codex Varanthi. An apocryphal text. The scholars who translated it disagreed about whether it was mythology or memoir." She is touching herself everywhere now, cataloguing with her fingertips: the absurd weight of her chest, the dense, powerful curve of her arms, the outrageous fullness of her hips, the slick demanding ache between her thighs. {lenna}"The subject of the text achieves what the translator called 'the form the body always meant to become.'"

**She exhales very slowly. Her eyes are wet.** She flexes one arm and watches the muscle peak and holds it there, then reaches across with her other hand to feel it. Then her hand travels down, over her breast, her nipple hard against her palm, down her stomach, lower. {lenna}"I told myself," she says softly, {lenna}"that I studied bodies academically. That I was interested in the theory." Her ${ctx.hasPenis ? `cock is enormous and she wraps both hands around it and her hips roll forward on their own, helplessly` : `fingers press into the swollen wet of her pussy and she is already so close she laughs, a breathless, disbelieving sound`}.

She is narrating now, barely audibly, the third-person voice she uses when she has forgotten she is also the protagonist: **{lenna}"She had become the thing she had only read about, and the knowledge of it was its own exquisite undoing."**

{lenna}"I am going to need," she manages, voice cracking slightly, {lenna}"to revise my entire bibliography." She does not stop touching herself. She flexes again. She watches herself in the mirror with the pure, helpless, hungry expression of someone whose life's research has just become personally urgent.

The Codex Varanthi, she decides distantly, was memoir. **Definitively memoir.**`,
    },

    petite: {
        casual: (ctx) => `{lenna}"Compact," Lenna says, tilting her head. She is examining her own hands, which seem smaller than she remembers, more delicate. Her sleeves are slightly too long. {lenna}"In certain scholarly traditions, smallness was associated with precision. Economy of form. Every part exactly sufficient."

She moves through the stacks with a new kind of ease, slipping between shelves that used to be a tighter fit, her footsteps lighter. She picks up a small, thin volume that used to feel trivial in her hands and finds that now it feels proportionate. **Intentional.** {lenna}"I have always preferred books that don't waste words," she says, and there is something satisfied in her voice. {lenna}"Perhaps this is a related principle."

She adjusts her glasses, which now sit slightly differently on her smaller face, and pulls a book from a high shelf with a precise, neat reach. {lenna}"Everything necessary. Nothing superfluous."`,

        intimate: (ctx) => `{lenna}"There is an entire subgenre," Lenna begins, in her careful reading voice, {lenna}"devoted to the aesthetics of..." she pauses, choosing the word with visible deliberateness, {lenna}"...delicacy." She is sitting on the edge of her desk, legs crossed, and there is something newly self-conscious in her posture. Something that was not there before.

She uncrosses her legs. Then crosses them again. **Her ${ctx.hasPenis ? `cock feels prominent against this smaller body, the size of it suddenly conspicuous` : `pussy feels conspicuously sensitive, the fabric against it suddenly a conscious presence`}.**

{lenna}"The heroines of that subgenre are frequently described as 'aware of themselves,'" she says, and she is clearly aware of herself now, hands resting on her thighs, tracing small absent circles. {lenna}"Every sensation amplified. Everything..." She adjusts her glasses with exaggerated focus, which means she is trying not to finish that sentence out loud.

**She finishes it anyway, very quietly:** {lenna}"...felt more."`,
    },

    statuesque: {
        casual: (ctx) => `{lenna}"Statuary proportion," Lenna says, almost to herself, turning slowly. {lenna}"The Aldennian school held that the ideal figure should convey both grace and solidity simultaneously. Not one at the expense of the other." She presses a finger to her lips, thinking. {lenna}"I always found that a paradox. Theoretically."

She is standing differently now, she notices. Less hunched. The habitual scholarly curl has relaxed into something more upright, more... present. **The shelves don't seem to crowd her the way they used to.** {lenna}"The Aldennian sculptors would have found this configuration," she says, running one hand experimentally down her side, {lenna}"empirically satisfying."

{lenna}"I find it satisfying as well," she admits. Then catches herself. {lenna}"In a purely aesthetic sense. Obviously."`,

        intimate: (ctx) => `{lenna}"The statues in the eastern gallery of the Morrenthal archive are missing their original paint," Lenna says, walking slowly, feeling how her body moves. {lenna}"Scholars assume they were always marble-white. They weren't. They were depicted in full color. Robes. Skin. Everything." She trails her fingers along the bookshelf as she passes. {lenna}"They were made to be looked at and to feel something about."

She stops in front of the mirror and looks at herself for a long moment. Her hands move to her waist, her chest, her hips, exploring the proportions of this new configuration with the focused attention she gives a newly acquired rare text. **The scholar's mask is still on but it is becoming transparent.**

{lenna}"The Morrenthal archive catalogues refer to one particular statue as 'commanding,'" she says, her voice lower now. {lenna}"I always skipped past that word. It seemed imprecise." She rolls her shoulders back slowly, watching the shift. Her breath has changed. {lenna}"I understand now what they were trying to say with it."

**She keeps looking.** She lets herself be looked at, even if only by her own reflection. {lenna}"Thoroughly commanding," she says softly. {lenna}"I will update my catalogue notes."`,
    },
};

// ==========================================
// MRS. THORNWICK (Mayor) - Dignified, civic composure
// Casual: "Well," formal verdict, mayoral sash, portraitist
// Intimate: mask shatters, surprisingly raunchy, decades erupting
// ==========================================

ARCHETYPE_ACHIEVEMENT_TEXTS.mrs_thornwick = {
    hourglass: {
        casual: (ctx) => `{mrs_thornwick}"Well," says Mrs. Thornwick. She has been standing in front of the mirror for forty-five seconds without speaking, which for a woman who chairs three civic committees is a significant interval. {mrs_thornwick}"Well."

She places both hands on her waist, measuring the inward curve with her palms. Then the outward flare of her hips. She straightens her mayoral sash, which now drapes across a figure that the sash was not originally designed to accommodate. **The sash is losing the argument.**

{mrs_thornwick}"I have attended the Founding Day portrait sittings for twenty-two consecutive years," she says, with the measured cadence she uses for ribbon-cutting ceremonies. {mrs_thornwick}"The portraitist will require new reference sketches." She smooths her hands down her sides one more time, purely to verify the proportions. {mrs_thornwick}"I shall schedule the appointment for Tuesday. The afternoon slot. Something of this nature warrants appropriate preparation."`,

        intimate: (ctx) => `Mrs. Thornwick grips the edge of the workbench. Not for support, precisely. More as an anchor.

{mrs_thornwick}"The proportions are," she begins, and then stops, because both her hands have moved to her waist without being directed to, and are sliding upward over the dramatic swell of her chest, and she is watching them do this in the mirror with an expression of perfect composure while her breathing goes entirely to pieces. {mrs_thornwick}"The proportions are exceptional."

**She squeezes.** A controlled, assessing squeeze that becomes something else entirely in the space of one second. {mrs_thornwick}"I have maintained," she says, quite precisely, {mrs_thornwick}"a very sensible relationship with my own body for the majority of my adult life." Her hips have begun to move. She notices this with academic interest. {mrs_thornwick}"That relationship is, at present, under review."

Her hand slides down between her thighs and presses, firmly, through the fabric, and she exhales through her nose in a long, controlled breath that controls nothing. **{mrs_thornwick}"Most satisfactory,"** she says, which is the understatement of the municipal calendar year.`,
    },

    amazon: {
        casual: (ctx) => `{mrs_thornwick}"Structural integrity," Mrs. Thornwick says approvingly, pressing her fingers into the muscle of her own arm with the expression she uses when evaluating load-bearing proposals for new civic buildings. {mrs_thornwick}"Considerable structural integrity."

She lifts a heavy ledger from the desk. Then a second. She holds one in each hand with no visible effort and examines this situation with the moderate, even satisfaction of someone whose quarterly budget has come in under projection. **The ledgers are heavy. She is not.** {mrs_thornwick}"I have long maintained that the town council undervalues physical capability as a civic virtue," she says. {mrs_thornwick}"I shall be better positioned to make that argument going forward."

She sets the ledgers down and smooths her sash. {mrs_thornwick}"The portraitist will need a larger canvas."`,

        intimate: (ctx) => `Mrs. Thornwick flexes her arm and looks at it. Then she flexes it again. Then she sits down on the workshop stool, stands back up, picks the stool up one-handed, sets it down, and sits on it again.

{mrs_thornwick}"I am," she says, with precise diction, {mrs_thornwick}"processing a significant quantity of new information." Her hand is on her own thigh, feeling the dense muscle there, and she is pressing her thighs together in a way that has nothing to do with sitting comfortably. {mrs_thornwick}"The information is... favorable."

**She grips her own arm, hard, fingers digging in, and makes a sound she would under other circumstances describe as unbecoming.** {mrs_thornwick}"I have chaired this town's Fitness and Wellbeing subcommittee for eleven years," she says. Her other hand has moved between her thighs and is pressing there with the same firm, assessing grip. {mrs_thornwick}"The subcommittee has been, until now, largely theoretical."

{mrs_thornwick}"I intend," she says, with complete grammatical composure, {mrs_thornwick}"${ctx.hasPenis ? `to investigate certain further implications` : `to table several new proposals`}." She does not stop what her hands are doing. **She has no intention of stopping.**`,
    },

    bombshell: {
        casual: (ctx) => `Mrs. Thornwick reviews herself in the mirror for a full minute before speaking, which she does by smoothing her mayoral sash and clearing her throat with ceremonial precision.

{mrs_thornwick}"In my capacity as a public official," she says carefully, {mrs_thornwick}"I am frequently required to make an impression." She turns slightly sideways. Then back. {mrs_thornwick}"This configuration would, I believe, accomplish that objective with a degree of efficiency that my previous configuration could not claim."

**The understatement hangs in the air like bunting at a parade.** {mrs_thornwick}"The portraitist," she adds, after another pause, {mrs_thornwick}"will require new reference sketches. Again." She touches the sash lightly, then her collarbone, then folds her hands in front of her with decisive propriety. {mrs_thornwick}"I shall send a note this afternoon."`,

        intimate: (ctx) => `Mrs. Thornwick does not ease into it. She sees herself in the mirror, fully, and her hands are on her chest before she has formulated an opinion about whether they should be.

**The opinion, when it arrives, is favorable.** She cups the extravagant weight of her breasts through her formal dress and breathes through her nose in the measured way she uses during complicated budget presentations, which does not help. {mrs_thornwick}"I have always," she says, quite calmly, {mrs_thornwick}"presented myself with appropriate restraint in public forums."

She rolls her hips against the workbench edge. Deliberate. Testing. The pressure is good and she does it again with more intention. {mrs_thornwick}"This is not a public forum," she observes. Her ${ctx.hasPenis ? `cock is pressing against her dress with a frankness she finds clarifying` : `pussy is soaking through her undergarments and she reaches down to press her fingers against the fabric, firm and direct`}.

**She exhales with tremendous dignity.** {mrs_thornwick}"Most satisfactory," she says, and grinds against her own hand with complete composure. {mrs_thornwick}"Exceptionally so."`,
    },

    bootylicious: {
        casual: (ctx) => `{mrs_thornwick}"I have attended every Harvest Festival for thirty-one years," Mrs. Thornwick says, standing and then sitting and then standing again. She appears to be conducting research. {mrs_thornwick}"I have danced at each one. The traditional quadrille." She smooths the back of her skirt with both hands, an assessment rather than an adjustment.

She sits once more, very deliberately, and the chair receives her differently than it used to. **Something about this registers on her face as significant data.** {mrs_thornwick}"I anticipate," she says, folding her hands on the desk with civic composure, {mrs_thornwick}"that this year's quadrille will be a more... notable occasion than previous years."

She glances toward the mirror, then decides not to, then does anyway. {mrs_thornwick}"I shall select appropriate attire," she says firmly. {mrs_thornwick}"Something with structure."`,

        intimate: (ctx) => `Mrs. Thornwick leans against the workbench and then stops leaning, because the new weight of her changes how that feels and she needs a moment.

She takes a moment. She places her hands on the small of her back and slides them downward, over the extravagant new fullness there, and her expression does not change but her breath does. {mrs_thornwick}"There is a chair in my office," she says, with great precision, {mrs_thornwick}"that I have sat in for fourteen years." She presses her palms into herself, grips, and the sound she makes is brief and controlled and completely involuntary. {mrs_thornwick}"I intend to sit in it this afternoon."

**She grinds backward against the workbench edge.** The friction is good. She does it again with purpose. {mrs_thornwick}"I intend to sit in it," she continues, as though drafting meeting minutes, {mrs_thornwick}"and think about this, and ${ctx.hasPenis ? `address the situation that has developed` : `address the condition I am currently experiencing`}, which requires privacy and approximately twenty minutes."

**Her hips roll in a slow, heavy circle.** {mrs_thornwick}"Possibly thirty," she amends, with perfect grammar. {mrs_thornwick}"I will reschedule my two o'clock."`,
    },

    goddess: {
        intimate: (ctx) => `Mrs. Thornwick looks at herself in the mirror and goes very still.

She has been still before. She has presided over difficult council votes with stillness. She has received bad news with stillness. This is a different category of stillness. **This is the stillness of a very proper woman standing at the edge of something enormous and deciding, quite deliberately, to step off.**

Her hands move first. Both of them, to her chest, gripping with a firmness that leaves no ambiguity about intent. She rolls her hips against the workbench. Her mayoral sash is still perfectly aligned. {mrs_thornwick}"I have spent," she says, in a voice of absolute composure, {mrs_thornwick}"a great deal of my life being appropriate." She slides one hand down over the dense muscle of her stomach, over the full, heavy sweep of her hip, and presses her fingers between her thighs with the focused deliberateness of someone who has made a decision and intends to execute it completely. {mrs_thornwick}"I find I am less interested in that project than I once was."

**She is grinding against her own hand with the cadence of someone who knows exactly what they're doing, mayoral sash swaying with the motion.** Her other hand returns to her chest, squeezing the impossible weight of it, nipple hard between her fingers. {mrs_thornwick}"The civic record will reflect," she says, breath coming in controlled measures that are not controlled at all, {mrs_thornwick}"${ctx.hasPenis ? `that I recused myself from this afternoon's proceedings due to a matter of personal urgency` : `that I exercised the discretion appropriate to an official of my standing`}."

She flexes one arm, watches it peak, and grips the muscle with her free hand. She flexes her thighs and feels them respond, dense and powerful, squeezing against her fingers. **Everything she has become is enormous and certain and hers, and she is using all of it.** {mrs_thornwick}"Extraordinary," she says, which for Mrs. Thornwick is a superlative without ceiling.

She finishes with the same thoroughness she brings to any civic matter she undertakes, exhaling once, sharply, braced against the workbench. She straightens. She smooths her sash.

{mrs_thornwick}"We shall never speak of this," she says. **But her hands are already moving again.**`,
    },

    petite: {
        casual: (ctx) => `{mrs_thornwick}"Precise," says Mrs. Thornwick, and it is clearly a compliment. She examines her hands, which are smaller and more delicate than she is accustomed to, and flexes them once with the critical focus of someone reviewing a contractor's finished work. {mrs_thornwick}"Well-proportioned. Economical."

She straightens her mayoral sash, which now requires different management on a smaller frame, and moves to stand behind her chair. She grips the back of it. **Something about the scale of things has shifted, and she is noting the implications with methodical attention.** {mrs_thornwick}"There are members of the council who mistake volume for authority," she says. {mrs_thornwick}"They are incorrect. They have always been incorrect. I shall continue to demonstrate this."

{mrs_thornwick}"The portraitist," she adds, smoothing her dress, {mrs_thornwick}"will find this a more manageable sitting." A pause. {mrs_thornwick}"Efficiency is a virtue."`,

        intimate: (ctx) => `Mrs. Thornwick sits on the edge of the workbench and crosses her legs, and the new smallness of her body changes the geometry of the position in ways she finds immediately and inconveniently interesting.

{mrs_thornwick}"I have always maintained," she says, with careful diction, {mrs_thornwick}"that sensation is a matter of attention rather than magnitude." She uncrosses and recrosses her legs. The friction is, she notes with precise internal vocabulary, present. **Notably present.** She places her hand in her own lap with the air of someone setting an agenda item on the table.

{mrs_thornwick}"Every nerve apparently intact," she observes. Her hand presses inward. Her composure does not slip, exactly. It recalibrates. {mrs_thornwick}"Concentrated, one might say. The effect is..." She presses harder and stops talking for a moment, jaw tight. {mrs_thornwick}"...disproportionate to the scale involved."

**She grinds against her own hand with small, deliberate motions, back perfectly straight.** {mrs_thornwick}"I withdraw my previous concern," she says. {mrs_thornwick}"The proportions are entirely satisfactory."`,
    },

    statuesque: {
        casual: (ctx) => `Mrs. Thornwick straightens her mayoral sash, then her posture, and then decides neither required adjustment. The straightening was simply something to do with her hands while she took stock.

{mrs_thornwick}"Composed," she says finally, with the tone of a formal verdict. {mrs_thornwick}"The configuration presents well." She moves to the window and back with the unhurried authority of someone accustomed to rooms paying attention when she enters them. **The room pays attention.** {mrs_thornwick}"There is a quality in civic life that I have always described as 'presence.' It is not loudness. It is not size. It is the sense that a person occupies their space by right."

She smooths her dress once. {mrs_thornwick}"I have possessed that quality for some years," she says. {mrs_thornwick}"I note, with appropriate modesty, that it has increased." A brief pause, and then, with fractionally less composure: {mrs_thornwick}"The portraitist will be pleased. He has complained about the challenge of capturing my bearing. I expect the challenge is now considerably more manageable."`,

        intimate: (ctx) => `Mrs. Thornwick stands at the center of the room and simply inhabits it for a moment, which is a thing she has always been able to do but which now carries a different weight.

{mrs_thornwick}"I have been described, in various council minutes, as 'commanding,'" she says. She rolls her shoulders back. She feels the shift across her chest, her spine, the length of her. {mrs_thornwick}"I have always accepted the description as professional assessment." Her hands come up to her own waist, slide upward. Her breathing is steady and even. **It is the steadiness of someone exercising restraint, not of someone who has no need for it.**

{mrs_thornwick}"It occurs to me," she says, palms pressing up over her chest, over the firm curve of her breasts, {mrs_thornwick}"that the description may have been inadequate." She tips her chin up and looks at herself and then at you with the same measuring regard. Her hips shift forward, a small, rolling motion she does not suppress. {mrs_thornwick}"The present configuration invites a more thorough evaluation of the term."

**She is not giving you an order.** She is simply doing what she intends to do, and you are there to witness it. She grips her own chest firmly and rolls her hips with deliberate, unhurried purpose. {mrs_thornwick}"Most commanding," she says. {mrs_thornwick}"Upon reflection."`,
    },
};

// ==========================================
// ALDRIC (Blacksmith) - Gruff, direct, minimal words
// Male NPC feminized by transformation. She/her pronouns.
// Casual: matter-of-fact, grunts, gets back to work
// Intimate: focus intensifies, pins you, physically direct
// ==========================================

ARCHETYPE_ACHIEVEMENT_TEXTS.aldric = {
    hourglass: {
        casual: (ctx) => `Aldric catches her reflection in the polished back of a cooling breastplate. She stops. Tilts her head. Runs one calloused hand down from her ribs to the flare of her hip, then up again. The curve is undeniable now, waist pulled in, hips swept wide, chest balanced above like a proper counterweight.

{aldric}"Huh." She straightens. Flexes one arm out of habit. The new shape doesn't change the flex. {aldric}"Not bad."

She turns sideways, checks the profile, grunts once in approval the same way she'd grunt at a clean weld. No poetry. No fuss. She grabs her hammer off the workbench and gets back to work. But there's a faint pull at the corner of her mouth. That's as close to delighted as Aldric gets.`,

        intimate: (ctx) => `You find her standing at the forge with her work apron half-unlaced, her new hourglass figure catching the firelight in ways the old apron was clearly not designed for. She's just... looking down at herself. Not self-conscious. Curious. Scientific.

{aldric}"Waist pulls in here," she says, pressing two fingers to her side, {aldric}"and out again here." She draws the finger down over the swell of her hip. Her voice is level. Her eyes are not. There's heat in them that has nothing to do with the forge.

She looks up at you. **The amusement is gone.** Just focus, direct and total, the same look she gets right before she makes a difficult cut. She sets the hammer down carefully.

{aldric}"You did this." Not a question. Not a complaint.

She crosses the distance in two steps and pins ${ctx.hasPenis ? `your wrist against the wall, her hips tilting into you, that impossible curve pressing warm through your clothes` : `you against the stone pillar with one forearm, her other hand pulling your hip flush against hers, the flare of her waist impossibly warm under your palm`}. No preamble. No speech. Just Aldric, focused, intent, done with words.`,
    },

    amazon: {
        casual: (ctx) => `The forge rings out and then goes quiet. Aldric straightens from the anvil and rolls her shoulders, and the new muscle catches and moves in a way that makes the roll feel different. Bigger. She looks down at her arms. Flexes, slow and deliberate, watching the muscle bunch and cord under her skin. Chest is solid. Hips still there. Strong from the ground up.

{aldric}"That's a body," she says, to nobody in particular. Approving. Like someone else said it and she's agreeing.

She picks up a piece of stock iron she'd normally use tongs on and lifts it bare-handed, just to feel the weight. ${ctx.hasPenis ? `The fit of her trousers has changed` : `The waist of her apron sits differently now`}. She notices. She nods once. The hammer comes back up and the ringing starts again.`,

        intimate: (ctx) => `Aldric is in the middle of a lift when you walk in. She's moving a crate of raw iron stock, one that would take two of most people. The muscle in her arms is corded and taut, her new frame carrying the weight like it was built for exactly this. She sets it down and looks at her own hands.

{aldric}"Stronger than I was before," she says. Flat statement. Then, lower: {aldric}"A lot stronger."

She turns to face you and **something shifts in her expression**. The appraisal in her eyes moves from her own hands to you. She crosses her arms over her chest, which does interesting things to the muscle there, and takes one slow step forward.

{aldric}"I want to find out what this body does." Another step. Her voice has dropped. {aldric}"You going to help me with that or not?"

She doesn't wait for a full answer. She grabs ${ctx.hasPenis ? `the front of your shirt and pulls` : `your shoulder and turns you`}, her grip twice what you expected, and the workbench is suddenly behind you and Aldric is between you and the door. She grins. It is not a polite grin.`,
    },

    bombshell: {
        casual: (ctx) => `Aldric has been quiet for an hour, which usually means she's deep in a tricky weld. When you look over, she's not welding. She's standing in the middle of the forge floor looking down at her own chest with an expression of frank assessment.

{aldric}"These are ridiculous," she says. No heat in it. Just observation.

She rolls her shoulders, feels how the weight moves, straightens up to see how the posture changes. Then she reaches up and tucks a loose strand of hair back and checks the full effect. The ${ctx.hasPenis ? `fit of everything below the waist` : `curve from chest to hip`} has come in to match. She looks like someone dropped a pinup calendar into a smithy.

{aldric}"Still. Not complaining." She picks up her tongs. {aldric}"Get a lot done today."`,

        intimate: (ctx) => `She's pulled off her work shirt to cool down from the forge heat, which she's done a hundred times, and now she's standing very still realizing it hits differently than it used to. The chest alone would stop traffic. Add the ${ctx.hasPenis ? `fitted trousers` : `curve at the hip`} and the flat strong stomach and the effect is... significant.

{aldric}"Right." She clears her throat. Still looking down.

You say something and she snaps her eyes up to you. **The self-appraisal becomes something else entirely.** The focus locks onto you with physical weight. She walks over, slow, unhurried, lets you look.

{aldric}"Go ahead." Her voice is rough. {aldric}"Look."

She stops close. One hand comes up and she traces her own collarbone, down, watching your face the whole time. ${ctx.hasPenis ? `Her other hand catches your wrist and presses it to her waist` : `Her other hand catches your wrist and guides it, deliberate, to the curve of her hip`}. Her breath is already a little short. She was already wound up before you walked in. You just tipped it over.`,
    },

    bootylicious: {
        casual: (ctx) => `There's a new sound in the forge: the way Aldric's trousers move when she walks. She's noticed it too. She stops, walks three steps, turns around, walks back. The weight in her hips shifts and settles with each step in a way that is objectively impractical for smithing and objectively something else entirely.

{aldric}"Center of gravity's different," she says. Scientific. She squats down to pick up a dropped rivet and then pauses mid-rise, feeling the stretch. {aldric}"Hm."

She stands back up, ${ctx.hasPenis ? `tucks a thumb through her belt` : `smooths her hands down over her hips`}, and nods. Not self-conscious about it. Just noting the new data. It's very Aldric. She gets back to work. The forge rings. Her hips keep doing what they're doing.`,

        intimate: (ctx) => `Aldric is bent over the workbench sketching a commission design when she notices you looking. She doesn't straighten immediately. She turns her head and looks at you over her shoulder and **the awareness is immediate and mutual**.

{aldric}"Something on your mind?" Her voice is dry. She knows exactly what's on your mind.

She straightens slowly, deliberately, and turns around. The body that turns is built for attention. Chest modest, muscle lean, hips and ass doing everything. She leans back against the workbench, grips the edge with both hands, and watches you with that flat, focused stare that means she's already made a decision.

{aldric}"Figured out this body's good for more than lifting," she says. Low. Direct. ${ctx.hasPenis ? `{aldric}"Come here."` : `{aldric}"Well. You going to keep staring?"`}

She reaches out and hooks one finger through your belt loop and pulls, and her ${ctx.hasPenis ? `thighs bracket yours` : `hip catches against yours`}, and whatever composure either of you had is already gone.`,
    },

    goddess: {
        intimate: (ctx) => `The forge is quiet. Aldric is standing in the middle of the floor and the firelight is doing something impossible. She is enormous with it, c5 chest heavy and bare, muscle cut through with shadow, ass that could stop a war, and she is just standing there with her arms crossed and her jaw set like she's daring the room to comment.

{aldric}"Don't say anything," she says.

**You say something anyway.** Her eyes snap to you. Something in them goes very still.

She uncrosses her arms. Rolls her neck. The movement is enormous, all that muscle shifting, all that mass settling. She looks down at her hands, calloused and familiar, and then at the rest of herself, which is not familiar at all, which is something that has no business existing in a working smithy or possibly anywhere.

{aldric}"Spent thirty years in a body that worked," she says. Voice lower now. {aldric}"This one..." She stops. Presses her lips together. {aldric}"Doesn't seem fair, is all. To everyone else."

She crosses to you in four steps and the floor vibrates slightly. Her hand comes up and takes your jaw, not rough but not gentle, and tilts your head back. **Her eyes are burning.** She is not going to ask permission. She is not going to use many words. She is going to press you against the nearest surface and work out every feeling she has ever had about this body in the most direct way she knows.

${ctx.hasPenis ? `{aldric}"I've had a cock for six months." Her thumb traces your lower lip. {aldric}"I know how to use it." Her free hand slides to your hip and grips, and you have exactly one second of warning before she moves.` : `{aldric}"Been waiting to do this right." Her free hand finds your waist and pulls you flush against her, and the heat of the forge has nothing on the heat of her, and she breathes out through her teeth. {aldric}"Yeah. There it is."`}`,
    },

    petite: {
        casual: (ctx) => `Aldric is annoyed. Not devastated. Not distressed. Annoyed, the way she gets when a measurement comes out half an inch wrong.

{aldric}"Compact," she says, looking in the polished breastplate. She's shorter now, trimmer, the muscle she has distributed over a smaller frame. {aldric}"Hm."

She tests her grip on the hammer. Still strong. She checks her reach. Shorter. She makes a sound in her throat and adjusts her stance, then swings the hammer and the ring off the anvil is exactly the same.

{aldric}"Fine." She sets down the hammer. **The annoyance has resolved into pragmatic acceptance.** {aldric}"Better reach into tight corners anyway." She means the joints of heavy armor pieces she does repair work on. Probably. She goes back to work.`,

        intimate: (ctx) => `She's muttering when you come in, moving around the forge with more energy than usual, which you eventually realize is because she's having to reach for things she used to be able to grab without thinking.

{aldric}"Everything is the wrong height," she informs you.

But she stops when she catches you looking. Goes still. She is small now, compact, the lines of her clean and neat, and she looks up at you with an expression that is complicated.

{aldric}"Don't make it weird."

**You don't. You just step closer.** She holds her ground, chin up, all five feet and change of her radiating the same absolute confidence she had at six feet. But her eyes track you differently now, and when you raise one hand toward her face she doesn't move back. Her jaw does something subtle. Her ${ctx.hasPenis ? `breath catches` : `hands close into fists at her sides`}.

{aldric}"I said don't make it weird." But her voice is lower now and she's not moving away, and her head tips up just slightly, and it is absolutely already weird. In the best way.`,
    },

    statuesque: {
        casual: (ctx) => `Aldric runs her hand up the line of her arm. Bicep. Shoulder. The clean column of her neck. The proportions are balanced, chest and hips in proportion, muscle that reads as solid rather than extreme. She looks like someone designed a woman by asking a blacksmith what made structural sense.

{aldric}"Functional," she says. That's high praise from Aldric.

She checks her reflection one more time and makes a small nod of approval. No lingering. No admiring. Assessment complete, judgment delivered. She picks up her hammer and gets back to it. But she stands differently. Taller somehow, even at the same height. **Like she's decided the body fits.**`,

        intimate: (ctx) => `She's standing in good light and she knows it. The posture is too exact. Aldric doesn't usually position herself near windows.

{aldric}"Light's better here," she says, without looking at you. {aldric}"For the detail work."

There is no detail work on the bench. The bench is clear. She is just standing there in the good light looking like architecture, all clean line and balanced proportion, and when she finally turns to look at you the expression on her face is the one she gets when she's made a decision and is waiting for you to catch up.

{aldric}"Well?"

**The word lands like a dropped hammer.** Simple. Direct. She walks over and stops within arm's reach and raises her chin slightly. She won't ask again. With Aldric, there's the ask, once, and then there's what comes after the ask, and both are equally uncomplicated and equally inevitable.`,
    },
};

// ==========================================
// CORWIN (Merchant) - Charming, calculating, composure
// Male NPC feminized by transformation. She/her pronouns.
// Casual: smug, "investment," frames body as business asset
// Intimate: composure cracks, needy, desperate
// ==========================================

ARCHETYPE_ACHIEVEMENT_TEXTS.corwin = {
    hourglass: {
        casual: (ctx) => `Corwin has arranged three mirrors in the back room of the shop. Not one. Three. She's standing at the center angle with the posture of someone making a presentation.

{corwin}"Well, well." The smile she's wearing is the satisfied one, the one that comes out when a negotiation closes above asking price. {corwin}"The investment has matured."

She turns to see the rear profile, then the three-quarter view. Her fingers trail along her waist where it cinches in, following the geometry of it. The merchant's eye is calculating the asset value of every inch.

{corwin}"I've been underselling myself." She straightens the front of her blouse, smoothing it over a figure it was not cut to contain. {corwin}"That's about to change."`,

        intimate: (ctx) => `You find her at the merchant's counter and she pauses mid-transaction when she sees your face change looking at her. The customer gets waved off with smooth efficiency. The door closes.

{corwin}"There it is," she says, satisfied, rounding the counter. {corwin}"I wondered when you'd really look."

She stops in the middle of the floor and turns in a slow circle, arms slightly out, like displaying goods. The hourglass of her is frankly remarkable. She smiles, knowing, calculating, charming.

{corwin}"The question is what it's worth to you."

But then ${ctx.hasPenis ? `your hand touches her waist` : `you take her hand and draw her closer`} and **something cracks in her composure**. Tiny, but real. She swallows. The merchant's smile flickers.

{corwin}"I..." She stops. Presses her lips together. {corwin}"That's not..." Her breath has gone shallow. The calculation in her eyes is being overrun by something rawer. She reaches for a clever line and finds none. Her hand covers yours at her waist and presses it tighter. Her voice drops to almost nothing. {corwin}"Don't stop."`,
    },

    amazon: {
        casual: (ctx) => `Corwin has been testing her own handshake. You've watched her grip her own wrist, squeeze, assess. She picks up a heavy chest of coin that takes most people two hands. Sets it down. Picks it up again with one.

{corwin}"Fascinating." She flexes her hand open and closed. {corwin}"Completely renegotiates the terms."

She straightens to her full height, which is now significant, muscle filling out the merchant's coat in ways that stretch the seams. She looks like someone put a warmaster's body in a negotiator's clothes.

{corwin}"You know what strength communicates in a merchant's market?" She leans against the counter, arms crossing. **The arms are noteworthy.** {corwin}"It says: I don't need you as much as you think. Entirely different leverage." She smiles. {corwin}"I like it."`,

        intimate: (ctx) => `She's moved two heavy shelving units to get to a storage chest and she's not even breathing hard, and that's when she notices you watching. She sets down the crate. Looks at her own arms. Back at you.

{corwin}"You're calculating something," she says. {corwin}"I can see it."

She walks over. The amazon frame of her is undeniable in the shop's close quarters, muscle and height and the merchant's confidence stacked into something genuinely formidable.

{corwin}"Go ahead. Name your offer."

She means it as a joke. A game. But **when you reach up and put your hand on her arm, feeling the muscle there**, the game leaves her eyes with startling speed. Her jaw tightens. She looks down at your hand on her arm and something in her face does a fast complicated thing.

{corwin}"I don't usually..." She stops. Her free hand comes up and grips the shelf beside your head. Her voice has lost its rhythm. {corwin}"I'm usually better at this." Her forehead drops forward. Not suave. Not calculating. Just Corwin, overwhelmed, gripping a shelf to stay upright, whispering: ${ctx.hasPenis ? `{corwin}"Please. I need..."` : `{corwin}"Tell me what you want. I'll give you anything."`}`,
    },

    bombshell: {
        casual: (ctx) => `Corwin has updated her display strategy. The front table now has goods at a height that requires her to lean forward to retrieve them. The arrangement is not accidental.

{corwin}"Increased foot traffic by thirty percent this week," she says, as you walk in. She doesn't look up from the ledger. {corwin}"New display configuration."

The new display configuration is Corwin, in a blouse that is losing an argument with her new figure, leaning over a counter. She is perfectly aware of exactly what the display configuration is.

{corwin}"I've always said presentation is commerce." She looks up now, smiling the trader's smile, the one that means she has already won. {corwin}"This is just... enhanced presentation."`,

        intimate: (ctx) => `She is talking to a customer when you arrive, and the customer is not listening to a word she says. Corwin knows this and is using it. She is moving her hands through a product demonstration that requires very little hand movement but involves a great deal of incidental other movement.

When the customer leaves with twice what they intended to buy, she turns to you with that smile.

{corwin}"Margins are up," she says.

{corwin}"But." She comes around the counter, slowly, letting you look. {corwin}"There's a problem with the new arrangement."

She stops in front of you. The bombshell figure of her is right there, no distance, no counter between you. **Her eyes are doing the calculation but the calculation is struggling.**

{corwin}"I keep getting distracted." Her voice has slipped half a register. {corwin}"By my own..." She gestures at herself, vaguely. {corwin}"By the situation."

She reaches out and straightens your collar, fingers brushing your neck, and it's clearly an excuse to be closer. ${ctx.hasPenis ? `{corwin}"You're not helping," she says. Her knuckles are against your jaw now. {corwin}"I can't close deals if I'm thinking about..."` : `{corwin}"You've had a good look," she says. {corwin}"I think you owe me something in return."`} The merchant's polish is thinning. Her breath is uneven. She is very bad at this part.`,
    },

    bootylicious: {
        casual: (ctx) => `Corwin has been making unnecessary trips to the back room all morning. You realize why when you notice that the route she takes through the shop is the one that passes the mirror mounted by the staircase.

{corwin}"I've been reconsidering the upholstery on the merchant's bench," she says, stopping beside you. {corwin}"Cushioning. Structural support. That sort of thing."

She is not talking about the bench.

{corwin}"The new figure presents certain..." She pauses, tilting her head, watching herself in the glass. The curve from waist to hip to the frankly extravagant conclusion is framed perfectly in the mirror. **She looks profoundly pleased with herself**, the way she does when she's found a stock price before the market catches up. {corwin}"Logistical considerations. That I am in the process of exploring."`,

        intimate: (ctx) => `She has been watching how people watch her. You've noticed her noticing. She tracks every second glance, every customer who loses their thread mid-sentence, every delayed goodbye. She is cataloguing it with the merchant's precision.

Then she turns to you, and you are looking too, and it's different from the customers and she knows it.

{corwin}"Well." The word is careful. Controlled. {corwin}"The complete picture."

She turns once, slow, and the bootylicious figure of her moves the way it moves, the hips and weight of it, and she watches your face and the control slips. She stops. **Pulls her lower lip between her teeth.**

{corwin}"I had a whole approach worked out," she says. Lower. {corwin}"Witty. Strategic." She takes a step toward you. Another. {corwin}"I seem to have misplaced it."

She takes your hand and presses it to the curve of her hip without preamble, and the direct skin contact makes her breath go out sharp and she grips your hand tighter. ${ctx.hasPenis ? `{corwin}"I don't..." She swallows. {corwin}"I need..." The merchant who always knows the price has completely lost the number.` : `{corwin}"I've been thinking about this all week," she admits. {corwin}"I'm not... I don't usually admit that." Her voice cracks slightly. {corwin}"Please don't make me say it again."`}`,
    },

    goddess: {
        intimate: (ctx) => `The shop is closed. The sign is turned. Corwin is standing in the back room where the good mirror is and she is nude and she is looking at herself with the expression of someone who has just received a document she doesn't know how to process.

{corwin}"This isn't..." She clears her throat. {corwin}"This is unreasonable."

You say nothing. You look. She watches you look. **The cataloguing in her eyes becomes something desperate.**

{corwin}"Every body is an asset. I've always understood that. There's the asset and then there's the leverage and I know how to work leverage." She's talking fast. The merchant's voice on a runaway course. {corwin}"But this is... there's no..." She stops. Puts her hand over her mouth.

The goddess body of her stands in the lamplight and it is too much. It is genuinely too much. Enormous chest, muscle cut deep, the ass alone is a separate conversation, and the ${ctx.hasPenis ? `cock of her, thick and already showing interest` : `heat of her, already visible`}, and her face, which is Corwin's face, but with every layer of composure stripped back to something raw and frightened and wanting.

{corwin}"I don't know what to do with this," she says, very quietly. The most honest thing she has said in years.

She crosses to you and her hands grip the front of your shirt and her forehead drops to your shoulder and she breathes for a moment. Just breathes. The smooth merchant completely undone.

${ctx.hasPenis ? `{corwin}"Tell me what to do." Her voice is muffled in your collar. {corwin}"Please. I'll... I'll give you anything. I don't have a price tonight. Just tell me." She tilts her head up and her eyes are wet and her voice breaks slightly: {corwin}"Please."` : `{corwin}"Stay," she says. One word. No deal attached. No clause. Just Corwin, all negotiating armor gone, asking for the one thing she doesn't know how to buy. {corwin}"Please. Stay."`}`,
    },

    petite: {
        casual: (ctx) => `Corwin has reorganized the shop shelving so the items she handles most are within reach. She has done this quietly and without commentary, which is how you know she's pretending it isn't a thing.

{corwin}"Efficient use of space," she says, when you notice. {corwin}"Good retail practice."

She's smaller now, compact, the merchant's sharp features and sharper eyes in a frame that makes her look younger than she is. She doesn't like it, not quite, but she's already running the calculus on the advantage.

{corwin}"Sympathy buying," she says, thoughtfully, as though this has occurred to her just now and not at regular intervals for the past week. {corwin}"Customers extend credit on instinct when they feel protective." She picks up a trinket from the display. {corwin}"I estimate a twelve percent uplift in impulse purchases."

{corwin}"Every position has leverage." **The smile returns, sharp and certain.** {corwin}"Mine just requires a different angle."`,

        intimate: (ctx) => `She is on her toes trying to reach a high shelf when you come in and she startles and nearly falls and would never admit it embarrassed her but it did, a little, and she lands with a scowl.

{corwin}"Not a word," she says.

You say the word. She scowls harder. But you step in to help reach the box and now you're close and she goes still, looking up at you.

The petite frame of her, looking up, the merchant's calculating eyes gone briefly uncertain, is doing something to the air between you.

{corwin}"The angle is..." She pauses. One corner of her mouth moves against her will. {corwin}"Strategically suboptimal."

But she doesn't step back. She tips her chin up instead, holding ground on her principle alone. **Her eyes find your mouth.** The calculation in them softens. She reaches up slowly and puts one hand on your chest, feeling your heartbeat, and something in her expression does the impossible thing of becoming genuinely open.

{corwin}"I find I have less leverage than I'd like," she says, very quietly. {corwin}"And I find I don't... mind." She doesn't sound pleased about that. She sounds terrified. She also doesn't move away. ${ctx.hasPenis ? `Her fingers curl into your shirt.` : `Her other hand rises to your face.`}`,
    },

    statuesque: {
        casual: (ctx) => `Corwin has new clothes. Well-cut, the kind that cost real money, and they fit the statuesque figure of her in a way that is extremely deliberate. She is wearing them the way she wears a good deal: knowing exactly what it's worth.

{corwin}"Presentation," she says, spreading her hands, when you look. {corwin}"The goods have changed. The wrapping should follow."

She moves through the shop and the posture is elevated, the walk unhurried, every inch calibrated. Clean curves, good height, the kind of frame that reads competent and capable and someone you want negotiating your contracts.

{corwin}"I've been thinking about positioning." She adjusts the collar of the coat. {corwin}"Not boudoir material. Not intimidating. Just..." She tilts her head. **Something genuinely satisfied moves through her expression.** {corwin}"Authoritative. I like authoritative."`,

        intimate: (ctx) => `The end-of-day light is coming through the shop windows and it's landing on Corwin in a way that is genuinely unfair. The statuesque proportions of her, the clean height and balanced figure, in the late gold light, and she knows it and she's letting it happen.

{corwin}"Profitable day," she says, without looking up from the ledger.

She looks up from the ledger. She puts down the pen.

{corwin}"Come here."

She says it smoothly, easily, the negotiator's voice, but **the eyes give her away**. She closes the ledger. Stands. Comes around the counter and stops at a social distance that is technically correct and practically nothing.

{corwin}"I've been composing a proposal," she says. {corwin}"All afternoon." Her hand comes up and touches your jaw, light, merchant-precise, reading the reaction. {corwin}"The terms are simple. Favorable, I think, to both parties." Her thumb traces your cheekbone. The composure is perfect. The breathing is not quite. ${ctx.hasPenis ? `{corwin}"Tell me you're interested and we can discuss specifics." She leans in one inch and her voice drops: {corwin}"Please say you're interested."` : `{corwin}"Tell me you're interested and we can discuss specifics." The please is barely there. She would deny it later. You both heard it.`}`,
    },
};

// ==========================================
// HOLT (Guard) - Stoic, military formality, restrained emotion
// Male NPC feminized by transformation. She/her pronouns.
// Casual: filed reports, "adequate," quiet private pride
// Intimate: discipline dissolves, whispered confessions, tender
// ==========================================

ARCHETYPE_ACHIEVEMENT_TEXTS.holt = {
    hourglass: {
        casual: (ctx) => `Holt is in the middle of her morning assessment when she stops. She does these every day, a guard's habit: check the equipment, check the body, note anything anomalous. Today the body is anomalous.

{holt}"Waist to hip ratio: significant." She says it the way she reports weather. Her hands rest at her sides. {holt}"Symmetrical. Structurally sound."

She stands very still for a long moment, grey eyes moving through some internal checklist. Then something small and real moves through her face. Not dramatic. Just... present.

{holt}"I look like myself," she says. Quietly. As though testing whether it's true. **It is true. You can see it land.**

She finishes the assessment. Reports for her shift. But the posture is different. Something has settled.`,

        intimate: (ctx) => `She comes off shift and doesn't go straight to the barracks. She comes to find you, which she doesn't usually do, and she stands in your doorway in her half-armor with the hourglass of her figure visible even under the chest plate, and she looks at you for a moment before she speaks.

{holt}"I've been conducting an assessment," she says. {holt}"Of the situation." Her hands are still at her sides. Her voice is even. {holt}"I find the results... difficult to remain neutral about."

She comes in. Removes the chest plate. Sets it against the wall with guard's care. And then she turns around and the hourglass figure of her is right there and she is looking at you with those grey eyes and the discipline in them is showing strain.

{holt}"I'm not sure what protocol applies." Her voice is very controlled. {holt}"I don't think there is a protocol."

**Her hand rises, almost without her permission**, and touches the curve of her own waist, then drops. She looks at the hand. Then at you. When you take a step toward her she goes very still, the way she does before action, but the action here is holding her breath and waiting.`,
    },

    amazon: {
        casual: (ctx) => `Holt broke the grip-test device this morning. She reported it straightforwardly at shift change: "Grip device, broken. Replacement required." No explanation. No context. The guard who saw it said she just squeezed it and the handle snapped off.

She's standing inspection now, and the amazon frame of her is doing things to the standard-issue uniform that the uniform was not designed to accommodate. She stands it exactly as she'd stand any inspection. Back straight. Eyes forward.

{holt}"The new physical configuration presents no tactical deficiency," she says, when you ask. {holt}"Enhanced strength. Improved reach. Adequate." She pauses. {holt}"Better than adequate."

**Something in the measured tone is fighting a smile.** It's a close fight. The smile might win.`,

        intimate: (ctx) => `She was sparring with the other guards, and she won. All of them. Twice. She's standing in the yard afterward not quite breathing hard, the amazon body of her carrying the practice sword like it weighs nothing, and there is color in her face that isn't just exertion.

{holt}"The results were... informative," she says, when you find her. She sets down the sword. Flexes her hand. {holt}"I had not expected the magnitude."

She looks at her own arms. Then at you. The color in her face deepens slightly.

{holt}"I find I have..." A pause. A discipline. {holt}"Feelings about this that are not easily categorized."

She steps closer. She is very large now, and she is very close, and the iron composure of her is doing something unusual in the vicinity of the eyes. **When her hand rises and very carefully, very precisely, touches your face**, her voice drops to a register she rarely uses.

{holt}"I would like to..." She stops. Closes her eyes for one second. Opens them. {holt}"I need you close to me right now." The military grammar of her has cracked open. Something quiet and fierce is in the gap. ${ctx.hasPenis ? `{holt}"Please." One word, costing everything she has.` : `Her hand slides to the back of your neck and she presses her forehead to yours and breathes. {holt}"Please," she says. {holt}"Just... stay close."`}`,
    },

    bombshell: {
        casual: (ctx) => `Holt filed a formal request for a new uniform. The request was: uniform alteration, chest accommodation, standard fit no longer possible. The quartermaster read it, looked at her, and allocated twice the usual fabric budget.

{holt}"The equipment is functional," she says, when you ask how she's adjusting. She means the body. She is assessing it the same way she assesses gear. {holt}"Balance point has shifted. Adapting."

She runs through her patrol route at full speed to demonstrate. The adaptation is, visually, complete. She turns and faces you straight-on and the bombshell figure of her is frankly remarkable in guard's uniform.

{holt}"I've had questions about it," she admits. {holt}"From the watch. I said: personal. They accepted that." She looks down briefly, then up. **Quiet, private pride, the kind she would never name.** {holt}"It is, in fact, personal."`,

        intimate: (ctx) => `End of watch. She's unlacing the chest plate and she's doing it with the patient efficiency of a guard who's done it a thousand times, and then she stops because the unlacing reveals something that hasn't been there a thousand times.

She looks down. Then at you.

{holt}"I'm finding it difficult to maintain standard detachment," she says. The words are precise. The voice is not quite steady. {holt}"During quiet patrol hours. I find my thoughts..." She stops. {holt}"Not on patrol."

She sets the chest plate down and turns to face you fully and the bombshell of her in the evening light is doing things to your heart rate. She watches your face very carefully.

{holt}"You're experiencing a physiological response," she observes. Then: {holt}"I am also." Her hands, at her sides, close slowly into fists. Not anger. **The opposite of anger.** {holt}"I don't know the procedure for this."

She takes one step and then another and then she is close and she looks up at you, the grey eyes very direct, and one of her fists opens and her hand finds yours.

${ctx.hasPenis ? `{holt}"Tell me what to do," she says. Very quietly. {holt}"I'll follow your lead." Her fingers tighten on your hand. {holt}"I mean that."` : `{holt}"I think..." Her voice is barely there. {holt}"I think I've wanted this for some time. I was waiting to be certain." She turns your hand over in hers, palm up. {holt}"I'm certain."`}`,
    },

    bootylicious: {
        casual: (ctx) => `The guard post has a set of steps up to the platform and Holt has been doing extra reps. You notice because she goes up and back down and up and back down and her expression is neutral but intent. Testing something.

{holt}"Stability is adequate," she concludes, coming down the last time. {holt}"Initial concern was unfounded." She means the new weight distribution. She was worried it would affect her stance. She is reporting that it does not.

She demonstrates by going immediately into a low guard position, then a forward step, then a pivot. All clean. **Professionally satisfied.** The bootylicious figure of her moves with her, not against her, and she's clocked this and approved it.

{holt}"Adjustment period complete." She straightens. {holt}"I feel..." A pause. She chooses carefully. {holt}"Good. I feel good."`,

        intimate: (ctx) => `She was on gate duty and there was a very long shift and nothing much happened and she had a lot of time to think. She tells you this matter-of-factly when she finds you at the end of it.

{holt}"I have been thinking about my body," she says. Her tone is the report tone. But the grey eyes are different. {holt}"Specifically about how it has changed. And about you."

She stands straight. Regulation posture. But her hands, usually at her sides or clasped behind her, are loose, fingers not quite still.

{holt}"I have... concluded several things." She swallows once, controlled. {holt}"Over the course of the shift."

**She reaches out and takes your hand.** Brings it to the curve of her hip, deliberate, not shy, but trembling slightly. She looks at where your hand is, then at your face.

{holt}"This is what I was thinking about," she says. Her voice is very quiet. {holt}"For six hours." The military bearing is still present but there is something naked in the grey eyes, fierce and tender and very close to the surface. ${ctx.hasPenis ? `{holt}"I would like to continue thinking about it. With you here." Her hand covers yours and presses it tighter. {holt}"If that's something you want."` : `{holt}"I don't ask for things easily," she admits. Her grip tightens. {holt}"I'm asking now."`}`,
    },

    goddess: {
        intimate: (ctx) => `She doesn't come to the guard post in the morning. Someone else covers her shift. She sends no message. You find her at midday, in the room she keeps at the inn, sitting at the window in the light.

{holt}"I wasn't ready to be seen," she says. Not apology. Explanation. {holt}"Not yet."

She stands, and the goddess body of her in the window light is simply another category of thing. The chest enormous and real, the muscle of her carved and present, the ass that rewrites architecture, and ${ctx.hasPenis ? `the cock of her, soft and heavy, that she regards with the same measured attention she gives everything` : `the heat visible at the center of her, the body fully, finally, herself`}. And the face: Holt's face, the grey eyes, the military jaw, and in it something **cracked fully open**, something that has no guard left.

{holt}"I finally feel like myself," she says. The words land soft. {holt}"Completely. For the first time."

She doesn't move toward you. She stands in the light and lets you look, and in her eyes is the most complete vulnerability you have seen there. Her hands are very still. Her voice is very controlled. She is choosing this, the being seen, the standing still for it.

{holt}"I've been afraid," she says. {holt}"For a long time. Of being wrong in my own body." Her chin rises slightly. {holt}"I'm not afraid of that anymore."

You cross to her. She watches you come. When you reach her she closes her eyes and her hands rise and grip your forearms, and she is shaking very slightly, **and it has nothing to do with weakness**.

{holt}"Stay with me," she says, still quiet, still controlled, but the words cost everything. {holt}"Please. I need..." She breathes. {holt}"I need you to stay." Her forehead falls to your shoulder. The goddess body of her shakes once. The guard, finally, puts down her post.`,
    },

    petite: {
        casual: (ctx) => `Holt submitted a report on the situation. You know this because she showed it to you. It read: "Physical reassessment following transformation. Current configuration: reduced height, reduced mass. Functional assessment: adapted. Combat effectiveness: maintained. Additional note: the configuration is correct. No further action required."

{holt}"I wanted it documented," she says. {holt}"For the record."

She stands before you, small and neat and precise, the grey eyes exactly as serious as always. The petite frame of her has the same military bearing, just a smaller canvas.

{holt}"I was concerned the change would feel..." She looks for the word. Settles for: {holt}"Wrong." She shakes her head. **Quiet certainty, the kind earned and kept.** {holt}"It doesn't."`,

        intimate: (ctx) => `She is doing her evening weapons check when you arrive and she works through it and finishes it even though you're there, because Holt finishes tasks. Then she sets the blade down and turns.

{holt}"I want to tell you something," she says. Formal. Like a briefing. {holt}"I find it easier to say it standing. If that's acceptable."

You indicate it is.

{holt}"I feel right," she says. {holt}"In this body. In this size. I've been carrying that for several days and I want you to know it."

She comes toward you and she is small, coming up only to your shoulder, and she tips her head back to hold eye contact and **the grey eyes are very bright**. Her hand comes up and rests against your chest. Just rests. Feeling the heartbeat.

{holt}"I don't need..." She starts over. {holt}"I've spent years needing things I couldn't name." Her fingers curl slightly. {holt}"I can name things now." She looks at her hand on your chest, then at your face. When she speaks again it's barely above a whisper: ${ctx.hasPenis ? `{holt}"I want to be close to you. I want you to hold me. I know that's not..." She stops. {holt}"It doesn't sound like me. It is me." Her hand grips your shirt. {holt}"Please."` : `{holt}"I want you close to me. That's all. That's everything." Her voice is very steady and very small. {holt}"I'm asking."`}`,
    },

    statuesque: {
        casual: (ctx) => `Holt's new posture is already good. The statuesque frame makes the regulation bearing look like it was designed for her specifically, tall and balanced and straight-spined. The guard captain said something about it during inspection and Holt said, "Thank you, sir," and stood even straighter.

{holt}"The configuration suits the role," she tells you afterward. Not bragging. Assessing. {holt}"Height is an asset on the gate. Commanding presence, good sightlines."

She looks forward into the middle distance for a moment, the grey eyes in some private calculation.

{holt}"I've been reviewing my assessments from the past year," she says. {holt}"Self-assessments. Physical, mental." She pauses. {holt}"There was a... consistent discrepancy. Between the numbers and the actual feeling." **Something resolves in her face.** {holt}"The discrepancy is gone."`,

        intimate: (ctx) => `Late shift. The town is quiet. She finds you at the workshop and doesn't announce herself with any of the usual guard's formality, just appears at the door and waits to be noticed.

{holt}"I'm off duty," she says, when you look up. As if that explains everything.

She comes in. The statuesque figure of her fills the doorway cleanly, proportioned and still, and she stands in the low light with that watchfulness she never fully turns off.

{holt}"I've been wanting to talk to you," she says. {holt}"Not in an official capacity." She pauses. {holt}"In the other capacity."

She crosses the room and stops close, and up close the grey eyes are unguarded in a way they aren't on the wall.

{holt}"I don't have a script for this," she admits. The military syntax is still there but the distance behind it is gone. {holt}"I know what I want to say. I'm finding the saying of it..." **Her jaw moves slightly.** {holt}"Requires more courage than I expected."

Her hand rises and touches your arm, just the lightest contact, and she exhales slowly.

${ctx.hasPenis ? `{holt}"I want to be with you," she says. {holt}"Clearly. Without qualification." Her hand closes on your arm. {holt}"I've wanted that for some time and I'm telling you now because it seemed important to tell you." The grey eyes hold yours. {holt}"That's all."` : `{holt}"You matter to me," she says. {holt}"I'm telling you that directly because I've learned that not saying things is its own kind of failure." Her grip on your arm tightens slightly. {holt}"And I don't intend to fail here."`}`,
    },
};

/**
 * Get the archetype achievement text for a specific NPC and archetype.
 * @param {string} npcId - The NPC identifier
 * @param {string} archetypeId - The archetype identifier
 * @param {boolean} isIntimate - Whether to use intimate (true) or casual (false) version
 * @param {object} ctx - Context object with body stat descriptions
 * @returns {string|null} The achievement text, or null if not found
 */
function getArchetypeAchievementText(npcId, archetypeId, isIntimate, ctx) {
    const entry = ARCHETYPE_ACHIEVEMENT_TEXTS[npcId]?.[archetypeId];
    if (!entry) return null;
    if (archetypeId === 'goddess') {
        return typeof entry.intimate === 'function' ? entry.intimate(ctx) : null;
    }
    const fn = isIntimate ? entry.intimate : entry.casual;
    return typeof fn === 'function' ? fn(ctx) : null;
}

// ==========================================
// ARCHETYPE WORKSHOP REACTIONS
// ==========================================
// Immediate reactions that play right after the final transformation
// completes an NPC's secret archetype. The NPC is still on/near the platform.
// Casual version (trust < intimate): wonder, gratitude, physical discovery
// Intimate version (trust >= intimate): sensation-driven, player interaction
// Goddess version: intimate only (overwhelming, everything at once)

const ARCHETYPE_WORKSHOP_REACTIONS = {};

// ==========================================
// FIONA (Street Kid) - Shy, determined, few words
// Stammering, nervous. Deep gratitude. High arousal: crude eruptions that shock her.
// Breast words: these, them, chest (normal), fat tits (horny, shocks even her)
// Dirty blonde messy short hair, hazel eyes, tanned skin. Patched oversized shirt.
// ==========================================

ARCHETYPE_WORKSHOP_REACTIONS.fiona = {
    hourglass: {
        casual: (ctx) => `The device clicks off. Fiona doesn't move. Her hands are still gripping the edge of the platform, knuckles white, and she is staring down at herself with an expression you can't quite read.

{fiona}"Something's..." She lets go of the platform with one hand and presses her palm flat against her stomach. The waist has pulled in tight, a dramatic inward sweep between the fullness of her chest and the wide, soft curve of her hips. She presses harder, feeling how narrow it's become. {fiona}"...different." She swallows. {fiona}"Really different."

She steps off the platform carefully, like the floor might have changed too. The motion makes everything shift, chest and hips moving in staggered waves around that pinched middle, and she stops dead. **Her hazel eyes go wide.** {fiona}"I saw a woman at the market once," she says quietly. {fiona}"Shaped like this. I couldn't stop looking." A pause. She runs both hands down her sides, feeling the dip and flare. {fiona}"People looked at her like she mattered." Her jaw tightens. {fiona}"...that's what this feels like."`,

        intimate: (ctx) => `The device winds down and Fiona is trembling before she even steps off the platform. Her hands find her waist and press in, feeling how narrow it's become, and the breath that comes out of her is shaky and raw.

{fiona}"Oh." She looks down. Her fingers trace the curve inward, then outward over the swell of her hips, and her lips part. {fiona}"That's... I can feel it. The weight. On both sides." She presses her thighs together and her whole body shudders. {fiona}"It pulls."

She grabs your wrist. Not gently. She presses your hand flat against her stomach, right where the waist cinches in, and holds it there. {fiona}"Feel that." Her voice is barely above a whisper. {fiona}"How small it is. And then..." She drags your hand lower, over the flare of her hip, and **a sound comes out of her that she clearly did not plan**. Her eyes go huge. {fiona}"Sorry, I... it's just when you touch the... the curve, it..." She is bright red and gripping your wrist hard enough to hurt and she is not letting go.

${ctx.hasPenis ? `Between her legs her cock is stiff and aching, pressed against the front of her trousers, and she shifts her hips and gasps.` : `She is wet. She can feel it, the slick heat between her thighs, and she presses your hand harder against her hip.`} {fiona}"Don't move your hand," she manages. {fiona}"Just... stay there. Please."`,
    },

    amazon: {
        casual: (ctx) => `Fiona steps off the platform and the floor creaks. She looks down at her feet, then at her arms. She turns one hand over slowly, watching the tendons shift under skin that now covers something dense and hard underneath.

{fiona}"Huh." She makes a fist. The muscle of her forearm bunches, defined and visible, and she stares at it. She makes a fist with the other hand. Same thing. She opens both hands and closes them again, like she's testing a new pair of gloves.

She reaches for the heavy iron clamp on the edge of the workbench, the one you need both hands to move. She lifts it one-handed. **Her expression doesn't change, but something behind her eyes does.** {fiona}"Someone on the street called a woman like this an amazon once," she says. She sets the clamp down and squares her shoulders, and the gesture is effortless now, the body obeying without negotiation. {fiona}"She hit him." A pause. The faintest smile. {fiona}"I understood why."`,

        intimate: (ctx) => `Fiona makes a fist the second the device stops. She watches the muscle rise, the hard clean arc of her bicep, and her breathing changes. She makes a fist with the other hand. Squeezes. Her jaw is tight.

{fiona}"I feel..." She steps off the platform and grabs the workbench edge and her fingers dent the wood. She looks at the marks. {fiona}"...strong." The word comes out hoarse. {fiona}"Really, really strong."

She reaches for you. Her hand closes around your forearm and **the grip is new, certain, and it sends something visible through her whole body**. She holds on, testing, feeling her own strength against you. {fiona}"I want to..." She pulls you closer. Her other hand finds your shoulder and grips. {fiona}"Hold you. I want to hold you and just... not let go." Her thighs are trembling, the thick muscle twitching. ${ctx.hasPenis ? `Her cock is straining against her trousers, hard and insistent, and she presses her hips against you without thinking.` : `She is soaked, the heat between her powerful thighs unmistakable, and she grinds against you once before catching herself.`}

{fiona}"I could pin you," she whispers, and then her eyes go wide at her own words. {fiona}"I didn't mean... I mean I did. I do." She is shaking. Her grip tightens. {fiona}"Can I?"`,
    },

    bombshell: {
        casual: (ctx) => `Fiona is still on the platform. She hasn't moved. She is looking down at herself with both arms pressed to her sides like she's afraid of what happens if she lifts them.

{fiona}"They're..." She stops. Tries again. {fiona}"They're big." Her voice is very small for a statement about something that is not small at all. Her chest has swelled dramatically on her slim frame, heavy and full, the fabric of her oversized shirt pulled taut for the first time. She touches her collarbone, carefully, and then moves her fingers an inch lower and stops.

**She lifts her chin and looks at you with a complicated expression, part wonder, part defiance.** {fiona}"I heard some men outside the tavern once," she says. {fiona}"Talking about a woman. They called her a bombshell." She steps off the platform and the new weight shifts and she goes still, feeling it. {fiona}"They said it like it was a weapon." A beat. {fiona}"...I think I understand what they meant."`,

        intimate: (ctx) => `The device stops and Fiona crosses her arms under her chest, an old protective gesture, and the gesture pushes her breasts up and together and she makes a choked sound and uncrosses immediately.

{fiona}"Oh god." She's staring down at herself. Her chest is enormous on her slight frame, heavy and straining against her shirt, and every breath makes them move in ways she is clearly not prepared for. {fiona}"They're so... every time I breathe they..."

She crosses her arms again, can't help it, and the push-up effect sends something through her that makes her grab the front of your shirt with both fists. **Her hazel eyes are enormous and dark.** {fiona}"My fat fucking tits won't stop..." She clamps her mouth shut. Her face goes scarlet. {fiona}"I can't believe I just..." She is shaking all over, the sensation of her own chest moving against your body making it worse.

${ctx.hasPenis ? `Her cock is hard and she can feel it pressing into you and she doesn't pull back.` : `She is dripping, the arousal between her legs so insistent it's making her squirm.`} {fiona}"Touch them," she blurts, and then, quieter, mortified but meaning every syllable: {fiona}"Please. They ache. They actually ache."`,
    },

    bootylicious: {
        casual: (ctx) => `Fiona steps off the platform and immediately looks over her own shoulder. Then she reaches back with one hand and stops mid-air, as if she's not sure she's allowed to touch.

{fiona}"Is that..." She turns in a slow circle, trying to see herself from behind. The transformation has focused everything downward, her chest staying small while her hips and butt have rounded out into something substantial, heavy, the fabric of her trousers pulled taut. {fiona}"...me?"

She finally touches, one hand pressing against the curve, and her eyes widen. {fiona}"It's warm," she says, like this surprises her. She takes a few steps toward the workbench and stops, feeling the weight shift with each step, the new bounce and sway. **A tiny, startled laugh escapes her.** {fiona}"Someone at the well called a woman 'bootylicious' once," she says. {fiona}"I didn't know what it meant." She takes another step, feels the roll of it. {fiona}"I think I know now."`,

        intimate: (ctx) => `Fiona reaches back and grabs her own butt before the device even finishes spinning down. She squeezes. Her fingers sink into the new fullness and she makes a sound low in her throat that she definitely didn't authorize.

{fiona}"Oh." She squeezes again, harder. The flesh is warm and heavy and giving, and each compression sends a pulse of sensation up her spine that she is visibly processing in real time. {fiona}"It's so... there's so much." She is breathing harder.

She looks over her own shoulder, then at you, and her expression is raw and desperate and she is past being embarrassed about it. {fiona}"Come here." She backs toward you, pressing the heavy curve of her butt against you, and **the contact makes her gasp and grab the workbench**. ${ctx.hasPenis ? `Her cock is hard, pressed between her body and the bench, and the pressure from behind is making it worse.` : `She is wet enough that she can feel it on her inner thighs, the arousal pulsing in time with her heartbeat.`}

{fiona}"Grab it," she says. Her voice is rough. {fiona}"Both hands. Hard." She presses back against you and shudders. {fiona}"I need to feel how much there is."`,
    },

    goddess: {
        intimate: (ctx) => `Every crystal in the workshop flares at once. The device doesn't wind down so much as surrender, the hum cutting to silence like it knows it's finished, that there is nothing left to give.

Fiona is standing on the platform and she is not the person who stepped onto it. Everything has arrived at once, the absurd fullness of her chest straining and swelling, the dense muscle layered through her arms and thighs and stomach, the heavy dramatic curve of her butt pulling the remnants of her trousers apart at the seams. She is enormous in every direction and she is shaking so hard she can barely stand.

{fiona}"I..." She looks at her hands. They are strong, veined, trembling. She looks down at her chest and her breath hitches and doesn't come back for a long moment. {fiona}"Everything." The word comes out cracked. {fiona}"I can feel everything."

She grabs you with both hands, fists knotting in your shirt, and pulls you against her. **The heat of her body is staggering.** Her massive chest presses against you, her powerful arms wrapping around you, her whole body curling into yours like she needs an anchor or she'll come apart. ${ctx.hasPenis ? `Her cock is enormous and hard and pressed between your bodies and she whimpers when it grinds against you.` : `Her pussy is drenched, the thick swollen lips pressed against your thigh, and she grinds once and cries out.`}

{fiona}"My fat fucking... everything is so... I can't..." She buries her face against your neck and **her whole body convulses, a full-body tremor that has nothing to do with cold**. {fiona}"Don't let go." Her voice is muffled and wrecked and absolutely certain. {fiona}"Don't let go of me. I'm... this is too much. It's all too much." She is crying, or close to it, overwhelmed past language, her powerful arms locked around you, every inch of her pressed against every inch of you.

{fiona}"I never had anything," she whispers. {fiona}"And now I'm... all of this." Another shudder. Her grip tightens. {fiona}"Stay."`,
    },

    petite: {
        casual: (ctx) => `The device finishes and Fiona stands on the platform and she is... small. Smaller than she was, which wasn't much to begin with. Her oversized shirt hangs to her knees now. Her trousers have pooled around her ankles. She looks down at herself and doesn't say anything for a long moment.

{fiona}"Huh." She steps off the platform and the step is light, barely a sound. She looks at her hands, turns them over. The fingers are thin, the wrists delicate. She picks up a wrench from the bench and it feels bigger in her grip.

**She doesn't look unhappy about it.** She looks thoughtful, in the quiet Fiona way where you can see the assessment happening behind her eyes. {fiona}"I used to be this size," she says. {fiona}"Before. When I was younger." She flexes her hand, feeling how the wrench sits. {fiona}"Easier to disappear at this size." A pause. {fiona}"But I picked it this time." She looks up at you. {fiona}"That's different."`,

        intimate: (ctx) => `The device finishes and Fiona is small. Genuinely, strikingly small, slight and fine-boned, her patched shirt like a blanket on her narrow shoulders. She steps off the platform and she has to tilt her head back to look at you, and the motion does something to her that is immediately visible.

{fiona}"Oh." She steps closer. Her head comes to the middle of your chest. She presses her face against you and **her small body fits against yours in a way that makes her shudder**. {fiona}"You're so..." She tucks herself tighter, arms wrapping around your middle, feeling how completely you surround her.

${ctx.hasPenis ? `Her cock, small but achingly sensitive, presses against you, and the friction of your body against it makes her gasp.` : `Between her small thighs she is tingling, wet, every nerve heightened by the reduced scale of her.`} {fiona}"I feel everything more," she whispers against your chest. {fiona}"Like... smaller means louder. Inside." She presses closer, curling into you, and her hands grip the back of your shirt. {fiona}"Hold me. All the way around." Her voice is tiny and fierce. {fiona}"I want to feel how big you are."`,
    },

    statuesque: {
        casual: (ctx) => `Fiona steps off the platform and stands up straight, and the standing-up-straight part is what catches you. Not forced. Not practiced. Just the natural posture of a body that knows its own proportions and finds them satisfactory.

{fiona}"It's..." She pauses, searching. She runs a hand down her side, feeling the balanced curve, the moderate fullness of chest and hip, the clean line of muscle. {fiona}"...even." She says it like she's discovering the word. {fiona}"Everything's even."

She squares her shoulders and the gesture is effortless. She walks to the workbench and back, and the walk is steady, grounded, the walk of someone whose body has stopped apologizing. **She stands at her full height and meets your eyes directly.** {fiona}"I heard a sculptor use that word once," she says. {fiona}"Statuesque. About a woman on the steps of the hall." She lifts her chin. {fiona}"She looked like she'd been put there on purpose." A pause. The faintest crack in her composure. {fiona}"...I look like that. Don't I."`,

        intimate: (ctx) => `Fiona steps off the platform and stands. Really stands, the way she never used to, squared and upright and taking up exactly the amount of space her body occupies, not an inch less. She looks at you and something in her expression has settled into a new configuration.

{fiona}"Look at me." She says it quietly, not a demand. A request. She needs you to see this.

She stands at her full height and squares her shoulders and takes your face in both hands, and **the steadiness of the gesture is what undoes you, because Fiona's hands have never been steady before**. They are steady now. She holds your face and looks at you from a height that feels earned, balanced, certain.

{fiona}"I feel..." She searches. {fiona}"Right. In my skin. Like it fits." Her thumbs trace your cheekbones and her breathing deepens. The warmth of her palms against your face is real and grounded and she leans in close, her forehead almost touching yours. ${ctx.hasPenis ? `She is hard against you, the press of her cock against your hip unhurried and warm.` : `She is wet, the heat between her thighs a slow, deliberate ache.`}

{fiona}"I want you to touch me like I'm real," she says. Her voice is low and even and the evenness is the most arousing thing about it. {fiona}"Like I'm exactly this. All of it." She pulls you closer by the back of your neck. {fiona}"Slow."`,
    },
};

// ==========================================
// LENNA (Librarian) - Academic, flustered, secretly bold
// Academic framing, adjusts glasses, references fiction (no page counts).
// High arousal: eloquently filthy, literary dirty talk, narrates own arousal.
// Breast words: chest, bust (normal), tits (composure fully gone).
// Brown hair (braid/bun), grey eyes, pale. Practical blouse, long skirt.
// ==========================================

ARCHETYPE_WORKSHOP_REACTIONS.lenna = {
    hourglass: {
        casual: (ctx) => `The device powers down and Lenna immediately reaches for her glasses, adjusting them with one ink-stained finger. Then she looks down at herself and her hand stops mid-adjustment.

{lenna}"Oh." She straightens slowly, and the motion reveals the extent of it. Her waist has drawn in dramatically, the blouse fabric gathering where there is suddenly so much less of her, while above and below the fullness has become undeniable. She runs both hands down her sides and her breath catches at the curve. {lenna}"The golden ratio," she murmurs. {lenna}"Harwick theorized it was achievable. I wrote a rather dismissive annotation."

**She turns to the side, watching the profile in the polished surface of the device casing, and her scholarly composure visibly strains.** {lenna}"There's a heroine in Verannis's second novel," she says, her voice carefully measured. {lenna}"Described as having a figure that 'rewrote the geometry of every room she entered.'" She traces the inward sweep of her waist again. {lenna}"I may owe Verannis a formal retraction."`,

        intimate: (ctx) => `The device clicks off and Lenna's hands go to her waist before she can stop them. She presses in, feeling the narrow pull of it, then her hands slide outward to her hips and she makes a sound that has no academic framing whatsoever.

{lenna}"The proportional shift is..." She runs her hands back up, over her ribs, to the heavy swell of her chest, and the sentence evaporates. She traces the full path again, waist to hip, hip to waist, mapping the shape she has become with ink-stained fingers that are starting to tremble.

She takes your hands. The gesture is deliberate, purposeful, a librarian arranging materials. She places them at her waist and guides them along the same path her own hands just traveled, outward over the flare of her hips. **Her grey eyes are fixed on your face, watching your reaction with an intensity that has nothing to do with scholarship.** {lenna}"Verannis wrote that the touch of another's hands on a figure like this was 'the difference between reading about fire and standing in it,'" she says, her voice lower now. {lenna}"I have always found Verannis overwrought."

${ctx.hasPenis ? `Her cock is pressing against the front of her skirt and she shifts her hips, the sensation of your hands on her curves and the ache between her legs feeding each other.` : `She is wet, the slick heat between her thighs building with every pass of your hands over her shape.`} {lenna}"I am revising that assessment," she breathes. {lenna}"Rapidly."`,
    },

    amazon: {
        casual: (ctx) => `Lenna steps off the platform and the step is heavier than it used to be. She notices. She stands on the workshop floor and looks at her own arms with the focused, careful attention she gives newly acquired manuscripts.

{lenna}"Morrath's chronicles describe the Ilari warriors as 'sculpted from conviction,'" she says, flexing one hand experimentally. The forearm is dense with muscle, the bicep rising in a clean defined arc. She touches it with her other hand and her eyebrows lift. {lenna}"I always assumed artistic license." She squeezes her own bicep. {lenna}"This is not artistic license."

She picks up a heavy brass fitting from the workbench, one-handed, easy. Turns it over. Sets it down. **The scholar's expression is fighting a losing battle against something more primal.** {lenna}"The Ilari word for this body type translates roughly as 'she who does not ask permission,'" she says. She rolls her shoulders and the muscle shifts like tectonic plates. {lenna}"I believe I understand the etymology now."`,

        intimate: (ctx) => `Lenna squeezes her own bicep and quotes softly: {lenna}"'Her strength was not the absence of softness but the refusal to apologize for its presence.'" She is running her hands up and down her arms, feeling the dense, hard muscle beneath skin that is flushed and warm. Her glasses are slipping and she does not fix them.

{lenna}"Morrath spent an entire passage on the proprioceptive experience," she continues, but her voice has dropped into the register she uses when she's reading something she shouldn't, late at night, alone in the stacks. She flexes both arms and watches herself. {lenna}"The sensation of density. Of force held in reserve."

She takes your hand and presses it flat against her stomach. The abs underneath are hard, defined, and the contact makes her exhale sharply. **Her grey eyes are dark and her glasses are crooked and she does not care.** {lenna}"Feel that," she says. {lenna}"That's real. That's..." She pushes your hand harder against the muscle and her hips roll forward. ${ctx.hasPenis ? `Her cock is stiff and straining and she presses it against your thigh with a scholar's precision about exactly where she wants the pressure.` : `She is soaked, has been since the muscle started filling in, and the clench of her stomach under your hand makes her pussy throb.`}

{lenna}"The Ilari queens," she manages, {lenna}"were noted for taking what they wanted." She pulls your hand higher, then lower. {lenna}"I am beginning to see the appeal."`,
    },

    bombshell: {
        casual: (ctx) => `The device finishes and Lenna looks down and adjusts her glasses. Then removes her glasses. Then puts them back on. The thing she is looking at does not change regardless of corrective lenses.

{lenna}"The theatrical term 'bombshell,'" she says, her voice pitched at careful academic neutrality, {lenna}"referred to a performer whose proportions caused involuntary audience response." She touches her own collarbone, the gesture nervous, habitual. Her hand does not travel lower. {lenna}"The emphasis was specifically on the upper torso relative to the frame."

She turns sideways to catch her reflection in the device casing and **her careful neutrality cracks audibly**. The profile is extraordinary, her slim frame dominated by a chest that defies the physics she spent yesterday lecturing about. {lenna}"Halloran wrote an entire novel around a character with this figure," she says. Her voice is slightly higher than normal. {lenna}"I shelved it in the restricted collection." A pause. {lenna}"For the good of the general readership." Another pause. {lenna}"I may need to re-read it. For... updated context."`,

        intimate: (ctx) => `Lenna cups her own breasts, lifting their weight, and the academic veneer lasts exactly two seconds. She makes a sound, a soft, startled oh, and her fingers press in and her head tips back and her glasses slide off entirely.

{lenna}"The weight," she breathes. {lenna}"Halloran described it as 'a gravity that begins in the chest and ends everywhere,' and I circled it in red and wrote 'purple prose' in the margin." She is still holding them, still testing the heft, and her thumbs brush across her nipples and she gasps. {lenna}"I owe Halloran... considerably more respect."

She removes her glasses deliberately, sets them on the workbench, and pulls your hands up to replace hers. **The gesture is the most decisive thing you have ever seen her do.** Your palms fill with warm, heavy softness and she exhales against you, her eyes closing. ${ctx.hasPenis ? `Her cock is hard and jutting and she presses it against you as your hands close around her chest, the dual sensation making her moan.` : `Between her thighs she is slick and aching, each squeeze of her chest sending a pulse of heat downward.`}

{lenna}"Don't be gentle," she says, and her voice has dropped into something that is not the librarian, not the scholar, but the woman who reads the restricted collection after hours with the door locked. {lenna}"I want to feel how heavy they are in someone else's hands."`,
    },

    bootylicious: {
        casual: (ctx) => `Lenna steps off the platform and immediately smooths her skirt down over her hips. The gesture is reflexive, practical. Then she smooths it again. Then she turns and looks over her shoulder at the device casing and goes very still.

{lenna}"Statistically speaking," she begins, then stops. She smooths her skirt again, and this time her hands linger over the shape beneath, the dramatic outward swell that her practical long skirt is no longer equipped to be practical about. {lenna}"The Orvantine school of figure sculpture placed the posterior as the primary locus of physical beauty," she says. {lenna}"Which I always found culturally specific rather than universal."

**She sits on the workbench stool and immediately stands back up**, her cheeks flushing pink. {lenna}"The... gravitational properties are notable," she says. {lenna}"The distribution of weight to the lower body creates a center of balance that is..." She runs one hand over the curve through her skirt. {lenna}"Entirely different." She clears her throat. {lenna}"I have several texts I should consult."`,

        intimate: (ctx) => `Lenna smooths her skirt over her butt and her hands slow down as they register what's underneath. The curve is dramatic, heavy, warm under the fabric, and she presses her palms against it and her breath stutters.

{lenna}"Castellan devoted an entire chapter to this," she murmurs, and she is already in the reading-aloud voice, the low private one. She squeezes, feeling the give of the flesh, the weight of it, and her hips shift. {lenna}"'The kind of abundance that makes thought itself feel inadequate.' I wrote 'overwritten' in the margin."

She sits on the workbench, the heavy swell of her butt spreading on the surface, and she pulls you close, her hands gripping the front of your shirt. Standing between her parted knees, you can feel the heat coming off her. **Her grey eyes are dark and her ink-stained fingers are trembling against your chest.** ${ctx.hasPenis ? `Her cock is hard, tenting her skirt, the tip wet and obvious against the fabric.` : `She is drenched, the warmth between her spread thighs radiating against you.`}

{lenna}"Castellan's protagonist invites the reader to touch," she says. Her voice is barely a whisper. {lenna}"Explicitly. In detail." She pulls you closer. {lenna}"I always thought the second-person address was a narrative cheat." She guides your hand to her hip, then around, to the curve behind her. {lenna}"It was not a cheat."`,
    },

    goddess: {
        intimate: (ctx) => `Every device in the workshop hums at once, a harmonic that climbs and climbs and then goes silent. Lenna stands on the platform and she is beyond any text she has ever read.

Her chest has swelled massive and heavy, straining against a blouse that has given up any pretense of containment. Her arms are corded with dense muscle, her shoulders broad, her stomach defined in hard ridges. Her hips and butt have filled to an extreme that her skirt has simply torn at the seams to accommodate. She is everything at once, every superlative she has ever dismissed as hyperbole, standing in the wreckage of her clothing.

{lenna}"The Codex Varanthi," she begins, and her voice is shaking. She is trying. She is trying so hard to frame this in language she can control. {lenna}"...describes a form that the translator called 'the body's final argument.'" She looks at her hands, the veined powerful forearms, the ink stains still visible on fingers that could now bend iron. {lenna}"I always assumed it was allegorical."

**She gives up on the Codex.** She presses herself back against the wall of the workshop, one hand going to her breast, massive and overflowing her palm, and the other hand going between her legs where ${ctx.hasPenis ? `her cock is enormous, straining, dripping, and she wraps her strong fingers around it and her hips buck forward` : `her pussy is swollen and drenched and her fingers press in and she cries out, her powerful thighs shaking`}. She is still narrating, she can't stop, but the narration has become something else entirely:

{lenna}"She stood... in the ruins of every modest estimation she had ever made of herself..." Her voice breaks. Her legs are shaking, the thick muscle trembling. {lenna}"...and she understood that the restricted collection was not fiction. It was... prophecy."

She reaches for you with her free hand, grabs your collar, and pulls you in. **Her grip is immense and her grey eyes are wet and wild and utterly without academic distance.** {lenna}"I need," she says, and for the first time in her life the sentence has no subordinate clause. {lenna}"I need you." She is shaking everywhere, every enormous inch of her. {lenna}"The bibliography can wait."`,
    },

    petite: {
        casual: (ctx) => `The device finishes and Lenna is... diminished. Not in any negative sense. Concentrated, perhaps. She steps off the platform and her blouse hangs loose, her skirt pooling, her braid looking heavier relative to her smaller frame. She adjusts her glasses, which now sit differently on her nose.

{lenna}"In the Aldennian tradition," she says, examining her own wrist with scholarly attention, {lenna}"economy of form was considered the highest aesthetic virtue." She turns her hand over. The wrist is delicate, the fingers fine, the ink stains suddenly prominent on smaller skin. {lenna}"Every part precisely sufficient. Nothing extraneous."

**She picks up a book and it feels larger in her hands, or rather she feels proportionate to it in a new way, like the book is finally the right size.** {lenna}"Certain texts are best read by someone who fits inside them," she says. She adjusts her glasses again. They are endearing on her smaller face. {lenna}"I believe this is what the poet Elari meant by 'the eloquence of less.'"`,

        intimate: (ctx) => `Lenna holds her own wrist, marveling at how her fingers close around it, how delicate the bones feel. She is small and light and everything about her has become fine and precise, and she is vibrating with an awareness of it that she is rapidly failing to frame academically.

{lenna}"There is a subgenre," she begins, but she's already touching the hollow of her own throat, the fragile line of her collarbone. {lenna}"Devoted to the erotics of... delicacy." She says the word carefully, feeling its weight. Her hand travels lower, over the flat plane of her chest, the narrow line of her waist.

She takes your hand and holds it next to hers. **The size difference is stark, and the effect it has on her is immediate and visible.** Her pupils dilate. Her lips part. ${ctx.hasPenis ? `Her cock, small but fiercely sensitive, twitches against the inside of her skirt and she presses her thighs together.` : `Between her small thighs she clenches, wet and tingling, every nerve amplified by her reduced frame.`}

{lenna}"Elari wrote that smallness was not diminishment but amplification," she whispers, still holding your hand against hers, palm to palm. {lenna}"That every sensation became proportionally larger." She closes her fingers around yours and pulls your hand to her waist, where your grip nearly spans her entirely. {lenna}"Elari," she breathes, {lenna}"was empirically correct."`,
    },

    statuesque: {
        casual: (ctx) => `Lenna steps off the platform and stands up straight, and the standing-up-straight is the first thing you notice. The habitual scholarly hunch, the protective curl of someone who spends her life bent over books, is gone. In its place is a posture that looks intentional, balanced, the way the Aldennian statues are drawn in her reference texts.

{lenna}"Classical proportion," she says, running one hand from her shoulder to her hip in a slow, assessing line. The curve is moderate, graceful, every dimension contributing to the whole without any single feature dominating. {lenna}"The Aldennian school defined it as the point at which the eye cannot find a correction to suggest."

She adjusts her glasses and looks at you with an expression that is trying to be purely scholarly and not quite managing. **Her grey eyes are bright.** {lenna}"'Statuesque' derives from the Orvantine root meaning 'worthy of being rendered permanent,'" she says. She touches her own waist, where the proportion is exact, and a small, involuntary smile crosses her face. {lenna}"I have never applied the term to myself before." A pause. {lenna}"It appears to fit."`,

        intimate: (ctx) => `Lenna stands straight, runs her hand from her shoulder to her hip, and the deliberateness of the gesture tells you she's been thinking about how this feels for a while. The proportion is classical, balanced, every line contributing to an evenness that reads as authority rather than excess.

{lenna}"The Morrenthal statues," she says softly, stepping close to you, {lenna}"were carved by people who understood that proportion is its own form of desire." Her hand continues its path down her side, tracing the moderate curve of her hip. {lenna}"Not the sharpest desire. Not the loudest. The one that builds."

She steps into your space and places your hand on her waist. **The gesture is unhurried and certain and it is the certainty that makes your breath catch.** Her waist under your palm is warm and exactly right, curving gently outward to a hip that fills your hand without overflowing it. ${ctx.hasPenis ? `Her cock presses against you, not urgently but steadily, a warmth that matches the rest of her.` : `She is wet, a slow persistent heat that has been building since the device finished and is in no hurry to peak.`}

{lenna}"The statues were designed to be touched," she says against your jaw. Her fingers trace up your arm, to your shoulder, to the back of your neck. {lenna}"The marble was polished smooth specifically for hands." She pulls you closer, her body pressing flush against yours. {lenna}"I am beginning to understand why they polished it."`,
    },
};

// ==========================================
// MIRA (Courier) - Warm, excitable, openly into it
// Uses "boss" for player. Cute exclamations at low arousal.
// High arousal: cute words disappear, becomes demanding.
// ==========================================

ARCHETYPE_WORKSHOP_REACTIONS.mira = {
    hourglass: {
        casual: (ctx) => `Mira steps off the platform and immediately stumbles, catching herself on the railing with a breathless laugh. {mira}"Whoa, okay... everything is just, like, distributed differently now?" She plants her feet wider, testing her balance, and her eyes go huge. {mira}"Boss, I swear my center of gravity moved three inches. I can feel it pulling, like... here and here." She gestures vaguely at her chest and hips.

She takes a few experimental steps, watching herself move with open fascination. {mira}"I read about this in one of Sylvie's journals, actually. She had a whole sketch labeled 'hourglass configuration' with all these notes about weight ratios." She does a slow turn, hands hovering at her waist. **The waist part is wild.** Everything cinches in and then just blooms out, top and bottom. {mira}"I feel like one of those fancy glass timers."`,
        intimate: (ctx) => `Mira steps off the platform and her whole body sways with unfamiliar momentum. {mira}"Oh," she breathes, hands flying to her waist. {mira}"Oh, boss, this is..." She bounces on her heels once, twice, and her breath catches at the way everything moves. The weight above and below her narrow waist shifts in counterpoint, a pendulum rhythm she can feel deep in her core.

{mira}"I can't stop bouncing," she admits, cheeks flushing to match her freckles. {mira}"Every time I move, I feel this pull, this heaviness up top and then the same thing in my hips and butt, and my waist is just... tiny between them?" She bounces again, biting her lip at the sensation. **The heft is intoxicating, tugging at her skin with every shift of weight.**

She reaches out and grabs both your hands without asking. {mira}"You need to feel this. I'm not kidding, the proportions are insane." She pulls your hands to her waist, and your fingers nearly meet around the narrow span of it. Then she slides your grip slowly outward, over the dramatic flare of her hips, and her eyes flutter half-shut. {mira}"See? It just... goes. The curve doesn't stop." Her voice drops. ${ctx.hasPenis ? `Her cock is stiff and warm against her trousers, pressing against your hip as she leans closer.` : `She is wet and warm between her thighs, and she presses her hips against you as she leans closer.`} {mira}"I could bounce on these heels all day, boss. Every single ripple feels incredible."`,
    },
    amazon: {
        casual: (ctx) => `The platform hums quiet and Mira steps down, rolling her shoulders with a sound like cracking knuckles. {mira}"Boss." She holds up one arm and flexes, and the muscle that jumps under her skin makes her burst out laughing. {mira}"BOSS. Look at this. I could arm-wrestle a draft horse." She flexes the other arm, then squeezes her own bicep with genuine wonder.

She takes a wide stance, testing the new density in her legs, the thick power coiled in her thighs. {mira}"Everything feels packed tight. Like my bones got heavier? And there's still curves in here, they're just... armored." She thumps her own flank and grins. {mira}"A trader in the south quarter told me about women warriors called amazons. Said they could snap a man in half and look gorgeous doing it." **She rolls her neck, vertebrae popping.** {mira}"I think I understand the appeal."`,
        intimate: (ctx) => `Mira steps off the platform and the floor creaks under her. She freezes, staring down, then starts laughing. {mira}"I'm heavy now. Like, actually heavy. All of this is muscle and it weighs so much more than I expected." She rolls her shoulders and the thick cords of her traps shift visibly beneath her skin. Her courier vest strains across her broadened back.

She walks toward you with a stride that's completely different from her usual bouncy trot. It's deliberate, grounded, each footfall planting with authority. {mira}"Some mercenary at the tavern was going on about amazons last week," she says, voice lower than usual. {mira}"Warrior women built like monuments. I told her that sounded exhausting." She stops in front of you and flexes both arms. The peaks of her biceps are genuinely impressive. **{mira}"I take it back."**

She closes the distance and presses her whole body against you, wrapping arms thick with new muscle around you. The embrace is crushing, warm, dense. {mira}"Feel how solid I am," she murmurs against your neck. Her chest is modest but firm against your body, her butt round and hard with muscle. ${ctx.hasPenis ? `Her cock is pressed against your thigh, hard and insistent through the fabric.` : `The heat between her thighs radiates against you, wet and urgent.`} {mira}"Squeeze. I dare you. You can't even dent me." She shifts her hips and you feel the coiled strength in her thighs, the iron tension of her core. {mira}"I also feel like if you don't put your hands on these arms right now I'm going to lose my mind, so... priorities, boss."`,
    },
    bombshell: {
        casual: (ctx) => `Mira steps off the platform and immediately crosses her arms under her chest, then uncrosses them with a startled squeak. {mira}"Nope, that's... that's a lot more than before. Okay." She holds her arms out to the sides instead, looking down at herself with wide eyes. The weight on her chest is dramatic, pulling forward and down with a heavy, warm insistence that she can feel all the way into her spine.

{mira}"I saw a painting in the guild hall once," she says, still staring. {mira}"Some old master's idea of the perfect woman. 'Bombshell,' the plaque said. Huge up top, tiny waist, slim everywhere else." She gives an experimental shimmy and immediately grabs the railing as everything shifts. **{mira}"Boss, I think I'm that painting."** Except paintings don't have to deal with the actual weight of these things.`,
        intimate: (ctx) => `Mira's feet hit the workshop floor and she gasps, not from pain but from the sheer momentum of her chest settling into its new reality. {mira}"Oh... oh, boss, they're so heavy." Her hands come up and cup the dramatic swell of her breasts, lifting, testing. The heft is extraordinary on her slim frame, pulling at the skin of her shoulders, warm and dense and achingly present. Every breath makes them shift.

{mira}"I can barely see my feet," she whispers, half-laughing, half-awed. {mira}"My waist is still small, my legs are still lean, but up here it's just..." She bounces her hands gently and sucks air through her teeth at the sensitivity. {mira}"One of the regulars at the courier office called a woman a 'bombshell' once. Top-heavy, impossible proportions, the kind of shape that stops traffic." **She looks up at you, cheeks blazing.** {mira}"I stopped my own traffic. I can't stop looking down."

She reaches out, grabs your hands, and places them directly on her chest without preamble. {mira}"Feel how heavy they are. I need someone else to confirm this is real." Your hands sink into warm, dense softness that overflows your grip. Mira's breath hitches, her nipples stiffening under the contact. {mira}"They're so sensitive now, every little touch just... radiates." She pushes into your palms, her slim frame arching. ${ctx.hasPenis ? `Her cock is straining against her trousers, the tip damp, and she gasps when the arch of her back shifts the pressure.` : `She is soaked between her thighs and she gasps when the arch of her back shifts the pressure.`} {mira}"Don't stop, boss. I need you to keep holding them because I genuinely think they might pull me over."`,
    },
    bootylicious: {
        casual: (ctx) => `Mira steps down and wobbles, her balance thrown dramatically backward. {mira}"Whoa, whoa, whoa." She grabs the railing and steadies herself, then looks back over her shoulder and goes completely silent for three full seconds. {mira}"...Boss. Where did all of THAT come from?" Her butt has rounded into something extraordinary, heavy and full, pulling at her lower back with warm insistence. Her practical courier pants are stretched to their limit.

She puts both hands on her butt experimentally and her eyebrows climb her forehead. {mira}"It's dense. Like, there's actual weight back there. And up front..." She glances down at her modest chest and laughs. {mira}"Yeah, the girls didn't get the memo. Everything went south. Literally." She takes a careful step and feels the heavy sway. **{mira}"A merchant I delivered to last week said his wife was what he called 'bootylicious.'"** Thought he was making it up. Turns out it's a real body type and apparently it's mine now.`,
        intimate: (ctx) => `Mira stumbles off the platform, thrown off balance by the extraordinary new weight concentrated behind her. {mira}"Boss, I..." She reaches back and her hands find a butt that's transformed beyond recognition, heavy and round and impossibly full. Her fingers sink into the dense softness and she makes a sound that's not quite a word. **The pull of it against her lower back is constant, warm, demanding attention.**

{mira}"My chest barely changed," she says, voice unsteady. She touches her small breasts briefly. {mira}"They're almost flat compared to... compared to back there. All the weight went to my butt and my hips and it's so heavy, boss, you have no idea. Every step I take, I feel it move. Like it has its own momentum." She walks to the workbench and sits on its edge, and the sensation of her own butt spreading and compressing under her weight makes her gasp. {mira}"A girl at the bathhouse called this shape 'bootylicious.' I thought she was teasing me."

She hooks a leg around you and pulls you in between her parted thighs. From this angle, her butt overflows the bench edge, warm and heavy. {mira}"Touch it," she whispers. {mira}"I can feel my heartbeat in it, that's how sensitive it is." Your hands find the extraordinary curve, fingers sinking into dense heat. Mira's head drops back. ${ctx.hasPenis ? `Her cock is pressing against your stomach, hard and damp at the tip.` : `The wet heat between her thighs is unmistakable against you.`} {mira}"It's all butt. I'm basically ninety percent butt. And I can feel every single one of your fingerprints right now." She locks her ankles behind you and grinds forward on the bench edge. {mira}"Don't you dare stop."`,
    },
    goddess: {
        intimate: (ctx) => `Mira steps off the platform and doesn't stumble, doesn't wobble, doesn't squeak. She stands perfectly still for a long moment, and the silence is shocking because Mira is never silent. Then she draws one long, slow breath, and **every part of her body shifts with it.** Massive breasts rise and fall over a core ridged with muscle. Her hips flare wide over thighs thick with power. Her butt behind her is a heavy, sculpted counterweight to the impossible fullness of her chest. Everything is enormous. Everything is dense. Everything radiates heat.

{mira}"I can feel all of it," she finally says, and her voice is quiet, stripped of its usual bounce. {mira}"Every pound. Every inch. My shoulders are holding up so much weight on my chest that my traps are flexing just to stand here. And my legs..." She shifts her stance wider and the muscle in her thighs visibly tightens. {mira}"They're bearing so much. Chest, butt, muscle, everything pulled to maximum." She looks at you and her green eyes are luminous, serious in a way Mira almost never is. {mira}"Sylvie's old texts had a sketch. She'd labeled it 'Goddess Configuration' and written 'theoretical limit' underneath. I don't think she believed anyone would actually reach it."

She crosses to the workshop chair where you sit, and each step is a controlled demonstration of power. The floor vibrates. She straddles you without a word, settling her full weight down, and you are engulfed, surrounded, pressed against a body that's more than human in every dimension. Her massive breasts press against your face, heavy and hot. Her thighs grip like a vice. Her butt overflows the chair on both sides. {mira}"I'm so heavy," she breathes. {mira}"Can you feel it? All of me, pressing down?" She rolls her hips and muscle and softness move in complex layers. **Her hands grip your shoulders and her fingers dent the flesh with effortless strength.**

{mira}"I can feel my own heartbeat everywhere. In my chest, in my thighs, between my legs, in my butt, in muscles I didn't know I had." ${ctx.hasPenis ? `Her cock is enormous and rigid, trapped between your bodies, and she shudders when she grinds against you.` : `Her pussy is soaked, the slick heat of it spreading against your lap as she grinds.`} She's breathing harder now, the analytical quiet burning away. {mira}"Don't call me cute right now, boss. Don't call me Mira. I'm something else right now." She grinds down and the chair groans. {mira}"Everything. That's what I am. I'm everything turned up to the limit and I need you to touch all of it before I shake apart."`,
    },
    petite: {
        casual: (ctx) => `Mira steps off the platform and nearly launches herself into the ceiling. {mira}"WHOA." She catches herself mid-bounce, eyes wide. {mira}"I'm so light! Boss, I feel like I weigh nothing. Like a strong breeze could just..." She windmills her arms, grinning. Everything about her has drawn inward, refined, reduced. Her chest is nearly flat, her hips narrow, her frame delicate and elfin.

{mira}"It's weird because I keep bracing for weight that isn't there," she says, patting herself down. {mira}"I go to cross my arms and there's nothing to cross them over. My butt doesn't pull when I walk. My thighs don't touch." She does a little spin, easy and light, and laughs. {mira}"A tailor in the arts district called this 'petite' when she was fitting me last week. Said some people spend fortunes trying to look this delicate." **She holds up her own slender wrist and marvels at it.** {mira}"I could fit through any window in this city, boss. Courier advantage."`,
        intimate: (ctx) => `Mira steps off the platform and floats. Not literally, but every movement has a weightless quality to it, as though gravity forgot about her. She touches her own collarbone and traces downward, over a chest that's barely a suggestion, a waist that's narrow as a wand, hips that taper to nothing. {mira}"I'm so small," she whispers. Not sad. Awed.

{mira}"There's no pull anywhere. My chest doesn't weigh anything. My butt doesn't drag. I feel like I'm made of paper and light." She holds out her arms and turns her wrists, studying the delicate tendons visible beneath thin skin. {mira}"The seamstress called me 'petite' and I thought she was being polite. But this is... boss, **I can feel my own ribs when I breathe.** Every breath fills me all the way up because there's nothing in the way." She traces her collarbone down to her flat chest, fingertips lingering where barely-there breasts begin and end in the same gentle slope.

She drifts toward you and takes your hand, pressing it flat against her sternum. Your hand covers nearly the whole span of her narrow chest. {mira}"Your hand is bigger than both of my boobs combined," she says, half-laughing, half-breathless. She places your other hand on her hip, and the bone is right there, sharp and delicate beneath a thin layer of warmth. {mira}"I feel like you could pick me up with one arm. Like I'd just fold into you and disappear." She steps in closer, all lightness and sparrow-bones, and presses her slight frame against you. There's almost nothing to her, and she can feel everything because of it. Every point of contact is vivid. ${ctx.hasPenis ? `Her small cock is hard against your thigh, almost lost in the press of your bodies.` : `The delicate warmth between her thighs presses against you, vivid and sensitive.`} {mira}"Without all that weight, everything is so sensitive. Your shirt against my chest, your belt against my hip. I can feel the texture of your buttons." She shivers, pressing tighter. {mira}"Is it strange that being small makes me feel more?"`,
    },
    statuesque: {
        casual: (ctx) => `Mira steps off the platform and pauses, standing up straighter than usual. Something about the proportions demands good posture. {mira}"Huh." She rolls her shoulders, feeling the balanced distribution of moderate curves and lean muscle. Nothing pulls too hard in any direction. Her chest is full but not heavy, her butt rounds nicely without dragging, and there's a pleasant density to her arms and core.

{mira}"This feels... proportional?" She sounds almost confused. {mira}"Like, nothing is fighting anything else. I saw a statue in the museum district once, some ancient sculptor's idea of the ideal woman, and the guide called it 'statuesque.' Everything in balance, everything measured." **She runs her hands down her sides, following the smooth, classical line from shoulder to hip.** {mira}"I don't wobble. I don't bounce. I just... stand here, and it feels exactly right. Weird, boss. I'm not used to things feeling uncomplicated."`,
        intimate: (ctx) => `Mira steps off the platform and stands tall, and there's a quiet confidence in the way she holds herself that wasn't there before. The proportions are harmonious. Full breasts sit balanced over a toned waist. Her butt curves in a clean arc that complements her hips without overwhelming them. Moderate muscle definition traces her arms and thighs like a sculptor's finishing touches.

{mira}"I keep waiting for something to feel extreme," she says softly, running her hands down her own sides. {mira}"But nothing does. Everything just... fits." **The balance is its own kind of beauty, every proportion answering every other.** {mira}"There was a statue at the academy, boss. A woman carved from white stone, and the plaque said 'statuesque' like it was a category. Perfect proportions, nothing overdone. I used to stare at it during lunch breaks." She meets your eyes. {mira}"I feel like that statue came to life and it's me."

She stands in front of you, straight-backed, and runs her hands from her shoulders down the balanced landscape of her body, lingering at each transition. Collarbone to the swell of her breasts. Breasts to the taper of her waist. Waist to the measured flare of her hips. {mira}"Touch me like you're verifying a sculpture," she murmurs. Your hands follow the path hers traced, and every proportion feels deliberate, intentional. {mira}"Nothing too much, nothing too little. My breasts are heavy enough to feel but not enough to ache. My butt fills your hand without overflowing it." She draws your hands up to her arms, where lean muscle firms under your grip. ${ctx.hasPenis ? `Her cock is warm and firm against her trousers, a steady presence rather than an urgent one.` : `The warmth between her thighs is steady and inviting, arousal without desperation.`} {mira}"Even this. Just enough strength to feel real." She steps closer, pressing the full length of her balanced body against you. {mira}"I think this is the most 'me' I've ever felt, boss. Everything in proportion, everything working together." She tilts her face up. {mira}"Is it strange that balanced is the thing that finally makes me want to lose my mind?"`,
    },
};

// ==========================================
// VESSA (Herbalist) - Analytical, blasé, connoisseur
// Measured, analytical language. Silent when truly aroused.
// ==========================================

ARCHETYPE_WORKSHOP_REACTIONS.vessa = {
    hourglass: {
        casual: (ctx) => `Vessa steps off the platform in silence. She stands motionless for several seconds, hands at her sides, cataloguing. Her breathing has changed, each inhale requiring accommodation for the new distribution of weight at her chest and hips. The waist between them has drawn dramatically inward.

She touches her own waist with clinical precision, thumb and forefinger measuring the narrow span. {vessa}"The ratio is significant." Her voice is flat, observational. {vessa}"Mass concentrated at the superior and inferior poles, minimal at the median." She shifts her weight from one foot to the other, testing the pendulum effect. {vessa}"An old anatomy text in my collection described this configuration as 'hourglass.' I assumed the term was poetic exaggeration." A pause. **The faintest crease appears between her brows.** {vessa}"It was not."`,
        intimate: (ctx) => `Vessa steps off the platform and is still. Utterly, completely still, the way she always is when something has genuinely affected her. Her dark green cloak hangs differently now, pushed outward at her chest and hips, cinched at the dramatic inward sweep of her waist. Each breath visibly moves the heavy swell above and below that narrow center.

{vessa}"The weight is bilateral," she says quietly. {vessa}"Anterior mass here..." she touches her chest, {vessa}"...balanced by posterior mass here." Her hand moves to her hip. {vessa}"The waist serves as a fulcrum. Every breath creates oscillation." She draws a slow inhale and the player can see it, the way her chest lifts and her hips shift in subtle counterbalance. **{vessa}"The description was clinical. The sensation is not."**

She traces the curve from her breast down to her waist and out along the flare of her hip, one slow, continuous line. Then she takes your hand without looking at you and places it at the top of the same path. Her violet eyes finally meet yours. {vessa}"Follow." Your hand travels the same route, and the geography is extraordinary: the dramatic swell of her breast giving way to an impossibly narrow waist that then blooms outward into a heavy, full hip. ${ctx.hasPenis ? `Her cock is firm against her dress, and when your hand passes her hip she presses forward, the friction making her breath catch.` : `She is slick between her thighs, and when your hand passes her hip she presses forward, the friction making her breath catch.`} {vessa}"Bilateral," she repeats, barely a whisper. {vessa}"Symmetrical. Overwhelming."`,
    },
    amazon: {
        casual: (ctx) => `Vessa steps down from the platform and the sound her boots make on the workshop floor is different. Heavier. Denser. She stands still, but the stillness itself has changed, no longer the quiet of a calm surface but the stillness of something coiled. Muscle is visible everywhere, from the cords of her neck to the thick definition in her forearms where she holds her cloak aside.

{vessa}"Mass has increased substantially but not in adipose tissue." She flexes one hand, watching tendons shift under taut skin. {vessa}"This is contractile. Functional." She takes one step and feels the difference, the planted authority of it, the way her thighs brace and her core stabilizes without conscious effort. **{vessa}"A monograph on historical body classifications used the term 'amazon' for this morphology."** Warrior phenotype. High lean mass, moderate secondary curves. She rolls one shoulder and something pops. {vessa}"The monograph did not mention how warm the tissue runs. I am generating considerable heat."`,
        intimate: (ctx) => `Vessa steps off the platform and stands like a pillar. The transformation has packed dense, powerful muscle across her frame, visible in every line from her thick shoulders to her carved calves. Her chest remains moderate, her butt firm and round with athletic muscle beneath it. The overall impression is of something dangerous wearing a woman's shape.

She says nothing for a long time. Her hands open and close, testing the new grip strength. She flexes one arm and watches the bicep peak with detached fascination, then squeezes it with her other hand, pressing hard. {vessa}"Dense," she murmurs. {vessa}"Remarkably dense." She traces the ridges of her own abdomen through her clothing. **Her jaw tightens. Something behind her analytical mask is responding to the power thrumming through her.**

She flexes her arm again, deliberately, and then takes your wrist. Her grip is shockingly strong, enough to feel the bones shift under the pressure. She presses your palm flat against her bicep and flexes against it. The muscle hardens to stone under your fingers. Then, without releasing your wrist, she pulls your hand down to her abdomen and pins it there. The ridges of her abs are tangible through the fabric. ${ctx.hasPenis ? `Her cock is hard and pressing against her dress, and the tension in her body is electric.` : `She is wet, the arousal building in silence, and the tension in her body is electric.`} {vessa}"I could crush something," she says, voice dropping to a register you have rarely heard. {vessa}"That awareness is... distracting."`,
    },
    bombshell: {
        casual: (ctx) => `Vessa steps off the platform and immediately braces one hand on the railing. An uncharacteristic reaction. She looks down at herself and blinks once. Her chest has expanded dramatically, heavy and full on her otherwise lean frame. The weight is concentrated, specific, pulling forward with a warm, insistent gravity that her slim body barely counterbalances.

{vessa}"The mass distribution is highly asymmetric." Her voice is carefully neutral. She releases the railing and stands straight, and the effort of compensating for the forward pull is visible in her posture. **{vessa}"A colleague's research notes described this phenotype as 'bombshell.'"** She assumed the term was colloquial hyperbole. She takes a slow breath and the dramatic rise of her chest draws the cloak taut. {vessa}"I am... revising that assessment."`,
        intimate: (ctx) => `Vessa steps off the platform and grips the railing hard enough to blanch her knuckles. She does not stumble. She would never stumble. But her center of gravity has lurched dramatically forward and every muscle in her back is working to compensate. The weight on her chest is immense on her slender frame, heavy, pendulous, warm with blood flow. Her waist and hips remain slim, making the disproportion almost architectural.

{vessa}"Gravitational load is... considerable," she manages. Her voice has lost a fraction of its clinical flatness. She releases the railing and stands unsupported, and the effort costs her. Every breath shifts the heavy mass, and she can feel the pull of it all the way through her ribs to her spine. **{vessa}"The term implies explosive impact. The physical sensation suggests the metaphor is apt."**

She turns to you. Her eyes are slightly wider than usual, her pupils dilated. She arches her back, just a fraction, and the dramatic swell of her chest pushes forward. Then she takes your head in both hands and presses your face into the warm, heavy valley between her breasts. No words. You are surrounded by dense, soft heat, by the rapid drumming of her heart transmitted through the skin. Her fingers tighten in your hair. ${ctx.hasPenis ? `Her cock is straining against her dress, rigid and ignored in favor of the sensation at her chest.` : `The wetness between her thighs is audible when she shifts, ignored in favor of the sensation at her chest.`} {vessa}"The weight," she says above you, barely audible. {vessa}"I need... counterpressure." She arches harder, pressing more of herself against your face. Her slim body trembles with the strain of supporting so much concentrated mass. {vessa}"More." Just the one word. Her vocabulary is leaving her.`,
    },
    bootylicious: {
        casual: (ctx) => `Vessa descends from the platform with her usual measured gait, but something is different. Each step has a follow-through it didn't have before, a weighty secondary motion concentrated entirely behind her. She stops and stands still, and the stillness takes an extra moment to reach her lower body, where the new mass settles into place with a warm, heavy finality.

She reaches one hand back and finds the dramatic curve that has reshaped her posterior. Her chest is negligible by comparison, a minor variable. {vessa}"The distribution is posterior-dominant." She presses her fingers into the dense, full curve and her expression flickers. **{vessa}"A cross-referenced body taxonomy used the term 'bootylicious' alongside more clinical language."** She initially dismissed the entry as frivolous. She takes another step and feels the heavy sway, the momentum of concentrated mass. {vessa}"The mass is... substantial. It alters my gait calculation significantly."`,
        intimate: (ctx) => `Vessa steps off the platform and goes still, but it's a different stillness than usual. She's recalibrating. The mass concentrated in her butt and hips is extraordinary, heavy enough to alter the way she stands, the way her spine curves, the way her thighs press together. Her chest is small, almost flat, a footnote beneath the dramatic emphasis below.

She touches her own small breasts first, clinically noting the minimal change. Then her hands move to her hips and the curve that begins there, sweeping backward and downward into a butt that is dense, round, and genuinely heavy. {vessa}"The anterior-posterior differential is extreme." Her voice is measured but her breathing has quickened. **{vessa}"The taxonomy would classify this as 'bootylicious,' a term I previously considered beneath serious use."** She shifts her weight and feels the heavy mass respond, a second behind, warm and pulling.

She turns away from you. Slowly. Deliberately. The full scope of the transformation is visible from behind: slim shoulders, negligible chest in profile, narrow waist, and then the dramatic flare of her hips into the extraordinary curve of her butt. She backs up until she's pressed against you, and the dense warmth of her butt settles against your body with shocking weight. She grinds back, a slow, rolling motion. {vessa}"Counterpressure." Her hands find yours and pull them to her hips, then guide them back and down. Your fingers sink into heat and density that seems to go on and on. ${ctx.hasPenis ? `Her cock is trapped between her body and yours, and the backward grind presses it firmly against her own stomach.` : `The slick heat between her thighs is unmistakable as she rocks back against you.`} {vessa}"There." Just that. She presses your hands deeper and lets her head fall back against your shoulder.`,
    },
    goddess: {
        intimate: (ctx) => `Vessa steps off the platform and does not move. Does not speak. For nearly a full minute she stands in the center of the workshop, eyes closed, processing. The transformation is total. Massive breasts strain against her clothing. Thick muscle cords her arms and shoulders and thighs. Her butt is a heavy, sculpted counterweight. Her waist, impossibly, still tapers between the enormous masses above and below. She is vast, powerful, and radiating heat like a furnace.

When she opens her eyes, they are glassy. Unfocused. She looks at her own hands and turns them over slowly. {vessa}"Every classification system I have encountered treats this as theoretical." Her voice is rough, stripped of its usual precision. {vessa}"Goddess morphology. All parameters at maximum expression simultaneously." She tries to take a breath and the expansion of her ribcage moves mountains. Massive breasts rise. Thick abs flex. Heavy hips shift. {vessa}"I can feel..." She stops. Starts again. {vessa}"I can feel everything. Every nerve ending in every square inch of..." She gestures vaguely at the entirety of herself. **The analytical framework is crumbling. There is too much body, too much sensation, too much input for her systems to categorize.**

She moves to the workbench and leans against its edge, and the wood groans under the sheer mass of her. Her thighs press against it and muscle and softness compress. She reaches for you, takes your hands, and places them on her body without preamble, one on her breast, one on her thigh. {vessa}"Empirical verification," she whispers, but the pretense of science is gone from her voice. She grinds slowly against the workbench edge. Her hands pull you closer, redirecting your grip, breast to abs to hip to butt, a frantic tour of a body that won't stop demanding attention. ${ctx.hasPenis ? `Her cock is enormous, rigid against her ruined dress, and she shudders when it drags against the workbench edge.` : `Her pussy is swollen and dripping, the arousal running visibly down her inner thighs.`}

{vessa}"I have no adequate terminology." Her eyes finally lock onto yours, and the violet is nearly swallowed by black. She pulls you bodily against her and you are engulfed in heat and mass and power, muscle and softness in layers you can't separate. {vessa}"More," she says. Then, quieter, just breath shaped into a word: {vessa}"Everything."`,
    },
    petite: {
        casual: (ctx) => `Vessa steps off the platform and pauses. She lifts one hand and examines it. The wrist is narrow, the tendons fine and visible, the fingers long and thin. She turns it over with the detachment of someone studying a specimen, but there is something else in her expression. Not displeasure. Curiosity at an unexpected variable.

{vessa}"Mass has decreased significantly across all measured parameters." She touches her chest, which is essentially flat, then her hip, which is narrow and sharp. {vessa}"Adipose tissue, lean mass, and skeletal frame have all contracted." She takes a step and the lightness of it surprises her visibly, a slight widening of the eyes. **{vessa}"A developmental biology text classified this morphology as 'petite.'"** Minimal mass, maximal nerve-density-to-surface-area ratio. She flexes her hand again, watching the delicate bones move. {vessa}"I feel... precise. Reduced to essentials."`,
        intimate: (ctx) => `Vessa steps off the platform with a step so light it makes no sound at all. She stands in the workshop like a brushstroke, narrow and fine and barely there. Her cloak hangs loose on diminished shoulders. Her chest is flat, her hips angular, her frame as delicate as a bird's skeleton. She can feel her own pulse in her wrists, her throat, behind her eyes, because there is so little mass to absorb it.

{vessa}"Minimum viable morphology." She examines her own wrist, turning it in the lamplight, watching the blue trace of a vein. {vessa}"A colleague's thesis on body archetypes categorized this as 'petite.' She described heightened proprioception as a function of reduced mass." Vessa presses two fingers to her own sternum and can feel each rib expand when she breathes. **{vessa}"I am aware of every bone. Every tendon. The air pressure on my skin."**

She approaches you and takes your hand. The size difference is stark. She places your broad hand over her narrow wrist, and your fingers wrap all the way around with room to spare. {vessa}"Observe the differential." Her voice is quiet, not clinical anymore but something rawer. She places your other hand flat against her chest, where a slight, warm softness barely registers against your palm. Her heartbeat is vivid underneath, rapid and close to the surface. {vessa}"Minimal tissue. Maximum conductivity." She steps closer, fitting her small frame against your body, and she is weightless there, barely an impression. But every point of contact is electric for her, blazing through the thin barrier of skin and bone. ${ctx.hasPenis ? `Her small cock is hard against your thigh, vivid and sensitive in her reduced frame.` : `The heat between her thighs is vivid and concentrated, every nerve close to the surface.`} {vessa}"Your body heat alone is..." She presses closer, a shiver running through her narrow shoulders. {vessa}"I have insufficient mass to thermoregulate against this stimulus." Her thin fingers grip your shirt. {vessa}"Do not step back."`,
    },
    statuesque: {
        casual: (ctx) => `Vessa steps off the platform and stands. Simply stands, with an unselfconscious uprightness that is somehow more commanding than any dramatic pose. The proportions are balanced, harmonious. Full breasts, lean muscle, a measured curve of hip and butt. Nothing excessive. Nothing deficient. Every ratio in quiet agreement with every other.

She runs one hand down her side, from ribs to hip, palm flat, measuring. {vessa}"There is a concept in classical anatomy called the 'statuesque ideal.' I encountered it in a treatise on proportional theory." She repeats the measurement on the other side and finds it identical. **{vessa}"The defining characteristic is not any single parameter but the relationship between all of them."** She lifts her chin slightly, testing the way her neck sits on her shoulders, the way her spine distributes the moderate loads. {vessa}"Every variable is within two standard deviations of the theoretical mean. The result is... equilibrium."`,
        intimate: (ctx) => `Vessa steps off the platform and is still, but it is a different stillness than her analytical default. It is the stillness of something perfectly balanced, a sculpture on its plinth, every force resolved. Her proportions are classical: full breasts that do not strain, lean muscle that does not bulge, a hip curve that flows rather than juts. Moderate in every dimension, exquisite in the harmony between them.

She runs both hands down her body slowly, from collarbone to hip, and the journey is smooth, uninterrupted, each transition flowing into the next without abruptness. {vessa}"A treatise on ideal morphology coined the term 'statuesque,'" she says quietly. {vessa}"The author posited that the deepest aesthetic response arises not from extremes but from perfected ratios." Her hands reach her hips and rest there. **Her breathing is slow and even because nothing in her body is fighting anything else. Every element supports every other, a closed system in equilibrium.**

She steps close to you and takes your chin in one hand, tilting your face up to meet her gaze. The contact is precise. Her violet eyes study your face from this close range with an intensity that borders on hunger. {vessa}"Touch me." Not a request. An instruction. Your hands find the smooth line of her waist, the measured swell of her hip, the firm curve of her butt. Everything flows. There are no surprises, no sudden excesses, just one continuous, harmonious surface. She guides your hands higher, to her breasts, which fill your grip without overflowing. Then to her arms, where lean muscle firms under pressure. ${ctx.hasPenis ? `Her cock is a steady warmth against your thigh, unhurried, part of the equilibrium.` : `The heat between her thighs is steady and certain, part of the equilibrium.`} {vessa}"Every nerve ending is reporting the same signal," she whispers. {vessa}"Balanced." She presses her body against yours, and the contact is even along every inch, no gaps, no pressure points, just warmth distributed perfectly. Her mouth is very close to yours. {vessa}"I hypothesized that equilibrium would feel peaceful." Her breath catches, the first break in her composure. {vessa}"I was incorrect. It feels like standing on the edge of something."`,
    },
};

// ==========================================
// BARRET (Tavern Owner) - Bold, flirty, direct
// Uses "love" for player. Most sexually forward NPC.
// High arousal: performance STOPS. Quiet, focused, predatory.
// ==========================================

ARCHETYPE_WORKSHOP_REACTIONS.barret = {
    hourglass: {
        casual: (ctx) => `The platform hums down to silence and Barret hasn't moved. Her hands are on her waist, fingers pressing into the dramatic inward curve, and she's looking down at herself with an expression you've never seen on her before. Not performing. Just... seeing.

{barret}"Well." She breathes out. Her palms slide down over the flare of her hips, then back up to the pinch of her waist, tracing the shape like she's memorizing it. {barret}"Well, well, well." She turns slowly on the platform, one full rotation, and the motion sets everything in staggered motion... chest, waist, hips, each following the last in a slow wave. {barret}"My gran used to tell me about women shaped like this, love. Said they could stop a cart in the road just by crossing it." She steps off the platform and her new center of gravity settles with each step, hips swaying in a way that is half physics and half pure Barret. **She plants her hands on her waist and grins at you like she just won the whole damn tavern in a card game.** {barret}"I think gran undersold it."`,

        intimate: (ctx) => `The platform goes quiet. Barret stands on it without moving, her hands at her waist, and the silence stretches long enough that you almost say something. Then she looks up at you and the performance isn't there. None of it. No "love." No grin. Just brown eyes, very steady, very warm, and a body that has finished becoming what it was always trying to be.

She steps off the platform and takes your hands without a word. Places them on her waist, at the narrowest point, where the bone and muscle pull inward tight. Then she slides them outward. Slowly. Along the flare of her hips, the generous swell of them, the warmth of the new fullness under your palms. She watches your face the entire time.

{barret}"There." Her voice is low, unhurried. {barret}"You feel that. The difference." She presses your hands harder against her hips, then draws them upward to where her chest has settled heavy and full, the weight of it shifting as she breathes. **Every inch of the path she traces is a declaration, and she doesn't rush a single one.** ${ctx.hasPenis ? `Her cock is tenting her skirt, the outline unmistakable, and she does not look away from your face.` : `The heat between her thighs has soaked through her skirt, and she does not look away from your face.`}

{barret}"Here." She pulls you closer, closing the last distance, your hands still on her. {barret}"Now."`,
    },

    amazon: {
        casual: (ctx) => `The device powers down and Barret rolls her shoulders, and the sound that comes from her is not a ladylike sound. It's the sound of someone settling into a body that finally has the horsepower to match the personality.

{barret}"Oh, love." She flexes one arm, then the other, watching the muscle bunch and define under her skin. {barret}"Oh, that is proper." She grips the edge of the platform with one hand and lifts herself off it entirely, a clean press-up that leaves her feet dangling, and she holds it for three full seconds with a look of absolute delight. She drops back down and the platform rattles. {barret}"I used to need Perrin to move the ale barrels. Did I tell you that? Perrin. A boy who can't carry a tray without knocking over a candle."

**She lands on the workshop floor and it feels different, heavier, more deliberate.** She squares up in front of you, broader than she was, denser, the moderate curve of her chest framed by shoulders that could block a doorway. {barret}"I feel like I could arm-wrestle a horse, love. Don't tell me I can't arm-wrestle a horse."`,

        intimate: (ctx) => `The device clicks off and Barret doesn't flex, doesn't grin, doesn't perform. She stands on the platform and looks at her own hands, opening and closing them, testing the new density of the grip. Then she looks at you.

She steps off the platform and crosses the workshop floor and pins you against the wall before you can take a breath. Not hard. Not rough. Just... there. Her forearm beside your head, her body close, the heat of the new muscle radiating through her clothes. ${ctx.hasPenis ? `Her cock is stiff against your thigh, the fabric tented.` : `The slick heat between her thighs presses against you.`}

{barret}"Feel this." She takes your hand and puts it on her bicep and flexes, and the muscle that rises under your palm is real, solid, unapologetic. Then she moves your hand to her thigh. Same thing. Dense. Powerful. Warm. **She watches your face the whole time with an expression that has nothing playful in it, only hunger.**

{barret}"I could hold you here all night." She leans closer. Her breath is warm against your ear. {barret}"I want to find out."`,
    },

    bombshell: {
        casual: (ctx) => `The platform finishes its cycle and Barret looks down and her eyebrows go up. Then they go up further.

{barret}"Right." She cups both hands under her chest and lifts, testing the new weight, and a slow, incredulous laugh escapes her. {barret}"Right, that's... that is significant, love. That is very significant." Her slim frame hasn't changed much, which makes the contrast extraordinary... narrow waist, modest hips, and then this dramatic, impossible fullness pulling at the front of her blouse. She adjusts her bodice and gives up immediately. {barret}"This bodice is now decorative at best."

She steps off the platform and the bounce of each step is visible and she does not even slightly attempt to minimize it. {barret}"Della's going to swallow her tongue." The grin is enormous. **She stands in front of you with both hands on her hips and her chest occupying a frankly unreasonable amount of the space between you.** {barret}"I'm going to need new blouses, love. Plural. And I'm going to enjoy every fitting."`,

        intimate: (ctx) => `The platform goes still. Barret's hands are already on her chest, cupping the new weight, and her eyes are closed. She's not performing. She's feeling it. The heft. The pull. The way her nipples have gone tight and sensitive against her palms.

She opens her eyes and looks at you and there's no joke coming. Her fingers curl into the fabric of her blouse, knuckles white. {barret}"Come here."

You go. She takes your face in both hands and pulls it down and presses it against the warm, overflowing swell of her cleavage. Not roughly. Deliberately. She holds you there, one hand on the back of your head, and her heartbeat is right against your cheek, fast and hard. **The heat of her skin is extraordinary, flushed and sensitive, and the shudder that goes through her when you exhale against it tells you everything.**

${ctx.hasPenis ? `Her cock is rigid under her skirt, pressing against your stomach.` : `The slick heat between her thighs is soaking through her skirt.`} {barret}"Don't move." Her fingers tighten in your hair. {barret}"Stay right there."`,
    },

    bootylicious: {
        casual: (ctx) => `Barret steps off the platform and immediately turns to look at herself over her shoulder, craning her neck with the focus of a woman inspecting a very important delivery.

{barret}"Love." She says it flatly, like a verdict. Then she reaches back with both hands and grabs, and her fingers sink into the new, generous fullness, and the flat tone breaks into a bark of laughter. {barret}"LOVE." She squeezes, watches it give and bounce back, squeezes again. {barret}"That is a butt. That is a proper, structural, load-bearing butt."

She walks a few steps across the workshop, testing the swing and bounce of it, then walks back. The motion is dramatic. She is not attempting to contain it. **She turns back to you with cheeks flushed pink and brown eyes shining and the smile of a woman who has just discovered a new favorite thing about herself.** {barret}"I'm going to walk very slowly back to the tavern tonight, love. Very slowly. Past every table. And I'm not going to explain a thing."`,

        intimate: (ctx) => `The device winds down and Barret turns her back to you while she's still on the platform. She reaches back. Grabs. Feels the shape of what's there now, the heavy, round fullness of it overflowing her hands. She squeezes, and her breath catches, and she doesn't laugh.

She steps off the platform and walks to the nearest workbench. Bends over it, slowly, forearms flat on the surface. Looks over her shoulder at you with an expression that has absolutely no humor in it. **Pure, focused, predatory patience.**

${ctx.hasPenis ? `Her cock hangs heavy between her thighs, thickening as she watches you.` : `Her thighs are pressed together, the flush spreading down her neck, the arousal obvious.`} She shifts her weight, just slightly, and the motion makes the new fullness of her butt rise and settle. {barret}"Well?" Her voice is low and very even. {barret}"I'm waiting."

She doesn't say anything else. She doesn't need to.`,
    },

    goddess: {
        intimate: (ctx) => `Every crystal in the workshop ignites at once. The air hums with a frequency you can feel in your teeth, and on the platform Barret's body is doing something that has no precedent.

It happens everywhere simultaneously. Her chest surges massive and heavy, splitting the laces of her bodice. Her arms thicken with dense muscle, shoulders broadening, thighs swelling with power. Her butt destroys the back of her skirt, the fabric giving up in a long tearing sound. ${ctx.hasPenis ? `Her cock is enormous and rigid, jutting from the ruins of her clothing.` : `Between her powerful thighs her pussy is engorged and dripping, the slick already running down the inside of her legs.`}

The crystals dim. Barret stands in the ruins of her clothing, trembling. Not performing. Not grinning. Not saying "love." Just standing there, enormous, every dimension maximized, chest heaving with each shuddering breath.

{barret}"Sit down." Two words. She points at the workshop chair. You sit. She steps off the platform and each footfall is heavy, deliberate, the floor protesting under the weight of what she's become. She crosses to you and straddles the chair, one powerful thigh on each side of you, and the heat of her body is like standing next to a forge.

**She takes your face in both hands. Her grip is immovable.** Her brown eyes are very close and very dark and the woman who performs confidence for a living has stopped performing entirely because she no longer needs to. The confidence is structural now. It is load-bearing.

{barret}"Don't speak." Her massive chest presses against you, her nipples hard and sensitive through the remnants of her blouse. She rolls her hips once, slowly, grinding down, and the sound she makes is low and broken and nothing like laughter. {barret}"Don't speak. Just... stay." Her forehead drops to yours. Her breath comes in short, hot bursts. She rolls her hips again and her whole body shudders.

{barret}"I didn't know." Her voice cracks. {barret}"I didn't know it could feel like this."`,
    },

    petite: {
        casual: (ctx) => `The platform finishes and Barret looks at the distance to the workshop floor and it's... different. She hops down and lands light, lighter than she's ever landed, and looks at her hands and then down at the rest of herself with an expression of genuine curiosity.

{barret}"Huh." She turns her hands over, studying the fine bones of her wrists. Her blouse hangs loose, her bodice gaping where there isn't enough of her to fill it anymore. She takes a few experimental steps and each one is quick and neat and barely sounds against the floor. {barret}"I'm quick, love. Feel how quick I am." She darts to the workbench and back, swift and light, and grins. {barret}"I could steal things. I won't, but I could."

**She looks up at you, and the looking-up part is new, and she finds it hilarious.** {barret}"Don't you start with the short jokes. I can see them forming." She puts her hands on her hips, which are narrow and neat, and draws herself up to her full diminished height. {barret}"I am exactly the right size. The world is simply too large."`,

        intimate: (ctx) => `The platform goes quiet. Barret stands on it, smaller, lighter, the blouse pooling around her shoulders, and she looks up at you from a new angle and something in her face goes very still.

She reaches up and takes your collar. Pulls you down. Not with force, because she doesn't have the force she used to, but with certainty. She pulls you down to her level and wraps her legs around your waist and locks her ankles and she is light, startlingly light, the whole compact warmth of her suspended from your frame.

{barret}"Hold me." Not a request. An instruction. **Her voice is quiet and close and stripped of every performance she's ever given.** ${ctx.hasPenis ? `Her small cock is hard and insistent against your stomach.` : `The wet heat between her thighs presses against your stomach.`}

{barret}"Don't put me down." Her arms tighten around your neck. Her face is very close to yours. {barret}"Not yet."`,
    },

    statuesque: {
        casual: (ctx) => `Barret steps off the platform and straightens up, and straightens up, and keeps straightening up. She stands at her full new height and looks around the workshop from an angle she hasn't seen before and there is a slow, satisfied light coming into her face.

{barret}"Oh, I like this." She walks to the workshop mirror and studies herself, turning to one side, then the other. Everything is proportioned... chest balanced, hips balanced, muscle balanced, long clean lines from shoulder to hip to thigh. {barret}"This is what you see in those old paintings at the town hall, love. The ones where the women look like they were carved." She runs her hands down her sides, following the even taper of her waist, the classical flare of her hips. {barret}"Someone told me once that 'statuesque' was just a polite word for tall. They were wrong."

**She catches her own eye in the mirror and holds it, and the smile that comes is quieter than her usual grin.** {barret}"Gran would have liked this one. She always said I carried myself well. Imagine if she could see me carrying all of this."`,

        intimate: (ctx) => `The platform goes silent. Barret stands tall on it, taller than before, and looks down at you from the new height. She doesn't smile. She doesn't speak. She just looks, with brown eyes that are warm and steady and have made some kind of decision.

She steps off the platform and stands in front of you. Takes your chin in one hand. Tilts your face up to hers. Studies you from above with an expression that is neither performance nor predation. Something between them. Something that has found its vantage point and is content with it.

{barret}"Look up at me." **Her thumb traces your jawline, slow and deliberate, and the gentleness of it is more devastating than any grip.** ${ctx.hasPenis ? `Her cock is firm against her skirt, unhurried.` : `The warmth between her thighs is steady, unhurried.`}

{barret}"I've spent my whole life looking up at people. Behind the bar, behind the counter, across the room." Her other hand finds your waist and draws you closer. {barret}"This is better." She leans down, her lips near your ear, her voice low and certain. {barret}"This is so much better."`,
    },
};

// ==========================================
// DELLA (Baker) - Motherly, warm, secretly adventurous
// Uses "dear" for player. Warm, practical framing.
// High arousal: dam breaks. Crude words erupt, she can't stop.
// ==========================================

ARCHETYPE_WORKSHOP_REACTIONS.della = {
    hourglass: {
        casual: (ctx) => `The device settles into silence and Della stands on the platform with both hands pressed flat against her stomach, feeling the pull inward, the dramatic narrowing between the fullness above and below. She exhales slowly, like she's afraid moving too fast will undo it.

{della}"Oh, dear." Her hands travel upward to where her chest has rounded full and heavy, then back down to her waist, then out to her hips. She traces the shape twice, three times, like she's reading something written in her own skin. {della}"My mother had a painting above the fireplace. A woman pouring water from a jug. I used to stare at it and wonder how anyone could actually be shaped like that."

She steps off the platform carefully, one hand on the railing, and the weight of her shifts and settles with each step. The pull of her chest, the sway of her hips, all of it balancing on that impossibly narrow middle. **She catches her reflection in the polished surface of a device housing and stops dead.** {della}"I look like the painting. I look exactly like the painting." Her hand goes to her mouth and her eyes are bright and full. {della}"Oh my. Oh, that's... that's really something."`,

        intimate: (ctx) => `The device goes quiet. Della hasn't moved. Her hands are on her waist, pressing in, feeling how narrow it's become, and her breathing has gone shallow and quick in a way that has nothing to do with the transformation itself.

{della}"I need a moment," she says, and doesn't take one. Her hands slide up to her chest, cupping the new weight through her dress, and the sound she makes is not the sound of a composed woman. It's short and sharp and she clamps her mouth shut around it. Her thighs press together.

She steps off the platform and comes to you and she takes your arms and wraps them around her from behind, your hands against her stomach, and then she presses your palms outward. Over her hips. Along the flare of them, the warm generous curve, and then she moves your hands upward to where her waist pulls tight, and then up further to the heavy swell of her chest. **She is mapping herself with your hands and she is trembling.**

${ctx.hasPenis ? `Her cock is rigid against her thigh, straining visibly.` : `The heat between her thighs has soaked through her dress.`} {della}"I can feel everything," she whispers. {della}"Every single place where I'm... where it's all..." She presses your hands harder against her breasts and her head falls back against your shoulder. {della}"Oh god. Oh, my tits are so... I can't believe I'm saying this in your workshop." She doesn't pull away. She pulls you tighter. {della}"Don't let go. Please don't let go."`,
    },

    amazon: {
        casual: (ctx) => `The device winds down and Della grips the platform railing to step off and the railing bends. She stares at it. Then she stares at her hand. Then she very carefully lets go.

{della}"Oh my." She flexes her fingers experimentally, watching the tendons move under skin that's tighter than it was, wrapped around muscle that wasn't there an hour ago. She reaches for the workbench and picks up a heavy iron clamp and holds it at arm's length without effort. {della}"That's... goodness. That used to be a two-handed sort of thing."

She sets the clamp down gently, almost apologetically, and looks at herself. Her shoulders have broadened, her arms thickened, her thighs filled with quiet power beneath her skirt. The moderate curve of her chest sits differently now, framed by the new breadth of her. **She stands straighter without thinking about it, as if the muscle has given her spine a better argument.** {della}"My mother used to talk about the women in the old stories. The ones who could plow a field before breakfast and still bake a decent loaf." She dusts flour from her hands, a habit, though there's no flour here. {della}"I think I understand what she meant now."`,

        intimate: (ctx) => `The device goes silent and Della stands on the platform, rolling her shoulders, feeling the new density shift and settle. She looks at her own arm. Squeezes the bicep. Her eyes go wide.

She steps off the platform and grabs your hand before you can speak. Presses it against her upper arm. {della}"Feel that." Her voice is different, lower, the motherly warmth still there but with something raw beneath it. She flexes and the muscle rises hard under your palm. Then she moves your hand to her thigh, the outside of it, where the muscle is dense and warm through the fabric. {della}"And that."

**The practical framing lasts about three more seconds.** {della}"I keep thinking about..." She stops. Swallows. {della}"This is going to sound terrible." A breath. {della}"I keep thinking about being on top of someone and them not being able to move me. Just... pinning them there with these thighs and..." Her hand flies to her mouth. Her cheeks are scarlet. {della}"Oh god. Oh, fuck. I said that out loud."

${ctx.hasPenis ? `Her cock is hard and obvious, tenting her skirt.` : `She presses her thighs together, her arousal slick and hungry.`} She's staring at you over her fingers, mortified and aroused in equal measure. {della}"I'm a baker. I'm a respectable baker. Why am I saying these things?" She doesn't back away. {della}"Why can't I stop?"`,
    },

    bombshell: {
        casual: (ctx) => `Della steps off the platform and immediately reaches for her apron straps because something has shifted the geometry of the whole arrangement. She adjusts once, twice, gives up. The apron is a lost cause. Underneath it, the front of her dress is pulled taut by a chest that has exceeded every reasonable expectation.

{della}"Well." She looks down. Looks down further. {della}"That is... that's very generous." She cups her hands under her breasts through the fabric, testing the weight, and a small, startled laugh escapes her. {della}"I keep thinking of things overheard at the bakery. Marla was saying just last week that her cousin in the capital could stop traffic. I thought she was exaggerating."

She turns sideways, studying herself in the nearest reflective surface, slim frame, modest hips, and then this extraordinary fullness demanding attention. **She smooths her dress over the shape and her expression cycles from wonder to gentle pride to something very close to delight.** {della}"My dear, I think traffic might be in some danger."`,

        intimate: (ctx) => `The device finishes and Della is very still on the platform, both hands already pressed against her chest, feeling the weight, the new impossible fullness of it straining against her dress. Her breathing is uneven.

{della}"I was going to be calm about this," she says. Her voice is not calm. She steps off the platform and stands in front of you and fans herself with one hand while the other stays pressed against the swell of her chest. {della}"I am a mature, sensible woman and I was going to be very calm."

She isn't calm. Her free hand goes to her neckline and tugs it down, not far, just enough that the tops of her breasts push up over the edge of the fabric, flushed and warm. She stares down at them and then at you and **the dam breaks across her face like sunrise**. {della}"My tits are enormous." She says it like a confession, like she's been holding the words in her mouth for an hour. {della}"They're enormous and they're sensitive and every time I breathe I can feel them move and I'm so wet right now I could... oh god." She covers her face with both hands. ${ctx.hasPenis ? `Her cock pushes visibly against her dress, the fabric tented.` : `Her arousal is soaking through her smallclothes.`}

{della}"I'm pulling my neckline down in your workshop. I'm a grandmother's age and I'm pulling my neckline down." She peeks at you between her fingers. {della}"...is it working?"`,
    },

    bootylicious: {
        casual: (ctx) => `Della turns around on the platform before stepping off, looking over her shoulder, and her hand goes to her mouth. The other hand reaches back and finds what's there and she makes a small, startled noise.

{della}"Oh my." She steps off the platform carefully, very aware of the new weight behind her, the way it shifts and bounces with each step. Her skirt is pulled tight across the back and she tugs at the hem uselessly. {della}"I'm going to need to let out every seam I own. Every single one."

She takes a few steps across the workshop floor, feeling the sway, the heaviness, the way her balance has redistributed itself backward. Her relatively modest chest makes the contrast dramatic, a pear-shaped silhouette that she traces with her hands, hips to waist to shoulders. **She looks like a woman discovering a room she's lived in has a door she never noticed.** {della}"A customer told me last week that I should put a bell on the kitchen door so people know when I'm coming. I asked why." She pauses, cheeks pink. {della}"She said it was the going that needed the warning."`,

        intimate: (ctx) => `The device powers down and Della reaches back with both hands and grabs and a sound comes out of her that is entirely involuntary. Low, raw, shocked. She squeezes the new fullness and her knees go soft.

She steps off the platform and walks to the workbench on unsteady legs. She sits on the edge of it, then shifts her weight, feeling how much of her there is pressing against the surface. She squeezes her own butt again, fingers sinking deep into the warm flesh, and her eyes flutter shut.

{della}"Oh, that's..." She opens her eyes. They're dark. {della}"Every time I sit down I can feel it. All of it. The weight, the... the spread of it." She takes your hand and pulls it to her hip, then slides it back. Over the dramatic curve. Into the generous, giving softness. **She presses your hand in deep and the sound she makes is not a sound that belongs in a bakery or a workshop or anywhere that isn't a locked bedroom.**

${ctx.hasPenis ? `Her cock is straining against the front of her skirt, the tip damp.` : `She's soaking through her dress, her arousal swollen and aching.`} {della}"I have a magnificent ass," she says, and her eyes go wide at her own words. {della}"I have a magnificent ass and I want you to grab it with both hands and I cannot believe this is coming out of my mouth." She doesn't let go of your hand. She pushes it harder against her. {della}"Don't stop. Oh god, don't stop."`,
    },

    goddess: {
        intimate: (ctx) => `The workshop blazes white. Every crystal, every device, every polished surface catches the light and throws it back, and at the center of it Della's body is becoming something that has no practical application whatsoever.

Her chest surges first, breasts swelling massive and heavy, the front of her dress splitting at the seams. Then her arms thicken, her shoulders broaden, muscle layering dense and powerful over her gentle frame. Her butt swells enormously, tearing through the back of her skirt. Her thighs fill with raw strength. ${ctx.hasPenis ? `Her cock is enormous, rigid, tenting the ruins of her dress.` : `Between her thighs her pussy is engorged and dripping, slick running freely down her inner thighs.`}

The light fades. Della stands in the ruins of her dress, shaking. Flour dust still clings to her forearms, somehow, the last absurd trace of the bakery in a body that has left the bakery very far behind.

{della}"Oh." Her voice is small. She looks at her hands, the thick powerful forearms, the broad shoulders. She cups one enormous breast and the sensation hits her so hard she grips the platform railing and it bends under her fingers. {della}"Oh god. Oh... oh, fuck." The word tears out of her like something escaping. {della}"Fuck. Everything is... I can feel everything, every nerve, my whole body is..."

She steps off the platform and grips the edge of the workbench and it groans under her hands. **She is trying to hold still and failing, her hips rolling involuntarily, grinding against the bench edge.** She pulls you close with one powerful arm, effortlessly, your body pressed against the furnace-heat of hers.

{della}"I need..." She can't finish. Her enormous chest heaves against you, nipples hard and aching. She buries her face against your neck and her voice comes out broken, wrecked, nothing like a baker's voice. {della}"I need you to touch me everywhere. I need... oh god, I can't think. I can't think about anything except..."

**She gives up on words.** She grips your hips and pulls you hard against her and the noise she makes into your shoulder is raw and crude and shocks her even as she's making it. {della}"Don't be gentle." Her teeth graze your neck. {della}"Please. For once in my life. Don't be gentle."`,
    },

    petite: {
        casual: (ctx) => `The platform goes quiet and Della looks at her hands. They're the same hands, but the wrists are finer, the fingers more delicate, and when she looks up at you the whole frame of her has drawn inward into something light and compact and surprisingly elegant.

{della}"Oh." She steps off the platform and the step is barely a sound, just a whisper of shoe on stone. She looks down at herself, the flat chest, the slim hips, the way her dress hangs loose around a body that takes up less room than it used to. {della}"I feel like a sparrow." She says it wonderingly, turning her hands over. {della}"My mother used to call me her little sparrow when I was small. I haven't been small in thirty years."

She takes a few steps and there's a lightness to the movement, a quickness, an efficiency that makes her look like she could dart between the market stalls without brushing a single display. **She hugs herself and the hug fits differently, her arms crossing easily, everything close and contained.** {della}"It's strange. I should feel like something's missing." She looks at you with warm, wondering eyes. {della}"But I feel like I found something instead. Does that make sense, dear? I feel... tidy."`,

        intimate: (ctx) => `The device goes silent and Della steps off the platform and she is so light, so small, that the step barely registers. She stands in front of you and looks up, and the looking up is new, the angle of it, the way your shoulders block the workshop light.

{della}"You're very..." She pauses. Swallows. {della}"You're very large from down here." She says it the way she says everything, warmly, practically, except her cheeks are flushing and her hands are fidgeting with the loose fabric of her dress. {della}"I keep thinking about fitting. How I'd fit. Against you. In your arms." She covers her mouth. {della}"That's... I shouldn't be thinking about that."

She curls into you before she finishes the sentence, her face pressing against your chest, arms wrapping around your middle, and she is so light you could lift her without thinking. **The smallness of her against you does something to both of you that neither of you expected.** ${ctx.hasPenis ? `Her small cock is hard against your thigh, insistent.` : `The warm heat between her thighs presses against your leg, quiet and desperate.`}

{della}"Pick me up." She whispers it into your shirt. {della}"I want... oh god, I want you to pick me up and I want to wrap my legs around you and I want..." She makes a frustrated sound. {della}"I'm a grown woman. I make bread. Why do I want to be carried like a..." She trails off and holds you tighter. {della}"Just do it. Before I lose my nerve."`,
    },

    statuesque: {
        casual: (ctx) => `Della steps off the platform and reaches for the shelf by habit, for something to straighten or adjust, and realizes she can reach the top shelf without stretching. She pauses with her hand up there, blinking.

{della}"Well, that's new." She brings her hand back down slowly and stands straight, and the straightness of it is something... long lines, balanced proportions, chest and hips in classical harmony, everything composed. She runs her hands down her own sides, from ribs to hips, feeling the even taper, the smooth sculpture of it. {della}"My mother had a book with drawings of the old statues. The ones from the capital museum. Women standing in gardens with one hand on a column."

She walks a few steps and the walk is different, longer stride, easier balance, the kind of movement that draws the eye without trying. **She stops in the center of the workshop and the light catches her evenly and she looks, for a moment, exactly like something carved from warm stone.** {della}"I never understood why they always looked so calm," she says quietly. She looks at you. {della}"I think I understand now. When everything's in the right place, there's nothing to fuss about."`,

        intimate: (ctx) => `The device finishes and Della stands on the platform and runs her hands down her own sides slowly. From the curve of her chest, down the taper of her waist, over the balanced flare of her hips. She traces the path like she's learning a new recipe by feel. Then she does it again. And a third time.

She steps off the platform and comes to you, and the walk is unhurried, each step placed with a certainty that is new and very becoming. She takes your hand and puts it at her collarbone. Then she draws it downward. Over the swell of her chest. Along the taper of her ribs. Into the curve of her waist. Out over her hip. **She traces the same path she traced on herself, but with your hand, and her eyes never leave your face.**

{della}"Do you feel that?" Her voice is steady, which is unusual for Della in this state, and the steadiness itself is arousing. {della}"Everything... fits. It all goes together. Like a recipe where every measurement is exactly right." ${ctx.hasPenis ? `Her cock is firm against her thigh, the arousal steady and undeniable.` : `The warmth between her thighs is slow and building, steady heat.`}

{della}"I want you to keep touching me like that." She moves your hand back to her collarbone. Start again. {della}"Slowly. The whole path. I want to feel someone else's hands confirming what mine already know." Her breath catches when your palm passes over her breast. {della}"Oh. Yes. Just like... yes." She closes her eyes. {della}"Take your time, dear. We have all afternoon."`,
    },
};

// ==========================================
// ALDRIC (Blacksmith) - Stern, practical, paternal, few words
// Male NPC feminized by transformation. She/her pronouns.
// Speaks bluntly. Short sentences. Practical framing.
// When aroused: same directness but raw. No softening, no apology.
// Tests body like equipment. Compares to metalwork. Grips things.
// Dark brown short hair, brown eyes, calloused hands, leather apron.
// ==========================================

ARCHETYPE_WORKSHOP_REACTIONS.aldric = {
    hourglass: {
        casual: (ctx) => `The device powers down. Aldric steps off the platform, walks three paces, stops. She puts both hands on her waist and presses inward, feeling the narrow channel between the fullness of her chest and the sweep of her hips. She presses harder, like she's checking the join on a weld.

{aldric}"Tight here." She moves her hands outward, tracing the flare. {aldric}"Wide here." Back to the waist. {aldric}"Good ratio."

She picks up a hammer from the workbench. Turns it over in her grip, testing range of motion, the way the new shape shifts when she reaches. Sets it down. **Nods once.** The nod is Aldric's version of a standing ovation. {aldric}"Balanced," she says. {aldric}"Like a well-forged blade. Weight where it should be, nothing wasted." She runs one calloused hand along the curve from her ribs to her hip and grunts in approval. {aldric}"Hourglass. That's what this is called." She squares her shoulders. {aldric}"Good construction."`,

        intimate: (ctx) => `The device goes quiet and Aldric is already moving, stepping off the platform with purpose, both hands pressing into the narrow pinch of her waist. She squeezes. Releases. Squeezes again. Her calloused fingers trace outward over the dramatic swell of her hips, then upward to where her chest has filled heavy and round above that impossible waistline.

{aldric}"Every time I breathe," she says, voice low, {aldric}"everything moves." She inhales deliberately. Watches her own chest rise, her hips shift. Her jaw tightens. {aldric}"All of it. Connected through here." She presses her palm flat against the narrow center of herself.

She grabs the edge of the workbench with one hand. Her knuckles go white. **The steadiness in her voice is costing her something.** {aldric}"Come here."

You step closer. She takes your hand, no hesitation, and presses it flat against her waist. Then she drags it down, over the flare of her hip, and her breath catches. She moves your hand up, over the swell of her chest, and the sound she makes is short and bitten off. ${ctx.hasPenis ? `Her cock is rigid against her thigh, straining the front of her trousers, and she shifts her hips once and her grip on the bench tightens.` : `Between her thighs the heat is sudden and insistent, soaking through, and she presses her legs together hard.`}

{aldric}"Whole body's like a tuning fork," she manages. Her eyes are dark and focused entirely on you. {aldric}"Touch the waist and I feel it everywhere." She pulls you closer by the wrist. {aldric}"Don't stop."`,
    },

    amazon: {
        casual: (ctx) => `Aldric steps off the platform and goes straight to the workbench. She picks up a length of iron bar stock, the heavy kind that needs tongs. Lifts it one-handed. Turns it over. Sets it down. Picks up the next one. Same thing.

{aldric}"Good." She flexes both arms slowly, watching the muscle cord and bunch, the dense power rolling under tanned skin. She makes a fist and the forearm tightens into something that could crack stone. She opens the fist. Makes it again. **Her expression doesn't change, but her stance widens.** She's settling into this body the way she'd settle into a new pair of boots, testing the fit.

{aldric}"Should have been built like this the first time." She rolls her shoulders and the breadth of them fills the space differently. She reaches overhead, grips a rafter, and pulls herself up halfway just to feel the power of it. Drops back down. Nods. {aldric}"Amazon." The word comes out like approval of a finished commission. {aldric}"That'll do."`,

        intimate: (ctx) => `The device finishes and Aldric doesn't pause. She walks straight to the heavy anvil in the corner, the one that takes two people to shift, grips it by the horn and the heel, and lifts. The thing comes off the floor. Not far. Two inches. But the muscles in her arms, her shoulders, her thighs all fire at once, and she holds it there for a count of three before setting it back down.

She looks at her hands. Opens and closes them. Looks at you.

{aldric}"Stronger than I've ever been." Her voice is rough. Not from effort. **Something behind her eyes has caught fire.** She crosses the workshop in three strides and her hand closes around the back of your neck, firm, not gentle. The grip is enormous, calloused, certain.

{aldric}"I want to feel what this does." She pulls you against her and the wall of muscle is furnace-hot. Her chest presses flat and hard against you. Her thighs bracket yours and the power in them is terrifying and she knows it. ${ctx.hasPenis ? `Her cock is hard against your hip, thick and insistent, and she rolls her hips once with deliberate, devastating control.` : `She is wet, the heat between those powerful thighs unmistakable where she presses against you, and the slow grind of her hips is controlled and relentless.`}

{aldric}"Not going to be gentle about it." Her thumb traces the tendon in your neck. {aldric}"Fair warning."`,
    },

    bombshell: {
        casual: (ctx) => `Aldric steps off the platform and stands still. She looks down at herself. The chest is enormous on her lean frame, heavy and full, pulling the laces of her work shirt apart. She reaches up and cups one hand under the weight experimentally, like she's hefting a piece of bar stock.

{aldric}"Heavy." She bounces her hand once. {aldric}"Heavier than they look."

She lets go and reaches for her hammer. Lifts it, swings it in a short test arc. The momentum does something to the new weight on her chest and she stops mid-swing and grunts. Adjusts her grip. Adjusts her stance. Tries again. **The second swing is clean, compensated, perfect.** That fast. {aldric}"Bombshell," she says. The word sounds clinical coming from her, like a material specification. She sets the hammer down and looks at her reflection in a polished breastplate. {aldric}"Not what I'd have ordered." A pause. {aldric}"Not sending it back, either."`,

        intimate: (ctx) => `The device winds down and Aldric hasn't moved from the platform. She's looking down at herself with both hands at her sides, fingers opening and closing, and her breathing is doing something she clearly did not authorize. Every inhale lifts the enormous weight of her chest, strains the already-failing laces of her work shirt, and she watches it happen with an expression of focused intensity.

{aldric}"Can't stop looking at them." She says it flat. Factual. She steps off the platform and the motion makes everything shift and bounce and her jaw goes tight. {aldric}"Every step. Feel them move."

She grabs the workbench edge with both hands. Leans forward. The position makes her chest hang heavy, pulling the ruined shirt open, and she stares down at herself and her knuckles creak against the wood. **Her arms are trembling and it has nothing to do with strain.**

{aldric}"Get over here." She doesn't look up. Her voice has dropped to something low and sandpaper-rough. ${ctx.hasPenis ? `Her cock is rock hard, tenting her trousers, and when you step close she presses her hips against yours without preamble.` : `The heat between her thighs has soaked through her trousers, her arousal sudden and overwhelming, and when you step close she grinds against your hip.`}

She finally looks up at you. Her eyes are dark. {aldric}"Put your hands on them." Not a request. {aldric}"Now." Her grip on the bench tightens. {aldric}"I need to know what they feel like when someone else is holding them."`,
    },

    bootylicious: {
        casual: (ctx) => `Aldric takes two steps off the platform and stops. She shifts her weight from one foot to the other. Does it again. Something is different about the way momentum works now, a heavy pendulum swing behind her that wasn't there before.

She reaches back with one hand. Finds what's there. Her eyebrows go up, which is about as surprised as Aldric ever looks.

{aldric}"Huh." She squeezes once, testing density the way she'd test a piece of leather for quality. Takes another step, feels the bounce and shift. She walks to the workbench and back, each stride making the new weight roll and settle. **She checks her balance on the third pass and nods.** {aldric}"Center of gravity's lower. About four inches back." She means it as a practical observation. She picks up her hammer, swings it, compensates for the shift without being told. {aldric}"Bootylicious." She says the word like she's reading it off a requisition form. {aldric}"Whoever named these things wasn't a smith."`,

        intimate: (ctx) => `The device powers down and Aldric walks to the workbench. She leans forward, both hands flat on the surface, and rolls her hips backward once. Testing. The mass behind her shifts and settles and she goes very still.

{aldric}"That's..." She stops. Swallows. Rolls her hips again, slower, feeling the weight pull and swing. Her fingers dig into the workbench surface. She does it a third time and a sound escapes through her teeth, short and sharp, like steam from a quench tank.

She stays bent over the bench. Doesn't turn around. Her voice comes out low, controlled, each word costing her. {aldric}"Every time I move my hips I can feel all of it. The weight. The pull." **Her shoulders tense, corded muscle standing out.** {aldric}"It's... a lot."

${ctx.hasPenis ? `Her cock is straining against the workbench, hard and trapped, and the pressure of the wood against it makes her hiss through her teeth.` : `She presses her thighs together and the slick heat between them is obvious, her arousal building with every shift of that impossible weight.`}

She turns her head just enough to look at you over her shoulder. Her brown eyes are burning. {aldric}"Get over here. Both hands. Grab hard." She turns back to the bench and grips the edge. {aldric}"I can take it."`,
    },

    goddess: {
        intimate: (ctx) => `Something in the workshop cracks. Not the device. The device finished a moment ago. It's the platform, groaning under the weight of what Aldric has become.

She steps off and the floor feels it. Everything about her is more. The chest is enormous, straining, heavy enough to change her posture. The muscle is layered dense through her arms and shoulders and thighs, every fiber visible under taut skin. Her butt has swelled massive and round, pulling the seams of her trousers apart. She stands in the middle of the workshop floor, breathing hard, fists clenched at her sides, and she looks like something a god would forge if a god worked iron.

{aldric}"Don't..." She stops. Tries again. Her voice is rough, fractured. {aldric}"Don't talk. Just... give me a minute."

She picks up the heavy hammer from the bench. Her hand is shaking. She grips the handle hard enough that the wood creaks and then sets it back down because she does not trust what her body will do right now. **Every muscle in her is wound tight as bridge cable.** She presses both palms flat on the workbench and leans forward and the workbench groans.

{aldric}"Thirty years at the forge." Her head is down. {aldric}"Built things for everyone. Horseshoes. Hinges. Blades." She flexes her hands and the tendons roll. {aldric}"Never built anything like this."

She straightens and looks at you and her eyes are wet, which you have never seen before, not once, and she blinks it away with the same efficiency she brings to everything. ${ctx.hasPenis ? `Her cock is enormous, rigid, straining obscenely against the tatters of her trousers, and she doesn't try to hide it. She's past hiding anything.` : `Between her massive thighs she is drenched, arousal running freely, the swollen heat of her impossible to ignore, and she doesn't try to hide it. She's past hiding anything.`}

{aldric}"Come here." Two words. She reaches for you and her hands close on your shoulders and the grip is immense, irresistible, her calloused palms hot as forge iron. She pulls you flush against the wall of her body and **a sound tears out of her that she has clearly never made before in her life**, raw and low and shocked by its own existence.

{aldric}"Everything," she manages against your neck. {aldric}"I can feel everything. Every nerve. Every..." She grinds against you and her arms tighten and you realize she could crush you without effort and the restraint is costing her dearly. {aldric}"Need you. Right now. On the bench, on the floor, I don't care." Her teeth graze your ear. {aldric}"Now."`,
    },

    petite: {
        casual: (ctx) => `Aldric steps off the platform and reaches for the hammer on the workbench. It sits differently in her grip now. She's smaller, compact, the muscle she has concentrated into a tighter frame. She swings once. The ring is the same. She nods.

{aldric}"Lighter." She checks her reach. Shorter. She checks her grip strength. Still solid. She walks to the quench tank, comes back. The stride is quicker, covering less ground, and there's an efficiency to the smaller frame that she's already cataloguing.

**She stands straight and squares her shoulders and the gesture is exactly the same as it always was, just contained in less space.** {aldric}"Petite." She turns the word over like she's examining a commission she didn't place. {aldric}"Could reach into the tight joints better. Armor seams. Fine detail work." She picks the hammer back up. {aldric}"Not a problem."`,

        intimate: (ctx) => `The device finishes and Aldric is smaller. Noticeably, significantly smaller, her frame drawn in tight and compact, the leather apron hanging loose on narrow shoulders. She steps off the platform and looks up at you and the looking up part makes her jaw tighten.

{aldric}"Don't say it." She knows what you're thinking. She lifts her chin, all defiance, every inch of her radiating the same blunt authority she always has. It's just coming from lower down.

She walks to the workbench and grips the edge and hauls herself up to sit on it so she's closer to eye level. The gesture is practical. The result is something else. Her legs dangle, boots not reaching the floor, and she grips the bench edge on either side of her thighs and looks at you with an expression that dares you to comment.

**You step between her knees and her breath changes.** The height difference means your chest is at her eye level and she stares at it, then up at your face, and something complicated happens in her brown eyes.

${ctx.hasPenis ? `Her cock is hard, visible even at this scale, and the trousers that used to fit are bunched loose around smaller hips.` : `The heat between her thighs is immediate, concentrated, every nerve in her smaller body firing sharper and louder than before.`}

{aldric}"Fine." Her voice is rough. She hooks her fingers through your belt. {aldric}"Pick me up." It's a command, not a request. {aldric}"And if you make it gentle, I'll hit you."`,
    },

    statuesque: {
        casual: (ctx) => `Aldric steps off the platform and stands. Properly stands, the way she always has, but the body under the posture is different now. Balanced. Proportioned. Chest, waist, hips all in classical ratio, the muscle moderate and clean, everything fitting together like joints in a master-crafted hinge.

She walks to the polished breastplate on the wall and studies her reflection. Turns sideways. Turns back. Reaches up and rolls one shoulder, watching how the line of muscle moves under skin.

{aldric}"Functional," she says. Then, quieter, like she's surprised she's saying it: {aldric}"...elegant." **That's a word Aldric has never used about herself.** She picks up her hammer, tests the grip, and the tool feels like an extension of her arm. Everything in proportion. Everything where it should be. {aldric}"Statuesque. Like a good sword. Nothing extra. Nothing missing." She gets back to work. She does not stop standing like that.`,

        intimate: (ctx) => `Aldric is at the workbench and she's not working. She's standing in the lamplight with her apron half-unlaced and she is looking at her own forearm, turning it slowly, watching the moderate muscle flex and shift. The proportions are clean. Classical. Chest in balance with hips, waist tapering smoothly, the whole body reading as something deliberate and complete.

She looks up when you enter. Doesn't relace the apron. Doesn't move.

{aldric}"Took a while to get here." Her voice is even. Her eyes are not. They're tracking you with the focused intensity she brings to precision work, the fine engraving, the work that can't be rushed. {aldric}"All those sessions. All those visits." She flexes her hand, watching the tendons shift. {aldric}"Worth it."

**She pushes off the workbench and crosses to you and the walk is unhurried, certain, the walk of a woman who knows exactly what she looks like.** She stops within arm's reach. Lifts her chin.

${ctx.hasPenis ? `Her cock is half-hard, a visible line against her thigh, and she doesn't adjust for it. Doesn't hide it. Just lets you see.` : `The warmth in her body is visible in the flush creeping up her neck, the way she shifts her weight, the slow heat building between her thighs.`}

{aldric}"You built this." She takes your hand. Puts it on her collarbone. {aldric}"Check your work." The permission is absolute. Her brown eyes hold yours. She will not look away, will not flinch, will not soften. Whatever you find, she wants you to find it with the same directness she'd bring to inspecting a blade.

{aldric}"Take your time." The roughness in her voice gives the lie to the patience. {aldric}"I'm not going anywhere."`,
    },
};

// ==========================================
// HOLT (Town Guard) - Disciplined, duty-focused, confused about desires
// Military bearing, field-report observations, parade rest habits.
// High arousal: discipline vs body impulses, flustered, salutes when embarrassed.
// Sandy cropped hair, grey eyes, guard uniform, leather armor.
// ==========================================

ARCHETYPE_WORKSHOP_REACTIONS.holt = {
    hourglass: {
        casual: (ctx) => `The device powers down. Holt steps off the platform and immediately snaps to attention, feet together, arms at her sides. Standard post-procedure protocol. Except the body standing at attention is not the body that stepped on.

Her waist has drawn in sharply, a dramatic inward pull between the new fullness of her chest and the wide curve of her hips. The guard uniform bunches at the middle where the belt has too much slack, and strains at the chest and hips where there suddenly isn't enough fabric. She looks down at herself with the focused, clinical gaze of a field inspection.

{holt}"Noting significant redistribution of mass." Her voice is steady. Measured. She places one hand at her waist and presses, testing the narrowness, then moves to her hip and feels the outward flare. {holt}"Symmetrical. Waist-to-hip differential is... considerable." She shifts into parade rest, hands clasped behind her back, and the posture pulls the uniform tight across her chest and hips in a way that makes the hourglass silhouette unmistakable. **Something crosses her face, quick and unguarded, before the discipline closes back over it.** {holt}"Range of motion appears uncompromised." A pause. {holt}"The configuration is... satisfactory."`,

        intimate: (ctx) => `The device clicks off. Holt steps down and snaps to attention by reflex, but the posture falters almost immediately. Her hands, normally locked at her sides, drift to her waist. She presses in. Feels the narrowness. Her fingers slide outward to the curve of her hips and her breathing changes.

{holt}"I should conduct a proper assessment." Her voice is controlled but thin. She traces the shape of herself, waist to hip, hip to waist, the dramatic dip and flare, and each pass makes her jaw tighten. She tries parade rest and the posture pushes her chest forward and her hips back and she abandons it immediately, color rising in her face.

{holt}"Permission to..." She stops. Starts over. {holt}"I need you to verify something." She takes your hand with a soldier's precision, places it at the narrowest point of her waist, and holds it there. Then she slides it outward, over the swell of her hip, slowly, and **her composure cracks along a visible fault line**. Her eyes close. Her grip on your wrist tightens.

${ctx.hasPenis ? `Her cock is stiff against the front of her trousers, the outline unmistakable, and she shifts her hips once and her breath hitches.` : `The heat between her thighs has built to something insistent, her arousal slick and aching, and she presses her legs together.`} {holt}"I'm experiencing a... a physiological response that is not consistent with standard assessment protocol." Her voice has dropped to nearly a whisper. She opens her eyes and looks at you and the grey is dark and the discipline is losing. {holt}"Don't move your hand. That's..." She swallows. {holt}"That's an order."`,
    },

    amazon: {
        casual: (ctx) => `The device finishes its cycle. Holt steps off the platform, rolls her shoulders, and immediately drops into a combat stance. Low center, wide base, fists raised. Testing.

She throws a punch at the air. Fast. The muscle of her arm bunches and releases, dense and defined, and the snap of it is audible. She throws another. A third. Then a combination, rapid-fire, and each strike carries a weight and authority that wasn't there before. She straightens up, breathing evenly, and assesses her own arms with narrowed eyes.

{holt}"Striking power: significantly enhanced." She flexes one hand, watching the forearm. Then she grabs the heavy iron tool rack near the wall and lifts it off its mounting, one-handed, holds it for three seconds, and sets it back. {holt}"Grip strength: well above baseline." She squares her shoulders, feeling the new breadth of them, the way the muscle sits heavy across her back and chest. **The ghost of something that isn't quite a smile crosses her face.** {holt}"This body is combat-effective." She stands at attention, the amazon frame of her filling the guard uniform in ways it was never designed for. {holt}"Very combat-effective."`,

        intimate: (ctx) => `The device powers down and Holt drops into a fighting stance before she even steps off the platform. Instinct. She throws three rapid punches, feeling the power, the speed, the dense weight of the muscle driving each one. Her breathing is controlled. Her eyes are sharp. But when she straightens up and looks at her own arms, something shifts.

She flexes. Slowly. Watching the bicep rise, the hard curve of it, the definition through her shoulder and forearm. She does it again. Her lips part slightly.

{holt}"The tactical advantages are obvious." Her voice is steady but there is a roughness underneath it that wasn't there before. She takes your hand and presses it against her bicep and flexes, and the muscle that rises under your palm is iron-hard and warm. {holt}"Feel that. That's functional strength." She moves your hand to her stomach, where the abs are ridged and tight, and **her composure stutters when your fingers press against the muscle**.

${ctx.hasPenis ? `Her cock is thick and straining against her trousers, the arousal undeniable, and she stiffens to attention out of pure nervous reflex.` : `She is wet, the ache between her powerful thighs building with each breath, and she stiffens to attention out of pure nervous reflex.`} {holt}"I'm not..." She closes her eyes. Opens them. The grey is very dark. {holt}"I am having thoughts that are not tactical in nature." Her hand covers yours on her stomach and presses harder. {holt}"Permission to... I need..." The military grammar fractures. She pulls you closer with one powerful arm and it is effortless. {holt}"Stay close. Please. I don't know what to do with this."`,
    },

    bombshell: {
        casual: (ctx) => `The device completes its cycle. Holt steps off the platform and looks down and goes very still. The kind of still that a guard goes when assessing an unexpected situation. Threat evaluation. Except the situation is her own chest.

Her breasts have swelled dramatically on her lean frame, heavy and full, pulling the front of her uniform forward and straining every fastening. She stands at attention and the posture only makes it more pronounced, pushing the new weight forward. She looks down at it again with the same focused intensity she'd give an anomalous patrol report.

{holt}"Mass distribution has shifted significantly forward." Her voice is level. Clinical. She adjusts her uniform, tugging at the front, and gives up when it becomes clear that no adjustment will accommodate the change. {holt}"Standard-issue uniform is... no longer standard-issue." She takes a few steps, testing her stride, feeling the new weight bounce and settle with each footfall. She stops. Straightens. **A flush creeps up from her collar, visible even on her sun-weathered skin.** {holt}"Mobility is maintained. Balance requires minor recalibration." A beat. {holt}"The bombshell configuration is... noted."`,

        intimate: (ctx) => `The device winds down. Holt stands on the platform with her hands at her sides, rigid, but her chest is heaving and every breath makes the new, enormous weight of her breasts shift and pull in ways that are clearly overwhelming her composure.

She steps down. She is trying to maintain regulation posture but the posture puts her chest forward and every inhale strains the fastenings and she can feel it, the pull, the heaviness, the way her nipples have gone tight and sensitive against the fabric. She undoes the top clasp of her uniform with shaking fingers. Then the second.

{holt}"I need to..." She stops. Her hands hover over her own chest, not touching, as if she's afraid of what happens if she does. {holt}"The sensitivity is beyond expected parameters." She looks at you and the grey eyes are wide and there is a crack running through the military bearing from top to bottom.

**She reaches for your hand.** The gesture is precise, deliberate, a guard executing a planned maneuver with trembling fingers. She presses your palm flat against her chest, against the heavy swell of one breast through the loosened uniform, and her whole body shudders. ${ctx.hasPenis ? `Her cock is rigid in her trousers, aching, and she shifts her hips involuntarily.` : `Between her thighs she is soaked, the arousal pulsing in time with her heartbeat.`}

{holt}"I can't..." A breath. {holt}"I've been trained to maintain composure under any conditions." Your hand is warm against the weight of her and she is pressing into it. {holt}"These are not any conditions." Her voice is barely there. {holt}"Don't remove your hand. Please."`,
    },

    bootylicious: {
        casual: (ctx) => `The device powers down. Holt steps off the platform and immediately does a standard mobility check: lunge forward, lunge back, pivot left, pivot right. On the pivot right, she stops. Something has changed in the balance equation.

She looks over her shoulder. Her butt has expanded dramatically, round and heavy and prominent, the seat of her trousers pulled impossibly tight. She reaches back and presses one hand against it, testing, the way she'd test the fit of a new piece of armor.

{holt}"Posterior mass has increased substantially." She squats, stands, squats again. The motion makes the new weight shift and bounce and she holds the bottom of the squat for a moment, assessing. {holt}"No loss of stability. Stance width adequate." She straightens and takes several steps across the workshop, monitoring the new sway and momentum with each stride. **She stops, turns, and stands at attention, which only serves to push the new fullness out behind her in sharp relief.** {holt}"Combat readiness: maintained." A careful pause. {holt}"The configuration does present certain... logistical considerations with standard seating." She adjusts her belt. {holt}"I'll adapt."`,

        intimate: (ctx) => `The device clicks off. Holt runs through her mobility check by reflex, lunge, pivot, squat, and on the squat she stops at the bottom and stays there. Her hands go behind her, pressing against the heavy, round fullness that wasn't there before. She squeezes. Her eyes close.

She stands up slowly. She turns and places both hands flat on the workbench surface. Not for support. For composure. She is gripping the edge of the bench and breathing through her nose in controlled intervals, the way she was trained to manage stress. The stress is her own butt pressing against the seam of her trousers, warm and heavy and sensitive in ways she was not prepared for.

{holt}"I need to report a... a development." Her voice is strained. She looks over her shoulder at you and the grey eyes are struggling. {holt}"The posterior sensitivity is... it exceeds anything in my experience." She shifts her weight and the motion makes the new fullness roll and she grips the bench harder.

**She takes one hand off the bench and reaches back for you.** ${ctx.hasPenis ? `Her cock is hard, pressed against the edge of the workbench, and each shift of her weight grinds it against the wood and she can't stop shifting.` : `The arousal between her thighs is dripping, her pussy swollen and throbbing, and each shift of her weight sends another pulse through her.`} {holt}"I need..." She swallows hard. {holt}"Permission to request physical assistance." Her hand finds yours and guides it to the curve of her butt and the contact makes her exhale in a rush. {holt}"Both hands. Full pressure." Her forehead drops to the workbench. {holt}"That is... not a suggestion."`,
    },

    goddess: {
        intimate: (ctx) => `Every crystal in the workshop detonates with light. The hum becomes a roar, then a frequency beyond hearing, and on the platform Holt's body passes through every threshold at once.

Her chest surges massive and heavy, splitting the front of her uniform. Her arms thicken with dense, powerful muscle, shoulders broadening, the leather of her armor groaning and then tearing at the seams. Her butt swells enormous, destroying the seat of her trousers. Her thighs fill with raw strength, calves hardening, every line of her rewritten into something that looks forged rather than born. ${ctx.hasPenis ? `Her cock is enormous and rigid, jutting from the ruins of her clothing, heavy and aching.` : `Between her powerful thighs her pussy is engorged and dripping, the lips swollen and flushed, slick running freely down the inside of her legs.`}

The light fades. Holt is standing at attention. She is standing at attention because it is the only thing she knows how to do when she doesn't know what to do, and she does not know what to do. The goddess body of her fills the ruined uniform like a siege engine wearing a handkerchief. She is shaking from head to foot.

{holt}"Status report." Her voice comes out cracked. She's talking to herself. {holt}"All... all parameters are..." She looks at her hands. The thick, powerful forearms. The veins standing out along muscles that could bend iron. She cups one massive breast and the sensation hits her like a blow and she staggers, catching herself on the platform railing, which bends under her grip.

{holt}"I can't..." **The field report collapses entirely.** She looks at you and the grey eyes are wide and lost and desperate and more open than you have ever seen them. The military jaw is trembling. {holt}"I don't have language for this. There's no protocol. There's no..." She grabs you with both hands, enormous and powerful and shaking, and pulls you against her. The heat of her body is immense. Her massive chest presses against you, her powerful arms lock around you, her whole body curling tight like she's bracing for impact.

${ctx.hasPenis ? `Her cock grinds against you, enormous and achingly hard, and the friction tears a sound out of her that is nothing like a guard.` : `Her swollen pussy presses against your thigh, drenched, and the pressure tears a sound out of her that is nothing like a guard.`} She buries her face in your shoulder and she is shaking and the shaking is not weakness, it is everything she has held at regulation distance for her entire life arriving at once and overwhelming the checkpoint.

{holt}"Stay." The word comes out raw. Not an order. A surrender. {holt}"I need... I need you to stay. I need you to hold me and I need you to not let go and I need..." Her voice breaks. She grips you tighter and the strength of it is staggering. **The guard who has never asked for anything is asking for everything.** {holt}"Please. Don't leave your post."`,
    },

    petite: {
        casual: (ctx) => `The device finishes. Holt steps off the platform and the step is light, barely a sound on the workshop floor. She straightens to attention and the attention is the same, precise and sharp, but the body executing it has changed considerably. She is small. Compact. The guard uniform hangs loose around narrow shoulders and slim hips, the belt cinched to its last hole and still not tight enough.

She looks at her hands. Turns them over. Makes a fist, assessing the size of it, then opens and closes it twice more. She drops into a fighting stance and throws three quick jabs. Fast. Very fast. The reduced mass moves like a thrown knife.

{holt}"Speed has increased." She straightens. {holt}"Striking force: reduced. Compensated by velocity." She takes several quick steps across the workshop, testing her stride, her balance, the new lightness of her footfalls. **The assessment is thorough, clinical, and almost entirely successful at hiding the quiet satisfaction in her grey eyes.** {holt}"The petite configuration is tactically viable." She tightens her belt one more notch. {holt}"Stealth applications would be significant." A pause. Very nearly a smile. {holt}"I could clear a wall I couldn't clear before."`,

        intimate: (ctx) => `The device powers down and Holt steps off the platform and she is small. Noticeably, strikingly small, the guard uniform pooling around her like borrowed clothes. She snaps to attention and the precision is there, every angle correct, but the body at attention comes up to your shoulder and the grey eyes looking up at you are doing something they don't usually do.

She holds the posture for three seconds. Five. Seven. Then her shoulders drop, a fraction, and she looks at your chest instead of your face.

{holt}"I find this configuration produces an... unexpected response." Her voice is quiet. Controlled. Almost. {holt}"When I look up at you from this height. There is a response that I am not trained to manage."

She steps closer. The top of her head reaches your collarbone. She places one hand flat against your chest, small and precise, and feels your heartbeat. **Her eyes close and the military bearing softens into something unguarded and raw.** ${ctx.hasPenis ? `Her small cock is stiff in her loose trousers, pressing against your thigh, and the contact makes her breath catch.` : `The warmth between her thighs is insistent, a low steady ache that intensifies with your closeness.`}

{holt}"Permission to..." She opens her eyes. They are bright. The grey is liquid. {holt}"I want to be held." The words come out like a confession extracted under duress. {holt}"Completely. All the way around. I want to feel..." She presses her face against your chest and her small hands grip your shirt. {holt}"Small. Safe. I want to feel small and safe and I have never wanted that before and I don't know what to do with it." Her voice is muffled against you. {holt}"Hold me. Please."`,
    },

    statuesque: {
        casual: (ctx) => `The device finishes its cycle. Holt steps off the platform and stands straight, and the straightness is different now. Not just discipline. Architecture. She is tall, proportioned, every line of her balanced and clean, the guard uniform finally fitting the way the manual illustrations suggest it should.

She does a slow rotation of her shoulders. Checks her stance width. Steps forward, steps back. The movements are economical, fluid, the body and the training in perfect agreement for the first time. She catches her reflection in the polished surface of a device housing and pauses.

{holt}"The configuration is..." She studies herself. The balanced chest, the even hips, the clean muscle, the height that makes the uniform look like it was commissioned rather than issued. She adjusts her collar. It sits right. The belt sits right. Everything sits right. **For a long moment, the field-report voice goes quiet, and what's left is a woman looking at herself with genuine, private recognition.** {holt}"Classical proportions. Optimal height for visual authority." She turns away from the reflection. {holt}"The captain mentioned that presence matters on the gate." A beat. The composure holds, but the grey eyes are warm. {holt}"I believe the presence has been established."`,

        intimate: (ctx) => `The device goes quiet. Holt steps down and stands at her full new height and looks at you, and the looking is level now, eye to eye, and something about that equality does something to the distance she usually keeps.

She runs her hands down her own sides slowly. Not assessing. Feeling. The balanced proportions, the even taper, the classical harmony of chest and waist and hips. Her fingers trace the line from her ribs to her hip and she exhales, long and unsteady.

{holt}"I've spent years standing at attention in a body that never quite fit the posture." Her voice is low, stripped of the report-tone. She takes a step toward you and the step is measured, unhurried, the walk of someone whose body has stopped fighting its own geometry. {holt}"This one does."

She reaches out and takes your face in both hands, and the gesture is so far outside her usual protocol that her fingers tremble against your jaw. **She holds you there, eye to eye, at the same height, and the equality of it undoes something that military discipline had been keeping locked.** ${ctx.hasPenis ? `Her cock is firm against her thigh, a slow insistent ache, and she steps close enough that you can feel the warmth of it.` : `The heat between her thighs is steady and deep, her arousal building with each breath of proximity.`}

{holt}"I want to look at you." Her thumbs trace your cheekbones. {holt}"Without looking up. Without standing at attention. Just..." Her breath catches. {holt}"Level. Like this." She leans closer until her forehead touches yours and holds there, and her hands are shaking and she does not pull them away. {holt}"I've never asked for anything off-duty. I'm asking now."`,
    },
};

// ==========================================
// CORWIN (Merchant) - Charming, calculating, vain
// Male NPC feminized by transformation. She/her pronouns.
// Casual: smug, "investment," frames body as business asset, mirror-checking
// Aroused: mask shatters. Needy, desperate, merchant language collapses.
// ==========================================

ARCHETYPE_WORKSHOP_REACTIONS.corwin = {
    hourglass: {
        casual: (ctx) => `The device powers down and Corwin is already turning. Not toward you. Toward the polished copper panel mounted beside the workbench, the one that catches a decent reflection if you stand at the right angle. She finds the angle immediately. Of course she does.

{corwin}"Ah." The sound is quiet, private, the kind of assessment she makes before naming a price. Her fingers find her waist and press inward, tracing the dramatic cinch of it, then sweep outward along the flare of her hips. She turns to catch the side profile. Then the three-quarter. {corwin}"The proportions are..." She tilts her head, studying herself with the focus of a jeweler examining a cut. {corwin}"Extraordinary, actually. This is the kind of figure that renegotiates the terms of a room."

She adjusts the collar of her silk blouse, smoothing the fabric where it pulls across the new fullness of her chest, and the gesture is so practiced it's almost reflex. **She catches her own eye in the copper and the smile that arrives is the one she saves for closed deals.** {corwin}"I've been undervaluing myself for years. That stops today."`,

        intimate: (ctx) => `The device goes quiet and Corwin steps off the platform and walks directly to the copper panel. She does this every time. The mirror first. Always the mirror first. She turns, studying the dramatic inward sweep of her waist, the balanced fullness above and below, silk pulling taut over curves that weren't there a month ago.

{corwin}"The return on this investment..." She adjusts her collar. Smooths her blouse. Runs her palms down her sides, following the dip and flare, and there's a small catch in her breathing that she covers with a cough. {corwin}"...has exceeded every projection."

Then she looks at you. Not in the mirror. Actually turns and looks at you, and something in the assessment shifts. Her fingers are still resting at the narrowest point of her waist, and they've gone still. {corwin}"You're staring." It's meant to come out teasing. It doesn't. It comes out breathy, barely voiced. She takes a step toward you and the motion sets her hips into a slow wave that she clearly was not prepared for.

**Her hand reaches for you instead of the mirror and that is when the composure fractures.** ${ctx.hasPenis ? `Her cock is stiff, pressing visibly against the drape of her silk trousers, and she makes no move to hide it.` : `The heat between her thighs is sudden and overwhelming, her legs pressing together.`} {corwin}"I had a speech prepared," she manages. Her fingers curl into the front of your shirt. {corwin}"Something about appreciation in value. I seem to have..." Her voice drops. {corwin}"...lost the thread." She pulls you closer by the shirt. Not smooth. Not calculated. Just pulling. {corwin}"Tell me I look good. I need to hear you say it."`,
    },

    amazon: {
        casual: (ctx) => `The platform hums down to nothing and Corwin rolls her shoulders, and both of them make a sound like a knuckle cracking, dense and solid. She looks down at her own arms. Lifts one hand. Makes a fist. The muscle that bunches along her forearm is new and frankly impressive, and she studies it with the expression of a trader receiving unexpected surplus.

{corwin}"Well, this changes the calculus." She grips the edge of the platform railing and squeezes, testing, and the metal groans. Her eyebrows rise. She squeezes again, harder, and a small dent appears. {corwin}"Significantly."

She steps off the platform and crosses to the copper panel, and the walk is different now, wider, the new breadth of her shoulders and thighs demanding more space. She studies herself. Turns. Flexes one arm with the deliberate vanity of someone who has always been vain but now has considerably more to be vain about. **The silk of her merchant's coat strains across her back, seams protesting.** {corwin}"I've been in rooms where the biggest person sets the price." She straightens her cuffs, though the gesture is somewhat undermined by the fact that her wrists are now too thick for the cuffs. {corwin}"I believe I'll be setting quite a few prices."`,

        intimate: (ctx) => `The device winds down. Corwin flexes both hands, slowly, watching the tendons shift, the muscle define itself along her forearms. She doesn't go to the mirror. That's the first sign that something has changed.

She goes to the heavy iron clamp on the workbench. Picks it up one-handed. Holds it at arm's length. Sets it down. Picks up the toolbox beside it. Same arm. No effort. She stares at her own hand like she's never seen it before.

{corwin}"This is..." She stops. Swallows. The merchant's vocabulary, usually so reliable, is fumbling for the word. She takes a step toward you and the floor feels it, the new density of her landing heavier than before. Another step. She is close now, and the amazon frame of her fills the space between you and the workbench completely.

**Her hand closes around your wrist and the grip is shocking, effortless, absolute.** She looks at her own hand on your wrist, then at your face, and the composure goes out of her eyes like a candle in wind. ${ctx.hasPenis ? `Her cock is hard, straining against her trousers, and she is breathing through her teeth.` : `Her thighs are pressed together, the flush climbing her neck, her pulse visible in the hollow of her throat.`}

{corwin}"I could hold you still." Her voice has dropped an octave. {corwin}"I could just... hold you. And you couldn't..." The sentence breaks apart. She squeezes your wrist and her other hand rises to her own face, pressing against her cheek as if checking whether she's real. {corwin}"I've never been strong enough to keep anything." The words come out raw, unplanned. {corwin}"I want to keep you right here."`,
    },

    bombshell: {
        casual: (ctx) => `The platform finishes its cycle and Corwin looks down at herself and is, for the first time in your memory, briefly silent. Her hands rise to her chest, hesitate, then settle at her collarbones instead, fingers pressing against the silk where it strains over a fullness that is frankly unreasonable on her slim frame.

{corwin}"That is..." She pauses. Adjusts her blouse. Adjusts it again. Gives up. The blouse has surrendered. {corwin}"...a considerable development."

She crosses to the copper panel with the careful, measured steps of someone recalibrating their center of gravity in real time. Studies herself. Tilts her head left, then right. Straightens her spine, which makes everything more prominent, and watches the effect with open professional admiration. {corwin}"I once saw a woman in the capital markets who stopped a bidding war just by leaning on the counter." She adjusts her neckline, pulling the silk taut, examining how it falls. **The smile that arrives is slow, sharp, and deeply satisfied.** {corwin}"I used to think that was a story. I now believe it was an understatement."`,

        intimate: (ctx) => `The device clicks off. Corwin doesn't go to the mirror. She stands on the platform looking down at herself, and her hands are hovering at her sides, not quite touching, and her breathing has gone uneven.

She steps off the platform. Walks to the copper panel. Stops halfway there. Turns back to you. Her blouse is pulling across her chest, the top two buttons under genuine structural stress, and every breath makes the fabric shift in ways that are impossible to ignore.

{corwin}"I was going to say something clever," she says. Her voice is not clever. It is slightly hoarse. {corwin}"About assets. Market positioning. Something about presentation." She takes a step toward you. The bounce of it is visible and it sends a visible shudder through her. {corwin}"I seem to be having difficulty with... with the..."

**She gives up on the sentence entirely.** Her hands go to the buttons of her blouse and undo the top one with shaking fingers. Not seduction. Necessity. The fabric was too tight and now it gapes and the swell of her chest in the opening is flushed and heaving. ${ctx.hasPenis ? `Her cock is rigid against her thigh, the silk doing nothing to conceal it.` : `She squeezes her thighs together and a small, involuntary sound escapes her.`}

{corwin}"They're sensitive." She says it like a confession, like admitting a weakness in a deal. Her fingertips brush the curve of her own chest and she flinches. {corwin}"Every time I breathe, I feel them move, and I can't... I can't think about anything else." She reaches for your hand. {corwin}"Touch them. Please. I need someone else to feel this so I know I'm not losing my mind."`,
    },

    bootylicious: {
        casual: (ctx) => `Corwin steps off the platform and immediately turns her back to the copper panel. She looks over her shoulder. Adjusts her stance. Looks again. Tips her hips to the left, then the right, watching the effect with the focused intensity of someone evaluating cargo.

{corwin}"Hm." She reaches back with one hand and presses against the curve, testing the new fullness, and her eyebrows rise incrementally. {corwin}"That is substantial." She adjusts her trousers, which are losing a negotiation with the new shape of her, the silk pulling tight across a butt that has exceeded the garment's design specifications. She tugs. Gives up. Returns to studying the mirror.

{corwin}"A colleague of mine in the capital," she says, still watching her own reflection, tilting from angle to angle, {corwin}"used to say that the most valuable goods are the ones people can't stop looking at." She turns, takes three slow steps across the workshop, then turns again to catch the profile. **The sway of the motion is dramatic, heavy, the kind of movement that rearranges a room's attention.** {corwin}"I believe I've acquired a very compelling product." She smooths the silk over her hip and watches it pull. {corwin}"The packaging just needs updating."`,

        intimate: (ctx) => `The device powers down and Corwin turns her back to the copper panel by reflex. She looks over her shoulder, finds the angle, and then her hand reaches back and she touches herself and the assessment in her eyes stutters.

She squeezes. Slowly. Her fingers sink into the heavy, warm fullness and something crosses her face that is not part of the usual inventory. She squeezes again. The mirror is forgotten. She is looking at her own hand, at the flesh giving and bouncing back, and her breathing has changed.

{corwin}"I was going to make a remark about..." She trails off. Squeezes again. {corwin}"About..." Her voice has gone thin. She walks to the workbench and leans forward on it, and the posture pushes her butt outward, and the contact of her hip against the bench edge makes her gasp.

**The merchant's mask comes apart in pieces.** Her head drops between her arms. Her hips shift, pressing back, and the motion is not calculated. ${ctx.hasPenis ? `Her cock is stiff, pressing forward against the workbench, and she rocks between the hard surface and the empty air behind her.` : `The slick between her thighs is sudden and insistent, her arousal aching with each shift of weight.`}

{corwin}"Come here." She says it without lifting her head. Without the usual smile. Without any angle. {corwin}"Put your hands on me. Both of them." She pushes back from the bench and looks at you over her shoulder and her dark eyes are desperate. {corwin}"I need you to grab me like you mean it."`,
    },

    goddess: {
        intimate: (ctx) => `Every device in the workshop flares simultaneously. The copper panel warps from the heat. Crystals hum at a frequency that makes the tools rattle on their hooks, and on the platform Corwin's body is doing something that no amount of merchant's calculation could have predicted.

Her chest surges first, enormous, splitting the silk of her blouse down the center. Then the muscle, dense and powerful, arms thickening, shoulders broadening, her merchant's coat tearing at every seam. Her butt swells until her trousers simply give up, the silk shredding, and her thighs fill with raw, trembling power. ${ctx.hasPenis ? `Her cock is massive, rigid, jutting from the ruins of her clothes, already leaking.` : `Between her powerful thighs her pussy is swollen and dripping, the slick running freely down her inner legs.`}

The crystals dim. Corwin stands in the wreckage of her silk, naked, enormous in every dimension, and she is not looking at the mirror. She is not looking at any mirror. She is staring at her own hands and they are shaking.

{corwin}"This isn't..." Her voice cracks. The merchant's voice, the smooth one, the one that negotiates and charms and never, ever breaks. It breaks. {corwin}"I can't put a price on this." She looks up at you and **her eyes are wet and wide and the woman behind the calculation is standing there with no walls left**. {corwin}"I don't know what to do when I can't put a price on something."

She steps off the platform and each step is heavy, the floor protesting, and she crosses to you and her hands grip the front of your shirt and pull. Not smooth. Not strategic. Her massive chest presses against you, her powerful arms wrapping around, the trembling heat of her goddess body engulfing you completely.

{corwin}"I've been selling myself my whole life." The words are muffled against your shoulder. {corwin}"Every smile. Every deal. Every charming thing I've ever said has been a transaction." Her grip tightens, her thick arms locking you against the furnace of her body. She tilts her face up and her composure is gone, all of it, the slick merchant replaced by someone terrified and aching and desperate. ${ctx.hasPenis ? `Her enormous cock throbs against your hip, insistent, and she whimpers at the contact.` : `Her engorged pussy grinds against your thigh and she gasps, a raw, broken sound.`}

{corwin}"I don't want to sell you anything." **Her voice is barely a whisper and it is the most honest sentence she has ever spoken.** {corwin}"I just want... I need..." The word "need" comes out strangled, a word she never uses, never permits herself to use. Her forehead drops to yours. Her breath comes in short, shattered bursts.

{corwin}"Stay. Please. Not because of what I'm offering. Just because you..." She can't finish. She presses her mouth against your neck and her whole body shudders, enormous and powerful and completely undone. {corwin}"Just because."`,
    },

    petite: {
        casual: (ctx) => `The platform finishes and Corwin steps down and the step is longer than it should be. She lands light, lighter than she's ever landed, and stands there looking at her own hands. The rings on her fingers are loose now. She turns one absently, assessing.

{corwin}"Interesting." She crosses to the copper panel. Studies herself. The silk merchant's clothes hang off her, drowning a frame that has become fine-boned and compact, sharp features in a smaller setting. She adjusts her collar, but the collar is miles too wide. She tries the cuffs. Same problem. {corwin}"The tailoring situation is... suboptimal."

But the voice is still Corwin's. The assessment is still running behind her dark eyes, calculating angle and advantage with the speed of someone who has been finding leverage in unlikely positions for decades. She straightens her spine, lifts her chin, and the gesture makes her look like a very expensive dagger. Small. Precise. Lethal. **She catches her reflection and something between amusement and genuine pleasure crosses her face.** {corwin}"You know what they say about compact goods." She picks up a delicate silver instrument from the workbench, weighing it in her fingers. {corwin}"Higher value per unit."`,

        intimate: (ctx) => `The device winds down and Corwin steps off the platform and the step barely makes a sound. She stands there, smaller, lighter, the silk pooling at her shoulders, and she looks up at you and the looking-up is new and she does not like it and she cannot stop doing it.

{corwin}"The leverage here is..." She gestures vaguely. Swallows. {corwin}"Revised."

She crosses to the copper panel but stops halfway. Turns back to you instead. That is not normal. The mirror always comes first. But she is looking at you, up at you, and her dark eyes are doing something complicated that has nothing to do with commerce.

{corwin}"I keep trying to frame this as a position. A strategy." She takes a step closer. She has to tilt her head back. Her throat is exposed, the fine line of it catching the workshop light, and she is aware of this and it is making her pulse visible. **Her composure is intact but thin, like silk stretched over something fragile.**

${ctx.hasPenis ? `Her cock is small and achingly hard, pressed against the loose drape of her oversized trousers.` : `The warmth between her thighs is disproportionate to her size, insistent and overwhelming.`} {corwin}"But I keep thinking about..." She stops. Her jaw tightens. {corwin}"About being picked up." The words come out strangled, like she had to negotiate with herself to release them. {corwin}"About not being able to reach you. About needing to ask." Her hand finds your chest, small palm pressing flat, feeling your heartbeat. {corwin}"I have never once needed to ask for anything." Her voice drops to almost nothing. {corwin}"I find I need to ask."`,
    },

    statuesque: {
        casual: (ctx) => `Corwin steps off the platform and straightens to her full height and the straightening continues past where it used to stop. She stands tall, taller, the proportions of her body falling into clean, balanced lines, chest and hips in measured harmony, shoulders squared, everything composed into something that looks like it was designed on purpose.

She walks to the copper panel with a stride that has gained several inches and studies herself with naked appreciation. Turns left. Turns right. Runs her palms down her sides, feeling the even taper, the classical symmetry, and the smile that arrives is not the merchant's smile. It is quieter. More genuine. The smile of someone who has received exactly what they ordered.

{corwin}"Statuesque." She says the word like she's tasting it. Like it's a vintage she's been waiting to open. {corwin}"That's the word, isn't it." She adjusts her collar, and for once the silk fits properly, draping the way it was meant to drape over a figure that fills it with authority. **She meets her own eyes in the copper and holds the gaze with visible satisfaction.** {corwin}"I've spent my career making people believe I'm the most important person in the room." She squares her shoulders. The gesture is effortless. {corwin}"I think the room might finally agree."`,

        intimate: (ctx) => `The device goes quiet. Corwin stands on the platform at her full new height and looks down at you, and the looking-down is the thing that does it. You can see it land. The realization of the angle, of what it means, spreading across her features like warmth.

She steps off the platform. Walks to you with a stride that is long, unhurried, deliberate. She stops close. Very close. She is taller than you now, or close to it, and she looks down with dark eyes that are trying very hard to maintain the merchant's assessment and failing.

{corwin}"This is the angle I've always wanted." Her voice is steady. Almost. {corwin}"Looking down at someone from a position of..." She reaches out and adjusts your collar, the way she adjusts her own, preening, claiming. Her fingers linger at your neck. {corwin}"...complete advantage."

**The steadiness lasts until you look up at her.** Something in your upturned face hits her like a physical thing. Her fingers stop moving. Her breath catches. The hand at your collar slides to the back of your neck and grips. ${ctx.hasPenis ? `Her cock stiffens against her thigh, sudden and insistent, the silk tenting.` : `Heat floods between her thighs, sudden and undeniable, her legs pressing together.`}

{corwin}"I don't..." The merchant's rhythm stumbles. {corwin}"I had an approach. A very good approach." Her grip on the back of your neck tightens. She leans down, her lips near your ear, and the composure dissolves into warm, uneven breath. {corwin}"You're looking at me like I matter. Not like I'm selling something." Her voice breaks on the last word. {corwin}"Don't stop looking at me like that. I'll give you anything. Just don't stop."`,
    },
};

// ==========================================
// MRS. THORNWICK (Academy Headmistress) - Dignified, controlled, repressed
// Formal/academic language. "One finds..." "It would appear..."
// When aroused: composure cracks. Formal language collapses.
// ==========================================

ARCHETYPE_WORKSHOP_REACTIONS.mrs_thornwick = {
    hourglass: {
        casual: (ctx) => `Mrs. Thornwick steps off the platform and immediately straightens her robes. The robes do not cooperate. They pull inward at her waist and outward at her chest and hips, describing a shape that her wardrobe was never consulted about.

{mrs_thornwick}"One observes," she says, adjusting her glasses with two precise fingers, {mrs_thornwick}"a significant redistribution of mass along the coronal plane." She places both hands at her waist and her fingers nearly meet. Then her hands travel outward, following the dramatic flare, and her composed expression flickers. {mrs_thornwick}"The anatomical texts in the Academy library include a diagram labeled 'hourglass morphology.' I always considered it an artistic exaggeration." She smooths her robes again, accomplishing nothing. **The fabric has chosen sides, and it is not hers.** {mrs_thornwick}"I shall need to revise the curriculum notes. Clearly the diagram was understated."`,
        intimate: (ctx) => `Mrs. Thornwick steps off the platform and grips the edge of the nearest workbench. Her knuckles go white. She stands perfectly still, breathing through her nose with the measured cadence of someone chairing a contentious faculty meeting, except that her waist has narrowed to a dramatic pinch and the weight above and below it is pulling with every breath.

{mrs_thornwick}"The proportional shift is," she begins, then stops, because her hands have moved to her waist without permission and are sliding upward over the swell of her chest. She watches them do this. **Her glasses have slipped down her nose and she does not push them back up.** {mrs_thornwick}"Considerable. The proportional shift is considerable."

She turns to face you and the rotation sets off a cascading motion, chest swaying one way, hips the other, meeting in the middle at that impossible waist. {mrs_thornwick}"In my professional capacity, I have reviewed dozens of anatomical references. Not one of them adequately prepared me for..." She takes your hand and presses it flat against the narrowest point of her waist, then slides it outward along the flare of her hip. Her breath catches. ${ctx.hasPenis ? `Her cock is straining visibly against her robes, the formal fabric tented in a way that no amount of straightening will remedy.` : `The heat between her thighs is audible in her breathing, each exhale fractionally more ragged than the last.`} {mrs_thornwick}"You may," she says, voice dropping to something barely above a whisper, {mrs_thornwick}"continue the examination. For... academic purposes." Her bun has loosened. A strand of silver-streaked hair falls across her flushed cheek. She does not fix it.`,
    },
    amazon: {
        casual: (ctx) => `Mrs. Thornwick descends from the platform and the sound of her footfall is different. Heavier. She notices immediately and looks down at her feet, then at her hands, then flexes one arm with the clinical focus of someone checking structural specifications.

{mrs_thornwick}"Fascinating." She picks up a heavy brass instrument from the workbench and holds it at arm's length. No tremor. No effort. She sets it down and adjusts her glasses. {mrs_thornwick}"The Academy's physical education program has always emphasized functional strength. I have reviewed the training regimen annually for fifteen years." She rolls her shoulders and something shifts visibly beneath her robes, muscle and density rearranging. {mrs_thornwick}"I confess I now find the regimen... insufficient."

**She straightens her spine, and the straightening adds an inch she did not previously possess.** The thick cords of her arms press against her sleeves. Her thighs fill her robes differently, planted and powerful. {mrs_thornwick}"The historical texts use the term 'amazon' for this body type. Warrior scholars." A pause. {mrs_thornwick}"I have always been a scholar. The warrior component is a welcome addition to the portfolio."`,
        intimate: (ctx) => `Mrs. Thornwick steps off the platform and plants her feet and the floor feels it. She flexes both hands, watching the tendons and muscle shift, and her breathing has changed, deeper, drawing from a core that is dense with new power.

{mrs_thornwick}"I am experiencing," she says, with careful diction that costs her visible effort, {mrs_thornwick}"a significant proprioceptive adjustment." She squeezes her own bicep and her eyes widen fractionally behind her glasses. She squeezes harder. The muscle does not yield. **Something behind her composed expression shifts, like a crack in a retaining wall.**

She crosses to you in three strides, each one planted with authority that rattles the instruments on the shelves. She takes your hand and presses it against her upper arm, then flexes. The muscle rises hard against your palm. {mrs_thornwick}"Confirm the density," she instructs. Then she moves your hand to her thigh, where the power coiled beneath the fabric of her robes is extraordinary. {mrs_thornwick}"And here." Her voice has dropped half a register. She pulls your hand to her abdomen, where ridged muscle flexes under your fingers through the thin fabric. ${ctx.hasPenis ? `Her cock is rigid against her robes, and when your hand passes her stomach she rolls her hips forward involuntarily, pressing against you.` : `She is slick between her thighs, and when your hand passes her stomach she presses her legs together around a heat she cannot professionally acknowledge.`}

{mrs_thornwick}"The amazon classification in historical texts implies..." She trails off. Her bun is coming undone, one pin already lost. {mrs_thornwick}"It implies a capacity for..." Her hand closes over yours and pins it against her flexing abdomen. {mrs_thornwick}"I find I am losing the relevant citation." She pulls you closer with one arm and the strength of it is effortless, irresistible. {mrs_thornwick}"You may proceed with the physical assessment. I will... attempt to take notes."`,
    },
    bombshell: {
        casual: (ctx) => `Mrs. Thornwick steps off the platform and immediately reaches for the lapels of her robes, pulling them closed with the reflexive propriety of someone who has just noticed a draft. There is no draft. There is, however, a dramatic new reality beneath the high collar of her academy dress that the robes were not engineered to contain.

{mrs_thornwick}"The anterior mass distribution is," she clears her throat, {mrs_thornwick}"pronounced." She releases the lapels and stands straight, and the effort of maintaining her posture against the forward pull is visible in her shoulders. She adjusts her glasses. Adjusts them again. {mrs_thornwick}"I recall a passage in Brennan's Morphological Survey describing the 'bombshell' phenotype. He characterized it as a concentration of mass at the superior anterior, with minimal compensatory distribution elsewhere."

**She glances down, then determinedly glances back up.** {mrs_thornwick}"Brennan's prose was dry. One now suspects he was compensating for the subject matter." She smooths her robes over the shape and the fabric pulls taut and she stops smoothing. {mrs_thornwick}"I shall compose a more thorough annotation for the Academy's copy. Purely for scholarly completeness."`,
        intimate: (ctx) => `Mrs. Thornwick steps off the platform and stands perfectly still, and the stillness is a mistake, because standing still means there is nothing to distract from the extraordinary weight on her chest. It pulls forward and down with a warm, heavy insistence that she can feel in her collarbones, in her spine, in the way her breathing has become a negotiation with gravity.

{mrs_thornwick}"One would note," she begins, and her hands are already on her chest, cupping through the fabric, testing the heft. She watches herself do this with an expression of rigid academic detachment that is failing visibly. {mrs_thornwick}"One would note a dramatic concentration of tissue in the..." She squeezes gently and her mouth opens and closes without producing further terminology.

**Her glasses fog.** She removes them, polishes them on her sleeve, replaces them. They fog again. She gives up and sets them on the workbench. {mrs_thornwick}"The Brennan text uses the term 'bombshell,'" she says. {mrs_thornwick}"I always found the term vulgar. I am... revising." She takes your hand and places it against the heavy swell of her chest, pressing your palm flat. The weight that settles into your grip is remarkable. Her nipples are hard through the thin fabric. ${ctx.hasPenis ? `Her cock is straining against her robes, a visible ridge that she is pretending does not exist with decreasing success.` : `The wet heat between her thighs has begun to soak through her smallclothes, a fact she is cataloguing with diminishing clinical detachment.`}

{mrs_thornwick}"You may apply counterpressure," she instructs, her voice unsteady. A strand of dark hair escapes her bun and falls across her flushed face. {mrs_thornwick}"Firmly. The, the gravitational load requires... requires..." She pushes into your hands and her eyelids flutter and the sentence dies. {mrs_thornwick}"More," she whispers, and the word is not academic at all.`,
    },
    bootylicious: {
        casual: (ctx) => `Mrs. Thornwick steps off the platform and pauses. She takes one step. Pauses again. Something behind her has fundamentally altered the physics of her gait, and she is running calculations.

{mrs_thornwick}"The posterior redistribution is..." She reaches back with one hand, maintaining eye contact with you as though this is a perfectly normal thing to do during a professional consultation. Her hand finds the new fullness and she blinks once. {mrs_thornwick}"Substantial." She withdraws her hand and folds both hands in front of her, which is her default position for delivering committee reports. {mrs_thornwick}"Alderman Graves' compendium includes the colloquial term 'bootylicious' in its appendix on folk body classifications. I had the appendix flagged for removal on grounds of insufficient academic rigor."

She takes another step and feels the heavy sway behind her, the way her balance has shifted. **She smooths the back of her robes with both palms, an assessment disguised as a grooming gesture.** {mrs_thornwick}"I shall... table that motion. The appendix may have more empirical merit than I initially credited."`,
        intimate: (ctx) => `Mrs. Thornwick steps off the platform and sits on the workshop stool and immediately stands back up. She grips the edge of the workbench. Her face is very carefully composed, but there is color rising in her cheeks that no amount of composure can govern.

{mrs_thornwick}"The sensation of sitting," she says, each word placed with surgical precision, {mrs_thornwick}"has been fundamentally altered." She reaches behind herself with both hands and grips the extraordinary new fullness there, and her fingers sink deep into warm, dense flesh, and the sound she makes is small and controlled and completely involuntary. **Her bun loses a pin.** {mrs_thornwick}"One finds the posterior mass to be... considerably in excess of anatomical expectations."

She turns away from you. Deliberately. The view from behind is dramatic, the narrow waist flaring into heavy, sculpted curves that strain her formal robes. She looks back over her shoulder and the composure is cracking visibly, formal language fighting a losing battle with sensation. {mrs_thornwick}"The folk classification is 'bootylicious.' I find I can no longer dispute the terminology with any..." She presses back against the workbench edge and her breath stutters. ${ctx.hasPenis ? `Her cock is rigid, pressing against the front of her robes, and she is gripping the workbench hard enough to whiten her knuckles.` : `The slick heat between her thighs has intensified with every clench of her new muscles, and she is gripping the workbench to keep herself upright.`}

{mrs_thornwick}"You may," she manages, voice fracturing, {mrs_thornwick}"place your hands. On the area in question. For purposes of..." A second pin falls from her bun. Dark hair streaked with silver spills across one shoulder. {mrs_thornwick}"For purposes." She abandons the sentence entirely and presses her butt back toward you. {mrs_thornwick}"Now. If you would."`,
    },
    goddess: {
        intimate: (ctx) => `Mrs. Thornwick steps off the platform and does not move.

For a woman who has chaired emergency council sessions, delivered eulogies, and once talked down an armed dispute over water rights without raising her voice, this stillness is notable. She stands in the center of the workshop, and every part of her body is enormous, maximal, pushed to an extreme that no anatomical text in the Academy library has dared to diagram. Massive breasts strain the seams of her high-collared robes. Thick muscle cords her arms and thighs. Her butt is a heavy, sculpted counterweight that has pulled her posture into something regal and unavoidable. Her waist, impossibly, still tapers between the masses above and below.

{mrs_thornwick}"I have," she begins. Stops. Removes her glasses with a hand that is not quite steady. Sets them on the workbench with the care of someone putting away something she will not need for a while. {mrs_thornwick}"I have reviewed every morphological classification in the Academy's collection. Every anatomical survey. Every historical record of bodily transformation attributed to the old devices." Her voice is measured but the measurement is costing her everything. **A pin falls from her bun. Then another. Dark hair streaked with silver begins to unravel down her neck.** {mrs_thornwick}"None of them describe this. The term in Alderman Graves' compendium is 'goddess.' I struck it from the curriculum as hyperbolic."

She braces both hands on the workbench and the wood groans under her grip. The strength in her arms is visible, cords of muscle flexing beneath skin flushed with heat. She looks at you and her blue eyes are wide, the composed mask crumbling from the edges inward. {mrs_thornwick}"It was not hyperbolic." Her bun collapses entirely, silver-dark hair spilling across her shoulders, and the collapse of it is the collapse of everything she has been holding in place.

She pulls you to her with one powerful arm and you are pressed against a body that radiates heat like a furnace. Her massive chest crushes against you, nipples hard through the ruined fabric. Her thick thighs bracket your body. ${ctx.hasPenis ? `Her cock is enormous, rigid, trapped between your bodies, and she shudders from root to tip when you press against her.` : `Her pussy is swollen and dripping, slick heat soaking through the remnants of her robes, and she shudders when your body presses against her.`} {mrs_thornwick}"I am going to say something," she whispers against your ear, {mrs_thornwick}"that I have never said in thirty years of public service."

**She grips your shoulders with hands that could bend iron and her whole vast, powerful body trembles.** {mrs_thornwick}"I need you to touch me. Everywhere. All of it. I cannot... I can no longer maintain..." The formal diction dissolves. Her hips roll against you, grinding with the force of muscles built for war. {mrs_thornwick}"Please." The word comes out raw, stripped of every committee and every protocol and every year of dignified restraint. {mrs_thornwick}"I am coming apart. I am quite literally coming apart and I need your hands on me before I lose what remains of my..." She gasps, arching against you, and the sentence is never finished. The headmistress is gone. What remains is vast, trembling, and done pretending.`,
    },
    petite: {
        casual: (ctx) => `Mrs. Thornwick steps off the platform and pauses, one hand on the railing. The railing is higher than it should be. Or rather, she is lower than she should be, and the railing, the workbench, the shelves, the entirety of the workshop has quietly renegotiated its proportions around her.

{mrs_thornwick}"Interesting." She releases the railing and examines her hands, turning them over. The fingers are fine, the wrists narrow, the whole architecture of her reduced to something precise and compact. She straightens her robes, which now hang loose around a frame that takes up considerably less room. {mrs_thornwick}"The developmental classification would be 'petite.' Renwick's taxonomy defines it as minimum viable mass across all parameters."

**She takes a step and the step makes almost no sound.** She looks down at her flat chest, her narrow hips, the way her sash nearly wraps around her twice. {mrs_thornwick}"I have always maintained that authority derives from presence, not from stature." She folds her hands in front of her, a committee posture that now appears oddly delicate on her diminished frame. {mrs_thornwick}"I see no reason to revise that position. If anything, the additional sash length lends gravitas."`,
        intimate: (ctx) => `Mrs. Thornwick steps off the platform and every nerve in her reduced body fires at once. She can feel the air. Not as a concept, not as a draft, but as a texture against every inch of skin that is closer to the surface than it has ever been.

{mrs_thornwick}"The nerve density relative to body mass has," she swallows, {mrs_thornwick}"increased significantly." She touches her own collarbone and traces downward, over a chest that is barely a presence, ribs visible beneath thin skin. Her glasses are too large for her narrowed face. She removes them and holds them in fingers that tremble with sensitivity. **{mrs_thornwick}"I can feel my own pulse in my wrists. In my throat. In locations I shall not enumerate in a professional setting."**

She approaches you and stands close, looking up. The looking up is new and it does something to her expression that propriety cannot fully mask. She takes your hand and presses it flat against her sternum. Your hand spans nearly the width of her. {mrs_thornwick}"The differential in mass is..." She places your other hand on her narrow hip, where the bone is sharp and vivid through thin skin. Every point of contact blazes. ${ctx.hasPenis ? `Her small cock is hard and exquisitely sensitive, pressed against your thigh, and she flinches at the contact with a sound that is not dignified in the slightest.` : `The delicate heat between her thighs is vivid and concentrated, every nerve close to the surface, and she presses her legs together with a sound that is not dignified in the slightest.`}

{mrs_thornwick}"I appear to be," she says, voice catching, {mrs_thornwick}"experiencing every sensation at approximately three times its expected intensity." She leans into you and she is almost weightless there, sparrow-boned and trembling. {mrs_thornwick}"You may hold me. If you are... careful. I believe anything more than careful may cause me to make sounds entirely inappropriate for a woman of my station." Her thin fingers grip your shirt. {mrs_thornwick}"Proceed. Carefully."`,
    },
    statuesque: {
        casual: (ctx) => `Mrs. Thornwick steps off the platform and stands. Simply stands, with the posture of a woman who has been standing in front of rooms full of people for thirty years, except that something about the proportions has been perfected. The moderate fullness of her chest balances the measured curve of her hips. Lean muscle gives structure to her arms and thighs without overwhelming them. Everything is in ratio, everything in quiet, classical agreement.

{mrs_thornwick}"Proportional," she says, and the satisfaction in the word is genuine. She runs one hand down her side, from shoulder to hip, measuring the transitions. {mrs_thornwick}"Hendricks' treatise on ideal morphology uses the term 'statuesque' to describe the classical proportional ideal. I have taught from that text for eleven years." **She stands a fraction straighter, which should not be possible, and yet.** {mrs_thornwick}"I confess the diagram always seemed somewhat aspirational. I am revising that assessment."

She adjusts her sash, and for once the sash cooperates, draping across a figure that sits exactly where academic poise and physical harmony intersect. {mrs_thornwick}"The portraitist will find this configuration exceptionally straightforward to render. Everything is precisely where it ought to be."`,
        intimate: (ctx) => `Mrs. Thornwick steps off the platform and walks to the center of the workshop and stands there, and the standing is its own statement. The proportions are harmonious. Full breasts balanced by lean muscle. A waist that tapers without drama into hips that flare without excess. Her butt curves in classical complement. Every ratio answers every other, nothing fighting, nothing straining.

{mrs_thornwick}"I have described this configuration in lectures," she says quietly, running her palms down her own sides. The journey is smooth, unbroken, each transition flowing into the next. {mrs_thornwick}"The 'statuesque' ideal. Balanced morphology. I described it using diagrams and anatomical measurements." She traces the path again, slower, and her eyes close. **When they open, they are darker than they were.** {mrs_thornwick}"The diagrams failed to mention how it feels. The balance. Everything supporting everything else. No tension, no compensation, just... equilibrium."

She takes your chin between her thumb and forefinger and tilts your face up to meet her gaze. The contact is precise, authoritative, and not remotely academic. {mrs_thornwick}"Trace the proportions," she instructs. Your hands find the smooth line of her waist, the measured swell of her hip, the firm curve of her butt. Everything flows. {mrs_thornwick}"Continue." Your hands travel upward, over her ribs, to breasts that fill your grip in exact proportion. Then to her arms, where lean muscle firms under your touch. ${ctx.hasPenis ? `Her cock is warm and firm against her robes, a steady presence, part of the equilibrium rather than disrupting it.` : `The warmth between her thighs is steady and certain, arousal that builds without urgency, part of the system rather than fighting it.`}

{mrs_thornwick}"I have spent my career in pursuit of balance," she says, and her voice has dropped to something low and private that no faculty meeting has ever heard. She presses the length of her body against yours, and the contact is even along every inch, no gaps, no excess, just warmth perfectly distributed. Her loosened hair brushes your shoulder. {mrs_thornwick}"I theorized that achieving it would bring composure." Her breath catches against your neck. {mrs_thornwick}"I was incorrect. It brings the precise opposite. It makes me want to let every last thing go." Her fingers tighten on your collar. {mrs_thornwick}"I am considering it."`,
    },
};

/**
 * Get an archetype workshop reaction text for a given NPC and archetype.
 * @param {string} npcId - The NPC identifier
 * @param {string} archetypeId - The archetype identifier
 * @param {boolean} isIntimate - Whether to use intimate (true) or casual (false) version
 * @param {object} ctx - Context object with hasPenis boolean
 * @returns {string|null} The workshop reaction text, or null if not found
 */
function getArchetypeWorkshopReaction(npcId, archetypeId, isIntimate, ctx) {
    const entry = ARCHETYPE_WORKSHOP_REACTIONS[npcId]?.[archetypeId];
    if (!entry) return null;
    if (archetypeId === 'goddess') {
        return typeof entry.intimate === 'function' ? entry.intimate(ctx) : null;
    }
    const fn = isIntimate ? entry.intimate : entry.casual;
    return typeof fn === 'function' ? fn(ctx) : null;
}
