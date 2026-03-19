(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,331713,e=>{"use strict";var t=e.i(843476),i=e.i(271645),r=e.i(846932);let o="#E81CFF",n="#94A3B8",s="#F8FAFC",a={minHeight:"100vh",scrollSnapAlign:"start",scrollSnapStop:"always",display:"flex",flexDirection:"column",justifyContent:"center",paddingTop:"64px",paddingBottom:"32px",position:"relative",boxSizing:"border-box",width:"100%",maxWidth:"100%"},l={fontSize:"9px",fontFamily:"ui-monospace,monospace",letterSpacing:"0.22em",textTransform:"uppercase",color:"#CBD5E1",marginBottom:"14px"},c={hidden:{},show:{transition:{staggerChildren:.15,delayChildren:.1}}},d={hidden:{opacity:0,y:30,filter:"blur(8px)"},show:{opacity:1,y:0,filter:"blur(0px)",transition:{duration:.8,ease:[.22,1,.36,1]}}};function p(){return(0,t.jsxs)("section",{style:{...a,alignItems:"center",justifyContent:"center",textAlign:"center",position:"relative",overflow:"hidden"},children:[(0,t.jsx)("style",{children:`
                @keyframes heroScroll { 0%,100%{opacity:.2} 50%{opacity:.8} }
                .hero-scroll-1 { animation: heroScroll 2s ease-in-out infinite; }
                .hero-scroll-2 { animation: heroScroll 2s ease-in-out infinite; animation-delay:.25s; }
                .hero-scroll-3 { animation: heroScroll 2s ease-in-out infinite; animation-delay:.5s; }
                
                @keyframes livePulse { 0%,100%{opacity:1; transform: scale(1)} 50%{opacity:.5; transform: scale(0.85)} }
                .live-dot { animation: livePulse 2s ease-in-out infinite; }
                
                @keyframes floatOrb1 { 0%,100%{transform: translate(0, 0) scale(1)} 33%{transform: translate(30px, -50px) scale(1.1)} 66%{transform: translate(-30px, 20px) scale(0.9)} }
                @keyframes floatOrb2 { 0%,100%{transform: translate(0, 0) scale(1)} 33%{transform: translate(-40px, 40px) scale(0.95)} 66%{transform: translate(20px, -30px) scale(1.05)} }
                
                .hero-orb-1 { animation: floatOrb1 18s ease-in-out infinite; }
                .hero-orb-2 { animation: floatOrb2 22s ease-in-out infinite; }
                
                .hero-btn-primary {
                    background: white;
                    color: black;
                    transition: all 0.3s ease;
                }
                .hero-btn-primary:hover {
                    background: rgba(255,255,255,0.9);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(255,255,255,0.15), 0 0 0 4px rgba(255,255,255,0.1);
                }
            `}),(0,t.jsx)("div",{className:"hero-orb-1",style:{position:"absolute",top:"20%",left:"35%",width:"400px",height:"400px",background:"radial-gradient(circle, rgba(0,226,255,0.15) 0%, transparent 70%)",filter:"blur(60px)",zIndex:0,pointerEvents:"none"}}),(0,t.jsx)("div",{className:"hero-orb-2",style:{position:"absolute",top:"30%",right:"35%",width:"500px",height:"500px",background:"radial-gradient(circle, rgba(232,28,255,0.12) 0%, transparent 70%)",filter:"blur(80px)",zIndex:0,pointerEvents:"none"}}),(0,t.jsxs)(r.motion.div,{initial:"hidden",animate:"show",variants:c,style:{zIndex:1,display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,t.jsxs)(r.motion.div,{variants:d,style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"6px 16px",borderRadius:"100px",border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.02)",fontSize:"10px",letterSpacing:"0.2em",color:"#E2E8F0",fontFamily:"ui-monospace,monospace",marginBottom:"40px",backdropFilter:"blur(10px)"},children:[(0,t.jsx)("span",{className:"live-dot",style:{width:6,height:6,borderRadius:"50%",background:"#22C55E",boxShadow:"0 0 12px #22C55E",display:"inline-block",flexShrink:0}}),"LIVE ON POLKADOT TESTNET"]}),(0,t.jsxs)(r.motion.h1,{variants:d,style:{fontSize:"clamp(56px, 8vw, 112px)",fontWeight:700,lineHeight:.95,letterSpacing:"-0.05em",color:s,marginBottom:"32px"},children:["Fair Credit",(0,t.jsx)("br",{}),(0,t.jsx)("span",{style:{color:"transparent",WebkitTextStroke:"1.5px rgba(255,255,255,0.3)"},children:"on Polkadot."})]}),(0,t.jsxs)(r.motion.p,{variants:d,style:{fontSize:"clamp(16px, 2vw, 20px)",lineHeight:1.7,color:"#E2E8F0",maxWidth:"520px",marginBottom:"80px",fontWeight:400},children:["Fund from any chain. Participate in governance.",(0,t.jsx)("br",{}),"Unlock institutional-grade tiered borrowing."]}),(0,t.jsxs)(r.motion.div,{variants:d,style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"16px"},children:[(0,t.jsx)("span",{style:{fontSize:"9px",fontFamily:"ui-monospace,monospace",color:n,letterSpacing:"4px",textTransform:"uppercase"},children:"EXPLORE TOPOLOGY"}),(0,t.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[(0,t.jsx)("div",{className:"hero-scroll-1",style:{width:1.5,height:18,background:"rgba(255,255,255,0.3)",borderRadius:2}}),(0,t.jsx)("div",{className:"hero-scroll-2",style:{width:1.5,height:18,background:"rgba(255,255,255,0.3)",borderRadius:2}}),(0,t.jsx)("div",{className:"hero-scroll-3",style:{width:1.5,height:18,background:"rgba(255,255,255,0.3)",borderRadius:2}})]})]})]})]})}function x({className:e="",width:r="100%",height:o="100%"}){return(0,t.jsx)("div",{style:{position:"relative",width:"100%",height:"100%"},children:(0,t.jsxs)("svg",{className:e,width:r,height:o,viewBox:"0 0 1200 600",style:{overflow:"visible",userSelect:"none"},preserveAspectRatio:"xMidYMid meet",children:[(0,t.jsxs)("defs",{children:[(0,t.jsxs)("linearGradient",{id:"pins",x1:"0",y1:"0",x2:"1",y2:"0",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#334155"}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#0f172a"})]}),(0,t.jsx)("pattern",{id:"grid",width:"20",height:"20",patternUnits:"userSpaceOnUse",children:(0,t.jsx)("path",{d:"M 20 0 L 0 0 0 20",fill:"none",stroke:"rgba(255,255,255,0.02)",strokeWidth:"1"})})]}),(0,t.jsxs)("g",{fill:"none",stroke:"rgba(255,255,255,0.02)",strokeWidth:"1",children:[(0,t.jsx)("path",{d:"M 40 30 H 1160"}),(0,t.jsx)("path",{d:"M 40 570 H 1160"}),(0,t.jsx)("path",{d:"M 230 30 V 570"}),(0,t.jsx)("path",{d:"M 620 30 V 100"}),(0,t.jsx)("path",{d:"M 620 500 V 570"}),(0,t.jsx)("path",{d:"M 880 30 V 570"})]}),(0,t.jsxs)("g",{fill:"none",stroke:"rgba(255,255,255,0.06)",strokeWidth:"1",children:[(0,t.jsx)("path",{d:"M 20 60 V 20 H 60"}),(0,t.jsx)("path",{d:"M 1180 60 V 20 H 1140"}),(0,t.jsx)("path",{d:"M 20 540 V 580 H 60"}),(0,t.jsx)("path",{d:"M 1180 540 V 580 H 1140"})]}),(0,t.jsxs)("g",{fill:"none",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("path",{id:"p1",d:"M 150 80 H 190 Q 200 80 200 90 V 132 Q 200 142 210 142 H 230",stroke:"#00E2FF",opacity:.3}),(0,t.jsx)("path",{id:"p2",d:"M 150 160 H 190 Q 200 160 200 150 V 152 Q 200 142 210 142 H 230",stroke:"#00E2FF",opacity:.3}),(0,t.jsx)("path",{id:"p3",d:"M 150 240 H 190 Q 200 240 200 250 V 292 Q 200 302 210 302 H 230",stroke:"#00E2FF",opacity:.3}),(0,t.jsx)("path",{id:"p4",d:"M 150 320 H 190 Q 200 320 200 310 V 312 Q 200 302 210 302 H 230",stroke:"#00E2FF",opacity:.2}),(0,t.jsx)("path",{id:"p5",d:"M 150 400 H 190 Q 200 400 200 410 V 412 Q 200 422 210 422 H 230",stroke:"#00E2FF",opacity:.2}),(0,t.jsx)("path",{id:"p6",d:"M 360 142 H 420",stroke:"#00E2FF",opacity:.4}),(0,t.jsx)("path",{id:"p7",d:"M 360 302 H 420",stroke:"rgba(255,255,255,0.4)",opacity:.4}),(0,t.jsx)("path",{id:"p8",d:"M 360 422 H 420",stroke:"rgba(255,255,255,0.4)",opacity:.4}),(0,t.jsx)("path",{id:"p9",d:"M 820 192 H 880",stroke:"#8B5CF6",opacity:.4}),(0,t.jsx)("path",{id:"p10",d:"M 820 322 H 880",stroke:"#8B5CF6",opacity:.4}),(0,t.jsx)("path",{id:"p11",d:"M 820 442 H 880",stroke:"#8B5CF6",opacity:.4}),(0,t.jsx)("path",{id:"p12",d:"M 1010 192 H 1060",stroke:"#8B5CF6",opacity:.3}),(0,t.jsx)("path",{id:"p13",d:"M 1010 322 H 1060",stroke:"#8B5CF6",opacity:.3}),(0,t.jsx)("path",{id:"p14",d:"M 1010 442 H 1060",stroke:"#8B5CF6",opacity:.3}),(0,t.jsx)("path",{id:"p15",d:"M 1160 458 H 1175 Q 1185 458 1185 468 V 570 Q 1185 580 1175 580 H 30 Q 20 580 20 570 V 90 Q 20 80 30 80 H 40",stroke:"#8B5CF6",opacity:.2,strokeDasharray:"4 6"})]}),(0,t.jsxs)("g",{fill:"none",stroke:"rgba(255,255,255,0.06)",strokeWidth:"1",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("path",{d:"M 420 142 H 440"}),(0,t.jsx)("path",{d:"M 420 302 H 520"}),(0,t.jsx)("path",{d:"M 420 422 H 440"}),(0,t.jsx)("path",{d:"M 800 192 H 820"}),(0,t.jsx)("path",{d:"M 720 322 H 820"}),(0,t.jsx)("path",{d:"M 800 442 H 820"}),(0,t.jsx)("path",{d:"M 500 180 Q 500 192 520 192"}),(0,t.jsx)("path",{d:"M 740 180 Q 740 192 720 192"})]}),(0,t.jsxs)("g",{children:[(0,t.jsx)("path",{d:"M 160 30 H 1160",stroke:"rgba(255,255,255,0.05)",strokeWidth:"1",strokeDasharray:"2 4",fill:"none"}),[{title:"ANON",x:160,color:"#64748B"},{title:"BRONZE",x:360,color:"#CD7F32"},{title:"SILVER",x:560,color:"#C0C0C0"},{title:"GOLD",x:760,color:"#FFD700"},{title:"PLATINUM",x:960,color:"#E5E4E2"},{title:"DIAMOND",x:1160,color:"#B9F2FF"}].map((e,i)=>(0,t.jsxs)("g",{children:[(0,t.jsx)("circle",{cx:e.x,cy:30,r:3.5,fill:"none",stroke:e.color,strokeWidth:1,children:(0,t.jsx)("animate",{attributeName:"opacity",values:"0.2; 1; 0.2; 0.2; 0.2; 0.2; 0.2".split(";").map((e,t)=>t===i?"1":"0.2").join(";"),keyTimes:"0; 0.16; 0.33; 0.5; 0.66; 0.83; 1",dur:"12s",repeatCount:"indefinite"})}),(0,t.jsxs)("text",{x:e.x,y:48,fontSize:8,fill:e.color,textAnchor:"middle",fontFamily:"ui-monospace,monospace",letterSpacing:"0.05em",children:[(0,t.jsx)("animate",{attributeName:"opacity",values:"0.4; 1; 0.4; 0.4; 0.4; 0.4; 0.4".split(";").map((e,t)=>t===i?"1":"0.4").join(";"),keyTimes:"0; 0.16; 0.33; 0.5; 0.66; 0.83; 1",dur:"12s",repeatCount:"indefinite"}),e.title]})]},e.title))]}),(0,t.jsx)("text",{x:620,y:590,fontSize:8,fill:"rgba(255,255,255,0.25)",textAnchor:"middle",letterSpacing:"0.15em",fontFamily:"ui-monospace,monospace",children:"REPAY → SCORE HISTORY → TIER UPGRADE"}),(0,t.jsx)("circle",{r:"2",fill:"#00E2FF",children:(0,t.jsx)("animateMotion",{dur:"2.4s",repeatCount:"indefinite",begin:"0s",children:(0,t.jsx)("mpath",{href:"#p1"})})}),(0,t.jsx)("circle",{r:"2",fill:"#00E2FF",children:(0,t.jsx)("animateMotion",{dur:"2.4s",repeatCount:"indefinite",begin:"0.8s",children:(0,t.jsx)("mpath",{href:"#p2"})})}),(0,t.jsx)("circle",{r:"2",fill:"#00E2FF",children:(0,t.jsx)("animateMotion",{dur:"2.8s",repeatCount:"indefinite",begin:"0.4s",children:(0,t.jsx)("mpath",{href:"#p3"})})}),(0,t.jsx)("circle",{r:"2",fill:"#00E2FF",children:(0,t.jsx)("animateMotion",{dur:"1s",repeatCount:"indefinite",begin:"0s",children:(0,t.jsx)("mpath",{href:"#p6"})})}),(0,t.jsx)("circle",{r:"2",fill:"#FFFFFF",opacity:"0.8",children:(0,t.jsx)("animateMotion",{dur:"1.2s",repeatCount:"indefinite",begin:"0.5s",children:(0,t.jsx)("mpath",{href:"#p7"})})}),(0,t.jsx)("circle",{r:"2",fill:"#8B5CF6",children:(0,t.jsx)("animateMotion",{dur:"1s",repeatCount:"indefinite",begin:"0.2s",children:(0,t.jsx)("mpath",{href:"#p10"})})}),(0,t.jsx)("circle",{r:"2",fill:"#8B5CF6",children:(0,t.jsx)("animateMotion",{dur:"1.4s",repeatCount:"indefinite",begin:"0.7s",children:(0,t.jsx)("mpath",{href:"#p12"})})}),(0,t.jsx)("circle",{r:"2",fill:"#8B5CF6",children:(0,t.jsx)("animateMotion",{dur:"1.4s",repeatCount:"indefinite",begin:"0.3s",children:(0,t.jsx)("mpath",{href:"#p13"})})}),(0,t.jsx)("g",{fontFamily:"ui-monospace,monospace",children:[{y:64,title:"PEOPLE CHAIN",sub:"XCM · PAS"},{y:144,title:"ASSET HUB",sub:"PAS · mUSDC"},{y:224,title:"SEPOLIA",sub:"ETH"},{y:304,title:"BASE / ARB",sub:"ETH"},{y:384,title:"mUSDC",sub:"STABLE"}].map((e,i)=>(0,t.jsxs)("g",{children:[(0,t.jsx)("rect",{x:40,y:e.y,width:110,height:32,rx:4,fill:"rgba(0,226,255,0.02)",stroke:"rgba(0,226,255,0.15)",strokeWidth:1}),(0,t.jsx)("text",{x:95,y:e.y+13,fontSize:10,fontWeight:600,letterSpacing:"0.05em",fill:"rgba(0,226,255,0.8)",textAnchor:"middle",children:e.title}),(0,t.jsx)("text",{x:95,y:e.y+24,fontSize:7,fill:"rgba(255,255,255,0.4)",textAnchor:"middle",children:e.sub})]},i))}),(0,t.jsx)("g",{fontFamily:"ui-monospace,monospace",children:[{y:120,title:"XCM RECEIVER",sub:"Cross-chain Sync"},{y:280,title:"ETH BRIDGE",sub:"Hyperbridge Msg"},{y:400,title:"SWAP ROUTER",sub:"KredioSwap Core"}].map((e,i)=>(0,t.jsxs)("g",{children:[(0,t.jsx)("rect",{x:230,y:e.y,width:130,height:44,rx:6,fill:"rgba(0,226,255,0.02)",stroke:"rgba(0,226,255,0.2)",strokeWidth:1}),(0,t.jsx)("text",{x:295,y:e.y+19,fontSize:10,fontWeight:600,letterSpacing:"0.05em",fill:"#00E2FF",textAnchor:"middle",children:e.title}),(0,t.jsx)("text",{x:295,y:e.y+32,fontSize:7,fill:"rgba(255,255,255,0.4)",textAnchor:"middle",children:e.sub})]},i))}),(0,t.jsxs)("g",{fontFamily:"ui-monospace,monospace",children:[(0,t.jsx)("g",{fill:"url(#pins)",stroke:"rgba(255,255,255,0.05)",strokeWidth:"0.5",children:[165,231,298,364,431].map(e=>(0,t.jsxs)(i.default.Fragment,{children:[(0,t.jsx)("rect",{x:415,y:e-2,width:10,height:4,rx:1}),(0,t.jsx)("rect",{x:815,y:e-2,width:10,height:4,rx:1})]},e))}),(0,t.jsx)("rect",{x:420,y:100,width:400,height:400,rx:16,fill:"#03040B",stroke:"rgba(255,255,255,0.05)",strokeWidth:1,style:{filter:"drop-shadow(0px 16px 24px rgba(0,0,0,0.8))"}}),(0,t.jsx)("rect",{x:422,y:102,width:396,height:396,rx:14,fill:"url(#grid)",stroke:"none"}),[{x:440,y:120,c:"#34D399",t:"KREDIT AGENT",s:"Deterministic Score"},{x:640,y:120,c:"#00E2FF",t:"NEURAL SCORER",s:"Anomaly Inference"},{x:440,y:350,c:"#F59E0B",t:"RISK ASSESSOR",s:"Volatility Engine"},{x:640,y:350,c:"#F472B6",t:"YIELD MIND",s:"Capital Routing"}].map((e,i)=>(0,t.jsxs)("g",{children:[(0,t.jsx)("rect",{x:e.x,y:e.y,width:160,height:70,rx:6,fill:"rgba(255,255,255,0.02)",stroke:"rgba(255,255,255,0.1)",strokeWidth:1}),(0,t.jsx)("text",{x:e.x+80,y:e.y+30,fontSize:9,fontWeight:700,fill:e.c,letterSpacing:"0.1em",textAnchor:"middle",children:e.t}),(0,t.jsx)("text",{x:e.x+80,y:e.y+44,fontSize:7,fill:"rgba(255,255,255,0.4)",textAnchor:"middle",children:e.s}),(0,t.jsx)("rect",{x:e.x+4,y:e.y+4,width:2,height:2,fill:e.c,opacity:.5}),(0,t.jsx)("rect",{x:e.x+154,y:e.y+4,width:2,height:2,fill:e.c,opacity:.5}),(0,t.jsx)("rect",{x:e.x+4,y:e.y+64,width:2,height:2,fill:e.c,opacity:.5}),(0,t.jsx)("rect",{x:e.x+154,y:e.y+64,width:2,height:2,fill:e.c,opacity:.5})]},i)),(0,t.jsxs)("g",{children:[(0,t.jsx)("rect",{x:520,y:260,width:200,height:80,rx:8,fill:"#05060A",stroke:"#1E293B",strokeWidth:1}),(0,t.jsx)("rect",{x:522,y:262,width:196,height:76,rx:6,fill:"url(#grid)",stroke:"none"}),(0,t.jsx)("text",{x:620,y:296,fontSize:14,fontWeight:800,fill:"#FFFFFF",letterSpacing:"0.15em",textAnchor:"middle",children:"KREDIO"}),(0,t.jsx)("text",{x:620,y:312,fontSize:7,fontWeight:600,fill:"#64748B",letterSpacing:"0.2em",textAnchor:"middle",children:"AGENT CLUSTER · v4"})]})]}),(0,t.jsx)("g",{fontFamily:"ui-monospace,monospace",children:[{y:170,title:"LEND MARKET",sub:"KredioLending v5"},{y:300,title:"BORROW MARKET",sub:"Tiered LTV · 85% Max"},{y:420,title:"PAS MARKET",sub:"KredioPASMarket v5"}].map((e,i)=>(0,t.jsxs)("g",{children:[(0,t.jsx)("rect",{x:880,y:e.y,width:130,height:44,rx:6,fill:"rgba(139,92,246,0.02)",stroke:"rgba(139,92,246,0.2)",strokeWidth:1}),(0,t.jsx)("text",{x:945,y:e.y+19,fontSize:10,fontWeight:600,letterSpacing:"0.05em",fill:"#8B5CF6",textAnchor:"middle",children:e.title}),(0,t.jsx)("text",{x:945,y:e.y+32,fontSize:7,fill:"rgba(255,255,255,0.4)",textAnchor:"middle",children:e.sub})]},i))}),(0,t.jsx)("g",{fontFamily:"ui-monospace,monospace",children:[{y:176,title:"SUPPLY",sub:"Earn yield"},{y:306,title:"BORROW",sub:"Tiered rates"},{y:426,title:"SWAP/REPAY",sub:"KredioSwap"}].map((e,i)=>(0,t.jsxs)("g",{children:[(0,t.jsx)("rect",{x:1060,y:e.y,width:100,height:32,rx:4,fill:"rgba(139,92,246,0.02)",stroke:"rgba(139,92,246,0.15)",strokeWidth:1}),(0,t.jsx)("text",{x:1110,y:e.y+13,fontSize:10,fontWeight:600,letterSpacing:"0.05em",fill:"rgba(139,92,246,0.8)",textAnchor:"middle",children:e.title}),(0,t.jsx)("text",{x:1110,y:e.y+24,fontSize:7,fill:"rgba(255,255,255,0.4)",textAnchor:"middle",children:e.sub})]},i))})]})})}let h={hidden:{opacity:0,y:30},show:{opacity:1,y:0,transition:{duration:.8,ease:[.22,1,.36,1]}}};function g(){return(0,t.jsx)("section",{style:{...a,alignItems:"center",justifyContent:"center"},children:(0,t.jsx)(r.motion.div,{initial:"hidden",animate:"show",variants:h,style:{width:"85%",maxWidth:"1400px",display:"flex",justifyContent:"center"},children:(0,t.jsx)(x,{})})})}let m=[{cls:"fc-pas",icon:"◈",title:"PAS Markets",desc:"Isolated borrow/lend markets for native Polkadot assets. Dynamic LTV up to 85%, real floating APY.",color:"#22C55E",stat:"85%",statLabel:"Max LTV"},{cls:"fc-flash",icon:"◎",title:"Flashloan Shield",desc:"Manipulation-resistant v5 interest accrual. Protects the protocol from single-block price manipulation and flashloan attacks.",color:"#A78BFA"},{cls:"fc-xcm",icon:"⇌",title:"XCM Deposits",desc:"Bridge PAS from People Chain via native XCM.",color:"#00E2FF"},{cls:"fc-eth",icon:"⬡",title:"ETH Bridge",desc:"Bring liquidity from different EVM chains into Polkadot Asset Hub. Minted 1:1 on-chain.",color:"#F59E0B"},{cls:"fc-gov",icon:"⬥",title:"Governance Rewards",desc:"Vote on Asset Hub governance and earn score multipliers. Consistency unlocks higher tiers permanently.",color:"#818CF8",stat:"6 →",statLabel:"Tiers"},{cls:"fc-musdc",icon:"◇",title:"mUSDC Markets",desc:"Bridged EVM USDC pools with real-time yield.",color:"#38BDF8"},{cls:"fc-swap",icon:"↻",title:"KredioSwap",desc:"Swap PAS, mUSDC and lending positions atomically.",color:"#F472B6"},{cls:"fc-id",icon:"▲",title:"Identity Boost",desc:"On-chain proofs permanently raise starting score.",color:"#FB923C"},{cls:"fc-ai",icon:"⬡",title:"AI Credit Engine",desc:"Six-tier dynamic credit scoring driven by on-chain behavior. Score improves in real time - no application, no waiting period.",color:"#D946EF"},{cls:"fc-neural",icon:"◉",title:"Neural Risk Layer",desc:"A dual-mode neural net runs alongside deterministic rules to catch manipulation and edge cases the rulebook misses.",color:"#14B8A6"}],f={hidden:{},show:{transition:{staggerChildren:.05,delayChildren:.06}}},u={hidden:{opacity:0,scale:.95,y:12},show:{opacity:1,scale:1,y:0,transition:{duration:.5,ease:[.22,1,.36,1]}}};function y({id:e}){switch(e){case"fc-pas":return(0,t.jsx)("div",{className:"fc-bg-element",children:(0,t.jsx)("span",{style:{position:"absolute",bottom:"-20px",right:"-10px",fontSize:"220px",fontWeight:800,lineHeight:1,letterSpacing:"-0.06em",color:"rgba(34,197,94,0.03)"},children:"85%"})});case"fc-gov":return(0,t.jsx)("div",{className:"fc-bg-element",children:(0,t.jsx)("span",{style:{position:"absolute",bottom:"-10px",right:"10px",fontSize:"200px",fontWeight:800,lineHeight:1,letterSpacing:"-0.06em",color:"rgba(129,140,248,0.03)"},children:"6T"})});case"fc-flash":return(0,t.jsxs)("svg",{className:"fc-bg-element",viewBox:"0 0 200 400",preserveAspectRatio:"none",children:[(0,t.jsx)("circle",{cx:"100",cy:"200",r:"140",fill:"none",stroke:"rgba(167,139,250,0.04)",strokeWidth:"2"}),(0,t.jsx)("circle",{cx:"100",cy:"200",r:"100",fill:"none",stroke:"rgba(167,139,250,0.06)",strokeWidth:"4"}),(0,t.jsx)("circle",{cx:"100",cy:"200",r:"60",fill:"none",stroke:"rgba(167,139,250,0.08)",strokeWidth:"1",strokeDasharray:"4 4"})]});case"fc-eth":return(0,t.jsxs)("svg",{className:"fc-bg-element",viewBox:"0 0 200 400",preserveAspectRatio:"xRightYBottom meet",children:[(0,t.jsx)("path",{d:"M100 0 L100 400",stroke:"rgba(245,158,11,0.05)",strokeWidth:"8",strokeDasharray:"16 16"}),(0,t.jsx)("polygon",{points:"100,200 70,250 100,300 130,250",fill:"none",stroke:"rgba(245,158,11,0.08)",strokeWidth:"2"}),(0,t.jsx)("polygon",{points:"100,100 80,140 100,180 120,140",fill:"none",stroke:"rgba(245,158,11,0.06)",strokeWidth:"1"})]});case"fc-id":return(0,t.jsxs)("svg",{className:"fc-bg-element",viewBox:"0 0 200 400",preserveAspectRatio:"xRightYBottom meet",children:[(0,t.jsx)("path",{d:"M 50 400 Q 100 250 150 400",fill:"none",stroke:"rgba(251,146,60,0.04)",strokeWidth:"20"}),(0,t.jsx)("path",{d:"M 70 400 Q 100 300 130 400",fill:"none",stroke:"rgba(251,146,60,0.06)",strokeWidth:"10"}),(0,t.jsx)("circle",{cx:"100",cy:"380",r:"15",fill:"none",stroke:"rgba(251,146,60,0.08)",strokeWidth:"4"})]});case"fc-xcm":return(0,t.jsxs)("svg",{className:"fc-bg-element",viewBox:"0 0 400 200",preserveAspectRatio:"xRightYBottom meet",children:[(0,t.jsx)("path",{d:"M 0 100 Q 200 50 400 150",fill:"none",stroke:"rgba(0,226,255,0.04)",strokeWidth:"4"}),(0,t.jsx)("path",{d:"M 0 120 Q 200 180 400 80",fill:"none",stroke:"rgba(0,226,255,0.04)",strokeWidth:"2",strokeDasharray:"8 8"}),(0,t.jsx)("circle",{cx:"350",cy:"130",r:"20",fill:"none",stroke:"rgba(0,226,255,0.06)",strokeWidth:"2"})]});case"fc-musdc":return(0,t.jsxs)("svg",{className:"fc-bg-element",viewBox:"0 0 200 200",preserveAspectRatio:"xRightYBottom meet",children:[(0,t.jsx)("ellipse",{cx:"140",cy:"160",rx:"40",ry:"15",fill:"none",stroke:"rgba(56,189,248,0.08)",strokeWidth:"2"}),(0,t.jsx)("ellipse",{cx:"140",cy:"140",rx:"40",ry:"15",fill:"none",stroke:"rgba(56,189,248,0.06)",strokeWidth:"1"}),(0,t.jsx)("ellipse",{cx:"140",cy:"120",rx:"40",ry:"15",fill:"none",stroke:"rgba(56,189,248,0.04)",strokeWidth:"1"}),(0,t.jsx)("path",{d:"M 100 160 L 100 120 M 180 160 L 180 120",stroke:"rgba(56,189,248,0.05)",strokeWidth:"1"})]});case"fc-swap":return(0,t.jsxs)("svg",{className:"fc-bg-element",viewBox:"0 0 200 200",preserveAspectRatio:"xRightYBottom meet",children:[(0,t.jsx)("path",{d:"M 100 50 A 50 50 0 1 1 50 100",fill:"none",stroke:"rgba(244,114,182,0.06)",strokeWidth:"4",strokeLinecap:"round"}),(0,t.jsx)("polygon",{points:"40,90 50,110 60,90",fill:"rgba(244,114,182,0.06)"}),(0,t.jsx)("path",{d:"M 100 150 A 50 50 0 0 1 150 100",fill:"none",stroke:"rgba(244,114,182,0.04)",strokeWidth:"2",strokeLinecap:"round"})]});case"fc-ai":return(0,t.jsxs)("svg",{className:"fc-bg-element",viewBox:"0 0 400 200",preserveAspectRatio:"xRightYBottom meet",children:[(0,t.jsx)("path",{d:"M -50 100 Q 100 -50 200 100 T 450 100",fill:"none",stroke:"rgba(217,70,239,0.06)",strokeWidth:"4"}),(0,t.jsx)("path",{d:"M -50 120 Q 100 -10 200 120 T 450 120",fill:"none",stroke:"rgba(217,70,239,0.04)",strokeWidth:"2",strokeDasharray:"8 8"}),(0,t.jsx)("circle",{cx:"200",cy:"100",r:"24",fill:"none",stroke:"rgba(217,70,239,0.08)",strokeWidth:"2"}),(0,t.jsx)("path",{d:"M 185 100 L 215 100 M 200 85 L 200 115",stroke:"rgba(217,70,239,0.08)",strokeWidth:"2"})]});case"fc-neural":return(0,t.jsxs)("svg",{className:"fc-bg-element",viewBox:"0 0 200 200",preserveAspectRatio:"xRightYBottom meet",children:[(0,t.jsx)("circle",{cx:"100",cy:"100",r:"60",fill:"none",stroke:"rgba(20,184,166,0.04)",strokeWidth:"1"}),(0,t.jsx)("circle",{cx:"100",cy:"100",r:"40",fill:"none",stroke:"rgba(20,184,166,0.06)",strokeWidth:"2"}),(0,t.jsx)("circle",{cx:"100",cy:"100",r:"20",fill:"none",stroke:"rgba(20,184,166,0.08)",strokeWidth:"4"}),(0,t.jsx)("circle",{cx:"100",cy:"100",r:"80",fill:"none",stroke:"rgba(20,184,166,0.03)",strokeWidth:"1",strokeDasharray:"4 4"})]});default:return null}}function b(){return(0,t.jsxs)("section",{style:{...a,paddingTop:"120px",paddingBottom:"120px",minHeight:"unset"},children:[(0,t.jsx)("style",{children:`
                .feat-wrap { max-width: 1200px; margin: 0 auto; width: 100%; position: relative; }
                .feat-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-auto-rows: minmax(160px, auto);
                    gap: 20px;
                    width: 100%;
                }
                
                /* Advanced Asymmetric Layout (3x6 pure bento) */
                .fc-pas { grid-column: 1 / 3; grid-row: 1 / 3; }    /* 2x2 Top Left */
                .fc-flash { grid-column: 3 / 4; grid-row: 1 / 3; }  /* 1x2 Top Right */
                .fc-xcm { grid-column: 1 / 3; grid-row: 3 / 4; }    /* 2x1 Middle Left */
                .fc-eth { grid-column: 3 / 4; grid-row: 3 / 5; }    /* 1x2 Middle Right */
                .fc-gov { grid-column: 1 / 3; grid-row: 4 / 6; }    /* 2x2 Bottom Left */
                .fc-musdc { grid-column: 1 / 2; grid-row: 6 / 7; }  /* 1x1 Bottom Left-ish */
                .fc-swap { grid-column: 2 / 3; grid-row: 6 / 7; }   /* 1x1 Bottom Mid */
                .fc-id { grid-column: 3 / 4; grid-row: 5 / 7; }     /* 1x2 Bottom Right */
                .fc-ai { grid-column: 1 / 3; grid-row: 7 / 8; }
                .fc-neural { grid-column: 3 / 4; grid-row: 7 / 8; }

                @media (max-width: 960px) {
                    .feat-grid { grid-template-columns: repeat(2, 1fr); }
                    .fc-pas { grid-column: 1 / 3; grid-row: span 2; }
                    .fc-flash { grid-column: span 1; grid-row: span 1; }
                    .fc-xcm { grid-column: 1 / 3; grid-row: span 1; }
                    .fc-eth { grid-column: span 1; grid-row: span 2; }
                    .fc-gov { grid-column: 1 / 3; grid-row: span 2; }
                    .fc-id { grid-column: span 1; grid-row: span 2; }
                    .fc-musdc, .fc-swap { grid-column: span 1; grid-row: span 1; }
                    .fc-ai { grid-column: 1 / 3; grid-row: span 1; }
                    .fc-neural { grid-column: span 2; grid-row: span 1; }
                }
                @media (max-width: 600px) {
                    .feat-grid { grid-template-columns: 1fr; }
                    .fc-pas, .fc-gov, .fc-xcm, .fc-ai { grid-column: 1 / 2; grid-row: span 1; }
                    .fc-flash, .fc-eth, .fc-musdc, .fc-swap, .fc-id, .fc-neural { grid-column: 1 / 2; grid-row: span 1; }
                }

                .feat-card {
                    border-radius: 28px;
                    border: 1px solid rgba(255,255,255,0.06);
                    background: rgba(10,12,16,0.65);
                    backdrop-filter: blur(28px);
                    -webkit-backdrop-filter: blur(28px);
                    padding: 36px;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                    cursor: default;
                    position: relative;
                    overflow: hidden;
                    box-shadow: inset 0 1px 1px rgba(255,255,255,0.05), 0 8px 24px rgba(0,0,0,0.2);
                }
                
                /* The base radial gradient to give internal light */
                .feat-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 10% 10%, rgba(255,255,255,0.03) 0%, transparent 80%);
                    pointer-events: none;
                }
                
                .feat-card:hover {
                    border-color: rgba(255,255,255,0.18);
                    background: rgba(18,22,28,0.85);
                    transform: translateY(-6px);
                    box-shadow: 0 20px 48px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.12);
                }

                /* Absolute container for bespoke background SVGs */
                .fc-bg-element {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                    transition: transform 0.5s ease-out, filter 0.5s;
                }
                .feat-card:hover .fc-bg-element {
                    transform: scale(1.05);
                    filter: brightness(1.5);
                }

                /* Colored tinting for the huge cards */
                .fc-pas { background: rgba(34,197,94,0.03); border-color: rgba(34,197,94,0.12); }
                .fc-pas:hover { border-color: rgba(34,197,94,0.25); background: rgba(34,197,94,0.06); }
                
                .fc-gov { background: rgba(129,140,248,0.02); border-color: rgba(129,140,248,0.1); }
                .fc-gov:hover { background: rgba(129,140,248,0.05); border-color: rgba(129,140,248,0.2); }
            `}),(0,t.jsxs)(r.motion.div,{className:"feat-wrap",initial:"hidden",whileInView:"show",viewport:{once:!0,margin:"-60px"},variants:f,children:[(0,t.jsxs)(r.motion.div,{variants:u,style:{marginBottom:"40px"},children:[(0,t.jsx)("p",{style:l,children:"Core Architecture"}),(0,t.jsxs)("h2",{style:{fontSize:"clamp(40px, 5vw, 64px)",fontWeight:700,color:s,letterSpacing:"-0.04em",lineHeight:1.05},children:["Multi-Chain Supply.",(0,t.jsx)("br",{}),(0,t.jsx)("span",{style:{color:"#E2E8F0",opacity:.35},children:"Unified Credit Engine."})]})]}),(0,t.jsx)("div",{className:"feat-grid",children:m.map(e=>{let i="fc-pas"===e.cls||"fc-gov"===e.cls,o="fc-flash"===e.cls||"fc-eth"===e.cls||"fc-id"===e.cls,n="fc-xcm"===e.cls||"fc-ai"===e.cls;return(0,t.jsxs)(r.motion.div,{variants:u,className:`feat-card ${e.cls}`,children:[(0,t.jsx)(y,{id:e.cls}),(0,t.jsxs)("div",{style:{position:"relative",zIndex:1,display:"flex",flexDirection:"column",height:"100%"},children:[(0,t.jsx)("div",{style:{width:i?64:48,height:i?64:48,borderRadius:16,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:i?"28px":"20px",color:e.color,marginBottom:i||n?"32px":"24px",boxShadow:`0 8px 16px ${e.color}15`,backdropFilter:"blur(10px)"},children:e.icon}),(0,t.jsxs)("div",{style:{marginTop:o?"auto":"0"},children:[(0,t.jsx)("p",{style:{fontSize:i?"28px":"18px",fontWeight:700,color:s,marginBottom:"12px",letterSpacing:"-0.02em",lineHeight:1.1},children:e.title}),(0,t.jsx)("p",{style:{fontSize:i?"16px":"14px",color:"#E2E8F0",lineHeight:1.6,maxWidth:i||n?"80%":"100%"},children:e.desc})]}),"stat"in e&&(0,t.jsxs)("div",{style:{marginTop:"auto",paddingTop:"32px",display:"flex",alignItems:"baseline",gap:"10px"},children:[(0,t.jsx)("span",{style:{fontSize:"56px",fontWeight:700,color:e.color,letterSpacing:"-0.04em",lineHeight:1},children:e.stat}),(0,t.jsx)("span",{style:{fontSize:"11px",fontFamily:"ui-monospace,monospace",color:"#94A3B8",letterSpacing:"2.5px",textTransform:"uppercase"},children:e.statLabel})]})]})]},e.title)})})]})]})}let j=[{cls:"tc-1",name:"ANON",pts:"0",ltv:"50%",rate:"12%",color:"#475569",hero:!1},{cls:"tc-2",name:"BRONZE",pts:"100",ltv:"60%",rate:"10%",color:"#CD7F32",hero:!1},{cls:"tc-3",name:"SILVER",pts:"500",ltv:"70%",rate:"8%",color:"#94A3B8",hero:!1},{cls:"tc-4",name:"GOLD",pts:"2,000",ltv:"78%",rate:"6.5%",color:"#F59E0B",hero:!1},{cls:"tc-5",name:"PLATINUM",pts:"10,000",ltv:"83%",rate:"5%",color:"#00E2FF",hero:!1},{cls:"tc-6",name:"DIAMOND",pts:"50,000",ltv:"85%",rate:"3%",color:"#E81CFF",hero:!0}],k={hidden:{},show:{transition:{staggerChildren:.06,delayChildren:.06}}},v={hidden:{opacity:0,y:12},show:{opacity:1,y:0,transition:{duration:.42,ease:"easeOut"}}};function w(){return(0,t.jsxs)("section",{style:{...a},children:[(0,t.jsx)("style",{children:`
                .tiers-wrap {
                    max-width: 1200px; 
                    margin: 0 auto; 
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    gap: 64px;
                    align-items: flex-start;
                }
                
                @media (max-width: 900px) {
                    .tiers-wrap { grid-template-columns: 1fr; gap: 48px; }
                    .sticky-left { position: relative !important; top: 0 !important; }
                }

                .sticky-left {
                    position: sticky;
                    top: 120px;
                }

                .ladder-container {
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    padding-bottom: 80px;
                }

                /* Background timeline rail */
                .ladder-container::before {
                    content: '';
                    position: absolute;
                    left: -24px;
                    top: 24px;
                    bottom: 24px;
                    width: 2px;
                    background: rgba(255,255,255,0.05);
                    border-radius: 2px;
                }

                .tier-card {
                    border-radius: 24px;
                    border: 1px solid rgba(255,255,255,0.06);
                    background: rgba(10,12,16,0.65);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    padding: 36px 40px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    min-height: 220px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 -12px 32px rgba(0,0,0,0.5);
                    /* Margin top pulls the card up to overlap the previous one slightly */
                    margin-top: -40px;
                    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                
                /* First card doesn't overlap anything */
                .tier-card:first-child { margin-top: 0; }

                .tier-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 100% 0%, rgba(255,255,255,0.05) 0%, transparent 60%);
                    pointer-events: none;
                }
                
                .tier-card:hover { 
                    transform: translateY(-8px); 
                }

                /* The active timeline dot beside each card */
                .timeline-dot {
                    position: absolute;
                    left: -24px;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #0f172a;
                    border: 2px solid;
                    z-index: 10;
                }

                .tier-card.hero-card {
                    border-color: rgba(232,28,255,0.3);
                    background: rgba(15,10,20,0.85);
                    box-shadow: 0 -16px 48px rgba(0,0,0,0.6), 0 0 80px rgba(232,28,255,0.1);
                    margin-top: -20px; /* Hero card pops out a bit more */
                }
                .tier-card.hero-card::before {
                    background: radial-gradient(circle at 100% 0%, rgba(232,28,255,0.15) 0%, transparent 70%);
                }
            `}),(0,t.jsxs)("div",{className:"tiers-wrap",children:[(0,t.jsxs)(r.motion.div,{className:"sticky-left",initial:{opacity:0,x:-20},whileInView:{opacity:1,x:0},viewport:{once:!0,margin:"-100px"},transition:{duration:.6},children:[(0,t.jsx)("p",{style:l,children:"The Path to Diamond"}),(0,t.jsxs)("h2",{style:{fontSize:"clamp(32px, 4vw, 48px)",fontWeight:700,color:s,letterSpacing:"-0.04em",lineHeight:1.05,marginBottom:"16px"},children:["Climb the Ladder.",(0,t.jsx)("br",{}),(0,t.jsx)("span",{style:{color:"#E81CFF"},children:"Unlock Capital."})]}),(0,t.jsx)("p",{style:{fontSize:"15px",color:"#E2E8F0",lineHeight:1.7,maxWidth:"420px",marginBottom:"32px"},children:"Kredio replaces fragmented identity with a unified on-chain reputation. Start at Anon with basic terms. Prove your reliability through repayments and governance. Unlock institutional-grade liquidity at Diamond."}),(0,t.jsxs)("div",{style:{display:"flex",gap:"24px"},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{style:{fontSize:"28px",fontWeight:700,color:s,letterSpacing:"-0.04em"},children:"6"}),(0,t.jsx)("p",{style:{fontSize:"10px",color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.15em"},children:"Tiers"})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{style:{fontSize:"28px",fontWeight:700,color:"#00E2FF",letterSpacing:"-0.04em"},children:["85",(0,t.jsx)("span",{style:{fontSize:"18px"},children:"%"})]}),(0,t.jsx)("p",{style:{fontSize:"10px",color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.15em"},children:"Max LTV"})]}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{style:{fontSize:"28px",fontWeight:700,color:"#E81CFF",letterSpacing:"-0.04em"},children:["3",(0,t.jsx)("span",{style:{fontSize:"18px"},children:"%"})]}),(0,t.jsx)("p",{style:{fontSize:"10px",color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.15em"},children:"Base Rate"})]})]})]}),(0,t.jsx)(r.motion.div,{className:"ladder-container",initial:"hidden",whileInView:"show",viewport:{once:!0,margin:"-100px"},variants:k,children:j.map((e,i)=>(0,t.jsxs)(r.motion.div,{variants:v,className:`tier-card ${e.hero?"hero-card":""}`,style:{zIndex:i,transformOrigin:"center center"},children:[(0,t.jsx)("div",{className:"timeline-dot",style:{borderColor:e.color,boxShadow:`0 0 12px ${e.color}`}}),(0,t.jsx)("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between"},children:(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"},children:[(0,t.jsx)("span",{style:{width:10,height:10,borderRadius:"50%",background:e.color,boxShadow:`0 0 16px ${e.color}`,flexShrink:0,display:"inline-block"}}),(0,t.jsx)("span",{style:{fontSize:"14px",fontFamily:"ui-monospace,monospace",fontWeight:800,color:e.color,letterSpacing:"3px"},children:e.name}),e.hero&&(0,t.jsx)("span",{style:{marginLeft:"12px",fontSize:"9px",fontFamily:"ui-monospace,monospace",color:o,letterSpacing:"1.5px",background:"rgba(232,28,255,0.15)",padding:"4px 10px",borderRadius:"6px"},children:"ULTIMATE TIER"})]}),(0,t.jsxs)("p",{style:{fontSize:"11px",fontFamily:"ui-monospace,monospace",color:"#CBD5E1",display:"flex",alignItems:"center",gap:"6px"},children:[(0,t.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,t.jsx)("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})}),e.pts," SCORE REQUIRED"]})]})}),(0,t.jsxs)("div",{style:{display:"flex",gap:"48px",marginTop:"auto",paddingTop:"24px"},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{style:{fontSize:"10px",fontFamily:"ui-monospace,monospace",color:"#94A3B8",letterSpacing:"1.5px",marginBottom:"6px",textTransform:"uppercase"},children:"Max LTV"}),(0,t.jsx)("p",{style:{fontSize:"36px",fontWeight:700,color:s,letterSpacing:"-0.04em",lineHeight:1},children:e.ltv})]}),(0,t.jsx)("div",{style:{width:"1px",background:"rgba(255,255,255,0.08)"}}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{style:{fontSize:"10px",fontFamily:"ui-monospace,monospace",color:"#94A3B8",letterSpacing:"1.5px",marginBottom:"6px",textTransform:"uppercase"},children:"Borrow Rate"}),(0,t.jsx)("p",{style:{fontSize:"36px",fontWeight:700,letterSpacing:"-0.04em",lineHeight:1,color:e.hero?o:s},children:e.rate})]})]})]},e.name))})]})]})}var S=e.i(522016);function B(){return(0,t.jsxs)("section",{style:{...a,justifyContent:"center",alignItems:"center",textAlign:"center",position:"relative",overflow:"hidden"},children:[(0,t.jsx)("div",{style:{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 50% at 50% 60%, rgba(232,28,255,0.06) 0%, transparent 70%)",pointerEvents:"none"}}),(0,t.jsxs)(r.motion.div,{initial:{opacity:0,y:32},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-60px"},transition:{duration:.8,ease:[.22,1,.36,1]},style:{position:"relative",zIndex:1,maxWidth:"560px"},children:[(0,t.jsx)("p",{style:{fontSize:"9px",fontFamily:"ui-monospace,monospace",letterSpacing:"0.24em",textTransform:"uppercase",color:"#CBD5E1",marginBottom:"28px"},children:"READY TO UPGRADE?"}),(0,t.jsxs)("h2",{style:{fontSize:"clamp(48px, 7vw, 96px)",fontWeight:700,lineHeight:.9,letterSpacing:"-0.06em",color:s,marginBottom:"28px"},children:["Start at",(0,t.jsx)("br",{}),"ANON."]}),(0,t.jsx)("p",{style:{fontSize:"15px",lineHeight:1.9,color:"#E2E8F0",marginBottom:"48px",maxWidth:"400px",margin:"0 auto 48px"},children:"Join anon, become Diamond. Stop paying equal rates for unequal reliability. Build your unkillable on-chain credit history right now."}),(0,t.jsxs)("div",{style:{position:"relative",display:"inline-block"},children:[(0,t.jsx)("div",{style:{position:"absolute",inset:"-12px",background:"radial-gradient(ellipse, rgba(232,28,255,0.18) 0%, transparent 70%)",borderRadius:"999px",pointerEvents:"none"}}),(0,t.jsx)(S.default,{href:"/dashboard",style:{display:"inline-block",position:"relative",padding:"14px 40px",borderRadius:"12px",background:o,color:"#000",fontSize:"13px",fontWeight:700,textDecoration:"none",letterSpacing:"0.02em",boxShadow:"0 0 32px rgba(232,28,255,0.4)",transition:"box-shadow 0.2s, transform 0.2s"},onMouseEnter:e=>{e.currentTarget.style.boxShadow="0 0 56px rgba(232,28,255,0.65)",e.currentTarget.style.transform="translateY(-2px)"},onMouseLeave:e=>{e.currentTarget.style.boxShadow="0 0 32px rgba(232,28,255,0.4)",e.currentTarget.style.transform="translateY(0)"},children:"Open Lending Markets →"})]})]})]})}let F=[{label:"Dashboard",href:"/dashboard"},{label:"Lend",href:"/lend"},{label:"Borrow",href:"/borrow"},{label:"Swap",href:"/swap"},{label:"Bridge",href:"/bridge"},{label:"Markets",href:"/markets"}];function M(){return(0,t.jsxs)("footer",{style:{scrollSnapAlign:"start",scrollSnapStop:"always",minHeight:"36vh",paddingTop:"56px",paddingBottom:"36px",borderTop:"1px solid rgba(255,255,255,0.07)",width:"100%",boxSizing:"border-box"},children:[(0,t.jsx)("style",{children:`
                @media (max-width:640px) {
                    .footer-cols { flex-direction:column !important; gap:36px !important; }
                }
            `}),(0,t.jsxs)("div",{className:"footer-cols",style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"48px",flexWrap:"wrap"},children:[(0,t.jsxs)("div",{style:{flex:"0 0 auto",maxWidth:"260px"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"},children:[(0,t.jsx)("div",{style:{width:28,height:28,borderRadius:"6px",border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.03)",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,t.jsx)("svg",{width:"13",height:"13",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:1.5,style:{color:"rgba(255,255,255,0.55)"},children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"})})}),(0,t.jsx)("span",{style:{fontSize:"12px",fontWeight:300,letterSpacing:"0.24em",color:s,textTransform:"uppercase"},children:"Kredio"})]}),(0,t.jsx)("p",{style:{fontSize:"12px",color:"#CBD5E1",lineHeight:1.8,marginBottom:"16px"},children:"Decentralized, reputation-based credit markets running on Polkadot's unified execution environment. Fund, participate, and earn your score permanently on-chain."}),(0,t.jsx)("span",{style:{display:"inline-flex",alignItems:"center",gap:"5px",padding:"3px 10px",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"6px",fontSize:"7.5px",fontFamily:"ui-monospace,monospace",color:"#94A3B8",letterSpacing:"1.5px",textTransform:"uppercase"}})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{style:{fontSize:"8px",fontFamily:"ui-monospace,monospace",color:n,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:"18px"},children:"Protocol"}),(0,t.jsx)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 32px"},children:F.map(e=>(0,t.jsx)(S.default,{href:e.href,style:{fontSize:"12px",color:"#CBD5E1",textDecoration:"none",transition:"color 0.15s"},onMouseEnter:e=>e.currentTarget.style.color="#FFFFFF",onMouseLeave:e=>e.currentTarget.style.color="#CBD5E1",children:e.label},e.href))})]}),(0,t.jsx)("div",{style:{flex:"0 0 auto",textAlign:"right"},children:(0,t.jsxs)("p",{style:{fontSize:"11px",color:"#1e293b",letterSpacing:"-0.01em",lineHeight:1.5},children:[(0,t.jsx)("span",{style:{color:"#334155"},children:"Start at "}),"ANON.",(0,t.jsx)("br",{}),(0,t.jsx)("span",{style:{color:"#334155"},children:"Earn your way to "}),(0,t.jsx)("span",{style:{color:o},children:"DIAMOND."})]})})]}),(0,t.jsxs)("div",{style:{marginTop:"40px",borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"12px"},children:[(0,t.jsx)("span",{style:{fontSize:"9px",fontFamily:"ui-monospace,monospace",color:"#334155"},children:"© 2026 Kredio. Polkadot Testnet."}),(0,t.jsx)("span",{style:{fontSize:"9px",fontFamily:"ui-monospace,monospace",color:"#334155"},children:"Built on Polkadot Asset Hub"})]})]})}let E=[{num:"01",bgId:"hiw-engine",title:"Credit Scoring Engine",mechanism:"Every user starts at Tier 0 (Anon) with a 30% LTV cap and 22% APY. The kredit_agent PVM contract continuously recomputes a score from 0–100 using six weighted behavioral signals: repayment streak, deposit magnitude, borrow frequency, liquidation history, account age, and governance participation. A single liquidation drops the score by 40 points.",innovation:"Score is computed entirely on-chain inside a PVM contract - no oracle, no off-chain backend, no trusted committee. Deterministic, auditable, and gas-efficient.",color:"#A78BFA",icon:"◈"},{num:"02",bgId:"hiw-neural",title:"Neural Scorer",mechanism:"Running in parallel, the neural_scorer PVM contract implements a 2-layer MLP. It normalizes behavioral features into weights to produce an independent neural score. It outputs Confidence % (agreement with deterministic score) and Delta from Rule (signed difference of performance vs rulebook).",innovation:"A user gaming rules (e.g., inflating streaks) shows a high deterministic score but low neural score - producing a large negative delta that flags manipulation. Pure on-chain smart contract resistance.",color:"#38BDF8",icon:"◉"},{num:"03",bgId:"hiw-risk",title:"Dynamic Risk Assessment",mechanism:"The risk_assessor PVM evaluates individual positions, predicting liquidation probability (0–100%) using: Debt-to-Collateral, Credit Score, and 7-day collateral price volatility trend. It outputs Risk Tier, blocks to liquidation, and required top-up amount to return to a Safe status.",innovation:"Forward-looking, trend-aware risk scoring. Unlike standard DeFi models using only current price snapshots, Kredio risk reacts preemptively to falling, stable, or rising price vectors.",color:"#34D399",icon:"▲"},{num:"04",bgId:"hiw-yield",title:"Autonomous Strategy",mechanism:"YieldMind (PVM) evaluates market context (Utilization, Volatility, Avg Credit Score of borrower base) to output a reasoning_code. High utilization (>70%) halts deployment. High volatility reroutes to conservative yielding. Normal states scale allocations linearly based on borrower credit quality.",innovation:"Yield strategy is dynamically coupled to the behavioral quality of borrowers. A feedback loop connecting protocol-wide credit health to external capital allocation routing.",color:"#FBBF24",icon:"⬡"},{num:"05",bgId:"hiw-xcm",title:"Cross-Chain Settlement",mechanism:"The KredioXCMSettler handles XCM Transact payloads compounding atomic intents (Swap → Deposit → Borrow). The KredioAccountRegistry links SR25519 Substrate identities to EVM via cryptographic verification. KredioBridgeMinter provides lock-and-mint EVM bridging directly into protocol use.",innovation:"The SR25519 ↔ EVM identity link means Polkadot on-chain identity (KILT credentials, parachain behavior) flows directly into credit scoring as a first-class primitive.",color:"#F472B6",icon:"⇌"}];function A({id:e}){switch(e){case"hiw-engine":return(0,t.jsxs)("svg",{className:"hiw-bg-element",viewBox:"0 0 200 400",preserveAspectRatio:"none",children:[(0,t.jsx)("circle",{cx:"100",cy:"200",r:"140",fill:"none",stroke:"rgba(167,139,250,0.04)",strokeWidth:"2"}),(0,t.jsx)("circle",{cx:"100",cy:"200",r:"100",fill:"none",stroke:"rgba(167,139,250,0.06)",strokeWidth:"4"}),(0,t.jsx)("circle",{cx:"100",cy:"200",r:"60",fill:"none",stroke:"rgba(167,139,250,0.08)",strokeWidth:"1",strokeDasharray:"4 4"})]});case"hiw-neural":return(0,t.jsxs)("svg",{className:"hiw-bg-element",viewBox:"0 0 400 200",preserveAspectRatio:"xRightYBottom meet",children:[(0,t.jsx)("path",{d:"M -50 100 Q 100 -50 200 100 T 450 100",fill:"none",stroke:"rgba(56,189,248,0.06)",strokeWidth:"4"}),(0,t.jsx)("path",{d:"M -50 120 Q 100 -10 200 120 T 450 120",fill:"none",stroke:"rgba(56,189,248,0.04)",strokeWidth:"2",strokeDasharray:"8 8"}),(0,t.jsx)("circle",{cx:"200",cy:"100",r:"24",fill:"none",stroke:"rgba(56,189,248,0.08)",strokeWidth:"2"}),(0,t.jsx)("path",{d:"M 185 100 L 215 100 M 200 85 L 200 115",stroke:"rgba(56,189,248,0.08)",strokeWidth:"2"})]});case"hiw-risk":return(0,t.jsxs)("svg",{className:"hiw-bg-element",viewBox:"0 0 200 400",preserveAspectRatio:"xRightYBottom meet",children:[(0,t.jsx)("path",{d:"M 50 400 Q 100 250 150 400",fill:"none",stroke:"rgba(52,211,153,0.04)",strokeWidth:"20"}),(0,t.jsx)("path",{d:"M 70 400 Q 100 300 130 400",fill:"none",stroke:"rgba(52,211,153,0.06)",strokeWidth:"10"}),(0,t.jsx)("circle",{cx:"100",cy:"380",r:"15",fill:"none",stroke:"rgba(52,211,153,0.08)",strokeWidth:"4"})]});case"hiw-yield":return(0,t.jsxs)("svg",{className:"hiw-bg-element",viewBox:"0 0 200 200",preserveAspectRatio:"xRightYBottom meet",children:[(0,t.jsx)("ellipse",{cx:"140",cy:"160",rx:"40",ry:"15",fill:"none",stroke:"rgba(251,191,36,0.08)",strokeWidth:"2"}),(0,t.jsx)("ellipse",{cx:"140",cy:"140",rx:"40",ry:"15",fill:"none",stroke:"rgba(251,191,36,0.06)",strokeWidth:"1"}),(0,t.jsx)("ellipse",{cx:"140",cy:"120",rx:"40",ry:"15",fill:"none",stroke:"rgba(251,191,36,0.04)",strokeWidth:"1"}),(0,t.jsx)("path",{d:"M 100 160 L 100 120 M 180 160 L 180 120",stroke:"rgba(251,191,36,0.05)",strokeWidth:"1"})]});case"hiw-xcm":return(0,t.jsxs)("svg",{className:"hiw-bg-element",viewBox:"0 0 400 200",preserveAspectRatio:"xRightYBottom meet",children:[(0,t.jsx)("path",{d:"M 0 100 Q 200 50 400 150",fill:"none",stroke:"rgba(244,114,182,0.04)",strokeWidth:"4"}),(0,t.jsx)("path",{d:"M 0 120 Q 200 180 400 80",fill:"none",stroke:"rgba(244,114,182,0.04)",strokeWidth:"2",strokeDasharray:"8 8"}),(0,t.jsx)("circle",{cx:"350",cy:"130",r:"20",fill:"none",stroke:"rgba(244,114,182,0.06)",strokeWidth:"2"})]});default:return null}}function C(){let e=(0,i.useRef)(null);return(0,t.jsxs)("section",{style:{...a,paddingTop:"120px",paddingBottom:"120px",minHeight:"unset"},children:[(0,t.jsx)("style",{children:`
                 /* Carousel Container */
                .hiw-carousel {
                    display: flex;
                    overflow-x: auto;
                    scroll-snap-type: x mandatory;
                    scroll-behavior: smooth;
                    gap: 32px;
                    padding: 20px 5vw 80px 5vw; /* Soft padding inside, so box shadows aren't clipped */
                    width: 100%;
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none;    /* Firefox */
                }
                .hiw-carousel::-webkit-scrollbar {
                    display: none; /* Chrome, Safari and Opera */
                }

                .hiw-card-wrapper {
                    flex-shrink: 0;
                    width: 440px;
                    scroll-snap-align: center;
                    display: flex;
                }

                @media (max-width: 600px) {
                    .hiw-card-wrapper { width: 85vw; }
                }

                /* Aesthetic Card matching FeaturesSection */
                .hiw-card {
                    border-radius: 28px;
                    border: 1px solid rgba(255,255,255,0.06);
                    background: rgba(10,12,16,0.65);
                    backdrop-filter: blur(28px);
                    -webkit-backdrop-filter: blur(28px);
                    padding: 36px;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                    cursor: default;
                    position: relative;
                    overflow: hidden;
                    box-shadow: inset 0 1px 1px rgba(255,255,255,0.05), 0 8px 24px rgba(0,0,0,0.2);
                    height: 100%;
                    width: 100%;
                }
                
                .hiw-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 10% 10%, rgba(255,255,255,0.03) 0%, transparent 80%);
                    pointer-events: none;
                }
                
                .hiw-card:hover {
                    border-color: rgba(255,255,255,0.18);
                    background: rgba(18,22,28,0.85);
                    transform: translateY(-6px);
                    box-shadow: 0 20px 48px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.12);
                }

                .hiw-bg-element {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                    transition: transform 0.5s ease-out, filter 0.5s;
                }
                .hiw-card:hover .hiw-bg-element {
                    transform: scale(1.05);
                    filter: brightness(1.5);
                }

                .hiw-icon-container {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    margin-bottom: 28px;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                    backdrop-filter: blur(10px);
                    position: relative;
                    z-index: 1;
                }

                .hiw-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: ${s};
                    margin-bottom: 12px;
                    letter-spacing: -0.02em;
                    line-height: 1.2;
                    position: relative;
                    z-index: 1;
                }

                .hiw-desc {
                    font-size: 14px;
                    color: #CBD5E1;
                    line-height: 1.65;
                    position: relative;
                    z-index: 1;
                }

                /* Blockquote style for Innovation */
                .hiw-innovation {
                    margin-top: auto;
                    padding-top: 24px;
                    position: relative;
                    z-index: 1;
                }
                
                .hiw-table {
                    margin-top: 24px;
                    margin-bottom: 16px;
                    width: 100%;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    overflow: hidden;
                    font-size: 13px;
                    position: relative;
                    z-index: 1;
                }
                .hiw-th {
                    display: grid;
                    grid-template-columns: 2fr 1.5fr 1.5fr 1fr;
                    padding: 8px 12px;
                    background: rgba(255,255,255,0.04);
                    color: rgba(255,255,255,0.5);
                    font-weight: 500;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .hiw-tr {
                    display: grid;
                    grid-template-columns: 2fr 1.5fr 1.5fr 1fr;
                    padding: 8px 12px;
                    border-top: 1px solid rgba(255,255,255,0.04);
                    color: #E2E8F0;
                }
                .hiw-tr:hover {
                    background: rgba(255,255,255,0.03);
                }

                /* Background subtle tints */
                .hiw-card-bg {
                    position: absolute;
                    inset: 0;
                    opacity: 0.03;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                    z-index: 0;
                }
                .hiw-card:hover .hiw-card-bg {
                    opacity: 0.08;
                }

            `}),(0,t.jsxs)(r.motion.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-60px"},transition:{duration:.7,ease:[.22,1,.36,1]},style:{paddingLeft:"5vw",marginBottom:"40px",display:"flex",alignItems:"baseline",gap:"24px"},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{style:l,children:"Technical Specification"}),(0,t.jsx)("h2",{style:{fontSize:"clamp(40px, 5vw, 64px)",fontWeight:700,color:s,letterSpacing:"-0.04em",lineHeight:1.05},children:"How It Works."})]}),(0,t.jsxs)(r.motion.div,{initial:{opacity:.3,x:0},animate:{opacity:1,x:10},transition:{duration:1.5,repeat:1/0,repeatType:"reverse",ease:"easeInOut"},style:{display:"flex",alignItems:"center",gap:"8px",color:n,fontSize:"14px",fontFamily:"ui-monospace,monospace",textTransform:"uppercase",letterSpacing:"0.1em"},children:[(0,t.jsx)("span",{style:{display:"none","@media (min-width: 768px)":{display:"inline"}},children:"Scroll"}),(0,t.jsxs)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("line",{x1:"5",y1:"12",x2:"19",y2:"12"}),(0,t.jsx)("polyline",{points:"12 5 19 12 12 19"})]})]})]}),(0,t.jsx)(r.motion.div,{className:"hiw-carousel",ref:e,initial:{opacity:0,x:40},whileInView:{opacity:1,x:0},viewport:{once:!0,margin:"-60px"},transition:{duration:.7,ease:[.22,1,.36,1],delay:.1},children:E.map((e,i)=>(0,t.jsx)("div",{className:"hiw-card-wrapper",children:(0,t.jsxs)("div",{className:"hiw-card",style:{borderColor:`${e.color}15`},children:[(0,t.jsx)("div",{className:"hiw-card-bg",style:{background:`linear-gradient(135deg, transparent 40%, ${e.color} 100%)`}}),(0,t.jsx)(A,{id:e.bgId}),(0,t.jsx)("div",{className:"hiw-icon-container",style:{color:e.color,boxShadow:`0 8px 16px ${e.color}15`},children:e.icon}),(0,t.jsxs)("h3",{className:"hiw-title",children:[e.num,". ",e.title]}),(0,t.jsxs)("p",{className:"hiw-desc",children:[(0,t.jsx)("span",{style:{color:s,display:"block",marginBottom:"4px",fontWeight:500},children:"The Mechanism"}),e.mechanism]}),(0,t.jsxs)("div",{className:"hiw-innovation",children:[(0,t.jsx)("div",{style:{width:"100%",height:"1px",background:"rgba(255,255,255,0.06)",marginBottom:"20px"}}),(0,t.jsxs)("p",{className:"hiw-desc",children:[(0,t.jsx)("span",{style:{color:e.color,display:"block",marginBottom:"4px",fontSize:"12px",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em"},children:"The Innovation"}),e.innovation]})]})]})},e.num))})]})}function T(){return(0,i.useEffect)(()=>{let e=document.documentElement;return e.style.scrollSnapType="y mandatory",e.style.scrollBehavior="smooth",e.style.scrollPaddingTop="64px",()=>{e.style.scrollSnapType="",e.style.scrollBehavior="",e.style.scrollPaddingTop=""}},[]),(0,t.jsxs)("div",{style:{width:"100%",maxWidth:"100%"},children:[(0,t.jsx)(p,{}),(0,t.jsx)(g,{}),(0,t.jsx)(b,{}),(0,t.jsx)(C,{}),(0,t.jsx)(w,{}),(0,t.jsx)(B,{}),(0,t.jsx)(M,{})]})}e.s(["default",()=>T],331713)}]);