import { useState, useEffect, useRef } from "react"

/* ── Design tokens ───────────────────────────────────────── */
const T = {
  bg:       "#0F1A12",   // deep forest night
  bgAlt:    "#141F16",
  surface:  "#1A2A1C",
  surfaceL: "#1F3222",
  border:   "#2A3D2C",
  gold:     "#C9A96E",
  goldL:    "#E2C898",
  goldD:    "#A07C44",
  orange:   "#D4692A",
  orangeL:  "#E8885A",
  green:    "#2A7A45",
  greenL:   "#3A9A58",
  ivory:    "#F5EFE6",
  ivoryD:   "#D4C9B8",
  muted:    "#8A9A8C",
  white:    "#FFFFFF",
}

/* ── Shared primitives ───────────────────────────────────── */
const KenteBar = ({ h = 4, style = {} }) => {
  const cols = ["#7A2E0A","#B84A14",T.orange,"#D4B882",T.orange,T.green,T.orange,"#D4B882",T.orange,"#B84A14","#7A2E0A"]
  return (
    <div style={{ display:"flex", height:h, ...style }}>
      {cols.map((c,i) => <div key={i} style={{ flex:1, background:c }} />)}
    </div>
  )
}

const CIV = ({ w = 72, h = 4, style = {} }) => (
  <div style={{ display:"flex", width:w, height:h, borderRadius:2, overflow:"hidden", ...style }}>
    <div style={{ flex:1, background:T.orange }} />
    <div style={{ flex:1, background:"#C8BEA8" }} />
    <div style={{ flex:1, background:T.green }} />
  </div>
)

const Gold = ({ children, style = {} }) => (
  <span style={{ color:T.gold, ...style }}>{children}</span>
)

const Label = ({ children }) => (
  <p style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:"0.68rem",
    letterSpacing:"0.18em", textTransform:"uppercase", color:T.gold, marginBottom:"0.5rem" }}>
    {children}
  </p>
)

const Logo = ({ size = 80, ring = true }) => (
  <img src="/logo.png" alt="Grand Bassam Food" style={{
    width:size, height:size, borderRadius:"50%", objectFit:"cover", flexShrink:0,
    boxShadow: ring ? `0 0 0 1px ${T.goldD}, 0 0 0 3px ${T.surface}, 0 6px 30px rgba(201,169,110,0.3)` : "none",
  }}/>
)

/* ── NAV ─────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const go = id => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false) }
  const links = [["accueil","Accueil"],["menu","Menu"],["apropos","Notre histoire"],["devis","Devis"]]

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      transition:"all 0.4s",
      background: scrolled ? "rgba(10,20,12,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${T.border}` : "none",
    }}>
      {scrolled && <KenteBar h={2} />}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 2rem",
        display:"flex", alignItems:"center", justifyContent:"space-between", height:72 }}>

        <div onClick={() => go("accueil")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:"0.85rem" }}>
          <Logo size={38} ring={scrolled} />
          <div style={{ lineHeight:1 }}>
            <div style={{ fontFamily:"'Lora',serif", color:T.gold, fontSize:"0.95rem", letterSpacing:"0.06em" }}>Grand Bassam</div>
            <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, color:T.ivory,
              fontSize:"0.62rem", letterSpacing:"0.28em", marginTop:2 }}>FOOD</div>
          </div>
        </div>

        <div className="hide-mobile" style={{ display:"flex", alignItems:"center", gap:"0.25rem" }}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} style={{
              padding:"0.5rem 1.2rem", fontSize:"0.8rem", fontWeight:500,
              letterSpacing:"0.08em", color: id==="devis" ? T.bg : T.ivoryD,
              background: id==="devis" ? T.gold : "transparent",
              borderRadius:3, transition:"all 0.2s",
            }}>{label}</button>
          ))}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display:"none", color:T.gold, fontSize:"1.4rem" }} className="hide-mobile" />
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ color:T.gold, fontSize:"1.3rem", padding:"0.25rem" }}>
          {menuOpen ? "✕" : "≡"}
        </button>
      </div>

      {menuOpen && (
        <div style={{ background:"rgba(10,20,12,0.98)", borderTop:`1px solid ${T.border}`, padding:"1rem 2rem 1.5rem" }}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => go(id)} style={{
              display:"block", width:"100%", textAlign:"left",
              padding:"0.85rem 0", color: id==="devis" ? T.gold : T.ivoryD,
              fontSize:"0.95rem", fontWeight:500, letterSpacing:"0.08em",
              borderBottom:`1px solid ${T.border}`,
            }}>{label}</button>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ── HERO ────────────────────────────────────────────────── */
function Hero() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" })
  return (
    <section id="accueil" style={{
      minHeight:"100vh", position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
      background: `radial-gradient(ellipse at 60% 40%, #1F3D22 0%, #0F1A12 65%)`,
    }}>
      {/* Subtle grid */}
      <div style={{ position:"absolute", inset:0, opacity:0.04,
        backgroundImage:`linear-gradient(${T.gold} 1px,transparent 1px),linear-gradient(90deg,${T.gold} 1px,transparent 1px)`,
        backgroundSize:"60px 60px" }} />
      {/* Glow */}
      <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)",
        width:600, height:600, borderRadius:"50%",
        background:`radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)`,
        pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:1, textAlign:"center", padding:"7rem 2rem 5rem", maxWidth:820 }}>
        {/* Label */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem", marginBottom:"2.5rem" }}>
          <div style={{ height:1, width:40, background:`linear-gradient(to right, transparent, ${T.goldD})` }} />
          <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.7rem", fontWeight:600,
            letterSpacing:"0.22em", textTransform:"uppercase", color:T.gold }}>Traiteur africain · Rennes</span>
          <div style={{ height:1, width:40, background:`linear-gradient(to left, transparent, ${T.goldD})` }} />
        </div>

        {/* Logo */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:"2rem" }}>
          <div style={{ position:"relative" }}>
            <Logo size={150} />
            <div style={{ position:"absolute", inset:-8, borderRadius:"50%",
              border:`1px solid ${T.goldD}44`, pointerEvents:"none" }} />
            <div style={{ position:"absolute", inset:-16, borderRadius:"50%",
              border:`1px solid ${T.goldD}22`, pointerEvents:"none" }} />
          </div>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily:"'Lora',serif", fontWeight:600,
          fontSize:"clamp(3rem,8vw,5.5rem)", lineHeight:1.05,
          color:T.ivory, letterSpacing:"-0.01em", marginBottom:"0.3rem" }}>
          Grand Bassam
        </h1>
        <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, color:T.gold,
          fontSize:"clamp(1rem,3vw,1.8rem)", letterSpacing:"0.45em",
          marginBottom:"1.8rem", textTransform:"uppercase" }}>Food</div>

        {/* Tagline */}
        <p style={{ fontFamily:"'Lora',serif", fontStyle:"italic",
          color:T.ivoryD, fontSize:"clamp(1.05rem,2vw,1.35rem)",
          lineHeight:1.75, marginBottom:"0.6rem", maxWidth:580, margin:"0 auto 0.8rem" }}>
          La richesse culinaire de l'Afrique, cuisinée avec amour
        </p>

        <CIV w={60} h={3} style={{ margin:"1rem auto 2.8rem" }} />

        {/* Countries */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem",
          justifyContent:"center", marginBottom:"3rem" }}>
          {["Côte d'Ivoire","Sénégal","Mali","Guinée","Cameroun","et bien d'autres"].map(p => (
            <span key={p} style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.72rem",
              fontWeight:500, letterSpacing:"0.08em",
              color: p.includes("d'autres") ? T.muted : T.ivoryD,
              padding:"0.3rem 0.8rem",
              border:`1px solid ${p.includes("d'autres") ? T.border : T.border}`,
              borderRadius:2, background:T.surface }}>{p}</span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => go("devis")} style={{
            padding:"0.9rem 2.4rem", borderRadius:3, fontWeight:600,
            fontSize:"0.82rem", letterSpacing:"0.12em", textTransform:"uppercase",
            background:`linear-gradient(135deg, ${T.gold}, ${T.goldD})`,
            color:T.bg, transition:"all 0.25s",
            boxShadow:`0 4px 24px rgba(201,169,110,0.3)`,
          }}>Demander un devis</button>
          <button onClick={() => go("menu")} style={{
            padding:"0.9rem 2.4rem", borderRadius:3, fontWeight:600,
            fontSize:"0.82rem", letterSpacing:"0.12em", textTransform:"uppercase",
            border:`1px solid ${T.border}`, color:T.ivoryD,
            background:"transparent", transition:"all 0.25s",
          }}>Voir le menu</button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:"absolute", bottom:"2rem", left:"50%", transform:"translateX(-50%)",
        display:"flex", flexDirection:"column", alignItems:"center", gap:6, opacity:0.4 }}>
        <div style={{ width:1, height:40, background:`linear-gradient(to bottom, transparent, ${T.gold})` }} />
        <span style={{ fontSize:"0.6rem", letterSpacing:"0.2em", color:T.gold }}>SCROLL</span>
      </div>
    </section>
  )
}

/* ── STATS BAND ──────────────────────────────────────────── */
function StatsBand() {
  const stats = [
    { num:"10+", label:"Cuisines africaines" },
    { num:"30+", label:"Plats à la carte" },
    { num:"100%", label:"Fait maison" },
    { num:"24h", label:"Délai de réponse" },
  ]
  return (
    <div style={{ background:T.surface, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:1000, margin:"0 auto",
        display:"grid", gridTemplateColumns:"repeat(4,1fr)" }} className="col-4">
        {stats.map((s, i) => (
          <div key={i} style={{ padding:"2rem 1.5rem", textAlign:"center",
            borderRight: i < 3 ? `1px solid ${T.border}` : "none" }}>
            <div style={{ fontFamily:"'Lora',serif", fontSize:"2.2rem",
              fontWeight:600, color:T.gold, lineHeight:1, marginBottom:"0.4rem" }}>{s.num}</div>
            <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.72rem",
              fontWeight:500, letterSpacing:"0.12em", textTransform:"uppercase",
              color:T.muted }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── MENU ────────────────────────────────────────────────── */
const menuSections = [
  { title:"Entrées", items:[
    { name:"Samoussas & Pastels", note:"Farce viande ou légumes, croustillants" },
    { name:"Claclo", note:"Beignets de maïs traditionnels" },
    { name:"Salade d'avocats", note:"Fraîche, parfumée aux herbes" },
    { name:"Accras & Beignets", note:"Poisson ou haricots, friture dorée" },
  ]},
  { title:"Riz & Attièké", items:[
    { name:"Thiéboudienne", note:"Poisson farci, poulet ou viande — plat national sénégalais" },
    { name:"Garba", note:"Thon frit & attièké — spécialité abidjanaise" },
    { name:"Attièké nature", note:"Semoule de manioc fermentée" },
  ]},
  { title:"Foutou & Fufu", items:[
    { name:"Foutou", note:"Banane plantain ou igname, servi avec sauce au choix" },
    { name:"Fufu", note:"Banane plantain ou igname, servi avec sauce au choix" },
  ]},
  { title:"Plats mijotés", items:[
    { name:"Cabato", note:"Plat ivoirien du sud — sauce arachide, oseille, gombo ou sauce jaune" },
    { name:"Kedjenou", note:"Mijoté à l'étouffée — poulet ou poisson, riz ou attièké" },
    { name:"N'dolé", note:"Spécialité camerounaise — viande ou crevettes, semoule" },
    { name:"Dombré", note:"Dumplings antillais — crevettes ou queue de cochon" },
    { name:"Rougail saucisse", note:"Spécialité réunionnaise, mijoté aux épices" },
    { name:"Tripes & Abats", note:"Pattes de bœuf ou de poulet, mijotés longuement" },
  ]},
  { title:"Grillades", items:[
    { name:"Poisson braisé", note:"Au charbon de bois — alloco, igname, manioc ou akassa" },
    { name:"Poisson frit", note:"Doré et croustillant — accompagnements ivoiriens" },
  ]},
  { title:"Nos Sauces", items:[
    { name:"Sauce Graine", note:"Palmiste pilée, onctueuse" },
    { name:"Sauce Arachide", note:"Douce et parfumée" },
    { name:"Sauce Tamarin", note:"Aigre-douce, très typique" },
    { name:"Biokosseu · Sauce Claire · Sauce Jaune · Sauce Gombo", note:"Toutes mijotées maison" },
  ]},
  { title:"Boissons maison", items:[
    { name:"Jus de Tamarin", note:"Rafraîchissant & acidulé" },
    { name:"Bissap", note:"Fleur d'hibiscus, rouge rubis" },
    { name:"Gingembre", note:"Tonifiant et épicé" },
    { name:"Dégué · Thiakry", note:"Doux et sucré" },
  ]},
]

function MenuSection() {
  const [active, setActive] = useState(0)
  const cat = menuSections[active]

  return (
    <section id="menu" style={{ background:T.bg, padding:"7rem 2rem" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"4rem" }}>
          <Label>Notre Carte</Label>
          <h2 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(2rem,5vw,3rem)",
            color:T.ivory, fontWeight:600, marginBottom:"1rem" }}>
            Cuisines du continent
          </h2>
          <p style={{ fontFamily:"'Poppins',sans-serif", color:T.muted,
            fontSize:"0.9rem", maxWidth:480, margin:"0 auto 2rem" }}>
            Chaque plat est préparé à la commande, avec des épices authentiques et des produits frais.
          </p>
          <CIV w={60} h={3} style={{ margin:"0 auto" }} />
        </div>

        {/* Tab selector */}
        <div style={{ display:"flex", gap:"0", flexWrap:"wrap", justifyContent:"center",
          marginBottom:"3rem", border:`1px solid ${T.border}`, borderRadius:4,
          overflow:"hidden", maxWidth:800, margin:"0 auto 3rem" }}>
          {menuSections.map((s, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              flex:"1 1 auto", padding:"0.75rem 0.5rem",
              fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.08em",
              textTransform:"uppercase", transition:"all 0.2s",
              borderRight: i < menuSections.length-1 ? `1px solid ${T.border}` : "none",
              background: active===i ? T.gold : "transparent",
              color: active===i ? T.bg : T.muted,
            }}>{s.title}</button>
          ))}
        </div>

        {/* Menu content — elegant list */}
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          <h3 style={{ fontFamily:"'Lora',serif", fontSize:"1.6rem", color:T.gold,
            marginBottom:"2rem", textAlign:"center", fontWeight:400, fontStyle:"italic" }}>
            {cat.title}
          </h3>
          {cat.items.map((item, i) => (
            <div key={i} style={{
              display:"flex", justifyContent:"space-between", alignItems:"baseline",
              padding:"1.1rem 0", borderBottom:`1px solid ${T.border}`,
              gap:"1rem",
            }}>
              <div>
                <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:600,
                  fontSize:"0.95rem", color:T.ivory, marginBottom:"0.2rem" }}>{item.name}</div>
                <div style={{ fontFamily:"'Lora',serif", fontStyle:"italic",
                  fontSize:"0.82rem", color:T.muted }}>{item.note}</div>
              </div>
              <div style={{ width:32, height:1, background:T.border, flexShrink:0, marginBottom:4 }} />
            </div>
          ))}
        </div>

        <p style={{ textAlign:"center", fontFamily:"'Lora',serif", fontStyle:"italic",
          color:T.muted, marginTop:"3rem", fontSize:"0.85rem" }}>
          Tous nos plats sont préparés à la commande · Tarifs sur devis selon quantité et événement
        </p>
      </div>
    </section>
  )
}

/* ── À PROPOS ─────────────────────────────────────────────── */
function APropos() {
  const vals = [
    { icon:"◆", title:"Authenticité", text:"Des recettes transmises de génération en génération, fidèles aux saveurs originales de chaque pays." },
    { icon:"◆", title:"Sur-mesure", text:"Chaque commande est unique. Nous adaptons les quantités, les plats et le service à votre événement." },
    { icon:"◆", title:"Générosité", text:"La cuisine africaine, c'est l'abondance. Chaque assiette raconte une histoire, un pays, une famille." },
    { icon:"◆", title:"Proximité", text:"Basées à Rennes, nous intervenons dans toute l'Ille-et-Vilaine pour vos événements privés et professionnels." },
  ]
  return (
    <section id="apropos" style={{ background:T.bgAlt, padding:"7rem 2rem",
      borderTop:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6rem", alignItems:"center" }} className="col-2">

          {/* Left: text */}
          <div>
            <Label>Notre histoire</Label>
            <h2 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(1.8rem,4vw,2.8rem)",
              color:T.ivory, fontWeight:600, lineHeight:1.2, marginBottom:"1.5rem" }}>
              L'Afrique dans<br/><Gold>votre assiette</Gold>
            </h2>
            <p style={{ fontFamily:"'Poppins',sans-serif", color:T.muted, fontSize:"0.9rem",
              lineHeight:1.9, marginBottom:"1.2rem" }}>
              Grand Bassam Food, c'est la passion d'une cuisinière ivoirienne installée à Rennes,
              qui a grandi entre les saveurs de la Côte d'Ivoire et la richesse culinaire
              de tout un continent.
            </p>
            <p style={{ fontFamily:"'Poppins',sans-serif", color:T.muted, fontSize:"0.9rem",
              lineHeight:1.9, marginBottom:"2rem" }}>
              Des mets mijotés lentement, des épices soigneusement sélectionnées, une générosité
              à l'africaine — pour vos repas de famille, mariages, baptêmes et soirées d'entreprise.
            </p>
            <CIV w={60} h={3} style={{ marginBottom:"2rem" }} />
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
              {["Côte d'Ivoire","Sénégal","Mali","Cameroun","Guinée"].map(p => (
                <span key={p} style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.7rem",
                  fontWeight:600, letterSpacing:"0.1em", color:T.gold,
                  padding:"0.3rem 0.75rem", border:`1px solid ${T.goldD}55`,
                  borderRadius:2, background:`${T.gold}08` }}>{p}</span>
              ))}
            </div>
          </div>

          {/* Right: logo + values */}
          <div>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:"3rem" }}>
              <div style={{ position:"relative" }}>
                <Logo size={180} />
                <div style={{ position:"absolute", inset:-12, borderRadius:"50%",
                  border:`1px solid ${T.goldD}44` }} />
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
              {vals.map((v, i) => (
                <div key={i}>
                  <div style={{ color:T.gold, fontSize:"0.7rem", marginBottom:"0.5rem",
                    letterSpacing:"0.1em" }}>{v.icon}</div>
                  <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700,
                    fontSize:"0.82rem", color:T.ivory, marginBottom:"0.3rem",
                    letterSpacing:"0.04em" }}>{v.title}</div>
                  <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.78rem",
                    color:T.muted, lineHeight:1.7 }}>{v.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── DEVIS ───────────────────────────────────────────────── */
function DevisSection() {
  const [form, setForm] = useState({
    nom:"", email:"", tel:"", typeEvent:"", date:"",
    nbPersonnes:"", lieu:"", plats:[], budget:"", message:""
  })
  const [status, setStatus] = useState("idle")
  const [focus, setFocus] = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]:v }))
  const togglePlat = p => set("plats", form.plats.includes(p)
    ? form.plats.filter(x => x!==p) : [...form.plats, p])

  const handleSubmit = async () => {
    if (!form.nom.trim() || !form.email.trim()) {
      alert("Merci de renseigner votre nom et votre email."); return
    }
    setStatus("sending")
    const body = new URLSearchParams({
      "form-name":"devis", "bot-field":"", ...form, plats: form.plats.join(", ")
    })
    try {
      const r = await fetch("/", { method:"POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded"}, body:body.toString() })
      setStatus(r.ok ? "success" : "error")
    } catch { setStatus("error") }
  }

  const fieldStyle = f => ({
    width:"100%", padding:"0.85rem 1rem",
    background: focus===f ? T.surfaceL : T.surface,
    border:`1px solid ${focus===f ? T.goldD : T.border}`,
    borderRadius:3, color:T.ivory, fontSize:"0.88rem",
    outline:"none", transition:"all 0.2s", boxSizing:"border-box",
  })
  const lbl = { fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:"0.68rem",
    letterSpacing:"0.14em", textTransform:"uppercase", color:T.muted,
    display:"block", marginBottom:"0.5rem" }

  const events = ["Mariage","Baptême / Baby shower","Anniversaire",
    "Soirée d'entreprise","Repas familial","Cocktail / Buffet","Autre"]
  const platsOpts = ["Entrées variées","Riz & Attièké","Foutou / Fufu",
    "Grillades","Plats mijotés","Boissons maison","Menu complet sur-mesure"]

  if (status === "success") return (
    <section id="devis" style={{ background:T.bg, padding:"7rem 2rem",
      borderTop:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center" }}>
        <div style={{ width:64, height:64, borderRadius:"50%",
          background:`${T.green}22`, border:`1px solid ${T.green}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:"1.8rem", margin:"0 auto 2rem" }}>✓</div>
        <h3 style={{ fontFamily:"'Lora',serif", fontSize:"2rem", color:T.gold,
          marginBottom:"1rem" }}>Demande envoyée</h3>
        <p style={{ fontFamily:"'Poppins',sans-serif", color:T.muted,
          fontSize:"0.9rem", lineHeight:1.8 }}>
          Merci <strong style={{ color:T.ivory }}>{form.nom}</strong>.<br/>
          Votre demande a été transmise à <strong style={{ color:T.gold }}>devis@grandbassamfood.fr</strong>.<br/>
          Nous vous répondrons sous <strong style={{ color:T.ivory }}>24h</strong>.
        </p>
        <CIV w={60} h={3} style={{ margin:"2rem auto" }} />
        <p style={{ fontFamily:"'Lora',serif", fontStyle:"italic", color:T.muted, fontSize:"0.85rem" }}>
          Vous pouvez aussi nous appeler directement au <Gold>06 47 33 33 94</Gold>
        </p>
      </div>
    </section>
  )

  return (
    <section id="devis" style={{ background:T.bg, padding:"7rem 2rem",
      borderTop:`1px solid ${T.border}` }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"4rem" }}>
          <Label>Contact & Devis</Label>
          <h2 style={{ fontFamily:"'Lora',serif", fontSize:"clamp(2rem,5vw,3rem)",
            color:T.ivory, fontWeight:600, marginBottom:"1rem" }}>
            Parlons de votre <Gold>événement</Gold>
          </h2>
          <p style={{ fontFamily:"'Poppins',sans-serif", color:T.muted, fontSize:"0.9rem",
            maxWidth:480, margin:"0 auto 1.5rem" }}>
            Devis gratuit sous 24h · Réponse personnalisée · Flexibilité garantie
          </p>
          <CIV w={60} h={3} style={{ margin:"0 auto" }} />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 2fr", gap:"4rem", alignItems:"start" }} className="col-2">
          {/* Left: info card */}
          <div style={{ background:T.surface, border:`1px solid ${T.border}`,
            borderRadius:4, padding:"2rem", position:"sticky", top:"6rem" }}>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:"1.5rem" }}>
              <Logo size={80} />
            </div>
            <div style={{ fontFamily:"'Lora',serif", color:T.gold, fontSize:"1.1rem",
              textAlign:"center", marginBottom:"0.3rem" }}>Grand Bassam Food</div>
            <CIV w={50} h={2} style={{ margin:"0.8rem auto 1.5rem" }} />
            {[["📞","06 47 33 33 94"],["✉","devis@grandbassamfood.fr"],["📍","Rennes et alentours"]].map(([ic,t]) => (
              <div key={t} style={{ display:"flex", gap:"0.75rem", alignItems:"center",
                marginBottom:"0.9rem", paddingBottom:"0.9rem",
                borderBottom:`1px solid ${T.border}` }}>
                <span style={{ fontSize:"0.9rem", width:20, textAlign:"center" }}>{ic}</span>
                <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.8rem",
                  color:T.ivoryD }}>{t}</span>
              </div>
            ))}
            <div style={{ fontFamily:"'Lora',serif", fontStyle:"italic",
              color:T.muted, fontSize:"0.8rem", textAlign:"center", marginTop:"0.5rem" }}>
              Réponse garantie sous 24h
            </div>
          </div>

          {/* Right: form */}
          <div>
            {/* Identité */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1rem", marginBottom:"1.5rem" }} className="col-3">
              {[["nom","Nom complet *","text","Marie Dupont"],
                ["email","Email *","email","marie@email.fr"],
                ["tel","Téléphone","tel","06 XX XX XX XX"]].map(([k,l,t,ph]) => (
                <div key={k}>
                  <label style={lbl}>{l}</label>
                  <input type={t} placeholder={ph} value={form[k]}
                    onChange={e => set(k, e.target.value)} name={k}
                    onFocus={() => setFocus(k)} onBlur={() => setFocus(null)}
                    style={fieldStyle(k)} />
                </div>
              ))}
            </div>

            {/* Type event */}
            <div style={{ marginBottom:"1.5rem" }}>
              <label style={lbl}>Type d'événement</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                {events.map(t => (
                  <button key={t} onClick={() => set("typeEvent", t)} style={{
                    padding:"0.5rem 1rem", borderRadius:2, fontSize:"0.78rem", fontWeight:500,
                    letterSpacing:"0.06em", transition:"all 0.2s",
                    border:`1px solid ${form.typeEvent===t ? T.gold : T.border}`,
                    background: form.typeEvent===t ? `${T.gold}18` : "transparent",
                    color: form.typeEvent===t ? T.gold : T.muted,
                  }}>{t}</button>
                ))}
              </div>
            </div>

            {/* Date / Personnes / Lieu */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1rem", marginBottom:"1.5rem" }} className="col-3">
              <div>
                <label style={lbl}>Date</label>
                <input type="date" value={form.date} onChange={e => set("date", e.target.value)}
                  onFocus={() => setFocus("d")} onBlur={() => setFocus(null)} style={fieldStyle("d")} />
              </div>
              <div>
                <label style={lbl}>Nombre de personnes</label>
                <select value={form.nbPersonnes} onChange={e => set("nbPersonnes", e.target.value)}
                  onFocus={() => setFocus("nb")} onBlur={() => setFocus(null)}
                  style={{ ...fieldStyle("nb"), cursor:"pointer" }}>
                  <option value="">Sélectionner…</option>
                  {["1–10","10–20","20–50","50–100","100–200","200+"].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Lieu</label>
                <input type="text" placeholder="Ville ou adresse" value={form.lieu}
                  onChange={e => set("lieu", e.target.value)}
                  onFocus={() => setFocus("l")} onBlur={() => setFocus(null)} style={fieldStyle("l")} />
              </div>
            </div>

            {/* Plats */}
            <div style={{ marginBottom:"1.5rem" }}>
              <label style={lbl}>Plats souhaités</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                {platsOpts.map(p => (
                  <button key={p} onClick={() => togglePlat(p)} style={{
                    padding:"0.5rem 1rem", borderRadius:2, fontSize:"0.78rem", fontWeight:500,
                    letterSpacing:"0.06em", transition:"all 0.2s",
                    border:`1px solid ${form.plats.includes(p) ? T.green : T.border}`,
                    background: form.plats.includes(p) ? `${T.green}22` : "transparent",
                    color: form.plats.includes(p) ? T.greenL : T.muted,
                  }}>{form.plats.includes(p) ? "✓ " : ""}{p}</button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div style={{ marginBottom:"1.5rem" }}>
              <label style={lbl}>Budget estimé</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                {["< 200€","200–500€","500–1 000€","1 000–2 000€","2 000€+","À définir"].map(b => (
                  <button key={b} onClick={() => set("budget", b)} style={{
                    padding:"0.5rem 1rem", borderRadius:2, fontSize:"0.78rem", fontWeight:500,
                    letterSpacing:"0.06em", transition:"all 0.2s",
                    border:`1px solid ${form.budget===b ? T.goldD : T.border}`,
                    background: form.budget===b ? `${T.gold}15` : "transparent",
                    color: form.budget===b ? T.gold : T.muted,
                  }}>{b}</button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div style={{ marginBottom:"2rem" }}>
              <label style={lbl}>Précisions</label>
              <textarea value={form.message} onChange={e => set("message", e.target.value)} name="message"
                rows={4} placeholder="Allergies, régimes alimentaires, ambiance souhaitée, plats spécifiques…"
                onFocus={() => setFocus("m")} onBlur={() => setFocus(null)}
                style={{ ...fieldStyle("m"), resize:"vertical" }} />
            </div>

            <button onClick={handleSubmit} disabled={status==="sending"} style={{
              width:"100%", padding:"1rem", borderRadius:3, fontWeight:700,
              fontSize:"0.85rem", letterSpacing:"0.14em", textTransform:"uppercase",
              background: status==="sending" ? T.border : `linear-gradient(135deg,${T.gold},${T.goldD})`,
              color: T.bg, transition:"all 0.2s",
              boxShadow: status==="sending" ? "none" : `0 4px 24px rgba(201,169,110,0.25)`,
            }}>
              {status==="sending" ? "Envoi en cours…" : "Envoyer ma demande →"}
            </button>

            {status==="error" && (
              <p style={{ color:"#E87070", fontFamily:"'Poppins',sans-serif",
                fontSize:"0.8rem", textAlign:"center", marginTop:"1rem" }}>
                Une erreur est survenue. Appelez-nous au 06 47 33 33 94.
              </p>
            )}
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.7rem",
              color:T.muted, textAlign:"center", marginTop:"1rem" }}>
              * Champs obligatoires · Devis gratuit et sans engagement
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── FOOTER ──────────────────────────────────────────────── */
function Footer() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" })
  return (
    <footer style={{ background:T.surface, borderTop:`1px solid ${T.border}` }}>
      <KenteBar h={3} />
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"4rem 2rem 2.5rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"3rem", marginBottom:"3rem" }} className="col-2">
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.85rem", marginBottom:"1.2rem" }}>
              <Logo size={52} />
              <div>
                <div style={{ fontFamily:"'Lora',serif", color:T.gold, fontSize:"1.1rem" }}>Grand Bassam</div>
                <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, color:T.ivory,
                  fontSize:"0.65rem", letterSpacing:"0.28em" }}>FOOD</div>
              </div>
            </div>
            <p style={{ fontFamily:"'Lora',serif", fontStyle:"italic",
              color:T.muted, fontSize:"0.85rem", lineHeight:1.8, marginBottom:"1.5rem", maxWidth:280 }}>
              La richesse culinaire de l'Afrique, cuisinée avec amour à Rennes.
            </p>
            <CIV w={55} h={3} />
          </div>

          <div>
            <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700,
              fontSize:"0.68rem", letterSpacing:"0.18em", textTransform:"uppercase",
              color:T.gold, marginBottom:"1.2rem" }}>Navigation</div>
            {[["accueil","Accueil"],["menu","Menu"],["apropos","Notre histoire"],["devis","Devis"]].map(([id,l]) => (
              <div key={id} onClick={() => go(id)} style={{ fontFamily:"'Poppins',sans-serif",
                fontSize:"0.82rem", color:T.muted, marginBottom:"0.6rem",
                cursor:"pointer", letterSpacing:"0.04em" }}>{l}</div>
            ))}
          </div>

          <div>
            <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700,
              fontSize:"0.68rem", letterSpacing:"0.18em", textTransform:"uppercase",
              color:T.gold, marginBottom:"1.2rem" }}>Contact</div>
            {[["06 47 33 33 94"],["devis@grandbassamfood.fr"],["Rennes et alentours"],["grandbassamfood.fr"]].map(t => (
              <div key={t} style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.8rem",
                color:T.muted, marginBottom:"0.6rem" }}>{t}</div>
            ))}
          </div>

          <div>
            <div style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700,
              fontSize:"0.68rem", letterSpacing:"0.18em", textTransform:"uppercase",
              color:T.gold, marginBottom:"1.2rem" }}>Spécialités</div>
            {["Côte d'Ivoire","Sénégal","Mali","Guinée","Cameroun","et bien d'autres"].map(p => (
              <div key={p} style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.78rem",
                color:T.muted, marginBottom:"0.5rem" }}>{p}</div>
            ))}
          </div>
        </div>

        <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:"1.5rem",
          display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.72rem", color:T.muted }}>
            © 2025 Grand Bassam Food · grandbassamfood.fr
          </p>
          <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"0.72rem", color:T.muted }}>
            Traiteur africain · Rennes & alentours
          </p>
        </div>
      </div>
      <KenteBar h={3} />
    </footer>
  )
}

/* ── APP ─────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsBand />
      <MenuSection />
      <APropos />
      <DevisSection />
      <Footer />
    </>
  )
}
