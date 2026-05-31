// ============================================
// BLACKSTONE TOWER: THE SKINSUIT EXPERIMENT
// A one-time tower vignette featuring Vessa + Fiona + Sylvie
// 14-part single-path scene, no player choices
//
// REGISTRATION: In tower_visit pool. Gates in onEnter:
//   - One-time (tower_skinsuit_seen flag)
//   - Vessa trust >= 25, Fiona trust >= 20
//   - Day >= 40
//   Falls through to random pool pick on gate fail.
//
// FLAG: tower_skinsuit_seen = true (set on Part 14 exit)
//
// IMAGES: images/tower/skinsuit/[sceneId].webp (1216x832)
// VIEWER: tower-skinsuit-viewer.html
// ============================================

// --- PART 1: ARRIVAL ---

SCENES['tower_skinsuit_arrival'] = {
    id: 'tower_skinsuit_arrival',
    image: 'images/tower/skinsuit/arrival.webp',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        // Gate: one-time, trust, and day requirements
        const vessaState = gameState.npcs.vessa;
        const fionaState = gameState.npcs.fiona;
        const day = gameState.day || 1;
        if (gameState.flags.tower_skinsuit_seen
            || !vessaState || (vessaState.trust || 0) < 25
            || !fionaState || (fionaState.trust || 0) < 20
            || day < 40) {
            const pool = SceneManager.scenePools['tower_visit'].filter(id => id !== 'tower_skinsuit_arrival');
            const idx = Math.floor(Math.random() * pool.length);
            SceneManager.playScene(pool[idx]);
            return 'redirect';
        }

        const visitReason = getRandomVisitReason();

        this.text = `${visitReason}

The tower lab has been rearranged. Sylvie's central workbench, usually buried under notes and half-finished devices, has been cleared and lined with seven brass instruments. They range from delicate (a crystal-tipped wand trailing copper wire) to alarming (something that looks like a small cannon with a lotus flower where the barrel should be). Against the far wall, a low bed has been dragged in from somewhere, piled with cushions and a heavy wool blanket. It looks wildly out of place among the brass and crystal.

Vessa stands at the workbench, turning a device shaped like a tuning fork between her pale fingers. She examines it the way she examines herbs... professionally, with a slight hunger underneath. Fiona hovers near the top of the stairs. Arms crossed. Weight on one foot, ready to leave.

{sylvie}"Volunteers!" Sylvie claps her hands. {sylvie}"Wonderful. I've been working on these for weeks. Seven prototype devices, seven different morphogenic principles, all completely untested on living subjects." She says this like it's a selling point.

{vessa}"You mentioned unprecedented sensations." Vessa sets the tuning fork down. {vessa}"I'm here for unprecedented."

{fiona}"You said it'd feel good." Fiona's voice is flat. Guarded.

{sylvie}"It will! Almost certainly." Sylvie picks up the lotus cannon and weighs it in her hand. {sylvie}"The morphogenic frequencies are tuned to the pleasure centers. Everything these devices do should feel..." She searches for the word. {sylvie}"...extraordinary."

{fiona}"'Should.'"

{sylvie}"Seventy percent confidence."

Fiona looks at Vessa. Vessa shrugs one shoulder, already unbuttoning her dress. {vessa}"I've worked with worse odds."

Fiona watches Vessa's dress pool at her feet. The herbalist stands in the lamplight, pale and unself-conscious, black hair falling over bare shoulders. She looks back at Fiona and raises one eyebrow.

Fiona uncrosses her arms. Pulls her oversized shirt over her head. Her thin frame is sharp angles and tan skin, not a curve on her. She doesn't meet anyone's eyes.

Sylvie picks up the first device, a brass syringe filled with swirling violet liquid. She aims it at Vessa's chest.

{sylvie}"This is the Dissolution Array. It restructures solid matter into a malleable semi-liquid state while maintaining neural continuity." She adjusts a dial. {sylvie}"Meaning it turns you into goo and you stay you." She grins. {sylvie}"Ready?"

{vessa}"Fascinating." Vessa plants her feet. The knowing smile. {vessa}"Do it."

Sylvie pulls the trigger. Violet light floods the lab.`;
    },
    actions: [
        { label: 'Continue', nextScene: 'tower_skinsuit_goo' }
    ]
};

// --- PART 2: GOO ---

SCENES['tower_skinsuit_goo'] = {
    id: 'tower_skinsuit_goo',
    image: 'images/tower/skinsuit/goo.webp',
    imagePrompt: null,
    speaker: '',
    text: `The transformation starts at Vessa's chest where the beam hit and radiates outward. Her skin goes translucent, then liquid, then luminous. Her body holds its shape but the surface shifts like water in a glass, violet-tinted and faintly glowing. Her features are still visible... the angular face, the high cheekbones, the knowing expression... but rendered in translucent gel. Her violet eyes, already striking, now glow from within.

She lifts her hands. Watches her fingers flex. They leave faint trails of light in the air.

{vessa}"Fascinating." Her voice is unchanged. She presses a finger to her own arm and it sinks in to the first knuckle with a soft, wet sound. She pulls it free and the surface reforms instantly. {vessa}"No pain. Full sensation. In fact..." She presses deeper. Her eyes widen just slightly. {vessa}"Enhanced sensation."

{sylvie}"The neural density in a liquid medium is actually higher than solid tissue!" Sylvie scribbles furiously. {sylvie}"Every point of your body is essentially a nerve ending now."

Vessa turns to Fiona. The girl is staring, lips parted, arms slack at her sides. Vessa crosses the lab in smooth, liquid strides and runs one translucent hand down Fiona's bare arm.

Fiona gasps. The goo is warm. Warmer than skin. Where it touches, it clings slightly before releasing, leaving a faint tingling in its wake.

{fiona}"Like..." Fiona swallows. {fiona}"Warm."

Vessa's smile glows through violet gel. She runs both hands down Fiona's sides, over her thin hips, and Fiona shudders. Tendrils extend from Vessa's fingers... slender threads of goo that trace along Fiona's collarbones, her ribs, the flat plane of her stomach. Each one leaves warmth behind. Fiona's breath quickens.

The tendrils circle lower. Fiona bites her lip but doesn't pull away. Her hands clench at her sides, thin fingers white-knuckled.

A tendril traces the crease of Fiona's hip. Follows the line inward. Fiona's thighs press together instinctively but the goo is warm and patient and finds its way between them anyway, a slick thread of violet light sliding along the seam of her.

{fiona}"That's..." Fiona's voice catches. She doesn't finish the sentence.

{vessa}"Mm." Vessa tilts her head. Watching. The tendril doesn't push inside. It traces. Slow, deliberate strokes along the outside, learning the shape of her. The warmth clings where it touches, pools where it lingers. Fiona's hips twitch forward and she catches herself, jaw tight.

{vessa}"You're very sensitive here." Clinical. Almost conversational. The tendril presses flat against her, warm and wide, and Fiona makes a sound through her teeth. {vessa}"And very wet. That was fast."

{fiona}"Shut up." Barely a whisper.

{vessa}"No." Vessa smiles. The tendril narrows to a point and circles her entrance. Not entering. Tracing the rim, pressing just enough to part her, then pulling back. Fiona's breath goes ragged. Her hips chase the contact each time it retreats and Vessa lets them chase, gives her almost enough, then withdraws.

Fiona's hand shoots out and grabs Vessa's wrist. Translucent goo deforms under her grip and reforms around her fingers.

{fiona}"Stop teasing." Her voice is rough. Her eyes are bright and furious and desperate.

{vessa}"But you respond so beautifully when I tease." The tendril dips inside. Just the tip. Fiona's grip tightens and a sound escapes her that she'll deny later. Vessa holds it there, barely inside, letting the warmth pulse against walls that clench around something too small to grip.

Then she withdraws. Completely. The tendril pulls back to Fiona's inner thigh and rests there, warm and idle. Fiona's whole body shudders.

{fiona}"Why did you..."

{vessa}"Because you were about to finish." Violet eyes gleaming. {vessa}"And I'm not done with you yet."

Fiona stares at her. Chest heaving, thin frame trembling, slick between her legs with goo and her own arousal. She looks wrecked and they've barely started.

{vessa}"Interesting." Vessa watches Fiona's reactions with the precision of a scientist and the hunger of something else entirely.

Sylvie is already reaching for the second device, a brass spyglass with a spiraling crystal at one end. {sylvie}"Oh, you're going to love this one." She aims it at Vessa. {sylvie}"The Reduction Lens. It compresses morphogenic mass without losing it." She adjusts the crystal. {sylvie}"Fair warning, you'll get smaller."

{vessa}"How much smaller?"

Sylvie fires before answering.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_skinsuit_shrinking' }
    ]
};

// --- PART 3: SHRINKING ---

SCENES['tower_skinsuit_shrinking'] = {
    id: 'tower_skinsuit_shrinking',
    image: 'images/tower/skinsuit/shrinking.webp',
    imagePrompt: null,
    speaker: '',
    text: `Vessa shrinks in pulses. Each flash of the brass spyglass takes a foot off her. She goes from Fiona's height to waist-high to knee-high. At each stage she examines herself with the same clinical interest. At knee-high she looks up at Fiona, who is enormous from this perspective.

{vessa}"An interesting perspective shift." Her voice is smaller but still clear.

Another pulse. She stops at the size of a child's doll. A perfect miniature woman rendered in translucent violet gel, standing on the workbench, glowing faintly. Her features are still Vessa's. The expression is still knowing.

She steps off the edge of the workbench and lands without sound. Glides across the stone floor toward Fiona with liquid, unhurried strides. At this scale she barely reaches Fiona's ankle.

Fiona backs up. One step, two. Her calves hit the low bed and she sits down hard, bouncing on the cushions, legs parting on instinct to catch her balance. She looks down. The tiny violet figure is already between her feet, looking up.

{vessa}"Don't close your legs." Small voice, big authority.

Fiona doesn't close her legs.

Vessa climbs. Tiny goo hands grip the inside of Fiona's calf, her knee, her thigh. Each handhold leaves a warm print that fades slowly. Fiona watches, barely breathing, as the little glowing figure scales her like a cliff face. At mid-thigh, Vessa stops climbing.

She lets go.

Her body loses shape. The doll form dissolves, arms and legs and torso melting into a single warm mass of violet goo that spreads across Fiona's inner thigh. It flows upward, thick and slow, pooling in the crease where thigh meets hip. Then it spreads inward.

{fiona}"Oh..." Fiona's hands fist in the blanket. Her thighs tremble. {fiona}"Oh god."

The goo covers her completely. Labia, clitoris, the entrance itself, all of it disappearing under a warm, luminous layer of Vessa. Not entering. Coating. Every fold, every nerve, every surface wrapped in living warmth that pulses against her in slow, deliberate waves.

Fiona's back arches off the bed. Her jaw goes tight. She's trying to be quiet and failing. Her hips roll against the pressure and the goo rolls with her, shifting, gripping, pressing into every crease. A small, broken sound escapes her throat.

Then the goo thickens over her entrance. Presses. Not inside, not yet. Just the suggestion of it. A warm, blunt pressure that parts her just enough to feel the heat of what's waiting.

{fiona}"Please..." The word comes out wrecked. She doesn't even know what she's asking for.

{vessa}"Since you asked nicely." The goo pushes inside. All at once. Fiona's mouth opens and nothing comes out. Her whole body goes rigid, fingers clawing the blanket, heels digging into the mattress. Vessa fills her, warm and thick and everywhere, pressing against walls that have never felt anything like this.

Then the goo starts to move. Slow undulations from the inside while the layer outside keeps pulsing against her clit. Fiona's hips buck off the bed. She makes a sound that isn't a word, isn't even close to a word.

{vessa}"There you are." Warm. Satisfied. The goo pulses harder, faster, inside and out at once.

Fiona comes apart. Her back arches so hard her shoulders lift off the bed. The orgasm tears through her in waves, each one pulling a raw, broken cry from her throat. Her thighs clamp shut around nothing, because Vessa is inside and outside and there's nothing to clamp against, just warmth that keeps moving, keeps pulsing, riding her through it.

Sylvie picks up the third device while Fiona is still shaking. A wide-mouthed brass instrument shaped like a flower press. Her eyes are bright. Her hands are not entirely steady.

{sylvie}"The Membrane Reconfigurer." She aims it at Fiona's trembling body. {sylvie}"Don't worry. Seventy percent, remember?"

She fires before Fiona stops coming.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_skinsuit_skinsuit' }
    ]
};

// --- PART 4: SKINSUIT ---

SCENES['tower_skinsuit_skinsuit'] = {
    id: 'tower_skinsuit_skinsuit',
    image: 'images/tower/skinsuit/skinsuit.webp',
    imagePrompt: null,
    speaker: '',
    text: `It starts at her extremities and works inward. Fiona's fingers go glossy, then smooth, then rubbery. The color settles to a muted, uniform tan with a synthetic sheen. The change races up her arms, across her shoulders, down her torso.

She doesn't scream. She can't. Her mouth goes smooth, sealed. Her body goes flat. Not collapsing... flattening. Like someone took everything inside and simply removed it, leaving the container behind.

What settles onto the bed is a skin. Fiona-shaped, Fiona-colored, laid out like a costume waiting to be worn. Arms splayed at the sides. Legs flat. The face is a mask... her features pressed into smooth rubber, eyes open but empty, mouth a seamless line.

She is impossibly thin. No chest. No muscle. No curves of any kind. Just a girl-shaped membrane, flat on a bed.

{sylvie}"Oh." Sylvie whispers it. Her pen is motionless. {sylvie}"That's... more thorough than I expected."

Between the suit's legs, violet goo still clings to the rubber. Vessa's formless mass shifts, pulling away from the surface that is no longer skin, no longer warm.

{vessa}"I can still feel her." The voice comes from the goo pooled between the suit's thighs. {vessa}"She's aware. Thinking. Feeling." A pause. The violet mass pulses. {vessa}"She's not afraid."

Sylvie leans close to the suit's face. Empty hazel eyes stare at the ceiling. The rubber chest doesn't rise or fall. There is no breath to take. But somewhere inside that thin membrane, Fiona exists.

{sylvie}"Can she feel this?" Sylvie touches the suit's arm. The rubber dimples under her finger.

The violet glow flares. {vessa}"She felt that. She felt everything I was doing too." A beat. {vessa}"She wants me to go inside."

{sylvie}"Absolutely not." Sylvie straightens. The breathless wonder is gone, replaced by something closer to alarm. {sylvie}"We don't know what happens if living goo enters a membrane shell. The neural feedback alone could..." She waves her hand. {sylvie}"No. I'm putting you back."

She turns to the workbench. Seven brass devices, all roughly the same color, all roughly the same size. She grabs one without looking, already adjusting the dial.

{vessa}"Sylvie." The voice from between the suit's thighs is calm. Patient. {vessa}"She's asking for it. I can hear her."

{sylvie}"She's a membrane. She can't ask for anything." Sylvie aims the device at the violet mass. {sylvie}"Hold still. This reverses the dissolution process and you'll be solid again in..."

The goo moves. Not away from the device. Toward the suit. Vessa gathers herself into a tight, bright knot and pours through the vaginal slit before Sylvie can fire. Quick, deliberate, gone.

{sylvie}"Vessa!" Sylvie lunges forward but there's nothing to grab. The goo is inside. The rubber surface where Vessa pooled a second ago is smooth and empty.

Nothing happens. Then the suit's fingers twitch. Then a faint violet glow blooms under the rubber skin of the abdomen, spreading.

{sylvie}"That's... she shouldn't be able to..." Sylvie frowns. Looks down at the device in her hands. Turns it over. Reads the engraving on the barrel.

Her face changes.

{sylvie}"Oh." Very small. {sylvie}"That's not the Dissolution Array."

The brass frame in her hands has concentric rings. The Morphogenic Amplifier. And she just had it aimed directly at Vessa.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_skinsuit_entry' }
    ]
};

// --- PART 5: ENTRY ---

SCENES['tower_skinsuit_entry'] = {
    id: 'tower_skinsuit_entry',
    image: 'images/tower/skinsuit/entry.webp',
    imagePrompt: null,
    speaker: '',
    text: `The violet glow races through Fiona. It branches along her arms, floods her legs, fills every inch of rubber with faint luminance. Her hands flex as something inside them takes shape. Fingers curl, uncurl, curl again.

Her chest rises. Not much... just enough to lift off the bed. Her legs take on dimension, filling from hollow tubes into something resembling limbs. But the shape that forms is Fiona's own. Thin arms. Bony hips. A body with nothing on it. She fills to exactly what she was before... a girl made of sharp angles and flat planes.

{sylvie}"Okay. Okay." Sylvie sets the Amplifier down like it might bite her. She's watching through her magnifying lens, pen tapping nervously against her notebook. {sylvie}"She's matching Fiona's baseline. That's... that should be fine. The amplification may not have..."

But the filling doesn't stop. Fiona's chest pushes outward, past flat, past nothing, into a gentle handful that was never there. Her hips widen. Her butt lifts off the bed with new weight. Subtle curves where Fiona has none.

{sylvie}"Oh no." Sylvie's pen goes still. Then it starts moving very fast. {sylvie}"Those aren't Fiona's proportions. That's... those are curves Fiona doesn't have. That's..."

That's Vessa's body. Filling Fiona's skin. And with the Amplifier's charge running through her, she's not going to stop there.

Fiona sits up in a single fluid motion. Not her cautious, wary movement... this is confident, unhurried. She swings her legs off the bed, feet touching the floor. Stands. Rolls her shoulders. Stretches with the languid grace of a woman waking from a nap.

Then she raises her chin. The face is Fiona's. The dirty blonde hair, the thin features, the tanned skin. But the eyes that open are violet. And the smile that forms is knowing, slow, and entirely Vessa's.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_skinsuit_reveal' }
    ]
};

// --- PART 6: REVEAL ---

SCENES['tower_skinsuit_reveal'] = {
    id: 'tower_skinsuit_reveal',
    image: 'images/tower/skinsuit/reveal.webp',
    imagePrompt: null,
    speaker: '',
    text: `{vessa}"Hello." Vessa's voice from Fiona's mouth. Not Fiona's voice shaped by someone else... Vessa's own, measured and warm and faintly amused, coming from a face that isn't hers. {vessa}"She fits me quite well, actually." She runs Fiona's hands down Fiona's sides. {vessa}"Like a glove."

Sylvie circles the Vessa-in-Fiona form, scribbling. When Vessa walks, she walks with her own stride, long and confident, utterly wrong for Fiona's small frame. The disconnect between Fiona's body and the way it's being worn is mesmerizing.

{sylvie}"The morphogenic integration is seamless." Sylvie traces a finger along Fiona's arm. {sylvie}"Your goo is interfacing with her nerve network. You can feel what she feels?"

{vessa}"Better than that." Vessa holds up Fiona's hands, examines them, turns them over. {vessa}"I can hear her."

She taps Fiona's temple with Fiona's finger. Violet eyes go distant for a moment, listening.

{vessa}"She's asking if I'm comfortable." A low laugh, warm and surprised. {vessa}"Darling, I should be asking you that."

Silence. Vessa listens.

{vessa}"She says she can feel my shape pressing against the inside of her skin. Where she's flat and I'm not." Violet eyes refocus, gleaming with amusement. {vessa}"Her vocabulary is more colorful than mine. Let's say she's enjoying it."

She cups Fiona's breasts... Vessa's modest curves stretching Fiona's flat skin. Runs a thumb over a nipple that shouldn't be this sensitive, because Fiona shivers.

{vessa}"Oh." Soft. Surprised. {vessa}"When I touch the outside, she feels it on her skin. When I shift inside, she feels the pressure. We're both being touched at once."

The moan that escapes is Vessa's, low and surprised, but the face it's wearing is Fiona's.

Sylvie's hand drifts to the workbench. To the brass frame with concentric rings she set down minutes ago. The Morphogenic Amplifier. The device she grabbed by accident. The one she was too afraid to fire.

She picks it up. Turns it over in her hands. The rings hum faintly.

{sylvie}"The integration is stable." She's talking to herself, pen tapping against her lip. {sylvie}"Neural feedback is positive. No tissue rejection. If I amplified the mass inside the membrane now, the goo should expand proportionally within the shell and..."

{vessa}"Do it." Violet eyes lock onto Sylvie. Fiona's mouth, Vessa's command.

Sylvie aims the Amplifier at Fiona. Her hands are steady. The scientist won.

{sylvie}"Whatever's inside gets bigger."

She fires. The rings pulse with violet light.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_skinsuit_chest' }
    ]
};

// --- PART 7: GROWTH (c4 b4) ---

SCENES['tower_skinsuit_chest'] = {
    id: 'tower_skinsuit_chest',
    image: 'images/tower/skinsuit/fullform.webp',
    imagePrompt: null,
    speaker: '',
    text: `The growth is immediate and everywhere at once.

Vessa's modest breasts surge forward. What was a gentle handful rounds into fullness, then keeps going... prominent, taut, stretching Fiona's skin glossy as it strains to contain shapes her body was never built for. Her hips widen in tandem, her butt rounding outward, filling, lifting. Her thighs thicken. Fiona's whole body reshapes from within, Vessa's goo mass amplified and expanding in every direction.

But the shape is wrong. Not wrong like ugly. Wrong like uncanny. Fiona's breasts don't hang the way breasts should at this size. They sit high and round and impossibly perky, like balloons pressed against the inside of a rubber glove. Her butt has the same unnatural tightness... perfectly spherical, defying gravity, skin stretched smooth and shiny over curves that have no sag, no softness, no give. She looks like a doll. A toy someone inflated.

{sylvie}"The skin hasn't adapted." Sylvie leans close, fascinated. She presses a fingertip into the side of one breast and it barely dimples. {sylvie}"Fiona's membrane is still shaped for a flat body. The goo is pushing outward but the skin isn't stretching to match." She prods again. {sylvie}"It's like a water balloon. The pressure is holding the shape, not the anatomy."

{vessa}"Oh..." Vessa's composure cracks for the first time. She cups Fiona's breasts and they don't shift in her hands. They hold their shape, round and firm and absurdly perky. {vessa}"That's... not how these are supposed to feel."

{sylvie}"Everywhere." Sylvie whispers it, circling Fiona with her notebook. She's forgotten she's worried. {sylvie}"She's growing everywhere and the membrane is holding it all tight. Look at this." She lifts one of Fiona's breasts from underneath and lets go. It barely moves. {sylvie}"Zero droop. The internal pressure is extraordinary."

Vessa bounces on her heels. Everything holds. Fiona's breasts don't sway, they bounce as a unit, perfectly round, snapping back to position. Her butt does the same... tight, high, cartoonishly perky.

{vessa}"She has opinions about this." Vessa pauses. Listens. Whatever Fiona is thinking makes violet eyes go wide. Then the smile returns, wider. {vessa}"Her exact words were 'fat tits.'" A beat. {vessa}"I believe she surprised herself."

Vessa runs Fiona's hands over her taut curves. Presses into them. The goo pushes back from inside, firm and warm, and Fiona's skin stretches just enough to feel every ridge of her fingerprints.

{vessa}"She loves the stretch." Quiet. Almost reverent. {vessa}"She can feel her skin pulled tight over every inch of me. Like wearing a shirt three sizes too small, but everywhere, all at once." Violet eyes half-close. {vessa}"She says it's the best thing she's ever felt. She wants it tighter."

{sylvie}"Tighter?" Sylvie's pen stops. {sylvie}"The membrane integrity could..."

{vessa}"She doesn't care." The look of someone who has realized she has power and is deciding what to do with it. {vessa}"I wonder what happens if I redistribute."

{sylvie}"The amplified mass should be malleable within the..."

Vessa isn't listening. Goo surges into Fiona's chest. All of it.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_skinsuit_butt' }
    ]
};

// --- PART 8: MASS SHIFT — CHEST ---

SCENES['tower_skinsuit_butt'] = {
    id: 'tower_skinsuit_butt',
    image: 'images/tower/skinsuit/chest.webp',
    imagePrompt: null,
    speaker: '',
    text: `Fiona's breasts keep swelling. Past heavy, past enormous, into territory that has no name, just physics straining against skin. Her butt flattens to almost nothing as Vessa pulls every drop of mass upward, concentrating it into two enormous, impossibly heavy breasts that defy Fiona's thin frame.

She staggers. The weight pulls her forward. Fiona's small shoulders were not designed for this and her skin stretches shiny and taut, nipples dragged downward by the sheer mass.

{vessa}"Interesting." Vessa's voice is clinical even as Fiona's body struggles to stay upright. She hefts one of Fiona's breasts with both hands. It overflows them. {vessa}"She has opinions about this."

{sylvie}"What's she saying?" Sylvie's voice is slightly higher than usual.

{vessa}"She's saying..." A pause. Vessa tilts her head, listening. {vessa}"'More.' Very specifically and repeatedly." Violet eyes bright with delight. {vessa}"And then something about how she always knew she'd look good with these. She's wrong, of course. This is absurd." Fiona shifts, breasts swaying. {vessa}"But she doesn't care."

Vessa pinches a nipple from outside while pressing goo against it from inside. Fiona arches, a moan escaping her mouth.

{vessa}"Enough of that." The amusement sharpens. {vessa}"Let's try the other direction."

Goo drains from Fiona's chest like water from a basin. Flows downward through Fiona's torso, past her hips, pooling in her butt.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_skinsuit_vagina' }
    ]
};

// --- PART 9: MASS SHIFT — BUTT ---

SCENES['tower_skinsuit_vagina'] = {
    id: 'tower_skinsuit_vagina',
    image: 'images/tower/skinsuit/butt.webp',
    imagePrompt: null,
    speaker: '',
    text: `Vessa walks Fiona to the bed. Climbs on. Settles on hands and knees, Fiona's thin arms braced against the mattress, her flat butt raised. She looks back over Fiona's shoulder and the violet eyes glint.

{vessa}"She wants to see this one happen." A pause. Listening. {vessa}"Her words were 'make it huge.'"

Goo drains from Fiona's chest. It collapses to almost nothing, her natural flatness returning above the waist while everything below expands. Her butt rounds outward, past full, past absurd, into something enormous. Her hips strain against the skin. Her thighs press together under the new weight. The bed creaks.

Vessa looks back over Fiona's shoulder at the massive curve rising behind her. Gives it a bounce. Fiona's whole body shudders with the momentum.

{vessa}"She's watching it grow." Vessa's voice is warm with amusement. Another bounce, heavier. {vessa}"She says it feels like sitting on a cushion. On her hands and knees." A pause. {vessa}"She wants to know if it jiggles."

Vessa bounces again. It jiggles. The bed frame protests.

A sound escapes Fiona's mouth. Not a moan. A laugh. Raw and surprised and delighted.

{vessa}"She says..." A long pause. Vessa's expression flickers... amused and something warmer. {vessa}"She can't stop looking at it. She's watching over her own shoulder and she thinks it's the most beautiful thing she's ever seen." Vessa's voice softens, just barely, before the composure returns. {vessa}"I tell her she looks ridiculous. She doesn't care."

Silence. Vessa listens. Then violet eyes go wide. Then narrow. Then the slow, dangerous smile.

{vessa}"Oh." A breath of a laugh. {vessa}"Oh, Fiona. You filthy thing."

{sylvie}"What? What's she saying?"

{vessa}"She wants me to..." Vessa presses Fiona's face into the pillow to muffle what comes next. Her voice drops, delighted. {vessa}"She wants a massive pussy. Those are her words. She wants to feel it swell until she can't close her legs."

{sylvie}"She said that?" Sylvie's pen has stopped moving entirely.

{vessa}"Repeatedly." Vessa shifts Fiona's weight on the bed, settling lower, spreading Fiona's knees apart. {vessa}"The quiet ones always surprise you."

Goo shifts. Drains from Fiona's butt, concentrates between her legs. But not all of it. The rest redistributes evenly... settling to something balanced, full and heavy everywhere. Between Fiona's spread knees, the pressure builds.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_skinsuit_fullform' }
    ]
};

// --- PART 10: HYPER VULVA / SETTLE ---

SCENES['tower_skinsuit_fullform'] = {
    id: 'tower_skinsuit_fullform',
    image: 'images/tower/skinsuit/vagina.webp',
    imagePrompt: null,
    speaker: '',
    text: `Vessa rolls Fiona onto her back. Spreads her legs wide, knees up, and props herself on the pillows so she can watch. Violet eyes look down along Fiona's body to the space between her thighs.

{vessa}"She wanted to see this." The smile is indulgent. {vessa}"Let's give her the view."

Fiona's vulva swells outward as Vessa pushes from within. Her labia grow thick, pronounced, flushed with warmth. Her clitoris pushes forward, growing from a hidden nub into a swollen, visible bud. Then keeps growing.

Goo leaks from between her lips as it swells. Thin violet strands seeping out with each pulse of growth, dripping onto the blanket. Vessa is pushing so much mass into one area that Fiona's skin can barely contain it. Every time the labia stretch wider, more goo escapes... warm, luminous trails running down Fiona's inner thighs, pooling in the creases of her hips.

{vessa}"Full circle." Vessa murmurs it. One of Fiona's hands reaches down, traces her swollen labia, and comes away with violet goo clinging to her fingertips. {vessa}"I was the size of a grain of sand on this spot an hour ago. Now I'm wearing it."

Between Fiona's spread thighs, her vulva becomes something excessive... lips parted and glistening, prominent enough to see from across the room. Goo oozes steadily from between them, the overflow too much for her body to hold. The blanket beneath her is stained violet.

She presses Fiona's clitoris from both sides at once... goo from inside, fingertip from outside. Fiona jerks. A cry escapes her, raw and high. More goo squeezes out with the clench.

{vessa}"She's been close since the chest." Vessa's breath catches. {vessa}"She's been screaming at me to..."

Fiona seizes. The orgasm rips through both of them. Her voice, raw and unfiltered, tears through the lab with words that make Sylvie's pen clatter to the floor. Vessa's composure shatters for one bright instant... violet eyes rolling back, mouth open, wordless. Goo pulses from between Fiona's legs in thick, warm floods, soaking the blanket.

Then it passes. Fiona sags into the pillows. Breathing hard.

Goo redistributes, drawing back inside. The swollen vulva settles, the excess mass pulling inward, spreading evenly through Fiona's body. Her breasts round out, high and taut. Her hips fill. Her butt lifts with new weight. Everything returns to that impossible, balloon-tight shape from before... perky, shiny, gravity-defying curves packed into Fiona's skin like a glove stuffed past its limit.

{vessa}"There." Vessa runs Fiona's hands over the restored proportions. Satisfied. Proprietary. {vessa}"That's better."

She swings Fiona's legs off the bed. Stands. The move is different now. Not playful. Not indulgent. When Vessa was shifting mass and relaying Fiona's dirty requests, there was a warmth to it, a shared delight. That's gone. What's left is the knowing smile, sharpened to an edge.

{vessa}"She's resting." Vessa says it the way you'd say a child has been put to bed. {vessa}"She's had enough. I haven't."

Sylvie stands at the bedside, notebook abandoned, lab coat open. Her cock strains visibly against her clothes. She's been watching everything, and it shows.

Vessa crosses the lab to her. Fiona's body moves with Vessa's stride now, confident, unhurried, those round breasts bouncing without swaying. She stops close enough that Fiona's skin almost touches Sylvie's coat.

{vessa}"You built all of this." One finger traces the outline of Sylvie's cock through the fabric. {vessa}"The devices. The goo. This body." She gestures down at Fiona's taut, impossible curves. {vessa}"Don't you want to feel what you made?"

Sylvie swallows. Her hand twitches toward Fiona's hip, then stops.

{vessa}"That wasn't a question." Fiona's hand wraps around Sylvie's cock through her clothes. Sylvie's breath catches. {vessa}"Take off your coat. Come to bed."

Violet eyes hold Sylvie's. The test subject is giving the orders now. And Sylvie, for the first time all evening, does exactly what she's told.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_skinsuit_sylvie' }
    ]
};

// --- PART 11: SYLVIE'S TURN ---

SCENES['tower_skinsuit_sylvie'] = {
    id: 'tower_skinsuit_sylvie',
    image: 'images/tower/skinsuit/sylvie.webp',
    imagePrompt: null,
    speaker: '',
    text: `Fiona's hand on Sylvie's cock guides her in. When Sylvie enters Fiona, she enters Vessa... goo closing around her shaft like a warm, slick fist. Not passive. Active. The goo moves, grips, pulses, works her from every direction at once.

{sylvie}"Oh..." Sylvie's hands grab Fiona's hips. Her eyes are wide, unfocused. {sylvie}"That's not... that's not a vagina, that's..."

{vessa}"That's me." Vessa's voice is low, amused, in total control. She doesn't move Fiona's hips. She doesn't need to. Inside, her goo works Sylvie's cock with deliberate, rhythmic precision... squeezing, stroking, milking. An internal grip that touches every surface at once.

Sylvie moans. Her hips thrust and Vessa's goo moves with her, never losing contact, never letting a single inch go untouched. Sylvie's been inside women before, but this isn't skin. This is a living substance that knows exactly what it's doing.

{sylvie}"I need to... let me..." Sylvie tries to pull back. She can't. The goo has tightened around the base of her cock, a firm ring holding her locked inside Fiona. She pulls harder. Nothing.

{vessa}"No." Simple. Warm. Absolute. {vessa}"You're not going anywhere."

The realization crosses Sylvie's face. The scientist who spent the evening firing devices at two women is now buried inside one of them, and the woman she was testing has her cock in a grip she can't break.

{vessa}"Shh." The goo pulses. Sylvie's protest dissolves into a groan. {vessa}"You wanted unprecedented sensations. I'm providing."

The goo works her with merciless precision. Squeezing, releasing, stroking, teasing the head. Sylvie's legs tremble. Her breathing goes ragged. She's climbing fast.

{sylvie}"I'm going to..." Sylvie's voice cracks. Her hips stutter. She's right at the edge.

Vessa feels it. The twitch. The swell. The half-second before release.

A thin tendril of goo extends from the mass wrapped around Sylvie's cock, warm and impossibly slick, and pushes into her urethra. Not deep. Just enough. A plug. The tendril swells to fill the opening, sealing it shut from the inside.

Sylvie's orgasm hits. Her whole body convulses, cock pulsing hard inside Fiona, and nothing comes out. The pressure builds with nowhere to go. Her eyes fly open. Her mouth opens. A strangled, desperate sound escapes her.

{sylvie}"What... I can't..." She's cumming and she's blocked and the sensation is indescribable. Every pulse of her cock meets the goo plug and rebounds, the pressure doubling back through her, waves crashing against a wall.

{vessa}"Not yet." Vessa's voice is calm. Almost tender. {vessa}"You'll cum when I let you cum."

The goo keeps working her cock. Doesn't stop. Doesn't slow down. Sylvie shakes, trapped in an orgasm that won't release, every contraction building pressure that has nowhere to go. Her legs buckle. Fiona's hands catch her hips and hold her upright, hold her inside.

{sylvie}"Please..." The word is barely a whisper. {sylvie}"Vessa, please, I can't take..."

{vessa}"Yes you can." The tendril pushes deeper. Sylvie's eyes go wide and a sound escapes her that has no words.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_skinsuit_transfer' }
    ]
};

// --- PART 12: TRANSFER ---

SCENES['tower_skinsuit_transfer'] = {
    id: 'tower_skinsuit_transfer',
    image: 'images/tower/skinsuit/transfer.webp',
    imagePrompt: null,
    speaker: '',
    text: `The goo tendril slides deeper. Sylvie shakes, hands white-knuckled on Fiona's hips, overwhelmed by a sensation she has no framework for. Something warm, alive, and impossibly intimate moving through her cock from the inside.

{sylvie}"I can't..." Her voice breaks. {sylvie}"It's too..."

{vessa}"You can." Vessa's tone is patient. Indulgent. A woman savoring a fine wine. {vessa}"And I'm not stopping."

The tendril reaches deeper. Finds the branching pathways. Follows them. Sylvie feels warmth pour into her testicles and her legs nearly give out.

{vessa}"She's watching this, you know." Vessa glances at nothing, listening to Fiona's thoughts. {vessa}"She thinks it's the most incredible thing she's ever seen." A pause. {vessa}"Her words were considerably less refined."

More goo. Not just a tendril now. Vessa pours herself through Sylvie's urethra in a steady stream. Inside Fiona, her heavy breasts begin to shrink. Her round butt softens. The curves that Vessa filled are emptying as she transfers, flowing out of Fiona and into Sylvie through the narrow channel between them.

Sylvie's testicles swell visibly. She looks down and makes a sound between a gasp and a laugh. {sylvie}"They're... I need..." She looks at you, desperate. {sylvie}"The Expansion Calibrator. On the bench. The one with the copper coils. Now. Please."

You grab it. Aim it at Sylvie's swelling testicles. Fire. The device hums and the skin stretches, accommodating the growing mass. Sylvie groans as her balls expand, heavy and taut with violet light glowing through the skin.

The transfer accelerates. With room to fill, Vessa pours through faster... a thick, steady current instead of a trickle. Inside Fiona, the curves deflate rapidly. Breasts flattening, hips narrowing, the goo draining out of her like water from a tub. In seconds, Sylvie's testicles hang enormous and heavy with the entirety of Vessa contained within them.

Fiona collapses. Without Vessa inside, her rubber skin goes limp... her body emptying like a puppet with cut strings. She slumps against the workbench, hollow again, flat again.

You reach for the Membrane Reconfigurer. Reverse the settings. Fire at the empty suit.

Fiona comes back. Rubber becomes skin. Flat becomes thin. Empty becomes breathing. She gulps air, her own body again... flat, small, all sharp angles... and her hazel eyes are dazed and bright and entirely her own. She doesn't speak. She's trembling. But the look on her face is not horror. It's afterglow.

Sylvie can barely stand. Her testicles are the size of grapefruits, heavy and tight with the entirety of Vessa contained within them. The pressure is immense. Every micro-movement of goo sends waves radiating through her.

{sylvie}"I... oh god... I'm going to..."`,
    actions: [
        { label: 'Continue', nextScene: 'tower_skinsuit_eruption' }
    ]
};

// --- PART 13: ERUPTION ---

SCENES['tower_skinsuit_eruption'] = {
    id: 'tower_skinsuit_eruption',
    image: 'images/tower/skinsuit/eruption_v6.webp',
    imagePrompt: null,
    speaker: '',
    text: `Sylvie doesn't touch herself. She doesn't need to. The pressure of Vessa inside her is enough. Every shift of goo sends waves through her, and Vessa, even compressed into the tight space of Sylvie's testicles, is still deliberately moving.

{sylvie}"Vessa, I can't hold..."

She can't. Sylvie orgasms with a cry that echoes off the tower stones. Her cock pulses and what shoots out is Vessa's goo... thick, warm, luminous violet, erupting in a volume that has nothing to do with cum.

It is an orgasm. But it's not just an orgasm. This is an evacuation. Goo erupts from her in thick, luminous ropes, splashing across the stone floor in heavy wet arcs. Her cock throbs and another surge follows, and another, her whole body shuddering with each wave as Vessa pours out of her.

It doesn't stop. Ten seconds. Twenty. Sylvie's legs buckle and she catches the workbench, barely standing, and still the goo comes. Her testicles shrink visibly with each pulse, the enormous swell collapsing in slow stages as a person's worth of living matter empties through her. Thirty seconds. Her moans have gone hoarse. Her knuckles are white on the wood. The puddle on the floor spreads wide, luminous violet running between the cracks in the stone.

Nearly a minute before the last of it leaves her. The final pulse is thin, translucent, and Sylvie's cock twitches twice more with nothing left to give. She sags against the workbench. Her testicles hang empty and spent. Her breathing is ragged and broken and something close to laughter.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_skinsuit_release' }
    ]
};

// --- PART 14: RELEASE ---

SCENES['tower_skinsuit_release'] = {
    id: 'tower_skinsuit_release',
    image: 'images/tower/skinsuit/release.webp',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        gameState.flags.tower_skinsuit_seen = true;

        this.text = `The goo pools on the floor. An enormous puddle, wider than Sylvie is tall. It shimmers. Then moves.

It draws inward, coalescing, but not rising. A shape forms on the stone floor... hips first, then legs that stretch long and lazy across the puddle. Arms. Shoulders. A head tilting back against the cool stone. Black hair fans out around her, rendered in luminous violet gel, pooling like ink in water.

Vessa lays on the floor of the lab, mostly formed, significantly curvier than when the evening started, and making no effort whatsoever to get up. Her breasts are full and heavy, settling to either side with a weight that wasn't there before. Her hips and ass round with unfamiliar curves, the goo beneath her still spreading in a thin violet puddle that extends well past her body. She hasn't fully solidified. The edges of her blur into the puddle, her fingers trailing off into liquid where they rest against the stone. Her eyes are the brightest points on her body... the same violet, but denser now, almost solid. Her mouth curves into a slow, contented smile.

{vessa}"Mmm." She doesn't open her eyes. One hand drifts lazily across her stomach, leaving a faint trail of light. {vessa}"I think I'll stay here for a moment."

On the floor nearby, Fiona has curled up against the base of the workbench, arms wrapped around her thin body, trembling. Not upset. Overwhelmed. She lifts her head and stares at Vessa's new shape sprawled across the stone.

{fiona}"...holy shit." Small and rough and impressed.

{vessa}"Yes." Vessa opens one eye. Something warm passes between them... an understanding that doesn't need a goo link to communicate. {vessa}"Exactly."

Sylvie has slid to the floor against the far wall, lab coat pooled around her, breathing hard, staring at the ceiling with the expression of someone comprehensively outmaneuvered by her own experiment.

{sylvie}"I need..." She swallows. {sylvie}"I need to take better notes next time."

{fiona}"Next time?" Fiona's voice cracks. You can't tell if she's laughing or overwhelmed. Maybe both.

Vessa stretches on the floor like a cat in a sunbeam, goo rippling outward from the movement. She extends a hand toward Fiona. The fingers solidify just enough to grip.

{vessa}"Come. Help me up." A pause. {vessa}"In a minute." She settles back into the puddle, violet light shifting across her skin like candlelight. {vessa}"Maybe two."

She catches your eye from the floor. The knowing smile. A lazy wink.

The tower has never been so quiet.`;
    },
    actions: [
        { label: 'Leave them to it', nextScene: 'town_exit_workshop',
          effects: [
              { type: 'addTrust', npc: 'vessa', amount: 3 },
              { type: 'addTrust', npc: 'fiona', amount: 3 },
              { type: 'advancePhase' }
          ]
        }
    ]
};
