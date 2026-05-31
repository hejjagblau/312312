// ==========================================
// DESIRE REVEAL DIALOGUES
// ==========================================
// Dialogues for when NPCs reveal their jealousy-based desires
//
// STRUCTURE:
// - BASE dialogues: observer -> target -> stat (specific pairings for long-standing envy)
// - CHANGED dialogues: observer -> stat (generic, uses tokens for any recent change)
//
// TOKENS (replaced at runtime):
//   {compared}     - NPC being compared to
//   {statAdj}      - Target's stat adjective (modest, huge, toned)
//   {statDesc}     - Target's stat description (modest chest, huge ass, puffy pussy, large cock)
//   {myStatAdj}    - Observer's current stat adjective
//   {myStatDesc}   - Observer's current stat description
//
// STAT DESCRIPTORS BY VALUE:
// chest:        0=flat, 1=small, 2=modest, 3=full, 4=large, 5=massive
// butt:         0=flat, 1=small, 2=modest, 3=round, 4=full, 5=huge
// muscle:       0=soft, 1=slight, 2=toned, 3=fit, 4=muscular, 5=powerful
// genitalia:    0=pussy, 1=cock (binary, not a scale)
// genitaliaSize (vagina): 0=subtle, 1=neat, 2=puffy, 3=prominent
// genitaliaSize (penis):  0=small, 1=modest, 2=large, 3=huge

const STAT_DESCRIPTORS = {
    chest: {
        0: { adj: 'flat', desc: 'flat chest' },
        1: { adj: 'small', desc: 'small breasts' },
        2: { adj: 'modest', desc: 'modest chest' },
        3: { adj: 'full', desc: 'full breasts' },
        4: { adj: 'large', desc: 'large breasts' },
        5: { adj: 'massive', desc: 'massive breasts' }
    },
    butt: {
        0: { adj: 'flat', desc: 'flat rear' },
        1: { adj: 'small', desc: 'small backside' },
        2: { adj: 'modest', desc: 'modest rear' },
        3: { adj: 'round', desc: 'round backside' },
        4: { adj: 'full', desc: 'full rear' },
        5: { adj: 'huge', desc: 'huge ass' }
    },
    muscle: {
        0: { adj: 'soft', desc: 'soft figure' },
        1: { adj: 'slight', desc: 'slight build' },
        2: { adj: 'toned', desc: 'toned body' },
        3: { adj: 'fit', desc: 'fit physique' },
        4: { adj: 'muscular', desc: 'muscular build' },
        5: { adj: 'powerful', desc: 'powerful frame' }
    },
    genitalia: {
        0: { adj: 'pussy', desc: 'pussy' },
        1: { adj: 'cock', desc: 'cock' }
    },
    // genitaliaSize depends on genitalia type - use getStatDescriptor() with genitaliaType
    genitaliaSize_vagina: {
        0: { adj: 'subtle', desc: 'subtle slit' },
        1: { adj: 'neat', desc: 'neat little pussy' },
        2: { adj: 'puffy', desc: 'puffy pussy' },
        3: { adj: 'prominent', desc: 'prominent, puffy pussy' }
    },
    genitaliaSize_penis: {
        0: { adj: 'small', desc: 'small cock' },
        1: { adj: 'modest', desc: 'modest cock' },
        2: { adj: 'large', desc: 'large cock' },
        3: { adj: 'huge', desc: 'huge cock' }
    }
};

// ==========================================
// BASE DIALOGUES (Long-standing envy, specific pairings)
// observer -> target -> stat -> shy/intimate
// Uses {myStatAdj}, {myStatDesc} for observer's current body
// ==========================================
const BASE_DESIRE_DIALOGUES = {

    // ==========================================
    // FIONA (Street Kid - shy, insecure, yearning)
    // Intimate: teasing but still nervous, seeking validation
    // ==========================================
    fiona: {
        barret: {
            chest: {
                shy: "Fiona's eyes dart away, her cheeks flushing. \"I see Barret at the tavern sometimes. She's always had this... presence, you know? The way her blouse fits, the way men look at her.\" She crosses her arms over her {myStatAdj} chest. \"I want someone to notice me like that. I want what she has.\"",
                intimate: "Fiona steps closer, pressing her {myStatDesc} against your arm as she looks up at you. \"Barret's always had these amazing tits... don't you think I'd look good with curves like hers?\" She takes your hand and places it on her chest. \"Feel how little there is here. I want more. I want you to want to touch me like this.\""
            },
            butt: {
                shy: "Fiona shifts uncomfortably, not meeting your eyes. \"Barret... she walks through the tavern and everyone watches. It's her hips, the way she moves. She's always been built like that, all curves.\" She glances down at her own frame. \"I want a figure like hers.\"",
                intimate: "Fiona turns and backs up against you, pressing her {myStatAdj} backside into your hips. \"Barret's ass makes everyone stare when she walks by.\" She wiggles slightly, looking back at you over her shoulder. \"Can you imagine if I had curves like that? Wouldn't you like something more to grab onto?\""
            },
            muscle: {
                shy: "\"Barret carries those heavy trays like they're nothing,\" Fiona murmurs, looking at her own arms. \"She's always been strong, solid. Nobody pushes her around.\" She swallows hard. \"I want to be strong like that.\"",
                intimate: "Fiona takes your hand and runs it along her {myStatAdj} arm, then up to her shoulder. \"Feel how thin I am? Barret's got real strength.\" She leans into you, her body warm against yours. \"I want arms that could hold you tight. Wouldn't that be nice?\""
            },
            genitaliaSize: {
                shy: null,
                intimate: "Fiona presses close, her breath warm against your neck. \"I've seen Barret in the baths once. She's got this {statAdj} pussy...\" Her hand finds yours and guides it to rest on her hip, dangerously close. \"Mine's so {myStatAdj}. Don't you think I deserve something more... noticeable? Something you'd want to play with?\""
            }
        },
        della: {
            chest: {
                shy: "\"Della's always been... generous,\" Fiona says carefully, hands fidgeting. \"Even when I was little, buying bread from her, I noticed. The way her apron sits, how she leans back when she kneads dough.\" She looks down at her {myStatDesc}. \"I want curves like hers.\"",
                intimate: "Fiona takes your hand and presses it flat against her {myStatDesc}. \"Della's breasts are so full and soft. Feel how little I have?\" She looks up at you with hopeful eyes, arching her back slightly. \"I want you to have something to hold onto. Wouldn't you like that? Wouldn't it make you happy?\""
            },
            butt: {
                shy: "\"Della's got this way of moving,\" Fiona mumbles, embarrassed. \"Her hips, her backside... she's always been built for comfort. Soft and round.\" She shifts, feeling her own frame. \"I want curves like that.\"",
                intimate: "Fiona guides your hands to her {myStatAdj} hips, swaying slightly. \"Della's got this soft, round ass that fills out her skirts.\" She presses back against your palms. \"There's barely anything here. Don't you want more to hold? I want to feel your hands full of me.\""
            },
            muscle: {
                shy: "\"Della kneads bread all day,\" Fiona observes quietly. \"Her arms are stronger than they look. She's always been capable, steady.\" She looks at her own limbs. \"I want strength like that.\"",
                intimate: "Fiona wraps her thin arms around you, squeezing weakly. \"Della's got real strength from all that baking.\" She nuzzles against your chest. \"I want to be able to hold you properly. Strong enough that you'd feel safe with me. Would you like that?\""
            },
            genitaliaSize: {
                shy: null,
                intimate: "Fiona leans against you, her lips brushing your ear. \"Della's got this {statAdj} pussy. I've noticed through her dress.\" She takes your hand and slowly slides it down her belly to rest at her waistband. \"Mine's so {myStatAdj}... wouldn't you rather have something more to explore down there?\""
            }
        },
        mrs_thornwick: {
            chest: {
                shy: "Fiona's voice drops to barely a whisper. \"Mrs. Thornwick... she's so proper, so respectable, but have you seen...\" She gestures at her own chest. \"She's always had this presence. That bosom of hers commands attention even during town meetings.\" She hunches. \"I want people to notice me like that.\"",
                intimate: "Fiona presses her {myStatDesc} against you, looking up with wide eyes. \"Mrs. Thornwick hides these incredible breasts under her proper dresses.\" She takes your hand and places it over her heart, letting you feel her modest curve. \"I want that. Imagine unwrapping me and finding something like that. Wouldn't that make you excited?\""
            },
            butt: {
                shy: "\"Mrs. Thornwick carries herself so well,\" Fiona says softly. \"Even from behind, she looks dignified. That full figure of hers, the way her skirts flow.\" She glances at her own backside. \"I want to look like a woman like that.\"",
                intimate: "Fiona turns and presses her {myStatAdj} backside against you. \"Mrs. Thornwick has these elegant curves that sway when she walks.\" She grinds back slightly, looking over her shoulder. \"Don't you think I'd look beautiful with a figure like hers? Something worth watching walk away?\""
            },
            muscle: {
                shy: "\"Mrs. Thornwick always seems so sturdy,\" Fiona murmurs. \"Not bulky, but solid. Capable. She's been that way as long as I can remember.\" She looks at her arms. \"I want to feel grounded like that.\"",
                intimate: "Fiona wraps her arms around your waist, squeezing with her meager strength. \"Mrs. Thornwick's got this hidden firmness under her soft exterior.\" She looks up at you pleadingly. \"I want to be strong enough to really hold you. Would you help me get there?\""
            },
            genitaliaSize: {
                shy: "Fiona's face burns crimson. \"Mrs. Thornwick... I noticed once, when she sat down wrong at a meeting...\" She can barely meet your eyes. \"She has a {statDesc}. Even there, she's more... womanly than me.\"",
                intimate: "Fiona presses close, her breath warm against your neck. \"Mrs. Thornwick has a {statDesc}. I saw once...\" Her hand finds yours and guides it to rest between her thighs. \"My {myStatDesc} is so... I want to feel more womanly there. Wouldn't you like that?\""
            }
        },
        mira: {
            chest: {
                shy: "\"Mira's got a nice figure,\" Fiona says quietly. \"Nothing extreme, just... balanced. She's always looked healthy like that.\" She looks down at her {myStatDesc}. \"I want to look like her.\"",
                intimate: "Fiona cuddles against you, pressing her {myStatDesc} into your side. \"Mira's got these perky breasts, just enough to notice.\" She looks up at you hopefully. \"Even something modest like hers would make me so happy. Don't you think I'd look cute with a bit more?\""
            },
            butt: {
                shy: "\"Mira runs around all day delivering packages,\" Fiona observes. \"All that running's given her this perky little butt. You can tell even through her clothes.\" She glances back at her own {myStatAdj} backside. \"I'd love to have curves like hers.\"",
                intimate: "Fiona backs up against you, wiggling her {myStatAdj} hips. \"Mira's got this tight, perky little ass from all that running.\" She looks back at you with a shy smile. \"Something like that would be perfect, don't you think? Enough to make you want to chase me?\""
            },
            muscle: {
                shy: "\"Mira's fit from all that running,\" Fiona murmurs. \"She's always had good legs, toned arms.\" She examines her own limbs. \"I want to be fit like her.\"",
                intimate: "Fiona guides your hand to her {myStatAdj} thigh, squeezing it with her own hand. \"Mira's got these toned legs from running all day.\" She shifts closer. \"I want legs that would wrap around you properly. Wouldn't you like that?\""
            },
            genitaliaSize: {
                shy: "Fiona blushes deeply. \"Mira's got such a healthy body everywhere,\" she whispers. \"I've seen her bathing once... her {statDesc}.\" She fidgets. \"Even there, she's more developed than me.\"",
                intimate: "Fiona presses close, guiding your hand down her body. \"Mira has a {statDesc}. Athletic but womanly.\" She gasps as your fingers reach her {myStatDesc}. \"I want to feel like a real woman there too. Would you like to touch something more?\""
            }
        },
        vessa: {
            chest: {
                shy: "\"Vessa's got an elegant look,\" Fiona says carefully. \"Slim, refined... she's always carried herself with confidence.\" She touches her own chest. \"I want that kind of presence.\"",
                intimate: "Fiona presses against you, her {myStatDesc} warm through her thin shirt. \"Vessa has these elegant curves, mysterious and alluring.\" She looks up through her lashes. \"Even something subtle like hers would make me feel so much more confident. Would you like me to be more confident?\""
            },
            butt: {
                shy: "\"Vessa moves like she knows secrets,\" Fiona murmurs. \"Her figure is subtle but nice. She's always had that mysterious elegance.\" She shifts uncomfortably. \"I want curves like hers.\"",
                intimate: "Fiona turns and sways her {myStatAdj} hips against you. \"Vessa has these subtle curves, graceful and feminine.\" She looks back with a teasing smile. \"I want that elegance. Don't you think I'd look mysterious too?\""
            },
            muscle: {
                shy: "\"Vessa's not muscular,\" Fiona observes, \"but she's not weak either. She's always had this quiet capability.\" She looks at her own arms. \"I want to not be the weakest person in the room.\"",
                intimate: "Fiona takes your hands and places them on her waist, pulling herself close. \"Vessa's soft but substantial. She's not fragile.\" She gazes up at you. \"I want you to be able to hold me without worrying I'll break. Would you like that?\""
            },
            genitaliaSize: {
                shy: "\"Vessa knows things about bodies,\" Fiona whispers, face red. \"She has a {statDesc}. I noticed once, when we talked about herbs...\" She trails off. \"She's more... complete than me.\"",
                intimate: "Fiona presses her body against yours, trembling slightly. \"Vessa has a {statDesc}. She told me once, matter-of-factly.\" She guides your hand between her thighs. \"My {myStatDesc} feels so... lacking. Don't you want to give me something more to offer you?\""
            }
        },
        lenna: {
            chest: {
                shy: "\"Lenna's quiet, like me,\" Fiona says softly. \"But she's got more going on up top. She's always had that modest, bookish figure.\" She looks down at her {myStatDesc}. \"I want what she has.\"",
                intimate: "Fiona cuddles close, pressing her {myStatDesc} against you. \"Lenna hides these cute little breasts under her high collars.\" She looks up with hopeful eyes. \"I want something to hide too. Something for just you to discover. Wouldn't that be fun?\""
            },
            butt: {
                shy: "\"Lenna sits in the library all day,\" Fiona observes. \"She's got this soft, feminine figure. She's always been shaped like a woman.\" She glances at her own hips. \"I want curves like that.\"",
                intimate: "Fiona settles onto your lap, wiggling her {myStatAdj} backside against you. \"Lenna's got this soft little rear, feminine and cute.\" She looks back at you. \"Wouldn't you like more to hold onto when I sit like this?\""
            },
            muscle: {
                shy: "\"Lenna's not strong,\" Fiona says, \"but she's got a healthier look than me. She's always been that way.\" She examines her arms. \"I want to look less fragile.\"",
                intimate: "Fiona wraps herself around you, her thin limbs clinging tight. \"Lenna's soft but she looks healthy, substantial.\" She nuzzles against you. \"I want to feel less breakable. For you.\""
            },
            genitaliaSize: {
                shy: "\"Lenna and I are similar,\" Fiona whispers. \"But even she has a {statDesc}. I noticed in the bathhouse once.\" She looks down. \"Even the librarian is more... developed than me.\"",
                intimate: "Fiona cuddles into you, taking your hand and sliding it down her body. \"Lenna has a {statDesc}. Modest but pretty.\" She presses your fingers against her {myStatDesc}. \"Mine is so... please, I want something more for you to touch.\""
            }
        }
    },

    // ==========================================
    // BARRET (Tavern Owner - bold, openly kinky, confident)
    // Intimate: overtly sexual, playful, no shame
    // ==========================================
    barret: {
        della: {
            chest: {
                shy: {
                    increase: "\"Della's got a magnificent bosom,\" Barret says appreciatively. \"Always has. Those baker's curves.\" She adjusts her own blouse over her {myStatDesc}. \"There's something about hers though.\"",
                    decrease: "\"Della's got a nice figure,\" Barret muses. \"Not too much, not too little. Classic baker's build.\" She looks down at her own {myStatDesc}. \"Sometimes I think less would be more, you know?\""
                },
                intimate: {
                    increase: "Barret grabs your hands and plants them firmly on her {myStatDesc}. \"Della's tits are incredible. Heavy, soft, spilling everywhere.\" She squeezes your hands, making you squeeze her. \"Don't these feel nice? Imagine if they were even bigger. You'd like that, wouldn't you?\"",
                    decrease: "Barret grabs your hands and plants them firmly on her {myStatDesc}. \"Della's got this perfect, manageable chest. Not overwhelming, just right.\" She squeezes your hands, making you squeeze her. \"Don't you think these could be smaller? Something perkier, easier to handle. Would you like that?\""
                }
            },
            butt: {
                shy: {
                    increase: "\"Della's backside is a work of art,\" Barret says. \"All that standing and kneading. She's always had it.\" She glances at her own {myStatAdj} rear. \"Hers is goals.\"",
                    decrease: "\"Della's got a nice rear,\" Barret observes. \"Proportional. Practical.\" She glances at her own {myStatAdj} backside. \"Sometimes I think I've got too much back here.\""
                },
                intimate: {
                    increase: "Barret turns and backs her {myStatAdj} ass firmly against your hips. \"Della's rear is perfection. Full, round, jiggles beautifully.\" She grinds back slowly. \"Feel that? Imagine even more. I'd look incredible, and you know it.\"",
                    decrease: "Barret turns and backs her {myStatAdj} ass firmly against your hips. \"Della's got this nice, practical rear. Not too much, not too little.\" She grinds back slowly. \"Feel that? Wouldn't you like something tighter? More manageable?\""
                }
            },
            muscle: {
                shy: {
                    increase: "\"Della's got working arms,\" Barret says. \"Years of kneading.\" She examines her own {myStatAdj} arms. \"She's got better definition than me.\"",
                    decrease: "\"Della's got practical arms,\" Barret says. \"Strong enough for the job, but still soft.\" She examines her own {myStatAdj} arms. \"I'm a bit much sometimes.\""
                },
                intimate: {
                    increase: "Barret flexes her {myStatAdj} arm, then guides your hand to feel it. \"Della's got these strong baker's arms.\" She grins. \"Wouldn't you like me to have the strength to really manhandle you sometime?\"",
                    decrease: "Barret flexes her {myStatAdj} arm, then guides your hand to feel it. \"Della's got this nice, soft strength. Feminine but capable.\" She grins. \"Would you like me softer? Less intimidating?\""
                }
            },
            genitaliaSize: {
                shy: null,
                intimate: {
                    increase: "Barret pulls you close and slides your hand down to cup her through her skirt. \"Della's got this {statAdj} pussy. Very noticeable.\" She presses against your palm with a grin. \"Feel my {myStatAdj} one? Don't you think I deserve something more... impressive down there? Something you'd really enjoy exploring?\"",
                    decrease: "Barret pulls you close and slides your hand down to cup her through her skirt. \"Della's got this {statAdj} pussy. Neat, subtle.\" She presses against your palm with a grin. \"Feel my {myStatAdj} one? Don't you think something more delicate would be nice? Tighter, more sensitive?\""
                }
            }
        },
        mrs_thornwick: {
            chest: {
                shy: "\"Mrs. Thornwick hides it well,\" Barret muses, \"but she's stacked under those proper dresses. Always has been.\" She looks at her own {myStatDesc}. \"That respectable-but-busty look is appealing.\"",
                intimate: "Barret grabs your wrists and presses your hands against her {myStatDesc}, trapping them there. \"Mrs. Thornwick's got these amazing tits hidden under all that propriety.\" She arches into your touch. \"Wouldn't you love to unwrap me and find even more than this? Picture it.\""
            },
            butt: {
                shy: "\"Mrs. Thornwick's got a dignified figure,\" Barret notes. \"Full in the right places. She's always carried herself well.\" She considers her own {myStatAdj} curves. \"Classy.\"",
                intimate: "Barret turns and lifts her skirt slightly, pressing her {myStatAdj} rear back against you. \"Mrs. Thornwick's hiding a great ass under those proper skirts.\" She wiggles enticingly. \"Give me that elegant fullness and I'll let you admire it whenever you want.\""
            },
            muscle: {
                shy: "\"Mrs. Thornwick's fit for her age,\" Barret observes. \"Sturdy. She's always been solid.\" She flexes her {myStatAdj} arm. \"Respectable strength.\"",
                intimate: "Barret flexes and guides your hand to feel her {myStatAdj} arm. \"Mrs. Thornwick's got hidden firmness under all that propriety.\" She leans in close. \"I want to be strong enough to pin you down properly. Interested?\""
            },
            genitaliaSize: {
                shy: "\"Mrs. Thornwick's hiding more than her bosom,\" Barret says with a knowing grin. \"I've heard rumors about her {statDesc}. Even proper ladies have their secrets.\"",
                intimate: "Barret takes your hand and shoves it under her skirt without ceremony. \"Mrs. Thornwick has a {statDesc} under all that respectability.\" She grinds against your palm. \"My {myStatDesc} could match. Give me something worth hiding under proper skirts.\""
            }
        },
        fiona: {
            chest: {
                shy: "\"Fiona's got this delicate look,\" Barret muses. \"Small, petite. She's always been that way.\" She cups her own {myStatDesc}. \"Sometimes I wonder what dainty feels like.\"",
                intimate: "Barret takes your hands and places them on her {myStatDesc}, then slowly pulls them away. \"Fiona's flat as a board, barely anything there.\" She grins mischievously. \"Bet you'd miss these if I shrunk them down. Or would you find it exciting? Something different to play with?\""
            },
            butt: {
                shy: "\"Fiona's got no curves at all,\" Barret observes. \"Boyish. She's always been like that.\" She pats her {myStatAdj} backside. \"Sometimes less is more, right?\"",
                intimate: "Barret grabs your hands and plants them on her {myStatAdj} ass. \"Fiona's got nothing back here.\" She squeezes your hands around herself. \"Would you miss this if I slimmed down? Or does the idea of something tight and perky excite you?\""
            },
            muscle: {
                shy: "\"Fiona's so delicate,\" Barret says. \"Thin arms, barely any muscle. She's always been that way.\" She flexes her {myStatAdj} arm. \"There's something graceful about being slight.\"",
                intimate: "Barret wraps her {myStatAdj} arms around you and squeezes firmly. \"Fiona's so delicate, so fragile.\" She loosens her grip to something featherlight. \"Would you like me soft and helpless in your arms for a change? I could be your delicate little thing.\""
            },
            genitaliaSize: {
                shy: "\"Fiona's got barely anything down there,\" Barret muses. \"Her {statDesc}. Subtle. Innocent.\" She considers. \"There's something appealing about that kind of... minimalism.\"",
                intimate: "Barret takes your hand and slides it under her skirt. \"Fiona's got a {statDesc}. Barely noticeable.\" She presses against your fingers. \"Shrink mine down too. Make me tight and subtle. Something you'd have to search for.\""
            }
        },
        mira: {
            chest: {
                shy: "\"Mira's got a sporty figure,\" Barret observes. \"Perky but modest. She's always been athletic.\" She looks at her own {myStatDesc}. \"Sometimes I think about going lighter.\"",
                intimate: "Barret bounces on her heels, making her {myStatDesc} jiggle. \"Mira's got these perky little tits that don't get in the way.\" She catches your eye with a grin. \"Bet I'd be faster in bed with less to carry around. Want to find out?\""
            },
            butt: {
                shy: "\"Mira's got a runner's backside,\" Barret notes. \"Tight, athletic. She's always been lean.\" She glances at her own {myStatAdj} curves. \"Could be fun to streamline.\"",
                intimate: "Barret turns and slaps her own {myStatAdj} rear. \"Mira's ass is tight and perky, built for speed.\" She looks back at you with a wicked grin. \"Make me athletic and I'll show you what I can do with a body built for endurance.\""
            },
            muscle: {
                shy: "\"Mira's fit,\" Barret says simply. \"All that running keeps her toned.\" She examines her own {myStatAdj} arms. \"Good practical strength.\"",
                intimate: "Barret flexes her {myStatAdj} arm while pressing against you. \"Mira's got lean, defined muscles from all that running.\" She grins. \"Tone me up and I'll have the stamina to wear you out properly.\""
            },
            genitaliaSize: {
                shy: "\"Mira's athletic everywhere,\" Barret notes. \"Her {statDesc}. Compact, efficient.\" She grins. \"Fits her runner's body.\"",
                intimate: "Barret grabs your hand and shoves it between her legs. \"Mira's got a {statDesc}. Athletic and neat.\" She grinds against your palm. \"Streamline mine to match. I want to feel everything more intensely.\""
            }
        },
        vessa: {
            chest: {
                shy: "\"Vessa's elegant,\" Barret muses. \"Understated curves. She's always been refined that way.\" She looks at her own {myStatDesc}. \"There's appeal in subtlety.\"",
                intimate: "Barret guides your hands to her {myStatDesc}, then slowly moves them away. \"Vessa's got this mysterious, elegant look. Small but alluring.\" She smirks. \"Shrink me down and every touch would feel more intense. Doesn't that sound fun?\""
            },
            butt: {
                shy: "\"Vessa's got a neat little figure,\" Barret observes. \"Compact and graceful. She's always been proportioned that way.\" She glances at her {myStatAdj} rear. \"Subtlety has its charms.\"",
                intimate: "Barret takes your hands and places them on her {myStatAdj} backside. \"Vessa's ass is small but perfect, tight and toned.\" She presses into your grip. \"Slim me down and everything becomes more... sensitive. Every touch more electric.\""
            },
            muscle: {
                shy: "\"Vessa's soft,\" Barret notes. \"Not muscular at all. She's always been feminine that way.\" She flexes her {myStatAdj} arm. \"There's appeal in delicacy.\"",
                intimate: "Barret relaxes into you, going soft in your arms. \"Vessa's soft everywhere, yielding, feminine.\" She looks up at you with an uncharacteristically vulnerable expression. \"Would you like me helpless in your arms? Unable to resist whatever you wanted to do?\""
            },
            genitaliaSize: {
                shy: "\"Vessa's mysterious in every way,\" Barret muses. \"Even her {statDesc}. Elegant, refined.\" She tilts her head. \"I wonder what subtle feels like.\"",
                intimate: "Barret takes your hand and guides it under her skirt. \"Vessa has a {statDesc}. Mysterious and refined.\" She presses against your touch. \"Make mine elegant too. Something you'd have to explore carefully to appreciate.\""
            }
        },
        lenna: {
            chest: {
                shy: "\"Lenna's got a quiet figure,\" Barret observes. \"Modest but nice. She's always had that bookish charm.\" She looks at her own {myStatDesc}. \"Sometimes subtle is sexy.\"",
                intimate: "Barret presses her {myStatDesc} against you, then pulls back teasingly. \"Lenna's chest is cute, small, innocent-looking.\" She grins. \"Shrink me down and I could play innocent for you. 'Oh my, I've never done this before...'\" She winks."
            },
            butt: {
                shy: "\"Lenna's got a soft, modest figure,\" Barret muses. \"She's always been understated.\" She glances at her own {myStatAdj} curves. \"There's something appealing about that.\"",
                intimate: "Barret turns and presents her {myStatAdj} rear to you. \"Lenna's got this cute little backside. Demure.\" She looks back playfully. \"Slim me down and you can pretend you're corrupting a proper librarian. Doesn't that sound delicious?\""
            },
            muscle: {
                shy: "\"Lenna's not strong,\" Barret observes. \"Soft, scholarly. She's always been that way.\" She flexes her {myStatAdj} arm. \"There's charm in being delicate.\"",
                intimate: "Barret drapes herself against you, going limp and soft. \"Lenna's so gentle, so fragile-looking.\" She gazes up at you submissively. \"Make me soft and I'll let you do whatever you want. I won't be able to stop you anyway.\""
            },
            genitaliaSize: {
                shy: "\"Lenna's demure everywhere,\" Barret muses. \"Her {statDesc}. Innocent, bookish even there.\" She grins. \"I bet she blushes when she touches herself.\"",
                intimate: "Barret takes your hand and slides it under her skirt. \"Lenna has a {statDesc}. Demure and innocent.\" She presses against your fingers with a wicked grin. \"Make mine shy and subtle. Then I can play the blushing virgin for you.\""
            }
        }
    },

    // ==========================================
    // MIRA (Courier - friendly, casual, embarrassed about chest desire)
    // Intimate: playful but still a bit shy about her secret desires
    // ==========================================
    mira: {
        barret: {
            chest: {
                shy: "Mira's cheeks flush as she glances toward the tavern. \"Boss, Barret's always had this amazing figure. The way her blouse fits, the tips she gets...\" She looks down at her {myStatDesc}. \"I know it's silly, but sometimes I wonder what it would be like to have curves like hers.\"",
                intimate: "Mira presses against you, her {myStatDesc} warm through her courier vest. \"Boss, Barret's tits are incredible. Don't tell anyone I said this, but...\" She takes your hand and places it on her chest. \"I want them bigger. Much bigger. Would you like that? Imagine what you could do with more to play with.\""
            },
            butt: {
                shy: "\"Barret walks through the tavern and everyone watches,\" Mira observes with a grin. \"She's got that natural sway. Always has.\" She glances at her own {myStatAdj} hips. \"I wouldn't mind a bit more back there, boss.\"",
                intimate: "Mira backs up against you, wiggling her {myStatAdj} rear. \"Boss, Barret's ass is legendary at the tavern.\" She looks back at you with a playful smile. \"Want to give me something to compete with? I promise I'll put it to good use.\""
            },
            muscle: {
                shy: "\"Barret's stronger than she looks, boss,\" Mira says. \"All that carrying trays, I guess. She's always been solid.\" She flexes her {myStatAdj} arm experimentally. \"Might help with the heavier packages.\"",
                intimate: "Mira guides your hands to her {myStatAdj} arms, squeezing. \"Boss, Barret's got real strength under those curves.\" She pulls you close. \"Make me stronger and I'll show you what these arms can do.\""
            },
            genitaliaSize: {
                shy: null,
                intimate: "Mira takes your hand and slides it down to her waist, then lower, pressing your palm against her through her pants. \"Boss, Barret's got a {statAdj} pussy. Very... noticeable.\" She gasps at your touch. \"Mine's {myStatAdj}. Don't you think I deserve something more impressive?\""
            }
        },
        della: {
            chest: {
                shy: "\"Della's got that classic baker's figure, boss,\" Mira says warmly. \"Soft, generous... she's always been comfortable in her body.\" She touches her {myStatDesc} self-consciously. \"I want curves like that.\"",
                intimate: "Mira presses her {myStatDesc} against your chest. \"Boss, Della's breasts are so full and soft. Maternal, but sexy too.\" She looks up at you hopefully. \"I want to fill out like her. Give you something substantial to hold onto.\""
            },
            butt: {
                shy: "\"Della's backside is... impressive, boss,\" Mira says with a laugh. \"All that standing and baking. She's always been built that way.\" She pats her {myStatAdj} rear. \"Goals.\"",
                intimate: "Mira turns and presses her {myStatAdj} backside against your hips. \"Boss, Della's got this amazing soft rear.\" She grinds back gently. \"Don't you think I'd look good with more curves? Something to really grab?\""
            },
            muscle: {
                shy: "\"Della kneads bread all day, boss,\" Mira observes. \"She's got real baker's arms. Always has.\" She examines her {myStatAdj} limbs. \"Practical strength.\"",
                intimate: "Mira flexes her {myStatAdj} arm while leaning against you. \"Boss, Della's strong from all that baking.\" She grins. \"Give me arms like hers and I'll knead you instead.\""
            },
            genitaliaSize: {
                shy: "Mira blushes. \"Boss, Della's... well-developed everywhere,\" she says quietly. \"Her {statDesc}. Womanly.\" She fidgets. \"I've always been more athletic down there.\"",
                intimate: "Mira takes your hand and guides it between her thighs. \"Boss, Della has a {statDesc}. Soft and womanly.\" She presses against your palm. \"My {myStatDesc} could be more... don't you want more to play with?\""
            }
        },
        mrs_thornwick: {
            chest: {
                shy: "Mira lowers her voice. \"Don't tell anyone, boss, but Mrs. Thornwick is hiding some serious curves under those proper dresses. She's always been... blessed.\" She glances at her {myStatDesc}. \"I want that respectable but busty look.\"",
                intimate: "Mira presses close, her {myStatDesc} against you. \"Boss, Mrs. Thornwick's chest is incredible. All that propriety hiding such amazing tits.\" She takes your hand and places it on herself. \"I want to fill out like that. Imagine unwrapping me and finding... more.\""
            },
            butt: {
                shy: "\"Mrs. Thornwick carries herself so well, boss,\" Mira notes. \"Dignified figure, nice curves. She's always been elegant.\" She considers her {myStatAdj} hips. \"Classy.\"",
                intimate: "Mira turns and sways her {myStatAdj} hips against you. \"Boss, Mrs. Thornwick has these dignified curves under her proper skirts.\" She looks back teasingly. \"Give me that elegant fullness?\""
            },
            muscle: {
                shy: "\"Mrs. Thornwick's fit for her position, boss,\" Mira observes. \"Solid. Commanding.\" She flexes her {myStatAdj} arm. \"Respectable strength.\"",
                intimate: "Mira guides your hand to feel her {myStatAdj} arm. \"Boss, Mrs. Thornwick's surprisingly firm under all that propriety.\" She grins. \"Give me that hidden strength?\""
            },
            genitaliaSize: {
                shy: "Mira's face reddens. \"Boss, Mrs. Thornwick's... developed,\" she whispers. \"Her {statDesc}. Proper on the outside but...\" She trails off. \"Even there, she's more womanly than me.\"",
                intimate: "Mira takes your hand and slides it into her pants. \"Boss, Mrs. Thornwick has a {statDesc} under all that propriety.\" She gasps at your touch. \"My {myStatDesc} could be more impressive. Wouldn't you like that?\""
            }
        },
        vessa: {
            chest: {
                shy: "\"Vessa has this mysterious elegance, boss,\" Mira says thoughtfully. \"Subtle curves, confident presence. She's always had that allure.\" She touches her {myStatDesc}. \"There's appeal in refinement.\"",
                intimate: "Mira presses her {myStatDesc} against you. \"Boss, Vessa's got this elegant, subtle figure.\" She looks up with a small smile. \"Sometimes less is more, right? Would you find me more alluring if I was... refined?\""
            },
            butt: {
                shy: "\"Vessa moves like she knows things, boss,\" Mira observes. \"Graceful. Compact.\" She glances at her {myStatAdj} curves. \"There's something about that mysterious poise.\"",
                intimate: "Mira sways against you. \"Boss, Vessa's figure is subtle but captivating.\" She looks back teasingly. \"Make me mysterious?\""
            },
            muscle: {
                shy: "\"Vessa's soft, boss,\" Mira notes. \"Not muscular, but there's nothing weak about her. She's always been that way.\" She considers her {myStatAdj} frame. \"Feminine strength.\"",
                intimate: "Mira relaxes against you, going soft. \"Boss, Vessa's yielding, feminine...\" She looks up. \"Would you like me softer? More... delicate?\""
            },
            genitaliaSize: {
                shy: "\"Vessa's mysterious everywhere, boss,\" Mira says quietly. \"Her {statDesc}. She mentioned it once, matter-of-factly.\" She fidgets. \"I wonder what that kind of elegance feels like.\"",
                intimate: "Mira guides your hand between her legs. \"Boss, Vessa has a {statDesc}. Elegant and refined.\" She presses against your touch. \"Make mine mysterious too?\""
            }
        },
        lenna: {
            chest: {
                shy: "\"Lenna's got that bookish charm, boss,\" Mira says. \"Modest figure, cute in a quiet way.\" She looks at her {myStatDesc}. \"Sometimes understated is appealing.\"",
                intimate: "Mira cuddles against you. \"Boss, Lenna's small but adorable.\" She looks up hopefully. \"Would you find me cuter if I were more... petite?\""
            },
            butt: {
                shy: "\"Lenna's got a soft, modest figure, boss,\" Mira observes. \"Feminine without being showy.\" She considers her {myStatAdj} hips. \"Demure.\"",
                intimate: "Mira presses against you. \"Boss, Lenna's figure is delicate, librarian-cute.\" She smiles. \"Make me subtle like her?\""
            },
            muscle: {
                shy: "\"Lenna's not strong, boss,\" Mira says. \"Soft, scholarly. She's always been gentle.\" She looks at her {myStatAdj} arms. \"There's charm in delicacy.\"",
                intimate: "Mira wraps her {myStatAdj} arms around you loosely. \"Boss, Lenna's so soft, so gentle.\" She nuzzles against you. \"Would you like me helpless in your arms?\""
            },
            genitaliaSize: {
                shy: "\"Lenna's delicate everywhere, boss,\" Mira says quietly. \"Her {statDesc}. Modest, like the rest of her.\" She fidgets. \"There's something sweet about that.\"",
                intimate: "Mira guides your hand between her thighs. \"Boss, Lenna has a {statDesc}. Demure and cute.\" She presses against you. \"Make mine sweet like hers?\""
            }
        },
        fiona: {
            chest: {
                shy: "\"Fiona's got that waif look, boss,\" Mira says gently. \"Delicate. Flat. She's always been like that.\" She touches her {myStatDesc}. \"Sometimes I wonder what petite feels like.\"",
                intimate: "Mira takes your hands to her {myStatDesc}. \"Boss, Fiona's completely flat, you know.\" She looks up curiously. \"Would it be weird if I wanted to be smaller? See what it's like to be delicate?\""
            },
            butt: {
                shy: "\"Fiona's got no curves at all, boss,\" Mira observes. \"Boyish almost.\" She glances at her {myStatAdj} hips. \"I wonder what streamlined feels like.\"",
                intimate: "Mira guides your hands to her {myStatAdj} rear. \"Boss, Fiona's got nothing back here.\" She wiggles experimentally. \"Would you miss my curves if I slimmed down? Or would you find it exciting?\""
            },
            muscle: {
                shy: "\"Fiona's so thin, boss,\" Mira says. \"Fragile-looking.\" She examines her {myStatAdj} arms. \"I hope she's okay. I wonder what that delicacy feels like.\"",
                intimate: "Mira drapes against you softly. \"Boss, Fiona's so delicate, so small.\" She looks up. \"Make me fragile and you can protect me.\""
            },
            genitaliaSize: {
                shy: "\"Fiona's barely developed anywhere, boss,\" Mira says gently. \"Her {statDesc}. So subtle.\" She looks thoughtful. \"I wonder what minimal feels like.\"",
                intimate: "Mira takes your hand and slides it between her legs. \"Boss, Fiona has a {statDesc}. Barely there.\" She presses against your fingers. \"Make mine subtle too. See if you can find it.\""
            }
        }
    },

    // ==========================================
    // VESSA (Herbalist - mysterious, knowing, openly curious, unashamed)
    // Intimate: direct, experimental, no embarrassment
    // ==========================================
    vessa: {
        barret: {
            chest: {
                shy: "\"Barret's figure is fascinating,\" Vessa says, violet eyes thoughtful. \"Generous curves, confident bearing. I've observed her for some time.\" She glances at her {myStatDesc}. \"I want to experience that fullness.\"",
                intimate: "Vessa presses against you, her {myStatDesc} warm. \"Barret's breasts are magnificent.\" She guides your hand to her chest without hesitation. \"I want to feel what larger breasts are like. The weight, the sensitivity. Don't you want to explore that with me?\""
            },
            butt: {
                shy: "\"Barret's posterior has interesting proportions,\" Vessa observes clinically. \"The way it affects her movement, her balance.\" She considers her {myStatAdj} rear. \"I'm curious about that sensation.\"",
                intimate: "Vessa turns and presses her {myStatAdj} backside against you. \"Barret's ass is remarkable.\" She looks back with knowing eyes. \"Give me curves like that. I want to feel how it changes my body's balance... and your hands on more of me.\""
            },
            muscle: {
                shy: "\"Barret's strength is practical,\" Vessa notes. \"Functional muscle. She's developed it naturally.\" She touches her {myStatAdj} arm. \"I could use more capability.\"",
                intimate: "Vessa flexes her {myStatAdj} arm while pressing against you. \"Barret's strength is appealing.\" Her eyes gleam. \"Strengthen me, and I'll show you what I can do with power.\""
            },
            genitaliaSize: {
                shy: "\"Barret's anatomy is quite... pronounced,\" Vessa observes without embarrassment. \"I've noticed through her clothing.\" She tilts her head. \"Interesting proportions.\"",
                intimate: "Vessa takes your hand and guides it between her thighs without hesitation. \"Barret has a {statAdj} pussy.\" She presses against your palm. \"My {myStatDesc} could be more. Transform me and we'll explore the difference together.\""
            }
        },
        della: {
            chest: {
                shy: "\"Della's chest is substantial,\" Vessa observes. \"Maternal, comforting. She's carried that shape for years.\" She touches her {myStatDesc}. \"I want to understand that fullness.\"",
                intimate: "Vessa presses her {myStatDesc} against you. \"Della's breasts are wonderfully full.\" She looks at you directly. \"Give me that abundance. I want to feel heavy with curves.\""
            },
            butt: {
                shy: "\"Della's figure is soft and generous,\" Vessa notes. \"Particularly her posterior. Natural curves.\" She glances at her {myStatAdj} rear. \"Intriguing proportions.\"",
                intimate: "Vessa backs against you, swaying her {myStatAdj} hips. \"Della's backside is impressively soft.\" She looks over her shoulder. \"I want that fullness. More for you to hold.\""
            },
            muscle: {
                shy: "\"Della has working strength,\" Vessa observes. \"Years of kneading. Practical.\" She examines her {myStatAdj} arms. \"Useful.\"",
                intimate: "Vessa guides your hand to her {myStatAdj} arm. \"Della's strength comes from labor.\" She squeezes. \"Give me that capability.\""
            },
            genitaliaSize: {
                shy: "\"Della's anatomy is... developed,\" Vessa observes thoughtfully. \"Her {statDesc}. I noticed when she adjusted her skirts.\" She tilts her head. \"Fascinating proportions.\"",
                intimate: "Vessa takes your hand and guides it between her thighs without hesitation. \"Della has a {statDesc}.\" She presses against your fingers. \"My {myStatDesc} could be different. I want to know what her sensitivity feels like.\""
            }
        },
        mrs_thornwick: {
            chest: {
                shy: "\"Mrs. Thornwick conceals impressive assets,\" Vessa says with a slight smile. \"Propriety hiding generous curves. She's always had that duality.\" She looks at her {myStatDesc}. \"The contrast appeals to me.\"",
                intimate: "Vessa presses close, her {myStatDesc} against you. \"Mrs. Thornwick hides magnificent breasts under respectability.\" Her eyes gleam. \"I want that hidden abundance. Secret curves for you to discover.\""
            },
            butt: {
                shy: "\"Mrs. Thornwick's figure is dignified,\" Vessa observes. \"Full curves under proper skirts.\" She considers her {myStatAdj} hips. \"Elegant proportions.\"",
                intimate: "Vessa sways her {myStatAdj} hips against you. \"Mrs. Thornwick's rear is surprisingly full.\" She looks back knowingly. \"Give me that dignified curve.\""
            },
            muscle: {
                shy: "\"Mrs. Thornwick has presence,\" Vessa notes. \"Not muscular, but solid. Commanding.\" She touches her {myStatAdj} frame. \"Authority.\"",
                intimate: "Vessa leans against you. \"Mrs. Thornwick carries herself with hidden strength.\" She looks up. \"Give me that commanding presence.\""
            },
            genitaliaSize: {
                shy: "\"Mrs. Thornwick hides more than her bosom,\" Vessa observes with a knowing smile. \"Her {statDesc}... noticeable when she sits just so.\" She tilts her head. \"The contrast between propriety and anatomy intrigues me.\"",
                intimate: "Vessa guides your hand between her thighs. \"Mrs. Thornwick has a {statDesc} hidden under all that respectability.\" She presses against you. \"My {myStatDesc} could match. I want to feel what she hides.\""
            }
        },
        mira: {
            chest: {
                shy: "\"Mira's figure is athletic,\" Vessa observes. \"Modest but balanced. Practical for a courier.\" She touches her {myStatDesc}. \"Functional.\"",
                intimate: "Vessa presses against you. \"Mira's chest is perky, practical.\" She looks at you directly. \"Sometimes efficiency is appealing. Streamline me.\""
            },
            butt: {
                shy: "\"Mira has a runner's build,\" Vessa notes. \"Tight, athletic. She's developed it from her work.\" She glances at her {myStatAdj} rear. \"Efficient.\"",
                intimate: "Vessa turns and presents her {myStatAdj} backside. \"Mira's rear is built for speed.\" She looks back. \"Give me that athletic tightness.\""
            },
            muscle: {
                shy: "\"Mira's fit from courier work,\" Vessa observes. \"Lean muscle, practical strength.\" She examines her {myStatAdj} arms. \"Capable.\"",
                intimate: "Vessa flexes near you. \"Mira's toned from running all day.\" She grins slightly. \"Give me that endurance.\""
            },
            genitaliaSize: {
                shy: "\"Mira's anatomy is neat,\" Vessa observes. \"Her {statDesc}. Athletic proportions extend everywhere, it seems.\" She considers thoughtfully. \"Interesting.\"",
                intimate: "Vessa takes your hand and slides it between her legs. \"Mira has a {statDesc}. Compact like the rest of her.\" She presses against your palm. \"My {myStatDesc} could be streamlined too. Change me.\""
            }
        },
        lenna: {
            chest: {
                shy: "\"Lenna's figure is modest,\" Vessa observes. \"Scholarly, understated.\" She looks at her {myStatDesc}. \"There's appeal in subtlety.\"",
                intimate: "Vessa presses against you softly. \"Lenna's chest is small, innocent.\" She looks up. \"Make me demure. Something innocent for you to corrupt.\""
            },
            butt: {
                shy: "\"Lenna's build is delicate,\" Vessa notes. \"Soft, feminine, minimal.\" She touches her {myStatAdj} hips. \"Graceful.\"",
                intimate: "Vessa sways gently. \"Lenna's figure is understated.\" She looks at you. \"Slim me down. Make me delicate.\""
            },
            muscle: {
                shy: "\"Lenna's not strong,\" Vessa observes. \"Soft. Scholarly.\" She examines her {myStatAdj} frame. \"Gentle.\"",
                intimate: "Vessa relaxes against you completely. \"Lenna's soft everywhere.\" She looks up. \"Make me yielding. Unable to resist you.\""
            },
            genitaliaSize: {
                shy: "\"Lenna's anatomy is delicate,\" Vessa observes. \"Her {statDesc}. Subtle, like the rest of her.\" She tilts her head. \"There's elegance in minimalism.\"",
                intimate: "Vessa guides your hand between her thighs. \"Lenna has a {statDesc}. Demure.\" She presses close. \"Give me that subtlety. My {myStatDesc} could be more refined.\""
            }
        },
        fiona: {
            chest: {
                shy: "\"Fiona's completely flat,\" Vessa observes without judgment. \"Boyish. There's a certain aesthetic.\" She touches her {myStatDesc}. \"Curious.\"",
                intimate: "Vessa takes your hand to her {myStatDesc}. \"Fiona has nothing here at all.\" She looks at you with interest. \"What would it feel like to be truly flat? Would you still want me?\""
            },
            butt: {
                shy: "\"Fiona has no curves,\" Vessa notes. \"Androgynous almost.\" She glances at her {myStatAdj} hips. \"Interesting.\"",
                intimate: "Vessa turns, showing her {myStatAdj} rear. \"Fiona's completely straight.\" She looks back curiously. \"Remove my curves. Let's experiment.\""
            },
            muscle: {
                shy: "\"Fiona's fragile,\" Vessa observes. \"Thin, weak. Vulnerable.\" She examines her {myStatAdj} arms. \"There's something there.\"",
                intimate: "Vessa drapes against you limply. \"Fiona can barely lift anything.\" She looks up. \"Make me helpless. Completely at your mercy.\""
            },
            genitaliaSize: {
                shy: "\"Fiona's anatomy is subtle,\" Vessa observes. \"Her {statDesc}. Underdeveloped, perhaps, or simply delicate.\" She considers. \"There's something appealing about that vulnerability.\"",
                intimate: "Vessa takes your hand and places it between her legs. \"Fiona has a {statDesc}. Barely there.\" She presses against your touch. \"Make mine subtle too. I want to feel what innocence is like down there.\""
            }
        }
    },

    // ==========================================
    // MRS. THORNWICK (Town Elder - dignified, practiced, repressed)
    // Intimate: maintains composure but desire shows through
    // ==========================================
    mrs_thornwick: {
        barret: {
            chest: {
                shy: "Mrs. Thornwick clears her throat delicately. \"Barret's figure is... quite generous. She's always been blessed in that regard.\" She adjusts her dress over her {myStatDesc}. \"There's a certain appeal to such... abundance.\"",
                intimate: "Mrs. Thornwick presses against you, her {myStatDesc} soft. \"Barret's breasts are magnificent, aren't they?\" She takes your hand and places it on herself, maintaining composure. \"I've always wondered what it would be like to have... more. Would you find that appealing?\""
            },
            butt: {
                shy: "\"Barret carries herself with a certain... presence,\" Mrs. Thornwick observes carefully. \"Her figure is quite striking.\" She smooths her skirt over her {myStatAdj} hips. \"There's something to be said for such curves.\"",
                intimate: "Mrs. Thornwick turns and backs against you, her {myStatAdj} rear pressing close. \"Barret's backside draws every eye in the tavern.\" She glances back, composure slightly cracking. \"I wouldn't mind... filling out a bit more.\""
            },
            muscle: {
                shy: "\"Barret has working strength,\" Mrs. Thornwick notes. \"Practical. She's developed it naturally.\" She touches her {myStatAdj} arm. \"There's dignity in capability.\"",
                intimate: "Mrs. Thornwick guides your hand to feel her {myStatAdj} arm. \"Barret's stronger than she looks.\" She meets your eyes. \"I could use more... firmness.\""
            },
            genitaliaSize: {
                shy: "Mrs. Thornwick pauses delicately. \"Barret is... quite developed in all regards,\" she says carefully. \"Her {statDesc}. I've heard talk at the tavern.\" She clears her throat. \"Striking proportions.\"",
                intimate: "Mrs. Thornwick takes your hand with careful dignity and guides it beneath her skirt. \"Barret has a {statDesc}. Quite... impressive.\" She presses against your palm, composure cracking. \"My {myStatDesc} could be more... pronounced. Would that please you?\""
            }
        },
        della: {
            chest: {
                shy: "\"Della has a lovely figure,\" Mrs. Thornwick says carefully. \"Maternal. Comforting. She's always been that way.\" She glances at her {myStatDesc}. \"Respectable curves.\"",
                intimate: "Mrs. Thornwick leans close, her {myStatDesc} pressing against you. \"Della's breasts are wonderfully full.\" She maintains eye contact. \"I want that maternal abundance. Don't you think it would suit me?\""
            },
            butt: {
                shy: "\"Della's built for comfort,\" Mrs. Thornwick observes. \"Soft, generous curves. She's always had that welcoming figure.\" She adjusts her skirt. \"Appealing.\"",
                intimate: "Mrs. Thornwick backs against you, pressing her {myStatAdj} rear close. \"Della's posterior is quite impressive.\" She allows herself a small smile. \"I wouldn't mind such fullness.\""
            },
            muscle: {
                shy: "\"Della has baker's arms,\" Mrs. Thornwick notes. \"Years of work. She's always been capable.\" She examines her {myStatAdj} arms. \"Practical.\"",
                intimate: "Mrs. Thornwick touches her {myStatAdj} arm while leaning against you. \"Della's strength is admirable.\" She looks at you. \"Give me that hidden capability.\""
            },
            genitaliaSize: {
                shy: "\"Della is... womanly in every way,\" Mrs. Thornwick says carefully. \"Her {statDesc}. Maternal proportions throughout.\" She adjusts her dress. \"Respectable.\"",
                intimate: "Mrs. Thornwick guides your hand beneath her skirts with practiced composure. \"Della has a {statDesc}. Soft and womanly.\" She presses against you. \"My {myStatDesc} could match. Something more... matronly.\""
            }
        },
        mira: {
            chest: {
                shy: "\"Mira has a youthful figure,\" Mrs. Thornwick observes. \"Athletic. Practical.\" She touches her {myStatDesc}. \"There's a certain appeal to that vitality.\"",
                intimate: "Mrs. Thornwick presses against you. \"Mira's chest is modest but perky.\" She maintains composure. \"Sometimes I wonder about a more... athletic figure.\""
            },
            butt: {
                shy: "\"Mira's built for running,\" Mrs. Thornwick notes. \"Tight, athletic.\" She glances at her {myStatAdj} rear. \"Efficient.\"",
                intimate: "Mrs. Thornwick turns slightly. \"Mira's figure is streamlined.\" She looks at you. \"Perhaps I could benefit from less... excess.\""
            },
            muscle: {
                shy: "\"Mira's fit,\" Mrs. Thornwick observes. \"Her work keeps her toned.\" She examines her {myStatAdj} frame. \"Active.\"",
                intimate: "Mrs. Thornwick flexes slightly. \"Mira's lean and capable.\" She meets your eyes. \"I could use that energy.\""
            },
            genitaliaSize: {
                shy: "\"Mira is athletic in all regards,\" Mrs. Thornwick observes carefully. \"Her {statDesc}. Youthful proportions.\" She clears her throat. \"Practical.\"",
                intimate: "Mrs. Thornwick guides your hand under her dress with careful control. \"Mira has a {statDesc}. Athletic, streamlined.\" She presses against you. \"Perhaps I should be less... excessive there as well.\""
            }
        },
        vessa: {
            chest: {
                shy: "\"Vessa has an elegant figure,\" Mrs. Thornwick says. \"Refined. Mysterious.\" She touches her {myStatDesc}. \"There's sophistication in subtlety.\"",
                intimate: "Mrs. Thornwick leans close. \"Vessa's chest is understated but alluring.\" She looks at you. \"Perhaps refinement suits me better than abundance.\""
            },
            butt: {
                shy: "\"Vessa moves with grace,\" Mrs. Thornwick observes. \"Compact, controlled.\" She smooths her skirt. \"Elegant.\"",
                intimate: "Mrs. Thornwick sways slightly. \"Vessa's figure is subtle but captivating.\" She glances at you. \"Slim me toward that elegance.\""
            },
            muscle: {
                shy: "\"Vessa's soft,\" Mrs. Thornwick notes. \"Feminine. Not weak, but yielding.\" She touches her {myStatAdj} arm. \"There's power in softness.\"",
                intimate: "Mrs. Thornwick relaxes against you. \"Vessa is soft everywhere.\" She looks up. \"Perhaps I should be less... rigid.\""
            },
            genitaliaSize: {
                shy: "\"Vessa is refined in every aspect,\" Mrs. Thornwick says delicately. \"Her {statDesc}. Elegant proportions.\" She smooths her dress. \"Sophisticated.\"",
                intimate: "Mrs. Thornwick guides your hand beneath her skirts. \"Vessa has a {statDesc}. Refined, elegant.\" She presses against your touch, composure slipping. \"Make mine more... dignified.\""
            }
        },
        lenna: {
            chest: {
                shy: "\"Lenna has a modest figure,\" Mrs. Thornwick observes. \"Appropriate for a librarian.\" She glances at her {myStatDesc}. \"Demure.\"",
                intimate: "Mrs. Thornwick touches her {myStatDesc}. \"Lenna's chest is small, innocent.\" She looks at you. \"Would you prefer me more... understated?\""
            },
            butt: {
                shy: "\"Lenna's build is delicate,\" Mrs. Thornwick notes. \"Scholarly.\" She smooths her skirt. \"Proper.\"",
                intimate: "Mrs. Thornwick considers. \"Lenna's figure is subtle.\" She glances at you. \"Perhaps less would be more dignified.\""
            },
            muscle: {
                shy: "\"Lenna's gentle,\" Mrs. Thornwick observes. \"Soft. Bookish.\" She examines her {myStatAdj} arm. \"Refined.\"",
                intimate: "Mrs. Thornwick softens against you. \"Lenna's delicate.\" She looks up. \"Make me gentler.\""
            },
            genitaliaSize: {
                shy: "\"Lenna is demure in all respects,\" Mrs. Thornwick says carefully. \"Her {statDesc}. Modest proportions.\" She adjusts her dress. \"Proper.\"",
                intimate: "Mrs. Thornwick guides your hand beneath her skirts with composure. \"Lenna has a {statDesc}. Demure, innocent.\" She allows herself to press against you. \"Perhaps I should be more... modest there.\""
            }
        },
        fiona: {
            chest: {
                shy: "\"Fiona has a certain... simplicity to her figure,\" Mrs. Thornwick says carefully. \"Unencumbered. Light.\" She touches her {myStatDesc}. \"Sometimes I wonder what freedom from all this... weight would feel like.\"",
                intimate: "Mrs. Thornwick presses close, her {myStatDesc} heavy against you. \"Fiona's flat, you know. Completely unburdened.\" She looks at you with surprising vulnerability. \"Would you still want me if I were... less? Sometimes I dream of being free of all this.\""
            },
            butt: {
                shy: "\"Fiona's figure is streamlined,\" Mrs. Thornwick observes. \"Efficient. No excess.\" She smooths her skirt over her {myStatAdj} hips. \"There's an appeal to such simplicity.\"",
                intimate: "Mrs. Thornwick backs against you, her {myStatAdj} rear pressing close. \"Fiona has nothing back here. Nothing to manage, nothing to worry about.\" She glances back. \"Would it be strange if I wanted to be... smaller?\""
            },
            muscle: {
                shy: "\"Fiona's delicate,\" Mrs. Thornwick notes. \"Soft. There's a certain grace to such fragility.\" She examines her {myStatAdj} arms. \"Sometimes strength feels like a burden.\"",
                intimate: "Mrs. Thornwick relaxes against you, her {myStatAdj} frame softening. \"Fiona's so gentle, so yielding.\" She looks up. \"Make me softer. Let me be delicate in your arms.\""
            },
            genitaliaSize: {
                shy: "\"Fiona is... minimal in every way,\" Mrs. Thornwick observes carefully. \"Her {statDesc}. Subtle proportions.\" She smooths her dress. \"There's a certain... freedom in that simplicity.\"",
                intimate: "Mrs. Thornwick guides your hand beneath her skirts, composure cracking. \"Fiona has a {statDesc}. Barely there.\" She presses against you. \"Sometimes I dream of being less... I want to feel subtle. Unencumbered.\""
            }
        }
    },

    // ==========================================
    // DELLA (Baker - kind, motherly, practical, giggly about secrets)
    // Intimate: playful, warm, surprisingly bold
    // ==========================================
    della: {
        barret: {
            chest: {
                shy: "Della chuckles warmly. \"Barret's got quite the figure, hasn't she? She's always turned heads.\" She adjusts her apron over her {myStatDesc}. \"I wouldn't mind a bit more up top myself.\"",
                intimate: "Della presses against you, her {myStatDesc} soft and warm. \"Barret's breasts are lovely, aren't they?\" She giggles and takes your hand to her chest. \"I'd like more for you to play with. What do you say?\""
            },
            butt: {
                shy: "\"Barret's backside is something else,\" Della says with a laugh. \"She's always had those curves.\" She pats her {myStatAdj} rear. \"Mine could use some help.\"",
                intimate: "Della backs up against you, pressing her {myStatAdj} rear into your hips. \"Barret's ass makes everyone stare.\" She wiggles with a giggle. \"Give me more back here. I know you'd enjoy it.\""
            },
            muscle: {
                shy: "\"Barret's stronger than she looks,\" Della observes. \"Carrying all those trays.\" She looks at her {myStatAdj} arms. \"Good for kneading.\"",
                intimate: "Della flexes her {myStatAdj} arm playfully. \"Barret's got hidden strength.\" She grins. \"Make me stronger and I'll knead you properly.\""
            },
            genitaliaSize: {
                shy: null,
                intimate: "Della takes your hand with a mischievous smile and slides it under her skirt. \"Barret's got a {statAdj} pussy, you know.\" She presses your fingers against her {myStatDesc}. \"Mine could be more... impressive. Wouldn't that be fun to explore?\""
            }
        },
        mrs_thornwick: {
            chest: {
                shy: "\"Mrs. Thornwick hides quite a figure under those proper dresses,\" Della says with a knowing smile. \"She's always been blessed.\" She looks at her {myStatDesc}. \"Respectable and busty. Nice combination.\"",
                intimate: "Della cuddles against you. \"Mrs. Thornwick's chest is amazing, isn't it? Hidden under all that propriety.\" She places your hand on her {myStatDesc}. \"I want that respectable fullness.\""
            },
            butt: {
                shy: "\"Mrs. Thornwick's got dignified curves,\" Della observes. \"Proper but full.\" She considers her {myStatAdj} rear. \"Classy.\"",
                intimate: "Della backs against you with a giggle. \"Mrs. Thornwick's hiding a lovely rear.\" She wiggles. \"Give me that elegant fullness.\""
            },
            muscle: {
                shy: "\"Mrs. Thornwick's got presence,\" Della notes. \"Solid. Commanding.\" She touches her {myStatAdj} arm. \"Dignified.\"",
                intimate: "Della guides your hand to her {myStatAdj} arm. \"Mrs. Thornwick's surprisingly firm.\" She smiles. \"I could use that strength.\""
            },
            genitaliaSize: {
                shy: "\"Mrs. Thornwick's developed everywhere,\" Della says with a warm chuckle. \"Her {statDesc}. Very proper and womanly.\" She adjusts her apron. \"Dignified proportions.\"",
                intimate: "Della takes your hand with a giggle and slides it under her skirt. \"Mrs. Thornwick has a {statDesc}. Proper but impressive.\" She presses against you. \"Mine could match. Something dignified to explore.\""
            }
        },
        mira: {
            chest: {
                shy: "\"Mira's got a nice athletic figure,\" Della says warmly. \"Young and perky.\" She touches her {myStatDesc}. \"I remember when I was that age.\"",
                intimate: "Della presses against you softly. \"Mira's chest is modest and cute.\" She looks up. \"Maybe I should be less... matronly?\""
            },
            butt: {
                shy: "\"Mira's built for running,\" Della observes with a smile. \"Tight and athletic.\" She pats her {myStatAdj} rear. \"I could use less back here.\"",
                intimate: "Della turns and presents her {myStatAdj} backside. \"Mira's rear is so tight and perky.\" She giggles. \"Slim me down?\""
            },
            muscle: {
                shy: "\"Mira's fit from all that courier work,\" Della says. \"Active. Healthy.\" She looks at her {myStatAdj} arms. \"I miss that energy.\"",
                intimate: "Della flexes playfully. \"Mira's lean and toned.\" She grins. \"Give me back my youthful energy.\""
            },
            genitaliaSize: {
                shy: "\"Mira's athletic everywhere,\" Della says warmly. \"Her {statDesc}. Neat and youthful.\" She chuckles. \"I remember being that perky.\"",
                intimate: "Della guides your hand under her skirt with a playful smile. \"Mira has a {statDesc}. Athletic and trim.\" She presses against you. \"Make me youthful again down there?\""
            }
        },
        vessa: {
            chest: {
                shy: "\"Vessa's got that mysterious elegance,\" Della says. \"Refined figure. Subtle.\" She touches her {myStatDesc}. \"There's appeal in restraint.\"",
                intimate: "Della leans against you. \"Vessa's chest is understated but alluring.\" She looks up thoughtfully. \"Maybe less is more?\""
            },
            butt: {
                shy: "\"Vessa moves like a cat,\" Della observes. \"Graceful. Compact.\" She considers her {myStatAdj} hips. \"Elegant.\"",
                intimate: "Della sways against you. \"Vessa's figure is so refined.\" She smiles. \"Make me mysterious.\""
            },
            muscle: {
                shy: "\"Vessa's soft,\" Della notes. \"Not weak, just... yielding.\" She touches her {myStatAdj} arm. \"Feminine.\"",
                intimate: "Della relaxes against you. \"Vessa's soft everywhere.\" She giggles. \"Make me gentle.\""
            },
            genitaliaSize: {
                shy: "\"Vessa's elegant in every way,\" Della observes with a warm smile. \"Her {statDesc}. Refined proportions.\" She chuckles. \"Mysterious.\"",
                intimate: "Della takes your hand with a giggle and guides it under her skirt. \"Vessa has a {statDesc}. Elegant and refined.\" She presses against you. \"Make mine mysterious too.\""
            }
        },
        lenna: {
            chest: {
                shy: "\"Lenna's got that bookish charm,\" Della says warmly. \"Modest and sweet.\" She looks at her {myStatDesc}. \"Demure.\"",
                intimate: "Della touches her {myStatDesc} thoughtfully. \"Lenna's small and innocent.\" She looks at you. \"Would you like me more... understated?\""
            },
            butt: {
                shy: "\"Lenna's figure is delicate,\" Della observes. \"Scholarly.\" She pats her {myStatAdj} rear. \"Gentle.\"",
                intimate: "Della turns slightly. \"Lenna's so petite.\" She smiles. \"Less of me might be nice for a change.\""
            },
            muscle: {
                shy: "\"Lenna's soft,\" Della says. \"She's never done hard labor.\" She examines her {myStatAdj} arms. \"Gentle.\"",
                intimate: "Della softens against you. \"Lenna's delicate as paper.\" She giggles. \"Make me gentle like her.\""
            },
            genitaliaSize: {
                shy: "\"Lenna's modest everywhere,\" Della says warmly. \"Her {statDesc}. Sweet and innocent.\" She smiles. \"Demure.\"",
                intimate: "Della guides your hand under her skirt with a soft giggle. \"Lenna has a {statDesc}. Demure and sweet.\" She presses against you. \"Make mine innocent like hers.\""
            }
        },
        fiona: {
            chest: {
                shy: "\"Fiona's so light and free,\" Della says thoughtfully. \"No weight to carry around.\" She adjusts her apron over her {myStatDesc}. \"Sometimes I wonder what that would feel like. To just... not have all this.\"",
                intimate: "Della presses against you, her {myStatDesc} soft and heavy. \"Fiona's flat as a board, you know.\" She giggles softly. \"Would you still want to hold me if there was less of me to hold? Sometimes I daydream about being light again.\""
            },
            butt: {
                shy: "\"Fiona sits on those hard benches no problem,\" Della laughs. \"No padding needed.\" She pats her {myStatAdj} rear. \"Sometimes I miss being able to fit anywhere.\"",
                intimate: "Della backs against you with a thoughtful smile. \"Fiona's got nothing back here.\" She wiggles. \"Would you miss my curves if they were gone? Sometimes I wonder what slim feels like.\""
            },
            muscle: {
                shy: "\"Fiona's so delicate,\" Della observes. \"Light as a feather, I bet.\" She looks at her {myStatAdj} arms. \"Sometimes I feel too sturdy. Would be nice to feel gentle.\"",
                intimate: "Della softens against you. \"Fiona's so fragile, so light.\" She giggles. \"Make me delicate. I want to feel like I could float away in your arms.\""
            },
            genitaliaSize: {
                shy: "\"Fiona's subtle everywhere,\" Della says thoughtfully. \"Her {statDesc}. Barely developed.\" She sighs. \"Sometimes I wonder what that simplicity feels like.\"",
                intimate: "Della guides your hand under her skirt with a wistful smile. \"Fiona has a {statDesc}. Barely there.\" She presses against you. \"Make mine subtle. I want to feel delicate everywhere.\""
            }
        }
    },

    // ==========================================
    // LENNA (Librarian - shy, bookish, embarrassed)
    // Intimate: still nervous but more honest about desires
    // ==========================================
    lenna: {
        barret: {
            chest: {
                shy: "Lenna's face turns crimson. \"B-Barret's figure is... I mean, she's very... blessed.\" She hugs herself, looking at her {myStatDesc}. \"I've always wondered what it would be like to have... that kind of presence.\"",
                intimate: "Lenna presses against you nervously, her {myStatDesc} soft. \"Barret's breasts are amazing,\" she whispers. \"I... I want them bigger. Much bigger.\" She takes your hand and places it on her chest, trembling. \"P-please? I want you to have more to touch.\""
            },
            butt: {
                shy: "\"Barret's figure is very... noticeable,\" Lenna says quietly, adjusting her glasses. \"She's always been that way.\" She glances at her {myStatAdj} hips. \"I wouldn't mind a bit more... shape.\"",
                intimate: "Lenna backs against you shyly, pressing her {myStatAdj} rear to your hips. \"Barret's backside is so full.\" She blushes deeply but doesn't pull away. \"I want curves like that. Something for you to grab.\""
            },
            muscle: {
                shy: "\"Barret's stronger than she looks,\" Lenna observes quietly. \"She's always been capable.\" She examines her {myStatAdj} arms. \"I struggle with the heavy books.\"",
                intimate: "Lenna guides your hand to her {myStatAdj} arm. \"Barret's got real strength.\" She looks up hopefully. \"I want to be strong enough to... to hold onto you.\""
            },
            genitaliaSize: {
                shy: null,
                intimate: "Lenna presses close, face burning. \"B-Barret has a {statAdj} pussy,\" she whispers. She guides your hand hesitantly between her thighs. \"Mine is so {myStatAdj}. I... I want more. Something you'd really enjoy t-touching.\""
            }
        },
        della: {
            chest: {
                shy: "\"Della has such a warm figure,\" Lenna says softly. \"Maternal. Comforting. She's always been that way.\" She touches her {myStatDesc}. \"I want to be... more substantial.\"",
                intimate: "Lenna cuddles against you, her {myStatDesc} pressing softly. \"Della's breasts are so full and welcoming.\" She looks up with shy hope. \"I want that abundance. Something warm and soft for you.\""
            },
            butt: {
                shy: "\"Della's figure is generous,\" Lenna observes. \"Soft and curvy. She's always been comfortable.\" She glances at her {myStatAdj} rear. \"Inviting.\"",
                intimate: "Lenna backs against you gently. \"Della's backside is so soft.\" She blushes. \"I want more for you to hold.\""
            },
            muscle: {
                shy: "\"Della's got baker's arms,\" Lenna says. \"Strong from kneading. She's always been capable.\" She looks at her {myStatAdj} limbs. \"Practical strength.\"",
                intimate: "Lenna touches her {myStatAdj} arm while leaning against you. \"Della's strong.\" She looks up. \"I want to be able to hold you properly.\""
            },
            genitaliaSize: {
                shy: "\"D-Della is womanly everywhere,\" Lenna whispers, face red. \"Her {statDesc}. I noticed once in the bathhouse.\" She fidgets. \"Maternal.\"",
                intimate: "Lenna guides your hand between her thighs, trembling. \"Della has a {statDesc}. Soft and womanly.\" She presses against you. \"My {myStatDesc} could be more... p-please?\""
            }
        },
        mrs_thornwick: {
            chest: {
                shy: "\"Mrs. Thornwick is very... proper,\" Lenna says carefully. \"But she has quite a figure underneath.\" She touches her {myStatDesc} self-consciously. \"Dignified curves.\"",
                intimate: "Lenna presses against you. \"Mrs. Thornwick hides amazing breasts under propriety.\" She takes your hand hesitantly. \"I want that hidden fullness. A secret for just you.\""
            },
            butt: {
                shy: "\"Mrs. Thornwick carries herself well,\" Lenna observes. \"Elegant figure.\" She considers her {myStatAdj} hips. \"Dignified.\"",
                intimate: "Lenna backs against you shyly. \"Mrs. Thornwick's curves are elegant.\" She blushes. \"I want that refined fullness.\""
            },
            muscle: {
                shy: "\"Mrs. Thornwick has presence,\" Lenna notes quietly. \"Solid, commanding.\" She touches her {myStatAdj} arm. \"Authority.\"",
                intimate: "Lenna leans against you. \"Mrs. Thornwick's surprisingly firm.\" She looks up. \"Give me that hidden strength.\""
            },
            genitaliaSize: {
                shy: "\"Mrs. Thornwick is... developed,\" Lenna whispers, adjusting her glasses. \"Her {statDesc}. Proper but... impressive.\" She blushes deeply. \"Dignified proportions.\"",
                intimate: "Lenna hesitantly guides your hand under her skirt. \"Mrs. Thornwick has a {statDesc}. Hidden under all that propriety.\" She presses against you, face burning. \"C-could you make mine like that?\""
            }
        },
        mira: {
            chest: {
                shy: "\"Mira's figure is athletic,\" Lenna says. \"Practical. She's built for running.\" She looks at her {myStatDesc}. \"Active.\"",
                intimate: "Lenna presses close. \"Mira's chest is perky and practical.\" She looks up shyly. \"Maybe I don't need to be bigger...\""
            },
            butt: {
                shy: "\"Mira's got a runner's build,\" Lenna observes. \"Tight, athletic.\" She touches her {myStatAdj} hips. \"Efficient.\"",
                intimate: "Lenna turns slightly. \"Mira's rear is tight and perky.\" She blushes. \"Maybe less would be... nice?\""
            },
            muscle: {
                shy: "\"Mira's fit,\" Lenna notes. \"Active. Healthy.\" She examines her {myStatAdj} arms. \"She has energy.\"",
                intimate: "Lenna touches your arm. \"Mira's lean and toned.\" She looks hopeful. \"I could use that vitality.\""
            },
            genitaliaSize: {
                shy: "\"Mira's athletic everywhere,\" Lenna says quietly. \"Her {statDesc}. Neat and... healthy.\" She fidgets with her glasses. \"Active.\"",
                intimate: "Lenna takes your hand and guides it between her thighs, trembling. \"Mira has a {statDesc}. Athletic.\" She blushes. \"M-maybe mine should match that energy?\""
            }
        },
        vessa: {
            chest: {
                shy: "\"Vessa has an elegant figure,\" Lenna says. \"Mysterious, subtle.\" She touches her {myStatDesc}. \"Refined.\"",
                intimate: "Lenna leans against you softly. \"Vessa's chest is understated but alluring.\" She looks up. \"Maybe subtle is better...\""
            },
            butt: {
                shy: "\"Vessa moves gracefully,\" Lenna observes. \"Compact, controlled.\" She considers her {myStatAdj} hips. \"Elegant.\"",
                intimate: "Lenna sways gently. \"Vessa's figure is so refined.\" She whispers. \"Make me mysterious.\""
            },
            muscle: {
                shy: "\"Vessa's soft,\" Lenna notes. \"Not weak, just... feminine.\" She looks at her {myStatAdj} arms. \"Yielding.\"",
                intimate: "Lenna relaxes against you. \"Vessa's soft everywhere.\" She blushes. \"I'm already like that, I suppose.\""
            },
            genitaliaSize: {
                shy: "\"Vessa's refined everywhere,\" Lenna whispers. \"Her {statDesc}. Elegant.\" She adjusts her glasses nervously. \"Mysterious.\"",
                intimate: "Lenna hesitantly guides your hand under her skirt. \"Vessa has a {statDesc}. Elegant and refined.\" She presses against you shyly. \"Make mine m-mysterious too?\""
            }
        },
        fiona: {
            chest: {
                shy: "\"F-Fiona's so... light,\" Lenna says softly. \"Nothing weighing her down.\" She touches her {myStatDesc}. \"Sometimes I think about what it would be like to be... less. More like her.\"",
                intimate: "Lenna presses against you shyly. \"Fiona's completely flat,\" she whispers. \"Sometimes I... I wonder what that freedom feels like. W-would you still want to hold me if there was nothing there?\""
            },
            butt: {
                shy: "\"Fiona's figure is so streamlined,\" Lenna observes quietly. \"No curves to worry about.\" She glances at her {myStatAdj} hips. \"Sometimes less seems... easier.\"",
                intimate: "Lenna backs against you gently. \"Fiona has nothing back here.\" She blushes. \"Sometimes I want to be smaller. More... delicate. Would that be okay?\""
            },
            muscle: {
                shy: "\"Fiona's so fragile,\" Lenna says. \"Gentle. Soft.\" She looks at her {myStatAdj} arms. \"I'm already soft, but... maybe softer would be nice.\"",
                intimate: "Lenna relaxes completely against you. \"Fiona's so delicate, so light.\" She looks up shyly. \"I want to be even softer. Completely yielding in your arms.\""
            },
            genitaliaSize: {
                shy: "\"Fiona's subtle everywhere,\" Lenna whispers. \"Her {statDesc}. Barely there.\" She fidgets. \"Sometimes I wonder what that delicacy feels like.\"",
                intimate: "Lenna guides your hand under her skirt, trembling. \"Fiona has a {statDesc}. So subtle.\" She presses against you. \"M-make mine delicate too. I want to feel... innocent.\""
            }
        }
    }
};

// ==========================================
// CHANGED DIALOGUES (Recent transformation, generic with tokens)
// observer -> stat -> shy/intimate
// Tokens: {compared}, {statDesc}, {statAdj}, {myStatDesc}, {myStatAdj}
// ==========================================
const CHANGED_DESIRE_DIALOGUES = {

    // ==========================================
    // FIONA - shy, insecure, hopeful about change
    // Intimate: teasing, seeking validation, physical contact
    // ==========================================
    fiona: {
        chest: {
            shy: "\"Have you seen {compared} lately?\" Fiona whispers, glancing around nervously. \"Something's different. Her chest is {statAdj} now.\" She hugs herself, hope creeping into her voice. \"Whatever happened to her, I want that too. If she can change, maybe I can too.\"",
            intimate: "Fiona presses her {myStatDesc} against your arm, looking up at you. \"{compared}'s chest is {statAdj} now. I've been staring every time I see her.\" She takes your hand and places it on herself. \"Feel how I am now? Don't you think I'd look amazing like her? It would make me so happy...\""
        },
        butt: {
            shy: "\"Something happened to {compared},\" Fiona says quietly. \"Her backside is {statAdj} now. The way her clothes fit...\" She wraps her arms around herself. \"I want that too.\"",
            intimate: "Fiona turns and presses her {myStatAdj} backside against you. \"{compared}'s rear is {statAdj} now. The way people look at her...\" She wiggles against you, looking back over her shoulder. \"Wouldn't you like me to have curves like that? Something worth grabbing?\""
        },
        muscle: {
            shy: "\"{compared} looks different lately. Stronger.\" Fiona's voice is barely above a whisper. \"Her body is more {statAdj} now.\" She looks at her own limbs. \"If she can change, maybe I can too.\"",
            intimate: "Fiona guides your hands to her {myStatAdj} arms, squeezing them around her. \"{compared}'s gotten {statAdj}. You can see the change.\" She pulls herself close to you. \"I want to be strong enough to really hold onto you. Wouldn't you like that?\""
        },
        genitalia: {
            shy: "\"I heard something about {compared},\" Fiona whispers, barely audible. \"She has... something different now. Down there.\" She fidgets, face crimson. \"Is that even possible? Could you...?\"",
            intimate: "Fiona presses close, her lips brushing your ear. \"{compared} has a {statAdj} now. I can't stop thinking about it.\" She takes your hand and slides it down to rest on her hip. \"I want to know what that feels like. To have you touch something new. Wouldn't that be exciting for both of us?\""
        },
        genitaliaSize: {
            shy: null,
            intimate: "Fiona presses her whole body against yours, her hand guiding your fingers between her thighs. \"{compared}'s got a {statDesc} now. So different from my {myStatDesc}.\" She gasps softly at your touch. \"Don't you think I deserve something more impressive? Something you'd really enjoy playing with?\""
        }
    },

    // ==========================================
    // BARRET - bold, direct, playful about changes
    // Intimate: overtly sexual, confident, teasing
    // ==========================================
    barret: {
        chest: {
            shy: "\"{compared}'s chest is different,\" Barret observes with interest. \"More {statAdj} than before.\" She looks at her own {myStatDesc} consideringly. \"I'm curious what that feels like.\"",
            intimate: "Barret grabs your hands and plants them on her {myStatDesc}. \"{compared}'s tits are {statAdj} now. You did that.\" She makes you squeeze, grinning. \"Don't these feel nice? They could feel even better. Different. Change me and find out.\""
        },
        butt: {
            shy: "\"{compared}'s backside changed,\" Barret notes. \"It's {statAdj} now.\" She glances at her own {myStatAdj} rear. \"Might be worth trying.\"",
            intimate: "Barret turns and grinds her {myStatAdj} ass back against you. \"You gave {compared} a {statAdj} rear.\" She looks back with a wicked grin. \"My turn. Change me and I'll let you enjoy the results all night long.\""
        },
        muscle: {
            shy: "\"{compared}'s more {statAdj} now,\" Barret observes. \"Her body's different.\" She examines her own {myStatAdj} arms. \"I'm game for a change.\"",
            intimate: "Barret pins you against the wall with her {myStatAdj} arms, then releases you. \"{compared}'s got a {statAdj} build now.\" She grins. \"Change my strength and we can test it out together. See what I can do with you.\""
        },
        genitalia: {
            shy: "\"{compared} got something new down there,\" Barret says with raised eyebrows. \"A {statAdj}, from what I hear.\" She grins. \"That's wild. I'm curious.\"",
            intimate: "Barret pulls you close and grinds against your thigh. \"{compared}'s got a {statAdj} now.\" She bites her lip, eyes gleaming. \"I've always wondered what that would feel like. Inside me. Inside you. Give me one and let's find out together.\""
        },
        genitaliaSize: {
            shy: null,
            intimate: "Barret takes your hand and slides it under her skirt, pressing your fingers against her. \"{compared}'s got a {statDesc} now.\" She moans softly at your touch on her {myStatDesc}. \"Feel that? Don't you think I deserve something more? Something that would drive you wild?\""
        }
    },

    // ==========================================
    // MIRA - friendly, casual, embarrassed about secret desires
    // Intimate: playful but still shy about her deepest wants
    // ==========================================
    mira: {
        chest: {
            shy: "\"Did you see {compared}, boss?\" Mira asks, eyes wide. \"Her chest is {statAdj} now. Whatever happened to her...\" She glances down at her {myStatDesc}. \"I want that too. Don't laugh, but I've always wanted... more.\"",
            intimate: "Mira presses her {myStatDesc} against you. \"Boss, {compared}'s chest is {statAdj} now. I've been staring every time I see her.\" She takes your hand and places it on herself. \"I want them bigger. Much bigger. Embarrassingly bigger. Would you like that?\""
        },
        butt: {
            shy: "\"{compared}'s backside is different, boss,\" Mira observes. \"It's {statAdj} now.\" She glances at her {myStatAdj} rear. \"Not going to lie, I'm curious what that feels like.\"",
            intimate: "Mira backs against you, wiggling her {myStatAdj} hips. \"Boss, {compared}'s got a {statAdj} rear now.\" She looks back with a grin. \"Want to give me something that turns heads too?\""
        },
        muscle: {
            shy: "\"{compared} looks different lately, boss,\" Mira says. \"More {statAdj}.\" She examines her {myStatAdj} arms. \"Would help with the heavier packages.\"",
            intimate: "Mira flexes her {myStatAdj} arm while pressing against you. \"Boss, {compared}'s gotten {statAdj}.\" She grins. \"Tone me up and I'll carry you to bed.\""
        },
        genitalia: {
            shy: "\"I heard about {compared}, boss,\" Mira says, lowering her voice. \"She has a {statAdj} now?\" Her face reddens. \"That's... is that really possible?\"",
            intimate: "Mira pulls you close, her breath warm. \"Boss, {compared}'s got a {statAdj} now.\" Her eyes sparkle with curiosity. \"I've always wondered what that would feel like. Would you still want me if I had one too?\""
        },
        genitaliaSize: {
            shy: null,
            intimate: "Mira takes your hand and guides it between her thighs. \"Boss, {compared}'s got a {statDesc} now.\" She presses against your palm. \"Mine's so {myStatAdj}. Don't you think I deserve something more impressive?\""
        }
    },

    // ==========================================
    // VESSA - mysterious, knowing, unashamed
    // Intimate: direct, experimental, curious
    // ==========================================
    vessa: {
        chest: {
            shy: "\"I've observed the change in {compared},\" Vessa says, violet eyes thoughtful. \"Her chest is {statAdj} now. Fascinating.\" She touches her {myStatDesc}. \"I want to experience that transformation.\"",
            intimate: "Vessa presses against you, her {myStatDesc} warm. \"{compared}'s breasts are {statAdj} now. Your work.\" She guides your hand to her chest. \"Transform me next. I want to feel the change.\""
        },
        butt: {
            shy: "\"{compared}'s posterior has changed,\" Vessa observes. \"It's {statAdj} now. Interesting proportions.\" She considers her {myStatAdj} rear. \"I'm curious about the sensation.\"",
            intimate: "Vessa backs against you deliberately. \"{compared}'s rear is {statAdj} now.\" She looks back with knowing eyes. \"My turn. I want to understand how it affects balance... and pleasure.\""
        },
        muscle: {
            shy: "\"{compared}'s body has changed,\" Vessa notes. \"More {statAdj} now.\" She examines her {myStatAdj} frame. \"Power has its uses.\"",
            intimate: "Vessa flexes near you. \"{compared}'s grown {statAdj}.\" Her eyes gleam. \"Give me that strength. I have experiments in mind.\""
        },
        genitalia: {
            shy: "\"{compared} underwent an interesting transformation,\" Vessa observes without embarrassment. \"A {statAdj}. Remarkable.\" She tilts her head. \"I must experience this.\"",
            intimate: "Vessa pulls you close without hesitation. \"{compared} has a {statAdj} now.\" Her eyes are bright with curiosity. \"Give me one. I want to understand this from the inside.\""
        },
        genitaliaSize: {
            shy: "\"{compared}'s anatomy changed,\" Vessa observes clinically. \"Her size is {statAdj} now.\" She considers. \"Interesting.\"",
            intimate: "Vessa takes your hand and guides it between her legs without hesitation. \"{compared}'s got a {statDesc} now.\" She presses against you. \"My {myStatDesc} could be more. Let's experiment.\""
        }
    },

    // ==========================================
    // MRS. THORNWICK - dignified, repressed, maintains composure
    // Intimate: desire shows through careful propriety
    // ==========================================
    mrs_thornwick: {
        chest: {
            shy: "Mrs. Thornwick clears her throat. \"{compared}'s figure has... changed. Her chest is quite {statAdj} now.\" She adjusts her dress. \"There's a certain appeal to such... development.\"",
            intimate: "Mrs. Thornwick presses against you, maintaining composure. \"{compared}'s breasts are {statAdj} now.\" She places your hand on her {myStatDesc}. \"I've been thinking... more might be appropriate.\""
        },
        butt: {
            shy: "\"{compared}'s figure has altered,\" Mrs. Thornwick observes carefully. \"Her posterior is {statAdj} now.\" She smooths her skirt. \"Noticeable.\"",
            intimate: "Mrs. Thornwick backs against you, allowing herself the contact. \"{compared}'s backside is {statAdj} now.\" She glances back, composure slipping. \"Perhaps I should follow suit.\""
        },
        muscle: {
            shy: "\"{compared} appears stronger,\" Mrs. Thornwick notes. \"More {statAdj}.\" She touches her {myStatAdj} arm. \"There's dignity in strength.\"",
            intimate: "Mrs. Thornwick guides your hand to her {myStatAdj} arm. \"{compared}'s become {statAdj}.\" She meets your eyes. \"I could benefit from such... firmness.\""
        },
        genitalia: {
            shy: "Mrs. Thornwick pauses delicately. \"I've heard {compared} has... new equipment.\" She flushes slightly. \"A {statAdj}. How extraordinary.\"",
            intimate: "Mrs. Thornwick leans close, maintaining eye contact. \"{compared} has a {statAdj} now.\" Her voice is low. \"I've... wondered. Would such a change be possible for me?\""
        },
        genitaliaSize: {
            shy: null,
            intimate: "Mrs. Thornwick takes your hand with careful dignity and guides it beneath her skirt. \"{compared}'s... proportions have changed to {statAdj}.\" She presses against you. \"Perhaps I should be more... pronounced.\""
        }
    },

    // ==========================================
    // DELLA - kind, motherly, giggly about secrets
    // Intimate: warm, playful, surprisingly forward
    // ==========================================
    della: {
        chest: {
            shy: "Della chuckles. \"Have you seen {compared}? Her chest is {statAdj} now!\" She adjusts her apron. \"Well, I wouldn't mind a change myself.\"",
            intimate: "Della presses against you warmly. \"{compared}'s breasts are {statAdj} now. Your handiwork!\" She giggles and places your hand on her {myStatDesc}. \"My turn?\""
        },
        butt: {
            shy: "\"{compared}'s backside has changed,\" Della says with a laugh. \"It's {statAdj} now.\" She pats her {myStatAdj} rear. \"Getting ideas over here.\"",
            intimate: "Della backs up against you with a giggle. \"{compared}'s got a {statAdj} rear now.\" She wiggles. \"Don't I deserve the same treatment?\""
        },
        muscle: {
            shy: "\"{compared}'s gotten {statAdj},\" Della observes warmly. \"Good for her.\" She looks at her {myStatAdj} arms. \"Would help with the heavy trays.\"",
            intimate: "Della flexes playfully. \"{compared}'s all {statAdj} now.\" She grins. \"Strengthen me up. I've got uses in mind.\""
        },
        genitalia: {
            shy: "Della lowers her voice conspiratorially. \"I heard {compared} has a {statAdj} now!\" She giggles. \"Can you imagine?\"",
            intimate: "Della pulls you close with a mischievous smile. \"{compared}'s got a {statAdj} now.\" She winks. \"I've been curious about that for years. Want to help an old baker try something new?\""
        },
        genitaliaSize: {
            shy: null,
            intimate: "Della takes your hand with a warm smile and guides it under her skirt. \"{compared}'s got a {statDesc} now.\" She giggles as you touch her {myStatDesc}. \"Wouldn't more be fun to play with?\""
        }
    },

    // ==========================================
    // LENNA - shy, bookish, embarrassed
    // Intimate: nervous but honest about desires
    // ==========================================
    lenna: {
        chest: {
            shy: "\"H-have you seen {compared}?\" Lenna whispers, face red. \"Her chest is {statAdj} now.\" She hugs herself over her {myStatDesc}. \"I've been thinking... could something like that happen to me?\"",
            intimate: "Lenna presses against you trembling. \"{compared}'s breasts are {statAdj} now.\" She takes your hand and places it on her {myStatDesc}. \"I want them bigger. Please. I want you to have more to touch.\""
        },
        butt: {
            shy: "\"{compared}'s figure changed,\" Lenna says quietly. \"Her backside is {statAdj} now.\" She glances at her {myStatAdj} hips. \"I... wouldn't mind that.\"",
            intimate: "Lenna backs against you shyly. \"{compared}'s rear is {statAdj} now.\" She blushes deeply. \"C-could you give me curves like that? I want you to have something to hold.\""
        },
        muscle: {
            shy: "\"{compared} looks stronger,\" Lenna observes. \"More {statAdj}.\" She examines her {myStatAdj} arms. \"The heavy books are difficult...\"",
            intimate: "Lenna touches her {myStatAdj} arm while leaning against you. \"{compared}'s gotten {statAdj}.\" She looks up hopefully. \"I want to be strong enough to hold you properly.\""
        },
        genitalia: {
            shy: "Lenna's face turns crimson. \"I heard... {compared} has a {statAdj} now?\" She can barely meet your eyes. \"Is... is that really possible?\"",
            intimate: "Lenna whispers against your ear, trembling. \"{compared} has a {statAdj} now.\" She takes your hand hesitantly. \"I've... wondered what that would feel like. W-would you still want me?\""
        },
        genitaliaSize: {
            shy: null,
            intimate: "Lenna guides your hand between her thighs, face burning. \"{compared}'s got a {statDesc} now.\" She presses against your fingers. \"Mine is so {myStatAdj}. I... I want more. S-something you'd enjoy.\""
        }
    }
};

// ==========================================
// DIALOGUE LOOKUP FUNCTIONS
// ==========================================

function getStatDescriptor(stat, value, genitaliaType) {
    // Special handling for genitaliaSize - depends on genitalia type
    if (stat === 'genitaliaSize') {
        const key = genitaliaType === 1 ? 'genitaliaSize_penis' : 'genitaliaSize_vagina';
        const descriptors = STAT_DESCRIPTORS[key];
        return descriptors[value] || descriptors[1];
    }

    const descriptors = STAT_DESCRIPTORS[stat];
    if (!descriptors) return { adj: 'different', desc: 'different proportions' };
    return descriptors[value] || descriptors[2]; // default to level 2 if missing
}

function replaceTokens(text, tokens) {
    if (!text) return null;
    let result = text;
    for (const [key, value] of Object.entries(tokens)) {
        result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    }
    return result;
}

// Main lookup function
// Returns appropriate dialogue based on context
// Parameters:
//   observerId - NPC expressing the desire
//   targetId - NPC being compared to
//   stat - chest, butt, muscle, genitalia, genitaliaSize
//   isBaseValue - true if target's stat equals their naturalBody
//   isIntimate - true if trust >= intimate threshold
//   targetStatValue - target NPC's current stat value
//   observerStatValue - observer NPC's current stat value
//   targetGenitaliaType - target's genitalia (0=vagina, 1=penis) - needed for genitaliaSize
//   observerGenitaliaType - observer's genitalia (0=vagina, 1=penis) - needed for genitaliaSize
function getDesireRevealDialogue(observerId, targetId, stat, isBaseValue, isIntimate, targetStatValue, observerStatValue, targetGenitaliaType, observerGenitaliaType, desireDirection) {
    const toneKey = isIntimate ? 'intimate' : 'shy';

    // Use the desire's actual direction if provided, otherwise infer from stat comparison
    const direction = desireDirection || (targetStatValue > observerStatValue ? 'increase' : 'decrease');

    // Get descriptors for both target and observer (pass genitalia type for size lookups)
    const targetDesc = getStatDescriptor(stat, targetStatValue, targetGenitaliaType);
    const observerDesc = getStatDescriptor(stat, observerStatValue, observerGenitaliaType);

    // Get target NPC name
    const targetName = typeof getNpcDisplayName === 'function'
        ? getNpcDisplayName(targetId)
        : targetId.charAt(0).toUpperCase() + targetId.slice(1);

    const tokens = {
        compared: targetName,
        statDesc: targetDesc.desc,
        statAdj: targetDesc.adj,
        myStatDesc: observerDesc.desc,
        myStatAdj: observerDesc.adj
    };

    if (isBaseValue) {
        // Use specific pairing from BASE_DESIRE_DIALOGUES
        const observer = BASE_DESIRE_DIALOGUES[observerId];
        if (!observer) return null;

        const target = observer[targetId];
        if (!target) return null;

        const statDialogues = target[stat];
        if (!statDialogues) return null;

        // Try direction-aware structure first: shy: { increase: "...", decrease: "..." }
        // Fall back to legacy structure: shy: "..."
        let template;
        if (statDialogues[toneKey] && typeof statDialogues[toneKey] === 'object') {
            // New direction-aware structure
            template = statDialogues[toneKey][direction];
        } else {
            // Legacy structure (backward compatibility)
            template = statDialogues[toneKey];
        }
        return replaceTokens(template, tokens);
    } else {
        // Use generic CHANGED_DESIRE_DIALOGUES with token replacement
        const observer = CHANGED_DESIRE_DIALOGUES[observerId];
        if (!observer) return null;

        const statDialogues = observer[stat];
        if (!statDialogues) return null;

        // Try direction-aware structure first, fall back to legacy
        let template;
        if (statDialogues[toneKey] && typeof statDialogues[toneKey] === 'object') {
            template = statDialogues[toneKey][direction];
        } else {
            template = statDialogues[toneKey];
        }
        return replaceTokens(template, tokens);
    }
}

// Make functions globally accessible for browser
if (typeof window !== 'undefined') {
    window.getDesireRevealDialogue = getDesireRevealDialogue;
    window.getStatDescriptor = getStatDescriptor;
    window.replaceTokens = replaceTokens;
    window.STAT_DESCRIPTORS = STAT_DESCRIPTORS;
    window.BASE_DESIRE_DIALOGUES = BASE_DESIRE_DIALOGUES;
    window.CHANGED_DESIRE_DIALOGUES = CHANGED_DESIRE_DIALOGUES;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BASE_DESIRE_DIALOGUES,
        CHANGED_DESIRE_DIALOGUES,
        STAT_DESCRIPTORS,
        getDesireRevealDialogue,
        getStatDescriptor,
        replaceTokens
    };
}
