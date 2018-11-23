import { toTitleCase } from './utils.js';

const rawAssets = [

  // Face base

  {
    name:       'face_base',
    base:       'face',
    position:   0,
  },
  {
    name:       'face_cowboy',
    base:       'face',
    position:   0,
    modifier:   'cowboy hat',
    translate:  [0.075, 0.16],
    scale:      0.85,
  },
  {
    name:       'face_vomiting',
    base:       'face',
    position:   0,
    adjective:  'vomiting',
    translate:  [0.04, -0.01],
    scale:      0.92,
  },
  {
    name:       'face_angry',
    base:       'face',
    position:   0,
    adjective:  'angry',
  },
  {
    name:       'face_scared',
    base:       'face',
    position:   0,
    adjective:  'scared',
  },
  {
    name:       'face_devil',
    base:       'devil face',
    position:   0,
  },
  {
    name:       'face_clown',
    base:       'clown face',
    position:   0,
  },
  {
    name:       'face_cat',
    base:       'cat face',
    position:   0,
    translate:  [0.06, 0.11],
    scale:      0.88
  },
  {
    name:       'face_woman',
    base:       'woman',
    position:   0,
    translate:  [0.135, 0.25],
    scale:      0.73
  },
  {
    name:       'face_man',
    base:       'man',
    position:   0,
    translate:  [0.085, 0.2],
    scale:      0.83
  },
  {
    name:       'face_baby',
    base:       'baby',
    position:   0,
    translate:  [0.02, 0.07],
    scale:      0.96
  },
  {
    name:       'face_alien',
    base:       'alien face',
    position:   0,
  },

  // { name: 'acc_test' },

  // Eyes

  { name: 'eye_normal'                                                            },
  { name: 'eye_normal_small'                                                      },
  { name: 'eye_grinning_big'                                                      },
  { name: 'eye_beaming',                  adjective: 'happy'                      },
  { name: 'eye_raised'                                                            },
  { name: 'eye_sick',                     adjective: 'sick'                       },
  { name: 'eye_neutral'                                                           },
  { name: 'eye_sleeping',                 adjective: 'sleeping'                   },
  { name: 'eye_squinting',                adjective: 'squinting'                  },

  { name: 'eye_surprised',                adjective: 'surprised'                  },
  { name: 'eye_sad',                      adjective: 'sad'                        },
  { name: 'eye_disappointed',             adjective: 'disappointed'               },
  { name: 'eye_angry',                    adjective: 'angry'                      },
  { name: 'eye_thinking_l',               adjective: 'thinking'                   },
  { name: 'eye_thinking_r',               adjective: 'thinking'                   },
  { name: 'eye_skeptical_l',              adjective: 'skeptical'                  },
  { name: 'eye_skeptical_r',              adjective: 'skeptical'                  },
  { name: 'eye_winking_l',                adjective: 'winking'                    },
  { name: 'eye_winking_r',                adjective: 'winking'                    },

  { name: 'eye_smirking_l',               adjective: 'smirking'                   },
  { name: 'eye_smirking_r',               adjective: 'smirking'                   },
  { name: 'eye_weary',                    adjective: 'weary'                      },
  { name: 'eye_frustrated',               adjective: 'frustrated'                 },
  { name: 'eye_pleased',                  adjective: 'happy'                      },
  { name: 'eye_joy',                      adjective: 'happy'                      },
  { name: 'eye_relieved',                 adjective: 'relieved'                   },
  { name: 'eye_sleepy',                   adjective: 'sleepy'                     },
  { name: 'eye_pensive',                  adjective: 'pensive'                    },

  { name: 'eye_crossed',                  modifier: 'crossed eye'                 },
  { name: 'eye_money',                    modifier: 'money eye'                   },
  { name: 'eye_open',                     modifier: 'open eye'                    },
  { name: 'eye_open_small',               modifier: 'open eye'                    },
  { name: 'eye_open_large',               modifier: 'open eye'                    },
  { name: 'eye_rolling',                  modifier: 'rolling eye'                 },
  { name: 'eye_pleading',                 modifier: 'pleading eye'                },
  { name: 'eye_clown',                    modifier: 'clown eye'                   },

  { name: 'eye_star',                     modifier: 'star eye'                    },
  { name: 'eye_heart',                    modifier: 'heart eye'                   },
  { name: 'eye_alien',                    modifier: 'alien eye'                   },
  { name: 'eye_robot',                    modifier: 'robot eye'                   },

  // Mouths

  { name: 'mouth_smiling',                adjective: 'smiling'                    },
  { name: 'mouth_open_smiling_small',     adjective: 'smiling'                    },
  { name: 'mouth_open_smiling',           adjective: 'smiling'                    },
  { name: 'mouth_grinning',               adjective: 'grinning'                   },
  { name: 'mouth_beaming',                adjective: 'grinning'                   },
  { name: 'mouth_small_raised',           adjective: 'smiling'                    },
  { name: 'mouth_smirking',               adjective: 'smirking'                   },
  { name: 'mouth_wavy',                   modifier: 'wavy mouth'                  },

  { name: 'mouth_grimacing',              adjective: 'grimacing'                  },
  { name: 'mouth_neutral',                adjective: 'neutral'                    },
  { name: 'mouth_neutral_small',          adjective: 'neutral'                    },
  { name: 'mouth_confounded',             adjective: 'confounded'                 },

  { name: 'mouth_thinking',               adjective: 'thinking'                   },
  { name: 'mouth_confused',               adjective: 'confused'                   },
  { name: 'mouth_sad_hanging',            adjective: 'sad'                        },
  { name: 'mouth_unamused',               adjective: 'sad'                        },
  { name: 'mouth_disappointed',           adjective: 'sad'                        },
  { name: 'mouth_sleepy',                 adjective: 'sleepy'                     },
  { name: 'mouth_open_frowning',          adjective: 'sad'                        },
  { name: 'mouth_frowning',               adjective: 'frowning'                   },
  { name: 'mouth_weary',                  adjective: 'weary'                      },

  { name: 'mouth_sleeping',               modifier: 'open mouth'                  },
  { name: 'mouth_open',                   modifier: 'open mouth'                  },
  { name: 'mouth_open_large',             modifier: 'open mouth'                  },
  { name: 'mouth_open_wide',              modifier: 'open mouth'                  },

  { name: 'mouth_kissing',                adjective: 'kissing'                    },
  { name: 'mouth_nerd',                   adjective: 'nerdy'                      },
  { name: 'mouth_drooling',               adjective: 'drooling'                   },
  { name: 'mouth_tongue_sticking_out',    modifier: 'tongue sticking out'         },
  { name: 'mouth_skewed_with_tongue',     modifier: 'tongue sticking out'         },
  { name: 'mouth_tongue_hanging_out',     modifier: 'tongue hanging out'          },
  { name: 'mouth_money',                  modifier: 'money mouth'                 },
  { name: 'mouth_zipper',                 modifier: 'zipper mouth'                },
  { name: 'mouth_alien',                  modifier: 'alien mouth'                 },
  { name: 'mouth_clown',                  modifier: 'clown mouth'                 },
  { name: 'mouth_robot',                  modifier: 'robot mouth'                 },

  // Accessories

  { name: 'acc_blush',                    adjective: 'blushing',  position: 1     },

  { name: 'acc_hand_thinking',            adjective: 'thinking'                   },
  { name: 'acc_hand_covering_lips',       modifier: 'hand covering lips'          },
  { name: 'acc_hand_covering_mouth',      modifier: 'hand covering mouth'         },
  { name: 'acc_hand_hugging',             modifier: 'hugging hand'                },
  { name: 'acc_hand_holding_face',        modifier: 'hand holding face'           },

  { name: 'acc_lying_nose',               adjective: 'lying'                      },
  { name: 'acc_human_nose',                                                       },
  { name: 'acc_clown_nose',                                                       },
  { name: 'acc_robot_nose',                                                       },

  { name: 'acc_sweat',                    adjective: 'sweating'                   },
  { name: 'acc_tear_big',                 adjective: 'crying'                     },
  { name: 'acc_tear',                     adjective: 'crying'                     },
  { name: 'acc_sleepy_tear',              adjective: 'crying'                     },
  { name: 'acc_crying',                   adjective: 'crying'                     },

  { name: 'acc_head_bandage',             modifier: 'head bandage'                },
  { name: 'acc_medical_mask',             modifier: 'medical mask'                },
  { name: 'acc_tissue',                   adjective: 'sneezing'                   },

  { name: 'acc_party_horn',               modifier: 'party horn'                  },
  { name: 'acc_party_hat',                modifier: 'party hat'                   },

  { name: 'acc_glasses',                  modifier: 'glasses'                     },
  { name: 'acc_sunglasses',               modifier: 'sunglasses'                  },
  { name: 'acc_monocle',                  modifier: 'monocle'                     },

  { name: 'acc_blowing_heart',            modifier: 'heart'                       },
  { name: 'acc_steam',                    modifier: 'steam from nose'             },
  { name: 'acc_halo',                     modifier: 'halo'                        },
  { name: 'acc_sleeping',                 adjective: 'sleeping'                   },
  { name: 'acc_swearing',                 adjective: 'swearing'                   },

  { name: 'acc_monkey_hand_see',          adjective: 'see-no-evil'                },
  { name: 'acc_monkey_hand_speak',        adjective: 'speak-no-evil'              },
  { name: 'acc_monkey_hand_hear',         adjective: 'hear-no-evil'               },

];

const assets = rawAssets.map(asset => {
  const category = asset.name.substr(0, asset.name.indexOf('_'))
  const prettyCategory = (category === 'acc') ? 'Accessories' : toTitleCase(category);
  const prettyName = toTitleCase(asset.name.replace('acc_', '').replace(/_/g, ' '));

  return Object.assign(asset, { category, prettyCategory, prettyName });
});

export default assets;