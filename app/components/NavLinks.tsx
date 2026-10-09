import Link from 'next/link';
import React from 'react';
interface Navs{
  id:number;
  slug:string;
  nameBn:string;
  icon:string;
}
const NavLinks = async() => {
  const res=await fetch("https://api.abcz.workers.dev/api/bazardor/categories")
  const data:Navs[]=await res.json()
 
  return (
    <div className='space-x-6'>
      {data.map((d)=><Link key={d.id} href={`/category/${d.slug}`}>{d.icon} {d.nameBn}</Link>)}
    </div>
  );
};

export default NavLinks;