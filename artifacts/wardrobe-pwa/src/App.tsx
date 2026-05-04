import { useState } from "react";
import "./wardrobe.css";

const CATALOG = [
  {id:'standard-tee',slot:'inner',subCat:'Inner Layer',fit:'regular',label:'Standard Tee',tags:['regular','basics','versatile','everyday']},
  {id:'regular-fit-tee',slot:'inner',subCat:'Inner Layer',fit:'regular',label:'Regular Fit Tee',tags:['regular','basics','versatile']},
  {id:'slim-fit-tee',slot:'inner',subCat:'Inner Layer',fit:'slim',label:'Slim Fit Tee',tags:['slim','fitted','clean']},
  {id:'body-fit-tee',slot:'inner',subCat:'Inner Layer',fit:'slim',label:'Body Fit Tee',tags:['slim','fitted','athletic']},
  {id:'relaxed-fit-tee',slot:'inner',subCat:'Inner Layer',fit:'relaxed',label:'Relaxed Fit Tee',tags:['relaxed','comfortable','casual']},
  {id:'soft-loose-tee',slot:'inner',subCat:'Inner Layer',fit:'relaxed',label:'Soft Loose Tee',tags:['relaxed','soft','casual']},
  {id:'oversized-tee',slot:'inner',subCat:'Inner Layer',fit:'oversized',label:'Oversized Tee',tags:['oversized','streetwear','boxy']},
  {id:'drop-shoulder-tee',slot:'inner',subCat:'Inner Layer',fit:'oversized',label:'Drop Shoulder Tee',tags:['oversized','streetwear','drop-shoulder']},
  {id:'street-oversized-tee',slot:'inner',subCat:'Inner Layer',fit:'oversized',label:'Street Oversized Tee',tags:['oversized','streetwear','statement']},
  {id:'boxy-tee',slot:'inner',subCat:'Inner Layer',fit:'boxy',label:'Boxy Tee',tags:['boxy','streetwear','heavyweight']},
  {id:'cropped-boxy-tee',slot:'inner',subCat:'Inner Layer',fit:'boxy',label:'Cropped Boxy Tee',tags:['boxy','cropped','streetwear']},
  {id:'longline-tee',slot:'inner',subCat:'Inner Layer',fit:'longline',label:'Longline Tee',tags:['longline','extended','layering']},
  {id:'extended-tee',slot:'inner',subCat:'Inner Layer',fit:'longline',label:'Extended Tee',tags:['longline','layering','minimal']},
  {id:'classic-shirt',slot:'outer',subCat:'Shirting',label:'Classic Shirt',tags:['shirt','smart-casual','button-up','versatile']},
  {id:'flannel-shirt',slot:'outer',subCat:'Shirting',label:'Flannel Shirt',tags:['shirt','flannel','casual','layering','autumn']},
  {id:'linen-shirt',slot:'outer',subCat:'Shirting',label:'Linen Shirt',tags:['shirt','linen','summer','breathable','relaxed']},
  {id:'short-sleeve-button',slot:'outer',subCat:'Shirting',label:'Short Sleeve Button-Up',tags:['shirt','button-up','summer','casual']},
  {id:'shacket',slot:'outer',subCat:'Overshirt',label:'Shacket',tags:['overshirt','shacket','layering','casual','transitional']},
  {id:'utility-shirt',slot:'outer',subCat:'Overshirt',label:'Utility Shirt',tags:['overshirt','utility','layering','workwear']},
  {id:'heavy-flannel',slot:'outer',subCat:'Overshirt',label:'Heavy Flannel',tags:['overshirt','flannel','heavyweight','layering','autumn']},
  {id:'canvas-overshirt',slot:'outer',subCat:'Overshirt',label:'Canvas Overshirt',tags:['overshirt','canvas','workwear','structured','layering']},
  {id:'cardigan',slot:'outer',subCat:'Knitwear',label:'Cardigan',tags:['knit','cardigan','layering','smart-casual','autumn']},
  {id:'knit-sweater',slot:'outer',subCat:'Knitwear',label:'Knit Sweater',tags:['knit','sweater','warm','casual']},
  {id:'zip-knit',slot:'outer',subCat:'Knitwear',label:'Zip Knit',tags:['knit','zip','sporty','layering']},
  {id:'pullover-sweater',slot:'outer',subCat:'Knitwear',label:'Pullover Sweater',tags:['knit','pullover','warm','minimal']},
  {id:'pullover-hoodie',slot:'outer',subCat:'Sweats',label:'Pullover Hoodie',tags:['sweats','hoodie','casual','streetwear']},
  {id:'zip-hoodie',slot:'outer',subCat:'Sweats',label:'Zip Hoodie',tags:['sweats','hoodie','zip','casual','layering']},
  {id:'sweatshirt',slot:'outer',subCat:'Sweats',label:'Sweatshirt',tags:['sweats','crewneck','casual','streetwear']},
  {id:'crewneck-sweater',slot:'outer',subCat:'Sweats',label:'Crewneck Sweater',tags:['sweats','crewneck','minimal','clean']},
  {id:'denim-jacket',slot:'outer',subCat:'Jacket',label:'Denim Jacket',tags:['jacket','denim','casual','iconic','transitional']},
  {id:'bomber-jacket',slot:'outer',subCat:'Jacket',label:'Bomber Jacket',tags:['jacket','bomber','streetwear','casual']},
  {id:'coach-jacket',slot:'outer',subCat:'Jacket',label:'Coach Jacket',tags:['jacket','coach','sporty','streetwear','light']},
  {id:'leather-jacket',slot:'outer',subCat:'Jacket',label:'Leather Jacket',tags:['jacket','leather','statement','edgy','iconic']},
  {id:'windbreaker',slot:'outer',subCat:'Jacket',label:'Windbreaker',tags:['jacket','windbreaker','sporty','lightweight','functional']},
  {id:'casual-blazer',slot:'outer',subCat:'Blazer',label:'Casual Blazer',tags:['blazer','smart-casual','tailored','elevated']},
  {id:'structured-blazer',slot:'outer',subCat:'Blazer',label:'Structured Blazer',tags:['blazer','formal','structured','tailored']},
  {id:'unstructured-blazer',slot:'outer',subCat:'Blazer',label:'Unstructured Blazer',tags:['blazer','relaxed','smart-casual','soft']},
  {id:'trench-coat',slot:'outer',subCat:'Coat',label:'Trench Coat',tags:['coat','trench','classic','formal','rain']},
  {id:'wool-coat',slot:'outer',subCat:'Coat',label:'Wool Coat',tags:['coat','wool','formal','winter','tailored']},
  {id:'parka',slot:'outer',subCat:'Coat',label:'Parka',tags:['coat','parka','winter','heavy','functional']},
  {id:'puffer-jacket',slot:'outer',subCat:'Coat',label:'Puffer Jacket',tags:['jacket','puffer','winter','warm','casual']},
  {id:'overcoat',slot:'outer',subCat:'Coat',label:'Overcoat',tags:['coat','overcoat','formal','winter','classic']},
  {id:'slim-jeans',slot:'bottom',subCat:'Denim',fit:'slim',label:'Slim Jeans',tags:['jeans','denim','slim','versatile']},
  {id:'regular-jeans',slot:'bottom',subCat:'Denim',fit:'regular',label:'Regular Jeans',tags:['jeans','denim','regular','classic']},
  {id:'straight-jeans',slot:'bottom',subCat:'Denim',fit:'straight',label:'Straight Jeans',tags:['jeans','denim','straight','clean']},
  {id:'loose-jeans',slot:'bottom',subCat:'Denim',fit:'loose',label:'Loose Jeans',tags:['jeans','denim','relaxed','streetwear']},
  {id:'wide-leg-jeans',slot:'bottom',subCat:'Denim',fit:'wide-leg',label:'Wide Leg Jeans',tags:['jeans','denim','wide-leg','statement']},
  {id:'slim-chinos',slot:'bottom',subCat:'Chinos',fit:'slim',label:'Slim Chinos',tags:['chinos','smart-casual','slim','versatile']},
  {id:'regular-chinos',slot:'bottom',subCat:'Chinos',fit:'regular',label:'Regular Chinos',tags:['chinos','smart-casual','regular','everyday']},
  {id:'relaxed-chinos',slot:'bottom',subCat:'Chinos',fit:'relaxed',label:'Relaxed Chinos',tags:['chinos','relaxed','casual','comfortable']},
  {id:'tailored-trousers',slot:'bottom',subCat:'Trousers',fit:'tailored',label:'Tailored Trousers',tags:['trousers','formal','tailored','smart']},
  {id:'pleated-trousers',slot:'bottom',subCat:'Trousers',fit:'pleated',label:'Pleated Trousers',tags:['trousers','formal','pleated','classic']},
  {id:'straight-trousers',slot:'bottom',subCat:'Trousers',fit:'straight',label:'Straight Trousers',tags:['trousers','smart-casual','straight','clean']},
  {id:'wide-leg-trousers',slot:'bottom',subCat:'Trousers',fit:'wide-leg',label:'Wide Leg Trousers',tags:['trousers','wide-leg','statement','relaxed']},
  {id:'slim-cargo',slot:'bottom',subCat:'Cargo',fit:'slim',label:'Slim Cargo Pants',tags:['cargo','utility','slim','functional']},
  {id:'regular-cargo',slot:'bottom',subCat:'Cargo',fit:'regular',label:'Regular Cargo Pants',tags:['cargo','utility','regular','workwear']},
  {id:'baggy-cargo',slot:'bottom',subCat:'Cargo',fit:'baggy',label:'Baggy Cargo Pants',tags:['cargo','streetwear','baggy','statement']},
  {id:'tech-pants',slot:'bottom',subCat:'Utility',label:'Tech Pants',tags:['utility','tech','functional','modern']},
  {id:'parachute-pants',slot:'bottom',subCat:'Utility',label:'Parachute Pants',tags:['utility','streetwear','relaxed','statement']},
  {id:'nylon-pants',slot:'bottom',subCat:'Utility',label:'Nylon Pants',tags:['utility','nylon','sporty','lightweight']},
  {id:'track-pants',slot:'bottom',subCat:'Utility',label:'Track Pants',tags:['utility','sporty','casual','athletic']},
  {id:'slim-joggers',slot:'bottom',subCat:'Activewear',fit:'slim',label:'Slim Joggers',tags:['joggers','athletic','slim','casual']},
  {id:'regular-joggers',slot:'bottom',subCat:'Activewear',fit:'regular',label:'Regular Joggers',tags:['joggers','athletic','regular','comfortable']},
  {id:'oversized-sweatpants',slot:'bottom',subCat:'Activewear',fit:'oversized',label:'Oversized Sweatpants',tags:['joggers','streetwear','oversized','relaxed']},
  {id:'cuffed-joggers',slot:'bottom',subCat:'Activewear',fit:'cuffed',label:'Cuffed Joggers',tags:['joggers','athletic','cuffed','clean']},
  {id:'denim-shorts',slot:'bottom',subCat:'Shorts',label:'Denim Shorts',tags:['shorts','denim','casual','summer']},
  {id:'chino-shorts',slot:'bottom',subCat:'Shorts',label:'Chino Shorts',tags:['shorts','chinos','smart-casual','summer']},
  {id:'cargo-shorts',slot:'bottom',subCat:'Shorts',label:'Cargo Shorts',tags:['shorts','cargo','utility','casual']},
  {id:'sweat-shorts',slot:'bottom',subCat:'Shorts',label:'Sweat Shorts',tags:['shorts','sweats','athletic','casual']},
  {id:'baseball-cap',slot:'acc',subCat:'Headwear',label:'Baseball Cap',tags:['cap','casual','streetwear','everyday']},
  {id:'beanie',slot:'acc',subCat:'Headwear',label:'Beanie',tags:['beanie','winter','casual','streetwear']},
  {id:'bucket-hat',slot:'acc',subCat:'Headwear',label:'Bucket Hat',tags:['hat','casual','streetwear','summer']},
  {id:'snapback',slot:'acc',subCat:'Headwear',label:'Snapback',tags:['cap','streetwear','statement']},
  {id:'fedora',slot:'acc',subCat:'Headwear',label:'Fedora',tags:['hat','formal','statement','classic']},
  {id:'sunglasses',slot:'acc',subCat:'Eyewear',label:'Sunglasses',tags:['glasses','summer','statement','classic']},
  {id:'optical-glasses',slot:'acc',subCat:'Eyewear',label:'Optical Glasses',tags:['glasses','everyday','smart']},
  {id:'rimless-glasses',slot:'acc',subCat:'Eyewear',label:'Rimless Glasses',tags:['glasses','minimal','clean']},
  {id:'sports-shades',slot:'acc',subCat:'Eyewear',label:'Sports Shades',tags:['glasses','sporty','athletic','functional']},
  {id:'necklace',slot:'acc',subCat:'Neckwear',label:'Necklace',tags:['necklace','jewelry','casual']},
  {id:'chain',slot:'acc',subCat:'Neckwear',label:'Chain',tags:['chain','jewelry','streetwear','statement']},
  {id:'pendant',slot:'acc',subCat:'Neckwear',label:'Pendant',tags:['pendant','jewelry','minimal','personal']},
  {id:'scarf',slot:'acc',subCat:'Neckwear',label:'Scarf',tags:['scarf','winter','layering','classic']},
  {id:'watch',slot:'acc',subCat:'Wrist',label:'Watch',tags:['watch','classic','smart-casual','functional']},
  {id:'bracelet',slot:'acc',subCat:'Wrist',label:'Bracelet',tags:['bracelet','casual','layering','minimal']},
  {id:'wristband',slot:'acc',subCat:'Wrist',label:'Wristband',tags:['wristband','sporty','casual','athletic']},
  {id:'leather-belt',slot:'acc',subCat:'Belt',label:'Leather Belt',tags:['belt','leather','classic','formal','versatile']},
  {id:'fabric-belt',slot:'acc',subCat:'Belt',label:'Fabric Belt',tags:['belt','fabric','casual','relaxed']},
  {id:'canvas-belt',slot:'acc',subCat:'Belt',label:'Canvas Belt',tags:['belt','canvas','casual','utility']},
  {id:'statement-belt',slot:'acc',subCat:'Belt',label:'Statement Belt',tags:['belt','statement','fashion','bold']},
  {id:'backpack',slot:'acc',subCat:'Bag',label:'Backpack',tags:['bag','backpack','functional','everyday']},
  {id:'sling-bag',slot:'acc',subCat:'Bag',label:'Sling Bag',tags:['bag','sling','streetwear','compact']},
  {id:'tote-bag',slot:'acc',subCat:'Bag',label:'Tote Bag',tags:['bag','tote','casual','minimal']},
  {id:'messenger-bag',slot:'acc',subCat:'Bag',label:'Messenger Bag',tags:['bag','messenger','functional','urban']},
  {id:'waist-bag',slot:'acc',subCat:'Bag',label:'Waist Bag',tags:['bag','waist','streetwear','compact','utility']},
  {id:'rings',slot:'acc',subCat:'Jewelry',label:'Rings',tags:['ring','jewelry','minimal','stacking']},
  {id:'earrings',slot:'acc',subCat:'Jewelry',label:'Earrings',tags:['earring','jewelry','statement','casual']},
  {id:'minimal-studs',slot:'acc',subCat:'Jewelry',label:'Minimal Studs',tags:['earring','jewelry','minimal','clean']},
  {id:'statement-rings',slot:'acc',subCat:'Jewelry',label:'Statement Rings',tags:['ring','jewelry','statement','bold']},
];

const COLOR_PALETTE = [
  {name:'White',hex:'#f0f0ec',group:'neutral'},{name:'Ivory',hex:'#f0ead8',group:'neutral'},{name:'Off-white',hex:'#ede8dc',group:'neutral'},
  {name:'Black',hex:'#1a1a1a',group:'dark'},{name:'Charcoal',hex:'#3a3a3a',group:'dark'},{name:'Navy',hex:'#1a2a4a',group:'dark'},{name:'Dark grey',hex:'#4a4a4a',group:'dark'},
  {name:'Olive',hex:'#6b7c45',group:'earth'},{name:'Brown',hex:'#8b6f4e',group:'earth'},{name:'Beige',hex:'#d6c5a8',group:'earth'},{name:'Sand',hex:'#d4b896',group:'earth'},
  {name:'Cream',hex:'#f0ead0',group:'earth'},{name:'Tan',hex:'#c4a882',group:'earth'},{name:'Khaki',hex:'#bfb28a',group:'earth'},{name:'Camel',hex:'#c4956a',group:'earth'},
  {name:'Terracotta',hex:'#c1634a',group:'earth'},{name:'Rust',hex:'#b35030',group:'earth'},{name:'Grey',hex:'#9a9a9a',group:'earth'},
  {name:'Red',hex:'#cc2222',group:'bold'},{name:'Blue',hex:'#2255aa',group:'bold'},{name:'Green',hex:'#228844',group:'bold'},{name:'Yellow',hex:'#ddcc22',group:'bold'},
  {name:'Orange',hex:'#e07820',group:'bold'},{name:'Purple',hex:'#6633aa',group:'bold'},{name:'Pink',hex:'#dd4488',group:'bold'},{name:'Teal',hex:'#228899',group:'bold'},
  {name:'Mustard',hex:'#cc9922',group:'bold'},{name:'Burgundy',hex:'#7a1c30',group:'bold'},{name:'Cobalt',hex:'#1144cc',group:'bold'},{name:'Emerald',hex:'#1a6644',group:'bold'},
];

const PRESET_INNER_CARDS = [
  {val:'White tee',dot:'#f5f5f0',sub:'Most versatile \u2014 works with everything'},
  {val:'Cream tee',dot:'#f0ead0',sub:'Warmer tone, great under brown layers'},
  {val:'Black tee',dot:'#2a2a2a',sub:'WI contrast \u2014 strong under light layers'},
  {val:'Sand structured shirt',dot:'#d4b896',sub:'Also works as outer layer (Pan)'},
];
const PRESET_OUTER_CARDS = [
  {val:'Cream linen shirt',dot:'#f0ead0',sub:'Open as overshirt'},
  {val:'Washed brown overshirt',dot:'#8b6f4e',sub:'Tonal stack layer'},
  {val:'Beige textured overshirt',dot:'#d6c5a8',sub:'WI contrast over black'},
  {val:'None',dot:null,sub:'Single layer fit'},
];
const PRESET_BOTTOM_CARDS = [
  {val:'Olive chinos',dot:'#6b7c45',label:'Olive chinos'},
  {val:'Olive straight trousers',dot:'#5a6b38',label:'Olive trousers'},
  {val:'Dark olive trousers',dot:'#3d4a28',label:'Dark olive trousers'},
  {val:'Dark grey trousers',dot:'#4a4a4a',label:'Dark grey trousers'},
  {val:'Black straight jeans',dot:'#1a1a1a',label:'Black jeans'},
];

const CONCEPTS: Record<string, string> = {
  'White tee|None|Olive chinos':'Go \u2014 effortless daily',
  'White tee|None|Olive straight trousers':'Tone on tone',
  'White tee|None|Dark olive trousers':'Go \u2014 effortless daily',
  'White tee|None|Black straight jeans':'Damin look',
  'White tee|None|Dark grey trousers':'Pan \u2014 clean sharpness',
  'Black tee|Beige textured overshirt|Olive straight trousers':'WI \u2014 contrast layer',
  'Black tee|Beige textured overshirt|Black straight jeans':'WI \u2014 dark on dark',
  'Cream tee|Washed brown overshirt|Dark olive trousers':'Tone on tone stack',
  'White tee|Cream linen shirt|Olive straight trousers':'Layered tone on tone',
  'White tee|Sand structured shirt|Dark grey trousers':'Pan \u2014 sharp layer',
  'Sand structured shirt|None|Dark grey trousers':'Pan \u2014 standalone sharp',
};

const BOLD_COLORS = ['red','blue','green','yellow','orange','purple','pink','teal','turquoise','cyan','aqua','magenta','fuchsia','violet','indigo','maroon','burgundy','crimson','scarlet','coral','salmon','peach','mustard','gold','amber','lime','chartreuse','cobalt','azure','cerulean','sapphire','neon','bright','electric','fluorescent','vivid','bold','hot pink','rose','raspberry','tangerine','pumpkin','emerald','jade','ultramarine'];
const DARK_COLORS = ['black','dark','charcoal','navy','deep'];
const EARTH_COLORS = ['olive','brown','beige','sand','cream','tan','khaki','terracotta','rust','camel','warm','grey','gray'];
const NEUTRAL_COLORS = ['white','ivory','off-white'];
const ALL_KNOWN = [...BOLD_COLORS,...DARK_COLORS,...EARTH_COLORS,...NEUTRAL_COLORS];

function detectColors(s: string | null): string[] { if(!s) return []; const x=s.toLowerCase(); return ALL_KNOWN.filter(c=>x.includes(c)); }
function isRecognized(s: string | null): boolean { if(!s) return true; return ALL_KNOWN.some(c=>s.toLowerCase().includes(c)); }
function isBold(s: string | null): boolean { if(!s) return false; if(BOLD_COLORS.some(c=>s.toLowerCase().includes(c))) return true; if(!isRecognized(s)) return true; return false; }
function isDark(s: string | null): boolean { return !!s && DARK_COLORS.some(c=>s.toLowerCase().includes(c)); }
function isEarth(s: string | null): boolean { return !!s && EARTH_COLORS.some(c=>s.toLowerCase().includes(c)); }
function isNeutral(s: string | null): boolean { return !!s && NEUTRAL_COLORS.some(c=>s.toLowerCase().includes(c)); }
function isSafe(s: string | null): boolean { return isEarth(s)||isNeutral(s)||isDark(s); }

interface OutfitState {
  inner: string|null; outer: string|null; bottom: string|null;
  sock: string|null; shoe: string|null; acc: string|null;
}

function getBoldPieces(st: OutfitState) {
  const p: {label:string,val:string}[] = [];
  if(isBold(st.inner)) p.push({label:'inner top',val:st.inner!});
  if(isBold(st.outer)&&st.outer&&st.outer!=='None') p.push({label:'outer layer',val:st.outer!});
  if(isBold(st.bottom)) p.push({label:'bottom',val:st.bottom!});
  if(st.shoe&&isBold(st.shoe)) p.push({label:'shoes',val:st.shoe!});
  return p;
}

function getConcept(st: OutfitState): string {
  const {inner:i,outer:o,bottom:b} = st;
  if(!i||!b) return '';
  const key = i+'|'+(o||'None')+'|'+b;
  if(CONCEPTS[key]) return CONCEPTS[key];
  const h = !!(o&&o!=='None');
  const iBold=isBold(i),iDark=isDark(i),iEarth=isEarth(i),iNeutral=isNeutral(i);
  const oBold=h&&isBold(o),oDark=h&&isDark(o),oEarth=h&&isEarth(o);
  const bBold=isBold(b),bDark=isDark(b),bEarth=isEarth(b);
  if(iBold&&oDark) return 'Pointing Down \u2014 bold top grounded by dark layer';
  if(bBold&&iDark) return 'Pointing Down \u2014 bold bottom, dark top';
  if(iBold&&!h) return 'Bold statement \u2014 needs grounding';
  if(oBold&&iDark) return 'Reversed layer \u2014 bold outer, dark inner';
  if(iBold||bBold||oBold) return 'Bold piece \u2014 check balance below';
  if(iDark&&bDark&&!h) return 'All dark \u2014 needs a break';
  if(iDark&&oEarth&&bEarth) return 'WI \u2014 dark inside, earth tones outside';
  if(iDark&&oEarth) return 'WI \u2014 contrast layer';
  if(iDark&&bEarth) return 'WI \u2014 dark top, earth bottom';
  if(iDark&&bDark&&h) return 'Dark base \u2014 outer adds break';
  if(iNeutral&&bDark&&!h) return 'Clean contrast \u2014 white and dark';
  if(iNeutral&&bDark&&h) return 'White base, dark grounded, layered';
  if(iNeutral&&bEarth&&oEarth) return 'Layered tone on tone';
  if(iNeutral&&bEarth) return 'White base, earth grounding';
  if(iNeutral&&h&&oEarth) return 'White + earth stack';
  if(iEarth&&oEarth&&bEarth) return 'Full tonal earth stack';
  if(iEarth&&oEarth) return 'Tone on tone stack';
  if(iEarth&&bEarth) return 'Tone on tone';
  if(i&&i.toLowerCase().includes('sand')) return 'Pan \u2014 sharpness';
  if(h) return 'Layered outfit';
  return 'Neutral base';
}

function checkBalance(st: OutfitState): {ok:boolean,msg:string} {
  const o=st.outer, hasOuter=!!(o&&o!=='None');
  const bp=getBoldPieces(st), bc=bp.length, bn=bp.map(p=>p.label+' ('+p.val+')');
  if(bc>=3) return {ok:false,msg:'Too many bold pieces \u2014 '+bn.join(', ')+'. Keep one statement piece and neutralize the rest.'};
  if(bc===2&&!hasOuter) return {ok:false,msg:bn.join(' and ')+' are both bold with no layer \u2014 add a dark overshirt to apply Pointing Down.'};
  if(bc===2&&hasOuter&&isDark(o)) return {ok:true,msg:'Pointing Down applied \u2014 dark layer balances '+bn.join(' and ')+'.'};
  if(bc===2&&hasOuter&&!isDark(o)) return {ok:false,msg:bn.join(' and ')+' are both bold \u2014 your outer layer ('+o+') isn\'t dark enough. Swap it for black, charcoal, or navy.'};
  if(bc===1) {
    const p=bn[0];
    if(hasOuter&&isDark(o)) return {ok:true,msg:'Pointing Down working \u2014 dark outer layer grounds the '+p+'.'};
    if(!hasOuter) return {ok:false,msg:p+' is a bold piece \u2014 add a dark outer layer to apply Pointing Down, or swap it for a neutral.'};
    if(hasOuter&&!isDark(o)) return {ok:false,msg:p+' is bold but your outer layer ('+o+') isn\'t dark enough \u2014 try black, charcoal, or navy.'};
  }
  const {inner:i,bottom:b} = st;
  if(isDark(i)&&isDark(b)&&!hasOuter) return {ok:false,msg:'Inner top ('+i+') and bottom ('+b+') are both very dark \u2014 add a lighter layer or swap one piece to break it up.'};
  if(hasOuter&&detectColors(i)[0]&&detectColors(i)[0]===detectColors(o)[0]) return {ok:false,msg:'Inner top and outer layer are the same color \u2014 vary the depth or pick a different shade.'};
  if(st.sock&&(isEarth(i)||isNeutral(i))&&isEarth(b)) return {ok:true,msg:'Point accent activated \u2014 socks doing the right job on a neutral base.'};
  if(isDark(i)&&isEarth(o)&&isEarth(b)) return {ok:true,msg:'WI contrast working \u2014 dark inside, warm earth tones outside.'};
  const main=[i,hasOuter?o:null,b].filter(Boolean) as string[];
  const allSafe=main.every(p=>isSafe(p));
  if(allSafe&&isEarth(b)) return {ok:true,msg:'Balanced earth tone combo \u2014 good to go.'};
  if(allSafe&&isNeutral(i)&&isDark(b)) return {ok:true,msg:'Clean contrast \u2014 white and dark balance each other well.'};
  if(allSafe) return {ok:true,msg:'All pieces are neutral / earth / dark \u2014 combo looks balanced.'};
  const unknown=[i,hasOuter?o:null,b,st.shoe].filter(p=>p&&p!=='None'&&!isRecognized(p));
  if(unknown.length) return {ok:false,msg:'Unrecognized color in: '+unknown.join(', ')+' \u2014 double-check the piece\'s color to confirm it\'s balanced.'};
  return {ok:true,msg:'Combo looks balanced \u2014 good to go.'};
}

function buildPrompt(st: OutfitState): string {
  const i=st.inner, o=st.outer&&st.outer!=='None'?st.outer+' worn open as overshirt,':'';
  const b=st.bottom, shoes=st.shoe||'grey New Balance sneakers';
  const sock=st.sock?'terracotta socks,':'', acc=st.acc?st.acc+',':'';
  return ('Full body, young Southeast Asian male, slim, '+i+', '+o+' '+b+', '+shoes+', '+sock+' '+acc+' Bali outdoor setting, natural light, earth tone street style, editorial photography, 35mm').replace(/\s+/g,' ').trim();
}

function shuffle<T>(arr: T[]): T[] {
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

const PRESET_INNER_VALS = ['White tee','Cream tee','Black tee','Sand structured shirt'];
const PRESET_OUTER_VALS = ['Cream linen shirt','Washed brown overshirt','Beige textured overshirt','None'];
const PRESET_BOTTOM_VALS = ['Olive chinos','Olive straight trousers','Dark olive trousers','Dark grey trousers','Black straight jeans'];

function allCombos() {
  const out: {inner:string,outer:string,bottom:string}[] = [];
  for(const i of PRESET_INNER_VALS) for(const o of PRESET_OUTER_VALS) for(const b of PRESET_BOTTOM_VALS) out.push({inner:i,outer:o,bottom:b});
  return shuffle(out);
}

function getSubCats(slot: string): string[] {
  const seen = new Set<string>();
  CATALOG.filter(i=>i.slot===slot).forEach(i=>seen.add(i.subCat));
  return [...seen];
}

interface CatalogItem { id:string; slot:string; subCat:string; fit?:string; label:string; tags:string[]; fullLabel:string; colorHex:string|null; }

function filterCatalog(slot:string, subCat:string|null, query:string, color:{name:string,hex:string}|null): CatalogItem[] {
  const q=query.trim().toLowerCase();
  let items=CATALOG.filter(i=>i.slot===slot);
  if(subCat) items=items.filter(i=>i.subCat===subCat);
  if(q) items=items.filter(i=>i.label.toLowerCase().includes(q)||i.tags.some((t:string)=>t.includes(q))||(i.fit&&i.fit.includes(q))||i.subCat.toLowerCase().includes(q));
  return items.map(item=>({...item,fullLabel:color?color.name+' '+item.label:item.label,colorHex:color?.hex||null}));
}

export default function App() {
  const [selInner, setSelInner] = useState<string|null>(null);
  const [selOuter, setSelOuter] = useState<string|null>(null);
  const [selBottom, setSelBottom] = useState<string|null>(null);
  const [selSock, setSelSock] = useState<string|null>(null);
  const [selShoe, setSelShoe] = useState<string|null>(null);
  const [selAcc, setSelAcc] = useState<string|null>(null);
  const [otherInner, setOtherInner] = useState('');
  const [otherOuter, setOtherOuter] = useState('');
  const [otherBottom, setOtherBottom] = useState('');
  const [otherShoe, setOtherShoe] = useState('');
  const [otherAcc, setOtherAcc] = useState('');
  const [openCatalog, setOpenCatalog] = useState<string|null>(null);
  const [catSubCat, setCatSubCat] = useState<Record<string,string|null>>({inner:null,outer:null,bottom:null,acc:null});
  const [catColor, setCatColor] = useState<Record<string,{name:string,hex:string}|null>>({inner:null,outer:null,bottom:null,acc:null});
  const [catSearch, setCatSearch] = useState<Record<string,string>>({inner:'',outer:'',bottom:'',acc:''});
  const [copying, setCopying] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const st: OutfitState = {inner:selInner,outer:selOuter,bottom:selBottom,sock:selSock,shoe:selShoe,acc:selAcc};

  function applyOther(group: string, val: string) {
    const v=val.trim(); if(!v) return;
    if(group==='inner'){setSelInner(v);}
    else if(group==='outer'){setSelOuter(v);}
    else if(group==='bottom'){setSelBottom(v);}
    else if(group==='shoe'){setSelShoe(v);}
    else if(group==='acc'){setSelAcc(v);}
  }

  function pickCard(group: string, val: string) {
    if(group==='sock'){setSelSock(prev=>prev===val?null:val);return;}
    if(group==='inner'){setSelInner(val);setOtherInner('');}
    else if(group==='outer'){setSelOuter(val);setOtherOuter('');}
    else if(group==='bottom'){setSelBottom(val);setOtherBottom('');}
  }

  function pickFromCatalog(slot: string, label: string) {
    if(slot==='inner'){setSelInner(label);setOtherInner(label);}
    else if(slot==='outer'){setSelOuter(label);setOtherOuter(label);}
    else if(slot==='bottom'){setSelBottom(label);setOtherBottom(label);}
    else if(slot==='acc'){setSelAcc(label);setOtherAcc(label);}
    setOpenCatalog(null);
  }

  function randomize() {
    setSpinning(true); setTimeout(()=>setSpinning(false),380);
    const combos=allCombos(); let chosen=null;
    for(const c of combos){const trial:OutfitState={...st,inner:c.inner,outer:c.outer,bottom:c.bottom};if(checkBalance(trial).ok){chosen=c;break;}}
    if(!chosen) chosen=combos[0];
    setSelInner(chosen.inner); setSelOuter(chosen.outer); setSelBottom(chosen.bottom);
    setOtherInner(''); setOtherOuter(''); setOtherBottom('');
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(buildPrompt(st));
    setCopying(true); setTimeout(()=>setCopying(false),2000);
  }

  function CatalogPanel({slot}: {slot:string}) {
    if(openCatalog!==slot) return null;
    const subCat=catSubCat[slot], color=catColor[slot], search=catSearch[slot];
    const subCats=getSubCats(slot);
    const items=filterCatalog(slot,subCat,search,color);
    return (
      <div className="catalog-panel">
        <input className="catalog-search" type="text" placeholder="Search name or tag\u2026" value={search} autoFocus
          onChange={e=>setCatSearch(prev=>({...prev,[slot]:e.target.value}))} />
        <div className="catalog-filters">
          {subCats.map(s=>(
            <button key={s} className={'filter-pill'+(subCat===s?' active':'')}
              onClick={()=>setCatSubCat(prev=>({...prev,[slot]:prev[slot]===s?null:s}))}>{s}</button>
          ))}
        </div>
        <div className="color-row-wrap">
          <div className="color-row-header">
            <span className="color-row-title">Color</span>
            <button className="color-clear-btn" onClick={()=>setCatColor(prev=>({...prev,[slot]:null}))}>Clear</button>
          </div>
          <div className="color-palette">
            {COLOR_PALETTE.filter(c=>c.group==='neutral').map(c=>(
              <button key={c.name} className={'color-swatch'+(color?.name===c.name?' chosen':'')}
                style={{background:c.hex}} title={c.name}
                onClick={()=>setCatColor(prev=>({...prev,[slot]:prev[slot]?.name===c.name?null:{name:c.name,hex:c.hex}}))} />
            ))}
            <div className="color-sep" />
            {COLOR_PALETTE.filter(c=>c.group==='dark').map(c=>(
              <button key={c.name} className={'color-swatch'+(color?.name===c.name?' chosen':'')}
                style={{background:c.hex}} title={c.name}
                onClick={()=>setCatColor(prev=>({...prev,[slot]:prev[slot]?.name===c.name?null:{name:c.name,hex:c.hex}}))} />
            ))}
            <div className="color-sep" />
            {COLOR_PALETTE.filter(c=>c.group==='earth').map(c=>(
              <button key={c.name} className={'color-swatch'+(color?.name===c.name?' chosen':'')}
                style={{background:c.hex}} title={c.name}
                onClick={()=>setCatColor(prev=>({...prev,[slot]:prev[slot]?.name===c.name?null:{name:c.name,hex:c.hex}}))} />
            ))}
            <div className="color-sep" />
            {COLOR_PALETTE.filter(c=>c.group==='bold').map(c=>(
              <button key={c.name} className={'color-swatch'+(color?.name===c.name?' chosen':'')}
                style={{background:c.hex}} title={c.name}
                onClick={()=>setCatColor(prev=>({...prev,[slot]:prev[slot]?.name===c.name?null:{name:c.name,hex:c.hex}}))} />
            ))}
          </div>
        </div>
        <div className="catalog-list">
          {items.length===0 ? <div className="catalog-empty">No items found</div> : items.map(item=>(
            <div key={item.id} className="catalog-item" onClick={()=>pickFromCatalog(slot,item.fullLabel)}>
              <div className="catalog-item-left">
                {item.colorHex && <span className="catalog-item-swatch" style={{background:item.colorHex}} />}
                <div>
                  <div className="catalog-item-label">{item.fullLabel}</div>
                  <div className="catalog-item-meta">{[item.subCat,item.fit].filter(Boolean).join(' \u00b7 ')} &middot; {item.tags.slice(0,3).join(', ')}</div>
                </div>
              </div>
              <span className="catalog-item-use">Use</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const hasOutfit = !!(st.inner && st.bottom);
  const outer = st.outer && st.outer !== 'None' ? st.outer : null;
  const shoes = st.shoe || 'Grey New Balance sneakers';
  const concept = hasOutfit ? getConcept(st) : '';
  const balance = hasOutfit ? checkBalance(st) : null;
  const prompt = hasOutfit ? buildPrompt(st) : '';

  return (
    <div className="wrap">
      <h1 className="page-title">Wardrobe matrix</h1>
      <p className="page-sub">Select one piece from each row to build your outfit.</p>

      {/* INNER TOP */}
      <div className="slot-section">
        <p className="section-label">Inner top</p>
        <div className="grid-2">
          {PRESET_INNER_CARDS.map(card=>(
            <div key={card.val} className={'item-card'+(selInner===card.val?' selected':'')} onClick={()=>pickCard('inner',card.val)}>
              <div className="card-top">
                {card.dot && <span className="color-dot" style={{background:card.dot}} />}
                <span className="card-label">{card.val}</span>
              </div>
              {card.sub && <div className="card-sub">{card.sub}</div>}
            </div>
          ))}
        </div>
        <div className="other-row">
          <span className="other-label">Other</span>
          <input className="other-input" type="text" placeholder="e.g. Rust linen shirt..." value={otherInner}
            style={selInner&&selInner===otherInner&&otherInner?{borderColor:'#7c6f4a'}:{}}
            onChange={e=>setOtherInner(e.target.value)} />
          <button className="other-btn" onClick={()=>applyOther('inner',otherInner)}>Use this</button>
          <button className={'browse-btn'+(openCatalog==='inner'?' active':'')} onClick={()=>setOpenCatalog(p=>p==='inner'?null:'inner')}>&#9783; Browse</button>
        </div>
        <CatalogPanel slot="inner" />
      </div>

      {/* OUTER LAYER */}
      <div className="slot-section">
        <p className="section-label">Outer layer <span style={{fontSize:'10px',color:'#bbb',fontWeight:400,textTransform:'none',letterSpacing:0}}>optional</span></p>
        <div className="grid-2">
          {PRESET_OUTER_CARDS.map(card=>(
            <div key={card.val} className={'item-card'+(selOuter===card.val?' selected':'')} onClick={()=>pickCard('outer',card.val)}>
              <div className="card-top">
                {card.dot ? <span className="color-dot" style={{background:card.dot}} /> : null}
                <span className="card-label" style={card.dot?{}:{color:'#aaa'}}>{card.val==='None'?'No outer layer':card.val}</span>
              </div>
              {card.sub && <div className="card-sub">{card.sub}</div>}
            </div>
          ))}
        </div>
        <div className="other-row">
          <span className="other-label">Other</span>
          <input className="other-input" type="text" placeholder="e.g. Olive knit cardigan..." value={otherOuter}
            style={selOuter&&selOuter===otherOuter&&otherOuter?{borderColor:'#7c6f4a'}:{}}
            onChange={e=>setOtherOuter(e.target.value)} />
          <button className="other-btn" onClick={()=>applyOther('outer',otherOuter)}>Use this</button>
          <button className={'browse-btn'+(openCatalog==='outer'?' active':'')} onClick={()=>setOpenCatalog(p=>p==='outer'?null:'outer')}>&#9783; Browse</button>
        </div>
        <CatalogPanel slot="outer" />
      </div>

      {/* BOTTOM */}
      <div className="slot-section">
        <p className="section-label">Bottom</p>
        <div className="grid-3">
          {PRESET_BOTTOM_CARDS.map(card=>(
            <div key={card.val} className={'item-card'+(selBottom===card.val?' selected':'')} onClick={()=>pickCard('bottom',card.val)}>
              <div className="card-top">
                <span className="color-dot" style={{background:card.dot}} />
                <span className="card-label">{card.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="other-row">
          <span className="other-label">Other</span>
          <input className="other-input" type="text" placeholder="e.g. Cream linen trousers..." value={otherBottom}
            style={selBottom&&selBottom===otherBottom&&otherBottom?{borderColor:'#7c6f4a'}:{}}
            onChange={e=>setOtherBottom(e.target.value)} />
          <button className="other-btn" onClick={()=>applyOther('bottom',otherBottom)}>Use this</button>
          <button className={'browse-btn'+(openCatalog==='bottom'?' active':'')} onClick={()=>setOpenCatalog(p=>p==='bottom'?null:'bottom')}>&#9783; Browse</button>
        </div>
        <CatalogPanel slot="bottom" />
      </div>

      {/* SHOES */}
      <div className="slot-section">
        <p className="section-label">Shoes &amp; extras</p>
        <div className="grid-shoe">
          <div className="item-card locked">
            <div className="card-top"><span className="color-dot" style={{background:'#b0b0b0'}} /><span className="card-label">Grey New Balance</span></div>
            <div className="card-sub">Always on</div>
          </div>
          <div className={'item-card'+(selSock==='Terracotta socks'?' selected':'')} onClick={()=>pickCard('sock','Terracotta socks')}>
            <div className="card-top"><span className="color-dot" style={{background:'#c1634a'}} /><span className="card-label">Terracotta socks</span></div>
            <div className="card-sub">Optional point accent \u2014 click to toggle</div>
          </div>
        </div>
        <div className="other-row">
          <span className="other-label">Other shoes</span>
          <input className="other-input" type="text" placeholder="e.g. White New Balance 550..." value={otherShoe}
            style={selShoe&&selShoe===otherShoe&&otherShoe?{borderColor:'#7c6f4a'}:{}}
            onChange={e=>setOtherShoe(e.target.value)} />
          <button className="other-btn" onClick={()=>applyOther('shoe',otherShoe)}>Use this</button>
        </div>
      </div>

      {/* ACCESSORIES */}
      <div className="slot-section">
        <p className="section-label">Accessories <span style={{fontSize:'10px',color:'#bbb',fontWeight:400,textTransform:'none',letterSpacing:0}}>optional</span></p>
        <div className="other-row">
          <span className="other-label">Add item</span>
          <input className="other-input" type="text" placeholder="e.g. Woven bracelet, cap..." value={otherAcc}
            style={selAcc&&selAcc===otherAcc&&otherAcc?{borderColor:'#7c6f4a'}:{}}
            onChange={e=>setOtherAcc(e.target.value)} />
          <button className="other-btn" onClick={()=>applyOther('acc',otherAcc)}>Use this</button>
          <button className={'browse-btn'+(openCatalog==='acc'?' active':'')} onClick={()=>setOpenCatalog(p=>p==='acc'?null:'acc')}>&#9783; Browse</button>
        </div>
        <CatalogPanel slot="acc" />
      </div>

      <hr className="divider" />

      <div className="randomize-row">
        <button className={'randomize-btn'+(spinning?' spinning':'')} onClick={randomize}>
          <span className="dice">&#9861;</span> Surprise me
        </button>
      </div>

      <div className="result-area">
        {!hasOutfit ? (
          <div className="placeholder">Your outfit will appear here<span>Select an inner top + bottom to start</span></div>
        ) : (
          <>
            <div className="result-label">Your combo</div>
            <div className="outfit-row">
              <span className="outfit-tag tag-inner">{st.inner}</span>
              {outer && <><span className="arrow">+</span><span className="outfit-tag tag-outer">{outer} (open)</span></>}
              <span className="arrow">+</span>
              <span className="outfit-tag tag-bottom">{st.bottom}</span>
              <span className="arrow">+</span>
              <span className="outfit-tag tag-shoe">{shoes}</span>
              {st.sock && <><span className="arrow">+</span><span className="outfit-tag tag-acc">{st.sock}</span></>}
              {st.acc && <><span className="arrow">+</span><span className="outfit-tag tag-other">{st.acc}</span></>}
            </div>
            <div className="concept-row">
              <span className="concept-label">Concept</span>
              <span className="concept-badge">{concept}</span>
            </div>
            <div className={'balance-msg '+(balance!.ok?'balance-ok':'balance-warn')}>{balance!.msg}</div>
          </>
        )}
      </div>

      {hasOutfit && (
        <div className="prompt-area" style={{marginTop:'16px'}}>
          <div className="prompt-header">
            <span className="result-label" style={{marginBottom:0}}>Leonardo AI prompt</span>
            <button className={'copy-btn'+(copying?' copied':'')} onClick={copyPrompt}>
              {copying?'Copied!':'Copy prompt'}
            </button>
          </div>
          <div className="prompt-text">{prompt}</div>
        </div>
      )}
    </div>
  );
}
