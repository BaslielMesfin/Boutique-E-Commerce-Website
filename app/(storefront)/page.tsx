import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <section className="w-full h-[870px] relative overflow-hidden flex items-end justify-center pb-24 md:pb-32 px-8">
        <div className="absolute inset-0 z-0 bg-surface-container">
          <img 
            alt="High-end editorial fashion image of a model wearing a structured beige trench coat in a minimalist concrete setting with dramatic natural lighting" 
            className="w-full h-full object-cover object-center opacity-90" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN2kq_JugnOWyAHz8IZzLue5Dl8dDyfWzWNiNsCQY9T3yZ9yi0Mv8OZlpbbf4EtLbCM7o5TMt4S86TDdatYeT-mU72L88mqgZyqG_ZF8XMO9xL70kFm0v2jZ0DBqtqomwW43KKviPXkCxPcMtArgbz3a0AwKJvks55NX7OpJTvghEMGbk2OUIM-U0VmNHoXWmVff-YQ5cE_Hk0GJ_WxJ8k8a5FOJkWvUBmKCAfAqanH5qWsQZTcuEtb_BLBjge0MkcKP7cBU5gkTQx"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-2xl">
          <h1 className="font-display-xl text-display-xl text-primary drop-shadow-sm mix-blend-multiply">The New Uniform</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">Redefining modern silhouettes with uncompromising materials and structural precision.</p>
          <Link href="/products" className="bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-[0.1em] px-8 py-4 rounded-lg hover:bg-surface-tint transition-colors duration-300 mt-4 inline-block">
            Shop Now
          </Link>
        </div>
      </section>
      
      <section className="max-w-[1440px] mx-auto px-8 md:px-[48px] py-[120px]">
        <div className="flex items-end justify-between mb-16 border-b border-outline-variant pb-8">
          <h2 className="font-headline-lg text-headline-lg text-primary uppercase">Curated Essentials</h2>
          <Link className="font-label-sm text-label-sm text-primary uppercase border-b border-primary pb-1 hover:text-surface-tint hover:border-surface-tint transition-colors" href="/products">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-[24px] gap-y-16">
          <Link href="/products/essential-trench" className="md:col-span-8 group cursor-pointer block">
            <div className="w-full aspect-[4/5] bg-surface-container overflow-hidden mb-6 relative">
              <img 
                alt="Editorial shot of a premium tailored black overcoat draped over a minimalist wooden chair against a stark white background" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYQROsaOz5lIZ5Hx8tZAUnOdCASKmdo6-QuBtby4IBiXrn3SC_tfNbjtDvDYf9kFlhKy00vVtwhjttSEFF7WpRbX1LQOALP7qKhA1ExFc7p32EccVgXn7qU3Nre9NC0T9sFeeChsPOT2grBLoPXsmHX7KEisGXlF0UngjcZAdw55B0r_FCbRcCuz-C7lHZOBrfL--iib9Qtv7E6K12wP1g6LqXcgCJpKv83DyuhCnD8aWSBtLZ1S28fATHeIfjnVY0i5DxOrIzbA5i"
              />
              <div className="absolute inset-0 border border-outline-variant opacity-20"></div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-body-md text-body-md text-primary uppercase tracking-wide">Essential Trench Coat</h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant">ETB 14,500</p>
            </div>
          </Link>
          
          <div className="md:col-span-4 flex flex-col gap-16">
            <Link href="/products/poplin-shirt" className="group cursor-pointer block">
              <div className="w-full aspect-[3/4] bg-surface-container overflow-hidden mb-6 relative">
                <img 
                  alt="Close-up detail shot of crisp white cotton poplin shirt collar and hidden placket, soft diffused studio lighting" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCttIhkRlgiTmG4wXtEv-Jiyh7FVvpqlmvCcYOqzcz_tLkQoQy7cAdkh0Y3SUoOupR6zoWYnchTk3HUJUt5ZRHZQCol_t3L39vy7Lis6wiNsk5h0AcRvFRXPN-zx1zor8CtevtXIaoJu437pWjbgdmG9Wf-dq5KhFPsfe0NiZ6SKOKofmvJs3Wpz9SU5x_0weum5OQSDXXgCmWghEJAb-y153c5DgfPPViWqdPkflpiJJUWGiWaeC1qXJuLZkA7tDaq3iwMKmXlPu2"
                />
                <div className="absolute inset-0 border border-outline-variant opacity-20"></div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-body-md text-body-md text-primary uppercase tracking-wide">Poplin Standard Shirt</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">ETB 6,200</p>
              </div>
            </Link>
            
            <Link href="/products/leather-derby" className="group cursor-pointer block">
              <div className="w-full aspect-[3/4] bg-surface-container overflow-hidden mb-6 relative">
                <img 
                  alt="Minimalist laydown of sleek black leather derby shoes on a cool grey concrete textured surface" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3PixV5NI_Mu2SUd9d4QNqbRyVkvWmaLV9aG-qfB1ph90gzENeb-CBU6DwUQu6MN6-LNGLpmIAOgefaQz_CbjQPNk6dxcNsWRxPrj4kLuZ7IDL2vPvivPdPmjF8NNx9IUJoObXfcj4oFCofOuWnt795V4dlcWiX_gitJ9GzTnYKsWYGc9FDolJxoruJEKAiXfpD1oCSfOvZfzlT8Gw9h2WDFp9F1bH42t_0FAgn76I5EjE_n4su3q0t8Ug9AgYqpqgDjTtkqhGSU3E"
                />
                <div className="absolute inset-0 border border-outline-variant opacity-20"></div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-body-md text-body-md text-primary uppercase tracking-wide">Leather Derby</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">ETB 18,900</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
