/*
*
* Voicify
*
* A highly efficient and blazing fast Text-To-Speech (TTS) software
*
* @vinoskey524 • Hamet Kévin E. ODOUTAN • vinoskey524@gmail.com (Author)
*
*/

/* ------------------------------- Types ------------------------------- */

type VOICIFY_TYPE = {
    init: (x?: INIT_ARG) => void,

    playerState: () => PLAYER_STATE,
    resume: () => API_RESPONSE_TYPE,
    pause: () => API_RESPONSE_TYPE,
    playPrev: () => API_RESPONSE_TYPE,
    playNext: () => API_RESPONSE_TYPE,
    cancel: () => API_RESPONSE_TYPE,

    showControlPanel: () => void,
    displayNotification: () => void
};

type INIT_ARG = {
    /* - */
    // defaultVoice: 'En' | 'Fr',

    /** TODO :: Default colors for sentences & words - N/A */
    defaultColors: { sentence: string, word: string }

    /** TODO :: Enable/Disable keyboard shortcut - N/A */
    disableShorcut?: boolean,

    /** TODO :: Remap shortcut keys - N/A */
    remapShorcut?: {
        'enable_disable_voicify': null,
        'resume': null,
        'pause': null,
        'playPrev': null,
        'playNext': null,
        'cancel': null
    },

    /** TODO :: Custom Control-Panel UI - N/A */
    customControlPanelUI?: HTMLElement
};

type PLAYER_STATE = 'playing' | 'paused' | 'idle';

type API_RESPONSE_TYPE = { ok: boolean, msg: string | null };

type HOVERED_ELEMENT_TYPE = Element | null;

type TEXT_NODES_TYPE = { [node_id: string]: { originalText: string | null, formattedText: string | null } };

type TLTE_CONTENT_TYPE = 'plain_text' | 'text_with_nested_inline_text_element' | 'text_with_nested_not_inline_text_element';

type ELEMENT_DATA_TYPE = {
    /* eid => Element id */
    [eid: string]: {
        /* Element's type & eid */
        type: 'top_level_text_element' | 'paragraph' | 'sentence' | 'frag' | 'sensor' | null,
        eid: string, /* Element ID (custom) */

        /* For 'top_level_text_element' */
        contentType?: TLTE_CONTENT_TYPE,
        textNodes?: TEXT_NODES_TYPE, /* Original and formatted texts of each text node */
        scannersEid?: Array<'s0' | 's1' | 's2' | string>, /* Eid of scanners it belongs to */
        scrollDirection?: 'all' | 'x' | 'y', /* Scroll direction if scrollable */
        scrollableParentsEid?: string[], /* Scrollable parents eid */
        paragraphsEid?: string[], /* List of paragraphs eid */
        parentScannerId?: 's0' | 's1' | 's2', /* The default scanner the TLTE belongs to | TODO : Must be removed in profit of the futur columns detect feature */
        currentTextType?: 'originalText' | 'formattedText', /* The current type of the text */
        parentsTlteEid?: string[], /* List of parents that are TLTE */

        /* For 'paragraph' */
        tlteEid?: string, /* TLTE eid */
        sentencesEid?: string[], /* List of the eid of sentences belonging to the paragraph */
        sentenceElements?: Element[], /* Sentence elements */
        sensorEid?: string,

        /* For 'sentence' */
        frags?: string[], /* The Fragments of the sentence */
        parentParagraphEid?: string, /* Parent paragraph eid - Used for 'frag' also */
        wordsEid?: string[], /* List of the eid of words belonging to the sentence */
        sentenceText?: string, /* Sentence text */
        wordsIdx?: number[], /* Index of each word */

        /* For 'frag' */
        parentSentenceEid?: string, /* Parent sentence's eid */
        siblingFragsEid?: string[], /* List of eid of the others frags belonging to the same sentence */

        /* For 'sentence' and 'frag' */
        lastMouseEvent?: 'enter' | 'leave', /* Mouse event */

        /* For 'sensor' */
        sensorTlteEid?: string,
        sensorParagraphEid?: string
        sensorOffset?: { x: number, y: number }
    }
};

type KEYS_TYPE = 'cmd' | 'crtl' | 'alt' | 'up' | 'down' | 'left' | 'right' | 'shift' | string | null;

type SPEECH_DATA_TYPE = {
    currentTopLevelTextElementEid: string | null,
    currentParagraphEid: string | null,
    currentSentenceEid: string | null,
    currentWordEid: string | null,

    currentSentenceWordsIdx: number[] | null,

    currentSentenceIdx: number,
    currentWordIdx: number,
    prevWordIdx: number,

    sentenceCount: number,
    wordCount: number,

    playerState: PLAYER_STATE,

    text: string | null,
    rate: number,
    pitch: 1
};

type VOICE_DATA_TYPE = { all: VOICE_TYPE[] | null, default: VOICE_TYPE | null };
type VOICE_TYPE = { voiceURI: string, name: string, lang: string, localService: boolean, default: boolean };

type PARAGRAPH_DATA_TYPE = { [pid: string]: { sentenceCount: number, wordCount: number } };

type SCANNER_PROPS_TYPE = { width: number, height: number, top: number, left: number };
type SCANNER_DATA_TYPE = { [bid: string]: SCANNER_BLOCK_TYPE };
type SCANNER_TYPE = {
    allPoints: { x: number, y: number }[]
    default: { s0: SCANNER_DATA_TYPE, s1: SCANNER_DATA_TYPE, s2: SCANNER_DATA_TYPE },
    custom: { [scannerID: string]: SCANNER_DATA_TYPE }
};
/* - */
type SCANNER_INIT_TYPES_TYPE = 'default' | 'custom';
type SCANNER_INIT_ARG<T extends SCANNER_INIT_TYPES_TYPE> = T extends 'custom' ? [type: T, customScannerProps: SCANNER_PROPS_TYPE] : [type: T];
/* - */
type SCANNER_BLOCK_TYPE = {
    /* Scanner'soffset x & y */
    decalage: { x: number, y: number },
    /* Scanner's grid points offsets */
    points: { x: number, y: number }[],
    /* 
    * Only used for default scanners
    * It's the total number of words containing by each scanner
    */
    score?: number
};

type OFFSET_TYPE = { top: number, left: number, bottom: number, right: number };

type POSITION_TYPE = 'top' | 'left' | 'bottom' | 'right';

type SCREEN_MODE = 'landscape' | 'portrait';

type WIN_DIM_TYPE = { width: number, height: number, mode: SCREEN_MODE };

type SCROLL_DIRECTION_TYPE = 'all' | 'x' | 'y';

type SCANNER_AND_BLOCKS_TYPE = {
    s0?: Array<'b0' | 'b1' | 'b2'>,
    s1?: Array<'b0' | 'b1' | 'b2'>,
    s2?: Array<'b0' | 'b1' | 'b2'>
};

type RENDER_COMPONENT_TYPE = {
    /* Rendering method */
    type: 'append' | 'render_before' | 'render_after' | 'render_at_top_inside' | 'render_at_bottom_inside',
    /* Element into or arround which to render the component  */
    target: Element | string | null,
    /* The component */
    component: Element | null
};

type CALLBACK_TYPE = {
    [id: string]: {
        type: string,
        methods: { [name: string]: Function }
    }
};

type LANGUAGE_TYPE = 'en' | 'fr';

type JSON_BASIC_TYPE = { [key: string]: any };

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* ------------------------------- Shortcuts ------------------------------- */

const $win = window;
const $doc = document;
const $body = $doc.body;
const $html = $doc.documentElement;

/** UI elements */
let $controlPanelWidgetEl: HTMLElement | null = null; /* ControlPanelWidget Element */
let $notificationWidgetEl: HTMLElement | null = null; /* NotificationWidegt Element */
let $voiceContainerEl: HTMLElement | null = null;
let $voiceListEl: HTMLElement | null = null;
let $changeVoiceBtnEl: HTMLElement | null = null;

/*
-
-
-
-
-
*/

/* ------------------------------- Constants ------------------------------- */

/* Activate/Disactivate logs */
const _log_ = true;

/* Turn to true, will quickly display a visual look of the scanner on page load */
const _show_scanner_ = false;

/* - */
const _tag_exclusion_list_ = ['html', 'head', 'header', 'body', 'button', 'voicify-ui', 'v-view', 'v-paragraph', 'v-sentence', 'v-wrap', 'v-frag', 'v-word'];

/* Used as delimiter for sentence */
const _ponctuation_list_ = ['.', '?', '!'];

/*
-
-
-
-
-
*/

/* ------------------------------- Data logistic ------------------------------- */

/** Enable/Disable voicify */
const enable: { current: boolean } = { current: !true };

/** Default language */
const defaultLanguage: { current: LANGUAGE_TYPE } = { current: 'en' };

/** Scanning state */
const isScanning: { current: boolean } = { current: false };

/** Window dimensions */
const winDim: { current: WIN_DIM_TYPE } = {
    current: {
        width: $win.innerWidth, height: $win.innerHeight,
        mode: ($win.innerWidth >= $win.innerHeight) ? 'landscape' : 'portrait'
    }
};

/** Mouse coordinates */
const mouseCoords: { current: { cx: number, cy: number } } = { current: { cx: 0, cy: 0 } };

/** Current key down */
const currentKeyDown: { current: string | null } = { current: null };

/** Element data */
const elementData: { current: ELEMENT_DATA_TYPE } = { current: {} };

/** Current focused element id */
const currentFocusedElementId: { current: string | undefined } = { current: undefined };

/** Voices data */
const voicesData: { current: VOICE_DATA_TYPE } = { current: { all: null, default: null } };

/** Speech data */
const speechData: { current: SPEECH_DATA_TYPE } = {
    current: {
        currentTopLevelTextElementEid: null,
        currentParagraphEid: null,
        currentSentenceEid: null,
        currentWordEid: null,

        currentSentenceWordsIdx: [],

        currentSentenceIdx: 0,
        currentWordIdx: 0,
        prevWordIdx: 0,

        sentenceCount: 0,
        wordCount: 0,

        playerState: 'idle',

        text: null,
        rate: 1,
        pitch: 1
    }
};

/** Paragraph data */
const paragraphData: { current: PARAGRAPH_DATA_TYPE } = { current: {} };

/** Scanner data */
const scannerData: { current: SCANNER_TYPE } = {
    current: {
        allPoints: [],
        default: { s0: {}, s1: {}, s2: {} },
        custom: {}
    }
};

/** Current scanner ID */
const currentScannerId: { current: string | null } = { current: null };

/** Visible Widget */
const visibleWidget: { current: { activationStatus: boolean, controlPanel: boolean } } = {
    current: {
        /** Activation Status Widget */
        activationStatus: false,
        /** Control panel widget */
        controlPanel: false
    }
};

/** Can toggle voicify ? */
const canToggleVoicify: { current: boolean } = { current: true };

/** Can play prev ? */
const canPlayPrev: { current: boolean } = { current: true };

/** Can play next ? */
const canPlayNext: { current: boolean } = { current: true };

/** Callback Handler */
const callbackHandler: { current: CALLBACK_TYPE } = { current: {} };

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* ------------------------------- Custom HTMLElements • Used to avoid user's CSS interferences ------------------------------- */

/** Voicify UI container */
class voicifyUI extends HTMLElement { constructor() { super() } };
/** Just a div with another name */
class view extends HTMLElement { constructor() { super() } };
/** Used to fragment a sentence into different pieces */
class frag extends HTMLElement { constructor() { super() } };
/* Used to wrap a group of frags */
class wrap extends HTMLElement { constructor() { super() } };
/** Custom element to wrap paragraphs */
class paragraph extends HTMLElement { constructor() { super() } };
/** Custom element to wrap sentences */
class sentence extends HTMLElement { constructor() { super() } };
/** Custom element to wrap words */
class word extends HTMLElement { constructor() { super() } };
/** Used for scanning purpose to detect dynamically which paragraph will be read next or prev */
class sensor extends HTMLElement { constructor() { super() } };
/* Define custom elements */
$win.customElements.define('voicify-ui', voicifyUI);
$win.customElements.define('v-view', view);
$win.customElements.define('v-frag', frag);
$win.customElements.define('v-wrap', wrap);
$win.customElements.define('v-paragraph', paragraph);
$win.customElements.define('v-sentence', sentence);
$win.customElements.define('v-word', word);
$win.customElements.define('v-sensor', sensor);

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* ------------------------------- UI Components ------------------------------- */

/** UI components container */
const voicifyUIWidget = $doc.createElement('voicify-ui');
$body.insertAdjacentElement('afterend', voicifyUIWidget);


/** Id generator */
const generateIdFunc = (): string => {
    let id = '', val = '0aW9zXe8CrVt1By5NuA46iZ3oEpRmTlYkUjIhOgPfMdQsSqDwFxGcHvJbKnL';
    for (var i = 0; i < 10; i++) id += val.charAt(Math.floor(Math.random() * 36));
    return id;
};


/** Convert stringified Element into real Element */
const convertToHTMLFunc = (component: string): Element => {
    const div = $doc.createElement('div');
    try {
        div.innerHTML = component;
        return div.children[0] as Element;

    } catch (e: any) {
        logFunc('log', 'convertion failed ::', e.message);
        return div;
    }
};


/** Render component */
const renderComponentFunc = (x: RENDER_COMPONENT_TYPE): boolean => {
    const type = x.type;
    const target = x.target;
    const component = x.component;

    /* - */
    if (!component) return false;

    /* Get target */
    const targ: Element | null =
        target ?
            (typeof target === 'string') ?
                $doc.getElementById(target)
                : target
            : null;

    /* - */
    if (!targ) return false;

    /* Render component */
    switch (type) {
        case 'append': { targ.appendChild(component) } break;
        case 'render_before': { targ.insertAdjacentElement('beforebegin', component) } break;
        case 'render_after': { targ.insertAdjacentElement('afterend', component) } break;
        case 'render_at_top_inside': { targ.insertAdjacentElement('afterbegin', component) } break;
        case 'render_at_bottom_inside': { targ.insertAdjacentElement('beforeend', component) } break;
        default: { };
    };

    /* - */
    return true;
};


/** Template Component */
const TemplateComponent = (props: { id: string, render: Omit<RENDER_COMPONENT_TYPE, 'component'> }): boolean => {
    /* 1. Get props */
    const id = props.id;
    const render = props.render;


    /* 2. Constants & Variables */


    /* 3. Create component */
    const component = convertToHTMLFunc(`<div></div>`);


    /* 4. Render component */
    const hasRender = renderComponentFunc({ type: render.type, target: render.target, component: component });
    if (!hasRender) return false;


    /* 5. Attach events */
    const el = $doc.getElementById(id)!;
    el.addEventListener('click', () => { });


    /* 6. Setup callbacks for remote control */
    callbackHandler.current[id] = {
        type: 'template',
        methods: {}
    };


    /* - */
    return true;
};

/*
*
*
*
*
*
*
*/

/** Notification Widget */
const NotificationWidget = convertToHTMLFunc(`
    <v-view id='nw_scaffold' class='scaffold row_center_all'>
        <v-view id='nw_text'></v-view>
    </v-view>
`);
/*
*
*
* Notification Widget Style
*/
const notificationStyle = `
    #nw_scaffold {
        width: 120px;
        height: auto;
        position: absolute;
        padding-block: 4px;
        padding-inline: 6px;
        top: 0px;
        left: -200px;
    }
    #nw_text {
        width: auto;
        height: auto;
        display: block;
        position: relative;
    }
`;
voicifyUIWidget.insertAdjacentElement('beforeend', NotificationWidget);

/*
*
*
*
*
*
*
*/

/** Control-Panel widget */
const ControlPanelWidget = convertToHTMLFunc(`
    <v-view id='cpw_scaffold' class='column'>
        <v-view id='cpw_header' class='rel column_center_all'>Settings</v-view>
        <v-view id='cpw_option_container' class='rel column_center_x overflow_y'></v-view>

        <v-view id='cpw_voice_container' class='abs'>
            <v-view id='cpw_voice_header' class='rel column_center_all'>Change voice</v-view>
            <v-view id='cpw_voice_list' class='rel column_center_x overflow_y'></v-view>
        </v-view>
    </v-view>
`);
/*
*
*
* Control-Panel Style
*/
const controlPanelStyle = `
    #cpw_scaffold {
        width: 280px;
        height: 380px;
        overflow: hidden;
        position: absolute;
        top: 10px;
        left: -2000px;
        background-color: #373a4d;
        border-radius: 14px;
        border: 1px solid #46464f;
        z-index: 1000000000;
    }

    #cpw_header {
        width: 100%;
        height: 40px;
        background-color: #282a37;
        color: #fff;
        font-weight: bold;
    }    



    #cpw_option_container {
        flex: 1;
        padding-block: 10px;
    }    


    #cpw_voice_container {
        width: 100%;
        height: 100%;
        background-color: #373a4d;
        top: 0px;
        left: 0px;
        transform: translateX(100%);
        z-index: 5;
    }

    #cpw_voice_header {
        width: 100%;
        height: 40px;
        background-color: #282a37;
        color: #fff;
        font-weight: bold;
    }

    #cpw_voice_list {
        flex: 1;
        padding-block: 10px;
    }
`;
/*
*
*
* 
*/
voicifyUIWidget.insertAdjacentElement('beforeend', ControlPanelWidget);

/*
*
*
*
*/

/** Switch Component */
const SwitchComponent = (props: { id: string, enable: boolean, parentElement?: Element | string }) => {
    /* 1. Get props */
    const id = props.id;
    const enable = props.enable;
    const parent = props.parentElement;
    const parentElement: Element | null = parent ?
        (typeof parent === 'string') ? $doc.getElementById(parent) : parent
        : null;


    /* 2. Constants & Variables */
    const switchId = generateIdFunc();
    let switchEl: Element | null = null;


    /* 3. Create component */
    const component = convertToHTMLFunc(`
        <v-view id='' class='sw_scaffold row_center_y'>
            <v-view class='sw_ball'></v-view>
        </v-view>
    `);


    /* 4. Render component */
    const containerEl = $doc.getElementById('cpw_option_container')!;
    containerEl.appendChild(component);


    /* 5. Attach events */
    // const el = $doc.getElementById(id)!;
    // el.addEventListener('click', () => { });


    /* 6. Setup callbacks for remote control */
    callbackHandler.current[id] = {
        type: 'switchComponent',
        methods: {
            toggleFunc: (enable: boolean) => { }
        }
    };
};

/*
*
*
* Switch Style
*/
const switchStyle = `
    .sw_scaffold {
        width: 30px;
        height: 15px;
        background-color: #6e6e6e;
        border-radius: 20px;
    }

    .sw_ball {
        width: 14px;
        height: 14px;
        border-radius: 100px;
        background-color: #fff; 
    }
`;

/*
*
*
*
*
*
*
*/

/** Control-Panel Menu Component */
const ControlPanelMenuComponent = (props: { id: 'change_voice_btn' | 'continuous_reading_btn' | 'enable_voicify_btn', title: string, description?: string, useSwitch?: boolean }) => {
    /* 1. Get props */
    const id = props.id;
    const title = props.title;
    const description = props.description;
    const useSwitch = props.useSwitch;


    /* 2. Constants & Variables */
    const switchId = generateIdFunc();
    let switchEl: Element | null = null;


    /* 3. Create component */
    const component = convertToHTMLFunc(`
        <v-view id='${id}' class='cpmw_scaffold rel row'>
            <v-view class='cpmw_container rel column_center_y'>
                <v-view class='cpmw_title'>${title}</v-view>
                <v-view class='cpmw_desc'>${description}</v-view>
            </v-view>
            // ${useSwitch ? SwitchComponent({ id: switchId, enable: false }) : ''}
        </v-view>
    `);


    /* 4. Render component */
    const containerEl = $doc.getElementById('cpw_option_container')!;
    containerEl.appendChild(component);


    /* 5. Attach events */
    const el = $doc.getElementById(id)!;
    el.addEventListener('click', () => {
        switch (id) {
            case 'change_voice_btn': {
                UIscripts.showVoicesList(true);
            } break;

            case 'continuous_reading_btn': {
                if (!switchEl) switchEl = $doc.getElementById(switchId);
            } break;

            case 'enable_voicify_btn': { } break;

            default: { };
        };
    });


    /* 6. Setup callbacks for remote control */
    callbackHandler.current[id] = {
        type: 'switchWidge',
        methods: {
            toggleFunc: (enable: boolean) => { }
        }
    };
};
/* 
*
*
* Control-Panel Menu Style
*/
const controlPanelMenuStyle = `
    .cpmw_scaffold {
        width: 90%;
        height: auto;
        padding-block: 8px;
        padding-inline: 6px;
        border-radius: 6px;
        margin-bottom: 12px;
        border-radius: 8px;
    }

    .cpmw_scaffold:hover {
        background-color: rgba(104, 106, 121, 0.4);
    }

    .cpmw_container {
        flex: 1;
    }

    .cpmw_title {
        width: auto;
        height: auto;
        color: #fff;
        font-size: 14px;
    }

    .cpmw_desc {
        width: auto;
        height: auto;
        color: #9e9e9e;
        font-size: 14px;
        margin-top: 6px;
    }

    .cpmw_bar {
        width: 80px;
        height: 1px;
        background-color: #1f1f1f;
    }
`;
/* 
*
*
* Render Menu
*/
const menuList = [
    {
        id: 'change_voice_btn',
        title: 'Change voice',
        description: `Disable to read only the clicked pragraph`,
    },
    {
        id: 'enable_voicify_btn',
        title: 'Enable Voicify',
        description: `Switch to enable/disable voicify`,
        useSwitch: true,
    },
    {
        id: 'continuous_reading_btn',
        title: 'Continuous reading',
        description: `Disable to read the clicked paragraph only`,
        useSwitch: true,
    }
];
menuList.forEach((e: any) => ControlPanelMenuComponent(e));

/*
*
*
*
*
*
*
*/

/** Voice Widget */
const VoiceWidget = (props: { id: string, data: VOICE_TYPE }): void => {
    /* 1. Get props */
    const id = props.id;
    const data = props.data;

    /* 2. Constants & Variables */

    /* 3. Create widget */
    const widget = convertToHTMLFunc(`
        <v-view id='${id}' class='vw_scaffold'>
            <v-view class=''></v-view>
        </v-view>
    `);

    /* 4. Render widget */
    $voiceListEl!.appendChild(widget);

    /* 5. Attach events */
    const el = $doc.getElementById(id)!;
    el.addEventListener('click', () => {
        console.log(data);
    });
};
/*
*
*
* Voice style
*/
const voiceStyle = `
    .vw_scaffold {
        width: 90%;
        height: 40px;
        background-color: red; 
        border-radius: 6px;
        margin-bottom: 10px;
    }
`;

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* ------------------------------- Styles • Pure CSS ------------------------------- */

/* "voicify-ui" style */
const voicifyStyle = `
    voicify-ui {
        width: 0px;
        height: 0px;
        overflow: visible;
        position: absolute;
        top: 0px;
        left: 0px;
        font-size: 14px !important;
        border-box: box-sizing;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        scrollbar-gutter: stable both-edges;
        scrollbar-width: 1px;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: default;
        text-shadow: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }
`;

/* "v-view" style */
const viewStyle = `
    v-view {
        border-box: box-sizing;
        color: #fff;
        cursor: default;
    }
`;

/* "v-frag" style */
const fragStyle = `
    v-frag {
        display: inline;
        border-box: box-sizing;
        margin: 0px;
        cursor: default;
    }
    v-frag:hover {
        background-color: #042B59 !important;
        color: #fff !important;
        text-shadow: rgba(0, 0, 0, 0.4) !important;
    }
    .frag_selected {
        background-color: #042B59 !important;
        color: #fff !important;
        text-shadow: rgba(0, 0, 0, 0.4) !important;
    }
`;

/* "v-wrap" style */
const wrapStyle = `
    v-wrap {
        display: inline;
        border-box: box-sizing;
        margin: 0px;
        cursor: default;
    }
`;

/* "v-sentence" style */
const sentenceStyle = `
    v-sentence {
        display: inline;
        border-box: box-sizing;
        margin: 0px;
        cursor: default;
    }
    v-sentence:hover {
        background-color: #042B59 !important;
        color: #fff !important;
        text-shadow: rgba(0, 0, 0, 0.4) !important;
    }
    .sentence_selected {
        background-color: #042B59 !important;
        color: #fff !important;
        text-shadow: rgba(0, 0, 0, 0.4) !important;
    }
`;

/* "v-word" style */
const wordStyle = `
    v-word {
        display: inline;
        border-box: box-sizing;
        cursor: default;
    }
    v-word:hover {
        border-radius: 4px;
        background-color: #007aff;
        color: #fff !important;
        text-shadow: rgba(0, 0, 0, 0.4);
    }
    .word_selected {
        border-radius: 4px !important;
        background-color: #007aff !important;
        color: #fff !important;
        text-shadow: rgba(0, 0, 0, 0.4) !important;
    }
`;

/* Other */
const otherStyles = `
    .scaffold {
        background-color:rgba(29, 33, 38, 0.5);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 20px;
        border: 1px solid #474A4E;
    }

    .rel {
        position: relative;
    } 

    .abs {
        position: absolute;
    } 

    .no_overflow {
        overflow: hidden;
    }

    .overflow_x {
        overflow-x: auto;
        overflow-y: hidden;
    }

    .overflow_y {
        overflow-x: hidden;
        overflow-y: auto;
    }

    .column {
        display: flex;
        flex-direction: column;
    }

    .column_center_all {
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .column_center_x {
        flex-direction: column;
        display: flex;
        align-items: center;
    }

    .column_center_y {
        flex-direction: column;
        display: flex;
        justify-content: center;
    }

    .row {
        display: flex;
        flex-direction: row;
    }

    .row_center_all {
        flex-direction: row;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .row_center_x {
        flex-direction: row;
        display: flex;
        justify-content: center;
    }

    .row_center_y {
        flex-direction: row;
        display: flex;
        align-items: center;
    }
`;

/* Apply styles */
const style = $doc.createElement('style');
style.textContent = voicifyStyle + viewStyle + fragStyle +
    wrapStyle + sentenceStyle + wordStyle +
    notificationStyle + controlPanelMenuStyle + controlPanelStyle +
    switchStyle + voiceStyle + otherStyles;
$doc.head.appendChild(style);

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* ------------------------------- Methods ------------------------------- */

/** Align text element vertically */
const alignTextVerticallyFunc = (el: Element): void => {
    try {
        if (!el) return;
        const eid = (el as HTMLElement).dataset.eid;
        if (!eid) return;
        const rect = el.getBoundingClientRect();

        const parentParagraphEid = elementData.current[eid].parentParagraphEid; /* Parent paragraph eid */
        const tlteEid = elementData.current[parentParagraphEid!].tlteEid; /* TLTE eid */

        /* Get scrollable parents */
        const scrollableParentsEid = elementData.current[tlteEid!].scrollableParentsEid;
        const isHtmlScrollable = isHtmlElementScrollableFunc();
        if ((!scrollableParentsEid || scrollableParentsEid.length === 0) && !isHtmlScrollable) return;

        const top = Math.abs(rect.top); /* Element offset top */
        const wheight = $win.innerHeight;
        let wh = wheight / 3.5;
        if (rect.top < wheight) wh = wheight / 2.5;

        /* Center vertically */
        const parentEid = isHtmlScrollable ? null : scrollableParentsEid![0];
        const parentEl = isHtmlScrollable ? $html : selectElementFunc(parentEid!);
        if (parentEl) parentEl.scrollTo({ top: parentEl.scrollTop + (top - wh), behavior: 'smooth' }); /* TODO :: correct top */
        scanner.scan(); /* scan */

    } catch (e: any) {
        logFunc('error', 'Err :: [alignTextVerticallyFunc] =>', e.message);
    }
};


// /** Activate sensor */
// const activateSensorFunc = (eid: string): void => {
//     try {
//         const func = () => {
//             /* Get sensor element */
//             const sensorEl = selectElementFunc(eid) as HTMLElement;
//             if (!sensorEl) return;

//             /* Get TLTE eid and element */
//             const tlteEid = elementData.current[eid].sensorTlteEid!;
//             const tlteEl = selectElementFunc(tlteEid);
//             if (!tlteEl) return;

//             /* - */
//             const ctype = elementData.current[tlteEid].contentType;
//             if (ctype === 'text_with_nested_not_inline_text_element') { }
//             else {
//                 /* Get TLTE offset */
//                 const { x, y } = tlteEl.getBoundingClientRect();
//                 const tlteStyle = $win.getComputedStyle(tlteEl);

//                 /* Get TLTE padding top & left */
//                 const tltePaddingTop = parseFloat(tlteStyle.paddingTop);
//                 const tltePaddingLeft = parseFloat(tlteStyle.paddingLeft);

//                 /* Update sensor positioon */
//                 sensorEl.style.position = 'absolute';
//                 sensorEl.style.left = x + (tltePaddingLeft > 0 ? tltePaddingLeft : 0) + 'px';
//                 sensorEl.style.top = y + (tltePaddingTop > 0 ? tltePaddingTop : 0) + 'px';
//                 elementData.current[eid].sensorOffset = { x, y };

//                 /* Get sensor & speech data */
//                 const sensorData = elementData.current[eid];
//                 const data = speechData.current;

//                 // /* If speaker is 'playing' or 'paused' & the current paragraph is not the paragraph of this sensor */
//                 // if ((data.playerState !== 'idle') && (data.currentParagraphEid !== sensorData.sensorParagraphEid)) {
//                 //     const currentParagraphEid = data.currentParagraphEid;
//                 //     if (!currentParagraphEid) return;

//                 //     /* Current paragraph sensor eid */
//                 //     const currentParagraphSensorEid = elementData.current[currentParagraphEid].sensorEid;
//                 // }
//             }
//         };
//         requestAnimationFrame(func);

//     } catch (e: any) {
//         logFunc('log', 'Err :: [activateSenseorFunc] =>', e.message);
//     }
// };

/*
*
*
*
*
*
*/

/** Correct 'charIndex' onBoundary */
const correctCharIndexOnBoundaryFunc = (x: { text: string, charIndex: number, prevWordIndex: number | null, wordsIndexTab: number[] }): number | null => {
    const text = x.text;
    const charIndex = x.charIndex;
    const prevWordIndex = x.prevWordIndex;
    const wordsIndexTab = x.wordsIndexTab;

    /* Get portion */
    const indexBeforeCharIndex = wordsIndexTab[prevWordIndex || 0];
    const indexAfterCharIndex = wordsIndexTab.filter((e) => e > charIndex)[0] || undefined;
    const tab = text.slice(indexBeforeCharIndex, indexAfterCharIndex).trim().split(' ');
    const portion = tab[1];

    /* - */
    if (hasAlphaNumCharFunc(portion)) return indexBeforeCharIndex + tab[0].length + 1;
    return null;
};

/*
*
*
*
*
*
*/

/** Delay function execution */
const delayFunc = (): Promise<void> => { return new Promise(resolve => setTimeout(resolve, 1)) };


/* Disable current sentence highlight */
const disableCurrentSentenceHighlightFunc = (speechData: SPEECH_DATA_TYPE) => {
    try {
        const data = speechData;
        if (data.currentTopLevelTextElementEid === null) return;

        /* Disable current word highlighting */
        const wel = selectElementFunc(data.currentWordEid!);
        if (wel) wel.removeAttribute('class');

        /* Disable current sentence highlighting */
        /* If fragmented */
        const isFragmented = isFragmentedSentenceFunc(data.currentSentenceEid!);
        if (isFragmented) {
            const frags = elementData.current[data.currentSentenceEid!].frags!;
            const firstFragEl = selectElementFunc(frags[0])!;
            highlightFragsFunc(firstFragEl as HTMLElement, false);
        }
        /* If not fragmented */
        else {
            const sel = selectElementFunc(data.currentSentenceEid!); /* Current sentence element */
            if (sel) sel.removeAttribute('class');
        }

    } catch (e: any) {
        logFunc('error', 'Err :: [disableCurrentSentenceHighlightFunc] =>', e.message);
    }
};


/** Dectect scrollable parents */
const detectScrollableParentsFunc = (originalElement: HTMLElement, originalElementId: string, currentElement?: HTMLElement | null) => {
    try {
        const oel = originalElement;
        const oeid = originalElementId;
        const cel = currentElement;

        const parent = (cel || oel).parentElement; /* Get element's parent */
        if (!parent) return; /* Stop function if no parent found */

        const scrollDir = isScrollableElementFunc(parent);
        if (!scrollDir) {
            detectScrollableParentsFunc(oel, oeid, parent); /* Recurse - Check next parent */
            return;
        }

        /* Get parent eid or generate a new one */
        let parentEid = parent.dataset.eid || generateIdFunc();

        /* Set parent eid */
        if (elementData.current[oeid].scrollableParentsEid) elementData.current[oeid].scrollableParentsEid.push(parentEid);
        else elementData.current[oeid].scrollableParentsEid = [parentEid];

        /* Recurse - Check next parent */
        // detectScrollableParentsFunc(oel, oeid, parent);

    } catch (e: any) {
        logFunc('error', 'Err :: [detectScrollableParentsFunc] =>', e.message);
    }
};


/** Detect parent scanner */
const detectParentScannerFunc = (el: HTMLElement): 's0' | 's1' | 's2' => {
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const left = rect.left;

    /* TLTE range */
    const target = { left: left, end: left + width };

    /* Scanners range */
    const wd3 = $win.innerWidth / 3;
    const s0 = { left: 0, end: wd3 };
    const s1 = { left: wd3, end: (wd3 * 2) };
    const s2 = { left: (wd3 * 2), end: $win.innerWidth };

    /* Parent scanner Id - 's0'(left) | 's1'(center) | 's2'(right) */
    let scannerId: 's0' | 's1' | 's2' = 's0';

    /* s0 */
    if (target.end <= s0.end) scannerId = 's0';
    /* s0 - s1 */
    else if (target.left < s1.left && target.end > s1.left) {
        const partInS0 = s0.end - target.left;
        const partInS1 = target.end - s1.left;
        scannerId = partInS0 <= partInS1 ? 's1' : 's0';
    }
    /* s1 */
    else if (target.left >= s1.left && target.end <= s1.end) scannerId = 's1';
    /* s1 - s2 */
    else if (target.left < s2.left && target.end > s2.left) {
        const partInS1 = s1.end - target.left;
        const partInS2 = target.end - s2.left;
        scannerId = partInS2 <= partInS1 ? 's1' : 's2';
    }
    /* s2 */
    else if (target.left > s2.left) scannerId = 's2';

    /* return */
    return scannerId;
};


/** Display notification */
const displayNotificationFunc = (state: 'ON' | 'OFF'): void => {
    visibleWidget.current.activationStatus = true;

    $notificationWidgetEl!.children[0].textContent = `Voicify is ${state}`;
    $notificationWidgetEl!.style.opacity = 1 + 'px';
    $notificationWidgetEl!.style.left = (mouseCoords.current.cx + 20) + 'px';
    $notificationWidgetEl!.style.top = (mouseCoords.current.cy - 10) + 'px';

    /* Hide again after 1s */
    setTimeout(() => {
        $notificationWidgetEl!.children[0].textContent = 'Voicify is OFF';
        $notificationWidgetEl!.style.opacity = 0 + 'px';
        $notificationWidgetEl!.style.left = -200 + 'px';
        $notificationWidgetEl!.style.top = 0 + 'px';
        visibleWidget.current.activationStatus = false;
    }, 1000);
};

/*
*
*
*
*
*
*
*/

/** Render formattedText for all parent TLTE with 'text_with_nested_not_inline_text_element' */
const formatParentTlteFunc = (eid: string, parentEl?: Element): void => {
    try {
        const el = parentEl ? null : selectElementFunc(eid);
        if (!parentEl && !el) return;

        /* Get parent element */
        const currentParentEl = parentEl ? parentEl.parentElement : el!.parentElement;
        if (!currentParentEl || currentParentEl.tagName.toLowerCase() === 'body') return;

        /* Get parent eid */
        const parentEid = (currentParentEl as HTMLElement).dataset.eid || null;
        if (!parentEid) {
            formatParentTlteFunc(eid, currentParentEl);
            return;
        }

        /* Check element type */
        const type = elementData.current[parentEid]?.type;
        if (!type) {
            formatParentTlteFunc(eid, currentParentEl);
            return;
        }

        /* Get element content type */
        const ctype = elementData.current[parentEid].contentType;
        if (type === 'top_level_text_element' && ctype === 'text_with_nested_not_inline_text_element') {
            const currentTextType = elementData.current[parentEid].currentTextType;
            if (currentTextType !== 'formattedText') transformTextNodesFunc(currentParentEl, 'formattedText');

            /* Add parent TLTE eid */
            const arr = elementData.current[eid].parentsTlteEid;
            if (!arr) elementData.current[eid].parentsTlteEid = [];
            if (elementData.current[eid].parentsTlteEid!.indexOf(parentEid) === -1) elementData.current[eid].parentsTlteEid!.push(parentEid);
        }

        /* Process next parent */
        formatParentTlteFunc(eid, currentParentEl);
        return;

    } catch (e: any) {
        logFunc('log', 'Err :: [formatParentTlteFunc] =>', e.message);
    }
};


/** Format TLTE containing only plain text */
const formatPlainTextFunc = (x: { eid: string, el: Element }) => {
    try {
        const eid = x.eid;
        const el = x.el;

        /* Extract and set original text */
        const text = el.textContent!.trim();
        elementData.current[eid].textNodes = { '0': { originalText: text, formattedText: '' } };

        /* Format text */
        const tab = text.split(' ');
        const tlen = tab.length;
        let sentencesEid: string[] = [];
        for (let i = 0; i < tlen; i++) {
            const currentWord = tab[i].trim();
            const wlen = currentWord.length;
            if (wlen === 0) continue; /* Skip empty entries */

            /* - */
            const isLastWord = tab.slice(i).join('').trim() === currentWord.trim();
            let sentenceEid = generateIdFunc();
            let wordEid = generateIdFunc();

            const nextWord = tab[i + 1];
            const isNextWordFirstCharLowercase = typeof nextWord === 'string' && nextWord.length > 0 ? /^[a-z]+$/.test(nextWord.trim().split('')[0]) : false;
            const hasPonctuation = hasPonctuationFunc(currentWord) && !isNextWordFirstCharLowercase;

            tab[i] =
                hasPonctuation ?
                    (wlen === 1) ?
                        currentWord
                        : `<v-word data-eid='${wordEid}'>${currentWord}</v-word>${!isLastWord ? `</v-sentence><v-sentence data-eid='${sentenceEid}'>` : ``}`
                    : `<v-word data-eid='${wordEid}'>${currentWord}</v-word>`;

            /* Add sentence eid */
            if (hasPonctuation && !isLastWord) sentencesEid.push(sentenceEid);;
        }

        /* Set formatted text */
        const peid = generateIdFunc();
        const seid = generateIdFunc();
        const formattedText: string = `<v-paragraph data-eid='${peid}'><v-sentence data-eid='${seid}'>${tab.join(' ')}</v-sentence></v-paragraph>`;

        /* Add each sentence to 'elementData' */
        sentencesEid = [seid, ...sentencesEid];
        sentencesEid.forEach((e) => {
            elementData.current[e] = { type: 'sentence', eid: e, parentParagraphEid: peid };
        });

        /* Add paragraph to 'elementData' */
        elementData.current[peid] = { type: 'paragraph', eid: peid, sentencesEid: sentencesEid, tlteEid: eid };

        /* Add TLTE to 'elementData' */
        elementData.current[eid].textNodes['0'].formattedText = formattedText;
        elementData.current[eid].paragraphsEid = [peid];

        // /* Attach sensor */
        // const sensorEid = generateIdFunc();
        // const sensorEl = convertToHTMLFunc(`<v-sensor data-eid='${sensorEid}'></v-sensor>`);
        // const tlteEl = selectElementFunc(eid)!;
        // tlteEl.insertAdjacentElement('beforebegin', sensorEl);
        // elementData.current[sensorEid] = {
        //     type: 'sensor',
        //     eid: sensorEid,
        //     sensorParagraphEid: peid,
        //     sensorTlteEid: eid
        // };

        // /* Set sensor eid to paragraph */
        // elementData.current[peid].sensorEid = sensorEid;

        // /* Activate sensor */
        // activateSensorFunc(sensorEid);

    } catch (e: any) {
        logFunc('log', 'Err :: [formatPlainTextFunc] =>', e.message);
    }
};


/** Format TLTE with nested inline element */
const formatTextWithNestedInlineElementFunc = (x: { eid: string, el: Element, data?: JSON_BASIC_TYPE, fragStr?: { val: string }, recurse?: boolean }): void => {
    try {
        const eid = x.eid; /* TLT eid */
        const el = x.el as HTMLElement;
        const nodes = x.el.childNodes;

        const nl = nodes.length;
        if (nl === 0) return;

        // const lastNode = nodes[nl - 1];
        // const lastNodeType = (lastNode.nodeName === '#text') ? (lastNode.textContent!.trim().length > 0) ? 'text' : null : 'element';

        let finalData: TEXT_NODES_TYPE = {};
        let recursive = x.recurse || false;
        let fragString: { val: string } = { val: '' };

        /* Process each node */
        for (let i = 0; i < nl; i++) {
            const cnode = nodes[i] as Element; /* Current node */
            if (!isValidElementFunc(cnode)) continue;

            const ntype = getNodeTypeFunc(cnode); /* Check if it's a "pure text" or an "element" */
            const nodeIndex = i;
            // const isLastNode = i === (nl - (lastNodeType === null ? 2 : 1));

            /* - */
            switch (ntype) {
                /* If current node is a pure text */
                case 'text': {
                    const txt = cnode.textContent!;
                    if (txt.trim().length === 0) continue; /* Jump to next node if current text node is empty */

                    const tab = txt.split(' ');
                    const tlen = tab.length;

                    let fstring: string = '';
                    const fragEid = generateIdFunc();

                    /* Wrap each word */
                    for (let n = 0; n < tlen; n++) {
                        const currentWord = tab[n];
                        if (currentWord.trim().length === 0) continue; /* Jump to next word if current word is empty */

                        const wlen = currentWord.length;
                        const isFirstWord = n === 0;
                        const isLastWord = tab.slice(n).join('').trim() === currentWord.trim();

                        const wordEid = generateIdFunc();
                        const frag2Eid = generateIdFunc();

                        const nextWord = tab[i + 1];
                        const isNextWordFirstCharLowercase = typeof nextWord === 'string' && nextWord.length > 0 ? /^[a-z]+$/.test(nextWord.trim().split('')[0]) : false;
                        const hasPonctuation = hasPonctuationFunc(currentWord) && !isNextWordFirstCharLowercase;

                        tab[n] =
                            hasPonctuation ?
                                (wlen === 1) ?
                                    isFirstWord ?
                                        `${currentWord}</v-frag><v-frag data-eid='${frag2Eid}'>`
                                        : currentWord
                                    : `<v-word data-eid='${wordEid}'>${currentWord}</v-word>${!isLastWord ? `</v-frag><v-frag data-eid='${frag2Eid}'>` : ``}`
                                : `<v-word data-eid='${wordEid}'>${currentWord}</v-word>`;


                        /* 
                        * Collect frags eid 
                        * '.' are used to delimitate sentences 
                        */
                        if (hasPonctuation) fstring += (!isLastWord || isFirstWord) ? ('.' + frag2Eid) : '.';
                    }

                    /* Add the eid of the first frag in the node */
                    fstring = fragEid + fstring;

                    /* 
                    * Merge the eid of all frags of all text nodes as a single string 
                    * '_' are used to join frags belonging the same sentence 
                    */
                    if (recursive) x.fragStr!.val += (x.fragStr!.val.length > 0) ? ('_' + fstring) : fstring;
                    else fragString.val += (fragString.val.length > 0) ? ('_' + fstring) : fstring;

                    /* Prepare formatted text */
                    const frag = `<v-frag data-eid='${fragEid}'>${tab.join(' ')}</v-frag>`;
                    const ocount = getOccurencesFunc({ text: frag, target: 'v-frag' }); /* Get the number of fragments */
                    const formattedText = (ocount > 2) ? `<v-wrap>${frag}</v-wrap>` : frag; /* If there's more than 1 frgament, then wrap all of them */

                    /* Set original & formatted texts to finalData */
                    finalData[nodeIndex] = { originalText: txt, formattedText: formattedText };

                    /* If processing a nested text element */
                    if (recursive) {
                        /* Set an eid to the nested text element if necessary */
                        let nestedElementEid = el.dataset.eid;
                        if (!nestedElementEid) {
                            nestedElementEid = generateIdFunc();
                            el.dataset.eid = nestedElementEid;
                        }
                        /* Add the finalData of the nested text element to the finalData of the TLTE */
                        x.data![nestedElementEid] = finalData;
                    }
                } break;

                /* If current node is an element */
                case 'element': {
                    formatTextWithNestedInlineElementFunc({
                        eid: eid,
                        el: cnode,
                        data: recursive ? x.data! : finalData, /* If recursive, send the ref of the "finalData" of the TLTE */
                        fragStr: recursive ? x.fragStr! : fragString,
                        recurse: true
                    });
                } break;

                /* - */
                default: { };
            };
        }

        /* If it's the TLTE */
        if (!recursive) {
            const peid = generateIdFunc(); /* Paragraph Eid */
            const sentencesData: { index: number, eid: string, frags: string[] }[] = [];

            /* Process frags & create sentences */
            const ftab = fragString.val.split('.');
            for (let s = 0; s < ftab.length; s++) {
                const sid = generateIdFunc(); /* Current sentence Eid */
                const frags: string[] = ftab[s].split('_'); /* Current sentence frags */

                /* Remove empty entries */
                frags.forEach((x: string, i: number) => { if (x.trim().length === 0) frags.splice(i, 1) });
                if (frags.length === 0) continue;

                /* Process frags */
                for (let f = 0; f < frags.length; f++) {
                    const cfragEid = frags[f]; /* Current frag Eid */
                    /* Add frag to 'elementData' */
                    // const siblingFrags = frags.filter((e: string) => e !== cfragEid);
                    elementData.current[cfragEid] = {
                        type: 'frag',
                        eid: cfragEid,
                        parentParagraphEid: peid,
                        parentSentenceEid: sid,
                        siblingFragsEid: frags
                    };
                }

                /* Set current sentence 'index', 'eid' and 'frags' */
                sentencesData.push({ index: s, eid: sid, frags: frags });
            }

            /* Add sentences to 'elementData' */
            sentencesData.sort((a: any, b: any) => a.index - b.index);
            const stab: string[] = []; /* List of sentence eid */
            for (let k = 0; k < sentencesData.length; k++) {
                const sentence = sentencesData[k]; /* Current sentence */
                const seid = sentence.eid;

                /* Add sentence */
                stab.push(seid);

                /* - */
                elementData.current[seid] = { type: 'sentence', eid: seid, parentParagraphEid: peid, frags: sentence.frags };
            }

            /* Add paragraph to 'elementData' */
            elementData.current[peid] = { type: 'paragraph', eid: peid, sentencesEid: stab, tlteEid: eid };

            /* Add TLTE to 'elementData' */
            elementData.current[eid].textNodes = finalData;
            elementData.current[eid].paragraphsEid = [peid];

            // /* Attach sensor */
            // const sensorEid = generateIdFunc();
            // const sensorEl = convertToHTMLFunc(`<v-sensor data-eid='${sensorEid}'></v-sensor>`);
            // const tlteEl = selectElementFunc(eid)!;
            // tlteEl.insertAdjacentElement('beforebegin', sensorEl);
            // elementData.current[sensorEid] = {
            //     type: 'sensor',
            //     eid: sensorEid,
            //     sensorParagraphEid: peid,
            //     sensorTlteEid: eid
            // };

            // /* Set sensor eid to paragraph */
            // elementData.current[peid].sensorEid = sensorEid;

            // /* Activate sensor */
            // activateSensorFunc(sensorEid);
        }

    } catch (e: any) {
        logFunc('log', 'Err :: [formatTextWithNestedInlineElementFunc] =>', e.message);
    }
};


/** Format TLTE with nested NOT inline element */
const formatTextWithNestedNotInlineElementFunc = (x: { eid: string, el: Element, data?: JSON_BASIC_TYPE, fragStr?: { val: string }, recurse?: boolean }): void => {
    try {
        const eid = x.eid;
        const el = x.el as HTMLElement;
        const nodes = x.el.childNodes;

        const nl = nodes.length;
        if (nl === 0) return;

        // const lastNode = nodes[nl - 1];
        // const lastNodeType = (lastNode.nodeName === '#text') ? (lastNode.textContent!.trim().length > 0) ? 'text' : null : 'element';

        let finalData: TEXT_NODES_TYPE = {};
        let recursive = x.recurse || false;
        let fragString: { val: string } = { val: '' };

        const nodesTab: Element[] = [];
        let canPushNode = true;

        /* Process each node */
        for (let i = 0; i < nl; i++) {
            const cnode = nodes[i] as Element; /* Current node */
            const ntype = getNodeTypeFunc(cnode); /* Check if it's a "pure text" or an "element" */

            const nodeIndex = i;
            // const isLastNode = i === (nl - (lastNodeType === null ? 2 : 1));

            /* Collect node per paragraph */
            if (canPushNode) {
                nodesTab.push(cnode);
                canPushNode = false;
            }

            /* - */
            switch (ntype) {
                /* If current node is a pure text */
                case 'text': {
                    const txt = cnode.textContent!;
                    if (txt.trim().length === 0) continue; /* Jump to next node if current text node is empty */

                    const tab = txt.split(' ');
                    const tlen = tab.length;

                    let fstring: string = '';
                    const fragEid = generateIdFunc();

                    /* Wrap each word */
                    for (let n = 0; n < tlen; n++) {
                        const currentWord = tab[n];
                        if (currentWord.trim().length === 0) continue; /* Jump to next word if current word is empty */

                        const wlen = currentWord.length;
                        const isFirstWord = n === 0;
                        const isLastWord = tab.slice(n).join('').trim() === currentWord.trim();

                        const wordEid = generateIdFunc();
                        const frag2Eid = generateIdFunc();

                        const nextWord = tab[i + 1];
                        const isNextWordFirstCharLowercase = typeof nextWord === 'string' && nextWord.length > 0 ? /^[a-z]+$/.test(nextWord.trim().split('')[0]) : false;
                        const hasPonctuation = hasPonctuationFunc(currentWord) && !isNextWordFirstCharLowercase;

                        tab[n] =
                            hasPonctuation ?
                                (wlen === 1) ?
                                    isFirstWord ?
                                        `${currentWord}</v-frag><v-frag data-eid='${frag2Eid}'>`
                                        : currentWord
                                    : `<v-word data-eid='${wordEid}'>${currentWord}</v-word>${!isLastWord ? `</v-frag><v-frag data-eid='${frag2Eid}'>` : ``}`
                                : `<v-word data-eid='${wordEid}'>${currentWord}</v-word>`;

                        /* 
                        * Collect frags eid
                        * '.' are used to delimitate sentences 
                        */
                        if (hasPonctuation) fstring += (!isLastWord || isFirstWord) ? ('.' + frag2Eid) : '.';
                    }

                    /* Add the eid of the first frag in the node */
                    fstring = fragEid + fstring;

                    /* 
                    * Merge the eid of all frags of all text nodes as a single string 
                    * '_' are used to join frags belonging the same sentence 
                    */
                    if (recursive) x.fragStr!.val += (x.fragStr!.val.length > 0) ? ('_' + fstring) : fstring;
                    else fragString.val += (fragString.val.length > 0) ? ('_' + fstring) : fstring;

                    /* Prepare formatted text */
                    const frag = `<v-frag data-eid='${fragEid}'>${tab.join(' ')}</v-frag>`;
                    const ocount = getOccurencesFunc({ text: frag, target: 'v-frag' }); /* Get the number of fragments */
                    const formattedText = (ocount > 2) ? `<v-wrap>${frag}</v-wrap>` : frag; /* If there's more than 1 frgament, then wrap all of them */

                    /* Set original & formatted texts to finalData */
                    finalData[nodeIndex] = { originalText: txt, formattedText: formattedText };

                    /* If processing a nested text element */
                    if (recursive) {
                        /* Set an eid to the nested text element if necessary */
                        let nestedElementEid = el.dataset.eid;
                        if (!nestedElementEid) {
                            nestedElementEid = generateIdFunc();
                            el.dataset.eid = nestedElementEid;
                        }
                        /* Add the finalData of the nested text element to the finalData of the TLTE */
                        x.data![nestedElementEid] = finalData;
                    }
                } break;

                /* If current node is an element */
                case 'element': {
                    const element = cnode as HTMLElement;
                    if (!element || !isValidElementFunc(element)) continue;

                    const isTopLevel = !element.dataset?.eid ? false : elementData.current[element.dataset.eid]?.type === 'top_level_text_element';
                    const isInline = isInlineFunc(cnode);

                    /* Ignore 'TLTE' and 'not inline elements' */
                    if (isTopLevel || !isInline) {
                        /* '#' are used to delimitate paragraphs */
                        if (recursive) x.fragStr!.val += '#';
                        else fragString.val += '#';
                        canPushNode = true;
                        continue;
                    }

                    /* Recurse */
                    formatTextWithNestedNotInlineElementFunc({
                        eid: eid,
                        el: cnode,
                        data: recursive ? x.data! : finalData, /* If recursive, send the ref of the "finalData" of the TLTE */
                        fragStr: recursive ? x.fragStr! : fragString,
                        recurse: true
                    });
                } break;

                /* - */
                default: { };
            };
        }

        /* If it's the TLTE */
        if (!recursive) {
            const ptab = fragString.val.split('#'); /* Extract paragraphs */
            if (ptab.length === 0) return; /* Stop function if no paragraph found */

            /* Process each paragraph */
            const pList: string[] = []; /* List of paragraph Eid */
            for (let p = 0; p < ptab.length; p++) {
                const pstring = ptab[p].trim();
                if (pstring.length === 0) continue; /* Ignore empty paragraph */

                const peid = generateIdFunc(); /* Paragraph Eid */
                const sentencesData: { index: number, eid: string, frags: string[] }[] = [];

                /* Process frags & create sentences */
                const ftab = pstring.split('.'); /* Array of frags */
                for (let s = 0; s < ftab.length; s++) {
                    const sid = generateIdFunc(); /* Current sentence Eid */
                    const frags: string[] = ftab[s].split('_'); /* Current sentence frags */

                    /* Remove empty entries */
                    frags.forEach((x: string, i: number) => { if (x.trim().length === 0) frags.splice(i, 1) });
                    if (frags.length === 0) continue;

                    /* Process frags */
                    for (let f = 0; f < frags.length; f++) {
                        const cfragEid = frags[f]; /* Current frag Eid */
                        /* Add frag to 'elementData' */
                        // const siblingFragsEid = frags.filter((e: string) => e !== cfragEid);
                        elementData.current[cfragEid] = {
                            type: 'frag',
                            eid: cfragEid,
                            parentParagraphEid: peid,
                            parentSentenceEid: sid,
                            siblingFragsEid: frags
                        };
                    }

                    /* Set current sentence 'index', 'eid' and 'frags' */
                    sentencesData.push({ index: s, eid: sid, frags: frags });
                }

                /* Add sentences to 'elementData' */
                sentencesData.sort((a: any, b: any) => a.index - b.index);
                const stab: string[] = []; /* List of sentences Eid */
                for (let k = 0; k < sentencesData.length; k++) {
                    const sentence = sentencesData[k]; /* Current sentence */
                    const seid = sentence.eid;

                    /* Add sentence's eid */
                    stab.push(seid);

                    /* - */
                    elementData.current[seid] = {
                        type: 'sentence',
                        eid: seid,
                        parentParagraphEid: peid,
                        sentenceText: '',
                        frags: sentence.frags
                    };
                }

                /* Add paragraph Eid */
                pList.push(peid);

                /* Add paragraph to 'elementData' */
                elementData.current[peid] = { type: 'paragraph', eid: peid, sentencesEid: stab, tlteEid: eid };

                // /* Attach sensor */
                // const sensorEid = generateIdFunc();
                // const sensorEl = convertToHTMLFunc(`<v-sensor data-eid='${sensorEid}'></v-sensor>`);
                // const prevSibling = nodesTab[p].previousElementSibling;
                // prevSibling?.insertAdjacentElement('afterend', sensorEl);
                // elementData.current[sensorEid] = {
                //     type: 'sensor',
                //     eid: sensorEid,
                //     sensorParagraphEid: peid,
                //     sensorTlteEid: eid
                // };

                // /* Set sensor eid to paragraph */
                // elementData.current[peid].sensorEid = sensorEid;

                // /* Activate sensor */
                // activateSensorFunc(sensorEid);
            }

            /* Add TLTE to 'elementData' */
            elementData.current[eid].textNodes = finalData;
            elementData.current[eid].paragraphsEid = pList;
        }

    } catch (e: any) {
        logFunc('log', 'Err :: [formatTextWithNestedNotInlineElementFunc] =>', e.message);
    }
};


/** Format top-level text element */
const formatTopLevelTextElementFunc = (eid: string): TLTE_CONTENT_TYPE | null => {
    try {
        /* Get element */
        const el = selectElementFunc(eid);
        if (!el) return null;

        /* Get content type */
        const ctype = getTopLevelTextElementContentTypeFunc(el);
        switch (ctype) {
            /* PLAIN TEXT */
            case 'plain_text': { formatPlainTextFunc({ eid: eid, el: el }) } break;

            /* TEXT WITH NESTED INLINE TEXT ELEMENT */
            case 'text_with_nested_inline_text_element': { formatTextWithNestedInlineElementFunc({ eid: eid, el: el }) } break;

            /* TEXT WITH NESTED NOT INLINE TEXT ELEMENT */
            case 'text_with_nested_not_inline_text_element': { formatTextWithNestedNotInlineElementFunc({ eid: eid, el: el }) } break;

            /* - */
            default: { };
        };

        /* return content type */
        return ctype;

    } catch (e: any) {
        logFunc('log', 'Err :: [formatTopLevelTextElementFunc] =>', e.message);
        return null;
    }
};

/*
*
*
*
*
*
*/

/** Get a word occurence count */
const getOccurencesFunc = (x: { text: string, target: string, caseSensitive?: boolean }): number => {
    const rg = new RegExp(`\\b${x.target}\\b`, x.caseSensitive ? 'g' : 'gi');
    const tab = (x.text).match(rg) || [];
    return tab.length;
};


/** Get words index */
const getWordsIndexFunc = (string: string): number[] => {
    if (string.length === 0) return [];

    const value = string.trim().replaceAll('\n', ' ').split(' ');
    const len = value.length;
    const collector: number[] = [];
    let index = 0;

    /* Process each word */
    for (let i = 0; i < len; i++) {
        const word = value[i];
        const isFirstWord = len === 1 || i === 0;
        const wlen = word.length;

        if (wlen === 0) null;
        else if (isFirstWord) collector.push(0);
        else {
            const sp = word.split(' ');
            const idx = sp.findIndex((e) => e.length > 0) + index;
            collector.push(idx);
        }

        index += wlen + 1;
    }

    /* - */
    return collector;
};


/** Get space between lines */
const getSpaceBetweenLinesFunc = (el: Element | null): number | null => {
    try {
        if (!el) return null;

        const firstWord = el.children[0];
        if (!firstWord) return null;

        const lineHeight = firstWord.getBoundingClientRect().height; /* Get first 'v-word' height */
        const style = $win.getComputedStyle(el);
        const space = lineHeight - parseFloat(style.fontSize);

        return (space / 4);

    } catch (e: any) {
        logFunc('log', 'Err :: [getSpaceBetweenLinesFunc] =>', e.message);
        return null;
    }
};


/** Get pressed key */
const getPressedKeyFunc = (x: KeyboardEvent): KEYS_TYPE => {
    const key = (x.key).toLowerCase();
    if (x.metaKey || key === 'meta') return 'cmd';
    else if (x.ctrlKey || key === 'crtl') return 'crtl';
    else if (x.altKey || key === 'alt') return 'alt';
    else if (x.shiftKey || key === 'shift') return 'shift';
    else if (key === 'arrowup') return 'up';
    else if (key === 'arrowdown') return 'down';
    else if (key === 'arrowleft') return 'left';
    else if (key === 'arrowright') return 'right';
    return key || null;
};


/** Get paragraph offset */
const getParagraphOffsetFunc = (eid: string): OFFSET_TYPE | null => {
    try {
        const tlteEid = elementData.current[eid].tlteEid!;
        const currentTextType = elementData.current[tlteEid].currentTextType;
        if (currentTextType !== 'formattedText') return null;

        /* Scanners left & right offsets */
        const ww = $win.innerWidth;
        const wd3 = ww / 3;
        const scannerOffsets = {
            s0: { left: 0, right: wd3 },
            s1: { left: wd3, right: wd3 * 2 },
            s2: { left: wd3 * 2, right: ww },
        };

        /* Get offset */
        let offsets = { top: 0, left: 0, bottom: 0, right: 0 };
        const defaultScannerEid = elementData.current[tlteEid].parentScannerId!;
        const sentencesEid = elementData.current[eid].sentencesEid!;
        const slen = sentencesEid.length;
        const firstSentenceEid = sentencesEid[0];
        const lastSentenceEid = (slen > 1) ? sentencesEid[slen - 1] : null;

        /* For virtual/fragmented sentence */
        const isFragmented = isFragmentedSentenceFunc(firstSentenceEid);
        if (isFragmented) {
            let firstFragEid = null;
            let lastFragEid = null;

            /* Get first sentence frags */
            const ffrags = elementData.current[firstSentenceEid].frags!;
            const fflen = ffrags.length;

            /* - */
            firstFragEid = ffrags[0];
            lastFragEid = (fflen > 1) ? ffrags[fflen - 1] : null;

            /* Update 'lastFragEid' */
            if (lastSentenceEid !== null) {
                const lfrags = elementData.current[lastSentenceEid].frags!;
                const lflen = lfrags.length;
                lastFragEid = (lflen > 1) ? lfrags[lflen - 1] : lfrags[0];
            }

            /* Get elements */
            const firstFragEl = selectElementFunc(firstFragEid);
            const lastFragEl = lastFragEid ? selectElementFunc(lastFragEid) : firstFragEl;
            if (firstFragEl === null || lastFragEl === null) return null;

            /* Set offset */
            offsets = {
                top: firstFragEl.getBoundingClientRect().top,
                bottom: lastFragEl.getBoundingClientRect().bottom,

                /* TODO :: Left and right should be calculated based on the future columns detection feature */
                left: 1,
                right: $win.innerWidth
            };
        }
        /* For normal sentence */
        else {
            const firstSentenceEl = selectElementFunc(firstSentenceEid);
            const lastSentenceEl = lastSentenceEid ? selectElementFunc(lastSentenceEid) : firstSentenceEl;
            if (firstSentenceEl === null || lastSentenceEl === null) return null;

            /* Set offset */
            offsets = {
                top: firstSentenceEl.getBoundingClientRect().top,
                bottom: lastSentenceEl.getBoundingClientRect().bottom,

                /* TODO :: Left and right should be calculated based on the future columns detection feature */
                left: 1,
                right: $win.innerWidth
            };
        }

        /* return offsets */
        return offsets;

    } catch (e: any) {
        logFunc('log', 'Err :: [getParagraphOffsetFunc] =>', e.message);
        return null;
    }
};


/** Get scanner grid points from offset and position */
const getScannerGridPointsFromOffsetPositionFunc = (offset: OFFSET_TYPE, position: POSITION_TYPE): { x: number, y: number }[] => {
    const allPoints = scannerData.current.allPoints;
    let points: { x: number, y: number }[] = [];
    switch (position) {
        /* Top */
        case 'top': { points = allPoints.filter((p) => ((p.x >= offset.left && p.x <= offset.right) && (p.y < offset.top))).reverse() } break;

        /* Left - TODO :: not accurate */
        case 'left': { } break;

        /* Bottom */
        case 'bottom': {
            points = allPoints.filter((p) => (p.x >= offset.left && p.x <= offset.right) && (p.y > offset.bottom));
        } break;

        /* Right - TODO :: not accurate */
        case 'right': { } break;

        /* - */
        default: { };
    };
    return points;
};


/** Get first next paragraph eid from scan */
const getFirstNextParagraphEidFromScanFunc = (points: { x: number, y: number }[], eidExlusionList: string[]): string | null => {
    try {
        const len = points.length;
        const exclusionList = eidExlusionList || [];
        let eid: string | null = null;

        for (let i = 0; i < len; i++) {
            /* Reset eid */
            eid = null;

            /* Get element from point */
            const p = points[i];
            const el = $doc.elementFromPoint(p.x, p.y) as HTMLElement;
            if (!el || el.nodeType !== 1) continue;

            /* Get paragraph eid */
            const tag = el.tagName.toLowerCase();

            switch (tag) {
                case 'v-word': {
                    const parentEid = el.parentElement!.dataset.eid!;
                    eid = elementData.current[parentEid].parentParagraphEid!;
                } break;

                case 'v-frag': { eid = elementData.current[el.dataset.eid!].parentParagraphEid! } break;

                case 'v-sentence': { eid = elementData.current[el.dataset.eid!].parentParagraphEid! } break;

                case 'v-paragraph': { eid = el.dataset.eid! } break;

                default: {
                    const elementEid = el.dataset.eid || undefined;
                    const isTlte = elementEid ? elementData.current[elementEid]?.type === 'top_level_text_element' : false;

                    /* If it's a TLTE */
                    if (isTlte) {

                        /* Ignore element if it's part of the exclusion list */
                        if (exclusionList.indexOf(elementEid!) !== -1) continue;

                        /* Set paragraph eid */
                        eid = elementData.current[elementEid!].paragraphsEid![0] || null;
                    }
                    // /* If not, check if element has a TLTE as parent */
                    // else { }
                };
            };

            /* Stop loop if paragraph found */
            if (eid !== null && exclusionList.indexOf(eid) === -1) break;
        };

        /* return */
        return eid;

    } catch (e: any) {
        logFunc('log', 'Err :: [getFirstNextParagraphEidFromScanFunc] =>', e.message);
        return null;
    }
};


/** Get node type */
const getNodeTypeFunc = (node: Element): 'text' | 'element' => { return (node.nodeName === '#text') ? 'text' : 'element' };


/** Get TLTE content type */
const getTopLevelTextElementContentTypeFunc = (el: Element): TLTE_CONTENT_TYPE => {
    const nodes = el.childNodes;
    const nl = nodes.length;

    /* If the text-element contains only "PLAIN TEXT" - Ex: <div>This is a plain text.</div> */
    if (nl === 1 && nodes[0].nodeType === Node.TEXT_NODE) return 'plain_text';

    /* 
    If the text-element contains nested elements which are NOT "INLINE TEXT ELEMENT" 
    Ex: <div>Some text. <p>This is not an inline text element.</p></div> 
    */
    if (hasNonInlineTextElementFunc(el)) return 'text_with_nested_not_inline_text_element';

    /* 
    If the text-element contains nested elements which are ONLY "INLINE TEXT ELEMENT"
    Ex: <p>Software engineering is <b>the best job</b> in the world.</p>
    */
    return 'text_with_nested_inline_text_element';
};


/** Get next paragraph */
const getParagraphEidFunc = (currentParagraphEid: string, direction: 'next' | 'prev') => {
    const sensorEid = elementData.current[currentParagraphEid].sensorEid!;
    const sensorOffset = elementData.current[sensorEid].sensorOffset!;
    switch (direction) {
        case 'prev': { } break;

        case 'next': {
            const getNextSensors = Object.values(elementData.current)
                .filter((e) =>
                    e.type === 'sensor' &&
                    e.sensorOffset &&
                    e.sensorOffset.y >= sensorOffset.y &&
                    e.sensorOffset.y < $win.innerHeight &&
                    e.eid !== sensorEid
                )
                .sort((a, b) =>
                    a.sensorOffset!.y - b.sensorOffset!.y
                );

            const s0 = getNextSensors[0];
            const off = $doc.elementFromPoint(s0.sensorOffset!.x, s0.sensorOffset!.y);

            // logFunc('log', 'senseor ::', sensorOffset, getNextSensors[0], off);
        } break;

        default: { };
    };

};

/*
*
*
*
*
*
*/

/** Generate grid points */
const generateGridPointsFunc = (blockProps: SCANNER_PROPS_TYPE): { x: number, y: number }[] => {
    const props = blockProps;
    const gapx = 32; /* 30px of gap between x points */
    const gapy = 16; /* 15px of gap between y points */
    const points: { x: number, y: number }[] = [];
    for (let y = 4; y < props.height; y += gapy) for (let x = 6; x < props.width; x += gapx) points.push({ x, y });
    return points;
};


/** Generate scan-blocks */
const generateScanBlocksFunc = (scannerProps: SCANNER_PROPS_TYPE, scannerType: SCANNER_INIT_TYPES_TYPE): SCANNER_DATA_TYPE => {
    const props = scannerProps;
    const type = scannerType;

    const blockCount = 3;
    const blockHeight = props.height / blockCount;
    const blocks: SCANNER_DATA_TYPE = {};

    /* Generate scanner grid points for each blocks */
    const blockProps: SCANNER_PROPS_TYPE = { width: props.width, height: blockHeight, top: 0, left: props.left };
    const points = generateGridPointsFunc(blockProps);
    for (let i = 0; i < blockCount; i++) {
        blocks['b' + i] = {
            /* "décalage" is a french word that means margin or offset */
            decalage: {
                x: (type === 'custom') ? props.left : 0,
                y: (type === 'custom') ? props.top : blockHeight * i
            },
            points: points
        };
    }

    /* return blocks */
    return blocks;
};

/*
*
*
*
*
*
*
*/

/** Check if element has focus */
const hasFocusFunc = (eid: string): boolean => { return elementData.current[eid].lastMouseEvent === 'enter' };


/** Check if the string contains alphanumeric char */
const hasAlphaNumCharFunc = (string: string): boolean => {
    if (typeof string !== 'string') return false;
    const tab = string.split('');
    for (let i = 0; i < tab.length; i++)  if (/^[a-zA-Z0-9]+$/.test(tab[i])) return true;
    return false;
};


/** Check if a property exists */
const hasPropertyFunc = (x: any, y: string | undefined): boolean => {
    if (!y) return false;
    const obj = (typeof x === 'object' && x !== null) ? x : {};
    return Object.prototype.hasOwnProperty.call(obj, y);
};


/** Check if element has pure text node */
const hasPureTextNodeFunc = (el: Element): boolean => {
    const chn = el.childNodes;
    const textNodes = (Object.values(chn)).filter((e) => e.nodeName === '#text' && (e.textContent && e.textContent.trim().length > 0));
    return (textNodes.length > 0) ? true : false;
};


/** Check if element contains 'inline text element' */
const hasInlineTextElementFunc = (el: Element): boolean => {
    const nodes = el.childNodes;
    for (let i = 0; i < nodes.length; i++) {
        const currentNode = nodes[i];

        /* Jump to next node if current node is a pure text */
        if (currentNode.nodeName === '#text') continue;

        /* If current node's element is not inline */
        if (!isInlineFunc(currentNode as HTMLElement)) return true;

        /* Recurse - Check current node if it has child nodes */
        const cnodes = currentNode.childNodes;
        if (cnodes.length > 0 && hasInlineTextElementFunc(currentNode as HTMLElement)) return true;
    }
    return false;
};


/** Check if element contains 'non inline text element' */
const hasNonInlineTextElementFunc = (el: Element): boolean => {
    const nodes = el.childNodes;
    for (let i = 0; i < nodes.length; i++) {
        const currentNode = nodes[i];

        /* Jump to next node if current node is a pure text */
        if (currentNode.nodeName === '#text') continue;

        /* If current node's element is not inline */
        if (!isInlineFunc(currentNode as HTMLElement)) return true;

        /* Recurse - Check current node if it has child nodes */
        const cnodes = currentNode.childNodes;
        if (cnodes.length > 0 && hasNonInlineTextElementFunc(currentNode as HTMLElement)) return true;
    }
    return false;
};


/** Check if string has ponctuation */
const hasPonctuationFunc = (x: string): boolean => {
    const lastChar = x.trim().split('').reverse()[0];
    return _ponctuation_list_.some((e) => lastChar === e);
};


/** Highlight frags */
const highlightFragsFunc = (el: HTMLElement, highlight: boolean): void => {
    try {
        if (!el) return; /* Check element exists */

        /* - */
        const eid = el.dataset.eid || undefined;
        if (!eid) return; /* Quit function if the target has no 'eid' */

        /* Get siblings */
        const siblings = elementData.current[eid].siblingFragsEid!;
        const slen = siblings.length;

        /* Extract sibling elements */
        if (slen > 0) for (let i = 0; i < slen; i++) {
            const sib = siblings[i]; /* Current sibling */
            const el = selectElementFunc(sib) as HTMLElement;
            if (!el) continue;

            /* Highlight */
            if (highlight) {
                setPaddingBlockFunc(el); /* Set padding block */
                el.setAttribute('class', 'frag_selected'); /* Highlight */
                watchFragsFunc(el, el.dataset); /* Watch frag if necessary */
            }
            /* Remove hightlight */
            else el.removeAttribute('class');
        }

    } catch (e: any) {
        logFunc('log', 'Err :: [highlightFragsFunc] =>', e.message);
    }
};

/*
*
*
*
*
*
*
*/

/** Check if element is valid (Element or #text) */
const isValidElementFunc = (el: Element | HTMLElement | null): boolean => {
    if (!el) return false;
    return el.nodeType === 1 || el.nodeName === '#text';
};


/** Check if sentence is a fragmented sentence (virtual) */
const isFragmentedSentenceFunc = (eid: string): boolean => {
    const frags = elementData.current[eid].frags || [];
    return (Array.isArray(frags) && frags.length > 0) ? true : false;
};


/** Check if the 'source' element has the 'target' element as parent */
const isParentFunc = (x: { sourceEid: string, targetEid: string, parentEl?: HTMLElement }): boolean => {
    const sourceEl = selectElementFunc(x.sourceEid);
    if (!sourceEl) return false;

    /* Get parent */
    const parent = x.parentEl ? x.parentEl.parentElement : sourceEl.parentElement;
    if (!parent) return false;

    /* Get Parent's eid */
    const peid = parent.dataset.eid;
    if (!peid) {
        if (parent.tagName.toLowerCase() === 'body') return false;
        return isParentFunc({ sourceEid: x.sourceEid, targetEid: x.targetEid, parentEl: parent });
    }

    /* - */
    if (peid === x.targetEid) return true;

    /* - */
    return false;
};


/* Check is element is inline - But not "inline-flexbox" */
const isInlineFunc = (el: Element): boolean => {
    if (!isValidElementFunc(el)) return false;
    const display = $win.getComputedStyle(el).display.toLowerCase() || null;
    if (!display) return false;
    return display.includes('inline') && !display.includes('flexbox');
};


/** Check if element is a TLTE */
const isTopLevelTextElementFunc = (el: HOVERED_ELEMENT_TYPE): boolean => {
    /* 1. Return false if "el" is invalid */
    if (!isValidElementFunc(el) || (el && _tag_exclusion_list_.includes(el.tagName.toLowerCase()))) return false;
    el = el! as HTMLElement;


    /* 2. Get element's child nodes - If empty, it's not a TLTE */
    const chn = el.childNodes;
    if (chn.length === 0) return false;


    /* 3. Check if element contains pure text nodes - If not, it's not a TLTE */
    const hasPure = hasPureTextNodeFunc(el);
    if (!hasPure) return false;


    /* 4. If element has 'pure text node' (2) and isn't inline, then it's a TLTE */
    if (!isInlineFunc(el)) return true;


    /* Get element's siblings */
    const ps = el.previousSibling as Element;
    const ns = el.nextSibling as Element;


    /* 5. If element has no valid element as siblings then it's a TLTE */
    if (!isValidElementFunc(ps) && !isValidElementFunc(ns)) return true;


    /* Check if element has 'pure text node' as sibling */
    const hasPureTextAsSibling = [
        ps && ps.nodeName === '#text' && ps.textContent && ps.textContent.trim().length > 0,
        ns && ns.nodeName === '#text' && ns.textContent && ns.textContent.trim().length > 0
    ].includes(true);

    /* Check if element has an 'inline text element' as sibling */
    const hasInlineTextElementAsSibling = [
        ps && ps.nodeType === 1 && isInlineFunc(ps) && !hasNonInlineTextElementFunc(ps) && (hasPureTextNodeFunc(ps) || hasInlineTextElementFunc(ps)),
        ns && ns.nodeType === 1 && isInlineFunc(ns) && !hasNonInlineTextElementFunc(ns) && (hasPureTextNodeFunc(ns) || hasInlineTextElementFunc(ns)),
    ].includes(true);


    /* 6. If element has neither 'pure text node' nor 'inline text element' as sibling, then it's a TLTE */
    if (!hasPureTextAsSibling && !hasInlineTextElementAsSibling) return true;


    /* Else, it's definitively not a TLTE */
    return false;
};


/** Check if element is scrollable */
const isScrollableElementFunc = (el: HOVERED_ELEMENT_TYPE): SCROLL_DIRECTION_TYPE | undefined => {
    /* Return false if "el" is null */
    if (!el) return undefined;

    /* Check element tag name */
    const tag = el.tagName.toLowerCase();
    const list = _tag_exclusion_list_.filter((e) => e !== 'body' && e !== 'html');
    if (list.includes(tag)) return undefined;

    const sx = el.scrollWidth > el.clientWidth;
    const sy = el.scrollHeight > el.clientHeight;

    let direction: SCROLL_DIRECTION_TYPE | undefined = undefined;

    if (sx && sy) direction = 'all';
    else if (sx && !sy) direction = 'x';
    else if (!sx && sy) direction = 'y';
    else direction = undefined;

    /* - */
    return direction;
};


/** Is html element scrollable */
const isHtmlElementScrollableFunc = () => { return isScrollableElementFunc($html) };

/*
*
*
*
*
*
*
*/

/** log */
const logFunc = (type: 'log' | 'error' | 'time' | 'timeEnd', ...msg: any): void => {
    if (!_log_ && type !== 'error') return;
    switch (type) {
        case 'log': { console.log(...msg) } break;
        case 'error': { console.log(...msg) } break;
        case 'time': { console.time(msg) } break;
        case 'timeEnd': { console.timeEnd(msg) } break;
        default: { };
    };
};

/*
*
*
*
*
*
*
*/

/** Process element */
const processElementFunc = (el: HTMLElement | null): void => {
    try {
        /* Check if "el" exists */
        if (!el) return;

        /* Checkif element is valid */
        if (!isValidElementFunc(el)) {
            return;
        }

        /* Get element "eid" */
        const ceid = el.dataset.eid || undefined;

        /* Check if "el" has been processed */
        if (ceid) return;

        /* Generate an ID for the element */
        const eid = generateIdFunc();
        el.dataset.eid = eid;

        /* Check if current element is a top-level text element */
        let isTLTE = isTopLevelTextElementFunc(el);
        if (!isTLTE) return;

        /* Init element data */
        elementData.current[eid] = { eid: eid, type: null };

        /* Check if current element is scrollable */
        let scrollDirection: 'all' | 'x' | 'y' | undefined = isScrollableElementFunc(el);

        /* If element is a TLTE */
        if (isTLTE) {
            elementData.current[eid].type = 'top_level_text_element';
            elementData.current[eid].scrollDirection = scrollDirection;

            /* Detect parent scanner */
            const parentScannerId = detectParentScannerFunc(el);
            if (!parentScannerId) return;
            elementData.current[eid].parentScannerId = parentScannerId;

            /* Format top-level text element & return content type */
            const ctype = formatTopLevelTextElementFunc(eid);
            if (ctype) elementData.current[eid].contentType = ctype;

            /* Watch element */
            watchTopLevelTextElementFunc(eid);

            /* Search for scrollable parents */
            detectScrollableParentsFunc(el, eid);
        }

    } catch (e: any) {
        logFunc('error', 'Err :: [processElementFunc] =>', e.message);
    }
};


/** Prepare text & read */
const prepareTextAndReadFunc = (x: { type: 'word' | 'frag' | 'sentence', el: Element, resetSpeechData?: boolean, startFromBeginning?: boolean, force?: boolean }): void => {
    try {
        const type = x.type;
        const el = x.el;
        const resetSpeechData = x.resetSpeechData;
        const startFromBeginning = x.startFromBeginning;
        const force = x.force;

        /* - */
        let tlteEid: string = '';

        /* Check element exists */
        if (!el) return;

        /* Stop & reset speaker */
        if (resetSpeechData) speaker.reset();

        /* - */
        speechData.current.currentWordIdx = 0;

        /* Stop function if speaker is playing */
        if (!force && ['playing', 'paused'].includes(speechData.current.playerState)) return;

        /* - */
        switch (type) {
            /* Word */
            case 'word': {
                const parent = el.parentElement!;
                const tag = parent.tagName.toLowerCase();
                prepareTextAndReadFunc({
                    type: tag.includes('frag') ? 'frag' : 'sentence',
                    el: parent as Element,
                    startFromBeginning: startFromBeginning,
                    force: force
                });
                return;
            } break;

            /* Frag */
            case 'frag': {
                /* Extract frag's eid */
                const eid = (el as HTMLElement).dataset.eid || undefined;
                if (!eid) return;

                /* Sentence data */
                let parentSentenceEid: string = elementData.current[eid].parentSentenceEid!;

                /* Select first sentence */
                if (startFromBeginning) {
                    const ppEid: string = elementData.current[parentSentenceEid].parentParagraphEid!;
                    const firstSentenceEid = elementData.current[ppEid].sentencesEid![0];
                    parentSentenceEid = firstSentenceEid;
                }

                /* - */
                const frags = elementData.current[parentSentenceEid].frags!;
                let text = elementData.current[parentSentenceEid].sentenceText;
                let widx = elementData.current[parentSentenceEid].wordsIdx || [];
                let wordsEid: string[] = elementData.current[parentSentenceEid].wordsEid || [];

                /* Collect text */
                if (!text) {
                    text = '';

                    for (let i = 0; i < frags.length; i++) {
                        const fragEid = frags[i]; /* Get frag eid */
                        const fel = selectElementFunc(fragEid);
                        if (!fel) return; /* Stop function is an element is not found */

                        /* Collect the text content of each frag */
                        const content = fel.textContent!.replaceAll('\n', ' ').trim();
                        if (content.length === 0) continue;
                        text += ' ' + content;

                        /* Collect words eid */
                        const children = fel.children;
                        for (let k = 0; k < children.length; k++) {
                            const child = children[k] as HTMLElement;
                            wordsEid.push(child.dataset.eid!);
                        }
                    }

                    /* - */
                    text = text.trim();

                    /* Get each word's index */
                    const windx = getWordsIndexFunc(text);
                    widx = windx;

                    /* Cache text */
                    elementData.current[parentSentenceEid].sentenceText = text;
                    elementData.current[parentSentenceEid].wordsEid = wordsEid;
                    elementData.current[parentSentenceEid].wordsIdx = windx;
                }

                /* Paragraph data */
                const parentParagraphEid: string = elementData.current[parentSentenceEid].parentParagraphEid!;
                tlteEid = elementData.current[parentParagraphEid].tlteEid!; /* Set TLTE eid */

                /* Get sentence index */
                const sentencesEid = elementData.current[parentParagraphEid].sentencesEid!;
                const sentenceIdx = sentencesEid.indexOf(parentSentenceEid);

                /* Setup speech data */
                Object.assign(speechData.current, <SPEECH_DATA_TYPE>{
                    text: text,

                    currentTopLevelTextElementEid: tlteEid,
                    currentParagraphEid: parentParagraphEid,
                    currentSentenceEid: parentSentenceEid,

                    currentSentenceIdx: sentenceIdx,
                    currentSentenceWordsIdx: widx,

                    sentenceCount: sentencesEid.length,
                    wordCount: wordsEid.length
                });
            } break;

            /* Sentence */
            case 'sentence': {
                /* Extract sentence eid */
                const eid = (el as HTMLElement).dataset.eid;
                if (!eid) return;

                /* Sentence data */
                let text = elementData.current[eid].sentenceText;
                let widx = elementData.current[eid].wordsIdx || [];
                let wordsEid: string[] = elementData.current[eid].wordsEid || [];

                /* Collect text */
                if (!text) {
                    /* Get text */
                    text = el.textContent!.replaceAll('\n', ' ').trim();

                    /* Collect words eid */
                    const children = el.children;
                    for (let k = 0; k < children.length; k++) {
                        const child = children[k] as HTMLElement;
                        wordsEid.push(child.dataset.eid!);
                    }

                    /* Get each word's index */
                    const windx = getWordsIndexFunc(text);
                    widx = windx;

                    /* Cache text */
                    elementData.current[eid].sentenceText = text;
                    elementData.current[eid].wordsEid = wordsEid;
                    elementData.current[eid].wordsIdx = windx;
                }

                /* Paragraph data */
                const parentParagraphEid: string = elementData.current[eid].parentParagraphEid!;
                tlteEid = elementData.current[parentParagraphEid].tlteEid!; /* Set TLTE eid */

                /* Get sentence index */
                const sentencesEid = elementData.current[parentParagraphEid].sentencesEid!;
                const sentenceIdx = sentencesEid.indexOf(eid);

                /* Setup speech data */
                Object.assign(speechData.current, <SPEECH_DATA_TYPE>{
                    text: text,

                    currentTopLevelTextElementEid: tlteEid,
                    currentParagraphEid: parentParagraphEid,
                    currentSentenceEid: eid,

                    currentSentenceIdx: sentenceIdx,
                    currentSentenceWordsIdx: widx,

                    sentenceCount: sentencesEid.length,
                    wordCount: wordsEid.length
                });
            } break;

            /* - */
            default: { return };
        };

        /* Format parents */
        formatParentTlteFunc(tlteEid);

        /* Play text */
        speaker.play();

    } catch (e: any) {
        logFunc('error', 'Err :: [prepareTextAndReadFunc] =>', e.message);
    }
};


/** Play text */
const playTextFunc = (): void => {
    switch (speechData.current.playerState) {
        case 'idle': { speaker.play() } break;
        case 'playing': { speaker.pause() } break;
        case 'paused': { speaker.resume() } break;
        default: { };
    };
};

/*
*
*
*
*
*
*
*/

/** Read sentence */
const readSentenceFunc = (eid: string): boolean | null => {
    try {
        /* If it's a fragmented sentence (virtual) */
        const isFragmented = isFragmentedSentenceFunc(eid);
        if (isFragmented) {
            const frags = elementData.current[eid].frags!;
            const firstFragEid = frags[0];
            const fel = selectElementFunc(firstFragEid)!;

            const content = fel.textContent;
            if (!content) return false;
            if (!hasAlphaNumCharFunc(content)) return false;

            prepareTextAndReadFunc({ type: 'frag', el: fel, force: true });
        }
        /* If it's a normal sentence (element) */
        else {
            const sel = selectElementFunc(eid)!;
            prepareTextAndReadFunc({ type: 'sentence', el: sel, force: true });
        }

        return true;

    } catch (e: any) {
        logFunc('error', 'Err :: [readSentenceFunc] =>', e.message);
        return null;
    }
};


/** Read Paragraph */
const readParagraphFunc = (eid: string, sentencePosition: 'firstSentence' | 'lastSentence', recursive?: boolean): void => {
    try {
        const paragraphEid = eid;

        /* Render formatted text */
        const tlteEid = elementData.current[paragraphEid].tlteEid!;
        const tlteEl = selectElementFunc(tlteEid);
        const ctype = elementData.current[tlteEid].contentType!;
        if (!tlteEl) return;
        if (!recursive) transformTextNodesFunc(tlteEl, 'formattedText');

        /* - */
        let targetData: any = { type: '', el: null };
        const sentencesEid = elementData.current[paragraphEid].sentencesEid!;
        const sentenceEid = sentencesEid[(sentencePosition === 'firstSentence') ? 0 : (sentencesEid.length - 1)];
        if (ctype === 'plain_text') {
            const sentenceEl = selectElementFunc(sentenceEid);
            targetData = { type: 'sentence', el: sentenceEl };
        } else {
            const frags = elementData.current[sentenceEid].frags!;
            const frag = frags[(sentencePosition === 'firstSentence') ? 0 : (frags.length - 1)];
            const firstFragEl = selectElementFunc(frag);
            targetData = { type: 'frag', el: firstFragEl };
        }

        /* Prepare & read text */
        prepareTextAndReadFunc({ type: targetData.type, el: targetData.el, force: true, startFromBeginning: true });

    } catch (e: any) {
        logFunc('error', 'Err :: [readParagraphFunc] =>', e.message);
    }
};


/** Restore original text for all TLTE */
const restoreOriginalTextForAllTlteFunc = (): void => {
    try {
        const tab = Object.values(elementData.current);
        const targets = tab.filter((e) => e.type === 'top_level_text_element' && e.currentTextType === 'formattedText');
        if (targets.length === 0) return;
        for (let i = 0; i < targets.length; i++) {
            const tlteEid = targets[i].eid;
            const el = selectElementFunc(tlteEid);
            /* Restore original text */
            if (el) transformTextNodesFunc(el, 'originalText');
        }

    } catch (e: any) {
        logFunc('error', 'Err :: [restoreOriginalTextForAllTlteFunc] =>', e.message);
    }
};


/** Restore original for current TLTE */
const restoreOriginalTextForCurrentTlteFunc = (): void => {
    try {
        const currentTlteEid = speechData.current.currentTopLevelTextElementEid!;
        if (!currentTlteEid) return;
        const currentTlteEl = selectElementFunc(currentTlteEid);
        const ctype = elementData.current[currentTlteEid].contentType!;

        /* 
        *
        * 1. For 'plain_text' & 'text_with_nested_inline_text_element'
        * Retore original text if the content type is different from 'text_with_nested_not_inline_text_element'
        * 
        * 2. For 'text_with_nested_not_inline_text_element'
        * Because of the complexity of TLTE with 'text_with_nested_not_inline_text_element', 
        *   their original text will be restored only when speaker finish it work or is cancelled. 
        * The reason is to allow an easier detect of each nodes while reading a nested TLTE, before a better solution is found.
        * 
        */
        if (currentTlteEl && ctype !== 'text_with_nested_not_inline_text_element')
            transformTextNodesFunc(currentTlteEl, 'originalText');

    } catch (e: any) {
        logFunc('error', 'Err :: [restoreOriginalTextForCurrentTlteFunc] =>', e.message);
    }
}

/*
*
*
*
*
*
*
*/

/** Scanner */
let timeEndLogCount = 0;
const scanner = {
    /* Init default scanners */
    init: () => { scannerInitFunc('default') },

    /* Init custom scanner */
    custom: (props: SCANNER_PROPS_TYPE) => { scannerInitFunc('custom', props) },

    /* Scan page */
    scan: (scanners?: SCANNER_AND_BLOCKS_TYPE) => {
        /* Cancel any other scan if current one isn't completly finish yet */
        if (isScanning.current) return;

        /* Part 1/2 - Log scanning duration */
        // if (timeEndLogCount < 99) logFunc('time', 'Scanning duration [real_duration = total_duration - 1000 (the timeout)] :');

        /* Set scanning state */
        isScanning.current = true;

        /* Get default scanners */
        const defaultScanners = scannerData.current.default;

        /* Scan specified blocks per scanner */
        if (scanners) {
            const obj = { s0: defaultScanners.s0, s1: defaultScanners.s1, s2: defaultScanners.s2 };
            const skeys: any = Object.keys(scanners);

            /* - */
            const promises: Function[] = [];
            for (let i = 0; i < skeys.length; i++) {
                const ky: 's0' | 's1' | 's2' = skeys[i];
                promises.push(() => scanStep0Func(obj[ky], scanners[ky]));
            }

            /* Scan in parallel */
            Promise.all(promises.map(e => e()));
        }

        /* Scan all blocks of all scanners */
        else {
            const s0 = defaultScanners.s0;
            const s1 = defaultScanners.s1;
            const s2 = defaultScanners.s2;

            /* Hide scanner grid points, if displayed */
            const allel = $doc.getElementById('allel');
            if (allel) allel.style.display = 'none';

            /* Scan sequentially */
            // const blk = [s0, s1, s2];
            // for (let i = 0; i < blk.length; i++) scanStep0Func(blk[i]);

            /* Scan in parallel */
            const promises = [() => scanStep0Func(s0), () => scanStep0Func(s1), () => scanStep0Func(s2)];
            Promise.all(promises.map(e => e()));
        }

        /* Set scanning state */
        setTimeout(() => {
            isScanning.current = false;

            /* Part 2/2 - Log scanning duration */
            // if (timeEndLogCount < 99) { logFunc('timeEnd', 'Scanning duration [real_duration = total_duration - 1000 (the timeout)] :'); timeEndLogCount++ }
        }, 1000);
    },

    /* Get next paragraph eid */
    getNextParagraphEid: (currentParagraphEid: string, position: 'top' | 'bottom' | 'left' | 'right'): string | null => {
        try {
            if (!currentParagraphEid) return null;

            /* Get paragraph offset */
            const offset = getParagraphOffsetFunc(currentParagraphEid);
            if (!offset) return null;

            /* Get scan zone */
            const points = getScannerGridPointsFromOffsetPositionFunc(offset, position);

            /* Get next first paragraph fom scan */
            const tlteEid = elementData.current[currentParagraphEid].tlteEid!;
            const parentsTlteEid = elementData.current[tlteEid].parentsTlteEid || [];
            const exclusionList = [tlteEid, ...parentsTlteEid];
            const peid = getFirstNextParagraphEidFromScanFunc(points, exclusionList);

            /* return */
            return peid;

        } catch (e: any) {
            logFunc('error', 'Err :: [scanner.getNextParagraphEid] =>', e.message);
            return null;
        }
    }
};


/** Initialize scanner */
const scannerInitFunc = <T extends SCANNER_INIT_TYPES_TYPE>(...args: SCANNER_INIT_ARG<T>): void => {
    /* args */
    logFunc('time', 'scan init :');

    /* - */
    const type = args[0];
    const customScannerProps = args[1] || null;

    /* Scanners */
    let custom: SCANNER_DATA_TYPE, s0: SCANNER_DATA_TYPE, s1: SCANNER_DATA_TYPE, s2: SCANNER_DATA_TYPE;

    /* Window props */
    const isLandscape = winDim.current.mode === 'landscape';
    const wwidth = winDim.current.width;
    const wheight = winDim.current.height;

    /* Scanner props */
    const scanWidth = (type === 'custom') ? customScannerProps!.width : isLandscape ? (wwidth / 3) : wwidth; /* TODO :: detect mobile vs desktop */
    const scanHeight = (type === 'custom') ? customScannerProps!.height : wheight;
    const scanTop = (type === 'custom') ? customScannerProps!.top : 0;
    const scanLeft = (type === 'custom') ? customScannerProps!.left : 0;
    const props: SCANNER_PROPS_TYPE = { width: scanWidth, height: scanHeight, top: scanTop, left: scanLeft };

    /* Prepare to display scanner points */
    let allel: HTMLElement | null = null;
    if (_show_scanner_) {
        allel = $doc.createElement('div') as HTMLElement;
        allel.setAttribute('id', 'allel');
    }

    /* Generate scan-blocks for a custom scanner */
    const blocks = generateScanBlocksFunc(props, type);
    if (type === 'custom') {
        custom = blocks;
        for (let bid in custom) custom[bid].decalage = { x: scanLeft, y: scanTop };
        scannerData.current.custom[generateIdFunc()] = custom; /* Update scanner data */

        /* Display scanner */
        if (_show_scanner_) { }
    }

    /* Generate scan-blocks for default scanners */
    else {
        /* Set blocks for each scanner */
        s0 = blocks; s1 = structuredClone(blocks); s2 = structuredClone(blocks);

        const allPoints: { x: number, y: number }[] = [];

        /* Update blocks offsetX */
        const func = (scanner: SCANNER_DATA_TYPE, left: 0 | 1 | 2) => {
            for (let bid in scanner) {
                /* Update decalage x */
                const scn = scanner[bid];
                scn.decalage.x = scanWidth * left;

                /* - */
                const dec = scn.decalage;
                const pts = scn.points;
                for (let p = 0; p < pts.length; p++) {
                    const cpt = pts[p];
                    const coords = { x: (cpt.x + dec.x), y: (cpt.y + dec.y) };
                    allPoints.push(coords);

                    /* - */
                    if (_show_scanner_) {
                        const el = $doc.createElement('div');
                        el.style.zIndex = '1000';
                        el.style.position = 'absolute';
                        el.style.overflow = 'visible';
                        el.style.top = coords.y + 'px';
                        el.style.left = coords.x + 'px';
                        el.style.backgroundColor = 'red';
                        el.style.width = '1px';
                        el.style.height = '1px';
                        allel!.append(el);
                    }
                }

            }
        };
        const fnTab = [() => func(s0, 0), () => func(s1, 1), () => func(s2, 2)];
        Promise.all(fnTab.map(e => e()));

        /* Update scanner data */
        scannerData.current.default = { s0, s1, s2 };
        scannerData.current.allPoints = allPoints;

        /* Display scanner */
        if (_show_scanner_) $body.insertAdjacentElement('beforeend', allel!);
    }

    /* - */
    logFunc('timeEnd', 'scan init :');
};


/* Scan step 1 - Sub-function of "scanStep0Func" */
const scanStep1Func = (scanner: SCANNER_DATA_TYPE, bid: string): void => {
    const currentBlock = scanner[bid];
    const decalage = currentBlock.decalage;
    const points = currentBlock.points;
    for (let p = 0; p < points.length; p++) {
        const pt = points[p];
        const coords = { x: pt.x + decalage.x, y: pt.y + decalage.y };
        const el = $doc.elementFromPoint(coords.x, coords.y);
        processElementFunc(el as HTMLElement);
    }
};


/* Scan Stop 0 - Sub-function of "scan" */
const scanStep0Func = (scanner: SCANNER_DATA_TYPE, activeBlocks?: Array<'b0' | 'b1' | 'b2'>): void => {
    const blocks: string[] = activeBlocks || ['b0', 'b1', 'b2'];
    const blocksList = Object.keys(scanner);
    const klen = blocksList.length;

    /* Scan blocks sequentially */
    // for (let i = 0; i < klen; i++) {
    //     const blk = blocksList[i];
    //     if (blocks.indexOf(blk) === -1) () => { };
    //     scanStep1Func(scanner, blk);
    // }

    /* Scan blocks in parallel */
    let fn = Array(klen).fill(undefined).map((_, i: number) => {
        const blk = blocksList[i];
        if (blocks.indexOf(blk) === -1) () => { };
        return () => scanStep1Func(scanner, blk);
    });
    Promise.all(fn.map(e => e()));
};


/** Scan on frame animation with a deleay of 1s between each scan - It's really efficient & reliable */
const scanOnFrameAnimationFunc = (): void => {
    scanner.scan();
    requestAnimationFrame(scanOnFrameAnimationFunc);
};

/*
*
*
*
*
*
*
*/

/** Speaker - Used to play, pause, resume and stop text reading */
let updatePrevWordIdx = true;
const speaker = {
    /* Play */
    play: () => {
        try {
            /* - */
            if (speechData.current.playerState === 'playing') return;

            /* Get text */
            const text = speechData.current.text;
            if (!text) return;

            /* Get default voice */
            const voice = voicesData.current.default;
            if (!voice?.lang) {
                setupVoicesFunc();
                speaker.play();
                return;
            }

            /* Setup utterance */
            const utt = new SpeechSynthesisUtterance(text);
            utt.voice = voice;
            utt.lang = voice!.lang;
            utt.pitch = speechData.current.pitch;
            utt.rate = speechData.current.rate;

            /* Speak */
            speechSynthesis.speak(utt);

            /* On start */
            utt.onstart = (e) => {
                const data = speechData.current;
                const seid = data.currentSentenceEid!;

                /* Set player state */
                speechData.current.playerState = 'playing';

                /* If sentence is fragmented (virtual) */
                const isFragmented = isFragmentedSentenceFunc(seid);
                if (isFragmented) {
                    const frags = elementData.current[seid].frags!;
                    const firstFragEl = selectElementFunc(frags[0])!; /* First frag element */
                    highlightFragsFunc(firstFragEl as HTMLElement, true);
                    alignTextVerticallyFunc(firstFragEl);
                }
                /* If sentence is a normal sentence (element) */
                else {
                    const sel = selectElementFunc(seid); /* Current sentence element */
                    if (sel) sel.setAttribute('class', 'sentence_selected');
                    alignTextVerticallyFunc(sel as Element);
                }
            };

            /* Track words */
            utt.onboundary = (e) => {
                if (e.name !== 'word') return;

                let idx = e.charIndex;
                let swidx = speechData.current.currentSentenceWordsIdx!;
                let fwidx = swidx.indexOf(idx);
                const prevWordIdx = updatePrevWordIdx ? speechData.current.currentWordIdx : speechData.current.prevWordIdx;

                /* Try to correct the 'charIndex' when a word start by an unreadable char like an openning parenthesis '(' for example */
                if (fwidx === -1) {
                    /* Attempt correction */
                    idx = correctCharIndexOnBoundaryFunc({
                        text: speechData.current.text!,
                        charIndex: idx,
                        prevWordIndex: prevWordIdx,
                        wordsIndexTab: swidx
                    }) || idx;

                    /* The word index will be corrected if the word contains an alphanumeric char */
                    fwidx = swidx.indexOf(idx);
                }

                const currentWordIdx = fwidx;
                const seid = speechData.current.currentSentenceEid;
                const wordsEid = elementData.current[seid!].wordsEid!;

                /* Word elements */
                const prevWordEl = selectElementFunc(wordsEid[prevWordIdx]);
                const currentWordEid = wordsEid[currentWordIdx];
                const currentWordEl = selectElementFunc(currentWordEid);

                /* Unhighlight prev readed word */
                if (prevWordEl && currentWordEl) {
                    (prevWordEl as HTMLElement).removeAttribute('class');
                    updatePrevWordIdx = true;
                }
                else updatePrevWordIdx = false;

                /* Highlight current reading word */
                if (currentWordEl) (currentWordEl as HTMLElement).setAttribute('class', 'word_selected');

                /* Set next word index */
                speechData.current.prevWordIdx = prevWordIdx;
                speechData.current.currentWordIdx = fwidx;
                speechData.current.currentWordEid = currentWordEid;
            };

            /* On pause */
            utt.onpause = (e) => {
                speechData.current.playerState = 'paused';
            };

            /* On resume */
            utt.onresume = (e) => {
                speechData.current.playerState = 'playing';
            };

            /* On end */
            utt.onend = (e) => {
                /* - */
                speechData.current.playerState = 'paused';

                updatePrevWordIdx = true;

                /* - */
                const data = speechData.current;

                /* Disable current sentence highlight */
                disableCurrentSentenceHighlightFunc(data);

                /* Increment sentence index */
                speechData.current.currentSentenceIdx += 1;

                // getParagraphEidFunc(speechData.current.currentParagraphEid!, 'next');

                /* Play next sentence, if available */
                const nextSentenceAvailable = data.currentSentenceIdx < data.sentenceCount;
                if (nextSentenceAvailable) {
                    /* Get list of sentences eid */
                    const peid = elementData.current[data.currentSentenceEid!].parentParagraphEid!;
                    const sentencesEid = elementData.current[peid].sentencesEid!;

                    /* Get next sentence eid */
                    const nextSentenceEid = sentencesEid[data.currentSentenceIdx];
                    speechData.current.currentSentenceEid = nextSentenceEid;

                    /* Read next sentence */
                    const rs = readSentenceFunc(nextSentenceEid);
                    if (rs === false) speechData.current.currentSentenceIdx += 1;
                }

                /* At the end of the paragraph */
                const paragraphEnd = data.sentenceCount - data.currentSentenceIdx === 0;
                if (paragraphEnd) {
                    /* Get next TLTE eid */
                    const nextParagraphEid = scanner.getNextParagraphEid(speechData.current.currentParagraphEid!, 'bottom');
                    const nextTlteEid = nextParagraphEid ? elementData.current[nextParagraphEid].tlteEid : null;

                    /* Restore original text of current TLTE */
                    restoreOriginalTextForCurrentTlteFunc();

                    /* If no next TLTE found */
                    if (!nextTlteEid) {
                        speaker.reset({ restoreOriginalTexts: true });
                        return
                    }

                    /* Read next paragraph */
                    readParagraphFunc(nextParagraphEid!, 'firstSentence');
                }
            };

        } catch (e: any) {
            logFunc('error', 'Err :: [speaker.play()] =>', e.message);
        }
    },

    /* Play prev */
    playPrev: (): API_RESPONSE_TYPE => {
        try {
            /* Prevent user to play prev */
            if (!canPlayPrev.current) return { ok: false, msg: null };

            /* Play next, only if speaker is 'idle' */
            const data = speechData.current;
            if (!['playing', 'paused'].includes(data.playerState)) return { ok: false, msg: null };

            /* 
            * Prevent to trigger another 'playPrev' while the current one is still running, 
            *   for example when user click quickly many times in the row. 
            * It ensures a smooth navigation behavior 
            */
            canPlayPrev.current = false;

            /* - */
            speechSynthesis.cancel();
            speechData.current.playerState = 'idle';

            /* - */
            const currentSentenceIsFirst = data.sentenceCount === 1 || data.currentSentenceIdx === 0;
            if (currentSentenceIsFirst) {
                /* Get prev paragraph eid */
                const prevParagraphEid = scanner.getNextParagraphEid(speechData.current.currentParagraphEid!, 'top');

                /* Disable current sentence highlight */
                disableCurrentSentenceHighlightFunc(data);

                /* Restore original text of current TLTE */
                restoreOriginalTextForCurrentTlteFunc();

                /* - */
                if (!prevParagraphEid) {
                    speaker.reset();
                    return { ok: false, msg: null };
                }

                /* Read last sentence of the prev paragraph */
                readParagraphFunc(prevParagraphEid, 'lastSentence');

            } else {
                /* Disable current sentence highlight */
                disableCurrentSentenceHighlightFunc(data);

                /* Get sentences eid of the current paragraph */
                const sentencesEid = elementData.current[data.currentParagraphEid!].sentencesEid!;

                /* Update current sentence index & eid */
                speechData.current.currentSentenceIdx -= 1;
                speechData.current.currentSentenceEid = sentencesEid[data.currentSentenceIdx];

                /* Read prev sentence */
                readSentenceFunc(data.currentSentenceEid!);
            }

            /* Allow user to play prev */
            setTimeout(() => { canPlayPrev.current = true }, 100);

            /* - */
            return { ok: true, msg: null };

        } catch (e: any) {
            const err = e.message;
            logFunc('error', 'Err :: [speaker.playPrev()] =>', err);
            canPlayPrev.current = true; /* Allow user to play prev */
            return { ok: false, msg: err };
        }
    },

    /* Play next */
    playNext: (): API_RESPONSE_TYPE => {
        try {
            /* Prevent user to play next */
            if (!canPlayNext.current) return { ok: false, msg: null };

            /* Play next, only if speaker is 'idle' */
            const data = speechData.current;
            if (!['playing', 'paused'].includes(data.playerState)) return { ok: false, msg: null };

            /* 
            * Prevent to trigger another 'playNext' while the current one is still running, 
            *   for example when user click quickly many times in the row. 
            * It ensures a smooth navigation behavior 
            */
            canPlayNext.current = false;

            /* - */
            speechSynthesis.cancel();
            speechData.current.playerState = 'idle';

            /* - */
            const currentSentenceIsLast = data.sentenceCount === 1 || data.sentenceCount - data.currentSentenceIdx === 1;
            if (currentSentenceIsLast) {
                /* Get next paragraph eid */
                const nextParagraphEid = scanner.getNextParagraphEid(speechData.current.currentParagraphEid!, 'bottom');

                /* Disable current sentence highlight */
                disableCurrentSentenceHighlightFunc(data);

                /* Restore original text of current TLTE */
                restoreOriginalTextForCurrentTlteFunc();

                /* - */
                if (!nextParagraphEid) {
                    speaker.reset();
                    return { ok: false, msg: null };
                }

                /* Read next paragraph */
                readParagraphFunc(nextParagraphEid, 'firstSentence');

            } else {
                /* Disable current sentence highlight */
                disableCurrentSentenceHighlightFunc(data);

                /* Get sentences eid of the current paragraph */
                const sentencesEid = elementData.current[data.currentParagraphEid!].sentencesEid!;

                /* Update current sentence index & eid */
                speechData.current.currentSentenceIdx += 1;
                speechData.current.currentSentenceEid = sentencesEid[data.currentSentenceIdx];

                /* Read next sentence */
                readSentenceFunc(data.currentSentenceEid!);
            }

            /* Allow user to play next */
            setTimeout(() => { canPlayNext.current = true }, 100);

            /* - */
            return { ok: true, msg: null };

        } catch (e: any) {
            const err = e.message;
            logFunc('error', 'Err :: [speaker.playNext()] =>', err);
            canPlayPrev.current = true; /* Allow user to play prev */
            return { ok: false, msg: err };
        }
    },

    /* Pause */
    pause: (): API_RESPONSE_TYPE => {
        try {
            speechData.current.playerState = 'paused';
            speechSynthesis.pause();
            return { ok: false, msg: null };

        } catch (e: any) {
            const err = e.message;
            logFunc('error', 'Err :: [speaker.pause()] =>', err);
            canPlayPrev.current = true; /* Allow user to play prev */
            return { ok: false, msg: err };
        }
    },

    /* Resume */
    resume: (): API_RESPONSE_TYPE => {
        try {
            speechData.current.playerState = 'playing';
            speechSynthesis.resume();
            return { ok: false, msg: null };

        } catch (e: any) {
            const err = e.message;
            logFunc('error', 'Err :: [speaker.play()] =>', err);
            canPlayPrev.current = true; /* Allow user to play prev */
            return { ok: false, msg: err };
        }
    },

    /* Stop */
    reset: (x?: { restoreOriginalTexts: boolean }): API_RESPONSE_TYPE => {
        try {
            /* Disable current sentence highlight */
            disableCurrentSentenceHighlightFunc(speechData.current);

            /* Stop speaker */
            speechSynthesis.cancel();

            /* Reset speech data */
            Object.assign(speechData.current, <SPEECH_DATA_TYPE>{
                playerState: 'idle',
                currentTopLevelTextElementEid: null,
                currentParagraphEid: null,
                currentSentenceEid: null,
                currentWordEid: null,
                currentSentenceWordsIdx: null,
                currentSentenceIdx: 0,
                currentWordIdx: 0,
                text: null
            });

            /* Disable current sentence highlight */
            disableCurrentSentenceHighlightFunc(speechData.current);

            /* Restore original text for all TLTE */
            if (x?.restoreOriginalTexts) restoreOriginalTextForAllTlteFunc();

            /* return */
            return { ok: false, msg: null };

        } catch (e: any) {
            const err = e.message;
            logFunc('error', 'Err :: [speaker.pause()] =>', err);
            canPlayPrev.current = true; /* Allow user to play prev */
            return { ok: false, msg: err };
        }
    }
};

/*
*
*
*
*
*
*
*/

/** Set padding-block */
const setPaddingBlockFunc = (target: HTMLElement): void => {
    try {
        const gap = getSpaceBetweenLinesFunc(target as Element);
        if (gap) target.style.paddingBlock = gap + 'px';

    } catch (e: any) {
        logFunc('log', 'Err :: [setPaddingBlockFunc] =>', e.message);
    }
};


/** Setup voices */
const setupVoicesFunc = (): void => {
    const voices: VOICE_TYPE[] = $win.speechSynthesis.getVoices(); /* Get local voices */
    const localVoices = voices.filter((e) => e.localService === true);
    const defaultVoice = voices.filter((e) => (e.lang).toLowerCase().includes(defaultLanguage.current))[0];
    voicesData.current = { all: localVoices, default: defaultVoice };
    // UIscripts.renderVoices();
};


/** Select element via "data-eid"  */
const selectElementFunc = (eid: string): Element | null => { return $doc.querySelector(`[data-eid="${eid}"]`) };


/** Setup a mutation observer */
const setupMutationObserverFunc = (target: HTMLElement): void => { };

/*
*
*
*
*
*
*/

/** Enable/Disable voicify */
// const toggleVoicifyFunc = (): void => {
//     try {
//         /* Prevent from multiple toggle in the row */
//         if (!canToggleVoicify.current) return;
//         canToggleVoicify.current = false;

//         /* - */
//         enable.current = !enable.current;

//         /* Get current focused element id */
//         const ceid = currentFocusedElementId.current;

//         /* On "enable" */
//         if (enable.current) {
//             /* Render "formattedText" inside the current focused element */
//             if (ceid && hasFocusFunc(ceid)) {
//                 const target = selectElementFunc(ceid);
//                 if (target) transformTextNodesFunc(target, 'formattedText');
//             }

//             /* Display notification */
//             // displayNotificationFunc('ON');
//         }

//         /* On "disable" */
//         else {
//             /* Render "originalText" inside the current focused element */
//             if (ceid) {
//                 const target = selectElementFunc(ceid);
//                 if (target) transformTextNodesFunc(target, 'originalText');
//             }

//             /* Display notification */
//             // displayNotificationFunc('OFF');
//         }

//         /* - */
//         setTimeout(() => { canToggleVoicify.current = true }, 1000);

//     } catch (e: any) {
//         logFunc('error', 'Err :: [toggleVoicifyFunc] =>', e.message);
//     }
// };


/** Show/Hide Control Panel */
const toggleControlPanelFunc = (): void => {
    try {
    } catch (e: any) {
        logFunc('error', 'Err :: [toggleControlPanelFunc] =>', e.message);
    }
};


/** Transform nodes */
const transformTextNodesFunc = (el: Element, textType: 'originalText' | 'formattedText'): void => {
    try {
        /* Get element's eid */
        const eid = (el as HTMLElement).dataset.eid;
        if (!eid) return; /* Stop function if no eid found */

        /* Extract 'textNodes' */
        const textNodes = elementData.current[eid].textNodes;
        if (!textNodes) return; /* Stop function if no text node found */

        /* Transform each text node */
        for (let key in textNodes) {
            const isNum = key === '0' || !!Number(key);
            /* Pure text node */
            if (isNum) {
                const nodeIdx = parseInt(key);
                const content = (textType === 'formattedText') ? convertToHTMLFunc(textNodes[key].formattedText!) as Node : textNodes[key].originalText!;
                if (content) el.childNodes[nodeIdx].replaceWith(content);
            }
            /* Element node */
            else {
                const childEl = selectElementFunc(key);
                if (!childEl) continue;

                const childNodes: any = textNodes[key];
                for (let idx in childNodes) {
                    const nodeIdx = parseInt(idx);
                    const content = (textType === 'formattedText') ? convertToHTMLFunc(childNodes[nodeIdx].formattedText!) as Node : childNodes[nodeIdx].originalText!;
                    if (content) childEl.childNodes[nodeIdx].replaceWith(content);
                }
            }
        }

        /* Set current text type */
        elementData.current[eid].currentTextType = textType;

    } catch (e: any) {
        logFunc('error', 'Err :: [transformTextNodesFunc] =>', e.message);
    }
};

/*
*
*
*
*
*
*
*/

/** UI scripts */
const UIscripts = {
    /** Get elements */
    prepareElements: () => {
        $notificationWidgetEl = $doc.getElementById('nw_scaffold')!;
        $controlPanelWidgetEl = $doc.getElementById('cpw_scaffold')!;
        $voiceContainerEl = $doc.getElementById('cpw_voice_container')!;
        $voiceListEl = $doc.getElementById('cpw_voice_list')!;
    },

    /** Show/Hide Control-Panel */
    showControlPanel: (x: boolean) => {
        // $controlPanelWidgetEl!.setAttribute('class', x ? 'cpw_scaffold_show' : 'cpw_scaffold_hide');
    },

    /** Show/Hide voices list */
    showVoicesList: (x: boolean) => {
        $voiceContainerEl!.style.transform = `translateX(${x ? '0%' : '100%'})`;
    },

    /** Render voices */
    renderVoices: () => {
        const voices = voicesData.current.all!.sort((a, b) => (a.default ? 1 : 0) - (b.default ? 1 : 0));

        /* Load voices if no voice found */
        if (!voices) {
            // setupVoicesFunc();
            return;
        }

        /* Render voices */
        $voiceListEl!.replaceChildren(''); /* Clear list before */
        voices.forEach((e) => { VoiceWidget({ id: generateIdFunc(), data: e }) });
    }
};

/*
*
*
*
*
*
*
*/

/** Watch TLTE */
const watchTopLevelTextElementFunc = (eid: string): void => {
    try {
        /* Select element */
        const target = selectElementFunc(eid) as HTMLElement;
        if (!target) return; /* Stop function if element not found */

        /* Check if target is already watched */
        // if (target.dataset.watched) return;
        // target.dataset.watched = '1';
        // target.dataset.tlte = '1';

        /* On "mouseenter" set the formatted text */
        target.addEventListener('mouseenter', () => {
            /* Set last mouse event */
            elementData.current[eid].lastMouseEvent = 'enter';

            /* Stop function if voicify is disabled */
            if (!enable.current) return;

            /* - */
            currentFocusedElementId.current = eid;

            /* Render "formattedText" */
            const targetData = elementData.current[eid];
            const ctype = targetData.contentType;
            const currentTextType = targetData.currentTextType;
            /* - */
            if (speechData.current.currentTopLevelTextElementEid === eid && speechData.current.playerState === 'playing') return;
            if (currentTextType === 'formattedText') return;
            /* - */
            transformTextNodesFunc(target, 'formattedText');
        });

        /* On "mouseleave" set the original text */
        target.addEventListener('mouseleave', () => {
            /* Set last mouse event */
            elementData.current[eid].lastMouseEvent = 'leave';

            /* Stop function if voicify is disabled */
            if (!enable.current) return;

            /* Render "originalText" */
            const targetData = elementData.current[eid];
            const ctype = targetData.contentType;
            const currentTextType = targetData.currentTextType;
            /* - */
            if (speechData.current.currentTopLevelTextElementEid === eid && speechData.current.playerState === 'playing') return;
            if (ctype === 'text_with_nested_not_inline_text_element' && speechData.current.playerState === 'playing') return;
            if (currentTextType === 'originalText') return;
            /* - */
            transformTextNodesFunc(target, 'originalText');
        });

    } catch (e: any) {
        logFunc('error', 'Err :: [watchTopLevelTextElementFunc] =>', e.message);
    }
};


/** Watch sentences */
const watchSentencesFunc = (target: HTMLElement, dataset: any): void => {
    try {
        // /* Check if target is already watched */
        // if (target.dataset.watched) return;
        // target.dataset.watched = '1';
        // target.dataset.sentence = '1';

        /* On click, read text */
        target.addEventListener('click', () => { prepareTextAndReadFunc({ type: 'sentence', el: target, resetSpeechData: true, force: true }) });

        /* On mouse enter */
        target.addEventListener('mouseenter', (e) => {
            setPaddingBlockFunc(target); /* Set padding-block */
        });


    } catch (e: any) {
        logFunc('error', 'Err :: [watchSentencesFunc] =>', e.message);
    }
};


/** Watch frags */
const watchFragsFunc = (target: HTMLElement, dataset: any): void => {
    try {
        const eid = dataset.eid;
        if (!eid) return; /* Quit function if the target has no 'eid' */

        // /* Check if target is already watched */
        // if (target.dataset.watched) return;
        // target.dataset.watched = '1';
        // target.dataset.frag = '1';

        /* On click, read text */
        target.addEventListener('click', () => { prepareTextAndReadFunc({ type: 'frag', el: target, resetSpeechData: true, force: true }) });

        /* On mouse enter */
        target.addEventListener('mouseenter', (e) => {
            setPaddingBlockFunc(target);  /* Set padding-block */
        });

    } catch (e: any) {
        logFunc('error', 'Err :: [watchFragsFunc] =>', e.message);
    }
};


/** Watch words */
const watchWordsFunc = (target: HTMLElement, dataset: any): void => {
    try {
        const eid = dataset.eid;
        if (!eid) return; /* Quit function if the target has no 'eid' */

        // /* Check if target is already watched */
        // if (target.dataset.watched) return;
        // target.dataset.watched = '1';
        // target.dataset.word = '1';

        /* Get parent */
        const parent = target.parentElement!;
        const parentSentenceEid = parent.dataset.eid;

        /* Attach click event */
        target.addEventListener('click', (e: Event) => { prepareTextAndReadFunc({ type: 'word', el: target as Element, resetSpeechData: true, force: true }) });

        // /* On mouse enter */
        // target.addEventListener('mouseenter', (e) => {
        //     /* Set padding-block */
        //     setPaddingBlockFunc(target.parentElement!);
        // });

    } catch (e: any) {
        logFunc('error', 'Err :: [watchWordsFunc] =>', e.message);
    }
};


/** Watch element hovered by the mouse */
const watchHoveredElementFunc = (): void => {
    /* Get the current element hovered by the mouse */
    const { cx, cy } = mouseCoords.current;
    const el: HOVERED_ELEMENT_TYPE = $doc.elementFromPoint(cx, cy);
    if (!el) return; /* stop funciton if element not found */

    /* Setup watchers */
    const target = el as HTMLElement;
    const tag = target.tagName.toLowerCase();
    switch (tag) {
        case 'v-word': { watchWordsFunc(target, target.dataset) } break;

        case 'v-sentence': { watchSentencesFunc(target, target.dataset) } break;

        case 'v-frag': { watchFragsFunc(target, target.dataset) } break;

        default: { };
    };
};

/*
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
*/

/* ------------------------------- Events ------------------------------- */

const voicify: VOICIFY_TYPE = {
    init: (x?: INIT_ARG) => {
        /* On load */
        $win.onload = () => {
            /* Init scanner */
            scanner.init();

            /* Scan page */
            setTimeout(() => { scanOnFrameAnimationFunc() }, 100);

            /* Setup voices */
            setTimeout(() => { setupVoicesFunc() }, 100);

            /* Listen to voice change */
            $win.speechSynthesis.onvoiceschanged = () => { };

            /* Get UI elements */
            UIscripts.prepareElements();

            /* - */
            const btn = $doc.getElementById('btn');
            if (btn) btn.addEventListener('click', () => { setTimeout(() => { speaker.reset() }, 10) });

            /* Update scanner on resize */
            $win.addEventListener('resize', () => {
                winDim.current.width = $win.innerWidth;
                winDim.current.height = $win.innerHeight;
                scanner.init();
            });

            /* Detect mouse coords */
            $win.addEventListener('mousemove', (x: MouseEvent) => {
                mouseCoords.current = { cx: x.clientX, cy: x.clientY };

                /* - */
                if (visibleWidget.current.activationStatus) {
                    $notificationWidgetEl!.style.left = (mouseCoords.current.cx + 20) + 'px';
                    $notificationWidgetEl!.style.top = (mouseCoords.current.cy - 10) + 'px';
                }
            });

            /* Detect current element hovered by the mouse */
            $win.addEventListener('mouseover', (x: MouseEvent) => {
                mouseCoords.current = { cx: x.clientX, cy: x.clientY }; /* update mouse coords */
                enable.current && watchHoveredElementFunc();
            });

            /* Detect "keydown" event */
            $win.addEventListener('keydown', (e: KeyboardEvent) => {
                const key = getPressedKeyFunc(e);
                let unknownKey = false;
                switch (key) {
                    case 'shift': { } break;

                    case 'cmd': { } break;
                    case 'crtl': { } break;

                    case 'alt': { } break;

                    case 'up': { } break;
                    case 'down': { } break;
                    case 'left': { } break;
                    case 'right': { } break;
                    default: { unknownKey = true };
                };
                currentKeyDown.current = key;
                if (unknownKey) currentKeyDown.current = null;
            });

            /* Detect "keyup" event */
            $win.addEventListener('keyup', (e: KeyboardEvent) => {
                const key = getPressedKeyFunc(e);
                if (key === currentKeyDown.current) currentKeyDown.current = null;
                switch (key) {
                    /* Activate/Disactivate voicify */
                    case 'shift': {
                        //  toggleVoicifyFunc() 
                    } break;

                    /* Play text */
                    case 'cmd': { playTextFunc() } break;
                    case 'crtl': { playTextFunc() } break;
                    case 'control': { playTextFunc() } break;

                    /* Show Control-Panel */
                    case 'alt': { UIscripts.showControlPanel(true) } break;

                    /* Play 'prev' sentence/paragragh */
                    case 'up': { speaker.playPrev() } break;
                    case 'left': { speaker.playPrev() } break;

                    /* Play 'next' sentence/paragragh */
                    case 'down': { speaker.playNext() } break;
                    case 'right': { speaker.playNext() } break;

                    /* - */
                    default: { };
                };
            });

            /* Just before the page reload  */
            $win.addEventListener('beforeunload', () => { speechData.current.playerState === 'playing' && speaker.reset() });

            /* Unload or navigation */
            $win.addEventListener('pagehide', () => { speechData.current.playerState === 'playing' && speaker.pause() });

            /* On tab blur */
            $doc.addEventListener('visibilitychange', () => { speechData.current.playerState === 'playing' && speaker.pause() })

            /* - */
            enable.current = true;
        };

    },
    playerState: (): PLAYER_STATE => { return speechData.current.playerState },
    resume: (): API_RESPONSE_TYPE => { return speaker.resume() },
    pause: (): API_RESPONSE_TYPE => { return speaker.pause() },
    playPrev: (): API_RESPONSE_TYPE => { return speaker.playPrev() },
    playNext: (): API_RESPONSE_TYPE => { return speaker.playNext() },
    cancel: (): API_RESPONSE_TYPE => { return speaker.reset() },
    showControlPanel: () => { },
    displayNotification: () => { }
};

voicify.init();
//export default voicify;
