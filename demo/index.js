var b=window,w=document,ke=w.body,Oe=w.documentElement,Ue=null,de=null,Ie=null,ue=null;var Je=!0,U=!1,Ye=["html","head","header","body","button","voicify-ui","v-view","v-paragraph","v-sentence","v-wrap","v-frag","v-word"],qe=[".","?","!"],ee={current:!1},Ze={current:"en"},re={current:!1},G={current:{width:b.innerWidth,height:b.innerHeight,mode:b.innerWidth>=b.innerHeight?"landscape":"portrait"}},K={current:{cx:0,cy:0}},J={current:null},i={current:{}},Qe={current:void 0},be={current:{all:null,default:null}},f={current:{currentTopLevelTextElementEid:null,currentParagraphEid:null,currentSentenceEid:null,currentWordEid:null,currentSentenceWordsIdx:[],currentSentenceIdx:0,currentWordIdx:0,prevWordIdx:0,sentenceCount:0,wordCount:0,playerState:"idle",text:null,rate:1,pitch:1}};var X={current:{allPoints:[],default:{s0:{},s1:{},s2:{}},custom:{}}};var et={current:{activationStatus:!1,controlPanel:!1}};var H={current:!0},se={current:!0},Re={current:{}},fe=class extends HTMLElement{constructor(){super()}},pe=class extends HTMLElement{constructor(){super()}},ge=class extends HTMLElement{constructor(){super()}},Ee=class extends HTMLElement{constructor(){super()}},me=class extends HTMLElement{constructor(){super()}},he=class extends HTMLElement{constructor(){super()}},ye=class extends HTMLElement{constructor(){super()}},xe=class extends HTMLElement{constructor(){super()}};b.customElements.define("voicify-ui",fe);b.customElements.define("v-view",pe);b.customElements.define("v-frag",ge);b.customElements.define("v-wrap",Ee);b.customElements.define("v-paragraph",me);b.customElements.define("v-sentence",he);b.customElements.define("v-word",ye);b.customElements.define("v-sensor",xe);var ve=w.createElement("voicify-ui");ke.insertAdjacentElement("afterend",ve);var A=()=>{let e="",t="0aW9zXe8CrVt1By5NuA46iZ3oEpRmTlYkUjIhOgPfMdQsSqDwFxGcHvJbKnL";for(var n=0;n<10;n++)e+=t.charAt(Math.floor(Math.random()*36));return e},B=e=>{let t=w.createElement("div");try{return t.innerHTML=e,t.children[0]}catch(n){return T("log","convertion failed ::",n.message),t}};var tt=B(`
    <v-view id='nw_scaffold' class='scaffold row_center_all'>
        <v-view id='nw_text'></v-view>
    </v-view>
`),nt=`
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
`;ve.insertAdjacentElement("beforeend",tt);var rt=B(`
    <v-view id='cpw_scaffold' class='column'>
        <v-view id='cpw_header' class='rel column_center_all'>Settings</v-view>
        <v-view id='cpw_option_container' class='rel column_center_x overflow_y'></v-view>

        <v-view id='cpw_voice_container' class='abs'>
            <v-view id='cpw_voice_header' class='rel column_center_all'>Change voice</v-view>
            <v-view id='cpw_voice_list' class='rel column_center_x overflow_y'></v-view>
        </v-view>
    </v-view>
`),st=`
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
`;ve.insertAdjacentElement("beforeend",rt);var ct=e=>{let t=e.id,n=e.enable,s=e.parentElement,r=s?typeof s=="string"?w.getElementById(s):s:null,o=A(),a=null,c=B(`
        <v-view id='' class='sw_scaffold row_center_y'>
            <v-view class='sw_ball'></v-view>
        </v-view>
    `);w.getElementById("cpw_option_container").appendChild(c),Re.current[t]={type:"switchComponent",methods:{toggleFunc:d=>{}}}},ot=`
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
`,at=e=>{let t=e.id,n=e.title,s=e.description,r=e.useSwitch,o=A(),a=null,c=B(`
        <v-view id='${t}' class='cpmw_scaffold rel row'>
            <v-view class='cpmw_container rel column_center_y'>
                <v-view class='cpmw_title'>${n}</v-view>
                <v-view class='cpmw_desc'>${s}</v-view>
            </v-view>
            // ${r?ct({id:o,enable:!1}):""}
        </v-view>
    `);w.getElementById("cpw_option_container").appendChild(c),w.getElementById(t).addEventListener("click",()=>{switch(t){case"change_voice_btn":_e.showVoicesList(!0);break;case"continuous_reading_btn":a||(a=w.getElementById(o));break;case"enable_voicify_btn":break;default:}}),Re.current[t]={type:"switchWidge",methods:{toggleFunc:u=>{}}}},it=`
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
`,lt=[{id:"change_voice_btn",title:"Change voice",description:"Disable to read only the clicked pragraph"},{id:"enable_voicify_btn",title:"Enable Voicify",description:"Switch to enable/disable voicify",useSwitch:!0},{id:"continuous_reading_btn",title:"Continuous reading",description:"Disable to read the clicked paragraph only",useSwitch:!0}];lt.forEach(e=>at(e));var dt=e=>{let t=e.id,n=e.data,s=B(`
        <v-view id='${t}' class='vw_scaffold'>
            <v-view class=''></v-view>
        </v-view>
    `);ue.appendChild(s),w.getElementById(t).addEventListener("click",()=>{console.log(n)})},ut=`
    .vw_scaffold {
        width: 90%;
        height: 40px;
        background-color: red; 
        border-radius: 6px;
        margin-bottom: 10px;
    }
`,ft=`
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
`,pt=`
    v-view {
        border-box: box-sizing;
        color: #fff;
        cursor: default;
    }
`,gt=`
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
`,Et=`
    v-wrap {
        display: inline;
        border-box: box-sizing;
        margin: 0px;
        cursor: default;
    }
`,mt=`
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
`,ht=`
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
`,yt=`
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
`,He=w.createElement("style");He.textContent=ft+pt+gt+Et+mt+ht+nt+it+st+ot+ut+yt;w.head.appendChild(He);var Ae=e=>{try{if(!e)return;let t=e.dataset.eid;if(!t)return;let n=e.getBoundingClientRect(),s=i.current[t].parentParagraphEid,r=i.current[s].tlteEid,o=i.current[r].scrollableParentsEid,a=Ft();if((!o||o.length===0)&&!a)return;let c=Math.abs(n.top),l=b.innerHeight,d=l/3.5;n.top<l&&(d=l/2.5);let u=a?null:o[0],p=a?Oe:S(u);p&&p.scrollTo({top:p.scrollTop+(c-d),behavior:"smooth"}),$.scan()}catch(t){T("error","Err :: [alignTextVerticallyFunc] =>",t.message)}},xt=e=>{let t=e.text,n=e.charIndex,s=e.prevWordIndex,r=e.wordsIndexTab,o=r[s||0],a=r.filter(d=>d>n)[0]||void 0,c=t.slice(o,a).trim().split(" "),l=c[1];return je(l)?o+c[0].length+1:null};var W=e=>{try{let t=e;if(t.currentTopLevelTextElementEid===null)return;let n=S(t.currentWordEid);if(n&&n.removeAttribute("class"),ne(t.currentSentenceEid)){let r=i.current[t.currentSentenceEid].frags,o=S(r[0]);Ve(o,!1)}else{let r=S(t.currentSentenceEid);r&&r.removeAttribute("class")}}catch(t){T("error","Err :: [disableCurrentSentenceHighlightFunc] =>",t.message)}},Me=(e,t,n)=>{try{let s=e,r=t,a=(n||s).parentElement;if(!a)return;if(!Se(a)){Me(s,r,a);return}let l=a.dataset.eid||A();i.current[r].scrollableParentsEid?i.current[r].scrollableParentsEid.push(l):i.current[r].scrollableParentsEid=[l]}catch(s){T("error","Err :: [detectScrollableParentsFunc] =>",s.message)}},Tt=e=>{let t=e.getBoundingClientRect(),n=t.width,s=t.left,r={left:s,end:s+n},o=b.innerWidth/3,a={left:0,end:o},c={left:o,end:o*2},l={left:o*2,end:b.innerWidth},d="s0";if(r.end<=a.end)d="s0";else if(r.left<c.left&&r.end>c.left){let u=a.end-r.left,p=r.end-c.left;d=u<=p?"s1":"s0"}else if(r.left>=c.left&&r.end<=c.end)d="s1";else if(r.left<l.left&&r.end>l.left){let u=c.end-r.left;d=r.end-l.left<=u?"s1":"s2"}else r.left>l.left&&(d="s2");return d};var Q=(e,t)=>{try{let n=t?null:S(e);if(!t&&!n)return;let s=t?t.parentElement:n.parentElement;if(!s||s.tagName.toLowerCase()==="body")return;let r=s.dataset.eid||null;if(!r){Q(e,s);return}let o=i.current[r]?.type;if(!o){Q(e,s);return}let a=i.current[r].contentType;o==="top_level_text_element"&&a==="text_with_nested_not_inline_text_element"&&(i.current[r].currentTextType!=="formattedText"&&z(s,"formattedText"),i.current[e].parentsTlteEid||(i.current[e].parentsTlteEid=[]),i.current[e].parentsTlteEid.indexOf(r)===-1&&i.current[e].parentsTlteEid.push(r)),Q(e,s);return}catch(n){T("log","Err :: [formatParentTlteFunc] =>",n.message)}},_t=e=>{try{let t=e.eid,s=e.el.textContent.trim();i.current[t].textNodes={0:{originalText:s,formattedText:""}};let r=s.split(" "),o=r.length,a=[];for(let u=0;u<o;u++){let p=r[u].trim(),h=p.length;if(h===0)continue;let m=r.slice(u).join("").trim()===p.trim(),g=A(),E=A(),y=r[u+1],_=typeof y=="string"&&y.length>0?/^[a-z]+$/.test(y.trim().split("")[0]):!1,v=we(p)&&!_;r[u]=v?h===1?p:`<v-word data-eid='${E}'>${p}</v-word>${m?"":`</v-sentence><v-sentence data-eid='${g}'>`}`:`<v-word data-eid='${E}'>${p}</v-word>`,v&&!m&&a.push(g)}let c=A(),l=A(),d=`<v-paragraph data-eid='${c}'><v-sentence data-eid='${l}'>${r.join(" ")}</v-sentence></v-paragraph>`;a=[l,...a],a.forEach(u=>{i.current[u]={type:"sentence",eid:u,parentParagraphEid:c}}),i.current[c]={type:"paragraph",eid:c,sentencesEid:a,tlteEid:t},i.current[t].textNodes[0].formattedText=d,i.current[t].paragraphsEid=[c]}catch(t){T("log","Err :: [formatPlainTextFunc] =>",t.message)}},We=e=>{try{let t=e.eid,n=e.el,s=e.el.childNodes,r=s.length;if(r===0)return;let o={},a=e.recurse||!1,c={val:""};for(let l=0;l<r;l++){let d=s[l];if(!D(d))continue;let u=Be(d),p=l;switch(u){case"text":{let h=d.textContent;if(h.trim().length===0)continue;let m=h.split(" "),g=m.length,E="",y=A();for(let x=0;x<g;x++){let C=m[x];if(C.trim().length===0)continue;let P=C.length,F=x===0,M=m.slice(x).join("").trim()===C.trim(),R=A(),k=A(),O=m[l+1],Y=typeof O=="string"&&O.length>0?/^[a-z]+$/.test(O.trim().split("")[0]):!1,L=we(C)&&!Y;m[x]=L?P===1?F?`${C}</v-frag><v-frag data-eid='${k}'>`:C:`<v-word data-eid='${R}'>${C}</v-word>${M?"":`</v-frag><v-frag data-eid='${k}'>`}`:`<v-word data-eid='${R}'>${C}</v-word>`,L&&(E+=!M||F?"."+k:".")}E=y+E,a?e.fragStr.val+=e.fragStr.val.length>0?"_"+E:E:c.val+=c.val.length>0?"_"+E:E;let _=`<v-frag data-eid='${y}'>${m.join(" ")}</v-frag>`,N=$e({text:_,target:"v-frag"})>2?`<v-wrap>${_}</v-wrap>`:_;if(o[p]={originalText:h,formattedText:N},a){let x=n.dataset.eid;x||(x=A(),n.dataset.eid=x),e.data[x]=o}}break;case"element":We({eid:t,el:d,data:a?e.data:o,fragStr:a?e.fragStr:c,recurse:!0});break;default:}}if(!a){let l=A(),d=[],u=c.val.split(".");for(let h=0;h<u.length;h++){let m=A(),g=u[h].split("_");if(g.forEach((E,y)=>{E.trim().length===0&&g.splice(y,1)}),g.length!==0){for(let E=0;E<g.length;E++){let y=g[E];i.current[y]={type:"frag",eid:y,parentParagraphEid:l,parentSentenceEid:m,siblingFragsEid:g}}d.push({index:h,eid:m,frags:g})}}d.sort((h,m)=>h.index-m.index);let p=[];for(let h=0;h<d.length;h++){let m=d[h],g=m.eid;p.push(g),i.current[g]={type:"sentence",eid:g,parentParagraphEid:l,frags:m.frags}}i.current[l]={type:"paragraph",eid:l,sentencesEid:p,tlteEid:t},i.current[t].textNodes=o,i.current[t].paragraphsEid=[l]}}catch(t){T("log","Err :: [formatTextWithNestedInlineElementFunc] =>",t.message)}},De=e=>{try{let t=e.eid,n=e.el,s=e.el.childNodes,r=s.length;if(r===0)return;let o={},a=e.recurse||!1,c={val:""},l=[],d=!0;for(let u=0;u<r;u++){let p=s[u],h=Be(p),m=u;switch(d&&(l.push(p),d=!1),h){case"text":{let g=p.textContent;if(g.trim().length===0)continue;let E=g.split(" "),y=E.length,_="",v=A();for(let P=0;P<y;P++){let F=E[P];if(F.trim().length===0)continue;let M=F.length,R=P===0,k=E.slice(P).join("").trim()===F.trim(),O=A(),Y=A(),L=E[u+1],Xe=typeof L=="string"&&L.length>0?/^[a-z]+$/.test(L.trim().split("")[0]):!1,Ne=we(F)&&!Xe;E[P]=Ne?M===1?R?`${F}</v-frag><v-frag data-eid='${Y}'>`:F:`<v-word data-eid='${O}'>${F}</v-word>${k?"":`</v-frag><v-frag data-eid='${Y}'>`}`:`<v-word data-eid='${O}'>${F}</v-word>`,Ne&&(_+=!k||R?"."+Y:".")}_=v+_,a?e.fragStr.val+=e.fragStr.val.length>0?"_"+_:_:c.val+=c.val.length>0?"_"+_:_;let N=`<v-frag data-eid='${v}'>${E.join(" ")}</v-frag>`,C=$e({text:N,target:"v-frag"})>2?`<v-wrap>${N}</v-wrap>`:N;if(o[m]={originalText:g,formattedText:C},a){let P=n.dataset.eid;P||(P=A(),n.dataset.eid=P),e.data[P]=o}}break;case"element":{let g=p;if(!g||!D(g))continue;let E=g.dataset?.eid?i.current[g.dataset.eid]?.type==="top_level_text_element":!1,y=V(p);if(E||!y){a?e.fragStr.val+="#":c.val+="#",d=!0;continue}De({eid:t,el:p,data:a?e.data:o,fragStr:a?e.fragStr:c,recurse:!0})}break;default:}}if(!a){let u=c.val.split("#");if(u.length===0)return;let p=[];for(let h=0;h<u.length;h++){let m=u[h].trim();if(m.length===0)continue;let g=A(),E=[],y=m.split(".");for(let v=0;v<y.length;v++){let N=A(),x=y[v].split("_");if(x.forEach((C,P)=>{C.trim().length===0&&x.splice(P,1)}),x.length!==0){for(let C=0;C<x.length;C++){let P=x[C];i.current[P]={type:"frag",eid:P,parentParagraphEid:g,parentSentenceEid:N,siblingFragsEid:x}}E.push({index:v,eid:N,frags:x})}}E.sort((v,N)=>v.index-N.index);let _=[];for(let v=0;v<E.length;v++){let N=E[v],x=N.eid;_.push(x),i.current[x]={type:"sentence",eid:x,parentParagraphEid:g,sentenceText:"",frags:N.frags}}p.push(g),i.current[g]={type:"paragraph",eid:g,sentencesEid:_,tlteEid:t}}i.current[t].textNodes=o,i.current[t].paragraphsEid=p}}catch(t){T("log","Err :: [formatTextWithNestedNotInlineElementFunc] =>",t.message)}},bt=e=>{try{let t=S(e);if(!t)return null;let n=Nt(t);switch(n){case"plain_text":_t({eid:e,el:t});break;case"text_with_nested_inline_text_element":We({eid:e,el:t});break;case"text_with_nested_not_inline_text_element":De({eid:e,el:t});break;default:}return n}catch(t){return T("log","Err :: [formatTopLevelTextElementFunc] =>",t.message),null}},$e=e=>{let t=new RegExp(`\\b${e.target}\\b`,e.caseSensitive?"g":"gi");return(e.text.match(t)||[]).length},Ce=e=>{if(e.length===0)return[];let t=e.trim().replaceAll(`
`," ").split(" "),n=t.length,s=[],r=0;for(let o=0;o<n;o++){let a=t[o],c=n===1||o===0,l=a.length;if(l!==0)if(c)s.push(0);else{let u=a.split(" ").findIndex(p=>p.length>0)+r;s.push(u)}r+=l+1}return s},vt=e=>{try{if(!e)return null;let t=e.children[0];if(!t)return null;let n=t.getBoundingClientRect().height,s=b.getComputedStyle(e);return(n-parseFloat(s.fontSize))/4}catch(t){return T("log","Err :: [getSpaceBetweenLinesFunc] =>",t.message),null}},Fe=e=>{let t=e.key.toLowerCase();return e.metaKey||t==="meta"?"cmd":e.ctrlKey||t==="crtl"?"crtl":e.altKey||t==="alt"?"alt":e.shiftKey||t==="shift"?"shift":t==="arrowup"?"up":t==="arrowdown"?"down":t==="arrowleft"?"left":t==="arrowright"?"right":t||null},wt=e=>{try{let t=i.current[e].tlteEid;if(i.current[t].currentTextType!=="formattedText")return null;let s=b.innerWidth,r=s/3,o={s0:{left:0,right:r},s1:{left:r,right:r*2},s2:{left:r*2,right:s}},a={top:0,left:0,bottom:0,right:0},c=i.current[t].parentScannerId,l=i.current[e].sentencesEid,d=l.length,u=l[0],p=d>1?l[d-1]:null;if(ne(u)){let m=null,g=null,E=i.current[u].frags,y=E.length;if(m=E[0],g=y>1?E[y-1]:null,p!==null){let N=i.current[p].frags,x=N.length;g=x>1?N[x-1]:N[0]}let _=S(m),v=g?S(g):_;if(_===null||v===null)return null;a={top:_.getBoundingClientRect().top,bottom:v.getBoundingClientRect().bottom,left:1,right:b.innerWidth}}else{let m=S(u),g=p?S(p):m;if(m===null||g===null)return null;a={top:m.getBoundingClientRect().top,bottom:g.getBoundingClientRect().bottom,left:1,right:b.innerWidth}}return a}catch(t){return T("log","Err :: [getParagraphOffsetFunc] =>",t.message),null}},St=(e,t)=>{let n=X.current.allPoints,s=[];switch(t){case"top":s=n.filter(r=>r.x>=e.left&&r.x<=e.right&&r.y<e.top).reverse();break;case"left":break;case"bottom":s=n.filter(r=>r.x>=e.left&&r.x<=e.right&&r.y>e.bottom);break;case"right":break;default:}return s},Pt=(e,t)=>{try{let n=e.length,s=t||[],r=null;for(let o=0;o<n;o++){r=null;let a=e[o],c=w.elementFromPoint(a.x,a.y);if(!c||c.nodeType!==1)continue;switch(c.tagName.toLowerCase()){case"v-word":{let d=c.parentElement.dataset.eid;r=i.current[d].parentParagraphEid}break;case"v-frag":r=i.current[c.dataset.eid].parentParagraphEid;break;case"v-sentence":r=i.current[c.dataset.eid].parentParagraphEid;break;case"v-paragraph":r=c.dataset.eid;break;default:{let d=c.dataset.eid||void 0;if(d?i.current[d]?.type==="top_level_text_element":!1){if(s.indexOf(d)!==-1)continue;r=i.current[d].paragraphsEid[0]||null}}}if(r!==null&&s.indexOf(r)===-1)break}return r}catch(n){return T("log","Err :: [getFirstNextParagraphEidFromScanFunc] =>",n.message),null}},Be=e=>e.nodeName==="#text"?"text":"element",Nt=e=>{let t=e.childNodes;return t.length===1&&t[0].nodeType===Node.TEXT_NODE?"plain_text":te(e)?"text_with_nested_not_inline_text_element":"text_with_nested_inline_text_element"};var It=e=>{let t=e,n=32,s=16,r=[];for(let o=4;o<t.height;o+=s)for(let a=6;a<t.width;a+=n)r.push({x:a,y:o});return r},At=(e,t)=>{let n=e,s=t,r=3,o=n.height/r,a={},c={width:n.width,height:o,top:0,left:n.left},l=It(c);for(let d=0;d<r;d++)a["b"+d]={decalage:{x:s==="custom"?n.left:0,y:s==="custom"?n.top:o*d},points:l};return a};var je=e=>{if(typeof e!="string")return!1;let t=e.split("");for(let n=0;n<t.length;n++)if(/^[a-zA-Z0-9]+$/.test(t[n]))return!0;return!1};var ce=e=>{let t=e.childNodes;return Object.values(t).filter(s=>s.nodeName==="#text"&&s.textContent&&s.textContent.trim().length>0).length>0},Te=e=>{let t=e.childNodes;for(let n=0;n<t.length;n++){let s=t[n];if(s.nodeName==="#text")continue;if(!V(s)||s.childNodes.length>0&&Te(s))return!0}return!1},te=e=>{let t=e.childNodes;for(let n=0;n<t.length;n++){let s=t[n];if(s.nodeName==="#text")continue;if(!V(s)||s.childNodes.length>0&&te(s))return!0}return!1},we=e=>{let t=e.trim().split("").reverse()[0];return qe.some(n=>t===n)},Ve=(e,t)=>{try{if(!e)return;let n=e.dataset.eid||void 0;if(!n)return;let s=i.current[n].siblingFragsEid,r=s.length;if(r>0)for(let o=0;o<r;o++){let a=s[o],c=S(a);c&&(t?(Pe(c),c.setAttribute("class","frag_selected"),Ge(c,c.dataset)):c.removeAttribute("class"))}}catch(n){T("log","Err :: [highlightFragsFunc] =>",n.message)}},D=e=>e?e.nodeType===1||e.nodeName==="#text":!1,ne=e=>{let t=i.current[e].frags||[];return!!(Array.isArray(t)&&t.length>0)};var V=e=>{if(!D(e))return!1;let t=b.getComputedStyle(e).display.toLowerCase()||null;return t?t.includes("inline")&&!t.includes("flexbox"):!1},Ct=e=>{if(!D(e)||e&&Ye.includes(e.tagName.toLowerCase())||(e=e,e.childNodes.length===0)||!ce(e))return!1;if(!V(e))return!0;let s=e.previousSibling,r=e.nextSibling;if(!D(s)&&!D(r))return!0;let o=[s&&s.nodeName==="#text"&&s.textContent&&s.textContent.trim().length>0,r&&r.nodeName==="#text"&&r.textContent&&r.textContent.trim().length>0].includes(!0),a=[s&&s.nodeType===1&&V(s)&&!te(s)&&(ce(s)||Te(s)),r&&r.nodeType===1&&V(r)&&!te(r)&&(ce(r)||Te(r))].includes(!0);return!o&&!a},Se=e=>{if(!e)return;let t=e.tagName.toLowerCase();if(Ye.filter(a=>a!=="body"&&a!=="html").includes(t))return;let s=e.scrollWidth>e.clientWidth,r=e.scrollHeight>e.clientHeight,o;return s&&r?o="all":s&&!r?o="x":!s&&r?o="y":o=void 0,o},Ft=()=>Se(Oe),T=(e,...t)=>{if(!(!Je&&e!=="error"))switch(e){case"log":console.log(...t);break;case"error":console.log(...t);break;case"time":console.time(t);break;case"timeEnd":console.timeEnd(t);break;default:}},Lt=e=>{try{if(!e||!D(e)||e.dataset.eid||void 0)return;let n=A();e.dataset.eid=n;let s=Ct(e);if(!s)return;i.current[n]={eid:n,type:null};let r=Se(e);if(s){i.current[n].type="top_level_text_element",i.current[n].scrollDirection=r;let o=Tt(e);if(!o)return;i.current[n].parentScannerId=o;let a=bt(n);a&&(i.current[n].contentType=a),Yt(n),Me(e,n)}}catch(t){T("error","Err :: [processElementFunc] =>",t.message)}},j=e=>{try{let t=e.type,n=e.el,s=e.resetSpeechData,r=e.startFromBeginning,o=e.force,a="";if(!n||(s&&I.reset(),f.current.currentWordIdx=0,!o&&["playing","paused"].includes(f.current.playerState)))return;switch(t){case"word":{let c=n.parentElement,l=c.tagName.toLowerCase();j({type:l.includes("frag")?"frag":"sentence",el:c,startFromBeginning:r,force:o});return}break;case"frag":{let c=n.dataset.eid||void 0;if(!c)return;let l=i.current[c].parentSentenceEid;if(r){let y=i.current[l].parentParagraphEid;l=i.current[y].sentencesEid[0]}let d=i.current[l].frags,u=i.current[l].sentenceText,p=i.current[l].wordsIdx||[],h=i.current[l].wordsEid||[];if(!u){u="";for(let _=0;_<d.length;_++){let v=d[_],N=S(v);if(!N)return;let x=N.textContent.replaceAll(`
`," ").trim();if(x.length===0)continue;u+=" "+x;let C=N.children;for(let P=0;P<C.length;P++){let F=C[P];h.push(F.dataset.eid)}}u=u.trim();let y=Ce(u);p=y,i.current[l].sentenceText=u,i.current[l].wordsEid=h,i.current[l].wordsIdx=y}let m=i.current[l].parentParagraphEid;a=i.current[m].tlteEid;let g=i.current[m].sentencesEid,E=g.indexOf(l);Object.assign(f.current,{text:u,currentTopLevelTextElementEid:a,currentParagraphEid:m,currentSentenceEid:l,currentSentenceIdx:E,currentSentenceWordsIdx:p,sentenceCount:g.length,wordCount:h.length})}break;case"sentence":{let c=n.dataset.eid;if(!c)return;let l=i.current[c].sentenceText,d=i.current[c].wordsIdx||[],u=i.current[c].wordsEid||[];if(!l){l=n.textContent.replaceAll(`
`," ").trim();let g=n.children;for(let y=0;y<g.length;y++){let _=g[y];u.push(_.dataset.eid)}let E=Ce(l);d=E,i.current[c].sentenceText=l,i.current[c].wordsEid=u,i.current[c].wordsIdx=E}let p=i.current[c].parentParagraphEid;a=i.current[p].tlteEid;let h=i.current[p].sentencesEid,m=h.indexOf(c);Object.assign(f.current,{text:l,currentTopLevelTextElementEid:a,currentParagraphEid:p,currentSentenceEid:c,currentSentenceIdx:m,currentSentenceWordsIdx:d,sentenceCount:h.length,wordCount:u.length})}break;default:return}Q(a),I.play()}catch(t){T("error","Err :: [prepareTextAndReadFunc] =>",t.message)}},oe=()=>{switch(f.current.playerState){case"idle":I.play();break;case"playing":I.pause();break;case"paused":I.resume();break;default:}},ae=e=>{try{if(ne(e)){let s=i.current[e].frags[0],r=S(s),o=r.textContent;if(!o||!je(o))return!1;j({type:"frag",el:r,force:!0})}else{let n=S(e);j({type:"sentence",el:n,force:!0})}return!0}catch(t){return T("error","Err :: [readSentenceFunc] =>",t.message),null}},ie=(e,t,n)=>{try{let s=e,r=i.current[s].tlteEid,o=S(r),a=i.current[r].contentType;if(!o)return;n||z(o,"formattedText");let c={type:"",el:null},l=i.current[s].sentencesEid,d=l[t==="firstSentence"?0:l.length-1];if(a==="plain_text")c={type:"sentence",el:S(d)};else{let u=i.current[d].frags,p=u[t==="firstSentence"?0:u.length-1];c={type:"frag",el:S(p)}}j({type:c.type,el:c.el,force:!0,startFromBeginning:!0})}catch(s){T("error","Err :: [readParagraphFunc] =>",s.message)}},kt=()=>{try{let t=Object.values(i.current).filter(n=>n.type==="top_level_text_element"&&n.currentTextType==="formattedText");if(t.length===0)return;for(let n=0;n<t.length;n++){let s=t[n].eid,r=S(s);r&&z(r,"originalText")}}catch(e){T("error","Err :: [restoreOriginalTextForAllTlteFunc] =>",e.message)}},le=()=>{try{let e=f.current.currentTopLevelTextElementEid;if(!e)return;let t=S(e),n=i.current[e].contentType;t&&n!=="text_with_nested_not_inline_text_element"&&z(t,"originalText")}catch(e){T("error","Err :: [restoreOriginalTextForCurrentTlteFunc] =>",e.message)}};var $={init:()=>{Le("default")},custom:e=>{Le("custom",e)},scan:e=>{if(re.current)return;re.current=!0;let t=X.current.default;if(e){let n={s0:t.s0,s1:t.s1,s2:t.s2},s=Object.keys(e),r=[];for(let o=0;o<s.length;o++){let a=s[o];r.push(()=>q(n[a],e[a]))}Promise.all(r.map(o=>o()))}else{let n=t.s0,s=t.s1,r=t.s2,o=w.getElementById("allel");o&&(o.style.display="none");let a=[()=>q(n),()=>q(s),()=>q(r)];Promise.all(a.map(c=>c()))}setTimeout(()=>{re.current=!1},1e3)},getNextParagraphEid:(e,t)=>{try{if(!e)return null;let n=wt(e);if(!n)return null;let s=St(n,t),r=i.current[e].tlteEid,o=i.current[r].parentsTlteEid||[],a=[r,...o];return Pt(s,a)}catch(n){return T("error","Err :: [scanner.getNextParagraphEid] =>",n.message),null}}},Le=(...e)=>{T("time","scan init :");let t=e[0],n=e[1]||null,s,r,o,a,c=G.current.mode==="landscape",l=G.current.width,d=G.current.height,u=t==="custom"?n.width:c?l/3:l,p=t==="custom"?n.height:d,h=t==="custom"?n.top:0,m=t==="custom"?n.left:0,g={width:u,height:p,top:h,left:m},E=null;U&&(E=w.createElement("div"),E.setAttribute("id","allel"));let y=At(g,t);if(t==="custom"){s=y;for(let _ in s)s[_].decalage={x:m,y:h};X.current.custom[A()]=s}else{r=y,o=structuredClone(y),a=structuredClone(y);let _=[],v=(x,C)=>{for(let P in x){let F=x[P];F.decalage.x=u*C;let M=F.decalage,R=F.points;for(let k=0;k<R.length;k++){let O=R[k],Y={x:O.x+M.x,y:O.y+M.y};if(_.push(Y),U){let L=w.createElement("div");L.style.zIndex="1000",L.style.position="absolute",L.style.overflow="visible",L.style.top=Y.y+"px",L.style.left=Y.x+"px",L.style.backgroundColor="red",L.style.width="1px",L.style.height="1px",E.append(L)}}}},N=[()=>v(r,0),()=>v(o,1),()=>v(a,2)];Promise.all(N.map(x=>x())),X.current.default={s0:r,s1:o,s2:a},X.current.allPoints=_,U&&ke.insertAdjacentElement("beforeend",E)}T("timeEnd","scan init :")},Ot=(e,t)=>{let n=e[t],s=n.decalage,r=n.points;for(let o=0;o<r.length;o++){let a=r[o],c={x:a.x+s.x,y:a.y+s.y},l=w.elementFromPoint(c.x,c.y);Lt(l)}},q=(e,t)=>{let n=t||["b0","b1","b2"],s=Object.keys(e),r=s.length,o=Array(r).fill(void 0).map((a,c)=>{let l=s[c];return n.indexOf(l),()=>Ot(e,l)});Promise.all(o.map(a=>a()))},ze=()=>{$.scan(),requestAnimationFrame(ze)},Z=!0,I={play:()=>{try{if(f.current.playerState==="playing")return;let e=f.current.text;if(!e)return;let t=be.current.default;if(!t?.lang){Ke(),I.play();return}let n=new SpeechSynthesisUtterance(e);n.voice=t,n.lang=t.lang,n.pitch=f.current.pitch,n.rate=f.current.rate,speechSynthesis.speak(n),n.onstart=s=>{let o=f.current.currentSentenceEid;if(f.current.playerState="playing",ne(o)){let c=i.current[o].frags,l=S(c[0]);Ve(l,!0),Ae(l)}else{let c=S(o);c&&c.setAttribute("class","sentence_selected"),Ae(c)}},n.onboundary=s=>{if(s.name!=="word")return;let r=s.charIndex,o=f.current.currentSentenceWordsIdx,a=o.indexOf(r),c=Z?f.current.currentWordIdx:f.current.prevWordIdx;a===-1&&(r=xt({text:f.current.text,charIndex:r,prevWordIndex:c,wordsIndexTab:o})||r,a=o.indexOf(r));let l=a,d=f.current.currentSentenceEid,u=i.current[d].wordsEid,p=S(u[c]),h=u[l],m=S(h);p&&m?(p.removeAttribute("class"),Z=!0):Z=!1,m&&m.setAttribute("class","word_selected"),f.current.prevWordIdx=c,f.current.currentWordIdx=a,f.current.currentWordEid=h},n.onpause=s=>{f.current.playerState="paused"},n.onresume=s=>{f.current.playerState="playing"},n.onend=s=>{f.current.playerState="paused",Z=!0;let r=f.current;if(W(r),f.current.currentSentenceIdx+=1,r.currentSentenceIdx<r.sentenceCount){let c=i.current[r.currentSentenceEid].parentParagraphEid,d=i.current[c].sentencesEid[r.currentSentenceIdx];f.current.currentSentenceEid=d,ae(d)===!1&&(f.current.currentSentenceIdx+=1)}if(r.sentenceCount-r.currentSentenceIdx===0){let c=$.getNextParagraphEid(f.current.currentParagraphEid,"bottom"),l=c?i.current[c].tlteEid:null;if(le(),!l){I.reset({restoreOriginalTexts:!0});return}ie(c,"firstSentence")}}}catch(e){T("error","Err :: [speaker.play()] =>",e.message)}},playPrev:()=>{try{if(!H.current)return{ok:!1,msg:null};let e=f.current;if(!["playing","paused"].includes(e.playerState))return{ok:!1,msg:null};if(H.current=!1,speechSynthesis.cancel(),f.current.playerState="idle",e.sentenceCount===1||e.currentSentenceIdx===0){let n=$.getNextParagraphEid(f.current.currentParagraphEid,"top");if(W(e),le(),!n)return I.reset(),{ok:!1,msg:null};ie(n,"lastSentence")}else{W(e);let n=i.current[e.currentParagraphEid].sentencesEid;f.current.currentSentenceIdx-=1,f.current.currentSentenceEid=n[e.currentSentenceIdx],ae(e.currentSentenceEid)}return setTimeout(()=>{H.current=!0},100),{ok:!0,msg:null}}catch(e){let t=e.message;return T("error","Err :: [speaker.playPrev()] =>",t),H.current=!0,{ok:!1,msg:t}}},playNext:()=>{try{if(!se.current)return{ok:!1,msg:null};let e=f.current;if(!["playing","paused"].includes(e.playerState))return{ok:!1,msg:null};if(se.current=!1,speechSynthesis.cancel(),f.current.playerState="idle",e.sentenceCount===1||e.sentenceCount-e.currentSentenceIdx===1){let n=$.getNextParagraphEid(f.current.currentParagraphEid,"bottom");if(W(e),le(),!n)return I.reset(),{ok:!1,msg:null};ie(n,"firstSentence")}else{W(e);let n=i.current[e.currentParagraphEid].sentencesEid;f.current.currentSentenceIdx+=1,f.current.currentSentenceEid=n[e.currentSentenceIdx],ae(e.currentSentenceEid)}return setTimeout(()=>{se.current=!0},100),{ok:!0,msg:null}}catch(e){let t=e.message;return T("error","Err :: [speaker.playNext()] =>",t),H.current=!0,{ok:!1,msg:t}}},pause:()=>{try{return f.current.playerState="paused",speechSynthesis.pause(),{ok:!1,msg:null}}catch(e){let t=e.message;return T("error","Err :: [speaker.pause()] =>",t),H.current=!0,{ok:!1,msg:t}}},resume:()=>{try{return f.current.playerState="playing",speechSynthesis.resume(),{ok:!1,msg:null}}catch(e){let t=e.message;return T("error","Err :: [speaker.play()] =>",t),H.current=!0,{ok:!1,msg:t}}},reset:e=>{try{return W(f.current),speechSynthesis.cancel(),Object.assign(f.current,{playerState:"idle",currentTopLevelTextElementEid:null,currentParagraphEid:null,currentSentenceEid:null,currentWordEid:null,currentSentenceWordsIdx:null,currentSentenceIdx:0,currentWordIdx:0,text:null}),W(f.current),e?.restoreOriginalTexts&&kt(),{ok:!1,msg:null}}catch(t){let n=t.message;return T("error","Err :: [speaker.pause()] =>",n),H.current=!0,{ok:!1,msg:n}}}},Pe=e=>{try{let t=vt(e);t&&(e.style.paddingBlock=t+"px")}catch(t){T("log","Err :: [setPaddingBlockFunc] =>",t.message)}},Ke=()=>{let e=b.speechSynthesis.getVoices(),t=e.filter(s=>s.localService===!0),n=e.filter(s=>s.lang.toLowerCase().includes(Ze.current))[0];be.current={all:t,default:n}},S=e=>w.querySelector(`[data-eid="${e}"]`);var z=(e,t)=>{try{let n=e.dataset.eid;if(!n)return;let s=i.current[n].textNodes;if(!s)return;for(let r in s)if(r==="0"||!!Number(r)){let a=parseInt(r),c=t==="formattedText"?B(s[r].formattedText):s[r].originalText;c&&e.childNodes[a].replaceWith(c)}else{let a=S(r);if(!a)continue;let c=s[r];for(let l in c){let d=parseInt(l),u=t==="formattedText"?B(c[d].formattedText):c[d].originalText;u&&a.childNodes[d].replaceWith(u)}}i.current[n].currentTextType=t}catch(n){T("error","Err :: [transformTextNodesFunc] =>",n.message)}},_e={prepareElements:()=>{de=w.getElementById("nw_scaffold"),Ue=w.getElementById("cpw_scaffold"),Ie=w.getElementById("cpw_voice_container"),ue=w.getElementById("cpw_voice_list")},showControlPanel:e=>{},showVoicesList:e=>{Ie.style.transform=`translateX(${e?"0%":"100%"})`},renderVoices:()=>{let e=be.current.all.sort((t,n)=>(t.default?1:0)-(n.default?1:0));e&&(ue.replaceChildren(""),e.forEach(t=>{dt({id:A(),data:t})}))}},Yt=e=>{try{let t=S(e);if(!t)return;t.addEventListener("mouseenter",()=>{if(i.current[e].lastMouseEvent="enter",!ee.current)return;Qe.current=e;let n=i.current[e],s=n.contentType,r=n.currentTextType;f.current.currentTopLevelTextElementEid===e&&f.current.playerState==="playing"||r!=="formattedText"&&z(t,"formattedText")}),t.addEventListener("mouseleave",()=>{if(i.current[e].lastMouseEvent="leave",!ee.current)return;let n=i.current[e],s=n.contentType,r=n.currentTextType;f.current.currentTopLevelTextElementEid===e&&f.current.playerState==="playing"||s==="text_with_nested_not_inline_text_element"&&f.current.playerState==="playing"||r!=="originalText"&&z(t,"originalText")})}catch(t){T("error","Err :: [watchTopLevelTextElementFunc] =>",t.message)}},Rt=(e,t)=>{try{e.addEventListener("click",()=>{j({type:"sentence",el:e,resetSpeechData:!0,force:!0})}),e.addEventListener("mouseenter",n=>{Pe(e)})}catch(n){T("error","Err :: [watchSentencesFunc] =>",n.message)}},Ge=(e,t)=>{try{if(!t.eid)return;e.addEventListener("click",()=>{j({type:"frag",el:e,resetSpeechData:!0,force:!0})}),e.addEventListener("mouseenter",s=>{Pe(e)})}catch(n){T("error","Err :: [watchFragsFunc] =>",n.message)}},Ht=(e,t)=>{try{if(!t.eid)return;let r=e.parentElement.dataset.eid;e.addEventListener("click",o=>{j({type:"word",el:e,resetSpeechData:!0,force:!0})})}catch(n){T("error","Err :: [watchWordsFunc] =>",n.message)}},Mt=()=>{let{cx:e,cy:t}=K.current,n=w.elementFromPoint(e,t);if(!n)return;let s=n;switch(s.tagName.toLowerCase()){case"v-word":Ht(s,s.dataset);break;case"v-sentence":Rt(s,s.dataset);break;case"v-frag":Ge(s,s.dataset);break;default:}},Wt={init:e=>{b.onload=()=>{$.init(),setTimeout(()=>{ze()},100),setTimeout(()=>{Ke()},100),b.speechSynthesis.onvoiceschanged=()=>{},_e.prepareElements();let t=w.getElementById("btn");t&&t.addEventListener("click",()=>{setTimeout(()=>{I.reset()},10)}),b.addEventListener("resize",()=>{G.current.width=b.innerWidth,G.current.height=b.innerHeight,$.init()}),b.addEventListener("mousemove",n=>{K.current={cx:n.clientX,cy:n.clientY},et.current.activationStatus&&(de.style.left=K.current.cx+20+"px",de.style.top=K.current.cy-10+"px")}),b.addEventListener("mouseover",n=>{K.current={cx:n.clientX,cy:n.clientY},ee.current&&Mt()}),b.addEventListener("keydown",n=>{let s=Fe(n),r=!1;switch(s){case"shift":break;case"cmd":break;case"crtl":break;case"alt":break;case"up":break;case"down":break;case"left":break;case"right":break;default:r=!0}J.current=s,r&&(J.current=null)}),b.addEventListener("keyup",n=>{let s=Fe(n);switch(s===J.current&&(J.current=null),s){case"shift":break;case"cmd":oe();break;case"crtl":oe();break;case"control":oe();break;case"alt":_e.showControlPanel(!0);break;case"up":I.playPrev();break;case"left":I.playPrev();break;case"down":I.playNext();break;case"right":I.playNext();break;default:}}),b.addEventListener("beforeunload",()=>{f.current.playerState==="playing"&&I.reset()}),b.addEventListener("pagehide",()=>{f.current.playerState==="playing"&&I.pause()}),w.addEventListener("visibilitychange",()=>{f.current.playerState==="playing"&&I.pause()}),ee.current=!0}},playerState:()=>f.current.playerState,resume:()=>I.resume(),pause:()=>I.pause(),playPrev:()=>I.playPrev(),playNext:()=>I.playNext(),cancel:()=>I.reset(),showControlPanel:()=>{},displayNotification:()=>{}};Wt.init();
