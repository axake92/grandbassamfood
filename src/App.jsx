import { useState, useEffect } from "react"

const C = {
  orange:"#DA6C20", orangeD:"#9B4212", orangeL:"#F0882A",
  green:"#207438", greenD:"#164D25",
  gold:"#D2A84E", goldL:"#E8CC80",
  ivory:"#FCF7EE", cream:"#F4E8D0", sand:"#EADAB7",
  charcoal:"#241E1A", brown:"#9A7A4A",
}

function KenteStrip({ h=8, opacity=1 }) {
  const cols=[C.orangeD,"#C85A14",C.orange,"#E0D0A0",C.orange,C.green,C.orange,"#E0D0A0",C.orange,"#C85A14",C.orangeD]
  return(
    <div style={{display:"flex",height:h,overflow:"hidden",opacity,flexShrink:0}}>
      {cols.map((c,i)=><div key={i} style={{flex:1,background:c}}/>)}
    </div>
  )
}

function CIVBar({w=80,h=5,style={}}) {
  return(
    <div style={{display:"flex",width:w,height:h,borderRadius:3,overflow:"hidden",...style}}>
      <div style={{flex:1,background:C.orange}}/>
      <div style={{flex:1,background:"#E8E0D0"}}/>
      <div style={{flex:1,background:C.green}}/>
    </div>
  )
}

function Logo({size=80,style={}}) {
  return(
    <img src="/logo.png" alt="Grand Bassam Food"
      style={{width:size,height:size,borderRadius:"50%",
        boxShadow:`0 2px 16px ${C.gold}66`,
        objectFit:"cover",flexShrink:0,...style}}/>
  )
}

function SectionTitle({sub,title,light=false}) {
  return(
    <div style={{textAlign:"center",marginBottom:"2.5rem"}}>
      <CIVBar style={{margin:"0 auto 0.9rem"}}/>
      {sub&&<p style={{fontFamily:"'Lora',serif",fontStyle:"italic",fontSize:"0.9rem",
        color:light?C.goldL:C.brown,marginBottom:"0.4rem",letterSpacing:"0.08em"}}>{sub}</p>}
      <h2 style={{fontFamily:"'Lora',serif",fontSize:"clamp(1.6rem,4vw,2.4rem)",
        color:light?C.gold:C.orangeD,margin:0,fontWeight:600}}>{title}</h2>
      <CIVBar style={{margin:"0.9rem auto 0"}}/>
    </div>
  )
}

/* NAV */
function Nav() {
  const [scrolled,setScrolled]=useState(false)
  const [open,setOpen]=useState(false)
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>60)
    window.addEventListener("scroll",fn)
    return()=>window.removeEventListener("scroll",fn)
  },[])
  const scroll=(id)=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setOpen(false)}
  const links=[["accueil","Accueil"],["menu","Menu"],["apropos","À propos"],["devis","Devis"]]
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,
      background:scrolled?"rgba(22,77,37,0.97)":"transparent",
      backdropFilter:scrolled?"blur(12px)":"none",transition:"all 0.3s",
      borderBottom:scrolled?`1px solid ${C.gold}33`:"none"}}>
      <KenteStrip h={4} opacity={scrolled?1:0.5}/>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 1.5rem",
        display:"flex",alignItems:"center",justifyContent:"space-between",height:64}}>
        <div onClick={()=>scroll("accueil")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:"0.75rem"}}>
          <Logo size={44}/>
          <div>
            <div style={{fontFamily:"'Lora',serif",color:C.gold,fontSize:"1.05rem",lineHeight:1.2}}>Grand Bassam</div>
            <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,color:"white",fontSize:"0.72rem",letterSpacing:"0.22em"}}>FOOD</div>
          </div>
        </div>
        <div className="desktop-nav" style={{display:"flex",gap:"0.3rem",alignItems:"center"}}>
          {links.map(([id,label])=>(
            <button key={id} onClick={()=>scroll(id)} style={{
              padding:"0.45rem 1.1rem",borderRadius:20,border:"none",fontWeight:600,fontSize:"0.82rem",
              background:id==="devis"?C.orange:"transparent",color:id==="devis"?"white":C.goldL,transition:"all 0.2s"
            }}>{label}</button>
          ))}
        </div>
        <button className="hamburger" onClick={()=>setOpen(!open)}
          style={{display:"none",background:"none",border:"none",color:C.goldL,fontSize:"1.6rem",alignItems:"center"}}>
          {open?"✕":"☰"}
        </button>
      </div>
      {open&&(
        <div style={{background:C.greenD,padding:"0.5rem 1.5rem 1rem",borderTop:`1px solid ${C.gold}22`}}>
          {links.map(([id,label])=>(
            <button key={id} onClick={()=>scroll(id)} style={{
              display:"block",width:"100%",textAlign:"left",padding:"0.75rem 0",
              background:"none",border:"none",borderBottom:`1px solid ${C.gold}18`,
              fontWeight:600,fontSize:"0.92rem",color:id==="devis"?C.orange:C.goldL}}>{label}</button>
          ))}
        </div>
      )}
    </nav>
  )
}

/* HERO */
function Hero() {
  const scroll=(id)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"})
  return(
    <section id="accueil" style={{minHeight:"100vh",
      background:`linear-gradient(155deg,${C.greenD} 0%,#1A4A28 45%,${C.orangeD} 100%)`,
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      textAlign:"center",padding:"7rem 1.5rem 4rem",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:0.06,pointerEvents:"none",
        backgroundImage:`repeating-linear-gradient(0deg,${C.gold} 0 1px,transparent 1px 24px),repeating-linear-gradient(90deg,${C.gold} 0 1px,transparent 1px 24px)`}}/>
      <div style={{position:"relative",zIndex:1,maxWidth:760}}>
        <CIVBar w={90} h={6} style={{margin:"0 auto 2rem"}}/>
        <div style={{display:"flex",justifyContent:"center",marginBottom:"1.5rem"}}>
          <Logo size={160} style={{border:`4px solid ${C.gold}`,boxShadow:`0 0 0 4px ${C.orangeD},0 8px 40px ${C.gold}55`}}/>
        </div>
        <h1 style={{fontFamily:"'Lora',serif",color:C.gold,fontSize:"clamp(2.6rem,7vw,4.8rem)",
          letterSpacing:"0.04em",margin:"0 0 0.1rem",textShadow:`0 4px 24px ${C.orangeD}88`}}>Grand Bassam</h1>
        <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,color:"white",
          fontSize:"clamp(1.5rem,5vw,3.2rem)",letterSpacing:"0.28em",marginBottom:"1.4rem"}}>FOOD</div>
        <p style={{fontFamily:"'Lora',serif",fontStyle:"italic",color:"rgba(255,255,255,0.85)",
          fontSize:"clamp(1rem,2.5vw,1.25rem)",lineHeight:1.8,margin:"0 0 0.6rem"}}>
          La richesse culinaire de l'Afrique, cuisinée avec amour
        </p>
        <p style={{fontFamily:"'Poppins',sans-serif",color:C.goldL,fontSize:"0.82rem",
          letterSpacing:"0.12em",marginBottom:"2.5rem"}}>
          Côte d'Ivoire · Sénégal · Mali · Guinée · Cameroun · et bien d'autres
        </p>
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>scroll("devis")} style={{padding:"0.9rem 2.2rem",borderRadius:30,border:"none",
            fontWeight:700,fontSize:"0.92rem",background:C.orange,color:"white",
            boxShadow:`0 4px 24px ${C.orange}88`}}>Demander un devis gratuit</button>
          <button onClick={()=>scroll("menu")} style={{padding:"0.9rem 2.2rem",borderRadius:30,fontWeight:600,
            fontSize:"0.92rem",background:"transparent",border:`2px solid ${C.goldL}`,color:C.goldL}}>Voir le menu</button>
        </div>
        <CIVBar w={90} h={6} style={{margin:"2.5rem auto 0"}}/>
      </div>
    </section>
  )
}

/* HIGHLIGHTS */
function Highlights() {
  const items=[{icon:"🌍",num:"10+",label:"Pays représentés"},{icon:"🍽️",num:"30+",label:"Plats au menu"},
    {icon:"📍",label:"Rennes & alentours"},{icon:"⚡",label:"Devis en 24h"}]
  return(
    <div style={{background:C.orangeD}}>
      <KenteStrip h={6}/>
      <div style={{maxWidth:900,margin:"0 auto",display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
        {items.map((it,i)=>(
          <div key={i} style={{flex:"1 1 180px",textAlign:"center",padding:"1.3rem 1rem",
            borderRight:i<items.length-1?`1px solid ${C.gold}33`:"none"}}>
            <div style={{fontSize:"1.7rem",marginBottom:"0.2rem"}}>{it.icon}</div>
            {it.num&&<div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:"1.9rem",color:C.gold,lineHeight:1}}>{it.num}</div>}
            <div style={{fontFamily:"'Poppins',sans-serif",fontSize:"0.78rem",color:"rgba(255,255,255,0.85)",fontWeight:500,letterSpacing:"0.06em"}}>{it.label}</div>
          </div>
        ))}
      </div>
      <KenteStrip h={6}/>
    </div>
  )
}

/* MENU */
const menuData=[
  {cat:"Entrées",icon:"🌿",color:"#207438",
    items:["Samoussas · Pastels","Claclo","Salade d'avocats","Beignets de haricots · poisson","Accras"]},
  {cat:"Riz & Attièké",icon:"🌾",color:"#9B4212",
    items:["Thiéboudienne (poisson farci, poulet, viande)","Garba — thon frit + attièké","Attièké nature"]},
  {cat:"Foutou & Fufu",icon:"🥣",color:"#9B4212",
    items:["Foutou — banane ou igname","Fufu — banane ou igname","Servi avec la sauce de votre choix"]},
  {cat:"Nos Sauces",icon:"✦",color:"#D2A84E",
    items:["Graine · Arachide · Aubergine","Claire · Tamarin · Jaune","Gombo · Oseille · Biokosseu"]},
  {cat:"Plats mijotés",icon:"🍲",color:"#9B4212",
    items:["Cabato · Kedjenou","N'dolé · Tripes","Rougail saucisse · Dombré"]},
  {cat:"Grillades",icon:"🔥",color:"#DA6C20",
    items:["Poisson braisé ou frit","Avec alloco, igname, manioc, akassa…"]},
  {cat:"Boissons",icon:"🥤",color:"#207438",
    items:["Jus de Tamarin · Bissap","Gingembre · Dégué / Thiakry"]},
]
function MenuSection() {
  const [active,setActive]=useState(0)
  const cat=menuData[active]
  return(
    <section id="menu" style={{background:"#FCF7EE",padding:"5rem 1.5rem"}}>
      <div style={{maxWidth:960,margin:"0 auto"}}>
        <SectionTitle sub="Cuisines africaines · Tous pays" title="Notre Menu"/>
        <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",justifyContent:"center",marginBottom:"2rem"}}>
          {menuData.map((c,i)=>(
            <button key={i} onClick={()=>setActive(i)} style={{
              padding:"0.45rem 1.1rem",borderRadius:20,border:`2px solid ${c.color}44`,
              fontWeight:600,fontSize:"0.8rem",background:active===i?c.color:"transparent",
              color:active===i?"white":c.color,transition:"all 0.2s"}}>
              {c.icon} {c.cat}
            </button>
          ))}
        </div>
        <div style={{background:"white",borderRadius:16,padding:"2rem",border:`1px solid #EADAB7`,minHeight:180,boxShadow:"0 4px 24px #9B421211"}}>
          <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1.2rem"}}>
            <div style={{width:46,height:46,borderRadius:"50%",background:cat.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem",flexShrink:0}}>{cat.icon}</div>
            <h3 style={{fontFamily:"'Lora',serif",fontSize:"1.5rem",color:cat.color,margin:0}}>{cat.cat}</h3>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"0.6rem"}}>
            {cat.items.map((item,i)=>(
              <div key={i} style={{padding:"0.65rem 1rem",borderRadius:8,background:"#FCF7EE",
                borderLeft:`3px solid ${cat.color}`,fontFamily:"'Poppins',sans-serif",
                fontSize:"0.88rem",color:"#241E1A",fontWeight:500}}>{item}</div>
            ))}
          </div>
        </div>
        <p style={{textAlign:"center",fontFamily:"'Lora',serif",fontStyle:"italic",
          color:"#9A7A4A",marginTop:"1.5rem",fontSize:"0.88rem"}}>
          Tous nos plats sont préparés à la commande · Devis sur mesure pour vos événements
        </p>
      </div>
    </section>
  )
}

/* À PROPOS */
function APropos() {
  const cards=[
    {icon:"👩🏾‍🍳",title:"Fait maison",text:"Chaque plat est préparé avec soin, avec des ingrédients frais et des épices authentiques d'Afrique."},
    {icon:"🌍",title:"Tous pays",text:"De la Côte d'Ivoire au Sénégal, du Mali au Cameroun — une carte qui voyage à travers tout le continent."},
    {icon:"🎉",title:"Vos événements",text:"Mariages, baptêmes, anniversaires, soirées d'entreprise… Service traiteur sur mesure à Rennes et alentours."},
    {icon:"🕐",title:"À la commande",text:"Commandez à l'avance et recevez un devis personnalisé sous 24h. Flexibilité garantie."},
  ]
  return(
    <section id="apropos" style={{background:"linear-gradient(160deg,#164D25 0%,#1C4A28 100%)",padding:"5rem 1.5rem"}}>
      <div style={{maxWidth:960,margin:"0 auto"}}>
        <SectionTitle light sub="Notre histoire" title="L'Afrique dans votre assiette"/>
        <div className="grid-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2.5rem",marginBottom:"2.5rem"}}>
          <div>
            <p style={{fontFamily:"'Lora',serif",fontSize:"1.06rem",color:"rgba(255,255,255,0.9)",lineHeight:1.9,marginBottom:"1rem"}}>
              Grand Bassam Food, c'est la passion d'une cuisinière ivoirienne qui a grandi entre les saveurs de la Côte d'Ivoire et la richesse culinaire de toute l'Afrique.
            </p>
            <p style={{fontFamily:"'Poppins',sans-serif",fontSize:"0.9rem",color:"rgba(255,255,255,0.7)",lineHeight:1.8}}>
              Installée à Rennes, elle partage aujourd'hui ses recettes authentiques — des mets mijotés lentement, des épices soigneusement sélectionnées, et une générosité à l'africaine dans chaque assiette.
            </p>
            <div style={{marginTop:"1.5rem",display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
              {["Côte d'Ivoire","Sénégal","Mali","Cameroun","Guinée"].map(p=>(
                <span key={p} style={{background:"#DA6C2033",border:"1px solid #DA6C2066",borderRadius:20,
                  padding:"0.25rem 0.75rem",fontFamily:"'Poppins',sans-serif",fontSize:"0.72rem",color:"#E8CC80",fontWeight:500}}>{p}</span>
              ))}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{textAlign:"center"}}>
              <Logo size={150} style={{border:"4px solid #D2A84E",boxShadow:"0 0 0 4px #9B421288,0 8px 32px #D2A84E44"}}/>
              <CIVBar w={80} h={5} style={{margin:"1rem auto 0.5rem"}}/>
              <div style={{fontFamily:"'Lora',serif",fontStyle:"italic",color:"#E8CC80",fontSize:"0.9rem"}}>Grand Bassam Food</div>
              <div style={{fontFamily:"'Poppins',sans-serif",color:"rgba(255,255,255,0.5)",fontSize:"0.75rem"}}>grandbassamfood.fr</div>
            </div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1rem"}}>
          {cards.map((c,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.07)",border:"1px solid #D2A84E33",borderRadius:12,padding:"1.4rem 1.2rem",backdropFilter:"blur(4px)"}}>
              <div style={{fontSize:"2rem",marginBottom:"0.6rem"}}>{c.icon}</div>
              <h4 style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,color:"#D2A84E",fontSize:"0.95rem",margin:"0 0 0.5rem"}}>{c.title}</h4>
              <p style={{fontFamily:"'Poppins',sans-serif",fontSize:"0.8rem",color:"rgba(255,255,255,0.7)",lineHeight:1.7,margin:0}}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* DEVIS — Netlify Forms → devis@grandbassamfood.fr */
function DevisSection() {
  const [form,setForm]=useState({nom:"",email:"",tel:"",typeEvent:"",date:"",nbPersonnes:"",lieu:"",plats:[],budget:"",message:""})
  const [status,setStatus]=useState("idle")
  const [focus,setFocus]=useState(null)
  const set=(k,v)=>setForm(f=>({...f,[k]:v}))
  const togglePlat=(p)=>set("plats",form.plats.includes(p)?form.plats.filter(x=>x!==p):[...form.plats,p])

  const handleSubmit=async()=>{
    if(!form.nom.trim()||!form.email.trim()){alert("Merci de renseigner votre nom et votre email.");return}
    setStatus("sending")
    const body=new URLSearchParams({"form-name":"devis","bot-field":"",...form,plats:form.plats.join(", ")})
    try{
      const res=await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:body.toString()})
      setStatus(res.ok?"success":"error")
    }catch{setStatus("error")}
  }

  const inp=(f)=>({
    onFocus:()=>setFocus(f),onBlur:()=>setFocus(null),
    style:{width:"100%",padding:"0.85rem 1.1rem",border:`2px solid ${focus===f?"#DA6C20":"#EADAB7"}`,
      borderRadius:10,background:"#FCF7EE",fontSize:"0.9rem",color:"#241E1A",outline:"none",
      transition:"border-color 0.2s",boxSizing:"border-box"}
  })
  const lbl={fontFamily:"'Poppins',sans-serif",fontWeight:600,fontSize:"0.78rem",color:"#9B4212",
    letterSpacing:"0.07em",display:"block",marginBottom:"0.4rem",textTransform:"uppercase"}
  const typeEvents=["Mariage","Baptême / Baby shower","Anniversaire","Soirée d'entreprise","Repas familial","Cocktail / Buffet","Autre"]
  const platsOpts=["Entrées variées","Riz & Attièké","Foutou / Fufu + sauces","Grillades","Plats mijotés","Boissons maison","Menu complet sur mesure"]

  if(status==="success") return(
    <section id="devis" style={{background:"#F4E8D0",padding:"5rem 1.5rem"}}>
      <div style={{maxWidth:760,margin:"0 auto",textAlign:"center",padding:"3rem 2rem",background:"white",
        borderRadius:20,border:"2px solid #207438",boxShadow:"0 8px 32px #20743822"}}>
        <div style={{fontSize:"4rem",marginBottom:"1rem"}}>✅</div>
        <h3 style={{fontFamily:"'Lora',serif",fontSize:"1.8rem",color:"#207438",margin:"0 0 0.8rem"}}>Demande envoyée !</h3>
        <p style={{fontFamily:"'Poppins',sans-serif",color:"#9A7A4A",fontSize:"0.95rem",lineHeight:1.8}}>
          Merci <strong>{form.nom}</strong> !<br/>
          Votre demande a été transmise à <strong style={{color:"#DA6C20"}}>devis@grandbassamfood.fr</strong>.<br/>
          Nous vous répondrons sous <strong>24h</strong> à l'adresse <strong>{form.email}</strong>.
        </p>
        <CIVBar w={80} h={5} style={{margin:"1.5rem auto"}}/>
        <p style={{fontFamily:"'Lora',serif",fontStyle:"italic",color:"#9A7A4A",fontSize:"0.9rem"}}>
          En attendant : <strong style={{color:"#DA6C20"}}>06 47 33 33 94</strong>
        </p>
      </div>
    </section>
  )
  return(
    <section id="devis" style={{background:"#F4E8D0",padding:"5rem 1.5rem"}}>
      <div style={{maxWidth:860,margin:"0 auto"}}>
        <SectionTitle sub="Votre événement mérite le meilleur" title="Demande de Devis"/>
        <div style={{background:"white",borderRadius:20,overflow:"hidden",boxShadow:"0 8px 40px #9B421218"}}>
          <div style={{background:"linear-gradient(135deg,#164D25,#9B4212)",padding:"1.5rem 2rem"}}>
            <KenteStrip h={5}/>
            <div style={{display:"flex",alignItems:"center",gap:"1rem",marginTop:"1rem"}}>
              <Logo size={60}/>
              <div>
                <div style={{fontFamily:"'Lora',serif",color:"#D2A84E",fontSize:"1.2rem"}}>Grand Bassam Food</div>
                <div style={{fontFamily:"'Poppins',sans-serif",color:"rgba(255,255,255,0.75)",fontSize:"0.78rem"}}>Devis gratuit · Réponse sous 24h · 06 47 33 33 94</div>
                <div style={{fontFamily:"'Poppins',sans-serif",color:"#E8CC80",fontSize:"0.75rem",marginTop:"0.1rem"}}>devis@grandbassamfood.fr</div>
              </div>
            </div>
          </div>
          <div style={{padding:"2rem"}}>
            <div className="grid-3" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"1rem",marginBottom:"1.2rem"}}>
              {[["nom","Nom & Prénom *","text","Marie Dupont"],["email","Email *","email","marie@email.com"],["tel","Téléphone","tel","06 XX XX XX XX"]].map(([k,l,t,ph])=>(
                <div key={k}><label style={lbl}>{l}</label>
                  <input type={t} placeholder={ph} value={form[k]} onChange={e=>set(k,e.target.value)} name={k} {...inp(k)}/></div>
              ))}
            </div>
            <div style={{marginBottom:"1.2rem"}}>
              <label style={lbl}>Type d'événement</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:"0.5rem"}}>
                {typeEvents.map(t=>(
                  <button key={t} onClick={()=>set("typeEvent",t)} style={{padding:"0.45rem 1rem",borderRadius:20,
                    border:`2px solid ${form.typeEvent===t?"#DA6C20":"#EADAB7"}`,
                    background:form.typeEvent===t?"#DA6C20":"transparent",
                    color:form.typeEvent===t?"white":"#9B4212",fontWeight:600,fontSize:"0.8rem",transition:"all 0.2s"}}>{t}</button>
                ))}
              </div>
            </div>
            <div className="grid-3" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"1rem",marginBottom:"1.2rem"}}>
              <div><label style={lbl}>Date souhaitée</label>
                <input type="date" value={form.date} onChange={e=>set("date",e.target.value)} name="date" {...inp("date")}/></div>
              <div><label style={lbl}>Nombre de personnes</label>
                <select value={form.nbPersonnes} onChange={e=>set("nbPersonnes",e.target.value)} name="nbPersonnes"
                  onFocus={()=>setFocus("nbP")} onBlur={()=>setFocus(null)} style={{...inp("nbP").style,cursor:"pointer"}}>
                  <option value="">Sélectionner…</option>
                  {["1–10","10–20","20–50","50–100","100–200","200+"].map(v=><option key={v}>{v}</option>)}
                </select></div>
              <div><label style={lbl}>Lieu</label>
                <input type="text" placeholder="Ville / adresse" value={form.lieu} onChange={e=>set("lieu",e.target.value)} name="lieu" {...inp("lieu")}/></div>
            </div>
            <div style={{marginBottom:"1.2rem"}}>
              <label style={lbl}>Plats souhaités (choix multiple)</label>
              <div style={{display:"flex",flexWrap:"wrap",gap:"0.5rem"}}>
                {platsOpts.map(p=>(
                  <button key={p} onClick={()=>togglePlat(p)} style={{padding:"0.4rem 0.9rem",borderRadius:20,
                    border:`2px solid ${form.plats.includes(p)?"#207438":"#EADAB7"}`,
                    background:form.plats.includes(p)?"#207438":"transparent",
                    color:form.plats.includes(p)?"white":"#207438",fontWeight:600,fontSize:"0.78rem",transition:"all 0.2s"}}>
                    {form.plats.includes(p)?"✓ ":""}{p}</button>
                ))}
              </div>
            </div>
            <div style={{marginBottom:"1.2rem"}}>
              <label style={lbl}>Budget estimé</label>
              <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
                {["< 200€","200–500€","500–1 000€","1 000–2 000€","2 000€+","À définir"].map(b=>(
                  <button key={b} onClick={()=>set("budget",b)} style={{padding:"0.4rem 0.9rem",borderRadius:20,
                    border:`2px solid ${form.budget===b?"#D2A84E":"#EADAB7"}`,
                    background:form.budget===b?"#D2A84E":"transparent",
                    color:form.budget===b?"#241E1A":"#9A7A4A",fontWeight:600,fontSize:"0.78rem",transition:"all 0.2s"}}>{b}</button>
                ))}
              </div>
            </div>
            <div style={{marginBottom:"1.5rem"}}>
              <label style={lbl}>Précisions / demandes spéciales</label>
              <textarea value={form.message} onChange={e=>set("message",e.target.value)} name="message" rows={3}
                placeholder="Régimes alimentaires, allergies, ambiance souhaitée, plats spécifiques…"
                onFocus={()=>setFocus("msg")} onBlur={()=>setFocus(null)}
                style={{...inp("msg").style,resize:"vertical"}}/>
            </div>
            <button onClick={handleSubmit} disabled={status==="sending"} style={{width:"100%",padding:"1.1rem",
              background:status==="sending"?"#ccc":"linear-gradient(135deg,#DA6C20,#9B4212)",
              border:"none",borderRadius:12,fontWeight:700,fontSize:"1rem",letterSpacing:"0.06em",color:"white",
              boxShadow:status==="sending"?"none":"0 4px 20px #DA6C2055",transition:"all 0.2s"}}>
              {status==="sending"?"Envoi en cours…":"Envoyer ma demande de devis →"}
            </button>
            {status==="error"&&<p style={{textAlign:"center",color:"#c0392b",fontFamily:"'Poppins',sans-serif",fontSize:"0.82rem",marginTop:"0.8rem"}}>
              Une erreur est survenue. Contactez-nous directement au 06 47 33 33 94
            </p>}
            <p style={{textAlign:"center",fontFamily:"'Poppins',sans-serif",fontSize:"0.72rem",color:"#9A7A4A",marginTop:"1rem"}}>
              * Champs obligatoires · Devis gratuit et sans engagement · Réponse sous 24h
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* FOOTER */
function Footer() {
  const scroll=(id)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"})
  return(
    <footer style={{background:"#241E1A"}}>
      <KenteStrip h={8}/>
      <div style={{maxWidth:960,margin:"0 auto",padding:"3rem 1.5rem 2rem"}}>
        <div className="grid-3" style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:"2rem",marginBottom:"2rem"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:"0.8rem",marginBottom:"1rem"}}>
              <Logo size={56}/>
              <div>
                <div style={{fontFamily:"'Lora',serif",color:"#D2A84E",fontSize:"1.2rem"}}>Grand Bassam</div>
                <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,color:"white",fontSize:"0.8rem",letterSpacing:"0.2em"}}>FOOD</div>
              </div>
            </div>
            <p style={{fontFamily:"'Lora',serif",fontStyle:"italic",color:"rgba(255,255,255,0.5)",fontSize:"0.85rem",lineHeight:1.8}}>
              La richesse culinaire de l'Afrique,<br/>cuisinée avec amour à Rennes.
            </p>
            <CIVBar w={70} h={4} style={{marginTop:"1rem"}}/>
          </div>
          <div>
            <h4 style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,color:"#D2A84E",
              fontSize:"0.82rem",letterSpacing:"0.12em",marginBottom:"0.8rem"}}>NAVIGATION</h4>
            {[["accueil","Accueil"],["menu","Menu"],["apropos","À propos"],["devis","Devis"]].map(([id,l])=>(
              <div key={id} onClick={()=>scroll(id)}
                style={{fontFamily:"'Poppins',sans-serif",fontSize:"0.82rem",
                  color:"rgba(255,255,255,0.55)",marginBottom:"0.4rem",cursor:"pointer"}}>{l}</div>
            ))}
          </div>
          <div>
            <h4 style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,color:"#D2A84E",
              fontSize:"0.82rem",letterSpacing:"0.12em",marginBottom:"0.8rem"}}>CONTACT</h4>
            {[["📞","06 47 33 33 94"],["📧","devis@grandbassamfood.fr"],
              ["📍","Rennes et alentours"],["🌐","grandbassamfood.fr"]].map(([ic,t])=>(
              <div key={t} style={{fontFamily:"'Poppins',sans-serif",fontSize:"0.78rem",
                color:"rgba(255,255,255,0.55)",marginBottom:"0.45rem"}}>{ic} {t}</div>
            ))}
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:"1.2rem",textAlign:"center"}}>
          <p style={{fontFamily:"'Poppins',sans-serif",fontSize:"0.72rem",color:"rgba(255,255,255,0.3)",margin:0}}>
            © 2025 Grand Bassam Food · grandbassamfood.fr · Tous droits réservés
          </p>
        </div>
      </div>
      <KenteStrip h={6}/>
    </footer>
  )
}

/* APP */
export default function App() {
  return(
    <>
      <Nav/>
      <Hero/>
      <Highlights/>
      <MenuSection/>
      <APropos/>
      <DevisSection/>
      <Footer/>
    </>
  )
}
