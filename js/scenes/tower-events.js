// ============================================
// TOWER & MULTI-NPC EVENT SCENES
// Extracted from scenes.js for modularity
// ============================================

// ============================================
// BLACKSTONE TOWER - REVEAL SCENE
// ============================================

// Beat 1 - Entry
SCENES['tower_reveal_entry'] = {
    id: 'tower_reveal_entry',
    image: 'images/story/tower_entry_key.webp',
    imagePrompt: null,
    speaker: '',
    text: `**[Story Reveal]**

You hold up the crystalline key. It hums with recognition, resonating with something beyond the heavy oak door.

The lock clicks. The door swings inward on silent hinges.

Beyond it, a winding staircase spirals upward into warm amber light. The smell of tea and something faintly chemical drifts down. Not musty. Not abandoned.

**Someone lives here.**

Your heart pounds as you begin to climb.`,
    actions: [
        { label: 'Ascend the stairs', nextScene: 'tower_reveal_lab' }
    ]
};

// Beat 2 - The Lab
SCENES['tower_reveal_lab'] = {
    id: 'tower_reveal_lab',
    image: 'images/locations/tower.webp',
    imagePrompt: null,
    speaker: '',
    text: `You reach the top and stop, breath catching.

A sprawling workshop stretches before you, making yours look like a child's toy set. Devices everywhere, half of them unrecognizable. Notes pinned to every surface. Crystals humming on shelves. Brass instruments gleaming in the warm light.

Your uncle's work. But more. So much more.

Then **a crash from the next room**, followed by a muffled "oh, bother."

You freeze. That was a woman's voice.`,
    actions: [
        { label: 'Investigate', nextScene: 'tower_reveal_meeting' }
    ]
};

// Beat 3 - The Meeting
SCENES['tower_reveal_meeting'] = {
    id: 'tower_reveal_meeting',
    image: 'images/tower/sylvie_portrait.webp',
    imagePrompt: null,
    speaker: '',
    text: `You peer through the doorway.

A white-haired woman in a lab coat kneels among broken glass, picking up shards with practiced unconcern. Beneath the coat, a short red cocktail dress. Full lips pursed in mild annoyance. Hair pulled back in a tight bun.

She looks up.

**Her face lights up with immediate recognition.**

Not the confusion of a stranger. Not alarm at an intruder. Joy. Pure, uncomplicated joy, as if she's been waiting for this moment.

As if she knows exactly who you are.`,
    actions: [
        { label: '"Who... who are you?"', nextScene: 'tower_reveal_greeting' }
    ]
};

// Beat 4 - The Greeting (Gender-Aware)
SCENES['tower_reveal_greeting'] = {
    id: 'tower_reveal_greeting',
    image: 'images/tower/sylvie_portrait.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: '',
    onEnter: function() {
        const startedMale = gameState.player.gender === 'male';
        const hasVagina = gameState.player.body.genitalia === 0;
        const hasPenis = gameState.player.body.genitalia === 1;

        // Determine the greeting based on starting gender and current genitalia
        let greeting = '';
        if (startedMale && hasPenis) {
            greeting = '"My nephew!"';
        } else if (startedMale && hasVagina) {
            greeting = '"My nephew!" She pauses, eyes flicking downward briefly. "...Niece! My niece, I should say."';
        } else if (!startedMale && hasVagina) {
            greeting = '"My niece!"';
        } else if (!startedMale && hasPenis) {
            greeting = '"My niece!" Her eyes drift downward with undisguised curiosity. "Oh my. I see you\'ve become a connoisseur!"';
        }

        // Body comment based on highest transformed stat
        const body = gameState.player.body;
        const natural = gameState.player.naturalBody;

        const changes = {
            chest: body.chest - (natural?.chest || body.chest),
            butt: body.butt - (natural?.butt || body.butt),
            muscle: body.muscle - (natural?.muscle || body.muscle),
            genitaliaSize: body.genitaliaSize - (natural?.genitaliaSize || body.genitaliaSize)
        };

        let maxChange = 0;
        let maxStats = [];
        for (const [stat, change] of Object.entries(changes)) {
            if (change > maxChange) {
                maxChange = change;
                maxStats = [stat];
            } else if (change === maxChange && change > 0) {
                maxStats.push(stat);
            }
        }

        let bodyComment = '';
        if (maxChange === 0) {
            bodyComment = '\n\nShe tilts her head, studying you. "You haven\'t tried any of the devices yet, have you? Oh, you really should. They\'re perfectly safe." A pause. "Mostly."';
        } else if (maxStats.length > 1) {
            bodyComment = '\n\nHer eyes take in your transformed figure with obvious approval. "You\'ve grown so much! All over! The devices have been treating you well, I see."';
        } else if (maxStats[0] === 'chest') {
            bodyComment = '\n\nHer gaze lingers on your chest. "And such lovely work on the upper body! The proportioning is excellent. Did you use the Chest Shaper? That was always one of my favorites."';
        } else if (maxStats[0] === 'butt') {
            bodyComment = '\n\nShe glances at your hips with a knowing smile. "I see you\'ve been giving the Rear Sculptor a workout. Very nice. The weight distribution looks natural."';
        } else if (maxStats[0] === 'muscle') {
            bodyComment = '\n\nShe takes in your physique with raised eyebrows. "Oh, you\'ve been using the Form Enhancer! Look at that definition. Very impressive."';
        } else if (maxStats[0] === 'genitaliaSize') {
            bodyComment = '\n\nHer eyes drift downward again with a mischievous glint. "And you\'ve been... experimenting with scale, I see. Good. Size is underrated."';
        }

        this.text = `She abandons the broken glass entirely and rises, brushing off her lab coat. A pair of goggles perched on her forehead catches the light as she tilts her head.

${greeting}${bodyComment}

"Oh, I'm Sylvie, by the way. Your aunt. Obviously." She adjusts her goggles, then pats her pockets as if looking for something. "Where did I put the — ah, never mind."

She notices the crystalline key in your hand and her smile widens.

"Ah, good, you kept it! I was worried you might have lost it. Or pawned it. Corwin would have given you a decent price, I imagine."

You stare at her. The cloaked figure. The warm voice. The key pressed into your palm.

**That was her.**

She's already moving past you toward the main room, gesturing for you to follow, completely oblivious to your shock.

"Well don't just stand there, I'll put the kettle on."

She says it like you've just dropped by for your usual afternoon visit. Like she didn't visit you in disguise weeks ago and vanish into the night. Like any of this makes sense.`;
    },
    actions: [
        { label: 'Follow her', nextScene: 'tower_reveal_explanation' }
    ]
};

// Beat 5 - The Explanation
SCENES['tower_reveal_explanation'] = {
    id: 'tower_reveal_explanation',
    image: 'images/story/sylvie_tea.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: '',
    onEnter: function() {
        // Check if any genitalia swaps have occurred (player or NPC)
        const playerSwapped = gameState.player.body.genitalia !== gameState.player.naturalBody?.genitalia;
        const npcSwapped = Object.values(gameState.npcs || {}).some(npc =>
            npc.body?.genitalia !== undefined && npc.naturalBody?.genitalia !== undefined &&
            npc.body.genitalia !== npc.naturalBody.genitalia
        );
        const anyGenitaliaSwap = playerSwapped || npcSwapped;

        let permanenceDialogue = '';
        if (anyGenitaliaSwap) {
            permanenceDialogue = `She sets down her cup, expression flickering with something that might be guilt.

**"Oh... you've already figured that out, haven't you."**

A beat.

"Yes, well. I probably should have mentioned it sooner. The genital changes are... permanent. I never quite solved that one." She waves a hand. "Everything else reverses eventually. But that particular transformation? It sticks."

She doesn't seem particularly sorry.`;
        } else {
            permanenceDialogue = `She sets down her cup, suddenly serious.

"There is one thing you should know. The devices can do wonderful things, but the genital transformations? Those are permanent. I never found a way to reverse them."

She picks up her tea again.

"Just something to keep in mind. For yourself and anyone you might... experiment on."`;
        }

        this.text = `She pours tea with the practiced ease of someone who's done this a thousand times, pausing mid-pour to check a bubbling flask on a nearby burner. Satisfied, she continues pouring. You sit across from her at a cluttered workbench, mind reeling.

"Oh, that. Yes, sorry about the funeral. I heard it was lovely."

She says it like she's apologizing for missing brunch.

"Your uncle — well, me — I built those devices for myself, you see." She stirs her tea with something that might be a glass rod or might be an experimental implement. "I was the someone who couldn't accept their body. Always was."

She sips her tea. "The feminizing effect everyone worries about?"

**"A side effect? No, dear. That was the WHOLE effect. Everything else was the side effect."**

She lets that sink in, her attention momentarily drifting to a crystal that's started pulsing on a nearby shelf.

"I faked my death because it was simpler than explaining. Moved up here. Been perfectly happy ever since." She waves vaguely at the pulsing crystal. "That'll stop in a moment. Probably."

${permanenceDialogue}`;
    },
    actions: [
        { label: '"What about the town?"', nextScene: 'tower_reveal_town' }
    ]
};

// Beat 6 - The Town (Conditional on male NPC transformations)
SCENES['tower_reveal_town'] = {
    id: 'tower_reveal_town',
    image: 'images/tower/sylvie_portrait.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: '',
    onEnter: function() {
        const corwinTransformed = gameState.flags.story_corwin_transformed;
        const aldricTransformed = gameState.flags.story_aldric_transformed;
        const holtTransformed = gameState.flags.story_holt_transformed;

        const transformedCount = [corwinTransformed, aldricTransformed, holtTransformed].filter(Boolean).length;

        let townDialogue = '';
        if (transformedCount === 3) {
            townDialogue = `Her eyes light up when you mention the town. She sets down her teacup so quickly it nearly tips.

"Tell me everything. How is everyone? Della's bakery? The tavern?" She's rummaging through papers on her desk while she listens, not finding whatever she's looking for.

You tell her. About Corwin's transformation. About Aldric's accident. About Holt finally becoming who she always was.

**"The devices always did know what people needed. Even when they didn't know themselves."**

She's beaming with undisguised delight, papers forgotten.

"Oh, this is wonderful. I hoped they would find the right people, but three? Three! And all of them happier for it?"

She clasps her hands together, then immediately unclasps them to adjust her goggles.

"I have to visit. I have to see them."`;
        } else if (transformedCount > 0) {
            const transformed = [];
            if (corwinTransformed) transformed.push('Corwin');
            if (aldricTransformed) transformed.push('Aldric');
            if (holtTransformed) transformed.push('Holt');

            townDialogue = `Her eyes light up when you mention the town. She absently picks up a beaker and sets it down again without looking at it.

"Tell me everything. How is everyone?"

You tell her about ${transformed.join(' and ')} — the transformations, the changes.

"Oh, that's wonderful." She looks genuinely moved, one hand coming up to touch her chest. "The devices found ${transformed.length > 1 ? 'them' : 'someone'}. They always did have a way of seeking out the people who needed them most."

She tilts her head, fingers drumming on the workbench.

"What about the others? Give it time. The devices are patient."`;
        } else {
            townDialogue = `Her eyes light up when you mention the town. She pushes her goggles up, then immediately pushes them down again.

"Tell me everything. How is everyone? Della? Barret? That stern blacksmith?"

You tell her what you can. About the workshop. The townsfolk. The devices finding new owners.

"Good, good." She nods thoughtfully, tracing a finger along a brass instrument. "I hope the devices are finding the right people. They have a way of doing that, you know. Seeking out the ones who need them."

She looks wistful, hand stilling.

"I've missed them all terribly. Especially Della's cakes."`;
        }

        this.text = townDialogue;
    },
    actions: [
        { label: '"Will you come back?"', nextScene: 'tower_reveal_resolution' }
    ]
};

// Beat 7 - Resolution
SCENES['tower_reveal_resolution'] = {
    id: 'tower_reveal_resolution',
    image: 'images/tower/sylvie_portrait.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `She considers this for a long moment, swirling her tea. Behind her, something starts to hiss. She doesn't seem to notice.

"Move back? No. The tower is home now. Too many experiments in progress. Too many things that might explode if left unattended."

The hissing stops. She sets down her cup with a decisive clink.

**"But visit? Yes, I think I'd like that. I think it's been long enough."**

Her smile turns mischievous. She reaches up to adjust her goggles, finds them already adjusted, and pats her hair bun instead.

"Besides, I have so many new things to test. And now I have an assistant in town."

She winks at you, then glances at a bubbling flask and frowns slightly before deciding it's probably fine.

"Come back anytime, dear. The door will always open for you. And do send my regards to Della. Tell her I'll be wanting a fresh batch of honey cakes soon."

**(Blackstone Tower is now available as a location. Sylvie may appear in town.)**`,
    onEnter: function() {
        gameState.flags.sylvie_reveal_complete = true;
        saveState();
    },
    actions: [
        { label: 'Take your leave', nextScene: 'town_exit_workshop' }
    ]
};

// ============================================
// BLACKSTONE TOWER - SYLVIE VISIT SCENES
// ============================================

// Visit reason framings (randomly selected)
const TOWER_VISIT_REASONS = [
    'You climb the tower stairs with a package of tea you picked up in town.',
    'You return a book Sylvie lent you last time, the spine cracked from use.',
    'You thought you\'d check in on your aunt. It\'s the responsible thing to do.',
    'Corwin asked you to deliver a message. Something about a shipment.',
    'No particular reason. You just felt like visiting.',
    'You brought some of Della\'s honey cakes. Sylvie mentioned missing them.'
];

function getRandomVisitReason() {
    return TOWER_VISIT_REASONS[Math.floor(Math.random() * TOWER_VISIT_REASONS.length)];
}

// ----------------------------------------
// BUNNY SCENE
// ----------------------------------------
SCENES['tower_visit_bunny'] = {
    id: 'tower_visit_bunny',
    image: 'images/tower/bunny/bunny_2088937956_b3.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: '',
    onEnter: function() {
        const visitReason = getRandomVisitReason();

        this.text = `${visitReason}

You find Sylvie perched on a stool, her white hair done up as always, lab coat draped over her cocktail dress. But something's different today.

Long, velvety rabbit ears sprout from her head, twitching at your arrival. Her hips seem wider than usual, straining against her dress.

"Oh! Hello, dear!" She hops off the stool with surprising grace, and you notice a cotton tail poking through a hole in the back of her dress. "I was just testing something. The ears are quite sensitive, actually."

She tilts her head, one ear flopping adorably.

"I can hear your heartbeat from here. Isn't that fascinating?" She wiggles her nose. "Also I've developed quite the appetite for carrots. Side effect, I think."

She gestures vaguely at a pile of carrot tops on her workbench.

"Anyway, what brings you by?"`;
    },
    actions: [
        { label: '"The ears suit you."', nextScene: 'tower_visit_bunny_2' },
        { label: '"I should go."', nextScene: 'town_exit_workshop' }
    ]
};

SCENES['tower_visit_bunny_2'] = {
    id: 'tower_visit_bunny_2',
    image: 'images/tower/bunny/bunny_2088937956_b3.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `Sylvie's ears perk up, literally.

"Do you think so? I was going for 'woodland adorable' but wasn't sure if I hit the mark."

She does a little spin, her cottontail bouncing.

"The hip expansion was unexpected. Something about the transformation wanting to complete a silhouette, I think." She pats her fuller rear thoughtfully. "I don't hate it."

She waves a hand at nothing in particular. "Oh, it's temporary. Probably. The ears should fade in a day or two. The hips..." She glances down at her expanded curves. "Those might stick around a bit longer."

One ear swivels toward a bubbling flask.

"Oh! That's my cue. Something's about to boil over. Do come again soon!"`,
    actions: [
        { label: 'Leave her to it', nextScene: 'town_exit_workshop' }
    ]
};

// ----------------------------------------
// DOG SCENE (2 images)
// ----------------------------------------
SCENES['tower_visit_dog'] = {
    id: 'tower_visit_dog',
    image: 'images/tower/dog/dog_339523088_v2.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: '',
    onEnter: function() {
        const visitReason = getRandomVisitReason();

        this.text = `${visitReason}

You find Sylvie crouched on the floor, her lab coat pooled around her. Floppy dog ears droop from her head, and she's looking up at you with big, eager eyes.

"Oh! You're here! You're here!"

Her whole body wiggles with excitement. An actual tail wags behind her.

"I've been a very good girl today! I organized all my beakers!" She pauses, head tilting. "Well. I knocked some over first. But then I organized what was left!"

She scrambles to her feet, practically bouncing.

"Do you want to see what else changed?"`;
    },
    actions: [
        { label: '"Sure, show me."', nextScene: 'tower_visit_dog_reveal' },
        { label: '"I should go."', nextScene: 'town_exit_workshop' }
    ]
};

SCENES['tower_visit_dog_reveal'] = {
    id: 'tower_visit_dog_reveal',
    image: 'images/tower/dog/dog_4212629184.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `Sylvie stands up straight and opens her lab coat with a flourish.

Where there should be two breasts, there are six, arranged in three pairs down her torso like a nursing dog. She points at them proudly.

"Look! Extra milk production capability!" Her tail wags furiously. "I was testing mammary multiplication and the canine template just... kept going."

She looks down at herself with scientific interest.

"The bottom pairs are smaller, obviously. Follows the anatomical progression. Very authentic!"

She buttons her coat back up, ears flopping.

"I've been documenting the sensitivity differences between rows. For science. The middle pair is surprisingly responsive."

Her ears perk up and she grins so wide you can see her slightly-too-sharp canines.

"Everything's so exciting! Smells are amazing! Did you know you smell like honey and copper? That's a compliment!"

She spins in a happy circle, distracted by something only she can hear. "Oh! Was that a squirrel? I think I heard a squirrel."

She's already halfway to the window.

"Come back soon! Bring treats! I mean— bring yourself! You're the treat!"

She seems delighted by her own joke.`,
    actions: [
        { label: 'Leave while she\'s distracted', nextScene: 'town_exit_workshop' }
    ]
};

// ----------------------------------------
// FOX/KITSUNE SCENE
// ----------------------------------------
SCENES['tower_visit_fox'] = {
    id: 'tower_visit_fox',
    image: 'images/tower/fox/fox_3162838156_v3.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: '',
    onEnter: function() {
        const visitReason = getRandomVisitReason();

        this.text = `${visitReason}

Sylvie sits in an ornate chair, transformed in a way that can only be described as elegant. Fox ears rise from her white hair, alert and refined. Behind her, seven magnificent tails fan out like a peacock's display, each one luxuriously fluffy.

She's traded her usual cocktail dress for a flowing strapless gown that accommodates her new appendages. She looks like something out of a fairy tale.

"Ah, there you are!" She laughs, and it sounds like bells. "What do you think?"

She rises gracefully, tails swaying in perfect synchronization.

"I was aiming for three tails but overshot a bit. Nine is the traditional maximum for a kitsune, so seven feels appropriately ambitious without being presumptuous."

She twirls, and it's genuinely beautiful.

"I might keep this look for a while. It has a certain... gravitas."`;
    },
    actions: [
        { label: '"You look incredible."', nextScene: 'tower_visit_fox_2' },
        { label: '"I should go."', nextScene: 'town_exit_workshop' }
    ]
};

SCENES['tower_visit_fox_2'] = {
    id: 'tower_visit_fox_2',
    image: 'images/tower/fox/fox_3162838156_v3.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `Sylvie's ears tilt forward with pleasure, and her tails swish contentedly.

"Why thank you! I thought so too." She preens a little, entirely without shame. "There's something to be said for embracing the aesthetic fully."

She examines one of her tails, running her fingers through the fur.

"Each tail has independent motor control. I can write seven different notes simultaneously now." She laughs. "Though my handwriting with the tails is atrocious."

Her eyes glitter with foxlike cunning.

"I've also found I can sense magical auras more clearly. And I've developed a taste for fried tofu. Cultural contamination from the template, I suspect."

She settles back into her chair with liquid grace. Two of her tails fetch a teapot while a third retrieves cups. The remaining four arrange themselves aesthetically behind her.

"The multitasking really is quite convenient."

You spend a pleasant hour drinking tea while Sylvie regales you with theories about the intersection of folklore and magical transformation.

"The templates aren't random, you know. They draw from collective imagination. Centuries of stories about fox spirits created a kind of... blueprint."

She sips her tea, ears twitching thoughtfully.

"I wonder what templates future generations will dream up. Imagine if someone started telling stories about, oh, I don't know. Flying carpet people."

She seems genuinely curious about this.

"Anyway. Lovely visit. Do come again."`,
    actions: [
        { label: 'Take your leave', nextScene: 'town_exit_workshop' }
    ]
};

// ----------------------------------------
// COW SCENE (4 images with Fiona)
// ----------------------------------------
SCENES['tower_visit_cow'] = {
    id: 'tower_visit_cow',
    image: 'images/tower/cow/cow_1929774823.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: '',
    onEnter: function() {
        const visitReason = getRandomVisitReason();

        this.text = `${visitReason}

You find Sylvie standing in the middle of her lab, looking down at herself with an expression of mild scientific interest. Small horns curl from her white hair. Cow ears flop where human ones should be. Her breasts have swelled significantly, straining against her dress. A small metal tag hangs from one ear.

"Oh! Hello, dear." She looks up, entirely unbothered. "I was testing bovine templates. Very productive. Literally."

She gestures at her expanded chest.

"Milk production is through the roof. I've had to express every few hours or it gets uncomfortable."

You point at the ear tag.

"Ah, that." She touches it casually. "Obviously I put it on myself. Cows have ear tags. It's authentic."

She starts walking toward a back room.

"Come, come. I want to show you something. I've been running a related experiment."`;
    },
    actions: [
        { label: 'Follow her', nextScene: 'tower_visit_cow_follow' },
        { label: '"I should go."', nextScene: 'town_exit_workshop' }
    ]
};

SCENES['tower_visit_cow_follow'] = {
    id: 'tower_visit_cow_follow',
    image: 'images/tower/cow/cow_fiona_swap_1262768204.webp',
    imagePrompt: null,
    speaker: '',
    text: `Sylvie disappears through the doorway. You lag behind, distracted by a bubbling apparatus.

When you finally follow, you stop dead in the doorway.

Fiona is there, wearing what appears to be a cat ear headband. Her mouth is latched onto Sylvie's breast, drinking deeply. Sylvie is calmly taking notes with her free hand.

{sylvie}"Oh good, you found us!" Sylvie says brightly. {sylvie}"Fiona volunteered for the milk trial. It's quite nutritious, you know. High caloric density with excellent protein ratios."

Fiona pulls away just long enough to mumble, {fiona}"Tastes like vanilla," before resuming.

{sylvie}"That's a flavor side effect I'm still investigating," Sylvie adds. {sylvie}"The sweetness seems to correlate with the template's domestication level."

She scritches behind Fiona's cat ears affectionately.

{sylvie}"I reverted her to her base state first to test growth potential. Watch."`,
    actions: [
        { label: 'Watch', nextScene: 'tower_visit_cow_growth' }
    ]
};

SCENES['tower_visit_cow_growth'] = {
    id: 'tower_visit_cow_growth',
    image: 'images/tower/cow/fiona_muscle_2621647436.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `Over the next few minutes, you watch Fiona's body change as she drinks.

Her muscles begin to define themselves, then grow. Her frame expands. What was a wiry street-fighter build becomes something considerably more powerful.

"The growth compound in the milk accelerates physical development," Sylvie explains, still taking notes. "Muscle tissue responds particularly well. It's like concentrated nutrition combined with transformation magic."

Fiona finally pulls away, looking down at her new physique with wide eyes. She flexes experimentally.

{fiona}"Holy shit," she breathes.

"Indeed," Sylvie agrees. "Now, let's see what happens with continued consumption."`,
    actions: [
        { label: 'Continue watching', nextScene: 'tower_visit_cow_hyper' }
    ]
};

SCENES['tower_visit_cow_hyper'] = {
    id: 'tower_visit_cow_hyper',
    image: 'images/tower/cow/fiona_hyper_1301737500.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `Fiona latches back on eagerly, and the transformation continues.

Her muscles swell beyond athletic, beyond bodybuilder, into something almost sculptural. Each fiber stands out in sharp relief. Her body thrums with contained power.

Her eyes roll back with pleasure, and a low moan escapes her.

"Fascinating," Sylvie murmurs, scribbling furiously. "The euphoria response intensifies at higher muscle densities. Possible endorphin cascade linked to rapid tissue generation."

Fiona finally releases with a gasp, her expression blissed out. She's enormous now, every muscle hypertrophied to almost absurd proportions.

{fiona}"That..." Fiona manages, swaying slightly. {fiona}"That was... wow."

"Results noted," Sylvie says with satisfaction. "The effect should be temporary. Probably. We'll see."

She pats Fiona's now-massive shoulder.

"Run along, dear. Go lift something heavy. For science."

Fiona stumbles out, still looking dazed and euphoric.

"Anyway!" Sylvie turns back to you. "That's what I've been working on. The transformative effects are dose-dependent and mostly temporary." She pauses. "The addiction potential is... under investigation."

She glances toward where Fiona left.

"She's been visiting rather frequently. Very dedicated test subject." Her expression is utterly guileless. "The vanilla flavor probably doesn't help."

She starts tidying her notes.

"Anyway, I need to express again or these will become unmanageable." She gestures at her swollen chest. "You're welcome to stay and observe, but the process is rather dull."`,
    actions: [
        { label: 'Take your leave', nextScene: 'town_exit_workshop' }
    ]
};

// ----------------------------------------
// ELF SCENE
// ----------------------------------------
SCENES['tower_visit_elf'] = {
    id: 'tower_visit_elf',
    image: 'images/tower/elf/elf_1342186368.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: '',
    onEnter: function() {
        const visitReason = getRandomVisitReason();

        this.text = `${visitReason}

"Up here!"

The voice comes from... below eye level. You look down.

Sylvie stands on her workbench, waving at you. She's tiny — barely three feet tall. Delicate pointed ears poke through her white hair. Her lab coat drowns her, the sleeves hanging past her hands, the hem pooling around her feet. Underneath, she's wearing nothing but the lab coat.

"The dress didn't survive the shrinking process," she explains cheerfully. "The coat was more forgiving."

She does a little twirl, flashing you before the coat settles back down. She seems entirely unconcerned.

"I'm tiny! Pretty cute, huh?" She strikes a pose, throwing up a peace sign and winking. "The elven template came with some unexpected miniaturization. I think the magic interpreted 'ethereal' as 'smol.'"

She hops down from the workbench, her bare feet making tiny sounds on the floor.

"Everything's so big now! My teacups are like bathtubs!"`;
    },
    actions: [
        { label: '"You seem to be enjoying yourself."', nextScene: 'tower_visit_elf_2' },
        { label: '"I should go."', nextScene: 'town_exit_workshop' }
    ]
};

SCENES['tower_visit_elf_2'] = {
    id: 'tower_visit_elf_2',
    image: 'images/tower/elf/elf_1342186368.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `She grins up at you, ears twitching happily.

"I really am! Everything's an adventure at this size!" She gestures at her lab. "My workbench is a mountain! My stairs are a deadly climb! I had to rope down from my bed this morning!"

She seems delighted by the logistical nightmare.

"Plus, my magic feels more... concentrated? Same power in a smaller package." She demonstrates by conjuring a spark that's proportionally much larger relative to her tiny hand. "Very efficient."

She pulls her oversized coat tighter, inadvertently showing off her petite curves beneath.

"The only downside is I can't reach most of my shelves. But that's what levitation is for!"

She floats a few inches off the ground, still beaming. You pour tea while Sylvie perches on the edge of a saucer, using a thimble as a cup.

"This is quite cozy, actually." She swings her tiny legs over the edge of the saucer. "I should document the social dynamics of size differential. Very interesting power dynamics."

She sips from her thimble, leaving a tiny milk mustache.

"You know, there are advantages to being small. Harder to hit. Easier to hide. Less material needed for transformations."

She looks up at you with big, pointed-eared innocence.

"And people tend to underestimate you. That could be useful."

Her smile is anything but innocent.

"Anyway! Lovely tea. Do come again. I might be bigger. I might be smaller. Who knows!"

She waves her tiny hand goodbye.`,
    actions: [
        { label: 'Leave the tiny scientist', nextScene: 'town_exit_workshop' }
    ]
};

// ----------------------------------------
// DRAGON SCENE
// ----------------------------------------
SCENES['tower_visit_dragon'] = {
    id: 'tower_visit_dragon',
    image: 'images/tower/dragon/dragon_3908978890.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: '',
    onEnter: function() {
        const visitReason = getRandomVisitReason();

        this.text = `${visitReason}

You find Sylvie standing in the center of her lab, and for the first time since you met her, she looks truly formidable.

Curved horns rise from her white hair. Leathery wings fold against her back. Her eyes have become slitted, reptilian, glowing faintly with inner fire. Scales glint along her cheekbones and down her neck.

She's wearing only her lab coat, open in the front. Her hand rests casually on her exposed cock — slightly larger than usual, if you're being honest. Her expression is one of supreme, almost predatory satisfaction.

"Ah. You've arrived."

Her voice has a resonant quality now, almost a growl.

"I was just appreciating the results of my latest experiment." She looks down at herself with obvious satisfaction. "The draconic template is quite something."

She spreads her wings slightly, filling the room.

"I feel powerful. Truly powerful."`;
    },
    actions: [
        { label: '"You look dangerous."', nextScene: 'tower_visit_dragon_2' },
        { label: '"I should go."', nextScene: 'town_exit_workshop' }
    ]
};

SCENES['tower_visit_dragon_2'] = {
    id: 'tower_visit_dragon_2',
    image: 'images/tower/dragon/dragon_3908978890.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `Her slitted eyes gleam and she shows teeth that are now slightly pointed.

"Dangerous. Yes." She rolls the word around like she's tasting it. "That's accurate."

She stalks toward you, wings rustling, and for a moment you genuinely feel like prey.

Then she stops and laughs, and it's still Sylvie underneath all the scales and horns.

"Oh, don't look so worried! I'm not going to eat you." She pauses. "Probably not, anyway. The template does come with certain... appetites."

She stretches her wings to their full span, and they're genuinely impressive.

"The scales are incredibly durable. The wings are functional — I flew around the tower earlier." A smug smile. "The other... enhancements... seem to be holding steady."

She glances down at her exposed body with obvious appreciation.

"The template emphasized certain features. Power. Presence. Potency." She emphasizes the last word meaningfully. "All correlating to draconic attributes."

She begins pacing, each movement now carrying a predator's grace.

"I wonder if the territorial instincts will fade. I've been feeling very possessive about my laboratory. And my visitors."

She looks at you with those slitted eyes.

"But you're welcome here. You're... claimed."

The word sends a shiver down your spine.`,
    actions: [
        { label: 'Take that as your cue to leave', nextScene: 'town_exit_workshop' }
    ]
};

// ----------------------------------------
// RUBBERIZATION SCENE (6 stages + comedic exit)
// ----------------------------------------
SCENES['tower_visit_rubber'] = {
    id: 'tower_visit_rubber',
    image: 'images/tower/rubber/rubber_2494636239.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: '',
    onEnter: function() {
        gameState.flags.seen_tower_rubber = true;
        saveState();
        const visitReason = getRandomVisitReason();

        this.text = `${visitReason}

You find Sylvie examining herself in a mirror with intense fascination. Her skin is... red. Not flushed — actually red. And shiny. Like polished rubber.

"Oh, hello! You have excellent timing!" She turns to you, and you notice her skin reflects the light in a way human skin definitely shouldn't. "My dress pigment fused to my body. My entire epidermis is now elastic polymer!"

She reaches up and pulls at her own cheek. It stretches obscenely far before snapping back with a rubbery sound.

"Isn't that fascinating? I've become a living rubber doll!" She's far too delighted by this. "Watch, watch—"

She pinches her cheek again and pulls, her face distorting cartoonishly before reforming.

"Perfect elasticity! No pain at all! Just... stretch."

Her eyes are practically glowing with scientific excitement.

"I have a theory about pressure dynamics. Would you like to help me test it?"`;
    },
    actions: [
        { label: '"What kind of test?"', nextScene: 'tower_visit_rubber_2' },
        { label: '"I should probably go."', nextScene: 'town_exit_workshop' }
    ]
};

SCENES['tower_visit_rubber_2'] = {
    id: 'tower_visit_rubber_2',
    image: 'images/tower/rubber/rubber_belly_4084448701.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `Before you can react, Sylvie produces a small capsule and swallows it.

"Compressed air compound. Let's see what happens when—"

Her belly begins to expand. Not fat — inflating, like a balloon. Her breasts swell. Her hips widen. Her entire torso is growing as air pressure builds inside her rubber body.

"Oh my!" She looks down at her expanding form with delight. "The pressure is distributing evenly! My whole body is becoming a pressure vessel!"

Her belly is now quite round, her breasts straining against her already-strained dress.

"The rubber skin is holding perfectly. No structural failure at all!" She pokes her expanded belly and it bounces. "I wonder if we can redirect the pressure somehow. Do you see that corset on the shelf?"`,
    actions: [
        { label: 'Get the corset', nextScene: 'tower_visit_rubber_3' }
    ]
};

SCENES['tower_visit_rubber_3'] = {
    id: 'tower_visit_rubber_3',
    image: 'images/tower/rubber/rubber_corset_4131413109.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `You find yourself helping Sylvie into the corset despite your better judgment. She's very persuasive. And the science is genuinely interesting.

As you tighten the laces, her inflated belly compresses. The air has to go somewhere. It goes everywhere else.

Her breasts balloon outward, massive and shiny. Her hips widen dramatically. Her thighs swell. And her penis — you try not to stare — inflates like a balloon animal, standing proudly at attention.

"Oh my!" She looks down at her transformed body with genuine surprise. "That's quite the redistribution!"

She prods her inflated cock experimentally.

"It inflated like a balloon animal! Look at it!" She seems more scientifically delighted than embarrassed. "The rubber is maintaining structural integrity even under extreme expansion!"

She shifts uncomfortably.

"Though I should probably deal with this before it gets awkward. Excuse me for a moment."

She waddles toward a back room, her inflated assets bouncing with each step.`,
    actions: [
        { label: 'Wait for her return', nextScene: 'tower_visit_rubber_4' }
    ]
};

SCENES['tower_visit_rubber_4'] = {
    id: 'tower_visit_rubber_4',
    image: 'images/tower/rubber/rubber_vagina_4131413110.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `Sylvie returns a few minutes later, and things have changed.

Her penis is gone, replaced by a vagina that's just as inflated as everything else — puffy and prominent, very much on display. Her thighs have grown even larger, straining against the corset.

"I reconfigured things," she explains casually. "The pressure had to go somewhere. Apparently it chose my thighs."

She looks down at her extremely visible lower region.

"Still quite on display, isn't it? The inflation makes everything... prominent." She doesn't seem bothered. "Let's try containing the lower half. There are some yoga pants in that drawer."

She points with a shiny red finger.

"Bring them here? Walking is becoming challenging."`,
    actions: [
        { label: 'Get the pants', nextScene: 'tower_visit_rubber_5' }
    ]
};

SCENES['tower_visit_rubber_5'] = {
    id: 'tower_visit_rubber_5',
    image: 'images/tower/rubber/rubber_pants1_4131413109.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `Sylvie disappears to put on the yoga pants. She returns looking even more transformed.

Constraining her legs has forced the pressure upward. Her breasts are now truly enormous, barely contained by her strained top. And her lips — her actual lips — have inflated to a dramatic pout, full and shiny and almost comical.

"The pressure redistribution is fascinating!" she says, though the words come out slightly slurred through her inflated lips. "Compressing the lower body forces expansion in unrestricted areas!"

She touches her pillow-soft lips experimentally.

"These are very sensitive now. Interesting side effect."

Her massive breasts heave as she breathes.

"I should probably wrap these up before they get any bigger. Help me with the bandages? They're in that cabinet."`,
    actions: [
        { label: 'Help with the wrapping', nextScene: 'tower_visit_rubber_6' }
    ]
};

SCENES['tower_visit_rubber_6'] = {
    id: 'tower_visit_rubber_6',
    image: 'images/tower/rubber/rubber_wrap6_3684043692.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `You help Sylvie wrap her enormous breasts with bandages, compressing them back down. For a moment, it seems to be working.

Then you hear an ominous stretching sound from below.

The yoga pants fail spectacularly. The fabric tears as her lower body expands to accommodate the redirected pressure. Her butt balloons outward. Her thighs swell. And her inflated labia bursts through the ruined fabric, puffy and prominent.

Sylvie looks down at the catastrophic failure with wide eyes.

"Well," she says slowly. "That was unexpected."

Her body is now a study in pressure physics — compressed where wrapped, massively inflated everywhere else, her puffy vagina prominently displayed through her ruined pants.

"I think perhaps constraining everything at once wasn't my best—"

A small "urp" escapes her.

Her expression shifts from surprised to concerned.`,
    actions: [
        { label: '"Are you okay?"', nextScene: 'tower_visit_rubber_7' }
    ]
};

SCENES['tower_visit_rubber_7'] = {
    id: 'tower_visit_rubber_7',
    image: 'images/tower/rubber/rubber_wrap6_3684043692.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `Another small 'urp' escapes her, and her eyes widen.

"You should go."

"But—"

"Now. Immediately." Her voice is strained. "Right now."

"Do you need help with—"

"No!" She waves frantically with both shiny red hands. "No help needed! Very much need you to leave! Right now! Thank you for visiting!"

She's already shuffling toward a back room, her inflated body wobbling precariously.

"Close the door behind you! Firmly! Perhaps don't come back for a day or two!"

You don't need to be told twice.

As you descend the tower stairs, you hear muffled sounds from above — squeaking, hissing, and what might be Sylvie shouting something about "pressure valves" and "should have thought of this earlier."

You decide not to investigate.`,
    actions: [
        { label: 'Leave quickly', nextScene: 'town_exit_workshop' }
    ]
};

// ==========================================
// RESONANCE CASCADE — Sylvie + Barret (11 beats)
// ==========================================
// Requires Barret at intimate trust. One-time scene.
// Resets player body to naturalBody as part of the narrative.

SCENES['tower_visit_cascade'] = {
    id: 'tower_visit_cascade',
    image: 'images/tower/cascade/01_arrival.webp',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        // Gate: Barret must be at intimate trust
        const barretState = gameState.npcs.barret;
        const barretThresholds = getNpcTrustThresholds('barret');
        if (!barretState || (barretState.trust || 0) < barretThresholds.intimate) {
            // Redirect to a different tower scene
            const pool = SceneManager.pools['tower_visit'].filter(id => id !== 'tower_visit_cascade');
            const idx = Math.floor(Math.random() * pool.length);
            SceneManager.playScene(pool[idx]);
            return 'redirect';
        }

        // Gate: One-time only
        if (gameState.flags.seen_tower_cascade) {
            const pool = SceneManager.pools['tower_visit'].filter(id => id !== 'tower_visit_cascade');
            const idx = Math.floor(Math.random() * pool.length);
            SceneManager.playScene(pool[idx]);
            return 'redirect';
        }

        gameState.flags.seen_tower_cascade = true;

        // Reset player body to natural
        const playerBody = gameState.player.body;
        const naturalBody = gameState.player.naturalBody;
        const wasChanged = JSON.stringify(playerBody) !== JSON.stringify(naturalBody);
        if (wasChanged) {
            Object.keys(naturalBody).forEach(stat => { playerBody[stat] = naturalBody[stat]; });
        }
        saveState();

        const resetText = wasChanged
            ? `Your body shifts. It's not painful... more like an elastic band relaxing after being stretched. Curves soften, proportions settle, everything easing back to its natural shape. You watch yourself change and it feels less like losing something and more like exhaling. When it's done, you're you again. The original version.`
            : `Your body settles. Nothing changes... you feel the warmth pass through you and move on, finding nothing to undo. You're already yourself.`;

        const visitReason = getRandomVisitReason();

        this.text = `${visitReason}

You find Sylvie circling a device you've never seen. It dominates the center of the lab... a web of brass filaments stretching between three crystalline harnesses hung from the ceiling. Each harness is wide enough for a person, lined with softly pulsing crystals that shift between amber and violet.

What you don't expect is Barret, sitting on Sylvie's workbench, boots dangling off the edge, nursing a tankard she clearly brought from the Rusty Anchor. Her cheeks are already flushed, her grin a little too wide.

{barret}"There you are, love." She raises the mug. Half of it sloshes over the rim. {barret}"Sylvie said she needed a third. I volunteered before she finished the sentence."

You glance at Sylvie, who mouths "two hours" and holds up a matching number of fingers. Barret came early. She's been waiting, and drinking, since well before you arrived.

{barret}"Don't give me that look. Corwin dared me to try one of Sylvie's experiments sober and I said absolutely not." She takes another swig. {barret}"Liquid courage, love. Besides, everything Sylvie builds works better when you stop overthinking it."

Sylvie claps her hands. {sylvie}"Right! Before we start, I need everyone at baseline." She produces one of her smaller devices... a handheld thing with a single crystal that glows faintly green. {sylvie}"The cascade works best with a clean template. No residual transformations interfering with the resonance field."

She gestures at Barret. {sylvie}"Already ran it on her while she was on her second tankard."

{barret}"I felt that, you know." Barret glances down at herself. {barret}"Not sure anything changed, but I felt it."

Sylvie turns the device on you. A brief warmth, a tingling that runs head to toe. ${resetText}

{sylvie}"Good. Clean templates, all three." She tosses the reset device onto a pile of notes and turns to the center of the room with barely contained excitement.

{sylvie}"The Resonance Cascade!" She announces it like naming a new pet. {sylvie}"Three bodies, one morphogenic circuit. Instead of transforming a single subject, the cascade lets changes flow between all connected bodies." She taps a crystal with her wrench and it chimes. {sylvie}"Like pouring water between vessels. Except the water is your physical form."

{barret}"I understood about half of that and I'm still in."

Sylvie helps Barret into the first harness. The crystals settle against her collarbone and she shivers. {barret}"Warm," she murmurs. Sylvie holds the second harness open for you and you step in. The crystals pulse against your skin in time with your heartbeat, a gentle rhythm that feels oddly intimate.

Sylvie fastens the third around herself, adjusting it over her lab coat.

{sylvie}"Fair warning." She's already reaching for the lever. {sylvie}"I have absolutely no idea what this will do. The resonance field is theoretical. The transformations could manifest in ways my devices have never produced." She pauses. {sylvie}"Isn't that exciting?"

{barret}"Pull the lever, Sylvie."

She does. The crystals flare brilliant amber. **A hum fills the room that you don't hear so much as feel... in your chest, your belly, the backs of your teeth.** The three harnesses glow in unison. You can feel them. Not see, not hear. Feel. Barret's heartbeat, quick and eager. Sylvie's, steady and curious.

Three bodies. One circuit.

The first wave hits.`;
    },
    actions: [
        { label: 'Continue', nextScene: 'tower_visit_cascade_2' }
    ]
};

SCENES['tower_visit_cascade_2'] = {
    id: 'tower_visit_cascade_2',
    image: 'images/tower/cascade/02_multiplication.webp',
    imagePrompt: null,
    speaker: '',
    text: `Barret gasps. Her hands fly to her breasts as warmth blooms through her. You feel the echo through the resonance... a pressure that isn't unpleasant, an expanding fullness that makes you catch your breath even though it isn't happening to you.

{barret}"Oh, that's..." She presses both hands flat against her blouse. {barret}"That is very warm."

You watch her breasts swell beneath the fabric. Buttons strain. The first one pops, then the second. But it isn't just growth. **Below her original pair, new tissue pushes outward,** rounding into shape where smooth skin was moments ago. Her blouse splits down the front as a second pair of breasts fills in, then a third below those, each set perfect, tightening as they settle.

{sylvie}"Morphogenic duplication!" Sylvie's notebook materializes from somewhere. {sylvie}"The cascade isn't scaling mass... it's replicating the anatomical structure entirely!"

Barret's ruined blouse falls away. She looks down at herself. Six breasts, stacking down her torso in diminishing pairs, each tipped with a stiffening nipple. The lowest pair sits just above her navel. All of them are flushed, rising and falling with her quickening breath.

She cups the middle pair. Rolls a thumb across one nipple. Her knees nearly buckle.

{barret}"Oh, fuck me." She's grinning. Not nervous, not horrified. Barret looks like someone just handed her the best gift of her life. {barret}"Six. I have six tits and every single one of them works."

She squeezes, and you feel it through the resonance... a six-fold pulse of pleasure that makes you gasp. Your own nipples stiffen. Phantom warmth floods your chest, six points of tingling heat mapping themselves onto your body.

{sylvie}"Sensitivity identical across all pairs." Sylvie murmurs, scribbling. {sylvie}"Barret, on a scale of..."

{barret}"Shut up and let me enjoy this." She's working both hands down the line of them, shivering with each one. Her cheeks are flushed dark. She catches your eye and winks. {barret}"You're feeling this too, aren't you, love? Through the link?"

You nod. You can't not feel it. Every time she touches herself, you feel a ghost of it.

{barret}"Good." **She deliberately pinches all six nipples in sequence, slow, watching your face as you shudder with each one.**

The crystals shift from amber to violet. The hum deepens.

The second wave builds.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_visit_cascade_3' }
    ]
};

SCENES['tower_visit_cascade_3'] = {
    id: 'tower_visit_cascade_3',
    image: 'images/tower/cascade/03_mutation.webp',
    imagePrompt: null,
    speaker: '',
    text: `This time the warmth floods Sylvie. She stops writing mid-word, pen hovering, as heat concentrates in her chest with laser focus.

{sylvie}"Ah. Interesting." She sets down the notebook carefully. {sylvie}"The cascade is targeting mammary tissue again, but the morphogenic expression is..." She opens her lab coat and looks down. {sylvie}"...not mammary."

Her nipples are changing. Thickening, lengthening, taking on a shape that has nothing to do with nipples and everything to do with what Sylvie already has between her legs. **Two thick, perfectly formed cocks are growing from her areolae,** each one stiffening as it extends, flushed the same pink as her cheeks, the heads rounding to smooth, glistening points.

{sylvie}"Genital morphogenesis mapped to an alternate site," she breathes. One of them twitches and she sucks in a sharp breath. {sylvie}"Oh. They're... quite sensitive."

{barret}"Sylvie." Barret stares, all six of her breasts forgotten. {barret}"You've got dicks growing out of your tits."

{sylvie}"Yes, I noticed." The clinical tone cracks as the left one throbs visibly, stiffening to full erection. She bites her lip. A thick bead of white wells up at the tip and rolls slowly down the shaft. Milk. Rich, creamy, warm. {sylvie}"Full erectile function. Lactation mapped to... oh." Another throb. A fresh droplet pearls at the other tip. She closes her eyes. {sylvie}"...entirely functional."

You feel it through the resonance. Not a ghost this time. A direct pulse that makes your nipples ache with a sensitivity so intense it borders on genital. You shift in the harness and gasp, the brush of crystal against your collarbone sending sparks straight down to your belly.

Sylvie touches one of them with a fingertip. Just a fingertip. She shudders from crown to toe, the cock jumping at the contact. A thin stream of milk runs down her breast.

{sylvie}"I might keep these," she says, in the same tone she might use about a new pair of shoes.

Barret is breathing hard, watching Sylvie fondle the strange new additions. Her voice drops an octave. {barret}"Touch them again. Both of them."

Sylvie wraps a hand around each. The sound she makes is not scientific.

The crystals pulse. Your skin prickles. Something is happening to you... not your chest, not your muscles. **The ceiling is closer. The workbench is lower. You're growing.** And across the lab, Barret is shrinking, the workbench rising around her like a city.

The third wave isn't just transforming bodies. It's redistributing scale.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_visit_cascade_4' }
    ]
};

SCENES['tower_visit_cascade_4'] = {
    id: 'tower_visit_cascade_4',
    image: 'images/tower/cascade/04_scale.webp',
    imagePrompt: null,
    speaker: '',
    text: `The growth comes in surges. Each pulse of the crystals adds another foot, and the tower lab, which always felt spacious, closes in fast. Your head brushes a rafter. Your shoulders press against ceiling stones. You have to crouch, then kneel, filling the room like a body filling a bathtub.

Barret goes the other direction. She was sitting on the workbench; now she's sitting on a vial rack, then beside a flask bigger than her torso, then she's palm-sized, her six tiny breasts heaving as she stares up at you with wide, delighted eyes.

{barret}"I'M TINY!" Her voice is small, high, perfectly proportioned to her new size. She sounds like herself through a very small speaker. {barret}"AND I STILL HAVE ALL SIX!"

Sylvie remains unchanged, a bridge between you. She's scribbling notes while her nipple-cocks throb unattended, leaking warm milk onto her notebook. She doesn't notice.

{sylvie}"Size redistribution through resonance!" She's nearly bouncing. {sylvie}"Conservation of morphogenic mass! What left Barret went directly into..." She cranes her neck to look at you, crouched against the ceiling, and her eyes go wide. {sylvie}"...you."

You are enormous. The lab is a dollhouse around you. Your hands could wrap around the support pillars. When you breathe, you feel the draft against the walls.

**And you feel everything.** The resonance at this scale is overwhelming. Every nerve in your body has expanded with you, and the link is carrying sensation from all three of you at once. Barret's six nipples, tingling at miniature scale. Sylvie's twin cock-nipples, throbbing at normal scale. Your own skin, vast and electric, drinking in every air current.

Tiny Barret stands on the workbench, barely four inches tall, craning her neck to look up at you. She puts both hands on her hips. All six of her tiny breasts jut forward.

{barret}"Well? Don't just sit there looking enormous." She grins up at a face that could swallow her whole. {barret}"Pick me up."

You reach down. Your fingertip is bigger than her head. She climbs onto your palm without a moment's hesitation.

Sylvie watches from normal height, milk running in thin lines down her belly, one hand absently squeezing a nipple-cock. {sylvie}"The scale differentiation is stable. No degradation." She swallows. {sylvie}"You should... explore the sensory implications." Her composure is threadbare. {sylvie}"For science."`,
    actions: [
        { label: 'Continue', nextScene: 'tower_visit_cascade_5' }
    ]
};

SCENES['tower_visit_cascade_5'] = {
    id: 'tower_visit_cascade_5',
    image: 'images/tower/cascade/05_contact.webp',
    imagePrompt: null,
    speaker: '',
    text: `Barret in your palm weighs almost nothing. She's warm, though. Impossibly warm, her six-breasted body radiating heat into your skin. Every micro-movement she makes registers magnified... the shift of her hips, the brush of tiny nipples against your palm.

She lies back in the curve of your fingers and stretches. At this scale, each of her breasts is the size of a pea, and she runs both hands down the line of them with deliberate slowness, knowing you feel every touch through the link.

{barret}"This is unreal," she murmurs, and you hear it more through the resonance than through your ears. She arches her back and the sensation ghosts across your body, six points of warmth on your massive palm.

Sylvie approaches. At your scale, she comes up to your hip. Her nipple-cocks are at full attention, each one thick and fully erect, jutting from her breasts with milk beading at their tips. She looks up at you with an expression halfway between scientist and supplicant.

{sylvie}"May I?" She rests a hand on your thigh. Even through your vastly expanded skin, her touch is electric. She traces upward. {sylvie}"The resonance should amplify any contact between..."

She presses her chest against your leg. **Her nipple-cocks drag across your skin and you both moan simultaneously.** At this scale, each cock is a warm, slick pressure tracing lines of fire. She feels it from the giving end. You feel it from the receiving. And through the circuit, you each feel the other's pleasure doubled back.

Barret, in your hand, laughs breathlessly. {barret}"I can feel that. Both sides." She's squirming, pressing herself against your palm. {barret}"Do it again."

Sylvie obliges, rolling her chest against your thigh. Her nipple-cocks leave warm milky trails on your skin. Each pass sends a circuit of pleasure looping through all three of you... touch, receive, echo, amplify, return.

You bring your palm closer to your face. Tiny Barret looks up at you, flushed, panting, six breasts heaving. She reaches up and presses both palms flat against your lower lip. Even that sends sparks cascading through the link.

Sylvie's hands find new surfaces. Her fingers, her mouth, her cock-nipples... all working against your enormous body. At this scale, she can press her entire torso against places a normal partner could only touch with a hand. And tiny Barret, writhing in your palm, is a concentrated point of heat that makes your fingers tremble.

**The resonance hums higher, feeding pleasure in a tightening loop between three bodies at three different scales.** You feel yourself building. All three of you building.

Then the device makes a sound it hasn't made before. Not a hum. A crack.

The crystals flare white.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_visit_cascade_6' }
    ]
};

SCENES['tower_visit_cascade_6'] = {
    id: 'tower_visit_cascade_6',
    image: 'images/tower/cascade/06_fusion.webp',
    imagePrompt: null,
    speaker: '',
    text: `The white light hits like a wave. You feel the link twist, distort, pull tight. Barret cries out in your palm... not pain, but shock. Sylvie gasps below you.

And then Barret isn't in your palm anymore.

She doesn't fall. She doesn't vanish. She flows. Her tiny body becomes light, becomes warmth, becomes a current that pours from your hand and streaks through the air toward Sylvie like a falling star. You feel her go, like letting out a held breath.

Sylvie staggers as the light hits her. Barret's warmth sinks into her skin and **Sylvie's body changes.** Shoulders widen. Hips broaden. Below her original breasts, Barret's extra pairs swell into being... six breasts crowding her torso. But the merge isn't finished. The lowest pair shudders, softens, and dissolves back into her skin. You feel it through the link... not loss, but redistribution. The mass flows upward. Sylvie's cock-nipples, already thick, surge outward, swelling fatter, longer, the shafts thickening as they drink in what the vanished breasts gave up. **Four breasts. The upper pair crowned with cock-nipples even thicker than before, the lower pair tipped with stiff, sensitive nipples that glisten with milk.**

Her white hair darkens at the roots, red bleeding upward through the strands until both colors twist together into something new. Her face softens, sharpens, settles... cheekbones shifting, lips filling, the angles rearranging until the face looking out is neither Sylvie nor Barret but unmistakably both.

The voice that comes out is new. Layered. Sylvie's precision braided through Barret's warmth.

"What..." She blinks. Touches her own face with both hands. "I'm... we're... I."

Not we. I. The merger isn't two minds sharing a body. It's two minds becoming one. Barret's memories and Sylvie's memories settling together like shuffled cards, each thought carrying two lifetimes of context. She remembers building the cascade device AND being dared by Corwin to try it. She remembers the equations AND the tankard of ale. And she is, she realizes with a blink of surprise, a little drunk. Barret's two hours of liquid courage didn't vanish in the merge. They diluted. Sylvie's razor focus now has a pleasant warm blur at the edges.

"I can feel everything." She looks down at herself with eyes that hold Barret's boldness and Sylvie's wonder in equal measure. Between her legs, Sylvie's cock stands at attention, and she wraps a hand around it with a sound that is half gasp and half laugh. "I've always had this AND I've never felt one before. Both. At once."

**Four breasts, the upper pair crowned with dripping milk-slick cock-nipples thicker than ever, the lower pair soft and full with stiff nipples beading milk.** Two arms. One cock, throbbing. One face that carries two women's worth of hunger.

"The sensory bandwidth is..." The clinical instinct surfaces, then Barret's impatience drowns it. She shakes her head, grinning. "Everything. It's everything at once." Every breath moves four breasts. Every heartbeat throbs through three cocks... the one between her legs and the two at her chest. All of them are leaking thick streams of milk.

You've been shrinking during the merge. The cascade rebalancing. You're normal-sized again, crouched in the lab, watching this extraordinary being take her first breaths. One face turns to you. One pair of eyes that holds two women's worth of want.

"Get over here." Barret's directness. Then softer, a breath later: "Please." Sylvie's ache.`,
    actions: [
        { label: 'Go to her', nextScene: 'tower_visit_cascade_7' }
    ]
};

SCENES['tower_visit_cascade_7'] = {
    id: 'tower_visit_cascade_7',
    image: 'images/tower/cascade/07_discovery.webp',
    imagePrompt: null,
    speaker: '',
    text: `You cross the lab. The merged form sits on the edge of the workbench, arms braced behind her, four breasts heaving. Up close, the merger is beautiful... her skin shifts in tone across her body like a gradient, and her hair is a twist of red and white that catches the crystal light. Her face is striking. New. And the expression on it is something neither woman alone could have worn.

Curious. Hungry. Calculating. And just a little flushed in a way that has nothing to do with arousal. She sways, catches herself on one arm, and laughs.

The resonance link is still live. You can feel what she feels. And what she feels right now is not confusion. It's clarity... with a warm, loose edge. Two lifetimes of knowledge and desire fused into a single, focused intelligence, and all of it pointed at you. The alcohol makes her fearless where Sylvie alone would have hesitated. The brilliance makes her precise where Barret alone would have been sloppy.

"Every sensation is compounded." Her hand cups a breast. She gasps, then immediately does it again, harder, testing. Cataloguing. When she finds a cock-nipple and squeezes, milk beads between her fingers and she moans. When she wraps a hand around the shaft between her legs, her eyes don't flutter shut. They stay open. Locked on yours. Watching your reaction while she experiments on herself.

"Fascinatin'," she breathes, the word slurring just slightly at the end. Then she grins, and there is nothing scientific about it. "I know exactly what I want to do with you. I know how to do it. And I have no patience left."

She turns to you. The cock between her legs is hard, the upper cock-nipples flushed and dripping milk, the lower breasts heaving with stiff wet nipples. Four breasts rise and fall with quickening breath. She is a landscape of sensation, and the mind behind those eyes has the curiosity to explore every inch of you and the directness to take what she wants without hesitation.

That combination should probably frighten you. It doesn't.

"Touch me." Not a request. An instruction, delivered with the calm authority of someone who has already calculated exactly how good it's going to feel.

You do. **Your hands on the merged body send triple sensation cascading through all three of you.** You feel your hands touching her. She feels being touched. And through the link, you feel what she feels being touched by you. An infinite mirror of pleasure.

Your mouth finds hers. She kisses back like she's conducting an experiment and devouring you at the same time. Your hands work down the rows of breasts, and she watches with bright, fierce attention, gasping at each one but never closing her eyes. When you take a cock-nipple between your lips, thick milk floods your tongue, warm and sweet, and she arches hard, both hands grabbing the workbench edge. The sound she makes is low and raw and delighted.

"There." She's already guiding your head to the next one. "Again. Harder."

The cock throbs against your belly. She rolls her hips and the motion is deliberate, precise, a mind that understands leverage and a body that craves friction working in terrifying concert.

"More," she says. Not half command and half prayer. All command. She already knows she'll get it.

The device crackles. The crystals glow white again. Something is building.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_visit_cascade_8' }
    ]
};

SCENES['tower_visit_cascade_8'] = {
    id: 'tower_visit_cascade_8',
    image: 'images/tower/cascade/08_envelopment.webp',
    imagePrompt: null,
    speaker: '',
    text: `The wave hits you this time. Not growth, not shrinking, not duplication. Something entirely new.

Your skin tingles, then glows. A faint golden translucence spreads across your arms, your belly, your thighs. Warmth pools low in your body, deep and liquid, and you feel yourself becoming... receptive. Pliant. Every part of you softening, loosening, wanting to be filled.

"Your morphogenic field is restructuring." She watches you with bright, fascinated eyes. "Internal elasticity is increasing exponentially. You're becoming..." She trails off. Tilts her head. "Interesting."

She crosses the lab to you. Her hands find your arms first. She squeezes, watching the skin dimple and spring back with exaggerated elasticity. She pinches the skin of your hip and pulls. It stretches like warm taffy, further than skin should, and snaps gently back when she lets go. No pain. Just a deep, pleasant tingle.

"Everything," she murmurs, running her hands across your stomach, your ribs. "Every surface." Her fingers trail upward and find your nipple. She presses it with her thumb. It yields. Sinks inward. Not like flesh compressing... like an opening, giving way.

Her eyes light up.

She takes the nipple between two fingers and gently pulls it apart. It opens. Stretches. A soft, warm channel where solid flesh should be, the inner walls slick and sensitive and glowing faintly gold. You gasp at the sensation... it's intimate in a way you have no reference for, as if she's found a door in your body you never knew existed.

"Oh, I have an idea." The grin on her face is dangerous. Brilliant and tipsy and absolutely certain.

She pushes you gently onto the workbench and climbs over you. Lowers herself until her chest hovers over yours. Her upper cock-nipples are thick, flushed, dripping milk. She lines one up with your opened nipple and pushes.

**It slides in.** Your nipple stretches around her cock-nipple and takes it, the warm shaft sinking into the channel of your breast. The sensation is unlike anything. Not like penetration below... softer, deeper, more diffuse. You feel her inside your breast, the heat of her spreading through tissue that has never been touched from within.

She does the other. Both cock-nipples buried in your nipples, her lower breasts pressing warm and soft against your ribs, their stiff nipples dragging across your skin. Breast to breast, her body pressed against yours. For a moment neither of you moves. Through the link you feel it from both sides... the tight, wet grip around her cock-nipples, and the extraordinary fullness of having something alive and warm pulsing inside your breasts.

Then she starts to thrust. Slow, rolling movements of her chest against yours. Each push drives her cock-nipples deeper, each pull drags them back across your inner walls. The pleasure is strange and total and builds faster than it should.

"I can feel your heartbeat through these," she whispers against your neck. Her hips roll in time with her chest, cock grinding against your belly, cock-nipples fucking your breasts in slow tandem. "Every beat. Every flutter."

You can feel hers too. Her pulse through the shafts inside you, throbbing against the sensitive walls of your breasts. The resonance catches the rhythm and amplifies it. Her pleasure loops into yours. Yours loops back. The spiral tightens.

She thrusts harder. Faster. Her breathing ragged, her eyes half-closed, the drunk flush on her cheeks deepening. Your breasts are hot, swollen, stretched around her. Through the link you feel the pressure building in her cock-nipples... the same pressure, the same urgency as the cock between her legs. They're going to...

**She comes.** Both cock-nipples erupt inside your breasts. Thick, hot milk floods into you, filling channels that have never been filled, pooling in tissue that stretches to hold it. Her lower nipples spray warm milk across your belly in thin streams. The sensation of being pumped full from the inside sends you over the edge too and you arch hard, crying out, your orgasm squeezing her cock-nipples and milking more from them.

But it doesn't stop. The climax rolls through the resonance and feeds back. She keeps thrusting, keeps coming, and you keep coming, and the milk keeps flowing. Your breasts swell. You can feel them growing, filling, the skin stretching warm and tight as she empties herself into you.

By the time the orgasm finally ebbs, your breasts are enormous. Stretched round and taut like water balloons, the skin shiny and faintly luminous. You look down at yourself and barely recognize your own body... they're massive, each one as big as your head, heavy with liquid weight. When you shift, you feel the gentle slosh of milk that isn't yours.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_visit_cascade_9' }
    ]
};

SCENES['tower_visit_cascade_9'] = {
    id: 'tower_visit_cascade_9',
    image: 'images/tower/cascade/08b_filled.webp',
    imagePrompt: null,
    speaker: '',
    text: `She pulls her cock-nipples free with a wet sound that makes you both shiver. A trickle of thick milk runs from each of your nipples and down the curve of your swollen breasts. She stares at them. At what she did to you. Her expression is pure wonder with a chaser of drunk pride.

"I filled you up." She cups one of your engorged breasts and the pressure makes milk bead at the nipple. She laughs, breathless and delighted. "I filled you up with me."

She frowns, the scientist surfacing through the afterglow. Squeezes your breast again, watches the milk well up. Hefts the weight of it. "That's... a lot of fluid. More than my body should have been able to produce." She traces a finger across the taut, shiny skin. "The cascade must be converting something. Ambient resonance into matter, maybe. Or..." She trails off, staring at your swollen chest with an expression caught between fascination and disbelief. "I need to write this down. After."

You sit up and the weight of them shifts, heavy and warm against your ribs. Every movement sends a ripple through the milk inside you. It feels obscene. It feels incredible.

For a moment you both just breathe. She's kneeling between your legs, flushed and spent, staring at your swollen chest like she can't believe what she did. You can't either. The resonance hums softly between you, a low contented throb.

Then her eyes drift lower. The drunk half of her grins. She pushes you back down, hands on your milk-heavy breasts, and settles between your thighs. Her cock finds you easily... slides inside, and you're both gasping. Warm and thick and right. But through the resonance link, you feel something else. Something different.

You're stretching. Not painfully. Effortlessly. As if your body was designed for this and only just remembered.

She notices. Of course she notices. She pushes deeper and your body accommodates without resistance, the walls of you softening and opening like they have no limit. Her eyes narrow. Curious. Calculating. She slides two fingers in alongside the cock. Then a third. Then all four.

"Does that hurt?" Clinical. Testing. Her cheeks are flushed and her grin is a shade too wide. The drunk half of her is having the time of her life.

It doesn't hurt. It feels like relief. Like a stretch you've been needing for years.

**Her whole hand pushes inside you.** Your belly ripples, your back arches, and the sound you make is somewhere between a moan and a laugh. The resonance sings. She feels what you feel: the fullness, the impossible accommodation, the pleasure of being opened.

"More," you whisper. You don't know why you say it. But you mean it.

Her wrist follows. Then her forearm. She's watching your belly swell outward, the skin glowing gold where it stretches. She pushes her shoulder through and your hips lift off the workbench. You are taking her inside you. Not her cock. Her.

"Remarkable." Her voice is muffled now, half inside your body. She giggles... a sound that is pure Barret, bubbling up through the merged mind like champagne. She pushes deeper. Her head dips forward and slides through, red-and-white hair disappearing between your thighs. **Your belly surges outward as her upper half enters your womb.** The stretch is immense and feels like nothing but pleasure, a fullness so complete it takes your breath and gives back something better.

You look down at yourself. Your stomach is enormous, taut, glowing golden from within. You can see the shape of her through your translucent skin... the curve of her shoulders, the press of four breasts against your inner walls. She's curled inside you, and through the link you feel what she feels.

Warmth. Softness. Safety. A pressure on every side that feels like the world's deepest embrace.

"Oh." Her voice hums through your belly, vibrating against your womb. The wonder in it is naked. "This is... I don't want to leave."

She shifts inside you and you gasp. Every movement she makes sends rolling waves of pleasure through your whole body. Her cock-nipples leak thick milk inside your womb and the warmth of it makes you shudder. You feel her cup one of her own breasts. Bring a cock-nipple to her lips. Drink.

Through the link, you taste it too. Rich. Sweet. Warm. Her own milk, produced by her own impossible body, drunk inside your impossible womb. **The pleasure of producing, the pleasure of drinking, and the pleasure of containing all three cycle through the resonance in a loop that tightens with every swallow.**

She drinks deeper. Your belly pulses with golden light. You cradle the vast swell of your stomach with both hands and feel her heartbeat through the skin. Two heartbeats. Yours and hers. Perfectly synced.`,
    actions: [
        { label: 'Continue', nextScene: 'tower_visit_cascade_10' }
    ]
};

SCENES['tower_visit_cascade_10'] = {
    id: 'tower_visit_cascade_10',
    image: 'images/tower/cascade/09_cascade.webp',
    imagePrompt: null,
    speaker: '',
    text: `The resonance device is screaming. Not the angry scream of broken machinery... a rising tone, pure and clear, matching the pitch building inside both of you.

Inside your womb, she begins to move with purpose. Not trying to escape. Pressing deeper. Curling tighter. Every shift of her body sends rolling contractions of pleasure through your belly, your hips, your spine. She drinks her own milk in long, hungry pulls, and each swallow sends a pulse of warmth through you that makes your toes curl.

"I can feel your heartbeat around me." Her voice vibrates through your womb. "I can feel you feeling me. It's..."

She doesn't finish. She moves again, harder, and you cry out. Your enormous belly ripples with golden light. Through the link you feel what she feels: total enclosure, total warmth, the bliss of being held inside another person's body. And she feels what you feel: the impossible fullness, the deep aching pleasure of containing her, the satisfaction of a body stretched to its absolute limit and loving every inch of it.

The spiral begins. Her pleasure feeds yours. Yours feeds hers. The resonance amplifies every loop. Your belly glows brighter. Her movements become urgent. The milk flows faster and your womb is hot and full and tight with her.

"Close." She gasps it against your inner walls. Her whole body tenses inside you and the pressure is exquisite. "I'm... we're..."

**The spiral breaks.**

The orgasm detonates from the inside. You feel her come first... her cock erupting inside your womb, flooding you with heat on top of heat. Her cock-nipples burst, thick milk mixing with everything else, and the sensation of being filled beyond fullness sends you over the edge. Your womb contracts around her in deep, rolling waves and she screams, muffled and ecstatic, the contractions squeezing pleasure through her entire body. Through the link it loops. Her climax feeds yours. Yours crushes her in waves of bliss that make her come again. And again. **Your belly pulses with golden light like a heartbeat, each pulse a fresh peak, an orgasm that doesn't end so much as echo.**

Golden light. The crystals shatter... all three harnesses exploding into glittering fragments that hang in the air like frozen rain. The device's tone breaks into silence.

The pleasure recedes like a tide. Slowly. Gently. Inside you, the merged form shudders, sighs, and begins to separate. You feel it through your belly... one being untangling into two, memories unshuffling, selves re-forming. And your body, slowly, tenderly, opens. Releases. Barret slides free first, gasping, slick, trembling. Then Sylvie, blinking, disoriented, her hair pure white again. Your belly settles. Your skin loses its glow. Three separate people on the floor of the tower lab.

**Three sets of lungs, heaving. Three bodies. One shared silence that feels like prayer.**`,
    actions: [
        { label: 'Continue', nextScene: 'tower_visit_cascade_11' }
    ]
};

SCENES['tower_visit_cascade_11'] = {
    id: 'tower_visit_cascade_11',
    image: 'images/tower/cascade/10_afterglow.webp',
    imagePrompt: null,
    speaker: '',
    text: `Barret lies on the floor where she emerged, slick and trembling, staring at the ceiling with the expression of someone who has just been born twice. Two breasts again. Her clothes are scattered somewhere. She doesn't care.

{barret}"So." She swallows. Clears her throat. Tries again. {barret}"That happened."

Sylvie is draped across her workbench, lab coat hanging off one shoulder, red dress rumpled beyond rescue. Her nipples are normal again... mostly. One twitches, just once, in a way that nipples don't usually twitch. A single bead of milk wells up and rolls down her breast. She's staring at the ruined device with naked adoration.

{sylvie}"The cascade exceeded every theoretical parameter." She's breathless, flushed, and her voice has a post-orgasmic softness that strips away the scientist entirely. {sylvie}"Every single one."

You sit up. Your body is your own again. Solid, normal, human. But the sensitivity lingers... a pleasant ghost, like the afterimage of bright light. When you brush your arm against the cool stone floor, you shiver. Every surface feels richer. Closer.

{barret}"I can still feel you both." Barret's hand rests on her chest, over her heart. {barret}"Just a little. Like warmth." She's quiet for a moment. Barret is never quiet. Then, softer: {barret}"I remember being her. Being us. One person with everything." She blinks. {barret}"Is that going to fade?"

{sylvie}"Residual resonance." Sylvie sits up, pushing white hair out of her face. But she pauses, fingers in her hair, and you can see it... the flicker of something behind her eyes. She remembers too. Two lifetimes compressed into one mind, now unspooled back into two. {sylvie}"The morphogenic imprint may take time to dissipate. Hours, perhaps." She considers. {sylvie}"Or it could be permanent."

Nobody objects to this.

Barret squeezes one breast experimentally and shivers. Not six anymore... but the sensitivity is still there, humming under the surface. She grins. {barret}"I got four extra tits, shrank to the size of a mouse, became the same person as a futanari scientist, climbed inside someone's womb, and came so hard I think I left my body." She sits up, rolling her shoulders. {barret}"Tuesday."

**She looks at you with eyes that are warm and steady and completely without artifice.** {barret}"Same time next week?"

Sylvie is already sketching on the back of a ruined page of notes. The device is in pieces, crystals shattered, brass filaments bent and twisted. She doesn't seem concerned.

{sylvie}"I need to rebuild this immediately." Her pen flies. {sylvie}"But better. Three harnesses is a starting point. What about four? What about six?" She pauses, tapping the pen against her full lips. One nipple twitches again. She ignores it. {sylvie}"What about the whole town?"

{barret}"Sylvie, no."

{sylvie}"Sylvie, maybe."

You find your clothes. Or what's left of them. The warmth in your chest... the ghost of the link, the echo of two other heartbeats... pulses gently as you descend the tower stairs.

Behind you, Barret's laugh and the scratch of Sylvie's pen.

**The tower has never felt warmer.**`,
    actions: [
        { label: 'Leave the tower', nextScene: 'town_exit_workshop' }
    ]
};

// ----------------------------------------
// TOWER CONTENT GATE
// ----------------------------------------
SCENES['tower_content_gate'] = {
    id: 'tower_content_gate',
    image: 'images/locations/tower.webp',
    imagePrompt: null,
    speaker: '',
    text: '',
    htmlText: `
        <h3 style="margin: 0 0 0.8em 0; color: #c8a86e; font-size: 1.2em;">Blackstone Tower</h3>
        <p style="margin: 0 0 0.6em 0;">This area contains extended transformation and intimate story content
        that goes beyond the main game. Scenes here may include more explicit
        body transformation, absorption, and sexual content.</p>
        <p style="margin: 0 0 1em 0;">Proceed at your own discretion.</p>
        <label class="tower-gate-checkbox">
            <input type="checkbox" id="tower-gate-cb">
            I understand and wish to continue
        </label>
    `,
    onEnter: function() {
        setTimeout(() => {
            const cb = document.getElementById('tower-gate-cb');
            if (!cb) return;
            cb.addEventListener('change', () => {
                const btns = document.querySelectorAll('.action-btn');
                const continueBtn = Array.from(btns).find(b => b.textContent.includes('Continue to Blackstone Tower'));
                if (continueBtn) {
                    continueBtn.disabled = !cb.checked;
                    if (cb.checked) {
                        continueBtn.classList.remove('disabled');
                        // Re-attach click handler since disabled buttons don't get one at render time
                        continueBtn.onclick = function() {
                            gameState.flags.tower_content_acknowledged = true;
                            saveState();
                            SceneManager.playScene('location_tower');
                        };
                    } else {
                        continueBtn.classList.add('disabled');
                        continueBtn.onclick = null;
                    }
                }
            });
        }, 0);
    },
    actions: [
        {
            label: 'Continue to Blackstone Tower',
            disabled: true,
            callback: function() {
                gameState.flags.tower_content_acknowledged = true;
                saveState();
                SceneManager.playScene('location_tower');
            }
        },
        { label: 'Return to Town', nextScene: 'town_navigation' }
    ]
};

// ----------------------------------------
// TOWER LOCATION HUB
// ----------------------------------------
SCENES['location_tower'] = {
    id: 'location_tower',
    image: 'images/locations/tower.webp',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        // Content gate — first-time acknowledgment before entering tower
        if (!gameState.flags.tower_content_acknowledged) {
            SceneManager.playScene('tower_content_gate');
            return 'redirect';
        }

        gameState.currentLocation = 'tower';
        saveState();
        UI.updateHeader();

        // If player has key but hasn't done reveal, trigger the reveal scene
        if (gameState.flags.has_tower_key && !gameState.flags.sylvie_reveal_complete) {
            SceneManager.playScene('tower_reveal_entry');
            return 'redirect';
        }

        // No key yet
        if (!gameState.flags.sylvie_reveal_complete) {
            this.text = "The tower looms overhead, but you don't have a way inside yet. Perhaps there's a key somewhere.";
            this.actions = [
                { label: 'Return to town', nextScene: 'town_navigation' }
            ];
            return;
        }

        // Already visited today - limit to once per day
        if (gameState.towerVisitedToday) {
            this.text = "You've already visited the tower today. It's best to leave Sylvie to her activities for now — you can return tomorrow.";
            this.actions = [
                { label: 'Return to town', nextScene: 'town_navigation' }
            ];
            return;
        }

        // Mark tower as visited for today
        gameState.towerVisitedToday = true;
        saveState();

        UI.advancePhase(true);  // Tower visit consumes a phase

        // One-time absorption scene (20% chance)
        if (!gameState.flags.sylvie_absorption_scene) {
            if (getPhaseRoll('sylvie_absorption', 0.2)) {
                SceneManager.playScene('sylvie_absorption_arrival');
                return 'redirect';
            }
        }

        // Post-reveal: go straight into a visit scene
        SceneManager.playScene('pool:tower_visit');
        return 'redirect';
    },
    actions: []
};

// ==========================================
// SYLVIE ABSORPTION SCENE
// ==========================================
// A 6-beat tower visit scene where Lenna is transformed to goddess stats
// and Sylvie absorbs them back, ascending to goddess form herself

SCENES['sylvie_absorption_arrival'] = {
    id: 'sylvie_absorption_arrival',
    leftImage: 'images/tower/sylvie-absorption/sylvie_1_base_clothed.webp',
    rightImage: 'images/tower/sylvie-absorption/lenna_1_goddess.webp',
    speaker: '',
    text: 'You make your way up the winding stairs of Blackstone Tower, the familiar scent of tea and chemicals greeting you. At the top, you find **Lenna standing in the middle of Sylvie\'s lab, transformed beyond recognition.**\n\nMassive in every dimension. Carved muscle rippling beneath soft skin. Her breasts heave with each breath, enormous and perfect. Her hips are wide, her ass overwhelming. Between her legs, her pussy is swollen and engorged, glistening with arousal. She\'s completely naked, flushed pink from head to toe, fidgeting constantly... shifting her weight, adjusting her braid with trembling hands, biting her lip. She looks **completely overwhelmed.**\n\nSylvie circles her with a notebook, scribbling notes, utterly delighted. {sylvie}"Remarkable stability at maximum parameters... subject remains conscious and responsive... elevated heart rate but no distress signals..."\n\nLenna spots you. **Relief floods her face.** {lenna}"Oh thank the gods," she breathes. {lenna}"Someone normal."',
    onEnter: function() {
        gameState.currentLocation = 'tower';
        saveState();
        UI.updateHeader();
    },
    actions: [
        { label: 'Continue', nextScene: 'sylvie_absorption_problem' }
    ]
};

SCENES['sylvie_absorption_problem'] = {
    id: 'sylvie_absorption_problem',
    leftImage: 'images/tower/sylvie-absorption/sylvie_1_base_clothed.webp',
    rightImage: 'images/tower/sylvie-absorption/lenna_1_goddess.webp',
    speaker: '',
    text: 'Sylvie looks up from her notes, beaming. {sylvie}"Oh, wonderful! You\'re just in time to observe the results."\n\nLenna takes a careful breath... you can see it\'s difficult with those breasts. Her voice comes out small, bashful. {lenna}"I came because Sylvie said she had... an exciting experience to offer. I thought maybe... a cup size? Maybe two?"\n\nShe gestures helplessly at herself. {lenna}"Not... this."\n\nYou can see it written all over her: the sensation is incredible, overwhelming, but she\'s drowning in it. Too much body. Too much stimulation. Every breath, every shift of weight sends ripples of pleasure through her frame. Her thighs press together involuntarily.\n\n{lenna}"Could you... I mean, if it\'s not too much trouble..." She pulls her braid forward nervously, a classic Lenna gesture that looks absurd on this goddess body. {lenna}"Could you bring me back down?"\n\nSylvie glances at her workbench, then pats her pockets absently for something. Half a device is scattered in pieces, components everywhere. She hadn\'t quite thought about the \'undo\' part.\n\nAfter a moment, she brightens. {sylvie}"I can\'t shrink them. But I can **take** them. Transfer them to myself."\n\nLenna\'s eyes go wide. Then she nods, quickly. {lenna}"Yes. Please. That would be... yes."',
    actions: [
        { label: 'Continue', nextScene: 'sylvie_absorption_muscle' }
    ]
};

SCENES['sylvie_absorption_muscle'] = {
    id: 'sylvie_absorption_muscle',
    leftImage: 'images/tower/sylvie-absorption/sylvie_2_muscle.webp',
    rightImage: 'images/tower/sylvie-absorption/lenna_2_no_muscle.webp',
    speaker: '',
    text: 'Sylvie activates a device on the workbench. It hums, crystals glowing warm amber.\n\n**Lenna\'s body softens.** The carved definition melts away like ice under sunlight. Her shoulders narrow, arms slimming from powerful to delicate. The thick muscle in her thighs softens, her calves losing their sharp definition. She exhales deeply, a sound of pure relief, the tension leaving with the mass.\n\nShe still has the enormous breasts, the wide hips, the swollen pussy. But without the muscle, she looks less imposing. More like herself. A shiver runs through her as the flesh shifts, a ripple of involuntary pleasure, but the look on her face is relief.\n\n**Sylvie staggers.** Her slender frame suddenly surges with definition. Abs carve in, deep and perfect. Her arms thicken, shoulders broadening. Her back flexes involuntarily, muscles she didn\'t have a moment ago now rippling beneath pale skin.\n\nShe flexes one arm, staring at it in wonder. {sylvie}"Oh. Oh, that\'s... that\'s quite something."\n\nThere\'s a sharp rip, her lab coat tearing at the seams. Then her dress. The fabric can\'t contain her suddenly muscular frame. Within seconds she\'s standing there naked, flushed, breathing hard.\n\n{sylvie}"Well," she says, slightly breathless. {sylvie}"That\'s... unexpected. In a good way. Very good way."',
    actions: [
        { label: 'Continue', nextScene: 'sylvie_absorption_chest' }
    ]
};

SCENES['sylvie_absorption_chest'] = {
    id: 'sylvie_absorption_chest',
    leftImage: 'images/tower/sylvie-absorption/sylvie_3_chest.webp',
    rightImage: 'images/tower/sylvie-absorption/lenna_3_no_chest.webp',
    speaker: '',
    text: 'Sylvie adjusts the device, then activates it again.\n\n**Lenna\'s breasts shrink.** Slowly at first, then faster, until there\'s nothing left. Completely flat. She straightens up properly for the first time, rolling her shoulders back, taking a full breath without obstruction. The weight off her shoulders is literal.\n\nHer cheeks are still pink, her breathing still quick, but her expression is settling. More composed. She looks down at her flat frame, then at you, and manages a small, embarrassed smile. {lenna}"Better," she says softly.\n\n**Sylvie gasps.** Her breasts swell, modest to enormous in seconds. The weight hits her all at once. She cups them instinctively, eyes going wide, feeling the heavy softness fill her hands.\n\nShe lets out a breathless laugh, flushed now not just from surprise but genuine arousal. {sylvie}"I can see why you wanted to keep these." She hefts the weight, squeezing, feeling them fill her hands and spill over. {sylvie}"Oh, they\'re... fuck. No, no, I understand. **Still.**"\n\nHer breathing is heavier now. Each transfer is hitting harder than the last.',
    actions: [
        { label: 'Continue', nextScene: 'sylvie_absorption_butt' }
    ]
};

SCENES['sylvie_absorption_butt'] = {
    id: 'sylvie_absorption_butt',
    leftImage: 'images/tower/sylvie-absorption/sylvie_4_butt.webp',
    rightImage: 'images/tower/sylvie-absorption/lenna_4_no_butt.webp',
    speaker: '',
    text: 'The third transfer.\n\n**Lenna\'s hips narrow.** The wide curve flattens, her ass shrinking from overwhelming to modest. Her entire frame narrows, returning to something recognizably her. She\'s starting to look like the quiet librarian again. Naked, yes. Still flushed. Still has the engorged pussy. But otherwise... herself.\n\nShe pulls her braid forward nervously, a gesture that finally looks right on her body. She\'s almost there.\n\nSylvie **grips the edge of her workbench** as her hips widen and her ass fills out. The curve is sudden, dramatic. Perfect.\n\nShe\'s breathing hard now, legs trembling slightly. Her free hand braces against the table. You can see it in her face... every transfer is compounding. The arousal building. The final one is coming and she knows it.\n\n{sylvie}"One..." She swallows hard. {sylvie}"One more. Just one more."',
    actions: [
        { label: 'Continue', nextScene: 'sylvie_absorption_climax' }
    ]
};

SCENES['sylvie_absorption_climax'] = {
    id: 'sylvie_absorption_climax',
    leftImage: 'images/tower/sylvie-absorption/sylvie_5_goddess_orgasm.webp',
    rightImage: 'images/tower/sylvie-absorption/lenna_5_base_cum.webp',
    speaker: '',
    text: 'The final transfer. Lenna gasps, soft, involuntary, as the last stat leaves her. Her swollen pussy shrinks back to normal, the hypersensitivity fading. The constant overwhelming sensation... gone.\n\nShe sinks to her knees, sitting back on her legs. Exhausted. But the look on her face is pure **contentment.** She\'s herself again.\n\nSylvie is not so composed. Her cock surges in size, the final absorption hitting like lightning. She arches her back, hands grasping at nothing, and **comes completely undone.**\n\nIt\'s involuntary. Total. Overwhelming. She cums hard, body shaking, head tilted back, eyes squeezed shut. The sounds she makes are utterly beyond her control. The cheerful scientist is gone. For this moment there is only sensation, pure and absolute.\n\nHer cum arcs rightward, splattering across Lenna, who sits there quietly in seiza, too exhausted to move, just accepting it with the same patient relief she\'s worn since the transfers began.\n\nYou quietly make your leave, closing the tower door behind you. Sylvie will be fine. More than fine, probably.',
    onEnter: function() {
        gameState.flags.sylvie_absorption_scene = true;
        saveState();
    },
    actions: [
        {
            label: 'Leave them to it',
            nextScene: 'town_exit_workshop'
        }
    ]
};

// Register tower visit scene pool
SceneManager.registerPool('tower_visit', [
    'tower_visit_bunny',
    'tower_visit_dog',
    'tower_visit_fox',
    'tower_visit_cow',
    'tower_visit_elf',
    'tower_visit_dragon',
    'tower_visit_rubber',
    'tower_visit_both_genitals',
    'tower_visit_penis_experiment',
    'tower_visit_miniature',
    'tower_visit_miniature_latex',
    'tower_visit_cascade',
    'tower_skinsuit_arrival',
    'tower_visit_thornwick_bimbo'
]);

// ----------------------------------------
// BOTH GENITALS SCENE
// ----------------------------------------
SCENES['tower_visit_both_genitals'] = {
    id: 'tower_visit_both_genitals',
    image: 'images/tower/sylvie_both_genitals.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: '',
    onEnter: function() {
        const visitReason = getRandomVisitReason();

        this.text = `${visitReason}

You find Sylvie standing in the middle of the lab, hands on her hips, lab coat hanging open. She's not wearing anything underneath it. At all.

"Oh good, you're here!" She beams at you like you've arrived just in time for tea. "I've had a breakthrough. A *real* one this time, not like the tentacle thing."

She gestures downward with both hands, presenting herself with the pride of someone unveiling a new invention.

**Between her legs, her cock stands at attention, thick and flushed. And beneath it, unmistakably, the soft folds of a pussy, puffy and pink.**

"Best of both worlds," she announces. "Fully functional. Both of them. Simultaneously."

She bounces on her heels, which does several things at once.

"Do you have *any idea* how long the genital reshaper has been limited to an either-or configuration? Years. I could never crack the dual-channel resonance problem. The device just overwrites one with the other." She waves a hand dismissively. "Brute force. Inelegant."

She turns slightly, letting you see from another angle. She's clearly been admiring herself for a while.

"But if you *layer* the resonance fields, run them in parallel instead of in series, the tissue doesn't have to choose. It just... does both." She grins. "I tested it on myself, obviously. Wouldn't be much of a scientist if I didn't."`;
    },
    actions: [
        { label: '"And it works?"', nextScene: 'tower_visit_both_genitals_works' }
    ]
};

SCENES['tower_visit_both_genitals_works'] = {
    id: 'tower_visit_both_genitals_works',
    image: 'images/tower/sylvie_both_genitals.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `Sylvie's eyes light up.

"Works? *Works?*" She laughs. "Dear, it works *beautifully.* Full sensitivity in both. Independent arousal pathways. I can..." She catches herself, glancing at you with a flicker of self-awareness.

"Well. Let's just say I've been very thorough in my testing." A faint blush crosses her cheeks, which is remarkable given that she's standing naked in front of you without a shred of embarrassment.

"The real question is whether the technique can be applied through the workshop's reshaper. Different calibration, different power source..." She's already wandering toward her workbench, muttering about resonance frequencies.

She pauses at the bench, glancing back over her shoulder.

"I'll send you my notes once I've cleaned them up. Could be useful for your clients, don't you think? Some people might want the full package."

She winks, then immediately knocks a flask off the bench with her elbow.

"That wasn't important."`,
    actions: [
        { label: 'Leave her to her research', nextScene: 'town_exit_workshop' }
    ]
};

// ----------------------------------------
// PENIS EXPERIMENT SCENE (5 beats)
// ----------------------------------------
SCENES['tower_visit_penis_experiment'] = {
    id: 'tower_visit_penis_experiment',
    image: 'images/tower/penis-experiment/beat1_setup.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: '',
    onEnter: function() {
        const visitReason = getRandomVisitReason();

        this.text = `${visitReason}

You find Sylvie bent over a workbench, lab coat hanging open over bare skin. She seems to have already removed her dress for some reason. Wires trail across the table. A warning label has been crossed out with red ink and replaced with a hand-drawn smiley face.

She glances back over her shoulder, beaming. "Oh! Perfect timing. I've just removed the safety limiters from the sizing device." She holds up a screwdriver triumphantly. "The standard model caps at level three. Adequate, I suppose. But science demands we ask... **what happens at level ten?**"

She's already pointing it at herself before you can respond.

"Don't worry, it's not permanent. Once the device is off, everything shrinks back to normal gradually. Perfectly safe." She waves the screwdriver dismissively. "Probably."

"Now stay right there. I'll need a witness. For the research notes."`;
    },
    actions: [
        { label: 'Watch the experiment', nextScene: 'tower_visit_penis_experiment_2' }
    ]
};

SCENES['tower_visit_penis_experiment_2'] = {
    id: 'tower_visit_penis_experiment_2',
    image: 'images/tower/penis-experiment/beat2_growing.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `The device hums. Warmth floods through her lower body and she shrugs off the lab coat, letting it fall to the floor. "Getting warm... that's normal, probably."

Her cock begins to swell, pushing past its usual modest size. She watches with clinical fascination as it thickens and lengthens, growing past anything the workshop devices could produce.

"Level four... five... six..." She's counting off like she's reading a thermometer. Her cock hangs heavy between her thighs, bigger than her forearm now. "Oh, this is wonderful! The growth curve is exponential, not linear. I'll need to recalibrate the..."

She shifts her weight, pressing her thighs together. A flush creeps up her neck. "It's also, um. Very sensitive at this size. More nerve endings than I anticipated." She clears her throat. "Purely a... a scientific observation."

She trails off, blinking. The device is still humming.

"Hm. It's not stopping."`,
    actions: [
        { label: '"Should I turn it off?"', nextScene: 'tower_visit_penis_experiment_3' }
    ]
};

SCENES['tower_visit_penis_experiment_3'] = {
    id: 'tower_visit_penis_experiment_3',
    image: 'images/tower/penis-experiment/beat3_worried.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `It doesn't stop. Heat pulses through the shaft in waves, each one pushing it longer. She steadies herself, arms out, trying to keep her balance against the shifting weight.

"Oh... oh, I can feel every inch of it. It's like warmth stretching outward. Tingling. The skin is so tight." She shudders, biting her lip. "And the veins, I can feel them throbbing. Every heartbeat just... pulses through the whole thing. It's..."

Her hips rock forward involuntarily. She catches herself. "That's... I'm not... this is purely physiological. Increased blood flow to the..." She swallows hard. "God, it feels good though. Is it supposed to feel this good?"

She sways on her feet, cheeks burning. "Quite a lot of blood being redirected from... from somewhere important. My head is getting very..."

Her eyes lose focus. Another pulse of warmth and she gasps, thighs squeezing together.

"What level was I counting?" She giggles. That's not a good sign.`,
    actions: [
        { label: 'Keep watching', nextScene: 'tower_visit_penis_experiment_4' }
    ]
};

SCENES['tower_visit_penis_experiment_4'] = {
    id: 'tower_visit_penis_experiment_4',
    image: 'images/tower/penis-experiment/beat4_henry.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `The length finally stabilizes, but then the girth starts. A deep, aching pressure builds inside the shaft as it swells thicker, stretching wider in slow, heavy pulses. Each one sends a wave of heat radiating through her whole body.

Sylvie wraps her arms around it, hugging it against her body. She can feel every throb, every surge of warmth filling it fuller. Her face presses against the taut skin, eyes half-lidded and completely glazed over. She has the expression of someone who has forgotten their own name.

She strokes the shaft dreamily.

"His name is Henry."

You stare at her.

"Henry and I are getting married." She presses her cheek against it, smiling. "He's very handsome. Don't you think he's handsome?"

**She has completely forgotten about the experiment.**

"I love him," she murmurs, eyes drifting closed. "I love him so much."

Her hips give a slow, absent thrust against nothing. Then another. She doesn't seem to notice she's doing it, face still nuzzled against the shaft, humming contentedly.

The modified device sits on the workbench behind her, still humming cheerfully. The smiley face on the warning label grins at you.`,
    actions: [
        { label: 'Turn off the device and leave', nextScene: 'tower_visit_penis_experiment_5' }
    ]
};

SCENES['tower_visit_penis_experiment_5'] = {
    id: 'tower_visit_penis_experiment_5',
    image: 'images/tower/penis-experiment/beat4_henry.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: `You watch her for a moment longer. She's gently thrusting her hips against the air, cheek pressed to the shaft, murmuring something about wedding flowers.

You walk over to the workbench and flick the device off. The humming stops.

Sylvie doesn't notice.

"Lilies," she whispers. "Henry likes lilies."

You let yourself out.`,
    actions: [
        { label: 'Leave her to it', nextScene: 'town_exit_workshop' }
    ]
};

// ----------------------------------------
// MINIATURE SCENE (4 beats — Sylvie shrinks herself, rides Fiona's penis)
// ----------------------------------------
SCENES['tower_visit_miniature'] = {
    id: 'tower_visit_miniature',
    image: 'images/tower/miniature/fiona_reclining.webp',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        gameState.flags.seen_tower_miniature = true;
        saveState();
        const visitReason = getRandomVisitReason();

        this.text = `${visitReason}

You hear them before you see them. Two voices drifting down the spiral staircase. Fiona's sharp, breathy gasps, and Sylvie's cheerful chatter, though Sylvie's voice sounds oddly distant. Tinny. Like she's speaking through a keyhole.

You round the corner into the main lab and stop.

Fiona is sprawled across a lounge chair, completely naked. And equipped with a cock, thick, flushed, and standing rigid. Whether Sylvie gave it to her or she came with it, you can't tell, but it's twitching with a steady rhythm that suggests something is actively happening to it. Her eyes are half-lidded, her tanned skin sheened with sweat. Her fingers grip the armrests. She looks like she's trying very hard to hold still and failing.

She notices you and her whole face goes red.

{fiona}"I didn't... this isn't..." She swallows. Her hips buck involuntarily. {fiona}"Not my idea."

From somewhere very small and very close to Fiona's lap, Sylvie's voice rings out, bright and welcoming:

{sylvie}"Oh! Don't be shy, come on in! We're just in the middle of something. Well, I'm in the middle of something. Fiona is mostly just lying there."

{fiona}"I'm not just..." Fiona hisses through clenched teeth. Another gasp. {fiona}"...lying here."

You can't see Sylvie anywhere.`;
    },
    actions: [
        { label: 'Approach cautiously', nextScene: 'tower_visit_miniature_2' }
    ]
};

SCENES['tower_visit_miniature_2'] = {
    id: 'tower_visit_miniature_2',
    image: 'images/tower/miniature/sylvie_riding.webp',
    imagePrompt: null,
    speaker: '',
    text: `You step closer, scanning the lounge chair for the source of Sylvie's voice. Your eyes travel down Fiona's body to her cock, and...

**Sylvie is there. All of her. About six inches tall, straddling Fiona's shaft like it's a fallen tree.**

Her tiny lab coat is gone, her white hair loose for once, and she's wrapped around the girth with her arms and legs, grinding her entire body against the taut skin in slow, deliberate rolls.

She looks up at you and waves.

{sylvie}"Hi! Isn't this fun? I miniaturized myself about an hour ago. The shrinking device needed a real-world stress test, and Fiona volunteered her..." She glances down at the shaft beneath her. {sylvie}"...facilities."

{fiona}"Didn't... volunteer." Fiona groans, head tipping back. {fiona}"She climbed on before I could..."

{sylvie}"You said 'what the fuck' which I interpreted as enthusiastic consent," Sylvie says brightly, resuming her grinding. She presses her cheek against the shaft and sighs contentedly. {sylvie}"The sensitivity at this scale is incredible. Every nerve ending in my body is pressed against warm skin. It's like being hugged by a furnace."

She looks back up at you, face flushed, eyes sparkling.

{sylvie}"Don't I look cute like this? Tell me I look cute. I feel adorable."

Fiona makes a strangled noise as Sylvie shifts her weight.

Sylvie's grinding becomes more urgent, her tiny body rocking against the shaft in quickening waves. Fiona's breath comes in ragged bursts, her fingers white-knuckled on the armrests.

{sylvie}"Fiona," Sylvie says, her voice breathy and small. She's stopped being chatty. That's a first. {sylvie}"Fiona, I want you to put it in."

Fiona's eyes snap open. {fiona}"You're... six inches tall."

{sylvie}"I know." Sylvie repositions herself at the tip, legs dangling on either side. She looks absurdly tiny against it. {sylvie}"The elasticity modifications I made to myself should hold. I calculated the tolerances. Probably."

Fiona mutters something, but her hand is already moving, thumb and forefinger gently guiding Sylvie into position. Her touch is surprisingly delicate for someone shaking with arousal.

{fiona}"Ready?" Fiona whispers.

Sylvie nods, biting her lip. For a single moment she looks almost nervous. Then she grins. {sylvie}"For science."`,
    actions: [
        { label: '"You look... very small."', nextScene: 'tower_visit_miniature_3' },
        { label: '"Should I leave you two alone?"', nextScene: 'tower_visit_miniature_3' }
    ]
};

SCENES['tower_visit_miniature_3'] = {
    id: 'tower_visit_miniature_3',
    image: 'images/tower/miniature/penetration.webp',
    imagePrompt: null,
    speaker: '',
    text: `**Fiona pushes.**

Both of them cry out at the same time, Fiona's voice a low, shuddering moan that fills the room, Sylvie's a tiny, piercing gasp that shouldn't be as loud as it is. Sylvie's whole body arches, her back curving, her mouth open in a silent O.

{sylvie}"Oh," Sylvie breathes. {sylvie}"Oh, that's... that's a lot."

Fiona can barely speak. Her hips are trembling, every muscle in her body locked rigid. {fiona}"I can feel... all of you."

{sylvie}"Mutual," Sylvie squeaks.

It doesn't last long. It can't. The sensation is too much for either of them at this scale. Fiona's hips rock in slow, shallow pulses, each one drawing a shuddering gasp from both of them. Sylvie clings to the tip, legs wrapped tight, her tiny body trembling with every movement.

{sylvie}"I can feel it... filling me," Sylvie whispers, voice cracking. {sylvie}"It's so warm. My whole body is just... oh god, it's stretching. I can feel my belly stretching."

You can see it happening. Her stomach swells visibly with each throb, her skin pulling taut, rounding outward like a balloon filling with warm water. She presses her hands against it, eyes wide, mouth open.

Fiona comes with a raw, shuddering cry, her whole body seizing, hips lifting off the lounge chair. You can see the pulse travel through her cock in heavy, visible throbs. Each one pushes Sylvie's belly wider.

{sylvie}"Oh... oh, there's so much," Sylvie gasps, voice thin and reedy. {sylvie}"I'm so full. I'm so... nnh..."

She shudders, limbs going rigid, and then goes limp. A tiny, overwhelmed whimper. Her belly is round and taut, impossibly swollen for her size.

When Fiona's hips finally lower back to the chair, she lies there panting for a long moment. Then, with trembling fingers, she carefully lifts Sylvie off and lays her on a folded cloth beside the lounge chair. The gentleness is almost tender. Sylvie's pussy is visibly stretched, gaping and flushed, slowly tightening back from a size no six-inch body should have accommodated.

{fiona}"You okay?" Fiona whispers, still catching her breath.

**Sylvie is lying on her back on the cloth, belly round as a marble, staring at the ceiling with a dreamy, glazed expression.** She looks like a tiny, satisfied frog sunning itself on a rock.`,
    actions: [
        { label: 'Watch', nextScene: 'tower_visit_miniature_4' }
    ]
};

SCENES['tower_visit_miniature_4'] = {
    id: 'tower_visit_miniature_4',
    image: 'images/tower/miniature/aftermath.webp',
    imagePrompt: null,
    speaker: '',
    text: `{sylvie}"I'm wonderful," Sylvie announces to no one in particular. She pats her distended stomach and hiccups. {sylvie}"That's... a lot of volume at this ratio. I may need to recalculate the fluid dynamics."

She stretches her tiny arms above her head, arching her back against the cloth. Her belly wobbles.

{sylvie}"I'm going to write a paper," she declares. {sylvie}"'On the Sensation of Being Extremely Small and Extremely Full: A First-Person Account.' It'll be my masterwork."

{fiona}"You're not publishing that."

{sylvie}"Appendix A will include diagrams."

Fiona covers her face with both hands.

You let yourself out. Behind you, Sylvie is already dictating notes to herself about elasticity thresholds and optimal size ratios. Fiona is asking where her clothes went.

Some experiments, you decide, are best left to the professionals.`,
    actions: [
        { label: 'Leave them to it', nextScene: 'town_exit_workshop' }
    ]
};

// ----------------------------------------
// MINIATURE LATEX SCENE (requires seen_tower_rubber flag)
// If player hasn't seen the rubber scene, redirect to normal miniature
// ----------------------------------------
SCENES['tower_visit_miniature_latex'] = {
    id: 'tower_visit_miniature_latex',
    image: 'images/tower/miniature/fiona_reclining.webp',
    imagePrompt: null,
    speaker: '',
    text: '',
    onEnter: function() {
        if (!gameState.flags.seen_tower_rubber || !gameState.flags.seen_tower_miniature) {
            SceneManager.playScene('tower_visit_miniature');
            return 'redirect';
        }

        const visitReason = getRandomVisitReason();

        this.text = `${visitReason}

You hear them before you round the corner. The sounds are familiar this time. Fiona's ragged breathing, Sylvie's tiny, cheerful voice. You know exactly what you're going to find.

Sure enough. Fiona on the lounge chair, naked, cock rigid. Sylvie, six inches tall, straddling the shaft and grinding contentedly. They've clearly made a habit of this.

Sylvie spots you and waves. {sylvie}"Oh good, you're here! Come closer, come closer. I have a favour to ask."

Fiona opens one eye. {fiona}"Don't."

{sylvie}"Shh." Sylvie beckons you over with a tiny hand. {sylvie}"I've been thinking about last time. The volume was lovely but my body couldn't quite handle all of it. So I've made some preparations."`;
    },
    actions: [
        { label: 'Step closer', nextScene: 'tower_visit_miniature_latex_2' }
    ]
};

SCENES['tower_visit_miniature_latex_2'] = {
    id: 'tower_visit_miniature_latex_2',
    image: 'images/tower/miniature/sylvie_riding.webp',
    imagePrompt: null,
    speaker: '',
    text: `You step closer. Sylvie points a tiny arm at the workbench.

{sylvie}"Two things. First, see that red button next to the brass cylinder? That's a testicular volume amplifier. It'll gradually increase Fiona's semen production. I want to be really, properly filled this time." She shivers with anticipation. {sylvie}"Second, grab the latex device from the second shelf. The one with the pink label. Remember the rubberization experiment? I'll need my skin to stretch."

{fiona}"You didn't mention any of this to me," Fiona mutters.

{sylvie}"I'm mentioning it now. Press the button first, then grab the device and stand by."

You press the button. A brass device whirs to life and fires a thin beam of light directly at Fiona's testicles. They pulse, visibly swelling.

{fiona}"What..." Fiona's eyes go wide. A flush of warmth spreads up from her lap. {fiona}"Something's... warm. Really warm."

{sylvie}"That's the amplifier working. My calculations have a fifteen-minute ramp-up, so we have plenty of time to..." She trails off. Fiona's cock is throbbing urgently beneath her. {sylvie}"Oh. Oh, that's much faster than anticipated."

Fiona's hips jerk. {fiona}"Sylvie... I need to..."

{sylvie}"The volume ratio at this rate will be... significant." Sylvie's eyes go wide as she does the mental math. She grips the shaft tighter. {sylvie}"Get the device. Now."`,
    actions: [
        { label: 'Grab the latex device', nextScene: 'tower_visit_miniature_latex_3' }
    ]
};

SCENES['tower_visit_miniature_latex_3'] = {
    id: 'tower_visit_miniature_latex_3',
    image: 'images/tower/miniature/latex_filling.webp',
    imagePrompt: null,
    speaker: '',
    text: `You grab the device from the shelf. Fiona cries out, her hips bucking, and Sylvie yelps as the first surge hits.

{sylvie}"I can feel it... oh god, there's so much more than last time," Sylvie gasps, her belly already swelling. {sylvie}"It's not stopping. It just keeps... keeps coming."

Her stomach rounds outward rapidly, pulling taut, then pushing further. Her tiny body trembles as wave after wave pumps into her. Her eyes are saucers.

{sylvie}"Use it! Use it!" she squeaks, voice thin and frantic. {sylvie}"Point it at me and fire!"

You aim the latex device at Sylvie and pull the trigger. A pink beam washes over her tiny body. Her skin shifts, takes on a faint sheen, and her belly stretches wider without resistance, accommodating the flow like rubber.

Fiona shudders through the last of it, collapsing back into the chair. Sylvie clings to the shaft, round and glistening, panting in tiny breaths.`,
    actions: [
        { label: 'Check on Sylvie', nextScene: 'tower_visit_miniature_latex_4' }
    ]
};

SCENES['tower_visit_miniature_latex_4'] = {
    id: 'tower_visit_miniature_latex_4',
    image: 'images/tower/miniature/latex_inflated.webp',
    imagePrompt: null,
    speaker: '',
    text: `Fiona carefully lifts Sylvie off and lays her on the cloth. Sylvie is enormous relative to her size, belly round and taut and shiny, her whole body inflated with soft, rubberized curves. Her skin has the faint gloss of latex, catching the lamplight.

She lies there for a long moment, breathing in slow, blissful sighs. Then she reaches down and runs her tiny hands over her belly, her hips, her swollen breasts.

{sylvie}"My innie is an outie," she announces dreamily, pressing a finger to her belly button. It pops back like rubber. {sylvie}"It filled everything. Everything. My breasts, my hips, my belly... I'm like a tiny balloon animal."

She stretches, arching her back against the cloth. Her inflated curves wobble and bounce.

{sylvie}"I feel amazing," she murmurs, eyes half-lidded, a lazy smile on her face. {sylvie}"The latex skin is distributing the pressure evenly across every surface. No discomfort at all. Just... fullness. Warm, heavy fullness everywhere."

She pats her belly. It makes a soft, rubbery thump.

{fiona}"Is she going to... deflate?" Fiona asks, still catching her breath.

{sylvie}"Eventually. Probably." Sylvie doesn't sound concerned. She sounds like she's in no hurry. {sylvie}"The rubberization has a twelve-hour half-life. The fluid will absorb gradually. Until then..."

She closes her eyes and sighs contentedly.

{sylvie}"Until then I'm going to lie here and feel every square inch of this."

{fiona}"You planned this."

{sylvie}"I planned part of it. The rest was a happy accident." She opens one eye. {sylvie}"Best accident I've ever had. And I've had a lot of accidents."

You leave them to it. Sylvie is already murmuring about writing a sequel paper. Fiona is staring at the ceiling, wondering how this became her life.`,
    actions: [
        { label: 'Leave them to it', nextScene: 'town_exit_workshop' }
    ]
};

// ============================================
// MIRA + MRS. THORNWICK DRUNK WORKSHOP DARE
// Vignette: fires 3 days after Mrs. Thornwick reaches intimate trust
// ============================================

SCENES['mira_thornwick_vignette_1'] = {
    id: 'mira_thornwick_vignette_1',
    image: 'images/vignettes/mira_thornwick/01_arriving_drunk.webp',
    speaker: '',
    text: `The workshop door bangs open. Mira stumbles in first, one hand on the doorframe, the other clutching an almost-empty bottle of Barret's summer ale. Mrs. Thornwick follows with considerably more poise — or tries to. Her heel catches the threshold and she grabs Mira's shoulder, which sends them both lurching sideways into a workbench.

{mira}"Shhhh. Shhh, we have to be quiet, the door was unlocked again—"

She peers around the darkened workshop. Empty. The amber lamps are still burning low.

{mira}"We're clear." Her face splits into a grin so wide it bunches her freckles. {mira}"I told you, nobody's here at night. For science, remember?"

Mrs. Thornwick straightens her vest with exaggerated dignity. A strand of greying blonde hair has escaped its pin and hangs across one flushed cheek.

{mrs_thornwick}"We are conducting an informal inspection of municipal assets." She enunciates every word with the care of someone who knows they're one syllable from slurring. {mrs_thornwick}"The tavern was... educational. This is the next stop."

{mira}"You had FOUR ales." Mira holds up five fingers, squints at them, corrects to four. {mira}"I had three. Or five. Barret stopped counting."

{mrs_thornwick}"Three and a half." The correction is immediate and precise. {mrs_thornwick}"I do not lose count."

Mira's green eyes are already roaming the workshop. She knows every device in here — she's delivered parts for half of them and watched them used on the rest. Her gaze lands on the Chest Shaper and something shifts in her expression. Not quite mischief. Something warmer.

{mira}"Hey. Hey, Thornwick." She tugs Mrs. Thornwick's sleeve like a child with a secret. {mira}"I dare you."

{mrs_thornwick}"I beg your pardon?"

{mira}"I dare you. One round each. You pick for me, I pick for you." She gestures grandly at the row of devices. {mira}"We go back and forth until we're... different."

Mrs. Thornwick stares at her. The practiced composure wars with the ale warming her cheeks and the curiosity warming everything else. She glances at the workshop door — a brief, evaluating look — then back at Mira.

{mrs_thornwick}"That is a profoundly irresponsible suggestion." A pause exactly one heartbeat too long. {mrs_thornwick}"I accept."

Mira squeals and bounces on her toes, messenger bag swinging. She grabs Mrs. Thornwick's wrist and pulls her toward the devices.

{mira}"Okay, okay, I go first. I pick for you." She studies Mrs. Thornwick with the intensity of someone choosing a card from a deck. Then her grin turns impish. {mira}"Petite."

{mrs_thornwick}"Petite?" One blonde eyebrow rises. {mrs_thornwick}"You want to make me smaller?"

{mira}"I want to see you tiny. You're always so... big. Presence-big, I mean. I want to see what happens when the presence doesn't match the package."

She lifts a brass device off the wall — a handheld thing with a blue crystal set into the barrel. A label etched into the grip reads CHEST SHAPER.

{mira}"Boss labeled everything. Love that about this place."

She aims it at Mrs. Thornwick. {mira}"Hold still, Madam Mayor."

Mrs. Thornwick's blue eyes narrow. But the dare is the dare. She smooths her skirt with a dignity that is only slightly undermined by the hiccup she swallows.

{mrs_thornwick}"Proceed."

The crystal flares. Mrs. Thornwick's breath catches as warmth spreads through her chest — then tightens. Her large breasts begin to shrink, the fullness receding, fabric loosening where it was snug moments before. She looks down and watches herself flatten, the generous curves pulling inward until her shirt hangs loose across a nearly flat chest.

{mrs_thornwick}"That is... peculiar." Her voice is measured, but her hand drifts to her diminished chest, fingers pressing where fullness used to be. {mrs_thornwick}"I feel... lighter."

{mira}"We're not done." Mira's already opening the Muscle Toner booth. {mira}"Arms and legs too. Everything shrinks."

The booth crackles and Mrs. Thornwick gasps. Her toned arms soften, the firm lines melting into something slender and delicate. Her shoulders narrow. She looks at her own wrist and turns it slowly, watching the bones stand out beneath pale skin.`,
    onEnter: function() {
        gameState.flags.mira_thornwick_vignette_seen = true;
        saveState();
    },
    actions: [
        { label: 'Continue', nextScene: 'mira_thornwick_vignette_2' }
    ]
};

SCENES['mira_thornwick_vignette_2'] = {
    id: 'mira_thornwick_vignette_2',
    image: 'images/vignettes/mira_thornwick/02_thornwick_petite_hands.webp',
    speaker: '',
    text: `{mrs_thornwick}"My rings are loose." She sounds fascinated despite herself.

Mira guides her onto the Posterior Enhancer next — a cushioned brass chair — and dials it down. Mrs. Thornwick's hips narrow, her modest backside trimming to almost nothing against the leather.

When she stands, the difference is striking. The imposing town elder is suddenly slight. Delicate collarbones, narrow hips, her skirt hanging low on petite hips. She looks like a porcelain doll wearing a politician's clothes.

Mrs. Thornwick glances down at herself, then unbuttons her shirt — not all the way, just enough to peek. She parts the fabric and stares at the flat expanse where her chest used to be.

{mrs_thornwick}"It's all gone." She says it quietly, almost to herself, pulling the shirt open a little wider. The loose fabric frames nothing but smooth skin and delicate collarbones.

{mira}"Oh my god." Mira presses both hands to her mouth, eyes sparkling. {mira}"You're adorable. You're actually adorable."

{mrs_thornwick}"I am not adorable. I am a civil servant." But she's looking at her own hands — small, fine-boned, elegant — and the flush on her cheeks has nothing to do with the ale anymore.

{mira}"My turn! Do your worst, Thornwick."

Mrs. Thornwick studies Mira with new intensity. Her blue eyes move over the courier's athletic frame — the windswept auburn hair, the freckled shoulders, the modest curves under the leather vest.

{mrs_thornwick}"Petite for you as well." A thin smile. {mrs_thornwick}"Fair is fair."

{mira}"Oh, you're evil. I love it."

Mira strips off her courier vest and spreads her arms wide. Mrs. Thornwick picks up the Chest Shaper — handling it gingerly, like she expects it to bite — and aims. The crystal flares. Mira's average breasts shrink first — she watches with an expression caught between fascination and giddy horror as they flatten to almost nothing. Then the Muscle Toner strips away her courier's fitness, leaving her arms thin and soft. The Posterior Enhancer trims her small backside to nearly flat.

She stands up and she's tiny. Freckles scattered across a narrow, bird-boned frame. Her skirt is sliding off her hips. She looks like a strong breeze would carry her away.

{mira}"Okay." She looks down at herself. Her voice is quieter than usual. {mira}"That's... that's really something. I'm so small." She wraps her arms around herself and shivers — not from cold. {mira}"I can feel everything more. Like there's less of me so every sensation is... closer to the surface."

Mrs. Thornwick tilts her head, watching. Something has shifted in the air between them. They're both small now, both stripped down to something vulnerable. The ale is still warm in their blood and the vulnerability is doing something neither of them expected.`,
    actions: [
        { label: 'Continue', nextScene: 'mira_thornwick_vignette_3' }
    ]
};

SCENES['mira_thornwick_vignette_3'] = {
    id: 'mira_thornwick_vignette_3',
    image: 'images/vignettes/mira_thornwick/03_mira_petite_shiver.webp',
    speaker: '',
    text: `They look at each other. Two petite women in oversized clothes, standing in a workshop full of devices that can make them anything.

Mira plucks at her loose shirt. It hangs to mid-thigh on her shrunken frame. She looks down at herself — at the way the fabric hides every detail of what just happened to her body — and frowns.`,
    actions: [
        { label: 'Continue', nextScene: 'mira_thornwick_vignette_4' }
    ]
};

SCENES['mira_thornwick_vignette_4'] = {
    id: 'mira_thornwick_vignette_4',
    image: 'images/vignettes/mira_thornwick/04_both_petite_naked.webp',
    speaker: '',
    text: `{mira}"Okay, this is stupid." She grabs the hem of her shirt and pulls it over her head. Underneath, her flat chest is a landscape of freckles and tiny pink nipples drawn tight in the workshop air. She kicks off her skirt — it was barely clinging to her narrow hips anyway. Underwear follows. She stands naked, bird-boned and bare, and puts her hands on her hips. {mira}"There. How are we supposed to see what the devices do if we're drowning in fabric? For science."

Mrs. Thornwick stares at her. Blinks. Looks down at herself — the fine garments hanging like curtains from her diminished frame, hiding everything.

{mrs_thornwick}"That is..." She pauses. The composure flickers. Then something behind her eyes lets go — a small, decisive thing, like a latch unhooking. {mrs_thornwick}"That is an entirely valid point."

She unbuttons her shirt the rest of the way and shrugs it off. Her skirt follows, pooling at her feet. She steps out of it. Undergarments follow — efficient, unhesitating. She folds everything and sets it on the workbench with the practiced care of a woman who respects fine clothing even while stripping it off in a workshop.

She stands naked. Petite, delicate, her flat chest barely a ripple, narrow hips, the fine bones of her shoulders and collarbones catching the amber lamplight. Without the vest, without the pins and the posture and the politician's armor, she's just a small woman with greying blonde hair falling loose around her face.

{mrs_thornwick}"For science." The corner of her mouth twitches.

They look at each other. Two naked petite women standing in a workshop full of devices that can make them anything.

{mira}"Hourglass." Mira says it like a dare. Like a promise. Her green eyes are bright. {mira}"We go the other way now. Take turns. One device at a time. I pick for you, you pick for me."

{mrs_thornwick}"Deal." Mrs. Thornwick says it too quickly for someone who claims to be conducting a municipal inspection.

{mira}"Chest Shaper. You first. Just partway — I want to watch it happen slowly."`,
    actions: [
        { label: 'Continue', nextScene: 'mira_thornwick_vignette_5' }
    ]
};

SCENES['mira_thornwick_vignette_5'] = {
    id: 'mira_thornwick_vignette_5',
    image: 'images/vignettes/mira_thornwick/05_thornwick_chest_partway.webp',
    speaker: '',
    text: `Mira lifts the Chest Shaper off the wall — she already knows where it hangs. She traces the label etched into the grip with her thumb.

{mira}"Boss labeled everything. Love that about this place." She aims the brass barrel at Mrs. Thornwick's bare chest and grins. {mira}"Hold still."

The crystal pulses. A warm beam washes over Mrs. Thornwick and the first swell is gentle — a softness, a budding pressure pushing outward from beneath her nipples. She looks down and watches her flat chest begin to fill. Small mounds push forward. Then rounder. Fuller. Bare skin stretching to accommodate new flesh, her nipples rising on swelling curves.

Mira clicks the device off. Mrs. Thornwick looks down and her composure cracks. Her breasts are big. Really big. Full, heavy, round — they spill over the narrow frame of her petite body like they belong to someone twice her size. Her nipples are flushed and stiff, perched on curves that are frankly obscene on such a delicate frame.

{mrs_thornwick}"This is partway?" She cups one and it overflows her small hand. Her voice has gone up half an octave. {mrs_thornwick}"Mira, this is... these are enormous. You said partway."

{mira}"I did say partway." Mira is grinning so wide her freckles bunch. She's practically vibrating. {mira}"There's more. There's so much more. But I wanted to watch it happen slowly, remember?" She bites her lip, eyes bright. {mira}"God, look at you. You're tiny everywhere else and then just... those."

Mrs. Thornwick squeezes. Her eyes close. The breast is heavy and warm — the sheer weight of it in her small hand, the way it overflows her grip, the soft pressure of new flesh settling against her ribs.

{mrs_thornwick}"Oh." It's a small sound. Almost private. She squeezes again, lifting, feeling how heavy it is. Letting it drop. Watching it bounce and settle. {mrs_thornwick}"The weight. I wasn't expecting the weight."

She opens her eyes. Her other hand slides down her stomach — slowly, deliberately — and presses between her thighs. A shudder runs through her petite frame.

{mrs_thornwick}"I'm warm everywhere." She cups her breast with one hand and touches herself with the other, blue eyes half-lidded, flush spreading down her neck. {mrs_thornwick}"The heat from the growth hasn't stopped. It just... spread."

Mira has set the Chest Shaper down without realizing it. She's staring — watching Mrs. Thornwick touch herself, imagining what that warmth and weight will feel like when it's her turn. One hand has drifted to her own flat breast, the other between her legs — fingers pressed against her bare pussy, hips rocking slightly. She doesn't seem to realize she's doing it.

{mira}"You're just... touching yourself. Like it's nothing." Her voice is rough. Her thighs press together around her own hand. {mira}"How are you so calm about this?"

{mrs_thornwick}"Who said I'm calm?" Her thumb circles her nipple. Her fingers move between her thighs. She holds Mira's gaze and doesn't blink. {mrs_thornwick}"Your turn, dear. Give me the device."

Mira hands over the Chest Shaper. Mrs. Thornwick takes it in her free hand — she doesn't stop touching herself with the other — and aims it at Mira's flat chest. She steps close. Her hip brushes Mira's thigh.`,
    actions: [
        { label: 'Continue', nextScene: 'mira_thornwick_vignette_6' }
    ]
};

SCENES['mira_thornwick_vignette_6'] = {
    id: 'mira_thornwick_vignette_6',
    image: 'images/vignettes/mira_thornwick/06_mira_chest_partway.webp',
    speaker: '',
    text: `The crystal flares. Warmth floods Mira's chest and her breasts swell — pushing outward, bare skin stretching, freckled flesh rounding past handfuls into something heavy and full. They don't stop where she expects. They keep going — swelling big and round on her narrow frame, nipples flushing pink, the weight pulling her forward.

{mira}"Oh fuck." She cups them and they overflow her hands. Her fingers sink into the new softness and her hips buck. {mira}"Oh FUCK. These are— Thornwick, these are HUGE. You said partway feels like a lot and you were NOT kidding."

She bounces once and watches the result with wide eyes. Then she laughs — breathless, delighted, overwhelmed.

{mira}"And there's MORE." She squeezes again, gasping at the weight. Her grin is feral. {mira}"We're going bigger. Holy moly, I'm going to be a MENACE."

Mrs. Thornwick sets the Chest Shaper down and reaches out — cups Mira's new breast with her free hand. Casual. Proprietary. She hefts it, feeling the weight, then runs her thumb across the swollen pink nipple. Mira's breath catches hard.

{mira}"You're just— you just grabbed my—"

{mrs_thornwick}"Mm. They're lovely." She says it while still holding it, thumb circling the nipple. Her other hand is still between her own legs. {mrs_thornwick}"Yours are warmer. The freckles go all the way to the nipple. Charming."

Mira is flushed from her hairline to her collarbone. She's aroused and flustered and doesn't know where to put the energy — Mrs. Thornwick is handling her body like it's the most natural thing in the world and Mira is absolutely not at that level of composure. This is the woman who once spent twenty minutes debating the proper font for a town notice.

{mira}"Who ARE you right now?" She squirms but doesn't pull away. {mira}"Where was this person hiding?"

{mrs_thornwick}"She wasn't hiding. She was being appropriate." Her thumb circles Mira's nipple one more time, slow and deliberate. {mrs_thornwick}"I'm done being appropriate."

{mira}"Posterior Enhancer." Mira's voice cracks. She nods toward the cushioned brass chair across the workshop. {mira}"Shut up and sit on the chair."`,
    actions: [
        { label: 'Continue', nextScene: 'mira_thornwick_vignette_7' }
    ]
};

SCENES['mira_thornwick_vignette_7'] = {
    id: 'mira_thornwick_vignette_7',
    image: 'images/vignettes/mira_thornwick/07_thornwick_enhancer.webp',
    speaker: '',
    text: `Mrs. Thornwick walks to the Enhancer. She moves slowly — not because she needs to. Because she knows Mira is watching her bare body. Her new breasts sway with each step. She looks over her shoulder and catches Mira staring.

{mrs_thornwick}"See something you like, dear?"

She sits. Bare pussy on cool leather. She settles into the cushion and the device hums. Her flat backside swells against the leather — new flesh forming, pressing outward into the warm seat. Her hips widen and she gasps.

The instant there's enough new flesh to feel — her hips move. She grinds against the cushion. Once. Experimentally. Her eyes go half-lidded.

{mrs_thornwick}"Oh. Oh, I see." She grinds again, slower, pressing her swelling bare ass into the leather. Her breasts sway with the motion.

{mira}"You're grinding on the seat." Mira says it softly. Fascinated. Her hand is on her own breast, squeezing — but her other hand has drifted between her legs again.

{mrs_thornwick}"Yes I am." She doesn't stop. She grinds again, pressing her bare pussy against the front edge of the cushion. Her ass keeps growing — rounding out, filling the seat, spilling past the edges. She looks directly at Mira — holds eye contact — and rolls her hips. Deliberately. Performing.

Her grinding gets faster. Her eyes close. Her grip on the armrests turns white-knuckled and her whole body goes taut. For a long moment she's perfectly still, not breathing, every muscle locked. Then a shudder rolls through her, head to toe, and she exhales in one long, ragged breath. Her grip loosens. Her hips slow. She opens her eyes and they're glassy, unfocused.

She blinks. Smooths her expression. Continues grinding — slower now, languid — as if nothing happened.

{mira}"Did you just—"

{mrs_thornwick}"You're soaking wet, dear. I can see it on your thighs." She says it calmly, deflecting, still rocking gently. {mrs_thornwick}"That's the most flattering thing anyone's done for me all evening."

Mira stares at her. The woman just came on a leather chair with Mira watching and she's already moved on to complimenting Mira's arousal like she's commenting on the weather. Mira doesn't know whether to be shocked or impressed or desperately turned on. She settles on all three.`,
    actions: [
        { label: 'Continue', nextScene: 'mira_thornwick_vignette_8' }
    ]
};

SCENES['mira_thornwick_vignette_8'] = {
    id: 'mira_thornwick_vignette_8',
    image: 'images/vignettes/mira_thornwick/08_mira_enhancer.webp',
    speaker: '',
    text: `The device finishes. Mrs. Thornwick stands and her ass is round and enormous, her hips wide. She walks back toward Mira and every step is a production — massive ass bouncing, breasts swaying, hips rolling.

{mrs_thornwick}"Your turn, dear."

Mira sits on the Enhancer — bare skin on warm leather, leather that's damp from Mrs. Thornwick. She gasps at the contact.

{mira}"It's warm. It's warm and wet from you and I can feel—" The device activates and she loses the sentence. Her ass swells against the leather, growing into the warmth Mrs. Thornwick left behind, and the intimacy of it sends a flush down her entire body.

Her hips move. She can't help it. Her ass is growing fuller, rounder, pressing into the cushion, and her bare pussy is grinding against the front edge the same way Mrs. Thornwick's did.

Mrs. Thornwick steps behind her. She puts both hands on Mira's shoulders — warm, steady — then slides them down. Over Mira's collarbones. Down to her breasts. She cups them from behind, kneading, her chin resting on top of Mira's auburn hair.

{mira}"You're— oh god—" Mira's head falls back against Mrs. Thornwick's bare stomach. Mrs. Thornwick is pressed against her from behind, hands full of her breasts, and Mira's ass is swelling against the wet leather and everything is happening at once.

{mrs_thornwick}"Keep grinding." She whispers it against Mira's hair. Her thumbs circle both of Mira's nipples while the device works. {mrs_thornwick}"You look beautiful like this. All flushed and overwhelmed."

{mira}"I am overwhelmed." She gasps it, hips rocking, Mrs. Thornwick's hands warm and firm on her breasts. {mira}"You're touching me and I'm growing and the leather is wet from you and I've never— I haven't—" She cuts herself off with a moan as a wave of heat rolls through her. {mira}"This is so far past anything I've done before."

{mrs_thornwick}"You're doing wonderfully." She pinches both nipples gently and Mira arches, grinding hard against the cushion. Mrs. Thornwick presses a kiss to the top of her head. Casual. Tender. {mrs_thornwick}"We can stop whenever you want."

{mira}"Don't you dare stop."

The device finishes. Mira stands on shaky legs. Her ass is enormous — matching Mrs. Thornwick's. Round, heavy, bouncing with every step.

{mira}"Chest Shaper. All the way up this time." She's panting. {mira}"I want to see you huge."`,
    actions: [
        { label: 'Continue', nextScene: 'mira_thornwick_vignette_9' }
    ]
};

SCENES['mira_thornwick_vignette_9'] = {
    id: 'mira_thornwick_vignette_9',
    image: 'images/vignettes/mira_thornwick/09_thornwick_chest_max.webp',
    speaker: '',
    text: `Mira grabs the Chest Shaper off the wall and turns the dial to maximum.

{mira}"Hold still. Actually, don't hold still. I don't care."

The crystal roars. Mrs. Thornwick throws her head back as heat floods her chest. Her breasts surge outward — swelling fast, growing heavy, rounding and expanding. She grabs them, hands full of hot, swelling flesh, her skin pulling taut, stretching smooth and tight over curves that just keep coming.

{mrs_thornwick}"Oh god. Oh, they're not stopping—" Her breasts push her hands apart. Her skin drums tight as they swell past anything she's felt before — that warm, full-body pressure of flesh pressing outward, her body barely keeping up. She squeezes and her fingers sink deep into taut fullness. {mrs_thornwick}"They're massive. I can feel the weight pulling me forward."

She hefts one with both hands — it overflows her grip, warm and heavy and impossibly soft. She lets it drop and it bounces against her stomach with a meaty slap. Then she looks at Mira and does it again. Slower. Deliberately. She bends forward, heaving her breasts up from underneath, letting them hang heavy and swaying.

{mrs_thornwick}"You like watching them bounce?" She hefts them again, bending forward so they sway. Her eyes stay locked on Mira. {mrs_thornwick}"I like the face you're making right now."

Mira's hand is between her legs again. She's not even trying to hide it anymore.

{mira}"I really can't stop watching you." Her voice is wrecked. {mira}"Do the nipple thing. Please."

Mrs. Thornwick pinches both nipples. Her body convulses — back arching, hips bucking, massive tits shaking. The sound she makes isn't a moan. It's deeper. Guttural. Her thighs clamp together and her whole body locks up — frozen, mouth open, eyes rolled back. When she comes down she's panting, flushed from her chest to her hairline. Sweat beads on her collarbones and runs in thin lines between her breasts. Her thighs are slick — wetness dripping openly, trailing down her inner legs.

{mira}"You definitely just—"

{mrs_thornwick}"Twice, actually." She says it while still catching her breath, absolutely zero shame. Sweat glistens on her stomach, her shoulders. She rolls a nipple between her fingers and her hips twitch — another slow drip runs down her thigh. {mrs_thornwick}"Once when they were growing. Once just now. These are extraordinary."

Mira's jaw is hanging open. The mayor of this town is standing naked in a workshop — sweating, dripping, casually announcing she just came twice from touching her own tits — and she looks like she could go again in thirty seconds.

{mrs_thornwick}"Your turn." She picks up the Chest Shaper and aims it at Mira. Her massive bare tits swing with the motion. {mrs_thornwick}"Maximum."`,
    actions: [
        { label: 'Continue', nextScene: 'mira_thornwick_vignette_10' }
    ]
};

SCENES['mira_thornwick_vignette_10'] = {
    id: 'mira_thornwick_vignette_10',
    image: 'images/vignettes/mira_thornwick/10_mira_chest_max.webp',
    speaker: '',
    text: `The crystal roars. Heat floods Mira's chest and her breasts surge — swelling rapidly, her skin stretching tight and smooth over expanding flesh, growing heavy and round. She cups them and they overflow her small hands, spilling over her fingers, still growing. Her skin pulls taut against her palms — warm, firm, that delicious pressure of fullness straining outward.

{mira}"Fuck. They're so big—" She squeezes and the tightness pushes back, round and full and unyielding. Her hips buck. {mira}"They're still getting bigger, I can feel my skin stretching, they're pushing my hands apart—"

The beam fades. Mira's breasts are massive — matching Mrs. Thornwick's. She stands there panting, arms at her sides, staring down at herself. Too overwhelmed to move.

{mira}"Oh my god." Her voice is small. Wrecked. {mira}"These are— I'm—"

Mrs. Thornwick sets the Shaper down. She steps close. She's been watching Mira's face through the whole thing — the wide eyes, the open mouth, the flush spreading down her freckled chest — and something in Mira's helpless expression trips a wire.

She takes one of Mira's massive breasts in both hands and lifts it. Props it up. It overflows her grip, heavy and warm, and she bends and takes the swollen nipple into her mouth.

Not gentle. Not tentative. She sucks hard, cheeks hollowing, focused and deliberate — the way she does everything. Both hands supporting the weight of Mira's breast from underneath, holding it to her mouth like something she's been thinking about for the last three rounds.

Mira's arms stay at her sides. She can't move. Her mouth falls wide open and a sound comes out that isn't a word — raw, high, shaking. Her head tips back. Her whole body trembles but she doesn't reach up, doesn't grab, doesn't do anything except stand there and feel it.

{mira}"Oh— oh fuck— you're—" Her hips buck once, involuntarily. Her eyes are glazed. {mira}"Thornwick, your mouth, I can't— that's so—"

Mrs. Thornwick doesn't stop. She shifts her grip, propping the breast higher, sucking slow and hard. She's watched Mira touch herself all night — watched her get wound tighter and tighter with every transformation — and this is what she's giving her. Something Mira can't do to herself.

{mrs_thornwick}"Mm." She pulls back just enough to speak against the wet nipple, lips still brushing it. Her eyes are sharp and focused. {mrs_thornwick}"You've been squirming and touching yourself every time something changed." She licks once, slow. {mrs_thornwick}"Your turn to just stand there and feel it."

She takes the nipple back into her mouth. Mira whimpers. Her hands twitch at her sides but she doesn't raise them.`,
    actions: [
        { label: 'Continue', nextScene: 'mira_thornwick_vignette_11' }
    ]
};

SCENES['mira_thornwick_vignette_11'] = {
    id: 'mira_thornwick_vignette_11',
    image: 'images/vignettes/mira_thornwick/11_both_hourglass.webp',
    speaker: '',
    text: `**Two naked hourglass figures face each other across the workshop.** Massive breasts, narrow waists, wide hips, enormous round asses. Mira's freckles are scattered across more skin than she's ever had. Mrs. Thornwick's greying blonde hair has come completely undone. Both are glistening with sweat and arousal.

{mira}"We match." Her voice is a raw whisper. She takes a step and her massive tits bounce and her wide hips sway and her enormous ass shifts behind her. {mira}"We actually match."

{mrs_thornwick}"Come here." Mrs. Thornwick holds out her hand. Her blue eyes are warm and hungry and unhurried.

Mira crosses the distance. They face each other — two hourglass figures, massive and gleaming with sweat. Mrs. Thornwick steps close and presses one breast against Mira's. Just one. Slow and deliberate, watching Mira's face as she does it. Their nipples meet — stiff and swollen, pushing into each other — and Mira's mouth falls open.

Mrs. Thornwick smiles.

{mira}"Oh—" Mira stares down at where their breasts press together, flesh squishing softly, nipples buried against each other. {mira}"I can feel your heartbeat. Through your— right against mine—"

{mrs_thornwick}"Mm." Mrs. Thornwick doesn't move. She holds the contact, her smile widening at the look on Mira's face. {mrs_thornwick}"You've been wound so tight all night. Every round, every transformation — I could see it building." She presses a little harder. Their breasts squish together, warm and heavy. {mrs_thornwick}"There's the face again. The one you make when you can't think."

Mira pushes Mrs. Thornwick backward until Mrs. Thornwick's bare ass presses against the workbench. Mrs. Thornwick sits on the edge, legs parting, and Mira steps between them. Their tits press together again, heavy and warm. Mira's hand slides down Mrs. Thornwick's stomach.

{mira}"Can I...?" Her fingers trace the crease of Mrs. Thornwick's inner thigh.

{mrs_thornwick}"Don't ask." She grabs Mira's wrist and puts it where she wants it.

Mira's fingers slide through wet heat and Mrs. Thornwick's entire body shudders. Her head drops back. Her massive tits heave. Her hips push forward into Mira's hand and the sound she makes is low, raw, shameless.

{mira}"You're so wet. God, you're so swollen and warm—" Her fingers explore, circling, pressing, finding Mrs. Thornwick's stiff clit. She bucks against Mira's hand.

{mrs_thornwick}"There. Right there—" Her hips grind against Mira's fingers. She reaches between Mira's legs in return — sliding through wet heat, finding Mira's clit — and Mira gasps and shudders against her.

{mrs_thornwick}"Both at once." She's panting, one hand working Mira while Mira works her. They find a rhythm — hips rocking, fingers circling, breasts pressing and sliding between them. {mrs_thornwick}"You've been making the most wonderful sounds all night. Every time you gasped, every time your eyes went wide — that's what did it for me. I want to feel you come apart at the same time I do."

{mira}"I'm close. I've been close since the third round." She's shaking, forehead pressed against Mrs. Thornwick's shoulder, fingers moving fast. {mira}"Watching you touch yourself every time, watching you grind on everything, feeling your hands on me every time I turned around— I wanted to put my hands on you so bad—"

{mrs_thornwick}"They're on me now." Her voice breaks. Her hips stutter. {mrs_thornwick}"And I've lost count of how many times tonight. So don't hold back on my account."

Mira comes first — a sharp, shuddering gasp, her whole body tensing, her massive tits shaking against Mrs. Thornwick's. Her fingers press hard against the older woman's clit and Mrs. Thornwick follows her over the edge seconds later — a long, low moan, hips rolling, pussy clenching, wetness dripping onto the workbench.

They stay pressed together, breathing hard. Naked, sweating, enormous, spent.`,
    actions: [
        { label: 'Continue', nextScene: 'mira_thornwick_vignette_12' }
    ]
};

SCENES['mira_thornwick_vignette_12'] = {
    id: 'mira_thornwick_vignette_12',
    image: 'images/vignettes/mira_thornwick/12_afterglow.webp',
    speaker: '',
    text: `Mira starts giggling. Then laughing. She buries her face in Mrs. Thornwick's massive bare chest and laughs until she's wheezing.

{mira}"Best. Dare. Ever." She's muffled by breast. Then, quieter: {mira}"I can't believe you've been... this. This whole time. Under all the posture and the diplomatic phrasing. This was in there."

Mrs. Thornwick smooths damp auburn hair from Mira's freckled cheek. Her blue eyes are warm and hazy and satisfied and nowhere near propriety. Her other hand rests between her own legs, idly, gently. Just because it feels nice.

{mrs_thornwick}"I am an excellent civil servant, Mira. That includes knowing which parts of oneself to keep off the public record." She makes no move to find her clothes. {mrs_thornwick}"But we are absolutely doing this again."

{mira}"I'm going to have to sit through council meetings now. Watching you read zoning ordinances. Knowing what you sound like when you come."

{mrs_thornwick}"Yes." The practiced mayoral smile returns — but her eyes are different now. Warmer. Wilder. Something unlocked that isn't going back in its box. {mrs_thornwick}"Won't that be fun?"`,
    actions: [
        { label: 'Continue', nextScene: 'workshop_main' }
    ]
};

// ----------------------------------------
// MRS. THORNWICK BIMBO SCENE
// ----------------------------------------

SCENES['tower_visit_thornwick_bimbo'] = {
    id: 'tower_visit_thornwick_bimbo',
    image: 'images/tower/thornwick-bimbo/chamber.webp',
    imagePrompt: null,
    speaker: 'Sylvie',
    text: '',
    onEnter: function() {
        const visitReason = getRandomVisitReason();

        this.text = `${visitReason}

You find Sylvie at her workbench, hunched over a schematic with a magnifying loupe pressed to one eye. Behind her, something new dominates the far wall of the lab — a tall brass-and-glass chamber, roughly the size and shape of a standing booth. Green light pulses behind its frosted window. Steam hisses from joints in the frame.

{sylvie}"Ah, come in, come in." She doesn't look up. {sylvie}"Mind the tubes on the floor. And don't touch the chamber. It's running."

You ask what it does.

{sylvie}"Beauty enhancement. Amplifies the subject's natural aesthetic qualities. Symmetry, proportion, skin luminosity — the usual vanity metrics." She waves a hand dismissively. {sylvie}"Given a short session, the results are quite subtle. A glow. Slightly fuller lips. The sort of thing people pay fortunes for in the capital."

You glance at the chamber. The green light flickers.

You ask if someone is in there.

{sylvie}"Hmm? Oh, yes. Mrs. Thornwick stopped by on official business. Something about tower zoning permits." She adjusts the loupe. {sylvie}"I offered her a demonstration. She was skeptical but agreed to a brief session."

Brief?

{sylvie}"Yes, I set it for..." She trails off, squinting at a gauge on the wall. The needle is well past any marked zone. {sylvie}"I set it for... when did she arrive?"

She looks at you. You look at her. She looks at the chamber.

{sylvie}"Oh dear."`;
    },
    actions: [
        { label: 'Watch Sylvie open the chamber', nextScene: 'tower_visit_thornwick_bimbo_2' }
    ]
};

SCENES['tower_visit_thornwick_bimbo_2'] = {
    id: 'tower_visit_thornwick_bimbo_2',
    image: 'images/tower/thornwick-bimbo/cowboy.webp',
    imagePrompt: null,
    speaker: '',
    text: `Sylvie scrambles across the lab, nearly tripping over a coil of copper tubing. She yanks a lever on the side of the chamber. The green light dies. Steam erupts from the seams as the door unseals with a heavy brass clunk.

A figure emerges from the fog.

Mrs. Thornwick steps forward — or rather, something shaped like Mrs. Thornwick steps forward. Her blonde hair is intact. Her blue eyes are the same. The ponytail, the grey streaks, the dignified bearing. All present.

Everything else is wrong.

Her lips are enormous. Pillowy, glossy, swollen to a cartoonish degree — the kind of lips that make speech look like a negotiation. Heavy makeup rings her eyes that wasn't there when she went in, eyeshadow and lipstick applied by whatever aesthetic logic the machine operates on. Her breasts are massive, perfectly spherical, sitting high on her chest with a firmness that defies every law of anatomy. They don't move like flesh. They sit like sculpture.

Below them, her waist pinches inward to something structurally improbable. And below that, her hips flare wide — absurdly, dramatically wide — flowing into a backside that seems to have its own gravitational influence. Her entire silhouette is an hourglass drawn by someone who'd never seen a real woman.

She blinks. Drool slides from the corner of her inflated lips.

{mrs_thornwick}"Shylvie." The word comes out thick, distorted by lips that weren't designed for consonants. {mrs_thornwick}"What hash happened to my—"

She's lucid. Completely herself behind those ridiculous lips. The diction is unmistakable. But the delivery is a slurring, drooling mess.

{sylvie}"Fascinating," Sylvie breathes, already reaching for a notebook. {sylvie}"The cognitive functions are entirely intact. It's purely morphological. The lips alone — look at the volume displacement—"

{mrs_thornwick}"I am going to—"

Mrs. Thornwick takes two steps forward.

She freezes.`,
    actions: [
        { label: 'Watch', nextScene: 'tower_visit_thornwick_bimbo_3' }
    ]
};

SCENES['tower_visit_thornwick_bimbo_3'] = {
    id: 'tower_visit_thornwick_bimbo_3',
    image: 'images/tower/thornwick-bimbo/full_bimbo.webp',
    imagePrompt: null,
    speaker: '',
    text: `The two steps did it. The motion of walking — thighs pressing together, hips shifting, her engorged vulva dragging against itself with each stride — sends a visible shockwave through her body. Her eyes go wide. Her swollen lips part. A sound escapes her that has never been heard in a town council meeting.

She drops.

Not a collapse — a controlled descent. She sits back hard, arms braced behind her, legs spread, head tilted back. From this angle the impossible geometry of her body is even more apparent. That tiny waist connecting the massive shelf of her chest to the dramatic swell of her hips. She looks like a diagram of exaggeration.

Her vulva is swollen, flushed, visibly engorged between her spread thighs. Fluid leaks from her in a steady, shameless stream, pooling on the stone floor. Her eyes are rolled back. Her massive lips hang open, drool sliding freely down her chin.

{sylvie}"Oh my." Sylvie crouches beside her, tilting her head like a bird examining a particularly interesting worm. She pulls out a measuring tape. {sylvie}"The waist-to-hip ratio is... I'm going to need a larger tape." She peers closer. {sylvie}"Where did your kidneys go? Structurally, this waist cannot contain standard organs—"

Mrs. Thornwick orgasms. Loudly. Her whole body shudders, those impossible breasts barely moving with the tremor — too firm, too round, bolted to her chest like porcelain.

She comes down gasping. Then it hits again. And again.

{sylvie}"Multiple cascading orgasms from ambulatory stimulation alone," Sylvie murmurs, scribbling. {sylvie}"The vulvar engorgement must be creating a feedback loop. Every micro-movement triggers the next—"

{mrs_thornwick}"Shtop... taking... notesh..."

{sylvie}"I absolutely will not."`,
    actions: [
        { label: 'Continue', nextScene: 'tower_visit_thornwick_bimbo_4' }
    ]
};

SCENES['tower_visit_thornwick_bimbo_4'] = {
    id: 'tower_visit_thornwick_bimbo_4',
    image: 'images/tower/thornwick-bimbo/rear.webp',
    imagePrompt: null,
    speaker: '',
    text: `Eventually the waves subside enough for Mrs. Thornwick to move. Carefully. Very carefully.

She shifts onto her knees, sitting up slowly, and the view from behind is staggering. Her butt is massive — round, firm, jutting out in perfect spheres that seem engineered rather than grown. She looks back at it over her shoulder, and the motion alone makes her breath catch.

Her vulva is exposed to the air between her thighs, still flushed and swollen, still leaking. She can feel the cool air on it and it makes her shiver.

{mrs_thornwick}"Thish..." She swallows. Tries again, fighting those enormous lips for every syllable. {mrs_thornwick}"Thish ish quite the predicament."

She's not entirely upset anymore. You can see it in her eyes — behind the drool and the smeared lipstick and the aftershocks still twitching through her, there's something that isn't outrage. It might be curiosity. It might be something else.

{sylvie}"The good news is that extended sessions should be fully reversible," Sylvie offers brightly. {sylvie}"Probably. I haven't actually tested reversal yet."

{mrs_thornwick}"You haven't—"

{sylvie}"But I wouldn't try walking again just yet."

Mrs. Thornwick closes her eyes. Takes a breath. Opens them.

{mrs_thornwick}"I am going to remain very, very shtill," she announces with as much dignity as a drooling, orgasm-dazed, hyper-proportioned woman on her knees can muster, {mrs_thornwick}"until you find a sholution."

{sylvie}"Noted." Sylvie is already halfway across the lab. {sylvie}"Tea while you wait?"

{mrs_thornwick}"...Yesh."

You decide this is a good time to leave them to it.`,
    actions: [
        { label: 'Take your leave', nextScene: 'town_exit_workshop' }
    ]
};
