import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Menu, Star, Shirt, BadgeCheck, Truck, Shield, Wand2, ArrowRight, Sparkles, CheckCircle2, Filter } from "lucide-react";

// ---------- DATA (Edita libremente) ----------
const CATEGORIES = ["Todas", "Gorras", "Playeras", "Hoodies", "Accesorios"];

const PRODUCTS = [
  {
    id: "cap-black",
    name: "Gorra NT Vintage Negra",
    price: 499,
    category: "Gorras",
    rating: 5,
    tags: ["bordado", "unisex"],
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='28' font-family='sans-serif'%3EGorra NT Vintage Negra%3C/text%3E%3C/svg%3E",
  },
  {
    id: "cap-white",
    name: "Gorra NT Blanca Bordada",
    price: 549,
    category: "Gorras",
    rating: 4,
    tags: ["premium", "bordado"],
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='white'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='black' font-size='28' font-family='sans-serif'%3EGorra NT Blanca Bordada%3C/text%3E%3C/svg%3E",
  },
  {
    id: "tee-classic",
    name: "Playera NT Classic",
    price: 399,
    category: "Playeras",
    rating: 4,
    tags: ["algodón", "suave"],
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23222'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='28' font-family='sans-serif'%3EPlayera NT Classic%3C/text%3E%3C/svg%3E",
  },
  {
    id: "hoodie-black",
    name: "Hoodie NT Midnight",
    price: 899,
    category: "Hoodies",
    rating: 5,
    tags: ["calientito", "street"],
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%230a0a0a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='28' font-family='sans-serif'%3EHoodie NT Midnight%3C/text%3E%3C/svg%3E",
  },
  {
    id: "cap-green",
    name: "Gorra NT Olive",
    price: 479,
    category: "Gorras",
    rating: 4,
    tags: ["daily", "ajustable"],
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%233a4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='28' font-family='sans-serif'%3EGorra NT Olive%3C/text%3E%3C/svg%3E",
  },
  {
    id: "socks",
    name: "Calcetas NT",
    price: 149,
    category: "Accesorios",
    rating: 4,
    tags: ["comodidad"],
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='black' font-size='28' font-family='sans-serif'%3ECalcetas NT%3C/text%3E%3C/svg%3E",
  },
];

const BENEFITS = [
  { icon: BadgeCheck, title: "Bordado premium", desc: "Detalles nítidos y duraderos." },
  { icon: Truck, title: "Envíos a todo México", desc: "Rastreo y entrega rápida." },
  { icon: Shield, title: "Compra segura", desc: "Pagos protegidos y garantía." },
  { icon: Wand2, title: "100% personalizable", desc: "Hecho a tu gusto y estilo." },
];

// ---------- UI HELPERS ----------
const StarRow = ({ rating = 5 }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 stroke-yellow-400" : "opacity-30"}`} />
    ))}
  </div>
);

// ---------- MAIN COMPONENT ----------
export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [sort, setSort] = useState("recomended");
  const [cart, setCart] = useState({});

  const filtered = useMemo(() => {
    let items = PRODUCTS.filter(p => (category === "Todas" ? true : p.category === category));
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
    }
    if (sort === "price-asc") items = [...items].sort((a,b)=>a.price-b.price);
    if (sort === "price-desc") items = [...items].sort((a,b)=>b.price-a.price);
    if (sort === "name") items = [...items].sort((a,b)=>a.name.localeCompare(b.name));
    return items;
  }, [search, category, sort]);

  const addToCart = (id) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const cartCount = Object.values(cart).reduce((a,b)=>a+b,0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden"><Menu className="h-5 w-5"/></Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <nav className="flex flex-col gap-3 mt-8">
                  {CATEGORIES.map(c => (
                    <Button key={c} variant={c===category?"default":"ghost"} onClick={()=>setCategory(c)} className="justify-start">{c}</Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <Shirt className="h-6 w-6"/>
              <span className="font-black tracking-tight text-xl">NT Studio</span>
              <Badge className="ml-2 hidden sm:inline-flex"><Sparkles className="mr-1 h-4 w-4"/>Personalizable</Badge>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 w-full max-w-md">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="hidden md:flex" onClick={()=>window.scrollTo({top:document.body.scrollHeight, behavior:"smooth"})}>Contacto</Button>
            <Button variant="secondary" className="relative">
              <ShoppingCart className="h-4 w-4 mr-2"/>
              Carrito
              {cartCount>0 && (
                <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-xs rounded-full h-6 w-6 grid place-items-center">{cartCount}</span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">Gorras y ropa <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">100% personalizadas</span>.</h1>
            <p className="mt-4 text-slate-600 text-lg">Elige colores, tipografías y detalles. Nosotros bordamos y confeccionamos con calidad premium.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={()=>document.getElementById("productos")?.scrollIntoView({behavior:"smooth"})}>
                Diseñar ahora <ArrowRight className="ml-2 h-4 w-4"/>
              </Button>
              <Button size="lg" variant="outline" onClick={()=>document.getElementById("catalogo")?.scrollIntoView({behavior:"smooth"})}>Ver catálogo</Button>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {BENEFITS.map((b, idx) => (
                <Card key={idx} className="border-dashed">
                  <CardContent className="p-4 flex items-start gap-3">
                    <b.icon className="h-5 w-5"/>
                    <div>
                      <p className="font-semibold text-sm">{b.title}</p>
                      <p className="text-xs text-slate-500 leading-snug">{b.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="relative">
            <div className="aspect-[4/3] rounded-3xl bg-slate-900/90 shadow-2xl grid place-items-center overflow-hidden">
              <div className="relative p-8 text-center">
                <p className="text-white/90 mb-4">Vista previa de tu diseño</p>
                <div className="rounded-2xl bg-white w-full max-w-md mx-auto p-6">
                  <div className="h-40 rounded-xl bg-gradient-to-br from-slate-200 to-slate-50 grid place-items-center">
                    <span className="font-black text-3xl tracking-widest">NT</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                    <span>Modelo: <b>Vintage</b></span>
                    <span>Color: <b>Negro</b></span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTROLES / FILTROS */}
      <section id="catalogo" className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-6">
          <div className="md:hidden">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Label className="text-slate-600 flex items-center gap-2"><Filter className="h-4 w-4"/>Categoría:</Label>
            <Tabs value={category} onValueChange={(v)=>setCategory(v)}>
              <TabsList>
                {CATEGORIES.map((c)=> (
                  <TabsTrigger key={c} value={c}>{c}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Label className="text-slate-600">Ordenar:</Label>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Recomendado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recomended">Recomendado</SelectItem>
                <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                <SelectItem value="name">Nombre A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Card key={p.id} className="group overflow-hidden">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"/>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg leading-tight">{p.name}</CardTitle>
                    <div className="mt-1"><StarRow rating={p.rating}/></div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.tags.map((t)=> (<Badge key={t} variant="secondary">{t}</Badge>))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black tracking-tight">${" "+ p.price}</p>
                    <p className="text-xs text-slate-500">MXN</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0 flex items-center justify-between">
                <Button variant="outline" onClick={()=>alert("Abrir personalizador (por implementar)")}>Personalizar</Button>
                <Button onClick={()=>addToCart(p.id)}>
                  Agregar <ShoppingCart className="ml-2 h-4 w-4"/>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="rounded-3xl border p-6 md:p-10 bg-white">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6"/>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">Lo que dicen nuestros clientes</h2>
          </div>
          <Separator className="my-6"/>
          <div className="grid md:grid-cols-3 gap-4">
            {["Calidad increíble y bordado perfecto", "Llegó rapidísimo a Monterrey", "Me ayudaron a crear mi propio diseño"].map((t,i)=>(
              <Card key={i}>
                <CardContent className="p-5">
                  <StarRow rating={5}/>
                  <p className="mt-2 text-slate-700">“{t}”.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-12 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight">¿Listo para lanzar tu diseño?</h3>
            <p className="mt-3 text-white/80">Cuéntanos tu idea y recibe un mockup gratis hoy mismo.</p>
            <div className="mt-6 flex gap-3">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90" onClick={()=>document.getElementById("contacto")?.scrollIntoView({behavior:"smooth"})}>Pedir cotización</Button>
              <Button size="lg" variant="secondary" onClick={()=>document.getElementById("productos")?.scrollIntoView({behavior:"smooth"})}>Ver productos</Button>
            </div>
          </div>
          <div className="rounded-2xl bg-white/5 p-6">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacto" className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2"><Shirt className="h-5 w-5"/><span className="font-black">NT Studio</span></div>
            <p className="text-slate-600 text-sm">Gorras y ropa personalizable hecha en México.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Catálogo</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              {CATEGORIES.filter(c=>c!=="Todas").map(c => (
                <li key={c}><a href="#productos" onClick={()=>setCategory(c)} className="hover:underline">{c}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Soporte</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>Envíos y devoluciones</li>
              <li>Guía de tallas</li>
              <li>Privacidad</li>
            </ul>
          </div>
          <div id="contacto">
            <h4 className="font-semibold mb-2">Contacto</h4>
            <p className="text-sm text-slate-600">WhatsApp: +52 55 0000 0000</p>
            <p className="text-sm text-slate-600">Email: hola@ntstudio.mx</p>
            <div className="mt-3">
              <Newsletter />
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 pb-8">© {new Date().getFullYear()} NT Studio — Todos los derechos reservados.</div>
      </footer>
    </div>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div className="w-full flex items-center gap-2">
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"/>
        <Input value={value} onChange={(e)=>onChange(e.target.value)} placeholder="Buscar: gorra, hoodie, bordado…" className="pl-9"/>
      </div>
    </div>
  );
}

function SearchIcon(props){
  return <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="10.5" cy="10.5" r="7.5" stroke="currentColor" strokeWidth="2"/></svg>
}

function ContactForm(){
  return (
    <form className="grid gap-3">
      <div className="grid gap-1">
        <Label>Nombre</Label>
        <Input placeholder="Tu nombre"/>
      </div>
      <div className="grid gap-1">
        <Label>WhatsApp</Label>
        <Input placeholder="55 1234 5678"/>
      </div>
      <div className="grid gap-1">
        <Label>Mensaje</Label>
        <Input placeholder="Quiero 20 gorras negras con logo NT blanco"/>
      </div>
      <Button className="w-full">Enviar solicitud</Button>
      <p className="text-xs text-white/70 flex items-center gap-2"><Shield className="h-3.5 w-3.5"/> Protegemos tus datos.</p>
    </form>
  );
}

function Newsletter(){
  return (
    <form className="flex gap-2">
      <Input placeholder="Tu correo"/>
      <Button>Suscribirme</Button>
    </form>
  );
}
